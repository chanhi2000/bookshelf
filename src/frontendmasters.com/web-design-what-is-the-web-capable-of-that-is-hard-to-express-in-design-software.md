---
lang: en-US
title: "Web Design: What is the web capable of that is hard to express in design software?"
description: "Article(s) > Web Design: What is the web capable of that is hard to express in design software?"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Web Design: What is the web capable of that is hard to express in design software?"
    - property: og:description
      content: "Web Design: What is the web capable of that is hard to express in design software?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software.html
prev: /academics/system-design/articles/README.md
date: 2025-08-18
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6030
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Web Design: What is the web capable of that is hard to express in design software?"
  desc="The web platform has a heaping helping of more design capability built into it than any design software does."
  url="https://frontendmasters.com/blog/web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6030"/>

*Designs aren’t websites, they are pictures of websites.*

I heard someone say that once while lamenting the state of design software for web design.

At some point, I think all web designers circle around to the thought that if design software was only *more like the web itself* that it would be better for it. We would gain efficiency in that there may not need be much translation at all between design and the finished product. Time and quality suffer during the translation required now.

We could look at all the different things tried to bridge this gap. There are many — all of varying interest. I believe it is safe to say that none of them have “won”. Tools that replicate the features of the web faithfully have trouble with complexity and finding an audience that wants that. Even the prevailing web design tool today, Figma, runs *on* the web but the designs you create there are not really *of* the web. You’re drawing rectangles on a `<canvas>` there, not crafting `<div>`s. And while some of those abstractions in Figma are designed to *replicate* web features, they are that: a replication, not reality.

But instead of looking at takes on design tool abstraction, I’d rather enumerate many of the things that make design tools that replicate the web difficult.

Staring, naturally, with this most basic of web design concepts.

---

## Link & Button States

Most sites have a style for links and buttons, and design software has no problem accommodating that. But those styles change in different states. What happens when you hover them? Click them? Tab to focus them? Those can (and should) have different designs, but static design software doesn’t always accommodate that very well, leaving you to invent your own system for how to represent it.

![I don’t find `:active` states particularity common, likely because design software doesn’t care to prompt you into state-based design.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/states.png?resize=734%2C377&ssl=1)

---

## Color Modes

Speaking of state, you could think of light/dark mode as a state for the entire design of the website.

Looking at the button designs above, if you put a very dark background instead of the light tan, those dark brown button borders will not be very visible if at all. It’s a designer’s job to consider that, plan for that, and design for that. Can/should/does your design software help with that?

Color modes are complicated anyway, as the choice of a color mode can be set as low-level as the operating system the browser is running on, the browser may change the mode, the browser may offer site-specific color mode settings, and the site itself may offer code mode settings of it’s own. And perhaps more than just light and dark!

Not to mention accessibility considerations. There has been experimental features like browsers than can force sites into certain color modes, and long-standing accessibility features like High Contrast mode on Windows. Does your design software help you with designing for those states?

