---
lang: en-US
title: "Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads"
description: "Article(s) > Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads"
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
      content: "Article(s) > Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads"
    - property: og:description
      content: "Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/kotlin-under-the-hood-exploring-objects-companion-objects-and-annotations-jvmstatic-jvmfield-jvmoverloads.html
prev: /programming/java-android/articles/README.md
date: 2024-11-04
isOriginal: false
author: Abhaysing Bhosale
cover: https://droidcon.com/wp-content/uploads/2024/11/1_J39pAuo0okQu2yK40ZxLwA-600x300.webp
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
  name="Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads"
  desc="Hello! In this article, we will explore the inner workings of objects and companion objects in Kotlin, along with the annotations @JvmStatic, @JvmField, and @JvmOverloads."
  url="https://droidcon.com/kotlin-under-the-hood-exploring-objects-companion-objects-and-annotations-jvmstatic-jvmfield-jvmoverloads"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_J39pAuo0okQu2yK40ZxLwA-600x300.webp"/>

Hello! In this article, we will explore the inner workings of objects and companion objects in Kotlin, along with the annotations`@JvmStatic`,`@JvmField`, and`@JvmOverloads`.

::: info

I previously published an article on how Kotlin’s constructors and init blocks function under the hood, which you can read here:

<SiteInfo
  name="Kotlin Under the Hood: Exploring Constructors and Init Blocks"
  desc="Hello! Have you ever wondered how Kotlin’s constructors and init blocks work under the hood? In this blog, we’ll dive into it."
  url="https://proandroiddev.com/kotlin-under-the-hood-exploring-constructors-and-init-blocks-869fc1f85a8e/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*Tv7ztrOoDi14tOZfgVR4cw.png"/>

:::

Before diving into the inner workings, let’s first understand what an object and a companion object are.

---

## Object

An object in Kotlin is primarily used to create singleton behavior, but it also serves other purposes, such as defining factory methods and creating anonymous objects.

- An object can be defined inside a class or outside of it, meaning it can be placed anywhere in the code.
- *An object is instantiated lazily, meaning it is created only when accessed for the first time.*We’ll explore how this works when we dive deeper.

```kotlin
object Utils {
    fun getVersion(): String {
        return "1.0.0"
    }
}
```

In this example, we define a singleton object named`Utils`. The`getVersion()`function returns a version.

---

## Companion Object

A companion object is tied to a class in Kotlin, allowing us to define static members and methods similar to those in Java.

- A companion object can only be defined within classes.
- The companion object is instantiated as soon as the containing class is loaded, meaning it is created even if we haven’t accessed the companion object.
- You can omit the name for a companion object; if you do, it will default to the name`Companion`.

```kotlin
class Settings { 
    companion object Utils {
        fun getVersion(): String {
            return "1.0.0"
        }
    }
}
```

You can call the method in two ways:

- With the name of the companion object:`Settings.Utils.getVersion()`
- Without specifying the name:`Settings.getVersion()`

If you do not give a name to the companion object, you can access it using:

- `Settings.Companion.getVersion()`
- Or simply:`Settings.getVersion()`

---

## Decoding Object & Companion Object

Now, let’s take a closer look at how it all works under the hood. To gain deeper insights, we can use IntelliJ IDEA’s decompilation feature. By navigating to**Tools -> Kotlin -> Kotlin Bytecode**and selecting**Decompile**, we can view the underlying Java code generated from our Kotlin constructs.

Let’s see what happens when we create an object in Kotlin:

```kotlin
object Utils {
    fun getVersion(): String {
        return "1.0.0"
    }
}
```

Here’s the underlying Java code generated from this Kotlin code:

```java
public final class Utils {
   @NotNull
   public static final Utils INSTANCE;

   @NotNull
   public final String getVersion() {
      return "1.0.0";
   }

   private Utils() {
   }

   static {
      Utils var0 = new Utils();
      INSTANCE = var0;
   }
}
```

I’ve simplified it by removing assertions and other metadata for clarity.

So, what do we observe here?

- The Kotlin`object`declaration translates to a`final` Java class,`Utils`.
- A static variable,`INSTANCE`, holds the single instance of the`Utils`class, adhering to the singleton design pattern.
- The private constructor prevents external instantiation, ensuring that the only way to access the instance is through`INSTANCE`.
- Inside the static block, a new instance of`Utils`is created and assigned to`INSTANCE`, ensuring that this instance is created only once.
- Also, we have the`getVersion()`method.

::: note

In Java, a `static{}` block is known as a static initialization block. It allows you to execute a block of code when the class is loaded, before any instances of the class are created or any static methods are called.

:::

Now, let’s see what happens when we create companion objects. Consider the following code:

```kotlin title="Setting.kt"
class Setting {
    object Utils {
        fun getVersion(): String {
            return "1.0.0"
        }
    }

    companion object MyUtils {
        fun generateUniqueId(): String {
            return UUID.randomUUID().toString()
        }
    }
}
```

Here’s the Java code generated from this Kotlin code:

