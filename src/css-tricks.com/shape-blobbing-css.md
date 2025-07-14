---
lang: en-US
title: "Shape Blobbing in CSS"
description: "Article(s) > Shape Blobbing in CSS"
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
      content: "Article(s) > Shape Blobbing in CSS"
    - property: og:description
      content: "Shape Blobbing in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/shape-blobbing-css.html
prev: /programming/css/articles/README.md
date: 2014-10-28
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/mercury.gif
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
  name="Shape Blobbing in CSS"
  desc="We just covered shape morphing in SVG, where shapes change from one to another. Let's look at shapes that blob into each other! You know, that gooey squishy"
  url="https://css-tricks.com/shape-blobbing-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/mercury.gif"/>

We [**just covered**](/css-tricks.com/svg-shape-morphing-works.md) shape *morphing* in SVG, where shapes change from one to another. Let’s look at shapes that blob into each other! You know, that gooey squishy blobby effect like [<FontIcon icon="fa-brands fa-youtube"/>droplets of mercury on a surface](https://youtu.be/31CE2BYicyU#t=45).

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/mercury.gif)

I’m not sure who first discovered this was possible on the web, but the first place I ever saw it was a demo by Lucas Bebber:

<CodePen
  user="lbebber"
  slug-hash="QWrLBE"
  title="Gooey Pagination"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And then again by [Felix Hornoiu (<FontIcon icon="fa-brands fa-codepen"/>`felixhornoiu`)](http://codepen.io/felixhornoiu/pen/EjDwF/) (low framerate GIF for web practicality):

![Demo from [here (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/lIBAg?editors=110).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/bubbles.gif)

---

## The trick is fairly simple, use filter to BOTH add blur and contrast to an element

The blur obvious makes the element blurry, the contrast fights against the blur, preferring stark changes in color. If you contrast enough, you’re left with a (fairly) sharp looking shape again.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/blur-vs-contrast.png)

The fancy parts comes from the fact that when two blurred (yet forced to look non-blurry) elements come near each other, their would-be blurs create enough would-be color contrast that the shapes actually appear to connect.

![Demo from [here (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/lIBAg?editors=110).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/blur-shape.png)

I find it easier to get working if you blur the shapes but add contrast to the whole area. Like:

```css
.stage {
  /* must be explicit, for contrast to work */
  background: white;
  
  /* weirdness happens when edges hit, also consider hiding overflow */
  padding: 30px;
  
  -webkit-filter: contrast(20);
  filter: contrast(20);
}
.dot {
  border-radius: 50%;
  width: 50px;
  height: 50px;

  /* needs to be very contrasty color. E.g. light gray on white won't work */
  background: black;

  -webkit-filter: blur(15px);
  filter: blur(15px);
}
```

And then the fun happens when you add animation to blob those suckers all around. Here’s a demo where you can play with the values, including brightness which affects the blur:

<CodePen
  user="chriscoyier"
  slug-hash="qBzdmm"
  title="Blobbing Playground"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Browser Support

Not just WebKit/Blink anymore! Firefox 35 will be supporting filters without any flag or anything. Aurora, their beta-beta, is in v35 right now and I popped it open in that and it works great.

So… current Chrome / Safari / Opera / Firefox / iOS / Android. Not bad. Just no IE.

---

## Predictions of Exclaimed Things

*It’s not practical!!!* Go to bed.

*It makes my fan spin like crazy!!!* Yeah my demo with tons of elements interacting makes my CPU pretty busy as well. The more chill demos with just two circles bumping into each other are fine though. Use decision making skills.

*There are better ways to do this!!!* Awesome.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Shape Blobbing in CSS",
  "desc": "We just covered shape morphing in SVG, where shapes change from one to another. Let's look at shapes that blob into each other! You know, that gooey squishy",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/shape-blobbing-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
