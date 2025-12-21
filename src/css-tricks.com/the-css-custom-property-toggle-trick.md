---
lang: en-US
title: "The CSS Custom Property Toggle Trick"
description: "Article(s) > The CSS Custom Property Toggle Trick"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The CSS Custom Property Toggle Trick"
    - property: og:description
      content: "The CSS Custom Property Toggle Trick"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-css-custom-property-toggle-trick.html
prev: /programming/css/articles/README.md
date: 2020-10-29
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/custom-properties-code.png
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
  name="The CSS Custom Property Toggle Trick"
  desc="Back in July 2020, I got an email from James0x57 (I always try to refer to people by their name, but I think I get the sense they prefer to go by screen name)"
  url="https://css-tricks.com/the-css-custom-property-toggle-trick"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/custom-properties-code.png"/>

Back in July 2020, I got an email from James0x57 (I always try to refer to people by their name, but I think I get the sense they prefer to go by screen name) that says:

> The entire world of branching conditional logic and bulk feature toggling for custom CSS properties is possible and only exists because of a tiny footnote in the CSS spec that has gone unnoticed.

[<VPIcon icon="iconfont icon-w3c"/>That line](https://w3.org/TR/css-variables-1/#syntax) is:

::: note (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

While `<declaration-value>` must represent at least one token, that one token may be whitespace.

```component VPCard
{
  "title": "CSS Custom Properties for Cascading Variables Module Level 1",
  "desc": "The allowed syntax for custom properties is extremely permissive. The <declaration-value> production matches any sequence of one or more tokens, so long as the sequence does not contain ...",
  "link": "https://w3.org/TR/css-variables-1/#syntax/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

In other words, `--foo: ;` is valid.

If you’re like me, this doesn’t read as some massive revelation that unlocks huge doors, but to smarter people, like James0x57, it does! We started working on a draft blog post, but for various reasons it didn’t make it all the way here. One of those reasons is that *I just wasn’t getting it.* Call me dense, sorry James0x57. One demo they sent me when I asked for a super dumbed-down example was helpful though, and I think it’s kind of clicked for me. Here’s my interpretation:

<CodePen
  user="anon"
  slug-hash="abZBXde"
  title="CSS Custom Property Toggle"
  :default-tab="['css','result']"
  :theme="dark"/>

Let me attempt to explain:

- The breakpoint we’ve set up here is a 900px `max-width` media query. You can see that’s where the variable `--mq-sm` flops from `initial` to an empty space value.
- When the browser window is wider than 900px, that the value of `--mq-sm` is `initial`.
  - That makes the variable `--padding-when-small` contain two values — `initial` and `2rem` —which, I guess is **invalid**.
  - So when we actually set the padding and call that variable like `padding: var(--padding-when-small, var(--padding-when-large))`, the **second** value (the “fallback”) is used because the first value is invalid.
- When the browser window is narrower than 900px, the `--mq-sm` value is a space.
  - That makes the variable `--padding-when-small` value `"(space)2rem"` which, I guess is **valid**.
  - That means when we actually set the padding and call that variable like `padding: var(--padding-when-small, var(--padding-when-large))`, the **first** value is used.

So, now we can flip the padding between two values by changing a placeholder variable.

That clicks for me.

When I see this as simply changing a single value, it’s almost like *uh, ok, you’ve found a really complex way to change some padding, but you could have just changed the padding in the media query.* But the trick is that **now we have this placeholder variable that has changed and we can key into that to change unlimited other values**.

We could have **a single media query** (or set of media queries) in our CSS that only toggles these placeholder variables and we use elsewhere to toggle values. That could be nice and clean compared to sprinkling media queries all over the CSS. It’s a proper toggle in CSS, like a form of IF/THEN logic that we haven’t quite had before.

James0x57 extended that thinking to all the logical possibilities, like AND, OR, XOR, NAND, NOR, and XNOR, but that lost me again. Not really a computer scientist over here. [But you can follow their work (<VPIcon icon="iconfont icon-github"/>`propjockey/aug-attr-spliced.js`)](https://github.com/propjockey/aug-attr-spliced.js) if you want to see real world usage of this stuff.

This variable stuff is wild and gets very confusing. I noted in a possibly recent (but the byline says 2015?) [<VPIcon icon="fas fa-globe"/>article](https://patrickbrosset.com/articles/2020-09-21-3-things-about-css-variables-you-might-not-know/) from Patrick Brosset that covers some tricky CSS custom properties stuff. For example, fallbacks can be infinitely nested, like:

```scss
color: var(--foo, var(--bar, var(--baz, var(--are, var(--you, var(--crazy)))));
```

Also, valid values for CSS custom properties can have commas in them like this:

```css
content: var(--foo, one, two, three);
```

Is that really just one fallback with a single `one, two, three` value? This is rather mind-bending.

Anyway, fast-forward a bunch of months now, and CSS trickery master Lea Verou has [<VPIcon icon="fas fa-globe"/>set her sights](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/?) on this whitespace-in-custom-properties stuff:

> What if I told you you could use a single property value to turn multiple different values on and off across multiple different properties and even across multiple CSS rules?

It’s the same trick! In Lea’s example, though, she uses this ability to:

- set variations on a button, and
- set four different properties rather than one.

This really hones in on why this is the concept is so cool.

<CodePen
  user="anon"
  slug-hash="YzWpBaV"
  title="CSS Toggle with CSS Custom Properties"
  :default-tab="['css','result']"
  :theme="dark"/>

Lea points to some downsides:

> There is no way to say “the background should be red if `--foo` is set and white otherwise”. Some such conditionals can be emulated with clever use of appending, but not most.
> 
> And of course there’s a certain readability issue: `--foo: ;` looks like a mistake and `--foo: initial` looks pretty weird, unless you’re aware of this technique.

We’re certainly entering the next era of how custom properties are used. First, we used them like preprocessor variables. Then we started seeing more cascade and fallback usage. Next, we used it alongside JavaScript more frequently. Now this.

There is even more writing about keeping CSS preprocessor variables around, not so much for the times when you only need what they can do, but for the things that only they can do, like having their color values manipulated.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The CSS Custom Property Toggle Trick",
  "desc": "Back in July 2020, I got an email from James0x57 (I always try to refer to people by their name, but I think I get the sense they prefer to go by screen name)",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-css-custom-property-toggle-trick.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
