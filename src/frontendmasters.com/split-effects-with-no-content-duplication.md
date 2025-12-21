---
lang: en-US
title: "Split Effects with no Content Duplication"
description: "Article(s) > Split Effects with no Content Duplication"
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
      content: "Article(s) > Split Effects with no Content Duplication"
    - property: og:description
      content: "Split Effects with no Content Duplication"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/split-effects-with-no-content-duplication.html
prev: /programming/css/articles/README.md
date: 2024-09-11
isOriginal: false
author: Ana Tudor
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3782
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
  name="Split Effects with no Content Duplication"
  desc="The `clip-path` property with the `inset()` shape makes for some cool design opportunities. Here we'll expand on some existing ideas, improving them by not requiring any content duplication."
  url="https://frontendmasters.com/blog/split-effects-with-no-content-duplication/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3782"/>

A[recent post](/frontendmasters.com/clip-pathing-color-changes.md)here lead me to another called[<VPIcon icon="fas fa-globe"/>The Magic of Clip Path](https://emilkowal.ski/ui/the-magic-of-clip-path)by Emil Kowalski, which focuses on the`inset()`basic shape in particular. While I agree that`clip-path`is a very useful property and the`inset()`basic shape is underrated and underused on the web, most of the use case examples in the article are far from ideal as they rely on content duplication, which can come at a maintenance, performance, and accessibility cost, not to mention that some of them break in some scenarios.

In this article, I’ll be showing how to get the same effects with no content duplication.

---

## Comparison Sliders

Emil creates this with two different images (the before and the after) stacked one on top of the other, the top one being clipped, plus a`button`for the draggable line control.

Using a`button`for the draggable line somehow doesn’t feel right to me, but I’m no expert when it comes to accessibility, so we’ll be focusing on how to do this with a single image, though this is the one example where I can see some advantages to using two images instead of one.

This kind of comparison slider is something I once explained in detail in[<VPIcon icon="fas fa-globe"/>another article](https://css-tricks.com/taming-blend-modes-difference-and-exclusion/#aa-invert-just-an-area-of-an-element-or-a-background)some years back. The basic idea used there is the following: the original image (the “before”) is a`background`layer of a slider whose thumb is the draggable split line. The original image`background`layer is blended with another which only covers the progress area between the lateral edge of the track and the current thumb position. The result of the blending operation is the “after”.

In my old article, the result of the blending operation was the negative of the image:

<CodePen
  user="thebabydino"
  slug-hash="qBqqoXa"
  title="1 element image vs. negative"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s a fancier version of it:

<CodePen
  user="thebabydino"
  slug-hash="OJbmxPq"
  title="Original vs. negative card (hover card, drag slider)"
  :default-tab="['css','result']"
  :theme="dark"/>

But we can also have other effects, for example desaturating an image (black and white photography effect).

<CodePen
  user="thebabydino"
  slug-hash="MWMvxxX"
  title="Comparison slider: grayscale()-like effect"
  :default-tab="['css','result']"
  :theme="dark"/>

This demo needs a single HTML element (`input[type=range]`), less than 20 CSS declarations (and that’s with having to duplicate a bunch of them for the`-webkit-`and`-moz-`cases) and under`100`bytes of JS (without even bothering to minify it).

The trick here is to use a`color`blend mode, which takes the the hue and the saturation of the top layer (transparent before the thumb and*any*grey after) and the luminosity (which is not[the ‘L’ in HSL <VPIcon icon="fa-brands fa-codepen"/>`thebabydino`](https://codepen.io/thebabydino/full/RwoOMOZ), that one stands for lightness, but still close enough in a lot of cases) of the bottom layer (the image).

The saturation of*any*grey is`0`and zero saturation makes the hue irrelevant (if you think about[the HSL bicone (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/NvKEpd), the saturation is the horizontal distance from the vertical axis, so the greys are on the vertical axis, where the rotation around it, which gives us the hue,[doesn’t matter anymore (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/ZELeqVN)).

That is, the`color`blend mode with any grey top layer zeroes the saturation of the result, giving us a fully desaturated image (as if we applied`filter: grayscale(1)`on it).

We can also make a fully desaturated image monochrome. This only requires a couple of tiny changes from the previous demo: replacing the grey with a dark blue (or anything with non-zero saturation, really) and using a black and white image.

<CodePen
  user="thebabydino"
  slug-hash="ExBvJjz"
  title="Comparison slider: monochrome me"
  :default-tab="['css','result']"
  :theme="dark"/>

Or why just monochrome it when we can duotone it?

<CodePen
  user="thebabydino"
  slug-hash="jOjLRyp"
  title="Comparison slider: duotone me"
  :default-tab="['css','result']"
  :theme="dark"/>

Here, we just switched to an`exclusion`blend mode. How this works in the back is something I explained in a lot of detail in [<VPIcon icon="fas fa-globe"/>the blend modes article](https://css-tricks.com/taming-blend-modes-difference-and-exclusion/#aa-invert-just-an-area-of-an-element-or-a-background).

This technique also has the advantage of only needing a minimal amount of JS. All the JS does here is to update one custom property`--val`when the slider thumb gets dragged. That’s it!

However, the amount of effects we can achieve by blending is limited and, since I wrote that article, I’ve changed my mind about the image as a`background`approach and I don’t like it as much anymore nowadays. I’d rather have an actual`img`element there, which can get a proper right click menu and a proper`alt`text (even though the sliders in the previous examples have a label for screen readers which explains the changing image effect on dragging the thumb).

So the more flexible and overall better approach I’d go for nowadays involves an `img` element and an `input[type=range]` inside a wrapper kind of structure. On the CSS side, I’d use a `backdrop-filter` (which opens the door to endless possibilities) instead of blending. The JS remains the same, we only need it to update the same custom property as before.

<CodePen
  user="thebabydino"
  slug-hash="XWLawxg"
  title="Comparison slider v2: blur"
  :default-tab="['css','result']"
  :theme="dark"/>

The trick is to make the wrapper a`grid`container with a single grid cell, stack and stretch inside this cell the`img`, then a wrapper pseudo-element and finally the`input[type=range]`on top of both.

Both the pseudo-element and the slider get`pointer-events: none`, so that right click brings up a menu that allows us to open the image in a new tab, save it, copy it and so on. Note that this needs to get reverted on the slider’s`thumb`(by setting`pointer-events: auto`) so we can drag it. The pseudo-element gets clipped to just the area between the slider’s edge and the thumb’s vertical midline. It also has a`backdrop-filter`. This creates the desired effect on the part of the image underneath the area this pseudo-element is clipped to.

The demo above shows a blur effect, but we have unlimited possibilities here, as we can also chain CSS filters or even use SVG ones. We can make our image grainy, introduce[<VPIcon icon="fas fa-globe"/>chromatic aberration](https://mastodon.social/@anatudor/112444748312431903)or[<VPIcon icon="fas fa-globe"/>swap two channels](https://mastodon.social/@anatudor/112242678457752295)… the sky’s the limit!

<CodePen
  user="thebabydino"
  slug-hash="qBzXGzK"
  title="Comparison slider v2: grain"
  :default-tab="['css','result']"
  :theme="dark"/>

One caveat though: as cool as in the browser image`filter`effects are, we only have access to the original image via the right click menu. We cannot save or copy the result we get after applying the`filter`this way. For the situation when we want that, stacking the filtered and clipped version of the image on top of the original is probably the better idea, even if we have to load two images.

---

## Split Text

Emil showcases an example similar to the one [used by Vercel here (<VPIcon icon="fa-brands fa-x-twitter"/>`raunofreiberg`)](https://x.com/raunofreiberg/status/1785738080520925627). This duplicates the text and clips the version on top. It also breaks on small viewports.

<VidStack src="https://videos.files.wordpress.com/XjlqtLd8/288449e91964dcf4_mp4.thumbgrid_0.jpg?h=2880" />

But we can do something like this with no text duplication whatsoever, which also allows us to avoid such problems, regardless of the viewport size.

This can be seen in the demo below where you can drag the separator line:

<CodePen
  user="thebabydino"
  slug-hash="oNOrXQj"
  title="Interactive text split - no text duplication - drag blue line"
  :default-tab="['css','result']"
  :theme="dark"/>

The trick here is to put the text fill, the text stroke and the progress area each on one RGB channel. In my demo, the text fill uses the blue channel, the text stroke uses the red channel and the progress area uses the green channel. Note that the progress area is created using a[full coverage pseudo (<VPIcon icon="fa-brands fa-x-twitter"/>`anatudor`)](https://x.com/anatudor/status/1478412237295566850)on the element containing the text and that this pseudo is blended with its parent.

```css
p {
  position: relative;
  color: #00f;
  -webkit-text-stroke: #f00 4px;
  isolation: isolate;

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(#0f0 var(--prc), #000 0);
    mix-blend-mode: lighten;
    pointer-events: none;
  }
}
```

The`--prc`stop position is the progress value of the slider in`%`. The higher up we pull it, the lower the value and the other way around.

The`isolation`property ensures the pseudo is only blended with its parent, but not with whatever backdrop may be behind its parent as well.`pointer-events: none`on the pseudo ensures we can click and select the text underneath.

The result so far looks like this:

![Intermediate result](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/a0c487c75678b468-1024x419-1.png?resize=1024%2C419&ssl=1)

You can see that here, each of the three RGB channels are either zeroed or maxed out (0 or1). The values for the red channel (text stroke) and the blue channel (text fill) are mutually exclusive, it’s just the green channel (progress area) that can mix with the other two.

We then apply an SVG`filter`. Here, we combine two concepts I’ve talked about this year before: using[<VPIcon icon="fas fa-globe"/>RGB channels as alpha masks](https://mastodon.social/@anatudor/112286525196818095)and painting the graphic we extract using[<VPIcon icon="fas fa-globe"/>an RGB value](https://mastodon.social/@anatudor/112157559510002242)(using one of the two ways I did for[these monojicons (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/YzgwErb)).

Our`filter`extracts the intersection between the blue channel (the text fill) and the green channel (the progress area) - that is, the text fill within the limits of the progress area - and paints it`white`.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/4c8d4dd8abb9103b.png?resize=737%2C313&ssl=1)

The intersection between the text fill and the progress area, painted in white.

This is pretty much like creating an alpha mask that makes opaque the area where both the blue channel and the green channel are maxed out. And at the same time, makes transparent the area where at least one of the two is`0`.

The`filter`also extracts the difference between the red channel (the text stroke) and the green channel (the progress area) - that is, the text stroke outside the progress area, then paints it using a variable (which can be either`currentColor`or a custom property,`var(--c-neon)`, for example).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/89629fa5c262b96d.png?resize=1024%2C437&ssl=1)

The difference between the text stroke and the progress area, painted in neon blue.

Finally, we put these two together and we have the result!

There are some other minor polishing tweaks in the demo, but this is the main idea. It’s very similar to other text split demos with no duplication I’ve made (as seen in[<VPIcon icon="fa-brands fa-codepen"/>this CodePen collection](https://codepen.io/collection/gYNRKP?sort_by=id)), the only difference being that in this case the split line isn’t fixed, but depends on a value that changes when dragging the slider.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/4ac81ff1e5864e8e.png?resize=1024%2C639&ssl=1)

The CodePen collection.

---

## Tabs Transition

This is another effect that Emil achieves by duplicating the whole navigation content.

As you might suspect, we can do without duplication!

<CodePen
  user="thebabydino"
  slug-hash="RwzoqWj"
  title="Simple nav blob - no content duplication"
  :default-tab="['css','result']"
  :theme="dark"/>

What is going on here?

First off, each`nav`item has an index`--i`, whereas the`nav`itself has a current index`--k`, equal to the index`--i`of the currently selected item. The only JS necessary here is to update the value of`--k`on the`nav`to match the value`--i`of the item we’ve just clicked/selected (works withTab + Entertoo).

We want the currently selected item to have a highlight — that is, we want to have a highlight over the item where the difference between`--i`and`--k`is`0`. In order to know from which direction this highlight needs to move when we change the selected item and`--k`changes value, we need to also get the sign of this difference between`--i`and`--k`. Since no matter which item is selected, both`--i`and`--k`*are set*to integer values, we use this formula that I explained in detail in[<VPIcon icon="fas fa-globe"/>n older article](https://css-tricks.com/using-absolute-value-sign-rounding-and-modulo-in-css-today/)to compute the sign:

```css
--sgn: clamp(-1, var(--i) - var(--k), 1)
```

Now, you may be wondering why in the world still use this when we now finally have the`sign()`function supported cross-browser (almost, it’s still behind a flag in Chrome) and the answer is that… well, we’re calling it “sign”, but that’s not exactly what we want. I said above that both`--i`and`--k`*are set*to integer values and, while that is true,`--k`also takes non-integer values when it smoothly transitions from the integer value it previously had to the one it’s currently set to.

The`sign()` function jumps from-1 to0, then to1 and we don’t want that jump.We don’t want this:

![The graph of `sign(x)` has discontinuity at 0.](https://i0.wp.com/files.mastodon.social/media_attachments/files/112/943/516/423/807/249/original/e82954ff98549d7b.png?ssl=1)

`sign(x)` graph

We want this:

![The graph of `clamp(-1, x, 1)` is continuous.](https://i0.wp.com/files.mastodon.social/media_attachments/files/112/943/516/995/110/082/original/04720938adf74ac5.png?ssl=1)

`clamp(-1, x, 1)` graph

Next we want to know if the highlight is outside of an item or over that item, meaning that item is selected. The highlight is outside of an item if`--sgn`is non-zero:

```css
--out: abs(var(--sgn))
```

That is, if`--sgn`is either`-1`or`1`, then`--out`is`1`, the highlight is outside the item, meaning the item is not selected. If`--sgn`is`0`, then`--out`is`1`, the highlight is not outside the item, but instead is over it, the item is selected.

Note that with`sign()`and`abs()`being the final two mathematical functions**still behind the Experimental Web Platform features flag**in Chrome, we need to wrap the above in a `@supports` and also use a fallback:

```css
--out: max(var(--sgn), -1*var(--sgn));
```

There’s still one more thing we need to compute here and that’s whether we need to move the highlight towards the positive direction of thexaxis if we were to select an item of index`--i`that’s currently not selected:

```css
--bit: round(.5*(1 + var(--sgn)))
```

We’d need to move in the positive direction of thexaxis if we were to select an item of an index`--i`bigger than`--k`, that is, if`--sgn`is`1`. In this case,`--bit`computes to`1`. Othwerwise, if we wouldn’t need to move in the positive direction of thexaxis but in the negative one, then that means`--i`is smaller than`--k`, which means`--sgn`is`-1`, so`--bit`computes to`0`.

We create the highlight with a pseudo-element, which is absolutely positioned to[<VPIcon icon="fas fa-globe"/>cover its entire parent](https://mastodon.social/@anatudor/109389255373912182). Okay, but we want this highlight only for the currently selected item, so we clip it to nothing for all the others, that is, for all those where`--out`computes to`1`.

And we know whether to clip it from the right or from the left based on the`--bit`value. If`--bit`is`1`, we clip from the right (the positive direction of thexaxis). Otherwise, we clip from the left. This is the`clip-path`and the lateral offset values:

```css
--r: calc(var(--out)*var(--bit)*100%);
--l: calc(var(--out)*(1 - var(--bit))*100%);
clip-path: inset(0 var(--r) 0 var(--l));
```

The final ingredient is to[<VPIcon icon="fa-brands fa-firefox"/>register](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)(as`'<number>'`) and transition`--k`.

You can see a basic version of this below:

<CodePen
  user="thebabydino"
  slug-hash="poXrXqa"
  title="Almost pure CSS highlight nav: glitchy"
  :default-tab="['css','result']"
  :theme="dark"/>

Now you may see a teeny tiny gap in the highlight during the`transition`.

![Shows a tiny vertical gap during the transition.](https://i0.wp.com/files.mastodon.social/media_attachments/files/112/944/804/212/393/307/original/e1c14c04ead5b5bf.png?ssl=1)

The problem.

This is due to pixel rounding and the way to fix it is to ensure the pseudo-element highlight doesn’t have a width that might get rounded*down*to an integer number of pixels.

```css
inset: 0 -.5px
```

That’s it!

<CodePen
  user="thebabydino"
  slug-hash="WNqZyeY"
  title="Almost pure CSS highlight nav: no glitch"
  :default-tab="['css','result']"
  :theme="dark"/>

Okay, but what about the rounded corners and the text`color`change on intersecting the highlight? For that, we need an SVG`filter`that achieves two things. One,[<VPIcon icon="fas fa-globe"/>the blobby look](https://mastodon.social/@anatudor/112523336154596358)and two, something very similar to the one in the earlier text split example, a different look for the text where it intersects the highlight blob versus where it doesn’t. We also want to have a different look for the`:hover`/`:focus`state outside the blob.

Just like in the text split case, we use a separate RGB channel for each component. The red channel is used for the highlight, the blue channel for the regular text and the green channel for the text in the `:hover`/`:focus` case.

![Shows the nav with different parts on different channels. Normal (not focused/ hovered) text is on the blue channel. Hovered/ focused text is on the blue channel. The highlight is on the red channel. Since the layers are blended using the lighten blend mode, the text intersecting the highlight looks fuchsia/ magenta (has both the red and bluue channels maxed out).](https://i0.wp.com/files.mastodon.social/media_attachments/files/113/090/302/854/648/018/small/fb5760a2b24ae32e.png?ssl=1)

Then in the SVG`filter`, we first extract the highlight out of the red channel, paint it blue and [<VPIcon icon="fas fa-globe"/>turn its shape into a blob](https://mastodon.social/@anatudor/112523336154596358). Then we extract the text out of the blue and green channels and paint it either grey or blue depending on what channel it’s on. We place the blob on top of it and on top of that, we put the intersection between the text and the blob, painted in white.

---

## Theme Switch Transition

Emil shared a version that duplicates the entire page, one version being in light mode and the other in the dark mode, with the top one having a `clip-path` on it.

Back when`:has()`was still a new feature in late 2022, I started toying with a bunch theme switch effects using it and one of them produced a result very similar to this, but without duplicating any content.

<CodePen
  user="thebabydino"
  slug-hash="poKjWgW"
  title="theme swipe switch"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s take a quick look at the idea behind!

It’s not very far from what I’m doing in this bubble theme switch (which I’ve explained in detail in the Pen description), but it allows for more control than simply inverting what’s on the page.

<CodePen
  user="thebabydino"
  slug-hash="mdgjMBv"
  title="Slider-controlled bubble via a CSS variable"
  :default-tab="['css','result']"
  :theme="dark"/>

We have a custom property`--dark`that’s`0`in the light theme case and`1`in the dark theme case.

```css
body {
  --dark: 0;
 
  &:has(#dark:checked) { --dark: 1 }
}
```

We make the page`background`a CSS gradient with`background-attachment: fixed`and depending on the`--dark`custom property via a percentage`--perc`, which we register as`'<length-percentage>'`so it can be transitioned when we switch the theme.

```css
body {
  /* same as before */
  --perc: calc(var(--dark)*100%);
  background: 
    linear-gradient(90deg, #333 var(--perc), #ddd 0) fixed;
  transition: --perc .65s
}
```

We do something similar for the text itself. In this case, we also need to set the`color`property to`transparent`and clip its`background`to`text`. This isn’t super ideal as we can end up having to set such a`background`clipped to`text`to a lot of elements on the page, but oh, well…

```css
p, label {
  background: 
    linear-gradient(90deg, #ddd var(--perc), #333 0) text fixed
}
```

Click on either “dark” or “light” below:

<CodePen
  user="thebabydino"
  slug-hash="wvLrQpM"
  title="Theme swipe: basic setup"
  :default-tab="['css','result']"
  :theme="dark"/>

This is the basic idea behind. There are two big issues with it.

One, the swipe direction changes (it goes from right to left) when we switch back from the dark theme to the light one. We want the swipe transition to always go from left to right. We can fix this by using an angle`--ang`that depends on the value of the`--dark`switch. This isn’t the best solution as it limits us to a linear swipe effect, but we’ll stick to it for now and come back to this problem later.

```css
--sign: sign(var(--dark) - .5);
--ang: calc(var(--sign)*90deg);
```

To this angle `--ang`, we may add another one that gives us the direction of the swipe.

Two, it doesn’t give any indication about whether any of these controls is focused or hovered (for example an outline) and there are no special styles for the currently selected one, but we can fix that using the[<VPIcon icon="fas fa-globe"/>DRY switching technique](https://css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration/)(with`--hov`and`--sel`switches) plus`color-mix()`to further simplify things.

<CodePen
  user="thebabydino"
  slug-hash="zYVEMaa"
  title="Theme swipe: direction + highlights fix"
  :default-tab="['css','result']"
  :theme="dark"/>

The same idea applies to all text and links.

<CodePen
  user="thebabydino"
  slug-hash="XWLeOqj"
  title="Theme swipe: links"
  :default-tab="['css','result']"
  :theme="dark"/>

There are a couple of issues here.

The first is that we have these ugly edges around the link letters due to the fact that the link`background`clipped to`text`is placed on top of the paragraph`background`clipped to the same`text`and the latter contrasts with the page`background`even more.

There are a couple of pretty straightforward fixes here. One by isolating the paragraph and then applying a`hard-light`blend mode on the link and another by using slightly thicker text for the link. For example, with a font like[<VPIcon icon="fa-brands fa-google"/>REM](https://fonts.google.com/specimen/REM), we can give the normal paragraph text a`font-weight`of`300`and the links a`font-weight`of`400`.

The second is that when the`background`gets clipped to`text`, that doesn’t also include the`text-decoration`(underline, for example).

An easy solution for this would normally be to add another`background`of limited vertical size at the`bottom`, but this doesn’t work here due to the`fixed`nature of the`background`.

So we’re forced to use a pseudo and make links`inline-block`or wrap each link’s text content in a`span`. Each of these comes with some complications of its own, but oh, well…

<CodePen
  user="thebabydino"
  slug-hash="bGPoJPj"
  title="Theme swipe: better links"
  :default-tab="['css','result']"
  :theme="dark"/>

In the future, being able to clip the`fixed`background to text*and*to a bottom border should do the trick without the need for the extra pseudo-element hack (see this[<VPIcon icon="fas fa-globe"/>proposal](https://verou.me/specs/#continuous-image-borders)by Lea Verou).

Also, for every element that needs to have both text content and a`background`(like a`button`, for example!)… some bad news! Because of a[<VPIcon icon="fa-brands fa-firefox"/>Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1481498)old enough to go to school, we need to either make that element`inline-block`like we did in the links scenario and use a pseudo or wrap that text content in an inner`span`. Or, in order to avoid the problems that these two methods come with (and maybe introduce some performance ones instead), we could use an SVG`filter`. That’s pretty much what we have to do for a lot of`input`elements (like`input[type=button]`) anyway.

<CodePen
  user="thebabydino"
  slug-hash="YzormZw"
  title="Theme swipe: simple button"
  :default-tab="['css','result']"
  :theme="dark"/>

Okay, but what if we want to have a patterned`background`? Or what if we want a more interesting link hover effect, for example a[XOR one](https://codepen.io/thebabydino/pen/JjGMZyM)? Or other kinds of XOR effects, for example one on a header? Blending (the`difference`blend mode in particular) to the rescue!

<CodePen
  user="thebabydino"
  slug-hash="ZEdXgNN"
  title="Theme swipe: blending for patterns, XOR effects"
  :default-tab="['css','result']"
  :theme="dark"/>

What about having some gradients on the page? For example, in the case of gradient buttons. That can be done using the same trick of putting the text, the gradient of the`button`and the gradient determining the progress of the theme swipe transition each on a different RGB channel. Then we use an SVG`filter`to extract the gradients and text for each of the two themes, paint them as desired and resolve how much of each is shown based on the progress of the theme swipe transition.

<CodePen
  user="thebabydino"
  slug-hash="LYKOXmJ"
  title="Theme swipe: gradient buttons"
  :default-tab="['css','result']"
  :theme="dark"/>

You may remember I said something about being tied to linear swipes here. But we can fix that in order to also have radial or conic ones!

First, we need to have two swipe percentage values: one that changes instantly when selecting another theme and another one that transitions smoothly. We only register the second one (`--perc-ani`).

```css
--dark: 0;
--perc-fix: calc(var(--dark)*100%);
--perc-ani: calc(var(--dark)*100%);
```

We also compute a direction or sign value, whatever you want to call it. This is`1`when we’ve switched from the light theme to the dark one (`--dark`is`1`) and`-1`otherwise (`--dark`got switched to`0`).

```css
--sign: sign(var(--dark) - .5)
```

Then we compute the progress of the swipe. This always smoothly goes from`0%`to`100%`over the course of the swipe that changes the theme, regardless of whether we’re switching from the light to the dark theme (`--sign`is`1`,`--perc-fix`has switched to`100%`and`--perc-ani`transitions from`0%`to`100%`) or from the dark to the light theme (`--sign`is`-1`,`--perc-fix`has switched to`0%`and`--perc-ani`transitions from`100%`to`0%`).

```css
--perc: calc(100% - var(--perc-fix) + var(--sign)*var(--perc-ani));
```

We then use this in the stop list for the gradient (which now can be a radial or a conic one too) transitioned to create the swipe effect:

```css
--list: var(--c1) var(--perc), var(--c0) 0%
```

The`--c0`and`--c1`values depend on whether we’re going from the light theme to the dark one (`--perc-fix`has switched to`100%`) or the other way (`--perc-fix`has switched to`0%`):

```css
--c0: color-mix(in srgb, var(--dark) var(--perc-fix), var(--light));
--c1: color-mix(in srgb, var(--dark), var(--light) var(--perc-fix));
```

And that’s it! This is the technique from my initial demo in this section which allows us to use any kind of gradient for our swipe.

I hope you’ve enjoyed this little ride through the land of fun effects without content duplication!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Split Effects with no Content Duplication",
  "desc": "The `clip-path` property with the `inset()` shape makes for some cool design opportunities. Here we'll expand on some existing ideas, improving them by not requiring any content duplication.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/split-effects-with-no-content-duplication.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
