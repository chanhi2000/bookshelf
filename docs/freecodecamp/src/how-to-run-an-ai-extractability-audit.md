---
lang: en-US
title: "How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)"
description: "Article(s) > How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)"
    - property: og:description
      content: "How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-an-ai-extractability-audit.html
prev: /programming/py/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Chudi Nnorukam
    url: https://freecodecamp.org/news/author/chudinnorukam/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9c86b8bb-fdda-4f95-9175-623de49c584c.png
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
  name="How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)"
  desc="When an AI assistant answers a question, it lifts sentences from a handful of pages and cites them. Whether your page is liftable is not a mystery or a vibe. It's a set of mechanical properties of you"
  url="https://freecodecamp.org/news/how-to-run-an-ai-extractability-audit"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9c86b8bb-fdda-4f95-9175-623de49c584c.png"/>

When an AI assistant answers a question, it lifts sentences from a handful of pages and cites them. Whether your page is liftable is not a mystery or a vibe. It's a set of mechanical properties of your HTML that you can measure, score, and fix.

This tutorial walks through the exact audit I ran on my own site, the six invisible heading tags it caught, the one-commit fix, and the CI gate that keeps the problem from coming back.

Here is the punchline up front: my homepage scored 65 out of 100 on extractability. The cause was five UI card components that rendered their titles as `<h2>` and `<h3>` tags. Demoting those six headings to ARIA-preserving paragraphs, without changing a single visible pixel or removing one word of content, took the page to 100. Over the last 90 days, Microsoft's Bing Webmaster Tools reports 1,600 AI citations across 33 of my pages. Extraction is the stage of that pipeline this tutorial teaches you to audit.

---

## What an Extractability Audit Actually Tests

A citation from an AI engine is the last step of a three-stage machine pipeline, and your page has to pass every stage:

1. **Retrieve**: the engine's crawler is allowed to fetch your page, and does.
2. **Extract**: the model finds a clean, self-contained answer in your markup.
3. **Attribute**: the engine is confident enough about who said it to put your name next to it.

![Three-stage pipeline diagram labeled Retrieve, Extract, Attribute, showing that an AI engine must fetch a page, lift a clean answer from its markup, and identify the author before a citation appears.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/793015f2-359e-497a-b18b-4238999aa83e.png)

Most AI-visibility advice concentrates on stage 1 (robots.txt, sitemaps, llms.txt) and stage 3 (schema, entity signals). Stage 2 is where I've found the cheapest wins, because it's pure HTML engineering, and because it fails silently: a page that retrieves fine and attributes fine but extracts poorly simply never appears in answers, and nothing tells you why.

**Extractability** is the measurable version of stage 2: can a parser walking your rendered HTML find self-contained answer blocks under clearly scoped headings? The audit in this tutorial scores that on a 0 to 100 scale using five checks, each of which you can verify by hand:

| Check | What it tests | Weight |
| --- | --- | --- |
| F1 | The first sentence under every H2 stands alone as an answer | 30 |
| F2 | The first 200 tokens of the page contain a direct answer | 20 |
| F3 | Each H2 section opens with an answer in the 40 to 60 word band | 20 |
| F4 | Share of H2/H3 headings phrased as questions a user would type | 20 |
| F5 | An FAQ section exists at the article footer | 10 |

A score of 75 or above lands in the EXTRACTABLE band. 40 to 74 is PARTIALLY-EXTRACTABLE. Below 40 is NOT-EXTRACTABLE. The bands come from the AI Visibility Readiness framework I maintain, but the five checks themselves are engine-agnostic: they encode how retrieval-augmented systems chunk pages by heading, embed the chunks, and lift the opening sentences of whichever chunk matches the query.

The critical detail for this tutorial: **the audit counts every `<h1>`, `<h2>`, and `<h3>` in your rendered DOM.** Not the headings you wrote in your CMS. The headings your component library emits. That gap is where my six invisible failures lived.

::: note Prerequisites

- A live website you can measure and deploy (Any stack. My examples are SvelteKit, and every fix translates to React, Vue, or plain HTML.)
- Python 3.10+ with `requests` and `beautifulsoup4` (`pip install requests beautifulsoup4`)
- Access to your search console data (Google Search Console or Bing Webmaster Tools) to pick pages
- A CI system (the example uses GitHub Actions)
- About 90 minutes: 20 for the audit, 40 for the fix, 30 for the CI gate

:::

---

## Step 1: Pick the Pages Worth Auditing

