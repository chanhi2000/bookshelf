---
lang: en-US
title: "How to use CSS variables like a pro"
description: "Article(s) > How to use CSS variables like a pro"
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
      content: "Article(s) > How to use CSS variables like a pro"
    - property: og:description
      content: "How to use CSS variables like a pro"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/
prev: /programming/css/articles/README.md
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
  name="How to use CSS variables like a pro"
  desc="Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites."
  url="https://blog.logrocket.com/how-to-use-css-variables"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

CSS offers many predefined standard key-value-based properties for styling semantic HTML elements. However, while designing webpages, developers often need to repetitively use the same values for properties in several segments of stylesheets — for example, while using a primary accent color for various webpage elements.

![how to use css variables](/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png)

CSS now supports using custom properties, also known as CSS variables, to avoid repetitive CSS property values. Like any popular programming language, CSS also implements variables for writing clean code with a productive assignment and retrieval syntax, scoping support, and fallback values.

In this tutorial, we’ll first demystify CSS variables and then build four simple projects that utilize them. Some [**basic CSS knowledge**](/blog.logrocket.com/the-future-of-css-features-in-2020.md) is required to follow along with this tutorial. Let’s dive in!

---

## What are CSS variables?

CSS variables are user-defined values that can be reused throughout a stylesheet. They are also known as custom properties**.** The `--` prefix and `var()` function is used to define and access CSS variables respectively:

```css
:root {
  --primary-color: #3498db;
}

button {
  background-color: var(--primary-color);
}
```

Unlike traditional CSS properties, CSS variables can be modified dynamically with JavaScript using (`element.style.setProperty`). CSS variables can be changed in one place and all elements using it update automatically. They can be defined within selectors or globally using (`:root` ).

One of the most common use cases for CSS variables is managing websites in which numerous values are similar to those in the document. This helps to reduce the friction associated with refactoring or updating your code.

::: note Editor’s note

This article was updated by [<FontIcon icon="fas fa-globe"/>Emmanuel John](https://blog.logrocket.com/author/emmanueljohn/) in March 2025 to include instructions on setting CSS variables dynamically with JavaScript, differentiate between CSS and SASS variables, and troubleshoot common developer issues with CSS variables.

:::

::: info What we’ll build in this tutorial

To solidify our knowledge about CSS variables, we’ll build four very simple projects:

1. **Button variations** **—** This concept is popular in Bootstrap, where certain elements share CSS rules that give them a default design but are differentiated by colors or other properties
2. **Theme-based design** **—** Specifically, a light-and-dark theme manipulated by JavaScript
3. **A responsive login form** **—** We’ll display different layouts on desktop, tablet, and mobile screens
4. **JavaScript-free dynamic elements** **—** This project generates a colorful native checkbox list

Each project should provide insights into how we can use CSS variables to take care of a wide vhow-to-declare-and-use-css-variables.mdariety of use cases.

Also referred to as custom properties or cascading variables, CSS variables have myriad use cases.

:::

```component VPCard
{
  "title": "How to declare and use CSS variables",
  "desc": "(1/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/how-to-declare-and-use-css-variables.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Project 1: Building button variations",
  "desc": "(2/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/project-1-building-button-variations.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Project 2: Setting CSS variables dynamically with JavaScript",
  "desc": "(3/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/project-2-setting-css-variables-dynamically-with-javascript.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Project 3: Handling responsive design features",
  "desc": "(4/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/project-3-handling-responsive-design-features.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Project 4: Generating JavaScript-free dynamic elements",
  "desc": "(5/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/project-4-generating-javascript-free-dynamic-elements.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "CSS variables vs. SASS variables",
  "desc": "(6/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/css-variables-vs-sass-variables.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Advanced techniques: Using CSS variables in animations",
  "desc": "(7/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/advanced-techniques-using-css-variables-in-animations.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Browser support for the CSS variables feature",
  "desc": "(8/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/browser-support-for-the-css-variables-feature.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

```component VPCard
{
  "title": "Common mistakes & troubleshooting CSS variables",
  "desc": "(9/9) How to use CSS variables like a pro",
  "link": "/blog.logrocket.com/how-to-use-css-variables/common-mistakes-troubleshooting-css-variables.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

---

## Conclusion

By building these simple projects, you can learn how to use CSS variables like a pro. You can use the `style` attribute to apply CSS variables directly to an HTML element like this `<p style="color: var(--primary-color);">Hello, world!</p>`. Also, you can debug CSS variable issues using the browser DevTools. There’s certainly more to them than I explained, so feel free to mess around with the code to explore further.

CSS variables help simplify the way you build websites and complex animations while still allowing you to write reusable and elegant code. Using CSS variables is also possible with [**React Native projects**](/blog.logrocket.com/using-css-variables-react-native.md) that run on the React Native Web renderer.

---

## Frequently asked questions

::: details How do I use variables in CSS?

You can use variables in your CSS using the `var()` function to apply declared variables in your styles.

:::

::: details When should I use CSS variables?

Use CSS variables when you need global or reusable values like colors, font sizes, spacings, or themes. They are also useful when you need to avoid hard-coded repetition. In large projects, changing a value like a primary color in multiple places can be tedious. Using CSS variables makes the codebase maintainable.

:::

::: detaisl How do you initialize a variable in CSS?

CSS variables can be declared using either the `--` prefix or the `@property` at-rule.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use CSS variables like a pro",
  "desc": "Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
