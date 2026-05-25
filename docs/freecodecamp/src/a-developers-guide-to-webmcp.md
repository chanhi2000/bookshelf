---
lang: en-US
title: "A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard"
description: "Article(s) > A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard"
icon: iconfont icon-mcp
category:
  - Node.js
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard"
    - property: og:description
      content: "A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-developers-guide-to-webmcp.html
prev: /ai/mcp/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Chudi Nnorukam
    url: https://freecodecamp.org/news/author/chudinnorukam/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/650e6602-7993-423a-9d74-d6b88a6034e4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard"
  desc="I scanned 111,076 of the top 200,000 websites on the internet looking for a specific HTTP header. I found exactly zero. Not one domain has shipped WebMCP in production. Not a single Fortune 500 site. "
  url="https://freecodecamp.org/news/a-developers-guide-to-webmcp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/650e6602-7993-423a-9d74-d6b88a6034e4.png"/>

I scanned 111,076 of the top 200,000 websites on the internet looking for a specific HTTP header. I found exactly zero.

Not one domain has shipped WebMCP in production. Not a single Fortune 500 site. Not a startup trying to stay ahead. Not even a developer playground that forgot to take it down. Zero.

So I shipped it on two sites.

This is what I found.

::: note Prerequisites

To follow along with the implementation sections, you'll need:

- **Node.js 18+** and npm or pnpm
- A **SvelteKit** or **Next.js** project (the article covers both)
- **Chrome 146+ Canary** for testing WebMCP tool registration (download from the Chrome Canary channel)
- Basic familiarity with TypeScript and JSON schema definitions
- A deployed site on Vercel, Netlify, or similar (for the `.well-known` manifest approach)

:::

You don't need any AI agent or special browser extension. The implementation degrades silently in non-Canary browsers, so your production site won't break.

---

## What WebMCP Actually Is (And Why It Matters in 2026)

If you have been watching AI traffic data, one number should scare you a little: ClaudeBot's crawl-to-refer ratio is 10,600:1. Meaning for every 10,600 pages Claude crawls, it sends one referral click.

That ratio is actually improving, dropping 16.9% in recent months. But the pattern it reveals matters. AI agents are reading the web to answer questions. They are not sending users back to your site to read it themselves.

Right now, the standard model is: crawl, extract, respond. The user gets an answer. You get nothing.

WebMCP proposes a different model. Instead of just crawling your HTML, an AI agent could call your site's tools directly. Search your content. Retrieve structured data. Interact with your API. Not scrape-and-summarize, but query-and-respond.

The spec is a W3C Community Group Draft. Chrome 146 Canary has a partial implementation. Production browser support is probably 2027 at the earliest.

I shipped it anyway. Here is the full story.

---

## The Adoption Curve Nobody Is Talking About

Before I describe what I built, here is the data that made me want to build it.

I pulled Cloudflare Radar AI Insights data for the week of May 17-23, 2026, covering 111,076 scanned domains from the top 200,000.

![Cloudflare Radar Bot Traffic dashboard listing verified bots ranked by request volume, including GoogleBot, Meta-ExternalAgent, GPTBot, BingBot, and Applebot, each labeled as a search-engine or AI crawler.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/93c959ec-bb8c-4f91-a8f1-c5c67045ed4c.png)

| Standard | Adoption Rate | Approx. Domains |
| --- | --- | --- |
| <VPIcon icon="fas fa-file-lines"/>`robots.txt` | 83% | ~92,193 |
| AI rules (<VPIcon icon="fas fa-file-lines"/>`ai.txt` / <VPIcon icon="fas fa-file-lines"/>`llms.txt`) | 79% | ~87,750 |
| Sitemap | 68% | ~75,532 |
| Link headers | 9.6% | ~10,663 |
| Markdown negotiation | 5.3% | ~5,887 |
| OAuth discovery | 5.2% | ~5,776 |
| Content signals | ~4.7% | ~5,221 |
| Universal Commerce Protocol | 4.4% | ~4,888 |
| API catalog | 0.15% | ~167 |
| Agent Skills | 0.13% | ~144 |
| MCP Server Card | 0.11% | ~122 |
| WebBotAuth | 0.022% | ~24 |
| A2A Agent Card | 0.0081% | ~9 |
| ACP | 0.0036% | ~4 |
| MPP | 0.0018% | ~2 |
| x402 Payment | 0.0009% | ~1 |
| WebMCP | 0% | 0 |
| AP2 | 0% | 0 |

