---
lang: en-US
title: "Tab Completion"
description: "Article(s) > (12/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (12/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Tab Completion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/tab-completion.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-tab-completion"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Another feature we can add is to complete the command when you press the tab key. This is super easy - we only need to add the completion option set to true:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
  completion: true
});
```

Now when you type `h` and press tab, it will complete the command `help` for you.
