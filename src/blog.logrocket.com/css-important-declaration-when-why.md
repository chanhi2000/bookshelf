---
lang: en-US
title: "When and why to use the CSS !important declaration"
description: "Article(s) > When and why to use the CSS !important declaration"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > When and why to use the CSS !important declaration"
    - property: og:description
      content: "When and why to use the CSS !important declaration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/css-important-declaration-when-why.html
prev: /programming/css/articles/README.md
date: 2022-04-06
isOriginal: false
author:
  - name: Ibadehin Mojeed
    url: https://blog.logrocket.com/author/ibadehinmojeed/
cover: /assets/image/blog.logrocket.com/css-important-declaration-when-why/banner.png
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
name="When and why to use the CSS !important declaration"
desc="The !important notation in CSS can be applied to override other conflicting rules for the matching selector."
url="https://blog.logrocket.com/css-important-declaration-when-why"
logo="/assets/image/blog.logrocket.com/favicon.png"
preview="/assets/image/blog.logrocket.com/css-important-declaration-when-why/banner.png"/>

`!important` in CSS is a special notation that we can apply to a CSS declaration to override other conflicting rules for the matching selector.

When we work on web projects, it is natural that we have some style declarations that other styles overrule.

This is not an issue for an experienced developer who understands the core mechanism of CSS. However, it can be difficult for beginners to understand why the style declarations they expect are not applied by the browser.

So, instead of them focusing on resolving the issue naturally, they tend to go for the quick fix by adding the `!important` declaration to enforce the style they expect. While this approach might work for that moment, it can also initiate another complex problem.

Enough said — let’s dive in.

---

## The CSS core mechanism

Understanding the core principles of CSS will naturally enable us to know when it’s obvious to use the `!important` declaration. In this section, we will walk through some of these mechanisms.

Consider the HTML and CSS code below, what color do you think the heading text will be?

First, the HTML:

```html title="index.html"
<h2 class="mytitle">This is heading text</h2>
```

Then, the CSS:

```css title="style.css"
h2 {
  color: blue;
}

h2 {
  color: green;
}
```

The text will render green! This is basic CSS fundamental. With the [**CSS cascade algorithm**](/blog.logrocket.com/how-css-works-understanding-the-cascade.md), the ordering of CSS rules matters. In this case, the declaration that comes last in the source code wins.

Normally, this is logical. In the first place, we should not repeat the same selector as we did above. CSS does not want repetition, so it uses the last declaration rule.

However, there are cases whereby we create generic styles for the root elements, like the `h2`, and then add classes to style specific elements. Let’s consider the following example as well, starting with the HTML:

```html title="index.html"
<h2>This is heading text</h2>
<h2 class="mytitle">This is heading text</h2>
```

Then, let’s see the CSS:

```css title="style.css"
.mytitle {
  color: blue;
}

h2 {
  color: green;
}
```

In the above code, the first `h2` element has no class applied, so it is obvious that it gets the green color of the `h2` selector.

However, the second `h2` element uses the rule for the class selector, `.mytitle`, even when the element selector rule comes last in the CSS code. The reason for that is that the [**class selector has a higher specificity**](/blog.logrocket.com/deep-dive-css-specificity.md) when compared to the element selector.

In other words, the weight applied to the declaration in a class selector is more than element selector’s weight.

Similarly, the declaration in an ID selector is more than that of the class selector. In this case, the red color in the code below takes precedence:

```html title="index.html"
<h2 id="maintitle" class="mytitle">This is heading text</h2> 
```

Followed by the CSS:

```css title="style.css"
.mytitle {
  color: blue;
}

#maintitle {
  color: red;
}

h2 {
  color: green;
}
```

Furthermore, an inline `style` attribute takes precedence over the ID selector, starting with the HTML:

```html title="index.html"
<h2 id="maintitle" style="color: black;" class="mytitle">This is heading text</h2> 
```

Then followed by the CSS:

```css title="style.css"
.mytitle {
  /*...*/
}

#maintitle {
  /*...*/
}

h2 {
  /*...*/
}
```

This is the ideal priority flow in CSS and must be maintained to avoid anomalies. The `!important` declaration most of the time comes when we are oblivious of these basic rules.

The inline style attribute and each of the selectors have values that browsers assign to them. That way, it knows which one has higher or lower priority. Think of this value as a number of four single digits with the `style` attribute assigned the strongest weight value of `1000`.

