---
lang: en-US
title: "How to Tell If Your Search Console Impressions Came From a Human or a Machine"
description: "Article(s) > How to Tell If Your Search Console Impressions Came From a Human or a Machine"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Tell If Your Search Console Impressions Came From a Human or a Machine"
    - property: og:description
      content: "How to Tell If Your Search Console Impressions Came From a Human or a Machine"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-tell-if-search-console-impressions-are-human-or-machine.html
prev: /programming/ts/articles/README.md
date: 2026-08-27
isOriginal: false
author:
  - name: Chudi Nnorukam
    url: https://freecodecamp.org/news/author/chudinnorukam/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7143b3f8-2a39-4095-bcde-6abb456a6a6f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Tell If Your Search Console Impressions Came From a Human or a Machine"
  desc="Your Search Console report says a page earned 3,068 impressions on the first page of Google over 90 days. But it earned zero clicks in that same time period. The usual reading is that the page has a c"
  url="https://freecodecamp.org/news/how-to-tell-if-search-console-impressions-are-human-or-machine"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7143b3f8-2a39-4095-bcde-6abb456a6a6f.png"/>

Your Search Console report says a page earned 3,068 impressions on the first page of Google over 90 days. But it earned zero clicks in that same time period.

The usual reading is that the page has a click-through-rate problem, so you rewrite the title, tighten the meta description, and wait. That reading is likely wrong, and acting on it wastes real work. Nobody saw those results, because no human ever ran those searches.

This tutorial shows you how to separate the two kinds of impressions your site earns. You'll run a short script against your own Search Console data, split the impressions by position band, read the query list for machine signatures, and compare the suspect page against a control page on the same site.

A position band is a bucket of average search positions rather than a single number. This script uses four: the top 3 results, the rest of page 1, page 2, and page 3 and beyond. Bucketing matters because a single average hides the spread, so a page can average position 8 by sitting at 2 for a handful of searches and 30 for everything else.

A control page is simply another page on the same site that you already know has real readers, and it gives you a baseline to hold the suspect page against.

At the end you'll know which of your pages have a human audience and which don't, and you'll stop optimizing for readers who don't exist.

Every number below comes from my own site.

::: note Prerequisites

You'll need the following before you start:

- **A verified Google Search Console property** with at least 90 days of data. The free tier is enough.
- **Node.js 18 or newer.** The script uses the built-in `fetch`, so no HTTP library is needed.
- **A Google Cloud service account** with the Search Console API enabled, added as a user on your property. Download its JSON key.
- **Two npm packages:** `google-auth-library` for the token, and `tsx` to run the TypeScript file directly.
- **A suspect page and a control page.** The suspect page is one with high impressions and almost no clicks. The control page is your best-performing article, the one you know real people read.
- About 20 minutes.

Add the dependency and point the standard credentials variable at your key:

```sh
npm i google-auth-library tsx
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-service-account.json
```

If you've never enabled the API, turn on "Google Search Console API" in your Google Cloud project, then add the service account's email address as a full user in Search Console under Settings and Users and permissions.

:::

---

## Why Machine Impressions Exist

Google's AI Mode and AI Overviews don't answer a question by running that one question. They run a technique called query fan-out: the model expands your prompt into a set of narrower sub-queries, retrieves sources for each one, and merges the results into an answer.

Each of those sub-queries is a real search against the real index. When your URL is retrieved for one, Search Console logs an impression at the position where it was retrieved.

That impression is genuine. The position is genuine. But no human ever saw a results page, so no human could have clicked. The click isn't missing because your title is weak. The click is structurally impossible.

This matters because the standard tooling can't tell the difference. A click-through-rate gap script that selects rows where actual click-through-rate falls below expected click-through-rate for that position will rank these rows at the very top, since zero divided by anything positive is the largest possible gap. The signal isn't merely absent. It's inverted, and your worst candidates get promoted to your best ones.

---

## Step 1: Pull the Page Totals

Save this as <VPIcon icon="iconfont icon-typescript"/>`phantom-check.ts`. It's the whole tool.

