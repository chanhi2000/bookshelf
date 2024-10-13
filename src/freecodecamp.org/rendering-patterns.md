---
lang: en-US
title: "Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained"
description: "Article(s) > Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained"
    - property: og:description
      content: "Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/rendering-patterns.html
prev: /academics/system-design/articles/README.md
date: 2023-03-07
isOriginal: false
author: German Cocca
cover: https://freecodecamp.org/news/content/images/2023/03/sebastian-svenson-8QgqOLJAL8k-unsplash.jpg
---

---

## {{ $frontmatter.title }} 관련

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
  name="Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained"
  desc="Hi everyone! In this article we're going to take a look at the different rendering pattern options available nowadays for web applications. I'll start by explaining what a rendering pattern is, then go through each of the main options available. Fina..."
  url="https://freecodecamp.org/news/rendering-patterns"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/03/sebastian-svenson-8QgqOLJAL8k-unsplash.jpg"/>

Hi everyone! In this article we're going to take a look at the different rendering pattern options available nowadays for web applications.

I'll start by explaining what a rendering pattern is, then go through each of the main options available. Finally we'll compare them, explaining the pros and cons and when one might be more beneficial than another.

Let's go!

---

## What's a Rendering Pattern?

In web development, a rendering pattern refers to the way in which the HTML, CSS, and JavaScript code is all processed and rendered in a web application or website.

Different rendering patterns are used to achieve different performance and user experience goals. The most common rendering patterns in web development are:

1. **Server-side rendering (SSR)**: In SSR, the web server generates the HTML content of a web page on the server-side and sends it to the client's browser. This approach can improve initial loading times and SEO (search engine optimization) but can be slower for dynamic content.
2. **Client-side rendering (CSR)**: In CSR, the client's browser generates the HTML content of a web page on the client-side using JavaScript. This approach can provide a fast and interactive user experience but can be slower for initial loading times and bad for SEO.
3. **Static site generation (SSG)**: In SSG, the HTML content of a web page is generated at build time and served to the client as a static file. This approach can provide excellent performance and security but can be less flexible for dynamic content.

In summary, a rendering pattern is a strategy for processing and rendering web content in web development. The choice of rendering pattern depends on the specific needs and requirements of a project, such as performance, SEO, user experience, and flexibility.

Now that we have an idea of what a rendering pattern is, let's examine in detail the many options available nowadays.

---

## Different Rendering Pattern Options

### Static Websites

A static website is a type of website that consists of a set of HTML, CSS, and JavaScript files that are served to the client's browser without any server-side processing or database integration.

