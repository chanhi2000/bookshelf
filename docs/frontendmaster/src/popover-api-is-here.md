---
lang: en-US
title: "Popover API is Here"
description: "Article(s) > Popover API is Here"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Popover API is Here"
    - property: og:description
      content: "Popover API is Here"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/popover-api-is-here.html
prev: /programming/css/articles/README.md
date: 2024-04-30
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/1948
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
  name="Popover API is Here"
  desc="This API, which you can use entirely in HTML, allows you to open an element on top of *everything* despite where it lives in the DOM and without any particular styling. "
  url="https://blog.master.dev/popover-api-is-here/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/1948"/>

The [<VPIcon icon="fa-brands fa-firefox"/>Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) has [<VPIcon icon="iconfont icon-caniuse"/>support across browsers](https://caniuse.com/mdn-api_htmlelement_popover) now, and apparently the new way to say that is [**“landed in Baseline”**](/web.dev/popover-api.md), albeit as “newly available” rather than “widely available”, which may be an [**important distinction**](/web.dev/baseline-definition-update.md) for you.

A popover is very much like a [<VPIcon icon="fa-brands fa-firefox"/>`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) in that you don’t have to worry about where it exists in the DOM. When it’s open, it will be “on top”. That alone is a sick feature. I dislike having to put modals as children of the `<body>` just so they don’t have other elements inescapable stacking contexts to worry about.

So then how is it different than a `<dialog>`? Popups are not “modal”. The web-world definition of modal is that it *forces* a user to deal with it (the rest of the page cannot receive focus, it is `inert`). Popups just… pop… up. The user is free to do anything else while a popup is open. Dialogs, not so much.

[<VPIcon icon="fas fa-globe"/>Robin showed off](https://csscade.com/popover-api) how extremely very [easy it is to use (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/XWQwjPY/8c499122e4ab74c76d4997e1ce8a3ce6):

```html
<button popovertarget="mypopover">Toggle the popover</button>

<div id="mypopover" popover>Popover content</div>
```

The fact that that’s possible in *HTML alone* is awfully nice. But of course you can style it with CSS if you like. Plus you get freebies like the fact that they ESC key closes it. Taking it a bit further, here’s an only slightly more fleshed out example using other cool freebies like `popovertargetaction="hide"`:

<CodePen
  user="anon"
  slug-hash="mdzpGwq"
  title="Basic manual popover with close button"
  :default-tab="['css','result']"
  :theme="dark"/>

(p.s. I dig the trick of getting a white ❌ with the `filter` property as shown above. Golf clap.)

Robin goes on to say that the logic for using it is something like this:

> 1. Use `title` if the content in my popover is just text.
> 2. Use the `popover` attribute if the content is more than plain text and like a menu of options or something.
> 3. Use `<dialog>` if you need to force the user to make a decision or block all other interactions on the page.

I only disagree on the first one. I think `title` is pretty useless and I only tend to include one if some accessibility tool warns me to add one, like on an `<iframe>`. The `title` attribute does nothing on mobile/touch devices or screen readers. You can’t control anything about it, like how it looks, where it goes, or how long it takes to show up if it does at all. If we get more control over it (which, who knows, we might) then I’d be happy to take another look, but it seems likely it’ll still be a “only use if it’s a *just text*” situation.

I’m certainly a fan of this API existing, but I do think it’s very hampered right now without the Anchor Position API being nearly [<VPIcon icon="iconfont icon-caniuse"/>as well supported](https://caniuse.com/css-anchor-positioning). Massive use cases like tooltips or flyout menus aren’t really possible without it. Una has written about this as well. And *good news*, it can *also* be HTML powered.

```html
<button id="menu-toggle" popovertarget="menu-items">
  Open Menu
</button>

<ul id="menu-items" popover anchor="menu-toggle">
  <li class="item">...</li>
  <li class="item">...</li>
</ul>
```

Note the `anchor` attribute there connecting the two elements. So cool. And again, you can take finer grained control with CSS if you’d like. “Open right next to this other element” is clutch. Heads up though, [the `anchor` attribute is not ready yet (<VPIcon icon="fa-brands fa-x-twitter"/>`Una`)](https://x.com/Una/status/1783913923072180603).

::: *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>Una</code>)

🚨 PSA for folks with anchor positioning demos: 🚨

The anchor HTML attribute was removed from the initial launch.

You can only set up anchors in CSS now using anchor-name and position-anchor or the anchor-name directly in the anchor() function.

<SiteInfo
  name="X에서 Una 🇺🇦(@Una) 님"
  desc="🚨 PSA for folks with anchor positioning demos: 🚨 The anchor HTML attribute was removed from the initial launch. You can only set up anchors in CSS now using anchor-name and position-anchor or the anchor-name directly in the anchor() function."
  url="https://x.com/Una/status/1783913923072180603/"
  logo="https://x.com/favicon.ico"
  preview="https://pbs.twimg.com/profile_images/1587634978308997121/u7009cGe_400x400.jpg"/>


:::

Taking it futher, [here’s another idea from Una (<VPIcon icon="fa-brands fa-codepen"/>`web-dot-dev`)](https://codepen.io/web-dot-dev/pen/XWxPBdr) that uses an anchor element as a central position and then moves individual items in a circle around it.

<VidStack src="https://videopress.com/f0552f19-cb2b-4163-bd1d-cc2bfd188414" />

I’ll tell ya, Una is *ready* with all this! Particularly with the Anchor Positioning API, she’s got [<VPIcon icon="fa-brands fa-codepen"/>a bunch of demos](https://codepen.io/collection/ExkRWw) and [<VPIcon icon="fas fa-globe"/>a little helper website](https://anchor-tool.com/) to make sure you can declare the positioning CSS you intend:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/04/Screenshot-2024-04-30-at-9.02.58%E2%80%AFAM-1024x683.png?resize=1024%2C683&ssl=1)

I now will await patiently the Anchor Positioning API to drop everwhere. Alas, Popover was [**part of interop 2024**](/blog.master.dev/comparing-interop-2024-choices-to-the-popular-vote.md) where Anchor was not.

```component VPCard
{
  "title": "Menus, toasts and more with the Popover API, the dialog element, invokers, anchor positioning and @starting-style",
  "desc": "Dropdowns, menus, tooltips, comboboxes, toasts — the popover attribute will make building a large variety of UI components easier. The popover attribute can be used on any HTML element, so you have the flexibility to choose whichever element is most appropriate semantically for each particular use case. Unlike a dialog, a popover is always non-modal […]",
  "link": "/blog.master.dev/menus-toasts-and-more.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "What’s the Difference Between HTML’s Dialog Element and Popovers?",
  "desc": "They are pretty similar in both look and functionality, but are have some important differences, slightly different APIs, and functionality. The use cases are also a bit different, so let's have a look!",
  "link": "/blog.master.dev/whats-the-difference-between-htmls-dialog-element-and-popovers.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "/blog.master.dev/using-the-popover-api-for-html-tooltips.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Popover API is Here",
  "desc": "This API, which you can use entirely in HTML, allows you to open an element on top of *everything* despite where it lives in the DOM and without any particular styling. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/popover-api-is-here.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
