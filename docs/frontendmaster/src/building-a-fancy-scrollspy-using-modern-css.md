---
lang: en-US
title: "Build a Scrollspy with Modern CSS: No JavaScript Needed"
description: "Article(s) > Build a Scrollspy with Modern CSS: No JavaScript Needed"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build a Scrollspy with Modern CSS: No JavaScript Needed"
    - property: og:description
      content: "Build a Scrollspy with Modern CSS: No JavaScript Needed"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-fancy-scrollspy-using-modern-css.html
prev: /programming/css/articles/README.md
date: 2026-10-14
isOriginal: false
author:
  - name: Mojtaba Seyedi
    url: https://blog.master.dev/author/mojtabaseyedi/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11384
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
  name="Build a Scrollspy with Modern CSS: No JavaScript Needed"
  desc="Explore how to create a scrollspy effect using only CSS, enhancing navigation without JavaScript. Make user interfaces more dynamic!"
  url="https://blog.master.dev/building-a-fancy-scrollspy-using-modern-css/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11384"/>

CSS has evolved a lot in the past few years, letting us build better user interfaces without relying on JavaScript. If you are anything like me, you may have felt a little overwhelmed at some point by all the new features and capabilities that the CSS Working Group and browser vendors keep adding to our toolbox.

I find the best way to keep up is to build small things with these features. This time, I came across a CSS property and a few pseudo-classes that let us build a scrollspy without a single line of JavaScript.

---

## What is Scrollspy?

It’s much easier to show than tell, so here’s what scrollspy looks like:

<VidStack src="https://blog.master.dev/wp-content/uploads/2026/10/bootstrap-scrollspy.mp4" />

The idea is simple. As you scroll through a page, the navigation highlights the corresponding link to show which section you’re currently viewing.

You see this pattern in tables of contents, documentation sites, and sometimes in larger page navigation. Bootstrap made it popular enough that “scrollspy” has become the common name for it, and other UI libraries have their own versions too.

