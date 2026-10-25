---
lang: en-US
title: "Testing an iframe’s postMessage Handler"
description: "Article(s) > Testing an iframe’s postMessage Handler"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Testing an iframe’s postMessage Handler"
    - property: og:description
      content: "Testing an iframe’s postMessage Handler"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/testing-an-iframes-postmessage-handler.html
prev: /programming/css/articles/README.md
date: 2026-10-07
isOriginal: false
author:
  - name: Keshav Malik
    url: https://blog.master.dev/author/keshavmalik/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11245
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
  name="Testing an iframe’s postMessage Handler"
  desc="There are some real complexities using iframes and the postMessage API for communication between a widget and its parent. Security vulnerabilities like cross-origin scripting risks being one."
  url="https://blog.master.dev/testing-an-iframes-postmessage-handler/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11245"/>

An embedded widget lives in a strange spot. An iframe is a separate document, so the parent’s CSS doesn’t automatically cascade into its contents, and the frame’s CSS doesn’t cascade out, regardless of the origins involved. When the origins differ, the [<VPIcon icon="fa-brands fa-firefox"/>same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) goes further and keeps either side’s scripts out of the other’s DOM. Chris Coyier’s [**Scope in CSS**](/blog.master.dev/scope-in-css.md) calls the iframe a brick wall.

Real embeds cannot stay walled off forever, though. A comment widget needs more room as replies load, a checkout frame needs to report success, and the sanctioned door through the wall is `postMessage`. Add a `message` listener and the door ships without a lock. The browser delivers whatever knocks, from any window that holds a reference to yours, such as another frame in the same iframe hierarchy.

In this article I will build a small widget that asks its parent page to resize it, then attack it three ways. The messages will come from the wrong origin, from a sibling frame on the right origin, and with data that passes every naive check. Each attack gets a control in the demo, and the hardened handler logs whether the message was rejected, accepted, or clamped, with a reason.

---

## Ten Lines of Happy-Path Code

