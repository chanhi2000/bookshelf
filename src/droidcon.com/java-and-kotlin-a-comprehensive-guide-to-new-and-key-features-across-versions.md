---
lang: en-US
title: "Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
description: "Article(s) > Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
    - property: og:description
      content: "Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/java-and-kotlin-a-comprehensive-guide-to-new-and-key-features-across-versions.html
prev: /programming/java/articles/README.md
date: 2024-11-06
isOriginal: false
author: Dobri Kostadinov
cover: https://droidcon.com/wp-content/uploads/2024/11/1_yA3E5J_8MJOqw7Ng2ZCBOQ-600x600.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
  desc="In the previous article, I explored which version of Java and Kotlin you can or cannot use depending on your AGP, Android Studio etc.. Lets continue that journey by specifying which features you have in each version of Java and Kotlin. It never hurts to refresh our memory from time to time right?"
  url="https://droidcon.com/java-and-kotlin-a-comprehensive-guide-to-new-and-key-features-across-versions"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_yA3E5J_8MJOqw7Ng2ZCBOQ-600x600.webp"/>

![This image was generated with the assistance of AI](https://droidcon.com/wp-content/uploads/2024/11/1_yA3E5J_8MJOqw7Ng2ZCBOQ-600x600.webp)

---

## Introduction

[In the previous article (<FontIcon icon="fa-brands fa-medium"/>`kotlin-academy`)](https://medium.com/kotlin-academy/java-and-kotlin-versions-in-android-when-to-upgrade-and-when-to-avoid-cf47edbbac5b), I explored which version of Java and Kotlin you can or cannot use depending on your AGP, Android Studio etc.. Lets continue that journey by specifying which features you have in each version of Java and Kotlin. It never hurts to refresh our memory from time to time right?

Java and Kotlin are the two core languages for Android development. While Java has been around for decades, Kotlin’s rise as a modern alternative has made it an official language for Android. Keeping up with the latest language features is crucial for writing optimized, clean, and maintainable code. This guide outlines the most important features introduced in each version of Java and Kotlin, with a focus on Android development.

---

## Java Features by Version

### Java 8 (2014)

Java 8 is still the most widely used version in Android development due to its long-lasting support. Key features include:

::: tabs

@tab:active Lambda Expressions

Simplifies the syntax for anonymous classes.

```java
List<String> names = Arrays.asList("John", "Jane", "Doe");
names.forEach(name -> System.out.println(name));
```

@tab Streams API

Used for functional-style operations on collections.

```java
List<String> names = Arrays.asList("John", "Jane", "Doe");
 names.stream().filter(name -> name.startsWith("J"))
 .forEach(System.out::println);
```

@tab Default Methods

Allows interfaces to have default method implementations.

```java
interface Walkable {
    default void walk() {
        System.out.println("Walking...");
    }
}
```

:::

### Java 9 (2017)

#### Module System (Project Jigsaw)

Organizes large codebases into modules for better encapsulation.

#### JShell (REPL)

Java introduced a Read-Eval-Print Loop (REPL) tool for testing code snippets interactively.

### Java 10 (2018)

#### Local-Variable Type Inference (`var`)

Allows you to declare variables without specifying their types explicitly.

```java
var list = List.of("Apple", "Banana", "Orange");
```

### Java 11 (2018 — LTS)

#### HTTP Client API

Introduces a standard HTTP client to replace `HttpURLConnection`.

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com"))
    .build();
```

### Java 14 (2020)

#### Switch Expressions (Preview)

Improves the switch statement with a new concise syntax.

```java
String result = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> "Weekend";
    case TUESDAY -> "Weekday";
    default -> "Unknown";
};
```

### Java 17 (2021 — LTS)

#### Sealed Classes

Restricts which other classes can extend a class, improving security and code readability.

```java
public sealed class Shape permits Circle, Rectangle {
// Code…
}
```

---

## Kotlin Features by Version

### Kotlin 1.0 (2016)

::: tabs

@tab:active Null Safety

Prevents null pointer exceptions.

```kotlin
val name: String? = null
println(name?.length)
```

@tab Extension Functions

Allows you to add functions to classes without modifying their source code.

```kotlin
fun String.addExclamation(): String = this + "!"
println("Hello".addExclamation())
```

:::

### Kotlin 1.1 (2017)

#### Coroutines (Experimental)

Simplifies asynchronous programming by eliminating callbacks.

```kotlin
GlobalScope.launch {
    val result = async { someLongRunningTask() }
    println(result.await())
}
```

### Kotlin 1.3 (2018)

#### Stable Coroutines*

Coroutines become officially stable and a key part of Android development.

#### Inline Classes (Experimental)

Inline classes provide an efficient way to define types that avoid allocation.

```kotlin
inline class UserId(val id: String)
```

### Kotlin 1.4 (2020)

#### SAM Conversion for Kotlin Interfaces

In Kotlin 1.4,**SAM Conversion**allows you to pass lambda expressions for single abstract method (SAM) interfaces directly, without the need to explicitly create an object or override the method. This simplifies the code when using functional interfaces.

::: tip Example

Before Kotlin 1.4 (Without SAM Conversion for Kotlin Interfaces)

If you wanted to use a`Runnable`in Kotlin (which has only one method`run()`), you had to instantiate it like this:

```kotlin
val runnable: Runnable = Runnable {
    println("Running with SAM conversion...")
}

Thread(runnable).start()
```

:::

### Kotlin 1.4 (With SAM Conversion for Kotlin Interfaces)

With SAM conversion, you can pass a lambda directly:

```java
val runnable: Runnable = Runnable {
    println("Running with SAM conversion...")
}

Thread(runnable).start()
```

Alternatively, you can pass the lambda directly in the constructor if the interface expects it:

```java
Thread {
    println("Running directly with lambda!")
}.start()
```

This makes the code more concise and easier to read, especially when dealing with functional interfaces or APIs that use single abstract methods like event listeners or background tasks.

### Kotlin 1.5 (2021)

**– Sealed Interfaces**  
Sealed interfaces in Kotlin 1.5 extend the concept of sealed classes to interfaces, allowing you to control which types can implement an interface. Like sealed classes, sealed interfaces ensure that all possible implementations are known at compile time, enabling the compiler to enforce exhaustive`when`statements. This is especially useful when modeling hierarchies where only a specific set of types is allowed, improving code safety and clarity. By restricting the set of implementors, sealed interfaces prevent unexpected or unintended classes from implementing the interface, which can reduce runtime errors.sealed interface Shape

**– Value Classes (Experimental)**  
Value classes in Kotlin, introduced as an experimental feature, provide a way to wrap a value in a type while avoiding the overhead of creating a full-fledged object. By using the`@JvmInline`annotation, the compiler treats the value class as an inline type, meaning the wrapped value is directly used in memory without additional allocation. This leads to more efficient memory usage, especially for simple data types like`String`,`Int`, or`Long`, which are frequently used in performance-critical parts of the code.@JvmInline  
value class Password(val value: String)

### Kotlin 1.6 (2021)

**– Stable Value Classes**  
Value classes are now stable, offering better memory efficiency.

### Kotlin 1.9 (2023)

**– Optimized JVM performance**  
Improvements that make Kotlin code run more efficiently on the JVM.

---

## Impact on Android Development

- **Java**: While Android’s runtime (ART) supports Java 8, most of the new language features in later versions like local variable inference (`var`), records, and sealed classes are unavailable unless using third-party libraries like D8 desugaring.
- **Kotlin**: Kotlin is highly integrated into Android development. Features like coroutines are essential for handling background tasks without blocking the UI, making Kotlin a popular choice for Android apps.

---

## Conclusion

Staying updated on Java and Kotlin versions ensures that developers can take advantage of the latest improvements in code efficiency, readability, and performance. While Android’s support for newer Java features is limited, Kotlin’s integration with Android is growing stronger with every release, making it the go-to choice for modern Android development.

::: info Dobri Kostadinov

Android Consultant | Trainer  

[<FontIcon icon="fas fa-envelope"/>Email me](mailto:dobri.kostadinov@gmail.com)|[Follow me on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`dobrikostadinov`)](https://linkedin.com/in/dobrikostadinov/)|[Follow me on Medium (<FontIcon icon="fa-brands fa-medium"/>`dobri.kostadinov`)](https://medium.com/@dobri.kostadinov)|[Buy me a coffee](https://buymeacoffee.com/dobri.kostadinov)

:::

::: info

This article is previously published on [proandroiddev.com (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/java-and-kotlin-a-comprehensive-guide-to-new-and-key-features-across-versions-10cf026739fd)

<SiteInfo
  name="Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions"
  desc="A Version-by-Version Breakdown of Java and Kotlin Enhancements for Modern Android Development"
  url="https://proandroiddev.com/java-and-kotlin-a-comprehensive-guide-to-new-and-key-features-across-versions-10cf026739fd/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*yA3E5J_8MJOqw7Ng2ZCBOQ.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Java and Kotlin: A Comprehensive Guide to New and Key Features Across Versions",
  "desc": "In the previous article, I explored which version of Java and Kotlin you can or cannot use depending on your AGP, Android Studio etc.. Lets continue that journey by specifying which features you have in each version of Java and Kotlin. It never hurts to refresh our memory from time to time right?",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/java-and-kotlin-a-comprehensive-guide-to-new-and-key-features-across-versions.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
