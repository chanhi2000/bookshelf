---
lang: en-US
title: "How to Build a Translator with Chrome’s Built-In AI"
description: "Article(s) > How to Build a Translator with Chrome’s Built-In AI"
icon: fa-brands fa-chrome
category:
  - Node.js
  - Next.js
  - Web Browser
  - Google
  - Google Chrome
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Translator with Chrome’s Built-In AI"
    - property: og:description
      content: "How to Build a Translator with Chrome’s Built-In AI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-translator-with-chrome-s-built-in-ai.html
prev: /ai/llm/articles/README.md
date: 2026-11-17
isOriginal: false
author:
  - name: David Aniebo
    url: https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/1d251ce9-4e88-476b-9a54-0face0578c19.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Translator with Chrome’s Built-In AI"
  desc="Most translation features work the same way. The user types text, your app sends it to a translation API, and the API sends a translation back. That works, but every request adds cost and latency, and"
  url="https://freecodecamp.org/news/how-to-build-a-translator-with-chrome-s-built-in-ai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/1d251ce9-4e88-476b-9a54-0face0578c19.png"/>

Most translation features work the same way. The user types text, your app sends it to a translation API, and the API sends a translation back. That works, but every request adds cost and latency, and your users' text leaves their device.

Chrome now ships two built-in AI APIs that change this: the **Translator API** and the **Language Detector API**. Chrome downloads small, specialized models on demand and runs them on the user's device. You don't host a model, run an inference server, or pay per request. You call a JavaScript API.

In this tutorial, you'll build a translator in Next.js that:

- Detects the language of the text a user types.
- Translates it into a language they choose.
- Streams the translation into the page as Chrome produces it.
- Shows language-pack download progress, and lets the user cancel.
- Copies the translation, reads it aloud, and swaps the two languages.
- Handles browsers that don't support the APIs.

::: note Prerequisites

You should be comfortable with:

- JavaScript or TypeScript
- React basics (components, props, `useState`, `useEffect`)
- Running commands in a terminal

You'll need:

- Node.js 20.9 or later.
- **Desktop Chrome 138 or later.** The Translator and Language Detector APIs work in Chrome on desktop. They don't work on mobile devices, and Firefox and Safari don't support them. Chrome's browser-support table also lists Edge (148). I tested this tutorial in Chrome 156 on macOS.

You don't need to know anything about machine learning.

:::

---

## Internationalization vs AI Translation

Before you write code, separate two ideas that are easy to confuse.

**Internationalization (i18n)** prepares your interface for multiple languages and regions: language selection, locale-aware dates, numbers and currencies, right-to-left (RTL) layout, and static interface strings that a person wrote and reviewed:

```ts
const messages = {
  en: { welcome: "Welcome", description: "Explore our platform" },
  fr: { welcome: "Bienvenue", description: "Explorez notre plateforme" },
  es: { welcome: "Bienvenido", description: "Explora nuestra plataforma" },
};
```

**AI-powered translation** generates translations on the fly for content nobody wrote ahead of time, such as comments, reviews, support messages and posts.

| Traditional i18n | AI-powered translation |
| --- | --- |
| Uses predefined translations | Generates translations dynamically |
| Ideal for interface text | Ideal for user-generated content |
| Usually developer-managed | Can process arbitrary text |
| Predictable output | Output may vary |

AI translation complements i18n. It doesn't replace it. You still need curated strings for buttons and menus. The Translator API fills the gap for everything else.

Chrome's documentation gives a good example: in a support chat, users write in their first language, and your site translates the message into your agent's language *before the message leaves the user's device*.

---

## How Chrome's Built-In AI APIs Work

There are two APIs, and they work together:

- `LanguageDetector` takes text and returns a ranked list of languages, each with a confidence score between 0 and 1.
- `Translator` is created for one language pair, such as English to Spanish, and translates text between them.

Here's what makes them different from calling a cloud API, or from running a model yourself with a library such as Transformers.js:

1. **The browser owns the model.** You don't bundle or host model files. Chrome downloads them the first time a site needs them.
2. **Translation uses language packs.** Chrome's docs describe a language pack as "like a dictionary for a given language", downloaded on demand. The first translation for a pair triggers a download, and later ones reuse it.
3. **Everything is asynchronous and permission-aware.** You check `availability()` first, then call `create()`, and you can watch download progress.

There are four constraints you need to design around, all from Chrome's documentation:

