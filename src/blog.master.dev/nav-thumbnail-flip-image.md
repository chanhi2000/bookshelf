---
lang: en-US
title: "Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll"
description: "Article(s) > Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll"
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
      content: "Article(s) > Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll"
    - property: og:description
      content: "Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/nav-thumbnail-flip-image.html
prev: /programming/css/articles/README.md
date: 2026-02-26
isOriginal: false
author:
  - name: Ana Tudor
    url: https://blog.master.dev/author/anatudor/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8684
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
  name="Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll"
  desc="A list of items with thumbnails that flip into place as needed. Can we ditch the JavaScript?"
  url="https://blog.master.dev/nav-thumbnail-flip-image/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8684"/>

[<VPIcon icon="fa-brands fa-codepen"/>A recent CodePen Spark](https://codepen.io/spark/497) led me to discover [this cool-looking demo (<VPIcon icon="fa-brands fa-codepen" />`vii120`)](https://codepen.io/vii120/pen/KwMJeXP). It’s an interesting effect, but it uses too much JavaScript for my taste, so I thought I could give it a CSS treatment. Plus, I felt the flip would look better if it were “hinged” to the top/bottom edge, depending on the direction in which we’re going.

About half an hour later, I had this:

![recording of my result](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/550874633-b1332c1f-234c-47db-9bdb-f060d7ad3628.gif?resize=800%2C760&ssl=1)

Let’s see how I did it… and what went wrong.

---

## The Layout Basics

We have a `<nav>` element with `n` children. Since we’ll be needing this number `n` to make styling choices, we pass it to the CSS as a custom property. The same goes for the index `i` of each `nav` item. To make it easier for myself, I used Pug to generate the HTML from a data object – the result looks as follows:

```html
<nav style="--n: 7">
  <a href="#" style="--i: 0">
    tiger
    <img src="tiger.jpg" alt="tiger drinking water" />
  </a>
  <a href="#" style="--i: 1">
    lion
    <img src="lion.jpg" alt="lion couple on a rock" />
  </a>
  <!-- the other cats -->
</nav>
```

It’s a pretty simple structure, just a `nav` wrapper around `a` items, each of these items containing text and an `img` child.

The `sibling-index()` and `sibling-count()` CSS functions are [<VPIcon icon="fa-brands fa-firefox"/>not yet a thing cross-browser](https://bugzilla.mozilla.org/show_bug.cgi?id=1953973), so we’re adding the item index and count as custom properties when we generate the HTML in order to pass them to the CSS. Because otherwise, the CSS does not know how many children an HTML element has.

Moving on to the CSS, our nav is using fixed positioning and made to cover all available viewport space (note that this excludes any scrollbars we might have).

```css
nav {
  position: fixed;
  inset: 0;
}
```

The next step is to use a `grid` layout for it, [**limit the width of the grid’s one column**](/blog.master.dev/blog/super-simple-full-bleed-breakout-styles.md), and middle-align this grid within the element:

```css{2-4}
nav {
  display: grid;
  grid-template-columns: min(100% - 1em, 25em);
  place-content: center;
  position: fixed;
  inset: 0;
}
```

Note that we use `100% - 1em` inside the `min()` to keep a little bit of space on the lateral sides of the grid to prevent it from kissing the viewport edges without adding a separate `padding` rule. Because why waste precious screen space on a non-essential declaration when we could find more important CSS to cram in there?

![doesn’t look like much yet](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551003446-e3d4a37f-db71-4df8-b40e-6edf4e143778.png?resize=800%2C800&ssl=1)

We’re done with the important styles on the `nav`, so we move on to prettifying touches. We slap on a subtle background and give it a viewport-relative `font`, kept within reasonable limits by a `clamp()` – we don’t want the text to get so small it’s unreadable, nor do we want it to balloon on huge screens.

![well, that makes a bit of a difference](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551003613-ff332bde-b9f6-4d26-a66a-99977a8508f9.png?resize=800%2C800&ssl=1)

With the `nav` styles settled, we turn our attention to the links, for which we use a `flex` layout. This allows us to middle-align the text content and the `img` vertically and push them to opposite ends horizontally:

```css
nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

![starting to look like something](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551003796-e7eeb327-595d-4081-b906-34ad9d44584e.png?resize=800%2C800&ssl=1)

Each link receives a thin `border-bottom` to create the separator line and a lateral padding. These are set as custom properties, which may not make much sense right now, but I promise it’s for a good reason.

```css{2-3,8-9}
nav a {
  --pad: min(2em, 4vw);
  --l: 1px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid var(--l) #000;
  padding: 0 var(--pad);
}
```

We give each link a `color` and strip the default underline with `text‑decoration: none`. These are purely cosmetic, and we’ll revisit them later in the article.

![getting a little bit less rough](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551004002-1e83aaf9-fa1f-482d-b182-3c08e20452a5.png?resize=800%2C800&ssl=1)

Next, we prepare the `img` elements for future magic by sizing them and ensuring they act like well-behaved cats – no stretching! The responsive image height and the aspect ratio are also set as custom properties next to the link padding and separator line width – the purpose of doing so will become clear shortly.

```css{4-5,14-18}
nav a {
  --pad: min(2em, 4vw);
  --l: 1px;
  --r: 3/2;
  --h: round(down, min(4em, 30vw, 100dvh/(var(--n) + 1)), 2px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid var(--l) #000;
  padding: 0 var(--pad);
}

nav img {
  height: var(--h);
  aspect-ratio: var(--r);
  object-fit: cover;
}
```

![all finally looking consistent](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/550962275-908aa24f-35a8-4da4-9b08-7a781f5950d7.png?resize=800%2C800&ssl=1)

Since the images will flip in 3D, they also get `backface-visibility: hidden`, so we only see them when they’re facing us and they’re invisible when facing the back of the screen.

```css{5}
nav img {
  height: var(--h);
  aspect-ratio: var(--r);
  object-fit: cover;
  backface-visibility: hidden;
}
```

This is handy when we want to make sure they’re is facing the right way. We may comment this out for a little while a bit later just to take a peek and check they’re in the right position even when facing the other way.

<CodePen
  user="anon"
  slug-hash="PqvemZ"
  title="what `backface-visibility` does"
  :default-tab="['css','result']"
  :theme="dark"/>

In order for the thumbnails to really look like they’re rotating in 3D, we add a `perspective` and a `perspective‑origin` to each `img` parent. The horizontal position of the origin needs to be a padding `--pad` plus half an `img` width (computed from the height `--h` and aspect ratio `--r`) to the left of the right edge (which is at 100%).

```css{12-13}
nav a {
  --pad: min(2em, 4vw);
  --l: 1px;
  --r: 3/2;
  --h: round(down, min(30vw, 100dvh/(var(--n) + 1)), 2px);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid var(--l) #000;
  padding: 0 var(--pad);
  perspective-origin: calc(100% - var(--pad) - 0.5 * var(--h) * var(--r));
  perspective: 20em;
}
```

This is why we needed custom properties for those values, to ensure things stay consistent without having to make changes in multiple places when we want to tweak the lateral padding for the items or use different image dimensions.

So far, this is what we have:

![the current visual result with no grid or flex overlays](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/550961846-c7534391-5005-4ebd-b78c-c8941af1821e.png?resize=800%2C800&ssl=1)

Now let’s make it work!

---

## The Scroll Basics

Unfortunately, [<VPIcon icon="iconfont icon-w3c"/>`scroll-snap-points`](https://w3.org/TR/2015/WD-css-snappoints-1-20150326/#scroll-snap-points) got [<VPIcon icon="iconfont icon-w3c"/>deprecated](https://lists.w3.org/Archives/Public/www-style/2015Nov/0266.html), so now we need to resort to adding this abomination of a phantom branch to the DOM tree:

```html
<div class='snaps' aria-hidden='true'>
  <div class='snap'></div>
  <div class='snap'></div>
  <!-- as may of these as nav items -->
</div>
```

We need the `nav` content to remain permanently in view, so it cannot scroll. But, since just making the `html` tall doesn’t suffice for scroll snapping now anymore, we need to create these scrolling elements to snap to.

```css
* { margin: 0 }

html {
  scroll-snap-type: y mandatory;
  overscroll-behavior: none
}

.snap {
  scroll-snap-align: center;
  scroll-snap-stop: always;
  height: 100dvh
}
```

![how the `.snap` elements are used here](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551198558-6319c7a8-ab9a-4ffb-ac6f-297aae9487a2.gif?resize=800%2C800&ssl=1)

We’ve also added `overscroll-behavior` to kill the rubber‑band overscroll bounce and `scroll-snap-stop` to stop the scroll from skipping over snap points when going quickly up or down. Though, unless I’m misunderstanding what they’re supposed to do, neither of them actually works.

---

## The Scroll Animation

We introduce a new custom property `--k` to track the scroll progress. First, we register it via `@property` so the browser treats it as an animatable numeric value. Otherwise, it would just abruptly flip in between the animation end state values.

```css
@property --k {
  syntax: '<number>';
  initial-value: 0;
  inherits: true
}
```

Then we drive `--k` to `1` from its `initial-value` of `0` via a keyframe `animation` that we tie to the scroll timeline:

```css
nav {
  /* same as before */
  animation: k 1s linear both;
  animation-timeline: scroll();
}

@keyframes k { to { --k: 1 } }
```

We use this `--k` value to compute the current `nav` item index, which we call `--j` and which needs to be registered as an integer:

```css
@property --j {
  syntax: '<integer>';
  initial-value: 0;
  inherits: true
}

nav {
  /* same as before */
  --j: round(var(--k)*(var(--n) - 1));
}
```

![scrolling down, the current item index changes](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551106094-9d9df46f-77c1-4e45-b228-28303eea6914.gif?resize=800%2C800&ssl=1)

There are two things to note here.

One, we need to register `--j` in order for the animation to work in Chrome. I don’t really understand why, since it’s not the CSS variable being animated here, and in Safari, the animation works the same whether it’s registered or not. I registered it at first just to follow the computed values in DevTools, and then noticed the demo breaks when I try to remove its `@property` block. Maybe someone who knows better can chime in.

Two, animating `--k` directly in steps from `0` to `n - 1` would have been simpler. However, at this point, Firefox still [<VPIcon icon="fa-brands fa-firefox"/>refuses](https://bugzilla.mozilla.org/show_bug.cgi?id=1899531) to animate a custom property to a value depending on another custom property.

---

## The Interesting Part!

We can now move on to computing the rotation and “hinge” position (set via `transform-origin`) based on each `nav` item’s index `--i` and the index of the current item `--j`.

We start by comparing each item’s own index (`--i`) with the scroll‑derived current index (`--j`). The sign of their difference tells us whether an item is ahead, behind, or exactly on target, and from that we derive a binary selection flag (`--sel`). When `--sel` is `1` the item is the one currently under the spotlight.

```css
nav a {
  /* same as before */
  --sgn: sign(var(--i) - var(--j));
  --sel: calc(1 - abs(var(--sgn)));
}
```

Think of this selection flag as a CSS boolean, which is something [**I’ve written about before**](/css-tricks.com/logical-operations-with-css-variables.md), in a lot of detail even.

![the sign and selection flag computations in all cases](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551111930-096d773f-772e-4c9c-932c-e4276c11ceb7.gif?resize=800%2C800&ssl=1)

::: info We have three possible cases here.

- `--i` is bigger than `--j` (the item of index `--i` is ahead of the current one), so the sign of their difference is `1` and the selection flag is `0` (the item of index `--i` is not selected)
- `--i` is equal to `--j` (the item of index `--i` is the current one), so the sign of their difference is `0` and the selection flag is `1`
- `--i` is smaller than `--j` (the item of index `--i` is behind the current one), so the sign of their difference is `-1` and the selection flag is `0` (the item of index `--i` is not selected)

:::

Now we need to use these values to compute the rotation around the *x-*axis and the vertical position of the horizontal axis for our navigation items in all three scenarios.

In case you need a CSS 3D refresher, a rotation around the *x-*axis works as illustrated by the following live demo:

<CodePen
  link="https://codepen.io/thebabydino/pen/azZeBKx/6835dbdaf8a4f23501cd19934d483e80"
  title="how rotation around x axis works"
  :default-tab="['css','result']"
  :theme="dark"/>

The *x-*axis we rotate around points towards the cat. From the point of view of the cat, a positive rotation is one she sees going clockwise.

Knowing all of this, we can use it as follows in our three cases:

- `i > j` (ahead of the current item, when the sign is `+1`) – the image rotates by `+180°`, clockwise around a hinge that sits half a separator line thickness above the top edge of the image, a vertical position that can be expressed as `-.5*l` or, equivalently, `50% - +1·(50% + .5·l)`
- `i = j` (the current item, when the sign is `0`) – the image doesn’t rotate, so we can consider that to be a `0°` rotation, or, equivalently, `0·180°`; since there is no rotation, the hinge is irrelevant, so we can take its vertical position as being whatever, for example, just the default `50%` or, equivalently, `50% - 0·(50% + .5·l)`
- `i < j` (behind the current item, when the sign is `-1`) – the image rotates by `-180°`, anti-clockwise around a hinge that sits half a separator line thickness below the bottom edge of the image, a vertical position that can be expressed as `100% + .5*l` or, equivalently, `50% - -1·(50% + .5·l)`

![rotation-related computations](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551164553-47498afe-ef19-4e96-a67d-d442e843ffae.gif?resize=800%2C800&ssl=1)

The above is a lot, but it shows the position not just for the image of the current item, but for those of the items right before and right after, rotated and with the rotation axis highlighted. They are also translated horizontally so they don’t overlap – this is just to show them side by side, we don’t have this translation in the actual demo.

Now you may be wondering why the odd equivalent forms. They are used to show how all those values satisfy the same formula depending on the sign of the difference.

The rotation is:

- `+1·180°` when the sign is `+1`
- `0·180°` when the sign is `0`
- `-1·180°` when the sign is `-1`

Do you see a pattern? The rotation is the sign multiplied by `180°`.

Similarly, the *y* axis position of the hinge is:

- `50% - +1·(50% + .5·l)` when the sign is `+1`
- `50% - 0·(50% + .5·l)` when the sign is `0`
- `50% - -1·(50% + .5·l)` when the sign is `-1`

Again, it’s all almost the same, except for the sign.

Putting it all into CSS, we have:

```css{9-10}
nav a {
  /* same as before */
  --sgn: sign(var(--i) - var(--j));
  --sel: calc(1 - abs(var(--sgn)));
}

nav img {
  /* same as before */
  transform-origin: 0 calc(50% - var(--sgn) * (50% + 0.5 * var(--l)));
  rotate: x calc(var(--sgn) * 180deg);
}
```

The final piece here is transitioning the rotation so our images don’t just appear in place when the containing item is selected. Since we also want to have a `color` and `text-indent` transition on the item text as well, we set the duration as a custom property at item level:

```css{5,12}
nav a {
  /* same as before */
  --sgn: sign(var(--i) - var(--j));
  --sel: calc(1 - abs(var(--sgn)));
  --t: 0.5s;
}

nav img {
  /* same as before */
  transform-origin: 0 calc(50% - var(--sgn) * (50% + 0.5 * var(--l)));
  rotate: x calc(var(--sgn) * 180deg);
  transition: var(--t) rotate;
}
```

Almost there, but not quite:

![slowed down animation to make what’s happening more clear](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551176165-94fef295-bd91-486e-ab25-75b400ebe72f.gif?resize=800%2C800&ssl=1)

Things start out well with the image of the newly unselected item rotating out around its exit hinge. However, the image of the newly selected item doesn’t rotate in as it should, around its enter hinge. Instead, it just rotates in around its middle axis.

The problem is that once an item becomes selected, the second value of the `transform-origin`, which gives us the *y* position of the horizontal axis of rotation, abruptly moves from half a line thickness above/ below the top/ bottom edge to the middle of the element. We only want this to happen *after* the rotation, so we want to add a delay equal to the `transition-duration` of the rotation.

At the same time, we want to keep the current state of things once an item becomes deselected. Once it becomes deselected, we want its `transform-origin` to abruptly move half a line thickness above/ below the top/ bottom edge, depending of the direction we go in.

So we want a delay in the abrupt change (`0s` duration) of `transform-origin` only when an item becomes selected (`--sel` has flipped to `1`), but not when it becomes deselected (`--sel` has flipped to `0`). This means we need to multiply the delay with the selection flag.

The final `transition` declaration therefore looks like this:

```css
transition: 
  0s transform-origin calc(var(--sel)*var(--t)), 
  var(--t) rotate
```

![orrect hinging all the way](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/551199082-b3e4ba83-071b-4e8b-970b-04e0f89befc2.gif?resize=800%2C800&ssl=1)

---

## Refining Touches

Besides the thumb flip, we also want the text to stand out a bit more when its containing item becomes the current one, so we bump up its contrast and slide it in.

The same `--sel` flag that tells us whether an item is selected drives both the `color` and the `text‑indent` change. The `color` goes from a mid grey in the normal case to an almost black in the selected case, while the `text-indent` goes from `0` to `1em`. Both properties get a simple `transition` so the shift feels smooth.

```css{7-10}
/* relevant CSS for the visual motion part only */ 
nav a {
  --sgn: sign(var(--i) - var(--j));
  --sel: calc(1 - abs(var(--sgn)));
  --t: 0.5s;

  color: hsl(0 0% calc(50% - var(--sel) * 43%));
  text-indent: calc(var(--sel) * 1em);
  transition: var(--t);
  transition-property: color, text-indent;
}

nav img {
  transform-origin: 0 calc(50% - var(--sgn) * (50% + 0.5 * var(--l)));
  rotate: x calc(var(--sgn) * 180deg);
  transition: var(--t) rotate;
}
```

Our demo now behaves like the original version, except it’s driven by scroll and the rotations are “hinged” around the separator lines. This is the version seen in the recording at the start of the article.

---

## Issues

The final result, while looking good in Chrome, is glitchy in Epiphany, though this doesn’t seem to be as much of a problem in actual Safari, according to the responses I got when I asked on [Mastodon (<VPIcon icon="fa-brands fa-mastadon"/>`anatudor`)](https://mastodon.social/@anatudor/116085163828052104) and [Bluesky (<VPIcon icon="fa-brands fa-bluesky"/>`anatudor.bsky.social`)](https://bsky.app/profile/anatudor.bsky.social/post/3mf27lgt5as22). It also completely lacks any animation in Firefox. It turns out the root cause of the Firefox problem is [<VPIcon icon="fa-brands fa-firefox"/>this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1927325) some rando filed a couple of years ago. That rando was seemingly me, though I have no recollection of it anymore.

Another issue is that, since both the `nav` and the snaps are using the dynamic viewport, there’s a lot of jumping around on mobile/ tablet. So it’s probably better to use the small viewport for the `nav` and the large one for the snaps.

```css
.snap {
  /* same as before */
  height: 100lvh
}

nav {
  /* same as before */
  height: 100svh
}
```

However, using the small viewport for the `nav` means it may not cover the entire viewport in all scenarios, so we could get a white band at the bottom – the default page background contrasting with the subtle one on the `nav`. To fix this, we need to move the `background` from the `nav` to the `html` or the `body`.

Since our nav items are links, they should have usable `:hover` and `:focus` styles.

```css
nav a {
  /* same as before */
  --hov: 0;
  color: 
    hsl(345 
      calc(var(--hov)*100%) 
      calc(50% - var(--sel)*(1 - var(--hov))*53%));

  &:is(:hover, :focus) { --hov: 1 }

  &:focus-visible {
    outline: dotted 4px;
    outline-offset: 2px
  }
}
```

And it’s probably best not to greet night owls with such a bright `background`, so we should respect user-set dark mode preferences, which means [**rethinking**](/web.dev/light-dark.md) how we set the `color`.

```css
html {
  /* same as before */
  color-scheme: light dark;
  background: light-dark(#dedede, #212121)
}

a {
  /* same as before */
  border-bottom: solid var(--l) light-dark(#121212, #ededed);
  color: 
    light-dark(
      color-mix(in srgb, 
        #9b2226 var(--prc-hov), 
        color-mix(in srgb, #023047 var(--prc-sel), #454545)), 
      color-mix(in srgb, 
        #ffb703 var(--prc-hov), 
        color-mix(in srgb, #8ecae6 var(--prc-sel), #ababab))
    );
}
```

Here’s that demo (and remember this is scroll-based not hover-based):

<CodePen
  user="anon"
  slug-hash="JoKqRjZ"
  title="Pure CSS nav thumb flip on scroll"
  :default-tab="['css','result']"
  :theme="dark"/>

And maybe we shouldn’t have removed the underlines, though this is a navigation component, so it should be expected that what we have in there are links? Personally, I’m on the fence about this. The main reason why I decided against putting them back was the fact that I am not a designer and I was going down a deep rabbit hole unrelated to the main topic of the article just by repeatedly trying and failing to come up with a creative way of doing something aesthetically pleasing with them.

Finally, it’s often said scroll-jacking is a bad idea, don’t do it. I personally like scroll effects if they’re well done and not excessive, but I can understand others may have different preferences.

Since this is supposed to be a navigation, but the demo has no content to navigate to, maybe we should add content and make the effect happen on navigating to the corresponding section.

However, this comes with extra challenges when sections have different heights, as well as when skipping sections via the navigation. Neither of which I’m capable of solving.

Below is the best I could get. It uses JavaScript, and the animation looks bad when skipping items. It’s also not responsive, and I don’t really know what to do about it on small or very large viewports.

<CodePen
  user="anon"
  slug-hash="zxBVyLR"
  title="nav thumb flip on scroll"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Lessons Learned

The most important one is probably that things don’t turn out as you expect them to.

I needlessly complicated this demo early on (setting custom properties instead of `sibling-index()` and `sibling-count()`, not animating the current item index `--j` directly) for the sake of wider support/avoiding bugs. And in the end, I didn’t even need to do that because it doesn’t work cross-browser anyway.

I also aimed for a pure CSS solution with a nice hinging animation, but when I tried to make it usable, I couldn’t do it without JavaScript, and I couldn’t keep the animation looking nice.

The other very important one is that anything can turn into a deep rabbit hole when you’re incompetent like me. After completing the demo quite quickly, I was still unhappy with it, so I ended up spending a ridiculous amount of time on various improvement attempts, none of which worked out, so, in the end, I took them all out.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Lessons Learned from Failed Demos: Pure CSS Nav Thumb Flip on Scroll",
  "desc": "A list of items with thumbnails that flip into place as needed. Can we ditch the JavaScript?",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/nav-thumbnail-flip-image.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
