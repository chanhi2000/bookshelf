---
lang: en-US
title: "The end of responsive images"
description: "Article(s) > The end of responsive images"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The end of responsive images"
    - property: og:description
      content: "The end of responsive images"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/the-end-of-responsive-images.html
prev: /programming/css/articles/README.md
date: 2026-04-23
isOriginal: false
author:
  - name: Mat Marquis
    url: https://piccalil.li/author/mat-marquis
cover: https://piccalil.b-cdn.net/api/og-image?slug=the-end-of-responsive-images/
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
  name="The end of responsive images"
  desc="Mat Marquis has waited 14 years to write this article. The sizes attribute has been a necessary evil but now, with an auto value capability, it’s completely transformed authoring responsive images on the web."
  url="https://piccalil.li/blog/the-end-of-responsive-images"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=the-end-of-responsive-images/"/>

I’ve been waiting for fourteen years to write this article. *Fourteen years* to tell you about one relatively new addition to the way images work on the web. For you, just a handful of characters will mean improvements to the fundamental ergonomics of working with images. For users, it will mean invisible, seamless, and potentially *massive* improvements to front-end performance, forever stitched into the fabric of the web. For me, it means the time has finally come to confess to my sinister machinations — a confession almost a decade and a half in the making.

Back then, I was the esteemed Chair of [<VPIcon icon="iconfont icon-w3c"/>the RICG](https://w3.org/community/respimg/) — the “pirate radio” web standards body responsible for bringing responsive image markup to the web platform. Some of you remember. Some of you were there at the advent of responsive web design, helping to find brand new use cases where the web platform fell short — as a scrappy band of front-end specialists rallied, organized, and crashed headlong into a web standards process that did not welcome them. We demanded a seat at the table alongside browser vendors, representing the needs of web designers and developers and the users we served. Our numbers swelled to the hundreds, and after years of iteration, countless scrapped draft specifications and prototypes, and endless arguments-turned-consensus across antique mailing lists and IRC channels, we finally arrived at a workable syntax hand-in-hand with browser vendors. Then we made it *real* — raised money from the community to fund independently-developed implementations in browsers, built the polyfills that would drive adoption, wired these new features up major CMSs, wrote articles and gave talks, and distributed — if I may say so — some of the best t-shirts the web standards game has ever seen.

I imagine just as many of you weren’t there for any of that, as ancient as that history is in web development terms. For you, responsive image markup has been around as long as you’ve been making websites — a dense, opaque, inexorable, *inescapable* aspect of the web platform, an arcane syntax and a constant source of frustration.

If you’re in the latter group, well, please allow me to introduce myself: *I did that*. Right here; eyes front — *me*.

Every time you tried and failed to figure out why the browser was selecting a certain source from `srcset`? You didn’t know it, but I was the one putting you through it. Every time you had to pull in some enormous third-party library to deal with a syntax very clearly not designed to be parsed by any human? Not only was I the cause, hell, I might have helped *write* it. When you ran some workflow-obliterating bookmarklet in hopes of generating a `sizes` value that mostly, *kind of* matched the reality of your layouts? When it was all too much; when you threw up your hands — gave up — and instead found yourself foisting huge source files upon countless users who might never see any practical benefit, but would bear all the performance costs? None of that was your fault. That was all me. Not only did I not *stop* these syntaxes from being standardized, I was the *flag-bearer* for responsive images — I fought *tooth-and-nail* for the markup you’ve cursed.

Oh-ho, and as if that wasn’t enough, here’s the part that will really make you mad: *I hate it all too*.

Every talk I gave and article I wrote on the subject — [<VPIcon icon="iconfont icon-webdev"/>the course](https://web.dev/learn/images) I wrote about images, the [<VPIcon icon="fas fa-globe"/>entire book](https://abookapart.com/products/image-performance) I wrote about images — all done through gritted teeth. There are parts of this syntax that I’ve hated since the moment I first set eyes on them — which, again, was the very same moment that I became their most vocal champion. I’m not sorry. I’d do it again.

---

## The Beast

Don’t get me wrong: I don’t hate *responsive images*. The problem needed solving, there are no two ways about that. Then, as now, [<VPIcon icon="fas fa-globe"/>the vast majority of a website’s transfer size](https://httparchive.org/reports/state-of-the-web?start=latest#bytesperpage) is in images. A flexible image requires an image source large enough to cover the largest size it will occupy in a layout — without responsive images, an image designed to occupy a space in a layout that’s, say, two thousand pixels wide at its largest layout sizes would mean serving *every* user an image source at least two thousand pixels wide. Scaling that image down to suit a smaller display is trivial in CSS, but the *request* remains the same — the user bears all the transfer costs, but sees no benefit from an enormous image source.

Remember, too, that this problem stems from an era where sub-3G connections were still common. There was no reliable way to tailor those requests to a user’s browsing context in a way that maintained browser-level performance optimizations — and ultimately, the solutions we got were effective, performant, and have saved *unfathomable* amounts of bandwidth for users. Responsive images, as a concept, are an *incredible* addition to the web platform. I’m proud to have been able to play a small part in it.

Hell, it’s not even that I wholesale don’t like the responsive image *syntaxes*. Not all of them, anyway. `picture` I liked from the very beginning. Granted, that’s a **prescriptive syntax**, and it represents a very different set of use cases from “I just want fast images.” The `picture` element is for *control* — the siren song that has called out to designers and developers of all stripes since time immemorial, and I’m no exception. Control over sources, control over the conditions used to determine whether they’re requested, even control over whether the browser should bail out of the source selection algorithm entirely to the tune of “nevermind, don’t load any source” — it took me a while to come around on that last one, but I got there.

What’s not to like? Who wouldn’t want that level of fine-grained control? Not only that, but `picture` made it possible to responsibly serve brand new image formats with fast, reliable fallbacks across browsers, opening the door for incredible advances in encoding and compression without the need for a single scrap of JavaScript. The syntax makes perfect, readable sense, it provides us with a template [<VPIcon icon="fas fa-globe"/>for standardizing smarter decisions around *all* media requests](https://scottjehl.com/posts/responsive-video/), and it grows ever more powerful as more and more media queries are added to the platform. `picture` is great. I like `picture`; everyone likes `picture`. We’re not here to talk about `picture`.

`picture` is something altogether different from `srcset` and `sizes`, which represent a **descriptive syntax**. You use `srcset` to provide the browser with information about a set of image sources, identical apart from their dimensions, and `sizes` to provide the browser with information about how the image will be rendered, and at no point do you use either to tell the browser what to *do* with any of it. Once given this information, the browser can then use it to do exactly one (1) very complicated thing: determine the image source most appropriate for that user’s browsing context. Visually, the source selected from the list of candidates in `srcset` doesn’t matter to the user — the sources will all *look* the same — but the chosen candidate will best fit the user’s browsing context. You don’t get any control over how that decision is made. In fact, you don’t even get to *know* how that decision is made, by design — right down to an “explicitly vague” step in the source selection algorithm, carved into the HTML specification itself:

::: info "4.8.4.3.7 Selecting an image source" *From HTML Standard* (<VPIcon icon="fas fa-globe"/><code>html.spec.whatwg.org</code>)

> In an implementation-defined manner, choose one image source from *sourceSet*.

```component VPCard
{
  "title": "4.8.4.3.7 Selecting an image source | HTML Standard",
  "desc": "To select an image source given an img element el:...",
  "link": "https://html.spec.whatwg.org/multipage/images.html#selecting-an-image-source",
  "logo": "https://resources.whatwg.org/logo.svg",
  "background": "rgba(102,170,255,0.2)"
}
```

:::

::: info "2.3. Terminology" *From Infra Standard* (<VPIcon icon="fas fa-globe"/><code>infra.spec.whatwg.org</code>)

> If something is said to be implementation-defined, the particulars of what is said to be implementation-defined are up to the implementation. In the absence of such language, the reverse holds: implementations have to follow the rules laid out in documents using this standard.

```component VPCard
{
  "title": "2.3. Terminology | Infra Standard",
  "desc": "The word “or”, in cases where both inclusive “or” and exclusive “or” are possible (e.g., “if either width or height is zero”), means an inclusive “or” (implying “or both”), unless it is called out as being exclusive u...",
  "link": "https://infra.spec.whatwg.org/#implementation-defined",
  "logo": "https://resources.whatwg.org/logo-infra.svg",
  "background": "rgba(102,170,255,0.2)"
}
```

:::

Unsettling, isn’t it? “Then the browser,” in strict technical terms, “just does *whatever*.” That formally codified lack of control didn’t just *happen*; that buck could have stopped with me, but no. Instead, I personally thumbs-upped the decision that you should not have any say in how `srcset`/`sizes` work — that you can’t even *know* how they work. Now, after all these years — with this, the reveal that I’ve been the villain of the story all along — I can finally tell you why. You’re not gonna like it one bit, either. It’s because I know you would have done it wrong.

---

## A human work

Don’t take it too personally, I would’ve done it wrong too. Hell, I *did* do it wrong, through countless proposals and prototypes, in search of a solution that could be standardized — everybody did. In the end, all that iteration only proved that *nobody* could have gotten this part right. That “one thing” that `srcset`/`sizes` does — determining the image source best tailored to a user’s browsing context, including viewport size, display density, user preferences, bandwidth, and countless other potentially unknowable factors? Those factors include things we *can’t* know, and just as many things we *shouldn’t* know.

For example, we can’t tailor asset delivery to a user’s connection speed, which seems like a shame. For a moment, though, let’s imagine we could — imagine we were able to say “use *that* source above this speed, and *that* source below it.” Now that those decisions are yours to control: what connection speed thresholds would *you* set for your image sources, and what would I set for mine? They’re different, I bet. That means that for a given connection speed, a user might get beautiful but bandwidth-obliterating image sources on one site, and highly compressed but wonderfully efficient ones on the next one. Which of those does that user actually *want*? Well, trick question, they’d all want something different, wouldn’t they? What would your *organization* want? Uh oh. Everyone is looking to you now — you, with the open tickets, and a meeting in half an hour, and all this *control* foisted upon you by the specification. Why does the website feel so slow? Why do our images look worse than our competitors’ now? *Why does the website feel so slow again?* Even when we’re *only* considering connection speed, the cost of our having more control is the user giving up *theirs*, and that’s before we’ve considered every other factor *besides* connection speed.

I didn’t want that; I didn’t want that for the people who build the web, I didn’t want that for people using the web, and I sure as hell didn’t want to see the web itself buckle under the strain of a million massive image files backed by a hundred thousand `figure out our responsive images policy in excruciating detail when we have time` issues buried in trackers forever.

The browser has access to a lot more information than we do — certainly more than we should reasonably *want* access to — so it can make decisions about screen size and display density and bandwidth and user preferences and any number of future factors we can’t even imagine, without making any of it our problem. The browser can decide how to finesse details, like avoiding wasted requests by retaining larger sources rather than requesting functionally identical smaller ones if the larger sources already exist in the cache — I wouldn’t want to own that logic. The browser can poll preferences set by a user, to give *them* control over these decisions and ensure a consistent experience from one site to the next.

Ultimately, we don’t need control when it comes to optimizing an image request. We just want *faster images*, and `srcset` and `sizes` cover that use case handily — better than you or I ever could, if we had to. It would be miserable if we *had to*. A descriptive syntax avoids this whole nightmare for us, and allows the browser to do what it does best: use the information it has at hand to make a single, efficient request for an image source — something *only* the browser can do. We just have to provide it with what little information it *doesn’t* have.

Honestly, `srcset` isn’t even that bad, all things considered! Every CMS, static site generator, and build tool in the world can churn out a quick comma-separated list of generated image sources and their widths. Then the more of those values you put in the attribute, the more efficient and tailored the image requests can be; no fuss, no muss, no user-facing costs beyond a few extra bytes of markup. Pretty tidy little syntax, all things considered. I like `srcset` fine. It’s *fine*. We’re not really here to talk about `srcset` either.

Responsive images aren’t a problem. `picture` isn’t a problem; `srcset` isn’t even the problem.

We both know what the problem is.

---

## The `sizes` dilemma

A browser can’t know about the space an image will occupy in a layout because it makes decisions about image requests long before it has the information it needs to *render* that layout — there’s nothing there for it to measure. The viewport size is available to the browser at that point, sure, but that’s a terrible proxy for the size of a rendered image in a real-world layout. The web isn’t made out of full-bleed “hero” images, it’s made up of columns and grids and sidebars and “cards” and smatterings of little round user avatars. Assuming that an image source should never be larger than the user’s viewport is a good start, sure, which is why an omitted `sizes` attribute (invalid, per the specification) behaves as though it were `sizes="100vw"` . That’s better than nothing, but not by much. So, instead, you and I are left describing the all of the sizes that an element will be, across every breakpoint and container query, as a single string, in an *HTML attribute*. How disgusting.

Precisely because it requires information about the surrounding layout, `sizes` resists automation in any meaningful way. A build process can’t know the space an image will occupy across layouts without introducing a *tremendous* amount of overhead to that process — to the tune of “build everything, render the whole site, take measurements for every image on every page, generate `sizes` values for them all, and *then* continue the build.” So instead we’re left to generate that description *manually* — but except in very, very simple cases, we *can’t* calculate a `sizes` attribute without tooling. Describing the sizes of a flexible image will require far too much calculation across breakpoints. `(min-width: 1340px) 257px, (min-width: 1040px) calc(24.64vw - 68px), (min-width: 360px) calc(28.64vw - 17px), 80px` is an example from a *relatively simple layout*, and there’s *no way* anyone could be expected to write this. I mean, *how* — from, what, resizing your browser and squinting? *Guessing*? `sizes` is one of the few markup patterns that all but *require* the use of tooling, which the furthest possibly cry from the web’s “open any text editor and you can build a website” ethos — something I value *tremendously*. Hell, even if you *did* manage to factor it all out, to describe it with *media queries* — to use a *prescriptive* syntax as a *descriptive* syntax, by using them to say “above this size, *this is what happens*” rather than “above this size, *do this*” — I feel sick. I hate `sizes`. I have *always* hated `sizes`.

That’s why I’m here. That’s why I’m writing this, finally, after all this time. I’m not here to apologize for `sizes`. I’m here to help *bury it*.

---

## The beginning and the end

A few weeks ago, two patches landed in [<VPIcon icon="fa-brands fa-firefox"/>Gecko](https://bugzilla.mozilla.org/show_bug.cgi?id=1819581) and [<VPIcon icon="fa-brands fa-safari"/>WebKit](https://bugs.webkit.org/show_bug.cgi?id=310025) — championed by Simon Pieters and Yoav Weiss, respectively, two of the RICG’s finest. These patches landed to little fanfare, quietly aligning Gecko and WebKit with [<VPIcon icon="fa-brands fa-chrome"/>Blink](https://issues.chromium.org/issues/40862170#comment27) in supporting a relatively recent addition to the HTML specification: support for an `auto` value in `sizes` attributes. Automatic `sizes` — the potential sizes of the rendered image, left up to the browser to determine alongside all those other factors. Fully automatic responsive images. Supply the browser with a list of candidates using `srcset`, bolt on `sizes="auto"`, and let the browser do the rest.

How? Well, the central issue with `srcset`/`sizes` was one of timing, remember: “a browser makes decisions about image requests long before it has any information about the page’s layout, so we had to provide it with that layout information.” That assumption is no longer strictly true. That’s still the *default* behavior, yes: if there’s an `img` in your markup, the request it triggers will be fired off long before any information about the layout can be known — that is, unless that image uses the `loading="lazy"` attribute, an *exceptionally* common best practice for all but the images most likely to appear in the user’s viewport at the time the page is first loaded. Adding `loading="lazy"` to an `img` changes that entire equation — now those images are requested at the point of user interaction, long after the browser has all the information it needs about the sizes of the rendered image. The browser doesn’t need us anymore, and all’s right in the world.

I bet you’re waiting for a catch. Well, if you’re worried about browser support, don’t be — upon encountering the string “auto” at the start of a `sizes` attribute, any browser with support for it will say “figure it out myself; got it,” ditch the rest of the `sizes` attribute, and move on — browsers without support will throw the meaningless-to-them `auto` value out and continue on to the rest of attribute as usual. That means you can start using this right now, at absolutely zero cost and with no more overhead than typing `auto,` at the start of a `sizes` attribute:

```html
<img 
  loading="lazy"
  src="TrIZjHKy9-650.jpeg" 
  srcset="GTrIZjHKy9-650.jpeg 650w, GTrIZjHKy9-960.jpeg 960w, GTrIZjHKy9-1400.jpeg 1400w"
  sizes="auto, (min-width: 1040px) 650px, calc(94.44vw - 15px)"
  alt="…">
```

Not the first four-letter word `sizes` has inspired me to use, but certainly the one with the most positive result.

This approach is exactly what WordPress is now using [<VPIcon icon="fa-brands fa-wordpress"/>thanks to a patch from Joe McGill](https://core.trac.wordpress.org/changeset/59008), another RICG alum still fighting the good fight.

---

## You do (not) need `sizes`

Granted, it’s not *over* — you’ll still need descriptive `sizes` values now and then. An image likely to appear in the user’s viewport when a page first loads is a situation where you wouldn’t want to use `loading="lazy"` (again, `sizes="auto"` will *only* work with lazyloaded images), but these images are the exceptions, not the default.

Those few exceptions — the images all but certain to appear in the user’s viewport way up at the top of the page, your most likely [**Largest Contentful Paint**](/web.dev/lcp.md) elements and thus poor candidates for `loading="lazy"`? Well, you saw one in your mind just now, didn’t you? You imagined a big “hero” image; the kind of images that, say, occupy the full viewport width, or close to it? Relatively easy to describe across breakpoints? Maybe even somewhere in the ballpark of — I dunno, just to pull a value out of thin air — `sizes="100vw"`. Every other image — all those images scattered throughout columns and grids and sidebars and “cards” and smatterings of little round user avatars that the web is really *made* out of? `loading="lazy" sizes="auto"`. Job done. Congratulations.

I won’t miss all those hand-hewn `sizes` attributes; I never had any love for them to begin with. I will never experience a shred of nostalgia for a thing that I helped make real and inexorably bound to my name. A syntax was never the goal; the goal was always a *mechanism*. At the time, the web platform lacked a way for browsers to make smarter decisions about what image asset to request and when, and no amount of clever scripting or markup trickery would ever result in an asset request as fast or efficient as one the browser itself could make. We got that mechanism — and I made all of us pay the cost of it, for the sake of our users and for the health of the web.

So, to any of you designers and developers who’ve wrestled with `sizes` attributes in the past: go ahead and render an image of me — *any size you want* — print it out, and stick it to your nearest dartboard. I hold my head high and I offer you no apology. I was right about this; *we* were right about this. I stand by the need for a declarative syntax. I stand by it every bit as much as I wish it could’ve been something better, and every bit as much as I know it *couldn’t* have been, at the time. Sure, I bristle at the idea of giving up control as much as the next developer, but when it comes to high-performance images we could never have had any in the first place — not really. It would’ve been hubris to even try. As frustrating as it can be to give up control, *owning* responsive images would be a burden; a *curse*.

Ask me how I know.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The end of responsive images",
  "desc": "Mat Marquis has waited 14 years to write this article. The sizes attribute has been a necessary evil but now, with an auto value capability, it’s completely transformed authoring responsive images on the web.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/the-end-of-responsive-images.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
