---
lang: en-US
title: "Container Queries and Units"
description: "Article(s) > Container Queries and Units"
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
      content: "Article(s) > Container Queries and Units"
    - property: og:description
      content: "Container Queries and Units"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/container-queries-and-units.html
prev: /programming/css/articles/README.md
date: 2023-12-21
isOriginal: false
author:
  - name: Zach Saucier
    url : https://frontendmasters.com/blog/author/zachsaucier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/282
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
  name="Container Queries and Units"
  desc="Container queries are similar to media queries but allow you set styles based on a particular element’s current size, typically the width. This is super handy because you can write CSS in a way that gives flexibility to the layout! With @media queries, there’s a tight coupling of the styling of a component’s content and […]"
  url="https://frontendmasters.com/blog/container-queries-and-units/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/282"/>

Container queries are similar to media queries but allow you set styles based on a particular element’s current size, typically the width. This is super handy because you can write CSS in a way that gives flexibility to the layout!

With `@media` queries, there’s a tight coupling of the styling of a component’s content and the size of the browser window. This means that the styles within a given component depend on the layout.

With `@container` queries, we can instead tightly couple the styling of a component’s content with *the size of the component itself*, regardless of how that component fits into the larger layout. In short, you can set up components to respond to the container size without having to know the breakpoints of the overall page layout. Yay for increased isolation!

