---
lang: en-US
title: "How to Add and Remove Items From a Native CSS Carousel (…with CSS)"
description: "Article(s) > How to Add and Remove Items From a Native CSS Carousel (…with CSS)"
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
      content: "Article(s) > How to Add and Remove Items From a Native CSS Carousel (…with CSS)"
    - property: og:description
      content: "How to Add and Remove Items From a Native CSS Carousel (…with CSS)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-add-and-remove-items-from-a-native-css-carousel-with-css.html
prev: /programming/css/articles/README.md
date: 2025-11-26
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://frontendmasters.com/blog/author/danielschwarz/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7830
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
  name="How to Add and Remove Items From a Native CSS Carousel (…with CSS)"
  desc="It's already quite impressive you can build a carousel with no JS at all (in Chrome, for now, anyway) and with some checkbox-hack stuff we can control dynamically what is shown."
  url="https://frontendmasters.com/blog/how-to-add-and-remove-items-from-a-native-css-carousel-with-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7830"/>

The [<VPIcon icon="iconfont icon-w3c"/>CSS Overflow Module Level 5](https://w3.org/TR/css-overflow-5/) defines specs for scrolling controls that enable users to navigate overflow content without manually scrolling (like click-and-dragging the scrollbar, the trackpad, a scrollwheel, or the like). This includes scroll *buttons*, which enable users to scroll 85% of the scrollport, unless scroll snapping is enabled, as well as scroll *markers*, which enable users to skip to specific scroll targets (direct children of the scroll container).

These buttons and markers make themselves present via CSS pseudo-elements. At the time of this writing, these pseudo-elements are only supported in Chrome 142+:

- `**::scroll-marker**`: a generated element that links to a scroll target in a scroll container (behaves like an `<a>`)
- `**::scroll-button**(<direction>)`: a generated element that scrolls 85% of the scrollport, where `<direction>` can be `up` , `down`, `left`, `right`, or `all` (behaves like a `<button>`)

There are *many* ways that we can leverage these CSS features. I’ll share some of them throughout this article, but focus on one in particular: a standard CSS carousel. We’ll use all the bells and whistles mentioned above and one extra twist, the ability to **add and remove items** from it.

This functionality would be ideal for showing product photos according to user-defined variables such as color or size, or showing items handpicked by users, just to give to two examples.

<CodePen
  user="anon"
  slug-hash="RNrZrNm"
  title="Native CSS carousel with toggle-able items (horizontal)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Ready to dig in?

---

## Step 1: Setting up the Scroll Container

In this first step, I’m just going to walk you through the HTML, the carousel’s dimensions, and how we determine which carousel items have been added to the carousel.

### The HTML

The carousel itself is an unordered list (`<ul>`) with list items (`<li>`) inside (in terms of accessibility, I think this is the best markup). Prior to that we have some checkboxes, which users can toggle to add and remove the carousel items, and for the purpose of this walkthrough I’ve pre-selected a few of them using the `checked` attribute. Finally, we wrap all of that, establishing our overall component. This part is important because we’ll be seeing which checkboxes *within* it *aren’t* checked, and then hiding the corresponding carousel items — also within it — based on that:

```html
<div class="component">

  <input type="checkbox" id="i1"><label for="i1">Toggle slide 1</label>
  <input type="checkbox" id="i2"><label for="i2">Toggle slide 2</label>
  <input type="checkbox" id="i3" checked><label for="i3">Toggle slide 3</label>
  <input type="checkbox" id="i4" checked><label for="i4">Toggle slide 4</label>
  <input type="checkbox" id="i5" checked><label for="i5">Toggle slide 5</label>

  <ul class="carousel">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>

</div>
```

### The CSS

First we rein in the carousel’s width using `max-width`, then we make the height half of whatever the computed width is using `aspect-ratio`. Just a little responsive design.

After that, we see which checkboxes aren’t checked, and then hide the corresponding scroll targets/carousel items. For example, this is what we do for the first checkbox and carousel item:

- `.component:has(input:nth-of-type(1):not(:checked)) {}`: select the component, which contains an input, the first of which isn’t checked
- `li:nth-of-type(1) {}`: within that, select the first carousel item
- `display: hidden`: and hide it

That covers the adding-and-removing logic. What’s even better is that those checkboxes can be used to submit data, so if you were to mark up the component as a `<form>`, you do form-like things with it, like serialize the data and save it.

In the next section, we declare placeholder styles for when *no* checkboxes are checked (`.component:not(:has(input:checked))`). This conditional `:has()` block (and certain others) isn’t required, but it’s a great way of clarifying what, when, and why, for other developers and for yourself if you come back to the code later.

If at least one checkbox is checked (`.component:has(input:checked)`), the carousel receives `display: flex`, which makes the carousel items flow horizontally, while the carousel items within receive `min-width: 100%`, which ensures that only one carousel item is displayed at a time.

The final block runs if multiple checkboxes are checked (`.component:has(input:checked ~ input:checked)`, which translates to “if a checked checkbox is immediately or non-immediately followed by another checked checkbox”). This is where the code for the scroll markers, scroll buttons, and scroll behaviors will go.

```css :collapsed-lines
.component {
  ul.carousel {
    max-width: 738px;
    aspect-ratio: 2 / 1;
  }

  /* If the first checkbox isn’t checked */
  &:has(input:nth-of-type(1):not(:checked)) {
    /* Hide the first list item */
    li:nth-of-type(1) {
      display: none;
    }
  }

  /* And so on, incrementing the nth-of-type */
  &:has(input:nth-of-type(2):not(:checked)) {
    li:nth-of-type(2) {
      display: none;
    }
  }

  /* If no checkboxes are checked */
  &:not(:has(input:checked)) {
    /* Placeholder content for the carousel */
    ul.carousel {
      background: #eee;
    }
  }

  /* If any checkbox is checked */
  &:has(input:checked) {
    ul.carousel {
      /* Implies flex-direction:row */
      display: flex;

      li {
        /* Show one list item only */
        min-width: 100%;
      }
    }
  }

  /* If multiple are checked */
  &:has(input:checked ~ input:checked) {
    /* Step 2 and step 3 code here */
  }
}
```

<CodePen
  user="anon"
  slug-hash="xbVxXPe"
  title="Native CSS carousel with toggle-able items (step 1)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Step 2: Building the Carousel and Scroll Markers

Continuing from where we left off, let’s revisit the carousel. Keep in mind that we’re working within the context of multiple checkboxes being checked `.component:has(input:checked ~ input:checked)`, which means that the carousel items that are visible will horizontally overflow the carousel unless we declare `overflow: hidden` (or `overflow: scroll` if you want to allow manual scrolling).

Next, by default, scroll buttons enable users to scroll 85% of the scrollport, but we’re looking for a slideshow-type behavior where one complete slide is shown at a time, so we’ll need to set up scroll snapping for the additional 15%. `scroll-snap-type: x` will do exactly that for the x-axis. We’ll figure out the exact alignment in a moment.

Complimenting that, `scroll-behavior: smooth` will ensure that users snap to the carousel items smoothly when using the scroll buttons (and scroll markers).

`anchor-name: --carousel` turns the carousel into [<VPIcon icon="fas fa-globe"/>an anchor](https://frontendmasters.com/blog/tag/anchor/), naming it `--carousel`. This will enable us to align the scroll buttons (and scroll markers) relative to the carousel, but again this is something that we’ll do in a moment.

The `scroll-marker-group` property relates to the `::scroll-marker-group` pseudo-element that’s generated whenever a scroll marker is generated. It’s basically the container for the scroll markers, where the value of `scroll-marker-group` determines whether `::scroll-marker-group` is inserted before or after the carousel’s content (similarly to `::before`/`::after`), affecting tab order. You **must** set `scroll-marker-group` to either `before` or `after`.

Treat `::scroll-marker-group` like any other container. For example, `display: flex; gap: 1rem;` will make the scroll markers flow horizontally with `1rem` of spacing between them. After that, we combine `position: fixed` and `position-anchor: --carousel` (`--carousel` refers to the anchor that we named earlier) to align the container relative to the carousel, then `justify-self: anchor-center` to align it horizontally and `bottom: calc(anchor(bottom) + 1rem)` to align it `1rem` from the bottom.

The scroll markers are pseudo-elements of the scroll targets (so `li::scroll-marker`), which makes sense, right? One marker for every scroll target. But as mentioned before, they’re inserted into `::scroll-marker-group`, *not* the scroll targets, so *where* you select them isn’t where they’re inserted. After your brain has reconciled that (it took me a minute), you’ll need to set their `content` property. We’re using stylized markers here, so we’ve set them to an empty string (`content: ""`), but you can insert whatever content you want inside of them, and even number them using [CSS counters (<VPIcon icon="fa-brands fa-codepen"/>`mrdanielschwarz`)](https://codepen.io/mrdanielschwarz/pen/yyyeWep).

After that you’re free to style them, and if you want to take that a step further, `::scroll-marker` has three pseudo-classes:

- `:target-current`: the active scroll marker
- `:target-before`: all scroll markers before the active one
- `:target-after`: all scroll markers after the active one

Note: the pseudo-class **must** be prefixed by the pseudo-element:

```css
/* Won’t work */
:target-current {
  /* ... */
}

/* Won’t work (even though it should?) */
::scroll-marker {
  &:target-current {
    /* ... */
  }
}

/* Only this will work */
::scroll-marker:target-current {
  /* ... */
}
```

This is the full (step 2) CSS code:

```scss :collapsed-lines
/* Step 1 code here */

ul.carousel {
  /* Hide overflow/disable scrolling */
  overflow: hidden;

  /* Enable x-axis scroll snapping */
  scroll-snap-type: x;

  /* Enable smooth scrolling */
  scroll-behavior: smooth;

  /* Turn the carousel into an anchor */
  anchor-name: --carousel;

  /* Insert the SMG after the content */
  scroll-marker-group: after;

  /* SMG (holds the scroll markers) */
  &::scroll-marker-group {
    /* Scroll marker layout */
    display: flex;
    gap: 1rem;

    /* Anchor the SMG to the carousel */
    position: fixed;
    position-anchor: --carousel;

    /* Anchor it horizontally */
    justify-self: anchor-center;

    /* Anchor it near the bottom */
    bottom: calc(anchor(bottom) + 1rem);
  }

  li::scroll-marker {
    /* Generate empty markers */
    content: "";

    /* Style the markers */
    width: 1rem;
    aspect-ratio: 1 / 1;
  }

  /* Active marker */
  li::scroll-marker:target-current {
    background: white;
  }

  /* All markers before the active one */
  li::scroll-marker:target-before {
    background: hsl(from white h s l / 50%);
  }

  /* All markers after the active one */
  li::scroll-marker:target-after {
    background: red;
  }

  /* Step 3 code here */
}
```

<CodePen
  user="anon"
  slug-hash="ZYWErza"
  title="Native CSS carousel with toggle-able items (step 2)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Step 3: adding the scroll buttons

In this final step we’ll add the scroll buttons, which are pseudo-elements of the scroll container (the carousel in this case). `::scroll-button()` accepts five physical values for its only parameter:

- `::scroll-button(*)`
- `::scroll-button(left)`
- `::scroll-button(right)`
- `::scroll-button(up)`
- `::scroll-button(down)`

As well as four logical values:

- `::scroll-button(block-start)`
- `::scroll-button(block-end)`
- `::scroll-button(inline-start)`
- `::scroll-button(inline-end)`

They too must have valid `content` properties like the scroll markers, otherwise they won’t show up. In today’s example we’re only using `::scroll-button(left)` and `::scroll-button(right)`, inserting directional arrows into them, but only when enabled (e.g., `::scroll-button(left):enabled`). When they’re `:disabled` (which means that it’s impossible to scroll any further in that direction), no `content` property is set (which, again, means that they won’t show up).

We also use anchor positioning again, to align the scroll buttons relative to the carousel. `::scroll-button(*)` selects all scroll buttons, which is where most of this logic is declared, then of course `::scroll-button(left)` and `::scroll-button(right)` to align the individual buttons to their respective edges.

And finally, we also declare `scroll-snap-align: center` on the carousel items (`<li>`), complimenting the `scroll-snap-type: x` that we declared on the carousel earlier, which ensures that when users click on these scroll buttons, they don’t scroll 85% of the scrollport. Instead, they snap to the scroll target fully.

```scss :collapsed-lines
/* Step 1 code here */

ul.carousel {
  /* Step 2 code here */

  /* All scroll buttons */
  &::scroll-button(*) {
    /* Anchor them to the carousel */
    position: fixed;
    position-anchor: --carousel;

    /* Anchor them vertically */
    align-self: anchor-center;
  }

  /* Left scroll button (if enabled) */
  &::scroll-button(left):enabled {
    /* Generate the button with content */
    content: "⬅︎";

    /* Anchor it near the left */
    left: calc(anchor(left) + 1rem);
  }

  /* Right scroll button (if enabled) */
  &::scroll-button(right):enabled {
    /* Generate the button with content */
    content: "⮕";

    /* Anchor it near the right */
    right: calc(anchor(right) + 1rem);
  }

  li {
    /*
      Snap to the center of scroll targets
      instead of scrolling 85% of the scrollport
    */
    scroll-snap-align: center;
  }
}
```

<CodePen
  user="anon"
  slug-hash="RNrZrNm"
  title="Native CSS carousel with toggle-able items (horizontal)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And here’s the same thing but vertical:

<CodePen
  user="anon"
  slug-hash="gbrOvNW"
  title="Native CSS carousel with toggle-able items (vertical)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Wrapping up

These features are really cool. They can be used in so many different ways, from [tabs (<VPIcon icon="fa-brands fa-codepen"/>`mrdanielschwarz`)](https://codepen.io/mrdanielschwarz/pen/wBBMEKV) to [pagination (<VPIcon icon="fa-brands fa-codepen"/>`mrdanielschwarz`)](https://codepen.io/mrdanielschwarz/pen/yyyeWep). To throw in a more a real-world example of what we explored here today, a carousel showing product photos:

<CodePen
  user="anon"
  slug-hash="dPMyeWK"
  title="Native CSS carousel with toggle-able items (product photos)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Just choose the color that you want and that’s what the carousel will show!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Add and Remove Items From a Native CSS Carousel (…with CSS)",
  "desc": "It's already quite impressive you can build a carousel with no JS at all (in Chrome, for now, anyway) and with some checkbox-hack stuff we can control dynamically what is shown.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-add-and-remove-items-from-a-native-css-carousel-with-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
