---
lang: en-US
title: "Project 1: Building button variations"
description: "Article(s) > (2/9) How to use CSS variables like a pro" 
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
      content: "Article(s) > (2/9) How to use CSS variables like a pro"
    - property: og:description
      content: "Project 1: Building button variations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/project-1-building-button-variations.html
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
  url="https://blog.logrocket.com/how-to-use-css-variables#project-1-building-button-variations"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

In CSS frameworks such as [**Bootstrap**](/blog.logrocket.com/bootstrap-adoption-guide.md), variables make sharing a base design across elements much easier. Take the `.bg-danger` class, which turns an element’s background color to red and its own color to white. In this first project, you’ll build something similar.

Get started with the first project by adding the following HTML document to a new <FontIcon icon="fa-brands fa-html5"/>`.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>CSS Variables - Button Variations</title>
  </head>
  <body>
    <section>
      <div class="container">
        <h1 class="title">CSS Color Variations</h1>
        <div class="btn-group">
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-link">Link</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-error">Error</button>
        </div>
      </div>
    </section>
  </body>
</html>
```

The structure of this markup is pretty standard. Notice how each button element has two classes: the `btn` class and a second class. We’ll refer to the `btn` class, in this case, as the base class and the second class as the modifier class that consists of the `btn-` prefix.

Next, add the following style tag content to the above

```css :collapsed-lines
* {
  border: 0;
}

:root {
  --primary: #0076c6;
  --secondary: #333333;
  --error: #ce0606;
  --success: #009070;
  --white: #ffffff;
}

/* base style for all buttons */
.btn {
  padding: 1rem 1.5rem;
  background: transparent;
  font-weight: 700;
  border-radius: 0.5rem;
  cursor: pointer;
}

/* variations */
.btn-primary {
  background: var(--primary);
  color: var(--white);
}

.btn-secondary {
  background: var(--secondary);
  color: var(--white);
}

.btn-success {
  background: var(--success);
  color: var(--white);
}

.btn-error {
  background: var(--error);
  color: var(--white);
}

.btn-link {
  color: var(--primary);
}
```

The `btn` class contains the base styles for all the buttons and the variations come in where the individual modifier classes get access to their colors, which are defined at the `:root` level of the document. This is extremely helpful not just for buttons, but for other elements in your HTML that can inherit the custom properties.

For example, if tomorrow you decide the value for the `--error` custom property is too dull for a red color, you can easily switch it up to `#f00000`. Once you do so, voila — all elements using this custom property are updated with a single change!

Here’s what your first project should look like:

![Preview Of Project Using Css To Build Button Color Variations](/assets/image/blog.logrocket.com/how-to-use-css-variables/img4-CSS-color-variations-project-preview.png)

You can access the complete source code and see a live preview of this project from [this CodePen (<FontIcon icon="fa-brands fa-codepen"/>`shalithasuranga`)](https://codepen.io/shalithasuranga/pen/dyrKEyd).

<CodePen
  user="shalithasuranga"
  slug-hash="dyrKEyd"
  title="Project #1: CSS Color Variations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>
