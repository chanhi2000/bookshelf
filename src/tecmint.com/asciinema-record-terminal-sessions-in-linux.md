---
lang: en-US
title: "Asciinema – Record and Share Your Terminal Sessions in Linux"
description: "Article(s) > Asciinema – Record and Share Your Terminal Sessions in Linux"
icon: iconfont icon-asciinema
category:
  - Shell
  - Asciinema
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - asciinema
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Asciinema – Record and Share Your Terminal Sessions in Linux"
    - property: og:description
      content: "Asciinema – Record and Share Your Terminal Sessions in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/asciinema-record-terminal-sessions-in-linux.html
prev: /tool/asciinema/articles/README.md
date: 2025-09-06
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2013/12/Asciinema-Record-Linux-Terminal-Sessions.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Asciinema > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/asciinema/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Asciinema – Record and Share Your Terminal Sessions in Linux"
  desc="Asciinema is an open-source terminal recording tool that makes it super easy to share your command-line work with others."
  url="https://tecmint.com/asciinema-record-terminal-sessions-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2013/12/Asciinema-Record-Linux-Terminal-Sessions.webp"/>

**Asciinema** is an open-source terminal recording tool that makes it super easy to share your command-line work with others. Unlike traditional [**screen recorders**](/tecmint.com/best-linux-screen-recorders-for-desktop-screen-recording.md) that capture heavy video files, **Asciinema** records your terminal activity in a lightweight, text-based format, which means the recordings are tiny in size, perfectly reproducible, and can be shared or embedded it into your website or blog with just a small snippet of code.

::: info

Here’s a quick demo of Asciinema in action:

<SiteInfo
  name="The intro to asciinema"
  desc="Recorded by asciinema"
  url="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH/"
  logo="https://asciinema.org/images/favicon-2d62dafa447cf018340b7121007568e3.png?vsn=d"
  preview="https://asciinema.org/a/85R4jTtjKVRIYXTcKCNq0vzYH.png"/>

**Notable features:**

- Capture your terminal sessions and play them back exactly as they happened, including pauses, typos, and fixes.
- Share what you’re doing in real time, either through a local web server or the remote **asciinema.org** service.
- Recordings are text-based, not video, which means they’re tiny in size and can be compressed down to almost nothing (as low as 15% with [**`gzip`**](https://tecmint.com/gzip-command-in-linux.md) or [**`zstd`**](https://tecmint.com/zstd-fast-data-compression-algorithm-used-by-facebook.md)).
- Built-in integration with **asciinema.org** makes it simple to upload and share your recordings instantly with a single command.

:::

---

## Installing Asciinema in Linux

Installing **Asciinema** is quick and simple; in fact, it’s already available in the default repositories of [**most popular distributions**](/tecmint.com/top-most-popular-linux-distributions.md), so you don’t need to hunt for packages or download anything manually, just open your terminal and run the command that matches your distro:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install asciinema
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install asciinema
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/asciinema
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add asciinema
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S asciinema
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install asciinema
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install asciinema
```

:::

---

## Recording Your First Session

Once you’ve installed **Asciinema**, you can start recording in seconds, and the recorder will immediately begin capturing everything you do in the terminal, such as every command, every keystroke, and even your typos and corrections.

```sh
asciinema rec
```

When you’re finished, simply type:

```sh
exit
```

At this point, **Asciinema** will ask if you’d like to upload the session to asciinema.org. If you choose `yes`, it will instantly generate a shareable link that you can send to your teammates or embed in your blog.

![Record and Share Linux Terminal Sessions](https://tecmint.com/wp-content/uploads/2013/12/Record-and-Share-Linux-Terminal-Sessions.png)

Record and Share Linux Terminal Sessions

---

## Replaying a Recording in Linux

If you’ve saved your terminal session locally, you can replay it anytime with a single command:

```sh
asciinema play demo.cast
```

This will play back your recording exactly as it happened, including pauses, typos, corrections, and everything you typed. It’s like watching a live terminal session in real time, but from the comfort of your saved file.

This is especially useful for reviewing your work, sharing tutorials with colleagues, or debugging scripts step by step without having to rerun commands manually.

---

## Embedding Recordings in a Website

One of the coolest features of **Asciinema** is how easy it makes sharing your terminal demos on a website or blog. Once you’ve uploaded a recording to asciinema.org, you’ll get a small HTML `<script>` snippet, like this:

```html
<script src="https://asciinema.org/a/12345.js" id="asciicast-12345" async></script>
```

All you need to do is copy and paste the above script into your blog post or webpage, and your readers will see an interactive terminal session right in your content. They can play it, pause it, or even follow along with your commands.

---

## Conclusion

If you’re looking for a clean, efficient, and beginner-friendly way to record your Linux terminal, [<VPIcon icon="fas fa-globe"/>Asciinema](https://asciinema.org/) is exactly what you need. Unlike traditional screen recorders, it’s lightweight, fast, and text-based, so your recordings are tiny, easy to share, and fully reproducible.

**Asciinema** works smoothly across all major Linux distributions and is perfect for bloggers, educators, sysadmins, and anyone who wants to share terminal workflows with others.

So next time someone asks you, “**How did you do that in Linux?**”, don’t explain it in long paragraphs, just record it and share the link. Your readers, teammates, or students will thank you!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Asciinema – Record and Share Your Terminal Sessions in Linux",
  "desc": "Asciinema is an open-source terminal recording tool that makes it super easy to share your command-line work with others.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/asciinema-record-terminal-sessions-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
