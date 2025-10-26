---
lang: en-US
title: "Building a Honeypot Field That Works"
description: "Article(s) > Building a Honeypot Field That Works"
icon: iconfont icon-astro
category:
  - Node.js
  - Astro
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
  - astro
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Honeypot Field That Works"
    - property: og:description
      content: "Building a Honeypot Field That Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/building-a-honeypot-field-that-works.html
prev: /programming/js-astro/articles/README.md
date: 2025-10-20
isOriginal: false
author:
  - name: Zell Liew
    url : https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/04/sticky-header.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Astro > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-astro/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building a Honeypot Field That Works"
  desc="Honeypots are fields that developers use to prevent spam submissions. They still work in 2025. But you got to set a couple of tricks in place so spambots can’t detect your honeypot field."
  url="https://css-tricks.com/building-a-honeypot-field-that-works"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/04/sticky-header.png"/>

Honeypots are fields that developers use to prevent spam submissions.

**They still work in 2025.**

So you don’t need [<VPIcon icon="fa-brands fa-google"/>reCAPTCHA](https://cloud.google.com/security/products/recaptcha) or other annoying mechanisms.

But you got to set a couple of tricks in place so spambots can’t detect your honeypot field.

---

## Use This

I’ve created a [<VPIcon icon="fas fa-globe"/>`Honeypot` component](https://splendidlabz.com/docs/svelte/forms/honeypot/) that does everything I mention below. So you can simply import and use them like this:

```astro
<script>
  import { Honeypot } from '@splendidlabz/svelte'
</script>

<Honeypot name="honeypot-name" />
```

Or, if you use Astro, you can do this:

```astro
---
import { Honeypot } from '@splendidlabz/svelte'
---

<Honeypot name="honeypot-name" />
```

But since you’re reading this, I’m sure you kinda want to know what’s the necessary steps.

---

## Preventing Bots From Detecting Honeypots

Here are two things that you must *not* do:

1. Do not use `<input type=hidden>`.
2. Do not hide the honeypot with inline CSS.

Bots today are already smart enough to know that these are traps — and they will skip them.

Here’s what you need to do instead:

1. Use a `text` field.
2. Hide the field with CSS that is *not* inline.

A simple example that would work is this:

```html
<input class="honeypot" type="text" name="honeypot" />

<style>
  .honeypot {
    display: none;
  }
</style>
```

For now, placing the `<style>` tag near the honeypot seems to work. But you might not want to do that in the future (more below).

---

## Unnecessary Enhancements

You may have seen these other enhancements being used in various honeypot articles out there:

- `aria-hidden` to prevent screen readers from using the field
- `autocomplete=off` and `tabindex="-1"` to prevent the field from being selected

```html
<input ... aria-hidden autocomplete="off" tabindex="-1" />
```

These aren’t necessary [**because `display: none` itself already does the things these properties are supposed to do**](/css-tricks.com/hiding-content-responsibly.md).

---

## Future-Proof Enhancements

Bots get smarter everyday, so I won’t discount the possibility that they can catch what we’ve created above. So, here are a few things we can do today to future-proof a honeypot:

1. Use a legit-sounding `name` attribute values like `website` or `mobile` instead of obvious honeypot names like `spam` or `honeypot`.
2. Use legit-sounding CSS class names like `.form-helper` instead of obvious ones like `.honeypot`.
3. Put the CSS in another file so they’re further away and harder to link between the CSS and honeypot field.

The basic idea is to trick spam bot to enter into this “legit” field.

```html
<input class="form-helper" ... name="occupation" />

<!-- Put this into your CSS file, not directly in the HTML -->
<style>
  .form-helper {
    display: none;
  }
</style>
```

There’s a very high chance that bots won’t be able to differentiate the honeypot field from other legit fields.

---

## Even More Enhancements

The following enhancements need to happen on the `<form>` instead of a honeypot field.

The basic idea is to detect if the entry is potentially made by a human. There are many ways of doing that — and all of them require JavaScript:

1. Detect a `mousemove` event somewhere.
2. Detect a keyboard event somewhere.
3. Ensure the the form doesn’t get filled up super duper quickly (‘cuz people don’t work that fast).

Now, the simplest way of using these (I always advocate for the simplest way I know), is to use [<VPIcon icon="fas fa-globe"/>the `Form` component](https://splendidlabz.com/docs/svelte/forms/form/) I’ve created in [<VPIcon icon="fas fa-globe"/>Splendid Labz](https://splendidlabz.com):

```astro
<script>
  import { Form, Honeypot } from '@splendidlabz/svelte'
</script>

<Form>
  <Honeypot name="honeypot" />
</Form>
```

If you use Astro, you need to enable JavaScript with a client directive:

```astro
---
import { Form, Honeypot } from '@splendidlabz/svelte'
---

<Form client:idle>
  <Honeypot name="honeypot" />
</Form>
```

If you use vanilla JavaScript or other frameworks, you can use the `preventSpam` utility that does the triple checks for you:

```js
import { preventSpam } from '@splendidlabz/utils/dom'

let form = document.querySelector('form')
form = preventSpam(form, { honeypotField: 'honeypot' })

form.addEventListener('submit', event => {
  event.preventDefault()
  if (form.containsSpam) return
  else form.submit()
})
```

And, if you don’t wanna use any of the above, the idea is to use JavaScript to detect if the user performed any sort of interaction on the page:

```js :collapsed-lines
export function preventSpam(
  form,
  { honeypotField = 'honeypot', honeypotDuration = 2000 } = {}
) {
  const startTime = Date.now()
  let hasInteraction = false

  // Check for user interaction
  function checkForInteraction() {
    hasInteraction = true
  }

  // Listen for a couple of events to check interaction
  const events = ['keydown', 'mousemove', 'touchstart', 'click']
  events.forEach(event => {
    form.addEventListener(event, checkForInteraction, { once: true })
  })

  // Check for spam via all the available methods
  form.containsSpam = function () {
    const fillTime = Date.now() - startTime
    const isTooFast = fillTime < honeypotDuration
    const honeypotInput = form.querySelector(`[name="${honeypotField}"]`)
    const hasHoneypotValue = honeypotInput?.value?.trim()
    const noInteraction = !hasInteraction

    // Clean up event listeners after use
    events.forEach(event =>
      form.removeEventListener(event, checkForInteraction)
    )

    return isTooFast || !!hasHoneypotValue || noInteraction
  }
}
```

---

## Better Forms

I’m putting together a solution that will make HTML form elements much easier to use. It includes the standard elements you know, but with easy-to-use syntax and are highly accessible.

Stuff like:

- Form
- Honeypot
- Text input
- Textarea
- Radios
- Checkboxes
- Switches
- Button groups
- etc.

[<VPIcon icon="fas fa-globe"/>Here’s a landing page](https://splendidlabz.com/solutions/forms/) if you’re interested in this. I’d be happy to share something with you as soon as I can.

---

## Wrapping Up

There are a couple of tricks that make honeypots work today. The best way, likely, is to trick spam bots into thinking your honeypot is a real field. If you don’t want to trick bots, you can use other bot-detection mechanisms that we’ve defined above.

Hope you have learned a lot and manage to get something useful from this!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Honeypot Field That Works",
  "desc": "Honeypots are fields that developers use to prevent spam submissions. They still work in 2025. But you got to set a couple of tricks in place so spambots can’t detect your honeypot field.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/building-a-honeypot-field-that-works.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
