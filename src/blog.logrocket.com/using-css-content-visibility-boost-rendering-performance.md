---
lang: en-US
title: "Using CSS content-visibility to boost your rendering performance"
description: "Article(s) > Using CSS content-visibility to boost your rendering performance"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using CSS content-visibility to boost your rendering performance"
    - property: og:description
      content: "Using CSS content-visibility to boost your rendering performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance.html
prev: /programming/css/articles/README.md
date: 2023-11-08
isOriginal: false
author:
  - name: Rob O'Leary
    url : https://blog.logrocket.com/author/rob-oleary/
cover: /assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/banner.png
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
  name="Using CSS content-visibility to boost your rendering performance"
  desc="CSS content-visibility helps boost rendering performance by controlling whether or not an element renders its contents."
  url="https://blog.logrocket.com/using-css-content-visibility-boost-rendering-performance"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/banner.png"/>

`content-visibility` is a CSS property that controls whether or not an element renders its contents. It enables the browser to bypass layout and rendering work for elements not immediately needed by a user. This can make the initial page load faster.

![Using CSS Content-Visibility To Boost Your Rendering Performance](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/banner.png)

The `content-visibility` property is part of the [<FontIcon icon="fas fa-globe"/>CSS Containment Specification](https://drafts.csswg.org/css-contain/), whose objective is to improve performance.

In this article, we will dive into the benefits and practical use cases of the `content-visibility` CSS property, as well as situations where it might not be the most suitable option. But first, we’ll lay the groundwork with an exploration of the fundamentals of rendering.

![Demo Of An App Where We Can Optimize Performance By Reducing Work On Content Outside The Viewport](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/demo-app-optimize-performance-reducing-work-content-outside-viewport.jpeg)

---

## A quick guide to rendering

Rendering is the process of transforming the code of a webpage into pixels that a user can see in the web browser.

When you enter a URL in the address bar of a browser and fire off a request for a webpage, a series of events are kicked off. There are some technical background processes, but the main event is to download the resources that make up the webpage, such as the HTML file, font files, and CSS files.

The part of the process that relates most to our discussion of rendering performance is what happens after the HTML file has been loaded in the browser. Google refers to this process as the [<FontIcon icon="iconfont icon-webdev"/>rendering pixel pipeline](https://web.dev/rendering-performance/). The areas involved are:

1. **JavaScript**: JavaScript can be used to do things that result in visual changes, such as adding DOM elements to the page
2. **Style**: This is the process of deciding which CSS rules apply to which elements. Once rules are known, they are applied and the final styles for each element are calculated
3. **Layout**: Once the browser has applied the style rules to an element, it can begin to calculate how much space it takes up and its position on the screen. The layout of one element can affect other elements. For example, the width of the `<body>` element typically affects its children’s widths all the way down the tree, a process that can be quite intensive
4. **Paint**: Painting is the process of filling in pixels. It involves drawing the visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers
5. **Compositing**: When parts of the page are drawn into multiple layers, they need to be drawn to the screen in the correct order so that the page renders correctly. The layers can be painted independently but overlapping elements require more careful work

It’s important to understand that the rendering pixel pipeline is a transformative series of operations — the result of the previous operation is carried into the next operation to create new data. Updating the rendering pipeline is costly, so if we can skip an area, it can have a positive impact on performance.

Google has color-coded and categorized the areas as follows:

- **Scripting**— yellow covering the JavaScript area
- **Rendering** — purple covering the Style and Layout areas
- **Painting** — green covering the Paint and Composite areas

![Pixel Pipeline<br/>Image credit: [<FontIcon icon="iconfont icon-webdev"/>Web.dev under CC BY 4.0 license](https://web.dev/articles/rendering-performance)](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/pixel-pipeline.jpeg)

This facet of categorization is significant because this is how they are visually represented in the **Performance** tab of Chrome’s DevTools. You can see the matching color encoding in the summary pane below:

![DevTools Performance Tab](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/devtools-performance-tab.jpeg)

DevTools can be used to tell us if we have realized performance gains. We can compare recorded sessions of a page’s performance before and after changes have been made. If you are unsure how to profile performance, you can consult [<FontIcon icon="fa-brands fa-chrome"/>the docs on analyzing runtime performance](https://developer.chrome.com/docs/devtools/performance/).

If you read articles from Google on `content-visibility`, you might find that the term “rendering” is used in different contexts. Some tutorials may be talking about the rendering of a webpage, or the category that you see in Chrome’s DevTools that includes the style and layout areas.

Overloading the term like this can be a source of confusion. In this tutorial, we will follow the definition of rendering that we introduced at the start of this section.

---

## What is CSS Containment?

The goal of the [<FontIcon icon="fas fa-globe"/>CSS Containment Specification](https://drafts.csswg.org/css-contain/) is to improve the performance of webpages by allowing the browser to isolate a portion of the page (DOM subtree) from the rest of the page. Containment enables much more powerful optimizations by browsers because it limits how widely a given change can affect a document.

The reason that developers have to intervene is that the browser can’t accurately guess by itself if parts of a page are independent. The specification defines the `contain` and `content-visibility` properties to give developers the capability to identify isolated parts of the page.

There are four types of containment:

- **Size**: Size containment on an element ensures that the element’s box can be laid out without needing to examine its descendant to determine its size. For example, if an element has `width: 100px` and `aspect-ratio: 1/1` and `overflow: hidden`, its descendants will not influence its size, so we don’t need to examine them
- **Layout**: The element [<FontIcon icon="iconfont icon-w3c"/>has an independent formatting context](https://w3.org/TR/css-display-3/#establish-an-independent-formatting-context). This allows us to potentially skip the layout of the descendants if all we want to do is lay out other boxes
- **Style**: Style containment ensures that properties do not affect elements outside of the container. Counters are an example of properties that can do this. The style of the `counter-increment`, `counter-set` , and `content` properties must be scoped to the container. This allows us to potentially skip style computation for the descendants if all we need is to compute styles on other elements
- **Paint**: Paint containment ensures that the descendants of the containing box don’t display outside its bounds. This allows us to potentially skip painting the descendants if the element is outside of the viewport.

The `contain` property tells the browser what type of containment an element has. It may be hard to figure out which containment values to use for different use cases. But this article won’t dive any deeper into the `contain` property — we’ll be looking at `content-visibility`, which can apply containment to an element automatically. It ensures that you get the largest performance gains the browser can provide with minimal effort from you as a developer.

---

## Why use `content-visibility`?

The `content-visibility` property enables the browser to skip an element’s layout and painting until it is needed, which makes the initial page load faster. Because the browser does not have to re-render the DOM or page layout as often, this can result in performance benefits over the entire lifecycle of a page or web app.

---

## `content-visibility` drawbacks

To reap the benefits of the `content-visibility` property, you may need to reorganize your HTML into sections. This may not be a big deal for you, but it may be more work than anticipated if some styles are broken by restructuring your page. Just keep in mind that it is not the case that simply adding the `content-visibility` property to any page will magically improve performance.

Additionally, the `content-visibility` property may introduce scrollbar jumping when sections come into the viewport and are fully rendered. The height of an element outside of the viewport may be zero or may have an estimated size applied to it through the `contain-intrinsic-size` property. When the styles are applied to an element as it comes into view, it may grow or shrink the element, which will resize the page and affect the scrollbar length.

From my exploration, you can incur a performance penalty by applying `content-visibility` to a section that is relevant to the user (on-screen, focused, or selected), similar to lazy loading with the `loading` attribute in HTML.

As a result, you may need to tweak styles to ensure the browser considers something off-screen. The [<FontIcon icon="fas fa-globe"/>CSS Containment Spec](https://drafts.csswg.org/css-contain/#:~:text=overflow%20clip%20edge%20intersects) says that an element is onscreen if the “[<FontIcon icon="iconfont icon-w3c"/>overflow clip edge](https://w3.org/TR/css-overflow-3/#overflow-clip-edge) intersects with the viewport, or a browser-defined margin around the viewport.”

It is not clear what the value of the browser-defined margin is — there is a possibility that something may be off-screen to the user, but the browser considers it on-screen because of this fine, unknown margin! However, this is literally an edge case.

One of the features of `content-visibility: auto` is that off-screen content is available in the DOM and the accessibility tree. The flip side of this is that [<FontIcon icon="iconfont icon-w3c"/>landmark](https://w3.org/TR/wai-aria-1.1/#landmark_roles) elements with style features such as `display: none` or `visibility: hidden` will also appear in the accessibility tree when off-screen because the browser won’t render these styles until they enter the viewport. To prevent these from being visible in the accessibility tree as you may expect, you will need to manually add `aria-hidden="true"`.

It is good to keep in mind that CSS Containment is a new concept and people are unlikely to know how to use it. In the [<FontIcon icon="fas fa-globe"/>State of CSS 2023 survey](https://2023.stateofcss.com/en-US/features/#reading_list) reading list, it was the third most featured item. We can deduce from this that there is awareness of the property, but people haven’t gotten around to learning it yet!

During the maintenance of a codebase in a team, people can alter the HTML of a page unaware that their change has affected containment conditions, which undoes the performance gains accrued from using `content-visibility`. After all, it is a new concept, so it won’t always be front of mind for people to check.

---

## When to consider `content-visibility` in a project

Performance is a tricky topic because it often involves tradeoffs. It is becoming more common to set a [<FontIcon icon="fa-brands fa-firefox"/>performance budget](https://developer.mozilla.org/en-US/docs/Web/Performance/Performance_budgets) to be explicit about the decisions you have made and the rationale you followed. Ideally, you will be confident that you’ll achieve your performance goals before you build something, but none of us have a crystal ball!

As you build something for the web, you may find that you are falling below your desired performance thresholds. Is this the time to reach for `content-visibility`? Or should you be using it as a common practice and factor the savings in beforehand?

It is difficult to draw a general conclusion here because this is new territory for CSS. The question is: do we treat `content-visibility` as a performance optimization technique or do we treat it as a common practice?

In the optimization camp, you don’t use the property until you need it. Otherwise, you’re in premature optimization territory. The trouble there is that you won’t actually notice the poor performance unless you are actively testing on the lowest-specced devices available.

In the common practice camp, you could use `content-visibility` almost everywhere. Potentially any page could benefit from using the property when you have content that is off-screen, but the payoff will vary. You will need to draw a line somewhere to be practical. You may want to focus on larger pages where the payoff is greater.

In any case, you should be considerate of how you use the `content-visibility` property. If there is a lot of churn in the layout or contents of a page, it is probably better to defer using `content-visibility` until that part is in a more stable state. You need to be sure something is off-screen and will be targeted correctly.

I think that this would be easier to manage in a component-driven frontend where the encapsulation of fragments of a page is more explicit. Containment and web components are complementary in their pursuit of identifying independent pieces of a webpage. Conversely, if your content is written in Markdown, it is likely that your document has fewer identifiable sections and it is more challenging to use `content-visibility`.

---

## How to use `content-visibility`

The `content-visibility` property accepts one of three values:

- `visible`: An element’s contents are laid out and rendered as normal. This is the default
- `auto`: The element turns on layout containment, style containment, and paint containment. If the element is not relevant to the user, it also skips its contents. The skipped contents are accessible to the browser
- `hidden`: The element skips its contents. The skipped contents are not accessible to browser-affected elements and are not available to browser features such as find-in-page, and tab order navigation

You may need to use the [<FontIcon icon="fa-brands fa-firefox"/>`contain-intrinsic-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size) property alongside `content-visibility` to realize performance gains associated with size containment.

### Specifying the size of an element with `contain-intrinsic-size`

To realize the potential benefits of `content-visibility`, the browser needs to apply size containment. Size containment allows the browser to lay out an element as though it has a fixed size, preventing unnecessary [<FontIcon icon="fa-brands fa-firefox"/>reflows](https://developer.mozilla.org/en-US/docs/Glossary/Reflow) by avoiding the re-rendering of child elements to determine the actual size.

By default, size containment treats elements as though they have no content, and may collapse the layout in the same way as if the contents had no width or height. This means that the element will lay out as if it were empty. The `contain-intrinsic-size` property allows developers to specify an appropriate value to be used as the size for layout.

If you are not sure of the exact dimensions of an element, there is an `auto` keyword for `contain-intrinsic-size` that can help. The `auto <length>` value allows you to supply a placeholder value as the second number.

For example, if you specified `contain-intrinsic-size: auto 500px`, the element will start out with a 500px intrinsic width and height. When the element comes into view and its contents are rendered, it will change to the actual rendered intrinsic size:

```css
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

Any subsequent rendering size changes will also be remembered. In practice, this means that if you scroll an element with `content-visibility: auto` applied, and then scroll it back off-screen, it will automatically retain its ideal width and height, and not revert to the placeholder sizing.

### Hiding content with `content-visibility: hidden`

Applying `content-visibility: hidden` to an element keeps the contents unrendered regardless of whether or not it is on-screen. It is up to you to change the value to `visible` in order for the user to see it when needed.

For me, the use cases for this are not super clear. Perhaps you can accrue benefits in UI patterns that involve revealing contents such as disclosure widgets and hidden nav menus.

I could see single-page applications (SPAs) benefitting from it, where inactive app views can be left in the DOM with `content-visibility: hidden` applied to them cached with the rest of the page. This can make a view quick to render when it is activated again.

Would you use `content-visibility: hidden` over `display:none`? Let’s compare it to other common ways of hiding an element’s contents to evaluate the differences:

- `display: none`: Hides the element and destroys its rendering state. Unhiding the element is expensive because it renders a new element with the same contents
- `visibility: hidden`: Hides the element and keeps its rendering state. It still occupies space on the page and can be clicked on. It also updates the rendering state any time it is needed, even when hidden

---

## Practical example: A landing page

I want to explore how the `content-visibility` property can be applied to different sections of a typical webpage and demonstrate what the impact on performance is. I will explore two different use cases in the subsequent subsections:

1. Something that is always hidden — the website’s main navigation menu, in this case
2. The major sections that are off-screen when the page is loaded

The example is a landing page for the artist [<FontIcon icon="fa-brands fa-wikipedia-w"/>Angèle](https://en.wikipedia.org/wiki/Ang%C3%A8le_(singer)), coded by [Rafaela Lucas (<FontIcon icon="fa-brands fa-codepen"/>`rafaelavlucas`)](https://codepen.io/rafaelavlucas/pen/BaBVWyL). It is of typical size with five major sections (hero, tour dates, videos, album, follow):

<CodePen
  user="rafaelavlucas"
  slug-hash="BaBVWyL"
  title="Daily UI #003 - Landing Page"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![Angele Landing Page](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/angele-landing-page.png)

I will audit the desktop performance for these scenarios to understand the outcomes. I ran a performance audit to establish a baseline, which I refer to as the default. You can see how I did that in the video below using the Chrome DevTools incognito mode:

<VidStack src="/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/audit-perf.mp4" />

You can find the code for this example in this [GitHub repo (<FontIcon icon="iconfont icon-github"/>`robole/content-visibility-css-property-exploration`)](https://github.com/robole/content-visibility-css-property-exploration), where I also explored scenarios and examples not discussed here.

### Use case A: Applying `content-visibility` to a hidden section

The website navigation section (main navigation) is hidden by default. You must click on the hamburger menu to open it:

![Hidden Nav Menu](/assets/image/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance/hidden-nav-menu.jpeg)

First, I added `content-visibility:auto;` to the menu and found that the performance was worse (see scenario A2 in table below). I was a bit surprised:

```css
.menu {
  content-visibility:auto;
}
```

Then, I added `content-intrinsic-size`. Because the menu has a fixed size (100vw by 100vh), I could provide the exact dimensions. This pushed the performance in the other direction and resulted in a small improvement in both rendering and painting (see scenario A3 in the table below):

```css
.menu {
  content-visibility: auto;
  content-intrinsic-size: 100vw 100vh;
}
```

Finally, using `content-visibility:hidden` was worse than scenario A3 (see scenario A4 in table below):

```css
.menu {
  content-visibility: hidden;
}
```

Based on these scenarios, we can conclude that you can achieve a small gain in performance when you use `content-visibility:auto` along with `content-intrinsic-size` on a hidden element like this. However, it is probably not worth pursuing this type of marginal gain unless you want things really optimized.

Here is a table of the auditing results:

| **Name** | **Scenario** | **Loading** | **Scripting** | **Rendering** | **Painting** | **System** | **Idle** | **Total** |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| A1 | Default | 21 | 6 | 114 | 30 | 178 | 4608 | 4957 |
| A2 | Nav main menu has `content-visibility:auto` applied to it | 34 | 7 | 181 | 82 | 212 | 4479 | 4995 |
| A3 | Nav main menu with content-visibility:auto and content-intrinsic-size: 100vw 100vh; specified. | 22 | 6 | 106 | 22 | 128 | 4715 | 4999 |
| A4 | Nav main menu with `content-visibility:hidden` specified. | 30 | 7 | 144 | 21 | 155 | 4752 | 5109 |

### Use case B: Applying `content-visibility` to off-screen sections

There are three major sections that are initially off-screen. Let’s apply `content-visibility:auto` to them:

```css
.videos,
.album,
.follow {
  content-visibility: auto;
}
```

There was a significant improvement in rendering and painting of about 40% (see scenario B2 in the table below).

When I added `contain-intrinsic-size`, the performance also improved significantly (see scenario B2 in the table below). However, it was marginally worse than scenario B2. It would be better to omit `contain-intrinsic-size` in this case. This contrasts with results from scenarios A2 and A3. The summary of the auditing results is below:

| **Name** | **Scenario** | **Loading** | **Scripting** | **Rendering** | **Painting** | **System** | **Idle** | **Total** |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| B1 | Default | 21 | 6 | 114 | 30 | 178 | 4608 | 4957 |
| B2 | Lower 3 sections have `content-visibility:auto` applied. | 19 | 5 | 61 | 11 | 145 | 4744 | 4985 |
| B3 | Lower 3 sections have `content-visibility:auto` and `contain-intrinsic-size` specified. | 23 | 5 | 64 | 16 | 137 | 4673 | 4918 |

---

## Is `content-visibility` ready for general usage?

At the time of writing, the `content-visibility` property is [<FontIcon icon="fas fa-globe"/>only available](https://caniuse.com/?search=content-visibility) in Chrome, Edge, and Opera.

It is in Firefox behind a flag. The CSS Containment Specification is slated to be adopted by all major browsers as a focus area of [<FontIcon icon="iconfont icon-webdev"/>Interop 2023](https://web.dev/interop-2023/).

There are cases where you can treat usage as a progressive enhancement. I could not find a polyfill, so you may have to skip it if this is essential for you.

---

## Comparison with other performance optimization techniques

There are plenty of existing techniques to boost web performance. You will need to evaluate if `content-visibility` is complementary or not with the other techniques you deploy. Here are a couple that come to mind.

### Comparing `content-visibility` with lazy loading

Lazy loading does not request the resource (`img` or `iframe`) until it is needed. However, for `content-visibility: auto`, the browser will still request the data, but it just won’t render it.

The number of network requests and the volume of data sent over the wire are two of the most significant factors affecting page loading speed. In this regard, lazy loading would usually offer bigger performance gains than adding `content-visibility: auto` to some sections.

In theory, you can use both. However, I haven’t seen usage of this in the wild, so I can’t say if you would encounter any issues.

### Comparing `content-visibility` with React Virtualized

React Virtualized is a library for [**efficiently rendering large lists and tabular data**](/blog.logrocket.com/rendering-large-lists-react-virtualized.md). This library presents only the required rows and indicates the presence of other hidden rows via CSS styles. It manipulates the DOM elements to remove past elements and add new elements that come into view.

React Virtualized only loads the data that is needed, whereas `content-visibility: auto` loads all of the data but skips rendering. These are not complementary techniques when applied to the same elements.

---

## Conclusion

The `content-visibility` property and CSS containment offer valuable performance-boosting power to CSS. For the landing page example I explored, I was able to reduce rendering and layout by approximately 40 percent.

On the surface, usage looks straightforward — you get performance gains by using just two properties! However, it is challenging to apply them correctly to your code if you know little about web performance. You can hamper performance if you aren’t careful.

Using `content-visibility` comes with its own set of considerations and potential challenges. First, it might require you to restructure your content into distinct sections to prevent issues like scrollbar inconsistencies as content becomes visible on the screen. Additionally, there are accessibility concerns that need to be addressed. I realized that it’s crucial to carefully monitor performance, as the results were often not what I was expecting.

Embarking on this journey brings about various questions about the division of responsibilities within a team. As the knowledge required for frontend development continues to expand, who should take the lead on this — is it the UI engineer, aka “the CSS guy”? Or should an architect or a performance specialist be responsible?

As our product continues to grow and evolve, we must establish a method to regularly review these properties to ensure they are indeed optimizing — rather than hindering — our performance.

::: info Further information

```component VPCard
{
  "title": "CSS Containment Module Level 2",
  "desc": "Specification - content-visibility section",
  "link": "https://drafts.csswg.org/css-contain/#content-visibility",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<SiteInfo
  name="CSS containment - CSS: Cascading Style Sheets | MDN"
  desc="The CSS containment module defines containment and container queries."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<VidStack src="youtube/FFA-v-CIxJQ" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using CSS content-visibility to boost your rendering performance",
  "desc": "CSS content-visibility helps boost rendering performance by controlling whether or not an element renders its contents.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-css-content-visibility-boost-rendering-performance.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
