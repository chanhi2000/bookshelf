---
lang: en-US
title: "The Future of CSS: Cascade Layers (CSS @layer)"
description: "Article(s) > The Future of CSS: Cascade Layers (CSS @layer)"
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
      content: "Article(s) > The Future of CSS: Cascade Layers (CSS @layer)"
    - property: og:description
      content: "The Future of CSS: Cascade Layers (CSS @layer)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-cascade-layers-css-at-layer.html
prev: /programming/css/articles/README.md
date: 2021-09-15
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-cascade-layers-champ-bramus.png
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
  name="The Future of CSS: Cascade Layers (CSS @layer)"
  desc="When authoring CSS we have to carefully think about how we write and structure our code. Cascade Layers (CSS @layer) aim to ease this task."
  url="https://bram.us/bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-cascade-layers-champ-bramus.png"/>

![Cascade Layers](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-cascade-layers-champ-bramus.png)

When writing CSS, we developers have to carefully think about how we write and structure our code. Without any proper *“plan of attack”* the Cascade can suddenly work against us, and we might end up with pieces of code overwriting each other, selectors getting heavier and heavier, a few `!important` modifiers here and there, … — Uhoh!

To regain control over the Cascade in those situations there’s a new CSS Language Feature coming to help us: **Cascade Layers _(CSS `@layer`)_**.

Let’s take a look at what they are, how we can use them, and what benefits they bring …

---

## The CSS Cascade, a Quick Primer