- **User activation.** Creating a translator or detector needs a user gesture, such as a click, when a model has to be downloaded.
- **Not in Web Workers.** Neither API is available in workers, so you call them from the main thread. (The calls are asynchronous and the model runs outside your JavaScript thread, so this doesn't block your UI.)
- **Sequential processing.** Translations are processed one after another. A large request blocks later ones, so chunk work and show a loading indicator.
- **Top-level windows only.** By default, the APIs work in top-level windows and same-origin iframes. Cross-origin iframes need a Permissions Policy `allow` attribute.

The `availability()` method for both APIs returns one of four values, and your UI should handle each:

| Value | Meaning |
| --- | --- |
| `unavailable` | The browser doesn't support these options. |
| `downloadable` | Supported, but a model must be downloaded first. |
| `downloading` | Supported, and a download is already in progress. |
| `available` | Supported and ready to use with no download. |

One privacy detail: Chrome hides the download status of specific language pairs to protect user privacy. Until your site creates a translator for a pair, all pairs are reported as `downloadable`.

---

## Try the APIs in the Playground First

Before you write code, experiment. The [<VPIcon icon="fa-brands fa-chrome"/>Built-in AI Playground](https://chrome.dev/web-ai-demos/built-in-ai-playground/) presents the AI features Chrome exposes as JavaScript APIs, including both of these. Open it in desktop Chrome and try this:

1. Paste a few sentences in different languages into the language detector, and read the confidence scores.
2. Try a single word, then a full sentence. Chrome's documentation warns that short input gives low-accuracy results, so compare the confidence values.
3. Translate between a couple of language pairs. The first translation for a pair may pause while Chrome downloads a language pack.

You'll build exactly this behaviour into the app.

---

## How to Set Up the Next.js Project

Create a Next.js app with TypeScript and the App Router. Answer the remaining prompts however you like:

```sh
npx create-next-app@latest chrome-ai-translator --ts --app --no-tailwind --no-src-dir --import-alias "@/*"
cd chrome-ai-translator
```

Then install the TypeScript definitions for Chrome's built-in AI APIs. TypeScript doesn't know about `Translator` or `LanguageDetector` yet, because they aren't in the standard DOM types:

```sh
npm i -D @types/dom-chromium-ai
```

The package declares `Translator`, `LanguageDetector` and the related types globally, so you don't import anything. Your editor will now autocomplete `Translator.create()` and flag mistakes.

Delete <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-css3-alt"/>`page.module.css` and the unused images in <VPIcon icon="fas fa-folder-open"/>`public/`. You'll replace <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`, <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx` and <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-css3-alt"/>`globals.css`. Create these folders next to <VPIcon icon="fas fa-folder-open"/>`app/`:

```sh title="file structure"
chrome-ai-translator/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── language-select.tsx
│   ├── text-panel.tsx
│   ├── translator-app.tsx
│   └── unsupported-notice.tsx
├── hooks/
│   └── use-translation.ts
└── lib/
    ├── chrome-ai.ts
    └── languages.ts
```

Each folder has one job:

- .<VPIcon icon="fas fa-folder-open"/>`lib/` contains plain TypeScript that talks to Chrome's APIs.
- .<VPIcon icon="fas fa-folder-open"/>`hooks/` turns that into React state.
- .<VPIcon icon="fas fa-folder-open"/>`components/` contains the UI.
- <VPIcon icon="fas fa-folder-open"/>`app/` contains the Next.js page and layout.

---

## How to Define the Languages

Create <VPIcon icon="fas fa-folder-open"/>`lib/languages.ts`. It lists the languages Chrome's Translator API supports (from [<VPIcon icon="fa-brands fa-chrome"/>Chrome's documentation](https://developer.chrome.com/docs/ai/translator-api#supported-languages)). The Translator API uses BCP 47 codes such as `es` or `zh-Hant`:

```ts
/** Sentinel value for "detect the source language for me". */
export const AUTO = "auto";

export interface Language {
  /** BCP 47 code, as expected by the Translator API. */
  code: string;
  name: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: "ar", name: "Arabic", rtl: true },
  { code: "de", name: "German" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "he", name: "Hebrew", rtl: true },
  // ...the full list of 39 languages is in the repository
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "zh-Hant", name: "Chinese (Traditional)" },
];

export function languageName(code: string): string {
  return LANGUAGES.find((language) => language.code === code)?.name ?? code;
}

export function isRtl(code: string): boolean {
  return LANGUAGES.find((language) => language.code === code)?.rtl ?? false;
}
```

A hard-coded list is fine for a tutorial, but Chrome says the list is specific to its implementation and subject to change, and there's no function yet to retrieve it dynamically. That's why the app still calls `Translator.availability()` before every translation. The list only decides what appears in the dropdowns.

The `rtl` flag lets the output render right-to-left for Arabic and Hebrew.

---

## How to Wrap the Chrome APIs

Now you'll create <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="iconfont icon-typescript"/>`chrome-ai.ts`. This file is the heart of the project. It holds every call to Chrome's Translator and Language Detector APIs, so the rest of the app never touches them directly.

You'll build it one piece at a time and add each piece below the previous one. Everything in this file runs in the browser only, so you'll import it from Client Components.

### Step 1: Add the shared constants, types and errors

Start the file with a few small definitions that the later functions depend on:

```ts title="lib/chrome-ai.ts"
/**
 * Thin helpers around Chrome's built-in Translator and Language Detector APIs.
 * Everything here runs in the browser only. Import it from Client Components.
 */

/** Below this confidence we ask the user to pick the language instead of guessing. */
export const CONFIDENCE_THRESHOLD = 0.6;

export type DownloadProgress = (fraction: number) => void;

export class LowConfidenceError extends Error {
  constructor() {
    super("We couldn't tell which language this is. Choose the source language manually.");
  }
}

export class UnsupportedPairError extends Error {
  constructor(source: string, target: string) {
    super(`Chrome can't translate from "${source}" to "${target}" on this device.`);
  }
}
```

Here's what each piece does:

- `CONFIDENCE_THRESHOLD` is the minimum confidence score we accept from the language detector. Detection is a probability, not a fact. Chrome's docs warn that very short phrases and single words give low-accuracy results, and recommend treating the result as unknown when confidence is too low. The hook you'll write later compares each result to this number. `0.6` is a starting point you can tune for your own users.
- `DownloadProgress` is the type of the callback that receives download progress. Chrome reports progress as a fraction from `0` to `1`, so `0.5` means half of the language pack has downloaded.
- `LowConfidenceError` is thrown when the detector can't tell what language the text is in. Giving it its own class lets the hook tell it apart from other failures, and its message tells the user what to do next.
- `UnsupportedPairError` is thrown when Chrome says it can't translate between two languages. It includes both language codes, so the user knows which pair failed.

### Step 2: Check whether the browser supports the APIs

Add the feature-detection function:

```ts title="lib/chrome-ai.ts"
/** Feature detection. Always false on the server, where `self.Translator` doesn't exist. */
export function isBuiltInAISupported(): boolean {
  return typeof self !== "undefined" && "Translator" in self && "LanguageDetector" in self;
}
```

Next.js renders your components on the server first, and on the server there is no `self.Translator`. This function checks three things:

- `typeof self !== "undefined"` makes sure we're in a context where `self` exists at all, so the function can't crash on the server.
- `"Translator" in self` is the check Chrome's documentation recommends for the Translator API.
- `"LanguageDetector" in self` is the matching check for the Language Detector API. The app needs both, so it only reports support when both exist.

The function returns `true` or `false` and never throws. You'll use it later to decide whether to show the translator or a "not supported" notice.

### Step 3: Create the language detector

Next, add the code that creates the detector. This is the first place you'll see the `monitor` callback and download progress:

```ts title="lib/chrome-ai.ts"
let detectorPromise: Promise<LanguageDetector> | null = null;

