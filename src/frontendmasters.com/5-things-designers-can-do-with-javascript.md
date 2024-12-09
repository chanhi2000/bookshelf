---
lang: en-US
title: "Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers"
description: "Article(s) > Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers"
icon: fa-brands fa-js
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers"
    - property: og:description
      content: "Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/5-things-designers-can-do-with-javascript.html
prev: /programming/js/articles/README.md
date: 2024-05-08
isOriginal: false
author: Chris Coyier
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1927
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers"
  desc="Let's say you don't know JavaScript. You're a web designer and you're focused largely on UI and UX. Let's look at some things you could learn in a day that will give you that bang for the buck."
  url="https://frontendmasters.com/blog/5-things-designers-can-do-with-javascript/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/1927"/>

Let’s say you don’t know JavaScript.

Like, at all.

You haven’t needed it. You’re a web designer and you’re focused largely on UI and UX. Your skills with design tools, HTML, CSS, and team communication have served you well.

But you know what JavaScript *is*. It’s another part of the native web. It’s powerful. It can make websites *do stuff* beyond what HTML and CSS can do alone. You don’t even care to *deeply* learn JavaScript, you just want to get a ton of **bang for the buck** and learn things that will help you do your existing job better.

Let’s look at some things you could learn in a day that will give you that bang for the buck.

We’re going to look at JavaScript code from here on out. But just so I don’t lose anyone, let me make clear *where* you would put this JavaScript code to make it work. You’re put it at the bottom of the HTML of the page you’re working on, before the closing `</body>` tag, put a `<script> /* you're code here */ </script>`. That code will run when any URL that uses that HTML loads.

If you’re writing a lot of it, or want to apply it to multiple HTML documents, you could also do `<script src="./script.js"></script>` and put the JavaScript code in there. That references a file called `script.js` that you would make and put next to the HTML.

Also, a lot of this code will run in the DevTools console in any of the browsers, so you could copy and paste it into there and hit Enter to try it.

---

## 1) Learn to Select Things

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-07-at-11.03.13%E2%80%AFAM-1024x705.png?resize=1024%2C705&ssl=1)

In JavaScript, you often want what’s called a *reference* to an element. That is, a variable that represents the element in the DOM you’re trying to do something with.

Believe it or not, you’re at a real advantage here. Since you already know some CSS, those selectors are exactly what JavaScript can use to get it’s hands on those elements.

Say you had HTML like:

```html
<header id="site-header">
  <h1 class="logo">My Website</h1>
</header>
```

If you wanted a reference to that `<header>` element, do it like this:

```js
const header = document.querySelector("#site-header");
```

The `"string"` inside that `querySelector()` function is essentially the same as the CSS selector `#site-header`.

If you wanted the logo, you could do:

```js
const logo = document.querySelector(".logo");
```

