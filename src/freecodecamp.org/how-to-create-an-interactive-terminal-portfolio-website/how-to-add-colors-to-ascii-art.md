---
lang: en-US
title: "How to Add Colors to ASCII Art"
description: "Article(s) > (7/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (7/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "How to Add Colors to ASCII Art"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/how-to-add-colors-to-ascii-art.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-how-to-add-colors-to-ascii-art"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

You can spice up your ASCII Art by using a library called lolcat. lolcat is a Linux command that can style text in the terminal with rainbow colors. There is also a library called [<FontIcon icon="fa-brands fa-npm"/>`isomorphic-lolcat`](https://npmjs.com/package/isomorphic-lolcat), that you can use in JavaScript to make your ASCII Art in rainbow colors.

---

## Terminal Formatting

To use the lolcat library, you first need to know how to change the colors of the terminal.

You can do this using low-level formatting that looks like this:

```lisp
[[b;red;]some text]
```

The whole text is wrapped in brackets and the formatting of the text is in additional brackets, where each argument is separated by a semicolon. To learn more about the syntax, you can read the Wiki Article: [Formatting and Syntax Highlighting (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting).

Here, we'll only use a basic change of color. Instead of red, you can use CSS color names, hex color, or `rgb()`.

---

## How to Use the Lolcat Library

To use the library, we first need to include it in HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/isomorphic-lolcat"></script>
```

To format the string with colors, we can use this function:

```js
function rainbow(string) {
  return lolcat.rainbow(function(char, color) {
    char = $.terminal.escape_brackets(char);
    return `[[;${hex(color)};]${char}]`;
  }, string).join('\n');
}

function hex(color) {
  return '#' + [color.red, color.green, color.blue].map(n => {
    return n.toString(16).padStart(2, '0');
  }).join('');
}
```

The `lolcat.rainbow` will call a function in every character from the input string, and pass color as an object with RGB values and the character.

---

## Rainbow ASCII Art Greetings

To use this code, you need to wrap the call to render with `rainbow`:

```js
function ready() {
  term.echo(() => {
    const ascii = rainbow(render('Terminal Portfolio'));
    return `${ascii}\nWelcome to my Terminal Portfolio\n`;
  }).resume();
}
```

You can also use two calls to echo, since only the Figlet message needs to be executed inside the function:

```js
function ready() {
  term.echo(() => rainbow(render('Terminal Portfolio')))
    .echo('Welcome to my Terminal Portfolio\n').resume();
}
```

You'll notice that when you resize the window, the rainbow changes randomly. This is the default behavior of lolcat. To change it, you need to set the [<FontIcon icon="fa-brands fa-wikipedia-w"/>random seed](https://en.wikipedia.org/wiki/Random_seed).

```js
function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function ready() {
  const seed = rand(256);
  term.echo(() => rainbow(render('Terminal Portfolio'), seed))
    .echo('Welcome to my Terminal Portfolio\n').resume();
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
    }, string, seed).join('\n');
}
```

The `rand` function returns a pseudo-random number from 0 to max value. Here we created a random value from 0 to 256. ### How to Make the Greeting Text White

As we showed previously, you can make the text white with terminal formatting. You can use:

- `[[;white;]Welcome to my Terminal Portfolio]`
- `[[;#fff;]Welcome to my Terminal Portfolio]`
- `[[;rgb(255,255,255);]Welcome to my Terminal Portfolio]`

Moreover, if you include additional file XML formatting, you can use XML-like syntax. That makes formatting much easier.

```html
<script src="https://cdn.jsdelivr.net/npm/jquery.terminal/js/xml_formatting.js"></script>
```

After including the above file in HTML, you can use CSS named colors as XML tags:

```xml
<white>Welcome to my Terminal Portfolio</white>
```

The XML formatting supports more tags like links and images. See [Extension XML Formatter (<FontIcon icon="iconfont icon-github"/>`jcubic/jquery.terminal`)](https://github.com/jcubic/jquery.terminal/wiki/Formatting-and-Syntax-Highlighting#extension-xml-formatter) for more info.

::: note

XML formatter is a function added to `$.terminal.defaults.formatters`, which transforms the input XML-like text into terminal formatting. You can add the same to your own formatters.

:::
