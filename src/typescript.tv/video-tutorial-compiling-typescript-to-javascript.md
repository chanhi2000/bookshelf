---
lang: en-US
title: "Video Tutorial: Compiling TypeScript to JavaScript"
description: "Article(s) > Video Tutorial: Compiling TypeScript to JavaScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Video Tutorial: Compiling TypeScript to JavaScript"
    - property: og:description
      content: "Video Tutorial: Compiling TypeScript to JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/video-tutorial-compiling-typescript-to-javascript.html
prev: /programming/ts/articles/README.md
date: 2023-05-08
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Video Tutorial: Compiling TypeScript to JavaScript"
  desc="This TypeScript tutorial explores JavaScript engines like Google's V8 and Mozilla's SpiderMonkey. It explains how to configure the TypeScript compiler, write proper TypeScript code, and use Microsoft's IntelliSense feature. It also covers TypeScript's watch mode and warns against installing TypeScript globally. Troubleshooting tips are provided, along with a link to the source code on GitHub."
  url="https://typescript.tv/hands-on/video-tutorial-compiling-typescript-to-javascript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This TypeScript tutorial explores JavaScript engines like Google's V8 and Mozilla's SpiderMonkey. It explains how to configure the TypeScript compiler, write proper TypeScript code, and use Microsoft's IntelliSense feature. It also covers TypeScript's watch mode and warns against installing TypeScript globally. Troubleshooting tips are provided, along with a link to the source code on GitHub.

In this TypeScript tutorial we explore the significance of platform considerations when building a TypeScript application. We will discuss various JavaScript engines, configure the TypeScript compiler, enable strict type checking, and implement best practices for our development workflow using Visual Studio Code. We also cover TypeScript's watch mode and how to write npm scripts. Lastly, we dive into potential issues that may arise when using TypeScript globally and how to define your VS Code's TypeScript version.

::: info Video Tutorial

<VidStack src="youtube/O6JNTocH0y0" />

:::

---

## Excerpt

We discuss the various JavaScript engines, such as [<VPIcon icon="fas fa-globe"/>Google's V8](https://v8.dev/), [<VPIcon icon="fas fa-globe"/>Mozilla's SpiderMonkey](https://spidermonkey.dev/), [ChakraCore (<VPIcon icon="iconfont icon-github"/>`chakra-core/ChakraCore`)](https://github.com/chakra-core/ChakraCore) (previously maintained by Microsoft), and [<VPIcon icon="fa-brands fa-apple"/>Apple's JavaScriptCore](https://developer.apple.com/documentation/javascriptcore), that implement the [<VPIcon icon="fas fa-globe"/>ECMA-262 language specification](https://ecma-international.org/publications-and-standards/standards/ecma-262/). We also highlight that additional functionalities beyond the standard may be provided by different platforms.

To ensure compatibility with a specific target, we need to configure the TypeScript compiler accordingly. We use the `npx tsc --init` command to generate a configuration file, and we examine the options available in the `tsconfig.json` file.

We discuss the importance of writing proper TypeScript code to avoid warnings and errors, and how [<VPIcon icon="iconfont icon-vscode"/>Microsoft's IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) feature can help in code development.

We cover the `--watch` option to streamline development and the importance of executing scripts from the "node_modules" directory. We also warn against installing TypeScript globally to avoid potential issues that may arise with version compatibility.

Finally, we stress the importance of understanding these fundamentals for troubleshooting potential issues in the future, and we provide a link to the source code on our GitHub repository.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Video Tutorial: Compiling TypeScript to JavaScript",
  "desc": "This TypeScript tutorial explores JavaScript engines like Google's V8 and Mozilla's SpiderMonkey. It explains how to configure the TypeScript compiler, write proper TypeScript code, and use Microsoft's IntelliSense feature. It also covers TypeScript's watch mode and warns against installing TypeScript globally. Troubleshooting tips are provided, along with a link to the source code on GitHub.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/video-tutorial-compiling-typescript-to-javascript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
