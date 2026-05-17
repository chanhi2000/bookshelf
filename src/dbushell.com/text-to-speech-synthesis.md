---
lang: en-GB
title: "Play it, Sam. Play “Speech Synthesis”"
description: "Article(s) > Play it, Sam. Play “Speech Synthesis”"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Play it, Sam. Play “Speech Synthesis”"
    - property: og:description
      content: "Play it, Sam. Play “Speech Synthesis”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/text-to-speech-synthesis.html
prev: /programming/js/articles/README.md
date: 2025-07-26
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-07-26-text-to-speech-synthesis.png
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
  name="Play it, Sam. Play “Speech Synthesis”"
  desc="The one where I make the web browser read it for me"
  url="https://dbushell.com/2025/07/26/text-to-speech-synthesis/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-07-26-text-to-speech-synthesis.png"/>

[<VPIcon icon="fas fa-globe"/>Terence Eden’s Numbers Station](https://shkspr.mobi/blog/2025/07/1kb-js-numbers-station/) is a fun experiment using the [<VPIcon icon="fa-brands fa-firefox"/>Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) to synthesise text-to-speech (TTS). Modern web browsers have TTS built-in. Learning of this powerful API gave me an idea.

I’m a big podcast and audiobook listener. I appreciate when blogs provide an alternative audio version. [<VPIcon icon="fas fa-globe"/>Citation Needed](https://citationneeded.news/) and [<VPIcon icon="fas fa-globe"/>Pivot to AI](https://pivot-to-ai.com/) are two exemplary examples. I’ve always been tempted to narrate my own articles, but unlike Molly and David, I have a voice best suited for the silent movies. I’m also building an [**RSS reader**](/dbushell.com/croissant-no-framework-web-app.md) and TTS would be a perfect feature.

---

## Speech Synthesis

The Web Speech API saves me from the sound of my own voice. Reading an entire post can be as simple as three lines of code.

```js
const $post = document.querySelector(".Main > .Prose");
const utterance = new SpeechSynthesisUtterance($post.innerText);
globalThis.speechSynthesis.speak(utterance);
```

The global `speechSynthesis` object has `speak`, `pause`, and `resume` methods. The `utterance` instance will emit events like `pause` and `end`. These primitives are enough to build basic playback controls.

---

## Highlighting Speech

What I want is visual tracking of playback state. Is it possible to highlight specific words as they’re spoken? Yes! With a lot more effort.

The `utterance` instance also fires a `boundary` event.

::: info Web Speech API Draft Specification from *Web Speech API
* (<VPIcon icon="fas fa-globe"/><code>webaudio.github.io</code>)

> Fired when the spoken utterance reaches a word or sentence boundary.
>
> [Web Speech API Draft Specification](https://webaudio.github.io/web-speech-api/#eventdef-speechsynthesisutterance-boundary)

```component VPCard
{
  "title": "Web Speech API",
  "desc": "",
  "link": "https://webaudio.github.io/web-speech-api/#eventdef-speechsynthesisutterance-boundary/",
  "logo": "https://w3.org/2008/site/images/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

The boundary event includes two properties:

1. `charIndex` — starting index of the next character
2. `charLength` — length of the next word to be spoken

This is very promising! The [<VPIcon icon="fa-brands fa-firefox"/>CSS Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) takes a start and end range. The next problem is that the speech synthesiser only has one chunk of text. Mapping those numbers back to DOM nodes accurately isn’t possible.

The solution I’ve come up with is to collect an array of all text nodes.

```js
const nodeList = [];
const collectNodes = ($parent) => {
  for (const $child of $parent.childNodes) {
    if ($child.nodeType === Node.TEXT_NODE) {
      if ($child.textContent.trim() !== "") {
        nodeList.push($child);
      }
    } else if ($child.nodeType === Node.ELEMENT_NODE) {
      collectNodes($child);
    }
  }
};
const $post = document.querySelector(".Main > .Prose");
collectNodes($post);
```

I use a recursive function to create a flat array of all text nodes from my blog post. Next I can iterate the array and speak each node one-by-one.

```js
const nextWord = () => {
  if (nodeList.length === 0) {
    return;
  }
  const $text = nodeList.shift();
  const utterance = new SpeechSynthesisUtterance($text.textContent);
  utterance.addEventListener("end", () => nextWord());
  globalThis.speechSynthesis.speak(utterance);
};
nextWord();
```

This function works by removing the first word from the top of the list and speaking it. Using the `end` event it repeats until all words are spoken.

Now when I add the `boundary` event listener I have a reference to the parent text node. I can use this for the CSS highlight range.

```js
const highlight = new Highlight();
CSS.highlights.set("speech-synth", highlight);

const nextWord = () => {
  if (nodeList.length === 0) {
    return;
  }
  const $text = nodeList.shift();
  const utterance = new SpeechSynthesisUtterance($text.textContent);
  utterance.addEventListener("end", () => nextWord());
  utterance.addEventListener("boundary", (ev) => {
    highlight.clear();
    const range = new Range();
    range.setStart($text, ev.charIndex);
    range.setEnd($text, ev.charIndex + ev.charLength);
    highlight.add(range);
  });
  globalThis.speechSynthesis.speak(utterance);
};
nextWord();
```

CSS has a special named highlight selector.

```css
::highlight(speech-synth) {
  background: green;
}
```

And with that I’m able to highlight each word as they’re spoken. That’s neat! To track the highlighted word I’m scrolling the parent element into view.

```js
$text.parentNode.scrollIntoView({
  behavior: "auto",
  block: "nearest",
});
```

---

## Improvements

Some elements like images and videos have no text content using this technique. For those I’ve added extra conditions. First I create a map (I’ll explain later).

```js
const nodeParent = new WeakMap();
```

Then within `collectNodes` I add the edge cases. For images I generate a text node from the `alt` attribute prefixed with “image:” for context when spoken.

```js
const tagName = $child.nodeName.toLowerCase();
if (tagName === "img") {
  const $text = document.createTextNode(`image: ${$child.alt}`);
  nodeParent.set($text, $child);
  nodeList.push($text);
  continue next;
}
```

Within the `boundary` event listener, and before I apply the highlight range, I first check the weak map. If a parent is mapped I apply a different style.

```js
if (nodeParent.has($text)) {
  const $parent = nodeParent.get($text);
  $parent.dataset.speechSynthHighlight = "true";
  return;
}
```

These nodes can’t be highlighted so instead I apply an outline.

```css
[data-speech-synth-highlight] {
  outline: 10px solid green;
}
```

Later I remove the data attribute alongside clearing any highlights (code not shown).

I do the same thing for videos and code examples. Should I be descending into code blocks and reading syntax verbatim? I’ve opted not to because I think that’d be a worse experience. This is not intended to replace a proper screen reader.

---

## Browser Support

The Web Speech API is well supported. The CSS Highlight API is less so. The latest Chromium and WebKit browsers I use work well. My version of “Firefox” (Mullvad; ESR 128) doesn’t work. (I’ll start caring about Firefox again when Mozilla do.)

The synthetic voice on macOS is good enough. It sounds robotic. It makes some grammatical mistakes. But it’s usable! Presumably Windows and Linux have similar voices.

---

## Source Code

You can view my [<VPIcon icon="fa-brands fa-js"/>JavaScript source file](https://dbushell.com/assets/scripts/speech-synth.js) for the full code. It’s a bit messy right now! I’ve implemented this as a `<speech-synth>` custom element. I’ve added playback controls to an additional `<dialog>` to pause, resume, and end speech.

There is a “Play Synthesised Audio” button at the top of my blog posts and individual note pages. I hope someone finds it useful! I’m going to improve this next week.

Bookmark [**croissantrss.com**](https://croissantrss.com/) if you enjoy reading RSS feeds.

Croissant will be launching soon!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Play it, Sam. Play “Speech Synthesis”",
  "desc": "The one where I make the web browser read it for me",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/text-to-speech-synthesis.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
