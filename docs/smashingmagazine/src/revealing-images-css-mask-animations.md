---
lang: en-US
title: "Revealing Images With CSS Mask Animations"
description: "Article(s) > Revealing Images With CSS Mask Animations"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Revealing Images With CSS Mask Animations"
    - property: og:description
      content: "Revealing Images With CSS Mask Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/revealing-images-css-mask-animations.html
prev: /programming/css/articles/README.md
date: 2023-09-15
isOriginal: false
author:
  - name: Temani Afif
    url: https://smashingmagazine.com/author/temani-afif/
cover: https://files.smashing.media/articles/revealing-images-css-mask-animations/revealing-images-css-mask-animations.jpg
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
  name="Revealing Images With CSS Mask Animations"
  desc="Let’s play with images and experiment with CSS masks. The idea is fairly simple: take a single `` tag and harness the power of CSS to accomplish complex hover transitions. Through different demos, you will see how CSS masks combined with gradients allow us to create fancy effects — with efficient, reusable code."
  url="https://smashingmagazine.com/2023/09/revealing-images-css-mask-animations/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/revealing-images-css-mask-animations/revealing-images-css-mask-animations.jpg"/>

Let’s play with images and experiment with CSS masks. The idea is fairly simple: take a single `<img>` tag and harness the power of CSS to accomplish complex hover transitions. Through different demos, you will see how CSS masks combined with gradients allow us to create fancy effects — with efficient, reusable code.

[**In a previous article**](/smashingmagazine.com/shines-perspective-rotations-css-3d-effects-images.md), we explored fancy hover effects for images that involve shines, rotations, and 3D perspectives. We are going to continue playing with images, but this time, we are making animations that reveal images on hover. Specifically, we will learn about CSS masks and how they can be used to cover portions of an image that are revealed when the cursor hovers over the image.

Here is the HTML we will use for our work:

```html
<img src="" alt="">
```

Yes, that’s right, only one image tag. The challenge I like to take on with each new CSS project is: **Let CSS do all of the work without extra markup.**

As we go, you may notice minor differences between the code I share in the article and what is used inside the demos. The code throughout the article reflects the CSS specification. But since browser support is inconsistent with some of the features we’re using, I include prefixed properties for broader support.

---

## Example 1: Circle Reveal

In this first one, an image sits in a square container that is wiped away on hover to reveal the image.

<CodePen
  user="smashingmag"
  slug-hash="abQGGew"
  title="Hover reveal animation using mask"
  :default-tab="['css','result']"
  :theme="dark"/>

The first step for us is to create the image container and the gradient border around it. The container is actually a repeating linear gradient `background` set on the `<img>` tag. If we add a little amount of padding on the image, that allows the gradient background to show through.

```css
img {
  padding: 10px;
  background: repeating-linear-gradient(45deg, #FF6B6B 0 10px, #4ECDC4 0 20px);
}
```

![Two square images with striped gradient borders. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/revealing-images-css-mask-animations/1-square-images-sstriped-gradient-borders.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/revealing-images-css-mask-animations/1-square-images-sstriped-gradient-borders.png)

So, we have two images, each with a gradient background that is revealed with a touch of padding. We could have added a `<div>` — or perhaps even a `<figure>` — to the markup to create a true container, but that goes against the challenge of letting CSS do all of the work.

While we were able to work around the need for extra markup, we now have to ask ourselves: *How do we hide the image without affecting the gradient background?* What we need is to hide the image but continue to show the padded area around it. **Enter CSS masks.**

It’s not terribly complicated to apply a mask to an element, but it’s a little trickier in this context. The “trick” is to chain two mask layers together and be more explicit about where the masks are applied:

```css
img {
  /* etc. */
  mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0) content-box;
}
```

Now we have two masks “sources”:

1. `content-box`: one that is restricted to the image’s content,
2. `padding-box`: one that covers the whole image area, including the padded area.

We need two layers because then we can combine them with the CSS `mask-composite` property. We have different ways to combine mask layers with `mask-composite`, one of which is to [<VPIcon icon="fa-brands fa-firefox"/>“exclude” the area where the two masks overlap each other](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite).

```css
img {
  /* etc. */
  mask:
    linear-gradient(#000 0 0) padding-box,
    linear-gradient(#000 0 0) content-box;
  mask-composite: exclude;
}
```

This will make only the gradient visible (the padded area), as you can see below.

<CodePen
  user="smashingmag"
  slug-hash="wvQOJrZ"
  title="Overview of the exclude composition"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that we can remove the `padding-box` from the code since, by default, a gradient covers the whole area, and this is what we need.

Are there other ways we could do this without `mask-composite`? There are many ways to hide the content box while showing only the padded area. Here is one approach using a `conic-gradient` as the mask:

