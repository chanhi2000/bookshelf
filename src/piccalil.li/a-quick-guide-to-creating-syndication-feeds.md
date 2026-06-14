---
lang: en-US
title: "A quick guide to creating syndication feeds"
description: "Article(s) > A quick guide to creating syndication feeds"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - piccalil.li
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A quick guide to creating syndication feeds"
    - property: og:description
      content: "A quick guide to creating syndication feeds"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-quick-guide-to-creating-syndication-feeds.html
prev: /academics/system-design/articles/README.md
date: 2026-04-02
isOriginal: false
author:
  - name: Declan Chidlow
    url: https://piccalil.li/author/declan-chidlow
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-quick-guide-to-creating-syndication-feeds/
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
  name="A quick guide to creating syndication feeds"
  desc="RSS and syndication are the backbone of the web and have outlived many cycles of the tech industry. There's never been a better time to properly syndicate your content either, so Declan is here to give you a high level tour of your options."
  url="https://piccalil.li/blog/a-quick-guide-to-creating-syndication-feeds"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-quick-guide-to-creating-syndication-feeds/"/>

News of RSS’ death following the [<VPIcon icon="fa-brands fa-wikipedia-w"/>demise of Google Reader](https://en.wikipedia.org/wiki/Google_Reader#Discontinuation) has been greatly exaggerated. RSS is alive, well, and as omnipresent as ever. You aren’t properly publishing content on the web if you aren’t also publishing in syndication formats.

This is a general guide designed to help you understand, build, and distribute various formats of web feeds, even if you’ve never touched them before. We’re not going to run through all the uses and details of syndication feeds, because they’ve been covered ad nauseam elsewhere. Instead, this article is designed to act as a reference which focuses on the principles of various feed formats so that people can subscribe to your content.

Consider this your article as a point of entry, or reference cheat-sheet.

::: note FYI
s
In most cases, you won’t need to hand-roll your own feeds. Most tools you encounter already have functionality for generating them automatically, but understanding them is to your strength.

This knowledge doesn’t just apply to creating feeds but also parsing them and using them. In any case, when things go awry, actually understanding the formats will help you get back on track.

:::

---

## RSS

RSS has the best support out of any feed format but is also the oldest and has some design issues that can make it unideal. RSS files should be served with the MIME type `application/rss+xml`. For an example of a full RSS feed, you can view the feed for [<VPIcon icon="fas fa-globe"/>The Index](https://piccalil.li/the-index/): [<VPIcon icon="fas fa-globe"/>piccalil.li/the-index/feed.xml](https://piccalil.li/the-index/feed.xml)

::: tabs

@tab:active Boilerplate

Like all of the formats this article will be discussing, RSS is just text. In this case, structured XML. RSS wraps everything in an `<rss>` tag with a version number, and then a single `<channel>` tag, which all of our RSS content will be held within.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
  </channel>
</rss>
```

@tab Metadata

Before listing our articles, we need to describe the feed itself. We are required to have at least a `title`, `link`, and `description`, like so:

```xml
<title>Name of our feed</title>
<link>https://example.com</link>
<description>A short description of the feed.</description>
```

However, there are also many additional optional values we can include: `language`, `copyright`, `managingEditor`, `webMaster`, `pubDate`, `lastBuildDate`, `category`, `generator`, `docs`, `cloud`, `ttl`, `image`, `rating`, `textInput`, `skipHours`, `skipDays`.

Dates in RSS conform to [<VPIcon icon="iconfont icon-w3c"/>RFC-822](https://w3.org/Protocols/rfc822/#z28). This means they look like this: `Tue, 11 Jun 2024 15:00:00 GMT`. Though RFC-822 does permit two-digit years, four digits are widely preferred.

@tab Items

Items are the individual entries in your RSS feed, whether they be posts or something else. There are two schools of thought for what content should be included here. One follows the idea that feeds should contain the entire content, unabridged. Others think that feeds should only contain a summary of the content and that it should be read on the site. The preference differs by user, but there is no downside to supplying both if you wish.

The items are the meat of the feed. You loop through your posts and output an item for each one. In RSS, each post is an `<item>`. All elements in an item are optional, but you must have at least a title or description.

```xml
<item>
  <title>A quick and easy guide to Markdown</title>
  <link>https://piccalil.li/blog/markdown-guide/</link>
  <pubDate>Tue, 11 Jun 2024 15:00:00 GMT</pubDate>
  <description>This is the summary of the post...</description>
</item>
```

As a word on etiquette, don’t publish items with future dates. Most feed readers will just omit them, but some will display them at the top, which is attention-grabbing. Many users consider this bad manners and will probably unsubscribe.

:::

---

## Atom

Like RSS, Atom is XML-based, but is a little bit stricter and more finely specced than RSS, which makes it slightly less forgiving to author, but much nicer to parse. Atom files should be served with the MIME type `application/atom+xml`.

You can see a full example of an Atom feed [<VPIcon icon="fas fa-globe"/>here](https://sample-feeds.rowanmanning.com/examples/64968fb0e3685ef07a3e2a27b8d64c01/feed.xml).

::: tabs

@tab:active Boilerplate

Atom uses a root `<feed>` element and requires an XML namespace (`xmlns`).

```xml
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
</feed>
```

@tab Metadata

You need an `id`, `title`, and an `updated` timestamp. The homepage URL is often used for the `id` value. `author` is also required, unless every single entry has an `author` value.

Atom dates are written in accordance with [<VPIcon icon="fas fa-globe"/>RFC-3339](https://rfc-editor.org/rfc/rfc3339), which is based on ISO-8601, and looks like this: `2024-06-11T15:00:00Z`.

```xml
<title>Piccalilli</title>
<link href="https://piccalil.li/"/>
<updated>2024-06-11T15:00:00Z</updated>
<id>https://piccalil.li/</id>
<author>
  <name>Andy Bell</name>
</author>
```

@tab Entries

In Atom, each post is an `<entry>`. Only `id`, `title`, and `updated` value are required, though you can optionally include `author`, `content`, `link`, `summary`, `category`, `contributor`, `published`, `rights`, and `source`. `id` must be unique for the entry and must not change.

```xml
<entry>
  <title>A quick and easy guide to Markdown</title>
  <link href="https://piccalil.li/blog/markdown-guide/"/>
  <id>https://piccalil.li/blog/markdown-guide/</id>
  <updated>2024-06-11T15:00:00Z</updated>
  <summary>This is the summary...</summary>
</entry>
```

:::

---

## JSON Feed

JSON Feed is the newest format discussed here and, as the name suggests, is JSON based rather than XML based. JSON Feed files should be served with the MIME type `application/feed+json`.

For an example of a JSON Feed, you can view the one for posts on my personal website: [<VPIcon icon="fas fa-globe"/>vale.rocks/posts/feed.json](https://vale.rocks/posts/feed.json)

::: tabs

@tab:active Boilerplate and metadata

JSON Feed doesn’t have much boilerplate compared to RSS and Atom. You must create an object, and that object must contain the JSON Feed version and a `title`. Though there are many optional values, many of which you should include: `home_page_url`, `feed_url`, `description`, `user_comment`, `next_url`, `icon`, `favicon`, `authors`, `language`, `expired`, and `hubs`.

```json
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "My Blog"
}
```

@tab Items

Items is represented as an array. The only truly required values are `id` — which uniquely identifies the item — and `content_html` and/or `content_text`. The optional values are `url`, `external_url`, `title`, `summary`, `image`, `banner_image`, `date_published`, `date_modified`, `authors`, `tags`, and `language`.

You can also provide attachments on an item.

```json
"items": [
    {
        "id": "1",
        "content_text": "This is an item in the feed.",
        "url": "https://example.org/item-one"
    }
]
```

:::

---

## Auto-discovery

Many feed readers and other tools can automatically detect your feeds if you configure them correctly. You should add `<link>` tags to the `<head>` of your HTML to aide discovery.

```html
<link rel="alternate" type="application/rss+xml" title="My Site's RSS Feed" href="https://example.com/rss.xml" />
<link rel="alternate" type="application/atom+xml" title="My Site's Atom Feed" href="https://example.com/atom.xml" />
<link rel="alternate" type="application/feed+json" title="My Site's JSON Feed" href="https://example.com/feed.json" />
```

Different tools interpret these tags differently. Some feed readers will, for example, provide users with the choice to select what feed they want from the provided options. Others will pick the first valid feed in the list, or pick the last. There is, unfortunately, very little consistency.

---

## Implementation gotchas

Feeds are consumed by all sorts of tools in all sorts of contexts, so what works in one case might cause issues in another. It is important to stick close to the specs and consider defensive precautions.

### Relative content

Feed readers are disconnected from your site. Relative links like `<img src="/images/cat.jpg">` will often break because they are not relative to the website. Some feed readers may work around this problem, but you should convert all links (images, anchors, etc) to full, absolute URLs to ensure they work in all contexts.

### Encoding

One of XML’s most notorious attributes is that it is rather fragile. For example, if your blog post title is `Tips & Tricks`, and you put that raw into XML, it breaks:

```xml
<title>Tips & Tricks</title>
```

This is due to the `&` character being reserved. For cases like this, you have two main options:

#### 1. Entity Escaping

Convert special characters to their HTML entities.

```xml
<title>Tips &amp; Tricks</title>
```

#### 2. CDATA

Wrap the whole thing in a CDATA block. This tells the XML parser, ‘Ignore everything inside here. It’s literally just text’, which is great for the body of your content where you have lots of HTML tags and special characters, where it might be laborious to transform them.

```xml
<description>
  <![CDATA[
    <p>Here are my <strong>Tips & Tricks</strong>...</p>
  ]]>
</description>
```

### Feed access controls

We often configure bot and scraping protection on our sites, but in this case we *want* our feeds to be scraped. We also likely want to make images and other resources able to be displayed in readers, so we may need to relax our protections. Our sites are also often served cached. Ensure your caching policy aligns with your feed updates — there is no point updating a feed if the cache means it won’t reach readers!

Something else worth keeping in mind are security policies, such as CORS. While feeds are usually fetched server-side by aggregators, some web-based feed readers fetch feeds directly via the browser. Setting an `Access-Control-Allow-Origin: *` header on your XML/JSON files ensures these web-based clients don’t get blocked by security policies.

[<VPIcon icon="fas fa-globe"/>There’s a great resource here](https://blogsareback.com/guides/enable-cors?platform=Netlify) to help you with CORS, by the browser-based RSS reader, [<VPIcon icon="fas fa-globe"/>Blogs Are Back](https://blogsareback.com/).

### Limited display

Many feed readers only display certain elements, such as text, images, and blockquotes, then apply their own formatting. This makes proper semantic HTML important, because non-semantic elements will not be understood or styled by readers.

The removal of provided formatting could cause issues if your content is complex or dynamic. In such a case, it can be worth only providing a summary or incorporating a notice directly into your feed noting that the content is best viewed on the web.

---

## Validation and testing your feeds

Checking your feeds are proper by eye can be tricky, which is where validators are valuable.

- For RSS and Atom, you can use the [<VPIcon icon="iconfont icon-w3c"/>W3C Feed Validation Service](https://validator.w3.org/feed/).
- For JSON Feeds, you can use the [<VPIcon icon="fas fa-globe"/>JSON Feed Validator](https://validator.jsonfeed.org/).

These validators will catch those pesky date format errors and unescaped content instantly. There are also many libraries and other tools out there that you can incorporate as part of your processes so that broken feeds are caught before they can hit production.

You should also try opening your feeds in a few feed readers and other syndication feed tools, just to confirm all works without issue — much like you already test a website across a few browsers.

---

## Wrapping up

This article has only skipped along the top of the syndication feed ocean but has hopefully given you a level of knowledge ready to start building feeds. Having feeds for your content is not just vital for distribution but also contributes to a strong and healthy web.

::: info

If you’re looking to dive deep into the feed ocean, these further reading links will hopefully provide you with some solid entry points:

```component VPCard
{
  "title": "RSS 2.0 Specification (Current)",
  "desc": "The current version of the RSS 2.0 specification (2.0.11), published on March 30, 2009.",
  "link": "https://rssboard.org/rss-specification/",
  "logo": "https://rssboard.org/",
  "background": "rgba(146,0,17,0.2)"
}
```

```component VPCard
{
  "title": "Introduction to Atom",
  "desc": "What is Atom? Atom is the name of an XML-based Web content and metadata syndication format, and an application-level protocol for publishing and editing Web resources belonging to periodically updated websites.",
  "link": "https://validator.w3.org/feed/docs/atom.html/",
  "logo": "https://validator.w3.org/favicon.ico",
  "background": "rgba(102,153,0.2)"
}
```

<SiteInfo
  name="RFC 4287: The Atom Syndication Format | RFC Editor"
  desc="This document specifies Atom, an XML-based Web content and metadata syndication format. [STANDARDS-TRACK]"
  url="https://rfc-editor.org/info/rfc4287//"
  logo="https://rfc-editor.org/api/v1/favicon/512x512.png"
  preview="https://rfc-editor.org/api/v1/meta-thumbnail/rfc4287.png"/>

```component VPCard
{
  "title": "JSON Feed - JSON Feed Version 1.1",
  "desc": "by Brent Simmons and Manton Reece The JSON Feed format is a pragmatic syndication format, like RSS and Atom, but with one big difference: it’s JSON instead of XML. For most developers, JSON is far easier to read and write than XML. Developers may groan atpicking up an XML parser, but decoding JSON is often just a single line of code. Our hope is that, because of the lightness of JSON and simplicity of the JSON Feed format,developers will be more attracted to developing for the open web.",
  "link": "https://jsonfeed.org/version/1.1//",
  "logo": "https://micro.blog/jsonfeed/favicon.png",
  "background": "rgba(96,156,27,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A quick guide to creating syndication feeds",
  "desc": "RSS and syndication are the backbone of the web and have outlived many cycles of the tech industry. There's never been a better time to properly syndicate your content either, so Declan is here to give you a high level tour of your options.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-quick-guide-to-creating-syndication-feeds.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
