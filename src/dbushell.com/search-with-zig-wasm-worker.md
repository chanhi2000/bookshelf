---
lang: en-GB
title: "Search with Zig, Wasm, and a Worker"
description: "Article(s) > Search with Zig, Wasm, and a Worker"
icon: iconfont icon-zig
category:
  - Zig
  - Article(s)
tag:
  - blog
  - dbushell.com
  - zig
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Search with Zig, Wasm, and a Worker"
    - property: og:description
      content: "Search with Zig, Wasm, and a Worker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/search-with-zig-wasm-worker.html
prev: /programming/zig/articles/README.md
date: 2025-05-18
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-05-18-search-with-zig-wasm-worker.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Zig > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/zig/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Search with Zig, Wasm, and a Worker"
  desc="The one where I rebuild it in Zig"
  url="https://dbushell.com/2025/05/18/search-with-zig-wasm-worker/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-05-18-search-with-zig-wasm-worker.png"/>

[**Static search**](/dbushell.com/static-search-page-find.md) was a nice upgrade to my blog. [<VPIcon icon="iconfont icon-github"/>`cloudcannon/pagefind`](https://github.com/cloudcannon/pagefind) is super easy to use. Point it at `<main>` and it’ll crawl your website making it searchable with a bit of front-end magic.

A minor issue I had with Pagefind was file churn. Every re-index resulted in 200+ deletions and 200+ additions. This made deployment slow and wasteful. This was specifically fixed in [Pagefind v1.3.0 (<VPIcon icon="iconfont icon-github"/>`CloudCannon/pagefind`)](https://github.com/CloudCannon/pagefind/releases/tag/v1.3.0) but I had locked to `v1.2.0` and never noticed.

What I should have done is [<VPIcon icon="fas fa-globe"/>read the documentation](https://pagefind.app/). Should have [<VPIcon icon="fa-brands fa-wikipedia-w"/>RTFM](https://en.wikipedia.org/wiki/RTFM), would have gotten a good night’s sleep. Instead I [<VPIcon icon="fas fa-globe"/>nerd-sniped](https://xkcd.com/356/)[^1] myself. I stayed up way too late coding a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) algorithm in [<VPIcon icon="iconfont icon-zig"/>Zig](https://ziglang.org/)[^2] before giving up and [coping this Gist (<VPIcon icon="iconfont icon-github"/>`travisstaloch`)](https://gist.github.com/travisstaloch/b377c953c3101249b30405afff4c067d).

The end result of this madness is a new step to my [**static site generator**](/dbushell.com/the-static-site-churns.md) and plenty of learning. I built my own search and I attempt to document it below.

---

## Creating an Index

I’m sure there are many scientific and mathematical papers written on search indexes. I’ve read none of them. I figured a big [<VPIcon icon="iconfont icon-json"/>JSON](https://json.org/)[^3] array would suffice.

I used my [HTML parsing utilities (<VPIcon icon="iconfont icon-forgejo"/>`git.dbushell.com`)](https://git.dbushell.com/dbushell/hyperspace/src/branch/main/hyperless) to strip tags and generate a list of words on my blog. I normalise to lowercase and strip anything that isn’t a–z including diacritics.

JavaScript has a [<VPIcon icon="fas fa-globe"/>neat trick](https://dbushell.com/notes/2025-05-03T07:02Z/) using Unicode properties:

```zig
word = word
  .toLowerCase()
  .normalize("NFD")
  .replace(/\p{Diacritic}/gu, "");
```

This uses “canonical decomposition” which turns a single code point into two. For example `"\u00F1"` is `ñ` aka [<VPIcon icon="fas fa-globe"/>Latin Small Letter N with Tilde](https://compart.com/en/unicode/U+00F1). Compare that to `"\u006E\u0303"` also `ñ` but a lowercase ASCII “n” followed by the [<VPIcon icon="fas fa-globe"/>Combining Tilde](https://compart.com/en/unicode/U+0303).

This process gives a form of “fuzzy” matching when also applied to search queries. This is all academic because I’m English and I barely used all 26 letters. I did use [<VPIcon icon="fas fa-globe"/>an umlaut](https://dbushell.com/notes/2025-05-02T05:46Z/) once so I must account for that edge case.

My website has a vocabulary of over 12000 unique words with “and” and “the” jostling for top spot. Oooh *“jostling”* I think that’s +1. Words are stored along with an array of pages IDs and the number of occurrences on that page (IDs are a 32-bit hash of the URL). I throw away common words like “and” to save space. If you search “and” it’ll match “brand”, “standard”, etc.

Appended to the index I have a map linking IDs to page URL and title. The entire search index is 1.5 MBs of raw JSON but only 275 KB compressed. That’s reasonably small and I only load it if search is used. (I do some optimisation later.)

---

## Searching the Index

Now this is where things get silly. I’m sure I could’ve done the next part in JavaScript but I wanted to use [<VPIcon icon="iconfont icon-wasm"/>WebAssembly](https://webassembly.org/)[^4] and nothing was going to stop me. I’ve been [**learning Zig**](/dbushell.com/zig-the-good-parts.md) by building [**CLI tools**](/dbushell.com/zig-zsh-prompt.md) and [**light switches**](/dbushell.com/zig-smart-lights.md). Zig can compile to Wasm.

As mentioned I use the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance) to match normalised keywords against my index. I literally run the calculation against every word. Sorry [<VPIcon icon="fa-brands fa-google"/>Google](https://support.google.com/accounts/answer/32046)[^5], I’m not looking for a new job right now. Sounds like [Google stopped caring](https://journalrecord.com/2025/02/20/is-google-making-search-worse-to-sell-more-ads/) anyway.

I rank pages based on:

- Levenshtein distance
- Number of keyword matches
- Recency of blog post

I adjusted a few magic number multipliers until the results felt right. I won’t dive too much into [the Zig code (<VPIcon icon="iconfont icon-github"/>`dbushell/dbushell.com`)](https://github.com/dbushell/dbushell.com/tree/main/src/search) because I’ll probably refactor it multiple times.

---

## Optimisation

1.5 MB (275 KB compressed) is fine but I can do better! JSON object keys are pure overhead. Brackets? Quotation marks? Commas? Get ‘em outta here! Pure bloat. 32-bit hashes as 8 byte hexadecimal strings is *twice* the necessary size.

I came up with a simple† binary format. Hashes are raw 32-bit numbers. Strings are still UTF-8 but they’re preceded by their byte length. Arrays too are just a count followed by packed data. This reduced the file size to 556 KB (214 KB compressed).

† Somehow I mixed both big and little endian

Zig can use this data more efficiently too without a full JSON parser. I used a similar technique to [**packed structs**](/dbushell.com/zig-smart-lights.md#packed-structs). When I find an array of hashes, i.e. 5 bytes after 5 bytes repeating, it’s not parsed it’s just referenced straight from memory.

```zig
const Ref = extern struct {
    hash: [4]u8,
    occurrences: u8,
};

const Word = struct {
    word: []const u8,
    pages: [*]const Ref,
    pages_len: u16,
};
```

The `pages` array is just a pointer into memory (the embedded index data). The parser doesn’t iterate 5 bytes at a time creating `Ref` objects. It just reads the `pages_len` and skips ahead `pages_len * 5` bytes. I can still use syntax like `pages[0].hash` to read array items.

There is a little bit of parsing for the `Word` structs. I’m sure if I understood more I could make a binary format that exactly replicates memory layout and parse nothing. I gave up, I’m not smart enough to handle alignment errors yet.

With these optimisations I was able to half both file size and search time.

---

## Wasm and Workers

JavaScript does a good job of hiding the fact that it’s single-threaded. That is until you try to execute tasks during UI interaction. Delayed typing makes it painfully obvious. To fix this I initialise my Wasm module inside a [<VPIcon icon="fa-brands fa-firefox"/>Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)[^6].

Getting data in and out of Wasm isn’t straight forward. You can call functions and pass [<VPIcon icon="fas fa-globe"/>numeric values](https://dbushell.com/notes/2025-01-30T14:52Z/), but not strings or objects. You do have full memory access to work with though.

[<VPIcon icon="fa-brands fa-firefox"/>Wasm memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory#creating_a_new_memory_object) is created in JavaScript.

```zig
const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
});

const wasm = await WebAssembly.instantiateStreaming(
  fetch("search.wasm"), {
    env: { memory }
  },
);

const { exports } = wasm.instance;

exports.init();
```

Within Zig I allocate a fixed 10 KB buffer I’ll use to pass data back and forth.

```zig
var scratch: []u8 = undefined;
const scratch_len: usize = 1024 * 10;

export fn init() void {
    scratch = wasm_allocator.alloc(u8, scratch_len) catch unreachable;
}
```

The `init` function is the one I called from JavaScript. These functions are synchronous which is why a worker is so important.

I have a second function to return the address of the allocated memory.

```zig
export fn getScratch() [*]const u8 {
    return @ptrCast(scratch);
}
```

Back to JavaScript, I can write bytes to the `scratch` memory.

```zig
const scratch = new Uint8Array(
  memory.buffer,
  exports.getScratch(),
  128
);
scratch.set(
  [...new TextEncoder().encode("Hello, Zig!"), 0],
  0
);
exports.something();
```

This creates a temporary `Uint8Array` backed by the same underlying Wasm memory at the allocated offset. I write “Hello, Zig!” as a null-terminated string. Then I call `something` (another exported Zig function). Zig can then read the data I just wrote to `scratch`.

This works in reverse too. When I initialise Wasm I can provide functions.

```zig
const debug = (ptr, len) => {
  const message = new TextDecoder().decode(
    memory.buffer.slice(ptr, ptr + len),
  );
  console.debug(message);
};

const wasm = await WebAssembly.instantiateStreaming(
  fetch("search.wasm"), {
    env: { memory, debug }
  },
);
```

Those functions are tagged in Zig with `extern`:

```zig
extern fn debug(buf: usize, len: usize) void;
```

I can write text to the `scratch` buffer and then call JavaScript with its offset and length:

```zig
const slice = try std.fmt.bufPrint(
    scratch, "Hello, {s}!", .{"JavaScript"}
);
debug(@intFromPtr(slice.ptr), slice.len);
```

This will log “Hello, JavaScript!” to the browser console.

For the actual search results my Zig code writes JSON to the buffer and informs the worker it’s done. The worker [<VPIcon icon="fa-brands fa-firefox"/>transfers data](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects) back to the main thread:

```zig
const data = new Uint8Array(
  memory.buffer.slice(ptr, ptr + len),
);
self.postMessage({
    type: "results",
    buffer: data.buffer,
  },
  [data.buffer]
);
```

The main thread parses the JSON itself:

```zig
worker.addEventListener("message", (ev) => {
  if (ev.data.type === "results") {
    const data = JSON.parse(
      new TextDecoder().decode(ev.data.buffer)
    );
    // Update UI...
  }
});
```

Woah! That was a fair bit of back and forth. I’m sure my code has plenty of race conditions too! It works well enough for the time being.

After all that effort you can now search my blog. Like you could before. At some point in future I should research the correct way to index a blog and make this 10x more efficient.

I added some CSS view transitions to make it look fancier.

To save bandwidth no Wasm is loaded until the search input is focused. I still employ the same [**DuckDuckGo fallback**](/dbushell.com/static-search-page-find.md#fallback) should anything fail to initialise.

Shoutout again to [<VPIcon icon="fas fa-globe"/>Pagefind](https://pagefind.app/) for serving me until now 🫡

[^1]: The art and sport of using a technical challenge to distract a nerd. Bonus points for sniping yourself.
[^2]: A low-level programming language with no hidden control flow and no hidden memory allocations.
[^3]: JavaScript Object Notation. An almost perfect specification. If only they’d allowed trailing commas.
[^4]: Low-level machine code for web browsers. Wasm binary instructions are run in a virtual machine.
[^5]: Arguably the most evil company in tech resolute in their crusade to gate-keep the web and sell your privacy as a service.
[^6]: JavaScript that runs in its own thread. Handy for non-blocking background tasks.

::: info Sources on 'Nerd Snipe'

<SiteInfo
  name="Nerd Sniping"
  desc=""
  url="https://xkcd.com/356/"
  logo="https://xkcd.com/s/919f27.ico"
  preview="https://imgs.xkcd.com/comics/nerd_sniping.png"/>

<SiteInfo
  name="Urban Dictionary: Nerd Sniping"
  desc="Nerd Sniping: 1. The act of presenting someone, often a mathematician/physicist with a time consuming problem or challenge (often impossible to solve or..."
  url="https://urbandictionary.com/define.php?term=Nerd+Sniping/"
  logo="https://urbandictionary.com/favicon-16x16.png"
  preview="https://udimg.com/v1/social/twitter.webp?word=Nerd+Sniping&meaning=1.+The+act+of+presenting+someone%2C+often+a+mathematician%2Fphysicist+with+a+time+consuming+problem+or+challenge+%28often+impossible+to+solve+or+complete%29+in+the+hopes+of+it+appealing+to+a+person%27s+obsessive+tendencies.%0A%0A2.+Doing+the+thing+above+in+a+situation+where+the+obsession+may+lead+to+bodily+harm+%28in+the+original+context+on+the+middle+of+a+road+where+they+will+get+inevitably+run-over+by+a+truck%29.&example=1.+The+XKCD+comic+%22Click+and+Drag%22+nerd+sniped+me%21+I+never+expected+it+to+take+so+long+to+explore.%0A%0A2.+There%27s+a+certain+type+of+brain+that+is+easily+disabled.+If+you+show+it+an+interesting+problem+it+involuntarily+drops+everything+else.+This+lead+me+to+the+development+of+a+new+sport%3A+Nerd+Sniping."/>

:::

::: info Sources on 'Zig'

```component VPCard
{
  "title": "Home ⚡ Zig Programming Language",
  "desc": "Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software.",
  "link": "https://ziglang.org",
  "logo": "https://ziglang.org/favicon.svg",
  "background": "rgba(247,164,29,0.2)"
}
```

<SiteInfo
  name="Ziggit - A Zig community"
  desc="A community for anyone interested in the Zig Programming Language."
  url="https://ziggit.dev/"
  logo="https://ziggit.dev/uploads/default/optimized/1X/3417db0e8abaf83a355700b91efd528025492487_2_32x32.png"
  preview="https://ziggit.dev/uploads/default/original/1X/3417db0e8abaf83a355700b91efd528025492487.png"/>

<SiteInfo
  name="Welcome | zig.guide"
  desc="Get started with the Zig programming language. Zig is a general-purpose programming language and toolchain for maintaining robust, optimal, and reusable software."
  url="https://zig.guide/"
  logo="https://zig.guide/img/favicon.ico"
  preview="https://zig.guide/img/docusaurus-social-card.jpg"/>

```component VPCard
{
  "title": "Learning Zig",
  "desc": "Welcome to Learning Zig, an introduction to the Zig programming language. This guide aims to make you comfortable with Zig. It assumes prior programming experience, though not in any particular language.",
  "link": "https://openmymind.net/learning_zig/",
  "logo": "https://openmymind.net/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<SiteInfo
  name="Programming with Zig: From Basics to Mastery"
  desc="Table of Contents 1. Introduction to Zig: History, Philosophy, and Getting Started  The origins of Zig Core design principles Comparison with other languages (C"
  url="https://gencmurat.com/en/pages/programming-with-zig//"
  logo="https://gencmurat.com/logo.svg"
  preview="https://gencmurat.com/icon512.png"/>

```component VPCard
{
  "title": "Introduction to Zig",
  "desc": "Welcome! This is the initial page for the “Open Access” HTML version of the book “Introduction to Zig: a project-based book”, written by Pedro Duarte Faria. This is an open book that provides an introduction to the Zig programming language, which is a new general-purpose, and low-level language for building robust and optimal software.",
  "link": "https://pedropark99.github.io/zig-book/",
  "logo": "https://pedropark99.github.io/favicon.ico",
  "background": "rgba(79,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Zig Cookbook",
  "desc": "Zig cookbook is a collection of simple Zig programs that demonstrate good practices to accomplish common programming tasks.",
  "link": "https://cookbook.ziglang.cc/",
  "logo": "https://cookbook.ziglang.cc/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

::: info Sources on 'JSON'

```component VPCard
{
  "title": "JSON",
  "desc": "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.",
  "link": "https://json.org/json-en.html/",
  "logo": "https://JSON.org/favicon.png",
  "background": "rgba(250,240,230,0.2)"
}
```

:::

::: info Sources on 'WebAssembly (Wasm)'

<SiteInfo
  name="WebAssembly"
  desc="WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications."
  url="https://webassembly.org/"
  logo="https://webassembly.org/favicon.ico"
  preview="https://v1.screenshot.11ty.dev/https%3A%2F%2Fwebassembly.org%2F/opengraph/"/>

<SiteInfo
  name="WebAssembly | MDN"
  desc="WebAssembly is a type of code that can be run in modern web browsers. It is a low-level assembly-like language with a compact binary format that runs with near-native performance and provides languages such as C/C++, C# and Rust with a compilation target so that they can run on the web."
  url="https://developer.mozilla.org/en-US/docs/WebAssembly/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

::: info Sources on 'Google'

```component VPCard
{
  "title": "Delete your Google Account - Google Account Help",
  "desc": "You can delete your Google Account at any tim",
  "link": "https://support.google.com/accounts/answer/32046/",
  "logo": "https://support.google.com/favicon.png",
  "background": "rgba(11,87,208,0.2)"
}
```

<SiteInfo
  name="Killed by Google"
  desc="Killed by Google is the open source list of dead Google products, services, and devices. It serves as a tribute and memorial of beloved services and products killed by Google."
  url="https://killedbygoogle.com/"
  logo="https://killedbygoogle.com/favicon.png"
  preview="https://killedbygoogle.com/social/card.png"/>

:::

::: info Sources on 'Web Worker'

<SiteInfo
  name="Using Web Workers - Web APIs | MDN"
  desc="Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the fetch() or XMLHttpRequest APIs. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

<SiteInfo
  name="Using Service Workers - Web APIs | MDN"
  desc="This article provides information on getting started with service workers, including basic architecture, registering a service worker, the installation and activation process for a new service worker, updating your service worker, cache control and custom responses, all in the context of an app with offline functionality."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

[dbushell.com](/2024/04/02/offscreen-canvas-and-web-workers/ "Offscreen Canvas and Web Workers")

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Search with Zig, Wasm, and a Worker",
  "desc": "The one where I rebuild it in Zig",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/search-with-zig-wasm-worker.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
