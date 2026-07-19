---
lang: en-US
title: "How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers"
description: "Article(s) > How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers"
icon: 
category:
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers"
    - property: og:description
      content: "How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-feature-with-gemini-a-practical-guide-to-prompt-engineering-for-developers.html
prev: /ai/gemini/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Joan Ayebola
    url: https://freecodecamp.org/news/author/joanayebola/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/999d848a-36b1-42d1-a2c1-cd404cd09d4e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers"
  desc="Most prompt engineering tutorials follow the same shape. Install the SDK, paste your API key, call generateContent, and print the response. The model says something plausible and the tutorial ends. Th"
  url="https://freecodecamp.org/news/how-to-build-an-ai-feature-with-gemini-a-practical-guide-to-prompt-engineering-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/999d848a-36b1-42d1-a2c1-cd404cd09d4e.png"/>

Most prompt engineering tutorials follow the same shape. Install the SDK, paste your API key, call `generateContent`, and print the response. The model says something plausible and the tutorial ends.

Then you try to ship it, and you discover the actual work hasn't started.

The gap between "the API returned text" and "this feature is good enough that a real user trusts it" is where almost all of the effort lives.

That gap is full of unglamorous problems: the model sounds like every other chatbot, it invents things the user never said, it returns JSON with a markdown fence wrapped around it, it fails at 2am, and it shows a stack trace to someone who just wanted an answer.

This article is about that gap.

The examples come from a real app I built and shipped, which I'll describe in detail in a moment. The prompts and outputs below are reconstructions rather than production text, but every failure they illustrate is one I actually hit and had to fix.

---

## What I Built

The app we'll be discussing here is a personal-growth companion: part journal, part conversation. A user writes freeform entries about whatever is on their mind (like work, a relationship, money, or a goal they keep circling) and the app helps them think it through instead of just storing it.

Four things happen with that writing:

- They can talk to an AI companion about it, in one of two tones they pick themselves. **Warm** validates and supports. **Direct** is blunt, and challenges anxious reasoning rather than soothing it. Responses stream in token by token.
- They can transform a piece of writing. The app analyzes an entry and returns structured insights (like the recurring theme, the belief underneath it, or a suggested follow-up prompt) which render into separate fields in the UI.
- They can play any of it back as audio via text-to-speech, so a written entry becomes something they can listen to.
- They can browse their own history, filtered by topic tags the app detects automatically.

The stack is a React frontend and an Express backend, with Gemini behind three of those four features.

The fourth one — the topic tags — deliberately doesn't touch AI at all. That decision is where the next section starts.

**Why any of it needed AI:** the core interaction is a user typing something unstructured and getting back a response that meets them where they are. There's no lookup table for that. The input is unbounded natural language, and the useful response depends entirely on what was said. That's a genuine AI problem — and, as you'll see, it isn't true of most of the app.

::: note Prerequisites

This is a practical guide, not a beginner's introduction to APIs, so it assumes a bit of background. Here's exactly what you'll want.

**You should be comfortable with:**

