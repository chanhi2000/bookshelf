---
lang: en-US
title: "Keyboard Shortcuts That Display The Correct Modifier Key per OS"
description: "Article(s) > Keyboard Shortcuts That Display The Correct Modifier Key per OS"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - DevOps
  - macOS
  - Windows
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - devops
  - macos
  - win
  - windows
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Keyboard Shortcuts That Display The Correct Modifier Key per OS"
    - property: og:description
      content: "Keyboard Shortcuts That Display The Correct Modifier Key per OS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/keyboard-shortcuts-that-display-the-correct-modifier-key-per-os.html
prev: /programming/js-react/articles/README.md
date: 2026-08-21
isOriginal: false
author:
  - name: Abhishek Jakhar
    url: https://blog.master.dev/author/abhishekjakhar/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10743
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
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
  name="Keyboard Shortcuts That Display The Correct Modifier Key per OS"
  desc="Websites often hardcode keyboard shortcuts for Mac (⌘) while neglecting Windows users, leading to confusion."
  url="https://blog.master.dev/blog.master.dev/keyboard-shortcuts-that-display-the-correct-modifier-key-per-os/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10743"/>

It is becoming increasingly common to add various keyboard shortcuts to websites and applications for ease of use. Some of the very common shortcuts are <kbd>⌘</kbd>+<kbd>v</kbd> for quick chat or search, <kbd>⌘</kbd>+<kbd>Enter</kbd> for submit/Send, <kbd>⌘</kbd> +<kbd>B</kbd>for toggling the side navigation, <kbd>⌘</kbd>+<kbd>B</kbd>/<kbd>I</kbd>/<kbd>U</kbd> for bold, italic, and underline in any rich text editor, and there are tons of them, from changing the theme to opening help support.

The engineers developing applications mostly use MacBooks, and to convey a shortcut, many simply end up hardcoding the <kbd>⌘</kbd> symbol or the text “CMD” for the modifier key. However, most consumers don’t use macOS; they use Windows, and Windows doesn’t have a <kbd>⌘</kbd> symbol or a CMD key, so it can be confusing for Windows users who aren’t from an engineering background. If a software engineer is using a Windows machine, they will understand that <kbd>⌘</kbd> is meant to convey <kbd>Ctrl</kbd>; however, not everyone is a software engineer. In fact, according to StatCounter data, if we look at the worldwide desktop operating system market share, 71.18% of users are on Windows machines.

