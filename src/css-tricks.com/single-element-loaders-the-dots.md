---
lang: en-US
title: "Single Element Loaders: The Dots"
description: "Article(s) > Single Element Loaders: The Dots"
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
      content: "Article(s) > Single Element Loaders: The Dots"
    - property: og:description
      content: "Single Element Loaders: The Dots"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/single-element-loaders-the-dots.html
prev: /programming/css/articles/README.md
date: 2022-06-17
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/dots-loader.jpg
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
  name="Single Element Loaders: The Dots"
  desc="In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks."
  url="https://css-tricks.com/single-element-loaders-the-dots"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/dots-loader.jpg"/>

We’re looking at loaders in this series. More than that, we’re breaking down some common loader patterns and how to re-create them with nothing more than a single div. So far, we’ve picked apart [**the classic spinning loader**](https://css-tricks.com/single-element-loaders-the-spinner.md). Now, let’s look at another one you’re likely well aware of: **the dots.**

[<VPIcon icon="fas fa-globe"/>Dot loaders](https://css-loaders.com/dots/) are all over the place. They’re neat because they usually consist of three dots that sort of look like a text ellipsis (…) that dances around.

::: info Single-Element Loaders series:

```component VPCard
{
  "title": "Single Element Loaders: The Spinner",
  "desc": "This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques.",
  "link": "/css-tricks.com/single-element-loaders-the-spinner.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Dots",
  "desc": "In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks.",
  "link": "/css-tricks.com/single-element-loaders-the-dots.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Bars",
  "desc": "We’ve looked at spinners. We’ve looked at dots. Now we’re going to tackle another common pattern for loaders: bars. And we’re going to do the same thing in",
  "link": "/css-tricks.com/single-element-loaders-the-bars.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: Going 3D!",
  "desc": "For this fourth and final article of our little series on single-element loaders, we are going to explore 3D patterns. When creating",
  "link": "/css-tricks.com/single-element-loaders-going-3d.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

Our goal here is to make this same thing out of a single div element. In other words, there is no one div per dot or individual animations for each dot.

<CodePen
  user="anon"
  slug-hash="xxpyoqL"
  title="Colorful CSS only loader"
  :default-tab="['css','result']"
  :theme="dark"/>

That example of a loader up above is made with a single div element, a few CSS declarations, and no pseudo-elements. I am combining two techniques using CSS `background` and `mask`. And when we’re done, we’ll see how animating a background gradient helps create the illusion of each dot changing colors as they move up and down in succession.

---

## The background animation

Let’s start with the background animation:

```css
.loader {
  width: 180px; /* this controls the size */
  aspect-ratio: 8/5; /* maintain the scale */
  background: 
    conic-gradient(red   50%, blue   0) no-repeat, /* top colors */
    conic-gradient(green 50%, purple 0) no-repeat; /* bottom colors */
  background-size: 200% 50%; 
  animation: back 4s infinite linear; /* applies the animation */
}

/* define the animation */
@keyframes back {
  0%,                       /* X   Y , X     Y */
  100% { background-position: 0%   0%, 0%   100%; }
  25%  { background-position: 100% 0%, 0%   100%; }
  50%  { background-position: 100% 0%, 100% 100%; }
  75%  { background-position: 0%   0%, 100% 100%; }
}
```

I hope this looks pretty straightforward. What we’ve got is a `180px`-wide `.loader` element that shows two conic gradients sporting hard color stops between two colors each — the first gradient is red and blue along the top half of the `.loader`, and the second gradient is green and purple along the bottom half.

The way the loader’s background is sized (`200%` wide), we only see one of those colors in each half at a time. Then we have this little animation that pushes the position of those background gradients left, right, and back again forever and ever.

When dealing with background properties — especially `background-position` — I always refer to my [<VPIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow answer where I am giving a detailed explanation](https://stackoverflow.com/a/51734530/8620333) on how all this works. If you are uncomfortable with CSS background trickery, I highly recommend reading that answer to help with what comes next.

In the animation, notice that the first layer is `Y=0%` (placed at the top) while `X` is changes from `0%` to `100%.` For the second layer, we have the same for `X` but `Y=100%` (placed at the bottom).

<CodePen
  user="anon"
  slug-hash="gOvOjZy"
  title="Gradient animation"
  :default-tab="['css','result']"
  :theme="dark"/>

> Why using a `conic-gradient()` instead of `linear-gradient()`?

Good question! Intuitively, we should use a linear gradient to create a two-color gradients like this:

```css
linear-gradient(90deg, red 50%, blue 0)
```

But we can also reach for the same using a `conic-gradient()` — and with less of code. We reduce the code and also learn a new trick in the process!

Sliding the colors left and right is a nice way to make it look like we’re changing colors, but it might be better if we instantly change colors instead — that way, there’s no chance of a loader dot flashing two colors at the same time. To do this, let’s change the `animation`‘s timing function from `linear` to `steps(1)`

<CodePen
  user="anon"
  slug-hash="KKQKBYM"
  title="gradient animation with steps"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The loader dots

If you followed along with the [**first article in this series**](https://css-tricks.com/single-element-loaders-the-spinner.md), I bet you know what comes next: **CSS masks!** What makes masks so great is that they let us sort of [**“cut out” parts of a background**](/css-tricks.com/clipping-masking-css.md) in the shape of another element. So, in this case, we want to make a few dots, show the background gradients through the dots, and cut out any parts of the background that are not part of a dot.

We are going to use `radial-gradient()` for this:

```css{4-8}
.loader {
  width: 180px;
  aspect-ratio: 8/5;
  mask:
    radial-gradient(#000 68%, #0000 71%) no-repeat,
    radial-gradient(#000 68%, #0000 71%) no-repeat,
    radial-gradient(#000 68%, #0000 71%) no-repeat;
  mask-size: 25% 40%; /* the size of our dots */
}
```

There’s some duplicated code in there, so let’s make a CSS variable to slim things down:

```css{4}
.loader {
  width: 180px;
  aspect-ratio: 8/5;
  --_g: radial-gradient(#000 68%, #0000 71%) no-repeat;
  mask: var(--_g),var(--_g),var(--_g);
  mask-size: 25% 40%;
}
```

Cool cool. But now we need a new animation that helps move the dots up and down between the animated gradients.

```css
.loader {
  /* same as before */
  animation: load 2s infinite;
}

@keyframes load {      /* X  Y,     X   Y,    X   Y */
  0%     { mask-position: 0% 0%  , 50% 0%  , 100% 0%; } /* all of them at the top */
  16.67% { mask-position: 0% 100%, 50% 0%  , 100% 0%; }
  33.33% { mask-position: 0% 100%, 50% 100%, 100% 0%; }
  50%    { mask-position: 0% 100%, 50% 100%, 100% 100%; } /* all of them at the bottom */
  66.67% { mask-position: 0% 0%  , 50% 100%, 100% 100%; }
  83.33% { mask-position: 0% 0%  , 50% 0%  , 100% 100%; }
  100%   { mask-position: 0% 0%  , 50% 0%  , 100% 0%; } /* all of them at the top */
}
```

Yes, that’s a total of three radial gradients in there, all with the same configuration and the same size — the animation will update the position of each one. Note that the `X` coordinate of each dot is fixed. The `mask-position` is defined such that the first dot is at the left (`0%`), the second one at the center (`50%`), and the third one at the right (`100%`). We only update the `Y` coordinate from `0%` to `100%` to make the dots dance.

![Dot loader dots with labels showing their changing positions.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/s_98F21CD3C1C7899779F98C6C3E6075E37A8E660CF4703968B4D3A7A973FF0FA6_1651441844341_image.png?resize=523%2C362&ssl=1)

Here’s what we get:

<CodePen
  user="anon"
  slug-hash="abqbamK"
  title="mask animation"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, combine this with our gradient animation and magic starts to happen:

<CodePen
  user="anon"
  slug-hash="vYdYzxq"
  title="Combining both animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dot loader variations

The CSS variable we made in the last example makes it all that much easier to swap in new colors and create more variations of the same loader. For example, different colors and sizes:

<CodePen
  user="anon"
  slug-hash="poaoOww"
  title="final loader"
  :default-tab="['css','result']"
  :theme="dark"/>

What about another movement for our dots?

<CodePen
  user="anon"
  slug-hash="PoQLQXe"
  title="Another variation"
  :default-tab="['css','result']"
  :theme="dark"/>

Here, all I did was update the animation to consider different positions, and we get another loader with the same code structure!

The animation technique I used for the mask layers can also be used with background layers to create a lot of different loaders with a single color. [I wrote a detailed article about this. (<VPIcon icon="fa-brands fa-dev" />`afif`)](https://dev.to/afif/build-your-css-loader-with-only-one-div-the-dots-3882) You will see that from the same code structure we can create different variations by simply changing a few values. I am sharing a few examples at the end of the article.

Why not a loader with one dot?

<CodePen
  user="anon"
  slug-hash="JjpWdoQ"
  title="Simple colorful loader"
  :default-tab="['css','result']"
  :theme="dark"/>

This one should be fairly easy to grok as I am using the same technique but with a more simple logic:

<CodePen
  user="anon"
  slug-hash="NWyOdgv"
  title="showing the mask"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is another example of loader where I am also animating `radial-gradient` combined with [**CSS filters**](/css-tricks.com/almanac-properties/filter.md) and [**`mix-blend-mode`**](//css-tricks.com/almanac-properties/mix-blend-mode.md) to create a blobby effect:

<CodePen
  user="anon"
  slug-hash="MWrXvMa"
  title="CSS only Blob loader"
  :default-tab="['css','result']"
  :theme="dark"/>

If you check the code, you will see that all I am really doing there is animating the `background-position`, exactly like we did with the previous loader, but adding a dash of `background-size` to make it look like the blob gets bigger as it absorbs dots.

::: note

If you want to understand the magic behind that blob effect, you can refer to [these interactive slides (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/project/full/ZjwjBe) (Chrome only) by [Ana Tudor (<VPIcon icon="fa-brands fa-x-twitter"/>`anatudor`)](https://x.com/anatudor) because she covers the topic so well!

:::

Here is another dot loader idea, this time using a different technique:

<CodePen
  user="anon"
  slug-hash="VwrWLVb"
  title="CSS 3 dots loaders"
  :default-tab="['css','result']"
  :theme="dark"/>

This one is only 10 CSS declarations and a keyframe. The main element and its two pseudo-elements have the same background configuration with one radial gradient. Each one creates one dot, for a total of three. The animation moves the gradient from top to bottom by using different delays for each dot..

Oh, and take note how this demo uses CSS Grid. This allows us to leverage the grid’s default `stretch` alignment so that both pseudo-elements cover the whole area of their parent. No need for sizing! Push the around a little with `translate()` and we’re all set.

---

## More examples!

Just to drive the point home, I want to leave you with a bunch of additional examples that are really variations of what we’ve looked at. As you view the demos, you’ll see that the approaches we’ve covered here are super flexible and open up tons of design possibilities.

<CodePen
  user="anon"
  slug-hash="MWpKbez"
  title="The Dots"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="VwpWZBr"
  title="The Dots II"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="mdWppmj"
  title="The Dots III"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="qBrLrox"
  title="The Dots IV"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="rNmNqwr"
  title="The Dots V"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Next up…

OK, so we covered [<VPIcon icon="fas fa-globe"/>dot loaders](https://css-loaders.com/dots/) in this article and [<VPIcon icon="fas fa-globe"/>spinners](https://css-loaders.com/spinner/) in the last one. In the next article of this four-part series, we’ll turn our attention to another common type of loader: **the bars.** We’ll take a lot of what we learned so far and see how we can extend them to create yet another single element loader with as little code and as much flexibility as possible.

::: info Single-Element Loaders series:

```component VPCard
{
  "title": "Single Element Loaders: The Spinner",
  "desc": "This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques.",
  "link": "/css-tricks.com/single-element-loaders-the-spinner.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Dots",
  "desc": "In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks.",
  "link": "/css-tricks.com/single-element-loaders-the-dots.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Bars",
  "desc": "We’ve looked at spinners. We’ve looked at dots. Now we’re going to tackle another common pattern for loaders: bars. And we’re going to do the same thing in",
  "link": "/css-tricks.com/single-element-loaders-the-bars.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: Going 3D!",
  "desc": "For this fourth and final article of our little series on single-element loaders, we are going to explore 3D patterns. When creating",
  "link": "/css-tricks.com/single-element-loaders-going-3d.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Single Element Loaders: The Dots",
  "desc": "In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/single-element-loaders-the-dots.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