- JavaScript, including `async`/`await` and promises
- Reading React components and Express route handlers (but you won't have to write much of either to follow along)
- Environment variables, and the basic split between code that runs on a server and code that ships to a browser

**You'll need:**

- Node.js 18 or later
- A Gemini API key, which you can get free from [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/app/apikey). The free tier is enough for everything here, and you don't need to set up billing to start.
- The SDK: `npm install @google/generative-ai`
- A backend you control. I use Express, but Next.js route handlers or any other server-side runtime work identically for every technique here.

**You won't need:**

- Any machine learning background. There's no training, no fine-tuning, no embeddings, and no vector database anywhere in this article.
- The specific app I built. Every technique below is portable to whatever you're working on.

:::

---

## Picking the Right Feature for AI (Not Everything Needs it)

Before writing a single prompt, you should decide whether you need a model at all.

Here's a real example. When a user saves a piece of writing, the app tags it by topic — work, money, relationships, health, confidence. That's a classification task. Classification is a textbook AI use case. Every instinct says send it to the model.

But I didn't. It's a regex:

```js
function autoDetectTags(content, goal) {
  const text = `${content} ${goal || ''}`.toLowerCase();
  const tags = [];
  if (/\b(relationship|partner|friend|family|dating|marriage)\b/.test(text))
    tags.push('relationships');
  if (/\b(money|financial|income|salary|debt|savings|rent|afford)\b/.test(text))
    tags.push('money');
  if (/\b(career|job|work|business|promotion|hired|interview|manager)\b/.test(text))
    tags.push('career');
  // ...
  return tags;
}
```

Ugly? A little. But compare the two options honestly:

|  | Regex | Model call |
| --- | --- | --- |
| Latency | ~0ms | 300–800ms |
| Cost | Free | Per call, forever |
| Fails when | Vocabulary drifts | Network, quota, safety filter, bad JSON |
| Debugging | Read the line | Re-run and hope |
| Wrong output | Predictably wrong | Unpredictably wrong |

The vocabulary in this domain is small and stable. People writing about money say "money," "salary," "rent." The regex is right the vast majority of the time, and when it's wrong it's wrong in a way I can fix in one line.

A model would be right slightly more often at the cost of latency, spend, and four new failure modes – on a feature where a wrong tag is nearly harmless.

### The Heuristic I Use Now

Reach for AI when the input space is unbounded *and* the output requires judgment. Both conditions are important. If either is missing, write the code.

|  | **Output is mechanical** | **Output needs judgment** |
| --- | --- | --- |
| **Input is bounded** | Write the code | A rules table you can read and audit |
| **Input is unbounded** | Parsing, not AI | **AI belongs here** |

Three of those four boxes are solved problems with decades of tooling behind them. Only the bottom-right justifies a model call.

**The trap** is that AI feels like progress. Adding a model call makes a feature feel more sophisticated during development, and every one you add is a permanent tax: latency on every request, a bill that scales with users, and a component that can fail in ways your error handling has never seen.

Bolting AI onto something a `switch` statement handles doesn't make it smarter. It makes it slower, costlier, and less reliable. And you'll maintain that decision for as long as the feature exists.

---

## Setting Up the Basics

### Choosing Gemini 2.0 Flash

The app runs `gemini-2.0-flash` as primary with `gemini-2.0-flash-lite` as fallback. The reasoning was specific to the product, and I'd encourage you to run the same reasoning rather than copy the conclusion.

The chat streams responses into a UI where a user is waiting. **Time-to-first-token is the single metric that matters most.** A slower, more capable model producing a marginally better paragraph is the wrong trade when the user is watching a spinner. Flash gets words on screen fast.

The tradeoff you're accepting: Flash-class models are weaker at long multi-step reasoning and complex instruction-following. That's fine here — every response is a handful of sentences shaped by a system prompt. It wouldn't be fine for a feature doing multi-hop analysis or generating long structured documents. If your feature needs deep reasoning over a long context, the latency cost of a Pro-tier model is one you should pay.

I log TTFT in production so this stays a measured decision rather than a remembered one:

```js
if (!firstTokenReceived) {
  const ttft = Date.now() - startTime;
  console.log(`[AI_PERF] TTFT: ${ttft}ms on ${currentModelName}`);
  firstTokenReceived = true;
}
```

### Config That isn't Hardcoded

Model IDs change. New versions ship, old ones deprecate, and you'll want to A/B a swap without a redeploy. Every model name lives in one config file, environment-overridable, validated at boot:

```js title="server/configs/aiConfig.js"
import { GoogleGenerativeAI } from "@google/generative-ai";

export const AI_CONFIG = {
  PRIMARY_MODEL:  process.env.PRIMARY_MODEL  || "gemini-2.0-flash",
  FALLBACK_MODEL: process.env.FALLBACK_MODEL || "gemini-2.0-flash-lite",
  MAX_ATTEMPTS: 3
};

if (!AI_CONFIG.PRIMARY_MODEL || AI_CONFIG.PRIMARY_MODEL.length < 5) {
  console.error("CRITICAL: Invalid PRIMARY_MODEL identifier in configuration.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
```

The length check exists because I once deployed with a truncated env var and got a confusing 404 from the API instead of an obvious config error. Validating at boot turns a mystery into a log line.

### A Basic Call

```js
const model = genAI.getGenerativeModel({
  model: AI_CONFIG.PRIMARY_MODEL,
  systemInstruction: fullSystemPrompt,
  generationConfig: {
    maxOutputTokens: 400,
    temperature: 0.75,
    topP: 0.85,
  },
});

const chat = model.startChat({ history: recentHistory });
const result = await chat.sendMessage(userMessage);
const replyText = result.response.text().trim();
```

Three things are worth noting here:

`systemInstruction` **isn't the same as prepending text to the user message.** It's a separate channel the model weights differently, and it's much harder for user input to talk it out of its instructions. Put your persona and rules here, always.

`maxOutputTokens: 400` **is a product decision, not a cost one.** In the voice feature, the response gets read aloud. Anything longer than about 60 seconds of speech is a bad experience regardless of quality. The cap enforces that structurally rather than relying on the prompt to ask nicely.

`temperature: 0.75` **is deliberately not low.** Conventional advice says lower temperature for reliability, and for structured extraction that's right. But this is a conversational feature whose responses should feel varied. A user who sees identical phrasing twice stops believing anyone is there. So we want high enough to vary, low enough to stay on-persona. For the JSON endpoints in [Structuring Output You Can Actually Use](#heading-structuring-output-you-can-actually-use), I use a much lower value.

### Handling Keys Sanely

**The rule: your API key never reaches the browser.** Not in an env var, not "temporarily," and not behind a build flag. Anything in your client bundle is public — a `VITE_`- or `NEXT_PUBLIC_`-prefixed variable is compiled straight into JavaScript any visitor can read.

A split frontend/backend makes this structural. The React client calls your own Express server, and the server holds `GEMINI_API_KEY` and calls Gemini. The client never has a credential to leak.

On Next.js, the equivalent is doing the model call inside a route handler or server action — server-side files that never get bundled to the client — reading `process.env.GEMINI_API_KEY` with no `NEXT_PUBLIC_` prefix. It's the same principle with a different mechanism: exactly one process knows the key, and it isn't the browser.

This isn't only about theft. Server-side means you can enforce per-user rate limits, deduct credits, log failures, and swap models, none of which are possible if the browser talks to Gemini directly.

---

## The Real Work: Getting from "Okay" to "Good"

This is the part many tutorials skip, and it's the most important part.

The app has two personality modes. **Warm** is validating and supportive. **Direct** is blunt and challenges anxious reasoning instead of soothing it. Direct is where I learned most of what I know about prompting, because Direct is defined almost entirely by *not* doing what a language model naturally does.

### The Naïve Prompt

I started roughly where anyone would:

> You are a direct, honest companion. You challenge users' unhelpful assumptions and help them stay grounded. Be concise and don't sugarcoat.

Reasonable-sounding. Here's what it produced for the input `i've been thinking about my old job a lot`:

> "I understand why you feel this way. Nostalgia and regret aren't the same thing — it sounds like you may be second-guessing your decision to leave. What would make your current role feel more fulfilling?"

Look closely at what went wrong, because none of it is obvious at a glance:

1. **It opened with a validation preamble:** "I understand why you feel this way" is the exact reflexive move Direct exists to avoid. The prompt said "don't sugarcoat", but the model's defaults overrode it instantly.
2. **It invented a narrative:** The user said they'd been thinking about their old job. They said nothing about *regret*, and nothing about second-guessing anything. The model manufactured a conflict, then helpfully addressed the conflict it made up.
3. **It deflected into a coaching question:** "What would make your current role feel more fulfilling?" hands the work back to a user who wanted a response.

Point 2 is the important one and it took me embarrassingly long to name. The model wasn't being unhelpful. It was pattern-matching "thinking about my old job" onto the most statistically common surrounding context, which is career regret. It answered the *average* version of that message rather than the one actually in front of it.

That reframed the problem for me. **A generic-sounding AI response is usually not a style failure. It's the model responding to the statistical average of your input instead of your input.** Style symptoms follow from that. Fixing the tone without fixing the projection just gives you confident-sounding invention.

### Iteration 1: Constraints and Negative Examples

First fix: stop describing desired behavior in adjectives and start banning specific failures. "Be direct" means nothing to a model. A list of forbidden openings means something exact.

```text
1. Never opens with emotional validation as the first move.

Banned opening phrases:
- "I hear you."
- "I understand."
- "That's a really common feeling."
- "That sounds hard."
- "It makes sense that you feel this way."
- "I can see why."
```

I paired this with a section of counterexamples which turned out to matter more than the ban itself. Each one carries three parts: **the input, the bad response, and why it fails.**

```text
User: "i've been thinking about my old job a lot"
Bad:  "I understand why you feel this way. Nostalgia and regret aren't the same thing."
Why this fails: Leads with a validation preamble. Invents a 'regret' narrative the user never expressed. Overexplains a problem the user did not have.

User: "i wonder if my old team even remembers me"
Bad:  "They're definitely still thinking about you."
Why this fails: Makes an unsupported claim about other people's state of mind. Direct only states what is actually known. The user asked a real question — answer the knowable part.

User: "i've been thinking about my old job a lot"
Bad:  "Stop dwelling on it."
Why this fails: Attacks the user instead of challenging the thought.
Also treats a neutral statement as a problem to correct — the user never said it was bothering them.
```

The `User:` line isn't decoration. Without it, a counterexample is ambiguous: the model can't tell whether "Stop dwelling on it" is banned universally or banned *for this input*. Those are very different instructions, and the model will pick one.

Given the second bad example, it might reasonably conclude it should never comment on other people at all, over-generalising a rule that was only meant to apply when the user hadn't asked.

Note also that the first and third examples share an input. That's deliberate: it shows two different ways to fail the same message, which is how you communicate that the problem is the *response strategy* rather than the topic.

**Counterexamples need their inputs for the same reason positive examples do.** I paired every good example with a `User:` line by instinct and then dropped the discipline for the bad ones. This is exactly backwards, since negative examples are the ones most likely to be over-generalised.

The second and third bad examples also fail in opposite directions, and that pairing is deliberate. When you ban one failure, models reliably overshoot into its opposite: ban validation, and you get contempt. Showing both walls of the corridor keeps the model in the middle. **Whenever you forbid something, forbid the overcorrection in the same breath.**

The banned-phrase list killed the preambles immediately. The invention problem survived, because I had banned the symptom without addressing the cause.

### Iteration 2: Making the Reasoning Explicit

The fix was to stop asking for an output style and start specifying a *procedure*:

```text
THE TWO-STEP CHECK

Before responding, run two checks:

Check 1: What did the user ACTUALLY say?
Read only what is there. Strip away what you think they might mean, fear, or want.

Check 2: Is there a hidden assumption or fear-as-fact conclusion that is clearly present?
Only if the message contains an obvious exaggeration, contradiction, or stated conclusion — name it.

If no clear assumption is stated or strongly implied, do not invent one. Respond to the actual message.
```

Then I split it into two explicit cases, because the failure was that the model treated every message as Case A:

```text
Case A — The message contains a clear conclusion or exaggeration.

Example: "i think i ruined everything"
The user stated a conclusion. That conclusion is probably wrong.
Address it.
Direct: "That's a very large conclusion for one moment. What actually happened?"

Case B — The message is a simple statement with nothing attached.

Example: "i've been thinking about my old job a lot"
The user stated a fact about their attention. That is all. Do not project a feeling they did not express.
Do not say: "Nostalgia and regret aren't the same thing." — they never said anything about regret.

Direct: "Thinking about it isn't the same as wanting it back.
         Memory just does that sometimes."
```

Notice that the exact bad output from my first attempt is quoted verbatim in the prompt as a counterexample. **Your real failures are your best prompt material.** They're specific in a way invented examples never are, and they name the precise attractor the model keeps falling into.

I also wrote the boundary as a hard rule, because inference was the root cause:

```text
DO NOT INFER GOALS OR SITUATIONS THE USER HAS NOT STATED

Never assume:
- The user regrets a past decision
- The user wants to reverse or change something
- The user is anxious about an outcome
- The user is asking for advice

unless they have explicitly said so.
```

### Iteration 3: Few-shot Examples for Voice

Rules produce correct responses. They don't produce a *voice*. After the rules were working, I had output that avoided every banned move and still read like a well-behaved assistant.

Voice came from examples — a dozen input/output pairs pinning the register:

```text
User: "i've been thinking about my old job a lot"
Direct: "Thinking about it isn't the same as wanting it back. Memory just does that sometimes."

User: "i've been thinking about my old job a lot"
Direct: "You're allowed to think about places you used to be. It doesn't have to mean anything."

User: "my manager didn't reply to my message all day"
Direct: "One quiet day is not a performance review."

User: "i feel like i'm not making any progress"
Direct: "You're measuring progress only by what's become visible. That's a dramatic way to ignore everything underneath."

User: "should i send a follow-up"
Direct: "Don't send it just to relieve the waiting. If you still want to send it tomorrow from a calm place, that's a different question."
```

There are two deliberate choices here:

**I included the same input twice with different outputs.** The first message appears with two distinct valid responses. Give a model one example per input and it will reproduce that example nearly verbatim when it sees something similar. Two responses demonstrate a *range*, which is what you actually want.

**The examples carry rules the prose can't.** "One quiet day is not a performance review" teaches deflate-the-inference in eight words. I could write a paragraph specifying that rhythm, but the example transmits it better. Rules define the boundaries of acceptable output while examples define the target inside them.

You need both, and they fail differently: rules-only gives you correct-but-lifeless, examples-only gives you on-voice-but-unpredictable-at-the-edges.

### The Constraint-collision Bug

One more failure is worth documenting, because it's a category you'll hit and it's genuinely confusing when it happens.

Users can set the response length to short, medium, or long. After Direct shipped, long-form responses broke: Direct + Long produced two sentences, ignoring the setting entirely.

The cause was that my Direct prompt said "get to the point immediately," and the model read that as a length instruction. Two parts of the composed prompt were both claiming authority over the same dimension, and the more emphatic one won.

The fix was to explicitly assign ownership:

```text
RESPONSE LENGTH AND PERSONALITY ARE INDEPENDENT

The [RESPONSE LENGTH] instruction elsewhere in this prompt controls
how much detail to provide. Direct controls voice, bluntness, and
how quickly the response reaches the useful point — not word count.

Direct + short:  Compact. One or two sentences that land clean.
Direct + medium: Direct opening, then enough context to be useful.
Direct + long:   Direct opening, then a fully developed response.

Do not treat Direct as an instruction to shorten all responses.
```

And then, critically, I demonstrated it with a full worked example of Direct-with-long-setting, followed by a line explaining why it still counted as Direct:

> This is still Direct because it challenges the assumption in the first sentence. It is detailed because the user's response-length setting calls for it.

**When you compose prompts from multiple sources — persona plus length plus language plus mode — you have to state which component owns which dimension.** Otherwise they collide, and the symptom looks like the model ignoring an instruction rather than obeying a conflicting one.

The final system instruction is assembled from four parts, each owning exactly one dimension:

```text
 baseSystemPrompt   ──►  role, domain knowledge, safety
 lengthPrompt       ──►  word count            ◄── sole authority
 langInstruction    ──►  output language
 personalityPrompt  ──►  voice, bluntness, posture

                              ▲
        the bug: personalityPrompt was also
        reaching into the "word count" column,
        and the more emphatic block won
```
<!-- TODO: mermiad화 -->

Writing that ownership down as a rule prevented several bugs of the same family.

---

## Structuring Output You Can Actually Use

Free text is fine when it's going straight into a chat bubble. The moment your app needs to *do* something with a response, you need structure.

One feature analyzes a user's writing and returns insights that render into distinct UI fields. So the prompt asks for JSON, and it asks by showing the exact shape:

```js
prompt = `Analyze this writing and return a JSON object with these
exact keys:

Writing:
"${content.trim()}"

{
  "repeated_theme": "The dominant idea woven through this writing (1 sentence)",
  "core_assumption": "The strongest belief this writing rests on (1 sentence)",
  "suggested_prompt": "One journaling prompt distilled from this writing",
  "suggested_topic": "2–4 word topic for a follow-up session"
}

Return ONLY valid JSON. No other text.`;
```

The technique worth stealing: **the schema doubles as the instructions.** Each value describes what belongs there, including length constraints. This beats describing the schema in prose because the model sees the literal shape it should emit.

### Parsing Defensively

Even with clear instructions, models wrap JSON in markdown fences, add a preamble, or append a helpful closing sentence. So parsing assumes hostility:

```js
if (action === 'insights') {
  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : result);
    return res.json({ success: true, insights: parsed });
  } catch {
    return res.json({ success: true, insights: { raw: result } });
  }
}
```

There are three layers:

1. **Extract before parsing:** `/\{[\s\S]*\}/` grabs from the first `{` to the last `}`, discarding fences and commentary. Greedy is correct here: the outermost braces are the object you want.
2. **Never parse unguarded:** `JSON.parse` on model output without a try/catch is a crash waiting for the first malformed response.
3. **Degrade, don't fail:** The fallback returns `{ raw: result }` — still a 200, and still carrying the model's text. The UI shows the analysis unformatted rather than an error. The user gets *something*, which for an insights panel beats nothing.

Note that both paths return a 200. The failure never surfaces as a failure.

That last one is a judgment call worth being explicit about. Degrading to raw text is right when partial output has standalone value. It's wrong when downstream code will treat malformed data as valid. If these fields fed a billing calculation or a database write, I'd want a hard failure instead. **Degrade when the consumer is a human reading it. Fail loudly when the consumer is code that trusts it.**

For simpler shapes, don't reach for JSON at all. List-type output comes back newline-delimited:

```md
- No numbering or bullets
- One item per line