You might be thinking to yourself: but CSS classes might apply to *lots* of elements, how does it know which one to get? The `querySelector` function will select the *first* one it finds as it starts looking from the top of the HTML. If you intentionally want to look for and get a reference to a whole set of elements, look at [<FontIcon icon="fa-brands fa-firefox"/>`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

---

## 2) Learn to Update Classes (i.e. Toggle Stuff)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/CleanShot-2024-05-07-at-11.05.42@2x.png?resize=1024%2C736&ssl=1)

[#1](#1-learn-to-select-things) is a big concept, but it doesn’t actually *do* anything, it just helps you get those element references. Now let’s enact a real *change*. Let’s add a class to that header element we’ve got.

```js
header.classList.add("dark");
```

That does exactly what it looks like. It adds a class to that `<header>` element, so now the HTML (the “DOM”, really) will be like this:

```html
<header id="site-header" class="dark">
  <h1 class="logo">My Website</h1>
</header>
```

As an HTML and CSS person, I imagine you can feel the power here. You can change *any styling you want* when you’ve got a class name you can select and use.

In fact, think about how you can change classes all the way up on the `<html>` element. A class there means, through the power of CSS, **you can change the style for *anything* on the page.** As a neat bonus, you don’t even have to `querySelector` for the `<html>` element. JavaScript automatically has a reference to it available.

```js
document.documentElement.classList.add("paying-user");
```

That [<FontIcon icon="fa-brands fa-firefox"/>`classList` API](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) allows you to add, remove, replace, and toggle classes, as well as check to see if an element contains a certain class, so you’ve got a lot of control there.

```js
element.classList.add("javascript-enabled");
element.classList.remove("loading");
element.classList.replace("cat-lover", "dog-lover");
element.classList.toggle("open");
element.classList.toggle("raining", weather === "rain");
```

---

## 3) Learn to Listen for Events (e.g. Scroll, Click, and Change)

Selecting elements and changing classes is powerful, but it’s very likely you’re going to want to do that *when* something happens. The *when* in JavaScript is often an **event**. It’s another API that allows us to “listen” for events. Events are happening all the time! It’s our job to respond to them when they happen.

The `click` event is the ultimate classic. You’ll want to attach `click` events to elements that can receive focus. A `<button>`, for example, is perfect. You *can* attach a click “handler” to a `<div>`, but it’s a bad choice as a `<div>` isn’t focusable. Many users use their keyboard only to navigate the web and may rely on screen readers to interact with it, and would be unable to “click” a `<div>` with a click hander.

Imagine our header has a button in it:

```html
<header id="site-header">
  <h1 class="logo">My Website</h1>
  <button>Switcheroo</button>
</header>
```

First we get a reference to that button, then add our click handling function:

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
  /* Code in here will run when the button is clicked */
  console.log("Button was clicked!");
});
```

Hopefully that code above is clear. We selected the button, and we added an event listener for the event type `click`. Don’t worry much about the rest of the syntax for now, but just know that code within those `{ }` “curly braces” will run when that button is clicked.

I slipped a little bonus in there for you: `console.log()`. This little beautiful function allows you to send messages to the browser DevTools. If I have those DevTools open (<kbd>Cmd</kbd>/<kbd>Control</kbd>+<kbd>Option</kbd>+<kbd>J</kbd>) I can see the message output there, which is a nice “sanity check” that things are working.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/Screenshot-2024-05-01-at-3.23.40%E2%80%AFPM-1024x712.png?resize=1024%2C712&ssl=1)

You can send just about anything to `console.log()` inside those parenthesis. Try selecting an element and putting the variable name in there.

Inside our new `{ }` in that “click handler function”, we could do the job we already know how to do: update a class.

CodePen Embed Fallback

I know that end result feels rather basic, but I hope it demystifies JavaScript a bit for you. In a sense, we’re just doing these three things:

1. Select
2. Listen
3. Update

---

## 4) Change HTML

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/CleanShot-2024-05-07-at-11.08.06@2x.png?resize=1024%2C704&ssl=1)

Changing the `class` of an element *is* changing the HTML of that element. But we’re not limited to that! We can quite literally change anything about it. Let’s assume `element` is a reference to an element like we learned in #1. We could:

```js
element.innerHTML = "<div>I'm now the entire guts of the element!!!</div>";

element.remove(); // Totally gone

element.dataset.version = "1.0.0"; // <element data-version="1.0.0">

element.style.backgroundColor = "red"; // <element style="background-color: red;">

element.insertAdjacentHTML("afterbegin", '<i>Hello</i>'); // <element><i>Hello</i> ...
```

Those are just some of the many powerful things you can do to HTML once you grab ahold and get a reference to an element.

---

## 5) Grab the values out of Form Elements

We already know how to select elements, and it’s no different for form elements. Say we have a form element like:

```html
<label>
  Size
  <input type="range" id="size" ... >
</label>
```

Let’s:

1. Select it
2. Watch it for changes
3. Do something when it does

```js
// 1
const sizeSlider = document.querySelector("#size");

// 2
sizeSlider.addEventListener("input", (e) => {
  // 3
  wrapper.style.border = ` ${e.target.value}px solid black`;
});
```

