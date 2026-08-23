---
lang: en-US
title: "What To Know in JavaScript (2026 Edition)"
description: "Article(s) > What To Know in JavaScript (2026 Edition)"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What To Know in JavaScript (2026 Edition)"
    - property: og:description
      content: "What To Know in JavaScript (2026 Edition)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/what-to-know-in-javascript-2026-edition.html
prev: /programming/js-node/articles/README.md
date: 2026-04-02
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8479
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

[[toc]]

---

<SiteInfo
  name="What To Know in JavaScript (2026 Edition)"
  desc="An overview of what's new in language features, frameworks, runtimes, build tools, testing, and more."
  url="https://blog.master.dev/what-to-know-in-javascript-2026-edition/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8479"/>

We’ve done [**posts like this for CSS**](/blog.master.dev/what-you-need-to-know-about-modern-css-2025-edition.md), but JavaScript deserves the same dangnabit! Especially as JavaScript does a better job of versioning itself anyway. We’ll cover new stuff in the language itself, but being a JavaScript practitioner involves more than the language itself, extending into runtimes, frameworks, libraries, and tooling. Let’s just do this, you’ve probably scrolled down already anyway.

---

## What’s New in the Language

JavaScript has yearly version releases, which is a pretty nice way of doing things if you ask me!

### ECMAScript 2025

