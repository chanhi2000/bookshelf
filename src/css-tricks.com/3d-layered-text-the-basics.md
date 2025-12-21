---
lang: en-US
title: "3D Layered Text: The Basics"
description: "Article(s) > 3D Layered Text: The Basics"
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
      content: "Article(s) > 3D Layered Text: The Basics"
    - property: og:description
      content: "3D Layered Text: The Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-the-basics.html
prev: /programming/css/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Amit Sheen
    url : https://css-tricks.com/author/amitsheen/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/bulging-text.jpg
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
  name="3D Layered Text: The Basics"
  desc="A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series."
  url="https://css-tricks.com/3d-layered-text-the-basics"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/bulging-text.jpg"/>

Recently, a client asked me to create a bulging text effect. These are exactly the kinds of creative challenges I live for. I explored several directions, JavaScript solutions, SVG filters, but then I remembered the concept of 3D layered text. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of.

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/07/Bulging-Text.mp4" />

Visually, it’s striking, and it’s also a perfect project to learn all sorts of valuable CSS animation techniques. From the fundamentals of layering, through element indexing, to advanced background-image tricks. And yes, we’ll use a touch of JavaScript, but don’t worry about it right now.

There is a lot to explore here, so this article is actually the first of a three part series. In this chapter, we will focus on the core technique. You will learn how to build the layered 3D text effect from scratch using HTML and CSS. We will cover structure, stacking, indexing, perspective, and how to make it all come together visually.

In chapter two, we will add movement. Animations, transitions, and clever visual variations that bring the layers to life.

In chapter three, we will introduce JavaScript to follow the mouse position and build a fully interactive version of the effect. This will be the complete bulging text example that inspired the entire series.

::: info 3D Layered Text Article Series

```component VPCard
{
  "title": "3D Layered Text: The Basics",
  "desc": "A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series.",
  "link": "/css-tricks.com/3d-layered-text-the-basics.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Motion and Variations",
  "desc": "In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.",
  "link": "/css-tricks.com/3d-layered-text-motion-and-variations.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Interactivity and Dynamicism",
  "desc": "In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time.",
  "link": "/css-tricks.com/3d-layered-text-interactivity-and-dynamism.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## The Method

Before we dive into the text, let’s talk about 3D. CSS actually allows you to create some wild three-dimensional effects. Trust me, I’ve done it. It’s pretty straightforward to move and position elements in a 3D space, and have full control over perspective. But there’s one thing CSS doesn’t give us: depth.

If I want to build a cube, I can’t just give an element a `width`, a `height`, and a `depth`. There is no `depth`, it doesn’t work that way. To build a cube or any other 3D structure in CSS, we have two main approaches: constructive and layered.

### Constructive

The constructive method is very powerful, but can feel a bit fiddly, with plenty of transforms and careful attention to perspective. You take a bunch of flat elements and assemble them together, somewhere between digital Lego bricks and origami. Each side of the shape gets its own element, positioned and rotated precisely in the 3D space. Suddenly, you have a cube, a pyramid, or any other structure you want to create.

And the results can be super satisfying. There’s something unique about assembling 3D objects piece by piece, watching flat elements transform into something with real presence. The constructive method opens up a world where you can experiment, improvise, and invent new forms. You could even, for example, build a cute robot bouncing on a pogo stick.

<CodePen
  link="https://codepen.io/amit_sheen/pen/dyBJQag"
  title="A bouncing robot (CSS only)"
  :default-tab="['css','result']"
  :theme="dark"/>

### Layered

But here we’re going to focus on the layered method. This approach isn’t about building a 3D object out of sides or polygons. Instead, it’s all about stacking multiple layers, sometimes dozens of them, and using subtle shifts in position and color to create the illusion of depth. You’re tricking the eye into seeing volume and bulges where there’s really just a clever pile of flat elements.

This technique is super flexible. Think of a cube of sticky memo papers, but instead of squares, the papers are cut to shape your design. It’s perfect for text, 3D shapes, and UI elements, especially with round edges, and you can push it as far as your creativity (and patience) will take you.

<CodePen
  link="https://codepen.io/amit_sheen/pen/KwpLrJe/a41446c5e20cbbdb945beb731d860f63"
  title="Layered Text"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note Accessibility note:

Keep in mind that this method can easily become a nightmare for screen reader users, especially when applied to text. Make sure to wrap all additional and decorative layers with `aria-hidden="true"`. That way, your creative effects won’t interfere with accessibility and ensure that people using assistive technologies can still have a good experience.

:::

---

## Creating a 3D Layered Text

Let’s kick things off with a basic static example, using “lorem ipsum” as a placeholder (feel free to use any text you want). We’ll start with a simple container element with a class of `.text`. Inside, we’ll put the original text in a `span` (it will help later when we want to style this text separately from the layered copies), and another div with a class of “layers” where we’ll soon add the individual layers. (And don’t forget the `aria-hidden`.)

```html
<div class="text">
  <span>Lorem ipsum</span>
  <div class="layers" aria-hidden="true"></div>
