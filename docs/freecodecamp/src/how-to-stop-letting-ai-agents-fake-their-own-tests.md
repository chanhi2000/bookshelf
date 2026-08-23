---
lang: en-US
title: "How to Stop Letting AI Agents Fake Their Own Tests"
description: "Article(s) > How to Stop Letting AI Agents Fake Their Own Tests"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Stop Letting AI Agents Fake Their Own Tests"
    - property: og:description
      content: "How to Stop Letting AI Agents Fake Their Own Tests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-letting-ai-agents-fake-their-own-tests.html
prev: /programming/py/articles/README.md
date: 2026-08-27
isOriginal: false
author:
  - name: Daniel Nwaneri
    url: https://freecodecamp.org/news/author/dannwaneri/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/183633e3-b5fb-44cf-a0cb-32fd566ebc33.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Stop Letting AI Agents Fake Their Own Tests"
  desc="I signed off a hallucination fix as verified. We now had zero out of five fabricated responses, clean run, done. Then I ran it again under harder conditions and got 66.7%. The number I'd trusted enoug"
  url="https://freecodecamp.org/news/how-to-stop-letting-ai-agents-fake-their-own-tests"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/183633e3-b5fb-44cf-a0cb-32fd566ebc33.png"/>

I signed off a hallucination fix as verified. We now had zero out of five fabricated responses, clean run, done.

Then I ran it again under harder conditions and got 66.7%. The number I'd trusted enough to write "HUMAN-VERIFIED" next to was wrong. This wasn't because I lied, but because one clean run and "verified" aren't the same thing. I'd also built a tool whose entire point is refusing to let that distinction slide, then almost let it slide anyway.

That's the kind of irony that deserves its own specification.

The tool is spec-verify: a Claude Code skill that takes the Given/When/Then acceptance criteria [**spec-writer**](/freecodecamp.org/how-to-stop-letting-ai-agents-guess-your-requirements.md) already generates and turns them into tests that are checked for whether they test anything.

This tutorial shows you how to install spec-verify, how to run it against real code, and how to read the two failure modes it's built to catch. They're opposites, and treating them the same defeats the point of building this in the first place.

---

## The Problem spec-writer Doesn't Solve

spec-writer is a Claude Code skill that turns a vague feature request into a structured spec, and flags every decision it made without being told to as `[ASSUMPTION: ...]`. Feed it a twelve-word request for a session-capture feature and, among other things, it surfaces this:

```plaintext
3. Session ID from .jsonl filename is the deduplication key
   Impact: MEDIUM
   Correct this if: session IDs are stored differently in your schema
```

That's a real decision hiding in a twelve-word prompt: identify a session by its filename, and two copies of the same session look like two different sessions the moment one gets renamed. (For a full walkthrough of how spec-writer gets to that assumption: [**How to Stop Letting AI Agents Guess Your Requirements**](/freecodecamp.org/how-to-stop-letting-ai-agents-guess-your-requirements.md).)

spec-writer's whole value is catching that assumption before code gets written. But say you catch it and correct it. You tell the agent "no, hash the content, not the filename." The agent writes the fix. It also writes a test, because you asked for one, or because that's just what agents do now.

Here's the part nothing checks: does that test actually verify the fix? Or does it call the dedup function, get back a list, assert the list is a list, and pass, regardless of whether the underlying bug is still there?

Given/When/Then is prose a human reads. It's not, by itself, a test a machine runs. The gap between those two things is where a corrected assumption quietly reverts into a real bug, and nobody notices until a session gets renamed in production.

---

## The Trap: Vacuous Tests

The clear fix is to have the agent generate a test from each Given/When/ Then block. Plenty of tools do exactly this. The trap is that "the agent wrote a test" and "the agent wrote a test that means something" aren't the same claim. And unfortunately, LLM-generated tests collapse into the first one more often than you'd expect: a test that runs, asserts something trivially true, and passes no matter what the code actually does. It looks like coverage. A green checkmark says nothing different than a red one would have, because neither was ever possible.

Worse: these tests don't just fail to catch the original bug. They keep passing after the behavior they were supposed to guard breaks, for a second, unrelated reason. Nothing gets verified. The test just looks exactly like every other passing test in the suite.

