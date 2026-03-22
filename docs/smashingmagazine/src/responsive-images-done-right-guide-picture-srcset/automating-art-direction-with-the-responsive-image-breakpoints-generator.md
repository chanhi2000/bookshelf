---
lang: en-US
title: "Automating Art Direction With The Responsive Image Breakpoints Generator"
description: "Article(s) > Automating Art Direction With The Responsive Image Breakpoints Generator"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Automating Art Direction With The Responsive Image Breakpoints Generator"
    - property: og:description
      content: "Automating Art Direction With The Responsive Image Breakpoints Generator"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/automating-art-direction-with-the-responsive-image-breakpoints-generator.html
prev: /programming/css/articles/README.md
date: 2016-09-29
isOriginal: false
author:
  - name: Eric Portis
    url: https://smashingmagazine.com/author/ericportis/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5fcb8cc-e2ed-409d-8ac8-68fb0b32d590/generator-screenshot-outputs-500-opt.png
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
  name="Automating Art Direction With The Responsive Image Breakpoints Generator"
  desc="Four years ago, Jason Grigsby asked a surprisingly difficult question: How do you pick responsive image breakpoints? A year later, he had an answer: Ideally, we’d set responsive image performance budgets to achieve “sensible jumps in file size.”"
  url="https://smashingmagazine.com/2016/09/automating-art-direction-with-the-responsive-image-breakpoints-generator/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5fcb8cc-e2ed-409d-8ac8-68fb0b32d590/generator-screenshot-outputs-500-opt.png"/>

Four years ago, Jason Grigsby asked a surprisingly difficult question: How do you pick responsive image breakpoints? A year later, he had an answer: Ideally, we’d set responsive image performance budgets to achieve “sensible jumps in file size.”

[**Cloudinary built a tool**](/smashingmagazine.com/responsive-image-breakpoints-generation.md) that implements this idea, and the response from the community was universal: “Great! Now, what else can it do?” Today, we have an answer: art direction!

Since its release earlier this year, the Responsive Image Breakpoints Generator has been turning high-resolution originals into responsive `<img>`s with sensible `srcset`s at the push of a button. Today, we’re launching version 2, which allows you to pair layout breakpoints with aspect ratios, and generate art-directed `<picture>` markup, with smart-cropped image resources to match.

::: info Recommended reading

