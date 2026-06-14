---
lang: en-US
title: "Barriers from Links with ARIA"
description: "Article(s) > Barriers from Links with ARIA"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Barriers from Links with ARIA"
    - property: og:description
      content: "Barriers from Links with ARIA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/barriers-from-links-with-aria.html
prev: /programming/css/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2026/01/chrome-reader-view_aria-hidden-links-300x300.jpg
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
  name="Barriers from Links with ARIA"
  desc="Today Temani Afif asked a question: Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?) If not, what is missing (or should be changed) in the second code CSS by T. Afif (@css@front-end.social) 22 January 2026, 2:52pm I have my canned response that…"
  url="https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/01/chrome-reader-view_aria-hidden-links-300x300.jpg"/>

Today Temani Afif asked a question:

::: info CSS by T. Afif (<VPIcon icon="fa-brands fa-mastadon"/><code>front-end.social</code>) 22 January 2026, 2:52pm

> Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?)
>
> If not, what is missing (or should be changed) in the second code
>
> ![](https://adrianroselli.com/wp-content/uploads/2026/01/temani-afif_masto-post.png)

<SiteInfo
  name="CSS by T. Afif :verified: (@css@front-end.social)"
  desc="Attached: 1 image Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?) If not, what is missing (or should be changed) in the second code #CSS #HTML #A11y"
  url="https://front-end.social/@css/115940496288155021/"
  logo="/packs/assets/favicon-48x48-DMnduFKh.png"
  preview="https://cdn.masto.host/frontendsocial/media_attachments/files/115/940/490/900/820/545/original/53aeea9c851cedc0.png"/>

:::

I have my canned response that [**`aria-label` auto-translation is inconsistent**](/adrianroselli.com/aria-label-does-not-translate.md).

But the something else maybe question is what reminded me that this construct has caused issues outside of WCAG concerns. In particular, the only [**assistive technologies**](/adrianroselli.com/at-is-more-than-screen-readers.md) (AT) that consume ARIA are screen readers and, to a far lesser extent, voice control. That latter part only because browsers assemble the accessible names, not AT. There’s plenty more AT that never touches ARIA.

I knew there were issues, but couldn’t rattle them off from the top of my head. So I built some examples and poked them with other accessibility features of browsers.

---

## Results

I am not testing screen readers nor voice control.

- The text with each letter in its own span does not auto-translate..
- Edge’s Read Aloud feature (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) does not announce the `aria-label` value of any link.
- Edge’s Read Aloud feature does not announce the links with `aria-hidden`, regardless of other attributes.
- Chrome’s reader mode text-to-speech does not announce the `aria-label` value of any link.
- Chrome’s reader mode text-to-speech does not announce the links with `aria-hidden`, regardless of other attributes.
- Chrome’s reader mode visually hides every link with `aria-hidden`.
- Firefox’s reader mode visually hides every link with `aria-hidden`.
- Firefox’s reader mode visually styled every link that spanned its letters as white instead of blue or purple.
- Safari’s Speech feature jumps past most of the page when it gets to the first instance of letters split across spans, and announces subsequent links with the wrong link text (using the Korean text for English links).
- Safari’s Speech feature does not announce the `aria-label` value of any link.
- Safari’s Speech feature does not announce the span-separated letters nor visible word they make up.
- Chrome and Edge would not let me link to the highlighted text when I highlighted the `aria-hidden` links, though that changed when I got more content on the page.

[<VPIcon icon="fas fa-globe"/>As Amelia Bellamy-Royds points out](https://front-end.social/@AmeliaBR/115940740106574818), the text-to-speech features seem to respect the `aria-hidden` but ignore the `aria-label` — and by extension the accessible name the browser provides in the accessibility tree.

::: important Takeaways

Three key takeaways here (yes, I know your use case is special):

1. Don’t use `aria-label` on links;
2. Don’t use `aria-hidden` within links;
3. Don’t split the letters of a word across elements.

:::

I look forward to you, dear reader, trying other approaches and letting me know where these fall down (or what I got wrong). I don’t need to know where they are supported. Just the gaps.

---

## Tests

These are the tests I used to generate the results you just read ([originally as a Codepen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://codepen.io/aardrian/pen/EayvaBL)). You can ignore this part unless you want to run your own tests. If you want to find other ways these approaches might break for users, then please do so.

I used the Korean words 샌드위치 for “sandwich” and 망치 for “hammer” (the values of `aria-label`).

The links with `aria-label` all fail WCAG SC [<VPIcon icon="iconfont icon-w3c"/>2.5.3 Label in Name](https://w3.org/WAI/WCAG22/Understanding/label-in-name.html), but it’s intentional so I can quickly tell if the `aria-label` is exposed. Similarly, the links with `aria-hidden` and no `aria-label` fail [<VPIcon icon="iconfont icon-w3c"/>4.1.2 Name, Role, Value](https://w3.org/WAI/WCAG22/Understanding/name-role-value.html), but again I wanted to see how they performed.

### 1. Standard link

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich">
  Sandwich
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)


```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  샌드위치
</a>
```

### 2. Link with `aria-label`

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  Sandwich
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  샌드위치
</a>
```

:::

### 3. Link with each letter of visible text in its own `<span>`

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich">
  <span>
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

with each letter of visible text in its own `<span>`

```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  <span>
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

:::

### 4. Link with `aria-label` and each letter of visible text in its own `<span>`

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  <span>
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  <span>
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

:::

### 5. Link with `aria-hidden` on visible text with each letter of visible text in its own `<span>`

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich">
  <span aria-hidden="true">
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko">
  <span aria-hidden="true">
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

:::

### 6. Link with `aria-label` and `aria-hidden` on visible text with each letter of visible text in its own `<span>`

::: tabs

@tab:active [<VPIcon icon="fa-brands fa-wikipedia-w"/>Sandwich](https://en.wikipedia.org/wiki/Sandwich)

```html
<a href="https://en.wikipedia.org/wiki/Sandwich" aria-label="hammer">
  <span aria-hidden="true">
    <span>S</span><span>a</span><span>n</span><span>d</span><span>w</span><span>i</span><span>c</span><span>h</span>
  </span>
</a>
```

@tab [<VPIcon icon="fa-brands fa-wikipedia-w"/>샌드위치](https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98)

```html
<a href="https://ko.wikipedia.org/wiki/%EC%83%8C%EB%93%9C%EC%9C%84%EC%B9%98" hreflang="ko" lang="ko" aria-label="망치">
  <span aria-hidden="true">
    <span>샌</span><span>드</span><span>위</span><span>치</span>
  </span>
</a>
```

:::

Don’t be shy about making your own variations and leaving your results in the comments.

::: note Update: 5 February 2026

You know what? Just [**don’t split words into letters**](/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.md). It’s not just a problem with links, even if it’s more excitingly wrong with links.

:::

::: info Other Posts

```component VPCard
{
  "title": "Live Region Support",
  "desc": "This post does not discuss whether live regions are good, nor is it a post about the best way to use them. This post only covers how they are exposed to the audience who experiences them — screen reader users. Written by a non-screen-reader user. If you’re here because your…",
  "link": "/adrianroselli.com/live-region-support.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

```component VPCard
{
  "title": "You Know What? Just Don’t Split Words into Letters",
  "desc": "This is an unplanned part two for Barriers from Links with ARIA. The title reflects my exasperation because this isn’t new, I’ve simply failed to be explicit about it over the last decade or so. In 2012 I vented about TypeButter using <kern style=”letter-spacing: -0.01em;”> for each letter. In 2020…",
  "link": "/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Barriers from Links with ARIA",
  "desc": "Today Temani Afif asked a question: Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?) If not, what is missing (or should be changed) in the second code CSS by T. Afif (@css@front-end.social) 22 January 2026, 2:52pm I have my canned response that…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/barriers-from-links-with-aria.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