![From [“Windows High Contrast Mode, Forced Colors Mode And CSS Custom Properties”](https://smashingmagazine.com/2022/03/windows-high-contrast-colors-mode-css-custom-properties/) by Eric Bailey](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/1-windows-high-contrast-mode-forced-colors-mode-css-custom-properties.png?resize=1024%2C649&ssl=1)
<!-- TODO: /smashingmagazine.com/windows-high-contrast-colors-mode-css-custom-properties.md -->

---

## Variables

Speaking of code modes, maybe the way you’re handling that is through variables, or custom properties in CSS. Does your design software have a way of specifying variables? Then setting state in various places that change the values of those variables? I can answer that for you: it probably doesn’t. Even if it has a *concept* of variables, it’s likely abstracted in a way that doesn’t work quite like the web does. The key difficulty being that CSS custom properties cascade through the DOM and can be set/adjusted at any level. This isn’t particularly feasible in a static design, as the DOM is not a concept they are concerned with.

---

## Any Other Kind of State

What about the loading state of dynamically loaded data in your app? Do you have a plan for that? Spinners? Skeletons? Nothing? Do they take up the appropriate space to avoid layout shifting? Are you using some kind of placeholder technique for images? Did you *design* this stuff in your design tool? Or do you just skip over it and deal with it as a forlorn implementation detail?

What about error states?

What about the state where a paying user’s credit card has lapsed and they no longer have access to certain features?

I find that “different states” is a tricky concept for design tools. They tend to just ignore it and let you invent how you want to handle it yourself, which usually amounts to: draw another rectangle nearby and design the alternate state in there — if you remember to.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-15-at-11.31.15-AM.png?resize=1024%2C384&ssl=1)

Good designers will work from design documents that spell out the differnet necessary states to deal with and organize the documents to showcase those important states. But it can also be true that there are so many permutations of bits of state that hand-designing each one is too much to be practical for most design tools, so they end up more like vague sketches of the somewhat random combinations of state.

---

## Viewport Sizes

Responsive design is so locked in that design tools largely can’t ignore it. But they also tend not to nail it either. I find the most common approach is the: *Uhhh I guess just design a largish-one, a pretty small one, and something in between. Then just made educated guesses for stuff in between.*

![This can and does work fine sometimes.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-15-at-11.34.57-AM.png?resize=1024%2C766&ssl=1)

But when I say it *doesn’t nail it*, it’s because it doesn’t communicate things in a way that is perfectly relevant to what the web can do. For instance, those two columns of type above, is that saying… *always do two columns until the 799px breakpoint then do one column?* That seems like a reasonable read, but… maybe the breakpoint should be driven by the direct parent not the whole viewport? Maybe at really wide widths it could go up to more columns? How flexible are those column widths? Do they have a min and max? Should we be thinking about how paragraphs break across them? What if an image or other media goes into the columns, should it behave in any special way?

What about the font sizing in the example above? The biggest bit of text definitely changes size, but how? Fluidly? Set sizes at set breakpoints? Does *all* type do that or just some? How can we *design* that?

There is so much to think about with fluid, responsive design. Design tools I feel barely scratch the surface, and it’s been a good decade-and-a-half here. What would it be like to stop thinking about fixed breakpoints at all?

---

## Anything Scrolling or Mouse Movement Related

At the most basic level, we already rarely deal with styling scrollbars at all. Static designs are designed such that you see the entire page from header to footer. Does this affect how we prioritize content? Do we think about how much scrolling is too much?

But more to the point, there are lots of web design possibilities specifically related to scrolling. Think about `position: fixed;` — how do you represent that on a picture of a website? Consider the different possibilities of `background-attachment`, can a static design explain that? Smooth scrolling? Scroll snapping? What about all the [**CSS carousel**](/frontendmasters.com/quantity-query-carousel.md) stuff?

<VidStack src="videopress/9510cd5d-2144-45ab-99ce-0f69759564a2" />

---

## Variable Content

Another classic! Static designs tend to have “happy path” content where the images are beautiful and the content fits perfectly into the layout.

![Some classic `lorem ipsum` text in here. It gets ridiculed sometimes because it means you aren’t designing around even a *single* real world design situation let alone the *many* that are likely needed.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-16-at-1.08.34-PM.png?resize=990%2C536&ssl=1)

What if that card design above had 12 tags? It would probably look silly if they wrapped, pushing the more-important header too far down. What if one of the tags was “**Hamlet in Northumberland, England**“. Will it break the container?

It looks like the header above is already truncated to two lines. It’s nice we can do that on the web, but as Karen always reminds us, [truncation is not a content strategy (<VPIcon icon="fa-brands fa-x-twitter"/>`karenmcgrane`)](https://x.com/karenmcgrane/status/1288301727997931520?lang=en). Does the CMS get involved to limit things? Are design people at the CMS meetings so that good design ideas can be a part of the decision making process?

What if there isn’t *enough* content? Will this card work without the description text? Without a photo or author?

What about translation? That’s a big one as [**sites are translated whether or not you deal with it**](/frontendmasters.comto-flip-or-not-to-flip.md). Can languages that translate with generally more characters than the original language find enough room?

---

## Units & Math

CSS has interesting, real, meaningful units. Sure there are “pixels” and that’s all well and good, but we’ve got relative units that relate to each other and are flexible with user settings. We’ve got percentages. We’ve got typography-relational units. We’ve got units relative to the viewport or the container. And quite a bit more!

Design tools don’t even go there with units. They tend to be unitless.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/Screenshot-2025-08-18-at-10.31.57-AM.png?resize=698%2C588&ssl=1)

Something is “244” wide, which is probably best mappable to `px`, but doesn’t actually say `px` because the exported files may or may not actually map to that number. Units alone represent a significant devide between static designs and real website implementations.

And then there is the slew of functional calculations possible on the web available in JavaScript and CSS. Your `calc()` and `tan()` and `min()` and `clamp()` and the slew of other functions that help express interesting design intent are largely absent in design tools.

Even a real practical grid layout like:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(100px, auto) 4fr minmax(100px, 1fr);
}
```

Above, I’m trying to say: *the 1st column is a navigation, so have it be as wide as the widest bit of content, but it’s allowed to be squished smaller, to a point, then the the widest, generally about 2/3rds of layout, and the 3rd column takes the leftover after that, and is allowed to squish smaller than `auto`.* That’s a mouthful, but it’s pretty practical/common and all but unexpressable in design tools.

---

## Animations & Transitions

Transitions can be *so simple*. Here’s just a smidge of scaling on some element on hover:

<VidStack src="videopress/5ed8723e-115e-4fa3-bd4d-fa4a97f9de34" />

<SiteInfo
  name="Sarthak Mishra - Designer who codes!"
  desc="Welcome to my corner of the web where I write about design, code, startups and just about anything that interests me."
  url="https://sarthakmishra.com/"
  logo="https://sarthakmishra.com/favicon.svg"
  preview="https://sarthakmishra.com/sarthak-og-image.webp"/>

Even that, does your design tool make that easy to mock up? And thus show to your team and talk about and get signoff or whatever is needed? It seems to me these types of things tend to come later in the process. Like they get slapped on during implementation because code is such a better place to explore and play with these ideas. Maybe that’s OK. Maybe that’s a shame that design tools to make it easier to think through these things during initial design.

From the same nice website as above, look at these slightly more complex transitions:

One look at [<VPIcon icon="fa-brands fa-youtube"/>a GSAP showreel](https://youtu.be/ic-bHSoIUaA&list=PLLLrVKlAVicLCG0u8WkwLueVU40z0U456&index=2) and you gotta wonder: *how much of this is done in a design tool vs how much of this is just people who know how code works just getting into the browser and just working there?*

<VidStack src="youtube/ic-bHSoIUaA" />

Animation isn’t an isolated concept here either, it can be linked to scrolling and state, for instance.

---

## Device-Specific Details

How do you mockup handling the touch target requirements for devices with touch screens? Are you thinking about where people normally have their thumbs? Have you done everything you can to make form input good, particularly for on-screen keyboards? Do you think you might have to make some design choices for low-bandwidth situations? Did you make a mockup for landscape mode? How’s that information hierarchy on a tiny screen?

What about big ol’ 1980px wide screens with browsers open on the entire thing, which isn’t even particularly rare! Or even bigger — does the design hold up? Are you implementing appropriate cursors in appropriate situations for systems with a mouse? For eCommerce sites, have you thought about designing the checkout experience differences between browsers that support Google Pay vs Apple Pay and those types of differences?

Some of this stuff design software is fine at. They can’t anticipate every design need for every app, that’s on you, so you do the work. But some stuff is just *hard* in design software. It certainly isn’t going to help you design appropriate cursors, for instance.

---

## Media Handling

Did you mock up how videos are integrated into the site? Are you doing anything with audio? More exotic stuff like a 3D viewing experience? You’re likely to be faking parts of it at best in static designs.

---

## So Many More Things

I’m not trying to dog on design software. I actually quite like a lot of design software, and think it’s often an ideal place for ideas to start and early marination of design choices. Sometimes design software frees up the mind to think about design choices you may not make once you’re in code. An example of that might be something like strangely-overlapping elements which is easy to do while dragging rectangles around in design software, but harder think of once they are `<div>`s.

But then it ends up as like… 5%? Five percent of the *time* *spent* in the design software getting ideas going, and the rest of the time in the browser. And the rest of that time is *also design work.* Not just *implementation* but *design itself.*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Web Design: What is the web capable of that is hard to express in design software?",
  "desc": "The web platform has a heaping helping of more design capability built into it than any design software does.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