Don't audit your whole sitemap. Audit the pages that already have distribution, because extraction fixes multiply whatever retrieval you already earn.

Open Google Search Console, go to Performance, sort pages by impressions over the last 28 days, and look at where your distribution actually lives.

Here's the top of my own report from that export (July 21):

| Page | Impressions (28d) | Clicks | Avg position |
| --- | --- | --- | --- |
| /blog/claude-fable-5-vs-opus-4-8 | 17,315 | 462 | 6.2 |
| /blog/how-i-built-polymarket-trading-bot | 13,649 | 104 | 7.6 |
| /blog/claude-code-production-trading-bot | 6,540 | 94 | 8.5 |
| /blog/aeo-answer-engine-optimization-explained | 4,189 | 1 | 8.2 |

Individual posts dominate the impressions, but notice what every one of those posts has in common: they're all rendered by the same layout and card components.

Fixing a component fixes every page that uses it at once, which is why I scoped the audit to the top 3 to 5 **content-index pages** instead of individual posts: the homepage, your blog index, your topic or category hubs.

Index pages are assembled almost entirely from repeating cards, so they show component damage in its most concentrated form, and any fix propagates to everything else.

I chose these three:

- `chudi.dev/` (the homepage)
- `chudi.dev/blog` (the writing index)
- `chudi.dev/topics` (the topic hub)

::: note Artifact check

you should now have a written list of 3 to 5 URLs. That list is the audit's scope.

:::

---

## Step 2: Run the Five Checks

You can score the five checks with about 60 lines of Python. This is a deliberately minimal version of the auditor I run in production. It implements the two checks that catch component damage (F3 and F4) plus a full heading census, which is enough to find the class of bug this tutorial fixes.

```py :collapsed-lines
import re
import sys
import requests
from bs4 import BeautifulSoup

QUESTION = re.compile(
    r"^\s*(what|how|why|when|where|who|which|is|are|can|do|does|should|will|did)\b|\?\s*$",
    re.IGNORECASE,
)

def audit(url):
    html = requests.get(url, timeout=8, headers={"User-Agent": "extract-audit/1.0"}).text
    soup = BeautifulSoup(html, "html.parser")

    headings = [(h.name, " ".join(h.get_text().split())) for h in soup.find_all(["h1", "h2", "h3"])]
    subheads = [(n, t) for n, t in headings if n in ("h2", "h3")]

    question_rate = (
        sum(1 for _, t in subheads if QUESTION.search(t)) / len(subheads) if subheads else 0.0
    )

    in_band = 0
    h2s = soup.find_all("h2")
    for h2 in h2s:
        first_p = h2.find_next("p")
        words = len(first_p.get_text().split()) if first_p else 0
        if 40 <= words <= 60:
            in_band += 1

    print(f"URL: {url}")
    print(f"Heading census ({len(headings)} total):")
    for name, text in headings:
        print(f"  <{name}> {text[:70]}")
    print(f"F4 question-format rate: {question_rate:.1%} (target >= 50%)")
    print(f"F3 sections opening in the 40-60 word band: {in_band}/{len(h2s)}")

if __name__ == "__main__":
    audit(sys.argv[1])
```

Run it against each page on your list:

```sh
python3 extract_audit.py https://yoursite.com/
```

The heading census is the part to stare at. It prints every H1/H2/H3 a parser sees, in order, which is frequently not the outline you think you published.

