---
lang: en-US
title: "In Praise Of The Basics"
description: "Article(s) > In Praise Of The Basics"
icon: fa-brands fa-css3-alt
category: 
  - CSS
  - Article(s)
tag: 
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > In Praise Of The Basics"
    - property: og:description
      content: "In Praise Of The Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/in-praise-of-the-basics.html
prev: /programming/css/articles/README.md
date: 2024-05-30
isOriginal: false
author:
  - name: Geoff Graham
    url : https://smashingmagazine.com/author/geoff-graham/
cover: https://files.smashing.media/articles/in-praise-of-the-basics/in-praise-of-the-basics.jpg
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
  name="In Praise Of The Basics"
  desc="What does it mean to learn the “basics”, or fundamentals, of front-end web development? Is starting with HTML and CSS still the best entry point to learn how to make websites and apps when we have a seemingly endless supply of frameworks? Geoff Graham thinks so and discusses why you might consider going “back to basics” to start or move forward in your career."
  url="https://smashingmagazine.com/2024/05/in-praise-of-the-basics/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/in-praise-of-the-basics/in-praise-of-the-basics.jpg"/>

What does it mean to learn the “basics”, or fundamentals, of front-end web development? Is starting with HTML and CSS still the best entry point to learn how to make websites and apps when we have a seemingly endless supply of frameworks that abstract those building blocks with their own opinions and syntax flavors? Geoff Graham thinks so and discusses why you might consider going “back to basics” to start or move forward in your career.

Lately, I’ve been thinking about **the basics of web development**. Actually, I’ve been thinking about them for some time now, at least since I started teaching beginning web development in 2020. I’m fascinated by the basics. They’re an **unsung hero**, really, as there is no developer worth their salt who would be where they are without them. Yet, they often go unnoticed.

> The basics exist in some sort of tension between the utmost importance and the incredibly banal.

You might even think of them as the vegetable side on your dinner plate — wholesome but perhaps bland without the right seasoning.

Who needs the basics of HTML and CSS, some say, when we have tools that abstract the way they’re written and managed? We now have site builders that require no technical knowledge. We have frameworks with enough syntactic sugar to give your development chops a case of cavities. We have libraries packed with any number of pre-established patterns that can be copy-pasted without breaking a sweat. The need to “learn” the basics of HTML and CSS is effectively `null` when the number of tools that exist to supplant them is enough to fill a small galaxy of stars.

Rachel Andrew wrote one of my all-time favorite posts back in 2019, equating the rise of abstractions with an increase in complexity and a profound loss of inroads for others to enter the web development field:

::: info Rachel Andrew, “HTML, CSS and our vanishing industry entry points” (<VPIcon icon="fas fa-globe"/><code>rachelandrew.co.uk</code>)

