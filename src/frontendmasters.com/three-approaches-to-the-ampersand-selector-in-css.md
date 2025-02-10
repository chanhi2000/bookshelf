---
lang: en-US
title: "Three Approaches to the “&” (ampersand) Selector in CSS"
description: "Article(s) > Three Approaches to the “&” (ampersand) Selector in CSS"
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
      content: "Article(s) > Three Approaches to the “&” (ampersand) Selector in CSS"
    - property: og:description
      content: "Three Approaches to the “&” (ampersand) Selector in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/three-approaches-to-the-ampersand-selector-in-css.html
prev: /programming/css/articles/README.md
date: 2025-02-07
isOriginal: false
author: 
  - name: Preethi Sam
    url: https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5123
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
  name="Three Approaches to the “&” (ampersand) Selector in CSS"
  desc="The & is a powerful addition to CSS, allowing us to craft selectors without repetition and helping organization and understanding."
  url="https://frontendmasters.com/blog/three-approaches-to-the-ampersand-selector-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5123"/>

In CSS nesting, the `&` (ampersand symbol) selector adds style rules based on the relation between nested selectors. For example, a pseudo-class (`:hover`) nested inside a type selector (`div`) becomes a compound selector (`div:hover`) when the nested pseudo-class is prefixed with `&`.

```scss
div {
  &:hover {
    background: green;
  }
}

/*
The above code is equivalent to:
div:hover {
  background: green;
}
*/
```

A use-case for the `&` selector is to combine it with the `:has()` pseudo-class to select and style elements based on the child elements they contain. In the following example, a `label` is styled for when the checkbox within it is checked.

```html
<label>
  <input type="checkbox">
  Allow access to all files
</label>
```

```scss
label {
  /* etc. */
  &:has(:checked) {
    border: 1px solid lime;
  }
}

/*
  The above code is equivalent to:
  label:has(:checked) {
    border: 1px solid lime;
  }
*/
```

<CodePen
  user="rpsthecoder"
  slug-hash="ogvVEGJ"
  title="Ampersand selector (standard)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In a way, the `&` symbol is a placeholder for the outer level selector in the nesting hierarchy. **This enables flexible combinations of selectors customized to suit our code’s modular organization preferences**. In this article, we’ll see three kinds of modular possibilities with the `&` selector in native CSS.

---

## 1) Linked Class Names

Starting with the easiest approach, the `&` selector can be used to combine class names. Elements often have multiple class names to group and style them together. Sometimes, grouping is within a module, and other times style rules can intersect between modules due to shared class names.

**By using the** `&` **selector to concatenate class names, style rules for elements within a module can be arranged together based on their shared class names.**

In the example below, the three card modules, grouped under the class name `cards`, share most style rules, such as dimensions. However, they have different background images to reflect their content, defined separately within the `.cards` ruleset by concatenating the `&` selector with the exclusive class names of each card.

```html
<div class="cards trek">
  <p>Trekking</p>
</div>
<div class="cards wildlife">
  <p>Wildlife spotting</p>
</div>
<div class="cards stargaze">
  <p>Stargazing camp</p>
</div>
```

```scss
.cards {
  background: center/cover var(--bg);

  &.trek {
    --bg: url("trek.jpg");
  }
  &.wildlife {
    --bg: url("wildlife.jpg");
  }
  &.stargaze {
    --bg: url("stargaze.jpg");
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="pvzQKyL"
  title="Ampersand selector (concatenate class names)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Class names can also be connected using the attribute selector:

```html
<div class="element-one">text one</div>
<div class="element-two">text two</div>
```

```scss
[class|="element"] {
  &[class$="one"] { color: green; }
  &[class$="two"] { color: blue; }
}
```

Another example is:

```html
<div class="element_one">text one</div>
<div class="element_two">text two</div>
```

```scss
[class^="element"] {
  &[class$="one"] { color: green; }
  &[class$="two"] { color: blue; }
}
```

---

## 2) Parent and Previous Element Selectors

The conventional method of organizing nested style rulesets involves including the rulesets of child elements within the ruleset of their parent elements.

```html
<p class="error">
  Server down. Try again after thirty minutes. 
  If you still can't access the site, 
  <a href="/errorReport">submit us a report</a>. 
  We'll resolve the issue within 24hrs.