```java title="Setting.java"
public final class Setting {
   @NotNull
   public static final MyUtils MyUtils = new MyUtils((DefaultConstructorMarker) null);

   public static final class Utils {
      @NotNull
      public static final Utils INSTANCE;

      @NotNull
      public final String getVersion() {
         return "1.0.0";
      }

      private Utils() {
      }

      static {
         Utils var0 = new Utils();
         INSTANCE = var0;
      }
   }

   public static final class MyUtils {
      @NotNull
      public final String generateUniqueId() {
         String var10000 = UUID.randomUUID().toString(); 
         return var10000;
      }

      private MyUtils() {
      }

      // $FF: synthetic method
      public MyUtils(DefaultConstructorMarker $constructor_marker) {
         this();
      }
   }
}
```

<!-- @include: https://gist.github.com/Abhay-cloud/2e0a28082738236023842a470937362b/raw/e55908143d834c190fc65cdb1c4381f043da4a2e/Setting.java -->

So, what’s happening?

- First, the`MyUtils`class is instantiated when the`Setting`class is loaded, not when it’s accessed. However, we can observe that the instance of the`Utils`object is created only when it is accessed for the first time. *This is why it is said that the companion object is instantiated eagerly when the containing class is loaded, while the regular object is instantiated lazily.*
- The`Utils`object behaves like a singleton, similar to the previous example.
- The companion object is represented as a static inner class.
- The`private MyUtils()`constructor ensures that this class cannot be instantiated from outside.
- The synthetic method is added by the compiler to handle certain use cases in Kotlin.

---

## `@JvmStatic`

This annotation tells the Kotlin compiler to generate an additional static method for a function or static getter/setter methods for a property.

- It only works in companion objects or object declarations.
- It is useful when we want to access Kotlin method/property from Java code.
- The annotation only affects how the code is compiled to bytecode; it has no effect on how the code behaves in Kotlin itself.

Let’s take our previous example and see how to call the`getVersion()`method of`Utils`from Java without using`@JvmStatic`.

In Kotlin, you can call it directly like this:

```kotlin
val version = Setting.Utils.getVersion()
```

However, in Java, if you try to do the same:

```java
String version = Setting.Utils.getVersion(); // This will give an error
```

You’ll encounter an error. Instead, you need to access the method like this:

```java
String version = Setting.Utils.INSTANCE.getVersion();
```

Why Does This Work Differently?

As we previously discussed regarding the under-the-hood code of objects, when we create an object in Kotlin, a final class is generated in Java for that object. This class contains a static variable,`INSTANCE`, which holds the single instance of the`Utils`class & compiler generates a private constructor to prevent instantiation from outside the class, ensuring that the only way to access this instance is through`INSTANCE`. Therefore, in Java, we need to call`INSTANCE`if we do not use`@JvmStatic`.

Now, let’s use`@JvmStatic`in our previous example:

```kotlin title="Setting.kt"
class Setting {

    object Utils {
        @JvmStatic
        fun getVersion(): String {
            return "1.0.0"
        }
    }

    companion object MyUtils {
        @JvmStatic
        fun generateUniqueId(): String {
            return UUID.randomUUID().toString()
        }
    }
}
```

Accessing Methods from Java:

With`@JvmStatic`, we can now access these methods directly without needing to reference an instance variable:

- To get the version from the`Utils`object, you can simply call:

```java
String version = Setting.Utils.getVersion();
```

- To generate a unique ID from the companion object, you can call:

```java
String uid = Setting.generateUniqueId();
// You can also specify the companion object’s name if you want:
String uid = Setting.MyUtils.generateUniqueId();
```

Now you might wonder how the underlying code looks.

```java title="Setting.java"

```

<!-- @include: https://gist.github.com/Abhay-cloud/c4df766c1ab4f9a30f411d08d647e803/raw/b9fa9332dcf056d8e7b3cdf58ec9282e041ffb0d/Setting.java -->

What’s the observation?

- An extra static method is created in the parent class for the companion object (`generateUniqueId()`).
- The method in the`Utils`object is treated differently. Instead of creating an extra static method, the`getVersion()`method is made static.

---

## `@JvmField`

Using`@JvmField`tells the Kotlin compiler not to create getters and setters for a property. Instead, it allows you to access the property directly like a regular field in Java.

Let’s explore this with an example.

```kotlin
class Utils {
  val version: String = "1.0.0"
}
```

In Kotlin, you can access the`version`property easily:

```kotlin
val version = Utils().version
```

However, if you try to access it from Java like this:

```java
Utils utils = new Utils();
String version = utils.version; // This will give you an error!
```

You’ll encounter a compilation error. Why is that? Let’s take a look under the hood.

Underlaying java code:

```java
public final class Utils {
  @NotNull
  private final String version = "1.0.0";

  @NotNull
  public final String getVersion() {
    return this.version;
  }
}
```

Here, you can see that Kotlin generates a private field for`version`and provides a public getter method. Since the field is private, Java cannot access it directly.

Now, let’s see what happens when we apply`@JvmField`to our property:

```kotlin
class Utils {
  @JvmField
  val version: String = "1.0.0"
}
```

Now you can access the`version`property from Java.