</div>
```

Now that we have our wrapper in place, we can start building out the layers themselves. In chapter three, we will see how to build the layers dynamically with JavaScript, but you can generate them easily with a simple loop in your preprocessor (if you are using one), or just add them manually in the code. Check out the **pro tip** below for a quick way to do that. The important thing is that we end up with something that looks like this.

```html
<div class="layers" aria-hidden="true">
  <div class="layer"></div>
  <div class="layer"></div>
  <div class="layer"></div>
  <!-- ...More layers -->
</div>
```

Great, now we have our layers, but they are still empty. Before we add any content, let’s quickly cover how to assign their indexes.

---

## Indexing the layers

Indexing simply means assigning each layer a variable (let’s call it `--i`) that holds its index. So, the first layer gets `--i: 1;`, the second gets `--i: 2;`, and so on. We’ll use these numbers later on as values for calculating each layer’s position and appearance.

There are a couple of ways to add these variables to your layers. You can define the value for each layer using `:nth-child` in CSS, (again, a simple loop in your preprocessor, if you’re using one), or you can do it inline, giving each layer element a `style` attribute with the right `--i` value.

```css
.layer {
  &:nth-child(1): { --i: 1; }
  &:nth-child(2): { --i: 2; }
  &:nth-child(3): { --i: 3; }
  /* ... More layers */
}
```

…or:

```html
<div class="layers" aria-hidden="true">
  <div class="layer" style="--i: 1;"></div>
  <div class="layer" style="--i: 2;"></div>
  <div class="layer" style="--i: 3;"></div>
  <!-- ...More layers -->
</div>
```

In this example, we will go with the inline approach. It gives us full control, keeps things easy to understand, and avoids dependency between the markup and the stylesheet. It also makes the examples copy friendly, which is great if you want to try things out quickly or tweak the markup directly.

::: tip Pro tip

If you’re working in an IDE with Emmet support, you can generate all your layers at once by typing `.layer*24[style="--i: $;"]` and pressing Tab. The `.layer` is your class, `*24` is the number of elements, attributes go in square brackets `[ ]`, and `$` is the incrementing number. But, If you’re reading this in the not-so-distant future, you might be able to use [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and not even need these tricks. In that case, you won’t need to add variables to your elements at all, just swap out `var(--i)` for `sibling-index()` in the next code examples.

:::

---

## Adding Content

Now let us talk about adding content to the layers. Each layer needs to contain the original text. There are a few ways to do this. In the next chapter, we will see how to handle this with JavaScript, but if you are looking for a CSS-only dynamic solution, you can add the text as the content of one of the layer’s pseudo elements. This way, you only need to define the text in a single variable, which makes it a great fit for titles, short labels, or anything that might change dynamically.

```css
.layer {
  --text: "Lorem ipsum";
  
  &::before {
    content: var(--text);
  }
}
```

The downside, of course, is that we are creating extra elements, and I personally prefer to save pseudo elements for decorative purposes, like the border effect we saw earlier. We will look at more examples of that in the next chapter.

A better, more straightforward approach is to simply place the text inside each layer. The downside to this method is that if you want to change the text, you will have to update it in every single layer. But since in this case the example is static and I do not plan on changing the text, we will simply use Emmet, putting the text inside curly braces `{}`.

So, we will type `.layers*24[style="--i: $;"]{Lorem ipsum}` and press `Tab` to generate the layers.

```html
<div class="text">
  Lorem ipsum
  <div class="layers" aria-hidden="true">
    <div class="layer" style="--i: 1;">Lorem ipsum</div>
    <div class="layer" style="--i: 2;">Lorem ipsum</div>
    <div class="layer" style="--i: 3;">Lorem ipsum</div>
    <!-- ...More layers -->
  </div>
