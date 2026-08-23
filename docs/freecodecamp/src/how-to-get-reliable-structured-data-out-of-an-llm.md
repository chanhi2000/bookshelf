---
lang: en-US
title: "How to Get Reliable Structured Data Out of an LLM"
description: "Article(s) > How to Get Reliable Structured Data Out of an LLM"
icon: iconfont icon-zod
category:
  - TypeScript
  - Node.js
  - Zod
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - node
  - nodejs
  - node-js
  - zod
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get Reliable Structured Data Out of an LLM"
    - property: og:description
      content: "How to Get Reliable Structured Data Out of an LLM"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-reliable-structured-data-out-of-an-llm.html
prev: /programming/js-zod/articles/README.md
date: 2026-08-28
isOriginal: false
author:
  - name: Vineeth Pawar
    url: https://freecodecamp.org/news/author/vpawar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/be161971-7a90-496c-899a-526492046265.png
---

# {{ $frontmatter.title }} 

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Zod > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-zod/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get Reliable Structured Data Out of an LLM"
  desc="Most tutorials about calling a language model end at JSON.parse(response.content). That line works on your first ten test cases. Then you ship, and somewhere around request four hundred the model retu"
  url="https://freecodecamp.org/news/how-to-get-reliable-structured-data-out-of-an-llm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/be161971-7a90-496c-899a-526492046265.png"/>

Most tutorials about calling a language model end at `JSON.parse(response.content)`. That line works on your first ten test cases. Then you ship, and somewhere around request four hundred the model returns a date it invented, or eight array items when your schema allows five, or a perfectly valid JSON object with one field quietly missing.

I ran into this while building Temploracraft, a résumé tool that takes an uploaded document and turns it into structured data the application can edit.

The input is genuinely unpredictable: two-column PDFs, tables that aren't really tables, and dates written in about fourteen different formats. The output has to be strict, because every extracted field lands in a form that a person is going to look at. When the model gets a date wrong, the user notices in about two seconds.

This article is about the layer that sits between "the model returned some text" and "my application has data it can trust." It covers the three mechanisms for constraining output, why designing the schema first beats writing a longer prompt, how to build a retry loop that doesn't set money on fire, and what to do about the failures that no retry will ever fix.

::: note Prerequisites

To follow along comfortably, you'll want a few things in place:

- **Working knowledge of TypeScript:** The examples use type inference and generics lightly, and you should be able to read a type annotation without pausing.
- **You have called a language model API at least once:** You don't need to be an expert, but you should know what a system prompt is and roughly what a token is.
- **Familiarity with JSON Schema is helpful but not required:** I explain the parts that matter as they come up.
- **Node.js 18 or later** if you want to run the examples, since they use the native `fetch` and async iterators.

The code samples use [<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev) for schema definition and the Anthropic SDK for model calls, but every technique here translates directly to other validation libraries and other providers. The ideas matter more than the specific packages.

:::

---

## Why Prompting for JSON Isn't Enough

The first instinct when you need structured data is to ask for it politely. You write something like "Respond with valid JSON matching this shape, and do not include any other text," you paste an example, and it works. It keeps working through development. It works in your demo.

The problem is that a language model generates one token at a time based on probability, and your instruction is only one influence among many. It competes with the model's training, the shape of the input document, and whatever the model produced in the preceding few hundred tokens. Most of the time your instruction wins. Occasionally it does not.

Here are failures I've actually collected from a production extraction pipeline, all from a model that was explicitly told to return strict JSON:

- The model wrapped the response in a Markdown code fence, despite being told twice not to.
- It returned `"2019 - Present"` as a single string where the schema defined separate `startDate` and `endDate` fields.
- It invented an `endDate` of `"2024-12-31"` for a role the document clearly marked as current.
- It returned the string `"null"` instead of an actual `null`.
- It emitted seven bullet points for a role where the schema set a maximum of five.
- It truncated mid-object because the response hit the output token limit.

Notice that these aren't all the same kind of failure. The code fence and the truncation are syntax problems, and you can often fix them locally without calling the model again. The merged date string and the extra bullets are schema problems, where the JSON parses fine but doesn't match the shape you need. The invented end date is a semantic problem, where the output is both valid JSON and schema-conformant but factually wrong about the source document.

Those three categories need three different responses, and conflating them is the most common architectural mistake I see in extraction code. The rest of this article is largely about separating them.

---

## The Three Ways to Constrain Output

Before writing any validation code, it's worth understanding what the API itself can enforce for you. There are three mechanisms, and they give you meaningfully different guarantees.