```css
mask:
  conic-gradient(from 90deg at 10px 10px, #0000 25%, #000 0)
  0 0 / calc(100% - 10px) calc(100% - 10px);
  /* 10px is the value of padding */
```

<CodePen
  user="smashingmag"
  slug-hash="vYQPxWr"
  title="Border-only using conic-gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

There are others, of course, but I think you get the idea. The approach you choose is totally up to you. I personally think that using `mask-composite` is best since it doesn’t require us to know the padding value in advance or change it in more than one place. Plus, it’s a good chance to practice using `mask-composite`.

Now, let’s replace the second gradient (the one covering only the content area) with a `radial-gradient`. We want a circle swipe for the hover transition, after all.

```css
img {
  mask:
    linear-gradient(#000 0 0),
    radial-gradient(#000 70%,#0000 71%) content-box;
  mask-composite: exclude;
}
```

<CodePen
  user="smashingmag"
  slug-hash="wvQOJmb"
  title="Adding the radial-gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

See that? The `exclude` mask composite creates a hole in the image. Let’s play with the size and position of that cutout and see what is happening. Specifically, I’m going to cut the size in half and position the circle in the center of the image:

```css
mask:
  linear-gradient(#000 0 0),
  radial-gradient(#000 70%,#0000 71%) content-box
    center / 50% 50% no-repeat;
  mask-composite: exclude;
```

<CodePen
  user="smashingmag"
  slug-hash="YzRgZvj"
  title="Updating the radial-gradient size and position"
  :default-tab="['css','result']"
  :theme="dark"/>

I bet you can already see where this is going. We adjust the size of the `radial-gradient` to either hide the image (increase) or reveal the image (decrease). To fully hide the image, we need to scale the mask up to such an extent that the circle covers up the image. That means we need something *greater* than `100%`. I did some boring math and found that `141%` is the precise amount, but you could wing it with a round number if you’d like.

That gives us our final CSS for the effect:

```css
img {
  padding: 10px; /* control the thickness of the gradient "border" */
  background: repeating-linear-gradient(45deg, #FF6B6B 0 10px, #4ECDC4 0 20px);
  mask:
    linear-gradient(#000 0 0),
    radial-gradient(#000 70%, #0000 71%) content-box
      50% / var(--_s, 150% 150%) no-repeat;
  mask-composite: exclude;
  transition: .5s;
}
img:hover {
  --_s: 0% 0%;
}
```

A few minor details:

- We start with a size equal to `150% 150%` to initially hide the image. I am taking the additional step of applying the size as a CSS variable (`--_s`) with the full size (`150% 150%`) as a fallback value. This way, all we need to do is update the variable on hover.
- Add a hover state that decreases the size to zero so that the image is fully revealed.
- Apply a slight transition of `.5s` to smooth out the hover effect.

Here’s the final demo one more time:

<CodePen
  user="smashingmag"
  slug-hash="abQGGew"
  title="Hover reveal animation using mask"
  :default-tab="['css','result']"
  :theme="dark"/>

We just created a nice reveal animation with only a few lines of CSS — and no additional markup! We didn’t even need to resort to pseudo-elements. And this is merely one way to configure things. For example, we could play with the mask’s position to create a slick variation of the effect:

<CodePen
  user="smashingmag"
  slug-hash="dyQrvEq"
  title="Another variation of the circular reveal animation"
  :default-tab="['css','result']"
  :theme="dark"/>

I’m a big fan of putting an idea out there and pushing it forward with more experiments. Fork the demo and let me know what interesting things you can make out of it!

---

## Example 2: Diagonal Reveal

Let’s increase the difficulty and try to create a hover effect that needs three gradients instead of two.

<CodePen
  user="smashingmag"
  slug-hash="qBQKMKa"
  title="Hover reveal animation using mask II"
  :default-tab="['css','result']"
  :theme="dark"/>

Don’t look at the code just yet. Let’s try to create it step-by-step, starting with a simpler effect that follows the same pattern we created in the first example. The difference is that we’re swapping the `radial-gradient` with a `linear-gradient`:

```css
img {
  padding: 10px; /* control the thickness of the gradient "border" */
  background: repeating-linear-gradient(45deg, #FF6B6B 0 10px, #4ECDC4 0 20px);
  mask:
    linear-gradient(#000 0 0),
    linear-gradient(135deg, #000 50%, #0000 0) content-box 
      0% 0% / 200% 200% no-repeat;
  mask-composite: exclude;
  transition: .5s;
}
img:hover {
  mask-position: 100% 100%;
    }
```