</div>
```

---

## Let’s Position

Now we can start working on the styling and positioning. The first thing we need to do is make sure all the layers are stacked in the same place. There are a few ways to do this as well , but I think the easiest approach is to use `position: absolute` with `inset: 0` on the `.layers` and on each `.layer`, making sure every layer matches the container’s size exactly. Of course, we’ll set the container to `position: relative` so that all the layers are positioned relative to it.

```css
.text {
  position: relative;

  .layers, .layer {
    position: absolute;
    inset: 0;
  }
}
```

---

## Adding Depth

Now comes the part that trips some people up, adding perspective. To give the text some depth, we’re going to move each layer along the z-axis, and to actually see this effect, we need to add a bit of perspective.

As with everything so far, there are a few ways to do this. You could give perspective to each layer individually using the `perspective()` function, but my recommendation is always to apply perspective at the parent level. Just wrap the element (or elements) you want to bring into the 3D world inside a wrapper div (here I’m using `.scene`) and apply the perspective to that wrapper.

After setting the perspective on the parent, you’ll also need to use `transform-style: preserve-3d;` on each child of the `.scene`. Without this, browsers flatten all transformed children into a single plane, causing any z-axis movement to be ignored and everything to look flat. Setting `preserve-3d;` ensures that each layer’s 3D position is maintained inside the parent’s 3D context, which is crucial for the depth effect to come through.

```css
.scene {
  perspective: 400px;
  
  * {
    transform-style: preserve-3d;
  }
}
```

In this example, I’m using a fairly low value for the [<VPIcon icon="iconfont icon-css-tricks"/>`perspective`](https://css-tricks.com/almanac/properties/p/perspective/), but you should definitely play around with it to suit your own design. This value represents the distance between the viewer and the object, which directly affects how much depth we see in the transformed layers. A smaller value creates a stronger, more exaggerated 3D effect, while a larger value makes the scene appear flatter. This property is what lets us actually see the z-axis movement in action.

---

## Layer Separation

Now we can move the layers along the z-axis, and this is where we start using the index values we defined earlier. Let’s start by defining two custom properties that we’ll use in a moment: `--layers-count`, which holds the number of layers, and `--layer-offset`, which is the spacing between each layer.

```css
.text {
  --layers-count: 24;
  --layer-offset: 1px;
}
```

Now let’s set the `translateZ` value for each layer. We already have the layer’s index and the spacing between layers, so all we need to do is multiply them together inside the [<VPIcon icon="iconfont icon-css-tricks"/>`transform`](https://css-tricks.com/almanac/properties/t/transform/) property.

```css
.layer {  
  transform: translateZ(calc(var(--i) * var(--layer-offset)));
}
```

This feels like a good moment to stop and look at what we have so far. We created the layers, stacked them on top of each other, added some content, and moved them along the z-axis to give them depth. And this is where we’re at:

<CodePen
  link="https://codepen.io/amit_sheen/pen/ZYbWNre/b4c47914c67953f675f571b70c5440eb"
  title="Layered Text (Demo 1)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you really try, and focus hard enough, you might see something that kind of looks like 3D. But let’s be honest, it does not look good. To create a real sense of depth, we need to bring in some color, add a bit of shadow, and maybe rotate things a bit for a more dynamic perspective.

---

## Forging Shadows

Sometimes we might want (or need) to use the value of `--i` as is, like in the last snippet, but for some calculations, it’s often better to **normalize** the value. This means dividing the index by the total number of layers, so we end up with a value that ranges from `0` to `1`. By normalizing, we keep our calculations flexible and proportional, so the effect remains balanced even if the number of layers changes.

```css
.layer {
  --n: calc(var(--i) / var(--layers-count));
}
```

Now we can adjust the color for each layer, or more precisely, the brightness of the color. We’ll use the normalized value on the ‘light’ of a simple HSL function, and add a touch of saturation with a bluish hue.

```css
.layer {
  color: hsl(200 30% calc(var(--n) * 100%));
}
```

Gradually changing the brightness between layers helps create a stronger sense of depth in the text. And without it, you risk losing some of the finer details

<CodePen
  link="https://codepen.io/amit_sheen/pen/wBKGbOK/ef34c856ab93552647749842f1095b6f"
  title="Layered Text (Demo 1-2)"
  :default-tab="['css','result']"
  :theme="dark"/>

Second, remember that we wrapped the original text in a `span` so we could style it? Now is the time to use it. Since this text sits on the bottom layer, we want to give it a darker color than the rest. Black works well here, and in most cases, although in the next chapter we will look at examples where it actually needs to be `transparent`.

```css
span {
  color: black;
  text-shadow: 0 0 0.1em #003;
}
```

---

## Final Touches

Before we wrap this up, let us change the font. This is of course a matter of personal taste or brand guidelines. In my case, I am going with a bold, chunky font that works well for most of the examples. You should feel free to use whatever font fits your style.

Let us also add a slight rotation to the text, maybe on the x-axis, so the lettering appears at a better angle:

```css
.text {
  font-family: Montserrat, sans-serif;
  font-weight: 900;
  transform: rotateX(30deg);
}
```

And there you have it, combining all the elements we’ve covered so far: the layers, indexes, content, perspective, positioning, and lighting. The result is a beautiful, three-dimensional text effect. It may be static for now, but we’ll take care of that soon.

<CodePen
  link="https://codepen.io/amit_sheen/pen/KwpLjrR/50a7e560c572210526af33c95a478351"
  title="Layered Text (Demo 2)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping Up

At this point, we have a solid 3D text effect built entirely with HTML and CSS. We covered everything from structure and indexing to layering, depth, and color. It may still be static, but the foundation is strong and ready for more.

In the next chapters, we are going to turn things up. We will add motion, introduce transitions, and explore creative ways to push this effect further. This is where it really starts to come alive.

::: info 3D Layered Text Article Series

```component VPCard
{
  "title": "3D Layered Text: The Basics",
  "desc": "A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series.",
  "link": "/css-tricks.com/3d-layered-text-the-basics.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Motion and Variations",
  "desc": "In this chapter, we will explore ways to animate the effect, add transitions, and play with different variations. We will look at how motion can enhance depth, and how subtle tweaks can create a whole new vibe.",
  "link": "/css-tricks.com/3d-layered-text-motion-and-variations.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "3D Layered Text: Interactivity and Dynamicism",
  "desc": "In this third and final chapter, we’re stepping into interactivity by adding JavaScript, starting with a simple :hover effect, and ending with a fully responsive bulging text that follows your mouse in real time.",
  "link": "/css-tricks.com/3d-layered-text-interactivity-and-dynamism.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "3D Layered Text: The Basics",
  "desc": "A client asked me to create a bulging text effect. With a bit of cleverness and some advanced CSS, I managed to get a result I’m genuinely proud of, which is covered in this three-part series.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/3d-layered-text-the-basics.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
