---
lang: en-US
title: "Everything You Need to Know About Web Acessibility"
description: "Article(s) > Everything You Need to Know About Web Acessibility"
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
      content: "Article(s) > Everything You Need to Know About Web Acessibility"
    - property: og:description
      content: "Everything You Need to Know About Web Acessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-web-accessibility-handbook.html
prev: /programming/css/articles/README.md
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
  name="Everything You Need to Know About Web Acessibility"
  desc="The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people..."
  url="https://freecodecamp.org/news/the-web-accessibility-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742318086251/103cec5f-3330-4559-8554-4ec76b16ec76.png"/>

The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways.

But not everyone experiences the web in the same way. Websites are difficult to use for people who have visual, hearing, or mobility impairments. These barriers make it harder to navigate content, and in some cases, make the web completely inaccessible.

This handbook will help you understand accessibility and how to implement it. Whether you are a beginner or an intermediate developer, you'll learn basic accessibility practices and some advanced techniques. This will help you make your website more inclusive.

Let’s get started.

```component VPCard
{
  "title": "What is Accessibility?",
  "desc": "(1/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/what-is-accessibility.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Basic Accessibility Practices",
  "desc": "(2/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/basic-accessibility-practices.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Additional CSS and JavaScript Practices",
  "desc": "(3/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/additional-css-and-javascript-practices.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Advanced Accessibility Practices: WAI-ARIA",
  "desc": "(4/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/advanced-accessibility-practices-wai-aria.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Multimedia Accessibility",
  "desc": "(5/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/multimedia-accessibility.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Mobile Accessibility",
  "desc": "(6/6) Everything You Need to Know About Web Acessibility",
  "link": "/freecodecamp.org/the-web-accessibility-handbook/mobile-accessibility.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Testing Accessibility with Tools

There are several tools you can use to test the accessibility of your page. [<FontIcon icon="fa-brands fa-chrome"/>Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) in Chrome Developer Tools is an open source tool that analyses a web page for performance, accessibility, SEO, and more. It generates a report on how a page performs in these areas.

Let’s see how it helps in analysing the accessibility of a page:

Open Chrome Dev Tools and navigate to the Lighthouse tab. Click on “Analyse Page Load" and wait for a few seconds. It will show a report that contains info on how your web page scored on Accessibility and other metrics. It will list down any accessibility issues you may have.

Let’s take the following example:

```html
<h1>Welcome</h1>
<img src="image.jpg" />
<button tabindex="2">Click Here</button>
<div onclick="alert('Clicked!')" class="button">Click Me</div>
<form>
  <input type="text" />
</form>
```

When tested with the Lighthouse audit, it yields the following results:

![Lighthouse audit with accessibility issues](https://cdn.hashnode.com/res/hashnode/image/upload/v1739631885589/c886f304-aba2-44ac-8d75-88fac2f60c55.png)

As you can see, it’s scored 74 on accessibility, meaning there is room for improvement. It has also shown the accessibility issues within your HTML code, as you might have guessed looking at the code:

- Image elements do not have `alt` attribute
- Form input does not have a label
- `tabindex` value is greater than 0.

Let’s correct these issues and run the test again:

![Lighthouse audit with good accessibility](https://cdn.hashnode.com/res/hashnode/image/upload/v1739632090527/2db4798a-53d3-4010-9756-83de8b0f208a.png)

This time, it has scored 100 on Accessibility since we have followed all the basic practices.

As you can see, this is a really simple HTML page, and it’s much harder to achieve a score of 100 for large websites. But, you should aim to achieve as high a score as possible. This shouldn’t be too challenging if you make accessibility a part of your development process.

The accessibility score on it’s own does not mean your website is fully accessible. You also need to test the following:

- Manual testing with a screen reader (Mac’s Voiceover or Windows’ Narrator).
- Keyboard accessibility - test whether each and every part of your website is keyboard accessible
- Simulating your website with different color contrasts for different visual impairments.

For simulating, Chrome Developer Tools provides a Rendering tool to emulate your website on different preferences, like light/dark mode, high/low color contrast, reduced motion and various visual impairments.

To access it, open Developer Tools, do ⌘+shift+P (Ctrl+Shift+P on Windows) and type “Rendering". It will open the following window:

![Rendering tool](https://cdn.hashnode.com/res/hashnode/image/upload/v1741959781294/36f6c233-9326-4acb-a551-e95a56a87d8a.png)

If you have added media queries like the following, you can select these preferences and test whether your website behaves accordingly:

```css
@media (prefers-reduced-motion) {
  * {
    animation: none;
  }
}
```

So, when you select `prefers-reduced-motion`, you can test if all the animations have been disabled, and how your website functions.

Apart from the Developer Tools, there’s an NPM plugin called [<FontIcon icon="fa-brands fa-npm"/>`eslint-plugin-jsx-a11y`](https://npmjs.com/package/eslint-plugin-jsx-a11y) that evaluates React JSX code for accessibility issues.

You can find all the code snippets on [GitHub (<FontIcon icon="iconfont icon-github"/>`KunalN25/accessibilityguide`)](https://github.com/KunalN25/accessibilityguide).

---

## Conclusion

Accessibility isn’t just a feature added on top of your code - it should be a part of the development process. When you make a website accessible to everyone, it not only increases your user base, but also promotes inclusivity.

Even though the primary benefactors of accessibility are people with disabilities, it also benefits other users by making the website easier to use overall. A lot of the practices mentioned in the article, like using semantic elements, adding the right attributes, and so on are very easy to follow and go a long way towards ensuring accessibility.

If you are a beginner, you have already done a great job learning about accessibility. Start including simple accessibility practices in your projects. Over time, including these practices will become a natural habit.

I hope this handbook becomes your go-to resource for anything related to accessibility. If you think I've missed something or need clarification on any concepts, feel free to reach out to me on Twitter. For more content on web development, check out out my profile.

::: info References

<SiteInfo
  name="Accessibility | MDN"
  desc="Accessibility (often abbreviated to A11y — as in, ”a”, then 11 characters, and then ”y”) in web development means enabling as many people as possible to use websites, even when those people's abilities are limited in some way."
  url="https://developer.mozilla.org/en-US/docs/Web/Accessibility/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

- [<FontIcon icon="fa-brands fa-youtube"/>Web Dev Simplified- Guide on Accessibility](https://youtu.be/2oiBKSjOOFE)

<VidStack src="youtube/2oiBKSjOOFE" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Everything You Need to Know About Web Acessibility",
  "desc": "The web is a great place to access information and connect with people. It has opened up countless opportunities, making life more convenient in many ways. But not everyone experiences the web in the same way. Websites are difficult to use for people...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/the-web-accessibility-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