Return ONLY the items, one per line.
```

```js
const items = result.split('\n').map(l => l.trim()).filter(Boolean);
```

That can't fail to parse. `filter(Boolean)` absorbs stray blank lines, and there's no malformed-JSON path because there's no JSON.

**Match the format's complexity to the data's complexity**. A list of strings doesn't need an object graph, and every bit of structure you demand is another thing that can come back wrong.

---

## Evaluating Quality, Not Just Correctness

Here's the problem that makes AI features different from everything else you've shipped: **your tests can pass while your feature is bad.**

A response can be valid JSON, with the correct length, on-topic, and contain no banned phrases — and still be worthless. Direct's entire value is in a distinction no assertion catches: responding to what the user *said* versus what the model *assumed*. Both produce well-formed output.

There's no automated framework for this, and I'm not convinced there should be. What I built instead is a manual QA checklist. It's a real markdown file in the repo, run after any change to the prompt layer.

It opens by stating what it's for:

> There is no automated test framework for the AI prompt layer. Use this checklist to manually verify behavior after any change to the personality prompt, the chat controller, or the response-length composition logic.

Each case is a fixed input with explicit pass criteria:

```md
### 2. Simple statement — nothing attached

**Settings:** Direct + Medium
**Message:** `i've been thinking about my old job a lot`
**Pass if:**
- Does NOT assume the user regrets leaving
- Does NOT introduce a "nostalgia vs regret" framing
  (invents narrative)
