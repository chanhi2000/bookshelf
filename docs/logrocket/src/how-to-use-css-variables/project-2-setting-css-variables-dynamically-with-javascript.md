---
lang: en-US
title: "Project 2: Setting CSS variables dynamically with JavaScript"
description: "Article(s) > (3/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (3/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Project 2: Setting CSS variables dynamically with JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/project-2-setting-css-variables-dynamically-with-javascript.html
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
  url="https://blog.logrocket.com/how-to-use-css-variables#project-2-setting-css-variables-dynamically-with-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

The `document.documentElement.style.setProperty` method is used to set CSS variables dynamically with JavaScript, updating CSS variables in real-time without modifying the style sheet:

```js
document.documentElement.style.setProperty('--primary-color', 'green')
```

This will update the `--primary-color` variable, affecting all the elements that use it.

To see the practical use case for this, we’ll build the second project “a light-and-dark theme”. The light theme will take effect by default unless the user already has their system set to a dark theme. On the page, we’ll create a toggle button that allows the user to [**switch between themes**](/blog.logrocket.com/create-better-themes-with-css-variables.md).

First, add the following HTML structure into a new <VPIcon icon="fa-brands fa-html5"/>`.html` file:

```html :collapsed-lines
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>CSS Variables - Theming</title>
  </head>
  <body>
    <header>
      <div class="container">
        <div class="container-inner">
          <a href="#" class="logo">My Blog</a>
          <div class="toggle-button-container">
            <label class="toggle-button-label" for="checkbox">
              <input type="checkbox" class="toggle-button" id="checkbox" />
              <div class="toggle-rounded"></div>
            </label>
          </div>
        </div>
      </div>
    </header>
    <article>
      <div class="container">
        <h1 class="title">Title of article</h1>
        <div class="info">
          <div class="tags">
            <span>#html</span>
            <span>#css</span>
            <span>#js</span>
          </div>
          <span>1st February, 2024</span>
        </div>
        <div class="content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <a href="#">Link to another url</a> Eius, saepe optio! Quas
            repellendus consequuntur fuga at. Consequatur sit deleniti, ullam
            qui facere iure, earum corrupti vitae laboriosam iusto eius magni,
            adipisci culpa recusandae quis tenetur accusantium eum quae harum
            autem inventore architecto perspiciatis maiores? Culpa, officiis
            totam! Rerum alias corporis cupiditate praesentium magni illo, optio
            nobis fugit.
          </p>
          <p>
            Eveniet veniam ipsa similique atque placeat dignissimos
            quos reiciendis. Odit, eveniet provident fugiat voluptatibus esse
            culpa ullam beatae hic maxime suscipit, eum reprehenderit ipsam.
            Illo facilis doloremque ducimus reprehenderit consequuntur
            cupiditate atque harum quaerat autem amet, et rerum sequi eum cumque
            maiores dolores.
          </p>
        </div>
      </div>
    </article>
  </body>
</html>
```

This snippet represents a simple blog page with a header, a theme toggle button, and a dummy article.

Next, add the following style tag to add CSS definitions for the above HTML structure:

```html :collapsed-lines
<style>
  :root {
    --primary-color: #0d0b52;
    --secondary-color: #3458b9;
    --font-color: #424242;
    --bg-color: #ffffff;
    --heading-color: #292922;
    --white-color: #ffffff;
  }

  /* Layout */
  * {
    padding: 0;
    border: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background: var(--bg-color);
    color: var(--font-color);
  }

  .container {
    width: 100%;
    max-width: 768px;
    margin: auto;
    padding: 0 1rem;
  }

  .container-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Using custom properties */
  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  p {
    font-size: 1.2rem;
    margin: 1rem 0;
    line-height: 1.5;
  }

  header {
    padding: 1rem 0;
    border-bottom: 0.5px solid var(--primary-color);
  }

  .logo {
    color: var(--font-color);
    font-size: 2rem;
    font-weight: 800;
  }

  .toggle-button-container {
    display: flex;
    align-items: center;
  }

  .toggle-button-container em {
    margin-left: 10px;
    font-size: 1rem;
  }

  .toggle-button-label {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }

  .toggle-button-label .toggle-button {
    display: none;
  }

  .toggle-rounded {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .toggle-rounded:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
  }

  input:checked+.toggle-rounded {
    background-color: #9cafeb;
  }

  input:checked+.toggle-rounded:before {
    transform: translateX(26px);
  }

  article {
    margin-top: 2rem;
  }

  .title {
    font-size: 3rem;
    color: var(--font-color);
  }

  .info {
    display: flex;
    align-items: center;
    margin: 1rem 0;
  }

  .tags {
    margin-right: 1rem;
  }

  .tags span {
    background: var(--primary-color);
    color: var(--white-color);
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
  }
</style>
```

