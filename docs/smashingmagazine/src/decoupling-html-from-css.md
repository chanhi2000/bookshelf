---
lang: en-US
title: "Decoupling HTML From CSS"
description: "Article(s) > Decoupling HTML From CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Decoupling HTML From CSS"
    - property: og:description
      content: "Decoupling HTML From CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/decoupling-html-from-css.html
prev: /programming/css/articles/README.md
date: 2012-04-20
isOriginal: false
author:
  - name: Jonathan Snook
    url: https://smashingmagazine.com/author/jonathan-snook/
cover: https://smashingmagazine.com/images/smashing-homepage.png
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
  name="Decoupling HTML From CSS"
  desc="For years, the Web standards community has talked about the separation of concerns. Separate your CSS from your JavaScript from your HTML. We all do that, right? CSS goes into its own file; JavaScript goes in another; HTML is left by itself, nice and clean."
  url="https://smashingmagazine.com/2012/04/decoupling-html-from-css/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://smashingmagazine.com/images/smashing-homepage.png"/>

For years, the Web standards community has talked about the separation of concerns. Separate your CSS from your JavaScript from your HTML. We all do that, right? CSS goes into its own file; JavaScript goes in another; HTML is left by itself, nice and clean.

For years, the Web standards community has talked about the separation of concerns. Separate your CSS from your JavaScript from your HTML. We all do that, right? CSS goes into its own file; JavaScript goes in another; HTML is left by itself, nice and clean.

[<VPIcon icon="fas fa-globe"/>CSS Zen Garden](https://csszengarden.com/) proved that we can alter a design into a myriad of permutations simply by changing the CSS. However, we’ve rarely seen the flip side of this — the side that is more likely to occur in a project: the HTML changes. We modify the HTML and then have to go back and revise any CSS that goes with it.

::: info Further Reading on SmashingMag:

- [**Challenging CSS Best Practices**](/smashingmagazine.com/challenging-css-best-practices-atomic-approach.md)

```component VPCard
{
  "title": "53 s You Couldn’t Live Without",
  "desc": "CSS is important. And it is being used more and more often. Cascading Style Sheets offer many advantages you don't have in table-layouts - and first of all a strict separation between layout, or design of the page, and the information, presented on the page. Thus the design of pages can be easily changed, just replacing a css-file with another one. Isn't it great? Well, actualy, it is...",
  "link": "/smashingmagazine.com/53-css-techniques-you-couldnt-live-without.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "The Road To Reusable HTML Components",
  "desc": "In a previous post, Niels Matthijs sampled a couple of common content types (such as products, stories and videos) across different websites. In this article, he sticks to four different views of a single content type: the story (or news article).",
  "link": "/smashingmagazine.com/road-reusable-html-components.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Semantic CSS With Intelligent Selectors",
  "desc": "In this article, we will explore an alternative approach to styling Web documents. With the use of “intelligent” selectors, we’ll cover how to query the extant, functional nature of semantic HTML in such a way as to reward well-formed markup. If you code it right, you’ll get the design you were hoping for. Heydon Pickering hopes that employing some of these ideas will make your workflow simpler and more transferable between projects.",
  "link": "/smashingmagazine.com/semantic-css-with-intelligent-selectors.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

In this way, we haven’t really separated the two, have we? We have to make our changes in two places.

---

## Exploring Approaches

Over the course of my career, I’ve had the pleasure and privilege to work on hundreds of different websites and Web applications. For the vast majority of these projects, I was the sole developer building out the HTML and CSS. I developed a way of coding websites that worked well for me.

Most recently, I spent two years at Yahoo working on Mail, Messenger, Calendar and other projects. Working on a much larger project with a much larger team was a great experience. A small team of prototypers worked with a larger team of designers to build out all of the HTML and CSS for multiple teams of engineers.

It was the largest-scale project I had worked on in many aspects:

- Yahoo’s user base is massive. Mail alone has about 300 million users.
- Hundreds of people spread across multiple teams were working with the HTML and CSS.
- We were developing a system of components to work across multiple projects.

It was during my time at Yahoo that I began to really examine how I and the team at Yahoo build websites. What pain points did we keep running into, and how could we avoid them?

I looked to see what everyone else was doing. I looked at Nicole Sullivan’s [Object-Oriented CSS (<VPIcon icon="iconfont icon-github"/>`stubbornella/oocss`)](https://github.com/stubbornella/oocss/wiki "Object Oriented CSS"), Jina Bolton’s presentation on “[<VPIcon icon="fa-brands fa-vimeo"/>CSS Workflow](https://vimeo.com/15982903)” and Natalie Downe’s “[<VPIcon icon="fa-brands fa-slideshare"/>Practical, Maintainable CSS](https://slideshare.net/nataliedowne/practical-maintainable-css),” to name just a few.

I ended up writing my thoughts as a long-form style guide named “[<VPIcon icon="fas fa-globe"/>Scalable and Modular Architecture for CSS](https://smacss.com/).” That sounds wordy, so you can just call it SMACSS (pronounced “smacks”) for short. It’s a guide that continues to evolve as I refine and expand on ways to approach CSS development.

As a result of this exploration, I’ve noticed that designers (including me) traditionally write CSS that is deeply tied to the HTML that it is designed to style. How do we begin to decouple the two for more flexible development with less refactoring?

In other words, how do we avoid throwing `!important` at everything or falling into selector hell?

---

## Reusing Styles

In the old days, we wrapped `font` tags and applied `background` attributes to every HTML element that needed styling. This was, of course, very impractical, and thus CSS was born. CSS enabled us to reuse styles from one part of the page on another.

For example, a navigation menu has a list of items that all look the same. Repeating inline styles on each item wouldn’t be practical. As a result, we begin to see CSS like this:

```css
#nav {
  margin: 0;
  padding: 0;
  list-style: none;
}

