---
lang: ko-KR
title: Reading from the Clipboard in JavaScript
description: Article(s) > Reading from the Clipboard in JavaScript
icon: fa-brands fa-js
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - blog.master.dev
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Reading from the Clipboard in JavaScript"
    - property: og:description
      content: "Reading from the Clipboard in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/reading-from-the-clipboard-in-javascript.html
prev: /programming/js/articles/README.md
date: 2024-07-31
isOriginal: false
author:
  - name: Raymond Camden
    url: https://blog.master.dev/author/raymondcamden/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/3136
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Reading from the Clipboard in JavaScript"
  desc="While it's a bit more common to *write* to the clipboard, JavaScript can also read from it. Plain text is pretty simple, while multimedia content is a bit more complex."
  url="https://blog.master.dev/reading-from-the-clipboard-in-javascript/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/3136"/>

Browsers have excellent support for reading and writing the user’s clipboard, and this opens up possibilities for better, and more *native like* experiences on the web. On websites that use these APIs for helpful features, it feels natural to the user. On sites where it *isn’t* supported, it almost feels like a bug. In this series of articles, I’m going to demonstrate how to work with the clipboard.

::: info Article Series

```component VPCard
{
  "title": "Reading from the Clipboard in JavaScript",
  "desc": "While it's a bit more common to *write* to the clipboard, JavaScript can also read from it. Plain text is pretty simple, while multimedia content is a bit more complex.",
  "link": "/blog.master.dev/reading-from-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Writing to the Clipboard in JavaScript",
  "desc": "The most basic use case, writing a bit of text to the user's clipboard, is mercifully easy. But there is plenty more to know. Did you know writing image data to the clipboard ONLY works with PNG?",
  "link": "/blog.master.dev/writing-to-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Handling Paste Events in JavaScript",
  "desc": "This concludes our three-part series on working with clipboard data. With pasting, we have some control over the type of data we want to use.",
  "link": "/blog.master.dev/handling-paste-events-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Before We Begin…

Clipboard functionality on the web requires a “secure context”. So if you’re running an `http` site (as opposed to an `https` site), these features will not work. I’d highly encourage you to get your site on `https`. That being said, these features, and others like them that require secure contexts, *will* still work on `http://localhost`. There’s no need to set up a temporary certificate when doing local testing.

Also note that some browsers will *manipulate* the content of the clipboard when read. This is done for security reasons and you *can* disable it. I’ll demonstrate this later in the article.

---

## The Clipboard API

The [<VPIcon icon="fa-brands fa-firefox"/>Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) is the top-level object (`navigator.clipboard`) containing the methods to work with the clipboard. According to MDN, support is pretty much across the board:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/s_ECBD0FD7F063D62E16E0A0225C5996F2E05166DE03602AD22C0ACF8F413689D7_1721580997100_shot1.png?resize=788%2C975&ssl=1)

In fact, the only outlier relates to being able to disable the security aspects mentioned above in Firefox and Safari. Outside of that, support is great.

### Reading the Clipboard

Reading from the clipboard is handled by two methods:

- `read`
- `readText`

Which you use will depend on your particular use case. In theory, `read` would be the most flexible, handling *any* content, but if you know for a fact you only need to support text input from the clipboard, you should probably use the more specific `readText` format. I’m a fan of code that helps reduce my chance of mistakes so that’s what I’d recommend. Let’s start with an example of that.

First, I’ll use a bit of HTML:

```html
<button id="readCB">Read Clipboard</button>
<div id="log"></div>
```

The button will be used to kick off the code to read from the clipboard and I’ll use the `<div>` to show the results. Now the JavaScript:

```js
let $log = document.querySelector('#log');

document.querySelector('#readCB').addEventListener('click', async () => {
  let contents = await navigator.clipboard.readText();
  console.log(contents);
  $log.innerText += `From clipboard: ${contents}`;
});
```

When the button is clicked, I try to read text from the clip. Note I said *try*. The first time the button is clicked, the browser prompts for permission:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/s_ECBD0FD7F063D62E16E0A0225C5996F2E05166DE03602AD22C0ACF8F413689D7_1721581019360_shot2.png?resize=461%2C178&ssl=1)

@tab Arc

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/Screenshot-2024-07-25-at-12.50.37%E2%80%AFPM.png?resize=588%2C582&ssl=1)

:::

If you need to revoke or change permissions…

There should be some UI in the browser bar area to do this. On Chrome it’s the little control icon which opens this:

![Chrome controls panel for a website showing secure connection, and also the Clipboard access which can be turned off or reset. ](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-29-at-09.23.27%402x.png?resize=898%2C792&ssl=1)

The process of reading from the clipboard is async, so I’m using `await` to make that a bit simpler. Then, I log the contents to the console and write it out to the DOM.

