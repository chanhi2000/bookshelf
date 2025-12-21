---
lang: en-US
title: "Adding Executables to Home Directory"
description: "Article(s) > (19/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (19/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Adding Executables to Home Directory"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/adding-executables-to-home-directory.html
next: /freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/README.md#working-terminal-portfolio-demo
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-adding-executables-to-home-directory"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

Another thing you can do to improve the portfolio is to help your visitor learn what commands they can use, by introducing executable when running ls. They will look like binaries on the Linux system.

```js
// not every command needs to be binary
// we picked those three that works more like real programs
const files = [
  'joke',
  'credits',
  'record'
];

function print_home() {
  term.echo(dirs.map(dir => {
    return `<blue class="directory">${dir}</blue>`;
  }).join('\n'));
  term.echo(files.map(file => {
    return `<green class="command">${file}</green>`;
  }).join('\n'));
}
```

With this, you will be able to click the command and execute it. So your visitors will know that they can run `joke` command without the need to type `help` command. For this to work, we need one last change, adding class to the green XML tag:

```js
$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;;${attrs.class}]`;
};
```