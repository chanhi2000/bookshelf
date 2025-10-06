---
lang: en-US
title: "How to Create an Interactive Terminal Portfolio Website"
description: "Article(s) > How to Create an Interactive Terminal Portfolio Website"
icon: fa-brands fa-js
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
      content: "Article(s) > How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Create an Interactive Terminal Portfolio Website"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/
prev: /programming/js/articles/README.md
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
  "title": "jQuery > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an Interactive Terminal Portfolio Website"
  desc="In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho..."
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the [<VPIcon icon="iconfont icon-jQuery"/>jQuery Terminal library](https://terminal.jcubic.pl/) (and a few other tools) to create a website that looks like a real terminal.

This article will show more advanced usage of the jQuery Terminal library. If you want something more basic, you can check this article: [<VPIcon icon="fas fa-globe"/>How to create interactive terminal like website with JavaScript](https://itnext.io/how-to-create-interactive-terminal-like-website-888bb0972288) that is written for more entry level programmers. You can also read it (or skim it) first before you begin reading this one.

```component VPCard
{
  "title": "What is the terminal and its history?",
  "desc": "(1/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/what-is-the-terminal-and-its-history.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "What is jQuery Terminal?",
  "desc": "(2/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/what-is-jquery-terminal.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Base html file",
  "desc": "(3/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/base-html-file.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Initialize the Terminal",
  "desc": "(4/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-initialize-the-terminal.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Welcome message",
  "desc": "(5/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/welcome-message.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Line Gaps",
  "desc": "(6/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/line-gaps.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Add Colors to ASCII Art",
  "desc": "(7/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-add-colors-to-ascii-art.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Make Your First Command",
  "desc": "(8/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-make-your-first-command.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Default Commands",
  "desc": "(9/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/default-commands.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Make Help Commands Executable",
  "desc": "(10/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-make-help-commands-executable.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Syntax Highlighting",
  "desc": "(11/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/syntax-highlighting.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Tab Completion",
  "desc": "(12/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/tab-completion.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Add Shell Commands",
  "desc": "(13/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-add-shell-commands.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Improve Completion",
  "desc": "(14/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-improve-completion.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Typing Animation Command",
  "desc": "(15/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/typing-animation-command.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Credits Command",
  "desc": "(16/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/credits-command.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Prefilled Commands",
  "desc": "(17/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/prefilled-commands.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Sharing Link to Terminal Session",
  "desc": "(18/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/sharing-link-to-terminal-session.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Adding Executables to Home Directory",
  "desc": "(19/19) How to Create an Interactive Terminal Portfolio Website",
  "link": "/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/adding-executables-to-home-directory.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Working Terminal Portfolio Demo

Here is a fully working Demo of our [Interactive Terminal Portfolio Website (<VPIcon icon="fa-brands fa-codepen"/>`jcubic`)](https://codepen.io/jcubic/full/ZEZPWRY).

---

## What Next?

You can add a lot of commands to this portfolio. The only limitation is your imagination.

You can check these examples for inspiration:

```component VPCard
{
  "title": "jQuery Terminal Demos - a Collection by  Jakub T. Jankiewicz on CodePen",
  "desc": "This is a list of various jQuery Terminal demos I've created over time.",
  "link": "https://codepen.io/collection/LPjoaW/",
  "logo": "https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico",
  "background": "rgba(71,207,115,0.2)"
}
```

<CodePen
  user="jcubic"
  slug-hash="BwBYOZ"
  title="Vintage (Retro) Fake Terminal Emulator in JavaScript"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<SiteInfo
  name="Examples for jQuery Terminal plugin"
  desc="jQuery plugin for Command Line applications. Automatic JSON-RPC, custom object or a function. History, Authentication, Bash Shortcuts. Tab completion."
  url="https://terminal.jcubic.pl/examples.php/"
  logo="https://terminal.jcubic.pl/favicon.ico"
  preview="https://terminal.jcubic.pl/signature.png"/>

```component VPCard
{
  "title": "Fake Linux Terminal - Online Simulator",
  "desc": "This is example of using jQuery Terminal Emulator to create Fake Linux System. It's work in progress. Check GitHub Repo for more information.",
  "link": "https://fake.terminal.jcubic.pl//",
  "logo": "",
  "background": "rgba(10,10,10,0.2)"
}
```

If you have an idea that is not listed here, you can ask on [<VPIcon icon="fa-brands fa-stack-overflow"/>StackOverflow with jquery-terminal tag](https://stackoverflow.com/questions/tagged/jquery-terminal). If you have something more time consuming, you can also ask for [<VPIcon icon="fas fa-globe"/>paid support](https://support.jcubic.pl/).

::: info Share what you’ve created

If you create a cool terminal portfolio, you can [share it and tag me on Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`jcubic`)](http://x.com/jcubic). I would love to take a look. Especially if you create something more than what’s included in the tutorial. You can also share on a [<VPIcon icon="fas fa-globe"/>terminal chat on my website](https://jcu.bi/chat) (it’s a similar terminal portfolio, but with chat).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create an Interactive Terminal Portfolio Website",
  "desc": "In this article, you will learn how to create an interactive terminal-based portfolio and a résumé in JavaScript. We'll use the jQuery Terminal library (and a few other tools) to create a website that looks like a real terminal. This article will sho...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