```java
Utils utils = new Utils();
String version = utils.version; // This works!
```

Decompiled code with`@JvmField`, it looks like this:

```java
public final class Utils {
   @JvmField
   @NotNull
   public final String version = "1.0.0";
}
```

`version`is now a public field, with no generated getter. This makes it accessible directly from Java.

---

## `@JvmOverloads`

It instructs the compiler to generate multiple overloads of a function based on its default parameter values.

```kotlin
class Repository {
    fun getData(category: String = "default", page: Int = 1, includeTranslation: Boolean = false) {
        // some code
    }
}
```

In Kotlin, you can call the`getData()`function in different ways:

```kotlin
val repo = Repository()
repo.getData() // Uses all default values
repo.getData(page = 2) // Uses default for category and includeTranslation
repo.getData(includeTranslation = true) // Uses default for category and page
```

However, when you try to call this function from Java, you’ll run into a problem:

```java
Repository repo = new Repository();
repo.getData(); // This will give you an error!
```

Underlaying Java code:

```java
public final class Repository {
    public final void getData(@NotNull String category, int page, boolean includeTranslation) {
        Intrinsics.checkNotNullParameter(category, "category");
    }
    // ... synthetic method
public static void getData$default(Repository var0, String var1, int var2, boolean var3, int var4, Object var5) {
      if ((var4 & 1) != 0) {
         var1 = "default";
      }

      if ((var4 & 2) != 0) {
         var2 = 1;
      }

      if ((var4 & 4) != 0) {
         var3 = false;
      }

      var0.getData(var1, var2, var3);
   }
}
```

In this case, the method is generated only with all parameters. Java doesn’t support default parameters, so you need to provide values for all of them.

::: info

Kotlin generates a synthetic method to handle default parameters, but this method isn’t accessible from Java. This synthetic method, like`getData$default`, uses bitwise operations to determine which default values to apply based on the parameters provided.

:::

Now, let’s see what happens when we apply`@JvmOverloads`:

```kotlin title="Repository.kt"
class Repository {
    @JvmOverloads
    fun getData(category: String = "default", page: Int = 1, includeTranslation: Boolean = false) {
        // some code
    }
}
```

Underlaying Java code:

```java title="Repository.java"
public final class Repository {
    @JvmOverloads
    public final void getData(@NotNull String category, int page, boolean includeTranslation) {
       
    }

    @JvmOverloads
    public final void getData(@NotNull String category, int page) {
        getData$default(this, category, page, false, 4, null);
    }

    @JvmOverloads
    public final void getData(@NotNull String category) {
        getData$default(this, category, 0, false, 6, null);
    }

    @JvmOverloads
    public final void getData() {
        getData$default(this, null, 0, false, 7, null);
    }
}
```

- Kotlin generates additional overloaded versions of the`getData()`method.
- It’s important to note that there’s no overload for just the`String`and`boolean`parameters.*As per the documentation, if a method has* *N* *parameters and* *M* *of them have default values, Kotlin generates* *M* *overloads. These overloads progressively omit parameters from the end.*
- In this case, since`includeTranslation`is the last parameter with a default value, Kotlin generates overloads that skip directly to`String`and`Int`, but you won’t see an overload for just`String`and`boolean`because`Int`is in between.
- That’s why when you try to call`getData(String, Boolean)`from Java, it will not work.

Working Combinations from Java:

```java
repo.getData(); // ✅
repo.getData("default"); // Calls with page = 1, includeTranslation = false ✅
repo.getData("default", 2); // Calls with includeTranslation = false ✅
repo.getData("default", 2, true); // ✅

repo.getData("default", false); // This won't compile ❌
```

That’s it for today!

Thanks for reading this blog! 😊 If you want to explore more “under the hood” insights and deep dives into Kotlin, be sure to follow me for future updates and posts.

Feel free to connect with me on:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`abhaycloud_dev`)](https://x.com/abhaycloud_dev)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`abhaysing-bhosale`)](https://linkedin.com/in/abhaysing-bhosale)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`Abhay-cloud`)](https://github.com/Abhay-cloud)

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/kotlin-under-the-hood-exploring-objects-companion-objects-and-annotations-jvmstatic-71e1bf1128df)

<SiteInfo
  name="Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic…"
  desc="Hello! In this article, we will explore the inner workings of objects and companion objects in Kotlin, along with the annotations…"
  url="https://proandroiddev.com/kotlin-under-the-hood-exploring-objects-companion-objects-and-annotations-jvmstatic-71e1bf1128df/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fill:1200:632/g:fp:0.42:0.45/1*J39pAuo0okQu2yK40ZxLwA.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kotlin Under the Hood: Exploring Objects, Companion Objects, and Annotations: @JvmStatic, @JvmField, @JvmOverloads",
  "desc": "Hello! In this article, we will explore the inner workings of objects and companion objects in Kotlin, along with the annotations @JvmStatic, @JvmField, and @JvmOverloads.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/kotlin-under-the-hood-exploring-objects-companion-objects-and-annotations-jvmstatic-jvmfield-jvmoverloads.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