![[<VPIcon icon="fas fa-globe"/>Via](https://gs.statcounter.com/os-market-share/desktop/worldwide)](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/Screenshot-2026-08-19-at-7.00.03-AM.png?resize=581%2C1024&ssl=1)

About once a week I open my Gaming PC to play some video games and I thought about testing some of the common websites to see if they handle <kbd>⌘</kbd> key based on platform and I found that not every website change modifier according to the platform, let me show you some examples through screenshots which I took on my Windows PC where even on a Windows machine I can see <kbd>⌘</kbd>.

---

## Example 1

This is an official Reddit article that teaches how to use keyboard shortcuts on Reddit. You can [<VPIcon icon="fa-brands fa-reddit"/>have a look at it here](https://support.reddithelp.com/hc/en-us/articles/38744650091412-How-to-use-keyboard-shortcuts-hotkeys).

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/CleanShot-2026-08-19-at-07.02.55%402x.png?resize=1024%2C615&ssl=1)

I opened it on my Windows PC, and when I scroll down to “Submit comment/post” in this table, I see <kbd><VPIcon icon="fa-brands fa-windows"/></kbd>+<kbd>Enter</kbd>, but CMD doesn’t mean anything on Windows machines.

---

## Example 2

Now, let me show you another example of Scrimba, where in the top search bar we can see <kbd>⌘</kbd>+<kbd>K</kbd>; the <kbd>⌘</kbd> symbol does not mean anything on a Windows machine.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/CleanShot-2026-08-19-at-07.04.10%402x.png?resize=1024%2C666&ssl=1)

These are details that engineers sometimes miss because many software engineers use MacBooks to develop software, so on their own machines the <kbd>⌘</kbd> symbol looks completely fine. I believe these are the little details that separate a product from a polished product. If you look at polished products like Linear, VS Code, or Slack, they all show <kbd>⌘</kbd> on Mac and <kbd>Ctrl</kbd> on Windows; they don’t hardcode it. And these are also details that LLMs often miss, unless you prompt them to do so or you have created a skill to audit your application.

---

## Solution

The solution is to detect the user’s platform and, based on it, show either <kbd>⌘</kbd> for a MacBook or <kbd>Ctrl</kbd> for a Windows machine. We can do so by using the browser [<VPIcon icon="fa-brands fa-firefox"/>Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator) API. I have written a code snippet below that you can use. [<VPIcon icon="fa-brands fa-firefox"/>This is the exact pattern MDN itself recommends](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform#determining_the_modifier_key_for_the_users_platform) for this use case.

```js
const isApplePlatform = navigator.platform.startsWith("Mac") || navigator.platform === "iPhone";
const modifierKeyPrefix = isApplePlatform ? "⌘" : "Ctrl";
```

This is how I would use this concept in a React component.

### 1. Create a Utility Function

First, I would create a utility function to detect the modifier key, so we have a single source of truth across our codebase for identifying the modifier key prefix.

```js title="src/utils/platform.js"
export function isApplePlatform() {
  if (typeof navigator === "undefined") return false;
  return navigator.platform.startsWith("Mac") || navigator.platform === "iPhone";
}

export function getModifierKeyPrefix() {
  return isApplePlatform() ? "⌘" : "Ctrl";
}
```

::: note

You can use <kbd>⌘</kbd> or “CMD” if it is an Apple OS; it is up to you, but whatever you use, I would recommend you use the same across your website.

:::

### 2. Get SSR Ready

I would like to add another feature to our code: support for SSR (Server-Side Rendered) applications. On the server, the navigator API is unavailable because it is part of the browser API. Our `isApplePlatform` utility function guards against this with `typeof navigator === "undefined"`, so the server returns false instead of throwing an error and we fall back to Ctrl. It solves the error and crashes, but it leaves another problem.  
  
React expects the HTML produced on the server to match the HTML produced in the browser on the first render; otherwise, React reports a hydration mismatch. To avoid this, I have created a custom hook that imports the utility function above and returns the correct modifier key prefix once the component has mounted in the browser.

```js title="src/hooks/useModifierKey.js"
import { useState, useEffect } from "react";
import { getModifierKeyPrefix } from "../utils/platform";

export function useModifierKey() {
  const [modifierKey, setModifierKey] = useState("Ctrl"); // server + first paint
  useEffect(() => {
    setModifierKey(getModifierKeyPrefix());
  }, []);
  return modifierKey;
}
```

### 3. A React Component

Now, I will create a reusable React component we can use as `<Kbd>`, a natural replacement to HTML’s `<kbd>`.

```js title="src/components/KBD.js"
export function Kbd({ children }) {
  return (
    <kbd>
      {children}
    </kbd>
  )
}
```

The `<kbd>` element is semantically correct here; it is worth using over a `<span>`. You can [<VPIcon icon="fa-brands fa-firefox"/>read more about it here](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/kbd).

This doesn’t do much yet, as we need to call our utility functions when we use this. This might be where you apply styling to make it look like a keyboard key, or however you wish it to look.

### 4. Usage

Now, I will use the `<Kbd>` component to render an example “Search” button.

```js :collapsed-lines
import { useEffect } from "react";
import { Kbd } from "./components/Kbd";
import { useModifierKey } from "./hooks/useModifierKey";
import { isApplePlatform } from "./utils/platform";

function SearchButton({ onOpen }) {
  const modifierKey = useModifierKey();
  const ariaModifier = modifierKey === "⌘" ? "Meta" : "Control";

  useEffect(() => {
    function handleKeyDown(event) {
      const modifierPressed = isApplePlatform() ? event.metaKey : event.ctrlKey;
      if (modifierPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);

  return (
    <button onClick={onOpen} aria-keyshortcuts={`${ariaModifier}+K`}>
      Search
      <Kbd>{modifierKey}</Kbd>
      <Kbd>K</Kbd>
    </button>
  );
}
```

::: info Demo

<CodePen
  link="https://codepen.io/editor/jakharabhishek/pen/019feb32-e69b-7b42-9837-2ab8c8dcf2a9"
  title="Shortcut Keys"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## AI Skill

Here’s a skill you can use to make sure your agents do the right thing.

````md
---
name: 'platform-key-modifier'
description: Use when adding, displaying, or reviewing keyboard shortcuts in a UI. Resolves the Cmd/Ctrl modifier per platform instead of hardcoding one.
---

# Platform Modifier Keys

Most users are not on a Mac. Never ship a hardcoded `⌘`, `Cmd`, or `CMD` in a shortcut hint. Resolve the modifier at runtime, and use one source for both what you display and what you listen for.

Ask user if they wish to use `Cmd` or `⌘` for macOS

```js
const isApplePlatform = navigator.platform.startsWith("Mac") || navigator.platform === "iPhone";
const modifierKeyPrefix = isApplePlatform ? "⌘" : "Ctrl";

// Display: "Save (Cmd+S)" on Mac, "Save (Ctrl+S)" on Windows
```
````

---

## Conclusion

The fix here is very simple and costs nothing. The reason it keeps getting missed is that the engineer who is coding is coding on a MacBook, so the modifier key looks correct every time, and there are so many things to take care of that we forget this.

I would also encourage you to write this rule down as a skill instead of fixing it just once. An LLM keeps following whatever pattern it sees in the codebase, so if it sees a hardcoded modifier key, it will keep using a hardcoded modifier key. A skill is something that you can use to audit your codebase and fix these kinds of issues.

If you are reading this on a MacBook, open your product on a Windows machine — you might find this bug. And the same applies to engineers reading this on a Windows machine: open it on a MacBook; you might also find this bug.

The screenshots below have been taken from the CodePen demo above. I ran the same Pen on my Windows machine and then on my MacBook, and you can see the difference between platform-aware keys and non-platform-aware keys.

![Edge on Windows](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/windows.png?resize=690%2C484&ssl=1)

![Chrome on macOS](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/chromemac.png?resize=788%2C618&ssl=1)

The views expressed in this article are those of the author only and not Coinbase.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Keyboard Shortcuts That Display The Correct Modifier Key per OS",
  "desc": "Websites often hardcode keyboard shortcuts for Mac (⌘) while neglecting Windows users, leading to confusion.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/keyboard-shortcuts-that-display-the-correct-modifier-key-per-os.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