function getDetector(onProgress?: DownloadProgress) {
  detectorPromise ??= LanguageDetector.create({
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (event) => onProgress?.(event.loaded));
    },
  });
  // If creation fails (e.g. no user activation), allow a retry on the next click.
  detectorPromise.catch(() => {
    detectorPromise = null;
  });
  return detectorPromise;
}
```

Here's how `getDetector()` works:

- `detectorPromise` is a module-level variable that holds the detector. We store the **promise**, not the finished detector. That way, if two parts of the app ask for a detector at the same moment, they share one creation instead of starting two.
- `??=` means "assign only if the variable is `null` or `undefined`". The first call runs `LanguageDetector.create()`, and every later call reuses the stored promise.
- The `monitor` option is a callback that Chrome calls with a `CreateMonitor` object. We listen for its `downloadprogress` event and pass `event.loaded`, the 0-to-1 fraction, to `onProgress`. Chrome's detection model is small and may already be on the device, so this event might never fire. We still handle it, because it can fire the first time.
- The `.catch()` resets `detectorPromise` to `null` if creation fails. Without it, a failed attempt (for example, when Chrome needs a user click that it didn't get) would be cached forever, and the user could never retry.

### Step 4: Detect the language of some text

Now add the function that uses the detector:

```ts title="lib/chrome-ai.ts"
export interface Detection {
  language: string;
  confidence: number;
}

