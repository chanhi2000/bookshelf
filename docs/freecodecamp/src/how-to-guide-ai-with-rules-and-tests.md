---
lang: en-US
title: "The AI Coding Loop: How to Guide AI With Rules and Tests"
description: "Article(s) > The AI Coding Loop: How to Guide AI With Rules and Tests"
icon: fas fa-language
category:
  - AI
  - LLM
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The AI Coding Loop: How to Guide AI With Rules and Tests"
    - property: og:description
      content: "The AI Coding Loop: How to Guide AI With Rules and Tests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-guide-ai-with-rules-and-tests.html
prev: /ai/llm/articles/README.md
date: 2026-02-25
isOriginal: false
author:
  - name: Sumit Saha
    url: https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/b757ebbf-c9e9-44ec-b92c-7a38a8616e68.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The AI Coding Loop: How to Guide AI With Rules and Tests"
  desc="Building great software isn't about perfect prompts, it's about a disciplined process. In this guide, I'll share my workflow for shipping secure code: defining clear goals, mapping edge cases, and bui"
  url="https://freecodecamp.org/news/how-to-guide-ai-with-rules-and-tests"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/b757ebbf-c9e9-44ec-b92c-7a38a8616e68.png"/>

Building great software isn't about perfect prompts, it's about a disciplined process. In this guide, I'll share my workflow for shipping secure code: defining clear goals, mapping edge cases, and building incrementally with runnable tests.

Using a Node.js shopping cart example, I'll show why server-side validation and test-driven development beat "one-shot" AI outputs every time. Let's dive into how to make AI your most reliable collaborator.

::: note Some Background

Last week I did something that felt amazing for about… five seconds. I opened an AI tool, typed one sentence, and it generated a whole shopping cart module for an e-commerce app. Lots of files, lots of code, even folders and patterns. It looked professional.

And then I realized something: the problem was not "how fast AI wrote code." The problem was "how do I know this code is correct?"

Here's the truth: a big pile of code that you didn't write is not a shortcut. For most developers, it's actually extra work. You have to read it, understand it, and still catch the hidden mistakes.

So today I'm not going to give you another "AI is coming" talk. Instead, I'll show you a simple loop that any developer can follow – beginner, mid-level, or senior – to get better results from AI, step by step, without getting trapped. And I'll show it with a real example you can run in one file.

:::

---

## The 5-Second High (and the Real Problem)

A lot of people misunderstand AI coding. They think the main job is typing code. But the main job is thinking clearly. Typing is cheap now. Thinking is expensive.

When AI produces a "perfect-looking" module in one shot, the real work doesn't disappear. It moves downstream:

- You still need to understand what it generated
- You still need to verify it matches your rules
- You still need to catch the mistakes that hide inside "nice looking code"

If you can't verify it, you don't own it. And if you don't own it, you can't safely ship it.

::: tip

Treat AI output like code from a stranger on the internet: useful, but untrusted until proven.

:::

---

## The Golden Rule: Never Trust User Prices

I started exactly like a beginner would start. I opened AI and wrote a vague prompt:

> Design and develop an e-commerce shopping cart module for me.

AI replied with a big output. It looked clean. If you're new, you might think:

> Wow, it solved it.

But then I asked myself:

> What is the easiest way this can go wrong in real life?

And the answer is also simple: “money can be stolen”. Because a shopping cart has one golden rule: never trust prices coming from the user.

