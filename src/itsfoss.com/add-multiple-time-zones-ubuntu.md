---
lang: en-US
title: "How to Add Multiple Time Zones in Ubuntu"
description: "Article(s) > How to Add Multiple Time Zones in Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - itsfoss.com
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Add Multiple Time Zones in Ubuntu"
    - property: og:description
      content: "How to Add Multiple Time Zones in Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/add-multiple-time-zones-ubuntu.html
prev: /devops/linux-debian/articles/README.md
isOriginal: false
author: 
  - name: Abhishek Prakash
    url: https://itsfoss.com/author/abhishek/
cover: https://itsfoss.com/content/images/wordpress/2020/04/multiple-timezone-clocks.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Add Multiple Time Zones in Ubuntu"
  desc="Follow the steps for adding additional clocks for multiple time zones in Ubuntu and other distributions using GNOME desktop environment."
  url="https://itsfoss.com/add-multiple-time-zones-ubuntu"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/wordpress/2020/04/multiple-timezone-clocks.jpg"/>

If you have family members or colleagues in another country or if you live in a country with multiple time zones, keeping a track of the time difference becomes important. After all, you don’t want to disturb someone by calling at 4’o clock in the morning.

Some Linux users also keep a tab on the [<FontIcon icon="fa-brands fa-wiikipedia-w"/>UTC time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) because an overwhelming majority of servers use UTC.

Situations like these can be managed better if you have multiple clocks. You can set one clock to your local time and sync other clock(s) to other time zone(s). It makes keep an eye on the different times easier.

In this quick tutorial, I’ll show you how to add additional clocks in Ubuntu and other Linux distributions that use GNOME desktop environment.

[Subscribe to It's FOSS YouTube Channel (<FontIcon icon="fa-brands fa-youtube"/>`@itsfoss`)](https://youtube.com/@itsfoss)

---

## Adding multiple time zone clocks in Ubuntu (and other Linux using GNOME)

Please [**check which desktop environment you are using**](/itsfoss.com/find-desktop-environment.md). This tutorial is suitable for GNOME desktop only.

To add additional clocks, you can use a nifty little app unsurprisingly called [<FontIcon icon="fas fa-globe"/>GNOME Clocks](https://wiki.gnome.org/Apps/Clocks).

GNOME Clocks is a simple application that shows the time and date in multiple locations. You can also use it to set alarms or timers. Stopwatch feature is also included.

GNOME Clocks is available in the universe repository in Ubuntu. So please make sure to [**enable universe repository**](/itsfoss.com/ubuntu-repositories.md) first.

You can search for GNOME Clocks in Software Center and install it from there.

![Gnome Clocks in Ubuntu Software Center](https://itsfoss.com/content/images/wordpress/2020/04/gnome-clocks-ubuntu-software-center.jpg)

Alternatively, you can open a terminal and use the following command to install GNOME Clocks:

```sh
sudo apt install gnome-clocks
```

If you are using some other Linux distribution, please use your distribution’s software center or package manager to install this application.

Once you have installed it, search for it by pressing the super key (Windows key) and typing clocks:

![Gnome Clocks App in Ubuntu](https://itsfoss.com/content/images/wordpress/2020/04/gnome-clocks-app-search-ubuntu.jpg)

Start the application and you should see an interface that provides you a few options like adding world clock, setting alarms, use stopwatch and timer.

Click on the + sign in the top left corner it will give you an option to search for a geographical location. Search it, select it and add it.

![Adding additional clocks in Ubuntu](https://itsfoss.com/content/images/wordpress/2020/04/add-multiple-time-zones-gnome.jpg)

Once you have added the required time zone(s) via its geographical location, you can see that this new clock is now added in the message try. It also shows the time difference between your local time and other time zones.

![Multiple Clocks in Ubuntu](https://itsfoss.com/content/images/wordpress/2020/04/multiple-clocks-ubuntu.jpg)

You can use Super + M keys to quickly open the message tray. There are some more [**useful Ubuntu shortcuts**](/itsfoss.com/ubuntu-shortcuts.md) you may master and save your time.

If you want to remove the additional clocks, you can do that from the GNOME Clocks application interface:

![Remove Additional Clocks in Ubuntu](https://itsfoss.com/content/images/wordpress/2020/04/remove-additional-clocks-ubuntu.jpg)

You cannot delete your current time zone and set it to something else. There are other ways [**to change your current time zone in Linux**](/itsfoss.com/change-timezone-ubuntu.md).

I hope you liked this quick tip. Questions and suggestions are always welcome.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Add Multiple Time Zones in Ubuntu",
  "desc": "Follow the steps for adding additional clocks for multiple time zones in Ubuntu and other distributions using GNOME desktop environment.",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/add-multiple-time-zones-ubuntu.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
