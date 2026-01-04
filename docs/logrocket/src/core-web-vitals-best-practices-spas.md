---
lang: en-US
title: "Core Web Vitals best practices for SPAs"
description: "Article(s) > Core Web Vitals best practices for SPAs"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Core Web Vitals best practices for SPAs"
    - property: og:description
      content: "Core Web Vitals best practices for SPAs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/core-web-vitals-best-practices-spas.html
prev: /programming/js/articles/README.md
date: 2022-11-18
isOriginal: false
author:
  - name: Brian De Sousa
    url : https://blog.logrocket.com/author/briandesousa/
cover: /assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Core Web Vitals best practices for SPAs"
  desc="Google Web Vitals will soon play a major role in how your site is ranked in search. Learn the best practices for SPAs."
  url="https://blog.logrocket.com/core-web-vitals-best-practices-spas"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/banner.png"/>

Web Vitals is a Google initiative that seeks to define a common set of quality signals to measure user experience across the web. One of the initiative’s goals is to make it easier for website owners to measure site performance without extensive experience in performance engineering.

![Google Web Vitals SPS Nocdn](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/banner.png)

Here, we take a look at Google’s Web Vitals initiative, explore the Core Web Vitals in depth, and look at how we can measure and optimize the Core Web Vitals in single-page apps (SPAs).

---

## What are the Web Vitals?

Google’s Web Vitals initiative consists of:

- A set of guidelines on how website performance and user experience should be measured
- A series of metrics, referred to as Web Vitals, that measure certain events and interactions that frequently impact user experience
- A set of tools and libraries that simplify the process of measuring Web Vitals
- A commitment to surface Web Vitals through Google’s most popular tools

There are currently five Web Vitals:

1. Cumulative Layout Shift (CLS)
2. First Input Delay (FID)
3. Largest Contentful Paint (LCP)
4. First Contentful Paint (FCP)
5. Time to First Byte (TTFB)

CLS, FID, and LCP are considered Core Web Vitals. A Core Web Vital is intended to apply to all webpages irrespective of how those webpages are built. It’s an ambitious goal, considering all the different types of webpages out there. We’ll take a closer look at how each Core Web Vital applies to single-page apps (SPAs).

---

## Available tools for monitoring Core Web Vitals

Despite their relatively short lifespan, a variety of tools and packages can already be used to measure Core Web Vitals — and the list keeps growing. Here are a few of the more common tools:

