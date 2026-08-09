---
lang: en-US
title: "Working with ::highlight() using progressive enhancement"
description: "Article(s) > Working with ::highlight() using progressive enhancement"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Working with ::highlight() using progressive enhancement"
    - property: og:description
      content: "Working with ::highlight() using progressive enhancement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/working-with-highlight-using-progressive-enhancement.html
prev: /programming/css/articles/README.md
date: 2026-08-06
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url: https://piccalil.li/author/sunkanmi-fafowora
cover: https://piccalil.b-cdn.net/api/og-image?slug=working-with-highlight-using-progressive-enhancement/
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
  name="Working with ::highlight() using progressive enhancement"
  desc="Using a baseline of <mark> elements, Sunkanmi Fafowora helps you to understand how the new highlight API works with some progressive enhancement for good measure."
  url="https://piccalil.li/blog/working-with-highlight-using-progressive-enhancement"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=working-with-highlight-using-progressive-enhancement/"/>

[<VPIcon icon="fa-brands fa-firefox"/>Highlighting in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-elements#highlight_pseudo-elements) has been beneficial for applying a highlight on specific text or text fragments during user selection, emphasizing a piece of information on a website, or visually emphasizing a text for the sake of branding. Particularly, this is pretty helpful when users want to scan your document from top to bottom because the [<VPIcon icon="fas fa-globe"/>majority of people don’t read your document initially; they scan](https://nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/).

On the web, text highlights are a good way to lay emphasis on text fragments through good ol’ CSS. From `::selection` for styling selected text to `::target-text` which styles highlighted text from Google searches, and in my opinion, CSS’ most powerful pseudo-element for highlighting: `::highlight()` which applies a custom highlight to a text fragment.

In this article, we will look into how the `::highlight()` pseudo-element works, the API behind this pseudo-element, and explore a fallback feature for this technology because it relies **heavily on JavaScript (JS).**

(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();

<CodePen
  user="piccalilli"
  slug-hash="XJjwNap"
  title="::highlight() demo: pure `text-shadow`s"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The CSS Custom Highlight API

Typically, a highlight or highlighted text is what you’d see during web searches or when you what to select a text fragment to copy, or even when you make a mistake in a word processor (the squiggly red underlines)*.* In CSS, you can achieve these through the highlight pseudo-elements like`::search-text`, `::selection`, `::spelling-error` , and `::grammar-error` . But, what about plain highlights like the demo above? That’s where the CSS Custom Highlight API comes in.

The [<VPIcon icon="fa-brands fa-firefox"/>CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API) is an API for text highlighting on a range of text using JavaScript and CSS. It extends the pseudo-elements for highlighting (`::search-text` , `::selection`, `::spelling-error` ) and lets you customize text fragments with `::highlight()` and JavaScript. `::highlight()` is what will be our focus for this article, and how we can programmatically highlight text and its fragments using JavaScript and CSS.

---

## How `::highlight()` works

To create highlighted text like in the initial example, you need to know 4 total steps, which include:

1. Creating the highlight buckets by creating instances of the `Highlight()` class
2. Register each highlight instance into `CSS.highlights`
3. Create `Range()` objects each with different points on the text for highlighting and add `Range()` objects to its highlight instances
4. Style with `::highlight()` pseudo-element

Before we move on with an example, let me explain something because this is where it might get tricky. What we do around here is **build with [progressive enhancement](/piccalil.li/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is.md) in mind first**. So the first question you should ask before anything is “what happens [**_when_ JS fails**](/piccalil.li/a-handful-of-reasons-javascript-wont-be-available.md)?”. Well, I’m glad you asked.

Let’s say, for our example, we want to create two highlight objects and use that to style a simple poetic text that reads “*fire and ice live inside every word.*” Because we care about our users, we set each text for highlight with the `<mark>` HTML tag setting the `class` attribute to either `gold` or `ice` , depending on the highlighting style we wish the text to have. This acts as a fallback highlight style in case our JavaScript fails or the browser doesn’t support custom highlighting.

We also apply an `id` to them in case JS is available too for our CSS Custom Highlight API. With all that in mind, our HTML would look like this:

```html
<main>
  <h1>Two Highlights Demo</h1>
  <p id="line">
    <mark id="fire" class="gold">fire</mark> and
    <mark id="ice" class="ice">ice</mark> live inside 
    <mark id="every" class="ice">every</mark> 
    <mark id="word" class="gold">word</mark>
  </p>
</main>
```

Then, we proceed to query each tagged word in our JS applying the `firstChild` property to each of them of get the element’s first child node which we will use later:

```js
const fireNode = document.querySelector("#fire").firstChild;
const everyNode = document.querySelector("#every").firstChild;
const iceNode = document.querySelector("#ice").firstChild;
const wordNode = document.querySelector("#word").firstChild;
```

Finally, we can proceed with the steps on creating a custom highlight in CSS.

---

## Create instances of `Highlight()` class

In order to create a custom highlight, the first step is to create an instance of the `Highlight()` class which will house the highlight styling we want a text or text fragment to have. For our demo, we’ll be creating two highlight objects named using the `Highlight()` class. One to give a golden color representing fire and the other to give a blue color representing ice:

```js
const goldHL = new Highlight();
const iceHL = new Highlight();
```

---

## Register each highlight instance in CSS.highlights

Next, we register the created highlight instances in the `HighlightRegistry` via `CSS.highlights` `set()` method. We map a valid CSS identifier to the instance for CSS styling later.

```js
CSS.highlights.set("hl-gold", goldHL);
CSS.highlights.set("hl-ice", iceHL);
```

---

## Create `Range()` objects each with different points on the text for highlighting

In this step, we will be creating a `Range()` object for each text fragment we queried earlier for highlighting. We will then apply the highlight we want on each selected text. For the first word “fire”, we create a `Range()` object called `r1` , and we set the start node to the first letter “f” using `setStart` on `r1` . `setStart()` accepts two values. It accepts the node we’re targeting (in our case for “fire”, its `fireNode` ) and the index of the text on the node.

Now, because we want to target the whole text “fire”, we have to also set where the range will stop. And this will be set using `setEnd()` . `setEnd()` accepts two values like `setStart()` on the range object (`r1`). It accepts the node we’re targeting (`fireNode` ) and the index of the end text “e” (as in the “e” in “fire”) using `fireNode.textContent.length` - 1 which gives us the last index of the text.

Finally, we add the range object into the set instance.

```js
const r1 = new Range();
r1.setStart(fireNode, 0);
r1.setEnd(fireNode, fireNode.textContent.length - 1);
goldHL.add(r1);
```

This step is repeated for `everyNode`, `iceNode`, and `wordNode`. Typically, you’d want to use a loop for this, but because this is really small, writing it in a specific manner will suffice, especially to help you understand how this works too.

```js
const r2 = new Range();
r2.setStart(wordNode, 0);
r2.setEnd(wordNode, wordNode.textContent.length - 1);
goldHL.add(r2);

const r3 = new Range();
r3.setStart(iceNode, 0);
r3.setEnd(iceNode, iceNode.textContent.length - 1);
iceHL.add(r3);

const r4 = new Range();
r4.setStart(everyNode, 0);
r4.setEnd(everyNode, everyNode.textContent.length - 1);
iceHL.add(r4);
```

---

## Style with `::highlight()` pseudo-element

Remember how we said we should **think progressive enhancement first?** Well, in order to achieve that for this demo in particular, we need to style the `<mark>`ed highlighted text first, then, we style the `::highlight()` pseudo-element. For that to work, we styled text marked with the `gold` class to be golden in `oklch()` with a glowy text shadow of similar color. We style text `<mark>` ed with the `ice` class to be blueish in `oklch()` with a glowy text shadow of similar color:

```css
mark {
  background: none;
}

mark.gold {
  color: oklch(88% 0.16 75);
  text-shadow: 0 0 40px oklch(65% 0.22 75 / 0.4);
}

mark.ice {
  color: oklch(82% 0.1 215);
  text-shadow: 0 0 40px oklch(60% 0.18 215 / 0.4);
}
```

<CodePen
  user="piccalilli"
  slug-hash="azBoBBo"
  title="::highlight() demo: two highlights without `::highlight()`"
  :default-tab="['css','result']"
  :theme="dark"/>

Viola! (or how do they say it?) It looks amazing! 🤩

Even without the styled `::highlight()` , it works out pretty well. But, that’s not our only aim though. We still need to add the styling for both our highlight objects.

```css
::highlight(hl-gold) {
  color: oklch(88% 0.16 75);
  text-shadow: 0 0 40px oklch(65% 0.22 75 / 0.4);
}

::highlight(hl-ice) {
  color: oklch(82% 0.1 215);
  text-shadow: 0 0 40px oklch(60% 0.18 215 / 0.4);
}
```

Done! It’s pretty much the same styling we did for our `<mark>` tag classes and in case JS fails or the browser doesn’t support it, we wrap the `::higlight()` pseudo-elements in a `@supports` container:

```css
@supports selector(::highlight(h1-gold)) {
  ::highlight(hl-gold) {
    color: oklch(88% 0.16 75);
    text-shadow: 0 0 40px oklch(65% 0.22 75 / 0.4);
  }

  ::highlight(hl-ice) {
    color: oklch(82% 0.1 215);
    text-shadow: 0 0 40px oklch(60% 0.18 215 / 0.4);
  }
}
```

<CodePen
  user="piccalilli"
  slug-hash="qEqWZYN"
  title="::highlight() demo: two highlights with fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Will you be using `::highlight()`?

I know for sure I will be using this feature in my work. This article explained highlighting in CSS, the CSS Custom Highlight API, and how `::higlight()` works in CSS with a fallback provision, for when JavaScript isn’t available or the browser doesn’t support it.

If you’re looking to read up more about the [<VPIcon icon="fa-brands fa-firefox"/>CSS Custom Highlight API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API), MDN has a good guide on the topic for you.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Working with ::highlight() using progressive enhancement",
  "desc": "Using a baseline of <mark> elements, Sunkanmi Fafowora helps you to understand how the new highlight API works with some progressive enhancement for good measure.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/working-with-highlight-using-progressive-enhancement.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
