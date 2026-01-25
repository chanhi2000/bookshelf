---
lang: en-US
title: "Accessible faux-nested interactive controls"
description: "Article(s) > Accessible faux-nested interactive controls"
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
      content: "Article(s) > Accessible faux-nested interactive controls"
    - property: og:description
      content: "Accessible faux-nested interactive controls"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/accessible-faux-nested-interactive-controls.html
prev: /programming/css/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Eric Bailey
    url : https://piccalil.li/author/eric-bailey
cover: https://piccalil.b-cdn.net/api/og-image?slug=accessible-faux-nested-interactive-controls/
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
  name="Accessible faux-nested interactive controls"
  desc="A really common user interface pattern is a big clickable area, such as a card. Sometimes you need controls within that card that are also clickable. There's lots of ways to do it wrong, but fret not, Eric is here to show you how to do it right."
  url="https://piccalil.li/blog/accessible-faux-nested-interactive-controls"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=accessible-faux-nested-interactive-controls/"/>

In web accessibility, **a thing you absolutely cannot do is nest one interactive control inside another**:

```html
<!-- ❌ Never do this! -->
<button type="button">
  <a href="/path/to/resource/">
    Save as favorite
  </a>
</button>
```

There are a few reasons not to do this, but the most important reasons is it can prevent people from using your service just by virtue of the way they use to interact with the web.

In spite of this fact, nested interactive controls are a pattern I see with regularity. I chalk this fact up to:

1. A general lack of awareness or education about web accessibility,
2. A tendency to skip accessibility reviews and save fixes for some undetermined future state, and also
3. Newer web experiences becoming more “app-like.”

