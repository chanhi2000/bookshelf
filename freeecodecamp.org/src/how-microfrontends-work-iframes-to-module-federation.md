---
lang: en-US
title: "How Microfrontends Work: From iframes to Module Federation"
description: "Article(s) > How Microfrontends Work: From iframes to Module Federation"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Microfrontends Work: From iframes to Module Federation"
    - property: og:description
      content: "How Microfrontends Work: From iframes to Module Federation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-microfrontends-work-iframes-to-module-federation.html
prev: /academics/system-design/articles/README.md
date: 2025-05-30
isOriginal: false
author:
  - name: Rahul gupta
    url : https://freecodecamp.org/news/author/rahulgupta32/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748613557891/39037981-d514-4f26-8a48-be0cdd9ca29b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How Microfrontends Work: From iframes to Module Federation"
  desc="Microfrontends are transforming how teams build and deploy frontend applications at scale. This tutorial explores the architectural landscape, from traditional approaches to modern Module Federation implementations. By the end, you'll be equipped to ..."
  url="https://freecodecamp.org/news/how-microfrontends-work-iframes-to-module-federation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748613557891/39037981-d514-4f26-8a48-be0cdd9ca29b.png"/>

Microfrontends are transforming how teams build and deploy frontend applications at scale. This tutorial explores the architectural landscape, from traditional approaches to modern Module Federation implementations.

By the end, you'll be equipped to evaluate whether microfrontends are the right solution for your team's specific needs.

---

## What are Microfrontends?

If you've heard about microservices on the backend, microfrontends represent a similar approach in the frontend world, with many of the same benefits.

Your team might adopt a microfrontend approach to enable team autonomy, reduce deployment risks, and scale development across multiple teams. Each team owns its technology stack, deployment cadence, and workflows. Yet they still deliver a single, cohesive user interface.

The overall idea is to move away from a big monolithic UI to decoupled UI codebases that can be owned, managed, and deployed by separate teams independently.

The simplest way to think about Microfrontends is the following:

> Integrate one piece of UI into another

What can this **piece** of UI be, you may ask? Here are some examples:

- **Pages** - parts of a website owned by specific teams. For example, the Auth team may own login/signup pages, whereas the engagement team may own the marketing pages, and so on.
- **Components** - Components like header and footer are good candidates for a microfrontend approach as well. They’re relatively static but need to stay consistent across the website and may integrate with teams who own different sets of pages.
- **Widgets** - A recommendation widget may be owned by a recommendations team, for example, and it can be integrated into different parts of the page based on the context. This is different from a static component, as given the context, the recommendation widget may also fetch relevant data via APIs (also owned by the recommendations teams).

---

## Traditional Microfrontend Patterns

After reading the definition of a microfrontend, you might be thinking, oh, wait, who builds UI with a big monolith these days anyway (except giants like Google)? If that’s the case, your team is most likely using one of these traditional approaches to building Microfrontends:

### Server-Side Composition

This is the most common approach I've encountered across various organisations. The idea is to split your website based on route patterns or pages. For example, you might route users to the accounts team for any routes starting with `/account/*` (`/account/login` or `/account/signup` may fall under this pattern). Or you may have a similar route prefix for other parts of your web app, like `/blog/*` for the marketing section of your app.

This is typically implemented at the reverse proxy layer (such as using NGINX), which routes traffic to the appropriate downstream UI service based on the path matching.

![Diagram showing a reverse proxy setup with nginx. The proxy routes `/blog/*` requests to the Marketing UI and `/account/*` requests to the Accounts UI.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747496226912/fda979cd-c95c-4d48-a7dc-87956672b24d.png)

### iframes

Another common approach is using iframes, though this method has significant limitations.

