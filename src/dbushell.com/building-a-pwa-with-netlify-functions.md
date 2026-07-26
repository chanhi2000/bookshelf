---
lang: en-GB
title: "Building a PWA with Netlify Functions"
description: "Article(s) > Building a PWA with Netlify Functions"
icon: iconfont icon-netlify
category:
  - Node.js
  - DevOps
  - Netlify
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
  - devops
  - netlify
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a PWA with Netlify Functions"
    - property: og:description
      content: "Building a PWA with Netlify Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/building-a-pwa-with-netlify-functions.html
prev: /programming/js-node/articles/README.md
date: 2020-01-27
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2020-01-27-building-a-pwa-with-netlify-functions.png
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

```component VPCard
{
  "title": "Netlify > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/netlify/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building a PWA with Netlify Functions"
  desc="The one where I build a progressive web app to learn Netlify functions."
  url="https://dbushell.com/2020/01/27/building-a-pwa-with-netlify-functions/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2020-01-27-building-a-pwa-with-netlify-functions.png"/>

::: warning

This post was written **6 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

A couple of weeks ago [**I took Netlify for a spin**](/dbushell.com/netlify-first-impressions.md). I found the platform to be much easier to use than I’d anticipated. I was keen to test more features.

[<VPIcon icon="iconfont icon-netlify"/>Netlify Functions](https://netlify.com/products/functions/) provide back-end functionality through API endpoints. They’re powered by AWS Lambda. I’m using AWS for my [<VPIcon icon="fas fa-globe"/>contact form](https://dbushell.com/contact/). It took me forever to get working. If you asked me today I legitimately could not tell you how. An abstracted layer sounds like a good feature to me.

---

## The Mission

In the spirit of a “friday coding”[^1] hackathon I set myself the mission: in one day build a progressive web app that uses Netlify functions. Since I had the domain [<VPIcon icon="fas fa-globe"/>eavesdrop.app](https://eavesdrop.netlify.app/) lying around — snapped it up during the gold rush — I worked backwards from there.

[^1]: in which the only standards are those that’re out the door by beer o’clock

![Eavesdrop](https://dbushell.com/images/blog/2020/eavesdrop.gif)

Inspiration: I’ve been having a problem with **short URLs** recently. They’ll often redirect through tracking domains that are purposefully blocked by either my browser or router. Seems like a decent task for a remote function?

[<VPIcon icon="fas fa-globe"/>Eavesdrop](https://eavesdrop.netlify.app/) works as follows:

1. User inputs a short URL
2. Form is posted to a Netlify function
3. Function runs in the AWS cloud
4. Unshortened URL is returned

It’s far from an original idea but it’s got a cool domain.

I coded up the [front-end UI on CodePen (<VPIcon icon="fa-brands fa-codepen"/>`dbushell`)](https://codepen.io/dbushell/pen/ZEYwxOe). I then glued it all together with React. You can find the [source code on GitHub (<VPIcon icon="iconfont icon-github"/>`dbushell/eavesdrop.app`)](https://github.com/dbushell/eavesdrop.app). Unfortunately I spent far too long animating the logo so the visual UI feedback is lacking. Functionally it works great though which is the point. I had to remind myself that (after messing with CSS for four hours).

On the front-end the magic happens with a `fetch`:

```js
fetch('/.netlify/functions/unshorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({url})
})
  .then(response => response.json())
  .then(data => {
    /* Success! do stuff... */
  })
  .catch(err => {
    /* Error! do stuff... */
  })
  .finally(() => {
    /* clean up? */
  });
```

On the back-end the real magic happens. The `unshorten` function I borrowed heavily from [tall (<VPIcon icon="iconfont icon-github"/>`lmammino/tall`)](https://github.com/lmammino/tall) by *Luciano Mammino*. I adapted and wrapped it in Netlify’s handler:

```js
module.exports = {
  handler: (event, context, callback) => {
    const body = JSON.parse(event.body);
    unshorten(body.url)
      .then(url => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({url})
        });
      });
  }
};
```

It’s a Node script that follows 301 redirects until someone gives up. It’s not perfect but I’m not prepared to read the HTTP spec to fix edge cases. This project is a proof-of-concept after all.

It took me a little while to get the function working. My fault; bad API requests and data formatting. Testing was excruciatingly slow until I discovered the [<VPIcon icon="iconfont icon-netlify"/>Netlify CLI](https://cli.netlify.com/commands/dev) allows for local development and function invoking.

Then it worked! Nice. Mission complete.

Eavesdrop could use some polish but for a day’s work I’m happy with the results. Particularly with how simple it was to deploy on Netlify. Sure, I could roll my own solution on AWS like I did with my contact form, but I’d rather pay for simplicity and convenience. And since I pay nothing on the free plan — even better!

No doubt I’ll be testing other [<VPIcon icon="fas fa-globe"/>JAMstack](https://jamstack.org/) services so watch this space.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a PWA with Netlify Functions",
  "desc": "The one where I build a progressive web app to learn Netlify functions.",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/building-a-pwa-with-netlify-functions.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
