---
lang: en-US
title: "How I Tested Malaysia's Open Data Portals with Plain English"
description: "Article(s) > How I Tested Malaysia's Open Data Portals with Plain English"
icon: iconfont icon-playwright
category:
  - Node.js
  - Playwright
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - playwright
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Tested Malaysia's Open Data Portals with Plain English"
    - property: og:description
      content: "How I Tested Malaysia's Open Data Portals with Plain English"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-tested-malaysia-s-open-data-portals-with-plain-english.html
prev: /programming/js-playwright/articles/README.md
date: 2026-04-24
isOriginal: false
author:
  - name: Tech With RJ
    url: https://freecodecamp.org/news/author/LeeRenJie/
cover: https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/d4859bd4-15d5-4bb7-ba9e-d4693c90163d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Playwright > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-playwright/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Tested Malaysia's Open Data Portals with Plain English"
  desc="Most end-to-end test suites drive a real browser and click through an app like a user. They check whether a page renders and whether elements appear. But they don't check whether the numbers on those "
  url="https://freecodecamp.org/news/how-i-tested-malaysia-s-open-data-portals-with-plain-english"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/d4859bd4-15d5-4bb7-ba9e-d4693c90163d.png"/>

Most end-to-end test suites drive a real browser and click through an app like a user. They check whether a page renders and whether elements appear.

But they don't check whether the numbers on those elements are correct. A data-pipeline bug that shows Malaysia's population as 3.4 million instead of the real 34 million slips past every selector test in the suite.

The element still exists. A number still renders. The page still looks right. But the bug ships and sits there until a human notices.