```ts :collapsed-lines title="phantom-check.ts"
// #!/usr/bin/env npx tsx
import { GoogleAuth } from 'google-auth-library';

const SITE = process.argv[2];
const PAGE = process.argv[3];
const DAYS = Number(process.argv[4] ?? 90);

if (!SITE || !PAGE) {
  console.error('Usage: npx tsx phantom-check.ts <site-url> <page-url> [days]');
  process.exit(1);
}

// Search Console data lags about two days, so end the window there.
const iso = (d: Date) => d.toISOString().slice(0, 10);
const endDate = iso(new Date(Date.now() - 2 * 864e5));
const startDate = iso(new Date(Date.now() - (DAYS + 2) * 864e5));

async function getToken(): Promise<string> {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) throw new Error('Could not mint an access token.');
  return token.token;
}

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

async function query(token: string, body: Record<string, unknown>): Promise<Row[]> {
  const url =
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensionFilterGroups: [
        { filters: [{ dimension: 'page', operator: 'equals', expression: PAGE }] }
      ],
      ...body
    })
  });
  if (!res.ok) throw new Error(`Search Console returned HTTP ${res.status}`);
  const json = (await res.json()) as { rows?: Row[] };
  return json.rows ?? [];
}

function band(position: number): string {
  if (position <= 3) return 'top 3';
  if (position <= 10) return 'rest of page 1';
  if (position <= 20) return 'page 2';
  return 'page 3+';
}

(async () => {
  const token = await getToken();

  const totals = await query(token, { dimensions: ['page'] });
  const t = totals[0];
  console.log(`\n${PAGE}`);
  console.log(`window: ${startDate} to ${endDate} (${DAYS} days)\n`);
  if (!t) {
    console.log('No impressions in this window.');
    return;
  }
  console.log(
    `TOTALS  ${t.impressions} impressions  ${t.clicks} clicks  ` +
      `position ${t.position.toFixed(1)}  CTR ${(t.ctr * 100).toFixed(2)}%\n`
  );

  const rows = await query(token, { dimensions: ['query'], rowLimit: 1000 });

  const bands = new Map<string, { imp: number; clk: number; queries: number }>();
  for (const r of rows) {
    const b = band(r.position);
    const cur = bands.get(b) ?? { imp: 0, clk: 0, queries: 0 };
    cur.imp += r.impressions;
    cur.clk += r.clicks;
    cur.queries += 1;
    bands.set(b, cur);
  }

  console.log('POSITION BANDS');
  for (const b of ['top 3', 'rest of page 1', 'page 2', 'page 3+']) {
    const v = bands.get(b);
    if (!v) continue;
    console.log(
      `  ${b.padEnd(15)} ${String(v.imp).padStart(6)} imp  ` +
        `${String(v.clk).padStart(4)} clk  ${v.queries} queries`
    );
  }

  const top = bands.get('top 3');
  if (top && top.imp >= 100 && top.clk === 0) {
    console.log(
      `\n  VERDICT: ${top.imp} impressions in the top three positions produced zero clicks.`
    );
    console.log('  That is the machine-issued signature. Read the query list below.\n');
  }

  console.log('TOP 20 QUERIES BY IMPRESSIONS');
  for (const r of rows.sort((a, b) => b.impressions - a.impressions).slice(0, 20)) {
    console.log(
      `  ${r.keys[0].slice(0, 60).padEnd(60)} ${String(r.impressions).padStart(5)} imp  ` +
        `${String(r.clicks).padStart(3)} clk  pos ${r.position.toFixed(1)}`
    );
  }
  console.log();
})();
```

Here is what the script does, part by part.

It takes three arguments off the command line: the Search Console property you own, the single page you want to investigate, and how many days to look back. The lookback defaults to 90. If you leave out the property or the page, it prints a usage line and exits, because every query below is meaningless without both.

Next it builds the date window. Search Console data lags by roughly two days, so the script ends the window two days before today rather than today. Ending it on today would pull a partial, still-filling day and make your most recent numbers look worse than they are. The `iso()` helper trims a JavaScript Date down to the YYYY-MM-DD string the API expects.

`getToken()` handles authentication. It creates a `GoogleAuth` client with exactly one scope, `webmasters.readonly`, and exchanges your service account key for a short-lived access token. That scope is read-only, so the script can look at your property but can't change anything in it. If Google returns no token, the script throws instead of carrying on with an empty Authorization header.

