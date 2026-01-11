---
lang: en-US
title: "Date is out, Temporal is in"
description: "Article(s) > Date is out, Temporal is in"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - piccalil.li
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Date is out, Temporal is in"
    - property: og:description
      content: "Date is out, Temporal is in"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/date-is-out-and-temporal-is-in.html
prev: /programming/js/articles/README.md
date: 2026-01-07
isOriginal: false
author:
  - name: Mat “Wilto” Marquis
    url : https://piccalil.li/author/mat-wilto-marquis
cover: https://piccalil.b-cdn.net/api/og-image?slug=date-is-out-and-temporal-is-in/
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
  name="Date is out, Temporal is in"
  desc="Temporal is the Date system we always wanted in JavaScript. It's extremely close to being available so Mat Marquis thought it would be a good idea to explain exactly what is better about this new JavaScript date system."
  url="https://piccalil.li/blog/date-is-out-and-temporal-is-in"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=date-is-out-and-temporal-is-in/"/>

Time makes fools of us all, and JavaScript is no slouch in that department either. Honestly, I’ve never minded the latter much — in fact, if you’ve taken [**JavaScript for Everyone**](https://piccalil.li/javascript-for-everyone/README.md) or tuned into the [<VPIcon icon="fas fa-globe"/>newsletter](https://wil.to/posts#js4e), you already know that I largely *enjoy* JavaScript’s little quirks, believe it or not.

I like when you can see the seams; I like how, for as formal and iron-clad as the ES-262 specification might seem, you can still see all the good *and* bad decisions made by the hundreds of people who’ve been building the language in mid-flight, if you know where to look. JavaScript has *character*. Sure, it doesn’t necessarily do everything *exactly* the way one might expect, but y’know, if you ask me, JavaScript has a real charm once you get to know it!

There’s one part of the language where that immediately falls apart for me, though.

```js
// Numeric months are zero-indexed, but years and days are not:
console.log( new Date(2026, 1, 1) );
// Result: Date Sun Feb 01 2026 00:00:00 GMT-0500 (Eastern Standard Time)
```

The `Date` constructor.

```js
// A numeric string between 32 and 49 is assumed to be in the 2000s:
console.log( new Date( "49" ) );
// Result: Date Fri Jan 01 2049 00:00:00 GMT-0500 (Eastern Standard Time)

// A numeric string between 33 and 99 is assumed to be in the 1900s:
console.log( new Date( "99" ) );
// Result: Date Fri Jan 01 1999 00:00:00 GMT-0500 (Eastern Standard Time)

// ...But 100 and up start from year zero:
console.log( new Date( "100" ) );
// Result: Date Fri Jan 01 0100 00:00:00 GMT-0456 (Eastern Standard Time)
```

I dislike `Date` *immensely*.

```js
// A string-based date works the way you might expect:
console.log( new Date( "2026/1/2" ) );
// Result: Date Fri Jan 02 2026 00:00:00 GMT-0500 (Eastern Standard Time)

// A leading zero on the month? No problem; one is one, right?
console.log( new Date( "2026/02/2" ) );
// Result: Date Mon Feb 02 2026 00:00:00 GMT-0500 (Eastern Standard Time)

// Slightly different formatting? Sure!
console.log( new Date( "2026-02-2" ) );
// Result: Date Mon Feb 02 2026 00:00:00 GMT-0500 (Eastern Standard Time)

// A leading zero on the day? Of course; why wouldn't it work?
console.log( new Date('2026/01/02') );
// Result: Date Fri Jan 02 2026 00:00:00 GMT-0500 (Eastern Standard Time)

// Unless, of course, you separate the year, month, and date with hyphens.
// Then it gets the _day_ wrong.
console.log( new Date('2026-01-02') );
// Result: Date Thu Jan 01 2026 19:00:00 GMT-0500 (Eastern Standard Time)
```

`Date` sucks. It was hastily and shamelessly copied off of Java’s homework in the car on the way to school and it got all the same answers wrong, right down to the name at the top of the page: `Date` doesn’t represent a *date*, it represents a *time*. Internally, dates are stored as number values called **time values**: Unix timestamps, divided into 1,000 milliseconds — which, okay, yes, a Unix time does also necessarily imply a date, sure, but *still*: Date represents a time, from which you can infer a date. Gross.

```js
// Unix timestamp for Monday, December 4, 1995 12:00:00 AM GMT-05 (the day JavaScript was announced):
const timestamp = 818053200;

console.log( new Date( timestamp * 1000 ) );
// Result: Date Mon Dec 04 1995 00:00:00 GMT-0500 (Eastern Standard Time)
```

Words like “date” and “time” mean things, but, sure — *whatever, JavaScript*.

Java deprecated *their* `Date` way back in 1997, only a few years after JavaScript’s `Date` was turned loose on the unsuspecting world; meanwhile, we’ve been saddled with this mess ever since. It’s wildly inconsistent when it comes to parsing dates, as you’ve seen so far here. It has no sense of time zones beyond the local one and GMT, which is not ideal where “world-wide” is *right there in the web’s name* — and speaking-of, `Date` *only* respects the Gregorian calendar model. It wholesale does not understand the concept of daylight savings time, which— I mean, okay, yeah, samesies, but I’m not *made of computers*. All these shortcomings make it exceptionally common to use a third-party library dedicated to working around it all, some of which are absolutely *massive*; a performance drain that has done real and measurable damage to the web.

None of these are my major issue with `Date`. My complaint is about more than parsing or syntax or “developer ergonomics” or the web-wide performance impact of wholly necessary workarounds or even the definition of the word “date.” My issue with `Date` is soul-deep. My problem with `Date` is that using it means *deviating from the fundamental nature of time itself*.

All JavaScript’s primitives values are **immutable**, meaning that the values themselves cannot be changed. The number value `3` can never represent anything but the concept of “three” — you can’t make `true` mean anything other than “true.” These are values with concrete, iron-clad, real-world meanings. We know what three is. It can’t be some other non-three thing. These immutable data types are stored **by value**, meaning that a variable that represents the number value `3` effectively “contains” — and thus behaves as — the number value `3`.

When an immutable value is assigned to a variable, the JavaScript engine creates a copy of that value and stores the copy in memory:

```js
const theNumber = 3;

console.log( theNumber );
// Result: 3
```

This fits the common mental model for “a variable” just fine: `theNumber` “contains” `3`.

When we initialize `theOtherNumber` with the value bound to `theNumber`, that mental model holds: once again a `3` is created and stored in memory. `theOtherNumber` can now be thought of as containing its own discrete `3`.

```js
const theNumber = 3;
const theOtherNumber = theNumber;

console.log( theOtherNumber );
// Result: 3;
```

The value of `theNumber` isn’t changed when we alter the value associated with `theOtherNumber`, of course — again, we’re working with two discrete instances of `3`.

```js
const theNumber = 3;
let theOtherNumber = theNumber;

theOtherNumber = 5;

console.log( theOtherNumber );
// Result: 5;

console.log( theNumber );
// Result: 3
```

When you change the value bound to `theOtherNumber`, you’re not changing the `3`, you’re creating a new, immutable number value and binding that in its place. Hence an error when you try to tinker with a variable declared using `const`:

```js
const theNumber = 3;

theNumber = 5;
// Result: Uncaught TypeError: invalid assignment to const 'theNumber'
```

You can’t change the binding of a `const`, and you *definitely* can’t alter the meaning of `3`.

Data types that *can* be changed after they’re created are **mutable**, meaning that the data value *itself* can be altered. Object values — any non-primitive value, like an array, map, or set — are mutable.

Variables (and object properties, function parameters, and elements in an array, set, or map) can’t “contain” an object, the way we might think of `theNumber` in the example above as “containing” `3`. A variable can contain either a primitive value or a **reference value**, the latter of which is a pointer to that object’s stored location in memory. When you assign an object to a variable, instead of creating a copy of that object, the identifier represents a reference to the object’s stored position in memory. That’s why an object bound to a variable declared with `const` can still be altered: the *reference value* can’t be changed, but the values of the object can:

```js
const theObject = {
  theValue : 3
};

theObject.theValue++;

console.log( theObject.theValue );
// Result: 4
```

You still can’t change the binding of a `const`, but you *can* alter the object that binding references.

When a reference value is assigned from one variable to another, the JavaScript engine creates a copy of that reference value — not the object value itself, the way a discrete copy is made of a primitive value. Both identifiers point to the same object in memory — any changes made to that object by way of one reference will be reflected by the others, because they’re all referencing the same thing:

```js
const theObject = {
  theValue : 3
};

const theOtherObj = theObject;

theOtherObj.theValue++;

console.log( theOtherObj.theValue );
// Result: 4

console.log( theObject.theValue );
// Result: 4
```

*This* is what gets me about JavaScript’s date handling. Despite representing “point to it on a calendar” values, JavaScript’s date values are *mutable —* `Date` is a constructor, invoking a constructor with `new` necessarily results in an object, and all objects are inherently mutable:

```js
const theDate = new Date();

console.log( typeof theDate );
// Result: object
```

Even though “January 1st, 2026” is as much an immutable real-world concept as “three” or “true,” the only way we have of representing that date is a with a mutable data structure.

This also means that any variable initialized with an instance of the `Date` constructor contains a reference value, pointing to a data value in memory that can be changed by way of any reference to that value:

```js
const theDate = new Date();

console.log( theDate.toDateString() );
//
// Result: Tue Dec 30 2025

theDate.setMonth( 10 );

console.log( theDate.toDateString() );
//
// Result: Sun Nov 30 2025
```

Again, we’re going to breeze right over the fact that month `10` is *November*.

So despite real-world dates having set-in-stone *meanings*, the process of interacting with an instance of `Date` that represents that real-world value can mean altering that instance in ways we didn’t necessarily intend:

```js
const today = new Date();

const addDay = theDate => {
  theDate.setDate( theDate.getDate() + 1 );
  return theDate;
};

console.log(`Today is ${ today.toLocaleDateString() }, tomorrow is ${ addDay( today ).toLocaleDateString() }.`);
//
// Result: Today is 12/31/2025. Tomorrow is 1/1/2026.
```

Fine so far, right? Today is today, tomorrow is tomorrow; all is right in the world. You’d be forgiven for committing this to a codebase and moving on with your day. That is, unless we reordered the output slightly.

```js
const today = new Date();
const addDay = theDate => {
  theDate.setDate( theDate.getDate() + 1 );
  return theDate;
};

console.log(`Tomorrow will be ${ addDay( today ).toLocaleDateString() }. Today is ${ today.toLocaleDateString() }.`);
//
// Result: Tomorrow will be 1/1/2026. Today is 1/1/2026.
```

See what happened there? the variable `today` represents a reference to the object created by `new Date()`. When we provided `today` as an argument to the `addDay` function, the parameter `theDate` now represents a copy of the reference value — not a copy of the value, but a second reference to the object that represents today’s date. When we manipulate that value to determine the date of the following day, we’re manipulating the mutable object in memory, not an immutable copy — today becomes tomorrow, the falcon has a hard time hearing the falconer, the center starts to look a little iffy vis-a-vis “holding,” and so on.

Now, by this point you can probably tell that I’m not here to praise `Date`, but what you might not expect is that I’m here to *bury* it. That’s right: `Date` is soon to be over, done, gone, as “deprecated” as any part of the web platform can be — which is to say, “around forever, but you shouldn’t use it anymore, if you can avoid it.” Soon we will — at long last — have an object that replaces `Date` wholesale: `Temporal`.

---

## Temporal is not a constructor, it’s a namespace object

The sharp-eyed among you may have noticed that I said “an *object* that replaces `Date`,” not “a constructor.” `Temporal` is not a constructor, and your browser’s developer console will tell you the same if you attempt to invoke it as one:

```js
const today = new Temporal();
// Uncaught TypeError: Temporal is not a constructor
```

`Temporal` is a *way* better name for something that pertains to *time*, if you ask me.

Instead, `Temporal` is a **namespace object** — an ordinary object made up of static properties and methods, like the `Math` object:

```js
console.log( Temporal );
//
// Result (expanded):
// Temporal { … }
//   Duration: function Duration()
//   Instant: function Instant()
//   Now: Temporal.Now { … }
//   PlainDate: function PlainDate()
//   PlainDateTime: function PlainDateTime()
//   PlainMonthDay: function PlainMonthDay()
//   PlainTime: function PlainTime()
//   PlainYearMonth: function PlainYearMonth()
//   ZonedDateTime: function ZonedDateTime()
//   Symbol(Symbol.toStringTag): "Temporal"
```

I find this *immediately* understandable compared to `Date`. The classes and namespaces objects that `Temporal` contains allow you to calculate durations between two points in time, represent a point in time *with or without time zone specificity*, or access the current moment in time via the `Now` property. `Temporal.Now` references a namespace object containing properties and methods of its own:

```js
console.log( Temporal.Now );
//
// Result (expanded):
// Temporal.Now { … }
//   instant: function instant()
//   plainDateISO: function plainDateISO()
//   plainDateTimeISO: function plainDateTimeISO()
//   plainTimeISO: function plainTimeISO()
//   timeZoneId: function timeZoneId()
//   zonedDateTimeISO: function zonedDateTimeISO()
//   Symbol(Symbol.toStringTag): "Temporal.Now"
//   <prototype>: Object { … }
```

`Temporal` gives us a sensible, plain-language way to grab today’s date, *a la* raggedy old `Date`: the `Now` property contains a `plainDateISO()` method. Since we’re not specifying anything in the way of time zones (a thing we can do now, thanks to Temporal) that method gives us back today’s date in the current one — EST, in my case:

```js
console.log( Temporal.Now.plainDateISO() );
//
// Result (expanded):
// Temporal.PlainDate 2025-12-31
//   <prototype>: Object { … }
```

Notice how `plainDateISO` results in an already-formatted, date-only value? Stay tuned; that’ll come up again later.

—wait. That looks familiar:

```js
const nowTemporal = Temporal.Now.plainDateISO();
const nowDate = new Date();

console.log( nowTemporal );
//
// Result (expanded):
// Temporal.PlainDate 2025-12-31
//   <prototype>: Object { … }

console.log( nowDate );
//
// Result (expanded):
// Date Tue Dec 31 2025 11:05:52 GMT-0500 (Eastern Standard Time)
//   <prototype>: Date.prototype { … }
```

Could it be that—…

```js
const rightNow = Temporal.Now.instant();

console.log( typeof rightNow );
// object
```

*Yes, we’re still working with a mutable object that represents the current date*, I say in my spookiest voice, flashlight squarely beneath my chin. At a glance, this might not seem like it addresses my big complaint with `Date` at all.

Well, we’re kind of at the mercy of the nature of the language, here: dates represent complex real-world values, complex data necessitates complex data structures, and for JavaScript, that means objects. The difference is in how we *interact* with these Temporal objects, as compared to instances of `Date`, and — as is so often the case — the magic is in the prototype chain:

```js :collapsed-lines
const nowTemporal = Temporal.Now.plainDateISO();

console.log( nowTemporal.__proto__ );
/* Result (expanded):
Object { … }
  add: function add()
  calendarId: >>
  constructor: function PlainDate()
  day: >>
  dayOfWeek: >>
  dayOfYear: >>
  daysInMonth: >>
  daysInWeek: >>
  daysInYear: >>
  equals: function equals()
  era: >>
  eraYear: >>
  inLeapYear: >>
  month: >>
  monthCode: >>
  monthsInYear: >>
  since: function since()
  subtract: function subtract()
  toJSON: function toJSON()
  toLocaleString: function toLocaleString()
  toPlainDateTime: function toPlainDateTime()
  toPlainMonthDay: function toPlainMonthDay()
  toPlainYearMonth: function toPlainYearMonth()
  toString: function toString()
  toZonedDateTime: function toZonedDateTime()
  until: function until()
  valueOf: function valueOf()
  weekOfYear: >>
  with: function with()
  withCalendar: function withCalendar()
  year: >>
  yearOfWeek: >>
  Symbol(Symbol.toStringTag): "Temporal.PlainDate"
  <get calendarId()>: function calendarId()
  <get day()>: function day()
  <get dayOfWeek()>: function dayOfWeek()
  <get dayOfYear()>: function dayOfYear()
  <get daysInMonth()>: function daysInMonth()
  <get daysInWeek()>: function daysInWeek()
  <get daysInYear()>: function daysInYear()
  <get era()>: function era()
  <get eraYear()>: function eraYear()
  <get inLeapYear()>: function inLeapYear()
*/

```

Right away you’ll notice that there are a number of methods and properties devoted to accessing, formatting, and manipulating the details of the Temporal object we’re working with. No big surprises there — it means a little bit of a learning curve, sure, but nothing an occasional trip over to [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) couldn’t solve, and they all more-or-less do what they say on their respective tins. The big difference from working with `Date` is *how* they do so, at a fundamental level:

```js
const nowTemporal = Temporal.Now.plainDateISO();

// Current local date:
console.log( nowTemporal );
/* Result (expanded):
Temporal.PlainDate 2025-12-30
  <prototype>: Object { … }
*/

// Current local year:
console.log( nowTemporal.year );
// Result: 2025

// Current local date and time:
console.log( nowTemporal.toPlainDateTime() );
/* Result (expanded):
Temporal.PlainDateTime 2025-12-30T00:00:00
  <prototype>: Object { … }
*/

// Specify that this date represents the Europe/London time zone:
console.log( nowTemporal.toZonedDateTime( "Europe/London" ) );
/* Result (expanded):
Temporal.ZonedDateTime 2025-12-30T00:00:00+00:00[Europe/London]
  <prototype>: Object { … }
*/

// Add a day to this date:
console.log( nowTemporal.add({ days: 1 }) );
/*
Temporal.PlainDate 2025-12-31
  <prototype>: Object { … }
*/

// Add one month and one day to this date, and subtract two years:
console.log( nowTemporal.add({ months: 1, days: 1 }).subtract({ years: 2 }) );
/*
Temporal.PlainDate 2024-01-31
  <prototype>: Object { … }
*/

console.log( nowTemporal );
/* Result (expanded):
Temporal.PlainDate 2025-12-30
  <prototype>: Object { … }
*/
```

Notice how none of these transformations required us to manually spin up any new objects, *and* that the value of the object referenced by `nowTemporal` remains unchanged? Unlike `Date`, the methods we use to interact with a Temporal object result in *new* Temporal objects, rather than requiring us to use them in the context of a new instance or to modify the instance we’re working with — which is how we’re able to chain the `add` and `subtract` methods together in `nowTemporal.add({ months: 1, days: 1 }).subtract({ years: 2 })`.

Sure, we’re still working with objects, and that means we’re working with mutable data structures that represent real-world values:

```js
const nowTemporal = Temporal.Now.plainDateISO();

nowTemporal.someProperty = true;

console.log( nowTemporal );
//
// Result (expanded):
// Temporal.PlainDate 2026-01-05
//   someProperty: true
//   <prototype>: Object { … }
```

…But the value represented by that Temporal object isn’t meant to be changed during the normal course of interacting with it — even though the object is still essentially mutable, we’re not stuck using that object in ways that could alter what it means in terms of real-world dates and times. I’ll take it.

So, let’s revisit that janky little “today is X, tomorrow is Y” script we wrote using `Date` earlier. First, we’ll fix it by making sure we’re working with two discrete instances of `Date` rather than modifying the instance that represents today’s date:

```js
const today = new Date();

const addDay = theDate => {
  const tomorrow = new Date();

  tomorrow.setDate( theDate.getDate() + 1 );
  return tomorrow;
};

console.log(`Tomorrow will be ${ addDay( today ).toLocaleDateString() }. Today is ${ today.toLocaleDateString() }.`);
//
// Result: Tomorrow will be 1/1/2026. Today is 12/31/2025.
```

Thanks, I hate it.

Okay, fine. It gets the job done, just as it has since the day `Date` first bumbled its way onto the web. We’re not unwittingly altering the value of `today` since we’re spinning up a new instance of `Date` inside our `addDay` function — wordy, but it works, as it has for decades now. We add `1` to it, which we have to just kind of *know* means add one *day.* Then in our template literal we need to keep nudging JavaScript to give us the date in a format that doesn’t include the current time, as a string. It’s functional, but verbose.

Now, let’s redo it using `Temporal`:

```js
const today = Temporal.Now.plainDateISO();

console.log(`Tomorrow will be ${ today.add({ days: 1 }) }. Today is ${ today }.`);
//
// Result: Tomorrow will be 2026-01-01. Today is 2025-12-31.
```

Now we’re talking.

*So much better*. Leaner, meaner, and *way* less margin for error. We want today’s date without the time, and the object that results from invoking `plainDateISO` (and any new Temporal objects created from it) will retain that formatting *without* being coerced to a string. Formatting: *check*.

We want to output a value that represents today’s date plus one day, and we want to do so in a way where we are unmistakably saying “add one day to it” with no parsing guesswork: *check* and *check*.

Most importantly, we don’t want to run the risk of having our original `today` object altered unintentionally — because the result of calling the `add` method will always be a new Temporal object: *check*.

`Temporal` is going to be a *massive* improvement over `Date`, and I only say “going to be” because it still isn’t quite ready for prime-time usage. [<VPIcon icon="fas fa-globe"/>The draft specification for the proposed `Temporal` object](https://tc39.es/proposal-temporal/) has reached stage three of the standardization process, meaning it is now officially “recommended for implementation” — not yet part of the standard that informs the ongoing development of JavaScript itself, but close enough that browsers can start tinkering with it. That means the results of that early experimentation may be used to further refine the specification, so nothing is set in stone just yet. Web standards are an iterative process, after all.

That’s where you and I come in. Now that `Temporal` has [<VPIcon icon="iconfont icon-caniuse"/>landed in the latest versions of Chrome and Firefox](https://caniuse.com/?search=Temporal) — and others, soon — it’s time for us to get in there and kick the tires a little bit. We may not have had any say in `Date`, but we get to experiment with `Temporal` before the final implementations land.

Soon, JavaScript will have sensible, modern date handling, and we’ll finally be able to cram `Date` way in the back of the junk drawer with the rubber bands, mismatched jar lids, mystery keys, and probably-half-empty AA batteries — still present, still an inexorable part of the web platform, but no longer our first, last, and only way of handling dates. And we only had to wait— well, hold on, let me just crunch the numbers real quick:

::: tip Try it out

```js
const today = Temporal.Now.plainDateISO();
const jsShipped = Temporal.PlainDate.from( "1995-12-04" );
const sinceDate = today.since( jsShipped, { largestUnit: 'year' });

console.log( `${ sinceDate.years } years, ${ sinceDate.months } months, and ${ sinceDate.days } days.` );
//
// 30 years, 0 months, and 27 days.
```

:::

Sure, the best time to replace `Date` would’ve been back in 1995, but hey: the second best time is `Temporal.Now`, right?

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Date is out, Temporal is in",
  "desc": "Temporal is the Date system we always wanted in JavaScript. It's extremely close to being available so Mat Marquis thought it would be a good idea to explain exactly what is better about this new JavaScript date system.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/date-is-out-and-temporal-is-in.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
