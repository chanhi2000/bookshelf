---
lang: en-US
title: "How JavaScript's Temporal Proposal Will Change Date/Time Functions"
description: "Article(s) > How JavaScript's Temporal Proposal Will Change Date/Time Functions"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How JavaScript's Temporal Proposal Will Change Date/Time Functions"
    - property: og:description
      content: "How JavaScript's Temporal Proposal Will Change Date/Time Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-javascripts-temporal-proposal-will-change-datetime-functions.html
prev: /programming/js/articles/README.md
date: 2024-11-14
isOriginal: false
author: Jesse Hall
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mRGtYItJRnA/upload/62e08fa08517011b9a4f54e9002b76ca.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How JavaScript's Temporal Proposal Will Change Date/Time Functions"
  desc="JavaScript's handling of dates and times has long frustrated developers. The built-in Date object, created in JavaScript’s early days, has numerous limitations and quirks that complicate working with dates and times. Fortunately for us, the Temporal ..."
  url="https://freecodecamp.org/news/how-javascripts-temporal-proposal-will-change-datetime-functions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mRGtYItJRnA/upload/62e08fa08517011b9a4f54e9002b76ca.jpeg"/>

JavaScript's handling of dates and times has long frustrated developers. The built-in `Date` object, created in JavaScript’s early days, has numerous limitations and quirks that complicate working with dates and times.

