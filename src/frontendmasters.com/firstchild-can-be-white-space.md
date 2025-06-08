---
lang: en-US
title: "firstChild can be white space"
description: "Article(s) > firstChild can be white space"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > firstChild can be white space"
    - property: og:description
      content: "firstChild can be white space"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/firstchild-can-be-white-space.html
prev: /programming/css/articles/README.md
date: 2025-06-05
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6040
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
  name="firstChild can be white space"
  desc="Just a tiny gotcha. "
  url="https://frontendmasters.com/blog/firstchild-can-be-white-space/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6040"/>

This is one of those things that bit me just the other day so I figured I’d write up. It’s a fairly simple concept and maybe it’s not something you’d be confused by, but like I said, it got me!

What is the first child of the section here?

```html
<section>
  <div></div>
</div>
```

The `<div>` is the first child of the `<section>`, right? [Wrong! (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/GgJZmpv?editors=1012) Well, if we’re talking about `.firstChild` in JavaScript, anyway. The actual `firstChild` here is what is called a “text node” which will have a value of `"\n "`. It’s the white space! The return and space before the `<div>` hits.

(These are just placeholder HTML elements for illustration, they could be any HTML elements.)

If the HTML were like this:

```html
<section><div></div></section>
```

*Then* the `firstChild` of the section would be the `<div>`.

This same “problem” would be true if there was an HTML comment like `<!-- this -->` between the `<section>` and the `<div>`.

If we wanted to ensure we were getting the first actual HTML element child, we could use a different method. We’d use `.firstElementChild` instead, which will skip over text nodes and get the first actual HTML element, if there is one. (That’s what helped me.)

I guess I found it confusing as it’s normally not the case that you select text nodes. I don’t even think of them as “selectable” generally. For instance, `section :first-child` in CSS as a selector will certainly select the `<div>` not the white space. And if you used that selector in `querySelector` it would do the same. And if you were to look at the `.children` of either HTML scenario above, you’d find a single child that is the `<div>`. So `.children[0]`, which you could be forgiven for thinking would be equal to `.firstChild` are not indeed equal.

Just a little thing you might need to know: the `.firstChild` method (and `.lastChild`!) will return a text node if there is white space (or, of course, other text) within an element.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "firstChild can be white space",
  "desc": "Just a tiny gotcha. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/firstchild-can-be-white-space.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
