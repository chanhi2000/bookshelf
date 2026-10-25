---
lang: en-US
title: "How to Find and Fix Common Technical SEO Issues on Your Website"
description: "Article(s) > How to Find and Fix Common Technical SEO Issues on Your Website"
icon: iconfont icon-shell
category:
  - Shell
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - shell
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Find and Fix Common Technical SEO Issues on Your Website"
    - property: og:description
      content: "How to Find and Fix Common Technical SEO Issues on Your Website"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/fix-common-technical-seo-issues.html
prev: /programming/sh/articles/README.md
date: 2026-11-04
isOriginal: false
author:
  - name: Saar Twito
    url: https://freecodecamp.org/news/author/saar-twito/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8d158690-136a-44a2-aa34-e24be77e004c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Find and Fix Common Technical SEO Issues on Your Website"
  desc="Let's say you've built a website. You've invested in the design, bought a domain, and so on. But a website isn't only what you see on the screen. A lot happens behind the scenes. You have to understan"
  url="https://freecodecamp.org/news/fix-common-technical-seo-issues"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8d158690-136a-44a2-aa34-e24be77e004c.png"/>

Let's say you've built a website. You've invested in the design, bought a domain, and so on. But a website isn't only what you see on the screen. A lot happens behind the scenes. You have to understand how the internet works, as well as how Search Engine Optimization (SEO) works.

Speed is a key part of it, too. A slow site can have very weak SEO, because most people won't spend much time waiting for a page to load, especially these days.

Site speed is a well-known topic with many problems of its own to consider, like Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and server speed. But I'll leave those for another article.

This one is about the problems that stop search engines from reaching and reading your pages.

In my opinion, technical SEO is much harder to apply than regular SEO, which focuses on content and keywords. The technical side usually requires a developer's knowledge, and might need some changes that can feel a bit uncomfortable if you don't have a technical background.

