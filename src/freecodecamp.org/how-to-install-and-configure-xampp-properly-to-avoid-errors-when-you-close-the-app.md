---
lang: en-US
title: "How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App"
description: "Article(s) > How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App"
icon: fa-brands fa-windows
category:
  - devops
  - Windows
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App"
    - property: og:description
      content: "How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-and-configure-xampp-properly-to-avoid-errors-when-you-close-the-app.html
prev: /devops/windows/articles/README.md
date: 2024-11-14
isOriginal: false
author: Md. Fahim Bin Amin
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cckf4TsHAuw/upload/ab4deba46100e61a5425d817f6406742.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/windows/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App"
  desc="XAMPP is popular software for those who use MySQL databases and PHP. It’s free software, and it supports Windows, Linux OS, and MacOS. This makes it quite popular among developers even though it can also present us with many challenges. One common is..."
  url="https://freecodecamp.org/news/how-to-install-and-configure-xampp-properly-to-avoid-errors-when-you-close-the-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/cckf4TsHAuw/upload/ab4deba46100e61a5425d817f6406742.jpeg"/>

XAMPP is popular software for those who use MySQL databases and PHP. It’s free software, and it supports Windows, Linux OS, and MacOS. This makes it quite popular among developers even though it can also present us with many challenges.

One common issue you may have faced is the errors you can get when you want to exit the application. You can easily mitigate that issue by opening the application launcher as Administrator. But opening the launcher via administrator correctly can also be troublesome. This means that you’ll need to configure a setting so that it asks for administrator access each time you want to launch it.

In this quick tutorial, I’ll walk you through this process so you don’t have to struggle with it.

---

## Video Guide

I have prepared a complete video where I show you how to download and install the client. I also teach you how to make some changes so that you don’t encounter any issues when you want to quit the application.

<VidStack src="youtube/3viM71-ULAw" />

---

## Step-By-Step Process

If you keep the default installation directory during the installation, it will install it inside the `C` drive of your Windows operating system.

::: tabs

@tab:active 1

So simply enter into the “C” drive and go inside the “xampp” directory.

![Find the <FontIcon icon="fas fa-folder-open"/>`xampp` directory](https://cdn.hashnode.com/res/hashnode/image/upload/v1731566127539/9964e362-0f79-4a08-9799-7ea17bd3740e.png)

@tab 2

Scroll down until you find the <FontIcon icon="fas fa-gears"/>`xampp-control.exe` file.

![Find the <FontIcon icon="fas fa-gears"/>`xampp-control.exe` file](https://cdn.hashnode.com/res/hashnode/image/upload/v1731566176798/8a529579-5545-4a97-b32d-6fdbffe15a95.png)

@tab 3

Right-click after selecting the file and open the **Properties**.

![Properties tab](https://cdn.hashnode.com/res/hashnode/image/upload/v1731566236620/dfaa3a6c-795a-4dab-a03a-66b73a7d5de5.png)

@tab 4

Next, go to the **Compatibility** section. Make sure to add a check mark by clicking on the checkbox by “Run the program as an administrator”.

![Configure properties](https://cdn.hashnode.com/res/hashnode/image/upload/v1731566287073/53bf3e86-1a4b-47b3-83e9-96caf1a4195d.png)

Click “Apply”, and “OK”.

:::

That’s it!

Now, whenever you want to open the XAMPP launcher, it will always open with administrator access.

### Quitting the application

When you want to quit the application, you need to click the “Quit” button instead of using the “X” exit button at the upper right side of the window.

![Quit the application](https://cdn.hashnode.com/res/hashnode/image/upload/v1731566387255/316d1778-dd5b-4a61-9efe-cbbaf8fc7552.png)

And now you shouldn’t get any errors when exiting the control panel anymore!

---

## Conclusion

Thanks for reading this short tutorial. I hope it helped you interact more easily with XAMPP.

You can follow me on [GitHub (<FontIcon icon="iconfont icon-github"/>`FahimFBA`)](https://github.com/FahimFBA), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/), and [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`@FahimAmin`)](https://youtube.com/@FahimAmin) [to get](https://youtube.com/@FahimAmin) more content like this. Also, my [website](https://fahimbinamin.com/) is always available for you!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install and Configure XAMPP Properly to Avoid Errors When You Close the App",
  "desc": "XAMPP is popular software for those who use MySQL databases and PHP. It’s free software, and it supports Windows, Linux OS, and MacOS. This makes it quite popular among developers even though it can also present us with many challenges. One common is...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-and-configure-xampp-properly-to-avoid-errors-when-you-close-the-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
