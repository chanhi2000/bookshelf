---
lang: en-US
title: "How to create a screencast"
description: "Article(s) > How to create a screencast"
icon: iconfont icon-screencast
category:
  - Tool
  - Screencast
  - Article(s)
tag:
  - blog
  - typescript.tv
  - tool
  - screencast
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to create a screencast"
    - property: og:description
      content: "How to create a screencast"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-create-a-screencast.html
prev: /tool/screencast/articles/README.md
date: 2021-03-06
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Screencast > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/screencast/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to create a screencast"
  desc="Creating a screencast can be challenging. You need the right hardware and software, and post-production is often overlooked. Here are some tips to make it easier."
  url="https://typescript.tv/hands-on/how-to-create-a-screencast"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Creating a screencast can be challenging. You need the right hardware and software, and post-production is often overlooked. Here are some tips to make it easier.

Creating a screencast is harder than it seems. Despite from the idea, you need the right hardware and software to produce high quality content. Especially the post-production is often underestimated. To make your work easier, we would like to give you a few tips on the way.

::: note Preparation

**Desk**

1. Deactivate personal assistants (Amazon Alexa, Google Home, Apple Siri, ...)
2. Turn-off clocks / alarms and other potential noisemakers
3. Have a glass of water next to you in case you get a dry throat

**Operating System**

1. Turn-off your system clock and calendar, so that your recording always looks up-to-date

**IDE**

1. Increase your font size (i.e. from "14" to "22")
2. Set your IDE to full screen mode (i.e. WebStorm: "View" → "Appearance" → "Enter Full Screen")
3. Open all relevant files already in the IDE to access them via tabs
4. Copy important code blocks to the clipboard to prevent errors when typing live

**Recording Software**

1. Always record in your maximum screen resolution to have the best quality available (YouTube supports 4K at 60fps with ease)
2. Make microphone test and adjust gain (loudness) if needed
3. Save project (before starting the recording) on a drive with lots of free space, so that you don't run out of disk space during the recording

![Screen resolution in Windows](https://typescript.tv/images/how-to-create-a-screencast/windows-screen-resolution.png)

![Camtasia project settings matching the screen resolution](https://typescript.tv/images/how-to-create-a-screencast/camtasia-project-settings.png)

![Camtasia full screen settings with sound check](https://typescript.tv/images/how-to-create-a-screencast/camtasia-full-screen-settings.png)

:::

::: important Important resolutions

- HD (1280x720, 16:9)
- FHD (1920x1080, 16:9)
- 2K / QHD (2560x1440, 16:9), Example: Lenovo ThinkVision P24h-10
- Dual QHD (5120x1440, 32:9), Example: LG 49WL95C
- WQHD (3440x1440, 21:9), Example: Dell U3421WE
- 4K / UHD (3840x2160, 16:9), Example: LG 27UN83A-W
- 5K2K / WUHD (5120x2160, 21:9), Example: LG 40WP95X-W
- 6K (6016x3384, 16:9), Example: Apple Pro Display XDR

:::

---

## Post production

### Audio editing

1. Export audio from Camtasia Studio ("Export" → "Export Audio Only...")
2. Import audio file in iZoptope RX Audio Editor
3. Open "Modules" → "Plug-in" → "Ozone 9 Elements"
4. Use the "Maximizer" to set the target loudness to "-14,0 LUFS"
5. Use "Repair" → "De-reverb"
6. Use "Repair" → "De-plosive"
7. Use "Repair" → "Voice De-noise"

![Normalize Loudness](https://typescript.tv/images/how-to-create-a-screencast/ozone-9-loudness.png)

![De-Reverb](https://typescript.tv/images/how-to-create-a-screencast/de-reverb.png)

![De-plosive](https://typescript.tv/images/how-to-create-a-screencast/de-plosive.png)

![Voice De-noise](https://typescript.tv/images/how-to-create-a-screencast/voice-de-noise.png)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to create a screencast",
  "desc": "Creating a screencast can be challenging. You need the right hardware and software, and post-production is often overlooked. Here are some tips to make it easier.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-create-a-screencast.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