export async function detectLanguage(
  text: string,
  onProgress?: DownloadProgress,
  signal?: AbortSignal,
): Promise<Detection | null> {
  const detector = await getDetector(onProgress);
  // Results are ranked from most to least likely. The last entry is always "und" (undetermined).
  const [top] = await detector.detect(text, { signal });
  if (!top?.detectedLanguage || top.detectedLanguage === "und") return null;
  return { language: top.detectedLanguage, confidence: top.confidence ?? 0 };
}
```

This is what the code does:

- The `Detection` interface describes what we return: a BCP 47 language code such as `"es"`, and a confidence score between `0` and `1`.
- `detectLanguage()` first waits for the detector from `getDetector()`. It passes `onProgress` along so the UI can show a download bar.
- `detector.detect(text, { signal })` returns a list of guesses ranked from most to least likely, each with a `detectedLanguage` and a `confidence`. The `signal` is an `AbortSignal`, so the user can cancel a detection in progress.
- The array destructuring `[top]` takes only the best guess.
- The last item in Chrome's results is always `und`, which means "undetermined". It's the probability that the text isn't in a language the model knows. If the best guess is missing or is `und`, the function returns `null`, which means "no answer".
- Otherwise, it returns the language and confidence. The `?? 0` is a safety net, because TypeScript types `confidence` as optional.

### Step 5: Create and cache translators

Translation is where the language-pair logic lives. Add this next:

```ts title="lib/chrome-ai.ts"
// A Translator is tied to one language pair. Creating one is expensive, so we keep them around.
const translators = new Map<string, Translator>();

export async function getTranslator(
  sourceLanguage: string,
  targetLanguage: string,
  onProgress?: DownloadProgress,
  signal?: AbortSignal,
): Promise<Translator> {
  const key = `${sourceLanguage}>${targetLanguage}`;
  const cached = translators.get(key);
  if (cached) return cached;

  const availability = await Translator.availability({ sourceLanguage, targetLanguage });
  if (availability === "unavailable") {
    throw new UnsupportedPairError(sourceLanguage, targetLanguage);
  }

  const translator = await Translator.create({
    sourceLanguage,
    targetLanguage,
    signal,
    monitor(monitor) {
      monitor.addEventListener("downloadprogress", (event) => onProgress?.(event.loaded));
    },
  });
  translators.set(key, translator);
  return translator;
}
```

This function follows the lifecycle described in Chrome's documentation, in four stages:

1. **Check the cache.** A `Translator` is tied to exactly one language pair. Creating one is expensive, so we keep a `Map` of them, keyed by a string like `"en>es"`. If we already have a translator for this pair, we return it immediately. That's why translating a second sentence is fast.
2. **Check availability.** `Translator.availability()` tells us whether Chrome can handle this pair. It returns `unavailable`, `downloadable`, `downloading` or `available`. If it's `unavailable`, we throw `UnsupportedPairError` before attempting anything else, so no download starts for a pair that can never work.
3. **Create the translator.** `Translator.create()` receives the language pair, the `signal` for cancellation, and a `monitor` that reports download progress exactly like the detector did. If a language pack has to be downloaded, Chrome starts the download automatically here. This is also the step that needs a user gesture, such as a click, when a download is required.
4. **Store and return.** We save the new translator in the `Map` for next time and return it.

### Step 6: Release the models when you're done

Add a function that frees memory:

```ts title="lib/chrome-ai.ts"
/** Releases the memory held by the models. Call it when the user leaves the feature. */
export async function destroyAll() {
  for (const translator of translators.values()) translator.destroy();
  translators.clear();
  const pending = detectorPromise;
  detectorPromise = null;
  (await pending?.catch(() => null))?.destroy();
}
```

MDN recommends calling `destroy()` once you've finished with a `Translator` or `LanguageDetector`, because they can use a lot of resources. This function does that for everything we created:

- The `for` loop calls `destroy()` on every cached translator, and `translators.clear()` empties the cache so a later request creates a fresh one.
- The detector is trickier, because we stored a promise rather than the detector itself. We copy the promise into `pending`, reset the shared variable to `null`, and then wait for the promise.
- `pending?.catch(() => null)` handles two edge cases: there might be no detector at all, or creation might have failed. In both cases we get `null` back, and the final `?.destroy()` does nothing.

The hook you'll write next calls `destroyAll()` when the component unmounts.

### Step 7: Turn API errors into helpful messages

Finally, add the function that explains failures to the user:

```ts title="lib/chrome-ai.ts"
/** Turns the DOMExceptions these APIs throw into messages a user can act on. */
export function describeError(error: unknown): string {
  if (error instanceof DOMException) {
    switch (error.name) {
      case "NotAllowedError":
        return "Chrome needs a fresh click to start the download. Press Translate again.";
      case "NotSupportedError":
        // Also thrown on a brand-new Chrome profile while it is still fetching its components.
        return "Chrome couldn't prepare this translation. If this is your first use, wait a moment and try again. Otherwise, this language may not be supported on your device.";
      case "QuotaExceededError":
        return "That text is too long. Try translating a shorter passage.";
      case "NetworkError":
        return "The language pack couldn't be downloaded. Check your connection and try again.";
    }
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}
```

The built-in AI APIs report problems by throwing a `DOMException`, and the exception's `name` says what went wrong. This function maps each name to a message a person can act on:

- `NotAllowedError`: Chrome needed a user gesture, like a click, to start a download and didn't get one. Asking the user to press Translate again fixes it.
- `NotSupportedError`: MDN documents this as the error thrown when the requested languages aren't supported. During testing I also saw it on a brand-new Chrome profile, on the very first attempt, while Chrome was still preparing its components. The next attempt worked. The message covers both cases.
- `QuotaExceededError`: MDN documents this as the error thrown when the input is larger than the available quota. It means the text is too long.
- `NetworkError`: the language pack couldn't be downloaded.

For anything else, the function falls back to the error's own message if it's a normal `Error`, or to a generic message.

Your <VPIcon icon="fas fa-folder-open"/>`lib/chrome-ai.ts` file is now complete. In the next section, you'll use these functions from a React hook.

---

## How to Build the Translation Hook

Create <VPIcon icon="fas fa-folder-open"/>`hooks/`<VPIcon icon="iconfont icon-typescript"/>`use-translation.ts`. It runs the whole flow (detect, check, translate) and exposes React state:

```ts :collapsed-lines title="hooks/use-translation.ts"
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AUTO } from "@/lib/languages";
import {
  CONFIDENCE_THRESHOLD,
  LowConfidenceError,
  describeError,
  destroyAll,
  detectLanguage,
  getTranslator,
  type Detection,
} from "@/lib/chrome-ai";

