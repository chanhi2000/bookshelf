---
lang: en-US
title: "How to Build Simpler Accordion Menus with HTML <details>"
description: "Article(s) > How to Build Simpler Accordion Menus with HTML <details>"
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
      content: "Article(s) > How to Build Simpler Accordion Menus with HTML <details>"
    - property: og:description
      content: "How to Build Simpler Accordion Menus with HTML <details>"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-simpler-accordion-menus-with-html-details.html
prev: /articles/README.md
date: 2025-07-21
isOriginal: false
author:
  - name: Ophy Boamah
    url : https://freecodecamp.org/news/author/CodeHemaa/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753119637759/0fb5302d-c21c-4c0d-affb-3f891261aabf.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Simpler Accordion Menus with HTML <details>"
  desc="Accordion menus are everywhere on the web because users want fast answers and smooth navigation. They help create clean, organized, and user-friendly interfaces. Many developers still reach for JavaScript to build accordions, which adds avoidable com..."
  url="https://freecodecamp.org/news/how-to-build-simpler-accordion-menus-with-html-details"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753119637759/0fb5302d-c21c-4c0d-affb-3f891261aabf.png"/>

Accordion menus are everywhere on the web because users want fast answers and smooth navigation.

They help create clean, organized, and user-friendly interfaces. Many developers still reach for JavaScript to build accordions, which adds avoidable complexities to their projects.

The HTML `<details>` element solves this problem with its built-in disclosure widget that toggles content visibility using just a few lines of HTML and optional CSS.

In this article, we’ll look at an FAQ accordion built using `<details>`.

---

## What is the HTML `<details>` Element?

The HTML `<details>` element is a disclosure widget that allows you to hide and show content with a single click. Think of it as a native accordion that comes built into HTML.

The most common use case for accordions is the Frequently Asked Questions (FAQ) section on many sites. If you’ve seen or interacted with an FAQ, that’s an opportunity to use `<details>`.

It has two main components:

- `<details>` is the main container tag that opens and closes to display what’s in `<summary>`.
- `<summary>` is a container for the content that is displayed when `<details>` is clicked.

💡 In addition to the `summary`, you can include any HTML text element within the `<details>` container.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752662432707/0d6ebbae-d68d-400f-9209-a83feec273b7.png)

The image above shows a real-life use case of `<details>` on the Apple website. In a later section, we’ll learn about the browsers that support it.

### When to Use `<details>` over JavaScript alternatives

Unlike JavaScript-based accordions that add weight to your project, `<details>` offers the same functionality with minimal load and better performance. It also offers built-in keyboard navigation and screen reader support.

Choose `<details>` over JavaScript-created accordions when:

- Building simple accordions or FAQ sections
- Accessibility, performance, and SEO are a priority
- You want to avoid JavaScript dependencies

---

## An FAQ Accordion Built with the `<details>` Element

Here’s what our example project looks like:

![Example project using the  element](https://cdn.hashnode.com/res/hashnode/image/upload/v1752662715342/74db7ba5-f7a6-44be-974c-36c0418c4a81.png)

This design is by [<FontIcon icon="fas fa-globe"/>Frontend Mentor](https://frontendmentor.io/?via=ophyboamah) (and you can check out the project on [Codepen (<FontIcon icon="fa-brands fa-codepen"/>`ophyboamah`)](https://codepen.io/ophyboamah/full/ByaRqaN)).

To follow along, you need basic knowledge of HTML and CSS. Since the focus of this article is `<details>`, we won't place a lot of emphasis on the starting HTML and CSS code (available on the Codepen above). Instead, we'll look at one FAQ question with its answer to learn how `<details>` works.

### How to Use `<details>`

To create an accordion with the `<details>` element, you need both the `<details>` and `<summary>` elements, as shown in the starter code below.

```html
<details>
  <summary>What is Frontend Mentor, and how will it help me?</summary>
  <p>Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It’s suitable for all levels and ideal for portfolio building.</p>
</details>
```

The GIF below will be the result after running the above code. With less than five lines of HTML code, we already have an accordion.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752662956079/25c66453-71ba-469c-8dd2-0f1b8e3b9d7f.gif)

### Styling `<details>`

Now, let's focus on transforming our basic accordion into something visually appealing (foundational styles can be found on the [Codepen (<FontIcon icon="fa-brands fa-codepen"/>`ophyboamah`)](https://codepen.io/ophyboamah/full/ByaRqaN)). First, we’ll add the icons as SVGs within `<summary>` with classes (closed-icon and open-icon) to make them easy to style.

```html :collapsed-lines
<details>
  <summary>What is Frontend Mentor, and how will it help me?
  <svg class="closed-icon" xmlns="<http://www.w3.org/2000/svg>" class="closed-icon" width="30" height="31" viewBox="0 0 30 31" fill="none">
  <path d="M15 3.3125C12.5895 3.3125 10.2332 4.02728 8.22899 5.36646C6.22477 6.70564 4.66267 8.60907 3.74022 10.836C2.81778 13.063 2.57643 15.5135 3.04668 17.8777C3.51694 20.2418 4.67769 22.4134 6.38214 24.1179C8.08659 25.8223 10.2582 26.9831 12.6223 27.4533C14.9865 27.9236 17.437 27.6822 19.664 26.7598C21.8909 25.8373 23.7944 24.2752 25.1335 22.271C26.4727 20.2668 27.1875 17.9105 27.1875 15.5C27.1835 12.2689 25.8981 9.17131 23.6134 6.88659C21.3287 4.60186 18.2311 3.31653 15 3.3125ZM19.6875 16.4375H15.9375V20.1875C15.9375 20.4361 15.8387 20.6746 15.6629 20.8504C15.4871 21.0262 15.2486 21.125 15 21.125C14.7514 21.125 14.5129 21.0262 14.3371 20.8504C14.1613 20.6746 14.0625 20.4361 14.0625 20.1875V16.4375H10.3125C10.0639 16.4375 9.82541 16.3387 9.64959 16.1629C9.47378 15.9871 9.375 15.7486 9.375 15.5C9.375 15.2514 9.47378 15.0129 9.64959 14.8371C9.82541 14.6613 10.0639 14.5625 10.3125 14.5625H14.0625V10.8125C14.0625 10.5639 14.1613 10.3254 14.3371 10.1496C14.5129 9.97377 14.7514 9.875 15 9.875C15.2486 9.875 15.4871 9.97377 15.6629 10.1496C15.8387 10.3254 15.9375 10.5639 15.9375 10.8125V14.5625H19.6875C19.9361 14.5625 20.1746 14.6613 20.3504 14.8371C20.5262 15.0129 20.625 15.2514 20.625 15.5C20.625 15.7486 20.5262 15.9871 20.3504 16.1629C20.1746 16.3387 19.9361 16.4375 19.6875 16.4375Z" fill="#AD28EB"/>
  </svg> 
  <svg class="open-icon" xmlns="<http://www.w3.org/2000/svg>" class="open-icon" width="30" height="31" viewBox="0 0 30 31" fill="none">
  <path d="M15 3.3125C12.5895 3.3125 10.2332 4.02728 8.22899 5.36646C6.22477 6.70564 4.66267 8.60907 3.74022 10.836C2.81778 13.063 2.57643 15.5135 3.04668 17.8777C3.51694 20.2418 4.67769 22.4134 6.38214 24.1179C8.08659 25.8223 10.2582 26.9831 12.6223 27.4533C14.9865 27.9236 17.437 27.6822 19.664 26.7598C21.8909 25.8373 23.7944 24.2752 25.1335 22.271C26.4727 20.2668 27.1875 17.9105 27.1875 15.5C27.1841 12.2687 25.899 9.17076 23.6141 6.8859C21.3292 4.60104 18.2313 3.31591 15 3.3125ZM19.6875 16.4375H10.3125C10.0639 16.4375 9.82541 16.3387 9.64959 16.1629C9.47378 15.9871 9.37501 15.7486 9.37501 15.5C9.37501 15.2514 9.47378 15.0129 9.64959 14.8371C9.82541 14.6613 10.0639 14.5625 10.3125 14.5625H19.6875C19.9361 14.5625 20.1746 14.6613 20.3504 14.8371C20.5262 15.0129 20.625 15.2514 20.625 15.5C20.625 15.7486 20.5262 15.9871 20.3504 16.1629C20.1746 16.3387 19.9361 16.4375 19.6875 16.4375Z" fill="#301534"/>
  </svg>
  </summary>
  <p>Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It’s suitable for all levels and ideal for portfolio building.</p>
</details>
```

In the code below, we customize the disclosure marker by hiding the default arrow and adding a custom icon to the right using the `::marker` pseudo-element on `<summary>`. We also set its content as empty, which removes the marker altogether.

```css :collapsed-lines
/* Styles for the clickable summary element*/
summary {
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  margin-bottom: 1em;
  padding: 1.5em;
/* Remove the default marker */
  &::marker {
    content: '';
  }

  &:last-child { 
    margin-bottom: 0; 
  } 

  &:hover { 
    color: var(--text-accent);
    outline: none;
  }
}

p {
  padding-top: 1em;
  color: var(--text-light);
}
/* Styles for the collapsible <details> container */
details {
  margin-bottom: 1em;

  &:last-child { 
    margin-bottom: 0; 
  }

  .open-icon {
    display: none;
  }

  &[open] {
    .open-icon {
      display: inline;
    }

    .closed-icon {
      display: none;
    }
  }

  .open-icon,
  .closed-icon {
    width: 1.8em; 
    height: 1.8em;
    flex-shrink: 0;
  }
}
```

The GIF below shows the output of styling our accordion with the CSS code above.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752663406898/3d033ac2-e9d4-4836-8f3b-816513802353.gif)

