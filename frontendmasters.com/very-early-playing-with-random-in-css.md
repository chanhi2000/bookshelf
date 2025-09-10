---
lang: en-US
title: "Very Early Playing with random() in CSS"
description: "Article(s) > Very Early Playing with random() in CSS"
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
      content: "Article(s) > Very Early Playing with random() in CSS"
    - property: og:description
      content: "Very Early Playing with random() in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/very-early-playing-with-random-in-css.html
prev: /programming/css/articles/README.md
date: 2025-08-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6931
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
  name="Very Early Playing with random() in CSS"
  desc="(Only Safari Technical Preview!) Awfully cool `random()` is coming in CSS. The design possibilities are quite cool. "
  url="https://frontendmasters.com/blog/very-early-playing-with-random-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6931"/>

[WebKit/Safari has rolled out a preview version of `random()` in CSS.](https://webkit.org/blog/17285/rolling-the-dice-with-css-random/)

> Random functions in programming languages are amazing. You can use them to generate variations, to make things feel spontaneous and fresh. Until now there was no way to create a random number in CSS. Now, the `random()` function is on its way.

Upon first play, it’s great!

::: note

This is *only* in [<VPIcon icon="fa-brands fa-safari"/>Safari Technical Preview](https://developer.apple.com/safari/technology-preview/) right now. I’ll post videos below so you can see it, and link to live demos.

:::

CSS processors like Sass have been able to do this for ages, but it’s not nearly as nice in that context.

1. The `random()` numbers in Sass are only calculated at compile time. So they are only random at the time. Refreshing the page doesn’t mean newly random values.
2. Random numbers are usually paired with a loop. So if you want 1,000 randomly placed elements, you need 1,000 `:nth-child()` selectors with a randomly generated value in each, meaning bulky CSS.

With `random()` in vanilla CSS, no such loops are needed and making the code quite simple and satisfying.

I found a 12-year-old Sass demo of mine playing with `random()` that is like this:

![[This (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/nKZdBo?editors=0110) compiled to over 200 lines of CSS.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-25-at-2.28.37-PM.png?resize=1024%2C337&ssl=1)

But now it’s just like this:

![[Demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/0198d397-5bca-72e8-8249-adeea4529e14/1a093e1a90d947db85ef4fce6fa300da)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-25-at-2.29.19-PM.png?resize=1024%2C411&ssl=1)

Much of the magic, to me, is how each matching element gets its own random values. So if you had three things like this:

```html
<div class="thing"></div>
<div class="thing"></div>
<div class="thing"></div>
```

Then this simple CSS could make them all quite different:

```css
.thing {
  position: absolute;
  background: red;
  width: 100px;
  height: 100px;
  
  top: random(10px, 200px);
  left: random(100px, 400px);
  
  background: rgb(
    random(0, 255),
    random(0, 255),
    random(0, 255)
  )
}
```

<VidStack src="https://videopress.com/64518d4d-8498-470d-bcfa-33f988eb04b5" />

<CodePen
  user="chriscoyier"
  slug-hash="ZYbjYLB"
  title="Very basic random() in CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The blog post doesn’t mention “unitless” numbers like I’ve used above for the color, but they work fine. If you’re using units, they need to be the same across all parameters.

The “starfield” demo in the blog post is pretty darn compelling!

<VidStack src="https://videopress.com/c4495091-99bb-42b8-8379-f68d7757239f" />

I found another old demo where I used a bit of randomized `animation-delay` where in the SCSS syntax I did it like this:

```css
animation-delay: (random(10) / 40) + s;
```

Notice I had to append the “s” character at the end to get units there. Now in vanilla CSS you just declare the range with the units on it, like:

```css
animation-delay: calc(random(0s, 10s) / 40);
```

And it [works great (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/0198d39f-bc0f-7857-a4e0-3f6f0ae70a15)!

<VidStack src="https://videopress.com/13617e67-9636-4bab-9b9d-e50779d4c3b6" />

---

The feature [<VPIcon icon="iconfont icon-w3c"/>does have a spec](https://w3.org/TR/css-values-5/#randomness), and I’m pleased that it has covered many things that I hadn’t considered before but are clearly good ideas. The blog post covers this nicely, but allow me to re-iterate:

```css
.random-rect {
  width: random(100px, 200px);
  height: random(100px, 200px);
}
```

Both the `width` and `height` will be *different* random values. But if you want them to be the *same* random value, you can set a custom ident value that will “cache” that value for *one* element:

```css
.random-square {
  width: random(--foo, 100px, 200px);
  height: random(--foo, 100px, 200px);
}
```

Nice!

But if you had 20 of these elements, how could you make sure *all* had the same random values? Well there is a special keyword for that, ensuring all matched elements share the same random values:

```css
.shared-random-rect {
  width: random(element-shared, 100px, 200px);
  height: random(element-shared, 100px, 200px);
}
```

But in that case, all matched elements would share the same random values, but the `width` and `height` wouldn’t be equal. So you’d do both to make sure it’s *all* equal:

```css
.shared-random-squares {
  width: random(--foo element-shared, 100px, 200px);
  height: random(--foo element-shared, 100px, 200px);
}
```

That’s all very nicely considered, I think.

---

Ranges are also handled with a final parameter:

```css
top: random(10px, 100px, 20px);
transition-delay: random(0s, 5s, 1s);
```

The `top` value above can only be: 10px, 30px, 50px, 70px, or 90px.

The `transition-delay` value above can only be: 0s, 1s, 2s, 3s, 4s, or 5s.

Otherwise you can get decimal values of either which might be more random than you want. Even `1px` for random pixel values as an increment seems to be suggested.

::: note

Note the WebKit blog has a code sample with `by 20deg` in it, which I *think* is a typo as that doesn’t work for me.

:::

---

I didn’t have a chance to try it yet — but doesn’t it make you wanna force a re-render and see if it will work with `document.startViewTransition`??

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Very Early Playing with random() in CSS",
  "desc": "(Only Safari Technical Preview!) Awfully cool `random()` is coming in CSS. The design possibilities are quite cool. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/very-early-playing-with-random-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
