---
lang: en-US
title: "Adaptive Alerts (a CSS scroll-state Use Case)"
description: "Article(s) > Adaptive Alerts (a CSS scroll-state Use Case)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Adaptive Alerts (a CSS scroll-state Use Case)"
    - property: og:description
      content: "Adaptive Alerts (a CSS scroll-state Use Case)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/adaptive-alerts-a-css-scroll-state-use-case.html
prev: /programming/css/articles/README.md
date: 2025-07-16
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6397
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
  name="Adaptive Alerts (a CSS scroll-state Use Case)"
  desc="A single button, but it has two different behaviors in JavaScript depending on how far you’ve scrolled in an element (as determined by CSS!)"
  url="https://frontendmasters.com/blog/adaptive-alerts-a-css-scroll-state-use-case/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6397"/>

Sometimes it’s useful to adapt the controls available to users based on whether they’ve **scrolled through key position**s on a page.

Here’s an example: a user scrolls through a Terms & Conditions page. If they click “agree” *without* having scrolled down until the end, we could prompt them with a “please confirm you’ve read these terms” before continuing. Whereas if they *have* scrolled down the whole way, that could imply they have read the terms, so we don’t need the additional prompt.

Implementing something like this is relatively easy with the recent CSS scroll-state queries ([<VPIcon icon="fas fa-globe"/>browser support](https://frontendmasters.com/blog/wp-admin/post.php?post=6397&action=edit)).

The following is an example of exactly as described above. If you click the “Sign Up” button without having scrolled down until the end, you’ll see an additional prompt reminding that you might not have read the terms yet and if you’d still like to sign up. And if the “Sign Up” is clicked after the text has been scrolled to the end, the sign-up acknowledgement pops up without any confirmation prompt first.

<VidStack src="https://videopress.com/embed/KZkpkHaK" />

This is a video version of the demo, because [<VPIcon icon="iconfont icon-caniuse"/>browser support is Chrome-only](https://caniuse.com/mdn-css_at-rules_container_scroll-state_queries) as this article is published.

Here’s a live demo:

<CodePen
  user="rpsthecoder"
  slug-hash="zxGyQNe"
  title="Scroll-adaptive alerts"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## The Layout

We’ll start with this basic layout:

```html
<article>
  <!-- many paragraphs of ToS text goes here -->
  <div class="control">
    <button>Sign Up</button>
  </div>
</article>
```

```css
article {
  overflow: scroll;
  container-type: scroll-state;
  .control {
    position: sticky;
    bottom: -20px;
  }
}
```

The sign up button’s container (`.control`) is a *sticky* element that sticks to the bottom of its scrollable container (`<article>`). This is so the user always has access to the sign up button, in case they prefer to drop reading the terms and sign up right away.

The scrollable container (`<article>`) has `container-type: scroll-state.` This makes it possible to make changes to its descendants based on their scroll positions.

---

## The Scroll-State Conditional Rule

This is where we code in how the button control’s action adapts to its scroll position inside the`article`.

```css
@container not scroll-state(scrollable: bottom) {
  button {
    appearance: button;
  }
}
```

When the container (`<article>` in our example) can no longer be scrolled further down, i.e. the container has already been scrolled until its bottom edge, we make a subtle change to the button in CSS that won’t visually modify it. In the example above, the button’s appearance is set to button from its default auto, keeping the button’s look the same.

---

## The Alerts

When the button is clicked, depending on the value of its `appearance` property, show the relevant alert.

```js
document.querySelector('button').onclick = (e) => {
  if (getComputedStyle(e.target).appearance == "auto" 
      && !confirm("Hope you've read the terms. Do you wish to complete the sign up?"))
    return;

  alert("Sign up complete");
};
```

If the `<article>` has not been scrolled down until the end, the button’s `appearance` value remains its default auto (`getComputedStyle(e.target).appearance == "auto"`). The click handler executes a `confirm()` prompt reminding the user they might not have read the terms fully yet, and if they’d like to continue with the sign up. If the user clicks “OK”, the `alert("Sign up complete")` message shows up next.

If the article has been scrolled down to the end, the button will have an `appearance` value other than `auto`, and so the click handler executes the `alert()` *only*. 

---

Learn aboutscroll-state queries([<VPIcon icon="fa-brands fa-firefox"/>here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries) and/or [<VPIcon icon="fa-brands fa-chrome"/>here](https://developer.chrome.com/blog/css-scroll-state-queries)) to know the different kinds of scrolling scenarios that you can work with. Based on scroll states and positions, you’ll be able to change the appearance, content, or even functionality (as seen in this article) of an element or module.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Adaptive Alerts (a CSS scroll-state Use Case)",
  "desc": "A single button, but it has two different behaviors in JavaScript depending on how far you’ve scrolled in an element (as determined by CSS!)",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/adaptive-alerts-a-css-scroll-state-use-case.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
