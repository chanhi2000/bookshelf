---
lang: en-US
title: "How to Break the AI Coding Agent Fix Loop"
description: "Article(s) > How to Break the AI Coding Agent Fix Loop"
icon: fas fa-language
category:
  - Node.js
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Break the AI Coding Agent Fix Loop"
    - property: og:description
      content: "How to Break the AI Coding Agent Fix Loop"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-break-the-ai-coding-agent-fix-loop.html
prev: /ai/llm/articles/README.md
date: 2026-10-05
isOriginal: false
author:
  - name: Amir Gabay
    url: https://freecodecamp.org/news/author/vibecoderdaily/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/abd8a76e-ad86-4731-a644-2919458b7407.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="How to Break the AI Coding Agent Fix Loop"
  desc="You've likely seen this movie before: something breaks in an app you built with an AI coding agent. You ask the agent to fix it. It ”fixes” it. But the bug is still there, or a second bug appears. So "
  url="https://freecodecamp.org/news/how-to-break-the-ai-coding-agent-fix-loop"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/abd8a76e-ad86-4731-a644-2919458b7407.png"/>

You've likely seen this movie before: something breaks in an app you built with an AI coding agent. You ask the agent to fix it. It "fixes" it. But the bug is still there, or a second bug appears.

So you say "it's still not working." The agent tries again. Twenty minutes later you have more broken code, fewer credits, and no clear path back to a working state.

People search for this with phrases like "AI keeps making bugs worse" or "agent stuck in a fix loop." It's not a quirk of one product. Lovable, Replit, Cursor, Claude Code, Base44, and similar tools all fall into the same pattern, because the failure is structural.

This tutorial explains why the loop happens and gives you a concrete sequence you can use to break it on any of those tools.

::: info What You'll Learn

- How to recognize an AI fix loop early
- Why vague retries make the next attempt worse
- A five-step sequence to stop, revert, restate, isolate, and verify
- How to write a fix prompt that carries enough information for the agent to succeed

:::

::: note Prerequisites

You don't need to be a professional engineer to follow along here. But you should have:

- An app you're building with an AI coding agent (like Cursor, Claude Code, Replit Agent, Lovable, or similar)
- Access to version history, checkpoints, or Git so you can undo a bad change
- A way to run or preview the app yourself (browser preview, local server, or deployed URL)

:::

---

## What the Fix Loop Looks Like

Strip away the product branding and the loop looks the same everywhere:

1. Something is wrong in the running app.
2. You ask the agent to fix it with a short message ("it's broken", "try again", or a one-click "Try to Fix").
3. The agent produces a change that sounds confident.
4. The original problem remains, or a neighbor breaks.
5. You retry with similarly vague feedback.
6. Each failed attempt stays in the conversation context, so the next attempt reasons over noise.

Different tools expose this in different UIs. Some have a literal retry button. Some hang on "Thinking." Some quietly revert a change you already confirmed. The surface differs, but the mechanism doesn't.

---

## Why the Loop Happens

Four forces compound in roughly this order.

### 1. Context Degrades as the Session Grows

Every message, diff, and "no, not that" adds tokens to what the agent must hold. Early in a session the agent's model of your app is relatively sharp. Twenty exchanges later, it's working from a blurred average of everything that happened, including the wrong turns.

### 2. Vague Retries Add Noise, Not Information

"Still broken." "Try again." "That's not it." Those feel like feedback to you. To the agent they're instructions with almost no new signal. They don't say what's still broken, which file is involved, or what "right" looks like.

The agent usually varies its previous guess slightly. That's why loops often alternate between two near-identical wrong fixes instead of converging.

### 3. The Agent Can't See Your App the Way You Can

You're looking at a rendered page and clicking through a flow. The agent is reasoning over code and your text description of what you saw.

Describing a UI bug in words is lossy. When the description and the real UI don't line up, the agent optimizes for a plausible fix to the wrong problem.

### 4. Failed Attempts Poison the Next Attempt

This is what turns one mistake into a loop. Attempt two doesn't start fresh. It starts from a context window that already includes attempt one's wrong diff, your frustrated correction, and the agent's explanation of what it thought it fixed. Attempt three inherits all of that noise. The loop is compounding, not random.

Put together: a long session reduces precision right as your prompts get vaguer, at the exact moment the agent most needs a clean, specific signal.

---

## How to Break the Cycle

None of these steps require switching tools. They target the mechanism.

### Step 1: Stop Feeding the Loop

Never send "try again" or "still broken" twice in a row. If the first retry failed, the problem isn't that the agent needs one more blind attempt. Your instruction didn't carry enough information to change its answer. A third low-information prompt only adds more noise.

When you notice you are about to type the same complaint again, stop typing. Move to step 2. ### Step 2: Revert to the Last Known-Good State

Undo the failed fix (or the last few fixes if the loop has been running) before you try again. Don't stack a new attempt on top of a broken one. That's how one bug becomes three.

