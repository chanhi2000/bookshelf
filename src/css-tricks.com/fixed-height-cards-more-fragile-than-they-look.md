---
lang: en-US
title: "Fixed-Height Cards: More Fragile Than They Look"
description: "Article(s) > Fixed-Height Cards: More Fragile Than They Look"
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
      content: "Article(s) > Fixed-Height Cards: More Fragile Than They Look"
    - property: og:description
      content: "Fixed-Height Cards: More Fragile Than They Look"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/fixed-height-cards-more-fragile-than-they-look.html
prev: /programming/css/articles/README.md
date: 2026-05-04
isOriginal: false
author:
  - name: Kevine Nzapdi
    url: https://css-tricks.com/author/kevinenzapdi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/borken-card-layout.jpg
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
  name="Fixed-Height Cards: More Fragile Than They Look"
  desc="Getting a multi-column of cards to line up equally is is a headache we've all faced, and it gets even harder when working with fixed heights."
  url="https://css-tricks.com/fixed-height-cards-more-fragile-than-they-look"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/borken-card-layout.jpg"/>

Fixed-height cards often feel like a safe choice. A designer hands you a mockup where every card aligns perfectly in a grid. The titles are short, the excerpts fit neatly, and the layout looks stable across the entire page. So you implement the design exactly as specified and ship it.

Everything works until the content changes. An editor updates the copy, a translation adds longer words, and some users bump their default font size, especially those with low vision or digital eye strain, just to make things easier to read.

I ran into this while building a “Recent Articles” section for a blog. The design assumed relatively short English titles, so everything fit comfortably inside the fixed height.

The layout looked solid at first glance:

![Initial design](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771412989046_file.png?resize=1464%2C924)

But once the content changed, the cracks started appearing:

![A three-column layout of cards. The content contained in the third card is longer than the first two cards, resulting in its content overlapping with elements below it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771415403004_file.png?resize=1192%2C480)

Translating the content to French made things worse:

![Language issues](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771415428852_file.png?resize=1143%2C478&ssl=1)

German translations pushed the layout even further:

![More layout failures](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771415437407_file.png?resize=1134%2C460)

What once looked like a stable component turned out to depend on a fragile assumption: that the content would always stay within a fixed height.

Here’s a demo of the layout:

<CodePen
  user="anon"
  slug-hash="EayBjeY"
  title="Fixed height"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Fixed-Height Layouts Look Fragile

In the design specifications, the pixel dimensions were exact, and you know that cards align more cleanly when they have the same vertical rhythm and equal size, which creates in our mind a sense of order that I and the designer kind of trusted.

So, I set:

```css
.card__title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__excerpt {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

But surprisingly, the behavior changed as soon as the font settings changed. I increased the browser’s default text size and realized that it introduced pressure inside the cards. My text blocks grew, but the container remained the same, and elements began competing for the same space.

Normally, a block element simply grows with its content. But the moment I set that height, I broke that relationship. The browser doesn’t treat this as a problem; it just resolves the conflict the only way it can, by either letting content overflow or clipping it.

In the original version of the layout, I just bluntly hid those problems with `overflow: hidden`.

To make the problem visible, we can remove the safety net:

```css{8}
.card__title {
  display: -webkit-box;
  font-size: 18px;
  line-height: 1.2;
  margin: 0 0 8px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* overflow: hidden; */
}

