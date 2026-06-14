---
lang: en-US
title: "The Siren Song of  ariaNotify()"
description: "Article(s) > The Siren Song of  ariaNotify()"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Siren Song of  ariaNotify()"
    - property: og:description
      content: "The Siren Song of  ariaNotify()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-siren-song-of-arianotify.html
prev: /programming/js/articles/README.md
date: 2026-06-17
isOriginal: false
author:
  - name: Mat Marquis
    url: https://css-tricks.com/author/wilto/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/arianotify.jpg
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
  name="The Siren Song of  ariaNotify()"
  desc="There's a brand new ariaNotify() method — defined by the WAI-ARIA 1.3 Specification — that provides a means of programmatically triggering narration in a screen reader."
  url="https://css-tricks.com/the-siren-song-of-arianotify"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/arianotify.jpg"/>

I need you all to promise me you’ll be cool about this. I‘m here to tell you about an upcoming web platform feature that has been a *long* time coming; a feature that not only fulfills a use case sorely overdue for a better solution, but does so by way of a syntax that is both immediately understandable and deceptively powerful. That’s right, this thing is *developer catnip*, and I don’t mind saying that I was really excited to try it out — after which point I willed myself to tuck it away in a drawer and put it out of my mind. This is a tool only to be used in situations where it is absolutely, *one hundred percent* necessary, to solve a problem that cannot be solved in any other way, up to and including “push back against building a feature in the first place.” So just be *cool* about this, okay? Okay.

