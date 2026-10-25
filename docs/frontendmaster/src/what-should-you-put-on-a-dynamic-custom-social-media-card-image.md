---
lang: en-US
title: "Creating Dynamic Social Media Cards for User Content"
description: "Article(s) > Creating Dynamic Social Media Cards for User Content"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Creating Dynamic Social Media Cards for User Content"
    - property: og:description
      content: "Creating Dynamic Social Media Cards for User Content"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/what-should-you-put-on-a-dynamic-custom-social-media-card-image.html
prev: /programming/css/articles/README.md
date: 2026-10-26
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11458
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
  name="Creating Dynamic Social Media Cards for User Content"
  desc="Discover how to create dynamic social media cards for user-generated content and e-commerce sites, enhancing SEO and sharing efficiency."
  url="https://blog.master.dev/what-should-you-put-on-a-dynamic-custom-social-media-card-image/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11458"/>

By “dynamic” social media cards, I mean cards for pages of user-generated content or something like an e-commerce site with loads of different products. Meaning too many pages to reasonably design a custom graphic by hand for each. So what we’re talking about here is a **system** to generate dynamic images with dynamic data.

If you *can* custom design a social media card image, you probably *should.* Make it branded, enticing, and quickly communicate the most important thing about what’s going on at that URL.

![A custom-designed card for a specific URL gives you full control. I like Dia’s here: eye-catching imagery, clear branding, and non-duplicative text that tells you exactly what it is.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/diabrowser-og_1.png?resize=1024%2C538&quality=80&ssl=1)

GitHub is a good example of dynamically generated social media cards. Each repo has a generated image like this:

