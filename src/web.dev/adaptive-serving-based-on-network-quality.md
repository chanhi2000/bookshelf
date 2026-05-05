---
lang: en-US
title: "Adaptive serving based on network quality"
description: "Article(s) > Adaptive serving based on network quality"
icon: fa-brands fa-js
category:
  - JavaScript
  - Web Browser
  - Google
  - Chrome
  - Article(s)
tag:
  - blog
  - web.dev
  - js
  - javascript
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Adaptive serving based on network quality"
    - property: og:description
      content: "Adaptive serving based on network quality"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/web.dev/adaptive-serving-based-on-network-quality.html
prev: /programming/css/articles/README.md
date: 2019-05-06
isOriginal: false
author:
  - name: Milica Mihajlija
    url: https://github.com/mihajlija
cover: https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/dynamic-content-card-default.png
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

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Adaptive serving based on network quality"
  desc="Use Network Information API to adapt the assets served to users based on the quality of their connection."
  url="https://web.dev/articles/adaptive-serving-based-on-network-quality"
  logo="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png"
  preview="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/dynamic-content-card-default.png"/>

Loading a website can be a very different experience depending on the network conditions. Everything is usually smooth when you are on a fast network, but when you're on the go with a limited data plan and spotty connection, or stuck with a laptop on slow coffee-shop Wi-Fi, it's a different story.

One way to deal with this is by adapting which assets you're serving to users based on the quality of their connection. This is now possible with the [<VPIcon icon="fa-brands fa-firefox"/>Network Information API](https://developer.mozilla.org/docs/Web/API/Network_Information_API) which enables web applications to access information about the user's network.

<!-- TODO: Browser Support -->

---

## Usage

There are many ways you can use this network information to improve the user experience:

- Switch between serving high-definition and low-definition content based on the user's network.
- Decide whether to preload resources.
- Defer uploads and downloads when users are on a slow connection.
- Enable offline mode if the network quality is not good enough to load the app and use the features.
- Warn users that doing something (for example, watching video) over cellular could cost them money.
- Use it in your analytics to gather data on your users' network quality.

Many applications are already doing something similar. For example, YouTube, Netflix and most other video (or video calling) services automatically adjust the resolution during streaming. When Gmail is loading, it provides users with a link to "load basic HTML (for slow connections)".

![A link to load basic HTML version of Gmail when users are on slow connections](https://web.dev/static/articles/adaptive-serving-based-on-network-quality/image/a-link-load-basic-html-v-cc25c3a82b2cb.png)

---

## How it works

The `navigator.connection` object contains information about a client's connection. Its properties are explained in the table bellow.

| Property | Explanation |
| --- | --- |
| `downlink` | The bandwidth estimate in megabits per second. |
| `effectiveType` | The effective type of the connection, with possible values `'slow-2g'`, `'2g'`, `'3g'`, or `'4g'` (covers 4g and higher). Determined based on the combination of [<VPIcon icon="fas fa-globe"/>round-trip time and downlink speed](https://wicg.github.io/netinfo/#effective-connection-types). For example, fast downlink combined with high latency will have lower effectiveType due to latency. |
| `onchange` | An event handler that fires when connection information changes. |
| `rtt` | The estimated round-trip latency of the connection in milliseconds. |
| `saveData` | A boolean that defines whether the user has requested a reduced data usage mode. |

Here's what this looks like when you run it in the browser's console:

![Chrome DevTools console displaying the values of navigator.connection object's properties](https://web.dev/static/articles/adaptive-serving-based-on-network-quality/image/chrome-devtools-console-d-86512f1908093.jpg)

The `effectiveType` values are also available via [<VPIcon icon="fa-brands fa-chrome"/>Client Hints](https://chromestatus.com/feature/5407907378102272) and allow you to communicate the browser's connection type to servers.

::: note

You can access Network Information API inside [<VPIcon icon="fa-brands fa-firefox"/>Service Workers](https://developer.mozilla.org/docs/Web/API/ServiceWorker) to adapt to situations when users are offline.

:::

The `onchange` event listener enables you to dynamically adapt to changes in network quality. If you deferred uploads or downloads because of poor network conditions, you can rely on the event listener to restart the transfer when it detects better network conditions. You can also use it to notify users when the network quality changes. For example, if they lost their Wi-Fi signal and were dropped to a cellular network this can prevent accidental data transfers (and charges 💸).

Use the `onchange` event listener as you would any other event listener:

```js
navigator.connection.addEventListener('change', doSomethingOnChange);
```

::: note

Network information API is [<VPIcon icon="iconfont icon-caniuse"/>supported in Chromium-based browsers](https://caniuse.com/#feat=netinfo) since version 62.

:::

---

## Conclusion

The potential benefits of the Network Information API are big, especially for users on slow networks and applications that require a lot of bandwidth. Best of all, it can be used as a progressive enhancement technique.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Adaptive serving based on network quality",
  "desc": "Use Network Information API to adapt the assets served to users based on the quality of their connection.",
  "link": "https://chanhi2000.github.io/bookshelf/web.dev/adaptive-serving-based-on-network-quality.html",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```