export type Phase = "idle" | "detecting" | "preparing" | "translating";

export function useTranslation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [output, setOutput] = useState("");
  const [detected, setDetected] = useState<Detection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  // Free the models when the component unmounts.
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      void destroyAll();
    };
  }, []);

  const translate = useCallback(async (text: string, source: string, target: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const { signal } = controller;

    setError(null);
    setOutput("");
    setDetected(null);
    setDownloadProgress(null);

    try {
      let from = source;

      if (source === AUTO) {
        setPhase("detecting");
        const result = await detectLanguage(text, setDownloadProgress, signal);
        if (!result || result.confidence < CONFIDENCE_THRESHOLD) throw new LowConfidenceError();
        setDetected(result);
        from = result.language;
      }

      if (from === target) {
        throw new Error("The source and target languages are the same.");
      }

      setPhase("preparing");
      setDownloadProgress(null);
      const translator = await getTranslator(from, target, setDownloadProgress, signal);

      setPhase("translating");
      setDownloadProgress(null);
      // Streaming shows text as soon as it's ready, which feels faster for longer input.
      const reader = translator.translateStreaming(text, { signal }).getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((current) => current + value);
      }
    } catch (caught) {
      if (!signal.aborted) setError(describeError(caught));
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setPhase("idle");
        setDownloadProgress(null);
      }
    }
  }, []);

  const cancel = useCallback(() => controllerRef.current?.abort(), []);

  const reset = useCallback(() => {
    setOutput("");
    setDetected(null);
    setError(null);
  }, []);

  return { phase, downloadProgress, output, detected, error, translate, cancel, reset };
}
```

Here's what happens when the user clicks Translate:

1. **Cancel anything in flight** and create a new `AbortController`. Its `signal` goes into every call, so one `cancel()` stops detection, downloading and translating.
2. **Detect, if needed.** When the source is "Detect language", we call `detectLanguage()`. If the result is `null` or below the confidence threshold, we throw `LowConfidenceError`, and the user sees "Choose the source language manually."
3. **Validate.** Translating a language into itself is pointless, so we stop with a clear message.
4. **Prepare the translator.** This is the phase where a language pack may download, so `downloadProgress` updates the progress bar.
5. **Translate with streaming.** We use `translateStreaming()` and append each chunk to the output. In my test of a four-sentence passage, Chrome returned one chunk per sentence. The docs recommend streaming for longer text. For a short sentence, you get a single chunk, so it behaves the same as `translate()`.

Note that we read the stream with `getReader()` instead of `for await`. `for await` over a `ReadableStream` needs the `dom.asynciterable` TypeScript lib, and `getReader()` works everywhere.

The `finally` block only resets the UI if this call is still the current one. Without that check, a cancelled older request could reset the state of a newer one.

The `useEffect` cleanup aborts any pending work and calls `destroyAll()` when the component unmounts, which releases the models.

---

## How to Build the Interface

### Handling server rendering safely

Create <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`translator-app.tsx`. The first decision is how to check browser support in a server-rendered app.

You can't call `isBuiltInAISupported()` during render. The server would answer `false`, the browser would answer `true`, and React would report a hydration mismatch. `useSyncExternalStore` solves this cleanly, because it takes a separate snapshot for the server:

```tsx title="components/translator-app.tsx"
const supported = useSyncExternalStore<boolean | null>(
  noopSubscribe,
  isBuiltInAISupported, // client snapshot
  () => null,           // server snapshot
);
```

The server and the first client render both see `null`, so they match. React then switches to the real answer on the client. The app shows "Checking browser support…" for `null`, a notice for `false`, and the translator for `true`. Nothing is subscribed to, because browser support doesn't change while the page is open, so `noopSubscribe` does nothing.

### The unsupported notice

Browsers without the APIs get a clear explanation instead of a broken form. Create <VPIcon icon="fas fa-folder-open"/>`components/unsupported-notice.tsx`:

```tsx title="components/unsupported-notice.tsx"
export function UnsupportedNotice() {
  return (
    <div className="notice" role="alert">
      <h2>This browser doesn&apos;t support Chrome&apos;s built-in translation</h2>
      <p>
        The Translator and Language Detector APIs are available in Chrome on desktop (version 138
        or later). They aren&apos;t available on mobile, Firefox or Safari.
      </p>
      <p>
        Open this page in desktop Chrome, or read about the APIs in the{" "}
        <a href="https://developer.chrome.com/docs/ai/translator-api">Chrome documentation</a>.
      </p>
    </div>
  );
}
```

### The language selector

Create <VPIcon icon="fas fa-folder-open"/>`components/language-select.tsx`. A real `<label>` connected with `htmlFor` makes the control accessible and enlarges the click target:

```tsx title="components/language-select.tsx"
import { AUTO, LANGUAGES } from "@/lib/languages";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (code: string) => void;
  /** Adds a "Detect language" option (source selector only). */
  allowAuto?: boolean;
}

