---
lang: en-US
title: "CSS Variables tutorial: How to make your HTML responsive with CSS Variables"
description: "Article(s) > CSS Variables tutorial: How to make your HTML responsive with CSS Variables"
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
      content: "Article(s) > CSS Variables tutorial: How to make your HTML responsive with CSS Variables"
    - property: og:description
      content: "CSS Variables tutorial: How to make your HTML responsive with CSS Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-responsiveness-super-simple-with-css-variables.html
prev: /programming/css/articles/README.md
date: 2018-02-27
isOriginal: false
author:
  - name: Per Harald Borgen
    url: https://github.com/perborgen
cover: https://cdn-media-1.freecodecamp.org/images/1*tLQrkgJJhKV3YrzPxsVVFA.png
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
  name="CSS Variables tutorial: How to make your HTML responsive with CSS Variables"
  desc="By Per Harald Borgen _Learn how to create the following responsiveness with CSS Variables._ A quick tutorial on how to create responsive websites in 2019. If you haven’t heard of CSS Variables before, it’s a new feature of CSS which gives you the po..."
  url="https://freecodecamp.org/news/how-to-make-responsiveness-super-simple-with-css-variables-8c90ebf80d7f"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*tLQrkgJJhKV3YrzPxsVVFA.png"/>

![Learn how to create the following responsiveness with CSS Variables.](https://cdn-media-1.freecodecamp.org/images/IuMWwaRBH-1VTyCpRImIsyYwp36b1lR6ObIM)

::: note A quick tutorial on how to create responsive websites in 2019.

If you haven’t heard of CSS Variables before, it’s a new feature of CSS which gives you the power of variables in your stylesheet, without having to do any setup.

:::

In essence, CSS Variables allow you to skip the old way of setting styles:

```css
h1 {  
  font-size: 30px;  
}

navbar > a {  
  font-size: 30px;  
}

…in favour of this:

:root {  
  --base-font-size: 30px;  
}

h1 {  
  font-size: var(--base-font-size);  
}

navbar > a {  
  font-size: var(--base-font-size);  
}
```

While the syntax might seem a bit weird, this gives you the obvious benefit of being able to change the font sizes across your entire app through only changing the`--base-font-size` variable.

If you want to learn CSS Variables properly, please check out [<VPIcon icon="fas fa-globe"/>my free and interactive CSS Variables course](https://scrimba.com/g/gcssvariables) on Scrimba:

![The course contains eight interactive screencasts](https://cdn-media-1.freecodecamp.org/images/1*MxS9trU9nmVDttW_IqQTyA.png)

Or if you want to know more about the course, you can also read a walk-through of what you’ll learn in the article below:

[Want to learn CSS Variables? Here’s my free 8-part course!](https://medium.freecodecamp.org/want-to-learn-css-variables-heres-my-free-8-part-course-f2ff452e5140)

Now let’s see how this new technology can make your life easier when building responsive websites.

---

## The setup

We’re going to add responsiveness to a portfolio website which looks like this:

![](https://cdn-media-1.freecodecamp.org/images/1*tLQrkgJJhKV3YrzPxsVVFA.png)

It looks nice when viewed on your desktop. However, as you can see on the left image below, this layout doesn’t work well on mobile.

![How it looks on mobile initially.](https://cdn-media-1.freecodecamp.org/images/1*CZkMgq0rp9nTdChVxwq33g.png)

![How we want it to look.](https://cdn-media-1.freecodecamp.org/images/1*zpFS--eNMyAzkdZWS1lLRQ.png)

On the right image, we’ve changed a few things on the styles to make it work better on mobile. Here’s what we have done:

1. **Rearranged** the grid so that it’s stacked vertically instead of across two columns.
2. **Moved** the entire layout a bit more up
3. **Scaled** the fonts down

In order to do this, we needed to change the following CSS:

```css
h1 {  
  font-size: 30px;  
}

#navbar {  
  margin: 30px 0;  
}

#navbar a {  
  font-size: 30px;  
}

.grid {  
  margin: 30px 0;  
  grid-template-columns: 200px 200px;  
}
```

More specifically, we needed to make the following adjustments inside of a media query:

- Reduce font size of the `h1` to 20px
- Reduce the margin above and below the `#navbar` to 15px
- Reduce the font size inside the `#navbar` to 20px
- Reduce the margin above the `.grid` to 15px
- Change the `.grid` from from two-columns to one-column

::: note

There is, of course, much more CSS in this application, even within these selectors. However, for the sake of this tutorial, I’ve stripped away everything which we aren’t changing in the media query. Check out [<VPIcon icon="fas fa-globe"/>this Scrimba playground](https://scrimba.com/c/cwJmLhn) to get the entire code.

:::

---

## The old way

Doing all of this would be possible without CSS Variables. But it would require an unnecessary amount of code, as most of the bullet points above would need their own selector inside the media query, like this:

```css
@media all and (max-width: 450px) {  

  navbar {  
    margin: 15px 0;  
  }  

  navbar a {  
    font-size: 20px;  
  }  

  h1 {  
    font-size: 20px;  
  }

  .grid {  
    margin: 15px 0;  
    grid-template-columns: 200px;  
  }

}
```

---

## The new way

Now let’s see how this can be solved with CSS Variables. To begin with, we’ll rather store the values which we are reusing or changing inside variables:

```css
:root {  
  --base-font-size: 30px;  
  --columns: 200px 200px;  
  --base-margin: 30px;  
}

And then we’ll simply use these variables across the app:

#navbar {  
  margin: var(--base-margin) 0;  
}

#navbar a {  
  font-size: var(--base-font-size);  
}

h1 {  
  font-size: var(--base-font-size);  
}

.grid {  
  margin: var(--base-margin) 0;  
  grid-template-columns: var(--columns);  
}
```

Once we have this setup, we can simply change the values of the variables inside the media query:

```css
@media all and (max-width: 450px) {  
  :root {  
    --columns: 200px;  
    --base-margin: 15px;  
    --base-font-size: 20px;  
}
```

This is much cleaner than what we had before. We’re only targeting the `:root`, as opposed to specifying all the selectors.

We’ve reduced our media query from **four selectors down to one** and from **thirteen lines down to four**.

And this is just a simple example. Imagine a full-blown website where, for example, the `--base-margin` control most of the free spacing around the app. It’s a lot easier to just flip the value of it, as opposed to filling your media query up with complex selectors.

To sum up, CSS Variables are definitely the future of responsiveness. If you want to learn this technology once and for all, I’d recommend that you check out my [<VPIcon icon="fas fa-globe"/>free course on the subject on Scrimba.](https://scrimba.com/g/gcssvariables)

You’ll become a CSS Variables master in no time

::: info

Thanks for reading! I’m Per Borgen, front-end developer and co-founder of [<VPIcon icon="fas fa-globe"/>Scrimba](http://scrimba.com). Feel free to reach out to [me via Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`perborgen`)](https://twitter.com/perborgen) if you have any questions or comments.

Thanks for reading! My name is Per Borgen, I'm the co-founder of [<VPIcon icon="fas fa-globe"/>Scrimba](https://scrimba.com) – the easiest way to learn to code. You should check out our [<VPIcon icon="fas fa-globe"/>responsive web design bootcamp](https://scrimba.com/g/gresponsive) if want to learn to build modern website on a professional level.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Variables tutorial: How to make your HTML responsive with CSS Variables",
  "desc": "By Per Harald Borgen _Learn how to create the following responsiveness with CSS Variables._ A quick tutorial on how to create responsive websites in 2019. If you haven’t heard of CSS Variables before, it’s a new feature of CSS which gives you the po...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-responsiveness-super-simple-with-css-variables.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
