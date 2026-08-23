---
lang: en-US
title: "What Every Dev Should Know About Tracking Product Data"
description: "Article(s) > What Every Dev Should Know About Tracking Product Data"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Every Dev Should Know About Tracking Product Data"
    - property: og:description
      content: "What Every Dev Should Know About Tracking Product Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-devs-should-know-about-tracking-product-data.html
prev: /academics/coen/articles/README.md
date: 2026-09-01
isOriginal: false
author:
  - name: Obum
    url: https://freecodecamp.org/news/author/obumnwabude/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0ba14c8d-47f9-466c-a300-f9838d8ab712.png
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

[[toc]]

---

<SiteInfo
  name="What Every Dev Should Know About Tracking Product Data"
  desc="Product data is the record of what actually happens inside your app or website. It shows what your users do, how your system behaves, and how your business performs. In this article, you'll learn what"
  url="https://freecodecamp.org/news/what-devs-should-know-about-tracking-product-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0ba14c8d-47f9-466c-a300-f9838d8ab712.png"/>

Product data is the record of what actually happens inside your app or website. It shows what your users do, how your system behaves, and how your business performs.

In this article, you'll learn what product data is, which parts of it are worth tracking, which parts to leave alone, and why the developer writing the code carries more responsibility for it than anyone tells them.

---

## What Is Product Data?

Product data refers to what happens inside your app or website. It answers plain questions: Which features do users love? Where do they get stuck? How fast does the app load? Which actions lead to a purchase or a signup?

Product data is verified information. Surveys and feedback tell you what users say, while product data shows you what they actually did.

That difference matters more than it sounds. People misremember their own behavior. They tell you the checkout was fine and then abandon it. Your data doesn't have that problem.

To make product data easier to track and manage, you can split it into three categories.

### 1. User Behavior Data

This is what users do inside your product. It covers the actions they take and how they move through your app. It shows you usage patterns, feature adoption, friction points, and user journeys.

Questions this data answers:

- How often do users click the "Add to Cart" button?
- How many users finish the onboarding flow?
- At what point in checkout do users give up?
- How long does it take a new visitor to join the waitlist?
- Which marketing campaign brought this user in?

### 2. System and Backend Data

This tracks how your system behaves while users interact with it. It's the under-the-hood view. Here you care about the health of your frontend, your servers, and your code.

Questions this data answers:

- How long does a page take to load?
- Which API endpoints return server errors?
- How much memory is the app using?
- How long does a database query take to finish?
- Does your business logic hold up in edge cases?

### 3. Business Metrics

These are the high-level numbers that tell you whether the product is working as a business. They connect user behavior and system performance to money and growth.

Common ones include:

- Daily and monthly active users
- Monthly recurring revenue and revenue per user
- Conversion rate and churn rate
- User retention after a set number of days
- Feature adoption percentage

### How the Three Fit Together

All three categories describe the same product from different angles. The useful part is where they meet.

Let's say a business has a payment endpoint that starts returning errors. That's system data. The users who hit those errors give up and leave their carts behind. That's behavior data. The week's revenue comes in lower than the week before. That's a business metric.

Look at any one of them alone and you learn almost nothing. A failing endpoint might be harmless. Abandoned carts might be shoppers who were only browsing. A revenue dip might be seasonal.

But if read all three together, the story tells itself. The endpoint broke, so the carts were abandoned, so the revenue fell.

---

## Why Should You Track Product Data?

You should track product data because it replaces your guesses with facts. Collecting app data shapes your roadmap, settles arguments before they start, and tells you what your users did instead of what you assumed they did.

Building a product without tracking is like driving at night with no headlights. You're moving, but you can't see the road ahead.

Think about how decisions get made without it. The conversation could stall at "I don't think users like this feature." But when you have data, you can change that opinion to a question and have an answer for it. Something like "Why did most of the users who opened this feature never come back to it?" You get to work with data-backed decisions, and that's the main point.

Data also shows you the real user journey. Not the one you designed, the one people actually walk. You see where they stop, what they skip, and which corners of your app they never find.

Tracking data also helps you see acquisition and retention issues. You can't fix a retention problem you can't see. To make matters worse, the retention numbers across the industry are sobering.