Resize is *the* classic reason a frame and its parent talk. Comment widgets like [<VPIcon icon="fas fa-globe"/>Giscus](https://giscus.app/) do it, checkout and survey embeds do it, and any [**drop-in component**](/blog.master.dev/live-demos-of-stand-alone-web-components.md) that wraps itself in an iframe eventually wants it. Content inside the frame grows, the parent cannot see that happen, and scrollbars inside an embed look terrible, so the frame measures itself and posts the result upward.

```js
// Inside the widget (widget.example.com)
const height = document.documentElement.scrollHeight;
parent.postMessage({ type: 'resize', height }, '*');
```

That measurement runs once, which keeps the focus on the receiver. A real widget remeasures when its content changes, with something like [<VPIcon icon="fa-brands fa-firefox"/>`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), and this demo’s widget remeasures whenever you add a reply.

The parent’s half is even shorter. It listens for any message, reads a height off the payload, and applies it without a second thought, which is the version I have written myself, more than once.

```js
// On the host page (host.example.com)
const iframe = document.querySelector('#widget');

window.addEventListener('message', (event) => {
  iframe.style.height = `${event.data.height}px`;
});
```

<CodePen
  user="anon"
  slug-hash="GgWrzgL"
  title="Testing postMessage · Demo 1"
  :default-tab="['css','result']"
  :theme="dark"/>

This works on the first try, which is part of the problem, because nothing about it invites a second look. Both sides trust each other completely, neither has asked who it is talking to, and a happy-path test gives the reviewer no reason to suspect a problem.

The Pens do a little more than the snippets show. The demo host filters out CodePen’s own platform chatter before running the checks this article teaches, the deployed widget measures its content box rather than the whole document, and it sends to an exact origin, so the wildcard above is the before picture. The snippets are the teaching core, and the full wrapper lives in [the repo (<VPIcon icon="iconfont icon-github"/>`theinfosecguy/postmessage-demos`)](https://github.com/theinfosecguy/postmessage-demos).

---

## Anyone Can Call It, with Anything, at Any Time

[<VPIcon icon="fa-brands fa-firefox"/>MDN’s security notes on `postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns) are unusually blunt for reference documentation. Any window can send a message to any other window it can reference, which includes every frame above and below yours. MDN warns that failing to verify the sender can enable cross-site scripting. Whether a particular handler exposes XSS depends on what it does with the message data.

Put another way, the five-line listener above is a public, unauthenticated API endpoint. There is no schema, no rate limit, and no caller identity unless you check for one yourself. The rest of this article adds that checking, one failure at a time.

The stakes scale with what the handler does. This one exposes layout control, so a forged message is annoying rather than catastrophic. The same missing checks can lead to XSS when a handler passes untrusted message data into an unsafe HTML or script sink, such as unsanitized `innerHTML` or `eval()`. Rendering text with `textContent`, as the demo log does, does not interpret it as HTML.

---

## Test #1 Sends a Message from a Site You’ve Never Heard Of

Suppose a page you do not control opens your host page inside a frame, or manages to get itself framed alongside your widget. Its author has read the same tutorials you have, knows what a resize message looks like, and needs exactly one line to forge one.

```js
// From any window that can reach the host
targetWindow.postMessage({ type: 'resize', height: 1 }, '*');
```

The naive handler obeys and your widget collapses to a single pixel. Swap the `1` for `999999` and it balloons instead, shoving the rest of the page below the fold, though the demo keeps that damage inside a fixed-height stage. Either way, a stranger is now steering your layout from a window you have never met.

<CodePen
  user="anon"
  slug-hash="wBJgNav"
  title="Testing postMessage · Demo 2"
  :default-tab="['css','result']"
  :theme="dark"/>

The fix is an exact comparison between `event.origin` and the one origin you expect messages from. The browser fills that property in with the sender’s scheme, host, and port, and the sender cannot fake it, which makes it the rare input you can take at face value. The snippet below lives inside the message listener, and the full handler appears later in one piece.

```js
const WIDGET_ORIGIN = 'https://widget.example.com';

if (event.origin !== WIDGET_ORIGIN) return;
```

A substring check or a loosely written regex *feels* equivalent and is a well-documented hole, because anyone can register a domain that contains yours. [<VPIcon icon="fas fa-globe"/>SecureFlag’s write-up on unchecked origins](https://knowledge-base.secureflag.com/vulnerabilities/broken_authorization/unchecked_origin_in_postmessage_vulnerability.html) collects the variants (unescaped dots in regexes are a recurring favorite), and the counterexample below is the simplest of them.

```js
// Looks safe, is not.
if (event.origin.includes('widget.example.com')) { /* ... */ }
// https://widget.example.com.evil.net passes this check.
```

These examples assume the widget lives on an ordinary HTTPS origin. A sandboxed frame without `allow-same-origin` gets an opaque origin instead, which arrives in the event as the string `"null"`, and every distinct opaque origin serializes the same way, so never allowlist that string.

---

## Test #2 Uses the Right Origin and the Wrong Window

The origin check compares a string, and strings say nothing about which window sent the message. Embed two copies of the widget, or any second frame served from the same origin, and both pass the origin gate. A message from frame B happily resizes frame A, and while building this demo I fooled my own handler this way more than once.

That sounds harmless for a resize demo, and it stops being harmless the moment the handler does anything with state. A handler that trusts “same origin” is trusting every frame that origin serves anywhere on the page, including ad slots, legacy embeds, and whatever a colleague ships next quarter.

The event carries the fix. `event.source` is a live reference to the window that sent the message, so compare it to the one `contentWindow` you meant to listen to, and identity does the work that the origin string cannot.

```js
if (event.source !== iframe.contentWindow) return;
```

Know what this buys you, though. It ties resize messages to the one frame you embedded, so messages sent directly by another instance are rejected. However, same-origin documents that hold references can often script each other directly. Keep code you do not trust on its own origin, and keep the origin check too, because an iframe can navigate somewhere new.

<CodePen
  user="anon"
  slug-hash="NPpdoqq"
  title="Testing postMessage · Demo 3"
  :default-tab="['css','result']"
  :theme="dark"/>

It is easy to stop after checking the origin. The source check separates “a frame my origin serves” from “the frame I embedded”, and the whole widget depends on that distinction.

---

## Test #3 Sends a Billion Pixels of Perfectly Valid Data

The remaining attacks need no second origin and no second frame, because the widget itself might misbehave. A bug in your own code, or a compromised dependency inside the frame, can send `height: -50`, `height: 1e9`, a bare string, or an object with no `type` at all.

All of these values are legal to send through `postMessage`; they are not all valid resize messages. Real widgets do send bare strings, so `event.data` might not even be an object, and reading `.height` off a string returns `undefined`. The naive handler then sets a height of `undefinedpx`, the browser silently ignores it, and you spend an afternoon wondering why nothing resizes.

`postMessage` copies data with [<VPIcon icon="fa-brands fa-firefox"/>structured clone](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) rather than JSON, which is why `NaN`, `Infinity`, and even circular objects arrive intact. A `null` message is nastier than a string, because reading `.height` off `null` throws, and that exception aborts the current handler invocation. The listener remains registered for later messages.

Validation here has two halves, and the order matters. Check the shape first, so the rest of the code can assume an object with the right type, then require a finite number and clamp it to a range your layout can survive. Avoid coercing it with `Number()`, since `null`, booleans, and empty strings can become finite numbers too. This protocol expects an actual number.

```js
const data = event.data;
if (typeof data !== 'object' || data === null || Array.isArray(data)) return;
if (data.type !== 'resize') return;

const height = data.height;
if (typeof height !== 'number' || !Number.isFinite(height)) return;

const clamped = Math.min(Math.max(height, 100), 1200);
```

The 100–1200 CSS-pixel range is a policy for this demo, not a browser requirement. Content taller than the cap scrolls inside the iframe. Choose bounds that fit your own layout; another protocol might reject out-of-range values instead of clamping them.

<CodePen
  user="anon"
  slug-hash="yyMgZNV"
  title="Testing postMessage · Demo 4"
  :default-tab="['css','result']"
  :theme="dark"/>

Use demo 5 to check the full matrix below. Demo 4 exposes the payload cases; enable its validation checkbox first:

| Input | Expected outcome |
| :--- | :--- |
| Message from the wrong origin | Reject; keep the current height |
| Message directly from widget B | Reject; keep the current height |
| A sends `{ type: 'resize', height: 350 }` | Accept 350px |
| A sends a height of `-50` or `1e9` | Clamp to 100px or 1200px, respectively |
| A sends a bad shape, missing height, numeric string, `null`, boolean, `NaN`, or `Infinity` | Reject; keep the current height |

---

## The Handler That Says No, and Says Why

Assembled in order, the checks run origin first, then source, then payload, before changing the layout. Each rejection logs its reason, which is the difference between a handler you can debug and one that fails in silence while you stare at an iframe that refuses to move. This version includes the receiver setup. Replace `WIDGET_URL` with your real widget URL and run the script after the iframe element exists in the DOM. The widget must send the `{ type: 'resize', height }` messages shown earlier.

```js :collapsed-lines
// Assumes this element is in the DOM:
// <iframe id="widget" title="Demo widget"></iframe>
const WIDGET_URL = 'https://widget.example.com/widget.html';
const WIDGET_ORIGIN = new URL(WIDGET_URL).origin;
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 1200;

const iframe = document.querySelector('#widget');
const log = (reason) => console.log(`postMessage handler, ${reason}`);

window.addEventListener('message', (event) => {
  if (event.origin !== WIDGET_ORIGIN) {
    log(`rejected, unexpected origin ${event.origin}`);
    return;
  }

  if (event.source !== iframe.contentWindow) {
    log('rejected, message came from a different window');
    return;
  }

  const data = event.data;
  if (typeof data !== 'object' || data === null || Array.isArray(data) || data.type !== 'resize') {
    log('rejected, payload is not a resize message');
    return;
  }

  const height = data.height;
  if (typeof height !== 'number' || !Number.isFinite(height)) {
    log('rejected, height is not a finite number');
    return;
  }

  const clamped = Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT);
  iframe.style.height = `${clamped}px`;
  log(height === clamped
    ? `accepted, resized to ${clamped}px`
    : `clamped, ${height} to ${clamped}px`);
});

// Assign src after the listener is registered, so the widget's
// first message cannot arrive before anyone is listening.
iframe.src = WIDGET_URL;
```

<CodePen
  user="anon"
  slug-hash="jEBydPq"
  title="Testing postMessage · Demo 5"
  :default-tab="['css','result']"
  :theme="dark"/>

In production you would swap `log` for a no-op or a metrics call, since visitors have no use for the console. In development, keep it loud, because a rejection you can read at a glance is a bug report that writes itself.

Remember the missing rate limit from earlier. Clamping bounds the height and nothing bounds the message rate, so a production handler should coalesce bursts of resize work and cap how often it reports rejections, or a chatty frame will flood your layout and your metrics.

---

## `'*'` Is a Postcard, Not an Envelope

The widget has its own problem. It sends with a target origin of `'*'`, which tells the browser to deliver the message to whoever happens to be the parent right now. If the widget gets embedded on an unexpected site, the wildcard still allows its messages to reach that parent. More generally, a window reference can survive navigation to a different origin; an exact target origin prevents delivery to an unexpected document.

A height number leaking is a shrug, but real embeds ship session tokens and form data through this same channel, and there the leak is an incident. The second argument to `postMessage` exists to prevent it, so name the one origin allowed to receive the message.

```js
parent.postMessage({ type: 'resize', height }, 'https://host.example.com');
```

If the parent is not that origin, the browser drops the message instead of delivering it, and no code on the receiving end ever runs. For replies in the other direction, [<VPIcon icon="fa-brands fa-firefox"/>MDN documents a tidy idiom](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#examples) that reuses the values you already verified. Put this inside the message handler, after the origin, source, and payload checks have passed:

```js
event.source.postMessage({ type: 'resize-ack' }, event.origin);
```

---

## How I Ship This Handler in Practice

For this resize protocol, I start with the same skeleton: origin with strict equality, source against the one `contentWindow` I meant to embed, then payload validation and a height clamp. The origin and source checks can trade places; all checks must pass before the resize happens. The checks are cheap, they read top to bottom like a bouncer working a door, and copying them costs less than debugging their absence.

On the sending side I treat the target origin as configuration. It lives in one constant next to the iframe URL, it never falls back to `'*'`, and replies go out through `event.source` with `event.origin`, so the values I verified are the values I answer to.

When a widget must run on many different hosts, I make each host declare itself at embed time and hold messages until it has. Declaring is configuration, not authorization, since any embedder can claim any origin. Before a widget sends anything sensitive, it should check the declared origin against trust it already holds, such as the customer’s registered embed origins, including scheme and port.

And if a page does not need to receive messages at all, my favorite hardening is to skip the listener entirely. With no listener, the page cannot misuse incoming data through this particular message handler. Everything else in this article exists for the pages that need the door open.

Three related topics deserve articles of their own, so this one only points at them. The [<VPIcon icon="fa-brands fa-firefox"/>`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#sandbox) restricts what a frame can do at all, [<VPIcon icon="fa-brands fa-firefox"/>CSP `frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) controls who may embed you, and [<VPIcon icon="fa-brands fa-firefox"/>`MessageChannel`](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) gives two windows a private pipe once they have introduced themselves.

---

## Where do you get two origins?

These demos use two genuine origins. The result page CodePen serves is the real host under test, and its messages report `https://cdpn.io`, while widgets A and B arrive from [<VPIcon icon="fas fa-globe"/>GitHub Pages](https://theinfosecguy.github.io/postmessage-demos/). Each log displays the browser-reported origin rather than a label I typed.

The red hostile frame inherits the CodePen host origin, which differs from the widget origin, so it plays the part of a mismatched sender. It stops short of a real isolated attacker, because a frame sharing the host page’s origin could script the host and do far more than press one button.

To rerun everything locally, clone [the repo (<VPIcon icon="iconfont icon-github"/>`theinfosecguy/postmessage-demos`)](https://github.com/theinfosecguy/postmessage-demos), run `python3 serve.py`, and open `http://localhost:4173/demo-1.html` (through `demo-5.html`). The helper serves the host on port 4173 and the widget on port 4174, and the demo pages set `WIDGET_URL` automatically. Two localhost ports count as two origins, which is the whole trick, and `file://` pages will not reproduce it.

There is a pleasing recursion in reading about this on a blog, because the demo you just used is itself an iframe, talking `postMessage` to the page around it. Add a temporary `message` listener in the console and you can watch similar traffic go by on any page that embeds a Pen.

```component VPCard
{
  "title": "The Enforced Accessibility of the Geolocation Element",
  "desc": "It's a strange situation where some CSS is disallowed, some is allowed but breaks the button, and some is capped.",
  "link": "/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Downsides of scrollbar-gutter: stable; (and one weird trick)",
  "desc": "It maintains space for where a scrollbar would be, whether there actually is one or not. But do you always want that?",
  "link": "/blog.master.dev/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Thoughts on Native CSS Mixins",
  "desc": "There are no browser implementations of mixins yet, nor a fleshed out spec. So perhaps now is the best time to try to understand and opine.",
  "link": "/blog.master.dev/thoughts-on-native-css-mixins.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Testing an iframe’s postMessage Handler",
  "desc": "There are some real complexities using iframes and the postMessage API for communication between a widget and its parent. Security vulnerabilities like cross-origin scripting risks being one.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/testing-an-iframes-postmessage-handler.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
