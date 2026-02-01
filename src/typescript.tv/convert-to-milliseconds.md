---
lang: en-US
title: "Convert to milliseconds"
description: "Article(s) > Convert to milliseconds"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Convert to milliseconds"
    - property: og:description
      content: "Convert to milliseconds"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/convert-to-milliseconds.html
prev: /programming/js/articles/README.md
date: 2019-07-03
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

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
  name="Convert to milliseconds"
  desc="Learn how to get the milliseconds of a specific date in your desired timezone using Moment.js. You can use a predefined UTC offset or detect the UTC offset. You can also use a predefined time zone or detect the time zone."
  url="https://typescript.tv/hands-on/convert-to-milliseconds"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to get the milliseconds of a specific date in your desired timezone using Moment.js. You can use a predefined UTC offset or detect the UTC offset. You can also use a predefined time zone or detect the time zone.

Learn how to get the milliseconds of a specified date in your desired timezone.

---

## Moment.js

[<VPIcon icon="fas fa-globe"/>Moment.js](https://momentjs.com/) is a great library if you want to work with dates and times in TypeScript. It is very handy for creating interchange representations like [<VPIcon icon="fa-brands fa-wikipedia-w"/>ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) strings, taking your current timezone into account.

---

## Convert to milliseconds

Let's say you live in Berlin (Germany), and you want to represent June, 26th of 2019 at midnight in milliseconds with Central European Summer Time (GMT+2). Using [<VPIcon icon="fas fa-globe"/>Moment.js](https://momentjs.com/) v2.24 you have at least the following possibilities to do that:

### Using a predefined UTC offset

```js title="defined-utc-offset.ts"
import moment from 'moment';
 
const unixTimestamp = moment('2019-06-26T00:00:00.000+02:00').valueOf();
 
console.log('unixTimestamp', unixTimestamp); // 1561500000000
```

### Using UTC offset detection

```js title="detected-utc-offset.ts"
import moment from 'moment';
 
const utcOffsetInMinutes = new Date().getTimezoneOffset(); // -120 (2 hours)
const utcOffsetInMillis = utcOffsetInMinutes * 60000;
const unixTimestamp = moment('2019-06-26T00:00:00.000Z').valueOf() + utcOffsetInMillis;
 
console.log('unixTimestamp', unixTimestamp); // 1561500000000
```

### Using a predefined time zone

```js title="defined-zone-info.ts"
import moment from 'moment';
import 'moment-timezone';
 
const zoneInfo = 'Europe/Berlin';
const unixTimestamp = moment.tz('2019-06-26 00:00:00', zoneInfo).valueOf();
 
console.log('unixTimestamp', unixTimestamp); // 1561500000000
```

### Using time zone detection

```js title="detected-zone-info.ts"
import moment from 'moment';
import 'moment-timezone';
 
const zoneInfo = moment.tz.guess();
const unixTimestamp = moment.tz('2019-06-26 00:00:00', zoneInfo).valueOf();
 
console.log('unixTimestamp', unixTimestamp); // 1561500000000
```

::: tip Pro Tip

You can get date and time expressed according to ISO 8601 in TypeScript from the current date when calling:

```ts
new Date().toISOString(); // "2019-07-03T13:12:18.784Z"
```

Note that the above string will always be normalized to UTC time (Z). To prevent UTC conversion you have to call:

```ts
new Date().toISOString(true); // "2019-07-03T15:12:18.784+02:00"
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Convert to milliseconds",
  "desc": "Learn how to get the milliseconds of a specific date in your desired timezone using Moment.js. You can use a predefined UTC offset or detect the UTC offset. You can also use a predefined time zone or detect the time zone.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/convert-to-milliseconds.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