By app-like, I mean things like [<VPIcon icon="fa-brands fa-firefox"/>seamless transitions between pages](https://developer.mozilla.org/en-US/blog/view-transitions-beginner-guide/), less overall page content, and larger, touch-friendly interactive areas.

And app-like experiences on the web isn’t a bad thing! It’s more that **when we borrow the [<VPIcon icon="fas fa-globe"/>affordances](https://interaction-design.org/literature/topics/affordances) of mobile apps we must also do so in a way that honors the conventions of the web platform**.

---

## An example

Here’s a UI pattern I was working on recently:

![A simplified wireframe illustration of a list with four list items. Each list item contains a square representing an image placeholder, followed by large dark blue lines representing the list item’s primary action. Each list item’s background is a lighter blue color, used to communicate the entire list item is interactive and related to the primary action. Smaller gray lines are placed underneath each primary item, which suggests secondary static text. At the end of each list item is one to three pink squares, used to signify the list item’s secondary action(s). ](https://piccalil.b-cdn.net/images/blog/list-component.png?auto=format&w=1500)

It is a list of items, with each item containing both

1. A primary action (blue), and
2. One or more secondary actions (pink).

Here, the primary action was specified to **apply to the entire list item row, minus the space the secondary actions took up**.

This means you can click both the primary action itself, and all of its surrounding area, minus the space reserved for secondary actions.

The idea being it would make it easier and faster for people to activate the primary action. This ease of activation is also done without sacrificing the ability to use secondary actions.

---

## Avoiding nesting interactive elements

We **can’t nest interactive controls on the web**. So, this underlying HTML structure for our component would be a non-starter:

```html
<!-- ❌ Again, don't do this -->
<ul>
  <li>
    <a href="/path/to/resource/">
      Primary action
      <button type="button">
        Secondary action
      </button>
     </a>
  </li>
</ul>
```

We can make this design work in such a way that **both** honors the designed intent and also does not nest interactive controls.

The secret to this approach? Adapting our very own [<VPIcon icon="iconfont icon-piccalilli"/>Andy Bell](https://piccalil.li/author/andy-bell)’s [**semantic breakout button technique**](/piccalil.li/create-a-semantic-break-out-button-to-make-an-entire-element-clickable.md).

The gist of the technique is this:

1. You can use `position: static`, plus an absolutely-positioned `::before` pseudo-element declaration to extend the clickable area of an interactive element to take up the entire height and width of the viewport.
2. You then use a `position: relative` declaration to “clamp” the clickable area to a parent element.
3. Finally, you increase the `z-index` value of other interactive elements to ensure they “float” over the rest of the interactive area and are clickable.

Here’s a short comic of how it works, if you’re more of a visually-oriented thinker:

![A five panel comic. The first panel has a caption that reads, “1. A link is added.” It shows hot pink text that reads, “Primary action” floating above a blank white background. The second panel has a caption that reads, “2. The semantic breakout button technique is applied.” It shows a light pink background that takes over the entire white area. Four darker pink arrows extend from the top, bottom, right, and left-hand sides of the text. The third panel’s caption is, “3. The breakout area is constrained.” It depicts a narrow rectangle with rounded corners, a purple border, and a label that reads “Container”. The primary action text has been moved inside the rectangle, towards its left-hand side. The light pink background is constrained by the rectangle’s boundaries, re-revealing the white background. The fourth panel’s label is “4. A secondary action is added.” It shows a small purple button added to the inside of the rectangle, placed towards its right-hand side. The button has a label that reads, “Secondary action”. The fifth and final panel has a label of “5. Applying z-index ensures the secondary action is clickable”. It shows the secondary action button floating above the container rectangle. The rectangle has been rotated to an isometric view, to better show how the secondary button is on a higher plane.](https://piccalil.b-cdn.net/images/blog/accessible-faux-controls-comic.png?auto=format&w=1500)

We can then build from this, combining it with things like [<VPIcon icon="fa-brands fa-firefox"/>`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within) and [<VPIcon icon="fa-brands fa-firefox"/>`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) to **create the appearance of nested interactive controls without actually having to do so in the DOM**.

---

## Putting it into practice

Without further ado, here’s a CodePen of the final result:

<CodePen
  user="piccalilli"
  slug-hash="dPGJZeO/"
  title="Accessible faux-nested interactive controls"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Now, let’s break it down:

### Structure

#### Container

The total list of items is contained within an unordered list. Each item within the list is contained with a `li` element. This enables assistive technology to:

- Know that it is a list,
- Enumerate how many items are in the list, and
- Announce which list item is currently being read through.

#### Primary content area

This is a `div` placed within the parent `li` element, and it is used to house the main action, as well as supplemental content. And placing `div` elements within a `li` is totally a thing you can do! [<VPIcon icon="fas fa-globe"/>HTML is pretty flexible](https://shkspr.mobi/blog/2025/12/the-web-runs-on-tolerance/), and it’s [<VPIcon icon="fas fa-globe"/>valid markup](https://validator.nu/).

#### Secondary content area

This is another `div` placed within the parent `li` element. It is used to house the secondary action(s).

#### Leading visual

This is a child element of the primary content area, and provides an area where we can insert an icon or graphic to help with quick visual scanning. In our example, it provides a photo of the lunch special you can order.

#### Primary action

This is also a child element of the primary content area. In our example, the primary action is a link that allows you to read up on more detail about the lunch special.

**This is the main thing we want people to click on**. It will be targeted in CSS to extend its interactive area to the boundaries of the parent `li` element, using the breakout technique discussed previously.

We also use a heading element to wrap the text of the primary action. This allows people who use screen readers to [<VPIcon icon="fas fa-globe"/>quickly scan the page to know its overall makeup](https://webaim.org/projects/screenreadersurvey10/#finding) when navigating by heading.

From there, people can then [<VPIcon icon="fas fa-globe"/>use other navigation techniques](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts#nvda-the_basics) to dial in when they want to learn more about the content the heading introduces.

#### Secondary actions

These are children of the secondary content area.

More than one secondary action can be added to the secondary content area, provided the actions **are not** nested inside one another in the DOM.

There is also no upper limit to the number of secondary actions you can use, either. In our example, the secondary actions are two `buttons` that allow you to:

1. Favorite an item in the list, and also
2. Quickly add an item to your shopping cart.

It is also good practice to disambiguate the accessible names of your secondary actions. I like a “verb noun” pattern, so for our example it’s “Favorite: Sashimi Lunch” and “Add to cart: Salmon and Avocado Maki.”

### Styling

#### Grids

[<VPIcon icon="fa-brands fa-firefox"/>CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) does the heavy lifting for placing content. We’re using [<VPIcon icon="fas fa-globe"/>named grid areas](https://thoughtbot.com/blog/concise-media-queries-with-css-grid) to both:

1. Place items within the primary and secondary content areas, and then
2. Lay content out within the primary content area.

Named grid areas is a technique that I’ve found helpful for future maintenance efforts.

Other people working with the component may be less familiar with both CSS and grid-based declarations. Because of this, a visual arrangement of the layout in code that uses easy-to-understand [<VPIcon icon="fa-brands fa-firefox"/>grid area names](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area) may make it less confusing to parse — especially when your design needs to be responsive.

The use of named grid areas also **potentially lowers the chance someone does something unintended**. This is really important for a component like this, where we rely on `z-index` to ensure secondary content remains interactable.

#### Container queries

Speaking of making things responsive, we’re using [<VPIcon icon="iconfont icon-w3c"/><VPIcon icon="fa-brands fa-firefox"/>container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) to adjust the layout so it adapts to smaller horizontal surface area without [<VPIcon icon="iconfont icon-w3c"/>creating horizontal overflow](https://w3.org/WAI/WCAG21/Understanding/reflow.html).

The cool bit about using container queries instead of more traditional media queries is that it creates more self-contained and self-sufficient components. Here, we know that **the component will adapt to whatever container it is placed in**, regardless of the container’s available horizontal width.

#### Primary action click area

The semantic breakout styling is applied to `.list-item-primary-action` — the primary action.

The clickable area is then constrained by `.list-item`, the parent list item. This means that **the actual interactive area is the same size as the entire list item’s computed size**.

#### Secondary action ‘clickability’

The secondary actions are elevated above the primary action via a `z-index` declaration to ensure clicks and taps can successfully be intercepted.

We use [<VPIcon icon="fa-brands fa-firefox"/>`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc), [<VPIcon icon="fa-brands fa-firefox"/>Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), and [<VPIcon icon="fa-brands fa-firefox"/>`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) to create some defensive design here:

- The `z-index` of secondary actions is set to **always be one number higher** than the `z-index` of its parent list item.
- The parent list item‘s `z-index` is, in turn, scoped to the component’s parent class.

This approach helps to prevent [<VPIcon icon="fa-brands fa-firefox"/>stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context) accidents by ensuring that **secondary actions will always be clickable regardless of what `z-index` value is used** — or updated to use.

We then use `:where()` to target every possible interactive element you can declare in HTML and also apply the incremented `z-index`  treatment. This helps ensure this component is future-proof, which is important given both:

- The relative rarity of the semantic breakout technique, and
- The need to ensure new secondary actions stay intractable.

---

## A tangent about accessible name length

An accessible name is the text value supplied to an interactive element. The preferred way to do this is to use a string in between the opening and closing tags of a HTML element:

```html
<!-- This button has an accessible name of "Print recipe" -->
<button type="button">
  Print recipe
</button>
```

It is considered good practice to have your accessible names be **both concise and descriptive**. So, an accessible name of “Print recipe” is far more desirable than something like, “Send this recipe to your printer so you can take it into your kitchen.”

Interactive elements that contain multiple child elements with **a lot of text content can inadvertently have a really long accessible name**. An example of this is a block-level anchor link, say for a card component:

```html
<a class="card-link" href="/path/to/resource/">
  <div class="card">
    <img alt="A Nintendo Switch 2 placed on a Kirby-shaped pillow." class="card-hero" src="/path/to/image.png" />
    <h3 class="card-title">
      The best gift ideas for new college students 
    </h3>
    <p class="card-description">
      Whether it is a new game console or a set of smart appliances, these items can make great gifts for your special someone!
    </p>
    <ul class="card-tags">
      <li class="card-tag">
        Trending
      </li>
      <li class="card-tag">
        Hot
      </li>
      <li class="card-tag">
        Gift Ideas
      </li>
    </ul>
  </div>
</a>
```

The entire card component is wrapped in an anchor element. Because of this, all its text content gets “flattened” and turned into one long accessible name.

This flattening will create an assistive technology announcement along the lines of:

> A Nintendo Switch 2 placed on a Kirby-shaped pillow, graphic. The best gift ideas for new college students, heading level 3. Whether it is a new game console or a set of smart appliances, these items can make great gifts for your special someone! List, bullet Trending, bullet Hot Gift Ideas. Link.

This announcement is a lot of information to parse if you’re using a screen reader, which is tedious at best and confusing at worst. So, why do I bring this up here?

Well, the semantic breakout button technique also works wonderfully in situations like this, where **we want a more concise accessible name without sacrificing the increased click area size**. This helps guarantee an [equivalency of experience](https://smashingmagazine.com/2020/05/equivalent-experiences-part1/), in that the card titles can be quickly skimmed to see if they’re of interest — both visually and not.
<!-- TODO: /smashingmagazine.com/equivalent-experiences-part1.md -->

For our card example, we could move the anchor element inside of the card title, then extend it‘a interactive area out to cover the whole card using an application of the semantic breakout technique that targets the parent `.card` class.

The entire card would remain clickable, but this update would create **a far less verbose assistive technology announcement** for the primary link, which will be something along the lines of:

> The best gift ideas for new college students. Link.

The other bit worth knowing is that use of this technique **does not impede the ability of a person using a screen reader** to explore the rest of the card’s content.

Using the semantic breakout technique makes it so the card content will be read out the same expected way it reads other static DOM content. That’s a good thing!

---

## Another tangent about usability considerations

Faux-nested interactive controls run the risk of accidental activation of the wrong thing, so exercise caution when using them.

Consider things like:

- In-the-moment distractions,
- Layout shifting,
- [<VPIcon icon="fas fa-globe"/>Low vision](https://webaim.org/articles/visual/lowvision),
- [<VPIcon icon="fas fa-globe"/>Hand tremors](https://webaim.org/articles/motor/motordisabilities),
- Assistive technology such as [<VPIcon icon="fas fa-globe"/>eye-tracking](https://webaim.org/articles/motor/assistive#eyetracking),
- etc.

Accidentally clicking the wrong thing just by virtue of circumstance isn’t great for anyone involved.

Because of this, caution should be used when deciding to use this technique. **Be especially careful when it comes to [<VPIcon icon="fas fa-globe"/>irrevocable or destructive actions](https://primer.style/product/components/confirmation-dialog/guidelines/#usage)**.

![A circular button nested inside of a longer, more rectangular button. The circular button has a red background and has a label that reads, “Eject fuel”. The gray button has a narrow green indicator light and a label that reads, “Launch rocket.”](https://piccalil.b-cdn.net/images/blog/launch-rocket-eject-fuel-padded.png?auto=format&w=1500)

It’s considered good practice to provide a secondary “Are you sure?” confirmation step for this situation, regardless of how the UI looks.

---

## A third tangent about progressive enhancement

The only JavaScript we’re using in the CodePen demo is a small piece of logic that gives you feedback that you successfully activated a primary action.

[<VPIcon icon="fas fa-globe"/>We’re still left with something functional](https://cydstumpel.nl/why-we-teach-our-students-progressive-enhancement/) when [**JavaScript**](/piccalil.li/a-handful-of-reasons-javascript-wont-be-available.md), images, or styles fail to load: A list of items that contain links.

![The CodePen example with styles disabled, using browser-default fallback styling. It still renders as a list of five items with a primary-action-as-title, price, and secondary action buttons.](https://piccalil.b-cdn.net/images/blog/accessible-faux-controls-no-styles.png?auto=format&w=1500)

This is pretty helpful, especially in [<VPIcon icon="fas fa-globe"/>less-than-ideal circumstances](https://sparkbox.com/foundry/helene_and_mobile_web_performance).

---

## Wrapping up

Modern CSS lets you have it all: resilient, adaptable, fault-tolerant experiences that recreate the affordances of contemporary app-like experiences without sacrificing accessibility.

Considered and thoughtful applications of CSS — like Andy Bell’s [**semantic breakout button technique**](/piccalil.li/create-a-semantic-break-out-button-to-make-an-entire-element-clickable.md) — can mesh harmoniously with newer features to create all sorts of new and exciting experiences.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Accessible faux-nested interactive controls",
  "desc": "A really common user interface pattern is a big clickable area, such as a card. Sometimes you need controls within that card that are also clickable. There's lots of ways to do it wrong, but fret not, Eric is here to show you how to do it right.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/accessible-faux-nested-interactive-controls.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
