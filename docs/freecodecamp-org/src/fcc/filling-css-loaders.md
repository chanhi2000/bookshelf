---
lang: en-US
title: "How to Create Filling CSS Loaders Using One Element"
description: "Article(s) > How to Create Filling CSS Loaders Using One Element"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Filling CSS Loaders Using One Element"
    - property: og:description
      content: "How to Create Filling CSS Loaders Using One Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/filling-css-loaders.html
prev: /programming/css/articles/README.md
date: 2024-10-24
isOriginal: false
author: Temani Afif
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729637821745/50ff0461-350c-441c-9726-b838d3ef0a5c.jpeg
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
  name="How to Create Filling CSS Loaders Using One Element"
  desc="In a previous article, I showed you how to create two types of CSS loaders: a spinner and a progress bar. In this article, you’ll learn about another variation called a filling CSS loader. I think a demo is worth thousands of words, so check out this..."
  url="https://freecodecamp.org/news/filling-css-loaders"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729637821745/50ff0461-350c-441c-9726-b838d3ef0a5c.jpeg"/>

In [a previous article](/freecodecamp.org/how-to-create-a-css-only-loader.md), I showed you how to create two types of CSS loaders: a spinner and a progress bar. In this article, you’ll learn about another variation called a filling CSS loader.

I think a demo is worth thousands of words, so check out this Codepen:

<CodePen
  user="t_afif"
  slug-hash="ExqvRXO"
  title="Filling CSS loaders"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

