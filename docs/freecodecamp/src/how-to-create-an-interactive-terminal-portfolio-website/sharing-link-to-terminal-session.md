---
lang: en-US
title: "Sharing Link to Terminal Session"
description: "Article(s) > (18/19) How to Create an Interactive Terminal Portfolio Website" 
category:
  - JavaScript
  - jQuery
  - Linux
  - Shell
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - js
  - javascript
  - jquery
  - linux
  - sh
  - shell
  - cli
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (18/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Sharing Link to Terminal Session"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/sharing-link-to-terminal-session.html
date: 2024-04-29
isOriginal: false
author:
  - name: Jakub T. Jankiewicz
    url : https://freecodecamp.org/news/author/jcubic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create an Interactive Terminal Portfolio Website",
  "desc": "In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho...",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an Interactive Terminal Portfolio Website"
  desc="In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho..."
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-sharing-link-to-terminal-session"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Another cool thing that I will show you is recording commands in the URL. You can create whole terminal session and save it in a [<VPIcon icon="fa-brands fa-firefox" />URL hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash). To start recoding a session you need to execute the following:

```js
term.history_state(true);
```

When you execute the command `echo x`, it should create a URL hash that looks like this: `#[[0,1,"echo%20x"]]`.

To stop recording, you can use:

```js
term.history_state(false);
```

You can write this into a command `record start | stop`, so it will be easier to record sessions.

The last thing to do to restore the session is to use the option `execHash: true`.

```js
const term = $('body').terminal(commands, {
  /* rest of the options */
  execHash: true
});
```

When you do this and refresh the page, while having the URL hash with the session, it should replay the session and you should see same output as you did when you recorded it.

If you want the `exec` to be animated you can use this option:

```js
const term = $('body').terminal(commands, {
  /* rest of the options */
  execHash: true,
  execAnimation: true
});
```

To share the link, it’s better to use a URL shortener like [<VPIcon icon="fas fa-globe"/>TinyURL](https://tinyurl.com/). Make sure you test the shortened URL to see if it works.