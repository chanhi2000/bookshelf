---
lang: en-US
title: "How to animate SVG with CSS: Tutorial with examples"
description: "Article(s) > How to animate SVG with CSS: Tutorial with examples"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to animate SVG with CSS: Tutorial with examples"
    - property: og:description
      content: "How to animate SVG with CSS: Tutorial with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-animate-svg-css-tutorial-examples.html
prev: /programming/css/articles/README.md
date: 2024-01-11
isOriginal: false
author:
  - name: Hope Armstrong
    url : https://blog.logrocket.com/author/hopearmstrong/
cover: /assets/image/blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/banner.png
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
  name="How to animate SVG with CSS: Tutorial with examples"
  desc="Bring static SVGs to life with CSS in this guide that explores animating SVG icons and text to improve site interactivity."
  url="https://blog.logrocket.com/how-to-animate-svg-css-tutorial-examples"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/banner.png"/>

::: note Editor’s note

This article was last updated on 11 January 2024 to update the code examples and animation demos.

:::

![Css Svg Animate Nocdn](/assets/image/blog.logrocket.com/how-to-animate-svg-css-tutorial-examples/banner.png)

Web animations are more than just eye candy. When used effectively, they can enhance user experience by offering visual feedback, guiding users through tasks, and improving overall website interactivity.

Web animations come in many flavors, and it’s advisable to avoid bulky GIFs and videos that can hinder website speed. Instead, choose lightweight options like SVGs with CSS for optimal speed, which help you create better animations that load faster, ensuring a smoother UX and faster page loads.

In this article, we’ll explore the creation of simple and scalable animations using SVG and CSS. The only requirements are a basic understanding of CSS and some knowledge of SVGs. Access [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations) for the complete source code, including HTML/SVG and CSS.

<VidStack src="youtube/eZT-OrhxiMY" />

---

## Common use cases for animating SVG with CSS

SVGs fit smoothly into different situations, providing impressive flexibility in preserving graphic quality when scaled. Before getting into the code, let’s look at practical use cases for static and animated SVGs.

### Icons

SVGs are ideal for creating adaptable and scalable iconography for modern apps. They offer superior animation possibilities over icon fonts and PNG image icons.

Animated SVG icons are especially beneficial for subtle interactions and visual feedback in onboarding screens, loading spinners, menu toggles, video playback controls, and much more.

### Data visualizations

Data visualizations can use SVGs to create clean, scalable, dynamic, and highly customizable charts, graphs, and diagrams. [**Data visualization libraries like D3.js**](/blog.logrocket.com/d3-js-adoption-guide.md) also employ SVGs alongside canvas and HTML elements.

### Interactive states

Integrating SVG illustrations into a product streamlines tasks like generating, adding, or removing data, enhancing user-friendliness. Examples include displaying progress, improving empty states, and incorporating engaging micro-interactions to improve the user experience.

### Stickers and emojis

SVGs are perfect for crafting animated stickers and emojis, bringing dynamic and expressive elements to an application.

---

## How to prepare SVGs for animation

In this tutorial, our focus is on creating SVGs from scratch and integrating animations. We will also examine examples of ready-made SVGs.

Let’s start by exploring simple SVG code for animations, beginning with code preparation.

### Optimizing the SVG code

