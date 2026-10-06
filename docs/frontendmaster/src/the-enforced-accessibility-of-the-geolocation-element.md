---
lang: en-US
title: "The Enforced Accessibility of the Geolocation Element"
description: "Article(s) > The Enforced Accessibility of the Geolocation Element"
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
      content: "Article(s) > The Enforced Accessibility of the Geolocation Element"
    - property: og:description
      content: "The Enforced Accessibility of the Geolocation Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.html
prev: /programming/css/articles/README.md
date: 2026-03-09
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8870
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
  name="The Enforced Accessibility of the Geolocation Element"
  desc="It's a strange situation where some CSS is disallowed, some is allowed but breaks the button, and some is capped."
  url="https://blog.master.dev/the-enforced-accessibility-of-the-geolocation-element/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8870"/>

There’s a `<geolocation>` element in HTML now. Looks like [<VPIcon icon="fa-brands fa-chrome"/>Chrome led it up](https://developer.chrome.com/blog/geolocation-html-element) and got it into Chrome first. Now we’re in the ol’ 🤷‍♀️ state on when we’ll get it elsewhere. But the process certainly involved other browser makers, so that’s good.

::: info

[Manuel Matuzović has a good intro blog post](https://matuzo.at/blog/2026/geolocation-element).

<SiteInfo
  name="Introduction to the new HTML element <geolocation> - Manuel Matuzovic"
  desc="I'm a frontend developer in Graz, specialized in HTML, accessibility, and CSS layout and architecture."
  url="https://matuzo.at/blog/2026/geolocation-element/"
  logo="https://matuzo.at/favicon.svg"
  preview="https://res.cloudinary.com/dp3mem7or/image/upload/w_1200/articles/sm_geolocation.png?s=050326"/>

:::

::: note

The element doesn’t behave right within an `<iframe>` so embedding a demo here doesn’t make sense. You can [<VPIcon icon="fas fa-globe"/>see a small demo here](https://natural-wave-lizard.codepen.app/), and the [code is here (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019cbf34-d065-7049-8dcc-a25099c9debe).

:::

Here’s what I think you should know:

- It’s a `<button>` with an enforced design. It’s got a map icon and text that says “Use location” (or “Use precise location” if you use `accuracymode="precise"`)
- Clicking the button will,
  - if access is granted, do a geolocation and fire a `location` event.
  - if access needs to be granted, it will ask first, then act accordingly.
  - if access has already been denied, a new prompt will remind you it’s been denied, and give you a chance to grant it.
- The last bullet point above is crucial. It allows you to “recover” from a denied-permission state in a way that was previously impossible.
- You can use it progressive-enhancement style by putting an actual `<button>` inside with event handlers that go through a flow where you aren’t 100% sure if you have granted permissions. Or [polyfill (<VPIcon icon="iconfont icon-github"/>`WICG/PEPC`)](https://github.com/WICG/PEPC/tree/main/polyfills/geolocation) it.
- It enforces a variety of accessibility requirements quite strictly.

It’s that last one we can dig into a little here, as I find it quite interesting. I’m not sure if we’ve had an element in HTML that behaves quite like this before.

::: note

I don’t think accessibility itself is actually the motivation behind these rules. It’s actually about security and the danger of “tricking” people into exposing their geolocation when they may not want to. For example: “Want 100 free Robux? Click here, then click Allow on the next pop-up.” It can’t totally stop that, but it can try.

:::

The enforced-accessibility behavior comes in several forms:

---

## You can’t change the text or the icon

As far as I can tell, anyway! The content is in a user-agent Shadow Root and there isn’t any `part` attributes or anything for styling access.

![Code snippet showing a geolocation permission request with HTML structure and SVG icon.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/Screenshot-2026-03-09-at-8.24.22-AM.png?resize=1024%2C336&ssl=1)

The normal things that penetrate the Shadow DOM still will, though. Like the `color` still sets the `color` and the SVG icon is set to `fill: currentColor;` so the icon color will change along with the text.

But!

You do get automatic localization, which is *really nice.* Whatever the `lang` attribute is set to in that area of the DOM, you’ll get text in the corrrect language.

---

## There is various CSS you just *can’t use*

Some CSS you try to apply to a `<geolocation>` button will simply be ignored.

```css
geolocation {
  /* NOPE */
  translate: 100px 100px;
  transform: scale(0);
  opacity: 0.75;
  filter: opacity(0);
  inline-size: 2px;
  clip-path: inset(50%);
}
```

I don’t know if that’s comprehensive, but the point is, if you try to write some CSS for this button and it doesn’t work, it’s probably on purpose. There is some conflicting information, like the Chrome post says 2D translates are allowed, but in practice, they are not.

---

## There is some CSS that is fenced

These are pretty strange!

```css
geolocation {
  /* Actually capped at between -0.65px and 2.6px */
  letter-spacing: 10em; 

  /* Actually capped at between 0 and 6.5px */
  word-spacing: 10em;

  /* Allowed, but the minimum is content size */
  block-size: 1px;
  height: 1px;

  /* Allowed, but the minimum is content size */
  inline-size: 1px;
  width: 1px;
}
```

Perhaps the strangest one is `font-size` in that it’s capped but *also* has functionality limits.

```css
geolocation {
  /* Allowed */
  font-size: 50px;

  /* Forces minimum size of 8px and stops working */
  font-size: 1px;

  /* Allowed, but stops working. */
  font-size: 12px;

  /* Minimum size to work */
  font-size: 13px;
}
```

I also note that `font-size: 1px;` actually *does* render when the button is in an `<iframe>`, so uhhhh, whatever you wanna make of that.

---

## There is some CSS that is allowed, but then disables the button.

Like `font-size` above, there is other CSS you can apply that is allowed (renders) but then makes the button just not work. By not work, I specifically mean it will not trigger `location` events.

```css
geolocation {
  background: white;
  color: white;
}
```

That succeeds in hiding the button from view (on a white page), but if you find and click it, it won’t work.

This is quite easy to happen! For instance:

```css
geolocation {
  /* Failure state */
  color: orange;
}
```

The color `orange` (with a white background) is not enough contrast to be acceptable.

This does trigger an “issue” in Chrome DevTools. It’s not a JavaScript error so you won’t see it in the console, it comes up in the Issues area.

![Error message indicating geolocation element activation issue due to invalid style, with instructions for resolving it.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/Screenshot-2026-03-09-at-11.22.53-AM.png?resize=1014%2C966&ssl=1)

It doesn’t tell you what those styling restrictions *are*, but I guess you can guess and test.

---

## It’s kinda weird.

It’s quite weird how there is all this CSS that it’s happy to forcibly rein in for you. But then, other CSS just allows it through and disables the button. Or, I should say, “just makes not work”, because the button does not present itself in the accessibility tree as disabled.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Enforced Accessibility of the Geolocation Element",
  "desc": "It's a strange situation where some CSS is disallowed, some is allowed but breaks the button, and some is capped.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
