---
lang: en-US
title: "CSS Auditing Tools"
description: "Article(s) > CSS Auditing Tools"
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
      content: "Article(s) > CSS Auditing Tools"
    - property: og:description
      content: "CSS Auditing Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-auditing-tools.html
prev: /programming/css/articles/README.md
date: 2021-06-24
isOriginal: false
author:
  - name: Iris Lješnjanin
    url: https://smashingmagazine.com/author/iris-ljesnjanin/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/128fa8b4-643a-45f2-a37b-aabd7fececf1/4-complexity.png
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
  name="CSS Auditing Tools"
  desc="Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to expensive layout recalculations. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write slightly more efficient CSS selectors. In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers to get their work done better and faster. Starting out with a few tools for getting to the bottom of CSS."
  url="https://smashingmagazine.com/2021/03/css-auditing-tools/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/128fa8b4-643a-45f2-a37b-aabd7fececf1/4-complexity.png"/>

Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to expensive layout recalculations. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write slightly more efficient CSS selectors. In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers to get their work done better and faster. Starting out with a few tools for getting to the bottom of CSS.

How large is your CSS? How repetitive is it? What about your CSS specificity score? Can you safely remove some declarations and vendor prefixes, and if so, how do you spot them quickly? Over the last few weeks, we’ve been working on refactoring and cleaning up our CSS, and as a result, we stumbled upon a couple of useful tools that helped us identify duplicates. So let’s review some of them.

::: info More On CSS