A technical problem can stay unnoticed for months, because you usually don't see it. It's not a design problem. You only find it when you run specific checks, for example with [<VPIcon icon="fas fa-globe"/>Google PageSpeed Insights](https://pagespeed.web.dev/).

In this tutorial, you'll find and fix the most common ones on a small practice site. I didn't want to take a real website and shame its owners, so I built a practice site with the problems already in it.

::: note Prerequisites

You don't need to be an experienced programmer to follow along. You'll need:

- A web browser, such as Chrome, Firefox, Edge or Safari. In Safari, first turn on **Show features for web developers** under Settings > Advanced.
- A terminal: Terminal on macOS, PowerShell on Windows, or any terminal on Linux.
- `curl`, a small program that downloads web pages. It comes with macOS, most Linux distributions, and Windows 10 (version 1803 and later) and Windows 11.
- [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/), to run the practice site. The code was tested with Node.js 26.8 and curl 8.7. On Windows PowerShell, type `curl.exe` instead of `curl`, because there `curl` is a shortcut to a [<VPIcon icon="fa-brands fa-windows"/>different command](https://learn.microsoft.com/en-us/windows/curl/). Replace `| grep -i "text"` with `| Select-String "text"`, and `/dev/null` with `NUL`.

:::

---

## What Is Technical SEO?

Google has programs called crawlers. They search the internet all the time for new websites and new pages. When Google discovers a new address, it may crawl the page and process what's on it (the text, images, and videos).

If Google decides the page is worth indexing, it may add it to a very big database of web pages, called the index. Google can then consider the pages in its index for its search results, when they're relevant to what someone searches for. Google's guide to [<VPIcon icon="fa-brands fa-google"/>how Search works](https://developers.google.com/search/docs/fundamentals/how-search-works) calls these three steps crawling, indexing, and serving.

So crawling doesn't guarantee indexing, and indexing doesn't guarantee a place in the results. The same guide says Google doesn't guarantee any of the three stages, even for a page that follows all of its rules.

Fixing technical problems won't necessarily make your site rank first on Google. But it does strengthen your chances of ranking higher, because every problem you fix makes your site better.

Technical SEO has to come together with regular SEO, like keywords, backlinks, engagement on social media, and so on.

---

## How Common Are These Problems on Real Websites?

The numbers below come from audits run with the site-auditing tool I build. Each website counts once, using its first audit, and this data comes from October 25th.

Crawls check many pages on one site (a median of 10 pages here). Single-page audits check one page, usually the home page.

| Problem | How often | Sample |
| --- | --- | --- |
| At least one page with no canonical tag | 64.2% of sites | 53 crawled sites, Aug 2025 to Oct 2026 |
| Two or more pages with exactly the same title | 61.8% of sites | 34 crawled sites with two or more pages that loaded |
| At least one page with no meta description | 49.1% of sites | 53 crawled sites |
| At least one link leading to a page that returns 404 | 18.9% of sites | 53 crawled sites |
| Page built mostly with JavaScript | 17.7% of pages | 277 single-page audits, May to Oct 2026 |
| At least one page with no title | 13.2% of sites | 53 crawled sites |
| A link that search engines may not be able to follow | 8.3% of pages | 278 single-page audits |
| A robots.txt file with errors, or one that failed to load | 7.9% of sites | 252 single-page audits, Jul to Oct 2026 |
| Page blocked by noindex or by robots.txt | 4.8% of pages | 251 single-page audits, Jul to Oct 2026 |

These are all technical problems, but they don't all weigh the same. Missing canonical tags are at the top, but Google doesn't require a canonical tag, so a page without one isn't broken by itself. It matters when the same or very similar content is reachable at more than one URL, as you'll see in the canonical section.

Duplicate titles are something I had myself: when you write code, it's easy to miss things like that. That's why there are tools that check for these problems.

Let's go over each issue in the table to make sure they're all clear:

- **Missing canonical tag:** a canonical tag is basically one of the many tags you put in the `<head>` of your HTML. When two or three pages have pretty much the same content, it tells search engines like Google which URL is the original, main version, the one you prefer to get indexed. It's not required, though: without it, Google picks the main version itself, so it matters mostly for pages that have duplicates.
- **Duplicate titles:** it's really easy to end up with the same title on two pages. You don't want a duplicated title because it's not helpful and can confuse Google. Each page should say what it's about.
- **Missing meta description:** this one is really important, because it helps search engines as well as AI tools like ChatGPT. The meta description is there to explain very briefly what the page is about and what it's for. If you go to Google and search for a website, you'll see it under the actual link to the site.
- **A link to a 404 page:** this basically means you have a broken link (maybe a link you probably don't use anymore) to a page that isn't there. So there's no reason for it to lead to something that doesn't exist. Use it to lead to something similar, or to something that does exist, so your links remain relevant.
- **A page built mostly with JavaScript:** Google can run JavaScript, so this alone doesn't keep a page out of Google. But the content appears only after the JavaScript loads and runs, which is slower for visitors and one more step that can fail, and not every crawler runs JS. That's why I prefer [**server-side rendering**](/freecodecamp.org/server-side-rendering-in-next-js-for-improved-seo.md) for the content that matters most.
- **A link search engines can't follow:** this isn't a huge deal, and it really depends where the link goes. But say I wrote a really nice article and I want it to help me rank on Google. If search engines can't follow the link to it, then you invested all this time and energy in this article that relatively few people will likely see.
- **Errors in robots.txt:** robots.txt basically helps you talk to search engines. If there are errors in this file, you might stop search engines from crawling pages you do want in search results.
- **A page blocked by noindex or robots.txt:** these are two different things. A `noindex` rule asks search engines to keep a page out of their results, while a robots.txt rule only stops them from crawling it. You'll learn more about both, and why the difference matters, later in this tutorial.

Soft 404s, redirect chains, and wrong canonical tags aren't in the table, because the audits don't record them.

---

## How to Set Up the Practice Site

The practice site is a tiny website for a made-up shoe store called Acme Shoes. Every page on it has one problem built in. You don't need to understand every line of the code.

Create a new folder, add a file called <VPIcon icon="fa-brands fa-js"/>`server.js`, and paste in this code:

```js :collapsed-lines title="server.js"
// a tiny practice site with common technical SEO problems built in
const http = require('node:http');

const PORT = 8080;
const BASE = 'http://localhost:' + PORT;

// Builds a simple HTML page. Leave out a field to leave that tag out.
function page({ title, description, canonical, robots, body, script }) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    title && '<title>' + title + '</title>',
    description && '<meta name="description" content="' + description + '">',
    canonical && '<link rel="canonical" href="' + BASE + canonical + '">',
    robots && '<meta name="robots" content="' + robots + '">',
    '</head>',
    '<body>',
    body,
    script && '<script>' + script + '</script>',
    '</body>',
    '</html>',
  ]
    .filter(Boolean)
    .join('\n');
}

const routes = {
  '/': {
    html: page({
      title: 'Acme Shoes: Running Shoes for Every Runner',
      description: 'Lightweight running shoes for road and trail, with free returns.',
      canonical: '/',
      body: [
        '<h1>Acme Shoes</h1>',
        '<a href="/products/blue-runner">Blue Runner</a>',
        '<span onclick="location.href=\'/sale\'">Summer sale</span>',
      ].join('\n'),
    }),
  },
  // Problem: a vague title and no meta description
  '/products/blue-runner': {
    html: page({
      title: 'Acme Shoes',
      canonical: '/products/blue-runner',
      body: '<h1>Blue Runner</h1>',
    }),
  },
  // Problem: a missing product that still answers "200 OK" (a soft 404)
  '/products/red-runner': {
    html: page({
      title: 'Acme Shoes',
      body: '<h1>Sorry, that product could not be found.</h1>',
    }),
  },
  // Problem: a redirect chain, /old-sale -> /sale-2025 -> /sale
  '/old-sale': { redirect: '/sale-2025' },
  '/sale-2025': { redirect: '/sale' },
  '/sale': {
    html: page({
      title: 'Summer Sale: Up to 40% Off Running Shoes | Acme Shoes',
      description: "Save up to 40% on last season's running shoes until August 31.",
      canonical: '/sale',
      body: '<h1>Summer sale</h1>',
    }),
  },
  // Problem: a noindex header nobody can see in the page itself
  '/about': {
    headers: { 'X-Robots-Tag': 'noindex' },
    html: page({
      title: 'About Acme Shoes',
      description: 'How a two-person workshop became a running shoe brand.',
      canonical: '/about',
      body: '<h1>About us</h1>',
    }),
  },
  // Problem: a canonical tag that points to the home page
  '/blog/choosing-trail-shoes': {
    html: page({
      title: 'How to Choose Trail Running Shoes | Acme Shoes',
      description: 'Grip, drop and fit: what to look for in a trail running shoe.',
      canonical: '/',
      body: '<h1>How to choose trail running shoes</h1>',
    }),
  },
  // Problem: the content only exists after JavaScript runs
  '/catalog': {
    html: page({
      title: 'All Running Shoes | Acme Shoes',
      description: 'Browse every Acme running shoe.',
      canonical: '/catalog',
      body: '<div id="app">Loading...</div>',
      script:
        "fetch('/api/products').then((r) => r.json()).then((products) => {" +
        "document.getElementById('app').innerHTML = products.map((p) => '<h2>' + p + '</h2>').join('');" +
        '});',
    }),
  },
  '/api/products': {
    type: 'application/json',
    html: JSON.stringify(['Blue Runner', 'Trail Grip 2', 'City Glide']),
  },
  // Problem: "Disallow: /blog" blocks every path that starts with /blog
  '/robots.txt': {
    type: 'text/plain',
    html: 'User-agent: *\nDisallow: /blog\n',
  },
};

http
  .createServer((req, res) => {
    const path = new URL(req.url, BASE).pathname;
    const route = routes[path];

    if (!route) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(page({ title: 'Page not found', body: '<h1>Page not found</h1>' }));
    }
    if (route.redirect) {
      res.writeHead(301, { Location: route.redirect });
      return res.end();
    }
    res.writeHead(200, {
      'Content-Type': (route.type || 'text/html') + '; charset=utf-8',
      ...route.headers,
    });
    res.end(route.html);
  })
  .listen(PORT, () => console.log('Practice site running at ' + BASE));
```

Each key in `routes` is a page address. The comments that start with `Problem:` say what's wrong with each page.

Start the server from the same folder:

```sh
node server.js
```

You should see:

```plaintext
Practice site running at http://localhost:8080
```

Leave the server running and open a second terminal for the commands below. When you change <VPIcon icon="fa-brands fa-js"/>`server.js`, stop the server with Ctrl+C and start it again.

---

## How to Check a Page's HTTP Status Code

I remember when I started building websites, I built all kinds of small things. I'm a full stack developer, and I kept trying experiments.

Once I had a problem on the server side and saw in the Network tab that it returned a 500 error. Another time I removed a page on purpose, because I wanted to see if I'd get a 404 or other problems. If you just play around with the site you're building, you'll learn a lot from the results.

HTTP status codes are the first thing a search engine reads. They're the server's way of talking to the client, such as your browser. The codes are split into five ranges: 1xx, 2xx, 3xx, 4xx, and 5xx. A 5xx code is a server problem, for example, and a 4xx code is a client-side problem.

404 is the most common error. It means a page on the site wasn't found. You see 404s all the time, and the fix is typically just to maintain your site and your links.

The codes you'll see in this tutorial are:

- `200 OK`: here's the page.
- `301 Moved Permanently`: the page lives at another address.
- `404 Not Found`: there's no page here.

Google doesn't index URLs that return a `4xx` code, according to its documentation on [<VPIcon icon="fa-brands fa-google"/>HTTP status codes](https://developers.google.com/search/docs/crawling-indexing/http-network-errors).

To see the status code of the practice site's home page, use `-I`, which shows only the headers, and `-s`, which hides curl's progress meter:

```sh
curl -sI http://localhost:8080/
#
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
```

Now ask for an address that isn't in `routes`, to see what a correct 404 looks like:

```sh
curl -sI http://localhost:8080/products/does-not-exist
#
# HTTP/1.1 404 Not Found
# Content-Type: text/html; charset=utf-8
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
```

In the browser, open the developer tools (F12, or Cmd+Option+I on a Mac), go to the **Network** tab, and reload. The **Status** column shows the code.

### What Is a Soft 404?

Check a product the store no longer sells:

```sh
curl -sI http://localhost:8080/products/red-runner
#
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
```

In the browser, the same page says "Sorry, that product could not be found."

A soft 404 is basically a "page not found", but the server still answers `200`. It confuses Google, because the address is still there, but what's on it isn't current anymore.

To fix it, make missing pages return a real `404`, which is what [<VPIcon icon="fa-brands fa-google"/>Google recommends](https://support.google.com/webmasters/answer/7440203). In the practice site, delete the `'/products/red-runner'` entry from `routes`. The server then answers `404`.

Broken links lead to the same dead end. In the data, 18.9% of the 53 crawled sites had at least one link to a page that returned `404`.

So don't leave links that lead to something that doesn't exist. Update them to lead to something similar, or to something that does exist.

If the page moved, add a `301` redirect from the old address to the new one. A `404` is the right answer only for a page that's really gone.

---

## How to Find and Fix Redirect Chains

A redirect is basically when you want to send one URL (perhaps one that no longer exists) to another URL (that does exist). You might set up a redirect if, for example, you change your domain from `example-x.com` to `example-y.com`. You'll want everyone who types `example-x.com` to be redirected to `example-y.com` automatically.

Redirects are fine, and they can be quite helpful when used properly. A `301` means the page moved for good. A `302` means the move is temporary. Google's documentation on [<VPIcon icon="fa-brands fa-google"/>redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects) explains how it treats each one, and its crawlers [<VPIcon icon="fa-brands fa-google"/>follow up to 10 redirect hops](https://developers.google.com/search/docs/crawling-indexing/http-network-errors).

But a redirect chain happens when an old address, such as a domain you used in the past, redirects to a new one, and then that one redirects again, and again...you get the picture. A few redirects aren't a big deal, but five, six, or seven can be a real problem.

The first command below shows every step of the chain. The second gives you a one-line summary.

Add `-L` so curl follows the redirects:

```sh
curl -sIL http://localhost:8080/old-sale
# 
# HTTP/1.1 301 Moved Permanently
# Location: /sale-2025
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
#
# HTTP/1.1 301 Moved Permanently
# Location: /sale
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
#
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
# Date: Sun, 25 Oct 2026 17:42:53 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
```

`/old-sale` goes to `/sale-2025`, which goes to `/sale`. For a one-line summary:

```sh
curl -sL -o /dev/null -w "%{num_redirects} redirects, ended at %{url_effective}\n" http://localhost:8080/old-sale
#
# 2 redirects, ended at http://localhost:8080/sale
```

`-o /dev/null` tells curl to write the page's HTML nowhere, so it doesn't fill your terminal and only the summary line is printed. `-w` sets what that summary line says.

To fix it, point the old/original address straight at the final page:

```js
'/old-sale': { redirect: '/sale' },
```

Restart the server and run the summary again. It now says `1 redirects, ended at http://localhost:8080/sale`.

---

## How to Make Sure robots.txt Isn't Blocking Important Pages

.<VPIcon icon="fas fa-file-lines"/>`robots.txt` is the site's way of telling search engines like Google (and their crawlers) what they're allowed to explore and where they have access.

Look at the practice site's file:

```sh
curl -s http://localhost:8080/robots.txt
#
# User-agent: *
# Disallow: /blog
```

`Disallow: /blog` is dangerous because it stops crawlers from reading every path that starts with `/blog`. And usually, your articles are what promote your site the most.

Google's [<VPIcon icon="fa-brands fa-google"/>robots.txt documentation](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt) gives the same kind of example: `Disallow: /fish` also blocks `/fish.html` and `/fishheads`.

To fix it, make the rule match only what you meant to block, for example a folder of drafts:

```plaintext
User-agent: *
Disallow: /blog-drafts/
```

In the practice site, change the `html` line of the `'/robots.txt'` entry:

```js
html: 'User-agent: *\nDisallow: /blog-drafts/\n',
```

robots.txt controls crawling, not indexing. Google says it's [<VPIcon icon="fa-brands fa-google"/>not a mechanism for keeping a page out of Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro). For that, you need `noindex`.

A URL blocked in robots.txt can even appear in search results, usually without a description, if other pages link to it. Google just never reads what's on the page.

---

## How to Find an Accidental noindex

`noindex` tells Google not to index a particular page. It's harmful when it ends up on pages you do want indexed and ranked, like a product page or your home page.

But it can be useful on pages you don't need to rank for, or that don't add much to the site, such as log in, sign in, and sign up pages.

`noindex` works only when the crawler can reach the page and read the rule. If robots.txt blocks the same URL, Google never sees the `noindex`, and the page can still show up in search results. So for a page you want out of Google, use `noindex` and leave the page crawlable.

In the data, 11 of 457 audited pages (2.4%) had a `noindex` robots meta tag. There are [<VPIcon icon="fa-brands fa-google"/>two ways to set it](https://developers.google.com/search/docs/crawling-indexing/block-indexing), and you need to check both.

### How to Check the Robots Meta Tag

The first way is a tag in the page's `<head>`:

```html
<meta name="robots" content="noindex">
```

Search the page for the word:

```sh
curl -s http://localhost:8080/about | grep -i noindex
```

On the About page, this prints nothing. You can also right-click the page, choose **View Page Source,** and search for `noindex`.

Fixing a noindex is really easy. You basically remove it, and then search engines can index the page.

Look for it in the page's code or template, and in your CMS or SEO plugin settings. In WordPress, the setting **Discourage search engines from indexing this site** adds it to every page.

### How to Check the X-Robots-Tag Header

The second way is an HTTP header. Check the About page's headers:

```sh
curl -sI http://localhost:8080/about
#
# HTTP/1.1 200 OK
# Content-Type: text/html; charset=utf-8
# X-Robots-Tag: noindex
# Date: Sun, 25 Oct 2026 17:42:59 GMT
# Connection: keep-alive
# Keep-Alive: timeout=5
```

The header doesn't appear in View Page Source, only in the response headers. In the data, 5 of the 12 blocked pages had no `noindex` in their HTML: 2 had this header, and 3 were blocked from crawling by robots.txt.

To fix it in the practice site, delete the `headers` line from the `'/about'` entry. On a real site, check the server configuration, the hosting provider's header settings, and any SEO plugin.

---

## How to Use Canonical Tags Correctly

If you have several pages that talk about more or less the same thing, but without enough meat to be different, you want to designate one main page. The canonical tag tells search engines which page that is.

The same page can also live at several addresses:

```plaintext
https://example.com/blog/choosing-trail-shoes
https://example.com/blog/choosing-trail-shoes?utm_source=newsletter
https://www.example.com/blog/choosing-trail-shoes
```

These three addresses show the same article. The first one is the main one: the address you want Google to show in search results. So all three carry the same canonical tag, pointing to that main page:

```html
<link rel="canonical" href="https://example.com/blog/choosing-trail-shoes">
```

When Google sees this tag on the `?utm_source=newsletter` version, it knows that page is a copy of the first address. The main address carries the same tag, pointing to itself. That's called a self-referencing canonical, and it says: I'm the main version.

Google treats it as a [<VPIcon icon="fa-brands fa-google"/>strong signal, not a command](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). If you use canonical tags, a self-referencing one on each main page is a good practice, and Google recommends it.

But you don't have to use canonical tags at all. Google says specifying a canonical isn't required: without one, it picks the version it thinks is best to show users. A canonical tag is a good choice when the same or very similar content is reachable at more than one URL, like the three addresses above.

That's why a missing canonical tag isn't a defect by itself. In the data, 27.1% of 457 audited pages had no canonical tag. What matters is whether any of them have duplicates, like a version with tracking parameters, that need one.

Check the practice site's trail shoe article:

```sh
curl -s http://localhost:8080/blog/choosing-trail-shoes | grep -i canonical
#
# <link rel="canonical" href="http://localhost:8080/">
```

The article says its main version is the home page, so Google may show the home page instead of it, or ignore the tag.

The article isn't a copy of anything, so it's its own main version. To fix it, point the article's canonical tag to the article itself:

```js
canonical: '/blog/choosing-trail-shoes',
```

---

## How to Fix Missing and Duplicate Titles and Meta Descriptions

A good title or meta description is the right length, isn't overloaded, and says briefly what the page is about. It's sort of the essence of the page, like its introduction.

Look at the Blue Runner product page:

```sh
curl -s http://localhost:8080/products/blue-runner | grep -i -E "<title>|name=\"description\""
#
# <title>Acme Shoes</title>
```

The title says nothing about the page, and there's no description line at all. In PowerShell, use `| Select-String '<title>|name="description"'` for this one.

Google's guides to [<VPIcon icon="fa-brands fa-google"/>titles](https://developers.google.com/search/docs/appearance/title-link) and [<VPIcon icon="fa-brands fa-google"/>snippets](https://developers.google.com/search/docs/appearance/snippet) ask for a unique, descriptive title and description on every page.

To fix it in the practice site, replace the `title` line of the `'/products/blue-runner'` entry with:

```js
title: 'Blue Runner Road Running Shoe | Acme Shoes',
description: 'A lightweight road running shoe with a cushioned sole and free returns.',
```

---

## How to Make Your Links Crawlable

Look at the practice site's home page:

```sh
curl -s http://localhost:8080/
#
# <!doctype html>
# <html lang="en">
# <head>
# <meta charset="utf-8">
# <title>Acme Shoes: Running Shoes for Every Runner</title>
# <meta name="description" content="Lightweight running shoes for road and trail, with free returns.">
# <link rel="canonical" href="http://localhost:8080/">
# </head>
# <body>
# <h1>Acme Shoes</h1>
# <a href="/products/blue-runner">Blue Runner</a>
# <span onclick="location.href='/sale'">Summer sale</span>
# </body>
# </html>
```

Everything else on this page is fine: the title, the description, the canonical tag and the Blue Runner link, which is a real `<a>` element with an `href`. The only problem is the "Summer sale" `<span>`.

A `<span>` is basically HTML that isn't semantic, meaning it has no meaning. A real link does have meaning: search engines can understand it's a link, and screen readers can understand it's a link.

Which links need to be crawlable? Basically, everything you want search engines to see. I mean the products you sell, your articles, your courses, and other things like that.

Google's [<VPIcon icon="fa-brands fa-google"/>link guidelines](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) say it can only reliably crawl an `<a>` element with an `href`.

To fix it in the practice site, replace the `<span>` line with:

```js
'<a href="/sale">Summer sale</a>',
```

---

## How to Check Whether Your Content Needs JavaScript to Appear

With client-side rendering, the JavaScript has to load first, and only then can the other content load.

JavaScript usually builds things like product lists, prices, reviews and menus. Without it, a client-side page often shows only a loading message or an empty box.

Google does render JavaScript, but [<VPIcon icon="fa-brands fa-google"/>in a later phase](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). The page waits in a rendering queue, which can take a few seconds or longer, and a script that fails or is blocked can leave the rendered page without its content.

That's why server-side rendering is still a good idea, and it's what I prefer for the content that matters. Google's JavaScript guide says the same: server-side rendering makes the site faster for users and crawlers, and not all bots can run JavaScript.

In the data, 17.7% of 277 audited pages were built mostly with JavaScript. That doesn't mean Google couldn't index them, only that their main content depended on JavaScript running correctly.

With server-side rendering, the HTML content comes straight to the browser, and only after that does the JavaScript render.

Google can index pages built either way. Its crawler runs JavaScript with an up-to-date version of Chrome, so server-side rendering isn't a requirement for getting into Google's index.

The next test checks whether the important content is visible without JavaScript. It doesn't show what Google sees, because Google runs the JavaScript, but it shows what every crawler gets before any JavaScript runs.

Open `http://localhost:8080/catalog` in your browser. You'll see three products. Now download it with curl, which doesn't run JavaScript:

```sh
curl -s http://localhost:8080/catalog | grep -i "trail grip"
```

This prints nothing, because the product names aren't in the HTML the server sends. Inside `<body>`, the server only sends:

```html
<div id="app">Loading...</div>
<script>fetch('/api/products').then((r) => r.json()).then((products) => {document.getElementById('app').innerHTML = products.map((p) => '<h2>' + p + '</h2>').join('');});</script>
```

Without curl, use **View Page Source** in your browser. On this page, you'll see "Loading..." and the script, but none of the product names, because the browser adds them only after the JavaScript runs.

On your own site, search the source for an important sentence from the page.

To see the page the way Google renders it, use Google's own tools on a live page. On your own site, the URL Inspection tool in Search Console can run a live test (**Test live URL**, then **View tested page**) and show the HTML Google rendered and a screenshot.

For any public page, the [<VPIcon icon="fa-brands fa-google"/>Rich Results Test](https://search.google.com/test/rich-results) shows the rendered HTML too. Google [<VPIcon icon="fa-brands fa-google"/>recommends both](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript) for finding JavaScript problems. Neither can reach `localhost`, so try them on your real site.

If you want the product names in the HTML from the start, render them on the server. In the practice site, add the product list above `routes`:

```js
const products = ['Blue Runner', 'Trail Grip 2', 'City Glide'];
```

Replace the catalog's `body` and `script` lines with:

```js
body: '<div id="app">' + products.map((p) => '<h2>' + p + '</h2>').join('') + '</div>',
```

And in the `'/api/products'` entry:

```js
html: JSON.stringify(products),
```

Restart the server and run the curl command again:

```plaintext
<div id="app"><h2>Blue Runner</h2><h2>Trail Grip 2</h2><h2>City Glide</h2></div>
```

This works because the server now writes the product names into the HTML before it sends the page. Any crawler sees them, even one that can't run JavaScript, and you can still use JavaScript for the interactive parts.

---

## Can You Check a Page in Five Minutes?

Honestly, it's very hard. There can be a lot of problems, and five minutes isn't enough.

To really know what the problems are, you need to run a full check, for example in Google PageSpeed Insights. If the site is yours, also use the [<VPIcon icon="fa-brands fa-google"/>URL Inspection tool](https://support.google.com/webmasters/answer/9012289) in Google Search Console.

The commands from this tutorial are a good start:

1. `curl -sI` for the status code and an `X-Robots-Tag` header.
2. `curl -sIL` on an old address to count redirects.
3. `/robots.txt`, line by line.
4. View Page Source for `noindex`, `canonical`, `<title>`, `description` and your important content.

---

## Conclusion

In this tutorial, you fixed eight problems on a practice site: a soft 404, a redirect chain, a robots.txt rule, a hidden `noindex` header, a wrong canonical tag, a vague title and a missing description, a link crawlers couldn't follow, and content that needed JavaScript.

The most important thing to remember is that you'll need to check your site all the time. Run scans, do maintenance, and make sure nothing breaks, especially when you make improvements or changes to the site.

If you want to go further, my tutorial on [**adding structured data (JSON-LD) to a Next.js site**](/freecodecamp.org/nextjs-json-ld-structured-data.md) is a good next step.

If you'd like to check a live page for many of these issues in one go, my free tool [Greadme Page Audit](https://greadme.com/page-audit) tests any URL with no sign-up needed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Find and Fix Common Technical SEO Issues on Your Website",
  "desc": "Let's say you've built a website. You've invested in the design, bought a domain, and so on. But a website isn't only what you see on the screen. A lot happens behind the scenes. You have to understan",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/fix-common-technical-seo-issues.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
