---
lang: en-US
title: "How CSS works: Understanding the cascade"
description: "Article(s) > How CSS works: Understanding the cascade"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How CSS works: Understanding the cascade"
    - property: og:description
      content: "How CSS works: Understanding the cascade"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-css-works-understanding-the-cascade.html
prev: /programming/css/articles/README.md
date: 2018-05-29
isOriginal: false
author:
  - name: Benjamin Johnson
    url: https://blog.logrocket.com/author/bjohnson/
cover: /assets/image/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png
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
  name="How CSS works: Understanding the cascade"
  desc="A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web […]"
  url="https://blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-css-works-understanding-the-cascade/banner.png"/>

A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web development space, CSS is one of those key things to know. Whether you’re into CSS-in-JS or you’d rather just have plain ol’ CSS, knowing how CSS works under the hood is crucial for writing efficient, scalable CSS.

The [**first post in this series**](/blog.logrocket.com/how-css-works-parsing-painting-css-in-the-critical-rendering-path.md) was a deep dive into how the browser actually renders CSS to pixels. In this second post, we’ll dive into an often-misunderstood feature of the CSS language — the cascade.

The cascade is inherent to working with CSS — after all, it is what gives “Cascading Style Sheets” their _cascading_ nature. The cascade can be a powerful tool, but using it wrong can lead to brittle stylesheets that give front-end developers nightmares any time they have to make a change. As we dive into the cascade, we’ll also look at a few ways to keep the cascade from getting out of hand.

---

## Defining thecascade

Since we’ll be talking about the specifics of _how_ the CSS Cascade works, it’ll be helpful for us all to be on the same page.

::: info <VPIcon icon="iconfont icon-w3c"/>CSS Cascade Level 4 Spec

Here’s the definition from the [<VPIcon icon="iconfont icon-w3c"/>CSS Cascade Level 4 Spec](https://w3.org/TR/css-cascade-4/#cascading).

> The cascade takes a unordered list of declared values for a given property on a given element, sorts them by their declaration’s precedence, and outputs a single cascaded value.

```component VPCard
{
  "title": "CSS Cascading and Inheritance Level 4",
  "desc": "The cascade takes an unordered list of declared values for a given property on a given element, sorts them by their declaration’s precedence as determined below, and outputs a single cascaded value.",
  "link": "https://w3.org/TR/css-cascade-4/#cascading/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

The CSS Cascade is the algorithm by which the browser decides which CSS styles to apply to an element — a lot of people like to think of this as the style that “wins”.

To understand the CSS cascade better, it’s helpful to think of a CSS declaration as having “attributes”. These attributes could be various parts of the declaration — like the selector or the CSS properties — or they can be related of *where* the CSS declaration exists (like it’s origin or the position in the source code).

The CSS cascade takes a few of these attributes and assigns each of them a weight. If a CSS rule wins at a higher-priority level, that’s the rule that gets wins.

However, if there are two rules still in conflict at a given weight, the algorithm will continue to “cascade down” and check the lower-priority attributes until it finds one that wins.

Here are the attributes that the CSS Cascade algorithm checks, listed in order from _highest weight_ to _least weight_.

1. Origin & Importance
2. Selector Specificity
3. Order of Appearance
4. Initial & Inherited Properties (default values)

Don’t worry, we’ll get into each of these in-depth.

![](https://storage.googleapis.com/blog-images-backup/1*2H5cnv_UzdWhAwB6KOAOhg.png)

### Origin & importance

The highest weighted attribute that the cascade checks is a combination of the _importance_ and the _origin_ of a given rule.

As far as the _origin_ of a CSS rule goes, there are three places that a rule can come from.

1. **_User-Agent_**: These are the default styles provided for the element by the browser. This is why inputs can look slightly different on different browsers, and it’s also one of the reasons that people like to use CSS resets, to make sure that user-agent styles are overridden.
2. **_User_**: These are defined and controlled by the user of the browser. Not everyone will have one, but when people do add one, it’s usually for overriding styles & adding accessibility to websites.
3. **_Author_**: This is CSS declared *by the HTML document*. When we’re writing stuff as front-end developers this is really the only origin that we have in our control.

The *importance* of a CSS declaration is determined by the appropriately-named`!important` syntax. Adding`!important` to a CSS rule automatically jumps it to the front of the cascade algorithm, which is why it’s often discouraged. Overriding styles that use`!important` can only be done with other rules that use`!important`, which over time can make your CSS more brittle. Many people (myself included) recommend that you only use`!important` as an escape hatch for when all else fails (such as when working with 3rd-party styles).

The cascade algorithm considers the _combination_ of these 2 attributes when figuring out which declaration wins. Each combination is given a weight (similar to the way parts of a CSS declaration are weighted), and the declaration with the highest weight wins. Here are the various combinations of origin & importance that the browser considers, listed in order from _highest weight_ to _least weight_.

1. User-Agent &`!important`
2. User &`!important`
3. Author &`!important`
4. CSS Animations, `@keyframes` (This is the only exception, it is still originating from the _author_, but as animations are temporary/fleeting the browser weights them slightly higher than normal author rules)
5. Author, normal weight
6. User, normal weight
7. User agent, normal weight

When the browser comes up against 2 (or more) conflicting CSS declarations and one wins at the origin & importance level, the CSS cascade resolves to that rule. No questions asked. Game over.

However, if the conflicting declarations have the same level of importance/origin, the cascade moves on to consider _selector specificity_.

#### Selector specificity

The second weight in the CSS cascade is _selector specificity_. In this tier, the browser looks at the _selectors_ used in the CSS declaration.

As a front-end developer, you only have control over the “author” origin stylesheets on your websites — you can’t do much to change the _origin_ of a rule. However, if you’re staying away from using`!important` in your code, you’ll find that you have a lot of control over the cascade at the specificity tier.

Similar to the way that the combinations of origin & importance each have their own weight, different types of CSS selectors are assigned priority. When evaluating specificity, the number of selectors and their priority are considered. CSS selectors can belong to one of the following weighted tiers.

1. Inline styles (anything inside a `style` tag)
2. ID selectors
3. Classes / pseudo-selectors
4. Type selectors (for example, `h1`) & pseudo-elements (`::before`)

If you have 2 CSS declarations with the same number of high-priority selectors, the resolution algorithm will consider the number of selectors at the next level of specificity. For example, if both of these CSS rules were targeting the same element, the color would be red. This is because they both have 1 `id` selector, but the second rule has 2 `class` selectors.

```css
#first .blue h1 {
  color: blue;
}