Fortunately for us, the [Temporal proposal (<FontIcon icon="iconfont icon-github"/>`tc39/proposal-temporal`)](https://github.com/tc39/proposal-temporal) aims to address these issues by providing a modern, more intuitive API for date and time manipulation.

In this article, we’ll go over some of the challenges of working with `date`, what the Temporal API is and how it will work, and what you can use in the meantime until Temporal is ready for production use.

---

## Current Issues with `Date` in JavaScript

### 1. Mutable API

The `Date` object is mutable, which can lead to bugs and unexpected behavior:

```js
// Current Date behavior is mutable
const date = new Date('January 1, 2024');
date.setMonth(1); // Modifies the original date object
console.log(date); // February 1, 2024

// This mutability can lead to bugs when passing dates between functions
function processDate(date) {
  date.setDate(date.getDate() + 1); // Modifies the original date!
  return date;
}
```

### 2. Confusing month numbering

Months in `Date` are zero-based (0-11), while days are one-based (1-31):

```js
// Confusing month numbering
const date = new Date(2024, 0, 1); // January 1, 2024
console.log(date.getMonth()); // 0 (January)
```

### 3. Limited time zone support

The `Date` object has limited support for time zones and relies heavily on the system's local time zone:

```js
// Time zone handling is system-dependent
const date = new Date('2024-01-01T00:00:00Z');
console.log(date.toString()); // Will show different results based on system timezone
```

---

## What is the Temporal API?

Temporal is a proposed new JavaScript API that provides a modern solution for working with dates, times, and timestamps. It's currently a Stage 3 proposal, which means it's in the final stages of development but not yet ready for production use.

Key concepts of Temporal:

1. **Immutable by default**: All Temporal objects are immutable
2. **Clear separation of concerns**: Different objects for different use cases
3. **Explicit time zone handling**: Better support for working with time zones
4. **Consistent indexing**: All units use 1-based numbering

---

## Key Features of Temporal

### 1. Different types for different needs

```js
// PlainDate for working with calendar dates
const date = Temporal.PlainDate.from('2024-01-01');

// PlainTime for working with wall-clock time
const time = Temporal.PlainTime.from('09:00:00');

// ZonedDateTime for working with specific time zones
const zonedDateTime = Temporal.ZonedDateTime.from('2024-01-01T09:00:00[America/New_York]');
```

In this example, Temporal provides different object types for different use cases:

- `PlainDate` is used when you only care about calendar dates without time or timezone information. Perfect for birthdays, holidays, and so on.
- `PlainTime` handles time independent of any date or timezone. Useful for recurring events like "9 AM daily standup".
- `ZonedDateTime` combines date, time, and timezone information for complete timestamp handling. Great for scheduling meetings across timezones.

Each type is purpose-built and immutable, preventing accidental modifications. This clear separation helps developers choose the right tool for their specific needs, unlike the one-size-fits-all `Date` object that tries to handle everything and often leads to confusion.

### 2. Immutable operations

```js
// All operations return new objects instead of modifying the original
const date = Temporal.PlainDate.from('2024-01-01');
const nextMonth = date.add({ months: 1 }); 
console.log(date.toString()); // '2024-01-01' - original unchanged
console.log(nextMonth.toString()); // '2024-02-01' - new object
```

This example demonstrates how Temporal's immutable design prevents accidental mutations and makes date arithmetic more predictable.

With the current `Date` API, methods like `setMonth()` modify the original object, which can lead to bugs when that object is used in multiple places. In contrast, Temporal's methods always return new objects, leaving the original untouched.

### 3. Better time zone support

```js
// Explicit time zone handling
const nyDateTime = Temporal.ZonedDateTime.from({
  timeZone: 'America/New_York',
  year: 2024,
  month: 1,
  day: 1,
  hour: 9
});

const tokyoDateTime = nyDateTime.withTimeZone('Asia/Tokyo');
console.log(tokyoDateTime.toString()); // '2024-01-01T23:00:00+09:00[Asia/Tokyo]'
```

Unlike the current `Date` API, which often leads to confusion with implicit time zone conversions, Temporal makes time zone operations explicit and straightforward:

1. We create a `ZonedDateTime` object specifically for New York time zone, with all components (year, month, day, hour) clearly specified. This explicit creation prevents any ambiguity about which time zone we're working with.
2. Using `withTimeZone()`, we can easily convert times between zones without complex calculations. The conversion from New York to Tokyo time is handled automatically.
3. The resulting string output includes the full time zone offset (`+09:00`) and the time zone name (`[Asia/Tokyo]`), providing complete clarity about the time being represented.

This approach solves many common time zone-related issues developers face today, such as daylight saving time transitions, time zone offset calculations, and the ambiguity of local vs. UTC times. It's particularly valuable for applications that need to handle global scheduling, event coordination across time zones, or any scenario where precise time zone handling is crucial.

---

## Comparing Date, Intl, and Temporal

### Current approach with `Date` and `Intl`

```js
// Current approach using Date and Intl
const date = new Date('2024-01-01T09:00:00Z');
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  dateStyle: 'full',
  timeStyle: 'long'
});

console.log(formatter.format(date)); // 'Monday, January 1, 2024 at 4:00:00 AM EST'
```

With the current approach, we create a UTC timestamp using `Date`, need a separate `Intl.DateTimeFormat` object for formatting, handle time zone conversion implicitly during formatting, and have less control over the exact output format. The resulting output shows 4:00 AM EST because we created the date as 09:00 UTC and when formatted in New York time zone. This implicit conversion can be confusing and error-prone.

### Future approach with Temporal

```js
// Future approach using Temporal
const datetime = Temporal.ZonedDateTime.from('2024-01-01T09:00:00[America/New_York]');
console.log(datetime.toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
})); // 'Monday, January 1, 2024 at 9:00:00 AM EST'
```

With Temporal, we create a `ZonedDateTime` with an explicit time zone, and the formatting options are directly integrated into the API. The time (9:00 AM) is exactly what we specified for New York, with no implicit conversions. This makes the code's behavior more predictable and easier to understand.

Arithmetic also becomes more intuitive with this approach.

```js
const nextWeek = datetime.add({ weeks: 1 });
const duration = datetime.until(nextWeek);
console.log(nextWeek.toPlainDate().toString()); // '2024-01-08'
console.log(duration.toString()); // 'PT168H'
```

In this example, we can see several key advantages of Temporal's approach:

1. **Explicit Time Zone Handling**: By creating a `ZonedDateTime` with `[America/New_York]`, we explicitly state which time zone we're working with. There's no ambiguity about whether the time is UTC, local, or in another time zone.
2. **Integrated Formatting**: The `toLocaleString()` method provides a clean, unified way to format dates without needing a separate formatter object. All the formatting options are similar to what you'd use with Intl.DateTimeFormat, maintaining familiarity while simplifying the API.
3. **Intuitive Arithmetic**: The `add()` and `until()` methods demonstrate how Temporal makes date/time calculations more straightforward:
    - `add({ weeks: 1 })` clearly shows we're adding one week
    - `until()` returns a proper duration object that can be easily understood and manipulated
    - The resulting duration of 'PT168H' represents a period of time (P) with 168 hours (T168H), following the ISO 8601 duration format
4. **Type Safety**: By having distinct types like `ZonedDateTime` and `PlainDate`, Temporal helps prevent common mistakes. The `toPlainDate()` method explicitly converts to a date-only representation when we don't need time information.

This approach eliminates many of the gotchas and implicit behaviors that make the current `Date` API problematic, while providing a more powerful and flexible way to work with dates and times.

---

## Current Status and Alternatives

### Current status

- Temporal is currently at Stage 3 of the TC39 process
- It's not yet ready for production use
- Browser support is not yet available natively

### Recommended alternatives

Until Temporal becomes widely available, consider using established libraries:

::: tabs

@tab:active Day.js

<SiteInfo
  name="iamkun/dayjs"
  desc="⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API"
  url="https://github.com/iamkun/dayjs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0717e4308f9d5621a87f02acbdbcae52eabef5e02a4db696bb5fb915ddafb16e/iamkun/dayjs"/>

- Lightweight
- Good browser support
- Good TypeScript support
- Extensible with plugins
- Has a large community and active development

```js
// Using Day.js as an alternative
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const date = dayjs('2024-01-01').tz('America/New_York');
const nextWeek = date.add(1, 'week');
```

For a deeper dive into Day.js, check out this article: [**JavaScript Dates – How to Use the DayJS Library to work with Date and Time in JS**](/freecodecamp.org/javascript-date-time-dayjs.md)

@tab 2. date-fns

<SiteInfo
  name="date-fns/date-fns"
  desc="⏳ Modern JavaScript date utility library ⌛️."
  url="https://github.com/date-fns/date-fns/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8b9b947852d26251663607d4839300e5ba783cc7fca87a612f00b047a8077bb1/date-fns/date-fns"/>

- Functional programming approach
- Tree-shakeable
- Good TypeScript support

@tab Luxon

<SiteInfo
  name="moment/luxon: ⏱ A library for working with dates and times in JS"
  desc="⏱ A library for working with dates and times in JS - moment/luxon"
  url="https://github.com/moment/luxon/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6a825efdb0c096f1434c4931c67592cad45aed0f6f1b81d4344f5de9bd8e7972/moment/luxon"/>

- Similar features to Temporal
- Immutable by default
- Native time zone and Intl support

:::

### Why wait for Temporal?

While these libraries are good alternatives, Temporal will offer several advantages:

1. Native browser support (no additional bundle size)
2. Standardized API across all JavaScript environments
3. Better performance as a native implementation
4. Consistent behavior across all platforms

Until Temporal reaches Stage 4 and has widespread browser support, I would recommend either using the built-in `Date` and `Intl` objects or one of the established libraries mentioned above for production applications. But prepare yourself and be ready for Temporal when it’s ready!

---

## Thanks for reading!

Check out my other content and let me know how I can help you on your journey to becoming a web developer.

- [<FontIcon icon="fa-brands fa-youtube"/>Subscribe To My YouTube Channel](https://youtube.com/codeSTACKr)
- Socials: [X (<FontIcon icon="fa-brands fa-x-twitter"/>`codeSTACKr`)](https://twitter.com/codeSTACKr) | [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`codeSTACKr`)](https://linkedin.com/in/codeSTACKr/) | [Instagram (<FontIcon icon="fa-brands fa-instagram"/>`codeSTACKr`)](https://instagram.com/codeSTACKr)
- [Sign Up For My Newsletter](https://codestackr.com/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How JavaScript's Temporal Proposal Will Change Date/Time Functions",
  "desc": "JavaScript's handling of dates and times has long frustrated developers. The built-in Date object, created in JavaScript’s early days, has numerous limitations and quirks that complicate working with dates and times. Fortunately for us, the Temporal ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-javascripts-temporal-proposal-will-change-datetime-functions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
