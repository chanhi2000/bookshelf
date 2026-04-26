---
lang: en-US
title: "CSS `n of` Selectors for Conditional Validation"
description: "Article(s) > CSS `n of` Selectors for Conditional Validation"
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
      content: "Article(s) > CSS `n of` Selectors for Conditional Validation"
    - property: og:description
      content: "CSS `n of` Selectors for Conditional Validation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-n-of-selectors-for-conditional-validation.html
prev: /programming/css/articles/README.md
date: 2026-05-04
isOriginal: false
author:
  - name: Preethi Sam
    url: https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9469
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
  name="CSS `n of` Selectors for Conditional Validation"
  desc=":nth-child supports the keyword `of` in the argument which can be super useful on it's own. Combo that with a :has() selector to do some pretty wild stuff!"
  url="https://frontendmasters.com/blog/css-n-of-selectors-for-conditional-validation/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9469"/>

Sometimes we do a cursory check on user input controls before they’re all set for data validation and submission. For instance, a form might only unlock its submit button when the user has filled in a certain number of fields. Or a user needs to fill in a field in the right way to take the next step.

This is a great way to **cut down on submission mistakes and help users make sure everything is as right as possible for submission with less hassle**. It’s even more effective when designed to give real-time feedback.

CSS lets you handle some of these simple checks right away, even before the browser’s validation routine runs following a submission trigger. The `:valid` and `:invalid` pseudo-classes are good examples of that. They allow browsers style fields as you type, so you can see if the data you’re entering is in the right format.

Similarly, **the `n of <selector-list>` syntax in the `:nth-child` selector can also be very useful for a preliminary validation**. First, let’s see what it does.

---

## About `n of` selectors

The `:nth-child()` selector picks elements from all siblings, counting from the first. The `n of selectors` syntax version does the same, but **only from siblings matching the given selectors**.

```css
/* selects second element */
:nth-child(2) { }

/* selects second of all elements with class marked */
:nth-child(2 of .marked) { }
```

<CodePen
  user="anon"
  slug-hash="EaNYZKN"
  title="nth of selector"
  :default-tab="['css','result']"
  :theme="dark"/>

Although not explicitly, in a rudimentary way, `n of` selectors can keep count of a selector’s matching elements. The same also works for pseudo-classes which usually indicate the state of an element. 

```css
label:nth-child(2 of :has(:checked)) {
  color: red;
}
```

Say, in a todo list, we want to give the user a sense of accomplishment as they clear items, perhaps every three? `n of selectors` can help with that, because we will know when a third or sixth `:checked` box appears in the list.

```css
.list:has(:nth-child(3 of :checked)) {
   /* A cheer for user on getting three things done in the list */
}
```

The demo below the second of all labels with a `:checked` box as a decendent.

<CodePen
  user="anon"
  slug-hash="GgNKrpB"
  title="nth of selector (:checked)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note Possible Webkit bug (April 2026)

In some contexts, state-based styling with “n of selector” may not work as expected in Webkit browsers. Compare with Firefox results.

:::

We apply the same idea to our initial check of input controls. Imagine a form where the user needs to fill out at least three fields. We give them a heads-up about this requirement before they begin, and once they’ve completed three fields, we let them know they’ve met that requirement. I’ll use simple validations in the demo to check if the fields are filled, but you can use any validation you prefer.

---

## The Example

Here are the fields:

```html
<div class="field">
  <!-- email label -->
  <input type="email" placeholder="jane.doe@example.org">
</div>
<div class="field">
  <!-- social url label -->
  <input type="url" placeholder="https://linkedin.com/janedoe">
</div>
<div class="field">
  <!-- social handle label -->  
  <input type="text" placeholder="@username">
</div>
<div class="field">
  <!-- gender label -->
  <span>
    <input type="radio" name="gender"> <!-- male label -->
    <input type="radio" name="gender"> <!-- female label -->
    <input type="radio" name="gender"> <!-- other label -->
  </span>
</div>
<div class="field">
  <!-- contact preference label -->
  <select  id="contact-preference">
    <option value="" selected><!-- text --></option>
    <option value="email"><!-- text --></option>
    <option value="phone"><!-- text --></option>
    <option value="whatsapp"><!-- text --></option>
    <option value="sms"><!-- text --></option>
  </select>
</div>
```

### Selectors for Validating

For the text, URL, and email, I’ll check **if the** `placeholder` **is visible**. If it isn’t, I’ll know the user has filled it in. For the radio group, I’ll check **if it’s** `:checked`. And for the select box, I’ll look for the **absence of the** `:checked` **state in the** `option` **with empty string value**.

```css
[type="email"]:not(:placeholder-shown),
[type="url"]:not(:placeholder-shown),
[type="text"]:not(:placeholder-shown),
[type="radio"]:checked,
option[value=""]:not(:checked) {}
```

**If any of the selectors above match, I’ll assume the user has filled a field**. If the user has filled three or more fields, `3 of selectors-for-filled-fields` syntax will match the third of all the filled fields. First, let me combine the selectors that use `placeholder` to shorten the code.

```css
:where([type="email"],
[type="url"],
[type="text"]):not(:placeholder-shown) {}
```

### Validation

To select `.field`s that have these controls:

```css
.field:has(
  :where([type="email"],[type="url"],[type="text"]):not(:placeholder-shown),
  [type="radio"]:checked, 
  option[value=""]:not(:checked)
) {}
```

And finally, to select the 3rd one of these `.field`s:

```css
:nth-child(3 of .field:has(
  :where([type="email"],[type="url"],[type="text"]):not(:placeholder-shown), 
  [type="radio"]:checked, 
  option[value=""]:not(:checked))) {
  /* Let user know they've filled three fields */
}
```

<CodePen
  user="anon"
  slug-hash="QwKJxQm"
  title="“n of selectors” for validation"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More Examples

Here’s a simplified version where the form becomes submit-able when two of the four (text-only) fields are filled out.

<CodePen
  user="anon"
  slug-hash="gbwyGgE"
  title="“n of selectors” for validation 2"
  :default-tab="['css','result']"
  :theme="dark"/>

And here’s another example where a special message is shown after the form when three of the fields are filled out.

<CodePen
  user="anon"
  slug-hash="EagJwWv"
  title="“n of selectors” for validation 3"
  :default-tab="['css','result']"
  :theme="dark"/>

Like I mentioned before, you can use any validations you like. For example, you could use `select:valid` for a `required` select box that’s been selected, or `:in-range` for a user input that’s within a `min`–`max` range. No matter what types of fields you’re using or how you’re validating them, you can use their validating state selectors to see **if a certain number of them have been found**.

I suggest letting users know what’s expected of them when filling out the form and letting them know when the preliminary checks have been cleared.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS `n of` Selectors for Conditional Validation",
  "desc": ":nth-child supports the keyword `of` in the argument which can be super useful on it's own. Combo that with a :has() selector to do some pretty wild stuff!",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-n-of-selectors-for-conditional-validation.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
