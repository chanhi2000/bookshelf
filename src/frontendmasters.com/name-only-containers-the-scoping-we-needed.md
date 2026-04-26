---
lang: en-US
title: "Name-Only Containers: The Scoping We Needed"
description: "Article(s) > Name-Only Containers: The Scoping We Needed"
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
      content: "Article(s) > Name-Only Containers: The Scoping We Needed"
    - property: og:description
      content: "Name-Only Containers: The Scoping We Needed"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/name-only-containers-the-scoping-we-needed.html
prev: /programming/css/articles/README.md
date: 2026-04-07
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9223
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
  name="Name-Only Containers: The Scoping We Needed"
  desc="If we give a `container-name` to the root of all our unique components, we can scope styles to them with a simple @container query."
  url="https://frontendmasters.com/blog/name-only-containers-the-scoping-we-needed/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9223"/>

I’ve done my time thinking about scope in CSS. I’ve done it my whole career, and did a presentation on it recently that [**I wrote up in full here**](/frontendmasters.com/scope-in-css.md). That was on the heels of [**`@scope` becoming a thing in CSS**](/frontendmasters.com/how-to-scope-css-now-that-its-baseline.md), which is, naturally, a part of the scope in CSS story.

~~I don’t entirely dislike `@scope`, but I guess I’m comfortable saying I’m disappointed in it.~~ It can do three things, all of which I find *quite* niche:

1. Donut scoping
2. Proximity specificity
3. DOM blasters

[**I covered these**](/frontendmasters.com/scope-in-css.md) in my talk. They have their uses, but again: *niche*.

:::: note Update

Actually `@scope`… also does what I talk about in this post. And arguably, it does it better because the purpose is more aligned with the name, and it has deeper browser support. I’ll add an additional section below showing how similar it is.

:::

The kind of scoping that I want in CSS is the kind that we’ve been given by tools like `<style scoped>` in `.vue` files and Svelte components, and more broadly, [what CSS modules does (<VPIcon icon="iconfont icon-github"/>`css-modules/css-modules`)](https://github.com/css-modules/css-modules).

I want to write:

```css
.card {
}
```

And have it turned into something like:

```css
[data-style="apio087df"] {
  /* Or, .card-apio087df */
  /* But I kinda like the data-attribute approach
     better because it leaves the original class alone */
}
```

(And have that attribute applied to my HTML so the new selector works.)

The reason I want that is that I don’t want to worry about a class name I’m writing conflicting with an existing class. I just don’t want to think about it. Ever, ideally.

I don’t need this on *every* project I touch; I *want* it on large-scale projects with many components and numerous style changes maintained over many years.

To me, **that’s a scoped style.**

I already get it with CSS modules, and that’s fine. But I’m a big fan when the web platform steps in and helps us do things we’d otherwise need a build process and tooling for. ~That’s what we didn’t get with `@scope`.~

Another option is just to make all your class names unique. This works on the vast majority of projects and requires no technology we didn’t have pretty much since HTML and CSS began life.

If class name scoping is all you or I ever do, that’s OK. I can live with that.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/Scope.010.webp?resize=1024%2C576&ssl=1)

---

## But wait, name-only containers?

I read in [<VPIcon icon="fa-brands fa-safari"/>the Safari 26.4 release notes](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/) that Safari is now supporting name-only containers. Like this:

```css
/* Name a container */
.sidebar {
  container-name: sidebar;
  container-type: inline-size;
}

/* Write styles with that name only, no conditions */
@container sidebar {
  .card {
    padding: 1rem;
  }
}
```

No conditions? Isn’t the whole point of a container to style based on conditions (like, 98% of the time, being how wide it is)?

Well, not if the only effect we want from this is scoping! (!!!)

---

## Components typically already have unique names.

Because components typically live in folders and folders have to have different names, components already have a forced uniqueness constraint.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/Screenshot-2026-04-04-at-3.00.51-PM.png?resize=391%2C1024&ssl=1)

Let’s just consider three. Here’s three design system (ds) components:

- `<ds-card>`
- `<ds-article>`
- `<ds-header>`

---

## Styles in Components

Each of them has styles that get bundled into global CSS:

- ds-card.css
- ds-article.css
- ds-header.css

::: note

