---
lang: en-US
title: "Why is this thing in Dark Mode?"
description: "Article(s) > Why is this thing in Dark Mode?"
icon: fa-brands fa-chrome
category:
  - Browser
  - Google
  - Google Chrome
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - browser
  - google
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why is this thing in Dark Mode?"
    - property: og:description
      content: "Why is this thing in Dark Mode?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/why-is-this-thing-in-dark-mode.html
prev: /tool/chrome/articles/README.md
date: 2024-07-03
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2907
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why is this thing in Dark Mode?"
  desc="The website has the most control, since that's what applies the CSS. But browsers also have a Dark/Light/System setting, and that can fall through to the OS/Device."
  url="https://frontendmasters.com/blog/why-is-this-thing-in-dark-mode/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2907"/>

I was looking at an email in a web app the other day, and it was showing it to me in “Dark Mode”. The email itself (of my own creation) purposely doesn’t bother to set a `background` or `color` for the most part, as then the defaults kick in which help naturally support both dark and light modes. So I was pleased! It worked!

![Email in “Dark Mode” in Front](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/dark-email.png?resize=1019%2C1024&ssl=1)

![Email in “Light Mode” in Front](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/light-email.png?resize=1016%2C1024&ssl=1)

But then I was like… *why* am I looking at this email in Dark Mode? While I was working on the email, it was in Light Mode. I made it using [<VPIcon icon="fas fa-globe"/>MJML](https://mjml.io/) and the VS Code Extension which gave me a preview of the email, it was was in Light Mode there, so it looked surprising to me in Dark Mode that first time.

First I checked my System Settings on macOS to see what was going on there:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-03-at-10.45.32%402x.png?resize=1024%2C765&ssl=1)

Light Mode there, so it wasn’t my system that was forcing Dark Mode.

Then I checked my browser. I happened to be using Arc, which has Themes.

![That selected option on the left is “Automatic Appearance” which is what some things call “System” meaning match what the OS is doing.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-03-at-10.48.29%402x.png?resize=731%2C1024&ssl=1)

Since that was set to “Automatic Appearance” it was following the OS’ Light Mode so that wasn’t doing it (probably). There is also Command Bar shortcuts in Arc. Try typing “Switch” in there to see actions to change it:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/Screenshot-2024-07-03-at-10.52.44%E2%80%AFAM.png?resize=954%2C446&ssl=1)

Other browsers do it differently, but can do it. For example you can “Customize Chrome” from a button on the Start Page in which you can force a theme or set to “Device”.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-03-at-10.51.22%402x.png?resize=780%2C870&ssl=1)

But this wasn’t explaining it for me either, as I was Light Mode through both of those layers.

What it turned out to be was a website-level setting. I was using the email app [Front](https://front.com/). Front has it’s own settings for themes, and in there indeed it was forcing a Dark Mode.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/07/CleanShot-2024-07-03-at-10.54.51%402x.png?resize=1024%2C571&ssl=1)

Changing that would change the colors of my email, which is exactly what I was trying to figure out.

So in terms of *power*, It’s like:

1. Website setting
2. Browser setting
3. OS/Device setting

And those top two typically have an option to allow the setting to fall through to the next level.

That’s a lot of stuff to check when you’re trying to figure out what is controlling a color theme! I’m tempted to say *too many*, but when it comes to user control over websites, I tend to be in the camp of giving as much control to the user as possible. That leaves me extra conflicted about [<VPIcon icon="fas fa-globe"/>*adding* browser level color mode switches](https://bram.us/2024/04/13/what-if-you-had-real-control-over-light-mode-dark-mode-on-a-per-site-basis/) on a per-side basis, as it will likely lead to a 4-level system of diagnosing what mode is active.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why is this thing in Dark Mode?",
  "desc": "The website has the most control, since that's what applies the CSS. But browsers also have a Dark/Light/System setting, and that can fall through to the OS/Device.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/why-is-this-thing-in-dark-mode.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
