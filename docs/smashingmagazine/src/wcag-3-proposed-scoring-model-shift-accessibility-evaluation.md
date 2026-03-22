---
lang: en-US
title: "WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation"
description: "Article(s) > WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation"
    - property: og:description
      content: "WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/wcag-3-proposed-scoring-model-shift-accessibility-evaluation.html
prev: /academics/system-design/articles/README.md
date: 2025-05-02
isOriginal: false
author:
  - name: Mikhail Prosmitskiy
    url: https://smashingmagazine.com/author/mikhail-prosmitskiy/
cover: https://files.smashing.media/articles/wcag-3-proposed-scoring-model-shift-accessibility-evaluation/wcag-3-proposed-scoring-model-shift-accessibility-evaluation.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation"
  desc="WCAG is evolving. Since 1999, the Web Content Accessibility Guidelines have defined accessibility in binary terms: either a success criterion is met or not. But real user experience is rarely that simple. WCAG 3.0 rethinks the model — prioritizing usability over compliance and shifting the focus toward the quality of access rather than the mere presence of features. Could this be the start of a new era in accessibility?"
  url="https://smashingmagazine.com/2025/05/wcag-3-proposed-scoring-model-shift-accessibility-evaluation/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/wcag-3-proposed-scoring-model-shift-accessibility-evaluation/wcag-3-proposed-scoring-model-shift-accessibility-evaluation.jpg"/>

WCAG is evolving. Since 1999, the Web Content Accessibility Guidelines have defined accessibility in binary terms: either a success criterion is met or not. But real user experience is rarely that simple. WCAG 3.0 rethinks the model — prioritizing usability over compliance and shifting the focus toward the quality of access rather than the mere presence of features. Could this be the start of a new era in accessibility?