So the fix can't stop at "generate a test." It has to check whether the test would notice if the thing it's supposedly guarding actually broke.

---

## Mutation-Checked Test Generation

For each Given/When/Then block, spec-verify does four things:

1. **Generates the test:** the `Then` clause becomes a concrete assertion on a return value, on state, or a side effect. Never "runs without throwing."
2. **Generates one targeted mutation:** not a general mutation-testing sweep, but one deliberate, specific break informed by the criterion's paired `[ASSUMPTION: ...]` tag. If the assumption named the risk, the mutation reintroduces exactly that risk.
3. **Runs the test against the mutant:** if it still passes, the test never actually checked the thing it claimed to. That's a vacuous test, and it gets flagged, not trusted.
4. **Fails closed:** a criterion whose test can't be validated this way blocks "done," loudly, by name, with the reason stated, instead of quietly passing review.

---

## A Real Example

Take the exact assumption from the spec-writer example above: dedup key derived from a filename instead of file content. Here's the test that looks right:

```py
def test_dedup_sessions_runs(tmp_path):
    result = dedup.dedup_sessions([str(f)])
    assert result is not None
```

It calls the function, gets a list back, and passes. It would also pass against a version of `dedup_sessions` that used the filename as the key (the exact bug the assumption flagged) because it never checks *which* sessions survived deduplication, only that something came back.

Here's the one that actually checks the criterion:

```py
def test_renamed_session_still_deduped(tmp_path):
    original = tmp_path / "session_abc123.jsonl"
    original.write_bytes(content)
    renamed = tmp_path / "session_abc123_renamed_by_sync_tool.jsonl"
    renamed.write_bytes(content)  # same content, different name

    result = dedup.dedup_sessions([str(original), str(renamed)])

    assert result == [str(original)]
```

Run both against the correct implementation, then against a mutant where the dedup key is switched back to the filename (exactly the corrected assumption, reverted):

```plaintext
test                             baseline   mutant     verdict
test_dedup_verified.py           pass       FAIL       VERIFIED
test_dedup_vacuous.py            pass       pass       VACUOUS

PROOF PASSED: mutation check correctly told VERIFIED from VACUOUS.
```

One test fails the moment the bug comes back. The other doesn't notice anything happened. Same criterion with the green checkmark before you looked closer. But a completely different amount of protection.

---

## `VACUOUS` and `UNVALIDATABLE` Are Opposites, Not Variations

Not every criterion can be mutation-tested. When the fix I mentioned at the top of this article first shipped (an entity-grounding rule telling the model not to fabricate a payment provider's docs under another provider's name), it lived entirely in the system prompt. Plain-language instructions to an LLM. There's no function boundary to call and assert on. The only way to check it is to ask the model trick questions and read what it says. A mutation test can't reach that.

spec-verify calls this `UNVALIDATABLE`, and it's tempting to treat it the same as a vacuous test: something not-quite-good-enough that needs fixing. It isn't. A vacuous test is a defect: the test is bad, and the fix is always the same: write a better one. `UNVALIDATABLE` means the *criterion* sits outside what this technique can check at all, usually because the behavior is non-deterministic rather than because anyone did anything wrong.

Treat them the same and you get one of two bad outcomes: either you let vacuous tests slide because "some things just can't be tested" (they can, this one just wasn't written to), or you block forever on anything non-deterministic, which on a real codebase is often. Neither is right.

So the gate has two tracks:

- `VACUOUS` and `BROKEN-TEST`: no waiver, ever. The only way past a defective test is a better test.
- `UNVALIDATABLE`: clears only through an explicit, on-record human sign-off, where a person states in writing how they actually checked it.

Which brings me back to the opening. I signed off the entity-grounding criterion with a note citing a real number: zero out of five fabricated responses. That note passed spec-verify's structural check: it wasn't empty or a one-word rubber stamp, and it named an actual method.

It was also, it turned out, an optimistic single run. Independent retesting at a fixed temperature with no fixed seed found a 66.7% clean-decline rate, not 100%. Some provider pairs retrieved near-identical chunks and fooled the self-check more often than the first run suggested.

The honest fix wasn't a better sign-off. It was replacing the thing being signed off: a deterministic code-level gate for the known problem cases, which is testable the normal way, sitting alongside the prompt-based check for everything else. `UNVALIDATABLE` isn't a permanent state: it's a flag that something needs a human, or, ideally, needs to stop needing a human at all.

---

## The Structural Check Isn't a Truthfulness Check

This is the softer version of the exact vacuous-test problem: a `HUMAN-VERIFIED` note can be honest and still wrong, the way mine was. spec-verify's structural check on sign-off notes (reject empty notes, reject anything under a sentence's worth of text, reject a blocklist of stock phrases like "looks fine" or "lgtm") can't verify a human actually did what they claim. It only raises the cost of the laziest rubber stamp. A determined person can still pad a fake narrative past it.