In the above Pen, I’m showing you four different CSS filler-style loaders - but we can make even more. You can check out [<VPIcon icon="fas fa-globe"/>this collection](https://css-loaders.com/filling/) I created to see more than 20 different loaders.

You might think the article is going to be super long - I mean, how long will it take to explain how to create 20 different CSS loaders?

Well don’t worry - this tutorial will be super quick, because I’ll show a few CSS tricks that help you create as many variation as you want. The loaders look different, but all of them rely on the same techniques. By simply adjusting a few setting you can get a whole new loader.

---

## The Initial Loader Configuration

Like all [<VPIcon icon="fas fa-globe"/>the CSS Loaders](https://css-loaders.com/) I create, the HTML code is a simple as a single element. Nothing more! Here’s what it looks like:

```html
<div class="loader">Loading</div>
```

Then we apply the following CSS:

```css
.loader {
  font-weight: bold;
  text-transform: uppercase;
  color: #0000; /* or transparent */
  -webkit-text-stroke: 1px #000;
}
```

Nothing fancy so far. We make the text transparent and we add a black stroke to it. Here’s what that looks like:

![The "loading" text with a black stroke and transparent color](https://cdn.hashnode.com/res/hashnode/image/upload/v1729506785632/fe01d18e-6d7d-4d49-a5d0-ef6766c51241.png)

The `-webkit-text-stroke` is still tagged as experimental, but it has [<VPIcon icon="fas fa-globe"/>good browser support](https://caniuse.com/mdn-css_properties_-webkit-text-stroke) so you should be able to use it without any issues. This said, it’s always good to test your code in different browsers to make sure everything works fine.

---

## How to Fill the Text with Colors

Now it’s time to fill our text (that’s why this technique is called the Filling CSS loaders!). To do this, we are going to rely on gradients and `background-clip: text`. Here’s the code:

```css
.loader {
  background-image: conic-gradient(#000 0 0);
  background-position: left;
  background-size: 40% 100%;
  background-repeat: no-repeat;
  background-clip: text;
}
```

Or the shorthand version if you prefer more compact code:

```css
.loader {
  background: 
    conic-gradient(#000 0 0) text
    left/40% 100% no-repeat;
}
```

![the difference between with and without `background-clip: text`](https://cdn.hashnode.com/res/hashnode/image/upload/v1729507914013/b8991ffe-0b81-4ae0-a356-c102023c2f6c.png)

The above figure illustrates the difference between using or not using `background-clip: text`. It’s pretty clear that the left result is what we are aiming for. We are limiting the background coloration to only the text instead of the whole element.

The `conic-gradient(#000 0 0)` looks strange, right? It lets you have a one-color gradient. I wrote a small tip about it that I invite you to read to understand why we’re using that particular syntax in this article, “[<VPIcon icon="fas fa-globe"/>How to correctly define a one-color gradient](https://css-tip.com/one-color-gradient/)“.

---

## How to Create the Filling Loaders

Believe it or not, we’re almost done because we have everything we need to make the CSS loaders. For the first loader, we simply animate the `background-size` as follows:

```css
#l1 {
  animation: l1 1s linear infinite;
}
@keyframes l1 {  /*  width  height */
  0% {background-size: 0%   100%}
  to {background-size: 120% 100%}
}
```

We start with a width equal to `0%` until we reach a width equal to `120%`. I could have used `100%`, but I want the full coloration to stay longer so I am using a value bigger than `100%`. As for the height (the second value of the `background-size`), it remains at `100%`.

The second loader uses the same animation, but instead of a linear timing function, we use `steps()` to have a discrete animation.

```css
#l2 {
  font-family: monospace;
  animation: l2 2s steps(8) infinite;
}
@keyframes l2 {
  0% {background-size: 0%           100%}
  to {background-size: calc(800%/7) 100%}
}
```

The text contains 7 characters so we use 8 steps (`N + 1`) and the `background-size` needs to reach `800%/7` (`(N + 1)*100%/N`). I am also using a monospace font to make sure all the characters have the same width.

That’s basically the main trick. By animating the background properties, we create different kinds of loaders. It’s either the `background-size` like the previous ones or the `background-position` like the below:

<CodePen
  user="t_afif"
  slug-hash="bGXogOx"
  title="Filling CSS loaders"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Can you figure out how they work before checking my code? This will be your first homework!

---

## How to Use Multiple Gradients

Using one gradient is enough to create a lot of variations - but we can do even more if we introduce multiple gradients. If you check the fourth loader of the first demo, you’ll see that I’m using seven gradients - one gradient per character.

```css
#l4 {
  font-family: monospace;
  --g: conic-gradient(#000 0 0) no-repeat text;
  background: var(--g) 0,var(--g) 1ch,var(--g) 2ch,var(--g) 3ch,var(--g) 4ch,var(--g) 5ch,var(--g) 6ch;
  background-position-y: bottom;
  animation: l4 3s infinite;
}
@keyframes l4 {
  0%     {background-size: 1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   }
  14.28% {background-size: 1ch 100%,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   }
  28.57% {background-size: 1ch 100%,1ch 100%,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   }
  42.85% {background-size: 1ch 100%,1ch 100%,1ch 100%,1ch 0   ,1ch 0   ,1ch 0   ,1ch 0   }
  57.14% {background-size: 1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 0   ,1ch 0   ,1ch 0   }
  71.43% {background-size: 1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 0   ,1ch 0   }
  85.71% {background-size: 1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 0   }
  100%   {background-size: 1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%,1ch 100%}
}
```

I’m using the same gradient, so we consider a CSS variable `--g` to avoid repetition. Then, I call that variable 7 times inside the background property. All the gradients have the same Y position (`bottom`) but a different X position. That’s why you see the `0, 1ch, 2ch, …,6ch`.

Now if you check the animation, I’m simply animating the height of each gradient individually. At `0%`, all of them have a height equal to `0`. Then I update their height one by one until all of them are at `100%`. The width doesn’t change - it’s always equal to `1ch` (the width of one character).

It may look difficult at first glance, but if you think about it one gradient at a time, it’s pretty simple.

What about the third loader, you might ask? For that one, I will rely on [<VPIcon icon="fas fa-globe"/>my online generator for wavy shapes](https://css-generators.com/wavy-shapes/) to generate the gradient configuration:

![Screenshot of the wavy shape generator](https://cdn.hashnode.com/res/hashnode/image/upload/v1729635835522/2f8726a3-e6bb-4949-8846-8408dad56a64.png)

Then I animate the `background-position` like below:

```css
#l3 {
  background:
    radial-gradient(1.13em at 50% 1.6em,#000 99%,#0000 101%) calc(50% - 1.6em) 0/3.2em 100%,
    radial-gradient(1.13em at 50% -0.8em,#0000 99%,#000 101%) 50% .8em/3.2em 100% repeat-x;
  background-clip: text;
  animation: l3 2s linear infinite;
}
@keyframes l3 {
  0% {background-position: calc(50% - 1.6em) 0,     50%          .8em}
  to {background-position: calc(50% + 1.6em) 0,calc(50% + 3.2em) .8em}
}
```

This one is probably a bit trickier, but it’s another example to illustrate all the possibilities. From the simple gradient configuration to the most complex one, we can create as many loaders as we want.

What about creating your own CSS loader? You can use what you have learned from the article and try to create a loader that is not part of [<VPIcon icon="fas fa-globe"/>my collection](https://css-loaders.com/filling/). The best way to learn is to practice - so give it a try!

---

## Conclusion

By creating some cool loaders, we went through a bunch of CSS tricks related to gradients and backgrounds. Even if creating loaders is not your goal, you can always re-use the same tricks to do something else.

Don’t forget to check my [<VPIcon icon="fas fa-globe"/>CSS Tip blog](https://css-tip.com/) where I am sharing cool CSS tricks and demos.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Filling CSS Loaders Using One Element",
  "desc": "In a previous article, I showed you how to create two types of CSS loaders: a spinner and a progress bar. In this article, you’ll learn about another variation called a filling CSS loader. I think a demo is worth thousands of words, so check out this...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/filling-css-loaders.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
