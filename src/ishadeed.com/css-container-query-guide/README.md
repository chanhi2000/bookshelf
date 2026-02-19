---
lang: en-US
title: "An Interactive Guide to CSS Container Queries"
description: "Article(s) > An Interactive Guide to CSS Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - ishadeed.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Interactive Guide to CSS Container Queries"
    - property: og:description
      content: "An Interactive Guide to CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/ishadeed.com/css-container-query-guide/
prev: /programming/css/articles/README.md
date: 2024-04-02
isOriginal: false
author:
  - name: Ahmed Shadeed
    url: https://ishadeed.com/about/
cover: https://ishadeed.com/assets/container-query/twitter-card.jpg
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
  name="An Interactive Guide to CSS Container Queries"
  desc="Learn how to use CSS container queries today."
  url="https://ishadeed.com/article/css-container-query-guide/"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/container-query/twitter-card.jpg"/>

## Introduction to container queries

Ah, container queries - a topic I explored [**three years ago**](/ishadeed.com/say-hello-to-css-container-queries.md). It’s truly satisfying to revisit it once more, this time with a deeper and more comprehensive approach.

In this interactive guide to container queries, I will explain the problems they solve, how they work, and how we can use them today in our workflows.

### What is the problem CSS container queries solve?

While building layouts in CSS, we always wanted a way to change a specific UI based on the width of its container, not the viewport. As a result, we tend to use media queries for stuff that is related to the container, not the viewport.

In the following example, we have a page header that contains:

- Order number
- Actions: search and filter

When there is no space, I want to hide the label from the search and filter actions. In media queries, we can do it like so:

```css
@media (min-width: 580px) {
  /* Show the search and filter labels only *
  * if the screen width is 580px or more. */
  .search {
    width: 32px;
    height: 32px;
  }

  .search-label,
  .filter-label {
    display: block;
  }
}
```

Try to resize the browser below and notice how the search and filter label is hidden when the viewport width is less than `580px`.

<!-- TODO: find out about astro-island -->

The downside of using a media query is that the container will get bigger when the sidebar is hidden. In this case, it’s more logical to show the search and filter in their larger size.

See the following, there is enough space, but the search and filter are collapsed due to the use of a media query.

<!-- TODO: find out about astro-island -->

### Using CSS container queries

When using a container query, we can fine-tune such details and give the components the ability to expand based on their container width, not the viewport.

To use container queries, we need to define the container type. The container name is optional.

```css
.main {
  container-name: main;
  container-type: inline-size;
}
```

Once defined, we can use the container query just like a media query. Here, I’m showing the `<span>` only if the width is `370px` or more.

```css
@container main (min-width: 370px) {
  .search-label,
  .filter-label {
    display: block;
  }
}
```

First, we need to define a container in the main section. Second, we can use `@container` with the child elements we need (search and filter actions).

Play with it yourself in the following demo by resizing the browser window.

<!-- TODO: find out about astro-island -->

Interesting, right? Let’s explore another example to make sure the problem container queries solve is clear.

### Building a card component with container queries

#### The problem

We have a list of cards that change based on the viewport width. To make it change based on the viewport size, I used CSS grid `minmax()` function.

```css
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}
```

Play with the demo (resize the browser window).

<!-- TODO: find out about astro-island -->

The first issue I see is that the cards are too big when the viewport size is large. Notice the ratio between the thumbnail and title sizes.

We can fix that by using `auto-fill` in the CSS grid `minmax()` function, but it will leave us with empty columns.

<!-- TODO: find out about astro-island -->

Not the best. Now we have empty columns. What if, we want to change the card layout to horizontal? We can do that.

```css
@media (min-width: 800px) {
  .card {
    display: flex;
    align-items: start;
  }
}
```

Try to change the viewport size. The card will change from a stacked style to a horizontal one.

<!-- TODO: find out about astro-island -->

It works as expected. Now, when the viewport size is above `800px`, the card style will change to horizontal.

But.. there is a problem! What if we added more cards? The horizontal style will look too condensed. This is not good.

<!-- TODO: find out about astro-island -->

Notice that the horizontal style became too condensed, this is because we used a media query. When using a media query, the browser doesn’t care about what will happen to the components if the available space isn’t enough.

#### The solution

