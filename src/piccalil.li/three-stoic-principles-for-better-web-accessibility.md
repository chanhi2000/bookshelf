---
lang: en-US
title: "Three stoic principles for better web accessibility"
description: "Article(s) > Three stoic principles for better web accessibility"
icon: fas fa-accessible-icon
category: 
  - Design
  - System
  - Accessibility
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - a11y
  - accessibility
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Three stoic principles for better web accessibility"
    - property: og:description
      content: "Three stoic principles for better web accessibility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/three-stoic-principles-for-better-web-accessibility.html
prev: /academics/system-design/articles/README.md
date: 2026-04-30
isOriginal: false
author:
  - name: Steve Frenzel
    url: https://piccalil.li/author/steve-frenzel
cover: https://piccalil.b-cdn.net/api/og-image?slug=three-stoic-principles-for-better-web-accessibility/
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
  name="Three stoic principles for better web accessibility"
  desc="Some simple principles here from Steve Frenzel that you can apply whether you're highly experienced in web accessibility or a beginner. "
  url="https://piccalil.li/blog/three-stoic-principles-for-better-web-accessibility"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=three-stoic-principles-for-better-web-accessibility/"/>

When I listened to Arthur Brooks’ podcast episode [<VPIcon icon="fas fa-globe"/>Four Practical Ways to Live Like a Stoic with Ryan Holiday](https://arthurbrooks.com/podcast/four-practical-ways-to-live-like-a-stoic-with-ryan-holiday), I was surprised and excited to see how it applies to my work as an accessibility practitioner.

Among other things, they talk about three principles, and in this article, I’m going to discuss how they can help you in your everyday life doing web accessibility work.

---

## Manage yourself, not the outside world

> “Having the emotion, but not being ruled by it.”

You already seem to be living by this principle, otherwise you wouldn’t be reading this. You can’t influence how your colleagues deal with the issue of accessibility, but you have decided to be here.

There are many things we have no control over: laws, recommendations, opinions, hierarchies, technologies used, brand colours, et cetera. This can be very upsetting and you might feel your voice is not heard. Don’t be discouraged and take it personally though, because even in this confined space *you* still get to decide how to work with these restrictions.

You might not be able to break free from the oppressive nature of the corporate world, but you *can* still do your best by not taking it personally and keep moving towards the goal: improving the user experience, collaborating with your colleagues and protecting your employer from a lawsuit along the way.

Does it upset you when a team lead tells you that only 1% of their users have a disability and frankly they don’t give a shit about accessibility? It *did* upset me, but it didn’t stop me from “killing them with kindness”. I asked them politely where this made up number came from and if they’re aware that there are roughly [<VPIcon icon="fas fa-globe"/>7.9 million people in Germany with an official disability](https://destatis.de/EN/Themes/Society-Environment/Health/Disabled-People/_node.html) instead.



---

## Everything is an opportunity, including suffering

> “The obstacle is the way.”

Let’s take the dreaded [<VPIcon icon="fas fa-globe"/>carousel pattern](https://shouldiuseacarousel.com/) as an example: there is a insistence on using it on the home page, preferably an external ready-made solution, because it has to be done quickly. It has been decided, the customer insists it *must* be used and you have no influence on this decision.

You *can* influence by educating your colleagues about the implications. Welcome to the amusement park of pain, take a seat on the merry-go-round of the unreasonable!

The carousel pattern is not only a questionable one and will most likely not have the desired effect that you intend, it’s also very complex to implement, especially if it *must* be accessible. The ARIA Authoring Practices Guide explains the [<VPIcon icon="iconfont icon-w3c"/>Carousel (Slide Show or Image Rotator) Pattern](https://w3.org/WAI/ARIA/apg/patterns/carousel/) in detail, in case you want to give your developer colleagues a look behind the scenes and get their sweat glands working overtime.

If the offer *must* be accessible, time (and therefore money) must be invested in finding a suitable ready-made solution, adapting it or writing it yourself. Sonja Weckenmann from *tollwerk* has written a very detailed, excellent article on creating [<VPIcon icon="fas fa-globe"/>accessible carousels](https://tollwerk.de/projekte/tipps-techniken-inklusiv-barrierefrei/barrierefreie-karussells).

The article is in German but your browser of choice should be able to translate it into your preferred language.

You could also try to convince your colleagues to integrate an MVP (minimum viable product) solution that offers simple horizontal scrolling. If you break this pattern down to its essence, that’s exactly what it is: a container that you navigate horizontally to access the content.

This solution can be implemented quickly and easily, and the horizontal scroll bar can even be implemented using CSS with the brand colours. Building on this [**progressive enhancement**](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md) approach, further complexity can be added later.

What you can also do — which is *my* preferred solution — is re-evaluate the use of the carousel, even if it has already been decided to use the pattern. At this point, everyone involved should be aware of the many disadvantages and few advantages and be able to form their own opinion. [<VPIcon icon="fas fa-globe"/>Simplifying design with feedback](https://piccalil.li/complete-css/lessons/4) is a big part of producing excellent user interfaces.

If the carousel *still* has to be implemented as desired, you (and your colleagues) will suffer a lot, but you will also learn an incredible amount about accessibility during the implementation of an accessible carousel.

---

## Choose virtue over comfort

> On those mornings you struggle with getting up, keep this thought in mind—I am awakening to the work of a human being. Why then am I annoyed that I am going to do what I’m made for, the very things for which I was put into this world? Or was I made for this, to snuggle under the covers and keep warm? It’s so pleasurable. Were you then made for pleasure? In short, to be coddled or to exert yourself?
> 
> — Marcus Aurelius, Meditations, 5.1

Simply put: Sometimes there are days when you wonder why you should get up and subject yourself to the stress of everyday life when you could just stay in bed. Take the previous example: Instead of fighting a losing battle and trying to talk your boss out of the carousel pattern with very good arguments, you could just do it and be done with it.

As bleak as this situation may seem, it’s okay! If you have a little breathing room, why not document the process internally, for example? If the topic comes up again, you can show in detail what had to be done and how much work was involved. You can use hard facts to demonstrate the disadvantages and how much time went into it.

Other ways to go the extra mile could include:

- You could publish a case study as part of your company blog (if there is one) and thus help others by showing that the company takes accessibility seriously.
- You can involve designers in creating images with accessibility annotations to make the process easier to understand for a non-technical audience.
- Writing good, easy-to-understand documentation is an important skill that not only increases your market value but can also greatly [<VPIcon icon="fas fa-globe"/>improve your communication skills](https://piccalil.li/complete-css/lessons/3).

I had a colleague who was very interested in the topic but didn’t have the capacity to deal with it. When he asked me to give him a glimpse behind the scenes and I showed him everything that goes into the work of an accessibility practitioner, he was very surprised. Moments like these also help to raise awareness within the team and sensitise people to the topic.

Even if you only have the capacity to do one of these things, a little goes a long way. Attentive colleagues will take note and be grateful that you went the extra mile. And who knows, maybe it will even inspire them to follow your example because they realised how it makes their own work easier?

---

## Wrapping up

If you search for them, you will find [<VPIcon icon="iconfont icon-duck-duck-go"/>much more than just these three principles](https://duckduckgo.com/?q=stoic+principles&ia=web). Some may not be so easy to apply to work in the field of web accessibility, but others will.

These three principles have helped me to take several steps back and look at my work from a bird’s eye view.

More often than I would like, I get too caught up in technical details and forget that I am working with many different people to ultimately enable as many people as possible to participate digitally.

If you would like to dive deeper into this non-technical topic, I highly recommend [<VPIcon icon="fas fa-globe"/>The Accessibility Operations Guidebook](https://dpersing.com/book/) by *Devon Persing*. In it, she explains in detail how to make accessibility work more sustainable.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Three stoic principles for better web accessibility",
  "desc": "Some simple principles here from Steve Frenzel that you can apply whether you're highly experienced in web accessibility or a beginner. ",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/three-stoic-principles-for-better-web-accessibility.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