Use whatever your tool provides:

- Git: `git checkout -- path/to/file` or `git restore`, or reset to a commit you trust
- Cursor / similar IDEs: local history or timeline for the file
- Replit, Lovable, and similar builders: checkpoint or version history, then restore the last good state

Only after the app is back to a state you recognize should you type a new fix request.

### Step 3: Restate the Problem from Scratch with Precise Scope

This is the highest-leverage move. Prefer a fresh conversation or a clean thread when the tool allows it. Write a prompt that includes all three of these:

1. The exact file or component name (literal path, not a visual description)
2. What's wrong, as a concrete observable fact
3. What "right" looks like, stated just as concretely

Weak prompt:

> It's still broken. Fix the submit button.

Strong prompt:

> In <VPIcon icon="fa-brands fa-react"/>`CheckoutForm.tsx`, the submit button calls `handleSubmit`, but the loading state never resets when the request fails. After a failed submit the button stays disabled and no error message appears. It should re-enable and show the server error string under the button.

The second prompt gives the agent a file, a behavior, and a success condition. That's enough to act on without guessing.

### Step 4: Change One Thing at a Time

Don't bundle "also fix the header while you're at it" into a bug-fix prompt. That gives the agent two problems with one context budget. A clean fix for problem A can quietly reintroduce problem B.

Ship the fix. Verify it. Then open a separate request for the next issue.

### Step 5: Verify Against the Real App, Not the Agent's Claim

Agents are often confident and wrong about whether their own fix worked, because they check their reasoning, not your running product.

Before you close the loop:

1. Reload the preview or hard-refresh the page
2. Click through the actual user flow that failed
3. Check the database row, network tab, or logs if the bug is about data or APIs
4. Confirm the success condition you wrote in step 3

Only then treat the incident as closed.

---

## A Full Walkthrough: The Double Charge

Here's the loop on a real bug. You have a small checkout endpoint written by an AI agent. Customers report being charged twice when their connection is slow. You can run everything below with Node 20 and no dependencies.

### The Code the Agent Wrote:

```js
// checkout.js
export function createCheckout({ chargeCard, saveOrder }) {
  async function handleCheckout(req) {
    const { cartId, amount } = req.body;

    const charge = await chargeCard(amount);
    const order = await saveOrder({ cartId, chargeId: charge.id, amount });

    return { status: 201, body: { orderId: order.id } };
  }

  return { handleCheckout };
}
```

When the browser times out and the customer clicks "Pay" again, the server runs `handleCheckout` a second time and charges the card again.

### The Loop

You tell the agent: "customers are getting charged twice, fix it."

**Attempt 1.** The agent checks for an existing order before charging:

```js
const existing = await findOrder(cartId);
if (existing) {
  return { status: 200, body: { orderId: existing.id } };
}
```

You test it by clicking Pay twice, a few seconds apart. It works. But it doesn't work when both requests arrive at the same moment, because neither request has saved an order yet when the other one checks. You report: "still charging twice sometimes."

**Attempt 2.** The agent disables the Pay button after the first click. This is a client-side change, so it can't stop a retry from a timed-out request or a second browser tab. You report: "still happening."

**Attempt 3.** The agent wraps the charge in `try/catch` and returns a friendly message on error. Now the bug is quieter, but the card is still charged twice. This is the point to stop.

### Steps 1 & 2: Stop and Revert

Don't send a fourth "still broken". Restore the original <VPIcon icon="fa-brands fa-js"/>`checkout.js` from Git (`git restore checkout.js`) so you're debugging one bug, not four.

### Step 3: Write a Failing Test Before You Ask for a Fix

The most useful sentence you can give the agent is a test that fails for the right reason. Here are three tests. The first two describe the bug, and the third protects normal behavior:

```js title="checkout.test.js"
import { test } from "node:test";
import assert from "node:assert/strict";
import { createCheckout } from "./checkout.js";
import { createFakes } from "./fakes.js";

const req = (key) => ({
  headers: { "idempotency-key": key },
  body: { cartId: "cart_1", amount: 4900 },
});

test("a retried request charges the card only once", async () => {
  const fakes = createFakes();
  const { handleCheckout } = createCheckout(fakes);

  const first = await handleCheckout(req("key-1"));
  const retry = await handleCheckout(req("key-1")); // client timed out and retried

  assert.equal(fakes.charges.length, 1);
  assert.equal(fakes.orders.length, 1);
  assert.deepEqual(retry.body, first.body);
});

test("two requests sent at the same moment still charge once", async () => {
  const fakes = createFakes();
  const { handleCheckout } = createCheckout(fakes);

  await Promise.all([handleCheckout(req("key-2")), handleCheckout(req("key-2"))]);

  assert.equal(fakes.charges.length, 1);
});

test("different keys are different purchases", async () => {
  const fakes = createFakes();
  const { handleCheckout } = createCheckout(fakes);

  await handleCheckout(req("key-3"));
  await handleCheckout(req("key-4"));

  assert.equal(fakes.charges.length, 2);
});
```

