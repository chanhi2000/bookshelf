---
lang: en-US
title: "The Moment You Need a Database"
description: "Article(s) > The Moment You Need a Database"
icon: fas fa-database
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Moment You Need a Database"
    - property: og:description
      content: "The Moment You Need a Database"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-moment-you-need-a-database.html
prev: /data-science/articles/README.md
date: 2025-03-10
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5273
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Moment You Need a Database"
  desc="There are quite a few tools to avoid *needing* a database these days, static site generators chief among them. So then what are the things that push toward or require a database? "
  url="https://frontendmasters.com/blog/the-moment-you-need-a-database/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5273"/>

Not all websites need a database.

I was just drooling over [<VPIcon icon="fa-brands fa-apple"/>the new Mac Studio landing page](https://apple.com/mac-studio/) on apple.com. It’s a beautiful piece of web design that serves an important purpose for a big company, and really doesn’t need any technology other than HTML, CSS, and JavaScript. “Brochure” sites like this are classic examples of sites that don’t need a database. You’ll sometimes hear them called “awards” sites, as they tend to be beautifully focused one-offs that don’t need to live forever within a long-lasting system.

Even sites with a lot more pages don’t *necessarily* need a database. You can just duplicate directories or HTML files for a while, even if it is a little repetitive. Modern code editors make updating repetitive code in a code base no sweat.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-10-at-8.53.45%E2%80%AFAM.png?resize=728%2C342&ssl=1)

Doing this kind of thing across almost any number of files is no problem.

At some point, sites with a ton of pages benefit from a more robust templating system. Blog posts use *this* template, landing pages use *this* template, etc.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-10-at-9.04.52%E2%80%AFAM.png?resize=1024%2C501&ssl=1)

