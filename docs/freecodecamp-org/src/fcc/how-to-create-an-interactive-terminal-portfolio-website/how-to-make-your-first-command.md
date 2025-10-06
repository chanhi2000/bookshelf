---
lang: en-US
title: "How to Make Your First Command"
description: "Article(s) > (8/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (8/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Make Your First Command"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/how-to-make-your-first-command.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-make-your-first-command"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

After the greeting, we can write our first command. It will be helpful and will work with any commands we add later.

```js
const commanns = {
  help() {

  }
};
```

This will be our help command where we'll add a list of commands available to our terminal portfolio. We will use [<VPIcon icon="fa-brands fa-firefox"/>`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat), which creates a list of elements with and before the last element.

```js
const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
```

To create a list, we need to use `formatter.format()` and pass an array of commands. To get that array we can use `Object.keys()`:

```js
const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  }
};

const command_list = Object.keys(commands);
const help = formatter.format(command_list);
```

When you type help you should see:

```plaintext title="output"
List of available commands: help
```

You also need to add the `echo` command:

```js
const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  },
  echo(...args) {
    term.echo(args.join(' '));
  }
};
```

Now the help command works:

```plaintext title="output"
List of available commands: help and echo
```

But if you try to execute 'echo hello' you will get an error:

```plaintext title="output"
[Arity] Wrong number of arguments. The function 'echo' expects 0 got 1!
```

By default, jQuery Terminal checks the number of arguments and the number of parameters the function accepts. The problem is that the `rest` operator makes all arguments optional and the length function property is 0. To fix the issue we need to disable the `Arity` check with an option:

```js
const term = $('body').terminal(commands, {
  greetings: false,
  checkArity: false
});
```

Now the echo commands should work.