Here’s a live demo, but **_please note that it may not work for you_**, because of the permissions prompts mentioned above. [You can view this demo here (<VPIcon icon="fa-brands fa-codepen"/>`pen`)](https://cdpn.io/pen/debug/OJeXgOL) and that will allow you to approve the permissions to make it work. It’s tricky with `<iframe>` demos — both domains need the permissions approved, but won’t prompt for them, and even then it doesn’t always want to work.

<CodePen
  user="anon"
  slug-hash="OJeXgOL"
  title="Clipboard Reading"
  :default-tab="['css','result']"
  :theme="dark"/>

### How well does it work?

If you have nothing on the clipboard, the code runs just fine, but the contents are an empty string. It was actually a bit difficult to figure out *how* to empty my clipboard. I initially tested by putting my cursor on an empty line in my editor and hitting CTRL+C, but that felt like a hack. This [<VPIcon icon="fas fa-globe"/>random article](https://windowscentral.com/how-clear-clipboard-data-shortcut-windows-10) showed a command line prompt I could run on Windows that seemed to be more “official”. I used the suggested command and got the exact same result. No error, just an empty string.

Copying text works as expected, but note that if you copy HTML, and insert it into the DOM, it will be rendered as HTML. In my case, I’m using `innerText` so that’s not an issue.

Next, I tested “rendered” text, and by that I mean random text from a web page, ensuring I got styled text as well. As expected, I got just the text of the selection from the HTML. So for example:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/s_ECBD0FD7F063D62E16E0A0225C5996F2E05166DE03602AD22C0ACF8F413689D7_1721581031893_shot3.png?resize=856%2C301&ssl=1)

Which ended up as:

```plaintext
CSS  
MIXINS  
STYLE QUERIES  
Style Queries are Almost Like Mixins (But Mixins Would Be Better)  
By CHRIS COYIER on July 12, 2024  
Having a named block of styles to apply in CSS can be useful, and newfangled Style Queries are pretty close to that. We look at one use case here, how Sass did mixins better, and hope for a native solution.
```

I tried copying from Word and PDF and got the same type of result.

Cool — now let’s kick it up a notch!

---

## Reading Multimedia Content from the Clipboard

As explained earlier, the `read` method can support any content, not just text. Switching to it is as simple as:

```js
let contents = await navigator.clipboard.read();
```

This method returns an array of `ClipboardItems` representing the fact that a user may have selected multiple different items. A [<VPIcon icon="fa-brands fa-firefox"/>ClipboardItem](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem) consists of:

- `types`: An array of MIME types associated with the item
- `presentationStyle`: This was one of the rare times when MDN failed to be helpful and I had to actually [<VPIcon icon="iconfont icon-w3c"/>go to the spec](https://w3c.github.io/clipboard-apis/#presentation-style). This property represents whether the pasted content should be considered as appended content or an attachment. You can imagine how an email client works where if you paste text, it just adds to the current email, but binary data is usually handled as an attachment to the mail instead. You don’t really need to worry about it as it’s only supported in Firefox. That being said, you can make up your own mind depending on the mimetype being used.

To get the actual contents you need to use the `getType` method, which feels oddly named. It takes a mimetype as an argument and returns a blob.

Now things get a bit more complex. Your application has to figure out what makes sense to do based on the data in the clipboard. Let’s consider a more advanced version of the previous demo:

```js :collapsed-lines
document.querySelector('#readCB').addEventListener('click', async () => {
  let contents = await navigator.clipboard.read();

  for (let item of contents) {

    console.log('Types for this item: ', item.types);

    if (item.types.includes('text/html')) {
      let blob = await item.getType('text/html');
      let html = await blob.text();
      console.log(html);
      $log.innerHTML += html.replaceAll('<','&lt;').replaceAll('>','&gt;');
      $log.innerHTML += '<hr>';
    }

    if (item.types.includes('text/plain')) {
      let blob = await item.getType('text/plain');
      let text = await blob.text();
      console.log(text);
      $log.innerHTML += text.replaceAll('<','&lt;').replaceAll('>','&gt;');
      $log.innerHTML += '<hr>';
    }

    if (item.types.includes('image/png')) {
      // modified from MDN sample
      const pngImage = new Image(); 
      pngImage.alt = "PNG image from clipboard";
      const blob = await item.getType("image/png");
      pngImage.src = URL.createObjectURL(blob);
      $log.appendChild(pngImage);
    }

  }
});
```

Remember: each item in the array has itself an array of mimetypes. This is very important because many places where you copy code (web pages, your IDE, etc.) may return *both* `text/plain` and `text/html` for an item. That’s… good, as it gives you options in terms of what you want to do. If you want to try to keep some of the original formatting, get the HTML. If you only care about the content, get just the plain text.

Here’s another live demo, this one handling multiple content types.

<CodePen
  user="anon"
  slug-hash="ZEdpZKv"
  title="Clipboard Reading — Multimedia"
  :default-tab="['css','result']"
  :theme="dark"/>

### Copying from a PDF

Surprisingly, copying from a PDF will only return `text/plain`, even if you select an entire document and it has images. This makes some sense though. Check out the screenshot from Acrobat below, where I had run “Select All”:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/s_ECBD0FD7F063D62E16E0A0225C5996F2E05166DE03602AD22C0ACF8F413689D7_1721581055620_shot4.png?resize=845%2C874&ssl=1)

As you can see above, the textual elements are highlighted, not the image. You can copy an image from a PDF, but you can have to click on it specifically.

---

## Security Concerns and Sanitization

The MDN docs mention this in regards to reading from the clipboard:

> Certain browsers may sanitize the clipboard data when it is read, to prevent malicious content from being pasted into the document. For example, Chrome (and other Chromium-based browsers) sanitizes HTML data by stripping `<script>` tags and other potentially dangerous content. Use the unsanitized array to specify a list of MIME types that should not be sanitized.

The way around this is to pass a `formats` object to the `read` method that specifies an array of mimetypes the browser should *not* sanitize. Given a clipboard with potentially dangerous content, that means you would expect a different result from

```js
let contents = await navigator.clipboard.read();
```

versus:

```js
let contents = await navigator.clipboard.read({ unsanitized: ['text/html'] });
```

This was fairly difficult to test if I selected code that includes the `<script>` tag, it only reported `text/plain` as a mimetype. The only way I was able to verify this was in the [<VPIcon icon="fa-brands fa-firefox"/>MDN example](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read#reading_unsanitized_html_from_the_clipboard) where they kinda “force” the issue by writing to the clipboard as HTML. Honestly, I can’t see a reason to use this particular feature unless more ‘sanitized’ things turn up. I’d recommend just letting the browser clear it out if it needs to. But to be clear, if you copy code that includes the `<script>` tag, it will come in as `text/plain` and be read just fine.

::: note Caveats

Though a user may have a **file** from the filesystem selected, if you try to read it from the clipboard, you get an empty array of results. I found this surprising as you can paste files into the browser and support reading them. We’ll get into that in the article on pasting.

:::

---

## Examples Use Cases

How about some examples to give you ideas of how you would use this in the real world?

### Addresses

Sites making use of client-side maps (like Google Maps or Leaflet) could read from the clipboard and attempt to parse the contents as an address, and if found, focus the map. This will probably require the use of a Geocoding API to translate a freeform address into longitude and latitude points.

Google Maps on iOS (while not technically a web app) behaves this way. If you’ve given permission, if you happen to have an address on your clipboard you’ll see it as a one-click option right up top.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/IMG_9279-472x1024.png?resize=472%2C1024&ssl=1)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/IMG_9280-472x1024.png?resize=472%2C1024&ssl=1)