CSS container queries allow us to query against the container of an element. In the context of the previous example, we can change the style to horizontal only if the card’s container is large enough.

Here is the card’s markup:

```html
<div class="layout__item">
  <div class="card">
    <div class="card-thumb">
      <img src="thumb.jpg" alt="" />
    </div>
    <div class="card-content">
      <h3>Card title in here</h3>
    </div>
  </div>
</div>
```

In CSS, we need to define the container type. We can also define the name (not mandatory but recommended).

```css
.layout__item {
  container-type: inline-size;
  container-name: card;
}
```

We can use it like this:

```css
@container card (min-width: 180px) {
  .card {
    display: flex;
    gap: 1rem;
    outline: dotted 2px deeppink;
  }
}
```

In the following interactive demo, you can try the following:

- Add more or remove cards.
- Choose between media or container query.
- Resize the browser window.
- See the current CSS that is applied based on the selected query type.

<!-- TODO: find out about astro-island -->

As you’ve seen using a media query to change the card style isn’t logical in this case. The number of cards can increase or decrease and that will affect the card’s content.

CSS container queries will help us to solve that problem by providing us with a way to query against the container.

---

## Container query syntax

### The container type

The default value for `container-type` is `normal`. To use a container query, we need to use `inline-size` as a value.

```css
.main {
  container-type: inline-size;
}
```

We can then query elements that are within the `.main` container, here is an example:

```css
.section {
  @container (min-width: 700px) {
    /* Custom styling */
  }
}
```

::: info

Every container is a style container by default unless we change the container-type to inline-size.

:::

### The container name

What happens if we have more than one container, how do we target them? Well, that’s why we have `container-name`. We can name a container and call it when used.

```css
.main {
  container-type: inline-size;
  container-name: main;
}

.section {
  @container main (min-width: 700px) {
    /* Custom styling */
  }
}
```

### Size container queries shorthand

We can use the shorthand version to add the container name and type. It’s useful if you prefer an easier scanning of the name and type.

```css
.main {
  container: main / inline-size;
}
```

### Style queries syntax

CSS style container queries allow us to query a CSS variable and do custom styling based on that. It’s currently supported in Chrome and Safari Technology Preview only, but it’s worth mentioning and explaining in this guide.

By default, every element is a style query. To use it, we can query a CSS variable on a parent element and write custom CSS that will apply to its child elements.

```css
.article-wrapper {
  --featured: true;
}

.article {
  @container style(--featured: true) {
    /* Custom CSS */
  }
}
```

I will share a few use cases later in the guide.

Now that you know what the problem container queries solve and how the syntax works, let’s move to their common `pitfalls`.

---

## Common pitfalls for container queries

### A container can’t be sized by its contents

The container size should either be explicit or come from a flex or a grid layout. What does that mean? Let me show you an example.

In the following demo, we have a website header with a navigation.

```html
<div class="header">
  <nav class="nav">
    <ul>
      <!-- Navigation items -->
    </ul>
  </nav>
</div>
```

In CSS, I added the following:

```css
.nav {
  container: nav / inline-size;
  display: flex;
  gap: 1rem;
  outline: solid 1px;
}
```

Notice how the outline is collapsed. When using the `inline-size` containment, this will prevent the container from getting size information from its content. As a result, it will collapse to zero.

Try to toggle the “Stretch nav” button to see the fix.

<!-- TODO: find out about astro-island -->

To fix that, we need to force the element to fill the available space in header.

```css
.nav {
  flex: 1;
}
```

### It’s not possible to query a container against itself

Let’s suppose that we have a size container on an element. At some point, we wanted to style the container by querying the container itself.

```css
.main {
  container: main / inline-size;
}

@container main (min-width: 700px) {
  background-color: #fefefe;
}
```

The `background-color` property won’t apply. This is not possible.

### The container should be an additional element

Since we can’t query a container against itself, the container should be in a separate element. In some cases, the additional element is already there.

```html
<div class="o-grid">
  <div class="o-grid__item">
    <article class="c-article">
      <!-- content -->
    </article>
  </div>
</div>
```

```css
.o-grid__item {
  container: card / inline-size;
}

.c-article {
  @container card (min-width: 500px) {
    /* Styling */
  }
}
```

---

## Container query units

