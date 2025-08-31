---
lang: ko-KR
title: "How to load assets from Xcode asset catalogs"
description: "Article(s) > How to load assets from Xcode asset catalogs"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - swift-5.10
  - ios
  - ios-7.0
  - xcode
  - appstore
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to load assets from Xcode asset catalogs"
    - property: og:description
      content: "How to load assets from Xcode asset catalogs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/example-code/xcode/how-to-load-assets-from-xcode-asset-catalogs.html
date: 2019-03-28
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Xcode - free Swift example code",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/example-code/xcode/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "How to load assets from Xcode asset catalogs | Xcode - free Swift example code",
  "desc": "How to load assets from Xcode asset catalogs",
  "link": "https://hackingwithswift.com/example-code/xcode/how-to-load-assets-from-xcode-asset-catalogs",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

> Available from iOS 7.0

<!-- TODO: 작성 -->

<!-- 
Xcode asset catalogs are a smart and efficient way to bring together your artwork in a single place. But they are also optimized for performance: when your app is built, your assets converted to an optimized binary format for faster loading, so they are recommended for all kinds of apps unless you have a specific reason to avoid them. (Note: SpriteKit games should texture atlases if possible.

If you don't already have an asset catalog in your project, you can create one by right-click on your project and choosing New File. From "iOS" choose "Resource" then Asset Catalog, then click Next and name your catalog. You can now select your new asset catalog in Xcode, and drag pictures directly into it.

Images stored inside asset catalog all retain their original filename, minus the path extension part. For example, "taylor-swift.png" will just appear as "taylor-swift" inside your asset catalog, and that's how you should refer to it while loading too.

Asset catalogs automatically keep track of Retina and Retina HD images, but it's recommended that you name your images smartly to help make the process more smooth: taylor-swift.png, taylor-swift@2x.png and taylor-swift@3x.png are the best way to name your files for standard, Retina and Retina HD resolutions respectively.

-->

::: details Similar solutions…

<!--
/quick-start/swiftui/how-to-load-custom-colors-from-an-asset-catalog">How to load custom colors from an asset catalog 
/example-code/xcode/how-to-use-vector-images-in-your-asset-catalog">How to use vector images in your asset catalog 
/example-code/uikit/how-to-load-a-html-string-into-a-wkwebview-or-uiwebview-loadhtmlstring">How to load a HTML string into a WKWebView or UIWebView: loadHTMLString() 
/quick-start/swiftui/how-to-lazy-load-views-using-lazyvstack-and-lazyhstack">How to lazy load views using LazyVStack and LazyHStack 
/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview">How to load HTTP content in WKWebView and UIWebView</a>
-->

:::

