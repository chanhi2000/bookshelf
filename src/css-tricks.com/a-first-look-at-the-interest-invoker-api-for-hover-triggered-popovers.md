---
lang: en-US
title: "A First Look at the Interest Invoker API (for Hover-Triggered Popovers)"
description: "Article(s) > A First Look at the Interest Invoker API (for Hover-Triggered Popovers)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A First Look at the Interest Invoker API (for Hover-Triggered Popovers)"
    - property: og:description
      content: "A First Look at the Interest Invoker API (for Hover-Triggered Popovers)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.html
prev: /programming/css/articles/README.md
date: 2025-07-23
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/03/long-hover-icon-tooltip-cursor.jpg
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
  name="A First Look at the Interest Invoker API (for Hover-Triggered Popovers)"
  desc="Chrome 139 is experimenting with Open UI’s proposed Interest Invoker API, which would be used to create tooltips, hover menus, hover cards, quick actions, and other types of UIs for showing more information with hover interactions."
  url="https://css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/03/long-hover-icon-tooltip-cursor.jpg"/>

Chrome 139 is experimenting with Open UI’s proposed [<VPIcon icon="fas fa-globe"/>Interest Invoker API](https://open-ui.org/components/interest-invokers.explainer/), which would be used to create tooltips, hover menus, hover cards, quick actions, and other types of UIs for showing more information with hover interactions. The Interest Invoker API makes these components declarative and hover-triggered, meaning that you create them with HTML, and then the web browser handles the `mouseenter` and `mouseleave` events for you, sans JavaScript.

You’d use it like this:

```html
<a interestfor="target-id">Interest trigger</a>
<div id="target-id" popover>Interest target</div>
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="myebBPB"
  title="Interest invokers demo (basic)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

It’s not stated anywhere that they must be declared as popovers, but they *do* bake the right accessibility hints in.

I want to spend a little time looking at the pieces of this feature, how they‘re used as currently proposed, and offer a few thoughts based on my experience playing with them.

Ready to dive in?

---

## The interest trigger

The *trigger* is what the user will hover ([<VPIcon icon="fas fa-globe"/>or long-press on touchscreen devices](https://open-ui.org/components/interest-invokers.explainer/#touchscreen)) to reveal the interest target. I’d call it an “invoker,” but to avoid confusing it with the [**Invoker Commands API**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md) (which is kind of similar), I’ll stick with “trigger” or “interest trigger” for now.

The interest trigger can be:

- a link (`<a>`),
- a button (`<button>`), or
- an image map area (`<area>`).

And it should have the `interestfor` attribute whose value should reference the `id` of the interest target. Here are examples for each supported element:

```html
<!-- Link -->
<a interestfor="link">Interest trigger</a>
<div id="link" popover>Interest target</div>

<!-- Button -->
<button interestfor="button">Interest trigger</button>
<div id="button" popover>Interest target</div>

<!-- Image map -->
<img src="" alt="" usemap="#map">
<map name="map">
  <area interestfor="area" shape="" coords="" alt="">
</map>
<div id="area" popover>Interest target</div>
```

If the interest target is a `popover` (like it is in the examples above), then the `interestfor` attribute replaces the `popovertarget` attribute that’s normally required for declarative popovers. So, instead of this:

```html{2}
<!-- Button -->
<button popovertarget="button">Interest trigger</button>
<div id="button" popover>Interest target</div> 
```

…we’re looking at this:

```html{2}
<!-- Button -->
<button interestfor="button">Interest trigger</button>
<div id="button" popover>Interest target</div> 
```

---

## The interest target

The interest target is what’s revealed when the user hovers (or long-presses) the interest trigger. Again, this should be a `popover`, and it’s important to use the right type of popover because [**they have different functional and accessibility behaviors**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md).

`popover` attributes that are valueless, empty, or use the `auto` keyword can be dismissed lightly, i.e., using the `esc` key, or by clicking outside of the popover. When opened, these popovers close all `hint` and other `auto` popovers (at least, the ones that aren’t nested).

```html
<div id="target-id" popover>Interest target</div>

<!-- Equivalent to -->
<div id="target-id" popover="">Interest target</div>

<!-- Equivalent to -->
<div id="target-id" popover="auto">Interest target</div>
```

`hint` popovers (the newest type of popovers) can also be dismissed lightly, but only close other `hint` popovers when opened:

```html
<div id="target-id" popover="hint">Interest target</div>
```

`manual` popovers do their own thing. They can’t be dismissed lightly, don’t tell other popovers what to do, and we can have more than one of them open at a time. They’re *suuuper* chill.

```html
<div id="target-id" popover="manual">Interest target</div>
```

However, Open UI’s explainer and Chrome’s current implementation suggest that interest targets disappear on `mouseleave` regardless of the type of popover we’re working with. But redefining popover behavior in this context (or any context) feels wrong to me. If the interest target’s `popover` attribute is set to `manual`, for example, shouldn’t it persist after `mouseleave`?

[<VPIcon icon="fas fa-globe"/>Open UI discusses browsers baking the accessibility in](https://open-ui.org/components/interest-invokers.explainer/#accessibility) depending on the popover type, which justifies interest invokers building off of popovers, but I think accessibility should depend on the content (unless overwritten using ARIA attributes) rather than the popover type.

In short, it seems like interest invokers are designed to be used with popovers but for all the wrong reasons (in my opinion anyway). That said, it’s early days still. Interest invokers are very experimental and it’s certainly possible that I’m overlooking something.

They’re otherwise straightforward, which is on-brand for Open UI (look at the [<VPIcon icon="fas fa-globe"/>Customizable Select](https://open-ui.org/components/customizableselect/), after all). They take commonly-used JavaScript-powered components (such as [<VPIcon icon="fas fa-globe"/>exclusive accordions](https://open-ui.org/components/accordion.explainer/), [<VPIcon icon="fas fa-globe"/>invoker commands](https://open-ui.org/components/invokers.explainer/), and yes, [<VPIcon icon="fas fa-globe"/>popovers](https://open-ui.org/components/popover.research.explainer/)) and make them possible with declarative HTML.

That said, there are some JavaScript events that we can use, too. Let’s take a look at those.

---

## Interest invoker JavaScript events

While I imagine that you’d only need to listen for the `interest` and `loseinterestevents` for certain edge cases, JavaScript events for these new declarative HTML features are fairly standard, and they’re there should you need them:

```js
interestTrigger.addEventListener("interest", () => {
  /* User showed interest */
});

interestTrigger.addEventListener("loseinterest", () => {
  /* User lost interest */
});
```

But what does “interest” mean, exactly? That’s worth digging into next.

---

## Interest delay (and the CSS of it all)

You’ve probably noticed that when you show or lose interest, there’s a short delay in the popover showing or hiding itself. This is extremely annoying at first, but when you actually start to build with interest invokers, you realize how necessary it is.

Here’s the demo again, so you can try it out (in Chrome 139 or Canary for now):

<CodePen
  user="mrdanielschwarz"
  slug-hash="myebBPB"
  title="Interest invokers demo (basic)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

One problem is that if you accidentally `mouseleave` the interest trigger and the target (which can be very easy to do when the target is too small), then it all disappears. This is even *more* annoying, but luckily the hide delay allows you some recovery time. Similarly, the show delay offers keyboard and screen reader users the opportunity to skip the interest target, while also preventing it from being triggered accidentally with a mouse pointer.

Having said that, if the interest target is unobtrusive, then removing the show delay shouldn’t cause any harm. You could also remove the hide delay for keyboard and screen reader users, who aren’t likely to “lose interest” accidentally. We can do this by setting two new CSS properties, `interest-show-delay` and `interest-hide-delay`, to `0`. The default is `0.5s` and is set on the interest trigger (but not the interest target):

```css
/* If unobtrusive */
.unobtrusive[interestfor] {
  interest-show-delay: 0;
}

/* If keyboard-focused on a trigger */
[interestfor]:focus-visible {
  interest-hide-delay: 0;
}

/*
  If keyboard-focused within a target of interest,
  or target of partial interest (these are always keyboard-triggered),
  the interest trigger that currently has interest
  or partial interest has the hide delay removed
*/
body:has(:target-of-interest :focus-visible, :target-of-partial-interest) [interestfor]:where(:has-interest, :has-partial-interest) {
  interest-hide-delay: 0;
}
```

::: note

Interest delays are currently buggy, especially with unitless values. Sometimes they work, sometimes they don’t.

:::

About those pseudo-selectors, though…

Basically, when navigating to an interest trigger using a keyboard or screen reader whose target contains more focusable elements, this is referred to as showing “partial” interest. (I would’ve gone with “potential interest” personally, but I digress.) When this happens, the interest target’s focusable elements actually aren’t focusable (making it easy to skip them, if needed) unless the user hits the option+up/alt+up keyboard shortcut or equivalent screen reader hotkey.

There’s even a message that we can customize by targeting `:target-of-partial-interest::after`:

```css
:target-of-partial-interest::after { 
  content: "Press ⌥↑ to activate.";
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="MYwMYmd"
  title="Interest invokers demo (better delays)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

While you probably shouldn’t change the message content (since it displays the correct keyboard shortcut for the user’s device by default), we can style it by selecting this way.

The user agent also throws *this* in:

```css
:target-of-partial-interest {
  interactivity: not-keyboard-focusable;
}
```

The `not-keyboard-focusable` value is new, and prevents the keyboard focus (like `tabindex="-1"` but for CSS, which is super interesting in its own right).

A full breakdown because, frankly, that was *a lot*:

- `:has-interest`: Triggers with “mouse interest”
- `:has-partial-interest`: Triggers with “keyboard interest”
- `:target-of-interest`: Targets with mouse interest
- `:target-of-partial-interest`: Targets with keyboard interest
- `:target-of-partial-interest::after`: The message displayed when targets have keyboard interest
- `interest-show-delay`: The `<time>` before which the interest target appears
- `interest-hide-delay`: The `<time>` before which the interest target disappears
- `interest-delay`: Shorthand for `interest-show-delay` and `interest-hide-delay`

---

## It works with anchors, too

Nothing really new here as far as what we’ve already discussed, but I find it cool that we can use [**anchor elements**](/css-tricks.com/css-anchor-positioning-guide.md) declaratively just like interest invokers:

<CodePen
  user="mrdanielschwarz"
  slug-hash="VYvZBpG"
  title="Interest invokers demo (tooltip)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Conclusion

On the surface, interest invokers are simply hover-triggered popovers, but touchscreen devices have never handled hovering well. In addition, hovering is susceptible to human-error, and we certainly don’t want to force keyboards and screen readers to tab into a minefield of focusables. There’s a lot to consider, and Open UI have done a wonderful job of ensuring that user agents do the lion’s share of it.

But there’s still more to consider. For example, [<VPIcon icon="fas fa-globe"/>how exactly would we open interest targets on touchscreen devices?](https://open-ui.org/components/interest-invokers.explainer/#touchscreen) Long-press + “View more info” from the context menu seems to be the best approach at the moment, but that’s a tough one!

And, as we’ve discussed, there’s a lot for us to consider, too, such as those delay timings and how interest invokers should be styled. What should interest triggers and targets look like when they have interest? What about the hotkey instruction? We’re talking about some new concepts here, that might require new UX conventions.

Honorable mention: We’re also getting `interactivity: not-keyboard-focusable` out of this, which could help us to build keyboard-friendlier components with CSS.

There’s a lot to love here, and I just know that people are going to create incredible tooltips and hover cards and more with this.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A First Look at the Interest Invoker API (for Hover-Triggered Popovers)",
  "desc": "Chrome 139 is experimenting with Open UI’s proposed Interest Invoker API, which would be used to create tooltips, hover menus, hover cards, quick actions, and other types of UIs for showing more information with hover interactions.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
