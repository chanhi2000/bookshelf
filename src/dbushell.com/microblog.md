---
lang: en-GB
title: "Microblog"
description: "Article(s) > Microblog"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Microblog"
    - property: og:description
      content: "Microblog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/microblog.html
prev: /programming/css/articles/README.md
date: 2024-07-10
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2024-07-10-microblog.png
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
  name="Microblog"
  desc="The one where I publish a second RSS feed"
  url="https://dbushell.com/2024/07/10/microblog/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2024-07-10-microblog.png"/>

I stealth launched a [<VPIcon icon="fas fa-globe"/>new microblog](https://dbushell.com/notes/) on this here website last week. You can subscribe to my [<VPIcon icon="fas fa-globe"/>microblog RSS feed](https://dbushell.com/notes/rss.xml) — do it! My main [<VPIcon icon="fas fa-globe"/>blog](https://dbushell.com/blog/) is for longer, more considered content. I don’t want to drown the good stuff in mid takes, so to speak. That’s not to say my microblog isn’t worth following, it’ll be spicier and more frequent. TL;DR:

- [<VPIcon icon="fas fa-globe"/>Blog](https://dbushell.com/blog/) — long-form discussion, guides, and projects
- [<VPIcon icon="fas fa-globe"/>Notes](https://dbushell.com/notes/) — short-form ideas, opinions, and links

---

## Format

I hacked the blog into my SSSG ([<VPIcon icon="iconfont icon-forgejo"/>scuffed static site generator](https://git.dbushell.com/)). There is no database I’m just using a date delimited markdown format. Timestamps mark the start of a new note.

```md
2024-07-04T10:40Z

**Note** with markdown formatting.

2024-07-08T15:00Z

[Subscribe to the RSS feed](https://dbushell.com/notes/rss.xml).
```

I’m appending notes to files named by year, `2024.md` for example. Everything is merged and sorted, so name and order don’t technically matter. I think this will be convenient for organisation and quick updates. My notes have no titles — [<VPIcon icon="fas fa-globe"/>“Titles are a lot of pressure”](https://chriscoyier.net/2024/03/03/11148/).

I expect this blog will be read from the RSS feed or the [<VPIcon icon="fas fa-globe"/>index page](https://dbushell.com/notes/). However, the ability to link to a single note is important. Links are the backbone of the web. Each note has a permalink structure like so:

```md
/notes/2024-07-04T10:40Z/
```

I’m using the UTC timestamp as I don’t have a title to ‘slugify’ like my blog:

```md
/2024/06/18/carousel-web-component/
```

My blog uses a structure I inherited from WordPress many moons ago. Not sure I’d go for a full date hierarchy today, but as they say, [<VPIcon icon="iconfont icon-w3c"/>“cool URIs don’t change”](https://w3.org/Provider/Style/URI). Cool URIs are also written for humans. A timestamp is at least more meaningful than a random ID, I guess?

---

## RSS

RSS is alive and well despite the bizarre obsession in declaring it dead.

I now have my [<VPIcon icon="fas fa-globe"/>blog RSS feed](https://dbushell.com/rss.xml) and [<VPIcon icon="fas fa-globe"/>notes RSS feed](https://dbushell.com/notes/rss.xml). They’re two separate feeds for now. Should I merge them into a single feed? I worry about diluting and burying my higher effort content. What about a third combined feed? For now there will be two feeds.

I do want to syndicate to [<VPIcon icon="fa-brands fa-mastodon"/>Mastodon](https://social.lol/@db/); need to figure that part out.

---

## Side Projects

Ahh! I’ve found myself trying to maintain too many side projects again. My blogs here at `dbushell.com` are essentially side projects. They’re my primary focus. Side projects hosted elsewhere are beginning to collect dust.

I started a [**bookmark blog**](/dbushell.com/cotton-coder.md) back in January. I’m going to bin it. I like the name and domain but I keep forgetting to update it. I had more ambitious plans for Cotton Coder but paid work got busy and I doubt anything will change this year. I may end up doing a note for weekly bookmarks.

I really should stop buying domains for every idea…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Microblog",
  "desc": "The one where I publish a second RSS feed",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/microblog.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