**JSON mode** is the weakest of the three. You set a flag such as `response_format: { type: "json_object" }`, and the provider guarantees the response will be syntactically valid JSON. That's genuinely useful, because it eliminates the code fence and truncation problems in one move. What it doesn't do is guarantee anything about the shape. You can get valid JSON with the wrong keys, the wrong types, or a completely different structure than you asked for.

**Tool calling** is the mechanism I reach for most often. You describe a function with a JSON Schema for its parameters, then force the model to call it. The model returns arguments matching that schema rather than free text. Support is broad, the schema travels with the request so you're not duplicating it in the prompt, and providers tend to constrain the output more aggressively than they do in plain JSON mode.

Here's what that looks like with the Anthropic SDK:

```ts
const response = await client.messages.create({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  tools: [
    {
      name: "emit_resume",
      description: "Return the parsed resume as structured data.",
      input_schema: jsonSchema,
    },
  ],
  tool_choice: { type: "tool", name: "emit_resume" },
  messages: [{ role: "user", content: resumeText }],
});

const block = response.content.find((b) => b.type === "tool_use");
const candidate = block?.input;
```

The `tool_choice` field is the important part. Without it the model decides whether to call the tool, and sometimes it will just answer in prose instead. Forcing the specific tool removes that branch entirely.

**Constrained decoding** is the strongest option and the least widely available. Instead of asking the model to follow a schema, the runtime masks the token sampler at every step so that tokens which would produce invalid output can't be selected at all. Invalid output becomes impossible rather than unlikely.

OpenAI exposes a version of this through strict structured outputs, and if you run models locally you can use GBNF grammars in llama.cpp or a library such as Outlines.

The tradeoff is that constrained decoding can push the model into awkward corners. If the schema demands a field the document genuinely doesn't contain, the model can't decline, so it fills the slot with something. You've traded a parsing failure for a hallucination, which is harder to detect. I make required fields nullable for exactly this reason, which I'll come back to shortly.

My default is tool calling with a nullable-heavy schema, plus validation on top. That combination gives most of the benefit without the issues.

---

## Start with the Schema, Not the Prompt

The instinct when output quality is poor is to write a longer prompt. More examples, more emphasis, and more capital letters. This helps a little and scales badly, because the prompt is prose and prose isn't enforceable.

A better approach is to treat the schema as the primary artifact and let everything else derive from it. Define it once, and use that single definition to generate the TypeScript type, the JSON Schema sent to the API, and the runtime validator. When the shape changes, all three change together, and there's no way for them to drift apart.

With Zod that looks like this:

```ts
import { z } from "zod";

const YearMonth = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "Expected a YYYY-MM date");

const Role = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  startDate: YearMonth,
  endDate: YearMonth.nullable(),
  bullets: z.array(z.string().min(1)).min(1).max(5),
});

const Resume = z.object({
  name: z.string().min(1),
  email: z.string().email().nullable(),
  roles: z.array(Role),
});

export type Resume = z.infer<typeof Resume>;
```

Three details in there are doing real work.

The `YearMonth` regex is narrower than `z.string()`, and that narrowness is the point. A bare string field invites the model to return `"January 2019"` or `"2019 - Present"` or `"01/2019"`, and all of those pass validation. Constraining the format at the schema level means the mismatch surfaces immediately instead of three layers deeper in your date-handling code.

The `endDate` field is nullable rather than optional. This is the single change that most improved extraction quality for me. An optional field lets the model quietly omit it, and you can't distinguish "the document did not say" from "the model forgot." A nullable field forces an explicit decision, and `null` is a meaningful answer that means the role is current.

The `max(5)` on bullets encodes a product constraint directly into the contract rather than trimming the array afterward. If the model exceeds it, you want to know, because it usually means the model is padding rather than extracting.

To send the schema to the API, derive the JSON Schema from the same definition:

```ts
import { zodToJsonSchema } from "zod-to-json-schema";

const jsonSchema = zodToJsonSchema(Resume, { target: "openApi3" });
```

One habit worth adopting: write a `.describe()` on any field where the name alone is ambiguous. Those descriptions end up in the JSON Schema, which means they reach the model as part of the tool definition, which means they function as targeted, structured prompt instructions attached to exactly the field they concern.

```ts
const Role = z.object({
  company: z.string().min(1),
  title: z.string().min(1).describe("The person's job title, not the team name"),
  startDate: YearMonth,
  endDate: YearMonth.nullable().describe("null if this role is current"),
  bullets: z
    .array(z.string().min(1))
    .min(1)
    .max(5)
    .describe("Verbatim from the document. Do not rewrite or summarise."),
});
```