There’s a brand new `ariaNotify()` method — defined by the [<VPIcon icon="iconfont icon-w3c"/>Accessible Rich Internet Applications (WAI-ARIA) 1.3 Specification](https://w3c.github.io/aria/#ARIANotifyMixin) — that provides you with a means of programmatically triggering narration in a screen reader. It accepts a string as its first argument, and an optional configuration object as its second:

```js
document.ariaNotify( "Hello, World." );
// When invoked, a screen reader will narrate "Hello, World."
```

That might look like a simple solution to an equally simple use case here in print, but historically this has a tricky problem that could only be solved by slightly off-label usage of ARIA’s **live regions**. That means that understanding live regions — and their shortcomings — is the key to understanding what `ariaNotify` does for us. If you’ve worked with live regions before, you likely closed this tab right after that code snippet, and you’re currently on your third or fourth lap around the room with your arms held aloft in triumph. If you haven’t worked with live regions before, well, to put it in the strictest possible technical terms: *woof* what a mess.

In an assisted browsing context, if some part of a page changes in response to a user interaction, or something is loaded and added to the page asynchronously, those changes aren’t discoverable until the user moved their focus to that changed content — a user would have no way of knowing that something *had* changed, let alone *what*. Live regions address that, at least by design: an element with an `aria-live` attribute will prompt narration for changes to the markup contained within that element — when the markup is changed, the changed markup is narrated aloud. If `aria-live` has a value of `assertive`, it informs assistive technology “this is urgent, and should be narrated right away.” If `aria-live` has a value of `polite`, it says “this should be narrated, at the next natural opportunity to do so.” Using `role="alert"` or `role="status"` on an element is functionally equivalent to `aria-live="assertive"` and `aria-live="polite"`, respectively. Sounds pretty reasonable on paper, right?

Naturally, we needed a way to fine-tune exactly what information is narrated and how, so there are a few other attributes that determine a live region’s behavior:

::: info <code>aria-atomic</code>

- **`true`:** announce only the text that changes within the element
- **`false` (default):** narrate the entire contents of the live region when something in it changes.

:::

::: info <code>aria-relevant</code>

- **`text`:** notify the user when [<VPIcon icon="fa-brands fa-html5"/>phrasing content](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content) — text, just like it says on the tin — changes inside the live region
- **`additions`:** notify the user when a node is added to the live region
- **`removals`:** notify the user when a node is removed from the live region
- **`all` (default):** notify the user if text is changed, and/or elements are added to or removed from the DOM

:::

Again, solid enough in theory! Problem solved, right up until the point where you try to *use* live regions, for pretty much anything, ever. In practice, [<VPIcon icon="fas fa-globe"/>browsers and assistive technologies are *wildly* inconsistent about implementation](https://vispero.com/resources/screen-reader-support-aria-live-regions/), particularly as it relates to nested markup within a live region — if you want `aria-live` to work as expected, you’ll often end up needing to strip out all the otherwise semantically-meaningful markup that you *should* be using. In order to work reliably across assisted browsing contexts, a live region has to already [meaningfully exist in the DOM at the time the narration is triggered (<VPIcon icon="fa-brands fa-codepen"/>`scottohara`)](https://codepen.io/scottohara/full/dyzxwyr). A live region can’t be toggled from `display: none` or injected into the page along *with* the content to be narrated or you’ll run into timing issues that prevent the content from being narrated — when the browser first “sees” the live region, it locks in “okay, narrate anything that *changes* in this container,” which doesn’t necessarily include that initial content. The way the `"assertive"` and `"polite"` values work isn’t especially well-defined in the specification *or* [**realized across screen readers and browser combinations**](/adrianroselli.com/live-region-support.md#results), either. Again: they’re a *mess*.

Even if all that *weren’t* the case, there’s a fundamental mismatch between the purpose of live regions and the way the modern web is built. Like I said, live regions only work when markup is added to/removed from the element in question, and that isn’t the reality of most interactions that result in a change to the visible contents of a page. Live regions are no help when you’re revealing markup that’s already in the document, but otherwise inert — for example, swapping between a visible `display` property and `display: none`. That use case is every bit as common as structural changes to the current document on-the-fly, if not more so.

All these limitations have led to live regions almost exclusively being used as makeshift notification APIs: having one or more `aria-live` elements buried in the page, visually hidden ([<VPIcon icon="fa-brands fa-firefox"/>but not removed from the accessibility tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) via `display: none`), that you update as-needed with whatever text you want narrated. I have been there and done this, and it’s clunky, not least of all because of how inconsistent live regions are at their core. That injected content is also necessarily available to a user navigating through the page via assistive tech, just floating in the document divorced from it’s original meaning — if you’re not meticulous about cleaning up afterwards, you’ve added a potentially confusing source of contextually-irrelevant narration to the page. Most of all, though, you’ve added a new and *invisible* concern; a feature that will need dedicated testing and upkeep, and something that can break in very literally unseen ways, and do so in ways that have the potential to be annoying, misleading, confusing, or all of the above. That’s what gets you, with accessibility work: quick-and-easy decisions made in isolation can have unforeseen consequences in the context of the overall experience, and unless those assumptions are tested very carefully — early and often — we can’t know what those consequences might be.

The `ariaNotify` method takes the place of this kind of [<VPIcon icon="fa-brands fa-wikipedia-w"/>Rube Goldberg](https://en.wikipedia.org/wiki/Rube_Goldberg) accessibility contraption, providing you with a *real* screen reader notification API, no convoluted (and flaky) markup required:

```js
document.ariaNotify( "Hello, World." );
```

`ariaNotify` is available as a method on the `Element` interface or on the `Document` interface — there’s no meaningful difference between the two for the examples you’re going to see here, but it’s worth knowing that calling `document.ariaNotify()` means that the `lang` attribute specified on the `html` element, specifically, will be used to infer the language of the notification:

```js
const btn = document.querySelector( "button.announce" );

btn.addEventListener("click", function( e ) {
  document.ariaNotify( "Hello, World." );
});
/*
* Clicking the button results in the "polite"-timed announcement "hello, world," 
* using the `lang` attribute specified on the `<html>` element. If there isn't 
* one, the browser's default language is used.
/*
```

While calling `ariaNotify()` from an element means that the `lang` attribute of the element’s nearest ancestor will be used to determine the language of the notification:

```js
const btn = document.querySelector( "button.announce" );

btn.addEventListener("click", function( e ) {
  this.ariaNotify( "Hello, World." );
});
/*
* Clicking the button results in the "polite"-timed announcement "hello, world," 
* using the `lang` attribute of the `button` (or the closest parent element with 
* `lang`) to  determine pronunciation. If there isn't one in the document (all
* the way up to and including `<html>`), the browser's default language is used.
/*
```

`ariaNotify` accepts a second parameter that allows you to set an explicit priority level:

```js
const btn = document.querySelector( "button.announce" );

btn.addEventListener("click", function( e ){
  this.ariaNotify( "Hello, world.", {
    priority: "high"
  });
});
```

The default priority for these notifications is `priority: "normal"`, which behaves like `aria-live="polite"` (or `role="status"`). Setting an explicit `priority: "high"` will prioritize and potentially interrupt the current narration, the way `aria-live="assertive"` (or `role="alert"`) would.

That’s the entire API so far, right there. No fussing with markup, no finessing timings; if you need something narrated, you call `ariaNotify` and it is *narrated*, just like that. You can try this out in Firefox as we speak, though it doesn’t seem like `lang` attributes are factored in just yet:

<CodePen
  link="https://codepen.io/editor/Wilto/pen/019e2c40-99c5-7617-8163-23c489a628b5"
  title="ariaNotify()"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info JAWS

> Polite, button. To activate, press space bar. [spacebar pressed] Space. Hello, World.
>
> Assertive, button. To activate, press space bar. [spacebar pressed] Space. Hello, World.
>
> Educado [pronounced correctly], button. To activate, press space bar. Space. Hola, Mundo [pronounced incorrectly].

:::

::: info NVDA

> Polite, button. [spacebar pressed] Hello, World.
> 
> Assertive, button. [spacebar pressed] Hello, World.
> 
> Educado [pronounced correctly], button. [spacebar pressed] Hola, Mundo [pronounced incorrectly].

:::

::: info VoiceOver

> Polite, button. You are currently on a button [spacebar pressed] inside of a frame. To click this button, press Control–Option–Space. To exit this web area, press Control–Option–Shift-Up Arrow. Hello, World.
> 
> Assertive, button. You are currently on a button [spacebar pressed] Hello, World.
> 
> Educado [pronounced correctly], button. You are currently on a button [spacebar pressed] inside of a frame. To click this button, press Control–Option–Space. To exit this web area, press Control–Option–Shift-Up Arrow. Hola, Mundo [pronounced incorrectly].

:::

Pretty solid, huh? *Huge* improvement over how we’ve all been stuck using live regions. I, for one, can’t wait to *almost* use `ariaNotify`, then — again — promptly talk myself out of it!

Why the reluctance? Well, in accessibility circles, it is sometimes said that there are three stages of learning to use ARIA:

1. You don’t use ARIA.
2. You use ARIA.
3. You don’t use ARIA.

The W3C puts this in more formal terms, as is their specialty:

::: "Using ARIA: First Rule of ARIA Use" *From W3C Discontinued Draft* (<VPIcon icon="iconfont icon-w3c"/><code>w3c.github.io</code>)

> If you can use a native HTML element \[HTML\] or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so.

```component VPCard
{
  "title": "2.1 First Rule of ARIA Use | Using ARIA",
  "desc": "This document is a practical guide for developers on how to add accessibility information to HTML elements using the Accessible Rich Internet Applications (WAI-ARIA) 1.2 specification , which defines a way to make Web content and Web applications more accessible to people with disabilities.",
  "link": "https://w3c.github.io/using-aria/#rule1/",
  "logo": "https://w3c.github.io/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

That second stage of ARIA mastery is where we get ourselves into trouble. The web is a chaotic place, but assistive technologies have evolved alongside it, and they’ve learned to paper over some of the more common issues a user might encounter. For example, say you have an `h2` that reveals some visually-hidden content that follows it when clicked — that element might be presented in a way that makes that interaction clear *visually*, but without our intervention, it might not otherwise be signaled to a user browsing via screen reader. To work around this, assistive technologies can helpfully narrate that heading element as “clickable” when it receives user focus upon finding a `click` event listener bound to that heading. Granted, that isn’t as good as explicitly signaling the purpose of this element to the user, but it is *workable*, even if we didn’t make that interaction explicit.

The catch is in *how* we that make that interaction explicit. If you‘re somewhat familiar with ARIA, you might find yourself thinking “well, this element behaves like a button, so I should put `role="button"` on it to inform a user that this does something.” That impulse isn’t *strictly* wrong, but with that attribute comes a likely unintended consequence: by being explicit about the element’s role, we remove its *implicit* meaning. You’re telling the browser and assistive technology, in no uncertain terms, that this *is not* a heading — so if the user is navigating [<VPIcon icon="fas fa-globe"/>by way of the document outline](https://webaim.org/projects/screenreadersurvey10/#finding), this element will no longer be part of that navigation, and what felt like a simple, helpful quick-fix ends up having an unintended consequence. ARIA leaves no room for interpretation; what we say goes, full stop. We say “narrate this,” it gets narrated. Non-negotiable.

So, given a very easy-to-use feature that inarguably says “when I tell you to narrate this, you narrate it,” please assume that I am making steely, unblinking eye contact here while I say, aloud, “`alert()`” — an imagined scenario made all the more unsettling by the fact that I have somehow managed to say it *in a monospaced font.*

```js
window.alert( "Hello world, like it or not." );
```

You remember `alert()` from way back in the day, right? A method as infamous as it is obnoxious. If you’re newer to the industry, you might not be familiar with it first-hand, for a blessing. Like `ariaNotify`, it was — *is*, technically — a quick and easy API for immediately presenting information to a user:

![A CSS-Tricks article with an alert on top that identifies the site address and says 'Hello World, like it or not.'](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_D001C67931903D7057449C5AC820101F7F153CB201332AFD0DF2BBB3E6313CC4_1779810124342_image.png?resize=876%2C608&ssl=1)

`alert()` is simple, effective, consistent, and — back when it saw widespread usage — *incredibly* annoying. `ariaNotify()` entrusts you with this same power, this time backed by the invisible, unyielding authority of ARIA. With `ariaNotify()` in your pocket, “this might be confusing, so I’ll narrate exactly what’s going on” will be a quick and easy decision, and might mean that a savvy user — already skilled at navigating the web despite all its inherent chaos and inconsistency — finds their browsing interrupted by a lecture about an interaction they already understand.

It isn’t hard to imagine a developer — their heart squarely in the right place — using `ariaNotify` to inform a user that content has been revealed by an interaction on the page. In context, however, revealing that content likely meant interacting with an element already narrated as “clickable” thanks to the presence of an associated event listener, the element’s inherent semantics, or the presence of an `aria-expanded="false"` attribute (the *correct* approach to signaling that interacting with an element will reveal associated content). In that case, all we’ve done is add noise to the user’s experience of the page, and nobody needs that. I mean, imagine being partway through reading this sentence when `alert( "There's a new comment on this article!" )` interrupts you for the third time, or hovering over `<button>Navigation</button>` only to get hit with `alert( "Click here to open the navigation." )` like some unskippable video game tutorial? Ugh. I’d close the tab.

Even worse, if a narrated instruction falls out of sync with the reality of the interaction itself — an invisible inconsistency that wouldn’t be caught by a QA process that lacks dedicated screen reader testing — we could end up making the user sit through an argument between the underlying page and their own screen reader while they’re just trying to get things done and get on with their day.

ARIA is powerful stuff. It gives us the ability to define the meanings, states, and relationships between elements on a page as absolute, iron-clad *fact* — it provides a line of communication between those of us building the web and those of us using it. Nowhere is that line of communication more direct than with `ariaNotify()`, a feature that effectively allows us to speak *directly* to an end user using the voice of the browser and assistive technology they know and trust. That’s a lot of responsibility bound up in a single method. It solves a very real problem, but like so many technologies: if not used carefully, it can cause just as many.

I am excited about `ariaNotify()`, y’know, in a measured, cautious way. It finally gives us a way to address a use case that has plagued the web — and me, personally — for years, in a shockingly easy way. So easy, in fact, that it makes `ariaNotify()` just a little bit dangerous.

I mean, not for *us* though, right? Because we’re all gonna be *cool* about this, *right*?

*Right.*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Siren Song of  ariaNotify()",
  "desc": "There's a brand new ariaNotify() method — defined by the WAI-ARIA 1.3 Specification — that provides a means of programmatically triggering narration in a screen reader.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-siren-song-of-arianotify.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
