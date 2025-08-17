---
lang: en-US
title: "How to eliminate render-blocking resources — CSS and JavaScript"
description: "Article(s) > How to eliminate render-blocking resources — CSS and JavaScript"
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
      content: "Article(s) > How to eliminate render-blocking resources — CSS and JavaScript"
    - property: og:description
      content: "How to eliminate render-blocking resources — CSS and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript.html
prev: /programming/css/articles/README.md
date: 2025-04-04
isOriginal: false
author:
  - name: Anna Monus
    url : https://blog.logrocket.com/author/annamonus/
cover: /assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/banner.png
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
  name="How to eliminate render-blocking resources — CSS and JavaScript"
  desc="Use Lighthouse to eliminate render-blocking resources, which block the first paint of your page, in both CSS and JavaScript."
  url="https://blog.logrocket.com/eliminate-render-blocking-resources-css-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/banner.png"/>

Render-blocking resources are CSS stylesheets and JavaScript files that block the first paint of your page. To eliminate them, consider the following to improve page speed and boost SEO:

- Inlining critical CSS
- Deferring non-critical CSS and scripts
- Lazy loading and splitting your JS bundles
- Caching or self-hosting third-party scripts
- Removing unused styles and lines of code

![How to eliminate render-blocking resources — CSS and JavaScript](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/banner.png)

When a user loads your webpage, the browser must process various resources, including CSS and JavaScript, before rendering any content on the screen. Some of these resources can block the first paint of your page, thus impacting its initial page load. In this article, we’ll explore how to identify and eliminate render-blocking resources using Lighthouse.

---

## What are render-blocking resources?

Render-blocking resources are CSS stylesheets and JavaScript files that block the first paint of your page. When the browser encounters a render-blocking resource, it stops downloading the rest of the resources until these critical files are processed. In the meantime, the entire rendering process is put on hold.

Resources considered as render blocking include:

- Script tags in the `<head>` of the document
- Script tags without the `defer` or `async` attribute
- Linked stylesheets that do not have the `disabled` attribute, thus requiring the stylesheet to be downloaded
- Linked stylesheets that do not have the `media` attribute specific to the user’s device

Eliminating render-blocking resources is crucial for improving [**Google’s Core Web Vitals**](/blog.logrocket.com/core-web-vitals-best-practices-spas.md) performance metrics. The web vitals metrics impact search rankings and user experience. Metrics like First Contentful Paint (FCP) and Largest Contentful Paint (LCP) are particularly sensitive to delays caused by render-blocking CSS and JavaScript.

::: note Editor’s note

