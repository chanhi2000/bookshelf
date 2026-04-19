---
lang: en-US
title: "How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages"
description: "Article(s) > How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages"
icon: fa-brands fa-wordpress
category:
  - PHP
  - WordPress
  - Node.js
  - Astro
  - DevOps
  - Cloudflare
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
  - wordpress
  - node
  - nodejs
  - node-js
  - astro
  - astrojs
  - astro-js
  - devops
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages"
    - property: og:description
      content: "How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-headless-wordpress-frontend-with-astro-ssr-on-cloudflare-pages.html
prev: /programming/php-wordpress/articles/README.md
date: 2026-04-21
isOriginal: false
author:
  - name: Tech With RJ
    url: https://freecodecamp.org/news/author/LeeRenJie/
cover: https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/87087639-b2d1-4641-a2c9-f8f369b49406.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Wordpress > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php-wordpress/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Astro > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-astro/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages"
  desc="This tutorial shows you how to run WordPress as a headless CMS with an Astro frontend deployed to Cloudflare Pages. For a project I was recently working on, the requirement was to use WordPress as the"
  url="https://freecodecamp.org/news/how-to-build-a-headless-wordpress-frontend-with-astro-ssr-on-cloudflare-pages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/87087639-b2d1-4641-a2c9-f8f369b49406.png"/>

This tutorial shows you how to run WordPress as a headless CMS with an Astro frontend deployed to Cloudflare Pages.

For a project I was recently working on, the requirement was to use WordPress as the site's backend. Content management, blog posts, and media were all handled through the WordPress admin. The frontend was open: it could be a theme, a template, or something customized through Elementor.

I could've built the same result in Elementor, but the process would've been slower and harder to maintain. Drag-and-drop works until the design gets specific, and then every small tweak costs more time than it should.

As a full stack developer, writing code turned out to be faster for me and produced cleaner output. Tools like Claude Code make the iteration cycle even tighter. So I kept the requirement – WordPress as the backend – and decided to build the frontend separately in code.

I wanted to share how I did this so that, if you're facing similar requirements, you'll know the way forward.

By the end of this tutorial, you'll have:

- A WordPress install serving content through its REST API on a subdomain
- An Astro SSR frontend rendering the content on the root domain
- A Cloudflare Pages deployment triggered on every git push
- Security hardening for a headless WordPress setup
- Draft post preview working across both systems

::: note Prerequisites

You should be comfortable with the command line, have basic familiarity with WordPress admin, and know enough JavaScript to read and write simple functions.

To follow along, you'll need a WordPress installation, a GitHub account, and a Cloudflare account.

:::

---

## Why Headless WordPress?

Headless WordPress separates content management from content delivery. WordPress keeps doing what it handles well: storing content and giving editors a familiar admin interface. A separate frontend handles rendering, routing, and performance.

A few situations where this split pays off:

- Your content team is trained on WordPress and moving them elsewhere would slow everyone down. Headless preserves their workflow and gives you a modern frontend.
- Your site needs a design or interaction pattern that a WordPress theme or page builder struggles to deliver. Custom dashboards, interactive tools, data-driven layouts, or integrations with non-WordPress APIs all fit here.
- You want edge delivery and modern tooling without rebuilding content management from scratch. WordPress handles content and media well. A JavaScript frontend on a CDN handles delivery well. Headless lets each side do its job.
- You need the same content across multiple surfaces. One WordPress install feeds a marketing site, a mobile app, and an internal dashboard through the same REST API.

Headless is not a fit for every site. Skip it if your site is a simple brochure, if one person does everything in the admin, or if you have no developer time to maintain a second codebase. A regular WordPress theme is the better answer there.

---

## The Architecture

The term "headless" means you strip WordPress of its frontend responsibility. Instead of WordPress generating and serving HTML pages to visitors, it only stores and serves content through its REST API. A separate frontend framework, in this case Astro, handles what the visitor actually sees.

