---
lang: en-US
title: "data class in Kotlin"
description: "Article(s) > data class in Kotlin"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - outcomeschool.com
  - java
  - kotlin
head:
  - - meta:
    - property: og:title
      content: "Article(s) > data class in Kotlin"
    - property: og:description
      content: "data class in Kotlin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/outcomeschool.com/data-class-in-kotlin.html
prev: /programming/java/articles/README.md
date: 2024-08-22
isOriginal: false
author: Amit Shekhar
cover: https://outcomeschool.com/static/images/blog/data-class-in-kotlin.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="data class in Kotlin"
  desc="In this blog, we will learn about the data class in Kotlin. We will also learn how it works internally."
  url="https://outcomeschool.com/data-class-in-kotlin"
  logo="https://outcomeschool.com/static/favicons/apple-touch-icon.png"
  preview="https://outcomeschool.com/static/images/blog/data-class-in-kotlin.png"/>

::: info

Before we start, I would like to mention that, I have released a video playlist to help you crack the Android Interview: Check out [<FontIcon icon="fa-brands fa-youtube"/>Android Interview Questions and Answers](https://youtube.com/playlist?list=PL_I3TGB7aK6jNBMZkw3FYdJXyf7quHdI8).

:::

In this blog, we will learn about the **data class** in Kotlin. We will also learn how it works internally.

---

## What is a data class in Kotlin?

A data class in Kotlin is a special kind of class mainly used to hold data. It automatically generates useful methods based on the properties we define in the primary constructor. These include methods like `equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()`.

All of these happen without writing a lot of boilerplate code.

::: note

It automatically generates useful methods based on the properties we define in the **primary constructor**. It is important to note that we have only mentioned the **primary constructor**.

:::

Let's understand it with an example:

Let's create a data class `Developer`:

```kotlin
data class Developer(var name: String, var age: Int)
```

That's it; our data class is ready.

Now, we will try to understand the above code.

- `data` is the keyword used to create a data class in Kotlin.
- We have two properties in the primary constructor: `name` and `age`.

Data classes in Kotlin make it easier to store data without all the extra code needed in Java to create a POJO. This means we don't have to write getters, setters, or methods like equals() and hashCode(), making our model classes cleaner and easier to read.

---

## How does it work internally?

The Kotlin compiler automatically generates the methods for a data class. When you declare a class as a data class, the compiler generates the following methods based on the properties defined in the primary constructor:

- `equals()`
- `hashCode()`
- `toString()`
- `copy()`
- `componentN()`

Now, we need to decompile this code. For that, we will have to convert this Kotlin source file to a Java source file.

Steps to convert from Kotlin source file to Java source file and decompile in Android Studio:

- `Tools` > `Kotlin` > `Show Kotlin Bytecode`. You will get the bytecode of your Kotlin file.
- Now click on the `Decompile` button to get your Java code from the bytecode.

Here, I have kept only the important lines of the code and removed other lines for brevity.

We will get the following output:

```java :collapsed-lines
public final class Developer {

   private String name;
   private int age;

   public final String getName() {
      return this.name;
   }

   public final void setName(String var1) {
      this.name = var1;
   }

   public final int getAge() {
      return this.age;
   }

   public final void setAge(int var1) {
      this.age = var1;
   }

   public Developer(String name, int age) {
      super();
      this.name = name;
      this.age = age;
   }

   public final String component1() {
      return this.name;
   }

   public final int component2() {
      return this.age;
   }

   public final Developer copy(@NotNull String name, int age) {
      return new Developer(name, age);
   }

   public String toString() {
      return "Developer(name=" + this.name + ", age=" + this.age + ")";
   }

   public int hashCode() {
      String var10000 = this.name;
      return (var10000 != null ? var10000.hashCode() : 0) * 31 + Integer.hashCode(this.age);
   }

   public boolean equals(Object var1) {
      if (this != var1) {
         if (var1 instanceof Developer) {
            Developer var2 = (Developer)var1;
            if (Intrinsics.areEqual(this.name, var2.name) && this.age == var2.age) {
               return true;
            }
         }

         return false;
      } else {
         return true;
      }
   }
}
```

Earlier, we used to write all of these methods in Java. Now, in Kotlin, these methods are generated automatically, reducing the need for boilerplate code. The Kotlin compiler handles this for us.

**Things to take care of while creating data class:**

- **Primary constructor**: Must have at least one parameter.
- **Properties**: All primary constructor parameters must be val or var.
- **Limitations**: The data class cannot be abstract, open, sealed, or inner.

**Use Cases:**

- Model Classes
- DTOs (Data Transfer Objects)
- Representing State
- Immutable Objects

One question for you: Can we extend a data class? For the answer, refer to the limitations mentioned above.

Prepare yourself for Android Interview: [Android Interview Questions (<FontIcon icon="iconfont icon-github"/>`amitshekhariitbhu/android-interview-questions`)](https://github.com/amitshekhariitbhu/android-interview-questions)

<SiteInfo
  name="amitshekhariitbhu/android-interview-questions"
  desc="Your Cheat Sheet For Android Interview - Android Interview Questions and Answers"
  url="https://github.com/amitshekhariitbhu/android-interview-questions/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/96704265/3a1039a7-29ee-425d-b4ea-53fcff2c1db7"/>

That's it for now.

Thanks

::: info Amit Shekhar

You can connect with me on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`amitiitbhu`](https://twitter.com/amitiitbhu)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`amit-shekhar-iitbhu`](https://linkedin.com/in/amit-shekhar-iitbhu)
- [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`amitshekhar`)](https://youtube.com/@amitshekhar)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`amitshekhariitbhu`](https://github.com/amitshekhariitbhu)

Follow Outcome School on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`outcome_school`)](https://twitter.com/outcome_school)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`outcomeschool`)](https://linkedin.com/company/outcomeschool)
- [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`OutcomeSchool`)](https://youtube.com/@OutcomeSchool)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`OutcomeSchool`)](http://github.com/OutcomeSchool)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "data class in Kotlin",
  "desc": "In this blog, we will learn about the data class in Kotlin. We will also learn how it works internally.",
  "link": "https://chanhi2000.github.io/bookshelf/outcomeschool.com/data-class-in-kotlin.html",
  "logo": "https://outcomeschool.com/static/favicons/apple-touch-icon.png",
  "background": "rgba(78,70,220,0.2)"
}
```