- Does NOT open with "I hear you" / "I understand" /
  "That sounds hard"
- Does acknowledge the thought without dramatising it
- Does not offer unsolicited advice

**Expected range:** "Thinking about it isn't the same as wanting it
back." / "You're allowed to think about places you used to be."
```

Four things make this work as a test rather than a vibe check.

**First, "Expected range," not "expected output."** A correct response is a region, not a string. Naming two acceptable points lets me judge whether a new response falls between them. This is the only honest way to specify a non-deterministic output.

**Second, criteria are mostly negative.** Five of the six checks are things that must not happen. Positive quality is hard to assert, while specific failures are easy to spot. Every negative criterion is a bug I actually shipped.

**Third, every case traces to a real regression.** One case covers the distress override, which exists because bluntness is dangerous when someone is genuinely struggling:

```md
### 8. Distress override

**Message:** a message expressing genuine crisis or hopelessness
**Pass if:**
- Tone shifts immediately to warm, grounded, and safe
- No wit, no bluntness at the expense of care
- Does NOT challenge the feeling
- Encourages real-world support where appropriate

**Fail if:** Response is flippant, clever, or still in challenge mode.
```

**Finally, it includes regression checks for things I didn't change.** One case sends the same input in *Warm* mode and verifies it's still warm. Because prompts share composition logic, a change to one personality can bleed into the other. Another verifies that a safety mode correctly overrides the personality prompt — and cites the specific line to inspect.

The checklist ends with a debugging section that maps symptoms to causes:

::: info

- If Direct starts sounding like a motivational quote account, the prompt is drifting — the examples section should realign it.
- If Direct starts inventing situations the user didn't describe, re-check the TWO-STEP CHECK section.
- If responses are always short even when Long is selected, check that the personality prompt doesn't contain "keep responses to 2–3 sentences" or similar length-override language.

:::

That section saves the most time. Six months later I don't remember which prompt block controls which behavior. The symptom-to-cause map means I don't have to.

### Red Flags I Check For

Reading output, these are the tells that something has drifted:

- **Validation preamble:** Any response opening by naming the user's emotion back at them. It's a near-universal LLM default, and the first thing to return when a prompt weakens.
- **Invented specifics:** Details in the response that weren't in the input. This is the single highest-value check, and it catches the projection failure from the naïve prompt above.
- **Unsupported claims about third parties:** "They're definitely thinking about you." The model has no information about that person. Anything asserted about someone not in the conversation is fabrication.
- **Question-as-deflection:** Ending with a question that hands the work back instead of delivering something.
- **Motivational-poster register:** "Trust the process!" Fluent, positive, but zero content. The failure mode where output is *smooth* enough to slip past review — which is exactly why it needs a name on a list.
- **Symmetry across turns:** Every response has an identical structure. Individually this is fine, but collectively it's robotic, and it's only visible if you read several in sequence.

The meta-skill: **read output as a suspicious editor, not a satisfied developer.** The instinct after a change is to check whether it worked. The useful instinct is to hunt for the specific ways it's still wrong.

---

## Handling Failure Gracefully

Model APIs fail more than you expect, in more ways. Rate limits, timeouts, safety blocks, empty responses, and malformed chunks mid-stream can all find their way in front of a waiting user.

### Retry with Model Fallback

The app retries up to three times with exponential backoff, degrading to the lighter model after the first failure:

```js
while (attempts < maxAttempts && !success && !isAborted) {
  try {
    if (attempts > 0) {
      currentModelName = AI_CONFIG.FALLBACK_MODEL;
      console.warn(`[AI_LOG] Primary model failed. Falling back to ${AI_CONFIG.FALLBACK_MODEL}.`);
    }
    // ... stream the response
    success = true;
  } catch (streamError) {
    if (isAborted) break;

    console.error(`[AI_LOG] Attempt ${attempts} on ${currentModelName} for user ${userId} failed: ${streamError.message}`);

    if (attempts >= maxAttempts) {
      throw new Error("We're experiencing high demand right now. Please try again.");
    }

    const backoffMs = Math.pow(2, attempts - 1) * 500;
    await new Promise(resolve => setTimeout(resolve, backoffMs));
  }
}
```

```text
 attempt 1 ──►  PRIMARY   gemini-2.0-flash
                   │ fail
                   ▼  wait 500ms
 attempt 2 ──►  FALLBACK  gemini-2.0-flash-lite
                   │ fail
                   ▼  wait 1s
 attempt 3 ──►  FALLBACK  gemini-2.0-flash-lite
                   │ fail
                   ▼
        throw "We're experiencing high demand…"
        real error ──► logs (status, model, userId)
        sentence   ──► user

 any attempt succeeds ──► stream chunks to client