.card__excerpt {
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 0 10px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
} 
```

Without `overflow: hidden`, the failure is no longer subtle. The content stops clipping and starts spilling out like groceries from a torn bag. Some excerpts sit right on the tags, and everything was breaking once we stopped hiding the pressure inside the card.

![Removing `overflow: hidden` reveals the structural tension instead of masking it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7CA1115BFA9387F857EF921E56E77A943A603D3C3D838C516571362CA9D1CAF2_1773162669651_image.png?resize=1132%2C421)

Unfortunately, the browser has no way to reconcile those competing instructions except by letting elements collide.

---

## Removing the Fixed Height

Removing the constraints that held this layout together reveals where the real problem lives. Fixed heights, absolute positioning, and grid alignment were all trying to control the same thing.

### Absolutely Positioned Actions: Removed From Flow

Up to this point, the fixed height looks like the main culprit to me. But it isn’t acting alone; the actions at the bottom of the card were absolutely positioned:

```css
.card__actions {
  position: absolute;
  inset: 0 14px 14px;
}
```

This feels like a clean solution; the actions stay pinned to the bottom of the card no matter how long the content is.

In a typical block layout, a container’s height is determined by the combined contribution of its in-flow children.

I’m sure you have seen [**how absolutely positioned elements behave**](/css-tricks.com/absolute-relative-fixed-positioining-how-do-they-differ.md). The browser still renders them, even though they no longer contribute to the parent’s intrinsic height. Visually, the actions belong to the card, structurally, the layout ignores them.

To compensate, we reserved space manually:

```css
.card__body {
  padding-block-end: 14px;
}
```

This padding is really just an estimate. The moment the font size increases, buttons wrap, or translations make the text longer, the estimate stops being reliable.

Instead of trying to predict how much space the actions might need, we can let the browser calculate it.

Here is the same layout without absolute positioning:

<CodePen
  user="anon"
  slug-hash="zxBVqMg"
  title="Remove Action Position Absolute"
  :default-tab="['css','result']"
  :theme="dark"/>

The change is small, but the shift in behavior is quite noticeable. Even with the fixed height still in place, the internal tension shrinks because the layout is no longer working against itself.

This is the first structural improvement. The card still has an extrinsic height constraint, so the layout isn’t fully flexible yet.

![Removing absolute positioning reduces internal layout tension, even before removing the fixed height.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771429260865_image.png?resize=1126%2C501)

### There is an Illusion of Control

If fixed heights act like ceilings, line clamping acts more like a mute button. In the original component, I clamped the title and the excerpt:

```css
.card__title {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card__excerpt {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
```

Clamping feels reassuring to me at that time because it limits drift and keeps cards visually aligned. But in practice, that flips the relationship.

To really see this more clearly, let’s remove clamping while keeping everything else the same. This version is identical to the previous demo except that I have removed all clamping from `.card__title` and `.card__excerpt` but left the overflow so that we can clearly see what happens.

![Removing clamping exposes how much content the layout was suppressing.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7CA1115BFA9387F857EF921E56E77A943A603D3C3D838C516571362CA9D1CAF2_1773164139142_image-1.png?resize=1149%2C607)

Without clamping, the tension inside the component becomes obvious. You see how German card grows taller, and the excerpt wraps naturally. What this really shows us is that a stable layout shouldn’t rely on `overflow: hidden`. If a layout only works because content is being suppressed, it’s probably fragile.

Up to this point, almost every failure we’ve seen traces back to a single decision:

```css
.card {
  height: 375px;
}
```

This one line may look innocent to you, but it overrides the browser’s default sizing behavior.

At some point, the simplest question becomes unavoidable: So what happens if we just… stop? Remove the height entirely and let the browser do its thing?

Let’s remove the fixed height while keeping the rest of the layout intact. Clamping can stay in place since we want to compare behaviors.

<CodePen
  user="anon"
  slug-hash="JoKQKpN"
  title="Remove Fixed Height"
  :default-tab="['css','result']"
  :theme="dark"/>

Once I restored intrinsic sizing inside the card, the alignment problem really became a grid issue, which brings us to our next refinement.

### Let the Grid Handle Equal Heights

Fixed heights felt appealing. But having equal heights doesn’t actually mean fixing the heights manually. The grid can handle that alignment for us without me imposing hard boundaries on each component.

Sometimes, the fix is surprisingly small. Removing `align-items: start` lets the grid items stretch naturally, and switching to a more flexible column definition helps the layout adapt better across different screen sizes.

```css
.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

See how the same layout uses intrinsic card heights and flexible grid tracks:

![Grid normalizes alignment without imposing arbitrary height constraints.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_9FDC20B5C845F6A072AD09BF1338C3363C6F91D4ADB2AA0EA629B08B8CDCC440_1771432329324_image.png?resize=1150%2C493)

To make the button nicely align like we had initially, instead of positioning and reserving space manually:

```css
.card {
  padding: 14px;
  position: relative;
}
```

We turn the card into a vertical layout:

```css
.card {
  display: flex;
  flex-direction: column;
  padding: 14px;
}
```

We’re not going to go deep on flexbox here, as [**Kevin Powell has a great article on exactly that**](/css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think.md). But it’s worth knowing what’s happening. Turning the card into a flex container with `flex-direction: column` lines everything up vertically from top to bottom.

The next step is removing the artificial space that was holding room for the actions:

```css
.card__body {
  padding-block-end: 56px;
  padding-block-start: 10px;
}
```

That padding was a guess; it only worked as long as the content stayed predictable. Instead, we let the body expand naturally:

```css
.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-block-start: 10px;
}
```

The `flex: 1` tells the body to take up whatever space is left after the image, and the actions have taken what they need.

If the tags need a bit of breathing room, a simple margin does the job:

```css
.card__tags {
  margin-block-end: 10px;
}
```

We get a card that looks just as aligned as in our original page, but now the alignment comes from layout flow, not from forcing the height.

![A three-column layout of cards that contain an image, heading, blurb, tags, and button.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_515F46CFDB4EE19FEB6AF9062D43AFC70FA23A7AB0325DB26247B7D2B9D34667_1773489039837_image.png?resize=1126%2C553&ssl=1)

### ` for Fluid Typography

Fluid typography with `clamp()` can make titles scale more smoothly across viewport sizes:

```css
.card__title {
  font-size: clamp(1rem, 2vw, 1.25rem);
}
```

If you want to know more about `clamp()`, [**Pedro Rodriguez’s article on scaling font size**](/css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md) with CSS `clamp()` is a good read.

Declaring `clamp(1rem, 2vw, 1.25rem)` allows the title to scale with the viewport while staying within a safe range. The font size can grow or shrink with the viewport (`2vw`) but will never go smaller than `1rem` or larger than `1.25rem`.

---

## Designing for Failure

None of the problems I mentioned earlier in this layout appeared while I was building it. The problems appeared only when some conditions changed. Sometimes an image didn’t load, which changed the vertical balance of the card. And as the viewport narrowed, the text had to wrap more aggressively.

If you want to know whether a component will hold up with real content, try putting it under extreme conditions. A few simple tweaks are enough to reveal where the layout starts to break or fall apart:

- Increase the browser’s default font size to see how it behaves.
- Enable text-only zoom instead of page zoom to observe the difference.
- Replace a title with a single unbroken string or simulate other languages with longer words.
- Simulate a missing image.
- Shrink the viewport until the text starts wrapping aggressively.

Rather than explaining things abstractly, we can introduce them directly into the intrinsic-height version of the card.

---

## Stress Test Mode

From the intrinsic-height version, we can add a simple toggle that simulates a few content stress cases.

Add this button inside the `.demo-toolbar`:

```html
<button type="button" id="toggleStress">
  Toggle stress test
</button>
```

Add the following script, too:

```js
const stressBtn = document.querySelector("#toggleStress");

stressBtn.addEventListener("click", () => {
  document.body.classList.toggle("stress");
});
```

This script simply listens for clicks on the button and adds or removes a stress class on the `<body>`. That class acts as a switch that turns the stress-test styles on and off.

And add these styles:

```css
body.stress .card:nth-child(1) .card__title::after {
  content: "ExtremelyLongUnbrokenStringWithoutAnySpacesToTestOverflowBehavior";
}

body.stress .card:nth-child(2) .card__excerpt {
  font-size: 1.1rem;
}

body.stress .card__media img {
  display: none;
}
```

These styles simulate a few common layout stress cases. The first card gets an unbroken string to test overflow behavior. The second increases text size to mimic larger default font settings. The rule on `.card__media img` hides media entirely to simulate a missing or failed image load.

<CodePen
  user="anon"
  slug-hash="zxKYPrM"
  title="Stress test"
  :default-tab="['css','result']"
  :theme="dark"/>

This stability isn’t coming from the defensive rules I added at the end. It comes from the earlier structural decisions. Once fixed heights and out-of-flow positioning were removed, the component could adapt naturally to whatever content it receives.

Once you start relying on intrinsic sizing, you stop worrying about every possible string length or font setting. If the content gets longer or the text size changes, the browser can handle it. Most layout problems start when we take that flexibility away.

---

## So, What Grows and What Doesn’t?

The original card failed for a simple reason: **it depended on assumptions that were never stated.** The title was supposed to fit in two lines, the excerpt was supposed to fit in four and buttons were supposed to stay on one line. Translations were supposed to stay “about the same length” and users were supposed to keep default text settings. None of that was enforced. They were simply guesses.

Those assumptions quietly made their way into my CSS. As long as the content stayed within those boundaries, everything kind of looked stable. But the moment it drifted, the layout started responding badly to the conflict.

When I rebuilt this component, the first thing I did was remove those hidden dependencies. There’s no fixed pixel ceiling anymore, no padding buffer that needs me to constantly tweak, and no truncation acting as a safety net to keep the layout from breaking.

[**Truncation can still be a deliberate design choice.**](/css-tricks.com/almanac-properties/text-overflow.md) But you shouldn’t truncate just to keep the layout from collapsing. When that happens, the component is already under strain.

The final demo shows that idea in practice. It loads stressed content by default, with longer translated text, wrapped tags, and a missing image, so that you can see how the component behaves under real conditions rather than ideal ones.

<CodePen
  user="anon"
  slug-hash="wBzvPbm"
  title="Making Component Constraints Explicit"
  :default-tab="['css','result']"
  :theme="dark"/>

Each card grows as needed, and the grid keeps alignment without hiding overflow or relying on defensive spacing.

---

## I Think Fixed Heights Are Still Useful

Working through this layout changed how I think about fixed heights. I still use them when they make sense, and I still clamp text when truncation is intentional. But whenever I find myself trying to control how content flows inside a component, it’s usually a sign that the layout needs to be reconsidered. Most of the time, letting the browser handle the sizing leads to a more resilient result.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fixed-Height Cards: More Fragile Than They Look",
  "desc": "Getting a multi-column of cards to line up equally is is a headache we've all faced, and it gets even harder when working with fixed heights.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/fixed-height-cards-more-fragile-than-they-look.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
