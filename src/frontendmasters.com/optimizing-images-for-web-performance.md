---
lang: en-US
title: "Optimizing Images for Web Performance"
description: "Article(s) > Optimizing Images for Web Performance"
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
      content: "Article(s) > Optimizing Images for Web Performance"
    - property: og:description
      content: "Optimizing Images for Web Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/optimizing-images-for-web-performance.html
prev: /programming/articles/README.md
date: 2025-02-10
isOriginal: false
author: 
  - name: Todd Gardner
    url: https://frontendmasters.com/blog/author/toddgardner/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5153
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Optimizing Images for Web Performance"
  desc="There is some low-hanging web performance fruit with images. Serving them in the right format, from a CDN, with the right HTML can be a big perf win."
  url="https://frontendmasters.com/blog/optimizing-images-for-web-performance/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5153"/>

Images make websites look great, but they’re**also the biggest performance bottleneck**. They add**huge file sizes**, delay**Largest Contentful Paint (LCP)**, and can even mess with**Cumulative Layout Shift (CLS)**if they aren’t handled properly. And while developers are quick to optimize JavaScript and CSS, images are**often ignored**—despite being the**heaviest**assets on most pages.

So, how do we make images**fast, responsive, and efficient**? Here’s how:

---

## Choose the Right Image Format

The**format**of an image has a massive impact on its size and loading speed. Picking the wrong one can easily**double or triple**your image payload. Check out this illustration:

![Size comparison of images in formats](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/image_formats.png?resize=1024%2C422&ssl=1)

To the user, it’s the exact same image, but the browser has to download 2x-10x more data depending on the format you pick.

Have a look at this photograph:

![Size comparison of photo in formats](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/photo_formats.png?resize=1024%2C422&ssl=1)

Photographs are quite a bit more complex than illustrations (usually), and the best formats can change. Notice how JPG is smaller than PNG this time, but modern formats like WebP and AVIF are still way smaller.

- **JPG**: Best for photos with lots of colors and gradients. Uses**lossy compression**to keep file sizes small.
- **PNG**: Best for graphics, logos, and transparency. Uses**lossless compression**, but files can be**huge**.
- **WebP**: A modern format that’s often**smaller**than JPG and PNG while keeping quality high.
- **AVIF**: Even better compression than WebP, but**not universally supported**yet.

A**good rule of thumb**:**JPG for photos, PNG for graphics**, and use**WebP or AVIF where possible**for modern browsers.

---

## Use Responsive Images

Not all users have the same screen size, so why serve the same**massive**image to everyone? Responsive images let you**deliver the right image size**based on the user’s device, reducing unnecessary downloads and improving load times.

Instead of a single`<img>`tag, try using a`<picture>`with the**`srcset`and`sizes`attributes**to tell the browser which image to load:

<CodePen
  user="toddhgardner"
  slug-hash="NPKZVKL"
  title="Responsive Images"
  :default-tab="['css','result']"
  :theme="dark"/>

In this example, any screen less than **1400px** wide will use an image from the `srcset` that is at least 100% of the viewport’s width. So if the screen is **1100px** wide, the browser will select and download the `hero-desktop-1024` version. This **automatically scales images** to match different devices, **saving bandwidth** and improving loading speed for smaller screens.

---

## Lazy-Load Below the Fold

One of the worst offenders for slow performance? **Loading every image on the page at once**—even ones that aren’t visible. This is where **lazy-loading** comes in. Adding `loading="lazy"` to an `<img>` **prevents it from downloading** until it’s about to be seen.

```html{3}
<img 
  src="downpage-callout.jpg"
  loading="lazy"
  height="300"
  width="300"
>
```

It’s very important to specify the`height`and`width`attributes of images, especially if they are going to be lazy-loaded. Setting these dimensions let’s the browser reserve space in your layout and prevent**layout shifts**when the content loads. For more about layout shifts and how to prevent them, check out this[<VPIcon icon="fas fa-globe"/>deep dive on Cumulative Layout Shift](https://requestmetrics.com/web-performance/cumulative-layout-shift/).

For images that are**critical for rendering**, like your**LCP element**, you should**override lazy-loading**with`fetchpriority="high"`. This tells the browser to**load it ASAP**.

```html{3}
<img
  src="downpage-callout.jpg"
  fetchpriority="high"
  height="300"
  width="300"
>
```

---

## Serve Images from a CDN

A**Content Delivery Network (CDN)**stores images in multiple locations worldwide, so they load from the nearest server instead of your origin. This speeds up delivery and reduces bandwidth costs.

### CDNs use modern HTTP Protocols

Most CDNs will also speed up your images by serving them with modern protocols like HTTP/3, which has significant performance improvements over both HTTP/1 and HTTP/2. Check out this[<VPIcon icon="fas fa-globe"/>case study on HTTP/3 performance](https://requestmetrics.com/web-performance/http3-is-fast/).

### HTTP Caching headers

Users always have to download an image at least once, but HTTP caching headers can help repeat visitors load them much faster. HTTP Caching headers instruct the browser to hold onto the image and use it again, rather than asking for it from the CDN again on the next visit. Here’s an example:

Cache-Control: public, max-age=31536000, immutable

This tells the browser that this image won’t change, and that it can be kept locally for 1 year without needing to be requested again. Caching isn’t just for images—it speeds up**all static assets**. If you’re not sure if your caching is set up correctly, there’s a**[<VPIcon icon="fas fa-globe"/>full guide on HTTP caching](https://requestmetrics.com/web-performance/http-caching/)**that explains how to check and optimize it.

---

## Wrapping Up

Images are one of the biggest opportunities for improving performance. By**choosing the right format, compressing efficiently, lazy-loading, and leveraging CDNs with modern protocols**, you can massively speed up your site.

If you’re looking for more image optimization tips, with detailed breakdown and real-world examples, check out[<VPIcon icon="fas fa-globe"/>the complete guide to optimizing website images](https://requestmetrics.com/web-performance/high-performance-images/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Optimizing Images for Web Performance",
  "desc": "There is some low-hanging web performance fruit with images. Serving them in the right format, from a CDN, with the right HTML can be a big perf win.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/optimizing-images-for-web-performance.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
