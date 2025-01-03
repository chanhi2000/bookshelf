---
lang: en-US
title: "How to Optimize Next.js Web Apps for Better Performance"
description: "Article(s) > How to Optimize Next.js Web Apps for Better Performance"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Optimize Next.js Web Apps for Better Performance"
    - property: og:description
      content: "How to Optimize Next.js Web Apps for Better Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/optimize-nextjs-web-apps-for-better-performance.html
prev: /programming/js-next/articles/README.md
date: 2025-01-02
isOriginal: false
author:
  - name: Ayantunji Timilehin
    url : https://freecodecamp.org/news/author/timmy471/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1735828217839/b65374be-d891-4f19-a359-f84f2ac8f3b9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Optimize Next.js Web Apps for Better Performance"
  desc="As engineers, we often get so carried away with other aspects of development that we overlook how users perceive and interact with our applications. This oversight can result in users leaving the app almost as soon as they arrive, leading to higher b..."
  url="https://freecodecamp.org/news/optimize-nextjs-web-apps-for-better-performance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1735828217839/b65374be-d891-4f19-a359-f84f2ac8f3b9.png"/>

As engineers, we often get so carried away with other aspects of development that we overlook how users perceive and interact with our applications. This oversight can result in users leaving the app almost as soon as they arrive, leading to higher bounce rates and minimal engagement.

At its core, every business thrives on delivering value to its users. When users are unable to access this value due to poor performance, it ultimately impacts the business's success. Slow load times, among other factors, frustrate users and drive them away before they even get a chance to engage.

Optimizing performance is more than just a technical detail – it’s also a critical part of creating a successful application. Without it, even the best features can go unnoticed if users don’t stick around long enough to see them.

In this article, we’ll explore key approaches to optimize your Next.js application, making it faster and more efficient.

---

## Building a Performant Application

Making your apps more performant means striking the right balance between speed, responsiveness, and efficient use of resources. You should strive to create an application that delivers value and keeps users satisfied.

Building a performant app is about making sure the app feels smooth and intuitive so that there are no frustrating lags when a user clicks buttons, scrolls, or navigates around. You’ll also want to make sure that data loads or updates without unnecessary delays.

---

## How to Optimize Your Applications

The first step in optimizing your application is identifying problem areas. A number of tools and packages can help you analyze your application's performance effectively. Here's how you can use them:

### Using `npm run build`

When you run `npm run build`, Next.js creates a production-ready version of your application and gives a detailed breakdown of your pages. This includes:

- **Size**: The size of the JavaScript files for each route. Highlighting any routes that are too large and could slow things down. Smaller page sizes generally result in faster load times while large pages might take longer to download, especially for users with slower network connections.
- **First Load Js**: This column provides information about the total amount of JavaScript the browser needs to download and execute to fully render the page for the first time. Large **First Load JS** values cause Slower Time-to-Interactive (TTI).

