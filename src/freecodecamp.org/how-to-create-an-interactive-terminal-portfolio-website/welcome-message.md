---
lang: en-US
title: "Welcome message"
description: "Article(s) > (5/19) How to Create an Interactive Terminal Portfolio Website" 
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
      content: "Article(s) > (5/19) How to Create an Interactive Terminal Portfolio Website"
    - property: og:description
      content: "Welcome message"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-interactive-terminal-portfolio-website/welcome-message.html
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
  url="https://freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website#heading-welcome-message"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730895455049/8fefc48c-761d-4ec5-8f60-b6eb2f97a42a.png"/>

The first thing we need to do is to get rid of the default greeting message and replace it with nice-looking custom [<FontIcon icon="fa-brands fa-wikipedia-w"/>ASCII Art](https://en.wikipedia.org/wiki/ASCII_art). We will use the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Filget library](https://en.wikipedia.org/wiki/FIGlet) written in JavaScript to do this.

There are a few Figlet libraries on npm. We will use a package named [<FontIcon icon="fa-brands fa-npm"/>`figlet`](https://npmjs.com/package/figlet).

The first thing you should do is pick the right font. Go to [<FontIcon icon="fas fa-globe"/>figlet playground](https://patorjk.com/software/taag/) and write the text you want for your greeting. We will use "Terminal Portfolio" and click "Test All". It should display your text with all the fonts. Scroll through the list and pick the font you like.

I picked a font "slant" that looks like this:

![Terminal Portfolio ASCII Art](https://freecodecamp.org/news/content/images/2024/04/Przechwycenie-obrazu-ekranu_2024-04-26_22-18-26.png)

You can copy this text and put into a string, but you will have issues like with the backslash that needs to be escaped using quote characters.

```js
const greetings = `  ______                    _             __   ____             __  ____      ___     
 /_  __/__  _________ ___  (_)___  ____ _/ /  / __ \____  _____/ /_/ __/___  / (_)___ 
  / / / _ \\/ ___/ __ `__ \\/ / __ \\/ __ `/ /  / /_/ / __ \\/ ___/ __/ /_/ __ \\/ / / __ \\
 / / /  __/ /  / / / / / / / / / / /_/ / /  / ____/ /_/ / /  / /_/ __/ /_/ / / / /_/ /
/_/  \___/_/  /_/ /_/ /_/_/_/ /_/\__,_/_/  /_/    \____/_/   \__/_/  \____/_/_/\____/`

const term = $('body').terminal(commands, {
    greetings
});
```

::: note

The second argument to the jQuery Terminal is an object with options - we used a single option `greetings`.

:::

This doesn't look good and it's hard to modify. Also, if you create the greeting by hardcoding a string, it may get distorted on smaller screens. That's why we will use the figlet library in JavaScript.

First, we need to include the figlet library in HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/figlet/lib/figlet.js"></script>
```

To initialize the library in JavaScript, we need to load the fonts:

```js
const font = 'Slant';

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);
```

This code will load the `'Slant'` font and call the function `ready` when the font is loaded.

So we need to write this function:

```js
function ready() {

}
```

Now we can do two things, we can put the initialization of jQuery Terminal inside that function:

```js
let term;

function ready() {
  term =  $('body').terminal(commands, {
    greetings
  });
}
```

With this, we can use the `greeting` option. But we can also use the `echo` method to render the greeting, and when initializing the terminal we will put `null` or `false` as a `greetings` to disable the default one:

```js
const term = $('body').terminal(commands, {
  greetings: false
});

function ready() {
  term.echo(greetings);
}
```

This will work better because the library will initialize the terminal immediately and will not need to wait for loading the fonts.

Note that we still need to define the greetings using figlet. To do this we can write this function:

```js
function render(text) {
  const cols = term.cols();
  return figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true
  });
}
```

This function uses the `figlet::textSync()` method to return a string and use `terminal::cols()`, to get the number of characters per line. With this, we can make our text responsive.

This function can be used inside `ready`.

```js
function ready() {
  term.echo(render('Terminal Portfolio'));
}
```

This will create a string and pass it to the `echo` method. But this will be the same as with:

```js
term.echo(greeting);
```

And our hard-coded greetings. So if you resize the terminal, the greetings can still get distorted. To make the text responsive, you need to `echo` a function. This function will be called on each re-render of the terminal, which will happen when you resize the page.

We can use the arrow function for this:

```js
function ready() {
  term.echo(() => render('Terminal Portfolio'));
}
```

If you want to add some text below the ASCII art, you can do this by concatenating the string after render:

```js
function ready() {
  term.echo(() => {
    const ascii = render('Terminal Portfolio');
    return `${ascii}\nWelcome to my Terminal Portfolio\n`;
  });
}
```

::: note

If you run this code, you will notice that there is an empty line after the ASCII art. This is because the figlet library adds some spaces after the text.

To get rid of this, you can use `string::replace()` with a regular expression that will remove all spaces and newlines from the end.

:::

We can't use `string::trim()`, because we don't want to remove the leading lines:

```js
function render(text) {
  const cols = term.cols();
  return trim(figlet.textSync(text, {
     font: font,
     width: cols,
     whitespaceBreak: true
  }));
}

function trim(str) {
  return str.replace(/[\n\s]+$/, '');
}
```

You can also pause the terminal when it loads the fonts:

```js
const term = $('body').terminal(commands, {
  greetings: false
});

term.pause();

function ready() {
  term.echo(() => render('Terminal Portfolio')).resume();
}
```

You can can chain terminal methods, the same as with jQuery.