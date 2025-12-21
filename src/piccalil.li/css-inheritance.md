---
lang: ko-KR
title: CSS inheritance
description: Article(s) > CSS inheritance
icon: fa-brands fa-css3-alt
category: 
  - CSS
  - Article(s)
tag: 
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: Article(s) > CSS inheritance
    - property: og:description
      content: CSS inheritance
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/css-inheritance.html
prev: /programming/css/articles/README.md
date: 2024-04-29
isOriginal: false
author:
  - name: Andy Bell
    url : https://piccalil.li/author/andy-bell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/5317863aa0317f901b8a9cbf0f25120e61268dfb13d6664819608439bebc4428/png?url=https://piccalil.li/og/css-inheritance/&width=1024&height=526&retina=true
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CSS inheritance"
  desc="Inheritance truly is a superpower and it’s what makes developing on the web a joy if you embrace it. In this quick post, I’m going to convert you into a super fan."
  url="https://piccalil.li/blog/css-inheritance/"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/5317863aa0317f901b8a9cbf0f25120e61268dfb13d6664819608439bebc4428/png?url=https://piccalil.li/og/css-inheritance/&width=1024&height=526&retina=true"/>

Just like [**the cascade and specificity**](/piccalil.li/a-primer-on-the-cascade-and-specificity.md) — for some reason — developers approach inheritance with fear. There’s no need for that though because inheritance is actually quite straightforward. It’s probably my favourite aspect of CSS too. Let me explain why.

Let’s say you have this CSS:

```css
body {
  color: DarkSlateBlue;
}
```