Static websites are typically created using static site generators, such as [<FontIcon icon="fas fa-globe"/>Jekyll](https://jekyllrb.com/), [<FontIcon icon="fas fa-globe"/>Hugo](https://gohugo.io/), or [<FontIcon icon="fa-brands fa-gatsby"/>Gatsby.js](https://gatsbyjs.com/). These generators compile templates, markdown files, or other data sources into a set of static files that are then deployed to a web server or [<FontIcon icon="fa-brands fa-youtube"/>content delivery network (CDN)](https://youtu.be/RI9np1LWzqw).

<VidStack src="youtube/RI9np1LWzqw" />

Static websites are often used for small to medium-sized websites that do not require complex dynamic features or server-side processing. They are easy to deploy, scale, and maintain, as they do not require a server-side application or database.

They also provide excellent security and performance, as the content is served directly from a web server or CDN without any server-side processing.

Static websites can be enhanced with client-side JavaScript, such as React or Vue, to provide interactive features or dynamic content. But any data that is required for these features must be loaded through client-side API requests, as there is no server-side processing to generate or retrieve the data.

In summary, a static website is a type of website that consists of a set of static files that are served to the client's browser without any server-side processing or database integration. They are simple, fast, secure, and scalable, and are suitable for small to medium-sized websites that do not require complex dynamic features or server-side processing.

### Single Page Applications (SPAs) with Client Side Rendering (CSR)

A Single Page Application (SPA) is a type of web application rendered with Client-side rendering (CSR). This means that all necessary HTML, CSS, and JavaScript files are loaded at once when the user first loads the page. Then Javascript dynamically updates the content as the user interacts with the page, without requiring a full page reload.

In an SPA, the client-side JavaScript application is responsible for rendering the HTML and processing the user's interactions. The JavaScript application interacts with a backend API to retrieve data and update the user interface dynamically. Typically, this interaction is achieved using AJAX (Asynchronous JavaScript and XML) requests or Fetch API requests.

SPAs provide a fast and interactive user experience because only the necessary content is loaded and rendered dynamically, reducing the need for full page reloads. They also provide a more fluid user experience because the application can respond to user input without refreshing the entire page.

However, SPAs require a more complex setup and may have longer initial loading times compared to server-side rendering (SSR) or static site generation (SSG) approaches.

They also require additional considerations for search engine optimization (SEO) and accessibility, as search engines and assistive technologies may have difficulty indexing or navigating the content.

In summary, a Single Page Application (SPA) or Client-side rendering (CSR) is a type of web application that loads all necessary HTML, CSS, and JavaScript files at once and then dynamically updates the content as the user interacts with the page, without requiring a full page reload.

They provide a fast and interactive user experience but require a more complex setup and additional considerations for SEO and accessibility.

### Server Side Rendering (SSR)

Server-side rendering (SSR) is a technique for rendering web pages on the server-side before sending them to the client's browser. In SSR, the server generates the HTML content of a web page based on the requested URL and data, and sends it to the client's browser as a complete HTML document.

SSR provides several benefits, including improved performance, better SEO, and more robust accessibility.

By rendering the HTML on the server-side, SSR reduces the amount of JavaScript code that needs to be loaded and executed on the client's browser. This results in faster initial loading times and better performance on low-end devices or slow networks.

Additionally, SSR enables search engines and social media crawlers to index the web pages more accurately, as the complete HTML content is available on the initial page load. This can improve the visibility and ranking of the website in search engine results pages.

SSR also ensures that the web pages are accessible to users with assistive technologies, such as screen readers or keyboard navigation, as the HTML content is available from the initial page load.

However, SSR has some limitations, such as increased server-side processing requirements and limited interactivity compared to client-side rendering (CSR) or single-page applications (SPAs).

In summary, Server-side rendering (SSR) is a technique for rendering web pages on the server-side before sending them to the client's browser. It provides improved performance, better SEO, and more robust accessibility, but requires more server-side processing and has some limitations in interactivity.

### Static Site Generation (SSG)

Static site generation (SSG) is a technique for building web pages by pre-generating HTML, CSS, and JavaScript files at build time instead of rendering them on the server or client-side.

In SSG, a static site generator tool like Jekyll, Hugo, or Gatsby.js is used to compile the website's content from data sources such as markdown files, JSON files, or [<FontIcon icon="fa-brands fa-youtube"/>CMS](https://youtu.be/nrbpOmNC_mM) data, and generate a set of static files that can be served directly to the browser without any server-side processing.

<VidStack src="youtube/nrbpOmNC_mM" />

The generated static files can be deployed on a web server or a content delivery network (CDN) and served quickly to the end-users with low latency. SSG offers several benefits such as fast loading times, improved security, and scalability.

Since SSG renders web pages at build time, there is no need to generate pages dynamically on the server or client-side. This reduces the processing overhead and enables faster loading times.

Static sites are also less vulnerable to server-side attacks and require fewer server resources, making them more scalable and easier to maintain.

But SSG has some limitations in terms of dynamic content and interactivity. Since the content is generated at build time, any dynamic data or user interactions need to be handled by client-side JavaScript code or serverless functions.

In summary, Static Site Generation (SSG) is a technique for building web pages by pre-generating HTML, CSS, and JavaScript files at build time instead of rendering them on the server or client-side. It offers several benefits such as fast loading times, improved security, and scalability, but has some limitations in terms of dynamic content and interactivity.

### Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) is a technique for building static sites that combines the benefits of both Server-Side Rendering (SSR) and Static Site Generation (SSG).

In ISR, the static site generator tool pre-generates a set of static pages at build time, but also includes additional metadata that enables the pages to be re-generated dynamically on the server-side when requested by the user. This metadata could include information such as expiration times or dependencies on specific data sources.

When a user requests a page that has expired or has dependencies that have changed, the server-side logic can regenerate the page with the updated content and serve it to the user, without requiring a full rebuild of the site.

This enables the site to maintain the benefits of static site generation, such as fast load times and low server processing overhead, while also allowing for dynamic content and personalized experiences for users.

ISR is particularly useful for sites that have content that changes frequently or for sites with a large number of pages that would be inefficient to rebuild in their entirety each time a change is made.

It allows for the best of both worlds: the performance and security benefits of static sites combined with the flexibility and personalization of server-side rendering.

In summary, Incremental Static Regeneration (ISR) is a technique for building static sites that combines the benefits of both Server-Side Rendering (SSR) and Static Site Generation (SSG). It allows for dynamic content and personalized experiences for users while maintaining the performance and security benefits of static sites.

### The Concept of Hydration

In web development, "hydration" refers to the process of taking an HTML document that was initially rendered on the server and adding dynamic interactivity to it on the client-side.

Hydration is commonly used in Single-Page Applications (SPAs) that use client-side rendering (CSR).

During hydration, the browser parses the HTML document generated by the server and constructs a Document Object Model (DOM) tree, which represents the page's structure and content.

The browser then executes the JavaScript code that is responsible for adding dynamic behavior to the page, such as event handling, data fetching, and component rendering.

The JavaScript code retrieves the initial state and props of the components from the server-generated HTML and uses them to rehydrate the components on the client-side, effectively turning them into interactive elements.

This process ensures that the initial state of the page on the client-side matches the server-generated HTML and provides a seamless transition from the initial server-rendered view to the interactive client-side view.

Hydration is important for several reasons. First, it provides better performance and user experience by minimizing the time to interactive and enabling the user to interact with the page immediately.

Second, it enables search engine crawlers to access the page's content and metadata, improving SEO.

Finally, it ensures that the content is accessible and usable even if JavaScript is disabled in the user's browser.

In summary, hydration is the process of taking an HTML document that was initially rendered on the server and adding dynamic interactivity to it on the client-side.

It is commonly used in Single-Page Applications (SPAs) that use client-side rendering (CSR) and provides better performance, SEO, and accessibility.

### Islands

The Islands pattern is a web development technique that involves breaking down a large, complex web page into smaller, self-contained components, each with its own HTML, CSS, and JavaScript code.

Each component is rendered independently on the server and is then rehydrated on the client-side, allowing it to become interactive.

The term "islands" refers to the individual components, each of which represents a separate island of content and functionality within the larger page.

By breaking the page into smaller islands, each with its own state and behavior, the application becomes more modular, easier to reason about and maintain, and can provide a more seamless user experience.

The Islands pattern is closely related to the concept of hydration because it relies on the same basic principle: rendering static HTML on the server and then hydrating it on the client-side with JavaScript to add interactivity.

In this case, each individual island is rendered on the server with its own static HTML, which is then hydrated on the client-side to enable dynamic functionality.

Hydration in the Islands pattern typically involves using a client-side framework or library to attach event handlers, manage state, and render dynamic content within each component. The framework or library must be capable of rehydrating the component on the client-side, ensuring that the initial state and behavior of the component matches that of the server-rendered HTML.

One benefit of using the Islands pattern with hydration is that it can improve the performance of large, complex web applications by reducing the amount of JavaScript that needs to be downloaded and executed on the client-side. By rendering each component independently on the server and rehydrating it on the client-side, the application can provide a more seamless user experience without sacrificing performance or scalability.

In summary, the Islands pattern is a web development technique that involves breaking down a large, complex web page into smaller, self-contained components, each with its own HTML, CSS, and JavaScript code. It relies on the same principle of hydration as other rendering patterns, rendering static HTML on the server and then adding interactivity with JavaScript on the client-side.

The Islands pattern can improve the performance and scalability of large web applications by reducing the amount of JavaScript that needs to be downloaded and executed on the client-side.

### Streaming SSR

Streaming Server-Side Rendering (SSR) is a rendering pattern for web development that involves sending the server-generated HTML to the client as soon as it becomes available, rather than waiting for the entire page to be rendered before sending it.

With traditional SSR, the server would wait for the entire page to be rendered before sending it to the client, resulting in a longer time to first byte (TTFB) and a slower user experience.

Streaming SSR allows the server to send the HTML to the client in chunks as it is generated, providing a faster TTFB and a more responsive user experience.

Streaming SSR is particularly useful for rendering large or complex web pages that take a long time to render, such as e-commerce product pages or news articles.

With streaming SSR, the user can start interacting with the page as soon as the first chunk of HTML is received, without having to wait for the entire page to be rendered.

To implement streaming SSR, the server must use a technique called "chunking" to break the server-generated HTML into smaller chunks and send them to the client as they become available. The client then uses JavaScript to append each chunk of HTML to the page as it is received, effectively streaming the content to the user.

One challenge with streaming SSR is ensuring that the chunks of HTML are sent to the client in the correct order and that the page remains coherent as it is rendered.

To address this, developers may use techniques such as critical CSS, which involves identifying and rendering the most important styles first, or template-based chunking, which involves breaking the HTML into smaller chunks based on templates or components.

In summary, Streaming Server-Side Rendering (SSR) is a rendering pattern for web development that involves sending the server-generated HTML to the client in chunks as it is generated, providing a faster TTFB and a more responsive user experience. It is particularly useful for rendering large or complex web pages.

To implement streaming SSR, the server must use a technique called "chunking" to break the HTML into smaller chunks, and the client must use JavaScript to append each chunk to the page as it is received.

---

## Comparing the Different Patterns

Awesome, so now we have a clear idea of each of the common options available. Let's now quickly go through the main characteristics of each pattern and mention the situations in which each of them might be more beneficial.

### Static Websites

::: tabs

@tab:active Main characteristics

- Pre-built HTML, CSS, and JavaScript files that are served to the client as-is.
- No dynamic content, as all content is pre-rendered and does not change.
- Fast load times due to the lack of server processing.

@tab Pros

- Extremely fast load times and low server costs.
- Great for sites with little to no dynamic content, such as portfolios or blogs.

@tab Cons

- Limited interactivity and functionality, as all content is pre-rendered.
- Not suitable for sites that require dynamic content or user input.

@tab Best for

- Sites with limited dynamic content or sites that do not require dynamic functionality.

:::

### Single Page Applications (SPAs)

::: tabs

@tab:active Main characteristics

- All content is dynamically rendered client-side through JavaScript.
- Only a single page is loaded, with content updates handled by JavaScript.
- Dynamic content can be easily added through APIs.

@tab Pros

- High interactivity and functionality, as all content is dynamic and can be updated without refreshing the page.
- Ideal for complex, data-driven applications that require frequent content updates.

@tab Cons

- Slower initial load times due to the need to load JavaScript and dynamically render content.
- Can be difficult to implement proper SEO techniques due to the lack of pre-rendered content.

@tab Best for

- Applications that require complex interactivity or frequent content updates.

:::

### Server Side Rendering (SSR)

::: tabs

@tab:active Main characteristics

- Server Side Rendering (SSR) is a process in which web pages are generated on the server and sent to the client as fully rendered HTML.
- The server sends a complete HTML response to the client, which includes all the dynamic content, after processing the data on the server.

@tab Pros

- Improved SEO because search engine crawlers can easily parse the complete HTML content.
- Better performance because the initial HTML is sent in a single response, which reduces the time for the browser to load and display the content.
- Works well for content-rich applications or dynamic web applications that require data to be fetched from APIs.

@tab Cons

- Higher server overhead because every request is processed on the server.
- More complex to set up because it requires a server-side framework that supports SSR.
- Less interactive because interactions require additional server requests.

@tab Best for

- Applications with content that changes frequently.
- Applications with dynamic data that needs to be processed on the server before sending the response.

:::

### Static Site Generation (SSG)

::: tabs

@tab:active Main characteristics

- Static Site Generation (SSG) is a process in which web pages are pre-built as static files during the build process and served to the client as static HTML pages.
- The server sends static HTML pages to the client, which includes all the content, without processing any data on the server.

@tab Pros

- Very fast and efficient because static pages can be served from a CDN or cache.
- Lower server overhead because the server only needs to serve static files.
- Can be deployed on a static file host or serverless environments like AWS Lambda.

@tab Cons

- Not suitable for dynamic content that changes frequently.
- Interactions require additional client-side JavaScript.

@tab Best for

- Applications with mostly static content and few interactions.
- Applications with limited interactivity.

:::

### Incremental Static Regeneration (ISR)

::: tabs

@tab:active Main characteristics

- Incremental Static Regeneration (ISR) is a hybrid approach between SSG and SSR, where pages are pre-rendered as static HTML pages during the build process, and then the content is regenerated periodically or on-demand as required.

@tab Pros

- Faster time-to-content because static pages are served initially, but content can be updated quickly.
- Lower server overhead because static pages can be served from a CDN or cache, and dynamic content is regenerated only when required.

@tab Cons

- Limited dynamic content because content regeneration requires a server request.
- Requires a complex caching strategy to ensure that stale content is not served to clients.

@tab Situations

- Applications with content that changes frequently but can tolerate some latency.
- Applications with limited dynamic content.

:::

### Islands:

::: tabs

@tab:active Main Characteristics

- The Island rendering pattern refers to rendering parts of the page on the server while other parts are rendered on the client-side.
- The server renders the critical content, while the client fetches the rest of the content.
- The server-side rendering can improve the initial page load speed and improve SEO.
- The client-side rendering can improve the interactivity and reduce server overhead.

@tab Pros

- Faster page load times because the server renders critical content while the client fetches the rest.
- Works well for applications that require partial server-side rendering and partial client-side rendering.

@tab Cons

- More complex to set up because it requires a hybrid framework that can support both server-side and client-side rendering.
- May result in inconsistencies if the server and client render different versions of the content.

@tab Best for

- Applications with dynamic content that require some server-side processing.
- Applications that require a fast initial page load.

:::

### Streaming SSR

::: tabs

@tab Main Characteristics

- The server sends the HTML response in a streaming fashion, which enables the client to start rendering the content as soon as possible.
- The client can see content being rendered progressively, which improves the user experience.

@tab Pros

- Improved time-to-content because the client can start rendering the content while the server is still processing the request.
- Better user experience because the client can see content being rendered progressively.

@tab Cons

- More complex to set up because it requires a server framework that supports streaming.

@tab Best for

- Applications with large pages or media that require a long time to load.
- Applications that require a smooth user experience with minimal waiting time.

:::

---

## Wrap up

Well everyone, as always, I hope you enjoyed the article and learned something new.

If you want, you can also follow me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`germancocca`)](https://linkedin.com/in/germancocca/) or [X (<FontIcon icon="fa-brands fa-x-twitter"/>`CoccaGerman`)](https://x.com/CoccaGerman). See you in the next one!

![](https://freecodecamp.org/news/content/images/2023/03/out-disappear.gif)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Rendering Patterns for Web Apps – Server-Side, Client-Side, and SSG Explained",
  "desc": "Hi everyone! In this article we're going to take a look at the different rendering pattern options available nowadays for web applications. I'll start by explaining what a rendering pattern is, then go through each of the main options available. Fina...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/rendering-patterns.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