#second .red.bold h1 {
  color: red;
}
```

Many people like to manage specificity by simply *not relying on it*. Keeping your selector specificity low makes sure that your CSS rules stay flexible.

In my experience, if you default to only using `class` selectors for your custom styles and `element` selectors for your default styles, it’s *way* easier to override styles when you actually need to. If your CSS declarations have very high selector specificity you find yourself resorting to`!important` more and that can get ugly pretty quickly.

#### Source order

The last main tier of the CSS cascade algorithm is resolution by *source order*. When two selectors have the same specificity, the declaration that comes last in the source code wins.

Since CSS considers source order in the cascade, the order in which you load your stylesheets actually matters. If you’ve got 2 stylesheets linked in the head of your HTML document, the second stylesheet will override rules in the first stylesheet. This is also the reason that if you’re using a CSS reset or a CSS framework, you’ll want to load that *before* your custom styles.

#### Initial & inherited properties

While initial & inherited values aren’t truly part of the CSS cascade, they do determine what happens if there are *no CSS declarations* targeting the element. In this way, they determine default values for an element.

Inherited properties will trickle down from parent elements to child elements. For example, the `font-family` & `color` properties are inherited. This behavior is what most people think of when they see the word “cascade” because styles will trickle down to their children.

In the following example, the `<p>` tag will render with a monospace font & red text, since its parent node contains those styles.

```html
<div style="font-family: monospace; color: red;">
  <p>inheritance can be super useful!</p>
</div>
```

For non-inherited properties, each element has a set of *initial values —* these values are defined in the CSS spec for any given rule. For example, the initial value for the `background-color` property is `transparent`. If no CSS declaration sets a value for `background-color` on an element, it will default to `transparent`.

In addition, you can explicitly opt to use inherited or initial values in a CSS declaration by using the `inherit` or `initial` keywords in your CSS rule.

```css
div {
  background-color: initial;
  color: inherit;
}
```

### How does understanding the cascade help me write betterCSS?

Since the CSS cascade is one of the more misunderstood parts of CSS (and often the source of a lot of bugs), knowing how it works will give you a huge edge on keeping your stylesheets maintainable.

Knowing how to leverage CSS selector specificity to your advantage is a huge skill — I’ve seen far too much CSS that goes straight to the`!important` escape hatch when a higher-specificity selector would have done the trick. If you’re primarily using class selectors, you can easily do this by nesting selectors or adding another class when you *need* an override.

However, with better knowledge of the CSS cascade comes higher responsibility. The more specific parts of the cascade (such as`!important`, inline styles, id selector ) tend to result in stylesheets that are harder to update or override in the future. They do come in handy if you working with component libraries that use inline styles or CSS libraries that you don’t control.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
"title": "How CSS works: Understanding the cascade",
  "desc": "A few weeks back I got to start a short series on CSS fundamentals. If you’re in the front-end web […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