That last description eliminated an entire class of failure for me, where the model would helpfully improve the wording of a person's own bullet points.

---

## Validation Is Two Jobs, Not One

Once the response comes back, it's tempting to run `schema.parse()` and consider the job done. Zod will tell you whether the shape is right, and if it is, you move on.

But shape validation and semantic validation are different jobs, and only the first one is free. Zod can tell you that `endDate` is a string matching `YYYY-MM`. It can't tell you that the end date falls before the start date, or that the date is in the future, or that a role listed as current also has an end date. Those are all schema-valid and all wrong.

So run two passes. The first is structural and comes from the schema. The second is a plain function that encodes what you know about the domain:

```ts
function findSemanticProblems(resume: Resume): string[] {
  const problems: string[] = [];
  const currentMonth = new Date().toISOString().slice(0, 7);

  for (const role of resume.roles) {
    if (role.startDate > currentMonth) {
      problems.push(`${role.company}: start date is in the future`);
    }
    if (role.endDate && role.endDate < role.startDate) {
      problems.push(`${role.company}: end date precedes start date`);
    }
  }

  const currentRoles = resume.roles.filter((r) => r.endDate === null);
  if (currentRoles.length > 1) {
    problems.push("More than one role is marked as current");
  }

  return problems;
}
```

None of this is clever code, and that's rather the point. It's ordinary business logic that happens to be checking a model's work rather than a user's. Write it as you discover failures, and treat each new check as a permanent regression test for a mistake the model made once.

There's a useful asymmetry here. Semantic problems are often better surfaced to the user than retried, because the model frequently can't do better with the information available. If a document genuinely lists two current roles, that's what the document says, and asking the model again won't change it.

---

## Building a Retry Loop That Doesn't Burn Tokens

When validation fails, the naïve fix is to call the model again with the same prompt and hope for a different sample. That works often enough to feel reasonable and is wasteful enough to notice on the bill, because you're paying full input cost for a request that has already mostly succeeded.

Two changes make a large difference.

The first is to attempt a local repair before spending anything. A meaningful share of failures are cosmetic, and you can fix them with string handling:

```ts
function salvage(raw: string): string {
  let text = raw.trim();

  // Strip a Markdown fence the model added despite instructions.
  const fenced = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  if (fenced) text = fenced[1];

  // Drop any prose before the first brace or after the last one.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end > start) text = text.slice(start, end + 1);

  return text;
}
```

The second is that when you do call the model again, you should send a repair request rather than a fresh attempt. Include the original prompt, the output that failed, and the specific validation errors. The model has already done the hard extraction work, and you're asking it to fix a small number of named problems rather than start over. Repairs converge faster and produce shorter outputs, which means they cost less.

```ts
async function requestRepair(
  originalPrompt: string,
  badOutput: string,
  error: z.ZodError,
): Promise<string> {
  const issues = error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("\n");

  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4096,
    messages: [
      { role: "user", content: originalPrompt },
      { role: "assistant", content: badOutput },
      {
        role: "user",
        content:
          `That output failed validation with these problems:\n${issues}\n\n` +
          `Return the corrected JSON only. Keep everything that was already correct.`,
      },
    ],
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
```

Putting it together, the full loop separates the failure classes and caps the spend:

```ts
type Outcome<T> =
  | { ok: true; value: T; attempts: number }
  | { ok: false; error: string; attempts: number };

async function extract<T>(
  schema: z.ZodType<T>,
  prompt: string,
  maxAttempts = 3,
): Promise<Outcome<T>> {
  let lastRaw = "";
  let lastError: z.ZodError | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    lastRaw =
      attempt === 1
        ? await callModel(prompt)
        : await requestRepair(prompt, lastRaw, lastError!);

    let candidate: unknown;
    try {
      candidate = JSON.parse(salvage(lastRaw));
    } catch {
      continue; // Syntax failure. Try again without a schema error to report.
    }

    const result = schema.safeParse(candidate);
    if (result.success) {
      return { ok: true, value: result.data, attempts: attempt };
    }
    lastError = result.error;
  }

  return {
    ok: false,
    error: lastError?.message ?? "Output was never parseable",
    attempts: maxAttempts,
  };
}
```

Two things about this loop are deliberate. It returns the attempt count, which you should log, because attempts per success is the single most useful health metric for an extraction pipeline. And it caps attempts at three. If three tries haven't produced valid output, a fourth rarely helps, and by then you're better off degrading gracefully than continuing to pay.

One more distinction worth respecting: a rate limit error and a schema validation error aren't the same failure and shouldn't share a retry policy. Rate limits want exponential backoff, because the problem is timing. Schema failures want an immediate repair request, because the problem is content, and waiting changes nothing.