export function LanguageSelect({ id, label, value, onChange, allowAuto }: Props) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
        {allowAuto && <option value={AUTO}>Detect language</option>}
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### The text panel

Create <VPIcon icon="fas fa-folder-open"/>`components/text-panel.tsx`. One component serves as both the input and the output. It includes the copy and read-aloud buttons from the design:

```tsx :collapsed-lines title="components/text-panel.tsx"
"use client";

import { useState } from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  /** BCP 47 code of the text, so screen readers and speech use the right voice. */
  lang?: string;
  rtl?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function TextPanel({ id, label, value, lang, rtl, readOnly, placeholder, onChange }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function speak() {
    // The Web Speech API is separate from the built-in AI APIs, and works in most browsers.
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(value);
    if (lang) utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="field">
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <textarea
        id={id}
        rows={6}
        value={value}
        lang={lang}
        // dir="auto" lets the browser choose the direction of whatever the user types.
        dir={readOnly ? (rtl ? "rtl" : "ltr") : "auto"}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <div className="actions">
        <button type="button" className="icon" onClick={copy} disabled={!value} aria-label={`Copy ${label.toLowerCase()}`}>
          {copied ? "✓" : "⧉"}
        </button>
        <button type="button" className="icon" onClick={speak} disabled={!value} aria-label={`Read ${label.toLowerCase()} aloud`}>
          🔊
        </button>
      </div>
    </div>
  );
}
```

Some details:

- **Copy** uses the Clipboard API.
- **Read aloud** uses the Web Speech API's `speechSynthesis`. It's a separate browser feature from the built-in AI APIs, and it works in most browsers. We set `utterance.lang` so the browser picks a matching voice.
- `dir="auto"` on the input lets the browser choose the text direction from whatever the user types, so Arabic input works without extra logic.
- The output uses `lang` and `dir` from the target language, so screen readers pronounce it correctly and RTL scripts render properly.
- Both buttons have `aria-label`s, because their visible content is only an icon.

### Putting it together

Here's the main component:

