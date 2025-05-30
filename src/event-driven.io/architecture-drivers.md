---
lang: en-US
title: "My Architecture Drivers"
description: "Article(s) > My Architecture Drivers"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - event-driven.io
  - system
  - design
head:
  - - meta:
    - property: og:title
      content: "Article(s) > My Architecture Drivers"
    - property: og:description
      content: "My Architecture Drivers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/event-driven.io/architecture-drivers.html
prev: /academics/system-design/articles/README.md
date: 2024-08-31
isOriginal: false
author:
  - name: Oskar Dudycz
    url : https://event-driven.io/en/about/
cover: https://event-driven.io/static/d3ac5b456d98d37dcfd581c62fcf25d1/2a4de/2024-08-31-cover.png
---

# {{ $frontmatter.title }} 관련

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
  name="My Architecture Drivers"
  desc="Event-Driven by Oskar Dudycz"
  url="https://event-driven.io/en/architecture_drivers"
  logo="/assets/image/event-driven.io/favicon.jfif"
  preview="https://event-driven.io/static/d3ac5b456d98d37dcfd581c62fcf25d1/2a4de/2024-08-31-cover.png"/>

**I don’t feel like an authority or an expert. I prefer to think about myself as a practitioner.** Our industry is filled with self-proclaimed experts; we need more doers.

