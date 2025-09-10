---
lang: en-US
title: "Probably Don't Base64 SVG"
description: "Article(s) > Probably Don't Base64 SVG"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Probably Don't Base64 SVG"
    - property: og:description
      content: "Probably Don't Base64 SVG"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/probably-dont-base64-svg.html
prev: /programming/css/articles/README.md
date: 2016-07-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Probably Don't Base64 SVG"
  desc="Perhaps you've heard of data URIs. It's a really nice way of including a resource that would have otherwise been a separate HTTP request. The format that you"
  url="https://css-tricks.com/probably-dont-base64-svg"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

Perhaps you’ve heard of data URIs. It’s a really nice way of including a resource that would have otherwise been a separate HTTP request. The format that you use in a data URI can vary. Essentially you just tell it what content type it is (e.g. `image/png`), semicolon, then the data of that file.

Like:

```html
<img src='data: ... '>
```

or:

```css
.bg {
  background: url('data: ... ');
}
```

For a raster image like a PNG, the data of that image needs to be in base64 format. I’m not a huge expert here, but as far as I understand, base64 is safe for use in something like HTML or CSS because it only uses 64 characters known to be safe in those formats.

![On the left, the data of a PNG, which includes characters that have the potential to screw up HTML. On the right, that same image base64 encoded with all safe characters.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/2014-10-21-at-8.55-AM.png)

Probably better [<VPIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow answer](http://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for) by Dave Markle:

::: info Dave Markle (<VPIcon icon="fa-brands fa-stackoverflow"/><code>stackoverflow.com</code>)

> You never know - some protocols may interpret your binary data as control characters (like a modem), or your binary data could be screwed up because the underlying protocol might think that you’ve entered a special character combination (like how FTP translates line endings).
> 
> So to get around this, people encode the binary data into characters. Base64 is one of these types of encodings.

<SiteInfo
  name="What is base 64 encoding used for?"
  desc="I've heard people talking about ”base 64 encoding” here and there.  What is it used for?"
  url="https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

:::

Base64 looks like gibberish, and we often associate gibberish with compression on the web. But this gibberish isn’t compression, it’s actually a bit bigger than the original because, to quote Jon Skeet on the same Stack Overflow thread:

> It takes 4 characters per 3 bytes of data, plus potentially a bit of padding at the end.

I’m not sure how gzip factors into it though. But what I’m getting at here is how SVG factors into this.

You can use data URIs for SVG too.

```html
<img src='data:image/svg+xml; ... '>
```

```css
.bg {
  background: url('data:image/svg+xml; ... ');
}
```

For SVG, you don’t *have* to convert the data into base64. Again, not an expert here, but I think the SVG syntax just doesn’t have any crazy characters in it. It’s just XML like HTML is, so it’s safe to use in HTML.

You can leave the encoding in UTF-8, and drop the `<svg>` syntax right in there! Like this:

```html
<img src='data:image/svg+xml;utf8,<svg ... > ... </svg>'>
```

```css
.bg {
  background: url('data:image/svg+xml;utf8,<svg ...> ... </svg>');
}
```

So because we can do that, and we know that base64 often increases the size, might as well do that right? Yep. As a side benefit, the `<svg>` syntax left alone does gzip better, because it’s far more repetitive than base64 is. Say you wanted two versions of an icon, one red, one yellow. You can use the same SVG syntax duplicated just change the fill color. Gzip will eat that for breakfast. Credit to Todd Parker for that tip, and that’s also the approach of [Grunticon (<VPIcon icon="iconfont icon-github"/>`filamentgroup/grunticon`)](https://github.com/filamentgroup/grunticon), which data URI’s SVG in UTF-8 into CSS.

---

## A Test

To test this out, I downloaded three SVG icons from [<VPIcon icon="fas fa-globe"/>IcoMoon](https://icomoon.io/).

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/three-icons.png)

- `cog.svg`: 1,026 bytes  
- `play.svg`: 399 bytes  
- `replay.svg`: 495 bytes

I ran them through [SVGO (<VPIcon icon="iconfont icon-github"/>`svg/svgo`)](https://github.com/svg/svgo) just so they are nicely optimized and kinda ready for use as a data URI (whitespace removed, although I guess not strictly necessary).

- `cog.svg`: 685 bytes  
- `play.svg`: 118 bytes  
- `replay.svg`: 212 bytes

Then I ran those through a [<VPIcon icon="fas fa-globe"/>base64 converter](https://mobilefish.com/services/base64/base64.php).

- `cog.svg`: 916 bytes - 133% of the original size  
- `play.svg`: 160 bytes - 136% of the original size  
- `replay.svg`: 283 bytes - 134% of the original size

So that makes sense, right? If it’s 4 characters for every 3 bytes, that’s 133% bigger, with the variation coming from uneven lengths and thus padding.

Anyway, maybe this is all super obvious. But it just seems to me if you’re going to use a data URI for SVG there is no reason to ever base64 it.

Props to Matt Flaschen for his email a few months ago that highlighted this issue for me.

::: info UPDATE: on IE

There is a lot of talk in the comments about IE 10/11/Edge not supporting this. It does, it’s just finicky. [Here’s a reduced test case (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/ZQgvyG/) that works in those version of IE. Note the second example, which is URL encoded, works. The trick is not specifying an encoding type at all.

:::

::: info UPDATE: “Optimized URL-encoded”

[Taylor Hunt investigated a bit deeper (<VPIcon icon="fa-brands fa-codepen"/>`tigt`)](https://codepen.io/tigt/post/optimizing-svgs-in-data-uris) and found that you can sweak out a bit more optimization by not encoding stuff like spaces and single quotes. Example:

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M224%20387.814V512L32 320l192-192v126.912C447.375 260.152 437.794 103.016 380.93 0 521.287 151.707 491.48 394.785 224 387.814z'/%3E%3C/svg%3E
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Probably Don't Base64 SVG",
  "desc": "Perhaps you've heard of data URIs. It's a really nice way of including a resource that would have otherwise been a separate HTTP request. The format that you",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/probably-dont-base64-svg.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