[![GitHub repository for <VPIcon icon="iconfont icon-github"/>`codepen/slideVars`, a user interface for updating CSS custom properties, showcasing contributors, issues, stars, and forks.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/slideVars.png?resize=1024%2C512&quality=80&ssl=1](https://github.com/codepen/slideVars)

That’s an *image*, not a screenshot I took, but one *they* dynamically created.

A typical implementation makes that show up with meta tags in the HTML response like this:

```xml
<meta property="og:image" content="https://example.com/images/social/1.jpg">

<meta name="twitter:image" content="https://example.com/images/social/1.jpg">
<meta name="twitter:card" content="summary_large_image">
```

There are more possible tags (see the [<VPIcon icon="fas fa-globe"/>Open Graph protocol](https://ogp.me/)), plus variations and platform-specific stuff, naturally. Plus, typically a site will have other tags that ultimately help with social sharing, SEO, and general UX, like:

```html
<title>Raccoon Animation</title>
<meta name="description" content="A cool demo of a raccoon in roller skates.">
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
```

::: details An example of a more “complete” set of HTML:

```html
<title>Balatro Planet Card Scaling</title>
<meta name="description" content="A code demo by Chris Coyier  created on CodePen">
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />

<meta property="og:title" content="Balatro Planet Card Scaling"><meta property="og:description" content="Interactive Example of the +Mult and +Chips scaling of Planet Cards in the game Balatro">

<meta property="og:url" content="https://codepen.io/editor/chriscoyier/pen/01a14173-dbcb-7828-afc4-9a8907157ecb">
<meta property="og:site_name" content="CodePen">
<meta property="og:image" content="https://codepen.io/screenshots/xxx/1280.jpg">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="720">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@CodePen">
<meta name="twitter:creator" content="Chris Coyier ">
<meta name="twitter:title" content="Balatro Planet Card Scaling">
<meta name="twitter:description" content="Interactive Example of the +Mult and +Chips scaling of Planet Cards in the game Balatro">
<meta name="twitter:image" content="https://codepen.io/screenshots/xxx/1280.jpg">
```

:::

I’m *pretty* sure you still use the `twitter:foo` meta tags for X, if you care to. The “X” docs have no guidance on this. Should they just support `og:foo` style tags? Yes. Do they? I don’t think so, but please correct me if I’m wrong.

::: note

Also weird: I used GitHub as an example above, but many of the meta/og tags don’t appear in the GitHub HTML source when you view a repo, so they must do something extra exotic to make it happen. 🤷‍♀️

:::

::: note

With those tags in place, supporting platforms will show special extra content. For example, if I text this repo to someone over iMessage, this is what they see:

:::

![iMessage is one of the few where the actual URL is hidden and replaced by the unfurl.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-21-at-8.07.31-AM.png?resize=676%2C484&quality=80&ssl=1)

This is referred to as **unfurling**. How a link **_unfurls_**.

::: note

What actually unfurls in any given app can change at any time; you aren’t guaranteed any control over it, and it depends on user preferences. For instance, in Slack, you can tell it to never unfurl for particular domains.

:::

::: note

You can also add `alt` text for social meta images, which is probably a good idea if you can properly describe it.

```html
<meta property="og:image" content="https://example.com/images/og/abc123.png">
<meta property="og:image:alt" content="A rounded purple-to-pink gradient button labeled 'Get Started' on a dark background, with a code editor preview beside it.">
```

:::

---

## Example Unfurls

Here’s a bunch of examples of apps and how they unfurl, mostly using Pens from CodePen as that’s what I’m actively thinking about. Each has differences and notes worth considering. I’m listing next to each of them what they have and don’t have.

- They aren’t judgment calls; it’s just an inventory of what is there.
- I’m not talking about what might be **in the image** (that’s what we’re trying to figure out) — just if it has an image and the prominence.

:::: tabs

@tab:active <VPIcon icon="fa-brands fa-discord"/>

![A digital mockup of a smartphone displaying a ghost-themed chat application called 'Unhinged', featuring a ghost icon and user profile information.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/discord-1.png?resize=1024%2C846&quality=80&ssl=1)

- ✅ URL Visible
- ✅ Site Title
- ❌ Site URL
- ❌ Site Favicon
- ✅ Page Title
- ✅ Page Description
- ✅ Large Image

::: note

Only one that doesn’t truncate the URL?

:::

@tab <VPIcon icon="fa-brands fa-mastodon"/>

![Screenshot of a CodePen project showcasing a scroll progress back-to-top button with a conic-gradient border. The header reads 'Header' and there are placeholder texts stating 'Blank'.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/mastodon-1.png?resize=936%2C1024&quality=80&ssl=1)

- ☯️ URL Visible (truncated)
- ✅ Site Title
- ❌ Site URL
- ❌ Site Favicon
- ✅ Page Title
- ✅ Page Description
- ✅ Large Image

::: details The Elk client for Mastodon does things differently.

![Twitter post by damianwalsh discussing a CSS project featuring a back-to-top button with a progress indicator, includes a link to a CodePen demo.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/elkmastodon-1.png?resize=1024%2C532&quality=80&ssl=1)

No idea why the image is mini and broken.

:::

@tab <VPIcon icon="fa-brands fa-slack"/>

![A chat interface displayed on a mobile phone mockup, showcasing a code demo titled 'Chat with a Ghost' by 3epge on CodePen.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/slack-1.png?resize=1024%2C233&quality=80&ssl=1)

- ☯️ URL Visible (truncated)
- ✅ Site Title
- ❌ Site URL
- ✅ Site Favicon
- ✅ Page Title
- ✅ Page Description
- ❌ Large Image (small and cropped to a square)

@tab <VPIcon icon="fa-brands fa-bluesky"/>

![Graphic with the word 'BOO' in bold black font on an orange background, featuring a ghost emoji.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/bluesky-1.png?resize=1024%2C877&quality=80&ssl=1)

- ✅ URL Visible (truncated)
- ❌ Site Title
- ✅ Site URL
- ❌ Site Favicon
- ✅ Page Title
- ✅ Page Description
- ✅ Large Image (kinda huge actually)

@tab <VPIcon icon="fa-brands fa-apple"/>iMessage

![An old mobile phone displaying a webpage titled 'Chat with a Ghost' featuring a ghostly figure and pumpkins.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/iMessage-1.png?resize=704%2C566&quality=80&ssl=1)

- ❌ URL Visible (replaces it entirely with unfurl)
- ❌ Site Title
- ✅ Site URL
- ❌ Site Favicon
- ✅ Page Title
- ❌ Page Description
- ✅ Large Image

@tab <VPIcon icon="fa-brands fa-linkedin"/>

![LinkedIn post from Angelica Montaño, a Full Stack TypeScript Developer, celebrating Day 10 of a project with a digital clock displayed below.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/linked-in-1.png?resize=1024%2C539&quality=80&ssl=1)

- ❌ URL Visible (might be behind “more” and obfuscated)
- ❌ Site Title
- ✅ Site URL
- ❌ Site Favicon
- ✅ Page Title
- ❌ Page Description
- ❌ Large Image (small but not cropped)

@tab <VPIcon icon="fa-brands fa-threads"/>

![An abstract Suprematism-inspired design displaying geometric shapes, including triangles, circles, and squares, in a muted color palette.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/threads-1.png?resize=1024%2C767&quality=80&ssl=1)

- ✅ URL Visible (truncated)
- ❌ Site Title
- ✅ Site URL
- ✅ Site Favicon
- ✅ Page Title
- ❌ Page Description
- ✅ Large Image

@tab <VPIcon icon="fa-brands fa-whatsapp"/>

![Image of a vintage mobile phone displaying a demo titled 'Chat with a Ghost' by 3epge on CodePen, featuring a ghostly figure and text options.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/WhatsApp-1.png?resize=1024%2C977&quality=80&ssl=1)

- ✅ URL Visible
- ❌ Site Title
- ✅ Site URL
- ✅ Site Favicon
- ✅ Page Title
- ✅ Page Description
- ✅ Large Image

@tab <VPIcon icon="fa-brands fa-x-twitter"/>

![A screenshot of a document discussing the CSS property 'text-box: trim-both' with examples of its implementation, including some placeholder text and images of trees.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/x-1.png?resize=1024%2C768&quality=80&ssl=1)

- ❌ URL Visible
- ✅ Site Title
- ❌ Site URL
- ❌ Site Favicon
- ✅ Page Title (overlays image)
- ✅ Page Description
- ✅ Large Image

::::

### Other Sites That Unfurl

This isn’t a complete list of sites that unfurl, it’s just a bunch of common ones. There’s also Facebook, Signal, Telegram, etc. I’m sure you can think of a bunch. If this matters a lot to you, it’s probably worth testing on all of them.

---

## So… What Should a Large Image Actually Contain?

### Should you show the item title?

Maybe not! This seems to be the thing that **almost every unfurling** has anyway. So listing it again almost seems unnecessarily duplicative.

And yet! It seems to be **the most common thing** that custom cards duplicate. My first-ever take on this on CSS-Tricks back in the day duplicated the title for sure:

![The title was listed THREE TIMES here. Feels like a little too much now.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screen-Shot-2021-05-12-at-3.39.02-PM.webp?resize=1024%2C890&quality=80&ssl=1)

I admit it does make the title super noticeable, and typography can be a big part of a site’s brand. Smashing Mag does it and you certainly get a taste of their style.

![*This* site has opted *not* to include the post title on the card. Instead, it uses a custom graphic for each post (not always scalable), but still builds the card dynamically with the branded bar across the bottom.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-24-at-5.39.29-AM.png?resize=1024%2C709&quality=80&ssl=1)

![Image featuring the text 'TanStack AI' on a gradient background, with the subtitle 'Structured Output with TanStack AI' underneath. Logo for master.dev is present in the bottom right corner.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-24-at-5.43.08-AM.png?resize=1024%2C639&quality=80&ssl=1)

One tool for building dynamic cards is WordPress’ [<VPIcon icon="fas fa-globe"/>Jetpack Social](https://jetpack.com/social/) plugin. It’s a very basic implementation, though, which just sets the post title on top of whatever “custom post image” you select for the post, with a gradient on top to make the text more visible.

![It does let you customize the text though, so it doesn’t *have* to be the post title.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-24-at-5.52.38-AM.png?resize=1024%2C707&quality=80&ssl=1)

Personally, I lean toward *not* including the title, as it’s typically already there, and using the space for other things or just breathing room.

### Should you show the site’s branding?

First, here is the **site name** and **site URL**. Unfurls tend to show one or the other. It looks like it’s trending toward showing the **site URL.** I imagine that’s a security thing. Any ol’ site could put “Facebook” as the `<title>Facebook</title>` which would make an unfurl look like it’s from Facebook on sites that list titles, whereas you can’t fake unfurls that list the actual URL like `facebook.com` or `codepen.io` or whatever. I kinda like seeing the URL myself.

It’s common enough that I’d lean toward not needing to include the site name or URL in the image itself.

Then there is the site’s favicon that shows in some unfurls, which is likely some form of the site’s logo. That’s less common to see in an unfurl, and if it’s there, it’s likely quite small.

I think the site’s logo is a decent candidate for putting in the custom image. That can make it unmistakably part of the site, which is kind of the point of branding.

![GitHub goes pretty small with it, but it’s there.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/slideVars-2.png?resize=1024%2C512&quality=80&ssl=1)

Branding is a much bigger concept than just a logo, though. It’s typography, colors, the voice, the whole vibe of the thing. You could be like Zach and put your own mug on your personal blog’s social card:

![Note he’s got the # of the blog post and the date on there, which are little interesting bits of data you could consider.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/opengraph.jpeg?resize=1024%2C538&quality=89&ssl=1)

### Should you show the item’s URL?

Nah, probably not. Typically, sites unfurl *in addition* to showing the posted URL. The shown URL might be truncated, but it’ll follow the platform’s standard handling, and users will be used to it. So unless showing the complete URL is somehow super interesting and relevant, probably skip it.

### Should you show the item’s description?

Again, a ton of unfurls show this already, so it’s probably equally as skippable as the title is. Only perhaps more so because it tends to be hierarchically less important than the title and more text, which is hard to fit in.

A full paragraph of text is unlikely to work in a social media card. If you know it’s fairly short, truncation is practical, and if it’s super interesting, I could see it working; otherwise, skip it. GitHub repo descriptions are usually decently short and fit the other criteria above, so I can see why they do it, even if it is relatively duplicative.

I could also see turning the hierarchy on its head. Maybe the description is the *most* interesting part of a dynamic page. Maybe a blog post with a custom excerpt could be an interesting take!

![Illustration of a single-element conic spinner created using pure CSS, featuring a conic gradient and animation effects.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/OG-card-%C2%B7-1200%C3%97630%401x.png?resize=1024%2C538&quality=80&ssl=1)

### What kind of other dynamic data can you show?

This is where it gets interesting to me. Not to over-analyze the GitHub image over and over, but their choice to show off interesting GitHub-specific data is smart, I think.

![GitHub repository overview for codepen/slideVars, showcasing user interface for updating CSS custom properties, with details on contributors, issues, stars, and forks.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/slideVars-1024x512-1.png?resize=1024%2C512&quality=80&ssl=1)

If you’re looking at doing this, what kind of unique, interesting data do you have for that page? Likes/hearts? Analytics data? Number of reviews? Star rating? A sparkline? A price or discount?

![A tweet by Bel Curcio discussing OpenID Connect (OIDC) Federation, featuring the title 'OpenID Connect (OIDC) Federation' and related links.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-25-at-6.44.20-AM.png?resize=1024%2C639&quality=80&ssl=1)

Vercel blog posts and docs show off the tags, which is a minor bit of metadata, but it makes each card different and offers some interesting context about what the link is about.

Since I’m thinking about this in terms of CodePen, I’m wondering whether we could/should show hearts, views, and comments in the image. That might be cool, but if the numbers are low or zero… maybe not. But that’s the beauty of doing things dynamically: you could include information only when it’s actually interesting. Like a “Picked Pen” could say that, but say nothing when it isn’t.

Here are some ideas of what dynamic data could be:

- Author / Username
- User Avatar
- Analytic data, like “likes” and “views”
- A chart for something like a stock
- A waveform for something like a song
- An average customer rating for something like a product
- A discount for something like a SaaS plan

### Just let the item speak for itself?

For example, games on Steam already have custom images, so the unfurl just uses that image, and that’s it.

![Promotional image for the game 'Over the Hill' featuring an off-road vehicle in a grassy landscape, highlighting a 20% discount on Steam.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-25-at-7.05.56-AM.png?resize=744%2C536&quality=80&ssl=1)

That works perfectly well. I think it’s a good fit for Steam, and game developers are already particularly strongly incentivized to produce good and enticing images for the Steam website itself, and for this exact scenario.

What we *already do* on CodePen is take a screenshot of the Pen (on every save!) so we already have that to work with. For over a decade, that’s what we’ve used as the social image card already, letting the Pen speak for itself. It’s reasonable to leave it that way. But I think it’s also reasonable to bring a little bit more branding to the images and offer little bits of more interesting information. Not sure if we will, but we might!

![Example layouts from AI that show dynamic data, but the most prominent part of the image would show the screenshot.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-26-at-6.05.30-PM.png?resize=1024%2C617&quality=80&ssl=1)

### Sometimes images are just really small

*Generally*, we’re talking about a 1200×630 image shown decently large. But most mobile screens aren’t that big, so readable text is iffy to begin with.

![Slack here is displaying the image as a square, and pretty small. Not much you can do here!](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-26-at-6.06.37-PM.png?resize=1024%2C247&quality=80&ssl=1)

---

## Platform Specific Stuff

You can’t truly control how platforms are going to unfurl. Things change over time, and different platforms do different things as times change. Twitter, as far as I recall, didn’t do “overlay” information like X does now, and who knows when that will change again. X is one of the rare sites that *replaces* the link in your post with the unfurl, making the unfurl pretty important as it’s the main thing a user can click.

Bluesky incorporates the [<VPIcon icon="fas fa-globe"/>standard.site](https://standard.site/) schema, and when done correctly, you get a special “View Publication” button. It links to the site itself, not the article, which is a little weird, but it can at least draw a little extra attention and maybe some clicks.

![Example of Bluesky with Standard.site implementation, showing a blog post on chriscoyier.net about an "Atomic Wall Clock"](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-26-at-6.15.15-PM.png?resize=971%2C1024&quality=80&ssl=1)

On Slack, an admin user might remove an unfurl, then click an additional option to *forever stop* unfurling for that particular domain, meaning you can’t count on it at all.

YouTube is in a class of its own. It’s so popular that many platforms have their own special way of unfurling it, so the “card” is an embedded video. I doubt even YouTube itself has much control over this.

---

## Interesting Technology for Dynamic Social Images

- Next.js has [<VPIcon icon="iconfont icon-nextjs"/>a whole built-in system](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) for making them.
- Many other site-builder tools have custom plugins for it, like [11ty (<VPIcon icon="iconfont icon-github"/>`5t3ph/eleventy-plugin-social-images`)](https://github.com/5t3ph/eleventy-plugin-social-images) and [<VPIcon icon="fa-brands fa-wordpress"/>WordPress](https://wordpress.org/plugins/jetpack-social/).
- Cloudinary can [<VPIcon icon="fas fa-globe"/>build dynamic images through URL parameters alone](https://cloudinary.com/blog/guest_post/automatically-generate-social-sharing-images).

---

## So… what should you put on a dynamic custom social media card image?

- Whatever the most interesting thing you can show about the page is. Probably an *actual image.*
- Data that is contextual and relevant to the page. Particularly when it’s not available in the title, description, or any other meta tag.
- Not too much text. It’s probably duplicative anyway.
- Not too much, period!

```component VPCard
{
  "title": "DOM to PNG Directly in the Browser",
  "desc": "You could design something on the web then take a screenshot of it. That is, in a basic sense, converting DOM to PNG. But a screenshot is rather manual and finicky. If you had to do this over and over, or you needed a very exact size (like a social media card), you can actually…",
  "link": "/blog.master.dev/dom-to-png-directly-in-the-browser.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Flashy Landing Pages",
  "desc": "I've had this Tweet bookmarked for months now from Brian Lovin who does a classic and well-deserved wrist-slapping of flashy design at the cost of communication. It's all-too-easy to focus on exotic micro-interactions that will get likes on social media, but fail to communicate what a product does or tell a compelling story. Criticism of…",
  "link": "/blog.master.dev/flashy-landing-pages.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "How much do you really know about media queries?",
  "desc": "There are a ton more @media queries than ",
  "link": "/blog.master.dev/learn-media-queries.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Dynamic Social Media Cards for User Content",
  "desc": "Discover how to create dynamic social media cards for user-generated content and e-commerce sites, enhancing SEO and sharing efficiency.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/what-should-you-put-on-a-dynamic-custom-social-media-card-image.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
