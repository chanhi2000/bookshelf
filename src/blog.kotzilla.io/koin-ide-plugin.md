---
lang: en-US
title: "From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"
description: "Article(s) > From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - blog.kotzilla.io
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"
    - property: og:description
      content: "From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-ide-plugin.html
prev: /programming/java-android/articles/README.md
date: 2024-11-19
isOriginal: false
author: The Kotzilla Team
cover: https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin"
  desc="From Compile Safety to Configuration Safety: Discover the upcoming Koin IDE Plugin that analyzes Koin configurations in real-time as you write your code."
  url="https://blog.kotzilla.io/koin-ide-plugin"
  logo="https://blog.kotzilla.io/hubfs/favicon.png"
  preview="https://blog.kotzilla.io/hubfs/Screenshot%202024-11-18%20at%2016.56.15.png"/>

Our Koin community has been clear: compile safety is crucial. This year, over 100 Koin users highlighted the need for more robust dependency management.

We're responding to you, with an even more targeted solution- Configuration Safety.

Configuration safety means catching dependency issues before compilation, directly in your integrated development environment (IDE)

---

## Compile Safety vs. Configuration Safety

Unlike traditional compile safety, which happens during the compilation process, our approach analyzes Koin configurations in real-time as you write your code.

The Koin IDE Plugin will perform static code analysis, identifying issues like circular references or missing declarations early—before they become runtime errors. This proactive approach will streamline your workflow by preventing configuration problems at their source, rather than waiting for them to surface during compilation or build-time.

By integrating immediately into your development workflow, we're not just checking code—we're preventing configuration errors at their source.

This approach offers additional value compared to other DI frameworks like Dagger2/Hilt, by eliminating the need to wait for compilation or build time.

---

## 📈 The Technical Advantage 

✅ Immediate configuration analysis

✅ Errors detected in real-time, before compilation

✅ Instant visual feedback in your IDE

✅ Zero runtime surprises

---

## Background

Dependency injection is a core part of modern Android development, helping us build more modular, testable, and maintainable applications. [<VPIcon icon="fas fa-globe"/>Koin](https://insert-koin.io/) is a popular choice for DI in the Kotlin ecosystem, providing a lightweight and flexible solution.

One of the key advantages of Koin is its declarative approach to dependency configuration. Instead of relying on complex annotations or XML configurations, Koin allows you to define your dependencies using a simple and concise domain-specific language (DSL). This promotes clean, readable code and reduces boilerplate, making it easier to manage and maintain your application's dependency graph.

---

## Empowering Kotlin Developers with Compile Safety

While Koin's declarative DSL is a powerful feature, the framework also provides an annotation-based API that allows you to use the [<VPIcon icon="fas fa-globe"/>Kotlin Compiler](https://insert-koin.io/docs/reference/koin-annotations/start#ksp-options) to perform compile-time checks on your Koin configurations. This is achieved through the Koin Compiler Plugin and KSP, which provide options to:

### 1. Check Koin Configuration at Compile Time

Add the `KOIN_CONFIG_CHECK` option to your Gradle setup, and the compiler will verify that all dependencies used in your configuration are declared and that all modules are accessible.  

![](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.06.45.png?width=669&height=152&name=Screenshot%202024-11-18%20at%2016.06.45.png)

### 2. Bypass Compile Safety with `@Provided`

If you have certain components that are provided externally (ie, a module declared with the DSL), you can use the `@Provided` annotation to exclude them from the compile-time checks.  

![](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.07.29.png?width=677&height=132&name=Screenshot%202024-11-18%20at%2016.07.29.png)

### 3. Use the `verify()` extension function

on your Koin module to verify your Koin configuration. This checks that all constructor classes have a corresponding Koin component defined. If any issues are found, `verify()` will throw a `MissingKoinDefinitionException`:  

![](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-18%20at%2016.10.06.png?width=648&height=176&name=Screenshot%202024-11-18%20at%2016.10.06.png)  

These compile safety features have been available to Koin users since the release of [<VPIcon icon="fas fa-globe"/>Koin Annotations 1.3.0](https://blog.kotzilla.io/koin-annotations-1.3.1?hsLang=en), but they do require manual setup and configuration.

Now, having listened to your feedback, we want to make this level of type-safety accessible to all Kotlin developers using Koin for DI, directly within the IDE.

---

## Enter the Koin IDE Plugin

We're excited to announce the upcoming release of the Koin IDE Plugin. This new tool will integrate directly with [<VPIcon icon="fa-brands fa-android"/>Android Studio](https://developer.android.com/studio) and [<VPIcon icon="iconfont icon-jetbrains"/>IntelliJ IDEA](https://jetbrains.com/idea/download/?section=mac), providing enhanced visibility and navigation of Koin configurations, as well as the powerful configuration checks.

The Koin IDE Plugin will be part of the broader [<VPIcon icon="fas fa-globe"/>Kotzilla Platform](https://kotzilla.io/), which also includes the [<VPIcon icon="fas fa-globe"/>Kotzilla SDK](https://doc.cloud-inject.io/docs/reference/mobile-sdk/setup_android) and the Kotzilla Console.

### Initial Feature Set

In our initial release (Q1 2025), the Koin IDE Plugin will focus on two key areas:

1. **Configuration Tree View**: You'll be able to visualize your entire Koin setup, including modules, components, and dependencies, all within the IDE, making it easier to understand relationships between different parts of your configuration. This view will also include an initial validation check to ensure no configurations are missing, representing the first step toward configuration safety.
2. **Contextual Navigation**: Moving between a component and its configuration will be seamless, with the plugin providing direct links. No more manually searching through your codebase to find where a particular dependency is declared.

These features aim to address common issues faced by Koin users, like struggling to grasp the big picture of their DI setup or having to switch between different files to trace configuration details

### The Koin IDE Plugin's Superpower: Configuration Safety

So, as we said at the start, the ultimate goal is to bring the power of Koin's configuration safety checks directly into the IDE experience. We'll achieve this by integrating our tool seamlessly, where you can easily activate the desired level of safety checks without any extra effort. The plugin handles everything behind the scenes, ensuring a frictionless developer workflow.

It will help you catch problems early in the development cycle, as we’ll analyse your code directly saving time and frustration.

- **Real-time Safety Checks**: The plugin will proactively detect Koin configuration issues directly in the IDE.
- **CI/CD Integration**: You can choose when to execute compile safety tasks within the CI/CD pipeline, thanks to a dedicated Gradle task that launches a compilation safety check.

This functionality is targeted to be available in the second release of the Koin IDE Plugin, scheduled for Q2 2025, making this level of type-safety accessible to all Koin developers, directly within their everyday IDE workflows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Compile Safety to Configuration Safety: Let's Build the Koin IDE Plugin",
  "desc": "From Compile Safety to Configuration Safety: Discover the upcoming Koin IDE Plugin that analyzes Koin configurations in real-time as you write your code.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/koin-ide-plugin.html",
  "logo": "https://blog.kotzilla.io/hubfs/favicon.png",
  "background": "rgba(238,181,80,0.2)"
}
```
