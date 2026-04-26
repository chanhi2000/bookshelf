---
lang: en-US
title: "Selecting a Date Range in CSS"
description: "Article(s) > Selecting a Date Range in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Selecting a Date Range in CSS"
    - property: og:description
      content: "Selecting a Date Range in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/selecting-a-date-range-in-css.html
prev: /programming/css/articles/README.md
date: 2026-04-09
isOriginal: false
author:
  - name: Preethi
    url: https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7B1698CD93D2E480B2867F02F52F6807BC326B3FB6B9C5A5A10103D5813DD8E0_1774013392464_Screenshot2026-03-20at7.29.24AM.png
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
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Selecting a Date Range in CSS"
  desc="A clever approach for selecting multiple dates on a calendar where the :nth-child()'s “n of selector” syntax does all the heavy lifting... even in the JavaScript."
  url="https://css-tricks.com/selecting-a-date-range-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7B1698CD93D2E480B2867F02F52F6807BC326B3FB6B9C5A5A10103D5813DD8E0_1774013392464_Screenshot2026-03-20at7.29.24AM.png"/>

A date range selector lets users pick a time frame between a start and end date, which is useful in booking trips, sorting info by date blocks, picking time slots, and planning schedules.

![Example pulled from Airbnb](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7B1698CD93D2E480B2867F02F52F6807BC326B3FB6B9C5A5A10103D5813DD8E0_1774012344907_date-selection.jpg?resize=1200%2C600)

I’m going to show you an example where, even though JavaScript is involved, the bulk of the work is handled by the “n of selector(s)” syntax of the CSS [**`:nth-child`**](/css-tricks.com/almanac-pseudo-selectors/nth-child.md) selector, making it easy to build the range selection.

<CodePen
  user="anon"
  slug-hash="RNGobRX"
  title="Date Range Selection"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The “n of selector” syntax

This syntax of the `:nth-child` selector **filters elements by a given selector first among all the child elements, before selecting them by a counting order**.

```html
<p>The reclamation of land...</p>
<p>The first reclamations can be traced...</p>
<p class="accent">By 1996, a total of...</p>
<p>Much reclamation has taken...</p>
<p class="accent">Hong Kong legislators...</p>
```

```css
.accent {
  color: red;
}
.accent:nth-child(2) {
  font-weight: bold; /* does not work */
}
:nth-child(2 of .accent){
  text-decoration: underline;
}
```

<CodePen
  user="anon"
  slug-hash="dPpvxmN"
  title="n of selector"
  :default-tab="['css','result']"
  :theme="dark"/>

There are two `.accent`-ed paragraphs with `red` text. As we try to target the second accented paragraph, `.accent:nth-child(2)` fails to select it because it’s trying to find an `.accent` element that’s **the second child of its parent**.

Whereas, `:nth-child(2 of .accent)` succeeds in selecting and styling the second accented paragraph because it’s only looking for **the second element among the** `**.accent**` **elements** rather than the second of all of the children.

---

## The Layout

Moving onto our main example, let’s put together a month layout. [**It only takes a few lines of CSS.**](/css-tricks.com/a-calendar-in-three-lines-of-css.md)

```html
<ul id="calendar">
  <li class="day">Mon</li>
  <li class="day">Tue</li>
  <!-- up to Sat -->
  <li class="date">01<input type="checkbox" value="01"></li>
  <li class="date">02<input type="checkbox" value="02"></li>
  <!-- up to 31  -->
</ul>
```

```css
#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 for no. of days in a week */
}
```

<CodePen
  user="anon"
  slug-hash="bNwqXYK"
  title="Month View"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Choose Only Two Dates

Now is when we reach for JavaScript since we can’t check/uncheck a control in CSS. But even here the “n of selector” syntax can be very useful.

When we pick two dates to create a range, clicking on a third date will update the range and remove one of the earlier dates.

You can set up the range re-adjustment logic in any way you like. I’m using this approach: If the *third* date is either earlier or later than the *last return* date, it becomes the *new return* date, and the old one is unselected. If the third date is earlier than the last onward date, it becomes the new onward date, and the old one is unselected.

```js :collapsed-lines
const CAL = document.getElementById('calendar');
const DT = Array.from(CAL.getElementsByClassName('date')); 

CAL.addEventListener('change', e => {
  if (!CAL.querySelector(':checked')) return;
  
  /* When there are two checked boxes, calendar gets 'isRangeSelected' class  */
  CAL.className = CAL.querySelector(':nth-child(2 of :has(:checked))') ? 'isRangeSelected':'';

  /* When there are three checked boxes */
  if (CAL.querySelector(':nth-child(3 of :has(:checked))')) {

    switch (DT.indexOf(e.target.parentElement)) {

      /* If the newly checked date is first among the checked ones, 
          the second checked is unchecked. Onward date moved earlier. */
      case DT.indexOf(CAL.querySelector(':nth-child(1 of :has(:checked))')):
      CAL.querySelector(':nth-child(2 of :has(:checked)) input').checked = 0; 
      break;

      /* If the newly checked date is second among the checked ones, 
          the third checked is unchecked. Return date moved earlier. */
      case DT.indexOf(CAL.querySelector(':nth-child(2 of :has(:checked))')):
      CAL.querySelector(':nth-child(3 of :has(:checked)) input').checked = 0; 
      break;

      /* If the newly checked date is third among the checked ones, 
          the second checked is unchecked. Return date moved later. */
      case DT.indexOf(CAL.querySelector(':nth-child(3 of :has(:checked))')):
      CAL.querySelector(':nth-child(2 of :has(:checked)) input').checked = 0; 
      break;

    }
  }
});
```

First, we get the index of the current checked date (`DT.indexOf(e.target.parentElement)`), then we see if that’s the same as the first checked among all the checked ones (`:nth-child(1 of :has(:checked))`), second (`:nth-child(2 of :has(:checked))`), or third (`:nth-child(3 of :has(:checked))`). Given that, we then uncheck the relevant box to revise the date range.

You’ll notice that by using the “n of selector” syntax, **targeting the `:checked` box we want by its position among all checked ones** is made much simpler — instead of indexing through a list of checked dates in JavaScript for this, we can directly select it.

Styling the range is even easier than this.

---

## Styling the Range

```css
/* When two dates are selected */
.isRangeSelected { 
  /* Dates following the first but not the second of selected */
  :nth-child(1 of :has(:checked)) ~ :not(:nth-child(2 of :has(:checked)) ~ .date) {
    /* Range color */
    background-color: rgb(228 239 253); 
  }
}
```

When there are two dates chosen, the dates between the first (`1 of :has(:checked)`) and second (`2 of :has(:checked)`) are colored pale blue, creating a visual range for that block of dates in the month.

![A calendar month layout with the dates 9-29 selected. 9 and 19 have a dark blue background and the dates between are light blue.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_7B1698CD93D2E480B2867F02F52F6807BC326B3FB6B9C5A5A10103D5813DD8E0_1774013392464_Screenshot2026-03-20at7.29.24AM.png?resize=1206%2C588)

The color is declared inside a compound selector that selects dates (`.date`) following the first of all checked date (`:nth-child(1 of :has(:checked))`), but not the second of all checked date (`:not(:nth-child(2 of :has(:checked))`).

Here’s the full example once again:

<CodePen
  user="anon"
  slug-hash="RNGobRX"
  title="Date Range Selection"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Selecting a Date Range in CSS",
  "desc": "A clever approach for selecting multiple dates on a calendar where the :nth-child()'s “n of selector” syntax does all the heavy lifting... even in the JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/selecting-a-date-range-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