If the browser sends you: “T-shirt price is \\(1" and you accept it, someone can pay \\)1 for a $20 product. And when AI generates a big module quickly, that kind of mistake can easily hide inside "nice looking code."

::: warning

Any system that accepts client-sent prices is basically inviting price tampering.

:::

---

## The Mindset Shift: Stop Asking for the Whole App

So instead of accepting the big AI output, I changed my approach. I said:

> I'm not going to ask AI to build the whole app. I will break the big thing into small parts, and I will guide AI like a real engineer.

That is the first mindset shift. In the AI era, your value is not how fast you type. Your value is how well you can do three things:

- define the problem clearly
- break it into small pieces
- prove the result is correct

Big systems are built from small correct pieces. That's not "prompt engineering." That's engineering.

---

## The AI Coding Loop (the 7-Step Workflow)

Here's the loop I use. It's simple English. You can copy it and use it for any project:

- Write the goal in one sentence
- Write the rules (what must be true)
- Write two examples (input → output)
- Write two bad situations (weird cases)
- Ask AI for a small piece, not the whole thing
- Ask for tests, then run them
- If something fails, improve the prompt and repeat

That's it. That's the loop. Here it is in visual form:

![AI coding loop workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1771426083349/2f126c6b-9e17-469e-881f-68e3c6c384a9.png)

::: tip

The loop is the skill. Tools will change. The loop will still work.

:::

---

## Apply the Loop: a Server-side Cart Total Calculator

Now let's apply it to the shopping cart example. Instead of "build me a cart module," I wrote a tiny requirement note:

> We need a cart total calculator on the server. User sends `productId` and `quantity`. We must ignore any `price` from the user. We must use our own product list. We must handle unknown products and invalid `quantity`. We must calculate `subtotal`, `discount`, `tax`, and final `total`. We must round money correctly. We must have tests.

This is not a large or complex requirements specification - just a clear and concise note.

And then I asked AI for only one small piece:

- Not the UI
- Not the database
- Not the entire architecture
- Just one function, with tests

Because the fastest way to build something real is to prove one brick at a time. We have written down everything we discussed in the requirement note. It would be great to also create a visual representation of those ideas. Along with the requirement note, we can prepare a simple sketch or diagram for our own reference. This way, it can serve as a clean and well-documented requirement specification, which we can keep recorded in our project's GitHub <VPIcon icon="fa-brands fa-markdown"/>`README.md` file.

In the diagram below, we can have a browser on the left and the server on the right. The browser/user is an untrusted input source. The user may send `productId`, `qty`, and even a fake `price`, but the server must treat only `productId` and `qty` as input and must ignore any client-sent price. The server then looks up the real price from its own trusted product catalog, validates the quantity, and calculates totals from server-side data. This is the trust boundary: prices come from the server, not from the client.

![Trust boundary and price tampering](https://cdn.hashnode.com/res/hashnode/image/upload/v1771426306275/e21c0f2c-3eda-42f9-bd44-65d74b2aa10e.png)

### The prompt (small piece, strong constraints)

This is the shape of the prompt I used:

Create a single JavaScript file I can run with Node.

#### Goal

Calculate shopping cart totals.

#### Rules

- Input items have productId and qty.
- Do NOT trust price from user input.
- Use my product catalog.
- qty must be at least 1.
- discountPercent and taxPercent must not be negative.
- discount first, then tax.
- round money to 2 decimals.

#### Examples

- 2 T-shirts (20 each) + 1 mug (12.50) => subtotal 52.50
- discount 10%, tax 8% => discount first, then tax

#### Deliver

- one function
- simple tests using Node's built-in assert
- print one example output

One small change makes a massive difference: “rules + examples + tests”. AI still tries to help fast, but now it has guardrails. And if it still makes a mistake, you can catch it, because you asked for proof.

Here is a visual representation of the "Cart Totals Pipeline" that covers all the use cases involved in the cart totals calculation process.

![Cart totals pipeline (discount then tax)](https://cdn.hashnode.com/res/hashnode/image/upload/v1771426340852/b9a1d43c-3e89-468b-b809-7c9d7ad53932.png)

In the diagram, the cart total calculation follows a fixed pipeline. First, validate inputs (known `productId`, valid `qty`, non-negative discount/tax). Next, compute `subtotal` from the trusted product catalog. Then apply the discount to get the discounted amount. After that, calculate tax on the discounted amount (not on the original subtotal). Finally, round values correctly and return the result (`subtotal`, `discount`, `tax`, and `total`). The key rule is the order: discount first, then tax.

---

## One-File Runnable Example (with a Wrong Version on Purpose)

Now here's the one-file example you can run right now. No setup. Just Node. Create a file named <VPIcon icon="fa-brands fa-js"/>`cart.js`, paste in the below code, and run `node cart.js`.

It includes two versions:

- a wrong version that trusts user price (this is the mistake we want to learn from)
- a correct version that uses a trusted catalog

```js :collapsed-lines title="cart.js"
// Run: node cart.js

const assert = require("node:assert/strict");

// Trusted product catalog (server-side truth)

const PRODUCTS = {
  tshirt: { name: "T-shirt", priceCents: 2000 }, // $20.00
  mug: { name: "Mug", priceCents: 1250 }, // $12.50
  book: { name: "Book", priceCents: 1599 }, // $15.99
};

function money(cents) {
  return (cents / 100).toFixed(2);
}

// WRONG: trusts user price
function cartTotal_WRONG(cartItems, discountPercent = 0, taxPercent = 0) {
  let subtotalCents = 0;

  for (const item of cartItems) {
    const priceCents = Math.round((item.price ?? 0) * 100); // user can cheat
    subtotalCents += priceCents * item.qty;
  }

  const discountCents = Math.round(subtotalCents * (discountPercent / 100));
  const afterDiscount = subtotalCents - discountCents;
  const taxCents = Math.round(afterDiscount * (taxPercent / 100));
  const totalCents = afterDiscount + taxCents;
  return totalCents;
}

// Correct: uses trusted catalog + checks
function cartTotal(cartItems, discountPercent = 0, taxPercent = 0) {
  if (!Array.isArray(cartItems))
    throw new Error("cartItems must be an array");

  if (typeof discountPercent !== "number" || discountPercent < 0)
    throw new Error("discountPercent must be non-negative");

  if (typeof taxPercent !== "number" || taxPercent < 0)
    throw new Error("taxPercent must be non-negative");

  let subtotalCents = 0;

  for (const item of cartItems) {
    const { productId, qty } = item || {};
    if (typeof productId !== "string" || !PRODUCTS[productId]) {
      throw new Error("Unknown productId: " + productId);
    }
    if (typeof qty !== "number" || qty < 1) {
      throw new Error("qty must be at least 1");
    }
    subtotalCents += PRODUCTS[productId].priceCents * qty;
  }

  const discountCents = Math.round(subtotalCents * (discountPercent / 100));
  let afterDiscountCents = subtotalCents - discountCents;
  if (afterDiscountCents < 0) afterDiscountCents = 0;
  const taxCents = Math.round(afterDiscountCents * (taxPercent / 100));
  const totalCents = afterDiscountCents + taxCents;
  return { subtotalCents, discountCents, taxCents, totalCents };
}

function runTests() {
  // Normal example
  const cart = [
    { productId: "tshirt", qty: 2 },
    { productId: "mug", qty: 1 },
  ];

  const r = cartTotal(cart, 10, 8);
  assert.equal(r.subtotalCents, 5250); // 52.50
  assert.equal(r.discountCents, 525); // 10% of 52.50
  assert.equal(r.taxCents, 378); // 8% of 47.25
  assert.equal(r.totalCents, 5103); // 51.03

  // Attack example: user tries to cheat with price = 1
  const attackerCart = [
    { productId: "tshirt", qty: 2, price: 1 },
    { productId: "mug", qty: 1, price: 1 },
  ];

  const wrong = cartTotal_WRONG(attackerCart, 0, 0);
  assert.equal(money(wrong), "3.00"); // totally wrong in real life

  const safe = cartTotal(attackerCart, 0, 0);
  assert.equal(money(safe.totalCents), "52.50"); // correct, ignores user price

  // Edge cases
  assert.throws(() => cartTotal([{ productId: "unknown", qty: 1 }], 0, 0));
  assert.throws(() => cartTotal([{ productId: "tshirt", qty: 0 }], 0, 0));
  assert.throws(() => cartTotal(cart, -1, 0));
  assert.throws(() => cartTotal(cart, 0, -1));
}

runTests();
console.log("All tests passed.");

const example = cartTotal(
  [
    { productId: "tshirt", qty: 1 },

    { productId: "book", qty: 2 },
  ],
  15,
  5,
);

console.log("Example subtotal:", money(example.subtotalCents));
console.log("Example discount:", money(example.discountCents));
console.log("Example tax:", money(example.taxCents));
console.log("Example total:", money(example.totalCents));
```

In this code, we didn't do a magic trick. We did some engineering:

- We took a big problem and broke it into a small piece
- We wrote rules so the AI doesn't guess
- We wrote examples so the AI understands
- We asked for tests so we can prove it
- We ran the tests so we can trust it

That is the loop you can reuse for any project.

---

## How to Use Failing Tests as a Flashlight

This is the part many developers skip. They ask for code, but they don't ask for proof. When you run the tests, one of two things happens:

- Tests pass: great, you earned confidence
- Tests fail: even better, you earned clarity

A failing test is a flashlight. It shows you the exact place where your thinking (or your prompt) needs improvement. Instead of "AI is wrong," you get a real question:

> Which rule was unclear, missing, or contradictory?

Then you adjust:

- add a stricter rule
- add an example that removes ambiguity
- add an edge case that forces the correct behavior
- regenerate only the small piece, not the whole codebase

---

## Copy-Paste Prompt Template

Here is a copy-paste prompt template you can reuse from today (see below the image):

![Copy-paste prompt template](https://cdn.hashnode.com/res/hashnode/image/upload/v1771426376813/8b9c29e0-7681-433d-989b-f4c693ad4fb4.png)

```md

Build ONE small piece, not the full app.

Goal:

(One sentence)

Rules:

(3 to 7 bullets)

Examples:

(2 examples: input -> output)

Edge cases:

(2 cases that can break it)

Deliver:

- one runnable file

- include tests using Node assert

- print one example output

Then ask:

Before giving code, list the possible mistakes and confirm the rules.
```

That last line is powerful. It forces the AI to think about failure before writing code.

---

## A Calm Hype Check: Why Fundamentals Matter More Now

A lot of content online makes it sound like: "AI codes now, so you don't need to learn coding." That idea is a trap. Because yes, AI can type code. But AI cannot replace your responsibilities as a developer and engineer.

If you ship a broken cart, you can lose money. If you ship insecure code, you can get hacked. If you ship unreliable software, users leave. And in real life, nobody will accept the excuse: "The AI wrote it."

In the AI era, learning coding isn't less important. It's more important, just in a different way. The goal isn't to become a fast typist. The goal is to become a strong thinker.

Fundamentals matter more than before:

- how data flows through a system
- how to break big problems into small parts
- how to write clear rules and requirements
- how to test and verify
- how to notice edge cases
- how to think about security
- how to understand the tools you use, not just copy answers

Average software will be everywhere. It will be cheap. It will be copied. It will be easy to make. So the only software that matters will be software that is truly valuable: safe, reliable, high quality, and built with real understanding.

That's good news for serious learners. Because the best engineers will become even more valuable, not less.

### A Simple Exercise (do this once and you'll feel the skill)

Add one more rule to the cart, like:

- `qty` cannot be more than 10
- Write the test first. Then ask AI to update the function. Run the tests.
- That's how you train the real AI skill: not prompting, but guiding and verifying.
- Let AI type the code.
- You do the thinking.
- You do the breaking down.
- You do the proof.

::: info Recap

- Don't ask AI to build the whole app
- Break the problem into one small piece
- Write rules, examples, and edge cases so AI doesn't guess
- Always ask for tests and run them
- Treat failing tests as a flashlight
- Repeat the loop until you can trust what you ship

:::

That's the game now. And if you play it well, you're not behind, you're ahead.

---

## Final Words

If you found the information here valuable, feel free to share it with others who might benefit from it.

::: info

I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [<VPIcon icon="fa-brands fa-youtube"/>watch my coding tutorials](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

You can also checkout my official website [<VPIcon icon="fas fa-globe"/>sumitsaha.me](https://sumitsaha.me) for details about me.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The AI Coding Loop: How to Guide AI With Rules and Tests",
  "desc": "Building great software isn't about perfect prompts, it's about a disciplined process. In this guide, I'll share my workflow for shipping secure code: defining clear goals, mapping edge cases, and bui",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-guide-ai-with-rules-and-tests.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
