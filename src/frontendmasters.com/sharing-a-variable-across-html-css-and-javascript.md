---
lang: en-US
title: "Sharing a Variable Across HTML, CSS, and JavaScript"
description: "Article(s) > Sharing a Variable Across HTML, CSS, and JavaScript"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Pug
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
  - pug
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Sharing a Variable Across HTML, CSS, and JavaScript"
    - property: og:description
      content: "Sharing a Variable Across HTML, CSS, and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/sharing-a-variable-across-html-css-and-javascript.html
prev: /programming/css/articles/README.md
date: 2025-01-08
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4908
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Sharing a Variable Across HTML, CSS, and JavaScript"
  desc="Set a variable in Pug, then create an inline script which sets that variable for using in JavaScript and use setProperty to pass it to CSS."
  url="https://frontendmasters.com/blog/sharing-a-variable-across-html-css-and-javascript/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4908"/>

My kid is in a little phase where word search puzzles are really fun. She likes doing them, and then possibly because we share blood, she immediately started to want to *make* them. I figured it would be a fun little recreational coding job to build a maker, so I did that: [Word Search Puzzle Maker (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/MYgbXjv). It’s not fancy, you just write in your words then a button click will fill in the un-filled spaces with random letters and you’re good to print it out.

One of the configuration options for the “maker” is how big you want to build the grid. A 10×10 grid is the default, but it’s settable by just **setting a variable in one place**.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/CleanShot-2025-01-08-at-07.18.41%402x.png?resize=1024%2C517&ssl=1)

It turns out it’s useful to have this variable in all three of the important front-end technologies at play: the HTML, CSS, and JavaScript. The relevant variable here is `size`, which represents the number of cells across and tall the grid is.

- **HTML**: Well, Pug, actually. Pug generates HTML, and having the `size` there means I can write a loop that generates the number of elements in the grid the way I need.
- **CSS**: Having the `size` there means I can set up the CSS grid with the appropriate columns/rows.
- **JavaScript**: By having the `size` variable available there, I was able to implement arrow key navigation fairly easily which helped the experience of setting new words.

It all starts with that Pug code, so, ya know, sorry if that’s cheating. But here’s the rub:

```pug
- const size = 10;
script 
  | window.size = #{size};
  | document.documentElement.style.setProperty('--size', #{size});
```

The dash (`-`) in that Pug code essentially means “this is JavaScript”, and the Node process that runs to create the HTML runs it. That means I can use the variable later to create the grid.

```pug
.grid
  - for (let i = 0; i < size**2; i++)
    .letter(data-index=i)
      input(maxlength=1, matches="[A-Za-z]")
```

The variable gets passed from Pug into client-side JavaScript by making a script tag and creating a variable off the `window` object. A little variable interpolation makes that possible.

The variable gets passed to CSS in a similar fashion, using client-side JavaScript to call `setProperty` on the `documentElement`. That CSS custom property will then cascade to wherever we need it. I can use it on another element like this:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--size), 1fr);
}
```

That’s it really. I just got a kick out of setting a variable in one place and making use of it in three languages.

<CodePen
  user="chriscoyier"
  slug-hash="MYgbXjv"
  title="Word Search Puzzle Maker"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Try changing the `size` above.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Sharing a Variable Across HTML, CSS, and JavaScript",
  "desc": "Set a variable in Pug, then create an inline script which sets that variable for using in JavaScript and use setProperty to pass it to CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/sharing-a-variable-across-html-css-and-javascript.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