Since their introduction in [<VPIcon icon="iconfont icon-w3c"/>1999](https://w3.org/TR/WAI-WEBCONTENT/), the [<VPIcon icon="iconfont icon-w3c"/>Web Content Accessibility Guidelines](https://w3.org/WAI/standards-guidelines/wcag/) (WCAG) have shaped how we design and develop inclusive digital products. The WCAG 2.x series, released in [<VPIcon icon="iconfont icon-w3c"/>2008](https://w3.org/TR/WCAG20/), introduced clear technical criteria judged in a binary way: either a success criterion is met or not. While this model has supported regulatory clarity and auditability, its **“all-or-nothing” nature** often fails to reflect the nuance of actual user experience (UX).

Over time, that disconnect between technical conformance and lived usability has become harder to ignore. People engage with digital systems in complex, often nonlinear ways: navigating multistep flows, dynamic content, and interactive states. In these scenarios, checking whether an element passes a rule doesn’t always answer the main question: can someone actually use it?

[<VPIcon icon="iconfont icon-w3c"/>WCAG 3.0](https://w3.org/WAI/standards-guidelines/wcag/wcag3-intro/) is still in [<VPIcon icon="iconfont icon-w3c"/>draft](https://w3.org/TR/wcag-3.0/#sotd), but is evolving — and it represents a [<VPIcon icon="iconfont icon-w3c"/>fundamental rethinking](https://w3.org/TR/wcag-3.0/#about-wcag-3-0) of how we evaluate accessibility. Rather than asking whether a requirement is technically met, it asks how well users with disabilities can complete meaningful tasks. Its new outcome-based model introduces a [<VPIcon icon="iconfont icon-w3c"/>flexible scoring system](https://w3.org/TR/wcag-3.0-explainer/#additional-concepts) that **prioritizes usability over compliance**, shifting focus toward the quality of access rather than the mere presence of features.

---

## Draft Status: Ambitious, But Still Evolving

WCAG 3.0 was first introduced as a public working draft by the [<VPIcon icon="iconfont icon-w3c"/>World Wide Web Consortium](https://w3.org/) (W3C) [<VPIcon icon="iconfont icon-w3c"/>Accessibility Guidelines Working Group](https://w3.org/WAI/about/groups/agwg/) in early [<VPIcon icon="iconfont icon-w3c"/>2021](https://w3.org/TR/2021/WD-wcag-3.0-20210121/). The draft is still under active development and is not expected to reach [<VPIcon icon="iconfont icon-w3c"/>W3C Recommendation status](https://w3.org/standards/about/#what-are-web-standards) for [<VPIcon icon="iconfont icon-w3c"/>several years, if not decades](https://w3.org/WAI/standards-guidelines/wcag/wcag3-intro/#timeline), by some accounts. This extended timeline reflects both the complexity of the task and the ambition behind it:

> WCAG 3.0 isn’t just an update — it’s a paradigm shift.

Unlike WCAG 2.x, which focused primarily on web pages, WCAG 3.0 aims to cover a much [<VPIcon icon="iconfont icon-w3c"/>broader ecosystem](https://w3.org/TR/wcag-3.0-requirements/#wcag-3-0-scope), including applications, tools, connected devices, and emerging interfaces like voice interaction and extended reality. It also [<VPIcon icon="iconfont icon-w3c"/>rebrands itself](https://w3.org/WAI/standards-guidelines/wcag/wcag3-intro/#wcag-3-name) as the W3C Accessibility Guidelines (while the WCAG acronym remains the same), signaling that **accessibility is no longer a niche concern** — it’s a baseline expectation across the digital world.

Importantly, WCAG 3.0 [<VPIcon icon="iconfont icon-w3c"/>will not immediately replace 2.x](https://w3.org/TR/wcag-3.0-explainer/#intro). Both standards will coexist, and conformance to WCAG 2.2 will continue to be valid and necessary for some time, especially in legal and policy contexts.

This expansion isn’t just technical.

::: info From Twitter (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

> WCAG 3.0 reflects a deeper philosophical shift: accessibility is moving from a model of compliance toward a model of effectiveness.

:::

Rules alone can’t capture whether a system truly works for someone. That’s why WCAG 3.0 leans into **flexibility** and **future-proofing**, aiming to support evolving technologies and real-world use over time. It formalizes a principle long understood by practitioners:

> Inclusive design isn’t about passing a test; it’s about enabling people.

---

## A New Structure: From Success Criteria To Outcomes And Methods

WCAG 2.x is structured around [<VPIcon icon="iconfont icon-w3c"/>four foundational principles](https://w3.org/WAI/fundamentals/accessibility-principles/) — Perceivable, Operable, Understandable, and Robust (aka POUR) — and testable success criteria organized into [<VPIcon icon="iconfont icon-w3c"/>three conformance levels](https://w3.org/WAI/WCAG22/Understanding/conformance#levels) (A, AA, AAA). While technically precise, these criteria often emphasize implementation over impact.

WCAG 3.0 [<VPIcon icon="iconfont icon-w3c"/>reorients this structure](https://w3.org/TR/wcag-3.0/#conformance-0) toward user needs and real outcomes. Its hierarchy is built on:

- [<VPIcon icon="iconfont icon-w3c"/>Guidelines](https://w3.org/TR/wcag-3.0/#guidelines): High-level accessibility goals tied to specific user needs.
- [<VPIcon icon="iconfont icon-w3c"/>Outcomes](https://w3.org/TR/wcag-3.0-explainer/#guidelines): Testable, user-centered statements (e.g., “Users have alternatives for time-based media”).
- [<VPIcon icon="iconfont icon-w3c"/>Methods](https://w3.org/TR/wcag-3.0-explainer/#requirements-and-methods): Technology-specific or agnostic techniques that help achieve the outcomes, including code examples and test instructions.
- [<VPIcon icon="iconfont icon-w3c"/>How-To Guides](https://w3.org/TR/wcag-3.0-explainer/#structure): Narrative documentation that provides practical advice, user context, and design considerations.

This shift is more than organizational. It reflects a deeper commitment to aligning technical implementation with UX. Outcomes speak [<VPIcon icon="iconfont icon-w3c"/>the language of capability](https://w3.org/TR/wcag-3.0-requirements/#readability), which is about what users should be able to do (rather than just technical presence).

Crucially, outcomes are also where conformance scoring begins to take shape. For example, imagine a checkout flow on an e-commerce website. Under WCAG 2.x, if even one field in the checkout form lacks a label, [<VPIcon icon="iconfont icon-w3c"/>the process may fail AA conformance entirely](https://w3.org/WAI/WCAG22/Understanding/info-and-relationships.html). However, under WCAG 3.0, that same flow might be evaluated [<VPIcon icon="iconfont icon-w3c"/>across multiple outcomes](https://w3.org/TR/wcag-3.0-explainer/#conformance-models) (such as keyboard navigation, form labeling, focus management, and error handling), with each outcome receiving a separate score. If most areas score well but the error messaging is poor, the overall rating might be “Good” instead of “Excellent”, prompting targeted improvements without negating the entire flow’s accessibility.

---

## From Binary Checks To Graded Scores

Rather than relying on pass or fail outcomes, WCAG 3.0 [<VPIcon icon="iconfont icon-w3c"/>introduces a scoring model](https://w3.org/TR/wcag-3.0-explainer/#additional-concepts) that reflects how well accessibility is supported. This shift allows teams to **recognize partial successes** and prioritize real improvements.

### How Scoring Works

Each outcome in WCAG 3.0 is evaluated through [<VPIcon icon="iconfont icon-w3c"/>one or more atomic tests](https://w3.org/TR/wcag-3.0-explainer/#types-of-tests). These can include the following:

- **Binary tests**: “Yes” and “no” outcomes (e.g., does every image have alternative text?)
- **Percentage-based tests**: Coverage-based scoring (e.g., what percentage of form fields have labels?)
- **Qualitative tests**: Rated judgments based on criteria (e.g., how descriptive is the alternative text?)

The result of these tests produces a score for each outcome, often normalized on a 0-4 or 0-5 scale, with labels like Poor, Fair, Good, and Excellent. These scores are then aggregated across functional categories (vision, mobility, cognition, etc.) and user flows.

This allows teams to measure progress, not just compliance. A product that improves from “Fair” to “Good” over time shows real **evolution** — [<VPIcon icon="iconfont icon-w3c"/>a concept](https://w3.org/TR/wcag-3.0-requirements/#broad-disability-support) that doesn’t exist in WCAG 2.x.

### Critical Errors: A Balancing Mechanism

To ensure that severity still matters, WCAG 3.0 introduces [<VPIcon icon="iconfont icon-w3c"/>critical errors](https://w3.org/TR/wcag-3.0-explainer/#additional-concepts), which are high-impact accessibility failures that can override an otherwise positive score.

For example, consider a checkout flow. Under WCAG 2.x, a single missing label might cause the entire flow to fail conformance. WCAG 3.0, however, evaluates multiple outcomes — like form labeling, keyboard access, and error handling — each with its own score. Minor issues, such as unclear error messages or a missing label on an optional field, might lower the rating from “Excellent” to “Good”, without invalidating the entire experience.

But if a user cannot complete a core action, like submitting the form, making a purchase, or logging in, that constitutes a **critical error**. These failures directly block task completion and significantly reduce the overall score, regardless of how polished the rest of the experience is.

On the other hand, problems with non-essential features — like uploading a profile picture or changing a theme color — are considered lower-impact and won’t weigh as heavily in the evaluation.

---

## Conformance Levels: Bronze, Silver, Gold

In place of categorizing conformance in tiers of Level A, Level AA, and Level AAA, WCAG 3.0 proposes [<VPIcon icon="iconfont icon-w3c"/>three different conformance tiers](https://w3.org/TR/wcag-3.0-explainer/#additional-concepts):

- **Bronze**: The new minimum. It is [<VPIcon icon="iconfont icon-w3c"/>comparable to WCAG 2.2 Level AA](https://w3.org/TR/wcag-3.0-explainer/#conformance-models), but based on scoring and foundational outcomes. The requirements are considered achievable via automated and guided manual testing.
- **Silver**: This is a higher standard, requiring broader coverage, higher scores, and [<VPIcon icon="iconfont icon-w3c"/>usability validation from people with disabilities](https://w3.org/TR/wcag-3.0-requirements/#design_principles).
- **Gold**: The highest tier. Represents exemplary accessibility, likely requiring inclusive design processes, innovation, and extensive user involvement.

Unlike in WCAG 2.2, where Level AAA is often seen as aspirational and inconsistent, these levels are intended to **incentivize progression**. They can also [<VPIcon icon="iconfont icon-w3c"/>be scoped](https://w3.org/TR/wcag-3.0/#defining-conformance-scope) in the sense that teams can claim conformance for a checkout flow, mobile app, or specific feature, allowing iterative improvement.

---

## What You Should Do Now

While WCAG 3.0 is still being developed, its direction is clear. That said, it’s important to acknowledge that the guidelines are not expected to be finalized in a few years. Here’s how teams can prepare:

- **Continue pursuing WCAG 2.2 Level AA.** [<VPIcon icon="iconfont icon-w3c"/>It remains](https://w3.org/TR/wcag-3.0/#about-wcag-3-0) the most robust, recognized standard.
- [<VPIcon icon="iconfont icon-w3c"/>Familiarize yourself](https://w3.org/TR/wcag-3.0-explainer/#abstract) **with WCAG 3.0 drafts**, especially the outcomes and scoring model.
- [<VPIcon icon="iconfont icon-w3c"/>Start thinking in outcomes.](https://w3.org/TR/wcag-3.0-requirements/#oppotunities_usability) Focus on what users need to accomplish, not just what features are present.
- **Embed accessibility into workflows.** Shift left. Don’t test at the end — design and build with access in mind.
- [<VPIcon icon="iconfont icon-w3c"/>Involve](https://w3.org/TR/wcag-3.0-requirements/#design_principles) **users** with disabilities early and regularly.

These practices won’t just make your product more inclusive; they’ll position your team to excel under WCAG 3.0. ---

## Potential Downsides

Even though WCAG 3.0 presents a bold step toward more **holistic accessibility**, several structural risks deserve early attention, especially for organizations navigating regulation, scaling design systems, or building sustainable accessibility practices. Importantly, many of these risks are interconnected: challenges in one area may amplify issues in others.

### Subjective Scoring

The move from binary pass or fail criteria to scored evaluations introduces room for **subjective interpretation**. Without standardized calibration, the same user flow might receive different scores depending on the evaluator. This makes comparability and repeatability harder, particularly in procurement or multi-vendor environments. A simple alternative text might be rated as “adequate” by one team and “unclear” by another.

### Reduced Compliance Clarity

That same subjectivity leads to a second concern: **the erosion of clear compliance thresholds**. Scored evaluations replace the binary clarity of “compliant” or “not” with a more flexible, but less definitive, outcome. This could complicate legal enforcement, contractual definitions, and audit reporting. In practice, a product might earn a “Good” rating while still presenting critical usability gaps for certain users, creating a disconnect between score and actual access.

### Legal and Policy Misalignment

As clarity around compliance blurs, so does alignment with existing legal frameworks. Many current laws explicitly reference WCAG 2.x and its A, AA, and AAA levels (e.g. [<VPIcon icon="fas fa-globe"/>Section 508 of the Rehabilitation Act of 1973](https://section508.gov/manage/laws-and-policies/), [<VPIcon icon="fas fa-globe"/>European Accessibility Act](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en), [<VPIcon icon="fas fa-globe"/>The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018](https://gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)).

Until WCAG 3.0 is formally mapped to those standards, its use in regulated contexts may introduce risk. Teams operating in healthcare, finance, or public sectors will likely need to maintain dual conformance strategies in the interim, increasing cost and complexity.

### Risk Of Minimum Viable Accessibility

Perhaps most concerning, this ambiguity can set the stage for a “minimum viable accessibility” mindset. Scored models risk encouraging “Bronze is good enough” thinking, particularly in deadline-driven environments. A team might deprioritize improvements once they reach a passing grade, even if essential barriers remain.

For example, a mobile app with strong keyboard support but missing audio transcripts could still achieve a passing tier, leaving some users excluded.

---

## Conclusion

WCAG 3.0 marks a **new era in accessibility** — one that better reflects the diversity and complexity of real users. By shifting from checklists to scored evaluations and from rigid technical compliance to [<VPIcon icon="iconfont icon-w3c"/>practical usability](https://w3.org/TR/wcag-3.0-requirements/#broad-disability-support), it encourages teams to prioritize real-world impact over theoretical perfection.

As one might say, *“It’s not about the score. It’s about who can use the product.”* In my own experience, I’ve seen teams pour hours into fixing minor color contrast issues while overlooking broken keyboard navigation, leaving screen reader users unable to complete essential tasks. WCAG 3.0’s focus on outcomes reminds us that accessibility is fundamentally about [<VPIcon icon="iconfont icon-w3c"/>functionality and inclusion](https://w3.org/TR/wcag-3.0-explainer/#goals).

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

> At the same time, WCAG 3.0’s proposed scoring models introduce new responsibilities. Without clear calibration, stronger enforcement patterns, and a cultural shift away from “good enough,” we risk losing the very clarity that made WCAG 2.x enforceable and actionable. The promise of flexibility only works if we use it to aim higher, not to settle earlier.

:::

For teams across design, development, and product leadership, this shift is a chance to rethink what success means. Accessibility isn’t about ticking boxes — it’s about enabling people.

By preparing now, being mindful of the risks, and focusing on user outcomes, we don’t just get ahead of WCAG 3.0 — we build digital experiences that are truly usable, sustainable, and inclusive.

::: info Further Reading On SmashingMag

- “[**A Roundup Of WCAG 2.2 Explainers**](/smashingmagazine.com/roundup-wcag-explainers.md),” Geoff Graham
- “[**Getting To The Bottom Of Minimum WCAG-Conformant Interactive Element Size**](/smashingmagazine.com/getting-bottom-minimum-wcag-conformant-interactive-element-size.md),” Eric Bailey
- “[**How To Make A Strong Case For Accessibility**](/smashingmagazine.com/how-make-strong-case-accessibility.md),” Vitaly Friedman
- “[**A Designer’s Accessibility Advocacy Toolkit**](/smashingmagazine.com/web-designer-accessibility-advocacy-toolkit.md),” Yichan Wang

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "WCAG 3.0’s Proposed Scoring Model: A Shift In Accessibility Evaluation",
  "desc": "WCAG is evolving. Since 1999, the Web Content Accessibility Guidelines have defined accessibility in binary terms: either a success criterion is met or not. But real user experience is rarely that simple. WCAG 3.0 rethinks the model — prioritizing usability over compliance and shifting the focus toward the quality of access rather than the mere presence of features. Could this be the start of a new era in accessibility?",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/wcag-3-proposed-scoring-model-shift-accessibility-evaluation.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