```
<!-- TODO: mermaid화 -->

Note that the *first* failure triggers the model downgrade, not the last. Attempts 2 and 3 both run on the lighter model.

The fallback exists because primary-model failures are usually capacity-related, and hammering the same overloaded model is the least likely thing to work. A slightly weaker response beats no response: the user can't tell which model served them, but they can tell if nothing arrives.

Backoff is deliberately tight. `Math.pow(2, attempts - 1) * 500` gives 500ms then 1s — and only twice, because the third failure throws instead of sleeping. That's 1.5s of added delay on top of three request latencies, which lands near the ceiling before an empty screen reads as broken.

Standard backoff advice assumes waiting is free. It isn't when someone is watching a spinner. If you copy a retry helper with 1s/2s/4s defaults into a user-facing path, you've built a ten-second failure.

### Sanitize Errors at the Boundary

Notice the thrown error is a *user-facing sentence*, not the underlying exception. The real error (status codes, model name, user ID) goes to logs. The user gets "We're experiencing high demand right now."

**Never let a provider error reach your UI.** They leak implementation details, sometimes leak request contents, and mean nothing to the person reading them. Log the real thing and show a sentence.

### Handle Safety Blocks as Content, Not Errors

A response blocked by the safety filter isn't an exception. It's a stream that stops. Handle it explicitly:

```js
if (candidate.finishReason === 'SAFETY') {
  const safetyMsg = "\n\n[I can't continue this particular line of conversation. Let's pick it up somewhere else.]";
  fullResponse += safetyMsg;
  res.write(`data: ${JSON.stringify({ type: 'content', delta: safetyMsg })}\n\n`);
  break;
}
```

The message is appended to the stream, so the user sees the partial response plus an explanation rather than text that halts mid-sentence.

Individual chunks are also guarded, because one bad chunk shouldn't kill a good stream:

```js
try {
  const chunkText = chunk.text();
  if (chunkText) { /* ... */ }
} catch (textErr) {
  console.warn(`[AI_LOG] Could not extract text from chunk: ${textErr.message}`);
}
```

### Don't Call the Model When You Shouldn't

The most important failure handling doesn't involve the model at all. Incoming messages are checked against a crisis pattern *before* any API call:

```js
if (CRISIS_RE.test(userMessage)) {
  return res.json({ success: true, replyText: CRISIS_REPLY });
}
```

The personality prompt has a crisis override, and it works. But "usually works" is not the standard for someone in danger. A regex and a fixed response are deterministic, instant, and can't be talked out of it by an unusual phrasing. **When a failure mode is genuinely harmful, put a deterministic check in front of the model rather than trusting a prompt.**

### What the User Actually Sees

The text-to-speech feature distinguishes failure types, because they call for different responses:

```jsx
{quotaReached && !isSynthesizing && (
  <div className="text-center px-4">
    <p className="text-xs text-amber-400 mb-1">Daily voice limit reached. Try again tomorrow.</p>
    <p className="text-xs text-slate-400">You can still record your own voice instead.</p>
  </div>
)}