```tsx :collapsed-lines title="main.tsx"
"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { isBuiltInAISupported } from "@/lib/chrome-ai";
import { AUTO, isRtl, languageName } from "@/lib/languages";
import { LanguageSelect } from "./language-select";
import { TextPanel } from "./text-panel";
import { UnsupportedNotice } from "./unsupported-notice";

const noopSubscribe = () => () => {};

export function TranslatorApp() {
  // `null` on the server and during hydration, then the real answer on the client.
  // This avoids a hydration mismatch, because the server can't know what the browser supports.
  const supported = useSyncExternalStore<boolean | null>(
    noopSubscribe,
    isBuiltInAISupported,
    () => null,
  );

  const { phase, downloadProgress, output, detected, error, translate, cancel, reset } =
    useTranslation();

  const [source, setSource] = useState(AUTO);
  const [target, setTarget] = useState("es");
  const [text, setText] = useState("");

  if (supported === null) return <p className="status">Checking browser support…</p>;
  if (!supported) return <UnsupportedNotice />;

  const busy = phase !== "idle";
  const sourceLang = source === AUTO ? detected?.language : source;

  const statusMessage = (() => {
    if (error) return error;
    if (phase === "detecting") return "Detecting language…";
    if (phase === "preparing") return "Preparing the translator…";
    if (phase === "translating") return "Translating…";
    if (detected && source === AUTO) {
      return `Detected ${languageName(detected.language)} (${Math.round(detected.confidence * 100)}% confidence).`;
    }
    return "";
  })();

  function swap() {
    if (!sourceLang) return;
    setSource(target);
    setTarget(sourceLang);
    setText(output);
    reset();
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // This runs inside a click handler, so Chrome sees "user activation".
        // That's required before it will download a model.
        void translate(text.trim(), source, target);
      }}
    >
      <div className="grid">
        <div className="column">
          <LanguageSelect
            id="source-language"
            label="From"
            value={source}
            onChange={(code) => {
              setSource(code);
              reset();
            }}
            allowAuto
          />
          <TextPanel
            id="source-text"
            label="Source text"
            value={text}
            lang={sourceLang}
            placeholder="Type or paste text…"
            onChange={setText}
          />
        </div>

        <button
          type="button"
          className="swap"
          onClick={swap}
          disabled={busy || !sourceLang}
          aria-label="Swap languages"
          title="Swap languages"
        >
          ⇄
        </button>

        <div className="column">
          <LanguageSelect id="target-language" label="To" value={target} onChange={setTarget} />
          <TextPanel
            id="translation"
            label="Translation"
            value={output}
            lang={target}
            rtl={isRtl(target)}
            readOnly
            placeholder="The translation appears here."
          />
        </div>
      </div>

      <div className="submit-row">
        {busy ? (
          <button type="button" className="secondary" onClick={cancel}>
            Cancel
          </button>
        ) : (
          <button type="submit" disabled={!text.trim()}>
            Translate
          </button>
        )}
      </div>

      {downloadProgress !== null && (
        <label className="progress">
          Downloading language pack… {Math.round(downloadProgress * 100)}%
          <progress max={1} value={downloadProgress} />
        </label>
      )}

      {/* A live region announces status changes and errors to screen readers. */}
      <p role="status" aria-live="polite" className={error ? "status error" : "status"}>
        {statusMessage}
      </p>
    </form>
  );
}
```

A few details are worth noting.

The form's `onSubmit` handler calls `translate()`. Because it runs inside the click that submitted the form, Chrome sees user activation. That's what lets Chrome start a model download. Calling `Translator.create()` from a `useEffect` on page load would not have a user gesture.

The swap button exchanges the two languages and moves the translation into the input box. If the source is "Detect language", it uses the language that was detected, and it's disabled until there is one.

The status line is a `<p role="status" aria-live="polite">`. Screen readers announce messages like "Translating…", the detection result, and errors without moving focus. The progress bar has a visible label.

### The page and layout

Finally, wire it into the app. <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` is a Server Component that renders the client component:

```tsx title="app/page.tsx"
import { TranslatorApp } from "@/components/translator-app";

export default function Home() {
  return (
    <main>
      <h1>Translate with Chrome&apos;s built-in AI</h1>
      <p className="lede">
        Text is detected and translated on your device by Chrome. It isn&apos;t sent to a
        translation server.
      </p>
      <TranslatorApp />
    </main>
  );
}
```

And <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx`:

```tsx title="app/layout.tsx"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Translate with Chrome's built-in AI",
  description:
    "A Next.js app that translates text on-device using Chrome's Translator and Language Detector APIs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

I won't reproduce the CSS here because none of it is specific to the APIs. Copy <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` from the repository. It styles the two-column layout, the buttons and the progress bar, and collapses to one column on small screens.

