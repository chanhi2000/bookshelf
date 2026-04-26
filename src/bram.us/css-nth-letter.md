---
lang: en-US
title: "CSS :nth-letter()"
description: "Article(s) > CSS :nth-letter()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS :nth-letter()"
    - property: og:description
      content: "CSS :nth-letter()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-nth-letter.html
prev: /programming/css/articles/README.md
date: 2012-04-13
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: 
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

```component VPCard
{
  "title": "CSS :nth-letter()",
  "desc": "Adobe is working on implementing :nth-letter() in Webkit: The desired syntax was :nth-letter(), where the argument would (ideally) take the same values that :nth-child() can (e.g, a simple index, even/odd, or an expression like 2n+4). This code: My fourth letter is awesome.",
  "link": "https://bram.us/2012/04/13/css-nth-letter/",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(undefined,0.2)"
}
```

Adobe is working on implementing `:nth-letter()` in Webkit:

> The desired syntax was `:nth-letter()`, where the argument would (ideally) take the same values that `:nth-child()` can (e.g, a simple index, `even`/`odd`, or an expression like `2n+4`).

This code:

```html
<p id="sentence">My fourth letter is awesome.</p>
```

```css
#sentence:nth-letter(3) {
  color: red;
  font-family: "Comic Sans MS";
  font-size: 3em;
  font-weight: bold;
}
```

Results in this:

![nth-letter](https://bram.us/wordpress/wp-content/uploads/2012/04/nth-letter-560x405.png)

Whenever a final implementation lands, along with `:nth-word()` and the like, I guess we can say goodbye to [<VPIcon icon="fas fa-globe"/>lettering.js](http://letteringjs.com/)

[~~<VPIcon icon="iconfont icon-adobe"/>Adobe WebKit Hackathon Summary →~~](http://blogs.adobe.com/webplatform/2012/03/22/adobe-webkit-hackathon-summary/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS :nth-letter()",
  "desc": "Adobe is working on implementing :nth-letter() in Webkit: The desired syntax was :nth-letter(), where the argument would (ideally) take the same values that :nth-child() can (e.g, a simple index, even/odd, or an expression like 2n+4). This code: <p id=”sentence”>My fourth letter is awesome.</p> #sentence:nth-letter(3) { color: red; font-family: ”Comic Sans MS”; font-size: 3em; font-weight: bold; … Continue reading ”CSS :nth-letter()”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-nth-letter.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
