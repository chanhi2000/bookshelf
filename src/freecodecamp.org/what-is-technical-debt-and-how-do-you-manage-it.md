---
lang: en-US
title: "What is Technical Debt and How Do You Manage it?"
description: "Article(s) > What is Technical Debt and How Do You Manage it?"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - computer
  - coen
  - computerengineering
  - computer-engineering
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Technical Debt and How Do You Manage it?"
    - property: og:description
      content: "What is Technical Debt and How Do You Manage it?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-technical-debt-and-how-do-you-manage-it.html
prev: /academics/coen/articles/README.md
date: 2025-05-10
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746809303458/b4635ddc-d909-427a-9cc1-9b9f56ae1d41.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
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
  name="What is Technical Debt and How Do You Manage it?"
  desc="You’ve probably heard someone say, “We’ll fix it later.” Maybe you’ve said it yourself. In the rush to launch a feature, meet a deadline, or impress a client, you take a shortcut. The code works - for now. The design passes - for now. But over time, ..."
  url="https://freecodecamp.org/news/what-is-technical-debt-and-how-do-you-manage-it"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746809303458/b4635ddc-d909-427a-9cc1-9b9f56ae1d41.png"/>

You’ve probably heard someone say, “We’ll fix it later.”

Maybe you’ve said it yourself.

In the rush to launch a feature, meet a deadline, or impress a client, you take a shortcut. The code works - for now. The design passes - for now.

But over time, these choices pile up. They slow you down. They make every change harder. That’s technical debt.

Technical debt is a quiet, creeping cost. It doesn’t show up in metrics like churn or conversion rate. But it eats away at your product’s quality, your team’s velocity, and your ability to innovate.

You don’t notice it right away. Then, suddenly, everything feels slower. Nothing is simple anymore.

One bug fix breaks two new things. Engineers groan when they touch certain parts of the code. That’s when you realize you’re in debt.

Let’s talk about what technical debt really is, how it forms, and how you can deal with it before it kills your product.

---

## What Is Technical Debt?

Think of technical debt like financial debt. When you borrow money, you get something now - at the cost of interest later.

In software, it’s the same. You make a quick decision to save time now, knowing it might cost you more effort down the line.

There’s nothing inherently wrong with that. Sometimes, taking on debt is smart. You might need to ship fast to test an idea or respond to the market.

But if you keep borrowing and never repay, the interest builds. And technical debt doesn’t just grow - it compounds. The longer you leave it, the worse it gets.

You don’t just end up paying more later. You slow down your whole team.

Every new feature takes longer. Bugs multiply. Morale drops. And eventually, your product feels fragile. That’s when the real damage begins.

### Types of Technical Debt

Not all debt is the same. Some is like a short-term loan - you know you’re taking it and why. Other debt is like a bad mortgage - no one even knows it’s there until things break.

Here are the most common types:

- **Intentional debt** — You cut corners to hit a deadline but log it and plan to fix it. This can be healthy if managed well.
- **Unintentional debt** — You didn’t realise the shortcut was harmful. Often happens with new tech or unclear requirements.
- **Environmental debt** — Your tools, libraries, or frameworks get outdated. Even if your code is clean, it sits on crumbling infrastructure.
- **Process debt** — The way you build software becomes inefficient. Poor handoffs, unclear documentation, or weak testing pipelines all contribute.

Recognising which type you’re dealing with helps you prioritise. Not all debt needs immediate repayment. But all of it needs attention.

---

## How Technical Debt Happens

As you can probably imagine, technical debt shows up in many ways.

Sometimes it’s deliberate. You make a tradeoff. You know it’s a shortcut, and you plan to clean it up later. That’s manageable - if you actually clean it up.

But most technical debt isn’t planned. It sneaks in through decisions that feel small in the moment. A rushed feature. A new hire not trained on the codebase. A spec that changes mid-sprint. Over time, these small cracks become deep fractures.

Here’s a simple example:

```js
// Temporary workaround for product discounts
function applyDiscount(price, productType) {
  if (productType === 'electronics') {
    return price * 0.9; // 10% off
  } else if (productType === 'clothing') {
    return price * 0.8; // 20% off
  } else if (productType === 'books') {
    return price * 0.95; // 5% off
  } else {
    return price;
  }
}
```

