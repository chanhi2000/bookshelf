---
lang: en-US
title: "Reading TOTP Data for 2FA from QR Code in TypeScript"
description: "Article(s) > Reading TOTP Data for 2FA from QR Code in TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Reading TOTP Data for 2FA from QR Code in TypeScript"
    - property: og:description
      content: "Reading TOTP Data for 2FA from QR Code in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/reading-totp-data-for-2fa-from-qr-code-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2024-07-05
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Reading TOTP Data for 2FA from QR Code in TypeScript"
  desc="Learn how to extract Time-based One-Time Password (TOTP) data from a QR code in TypeScript using sharp and jsQR."
  url="https://typescript.tv/hands-on/reading-totp-data-for-2fa-from-qr-code-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to extract Time-based One-Time Password (TOTP) data from a QR code in TypeScript using sharp and jsQR.

Two-Factor Authentication (**2FA**) using Time-based One-Time Passwords (**TOTP**) enhances security by requiring a second form of authentication. A common method to set up TOTP is by scanning a QR code containing the TOTP URI. In this tutorial, we'll demonstrate how to read TOTP data from a QR code in TypeScript using [<VPIcon icon="fa-brands fa-npm"/>`sharp`](https://npmjs.com/package/sharp) and [<VPIcon icon="fa-brands fa-npm"/>`jsqr`](https://npmjs.com/package/jsqr).

---

## Setting Up Your Environment

Before we begin, ensure you have Node.js installed. You can set up a new TypeScript project or use an existing one. We'll need to install a few libraries:

```sh
npm i typescript @types/node sharp jsqr
```

These libraries serve the following purposes:

- **sharp**: For loading images like our QR code for 2FA.
- **jsqr**: To extract plaintext from the QR code image.

We use sharp instead of [<VPIcon icon="fa-brands fa-npm"/>`jimp`](https://npmjs.com/package/jimp) as Jimp does not support SVG image types at the time of writing.

---

## Source Code

Here's the complete code to read TOTP data from a QR code stored in an SVG file:

```ts
import jsQR from 'jsqr';
import sharp from 'sharp';
 
const svgFile = './src/download.svg';
 
// Get raw pixel data in RGBA format
const { data, info } = await sharp(svgFile).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const rgbaValues = new Uint8ClampedArray(data.buffer);
 
// Log the string version of the QR code data
const code = jsQR.default(rgbaValues, info.width, info.height);
console.log(code?.data);
```

Using sharp we can read the raw image data while ensuring the addition of an alpha/transparency channel to ensure an [<VPIcon icon="fa-brands fa-wikipedia-w"/>RGBA color model](https://en.wikipedia.org/wiki/RGBA_color_model).

By constructing a `Uint8ClampedArray`, we generate binary data representing RGBA pixel values structured as `[r0, g0, b0, a0, r1, g1, b1, a1, ...]`. This pixel data is then processed by jsQR to extract the QR code information.

::: info

For GitHub's two-factor authentication, the QR code data for use with a TOTP app will look as follows:

```plaintext
otpauth://totp/GitHub:username?secret=TOPSECRET&issuer=GitHub
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reading TOTP Data for 2FA from QR Code in TypeScript",
  "desc": "Learn how to extract Time-based One-Time Password (TOTP) data from a QR code in TypeScript using sharp and jsQR.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/reading-totp-data-for-2fa-from-qr-code-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