If you want the full five-check scored version with the weighted 0 to 100 composite, the [<VPIcon icon="fas fa-globe"/>automated audit on citability.dev](https://citability.dev) runs all five checks plus retrieval and attribution layers. The manual version above is enough to complete this tutorial.

::: note Artifact check

a terminal output per page showing the heading census, the F4 rate, and the F3 band count. Screenshot it. It is your before-state.

:::

---

## Step 3: Read Your Failure Classes

Here's what the audit said about my homepage before the fix, pulled from the commit record of the remediation (2026-05-23):

- Score: **65/100, PARTIALLY-EXTRACTABLE**, ten points under the threshold
- F4 question-format rate: **26.7%**, far below the 50% pass line
- Cause: more than ten headings in the census that I never wrote as headings

The census made the cause obvious. Alongside the section headings I had deliberately tuned ("How do I see it run live?", "What is the retrieval header?") sat a pile of statements like blog post titles and project names, each wrapped in `<h2>` or `<h3>`. I hadn't typed a single one of them into a heading field. My card components had.

This is the general lesson, and it is worth stating as a rule:

**The denominator is the design problem.** Every heading your components emit joins the denominator of every ratio check an extraction parser runs. Ten card titles as H3s means your carefully tuned question headings are outvoted 10 to 4 by markup you never see.

Failure classes map to fixes like this:

| Symptom in the census | Failure class | Fix (Step) |
| --- | --- | --- |
| Headings you never wrote, repeated in card-sized clusters | Component-emitted headings | Steps 4 and 5 |
| Your own H2s are statements, not questions | Authored heading style | Rephrase to question form |
| Sections open with a 15-word teaser or a 120-word ramble | Answer-band miss | Densify openers to 40 to 60 words |
| No FAQ block | Missing F5 surface | Add one at the footer |

I had all four classes across my three pages. The component class was the biggest single scorer, and it's the one nobody catches by reading their CMS, so it gets the deep treatment here. (For the record, the authored fixes on my other pages were exactly what the table says: two H2s on my framework page rephrased into question form, and a topic-hub opener expanded from 37 words to roughly 50 to enter the answer band.)

::: note Artifact check

Your census annotated with the four failure classes. Count how many headings you didn't author.

:::

---

## Step 4: Find the Components Emitting Fake Headings

The census tells you fake headings exist. Your component library tells you where they come from. Grep for heading tags inside your component directory, not your content:

```sh
grep -rn "<h[23]" src/lib/components/ --include="*.svelte"
```

(React: `grep -rn "<h[23]" src/components/ --include="*.tsx"`. Vue: same idea with `.vue`.)

On my site, this surfaced six heading sites across five components:

| Component | Emitted | Instances |
| --- | --- | --- |
| `BlogCard.svelte` | `<h3>` post title | 2 |
| `BlogCardFeatured.svelte` | `<h2>` post title | 1 |
| `ProductCard.svelte` | `<h3>` product name | 1 |
| `ProjectCard.svelte` | `<h2>` project name | 1 |
| `JourneyCard.svelte` | `<h2>` milestone title | 1 |

Six tags doesn't sound like much until you remember that cards repeat. One blog index rendering ten `BlogCard` instances injects ten `<h3>` statements into that page's census. Every card-built page on the site inherits the same dilution, which is exactly why my content-index pages scored worst.

Why do component libraries do this? Because a card title *looks* like a heading, and because accessibility guidance rightly encourages semantic HTML.

The mistake is subtler: a card title is a **link label into another document**, not a section heading of **this** document. The page's real outline is "here are my featured posts", not the title of each post teased below it. HTML has no tag for "title of a different page", so components default to H2/H3, and every parser that walks the page inherits a false outline.

::: note Artifact check

A table like the one above: component, tag emitted, instance count. This is your fix list.

:::

---

## Step 5: Demote the Headings Without Breaking Accessibility

The obvious fix, swapping `<h3>` for a styled `<span>` or `<p>`, has a real cost: screen reader users navigate by heading structure, and card titles are genuinely useful landmarks when scanning a list of posts. Deleting the semantics entirely trades an AI-extraction win for an accessibility loss. That trade isn't necessary.

The fix that preserves both is **ARIA heading demotion**: replace the literal tag with a paragraph carrying `role="heading"` and an explicit `aria-level`.

One important clarification before the diff: the first rule of ARIA is to prefer native HTML elements, and this fix doesn't violate it. The rule applies when the text genuinely is a heading of the current document, and the whole point of Step 4 was establishing that card titles are not. They are link labels into other documents.

Native `<h3>` was the wrong semantics, while the ARIA role is a courtesy that keeps the list-scanning navigation screen reader users already rely on.

Here's the actual diff from my `BlogCard.svelte`, unchanged except for wrapping:

```diff
-<h3 class="text-[20px] md:text-[22px] font-bold leading-snug
+<p role="heading" aria-level="3" class="text-[20px] md:text-[22px] font-bold leading-snug
   text-[var(--color-text-primary)]
   group-hover:text-[var(--color-primary)]
   transition-colors line-clamp-2">
   {post.title}
-</h3>
+</p>
```

What changes and what does not:

- **Assistive technology sees the same outline.** `role="heading"` plus `aria-level="3"` is the ARIA-standard equivalent of an `<h3>`. Screen readers that navigate by heading still stop here and still announce the level.
- **Visual styling is untouched.** Every class stays on the element. Zero pixels move.
- **Content is untouched.** The fix removes zero words. This matters because most extraction advice tells you to rewrite. But this class of bug needs no rewriting.
- **HTML-tag parsers stop counting it.** Extraction pipelines chunk by literal `h1`/`h2`/`h3` elements. The card title exits the census, your authored headings get the denominator back, and the ratios you tuned start passing.

Apply the same one-line change at every site on your Step 4 fix list. Mine was one commit touching five components, six occurrences.

Then redeploy and re-run the Step 2 audit. My homepage went from 65 to **100/100 EXTRACTABLE** on the post-deploy re-score, with the question-format rate recovering from 26.7% to above the 50% threshold, because the four question headings I had authored were finally the only H2/H3 population on the page.

::: note Artifact check

the after-audit terminal output next to your before screenshot. The heading census should now contain only headings you wrote on purpose.

:::

---

## Step 6: Gate the Fix in CI

Here's the uncomfortable truth about extraction scores: they drift. Content changes, components get added, or a redesign ships a new card.

My homepage, re-audited live while writing this tutorial (July 21), sits at 80: still EXTRACTABLE, but down from its post-fix 100, because a homepage redesign in the intervening weeks changed the section structure again. The blog index and topic hub both still score 100. That drift is why the durable deliverable of this tutorial isn't the fix. It's the regression gate. Without one, the next well-meaning component ships a new `<h2>` and your score quietly decays. Nothing visible breaks, so nothing gets caught in review.

Mine runs as a GitHub Actions workflow triggered by every successful production deployment, and hard-fails if any audited URL drops out of the EXTRACTABLE band:

```yaml
name: Post-Deploy Extractability Audit

on:
  deployment_status:

jobs:
  audit:
    if: |
      github.event.deployment_status.state == 'success' &&
      github.event.deployment.environment == 'Production'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.13"
      - run: pip install requests beautifulsoup4
      - name: Audit extractability on the live URLs
        run: |
          for url in "https://yoursite.com/" "https://yoursite.com/blog"; do
            python3 scripts/extract_audit.py "$url" --min-score 75 || exit 1
          done
```

To make the minimal auditor CI-ready, add a `--min-score` flag that exits nonzero below the threshold. That's a five-line change to the Step 2 script (compute the weighted score from the checks you implement, compare, `sys.exit(1)`).

The production version of my gate audits five URLs and stacks Lighthouse accessibility thresholds into the same workflow, so the ARIA-demotion contract from Step 5 is enforced from both directions: extraction can't regress below 75, and accessibility can't regress below 95. That pairing is the whole point. The two constraints keep each other honest.

::: note Artifact check

a CI run in your Actions tab that fails when you feed it `--min-score 101` (proving it can fail) and passes at 75.

:::

---

## What Actually Moved

![Bar chart of the chudi.dev homepage extractability score at three points: 65 before the May 2026 heading fix, 100 on the post-deploy re-score, and 80 on the July 21 live re-audit. A dashed line marks the extractable threshold at 75.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/f1d4463a-5517-4642-b69a-5401ae46e68d.png)

The scoreboard for my three pages, all numbers from the same instrument:

| Page | Before fix (May) | After fix | Live re-audit (July 21) |
| --- | --- | --- | --- |
| Homepage | 65 PARTIALLY-EXTRACTABLE | 100 EXTRACTABLE | 80 EXTRACTABLE |
| Blog index | below threshold | 100 EXTRACTABLE | 100 EXTRACTABLE |
| Topic hub | below threshold | 100 EXTRACTABLE | 100 EXTRACTABLE |

![Bing Webmaster Tools AI Performance dashboard showing 1,600 total AI citations across 33 cited pages for chudi.dev over the 90 days ending July 19, 2026.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/793015f2-359e-497a-b18b-4238999aa83e.png)

And the downstream metric the audit exists to serve: Bing Webmaster Tools' AI Performance report (the only first-party AI citation dashboard that currently exists. You'll find it in your BWT property under Search Performance) shows my site earning **1,600 AI citations across 33 pages in the 90 days ending July 19**, from Microsoft Copilot and partner assistants. That number was 671 in late April, around when this remediation arc started, and roughly 1,500 by late June.