[<VPIcon icon="fas fa-globe"/>Eleventy](https://11ty.dev/docs/layouts/) is great at combining layouts and content.

Combining content with templates to produce a page can be done a number of ways and entirely without a database.

- A website with access to a backend language can use that backend language to do the content+template creation on request.
- A website builder tool with a build process can produce static HTML output from content+template before the files are deployed to the server.

So yeah! You can get pretty far without needing a database at all. Perhaps the most common approach is using a *static site generator*, of which [<VPIcon icon="fas fa-globe"/>there are many](https://jamstack.org/generators/). Frontend Masters has courses on site builders that can produce static sites like [<VPIcon icon="fas fa-globe"/>Next.js](https://frontendmasters.com/courses/next-js-v3/), [<VPIcon icon="fas fa-globe"/>Nuxt](https://frontendmasters.com/courses/nuxt/), and [<VPIcon icon="fas fa-globe"/>Astro](https://frontendmasters.com/courses/astro/).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-10-at-12.58.57%E2%80%AFPM.png?resize=1024%2C860&ssl=1)

So then *when?* When do you make the call that for some particular product, a database is the right decision.

---

## When You Probably Need a Database

- **When you have a log in system**. You might be able to get away with not storing user auth information at all (e.g. “social auth” only), but even then, those users are likely *doing something* with your website and if you need to save what they are doing, you need to associate it with that user, and a database will be the way. If you want to let a user log in and do things, perhaps even across devices, you’ll be storing what they are doing and like their last “state” of what they are doing in a database.
- **When you have very dynamic data.** “Dynamic” meaning changing often. Imagine *forums*. Users logging in and creating new threads and responding to existing threads. It’s probably not practical to be forcing some build process to run rebuilding static files in a forum. Forum data makes much more sense in a database, especially as it can then be retrieved and used in many different ways (recent posts, individual threads, user profiles, etc.) Comment sections are similar and something that a database is generally in charge of.
- **When you have relational data.** Imagine a real estate app where the users are realtors, realtors represent homes, but a home might have multiple realtors, and those realtors belong to realtor groups, etc. These are all tables of data that can reference each other and is the strength (and point) of relational databases like Postgres. (see a [<VPIcon icon="fas fa-globe"/>Complete Intro to SQL & PostgreSQL](https://frontendmasters.com/courses/sql/))
- **When you present things that need to be search, filtered, or sorted.** A database excels at jobs like “give me these specific things sorted in descending order by date” or the like. Producing static files of every possible search, sort, or filtering choice (assuming you can’t do that filtering client side) isn’t usually practical.
- **When you just have too much.** Just to draw a reasonable line, I’d say at over 100 pages, unless they are super similar types like only blog posts, it’s likely a site benefits from keeping the content for those pages in a database. It might not be “pages” only, it could be users, products, songs, or whatever the main *things* of the website are.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-10-at-3.27.59%E2%80%AFPM.png?resize=1024%2C668&ssl=1)

The forum software [<VPIcon icon="fas fa-globe"/>Discourse](https://discourse.org/about) uses Postgres databases.

---

## What are the downsides of a database then? What does it cost you?

It seems like there are a lot of upsides to a database, doesn’t there? It really does a lot for a website and is all but a requirement for bigger and more feature rich websites. What’s so nice about *not* having one, such that there are specific tools to avoid it?

- **Databases are more expensive.** Hosting that does not include a database tends to be cheaper. Netlify, a classic host built upon a foundation of hosting only static files, has [**an entirely free plan**](/frontendmasters.com/\netlify-free-plan.md). A database host might be an entirely separate hosted service which may come with it’s own costs.
- **Databases require security.** Databases are usually necessarily accessible on the open web or at least on the private network that the website backend has access to. They also tend to contain sensitive data like private user information. If a nefarious user got more access to the database than they should have, they could download that private information and/or corrupt what is there. This is unfortunately not a maybe. Insecure databases will almost certainly be messed with.
- **Databases require backups.** Because of the risk of nefarious behavior, and even more likely, your own team making honest mistakes, you need to have backups of the database as often as possible. When dealing with flat files, your Git repository and previous deployments act as your backups, but that doesn’t cover a database. Databases need their own unique backup systems.
- **Databases require maintenance.** Database software can update versions, which can include security patches. Add this to your list of responsibilities.
- **Databases require a backend language and ORM.** Front-end code doesn’t typically talk directly to a database. It talks to back-end code which talks to a database. And even back-end code typically isn’t raw SQL queries and the like, it uses an ORM (e.g. [<VPIcon icon="fas fa-globe"/>Prisma](https://frontendmasters.com/courses/fullstack-app-next-v3/setup-prisma-orm/)) that provide a more friendly abstracted syntax for dealing with data. When you work with a database, ends up being lots of additional technology that layers onto your stack to make it all work together.
- **Databases likely need a migration strategy.** Just having and using a database is work, but the structure of a database has a habit of needing to change. Imagine needing to add an additional column to the database, or change the name or structure of the data within a table. These changes are called migrations and have their own set of complexity that might become your job.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-10-at-3.29.44%E2%80%AFPM.png?resize=1024%2C697&ssl=1)

Databases don’t come alone. You need a backend language to connect to it and likely an ORM like [<VPIcon icon="fas fa-globe"/>Prisma](https://prisma.io/) to work with it effectively.

---

## Implied Databases

This isn’t to say that all of this is immediately your problem when using a site that makes use of a database. For instance, this is a WordPress websites as I write, which has an SQL database. But we didn’t have to write APIs for it and we don’t deal with migrations for it, and the backups. Most WordPress websites I’ve worked with have implied security through the hosting and backups handled by paid plugins.

So using pre-existing software that makes use of a database is a different situation than an entirely custom project that grows into needing a custom database.

---

## Types of Databases

It should also be noted that databases come in lots of different shapes and sizes.

- A K:V store (key: value) is perhaps the simplest possible database. This is the foundation of software like [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/) and you’ll see companies like [<VPIcon icon="iconfont icon-cloudflare"/>Cloudflare offer stores like this.](https://developers.cloudflare.com/kv/concepts/how-kv-works/)
- Some databases are “schema-less” in that the bits of data have no defined types, and are more JSON-like in nature like [<VPIcon icon="fas fa-globe"/>CouchDB](https://couchdb.apache.org/), [<VPIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/), [<VPIcon icon="iconfont icon-firebase"/>Firebase](https://firebase.google.com/products/realtime-database), etc.
- Some databases come in the form of hosted services and are content-focused like [<VPIcon icon="fas fa-globe"/>Sanity](https://sanity.io/) and [<VPIcon icon="fas fa-globe"/>Contentful](https://contentful.com/).
- Even “classic” databases like SQL come in varietals like [<VPIcon icon="fa-brands fa-google"/>Postgres](https://google.com/search?q=postgres&udm=14) and [<VPIcon icon="iconfont icon-mariadb"/>MariaDB](https://mariadb.org/). And these have dedicated hosts like SQL has [PlanetScale](https://planetscale.com/#vitess) and [<VPIcon icon="iconfont icon-cockroachdb"/>Cockroach](https://cockroachlabs.com/) and Postgres has [<VPIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com/).

---

Some websites *do* need a database! Good luck!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Moment You Need a Database",
  "desc": "There are quite a few tools to avoid *needing* a database these days, static site generators chief among them. So then what are the things that push toward or require a database? ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-moment-you-need-a-database.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