To have an FAQ question expanded when the page loads, add the `open` attribute to `<details>`. This is particularly useful for highlighting important information where the most crucial FAQ starts expanded.

```html
<details open>
  <summary>What is Frontend Mentor, and how will it help me?</summary>
</details>
```

---

## Browser Support and Accessibility Considerations

According to [<FontIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), `<details>` is a well established feature that works across many devices and the popular browsers (Chrome, Edge, Firefox, and Safari) since January 2020.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752663542331/33407311-a4db-47ab-bc9f-16baaed5d060.png)

`<details>` includes built-in accessibility features that requires additional JavaScript in custom solutions such as keyboard navigation, screen reader support, and semantic structure. You can also add attributes like role, aria-expanded, and aria-labelledby to ensure even more accessibility.

---

## Conclusion

`<details>` is a powerful yet under-utilized element for creating UI elements like accordions, FAQs, or navigation menus without JavaScript. It is easy to implement and lightweight, and yet improves user experience with interactive content.

So, the next time you need to create any collapsible content, with accessibility and performance in mind, consider reaching for `<details>` and it will surely make your development life easier.

Here are some helpful resources:

<SiteInfo
  name="<details>: The Details disclosure element - HTML | MDN"
  desc="The <details> HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an open state. A summary or label must be provided using the <summary> element."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```component VPCard
{
  "title": "Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion",
  "desc": "Gosh bless the <details> element. Toss some content inside it and you have an accessible expand-for-more interaction with just about zero work.",
  "link": "/css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<SiteInfo
  name="Details and summary  |  web.dev"
  desc="Discover how the very useful details and summary elements work, and where to use them."
  url="https://web.dev/learn/html/details/"
  logo="https://gstatic.com/devrel-devsite/prod/vbad538e1d00a1e89dedb22ab9f1082402199c262867d664247ae54051f01abb8/web/images/favicon.png"
  preview="https://web.dev/static/images/social-wide.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Simpler Accordion Menus with HTML <details>",
  "desc": "Accordion menus are everywhere on the web because users want fast answers and smooth navigation. They help create clean, organized, and user-friendly interfaces. Many developers still reach for JavaScript to build accordions, which adds avoidable com...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-simpler-accordion-menus-with-html-details.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