This follows the ID with a value of `0100`, then class with `0010`, and finally the element selector with `0001`.

Sometimes we can combine selectors targeting specific elements, as seen in the example below:

```html title="index.html"
<h2 id="maintitle" class="mytitle">This is heading text</h2> 
```

Followed by the CSS:

```css title="style.css"
h2.mytitle {
  color: blue;
}

#maintitle {
  color: red;
}

h2 {
  color: green;
}
```

The specificity of the `h2.mytitle` selector in the CSS above is the addition of `h2` and `.mytitle`. That is, `0001 + 0010 = 0011`. This total value, however, is less than that of the `#maintitle` ID that is `0100`.

So, the browser uses the declaration in the ID selector to override other conflicting rules. In a case of equal weight, the last rule declaration wins.

Now that we know which rules are most relevant and why the browser applies them, it will become naturally obvious whether or not to use this `!important` declaration.

---

## Understanding the `!important` declaration before we use it

Before we consider using the `!important` notation, we must ensure that we follow the specificity rule and use the CSS cascade.

In the code below, we have the `h2` and `h3` elements styled to be a `red` color:

```html title="index.html"
<h2 class="mytitle">This is heading II text</h2>
<h3 class="mytitle">This is heading III text</h3>
```

Then, `.mytitle` in CSS:

```css title="style.css"
.mytitle {
  color: red;
}
```

But, let’s say at some point, we want to give the `h3` element a `blue` color. Adding a style rule like the one below would not change the color because the class has more weight and it’s more specific than the element selector, as we’ve learned:

```css title="style.css"
.mytitle {...}
h3 {
  color: blue;
}
```

However, using the `!important` on the lesser weight makes the browser enforce that declaration over other conflicting rules:

```css title="style.css"
.mytitle {...}
h3 {
  color: blue !important;
}
```

This is because the `!important` notation increases the weight of the declaration in the cascade order of precedence. What this means is that we’ve disrupted the normal priority flow. Hence, bad practice, and can lead to difficulties in code maintenance and debugging.

If at some other point, we want to override the above important rule, we can apply another `!important` notation on a declaration with higher specificity (or the same if it is lower down in the source). It can then lead to something like this:

```css title="style.css"
h3 {
  color: blue !important;
}

/* several lines of rules */

.mytitle {
  color: green !important;
}
```

This is bad and should be avoided. Instead, we should check if:

1. Rearranging the rule or rewriting the selectors can solve the cascading issue
2. Increasing the specificity of the target element can solve the issue

Well, let’s find out. Back to our style rules, we can enforce a `blue` color on the `h3` element by increasing the specificity score.

As seen below, we can combine selectors until their specificity score supersedes the conflicting rule. The `h3.mytitle` selector gives a specificity score of `0011`, which is more than the `.mytitle` of `0010` score:

```css title="style.css"
.mytitle {...}
h3.mytitle {
  color: blue;
}
```

As we can see, instead of using the `!important` declaration to enforce a rule, we focus on increasing the specificity score.

---

## `:is()` and other related pseudo-class functions

Sometimes, we may trace issues to a pseudo-class function. So, knowing how it works can save us a lot of stress. Let’s see another example.

Imagine we are working on a project and see the following code:

```html title="index.html"
<h1 id="header">
  heading <span>span it</span>
  <a href="#">link it</a>
</h1>
<p class="paragraph">
  paragraph <span>span it</span>
  <a href="">link it</a>
</p>
```

Using the following CSS rules gives us the output after:

```css title="style.css"
:is(#header, p) span,
:is(#header, p) a {
  color: red;
}
```

![Output Heading Span It Link It](/assets/image/blog.logrocket.com/css-important-declaration-when-why/output-heading-span-it-link-it.png)

Now, let’s say we want to give the `span` and the link text in the paragraph another color of `blue`. We can do this by adding the following rule:

```css title="style.css"
.paragraph span,
.paragraph a {
  color: blue;
}
```

The earlier rule will override the `blue` color despite being further down the line:

![Blue Color](/assets/image/blog.logrocket.com/css-important-declaration-when-why/blue-color.png)

As a quick fix, we can enforce our `blue` color by using the `!important` notation like so:

```css title="style.css"
:is(#header, p) span,
:is(#header, p) a {...}

.paragraph span,
.paragraph a {
  color: blue !important;
}
```