A note on causality, because this is where AI-visibility content usually oversells: the citation growth is correlated with the extraction work, not cleanly attributed to it. Over the same window, I also shipped content, fixed retrieval issues, and grew regular search traffic.

What I can defend: the audit scores are fully causal (the same instrument, before and after, moved because of one commit), the mechanism is documented engine behavior (heading-based chunking), and the citations kept compounding after the fix. What I can't give you is a controlled experiment isolating six heading tags. Nobody really can.

---

## What I Rejected, and Why

Selection bias is the failure mode of tutorials like this one, so here's what I considered and didn't do:

- **Rewriting the page copy:** This is standard extraction advice. But I rejected it because the census showed a structural problem, not a prose problem. My authored sections already passed. Rewriting would have burned days and muddied the measurement.
- **Plain** `<span>`**/**`<p>` **demotion without ARIA:** Two fewer attributes per element. I rejected this because it deletes real navigation structure for screen reader users. The audit wouldn't have noticed the difference, but people would've.
- **Stuffing FAQ schema on every page:** F5 is worth 10 points and JSON-LD is cheap. I rejected this as the *first* move because it treats the symptom with metadata while leaving the false outline in place. Schema asserts what your page means but the DOM is what gets chunked. Fix the DOM first.
- **Auditing every page on the sitemap:** Completeness is seductive. I rejected this because extraction fixes multiply retrieval, and most pages have little retrieval to multiply. Three index pages covered the highest-impression surfaces and every card component in one pass.
- **Chasing a 100 score as a standing target:** After watching my homepage drift from 100 to 80 through an unrelated redesign while staying comfortably in the EXTRACTABLE band, I set the CI gate at the 75 threshold, not at 100. Gating at perfection turns every content experiment into a CI failure and teaches your team to ignore the gate.

---

## FAQ

::: details Does demoting headings hurt my regular SEO?

The headings that matter for search are the ones describing your document's own structure, and those stay untouched. What you're removing is markup that claimed *other documents'* titles as your outline.

My organic search impressions grew over the months following the fix. Nothing in Google's guidance requires card titles to be heading elements.

:::

::: details Is this just gaming one audit script?

The five checks encode how retrieval-augmented systems actually process pages: chunk by heading, embed chunks, and lift opening sentences of matching chunks. A false outline degrades that pipeline no matter whose script measures it. You're not optimizing for my auditor. Instead, you're fixing the DOM that every parser sees. The score is a proxy, which is exactly why Step 6 gates the band, not the number.

:::

::: details I use React or Vue, not Svelte. Does anything change?

Nothing structural. The bug lives in JSX and SFC templates identically (`<h3>{title}</h3>` inside a `Card.tsx`), the grep in Step 4 finds it, and `role="heading"` with `aria-level` works in every framework because it's plain HTML.

:::

::: details What about the headings inside my actual articles?

Leave them as real `<h2>`/`<h3>` elements. Article body headings are your document's structure and they're precisely what should be in the census. The demotion pattern applies only to components that surface *other* pages' titles: cards, teasers, related-post widgets, and navigation panels.

:::

::: details How often should I re-audit?

Continuously, which is what Step 6 buys you: the CI gate re-audits on every production deployment, so you never re-audit by hand again.

If you skip the gate, run the Step 2 script monthly and after any change to layout components, navigation, or templates. Content edits inside a page rarely move the score much. Component and template changes are what reshape the census, and those are exactly the changes nobody thinks to re-measure. My own 100 to 80 homepage drift came from a redesign, not from writing.

:::

::: details My score is low but I have no card components. Now what?

Then your failure class is authored, not structural: statement headings (rephrase into questions users type), openers outside the 40 to 60 word band (densify), or a missing FAQ block (add one). The census from Step 2 tells you which. The fixes are writing work rather than component work.

:::

---

## What You Accomplished

You measured a property of your site most owners have never seen: the heading census your components actually emit, and the extractability score it produces.

You traced low scores to the specific components responsible, applied a demotion pattern that satisfies extraction parsers and screen readers simultaneously, and wired a CI gate so the score can never silently regress again.

The wider context, from the first two guides in this series: [**measuring your AI citation rate across engines**](/freecodecamp.org/how-to-measure-your-ai-citation-rate-across-chatgpt-perplexity-and-claude.md) tells you whether you're being cited, and [**shipping an agent-facing surface with WebMCP**](/freecodecamp.org/a-developers-guide-to-webmcp.md) prepares your site for agents that act rather than read.

This tutorial closes the loop in the middle: making the content you already have liftable. Retrieval determines whether engines see you, attribution determines whether they name you, and extraction, the stage you just audited, determines whether there's anything clean enough to quote.

Run the census on your top three pages this week. If your components are voting in your outline, you now know how to take the vote back.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run an AI Extractability Audit on Your Site (I Found 6 Heading Tags That Cost Me Citations)",
  "desc": "When an AI assistant answers a question, it lifts sentences from a handful of pages and cites them. Whether your page is liftable is not a mystery or a vibe. It's a set of mechanical properties of you",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-an-ai-extractability-audit.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