Read that table again. There are 17 distinct standards the web is sorting itself into for AI-era infrastructure. The bottom tier, MCP Server Card through the end of the table, is near-zero even among the most technical sites on the internet.

WebMCP is not struggling to reach 1%. It has not started yet.

A few things jumped out at me from this data.

First: the Googlebot dominance story is over. Google dropped from roughly 70% of all bot activity to roughly 40% over the past year. The top 5 AI bots now account for 71% of all AI bot HTTP traffic: Googlebot at 26.2%, Meta-ExternalAgent at 13.3%, Bytespider at 11.4%, GPTBot at 10.5%, and ClaudeBot at 9.3%.

Second: 8.7% of AI bot requests are getting hit with 403 Forbidden errors. That is not accidental. Someone is making a policy call to block AI crawlers. But blocking crawlers does not block AI agents from answering questions about your domain if that content has already been indexed. The ship left.

Third, and this is the part that actually motivated this whole project: the long tail of these standards trends toward interaction, not just indexing. robots.txt and ai.txt are about permission. WebMCP, A2A Agent Cards, and x402 Payment are about capability. They describe what AI agents can do with your site, not just what they are allowed to look at.

That shift from permission to capability is where I think the interesting infrastructure work is in 2026.

::: note Update (late May 2026)

Since drafting this, Google shipped the strongest argument for it. Lighthouse 13.3.0 (May 7, 2026) promoted an [<VPIcon icon="fa-brands fa-chrome"/>"Agentic Browsing" audit category](https://developer.chrome.com/docs/lighthouse/agentic-browsing/scoring) to default in Chrome, scoring any page on WebMCP tool registration, accessibility-tree quality, and <VPIcon icon="fas fa-file-lines"/>`llms.txt` presence. The platform owner is building the scoreboard before the game has started, and site adoption is still ~0%. That gap between the tooling existing and anyone using it is the window this article is about.

:::

---

## What I Actually Shipped: Two Sites, Two Approaches

I run two sites: [<VPIcon icon="fas fa-globe"/>chudi.dev](https://chudi.dev) (my personal site, SvelteKit) and [<VPIcon icon="fas fa-globe"/>citability.dev](https://citability.dev) (a product that measures AI citation rates).

I treated them as a two-experiment lab for this.

### Experiment 1: chudi.dev (SvelteKit, polyfill approach)

My personal site is a SvelteKit app. SvelteKit is fast to iterate on, my content is simple, and I could move quickly.

The current WebMCP spec describes a `navigator.modelContext` browser API. Specifically, a `registerTool()` method that lets a page declare callable tools to an AI agent operating in the same browser context. The spec is still evolving. Chrome 146 Canary has a partial implementation, but it is not spec-compliant on `registerTool()` yet.

The `@mcp-b/global` polyfill bridges this gap. It implements a `provideContext()` convention that works in Chrome 146+ Canary and degrades silently in other browsers (no errors thrown, no broken UX).

Here is the core of <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`webmcp.ts`, which is 146 lines total:

```ts :collapsed-lines title="src/lib/webmcp.ts"
// WebMCP polyfill integration for chudi.dev
// Spec: W3C Community Group Draft (pre-production)
// Polyfill: @mcp-b/global (navigator.modelContext.provideContext convention)

import { browser } from '$app/environment';

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>) => Promise<unknown>;
}

interface PostSearchResult {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
}

// Only runs in browser context; degrades silently in SSR + non-Canary
export async function initWebMCP(posts: PostSearchResult[]) {
  if (!browser) return;

  // Feature-detect the polyfill convention, not the spec method
  const ctx = (navigator as any).modelContext;
  if (!ctx?.provideContext) return;

  const tools: WebMCPTool[] = [
    {
      name: 'searchPosts',
      description: 'Search chudi.dev articles by keyword. Returns matching posts with title, excerpt, and URL.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to match against post titles and content'
          }
        },
        required: ['query']
      },
      handler: async ({ query }: { query: string }) => {
        const q = String(query).toLowerCase();
        return posts
          .filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
          )
          .map(p => ({
            title: p.title,
            excerpt: p.excerpt,
            url: `https://chudi.dev/blog/${p.slug}`,
            publishedAt: p.publishedAt
          }));
      }
    },
    {
      name: 'listPosts',
      description: 'List all published posts on chudi.dev, newest first.',
      inputSchema: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            description: 'Maximum number of posts to return (default: 10)'
          }
        }
      },
      handler: async ({ limit = 10 }: { limit?: number }) => {
        return posts.slice(0, limit).map(p => ({
          title: p.title,
          url: `https://chudi.dev/blog/${p.slug}`,
          publishedAt: p.publishedAt,
          tags: p.tags
        }));
      }
    },
    {
      name: 'getAuthorContext',
      description: 'Get structured context about Chudi Nnorukam: expertise, current projects, contact.',
      inputSchema: {
        type: 'object',
        properties: {}
      },
      handler: async () => ({
        name: 'Chudi Nnorukam',
        role: 'AI Harness Engineer',
        focus: ['AI-visible web architecture', 'agentic SEO', 'Claude Code harness engineering'],
        currentProjects: ['citability.dev', 'chudi.dev', 'Tradeify'],
        contact: 'https://chudi.dev/contact',
        writing: 'https://chudi.dev/blog'
      })
    }
  ];

  try {
    await ctx.provideContext({
      name: 'chudi-dev',
      description: 'Content and context for chudi.dev - AI harness engineering and agentic web architecture',
      tools
    });
  } catch (e) {
    // Silently swallow; polyfill convention may change before spec lands
    console.debug('[webmcp] provideContext failed:', e);
  }
}
```

The tools are deliberately read-only. No write operations, no auth, no session state. The spec does not define authentication at this layer, and I did not want to ship something that creates security surface for a standard that is still evolving.

I call `initWebMCP()` from the SvelteKit layout load function, passing in the posts array:

```ts title="src/routes/+layout.ts"
import { initWebMCP } from '$lib/webmcp';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
  const res = await fetch('/api/posts');
  const posts = await res.json();

  // Non-blocking; runs only in browser context
  initWebMCP(posts);

  return { posts };
};
```

Clean separation. The layout does not care whether WebMCP succeeded. The polyfill either attaches or it does not.

### Experiment 2: citability.dev (Next.js, manifest approach)

My second site, [<VPIcon icon="fas fa-globe"/>citability.dev](https://citability.dev), needed a different approach. It is a product with an actual API. If WebMCP ever reaches production, I want citability.dev to be immediately callable by AI agents.

For this one, I went with the `.well-known/webmcp` manifest route rather than the polyfill. The manifest approach is more aligned with how server-side MCP discovery is supposed to work as the spec matures.

The manifest lives at <VPIcon icon="fas fa-folder-open"/>`public/.well-known/webmcp`:

![The live WebMCP manifest served at <VPIcon icon="fas fa-folder-open"/>`citability.dev/.well-known/webmcp`, a JSON document declaring agent-callable tools such as run_citability_scan and request_audit with their input schemas and rate limits.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/2b05e49d-c745-43e5-8d7b-865b14f5e310.png)

```json :collapsed-lines
{
  "name": "citability",
  "version": "1.0.0",
  "description": "AI citation rate measurement for websites. Run a scan to see how often ChatGPT, Claude, and Perplexity cite your domain.",
  "tools": [
    {
      "name": "run_citability_scan",
      "description": "Run a free citation rate scan for a domain. Checks how often ChatGPT, Claude, and Perplexity cite the domain across 20 test queries.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "domain": {
            "type": "string",
            "description": "The domain to scan, e.g. example.com"
          }
        },
        "required": ["domain"]
      },
      "endpoint": "/api/scan",
      "method": "POST",
      "pricing": {
        "type": "free",
        "cost": 0
      }
    },
    {
      "name": "request_audit",
      "description": "Request a full citation audit with detailed recommendations. Returns a Stripe checkout URL for the selected tier.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "domain": {
            "type": "string",
            "description": "The domain to audit"
          },
          "tier": {
            "type": "string",
            "enum": ["starter", "growth", "authority"],
            "description": "Audit tier"
          }
        },
        "required": ["domain", "tier"]
      },
      "endpoint": "/api/audit/request",
      "method": "POST"
    },
    {
      "name": "get_audit_result",
      "description": "Retrieve a completed audit result by audit ID.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "audit_id": {
            "type": "string"
          }
        },
        "required": ["audit_id"]
      },
      "endpoint": "/api/audit/{audit_id}",
      "method": "GET"
    },
    {
      "name": "list_audit_tiers",
      "description": "List available citability audit tiers with pricing and feature details.",
      "inputSchema": {
        "type": "object",
        "properties": {}
      },
      "endpoint": "/api/tiers",
      "method": "GET"
    }
  ]
}
```

I also shipped an A2A AgentCard at <VPIcon icon="fas fa-folder-open"/>`.well-known/`<VPIcon icon="iconfont icon-json"/>`agent.json`:

```json title="public/.well-known/agent.json"
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "citability",
  "url": "https://citability.dev",
  "description": "Measure and improve your AI citation rate across ChatGPT, Perplexity, and Claude.",
  "applicationCategory": "DeveloperApplication",
  "featureList": [
    "AI citation rate scanning",
    "Per-AI-engine breakdown",
    "Citation improvement recommendations",
    "Audit reports with actionable fixes"
  ],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free scan available"
  },
  "provider": {
    "@type": "Person",
    "name": "Chudi Nnorukam",
    "url": "https://chudi.dev"
  }
}
```

The citability.dev A2A AgentCard puts me in the 0.0081% of scanned domains that have shipped one. Not a large club.

---

## What I Learned From Shipping Something Nobody Else Has

Here is what I expected: zero agent traffic, nothing interesting in logs, a clean-but-inert implementation to point at.

Here is what actually happened. I shipped chudi.dev's WebMCP tools on February 23, 2026. In the 93 days since, zero external AI agents have called `searchPosts`, `listPosts`, or `getAuthorContext`. Zero. I shipped citability.dev's <VPIcon icon="fas fa-folder-open"/>`.well-known/webmcp` manifest on May 22 with four production-grade tools including a free scan endpoint. In the five days since, zero agent calls to `run_citability_scan`. Vercel's edge function invocation logs for both sites show exactly the traffic you would expect: human browsers, Googlebot crawling HTML, ClaudeBot crawling HTML, GPTBot crawling HTML. Nobody invoking the WebMCP tools.

![Vercel observability logs for chudi.dev showing only routine crawler traffic and 404 bot probes, with zero calls to the site's WebMCP tools (searchPosts, listPosts, getAuthor).](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/821a1256-4d9b-4ba9-9151-5d1e7b8a9fe3.png)

The null result is the most informative part of this experiment.

The polyfill convention (`.provideContext()`) is not the final spec. Chrome 146 Canary's implementation targets a different method signature than the polyfill uses. That means right now, there is no browser in production that fully executes the code I shipped. The polyfill degrades silently. My tools are declared and ready. Nothing calls them yet.

This is not a failure. This is exactly what first-mover positioning looks like before the spec stabilizes.

I want to be specific about what "positioning" actually means here, because it is not just marketing language.

When a spec reaches production browsers, the sites that have correct implementations get indexed by whatever discovery mechanism emerges first. For robots.txt in 2009, early adopters had established crawl policies before Google's bots changed behavior. For Open Graph in 2010, pages with correct metadata got richer previews before the standard was widely understood. For WebMCP in 2027, whenever it lands, the sites with working tool declarations will be immediately callable by AI agents that implement the spec.

The alternative is to wait and implement later. But "later" in this context means implementing at the same time as everyone else, when the infrastructure advantage is gone.

There is also a second value: you learn the spec while it is still plastic.

The W3C Community Group draft has changed in ways I did not anticipate. The `registerTool()` method in the spec behaves differently from the `provideContext()` polyfill convention. The manifest location (`/.well-known/webmcp`) is not yet canonical. Authentication at the WebMCP layer is still unresolved. By shipping early, I have already encountered two of these gaps and adapted.

---

## The Part That Actually Surprised Me: What the Adoption Curve Means for Today

Go back to that data table. Look at where the curve breaks.

Everything above the double-line (robots.txt through OAuth discovery) has crossed meaningful adoption. Sites are actually doing these things. Even the lower ones in that top group, Markdown negotiation at 5.3% and OAuth discovery at 5.2%, represent thousands of domains actively telling AI agents something structured about their content or identity.

Everything below the double-line is essentially zero. Not low-single-digits. Zero or near-zero.

This is not a linear curve. It is a cliff. And the cliff maps almost exactly to the distinction between passive signals and active capabilities.

Passive signals: robots.txt, ai.txt, sitemaps, link headers, content signals. These tell agents what you have and whether you consent to them using it.

Active capabilities: WebMCP, A2A Agent Cards, x402 Payment, ACP. These tell agents what they can do with your infrastructure.

The cliff is not there because developers do not know about the active capability standards. It is there because those standards are not stable yet. You cannot ship a payment protocol that costs you money if the spec changes mid-flight.

But here is the thing: the standards above the cliff are also not stable. robots.txt has extensions added to it constantly. ai.txt/llms.txt is still in flux. Sites shipped those anyway because the surface area of getting it wrong is small.

WebMCP has a larger surface area if you get it wrong. But you can get it right for the read-only case. Three tools that let an AI search your content and retrieve structured data about who you are, those have near-zero blast radius. If the spec changes, you update 146 lines and redeploy.

The cost of being early is very low. The cost of being late is unclear but probably real.

---

## How to Ship WebMCP Today (Full Implementation Path)

If you want to implement this yourself, here is the exact path I followed.

### Step 1: Install the polyfill (SvelteKit / Vite-based projects)

```sh
npm i @mcp-b/global
```

For Next.js, the manifest approach is cleaner than the polyfill:

```sh
# No npm package needed; just create the manifest file
mkdir -p public/.well-known
touch public/.well-known/webmcp
```

### Step 2: Define your tools as read-only first

Before anything else, decide what structured data you want AI agents to be able to query. Start with:

- A search tool (takes a query, returns matching content)
- A list tool (returns recent or relevant items)
- A context tool (returns structured metadata about your site or product)

Do not start with write operations. The spec does not define auth at this layer. Read-only tools have no security surface.

### Step 3: SvelteKit polyfill integration

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/webmcp.ts` based on the pattern above. The key checks:

```ts title"src/lib/webmcp.ts"
if (!browser) return;                          // Guard SSR
const ctx = (navigator as any).modelContext;
if (!ctx?.provideContext) return;              // Guard non-Canary
```

Both guards are non-negotiable. Forgetting the `browser` guard will throw `ReferenceError: navigator is not defined` during SSR. Forgetting the `provideContext` guard will throw on any browser that has not polyfilled `modelContext`.

### Step 4: Next.js manifest approach

Create <VPIcon icon="fas fa-folder-open"/>`public/.well-known/webmcp` (no extension, served as `application/json`) and populate it with your tool definitions. Serve with correct content-type:

```ts title="app/api/well-known/webmcp/route.ts"
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'your-site',
    version: '1.0.0',
    description: 'What your site does',
    tools: [
      // your tool definitions
    ]
  };

  return NextResponse.json(manifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
```

The CORS header matters. AI agents running in browser contexts will hit this endpoint from a different origin than your page.

### Step 5: Add the A2A AgentCard while you are in there

You are already creating a `.well-known` directory. The A2A AgentCard is 20 lines of JSON and puts you in the top 0.0081% of scanned domains. Not shipping it while you are already there is leaving easy positioning on the table.

### Step 6: Test in Chrome Canary

Download Chrome 146+ Canary. Open your site. Open DevTools, Console tab. Run:

```js
navigator.modelContext?.provideContext
```

![The chudi.dev homepage (headline: “A personal site built for humans, LLM retrieval, and AI agents”), the SvelteKit site running the WebMCP polyfill described in this section.](https://cdn.hashnode.com/uploads/covers/69d995ffc8e5007ddb1e81bb/43d3b2de-7842-44e1-a447-9c505297e196.png)

If the polyfill loaded, you will see the function. If it returns `undefined`, the polyfill did not load (check your initialization code) or you are not on a compatible Canary build.

There is currently no production AI agent that will call these tools. You are testing that the infrastructure is ready, not that it is being used.

---

## The Practical Answer to "Why Bother Now"

Every developer I have described this project to asks the same question: why ship something with 0% adoption when you could wait and ship it in 2027 when browsers support it natively and the spec is stable?

The answer has three parts.

First: the implementation cost right now is low. My chudi.dev implementation is 146 lines. The citability.dev manifest is 60 lines of JSON and one Next.js route. This is not a multi-sprint infrastructure project. If the spec changes substantially, I update 146 lines.

Second: the learning compounds. The spec is still plastic. Reading about WebMCP and implementing it are different activities. The questions I have after implementing, why does `registerTool()` differ from `provideContext()`, how does discovery work across origins, what happens when two tools have the same name, are questions I would not have if I had only read the spec. That knowledge is worth having before 2027, not after.

Third: the data suggests a cliff in the adoption curve, and cliffs have early-mover dynamics. When robots.txt support crossed from near-zero to meaningful adoption, it did not happen gradually. It happened because Googlebot started enforcing it and sites with correct implementations had an advantage. Whatever enforcement or discovery mechanism triggers WebMCP adoption will likely follow the same curve. Being on the right side of that cliff when it moves is easier if you are already there.

None of this is certain. The spec could change dramatically. Browser support could arrive later than 2027. AI agents might implement a different discovery mechanism entirely. I have shipped implementations that might need significant rework.

That is fine. The alternative is waiting, and waiting means starting later than people who shipped early.

---

## Where This Goes Next

The Cloudflare data shows 17 standards competing for AI infrastructure mindshare on the web. Most developers have implemented the top three or four: robots.txt, some variant of ai.txt, a sitemap.

The bottom of the curve is zero. That is not a ceiling, it is a starting point.

If your site has content that would be useful to an AI agent in a browser context, you have a read-only WebMCP tool to build. If your product has an API that AI agents should be able to call, you have a manifest to write. Neither of these requires waiting for the spec to stabilize.

I have both running. Neither is being called yet. But the infrastructure is in place for when it is.

If you want to measure how AI agents are actually engaging with your content today, not just in 2027, I built [<VPIcon icon="fas fa-globe"/>citability.dev](https://citability.dev) for exactly that. Free scan, no account required.

The adoption curve starts somewhere. Right now, for WebMCP, that somewhere is you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Developer's Guide to WebMCP: Shipping a 0% Adoption Standard",
  "desc": "I scanned 111,076 of the top 200,000 websites on the internet looking for a specific HTTP header. I found exactly zero. Not one domain has shipped WebMCP in production. Not a single Fortune 500 site. ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-developers-guide-to-webmcp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
