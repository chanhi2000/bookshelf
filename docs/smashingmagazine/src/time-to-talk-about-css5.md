---
lang: en-US
title: "It’s Time To Talk About “CSS5”"
description: "Article(s) > It’s Time To Talk About “CSS5”"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > It’s Time To Talk About “CSS5”"
    - property: og:description
      content: "It’s Time To Talk About “CSS5”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/time-to-talk-about-css5.html
prev: /programming/css/articles/README.md
date: 2024-08-05
isOriginal: false
author:
  - name: Brecht De Ruyte
    url: https://smashingmagazine.com/author/brecht-de-ruyte/
cover: https://files.smashing.media/articles/time-to-talk-about-css5/time-to-talk-about-css5.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="It’s Time To Talk About “CSS5”"
  desc="Have you ever wondered what happened after CSS3? It’s common knowledge that we never saw CSS4 come after it, yet we have a plethora of new features that have no similar way of defining when they were introduced. The W3C CSS-Next community group is actively searching for better approaches for how we describe the evolution of CSS over time and identify feature sets as effectively as we did with CSS3 way back in 2009 — and you can help."
  url="https://smashingmagazine.com/2024/08/time-to-talk-about-css5/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/time-to-talk-about-css5/time-to-talk-about-css5.jpg"/>

Have you ever wondered what happened after CSS3? It’s common knowledge that we never saw CSS4 come after it, yet we have a plethora of new features that have no similar way of defining when they were introduced. The W3C CSS-Next community group is actively searching for better approaches for how we describe the evolution of CSS over time and identify feature sets as effectively as we did with CSS3 way back in 2009 — and you can help.

We have been talking about *CSS3* for a long time. Call me a fossil, but I still remember the new `border-radius` property feeling like the most incredible CSS3 feature. We have moved on since we got `border-radius` and [**a slew of new features dropped in a single CSS3 release back in 2009**](/smashingmagazine.com/push-your-web-design-into-the-future-with-css3.md).

CSS, too, has moved on as a language, and yet “CSS3” is still in our lexicon as the last “official” semantically-versioned release of the CSS language.

::: info <VPIcon icon="fa-brands fa-x-twitter"/>

> It’s not as though we haven’t gotten any new and exciting CSS features between 2009 and 2024; it’s more that the process of developing, shipping, and implementing new CSS features is a guessing game of sorts.

:::

We see CSS Working Group (CSSWG) discussions happening in the open. We have the draft specifications and an archive of versions at our disposal. The resources are there! But the develop-ship-implement flow remains elusive and leaves many of us developers wondering: *When is the next CSS release, and what’s in it?*

This is a challenging balancing act. We have spec authors, code authors, and user agents working both interdependently and independently and the communication gaps are numerous and wide. The result? New features take longer to be implemented, leading to developers taking longer to adopt them. We might even consider CSS3 to be the last great big “marketing” push for CSS as a language.

