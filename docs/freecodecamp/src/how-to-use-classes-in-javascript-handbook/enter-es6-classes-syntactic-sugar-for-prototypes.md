---
lang: en-US
title: "Enter ES6 Classes: Syntactic Sugar for Prototypes"
description: "Article(s) > (10/12) How to Use Classes in JavaScript - A Handbook for Beginners"
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (10/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Enter ES6 Classes: Syntactic Sugar for Prototypes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-classes-in-javascript-handbook/enter-es6-classes-syntactic-sugar-for-prototypes.html
date: 2025-02-18
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Use Classes in JavaScript - A Handbook for Beginners",
  "desc": "Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was...",
  "link": "/freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Classes in JavaScript - A Handbook for Beginners"
  desc="Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was..."
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-enter-es6-classes-syntactic-sugar-for-prototypes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

You see, in 2015, JavaScript developers recognized that using prototypes and constructor functions directly to achieve class-like patterns could become verbose and less straightforward to manage as applications grew. Therefore, they introduced the `class` syntax in ECMAScript 2015 (ES6).

Classes in JavaScript provide a much cleaner and more familiar way to create object blueprints and set up inheritance. But here’s the super important thing to remember: JavaScript classes are still built on top of prototypes. They don't fundamentally change how JavaScript OOP works. They are just syntactic sugar - a nicer, easier way to write code that's still using prototypes behind the scenes.

In the next section, we'll see how to rewrite our `Person`, `DeveloperPerson`, and `JavaScriptDeveloperPerson` examples using the new `class` syntax, and you'll see how much cleaner and more class-like (pun intended) it feels, while using the power of JavaScript prototypes.