Unlike server-side composition, which operates at the page level, iframes can integrate as widgets within pages. Using iframes, you can load another website as a part of the website you want to integrate it within using the [<VPIcon icon="fa-brands fa-firefox"/>`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) tag.

![Diagram illustrating iframe integration, showing website.com/blog embedding a 'Widget' using an iframe with source 'website.com/widget'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747496936962/7c24a43a-80d4-45f4-a2df-3de0e0e0bc1c.png)

Some examples of this approach, which you may have seen, are websites that integrate Twitter feeds, Google Maps, and so on. Although these are examples of external widget integrations with iframes, companies may integrate certain widgets that are powered through iframes.

### Build Time Integration - Packages

This approach involves publishing components as a UI library that other applications can integrate.

This is useful if you want to integrate full-blown apps with multiple pages, widgets, or static components like headers and footers, where this approach is pretty common.

Typically, this approach means that one team publishes their components as a package, while other teams integrate a specific version of this package.

![Diagram illustrating build-time integration via packages, showing website.com/blog integrating a 'Widget' component, version 1.0.0, fetched from a company's NPM registry.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747497485861/70385841-28c6-441e-ae4d-c977b3563ecf.png)

In this example, it’s important to note that the Widget component is pulled in during the dependency install phase of the app. The web app can utilise this widget like its own component, which gets built together as one module and shipped to the users.

---

## Modern Microfrontend Patterns

### Module Federation

Module Federation enables you to integrate remote UI pieces within a host application at runtime. These pieces can be full pages, widgets, or components.

Module Federation originated as a [<VPIcon icon="fas fa-globe"/>Webpack 5 feature](https://webpack.js.org/concepts/module-federation/), extending the bundler's capabilities to load JavaScript code from remote sources at runtime.

[<VPIcon icon="fas fa-globe"/>Module Federation 2.0](https://module-federation.io/) is the evolution/improvement of the original Webpack 5 feature, with implementations available for other popular bundlers like RSPack and Vite as well.

Even if you’re using Webpack 5, I would recommend using Module Federation 2.0 as it takes care of some common gotchas that exist in the original Webpack 5 implementation.

![Diagram illustrating Module Federation, showing a host application at website.com/blog loading a 'Widget' component at runtime from a remote application at Recommendation.com via 'remotes: recommendation/remoteEntry'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748011963774/fae404c6-efc9-4e0f-8667-4427dbcdfc0f.png)

Let’s take an example to understand some of the common pieces of Module Federation.

Imagine that we’ve a blog application, owned by the Content Team & a Widget, which is owned by the Recommendations team.

Now, let’s say the content team wants to integrate a recommendation widget within their application. Assume these teams have separate codebases hosted on different domains. The content team is on `website.com` & the recommendations team is on `recommendation.com`

Here’s how you can achieve this MFE integration via Module Federation:

#### Remote

Responsible for exposing JavaScript files as remote (for example, utilities, components, and so on).

In our example, it would be the Recommendation’s team acting as a remote & would require a configuration to ‘expose’ the Widget.

```ts
new ModuleFederationPlugin({
  name: 'recommendation',
  exposes: {
    './Widget': './src/Widget.js',
  }
})
```

#### Remote Entry

Remote entry is the URL for the entry point for a remote. A remote may expose multiple JavaScript files, & remoteEntry file would be aware of all of them.

Module Federation by default hosts the remote entry file at the root. In our example, recommendation teams might host their remote entry on `https://recommendation.com/remoteEntry.js`

#### Host

An independent website that consumes JavaScript from one or more remotes via **Remote Entry.** Think of remote entry as a namespace for your app under which it can export multiple things like components, utils, and so on, as exposed by a particular remote.

In our example, the Content Team would act as a Host & they’ll define the recommendation team’s remote entry within remotes configuration.

```ts
new ModuleFederationPlugin({
  name: 'content-blog',
  remotes: {
    "recommendation": 'recommendation@https://recommendation.com/remoteEntry.js',
  },
  // ... other configs
})
```

#### Shared

Both hosts and remote can specify dependencies as SemVer that are automatically negotiated and shared during runtime. These can include common framework dependencies, such as React, which may require being a singleton, or other vendor libraries that can be potentially shared.

Having the right shared configuration ensures that the client does not download libraries or code that is already available on the host when fetching UI pieces from a remote location, which is key for optimal performance when integrating Module Federation.

```ts
const deps = require("./package.json").dependencies;

new ModuleFederationPlugin({
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    }
  },
  // ... other configs
})
```

#### Imports and Usage

Module Federation integration lets you use imports as if those JS files were available locally. Module Federation does all the stitching behind the scenes at runtime, in terms of fetching the remote entry and appropriate dependencies to make it available when you use it.

```jsx
// Import is of the format - <remote>/<expose-from-remote>
import Widget from 'recommendation/Widget';

// Render somewhere, making sure to handle loading via Suspense
// & errors via error boundary in React
<ErrorBoundary>
  <Suspense fallback={<Loading />}
    <Widget />
  </Suspense>
</ErrorBoundary>
```

In a nutshell, the module federation concept is this simple —

> Fetching JS code (components, utils, and so on) from a remote server at runtime and still being able to share dependencies and be performant while doing so.

### Single SPA

When you look up microfrontends, [<VPIcon icon="fas fa-globe"/>Single SPA](https://single-spa.js.org) often appears as a popular solution. But its primary use case is quite specific: integrating components across multiple frameworks (for example, React + Angular + Vue in the same application). Here's how it works in practice:

Single SPA acts as a JavaScript router that mounts and unmounts entire applications based on URL routes. Each "single-spa application" is a framework-specific app that gets loaded when its route becomes active.

```ts
// Register applications with Single SPA
registerApplication({
 name: '@mycompany/react-app',
 app: () => System.import('@mycompany/react-app'),
 activeWhen: ['/react-app']
});

registerApplication({
 name: '@mycompany/angular-app', 
 app: () => System.import('@mycompany/angular-app'),
 activeWhen: ['/angular-app']
});
```

Single SPA handles the "orchestration" part - deciding which app should be active and managing their lifecycles. It doesn't solve the "how do I load remote code" problem - you still need to pair it with one of the approaches we've discussed (Module Federation, build-time packages, and so on).

If your applications use the same framework (like all React), you can skip Single SPA entirely and use Module Federation directly. Single SPA adds complexity that's only justified when you truly need multi-framework integration.

---

## Detailed Comparison

| **Criteria** | **Module Federation** | **Server-side composition** | **iframe** | **Build time integration (package)** |
| --- | --- | --- | --- | --- |
| **Independent deployments** | 💚 Microfrontends are loaded at runtime on the client. This means that teams can do independent deployments and make changes that reflect immediately. | 💚 Deployments stay independent, as each route pattern points to an individual app’s independent deployments | 💚 Since iframes are also loaded at runtime, the deployments can be independent. | 💔 Deployments are coupled from the host application. A change in the package would require publishing a new version and bumping it up in the host app. |
| **Performance** | 💚 Enables shared dependencies and optimised loading, maintaining SPA performance. | 💔 Requires full page reloads when navigating between applications, losing SPA benefits. | 💔 Completely isolated and loads all the dependencies of the website in an iframe, which means a slower overall page load. | 💚 Possible to share package dependencies to a certain extent by [deduping](https://yarnpkg.com/cli/dedupe) dependencies when integrating a package, but it requires appropriate dev tooling. Otherwise, duplicate dependencies may sneak in for the same package. |
| **Scalability & maintenance** | 💚 Works well at scale. A page can be completely composed of federated components, with the smallest of the building blocks being pulled in from different remotes. | 💔 Usually requires duplicating things like header/footer, to make it ‘look like’ the user is in the same app, but is being served by two different servers/codebases. The approach is limited to route-based segregation of apps’ entry points - so, a granular integration isn’t possible. | 💔 Typically good to power whole pages and not portions of pages, can really slow down the app at scale and may encounter issues when optimising the app for SEO or building dynamic responsive layouts. | 💔 Requires maintenance of package publishing, upgrades and version conflicts at scale. This can be simplified to some extent by CI tooling, but developers would still require significant effort in bumping the versions, verifying the impact from a feature/performance standpoint. |
| **Setup effort** | 💔 Might be high depending on how your app is being built currently. A deeper level of understanding of your build tool may be required to make your desired integration work, or when you face issues. This is covered in detail in the next section. | 💚 Simpler to implement, as there is no coupling apart from the reverse proxy layer, which is responsible for redirecting the traffic to the appropriate service. | 💔 Easier to integrate but requires handling a lot of edge cases, which can take significant time. Some examples are communication between iframe/host app, layout issues, rendering beyond the boundaries of iframe (for example, toasts), cross-domain iframe restrictions and ensuring security, impact on SEO and a11y. | 💔 Requires significant effort to stabilise the development pipeline for publishing a new package, maintaining a changeset, bumping a new version, and resolving version conflicts. Every change requires making sure there is no unintended impact on transitive dependencies of the host app due to the package bump. |
| **Authentication & Authorisation** | 💚 Depending on your app’s setup, module federated components can call the remote app’s server for any data fetching needs. Might require handling CORS if your remote is on a different domain than the host, and for the browser to send authentication cookies for such requests. | 💚 Each app can independently integrate with a central authentication service. | 💔 It can be challenging for iframes to access the parent website’s browser details like auth cookies, and so on. It also may require some trickery to get the authentication to work, especially if the iframe URL is on a different domain/subdomain than the application. | 💚 Package components can choose to call APIs via a proxy API within the host application or directly integrate with an independent service’s endpoints. |
| **Devloop** | 💚 Mature devloop with Module Federation 2.0, you can view source maps with hot reloading across these apps. Overall a seamless integration out of the box. You can also point to any federated endpoint from local to be able to integrate and verify end-to-end integration. | 💔 Requires setting up both services and a reverse proxy locally to verify integration touchpoints, which may be non-trivial. | 💔 Local testing doesn’t accurately mimic the issues that you may face due to cross-domain challenges with iframe. | 💔 An appropriate dev workflow is required to test the in-development package changes within the host app locally. This is typically done with pre-publishing the package or by [linking](https://classic.yarnpkg.com/lang/en/docs/cli/link/) local packages or using a tool like [yalc](https://github.com/wclr/yalc). |
| **Overall Recommendation ✨** | Suited for apps that are composed of integration with different teams who want to own their deployments and release cycles with low coupling. | Suited for apps that are rather isolated (subdomains) within a larger business domain. A question to ask is, how often would the user need to navigate between these apps? If the answer is ‘not often’, then this may be a suitable approach. | Not recommended due to the limitations that come with it. It may be suitable for some third-party integrations, for example, Twitter exposes a part of its feed which can be integrated within a website via iframe. This is rather more convenient than any of the other approaches. | Suited for apps where the changes need to be more controlled, with the host app upgrading the package, and may perform appropriate checks before releasing it to their end users. |

---

## Tradeoffs and Challenges with Module Federation

The primary tradeoff in using Module Federation is the initial setup effort, which I briefly discussed in the previous comparison table.

Here are some other challenges to anticipate when integrating via Module Federation:

### Setup Complexity

1. **Bundler-specific challenges** - Some things may require you to know your bundler's internals to make the integration work for your app. For example, with Webpack 5, if your remote not only exposes federated components but also serves a user experience, you’ll need the appropriate chunk setup to make that work. This is because Module Federation by default expects a certain chunk optimisation strategy and exposes the remoteEntry from the root of the app.
2. **Shared dependencies** - You'll need to review your dependencies to make sure you share as many dependencies as possible to optimise bundle size and loading performance. You’ll also need to mark critical libraries (like React) as singletons to prevent runtime conflicts.

### Runtime Challenges

1. **Cross domain** - if your remote is on a different subdomain, for example `remote.website.com` and is being loaded from `host.website.com` You’ll need appropriate handling for CORS on your server to allow data fetching from the host’s subdomain. You’ll also need an appropriate `credentials` fetch configuration to make sure the browser sends the authentication cookies in data fetching requests to your remote endpoints.
2. **Styling conflicts** - You’ll want to make sure the remote’s styles don’t override the host’s styles and that the remote components don’t inherit unintended styles from the host. There are multiple strategies here, from using styled components to a virtual DOM.

### Operational Concerns

1. **Observability and Analytics** - Based on your requirements, you may want to either share an instance of your observability scripts, for example, an error monitoring service, or instantiate a completely different one within your MFE’s context. This becomes challenging, as there is no ‘index’ file being rendered, but rather components that are being exposed from the remotes.
2. **Deployment & Caching** - It’s recommended that MFE remote bundles be hosted on S3 buckets for high reliability as opposed to loading them from a remote server. You may require appropriate long-term caching for files other than the `remoteEntry.js` which is typically non-hashed and contains the link to other dependencies to be loaded.

---

## Conclusion

Microfrontends offer a compelling solution for scaling frontend development across multiple teams, with Module Federation emerging as the most flexible modern approach.

While traditional methods like server-side composition remain valuable for specific use cases, Module Federation provides the runtime flexibility and performance characteristics needed for complex applications.

The decision ultimately depends on your team’s structure, technical requirements, and tolerance for implementation complexity. Start with simpler approaches if you're new to microfrontends, then consider Module Federation as your needs evolve.

### What’s next?

This article was more about giving you a bird’s-eye view of the landscape. I’ll be writing more on Module Federation and going beyond the basics next. I’ll cover the technical challenges in more detail, along with possible solutions. Watch out for the same!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Microfrontends Work: From iframes to Module Federation",
  "desc": "Microfrontends are transforming how teams build and deploy frontend applications at scale. This tutorial explores the architectural landscape, from traditional approaches to modern Module Federation implementations. By the end, you'll be equipped to ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-microfrontends-work-iframes-to-module-federation.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
