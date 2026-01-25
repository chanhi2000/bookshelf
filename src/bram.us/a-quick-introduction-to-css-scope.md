---
lang: en-US
title: "A quick introduction to CSS @scope"
description: "Article(s) > A quick introduction to CSS @scope"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A quick introduction to CSS @scope"
    - property: og:description
      content: "A quick introduction to CSS @scope"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/a-quick-introduction-to-css-scope.html
prev: /programming/css/articles/README.md
date: 2023-08-22
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/08/F4Cv_xeWcAAncC0formatjpgname4096x4096.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A quick introduction to CSS @scope"
  desc="An introductory thread to CSS @scope."
  url="https://bram.us/2023/08/22/a-quick-introduction-to-css-scope/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/08/F4Cv_xeWcAAncC0formatjpgname4096x4096.jpg"/>

![CSS @scope example](https://bram.us/wordpress/wp-content/uploads/2023/08/F4Cv_xeWcAAncC0formatjpgname4096x4096.jpg)

Have you heard about [<VPIcon icon="fa-brands fa-bluesky"/>#CSS](https://front-end.social/tags/CSS) @scope? It’s an upcoming way to scope the reach of your CSS selectors, allowing you to move away from methodologies such as BEM because you no longer need to name those in-between elements.

It’s coming to Chrome 118, so let’s take a closer look …

::: note UPDATE 2023.10.04

I’ve published [<VPIcon icon="fa-brands fa-chrome"/>a more in-depth article covering `@scope` over at developer.chrome.com](https://developer.chrome.com/articles/at-scope/). You should check that one out instead of this quick intro.

:::

Let’s start with an example showing why you’d need `@scope`.

Say you have the markup as seen in the demo below

<CodePen
  user="bramus"
  slug-hash="dyKjbox"
  title="✅ CSS Scoped Styles 1/4: Problem Statement"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

HTML:

```html
<div class="light">
    <p><a href="…">What color am I?</a></p>
    <div class="dark">
        <p><a href="…">What about me?</a></p>
       <div class="light">
            <p><a href="…">Am I the same as the first?</p>
        </div>
    </div>
</div>
```

CSS:

```css
.light { background: #ccc; }
.dark  { background: #333; }
.light a { color: red; }
.dark a { color: yellow; }
```

In the browser, that third link will be yellow, not red …

![Screenshot of visual output](https://bram.us/wordpress/wp-content/uploads/2023/08/F4CwmfsXMAAHBG6formatjpgname4096x4096.jpg)

This because of how [**the CSS cascade**](/bram.us/the-css-cascade-a-deep-dive-2022-06-09-css-day.md) works.

The used selectors have the same specificity, so the cascade moves on to “Order of appearance”.

Because of that, `.dark a` gets applied last. And since colors inherit, the link inside that nested `.light` will also be yellow.

![Visualization of the Cascade, with “Order of Appearance” highlighted.](https://bram.us/wordpress/wp-content/uploads/2023/08/F4CxEJMWYAAPQTDformatjpgname4096x4096.jpg)

This is where `@scope` can fix things. You use it to scope style rules in CSS, with the application of weak scoping proximity between the scoping root and the subject of each style rule.

(The scoping root is the part between the parens of `@scope` – here `.light` or `.dark`)

```css
@scope (.light) {
  :scope { background: white; }
  a { color: blue;}
}

@scope (.dark) {
  :scope { background: black; }
  a { color: #ccf; }
}
```

The reason that this works is because scoping is an extra step in the cascade. Declarations of the same specificity are weighted by proximity to their scoping root before falling back to source order. How cool is that?! 🤩

![Visualization of the Cascade, with “Scope Proximity” injected and highlighted.](https://bram.us/wordpress/wp-content/uploads/2023/08/F4CxrfLWcAA0Wf8formatjpgname4096x4096.jpg)

So in our example, the visual output will now be correct: links inside `.light` will red and links inside `.dark` will be yellow. This because they look up the nearest *scope root*, yay!

![Screenshot of correct output, with the third link being red.](https://bram.us/wordpress/wp-content/uploads/2023/08/F4CxyhDX0AAhgwTformatjpgname4096x4096.jpg)

The cool thing about `@scope` is that you can also set a scope end, to create a “donut scope”.

```css
@scope (.media-object) to (.content) {
  img {...}
  video {...}
}
```

The selectors inside `@scope` block only target the elements between the start and end of the scope.

So when combined with the markup below, the CSS *won’t* target the `img` inside `.content`

```html
<div class="media-object">
  <img>
  <div class="content">
    ...arbitrary stuff…
    <img>
    ...arbitrary stuff…
  </div>
</div>
```

This allows you to move away from methodologies such as BEM, where you would have named the image in the header something like `.media-object__header__image`, or complex selectors that rely on a bunch of combinators.

With `@scope` you no longer need to, you simply cut off the reach of the selectors using the scope end 😊

One important note to make is that `@scope` limits the reach of the selectors, it does not stop/prevent inheritance.

For example, a color declaration inside a donut-scope will still inherit onto children deeper down the tree that located outside of the scope end.

CSS Scope is [<VPIcon icon="fa-brands fa-chrome"/>shipping with Chrome 118](https://chromestatus.com/feature/5100672734199808), which gets a stable release this October. You can already try it out in Chrome Canary today.

[WebKit/Safari have expressed their support for this API (<VPIcon icon="iconfont icon-github" />`WebKit/standards-positions`)](https://github.com/WebKit/standards-positions/issues/13#event-8212277027), but [Mozilla/Firefox is not convinced about it yet (<VPIcon icon="iconfont icon-github" />`mozilla/standards-positions`)](https://github.com/mozilla/standards-positions/issues/472#issuecomment-1584903556) …

::: info 

This post originally was a thread [on Twitter (<VPIcon icon="fa-brands fa-x-twiter"/>`bramus`)](https://x.com/bramus/status/1693559730084397286) and [on Mastodon (<VPIcon icon="iconfont icon-mastodon"/>`@bramus`)](https://front-end.social/@bramus/110927004589038994). Feel free to repost those threads to give them more reach.

:::

Not covered in this post are the meaning of `:scope` (+ how it differs from `&`) and a [prelude-less `@scope` (<VPIcon icon="fa-brands fa-codepen" />`bramus`)](https://codepen.io/bramus/pen/NWOZXQg). More on that in a future post. 😉


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A quick introduction to CSS @scope",
  "desc": "An introductory thread to CSS @scope.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/a-quick-introduction-to-css-scope.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
