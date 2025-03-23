---
lang: en-US
title: "Advanced techniques: Using CSS variables in animations"
description: "Article(s) > (7/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (7/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Advanced techniques: Using CSS variables in animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/advanced-techniques-using-css-variables-in-animations.html
date: 2025-03-20
isOriginal: false
author:
  - name: Idorenyin Obong
    url : https://blog.logrocket.com/author/idorenyinobong/
cover: /assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to use CSS variables like a pro",
  "desc": "Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites.",
  "link": "/blog.logrocket.com/how-to-use-css-variables/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to use CSS variables like a pro"
  desc="Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites."
  url="https://blog.logrocket.com/how-to-use-css-variables#advanced-techniques-using-css-variables-in-animations"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

CSS variables can be used with `@keyframes` to make animations more dynamic and reusable without direct changes to the styles. However, they must be applied outside the`@keyframes` since variables are not recognized in keyframes.

---

## Animating button color dynamically

```css
:root {
  --btn-bg: #3498db; /* Default background color */
}

button {
  background-color: var(--btn-bg);
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  from {
    background-color: var(--btn-bg);
  }
  to {
    background-color: lighten(var(--btn-bg), 20%);
  }
}
```

The background color changes dynamically based on `--btn-bg`. Adjusting `--btn-bg` in `:root` instantly updates the animation color!

Now, we can use JavaScript to update the CSS variable in real-time to animate the button’s color on hover or user interaction

```js
document.querySelector("button").addEventListener("mouseover", () => {
  document.documentElement.style.setProperty("--btn-bg", "#e74c3c");
});

document.querySelector("button").addEventListener("mouseout", () => {
  document.documentElement.style.setProperty("--btn-bg", "#3498db");
});
```

The button smoothly transitions between colors when hovered!
