---
lang: en-US
title: "How to Improve Completion"
description: "Article(s) > (14/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (14/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Improve Completion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/how-to-improve-completion.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-improve-completion"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Our completion is not perfect as it only completes the commands. If you'd like to have completion that also handles directories, you need to use a function:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false,
  completion(string) {
    // in every function we can use `this` to reference term object
    const cmd = this.get_command();
    // we process the command to extract the command name
    // and the rest of the command (the arguments as one string)
    const { name, rest } = $.terminal.parse_command(cmd);
    if (['cd', 'ls'].includes(name)) {
      if (rest.startsWith('~/')) {
        return dirs.map(dir => `~/${dir}`);
      }
      if (rest.startsWith('../') && cwd != root) {
        return dirs.map(dir => `../${dir}`);
      }
      if (cwd === root) {
        return dirs;
      }
    }
    return Object.keys(commands);
  },
  prompt
});
```

::: note

The string argument was left as documentation. It can be used if you only want to complete a single word.

:::