Along with a [<VPIcon icon="iconfont icon-webdev"/>bunch of other properties](https://web.dev/learn/css/inheritance?continue=https%3A%2F%2Fweb.dev%2Flearn%2Fcss%23article-https%3A%2F%2Fweb.dev%2Flearn%2Fcss%2Finheritance#which_properties_are_inherited_by_default), `color` is **inheritable**, which means every bit of text on the page — unless there’s a specific `color` defined — will now be `DarkSlateBlue`.

Let’s expand on this some more and bring in some HTML.

```html
<article>
  <h1>I am a heading</h1>
  <p>I am a paragraph.</p>
  <h2>Subscribe</h2>
  <form>
    <label for="email">Email address</label>
    <input type="email" id="email" placeholder="hello@test.com">
    <button>Submit</button>
  </form>
</article>
```

<CodePen
  link="https://codepen.io/piccalilli/pen/WNWyYXm/b16276869385bb5396a27013726f0521"
  title="Inheritance 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Looking at the demo, the headings, paragraph and label have `DarkSlateBlue` text, but the input (both placeholder and value) and button still have the default colour text. This is because they have specific colours assigned to them in dev tools, like so:

```css
button {
  color: buttontext;
}

input {
  color: fieldtext;
}
```

These are system colours that are applied in the user agent stylesheet — default styles applied by the browser. Because these elements have a `color` value applied, they won’t inherit the colour from `body`, like the other elements on the page are.

---

## The `inherit` keyword

This keyword is really handy. Not all CSS properties are inheritable, even though [<VPIcon icon="iconfont icon-webdev"/>a lot are](https://web.dev/learn/css/inheritance?continue=https%3A%2F%2Fweb.dev%2Flearn%2Fcss%23article-https%3A%2F%2Fweb.dev%2Flearn%2Fcss%2Finheritance#which_properties_are_inherited_by_default). You can use the `inherit` keyword to inherit those non-inheritable properties.

```css
article {
  display: flex;
}

h1 {
  display: inherit;
}
```

With this snippet, the `<h1>` will now have a **computed `display` value** of `flex`.

Back to our little snippet of HTML, though. Let’s make the input and button inherit the `DarkSlateBlue` colour. Colour is inheritable, but we can use the `inherit` keyword to force the element to inherit those properties over the default styles assigned by the user agent stylesheet.

```css
input, button {
  color: inherit;
}
```

<CodePen
  link="https://codepen.io/piccalilli/pen/MWRXzPw/24a836e51cac1a48eb8d77474784391c"
  title="Inheritance 2"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note FYI

Don’t worry, we’ll sort that placeholder out later in the article.

:::

Easy peasy right? Let’s push it a little further and use another inheritable property: `font`. We’ll set some font values on the body first:

```css
body {
  color: DarkSlateBlue;
  font-family: Tahoma;
  font-size: 2rem;
}
```

The magic of inheritance means all the text elements have again, inherited the `font-family` and all the text is bigger.

<CodePen
  link="https://codepen.io/piccalilli/pen/abxKQXW/e889f0f5e1bafa793b8aea5efa4d96e0"
  title="Inheritance 3"
  :default-tab="['css','result']"
  :theme="dark"/>

The reason the text elements like headings are bigger, with no additional sizing authored by us, is because the user agent styles size them with `em` units, which are a ratio of their parent’s computed `font-size`. For example, this is the `h1` font size style in the Chromium user agent style:

```css
h1 {
  font-size: 1.5em;
}
```

Because we set the `body` to have a `font-size` of `2rem`, my browser has computed that to `24px`. The `h1` has a `font-size` of `1.5em` which is `24 * 1.5`: `36px`.

::: note FYI

This is where the fear can step in for developers. It can make them feel like they are not in control of the user interface.

It’s better to create solid rules high up and let the browser do most of the work for you. This results in more resilient interfaces for users that **respect their preferences**. We build for everyone, not ourselves. [<VPIcon icon="fas fa-globe"/>Read more on these principles here](https://buildexcellentwebsit.es/).

:::

Right, back to our little demo. The problem is, our `placeholder` style is still grey. This is because in the user agent stylesheet, placeholders have a specific colour assigned to them, so they no longer inherit either the `body` colour *or* the `input` colour.

This is the placeholder rule in the Chromium user agent stylesheet.

```css
::-webkit-input-placeholder {
  -webkit-text-security: none;
  color: darkGray;
  pointer-events: none !important;
}
```

The `color` is set to `darkGray`, so even when the `input` is inheriting `color`, it won’t affect the placeholder because it has a more specific style assigned to it. No dramas though because all we need to do is this with a more cross-browser friendly selector:

```css
::placeholder {
  color: inherit;
}
```

<CodePen
  link="https://codepen.io/piccalilli/pen/bGJKQPP/7890122b9ce767258da906dccb127d1a"
  title="Inheritance 5"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note A note on placeholders

You should consider using `placeholder` in the first place, [<VPIcon icon="fas fa-globe"/>as Adrian Roselli notes](https://adrianroselli.com/2021/08/sentence-forms-not-mad-libs.html). [<VPIcon icon="iconfont icon-w3c"/>Eric Eggert helps you make sure it’s accessible](https://w3.org/WAI/tutorials/forms/instructions/#styling) if you do need to use them though.

:::

---

## Controlling inheritance

I’m waxing lyrical about how powerful inheritance is, but in the real world, you’re not building simple examples like the above. There’s going to be plenty of times where your element has inherited styles that you don’t want. Let’s look at some options.

### Write more specific styles

This is my most favoured approach. Just like we covered in [**the cascade and specificity primer**](/piccalil.li/a-primer-on-the-cascade-and-specificity.md): user agent styles are low in the cascade priority, so even writing flat type selectors like so, will do the job for you:

```css
a {
  color: red; /* Very easily overrides the user agent style */
}
```

This is how we’ve tackled the problems above and is probably the path of least resistance when authoring your CSS.

### Use keywords

Let’s run through `revert`, `initial` and `unset` keywords.

#### `revert`

```css
.my-element {
  color: revert;
}
```

This will set the property to the user agent stylesheet value — AKA the default browser style. So, if `.my-element` was a `<button>`, the colour would be set back to `buttontext`, like we covered earlier.

#### `unset`

```css
.my-element {
  color: unset;
}
```

This one can be a bit confusing. If the property you are assigning `unset` to is [<VPIcon icon="iconfont icon-webdev"/>inheritable](https://web.dev/learn/css/inheritance?continue=https%3A%2F%2Fweb.dev%2Flearn%2Fcss%23article-https%3A%2F%2Fweb.dev%2Flearn%2Fcss%2Finheritance#which_properties_are_inherited_by_default), then you are effectively doing this:

```css
.my-element {
  color: inherit;
}
```

If it’s not an inheritable property though, the property value will be the same as what the next keyword — `initial` — does.

#### `initial`

```css
.my-element {
  color: initial;
}
```

This is the nuclear option and I recommend avoiding. This will set the value back to the element’s CSS specification value, which in human terms means, it’s gonna remove the style all together.

::: note FYI

I tend to avoid `initial` and `unset` when authoring CSS. The `revert` keyword is powerful enough if you embrace inheritance, the cascade and specificity and letting the browser do the hard work for you.

:::

---

## Wrapping up

See, inheritance isn’t scary is it? It’s fantastically powerful and if you embrace it, you **will write less CSS**. You’ll also have a more maintainable codebase *and* your users will get a better experience overall. Magic.

It’s so different to traditional and native software development where you have to very specifically style every single element. I get why developers who come from that background don’t like CSS. It’s a shift in mental model though; **let go of the need for absolute control and everything becomes easier**. That’s a [<VPIcon icon="fas fa-globe"/>principle for building for the web in general](https://buildexcellentwebsit.es/) that will improve everything for you. Trust me.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS inheritance",
  "desc": "Inheritance truly is a superpower and it’s what makes developing on the web a joy if you embrace it. In this quick post, I’m going to convert you into a super fan.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/css-inheritance.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