`query()` is the one function that talks to the API. It POSTs to the `searchAnalytics/query` endpoint for your property with the token in an `Authorization: Bearer` header. The important part is the `dimensionFilterGroups` block: a single filter on the `page` dimension with the operator `equals`. That filter is what turns a whole-site report into a report about one URL. Without it you would get your entire site back, and none of the comparisons in this article would mean anything.

The script then makes two separate calls, and the gap between them is the whole point of this piece. The first call asks for the `page` dimension, and because the filter has already narrowed the report to one URL, that comes back as a single summary row: total clicks, total impressions, click-through rate, and average position for that page. The second call asks for the `query` dimension with a row limit of 1000, which returns the individual searches that produced those impressions. A page can look ordinary in the summary and obviously machine-fed in the query list.

Finally, `band()` sorts the average position of each search into one of four buckets, and the script prints two reports: impressions grouped under POSITION BANDS, and the twenty highest-impression searches under TOP 20 QUERIES BY IMPRESSIONS. If the page had no impressions in the window, it says so and stops.

Run it against your suspect page:

```sh
npx tsx phantom-check.ts https://your-site.com https://your-site.com/your-suspect-page 90
```

Here's what it printed for my article titled "How ChatGPT and Perplexity Decide Which Sources to Cite":

```plaintext
https://chudi.dev/blog/aeo-answer-engine-optimization-explained
window: 2026-05-19 to 2026-08-17 (90 days)

TOTALS  7480 impressions  7 clicks  position 8.5  CTR 0.09%
```

Seven clicks from 7,480 impressions is a click-through rate of 0.09 percent. Average position 8.5 sits in the middle of the first page.

![Google Search Console performance view for chudi.dev filtered to a single article over three months. Total clicks 7, total impressions 7.5K, average CTR 0.1 percent, average position 8.5. The impressions line rises and falls across the whole window while the clicks line stays along the bottom, rising to a single click on a handful of isolated days.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/3c7c15af-6295-4b53-805c-187725fcf911.jpg)

The same figures appear in the Search Console interface if you prefer to start there. The script exists so you can run the comparison in Step 4 without clicking through two properties by hand.

Stop here and you'd conclude that the page ranks fine and converts badly. That's exactly the conclusion that leads to a wasted title rewrite. The page-level average is hiding the distribution, and the distribution is where the answer lives.

---

## Step 2: Split the Impressions by Position Band

The script already did this. Read the next block of its output:

```plaintext
POSITION BANDS
  top 3              100 imp     0 clk  16 queries
  rest of page 1    3068 imp     0 clk  92 queries
  page 2             110 imp     0 clk  25 queries
  page 3+             82 imp     0 clk  23 queries

  VERDICT: 100 impressions in the top three positions produced zero clicks.
  That is the machine-issued signature. Read the query list below.
```

Look at the second row. On the first page of Google, outside the top three, this page took 3,068 impressions across 92 distinct queries and produced zero clicks.

For scale: a result sitting in positions 4 through 10 normally takes somewhere between 2 and 10 percent of the clicks. At 3,068 impressions, the expected click count is roughly 60 to 300. The observed count is zero. That's not a weak title. A weak title still leaks a few clicks.

Notice also the 100 impressions in the top three positions, again with zero clicks. Positions 1 through 3 convert at 10 to 40 percent for human searchers. One hundred impressions there should have produced something.

Zero clicks in every single band is the signature. Human traffic is noisy and leaks clicks everywhere. Machine traffic is clean and leaks nothing.

One caveat before you go further. The band totals sum to 3,360 impressions while the page total says 7,480, and the page shows 7 clicks while every query row shows zero. That's not a bug in the script. Search Console withholds query rows that are rare enough to identify an individual searcher, so the query dimension never sums to the page dimension. Use the bands for their shape, not as a full accounting.

---

## Step 3: Read the Query List

The position bands tell you something is wrong. The query list tells you what.

Here are real rows from that page, exactly as the script printed them. The text is truncated at 60 characters by the output column:

```plaintext :collapsed-lines
TOP 20 QUERIES BY IMPRESSIONS
  how do answer engines like chatgpt and perplexity decide whi  1313 imp    0 clk  pos 8.7
  aeo platform that shows which urls chatgpt cites from my sit   206 imp    0 clk  pos 3.7
  as a director of seo at a mid-size company in north america,   193 imp    0 clk  pos 6.2
  what's the minimum viable aeo optimization?                    128 imp    0 clk  pos 3.3
  how can i improve my website's visibility in answer engines    115 imp    0 clk  pos 4.5
  aeo tool that explains chatgpt citation changes                106 imp    0 clk  pos 5.6
  ai content citation criteria answer engine optimization        105 imp    0 clk  pos 7.9
  ai content citation criteria answer engine optimization aeo     95 imp    0 clk  pos 8.3
  how do generative engine optimization (or answer engine opti    61 imp    0 clk  pos 4.6
  aeo tool that explains why a page stopped getting cited         60 imp    0 clk  pos 8.7
  before answer engines can cite your content, what must they     53 imp    0 clk  pos 4.8
  why citations matter for aeo.                                   47 imp    0 clk  pos 6.7
  give me 5 key takeaways from https://wildseo.co/. remember w    44 imp    0 clk  pos 2.8
  aeo tool to diagnose why i dropped out of perplexity citatio    43 imp    0 clk  pos 8.6
  which gpt model uses the same global-scale infrastructure as    43 imp    0 clk  pos 8.3
  ai content citation criteria answer engine source selection     40 imp    0 clk  pos 8.7
  ai content citation criteria answer engine source selection     31 imp    0 clk  pos 9.9
  which generative engine optimization (or answer engine optim    27 imp    0 clk  pos 4.2
  answer engine citations                                         26 imp    0 clk  pos 16.4
  what's the minimum viable aeo program?                          25 imp    0 clk  pos 1.0
```

![Google Search Console queries table for the same page. The rows are long natural-language queries, most of them complete questions, including one reading "as a director of seo at a mid-size company in north america, operating in the technology sector... how do answer engines like chatgpt and perplexity decide which sources to cite?" at 193 impressions. The clicks column reads 0 on every row.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/9571b23f-91e9-49f7-aef2-c4c1503c08d5.jpg)

Search Console shows the same rows untruncated, which is worth a look because the persona-framed query is easier to recognize at full length.

The first row deserves a note. That query is my own headline read back to me, near enough word for word. A fan-out that has already selected your page will search for your title, which is why the largest row on a phantom page is so often the page itself. It took 1,313 impressions and returned nothing.

Now compare that against how people actually type into a search box. Four signatures give the machine away:

### 1. Full natural-language sentences with punctuation

Humans type "aeo tools" and move on. They don't type "as a director of seo at a mid-size company in north america, ..." into Google. That's a persona-framed prompt, and it took 193 impressions.

### 2. Instructions rather than questions

The row reading "give me 5 key takeaways from [<VPIcon icon="fas fa-globe"/>wildseo.co](https://wildseo.co/). remember w..." is not a search. It's a task given to an assistant, which then went and searched. It sat at position 2.8 and took 44 impressions.

### 3. Near-identical permutations of one phrase

Count the rows beginning "ai content citation criteria answer engine". Four of the top twenty are the same phrase with the tail swapped: "optimization", "optimization aeo", and "source selection" twice at two different positions. A human asks once. A fan-out asks the same thing several ways, and every variant logs its own impression.

### 4. Literal machine artifacts

Two rows above are quiz stems rather than searches: "before answer engines can cite your content, what must they..." and "which gpt model uses the same global-scale infrastructure as...". Below the printed top twenty it gets less subtle. The script requests up to 1,000 rows, so raise the `slice(0, 20)` at the end to see all of them. Mine also contain the string `chatgpt://generic-entity?number=6`, a bare `yes`, a placeholder `yoursite.com`, stems beginning "true or false?", a full-sentence query in German, and a fragment of an assistant's own system prompt beginning "context: location: united states (not for language). do not in...". No person typed any of those into Google.

If you find one of these, it may be coincidence. If you find all four on one page, you're looking at fan-out traffic.

There's one more check worth making in the Search Console interface itself. Open the page, then look at the Search Appearance dimension. Search Appearance is a Search Console breakdown that tags impressions by the kind of result they showed up in, for example an AI Overview, a rich result, a video, or an FAQ, rather than a plain blue link. Google only fills it in for the result types it has chosen to report on, which is why an empty panel tells you nothing on its own.

For this page it returns no rows at all, which means Google isn't reporting any AI Overview appearance for it. Absence there isn't evidence either way, so don't treat an empty Search Appearance panel as proof of anything. Note it and move on.

