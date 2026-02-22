---
lang: en-US
title: "A Complete Guide to Bookmarklets"
description: "Article(s) > A Complete Guide to Bookmarklets"
icon: fa-brands fa-css3-alt
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Complete Guide to Bookmarklets"
    - property: og:description
      content: "A Complete Guide to Bookmarklets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/a-complete-guide-to-bookmarklets.html
prev: /programming/js/articles/README.md
date: 2026-02-25
isOriginal: false
author:
  - name: Declan Chidlow
    url: https://css-tricks.com/author/declanchidlow/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/02/bookmarklets.png
---

# {{ $frontmatter.title }} 관련

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
  name="A Complete Guide to Bookmarklets"
  desc="Browsers don't just let you bookmark web pages. You can also bookmark JavaScript, allowing you to do so much more than merely save pages."
  url="https://css-tricks.com/a-complete-guide-to-bookmarklets"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/02/bookmarklets.png"/>

You’re surely no stranger to bookmarks. The ability to favorite, save, or “bookmark” web pages has been a staple browser feature for decades. Browsers don’t just let you bookmark web pages, though. You can also bookmark JavaScript, allowing you to do so much more than merely save pages.

A JavaScript script saved as a bookmark is called a “bookmarklet,” although some people also use the term “favelet” or “favlet.” Bookmarklets have been around since the late 90s. The site that coined them, [<VPIcon icon="fas fa-globe"/>bookmarklets.com](https://bookmarklets.com), even remains around today. They’re simple and versatile, a fact evidenced by most of the bookmarklets listed on the aforementioned site are still working today despite being untouched for over two decades.

While bookmarklets have fallen a bit to the wayside in more recent years as browsers have grown more capable and dev tools have matured, they’re still a valuable tool in any web developer’s arsenal. They’re simple but capable, and no additional software is needed to create or use them. If you watch any good machinist or engineer at work, they’re constantly building tools and utilities, even one-off contraptions, to address problems or come to a more graceful solution as they work. As developers, we should endeavor to do the same, and bookmarklets are a perfect way to facilitate such a thing.

---

## Making a Bookmarklet

Bookmarklets are extremely easy to make. You write a script in exactly the same manner you would if writing it for the browser console. You then save it as a bookmark, prefixing it with `javascript:` which designates it for use in the browser URL bar.

Let’s work through making a super basic bookmarklet, one that sends a simple alert. We’ll take the below code, which triggers a message using the [<VPIcon icon="fa-brands fa-firefox"/>`alert()` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert), and bookmarklet-ify it.

```js
alert("Hello, World!");
```

Next, we will turn it into an Immediately Invoked Function Expression (IIFE), which has a few benefits. Firstly, it creates a new scope to avoid polluting the global namespace and prevents our bookmarklet from interfering with JavaScript already on the page, or vice versa. Secondly, it will cause the bookmarklet to trigger upon click.

We’ll achieve this by enclosing it within an anonymous function (lambda) (e.g., `(() => {})`) and suffixing it with `();`, which will execute our function.

```js
(() => {
  alert("Hello, World!");
})();
```

For reliability across browsers, it is to our benefit to URL-encode our bookmarklet to escape special characters. Without doing so, browsers can go awry and misinterpret our code. Even if it isn’t entirely necessary with a simple bookmarklet like this, it can prevent a lot of trouble that may arise with more complexity. You can encode your bookmarklet yourself using JavaScript’s `encodeURIComponent()` function, or you can use one of a number of existing tools. We’ll also reduce it to a single line.

```js
(()%3D%3E%7Balert(%22Hello%2C%20World!%22)%3B%7D)()%3B
```

We must prefix `javascript:` so that our browser knows this is not a standard URL to a webpage but instead a JavaScript bookmarklet.

```js
javascript:(()%3D%3E%7Balert(%22Hello%2C%20World!%22)%3B%7D)()%3B
```

---

## Installing a Bookmarklet

Finally, we must add it to our browser as a bookmarklet. As you might expect, this is extremely dependent on the browser you’re using.

In Safari on macOS, the easiest way is to bookmark a webpage and then edit that bookmark into a bookmarklet:

![Safari window with the Favorites tab opened and a context menu open for an item highlighting the Edit Address option.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_6D7BE272E8A0E345477B0D201AD1DD6E7BA00C2024D2C6F146AD477BDF84A5A5_1770251973185_satty-20260205-083636.png?resize=1812%2C1150)

In Firefox on desktop, the easiest way is to secondary click on the bookmark toolbar and then “Add Bookmark…”:

![Firefox window showing the Add Bookmark option.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_6D7BE272E8A0E345477B0D201AD1DD6E7BA00C2024D2C6F146AD477BDF84A5A5_1770252200809_firefox.png?resize=1416%2C1140)

In Chrome on desktop, the easiest way is to secondary click on the bookmark toolbar and then “Add page…”:

![Chrome window showing the Add page option.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_6D7BE272E8A0E345477B0D201AD1DD6E7BA00C2024D2C6F146AD477BDF84A5A5_1770252261152_chrome.png?resize=1410%2C1142)

Many mobile browsers also allow the creation and usage of bookmarks. This can be especially valuable, as browser dev tools are often unavailable on mobile.

---

## CSS Bookmarklets

You’ve no doubt been looking at the word “JavaScript” above with a look of disdain. This is *CSS*-Tricks after all. Fear not, because we can make bookmarklets that apply CSS to our page in a plethora of ways.

My personal favorite method from an authoring perspective is to create a `<style>` element with my chosen content:

```js
javascript: (() => {
  var style = document.createElement("style");
  style.innerHTML = "body{background:#000;color:rebeccapurple}";
  document.head.appendChild(style);
})();
```

The much more graceful approach is to use the [<VPIcon icon="fa-brands fa-firefox"/>`CSSStyleSheet` interface](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet). This approach allows for incremental updates and lets you directly access the CSS Object Model (CSSOM) to read selectors, modify existing properties, remove or reorder rules, and inspect computed structure. The browser also validates values input this way, which helps prevent you from inputting broken CSS. It is more complex but also gives you greater control.

```js
javascript: (() => {
  const sheet = new CSSStyleSheet();
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  sheet.insertRule("body { border: 5px solid rebeccapurple !important; }", 0);
  sheet.insertRule("img { filter: contrast(10); }", 1);
})();
```

As we’re writing CSS for general usage across whatever page we wish to use our bookmarklet on, it is important to remain aware that we may run into issues with specificity or conflicts with the page’s existing stylesheets. Using `!important` is usually considered a bad code smell, but in the context of overriding unknown existing styles, it is a reasonable way to address our needs.

---

## Limitations

Unfortunately, there are a few roadblocks that can hinder our usage of bookmarklets. The most pervasive are Content Security Policies (CSP). A CSP is a security feature that attempts to prevent malicious actions, such as [**cross-site scripting**](/css-tricks.com/what-is-xss.md) attacks, by allowing websites to regulate what can be loaded. You wouldn’t want to allow scripts to run on your bank’s website, for instance. A bookmarklet that relies on cross-origin requests (requests from outside the current website) is very frequently blocked. For this reason, a bookmarklet should ideally be self-contained, rather than reliant on anything external. If you’re suspicious a bookmarklet is being blocked by a website’s security policies, you can check the console in your browser’s developer tools for an error.

![Firefox blocking a bookmarklet from running due to inline scripts being disallowed.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_6D7BE272E8A0E345477B0D201AD1DD6E7BA00C2024D2C6F146AD477BDF84A5A5_1770189129502_satty-20260204-150845.png?resize=2186%2C1340)

As bookmarklets are just URLs, there isn’t any strict limit to the length specified. In usage, browsers do impose limits, though they’re higher than you’ll encounter in most cases. In my own testing (which may vary by version and platform), here are the upper limits I found: The largest bookmarklet I could create in both Firefox and Safari was 65536 bytes. Firefox wouldn’t let me create a bookmarklet of any greater length, and Safari would let me create a bookmarklet, but it would do nothing when triggered. The largest bookmarklet I could create in Chrome was 9999999 characters long, and I started having issues interacting with the textbox after that point. If you need something longer, you might consider loading a script from an external location, keeping in mind the aforementioned CSP limitations:

```js
javascript:(() => {
  var script=document.createElement('script');
  script.src='https://example.com/bookmarklet-script.js';
  document.body.appendChild(script);
})();
```

Otherwise, you might consider a userscript tool like [<VPIcon icon="fa-brands fa-chrome"/>TamperMonkey](https://tampermonkey.net), or, for something more advanced, creating your own browser extension. Another option is [<VPIcon icon="fa-brands fa-chrome"/>creating a snippet in your browser developer tools](https://developer.chrome.com/docs/devtools/javascript/snippets/). Bookmarklets are best for small snippets.

---

## Cool Bookmarklets

Now that you’ve got a gauge on what bookmarklets are and, to an extent, what they’re capable of, we can take a look at some useful ones. However, before we do, I wish to stress that you should be careful running bookmarklets you find online. Bookmarklets you find online are code written by someone else. As always, you should be wary, cautious, and discerning. People can and have written malicious bookmarklets that steal account credentials or worse.

For this reason, if you paste code starting with `javascript:` into the address bar, browsers automatically strip the `javascript:` prefix to prevent people from unwittingly triggering bookmarklets. You’ll need to reintroduce the prefix. To get around the `javascript:` stripping, bookmarklets are often distributed as links on a page, which you’re expected to drag and drop into your bookmarks.

Specific bookmarklets have been talked about on CSS-Tricks before. Given the evolution of browsers and the web platform, much has been obsoleted now, but some more contemporary articles include:

- [**6 Useful Bookmarklets to Boost Web Development**](/css-tricks.com/web-development-bookmarklets.md) by Daniel Schwarz.
- [**Using the CSS Me Not Bookmarklet to See (and Disable) CSS Files**](/css-tricks.com/css-me-not-bookmarklet.md) by Chris Coyier.

Be sure to check out the comments of those posts, for they’re packed with countless great bookmarklets from the community. Speaking of bookmarklets from the community:

- Adrian Roselli has a fantastic collection of [“CSS Bookmarklets for Testing and Fixing”](https://adrianroselli.com/2015/01/css-bookmarklets-for-testing-and-fixing.html).
- Stuart Robson put together [“A Few Useful Web Development Bookmarklets”](https://alwaystwisted.com/articles/a-few-web-developer-bookmarklets).
- Ian Lloyd has a selection of [bookmarklets for performing accessibility audits](https://a11y-tools.com/bookmarklets/)

If you’ve got any golden bookmarklets that you find valuable, be sure to share them in the comments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Complete Guide to Bookmarklets",
  "desc": "Browsers don't just let you bookmark web pages. You can also bookmark JavaScript, allowing you to do so much more than merely save pages.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/a-complete-guide-to-bookmarklets.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
