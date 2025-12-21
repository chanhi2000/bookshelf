---
lang: en-US
title: "Mobile App Development with Dart and Flutter"
description: "Article(s) > Mobile App Development with Dart and Flutter"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Mobile App Development with Dart and Flutter"
    - property: og:description
      content: "Mobile App Development with Dart and Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/mobile-app-development-with-dart-and-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-10-30
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761786494585/5f335412-1621-4d5c-9861-29390381797c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Mobile App Development with Dart and Flutter"
  desc="Mobile app development lets you build applications that run on multiple platforms. Flutter is Google's UI toolkit for building applications for mobile, web, and desktop from a single codebase. Flutter apps are written in Dart, a statically typed, obj..."
  url="https://freecodecamp.org/news/mobile-app-development-with-dart-and-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761786494585/5f335412-1621-4d5c-9861-29390381797c.png"/>

Mobile app development lets you build applications that run on multiple platforms. Flutter is Google's UI toolkit for building applications for mobile, web, and desktop from a single codebase. Flutter apps are written in Dart, a statically typed, object-oriented language.

Modern mobile development requires understanding widgets, state management, navigation, and data storage. The ecosystem includes thousands of free packages that give you access to device sensors, cloud services, and more.

This tutorial covers Dart fundamentals, Flutter basics, and some data storage options. There are 20 programs that walk you through building mobile apps from scratch. It’s built around a group of annotated *code playbacks*.

Each playback shows how I built a program step-by-step. They include a built-in AI tutor if you have any questions that I didn't cover. For a quick demo of how code playbacks work, [<VPIcon icon="fa-brands fa-youtube"/>watch this short video](https://youtu.be/uYbHqCNjVDM):

<VidStack src="youtube/uYbHqCNjVDM" />

::: info You can access the free tutorial here

```component VPCard
{
  "title": "PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

::: note Prerequisites

This is not a general introduction to programming, so you’ll need some basic programming knowledge to follow along. If you understand variables, loops, functions, and classes in any language, you should be fine. If you need an introduction to programming, check out my other tutorials in [<VPIcon icon="fas fa-globe"/>C++](https://playbackpress.com/books/cppbook) or [<VPIcon icon="fas fa-globe"/>Python](https://playbackpress.com/books/pybook) on [<VPIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books).

:::

---

## Table of Contents

### 1. Dart

```component VPCard
{
  "title": "1.1 Hello World!!! and Flutter/Dart Install Instructions - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/1",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.2 Simple Types in Dart - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/2",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.3 Lists (Array Based Containers) - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.4 Maps and Sets - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/4",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.5 Altering the Flow of Control - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/5",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.6 Closures - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/6",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.7 Asynchronous Code in Dart - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/7",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "1.8 Classes in Dart - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/1/8",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### 2. Flutter

```component VPCard
{
  "title": "2.1 Flutter Hello World - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/1",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.2 flutter create demo_app - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/2",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.3 ListViews - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.4 Laying Out Widgets - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/4",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.5 Navigation in Flutter - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/5",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.6 Forms - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/6",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "2.7 Using Packages in Flutter - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/2/7",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### 3. Storing an App's Data

```component VPCard
{
  "title": "3.1 Storing App Data in a File - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/3/1",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "3.2 Storing App Data in a SQLite Database - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/3/2",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "3.3 Storing App Data in a Server - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/3/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "3.4 Storing App Data in the Firebase Cloud Firestore - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/3/4",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

```component VPCard
{
  "title": "3.5 Firebase Authentication - PlaybackPress",
  "desc": "Mobile App Development with Dart and Flutter by Mark Mahoney",
  "link": "https://playbackpress.com/books/flutterbook/chapter/3/5",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

---

## Get Started

Start with the Dart chapter if you're new to the language. If you have JavaScript, Java, or C# experience, it should feel familiar. Then, move on to the Flutter playbacks. Work through the playbacks at your own pace.

Questions or feedback? Contact me at [<VPIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mobile App Development with Dart and Flutter",
  "desc": "Mobile app development lets you build applications that run on multiple platforms. Flutter is Google's UI toolkit for building applications for mobile, web, and desktop from a single codebase. Flutter apps are written in Dart, a statically typed, obj...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/mobile-app-development-with-dart-and-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
