---
lang: en-US
title: "Glitch Effect on Text / Images / SVG"
description: "Article(s) > Glitch Effect on Text / Images / SVG"
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
      content: "Article(s) > Glitch Effect on Text / Images / SVG"
    - property: og:description
      content: "Glitch Effect on Text / Images / SVG"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/glitch-effect-text-images-svg.html
prev: /programming/css/articles/README.md
date: 2019-08-21
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/glitch-stacked.png
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
  name="Glitch Effect on Text / Images / SVG"
  desc="Lucas Bebber's Glitch is a super cool effect. It's like you're looking at some text displayed on a progressive scan monitor that has been dropped on the"
  url="https://css-tricks.com/glitch-effect-text-images-svg"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/glitch-stacked.png"/>

Lucas Bebber’s [Glitch (<VPIcon icon="fa-brands fa-codepen"/>`lbebber`)](http://codepen.io/lbebber/pen/ypgql) is a super cool effect. It’s like you’re looking at some text displayed on a progressive scan monitor that has been dropped on the ground one too many times and so the alignment of the pixels is off in weirdly un-even amounts time and space.

It’s bonafide CSS trick if there ever was one! It took me a bit to figure out how it was working, so I thought I’d explain. Then I ended up making it work for other kinds of content as well as making it into a group of Sass `@mixin`s to make working with it a bit easier.

<CodePen
  user="chriscoyier"
  slug-hash="xxKRQRm"
  title="CSS Glitched Text"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Three Copies of the Text

While the HTML is just:

```html
<div class="glitch" data-text="GLITCH">GLITCH</div> 
```

Three copies of it are created, via pseudo-elements, and they are positioned right on top of each other.

```css
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

Producing three unique copies that can be controlled individually:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/glitch-stacked.png?ssl=1)

---

## Alter the Copies

Each copy is identical except that:

- It’s offset to the left or right
- It has a highlight, in the form of a text-shadow

Between the offset and the highlight, it gives it that broken feeling.

```css
.glitch::before {
  /* ... anything needed to make it identical */

  /* variation */
  left: 2px;
  text-shadow: -1px 0 red;
  
  /* important: opaque background masks the original */
  background: black;
}
.glitch::after {
  /* ... anything needed to make it identical */

  /* variation */
  left: -2px;
  text-shadow: -1px 0 blue;
  
  /* important: opaque background masks the original */
  background: black;
}
```

So now the three copies are like this:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/red-blue-overlays.png)

---

## Clipping the Copies

You’d only ever see the top copy if left as-is. Probably the `::after` version, unless you alter with `z-index`. But never fear, we’re going to be only revealing parts of the top, altered copies with the `clip` [<VPIcon icon="iconfont icon-css-tricks"/>property](https://css-tricks.com/almanac/properties/c/clip/). This property is apparently deprecated in favor of `clip-path`, but at the time of this writing, only `clip` was working for me. I’m sure that will change in time, so we’ll have to keep an eye on it, and presumably, Autoprefixer will handle it.

::: note Update! August 2019

Plenty of time has past, and `clip` is still generally supported, but deprecated in favor of the (better) [<VPIcon icon="fa-brands fa-firefox"/>`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path). The `clip` syntax can do what the `inset()` function value is for `clip-path`, so I’m updating this article to use that. Doesn’t look like Autoprefixer deals with the conversation.

:::

The syntax for `clip` is kinda weird. For the four values, you might expect something like top/left/width/height, or point-at-top-left/point-at-bottom-right. But instead, it’s like margin and padding: top/right/bottom/left

```css
.glitch::before {
  clip: rect(44px, 450px, 56px, 0);
  /*
    Essentially a box from 0, 44px
    to 450px, 56px
  */

  /* clip-path: inset(); needs how far you want to push in from the edges instead */
}
```

Here’s some example clips on those layers, now with fully opaque backgrounds applied (but still rotated and with extra colors so you can see what’s going on):

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/clipped-layers.png)

---

## Animate the Clips

Turns out clip can be animated, so, that clipped box will animate to a new position over time if told to, Here’s an example of keyframes:

```css
@keyframes noise-anim {
  0% {
    clip-path: inset(40% 0 61% 0);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
  }
}
```

Notice the left and right values remain the same, it’s just the top and bottom that change. And those values are kinda random.

You can generate that pretty easily with Sass, like:

```css
@keyframes noise-anim {
  $steps: 20;
  @for $i from 0 through $steps {
    #{percentage($i*(1/$steps))} {
      $top: random(100);
      $bottom: random(101 - $top);
      clip-path: inset(#{$top}% 0 #{$bottom}% 0);
    }
  }
}
```

Because you’d want two sets of randomized clipping positions, you’d make two sets of those @keyframes, and apply them to the copies:

```css
.glitch::before {
  ...

  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.glitch::after {
  ...

  animation: glitch-anim-2 2s infinite linear alternate-reverse;
}
```

There is where we set the speed (number of keyframes also affects speed) as well as making it run infinitely back and forth.

It’s pretty fun to watch:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/09/glitch-in-action.gif?ssl=1)

Although it should go without saying a little goes a long way.

---

## Sass @mixins

I thought it would be neat if the technique was more reusable. Basically, call a `@mixin` with parameters to control the effect and get just what you need.

```css
.example-one {
  font-size: 100px;
  @include textGlitch("example-one", 17, white, black, red, blue, 450, 115);
}
```

Here’s my take on it:

```css :collapsed-lines
/*
  (TEXT) PARAMS
  =================
  1. Namespace
  2. Intensity
  3. Text color
  4. Background color (flat)
  5. Highlight #1 color
  6. Highlight #2 color
  7. Width (px)
  8. Height (px)
*/

@mixin textGlitch($name, $intensity, $textColor, $background, $highlightColor1, $highlightColor2, $width, $height) {
  
  color: $textColor;
  position: relative;
  $steps: $intensity;
  
  // Ensure the @keyframes are generated at the root level
  @at-root {
    // We need two different ones
    @for $i from 1 through 2 {
      @keyframes #{$name}-anim-#{$i} {
        @for $i from 0 through $steps {
          $top: random(100);
          $bottom: random(101 - $top);
          #{percentage($i*(1/$steps))} {
            clip-path: inset(#{$top}% 0 #{$bottom}% 0);
          }
        }
      }
    }
  }
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $background;
  }
  &::after {
    left: 2px;
    text-shadow: -1px 0 $highlightColor1;
    animation: #{$name}-anim-1 2s infinite linear alternate-reverse;
  }
  &::before {
    left: -2px;
    text-shadow: 2px 0 $highlightColor2; 
    animation: #{$name}-anim-2 3s infinite linear alternate-reverse;
  }
}
```

There are a million different ways to approach it, this is just one. Totally depends on how much you want the mixin to do for you, how much customizability you want or need, what you want left in the HTML, etc.

I also made two more mixins, one for applying this effect to images, and on for inline SVG. They are different because they don’t use pseudo-elements to make the copies, coloring happens in different ways, positioning happens differently, etc. [Here’s all three of them together (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/XWrNyZy?editors=0110).

And a demo:

<CodePen
  user="chriscoyier"
  slug-hash="RwboqMr"
  title="CSS Glitched Text"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Glitch Effect on Text / Images / SVG",
  "desc": "Lucas Bebber's Glitch is a super cool effect. It's like you're looking at some text displayed on a progressive scan monitor that has been dropped on the",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/glitch-effect-text-images-svg.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
