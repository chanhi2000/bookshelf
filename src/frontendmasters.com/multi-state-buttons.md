---
lang: en-US
title: "Multi-State Buttons"
description: "Article(s) > Multi-State Buttons"
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
      content: "Article(s) > Multi-State Buttons"
    - property: og:description
      content: "Multi-State Buttons"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/multi-state-buttons.html
prev: /programming/css/articles/README.md
date: 2024-12-05
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4677
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
  name="Multi-State Buttons"
  desc="Typically, buttons are either pressed or they aren't. But as long as you handle it accessibly, you can make a group of radio inputs look like a multi-state button with some CSS trickery."
  url="https://frontendmasters.com/blog/multi-state-buttons/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4677"/>

There are traditional ways for a user to pick one-option-from-many. The classics beeing a `<select>` or a group of `<input type="radio">` elements.

But it’s nice to have more options. Sometimes when a user must choose one option from many, it’s nice to have a single element that switches between available option on a quick click. A practical example of such a singular UI is a tag control that transitions through various states on each click. Any given tag in an interface like this could be be in *three* different states:

1. Disregarded in search results (default state)
2. Search results **must include** tag
3. Search results **must exclude** tag

Here’s an image example of such a UI:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/s_2B6564E11D1E51AC46777C57EB87ECE5CDB861925A4A306B5E22E667A57CB6A7_1732966272424_tagcloud.png?resize=1024%2C632&ssl=1)

---

## The Plan

We’ll be coding such a control using a set of *stacked* HTML radio buttons.

The UI’s functionality — jumping through different states on each click — is implemented by a bit of CSS-only trickery. We’ll be changing the value of the CSS property `pointer-events` in the radio buttons when one is selected.

The `pointer-events` property when applied to HTML elements determines whether a pointer event, such as a `click` or `hover` — through mouse pointer, touch event, stylus usage, etc — occurs on an element or not. By default, the events do occur in the elements, which is equivalent to setting `pointer-events: auto;`.

If `pointer-events: none;` is set, that element won’t receive any pointer events. This is useful for stacked or nested elements, where we might want a top element to ignore pointer events so that elements below it become the target.

The same will be used to create a multi-state control in this article.

---

## Basic Demo

Below is a basic control we’ll be coding towards to demonstrate the technique. I’ll also include a Pen for the movie tags demo, shown before, at the end.

<CodePen
  user="rpsthecoder"
  slug-hash="yLmwMww"
  title="Muti-state control (three states)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```html
<div class="control">
  <label class="three">
    <input type="radio" name="radio" />
    Third state
  </label>

  <label class="two">
    <input type="radio" name="radio" />
    Second state
  </label>

  <label class="one">
    <input type="radio" name="radio" checked />
    First state
  </label>
</div>
```

```scss :collapsed-lines
.control {
    width: 100px;
    line-height: 100px;
    label {
        width: inherit;
        position: absolute; 
        text-align: center;
        border: 2px solid;
        border-radius: 10px;
        cursor: pointer;
        input {
            appearance: none;
            margin: 0;
        }
    }
    .one {
        pointer-events: none;
        background: rgb(247 248 251);
        border-color: rgb(199 203 211); 
    }
    .two {
        background: rgb(228 236 248);
        border-color: rgb(40 68 212); 
    }
    .three {
        background: rgb(250 230 229);
        border-color: rgb(231 83 61);
    }
}
```

In HTML shown above, there are three `<input>` radio buttons (for three states), which are nested within their respective `<label>` elements.

The label elements are stacked over each other within the parent `<div>` element (`.control`), sharing the same dimensions and style. The default appearance of the radio buttons is removed. Naturally, the label elements will trigger the check/uncheck of the radio buttons within them.

Each label is colored differently in CSS. By default, the topmost label (`.one`) is checked on page load for having the `checked` HTML attribute. In CSS, its `pointer-events` property is set to `none`.

Which means when we click the control, the topmost label isn’t the target anymore. Instead, it clicks the label below it and checks its radio button. Since only one radio button in a group with the same name attribute can be checked at a time, when the bottom label is checked, its radio button unchecks the topmost label’s. Consequently, the control transitions from its first to second state.

That’s the basis of how we’re coding a multi-state control. Here’s how it’s programmed in the CSS for all the labels and, consequently, their radio buttons:

```scss
label:has(:checked) {
    ~ label {
        opacity: 0;
    }
    &:is(:not(:first-child)) {
        pointer-events: none;
        ~ label { pointer-events: none; }
    }
    &:is(:first-child) {
        ~ label { pointer-events: auto; }
    }
}
```

When a label’s radio button is checked, the following labels in the source code are hidden with `opacity: 0` so that it alone is visible to the user.

If a checked radio button’s label isn’t the first one in the source code (bottom-most on screen), it and the labels after it get `pointer-events: none`. This means the label underneath it on the screen becomes the target of any following pointer events.

If the checked radio button’s label is the first one in the source code (bottom-most on screen), all the labels after it get the `pointer-events` value `auto`, allowing them to receive future pointer events. This resets the control.

In a nutshell, when a user selects a state, the following state becomes selectable next by giving the current and all previously selected states `pointer-events: none`.

---

## Usage Warning

Although this method is applicable to any number of states, I would recommend limiting it to three for typical user controls like tags, unless it’s a fun game where the user repeatedly clicks the same box and sees something different each time. Additionally, it’s apt to consider whether keyboard navigation is to be supported or not. If it is, it would be more practical to adopt a user experience where users can see all reachable options using the tab and navigation keys, rather than showing a single UI.

---

## Advanced Demo

Below is a prototype for a tag cluster composed of three-state tags designed to filter movie search results based on genres. For instance, if a user wants to filter for comedy movies that are not action films, they can simply click on comedy once to include it and on action twice to exclude it. If you’re curious about how the counts of included and excluded tags are calculated in the demo below, refer to the list under the Further Reading section.

<CodePen
  user="rpsthecoder"
  slug-hash="yLmwMZZ"
  title="Muti-state control (tag cloud)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Further Reading

<SiteInfo
  name="pointer-events - CSS: Cascading Style Sheets | MDN"
  desc="The pointer-events CSS property sets under what circumstances (if any) a particular graphic element can become the target of pointer events."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="<input type='radio'> - HTML: HyperText Markup Language | MDN"
  desc="<input> elements of type radio are generally used in radio groups—collections of radio buttons describing a set of related options."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="Counting With CSS Counters And CSS Grid | CSS-Tricks"
  desc="In this post, we're going to demonstrate how we can use the source order independence of CSS Grid to solve a layout issue that's the result of a source order constraint. Specifically, we're going to look at checkboxes and CSS Counters—two concepts that rely on source order when used together."
  url="https://css-tricks.com/counting-css-counters-css-grid/"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/266050"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Multi-State Buttons",
  "desc": "Typically, buttons are either pressed or they aren't. But as long as you handle it accessibly, you can make a group of radio inputs look like a multi-state button with some CSS trickery.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/multi-state-buttons.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
