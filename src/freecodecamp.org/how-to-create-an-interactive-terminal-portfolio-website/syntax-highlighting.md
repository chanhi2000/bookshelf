---
lang: en-US
title: "Syntax Highlighting"
description: "Article(s) > (11/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (11/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Syntax Highlighting"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/syntax-highlighting.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-syntax-highlighting"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

As we discussed earlier, we can use custom syntax highlighting of our shell by pushing a function into `$.terminal.defaults.formatters`.We can also use the `$.terminal.new_formatter` helper function.

Let's make our commands white as we type them. The formatter can be an array (of regex and replacement), or a function. We have a fixed number of commands and we only want to make those that are on the list white. We can do this by adding a regular expression:

```js
const any_command_re = new RegExp(`^\s*(${command_list.join('|')})`);
```

This regular expression will check if, at the beginning of the string, there is an optional whitespace and one of the commands. Right now the regex will look like this: `/^\s*(help|echo)/`. This is how to create new formatter:

```js
$.terminal.new_formatter([any_command_re, '<white>$1</white>']);
```

If you would like to make command arguments in different colors, you'll need a function, where you will use [<FontIcon icon="fa-brands fa-firefox"/>`String::replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

```js
const re = new RegExp(`^\s*(${command_list.join('|')}) (.*)`);

$.terminal.new_formatter(function(string) {
  return string.replace(re, function(_, command, args) {
    return `<white>${command}</white> <aqua>${args}</aqua>`;
  });
});
```

This is just an example of using `String::replace`. If you have just one replacement, you can use an array. This will be the same:

```js
const re = new RegExp(`^\s*(${command_list.join('|')})(\s?.*)`);

$.terminal.new_formatter([re, function(_, command, args) {
  return `<white>${command}</white><aqua>${args}</aqua>`;
}]);
```

::: note

If you add the class `<white class="command">` to the formatter, you will be able to click on the typed command to execute it again.

:::
