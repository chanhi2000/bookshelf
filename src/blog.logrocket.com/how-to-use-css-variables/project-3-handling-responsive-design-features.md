---
lang: en-US
title: "Project 3: Handling responsive design features"
description: "Article(s) > (4/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (4/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Project 3: Handling responsive design features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/project-3-handling-responsive-design-features.html
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
  url="https://blog.logrocket.com/how-to-use-css-variables#project-3-handling-responsive-design-features"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

In our third project, we’ll build a responsive login form that loads some adjustment values from CSS variables. Like the media query feature dynamically switches standard CSS properties, it also switches custom properties, so we can assign different values for variables within different responsive breakpoints.

First, add the following content into a new HTML document:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Responsive design with CSS variables</title>
</head>

<body>
  <div class="form-box">
    <input type="text" value="Username" />
    <input type="password" value="Password" />
    <button>Login</button>
  </div>
</body>

</html>
```

Here we created a simple login form that consists of two input elements and a button. Add the following style tag into this HTML document to style it properly:

```html :collapsed-lines
<style>
  /* --- desktops and common --- */
  :root {
    --form-box-padding: 8px;
    --form-box-flex-gap: 8px;
    --form-input-font-size: 12px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .form-box {
    display: flex;
    justify-content: flex-end;
    gap: var(--form-box-flex-gap);
    padding: var(--form-box-padding);
    background-color: #333;
    text-align: center;
  }

  .form-box input,
  .form-box button {
    font-size: var(--form-input-font-size);
    padding: 8px;
    margin-right: 4px;
  }

  .form-box input {
    outline: none;
    border: none;
  }

  .form-box button {
    border: none;
    background-color: #edae39;
  }
</style>
```

The above CSS snippet styles the login form only for desktop devices, so it won’t adjust content responsively when you resize the browser, as shown in the following preview:

![Example Of Webpage Without Responsive Elements Displaying Desktop Only Styles Even As Viewport Shrinks](/assets/image/blog.logrocket.com/how-to-use-css-variables/img6-Non-responsive-webpage-desktop-only-styles.webp)

We can simply make this page responsive by writing some styling adjustments — i.e., changing `flex-direction` — inside media query breakpoints. For `padding` or `font-size`-like values-based properties, we can use CSS variables instead of writing CSS properties repetitively to improve the readability and maintainability of CSS definitions.

Look at the previous CSS snippet: you will notice three CSS variables. Change those variables with media query blocks and complete the responsive screen handling code using the following code snippet:

```css :collapsed-lines
/* --- tablets --- */
@media screen and (min-width: 601px) and (max-width: 900px) {
  :root {
    --form-box-padding: 20px 12px 20px 12px;
    --form-box-flex-gap: 12px;
    --form-input-font-size: 14px;
  }

  .form-box input,
  .form-box button {
    display: block;
    width: 100%;
  }
}

/* --- mobiles --- */
@media screen and (max-width: 600px) {
  :root {
    --form-box-padding: 24px;
    --form-box-flex-gap: 12px;
    --form-input-font-size: 20px;
  }

  .form-box {
    flex-direction: column;
  }

  .form-box input,
  .form-box button {
    display: block;
  }
}
```

The above code snippet adjusts the layout for mobile and tablet screens with some standard CSS properties and custom properties. For example, it uses a different `flex-direction` mode, `display` mode for several elements, and the following custom property values for mobile screens:

```css
--form-box-padding: 24px;
--form-box-flex-gap: 12px;
--form-input-font-size: 20px;
```

Test this project by resizing the browser window:

![Example Of Project With Responsive Webpage Styles Adjusting As Viewport Shrinks](/assets/image/blog.logrocket.com/how-to-use-css-variables/img7-Responsive-webpage-styles-adjust-screen-size.gif)

Try adjusting these CSS variables and creating new ones to improve this login screen further. You can use the same strategy to use CSS variables with [**container queries**](/blog.logrocket.com/css-container-queries-guide.md). Check the complete source code and see a live preview from [this CodePen (<VPIcon icon="fa-brands fa-codepen"/>`shalithasuranga`)](https://codepen.io/shalithasuranga/pen/QWoBaWr).

<CodePen
  user="shalithasuranga"
  slug-hash="QWoBaWr"
  title="Project #3: Responsive design breakpoints"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>