#nav li {
  float: left;
}

#nav li a {
  display: block;
  padding: 5px 10px;
  background-color: blue;
}
```

Sure beats adding `float:left` to every list item and `display:block; padding:5px 10px;` to every link. Efficiency, for the win! Just looking at this, you can see the HTML structure that is expected:

```html
<ul id="nav">
  <li><a href="/">Home</a></li>
  <li><a href="/products">Products</a></li>
  <li><a href="/contact">Contact Us</a></li>
</ul>
```

Now, the client comes back and says, “I want a drop-down menu to appear when the user clicks on ‘Products.’ Give them easy access to each of the pages!” As a result, our HTML changes.

```html
<ul id="nav">
  <li><a href="/">Home</a></li>
  <li>
    <a href="/products">Products</a>
    <ul>
      <li><a href="/products/shoes">Shoes</a></li>
      <li><a href="/products/jackets">Jackets</a></li>
    </ul>
  </li>
  <li><a href="/contact">Contact Us</a></li>
</ul>

```

We now have a list item within a list item, and links within it. Our menu has a horizontal navigation when the client wants a vertical list, so we add some rules to style the inner list to match what the client wants.

```css
#nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#nav li li {
  float: none;
}

#nav li li a {
  padding: 2px;
  background-color: red;
}
```

Problem solved! Sort of.

---

## Reducing The Depth Of Applicability

Probably the most common problem with CSS is managing specificity. Multiple CSS rules compete in styling a particular element on the page. With our menu, our initial rules were styling the list items and the links in the navigation and the menu. Not good.

By adding more element selectors, we were able to increase specificity and have our menu styles win out over the navigation styles.

However, this can become a game of cat and mouse as a project increases in complexity. Instead, we should be limiting the impact of CSS. Navigation styles should apply to and affect only the elements that pertain to it, and menu styles should apply to and affect only the elements that pertain to it.

I refer to this impact in SMACSS as the “[<VPIcon icon="fas fa-globe"/>depth of applicability](https://smacss.com/book/applicability).” It’s the depth at which a particular rule set impacts the elements around it. For example, a style like `#nav li a`, when given an HTML structure that includes our menus, has a depth of 5: from the `ul` to the `li` to the `ul` to the `li` to the `a`.

The deeper the level of applicability, the more impact the styles can have on the HTML and the more tightly coupled the HTML is to the CSS.

The goal of more manageable CSS — especially in larger projects — is to limit the depth of applicability. In other words, write CSS to affect only the elements that we want them to affect.

### Child Selectors

One tool for limiting the scope of CSS is the child selector (`>`). If you no longer have to worry about Internet Explorer 6 (and, thankfully, many of us don’t), then the child selector should be a regular part of your CSS diet.

Child selectors limit the scope of selectors. Going back to our navigation example, we can use the child selector to limit the scope of the navigation so that it does not affect the menu.

```css
#nav {
  margin: 0;
  padding: 0;
  list-style: none;
}

#nav > li {
  float: left;
}

#nav > li > a {
  display: block;
  padding: 5px 10px;
  background-color: blue;
}
```