You’ll notice that the other minor difference between this CSS and the first example is that the size of the mask is equal to `200% 200%`. Also, this time, the mask’s position is updated on hover instead of its size, going from `0% 0%` (top-left) to `100% 100%` (bottom-right) to create a swiping effect.

<CodePen
  user="smashingmag"
  slug-hash="OJaqmWV"
  title="Diagonal reveal animation using mask"
  :default-tab="['css','result']"
  :theme="dark"/>

We can change the swipe direction merely by reversing the linear gradient angle from `135deg` to `-45deg`, then updating the position to `0% 0%` on hover instead of `100% 100%`:

```css
img {
  padding: 10px; /* control the thickness of the gradient "border" */
  background: repeating-linear-gradient(45deg, #FF6B6B 0 10px, #4ECDC4 0 20px);
  mask:
    linear-gradient(#000 0 0),
    linear-gradient(-45deg, #000 50%, #0000 0) content-box 
      100% 100% / 200% 200% no-repeat;
  mask-composite: exclude;
  transition: .5s;
}
img:hover {
  mask-position: 0% 0%;
}
```

<CodePen
  user="smashingmag"
  slug-hash="ZEmPaYM"
  title="Diagonal reveal animation using mask"
  :default-tab="['css','result']"
  :theme="dark"/>

