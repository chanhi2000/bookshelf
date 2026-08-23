---
lang: en-US
title: "How to Make an Interactive Element Invisible but Accessible"
description: "Article(s) > How to Make an Interactive Element Invisible but Accessible"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Make an Interactive Element Invisible but Accessible"
    - property: og:description
      content: "How to Make an Interactive Element Invisible but Accessible"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-make-an-interactive-element-invisible-but-accessible.html
prev: /programming/css/articles/README.md
date: 2026-07-08
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://blog.master.dev/author/danielschwarz/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10331
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
  name="How to Make an Interactive Element Invisible but Accessible"
  desc="The attribute `hidden="
  url="https://blog.master.dev/how-to-make-an-interactive-element-invisible-but-accessible/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10331"/>

Let’s say we want to hide some interactive elements until interaction occurs. For example, we want some cards to have share buttons, but we don’t want them to clutter the UI. Other use-cases include skip links, which we can reveal at key moments in the tab order, anchor links (i.e., links to a specific part of a page), which we can reveal when we’re within said part, copy-to-clipboard buttons, which we can reveal when we’re somehow engaged with the content that we want to copy, scroll-to-top buttons, actionbar items of lesser importance — you know, things that might be okay to hide initially because they’re highly contextual or because users will know that they’re there.

This means we need to hide the element while still making it accessible. Well, that’s what the `hidden="until-found"` attribute-value does, but we also need to reserve the space, since we can’t hover what isn’t there, right? We also don’t want to cause any layout shift.

And that’s exactly where `contain-intrinsic-size: auto none` comes into it, which remembers the size of a rendered element.

Here’s an example:

<CodePen
  user="anon"
  slug-hash="RNKRzYK"
  title="Part 2 of Accessibly lay out a hidden element without knowing its size"
  :default-tab="['css','result']"
  :theme="dark"/>

The red border outlines the button, which is hidden but accessible (hoverable, focusable, find-in-pageable, and fragment navigable). The `hidden=until-found` attribute-value makes it find-in-pageable and fragment navigable, while a bit of CSS makes it hoverable and focusable. If you’re ready to see how, let’s begin.

---

## The HTML (`hidden=until-found`)

In the demo below, I’ve added `hidden=until-found` to a `<button>`. This makes the button’s content find-in-pageable (we can reveal the text by searching for “Hidden until found”), fragment navigable (it’ll reveal itself if it matches a fragment identifier/URL hash), and it’s also focusable right off the bat (*well*…the *button’s* focusable, not the content).

```xml
<button hidden="until-found">Hidden until found</button>
```

<CodePen
  user="anon"
  slug-hash="QwGRmMV"
  title="hidden=until-found demo"
  :default-tab="['css','result']"
  :theme="dark"/>

`hidden=until-found` declares `content-visibility: hidden`, overwriting the initial value of `visible`, so it shouldn’t come as a surprise that it toggles the content’s *visibility*, not the element itself. This is why we see an empty button to begin with, and why the button remains focusable.

We’ll worry about hiding the overall button in a minute. For now, let’s worry about the fact that interacting with it causes layout shift, and that it’s not fully hoverable, which’ll be a bigger issue once we actually hide it. Essentially, we need the button to be in its full-size state with the content hidden.

Other approaches (`visibility: hidden`, `display: none`, `opacity: 0`, `width: 0` + `height: 0`, etc.) aren’t accessible visually, or to screen readers, or to find-in-page. Old-school `opacity: 0` is actually the most effective of those because it reserves layout space and makes the content accessible to screen readers, but when it comes to find-in-page, the content is found but not shown. `hidden=until-found`, which leverages `content-visibility`, works because it finds the content and toggles it.

---

## The CSS (mostly `contain-intrinsic-size: auto none`)

But again, how do we reserve the space to make it fully hoverable and avoid layout shift? How do we hover something that isn’t there, exactly? Well, `contain-intrinsic-size: auto none` saves the last rendered size of an element, so all we need to do is render it, if only for a millisecond. We can do this using a `@keyframes` animation.

Obviously, we don’t need to do this if we know size of the element already and have declared it, but if we don’t, then we can show the element for a millisecond using a `@keyframes` animation and use `contain-intrinsic-size: auto none` to say, “Hey, remember that it’s *this* size.”