But, as you may guess, that is bad practice, so we must not be quick to use the `!important` notation. Instead, we can start by analyzing how every selector works. The `:is()` is used in the code is a pseudo-class function for writing mega selectors in a more compressed form.

So, here is the following rule in the above code:

```css title="style.css"
:is(#header, p) span,
:is(#header, p) a {
  color: red;
}
```

Which is equivalent to the following:

```css title="style.css"
#header span,
p span,
#header a,
p a {
  color: red;
}
```

So, why is `.paragraph span` and `.paragraph a` not overriding the color despite having a specificity score of `0011`, which is higher than `0002` of the `p span` and `p a`.

Well, every selector in the `:is()` uses the highest specificity in the list of arguments. In that case, both the `#header` and the `p` in the `:is(#header, p)` uses the specificity score of the `#header`, which is `0100`. Thus, the browser sticks to its value because it has a higher specificity.

Thus, anytime we see this type of conflict, we are better off not using the pseudo-class function and sticking to its equivalent like the following:

```css title="style.css"
#header span,
p span,
#header a,
p a {
color: red;
}
```

Now, we should be able to see the expected result without using the `!important` notation that disrupts cascade order.

![Result With Important Notation](/assets/image/blog.logrocket.com/css-important-declaration-when-why/result-with-important-notation.png)

You can see for yourself [<FontIcon icon="iconfont icon-codesandbox"/>on CodeSandbox](https://codesandbox.io/s/falling-cookies-2ddlhx?file=/index.html).

---

## When exactly can we use `!important` declaration?

Below are a few occasions where using the `!important` notation is recommended.

### Utility classes

Assuming we want to style all buttons on a page to look the same, we can write a [**CSS rule that can be reused across a page.**](/blog.logrocket.com/css-utility-classes-library-extendable-styles.md) Let’s take a look at the following markup and style below:

```html title="index.html"
<p>Subscribe button : <a class="btn" href="#">Subscribe</a></p>

<section class="content">
  <p>
    This <a href="#" class="btn">button</a> style is affected by a higher specificity value .
  </p>
  A link here: <a href="#">Dont click</a>
</section>
```

Followed by the CSS:

```css title="style.css"
.btn {
  display: inline-block;
  background: #99f2f5;
  padding: 8px 10px;
  border: 1px solid #99f2f5;
  border-radius: 4px;
  color: black;
  font-weight: normal;
  text-decoration: none;
}

.content a {
  color: blue;
  font-weight: bold;
  text-decoration: underline;
}
```

In the above code, we can see that the button link within the `section` element is targeted by both selectors in the CSS. And, we learned that for conflicting rules, the browser will use the most specific rule. As we expect, `.content a` has a score of `0011` while `.btn` has a score of `0010`.

The page will look like this:

![Example Of Subscribe Page](/assets/image/blog.logrocket.com/css-important-declaration-when-why/subscribe-page-example.png)

In this case, we can enforce the `.btn` rule by adding the `!important` notation to the conflicting declarations like this:

```css
.btn {
  /* ... */
  color: black !important;
  font-weight: normal !important;
  text-decoration: none !important;
}
```

The page now looks as we expect:

![New Subscribe Page](/assets/image/blog.logrocket.com/css-important-declaration-when-why/new-subscribe-page.webp)

See for yourself [<FontIcon icon="iconfont icon-codesandbox"/>on CodeSandbox](https://codesandbox.io/s/quirky-cherry-39qdom?file=/style.css).

### The style rules we cannot override

This mostly happens when we don’t have total control over the working code. Sometimes, when we work with a content management system like WordPress, we may find that an inline CSS style in our WordPress theme is overruling our custom style.

In this case, the `!important` declaration is handy to override the theme inline style.

---

## Conclusion

The `!important` declaration is never meant to be used as we desire. We must only use it if absolutely necessary, such as a situation where we have less control over the code or very extreme cases in our own code.

Whether or not we use it depends on how we understand the core CSS mechanism, and in this tutorial, we covered that as well.

I hope you enjoyed reading this post. If you have questions or contributions, share your thought in the comment section and remember to share this tutorial around the web.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
"title": "When and why to use the CSS !important declaration",
"desc": "The !important notation in CSS can be applied to override other conflicting rules for the matching selector.",
"link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/css-important-declaration-when-why.html",
"logo": "/assets/image/blog.logrocket.com/favicon.png",
"background": "rgba(112,76,182,0.2)"
}
```