Now that you can grab stuff from naturally interactive elements on the page, that should open some doors!

CodePen Embed Fallback

As an exercise, consider a password field like this:

```html
<form id="form">
  <label>
    Password
    <input type="password" id="password">
  </label>
</form>
```

You can watch when the form is submitted, then check the password.

```js
const form = document.querySelector("#form");
const passwordInput = document.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (passwordInput.value === "") {
    // User submitted empty password
  } else if (passwordInput.value === "password") {
    // User submitted correct password
  } else {
    // User submitted incorrect password
  }
});
```

What UI/UX things might you want to do when doing this kind of interactive work? Perhaps you could “shake” the form on incorrect passwords. Maybe you could insert some HTML telling them the password was incorrect and they have X tries left. Maybe you could change colors. As a designer, you’ll likely know exactly what you want to do, and now the page is interactive enough to properly prototype it.

---

## Bonus: Design mode

This is a little bonus one:

```js
document.designMode = "on";
```

This is probably most appropriate as a snippet to put in the DevTools console as a one-off, as having it *always* on would be weird. When this “mode” is on, every element on the page is editable. The text content of it, anyway.

More:

- If you want parts of a page to be editable (that aren’t already form elements), you can always put `contentEditable` on them.
- Just poking around and changing stuff like styles and content in DevTools is essentially doing the same things (behind the scenes) as we’ve learned so far: manipulating the page with JavaScript.
- If you’re *really* into editing websites as they are in the browser as a design tool, check out more elaborate tools like [<FontIcon icon="fas fa-globe"/>VisBug](https://chromewebstore.google.com/detail/visbug/cdockenadnadldjbbgcallicgledbeoc?pli=1).

---

## Extra Credit: HTML Web Components

A Web Component (can be) an element in HTML you just… make up. The point of them is that they do something useful and you re-use them all over your site as needed. The name in them just has to have at least one dash:

```html
<add-rainbows>
  <div>
    HTML in here that doesn't *need* rainbows, but would like them.
  </div>
</add-rainbows>
```

These are a native part of the web platform and can be used no matter what other technology you use to build the site, making them universally useful. If you learn this, which I feel are just as useful for purely UI reasons as they are for anything else, you can bring the idea of components to your HTML work just as you likely already do in your design work. Designers building re-usable components is a world I’d like to see.

Here’s a silly example where the only job this Web Component has is to inject a `<style>` tag into itself that styles itself.

CodePen Embed Fallback

Think: “A small, re-usable bit of styling and/or functionality that wraps a bit of otherwise perfectly usable HTML”. Jeremy Keith [<FontIcon icon="fas fa-globe"/>listed some examples](https://adactio.com/journal/tags/webcomponents) recently:

> - [<FontIcon icon="iconfont icon-github"/>`jgarber623/aria-collapsible`](https://github.com/jgarber623/aria-collapsible) for toggling the display of one element when you click on another.
> - [<FontIcon icon="iconfont icon-github"/>`daviddarnes/play-button`](https://github.com/daviddarnes/play-button) for adding a play button to an `audio` or `video` element.
> - Chris’s [`ajax-form`](https://gomakethings.com/html-web-components/) for sending a form via Ajax instead of a full page refresh.
> - Jim’s [`user-avatar`](https://blog.jim-nielsen.com/2023/html-web-components-an-example/) for adding a tooltip to an image.
> - [<FontIcon icon="iconfont icon-github"/>`zachleat/table-saw`](https://github.com/zachleat/table-saw) for making tables responsive.

---

## Discussion

Are you in this position yourself? Was this helpful? Or are there other things in JavaScript that you’d prefer to learn? Have you gone through this yourself already? What kind of things were the very first things you learned in JavaScript that were helpful?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Five Basic Things About JavaScript That Will Help Non JavaScript-Focused Web Designers",
  "desc": "[object NodeList]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/5-things-designers-can-do-with-javascript.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
