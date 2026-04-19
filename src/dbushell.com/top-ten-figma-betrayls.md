---
lang: en-GB
title: "Top ten Figma betrayals"
description: "Article(s) > Top ten Figma betrayals"
icon: fa-brands fa-figma
category:
  - Design
  - Figma
  - Article(s)
tag:
  - blog
  - dbushell.com
  - design
  - figma
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Top ten Figma betrayals"
    - property: og:description
      content: "Top ten Figma betrayals"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/top-ten-figma-betrayls.html
prev: /tool/figma/articles/README.md
date: 2026-03-24
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-03-23-top-ten-figma-betrayls.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Figma > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/figma/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Top ten Figma betrayals"
  desc="The one where I discuss classic Figma mistakes (not a listicle)"
  url="https://dbushell.com/2026/03/23/top-ten-figma-betrayls/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-03-23-top-ten-figma-betrayls.png"/>

Figma is the industry standard for painting pretty pictures of websites. It’s where designers spend my designated dev time pushing pixels around one too many artboards. Figma promises to remove the proverbial fence between design and development. In reality it provides the comfort of an [<VPIcon icon="fas fa-globe"/>ideal viewport that doesn’t exist.](https://viewports.fyi/)

I don’t mind Figma (the software), although I prefer [<VPIcon icon="iconfont icon-penpot"/>Penpot](https://penpot.app/) myself. I still dabble in the deceptive arts of web design. Don’t be thinking I’m out here hating on designers. I like to stick my nose inside a Figma file and point out issues before they escalate.

Below I cover classic Figma betrayals that I bet you’ve experienced. Betrayals happen when software promises more than it can deliver.

---

## Full-width banners

Take a gander at this amazing website design I whipped up in Figma to illustrate the most common betrayals. I told you I was a designer! I’ll evolve this design throughout the post. Figma has deemed 1440×1024 to be “Desktop” resolution so I’ve started there.

![Ah yes, I remember my first 45:32 aspect ratio monitor. Those were the days.](https://dbushell.com/images/blog/2026/figma-banner-1.avif)

In this mockup I’ve added a full-width banner of our hero *Johnny Business*. I’ve built this website far too many times than I care to remember. I’ll repeat the same question here I ask every time I build it: what happens at other viewport sizes?

Do I scale the banner proportionally?

![The banner image has scaled proportionally to fit a wider viewport.](https://dbushell.com/images/blog/2026/figma-banner-2.avif)

On wider viewports this is likely to push content out of sight. It might even require scrolling to see the entire image on Johnny’s ultra-wide 8K. The phrase “above the fold” will be spoken in a *Teams* call, can we avoid that?

Do I also set a maximum height on the banner?

![The banner image has stretched horizontally but is cropped vertically with the man's head out of frame.](https://dbushell.com/images/blog/2026/figma-banner-3.avif)

This is going to decapitate poor Johnny! He paid a lot for that haircut.

---

## Focal points

What are we doing below the “Desktop” viewport, by the way? Let’s design for the 402×874 resolution Figma calls “iPhone 17” because it was first on the list.

![The banner image now uses a portrait ratio.](https://dbushell.com/images/blog/2026/figma-banner-4.avif)

::: note

Note the absolute perfect crop of Johnny’s sockless businessing.

:::

Okay, next question: how do we move between “mobile” and “desktop”? That’s a very specific focal point. We can’t just change it willy-nilly! Code has rules; logic. A website must be responsive between all breakpoints.

Are we going to use multiple images? At what breakpoint do they swap? Because that perfectly cropped mobile image doesn’t scale up very far.

![The mobile banner image comically cropped to show only the crossed legs and feet of the man.](https://dbushell.com/images/blog/2026/figma-banner-5.avif)

Those shoes are Gucci by the way. I’m not a fashionista, the hidden left shoe has a logo. See: [<VPIcon icon="fas fa-globe"/>“man sitting beside side table”](https://unsplash.com/photos/man-sitting-beside-side-table-2rhz3Nuq12c) photo by *John Doe* — free to use under the [<VPIcon icon="fas fa-globe"/>Unsplash License](https://unsplash.com/license). I don’t mean to sidetrack this but our hero [<VPIcon icon="fas fa-globe"/>wears socks in bed](https://unsplash.com/photos/NGqgJGnEPdY) in case you were wondering…

---

## Breakpoints aplenty

Hold the phone! A shadow stakeholder has asked for a redesign to “make it pop!”

![Same website altered with the tagline now overlaying the top-left of the banner image, a dark gradient behind the text, and a button in the bottom-left corner labelled 'Business Now'.](https://dbushell.com/images/blog/2026/figma-banner-6.avif)

The ultra-wide problem has been solved with a centred fixed-width style. If that is the intention? Does either the banner or header stretch to the edge of the viewport?

More importantly, that image and text has no room to move. I’ve only reduced the viewport by 200 pixels and it’s already crashing into Johnny’s face.

![Slightly narrower version of the previous image with text now covering the man's face.](https://dbushell.com/images/blog/2026/figma-banner-7.avif)

Are we expecting breakpoints every 100 pixels? — No, wait! Please don’t spend more time designing more breakpoints! Okay, I’ll hold until more breakpoints are designed. Are we extending my development deadline? No. Okay.

---

## Arbitrary line breaks

As development continues I’ve got more bad news to share.

Figma is very happy allowing us to enter arbitrary line breaks for the perfect text fit. That’s not how the web works. One of these options is probably what we’ll see if text is left to naturally break.

![Two versions of the banner where natural line breaks produce awkard and ugly pauses.](https://dbushell.com/images/blog/2026/figma-banner-8.avif)

Yes, we can technically allow for a manual line break. That’s a pain in the content management system, but sure. Text is still forced to wrap on a smaller viewport, then what?

![Banner text breaks naturally but also with a manual break that leaves the word 'in' stranded on its own line.](https://dbushell.com/images/blog/2026/figma-banner-9.avif)

Oh that? Now you want the manual line break to magically disappear?

(╯°□°)╯︵ ┻━┻

---

I lied when I said “top ten” Figma betrayals. The issues above can appear in hundreds of guises across any component. If you’re betrayed once you’ll be hit again and again.

Figma is not exactly conducive to responsive web design. Designing more breakpoints often leads to more questions, not less.

Another betrayal I pull my hair out over is the three card pattern packed with content. This leads to an immediate breakpoint where one card drops awkwardly below. I dread this because the word “carousel” will be uttered and my sobbing is heard far and wide. Carousels are not a content strategy. I was once inspecting a Figma file only to witness the enemy cursor drive by and drop several dots underneath an image. The audacity!

---

## Human conversation

Figma betrayals are classic waterfall mistakes that are solved by human conversation. Developers need to be part of the design process to ask these questions. Content authors should be involved *before* and not after a design is complete. You’ll note I never answered the questions above because what might work for my fictional design isn’t universal.

On a tangential topic Matthias Ott notes:

::: info *The Shape of Friction* by Matthias Ott (<VPIcon icon="fas fa-globe"/><code>matthiasott.com</code>)

> Think about what actually happens when a designer and an engineer disagree about an interaction pattern. There’s a moment of tension – maybe even frustration. The engineer says it’ll be fragile. The designer says it’s essential for the experience. Neither is wrong, necessarily. But the conversation – if your process allows for it to happen – that back-and-forth where both sides have to articulate why they believe what they believe, is where the design becomes robust and both people gain experience. Not in the Figma file. Not in the pull request. In the friction between two people who care about different things and are forced to find a shared answer.

<SiteInfo
  name="The Shape of Friction · Matthias Ott"
  desc="Web design engineer, UX designer, teacher, and speaker – helping teams build websites and digital products with a focus on CSS, accessibility, and performance."
  url="https://matthiasott.com/notes/the-shape-of-friction/"
  logo="https://matthiasott.com//favicon.ico?v=00rKnA7O762"
  preview="https://matthiasott.com//assets/pictures/_twitterimage/og-image-shape-of-friction.jpg"/>

:::

Figma is not friction-free and that’s fine. We can’t expect any software in the hands of a single person to solve problems alone. Software doesn’t know what questions to ask. Not then with Clippy, not now with Copilot. Humans should talk to one another, not the software.

Together we can solve things early the easy way, or later the hard way. One thing that has kept me employed is the ability to identify questions early and not allow Fireworks, Photoshop, Sketch, XD, and now Figma to lead a project astray.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top ten Figma betrayals",
  "desc": "The one where I discuss classic Figma mistakes (not a listicle)",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/top-ten-figma-betrayls.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
