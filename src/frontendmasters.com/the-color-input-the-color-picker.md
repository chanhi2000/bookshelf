---
lang: en-US
title: "The Color Input & The Color Picker"
description: "Article(s) > The Color Input & The Color Picker"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Color Input & The Color Picker"
    - property: og:description
      content: "The Color Input & The Color Picker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-color-input-the-color-picker.html
prev: /programming/js/articles/README.md
date: 2024-01-18
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/503
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

[[toc]]

---

<SiteInfo
  name="The Color Input & The Color Picker"
  desc="HTML has a color input that is pretty decent: That’s it. Support across the board. However, browsers can and do have different approaches to what happens when the input is used. Ultimately: the user activates the input, may choose a color using the provided UI, and the color becomes the inputs value. It’s not my […]"
  url="https://frontendmasters.com/blog/the-color-input-the-color-picker/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/503"/>

HTML has [<VPIcon icon="fa-brands fa-firefox"/>a color input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color) that is pretty decent:

```html
<input type="color">
```

That’s it. [<VPIcon icon="iconfont icon-caniuse"/>Support across the board](https://caniuse.com/input-color). However, browsers can and do have different approaches to what happens when the input is used.

::: tabs

@tab:active macOS Chrome

> has it’s own UI

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/macos-color-input.png?resize=654%2C718&ssl=1)

@tab macOS Firefox

> uses the macOS system color picker

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/macos-color-picker.png?resize=946%2C886&ssl=1)

@tab macOS Safari

> has it’s own UI, allows you to open macOS system color picker

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/safari-color-picker.png?resize=708%2C608&ssl=1)

@tab Windows Chrome

> has it’s own UI (Edge looks the same)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/windows-chrome-color-picker.png?resize=652%2C652&ssl=1)

@tab Window Firefox

> uses the Windows system color picker

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/windows-firefox-color-picker.png?resize=1024%2C873&ssl=1)

@tab Chrome on Android

> Pixel 8

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/chrome-android.png?resize=736%2C1024&ssl=1)

@tab Safari on iOS 17

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/safari-ios17.png?resize=793%2C1024&ssl=1)

:::

Ultimately: the user activates the input, may choose a color using the provided UI, and the color becomes the inputs value.

::: note

It’s not my favorite that you can *only* get 6-digit HEX colors in and out of it, like `#F06D06` and the like. No transparency, no other formats. I have a feeling display-p3 color formats like OKLCH will have a real popularity boom in coming years (because they are sweet: more colors, more logical) and we’ll start wanting better integration, like with color inputs.

:::

---

## The Eyedropper

Note that *some* of those color panels have an eyedropper function. Those are awfully handy. Sometimes the color I’m shooting for is right on my screen somewhere, and a color eyedropper is the fastest and easiest way to grab it.

Turns out [<VPIcon icon="fa-brands fa-chrome"/>there is a native API for an eyedropper](https://developer.chrome.com/docs/capabilities/web-apis/eyedropper)! You don’t *have* to use a color input to access an eyedropper.

You can test for support like:

```js
if ("EyeDropper" in window) {
  
}
```

And use it like:

```js
// used in case you need to cancel the experience
const abortController = new AbortController();

const eyeDropper = new EyeDropper();

try {
  const result = await eyeDropper.open({ signal: abortController.signal });
  console.log(result.sRGBHex);
} catch (e) {
  console.error(e);
}
```

::: tip Demo

<CodePen
  user="chriscoyier"
  slug-hash="jOJVKya"
  title="EyeDropper Playing"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

:::

---

## Anywhere you use a color input, you might as well offer an eyedropper, too.

Test for support first, of course, but I think that statement above largely holds true. Offering a dedicated eyedropper button means saving users a step in case that’s what they are trying to do anyway.

And using the native one is nice, as I find it’s generally a nicer color picker than anything integrated into app itself. Eyedroppers built into *very major* design tools like Adobe Photoshop and Figma largely only let you pick colors from inside the documents themselves, not from anywhere on the screen. Boooo.

The demo above shows how a color input and eyedropper button can work together right next to each other.

---

## Support

Support for color inputs is good across the board, but [<VPIcon icon="iconfont icon-caniuse"/>support for the EyeDropper API](https://caniuse.com/?search=eyedropper), at the time of this writing, is just Chrome’n’friends. No Safari or Firefox.

But the real UX story isn’t quite that clear.

In Firefox, the color input opens the native color picker (both macOS and Windows) and that native picker has an eyedropper. So Firefox users have decently quick access if they need it.

In Safari, the native color picker is an extra click away, but it’s still gettable.

Chrome on Android has no support.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/01/example-picker-1.png?resize=931%2C1024&ssl=1)

I would have assumed iOS didn’t either, and it’s true that it doesn’t support the `EyeDropper` API, but in a quick play of iOS 17 on an iPhone 15, the native UI for a color picker has an eye dropper (!!). That’s pretty cool. I would think that brings Safari generally a lot closer to offering the API directly.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Color Input & The Color Picker",
  "desc": "HTML has a color input that is pretty decent: That’s it. Support across the board. However, browsers can and do have different approaches to what happens when the input is used. Ultimately: the user activates the input, may choose a color using the provided UI, and the color becomes the inputs value. It’s not my […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-color-input-the-color-picker.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