Under the hood, these implementations need some JavaScript to figure out which section is currently visible. For example, they may use [<VPIcon icon="fa-brands fa-firefox"/>`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to watch the sections and then activate the corresponding navigation item.

That is the part we’re going to get rid of using a few relatively new CSS features.

Below is the final demo: a table of contents with a fancy scrollspy.

<CodePen
  user="anon"
  slug-hash="vExZqjo"
  title="CSS-Only Scrollspy"
  :default-tab="['css','result']"
  :theme="dark"/>

So, without any further ado, let’s get into it.

---

## Building a Basic Scrollspy

Here’s the markup for a typical table of contents (TOC). It’s also the only markup we’ll need for the rest of the article.

```xml
<ol>
  <li><a href="#edge">Where the edge begins</a></li>
  <li><a href="#stars">The stars that wander</a></li>
  <li><a href="#gas">A sea of cold gas</a></li>
  <li><a href="#gravity">Gravity has no border</a></li>
  <li><a href="#bigger">The universe gets bigger</a></li>
</ol>

<article>
  <h2 id="edge">Where the edge begins</h2>
  <p></p>
  <p></p>
  <h2 id="stars">The stars that wander</h2>
  <p></p>
  <p></p>
</article>
```

Thanks to anchor links, this is already functional. Each link takes readers straight to the section it points to.

What’s missing is a way for CSS to know a link relates to its section, so it can react as the reader scrolls. Luckily, that’s what the new `scroll-target-group` property gives us.

### `scroll-target-group`

The `scroll-target-group` property is part of the [<VPIcon icon="iconfont icon-w3c"/>CSS Overflow Module Level 5](https://drafts.csswg.org/css-overflow-5/#scroll-target-group), the same specification that gave us the [**CSS carousel features**](/blog.master.dev/how-to-add-and-remove-items-from-a-native-css-carousel-with-css.md) like `::scroll-marker` and `::scroll-button()`. In a carousel, the browser can generate a set of navigation dots for you and knows which slide is active. `scroll-target-group` takes that same idea and applies it to navigation that you write, like a TOC.

Setting `scroll-target-group: auto` on an element turns it into a scroll marker group. The links inside it that **point to fragment identifiers (the anchor links)** become scroll markers, and the browser can associate each of those links with its target on the page.

More importantly for us, the browser now knows which marker corresponds to the section currently in view, and that’s what allows us to “spy” on the scroll.

Note that this property can go on any ancestor of the links, not just their direct parent. As a rule of thumb, put it on the nearest element that wraps every link belonging to the same group. Here that would be the `<ol>`, though the `<aside>` wrapping it works just as well.

```css
.toc {
  scroll-target-group: auto;
}
```

::: note

Don’t confuse `scroll-target-group` with `scroll-marker-group`. The latter creates `::scroll-marker` pseudo-elements for you and provides default tablist-like keyboard behavior. With `scroll-target-group`, you provide the links yourself and CSS uses those existing links as the markers.

:::

### `:target-current`

Now that the browser knows about our scroll markers, we need a way to style the one that corresponds to the section we’re currently looking at.

That’s what `:target-current` is for.

```css
.toc a:target-current {
  color: var(--color-accent);
}
```

The specification defines `:target-current` as the state for the active scroll marker. As the current scroll position changes, the active marker changes too.

So, instead of listening for scroll events and figuring out which section is visible, we can simply style the state that the browser gives us.

With our markup and this little bit of CSS, we already have a basic scroll-aware table of contents.

In the following demo, as a section enters the viewport, its corresponding link in the TOC matches `:target-current` and picks up the new color.

<CodePen
  user="anon"
  slug-hash="wBJeLNo"
  title="CSS-Only Scrollspy — Step 1"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s the core of the scrollspy mechanism. Now we can make it a little more interesting.

### `:target-before` and `:target-after`

It turns out that `:target-current` isn’t the only state we get. There are also `:target-before` and `:target-after`.

As the names suggest, the scroll markers before the current one match `:target-before`, while scroll markers after it match `:target-after`. That gives us three useful states.

To improve our demo, let’s add a little marker before each link using the `::before` pseudo-element.

```css
.toc a {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.toc a::before {
  content: " ";
  display: block;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: var(--color-accent);
}
```

We can leave the current marker unchanged while making the ones ahead smaller and more muted. To make the current marker stand out, we can also give it a subtle glow:

```css
.toc a:target-before::before {}

.toc a:target-current::before {
  box-shadow: 0 0 20px var(--color-accent);
}

.toc a:target-after::before {
  background-color: var(--color-border);
  transform: scale(0.6);
}
```

<CodePen
  user="anon"
  slug-hash="MYpoNwX"
  title="CSS-Only Scrollspy — Step 2"
  :default-tab="['css','result']"
  :theme="dark"/>

As you can see, we don’t have to keep track of which section we’re in or add classes as the user scrolls. We just describe what each state should look like.

---

## Enhancing the Scrollspy Effect

The circles look nice on their own, but I wanted to connect them with a line that moves along with the current section as you scroll.

For that line to actually work well in a real project, it needs to handle a few things:

- It should be one continuous line, not separate segments stitched together, so it doesn’t visibly break apart when the current item changes.
- It shouldn’t care how many items are in the TOC. Adding a sixth or a tenth link shouldn’t mean writing more CSS.
- It should move smoothly between any two sections, whether you’re going to the next item or jumping straight from the first section to the last.
- It shouldn’t assume that every item has the same height. Link text can wrap, so some entries in a real table of contents will naturally take up more space than others.

The answer to all of this is anchor positioning.

[Anchor positioning](https://css-tricks.com/css-anchor-positioning-guide/) lets you position an element relative to another element on the page, called the anchor, without knowing where that anchor is going to be. (Yes, the anchor can even be in a different DOM subtree.)

Regarding the line, instead of calculating where it needs to end, you can tell the browser where it should end and let it work out the rest.

Picture the line sitting next to the TOC, pinned to the top of the list:

```css
.toc ol {
  position: relative;
}

.toc ol::before {
  content: " ";
  width: var(--toc-line-width);
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
}
```

The bottom edge needs to move and land on the currently active item. In other words, you need to pin the bottom end of the line to the link that matches the `:target-current` selector.

In the anchor positioning world, first you need to turn the current link into an anchor:

```css
.toc a:target-current {
  anchor-name: --current-marker;
}
```

Whichever link is currently active now becomes `--current-marker`.

Then you can reference that anchor using the `position-anchor` property:

```css
.toc ol::before {
  position-anchor: --current-marker;
  bottom: anchor(center);
}
```

The `position-anchor` property tells the line which anchor to use, while `bottom: anchor(center)` places the bottom edge of the line at the vertical center of that anchor, wherever it happens to be.

You could write a shorter version too:

```css
.toc ol::before {
  bottom: anchor(--current-marker center);
}
```

That’s pretty much it.

And because the bottom position changes when `--current-marker` moves to another link, we can transition it and get one continuous movement, even when jumping from the first section straight to the last.

To keep the code snippets minimal, I left out some of the supporting styles from the examples above, including transitions, `z-index`, and the properties that handle gaps and sizing. They’re all included in [the final demo (<VPIcon icon="fa-brands fa-codepen"/>`seyedi`)](https://codepen.io/seyedi/pen/vExZqjo).

The demo also includes one extra detail not shown in the snippet above: a muted track behind the active line, so you can see where the line is going. It’s just another pseudo-element (`ol::after`) positioned with fixed values, so it doesn’t need an anchor.

::: note

There’s a small trade-off worth knowing about. We’re transitioning `bottom`, which is a layout property. That means the browser has to recalculate layout as the animation runs instead of handing the animation over to the compositor like it can with properties such as `transform` or `opacity`.

:::

---

## Progressive Enhancement

One important caveat before you use this approach in a real project.

The scroll marker features used here currently have limited browser support. They’re supported in Chromium-based browsers, but Firefox and Safari don’t support them yet.

The nice thing is that the underlying HTML is still just a normal list of links pointing to sections. Browsers that don’t understand the new CSS still have perfectly usable navigation.

---

## Final Words

For me, that’s what makes this kind of CSS feature particularly interesting. We’re not replacing a perfectly good navigation system with something that only works in one browser. We’re taking a normal piece of HTML and adding a richer interaction when the browser supports it.

CSS is getting more capable at describing relationships like this. Instead of writing JavaScript to observe the page, calculate a position, and then update the UI, sometimes we can describe the relationship we want and let the browser handle the state.

That’s a pretty nice direction for CSS.

```component VPCard
{
  "title": "Browser Support Tests in JavaScript for Modern Web Features",
  "desc": "Sometimes it's good to know when a browser feature is supported or not so you can do something. Perhaps load a polyfill or just choose a slightly different approach. This post looks at newish features in browsers and shows the test.",
  "link": "/blog.master.dev/browser-support-tests-in-javascript-for-modern-web-features.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Firefox Goes CSS Modules",
  "desc": "Firefox 147 just came out, and the flagship developer feature is clearly anchor positioning support, bringing that ”to the baseline” as we're supposed to say these days. That rules, but I'm also very hyped about CSS module scripts. Remember, they are a way of importing a stylesheet in JavaScript, that is, the only decent way…",
  "link": "/blog.master.dev/firefox-goes-css-modules.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Delayed-Then-Instant Tooltips with HTML & CSS Alone",
  "desc": "We don't NEED JavaScript to adjust tooltip timing displays. Super modern CSS and HTML has this covered simply, and we can do fully successful fallbacks.",
  "link": "/blog.master.dev/delayed-then-instant-tooltips-with-html-css-alone.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a Scrollspy with Modern CSS: No JavaScript Needed",
  "desc": "Explore how to create a scrollspy effect using only CSS, enhancing navigation without JavaScript. Make user interfaces more dynamic!",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/building-a-fancy-scrollspy-using-modern-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
