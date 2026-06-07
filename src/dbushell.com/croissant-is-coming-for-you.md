---
lang: en-GB
title: "Croissant is Coming for You"
description: "Article(s) > Croissant is Coming for You"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Croissant is Coming for You"
    - property: og:description
      content: "Croissant is Coming for You"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/croissant-is-coming-for-you.html
prev: /programming/js-node/articles/README.md
date: 2025-07-18
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-07-18-croissant-is-coming-for-you.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Croissant is Coming for You"
  desc="The one where I package a web app for macOS"
  url="https://dbushell.com/2025/07/18/croissant-is-coming-for-you/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-07-18-croissant-is-coming-for-you.png"/>

Last week [**I documented Croissant development**](/dbushell.com/croissant-no-framework-web-app.md) in a lengthy tome that should have been a series. I’m also writing a [<VPIcon icon="fas fa-globe"/>series of dev notes](https://dbushell.com/notes/2025-07-17T06:52Z/). I suppose the main blog is a series now because this is part two. My gift of a [Googly eyes CodePen (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/pen/gbaYyEm) was a success. I have no gift this week.

Here’s a boring screenshot.

![Inspired UI design and copywriting if I dare say so myself.](https://dbushell.com/images/blog/2025/croissant-tauri-macos-app.avif)

---

## Tauri MacOS App

**Croissant** is a [<VPIcon icon="fa-brands fa-firefox"/>progressive web app](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app)[^1] and will be hosted as a website eventually. I have not abandoned those principles!

[^1]: see: Website.

iOS and macOS allow PWAs to be “installed” albeit with [<VPIcon icon="fas fa-globe"/>questionable enthusiasm from Apple](https://open-web-advocacy.org/apple-browser-ban/). I’ve been side-questing around [<VPIcon icon="fas fa-globe"/>Tauri 2.0](https://tauri.app/) this week in pursuit of a better PWA experience. Tauri packages a native app out of a website with minimal fuss.

Tauri required 16.1 MB of `node_modules` to generate 16.9 MB of `Croissant.app`. The web assets are only 250 KBs. That’s like 98.5% overhead.

Out of curiosity I followed the [<VPIcon icon="iconfont icon-electron"/>Electron tutorial](https://electronjs.org/docs/latest/tutorial/tutorial-prerequisites) to create the most basic Electron app. Electron required 347.2 MB of `node_modules` to produce a 264.4 MB macOS app. The major difference between Tauri and Electron is that Electron ships embedded Chromium and Node.js whereas Tauri uses the native web view provided by the OS.

[<VPIcon icon="fas fa-globe"/>Tauri’s homepage](https://tauri.app/#:~:text=Minimal%20Size) claims:

::: info From Tauri's hompage (<VPIcon icon="fas fa-globe"/><code>tauri.app</code>)

> By using the OS’s native web renderer, the size of a Tauri app can be little as 600KB.

<SiteInfo
  name="Tauri 2.0"
  desc="The cross-platform app building toolkit"
  url="https://v2.tauri.app"
  logo="https://v2.tauri.app/favicon.svg"
  preview="https://v2.tauri.app/og.png?v=1"/>

:::

Naturally they refuse to elaborate on that 600 KB claim.

I checked the [<VPIcon icon="fas fa-globe"/>App Size docs](https://tauri.app/concept/size/) and copy-pasted config. The freshly compiled `Croissant.app` shrunk to 6.6 MB. I should read more of this documentation. A 6.6 MB native macOS app that wraps my PWA is smaller than a website like [<VPIcon icon="iconfont icon-nextjs"/>nextjs.org](https://nextjs.org/) (to select a random example). And my app works [**unlike nextjs.org**](/dbushell.com/your-framework-is-showing-nextjs-error.md).

---

## Persistant Data

Croissant uses IndexedDB to store RSS feed data. I’m using [<VPIcon icon="fas fa-globe"/>Dexie](https://dbushell.com/notes/2025-07-13T08:38Z/) for now to help.

Safari is known for the odd [<VPIcon icon="fa-brands fa-safari"/>IndexedDB bug](https://bugs.webkit.org/show_bug.cgi?id=226547) but I believe it is stable now. Safari has (or had?) a [<VPIcon icon="fa-brands fa-safari"/>7-day policy](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/#:~:text=7%2DDay%20Cap%20on%20All%20Script%2DWriteable%20Storage) on purging storage. How this affects PWAs is confusing:

> Web applications added to the home screen are not part of Safari and thus have their own counter of days of use. Their days of use will match actual use of the web application which resets the timer. We do not expect the first-party in such a web application to have its website data deleted.

I’m struggling to find a concrete answer so [<VPIcon icon="fas fa-globe"/>please @ me](https://dbushell.com/contact/) if you know the current state of Safari storage.

Anyway, I was concerned about how Tauri apps stored IndexedDB data, and if it persisted across updates. On macOS I found data in the following directory.

```plaintext
/Users/dbushell/Library/WebKit/com.dbushell.croissant
```

Inside that location there is an empty `WebsiteData/IndexedDB` directory. Curious. Spelunking deeper into randomly named directories I found what I was looking for.

```plaintext
Size  Date Modified  Name
164M  18 Jul 07:19   IndexedDB.sqlite3
33k   18 Jul 07:12   IndexedDB.sqlite3-shm
29k   18 Jul 07:19   IndexedDB.sqlite3-wal
```

It was SQLite all along! This is not surprising, Apple love a good SQLite database. It’s sad Apple get all the fun and we’re stuck with IndexedDB. [<VPIcon icon="fa-brands fa-wikipedia-w"/>Web SQL](https://en.wikipedia.org/wiki/Web_SQL_Database) needs a comeback. I did [<VPIcon icon="fas fa-globe"/>consider SQL Wasm](https://dbushell.com/notes/2025-07-05T16:43Z/); it’s not worth the cost.

This database persists across app updates. It probably hangs around after the app is deleted. That said, some Tauri devs have had issues:

::: info From (<VPIcon icon="iconfont icon-github"/><code>tauri-apps/tauri</code>)

> General recommendation is to store your app data separately and not rely on IndexedDB as it may change again in a future major version of tauri.

<SiteInfo
  name="[bug]  [v2] IndexedDB path changed after upgrading to tauri 2 · Issue #11252 · tauri-apps/tauri"
  desc="Describe the bug After upgrading from tauri 1 to tauri 2, the IndexedDB directory changed from https_tauri.localhost_0.indexeddb.leveldb to http_tauri.localhost_0.indexeddb.leveldb. Since my app st..."
  url="https://github.com/tauri-apps/tauri/issues/11252/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2b76e9633e3d13d1a430d53c78fdc74554ac814a0e157a428d776067cbfb2559/tauri-apps/tauri/issues/11252"/>

:::

I’m very reluctant to use Tauri’s [<VPIcon icon="fas fa-globe"/>store plugin](https://tauri.app/reference/javascript/store/). It’s effectively proprietary for my purposes. I already have a cross-platform database. I’ll stick to using IndexedDB for now. I have import/export functionality. I could always write a migration script.

---

## Tauri Plugins

Speaking of Tauri plugins, one does not simply open an external hyperlink from a Tauri app.

![meme of Boromir from Lord of the Rings quoted as saying 'One does not simply open a hyperlink'](https://dbushell.com/images/blog/2025/one-does-not-simply-hyperlink.avif)

meme of Boromir from Lord of the Rings quoted as saying 'One does not simply open a hyperlink'

Hyperlinks are kind of a big deal in RSS feeds. Some feeds are nothing but links. Whilst Tauri is a web *view* it is not a web *browser*. There is a special [<VPIcon icon="fas fa-globe"/>Opener plugin](https://tauri.app/reference/javascript/opener/) for that. I have to detect external clicks. I do this conditionally because Tauri is not my only target.

```js
if ("__TAURI__" in globalThis) {
  globalThis.addEventListener('click', (ev) => {
    const link = ev.target?.closest('a[href][target="_blank"]');
    if (link) {
      globalThis.__TAURI__.opener.openUrl(link.href);
    }
  });
}
```

The Croissant website itself is [**“no build”**](/dbushell.com/croissant-no-framework-web-app.md#no-build) (a deliberate choice) which means I have to use the awkward `__TAURI__` global. Were I to acquiesce to a build toolchain I could import.

```js
import { openUrl } from '@tauri-apps/plugin-opener';
```

Why they can’t expose a fake module like the global object I don’t know.

The Tauri [<VPIcon icon="fas fa-globe"/>HTTP Client plugin](https://tauri.app/plugin/http-client/) solved my [<VPIcon icon="fas fa-globe"/>proxy server dependency](https://dbushell.com/notes/2025-07-15T16:44Z/) to bypass CORS issues. Previously an [<VPIcon icon="fas fa-globe"/>early experiment](https://dbushell.com/notes/2025-07-14T16:32Z/) led to a 88.8 MB app including a Deno sidebar binary. Reducing that to 6.6 MB has made me very happy.

Annoyingly, the opener plugin will not open the `blob:` URLs I generate to export data and prompt a download. For that I had to combine the [<VPIcon icon="fas fa-globe"/>save dialog](https://v2.tauri.app/plugin/dialog/#save-to-file-dialog) and [<VPIcon icon="fas fa-globe"/>file system write](https://v2.tauri.app/plugin/file-system/#write) plugins. This added another conditional branch.

```js
const path = await globalThis.__TAURI__.dialog.save({
  defaultPath: "croissant.json",
  filters: [{
      name: "croissant.json",
      extensions: ["json"],
    },
  ],
});
if (path) {
  await globalThis.__TAURI__.fs.writeTextFile(
    path,
    JSON.stringify(data)
  );
}
```

It’s not much code but it adds complexity. I’m in danger of turning my web app into a Tauri app. I’ve set myself the restriction of not implementing anything in Tauri that I cannot do on a website. And it’s pretty much feature complete now.

---

## Release Date?

If you would like to use the Croissant macOS app, or a hosted web version, please [<VPIcon icon="fas fa-globe"/>get in touch](https://dbushell.com/contact/). It might be September before it’s ready because my August is busy.

Theoretically I could cross compile for Windows and Linux but I have no desire to do that right now. @ me if you’re interested.

Once the app design and functionality is stable I’ll consider how I plan to distribute it, host it, open source it, sell it? I will do another blog post expanding on my design principles for Croissant. It’s super minimal. If you like “features” prepare to be disappointed!

::: info Sources on 'Progressive Web App'(1)

<SiteInfo
  name="What is a progressive web app? - Progressive web apps | MDN"
  desc="A progressive web app (PWA) is an app that's built using web platform technologies, but that provides a user experience like that of a platform-specific app."
  url="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<SiteInfo
  name="Progressive web apps"
  desc="If you’re thinking of making a native app, think again."
  url="https://adactio.com/journal/22074/"
  logo="https://adactio.com/favicon-16x16.png"
  preview="https://adactio.com/images/photo-300.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Croissant is Coming for You",
  "desc": "The one where I package a web app for macOS",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/croissant-is-coming-for-you.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
