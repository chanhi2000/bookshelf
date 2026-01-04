---
lang: en-US
title: "Relatively New Things You Should Know about HTML Heading Into 2025"
description: "Article(s) > Relatively New Things You Should Know about HTML Heading Into 2025"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Relatively New Things You Should Know about HTML Heading Into 2025"
    - property: og:description
      content: "Relatively New Things You Should Know about HTML Heading Into 2025"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/bone-up-html-2025.html
prev: /programming/css/articles/README.md
date: 2025-01-06
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4732
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
  name="Relatively New Things You Should Know about HTML Heading Into 2025"
  desc="Accordion details, toggle switches, styleable selects, responsive video, and more! "
  url="https://frontendmasters.com/blog/bone-up-html-2025/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4732"/>

Not all of this is like *absolutely brand spanking new* just-dropped-in-2024 stuff. Some of it is, but generally it’s *relatively* new stuff that’s all pretty great. I’m pointing things out that I think are really worth knowing about. It’s possible you haven’t kept up too much with HTML developments as it tends to, rightfully, move a lot slower than CSS or JavaScript.

---

## A group of details elements can behave like an accordion, among other improvements, but still have accessibility limitations

We’ve had cross-browser `<details>` / `<summary>` support since 2016, but only recently have the abilities started to expand and clean up.

For one, you can make an “exclusive” accordion by grouping them together via the `name` attribute:

```html
<details name="group"><summary>One</summary> ... </details>
<details name="group"><summary>At</summary> ... </details>
<details name="group"><summary>A</summary> ... </details>
<details name="group"><summary>Time</summary> ... </details>
```

