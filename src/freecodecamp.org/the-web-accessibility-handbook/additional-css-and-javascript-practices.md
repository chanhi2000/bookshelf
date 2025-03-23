---
lang: en-US
title: "Additional CSS and JavaScript Practices"
description: Article(s) > (3/6) Everything You Need to Know About Web Acessibility 
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
      content: Article(s) > (3/6) Everything You Need to Know About Web Acessibility
    - property: og:description
      content: "Additional CSS and JavaScript Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-web-accessibility-handbook/additional-css-and-javascript-practices.html
date: 2025-03-19
isOriginal: false
author:
  - name: Kunal Nalawade
    url : https://freecodecamp.org/news/author/KunalN25/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Everything You Need to Know About Web Acessibility",
  "desc": "The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people...",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Everything You Need to Know About Web Acessibility"
  desc="The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people..."
  url="https://freecodecamp.org/news/the-web-accessibility-handbook#heading-additional-css-and-javascript-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>

Most of your accessibility goals should be achieved with HTML alone. But there are certain things to keep in mind when writing CSS and JavaScript to ensure you don't break accessibility.

---

## Styling Form Elements

When styling form elements, remember the following:

- Do not remove the default styles for focus outlines, hover, and disabled state in form elements. You may modify them as per your site design, but they should still be visible.
- Ensure that your labels and placeholder texts are visually clear. Follow colour contrast practices (next section).
- For clickable areas like buttons and inputs, ensure they are large enough so the user can click comfortably.
- Success and Error messages should be physically distinguishable from labels and other text content.

---

## Color Contrast

When you choose colors for your website, your text and background colour should have a good colour contrast. A good color contrast ensures that the text is easily readable by all users (and it also helps people with color blindness in particular).

The WCAG (Web Content Accessibility Guidelines) recommends the following contrast ratios:

![Recommended Color contrast ratios](https://cdn.hashnode.com/res/hashnode/image/upload/v1736175276741/40ee7fe4-110c-4dd1-95f3-4cb7620de032.png)

Let’s understand the colour contrast ratings:

- AA rating refers to the minimum ratio your colour contrast should be such that the site’s content is readable. As you can see in the table above, this requires a 4.5:1 minimum ratio for body text, a 3:1 ratio for large-scale text, and a 3:1 ratio for active user interface components and graphical objects.
- AAA rating is the ideal standard for accessibility that ensures high contrast for your website. This requires a 7:1 ratio for body text, a 4.5:1 ratio for large-scale text, and isn’t defined for UI components/graphical objects.

Choose a contrast ratio that aligns well with your design, but try to keep it to at least AA rating. To check colour contrast ratio between two colors, you can use the following tools:

- [<FontIcon icon="fas fa-globe"/>Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [<FontIcon icon="fa-brands fa-chrome"/>Chrome Developer Tools](https://developer.chrome.com/docs/devtools/accessibility/contrast) - Identifies text in your website not meeting AA and AAA ratings

---

## JavaScript Practices

### Mouse-specific events

When you have functionality triggered by events like [<FontIcon icon="fa-brands fa-firefox"/>mouse-over](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event) and [<FontIcon icon="fa-brands fa-firefox"/>mouse-out](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event), they cannot be accessed by people that depend on keyboard navigation. So, to make the functionality accessible by keyboard, you need to add the same event handlers to events like [<FontIcon icon="fa-brands fa-firefox"/>focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event) and [<FontIcon icon="fa-brands fa-firefox"/>blur](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).

### Client side form validations

When you submit data through a form, the data is validated to check if you have entered valid data. Often, when the data is sent to the server, the server validates the data and lets the UI know if the validation has failed.

To make the website user-friendly, it helps to add form validations on the client-side, so users can get instant feedback if they have entered incorrect data, since the server-side mechanism may take time. This is a very small step towards improving user experience.

Check out the [<FontIcon icon="fas fa-globe"/>Form Validation](https://mdn.github.io/learning-area/accessibility/css/form-validation.html) Example to understand more.

Apart from the above, one thing you should remember is not to use JavaScript for anything and everything. JavaScript can be used to generate any form of HTML and dynamically apply CSS styling. It is very helpful if you have dynamic content on your website.

But if you have too much HTML generated by JavaScript, it gets hard for screen readers to keep track of the dynamic changes. This makes the website difficult to read for impaired users. So, make sure you don't overuse JavaScript when simple HTML would be enough.

Accessibility for dynamic content updates is covered in the next section.
