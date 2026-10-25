---
lang: en-US
title: "Flexbox Is As Easy As Pie: Designing CSS Layouts"
description: "Article(s) > Flexbox Is As Easy As Pie: Designing CSS Layouts"
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
      content: "Article(s) > Flexbox Is As Easy As Pie: Designing CSS Layouts"
    - property: og:description
      content: "Flexbox Is As Easy As Pie: Designing CSS Layouts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/centering-elements-with-flexbox.html
prev: /programming/css/articles/README.md
date: 2013-05-22
isOriginal: false
author:
  - name: David Storey
    url: https://smashingmagazine.com/author/david-storey/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/51226ad3-6cf5-4908-bb79-6fdaf4e1f539/centering-elements-with-flexbox.jpg
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
  name="Flexbox Is As Easy As Pie: Designing CSS Layouts"
  desc="Flexible box layout is a new box model optimized for UI layout, and it makes a lot of tasks much easier, or even possible at all. Flexbox’s repertoire includes the simple centering of elements, the expansion and contraction of elements to fill available space, and source-code independent layout, among others abilities."
  url="https://smashingmagazine.com/2013/05/centering-elements-with-flexbox/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/51226ad3-6cf5-4908-bb79-6fdaf4e1f539/centering-elements-with-flexbox.jpg"/>

Flexible box layout is a new box model optimized for UI layout, and it makes a lot of tasks much easier, or even possible at all. Flexbox’s repertoire includes the simple centering of elements, the expansion and contraction of elements to fill available space, and source-code independent layout, among others abilities.

Flexbox (or flexible box layout) is a new box model optimized for UI layout. As one of the first CSS modules designed for actual layout (floats were really meant mostly for things such as wrapping text around images), it **makes a lot of tasks much easier**, or even possible at all. Flexbox’s repertoire includes the simple centering of elements (both horizontally and vertically), the expansion and contraction of elements to fill available space, and source-code independent layout, among others abilities.

![Flexbox Is As Easy As Pie - Designing CSS Layouts](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2a39c92e-41ac-44dc-ada0-2cd520954beb/figure1.1_mini)

Flexbox has lived a storied existence. It started as a feature of Mozilla’s XUL, where it was used to lay out application UI, such as the toolbars in Firefox, and it has since been rewritten multiple times. The specification has only recently reached stability, and we have fairly complete support across the latest versions of the leading browsers.

There are, however, some caveats. The specification changed between the implementation in Internet Explorer (IE) and the release of IE 10, so you will need to use a slightly different syntax. Chrome currently still requires the `-webkit-` prefix, and Firefox and Safari are still on the much older syntax. Firefox has updated to the latest specification, but that implementation is currently behind a runtime flag until it is considered stable and bug-free enough to be turned on by default. Until then, Firefox still requires the old syntax.

When you specify that an element will use the flexbox model, its children are laid out along either the horizontal or vertical axis, depending on the direction specified. The widths of these children expand or contract to fill the available space, based on the flexible length they are assigned.

---

## Example: Horizontal And Vertical Centering (Or The Holy Grail Of Web Design)