That’s what the [<VPIcon icon="iconfont icon-w3c"/>CSS-Next community](https://w3.org/community/css4/) is grappling with at this very moment. If you haven’t heard of the group, you’re not alone, but either way, it’s high time we shed light on it and the ideas coming from it. As someone [<VPIcon icon="iconfont icon-w3c"/>participating in the group](https://w3.org/community/css4/participants), I thought I would share the conversations we’re having and how we’re approaching the way CSS releases are communicated.

---

## Meet The CSS-Next Community

Before we formally “meet” the CSS-Next group, it’s worth knowing that it is still officially referred to as the [<VPIcon icon="iconfont icon-w3c"/>CSS4 Community Group](https://w3.org/community/css4/) as far as the W3C is concerned.

And that might be the very first thing you ought to know about CSS-Next: it is part of the W3C and consists of CSSWG members, developers, designers, user agents, and, really, anyone passionate about the web and who wants to participate in the discussion. W3C groups like CSS-Next are **open to everyone** to bring our disparate groups together, opening opportunities to shape tomorrow’s vision of the web.

CSS-Next, in particular, is where people gather to discuss the possibility of **raising awareness of CSS evolutions** during the last decade. At its core, the group is discussing approaches for bundling CSS features that have shipped since CSS3 was released in 2009 and how to name the bundle (or bundles, perhaps) so we have a way of referring to this particular “era” of CSS and pushing those features forward.

---

## Why We Need A Group Like CSS-Next

Let’s go back a few years. More specifically, let’s return to the year 2020. It all started when Safari Evangelist [<VPIcon icon="fas fa-globe"/>Jen Simmons](https://jensimmons.com) posted an [open issue in the CSSWG’s GitHub repo for CSS draft specifications (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#4770`)](https://github.com/w3c/csswg-drafts/issues/4770) requesting a definition for a “CSS4” release.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/time-to-talk-about-css5/1-w3c-repo-css4.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/time-to-talk-about-css5/1-w3c-repo-css4.png)

This might be one of the biggest responses — if not *the* biggest response — to a CSSWG issue based solely on emoji reactions.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/time-to-talk-about-css5/2-emoji-reactions.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/time-to-talk-about-css5/2-emoji-reactions.png)

The idea of defining CSS4 had some back-ups by Chris Coyier, Nicole Sullivan, and PPK. The idea is to push technologies forward and help educators and site owners, even if it’s just for the sake of marketing.

But why is this important? Why should we care about another level or “CSS Saga”? To get to that point, we might need to talk about CSS3 and what exactly it defines.

---

## What Exactly Is “CSS3”?

The CSS3 grouping of features included **level-3 specs** for features from typography to selectors and backgrounds. From this point on, each CSS spec has been numbered individually.

However, **CSS3 is still the most common term developers use to define the capabilities of modern CSS.** We see this across the web, from the way educational institutions teach CSS to the job requirements on resumes.

The term CSS3 loses meaning year-over-year. You can see the dilution everywhere. The earliest CSS3 drafts were published in June 1999 — before many of my colleagues were even born — and yet CSS is one of the fastest-growing languages in the current webscape.

---

## What About The CSS3 Logo?

When we look at job postings, we run into vacancies asking for knowledge of CSS3, which is over 10 years old. Without an updated level, we’re just asking if you’ve written CSS since the `border-radius` property came out. Furthermore, when we want to learn CSS, a CSS3 logo next to educational materials no longer signals current material. It kind of feels like time has stood still.

Here’s an example job posting that illustrates the issue:

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/time-to-talk-about-css5/3-job-requirements-list-css3.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/time-to-talk-about-css5/3-job-requirements-list-css3.png)

But that’s not all. If you do a Google search on “Learn CSS” and check the images, you might be surprised how many CSS3 logos you can spot:

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/time-to-talk-about-css5/4-google-search-learn-css.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/time-to-talk-about-css5/4-google-search-learn-css.png)

About 50% of the images show the CSS3 badge. To me, this clearly signals:

1. People want badges or logos to aid in signaling skills.
2. The CSS3 brand has made a large impact on the web ecosystem.
3. The CSS3 logo has reached the end of its efficacy.

**CSS3 ~~had~~ still has a huge impact on the ecosystem.** The same logo is trying to say it teaches Flexbox all the way to `color-mix()` — a spread of hundreds of CSS features.

---

## What Exactly Does “Modern CSS” Mean?

CSS3 and HTML5 were big improvements to those respective languages — **we’ve come a long way** since then. We have features that people didn’t even think were possible back in 2012 (when we officially spoke of CSS3 as a level).

