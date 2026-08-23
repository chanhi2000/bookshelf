---
lang: en-US
title: "Can’t seem to remove the formatting from a string of text?"
description: "Article(s) > Can’t seem to remove the formatting from a string of text?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Can’t seem to remove the formatting from a string of text?"
    - property: og:description
      content: "Can’t seem to remove the formatting from a string of text?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/cant-seem-to-remove-the-formatting-from-a-string-of-text.html
prev: /programming/css/articles/README.md
date: 2024-12-06
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/4666
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
  name="Can’t seem to remove the formatting from a string of text?"
  desc="𝐏𝐨𝐭𝐚𝐭𝐨 is not just Potato formatted."
  url="https://blog.master.dev/cant-seem-to-remove-the-formatting-from-a-string-of-text/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/4666"/>

I had a fella email me a line of text almost just like this:

> 𝐂𝐚𝐥𝐥𝐞 𝐁𝐥𝐚𝐧𝐜𝐨𝐬, 𝐂𝐨𝐬𝐭𝐚 𝐑𝐢𝐜𝐚

He said he could *not* remove that formatting no matter what he did. It looks kinda bold, doesn’t it? And set into a serif font. You’d think you could select it in the text editor you’re in and remove that formatting. He said he tried copy/pasting it into places where no text formatting is even allowed, like in VS Code or the URL bar of a browser. Voodoo, he said.

Here’s the thing: that text *isn’t* formatted.

That first “C” you see above isn’t a regular uppercase character C, our typical friend `U+0043 : LATIN CAPITAL LETTER C`, [<VPIcon icon="fas fa-globe"/>it’s “𝐂”](https://babelstone.co.uk/Unicode/whatisit.html), that is, `U+1D402 : MATHEMATICAL BOLD CAPITAL C`. It’s literally a different character in Unicode. There are… a lot of Unicode characters:

::: info <VPIcon icon="fa-brands fa-wikipedia-w"/>List of Unicode characters

<SiteInfo
  name="List of Unicode characters - Wikipedia"
  desc="As of Unicode version 16.0, there are 155,063 characters with code points, covering 168 modern and historical scripts, as well as multiple symbol sets. This article includes the 1,062 characters in the Multilingual European Character Set 2 (MES-2) subset, and some additional related characters."
  url="https://en.wikipedia.org/wiki/List_of_Unicode_characters/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/New_Unicode_logo.svg/640px-New_Unicode_logo.svg.png"/>

> As of[<VPIcon icon="fa-brands fa-wikipedia-w"/>Unicode](https://en.wikipedia.org/wiki/Unicode)version 16.0, there are 155,063[<VPIcon icon="fa-brands fa-wikipedia-w"/>characters](https://en.wikipedia.org/wiki/Character_(computing))with[<VPIcon icon="fa-brands fa-wikipedia-w"/>code points](https://en.wikipedia.org/wiki/Code_point), covering 168 modern and historical[<VPIcon icon="fa-brands fa-wikipedia-w"/>scripts](https://en.wikipedia.org/wiki/Script_(Unicode)), as well as multiple symbol sets.

:::

It could be written like 𝕮𝖆𝖑𝖑𝖊 𝕭𝖑𝖆𝖓𝖈𝖔𝖘, 𝕮𝖔𝖘𝖙𝖆 𝕽𝖎𝖈𝖆 instead, or 𝗖𝗮𝗹𝗹𝗲 𝗕𝗹𝗮𝗻𝗰𝗼𝘀, 𝗖𝗼𝘀𝘁𝗮 𝗥𝗶𝗰𝗮.

Should you do this to get super sweet effects in places you otherwise couldn’t? Probably not. The accessibility is rough. Listen to the audio output [<VPIcon icon="fas fa-globe"/>in this blog post](https://blog.nytsoi.net/2019/12/12/alt-text-for-text). ~If you’re going to do it on the web where you have HTML control, do something like:~

```html
<!-- Don't do this! Leaving for posterity. -->
<span aria-label="Calle Blancos, Costa Rica">
  <span aria-hidden="true">𝕮𝖆𝖑𝖑𝖊 𝕭𝖑𝖆𝖓𝖈𝖔𝖘, 𝕮𝖔𝖘𝖙𝖆 𝕽𝖎𝖈𝖆</span>
</span>
```

::: note Update

[**See Ben’s comment**](/blog.master.dev/cant-seem-to-remove-the-formatting-from-a-string-of-text.md#comment-16908) on why not to do the above. Instead, make a [<VPIcon icon="fas fa-globe"/>visually hidden version](https://a11yproject.com/posts/how-to-hide-content/) that a screen reader would still see, and an ARIA hidden one that will be seen visually. (Noting potential concerns about copy/paste that started this whole article.)

```html
<span class="visually-hidden">Calle Blancos, Costa Rica</span>
<span aria-hidden="true">𝕮𝖆𝖑𝖑𝖊 𝕭𝖑𝖆𝖓𝖈𝖔𝖘, 𝕮𝖔𝖘𝖙𝖆 𝕽𝖎𝖈𝖆</span>
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Can’t seem to remove the formatting from a string of text?",
  "desc": "𝐏𝐨𝐭𝐚𝐭𝐨 is not just Potato formatted.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/cant-seem-to-remove-the-formatting-from-a-string-of-text.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
