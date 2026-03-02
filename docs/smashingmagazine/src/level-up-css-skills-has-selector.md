---
lang: en-US
title: "Level Up Your CSS Skills With The :has() Selector"
description: "Article(s) > Level Up Your CSS Skills With The :has() Selector"
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
      content: "Article(s) > Level Up Your CSS Skills With The :has() Selector"
    - property: og:description
      content: "Level Up Your CSS Skills With The :has() Selector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/level-up-css-skills-has-selector.html
prev: /programming/css/articles/README.md
date: 2023-01-23
isOriginal: false
author:
  - name: Stephanie Eckles
    url: https://smashingmagazine.com/author/stephanie-eckles/
cover: https://files.smashing.media/articles/has-selector-level-up-css-skills/has-selector-level-up-css-skills.jpg
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
  name="Level Up Your CSS Skills With The :has() Selector"
  desc="The CSS relational selector :has() offers what was previously impossible without JavaScript. Let’s explore some magical powers that :has brings."
  url="https://smashingmagazine.com/2023/01/level-up-css-skills-has-selector/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/has-selector-level-up-css-skills/has-selector-level-up-css-skills.jpg"/>

The CSS relational selector `:has()` what was previously impossible without JavaScript. We’ll review how to combine `:has()` with other CSS selectors and the magical powers that `:has` brings.

Using `:has()` gives us the ability to “look ahead” with CSS and style a parent or ancestor element. Then, we can broaden the selector to target one or more siblings or children. By considering element states or positions, we can style nearly any combination of elements as unique singles or ranges.

::: note

