---
lang: en-US
title: "Seeking an Answer: Why can’t HTML alone do includes?"
description: "Article(s) > Seeking an Answer: Why can’t HTML alone do includes?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Seeking an Answer: Why can’t HTML alone do includes?"
    - property: og:description
      content: "Seeking an Answer: Why can’t HTML alone do includes?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/seeking-an-answer-why-cant-html-alone-do-includes.html
prev: /programming/css/articles/README.md
date: 2025-04-29
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5713
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
  name="Seeking an Answer: Why can’t HTML alone do includes?"
  desc="Is there a perfectly clear and reasonable answer? Or could we get this someday?"
  url="https://frontendmasters.com/blog/seeking-an-answer-why-cant-html-alone-do-includes/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5713"/>

I’m obsessed with this basic web need.

You’ve got three pages:

- <FontIcon icon="fa-brands fa-html5"/>`index.html`
- <FontIcon icon="fa-brands fa-html5"/>`about.html`
- <FontIcon icon="fa-brands fa-html5"/>`contact.html`

You need to put **the same** header on all three pages.

Our developer brains scream at us to ensure that we’re not copying the exact code three times, we’re creating the header **once** then “including” it on the three (or a thousand) other pages.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/Screenshot-2025-04-29-at-11.34.15%E2%80%AFAM.png?resize=1024%2C551&ssl=1)

---

## There are so many solutions to this problem

We don’t need to list them all here. I [<FontIcon icon="fas fa-globe"/>documented *some* of them](https://css-tricks.com/the-simplest-ways-to-handle-html-includes/) one time, but there are many more.

We’ve got JavaScript to go [<FontIcon icon="fa-brands fa-firefox"/>`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) the HTML and [<FontIcon icon="fa-brands fa-firefox"/>`insert`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement) it. We’ve got [<FontIcon icon="fas fa-globe"/>old school web server directives](https://httpd.apache.org/docs/2.4/howto/ssi.html). Any [<FontIcon icon="fas fa-globe"/>static site generator](https://jekyllrb.com/docs/includes/) can do it. [Task runners (<FontIcon icon="fa-brands fa-npm"/>`gulp-include`)](https://npmjs.com/package/gulp-include) can do it. [Templating languages](https://handlebarsjs.com/guide/partials.html) tend to have include functionality. Any [<FontIcon icon="fa-brands fa-php"/>backend language](https://php.net/manual/en/function.include.php) can generate HTML on the fly. I’ve seen several [<FontIcon icon="fas fa-globe"/>Web Components](https://keithcirkel.co.uk/i-html/) purpose-built for this. We’ve got `<iframe>`, which technically is a pure HTML solution, but they are bad for overall performance, accessibility, and generally extremely awkward here, but we [<FontIcon icon="fas fa-globe"/>can extract them](https://filamentgroup.com/lab/html-includes/#another-demo%3A-including-another-html-file). We can just not worry about includes at all and trust our code editors powerful find and replace tools.

---

## But none of the solutions is HTML

None of these are a straightforward HTML tag. None of these are just some HTML way of saying “go get this HTML and put it here”, like `<img>` is for “go get this image and put it here.

---

## Why?

No, really, *why?*

I’m sure there are reasons. Normally, web standards and browsers are all about “paving the cowpaths”, that is, providing solutions around what developers are already doing. I’d wager (counts fingers) pretty much all websites need this ability, and all of them reach for different additional non-web-standard tooling to get it done. That’s *weird*.

So what are those reasons?

- Does it wreck the [<FontIcon icon="iconfont icon-webdev"/>preload scanner](https://web.dev/articles/preload-scanner)? As in, it could have very bad web performance issues?
- Would it have to be async and thus have issues with jerky/shifty loading experiences?
- Does it introduce some kind of complexity that harms the purity of HTML or something?
- Is it the difficulty of handling nested includes? Circular includes?
- Is it pushback from web hosting that a feature like this would increase web requests dramatically?
- Would the restrictions be too strict to make it useful? Like for whatever reason it’s cool to load images and CSS and JS from other domains, but HTML would likely be restricted.
- Is there something problematic about the idea that I haven’t listed here?
- Is there actually no real desire for this and I’m just a weirdo thinking there is?

If anyone has been a part of these discussions or knows exactly why this is, or you just have general thoughts, leave a comment!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Seeking an Answer: Why can’t HTML alone do includes?",
  "desc": "Is there a perfectly clear and reasonable answer? Or could we get this someday?",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/seeking-an-answer-why-cant-html-alone-do-includes.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
