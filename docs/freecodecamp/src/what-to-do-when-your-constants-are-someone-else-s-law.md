---
lang: en-US
title: "What to Do When Your Constants Are Someone Else's Law"
description: "Article(s) > What to Do When Your Constants Are Someone Else's Law"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What to Do When Your Constants Are Someone Else's Law"
    - property: og:description
      content: "What to Do When Your Constants Are Someone Else's Law"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-to-do-when-your-constants-are-someone-else-s-law.html
prev: /programming/go/articles/README.md
date: 2026-10-11
isOriginal: false
author:
  - name: Javeed Shaik
    url: https://freecodecamp.org/news/author/javeedshaik7/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d0b15ef7-16e3-4521-afe8-f2bd08611f97.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What to Do When Your Constants Are Someone Else's Law"
  desc="A colleague once asked me why a number in my code had a comment three lines long. The number was 18. The comment said which rule it came from, which section notified it, and that it could change witho"
  url="https://freecodecamp.org/news/what-to-do-when-your-constants-are-someone-else-s-law"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d0b15ef7-16e3-4521-afe8-f2bd08611f97.png"/>

A colleague once asked me why a number in my code had a comment three lines long. The number was `18`.

The comment said which rule it came from, which section notified it, and that it could change without warning. That felt like a lot of ceremony for a two-digit integer — until I remembered the alternative.

In most software, a constant is a decision you made. In software that implements regulation, a constant is a decision *someone else* made, which they can change without telling you, and which has a legally correct value you may not be reading correctly in the first place.

I learned both halves of that the hard way, building a set of finance calculators. Here's what went wrong, and the three habits I now apply to any code that encodes a rule someone else owns.

This article is for developers who write code that implements rules somebody else owns, like tax, payroll, benefits, lending, or any domain where a regulator or standards body sets the numbers and can revise them without asking you. If you've ever hard-coded a rate that later changed, this is for you.

::: note Prerequisites

You'll need enough JavaScript and Go to read short snippets. Both appear below, but only as illustration. Nothing here depends on knowing either language deeply.

I don't assume any finance or tax background, and I'll explain every domain term where it first appears. The examples come from Indian GST because that's where I hit these bugs, but none of the three failure modes are specific to India, to tax, or to any one jurisdiction.

:::

---

## The Bug That Returns a Plausible Number

Let's start with the worst kind, because it doesn't look like a bug at all.

In India, if you pay Goods and Services Tax late, you owe interest. The obvious implementation reads: take the tax owed, multiply by the annual rate, and scale by days late.

```js
const interest = taxOwed * (ratePct / 100) * (days / 365);
```

That code is arithmetically perfect. It is also, in a large number of real cases, several times too high.

The reason is that "the tax owed" isn't one number. A GST return has a gross output liability: the total tax on everything you sold. But most businesses settle much of that with input tax credit, the tax they already paid on their own purchases. Only the remainder is paid in cash. And interest, under the rule that governs it, runs on **the tax actually paid in cash**, not on the gross liability.

So we have the same formula, same rate, and two different inputs. And one of them is wrong:

```plaintext
90 days late at 18% p.a.
  on cash actually paid   (₹50,000)    →   ₹2,219
  on gross liability      (₹3,00,000)  →  ₹13,315
```

**Six times the interest.** Both numbers are what the formula returns. Neither throws. Neither looks obviously absurd. If you're the developer, your tests pass, because you wrote the tests against the same misunderstanding as the code.

This is the failure mode that makes regulatory code different. A regular bug produces a stack trace, or a number so wrong that someone notices. This one produces a number that is the right shape, the right order of magnitude, and confidently incorrect.

### What Actually Fixes it

A better test doesn't fix this. A better doc comment does.

The fix is to write down, at the definition site, *which* quantity the parameter means and where that requirement comes from:

```go
// GSTInterest returns interest on a late GST payment.
//
// Under Rule 88B(1) interest runs on the tax actually debited from the
// electronic cash ledger — NOT on the gross output liability. Getting
// this wrong overstates the interest, often by several times. Pass
// cashTaxPaid as the cash-ledger portion, not the gross bill.
//
// Pass annualRatePct as DefaultGSTInterestRate unless the notified rate
// has moved; 18% p.a. is currently notified under Section 50(1).
func GSTInterest(cashTaxPaid float64, days int, annualRatePct float64) float64
```

Notice that the parameter is called `cashTaxPaid`, not `amount`. That name is the entire defense. A caller who has the gross bill in hand has to stop and ask whether it's the right number (which is exactly the pause that prevents the bug).

I'd go further: **if a parameter can be confused with a similar quantity, the name should make the confusion impossible.** `amount` invites the mistake. `cashTaxPaid` forbids it.

---

## The Constant That Changes While You Sleep

The second failure mode is slower and more embarrassing.

Tax brackets move with the annual budget. Statutory ceilings get revised by notification. A gratuity limit sits at one figure for years and then doesn't. None of these changes care about your release schedule.