</p>
```

```scss
.error {
  color: red;
  a {
    color: navy;
  }
}
```

However, the opposite is also possible due to the `&` selector: nesting a parent element’s style rules within its child element’s ruleset. This can be beneficial when it’s easier to **organize an element’s style rules by its purpose rather than its position in a layout**.

For instance, styling can be static or dynamic. Dynamic styling happens when user interactions, or scripts, trigger the application of a selector’s ruleset to an element on a page. In such cases, it’s convenient to categorize rulesets into dynamic and static.

In the following example, all rules related to the appearance of the agreement modules upon page load, such as layout, dimensions, and colors, are included in the `.agreements` ruleset. However, the style rules that modify the appearance of the agreement modules when their checkboxes are checked, i.e **when user interaction occurs**, are placed within the nesting selector `.isAgreed:checked`.

```html :collapsed-lines
<article class="agreements terms">
  <header><!-- ... --></header>
  <section>
    <input class="isAgreed" type="checkbox" />
    <!-- ... -->
  </section>
  <footer><! -- ... --></footer>
</article>
<article class="agreements privacy">
  <header><!-- ... --></header>
  <section>
    <input class="isAgreed" type="checkbox" />
    <!-- ... -->
  </section>
  <footer><! -- ... --></footer>
</article>
<article class="agreements diagnostics">
  <header><!-- ... --></header>
  <section>
    <input class="isAgreed" type="checkbox" />
    <!-- ... -->
  </section>
  <footer><!-- ... --></footer>
</article>
```

```scss :collapsed-lines
.agreements {
  /* etc. */
  &.terms {  --color: rgb(45 94 227);  }
  &.privacy { --color: rgb(231 51 35); }
  &.diagnostics { --color: rgb(59 135 71); }
  /* etc. */
}