![Diagram of a headless WordPress setup with Cloudflare Pages and Astro SSR fetching content via the WordPress REST API, with GitHub auto-deploy and a CMS subdomain for editors.](https://cdn.hashnode.com/uploads/covers/605584805f8d5121697263ca/0508174b-0740-47cf-a780-943a0c254ae1.png)
<!-- TODO: mermaid화 -->

When a visitor loads a page, the request hits Cloudflare Pages, which runs the Astro server. Astro fetches the relevant content from WordPress via the REST API, builds the HTML, and returns it to the visitor. WordPress never touches the visitor's browser.

Content editors log into the WordPress admin at the CMS subdomain. They write, publish, and manage content as they normally would. The moment they publish, the content is live. There's no rebuild step because Astro fetches fresh data on every request.

The REST API has been built into WordPress since version 4.7. You don't need a GraphQL plugin, a paid headless CMS service, or any extra infrastructure.

---

## Why Astro?

You could use Next.js, Nuxt, or SvelteKit here as well. But I chose Astro because its defaults fit this use case.

Astro compiles components to plain HTML and ships zero JavaScript to the browser by default. You only add client-side JavaScript where you explicitly need it.

For a CMS-driven site, most pages need none. SSR mode means every request fetches fresh data from WordPress at runtime, so content changes go live immediately without a rebuild. Cloudflare has an official adapter that handles the build output. Tailwind v4 integrates through a Vite plugin with no config file needed.

If WordPress wasn't a requirement, I would have used Next.js with Payload CMS. Payload gives you a fully typed CMS built in TypeScript that sits inside the same Next.js project, with more control over your content schema from day one. But the requirement was WordPress, and for a WordPress REST API frontend, Astro is the faster and cleaner choice.

---

## Infrastructure Setup

Here's my setup: domain at Namecheap, WordPress on Hostinger shared hosting, and a Google Workspace email. The steps below apply to any host, whether shared hosting with cPanel or hPanel, a VPS with Apache or Nginx, or a self-managed server.

### Step 1: Move DNS to Cloudflare

First, you'll need to move your domain's nameservers to Cloudflare. This gives you free DDoS protection, SSL, and the ability to attach a custom domain to Cloudflare Pages.

Before switching, verify that all DNS records transferred correctly, including your website A or CNAME records. For email, get your MX, SPF, DKIM, and DMARC values from your email provider's admin panel and add them to Cloudflare DNS first, otherwise email breaks during propagation.

### Step 2: Create the CMS Subdomain

Move WordPress to `cms.yourdomain.com` so the root domain is free for Astro. In Cloudflare DNS, add an A record pointing `cms` at your server IP, or a CNAME if your host uses a CDN hostname. Then create the subdomain in your hosting panel pointing to the same WordPress directory.

One thing people miss: your server needs its own SSL certificate for the connection between Cloudflare and your origin to work. Cloudflare handles SSL at its edge, but if the origin has no certificate, you get a 525 error.

On Hostinger, this isn't automatic for new subdomains. Install it manually through hPanel. On cPanel, use Let's Encrypt. On a VPS, use Certbot.

Moving WordPress off the root domain also means `/wp-admin` no longer exists at your main domain, which reduces exposure. But the default login path is still `/wp-admin` on the subdomain. That is the first thing you should change — more on this in the Good to Know section at the end.

---

## WordPress Configuration

### Tell WordPress it Lives on the Subdomain

In <VPIcon icon="fa-brands fa-php"/>`wp-config.php`, before the "That's all, stop editing!" comment:

```php title="wp-config.php"
define('WP_HOME',    'https://cms.yourdomain.com');
define('WP_SITEURL', 'https://cms.yourdomain.com');
```

WordPress admin is now at `cms.yourdomain.com/wp-admin`. The old path at the root domain stops working. That's intentional.

### Must-Use Plugin: Redirect and Preview

WordPress has a folder called `mu-plugins` inside `wp-content`. Files placed there are treated as must-use plugins. They load automatically on every request, before regular plugins, and there is no way to activate or deactivate them through the admin UI. This makes them the right place for behaviour you never want accidentally turned off.

Create <VPIcon icon="fas fa-folder-open"/>`wp-content/mu-plugins/`<VPIcon icon="fa-brands fa-php"/>`headless-redirect.php`:

```php title="wp-content/mu-plugins/headless-redirect.php"
<?php
/*
Plugin Name: Headless Redirect
Description: Redirects frontend visitors to the Astro site and rewires the WordPress preview link.
*/

add_action('template_redirect', function() {
    if (is_user_logged_in()) return;
    if ($_SERVER['HTTP_HOST'] === 'cms.yourdomain.com') {
        wp_redirect('https://yourdomain.com', 302);
        exit;
    }
});

add_filter('preview_post_link', function(\(link, \)post) {
    $token = HEADLESS_PREVIEW_SECRET;
    \(type  = \)post->post_type;
    return 'https://yourdomain.com/preview?type=' . \(type . '&id=' . \)post->ID . '&token=' . $token;
}, 10, 2);
```

The `template_redirect` action fires when WordPress is about to render a page. If the visitor isn't logged in and the request is on the CMS subdomain, it redirects them to the main frontend. Logged-in editors pass through to the admin normally. REST API requests to `/wp-json/...` don't go through `template_redirect` at all, so they are unaffected.

The `preview_post_link` filter changes what happens when an editor clicks Preview on a draft post. By default, WordPress previews using its own theme, which in a headless setup renders blank.

This filter replaces that URL with a request to your Astro `/preview` page, passing the post ID, post type, and a secret token. Your Astro preview page uses those values to fetch the draft via the REST API and renders it exactly as it would appear live.

### Clean Up Plugins

Now it's time to remove everything that renders the frontend: page builders, caching plugins, and hosting onboarding plugins.

But you'll want to keep Akismet, Wordfence, and Yoast SEO. Yoast adds SEO meta and Open Graph data directly to the REST API response, which your Astro pages read through `post.yoast_head_json`.

Then switch the active theme to a lightweight default. WordPress requires one active, but nobody sees it.

---

## The Astro Frontend

Start with `pnpm create astro@latest`, then install the Cloudflare adapter and Tailwind:

```sh
pnpm add @astrojs/cloudflare
pnpm add -D @tailwindcss/vite tailwindcss
```

### astro.config.mjs

```js
import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' }),
  vite: { plugins: [tailwindcss()] },
})
```

`output: 'server'` puts Astro into full SSR mode. Without it, Astro pre-renders pages at build time, which breaks dynamic routes like `/blog/[slug]` that depend on WordPress content that didn't exist at build time.

`imageService: 'passthrough'` is required specifically for Cloudflare Workers. Astro's default image service uses Sharp, which depends on `child_process` and `fs`. Those Node.js built-ins don't exist in the Cloudflare Workers runtime. The deployment fails with a module resolution error. Setting passthrough skips image processing entirely and renders standard `<img>` tags instead.

### <VPIcon icon="iconfont icon-dotenv"/>`.env`

```sh title=".env"
WORDPRESS_API_URL=https://cms.yourdomain.com
```

Add this same variable in Cloudflare Pages project settings under Environment Variables before deploying.

### <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="fa-brands fa-js"/>`wordpress.js`

This file is the single place all WordPress API calls go through. Centralising them means if the API URL or authentication changes, you update one file.

The `_embed` parameter is important. By default, a post response only includes the post data. Featured images, author details, and categories are separate entities with their own IDs. Without `_embed`, you would need additional API requests to fetch each one. Adding it inlines all that related data into the same response.

`cache: 'no-store'` on every fetch call is not optional. Cloudflare Workers runs a fetch cache internally that's separate from HTTP `Cache-Control` headers. Without disabling it, Cloudflare caches your WordPress API responses at the edge. An editor publishes a post and sees the old version on the frontend because the cached response is being served.

```js title="lib/wordpress.js"
const WP_URL = import.meta.env.WORDPRESS_API_URL

const fetchWP = (path) =>
  fetch(`\({WP_URL}\){path}`, { cache: 'no-store' }).then((r) => r.json())

export const getPosts = (page = 1, perPage = 10) =>
  fetchWP(`/wp-json/wp/v2/posts?_embed&per_page=\({perPage}&page=\){page}`)

export const getPostBySlug = async (slug) => {
  const posts = await fetchWP(`/wp-json/wp/v2/posts?_embed&slug=${slug}`)
  return posts[0]
}

export const getCategories = () =>
  fetchWP(`/wp-json/wp/v2/categories`)

export const getPostsByCategory = (categoryId, page = 1) =>
  fetchWP(`/wp-json/wp/v2/posts?_embed&categories=\({categoryId}&page=\){page}`)

export const getAllPostsForSitemap = () =>
  fetchWP(`/wp-json/wp/v2/posts?_fields=slug,modified&per_page=100`)
```

The sitemap function uses `_fields` instead of `_embed` to fetch only the fields it needs, keeping that request lightweight.

### <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`middleware.js`

Middleware runs on every request before the page handler. This one adds `Cache-Control: no-store` to every SSR response so Cloudflare doesn't cache the rendered HTML pages.

```js title="middleware.js"
export function onRequest(_context, next) {
  return next().then(response => {
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    newResponse.headers.set('CDN-Cache-Control', 'no-store')
    return newResponse
  })
}
```

The original Response from Astro has immutable headers, so you can't call `.headers.set()` on it directly. The fix is to construct a new Response using the original body and response as the init argument. The new Response has mutable headers, so `.set()` works. `CDN-Cache-Control` is a Cloudflare-specific header that controls caching at the edge independently from the standard `Cache-Control` header.

### <VPIcon icon="fas fa-folder-open"/>`src/layouts/`<VPIcon icon="iconfont icon-astro"/>`Layout.astro`

Every page goes through this layout. HTML structure, meta tags, and global imports live here so you don't repeat them on every page.

```astro title="layouts/Layout.astro"
---
interface Props {
  title: string
  description?: string
}
const { title, description = '' } = Astro.props
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot name="nav" />
    <main id="main-content"><slot /></main>
    <slot name="footer" />
  </body>
</html>
```

Named slots let the navbar and footer sit outside `<main>`, keeping the HTML landmark structure correct for accessibility.

### <VPIcon icon="fas fa-folder-open"/>`src/pages/blog/`<VPIcon icon="iconfont icon-astro"/>`index.astro`

```astro title="pages/blog/index.astro"
---
import Layout from '../../layouts/Layout.astro'
import { getPosts, getCategories, getPostsByCategory } from '../../lib/wordpress'

const page = Number(Astro.url.searchParams.get('page') ?? 1)
const categoryId = Astro.url.searchParams.get('category')

const [posts, categories] = await Promise.all([
  categoryId ? getPostsByCategory(categoryId, page) : getPosts(page, 10),
  getCategories(),
])
---
<Layout title="Blog">
  <nav>
    <a href="/blog">All</a>
    {categories.map((cat) => (
      <a href={`/blog?category=${cat.id}`}>{cat.name}</a>
    ))}
  </nav>

  <ul>
    {posts.map((post) => {
      const image   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
      const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? ''
      return (
        <li>
          {image && <img src={image} alt={imageAlt} />}
          <a href={`/blog/${post.slug}`} set:html={post.title.rendered} />
          <div set:html={post.excerpt.rendered} />
        </li>
      )
    })}
  </ul>

  {page > 1 && <a href={`/blog?page=${page - 1}`}>Previous</a>}
  <a href={`/blog?page=${page + 1}`}>Next</a>
</Layout>
```

`Promise.all` fetches posts and categories in parallel. The category filter reads from the URL query string so the same page handles both `/blog` and `/blog?category=5` without separate routes.

Featured images live inside `post._embedded['wp:featuredmedia'][0]` because `_embed` inlines the media object into the post response.

### <VPIcon icon="fas fa-folder-open"/>`src/pages/blog/`<VPIcon icon="iconfont icon-astro"/>`[slug].astro`

```astro title="pages/blog/[slug].astro"
---
import Layout from '../../layouts/Layout.astro'
import { getPostBySlug } from '../../lib/wordpress'

const { slug } = Astro.params
const post = await getPostBySlug(slug)
if (!post) return Astro.redirect('/404')

const image    = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ?? ''
const author   = post._embedded?.author?.[0]?.name
const seoTitle = post.yoast_head_json?.title ?? post.title.rendered
const seoDesc  = post.yoast_head_json?.og_description ?? ''
---
<Layout title={seoTitle} description={seoDesc}>
  <article>
    <h1 set:html={post.title.rendered} />
    <p>{author} · {new Date(post.date).toLocaleDateString()}</p>
    {image && <img src={image} alt={imageAlt} />}
    <div set:html={post.content.rendered} />
  </article>
</Layout>
```

Use `set:html` for WordPress content, not `{post.content.rendered}`. Astro treats curly brace expressions as text and escapes the HTML, so you see raw tags printed on the page instead of rendered content.

Always guard with `if (!post) return Astro.redirect('/404')`. If someone visits a slug that doesn't exist, the API returns an empty array. Without the guard, accessing properties on `undefined` throws an error that crashes the Cloudflare Worker and returns a 500. `post.yoast_head_json` is available when Yoast SEO is active. It contains the computed SEO title and description that Yoast generates. Using it means the SEO work done in WordPress carries over to the Astro frontend automatically.

### <VPIcon icon="fas fa-folder-open"/>`src/pages/`<VPIcon icon="iconfont icon-typsecript"/>`sitemap.xml.ts`

```ts title="pages/sitemap.xml.ts"
import type { APIRoute } from 'astro'
import { getAllPostsForSitemap } from '../lib/wordpress'

export const GET: APIRoute = async () => {
  const posts = await getAllPostsForSitemap()

  const urls = [
    { loc: 'https://yourdomain.com/', lastmod: new Date().toISOString() },
    { loc: 'https://yourdomain.com/blog/', lastmod: new Date().toISOString() },
    ...posts.map((p) => ({
      loc: `https://yourdomain.com/blog/${p.slug}/`,
      lastmod: p.modified,
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\({urls.map((u) => `  <url>\n    <loc>\){u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
```

This generates fresh XML on every request, so the sitemap always reflects currently published posts without a rebuild.

### <VPIcon icon="fas fa-folder-open"/>`src/styles/global.css

```css title="styles/global.css"
@import "tailwindcss";

@theme {
  --color-brand: #your-color;
  --font-sans: 'Your Font', sans-serif;
}
```

Tailwind v4 uses CSS-first configuration through the `@theme` block. CSS variables defined here become Tailwind utilities automatically. `--color-brand` becomes `bg-brand`, `text-brand`, and so on. No `tailwind.config.js` needed.

---

## CI/CD with Cloudflare Pages

With the Astro code in place, the last piece is getting it deployed. Cloudflare Pages connects directly to GitHub, so you don't have to maintain a separate pipeline.

Here are the steps:

1. Push your repo to GitHub.
2. Go to Cloudflare Pages, create a project, connect it to your GitHub repository.
3. Set the build command to `pnpm build` and the output directory to `dist`.
4. Under Environment Variables, add `WORDPRESS_API_URL` pointing to `https://cms.yourdomain.com`.
5. Deploy.

After the first deploy, every push to `main` triggers a new deployment automatically. Cloudflare runs the build, and within minutes the new version is live globally. Content updates in WordPress go live immediately, since Astro fetches from WordPress on every request. A developer pushing code and an editor publishing a post are completely independent operations.

---

## Final Thoughts

This setup exists because of the specific requirement that the content team was already on WordPress and changing that was not on the table.

If you're starting fresh with no CMS in place, this is probably not the stack you want. Go with something like Next.js and Payload CMS where the backend and frontend are designed to work together from the start.

But if your situation matches where content editors are already familiar with WordPress, and you need a custom frontend that a page builder can't deliver cleanly, then this separation makes sense.

::: tabs

@tab:active Pros:

- Content editors keep using WordPress. No retraining, no migration.
- The frontend has full control over design and behaviour. No theme or plugin constraints.
- Deployments are automatic on every push. Content changes go live immediately without a rebuild.
- No added cost for most sites. WordPress stays on its existing host. Cloudflare Pages is free within generous limits, and scales to $5 per month on the Workers Paid plan if you outgrow them.

@tab Cons:

- Two systems to maintain instead of one. You operate the WordPress install (updates, plugins, backups) and maintain the Astro codebase separately.
- The WordPress REST API has limitations. Complex content structures or real-time features need more work to handle compared to a purpose-built headless CMS.
- Adapter and deployment target are tied together. @astrojs/cloudflare v13 drops Pages support in favor of Workers, so staying on Pages means staying on v12. Details in the Good to Know section.
- Frontend changes require a developer. With Elementor, anyone with admin access could adjust layouts directly in the browser. Here, any visual change outside of content goes through code, which means it goes through you.

:::

The stack is WordPress on existing hosting, Astro on Cloudflare Pages, with GitHub as the bridge between development and production. It solves a specific problem cleanly. Outside of that problem, there are better options.

---

## Good to Know

### Change the default login URL immediately

Every bot targets `/wp-login.php` and `/wp-admin`. Install WPS Hide Login and move it to something custom. Anyone hitting the default paths gets a 404. **Remove the** `/wp-json/wp/v2/users` **endpoint.** It returns a public list of usernames. In headless mode you get author data through `_embed` and have no use for this endpoint. Add to the mu-plugin:

```php
add_filter('rest_endpoints', function($endpoints) {
    unset($endpoints['/wp/v2/users']);
    unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    return $endpoints;
});
```

### Disable XML-RPC and enable 2FA

Add `add_filter('xmlrpc_enabled', '__return_false')` to the mu-plugin — you aren't using it in headless mode and it's a common brute force target. Enable Wordfence's Brute Force Protection and add two-factor authentication through WP 2FA for all admin accounts.

### Don't upgrade `@astrojs/cloudflare` to v13 if you deploy via Cloudflare Pages git-push CI

v12 outputs `dist/_worker.js` which Pages CI expects. v13 outputs a different format for `wrangler deploy` — Pages CI falls back to serving the `dist` folder as a static site and every SSR route returns 404 with no helpful error message.

### The v12 adapter throws a deprecation warning on `entrypointResolution`

Silence it by adding `entrypointResolution: 'auto'` to the adapter options. Test before committing — it changes how the build locates the Worker entry file.

### Custom Post Types follow the same pattern

Register the CPT with `show_in_rest: true` and a `rest_base`, and it shows up at `/wp-json/wp/v2/your-base`. The same fetch helpers, `_embed`, and slug routing work exactly the same way.

### The REST API returns pagination headers

The raw response includes `X-WP-Total` and `X-WP-TotalPages` headers before you call `.json()`. If you want proper previous/next pagination, read those instead of guessing whether a next page exists.

### Wrap API calls in try/catch

If WordPress is unreachable, an unhandled fetch throws and returns a 500. A try/catch returns an empty page instead, which is a much better failure mode.

### Preview auth uses Application Passwords

WordPress 5.6 added Application Passwords under Users → Profile. That's what `WP_APP_USER` and `WP_APP_PASSWORD` in your `.env` should point to — not your regular admin password. Generate one per environment. Define the preview token as a constant in `wp-config.php` (`define('HEADLESS_PREVIEW_SECRET', '...')`) and reference that constant in the mu-plugin — never hardcode secrets in version-controlled files.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Headless WordPress Frontend with Astro SSR on Cloudflare Pages",
  "desc": "This tutorial shows you how to run WordPress as a headless CMS with an Astro frontend deployed to Cloudflare Pages. For a project I was recently working on, the requirement was to use WordPress as the",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-headless-wordpress-frontend-with-astro-ssr-on-cloudflare-pages.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