![Running this command produces an analysis like below](https://cdn.hashnode.com/res/hashnode/image/upload/v1734639730677/cfd1f858-a9df-4e6c-af28-454857309156.png)

### Using <FontIcon icon="fa-brands fa-npm"/>`@next/bundle-analyzer`

The [bundle analyzer (<FontIcon icon="fa-brands fa-npm"/>`@next/bundle-analyzer`)](https://npmjs.com/package/@next/bundle-analyzer) is a package provided by Next.js to analyze the size of JavaScript bundles by providing a visual representation of the application’s module and dependencies. Here’s how to use the package:

First, install the package by running this command:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-npm"/>

```sh
npm install @next/bundle-analyzer
```

@tab <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @next/bundle-analyzer
```

:::

Then add the <FontIcon icon="fa-brands fa-npm"/>`@next/bundle-analyzer` configuration to your <FontIcon icon="fa-brands fa-js"/>`next.config.js` file:

```js title="next.config.js"
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // other Next.js config options here
});
```

To analyze your application bundles while generating a production build, run the following command:

```sh
ANALYZE=true npm run build
```

For a step-by-step guide on how to use the bundle analyzer effectively, check out this detailed [<FontIcon icon="fa-brands fa-youtube"/>video tutorial](https://youtu.be/EIGmcxwbbZw)

<VidStack src="youtube/EIGmcxwbbZw" />

### Browser tools

Finally, modern browsers, including Google Chrome, Firefox, and Edge, offer powerful tools to analyze and improve your application's performance. Features like the Performance Tab help you record and visualize how your application runs, pinpointing issues like slow rendering or long tasks.

You can also use tools like Lighthouse (available in Chrome and Edge) to generate automated audits, highlighting problems such as large assets and unoptimized resources.

To access the **Lighthouse** and **Performance** tabs:

1. Open your browser's developer tools by right-clicking anywhere on the browser and selecting the **Inspect** option or pressing <FontIcon icon="iconfont icon-macos"/><kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> or <FontIcon icon="fa-brands fa-windows"/><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>.
2. Look at the top menu in the developer tools.
3. If you don’t see the **Lighthouse** or **Performance** tabs right away, click the **double right arrow (>>)** to reveal hidden tabs.
4. Select the desired tab to start analyzing performance or generating a Lighthouse report.

![Here is an example of a generated audit in the Performance tab on Chrome](https://cdn.hashnode.com/res/hashnode/image/upload/v1735616911745/e5f09934-df99-40fc-b194-a292a21a4517.png)

![Here’s another image showing the generated audit by lighthouse](https://cdn.hashnode.com/res/hashnode/image/upload/v1735617075187/dfde608b-eeb7-443d-81c6-56ff2a6dd92b.png)

---

## Key Techniques to Optimize Performance

### 1. Using The Next.js `Image` Component

Images often account for the largest portion of page weight, directly affecting load times and user experience. Large images slow down rendering and ultimately, increase bandwidth usage.

Next.js has a built-in `Image` component that automatically optimizes images, making it very useful for web performance. It takes care of resizing, lazy loading, and format optimization, so images are served in the most performant format (like .WebP) when the browser supports it.

```jsx
import Image from 'next/image';

  <Image
    src="/house.jpg"
    alt="House Image"
    width={700}
    height={500}
    priority={false} // Lazy loads the image by default
  />
```

In the snippet above,

- `src="/house.jpg"`: This points to the image file's location, which is in the `public` folder. Images in the `/public` directory are served statically, so you don’t need extra configuration.
- `alt="House Image"`: The `alt` text (just like in the native HTML `image` element) provides a description of the image, which is great for accessibility (like screen readers) and also helps with SEO.
- `width & heigh`t: By explicitly setting the width and height, Next.js can calculate the space the image will occupy on the page before it loads. This prevents the page layout from shifting as the image loads, which improves user experience and boosts performance metrics like [<FontIcon icon="fas fa-globe"/>Cumulative Layout Shift](https://blog.hubspot.com/marketing/cumulative-layout-shift) (as shown in the image above).
- `priority={false}`: This ensures the image will only load when it's near the user's viewport conserving the bandwidth and improving page load times for non-critical images. However, for important images that should load immediately (like those visible as soon as the page opens), you can set `priority={true}` to bypass lazy loading and ensure the image loads as quickly as possible.

One of the key advantages of the Next.js `Image` component is its built-in **lazy loading** feature. This means that images won’t be loaded until they are actually needed (when they enter the viewport). By only loading images that are about to be viewed, performance is improved and pages can load faster, even with many high-quality images.

### 2. Optimizing Third-Party Scripts with the Next.js Script Component

Third-party scripts, such as analytics tools or advertising networks, can heavily affect your application's performance if not properly managed. Next.js has a **Script** component that makes it easy to load scripts efficiently, giving you control over how and when they load.

The `Script` component allows you to define a **loading strategy** for scripts, determining when and how they are fetched and executed. By prioritizing or deferring scripts based on their importance, you can improve the overall performance and user experience of your application.

- `beforeInteractive`: Use this strategy for scripts that must load before the page becomes interactive, like essential analytics or monitoring tools.
- `afterInteractive`: When you use this strategy, the script loads after the page becomes interactive, which is the default behavior. This is ideal for scripts that add functionality but aren’t essential for initial rendering.
- `lazyOnload`: Defers loading the script until all other page resources have finished loading. This is perfect for non-essential scripts like ads or social media widgets.

```jsx
<Script
  src="https://example.com/non-essential.js"
  strategy="lazyOnload"