According to [<VPIcon icon="fas fa-globe"/>Adjust's 2024 benchmarks](https://adjust.com/blog/what-makes-a-good-retention-rate/), the median mobile app keeps 26% of its users after one day, 13% after a week, and 7% after 30 days. On the web it's starker. Contentsquare's [<VPIcon icon="fas fa-globe"/>2026 Digital Experience Benchmark](https://contentsquare.com/guides/digital-experience-benchmark/), built on 99 billion sessions across more than 6,500 sites, found that only 13% of visitors return within 30 days.

Tracking also catches the failures that quietly cost you money. The Baymard Institute maintains a [<VPIcon icon="fas fa-globe"/>running average of cart abandonment](https://baymard.com/lists/cart-abandonment-rate) across 50 separate studies, and it sits at 70.22%. When they asked people why they left, 17% said the site had errors or crashed, and another 17% said checkout took too long. Both of those are engineering failures. Both of them show up in your revenue rather than your error logs, and you find them in your data or you don't find them at all. So if you track them, you can avoid such issues.

It's also a high cost to not fully be aware of your market. When people don't know what's going on, it could cost them shutting down. For example, CB Insights [<VPIcon icon="fas fa-globe"/>tracked 431 startups that shut down](https://cbinsights.com/research/report/startup-failure-reasons-top/) since 2023 and found that 43% of them cited poor product-market fit. And this is a problem data could've solved before taking it up to business decisions.

Overall, most teams already believe in the importance of data, and agree that we need data-backed decisions. In [March 2025, Salesforce found that](https://salesforce.com/news/stories/trust-in-business-data-leaders-survey/) 76% of business leaders feel pressure to back their arguments with data. In addition, the majority believe that their career success depends on how "data literate" and data-driven they are.

With that said, let's look at another dimension of data's importance by checking out other team members that use it.

---

## Who Else Uses the Data You Track?

Almost everyone on the team. The data travels further than most developers expect.

You read it first. You use it to see whether last night's release broke something, whether a feature earns the maintenance it costs you, and where the slowness actually lives. Then it keeps traveling.

Your product manager reads it to decide what gets built next. Your designer reads it to find where people struggle. Your analyst reads it to explain why revenue moved. Support reads it to make sense of a spike in tickets. Marketing reads it to see which campaigns brought in users who stayed. Your founder reads it before every hard conversation about the roadmap.

Take one event and follow where it goes. Say it's `failed_checkout`, with a `reason` parameter attached.

- **You** see an error rate and trace the endpoint that's breaking.
- Your **product manager** sees how much conversion is lost and decides whether the fix jumps the queue.
- Your **analyst** sees an early churn signal and puts it into a model.
- Your **support lead** finally understands why tickets spiked on Tuesday.
- Your **marketer** sees paid traffic landing on a checkout that can't complete.
- Your **founder** sees revenue that never arrived, and walks into the next board meeting with a better question.

One event, six people, and six questions, all answered by three lines of code you wrote in an afternoon.

Notice what every one of those six people is really doing. They're making a decision.

That's the whole point of tracking. Data doesn't have value sitting in a table. It has value the moment somebody changes their mind because of it, ships something different, or stops doing something that wasn't working.

That need is what created data professions in the first place. Companies got large enough that nobody could hold the whole product in their head, and decisions started needing evidence rather than instinct.

Business intelligence analysts came first. Then data scientists, data engineers, product analysts, and analytics engineers, each a response to more data arriving and more decisions waiting on it. Every one of those roles exists because somebody needed to decide something and couldn't see far enough to do it.

In a small team, or on a product you're building from scratch, all of those jobs are yours. And in the beginning, the jobs are quite small. You don't yet need extensive analysis. Plain tracking, as I'm advocating for here, should do for a start.

---

## Why Should You Start Tracking Early?

You can't go back and collect the past. You can't reconstruct how users behaved in your first month. You can't find out which feature drove your early signups. And you can't explain the drop-off spike from three months ago. Your data starts the day you start collecting, and everything before that is gone for good.

Starting early also prepares you for scale. At some point you'll hire an analyst, or a data scientist, or you'll sit down to do the work yourself. If you've been capturing since day one, you hand them a goldmine. If you haven't, they spend their first quarter waiting for enough data to exist before they can say anything useful.

If you've started recording already, you've done well. Please keep it up. If not, start now. If you're setting up your codebase this week, wire in tracking this week. If your product has been live for two years, the best time to set up tracking was before launch, and the second best time is today.

There's an engineering reason, too. When you instrument from the start, your event schema grows alongside your product. You name things consistently because you're naming them as you build them. Starting tracking two years later is harder when your code has grown so big. So start early.

Starting early doesn't mean tracking everything. It means tracking a few correct things from the beginning and growing from there. You don't need a perfect schema on day one. You need a few good events and the habit of adding more.

---

## Why Tracking Data Never Ends

Setting up tracking is one thing. Keeping it up-to-date and relevant as the product changes is another, and many teams skip this.

Your product won't stay still. Features get renamed, flows get redesigned, and screens get deleted. Every one of those changes can break an event, orphan a parameter, or leave you collecting something that no longer means what it used to mean.

So treat tracking as part of the work, not a one-time setup. It's a living process as much as the product is alive.

When you ship a new feature, add its events in the same pull request. When you change a flow, check which events that flow was firing. When you deprecate a screen, deprecate its events too and tell whomever was querying them. Verify that your events actually fire after you deploy, the same way you'd check that the feature itself works.

Verifying is important. Broken tracking is quiet. Monte Carlo asked data professionals who spots data problems first, and [<VPIcon icon="fas fa-globe"/>74% said business stakeholders do](https://montecarlo.ai/blog-data-quality-survey), all or most of the time. Almost nobody writes tests for analytics, so a stopped event tends to surface weeks later in somebody else's dashboard.

It's worth auditing the whole schema now and then. Once or twice a year, go through your events and ask three things of each one. Is it still firing? Does anyone read it? Does the name still describe what it does?

---

## What Should You Track in Your Product?

Every product is different, and there's no universal list. The rule of thumb is to track what you'd act on and skip what you wouldn't.

That said, the three categories from earlier map onto concrete things you instrument. Here's how they break down.

**User behavior** becomes events and user properties. **System and backend** becomes crashes, performance data, and backend errors. **Business metrics** are different, and the difference is worth understanding.

You don't instrument business metrics directly. There's no `track_mrr` call. You compute them from the other two categories. This explains why the quality of your events decides the quality of your business reporting.

### Events

Events are the most important thing you track. An event is any meaningful action in your product. Clicking a button, finishing a purchase, submitting a form, sharing content, or skipping onboarding are all examples.

Not every click is an event. Focus on actions that show intent, progress, or value.

Name events in `verb_noun` format using snake_case. This is the convention Google uses for its own [<VPIcon icon="fa-brands fa-google"/>recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events), including `add_to_cart`, `sign_up`, `begin_checkout`, and `join_group`. Pick one convention and hold to it. A schema with `checkout_failed` next to `failed_checkout` is a schema nobody can query with confidence.

Attach parameters to give events context:

- `failed_checkout` with `reason: "payment_declined"`
- `view_product` with `product_id: "123"` and `category: "shoes"`
- `use_feature` with `feature_name: "export_pdf"`

Three kinds of event are worth prioritizing. **Conversion actions** such as `sign_up`, `complete_purchase`, and `start_trial` are your most important numbers. **Feature usage** such as `open_dashboard` and `share_report` tells you which parts of your app earn their keep. **Drop-off points** such as `abandon_checkout` and `exit_onboarding` tell you where people quit, which is every bit as useful as knowing where they succeed.

### User Properties

Events describe what a user did. User properties describe who the user is.

A user property is a state that persists between sessions: plan tier, signup month, preferred language, or whether onboarding was ever completed. You set it once and it stays until it changes.

Properties are what let you slice your events. "How many users completed checkout" is a number. "How many users on the free plan completed checkout in their first week" is an answer.

There are two traps to avoid. First, don't put high-cardinality values in user properties, because a property with thousands of distinct values is unusable for grouping. And don't put personal information in them. More on that further down.

### Crashes

A crash happens when an app fails during use. A crash is some unforeseen heavy error that causes a poor user experience. Every crash report should tell you the device, the operating system version, the app version, and the stack trace at the moment it went down.

### Performance Data

Performance data covers how fast your product actually is for real people, not on your machine. Slow software loses customers, which in turn causes a revenue drop.

Track app start time, screen render time, network request duration, and the time taken by any operation a user waits on. Record these as distributions rather than averages. That way, you have more information when taking action.

### Backend Logs and Errors

The logs give insights into what the code was doing. The errors tell where it failed. Overall, these are info from your servers that your frontend can't tell you.

Track logs and error rates per endpoint, status codes, failed background jobs, timeouts, and failures from third-party services you depend on. Log them with enough context to trace a single failing request end to end.

It helps especially when there's no way to get info from the user. They also help to reconcile app-side activities with the system.

Also, backend logs will show when people try to abuse and bombard your server with requests. At that point, you can increase your rate-limits and put measures in to prevent such security problems.

---

## What Should You Not Track?

Don't track what you can't act on. Before adding an event, answer one question. If this number moved, what would I do differently? If you have no answer, you've found a number to skip.

Don't track what you'd hate to leak. Every piece of data you collect is data you're now responsible for protecting. Collecting just what you need is a security best practice.

Don't track anything you can't name precisely. A clear name is a sign that the meaning is settled. `user_action` and `button_click` are placeholders rather than events. Work out what the moment means first, then name it.

Don't track the same thing twice. One record per unit event is enough. Two events that fire on the same action introduce a burden of knowing which is a "better source of truth". That stress of choosing which to use isn't worth it.

---

## How Do You Handle User Data Safely?

By collecting just adequately for the job and being deliberate about its handling.

### Keep PII Out of Your Analytics.

Personally identifiable information, usually shortened to PII, is any data that can identify a specific person on its own or when combined with something else you hold. Names, email addresses, phone numbers, physical addresses, payment details, and government ID numbers all count.

Analytics tools aren't built to hold PII, and most vendors forbid it in their terms. Use an anonymous or pseudonymous user ID instead, and join to your own database on the rare occasion you genuinely need identity.

### Watch What Leaks in Through Parameters.

This is another place where PII usually gets in. A search event that records the query string could record somebody's own name. A URL parameter that carries an email address could directly enter the event log. Sanitize parameter values before they leave the device.

### Ask for Consent Where the Law Requires it, and Honor the Answer.

Under the EU's [<VPIcon icon="fas fa-globe"/>General Data Protection Regulation](https://commission.europa.eu/law/law-topic/data-protection/data-protection-eu_en) and similar regimes elsewhere, analytics that isn't strictly necessary generally needs consent.

### Set a Retention Period and Let Data Expire.

Most analytics tools default to keeping data for a fixed window and let you shorten it. Shorter is safer. You rarely need event-level detail from three years ago, and aggregate summaries serve you better anyway.

### Write Down What You Collect.

Documentation is useful. A single document listing every event, every parameter, and why it exists will save you during a privacy review, an audit, or the day a new engineer asks what `evt_flow_2b` was for.

---

## Summary

Product data tells you what happened, not what users say happened or what your opinions are.

Collect data from various facets. User behavior tells you what they did, system data tells you how your product held up, and business metrics fall out of the other two. One category on its own might not be as accurate.

Start tracking today, whatever stage you're at. You can't recover last month's data. That window closes permanently, and it closes every single day.

Name your events for the people who'll query them. Use `verb_noun`, keep it consistent, write down what your parameters mean, and tell your team when you change something.

Keep the schema alive as the product changes. Add events in the same pull request as the feature. Audit it once or twice a year and cut anything nobody reads.

Here's to the many benefits you'll reap in the long run for taking note of data in your product overall.

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Every Dev Should Know About Tracking Product Data",
  "desc": "Product data is the record of what actually happens inside your app or website. It shows what your users do, how your system behaves, and how your business performs. In this article, you'll learn what",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-devs-should-know-about-tracking-product-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