This article was updated by [<FontIcon icon="fas fa-globe"/>Ivy Walobwa](https://blog.logrocket.com/author/ivywalobwa/) in April 2025 to include the most up-to-date strategies for the quick elimination of render-blocking resources in both CSS and JavaScript, and provide updated tools and real-world examples.

:::

---

## Tools to analyze render-blocking resources

Several free performance metrics tools allow you to identify and analyze render-blocking resources. Choosing the right tool depends on factors such as the kind of data you want to use, whether field or lab data. Lab data is collected in a controlled environment and is used for debugging issues. Field data is used for capturing real-user experience, but with a more limited set of metrics.

The most common tools include:

- [<FontIcon icon="iconfont icon-lighthouse"/>Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)— Built into Chrome Developer Tools and gives a lab-based performance audit in mobile and desktop views
- [<FontIcon icon="fas fa-globe"/>PageSpeed Insights](https://pagespeed.web.dev/)— Reports field data and Lighthouse lab test scores in both desktop and mobile views
- [<FontIcon icon="fas fa-globe"/>GTmetrix](https://gtmetrix.com/) — Reports field data and Lighthouse lab test scores with custom audits in desktop view

When running tests on these tools, you’ll often find that the metrics reported don’t match up exactly. Each tool has differences in hardware, connection speed, locations, screen resolutions, and test methodology. We’ll use Lighthouse to improve the performance of a site with different speeds on mobile and desktop views.

After [**running an audit on Lighthouse**](/blog.logrocket.com/lighthouse-and-how-to-use-it-more-effectively.md), you’ll see suggestions to improve site performance, such as `Eliminate render-blocking resources` — as shown in the image below:

![running an audit on lighthouse](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/1_running-audit-lighthouse.png)

The following sections will dive into how to eliminate the render-blocking resources by optimizing CSS and JS delivery.

---

## Critical and non-critical resources

To eliminate render-blocking resources, it’s essential to identify which resources are needed to render the critical part of your page: above-the-fold content. Critical resources are necessary for rendering the first paint of your page, while non-critical resources apply to content that is not immediately visible. Non-critical resources can be deferred or loaded asynchronously to improve performance.

The [<FontIcon icon="fa-brands fa-chrome"/>Coverage tab](https://developer.chrome.com/docs/devtools/coverage) on Chrome DevTools allows you to visualize critical and non-critical CSS and JS. It shows you how much code was loaded and how much is unused. In the image below, the red marking shows non-critical code while the grey marking shows critical code:

![lighthouse code coverage](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/2_red-markings-non-critical-code.png)

You can click on the URL to better look at the critical and non-critical lines of code and optimize their delivery:

![critical and non-critical resources](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/3_click-on-URL.png)

---

## Optimizing CSS delivery

Efficient handling of critical CSS is essential for improving page load performance and reducing render-blocking resources. Some CSS optimization techniques include inlining critical CSS, deferring non-critical CSS, and removing unused CSS.

### Inlining critical CSS

Critical styles required for the first paint are added to a `<style>` block in the `<head>` tag. Click on a CSS resource on the **Coverage** tab to see the critical and non-critical styles. The styles marked in grey are extracted and put in the `<head>` tag of the page:

```html
<head>
...
<style>
...
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
}
...
</styles>
</head>
```

![inlining critical css](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/4_inclining-critical-css.png)

### Deferring non-critical CSS

The non-critical CSS, marked in red, is then loaded asynchronously using the `preload` link or using CSS media types and media queries.

We add the `link rel="preload" as="style"` attributes to request the stylesheet asynchronously, then add the `onload` attribute to process the CSS when the stylesheet finishes loading. For browsers that don’t execute JavaScript, we add the stylesheet inside the `noscript` element:

```html
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

To utilize CSS media types and media queries, we add the `media` attribute with `print`. Stylesheets that are declared in this format are applied when the page is being printed and are loaded with low priority; hence, they are not marked as render-blocking. The `onload` attribute is used to further load the styles dynamically based on screen size:

```html
<link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">
```

The process of extracting and inlining critical CSS and deferring non-critical CSS can be automated with tools such as [<FontIcon icon="iconfont icon-github"/>`addyosmani/critical`](https://github.com/addyosmani/critical/blob/master/README.md).

Based on configurations added when using Critical, it can extract critical CSS for you and add the styles to your document head. It also loads the remaining stylesheet asynchronously using CSS media types and media queries:

```html
<style>
      /* inline critical CSS */
</style>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&amp;display=swap" rel="stylesheet" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="lib/swiper.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="lib/fontawesome.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="css/spinner.css" media="print" onload="this.media='all'">
```

It’s good practice to add screen-specific styles to separate style sheets and load them dynamically based on the screen size:

```html
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)" onload="this.media='all'">
```

Applying the techniques above removes render-blocking CSS and improves the page performance significantly, from 31% to 41%:

![render blocking css eliminated](/assets/image/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/5_render-blocking-eliminated.png)

### Removing unused CSS

From the **Coverage** tab on Chrome DevTools, you can identify unused styles and manually remove them.

You can also use tools like [**PurgeCSS**](/blog.logrocket.com/purgecss-remove-unused-css-code.md) that check your CSS code and remove any unused selectors from it. This is useful, especially when using third-party libraries such as Bootstrap and Font-awesome.

To further improve the performance of your page, you can make use of [<FontIcon icon="fa-brands fa-firefox"/>CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Using_CSS_containment). CSS containment allows the browser to isolate a subtree of the page from the rest of the page. This is essential to fix performance issues such as layout shifts:

```css
article {
  /* the strict value is a shorthand for applying all the containment types (size, layout, style, and paint) to the element. */
  contain: strict;
}
```

---

## Optimizing JavaScript delivery

To eliminate render-blocking JavaScript, use the `defer` or `async` attributes in your `<script>` tag, especially with third-party scripts. This will ensure that your JavaScript code is loaded asynchronously while your HTML is being parsed.

The `async` attribute downloads the scripts asynchronously while HTML parses and executes the scripts as soon as they are downloaded. This can potentially interrupt HTML parsing. The `defer` attribute downloads scripts asynchronously but defers their execution until HTML parsing is completed:

```html
<script async src="bundle.js"></script>
<script defer src="bundle.js"></script>
<script async defer src="bundle.js"></script>
```

Lazy loading and code splitting can be implemented to optimize your app’s performance when loading JavaScript modules.

Lazy loading involves loading JavaScript modules only when needed, thus removing the need to load all scripts on first paint. Code splitting involves breaking down a large script bundle into smaller chunks that are loaded on demand. Both these approaches reduce the time taken for the first page render. You can follow our guides on [**lazy loading**](/blog.logrocket.com/understanding-lazy-loading-javascript.md) and [**code splitting**](/blog.logrocket.com/tree-shaking-and-code-splitting-in-webpack.md) to learn how to implement them and the best practices.

Loading third-party scripts can slow down your page performance. Some of the fixes to try to improve performance include:

- Load the scripts using the `async` or `defer` attributes
- Consider self-hosting the scripts. Although self-hosted scripts don’t get automatically updated, you have control of how the scripts load, which you can leverage to improve performance
- Consider caching third-party scripts using [**service workers**](/blog.logrocket.com/implementing-service-workers-next-js.md#what-service-workers)
- Lazy load third-party scripts
- Remove unused code

You can explore the JavaScript optimization tricks mentioned above and more from [**this article**](/blog.logrocket.com/8-tips-reduce-unused-javascript.md).

---

## Frequently asked questions

### What if I want to use a WordPress optimization plugin?

For websites built with CMS, plugins offer a convenient way to optimize and manage render-blocking resources without extensive manual coding. Here are some examples of plugins available for different CMS platforms:

- **WordPress** — Autoptimize, W3 Total Cache
- **Joomla** — JCH Optimize, Cache Cleaner
- **Drupal** — Advanced CSS/JS Aggregation, Asset Injector
- **Shopify** — SEO Manager, MinifyMe

These plugins can optimize various aspects of your website, including aggregating, minifying, and deferring resources, as well as improving caching mechanisms and enhancing overall performance.

To use these plugins effectively:

1. **Install and activate** — Search for the desired plugin in your CMS’s plugin directory, install it, and activate it
2. **Configure settings** — Adjust plugin settings according to your website’s needs. Some plugins offer options to aggregate, minify, and defer resources, while others may provide additional optimization features
3. **Test and monitor** — After configuring the plugin, test your website’s performance using tools like Lighthouse or GTmetrix. Monitor performance metrics to ensure the plugin is effectively reducing render-blocking resources without causing any issues

### Do you have other tricks to eliminate render-blocking resources for Font Awesome CSS?

To improve performance when using third-party style libraries like Font Awesome, you can consider these tricks:

- Download and load the minified stylesheet locally
- Subset Font Awesome and load only the used icons
- Ensure you’re loading only one version of Font Awesome

### How to eliminate render-blocking resources in Google Fonts?

To optimize Google Fonts loading, you can host them locally. You will need to download the font, upload the font to your project or server, and then use `@font-face` to reference the font in your CSS. To further improve speed, use `<link rel="preload">` to load fonts asynchronously.

### How to eliminate render-blocking resources without plugins?

If you’re not using plugins, you can manually optimize your site by:

- Inlining critical CSS and loading non-critical CSS asynchronously
- Deferring non-critical JS with `async` and `defer` attributes
- Using lazy loading and code splitting
- Minifying and compressing CSS and JS files
- Removing unused code

### What is the best plugin to eliminate render-blocking resources?

Some of the best WordPress plugins to eliminate render-blocking resources include:

- [**WP Rocket**](https://wp-rocket.me/): Automates CSS/JS optimization, including lazy loading and deferring JS
- [**Autoptimize**](https://wordpress.org/plugins/autoptimize/): Minifies and optimizes CSS, JS, and HTML efficiently
- [**Perfmatters**](https://perfmatters.io/):\ Disables unused scripts and improves overall performance

### How do I get rid of render-blocking resources in React JS?

To eliminate render-blocking resources in a React application, consider the following approaches:

- Code-splitting with `lazy()` and `Suspense` to load components only when needed
- Use dynamic imports (`import()` with Webpack) to defer loading of non-critical scripts
- Defer third-party scripts using the `async` or `defer` attributes
- Optimize CSS loading by inlining critical styles and lazy-loading non-essential CSS
- Use React Server Components (Next.js SSR) to improve load time and reduce blocking

---

## Practical considerations for implementation

While these strategies can help you eliminate render-blocking resources, thus improving web performance, it’s important to remember that some challenges may arise while implementing them. Here are some considerations to keep in mind:

### Prioritize testing and monitoring

Some techniques, like deferring non-critical CSS or asynchronously loading JavaScript, may be difficult to apply with third-party integrations. As it can be challenging to determine which resources are critical, always prioritize testing and monitoring to ensure everything on your website still works as expected.

### Ensure deep knowledge of your tech stack

When it comes to code splitting or removing unused code, a comprehensive understanding of the website’s technology stack and development environment is essential. This knowledge helps you avoid the accidental removal of critical code, ensuring the website’s functionality remains intact.

### Be aware of external dependencies

As websites often rely on third-party scripts, stylesheets, or services for functionality like analytics, advertising, or social media integration, the website’s ability to load or minify third-party resources may be limited by the requirements or limitations imposed by these external dependencies.

### Balance optimization and development

Optimizing web performance by eliminating render-blocking resources is a task that requires time, expertise, and development effort. However, it’s important to remember to balance these efforts with other development tasks. This ensures a holistic approach to website development, where all aspects are given due attention.

### Understand the trade-offs

Eliminating render-blocking resources may involve trade-offs or considerations that need to be carefully evaluated. For example, deferring non-critical CSS may improve initial page load times but could impact the perceived performance or user experience. Understanding these trade-offs is essential for making informed decisions.

---

## Conclusion

Eliminating render-blocking resources is just one step to improving the performance of your site. However, to achieve optimal speed and a seamless user experience, consider implementing lazy loading for images, minifying and compressing assets, leveraging a content delivery network (CDN), and optimizing JavaScript execution.

Regularly auditing your site with tools like Google Lighthouse can help identify new bottlenecks and guide further improvements.

For an in-depth guide to browser rendering, check out “[**How browser rendering works — behind the scenes**](https://blog.logrocket.com/how-browser-rendering-works-behind-the-scenes-6782b0e8fb10/).”

<!-- TODO: /blog.logrocket.com/how-browser-rendering-works-behind-the-scenes.md -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to eliminate render-blocking resources — CSS and JavaScript",
  "desc": "Use Lighthouse to eliminate render-blocking resources, which block the first paint of your page, in both CSS and JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/eliminate-render-blocking-resources-css-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