---

## Streaming Structured Output

Streaming and structured output pull against each other. Streaming exists so the user sees progress before the response finishes, but you can't parse a JSON object until the closing brace arrives. If your extraction takes twelve seconds, the best options are to show a spinner for twelve seconds or find a way to stream something meaningful.

There are two reasonable approaches.

The first is a partial JSON parser, which takes an incomplete string and returns the largest valid structure it can infer, closing open braces and dropping the trailing incomplete value. Libraries such as `best-effort-json-parser` do this. It works, and it's the right choice when the output is genuinely one large object. The cost is that intermediate states can be misleading, because a field can appear with a truncated value that looks complete.

The second approach, which I prefer when the output is a list, is to change the output format so that streaming is natural. Instead of asking for one array of objects, ask for one object per line. Each line is independently parseable, so you can validate and emit items the moment they complete:

```ts
const stream = client.messages.stream({
  model: "claude-sonnet-5",
  max_tokens: 4096,
  messages: [{ role: "user", content: prompt }],
});

let buffer = "";

for await (const event of stream) {
  if (event.type !== "content_block_delta") continue;
  buffer += event.delta.text ?? "";

  const lines = buffer.split("\n");
  buffer = lines.pop() ?? ""; // Keep the incomplete tail for the next chunk.

  for (const line of lines) {
    if (!line.trim()) continue;

    try {
      const parsed = Role.safeParse(JSON.parse(line));
      if (parsed.success) onRole(parsed.data);
    } catch {
      // A malformed line is dropped rather than failing the whole stream.
    }
  }
}
```

The buffer handling is the part that people get wrong. Network chunks don't align with line boundaries, so a chunk will frequently end mid-object. Popping the final element back into the buffer and carrying it forward is what makes the loop correct.

This pattern gives you per-item validation for free, which is a real advantage over parsing one large object. One bad item doesn't invalidate the rest of the extraction.

---

## The Failures You Can't Retry Away

Everything so far assumes the model can produce the right answer if you ask correctly. Some failures don't work that way, and treating them as retry candidates wastes money while producing confidently wrong data.

The most important of these is extraction from something the source doesn't contain. If a résumé genuinely has no email address and your schema requires one, the model will produce something plausible.

Retrying produces a different plausible thing. This is the failure mode that constrained decoding makes worse rather than better, because the grammar guarantees a well-formed value in a slot that should've been empty. The fix is at the schema level, which is why nearly every field in my extraction schemas is nullable.

Ambiguity in the source is a similar case. When a document lists a date range next to two different job titles, there's no correct extraction, only a guess. Retrying gives you a different guess with the same confidence. These situations want a confidence signal in the schema and a review step in the interface, not another API call.

Then there's silent truncation. If the response hits the output token limit mid-object, you get syntactically broken JSON, and a naïve retry loop treats it as a transient parse failure and tries again with the same limit, failing identically each time. Check the stop reason on the response. If the model stopped because it ran out of tokens, retrying without raising the limit or splitting the input is guaranteed to fail again.

The general principle is that your retry policy should ask what kind of failure this is before deciding whether repeating the call could possibly help.

---

## What This Actually Costs

Every layer above has a price, and it's worth measuring rather than assuming.

The main figure to track is **attempts per successful extraction**. Log it on every request and watch the p95 rather than the mean, because the mean hides the tail where the money goes. When a schema change causes a quality regression, this number moves before anything else does.

Prompt caching matters more here than in most workloads. Extraction prompts are unusually cache-friendly because the system prompt, the schema, and any few-shot examples are byte-identical on every request, and only the document changes.

On a pipeline where the schema and instructions ran to a couple of thousand tokens, moving that block into a cached prefix cut input cost substantially, and the saving compounds with every retry because repairs re-send the same prefix.

Repair requests are cheaper than fresh attempts for a reason worth understanding. The input grows, since you're now sending the original prompt plus the failed output plus the error list. But the output shrinks considerably, because the model is correcting a handful of fields rather than generating the full document again. Output tokens are the expensive direction on most providers, so the trade is usually favourable.

Two other things are worth instrumenting from the start: the distribution of validation error paths, which tells you exactly which schema fields are causing trouble and is far more actionable than an overall failure rate, and your local-repair hit rate, since if `salvage()` is fixing a large fraction of responses you have a prompt problem you can solve once rather than paying for repeatedly.

---

## When You Don't Need Any of This

This machinery earns its place in a specific set of circumstances, and it's genuinely overkill outside them.

