---
lang: en-US
title: "Animating the Dialog Element"
description: "Article(s) > Animating the Dialog Element"
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
      content: "Article(s) > Animating the Dialog Element"
    - property: og:description
      content: "Animating the Dialog Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/animating-dialog.html
prev: /programming/css/articles/README.md
date: 2024-05-23
isOriginal: false
author: Matthew Morete
cover: https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/05/animate-modal-thumb.jpg?w=1000&ssl=1
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Animating the Dialog Element"
  desc="It might seem like you could just set a transition on the opacity of the dialog element in CSS from 0 to 1, but it doesn't work. You'll need to learn about @starting-style, and the overlay and allow-discrete keywords."
  url="https://frontendmasters.com/blog/animating-dialog"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2341"/>

When the `<dialog>` element became widely available in 2022, I was thrilled. Opening a dialog? Easy. Closing a dialog? Even easier. Nested dialogs and keyboard interactions? Built-in, for free. It’s like living in the future.

But what about animating? That’s a little trickier. At first glance it doesn’t appear to be animatable in CSS—transitions and animations don’t seem to work. JavaScript can do it, but that requires managing the state of your dialogs manually, losing some of the simplicity of using `<dialog>` in the first place.

Fortunately, thanks to modern CSS, we can do it without resorting to JavaScript.

CodePen Embed Fallback

Here we’ll take a look at opening and closing animations separately, discussing solutions using transitions and animations for each.

To keep my code simple I’ll stick to only animating opacity, though these techniques still apply to more complex examples.

The nice thing about only animating opacity is we don’t have any extra accessibility concerns. If you’re involving some form of motion in your animations, you’ll need to ensure the relevant code is wrapped in a media query like:

```css
@media (prefers-reduced-motion: no-preference) { }
```

---

## Opening Animations**

### Transition with `@starting-style`

You might have tried something like this, only to find it **doesn’t work**:

```css
dialog {
  transition: opacity 1s;
  opacity: 0;
  
  &[open] {
    opacity: 1;
  }
}
```

<CodePen
  user="matthewmorete"
  slug-hash="JjqXLEb"
  title="CSS Dialog Animations (no @starting-style - doesn't work)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The problem here is when a `<dialog>` opens, the browser doesn’t know what opacity value it’s meant to transition from. The first style update our `<dialog open>` receives sets `opacity: 1` , and since that’s also our end value, no transition takes place. We see this problem pop up whenever we attempt to transition any element that changes to or from display: none. How do we fix this?

One way is with `@starting-style`, an at-rule that allows us to specify the values we’d like to transition from when the element is first rendered.

We can nest it directly in our existing `[open]` rule like so:

```css
dialog {
  transition: opacity 1s;
  opacity: 0;
  
  &[open] {
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
}
```

CodePen Embed Fallback

Success! That’s all it takes, our `<dialog>` will now transition opacity while opening.

We can think of `@starting-style` as a third state for our dialog, the ‘pre-open’ state. Often we’d want this to be the same as our ‘closed’ state, and while this might seem like an annoying bit of duplication, it’s useful that we can define it separately as it allows our opening and closing transitions to be different.

The downside here, at least at the time of writing, is browser support. `@starting-style` isn’t in Firefox, and only in recent versions of Chromium and WebKit based browsers. Depending on your requirements that can easily be good enough since:

1. We’re using `@starting-style` as a progressive enhancement. In non-supporting browsers the dialog will simply open with no transition.
2. `@starting-style` is an Interop 2024 target, so we can expect cross-browser support by the end of the year.

So what if we need a cross-browser opening animation right now? Are we out of luck? Fortunately not.

### Animation with `@keyframes`

By using `@keyframes` we can get the same effect with browser support limited only by `<dialog>` itself and remove the need to use `@starting-style`:

```css
dialog[open] {
  animation: open 1s forwards;
}

@keyframes open {
  from { opacity: 0 }
  to   { opacity: 1 }
}
```

CodePen Embed Fallback

That’s all we need! We solve the problem of the browser needing to know what initial value to use by explicitly declaring it within the animation.

`@keyframes` debatably has a few downsides, mostly notably its need for a unique name. That doesn’t sound like a big deal, but naming things can be hard, and name conflicts can be confusing to debug. All else being equal, a technique requiring a unique name is worse than a technique that doesn’t.

Personally however, until `@starting-style` has near universal support, this will remain my preferred technique. In my opinion it’s equally readable, rarely more verbose, and the fact it works everywhere makes me (and my clients) happy.

---

## Closing Animations

Unfortunately when our `<dialog>` closes, we run into a few more problems:

1. It changes to `display: none`.
2. It’s removed from the top layer.

Both of these things happen as soon as the close event is fired, and since they both hide our element, any animations or transitions we attempt won’t be visible. We’ll need to delay these while our animation completes, and we can do it in one line with CSS:

```css
transition:
  display 1s allow-discrete,
  overlay 1s allow-discrete;
```

There’s a few new things in this one declaration, so let’s expand on each of them.

### `transition-behavior: allow-discrete`

Usually when attempting to transition discrete properties we see it doesn’t work, or more accurately, the property’s value updates at 0%, causing an instant change with no transition.