Me, I mostly think the only-one-open-at-a-time thing is an anti-pattern ([<VPIcon icon="fas fa-globe"/>as do others](https://yatil.net/blog/exclusive-accordions)), mostly because it’s weird to close something a user may have intentionally opened via side effect. But the web is a big place and certain specific designs I can see needing it to be effective so I don’t hate that it exists. At least I think [<VPIcon icon="fas fa-globe"/>using the term “accordion”](https://daverupert.com/2019/12/why-details-is-not-an-accordion/) is now appropriate in this context, but that there are still potential accessibility issues. Like imagine using this for a FAQ section where each question would normally be a header like `<h3>`, well, the semantics of that `<h3>` is wiped out by the `<summary>`, which is a “button”, so that’s not great.

Here’s an example of the accordion pattern being used with a group of horizontally laid out details elements. If more could be opened, it could cause horizontal scroll which I sure we can all imagine also sucks.

<CodePen
  user="bramus"
  slug-hash="bGZbGZP"
  title="Styling <details>: Horizontal Accordion"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that those `<details>` elements are in a flexbox layout and are themselves `display: flex;` and only recently has that improved. (See [<VPIcon icon="fas fa-globe"/>Stephanie Stimac’s article](https://blog.stephaniestimac.com/posts/2024/10/html-details-and-summary-update/) on recent improvements.)

Ya know how the inside of a `<details>` is:

1. `<summary>`
2. … and whatever else

The “whatever else” can be one or more elements, and there isn’t any particularly clean way of selecting them. This is a CSS thing, but now we’ve got a `::details-content` pseudo-element selector to get our hands on *all* that HTML in case it needs similar treatment (imagine fading it all in or out).

Here’s a great demo of using that, as well as other brand new CSS features, to make honest-to-god animating open/close details elements with arbitrary content in just HTML and CSS.

<CodePen
  user="ZoranJambor"
  slug-hash="jOorzPv"
  title="Animate HTML Details Element Using Pure CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Styleable Selects are Coming

Browsers can’t just all the sudden make every aspect of a `<select>` and `<option>`s styleable, otherwise historical CSS that *didn’t* apply to them all the sudden *does* and it would wreak untold havoc on websites. The web doesn’t like to roll like that, and I applaud it for that backwards compatibility.

So… there needed to be an opt-in to make it work. A new element can work for that, which for a hot minute seemed like it would be `<selectmenu>`. But the progressive enhancement story for that basically sucked. So [<VPIcon icon="fa-brands fa-chrome"/>the new opt-in](https://developer.chrome.com/blog/rfc-customizable-select#opting-in_to_the_new_select) looks like it will be CSS triggered:

```css
select,
::picker(select) {
  appearance: base-select;
}
```

![[Demo (<VPIcon icon="iconfont icon-webdev"/>`web-dot-dev`)](https://codepen.io/web-dot-dev/pen/LYKqgXZ)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/select-fallback_1920.png?resize=1024%2C570&ssl=1)

<CodePen
  user="web-dot-dev"
  slug-hash="LYKqgXZ"
  title="Currency picker -- customizable select"
  :default-tab="['css','result']"
  :theme="dark"/>

Once you’ve opted in, you can apply styling to elements inside the `<select>` pretty freely, opening up huge doors to designing that experience.

There is some other funky things to know so I’d suggest reading [<VPIcon icon="fa-brands fa-chrome"/>this whole article](https://developer.chrome.com/blog/rfc-customizable-select). Even some new ([<VPIcon icon="fas fa-globe"/>tricky](https://jakearchibald.com/2024/how-should-selectedoption-work/)) HTML!

```html{2-4}
<select class="country-select">
  <button>
    <selectedoption></selectedoption>
  </button>
  <option value="" hidden>
    <figure></figure>
    <span>Select a country</span>
  </option>
  <option value="andorra">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/120px-Flag_of_Andorra.svg.png"
      alt=""
    />
    <span>Andorra</span>
  </option>
  ...
</select>
```

My favorite episode of Off the Main Thread this year was [<VPIcon icon="fas fa-globe"/>about styleable selects](https://offthemainthread.tech/episode/stylable-select-element/) and all the interesting details behind them that will have knock-on effects.

---

## Oh — also you can slap a line into a select menu

I kinda love how the old school `name` attribute was used with `<details>` for the accordion behavior.

And speaking of old school elements, you can put an `<hr>` within a `<select>` to just draw a line there (a “horizontal rule” as it were). You’ve still got `<optgroup label="label">` for more emphatic grouping, but sometimes a line is all you need.

```html
<select>
  <option>apple</option>
  <option>orange</option>
  <option>banana</option>
  <hr>
  <option>pepper</option>
  <option>squash</option>
  <option>broccoli</option>
</select>
```

<CodePen
  user="chriscoyier"
  slug-hash="OPLxpMV"
  title="Using an <hr/> in a <select> menu"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## You Can Open/Close a Popover with a Button Alone

No JavaScript is required to make the opening and closing of a popover work.

```html
<button popovertarget="the-popover">Open Popover</button>

<div popover id="the-popover">
  I'm a popover.
  
  <button popovertarget="the-popover">Close Popover</button>
</div>
```

If you’d prefer that the popover be closed by just a click anywhere outside of it (that’s called a “light dismiss”) then update the popover attribute to `popover="auto"` and that’ll do it.

The “targetting” you can see happening with those buttons is an example of an [<VPIcon icon="fas fa-globe"/>“Invoker”](https://thathtml.blog/2023/11/invokers-are-coming/), which is poised bring great power to HTML in coming years.

<CodePen
  user="chriscoyier"
  slug-hash="GgKvypJ"
  title="Popover Basics"
  :default-tab="['css','result']"
  :theme="dark"/>

You can’t close a popover with a form submission like you can a `<dialog>`, but a popover probably isn’t a great place for a form anyway so that’s fine. Another interesting sidenote is you can make a `<dialog popover>` if you like, getting you this button behavior for free.

[**There are quite a few differences between dialogs and popovers**](/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.md), and both are awfully useful. Perhaps the most important two features being the focus trap potential and the fact they are promoted to the “top layer” of the rendered site, meaning no futzing with `z-index`.

The situation we’re in with popovers is that you pretty much need to be OK with either centered or edge-based positioning for them for now, like dialogs. They are just begging for anchor positioning, but the [<VPIcon icon="fas fa-globe"/>current guess is 2026](https://blogs.igalia.com/plampe/contributing-to-css-anchor-positioning-in-webkit/) for interop on that.

---

## Checkboxes can be Toggle Switches

It’s as easy as:

```html
<input type="checkbox" switch>
```

Although only Safari supports it for now and it’s not actually specced yet so it could be said they jumped the gun a bit. [Main discussion here (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/pull/9546). And I guess we should call it a “switch” to be proper.

I’m a fan here because the absolutely correct implementation of a toggle/switch was easy to get wrong from an accessibility standpoint, and this seems… hard to get wrong.

<CodePen
  user="smashingmag"
  slug-hash="QWREJPR"
  title="Safari Switch Control - Basic"
  :default-tab="['css','result']"
  :theme="dark"/>

[**Daniel Yuschick has an article**](/smashingmagazine.com/switching-it-up-html-latest-control.md) digging into the details. I like the idea that pseudo elements specific to this UI will be exposed, like `::thumb`and`::track`, but I can’t tell you what the status of that is right now. Even [<VPIcon icon="fas fa-globe"/>the official demos](https://webkit.org/demos/html-switch/) in Safari Nightly Preview *with* the flag turned on aren’t rendering properly for me.

---

## Wrap your Search

This will be easy to remember. Got an area of your site that is meant for searching? Wrap it.

```html
<search>

</search>
```

It’s the same as doing `<div role="search">`, but my bet is that you’ll actually remember to do it.

---

## You probably don’t need noopener noreferrer on links anymore

I’ve used linters on projects that help ensure that a link like:

```html
<a 
  href="https://google.com" 
  target="_blank"
>
</a>
```

Has attributes like this as well:

```html{4}
<a 
  href="https://google.com" 
  target="_blank"
  rel="noopener noreferrer"
>
</a>
```

::: info Ben Werd (<VPIcon icon="fas fa-globe"/><code>werd.io</code>)

<SiteInfo
  name="Browsers imply noopener for links in new tab"
  desc="A small web development thing I&rsquo;d missed until yesterday: When you want a link to open a page in a new tab, you&rsquo;ve long been able"
  url="https://werd.io/2024/browsers-imply-noopener-for-links-in-new-tab/"
  logo="https://werd.io/file/5d388c5fb16ea14aac640912/thumb.jpg"
  preview="https://werd.io/werdio-share.png"/>

> The problem was, that actually gave the opened pages rights to their referrer: it opened a security hole that could potentially have leaked user information or opened the door to phishing.

:::

This is not new “2025” information, but I’m only just learning that this isn’t really needed anymore. Chrome was [<VPIcon icon="fa-brands fa-chrome"/>the last to automatically apply this behavior](https://chromestatus.com/feature/6140064063029248) to `_blank` links and that was 2021. I’ve been doing it as I have a linter that always warns me about it, so in case your browser support targets agree, you might want to check those linter settings.

---

## Declarative Shadow DOM Paves the Way for Better Web Component Frameworks

It used to be that if you wanted a Web Component to use Shadow DOM, the only way to do it was for it to be rendered by JavaScript. This meant that Web Components that wanted or needed to use Shadow DOM had no Server Side Rendering (SSR) story at all. That was a big gap, as all the major UI frameworks have coalesced on the idea that SSR is a good idea for many reasons (performance (perceived and actual), resilience, SEO, hosting options, etc).

Now we’ve got [<VPIcon icon="fas fa-globe"/>Declarative Shadow DOM](https://12daysofweb.dev/2024/declarative-shadow-dom/) and the gap has closed.

I think it’s cool to see the Shadow DOM at work with no JavaScript at all:

![[Demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/pvzWqye?editors=1000)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/Screenshot-2025-01-01-at-10.03.35%E2%80%AFAM.png?resize=963%2C1024&ssl=1)

What I hope we’ll see in 2025 and beyond is frameworks actually help use this. It feels like foundational technology that mostly isn’t expected to be written by hand by authors, but instead used by libraries/frameworks to build great authoring experiences around.

React 19 was the last framework to [<VPIcon icon="fas fa-globe"/>fully correctly support Web Components](https://custom-elements-everywhere.com/), so perhaps we’ll see frameworks do more than support them now but embrace them. I would expect to see a “Next.js of Web Components” at some point.

---

## Import Maps

I used to be fond of point out that a line like this *isn’t standard JavaScript.*

```js
import React from "react";
```

That looks like ES Modules code, but the fact that the value in quotes doesn’t start with an absolute URL or a `.` (a relative path) means it’s… not. It’s just a convention that we all got used to writing because JavaScript bundlers understand it to mean “that’s a thing from npm so I should go look for it in the `node_modules` folder.

That’s changed now, since you can, via HTML [<VPIcon icon="fa-brands fa-firefox" />Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap), map the value “react” to something else via Import Maps.

So if you executed that JavaScript above from an HTML file that included an import map like this:

```html
<script type="importmap"> {
  "imports": {
    "react": "https://esm.sh/react@18",
    "reactdom": "https://esm.sh/react-dom@18"
  }
}
</script>
```

<CodePen
  user="chriscoyier"
  slug-hash="EaYbwKM"
  title="Using React with an Import Map"
  :default-tab="['css','result']"
  :theme="dark"/>

It would work and import the JavaScript from those locations instead. This opens up the door for *not needing to use a bundler* and still having the benefit of an abstraction for importing dependencies. Having the possibility to avoid tooling can be huge for long term maintenance of projects.

---

## Don’t Sleep on the `inert` Attribute

You can make an element, and the entire chunk of DOM under it, ignored completely from an interactivity perspective, just by by using the `inert` attribute. It’s quite powerful. No clicks, no focus, the element(s) are gone from the accessibility tree, nothing can be selected, heck, the on-page “find” command won’t even find text within there.

If you’ve got any reason at all to put stuff in the DOM but have it essentially behave as if it isn’t there, make it `inert` until you are ready for it not to be. Imagine a multi-step form that is all in the DOM right away, but only one step at a time is *not* inert, so future or previous form controls aren’t accidentally used until ready.

I’d tell you this is ideal for implementing modals, but you get this behavior for free, and easier because it can be placed anywhere, just by using `<dialog>`.

---

## Keep your find-on-page working properly

Another interesting attribute here. We’ve long had `hidden` as an attribute (even though it’s [<VPIcon icon="fas fa-globe"/>kinda weak](https://meowni.ca/hidden.is.a.lie.html)). The change here is it taking a value, like `hidden="until-found"`. That will hide the element as `hidden` does, but the content within it will still be findable with on-page text search. When it is found, ~it’s on you to react to the DOM event `beforematch` to un-hide (by removing the attribute) the content so it can be seen~ the `hidden` attribute is removed automatically, plus you’ve got the `beforematch` event to hook into if you need to do additional work.

Here’s the demo [<VPIcon icon="fa-brands fa-chrome"/>from chrome for developers](https://developer.chrome.com/docs/css-ui/hidden-until-found), which you might need to try [in Debug View (<VPIcon icon="fa-brands fa-codepen"/>`web-dot-dev`)](https://cdpn.io/pen/debug/JjMxmom) for it to trigger properly.

<CodePen
  user="web-dot-dev"
  slug-hash="JjMxmom"
  title="hidden='until-found' demo"
  :default-tab="['css','result']"
  :theme="dark"/>

You’d think this would be useful for `<details>` elements in how they hide content, but this behavior is baked into them. This is more solid evidence for using native features — because they get the details right (generally) rather than you needing to replicate them.

---

## Multi-Page View Transitions

You have to opt-in to this via CSS like:

```css
@view-transition {
  navigation: auto;
}
```

Then once you have, regular ol’ clicked links that move to a new page (on the same domain) can have view transitions. That is, you’ll see the page use a fade effect by default. But this unlocks an amazing amount of animation control over the transition between those two page loads.

I’m listing this as an HTML feature, because I find most of the useful-ness of multi-page view transitions are unlocked in the HTML. For instance…

```html{4,12}
<!-- homepage -->
<div class="card">
  <h3
    style="view-transition-name: post-title-087afd"
  >Blog Post Title</h3>
  <p>...</p>
  <a href="/blog-post">Read the article Blog Post Title</a>
</div>
<!-- blog post -->
<article>
  <h1 
    style="view-transition-name: post-title-087afd"
  >Blog Post Title</h1>
  <p>...</p>
</article>
```

Above, I’m imagining the “card” as a component that is generated from data and is likely one of many on the page. So it *requires* having a *unique* `view-transition-name`, and really the only good opportunity to apply that is in HTML.

---

## Responsive Video is catching up to Responsive Images

With the `<picture>` element in HTML we get the ability to use the `<source>` element within and control exactly when we swap out to different source *images*. It’s a powerful concept that can offer big performance wins.

That idea actually originally came from a concept with the `<video>` tag, but then that was bizarrely removed from (most) browsers. But now it’s back thanks to [<VPIcon icon="fas fa-globe"/>some serious work by Scott Jehl](https://scottjehl.com/posts/responsive-video/) and others he convinced to help the revival along.

You can do `media` attribute control the sources, which will probably mostly be used for width query stuff, but it can do anything media can do. [<VPIcon icon="fas fa-globe"/>Scott wrote up some examples here](https://htmhell.dev/adventcalendar/2024/19/), like:

```html
<video autoplay controls playsinline muted loop>
  <source media="(orientation: landscape)" src="sunset-landscape-1080.mp4">
  <source src="sunset-portrait-1080.mp4">
</video>
```

---

## HTML Imports are Coming Back

Just kidding they totally aren’t.

---

## Did we miss anything?

Any newfangled HTML out there you’ve been eyeing up or using?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Relatively New Things You Should Know about HTML Heading Into 2025",
  "desc": "Accordion details, toggle switches, styleable selects, responsive video, and more! ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/bone-up-html-2025.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
