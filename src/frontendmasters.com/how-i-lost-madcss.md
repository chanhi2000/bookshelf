---
lang: en-US
title: "How I Lost MadCSS"
description: "Article(s) > How I Lost MadCSS"
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
      content: "Article(s) > How I Lost MadCSS"
    - property: og:description
      content: "How I Lost MadCSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-i-lost-madcss.html
prev: /programming/css/articles/README.md
date: 2026-04-10
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9235
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
  name="How I Lost MadCSS"
  desc="It's fine. I'm fine. I just like learning ok. "
  url="https://frontendmasters.com/blog/how-i-lost-madcss/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9235"/>

I was very lucky to get to compete in Syntax’s [<VPIcon icon="fas fa-globe"/>MadCSS](https://madcss.com/) Battle recently. I got rightfully ousted [<VPIcon icon="fa-brands fa-youtube"/>in the 2nd round](https://youtu.be/YZZbc57DyQI&list=PLLnpHn493BHE6Wh1h9TViNozVRjjCOj3k&index=4) by Scott himself! See the outcome of the battle in the image below.

![Comparison of two competitors, Scott Tolinski and Chris Coyier, showing their scores and feedback on a project. Scott is marked as the winner with a 92.42% match, while Chris has an 81.97% match. Feedback from various reviewers is displayed under each competitor.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/Screenshot-2026-04-06-at-7.33.17-AM.png?resize=1024%2C421&ssl=1)

I feel like I had the correct idea of how to approach it all just fine. But can you see how I lost? A GRID BLOWOUT! WTF! I feel like I’ve been [**helping people AVOID grid blowouts**](/css-tricks.com/preventing-a-grid-blowout.md) for a long time.

I recently logged back into their SynHax[^1] website that powers the battles, so I could figure out just what the heck went wrong. Best to learn from our mistakes, right?

[^1]: It’s honestly a super cool system. After being invited to join a battle, you are prompted to connect your local file system to a folder where the HTML and CSS files live. That means you can use any local editor you’d like! As you save the files, they’re synced to the website, where a preview is built and turned into an image that visually diffs against the target we’re coding against.

---

## I Started Forcing Widths

Once the grid blew out on me (started hanging off the right edge), a bad instinct kicked in, where I started setting `width` values that I didn’t need to set.

It started with:

```css
body {
  width: 100vw;
}
```

This was wholly unnecessary as the body is already the width of the viewport. 🤦. Fortunately, the margins were set to zero; otherwise, I would have introduced scrollbars, which would have made the problem even worse.

As that didn’t fix it, I forced the grid itself, the `#container` to also be as wide as the viewport.

```css
#container {
  width: 100dvw;
}
```

This was *extra* counter-productive as there was `padding` on the `body`, meaning instead of *squeezing,* which is what I was hoping to do on the grid, I was forcing it to be as wide as the viewport but nudged over because of the body padding. So even if I figured out the underlying issue, I’d be forcing the grid blowout myself.

The correct thing to do was just leave everything pretty normal and old school:

```css
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#container {
  height: 100%;
}
```

---

## I Even Bungled The Grid Setup

It’s three columns and two rows. This is correct:

```css
#container {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  /* or go simple */
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
```

I wrote…

```css
grid-template-rows: repeat(1, 50%);
```

Which makes like zero sense, but essentially works fine because it makes one row 50%, and the other takes up the remaining space. Not quite correct (because of the gap) but pretty close. I probably *meant* to write:

```css
grid-template-rows: repeat(2, 50%);
/* or */
grid-template-rows: 50% 50%;
```

That would have caused *another* grid blowout because then the height would have been 100% plus the `gap`. Jeez, self, get it together. I think I was trying to use `50%` in an attempt the vertical blowout that was also happening.

---

## The Wrong Overflow

So even if I didn’t bungle the grid setup and width situation, I’d have a blowout. That’s because for whatever god-forsaken reason, I went for `overflow: clip;` on each of the elements in the grid cells. I tend to think of that like `overflow: hidden;` but stronger, but I obviously I don’t understand it well enough, because as you can see:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/CleanShot-2026-04-08-at-15.32.44.gif?resize=637%2C800&ssl=1)

`hidden` works, `clip` does not.

---

## Text Size Overflow

Circling back, though, what was the root cause of the horizontal overflow? It *looks* like everything is plenty squishy enough to fit into three columns without needing to break out of a `1fr` column. But again, I got in my own way.

The trouble we can blame on one Mrs. **Brenda Montgomery**.

Well, and the fact that I didn’t allow enough horizontal room for that unbreakable last name.

Yet again, for an unknown god-forsaken reason, I applied *extra* padding to the *right* side of the testimonial container.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/CleanShot-2026-04-08-at-16.12.36%402x.png?resize=1014%2C562&ssl=1)

That padding isn’t squishy. Brenda’s avatar I had set at 50px wide, and that’s not squishy either (and apparently `aspect-ratio: 1` isn’t strong enough to make it a circle 🤷‍♀️). The `gap` in that header isn’t squishy either. And neither is “Montgomery”. Literally nothing was willing to budge, so: blowout.

*So many* things could have fixed this.

1. A normal `15px` of padding on the right, instead of `30px`, would have fixed it.
2. Putting `flex-wrap: wrap` on the header would have fixed it. (Well, in real life, it would be fine, but it wouldn’t have matched the example.)
3. Heck, even `14px` instead of `15px` `font-size` would have fixed it!

<VidStack src="https://videopress.com/d04e443b-25d2-4fc1-8fa2-efed9693b4be" />

---

## The End

Obviously, this whole thing was just for fun and in no way affects my sense of self-worth.

![participation medal](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/04/IMG_8339.jpeg?resize=768%2C1024&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Lost MadCSS",
  "desc": "It's fine. I'm fine. I just like learning ok. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-i-lost-madcss.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