For the menu, let’s add a class name to it. This will make it more descriptive and provide a base for the rest of our styles.

```css
.menu {
   margin: 0;
   padding: 0;
   list-style: none
}

.menu > li > a { 2px;
   background-color: red;
}
```

What we’ve done is limited the scope of our CSS and isolated two visual patterns into separate blocks of CSS: one for our navigation list and one for our menu list. We’ve taken a small step towards modularizing our code and a step towards decoupling the HTML from the CSS.

---

## Classifying Code

Limiting the depth of applicability helps to minimize the impact that a style might have on a set of elements much deeper in the HTML. However, the other problem is that as soon as we use an element selector in our CSS, we are depending on that HTML structure never to change. In the case of our navigation and menu, it’s always a list with a bunch of list items, with a link inside each of those. There’s no flexibility to these modules.

Let’s look at an example of something else we see in many designs: a box with a heading and a block of content after it.

```html
<div class="box">
  <h2>Sites I Like</h2>
  <ul>
    <li><a href="https://smashingmagazine.com/">Smashing Magazine</a></li>
    <li><a href="https://smacss.com/">SMACSS</a></li>
  </ul>
</div>
```

Let’s give it some styles.

```css
.box {
  border: 1px solid #333;
}

.box h2 {
  margin: 0;
  padding: 5px 10px;
  border-bottom: 1px solid #333;
  background-color: #ccc;
}

.box ul {
  margin: 10px;
}
```

The client comes back and says, “That box is great, but can you add another one with a little blurb about the website?”

```html
<div class="box">
  <h2>About the Site</h2>
  <p>This is my blog where I talk about only the bestest things in the whole wide world.</p>
</div>
```

In the previous example, a margin was given to the list to make it line up with the heading above it. With the new code example, we need to give it similar styling.

```css
.box ul, .box p {
  margin: 10px;
}
```

That’ll do, assuming that the content never changes. However, the point of this exercise is to recognize that websites can and do change. Therefore, we have to be proactive and recognize that there are alternative elements we might want to use.

For greater flexibility, let’s use classes to define the different parts of this module:

```css
.box .hd { }  /* this is our box heading */
.box .bd { }  /* this is our box body */
```

When applied to the HTML, it looks like this:

```html
<div class="box">
  <h2 class="hd">About the Site</h2>
  <p class="bd">This is my blog where I talk about only the bestest things in the whole wide world.</p>
</div>
```

### Clarifying Intent

Different elements on the page could have a heading and a body. They’re “protected” in that they’re a child selector of `box`. But this isn’t always as evident when we’re looking at the HTML. We should clarify that these particular `hd` and `bd` classes are for the `box` module.

```css
.box .box-hd {}
.box .box-bd {}
```

With this improved naming convention, we don’t need to combine the selectors anymore in an attempt to namespace our CSS. Our final CSS looks like this:

```css
.box {
  border: 1px solid #333;
}

.box-hd {
  margin: 0;
  padding: 5px 10px;
  border-bottom: 1px solid #333;
  background-color: #ccc;
}

.box-bd {
  margin: 10px;
}
```

The bonus of this is that each of these rules affects only a single element: the element that the class is applied to. Our CSS is easier to read and easier to debug, and it’s clear what belongs to what and what it does.

---

## It’s All Coming Undone

We’ve just seen two ways to decouple HTML from CSS:

1. Using child selectors,
2. Using class selectors.

In addition, we’ve seen how naming conventions allow for clearer, faster, simpler and more understandable code.

These are just a couple of the concepts that I cover in “[<VPIcon icon="fas fa-globe"/>Scalable and Modular Architecture for CSS](https://smacss.com/book/),” and I invite you to read more.

::: note Postscript

In addition to the resources linked to above, you may wish to look into BEM, an alternative approach to and framework for building maintainable CSS. Mark Otto has also been documenting the development of Twitter Bootstrap, including the recent article ~~“[<VPIcon icon="fas fa-globe"/>Stop the Cascade](https://markdotto.com/2012/03/02/stop-the-cascade/),”~~ which similarly discusses the need to limit the scope of styles.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Decoupling HTML From CSS",
  "desc": "For years, the Web standards community has talked about the separation of concerns. Separate your CSS from your JavaScript from your HTML. We all do that, right? CSS goes into its own file; JavaScript goes in another; HTML is left by itself, nice and clean.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/decoupling-html-from-css.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
