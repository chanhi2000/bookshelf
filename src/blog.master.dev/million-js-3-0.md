---
lang: en-US
title: "Million.js 3.0"
description: "Article(s) > Million.js 3.0"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Million.js 3.0"
    - property: og:description
      content: "Million.js 3.0"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/million-js-3-0.html
prev: /programming/js-react/articles/README.md
date: 2024-01-15
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/509
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Million.js 3.0"
  desc="Million.js caught my eye a few months back because of the big claim it makes: Make React 70% faster. I ended up listening to a podcast with the creator, and the meat of it is: it removes the need for “diffing” the virtual DOM that React uses when re-rendering to find what needs to change, which […]"
  url="https://blog.master.dev/million-js-3-0/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/509"/>

[<VPIcon icon="fas fa-globe"/>Million.js](https://million.dev/) caught my eye a few months back because of the big claim it makes: **Make React 70% faster.** I ended up listening to [<VPIcon icon="fas fa-globe"/>a podcast with the creator](https://syntax.fm/show/658/supper-club-make-react-70-faster-million-js-with-18-year-old-aiden-bai), and the meat of it is: it removes the need for “diffing” the virtual DOM that React uses when re-rendering to find what needs to change, which can be slow. I see the project still has momentum, now [<VPIcon icon="fas fa-globe"/>reaching 3.0](https://million.dev/blog/million-3).

Skeptical? Good — it’s your job to be skeptical. If this is so amazing, why doesn’t React itself do it? Potential answer: it requires a compiler. That’s a pretty big directional shift for React and I could see them never wanting to go down that road. Although I say that but I’m even *more* surprised that React will have server requirements (presumably, with [<VPIcon icon="fas fa-globe"/>server components](https://joshwcomeau.com/react/server-components/), right?) And do I *actually* need this? How complex does my project need to be before I can actually feel React being slow in diffing? What is my technical debt here? How much of my code base has to change to accommodate this? What is this project dies out, where does that leave me? Is there any entirely un-biased endorsements or critical reviews out there to find?

I can’t answer all this for you. I just bring it up because it’s my goal with Boost to get you thinking like you need to think to become a senior developer, and this is part of how.

```component VPCard
{
  "title": "React Compiler Linting Just Got a Rust-Native Speedup in Oxlint",
  "desc": "The React team made a big splash recently when it announced the release of the Rust rewrite of React Compiler and said that it would be the new canonical version of the compiler going forward. I’ve been on the React Compiler train to enable reliable performance on my AI website builder Outlyne for almost a […]",
  "link": "/blog.master.dev/react-compiler-linting-just-got-a-rust-native-speedup-in-oxlint.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "React Internals: Which useEffect runs first?",
  "desc": "It's not particularly obvious, but a child's useEffect will run before a parent's will. Let's look at why.",
  "link": "/blog.master.dev/react-internals-which-useeffect-runs-first.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "React Now Rusted All The Way Out",
  "desc": "The transition to the Rust version of the React Compiler for the 1,036-file React Router codebase resulted in a significant speed increase, improving build times from 14.3 seconds to 0.81 seconds. The new compiler addresses previous limitations and ensures consistency across the toolchain, making it easier to manage builds with enhanced performance and capabilities.",
  "link": "/blog.master.dev/react-now-rusted-all-the-way-out.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Million.js 3.0",
  "desc": "Million.js caught my eye a few months back because of the big claim it makes: Make React 70% faster. I ended up listening to a podcast with the creator, and the meat of it is: it removes the need for “diffing” the virtual DOM that React uses when re-rendering to find what needs to change, which […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/million-js-3-0.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
