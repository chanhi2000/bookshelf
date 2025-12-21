---
lang: en-US
title: "Project 4: Generating JavaScript-free dynamic elements"
description: "Article(s) > (5/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (5/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Project 4: Generating JavaScript-free dynamic elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/project-4-generating-javascript-free-dynamic-elements.html
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
  url="https://blog.logrocket.com/how-to-use-css-variables#project-4-generating-javascript-free-dynamic-elements"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

Imagine that you need to create a colorful native checkbox list with multiple accent colors. Using different values for `accent-color` via the inline style attribute is undoubtedly time-consuming since you have to define colors yourself. Hence, you may create this checkbox list dynamically with JavaScript.

However, what if this list gets rendered in a JavaScript-disabled environment, like inside a Markdown document? We can use CSS variables to generate JavaScript-free dynamic elements.

Let’s create a colorful native checkbox list with CSS variables. Create a new HTML document and add the following style tag:

```css
input[type="checkbox"] {
  width: 80px;
  height: 80px;
  --hue: calc(var(--i) * 50 + 100);
  accent-color: hsl(var(--hue), 50%, 50%);
}
```

Here, we calculate a dynamic color for the `accent-color` property using the `hsl` color function.

For the hue input parameter, we use the `--hue` variable which gets a dynamically calculated value using the `--i` variable. This implementation lets us generate multiple colors by using different numbers for `--i`.

Use the following HTML snippet to get multiple colorful native checkboxes:

```html
<div style="text-align: center">
  <input type="checkbox" checked style="--i: 0"/>
  <input type="checkbox" checked style="--i: 1"/>
  <input type="checkbox" checked style="--i: 2"/>
  <input type="checkbox" checked style="--i: 3"/>
</div>
```

Here we set an index manually for the `--i` variable via inline style attributes to generate a dynamic accent color. This approach is more productive than setting colors yourself for each checkbox element. Look at the following preview of the fourth project:

![Colorful Checkbox Styles Using Css Variables](/assets/image/blog.logrocket.com/how-to-use-css-variables/img8-Colorful-checkbox-styles-CSS-variables.png)

You can browse the complete source code and see a live preview from [this CodePen (<VPIcon icon="fa-brands fa-codepen"/>`shalithasuranga`)](https://codepen.io/shalithasuranga/pen/YzgjegB). It’s possible to use the same strategy to generate JavaScript-free dynamic elements by adjusting any standard CSS property value, i.e., using `--i` to set dynamic image filter configurations.

<CodePen
  user="shalithasuranga"
  slug-hash="YzgjegB"
  title="Project #4: Dynamic elements with CSS variables"
  :default-tab="['css','result']"
  :theme="dark"/>
