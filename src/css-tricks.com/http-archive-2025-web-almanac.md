---
lang: en-US
title: "HTTP Archive 2025 Web Almanac"
description: "Article(s) > HTTP Archive 2025 Web Almanac"
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
      content: "Article(s) > HTTP Archive 2025 Web Almanac"
    - property: og:description
      content: "HTTP Archive 2025 Web Almanac"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/http-archive-2025-web-almanac.html
prev: /programming/css/articles/README.md
date: 2026-01-16
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/http-archive-2025.jpg
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
  name="HTTP Archive 2025 Web Almanac"
  desc="I love me some good web research reports. I'm a sucker for them. HTTP Archive's Web Almanac is one report I look forward to every year, and I know I'm not"
  url="https://css-tricks.com/http-archive-2025-web-almanac"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/http-archive-2025.jpg"/>

I love me some good web research reports. [<VPIcon icon="iconfont icon-css-tricks"/>I’m a sucker for them.](https://css-tricks.com/tag/research/) HTTP Archive’s Web Almanac is one report I look forward to every year, and I know I’m not alone there. It’s one of those highly-anticipated publications on the state of the web, chock-full of well-documented findings about millions of live websites — 17.2 million in this edition! — from page content, to performance, to accessibility, to UX, to… well, let’s just get to it.

[<VPIcon icon="fas fa-globe"/>It just came out](https://almanac.httparchive.org/en/2025/), so there’s no way I’ve read through all 15 chapters, let alone digested and reflected on everything in it. Really, I just want you to be aware that it’s out. That said, it’s hard for me to resist sharing at least a few notable stats that hit me and that I’ll be sure to dig into.

Some highlights:

- **New [`text-wrap`](/css-tricks.com/almanac-properties/text-wrap-style.md) values are showing up!** It’s small, but not surprising for features that only shipped as far back as 2023. Specifically, I’m looking at the `balance` (2.67%) and `pretty` (1.71%) values.
- **Variable fonts are no longer a novelty.** “How popular are variable fonts? This year, 39.4% of desktop websites and 41.3% of mobile websites used at least one variable font on their pages. In other words, now about 4 in 10 sites are using variable fonts.”
- **Why can’t we nail down color contrast?!** Only 30% of sites meet WCAG guidelines, and though that’s a number that’s trending up (21% in 2020), that’s a sorry stat.
- **Removing focus styles is an epidemic.** A whopping 67% of sights remove focus outlines despite [<VPIcon icon="iconfont icon-w3c"/>WCAG’s requirement](https://w3.org/WAI/WCAG21/Understanding/focus-visible.html) that “Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.”
- **Many images are apparently decorative.** At least, that’s what 30% of sites are suggesting by leaving the `alt` attribute empty. But if we consider that 14% of sites leave off the attribute completely, we’re looking at roughly 44% of sites that aren’t describing their visual content. On that note, [**your images probably are not decorative**](/smashingmagazine.com/img-alt-attribute-alternate-description-decorative.md).
- **ARIA labels are everywhere.** We’re looking at 70% usage (29% on buttons). This doesn’t mean anything in and of itself. It could be a good thing, [**but could also be an issue without proper usage**](/css-tricks.com/explaining-the-accessible-benefits-of-using-semantic-html-elements.md).
- **The CMS landscape is largely unchanged.** I mean, WordPress is still the dominant force, and that’s no dang surprise. At this point, its expansion wavers between a couple percentage points every year. “These changes suggest that WordPress is shifting from a focus on expansion to one on stabilization.” That’s a good thing.
- **Bloat, bloat, bloat.** “In July 2015, the median mobile home page was a meager 845 KB. As of July 2025, the same median page is now 2,362 KB. The page decade brought a 202.8% increase.” In a perfect world where we’re all super conscious about page weight, I’d say we oughta aim for less than half that total.
- **JavaScript be heavy.** Images are heaviest, of course, but 697 KB of JavaScript is a lot to stomach. That massive growth in page weight since 2015 is more support that [<VPIcon icon="fas fa-globe"/>this was a lost decade we must reckon with](https://infrequently.org/2024/08/the-landscape/).

<SiteInfo
  name="The 2025 Web Almanac"
  desc="The Web Almanac is an annual state of the web report combining the expertise of the web community with the data and trends of the HTTP Archive."
  url="https://almanac.httparchive.org/en/2025//"
  logo="https://almanac.httparchive.org/static/images/favicon.ico"
  preview="https://almanac.httparchive.org/static/images/home-hero-2025.png"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HTTP Archive 2025 Web Almanac",
  "desc": "I love me some good web research reports. I'm a sucker for them. HTTP Archive's Web Almanac is one report I look forward to every year, and I know I'm not",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/http-archive-2025-web-almanac.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
