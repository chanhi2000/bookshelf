---
lang: en-GB
title: "Glossary Web Component"
description: "Article(s) > Glossary Web Component"
icon: fa-brands fa-markdown
category:
  - Markdown
  - Article(s)
tag:
  - blog
  - dbushell.com
  - md
  - markdowen
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Glossary Web Component"
    - property: og:description
      content: "Glossary Web Component"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/glossary-web-component.html
prev: /programming/md/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-05-07-glossary-web-component.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Markdown > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Glossary Web Component"
  desc="The one where I put the hypercard in the hyperlink"
  url="https://dbushell.com/2025/05/07/glossary-web-component/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-05-07-glossary-web-component.png"/>

I’ve added a **secret glossary** to my blog! You might find it by hovering over special links. Don’t tell anyone, it’s a secret. At least until I can find a way to style the links without them being a distraction. Do I need to, or can they remain [<VPIcon icon="fa-brands fa-wikipedia-w"/>easter eggs](https://en.wikipedia.org/wiki/Easter_egg_(media))[^1]?

[^1]: A hidden message or feature covered in less chocolate than last year due to shrinkflation.

## The Idea

This project came about when [<VPIcon icon="fa-brands fa-firefox"/>I noted concern](https://dbushell.com/notes/2025-05-05T05:48Z/) over my reliance on [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/)[^2]. I always favour MDN over other sources. I’m lazy. I feel guilty for not linking to the small web, the indie web, the weird web. At first I banned myself from linking to MDN. Later I mulled over the glossary idea. I think I’ve solved it!

[^2]: The GOAT resource for web standards documentation, API references, developer guides, and an entire section on accessibility you’ve never read.

---

## The Implementation

I write my blog posts in [<VPIcon icon="fas fa-globe"/>Markdown](https://daringfireball.net/projects/markdown/)[^3]. For new glossary terms I now link to a placeholder rather than an external source. For example:

[^3]: A ~simple~ plain text markup language created by John Gruber and bastardised by everyone else. Designed for writers who enjoy teeny-weeny font sizes.

```md
[React](/glossary/react.json)
```

This references a [<VPIcon icon="iconfont icon-json"/>JSON](https://json.org/)[^4] file that has the following format:

```json
{
  "title": "React",
  "description": "A legacy JavaScript framework (turned religion). Favoured by tech bros and famous for bloated bundles and crippling web performance.",
  "links": [
    {
      "name": "JSX.lol",
      "title": "Does anybody actually like React?",
      "url": "https://jsx.lol"
    },
    {
      "name": "React",
      "url": "https://react.dev"
    }
  ]
}
```

[^4]: JavaScript Object Notation. An almost perfect specification. If only they’d allowed trailing commas.

My build script replaces the markdown link with a [<VPIcon icon="fas fa-globe"/>web component](https://adactio.com/journal/20618)[^5]:

[^5]: A combination of web APIs including custom elements, shadow DOM, HTML templates, and good times.

```jsx
<glossary-term id="--term-react">
  <a href="https://jsx.lol">React</a>
</glossary-term>
```

The first link in the JSON is used as the canonical source.

HTML wrapped in a [<VPIcon icon="fa-brands fa-firefox"/>custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)[^6] is a perfect example of [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md)[^7]. For unsupported browsers there is still an accessible link inside. For browsers that support the [**Popover API**](/master.dev/using-the-popover-api-for-html-tooltips.md)[^8] each `<glossary-term>` element is enhanced with a fancy popover.

[^6]: An extension of HTML with behaviour defined by the developer. Shadow DOM allows for encapsulation. Bring your own tag! It must be hyphenated.

[^7] The front-end practice of building an accessible baseline with extra features and functionality defined by browser capabilities. The antithesis of React.

[^8] A mechanism for top-layer accessible components. Popovers can be implemented declaratively in HTML (yay!) or with JavaScript (boo!)

If you’ve missed every example so far here is the [<VPIcon icon="fas fa-globe"/>React](https://jsx.lol/)[^9] link.

[^9]: React: A legacy JavaScript framework (turned religion). Favoured by tech bros and famous for bloated bundles and crippling web performance.

I captured a screen recording of how it should appear:

<VidStack src="https://dbushell.com/images/blog/2025/glossary-popover.mp4" />

The popover is activated by either **hover** or **keyboard focus**. The escape key can also dismiss them. For touchscreens I’m going to test that live…

~[INSERT TEST RESULTS]~

::: info Test results

it works fine. If you’ve got one of those new Apple Pencils — the *new* new one, not the new *old* one — the hover effect is magical. Touch taps are taken straight to the canonical link. The popover might be open upon return. Maybe I should cancel the popover based on touch events to avoid confusion?

:::

---

## Failures

Initially I tried to use [**CSS anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md)[^10].

[^10]: CSS Anchor Positioning: An indecipherable jumble of keywords that may or may not tether elements to one another.

I really tried. It left me in tears and I rage quit. It might be the most unintuitive, *doesn’t work like it says*, infuriating web “standard” ever. When anchoring a `popover` it’s impossible to ensure elements stay inside the viewport (without JavaScript). Please prove me wrong!

I tried to get creative with [<VPIcon icon="iconfont icon-htmx"/>view transitions](https://htmx.org/essays/view-transitions/)[^11] and failed. Safari had some pixel-shifting jank going on. I tried normal transitions with `allow-discrete` and `@starting-style` and failed. In an isolated demo it’s all gravy but together this new CSS stuff doesn’t plays nice. It’s not all [**baseline**](/dbushell.com/baseless.md)[^12] yet so let’s hope it improves. 🤞

[^11]: View Transition: Yet another web standard API for animations and transitions. They’ve become exceeding efficient at it.

[^12]: Baseline: A summary of web platform support across browsers based on spurious self-reporting and lack of real-world testing. Invented by *Big Browser*.

CSS anchors are Chrome and [Chrome derivatives (<VPIcon icon="iconfont icon-github"/>`ungoogled-software/ungoogled-chromium`)](https://github.com/ungoogled-software/ungoogled-chromium)[^13] only right now. Safari Technical Preview claims to have support but [Apple lies under oath](https://theverge.com/news/659301/apple-executive-lied-under-oath-epic-alex-roman) so who knows?

[^13]: One browser to rule them all, one browser to find them, one browser to bring them all, and in the darkness bind them.

Ultimately I gave up and used [<VPIcon icon="fas fa-globe"/>JavaScript](https://tc39.es/)[^14] to calculate position so I can support all browsers. I’ll recharge morale and tackle a v2.0 at a later date.

[^14]: [object Object]

---

## Bookmarking

I don’t plan to immediately retrofit older blog posts with glossary links. Although that could be a quick find & replace if I’m careful. I’m looking for positive feedback before I do. So let me know if you like it (or not). If no one hates it I’ll plough ahead, because I like it. This glossary may just be the third incarnation of my [**bookmarks blog**](/dbushell.com/cotton-coder.md).

I’m tempted to use a similar technique to create popover cards for [<VPIcon icon="fas fa-globe"/>linked notes](https://dbushell.com/notes/). They have more content so I need to consider that more.

::: info Sources on 'Easter Egg'(1)

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/Easter_egg_(media) "Easter egg (media)")[IGN](https://ign.com/wikis/konami/Konami_Code "Konami Code")

:::

::: info Sources on 'MDN Web Docs'(2)

[MDN](https://developer.mozilla.org "Resources for Developers, by Developers")

:::

::: info Sources on 'Markdown'(3)

```component VPCard
{
  "title": "Daring Fireball: Markdown",
  "desc": "Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML.",
  "link": "https://daringfireball.net/projects/markdown/",
  "logo": "https://daringfireball.net/favicon.ico",
  "background": "rgba(74,82,90,0.2)"
}
```

```component VPCard
{
  "title": "Hmmarkdown 2",
  "desc": "The one where I parse and render Markdown (again)",
  "link": "/dbushell.com/hmmarkdown2.md",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```

:::

::: info Sources on 'JSON'(4)

```component VPCard
{
  "title": "JSON",
  "desc": "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.",
  "link": "https://json.org/json-en.html/",
  "logo": "https://JSON.org/favicon.png",
  "background": "rgba(250,240,230,0.2)"
}
```

:::

::: info Sources on 'Web Component'(5)

[<VPIcon icon="fa-brands fa-firefox"/>Jeremy Keith](https://adactio.com/journal/20618 "HTML web components")[<VPIcon icon="fa-brands fa-firefox"/>Dave Rupert](https://daverupert.com/2024/10/super-web-components-sunshine/ "Where web components shine")[<VPIcon icon="fa-brands fa-firefox"/>Jim Nielsen](https://blog.jim-nielsen.com/2023/html-web-components/ "HTML Web Components")[<VPIcon icon="fa-brands fa-firefox"/>Zach Leatherman](https://zachleat.com/web/?category=web-components)[<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

:::

::: info Sources on '`<custom-element>`'(6)

[<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements "Using custom elements")

[**Declarative Shadow DOM**](/web.dev/declarative-shadow-dom.md)

:::

::: info Sources on 'Progressive Enhancement'(7)

```component VPCard
{
  "title": "It’s about time I tried to explain what progressive enhancement actually is",
  "desc": "Progressive enhancement hasn’t caught on nearly as much as it should. It’s likely related to folks not being able to envision it working in their real world contexts. This post attempts to alleviate that and reignite the conversation.",
  "link": "/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```

[<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)

:::

::: info Sources on 'Popover API'(8)

```component VPCard
{
  "title": "Using the Popover API for HTML Tooltips",
  "desc": "We can *mostly* use HTML alone for this API. But here, we'll use CSS to style the ",
  "link": "/master.dev/using-the-popover-api-for-html-tooltips.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<SiteInfo
  name="Popover API | 12 Days of Web"
  desc="A declarative way to display elements on top of page content."
  url="https://12daysofweb.dev/2023/popover-api/"
  logo="https://12daysofweb.dev/img/favicon.png"
  preview="https://12daysofweb.dev/img/og/popover-api.png"/>

```component VPCard
{
  "title": "Dialog is for modals, popover is for everything else",
  "desc": "<dialog> and popover are currently the only two ways to access the browser’s top layer. So what’s the difference between them and which one should you use when?",
  "link": "https://mayank.co/notes/popover-vs-dialog/",
  "logo": "https://mayank.co/favicon.ico",
  "background": "rgba(94,81,112,0.2)"
}
```

<SiteInfo
  name="Popover API - Web APIs | MDN"
  desc="The Popover API provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popover content can be controlled either using HTML attributes, or via JavaScript."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Sources on 'React'(9)

<SiteInfo
  name="JSX.lol"
  desc="Does anybody actually like React? A cherry-picked collection of React (and React-tainted) criticism."
  url="https://jsx.lol/"
  logo="https://jsx.lol/assets/favicon.svg"
  preview="https://jsx.lol/assets/512x512.png"/>

<SiteInfo
  name="React"
  desc="React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations."
  url="https://react.dev/"
  logo="https://react.dev/favicon-16x16.png"
  preview="https://react.dev/images/og-home.png"/>

:::

::: info Sources on 'CSS Anchor Positioning'(10)

[<VPIcon icon="fa-brands fa-chrome"/>Juan Diego Rodríguez](https://css-tricks.com/css-anchor-positioning-guide/ "CSS Anchor Positioning Guide | CSS-Tricks")[<VPIcon icon="fa-brands fa-chrome"/>Una Kravets](https://developer.chrome.com/blog/anchor-positioning-api "Introducing the CSS anchor positioning API")

:::

::: info Sources on 'View Transition'(11)

[<VPIcon icon="fa-brands fa-firefox"/>HTMX](https://htmx.org/essays/view-transitions/ "View Transitions")[<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API "View Transition API")

:::

::: info Sources on 'Baseline'(12)

[dbushell.com](/2025/06/01/baseless/ "Baseless")[<VPIcon icon="fa-brands fa-firefox"/>web.dev](https://web.dev/baseline "Web Platform Baseline brings clarity to information about browser support for web platform features.")[<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility "Baseline (compatibility)")

:::

::: info Sources on 'Chrome'(13)

[ungoogled-chromium (<VPIcon icon="iconfont icon-github"/>`ungoogled-software/ungoogled-chromium "Google Chromium, sans integration with Google"`)](https://github.com/ungoogled-software/ungoogled-chromium "Google Chromium, sans integration with Google")

:::

::: info Sources on 'JavaScript'(14)

[TC39](https://tc39.es "Specifying JavaScript")[TypeScript](https://typescriptlang.org "JavaScript with syntax for types")

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Glossary Web Component",
  "desc": "The one where I put the hypercard in the hyperlink",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/glossary-web-component.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