**For similar reasons, I was reluctant to call myself an “Architect” for a long time.** Somehow, it became pejorative, but should it be? I changed my mind thanks to [Jarek Pałka (<FontIcon icon="fa-brands fa-linkedin"/>`jpalka`)](https://linkedin.com/in/jpalka/), who says that “we all are architects”. It’s a simple line but multidimensional. That means (to me) that we all are responsible for making our systems work as they should. It’s not about bragging but accountability.

**Still, I never feel comfortable being asked about Software Architecture Drivers.** How do you give someone a checklist for good software? Yet I had to answer this time, as [Maciej Jędrzejewski (<FontIcon icon="fa-brands fa-linkedin"/>`jedrzejewski-maciej`)](https://linkedin.com/in/jedrzejewski-maciej/) asked me if I could write my thoughts [<FontIcon icon="fas fa-globe"/>to his new book](https://leanpub.com/master-software-architecture). How could I reject the offer? Actually, I could, as it surprised me, but hey, maybe my few words will help others fight their impostor syndrome. Or it was just too flattering. Nevertheless, here they are!

It’s funny that we called our industry **SOFTware**, but it’s all about making **HARD decisions**. Usually, we make them when we’re the dumbest: we don’t know the business domain, we don’t know the user needs, and we are unsure of technology choices. Plus, even if we do, our changing environment is open to proving us wrong.

**For me, architecture decisions are more a process than a set of specific rules. It’s a process of answering the following questions:**

**WHY?** So, understanding the product vision and business model. Consider [**where the money flows**](/event-driven.io/follow-the-money.md/): who the client and the user are. That’s an important fact, as we should care about all users but optimise for clients, especially those who bring money. In the end, our product should bring money.

**WHAT?** Understand what we actually need to build. Set a mental model of the business workflow. This is an excellent moment for collaborative tooling, brainstorming and modelling practices like Event Storming, Domain Storytelling, etc.

**HOW?** Think about the requirements and guarantees you need to have. Find architecture patterns and class of solutions that will fulfil your requirements. So, the type of databases, deployment type, integration patterns, not the specific technologies. Consider tools like C4 and other tools to structure your findings.

**WITH.** Select the tooling based on the outcome of the previous point. It has to fulfil requirements, but also non-functional like costs, match team experience, ease of use. Then rinse and repeat.

**Architecture is not created in a vacuum.** Talk and collaborate with business, users and your technical fellows.

Consider the [**team you (can) have**](/en/on_the_importance_of_shaping_the_boundaries_in_team_management/). Most of the time, the best technology is the one that your team knows. We’re building new tools, but to be true, rarely sophisticated ones. Most of them are regular lines of business applications.
<!-- TODO: /event-driven.io/on-the-importance-of-shaping-the-boundaries-in-team-management.md -->

**And hey, let me share the secret with you: your decisions will be wrong. Mine also.** And that’s fine. We don’t need to be flawless; our system also doesn’t need to be. Expect the change; it’ll come.

So [**don’t be afraid to make decisions**](/en/why_are_we_afraid_of_our_decisions/), but don’t rush yourself. Always consider alternative solutions. Record your decisions together with thrown away ideas. Provide the context and explain WHY, WHAT, HOW, WITH. Provide the assumed limits. Suggest how to evolve if, e.g. your system will be a huge success and becomes overwhelmed by traffic. Some problems are good to have. But don’t need to be solved immediately.
<!-- TODO: /event-driven.io/why-are-we-afraid-of-our-decisions.md -->

We should [**optimise not for maintainability but for removability**](/en/removability_over_maintainability/). If our system is built so that we can relatively easily remove pieces from it, then we can drop bad ideas and move on to new ones. Also, by accident, we’re getting a system that’s easier to maintain.
<!-- TODO: /event-driven.io/removability-over-maintainability.md -->

**What are your architecture drivers? Or better, what’s your process?**

**Check also Maciej’s book [“<FontIcon icon="fas fa-globe"/>Master Software Architecture Book”](https://leanpub.com/master-software-architecture).** I’m still in front of reading it till the end. But I like what I see so far; the outline and range of topics show the holistic, actionable vision of building software. And, most importantly, it’s not pompous.

I think getting more books/talks like that would be great. We need more books in the spirit of “this is my story, this is why I think it’s important and worked out for me. “. It’s good that it’s from a personal perspective, allowing us to compare or benchmark it to our vision and experience.

If you need even more architecture benchmarks, I have gathered some of my past articles on my general approach to architecture and software design:

- [Architect Manifesto](/en/architect_manifesto/)
- [How to design software architecture pragmatically](/en/how_to_design_software_architecture_pragmatically/)
- [Removability over Maintainability](/en/removability_over_maintainability/)
- [The risk of ignoring risks](en/the_risk_of_ignoring_risks/)
- [Why are we afraid of our decisions?](/en/why_are_we_afraid_of_our_decisions/)
- [What do the British writer and his fence have to do with Software Architecture?](/en/chesterton_fence_and_software_architecture/)
- [Follow the money to get a better design](/en/follow_the_money/)
- [A few words on communication](/en/a_few_words_on_communication/)
- [How to successfully do documentation without a maintenance burden?](/en/how_to_successfully_do_documentation_without_maintenance_burden/)
- [The magic is that there is no magic. Or how to understand design patterns](/en/the_magic_is_that_there_is_no_magic/)
- [Not all issues are complex, some are complicated. Here’s how to deal with them](/en/how_to_solve_complicated_problems/)
- [On the importance of setting boundaries in team management](/en/on_the_importance_of_shaping_the_boundaries_in_team_management/)
- [What Dune can tell us about setting our goals](/en/dune_and_long_term_goals/)
- [Stacking the bricks in the software development process](/en/stacking_the_bricks/)
- [The Holy Grail syndrome](/en/holy_graal_syndrome/)
- [Dive a bit deeper, look a bit wider](/en/dive_a_bit_deeper_look_a_bit_wider/)
- [What does Mr Bean opening the car have to do with programming?](/en/what_does_mr_bean_opening_the_car_have_to_do_with_programming/)
- [What does a construction failure have to do with our authorities?](/en/what_does_a_construction_failure_have_to_do_with_our_authorities/)

**And check [<FontIcon icon="fas fa-globe"/>Architecture Weekly](https://architecture-weekly.com/) where I’m showing my less-event-driven face every week!**

Cheers!

Oskar

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "My Architecture Drivers",
  "desc": "Event-Driven by Oskar Dudycz",
  "link": "https://chanhi2000.github.io/bookshelf/event-driven.io/architecture_drivers.html",
  "logo": "/assets/image/event-driven.io/favicon.jfif",
  "background": "rgba(255,255,0,0.2)"
}
```
