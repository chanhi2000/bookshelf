---
lang: en-US
title: "Gap Decorations Are Now Available, Here’s What’s New"
description: "Article(s) > Gap Decorations Are Now Available, Here’s What’s New"
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
      content: "Article(s) > Gap Decorations Are Now Available, Here’s What’s New"
    - property: og:description
      content: "Gap Decorations Are Now Available, Here’s What’s New"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-gap-decorations-now-available.html
prev: /programming/css/articles/README.md
date: 2026-08-03
isOriginal: false
author:
  - name: Sam Davis Omekarajr
    url: https://css-tricks.com/author/samomekarajr/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/gap-decorations-thumb.jpg
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
  name="Gap Decorations Are Now Available, Here’s What’s New"
  desc="Today, with CSS gap decorations fully supported in Chrome and Edge, starting with version 149, you can now very easily style gaps, and with a lot of control."
  url="https://css-tricks.com/css-gap-decorations-now-available"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/gap-decorations-thumb.jpg"/>

For a long time now, web developers have had to use border and pseudo-element hacks to style the gaps between the items of layouts like grid and flexbox. Today, with CSS gap decorations fully supported in Chrome and Edge, starting with version 149, you can now very easily style gaps, and with a lot of control.

Our Edge web platform team at Microsoft led both the design and standardization of the feature, and the implementation is rolling out across all Chromium-based browsers. For background, check out an [**early preview of gap decorations**](/css-tricks.com/the-gap-strikes-back-now-stylable.md) by my colleague [<VPIcon icon="fas fa-globe"/>Patrick](https://patrickbrosset.com/), and a full [<VPIcon icon="fa-brands fa-chrome"/>deep dive](https://developer.chrome.com/blog/gap-decorations-stable) about the stable release by my colleague [Javier (<VPIcon icon="fa-brands fa-linkedin"/>`javier-contreras-t`)](https://linkedin.com/in/javier-contreras-t).

In this article, I want to share what has changed in the feature since then.

---

## Catching up on gap decorations

Gap decorations extend the familiar `column-rule` CSS property, which already works in [<VPIcon icon="fa-brands fa-firefox"/>multi-column layout](https://developer.mozilla.org/docs/Web/CSS/Guides/Multicol_layout), and makes it work in grid and flexbox layouts too. In addition, there’s also now support for the row-rule property, so that decorations can be displayed in both axes. And finally, the syntax is extended to provide a lot more control of the decorations.

Patrick already gave a good [**walkthrough**](/css-tricks.com/the-gap-strikes-back-now-stylable.md) of the feature but, since then, a few things have changed such as property renames to make things clearer, and new properties, informed by the feedback we’ve received from web developers during early testing.

Here is a summary of the changes:

| **Old** | **New** | **What this change means** |
| :---: | :---: | :--- |
| `row-rule-outset`<br>`column-rule-outset` | `row-rule-inset`<br>`column-rule-inset` | “Outset” became “inset” and setting these properties now insets the rules inward from the decorations edges. |
| No fine grain control of where `row-rule-inset` and `column-rule-inset` apply | New longhand properties:<br>`row-rule-inset-cap`<br>`row-rule-inset-junction` `row-rule-inset-startrow-rule-inset-end`<br>and<br>`column-rule-inset-cap`<br>`column-rule-inset-junction` `column-rule-inset-startcolumn-rule-inset-end`<br>for fine-grain control. | You can now inset the outer ends (caps) and the intersections (junctions) independently.&nbsp;You can also inset the start and end of decorations independently. |
| `gap-rule-paint-order` | `rule-overlap` | This property was renamed for clarity. It controls how decorations layer where row and column rules cross. |
| N/A | `rule-visibility-items` | This new property controls whether rules show next to empty areas in a container. |

---

## Browser support

Gap decorations are available in Chrome and Edge starting with version 149, and other Chromium-based browsers that match those versions.

Other browser engines have been receptive and engaged in standards venues, so over time, this feature will become interoperable.

If you’d like to use it now, I’d say:

- If you consider these decorations to be a progressive enhancement, then great! Just start using the feature today, and nothing will break on browsers that don’t support it.
- If you absolutely need gap decorations, a [polyfill is in development (<VPIcon icon="iconfont icon-github"/>`microsoft/polyfills`)](https://github.com/microsoft/polyfills/pull/56) for browsers that don’t yet have support.

---

## Using gap decorations

Alright, enough prose, let’s expand on the [<VPIcon icon="fa-brands fa-edge"/>demo](https://microsoftedge.github.io/Demos/css-gap-decorations/personal-site.html) which Patrick used in his article. We’re going to add new sections and use the latest features of gap decorations along the way.

::: tabs

@tab:active Before

![A personal website homepage with a black background and white text showing white rules between blog posts.<br/>([<VPIcon icon="fa-brands fa-edge"/>live](https://microsoftedge.github.io/Demos/css-gap-decorations/personal-site.html), [source (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/Demos`)](https://github.com/MicrosoftEdge/Demos/blob/main/css-gap-decorations/personal-site.html))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/b75093d4-bbbf-4d69-82ed-cf5deadb13dd.png?resize=961%2C1024&ssl=1)

@tab After

![A personal website homepage with a black background and white text showing white rules between blog posts.<br/>([<VPIcon icon="fa-brands fa-edge"/>live](https://microsoftedge.github.io/Demos/css-gap-decorations/personal-site-upgraded.html), [source (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/Demos`)](https://github.com/MicrosoftEdge/Demos/blob/main/css-gap-decorations/personal-site-upgraded.html))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/b84b0a8f-ec01-4858-9dfc-5ff99349fbe5.png?resize=847%2C2048&ssl=1)

:::

Let’s start with some minimal HTML markup:

```html :collapsed-lines
<body>
  <header>
    <h1>My personal site</h1>
    <p class="tagline">...</p>
  </header>

  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <!-- etc. -->
    </ul>
  </nav>

  <section id="home" class="home">
    <div class="greeting">
      <p class="lead">...</p>
    </div>
    <div class="photo">
      <img src="cat.jpg" alt="A sleeping cat.">
    </div>
    <aside class="now">
      <h3>Currently</h3>
      <ul>
        <li>Lorem <span>— ipsum dolor sit amet</span></li>
        <!-- etc. -->
      </ul>
    </aside>
    <div class="note">
      <p>...</p>
    </div>
    <div class="photo">
      <img src="tree.jpg" alt="An old olive tree trunk.">
    </div>
  </section>

  <section id="blog" class="blog">
    <h2>Blog</h2>
    <div class="posts">
      <article class="post">
        <span class="date">June 2025</span>
        <h3>Lorem ipsum dolor</h3>
        <p>...</p>
      </article>
      <!-- rest of articles -->
    </div>
  </section>

  <section id="about" class="about">
    <h2>About</h2>
    <div class="bio">
      <img class="avatar" src="bike.jpg" alt="A bicycle leaning against a post.">
      <div class="text">
        <p>...</p>
        <!-- etc. -->
      </div>
    </div>
  </section>

  <section id="links" class="links">
    <h2>Elsewhere</h2>
    <ul>
      <li><a href="#">GitHub</a></li>
      <!-- etc. -->
    </ul>
  </section>

  <footer>
    <p>© 2025 My personal site.</p>
  </footer>
</body>
```

And here’s the CSS code we’ll start with. The page is one big grid, with row rules acting as section dividers. The navigation area is a flexbox layout, with dashed column rules.

```css
body {
  display: grid;
  gap: 4rem;
  margin: 2rem;
  row-rule:
    1rem solid #efefef,
    repeat(2, 2px solid #efefef);
}


nav ul {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  column-rule: 2px dashed #666;
}
```

We’ll build on this.

### Step 1: Support any number of sections with `repeat(auto)`

In our initial CSS, the body element uses `repeat(2, 2px solid #efefef)` because the site we started from had three static sections. We’re adding new sections and we want the site to automatically adapt if we keep adding sections in the future as well.

Let’s swap the hard-coded number of repeats with an `auto` repeater. This way the page can grow and the section divider rules just keep up:

```css
body {
  /* ... */
  row-rule:
    1rem solid #efefef,
    repeat(auto, 2px solid #efefef);
}
```

![A simple layout of four sections that are full-width and stacked vertically.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-1024x669-1.png?resize=1024%2C669&ssl=1)

### Step 2: Decorate flexbox gaps in the home section

For the home section, we’ll have a wrapping flexbox container with text and images. Our .home class element defines the flexbox layout, and the various elements in it use different [**`flex-basis`**](/css-tricks.com/almanac-properties/flex-basis.md):

```css
.home {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}

.home > * {
  flex: 1 1 12.5rem;
}

.home .greeting {
  flex-basis: 26.25rem;
}

.home .note {
  flex-basis: 22.5rem;
}
```

Here is the home section, without decorations:

![Two post cards with text on the right and image on the left stacked vertically where the bottom post is wider than the top post.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-8-1024x501-1.png?resize=1024%2C501&ssl=1)

And now, to add some gap decorations magic, let’s use the `row-rule` and [**`column-rule`**](/css-tricks.com/almanac-properties/column-rule.md) properties:

```css
.home {
  /* ... */
  row-rule: 2px solid #999;
  column-rule: 2px solid #999;
}
```

By the way, since our horizontal and vertical rules use the same value, we could collapse them into the new `rule` shorthand and write a single line of code:

```css
.home {
  /* ... */
  rule: 2px solid #999;
}
```

We get this:

![Two post cards with text on the right and image on the left stacked vertically where the bottom post is wider than the top post. White rules separate the columns and rows.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-9-1024x501-1.png?resize=1024%2C501&ssl=1)

By default, the column rules run the full height of each flex line. Because we have a `3rem` gap, our two flex lines are separated. I want the column rules to meet the row rule. Let’s use the `column-rule-inset` property and its `overlap-join` value. This value joins adjacent rules at the junctions, while keeping the outer ends (the caps) flush at `0`.

```css
.home {
  /* ... */
  column-rule-inset: overlap-join;
}
```

![Two post cards with text on the right and image on the left stacked vertically where the bottom post is wider than the top post. White rules separate the columns and rows and join seamlessly.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-6-1024x501-1.png?resize=1024%2C501&ssl=1)

### Step 3: Decorate spanning grid items in the blog section

For the Blog section, we’ll be using a grid so we can make specific posts span multiple columns or rows for emphasis.

```css
.posts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.post.feature { grid-column: span 2; }


.post.tall { grid-row: span 2; }
```

Here’s what the section looks like without decorations:

![A blog grid with a top row of three articles containing a heading and excerpt. The second row shows two posts with image on top, heading, then excerpt.The post on the right spans to the n ext row, which has two additional posts with just a heading and excerpt. The final row has a single post with a heading and excerpt.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-11-972x1024-1.png?resize=972%2C1024&ssl=1)

Just like we did in the home section, let’s add gap decorations magic:

```css
.posts {
  /* ... */
  rule: 2px solid #999;
}
```

Which gets us this:

![A blog grid with a series of eight posts spanning different columns and rows, where white rules connected the columns and rows.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-13-972x1024-1-1.png?resize=972%2C1024&ssl=1)

Since I don’t quite like the lines that appear next to empty grid cells, let’s get rid of them by using the new `rule-visibility-items` property:

```css
.posts {
  /* ... */
  rule-visibility-items: around;
}
```

With this value, gap decorations will only be painted when at least one side of the gap has content so the gap between two empty cells in the last row stays clean instead of a line dangling into empty space:

![A blog grid with a series of eight posts spanning different columns and rows, where white rules connected the columns and rows.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-12-972x1024-1.png?resize=972%2C1024&ssl=1)

Similar to the previous step, I’d like neat joins across the decorations in this grid, so I’ll reach for the `overlap-join` value of the `rule-inset` property again:  

```css
.posts {
  /* ... */
  rule-inset: overlap-join;
}
```

And here is the result:

![A blog grid with a series of eight posts spanning different columns and rows, where white rules connected the columns and rows.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-14-972x1024-1.png?resize=972%2C1024&ssl=1)

### Step 4: Inset decorations in the About section

For the About section, we want a circular photo side by side with the text, separated with a line. But we’ll play with the new ability to shrink the size of gap decorations too.

First, let’s use a flexbox container to get our photo bio text side by side:

```css
.bio {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}
```

This gives us the following result, a sort of media card that’s commonly found on websites:

![A card component with a black background and white text. A circular image is on the left and a block of text is on the right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-7-1024x306-1.png?resize=1024%2C306&ssl=1)

And now we apply our gap decoration:

```css
.bio {
  /* ... */
  column-rule: 2px solid #999;
 }
```

Which results in:

![A card component with a black background and white text. A circular image is on the left and a block of text is on the right. A vertical white rule separates the two sides.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-4-1024x306-1.png?resize=1024%2C306&ssl=1)

However, this time, I’d like to have a bit more breathing room, so we’ll use the `column-rule-inset` property to reduce the size of the separator line:

```css
.bio {
  /* ... */
  column-rule-inset: 2.5rem;
}
```

And here’s the result:

![A card component with a black background and white text. A circular image is on the left and a block of text is on the right. A vertical white rule separates the two sides and is shorter than the card's full height.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-5-1024x306-1.png?resize=1024%2C306&ssl=1)

### Step 5: Separate links

For the Links section, since I have quite a few of those, I’ll organize them in a grid.

```css
.links ul {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem 2.5rem;
}
```

Like this:

![A four-by-three grid of links.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-1-1024x286-1.png?resize=1024%2C286&ssl=1)

Let’s add some gap decorations, this time making the row and column rules look different:

```css
.links ul {
  /* ... */
  row-rule: 1px solid #c9a96a;
  column-rule: 3px solid #6a707a;
}
```

![A four-by-three grid of links with white rules separating the columns and rows.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-2-1024x286-1.png?resize=1024%2C286&ssl=1)

If you look closely, the thicker column rules appear behind the thinner row rules. I want to control this and have the column rules appear in front instead. For this let’s use the new `rule-overlap` property:

```css
.links ul {
  /* ... */
  rule-overlap: column-over-row;
}
```

This property does exactly what it says: it lets you choose if you want columns to be painted over rows, or rows over columns.

And we get this:

![A four-by-three grid of links with white rules separating the columns and rows, where the vertical rules are shorter than the cells.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/Screenshot-2026-07-27-at-9.16.21-AM.png?resize=2438%2C676&ssl=1)

Finally, I’d like the column rules to be a little shorter than the grid, but I don’t want them to be separated per row. Let’s use the `column-rule-inset-cap` property which controls the edges of gap decorations which aren’t junctions or intersections:

```css
.links ul {
  /* ... */
  column-rule-inset-cap: 1.75rem;
}
```

And here’s the result:

![A four-by-three grid of links with white rules separating the columns and rows, where the vertical rules are shorter than the cells.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-3-1024x286-1.png?resize=1024%2C286&ssl=1)

### Step 6: Putting it all together

And there we have it, our webpage is ready. You can check the [<VPIcon icon="fa-brands fa-edge"/>live example](https://microsoftedge.github.io/Demos/css-gap-decorations/personal-site-upgraded.html) and [source code (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/Demos`)](https://github.com/MicrosoftEdge/Demos/blob/main/css-gap-decorations/personal-site-upgraded.html):

![The full personal website layout.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/image-10.png?resize=847%2C2048&ssl=1)

---

## Learn more

Give gap decorations a try. The fastest way is through the interactive [<VPIcon icon="fa-brands fa-edge"/>playground](https://microsoftedge.github.io/Demos/css-gap-decorations/playground.html), but we have a lot of [other demos (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/Demos`)](https://github.com/MicrosoftEdge/Demos/blob/main/css-gap-decorations/README.md#demos) too. Play with every property and watch the gaps react in real time.

A great way to learn is to visit the [MDN docs (<VPIcon icon="iconfont icon-github"/>`mdn/content`)](https://github.com/mdn/content/issues/44435) (in development at the time of writing) for more reference.

---

## Acknowledgements

CSS Gap decorations exist because of a group of people who deeply care about the web across the Edge and Chrome teams and the CSS Working Group. Special thanks to [Javier Contreras Tenorio (<VPIcon icon="fa-brands fa-linkedin"/>`javier-contreras-t`)](https://linkedin.com/in/javier-contreras-t?utm_source=share_via&utm_content=profile&utm_medium=member_ios), [Kevin Babbitt](https://bsky.app/profile/kevinbcmu.bsky.social), [Alison Maher (<VPIcon icon="fa-brands fa-linkedin"/>`alison-maher-6255b2121`)](https://linkedin.com/in/alison-maher-6255b2121?utm_source=share_via&utm_content=profile&utm_medium=member_ios), [Ian Kilpatrick (<VPIcon icon="fa-brands fa-linkedin"/>`ian-kilpatrick-9b68a373`)](https://linkedin.com/in/ian-kilpatrick-9b68a373?utm_source=share_via&utm_content=profile&utm_medium=member_iOS), and [<VPIcon icon="fas fa-globe"/>Patrick Brosset](https://patrickbrosset.com).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Gap Decorations Are Now Available, Here’s What’s New",
  "desc": "Today, with CSS gap decorations fully supported in Chrome and Edge, starting with version 149, you can now very easily style gaps, and with a lot of control.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-gap-decorations-now-available.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