/> //Pass the strategy as a prop to the component
```

By leveraging the Next.js `Script` component, you can prevent scripts from blocking critical rendering, reducing load times and improve [<FontIcon icon="fa-brands fa-firefox"/>Time to Interactive](https://developer.mozilla.org/en-US/docs/Glossary/Time_to_interactive) (TTI).

### 3. Remove Unused Packages/Dependencies

Over time, as you build and maintain your project, unused dependencies can pile up in your codebase. These unnecessary packages increase the size of your project, slow down installation times, and make the code harder to maintain. Cleaning up these unused dependencies is essential for optimizing your application's performance and keeping your codebase clean.

The [<FontIcon icon="fa-brands fa-npm"/>`depcheck`](https://npmjs.com/package/depcheck) tool is a great way to identify and remove unused dependencies from your project. It analyzes your <FontIcon icon="iconfont icon-json"/>`package.json` and the project files to find unused dependencies, unused devDependencies, and missing dependencies.

You can run a `depcheck` like this:

```sh
npx depcheck
```

After identifying the unused dependencies, you can remove them by running:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-npm"/>

```sh
npm uninstall <package-name>
```

@tab <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn remove <package-name>
```

:::

Regularly running `depcheck` is a simple yet effective way to keep your project clean and efficient.

### 4. Caching and Incremental Static Regeneration (ISR)

When you find yourself running the same calculations or database queries repeatedly, you should consider caching. It’s a simple yet powerful way to boost your web application's performance, especially for content that doesn’t change often. By storing frequently accessed data in a cache, you can avoid unnecessary processing and speed up load times.

In Next.js, you can take this a step further with Incremental Static Regeneration (ISR), which lets you serve static content instantly while keeping it fresh behind the scenes.

**Incremental Static Regeneration (ISR)** in Next.js lets you update static pages without rebuilding the whole site. Here's how it works:

1. **Build time generation**: ISR generates pages when the site is built.
2. **Caching**: It stores the pages so they load quickly when users visit.
3. **Background updates**: When content changes, ISR updates the pages behind the scenes without affecting users.
4. **Dynamic updates**: It combines the fast loading of static pages with the ability to update content regularly.

```js
export async function getStaticProps() {

  const data = await fetchData();

  return {
    props: { data },
    //regenerate the page every 20 seconds.
    revalidate: 20,
  };
}

//pre-render the page as static content
function MyPage({ data }) {
  return (
    <div>
      <h1>My Page</h1>
      <p>{data}</p>
    </div>
  );
}

export default MyPage;
```

### Caching Frequently Used Content

For websites with pages that get a lot of visitors, like product listings or blog posts, it's important to keep the content fast and up-to-date.

Caching helps achieve this by saving a copy of the page so it doesn't need to be created from scratch each time someone visits. The browser or server will store this cached page for a set amount of time, which is controlled by caching headers. Meanwhile, ISR (Incremental Static Regeneration) ensures that the page can be updated in the background when necessary, without needing to rebuild the entire site.

In applications with lots of data, caching can also speed up the process by storing API responses. This way, when users request the same data again, they can get it quickly from the cache instead of waiting for it to be fetched anew. Tools like Vercel and Content Delivery Networks (CDNs) help by storing these cached pages in multiple locations around the world, so visitors can access them faster.

```js
export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    // Regenerate page at most once every 30 seconds
    revalidate: 30,
    // Cache for 1 hour at the CDN level
    headers: {
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  };
}
```

Here, the page regenerates every 30 seconds and is cached at the CDN level for one hour. The `Cache-Control` header tells the CDN and browser to cache the page for 1 hour and revalidate it afterward.

For a deeper dive into caching and its role in web performance, check out this insightful [**freeCodeCamp article on Caching vs. Content Delivery Networks**](/freecodecamp.org/caching-vs-content-delivery-network.md).

### 5. Font Optimization With `next/font`

The `next/font` module in Next.js automatically handles font loading for improved performance, so you don’t need to manually configure or use extra libraries. It loads only the essential parts of the font, which results in faster page load times.

To further reduce the font file size, you can provide the `subsets` array which ensures fewer bytes are transferred and pages load quickly.

Here’s how it works:

- **Automatic font loading**: The module optimizes font loading automatically, making sure fonts are served in the most efficient way, improving performance without extra effort.
- **Subsetting fonts**: You can specify the exact font characters needed for your app.
- **Font display strategy**: The font-display strategy determines how text is shown to the user while fonts are loading. Next.js typically uses the `swap` strategy by default, but you can manually configure it if necessary. The most common strategies are `swap` `fallback` `optional` and `block`.

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'], // Load only the Latin and extended Latin subsets
  weight: '400', // Choose the specific weight you need
  style: 'normal', // Specify the style if needed
})