Optimization is essential for minimizing the file size of your SVG and removing redundant tags and metadata. A generated SVG may include unnecessary code, so it is advisable to use a tool such as [<VPIcon icon="fas fa-globe"/>SVG Cleaner](https://iconly.io/tools/svg-cleaner) to clean it up.

### Creating intentional groupings

In SVG, the `<g>` tag is used to group multiple SVG elements for organized structuring and collective transformation or animation. This grouping can be named and styled by assigning an ID or class. However, for single SVG elements or a singular group, the group tag is not necessary:

```xml
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  id="hamburger-icon"
  ...>
  <g class="bar top-bar">...</g>
  <g class="bar middle-bar">...</g>
  <g class="bar bottom-bar">...</g>
</svg>
```

If your goal is to apply the same styling to multiple groups, converting ID names to class names is also a viable option.

### Being mindful of the stacking order

SVG shapes are painted sequentially from top to bottom. To place a shape in the background, list it earlier in the code. Note that CSS’s `z-index` property doesn’t affect SVG elements, so [**prioritize source order for proper layering**](/blog.logrocket.com/css-overlay.md).

### Setting SVG styling to the preferred initial state

SVGs use [<VPIcon icon="fa-brands fa-firefox"/>presentation attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation) (e.g., fill, stroke, stroke-width) directly in the code, prioritized until overridden by external CSS (without `!important`). Consider retaining width and height attributes for smoother loading on slower connections, avoiding the [<VPIcon icon="fas fa-globe"/>flash of unstyled SVG (FOUS)](https://sarasoueidan.com/blog/svg-style-inheritance-and-fousvg/) scenario.

---

## Applying CSS to SVGs

Now that we know how to prepare our SVGs for styling and animation with CSS, let’s explore four different ways of applying CSS to them.

The first method is the inline CSS approach, where you add CSS styles to any part of the SVG using the style attribute, much like you would in HTML.

Because SVG integrates seamlessly with HTML, it supports inline CSS styling. Here’s an example that demonstrates the creation of a plus icon using the `rect` SVG element and some CSS:

```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     width="64" height="64" 
     viewBox="0 0 48 48">
  <g>
    <!-- 
        Notice the fill color and transformations added 
        to the rectangles below using the inline style 
        attribute.
    -->
    <rect
      width="100%"
      height="8"
      style="fill: navy; 
             transform: translateY(calc(50% - 4px))" />
    <rect
      width="100%"
      height="8"
      style="fill: blue;
             transform-origin: center;
             transform: rotate(90deg) translateY(calc(50% - 4px));" />
  </g>
</svg>
```

<CodePen
  user="c99rahul"
  slug-hash="vYPyXxb"
  title="SVG Inline Styles"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The second method for applying styles to an SVG involves using the CSS `@import` rule. This rule is placed within the `<style>` tag inside the SVG to reference and import an external CSS stylesheet. You can refer to [this example in the GitHub repo (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/blob/main/styling-svg/svg-external-styles.html) for a clearer understanding, which looks something like the code below:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <style>
    @import url(style.css);
  </style>
  ...
</svg>
```

The next approach involves writing styles directly within the SVG, but enclosing them within the CDATA section is best to prevent potential conflicts with XML parsing:

```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     width="64" height="64" 
     viewBox="0 0 48 48">
  <!-- 
    Note that the <style> tag is included within 
    the SVG element, wrapped within the CDATA. 
  -->
  <style type="text/css">
    <![CDATA[
      .bar {
        fill: green;
      }
      .horizontal-bar {
        transform: translateY(calc(50% - 4px));
      }
      .vertical-bar {
        fill: darkgreen;
        transform-origin: center;
        transform: rotate(90deg) translateY(calc(50% - 4px));
      }
    ]]>
  </style>
  <g>
    <rect
      class="bar horizontal-bar"
      width="100%" height="8" />
    <rect
      class="bar vertical-bar"
      width="100%" height="8" />
  </g>
</svg>
```

<CodePen
  user="c99rahul"
  slug-hash="GReoyOm"
  title="Styled SVG"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The fourth method involves writing styles for SVG files in an external CSS file consumed in the documents that include these SVG files. Consequently, SVGs automatically get styled depending on the document in which they are being used.

These four methods are sufficient to apply CSS to SVG effectively. If you know additional techniques for styling SVGs with CSS, please mention them in the comments below.

---

## What can you animate with CSS?

CSS enables you to create dynamic visual effects by animating various properties. While [<VPIcon icon="fa-brands fa-firefox"/>not every property is “animatable”](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties), many can be seamlessly transitioned or animated using CSS with SVGs.

Let’s dive into some demos showcasing the power of pure CSS animation, which transforms static SVGs with properties like `transform`, `opacity`, and `color`. These animations incorporate basic math to create dynamic menu toggles, loading animations, fluid line movements, lively illustrations, and smooth text animations.

### Hamburger menu icon

We have already explored using the `rect` SVG element to construct a plus sign. Now, let’s employ the same element to craft a hamburger menu. This menu will transform into a close icon upon being hovered.

Starting with the SVG structure, we will add three `rect` elements. The first one signifies the top bar, the second represents the middle bar, and the last denotes the third bar of the hamburger menu icon:

```xml
<svg xmlns="http://www.w3.org/2000/svg" 
     class="hamburger-icon" 
     width="64" height="64" 
     viewBox="0 0 48 48">
  <rect class="top" 
        x="0" y="0" 
        rx="4" ry="4"
        width="100%" height="8" />
  <rect class="middle" 
        x="0" y="20" 
        rx="4" ry="4"
        width="100%" height="8" />
  <rect class="bottom" 
        x="0" y="40" 
        rx="4" ry="4"
        width="100%" height="8" />
</svg>
```

Grouping using the `g` tag is unnecessary here, as we only have bars in the SVG.

We can now establish a coordinate system with the `viewBox` attribute, providing default `x`, `y`, `width`, and `height`. We set width and height attributes for sizing flexibility, addressing FOUS. We position bars with `x` and `y` coordinates, round corners with `rx` and `ry`, assign heights, and use 100% width.

We strategically set `y` coordinates for equal stacking distances. In the CSS section, we define custom properties like icon size and bar height:

```css
:root {
  --icon-size: 48;
  --icon-bar-size: 8;
}
```

Our square SVG has a side length of 64 pixels. For the close icon animation, set the transformation origin to the center for the top and bottom bars to avoid glitches due to the diagonal length.

Translate bars along the y-axis to maintain centering, adjusting for element height. Determine the necessary y-axis translation distance and set a transition duration:

```css
:root {
  --icon-size: 48;
  --icon-bar-size: 8;
  --icon-translation-size: calc((var(--icon-size) - var(--icon-bar-size)) / 2);
  --icon-transition-duration: 300ms;
}
```

Next, configuring transitions and applying `ease-in-out` as the transition function to the menu bars will enhance the transition from inside to out.

As mentioned earlier, setting the transformation origin to the center is crucial. For this, we have to set the `transform-origin` CSS property to `center` for the hover state of the top and bottom bars:

```css
.hamburger-icon rect {
  transition: all var(--icon-transition-duration) ease-in-out;
}

.hamburger-icon:hover .top,
.hamburger-icon:hover .bottom {
  transform-origin: center;
}
```

Rotate the top bar 45 degrees clockwise and the bottom bar -45 degrees counter-clockwise. Hide the middle bar by setting its opacity to `0` during the animation. We can apply these transformations to the SVG shape’s hover state or a toggleable class, achieved with the hover pseudo-class in CSS for simplicity:

```css
.hamburger-icon:hover .top {
  transform: rotate(45deg)
    translate(0, calc(var(--icon-translation-size) * 1px));
}
.hamburger-icon:hover .bottom {
  transform: rotate(-45deg)
    translate(0, calc(var(--icon-translation-size) * -1px));
}
.hamburger-icon:hover .middle {
  opacity: 0;
}
```

A working demonstration of the above explanation can be found below. If you wish to try it out locally in your development environment, you can find it in the [GitHub repository linked here (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/tree/main/hamburger-icon):

<CodePen
  user="c99rahul"
  slug-hash="KKEaPzv"
  title="Animated SVG Hamburger Menu with CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Rotating loader or spinner

Creating a rotating ring in SVG for loading screens is quite simple. Let’s set up a circle element with a transparent fill and a four-pixel stroke. We can then align the circle using `cx` and `cy` properties, positioning it precisely at half the SVG size.

Then, adjust the diameter considering the stroke width, and set the circle’s radius to half of this calculated diameter (22) to finally render the circle as shown below:

```xml
<svg 
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 48 48"  
  width="64" height="64" 
  class="spinner">
    <circle 
      cx="24" cy="24" 
      r="22" 
      fill="transparent" 
      stroke-width="4" />
</svg>
```

Using CSS keyframes, rotate the animation from zero to 360 degrees, creating a full rotation. Set the SVG element’s animation property using CSS, applying linear operation and infinite looping for a one-second duration:

```css
:root {
  --spinner-animation-speed: 1s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin var(--spinner-animation-speed) linear infinite;
}
```

To enhance the animation, use SVG’s `linearGradient` and `stop` elements to introduce a gradient effect. Adjust values such as `x1`, `x2`, `y1`, `y2`, `stop-color`, and `stop-opacity` in the `linearGradient` element to experiment and create various loading spinner variations:

```xml
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  id="loading-spinner"
  ...
>
  <defs>
    <linearGradient id="fadeGradient" x1="20%" x2="50%" y1="60%" y2="100%">
      <stop offset="0%" stop-color="#07c" />
      <stop offset="25%" stop-color="#07c" stop-opacity="75%" />
      <stop offset="50%" stop-color="#07c" stop-opacity="50%" />
      <stop offset="75%" stop-color="#07c" stop-opacity="25%" />
      <stop offset="100%" stop-color="#07c" stop-opacity="5%" />
    </linearGradient>
  </defs>
  <circle 
    cx="24" cy="24" 
    r="22" 
    fill="transparent" 
    stroke-width="4" 
    stroke="url(#fadeGradient)" />
</svg>
```

Assign a class to each `stop` element for external CSS control. Using the `stop-color` property in the external CSS, manage color and settings with custom properties.

Here’s the combined code for a loading spinner animation; the full code is available in [this file of the GitHub repo (<VPIcon icon="iconfont icon-github"/>`9rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/tree/main/spinner-animation):

### Morphing bars loader

Let’s explore another loader with a pulsating effect by morphing `rect` elements from left to right. Use three `rect` elements, each with a width of eight and a height of 24, separated by a distance of four, resulting in an SVG with a width of 32 and a height of 24:

```xml
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="64" height="48" 
  viewBox="0 0 32 24"
  class="bars-loader">
  <rect 
    class="morphing-bar morphing-bar-left" 
    width="8" height="24" />
  <rect 
    class="morphing-bar morphing-bar-center" 
    width="8" height="24" x="12" />
  <rect 
    class="morphing-bar morphing-bar-right" 
    width="8" height="24" x="24" />
</svg>
```

<CodePen
  user="c99rahul"
  slug-hash="XWGNjVV"
  title="Rotating Loading SVG Icon with Gradient Animated with CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Each bar shares the same animation with different delays in the CSS part. Begin with assigning a fill color and setting the transformation origin to the center for synchronized animation on both the top and bottom bars:

```css
.bars-loader .morphing-bar {
  transform-origin: center;
}
```

Scale each bar slightly below its height on the y-axis, then back to normal with a delay, cycling indefinitely. Use a custom property for loader animation speed and introduce incremental delays for each bar. Divide the total speed into incremental values to prevent the net animation from reaching zero:

```css :collapsed-lines
:root {
  --loader-animation-speed: 0.75s;
}

@keyframes morphingBar {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
}

.bars-loader .morphing-bar {
  transform-origin: center;
  animation: morphingBar var(--loader-animation-speed) ease-in-out infinite;
}

.bars-loader .morphing-bar-left {
  animation-delay: calc(var(--loader-animation-speed) / 2.5);
}

.bars-loader .morphing-bar-center {
  animation-delay: calc(var(--loader-animation-speed) / 5);
}

.bars-loader .morphing-bar-right {
  animation-delay: calc(var(--loader-animation-speed) / 7.5);
}
```

<CodePen
  user="c99rahul"
  slug-hash="OJqbRvP"
  title="SVG Loading Bars Animated with CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

And that’s it! Feel free to adjust the timings, colors, and transition functions to personalize it and make it your own. This is how the morphing bar animation will appear on your app:

### Creating a line drawing animation

To achieve a line drawing effect in SVG, it’s important to utilize stroke properties effectively. For example, when working with a camera icon from [<VPIcon icon="fas fa-globe"/>Tabler Icons](https://tabler.io/icons), I modified its dimensions and transferred certain attributes, such as stroke width, to CSS for enhanced control and customization after examining the icon’s structure.

The paths now rely on CSS-animated `stroke-dasharray` and `stroke-dashoffset` properties, a technique I covered in another SVG-powered circular progress component for React:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="256"
  height="256"
  id="drawable-illustration"
>
  <path d="..."  />
  <path d="..." />
</svg>
```

The above SVG is functional only when it utilizes the following properties. I’m excluding elements with the fill set to `none` using the `:not` pseudo-class, as these elements are primarily intended to set the viewport and are not directly relevant to the display:

```css
:root {
  --illustration-drawing-speed: 2s;
}

#drawable-illustration path:not([fill="none"]) {
  fill: transparent;
  stroke-width: 0.25;
  stroke: currentColor;
}
```

Before we proceed, it’s essential to determine the length of each path or element we intend to animate. These values are crucial for use with the `stroke-dasharray` and `stroke-dashoffset` properties. While we can provide estimates, it’s preferable to use accurate values that we can obtain using JavaScript and incorporate them into our CSS later:

```js
let icon = document.querySelector("#drawable-illustration");

if (icon) {
  let paths = icon.querySelectorAll("path");
  if (paths.length) {
    for ([index, path] of paths.entries()) {
      let pathLength = path.getTotalLength();
      console.log(`Path #${index + 1}: ${pathLength}`);
    }
  }
}
```

The above JavaScript code displays the length of each path individually in `#animated-icon`. The length of the first path is approximately 62, and the second path is approximately 19. We will utilize these values to configure the `stroke-dasharray` and `stroke-dashoffset` properties:

```css
#drawable-illustration path:nth-child(1) {
  stroke-dasharray: 61.9942626953125;
  stroke-dashoffset: 61.9942626953125;
}
#drawable-illustration path:nth-child(2) {
  stroke-dasharray: 18.852230072021484;
  stroke-dashoffset: 18.852230072021484;
}
```

The `stroke-dasharray` property defines line patterns; lengths are 62 dashes and 19 gaps for the first path, and the second path follows the same pattern. The `stroke-dashoffset` property initially sets the pattern’s starting point at full length. Decreasing these two things shifts the pattern, creating a drawing or revealing effect.

In the animation section, we can create a CSS keyframe to transition `stroke-dashoffset` to `0` for both paths, as shown in the code below:

<CodePen
  user="c99rahul"
  slug-hash="XWGRoOK"
  title="Line-drawing Animation with SVG & CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

#drawable-illustration path:not([fill="none"]) {
  ...
  animation: draw var(--illustration-drawing-speed) forwards;
}
```

Now, set the animation direction to `forwards`. Find the [complete code for this demo here (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/tree/main/line-drawing-animation). See the final effect in the CodePen demo below:

### Animated illustration

Let’s choose some pre-made SVG illustrations and icons and create something by combining them. I transformed a PNG popsicle illustration from [<VPIcon icon="fas fa-globe"/>Cori George’s collection](https://heyletsmakestuff.com/popsicle/) into SVG format using an online tool.

Then, I incorporated a drop icon from Tabler Icons below the SVG paths of the popsicle, assigning unique IDs for CSS customization. We can animate these drops with CSS translation and opacity changes. By varying the animation durations for each drop, we can achieve a random falling pattern:

```css :collapsed-lines
:root {
  --p-drop-right-speed: 3.5s;
  --p-drop-left-speed: 2.5s;
}

#popsicle .drop-left
  transform: scale(2);
  opacity: 0;
}