.isAgreed:checked { 
  /* checkbox's background color change */
  background: var(--color);
  /* checkbox's border color change */
  border-color: var(--color);
  /* checkbox shows a checkmark */
  &::before { content: '\2713'; /* checkmark (✓) */ }
  
  /* Agreement section's (checkbox's parent) border color change */
  .agreements:has(&) { 
    /* same as .agreements:has(.isAgreed:checked) */
    border-color: var(--color); 
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="xbKQzON"
  title="Ampersand selector (parent elements)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In the above demo, a parent element selection is shown as example, but the same logic applies for previous element selections as well.

```html
<p>some text</p>
<input type="checkbox"/>
```

```scss
/* When the checkbox is checked */
:checked {
  /* 
    rules to style the checkbox
  */

  /* style for <p> when the checkbox is checked */
  p:has(+&) { 
    /* same as p:has(+:checked) */
    color: blue;    
  }
}
```

---

## 3) Recurring Selectors

With IDs, class names, semantic markup, and so forth, we rarely need to repeat selectors within compound selectors to achieve specificity. However, **repeating selectors are still useful, particularly when the same type of elements are styled similarly but with slight adjustments based on their positions in the layout and among themselves**.

A good example of this is how paragraphs are typically spaced in an article. There’s the spacing between each paragraph, and the spacing between the paragraphs and another kind of element, such as an image, that’s inserted between them.

```html :collapsed-lines
<article>
  <header><!--...--></header>
  
  <p><!--...--></p>
  
  <figure><!--...--></figure>
  
  <p><!--...--></p>
  <p><!--...--></p>
  <p><!--...--></p>
  
  <blockquote><!--...--></blockquote>
  
  <p><!--...--></p>
  <p><!--...--></p>
  
  <figure><!--...--></figure>
  
  <p><!--...--></p>
  
  <footer><!--...--></footer>
</article>
```

```scss :collapsed-lines
article {
  /* etc. */
  p {
    margin: 0;
    
    /* <p> that's after/below an element that's not <p> */
    *:not(&) + & { 
      margin-top: 30px; 
    }
    
    /* <p> that's before/above an element that's not <p> */
    &:not(:has(+&)) { 
      margin-bottom: 30px; 
    } 
    
    /* <p> that's after/below another <p> */
    & + & {
      margin-top: 12px; 
    }
  }
  /* etc. */
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="xbKQzEN"
  title="Ampersand selector (recurring selectors)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In the above example, the gaps between paragraphs are small compared to the larger gaps between a paragraph and a non-paragraph element.

The selectors can be explained like:

1. `*:not(p) + p` — The paragraph below a non-paragraph element has a larger top margin
2. `p:not(:has(+p))` — The paragraph above a non-paragraph element has a larger bottom margin
3. `p + p` — The paragraph below another paragraph has a smaller top margin

Besides its flexibility, another compelling reason to use the `&` selector in organizing our code is that it lacks its own specificity. This means we can **rely on the specificity of the usual selectors and the nesting hierarchy** to apply the rules as intended.

---

## Using `&` in Vanilla CSS vs. Using `&` in Frameworks

The `&` is vanilla CSS always represents the outer level *selector*, which might not be the case for the `&` used in CSS frameworks, such as Sass. The `&` in frameworks could mean the outer level *string*.

```html
<div class="parent--one">text one</div>
<div class="parent--two">text two</div>
```

In Sass (SCSS), the style could be:

```scss
.parent {
  &--one { color: green; }
  &--two { color: blue; }
}
```

That will not work in vanilla CSS, but it still can be done! A similar ruleset would be:

```scss
[class|="parent"] {
  &[class$="--one"] { color: green; }
  &[class$="--two"] { color: blue; }
}
```

Note that, in the SCSS code, there is no real `.parent` selector, as in no element on page matches it, whereas in CSS, `[class|="parent"]` *will* match an element. If we add a style rule to the outer level ruleset in both of those code snippets, the SCSS will fail to find an element to apply the style rule, whereas the CSS will apply the style to both the elements that has the class name starting with `parent`.

```scss
.parent {
  font-weight: bold; /* this won’t work, as it doesn't match anything */
  &--one { color: green; }
  &--two { color: blue; }
}
```

```scss
[class|="parent"] {
  font-weight: bold; /* works */
  &[class$="one"] { color: green; }
  &[class$="two"] { color: blue; }
}
```

Hence, the downside of an `&` that represents a selector-syntax string rather than a viable selector is that it might mislead us into thinking elements matching the perceived selector exist when they don’t, something that we don’t have to worry with the native `&` selector.

::: info <FontIcon icon="iconfont icon-w3c"/>CSS Nesting Module 1, W3C (<code>w3.org</code>)

```component VPCard
{
  "title": "CSS Nesting Module",
  "desc": "This module introduces the ability to nest one style rule inside another, with the selector of the child rule relative to the selector of the parent rule. This increases the modularity and maintainability of CSS stylesheets.",
  "link": "https://w3.org/TR/css-nesting-1/#nest-selector/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(72,126,174,0.2)"
}
```

When using a nested style rule, one must be able to refer to the elements matched by the parent rule; that is, after all, the entire point of nesting. To accomplish that, this specification defines a new selector, the nesting selector, written as `&` (`U+0026` AMPERSAND).

When used in the selector of a nested style rule, the nesting selector **represents the elements matched by the parent rule**. When used in any other context, it represents the same elements as :scope in that context (unless otherwise defined).

:::

On the other hand, we can combine strings more freely to produce the selectors we want using the `&` in frameworks. Which is useful when class names are extensively relied on for modularity.

Either way, grouping style rulesets is crucial for enhancing code readability, maintainability, and to provide a desired order of use among conflicting style rules. The `&` selector in native CSS can help with that, as well as in **specifying selection criteria that might otherwise be challenging to define**.

---

## Further Reading

<SiteInfo
  name="CSS nesting - CSS: Cascading Style Sheets | MDN"
  desc="The CSS nesting module defines a syntax for nesting selectors, providing the ability to nest one style rule inside another, with the selector of the child rule relative to the selector of the parent rule."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>


```component VPCard
{
  "title": "Selectors Level 4",
  "desc": "Selectors are patterns that match against elements in a tree, and as such form one of several technologies that can be used to select nodes in a document. Selectors have been optimized for use with HTML and XML, and are designed to be usable in performance-critical code. They are a core component of CSS (Cascading Style Sheets), which uses Selectors to bind style properties to elements in the document. Selectors Level 4 describes the selectors that already exist in [SELECT], and further introduces new selectors for CSS and other languages that may need them.",
  "link": "https://w3.org/TR/selectors-4/#overview",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(72,126,174,0.2)"
}
```

<SiteInfo
  name="Specifics On CSS Specificity | CSS-Tricks"
  desc="Let's specifically cover this subject. (rimshot!)"
  url="https://css-tricks.com/specifics-on-css-specificity//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/855"/>

```component VPCard
{
  "title": "Using :has() as a CSS Parent Selector and much more",
  "desc": "It’s been a long-standing dream of front-end developers to have a way to apply CSS to an element based on what’s happening inside that element.",
  "link": "https://webkit.org/blog/13096/css-has-pseudo-class//",
  "logo": "https://webkit.org/favicon.ico",
  "background": "rgba(0,37,61,0.2)"
}
```

<SiteInfo
  name="Attribute selectors - CSS: Cascading Style Sheets | MDN"
  desc="The CSS attribute selector matches elements based on the element having a given attribute explicitly set, with options for defining an attribute value or substring value match."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Three Approaches to the “&” (ampersand) Selector in CSS",
  "desc": "The & is a powerful addition to CSS, allowing us to craft selectors without repetition and helping organization and understanding.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/three-approaches-to-the-ampersand-selector-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