### QR Codes

How about a [<VPIcon icon="fas fa-globe"/>TamperMonkey](https://tampermonkey.net/) script that lets you take *any* block of text in your clipboard and turn it into a QR code? My buddy Todd Sharp [literally built this (<VPIcon icon="iconfont icon-github"/>`recursivecodes`)](https://gist.github.com/recursivecodes/f06198266cf2adb6da75435be6e410a0) the day after I wrote the first draft of this article. His work could be used in a regular web page as well to product QR codes from the clipboard.

### URLs

If you *knew* the user had a URL on their clipboard, your app could offer to do something with it. Perhaps automatically add useful URL params, shorten it, or otherwise.

---

Can you think of any other use cases for reading from the clipboard? Admittedly, *writing* to the clipboard is generally a more common and useful ability, and we’ll get to that next.

::: info Article Series

```component VPCard
{
  "title": "Reading from the Clipboard in JavaScript",
  "desc": "While it's a bit more common to *write* to the clipboard, JavaScript can also read from it. Plain text is pretty simple, while multimedia content is a bit more complex.",
  "link": "/blog.master.dev/reading-from-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Writing to the Clipboard in JavaScript",
  "desc": "The most basic use case, writing a bit of text to the user's clipboard, is mercifully easy. But there is plenty more to know. Did you know writing image data to the clipboard ONLY works with PNG?",
  "link": "/blog.master.dev/writing-to-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Handling Paste Events in JavaScript",
  "desc": "This concludes our three-part series on working with clipboard data. With pasting, we have some control over the type of data we want to use.",
  "link": "/blog.master.dev/handling-paste-events-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

```component VPCard
{
  "title": "Writing to the Clipboard in JavaScript",
  "desc": "The most basic use case, writing a bit of text to the user's clipboard, is mercifully easy. But there is plenty more to know. Did you know writing image data to the clipboard ONLY works with PNG?",
  "link": "/blog.master.dev/writing-to-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Handling Paste Events in JavaScript",
  "desc": "This concludes our three-part series on working with clipboard data. With pasting, we have some control over the type of data we want to use.",
  "link": "/blog.master.dev/handling-paste-events-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/05/icons-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/icones/ "Icônes")

#### [Icônes](https://blog.master.dev/icones/ "Icônes")

Icônes is an amazing icon resource site. There are tens of thousands of free-to-use icons which are easy to browse and find. Export or copy in SVG, PNG, or as a component in many popular frameworks. https://icones.js.org/

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reading from the Clipboard in JavaScript",
  "desc": "While it's a bit more common to *write* to the clipboard, JavaScript can also read from it. Plain text is pretty simple, while multimedia content is a bit more complex.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/reading-from-the-clipboard-in-javascript.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