#popsicle .drop-left {
  animation: dropLeft var(--p-drop-left-speed) ease-in-out infinite;
  opacity: 0;
}
#popsicle .drop-right {
  animation: dropRight var(--p-drop-right-speed) ease-in-out infinite;
  opacity: 0;
}

@keyframes drop-left {
  5% {
    transform: translate(450px, 525px) scale(2.5);
    opacity: 1;
  }
  100% {
    transform: translate(450px, 900px) scale(2);
    opacity: 0;
  }
}

@keyframes drop-right {
  5% {
    transform: translate(575px, 415px) scale(2.5);
    opacity: 1;
  }
  100% {
    transform: translate(575px, 900px) scale(2);
    opacity: 0;
  }
}
```

Check out the working demonstration in the CodePen below, and find the [complete code for this example here (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/tree/main/animated-illustration):

<CodePen
  user="c99rahul"
  slug-hash="WNmooKz"
  title="Melting Popsicle SVG Animated with CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Fade-in-out text

Another cool animation is a fade-in and fade-out text animation, similar to a blinking text effect in HTML with CSS. Let’s use the text element, style it with CSS, and apply a Google Font for an elevated look.

Then, it’s easy to set up a keyframe animation for toggling text opacity and bringing about a smooth fade-in-out SVG text animation, as shown in the demo below:

```css
:root {
  --text-animation-speed: 0.5s;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.blinking-text {
  animation: blink var(--text-animation-speed) ease-in infinite alternate;
}
```

<CodePen
  user="c99rahul"
  slug-hash="LYaxWem"
  title="Blinking SVG Text with CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Another example involves animating the text letter by letter with fade-in-out using `tspan` SVG elements inside the `text` element. Each `tspan` can be targeted for different animations with delays. See the modified SVG below for this change:

```xml
<svg width="500" height="120" class="blinking-chars">
  <text text-anchor="middle" x="50%" y="50%" class="blinking-chars-group">
    <tspan class="char" dy="0">H</tspan>
    <tspan class="char" dy="0">e</tspan>
    <tspan class="char" dy="0">l</tspan>
    <tspan class="char" dy="0">l</tspan>
    <tspan class="char" dy="0">o</tspan>
  </text>
</svg>
```

Apply the in-and-out fade effect for each character with a CSS keyframe animation, animating each `tspan` from 0% to 100% opacity. Organize by setting a custom property for animation speed, incrementally assigning each character a portion of that speed. See the code below for the CSS setup:

```css :collapsed-lines
:root {
  --text-animation-speed: 1s;
}

.blinking-chars-group .char {
  animation: blink var(--text-animation-speed) infinite alternate;
  opacity: 0;
}
.blinking-chars .char:nth-child(1) {
  animation-delay: calc(var(--text-animation-speed) * 0);
}
.blinking-chars .char:nth-child(2) {
  animation-delay: calc(var(--text-animation-speed) * 0.2);
}
.blinking-chars .char:nth-child(3) {
  animation-delay: calc(var(--text-animation-speed) * 0.4);
}
.blinking-chars .char:nth-child(4) {
  animation-delay: calc(var(--text-animation-speed) * 0.6);
}
.blinking-chars .char:nth-child(5) {
  animation-delay: calc(var(--text-animation-speed) * 0.8);
}
```

The initial opacity for each `tspan` is set to 0%, and then we can add a strategic animation delay for each `tspan` with an alternating direction. This makes the opacity transition smoother, going from `0` to `1` and then from `1` to `0`:

<CodePen
  user="c99rahul"
  slug-hash="yLwXpjW"
  title="Blinking Character Animation with SVG and CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Find the full code for this [example here in the GitHub repo (<VPIcon icon="iconfont icon-github"/>`c99rahul/svg-css-animations`)](https://github.com/c99rahul/svg-css-animations/tree/main/blinking-chars). For such animations, be aware of the text string’s character count to set up CSS accordingly. While this can be achieved more efficiently with JavaScript, it is beyond the scope of this tutorial.

### Wavy SVG text

The final demo we’ll explore is a wavy text animation resembling a bouncy text effect. Unlike the fade-in-out animation, this involves translating each letter up and down, which requires separate text elements because `tspan` doesn’t support transforms.

While using one text element per letter isn’t ideal for positioning, for the demo, we’ll use text elements, wrap them in a group, and assume positions, as shown below:

```xml :collapsed-lines
<svg ...>
  <g>
    <text y="50%" class="char">
      H
    </text>
    <text y="50%" x="20%" class="char">
      e
    </text>
    <text y="50%" x="40%" class="char">
      l
    </text>
    <text y="50%" x="60%" class="char">
      l
    </text>
    <text y="50%" x="80%" class="char">
      o
    </text>
  </g>
</svg>
```

We’ve made the text move upwards at certain intervals and brought it down at others, creating a wave-like effect:

<CodePen
  user="c99rahul"
  slug-hash="PoLjEMd"
  title="Wavy Text Animation with SVG and CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

By taking this approach, we have traded the automatic character alignment provided by `tspan` for the manual alignment of each character using the `x` attribute, which isn’t very efficient. Effects like this call for a more effective solution or tool, some of which are discussed in the next section.

---

## More tools for animating SVGs

Animating SVGs with only CSS has limitations, such as the inability to dynamically count elements and set up CSS accordingly. To overcome these challenges and create more advanced animations for complex SVG shapes, various tools simplify the process significantly:

- [<VPIcon icon="fas fa-globe"/>SVG.js](https://svgjs.dev/docs/3.0/): A lightweight JavaScript library for manipulating and animating SVGs
- [<VPIcon icon="fas fa-globe"/>Vivus.js](http://maxwellito.github.io/vivus/): A JavaScript class with no dependencies that enables SVG animation, creating a drawn effect similar to what we covered in the line animation section
- [<VPIcon icon="fas fa-globe"/>mo.js](https://mojs.github.io/): Aimed at motion graphics on the web, offering fast and robust animations through its API, and the best part is that it’s open source
- [<VPIcon icon="fas fa-globe"/>Framer Motion](https://framer.com/motion/): A production-ready animation library for React with a declarative syntax — an awesome open source project for SVG animations
- [<VPIcon icon="fas fa-globe"/>Animate.css](https://daneden.github.io/animate.css/): A collection of pre-made CSS animations you can copy and paste into your workflow to apply different effects to your SVGs
- [<VPIcon icon="fas fa-globe"/>GSAP](https://greensock.com/gsap/): Provides premium access to animate nearly everything you can select with JavaScript
- [<VPIcon icon="fas fa-globe"/>SVGator](https://svgator.com/): Another paid tool that simplifies the animation task with SVGs through its UI, allowing you to import, animate, and export the output

---

## Conclusion

Now that you’ve explored various ways to animate SVGs using CSS, I hope you feel inspired to create your own web animations! It’s fun to bring static SVGs to life using just a bit of CSS.

Once you get the hang of a few techniques, tackling more complex animations will become easier. You can discover endless inspiration online, particularly on sites like CodePen. To get started, explore [<VPIcon icon="fa-brands fa-codepen"/>the CodePen collection featuring examples covered in this tutorial](https://codepen.io/collection/JGxjqv). Have fun animating!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to animate SVG with CSS: Tutorial with examples",
  "desc": "Bring static SVGs to life with CSS in this guide that explores animating SVG icons and text to improve site interactivity.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-animate-svg-css-tutorial-examples.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
