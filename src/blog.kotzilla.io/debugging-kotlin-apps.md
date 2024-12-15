---
lang: en-US
title: "Debugging Kotlin Apps with the Kotzilla Platform"
description: "Article(s) > Debugging Kotlin Apps with the Kotzilla Platform"
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
      content: "Article(s) > Debugging Kotlin Apps with the Kotzilla Platform"
    - property: og:description
      content: "Debugging Kotlin Apps with the Kotzilla Platform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/debugging-kotlin-apps.html
prev: /programming/java-android/articles/README.md
date: 2024-12-04
isOriginal: false
author: Miguel Valdes Faura
cover: https://blog.kotzilla.io/hubfs/Screenshot%202024-12-04%20at%2011.14.24.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Debugging Kotlin Apps with the Kotzilla Platform"
  desc="Learn about debugging with the Kotzilla Platform, designed for Kotlin developers using Koin. Our platform provides immediate insights into thread performance & complex dependencies."
  url="https://blog.kotzilla.io/debugging-kotlin-apps"
  logo="https://blog.kotzilla.io/hubfs/favicon.png"
  preview="https://blog.kotzilla.io/hubfs/Screenshot%202024-12-04%20at%2011.14.24.png"/>

As the [<FontIcon icon="iconfont icon-kotlin"/>Kotlin](https://kotlinlang.org/) language has grown, the projects built with it have become increasingly complex. And with that complexity comes new debugging headaches. Kotlin devs have to juggle a bunch of different tools, each with their own limitations, just to try and get to the bottom of performance issues, memory leaks, and architectural problems.

---

## Debugging in mobile app development

Debugging is fundamentally a problem-solving process with these stages:

1. **Problem identification:** recognizing that an issue exists, which can result from user feedback, automated testing, or dedicated tools.
2. **Root cause analysis:** you then must distinguish between symptoms and underlying causes, employing various strategies such as hypotheses testing, trace analysis, and state monitoring.
3. **Solution implementation:** After pinpointing the root cause, you'll typically implement a fix, often requiring modifications to the codebase or resource allocation strategies.
4. **Verification and validation:** Finally, you test your solution in the context of the application to confirm that the issue has been resolved and that no new problems have been introduce.

---

## Debugging in Development

The [<FontIcon icon="fa-brands fa-android"/>Android Studio debugger](https://developer.android.com/studio/debug) is built-in, but it can be really intrusive, especially when you're dealing with highly optimized, multithreaded code.

In Android Studio, debugging typically begins with `println` statements to gain initial insights into issues. After this, you'd transition to Android Studio’s built-in debugger for a more interactive and effective troubleshooting process.

### The AndroidStudio Debugger lets you

![Set breakpoints to pause code execution at specific points, allowing inspection of variables, the call stack, and overall app state.](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-19%20at%2017.08.43.png?width=820&height=473&name=Screenshot%202024-11-19%20at%2017.08.43.png)  

- Navigate through your code using step over, step into and step out controls to execute line by line, enter functions, or return to the caller function.
- Inspect the state of variables during runtime when execution is paused, including complex objects and data structures.
- View the call stack to trace the sequence of function calls leading to the current execution point.
- Attach the debugger to an already running app to debug issues as they occur without restarting the application.

### Limitations of AndroidStudio debugger include

- **Performance overhead**: Instrumenting code for debugging can introduce significant overhead, potentially masking real-world performance issues. This is especially problematic in performance-sensitive applications or when debugging production apps.
- **Inconsistent breakpoint functionality**: Breakpoints can be unreliable in highly optimized code, with their behavior varying depending on compilation settings. This makes it difficult to capture the execution flow accurately.

---

## Debugging in production

Once an application is deployed, debugging shifts focus from development to observing application behavior in real-world scenarios. Observability platforms provide insights into performance and help identify issues that may not be apparent during development. While they are great for monitoring production and analyzing crashes, they also  often fall short when it comes to the nuanced debugging of component lifecycles and thread interactions.

### With observability tools you get

- **Crash reporting**: Observability tools  almost always  include crash reporting features that provide detailed information about application crashes, including stack traces helping pinpoint where in the code the app crashed.

- **Performance monitoring**: They track different performance metrics, such as app startup time, UI response times, and memory usage, allowing developers to identify slow rendering times or long network calls
- **Error tracking and logging**: With custom logging and error tracking, you can capture and monitor errors that don’t cause the app to crash but still negatively impact user experience (e.g., failed API requests, timeouts). 
- **Distributed tracing**: Distributed tracing allows you to follow requests through different services (e.g., between the mobile app and backend APIs), which is important for debugging interactions between the client and server.
- **Real User Monitoring (RUM)**: They often provide features capturing user interactions with the mobile app, allowing you to identify specific slowdowns or crashes experienced by users on various devices or operating systems.

### Limitations of observability tools include:

- **Complex thread management**: Observability tools often struggle to visualize and manage multiple threads simultaneously, making it hard to analyze their interactions.
- **Component lifecycle visibility limitations**: These tools often lack the depth needed to effectively trace component lifecycle states and interactions, leading to undetected issues such as memory leaks or performance bottlenecks during lifecycle transitions.
- **Manual tracing and instrumentation:** To diagnose delays and issues in components like ViewModels or dependencies, custom traces are often required, adding manual overhead to the debugging process.

---

## Enter the Kotzilla Platform

[<FontIcon icon="fas fa-globe"/>The Kotzilla Platform](https://kotzilla.io/) is a debugging tool built on top of the [<FontIcon icon="fas fa-globe"/>Koin dependency injection](https://insert-koin.io/) framework, which a lot of Kotlin devs already use. So it integrates seamlessly with your existing architecture, automatically collecting all the data it needs without any extra instrumentation or overhead.

This allows the Kotzilla Platform to give you detailed, contextual insights into what's going on under the hood - things like thread performance problems, memory leaks, and structural issues caused by overly complex dependency graphs or misused component lifecycles. It helps you quickly trace those issues back to the root cause, even in live production.

---

## What Does the Kotzilla Platform Do?

The Kotzilla Platform is a pretty comprehensive debugging tool designed specifically for Kotlin developers. It offers a unified approach that bridges the gap between development and production environments, providing insights and tools to tackle the unique issues of Kotlin app development.

 By using Koin's container, the [<FontIcon icon="fas fa-globe"/>Kotzilla SDK](https://doc.kotzilla.io/docs/seetings/overview) automatically collects essential data about your application's behavior without any intrusive instrumentation or performance overhead. This allows the platform to provide you with detailed, contextual insights into the inner workings of your Kotlin app.

---

## What are the Kotzilla Platform's benefits

Ok, let's talk turkey.

As discussed, one of the standout features of the Kotzilla Platform is its ability to identify and resolve issues in your Kotlin app's before they affect your users.

Want to see it in action? Let’s walk through a real-world example based on the [NowInAndroid app for Koin (<FontIcon icon="iconfont icon-github"/>`kotzilla-io/nowinandroid`)](https://github.com/kotzilla-io/nowinandroid). The following sections assume that the first two setup steps of this [<FontIcon icon="fas fa-globe"/>Getting started tutorial](https://doc.kotzilla.io/docs/getstartedNIA/overview) have already been completed.

---

## Detecting a screen freeze in the app

When the main UI thread is blocked by time-intensive operations, the app can freeze or slow down, often leading to ANR (App Not Responding) events. Common causes include heavy computations or synchronous operations running on the main thread. [

```component VPCard
{
  "title": "Detecting a screen freeze and ANR issue | Kotzilla",
  "desc": "This tutorial guides you through identifying main thread (UI thread) delays in your apps using the Kotzilla Platform.",
  "link": "https://doc.kotzilla.io/docs/detectIssues/screenFreezeIssue/",
  "logo": "https://doc.kotzilla.io/img/kotzilla%20moodboard_Kotzilla_format-site-web.png",
  "background": "rgba(238,181,79,0.2)"
}
```

Screen freezes severely degrade user experience and can lead to negative app reviews, higher uninstall rates, and reduced app store rankings.

### To demonstrate how the platform works, we'll

1. Simulate a 1-second delay in the MainActivityViewModel of the NowInAndroid app. This delay simulates a blocking operation in the ViewModel running on the main thread, which will degrade app performance.

```kotlin title="MainActivityViewModel.kt"
class MainActivityViewModel(
    userDataRepository: UserDataRepository,
): ViewModel() { 
    init { 
        // Introduce a 1-second delay to simulate a main-thread block 
        Thread.sleep(1000) 
    }
}
```

![Track user interactions to observe the impact on app performance by running the NowInAndroid app using AndroidStudio and interacting with it to create a user session.](https://blog.kotzilla.io/hs-fs/hubfs/runapp-be04c98e8e34d5842d43d49e6adcd39b.webp?width=1920&height=1052&name=runapp-be04c98e8e34d5842d43d49e6adcd39b.webp)

### Observing the issue on the Kotzilla Platform

Log in to the [<FontIcon icon="fas fa-globe"/>Kotzilla Platform](https://console.kotzilla.io/) and navigate to your app’s **Dashboard**. From there, open the **Sessions View** to review user sessions.

![**Max Event Duration**: Notice the 1-second delay in this column, showing how long the main thread was blocked.](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-11-19%20at%2016.27.40.png?width=958&height=241&name=Screenshot%202024-11-19%20at%2016.27.40.png)

![By exploring the **Timeline** view, you can see how the delay creates a visible pause between the "started" and "resumed" states of `MainActivity`. This gap reveals a period where the app appears unresponsive to the user. In the **Threads** view, notice the delay in the initialization of the `MainActivityViewModel` component.](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-12-04%20at%2011.43.48.png?width=923&height=517&name=Screenshot%202024-12-04%20at%2011.43.48.png)

![A click on this resolution shows you the detailed sequence of events in the timeline in which we can also see the impact of this delay during the loading of the `MainActivityViewModel`](https://blog.kotzilla.io/hs-fs/hubfs/Screenshot%202024-12-04%20at%2011.45.43.png?width=934&height=407&name=Screenshot%202024-12-04%20at%2011.45.43.png)

You can try the Kotzilla Platform [<FontIcon icon="fas fa-globe"/>here for free.](https://kotzilla.io/) We'd love to hear what you think once you have. Maybe what other features you'd like to see?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Debugging Kotlin Apps with the Kotzilla Platform",
  "desc": "Learn about debugging with the Kotzilla Platform, designed for Kotlin developers using Koin. Our platform provides immediate insights into thread performance & complex dependencies.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.kotzilla.io/debugging-kotlin-apps.html",
  "logo": "https://blog.kotzilla.io/hubfs/favicon.png",
  "background": "rgba(238,181,80,0.2)"
}
```