What `transition-behavior: allow-discrete` usually does is allow us to request that this change occur at 50% of the way through the transition, rather than 0%. I say usually, because for transitions that involve display: none, this change will instead occur at either 100% or 0%, based on if we’re animating to or from display: none. This ensures that our element will remain visible for the entire duration of the transition. Problem #1 solved.

Since the value changes at the beginning or end of the transition, it doesn’t matter what value we use for `animation-timing-function` so feel free to omit it from the shorthand.

`transition-behavior` is currently not available in Firefox or Safari, but as it’s also an [<VPIcon icon="fas fa-globe"/>Interop 2024](https://wpt.fyi/interop-2024) target along with `@starting-style`, we can be optimistic that it’ll be widely available by the end of the year.

It’s also not available in a non-American spelling, so make sure you leave out the ‘u’.

### The overlay Property

The overlay property has two possible values: `auto` and `none`, and it specifies if an element in the top layer should be rendered in the top layer. Very simply, an element with `overlay: auto` will render in the top layer and be visible, and an element with `overlay: none` will not.

What complicates this slightly is that the overlay property is fairly unique in that it’s not possible for you to set it yourself. You can’t set it directly on an element, or use it in a `@keyframes` animation. The only one who can change the value of this property is the browser. Using it in a transition in combination with `allow-discrete` is actually our only way of interacting with it at all.

This is also another property that transitions differently than normal discrete properties where it’ll remain `overlay: auto` for the entire transition. Exactly what we need to solve problem #2. The `overlay` keyword is our only method of keeping an element in the top layer, so any CSS only solution to `<dialog>` closing animations will require it. Unfortunately it’s currently only available Chromium at the time of writing, and since it’s not an Interop 2024 target, we might be waiting a little longer for cross-browser support.

### Closing Transition

Lets combine this with our previous example using `@starting-style` by adding to our existing transition declaration:

```css
dialog {
  transition:
    display 1s allow-discrete,
    overlay 1s allow-discrete,
    opacity 1s;
  opacity: 0;
  
  &[open] {
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
}
```

<CodePen
  user="matthewmorete"
  slug-hash="JjqGoPa"
  title="CSS Dialog Animations (Transition with @starting-style)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And with that we have a `<dialog>` with both opening and closing transitions! If you’re looking for the simplest solution then you can stop here, it doesn’t come easier than this.

### Closing Animation with `@keyframes`

If you’re like me and want to take advantage of CSS animations to provide a cross-browser opening animation, we’ll need to do a bit more.

It’s possible to use our transition only code to handle the closing animation while keeping `@keyframes` for our opening animation. But if you’re like me, you might find it a bit easier to understand if both animations are controlled via keyframes.

Since both display and overlay are set by the browser, we still need to transition these values outside of our animations:

```css
dialog {
  transition:
    display 1s allow-discrete,
    overlay 1s allow-discrete;
  &[open] {
    animation: open 1s forwards;
  }
}
```

While I find it a little weird to be using both animation and transition, I like that our animation code is kept separate from our management of the browser’s default behaviour.

We need to ensure our `animation-duration` is at least as large as our `transition-duration` to ensure neither overlay or display change before the end of our animation.

Next up is the closing animation itself.

My first instinct was to reuse the same animation but play it in reverse. Unfortunately we can’t do that since it’s not possible to change `animation-direction` without also starting a new animation with a different name.

Instead, lets define a new set of `@keyframes` for our closing animation and apply it to the default (closed) state:

```css
dialog {
  transition:
    display 1s allow-discrete,
    overlay 1s allow-discrete;
	
  animation: close 1s forwards;
  &[open] {
    animation: open 1s forwards;
  }
}

@keyframes open {
  from { opacity: 0 }
  to   { opacity: 1 }
}

@keyframes close {
  from { opacity: 1 }
  to   { opacity: 0 }
}
```

CodePen Embed Fallback

And that’s all it takes! A `<dialog>` with a cross-browser opening animation and a progressively enhanced closing animation. It’s a little less concise with a bit more duplication than our transition only example, but you can decide if the extra browser support is worth it for you.

---

## [](#conclusion)**Conclusion**

It’s honestly quite amazing how little CSS is required to make this happen. Tools like `<dialog>`, `overlay` and `transition-behavior` have taken what was once an incredibly complicated task and reduced it to just a few lines of CSS.

Dialogs are easier than they’ve ever been, and as long as we don’t get tempted to over use them, that’s cause for celebration to me 🎉

---

## [](#what-about-popover-and-backdrop)**What about `popover` and `::backdrop`?**

I kept my explanation focused on the `<dialog>` element to keep things simple, but everything we’ve just covered also applies `popover` elements and `::backdrop` too! They exist in the top layer and have their `display` toggled by the browser in the same way `<dialog>` does, so can be animated using these same techniques.

Here’s Adam Argyle with a snippet that handles popovers and backdrops also, just note it’s using `@starting-style` so support will be limited for now:

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animating the Dialog Element",
  "desc": "It might seem like you could just set a transition on the opacity of the dialog element in CSS from 0 to 1, but it doesn't work. You'll need to learn about @starting-style, and the overlay and allow-discrete keywords.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/animating-dialog.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