```component VPCard
{
  "title": "Responsive Images Done Right: A Guide To And srcset",
  "desc": "A few days ago, we published an article on Picturefill 2.0, a perfect polyfill for responsive images. Today’s article complements Tim Wright’s article and explains exactly how we can use the upcoming  element and srcset, with simple fallbacks for legacy browsers. There is no reason to wait for responsive images; we can actually have them very soon...",
  "link": "/smashingmagazine.com/responsive-images-done-right-guide-picture-srcset.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

---

## Responsive Image Breakpoints: Asked And Answered

Why did we build this tool in the first place?

Responsive images send different people different resources, each tailored to their particular context; a responsive image is an image that **adapts**. That adaptation can happen along a number of different axes. Most of the time, most developers only need adaptive **resolution** — we want to send high-resolution images to large viewports and/or high-density displays, and lower-resolution images to everybody else. Jason’s question about responsive image breakpoints concerns this sort of adaptation.

When we’re crafting images that adapt to various resolutions, we need to generate a range of different-sized resources. We need to pick a maximum resolution, a minimum resolution and (here’s the tricky bit) some sizes in between. The maximum and minimum can be figured out based on the page’s layout and some reasonable assumptions about devices. But when developers began implementing responsive images, it wasn’t at all clear how to size the in-betweens. Some people picked a **fixed-step size** between image widths:

![Rectangles showing the relative dimensions of a group of `srcset` resources that use a fixed-step-size strategy.](https://res.cloudinary.com/indysigner/image/upload/v1544089109/breakpoints-constant-step-size_x4ywzn.svg)

Others picked a **fixed number of steps** and used it for every range:

![Rectangles showing the relative dimensions of three groups of `srcset` resources that use a fixed-number-of-steps strategy.](https://res.cloudinary.com/indysigner/image/upload/v1544089131/breakpoints-constant-number-of-steps_asg8l2.svg)

Some people picked **common display widths**:

![Rectangles showing the relative dimensions of a group of `srcset` resources scaled to common display widths.](https://res.cloudinary.com/indysigner/image/upload/v1544089152/breakpoints-common-displays_kqxzsf.svg)

At the time, because I was lazy and didn’t like managing many resources, I favored **doubling**:

![Rectangles showing the relative dimensions of a group of `srcset` resources scaled using a doubling strategy.](https://res.cloudinary.com/indysigner/image/upload/v1544089177/breakpoints-doubling_ffywdy.svg)

All of these strategies are essentially arbitrary. Jason thought there had to be a better way. And eventually he realized that we shouldn’t be thinking about these steps in terms of **pixels** at all. We should be aiming for “sensible jumps in file size”; these steps should be [defined in terms of **bytes**](https://cloudfour.com/thinks/sensible-jumps-in-responsive-image-file-sizes/).

For example, let’s say we have the following two JPEGs:

![300 pixels wide (37 KB)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8dc3b957-0861-4036-aeec-933500c3e2b6/bike-big-300px-opt.jpg)

![1200 pixels wide (333 KB)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e88ce4ba-93a8-438c-9df3-422a4eccdfd0/bike-big-1200-opt.jpg)

The biggest reason we don’t want to send the 1200-pixel-wide resource to someone who only needs the small one isn’t the extra pixels; it’s the extra 296 KB of useless data. But different images compress differently; while a complex photograph like this might increase precipitously in byte size with every increase in pixel size, a simple logo might not add much weight at all. For instance, [<VPIcon icon="fas fa-file-image"/>this 1000-pixel-wide PNG](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/04d38dcc-644a-42a8-86cc-2816fd30be36/cloudinary-logo-big.png) is only 8 KB larger than [<VPIcon icon="fas fa-file-image"/>the 200-pixel-wide version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/03679c90-bb55-4fc5-b9ae-47f78b81e48d/cloudinary-logo-small.png).

Sadly, there haven’t been any readily useable tools to generate images at target byte sizes. And, ideally, you’d want something that could generate whole ranges of responsive image resources for you — not just one at a time. [<VPIcon icon="fas fa-globe"/>Cloudinary has built that tool](https://cloudinary.com/blog/introducing_intelligent_responsive_image_breakpoints_solutions?utm_source=Smashing_Mag&utm_medium=Byline&utm_campaign=Art_direction_responsive_breakpoints)!

![A screenshot of the Responsive Image Breakpoints Generator ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/23ba01b8-f887-4d51-a093-0f4945fe5759/generator-screenshot-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29fc7fc1-b7d3-45d2-a6cb-76b197563ce9/generator-screenshot-500-opt.png)

And it has released it as a free [open-source (<VPIcon icon="iconfont icon-github"/>`cloudinary/responsive_breakpoints_generator`)](https://github.com/cloudinary/responsive_breakpoints_generator) web app.

But the people wanted more.

---

## The Next Frontier? Automatic Art Direction!

So, we had built a solution to the breakpoints problem and, in the process, built a tool that made generating **resolution-adaptable** images easy. Upload a high-resolution original, and get back a fully responsive `<img>` with sensible breakpoints and the resources to back it up.

That basic workflow — upload an image, get back a responsive image — is appealing. We’d been focusing on the breakpoints problem, but when we released our solution, people were quick to ask, “What else can it do?”

Remember when I said that resolution-based adaptation is what most developers need, most of the time? Sometimes, it’s not enough. Sometimes, we want to adapt our images along an orthogonal axis: [**art direction**](/smashingmagazine.com/responsive-images-in-wordpress-with-art-direction.md).

Any time we alter our images **visually** to fit a different context, we’re “art directing.” A resolution-adaptable image will look identical everywhere — it only resizes. An art-directed image changes in visually noticeable ways. Most of the time, that means cropping, either to fit a new layout or to keep the most important bits of the image visible when it’s viewed at small physical sizes.

![On small screens, we want to zoom in on the image's subject](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9e887a19-042f-4f28-b4dc-dccd2d256a19/art-direction-example-image-preview-opt.jpg)

People asked us for automatic art direction — which is a hard problem! It requires knowing what the “most important” parts of an image are. Bits and bytes are easy enough to program around; computer vision and fuzzy notions of “importance” are something else entirely.

For instance, given this image:

![Image source: [<VPIcon icon="fas fa-file-image"/>Cloudinary](https://res.cloudinary.com/demo/image/upload/white_cat.jpg)) ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ea1852c7-05ba-4f64-a30b-3558bec10e92/smartdumb-uncropped-large-opt.jpg)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b5bedb5f-98b3-49b9-b342-7f5618bb8ec3/smartdumb-uncropped-preview-opt.jpg)

A dumb algorithm might simply crop in on the center:

![Image source: [<VPIcon icon="fas fa-file-image"/>Cloudinary](https://res.cloudinary.com/demo/image/upload/c_fill,ar_4:6/white_cat.jpg)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ff43e3f1-efab-4722-82ae-81656b226fba/dumbcrop-example-image-preview-opt.jpg)

What you need is an algorithm that can somehow “see” the cat and intelligently crop in on it.

It took us a few months but we built this, too, and packaged it as a feature [<VPIcon icon="fas fa-globe"/>available to all Cloudinary users](https://cloudinary.com/blog/smart_automatic_image_cropping_maybe_you_can_always_get_what_you_want?utm_source=Smashing_Mag&utm_medium=Byline&utm_campaign=Art_direction_responsive_breakpoints).

Here’s how it works: When you specify that you want to crop your image with “automatic gravity” (`g_auto`), the image is run through a series of tests, including edge-detection, face-detection and visual uniqueness. These different criteria are then all used to generate a heat map of the “most important” parts of the image.

![The master rolled-up heat map ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/93b97772-4c41-4aee-961d-6d62eb7512ad/white-cat-g-auto-tests-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7df2aa68-396b-4c91-a164-d9da5c770cb1/white-cat-g-auto-heatmap-opt.png)

A frame with the new proportions is then rolled over the image, possible crops are scored, and a winner is chosen. Here’s a visualization of the rolling frame algorithm (using a [<VPIcon icon="fas fa-file-image"/>different source image](https://res.cloudinary.com/demo/image/upload/mountain_scene_panoramic.jpg)):

The rolling frame, visualized. Bluer squares mean higher scores; the green square is the current pick.

The result? Our cat, front and center:

![Image source: [<VPIcon icon="fas fa-file-image"/>Cloudinary](https://res.cloudinary.com/demo/image/upload/c_fill,ar_4:6,g_auto/white_cat.jpg)) ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ee2e4bc7-cbb4-4c01-8658-251c0a9c37ef/smartcrop-example-image-large-opt.jpg)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/695eff72-341d-4f2e-8f09-6e2ad19ba9a9/smartcrop-example-image-preview-opt.jpg)

Neat!

It was immediately obvious that we could and should use `g_auto`'s smarts to add automatic art direction to the Generator. After a few upgrades to the markup logic and some (surprisingly tricky) UX decisions, we did it: [**Version 2 of the tool**](/smashingmagazine.com/responsive-image-breakpoints-generation.md) — now with art direction — is live.

---

## Let’s Take A Tour

How do you use the Responsive Image Breakpoints Generator?

The workflow has been largely carried over from the first version: Upload an image (or pick one of the presets), and set your maximum and minimum resolutions, a step size (in bytes!), and a maximum number of resources (alternatively, you can simply use our pretty-good-most-of-the-time defaults). Click "Generate," *et voila!* You'll get a visual representation of the resulting image's responsive breakpoints, some sample markup, and a big honkin' "download images" button.

![Screenshot of the tool's inputs ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8e90962a-61d8-4cca-8f33-a61b060dc66f/generator-screenshot-inputs-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1506ca41-ee16-470e-b0e0-acd0a5d0cedd/generator-screenshot-inputs-500-opt.png)

![Screenshot of the tool's outputs ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5fcb8cc-e2ed-409d-8ac8-68fb0b32d590/generator-screenshot-outputs-500-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5fcb8cc-e2ed-409d-8ac8-68fb0b32d590/generator-screenshot-outputs-500-opt.png)

The new version has a new set of inputs, though, which enable art direction. They’re turned off by default. Let’s turn a couple of them on and regenerate, shall we?

![Screenshot of the art-direction inputs, with "Desktop" and "Smartphone" selected ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/91d5725e-0a74-4d31-81e4-f220c3828258/generator-screenshot-art-direction-inputs-selected-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2c0382a2-178d-4e8b-914a-3b356fdf015a/generator-screenshot-art-direction-inputs-selected-preview-opt.png)

The first output section is unchanged: It contains our “desktop” (i.e. full) image, responsively breakpointed to perfection. But below it is a new section, which shows off our new, smartly cropped image:

![Screenshot of the "1:1 Aspect Ratio" section ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3e59fdf6-8a01-4be6-85bf-05376dd8e34f/generator-screenshot-square-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0b0812bf-c935-49b2-add9-a326ed5aaff4/generator-screenshot-square-preview-opt.png)

And below *that*, we now have all of the markup we need for an art-directed `` element that switches between the two crops at a layout breakpoint.

![Screenshot of the picture markup section](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ce223039-3d4e-4235-8cca-22f7f5bdfdca/generator-screenshot-picture-markup-preview-opt.png)

Screenshot of the `` markup section ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e7362f81-30fd-429b-9da9-5eba270aab6e/generator-screenshot-picture-markup-large-opt.png))

Finally, there's a live `` example that shows you what all of that markup actually does.

![Screenshot of the "Live Picture Element in Action" section ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2a5557fe-d524-4154-8200-c4ec976bb60d/generator-screenshot-picture-live-large-opt-1.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/21babac1-9cea-4465-a93e-ae1847883ec3/generator-screenshot-picture-live-opt.png)

Let’s circle back and look at the art direction inputs in a little more detail.

![Screenshot of the art direction inputs, annotated to point out what each thing does ([<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/16b36f74-c302-4ead-923b-553d9f1e63bd/generator-screenshot-art-direction-inputs-annotated-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/57ba2aeb-554d-4a8e-aebc-ea4ac5f061e8/generator-screenshot-art-direction-inputs-annotated-preview-opt.png)

Each big box maps to a device type, and each device type has been assigned a layout breakpoint. The text under the device type’s name shows the specific media query that, when true, will trigger this crop.

Below that, we can specify the aspect ratio that we want to crop to on this device type.

Below *that*, we specify how wide the image will appear relative to the width of the viewport on this type of device. Will it take up the whole viewport (100%) or less than that? The tool uses this percentage to generate simple [<VPIcon icon="fas fa-globe"/>`sizes` markup](https://cloudfour.com/thinks/responsive-images-101-part-5-sizes/) — which specifies how large the image is in the layout. If you're using this code in production, you'll probably want to go back into the example markup and tailor these `sizes` values to match your particular layout more precisely. But depending on your layout, inputting rough estimates here might be good enough.

And there you have it: simple, push-button art direction.

---

## Automation

What if you want to work with more than one image at a time? If you're building entire websites with hundreds or thousands (or hundreds of thousands!) of images — especially if you're working with user-generated content — you'll want more than push-button ease; you'll need full automation. For that, there's Cloudinary's API, which you can use to call the smart-cropping and responsive image breakpoints functions that power the Generator, directly. With the API, you can create customized, optimized and **fully automated** responsive image workflows for projects of any shape or size.

For instance, here’s Ruby code that will upload an image to Cloudinary, smart-crop it to a 16:9 aspect ratio, and generate a set of downscaled resources with sensible responsive image breakpoints:

```ruby
Cloudinary::Uploader.upload("sample.jpg",
    responsive_breakpoints: {
        create_derived: true,
        bytes_step: 20000,
        min_width: 200,
        max_width: 1000,
        transformation: {
            crop: :fill,
            aspect_ratio: "16:9",
            gravity: :auto
        }
    }
)
```

If you work only on the front end, all of this functionality is available via URL parameters, too! Here's a URL powered by [**Client Hints**](/smashingmagazine.com/leaner-responsive-images-client-hints.md) and smart-cropping that does the same thing on *download* that the Ruby code above does on *upload* — *and* it delivers different, dynamically optimized resources to different devices, responsively:

```plaintext title="url"
https://demo-res.cloudinary.com/sample.jpg/c_fill,ar_16:9,g_auto,q_auto/w_auto:breakpoints/sample.jpg
```

A tremendous amount of smarts is packed into that little URL!

---

## Final Thoughts

But back to the Generator. Now, it can do more than "just" pick your image breakpoints — it can pick your art-directed crops, too. And it will generate all of the tedious resources and markup for you; upload one high-resolution original, and get back all of the markup and downscaled resources you need to include a scalable *and* art-directed image on your web page.

Have I mentioned that the Responsive Image Breakpoints Generator is free? And [open-source (<VPIcon icon="iconfont icon-github"/>`cloudinary/responsive_breakpoints_generator`)](https://github.com/cloudinary/responsive_breakpoints_generator)? [**Give it a whirl**](/smashingmagazine.com/responsive-image-breakpoints-generation.md), and please send us feedback. Who knows, maybe we'll be back again soon with version 3!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Automating Art Direction With The Responsive Image Breakpoints Generator",
  "desc": "Four years ago, Jason Grigsby asked a surprisingly difficult question: How do you pick responsive image breakpoints? A year later, he had an answer: Ideally, we’d set responsive image performance budgets to achieve “sensible jumps in file size.”",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/automating-art-direction-with-the-responsive-image-breakpoints-generator.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
