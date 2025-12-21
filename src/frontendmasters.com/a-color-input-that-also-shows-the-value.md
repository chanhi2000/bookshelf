---
lang: en-US
title: "A Color Input That Also Shows the Value"
description: "Article(s) > A Color Input That Also Shows the Value"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Color Input That Also Shows the Value"
    - property: og:description
      content: "A Color Input That Also Shows the Value"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-color-input-that-also-shows-the-value.html
prev: /programming/css/articles/README.md
date: 2025-02-18
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5212
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
  name="A Color Input That Also Shows the Value"
  desc="For who-knows-what reason color inputs only show a color swatch, not a string representation of the color. Let's see if we can fix that."
  url="https://frontendmasters.com/blog/a-color-input-that-also-shows-the-value/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5212"/>

It’s awfully nice that HTML provides a native color picker. Activating the input opens up a color picker (either the OS-provided one or something the browser provides), allows you to pick a color, and changes the input’s value to that color.[^1]

![Here’s what that’s like in macOS Chrome](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/CleanShot-2025-02-17-at-13.28.51.gif?resize=800%2C554&ssl=1)

The UI varies, but [**in all cases**](/frontendmasters.com/the-color-input-the-color-picker.md) **it doesn’t actually show you the color value you’ve picked when the picker is closed.** I think that’s… weird? What if the input is part of a form in which you actually have a valid color you want to put in yourself? Or copy the value out of?

I thought of this while I was looking at [Adam Argyle’s `color-mix()` tool (<VPIcon icon="fa-brands fa-codepen"/>`argyleink`)](https://codepen.io/argyleink/pen/YzLMaor). It’s a great tool, but it made me wish I could just type or paste in a color rather than *having* to use the picker.

I figured I’d toss together a Web Component that would actually display the color. We could call it an [HTML web component](https://adactio.com/journal/20618) as it starts with perfectly valid HTML (which you can customize as needed) then you wrap it in a custom element to extend the functionality and/or UI. In this the thing that displays the color is an `<input type="text">`, because that works both to show it, and can accept a value that can propagate back to the color input.

<CodePen
  user="chriscoyier"
  slug-hash="ZYzdgNN"
  title="Color Input"
  :default-tab="['css','result']"
  :theme="dark"/>

That basically does what I was picturing. This keeps it all Light DOM so it would be quite easy to style and customize. Since could be used inside a `<form>`, you might need to fiddle with [<VPIcon icon="fa-brands fa-firefox"/>`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals#examples) so that the input can participate in the form as expected. Since there are now *two* inputs that essentially have the same value, it’s likely you’ll only want one to submit as form data.

But my example there, like native color inputs themselves, deals exclusively in HEX colors. I was hoping that the text input could deal in *any* sort of valid color format.

Erick Merchant had a clever idea where the color from the text input is coerced into a HEX for the benefit of the color input, but otherwise accepts and valid color value. Try putting `oklch(64.26% 0.3059 332)` into this:

<CodePen
  user="erickmerchant"
  slug-hash="JoPgGQY"
  title="Color Input"
  :default-tab="['css','result']"
  :theme="dark"/>

Pretty clever if you ask me! It won’t handle transparency, so that’s something to consider for sure, but otherwise seems to do a pretty good job. I’d be tempted to take the color inputs value in a form generally, as it has automatic validation to ensure it’s a valid color. But in the case of this second demo, I’d be tempted to take the text input value instead since it honors the original intention of the color, albeit very hard to validate.

[^1]: It would be extremely cool if OS color pickers supported formats other than HEX as well as P3-and-beyond color spaces, but that’s a topic for another day.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Color Input That Also Shows the Value",
  "desc": "For who-knows-what reason color inputs only show a color swatch, not a string representation of the color. Let's see if we can fix that.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-color-input-that-also-shows-the-value.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
