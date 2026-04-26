---
lang: en-US
title: "Three important things you should know about CSS :is()"
description: "Article(s) > Three important things you should know about CSS :is()"
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
      content: "Article(s) > Three important things you should know about CSS :is()"
    - property: og:description
      content: "Three important things you should know about CSS :is()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/three-important-things-you-should-know-about-css-is.html
prev: /programming/css/articles/README.md
date: 2021-03-19
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/03/css-is.png
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
  name="Three important things you should know about CSS :is()"
  desc="Back in 2019 I shared how the CSS :is() selector will simplify things when writing CSS. What I didn’t know back then, and only have learnt quite recently, are these three important facts about CSS :is(): The selector list of :is() is forgiving The specificity of :is() is that of its most specific argument :is() … Continue reading ”Three important things you should know about CSS :is()”"
  url="https://bram.us/2021/03/19/three-important-things-you-should-know-about-css-is/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/03/css-is.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/03/css-is.png)

Back in 2019 I shared how [**the CSS `:is()` selector will simplify things**](/bram.us/how-the-css-is-selector-will-simplify-things.md) when writing CSS. What I didn’t know back then, and only have learnt quite recently, are these three important facts about [<VPIcon icon="iconfont icon-w3c"/>CSS `:is()`](https://w3.org/TR/selectors-4/#matches):

Let’s take look at what that means.

---

## 1. The selector list of `:is()` is forgiving

What if you include a selector that’s pure gibberish inside `:is()`? Will the [<VPIcon icon="fas fa-globe"/>rule-set](http://apps.workflower.fi/vocabs/css/en#rule-set) be declared invalid or what?

```css
p:is(.foo, #bar, $css:rocks) {
  color: hotpink;
}
```

Thankfully `:is()` is very forgiving here: **the `$css:rocks` part — which in itself is an invalid CSS selector — will simply be ignored, while keeping the rest of the selector list in place.**. So using the snippet above, both `p.foo` and `p#bar` will be colored `hotpink`. Yay!

Should you try this without `:is()`, the whole rule-set would become invalid. In the snippet below, none of the paragraphs will be `hotpink` due to that faulty `$css:rocks` selector invalidating the whole selector list.

```css
p {
  font-family: sans-serif;
}

p.foo, p#bar, p$css:rocks { /* ❌ This whole rule-set is declared invalid */
  color: hotpink;
}
```

Note that the paragraphs will have `font-family: sans-serif` applied, as it’s only the invalid rule-set that ends up being ignored.

::: info 🔮

In the near future this latter behavior will no longer be the case as the CSSWG intends to modify these rules such that an invalid selector will simply be ignored rather than invalidating the whole selector list. Relevant CSS WG Issue: [3264 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/3264)

:::

---

## 2. The specificity of `:is()` is that of its most specific argument

Take the code below. What color will `p.foo` have?

```css
p:is(.foo, #bar, $this:invalid) {
  color: hotpink;
}

p.foo {
  color: lime;
}
```

I won’t be `lime` but `hotpink`! This because [<VPIcon icon="iconfont icon-w3c"/>when calculating the specificity](https://w3.org/TR/selectors-4/#specificity-rules), **the specificity of the `:is()` pseudo-class is replaced by the specificity of its most specific argument.**

- `p.foo` has a specificity of `(0,1,1)`
- `p:is(.foo, #bar)` has a specificity of `(1,0,1)`

As `p:is(.foo, #bar)` has a higher specificity, it will “win” here.

::: note ☝️

The `:not()` and [**`:has()`**](/css-tricks.com/did-you-know-about-the-has-css-selector.md) pseudo-classes also have their specificity calculated this way.

:::

::: note ☝️

If you don’t want to be affected by this, you can use [<VPIcon icon="iconfont icon-w3c"/>`:where()`](https://w3.org/TR/selectors-4/#zero-matches) instead of `:is()`. It works in the same way `:is()` does, but will always have a specificity of `0`. You can cleverly wrap this around other selectors to undo their specificity. Think of `:where(:not(…))` for example.

:::

::: note 😬

Although I wouldn’t recommend it, you could perfectly do something like `:is(#bump#up#the#spe#ci#fi#city#yo, .foo)` to override selectors more specific than `.foo` …

:::

---

## 3. `:is()` does not work with pseudo-element selectors *(for now)*

If you read up on [<VPIcon icon="iconfont icon-w3c"/>the definition of `:is()`](https://w3.org/TR/selectors-4/#matches) you’ll read that it accepts a [<VPIcon icon="iconfont icon-w3c"/>“Selector List”](https://w3.org/TR/selectors-4/#selector-list) which is a comma-separated list of simple, compound, or complex selectors.

When looking up [<VPIcon icon="iconfont icon-w3c"/>simple selectors](https://w3.org/TR/selectors-4/#simple), there’s an interesting thing to note:

> A type selector, universal selector, attribute selector, class selector, ID selector, or pseudo-class is a simple selector.

Do you see it? Here: pseudo-element selectors are not included in this list. **As a result, `:is()` does not play nice with pseudo-element selectors such as `::before`, `::after`, ….**

::: info 🔮

In the future this will become possible though, but not just yet. Relevant CSSWG Issue: [2284 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2284#issuecomment-541909879)

:::

Knowing these three facts about `:is()` will surely help you understand it better and make using it more fun!

<CodePen
  user="bramus"
  slug-hash="KKNjXez"
  title="The CSS :is() pseudo-class. What color will .foo have?"
  :default-tab="['css','result']"
  :theme="dark"/>

If you understood well, the Pen above should hold no secrets to you anymore 🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Three important things you should know about CSS :is()",
  "desc": "Back in 2019 I shared how the CSS :is() selector will simplify things when writing CSS. What I didn’t know back then, and only have learnt quite recently, are these three important facts about CSS :is(): The selector list of :is() is forgiving The specificity of :is() is that of its most specific argument :is() … Continue reading ”Three important things you should know about CSS :is()”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/three-important-things-you-should-know-about-css-is.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
