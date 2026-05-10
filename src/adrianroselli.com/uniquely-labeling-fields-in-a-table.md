---
lang: en-US
title: "Uniquely Labeling Fields in a Table"
description: "Article(s) > Uniquely Labeling Fields in a Table"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Uniquely Labeling Fields in a Table"
    - property: og:description
      content: "Uniquely Labeling Fields in a Table"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/uniquely-labeling-fields-in-a-table.html
prev: /programming/css/articles/README.md
date: 2019-05-06
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/05/table-fields_NVDA-Firefox_thumb-300x300.png
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
  name="Uniquely Labeling Fields in a Table"
  desc="Many of my clients over the years have relied on fields in tables. Sometimes a checkbox to select a row, sometimes text inputs to update information, sometimes buttons select something. Rarely are they interested in a block of label text above the field, and I cannot disagree with them. The…"
  url="https://adrianroselli.com/2019/05/uniquely-labeling-fields-in-a-table.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/05/table-fields_NVDA-Firefox_thumb-300x300.png"/>

Many of my clients over the years have relied on fields in tables. Sometimes a checkbox to select a row, sometimes text inputs to update information, sometimes buttons select something. Rarely are they interested in a block of label text above the field, and I cannot disagree with them.

The challenge here is to create a unique name for each field without repeating text all over your screen. Experience has taught me that when clients try to visually hide `<label>` text, it can fall out of sync with the column or row headers, making it even more confusing.

The good news here is that if you are creating tables correctly, there isn’t much extra work you need to do. Your column and row headers, paired with some ARIA, can do the job for you. I made a demo to show it in action, embedded below or [directly at Codepen (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://codepen.io/aardrian/details/pBqRyg).

<CodePen
  user="aardrian"
  slug-hash="pBqRyg"
  title="Demo: Uniquely Labeling Fields in Table"
  :default-tab="['css','result']"
  :theme="dark"/>

There are two sets of thing happening here:

1. Each column needs a `<th>` and each row needs a `<th scope="row">`, each with a unique `id` attribute;
2. Each field needs an `aria-labelledby` pointing to the `id`s of the column and row header (separated by a space).

The order of the `id` values in the `aria-labelledby` matters. Note that the `aria-labelledby` code for the `<button>` flips the order of the `id`s referenced by `aria-labelledby` in order to provide a more natural announcement to screen reader users (“Remove 1” versus “1 Remove”). The `<button>` references its own `id` attribute instead of the column header, though this is a decision you should make based on if the button text is different from the column header or likely to change based on errors or user input.

The fields are verbose for screen reader users who use table navigation, but that is a trade-off for users who tab through the fields. While this approach can make it a pain for voice users to select fields, hidden labels will always cause that challenge. An explanation of the naming convention can mitigate that.

Note that all the fields on this form are nonsense, the table is not responsive, and errors are not shown. These are strictly accessible, but maybe using row headers of strictly numbers is not the most usable option depending on your table. In no way would this example warrant an ARIA grid role.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2019/05/table-fields_NVDA-Firefox.mp4" />

Captured using Firefox 67.0b16 and NVDA 2018.3.2. The first row I navigate with table commands, and then I switch to <kbd>Tab</kbd>. As you can see, maybe row headers of just a number can get confusing.

---

## Update: 22 June 2019

John made a great point in the comments. Maybe some of the labels would make more sense in my example if they pointed at the author name instead of an assigned number. After all, the row number announced with the assigned number feels like a permanent off-by-one error and may have muddied the point I was trying to make.

So I removed the first column, made the row header the second column, and used that as the assigned name. Note that in some browser and screen reader combinations, row headers that are not the first column are not announced for any cells in columns prior to the row header.

<CodePen
  user="aardrian"
  slug-hash="dBWbGm"
  title="Demo: Uniquely Labeling Fields in Table v2"
  :default-tab="['css','result']"
  :theme="dark"/>

I also made a video.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2019/05/table-fields_VoiceOver-Safari.mp4" />

> Captured using Safari and VoiceOver on macOS 10.14.3. I alternate between navigating with table commands and <kbd>Tab</kbd>.

---

::: info Other Posts

[**Earlier post: Details / Summary Are Not [insert control here]**](/adrianroselli.com/details-summary-are-not-insert-control-here.md)

```component VPCard
{
  "title": "Periodic Table of the Elements",
  "desc": "I built this for me. An audience of one. A way to keep sharp the skills that I am not always able to use on a project. My requirements were simple: responsive (print, small screens), accessible (beyond screen readers), and kinda fun. Since it relies on a JSON data source…",
  "link": "/adrianroselli.com/periodic-table-of-the-elements.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Uniquely Labeling Fields in a Table",
  "desc": "Many of my clients over the years have relied on fields in tables. Sometimes a checkbox to select a row, sometimes text inputs to update information, sometimes buttons select something. Rarely are they interested in a block of label text above the field, and I cannot disagree with them. The…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/uniquely-labeling-fields-in-a-table.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