- [<VPIcon icon="fa-brands fa-google"/>Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report): This report can be used to measure Core Web Vitals based on field data from real users who have opted in to allow Chrome to collect and share this data
- [<VPIcon icon="fa-brands fa-google"/>PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/): This tool can be used to measure Core Web Vitals using field data sourced from the Chrome User Experience Report as well as lab data collected and analyzed by Google in a controlled environment
- [<VPIcon icon="fa-brands fa-google"/>Core Web Vitals report on the Google Search Console](https://support.google.com/webmasters/answer/9205520): The Google Search Console provides a Core Web Vitals report for each of your registered web properties
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome DevTools](https://developer.chrome.com/blog/new-in-devtools-88/): Starting with Chrome 88, the DevTools **Performance** tab includes a Web Vitals lane that displays some of the Core Web Vitals scores
- [<VPIcon icon="iconfont icon-webdev"/>Lighthouse](https://web.dev/lighthouse-whats-new-6.0/): Lighthouse 6.0 (also available in Chrome DevTools) can generate reports that include Web Vitals metrics
- [web-vitals (<VPIcon icon="iconfont icon-github" />`GoogleChrome/web-vitals`)](https://github.com/GoogleChrome/web-vitals): This is a JavaScript library that can be integrated into your web app. It includes a simple set of functions that capture Core Web Vital events and data
- [<VPIcon icon="iconfont icon-logrocket"/>LogRocket](https://logrocket.com): LogRocket correlates Web Vitals metrics with business impact. In addition to monitoring Web Vitals, LogRocket monitors page load times, CPU/memory usage, browser crashes, and React component rendering

### Adding the web-vitals library to a single-page app

The web-vitals npm package has recently been added to some web app scaffolders by default. For example, if you’ve got a React app made with a recent version of [<VPIcon icon="fa-brands fa-react"/>Create React App](https://reactjs.org/docs/create-a-new-react-app.html), then the web-vitals package is already included in your solution.

Otherwise, head over to the [<VPIcon icon="fa-brands fa-npm"/>`web-vitals` package page on npm](https://npmjs.com/package/web-vitals), where there are detailed instructions on how to install and configure the package in your application.

---

## Measuring and improving Core Web Vitals scores for SPAs

As we look more closely at each of the Core Web Vitals, we will also use a few of these tools in action. We’ll use the [Northern Getaway Backyard Solutions (<VPIcon icon="iconfont icon-github" />`briandesousa/web-vitals-demo`)](https://github.com/briandesousa/web-vitals-demo/tree/main) sample SPA to simulate situations that result in weak Web Vitals. The source code for the sample app is [available on GitHub (<VPIcon icon="iconfont icon-github" />`briandesousa/web-vitals-demo`)](https://github.com/briandesousa/web-vitals-demo).

The Northern Getaway Backyard Solutions demo app was generated using Create React App, so no additional web-vitals package setup was required. For convenience, Core Web Vitals scores are displayed at the top of the app as they become available:

![Northern Getaway Backyard-solutions Demo App Homepage](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/northern-getaway-backyard-solutions-demo-app-homepage.png)

Web Vitals scores displayed at the top of the demo app.

Keep in mind that Web Vitals scores will differ between users due to variables like network connection speed, device type, screen resolution, browser window size, and more. If you’re following along with the demo app opened on your device, you should expect Web Vitals scores to differ, but the results should nonetheless be similar.

### Cumulative Layout Shift (CLS)

Cumulative Layout Shift quantifies the visual stability of a webpage. Perhaps the most relatable example of layout shift involves on-page advertisements. Most users have found themselves reading content on a webpage only to have the text shift down and sometimes even off screen as advertisements are loaded and inserted into the page. This sort of uncomfortable user experience is what CLS attempts to measure.

The [Layout Stability API (<VPIcon icon="iconfont icon-github" />`WICG/layout-instability`)](https://github.com/WICG/layout-instability) is a specification that defines how CLS is measured and what is considered to be a layout shift. According to this specification, not all layout shifts count towards the CLS score. For example, CSS transforms or a user scrolling a page do not affect the CLS score.

CLS scores start at 0. The original CLS scoring algorithm increased CLS as elements shifted in the viewport until the next page load event. This algorithm could have led to unreasonably high CLS scores for long-lived pages like single-page apps. Imagine a single-page app with client-side routing. Each route change displays new content, which is the expected behavior, yet the CLS score continually increases.

In response, on 7 April 2021, Google [<VPIcon icon="iconfont icon-webdev"/>announced a modification](https://web.dev/evolving-cls/) to the CLS scoring algorithm to provide better scoring for long-lived pages. With this modification, layout shift will be grouped into 5s (maximum) windows, with a 1s gap between each window. Each layout shift window is measured per the Layout Stability API. On the subsequent page load event, the window with the highest CLS score becomes the previous page’s CLS score.

Let’s take a look at a layout shift example. Navigate to the [<VPIcon icon="fas fa-globe"/>Our Work](https://briandesousa.github.io/web-vitals-demo/#/ourwork) page of the Northern Getaway Backyard Solutions demo app. Once the page has fully loaded, reload the page to view the CLS score. Remember that CLS can only be measured after the next page load event has occurred. The CLS score you see now reflects the layout shift that occurred on the previous page.

![Images on the Our Work page moving as they load.](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/nortthern-getaway-backyard-solutions-cli-score.gif)

The Our Work page simulates loading images asynchronously on a slow internet connection. Image dimensions have not been specified in the code. As each image loads, previously loaded images move around within the viewport, which can be classified as layout shift. Keep in mind that the CLS score will vary depending on how much of the page is visible in the viewport.

The resultant CLS score is approximately 1.06, which is not good — in fact, according to Google’s CLS score scale, anything over 0.25 is considered poor.

So how do you improve the CLS score of the Our Work page? The solution is quite simple in this case. If you define a width and height on each image, the browser will know how much space to allocate for the image. The browser is able to determine exactly where each image will appear on screen before it loads.

#### Common sources of layout shift

We looked at a single example of layout shift in the previous example, but there are many other sources of layout shift. Here are a few common sources and solutions:

::: info Source of layout shift

An image or video with unknown dimensions

**Solution(s)**

- Define a width and height on the image or video element so the browser can reserve space in the viewport and avoid layout shift

:::

::: info Source of layout shift

A font that renders larger or smaller than the fallback font

**Solution(s)**

- Use the `font-display` style to tell the browser to use the fallback font in the event that a primary font is not yet available when text elements are rendered
- Pre-load fonts required upfront using the `rel="preload"`, `as="font"`, and `type=font/woff2` attributes on the font link element to tell the browser to pre-load and prioritize the font download

:::

::: info Source of layout shift

A third-party ad or widget that dynamically resizes itself

**Solution(s)**

- This can be difficult to solve if the ad or widget doesn’t provide dimensions. Some ads intentionally cause a layout shift. Try to reserve space when possible
- Test your CLS score with ads enabled and disabled to get an idea of how much your ads impact your CLS score. You may need to use lab data rather than field data for this test, but it might still give you a rough idea of where the worst layout shift is happening on your pages

:::

### Largest Contentful Paint (LCP)

Largest Contentful Paint measures the load time of a page’s main content. The idea is that a user perceives how quickly a webpage loads by how quickly the page’s main content becomes visible. Once the main content is visible, the user feels like the page has loaded even though smaller peripheral elements may still be loading.

The page’s main content is determined by identifying the largest image or text block visible in the browser viewport. The block could be an image, a video, a block element containing text, or even a background image loaded via CSS.

The [<VPIcon icon="fas fa-globe"/>Largest Contentful Paint API](https://wicg.github.io/largest-contentful-paint/) defines a full list of allowable elements. This list is intentionally short and concise to keep the metric simple. The API also specifies how an element’s size is calculated, taking into account elements that are only partially visible in the viewport and other similar nuances.

Let’s take a look at an LCP example. Navigate to the [<VPIcon icon="fas fa-globe"/>Home](https://briandesousa.github.io/web-vitals-demo) page of the Northern Getaway Backyard Solutions demo app. After about 4s, the page should be fully loaded. Tap or click anywhere on the screen to force the browser to report LCP. After that first interaction with the page, it no longer makes sense to continue to track and report on LCP since subsequent interactions could intentionally alter what is visible on the page.

![Demo App Measuring Lcp Homepage](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/demo-app-measuring-lcp-homepage.png)

The LCP score came in at approximately 0.9s. Keep in mind that LCP scores will vary based on network speed and how large the browser viewport is. In this case, the browser was fully expanded on a laptop screen with 1920×1080 resolution.

Something’s not right here! The Home page is specifically designed to load the main block of text after 4s, yet the LCP score is 0.9s. On the surface, it seems that the block of text is the largest block on screen, and therefore, the LCP score should be 4,000 (4s) or higher. Strictly based on measurements, the main text block is certainly larger than the header:

![Comparing the sizes of the text block and header block on the Home page.](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/lcp-text-block-larger-home-page.png)

We can use Lighthouse in Chrome DevTools to see what’s displayed on screen when LCP is reported. Open the demo app and DevTools in Chrome. Follow these steps to generate a Lighthouse report with Web Vitals:

1. Switch to the **Lighthouse** tab
2. Disable the **Simulated throttling** option so that metrics reported by Lighthouse are comparable to metrics displayed on the page
3. Select the **Performance** category
4. Click the **Generate report** button

![Lighthouse in Chrome DevTools.](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/lighthouse-tab-disable-simulated-throttling-generate-report.png)

Once the report has been generated, click on the **View Trace** button.

![Report Generates View Trace Button](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/report-generates-view-trace-button.png)

Lighthouse report.

Scroll horizontally on the **Timings** swim lane until you locate the LCP marker. Expand the **Frames** swim lane to see a screenshot of the page at the moment the LCP was reported.

![Timings Swim Lane Lcp Marker Lighthouse Report](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/timings-swim-lane-lcp-marker-lighthouse-report.png)

LCP marker on Lighthouse report.

The screenshots prior to and after the LCP marker suggest that the header block is what’s driving the LCP score. We can prove this by temporarily updating the app’s source code to hide the header and then rerun the Lighthouse report.

![Lighthouse Report Lcp Marker Hiding Header](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/lighthouse-report-lcp-marker-hiding-header.png)

LCP marker on Lighthouse report after hiding the header.

The LCP score is now roughly 4.5s, or roughly the amount of time that the main text block takes to appear on screen. Let’s look at the source code for the main text block:

```jsx
<div className={`${contentLoaded ? '' : 'hidden'}`}>
  <h2>Welcome backyard dweller!</h2>
  <p>Is your backyard in disarray?</p>
  <p>Do you peek over your neighbor's fence and think 'I wish I had that'?</p>
  <p>Are you tired of looking out your back window at the same old turf paradise?</p>
  <p>You have arrived at the right place. We here at Northern Getaway Backyard Solutions want to turn your vomit-inducing embarrassment of a backyard into the ultimate pandemic-era getaway.</p>
  <p>We will work with you to develop a masterful architectural plan to turn your dreams into reality. Then we will start to clear out the cob<strong>web</strong>s and re<strong>vital</strong>ize your backyard space.</p>
  <p>The best part is that we will only take a modest cut of all that cash you have managed to save up throughout the pandemic.</p>
  <p>Check out <a href="/#/ourwork">our work</a> to see it and believe it!</p>
</div>
```

If you recall, LCP is based on the how long it takes for the largest block-level element to be rendered in the viewport. In the sample source code, each of the paragraph elements are block-level elements. LCP is actually being reported due to the rendering of one of those paragraph elements, whichever is largest. It’s also important to note that the LCP API does not include padding or margins in its calculations.

#### LCP applicability to single-page apps

Just like other Web Vitals, LCP is only measured initially when the page is loaded. Consider a single-page app with client-side routing and asynchronous content loading. The first route in the application may load very quickly.

As soon as the user interacts with the webpage — to navigate to a different route, for instance — the LCP score is reported. At this point, Web Vitals will not track LCP for subsequent client-side route changes. Depending on how the app is designed, LCP may offer limited value for measuring user experience.

#### Fixing poor LCP scores

The Home page example simulated slow-loading content. In a real-world scenario, this content could be coming from a backend API that is frequently under heavy load and unable to respond within a reasonable amount of time. There are many possible fixes for this scenario, including:

1. Scale up the capacity of your API so that it can handle expected volumes
2. Ensure the API is returning responses with appropriate HTTP cache headers so that subsequent responses can be served from the browser cache
3. If the content being returned from the API is relatively static, add a CDN service in front of the API to serve cached responses from servers located closer to your users

### First Input Delay (FID)

First Input Delay measures how quickly a page responds to a user’s first interaction. Other Web Vitals tend to focus on how quickly a user sees something on the screen, but this metric focuses on the initial interaction with the page and what the user perceives. It’s great if your page loads and renders extremely fast, but the UX may still be poor if users are unable to immediately interact with the page.

FID can be difficult to understand at first. It measures the time between when a user first clicks or taps on a page to the time that the browser is actually able to start handling the resultant event — but not how long it takes for the app to do what it must when that event is raised.

For example, let’s assume a user’s first interaction with a webpage is clicking a button. The browser is unable to respond to the click event for 100ms because its main thread is busy executing JavaScript initiated on page load. Once the browser is able to respond, the click event takes an additional 200ms to complete. The reported FID would be 100ms.

Let’s take a look at some sample FID scores on the Northern Getaway Backyard Solutions demo app. Navigate to the [<VPIcon icon="fas fa-globe"/>Get Estimate](https://briandesousa.github.io/web-vitals-demo/#/getestimate) page. Click on the **Estimate Type** dropdown to force FID to be reported.

![Sample FID Scores Get Estimate Page](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/sample-fid-scores-get-estimate-page.png)

Measuring FID on the Get Estimate page.

The FID score is approximately 1.6ms, which is far lower than the ≥100ms score Google considers poor. This is about as good as it gets. The Get Estimate page doesn’t really have much happening behind the scenes; the user can interact with the form nearly instantaneously once it becomes visible in the browser.

Let’s add the following CPU-intensive event handler to the click event on the **Email Address** field. Do you think the FID score will be affected?

```js
function doSomethingSlow() {
  console.time('onClick event handler');
  const baseNumber = 12;   
  let result = 0; 
  for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {    
    result += Math.atan(i) * Math.tan(i);
  };
  console.log(`result was ${result}`);
  console.timeEnd('onClick event handler');
};
```

Reload the [<VPIcon icon="fas fa-globe"/>Get Estimate](https://briandesousa.github.io/web-vitals-demo/#/getestimate) page. Before clicking on the page, open Chrome DevTools so that the console is visible. Click on the **Email Address** text box. The browser will lock up for 4–5s while the CPU-intensive function executes. Once the function completes, the FID score will appear at the top of the screen, and the function result will appear in the DevTools console.

![Get Estimate Page Reload Email Address Box](/assets/image/blog.logrocket.com/core-web-vitals-best-practices-spas/get-estimate-page-reload-email-address-box.png)

Measuring FID on the Get Estimate page with a CPU-intensive function.

This time, the FID score came in at about 1.49ms, even lower than the 1.6ms from the previous example. This demonstrates that FID does not include the time it takes to execute the event handler itself.

#### Measuring FID

You measure FID scores differently from how you’d measure other Core Web Vitals. LCP and CLS can be measured in a lab environment using a variety of tools, but FID can only be measured in the field with real users.

To measure FID at test time, Google recommends that you look at the Total Blocking Time (TBT) Web Vital instead. Although TBT isn’t the same as FID, it does provide some insight into long tasks that block the main thread for more than 50ms prior to the page being ready for user interaction. Any of these long tasks could result in a poor FID score in the field.

To measure FID in the field, you need to use tools that are capable of accessing data collected from real users who have interacted with the page. Page Speed Insights can pull data from the Chrome User Experience Report to provide an overall FID score for the page. This assumes there have been enough users accessing the page who have also opted in to provide their data to the Chrome User Experience report.

#### FID applicability to single-page apps

Just like the other Web Vitals, FID is only measured on the first interaction with the page. FID will not identify poor user experiences on subsequent interactions on the page or interactions on subsequent routes in a single-page app that uses client-side routing.

Not being able to interact with elements on screen can be extremely frustrating to users, especially since users may not be able to determine whether the lockup is due to the page itself or their browser or system locking up. Depending on your situation, it might make sense to implement custom FID monitoring on all client-side route changes.

#### Fixing poor FID scores

First Input Delay and main thread blocking can be caused by a number of things. Here are a few examples and potential solutions:

- If you have complex and/or large amounts of JavaScript downloaded and run on first page load, consider breaking it up, lazy-loading components, and generally simplifying your solution if possible. Remember that all JavaScript is parsed, compiled, and executed on the main thread
- If your webpage is loading third-party scripts, analyze FID scores and consider whether these scripts may be contributing to poor scores
- Large amounts of data processing and storage in the browser can lead to heavy main-thread usage. Consider reducing the amount of data loaded into memory on initial page load and in general
- [**Consider using a Web Worker**](/blog.logrocket.com/how-to-improve-interface-responsiveness-with-web-workers.md) to run long tasks on a separate background thread. This can free up capacity so that the main thread can respond more quickly to user interaction events

---

## Core Web Vitals summary

The table below summarizes each of the Core Web Vitals.

::: info Core Web Vital

Cumulative Layout Shift (CLS)

**Definition**: The visual stability of your webpage determined by the amount of layout shift when the page initially loads

**How it’s measured**

- CLS is measured from the time a page loads until the next page load is triggered
- CLS scores start at 0 (best possible score) and increment as elements shift on screen
- A CLS score of ≥0.25 is considered poor
- Only visible layout shifts cause the CLS score to increment
- CSS transforms and user scrolling do not impact the CLS score
- After 9 April 2021, tools that calculate CLS will start to adopt Google’s modified CLS algorithm, which groups layout shift into time-based windows, resulting in a more reasonable CLS scoring approach for single-page apps

:::

::: info Core Web Vital

Largest Contentful Paint (LCP)

**Definition**: The amount of time it takes to load the largest element on screen

**How it’s measured**

- LCP is measured in seconds from the time a page begins loading until the largest element is rendered
- An LCP score of ≥4s is considered poor
- Only a subset of elements is considered when calculating LCP, including images, CSS background images, and block-level text elements
- LCP is reported as soon as a user interacts with the page, even if the page has not fully loaded

:::

::: info Core Web Vital

First Input Delay (FID)

**Definition**: The amount of time between the user’s first interaction with a page and the browser’s response to that interaction

**How it’s measured**

- FID is measured from when a user clicks or taps a page to when the browser triggers the resultant event handler. The time it takes for the event handlers to complete does not impact the FID score
- An FID score of ≥100ms is considered poor
- Scrolling or zooming a page does not trigger an FID score
- FID is still be measured even if an interaction doesn’t trigger an event handler; FID scores are not available in tools that only analyze lab data (e.g., Lighthouse)
- FID scores are available in tools that have access to field data (e.g., Page Speed Insights)

:::

---

## What’s next for Web Vitals?

There are [active discussions (<VPIcon icon="iconfont icon-github" />`GoogleChrome/web-vitals`)](https://github.com/GoogleChrome/web-vitals/issues/119) between the Google Chrome team and SPA developers regarding the applicability of Core Web Vitals to single-page apps. Some of those discussions have already led to changes, particularly the [<VPIcon icon="iconfont icon-webdev"/>evolution of CLS](https://web.dev/evolving-cls/). Google has also indicated that the Core Web Vitals are expected to evolve over time. We may see new Web Vitals rise to prominence and add to or replace existing Core Web Vitals.

Support for Web Vitals outside of Google tools continues to grow. A quick search for Web Vitals-related packages on npm [<VPIcon icon="fa-brands fa-npm"/>yielded 27 results](https://npmjs.com/search?q=web-vitals&page=1&perPage=20) at the time of writing. These search results include packages that integrate with some of today’s most popular frontend libraries and frameworks, including React, Vue.js, Nuxt.js, and Gatsby.

Perhaps the biggest hint that Web Vitals are here to stay is the fact that Google is set to include Web Vital metrics in page experience signals that contribute to how Google ranks search results. Google appears to be all in on Web Vitals; this all but guarantees some longevity to this method of measuring user experience.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Core Web Vitals best practices for SPAs",
  "desc": "Google Web Vitals will soon play a major role in how your site is ranked in search. Learn the best practices for SPAs.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/core-web-vitals-best-practices-spas.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
