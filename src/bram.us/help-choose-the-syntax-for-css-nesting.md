---
lang: en-US
title: "Help choose the syntax for CSS Nesting!"
description: "Article(s) > Help choose the syntax for CSS Nesting!"
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
      content: "Article(s) > Help choose the syntax for CSS Nesting!"
    - property: og:description
      content: "Help choose the syntax for CSS Nesting!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/help-choose-the-syntax-for-css-nesting.html
prev: /programming/css/articles/README.md
date: 2022-12-16
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/12/css-nesting-poll-again.png
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
  name="Help choose the syntax for CSS Nesting!"
  desc="The CSS Working Group is continuing a debate over the best way to define nesting in CSS. And if you are someone who writes CSS, we’d like your help."
  url="https://bram.us/2022/12/16/help-choose-the-syntax-for-css-nesting/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/12/css-nesting-poll-again.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2022/12/css-nesting-poll-again.png)

The CSS Working Group is continuing a debate over the best way to define nesting in CSS. And if you are someone who writes CSS, we’d like your help.

A while ago there was [<VPIcon icon="fa-brands fa-chrome"/>a survey on `developer.chrome.com` to help pick a syntax for CSS Nesting](https://developer.chrome.com/blog/help-css-nesting/). After that survey [<VPIcon icon="fa-brands fa-chrome"/>ended](https://developer.chrome.com/blog/help-css-nesting-results/), a few new syntax ideas have been floated within the CSS Working Group so there’s [<VPIcon icon="fa-brands fa-safari"/>a new survey, this time available on `webkit.org`](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/).

---

## The Proposals

There are currently 3 proposals that you can choose from *(taking over the order as they are listed on `webkit.org`)*:

### Top-level nesting container

which introduces a top-level `@nest` rule that contains a `& { … }` block with declarations and multiple nested style rules.

```css
@nest selector {
  & {
    property: value;
  }
  nested-selector {
    property: value;
  }
}
```

### Postfix proposal

which uses an extra code block containing the nested rules which is inserted after main rule which contains the declarations.

```css
selector {
  property: value;
} {
  nested-selector {
    property: value;
  }
}
```

### Non-letter start proposal

which needs every nested rule to be unambiguous on its own, by requiring it to start with a non-symbol. *(You can write `& div` or `:is(div)` if you need to start a selector with a type selector.)*

```css
selector {
  property: value;
  & nested-selector {
    property: value;
  }
}
```

[Over at `webkit.org`](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/), there’s a bunch of practical code examples using each of the syntaxes for you to review.

---

## Cast your vote

This is your time to be heard! [<VPIcon icon="fa-brands fa-safari"/>Head over to `webkit.org`](https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax/); after all examples you can find a block where you can cast your vote.

<SiteInfo
  name="Help choose the syntax for CSS Nesting"
  desc="The CSS Working Group is continuing a debate over the best way to define nesting in CSS."
  url="https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax//"
  logo="https://webkit.org/favicon.png"
  preview="https://webkit.org/wp-content/themes/webkit/images/preview-card.jpg"/>

Voting is easy and requires no registration or anything like that. Simply choose “Option 5”, “Option 4”, or “Option 3” and hit Submit.

---

## FAQ

::: details Q. Why can’t we just do Sass-like nesting?

If it were that easy, it would have already been done 😉

As explained in [the previous poll](https://developer.chrome.com/blog/help-css-nesting/) there’s a few reasons for this:

**1. Ambiguous parsing**

> Some nested selectors can look exactly like properties and preprocessors are able to resolve and manage them at build time. Browser engines won’t have the same affordances, selectors needs to never be loosely interpreted.
> 
> For example, if a parser starts by seeing `color:hover`, it can’t tell whether that’s the `color` property (being set to an invalid value…) or a selector for a `<color>` element. It can’t even rely on looking for valid properties to tell the difference; this would cause parsing to depend on which properties the implementation supported, and could change over time.

**2. Preprocessor parsing conflicts**

> The CSS way of nesting [shouldn’t break preprocessors (<VPIcon icon="iconfont icon-github"/>`sass/sass`)](https://github.com/sass/sass/issues/3030) or existing developer nesting workflows. This would be disruptive and inconsiderate to those ecosystems and communities.

:::

::: details No, but really, why can’t we *just* do Sass-like nesting?

The way CSS is parsed is [<VPIcon icon="iconfont icon-w3c"/>strictly defined](https://w3.org/TR/css-syntax-3/). The CSS parser works by reading a stream of bytes. While doing so, it needs to know what it is looking for. To allow this, [<VPIcon icon="iconfont icon-w3c"/>it looks up to three code points](https://w3.org/TR/css-syntax-3/#would-start-an-identifier) to determine what it’s currently handling. Relaxing the lookahead to allow more characters would cause performance issues *(CSS needs to be really fast)* and could grow out of control as it’d need to be Infinite. Sass and other preprocessor are not bound by these limitations, as [<VPIcon icon="fas fa-globe"/>per note in the Nesting Spec](https://drafts.csswg.org/css-nesting/#:~:text=style%20rule.-,Some%20non%2Dbrowser%20implementations,-of%20nested%20rules):

> Some non-browser implementations of nested rules do not impose this requirement. It is, in most cases, eventually possible to tell properties and selectors apart, but doing so requires unbounded lookahead in the parser; that is, the parser might have to hold onto an unknown amount of content before it can tell which way it’s supposed to be interpreting it. CSS to date requires only a small, known amount of lookahead in its parsing, which allows for more efficient parsing algorithms, so unbounded lookahead is generally considered unacceptable among browser implementations of CSS.

More info on parsing CSS in [<VPIcon icon="iconfont icon-w3c"/>the CSS Syntax Specification](https://w3.org/TR/css-syntax-3/) and [<VPIcon icon="fas fa-globe"/>Chapter 6 of Web Browser Engineering](https://browser.engineering/styles.html).

:::

::: details Does this mean we will never have Sass like nesting?

No. Just like [**the parent selector**](/bram.us/the-css-has-selector-is-way-more-than-a-parent-selector.md) became a possibility over time, maybe we can have Sass-like nesting at an acceptable speed in the browser in the future. That day, however, is not today.

:::

::: details What about no nesting?

[<VPIcon icon="fas fa-globe"/>CSS Nesting is the top requested feature by developers](https://2022.stateofcss.com/en-US/usage/#missing_features_freeform) so we can’t ignore it.

But here’s the good news: if you don’t like it, you don’t need to use nesting. It’s entirely optional.

:::

::: details That optional `&` is confusing in some of these proposals

It’s not that difficult when and when not to use to be honest. But if you do find it confusing, you can choose to always write the `&`. A linter can help enforce this across your team.

:::

::: details What’s up with that numbering? Why 5-4-3 instead of 1-2-3?

There have been [various syntax proposals (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md). These are actually the 3rd, 4th, and 5th variations that are being presented. Proposals 1 and 2 are no longer considered by the CSS WG, so are not included in the poll.

:::

::: details Why 5-4-3, and not 3-4-5?

Beats me 🤷‍♂️

:::

::: details Is there a 1-page summary weighing all proposals?

This [overview page of all proposals (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/blob/main/css-nesting-1/proposals.md) has a table showing all pros and cons for each. Note that proposals 1 and 2 are no longer considered.

:::

::: details Which proposal do you like?

I don’t want to be accused of influencing the results here, so I’ll keep my opinion to myself. I formed my opinion by trying out the various syntaxes on some existing CSS I had laying around, and kept track whether if it was easy for me to do or not:

- Do I need to adjust other things in the code when pasting in a nested ruleset?
- Do I need to jump around in my code when pasting in a nested ruleset?
- Does the concept of nesting resonate with other languages that allow nesting?
- Can any possible ambiguities be circumvented?
- Is the resulting code readable to me?
- …

:::

::: details How long does the survey run?

The survey will run until Dec 21, right before CSSWG meeting of that week.

:::

::: details I can’t seem to vote – The page only shows me the results?!

Initially there were some caching issues going on with the page, but these should be resolved now. If you still run into this, try adding a random querystring (e.g. `?asfwe`) to the URL.

:::

<SiteInfo
  name="Help choose the syntax for CSS Nesting"
  desc="The CSS Working Group is continuing a debate over the best way to define nesting in CSS."
  url="https://webkit.org/blog/13607/help-choose-from-options-for-css-nesting-syntax//"
  logo="https://webkit.org/favicon.png"
  preview="https://webkit.org/wp-content/themes/webkit/images/preview-card.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Help choose the syntax for CSS Nesting!",
  "desc": "The CSS Working Group is continuing a debate over the best way to define nesting in CSS. And if you are someone who writes CSS, we’d like your help.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/help-choose-the-syntax-for-css-nesting.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