I work as a full-stack engineer. Writing end-to-end (E2E) tests with [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev) and unit tests with [<VPIcon icon="iconfont icon-jest"/>Jest](https://jestjs.io) is part of my day job. I also use [Playwright MCP (<VPIcon icon="iconfont icon-github"/>`microsoft/playwright-mcp`)](https://github.com/microsoft/playwright-mcp), the bridge between AI assistants like Claude and a running browser, when I need to generate first-draft test code or debug a flow.

None of that tooling closes the maintenance tax on selector-based suites. Every E2E suite I keep alive at work accumulates `data-testid` selectors, `waitForSelector` calls, and tests that break because someone renamed a button.

Bug0's [<VPIcon icon="fas fa-globe"/>Breaking Apps Hackathon](https://hashnode.com/hackathons/breaking-things) gave me a pretext to try something different. Over a weekend, [I built an automated regression suite (<VPIcon icon="iconfont icon-github"/>`LeeRenJie/passmark-hackathon`)](https://github.com/LeeRenJie/passmark-hackathon) for Malaysia's three public open data portals, [<VPIcon icon="fas fa-globe"/>data.gov.my](https://data.gov.my), [<VPIcon icon="fas fa-globe"/>OpenDOSM](https://open.dosm.gov.my), and [KKMNow](https://data.moh.gov.my), using [<VPIcon icon="iconfont icon-github"/>`bug0inc/passmark`](https://github.com/bug0inc/passmark), Bug0's open-source AI-driven Playwright library.

The tests are written in plain English. Two AI models verify each assertion. A third arbitrates disagreements.

::: info What You'll Find Below:

- How to write an E2E test that checks whether a dashboard's numbers are correct, not only whether the page renders
- A specific assertion pattern (range-bounded KPIs) that catches an entire class of data-pipeline bug that selector tests miss, with working examples ready to copy
- A cross-field math assertion that takes one sentence in Passmark and around a hundred lines of code without it
- How Passmark's own failure explanations became my debugging loop (the single biggest shift in how I'll write E2E tests going forward)
- The real limits: a 14% cache-hit rate, a dependency on OpenRouter, and what two-model voting fails to catch

:::

---

## Why Malaysia's Open Data Portals?

The hackathon suggested targets like Vercel Commerce, Cal.com, and Hashnode. These all would've been solid picks.

But I wanted to test something local and closer to my day-to-day work instead. I also wanted a data-heavy site where the numbers on screen have to be accurate, as I work with numbers too on a daily basis.

Malaysia has three public open-data portals:

- [<VPIcon icon="fas fa-globe"/>data.gov.my](https://data.gov.my), run by MAMPU, the government's digital transformation agency
- [<VPIcon icon="fas fa-globe"/>OpenDOSM](https://open.dosm.gov.my), run by the Department of Statistics
- [<VPIcon icon="fas fa-globe"/>KKMNow](https://data.moh.gov.my), run by the Ministry of Health

They're public, no authentication required, with documented APIs. Seemed like a good fit for an automated test suite. The data on them is what Malaysians use every day, so accuracy isn't optional.

---

## What Is Passmark?

Passmark is a Playwright library where the tests read like specs. Here's an example:

```ts
await runSteps({
  page,
  userFlow: "population dashboard smoke",
  steps: [
    { description: "Navigate to https://data.gov.my/dashboard/kawasanku" },
    {
      description: "Wait for the country-level Malaysia view to render",
      waitUntil: "A headline population number is visible",
    },
  ],
  assertions: [
    {
      assertion:
        "The page shows Malaysia's total population as a number greater than 20 million and less than 40 million",
    },
  ],
  test,
  expect,
});
```

There are no selectors, no `data-testid`, and no `page.locator()`. The assertion expresses what I care about, in the words I would use with a colleague.

On the first run, an AI agent drives the page and caches the resolved Playwright action to Redis. Every run after that replays at native Playwright speed with zero model calls.

When the UI changes and a cached action fails, the AI re-engages only for that step. Two assertion models (Claude and Gemini) vote. A third model arbitrates disagreements.

---

## The Hero Spec: Range-Bounded Assertions

Range-bounded assertions were the first shape of test I wrote, and the one I came back to most across the suite.

The idea is straightforward: check that a number on the page falls inside a sensible range, not that a specific element exists.

The image below is the Playwright report from the population spec, with all four range-bounded assertions passing.

![Playwright HTML report detail for the population spec. Passmark's annotation reads: "Total Population (2025) with a value of 34.2 million, which is between 20 million and 40 million." All four range-bounded assertions pass.](https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/4a5f70e6-8a75-489b-8d0d-7d4226653b1a.png)

The range-bounded population test is the one that shows Passmark's real value.

Traditional Playwright asserts DOM structure. It confirms that an element with class `kpi-total` contains the text `34.2 million`. That tells you the page rendered, not whether the number makes sense.

A bug that shows Malaysia's population as `3.42 million` sails past any selector test. The DOM is correct. The number renders. Nothing breaks in the conventional sense.

Passmark reads the page, evaluates the claim, and fails because `3.42 million` falls outside the sane range. Two models vote. A hallucination by one model alone produces no false pass.

### What Two-Model Voting Doesn't Catch

Voting defends against one model misreading the page. It doesn't defend against both models misreading the page the same way. If Claude and Gemini both parse "32.4 million" as "3.24 million" because of the same unusual spacing in the DOM, they agree, they vote pass, and the bug ships.

The mitigation is assertion design. Write assertions that are hard to misread. A range check ("between 20 million and 40 million") is harder for a model to get wrong than a prose check ("roughly 34 million"). Numerical bounds leave less room for interpretation than adjectives. The more your assertion looks like a unit test written in English, the less room the models have to disagree.

---

## Going Further: Cross-Field Math

Range-bounded assertions are a good first step. They catch "is this number in the right ballpark?" But they don't catch "do these numbers agree with each other?"

For that, you need cross-field math. If a dashboard shows a total population and a breakdown by gender, those two things are supposed to agree. Male plus female should equal total. Ethnicity breakdown percentages should sum to 100.

```ts
test("Cross-field math: sex breakdown sums to total population", async ({ page }) => {
  test.setTimeout(180_000);
  await runSteps({
    page,
    userFlow: "population sex breakdown consistency",
    steps: [
      { description: "Navigate to https://data.gov.my/dashboard/kawasanku" },
      {
        description: "Wait for the Malaysia country-level view with breakdown data",
        waitUntil:
          "A headline total population figure is visible and a breakdown by sex is shown on the page",
      },
    ],
    assertions: [
      {
        assertion:
          "The male and female population values shown on the page add up to approximately the headline total population, within a 5% margin",
      },
      {
        assertion:
          "Any percentage-based breakdowns visible on the page (by sex, age, or ethnicity) sum to approximately 100% within a 2 percentage-point margin",
      },
      {
        assertion: "No breakdown value is negative or greater than the headline total",
      },
    ],
    test,
    expect,
  });
});
```

Try writing that in vanilla Playwright. You need selectors for the headline number, selectors for the breakdown components, number parsing with a comma-aware regex, and a margin calculation. Seventy to a hundred lines of code to verify three invariants a primary school student would call obvious.

The Passmark version is one spec. I ran it against [<VPIcon icon="fas fa-globe"/>Kawasanku's](https://data.gov.my/dashboard/kawasanku) live country view. All three assertions passed in 1.4 minutes. Passmark's annotation, verbatim:

> "The headline total population figure 'Malaysia has a population of 32,447,385 people.' is visible, and 'Gender And Age Distribution' is shown, which implies a breakdown by sex (male, female) will be available."

Two models read the page, extract the numbers, do the arithmetic, and agree. When the dashboard changes layout in three months, the same assertion still works, because it never named a selector.

This is the class of test I want running against every dashboard product that I touch. Financial totals matching their line items. Percentages that sum to 100. Inventory counts equal to the sum of warehouse locations. This rarely gets checked today, because writing the check by hand outweighs the perceived value of running it.

---

## What I Found Across Three Runs

| Run | Passed | Key change |
| --- | --- | --- |
| 1 | 4 of 13 (31%) | Baseline. Wrote specs without looking at the target pages |
| 2 | 8 of 13 (62%) | Rewrote five over-specified assertions using Passmark's own feedback |
| 3 | 12 of 13 (92%) | Dropped one more wrong assertion, bumped timeouts, added retry, installed WebKit |

![Playwright HTML report overview page showing the final run. 11 tests passed, 2 failed, total time 21.1 minutes across 13 specs.](https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/0181e92e-3341-4f1a-9830-cd4acd305e1c.png)

Every passing spec after run 1 came from Passmark telling me, in plain English, why my assertion didn't match the page.

Here are three examples from run 1:

For <VPIcon icon="iconfont icon-typescript"/>`dataset-detail.spec.ts`, I asserted "an API usage snippet (curl or JS) is shown." knowingly that the page is using Python and I wanted to see what the result was. Passmark replied:

> *"The page contains API usage snippets, but they are specifically for Python using the requests library. There are no snippets provided in curl or JavaScript formats."*

The page had snippets. I asked for the wrong languages. Fix: accept any language.

For <VPIcon icon="iconfont icon-typescript"/>`dashboard-population.spec.ts`, I asserted "a chart visualizing population by age or ethnicity is rendered." Passmark replied:

> *"The current page displays charts for vital statistics such as Live Births, Deaths, and Natural Increase over time, but there is no chart visualizing population specifically by age groups or ethnicity."*

The charts are there. Not the slice I guessed. Fix: accept any chart about population.

For <VPIcon icon="fas fa-folder-open"/>`kkmnow/`<VPIcon icon="iconfont icon-typescript"/>`hospital-utilisation.spec.ts`, I asserted a "headline bed-utilisation percentage." Passmark replied:

> *"While there are multiple bed-utilisation percentages listed in tables and rankings further down the page, there is no prominent, top-level headline KPI figure displaying the overall bed-utilisation percentage."*

The numbers are there. I had asked for a layout the designers didn't build.

**This is the killer feature:** Passmark's failure messages aren't stack traces. They're explanations. The AI read the page, compared it against my words, and pointed me at the fix. Nothing like a selector-based test throwing `TimeoutError: waiting for locator`.

### The Debugging Loop

Once I saw the pattern, the loop became my main technique. Here's the procedure:

1. Read the failure message word for word. Don't skim.
2. Trust it as a description of what is on the page. The AI has read the page. Your assertion has not.
3. Rewrite the assertion so it matches what's on the page. Broaden, narrow, or restate.
4. Run it again.

The discipline is to not argue with the tool. The page is what the page is. Your assertion is what is wrong. Every time I tried to "fix" the page (convinced my assertion was right and the site was broken), I lost some time. Every time I took the failure message at face value and rewrote, the test passed on the next run.

This is the one of the changes in how I'll write E2E tests going forward. The feedback loop is the tool. Every failed assertion is a draft of the correct one.

### The Two Specs That Still Fail Are the Most Interesting

#### 1. The two models disagreed and the arbiter call failed.

On <VPIcon icon="iconfont icon-typescript"/>`catalogue-search.spec.ts`, Claude voted fail (72% confidence) and Gemini voted pass (100% confidence) on the same assertion. I had written the assertion in a way that read two ways.

Passmark escalated to an arbiter model through OpenRouter. The call came back with a 504 from Cloudflare. The arbiter never ran. The suite failed the spec.

This is an honest limit, not a fluke. Any CI that runs Passmark depends on OpenRouter's availability. External gateway errors happen. My fix for the final run was a global retry wrapper around the OpenRouter call, and the 504 stopped being a problem in practice.

If you bring this to production CI, plan for retries and treat OpenRouter outages as a first-class failure mode in your runbook.

![Playwright HTML report detail for the catalogue-search failure. Shows Claude and Gemini returning different verdicts on the same assertion, Passmark escalating to an arbiter model, and the arbiter call aborting with a 504 from Cloudflare.](https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/9e08d49a-00e6-4803-a86e-decfa0534308.png)

This failure taught me something about assertion design: my wording was ambiguous. Claude's reading was reasonable. Gemini's reading was reasonable. When you write tests in English, being precise about what you mean is part of writing a good test.

#### 2. The wait condition fired too early.

On the KKMNow spec, I had `waitUntil: "A utilisation metric is visible"`. The page showed the section label "Hospital Bed Utilisation (%)" before the numbers finished loading. The wait step saw the label, decided the condition was met, and moved on. By the time the numbers rendered, the test had run out of time. Once the page was fully loaded, the range assertions would have passed on content.

> "The page displays multiple bed-utilisation percentages within the specified range (0% to 120%). For example, the ranked list shows Perlis at 93.1% and Melaka at 88.2%."

![Playwright HTML report detail for the KKMNow spec. The test times out on the initial waitUntil, but Passmark's annotations show the range and state-selector assertions passed on content once the dashboard hydrated. Example quoted: "Perlis at 93.1% and Melaka at 88.2%."](https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/2a9c8ade-f2ab-4c58-a56b-f7714bcabef5.png)

The lesson: your `waitUntil` wording needs the same care as your assertion wording. Both are read by AI. A vague wait is as bad as a vague assertion.

---

## What It Cost, and Why Cache Rate Is Cost Rate

Each of the three runs took about 20 minutes on 13 specs with a single worker. The hackathon's pooled OpenRouter key covered the AI costs, so I have no personal dollar figure to report.

The more useful cost finding is what gets cached.

```sh
docker exec passmark-redis redis-cli DBSIZE
#
# 5
```

Five steps out of roughly 35 were cached across three runs. A 14% cache-hit rate. The Passmark README explains why:

> Only steps that produced a single tool call get cached. Multi-step sequences are considered non-deterministic.

Most of my steps described multi-tool sequences. "Open the area selector and choose Selangor, then wait for navigation" becomes click, wait, verify. Those don't cache by design.

This matters for your budget. An 86% miss rate means 86% of your steps call a model on every run. The cost model is per-tool-call via OpenRouter.

To estimate your own bill: count non-atomic steps in your suite, multiply by your chosen model's per-call price at current OpenRouter rates, and the product is your recurring cost per run. Cache rate is cost rate.

The fix is authoring discipline. Split compound descriptions into atomic steps. Treat cache fill rate as a metric you track, not an implementation detail to ignore. A suite with 80% atomic steps costs a fifth of a suite with 14%.

---

## The Pattern Worth Stealing

The idea here is bigger than Passmark.

**Check that the numbers on your dashboards make sense.** Most teams don't. They should.

A one-line assertion like "the headline number is between 20 million and 40 million" catches several classes of bug regular tests miss.

Here are four common ones:

- The data pipeline divided by the wrong thing, so the number on screen is ten times too small.
- A timezone bug made yesterday's total show up under tomorrow's date.
- The data never refreshed, so users are looking at last week's numbers.
- A locale flip swapped commas and decimals, so 1,234,567 is now reading as 1.234567.
Civic portals were my target. The pattern applies anywhere a dashboard shows numbers. Fintech reports, SaaS analytics, healthcare metrics, e-commerce admin panels. Any screen where a number is supposed to mean something.

Most of these numbers never get tested. Writing the check by hand is tedious. You need a selector to find the number, code to parse it, code to handle units, and a margin calculation. Fifty lines for one check. Nobody bothers.

You don't need Passmark to steal the idea. The same check works in plain Playwright with `page.evaluate` and number parsing. The Passmark version is just more efficient to write and readable by anyone on the team, not only engineers.

---

## Honest Verdict

Passmark works. Across three runs I went from 4 of 13 passing to 12 of 13 without touching a selector, guided by the tool's own feedback.

Still, the caveats are real:

- On a cold cache, every step waits for a model. Budget more wall-clock time than a selector suite.
- In my suite only 14% of steps cached. The other 86% pays model cost on every run. Authoring discipline (atomic steps) is the difference between cents and dollars per run.
- Two-model voting doesn't protect against both models misreading the same way. Write assertions that are hard to misread.
- Every assertion depends on OpenRouter's availability. External gateway errors need a retry strategy before this runs in CI.

What stuck with me: Passmark didn't make me better at Playwright. It made me write tests I would have skipped otherwise.

What I imagine myself doing at work:

- Run a small nightly Passmark suite against the critical dashboards, focused on range and freshness checks.
- Keep traditional Playwright and Jest for everything that has to be fast and deterministic.
- Treat every Passmark failure message as a specification of the page, not an error to argue with.

Try this, even if you never touch Passmark. Pick a number on a dashboard you work with. Write a test that fails if the number is outside a sane range. See what breaks. That is the whole pattern and purpose of this article.

::: info Resources

<SiteInfo
  name="LeeRenJie/passmark-hackathon"
  desc="Contribute to LeeRenJie/passmark-hackathon development by creating an account on GitHub."
  url="https://github.com/LeeRenJie/passmark-hackathon/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea07783731507009fbe84812128ba9c9023bc6b42f89616a7f765624eb007f92/LeeRenJie/passmark-hackathon"/>

<SiteInfo
  name="bug0inc/passmark"
  desc="The open-source Playwright library for AI browser regression testing with intelligent caching, auto-healing, and multi-model verification."
  url="https://github.com/bug0inc/passmark/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/1195492297/4e77d4d6-479f-4626-9b5c-06a6e5e78e0a"/>

<SiteInfo
  name="Breaking Apps Hackathon | Hashnode"
  desc="A 4-week open hackathon to test your apps, test the internet, and share Passmark — the open-source AI library for regression testing. $4,000+ in prizes. Free AI credits included."
  url="https://hashnode.com/hackathons/breaking-things/"
  logo="https://hashnode.com/icon1.png?icon1.a0e3fc5f.png"
  preview="https://hashnode.com/hackathons/breaking-things/opengraph-image?940ba77a6b3fc934"/>

- Test targets: [<VPIcon icon="fas fa-globe"/>data.gov.my](https://data.gov.my), [<VPIcon icon="fas fa-globe"/>OpenDOSM](https://open.dosm.gov.my), [<VPIcon icon="fas fa-globe"/>KKMNow](https://data.moh.gov.my)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Tested Malaysia's Open Data Portals with Plain English",
  "desc": "Most end-to-end test suites drive a real browser and click through an app like a user. They check whether a page renders and whether elements appear. But they don't check whether the numbers on those ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-tested-malaysia-s-open-data-portals-with-plain-english.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
