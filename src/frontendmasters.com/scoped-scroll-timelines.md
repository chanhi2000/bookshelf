---
lang: en-US
title: "(Up-) Scoped Scroll Timelines"
description: "Article(s) > (Up-) Scoped Scroll Timelines"
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
      content: "Article(s) > (Up-) Scoped Scroll Timelines"
    - property: og:description
      content: "(Up-) Scoped Scroll Timelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/scoped-scroll-timelines.html
prev: /programming/css/articles/README.md
date: 2024-11-11
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4365
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
  name="(Up-) Scoped Scroll Timelines"
  desc="You can give a name ("
  url="https://frontendmasters.com/blog/scoped-scroll-timelines/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4365"/>

I keep learning little details about scroll-driven animations!

I started this little journey thinking about if you wanted to do [**special styling when a page scrolled through a certain section**](/frontendmasters.com/scroll-driven-sections.md). I thought then that in order to pass scrolling information to descendants, you’d have to do it with `--custom-properties`. That’s sometimes still a decent idea, but it’s not strictly true, as [**those descendants can inherit a named timeline**](/frontendmasters.com/named-scroll-view-timelines.md) and tap into that to do styling on themselves.

Then I thought, while that’s a nice improvement, it’s still limited in the sense that only descendants can tap into a higher-up-the-DOM element’s timeline. Like an enforced parent/child situation. Turns out this isn’t true either, and again [<VPIcon icon="fas fa-globe"/>thanks to Bramus](https://frontendmasters.com/blog/named-scroll-view-timelines/#comment-14690) for showing me how it works.

Since we’re three-deep here on this journey, I figure calling it a series makes sense:

::: info Article Series

1. [Scroll-Driven… Sections](https://frontendmasters.com/blog/scroll-driven-sections/)
2. [Named Scroll & View Timelines](https://frontendmasters.com/blog/named-scroll-view-timelines/)
3. [(Up-) Scoped Scroll Timelines](https://frontendmasters.com/blog/scoped-scroll-timelines/)

:::

::: warning

Fair warning all this stuff is Chrome ‘n’ friends only right now. But I’ve seen flags in both Safari and Firefox so it’s coming along.

:::

---

##  timeline of a totally different element.

That’s the rub.

I wrongly assumed it had to be a parent/child thing (or parent/descendant). By default, that’s true, but if you intentionally move the scope of the timeline to another element up the DOM, you can make it work for any elements.

![I’ll illustrate](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/timeline-diagram.png?resize=1024%2C552&ssl=1)

Demo of that:

<CodePen
  user="team/codepen"
  slug-hash="LYwMdVq"
  title="Scroller and Changer Siblings"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: 되는지 확인 -->

The idea above is that you scroll the element on the top and the element below rotates. They are sibling elements though, so this is only possibly by “hoisting” the `scroll-timeline` to a higher-in-the-DOM element with `timeline-scope` so that the other element can pick up on it.

My ridiculous head thought of trying to make a quiz game or some kind of unlocking puzzle with getting scroll positions just right. I proved out the idea here:

<CodePen
  user="chriscoyier"
  slug-hash="eYqPWjK"
  title="Scroll and Count in CSS Only"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There are a bunch of abused CSS tricks in there:

1. Declare a custom property with @property so it’s value can be animated
2. Make a scrolling element with a `scroll-timeline`
3. Hoist that timeline up to a parent element
4. Have the “number” element explicitly use that timeline
5. Make the @keyframes animate that `<integer>` custom property
6. Display the number using a pseudo element and `counter()`
7. Use `@container style()` queries to check when the custom property is exactly the “answer” and update styling.

Phew. It all kinda leads up to that very last step where we can react to a value that came from a user scrolling. It might be a fun little project to build a bike lock number-twister thing with this.

::: info Article Series

1. [Scroll-Driven… Sections](https://frontendmasters.com/blog/scroll-driven-sections/)
2. [Named Scroll & View Timelines](https://frontendmasters.com/blog/named-scroll-view-timelines/)
3. [(Up-) Scoped Scroll Timelines](https://frontendmasters.com/blog/scoped-scroll-timelines/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "(Up-) Scoped Scroll Timelines",
  "desc": "You can give a name (",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/scoped-scroll-timelines.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
