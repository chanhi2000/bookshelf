---
lang: en-US
title: "Generative UI Notes"
description: "Article(s) > Generative UI Notes"
icon: fa-brands fa-css3-alt
category:
  - AI
  - LLM
  - Design
  - System
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Generative UI Notes"
    - property: og:description
      content: "Generative UI Notes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/generative-ui-notes.html
prev: /programming/css/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/toolset.webp
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
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Generative UI Notes"
  desc="Looking at research and experiments that are designed to automatically generate user interfaces based on user preferences."
  url="https://css-tricks.com/generative-ui-notes"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/toolset.webp"/>

I’m really interested in this emerging idea that the future of web design is **Generative UI Design**. We see hints of this already in products, like [<VPIcon icon="fa-brands fa-figma"/>Figma Sites](https://figma.com/sites/), that tout being able to create websites on the fly with prompts.

Putting aside the clear downsides of [**shipping half-baked technology as a production-ready product**](/adrianroselli.com/do-not-publish-your-designs-on-the-web-with-figma-sites.md) (which is hard to do), the angle I’m particularly looking at is research aimed at using Generative AI (or GenAI) to output personalized interfaces. It’s wild because it completely flips the way we think about UI design on its head. Rather than anticipating user needs and designing around them, GenAI sees the user needs and produces an interface custom-tailored to them. In a sense, a website becomes a snowflake where no two experiences with it are the same.

Again, it’s wild. I’m not here to speculate, opine, or preach on Generative UI Design (let’s call it GenUI for now). Just loose notes that I’ll update as I continue learning about it.

---

## Defining GenUI

::: info Google Research (<VPIcon icon="fa-brands fa-google"/><code>generativeui.github.io</code>)

> Generative UI is a new modality where the AI model generates not only content, but the entire user experience. This results in custom interactive experiences, including rich formatting, images, maps, audio and even simulations and games, in response to any prompt (instead of the widely adopted “walls-of-text”).

<PDF url="https://generativeui.github.io/static/pdfs/paper.pdf"/>

:::

::: info NN/Group (<VPIcon icon="fas fa-globe"/><code>nngroup.com</code>)

> A **generative UI** (genUI) is a user interface that is dynamically generated in real time by artificial intelligence to provide an experience customized to fit the user’s needs and context.

<SiteInfo
  name="Generative UI and Outcome-Oriented Design"
  desc="GenUI promises highly personalized interfaces — a move from designing for many to tailoring for the individual."
  url="https://nngroup.com/articles/generative-ui//"
  logo="https://media.nngroup.com/static/img/favicon.ico"
  preview="https://media.nngroup.com/media/articles/opengraph_images/GenUI-33.png"/>

:::

::: info UX Collective (<VPIcon icon="fas fa-globe"/><code>uxdesign.cc</code>)

> A Generative User Interface (GenUI) is an interface that adapts to, or processes, context such as inputs, instructions, behaviors, and preferences through the use of generative AI models (e.g. LLMs) in order to enhance the user experience.
>
> Put simply, a GenUI interface displays different components, information, layouts, or styles, based on who’s using it and what they need at that moment.

![Credit: [<VPIcon icon="fas fa-globe"/>UX Collective](https://uxdesign.cc/an-introduction-to-generative-uis-01dcf6bca808)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/12v0P-BgWWazAx_FWeoP7zg.webp?resize=1024%2C485)

<SiteInfo
  name="An introduction to Generative UIs"
  desc="Using AI to make better and easier interfaces for your users"
  url="https://uxdesign.cc/an-introduction-to-generative-uis-01dcf6bca808/"
  logo="https://miro.medium.com/v2/resize:fill:128:128/1*dn6MbbIIlwobt0jnUcrt_Q.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*iqLmqrTK_KYKIDkHGCAJSA.png"/>

:::

---

## Generative vs. Predictive AI

It’s easy to dump “AI” into one big bucket, but it’s often distinguished as two different types: **predictive** and **generative**.

|  | Predictive AI | Generative AI |
| --- | --- | --- |
| **Inputs** | Uses smaller, more targeted datasets as input data. ([**Smashing Magazine**](/smashingmagazine.com/guide-retrieval-augmented-generation-language-models.md)) | Trained on large datasets containing millions of sample content. ([<VPIcon icon="fas fa-globe"/>U.S. Congress](https://congress.gov/crs_external_products/IF/PDF/IF12426/IF12426.5.pdf), PDF) |
| **Outputs** | Forecasts future events and outcomes. ([<VPIcon icon="iconfont icon-ibm"/>IBM](https://ibm.com/think/topics/generative-ai-vs-predictive-ai-whats-the-difference)) | New content, including audio, code, images, text, simulations, and videos. ([<VPIcon icon="fas fa-globe"/>McKinsey](https://mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai)) |
| **Examples** | ChatGPT, Claude | Sora, Suno, Cursor |

So, when we’re talking about GenAI, we’re talking about the ability to *create* new materials trained on existing materials. And when we’re talking specifically about GenUI, it’s about **generating a user interface based on what the AI knows about the user.**

---

## Accessibility

And I should note that what I’m talking about here is not strictly GenUI in how we’ve defined it so far as UI output that adapts to individual user experiences, but rather “developing” generated interfaces. These so-called AI website builders do not adapt to the individual user, but it’s easy to see it heading in that direction.

The thing I’m most interested in — concerned with, frankly — is to what extent GenUI can *reliably* output experiences that cater to *all* users, regardless of impairment, be it aural, visual, physical, etc. There are a lot of different inputs to consider here, and [<VPIcon icon="fa-brands fa-vimeo"/>we’ve seen just how awful the early results have been](https://vimeo.com/1088341217).

That last link is a big poke at Figma Sites. They’re easy to poke because they made [<VPIcon icon="fa-brands fa-figma"/>the largest commercial push](https://figma.com/blog/introducing-figma-sites/) into GenUI-based web development. To their credit (perhaps?), they received the severe pushback and decided to do something about it, [<VPIcon icon="fa-brands fa-figma"/>announcing updates](https://figma.com/release-notes/?title=more-ways-to-share-customize-and-expand-your-reach-for-sites) and [<VPIcon icon="fa-brands fa-figma"/>publishing a guide](https://help.figma.com/hc/en-us/articles/31242789265431-Improve-the-accessibility-of-your-site) for improving accessibility on Figma-generated sites. But even those [**have their limitations**](/adrianroselli.com/do-not-publish-your-designs-on-the-web-with-figma-sites.md#Updates) that make the effort and advice seem less useful and more about saving face.

Anyway. There are plenty of other players to jump into the game, notably [<VPIcon icon="fa-brands fa-wordpress"/>WordPress](https://wordpress.com/ai-website-builder/), but also others like [<VPIcon icon="iconfont icon-v0"/>Vercel](https://v0.app/), [<VPIcon icon="fa-brands fa-squarespace"/>Squarespace](https://squarespace.com/websites/ai-website-builder), [<VPIcon icon="fa-brands fa-wix"/>Wix](https://wix.com/ai-website-builder), [<VPIcon icon="fas fa-globe"/>GoDaddy](https://godaddy.com/ai-for-small-businesses), [<VPIcon icon="fas fa-globe"/>Lovable](https://lovable.dev), and [<VPIcon icon="fas fa-globe"/>Reeady](https://readdy.ai).

Some folks are more optimistic than others that GenUI is not only capable of producing accessible experiences, but will replace accessibility practitioners altogether as the technology evolves. [<VPIcon icon="fas fa-globe"/>Jakob Nielsen famously made that claim in 2024](https://jakobnielsenphd.substack.com/p/accessibility-generative-ui) which [<VPIcon icon="fas fa-globe"/>drew](https://buttondown.com/practicaltips/archive/we-need-to-talk-about-jakob/) [<VPIcon icon="fas fa-globe"/>fierce](https://uxdesign.cc/how-the-king-of-usability-became-vulnerable-to-naive-tech-optimism-0de7836aa9a8) [<VPIcon icon="fas fa-globe"/>criticism](https://bethdeconinck.com/2024/03/01/jakob-nielsens-bad-ideas-about-accessibility/) [<VPIcon icon="fas fa-globe"/>from](https://axbom.com/nielsen-generative-ui-failure/) [<VPIcon icon="fas fa-globe"/>the](https://cerovac.com/a11y/2024/03/accessibility-has-not-failed-it-has-not-even-started-for-real/) [<VPIcon icon="fas fa-globe"/>community](https://ericwbailey.design/published/on-jakob-nielsen-ai-hype-and-accessibility/). Nielsen [<VPIcon icon="fas fa-globe"/>walked that back a year later](https://uxtigers.com/post/ai-agents), but not much.

I’m not even remotely qualified to offer best practices, opine on the future of accessibility practice, or speculate on future developments and capabilities. But as I look at [<VPIcon icon="fa-brands fa-google"/>Google’s People + AI Guidebook](https://pair.withgoogle.com/guidebook/), I see no mention at all of accessibility despite dripping with “human-centered” design principles.

Accessibility is a lagging consideration to the hype, at least to me. That has to change if GenUI is truly the “future” of web design and development.

---

## Examples & Resources

[<VPIcon icon="fa-brands fa-google"/>Google has a repository of examples](https://generativeui.github.io) showing how user input can be used to render a variety of interfaces. Going a step further is Google’s [<VPIcon icon="fa-brands fa-google"/>Project Genie](https://labs.google/projectgenie) that bills itself as creating “interactive worlds” that are “generated in real-time.” I couldn’t get an invite to try it out, but maybe you can.

In addition to that, [<VPIcon icon="iconfont icon-flutter"/>Google has a GenUI SDK](https://docs.flutter.dev/ai/genui/get-started) designed to integrate into Flutter apps. So, yeah. Connect to your LLM provider and let it rip to create adaptive interfaces.

[<VPIcon icon="fas fa-globe"/>Thesys](https://thesys.dev/) is another one in the adaptive GenUI space. [Copilot (<VPIcon icon="iconfont icon-github" />`CopilotKit/generative-ui-playground`)](https://github.com/CopilotKit/generative-ui-playground), too.

::: info References
<!-- TODO: SiteInfo 작성 -->

<SiteInfo
  name="Figma Sites: Design, Prototype & Publish Your Next Website"
  desc="Design, prototype, and launch your next website with Figma Sites—an all-in-one platform made for fast, collaborative web creation."
  url="https://figma.com/sites/"
  logo="https://static.figma.com/app/icon/2/favicon.ico"
  preview="https://cdn.sanity.io/images/599r6htc/regionalized/4dad919019d93f97778f14fa99132e9f297c2d08-2400x1260.png?w=1200&q=70&fit=max&auto=format"/>

- [“Do Not Publish Your Designs on the Web with Figma Sites…”](https://adrianroselli.com/2025/05/do-not-publish-your-designs-on-the-web-with-figma-sites.html#Updates) (Adrian Roselli)
- [“Generative UI: LLMs are Effective UI Generators”](https://generativeui.github.io/static/pdfs/paper.pdf) (Google Research, PDF)
- [“Generative UI and Outcome-Oriented Design”](https://nngroup.com/articles/generative-ui/) (NN/Group)
- [“An introduction to Generative UIs”](https://uxdesign.cc/an-introduction-to-generative-uis-01dcf6bca808) (UX Collective)
- [“A Simple Guide To Retrieval Augmented Generation Language Models”](https://smashingmagazine.com/2024/01/guide-retrieval-augmented-generation-language-models/) (Joas Pambou)
- [“Generative Artificial Intelligence: Overview, Issues, and Considerations for Congress”](https://congress.gov/crs_external_products/IF/PDF/IF12426/IF12426.5.pdf) (U.S. Congress, PDF)
- [<VPIcon icon="iconfont icon-ibm"/>“Generative AI vs. predictive AI: What’s the difference?”](https://ibm.com/think/topics/generative-ai-vs-predictive-ai-whats-the-difference) (IBM)
- [“What is generative AI?”](https://mckinsey.com/featured-insights/mckinsey-explainers/what-is-generative-ai) (McKinsey & Company)
- [<VPIcon icon="fa-brands fa-vimeo"/>“Introducing: Webbed Sites”](https://vimeo.com/1088341217) (Heydon Pickering, Video)
- [<VPIcon icon="fa-brands fa-figma"/>“Publish your designs on the web with Figma Sites”](https://figma.com/blog/introducing-figma-sites/) (Figma)
- [<VPIcon icon="fa-brands fa-figma"/>“Figma Sites on Starter and Education, with more ways to share, customize, and expand your reach for Sites”](https://figma.com/release-notes/?title=more-ways-to-share-customize-and-expand-your-reach-for-sites) (Figma)
- [<VPIcon icon="fa-brands fa-figma"/>“Improve the accessibility of your site”](https://help.figma.com/hc/en-us/articles/31242789265431-Improve-the-accessibility-of-your-site) (Figma Learn)
- “[Accessibility Has Failed: Try Generative UI = Individualized UX”](https://jakobnielsenphd.substack.com/p/accessibility-generative-ui) (Jakob Nielsen)
- [“Hello AI Agents: Goodbye UI Design, RIP Accessibility”](https://uxtigers.com/post/ai-agents) (Jakob Nielsen)
- [<VPIcon icon="fa-brands fa-google"/>“The People + AI Guidebook”](https://pair.withgoogle.com/guidebook/) (Google)
- [Project Genie](https://labs.google/projectgenie) (Google Labs)\\
- [<VPIcon icon="iconfont icon-flutter"/>“Get started with the GenUI SDK for Flutter”](https://docs.flutter.dev/ai/genui/get-started) (Flutter Docs)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Generative UI Notes",
  "desc": "Looking at research and experiments that are designed to automatically generate user interfaces based on user preferences.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/generative-ui-notes.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