The tempting implementation is a constant:

```go
const gratuityCeiling = 2000000
```

Now think about who's hurt by that. Not only the user reading a stale number, but also the *developer* who spots the change on a Tuesday, finds the value baked into a dependency, and can do nothing but file an issue and wait.

There's also a subtler problem. Statutory figures often aren't one value. They're one value *for most people*. The same ceiling is higher for certain government employees. The same minimum service period is shorter for fixed-term staff. A hidden constant isn't just potentially stale. It's silently wrong for an entire class of user, forever.

So: make statutory values **options with documented defaults**, never hidden constants.

```go
// GratuityOptions carries the statutory figures that change by
// notification. The zero value means "use the defaults".
type GratuityOptions struct {
    Ceiling  float64 // 0 -> 20,00,000. Use 25,00,000 for Central Government civil employees.
    MinYears float64 // 0 -> 5. Use 1 for fixed-term employees.
}
```

The zero value still does the right thing for the common case, so nobody pays a complexity tax to get started. But the day the figure moves, a caller can correct it themselves – immediately, without waiting for me to cut a release.

That last clause is the real point. When your code encodes a rule you don't control, **your users need an override that doesn't route through your release cadence.**

---

## The Validation That Lived in the Form

The third one caught me during a refactor, and it's the most transferable.

I had a function that builds a loan amortisation schedule: one row per month, stepping through the tenure. Inside an app, this was safe. The form had a max attribute. The UI clamped the input. Nobody could ask for a 200-year loan because the interface wouldn't let them.

Then I extracted the calculations into a library, and the form stopped existing.

```go
rows, _ := Amortisation(principal, rate, months) // months came from where?
```

The loop is bounded only by the tenure it's handed. With a nonsense value, it doesn't return a wrong answer or run slowly. It just allocates until the **caller's** process dies. My bug, their out-of-memory crash, in a program I've never seen.

The fix is unglamorous: put the guard in the function.

```go
const MaxMonths = 1200 // 100 years

rows, err := Amortisation(principal, rate, 2000)
// err: months must be at most 1200, got 2000
```

The ceiling is deliberately absurd. The longest home loan actually sold runs 30 to 40 years, so 100 years only ever fires on input that was never going to mean anything. That's the property you want in a guard like this: **it should be impossible to hit by accident, so it never becomes a limit anyone argues with.**

The general lesson is bigger than one function. When you extract a library out of an application, you inherit every input validation the UI was quietly doing for you, and you inherit it as *someone else's* crash.

---

## The Three Habits

If you write code that implements rules you didn't write, there are three habits you should adopt now:

### 1. Name the Authority in the Doc Comment.

Not "the rate". *Which* rule, *which* section, and that it's subject to change. The comment above names Rule 88B(1) and Section 50(1) precisely so that anyone checking my work knows what to check it against, and so that a reader who disagrees can go and read the source rather than trusting me.

### 2. Make Statutory Values Options with Defaults, Not Constants.

The zero value handles the common case. The override handles the day the law moves, and the class of user the default was never right for.

### 3. Move the Guard from the Form to the Function.

Any validation the UI is doing is validation your library isn't. Assume the next caller has no UI at all.

None of this is exotic. It's the ordinary discipline of not trusting your inputs, applied to a domain where the *definitions* of the inputs are set by someone else and revised on their timetable.

The reason it's worth naming separately is that domain's specific failure signature: no exception, no stack trace, and no obviously wrong output. Just a number that's the right shape and six times too large, sitting quietly in a report that someone is about to act on.

---

## Wrapping Up

Here's what this comes down to.

Code that implements regulation has a failure signature of its own: no exception or stack trace, just a number that looks right and is confidently wrong.

We saw it three ways: a parameter that silently meant a different quantity than the rule intends, a statutory value frozen into a constant that the law later moved, and validation that stayed behind in the UI when the logic was extracted into a library.

The three habits answer those three failures in order. Name the authority at the definition site, so the next reader knows what to check your work against. Expose statutory values as options with defaults, so the day the law moves you change an argument instead of hunting for a literal. And put the guard in the function, because the next caller may have no UI at all.

If you take one thing away, make it the naming. `amount` invites the bug. `cashTaxPaid` forbids it. And a parameter name is the cheapest documentation you will ever write.

Thanks for reading!

::: info

I build [<VPIcon icon="fas fa-globe"/>EMICalcs](https://emicalcs.com), a set of free finance calculators for India — loans, SIP, GST, gratuity and tax. The formulas above are extracted from it and published as an open-source library, so the arithmetic is auditable by anyone who wants to check my work.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What to Do When Your Constants Are Someone Else's Law",
  "desc": "A colleague once asked me why a number in my code had a comment three lines long. The number was 18. The comment said which rule it came from, which section notified it, and that it could change witho",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-to-do-when-your-constants-are-someone-else-s-law.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
