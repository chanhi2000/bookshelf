---
lang: en-US
title: "Let’s Use the Nonexistent ::nth-letter Selector Now"
description: "Article(s) > Let’s Use the Nonexistent ::nth-letter Selector Now"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let’s Use the Nonexistent ::nth-letter Selector Now"
    - property: og:description
      content: "Let’s Use the Nonexistent ::nth-letter Selector Now"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/using-nonexistent-nth-letter-selector-now.html
prev: /programming/css/articles/README.md
date: 2026-04-27
isOriginal: false
author:
  - name: Lee Meyer
    url: https://css-tricks.com/author/leemeyer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/10/nth-letter.png
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
  name="Let’s Use the Nonexistent ::nth-letter Selector Now"
  desc="My shim might give the powers that be another reason to say native support isn't necessary, or if lots of people use my :nth-letter hack in the wild, the browser gods might recognize the need to implement it for real."
  url="https://css-tricks.com/using-nonexistent-nth-letter-selector-now"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/10/nth-letter.png"/>

::: info The Seventh Circle *by Architects* (<VPIcon icon="fa-brands fa-youtube"/><code>youtube.com</code>)

> “I think I’m done with reality.”

<VidStack src="youtube/oVyZNLx46IA" />
:::

We’ve all, at some point, had the [thought (<VPIcon icon="fa-brands fa-medium"/>`@joseph0crick`)](https://medium.com/@joseph0crick/the-awful-css-language-9605534ca6e) that [<VPIcon icon="fas fa-globe"/>CSS sucks](https://forum.level1techs.com/t/css-sucks-and-i-hate-it/171341). Indeed, the overhyped buzz around [<VPIcon icon="fas fa-globe"/>the new pretext.js library](https://blog.damato.design/posts/pretext-review/) as a “CSS killer” reflects how much we all want to strangle CSS at times

Someday in the future, CSS might answer back: “No, you are [<VPIcon icon="fas fa-globe"/>the one who sucks at CSS](https://idiallo.com/blog/learn-css). Here’s the [<VPIcon icon="fas fa-globe"/>CSS Parser API](https://drafts.css-houdini.org/css-parser-api/). Go make your own styling language and [see how close any alternative is to perfect (<VPIcon icon="fa-brands fa-dev"/>`nombrekeff`)](https://dev.to/nombrekeff/flutter-styling-explained-in-css-llf-5-51nm).”

Well, CSS, you’ve been teasing me since 2017 with the possibility of that API, which I hoped would let me create my own CSS syntax, but no such thing materialized.

And while I am venting, since 2003 we’ve asked [<VPIcon icon="fas fa-globe"/>over](https://annevankesteren.nl/2003/09/from-a-markover-to-pseudo-elements) and [over (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/3208) and [**over**](/css-tricks.com/what-else-is-on-your-css-wishlist.md) for `::nth-letter`, which seems like a natural suggestion. I mean, we’ve always had [**`::first-letter`**](/css-tricks.com/almanac-pseudo-selectors/first-letter.md) to mimic print effects like [<VPIcon icon="fas fa-globe"/>drop caps](https://nicksimson.com/posts/2024-drop-caps), so we know you could do `::nth-letter` if you wanted.

You are just a tease, CSS, which means that in 2026, I still can’t write styles like Chris Coyier’s [**hypothetical example**](/css-tricks.com/a-call-for-nth-everything.md##nth-letter-last-letter-nth-last-letter) from back in 2011.

```css
h1.fancy::nth-letter(n) {
  display: inline-block;
  padding: 20px 10px;
  color: white;
}

h1.fancy::nth-letter(even) {
  transform: skewY(15deg);
  background: #C97A7A;
}

h1.fancy::nth-letter(odd) {
  transform: skewY(-15deg);
  background: #8B3F3F;
}
```

---

## Impossible demos of `::nth-letter`

If you prefer to play with an interactive example, here is the invalid syntax `::nth-letter` working in CodePen.

<CodePen
  user="anon"
  slug-hash="WbGpYGR"
  title="nth letter polyfill"
  :default-tab="['css','result']"
  :theme="dark"/>

And here’s a video demo by my eight-year-old, to demonstrate that using this syntax is child’s play.

<VidStack src="youtube/Nku5thWAM8Y" />

If `::nth-letter` existed, we could migrate my [**text vortex scrolling effect**](/css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index.md) to use it, and then delete the JavaScript, as seen below. This is Chrome/Safari-only, due to the use of the new [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) function.

<CodePen
  user="anon"
  slug-hash="wBzpzjB"
  title="nth-letter text vortex"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="youtube/hayNFlmN7PY" />

If we had `::nth-letter`, we could migrate Temani Afif’s amazing [direction-aware elastic hover (<VPIcon icon="fa-brands fa-codepen"/>`t_afif`)](https://codepen.io/t_afif/embed/xbOzxyp), then gleefully delete all the spans in the original markup around each letter. The `::nth-letter` code would be as shown in the CodePen below.

<CodePen
  user="anon"
  slug-hash="dPpJpeg"
  title="nth-letter fork of Temani Afif's Direction-aware Elastic hover"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="youtube/n3fcB51CqgY" />

If only `::nth-letter` existed, I might make it my mission to go around upgrading every [<VPIcon icon="fas fa-globe"/>typography styling](https://letteringjs.com/) demo to use it.

Alas, the syntax to make this work is not possible with CSS and HTML. Such capabilities exist only in the wildest realms of our imagination. Article ends here.

---

## Wait, what? How do all those demos work?

While we’re on the topic of doing the impossible, it has been said — by Philip Walton at Google, who tried really hard in the past to make production-ready CSS polyfills — that [<VPIcon icon="fas fa-globe"/>it is not possible to write a reliable polyfill for CSS](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/). He gave up the idea, but I like to imagine his nickname at Google became “Polyphil,” so it wasn’t a total loss.

Philip also created this [<VPIcon icon="fas fa-globe"/>abandoned framework for creating CSS polyfills](https://philipwalton.github.io/polyfill/), which still works, although it’s so old that the examples show how to polyfill [**flexbox**](/css-tricks.com/snippets-css/a-guide-to-flexbox.md). In the decade since he stopped supporting this library, it doesn’t seem like the feasibility of perfect CSS polyfills has improved.

However, Philip’s findings haven’t stopped [cool CSS polyfills (<VPIcon icon="iconfont icon-github"/>`flackr/scroll-timeline`)](https://github.com/flackr/scroll-timeline) from [existing (<VPIcon icon="iconfont icon-github"/>`GoogleChromeLabs/container-query-polyfill`)](https://github.com/GoogleChromeLabs/container-query-polyfill). They can be useful, even if they can’t be perfect. [Perfect is the enemy of good. (<VPIcon icon="fa-brands fa-medium"/>`detour-ux`)](https://medium.com/detour-ux/perfect-is-the-enemy-of-the-good-why-perfectionism-is-killing-your-teamwork-cbfa62808263)

---

## Why we’re not going to give up on `::nth-letter`

To maintain our motivation for simulating `::nth-letter`, I note that the lack of a spec might make implementing it easier than writing a true polyfill. Anything we create in this space will technically be a [shim rather than a polyfill (<VPIcon icon="fa-brands fa-medium"/>`@aryanvania03`)](https://medium.com/@aryanvania03/what-is-the-difference-between-a-shim-and-a-polyfill-551bb0011b1e). All polyfills are shims, but not all shims are polyfills — like all cows are animals, but not the other way around.

We’re patching CSS to add functionality that never existed, whereas a polyfill simulates a feature that exists in certain environments, and/or at least has a formal spec. The closest we got to a draft spec was [**experimental work Adobe attempted in WebKit back in 2012**](/bram.us/css-nth-letter.md), which [**never got anywhere**](/css-tricks.com/did-we-get-anywhere-on-that-nth-letter-thing.md).

Having explained that, I will use the terms polyfill and shim interchangeably here, because polyfill is the more well-known term, and because I am anyhow about to play fast and loose with what words mean.

---

## Defining our terms

Since nobody knows how `::nth-letter` would behave, I can make up my own answers to [questions like those Jeremy Keith raised about (<VPIcon icon="fa-brands fa-medium"/>`adactio`)](https://adactio.medium.com/an-nth-letter-selector-in-css-6f957e5b18b0) how it would even work.

As Humpty Dumpty said, [<VPIcon icon="fas fa-globe"/>the words will mean what I want them to mean](https://xkcd.com/1860/).

### 1. What does “nth” mean?

Jeremy wondered what the third letter in a paragraph would be. Take this example markup:

```html
<p>AB<span>CD</span>EF</p>
```

The third letter could be:

- “C” because that’s the third letter as it would appear when you read from left to right, regardless of the DOM structure. After all, `p::first-letter` would select “A,” even if that character was deeply nested in markup within the paragraph.
- “E” because [**that’s what `:nth-child` would do**](/css-tricks.com/examples/nth-child-tester.md). E is the third direct child of the paragraph element.
- “D” or “B” if we styled the paragraph to use a [<VPIcon icon="fa-brands fa-stack-overflow"/>right-to-left writing direction](https://stackoverflow.com/a/73013183). In a more probable scenario, if the paragraph above were changed to `<p>אב<span>קד</span>פע</p>` Hebrew characters are inherently right-to-left in Unicode — and then the answer would be different again.

The answer, in the universe I created for this article, is that `::nth-letter` will behave the same as `:nth-child`, which [**depends on the source order of the direct child of the element**](/css-tricks.com/almanac-pseudo-selectors/nth-child.md).

Isn’t life simpler when the rigorous [<VPIcon icon="iconfont icon-w3c"/>drafting process of the W3C](https://w3.org/policies/process/) is replaced with the whims of a lone crackpot?

### 2. What does “letter” mean?

We touched on how other languages would affect `::nth-letter`. Only [<VPIcon icon="fa-brands fa-wikipedia-w"/>half of the web uses English](https://en.wikipedia.org/wiki/Languages_used_on_the_Internet#Usage_statistics_of_content_languages_for_websites). If we are simulating a browser feature, we can’t ignore other languages, can we?

Not only are writing directions different in languages other than English, but [<VPIcon icon="fa-brands fa-wikipedia-w"/>some languages use multiple characters to represent a single letter](https://en.wikipedia.org/wiki/Multigraph_%28orthography%29). Now, in theory, `::first-letter` selects all parts of such a letter. But the [<VPIcon icon="fa-brands fa-firefox"/>browser support for that is poor](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter#browser_compatibility). `::first-letter` has some other interesting edge cases I wouldn’t have expected, such as selecting punctuation together with the first letter, maybe because that’s how drop caps are normally presented.

At this point, I decide that any answer I give would disappoint some people if their idea of a letter isn’t what’s selected by `::nth-letter`. To circumvent this debate, let’s say `::nth-letter` is an alias for the nth *character*.

A bit extreme, but the examples I showed above of how people imagine `::nth-letter` don’t seem to focus on whether each character is a letter. And I think my 8-year-old would have been disappointed if the exclamation point he added to his rainbow text wasn’t colored.

Look, if you don’t like it, go back to your own universe where there’s no `::nth-letter` at all. Or you can tinker with the source code I will show you next.

---

## How to write an impossible polyfill

I published this [experimental library (<VPIcon icon="fa-brands fa-npm"/>`@leemeyer/nth-letter`)](https://npmjs.com/package/@leemeyer/nth-letter) on npm. That’s what the above CodePen uses via [<VPIcon icon="fas fa-globe"/>unpckg](https://unpkg.com/@leemeyer/nth-letter@latest). The `::nth-letter` package received 1.3k downloads in its first week without me advertising it, so that was nice.

Instead of trying to build a perfect polyfill, there’s a certain freedom in knowing we can’t. We’ll therefore [<VPIcon icon="fas fa-globe"/>do the simplest thing that could possibly work](https://ronjeffries.com/xprog/articles/practices/pracsimplest/). We rewrite the CSS and transform the DOM so the browser can do the rest. Here’s a simplified version that is 29 lines of JavaScript and works in today’s browsers. As we explore how it works, you’ll see that the brevity is achieved by leveraging what CSS can already do with minimal tampering.

```js
import getCssData from 'get-css-data';
import { SplitText } from 'gsap/SplitText';

getCssData({
  onComplete(cssText, cssArray, nodeArray) {
    nodeArray.forEach(e => e.remove());
    const selectors = new Set();
    const nthArgs = new Set();
    cssText = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
    // Replace ::nth-letter with :nth-child in CSS
    let rewrittenCss = cssText.replace(
      /([^,{{\r\n]+?)::?nth-letter[ \t]*\(([^\n)]*)\)/gi,
      (full, selector, args) => {
        selector = selector.trim();
        selectors.add(selector);
        nthArgs.add(args);
        // Use :nth-child instead of ::nth-letter
        return `${selector} .char:nth-child(${args})`;
      }
    );
    document.head.insertAdjacentHTML("beforeend", `<style>${rewrittenCss}</style>`);
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el.hasAttribute('data-nth-letter')) return;
        el.setAttribute('data-nth-letter', 'attached');
        new SplitText(el, { type: 'chars', charsClass: 'char' });
      });
    });
  }
});
```

A lot is going on in this small block of code, so let’s break down the phases.

### Translating `::nth-letter` into valid CSS

Even at this first phase, we get a sense that introducing custom CSS syntax won’t be as easy as we might hope. It’s less conveniently obvious how to do it than [<VPIcon icon="fa-brands fa-wikipedia-w"/>monkey patching](https://en.wikipedia.org/wiki/Monkey_patch) JavaScript, although [<VPIcon icon="fas fa-globe"/>the risks](https://kettanaito.com/blog/why-patching-globals-is-harmful) are comparable to patching globals in JavaScript.

The way CSS is applied to a web page doesn’t provide a good opportunity to intercept standard CSS behaviors and customize them.

Indeed, even making the nonstandard `::nth-letter` syntax available to our JavaScript code is [<VPIcon icon="fa-brands fa-firefox"/>tricky](https://philipwalton.com/articles/the-dark-side-of-polyfilling-css/), because the [<VPIcon icon="fa-brands fa-firefox"/>CSS parser will discard invalid CSS,](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Syntax/Error_handling) so if the user includes the selector `.rainbow::nth-letter(2n)`, that won’t be available to JavaScript when it accesses the [<VPIcon icon="fa-brands fa-firefox"/>`stylesheets` property of the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document/styleSheets).

We need to gather all raw CSS free from judgment of validity, so let’s use [<VPIcon icon="fa-brands fa-npm"/>`get-css-data`](https://npmjs.com/package/get-css-data), which concatenates the raw contents of any `style` tags in the DOM and uses [<VPIcon icon="fas fa-globe"/>`fetch`](https://javascripttutorial.net/web-apis/javascript-fetch-api/) to include the contents of each stylesheet imported via `link` tags.

::: note Sidenote

`get-css-data` won’t work if the CORS policy doesn’t allow it, but that is one of the inherent limitations of CSS polyfills.

:::

Next, we rewrite the nonstandard CSS using regular expressions, which [is a bit ghetto](https://softwareengineering.stackexchange.com/questions/113237/when-you-should-not-use-regular-expressions). A more rigorous approach would use something like [PostCSS](https://postcss.org/) at build time. But, we can get away with regex in this case, because we’re not doing our own parsing of CSS; we’re doing a relatively simple find-replace, which regex is good at.

The result of the replacement will translate the invalid CSS…

```css
.rainbow::nth-letter(n) {
  color: #f432a0;
}
```

…into this valid CSS:

```css
.rainbow .char:nth-child(n) {
  color: #f432a0;
}
```

This [<VPIcon icon="fa-brands fa-youtube"/>great video](https://youtu.be/ZskP7cvj3WA) concludes that the least bad option for implementing a CSS polyfill is to “rewrite the CSS to target individual elements while maintaining cascade order.” Philip adds that he has “never seen a polyfill do this. I don’t recommend it, but I think it’s the best of the bad options.” Better late than never to create a polyfill using this strategy.

### Implementing the translator for `::nth-letter`

The shim removes the original styles from the page and replaces them with the rewritten styles, like so:

```js
getCssData({
  onComplete(cssText, cssArray, nodeArray) {
    nodeArray.forEach(e => e.remove());
    const selectors = new Set();
    const nthArgs = new Set();
    cssText = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
    // Replace ::nth-letter with :nth-child in CSS
    let rewrittenCss = cssText.replace(
      /([^,{{\r\n]+?)::?nth-letter[ \t]*\(([^\n)]*)\)/gi,
      (full, selector, args) => {
        selector = selector.trim();
        selectors.add(selector);
        nthArgs.add(args);
        // Use :nth-child instead of ::nth-letter
        return `${selector} .char:nth-child(${args})`;
      }
    );

    document.head.insertAdjacentHTML("beforeend", `<style>${rewrittenCss}</style>`);
  }
});
```

At this point, we have translated the unsupported `::nth-letter` syntax into valid CSS. But it still needs some DOM elements to style, or it won’t do anything.

### Preparing the DOM

Since `::nth-letter` doesn’t exist, my implementation is ultimately a convenient abstraction for what I did manually in my [**spiral scrollytelling article**](/css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index.md). So, after gathering all the elements that require styling of individual characters, we split the targeted content into `div` tags, using the freely available [<VPIcon icon="fas fa-globe"/>SplitText plugin from GSAP](https://gsap.com/docs/v3/Plugins/SplitText/).

```js
selectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    if (el.hasAttribute('data-nth-letter')) return;
    el.setAttribute('data-nth-letter', 'attached');
    new SplitText(el, { type: 'chars', charsClass: 'char' });
  });
}
```

It works! The auto-magically generated CSS receives an auto-magically generated DOM to style. We all live happily ever after. Article over for real this time.

Or is it?

---

## Do we have to modify the DOM for this?

As mentioned in a 2021 CSS-Tricks newsletter [<VPIcon icon="iconfont icon-css-tricks"/>that lamented `::nth-letter` being “sadly still not a thing,”](https://css-tricks.com/newsletter/253-25-years-of-css-css-font-descriptors-and-nth-letter-woes/) the solution of spitting the text into separate elements per character is “pretty gross, right? It’s a shame that we have to mess up the markup to make a relatively simple aesthetic change.”

The same post spoke of a potential accessibility issue if you split characters into their own elements: “screen readers (some, anyway?) read each of those characters with pauses in between.” Research shows that VoiceOver [can <VPIcon icon="fas fa-globe"/>cause this issue](https://lab.dotjay.com/tests/screen-readers/voiceover-text-breaks-workarounds/), although it’s reported that the [<VPIcon icon="fas fa-globe"/>`role` attribute can now alleviate it](https://lab.dotjay.com/tests/screen-readers/voiceover-text-breaks-workarounds/#role-text-approach-2). The [<VPIcon icon="fas fa-globe"/>SplitText plugin I use also automatically accounts for accessibility](https://gsap.com/docs/v3/Plugins/SplitText/#screen-reader-accessibility), but it [<VPIcon icon="fas fa-globe"/>may not work on all screenreaders](https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html#Videos), and sadly, accessibility for split text is harder to get right than you’d think.

Also, if `::nth-letter` were a native feature, it would be a [<VPIcon icon="fas fa-globe"/>pseudo-element](https://w3schools.com/css/css_pseudo_elements.asp). It would be great if we could simulate that, knowing there is a risk we will trip over those extra elements that my library adds to the DOM.

A pseudo-element could give us the best of both worlds for solving the task at hand: something that is purely presentational and doesn’t pollute the DOM, but can still behave like part of the DOM for styling purposes only. Can we implement something similar to avoid polluting our DOM?

Yes and no.

The harsh truth is we may never be able to implement our own custom pseudo-elements.

Earlier, I expressed the hope that the CSS Parser API would someday help, but even in the unlikely event that this API materializes, the intent wouldn’t be to allow developers to implement their own CSS syntax or pseudo-elements. As you can see from this [<VPIcon icon="fas fa-globe"/>2021 unofficial draft](https://wicg.github.io/css-parser-api/), if we ever get this API, it would likely expose the browser’s CSS parser for programmatic use — but it probably wouldn’t help us customize how CSS is interpreted. Custom pseudo-elements would be the domain of a hypothetical CSS Renderer API, which is something my brain just came up with that nobody has even proposed.

Bramus from the Chrome team has a draft document outlining how a [CSS parser extensions API (<VPIcon icon="iconfont icon-github"/>`bramus/css-parser-extensions`)](https://github.com/bramus/css-parser-extensions) would work, and this is closer to what I imagined the hypothetical CSS parser API might provide, but Bramus’s document doesn’t currently discuss custom psuedo-elements. There is also the [HTML-in-canvas API (<VPIcon icon="iconfont icon-github"/>`WICG/html-in-canvas`)](https://github.com/WICG/html-in-canvas) proposal which would let us customize the way elements are rendered without modifying their DOM. That’s [**already experimentally available in Chrome**](/frontendmasters.com/the-web-is-fun-again-first-experiments-with-html-in-canvas.md), but still wouldn’t give us custom psuedo-elements we could arbitrarily style using CSS.

---

## Shadow DOM version of `::nth-letter`

If we’re stuck with manipulating the DOM, the closest we can get to custom pseudo-elements is to hide the character elements in the [**shadow DOM**](/css-tricks.com/encapsulating-style-and-structure-with-shadow-dom.md) of the targeted elements, while exposing an API that lets us style selected characters from outside the target.

If we are determined that targeted elements of this new selector won’t pollute the [**light DOM**](/frontendmasters.com/light-dom-only.md) with extra markup, then we have to hide that markup in the shadow DOM. If we do that, then the closest I know of to a custom pseudo-element is the [**`::part`**](/frontendmasters.com/light-dom-only.md) pseudo-element. If we use that, then by design, we can’t use:

```css
.container::part(character):nth-child(2) {
  color: red;
}
```

The reason is that the shadow DOM of my element would look like:

```html
<div part="character">1</div>
<div part="character">2</div>
```

A consumer of my component shouldn’t be able to know the structure of the shadow DOM from outside the component using CSS. That’s why “[<VPIcon icon="fa-brands fa-firefox"/>structural pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes#tree-structural_pseudo-classes) that match based on tree information, such as `:empty` and `:last-child`, cannot be appended“ to `::part`. Once upon a time, there was a `::shadow` pseudo-element that would have let us style `:nth-child` from outside the shadow DOM, but it was [<VPIcon icon="fa-brands fa-chrome"/>deprecated](https://developer.chrome.com/blog/remove-shadow-piercing) a lifetime ago.

Actually, there is a way to still use `:nth-child` together with `::part` if you think laterally.

What if we populate each character’s `::part` attribute based on the `:nth-child` selectors we know we will need to support? We know what those are, since we created them when we were regex replacing the styles!

Then we’d have:

```css
.rainbow::part(nth-child\(n\)) {
  color: #f432a0;
}
```

And the HTML in our shadow DOM would look something like:

```html
<h1 class="rainbow" data-nth-letter="attached">Rainbow</h1>
Rainbow
#ShadowRoot
<span aria-hidden="true" aria-label="Rainbow">
  <div class="char" aria-hidden="true" part="nth-child(n) nth-child(odd)">R</div>
  <!-- etc. -->
</span>
```

We can generate such a shadow DOM using the following slightly more complex version of the JavaScript:

```js
import getCssData from 'get-css-data';
import { SplitText } from 'gsap/SplitText';
getCssData({
  onComplete(cssText, cssArray, nodeArray) {
    nodeArray.forEach(e => e.remove());
    const selectors = new Set();
    const nthArgs = new Set();

    // Remove CSS comments
    cssText = cssText.replace(/\/\*[\s\S]*?\*\//g, '');

    let rewrittenCss = cssText.replace(
      /([^,{\r\n]+?)::?nth-letter[ \t]*\(([^\n)]*)\)/gi,
      (full, selector, args) => {
        selector = selector.trim();
        selectors.add(selector);
        nthArgs.add(args);
        return `${selector}::part(nth-child\\(${CSS.escape(args)}\\))`;
      }
    );

    document.head.insertAdjacentHTML("beforeend", `<style>${rewrittenCss}</style>`);

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el.shadowRoot || el.hasAttribute('data-nth-letter')) return;

        const shadow = el.attachShadow({ mode: "closed" });
        el.setAttribute('data-nth-letter', 'attached');
        const wrapper = document.createElement("span");
        wrapper.setAttribute('aria-hidden', 'true');
        wrapper.innerHTML = el.innerHTML;
        shadow.appendChild(wrapper);
        const split = new SplitText(wrapper, { type: "chars", charsClass: "char" });

        nthArgs.forEach((arg, i) => {
          let chars = wrapper.querySelectorAll(`.char:nth-child(${arg})`);
          chars.forEach(c => {
            const prev = c.part || "";
            c.part = (prev ? prev + " " : "") + `nth-child(${arg})`;
          });
        });
      });
    });
  }
});
```

By pre-calculating the `:nth-child` selectors as names of the shadow parts which match the `::nth-letter` usages our CSS has requested, we can select them from outside, without touching the light DOM, and without hitting a brick wall of the intentional limitations of shadow DOM.

It works! Are we there yet? Is the best answer to use shadow DOM?

Not really, it causes at least two big issues:

1. This version [won’t work on elements that don’t support attaching a shadow DOM (<VPIcon icon="fa-brands fa-medium"/>`dev-channel`)](https://medium.com/dev-channel/which-elements-support-shadow-dom-d58f5a447197), such as `<a>` or `<p>`.
2. We can’t use the emergent `sibling-index()` function in the styles for a shadow part, because `sibling-index()` relies on knowing the structure of the DOM, just like `:nth-child` does. This prevents supporting the text styling demos I showed at the start. These demos would not work with the shadow DOM version of `::nth-letter`.

I notice that [<VPIcon icon="fa-brands fa-firefox"/>`::first-letter` is also seriously limited in the styling it supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter#allowable_properties). That’s not enough reason to knowingly cripple our implementation of `::nth-letter` when there’s an option not to. I conclude the light DOM version is better. It might be “gross” markup, but at least we are no longer the ones who need to write or maintain it. And if browsers ever support `::nth-letter` natively, the design of the shim is intended so we‘d keep the CSS as-is, delete the reference to my library, and never speak of it again.

---

## The (actual) ending

Now that we have a simple basis for implementing things like `::nth-letter`, it would be feasible to add `::nth-word`, `::nth-last-letter`, and so on. Chris Coyier showed cool use cases for those in his call for [**`::nth` everything**](/css-tricks.com/a-call-for-nth-everything.md).

There are still many limitations to the `::nth-letter` shim, such as:

1. It doesn’t work if you change the DOM or the styles on the fly, although we [<VPIcon icon="fa-brands fa-firefox"/>probably could](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) support that.
2. It doesn’t work if you use `::nth-letter` in a CSS selector passed to [<VPIcon icon="fa-brands fa-firefox"/>`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), although we could monkey-patch JavaScript to make that work.
3. I am unsure how scalable it is.
4. It could lead to hard-to-diagnose bugs because it rewrites all the CSS and adds unexpected “char” divs to the DOM. I noticed that Philip Schatz’s [polyfill (<VPIcon icon="iconfont icon-github"/>`philschatz/css-polyfills.js`)](https://github.com/philschatz/css-polyfills.js) for a [<VPIcon icon="iconfont icon-w3c"/>crazy working draft](https://w3.org/TR/css-content-3/) called the “CSS Generated Content Module” requires the consumer to opt-in by using special attributes on the `link` or `style` tags. That’s an interesting compromise that might limit the blast radius by only triggering the CSS rewrites where we need them, but it seems less convenient than just referencing the library and then using the new syntax.
5. External stylesheets not allowed by CORS won’t work.

In summary, I’d probably use `::nth-letter` and its hypothetical friends all the time if these features were built into browsers. But I must admit that, having explored the complexity of building generic support for a design we can often adequately solve with a few lines of JavaScript, I see why the browsers are reluctant to implement and maintain such a feature.

My shim might give the powers that be another reason to say native support isn’t necessary, or if lots of people use my `::nth-letter` hack in the wild, the browser gods might recognize the need to implement it for real.

Either way, let’s never argue again, CSS. I understand now why you did what you did. I could never stay mad at you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let’s Use the Nonexistent ::nth-letter Selector Now",
  "desc": "My shim might give the powers that be another reason to say native support isn't necessary, or if lots of people use my :nth-letter hack in the wild, the browser gods might recognize the need to implement it for real.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/using-nonexistent-nth-letter-selector-now.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