We used to use CSS viewport units to have a fluid typography, but the issue is, you guessed it, that it’s limited to the viewport only.

With CSS container queries, we can finally use units that are scoped to the container itself.

In the following example, I used query units to have a dynamic font size.

```css
.author-name {
  font-size: clamp(14px, 10px + 1.33cqw, 20px);
}
```

<!-- TODO: find out about astro-island -->

As you’ve seen, we can use query units for font sizes. However, the use cases aren’t limited to that only. We can use them for spacing (padding or margin) and more.

According to MDN, here are all the query units we can use:

- cqw: 1% of a query container’s width
- cqh: 1% of a query container’s height
- cqi: 1% of a query container’s inline size
- cqb: 1% of a query container’s block size
- cqmin: The smaller value of either cqi or cqb
- cqmax: The larger value of either cqi or cqb

For me, I care about the `cqw` unit. I will use them in the upcoming use-cases section.

---

## Container queries use cases

::: info

Container query demos are supported in all major browsers (Chrome 106+, Safari 16.0+, Firefox 110+).

:::

### News section

One of the most common use cases for container queries is the card component. That can become handy when building featured news sections, for example.

In the following example, we have a news section with two main sections:

- Left section: featured article with three articles underneath
- Right section: three articles without a thumb

![](https://ishadeed.com/_astro/container-query-news-section-1.JC9hPW4f_1VLNPN.png) 

We can use container queries for that:

- Featured article
- Switching from a stacked to a horizontal card and vice versa

With that, we can create a new component that adapts nicely to the changes in its wrapper width.

See the following figure:

![](https://ishadeed.com/_astro/container-query-news-section-1-2.Daiu3FP-_2aOoMB.png)

To make it more clear, I created a simulation for **breakpoints** that you can see in the following interactive demo.

Play with the next and previous buttons, or click on the rectangles and see the explanation.

<!-- TODO: find out about astro-island -->

Here is a video for you that shows the demo above, just in case.

<VidStack src="https://ishadeed.com/assets/container-query/news-section.mp4" />

As you’ve seen, there are seven different breakpoints for this section. If we want to use a media query for this, things can get dirty quickly.

```css :collapsed-liens
@media (min-width: 411px) {
  .card {
    /* Horizontal style */
    flex-direction: row;
    gap: 1rem;
  }
}

@media (min-width: 431px) {
  .card--featured {
    /* Horizontal style */
    flex-direction: row;
    gap: 1rem;
  }

  .card--featured .card-thumb {
    /* Make it larger */
  }
}

@media (min-width: 499px) {
  .card--featured {
    /* Horizontal style */
    flex-direction: row;
    gap: 1rem;
  }

  .cards-list .card {
    /* Stacked style */
  }
}

@media (min-width: 554px) {
  .card--featured .card-thumb {
    /* Make it smaller */
  }

  .cards-list .card {
    /* Horizontal style */
  }
}

@media (min-width: 581px) {
  .card--featured .card-thumb {
    /* Make it larger */
  }
}

@media (min-width: 700px) {
  .cards-list .card {
    /* Stacked style */
  }
}
```

This is complex and I didn’t even write all the CSS, I just added a pseudo-style code. With container queries, this is fairly easy. Let’s see how!

#### The card component

The card component has two states: stacked and horizontal. It will become horizontal if its container is wider by a specific number.

First, the card should be wrapped in a container:

```html
<div class="card-wrapper">
  <div class="card">
    <!-- Card content -->
  </div>
</div>
```

Then, in CSS we write the following.

```css
.card-wrapper {
  container: card / inline-size;
}

.card {
  /* Default styles */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @container card (min-width: 250px) {
    flex-direction: row;

    .card-thumb {
      flex: 0 0 calc(2cqw + 80px);
    }
  }
}
```

As simple as that. We can add a few spices in CSS, too.

For example, I used a **query unit** in the `calc()` function for the card thumbnail. This is equal to “2 container query width”, which is `2%` of the container’s width.

<!-- TODO: find out about astro-island -->

<!-- ![](https://ishadeed.com/assets/target-size/cookies.jpg) -->

### Card title in here

A bit of desc text in here.

![](https://ishadeed.com/assets/target-size/cookies.jpg)

### Card title in here

A bit of desc text in here.

Here is the card component in an isolated demo. Try to resize the handle in between the two variations.

#### The featured card

This is a variation of the card but with a larger thumbnail and font sizes. I added the class `card--featured` to style it.

```html
<div class="card-wrapper">
  <div class="card card--featured">
    <!-- Card content -->
  </div>
</div>
```

In CSS:

```css
.card--featured .card-thumb {
  @container card (min-width: 400px) {
    .cardThumb {
      flex: 0 0 calc(10cqw + 200px);
    }
  }
}
```

It’s worth mentioning that in **style container queries**, we can add a CSS variable instead of a CSS class.

```html
<div class="card-wrapper">
  <div class="card " style="--featured: true;">
    <!-- Card content -->
  </div>
</div>
```

```css
@container card (min-width: 400px) and style(--featured: true) {
  .cardThumb {
    flex: 0 0 calc(10cqw + 200px);
  }
}
```

::: info

At the time of writing this guide, style queries work in Google Chrome, Safari TP, and Safari 18 beta.

:::

Here is the final demo below. You can try the following:

- Try the “Auto resize” button and see the window grow.
- Use the range slider.
- Remove a card and see what happens.

<!-- TODO: find out about astro-island -->

### Steps component

In this example, we have a steps component that needs to look differently based on its container size. If the container is wide, each step will look like an arrow. If not, they will stack on top of each other.

Resize the window below and see how the component changes.

<!-- TODO: find out about astro-island -->

Container queries make that straightforward.

```css
.content {
  container: steps / inline-size;
}

.steps__item {
  @container steps (min-width: 450px) {
    padding: 12px 8px 12px 18px;

    &:before {
      --size: 2rem;
      font-size: 16px;
    }

    &:first-child {
      clip-path: polygon(/* path */);
    }

    /* And so on.. */
  }
}
```

### Social feed

I spotted this pattern on Linkedin. When the viewport size is small, the action buttons label is hidden on smaller sizes. It works but is not ideal.

![](https://ishadeed.com/_astro/container-query-social-feed-1.CxLsKBu8_Z2tvkRT.png) 

With media queries, this can be done but it will still be a hack.

```css
.action-label {
  display: none;
}

@media (min-width: 500px) {
  .action-label {
    display: inline-flex;
  }
}
```

This will work, but the simplest change to the markup or the UI can cause it to fail. The reason is obvious because we’re querying the viewport.

See the following demo:

<!-- TODO: find out about astro-island -->

When the viewport width is less than 630px, the label is hidden.

However, in the following case, the sidebar is hidden and the feed wrapper gets wider, but the label is still hidden.

<!-- TODO: find out about astro-island -->

This is where container queries shine.

```css
.action-label {
  @container content (min-width: 470px) {
    display: block;
  }
}
```

Here is the demo **with container queries**. Notice the state in the top left corner and see how it changes based on the container’s width. It’s magic, isn’t it?

<!-- TODO: find out about astro-island -->

### Dashboard widgets: Example 1

Oh, dashboard widgets. I guess this is a top-use example for CSS container queries. In a dashboard, the user might have the ability to customize the width or the size of the columns.

In the following example, all the widgets are the same component but they change differently based on their container width.

Try to toggle between the grid and see it yourself.

<!-- TODO: find out about astro-island -->

Cool, right? There is no magic in here. I just wrote three different styles for the same widget using `@container`.

```css
.widget {
  /* Default styling - Style 1 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* Style 2 */
  @container column (max-width: 150px) {
    flex-direction: column;
    gap: 4px;
    background-color: #fff;
    padding: 5px;
    border-radius: 8px;
  }

  /* Style 3 */
  @container column (min-width: 250px) {
    flex-direction: column;
    align-items: start;

    .icon {
      display: block;
      /* Other styles */
    }
  }
}
```

Feel free to inspect the demo above in case you want to see all the CSS details.

### Dashboard widgets: Example 2

In this example, we have a list of stats that represent some data from a system. If a stats item got a wider container, I want to change its design.

<!-- TODO: find out about astro-island -->

Here is the CSS:

```css
.widget {
  @container column (min-width: 280px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;

    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1.2rem;
    }
  }
}
```

### Dashboard widgets: Example 3

Another example in a dashboard is a progress component. The component should adapt based on its container width.

Try to toggle between “Grid 1” and “Grid 2”.

<!-- TODO: find out about astro-island -->

```css
.progress {
  /* Default styles */

  @container column (min-width: 250px) {
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;

    .percentage {
      display: block;
    }

    .progressWrapper {
      flex: auto;
      width: 100%;
      max-width: none;
    }

    .progress {
      height: 10px;
    }

    .percentage {
      font-size: 16px;
    }
  }
}
```

### Options list

In this example, we have a list of options that the user can choose from. By default, both the icon and the label are in a new line. If there is enough space, the icon and label will be next to each other.

Play with the demo below:

- Try to remove or add items (max is 5)
- Check the “Auto resize” button or the range slider

<!-- TODO: find out about astro-island -->

Here is the CSS. As simple as that.

```css
.option-wrapper {
  container: option / inline-size;
}

.option {
  @container option (min-width: 150px) {
    flex-direction: row;
    align-items: center;
  }
}
```

You might be considering using flex-wrap. While it will work, we can’t control exactly when it will wrap, resulting in some items being wrapped while others are not.

### Form inputs

In this example, the form inputs have a custom grid layout that should be added if there is enough space. Without container queries, this isn’t possible unless we write multiple media queries.

See the breakpoints by clicking on the previous and next buttons.

<!-- TODO: find out about astro-island -->

Here is the CSS needed. By default, we have a 1-col grid. If the container width is more than `250px`, the grid is changed.

```css
.start {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @container section (min-width: 250px) {
    grid-template-columns: 1.55fr 1fr;
  }
}
```

Here is a video of the previous demo, in case you’re on mobile:

<VidStack src="https://ishadeed.com/assets/container-query/form-inputs.mp4" />

### Threads list

In this example, we have a thread component that needs to show differently based on the container size. We can’t do it with media queries as it won’t work for all the cases.

See the following figure:

![](https://ishadeed.com/_astro/container-query-threads-1.CSk8pN60_1av0dw.png) 

To achieve that, we can use container queries as below:

- I used query units and CSS clamp to handle the dynamic font size
- I changed the `flex-direction` to `row` when there was enough space

```css
.threadTitle {
  font-size: clamp(14px, 1cqw + 12px, 16px);
  font-weight: bold;
}

.threadMeta {
  font-size: clamp(13px, 1cqw + 11px, 15px);
  color: #5b5b5b;
}

.thread {
  @container thread (min-width: 320px) {
    flex-direction: row;
    align-items: flex-start;
  }
}
```

Each query unit represents `1%` of the container width.

Here is the final demo:

<!-- TODO: find out about astro-island -->

### Newsletter

A newsletter can be displayed in a small or a large space. We can accommodate that using container queries.

```html
<div class="newsletter-wrapper">
  <div class="newsletter">
    <!-- Heading and form -->
  </div>
</div>
```

```css :collapsed-lines
@container newsletter (inline-size < 250px) {
  h2 {
    /* The blue line */
    &:before {
      content: "";
      display: block;
      height: 4px;
      width: 60px;
      background-color: var(--brand-1);
    }
  }
}

/* If the container width is smaller than 250, move the button out of the flow and show an icon. */
@container newsletter (inline-size < 250px) {
  .form-group {
    position: relative;

    input {
      padding-right: 32px;
    }

    button {
      position: absolute;
      right: 4px;
      top: 8px;
      /* Other styles */
    }

    svg {
      display: block;
    }
  }
}
```

In the following demo, the newsletter has two variations based on the container width. Try to resize the handle between the two variations.

<!-- TODO: find out about astro-island -->

### Timeline

In this example, the timeline component changes its layout based on the available space. The timeline can work in narrow and wide containers.

What you see below is the same component in different containers. On the left, we have the simple version. On the right, is the full version.

<!-- TODO: find out about astro-island -->

Have you noticed another in-between variation? I created three variations for this component to work with different containers.

![](https://ishadeed.com/_astro/container-query-timeline-1.Dj1KCOaX_paVri.png)

Here is a simplified CSS:

```css :collapsed-lines
@container timeline (inline-size > 300px) {
  .c-timeline__item {
    .c-timeline__content {
      padding-bottom: 3rem;
    }

    .c-timeline__content:after {
      left: calc(var(--size) / 2 * -1);
      width: var(--size);
      height: var(--size);
    }
  }
}

@container timeline (inline-size > 430px) {
  .c-timeline {
    display: flex;
    justify-content: center;
  }

  .c-timeline__item {
    --size: 40px;
    gap: 0;
    flex: 1;
    padding-left: 0;
    flex-direction: column;
    align-items: center;
  }
}

/* And a lot more CSS. Feel free to inspect the element in case you want to see the full CSS. */
```

### Sidebar navigation

A common pattern on the web is to expand or collapse a sidebar via a toggle button. We can use container queries to change the layout of the sidebar items.

See the following example and try to collapse the sidebar.

<!-- TODO: find out about astro-island -->

This is mostly done with CSS container queries and Javascript was used to change the sidebar width.

```css
.aside {
  container: sidebar / inline-size;
}

.aside.collapsed {
  width: 50px;
}

.nav-item .label {
  opacity: 0;
  transform: translateX(-5px);
  transition: 0.3s ease-out;

  @container sidebar (min-width: 100px) {
    opacity: 1;
    transform: translateX(0);
  }
}
```

This might not be the perfect usage for complex sidebars, but it works well for this simple usage.

### Event card

While checking TechCrunch, I noticed their implementation for the event card. It’s buggy and weird looking so I thought about why not giving it a chance with container queries.

Here is a video of their design:

<VidStack src="https://ishadeed.com/assets/container-query/techcrunch-resizing.mp4" />

As you see, there are a couple of issues:

- Inconsistent size for the buttons.
- Misaligned content (e.g.: event title, location).
- The UI wraps for items with long content, making the others look odd.
- No gap between content. At certain breakpoints, the content is very close to each other.

I honestly don’t know how this is still on TechCrunch. It’s full of bugs!

Let’s look at the HTML.

```html
<div class="event-card">
  <div class="meta">
    <p>Apr 25, 2024</p>
    <p>TechCrunch Early Stage 2024</p>
    <p>Boston</p>
  </div>
  <div class="actions">
    <a href="#" class="btn"> Buy Tickets </a>
    <a href="#" class="btn ghost"> Be a sponsor </a>
  </div>
</div>
```

Each event card is wrapped inside an `<li>` which will be used as a container for each card.

```html
<ul>
  <li class="card-wrapper">
    <div class="event-card">
      <!-- Event card -->
    </div>
  </li>
  <li class="card-wrapper"></li>
  <!-- And so on.. -->
</ul>
```

For the basic styling, the elements are stacked like the following example:

<!-- TODO: find out about astro-island -->

We can use flexbox dynamic wrapping to show the buttons next to each other when there is enough space.

```css
.btn {
  flex: 1 0 110px;
}
```

That means each button’s minimum width is `110px`. If there is not enough space, it will grow to fill its container.

In the following variation, the viewport width is slightly bigger, and as a result, the buttons are displayed next to each other.

<!-- TODO: find out about astro-island -->

Next, I used `@container` to check if the container size is larger than a specific value. If yes, the card’s content will be displayed next to each other.

```css
.card-wrapper {
  container: event / inline-size;
}

@container event (min-width: 430px) {
  .event-card {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meta {
    flex: 1;
  }
}
```

<!-- TODO: find out about astro-island -->

Cool. The next variation is the final one, where all the content is on the same row. Think of it as a table style. I did the following:

- Changed the `.meta` to `flex-direction: row`
- The date and location have a fixed width.
- The title is fluid to the available space
- Reset the `flex` property for the buttons

```css
@container event (min-width: 620px) {
  .meta {
    flex-direction: row;
    gap: 1.5rem;

    .title {
      flex: 1;
    }

    .date,
    .location {
      flex: 0 0 100px;
    }
  }

  .btn {
    flex: initial;
  }
}
```

See the result below and try to resize the window or play with the auto-resize button.

<!-- TODO: find out about astro-island -->

The story doesn’t end here. We used container queries to build the card component and now it works regardless of its container size.

### Github repo header

In Github, the header section in the repository page contains buttons and menus that change based on the viewport width.

See the following video.

<VidStack src="https://ishadeed.com/assets/container-query/github-repo-header.mp4" />

If you look at 0:11, notice how the aside is hidden and there is more space, but some of the details are hidden. In this specific case, container queries can fix that.

I tried to recreate a mockup of the Github header so you can play with it yourself. Here is the demo:

<!-- TODO: find out about astro-island -->

When the aside is hidden, the UI still has the same view even though their container is now bigger.

<!-- TODO: find out about astro-island -->

Here is the CSS for the prototype above.

```css :collapsed-lines
.meta {
  @container main (min-width: 330px) {
    display: flex;
  }
}

.menuButton {
  &.add {
    @container main (min-width: 330px) {
      display: flex;
    }

    @container main (max-width: 539px) {
      svg:first-of-type,
      span {
        display: none;
      }
    }

    @container main (min-width: 540px) {
      svg:last-of-type {
        display: none;
      }
    }
  }

  &.dots {
    @container main (min-width: 330px) {
      display: none;
    }
  }
}

.metaItem {
  span {
    @container main (min-width: 540px) {
      display: block;
    }
  }
}

.search {
  @container main (min-width: 330px) {
    display: flex;
  }

  @container main (max-width: 539px) {
    padding: 4px 10px;
    background: #f6f8fa;
    border: 1px solid #d0d7de;
    box-shadow:
      0px 1px 0px rgba(31, 35, 40, 0.04),
      inset 0px 1px 0px 1px rgba(255, 255, 255, 0.25);

    svg {
      display: none;
    }
  }

  @container main (min-width: 540px) {
    min-width: 160px;
    background: #fff;
    border: 2px solid #ececec;
  }
}
```

<!-- TODO: find out about astro-island -->

---

## Style queries use cases

::: info

Please keep in mind that style queries are supported only in Google Chrome and Safari Technology Preview at the time of writing this guide.

:::

### Dynamic timeline layout

I explored an example in the container queries where we have a timeline that changes based on the container size. It works, but there is one problem. When the number of timeline items is 4 or more, the full variation will become weird-looking.

See the demo below:

<!-- TODO: find out about astro-island -->

How we can fix that? We can check with CSS `:has()` if the number of timeline items is 5 or more. If yes, we set a CSS variable `--force-vertical: true`.

```css
.timelineWrapper {
  container: timeline / inline-size;
  --force-vertical: false;

  &:has(.c-timeline__item:nth-last-child(n + 5)) {
    --force-vertical: true;
  }
}
```

Then, we can combine the size and style queries together to show the full variation only if the number of items is less than 5 and have the minimum size needed.

```css
@container timeline (inline-size > 430px) and style(--force-vertical: false) {
  /* Apply the full variation. */
}
```

Test it out below. **Try to add more items and see what happens**. This demo works on the latest Chrome.

<!-- TODO: find out about astro-island -->

If the browser you’re using doesn’t support style queries, see the video below.

<VidStack src="https://ishadeed.com/assets/container-query/timeline-dynamic.mp4" />

### The fluid blockquote

A blockquote can live in different places on a web page. For example, it can be in a sidebar, article body, full-width section, and more.

We can change its style based on the container width, but that might not be enough. We need to style it based on the context, too.

To do that, we can set a custom CSS variable on the outer container.

```html
<div class="content" style="--context: article">
  <blockquote>
    <!-- Blockquote content here -->
  </blockquote>
</div>
```

And in CSS, we can do the following:

```css
@container style(--context: article) {
  blockquote {
    /* Custom CSS */
  }
}
```

Let’s take a closer look.

#### Article variation

This style is boxed, centered and designed to catch the user’s eye.

```css
@container style(--context: article) {
  .articleQuote {
    background-color: lightcyan;
    padding: 1rem 0.5rem;
    text-align: center;
    border-radius: 12px;
    max-width: 370px;
    margin: auto;

    &:before {
      /* Quote icon */
    }
  }
}
```

<!-- TODO: find out about astro-island -->

#### Aside variation

A secondary content that should be catchy, a simple one.

```css
@container style(--context: aside) {
  .articleQuote {
    p {
      font-size: 15px;
    }

    cite {
      font-weight: bold;
      font-size: 13px;
    }
  }
}
```

<!-- TODO: find out about astro-island -->

#### Full-width variation

A different background color and larger font size. This is an important quote and its style should reflect that.

```css
.section:has(blockquote) {
  min-height: 180px;
  background-color: var(--brand-1);
}

@container style(--context: full) {
  .articleQuote {
    p,
    cite {
      color: #fff;
    }

    p {
      font-size: clamp(1rem, 1rem + 2cqw, 1.35rem);
    }
  }
}
```

<!-- TODO: find out about astro-island -->

In case your browser doesn’t support style queries, here is a video for reference.

<!-- TODO: find out about astro-island -->

### Conditional horizontal article

An example of where style queries can be useful is the ability to change a component based on the context, not only the container size.

See the following example. We have an aside with the section “Popular articles”. If there is a CSS variable `--context: aside`, I want the card to turn into the horizontal style if it’s within the size range.

<!-- TODO: find out about astro-island -->

To do the above, we can nest the size query inside the style query. That way, the CSS will be applied only if

- the container has the `--context: aside`
- and the container size is between `170px` and `485px`

```css
@container style(--context: aside) {
  @container (min-width: 170px) and (max-width: 485px) {
    .card {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      img {
        aspect-ratio: 4 /3;
        flex: 0 0 clamp(60px, 60px + 10cqw, 120px);
      }
    }
  }
}
```

### Toggle a style query from another

In this example, we have an article body with a section that contains related articles. **I want to change the card style from stacked to horizontal** only if it’s inside the related section.

<!-- TODO: find out about astro-island -->

Here is the CSS:

- First, we have the style query for the horizontal style. It only works if the `--horizontal: true` is added to the nearest parent.
- Second, we check with another style query about the `--context: related` CSS variable. If it’s there, we switch the `--horizontal: true` one.

```css
/* Horizontal style */
@container style(--horizontal: true) {
  .card {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* Other styles */

    img {
      flex: 0 0 clamp(60px, 60px + 10cqw, 120px);
    }
  }
}

/* Toggle the horizontal style if the cards
* are within the related section */
@container style(--context: related) {
  --horizontal: true;
}
```

Interesting, right? I found this usage very useful.

---

## Container queries and DevTools

It’s worth mentioning that Chrome supports container queries in DevTools. In the following figure, I’m hovering over an element that is displayed via a container query.

I would have liked this more if the double arrow icon is properly aligned.

![](https://ishadeed.com/_astro/container-query-devtools.DDWrVqoU_Z1Ju8KH.png)

::: info Resources

```component VPCard
{
  "title": "4. Container Queries - CSS Containment Module Level 3",
  "desc": "While media queries provide a method to query aspects of the user agent or device environment that a document is being displayed in (such as viewport dimensions or user preferences), container queries allow testing aspects of elements within the document (such as box dimensions or computed styles).",
  "link": "https://w3.org/TR/css-contain-3/#container-queries/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

```component VPCard
{
  "title": "Use the Right Container Query Syntax",
  "desc": "Size queries are stable, and shipping in browsers",
  "link": "/oddbird.net/cq-syntax.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

<SiteInfo
  name="CSS container queries - CSS | MDN"
  desc="Container queries enable you to apply styles to an element based on certain attributes of its container:"
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Related articles

- [**CSS `:has()` Interactive Guide**](/ishadeed.com/css-has-guide.md): learn more about CSS :has(). You can mix it with container/style queries.
- [<VPIcon icon="fas fa-globe"/>iShadeed Lab - Container queries](https://lab.ishadeed.com/container-queries)
- [**CSS Style Queries**](/ishadeed.com/css-container-style-queries.md)
- [**Say Hello To CSS Container Queries**](/ishadeed.com/say-hello-to-css-container-queries.md)
- [**CSS Container Queries For Designers**](/ishadeed.com/container-queries-for-designers.md)

:::

---

## Outro

CSS container queries help us to write a truly fluid components that change based on their container size. In the next few years, we’ll see less media queries and more container queries. Of course, using media queries will still be useful for general layout stuff.

I hope you learned something new in the guide. Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Interactive Guide to CSS Container Queries",
  "desc": "Learn how to use CSS container queries today.",
  "link": "https://chanhi2000.github.io/bookshelf/ishadeed.com/css-container-query-guide/",
  "logo": "https://ishadeed.com/assets/favicon-32x32.png",
  "background": "rgba(129,38,197,0.2)"
}
```
