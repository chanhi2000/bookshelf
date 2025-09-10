---
lang: en-US
title: "How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]"
description: "Article(s) > How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]"
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
      content: "Article(s) > How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]"
    - property: og:description
      content: "How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/itsfoss.com/change-timezone-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2020-01-19
isOriginal: false
author: 
  - name: Abhishek Prakash
    url: https://itsfoss.com/author/abhishek/
cover: https://itsfoss.com/content/images/2024/02/set-and-change-timezone-ubuntu.png
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
  name="How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]"
  desc="Curious on how to change timezone on Ubuntu? Let us tell you the two easiest methods here."
  url="https://itsfoss.com/change-timezone-ubuntu"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/2024/02/set-and-change-timezone-ubuntu.png"/>

[**When you install Ubuntu**](/itsfoss.com/install-ubuntu.md), it asks you to set a timezone. If you chose a wrong timezone or if you have moved to some other part of the world, you can easily change it later.

So, how can you change the timezone on Ubuntu?

---

## Here's How to change Timezone on Ubuntu and other Linux distributions

There are two ways to change the timezone on Ubuntu. You can use the graphical settings or use the `timedatectl` command in the terminal.

You may also change the /etc/timezone file directly, but I won’t advise that, unless you want to experiment (and know what you are doing).

I’ll show you both graphical and terminal methods in this tutorial:

- **Change timezone on Ubuntu via GUI (suitable for desktop users)**
- **Change timezone on Ubuntu via command line (works for both desktop and servers)**

---

## Change Ubuntu timezone via GUI

Press the super key (Windows key) and in the Activities Overview, search for Settings:

![Select Settings from Ubuntu Activities Overview](https://itsfoss.com/content/images/2024/01/select-settings-from-overview.png)

Open Settings

Scroll down a little and look for “*Date and Time*” in the left sidebar. Here, you should turn off the Automatic Time Zone option (if it is enabled) and then click on the Time Zone:

![On the “Date and Time” tab on Ubuntu Settings, turn off the “Automatic Timezone” button. Now, click on the Timezone tab](https://itsfoss.com/content/images/2024/01/turn-off-automatic-time-zone-2.png)

Turn Off Automatic Time Zone

When you click the Time Zone, it will open an interactive map, and you can click on the geographical location of your choice or type the city name. Once you have selected the correct timezone, close the window.

![Select a timezone by clicking on the interactive map.](https://itsfoss.com/content/images/2024/01/select-a-timezne-from-map.png)

Select Timezone from Map

::: note

Occasionally, your timezone gets messed up with a dual-boot system. You need to toggle off/on the automatic time zone, and that should fix the time.

:::

You don’t have to do anything apart from closing this map after selecting the new timezone. No need to logout or [**shutdown Ubuntu**](/itsfoss.com/schedule-shutdown-ubuntu.md).

![The timezone is changed to the newly set zone.](https://itsfoss.com/content/images/2024/01/selected-timezone-is-shown-in-settings.png)

---

## Change Ubuntu timezone via terminal

[<VPIcon icon="fa-brands fa-ubuntu"/>Ubuntu](https://ubuntu.com/) or [**any other distributions using `systemd`**](/itsfoss.com/check-if-systemd.md) can use the timedatectl command to set timezone in Linux terminal.

You can check the current date and timezone setting using timedatectl command:

```sh
timedatectl
```

![Run the “timedatectl” command without any option to display your timezone details.](https://itsfoss.com/content/images/2024/01/run-timedatectl-command-in-ubuntu.svg)

As you can see, in the output above, my system uses Asia/Kolkata. It also tells me that it is 5:30 hours ahead of GMT.

To set a timezone on Linux, you need to know the exact timezone. You must use the correct format of the timezone (which is Continent/City).

To get the timezone list, use the `list-timezones` option of `timedatectl` command:

```sh
timedatectl list-timezones
```

It will show you a list of the available time zones.

![Run “timedatectl” command with “list-timezones” option to get a list of timezones available.](https://itsfoss.com/content/images/2024/01/list-timezones-in-terminal-ubuntu.svg)

List Timezones in terminal

You can use the up and down arrow or *PgUp* and *PgDown* keys to move between the pages.

You may also use the grep command to search for your timezone. For example, if you are looking for time zones in Europe, you may use:

```sh
timedatectl list-timezones | grep -i europe
```

![Get Timezones of a particular area by using the grep command along with timedatectl.](https://itsfoss.com/content/images/2024/01/grep-timezones-in-terminal-ubuntu.svg)

Let’s say you want to set the timezone to Paris. The timezone value to be used here is Europe/Paris:

```sh
timedatectl set-timezone Europe/Paris
```

It won’t show any success message, but the timezone is changed instantly. You don’t need to restart or log out.

::: note

You don’t need to become a root user and use sudo with the command, your account still needs to have admin rights to change the timezone.

:::

You can verify the changed time and timezone by using the [<VPIcon icon="fas fa-globe"/>date command](https://linuxhandbook.com/date-command/):

![Run the “date” command to check the time and timezone.](https://itsfoss.com/content/images/2024/01/date-command-to-know-time.svg)

---

## Wrapping Up

I hope this quick tutorial helped you to change timezone on Ubuntu and other Linux distributions.

Oh, wait! Do you want to [**add multiple time zones on Ubuntu**](/itsfoss.com/add-multiple-time-zones-ubuntu.md)? You might want to check our article on that:

```component VPCard
{
  "title": "How to Add Multiple Time Zones in Ubuntu",
  "desc": "Follow the steps for adding additional clocks for multiple time zones in Ubuntu and other distributions using GNOME desktop environment.",
  "link": "/itsfoss.com/add-multiple-time-zones-ubuntu.md",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```

You can also explore similar [<VPIcon icon="fas fa-globe"/>Ubuntu tips](https://itsfoss.com/tag/ubuntu/) on our site:

<SiteInfo
  name="Ubuntu Tips, Tweaks and Tutorials Collection"
  desc="Love Ubuntu? We do, too. And we cover it extensively. Here, you'll find lots of tips, tweaks and tutorials on Ubuntu, the most popular distro out there."
  url="https://itsfoss.com/tag/ubuntu/"
  logo="https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png"
  preview="https://itsfoss.com/content/images/2023/06/ubuntu.png"/>

*💬 Do you have any suggestions on what other types of Ubuntu tips would you like us to cover?*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set or Change Timezone in Ubuntu Linux [Beginner's Tip]",
  "desc": "Curious on how to change timezone on Ubuntu? Let us tell you the two easiest methods here.",
  "link": "https://chanhi2000.github.io/bookshelf/itsfoss.com/change-timezone-ubuntu.html",
  "logo": "https://itsfoss.com/content/images/size/w256h256/2022/12/android-chrome-192x192.png",
  "background": "rgba(53,121,127,0.2)"
}
```