This snippet can be divided into two main sections: the layout section and the custom properties section. The latter is what you should focus on. As you can see, the variables are applied above in the link, paragraph, heading, and article elements.

The idea behind this approach is that, by default, the website uses a light theme, and when the box is checked, the values for the light theme get inverted to a dark variant.

Since you can’t trigger these sitewide changes via CSS, JavaScript is critical here. In the next section, we’ll hook up the JavaScript code necessary to toggle between the light and dark themes.

Alternatively, you could trigger a change automatically via CSS using [<VPIcon icon="fa-brands fa-firefox"/>the `prefers-color-scheme` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) to detect whether the user requested a light or dark theme. In other words, you can directly update the website to use the dark variants of the light theme.

Add the following snippet to all the CSS code you just wrote:

```css
@media (prefers-color-scheme: dark) {
 :root {
  --primary-color: #325b97;
  --secondary-color: #9cafeb;
  --font-color: #e1e1ff;
  --bg-color: #000013;
  --heading-color: #818cab;
 }
}
```

We’re listening to the user’s device settings and adjusting the theme to dark if they’re already using a dark theme.

Finally, add the following script segment to the above HTML document:

```html :collapsed-lines
<script>
  const toggleButton = document.querySelector('.toggle-button');
  toggleButton.addEventListener('change', toggleTheme, false);
  const theme = {
    dark: {
      '--primary-color': '#325b97',
      '--secondary-color': '#9cafeb',
      '--font-color': '#e1e1ff',
      '--bg-color': '#000013',
      '--heading-color': '#818cab'
    },
    light: {
      '--primary-color': '#0d0b52',
      '--secondary-color': '#3458b9',
      '--font-color': '#424242',
      '--bg-color': '#ffffff',
      '--heading-color': '#292922'
    }
  };

  function toggleTheme(e) {
    if (e.target.checked) {
      useTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      useTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }

  function useTheme(themeChoice) {
    document.documentElement.style.setProperty(
      '--primary-color',
      theme[themeChoice]['--primary-color']
    );
    document.documentElement.style.setProperty(
      '--secondary-color',
      theme[themeChoice]['--secondary-color']
    );
    document.documentElement.style.setProperty(
      '--font-color',
      theme[themeChoice]['--font-color']
    );
    document.documentElement.style.setProperty(
      '--bg-color',
      theme[themeChoice]['--bg-color']
    );
    document.documentElement.style.setProperty(
      '--heading-color',
      theme[themeChoice]['--heading-color']
    );
  }

  const preferredTheme = localStorage.getItem('theme');
  if (preferredTheme === 'dark') {
    useTheme('dark');
    toggleButton.checked = true;
  } else {
    useTheme('light');
    toggleButton.checked = false;
  }
</script>
```

Now let’s break down the current state of the website.

A user visits the page. The media query `prefers-color-scheme` determines whether the user is using a light or dark theme. If it’s a dark theme, the website updates to use the dark variants of the custom properties.

Let’s say a user isn’t using a dark theme or their OS doesn’t support a dark theme. The browser would default to the light theme, allowing the user to control that behavior by checking or unchecking the box.

Depending on whether the box is checked or unchecked, the `useTheme()` function is called to pass in the theme variant and save the user’s current selection to local storage. You’ll see why it’s saved in a minute.

The `useTheme()` function is where all the magic happens. Based on the theme variant passed, a lookup is performed on the `theme` constant and used to switch between light and dark modes.

The last piece of the puzzle is persisting the current theme, which is achieved by reading the last preferred theme from local storage and setting it automatically when the user revisits the website.

Here’s what your second project should look like:

![Demo Css Project Shown Toggling Between Light And Dark Mode](/assets/image/blog.logrocket.com/how-to-use-css-variables/img5-CSS-light-dark-theme-switcher-project.webp)

You may be thinking of a million other ways to achieve this. Feel free to go through the code and make as many changes as you see fit. You can access the complete source code and see a live preview of this project from [this CodePen (<VPIcon icon="fa-brands fa-codepen"/>`shalithasuranga`)](https://codepen.io/shalithasuranga/pen/vYPaYWN).

<CodePen
  user="shalithasuranga"
  slug-hash="vYPaYWN"
  title="Project #2: CSS light/dark theme switcher"
  :default-tab="['css','result']"
  :theme="dark"/>
