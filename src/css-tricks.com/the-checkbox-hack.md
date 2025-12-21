---
lang: en-US
title: "The “Checkbox Hack” (and things you can do with it)"
description: "Article(s) > The “Checkbox Hack” (and things you can do with it)"
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
      content: "Article(s) > The “Checkbox Hack” (and things you can do with it)"
    - property: og:description
      content: "The “Checkbox Hack” (and things you can do with it)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-checkbox-hack.html
prev: /programming/css/articles/README.md
date: 2011-12-21
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="The “Checkbox Hack” (and things you can do with it)"
  desc="Using a hidden checkbox, you can re-create a lot of functionality on website that rely on clicks and toggled states. Fair warning, it's not always super semantic or a good idea, but it's awful fun to play with."
  url="https://css-tricks.com/the-checkbox-hack"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The “Checkbox Hack” is where you use a connected `<label>` and `<input type="checkbox">` and usually *some other element* you are trying to control, like this:

```html
<label for="toggle">Do Something</label>
<input type="checkbox" id="toggle">
<div class="control-me">Control me</div>
```

Then with CSS, you hide the checkbox entirely. Probably by kicking it off the page with absolute positioning or setting its opacity to zero. But just because the checkbox is hidden, clicking the `<label>` still toggles its value on and off. Then you can use the adjacent sibling combinator to style the `<div>` differently based on the `:checked` state of the input.

```css
.control-me {
  /* Default state */
}
#toggle:checked ~ .control-me {
  /* A toggled state! No JavaScript! */
}
```

So you can style an element completely differently depending on the state of that checkbox, which you don’t even see. Pretty neat. Let’s look at a bunch of things the “Checkbox Hack” can do.

<CodePen
  user="chriscoyier"
  slug-hash="vYERPwM"
  title="The Checkbox Hack"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Some of this stuff crosses the line of what you “should” do with CSS and introduces some questionable semantics. It’s still very fun to play with and cool that it’s possible, but in general, functional behavior should be controlled by JavaScript.

:::

---

## Custom Designed Radio Buttons and Checkboxes

<CodePen
  user="GeoffreyCrofte"
  slug-hash="ALxorW"
  title="Accessible Custom Checkboxes with CSS only"
  :default-tab="['css','result']"
  :theme="dark"/>

You can hide the default UI of a radio button or checkbox, and display a custom version right on top of it.

```component VPCard
{
  "title": "Custom radio and checkbox inputs using CSS",
  "desc": "In my never ending quest to find weird and wonderful ways to abuse CSS and all its little intricacies, I have come up with a pretty good way of using CSS to create custom radio and checkbox inputs without JavaScript, that are accessible, keyboard controlled, don’t use any hacks and degrade nicely in non supporting browsers. The journey wasn’t easy and I was on the brink of filing it in the “to crazy” folder, never to be seen again. Luckily I had a brain wave that paid off and actually allowed this to be a very viable solution that degrades beautifully and works in 80% of the browsers. This is my story.",
  "link": "https://ryanseddon.com/css/custom-inputs-using-css//",
  "logo": "https://ryanseddon.com/favicon-16x16.png",
  "background": "rgba(51,51,51,0.2)"
}
```

<SiteInfo
  name="How to Customize Checkbox and Radio Inputs with Custom CSS | Wufoo"
  desc="Use Custom CSS to customize checkbox and radio inputs on your HTML forms."
  url="https://wufoo.com/guides/custom-radio-buttons-and-checkboxes//"
  logo="https://wufoo.com/wp-content/themes/wufoo-site/img/favicons/favicon-16x16.png"
  preview="https://wufoo.com/images/guides/custom-radio-buttons-and-checkboxes/example-01.png"/>

---

## File system like “tree menu”

![[<VPIcon icon="fas fa-globe"/>Demo by Ryan Seddon](https://thecssninja.com/css/css-tree-menu)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/12/file-system.png?resize=1428%2C1228&ssl=1)

---

## Tabbed Areas

The “tabs” design pattern is just toggling on and off of areas, perfect for the checkbox hack. But instead of checkboxes, in which any checkbox can be on or off independently of one another, these tabs use radio buttons in which only one per group can be on at a time (like how only one tab can be active at a time).

Demo from [**Functional CSS tabs revisited**](/css-tricks.com/functional-css-tabs-revisited.md):

<CodePen
  user="chriscoyier"
  slug-hash="bGNxzdd"
  title="Functional CSS Tabs"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dropdown Menus

<CodePen
  user="chriscoyier"
  slug-hash="eYmbybO"
  title="Radio Button Dropdowns"
  :default-tab="['css','result']"
  :theme="dark"/>
---

## Push Toggles

A toggle can take the form of ON/OFF, which can be done with a single `<input type="checkbox">`. Like [**emoji toggles**](/css-tricks.com/emoji-toggles.md)!

<CodePen
  user="chriscoyier"
  slug-hash="JjozJLv"
  title="CSS Checkbox Toggle Switch"
  :default-tab="['css','result']"
  :theme="dark"/>

Or it could be multiple `<input type="checkbox">` elements to switch between differnet distinct values.

<VidStack src="https://css-tricks.com/wp-content/uploads/2011/12/radios.mp4" />

Those are radio inputs in this [<VPIcon icon="fas fa-globe"/>MPG calculator](https://weblaunchr.com/whatsmympg/)

---

## FAQ Answer Revealing

You’d probably just use a `<details>`/`<summary>` combo for this these days, but expandable sections can be done with the checkbox hack.

<CodePen
  user="chriscoyier"
  slug-hash="qBEvjKy"
  title="FAQ without Details/Summary (checkbox hack)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Hide the Sidebar

Like the old school Octopress theme.

<CodePen
  user="chriscoyier"
  slug-hash="zYxbzLp"
  title="Hide the Sidebar with Checkbox Hack"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The “Checkbox Hack” (and things you can do with it)",
  "desc": "Using a hidden checkbox, you can re-create a lot of functionality on website that rely on clicks and toggled states. Fair warning, it's not always super semantic or a good idea, but it's awful fun to play with.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-checkbox-hack.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