We’re not talking shadow DOM and web components here, I’m talking very generally about any design system of components, regardless of framework.

:::

Both a card and an article can very easily have a title. It’s entirely reasonable to write a class like:

```css title="ds-card.css"
.title {
  background: rebeccapurple;
  color: white;
}
```

```css title="ds-article.css"
.title {
  font-weight: 300;
  letter-spacing: -0.01em;
}
```

Just some contrived styles there. Those will overlap and both apply because of the identical class names in use.

*Usually* that’s not what we want. *Usually* we avoid this by just career-long muscle memory of knowing this and perhaps some BEM methodology or nesting.

```css
ds-card {
  .title {
    /* Title styles unique to the card */
  }
}
```

That’s artificial specificity boosting just to avoid future trouble. Not the end of the world, but not ideal.

It feels nicer not to think about it, which is what we get in a CSS modules approach. The styles can’t clash because they are programmatically randomized. And we don’t have to nest either, meaning we’re not bumping up specificity just for scoping.

---

## Scoping Styles in Components

Let’s say we use the name of the component as the CSS `container-name` for every component.

```css
ds-card {
  container-name: ds-card;
}
ds-article {
  container-name: ds-article;
}
ds-header {
  container-name: ds-header;
}
```

Now in the stylesheet for each of those components (which is again, probably bundled and put into global scope like regular CSS).

```css
@container ds-card {

}
@container ds-article {

}
@container ds-header {
  
}
```

Now I can do *literally anything I want* inside those `@container` blocks and it will not globally conflict.

```css
@container ds-card {
  .title {
    background: rebeccapurple;
    color: white;
  }
}
@container ds-article {
  .title {
    font-weight: 300;
    letter-spacing: -0.01em;
  }
}
@container ds-header {
  
}
```

No conflicts there. Same class name, but scoped inside the relevant containers.

That’s it! That’s the scoping power we want.

And I’m fairly certain… no side effects. The WebKit blog post uses a `container-type: inline-size`, which would have side effects, but in my testing, that doesn’t seem necessary.

---

## , we can do this with `@scope` too.

Rather than this `@container` stuff we just looked at…

```css
ds-card {
  container-name: ds-card;
}
@container ds-card {
  button {
    /* I'm safe! */
  }
}
```

We can do the same exact thing with `@scope`. (Credit: [Miriam(<VPIcon icon="fa-brands fa-bluesky"/>`miriam.codes`)](https://bsky.app/profile/miriam.codes/post/3miwgalj5fk2y))

```css
@scope (ds-card) {
  button {
    /* I'm safe */
  }
}
```

There’s really no difference here, except that we’re not explicitly *naming* the scope (which, for some reason, my brain likes), we’re leaning on a scoped *selector.* The selector could be whatever, like a specifically named attribute or something.

---

## Demo

Name-only container styles I belive are only support in Safari 26.4+, so here’s hoping for broader support soon.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019d59f9-e6ff-7903-9aa8-932282b0c734"
  title="Name-only @container Scoping"
  :default-tab="['css','result']"
  :theme="dark"/>

This is related to several other ideological approaches I’m already a fan of:

```component VPCard
{
  "title": "Light-DOM-Only Web Components are Sweet",
  "desc": "First: the Light DOM is just… the regular DOM. When people talk about native Web Components, the Shadow DOM comes up a lot. I have extremely mixed feelings about the Shadow DOM. On one hand, it’s a powerful scoping tool. For example, CSS applied inside the Shadow DOM doesn’t “leak” outside, meaning you can be […]",
  "link": "/frontendmasters.com/light-dom-only.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
```component VPCard
{
  "title": "A Nice Vanilla App Archicture Using Web Components and CSS Module Scripts",
  "desc": "CSS module scripts help keep the dream of co-locating files that all relate to a component, without needing a bundler. ",
  "link": "/frontendmasters.com/architecture-through-component-colocation.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

Pretty satisfying to see this evolve.

Let’s see Chrome & Firefox pick up these name-only containers, and let’s see Safari pick up import type assertions plz thx.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Name-Only Containers: The Scoping We Needed",
  "desc": "If we give a `container-name` to the root of all our unique components, we can scope styles to them with a simple @container query.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/name-only-containers-the-scoping-we-needed.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
