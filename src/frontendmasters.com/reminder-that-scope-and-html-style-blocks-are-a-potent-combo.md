---
lang: en-US
title: "Reminder that @scope and HTML style blocks are a potent combo"
description: "Article(s) > Reminder that @scope and HTML style blocks are a potent combo"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - "@scope"
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Reminder that @scope and HTML style blocks are a potent combo"
    - property: og:description
      content: "Reminder that @scope and HTML style blocks are a potent combo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/reminder-that-scope-and-html-style-blocks-are-a-potent-combo.html
prev: /programming/css/articles/README.md
date: 2024-10-07
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4121
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
  name="Reminder that @scope and HTML style blocks are a potent combo"
  desc="There is an entirely web-platform way of injecting scoped CSS styles into the DOM. It's requires zero tooling. Will we see it being used more, once Firebox support is there?"
  url="https://frontendmasters.com/blog/reminder-that-scope-and-html-style-blocks-are-a-potent-combo/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4121"/>

There are *so many* different tools for writing scoped CSS with very different takes on how to go about it. Sometimes it’s only a sub-feature of a tool that does other things. But it’s generally thought of as a concept the requires tooling to accomplish.

Have you ever written a React component that imported scoped styles, perhaps as a CSS module?

```js
import styles from "./MyComponent.module.css";
```

Or used a Styled Component to push some styles onto a component you’re already defining?

```js
const Button = styled.button
```

Maybe your Vue components used `<style scoped>` blocks within them like you can do with Vue Single File Components out of the box?

```html
<template>
  <button>Submit</button>
</template>

<style scoped> 
  button {
    border: 3px solid green;
  }
</script>
```

Despite the seemingly widely-applicable `button` selector above, the styles will actually be tightly scoped to the button you see in the template after processing.

Or maybe you use Tailwind to apply styling classes directly to elements and like it partially because you don’t have to “name anything”.

There are *a lot* of solutions like this out there in the land of building websites. **I’m pretty convinced myself that scoped CSS is a good idea:**

- There is little to worry about. Styles won’t leak out and have unintended consequences.
- It’s possible to do efficient things like not load the styles for components that don’t appear on a particular page at the time of loading.
- When a component retires, so do it’s styles.
- Styles are often “co-located” with the component, meaning there is a logical obvious connection between markup and styles.

**I’m here to tell you: you can do all this stuff with just HTML and CSS.**

And I’m not even talking about Web Components or anything particularly controversial or limiting. Vanilla HTML and CSS.

What you do is dump a `<style>` block in the HTML at the point you want the styles scoped. Just like this:

```html
<main>
  <div>
    <p>Dum de dum de dum.<p>
  </div>

  <div>
    <p>Hi ho here we go.</p>

   <style>
      @scope { /* Scope is the <div> above, as this is a direct child. */
        :scope { /* This selects the <div> */
          border: 1px solid red;
          /* I can use CSS nesting in here, ensuring *everything* is safely scoped */
          p { color: red; }
        }
      } 
    </style>
  </div>
</main>
```

Here’s an example of using it where one of these three `<article>`s has a scoped styles variation:

<CodePen
  user="chriscoyier"
  slug-hash="poMbRmG"
  title="Using Scope"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

I’m using the scoped styles as a “variation” there, but the whole block of styles of that component could be used like that whether it is a variation or not. It’s a way to apply styling *only* to a particular branch of the ol’ DOM tree. No tooling required. Any way you produce components that end up in the DOM could be done this way, from basic HTML includes to fancy framework components.

Why isn’t this being used much?

Well, it’s the Firefox support mostly I think. Firefox just straight up doesn’t [<VPIcon icon="fas fa-globe"/>support it](https://caniuse.com/css-cascade-scope) at the time of this writing. I’d say this is a strong candidate for Interop 2025. It looked like it was tried for in 2024 but maybe it was too new or something. But maybe Interop isn’t needed as it appears as if it’s being [<VPIcon icon="fa-brands fa-firefox"/>actively worked on](https://bugzilla.mozilla.org/show_bug.cgi?id=1830512), so maybe it won’t be long, dunno.

Once Firebox support is there, I could imagine this as being highly used as a way to accomplish scoped styles for components. It doesn’t require *any* tooling or have *any* limitations on what CSS you can use. I would think that would appeal to any existing CSS scoping tool as it would require them to do much less work and work faster.

[<VPIcon icon="fa-brands fa-firefox"/>CSS @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope) can do more things, but this particular feature is my favorite and likely to have the biggest impact over time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reminder that @scope and HTML style blocks are a potent combo",
  "desc": "There is an entirely web-platform way of injecting scoped CSS styles into the DOM. It's requires zero tooling. Will we see it being used more, once Firebox support is there?",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/reminder-that-scope-and-html-style-blocks-are-a-potent-combo.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