This started as a quick fix. But over time, new product types get added with more exceptions.

Soon, you will have twenty `if-else` branches. It’s fragile. Every change risks breaking something. That’s technical debt.

The worst part? You might not even notice until a year later, when a bug in that logic takes hours to trace. You wonder, “How did this get so messy?” The answer: **one shortcut at a time.**

A better long-term approach in the above example would be a configuration-driven system or a discount rules engine.

```js
// Config-driven discount logic
const discountRates = {
  electronics: 0.10,
  clothing: 0.20,
  books: 0.05
};
```

```js
function applyDiscount(price, productType) {
  const discount = discountRates[productType] || 0;
  return price * (1 - discount);
}
```

---

## Why Technical Debt Can Be Dangerous

Technical debt slows you down. That’s its most visible cost.

A feature that should take a day now takes a week. Simple changes break unrelated things. Your team spends more time fixing than building.

But the real danger goes deeper. Technical debt makes you afraid to touch your code.

Engineers stop refactoring because “it’s too risky.” You start saying no to new ideas because the system can’t handle them. The product becomes rigid. You stop innovating.

It also hurts your team. Developers don’t like working in messy codebases. It leads to burnout. New hires struggle to onboard.

Your best engineers spend their time firefighting instead of creating. Eventually, people leave. And your debt remains.

---

## How to Manage Technical Debt

You can’t eliminate all technical debt. But you can manage it.

First, treat it like real debt. Track it. Prioritize it. Make regular payments.

Start by writing it down. Every time someone takes a shortcut, log it. You don’t need a fancy tool - a shared doc or Jira tag works fine. Just make it visible.

Next, build time into your workflow to pay it off. Use 10-20% of each sprint to refactor or improve the codebase. Don’t wait for a rewrite. Small, steady work adds up.

Code reviews help too. Encourage your team to ask: “Is this a shortcut?” If yes, make a conscious choice. Leave a clear comment. Note the tradeoff. Now it’s not a hidden cost - it’s a known one.

And when you do pay off debt, celebrate it. Make it part of your culture. The same way you’d celebrate shipping a feature, acknowledge when your team makes the codebase better. That builds pride and ownership.

### Knowing When to Refactor

You can’t fix all the debt at once. So how do you choose?

Look for signs of pain. If a file breaks every sprint, fix it. If one part of the system takes days to test, improve it. If new hires always get stuck in one module, clean it up.

Focus on the code you touch often. There’s no point polishing a dead feature. But if something is part of your core flow, invest in it.

Also, listen to your team. Engineers know where the pain lives. If someone says, “This part scares me,” take that seriously. Fear in the codebase is a red flag.

---

## When Debt Becomes Fatal

Sometimes, the debt gets so bad that small fixes won’t save you. The system collapses under its own weight. Everything feels slow. Nothing is safe to change. That’s when teams start talking about rewrites.

But rewrites are risky. They take time. They often miss hidden business logic. And they can carry old debt into new code if not done carefully.

If you must rewrite, do it incrementally. Replace modules one at a time. Add tests. Migrate data with care.

And don’t forget why the old system failed. If you don’t fix the culture, the new system will rot too.

---

## Final Thoughts

Technical debt isn’t evil. It’s part of building software. But like financial debt, it needs discipline. You can’t just ignore it and hope it goes away.

Great products aren’t just well-designed. They’re well-maintained. The teams behind them care about quality — not just in what users see, but in what engineers live with every day.

So the next time you say, “We’ll fix it later,” ask yourself: will you? Or are you just borrowing against the future?

Hope you enjoyed this article. [<FontIcon icon="fas fa-globe"/>Join my newsletter](https://blog.manishshivanandhan.com/) for similar articles and [connect with me on Linkedin (<FontIcon icon="fa-brands fa-linkedin"/>`manishmshiva`).](https://linkedin.com/in/manishmshiva/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Technical Debt and How Do You Manage it?",
  "desc": "You’ve probably heard someone say, “We’ll fix it later.” Maybe you’ve said it yourself. In the rush to launch a feature, meet a deadline, or impress a client, you take a shortcut. The code works - for now. The design passes - for now. But over time, ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-technical-debt-and-how-do-you-manage-it.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