Notice the boundary: <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` and <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx` are Server Components, while <VPIcon icon="fa-brands fa-react"/>`translator-app.tsx` starts with `"use client"`, so it and everything it imports run in the browser. That's the right place for the boundary, because everything that touches Chrome's APIs has to run on the client.

---

## How to Run and Test the App

Start the dev server and open the URL in **desktop Chrome**:

```sh
npm run dev
```

Then try these scenarios. Here's what I saw in Chrome 156 on macOS:

| What I did | What happened |
| --- | --- |
| Typed "This is a test sentence." with the source set to *Detect language* and target *Spanish* | Detected "English (100% confidence)" and translated it to "Esta es una oración de prueba." |
| Chose a language pair I hadn't used before (English to French) | A progress bar counted up as the language pack downloaded, which took about 15 seconds on my connection, then the translation appeared. |
| Translated a Spanish sentence into English | Detected "Spanish (100% confidence)" and returned "Hello, how are you today? I hope everything goes well." |
| Typed a Hausa sentence | Chrome's detector recognised it (`ha`), but the translator reported that it can't translate from `ha` to English. |

The Hausa result is a good lesson. Language *detection* and language *translation* support different sets of languages. Chrome's translator list doesn't include Hausa, Yoruba or Igbo, so for those languages you'd need a different approach, such as a server-side model or a cloud translation API.

Also try the edge cases:

- Click **Cancel** while a language pack downloads.
- Enter a single word with *Detect language* selected. Detection is much less reliable on short input, so you may be asked to choose the language yourself.
- Pick the same language for both sides.

If your first attempt in a brand-new Chrome profile fails with a "couldn't prepare this translation" message, wait a moment and try again. In my first run in a fresh profile, Chrome threw a `NotSupportedError` before it succeeded on the next attempt, which is why `describeError` explains it rather than blaming the language.

---

## Limitations and Production Considerations

The built-in AI APIs make the translation code small, but they come with constraints you should plan for.

### Browser support

These are Chrome (and Edge) on desktop features. Treat them as progressive enhancement:

- Feature-detect with `"Translator" in self` before using them, as you did.
- Provide a fallback for everyone else, such as a cloud translation API, and tell users when their text will leave the device.
- Don't hide the rest of your product behind the feature.

### Privacy

Be precise about what "private" means:

- **Translation and detection run locally.** The text isn't sent to a translation API.
- **Model downloads still happen.** Chrome downloads language packs over the network the first time a pair is used.
- Make sure your own analytics and error logging never capture the text users translate.

### Quality and honesty

- Language detection is probabilistic. Show confidence, set a threshold, and let users override it.
- Chrome's docs warn that the detector can't identify every language with complete accuracy.
- Don't rely on machine translation alone for legal, medical, financial or other high-stakes content, and have native speakers review output for the languages you ship.

### Performance and resources

- **Chunk long input.** Translations are processed sequentially, so a long text delays everything behind it. Show a loading state and split big documents.
- **Check the quota.** Some implementations limit input size. A `Translator` exposes `inputQuota` and `measureInputUsage()`, so you can check before translating (this is the pattern from MDN, which I haven't wired into this demo):

```ts
const translator = await getTranslator("en", "es");
const usage = await translator.measureInputUsage(text);
if (usage > translator.inputQuota) {
  throw new Error("That text is too long to translate in one go.");
}
```

- **Release resources.** Call `destroy()` on translators you no longer need, as `destroyAll()` does.

### Embedding and workers

- The APIs aren't available in Web Workers, so you can't move them off the main thread the way you would with a library such as Transformers.js.
- Cross-origin iframes need a Permissions Policy `allow` attribute to use them.

---

## Conclusion

You built a Next.js translator that runs on-device with no model hosting and no inference backend. Along the way, you used the main parts of the Translator and Language Detector APIs: feature detection, `availability()`, `create()` with download progress, `detect()` with confidence scores, `translateStreaming()`, cancellation with `AbortController`, and `destroy()`.

You also dealt with the problems that browser-based AI introduces in a server-rendered framework: the server has no `Translator`, models download on demand and need a user gesture, support is limited to some browsers, and the quality varies by language.

Browser-based AI doesn't replace server-side AI. It gives you another option, one that can reduce cost and latency and keep ephemeral user text on the device. Where Chrome supports it, you now have a small, standards-based way to build multilingual experiences.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Translator with Chrome’s Built-In AI",
  "desc": "Most translation features work the same way. The user types text, your app sends it to a translation API, and the API sends a translation back. That works, but every request adds cost and latency, and",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-translator-with-chrome-s-built-in-ai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