---

## Step 4: Compare Against a Control Page

A single page in isolation proves little. Your property might simply have poor titles across the board. The control removes that explanation.

Pick your best article, the one you know real people read, and run the identical script over the identical window:

```sh
npx tsx phantom-check.ts https://your-site.com https://your-site.com/your-best-page 90
```

Same site, same script, same 90 days, and my model-comparison article "Fable 5 vs Opus 4.8: Every Reasoning Tier Benchmarked":

```plaintext
https://chudi.dev/blog/claude-fable-5-vs-opus-4-8
window: 2026-05-19 to 2026-08-17 (90 days)

TOTALS  30704 impressions  767 clicks  position 6.8  CTR 2.50%

POSITION BANDS
  top 3              140 imp     6 clk  44 queries
  rest of page 1    6515 imp   273 clk  294 queries
  page 2             790 imp     5 clk  127 queries
  page 3+            222 imp     0 clk  65 queries
```

![Google Search Console performance view for the control article over the same three months. Total clicks 767, total impressions 30.7K, average CTR 2.5 percent, average position 6.8. The clicks line and the impressions line sit at zero until early June, then rise and fall together for the rest of the window.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/6bcea793-1a5c-4b91-b1d9-3fbb8e8400ba.jpg)

Compare that chart against the first one. Here the two lines move together, which is what a human audience looks like. On the phantom page the clicks line never leaves the axis.

Put the two rows next to each other:

| **Page** | **Impressions, positions 4 to 10** | **Clicks, positions 4 to 10** |
| --- | --- | --- |
| "How ChatGPT and Perplexity Decide Which Sources to Cite" | 3,068 | 0 |
| "Fable 5 vs Opus 4.8: Every Reasoning Tier Benchmarked" | 6,515 | 273 |

Roughly twice the impressions produced 273 clicks. Half the impressions produced none at all. Same domain, same author, same publishing pipeline, same 90 days, and the same script.

The query lists differ in kind, not just in performance. The control page ranks for short keyword strings: "fable low vs opus high" at 691 impressions and 38 clicks, "fable high vs opus max" at 280 impressions and 25 clicks. Those are humans typing fragments. The phantom page ranks for grammatically complete sentences that nobody types.

![Google Search Console queries table for the control page. The queries are short keyword fragments such as "fable low vs opus high" at 38 clicks from 691 impressions and "fable high vs opus max" at 25 clicks from 280 impressions. Every row shows a non-zero click count.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/ca245adb-55a8-42e7-920c-5040990de5f4.jpg)

Set that table beside the one in Step 3. It's the same site, same window, and the same script. One is dominated by long machine-shaped queries that return nothing, the other by short fragments that convert.

Once you see the two outputs side by side, the conclusion is no longer a judgment call.

---

## What I Rejected, and Why

I tried three other approaches first. All three are plausible and all three are worse. Knowing why saves you the detour.

### Rejected: a Daily-Impression Variance Test.

My first instinct was that machine traffic should look more regular over time than human traffic, so I compared the coefficient of variation of daily impressions between the two pages. The phantom page scored 0.78 and the human control scored 0.69. By that test the phantom page looked *more* human than the human page.

The test was simply too weak to resolve the difference, and it contradicted arithmetic that wasn't close. When a subtle instrument disagrees with an overwhelming one, keep the overwhelming one.

### Rejected: Filtering Every Zero-click Row.

The obvious automation is to drop any query row with zero clicks. Don't do this. It fires on pages that have only just started to rank and haven't accumulated a click yet, so it silently suppresses your genuine risers. It also fires on a quirk described below.

The correct gate is at page level, not row level: a zero-click row on a page that takes clicks elsewhere is a real opportunity, while a row on a page that takes zero clicks across all of its queries inside position 11 is a phantom.

### Rejected: Another Title Rewrite.

Before running any of this I had already rewritten the titles on these pages five separate times over five months. Impressions moved. Clicks didn't. If you have already changed a variable several times with no effect, the next change isn't an experiment, it's a habit. Check whether the thing you're optimizing exists before you optimize it again.

One related trap deserves its own warning, because it manufactures fake phantoms on healthy pages. Search Console reports rows for anchor fragments, meaning URLs of the form `page#section`, as separate rows. It splits impressions across those rows but attributes the clicks to the parent URL. The result is a set of zero-click rows belonging to a page that converts perfectly well.

