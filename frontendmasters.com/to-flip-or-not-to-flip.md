---
lang: en-US
title: "Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language"
description: "Article(s) > Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language"
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
      content: "Article(s) > Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language"
    - property: og:description
      content: "Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/to-flip-or-not-to-flip.html
prev: /programming/css/articles/README.md
date: 2025-05-16
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5890
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
  name="Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language"
  desc="Google Translate doesn't change the `dir` of a site when translating from LTR to RTL... but you could."
  url="https://frontendmasters.com/blog/to-flip-or-not-to-flip/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5890"/>

[<VPIcon icon="fas fa-globe"/>My personal website](https://chriscoyier.net/) was designed in English, because that’s the only language I speak. English is a left-to-right language (LTR).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-16-at-7.52.17%E2%80%AFAM.png?resize=1024%2C888&ssl=1)

Anybody can translate the website though. There are a variety of site translation tools. I don’t have any data on popularity, but I gotta imagine [<VPIcon icon="fa-brands fa-google"/>Google Translate](https://translate.google.com/?source=gtx&sl=ar&tl=en&op=translate) is up there, which is a website and Chrome Extension and, to some degree, automatic translation is just built into Chrome (and other browsers).

So let’s say I translate my website from English to Arabic, a right-to-left language (RTL). Here’s what I get:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-16-at-7.51.41%E2%80%AFAM.png?resize=1024%2C896&ssl=1)

It’s the exact same layout, it’s just the words are in Arabic now. Which is not terribly surprising, I guess? But even the alignments have stayed the same, so this RTL language is still being show in an LTR way.

Google Translate, aside from the text node translation, makes a few other changes that are notable here. What used to be:

```html
<html lang="en">
```

Becomes:

```html
<html lang="ar" class="translated-rtl">
```

Those changes *do not actually change the direction to RTL.* It *could* have, like:

```html{4}
<html 
  lang="ar"
  class="translated-rtl"
  dir="rtl"
>
```

Or it could have injected CSS like:

```css
.translated-rtl {
  direction: rtl;
}

/* or */

[lang="ar"] {
  direction: rtl;
}
```

But it doesn’t. I don’t know for sure, but my guess is that it intentionally doesn’t do that, because it jacks up more layouts than it helps.

But let’s say you’re *me* (perfect, handsome) and you’ve changed your muscle memory for writing a lot of CSS properties to using [<VPIcon icon="fas fa-globe"/>logical properties](https://frontendmasters.com/courses/pro-css/css-reset/?t=460). That is, stuff like `padding-inline-start` instead of `padding-left`, and the like. That, plus using layout like flexbox and grid, will reflow naturally with direction changes. So if you change the direction to `rtl` on *my* site, you get:

![The whole layout flips.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-16-at-8.04.20%E2%80%AFAM.png?resize=1024%2C884&ssl=1)

So the question is:

**Is that** “**better”?**

Meaning: does it read better for native Arabic speakers? Does it generally *feel* better or more native? Or is it worse, in that it’s unexpected or unnatural somehow?

I have a friend who speaks/reads Arabic, just for one anecdotal bit of data. I showed them a site and translated it, and they were like “it’s fine”. But then I showed them a tweaked one where things like the header and hero text and stuff was actually flipped, and they thought it was better. They were like “I never actually see this done, but it’s better this way.”

It’s likely that this no One True Answer here. Even if you’ve done a good job with a layout that flips and looks sensible. [<VPIcon icon="fas fa-globe"/>Alda Vigdís told me](https://topspicy.social/@alda/114501106378371396):

> As someone who has worked on bi-lingual content, dir=”rtl” should of course be indicated for textual content, but the layout question depends on a lot more factors.
> 
> Arabic and Hebrew speaking power users often prefer to have a ltr-oriented layout, while some other groups prefer rtl-oriented layout.

So it may just be a matter of preference of individuals, which is more evidence for why Google Translate doesn’t go there (for layout). Perhaps they should be trying to find more fine-grained text nodes and flipping the `dir` there, but they don’t do that either.

If you land on “leave the layout alone, but flip the `dir` for text”, like Alda suggests, it would be a bring-your-own-CSS situation. You could use Google Translate’s class and flip just the text you need to, like:

```css
.translated-rtl {
  p, li, dt, dd, td, th, h1, h2, h3 {
    direction: rtl;
  }
}
```

That feels a little 😬 to me, like you’ll miss some and make it worse instead of better or something. (I just picked those selectors randomly quick, to illustrate.) So much testing needed.

A flipped layout can be preferable even here though, as [<VPIcon icon="fas fa-globe"/>Naman told me](https://indieweb.social/@nmn/114503173952548664):

> There are somethings that work both ways. The sidebar can be on either side and it makes sense.
> 
> But something like the search bar makes a lot more sense with the layout flipped. [Also: headings in the sidebar are also a lot better with the layout flipped]
> 
> On balance, I think yes, flipping has an overall better result.

So if you’re looking for a straight answer, I’m afraid I can’t give you one. Except, ya know, do a good job.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Is there a Correct Answer? Flipping Layouts When Google Translate Swaps between a Left-to-Right Language and a Right-to-Left Language",
  "desc": "Google Translate doesn't change the `dir` of a site when translating from LTR to RTL... but you could.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/to-flip-or-not-to-flip.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