> “We have already lost many of the entry points that we had. We don’t have the forums of parents teaching each other HTML and CSS, in order to make a family album. Those people now use Facebook or perhaps run a blog on wordpress.com or SquareSpace with a standard template. We don’t have people customising their MySpace profile or learning HTML via [<VPIcon icon="fa-brands fa-reddit"/>`neopets`](https://reddit.com/r/neopets/comments/25nmni/how_many_people_started_coding_because_of_neopets/). We don’t have the people, usually women, entering the industry because they needed to learn HTML during that period when an organisation’s website was deemed part of the duties of the administrator.”  

```component VPCard
{
  "title": "HTML, CSS and our vanishing industry entry points – Rachel Andrew",
  "desc": "Everyone is angry about CSS again. I’m not even going to try to summarize the arguments. However it always seems to boil down to the fact that CSS is simultaneously too easy to bother with, yet so hard it needs to be wrapped up in a ball of JavaScript in case it scares the horses. You can read a more sensible take from Chris Coyier in The Great Divide.",
  "link": "https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points//",
  "logo": "https://rachelandrew.co.uk/wp-content/uploads/2022/07/favicon1.png",
  "background": "rgba(244,244,255,0.2)"
}
```

:::

There’s no moment more profound in my web development career than the time I changed the background color of a page from default white to some color value I can’t remember (but know for a fact it would never be `dodgerblue`). That, and [**my personal “a-ha!” moment**](/css-tricks.com/moment-css-started-making-sense.md) when realizing that everything in CSS is a box. Nothing guided me with the exception of “View Source,” and I’d bet the melting Chapstick in my pocket that you’re the same if you came up around the turn of the 21st century.

Where do you go to learn HTML and CSS these days? Even now, there are few dedicated secondary education programs (or [**scholarships**](/css-tricks.com/finding-front-end-development-scholarships.md), for that matter) to consider. We didn’t have bootcamps back in the day, but you don’t have to toss a virtual stone across many pixels to find one today.

There are excellent and/or free tutorials, too. Here, I’ll link a few of ’em up for you:

- [<VPIcon icon="iconfont icon-webdev"/>Learn HTML](https://web.dev/learn/html) / [<VPIcon icon="iconfont icon-webdev"/>Learn CSS](https://web.dev/learn/css) by web.dev
- [<VPIcon icon="fa-brands fa-firefox" />Getting Start With the Web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web) by MDN
- [<VPIcon icon="fas fa-globe"/>HTML & CSS Crash Course](https://scrimba.com/learn/introhtmlcss) by Kevin Powell
- [<VPIcon icon="fas fa-globe"/>Introduction to HTML and CSS](https://theodinproject.com/lessons/foundations-introduction-to-html-and-css) by The Odin Project
- [<VPIcon icon="fas fa-globe"/>Learn HTML](https://w3docs.com/learn-html.html) / [<VPIcon icon="fas fa-globe"/>Learn CSS](https://w3docs.com/learn-css.html) by W3Docs

Let’s not even get into the number of YouTube tutorials. But if you do, no one beats [Kevin’s incredible archive of recorded gems (<VPIcon icon="fa-brands fa-youtube"/>`kevinpowell`)](https://youtube.com/kevinpowell).

Anyway, my point is that **there are more resources than ever for learning web development, but still painfully few entry points to get there**. The resources we have for learning the basics are great, but many are either growing stale, are quick hits without a clear learning path, or assume the learner has at least some technical knowledge. I can tell you, as someone who has hit the Publish button on thousands of front-end tutorials, that the vast majority — if not all — of them are geared toward those who are already on the career path.

It was always a bit painful when someone would email CSS-Tricks asking where to get started learning CSS because, well, you’d imagine CSS-Tricks being the perfect home for something like that, and yet, there’s nothing. It’s just the reality, even if many of us (myself included) cut our chops with sites like CSS-Tricks, Smashing Magazine, and A List Apart. We were all learning together at that time, or so it seemed.

> What we need are more pathways for **deep learning**.

[<VPIcon icon="fas fa-globe"/>Learning Experience Design](https://lxd.org) (LXD) is a real thing that I’d position somewhere between what we know as UX Design and the practice of accessibility. There’s a focus on creating delightful experiences, sure, but the real aim of LDX is to establish learning paths that universally account for different types of learners (e.g., adults and children) and learning styles (e.g., visual and experiential). According to LDX, learners have a set of needs not totally unlike those that [<VPIcon icon="fa-brands fa-wikipedia-w"/>Maslow’s hierarchy of needs](https://en.wikipedia.org/wiki/Maslow’s_hierarchy_of_needs) identifies for all humans, and there are different models for determining those needs, perhaps none more influential than [<VPIcon icon="fas fa-globe"/>Bloom’s Taxonomy](https://bloomstaxonomy.net).

These are things that many front-end tutorials, bootcamps, videos, and programs are not designed for. It’s not that the resources are bad (nay, most are *excellent*); it’s that they are serving different learners and learning types than what a day-one beginner needs. And let’s please not rely on AI to fill the gaps in human experiences!

Like I said, I’ve been thinking about this a lot. Like, *a lot* a lot. In fact, I recently published an online course purely dedicated to learning the basics of front-end development, creatively named [<VPIcon icon="fas fa-globe"/>TheBasics.dev](https://thebasics.dev). I’d like to think it’s not just another tutorial because it’s a complete set of lessons that includes reading, demonstrations, videos, lab exercises, and assessments, i.e., a myriad of ways to learn. I’d also like to think that this is more than just another bootcamp because it is curricula designed with the intention to develop new knowledge through reflective practices, peer learning, and feedback.

Anyway, I’m darn proud of The Basics, even if I’m not exactly the self-promoting type, and writing about it is outside of my comfort zone. If you’re reading this, it’s very likely that you, too, work on the front end. The Basics isn’t for you exactly, though I’d argue that brushing up on fundamentals is never a bad thing, regardless of your profession, but especially in front-end development, where standards are well-documented but ever-changing as well.

```component VPCard
{
  "title": "The Basics – Front-End Web Development Courses by Geoff Graham",
  "desc": "Delightfully fun lessons designed to get you from no code to know code.",
  "link": "https://thebasics.dev//",
  "logo": "https://thebasics.dev/wp-content/uploads/2024/04/cropped-thebasics-logo-icon-color-192x192.webp",
  "background": "rgba(255,122,24,0.2)"
}
```

The Basics is more for your clients who do not know how to update the website they paid you to make. Or the friend who’s learning but still keeps bugging you with questions about the things they’re reading. Or your mom, who still has no idea what it is you do for a living. It’s for those whom the entry points are vanishing. It’s for those who could simply sign up for a Squarespace account but want to actually understand the code it spits out so they have more control to make a site that uniquely reflects them.

If you know a person like that, I would love it if you’d share [<VPIcon icon="fas fa-globe"/>The Basics](https://thebasics.dev) with them.

Long live the basics! Long live the “a-ha!” moments that help us all fall in love with the World Wide Web.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "In Praise Of The Basics",
  "desc": "What does it mean to learn the “basics”, or fundamentals, of front-end web development? Is starting with HTML and CSS still the best entry point to learn how to make websites and apps when we have a seemingly endless supply of frameworks? Geoff Graham thinks so and discusses why you might consider going “back to basics” to start or move forward in your career.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/in-praise-of-the-basics.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
