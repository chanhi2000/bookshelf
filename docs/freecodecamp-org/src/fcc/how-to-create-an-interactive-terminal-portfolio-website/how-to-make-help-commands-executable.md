---
lang: en-US
title: "How to Make Help Commands Executable"
description: "Article(s) > (10/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (10/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Make Help Commands Executable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-an-interactive-terminal-portfolio-website/how-to-make-help-commands-executable.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-make-help-commands-executable"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

We can make the UX better to allow clicking on the command and execute it just like when the user types it.

We will need a few things to do this. First, we need to add formatting to each command and add an HTML class attribute. We can also make the command white so it's more visible.

```js
const command_list = Object.keys(commands);
const formatted_list = command_list.map(cmd => {
  return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);
```

Next is to add [<VPIcon icon="fa-brands fa-wikipedia-w"/>affordance](https://en.wikipedia.org/wiki/Affordance). To indicate that the user can click the command, we need to change the cursor in CSS:

```css
.command {
  cursor: pointer;
}
```

The last step is to execute the command when the user clicks the command. We need to add an event handler with jQuery (jQuery Terminal dependency) or we can use the native browser [<VPIcon icon="fa-brands fa-firefox"/>`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Here we use jQuery:

```js
term.on('click', '.command', function() {
  const command = $(this).text();
  term.exec(command);
});
```

`terminal::exec()` is a way to execute a command programmatically, just like user would type it and press enter.

You can test it by typing `help` and clicking `help` again.

Clicking `echo` will print an empty line. We can fix it by checking if the array of arguments is not empty, before executing `terminal::echo()`:

```js
const commands = {
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(' '));
    }
  }
};
```

Now clicking on `echo` will only show the executed command.

::: note

If for any reason you don't want to show the prompt and the command that has been executed, you can silence the `exec` by passing `true` as the second argument.

```js
term.exec('help', true);
```

:::