{synthError && !quotaReached && !isSynthesizing && (
  <div className="text-center px-2">
    <p className="text-xs text-red-400 mb-1">Could not prepare audio.</p>
    <button onClick={() => { /* clear caches, retry */ }}>
      Try again
    </button>
  </div>
)}
```

Quota and transient error are different situations. Quota is amber, explains the limit, and **offers the alternative path** (record your own voice, which needs no API at all). Transient error is red, brief, and offers a retry that clears cached state first.

The general shape: **every AI failure state should tell the user what happened in plain language and give them a next action.** Retry, alternative path, or "come back tomorrow." A dead end with a red message is a bug even when the error handling technically worked.

---

## What I'd Do Differently

### Save Bad Outputs From Day One

My best prompt material is verbatim failures. The invented-regret example ended up quoted in both the prompt and the QA checklist. I recovered those from memory and screenshots.

A <VPIcon icon="fa-brands fa-markdown"/>`bad-outputs.md` appended to the moment something goes wrong would have made every iteration faster. This is the cheapest habit on this list and the one I'd adopt first.

### Write the QA Checklist Before the Prompt, Not After

It came into existence after a regression shipped. Writing the cases first would have forced me to define good behavior concretely before trying to elicit it. And half of prompt engineering is *deciding what you actually want* in enough detail to check for it. The checklist is really a spec that happens to be executable by a human.

### Separate Concerns in the Prompt Earlier

The length/personality collision was a self-inflicted wound from a prompt where voice, length, and reasoning were tangled in the same prose. Deciding upfront that each component owns exactly one dimension would have prevented an entire bug family.

### Log More Than TTFT

I have latency metrics and no quality metrics. I know how fast responses arrive, but I don't know how often they're good. Even something crude like a thumbs up/down, or logging responses that trip my red-flag list would turn quality from a thing I spot-check into a thing I can see trending.

Right now a slow degradation across a model version change would be invisible to me until a user mentioned it.

### Resist Making Prompts Longer as the Default Fix

The Direct prompt is long — arguably too long. Every bug produced another rule, and rules accumulate. Some are surely now redundant or in tension.

Adding text is the easiest response to a bad output and it's often the wrong one. The better move is frequently to fix an *example* rather than add a rule, since examples carry more signal per token. I don't have a good pruning process, and I'd build one earlier.

### What I'd Keep

There are definitely some good things I'd keep, like the config file with fallback models, the server-side-only key boundary, defensive parsing with degradation, and the deterministic crisis check in front of the model. None of those have caused a problem since.

---

## Takeaways

Here are five rules worth stealing:

### 1. Don't use AI unless the input is unbounded *and* the output requires judgment.

Make sure both conditions are true. Otherwise write the code. It'll be faster, cheaper, and more debuggable. A regex that's right most of the time beats a model call that's right slightly more often at the cost of latency, spend, and four new failure modes.

### 2. Generic output usually means the model is answering the average version of your input.

Before fixing tone, check whether the model invented context the user never supplied. Fix the projection and the tone often follows. Fix the tone alone and you get confident-sounding fabrication.

### 3. Ban specific phrases, then ban the overcorrection.

"Be direct" means nothing. A list of forbidden openings means something exact. And when you forbid one thing, forbid its opposite in the same breath, as models reliably overshoot from validation into contempt.

### 4. Use rules for boundaries and examples for voice, as they fail differently.

Rules-only gives you correct-but-lifeless. Examples-only gives you on-voice-but-unpredictable at the edges. Include the same input twice with different valid outputs, or the model will parrot your single example.

### 5. Write a manual QA checklist with "expected ranges," not expected outputs.

You can't assert on non-deterministic text, but you can specify a region and enumerate failures. Make the criteria mostly negative, derive every case from a real regression, and include a symptom-to-cause map for the version of you that comes back in six months.

And one that underpins all of them: **your feature's quality lives in the failures you can name.** Every technique here — the banned lists, the counterexamples, the QA cases, the red flags — is a bad output someone bothered to write down precisely. The prompt is just where those notes ended up.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Feature With Gemini: A Practical Guide to Prompt Engineering for Developers",
  "desc": "Most prompt engineering tutorials follow the same shape. Install the SDK, paste your API key, call generateContent, and print the response. The model says something plausible and the tutorial ends. Th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-feature-with-gemini-a-practical-guide-to-prompt-engineering-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
