---
lang: en-GB
title: "Your Framework is Showing"
description: "Article(s) > Your Framework is Showing"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - dbushell.com
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Your Framework is Showing"
    - property: og:description
      content: "Your Framework is Showing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/your-framework-is-showing-nextjs-error.html
prev: /programming/js-next/articles/README.md
date: 2025-06-13
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-06-13-your-framework-is-showing-nextjs-error.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Your Framework is Showing"
  desc="The one where I’ve had enough of the same Next.js error."
  url="https://dbushell.com/2025/06/13/your-framework-is-showing-nextjs-error/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-06-13-your-framework-is-showing-nextjs-error.png"/>

::: warning

this post criticises the React and Next.js frameworks. Cultists with a weak disposition may struggle to disassociate themselves and feel personally attacked. Take a deep breath, remember that React is a tool and not a lifestyle choice, you’ll be ok

:::

Imagine you’re browsing the web. You visit a website that appears to have fully rendered. You’re two paragraphs into reading the content and then…

![KAPOW!](https://dbushell.com/images/blog/2025/batman-slap-nextjs-error.avif)

The entire website vanishes before your very eyes!

Nothing remains but a solitary error message in the centre of a bleak page. Black text on white, or white text on black, because dark mode support is still priority.

> Application error: a client-side exception has occurred (see the browser console for more information).

You don’t need to imagine it. Just visit any domain infected by the blight that is [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/) and this error can jump scare you. Vercel’s popular [<VPIcon icon="fas fa-globe"/>React-as-a-service](https://jsx.lol/)[^1] product is a plague on the web and a liability to any business that uses it.

[^1]: A legacy JavaScript framework (turned religion). Favoured by tech bros and famous for bloated bundles and crippling web performance.

![Next.js error message](https://dbushell.com/images/blog/2025/nextjs.avif)

Maybe you’ve visited or built a Next.js thing and never seen this error? [<VPIcon icon="fa-brands fa-youtube"/>*Oh good for you!*](https://youtu.be/cF1mpV0sejs) The error is real has been reported on for months to no avail.

---

## Obliteration

There are so many things wrong with this error. Let’s start with the fact that it’s obviously not written for regular visitors. Why is it shipped in production code? It’s an error of last resort for developers and yet provides scant detail.

If a website is nothing but an error, that means something has gone catastrophically wrong to the point of no recovery. But this error occurs long after a **perfectly readable page** has rendered. It can take **several seconds** before the page vanishes. There is absolutely no need for client-side JavaScript “hydration” to obliterate an entire page.

---

## Bug Reports

Is this one bug in Next.js, or can we point the “skill issue” finger at developers? Either the framework authors, or the developers using it, are doing something very, very wrong (it’s both). Evidently, neither party are able to avoid this error.

Attempts to report the issue on the Next.js GitHub repo are automatically closed by a bot. Multiple reports include evidence of the error occurring on **nextjs.org**.

![the nextjs.org website erroring](https://dbushell.com/images/blog/2025/nextjsorg-error.avif)

The Next.js documentation is not immune to this error ([<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#79622`)](https://github.com/vercel/next.js/issues/79622))

- [<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#79622`)](https://github.com/vercel/next.js/issues/79622) — 26th May ’25
- [<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#78518`)](https://github.com/vercel/next.js/issues/78518) — 24th Apr ’25 (I tried)
- [<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#75637`)](https://github.com/vercel/next.js/issues/75637) — 04th Feb ’25
- [<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#65772`)](https://github.com/vercel/next.js/issues/65772) — 15th May ’24
- [<VPIcon icon="iconfont icon-github"/>`vercel/next.js/#48635`)](https://github.com/vercel/next.js/issues/48635) — 20th Apr ’23 (remains open)

Now in fairness *“it doesn’t work”* is not a helpful bug report. But when you’ve designed your framework to throw *“it doesn’t work”* errors in production, what do you expect? You’d think such a critical issue that randomly takes down high profile websites, including the Next.js website itself, would be a priority? Apparently not.

Considering the prevalence and longevity of this error I suspect the mountain of complexity and footguns within Next.js make it impossible to track down any one cause. Have they tried looking at “the browser console for more information”?

Whatever is at fault here, the resulting error is still a major issue unto itself. If HTML is pre-rendered on the server there is absolutely no reason to ever replace the entire page with an error, regardless of client-side bugs. **It doesn’t need to work that way.**

![Next.js was designed to work that way, graceful degradation be damned.'](https://dbushell.com/images/blog/2025/starwars-graceful-degradation.avif)

---

## Put The Framework Down

If you’re a developer, please do the web a favour by not building upon broken legacy tech. Next.js is a rotten incompetent framework with no signs of improvement. It can’t even do [<VPIcon icon="fas fa-globe"/>basic metadata](https://omarabid.com/nextjs-vercel) properly. If a framework can’t handle such fundamentals it’s **not fit for purpose**. When a framework tries to cover up embarrassing [<VPIcon icon="fas fa-globe"/>security vulnerabilities](https://eduardoboucas.com/posts/2025-03-25-you-should-know-this-before-choosing-nextjs/#security-posture), maybe it’s not a good choice?

Some — for the sake of my mentions: not you — React and Next.js [<VPIcon icon="fas fa-globe"/>fanboys](https://2024.stateofreact.com/en-US/demographics/#gender) are so [<VPIcon icon="fa-brands fa-youtube"/>trapped in a bubble](https://youtu.be/P1FLEnKZTAE) they think the web and React are synonymous. Some have learnt to code nothing else. Sorry, the web is not React. It never was. It’s time to [<VPIcon icon="fas fa-glober"/>wake up and face reality](https://javascript.plainenglish.io/why-silicon-valley-ctos-are-secretly-moving-away-from-react-bdf64f0b6072). Stop drinking the Kool-Aid and escape Facebook & Vercel’s fever dream.

Have you considered that you don’t need a JavaScript framework to build a website?

Something to think about.

::: info Sources on 'React'(1)

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

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your Framework is Showing",
  "desc": "The one where I’ve had enough of the same Next.js error.",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/your-framework-is-showing-nextjs-error.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