Let’s think through an example to illustrate this. Pulling from [<FontIcon icon="fa-brands fa-firefox"/>Michelle Barker’s helpful MDN article about container queries](https://developer.mozilla.org/en-US/blog/getting-started-with-css-container-queries/), here’s a mockup:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2023/12/layout-desktop-01.webp?resize=1024%2C731&ssl=1)

When there’s more width available, each article preview has the image on the left and copy on the right. When there’s less room available, it stacks the image on top of the content.

Without container queries, we’d have to specify which cards we want to have the vertical layout, which ones should have the horizontal layout, and which should have a bigger image explicitly. When you then consider all possible screen sizes and container layouts, this quickly becomes quite complicated.

Additionally, if there’s a possibility for the sidebar to be collapsed or if you sometimes need to show additional content (like ads) alongside this content, it gets even more complex! Not to mention when the layout gets changed to something else, like switching from 4 columns to 3, you have to go back and adjust everything.

Container queries can help us more easily address this sort of situation in a much more manageable way!

::: note

Container queries are separate from, but can be in used in combination with, [<FontIcon icon="fa-brands fa-firefox"/>the `contain` property](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) The `contain` property is useful for performance and preventing re-renders and, crucially, the thing that made `@container` queries possible under the hood.

:::

---

## Block and inline sizing

Before diving further into container queries, it’s important to make sure we have a good understanding of block and inline sizing as it has a large impact on the `container-type` and the container unit(s) we use.

[<FontIcon icon="fa-brands fa-firefox"/>Inline size](https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size) is equivalent to width for horizontal [<FontIcon icon="fa-brands fa-firefox"/>writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) and equivalent to the height for vertical writing modes. The [<FontIcon icon="fa-brands fa-firefox"/>block size](https://developer.mozilla.org/en-US/docs/Web/CSS/block-size) is the respective opposite.

Make sure you keep this in mind! The terms “block” and “inline” are from the concept of [<FontIcon icon="fa-brands fa-firefox"/>“logical properties”](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) and the direction CSS has been heading for a while.

---

## How to use container queries

To use container queries, you must first define a [<FontIcon icon="fa-brands fa-firefox"/>`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-type) and optionally a [<FontIcon icon="fa-brands fa-firefox"/>`container-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/container-name).

The `container-type` can have a value of `size`, `inline-size`, or `normal`.

- `size` establishes a query container for the inline and block dimensions as well as for style (which we cover at the end of this article).
- `inline-size` establishes a query container for the inline dimensions as well as for style.You’ll likely use this 99% of the time.
- `normal` establishes a query container only for style.

One potential gotcha is that if you use `container-type: size` you need to add an explicit height. It will ignore the height of children elements. This is [<FontIcon icon="fas fa-globe"/>how it is specced](https://drafts.csswg.org/css-contain-2/#containment-size) to behave.

Most often, using `container-type: inline-size` probably makes the most sense.

The `container-name` is a value of the [<FontIcon icon="fa-brands fa-firefox"/>`<custom-indent>`](https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident) type (essentially some name you make up).

You can also use the `container` shorthand to define both properties. Such as:

```css
.my-component {
 container: my-component / inline-size;
}
```

When using a container query or container query unit (which we will cover more in later sections), it will reference the nearest container in its ancestry tree unless you specify a particular container by including the `container-name`.

Once you’ve defined a container, you can use a `@container` query and select any descendant elements inside of it. For example:

```css
@container (min-width: 500px) {
 .my-component p {
  font-size: 1.5rem;
 }
}
```

Or, if you want to use the container name in the query:

```css
@container my-component (min-width: 500px) {
 .my-component p {
  font-size: 1.5rem;
 }
}
```

Note that you *cannot* style the element that is being queried inside of the container query itself (like `.my-component {}` in this case). But you *can* use it as a part of a more complex selector as seen above.

But you don’t *have to* refer to the container element in the selector, meaning this is also valid:

```css
@container my-component (min-width: 500px) {
 p {
  font-size: 1.5rem;
 }
}
```

You can also use [<FontIcon icon="fas fa-globe"/>nesting](https://caniuse.com/css-nesting).

```css
.my-component {
  @container (min-width: 500px) {
    p {
      font-size: 1.5rem;
    }
  }
}
```

---

## `orientation` and `aspect-ratio`

Instead of using explicit container sizes for container queries, we can also make use of `orientation` and its more generic form, `aspect-ratio`.

For example, here’s [a Pen (<FontIcon icon="fa-brands fa-codepen"/>`ZachSaucier`)](https://codepen.io/ZachSaucier/pen/JjxeEyG?editors=1100) where we have the image on the left for larger screens and on top for smaller screens (a non-aspect ratio version of this sort of thing is in the section below).

<CodePen
  user="ZachSaucier"
  slug-hash="JjxeEyG"
  title="Container queries and units - Aspect ratio example"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

When using `aspect-ratio`, remember that it’s width divided by the height, so `aspect-ratio < 1/1` would be when the width is larger than the height (this example is equivalent to `orientation: landscape`). You can also use `min-aspect-ratio` or `max-aspect-ratio` instead of plain `aspect-ratio` and a comparison symbol.

Note that `orientation` and `aspect-ratio` can only be used with a `container-type` of `size` because it uses the container’s width *and* height. Setting a `height` is not typically a great idea for any template-based design where content can change.

---

## What are container query *units*?

Container query units are an addition to the container query specification that provides units *based on the container’s dimensions*. This is handy for sizing pieces of a component based on the component’s container size.

What’s more, you’re not restricted to using container query units inside of container queries. You can use them anywhere a container is specified! That means that in some cases you can get away with just setting a property’s value to something that uses a container query unit and just leave it at that.

### A shortened name for container query units?

“Container query units” is kind of a mouthful to say. Given that they can be used outside of container queries (so long as a container is defined), I think we can refer to these as “container units” [<FontIcon icon="fas fa-globe"/>like Chris Coyier did](https://css-tricks.com/container-units-should-be-pretty-handy/) when he wrote about them a while back. I’m going to call them that for the rest of this article.

### Available container units

Here’s the list of container units we currently have access to:

- `cqw`: 1% of a query container’s width
- `cqh`: 1% of a query container’s height
- `cqi`: 1% of a query container’s inline size
- `cqb`: 1% of a query container’s block size
- `cqmin`: The smaller value of either `cqi` or `cqb`
- `cqmax`: The larger value of either `cqi` or `cqb`

The width and height values are pretty straightforward to use. However, keep in mind that `cqh` will only use a container height if the container has a `container-type` of `size`. If `inline-size` is used, it will base its height on the nearest container with `container-type: size`, which might be the viewport.

Of these units, `cqi` will probably be the most commonly used unit for those who want to build websites for international audiences. For horizontal languages, it is equivalent to `cqw`. But it automatically switches to use `cqh` for vertical languages.

If you’re still not sure what inline means vs block here, maybe spend more time in [the section above](#block-and-inline-sizing).

---

## Use cases for container queries and container units

Let’s take a quick look at some use cases for container queries and container units!

### Changing a component’s layout based on how much space is available

Perhaps the most common use case for container queries is to change the layout of a component’s contents based on the container’s size. Paired with ways of doing layouts like flex and grid, it can make creating pages that respond to different viewport sizes even easier.

<CodePen
  user="ZachSaucier"
  slug-hash="MWLzJGM"
  title="Container queries and units - Card example"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Accessibility note: It’s best to [<FontIcon icon="fas fa-globe"/>keep the logical order](https://devyarns.com/logical-focus-order/) of elements in the markup.

Taken to an extreme, you can make HTML and CSS components function kinda like an SVG like Dan Christofi did:

<CodePen
  user="danchristofi"
  slug-hash="QWxameQ"
  title="Container Queries - Card Grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Adding non-vital detail when there’s more space available

In addition to changing the layout, sometimes it makes sense to hide some of the less important information or decorative elements when a component is smaller.

A great example of this is Chris Coyier’s calendar layout demo, where the vital parts of the calendar are kept for the smallest size but the rest is hidden:

<CodePen
  user="chriscoyier"
  slug-hash="jOeBzNN"
  title="Container Query Calendar"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

(You may want to open [this one full screen (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/full/jOeBzNN) to have play.)

### Fluid typography

Fluid typography is the concept of defining font sizes in a way where the type automatically scales based on some dimension between pre-defined bounds. In the past this has been based on the viewport width, but container query units make this concept a lot more powerful!

Check out this demo by Chris Coyier where you can drag to divvy up width between two elements, both with responsive type sizes:

<CodePen
  user="chriscoyier"
  slug-hash="GREQGQY"
  title="resizeasaurus with container units"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Stephanie Eckles wrote a more in-depth article about [<FontIcon icon="fas fa-globe"/>using container query units for typography](https://moderncss.dev/container-query-units-and-fluid-typography/) that I highly recommend!

---

## When to use media queries instead

Content queries and units free us up from having to always use breakpoints that are tied to the layout. However, there are cases where you want content to update based on the layout! That’s when you should still use media queries—so content can be updated across multiple components at the same time.

Another time to use media queries is when you’re wanting to check certain device features, such as `@media (not(hover)) { ... }` or `@media (not (color)) { ... }` (which checks if the display is monochrome).

---

## Browser support and style queries

Container queries for sizing [<FontIcon icon="fas fa-globe"/>have pretty solid browser support](https://caniuse.com/css-container-queries) these days, as do [<FontIcon icon="fas fa-globe"/>container units](https://caniuse.com/css-container-query-units).

There’s also discussion around creating *style* container queries. This would make certain things easier, like alternating between nested italic and normal text. Since the values of CSS variables can also be used in style queries, they could also be used as a more legitimate alternative to [<FontIcon icon="fas fa-globe"/>the CSS variable/custom property toggle hack](https://css-tricks.com/the-css-custom-property-toggle-trick/). But at the moment they are only partially supported [<FontIcon icon="fas fa-globe"/>in WebKit-based browsers](https://caniuse.com/css-container-queries-style).

---

## Conclusion

Container queries and container units enable us to create more isolated components. This makes it easier for components to be used across multiple pages, layouts, and systems. They’re prime for use in design systems!

If you’re interested in what other new CSS features I used when recreating my blog, [<FontIcon icon="fas fa-globe"/>check out my blog post about the process](https://zachsaucier.com/blog/blog-refresh-2023).

### Bonus demo

This demo by SitePoint shows responsive layout paired with container queries to inspire you further!

<CodePen
  user="SitePoint"
  slug-hash="mdzJJaX"
  title="Container Queries for Cards"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Container Queries and Units",
  "desc": "Container queries are similar to media queries but allow you set styles based on a particular element’s current size, typically the width. This is super handy because you can write CSS in a way that gives flexibility to the layout! With @media queries, there’s a tight coupling of the styling of a component’s content and […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/container-queries-and-units.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