For a team setting, there's a stronger version: resolve who-signed-off-and- when from a git commit's actual author and timestamp instead of trusting free-text fields in a JSON file. A fabricated sign-off then requires an actual commit under someone's real identity: visible in history, not an edit in a file nobody's watching. That's overkill for a solo project. It's the right call the moment more than one person could plausibly have a reason to fake one.

---

## How to Install spec-verify

Like spec-writer, spec-verify is a Claude Code skill: a markdown file plus a couple of runnable example directories, no package to install and no API key.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
mkdir -p ~/.claude/skills/spec-verify
git clone https://github.com/dannwaneri/spec-verify.git ~/.claude/skills/spec-verify
```

@tab <VPIcon icon="fa-brands fa-windows"/>

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force -Path "$HOME.claude\skills"
git clone https://github.com/dannwaneri/spec-verify.git "$HOME.claude\skills\spec-verify"
```

:::

---

## Run the Proofs Yourself

Don't take the `VERIFIED`/`VACUOUS` table above on faith: the repo ships both examples from this article as runnable code:

```sh
cd ~/.claude/skills/spec-verify/example
python run_proof.py
```

That reproduces the dedup table exactly. And the stronger sign-off tier:

```sh
cd git_attributed_signoff
python build_demo_repo.py
python check_signoff.py demo_repo entity_grounding
python tamper_demo.py
```

`tamper_demo.py` is worth running yourself, not just reading about: it edits a sign-off's note in the working tree without committing, then checks it again. The check refuses to trust the file at all, before it even reads the tampered note, because the working tree no longer matches any commit.

---

## How to Use It on Your Own Spec

Once installed, invoke it after you've implemented a feature that went through spec-writer, before you call the task done. It needs the spec-writer output (the Given/When/Then blocks and their `[ASSUMPTION: ...]` tags) and the implementation to check them against. It doesn't invent acceptance criteria to verify against. If there's no spec-writer output to plug into, there's nothing for it to do.

Read the report the way you'd read spec-writer's Assumptions summary: scan for anything that isn't `VERIFIED` first. `VACUOUS` or `BROKEN-TEST` means go fix the test. There's no version of that finding that's fine to ship. `UNVALIDATABLE` means decide, explicitly, whether a human is checking this by hand and saying so on the record, or whether the underlying behavior needs to move somewhere testable, the way the entity-grounding fix eventually did.

---

## Where This Leaves the Trilogy

spec-writer catches the feature you built for the wrong reason. spec-verify catches the test that would have told you, and didn't. Between the two: an assumption gets flagged, then corrected before the code ships, and now there's a test that actually fails if the correction gets undone six months from now by someone who never read the original spec.

None of this replaces judgment. A spec can be well-formed and still wrong about what to build. A sign-off can be honest and still miss what a harder retest would have found. What both tools do is make sure the gap between "looks done" and "is done" has to be crossed on purpose, with the reason written down, not skipped because nothing was checking.

::: info

The spec-verify repo is at [<VPIcon icon="iconfont icon-github"/>`dannwaneri/spec-verify`](https://github.com/dannwaneri/spec-verify). Try it against the next feature spec-writer generates for you, before you mark it done. If a test in there is vacuous, you want to find out from a mutation, not from production.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Stop Letting AI Agents Fake Their Own Tests",
  "desc": "I signed off a hallucination fix as verified. We now had zero out of five fabricated responses, clean run, done. Then I ran it again under harder conditions and got 66.7%. The number I'd trusted enoug",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-letting-ai-agents-fake-their-own-tests.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
