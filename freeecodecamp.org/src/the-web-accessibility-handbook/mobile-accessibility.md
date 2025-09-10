---
lang: en-US
title: "Mobile Accessibility"
description: Article(s) > (6/6) Everything You Need to Know About Web Acessibility 
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
      content: Article(s) > (6/6) Everything You Need to Know About Web Acessibility
    - property: og:description
      content: "Mobile Accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-web-accessibility-handbook/mobile-accessibility.html
next: /freecodecamp.org/the-web-accessibility-handbook/README.md#testing-accessibility-with-tools
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
  url="https://freecodecamp.org/news/the-web-accessibility-handbook#heading-mobile-accessibility"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>

We have covered many key accessibility practices so far, and they should work well on mobile phones as well. But there are some additional considerations you can follow for mobile users.

First, let’s talk about mouse-specific events. We have already seen how to make mouse-specific events accessible in the [JavaScript Practices](/freecodecamp.org/the-web-accessibility-handbook/additional-css-and-javascript-practices.md#heading-javascript-practices) section. Events like [<FontIcon icon="fa-brands fa-firefox"/>mousedown](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event) or [<FontIcon icon="fa-brands fa-firefox"/>mouseup](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event) are often used for drag and drop functionalities.

But these are not accessible for touchscreen users, so you should add the same functionality to touch-specific events like [<FontIcon icon="fa-brands fa-firefox"/>touchstart](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event) and [<FontIcon icon="fa-brands fa-firefox"/>touchend](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event). The following example is in the context of drag and drop:

```js
source.ontouchstart = (e) => {
  // initiate drag
};

dest.ontouchend = (e) => {
   // drop
};
```

Next, you have to ensure that you are following responsive design when designing your web pages. Responsive designs make sure the website looks good on both desktop and mobile phones. I have written a detailed guide on [responsive design (<FontIcon icon="fa-brands fa-medium"/>`gitconnected`)](https://medium.com/gitconnected/read-this-to-make-your-website-responsive-35af4ab7992b), so check it out if you are interested.

Some other mobile accessibility practices that are good to know:

- Do not disable zoom on your website. Both fully-sighted users as well as those who have visual impairments may need to zoom in to read the website’s content on smaller screens.
- When writing navigation menus, you’d normally conceal it and provide a hamburger icon to open it, as the screen is much shorter/smaller on a mobile phone. In these cases, the hamburger menu should be easily accessible. Check out the example of a [<FontIcon icon="fas fa-globe"/>good hamburger menu](https://fritz-weisshart.de/meg_men/) from the docs, in mobile view.
- When creating forms, try to minimise the amount of typing the user needs to do, as it can get annoying for mobile users. This is especially important if your website is primarily designed for mobile users. Check out the [<FontIcon icon="fa-brands fa-firefox"/>docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Mobile#user_input) for examples.

Visit [<FontIcon icon="fa-brands fa-firefox"/>MDN Docs-Mobile Accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Mobile) if you want to learn more.