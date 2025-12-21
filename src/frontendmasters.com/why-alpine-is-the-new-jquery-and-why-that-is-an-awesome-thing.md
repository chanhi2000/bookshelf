---
lang: en-US
title: "Why Alpine is the new jQuery and Why that is an Awesome Thing"
description: "Article(s) > Why Alpine is the new jQuery and Why that is an Awesome Thing"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
  - alpine
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why Alpine is the new jQuery and Why that is an Awesome Thing"
    - property: og:description
      content: "Why Alpine is the new jQuery and Why that is an Awesome Thing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing.html
prev: /programming/js/articles/README.md
date: 2024-11-07
isOriginal: false
author:
  - name: Raymond Camden
    url : https://frontendmasters.com/blog/author/raymondcamden/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4338
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
  name="Why Alpine is the new jQuery and Why that is an Awesome Thing"
  desc="jQuery for was great and all, but Alpine.js simplifies tasks like data binding and DOM manipulation, providing using a more declarative and clear structure, making it ideal for smaller projects."
  url="https://frontendmasters.com/blog/why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4338"/>

Back in the old days, when I was building web sites by hand, in the snow, uphill, both ways,[<VPIcon icon="iconfont icon-jQuery"/>jQuery](https://jquery.com/)was my default tool when building any kind of interactivity on a web page. Way before I even considered building apps, jQuery was the workhorse that made cross-browser web development easy, or at least a little less painful. In 2024, it’s still in use on the vast majority of web sites. (I’ve seen various numbers, but all point to*at least*roughly three fourths of the web sites in use today.)

I think part of the reason jQuery was so successful is that, along with patching browser incompatibilities (looking at you,Safari & Internet Explorer), it was a laser focused set of utilities for common things developers needed to do. Mainly:

- Making network requests (without the pain of `XMLHttpRequest`)
- Listening for events in the DOM
- Making changes in the DOM

It did a lot more than that, but those three items are part of every interactive web page I’ve built since the introduction of JavaScript. This is why I’ve been so enamored of late with[<VPIcon icon="fas fa-globe"/>Alpine.js](https://alpinejs.dev/). Alpine.js is lightweight (44kb minified, around half of jQuery’s size) and simple enough that the entire thing (at a high level), is documented *on the home page*. Let’s quickly go over the basics, and hopefully you’ll fall in love as well!

---

## Installation and Setup

You can do a`npm install alpinejs`if you want, but it’s easier to drop the CDN link in the head of your web page:

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

The next part requires a bit of thought. jQuery, once installed, was available everywhere and you could do just about anything. If you ever used Vue.js for progressive enhancement (versus as your entire application), you might remember that you had to specify the part of the DOM that Vue would work with. Basically, “This area of the DOM will make use of variables, have event handlers I track and so forth.” This usually was the main block of your web page, not the header and footer.

Alpine is the same way. To keep things simple, I’ll be using one main`<div>`block for this purpose. This is done with an`x-data`attribute:

```html
<div x-data="stuff here in a bit...">
</div>
```

OK, ready to get started?

---

## Setting and Displaying Variables

Let’s begin by initializing a few variables and showing how Alpine renders them. First, to define variables, you can set them as an object inside`x-data`:

```html
<div x-data="{
  name:'Raymond',
  age:51,
  cool:false
}">
</div>
```

To display these values, you can use two different directives.The `x-text`attribute will bind the text value of a variable to the DOM while`x-html`will bind HTML. Which you use depends on the data. Here’s this in action:

```html
<div x-data="{
  name:'Raymond',
  age:51,
  cool:false
}">
  <p>
    My name is <span x-text="name"></span>.
    I'm <span x-text="age"></span> years old.
  </p>
</div>
```

Unlike Vue, Alpine.js doesn’t have a “mustache-like” language built in, but instead relies on attributes applied to your DOM itself. In this case,`span`tags. You could bind them to any element, but`span`s make sense here for simple values. I will admit, it*is*a bit verbose, but it’s nice that it’s easy to spot in code. You can see this in action below (and feel free to edit the values of course):

<CodePen
  user="cfjedimaster"
  slug-hash="XWvqbLN"
  title="Alpine Article 2"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s basic “render data from JavaScript in the DOM”, but let’s now show how to*conditionally*show information. Like Vue, Alpine provides two methods. The first,`x-show`, will hide or display items in the DOM based on their value:

```html
<div x-data="{
  name:'Raymond',
  age:51,
  cool:false
}">
  <p>
    My name is <span x-text="name"></span>.
    I'm <span x-text="age"></span> years old.
  </p>
  <p x-show="cool">
    Oh, and I'm so darn cool!
  </p>
</div>
```

The other method,`x-if`, will add and remove the contents of your DOM based on the value. Because of this, it requires you make use of`template`**and**use one top level root element, like a`div`or`p`. I’ll admit this tripped me up from time to time, but Alpine does a good job of reporting the issue if you screw this up. Here’s the same example as above, re-written with`x-if`:

```html
<template x-if="cool">
  <p>
    Did I mention I'm cool?
  </p>
</template>
```

You can test this below. Switch the value of`cool`to see it in action:

<CodePen
  user="cfjedimaster"
  slug-hash="VwoQNXK"
  title="Alpine Article 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Finally, what about looping? Alpine provides the`x-for`directive. Like`x-if`, you’ll use a`template`tag with one root element. Here’s an example:

```html :collapsed-lines
<div x-data="{
  name:'Raymond',
  age:51,
  cool:false,
  hobbies:['building cat demos','star wars','cats']
}">
  <p>
    My name is <span x-text="name"></span>.
    I'm <span x-text="age"></span> years old.
  </p>
  <ul>
    <template x-for="hobby in hobbies">
      <li x-text="hobby"></li>
    </template>
  </ul>
</div>
```

Note the use of “variable in array” syntax. You can use whatever you want here, but name it something sensible. Also, in the example above I’m looping over an array of strings. You can loop over an array of objects as well. Check it out in the embed below:

<CodePen
  user="cfjedimaster"
  slug-hash="YzmLyzv"
  title="Alpine Article 3"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Two-Way Binding

How about binding form fields to your data? Once again, Alpine provides a directive,`x-model`. This works on any form field*except*file inputs (although, like in Vue, there’s a workaround).

For example:

```html
<label for="firstName">First Name:</label>
<input id="firstName" x-model="firstName">

<br />

<label for="lastName">Last Name:</label>
<input id="lastName" x-model="lastName"><br/>

<label for="cool">Cool?</label>
<select id="cool" x-model="cool">
  <option>true</option>
  <option>false</option>
</select>
```

The embed below demonstrates this, along with conditionally showing content based on the dropdown:

<CodePen
  user="cfjedimaster"
  slug-hash="MWNGabj"
  title="Alpine Article 4"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Binding Attributes

Closely related to two-way binding of form fields is the simpler act of binding an HTML attribute to your data. Alpine, again, provides a directive for this,`x-bind`, as well a shortcut.

Given your data has a value for`catPic`, we can bind it like so:

```html
<img x-bind:src="catPic">
```

Because this is something folks may use quite a bit, Alpine provides a shortcut:

```html
<img :src="catPic2">
```

I feel like a live embed of this would be gratuitous given how simple this is, but as it’s pictures of cats, sorry, you’re getting an embed:

<CodePen
  user="cfjedimaster"
  slug-hash="bGXMVad"
  title="Alpine Article 5"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Events

As you can probably guess by now, events are supported by a directive, this time the`x-on`directive where you specify the event and the handler to call. As with attribute bindings, there’s a shortcut. Here’s a simple example:

```html
<div x-data="{
  catPic:'https://placecats.com/400/400',
  flipImage() {
    if (this.catPic.includes('/g')) this.catPic = this.catPic.replace('/g', '');
    else this.catPic = this.catPic.replace('/400', '/g/400');
  }
}">
  <img :src="catPic" x-on:click="flipImage">
</div>
```

I’ve defined a click handler on the image that runs a method,`flipImage`. If you look up in the`x-data`block, you can see I’ve defined the function there. In Alpine, your data can consist of various variables*and*methods interchangeably. Also note that`flipImage`uses the`this`scope to refer to the variable,`catPic`. All in all, this flips out a static picture of a cat with a grayscale version.

The shorthand removes`x-on:`and simply uses`@`:

```html
<img :src="catPic" @click="flipImage">
```

You can play with this below:

<CodePen
  user="cfjedimaster"
  slug-hash="mdNLVaR"
  title="Alpine Article 6"
  :default-tab="['css','result']"
  :theme="dark"/>

Alpine also supports various modifies for event handling including the ability to run events once, prevent default behavior, throttle, and more. Check the[<VPIcon icon="fas fa-globe"/>modifiers](https://alpinejs.dev/directives/on#modifiers)docs for more examples.

---

## Let’s Discuss the Smell…

I can still remember the first presentation I sat in discussing Alpine. I remember thinking: this looks really simple and practical, but there’s no way in heck I’m going to write a bunch of JavaScript code all inside an HTML attribute on a `div`. Surely I thought,*surely*, the library’s not going to require me to do that?

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/surely.jpg?resize=650%2C484&ssl=1)

Of course there is! To begin, you switch the`x-data`directive from a block of variables and code to simply a name. That name can be anything, but I usually go with`app`. If for some reason I had multiple unrelated Alpine blocks of code on one page I’d use something more descriptive, but`app`is good enough:

```html
<div x-data="app">
  <img :src="catPic" @click="flipImage">
</div>
```

In your JavaScript, you first listen for the`alpine:init`event. This is an event thrown when Alpine itself is loaded, before it tries to interact with the page:

```js
document.addEventListener("alpine:init", () => {
  // stuff here...
});
```

Then you can use`Alpine.data`to initialize your application. Here’s the complete code block:

```js
document.addEventListener("alpine:init", () => {
  Alpine.data("app", () => ({
    catPic: "https://placecats.com/400/400",
    flipImage() {
      if (this.catPic.includes("/g"))
        this.catPic = this.catPic.replace("/g", "");
      else this.catPic = this.catPic.replace("/400", "/g/400");
    }
  }));
});
```

This is*much*cleaner and lets you keep your HTML and JavaScript separated as it should be. (IMO anyway!) You can see this version below:

<CodePen
  user="cfjedimaster"
  slug-hash="qBeYqGX"
  title="Alpine Article 7"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Notice I’m including the Alpine `<script>` tag in the HTML instead of using CodePen’s JavaScript settings so you can clearly see it and so that I can add the `defer` attribute.

:::

With our logic now separated in code, it becomes easier to add new features. For example, by adding an`init`function, Alpine will automatically run the method when the application is loaded. In the*incredibly*simple application below, the`init`method is used to request a Dad Joke immediately:

<CodePen
  user="cfjedimaster"
  slug-hash="qBeYymp"
  title="Alpine Article 8"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## When *not* to use Alpine

I just spent the last two thousand or so words explaining the basics of Alpine and raving about how much I love it so it would be crazy for me to tell you*not*to use it, right? Years ago, when I was much younger and foolish, I*always*reached for a JavaScript framework. First Angular, than Vue. Now that I’m much more mature and rarely make mistakes (ahem), my default is vanilla JavaScript, and by that I mean, no framework. If I just need a few lines of code, it would be silly to load anything I don’t need, even Alpine. That being said, when I’m building something that is doing a lot of DOM manipulation, needs proper two-way binding, or just feels like, mentally, I need an “assistant”, Alpine is what I go to first.

With that, let me leave you with not one, but two Alpine examples I’m particularly proud of. The first is[<VPIcon icon="fas fa-globe"/>IdletFleet](https://idlefleet.netlify.app/), a simple “idle clicker” game where you work to build a space trading empire. Emphasis on the simple.

Next is[<VPIcon icon="fas fa-globe"/>Cat Herder](https://catherder.netlify.app/), another “idle clicker” game but since it involves cats, you can’t be quite as idle.

Both games have links to their respective repositories where you can dig into the code and how Alpine helped, but I encourage you to play both a bit before you peek behind the curtains.

Also be sure to[<VPIcon icon="fas fa-globe"/>perusethe Alpine docs](https://alpinejs.dev/) as I didn’t cover quite everything, but you can easily read the complete docs in less than an hour.[](https://github.com/cfjedimaster/writing/blob/main/intro_to_alpine/article.md#why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing)

<SiteInfo
  name="writing/intro_to_alpine/article.md at main · cfjedimaster/writing"
  desc="Repo for my articles"
  url="https://github.com/cfjedimaster/writing/blob/main/intro_to_alpine/article.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bb285f2f947de009d6282b30cc2e2ba890286c15d252f1e870b9e1e0f03d9589/cfjedimaster/writing"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Alpine is the new jQuery and Why that is an Awesome Thing",
  "desc": "jQuery for was great and all, but Alpine.js simplifies tasks like data binding and DOM manipulation, providing using a more declarative and clear structure, making it ideal for smaller projects.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