export default function Page() {
  return <div className={inter.className}>Hello World</div>
}
```

The snippet above uses the Next.js built-in tool for Google Fonts. Instead of adding the font link in your HTML or using a third-party library, you can import it directly like this for ease and efficiency.

- **subsets:** Tells the app to load only the characters needed. Skipping other character sets like Cyrillic (used in Russian) or Greek, avoids downloading extra, unnecessary data, which keeps your app lightweight and faster to load.
- **weight:** Instead of loading all font weights (e.g., Bold, Light), you only bring in Regular (400). This reduces the overall size.
- **style:** Stick with the standard style (no fancy italics). This also trims down what’s downloaded.

### 6. Lazy Loading and Code Splitting

When building web apps, you want to make sure your users don’t wait too long for your pages to load. A big part of this involves reducing how much JavaScript is loaded when the page first opens. Two techniques that help with this are **lazy loading** and **code splitting**, both of which Next.js makes easy to use.

#### Lazy Loading in Next.js

Think of lazy loading like waiting to download a movie only when you decide to watch it. Imagine you have a large component like a chart or a map that users only see after interacting with a page. Instead of loading it upfront, you can tell Next.js to load it only when it’s needed using `next/dynamic`.

#### Code Splitting in Next.js

Code splitting breaks your JavaScript into smaller pieces (called bundles), so users only load what’s necessary. For example, if a user visits your homepage, there’s no need to load JavaScript for other pages like "About Us" or "Dashboard". It typically happens during the build process or dynamically at runtime.

```jsx title="Home.jsx"
import dynamic from 'next/dynamic'

// Load HeavyComponent only when it’s rendered
const HeavyComponent = dynamic(() => import('./HeavyComponent'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <HeavyComponent /> {/* This loads only when rendered */}
    </div>
  )
}
```

In the above code, `dynamic` dynamically imports the component only when needed. `ssr: false` disables server-side rendering for the component, which can save resources if the component doesn’t need to be pre-rendered.

Next.js automatically splits code by page, meaning each page only loads the necessary JavaScript when accessed, improving load times. For more granular control, `next/dynamic` allows you to dynamically import specific components, ensuring they are loaded lazily only when needed. While Next.js handles page-level code splitting by default, using `next/dynamic` gives you the flexibility to apply component-level splitting, optimizing resource loading and enhancing performance.

---

## Conclusion

Creating a high-performance application is a very important aspect of any business. A faster and more efficient application enhances user engagement, lowers bounce rates, and boosts SEO rankings, which all contribute to business growth and customer satisfaction.

By utilizing these techniques we discussed in this guide, you can provide a smooth user experience while maintaining optimal efficiency behind the scenes.

Remember, every second saved in load time translates to happier users and, ultimately, better business outcomes.

Thank you for reading!

::: info Ayantunji Timilehin

Want to connect with me?

- [Twitter / X (<FontIcon icon="fa-brands fa-x-twitter"/>)](https://x.com/Timi471)
- [Linkedin: Ayantunji Timilehin (<FontIcon icon="fa-brands fa-linkedin"/>`timilehin-micheal`)](https://linkedin.com/in/timilehin-micheal/)
- Email: [<FontIcon icon="fas fa-envelope"/>`ayantunjitimilehin@gmail.com`](mailto://ayantunjitimilehin@gmail.com)

:::

### References

<SiteInfo
  name="Building Your Application: Optimizing | Next.js"
  desc="Optimize your Next.js application for best performance and user experience."
  url="https://nextjs.org/docs/pages/building-your-application/optimizing/"
  logo="https://nextjs.org/favicon.ico"
  preview="https://nextjs.org/api/docs-og?title=Building%20Your%20Application:%20Optimizing"/>

- [**Caching-vs-content-delivery-network**](/freecodecamp.org/caching-vs-content-delivery-network.md)

<SiteInfo
  name="Cumulative Layout Shift: What It Is and How to Measure It"
  desc="Interested in learning more about cumulative layout shift? Here's your quick-and-easy guide."
  url="https://blog.hubspot.com/marketing/cumulative-layout-shift/"
  logo="https://hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png"
  preview="https://hubspot.com/hubfs/cumulative-layout-shift-2.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Optimize Next.js Web Apps for Better Performance",
  "desc": "As engineers, we often get so carried away with other aspects of development that we overlook how users perceive and interact with our applications. This oversight can result in users leaving the app almost as soon as they arrive, leading to higher b...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/optimize-nextjs-web-apps-for-better-performance.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
