---
lang: en-US
title: "Maybe You Don’t Need a Date Picker"
description: "Article(s) > Maybe You Don’t Need a Date Picker"
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
      content: "Article(s) > Maybe You Don’t Need a Date Picker"
    - property: og:description
      content: "Maybe You Don’t Need a Date Picker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/maybe-you-dont-need-a-date-picker.html
prev: /programming/css/articles/README.md
date: 2019-07-05
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/07/date-stamp-300x300.jpg
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
  name="Maybe You Don’t Need a Date Picker"
  desc="Calendar controls, date pickers, date widgets, whatever you call them, however they are described, they follow the same basic principle — present the user with a calendar to enter a date (and sometimes a time). Chris Blakeley, CC BY-NC-ND 2.0 The native implementations come from browsers when authors use <input…"
  url="https://adrianroselli.com/2019/07/maybe-you-dont-need-a-date-picker.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/07/date-stamp-300x300.jpg"/>

Calendar controls, date pickers, date widgets, whatever you call them, however they are described, they follow the same basic principle — present the user with a calendar to enter a date (and sometimes a time).

![[<VPIcon icon="fa-brands fa-flickr"/>Chris Blakeley](https://flickr.com/photos/61565201@N00/33647751), [<VPIcon icon="fas fa-globe"/>CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)](https://adrianroselli.com/wp-content/uploads/2019/07/date-stamp.jpg)

The native implementations come from browsers when authors use `<input type="date">`. Usually a calendar grid, but sometimes built to look like a broken slot-machine or configurable date rubber stamp that your accountant uses.

Frameworks and libraries offer their own take on date pickers, with many more options from third-party developers. These appeal to developers who want control over the visual style, and sometimes function, of the date picker. Particularly developers who want to avoid a different experience across browsers.

The problem is that nearly every implementation of a date picker is a barrier for some set of users. I can comfortably say every one that I have seen is a problem, though perhaps there is a wonderfully robust one somewhere. Even the ARIA Authoring Practices, which is more comfortable with imperfect patterns, has not deigned to create a date picker.

::: note 8 February 2024.

LOL, of course [<VPIcon icon="iconfont icon-w3c"/>APG added a date picker](https://w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/), and of course it uses an [**attribute with no browser support**](/adrianroselli.com/brief-note-on-calendar-tables.md#Abbr-attr), and of course it [left it in there anyway (<VPIcon icon="iconfont icon-github"/>`w3c/aria-practices`)](https://github.com/w3c/aria-practices/issues/1570) 4 years ago justifying that decision with *hope*. APG continues to be [**full of anti-patterns**](/adrianroselli.com/uncanny-a11y.md#aria-authoring-practices).

:::

---

## Challenges

I have been testing with users for about 20 years (so far). Something I see over and over again is the frustration with date fields that are anything other than a plain text field for well known dates (like birthdays). They can anger users. Enough that I have seen users quit a test (more than once).

Users do not want to have to stop their flow and learn this new user interface. They don’t want to experiment to see what keys work, or read a pile of instructions. They want to enter a date and move on. This applies just as much to native date pickers. They may only use their phone or computer to email and surf the web, not enter extensive date-specific information on a regular basis.

A developer may use a date picker a few times a day. Every few minutes when building a screen with a date picker. Heck, maybe only once or twice a week. But a developer may have used date pickers in one month far more times than an average user in a year or a lifetime.

### Accessibility

I have not touched on the accessibility issues with date pickers. The ones that claim to be accessible aren’t.

For example, we know `<input type="date">` is a problem for voice users across browsers. Graham Armfield already produced a [<VPIcon icon="fas fa-globe"/>thorough report](https://hassellinclusion.com/blog/input-type-date-ready-for-use/) on the accessibility of the native control and came to conclusion that nope, it is not accessible.

I am constantly tossed date pickers from libraries and asked to evaluate them, and they are typically an accessibility quagmire. There is a reason most accessibility professionals tense up at the mention of date pickers.

::: details Unnecessary detail about one library’s date picker…

I gathered the following notes after only a few minutes with the [<VPIcon icon="fas fa-globe"/>ReactJS Datepicker](https://reactdatepicker.com/) and its [accessibility notes (<VPIcon icon="fa-brands fa-npm"/>`react-datepicker`)](https://npmjs.com/package/react-datepicker#accessibility). I am reasonably confident more issues would be found with more time.

1. The buttons at the top of the grid to navigate to the previous or next month have no accessible name. If a screen reader user gives them focus, they will be announced only as “Button”. This is a WCAG 4.1.2 violation.
2. The arrows in the buttons have insufficient contrast with the background, meaning users in sunlight, with poor monitors, or with low vision may have trouble seeing them. This is a WCAG 1.4.11 violation.
3. The `<select>` menus for the month and year have no accessible name (via `<label>`, `aria-label`, or otherwise). A screen reader user will hear the current value, but no label. While the value may provide context for the field, it does not provide context in the overall control. This is a WCAG 1.3.1 and 3.3.2 violation.
4. The site provides a stack of keyboard shortcuts that the calendar control supports. While supported, nowhere is that support conveyed to users. Keyboard-only and screen reader users are provided no instructions on how to use the control, meaning they will likely arrow their way through months and years to find their choice. This is a WCAG 3.3.2 violation.
5. The previous / next month buttons, the month select and the year select cannot be accessed by a keyboard-only user. Using the arrow keys does not put focus on those controls. Using Tab moves the focus to the next field of the form. Of the listed supported keyboard shortcuts, even if a keyboard-only user knew about them, there is no way to get to those visible controls, meaning they will likely arrow their way through months and years to find their choice. This is a WCAG 2.1.1 violation.
6. The dates have an `aria-label` with them that overrides the visible text and adds complexity to the term. While `aria-label` typically will not work on a `<div>`, the `role` makes it work. In this case, instead of a screen reader user hearing “18” they hear “day dash 18”. A better approach would be to exclude the `aria-label` altogether. This is not a technical WCAG violation, but is considered a usability issue for screen reader users.
7. The currently selected date is not conveyed to screen reader users. It is only conveyed visually. This is a case where `aria-label` may be useful to convey the state of the calendar date, perhaps as `aria-label="18 selected"`. It is possible `aria-current` can work here. As it is, this is WCAG 1.4.1 and 4.1.2 violation.
8. The week days are not conveyed to screen reader users for individual days. Because the calendar does not use a `<table>` with `<th>` elements for each weekday, and because arrowing right or left moves the user regardless of the start or end of a row, a screen reader user will not know if a particular date falls on a Monday, Tuesday, etc. It does not help this is also mis-cast with `role="listbox"`. This is a WCAG 1.3.1 violation.

Round-up of [<VPIcon icon="iconfont icon-w3c"/>WCAG violations](https://w3.org/WAI/WCAG21/quickref/) in this calendar control as listed above:

- 1.3.1: Info and Relationships (A)
- 1.4.1: Use of Color (A)
- 1.4.11: Non-text Contrast (AA)
- 2.1.1: Keyboard (A)
- 3.3.2: Labels or Instructions (A)
- 4.1.2: Name, Role, Value (A)

:::

### Validation

Using third-party or native calendar controls can make a developer feel that the validation is handled. Handled by the collective intelligence of everyone who worked on the control.

But the developer still has to provide validation outside of the control. Sometimes validation is needed to support the fallback state for older browsers. Sometimes it is there to honor progressive enhancement. But mostly there should be server-side validation because we know scripts break and resources don’t load and data can be bypass client-side validation.

I cannot imagine that developers are going to let user-submitted content directly into their data structures without scrubbing it in some minimal way. And not just because of the fear of [Little Bobby Tables](https://xkcd.com/327/) paying their site a visit. As a skilled user, I can get around confounding controls by injecting the values I want using the browser’s dev tools, and developers typically account for data coming through outside of the carefully crafted client-side validation.

The point is, robust web sites and applications already do validation on the data outside of that provided by the control.

---

## An Alternative to Date Pickers

Users generally do not want a complex date picker every time you ask for any date. At least not users with a keyboard.

### Text Field

Previously I have relied on plain text inputs as date fields with custom validation for the site, typically using the same logic on the client and the server. For *known* dates — birthdays, holidays, anniversaries, etc — it has tested well.

### Text Field with Messaging

In this prototype I am still using a text input for the first field, but I also use client-side script to convert the data to a human-readable date that I present to the user. This way a user can get immediate feedback and worry a bit less about matching a specific arcane data format the developers prefer.

In short, I am trying to deliver far less code (and confusion) to the end user while accepting a broader range of date formats. I am letting the [<VPIcon icon="fa-brands fa-wikipedia-w"/>robustness principle](https://en.wikipedia.org/wiki/Robustness_principle) drive my approach.

#### Prototype

<CodePen
  user="aardrian"
  slug-hash="XQBgNO"
  title="Date Field Experiment"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

You will note that I ask for a U.S. date format. The weirdest one. This can be adjusted, of course, but I chose it to demonstrate how a globally confusing format benefits from immediate feedback.

The script to convert the date is the minimal amount of code to demonstrate the effect. It is not production-ready. It is not even good. Try it by entering “7 5 19”. Ideally, the date your script generates is the one you submit with the form.

Note the ARIA attributes, the connections between the fields, and use of `<output>` to hold the message. These are all there to make sure it is useful for screen reader users and voice users.

```html
<label for="BDay01" id="BDay01Label">Birth date <span>(MM/DD/YYYY)</span>:</label>
<input type="text" id="BDay01" aria-labelledby="BDay01Label BDay01error" aria-describedby="BDay01confirm" onblur="valiDate(this.id,'BDay01confirm','BDay01error');">
<output class="confirm" id="BDay01confirm" aria-live="assertive" for="BDay01" form="Form"></output>
<div class="error" id="BDay01error"></div>
```

##### Update: 10 July 2019

For more on `<output>`, read Scott O’Hara’s post [<VPIcon icon="fas fa-globe"/>`<output>`: HTML’s native live region element](https://scottohara.me/blog/2019/07/10/the-output-element.html).

#### Testing Feedback

Dragon Dictate users are generally frustrated with all calendar controls, including the native ones we get from `type="date"`. In an informal test, [this one proved usable (<VPIcon icon="fa-brands fa-x-twitter"/>`ewaccess`)](https://x.com/ewaccess/status/1128393070792380416).

Informal tests (anecdata) from other users showed this approach was no worse than a text field and far easier than a calendar control.

### Places This Will Not Work

There are plenty of situations where a plain text field (with or without the messaging feature I prototyped) will not work.

If you need to see chosen dates, unavailable dates, weekends, holidays, date spans, date ranges, dates where counts from start or end dates matter, and so on.

---

## Wrap-up

What we know is that native and custom calendar controls are often a problem for users and applied where they are not needed. Before dropping the code on a screen as a matter of habit, consider if it genuinely helps the user or just your workflow.

I do not propose a perfect solution for the narrow use case I identified, but I am hoping it spurs rethinking the casual application of a more complex pattern than is often warranted.

::: note Update: 20 June 2020

Tommy Feldt has put together a proof of concept that works similarly to my example (mine outputs as text, this one to a calendar view). You can find his [Inclusive Dates datepicker on GitHub (<VPIcon icon="iconfont icon-github"/>`fymmot/inclusive-dates`)](https://github.com/fymmot/inclusive-dates) and [<VPIcon icon="fas fa-globe"/>play around with the demo](https://fymmot.github.io/inclusive-dates/).

If you play around with it you will see it handles odd dates similarly to mine (try 02/31/1995 from the comments below). I suggest you test it for localization support (honoring dates in your locale).

The calendar uses a native `<table>` but neuters the semantics with `role="presentation"` (as opposed to using a `grid` role, if any change was needed). So I would consider adjusting that.

:::

::: note Update: 13 August 2020

In the post [<VPIcon icon="fas fa-globe"/>Natively Format JavaScript Dates and Time](https://elijahmanor.com/blog/format-js-dates-and-times), Elijah Manor talks about native JavaScript functions such as `toLocaleDateString()`, `toLocaleTimeString()`, and `toLocaleString()` (which I use in my demo).

Sadly, it leans on screen shots without alt text and a video sans captions, but the content may be helpful to understand different ways you can use these functions that might fit your use case. Particularly if JavaScript is normally not your thing.

:::

::: note Update: 10 October 2023

Russ Weakley gave a talk at ID24 2023 (its 11th edition!) titled, “[<VPIcon icon="fa-brands fa-youtube"/>What makes an accessible date picker? Is it even possible?](https://youtu.be/D2Gy2WN4Iys&list=PLn7dsvRdQEfFfYUgq0wVLXlVN7yQUUWd-)” He does not offer a final product; instead he walks through factors authors must consider before even writing code. I have embedded it:

He uses the birth date use case I talk about above, too.

:::

::: note Update: 19 April 2024

This is from late 2022 and I cannot believe I forgot to link it: [Safari’s date-picker is the cause of 1/3 of our customer support issues (<VPIcon icon="iconfont icon-github"/>`RobertAKARobin`)](https://gist.github.com/RobertAKARobin/850a408e04d5414e67d308a2b5847378)

> I’ve heard that [<VPIcon icon="fas fa-globe"/>“Safari is the new IE”](https://theregister.com/2021/10/22/safari_risks_becoming_the_new_ie/), and don’t *personally* care for the iOS UI. But I chalked up the “New IE” stuff to annoying little CSS issues, and expected that devices *recommended specifically for the elderly* would be usable by the elderly.
>
> […] small-biz developers should be able to be confident that usability testing for built-in web browser functionality is a nice-to-have, not a need-to-have.

<SiteInfo
  name="Safari's date-picker is the cause of 1/3 of our customer support issues"
  desc="Safari's date-picker is the cause of 1/3 of our customer support issues - safari.md"
  url="https://gist.github.com/RobertAKARobin/850a408e04d5414e67d308a2b5847378/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

The author describes their workarounds.

::: info Talk Reference (Added 7 July 2024)

This post was mentioned at Ruby Australia.

<VidStack src="youtube/Qv8hjid6WDI" />

:::

::: info Other Posts

[**Earlier post: Link + Disclosure Widget Navigation**](/adrianroselli.com/link-disclosure-widget-navigation.md)

[**More recent post: Maybe Ignore type=search**](/adrianroselli.com/ignore-typesearch.,d)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Maybe You Don’t Need a Date Picker",
  "desc": "Calendar controls, date pickers, date widgets, whatever you call them, however they are described, they follow the same basic principle — present the user with a calendar to enter a date (and sometimes a time). Chris Blakeley, CC BY-NC-ND 2.0 The native implementations come from browsers when authors use <input…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/maybe-you-dont-need-a-date-picker.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