For example, there was a time when people thought that containers didn’t know anything and it never be possible to style an element based on the width of its parent. But now, of course, we have CSS Container Queries, and all of this is possible today. The things that are possible with CSS changed over time, as so [<VPIcon icon="fa-brands fa-youtube"/>beautifully told by Miriam Suzanne at CSS Day 2023](https://youtu.be/-Fw8GSksUIo).

We do not want to ignore the success of CSS3 and say it is wrong; in fact, we believe it’s time to **repeat the tremendous success of CSS3**.

Imagine yourself 10 years from now reading a “modern” CSS feature that was introduced as many as 10 years ago. It wouldn’t add up, right? **Modern is not a future-proof name**, something that Geoff Graham opined when asking the correct question, “[<VPIcon icon="fas fa-globe"/>What exactly is ‘Modern CSS’?](https://geoffgraham.me/what-exactly-is-modern-css/)”

::: info Geoff Graham, CSS Tricks (<VPIcon icon="iconfont icon-css-tricks"/><code>css-tricks.com</code>)

> “[**Naming is always hard**](/css-tricks.com/naming-things-is-only-getting-harder.md), yet it’s just something we have to do in CSS to properly select things. I think it’s time we start naming [CSS releases] like this, too. It’s only a matter of time before “modern” isn’t “modern” anymore.”  

:::

This is exactly where the CSS-Next community group comes in.

---

## Let’s Talk About “CSS Eras”

The CSS-Next community group aims to **align and modernize the general understanding of CSS in the wider developer community** by labeling feature sets that have shipped since the initial set of CSS3 features, helping developers upskill their understanding of CSS across the ecosystem.

### Why Isn’t This Part Of The Web Platform Baseline?

The definition of what is “current” CSS changes with time. Sometimes, specs are incomplete or haven’t even been drafted. While [<VPIcon icon="iconfont icon-webdev"/>Baseline](https://web.dev/baseline/) looks at the current browser support of a feature in CSS, we want to take a look at the evolution of the language itself. The CSS levels should not care about which browser implemented it first.

It might be more nuanced than this in reality, but that’s pretty much the gist. We also don’t want it to become another “modern CSS” bucket. Indeed, referring to CSS3 as an “era” has helped compartmentalize how we can shift into CSS4, CSS5, and beyond. For example, labeling something as a “CSS4” feature provides a hint as far as when that feature was born. A feature that reaches “baseline” meanwhile merely indicates the status of that feature’s browser implementation, which is a separate concern.

Identifying features by era and implementation status are both indicators and provide meta information about a CSS feature but with different purposes.

### Why Not Work With An Annual Snapshot Instead Of A Numbered Era?

It’s fair to wonder if a potential solution is to take a “snapshot” of the CSS feature set each year and use that as a mile marker for CSS feature releases. However, an annual picture of the language is less effective than defining a particular era in which specific features are introduced.

There were a handful of years when CSS was relatively quiet compared to the mad dash of the last few years. Imagine a year in which nothing, or maybe very few, CSS features are shipped, and the snapshot for that year is nearly identical to the previous year’s snapshot. Now imagine CSS explodes the following year with a deluge of new features that result in a massive delta between snapshots. It takes mental agility to compare complete snapshots of the entire language and find what’s new.

---

## Goals And Non-Goals

I think I’ve effectively established that the term “CSS” alone isn’t clear or helpful enough to illustrate the evolution of the CSS, just as calling a certain feature “modern” degrades over time.

::: info <VPIcon icon="fa-brands fa-x-twitter"/>

> “Grouping features in levels that represent different eras of releases — even from a marketing standpoint — offers a good deal of meaning and has a track record of success, as we’ve seen with CSS3.”

:::

All of this comes back to a set of goals that the CSS-Next group is rallying around:

- Help developers **learn** CSS.
- Help educators **teach** CSS.
- Help employers **define** modern web skills.
- Help the community **understand** the progression of CSS capabilities over time.
- Create a **shared vernacular** for describing how CSS evolves.

What we do *not* want is to:

- **Affect spec definitions**.<br/>CSS-Next is not a group that would define the working process of or influence working groups such as the CSSWG.
- **Create official developer documentation.**<br/>Making something like a new version of MDN doesn’t get us closer to a better understanding of how the language changes between eras.
- **Define browser specification work.**<br/>This should be conducted in relevant standardization or pre-standardization forums (such as the CSSWG or [<VPIcon icon="fas fa-globe"/>OpenUI](https://open-ui.org)).
- **Educate developers on CSS best practices.**<br/>That has much more to do with feature implementations than the features themselves.
- **Manage browser compatibility data.**<br/>Baseline is already doing that, and besides, we’ve already established that feature specifications and implementations are separate concerns.

This doesn’t mean that everything in the last list is null and void. We could, for example, have CSS eras that list all the features specced in that period. And inside that list, there could be a baseline reference for the implementations of those features, making it easier to bring forward some ideas for the next [<VPIcon icon="iconfont icon-webdev"/>Interop](https://web.dev/blog/interop-2024), which informs Baseline.

This leaves the CSS-Next group with a super-clear focus to:

- **Research** the community’s understanding of modern CSS,
- **Build** a shared understanding of CSS feature evolution since CSS3,
- **Grouping** those features into easily-digestible levels (i.e., CSS4, CSS5, and so on), and
- **Educate** the community about modern CSS features.

### We’d Likely Start With The “CSS5” Era

A lot of thought and work has gone into the way CSS is described in eras. The initial idea was to pick up where CSS3 left off and jump straight into CSS4. But the number of features released between the two eras would be massive, even if we narrowed it down to just the features released since 2020, never mind 2009.

It makes sense, instead, to split the difference and call CSS4 a done deal as of, say, 2018 and a fundamental part of CSS in its current state as we begin with the next logical period: CSS5. Here’s how the definitions are currently defined:

- **CSS3 (~2009-2012)**: Level 3 CSS specs as defined by the CSSWG. (immutable)
- **CSS4 (~2013-2018)**: Essential features that were not part of CSS3 but are already a fundamental part of CSS.
- **CSS5 (~2019-2024)**: Newer features whose adoption is steadily growing.
- **CSS6 (~2025+)**: Early-stage features that are planned for future CSS.

---

## Uncle ~Sam~ CSS Wants You!

We released a [request for comments (<VPIcon icon="iconfont icon-github"/>`CSS-Next/css-next`)](https://github.com/CSS-Next/css-next/discussions/92) last May for community input from developers like you. We’ve received a few comments that have been taken into account, but we need much more feedback to help inform our approach.

We want a big representative response from the community! But that takes awareness, and we need you to make that happen. Anything you can do to let your teams and colleagues that the CSS-Next group is a thing and that we’re trying to solve the way we talk about CSS features is greatly appreciated. We want to know what you and others think about the things we’re wrestling with, like whether or not the way we’re grouping eras above is a sound approach, where you think those lines should be drawn, and if you agree that we’re aiming for the right goals.

**We also want you to participate.** Anyone is welcome to [<VPIcon icon="iconfont icon-w3c"/>join the CSS-Next group](https://w3.org/community/css4/join) and we could certainly use help brainstorming ideas. There’s even an incubation group that conducts a biweekly hour-long session that takes place on Mondays at 8:00 a.m. Pacific Time (2:00 p.m. GMT).

On a completely personal note, I’d like to add that I joined the CSS-Next group purely out of interest but became much more actively involved once the mission became very clear to me. As a developer working in an agency, I see how fast CSS changes and have struggled, like many of you, to keep up.

A seasoned colleague of mine commented the other day that they wouldn’t even know how to approach vanilla CSS on a fresh website project. There is no shame in that! I know many of us feel the same way. So, why not bring it to marketing terms and figure out a better way to frame discussions about CSS features based on eras? You can help get us there!

And if you think I’m blameless when it comes to talking about CSS in generic “modern” terms, all it takes is a quick look at the headline of [**another Smashing article I authored**](/smashingmagazine.com/modern-css-layouts-no-framework-needed.md)… *this year!*

**Let’s get going with CSS5 and spread the word! Let me hear your thoughts.**

::: info Resources

```component VPCard
{
  "title": "CSS4 Community Group",
  "desc": "A group to debate and define CSS4. The umbrella term "CSS3" was incredibly useful in teaching the new additions to CSS around 2010. It seems time to loosely group together more recent additions under another umbrella, to help increase adoption and make it easier to teach. This will not change how the CSSWG operates, will not affect spec numbering, and will be separate from the official CSS snapshots.",
  "link": "https://w3.org/community/css4/",
  "logo": "https://w3.org/community/wp-content/themes/StoryTeller/favicon.ico",
  "background": "rgba(14,122,173,0.2)"
}
```

<SiteInfo
  name="Let’s Define CSS 4 · Issue #4770 · w3c/csswg-drafts"
  desc="It’s come up quite a few times recently that the world of people who make websites would greatly benefit from the CSS Working Group officially defining ”CSS 4”, and later “CSS 5“, etc. Chris Coyier..."
  url="https://github.com/w3c/csswg-drafts/issues/4770/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0128368eba5ffed296b9df86a1dac22bb1afe998f0aa7b2353be3d914e33349e/w3c/csswg-drafts/issues/4770"/>

<SiteInfo
  name="RFC: Initial CSS Level Categorization · CSS-Next/css-next · Discussion #92"
  desc="Intro The CSS Next Community Group is looking for feedback on our initial exploration into CSS Levels. This is our formal request for comments. This doc contains information about the decision-maki..."
  url="https://github.com/CSS-Next/css-next/discussions/92/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f44592918318772fe75b0792ab29fe95a99502bacfe406be7e229b1b71727d98/CSS-Next/css-next/discussions/92"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "It’s Time To Talk About “CSS5”",
  "desc": "Have you ever wondered what happened after CSS3? It’s common knowledge that we never saw CSS4 come after it, yet we have a plethora of new features that have no similar way of defining when they were introduced. The W3C CSS-Next community group is actively searching for better approaches for how we describe the evolution of CSS over time and identify feature sets as effectively as we did with CSS3 way back in 2009 — and you can help.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/time-to-talk-about-css5.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