At present, support for `:has()` is rising, with it being available as of Safari 15.4 and Chrome/Edge 105. It is also behind a flag in Firefox [<VPIcon icon="fa-brands fa-firefox"/>as of version 103](https://bugzilla.mozilla.org/show_bug.cgi?id=1771896). Until full support is available, check out this [**tip for supporting `:has` today**](https://bram.us/2023/01/04/css-has-feature-detection-with-supportsselector-you-want-has-not-has/) from Bramus Van Damme.
<!-- TODO: /bram.us/css-has-feature-detection-with-supportsselector-you-want-has-not-has.md -->
:::

---

## How `:has()` Works With Combinators And Pseudo-Classes

To best understand how the advanced selectors we’ll be creating work, we’ll quickly review the most relevant combinators and pseudo-classes.

A “combinator” is a special character that denotes the type of relationship between selector parts. Here are the core combinators to know:

- space character: the **descendent combinator** matches a direct or nested child;
- `>`: the **direct child combinator** matches only top-level, un-nested children;
- `+`: the **adjacent sibling combinator** matches only the very next sibling;
- `~`: the **general sibling combinator** matches one or more siblings following the base selector.

The first stage of creating complex selectors is to append a pseudo-class to one or more parts. A “pseudo-class” defines a special state of an element, like `:hover`, and has the format of a single colon followed by the name. The `:has()` pseudo-class is considered functional since it accepts a parameter. Specifically, it accepts a list of selectors, whether they be simple like `img` or complex with combinators like `img + p`.

However, `:has()` is one of four functional pseudo-classes, with the others being `:is()`, `:where()`, and `:not()`. Each of them accepts a selector list with a few other unique features.

If you’ve already used `:is()` and `:where()`, it’s likely been to manage specificity. Using `:is()` means the selector in the list with the highest specificity gives the entire selector its weight. While using `:where()` lends the entire selector list zero-specificity, making it easily overruled by later rules in the cascade.

Additionally, `:is()` and `:where()` have the extra special ability to be forgiving selectors. This means you may include (purposely or not) selectors the browser doesn’t understand, and it will still process the parts it does understand. Without this forgiving behavior, the browser would discard the entire rule.

The other benefit of both `:is()` and `:where()` is to create succinct, complex selectors. This is especially handy when using combinators and affecting multiple siblings or descendants, for example, `article :is(h1, h2, h3)`.

Our last pseudo-class, `:not()`, has been available in CSS for the longest. However, alongside Selectors Level 4 when `:is()` and `:where()` were released, `:not()` [<VPIcon icon="iconfont icon-w3c"/>was enhanced](https://w3.org/TR/selectors-4/#negation). This happened when it was allowed to accept a list of selectors instead of a single selector. It also has the same specificity behavior noted for `:is()`.

Finally, we need to know about an underused, incredibly powerful feature of `:is()`, `:where()`, and `:not()` that we’ll be using to make our advanced `:has()` selectors. Using the `*` character within these selectors — which *normally* in CSS is the “universal selector” — actually refers to the selector target. This allows checking the preceding siblings or ancestors of the selector target. So, in `img:not(h1 + *)`, we’re selecting images that *do not* directly follow an `h1`. And in `p:is(h2 + *)`, we’re selecting paragraphs *only if* they directly follow `h2`. We’ll be using this behavior for our first demo next.

---

## Polyfill For `:only-of-selector`

While `:only-of-type` is [<VPIcon icon="fa-brands fa-firefox"/>a valid pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:only-of-type), it only works to select within elements of the same element type. Given `.highlight:only-of-type`, no matches would be made in the following HTML because the class has no effect on reducing the scope.

```html
<p>Not highlighted</p>
<p class="highlight">.highlight</p>
<p>Not highlighted</p>
```

If there was only one paragraph with the `highlight` class within a parent, it might falsely appear to be working. But in that case, it’s because the root element type the class is attached to is a paragraph, so it matches as true since there are no sibling paragraphs.

By combining `:has()` and `:not()`, we can effectively create an `:only-of-selector` that will match a singleton within a range of siblings based on a class or other valid selector.

We ultimately want our selector to match when there are no matching siblings that exist *before* or *after* the target.

A strength of `:has()` is testing for what follows an element. Since we want to test any number of siblings that follow, we’ll use the general sibling combinator `~` to create the first condition.

```css
.highlight:not(:has(~ .highlight)
```

So far, this gives us the match of “highlights that *do not have* sibling highlights following it.”

Now we need to check prior siblings, and we’ll use the ability of `:not()` on its own to add that condition.

```css
.highlight:not(:has(~ .highlight)):not(.highlight ~  *)
```

The second `:not()` condition is an `AND` clause to our selector that says “AND not itself a sibling of a previous highlight.”

With that, we have polyfilled the non-existent `:only-of-selector` pseudo-class!

<CodePen
  user="smashingmag"
  slug-hash="qByprrp"
  title=":only-of-selector using :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Previous Sibling Selector

We discussed checking against previous siblings with `:not()`, `:is()`, and `:where()`. With `:has()`, we can actually select and style previous siblings based on conditions of what comes after them!

To demonstrate this, we’ll create a list of elements. The behavior we’d like is that when a list item is hovered, it scales up larger, and the elements before and after it also scale up slightly. The remaining non-hovered list items should scale down. All but the hovered list item should also have their opacity lowered. The following video previews the effect.

<VidStack src="vimeo/791142059" />

The desire for the first selector is to match the list item before the one being hovered, which `:has()` makes possible. The following reads, “select the list item whose adjacent sibling is being hovered.”

```css
li:has(+ li:hover)
```

We’ll pair that with a basic adjacent sibling selector to also get the list item after the hovered one and then apply our styles:

```css
/* Select list item before the hovered one */
li:has(+ li:hover),
/* Select list item after the hovered one */
li:hover + li {
  /* ...modify scale and opacity */
}
```

The third complex selector we’ll create uses our power combo of `:has()` and `:not()` but in a new way. We first qualify the selector only to apply when a direct child of the `ul` (which will be a list item) is being hovered. And if that’s true, we select list items based on excluding the one being hovered and the items before and after the hovered one.

```css
/* When a list item is being hovered,
select list items not hovered, or before/after hover */
ul:has(> :hover) li:not(:hover, :has(+ :hover), li:hover + *) {
  /* ...modify scale and opacity */
}
```

<CodePen
  user="smashingmag"
  slug-hash="rNrpymj"
  title="Previous/Next Sibling Animation with :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Not only does this demonstrate selecting a preceding sibling with `:has()` but also using it to select based on state. The final demonstration will create a more complex example using states with `:has()`.

Other folks have coincidentally explored similar examples of preceding sibling selection and application, including [Chris Coyier (<VPIcon icon="fa-brands fa-codepen" />`chriscoyier`)](https://codepen.io/chriscoyier/pen/qBoogaX), [pourya (<VPIcon icon="fa-brands fa-codepen" />`pouriversal`)](https://codepen.io/pouriversal/pen/yLvdwQW), and [<VPIcon icon="fas fa-globe"/>Jim Nielsen](https://blog.jim-nielsen.com/2022/previous-sibling-selector/).

---

## Selecting Within A Range

Let’s consider a range of sibling elements, such as between `h2` or between `hr`.

```html
<article>
  <h2>Lorem, ipsum.</h2>
  <!-- h2 range starts -->
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  <p>Nobis iusto voluptates reiciendis molestias, illo inventore ipsum?</p>
  <!-- h2 range ends -->
  <h2>Lorem, ipsum dolor.</h2>
  <p>Lorem ipsum dolor sit amet.</p>
  <hr>
  <!-- hr range starts -->
  <p>Lorem ipsum dolor sit.</p>
  <p>Dolor animi nisi ut?</p>
  <p>Sunt consectetur esse quia.</p>
  <!-- hr range ends -->
  <hr>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</article>
```

Using `:has()` we can style:

- The first element in the range,
- The last element in the range,
- All siblings within the range.

These selectors will heavily rely on the general sibling combinator `~`, which allows us to both “look ahead” and style multiple siblings at once.

### Select First Element In Range

The following reads, “select the adjacent sibling of the `h2` as long as there is another `h2` as a later sibling,” which matches the paragraph directly following the first `h2` in our example HTML.

```css
article h2 + :has(~ h2)
```

### Select The Last Element In The Range

The following reads, “select an element that follows an `h2` as long as its next sibling is an `h2`,” which matches the paragraph directly before the second `h2` in our example HTML.

```css
article h2 ~ :has(+ h2)
```

### Select All Siblings Within A Range

This next selector is limited in that it only works for a single range within a parent. This is because when using the general sibling combinator without a hard stop, those siblings can be anywhere following the element. So that includes “leap-frogging” other elements that may be between, which results in an extended range for this selector.

Regardless, this can be useful if you are certain to only have one range of possibilities within a given parent. This selector reads, “select all sibling elements following an `hr` that themselves have a later sibling of an `hr`,” which matches all three paragraphs between the `hr` elements in our example HTML.

```css
article hr ~ :has(~ hr)
```

We’ll shortly look at mitigating the issue of needing a hard stop to our range and allowing multi-range groups within a single parent.

<CodePen
  user="smashingmag"
  slug-hash="KKBZWqd"
  title="Select within an element range with :has() (limited) [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Selecting A Single Full Range

In this next series of selectors, we’ll assume that we have one extra bit of identification to use for establishing the start and end of our range. For the sake of demonstration, we have a list where two list items have the `data-range` attribute. This technique would work for visualizing multi-select functionality for a custom control to show the range of elements within the selection.

```html
<ul>
  <li>Lorem</li>
  <li data-range>Veritatis</li>
  <li>Eos</li>
  <li>Debitis</li>
  <li>Autem</li>
  <li data-range>Atque</li>
  <li>Eius</li>
  <li>Lorem</li>
  <li>Nostrum</li>
</ul>
```

Although we’ve used a data attribute to signify the start and end, we’re assuming no attribute value has been provided. Keep this in mind when reviewing the construction of particularly the starting and ending element selectors.

To select both the start and end of the range at once, we can simply use the attribute selector `[data-range]`.

Then, we can reuse the selector we just created in the previous section to select all siblings within the range.

```css
[data-range] ~ :has(~ [data-range])
```

To style the starting range element, the following reads: “select the `[data-range]` item that has a `[data-range]` sibling somewhere after it”:

```css
[data-range]:has(~ [data-range])
```

And finally, for selecting the ending element of the range, this reads: “select a `[data-range]` item that follows somewhere after a previous `[data-range]` item.”

```css
[data-range] ~ [data-range]
```

In this CodePen demo, we’ve also reused our previously created selectors to identify the first and last element within the range.

<CodePen
  user="smashingmag"
  slug-hash="RwBxpgq"
  title="Single range element selectors with :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Selecting Multi-range Groups

Now, we’ll advance our previous demo and solve the problem of selecting multiple ranges.

Earlier, our issue was that an `h2` or an `hr` in a series greater than two was not able to be multi-range because there was no way to determine the boundary for areas outside of the intended range.

> The key to making multi-range groups possible within a single parent is the availability of distinguishable start and end indicators.

We’ll again use data attributes on our list items, but this time give them the actual values of “start” and “end.”

```html
<ul>
  <li>Lorem</li>
  <li data-range="start">Veritatis</li>
  <li>Eos</li>
  <li>Debitis</li>
  <li>Autem</li>
  <li data-range="end">Atque</li>
  <li>Eius</li>
  <li>Lorem</li>
  <li>Nostrum</li>
</ul>
```

Since we’ve provided explicit attribute values, our start and end selectors are fairly basic:

```css
/* Start and end elements of range */
[data-range]

/* Starting element of range */
[data-range="start"]

/* Ending element of range */
[data-range="end"]
```

Let’s also go ahead and mark the first and last items within the range. The first update here from previous versions is to include the start/end data attribute values. Secondly, we’ve added the condition that the style not be applied to our start/end indicators with the exclusion condition `:not([data-range])`.

```css
/* First element inside of range */
[data-range="start"] + :has(~ [data-range="end"]):not([data-range])

/* Last element inside of range */
[data-range="start"] ~ :has(+ [data-range="end"]):not([data-range])
```

Finally, we need the selector to match items within our range. At first, it starts off similar to what we created previously for the “within range” selectors. Again, we add the condition that it does not match an element that is itself a `[data-range]`.

```css
[data-range="start"] ~ :has(~ [data-range="end"]):not([data-range])
```

But if you recall, I mentioned that the general sibling selector has a leap-frog ability, so at present, that selector will style items outside the boundary of our intended range. The image shows how the rule works without further restrictions on how it will be applied.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/has-selector-level-up-css-skills/out-of-range-styles.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/has-selector-level-up-css-skills/out-of-range-styles.png)

To resolve this, we need to add a complex `AND` condition using `:not()` to exclude items that are *not* between `[data-range="end"]` and `[data-range="start"]`, in that order.

On its own, this part of the selector reads as: “*do not select* items that follow `[data-range="end"]` which also have a later sibling of `[data-range="start"]`.”

```css
/* Note: this needs appended on the previous selector, not used alone */
:not([data-range="end"] ~ :has(~ [data-range="start"]))
```

In total, this makes for an admittedly long but very powerful selector that wasn’t possible before `:has()` without also using JavaScript due to the previous lack of the “look ahead” and “look behind” abilities in CSS.

```css
/* Select all between a range */
[data-range="start"] ~ :has(~ [data-range="end"]):not([data-range]):not([data-range="end"] ~ :has(~ [data-range="start"]))
```

::: note

Keep in mind that just like other selectors, you can use `:has()` when you construct a selector within JavaScript. The ability to select previous siblings, ancestors and the other features we’ve learned will also make your JS selectors more efficiently powerful!

:::

<CodePen
  user="smashingmag"
  slug-hash="VwBypzB"
  title="Multi-range element selectors with :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Linear Range Selection Based On State

Let’s pull together some of the qualities of `:has()` selectors and combinators we’ve learned to make a star rating component.

The underlying “star” will be a radio input, which will give us access to a `:checked` state to assist in developing the selectors.

```html
<div class="star-rating">
  <fieldset>
    <legend>Rate this demo</legend>
    <div class="stars">
      <label class="star">
        <input type="radio" name="rating" value="1">
        <span>1</span>
      </label>
      <!-- ...4 more stars -->
    </div>
  </fieldset>
</div>
```

As shown in the following video preview, when a user hovers over the outlined stars, then the range from the start (left-most) to the hovered star should fill in with color. On selection, when the star radio is checked, the star and labeling number scale up in size and keep the fill color. If the user hovers over stars after the checked star, the range should fill in the stars up to the hover. If the user hovers stars before the checked star, the range should fill in only up to the hovered star, and stars between the hover and previously checked star should have the fill color lightened.

<VidStack src="vimeo/791142751" />

That’s a lot of ranges to keep track of, but with `:has()`, we can break them into segmented selectors real quick!

The following selector series applies to all states where we want a star or range of stars to fill in for or up to the `:checked` star. The rule updates a set of custom properties that will affect the star shape, created through a combo of the `::before` and `::after` pseudo-elements on the `label.star`.

Altogether, this rule selects the range of stars between the first star and the star being hovered, *or* the first star and the star with a checked radio.

```css
.star:hover,
/* Previous siblings of hovered star */
.star:has(~ .star:hover),
/* Star has a checked radio */
.star:has(:checked),
/* Previous siblings of a checked star */
.star:has(~ .star :checked) {
  --star-rating-bg: dodgerblue;
}
```

Next, we want to lighten the fill color of stars in the range between the star being hovered and a later checked star, *and* checked stars that follow the hovered star.

```css
/* Siblings between a hovered star and a checked star */
.star:hover ~ .star:has(~ .star :checked),
/* Checked star following a hovered star */
.star:hover ~ .star:has(:checked) {
  --star-rating-bg: lightblue;
}
```

As far as state selectors go for our star rating component, that’s all there is to it!

The CodePen demo has a few extra tricks on how the component is created using CSS grid, custom properties, and `clip-path`. For accessibility, it also ensures color isn’t the only indicator by scaling up the checked star. And it handles for [high contrast themes](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/) (aka “forced colors”) by supplying values from the system colors palette to ensure the `:checked` star fill is visible. Additionally, the transitions are shortened when a user prefers reduced motion.

<CodePen
  user="smashingmag"
  slug-hash="ExpoWwv"
  title="Star Rating Component with :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Stateful Multi-Range Selection Groups

Whereas the star rating component showed a dynamic style change based on state, the availability of stateful elements also makes it easier to use `:has()` for creating visual boundaries.

Our earlier multi-range selectors relied on manually adding “hooks” into the markup to correctly style ranges without leaking into the in-between areas. But if we have a field set containing checkboxes, we can once again use the `:checked` state to clearly identify boundaries around checked and unchecked items.

In this preview video, as checkboxes are selected, they receive a border and green background to create the visual boundary. Thanks to `:has()`, that boundary grows to appear to wrap groups of checked items so that the visual box seems as though it’s around the whole group. The first item (or a singleton) gets round top corners, and the last item (or a singleton) gets round bottom corners as well as a slight shadow.

<VidStack src="vimeo/791143211" />

We need to create rules to handle the top, middle, and bottom appearance based on where the item falls within the set. Single items should receive all three styles.

Our HTML is set up to wrap each checkbox input with its label, so all of our selectors will begin by matching against `label:has(:checked)` to see if the label *contains* a checked input.

To determine either the first or single item in the set, we need to add the condition that it is *not* following a previous item with a checked input. This rule will style the top appearance.

```css
/* First checked item in a range
 OR top of a single checked item */
label:has(:checked):not(label:has(:checked) + label)
```

To determine either the last or single item in the set, we flip the previous condition to check that it is *not* followed by a checked input. This rule will style the bottom appearance.

```css
/* Last checked item in a range
 OR bottom of a single checked item */
label:has(:checked):not(label:has(+ label :checked))
```

For the middle appearance, we’ll create a rule that actually captures the group from start to finish since all of the items in the rule should receive a background color and side borders.

We *could* simply use `label:has(:checked)` for this selector given the context. However, we’re learning how to select and style ranges, so to complete our exercise, we’ll write the expanded selectors.

The logic represented in the first selector is “select labels with checked inputs that are followed by sibling labels containing checked inputs,” which captures all but the last item in the range. For that, we repeat the selector we just created for styling the last checked item in the range.

```css
/* Range of checked items */
label:has(:checked):has(~ label :checked),
label:has(:checked):not(label:has(+ label :checked))
```

This CodePen demo also shows off `accent-color` for changing the checked input color and uses custom properties for managing the border radius. It also uses logical properties.

<CodePen
  user="smashingmag"
  slug-hash="RwBxpjE"
  title="Stateful multi-range selection groups with :has() [forked] "
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info More Resources On Writing `:has()` Selectors

You can [<VPIcon icon="fa-brands fa-codepen"/>explore all of the demonstrations](https://codepen.io/collection/wapNEJ/327b65e9704d65901e397025ea2d51ba) we reviewed in my CodePen collection.

Other folks have started experimenting with what’s possible using `:has()`, and I encourage you to check out these resources for even more ideas. As with all recently released features, the field of opportunity is wide-open, and we all benefit when we share our learnings!

- Bramus Van Damme has a few explorations of complex selectors using `:has()`:
  - [Quantity Queries for “islands of elements” with the same class, thanks to CSS `:has()`](https://bram.us/2022/12/13/quantity-queries-for-islands-of-elements-with-the-same-class-thanks-to-css-has/)
  - [A `:nth-child(An+B [of S]?)` polyfill thanks to CSS `:has()` and `:not()`](https://bram.us/2022/12/14/a-nth-childanb-of-s-polyfill-thanks-to-css-has/)
  - [Style a parent element based on its number of children using CSS `:has()`](https://bram.us/2022/11/17/style-a-parent-element-based-on-its-number-of-children-using-css-has/)
- Jhey Tompkins reviews both practical and fun use cases in “[<VPIcon icon="fa-brands fa-chrome"/>`:has()`: The Family Selector](https://developer.chrome.com/blog/has-m105/)”
- Jen Simmons looks at the relationship of `:has()` to combinators and showcases more demos in “[<VPIcon icon="fa-brands fa-safari"/>Using `:has()` As A CSS Parent Selector And Much More](https://webkit.org/blog/13096/css-has-pseudo-class/)”
- Adrian Bece considers even more possibilities in “[**Meet `:has`, A Native CSS Parent Selector (And More)**](/smashingmagazine.com/has-native-css-parent-selector.md)”
- Estelle Weyl demystifies more about this selector’s behavior in “[<VPIcon icon="fas fa-globe"/>CSS `:has()`](https://12daysofweb.dev/2022/css-has-selector/)”
- Manuel Matuzović clarifies the important difference between “[<VPIcon icon="fas fa-globe"/>`:has(:not())` vs. `:not(:has())`](https://matuzo.at/blog/2022/100daysof-day50/)”

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Level Up Your CSS Skills With The :has() Selector",
  "desc": "The CSS relational selector :has() offers what was previously impossible without JavaScript. Let’s explore some magical powers that :has brings.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/level-up-css-skills-has-selector.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