Being able to center an element on the page is perhaps the number one wish among Web designers — yes, probably even higher than gaining the highly prized parent selector or putting IE 6 out of its misery (OK, maybe a close second then). With flexbox, this is trivially easy. Let’s start with a basic HTML template, with a [heading that we want to center](https://jsfiddle.net/pnNqd/).

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>Centering an Element on the Page</title>
</head>
<body>
  <h1>OMG, I’m centered</h1>
</body>
</html>
```

Nothing special here, not even a wrapper `div`. **The magic all happens in the CSS:**

```css
html {
  height: 100%;
}

body {
  display: -webkit-box;   /* OLD: Safari,  iOS, Android browser, older WebKit browsers.  */
  display: -moz-box;      /* OLD: Firefox (buggy) */
  display: -ms-flexbox;   /* MID: IE 10 */
  display: -webkit-flex;  /* NEW, Chrome 21–28, Safari 6.1+ */
  display: flex;          /* NEW: IE11, Chrome 29+, Opera 12.1+, Firefox 22+ */

  -webkit-box-align: center; -moz-box-align: center; /* OLD… */
  -ms-flex-align: center; /* You know the drill now… */
  -webkit-align-items: center;
  align-items: center;

  -webkit-box-pack: center; -moz-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;

  margin: 0;
  height: 100%;
  width: 100% /* needed for Firefox */
}

h1 {
  display: -webkit-box; display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center; -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  height: 10rem;
}
```

I’ve included all of the **different prefixed versions in the CSS above**, from the very oldest, which is still needed, to the modern and hopefully final syntax. This might look confusing, but the different syntaxes map fairly well to each other, and I’ve included tables at the end of this article to show the exact mappings.

This is not exactly all of the CSS needed for our example, because I’ve stripped out the extra styling that you probably already know how to use in order to save space.

Let’s look at the CSS that is needed to center the heading on the page. First, we set the `html` and `body` elements to have 100% `height` and remove any margins. This will make the container of our `h1` take up the full height of the browser’s window. Firefox also needs a `width` specified on the body to force it to behave. Now, we just need to center everything.

### Enabling Flexbox

Because the `body` element contains the heading that we want to center, we will set its `display` value to `flex`:

```css
body {
  display: flex;
}
```

This switches the `body` element to use the flexbox layout, rather than the regular block layout. All of its children in the flow of the document (i.e. not absolutely positioned elements) will now become flex items.

The syntax used by IE 10 is `display: -ms-flexbox`, while older Firefox and WebKit browsers use `display: -prefix-box` (where prefix is either `moz` or `webkit`). You can see the tables at the end of this article to see the mappings of the various versions.

What do we gain now that our elements have been to yoga class and become all flexible? They gain untold powers: they can flex their size and position relative to the available space; they can be laid out either horizontally or vertically; and they can even achieve source-order independence. (Two holy grails in one specification? We’re doing well.)

### Centering Horizontally

Next, we want to horizontally center our `h1` element. No big deal, you might say; but it is somewhat easier than playing around with `auto` margins. **We just need to tell the flexbox to center its flex items.** By default, flex items are laid out horizontally, so setting the `justify-content` property will align the items along the main axis:

```css
body {
  display: flex;
  justify-content: center;
}
```

For IE 10, the property is called `flex-pack`, while for older browsers it is `box-pack` (again, with the appropriate prefixes). The other possible values are `flex-start`, `flex-end`, `space-between` and `space-around`. These are `start`, `end`, `justify` and `distribute`, respectively, in IE 10 and the old specification (`distribute` is, however, not supported in the old specification). The `flex-start` value aligns to the left (or to the right with right-to-left text), `flex-end` aligns to the right, `space-between` evenly distributes the elements along the axis, and `space-around` evenly distributes along the axis, with half-sized spaces at the start and end of the line.

To explicitly set the axis that the element is aligned along, you can do this with the `flex-flow` property. The default is `row`, which will give us the same result that we’ve just achieved. To align along the vertical axis, we can use `flex-flow: column`. If we add this to our example, you will notice that the element is vertically centered but loses the horizontal centering. Reversing the order by appending `-reverse` to the `row` or `column` values is also possible (`flex-flow: row-reverse` or `flex-flow: column-reverse`), but that won’t do much in our example because we have only one item.

There are some differences here in the various versions of the specification, which are highlighted at the end of this article. Another caveat to bear in mind is that `flex-flow` directions are `writing-mode` sensitive. That is, when using `writing-mode: vertical-rl` to switch to vertical text layout (as used traditionally in China, Japan and Korea), `flex-flow: row` will align the items vertically, and `column` will align them horizontally.

### Centering Vertically

Centering vertically is as easy as centering horizontally. We just need to use the appropriate property to align along the “cross-axis.” The what? The cross-axis is basically the axis perpendicular to the main one. So, if flex items are aligned horizontally, then the cross-axis would be vertical, and vice versa. We set this with the `align-items` property (`flex-align` in IE 10, and `box-align` for older browsers):

```css
body {
  /* Remember to use the other versions for IE 10 and older browsers! */
  display: flex;
  justify-content: center;
  align-items: center;
}
```

This is all there is to centering elements with flexbox! We can also use the `flex-start` (start) and `flex-end` (end) values, as well as `baseline` and `stretch`. Let’s have another look at the finished example:

You might notice that the text is also center-aligned vertically inside the `h1` element. This could have been done with margins or a line height, but we used flexbox again to show that it works with anonymous boxes (in this case, the line of text inside the `h1` element). No matter how high the `h1` element gets, the text will always be in the center:

```css
h1 { flex;
   align-items: center;
   height: 10rem;
}
```

---

## Flexible Sizes

If centering elements was all flexbox could do, it’d be pretty darn cool. But there is more. Let’s see how flex items can expand and contract to fit the available space within a flexbox element.

![An interactive slideshow built using flexbox.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f975f27d-b595-4fad-b44b-4eda91491f4a/figure1.2_mini)

The HTML and CSS for this example are similar to the previous one’s. We’re enabling flexbox and centering the elements on the page in the same way. In addition, we want to make the title (inside the `header` element) remain consistent in size, while the five boxes (the `section` elements) adjust in size to fill the width of the window. To do this, we use the new `flex` property:

```css
section {
  /* removed other styles to save space */
  -prefix-box-flex: 1; /* old spec webkit, moz */
  flex: 1;
  height: 250px;
}
```

What we’ve just done here is to make each section element take up 1 flex unit. Because we haven’t set any explicit width, each of the five boxes will be the same width. The `header` element will take up a set width (277 pixels) because it is not flexible. We divide the remaining width inside the `body` element by 5 to calculate the width of each of the section elements. Now, if we resize the browser window, the section elements will grow or shrink.

In this example, we’ve set a consistent height, but this could be set to be flexible, too, in exactly the same way. We probably wouldn’t always want all elements to be the same size, so let’s make one bigger. On hover, we’ve set the element to take up 2 flex units:

```css
section:hover {
  -prefix-box-flex: 2;
  flex: 2;
  cursor: pointer;
}
```

Now the available space is divided by 6 rather than 5, and the hovered element gets twice the base amount. Note that an element with 2 flex units does not necessarily become twice as wide as one with 1 unit. It just gets twice the share of the available space added to its “preferred width.” In our examples, the “preferred width” is 0 (the default).

---

## Source-Order Independence

For our last party trick, we’ll study how to achieve source-order independence in our layouts. When clicking on a box, we will tell that element to move to the left of all the other boxes, directly after the title. All we have to do is set the order with the `order` property. By default, all flex items are in the 0 position. Because they’re in the same position, they follow the source order.

![An interactive slideshow with `flex-order`.](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b24f2dbf-7a2e-4cb5-8b0a-1f9d784dcc54/figure1.3_mini)

To make our chosen element move to the first position, we just have to set a lower number. I chose `-1`. We also need to set the header to `-1` so that the selected section element doesn’t get moved before it:

```css
header {
  -prefix-box-ordinal-group: 1; /* old spec; must be positive */
  -ms-flex-order: -1; /* IE 10 syntax */
  order: -1; /* new syntax */
}

section[aria-pressed="true"] {
/*
  Set order lower than 0 so it moves before other section elements,
  except old spec, where it must be positive.
*/
  -prefix-box-ordinal-group: 1;
  -ms-flex-order: -1;
  order: -1;

  -prefix-box-flex: 3;
  flex: 3;
  max-width: 370px; /* Stops it from getting too wide. */
}
```

In the old specification, the property for setting the order (`box-ordinal-group`) accepts only a positive integer. Therefore, I’ve set the order to `2` for each section element (code not shown) and updated it to `1` for the active element. If you are wondering what `aria-pressed=“true”` means in the example above, it is a WAI-ARIA attribute/value that I add via JavaScript when the user clicks on one of the sections.

This relays accessibility hints to the underlying system and to assistive technology to tell the user that that element is pressed and, thus, active. If you’d like more information on WAI-ARIA, check out “[Introduction to WAI-ARIA](https://dev.opera.com/articles/view/introduction-to-wai-aria/)” by Gez Lemon. Because I’m adding the attribute after the user clicks, this example requires a simple JavaScript file in order to work, but flexbox itself doesn’t require it; it’s just there to handle the user interaction.

Hopefully, this has given you some inspiration and enough introductory knowledge of flexbox to enable you to experiment with your own designs.

---

## Syntax Changes

As you will have noticed throughout this article, the syntax has changed a number of times since it was first implemented. To aid backward- and forward-porting between the different versions, we’ve included tables below, which **map the changes between the specifications**.

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>IE</strong></td><td data-label=""><strong>Opera</strong></td><td data-label=""><strong>Firefox</strong></td><td data-label=""><strong>Chrome</strong></td><td data-label=""><strong>Safari</strong></td></tr><tr><td data-label="">Standard</td><td data-label="">11</td><td data-label="">12.10+ *</td><td data-label="">22</td><td data-label="">29+, 21–28 (<code>-webkit-</code>)</td><td data-label=""></td></tr><tr><td data-label="">Mid</td><td data-label="">10 (<code>-ms-</code>)</td><td data-label=""></td><td data-label=""></td><td data-label=""></td><td data-label=""></td></tr><tr><td data-label="">Old</td><td data-label=""></td><td data-label=""></td><td data-label="">3–21 (<code>-moz-</code>)</td><td data-label="">&lt;21 (<code>-webkit-</code>)</td><td data-label="">3–6 (<code>-webkit-</code>)</td></tr></tbody></table>

*Specification versions*  

When Opera switched to Blink in version 15 it required the `-webkit-` prefix. The prefix was dropped in Opera 16. <table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>Block-level flex</strong></td><td data-label=""><strong>Inline-level flex</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>display</code></td><td data-label=""><code>flex</code></td><td data-label=""><code>inline-flex</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>display</code></td><td data-label=""><code>flexbox</code></td><td data-label=""><code>inline-flexbox</code></td></tr><tr><td data-label="">Old</td><td data-label=""><code>display</code></td><td data-label=""><code>box</code></td><td data-label=""><code>inline-box</code></td></tr></tbody></table>

*Enabling flexbox: setting an element to be a flex container*  

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>start</strong></td><td data-label=""><strong>center</strong></td><td data-label=""><strong>end</strong></td><td data-label=""><strong>justify</strong></td><td data-label=""><strong>distribute</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>justify-content</code></td><td data-label=""><code>flex-start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>flex-end</code></td><td data-label=""><code>space-between</code></td><td data-label=""><code>space-around</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-pack</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>justify</code></td><td data-label=""><code>distribute</code></td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-pack</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>justify</code></td><td data-label="">N/A</td></tr></tbody></table>

*Axis alignment: specifying alignment of items along the main flexbox axis*  

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>start</strong></td><td data-label=""><strong>center</strong></td><td data-label=""><strong>end</strong></td><td data-label=""><strong>baseline</strong></td><td data-label=""><strong>stretch</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>align-items</code></td><td data-label=""><code>flex-start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>flex-end</code></td><td data-label=""><code>baseline</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-align</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>baseline</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-align</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>baseline</code></td><td data-label=""><code>stretch</code></td></tr></tbody></table>

*Cross-axis alignment: specifying alignment of items along the cross-axis*  

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>auto</strong></td><td data-label=""><strong>start</strong></td><td data-label=""><strong>center</strong></td><td data-label=""><strong>end</strong></td><td data-label=""><strong>baseline</strong></td><td data-label=""><strong>stretch</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>align-self</code></td><td data-label=""><code>auto</code></td><td data-label=""><code>flex-start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>flex-end</code></td><td data-label=""><code>baseline</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-item-align</code></td><td data-label=""><code>auto</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>baseline</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Old</td><td colspan="7" data-label="">N/A</td></tr></tbody></table>

*Individual cross-axis alignment: override to align individual items along the cross-axis*  

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>start</strong></td><td data-label=""><strong>center</strong></td><td data-label=""><strong>end</strong></td><td data-label=""><strong>justify</strong></td><td data-label=""><strong>distribute</strong></td><td data-label=""><strong>stretch</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>align-content</code></td><td data-label=""><code>flex-start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>flex-end</code></td><td data-label=""><code>space-between</code></td><td data-label=""><code>space-around</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-line-pack</code></td><td data-label=""><code>start</code></td><td data-label=""><code>center</code></td><td data-label=""><code>end</code></td><td data-label=""><code>justify</code></td><td data-label=""><code>distribute</code></td><td data-label=""><code>stretch</code></td></tr><tr><td data-label="">Old</td><td colspan="7" data-label="">N/A</td></tr></tbody></table>

*Flex line alignment: specifying alignment of flex lines along the cross-axis*  

This takes effect only when there are multiple flex lines, which is the case when flex items are allowed to wrap using the `flex-wrap` property and there isn’t enough space for all flex items to display on one line. This will align each line, rather than each item.

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>Value</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>order</code></td><td data-label="">&lt;number&gt;</td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-order</code></td><td data-label="">`&lt;<var>number</var>&gt;`</td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-ordinal-group</code></td><td data-label="">`&lt;<var>integer</var>&gt;`</td></tr></tbody></table>

*Display order: specifying the order of flex items*  

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>Value</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>flex</code></td><td data-label=""><code>none</code> | [ <code>&lt;&lt;var&gt;flex-grow&lt;/var&gt;&gt;</code> <code>&lt;&lt;var&gt;flex-shrink&lt;var&gt;&gt;&lt;/var&gt;&lt;/var&gt;</code>? || <code>&lt;&lt;var&gt;flex-basis&lt;/var&gt;&gt;</code>]</td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex</code></td><td data-label=""><code>none</code> | [ [ <code>&lt;&lt;var&gt;pos-flex&lt;/var&gt;&gt;</code> <code>&lt;&lt;var&gt;neg-flex&lt;/var&gt;&gt;</code>? ] || <code>&lt;&lt;var&gt;preferred-size&lt;/var&gt;&gt;</code> ]</td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-flex</code></td><td data-label=""><code>&lt;&lt;var&gt;number&lt;/var&gt;&gt;</code></td></tr></tbody></table>

*Flexibility: specifying how the size of items flex*  

The flex property is more or less unchanged between the new standard and the draft supported by Microsoft. The main difference is that it has been converted to a shorthand in the new version, with separate properties: `flex-grow`, `flex-shrink` and `flex-basis`. The values may be used in the same way in the shorthand. However, the default value for `flex-shrink` (previously called negative flex) is now `1`. This means that items do not shrink by default. Previously, negative free space would be distributed using the `flex-shrink` ratio, but now it is distributed in proportion to `flex-basis` multiplied by the `flex-shrink` ratio.

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>Horizontal</strong></td><td data-label=""><strong>Reversed horizontal</strong></td><td data-label=""><strong>Vertical</strong></td><td data-label=""><strong>Reversed vertical</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>flex-direction</code></td><td data-label=""><code>row</code></td><td data-label=""><code>row-reverse</code></td><td data-label=""><code>column</code></td><td data-label=""><code>column-reverse</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-direction</code></td><td data-label=""><code>row</code></td><td data-label=""><code>row-reverse</code></td><td data-label=""><code>column</code></td><td data-label=""><code>column-reverse</code></td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-orient</code> <code>box-direction</code></td><td data-label=""><code>horizontal</code> <code>normal</code></td><td data-label=""><code>horizontal</code> <code>reverse</code></td><td data-label=""><code>vertical</code> <code>normal</code></td><td data-label=""><code>vertical</code> <code>reverse</code></td></tr></tbody></table>

*Direction: specifying the direction of the main flexbox axis*  

In the old version of the specification, the `box-direction` property needs to be set to `reverse` to get the same behavior as `row-reverse` or `column-reverse` in the later version of the specification. This can be omitted if you want the same behavior as `row` or `column` because `normal` is the initial value.

When setting the `direction` to `reverse`, the main flexbox axis is flipped. This means that when using a left-to-right writing system, the items will display from right to left when `row-reverse` is specified. Similarly, `column-reverse` will lay out flex items from bottom to top, instead of top to bottom.

The old version of the specification also has writing mode-independent values for `box-orient`. When using a left-to-write writing system, `horizontal` may be substituted for `inline-axis`, and `vertical` may be substituted for `block-axis`. If you are using a top-to-bottom writing system, such as those traditional in East Asia, then these values would be flipped.

<table class="tablesaw break-out" data-tablesaw-mode="swipe" data-tablesaw-minimap=""><tbody><tr><td class="spec" data-label=""><strong>Speci- fication</strong></td><td data-label=""><strong>Property name</strong></td><td data-label=""><strong>No wrapping</strong></td><td data-label=""><strong>Wrapping</strong></td><td data-label=""><strong>Reversed wrap</strong></td></tr><tr><td data-label="">Standard</td><td data-label=""><code>flex-wrap</code></td><td data-label=""><code>nowrap</code></td><td data-label=""><code>wrap</code></td><td data-label=""><code>wrap-reverse</code></td></tr><tr><td data-label="">Mid</td><td data-label=""><code>flex-wrap</code></td><td data-label=""><code>nowrap</code></td><td data-label=""><code>wrap</code></td><td data-label=""><code>wrap-reverse</code></td></tr><tr><td data-label="">Old</td><td data-label=""><code>box-lines</code></td><td data-label=""><code>single</code></td><td data-label=""><code>multiple</code></td><td data-label="">N/A</td></tr></tbody></table>

*Wrapping: specifying whether and how flex items wrap along the cross-axis*  

The `wrap-reverse` value flips the start and end of the cross-axis, so that if flex items are laid out horizontally, instead of items wrapping onto a new line below, they will wrap onto a new line above.

At the time of writing, Firefox does not support the `flex-wrap` or older `box-lines` property. It also doesn’t support the shorthand.

The current specification has a `flex-flow` shorthand, which controls both wrapping and direction. The behavior is the same as the one in the version of the specification implemented by IE 10. It is also currently not supported by Firefox, so I would recommend to avoid using it when specifying only the `flex-direction` value.

---

## Conclusion

Well, that’s a (flex-)wrap. In this article, I’ve introduced some of **the myriad of possibilities afforded by flexbox**. Be it source-order independence, flexible sizing or just the humble centering of elements, I’m sure you can find ways to employ flexbox in your websites and applications. The syntax has settled down (finally!), and implementations are here. All major browsers now support flexbox in at least their latest versions.

While older versions of browser use different syntaxes, all the latest versions of the major browsers now support Flexbox in its final form. These browsers also no longer require prefixes, except (at the time of writing) Safari 6.1 and above. For the time being, to support all browsers, use the tables above to map the various syntaxes, and get your flex on.

Layout in CSS is only getting more powerful, and flexbox is one of the first steps out of the quagmire we’ve found ourselves in over the years, first with table-based layouts, then float-based layouts. IE 10 already supports an early draft of the Grid layout specification, which is great for page layout, and Regions and Exclusions will revolutionize how we handle content flow and layout.

Flexbox can be used today if you only need to support relatively modern browsers or can provide a fallback, and in the not too distant future, all sorts of options will be available, so that we can use the best tool for the job. Flexbox is shaping up to be a mighty fine tool.

::: note

This article is an updated excerpt of the chapter “Restyle, Recode, Reimagine With CSS3” from our [<VPIcon icon="fas fa-globe"/>Smashing Book #3](https://shop.smashingmagazine.com/smashing-book-3-print-bundle.html), written by Lea Verou and David Storey. — Ed.

:::

::: info Further Reading

- [The Flexbox Reading List: Techniques And Tools](https://smashingmagazine.com/2016/02/the-flexbox-reading-list/)
- [Harnessing Flexbox For Today’s Web Apps](https://smashingmagazine.com/2015/03/harnessing-flexbox-for-todays-web-apps/)
- [CSS Grid, Flexbox And Box Alignment](https://smashingmagazine.com/2016/11/css-grids-flexbox-and-box-alignment-our-new-system-for-web-layout/)
- [Laying Out A Flexible Future For Web Design With Flexbox](https://smashingmagazine.com/2015/08/flexible-future-for-web-design-with-flexbox/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Flexbox Is As Easy As Pie: Designing CSS Layouts",
  "desc": "Flexible box layout is a new box model optimized for UI layout, and it makes a lot of tasks much easier, or even possible at all. Flexbox’s repertoire includes the simple centering of elements, the expansion and contraction of elements to fill available space, and source-code independent layout, among others abilities.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/centering-elements-with-flexbox.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