The latest is **ECMAScript 2025,** which came out in June 2025, and [<VPIcon icon="fas fa-globe"/>the whole spec of that version is available](https://tc39.es/ecma262/2025/).

#### Iterator Helpers

There are now methods like `.map()`, `.filter()`, `.take()`, `.drop()` directly on iterators with lazy evaluation. Honestly, to a mostly front-end guy like me, this feels a bit esoteric. Like, we already can map over arrays, so what’s the big deal? But I do understand performance, and that’s one aspect here.

```js
const result = array
  .map(x => x * 2)      // creates a new array in memory
  .filter(x => x > 10)  // ... and again
  .slice(0, 3);         // ... and again
```

So that’s “slow” and “memory intensive”, especially if the array is quite large and the things you’re doing are “expensive” as they say. The fancy new way is like this:

```js
const result = Iterator.from(array)
  .map(x => x * 2)
  .filter(x => x > 10)
  .take(3)
  .toArray(); // No new arrays created, computation stops after 3
```

And as a nice bonus, that whole `Iterator.from()` thing works on anything iterable. So not just arrays, but sets, maps, generators, etc, which means they all get the same nice set of functions to use.

#### Set Methods

Sets are kinda nice in JavaScript as it’s like an array only each item is guaranteed to be unique. That’s nothing new, but if you have *two* sets, now we have methods for returning interesting things about them, like what overlaps, what doesn’t, etc.

```js
const youKnow  = new Set(["JS", "Python", "CSS", "SQL"]);
const jobNeeds  = new Set(["JS", "TypeScript", "Python"]);

// Skills the job wants that you already have
youKnow.intersection(jobNeeds); // → Set {"JS", "Python"}

// Everything combined — your full stack + job needs
youKnow.union(jobNeeds); // → Set {"JS", "Python", "CSS", "SQL", "TypeScript"}

// What the job needs that you DON'T know yet (skill gaps)
jobNeeds.difference(youKnow); // → Set {"TypeScript"}

// Skills you have that the job doesn't care about
youKnow.difference(jobNeeds); // → Set {"CSS", "SQL"}

// Skills that appear in only one set, not both
youKnow.symmetricDifference(jobNeeds); // → Set {"CSS", "SQL", "TypeScript"}

// Are all job requirements a subset of what you know?
jobNeeds.isSubsetOf(youKnow); // → false

// Do you have every skill and more?
youKnow.isSupersetOf(jobNeeds); // → false

// Do you and the job have zero overlap?
youKnow.isDisjointFrom(jobNeeds); // → false
```

Pretty useful, I’d say. Claude Code had fun [producing an interactive demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019c9733-c5ed-7594-9bd9-8ed47f3860d1?file=%2Findex.html&orientation=left&show=preview) from that.

#### RegEx Updates

Lemme set the stage here. You’re building an on-page search function where your users type in their own search terms. And you want to implement this as a RegEx search. There is some danger there, as some characters a user may type in are “special” characters in RegExs, like how a $ matches the last character or whatever. So if the user searches for $9 and you just dunk that into a RegEx, it would break. Which characters you need to “escape” to fix that are specific to the implementation of RegEx at hand.

So! After apparently a 15-year journey, there is now `RegExp.escape()`.

```js
const query = userInput; // e.g. "$5.00 (off!)"

// ❌ BEFORE — breaks for any regex special chars
const badRe  = new RegExp(query, "g");

// ✅ ES2025 — one method, problem solved
const goodRe = new RegExp(RegExp.escape(query), "g");
```

Again, [Claude Code kinda knocked it out of the park with quite a good demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019cbeea-b5e2-7af0-acbe-96dab95e0ee8).

There has also been an update to how “flags” can work inside a RegEx. I feel like a super common one is that “i” flag, meaning case-insensitive. So you’d have a RegEx that ended in like `/i` meaning the whole thing is case-insensitive. But what if you only wanted *part* of a RegEx to be case-insensitive? Now you can wrap parts of it in parentheses and add those flags at the beginning.

```js
// Old way — you couldn't mix case sensitivity
/[a-z]+@[A-Z]+/i  // 'i' flag applies to EVERYTHING

// ES2025 — inline modifiers per-group
/(?i:[a-z.]+)@(?-i:[A-Z]+).(?i:com|org)/
//^^^^ case-insensitive part
//             ^^^^^ case-SENSITIVE part
//                           ^^^ case-insensitive part
```

#### Promise Update

Everyone’s favorite asynchronous programming flow model (Promises) has a bit of an update with `Promise.try()` which can help simplify error handling. A function might error in a sync *or* async way, and you’d have to handle them separately, but now you can deal with it together:

```js
// A function that MIGHT be async, MIGHT throw sync
function loadUser(id) {
  if (!id) throw new Error("No ID");          // sync throw
  return fetch(`/api/users/${id}`);           // async
}

// ❌ BEFORE — two separate error paths
let p;
try {
  p = loadUser(id);                           // catch sync throw here…
} catch (e) { handleError(e); }
p?.catch(e => handleError(e));                // …and async reject here

// ✅ ES2025 — one liner, one .catch()
Promise.try(() => loadUser(id))
  .then(user  => render(user))
  .catch(err  => showError(err));             // catches BOTH`
```

I will, once again, refer you to [a Claude Code-produced demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019cc8dc-9bde-7597-9b57-d91d6ef0a6c2) which does a surprisingly good job of demonstrating the concept.

#### Import Attributes

[<VPIcon icon="fa-brands fa-firefox"/>Import attributes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with) are a big personal favorite. For real! For one, I like the idea of just importing JSON data as JSON data rather than having to fetch it and parse it and all that:

```js
import data from "./file.json" with { type: 'json' }
```

That whole `with` part with the subsequent object are what are called the “import attributes”, and they have a few more tricks up their sleeve that we’ll get to.

The JSON import just looks nice to me and saves a line of code or two, but to be fair, it has some really notable downsides that Jake Archibald points out in [<VPIcon icon="fas fa-globe"/>Importing vs fetching JSON](https://jakearchibald.com/2025/importing-vs-fetching-json/). One big one: if the import fails “it takes the whole module graph down with it.” which is, uh, very bad. You can use a dynamic `import()` instead to `catch` a failure…

```js
try {
  const { default: data } = await import(url, {
    with: { type: 'json' },
  });
} catch (error) {
  // Fallback logic
}
```

But it’s not as good as the data you get when you just do a `fetch` for the JSON, so it’s still kinda meh. Jake rounds it out, noting that the data you import “will live in the module graph for the life of the page”, rather than being garbage-collectible like the data after a `fetch` would be. Anyway: tread lightly.

JSON isn’t the only thing you can import with import attributes, though. When I said import attributes are a personal favorite feature, I mostly mean I’m excited to import CSS in this way.

```js
import componentStyles from "./component.css" with { type: "css" };
```

I get into this in [**A Nice Vanilla App Architecture Using Web Components and CSS Module Scripts**](/blog.master.dev/architecture-through-component-colocation.md). I just really like how we can keep CSS to CSS files which could live in a folder right next to a JavaScript component.

```js{1,7}
import sheet from './styles.css' with { type: 'css' };

class MyComponent extends HTMLElement {
  constructor() {
    super(); 
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.adoptedStyleSheets = [sheet];
  }
  
  ...
}
```

This isn’t absolutely everything in ES2025, and there are plenty of other articles out there specifically getting into that. I found Matthew Tyson’s [<VPIcon icon="fas fa-globe"/>ECMAScript 2025: The best new features in JavaScript](https://infoworld.com/article/4021944/ecmascript-2025-the-best-new-features-in-javascript.html) for InfoWorld pretty helpful. It’s got some info in there on `Float16Array`, for example, that’s a little outside my wheelhouse but has to do with trading precision for memory usage when you know that’s useful.

### ECMAScript 2026 (Expected Mid-2026)

It’s still early in 2026, but we’ll expect the annual ECMAScript release mid-year, as in years prior. Here’s stuff that’s already in Stage 4 and will likely make the drop.

#### Temporal API

Easily the most exciting and useful thing to come into JavaScript in a while. Summed up basically with “Dates and times in JavaScript are good now, no libraries required.” For a long time, big-but-good libraries like [<VPIcon icon="fas fa-globe"/>Moment](https://momentjs.com/) filled the gap, making developers choose between performance and DX 😬.

As I write, Safari is the last one without [<VPIcon icon="iconfont icon-caniuse"/>support](https://caniuse.com/temporal), but it’s been [<VPIcon icon="fas fa-globe"/>worked on](https://blogs.igalia.com/compilers/2026/01/31/implementing-the-temporal-proposal-in-javascriptcore/), and is now in TP (what they call “Technical Preview”), so it’s not far out.

One thing that is now trivial to do is get the time in a particular time zone. No libraries required.

```js
const now = Temporal.Now.zonedDateTimeISO("America/New_York");
// Programatic date
console.log(now.toString());

// Or more readable...
console.log(now.toLocaleString());
```

I got a kick out of how [TC39 meetings have a bit of code to run in your DevTools console (<VPIcon icon="iconfont icon-github"/>`tc39/agendas`)](https://github.com/tc39/agendas/blob/main/2026/03.md) to show you when an upcoming meeting is in your current timezone:

```js
Temporal.ZonedDateTime.from('2026-03-10T10:00[America/New_York]')
  .withTimeZone(Temporal.Now.timeZoneId()) // your time zone
  .toLocaleString();
```

That’s just cool.

There are a million things Temporal can do, but here are a couple more that really sucked before.

Like how if we “added one month” to the last day in January, we’d get a really whack result:

```js
const date = new Date(2026, 0, 31); // Jan 31
date.setMonth(date.getMonth() + 1); // "add one month"
console.log(date.toDateString()); // Sun Mar 03 2026 ❌ 😬
```

But with the lovely Temporal API, we’re square:

```js
const jan31 = Temporal.PlainDate.from("2026-01-31");
const feb = jan31.add({ months: 1 });
console.log(feb.toString()); // 2026-02-28 ✅
```

Also, comparing things is… correct now.

```js
const a = Temporal.Duration.from({ hours: 25 });
const b = Temporal.Duration.from({ days: 1 });

const cmp = Temporal.Duration.compare(a, b, { relativeTo: Temporal.Now.plainDateISO() });
console.log(cmp); // 1  (25h > 1 day) ✅
```

#### Explicit Resource Management

There is a new `using` keyword when doing async functions and await that ensures cleanup. The runtime guarantees `[Symbol.dispose]()` (or `[Symbol.asyncDispose]()`) is called when the variable goes out of scope.

```js{18}
class FileHandle {
  constructor(path) {
    this.path = path;
    console.log(`Opened ${path}`);
  }

  async write(data) {
    // ... write data
  }

  async [Symbol.asyncDispose]() {
    await someFlushOperation();
    console.log(`Flushed and closed ${this.path}`);
  }
}

async function saveData() {
  await using file = new FileHandle("output.txt");
  await file.write("hello world");
  // file is automatically flushed + closed here, even if an error is thrown
}
```

The `using` keyword is nice there for a single resource, but there is also now a DisposableStack for multiple resources you need to be sure to clean up.

```js{9}
async function runJob() {
  await using stack = new AsyncDisposableStack();

  const db = stack.use(await openDatabase());
  const file = stack.use(new FileHandle("output.txt"));
  const tmpDir = stack.defer(async () => removeTempDir("/tmp/job"));

  // Do work...
  await file.write(await db.query("SELECT * FROM jobs"));

  // All three are cleaned up here, in reverse order, even if something threw
}
```

#### `Array.fromAsync` / Iterator Sequencing

`Array.fromAsync` shipped first in 2024, but apparently there was some spec issues with it, so it only made the spec in ES2026 apparently. It **awaits each `yield`ed value** as it walks the async iterator, collecting results into a plain array. Without it, you’d have to manually loop and push.

```js{9}
async function* fetchNumbers() {
  yield 1;
  await new Promise(r => setTimeout(r, 100)); // simulate async delay
  yield 2;
  await new Promise(r => setTimeout(r, 100));
  yield 3;
}

const numbers = await Array.fromAsync(fetchNumbers());
console.log(numbers); // [1, 2, 3]
```

It’s probably most useful when you’re awaiting a function call that loops over async functions that all yield their results, like pagination or something. Instead of `yield`ing, you can also pass in an array of Promises that will return once they all resolve.

And speaking of pagination, `Iterator.concat` is a new thing that allows you to lazily evaluate each thing you’re iterating over. So, rather than spreading everything into an array up front to iterate over, this can still do the iteration, but if you bail early, you save the memory you would have used filling up that array early.

```js{5}
const page1 = [{ id: 1 }, { id: 2 }][Symbol.iterator]();
const page2 = [{ id: 3 }, { id: 4 }][Symbol.iterator]();
const page3 = [{ id: 5 }, { id: 6 }][Symbol.iterator]();

for (const item of Iterator.concat(page1, page2, page3)) {
  process(item); // streams through all pages lazily
}
```

#### `Error.isError()`

The point is that you can now reliably know if a value is a genuine `Error` object, not just an object that kinda looks like one. Useful in situations like a centralized error reporting service that potentially receives errors from places like web workers or iframes, which are different “realms” and can screw it up.

#### `Math.sumPrecise`

Surely you’ve seen `console.log(0.1 + 0.2);` — and how the result is a super weird `0.30000000000000004`. Long story. Well just try `console.log(Math.sumPrecise([0.1, 0.2]));` — (in Firefox, where it’s supported so far) and you’ll see it is… exactly the same.

But apparently [<VPIcon icon="fa-brands fa-firefox"/>it’s still useful anyway](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise) for some stuff 🤷‍♀️

#### Base64 / Hex Encoding

Kinda cool that there is a simple, straightforward method calls for these things now.

```js
const val = "Frontend Masters!";
const textEnc = new TextEncoder();
const bytes = textEnc.encode(val);
console.log(bytes.toBase64());
// 'RnJvbnRlbmQgTWFzdGVycyE='
console.log(bytes.toHex());
// '46726f6e74656e64204d61737465727321'
```

Yet again, let Claude Code [demo it in a really neat way (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019d5093-782b-7ab5-a507-f689e9e00173).

---

## New in Frameworks

### React Ecosystem

[<VPIcon icon="fa-brands fa-react"/>React 19 dropped](https://react.dev/blog/2024/12/05/react-19) in December 2024, so it’s been a bit since then. We’re at 19.2 right now, and as far as I know, there isn’t a ton of public info about what’s in React 20. But React 19 was a pretty big release with what they call [<VPIcon icon="fa-brands fa-react"/>“RSC” (React Server Components)](https://react.dev/reference/rsc/server-components), the [<VPIcon icon="fa-brands fa-react"/>React Compiler](https://react.dev/learn/react-compiler), and [<VPIcon icon="fa-brands fa-react"/>Server Actions](https://18.react.dev/reference/rsc/server-actions). Here they are in a nutshell:

- **RSC**: If you can have a Node server involved, *maybe just maybe,* some components that would normally be bundled into the client-side ball of JavaScript could be left out, and that work could be done on the server instead, communicating back just the needed data.
- **Server Actions:** Speaking of having a Node server available, these allow you to call functions that exist specifically on the server. Form processing is a classic example.
- **Compiler**: Some performance optimizations have been traditionally left for humans to figure out. Are you a `useMemo` expert? Me either. By running your React code through this compiler first, it can do these optimizations for you instead. A little build complexity for a little performance gain.

There are, naturally, a whole bunch of little things too, but broad strokes, those are the big things you should know exist. [<VPIcon icon="fa-brands fa-react"/>React Native went 0.83](https://reactnative.dev/blog/2025/12/10/react-native-0.83), which I know very little about, I’m afraid, but I do find it notable that they’ve “announced” (kind of) a 1.0, which must feel good to everyone involved after a decade of development. I can’t find a link for that, I think that announcement came as an on-stage shoutout at React Universe Conf.

Those server-based React technologies fresh out of the oven? Well, they were subject to back-to-back [<VPIcon icon="fa-brands fa-react"/>very serious security vulnerabilities](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components) last year, which rightfully scared plenty of people.

### Vue Ecosystem

Vue 3.5 is holding stable, and [Vue 3.6 has gone alpha (<VPIcon icon="iconfont icon-github"/>`vuejs/core`)](https://github.com/vuejs/core/releases/tag/v3.6.0-alpha.1) with a new opt-in feature called [Vapor Mode (<VPIcon icon="iconfont icon-github"/>`vuejs/core`)](https://github.com/vuejs/core/releases/tag/v3.6.0-alpha.1#about-vapor-mode) for big-time performance improvements (“comparable to Solid and Svelte 5”).

We had a nice [**overview of the whole Vue ecosystem in 2024**](/blog.master.dev/the-vue-ecosystem-in-2024.md). But as a total Vue outsider, it’s a little hard for me to understand the 2025/2026 scene. Obviously, Evan You is the main dude here, but he’s running [<VPIcon icon="fas fa-globe"/>wVoidZero](https://voidzero.dev/) (“The JavaScript Tooling Company”), which now produces [<VPIcon icon="fas fa-globe"/>wVite+](https://viteplus.dev/), which is *a whole slew* of major projects, like Vite itself, formatting, linting, testing, etc. None of that is Vue-specific, and I gotta imagine it’s hard to focus on Vue itself when all this is going on 🤷‍♀️.

Arguably, the main Vue metaframework is Nuxt, [<VPIcon icon="iconfont icon-nuxt"/>which went 4.0](https://nuxt.com/blog/v4). The “stewards” of Nuxt itself are NuxtLabs, which was [<VPIcon icon="iconfont icon-vercel"/>acquired by Vercel](https://vercel.com/blog/nuxtlabs-joins-vercel). So Vercel doesn’t like “own” Nuxt, but… kinda? Part of me feels good that metaframeworks have theoretically sustainable homes, and part of me feels weird that VoidZero has like every step in the JavaScript toolchain except a metaframework from their home language. Pinia seems to be the predominant state management library for Vue, which [<VPIcon icon="fas fa-globe"/>went v3](https://pinia.vuejs.org/cookbook/migration-v2-v3.html) and dropped Vue 2 support.

### Svelte Ecosystem

Svelte is [<VPIcon icon="fa-brands fa-svelte"/>cruising on v5](https://svelte.dev/blog/svelte-5-is-alive). That was a big update to the Svelte world with what they call the “Runes API” which totally changed how reactivity works, making it more “fine-grained”, as they say, which means more efficient and faster. Honestly, I don’t know that much about Svelte or [<VPIcon icon="fa-brands fa-svelte"/>SvelteKit](https://svelte.dev/docs/kit/introduction), except they are part of Vercel as well, and are awfully beloved by the people who use them.

---

## JavaScript Runtimes

The biggest runtimes are clearly the ones baked into browsers. But as far as the ones you can choose and run yourself to run your own stuff, Node is still the dominant player with two interesting competitors. [**We’ve covered when Deno or Bun might be a viable alternative**](/blog.master.dev/when-deno-or-bun-is-a-better-solution-than-node-js.md) to Node. There has been more convergence than divergence lately, with all of them supporting TypeScript natively and more support of the canonical Node.

### Node.js

Perhaps the biggest news recently in Node is that it can [<VPIcon icon="fa-brands fa-node"/>run TypeScript files natively](https://nodejs.org/en/learn/typescript/run-natively). So:

```sh
node my-script.ts
```

That works as of Node 22.18.0, without needing the `--experimental-strip-types` flag anymore. Note that it still does *strip* types, meaning it’s not going to help warn you if there are actual problems in your TypeScript code.

The biggest news out of Node land tends to be simple but important bread & butter stuff like improvements to security, performance, and alignment with browser JavaScript APIs.

On a personal note, I’ve been quite pleased with Node’s progress. I’ve worked on projects switching to Node’s built-in test-runner, which feels good to reduce dependencies. I applaud Node’s work on its [<VPIcon icon="fa-brands fa-node"/>permissions model](https://nodejs.org/api/permissions.html#permissions), making it feel more usable with untrusted code situations.

### Bun

[<VPIcon icon="iconfont icon-bun"/>Bun’s big release was 1.3](https://bun.com/blog/bun-v1.3) with lots of DX features around running dev servers. It’s pretty satisfying you can run a full-featured dev server just by pointing `bun` toward the HTML files:

```sh
bun './**/*.html'
```

This does all the processing and bundling as well, making Bun something of a Vite alternative in this context.

Perhaps the biggest news for Bun is that [<VPIcon icon="iconfont icon-claude"/>Anthropic (e.g. Claude) acquired Bun](https://anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone) late last year. I think the general vibe is that it is good news for Bun, giving it a stable and well-funded home.

Generally, people choose Bun because of speed. It installs from npm extremely fast and generally performs faster across the board. [<VPIcon icon="fas fa-globe"/>At the cost of some stability](https://js-segfault-compare.sigmasd.workers.dev/).

### Deno

Deno has [<VPIcon icon="iconfont icon-deno"/>been at v2](https://deno.com/blog/v2.0) for a while. It’s got, as far as I know, full Node.js compatibility and is the most stable of the three. It’s also got full npm compatibility now, thanks to the `npm:` specifier in packages.

I think people generally choose Deno because of the stability and security-first architecture. [<VPIcon icon="iconfont icon-deno"/>They say it clearly:](https://docs.deno.com/runtime/fundamentals/security/)

> Deno is secure by default. Unless you specifically enable it, a program run with Deno has no access to sensitive APIs, such as file system access, network connectivity, or environment access. You must explicitly grant access to these resources with command line flags or with a runtime permission prompt. This is a major difference from Node, where dependencies are automatically granted full access to all system I/O, potentially introducing hidden vulnerabilities into your project.

That’s good design.

---

## Build Tools

### Vite

[<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/) has become the predominant build tool of the JavaScript ecosystem. It was in the right place at the right time, I guess! While it was born out of the same folks that make Vue, Vite is a build tool that works for almost any front-end project. Color me a fan of their approach, where local development works by updating only the small parts of code that change as your work without requiring full-blown bundling, but still does production-worthy bundling on demand.

[<VPIcon icon="iconfont icon-vite"/>Vite has recently gone v8](https://vite.dev/blog/announcing-vite8). This was a significant change in that, rather than relying on the third-party bundling tool [<VPIcon icon="fas fa-globe"/>Rollup](https://rollupjs.org/), it now uses [<VPIcon icon="fas fa-globe"/>Rolldown](https://rolldown.rs/), a bundler of their own creation. This is in line with Vite’s recent charge into becoming a more “unified toolchain”, as they put it. They can share tooling across their offerings (like a parser), making the whole thing more predictable. They call that whole toolchain [<VPIcon icon="fas fa-globe"/>Vite+](https://viteplus.dev/), which includes the fancy dev server from Vite, formatting, linting, type checking, testing, task running, monorepo support, and packaging. That’s a lot!

They are even working on taking it a step further with a “deployment platform” called [Void,](https://void.cloud/) which uses Cloudflare’s offerings for hosting, data storage, cloud functions, and all that.

> Database, KV storage, object storage, AI inference, authentication, queues, and cron jobs. All built-in. Import what you need, skip what you don’t.

Almost all frameworks are using Vite these days: [<VPIcon icon="iconfont icon-astro"/>Astro](https://astro.build/), [<VPIcon icon="iconfont icon-solidjs"/>SolidStart](https://start.solidjs.com/), [<VPIcon icon="fa-brands fa-svelte"/>SvelteKit](https://svelte.dev/docs/kit/introduction), [<VPIcon icon="iconfont icon-nuxt"/>Nuxt](https://nuxt.com/), etc. The notable exception is Next.js, which uses webpack and is moving to Turbopack (see next section). But we’ve even seen Next.js [AI-ported over to Vite by Cloudflare (<VPIcon icon="iconfont icon-github"/>`cloudflare/vinext`)](https://github.com/cloudflare/vinext), which was a controversial move.

### Turbopack

[<VPIcon icon="iconfont icon-nextjs"/>Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) is Vercel’s bundler that has now become [<VPIcon icon="iconfont icon-nextjs"/>the default bundler](https://nextjs.org/docs/app/guides/upgrading/version-16#turbopack-by-default) as of Next.js v16. Turbopack is a Rust-based project that is supposed to be 5-10✕ faster at refreshing than webpack was in previous versions of Next.js. I believe at the moment Turbopack is specific to Next.js.

### webpack

[<VPIcon icon="iconfont icon-webpack"/>webpack](https://webpack.js.org/) is still heavily used and has [<VPIcon icon="iconfont icon-webpack"/>a development plan for 2026](https://webpack.js.org/blog/2026-02-04-roadmap-2026/), which includes many ideas for reducing the need for various loaders and other simplifications. A welcome update, as the general sentiment around webpack is that it’s too complicated.

---

## TypeScript

[<VPIcon icon="fa-brands fa-microsoft"/>TypeScript just went v6](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/). They are saying mid-2026 for v7, which is going to be a huge release, swapping over to their new Go-based compiler. The main point of v6 is housekeeping to prepare people for that change. I think the Bytes newsletter had [<VPIcon icon="fas fa-'globe'"/>a good quick summary](https://bytes.dev/archives/473):

> Strict mode is now `true` by default, `module` defaults to `esnext`, `target` floats to the current-year ES spec (currently `es2025`), and `types` now defaults to an empty array instead of vacuuming up everything in `node_modules/@types`. That last one alone will break a lot of projects, but should also speed them by 20–50%.

Probably worth getting ready for v7 as you’ll almost certainly want the ~10✕ speed improvements seen in places like VS Code and Playwright usage.

Notably, TypeScript has become [<VPIcon icon="iconfont icon-github"/>the #1 language on GitHub](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/), with 66% year-over-year growth.

### Types in JavaScript?

[<VPIcon icon="fa-brands fa-microsoft"/>Years ago there was a bit of chatter](https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/) about adding types directly into JavaScript. So perhaps some of the benefits of TypeScript without needing a compiler. This doesn’t seem to have a lot of movement and is unlikely to truly replace what TypeScript can do.

### AI

This is probably as good a place to slip this in as any, but with the extreme popularity of TypeScript both in what developers are actively using and what’s available as open source for LLMs to train on, AI is just very good at writing code these days, and particularly TypeScript. They say 92% of developers are using AI to write code to some degree, which is astonishing growth and easily the biggest story in development right now.

---

## Testing

All the main JavaScript testing frameworks are still around and doing the bulk of testing. Jest, Jasmine, Mocha, etc. But there has been some movement, particularly as Vite has grown to be incredibly popular, their testing framework [<VPIcon icon="iconfont icon-playwright"/>Vitest](https://vitest.dev/) has taken off. It’s Jest-compatible, so making porting tests to it is generally pretty easy, and it’s much faster (and looks nicer, I think). Vitest also has “browser mode,” meaning it can run tests in a real browser, which is pretty crucial for testing your components. This generally happens with [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/), which also seems to be having a boom in popularity and can do “end to end” testing in its own right, and seems to have grown in popularity over [<VPIcon icon="fas fa-globe"/>Puppeter](https://pptr.dev/) or [<VPIcon icon="fas fa-globe"/>Cypress](https://cypress.io/). (it seems to me, anyway).

---

## Meta Frameworks

### Next.js

[<VPIcon icon="iconfont icon-nextjs"/>Next.js is on v16](https://nextjs.org/blog/next-16) which is the first release with Turbopack as the default. Personally, I like the push forward with that, but I’ve turned it off on my own projects as I’ve found the migration difficult. But the logging/error improvements are a noticeable step forward. This version of Next uses the React Compiler and React Server Components automatically, which is theoretically a performance gain all around, but the results seem [<VPIcon icon="fas fa-globe"/>more](https://developerway.com/posts/bundle-size-investigation) [<VPIcon icon="fas fa-globe"/>complex](https://javascript.plainenglish.io/are-react-server-components-improving-your-apps-b4afdd6d5196) [and (<VPIcon icon="fa-brands fa-medium" />`@dan0dev`)](https://medium.com/@dan0dev/react-server-components-the-good-the-bad-the-ugly-e08e63b8e676) [mixed (<VPIcon icon="fa-brands fa-dev" />`rbobr`)](https://dev.to/rbobr/the-hidden-performance-costs-of-react-server-components-248f).

If you use AI with your Next.js site a lot, it’s notable that [<VPIcon icon="iconfont icon-nextjs"/>they have an MCP server now.](https://nextjs.org/docs/app/guides/mcp) That essentially means if you hook it up the AI will be a heck of a lot smarter at working on your site.

It’s on React 19 also, which means `<ViewTransition>` support, which [**we looked at here**](/blog.master.dev/reacts-viewtransition-element.md).

### Remix / React Router

Once upon a time (a few years ago) [<VPIcon icon="fas fa-globe"/>Remix](https://remix.run/) was “bought” by Shopify. It went to a v2, then it was announced that what was to be Remix v3 was actually gonna just be [<VPIcon icon="fas fa-globe"/>React Router](https://reactrouter.com/) v7. Now Remix v3 is still going to be a thing, but it’s [<VPIcon icon="fas fa-globe"/>under active development](https://remix.run/blog/wake-up-remix). The big thing is that React isn’t going to be a part of it anymore:

> Instead, we’re building our own component model that feels closer to the web than anything we’ve seen before.

They had an event, [<VPIcon icon="fas fa-globe"/>Reix Jam](https://remix.run/jam/2025), where they got into things, so check that out if you’re super interested.

### TanStack

Some of the fallout from the Remix confusion may have benefited [<VPIcon icon="iconfont icon-tanstack"/>The TanStack universe](https://tanstack.com/), which is a collection of tools, including [<VPIcon icon="iconfont icon-tanstack"/> router](https://tanstack.com/router/latest) that is quite popular. And like Remix before it, that router has grown up into [<VPIcon icon="iconfont icon-tanstack"/> framework](https://tanstack.com/start/latest) as well.

We’ve got [<VPIcon icon="fas fa-globe"/>lots of content getting into the TanStack world](https://blog.master.dev/tag/tanstack/) from Adam Rackis.

### Astro

[<VPIcon icon="fa-brands fa-cloudflare"/>Astro](https://astro.build/) has been going strong for years now and isn’t slowing down. Just this year, they were [<VPIcon icon="fa-brands fa-cloudflare"/>acquired by Cloudflare](https://blog.cloudflare.com/astro-joins-cloudflare/), which generally feels like a good thing, as really good front-end frameworks are notoriously hard to build a strong business model around, and the answer seems to be partnering with serious hosting. It’s already being used to [<VPIcon icon="fa-brands fa-cloudflare"/>build a weird WordPress clone](https://blog.cloudflare.com/emdash-wordpress/).

If you’re looking to build a site that is static-by-default, but still uses modern JavaScript framework component-based architecture, and makes it easy to opt-in to more dynamic behavior, Astro is the gold standard and darn fine choice if you ask me.

[<VPIcon icon="iconfont icon-astro"/>Astro’s latest release is 6.0](https://astro.build/blog/astro-6/), with grown-up features like customizing which runtime you use in development, a content security policy, and an experimental faster compiler. This was quickly followed by [<VPIcon icon="iconfont icon-astro"/>a 6.1 release](https://astro.build/blog/astro-610/) with lots of little nice config improvements and such, proving how dedicated they are to being a good framework.

---

## npm

There doesn’t seem to be a ton happening in [<VPIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com/) land. It’s been 6 years since Microsoft/GitHub bought it and it seems to be running fine. GitHub itself has [<VPIcon icon="fas fa-globe"/>struggled with uptime](https://damrnelson.github.io/github-historical-uptime/).

What’s *less* fine with npm is supply chain incidents, like [<VPIcon icon="fas fa-globe"/>s1ngularity](https://nx.dev/blog/s1ngularity-postmortem), which stole people’s credentials / tokens / config files and publicly posted them on GitHub 😳. Then there was [<VPIcon icon="fas fa-globe"/>debug/chalk](https://wiz.io/blog/widespread-npm-supply-chain-attack-breaking-down-impact-scope-across-debug-chalk) where malicious package updates went out that could rewire crypto transactions to some bad guys wallet. Then there was the Shai-Hulud worm (sorry, *worms*, plural) that was some kind of self-replicating credential-stealing nastiness, with the 2.0 version overwriting/deleting every single file in a user’s home directory. That one went out to 796 npm packages with over 20 million downloads, so… wow. Not a great last year for npm from a security standpoint.

It may be worth checking out a tool like [<VPIcon icon="fas fa-globe"/>Socket](https://socket.dev/) for some protection if you’ve got serious production apps using npm.

---

## What should I learn?

The forever answer is that learning fundamental skills on how these things work will serve you no matter what changes happen in tooling and frameworks and all that. And, dare I say it, the more AI helps us with code, the more we need people like you who will actually know what they are doing and can help plan, guide, shape, test, architect, and apply good taste to code no matter how it is created.

[<VPIcon icon="fas fa-globe"/>Signing up for Frontend Masters](https://master.dev/courses/) is the ticket to those fundamental skills.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What To Know in JavaScript (2026 Edition)",
  "desc": "An overview of what's new in language features, frameworks, runtimes, build tools, testing, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/what-to-know-in-javascript-2026-edition.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
