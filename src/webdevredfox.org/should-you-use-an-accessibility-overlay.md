---
lang: en-US
title: "Should you use an Accessibility Overlay?"
description: "Article(s) > Should you use an Accessibility Overlay?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - webdevredfox.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Should you use an Accessibility Overlay?"
    - property: og:description
      content: "Should you use an Accessibility Overlay?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/webdevredfox.org/should-you-use-an-accessibility-overlay.html
prev: /programming/css/articles/README.md
date: 2026-02-04
isOriginal: false
author:
  - name: Gustavo Marquez Lainez
    url: https://gustavom.codeberg.page/#about
cover: https://webdevredfox.org/_app/immutable/assets/userway-overlay-question.CmY2xjEt.png
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
  name="Should you use an Accessibility Overlay?"
  desc="The answer is No! Here's why."
  url="https://webdevredfox.org/post/should-you-use-an-accessibility-overlay"
  logo="https://svelte.dev/favicon.png"
  preview="https://webdevredfox.org/_app/immutable/assets/userway-overlay-question.CmY2xjEt.png"/>

## What are they?

Accessibility Overlays are something you strap onto your website, and **tries** to… fix the accessibility of it! Usually claiming or aiming to meet WCAG AA 2.1 compliance (or newer), as it is the *current* legal standard. Not complying with the standard has the possibility of getting your company sued! So, Accessibility Overlays should be a quick-and-easy solution…

right?

---

## No! They aren’t a quick-and-easy solution

A lot of the time these automated tools can not automatically fix your website. These claims of fixing your website accessibility in a few lines of code are unrealistic. Every website is different, no tool is perfect… and in most cases can make things worse or get in the way of the user.

There have been issues in the past where [<VPIcon icon="fas fa-globe"/>a company has been **sued for an overlay not actually making their website accessible**, then the company sued said overlay!](https://lflegal.com/2025/02/userway-overlay-lawsuit/)

---

## But do Accessibility Overlays *actually help*?

They *might* be helpful to users who are not already familiar with other tools that can be applied everywhere. Screen readers are usually operating-system-wide, and screen reader software provide many other tools to be able to easily navigate a page. The user’s operating system itself will provide many accessibility tools like the Narrator, screen magnification, high contrast modes, text size, text-to-speech, etc.

For instance, [<VPIcon icon="fa-brands fa-windows"/>Windows has a directory of **all their accessibility features listed here.**](https://support.microsoft.com/en-us/windows/discover-windows-accessibility-features-8b1068e6-d3b8-4ba8-b027-133dd8911df9) And [<VPIcon icon="fas fa-globe"/>AbilityNet allows you to search for **how to make any device easier to use.**](https://mcmw.abilitynet.org.uk/)

If someone really does need a tool provided by an Accessibility Overlay, there are other solutions that provide the same features, and can work across **all** websites. For example, one browser extension I’ve found, HelperBird, provides many of the same features. I cannot say whether this extension is good or not, however it is an option.

---

So what I’m saying is, even if your website is already accessible, and you think an Accessibility Overlay can be helpful… it can be **_at best_ redundant, get in the way of tools the user may already be using, and use up more of the user’s data/resources** (as it is yet another thing that needs to be loaded onto your website). And at times these overlays can hurt performance as it tries to “repair” the HTML.

**The [<VPIcon icon="fas fa-globe"/>y Fact Sheet](https://overlayfactsheet.com/en/) goes a lot more into detail about Accessibility Overlays, and the issues they have caused users.** And has been [<VPIcon icon="fas fa-globe"/>ned by many accessibility experts.](https://overlayfactsheet.com/en/#statement-from-sponsors-and-signatories-to-this-fact-sheet)

---

## What to do instead

If your website is already accessible and meets the WCAG, then great! You do not need to do anything and you do not need to add anything else! It is important to note, that **as you maintain your website, you also need to maintain your site’s accessibility.** Make sure testing accessibility is part of your workflow!

However, if your website is not accessible… you would make better use of your money long-term and create a better experience for everyone by not paying accessibility overlays, and instead getting help from accessibility experts. Or, there are a few things you can do yourself:

- Try starting with automated tools like [<VPIcon icon="fa-brands fa-chrome"/>WAVE](https://wave.webaim.org/) and [<VPIcon icon="fa-brands fa-chrome"/>Lighthouse](https://developer.chrome.com/docs/lighthouse/)
  - These can help find accessibility issues, and point you in the right direction to figure out how to fix them.
- Can you navigate the website with *only your keyboard?*
  - Are you able to clearly see where you are and what you are highlighting.
  - Are things in the logical order?
    - Make sure the HTML is in logical order, and try not to change that order in your stylesheet.
  - If you can’t, you may need to edit the stylesheet to make sure that focus outlines are clearly visible, like so:
  
::: info

![](https://webdevredfox.org/src/article-assets/focus-outline-example.png)  

![An article card showing a white focus ring appearing around the article title showing that it is currently selected.](https://webdevredfox.org/_app/immutable/assets/focus-outline-example.FVtyeaVs.png)

Keep in mind that the outline is styled differently across browsers. Or, you can try making a custom outline with [<VPIcon icon="fa-brands fa-firefox"/>`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)

:::

- Try using a Screen Reader to navigate your website.
  - On Windows, you can enable the screen reader with `ctrl+super+enter`, they provide a step-by-step tutorial on how to navigate with a screen reader.
- Make sure to mark proper landmarks in the HTML with [<VPIcon icon="fas fa-globe"/>Semantic HTML elements.](https://w3schools.com/html/html5_semantic_elements.asp)

---

::: note TLDR:

Overlays are at best redundant when your site is already accessible, and can get in the way of tools the user may already be using. The best thing to do is to make sure your site is accessible from the start.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Should you use an Accessibility Overlay?",
  "desc": "The answer is No! Here's why.",
  "link": "https://chanhi2000.github.io/bookshelf/webdevredfox.org/should-you-use-an-accessibility-overlay.html",
  "logo": "https://svelte.dev/favicon.png",
  "background": "rgba(2255,127,80,0.2)"
}
```
