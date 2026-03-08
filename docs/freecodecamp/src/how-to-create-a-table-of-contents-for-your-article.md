---
lang: en-US
title: "How to Create a Table of Contents for Your Article"
description: "Article(s) > How to Create a Table of Contents for Your Article"
icon: fa-brands fa-chrome
category:
  - Web Browser
  - Google
  - Chrome
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - google
  - chrome
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Table of Contents for Your Article"
    - property: og:description
      content: "How to Create a Table of Contents for Your Article"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-table-of-contents-for-your-article.html
prev: /tool/chrome/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Jakub T. Jankiewicz
    url: https://freecodecamp.org/news/author/jcubic/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/ff72c490-a57b-46c4-b0d9-8c2654853b7c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Table of Contents for Your Article"
  desc="When you create an article, such as a blog post for freeCodeCamp, Hashnode, Medium, or DEV.to, you can help guide the reader by creating a Table of Contents (ToC). In this article, I'll explain how to"
  url="https://freecodecamp.org/news/how-to-create-a-table-of-contents-for-your-article"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/ff72c490-a57b-46c4-b0d9-8c2654853b7c.png"/>

When you create an article, such as a blog post for freeCodeCamp, Hashnode, Medium, or DEV.to, you can help guide the reader by creating a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Table of Contents](https://en.wikipedia.org/wiki/Table_of_contents) (ToC). In this article, I'll explain how to create one with the help of JavaScript and browser DevTools. The article will explain how to use Google Chrome Dev Tools. But the same can be applied to any modern browser.

The process in this article needs to be done once per platform. Once you have the code, you can apply it every time to create a ToC. Note that if the platform changes something, you may need to adjust the script.

---

## Browser Dev Tools

Dev Tools is an extension to the browser that can allow you to inspect and manipulate the DOM ([<VPIcon icon="fa-brands fa-firefox"/>Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)), which is a representation of the HTML the browser keeps in memory in the form of a tree. It also gives access to the JavaScript console, where you can write short code snippets to test something. It has a lot more features, but we'll only use those two.

To open Dev Tools (in Google Chrome), you can press <kbd>F12</kbd> or right-click on the page with your mouse and click Inspect.

::: warning

In Safari, the browser Dev Tools are disabled initially. To enable it, read: [<VPIcon icon="fa-brands fa-apple"/>Use the developer tools in the Develop menu in Safari on Mac](https://support.apple.com/guide/safari/use-the-developer-tools-in-the-develop-menu-sfri20948/mac).

![A browser window split in half. One the right there is an illustration of the laptop with FreeCodeCamp article on the right there is browser DevTools with DOM Tree and CSS panel.](https://cdn.hashnode.com/res/hashnode/image/upload/v1763748137160/7e4df24f-6d25-4d43-a67b-c671bd85789a.png)

Above is the screenshot of DevTools with a preview of this article. On the right, you can see a selected `h1` HTML tag (the title) and CSS applied to that tag. The tree structure you see is the DOM.

:::

::: note

When creating a ToC for **freeCodeCamp**, you should open the preview in a new tab.

:::

---

## JavaScript Console

We will need to have access to the JavaScript console. To open the console in Google Chrome, you can use <kbd>F12</kbd>, right-click on the page and select Inspect from the context menu, or use the shortcut <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>C</kbd> (<VPIcon icon="fa-brands fa-windows"/>,<VPIcon icon="fa-brands fa-linux"/>) or <kbd>CMD</kbd>+<kbd>OPTION</kbd>+<kbd>C</kbd> (Mac).

In Chrome DevTools, you can pick the Console tab at the top of the DevTools. But this will hide the DOM tree. It’s better to open the bottom drawer. You need to click the 3 dots in the top right corner and pick “show console drawer”.

![Screenshot of a menu whic hallow docking the dev tools to the right, left, bottom, or in standalone window.](https://cdn.hashnode.com/res/hashnode/image/upload/v1763749509540/7968ace9-624e-4037-b09a-fe298ba9b865.png)

The Dev Tools will look like this:

![Screenshot of Browser DevTools showing DOM Tree, CSS panel, and Console Drawer.](https://cdn.hashnode.com/res/hashnode/image/upload/v1763749614077/640a2467-ac85-4788-9836-3431a1c503bb.png)

::: note

You can ignore any errors or warnings in the console. You can click this icon 🚫 on the left side of the drawer, and it will clear the console.

:::

The console is a so-called [<VPIcon icon="fa-brands fa-wikipedia-w"/>Read-Eval-Print-Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop). A classic interface, where you type some commands, here JavaScript code, and when you press enter, the code is executed in the context of the page the DevTools is on.

![Screenshot which shows browser alert popup and JavaScript code in DevTools console which open the alert.](https://cdn.hashnode.com/res/hashnode/image/upload/v1763749997534/b61f8cc0-62eb-4586-9898-d41a7519cf3e.png)

Above, you can see a page alert executed from the console.

---

## Understanding the DOM Structure

The first step to create a ToC is to inspect the DOM and find the headers. They are usually **H1…H6** tags. H1 is often the title of the page. In an ideal world, it would always be.

In my case, the header looks like this:

```xml
<h2 id="heading-dev-tools">Dev Tools</h2>
```

The article only has H2 tags, but later in the article, I will also explain how to create a nested ToC.

::: note

Your headers need to have an “id” attribute. It can look different, for example, be on a different element, but it has to be in the DOM. Later in the article, I will explain a few different structures and how to handle them.

:::

Now with DevTools, we can write code that will find every header:

```js
document.querySelectorAll('h2[id], h3[id], main h4[id]');
```

In the case of my article on freeCodeCamp, it returned this output:

```plaintext
NodeList(5) [h2#heading-dev-tools, h2#heading-javascript-console, h2#heading-understanding-the-dom-structure, h2#trending-guides.col-header, h2#mobile-app.col-header]
```

First, it’s a NodeList that we need to convert to an Array. Second is that besides our headers that we have so far, we also have two headers that are part of the website and not the main content. So we need to find out the single element that is the parent of the headers we need.

You can right-click on the white page that contains the article and pick **Inspect Element**. In our case, it found an element `<main>`. So we can rewrite our selector as:

```js
document.querySelectorAll('main h2[id], main h3[id], main h4[id]');
```

And now it returns our headers and nothing more.

::: note

The `[id]` attribute selector is not needed here, actually. At least not on freeCodeCamp.

:::

---

## How to Create the ToC in Markdown

A lot of blogging platforms support Markdown, so it'll be the first thing we'll create.

First, we'll convert the Node list to an array. We can use the [<VPIcon icon="fa-brands fa-firefox"/>spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):

```js
[...document.querySelectorAll('main h2[id], main h3[id], main h4[id]')];
```

Then we can map over the array and create the Markdown links that point to the given header.

```js
const headers = [...document.querySelectorAll('main h2[id], main h3[id], main h4[id]')];

headers.map(function(node) {
  // H2 header should have 0 indent
  const level = parseInt(node.nodeName.replace('H', '')) - 2;
  const hash = node.getAttribute('id');
  const indent = ' '.repeat(level * 2);
  return `\({indent}* [\){node.innerText}](#${hash})`;
});
```

The output looks like this:

```plaintext
(4) ['* [Dev Tools](#heading-dev-tools)', '* [JavaScript Console](#heading-javascript-console)', '* [Understanding the DOM Structure](#heading-understanding-the-dom-structure)', '* [What to do if I don’t have headers?](#heading-what-to-do-if-i-dont-have-headers)']
```

To get the text, we can join the array with a newline character and use `console.lo`g to display the output. If we don’t use `console.log`, it will show a string with `\n` characters.

```js
const headers = [...document.querySelectorAll('main h2[id], main h3[id], main h4[id]')];

console.log(headers.map(function(node) {
  // H2 header should have 0 indent
  const level = parseInt(node.nodeName.replace('H', '')) - 2;
  const hash = node.getAttribute('id');
  const indent = ' '.repeat(level * 2);
  return `\({indent}* [\){node.innerText}](#${hash})`;
}).join('\n'));
```

The output for this article will look like this:

```md
* [Dev Tools](#heading-dev-tools)
* [JavaScript Console](#heading-javascript-console)
* [Understanding the DOM Structure](#heading-understanding-the-dom-structure)
* [Creating TOC in Markdown](#heading-creating-toc-in-markdown)
  * [This is fake header](#heading-this-is-fake-header)
```

I created one fake subheader. Platforms, even when not supporting Markdown when writing articles, often support Markdown when copy-pasted. The ToC at the top of the article was created by copying and pasting markdown generated with the last JavaScript snippet.

---

## How to Create an HTML ToC

If your platform doesn’t support Markdown (like Medium), you can create HTML, preview that HTML, and copy the output to the clipboard. Pasting that into the editor of the platform you're using should keep the formatting.

::: note

On Medium, the content is inside a `<section>` element, so the selector must be updated.

:::

To convert Markdown to HTML, you can use any online tool, but you'll see how to create it yourself in the snippet. It will be faster after you create the code.

```js
const headers = [...document.querySelectorAll('main h2[id], main h3[id], main h4[id]')]

function indent(state) {
  return ' '.repeat((state.level - 1) * 2);
}

function closeUlTags(state, targetLevel) {
  while (state.level > targetLevel) {
    state.level--;
    state.lines.push(`${indent(state)}</ul>`);
  }
}

function openUlTags(state, targetLevel) {
  while (state.level < targetLevel) {
    state.lines.push(`${indent(state)}<ul>`);
    state.level++;
  }
}

const result = headers.reduce((state, node) => {
  const level = parseInt(node.nodeName.replace('H', ''));

  closeUlTags(state, level);
  openUlTags(state, level);
    
  const hash = node.getAttribute('id');
  state.lines.push(`\({indent(state)}<li><a href="#\){hash}">${node.innerText}</a></li>`);
  return state;
}, { lines: [], level: 1 });

closeUlTags(result, 1);

console.log(result.lines.join('\n'));
```

This is the output of the code in this article:

```html
<ul>
  <li><a href="#heading-table-of-contents">Table of Contents</a></li>
  <li><a href="#heading-dev-tools">Dev Tools</a></li>
  <li><a href="#heading-javascript-console">JavaScript Console</a></li>
  <li><a href="#heading-understanding-the-dom-structure">Understanding the DOM Structure</a></li>
  <li><a href="#heading-creating-toc-in-markdown">Creating TOC in Markdown</a></li>
  <li><a href="#heading-how-to-create-html-toc">How to create HTML TOC</a></li>
  <ul>
    <li><a href="#heading-level-3">Level 3</a></li>
    <ul>
      <li><a href="#heading-level-4">Level 4</a></li>
    </ul>
  </ul>
  <li><a href="#heading-what-to-do-if-i-dont-have-headers">What to do if I don’t have headers?</a></li>
</ul>
```

I added a few headers at the end, so you can see that it will work for any level of nested headers. Note that we also have the ToC as the first element on the list.

::: note

Note that the above HTML code includes a link to the Table of Contents. This happens if you run the script again after adding the TOC. You can remove it by hand. If you want to improve the code, you can add a filter.

---

## Copy the HTML code for the editor

Most so-called [<VPIcon icon="fa-brands fa-wikipedia-w"/>WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) editors are using HTML, and you should be able to copy the output of HTML code with formatting and paste it into that editor. The easiest is to just save that into a file, open that file, and select the text:

![Screenshot of the browser window with file open. The page in the browser shows the table of content where all text is highlighted by selection.](https://cdn.hashnode.com/res/hashnode/image/upload/v1763758802247/7e4fa0cd-377d-44ca-9cdb-b53ec14da4b8.png)

---

## What to Do If I Don’t Have Headers?

You need to find anything that can be targeted with CSS. If they are `p` tags with a specific class (like header), you can use `p.header` instead of `h2`.

### How to Create a Table of Contents for DEV.to

If you have a different DOM structure, you can use different DOM methods to extract the element you need. For example, on DEV.to, the headers look like this:

```xml
<h2>
  <a name="overview" href="#overview">
  </a>
  Overview
</h2>
```

So the selector needs to be just `main h2`. But when you execute this code:

```js
[...document.querySelectorAll('main h2, main h3, main h4')];
```

You will see that there are way more headers than the content of the document. Luckily, we can use a new selector in CSS `:has()`. The final selector for one header can look like this: `main h2:has(a[name])`.

Here is the full code:

```js
const selector = 'main h2:has(a[name]), main h3:has(a[name]), main h4:has(a[name])';
const headers = [...document.querySelectorAll(selector)];

console.log(headers.map(function(node) {
  // H2 header should have 0 indent
  const level = parseInt(node.nodeName.replace('H', '')) - 2;
  // this is how you get the hash
  // you can also access href attribute and remove # from the output string
  const hash = node.querySelector('a').getAttribute('name');
  const indent = ' '.repeat(level);
    return `\({indent}* [\){node.innerText}](#${hash})`;
}).join('\n'));
```

---

## Conclusion

Creating a table of contents can help your readers digest your article. Since most people don’t read the whole article, they only scan for what they need. You can also find a lot of articles about its impact on SEO. So it’s always worth adding one if the article is longer.

And as you can see, creating a ToC is not that hard with a bit of web development knowledge.

::: info

If you like this article, you may want to follow me on Social Media: ([Twitter/X (<VPIcon icon="fa-brands fa-x-twitter" />`jcubic`)](https://x.com/jcubic), [GitHub](https://github.com/jcubic), and/or [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`jakubjankiewicz`)](https://linkedin.com/in/jakubjankiewicz/)). You can also check my [<VPIcon icon="fas fa-globe"/>personal website](https://jakub.jankiewicz.org/) and my [<VPIcon icon="fas fa-globe"/>new blog](https://jakub.jankiewicz.org/blog/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Table of Contents for Your Article",
  "desc": "When you create an article, such as a blog post for freeCodeCamp, Hashnode, Medium, or DEV.to, you can help guide the reader by creating a Table of Contents (ToC). In this article, I'll explain how to",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-table-of-contents-for-your-article.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
