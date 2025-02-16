---
lang: en-US
title: "Mastering Interaction to Next Paint (INP)"
description: "Article(s) > Mastering Interaction to Next Paint (INP)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Mastering Interaction to Next Paint (INP)"
    - property: og:description
      content: "Mastering Interaction to Next Paint (INP)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/mastering-interaction-to-next-paint-inp.html
prev: /programming/css/articles/README.md
date: 2024-11-05
isOriginal: false
author:
  - name: Todd Gardner
    url : https://frontendmasters.com/blog/author/toddgardner/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4318
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
  name="Mastering Interaction to Next Paint (INP)"
  desc="Learn how Interaction to Next Paint (INP) measures web interactivity, why it matters for user experience and SEO, and practical strategies to keep your site feeling fast and responsive."
  url="https://frontendmasters.com/blog/mastering-interaction-to-next-paint-inp/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4318"/>

The web keeps changing—and so do the ways we measure web performance. Google recently updated its **Core Web Vitals** metrics, dropping First Input Delay (FID) in favor of a new and improved interaction metric: Interaction to Next Paint (INP).

FID was a step in the right direction, measuring how quickly a site responds to the first interaction. But it fell short by focusing only on that initial action, leaving out every click and type that follows. It also emphasized blocking time over total processing time, missing the real story behind user experience.

How is INP different? We'll dive into exactly what it's measuring, how to diagnose it, and, most importantly, how to fix it so your website interactions feel fast and responsive.

---

## What “Interaction to Next Paint” Measures

INP monitors every interaction a user makes with a page—whether it's a click, tap, or key press. It measures the time it takes for each of these interactions to trigger a visible change, or **“next paint,”** on the screen, capturing every millisecond from receiving the input to updating the display.

Over the lifetime of a page, there should (hopefully) be lots of user interactions. Your INP score is determined by the **“worst” interaction** on the page—the one with the longest delay until a response.

It may sound harsh, but it's realistic. If just one interaction lags, that's what users remember. By focusing on the most significant delays, INP spotlights the interactions that need the most attention to create a truly responsive experience.

To hit a good INP score, a page needs to respond to every interaction in under 200 milliseconds.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/inp_score_ranges.png?resize=1024%2C256&ssl=1)

---

## Why INP Matters

INP directly measures a website's interactivity—how responsive the site feels to users as they interact. We've all had that frustrating experience of clicking a button, only to have nothing happen right away. Suddenly, you're wondering if the click registered or if you need to try again. That's the feeling of poor interactivity.

When interactions lag, users feel like the site is “slow,” “laggy,” or even “broken.” It's a surefire way to frustrate users, lose engagement, and damage credibility.

And if that's not enough, INP is one of Google's Core Web Vitals and a factor in SEO rankings. Google doesn't want to send search traffic to laggy sites, so it penalizes pages that fail their INP scores.

---

## Understanding INP Measurement in Detail