One more thing: I defined only *one* `mask-position` value on hover, but we have *two* gradients. If you’re wondering how that works, the mask’s position applies to the first gradient, but since a gradient occupies the full area it is applied to, it cannot be moved with percentage values. That means we can safely define only one value for both gradients, and it will affect only the second gradient. I explain this idea much more thoroughly in [<VPIcon icon="fa-brands fa-stack-overflow"/>this Stack Overflow answer](https://stackoverflow.com/a/51734530/8620333). The answer discusses `background-position`, but the same logic applies to `mask-position`.

Next, I’d like to try to combine the last two effects we created. Check the demo below to understand how I want the combination to work:

<CodePen
  user="smashingmag"
  slug-hash="OJaqOym"
  title="Combination of two diagonal reveal"
  :default-tab="['css','result']"
  :theme="dark"/>

This time, both gradients start at the center (`50% 50%`). The first gradient hides the top-left part of the image, while the second gradient hides the bottom-right part of it. On hover, both gradients slide in the opposite direction to reveal the full image.

If you’re like me, you’re probably thinking: *Add all the gradients together, and we’re done.* Yes, that is the most intuitive solution, and it would look like this:

```css
img {
  padding: 10px; /* control the thickness of the gradient "border" */
  background: repeating-linear-gradient(45deg, #FF6B6B 0 10px, #4ECDC4 0 20px);
  mask:
    linear-gradient(#000 0 0),
    linear-gradient(135deg, #000 50%, #0000 0) content-box 
      50% 50% / 200% 200% no-repeat,
    linear-gradient(-45deg, #000 50%, #0000 0) content-box 
      50% 50 / 200% 200% no-repeat;
  mask-composite: exclude;
  transition: .5s;
  cursor: pointer;
}
img:hover {
  mask-position: 0% 0%, 100% 100%;
}
```

<CodePen
  user="smashingmag"
  slug-hash="qBQvVPd"
  title="Combining both effects"
  :default-tab="['css','result']"
  :theme="dark"/>

This approach *kind of* works, but we have a small visual glitch. Notice how a strange diagonal line is visible due to the nature of gradients and issues with anti-aliasing. We can try to fix this by increasing the percentage slightly to `50.5%` instead of `50%`:

<CodePen
  user="smashingmag"
  slug-hash="ZEmPaXP"
  title="Trying to fix the anti-aliasing issue"
  :default-tab="['css','result']"
  :theme="dark"/>

Yikes, that makes it even worse. You are probably wondering if I should decrease the percentage instead of increasing it. Try it, and the same thing happens.

The fix is to update the `mask-composite` property. If you recall, we are already using the `exclude` value. Instead of declaring `exclude` alone, we need to also apply the `add` value to make sure the bottom layers (the swiping gradients) aren’t excluded from each other but are instead added together:

```css
img {
  mask:
    /* 1st layer */
    linear-gradient(#000 0 0),

    /* 2nd layer */
    linear-gradient(135deg, #000 50.5%, #0000 0) content-box 
      50% 50% / 200% 200% no-repeat,

    /* 3rd layer */
    linear-gradient(-45deg, #000 50.5%, #0000 0) content-box 
      50% 50% / 200% 200% no-repeat;

  mask-composite: exclude, add;
}
```

Now, the second and third layers will use the `add` composition to create an intermediate layer that will be excluded from the first one. In other words, we must exclude all the layers from the first one.

I know `mask-composite` is a convoluted concept. I highly recommend you read Ana Tudor’s [**crash course on mask composition**](/css-tricks.com/mask-compositing-the-crash-course.md) for a deeper and more thorough explanation of how the `mask-composite` property works with multiple layers.

This fixes the line issue in our hover effect:

<CodePen
  user="smashingmag"
  slug-hash="zYMbPLY"
  title="Diagonal reveal animation using mask"
  :default-tab="['css','result']"
  :theme="dark"/>

One more small detail you may have spotted: we have defined *three* gradients in the code but only *two* `mask-position` values on the hover state:

```css
img:hover {
  mask-position: 0% 0%, 100% 100%;
}
```

The first value (`0% 0%`) is applied to the first gradient layer; it won’t move as it did before. The second value (`100% 100%`) is applied to the second gradient layer. Meanwhile, the third gradient layer uses the first value! When fewer values are declared on `mask-position` than the number of mask layers, the series of comma-separated values repeats until all of the mask layers are accounted for.

In this case, the series repeats circles back to the first value (`0% 0%`) to ensure the third mask layer takes a value. So, really, the code above is a more succinct equivalent to writing this:

```css
img:hover {
  mask-position: 0% 0%, 100% 100%, 0% 0%;
}
```

Here is the final demo again with both variations. You will see that the second example uses the same code with minor updates.

<CodePen
  user="smashingmag"
  slug-hash="qBQKMKa"
  title="Hover reveal animation using mask II"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Example 3: Zig-Zag Reveal

I have one more example for you, this time revealing the image with zig-zag edges sliding apart, sort of like teeth chomping on the image.

<CodePen
  user="smashingmag"
  slug-hash="vYQaLaZ"
  title="Hover reveal animation using mask III"
  :default-tab="['css','result']"
  :theme="dark"/>

While this may look like a more complex hover effect than the last two we covered, it still uses the same underlying CSS pattern we’ve used all along. In fact, I’m not even going to dive into the code as I want you to reverse-engineer it using what you now know about using CSS gradients as masks and combining mask layers with `mask-composite`.

I won’t give you the answer, but I will share an article I wrote that [**demonstrates how I created the zig-zag shape**](/css-tricks.com/css-borders-using-masks.md). And since I’m feeling generous, I’ll link up [<VPIcon icon="fas fa-globe"/>this online border generator](https://css-generators.com/custom-borders/) as another resource.

---

## Wrapping Up

I hope you enjoyed this little experiment with CSS masks and gradients! Gradients can be confusing, but mixing them with masks is nothing short of complicated. But after spending the time it takes to look at three examples in pieces, we can clearly see how gradients can be used as masks as well as how we can combine them to “draw” visible areas.

Once we have an idea of how that works, it’s amazing that all we need to do to get the effect is update either the mask’s position or size on the element’s hover state. And the fact that we can accomplish all of this with a single HTML element shows just how powerful CSS is.

We saw how the same general CSS pattern can be tweaked to generate countless variations of the same effect. I thought I’d end this article with a few more examples for you to play with.

<CodePen
  user="smashingmag"
  slug-hash="PoxLMOy"
  title="Hover reveal animation using mask IV"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="smashingmag"
  slug-hash="jOQJgxN"
  title="Hover reveal animation using mask V"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="smashingmag"
  slug-hash="gOQEVdQ"
  title="Hover reveal animation using mask VI"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Further Reading on Smashing Magazine

- “[**CSS And Accessibility: Inclusion Through User Choice**](/smashingmagazine.com/css-accessibility-inclusion-user-choice.md),” Carie Fisher

```component VPCard
{
  "title": "Gradients, Blend Modes, And A Really Cool Hover Effect",
  "desc": "Gradients are a powerful CSS feature. We use them for texture, depth, and even to hide parts of elements with CSS masking. This article covers another interesting way to use gradients — as a hover effect that affects the appearance of other elements around the hovered element.",
  "link": "/smashingmagazine.com/gradients-blend-modes-hover-effect.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- “[**A Few Interesting Ways To Use CSS Shadows For More Than Depth**](/smashingmagazine.com/interesting-ways-use-css-shadows.md),” Preethi Sam
- “[**Falling For Oklch: A Love Story Of Color Spaces, Gamuts, And CSS**](/smashingmagazine.com/oklch-color-spaces-gamuts-css.md),” Geoff Graham

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Revealing Images With CSS Mask Animations",
  "desc": "Let’s play with images and experiment with CSS masks. The idea is fairly simple: take a single `` tag and harness the power of CSS to accomplish complex hover transitions. Through different demos, you will see how CSS masks combined with gradients allow us to create fancy effects — with efficient, reusable code.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/revealing-images-css-mask-animations.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
