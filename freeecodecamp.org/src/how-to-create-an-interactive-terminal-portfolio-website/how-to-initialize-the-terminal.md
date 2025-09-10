---
lang: en-US
title: "How to Initialize the Terminal"
description: "Article(s) > (4/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (4/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Initialize the Terminal"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-initialize-the-terminal.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-initialize-the-terminal"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>



To create a basic terminal, you need to put in this code:

```js
const commands = {};

const term = $('body').terminal(commands);
```

The string `'body'` indicates the CSS selector where terminal should be created. Here we use `'body'` so the terminal will be the only thing on the page. But it doesn't have to be full screen. You can create a website where the terminal is only part of the page, like in a window that looks like part of the Operating System.

The first argument to the terminal method is called an interpreter. It's a way to add your commands. An object is the simplest way to create them. See [creating the interpreter (<VPIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Getting-Started#creating-the-interpreter) to learn more.

If the terminal font is too small, you can make it a little bit bigger with CSS custom properties (also known as CSS variables):

```css
:root {
  --size: 1.2;
}
```