Before we dive into tactics to fix INP, it's important to understand how INP is measured. If you're looking for even more details, [check out this deep dive on Interaction to Next Paint](https://requestmetrics.com/web-performance/inp-interaction-to-next-paint/).

### Interactions

INP measures the response time for all **discrete interactions**—like clicks, taps, drags, and key presses—that users make while on the page. These actions initiate user commands and usually lead to some form of visual feedback, so tracking them is essential for accurately gauging a site's interactivity.

One common action that **doesn't** factor into INP, however, is **scrolling**. Scrolling is typically continuous rather than discrete and has its own performance considerations outside of INP's scope.

### The INP Measurement Window

INP measures everything that happens between a user interaction and the next paint event, and a lot can occur in that window. Here's how it breaks down:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/inp_measurement_window.png?resize=1024%2C266&ssl=1)

1. **Input Delay**: When the interaction event is triggered, the browser may already be busy, for instance, executing an obnoxious amount of JavaScript. Since JavaScript can block the main thread, the browser has to wait until it's finished before it can even start processing the interaction. This waiting period is the **input delay**.
2. **Event Handling**: Once the main thread is free, the browser can dispatch the event to any associated event handlers—and there could be quite a few. Each event handler needs to be called and completed before moving forward.
3. **Rendering**: After all JavaScript is done executing, the browser can calculate what changed in the DOM, update elements and layout, and finally paint the next frame to the viewport.

### INP and Long Animation Frames (LoAF)

INP is closely related to **Long Animation Frames (LoAF)**, as both metrics capture user responsiveness and visual feedback. LoAF measures the time between paint events, regardless of whether an interaction happened, indicating if the browser may have felt “frozen” to the user.

A slow INP is often accompanied by a Long Animation Frame, which can provide more details on the scripts or activities causing delays. For more information, check out this [<FontIcon icon="fas fa-globe"/>detailed guide on Long Animation Frames](https://requestmetrics.com/web-performance/long-animation-frame-loaf/).

---

## How to Improve Your INP Score

Improving your INP score means reducing the time users wait for visible feedback after they interact. Here are some strategies to make sure your site responds quickly:

- **Yield to the Main Thread**: Avoid monopolizing the main thread with long-running tasks. When you block the main thread, user interactions get stuck waiting. Breaking up heavy tasks with `setTimeout` or `requestAnimationFrame` can reduce delays and keep the main thread open for user input.
- **Optimize JavaScript**: Large JavaScript bundles are often the main culprit for interaction delays. Reduce bundle size through code-splitting, lazy-loading, and minifying to improve response times. Only load what's necessary at each stage of the user journey.
- **Reduce Long Animation Frames (LoAF)**: A poor INP score often coincides with Long Animation Frames, so addressing LoAF can directly improve INP. This includes avoiding intensive calculations during animations and syncing visuals with the browser's rendering cycle.

Implementing these strategies can bring down your INP score, keeping interactions responsive and making your site feel faster and more polished.

### Example INP Fix

Let's have a look at a specific example. Below is a [CodePen with a simple form (<FontIcon icon="fa-brands fa-codepen"/>`toddhgardner-the-selector`)](https://codepen.io/toddhgardner-the-selector/pen/yLmKKVV) that includes a JavaScript event handler triggered each time the user types, changing the class on the button.

<CodePen
  user="toddhgardner"
  slug-hash="yLmKKVV"
  title="Interaction to Next Paint Demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In this example, the JavaScript handler also calls a slow function, `renderSearch`, each time the event fires. Since `renderSearch` is part of the event handler, it slows down the entire animation frame and causes both LoAF and INP issues by blocking the main thread for too long.

Here's how to fix it:

<CodePen
  user="toddhgardner"
  slug-hash="bGXvvjp"
  title="Interaction to Next Paint Demo - Solution"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In our fix, we wrapped the event handler in `requestAnimationFrame`, which delays execution until just before the next paint. Then, we adjust the button class immediately, while the heavier work in `renderSearch` is delayed with `setTimeout` so it won't execute until after the paint is complete. This approach prioritizes responsiveness and keeps user feedback snappy by yielding to the main thread.

---

## Wrapping Up

Interaction to Next Paint (INP) gives us a more complete view of web interactivity by tracking every user interaction throughout a page's lifecycle. With INP replacing FID as a Core Web Vital, optimizing for it has never been more critical. A strong INP score not only improves user satisfaction by keeping interactions fast and responsive but also boosts your SEO by aligning with Google's performance standards.

By implementing strategies like yielding to the main thread, optimizing JavaScript, and addressing Long Animation Frames, you can create a smoother, more responsive experience for users. As you tackle these improvements, Real User Monitoring tools like [<FontIcon icon="fas fa-globe"/>Request Metrics](https://requestmetrics.com/) can help you track INP and other Core Web Vitals in real-time, showing exactly where delays are occurring and how effective your fixes are.

Making your website interactive and smooth isn't just about performance scores—it's about ensuring users have a seamless experience on your site. With INP insights and a focus on responsiveness, you can keep users engaged, happy, and coming back for more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mastering Interaction to Next Paint (INP)",
  "desc": "Learn how Interaction to Next Paint (INP) measures web interactivity, why it matters for user experience and SEO, and practical strategies to keep your site feeling fast and responsive.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/mastering-interaction-to-next-paint-inp.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