```component VPCard
{
  "title": "CSS Generators",
  "desc": "In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers. This time Iris Lješnjanin brings you CSS Generators: from CSS shadows to easing gradients to CSS overlays to CSS doodles.",
  "link": "/smashingmagazine.com/css-generators.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [Comprehensive Guide To CSS Layout](https://smashingmagazine.com/guides/css-layout/)
- [**Managing CSS Z-Index**](/smashingmagazine.com/css-z-index-large-projects.md)

```component VPCard
{
  "title": "How To Align Things In CSS",
  "desc": "There are a few ways to align elements in CSS. In this article, Rachel Andrew explains what they are with some tips to help you remember which to use and why. She will take a look at the different alignment methods. Instead of providing a comprehensive guide to each, Rachel explain a few of the sticking points people have and point to more complete references for the properties and values. You can go a long way by understanding the fundamental things about how the methods behave, and then need a place to go look up the finer details in terms of how you achieve the precise layout that you want.",
  "link": "/smashingmagazine.com/css-alignment.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Things You Can Do With CSS Today**](/smashingmagazine.com/things-you-can-do-with-css-today.md)
- [**Useful DevTools Tips and Shortcuts**](/smashingmagazine.com/useful-chrome-firefox-devtools-tips-shortcuts.md)

:::

---

## CSS Stats

[<VPIcon icon="fas fa-globe"/>CSS Stats](https://cssstats.com/) runs a thorough audit of the CSS files requested on a page. Like many similar tools, it provides a dashboard-alike view of rules, selectors, declarations and properties, along with pseudo-classes and pseudo-elements. It also **breaks down all styles into groups**, from layout and structure to spacing, typography, font stacks and colors.

![Specificity scores, built with [<VPIcon icon="fas fa-globe"/>CSS Stats](https://cssstats.com/). Lower scores and flatter curves are better for maintainability.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1a08575e-e863-4963-bffa-3df841ee074c/specificity-graph.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1a08575e-e863-4963-bffa-3df841ee074c/specificity-graph.png)

One of the useful features that CSS Stats provides is the **CSS specificity score**, showing how unnecessarily specific some of the selectors are. Lower scores and flatter curves are better for maintainability.

![An overview of colors used, printed by declaration order in source code, with [<VPIcon icon="fas fa-globe"/>CSS Stats](https://cssstats.com/).<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6e455a16-1c4f-4585-93a3-632793436122/colors-used.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6e455a16-1c4f-4585-93a3-632793436122/colors-used.png)



It also includes an overview of colors used, printed by declaration order, and a score for **Total vs. Unique declarations**, along with the comparison charts that can help you identify which properties might be the best candidates for creating abstractions. That’s a great start to understand where the main problems in your CSS lie, and what to focus on.

---

## Yellow Lab Tools

[<VPIcon icon="fas fa-globe"/>Yellow Lab Tools](https://yellowlab.tools/), is a free tool for auditing web performance, but it also includes some very helpful helpers for **measure the complexity of your CSS** — and also provides actionable insights into how to resolve these issues.

![[<VPIcon icon="fas fa-globe"/>Yellow Lab Tools](https://yellowlab.tools/) highlights plenty of CSS issue, along with actionable recommendations.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b61a4ee5-44c8-44fb-8c15-f7ae6ed88f08/2-css-complexity-bad-css.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b61a4ee5-44c8-44fb-8c15-f7ae6ed88f08/2-css-complexity-bad-css.png)

The tool highlights **duplicated selectors and properties**, old IE fixes, old vendor prefixes and redundant selectors, along with complex selectors and syntax errors. Obviously, you can dive deep into each of the sections and study which selectors or rules specifically are overwritten or repeated. That’s a great option to discover some of the low-hanging fruits and resolve them quickly.

![[<VPIcon icon="fas fa-globe"/>Yellow Lab Tools](https://yellowlab.tools/) also shows duplicated selectors and how often they are duplicated, so you can check them immediately.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e893b895-2cf2-4f18-a083-6dc1b787dbeb/3-duplicated-selectors.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e893b895-2cf2-4f18-a083-6dc1b787dbeb/3-duplicated-selectors.png)

We can go a bit deeper though. Once you tap into the overview of old vendor prefixes, you can not only check the offenders but also **which browsers** these prefixes are accommodating for. Then you can head to your [Browserslist configuration (<VPIcon icon="iconfont icon-github"/>`browserslist/browserslist`)](https://github.com/browserslist/browserslist) to double-check if you aren’t serving too many vendor prefixes, and test your configuration on [<VPIcon icon="fas fa-globe"/>Browsersl.ist](https://browserl.ist/) or via Terminal.

---

## CSS Specificity Visualizer

[<VPIcon icon="fas fa-globe"/>CSS Specificity Visualizer](https://isellsoap.github.io/specificity-visualizer/) provides an overview of CSS selectors and their specificities across a CSS file. Once you submit a stylesheet, the tool returns a specificity graph. The x-axis shows the physical location of selectors in the CSS, laid out from left to right, with the first one on the left, and the last one on the right. The y-axis shows the actual **specificity of selectors**, starting with the least specific at the bottom and ending with the most specific at the top.

![[<VPIcon icon="fas fa-globe"/>Specificity Visualizer](https://isellsoap.github.io/specificity-visualizer/) provides a visual way to analyze the specificity of CSS selectors in your stylesheets.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b8859e3e-37a4-4db8-9426-a81bf7622408/specificity-graph.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b8859e3e-37a4-4db8-9426-a81bf7622408/specificity-graph.png)

In general, **high specificity is usually a red flag**, so watch out for a spiky graph and high amount of noise. On the other hand, an upward-trending graph with overall low specificity and low amount of noise can be considered “good”. You can also hover over single data points to see the exact selector or zoom into areas of interest.

---

## Project Wallace

Unlike other tools, [<VPIcon icon="fas fa-globe"/>Project Wallace](https://projectwallace.com/), created by Bart Veneman, additionally keeps the history of your CSS over time. You can use webhooks to [<VPIcon icon="fas fa-globe"/>automatically analyze CSS on every push](https://projectwallace.com/blog/automatically-analyze-css-on-every-push/) in your CI. The tool tracks the state of your CSS over time by looking into specific CSS-related metrics such as **average selector per rule**, maximum selectors per rule and declarations per rule, along with a general overview of CSS complexity.

![[<VPIcon icon="fas fa-globe"/>Wallace](https://projectwallace.com/) provides a thorough dashaboard on the complexity of your CSS, along with a few custom metrics.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/128fa8b4-643a-45f2-a37b-aabd7fececf1/4-complexity.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/128fa8b4-643a-45f2-a37b-aabd7fececf1/4-complexity.png)

---

## Parker

Katie Fenn’s [Parker (<VPIcon icon="iconfont icon-github"/>`katiefenn/parker`)](https://github.com/katiefenn/parker) is a command-line stylesheet analysis tool that runs metrics on your stylesheets and reports on their complexity. It runs on Node.js, and, unlike CSS Stats, you can run it to measure your local files, e.g. as a part of your build process.

---

## DevTools CSS Auditing

Of course, we can also use DevTools’ [<VPIcon icon="fas fa-globe"/>CSS overview](https://umaar.com/dev-tips/209-css-overview/) panel. (You can enable it in the “Experimental Settings”). Once you capture a page, it provides an overview of media queries, colors and font declarations, but also highlights **unused declarations** which you can safely remove.

Also, [<VPIcon icon="fa-brands fa-google"/>CSS coverage](https://developers.google.com/web/tools/chrome-devtools/coverage) returns an overview of unused CSS on a page. You could even go a bit further and [<VPIcon icon="fas fa-globe"/>bulk find unused CSS/JS with Puppeteer](https://willmanntobias.medium.com/how-to-bulk-find-unused-css-and-javascript-with-puppeteer-and-chrome-coverage-f79f7d885d59).

![Exploring the amount of used and unused CSS and JavaScript, with Code Coverage.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e75a1874-f431-44e9-87a3-993593580ded/06-useful-devtools-tips-shortcuts.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e75a1874-f431-44e9-87a3-993593580ded/06-useful-devtools-tips-shortcuts.png)

With “Code coverage” in place, going through a couple of scenarios that include a lot of tapping, tabbing and window resizing, we also [export coverage data (<VPIcon icon="fa-brands fa-x-twitter"/>`chromedevtools`)](https://x.com/chromedevtools/status/1286663677240737793) that DevTools collects as JSON (via the export/download icon). On top of that, you could use Puppeteer that also provides an [<VPIcon icon="fas fa-globe"/>API to collect coverage](https://pptr.dev).

We’ve highlighted some of the details, and a few further **DevTools tips in Chrome**, Firefox, and Edge in [**Useful DevTools Tips And Shortcuts**](/smashingmagazine.com/useful-chrome-firefox-devtools-tips-shortcuts.md) here on Smashing Magazine.

---

## Style Check

How do you usually check the effect of your CSS on HTML elements? Directly in your project or do you have a dedicated test HTML file that includes all HTML elements you’re using to see all the styling at a glance? Austin Gill created a little tool that takes a similar approach: [<VPIcon icon="fas fa-globe"/>Style Check](https://style-check.austingil.com/). The benefit: You won’t need to set up a test HTML file yourself, the tool does it for you.

![Check the effect of your styling on HTML elements.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/635b59f5-e615-4ba6-be9e-2ba520666bf9/stylecheck-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/635b59f5-e615-4ba6-be9e-2ba520666bf9/stylecheck-opt.png)

Just upload your *.css* file to Style Check to audit its effect on plain HTML elements. You can also select a library (Bedrocss, Bootstrap, Eric Meyer’s CSS Reset, and Normalize.css are available) or enter inline styles. The elements range from headings and paragraphs to media, lists, and tables, buttons, forms, as well as other kinds of input, and details such as sub- and superscript, code, quotes, and much more. A handy little helper.

---

## What Tools Are You Using?

Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to **expensive layout recalculations**. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write [<VPIcon icon="fas fa-globe"/>slightly more efficient CSS selectors](https://csswizardry.com/2011/09/writing-efficient-css-selectors/).

These are just a few tools that we’ve discovered — we’d love to hear your stories and your tools that work well to identify the bottlenecks and fix CSS issues faster. Please **leave a comment** and share your story in the comments!

You can also [<VPIcon icon="fas fa-globe"/>subscribe to our friendly email newsletter](https://smashingmagazine.com/the-smashing-newsletter/) to not miss next posts like this one. And, of course, happy CSS auditing and debugging!

::: info Further Reading

- [**Why Optimizing Your Lighthouse Score Is Not Enough For A Fast Website**](/smashingmagazine.com/why-optimizing-lighthouse-score-not-enough-fast-website.md)
- [**Mastering Typography In Logo Design**](/smashingmagazine.com/mastering-typography-in-logo-design.md)

```component VPCard
{
  "title": "In Praise Of The Basics",
  "desc": "What does it mean to learn the “basics”, or fundamentals, of front-end web development? Is starting with HTML and CSS still the best entry point to learn how to make websites and apps when we have a seemingly endless supply of frameworks? Geoff Graham thinks so and discusses why you might consider going “back to basics” to start or move forward in your career.",
  "link": "/smashingmagazine.com/in-praise-of-the-basics.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Overflow Issues In CSS",
  "desc": "You may have come across horizontal scrollbar issues, especially on mobile, if you’re a front-end developer. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill. In this article, Ahmad Shadeed will explore the causes of overflow issues and how to solve them. We will also explore how modern features in the developer tools (DevTools) can make the process of fixing and debugging easier.",
  "link": "/smashingmagazine.com/css-overflow-issues.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Auditing Tools",
  "desc": "Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to expensive layout recalculations. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write slightly more efficient CSS selectors. In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers to get their work done better and faster. Starting out with a few tools for getting to the bottom of CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-auditing-tools.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
