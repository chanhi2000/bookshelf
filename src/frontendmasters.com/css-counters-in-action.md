---
lang: en-US
title: "CSS Counters in Action"
description: "Article(s) > CSS Counters in Action"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Counters in Action"
    - property: og:description
      content: "CSS Counters in Action"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-counters-in-action.html
prev: /programming/css/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7347
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

```component VPCard
{
  "title": "React > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CSS Counters in Action"
  desc="CSS has counter variables (based on matching selectors) that you can output as formatted content or use in calculations. "
  url="https://frontendmasters.com/blog/css-counters-in-action/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7347"/>

A classic `for` loop:

```js
for (int i = 0; i < 10; i++) {
}
```

For most of us, some variation of this code is one of the first things we learned when we were first starting out. For me it was C++, but just about any language has some version of it—even CSS. Yes, CSS has counter variables!

---

## The Basics

CSS Counters are driven by four properties: 

1. `counter-reset`
2. `counter-set`
3. `counter-increment`
4. `counter()`

Let’s say we wanted a React component that renders a few lines of text, where the number of lines is received as a prop. But we also want to display line numbers next to each line, *and* we want to use CSS to do so. That last assumption might seem silly, but bear with me; we’ll look at a real-world use case at the end.

Here’s the component

```ts
const NumberedSection: FC<{ count: number }> = ({ count }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, idx) => (
        <span key={idx}>This is line</span>
      ))}
    </div>
  );
};
```

We’ll use a CSS counter called `count-val` to manage our line numbers. In CSS, we can reset our counter for each and every `counter-container` `<div>`.

```css
.counter-container {
  counter-reset: count-val;
}
```

And then for each line inside that container, we can increment our counter, and render the current number in a pseudo-element.

```css
.counter-container span::before {
  counter-increment: count-val;
  content: counter(count-val);
  margin-right: 5px;
  font-family: monospace;
}
```

If we render two of these components like this:

```tsx
<NumberedSection count={3} />
<hr />
<NumberedSection count={4} />
```

It will display numbered lines just like we want:

![CSS Counters working](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img1.png?resize=284%2C478&ssl=1)

If you wanted to increment by some other value than 1, you can specify whatever `counter-increment` you want:

```css
counter-increment: count-val 2;
```

And if you wanted to just *set* a counter to a specific value, the `counter-set` property is for you. There’s a few other options that are of course discussed on [<VPIcon icon="fa-brands fa-firefox" />MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_counter_styles/Using_CSS_counters).

I know this seems silly, and I know this would have been *simpler* to do in JavaScript. The counter variable is already *right there*.

---

## A Better Use Case

Let’s get *slightly* more realistic. What if you have various headings on your page, representing section titles. And, as you might have guessed, you want them numbered.

Let’s start by reseting a CSS counter right at the root of our page

```css
body {
  counter-reset: tile-num;
}
```

Then we’ll increment and display that counter for each heading that happens to be on our page. And if we want custom formatting on the line numbers, we can list out strings, and CSS will concatenate them.

```css
h2.title::before {
  counter-increment: tile-num;
  content: counter(tile-num) ": ";
}
```

Now when we have some content:

```html
<h2 className="title">This is a title</h1>
<p>Content content content</p>

<h2 className="title">This is the next title on the page</h1>
<p>Content content content</p>

<h2 className="title">This is a title</h1>
<p>Content content content</p>
```

We’ll get line numbers next to each heading.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img2.png?resize=554%2C400&ssl=1)

---

## One Last Example

Before going, I’d like to share the use case that led me to discover this feature. So far the examples we’ve seen are either contrived, or better served by just using JavaScript. But what if you don’t have control over the markup that’s generated on your page?

I recently moved my blog’s code syntax highlighting from [<VPIcon icon="iconfont icon-prismjs"/>Prism](https://prismjs.com/) to [<VPIcon icon="fas fa-globe"/>Shiki](https://shiki.matsu.io/). Everything went well except for one thing: Shiki does not support line numbers. This created a perfect use case for CSS counters.

I used my Shiki configuration to inject a `data-linenumbers` attribute onto any `pre` tag containing code I wanted numbered, and then I solved this with a little bit of CSS.

```css
pre[data-linenumbers] code {
  counter-reset: step;
}

pre[data-linenumbers] code .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1rem;
  display: inline-block;
  text-align: right;
  color: rgba(115, 138, 148, 0.4);
}
```

Just like that, I had numbered lines

![Code snippet of a JavaScript function named readBooks that processes a variable string to manage pagination and filtering for a list of books.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img3.png?resize=1024%2C346&ssl=1)

---

## Odds & Ends

We’ve covered all you’ll probably ever use of CSS counters, but for completeness let’s look at some tricks it supports.

### Formatting the numbers

It turns out you can customize the display of the number from the CSS counter. The `counter()` function takes an optional second argument, detailed [<VPIcon icon="fa-brands fa-firefox" />here](https://developer.mozilla.org/en-US/docs/Web/CSS/counter#counter-style).

For example, you can display these counter values as uppercase Roman numerals.

```css
counter(tile-num, upper-roman)
```

![A visual representation of numbered lines in a code-like format, displaying CSS counters with line numbers I, II, III, and IV next to text lines.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img4.png?resize=294%2C484&ssl=1)

### Nested Counters

Remember the titles we saw before? What if those containers with the numbered titles could nest within each other.

Take a look at this markup.

```tsx
<div className="nested">
  <h1 className="title">This is a title</h1>
  <p>Content content content</p>
  <h2 className="title">This is the next title</h2>
  <section>
    Content content content
    <div className="nested">
      <h3 className="title">Nested title</h3>
      <p>Content content content</p>
      <h3 className="title">Nested title</h3>
      <section>
        Content content content
        <div className="nested">
          <h4 className="title">Nested 2nd title</h4>
        </div>
      </section>
    </div>
  </section>
  <h2 className="title">Last title</h1>
  <p>Content content content</p>
</div>
```

Do you see how those `nested` containers can … *nest* within each other? Each new nested container resets its counter. But wouldn’t it be neat if css could take all values from the current elements’ ancestors, and connect them? Like a nested table of contents?

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img5.png?resize=444%2C566&ssl=1)

Well it can! Let’s take a look at the css that produced the above.

```css
.nested {
  counter-reset: nested-num;
}
.nested p {
  margin-left: 10px;
}

.nested .title::before {
  counter-increment: nested-num;
  content: counters(nested-num, ".");
  margin-right: 5px;
}
```

To achieve this we just use the `counters` function, rather than `counter`. It takes a second argument that tells CSS how to join the numeric values for all counter instances on the current element. It also supports a *third* argument (not shown) to allow you to alter the display of these numbers, like we did before with roman numerals.

---

## Concluding Thoughts

CSS counters are a fun feature that can occasionally come in handy. They’re a useful feature to keep in the back of your mind: they might help you out one day.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Counters in Action",
  "desc": "CSS has counter variables (based on matching selectors) that you can output as formatted content or use in calculations. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-counters-in-action.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