The tests use small in-memory fakes for the payment provider and the database, so they run in milliseconds:

```js title="fakes.js"
export function createFakes() {
  const charges = [];
  const orders = [];

  return {
    charges,
    orders,
    async chargeCard(amount) {
      await new Promise((r) => setTimeout(r, 10)); // simulate a slow provider
      const charge = { id: `ch_${charges.length + 1}`, amount };
      charges.push(charge);
      return charge;
    },
    async saveOrder(data) {
      const order = { id: `ord_${orders.length + 1}`, ...data };
      orders.push(order);
      return order;
    },
  };
}
```

Run `node --test`. The first two tests fail, and that is your proof of the bug:

```plaintext
not ok 1 - a retried request charges the card only once
not ok 2 - two requests sent at the same moment still charge once
ok 3 - different keys are different purchases
```

Notice that the second test describes exactly what attempt 1 missed. The agent could not see that case, but the test can.

### Steps 3 & 4: Give the Agent a Precise Prompt, with One Change

Start a fresh chat and paste this:

> In <VPIcon icon="fa-brands fa-js"/>`checkout.js`, `handleCheckout` charges the card every time it's called, so a client retry charges the customer twice. Make it idempotent using the `Idempotency-Key` request header: the same key must produce one charge and one order, including when two requests with the same key arrive at the same time, and it must return the same response body. A request with no key should return status 400. Don't change <VPIcon icon="fa-brands fa-js"/>`fakes.js` or the tests. Run `node --test` and show me the output.

This prompt names the file and the function, states the wrong behavior and the right behavior, includes the concurrent case, and asks for one change.

### The Fix

```js title="checkout.js"
export function createCheckout({ chargeCard, saveOrder }) {
  const requests = new Map(); // idempotency key -> Promise of the response

  async function process(req) {
    const { cartId, amount } = req.body;

    const charge = await chargeCard(amount);
    const order = await saveOrder({ cartId, chargeId: charge.id, amount });

    return { status: 201, body: { orderId: order.id } };
  }

  async function handleCheckout(req) {
    const key = req.headers["idempotency-key"];
    if (!key) {
      return { status: 400, body: { error: "Idempotency-Key header is required" } };
    }

    if (!requests.has(key)) {
      const promise = process(req);
      requests.set(key, promise);
      promise.catch(() => requests.delete(key)); // a failed attempt may be retried
    }

    return requests.get(key);
  }

  return { handleCheckout };
}
```

The key idea is that the Map stores the Promise, not the finished result. The second request with the same key receives the same in-flight Promise, so it waits for the first charge instead of starting its own. That's what closes the concurrent case that attempt 1 missed.

### Step 5: Verify

```plaintext
ok 1 - a retried request charges the card only once
ok 2 - two requests sent at the same moment still charge once
ok 3 - different keys are different purchases
# tests 3
# pass 3
# fail 0
```

Then check the real thing too: send the same request twice with `curl` and the same `Idempotency-Key`, and confirm that your payment provider's dashboard shows one charge.

One caveat: this version keeps keys in memory, so it only protects a single server process. In production you would store the keys in your database or Redis, with an expiry. The tests don't change, so you can ask the agent to make that change next as a separate request.

### What the Walkthrough Shows

The fix itself was twelve lines. What broke the loop wasn't a smarter prompt. It was the failing test, which turned "still charging twice sometimes" into a result the agent could read, and which caught the case that every vague retry had missed.

---

## A Checklist You Can Reuse

Copy this for the next incident:

- [ ] I stopped after one failed vague retry
- [ ] I reverted to a known-good state
- [ ] I named the exact file or component
- [ ] I stated the wrong behavior as an observable fact
- [ ] I stated the right behavior as an observable fact
- [ ] I asked for one change only
- [ ] I verified in the real UI / data / logs myself

---

## Conclusion

AI coding agents are strong at creating a first version of an app. Iteration is harder, because a good fix request needs precision that a frustrated "still broken" doesn't carry, and the agent can't see your screen the way you do.

The fix loop isn't proof that you're "using the tool wrong" at a deep level. It's a signal that the prompt needs more information than "try again."

Next time you are three attempts into a fix that isn't landing: stop, revert, and restate from scratch with exact scope. It feels slower at first. But it's faster than the loop.

If you want a shorter field guide version of this pattern across specific tools, I also published a practical write-up on [<VPIcon icon="fas fa-globe"/>Vibe Coder Daily](https://vibecoderdaily.com/blog/ai-fix-loop-why-agents-make-bugs-worse/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Break the AI Coding Agent Fix Loop",
  "desc": "You've likely seen this movie before: something breaks in an app you built with an AI coding agent. You ask the agent to fix it. It ”fixes” it. But the bug is still there, or a second bug appears. So ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-break-the-ai-coding-agent-fix-loop.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