The [<VPIcon icon="fas fa-globe"/>CSS Cascade](https://drafts.csswg.org/css-cascade/#cascading) is the algorithm which CSS uses to resolve competing declarations that want to be applied to an element.

```css
/* HTML: <input type="password" id="password" style="color: blue;" /> */
input { color: grey; }
input[type="password"] { color: hotpink !important; }
#password { color: lime; }
```

*Will the `input` color be `grey`, `lime`, `hotpink`, or `blue`? Or the User-Agent default `black`?*

To determine which declaration should “win” *(and thus be applied)*, the Cascade looks at a few criteria. Without taking Cascade Layers into account just yet, these criteria are:

1. Origin and Importance
2. Context
3. Style Attribute
4. Specificity
5. Order of Appearance *(aka Source Code Order)*

These criteria are ranked from high to low priority, and are checked one after the other until a winning declaration has been determined. In case it is undecided which property declaration will “win” at a higher criterion, the Cascade will move on to the next criterion.

![The CSS Cascade Visualized](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-current-cascade-bramus.png)

::: info

For more in-depth info, please refer to [**my CSS Day 2022 talk on the subject**](/bram.us/the-css-cascade-a-deep-dive-2022-06-09-css-day.md). It also covers Cascade Layers, so you can watch the entire thing instead of continuing to read 😉

<VidStack src="youtube/zEPXyqj7pEA" />

You can [**find the the slides here**](/bram.us/the-css-cascade-a-deep-dive-2022-06-09-css-day.md).

:::

---

## Taming the Cascade

When authoring CSS we place our CSS mainly into one and the same origin: the Author Origin. As a result, we end up juggling with **Selector Specificity** and **Order of Appearance** as our ways to control the cascade — if not having thrown in an `!important` somewhere. While doing so, we have to perform a fine balancing act between both of these aspects:

- Statements that use selectors of a high specificity can cause problems in case you want to override some properties later in the code. This often leads to even more heavy selectors or the use of `!important`, which in itself can raise even more issues.
- Statements that use selectors of a low specificity can be overwritten too easily by statements that appear later in the code. This can especially be troublesome when loading third-party CSS after your own code.

To help us tame those aspects of the Cascade, a few clever developers have come up with methodologies such as [**BEM**](/css-tricks.com/bem-101.md), [<VPIcon icon="fa-brands fa-youtube"/>ITCSS](https://youtu.be/1OKZOV-iLj4?t=460), [**OOCSS**](/smashingmagazine.com/an-introduction-to-object-oriented-css-oocss.md), etc. over time. These methodologies mainly lean on the following aspects:

1. Structuring your code in such a way that you create some sort of logical order that works for most scenarios.
2. Keeping Selector Specificity as low as possible by leaning primarily to classes.

![The almighty Inverted Triangle of CSS.](https://bram.us/wordpress/wp-content/uploads/2021/09/itcss.jpg)

While these approaches can certainly help you strike a balance between Selector Specificity and Order of Appearance, they are not 100% closing:

- The established order is never really enforced as Order of Appearance still determines things.
- Selector Specificity still has the upper hand over the order of the layers

---

## Introducing Cascade Layers

To make this balancing act more easy, there’s a new mechanism named Cascade Layers being worked on. It’s a CSS feature led by [Miriam Suzanne (<VPIcon icon="fa-brands fa-x-twitter"/>`TerribleMia`)](https://x.com/TerribleMia/) — _whom you might also know from [**CSS Container Queries**](/bram.us/css-container-queries-a-first-look-and-demo.md)_ — and is part of the upcoming [<VPIcon icon="iconfont icon-w3c"/>CSS Cascading and Inheritance Level 5 (`css-cascade-5`) Specification](https://w3.org/TR/css-cascade-5/).

With Cascade Layers you can split your CSS into several layers via the `@layer` at-rule. As per spec:

> In the same way that Origins provide a balance of power between user and author styles, Cascade Layers provide a structured way to organize and balance concerns within a single Origin.

Because of its unique position in the Cascade, using Layers comes with a few benefits that give us developers more control over the Cascade.

![The new CSS Cascade with Layers added to it](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-cascade-layers-bramus.png)

Let’s dive in with some code examples, explaining the benefits along the way.

::: critical 🚨

Before we continue: try and forget any assumption you have about “layers in CSS”. **By simply looking at their name, it’s easy to confuse Cascade Layers with layering via `z-index` or the *(deprecated)* HTML `<layer>` element.** These things are not the same:

- Layering via `z-index` is about visually stacking boxes onto a webpage.
- The HTML `<layer>` element is [ancient history](https://web.archive.org/web/20010210102906fw_/http://developer.netscape.com/docs/manuals/communicator/dynhtml/layers31.htm#1026297).
- Cascade Layers is about structuring your CSS Code and controlling the CSS Cascade.

:::

### Creating a Cascade Layer

A Cascade Layer can be declared in several ways:

1. Using the `@layer` *block* at-rule, with styles assigned immediately to it:

```css
@layer reset {
  * { /* Poor Man's Reset */
    margin: 0;
    padding: 0;
  }
}
```

2. Using the `@layer` *statement* at-rule, without any styles assigned:

```css
@layer reset;
```

3. Using @import with the `layer` keyword or `layer()` function:

```css
@import url(reset.css) layer(reset);
```

Each of these standalone examples, creates a Cascade Layer named `reset`.

::: info 💡

A possible 4th way is still being worked on: by means of an attribute on a `<link>` element. See [CSSWG Issue #5853 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5853).

:::

### Managing Layer Order

Cascade layers are sorted by the order in which they first are declared.

In the example below we create four layers: `reset`, `base`, `theme`, and `utilities`.

```css{1,8,12,16}
@layer reset { /* Create 1st layer named “reset” */
  * {
    margin: 0;
    padding: 0;
  }
}

@layer base { /* Create 2nd layer named “base” */
  …
}

@layer theme { /* Create 3rd layer named “theme” */
  …
}

@layer utilities { /* Create 4th layer named “utilities” */
  …
} 
```

Following their declaration order, the Layer Order becomes:

1. `reset`
2. `base`
3. `theme`
4. `utilities`

![Cascade layers are sorted by the order in which they first are declared](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-layer-order-bramus.png)

When re-using the name of a Layer, styles will be appended to the already existing Layer. The order of the Layers remains the same, as it’s only the first appearance which determines the order:

```css{17-19}
@layer reset { /* Create 1st layer named “reset” */
  …
}

@layer base { /* Create 2nd layer named “base” */
  …
}

@layer theme { /* Create 3rd layer named “theme” */
  …
}

@layer utilities { /* Create 4th layer named “utilities” */
  …
}

@layer base { /* Append to existing layer named “base” */
  …
} 
```

The fact that the Layer order remains the same when re-using a Layer name makes the `@layer` statement at-rule syntax darn handy. Using it, you can establish Layer Order upfront, and append all CSS later to it:

```css{1-4}
@layer reset;     /* Create 1st layer named “reset” */
@layer base;      /* Create 2nd layer named “base” */
@layer theme;     /* Create 3rd layer named “theme” */
@layer utilities; /* Create 4th layer named “utilities” */

@layer reset { /* Append to layer named “reset” */
  …
}

@layer theme { /* Append to layer named “theme” */
  …
}

@layer base { /* Append to layer named “base” */
  …
}

@layer theme { /* Append to layer named “theme” */
  …
} 
```

Heck, you can write it even shorter, using a comma-separated list of Layer Names:

```css
@layer reset, base, theme, utilities;
```

::: tip 🔥 Best Practice

To keep control over Layer Order, it’s recommended to declare all your layers upfront by using this one-line syntax, and —once the order is established— then append styles to them.

:::

### Cascade Layers and the Cascade

In the Cascade *(the algorithm)*, Layers get a higher precedence than Specificity and Order of Appearance. So the criteria of the Cascade become this *(in order)*:

1. Origin and Importance
2. Context
3. Style Attribute
4. **Layers**
5. Specificity
6. Order of Appearance

![The new CSS Cascade with Layers added to it](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-cascade-layers-bramus.png)

When evaluating the Layers criterion, the Cascade will look at the Layer Order to determine the winning declaration. Declarations whose cascade layer is last, will win from declarations in earlier-declared Layers *(cfr. how Order of Appearance works: last one wins)*.

> Cascade layers (like declarations) are ordered by order of appearance. When comparing declarations that belong to different layers, then for normal rules the declaration whose cascade layer is last wins […]

![How the Cascade evaluates Layers](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-layers-determine-winner-bramus.png)

Take this snippet from earlier:

```css
@layer reset, base, theme, utilities;
```

In total we create 4 layers, in this order:

1. `reset`
2. `base`
3. `theme`
4. `utilities`

For example: Competing declarations in the `theme` Layer *(3)* will win from declarations in the `base` *(2)* and `reset` *(1)* Layers because those Layers were declared before `theme`. Competing declarations in the `theme` Layer *(3)* however won’t win from those in `utilities` *(4)*, as that Layer has been declared later.

**Once a winning declaration has been determined via Layer Order, the Cascade won’t even check Specificity or Order of Appearance for those declarations anymore. This is because Layers is a separate and higher ranked criterion of the Cascade.**

Practical example:

```css{4,10}
@import url(reset.css) layer(reset); /* 1st layer */

@layer base { /* 2nd layer */
  form input {
    font-size: inherit; 
  }
}

@layer theme { /* 3rd layer */
  input {
    font-size: 2rem;
  }
}
```

Although the `input`-selector *(Specificity `0,0,1`)* used on line #10 is less specific than the `form input`-selector *(Specificity `0,0,2`)* from line #4, the declaration on line #10 will win because the `theme` Layer *(3)* is ordered after the `base` layer *(2)*.

::: note 🔥

Because later-declared Layers always win from earlier-declared Layers, you —as a developer— don’t need to worry about the Specificity nor Order of Appearance that is used in those other Layers: it’s the Layer Order that dictates who the winner in case of conflict is.

This also means that you can easily move Layers around, knowing that their Layer Order —and not the Specificity nor Order of Appearance— will determine things.

:::

::: warning ‼️

Do note that this doesn’t mean that Specificity and Order of Appearance are no longer important. These two criteria still are, but only inside one and the same Layer. When comparing declarations between Layers, these two criteria can be ignored.

:::

---

## Intermediate Summary

If you were able to follow along there, this intermediate summary should make sense:

- With Cascade Layers you can split your CSS into several layers.
- Upon creating a Layer with `@layer`, you also determine the Layer Order.
- Re-using Layer names will append to the already created Layer, without altering Layer Order.
- When evaluating Layers, the Cascade *(the algorithm)* will have declarations placed in later-declared Layers win from declarations in early-declared Layers (i.e. *“Last Layer Wins”*).
- The Cascade evaluates Layers before Specificity and Order Of Appearance. That way you no longer need to worry about these two criteria for CSS found in separate Layers, as Layer Order will already have determined the winning declaration.

Cool, right?! 🤩

::: info 💁‍♂️

Like what you see so far? Happen to be conference or meetup organiser? Feel free to [<VPIcon icon="fas fa-globe"/>contact me to come speak at your event](https://bram.us/speaking-training/), with a talk covering the contents of this post.

:::

---

## Details you need to know

There’s a few details that one needs to know about the inner workings of Cascade Layers.

### Unlayered Styles come ~first~ last in the Layer Order

::: note Update 2021.10.07

The CSS Working Group [has decided (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6284#issuecomment-937262197) that Unlayered Styles should come last *(instead of first as it was specced before)*. This post has been updated accordingly.

:::

Styles that are not defined in a Cascade Layer will be collected in an implicit layer. This implicit layer will be positioned ~first~ last in the Layer Order.

![Unlayered Styles come last in the Layer Order](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-unlayered-styles-revised-bramus.png)

Because of this position, Unlayered Styles will always override styles declared in Layers.

```css
@import url(reset.css) layer(reset); /* 1st layer */

/* Some Unlayered Styles */
h1 { color: hotpink; }

@layer base { /* 2nd layer */
  h1 { font-family: … }
}

@layer theme { /* 3rd layer */
  body h1 { color: rebeccapurple; }
}

@layer utilities { /* 4th layer */
  [hidden] { display: none; }
}
```

The Layer Order for this snippet looks like this:

1. `reset`
2. `base`
3. `theme`
4. `utilities`
5. *(unlayered styles)*

The result from the example above will be that the `h1` will be colored `hotpink`, even though the unlayered styles come earlier the Source Order and the used selector in `theme` Layer has a higher Specificity.

::: info 💡

In the future we might gain the ability to control the layer position of these unlayered declarations. This is being tracked in [CSSWG Issue #6323 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6323)

:::

### Naming a Layer is optional

Cascade Layers can also be created without giving them a name. These are called “Anonymous Layers”.

1. Using the `@layer` *block* at-rule, with styles assigned immediately to it

```css
@layer {
  * { /* Poor Man's Reset */
    margin: 0;
    padding: 0;
  }
}

2. Using `@import`:

```css
@import url(reset.css) layer;
```

A disadvantage of not using a name is that you can’t append to these anonymous layers:

```css
@layer { /* layer 1 */ }
@layer { /* layer 2 */ }
```

```css
@import url(base-forms.css) layer; /* layer 1 */
@import url(base-links.css) layer; /* layer 2 */
```

::: info 💡

Using the `@layer` *statement* at-rule without a name (e.g. `@layer;`) is possible, but not mentioned as it’s a useless statement to make:

- It has no content to begin with
- You can’t append extra content since you can’t refer to it.

:::

### Layers can be nested

It’s perfectly fine to nest `@layer` statements.

```css
@layer base { /* 1st Layer */
  p { max-width: 70ch; }
}

@layer framework { /* 2nd Layer */
  @layer base { /* 1st Child Layer inside 2nd Layer */
    p { margin-block: 0.75em; }
  }

  @layer theme { /* 2nd Child Layer inside 2nd Layer */
    p { color: #222; }
  }
}
```

In this example there’s two outer layers:

1. `base`
2. `framework`

The `framework` layer itself also contains two layers:

1. `base`
2. `theme`

::: info 💡

The re-use of the name `base` does not conflict here, as that 2nd `base` is part of the `framework` layer. Yes, the names are scoped to their surrounding outer-layer *(if any)*

:::

Representing the Layers as one combined tree, it would look like this:

1. `base`
2. `framework`
    1. `base`
    2. `theme`

![Layers can be nested](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-nested-layers-bramus.png)

To refer to a Layer that is contained inside an other Layer, use it’s full name which uses the period to determine the hierarchy, e.g. `framework.theme`.

The flattened Layer Tree for this code example would then look like this:

1. `base`
2. `framework.base`
3. `framework.theme`

To append styles to a nested Layer, you need to refer to it using this full name:

```css
@layer framework {
  @layer default {
     p { margin-block: 0.75em; }
  }

  @layer theme {
    p { color: #222; }
  }
}

@layer framework.theme {
  /* These styles will be added to the theme layer inside the framework layer */
  blockquote { color: rebeccapurple; }
}
```

---

## A few more notes / caveats

If you still haven’t had enough, there are a few extra things worth mentioning.

😵‍💫 Already had enough? Feel free to skip this part and [immediately jump to Browser Support](#browser-support) as it becomes pretty advanced/complicated.

### Cascade Layers and the use of `!important`

When evaluating the Origin criterion, the Cascade orders the several Origins as follows *(ranked from high to low)*:

1. *Transitions*
2. Important User-Agent
3. Important User
4. Important Author
5. *Animations*
6. Normal Author
7. Normal User
8. Normal User-Agent

Notice how Origins with `!important` have the reverse order of their normal *(i.e. non-important)* counterpart? That’s because of how CSS works:

> When a declaration is marked !important, its weight in the cascade increases and inverts the order of precedence.

This inversion-rule is also applied declarations in Cascade Layers: declarations with `!important` annotation will be put in the “Important Author” Origin, but the Layers will have the inverse order when compared to the “Normal Author” Origin.

![Cascade Layers vs. use of `!important`](https://bram.us/wordpress/wp-content/uploads/2021/09/css-cascade-layers-important-bramus.png)

Winging back to our four layers from earlier:

```css
@layer reset, base, theme, utilities;
```

Normal declarations in these layers all go in the “Normal Author” Origin, and will be ordered as such:

1. Normal `reset` Layer
2. Normal `base` Layer
3. Normal `theme` Layer
4. Normal `utilities` Layer

Important declarations in these layers however all will go in the “Important Author” Origin, and will be ordered in reverse:

1. Important `utilities` Layer
2. Important `theme` Layer
3. Important `base` Layer
4. Important `reset` Layer

Because *“Normal Unlayered Styles”* implicitly go last, this also means that *“Important Unlayered Styles”* will go first then.

::: info 💡

So yes, an `!important` declaration inside a layer will win from an `!important` declaration inside Unlayered Styles.

:::

### Cascade Layers vs. Media Queries *(and other conditionals)*

When a `@layer` is nested inside a Media Query (or any other conditional), and the condition does not evaluate to `true`, the `@layer` will be not be taken into account for the Layer Order. Should the Media Query/Conditional evaluate to `true` later on — because of the screen size changing for example — Layer Order will be recalculated.

For Example:

```css
@media (min-width: 30em) {
  @layer layout {
    .title { font-size: x-large; }
  }
}

@media (prefers-color-scheme: dark) {
  @layer theme {
    .title { color: white; }
  }
}
```

If the first Media Query matches *(based on viewport dimensions)*, then the `layout` layer will come first in the Layer Order. If only the `color-scheme` Preference Query matches, then `theme` will be the first layer.

Should both match, then the Layer Order will be `layout`, `theme`. If none matches no Layers are defined.

### Cascade Layers vs. “Name-Defining Rules”

Name-Defining Rules — such as `@keyframes`, [**`@scroll-timeline`**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md), `@font-face` — follow Layer Order as you’d expect:

```css
@layer framework, override; /* Establish Layer Order */

@layer framework {
  @keyframes slide-left {
    from { margin-left: 0; }
    to { margin-left: -100%; }
  }
}

@layer override {
  @keyframes slide-left {
    from { translate: 0; }
    to { translate: -100% 0; }
  }
}

.sidebar { animation: slide-left 300ms; }
```

The Layer Order looks like this:

1. `framework`
2. `override`

As the last layer wins, the `slide-left` Keyframes from the `override` Layer *(2)* — the ones using `translate` — will be used.

### No Interleaving of `@import`/`@namespace` and `@layer`

For parsing reasons *(see [CSSWG Issue #6522 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6522))* it’s not allowed to interleave `@layer` with `@import`/`@namespace` rules.

From the moment the CSS parser sees a `@layer` that follows an earlier `@import`, all subsequent `@import` rules after it will be ignored:

```css
@layer default;
@import url(theme.css) layer(theme);
@layer components; /* 👈 This @layer statement here which comes after the @import above … */
@import url(default.css) layer(default); /* ❗️ … will make this @import rule (and any other that follow) be ignored. */
@layer default {
  audio[controls] {
    display: block;
  }
}
```

To counteract this, group your `@import` rules together.

```css
@layer default;
@import url(theme.css) layer(theme);
@import url(default.css) layer(default);

@layer components;
@layer default {
  audio[controls] {
    display: block;
  }
}
```

::: tip 🔥 Best Practice

Should you rely on `@import` *(which you shouldn’t, as [<VPIcon icon="fas fa-globe"/>it’s a performance hit](https://csswizardry.com/2018/11/css-and-network-performance/#avoid-import-in-css-files))* best is to:

1. Establish a layer order upfront using `@layer` statement at-rules
2. Group your `@import`s after that
3. Append styles to already established layers using `@layer` block at-rules

```css
@layer default, theme, components;

@import url(theme.css) layer(theme);
@import url(default.css) layer(default);

@layer default {
  audio[controls] {
    display: block;
  }
}
```

:::

---

## Browser Support

I’m very happy to see that **all browser vendors ~are working on adding~ have support for Cascade Layers 🥳**. ~~It’s all still experimental support, but given that the spec has matured since it got first proposed in 2019, things are looking very good to see it shipped by the end of this year / early next year.~~

### Chromium *(Blink)*

✅ Supported in Chromium 99 and up

Was supported as an Experimental Feature in Chrome 96+ through the `--enable-blink-features=CSSCascadeLayers` [<VPIcon icon="fa-brands fa-chrome"/>run-time flag](https://chromium.org/developers/how-tos/run-chromium-with-flags). Starting with version 96.0.4661.0, you could toggle it via the `#enable-cascade-layers` feature flag in `chrome://flags/`

### Firefox *(Gecko)*

✅ Supported in Firefox 97 and up

Was supported as an Experimental Feature in Firefox 94+ *(current Canary)* by setting `layout.css.cascade-layers.enabled` to `true` via `about:config`.

### Safari *(WebKit)*

✅ Supported in Safari 15.4 and up

Was supported as an Experimental Feature in Safari Technology Preview 133. Had to be enabled manually by using Safari’s App Menu in the Menu Bar and choose Develop → Experimental Features → CSS Cascade Layers.

The demo below — by [Miriam (<VPIcon icon="fa-brands fa-x-twitter"/>`TerribleMia`)](https://x.com/TerribleMia/) — will show a green checkmark when `@layer` support is enabled.

<CodePen
  user="miriamsuzanne"
  slug-hash="poweapY"
  title="OMG, Layers"
  :default-tab="['css','result']"
  :theme="dark"/>

To stay up-to-date regarding browser support, you can follow these tracking issues:

- Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1095765](https://bugs.chromium.org/p/chromium/issues/detail?id=1095765)
- Firefox: [<VPIcon icon="fa-brands fa-firefox" />Issue #1699215](https://bugzilla.mozilla.org/show_bug.cgi?id=1699215)
- Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #220779](https://bugs.webkit.org/show_bug.cgi?id=220779)

---

## In Closing

With Cascade Layers coming, we developers will have more tools available to control the Cascade. The true power of Cascade Layers comes from its unique position in the Cascade: before Selector Specificity and Order Of Appearance. Because of that we don’t need to worry about the Selector Specificity of the CSS that is used in other Layers, nor about the order in which we load CSS into these Layers — something that will come in very handy for larger teams or when loading in third-party CSS.

Personally I’m really looking forward to give Cascade Layers a try. Being able to enforce the ordering used in ITCSS at the language level for example, feels like a great win.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Cascade Layers (CSS @layer)",
  "desc": "When authoring CSS we have to carefully think about how we write and structure our code. Cascade Layers (CSS @layer) aim to ease this task.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-cascade-layers-css-at-layer.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