Anyway, we can see our `@keyframes` animation below, where `content-visibility: visible` is declared at the start of the animation. We don’t include a `to` keyframe selector, which means that it’ll animate to the `content-visibility: hidden` fallback, courtesy of `hidden=until-found`.

```css
@keyframes render {
  /* When the animation starts */
  from {
    /* Make the content visible */
    content-visibility: visible;
  }

  /* This is already implied
  to {
    content-visibility: hidden;
  }
  */
}
```

Now, let’s apply this animation to the button and ensure that its dimensions are saved during the very brief moment that it’s rendered.

`animation: 1ms render` applies `content-visibility: visible` during the one-millisecond animation as `contain-intrinsic-size: auto none` saves the size. However, you’ll almost certainly see the content flicker regardless. From my understanding, this is because of how the Critical Rendering Path (CRP) works, but we can hide the element altogether with `opacity: 0`, so no worries there.

```css
button {
  /* This is almost instantaneous */
  animation: 1ms render;

  /* Save the rendered size while visible */
  contain-intrinsic-size: auto none;

  /* Prevent flickering during the animation */
  opacity: 0;
}
```

On the topic of rendering and depending on web performance, `1ms` might not be enough time to capture the size, especially in Safari for some reason. So if the technique doesn’t work, try increasing the animation duration. Even `2ms` or `3ms` can make a big difference.

As the demo below shows, the button is fully laid out (as indicated by the container’s red border). It’s invisible, and the content is hidden, but it’s also hoverable, focusable, find-in-pageable, and fragment navigable.

<CodePen
  user="anon"
  slug-hash="KwazeWq"
  title="Part 1 of Accessibly lay out a hidden element without knowing its size"
  :default-tab="['css','result']"
  :theme="dark"/>

All we need to do now is make the button react to those interactions and behaviors, which is what I’ve done below with the `&:is(:hover, :focus, :not([hidden]))` nested selector:

```css
button {
  /* This is almost instantaneous */
  animation: 1ms render;

  /* Save the rendered size while visible */
  contain-intrinsic-size: auto none;

  /* Prevent flickering during the animation */
  opacity: 0;

  /* Reveal it at will */
  &:is(:hover, :focus, :not([hidden])) {
    opacity: 1;
    content-visibility: visible;
  }
}
```

Here, `opacity` (which was set to `0` to hide the flickering) is set to `1`, while `content-visibility` (which was set to `hidden` by `hidden=until-found`) is set to `visible`. This happens on hover, on focus, and when the `hidden` attribute is toggled off by find-in-page or a fragment identifier. If you feel like you’re playing too fast and loose with the whole “users will know it’s there” thing, you can move that `:hover` to a parent (i.e., have a link-to-this-comment button reveal itself when the overall comment is hovered).

The button already reverts back to `content-visibility: visible` when find-in-page or a fragment identifier removes the `hidden` attribute (i.e., `:not([hidden])`), but for brevity, we can keep it as-is.

<CodePen
  user="anon"
  slug-hash="RNKRzYK"
  title="Part 2 of Accessibly lay out a hidden element without knowing its size"
  :default-tab="['css','result']"
  :theme="dark"/>

By the way, if the browser has to wait for CSS (e.g., because it’s external), the layout will shift regardless, so I recommend serving the CSS *with* the HTML, just as I’ve done in the demos.

---

## Final Thoughts

I don’t know if making interactive elements (or anything, really) invisible is a neat idea, but if you’re being forced to or you intend to do it anyway, this approach at least responds to all relevant states of interaction, whereas other techniques don’t.

Having said that, I imagine you’d use this technique for decluttering (i.e., to deprioritize unimportant UI components). With that in mind, I strongly suggest placing those components exactly where users expect them, perhaps with some extra padding to make it easier to trigger the hover state.

Finally, note that there are some quirks that look like bugs, but aren’t:

- Content found by find-in-page doesn’t disappear once found
- In Safari, buttons are only tabbable with `tab` *and* `option` (by default, anyway)
- The technique won’t work in background tabs unless they’re [<VPIcon icon="fa-brands fa-chrome"/>prerendered](https://developer.chrome.com/docs/web-platform/prerender-pages)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Make an Interactive Element Invisible but Accessible",
  "desc": "The attribute `hidden=",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-make-an-interactive-element-invisible-but-accessible.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