When I audited my own candidate list, 64 of 124 entries were duplicates of this kind, and one converting article appeared six times as a supposed click-through-rate gap. Strip any row whose URL contains a `#` before you analyze anything.

---

## What to Do With a Phantom Page

Nothing, on the page itself. That's the uncomfortable answer, and it's the right one.

Don't rewrite the title. Don't rework the meta description. Don't point internal links at it to give it a push. Every one of those actions optimizes for a reader who will never arrive, and the effort has a real cost measured in the work you didn't do on a page with humans on it.

What the finding actually changes is your instrumentation and your expectations:

1. **Exclude phantom pages from click-through-rate tooling.** Any script or agent that proposes title rewrites needs the page-level gate from the previous section, or it will keep nominating your deadest pages as your biggest opportunities.
2. **Stop reading those impressions as demand.** A dashboard showing 7,480 impressions looks like an audience. It's a retrieval count. Don't brief a client, or yourself, on machine impressions as though they were interest. Google's own Generative AI report, which went live for every property on 2026-08-11, shows the same impressions without splitting them, and I probed [<VPIcon icon="fas fa-globe"/>what that report does and does not expose](https://chudi.dev/blog/search-console-generative-ai-report).
3. **Read it as a retrieval signal instead, which is genuinely good news.** Your page was selected as a source, repeatedly, at good positions, for questions an assistant was actively researching. Several of the phantom queries on my page are shaped like buying intent: people asking an assistant where to get help with exactly what that page is about. The page is being cited into answers and earning nothing from it. That's not a visibility failure, it's an attribution and hand-off failure, and it's a completely different problem to solve. If you want to measure the citation side directly, that's what I built [<VPIcon icon="fas fa-globe"/>citability.dev](https://citability.dev) to do.

The distinction is the whole point. "My page is invisible" and "my page is visible to machines and invisible to my analytics" call for opposite responses.

---

## FAQ

::: details Does this mean AI Mode impressions are worthless?

No. It means they're not clicks and must not be counted as reader demand. A retrieval impression says a machine chose your page as a source for a question it was answering. That is worth knowing and worth measuring. It's simply a different metric that happens to share a column name with a human one.

:::

::: details Can I do this in the Search Console interface without the script?

Partly. You can filter to one page and sort queries by impressions, and the sentence-shaped queries will be visible. What the interface won't do is split one page's impressions into position bands, and that split is the step that turns a hunch into a decision. The script exists for that one calculation.

:::

::: details What if a page has both human and machine impressions?

Most pages do, and the bands will show it as clicks in some bands and none in others. Treat the page as mixed, not phantom. The all-zero pattern is what justifies pulling a page out of your click-through-rate tooling. Anything less than that, keep optimizing normally.

:::

::: details Will blocking AI crawlers stop these impressions?

No, and this is the most common mistake I see. Adding `GPTBot` or `Google-Extended` to `robots.txt` blocks training crawlers, which collect text to train models. Query fan-out is retrieval, and it runs against Google's ordinary search index using the same Googlebot crawl that powers every other result. Blocking training access doesn't remove a single one of these impressions. It only removes you from the corpus.

:::

::: details How often should I re-run this?

Once per quarter per suspect page is enough. The classification is stable, since it reflects what kind of queries the page matches rather than a ranking that moves week to week.

:::

---

## What You Accomplished

Search Console shows you impressions. It doesn't tell you whether a person was attached to one.

The four steps separate them with data you already have:

1. Pull the page totals, and distrust the average position.
2. Split the impressions into position bands. Zero clicks in every band, especially inside the top ten, is the signature.
3. Read the query list for full sentences, instructions, permutation families, and literal machine artifacts.
4. Run the same script over your best page in the same window. The contrast is the proof.

Run it on your own property before your next round of title edits. The 20 minutes it takes is cheaper than a month spent optimizing for an audience that was never there.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Tell If Your Search Console Impressions Came From a Human or a Machine",
  "desc": "Your Search Console report says a page earned 3,068 impressions on the first page of Google over 90 days. But it earned zero clicks in that same time period. The usual reading is that the page has a c",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-tell-if-search-console-impressions-are-human-or-machine.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