If the model's output goes straight to a human who will read it as prose, you don't need structured output at all. A chat interface, a summary, or a draft email all have a person as the validator, and adding a schema in front of that just constrains the model for no benefit.

If you're extracting one or two fields rather than a document's worth, a well-targeted prompt with a light `safeParse` and a single retry will serve you fine. The retry loop, semantic validation layer, and streaming parser are answers to problems that appear at scale and with schema complexity.

If your volume is low and a human reviews every result anyway, the validation layer is duplicating work someone is already doing. Surface the raw output, let the reviewer correct it, and spend the engineering time elsewhere.

And if you're still exploring what the feature should be, resist building this early. The schema is the most expensive thing to change once extraction code, validation rules, and stored data all depend on it. Prototype loosely, learn what fields you actually need, and tighten afterwards.

The safest rule is to start with a schema and `safeParse`, and add each subsequent layer only when a real failure justifies it. Every technique in this article came from a specific production incident rather than from a design document.

---

## Wrapping Up

The gap between a working demo and a reliable feature is almost entirely in this layer. The model isn't the hard part any more, and the prompt isn't usually the hard part either. The hard part is deciding what you'll accept, detecting when you didn't get it, and responding sensibly when that happens.

Three ideas carry most of the weight:

1. **The schema is the contract, and everything derives from it.** One definition producing your type, your API schema, and your validator means those three can never drift apart.
2. **Separate syntax failures, schema failures, and semantic failures.** They have different causes and different fixes, and a retry loop that treats them identically will waste money on problems that repeating the call can't solve.
3. **Make fields nullable rather than optional.** Forcing the model to say "this was not present" rather than allowing it to quietly omit the field converts a whole class of silent hallucination into an explicit, checkable value.

Get those right and the rest is ordinary engineering. You're writing validation code and retry logic, which developers have been doing against unreliable inputs for decades. A language model is just a new kind of unreliable input, and it responds well to the same discipline.

::: info References

<SiteInfo
  name="Intro | Zod"
  desc="Introduction to Zod - TypeScript-first schema validation library with static type inference"
  url="https://zod.dev/"
  logo="https://zod.dev/icon.png?icon.b38958c8.png"
  preview="https://zod.dev/og.png?title=Intro&description=Introduction%20to%20Zod%20-%20TypeScript-first%20schema%20validation%20library%20with%20static%20type%20inference&path=zod.dev"/>

<SiteInfo
  name="StefanTerdell/zod-to-json-schema"
  desc="Converts Zod schemas to Json schemas."
  url="https://github.com/StefanTerdell/zod-to-json-schema/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d6bd4b5434bb8395412852e7934361faa98679c5054e6f4c7b7f2c6956ff5a8d/StefanTerdell/zod-to-json-schema"/>

<SiteInfo
  name="Tool use with Claude"
  desc="Connect Claude to external tools and APIs. See where tools execute, when Claude calls them, and which tool fits your task."
  url="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview/"
  logo="https://platform.claude.com/favicon.svg"
  preview="https://platform.claude.com/web-api/og/docs/en/agents-and-tools/tool-use/overview?design-rev=2"/>

> Forcing structured arguments through a tool definition.

<SiteInfo
  name="Structured model outputs | OpenAI API"
  desc="Understand how to ensure model responses follow specific JSON Schema you define."
  url="https://developers.openai.com/api/docs/guides/structured-outputs/"
  logo="https://developers.openai.com/favicon.png"
  preview="https://developers.openai.com/og/api/docs/guides/structured-outputs.png"/>

> Strict schema conformance through constrained decoding.

<SiteInfo
  name="dottxt-ai/outlines"
  desc="Structured Outputs"
  url="https://github.com/dottxt-ai/outlines/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/24319f8337690f8a3e9ff93fb53ba3cb4e1fff99e3d7e7ff958cc916beff58f2/dottxt-ai/outlines"/>

<SiteInfo
  name="beenotung/best-effort-json-parser"
  desc="Parse incomplete JSON text in best-effort manner. Useful for partial JSON responses, broken network packages, LLM responses with markdown fences or exceeding token limits, and configuration files w..."
  url="https://github.com/beenotung/best-effort-json-parser/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9ae9f3ca32934c9a94cbdad0e820216952786ec41dafe09a09c0340a1cbb46a6/beenotung/best-effort-json-parser"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Reliable Structured Data Out of an LLM",
  "desc": "Most tutorials about calling a language model end at JSON.parse(response.content). That line works on your first ten test cases. Then you ship, and somewhere around request four hundred the model retu",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-reliable-structured-data-out-of-an-llm.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
