---
lang: ko-KR
title: "Kotlin recipes for Android (I): OnGlobalLayoutListener"
description: "Article(s) > Kotlin recipes for Android (I): OnGlobalLayoutListener"
icon: fa-brands fa-android
category: 
  - Java
  - Kotlin
  - Android
  - Article(s)
tag: 
  - blog
  - antonioleiva.com
  - java
  - kotlin
  - kt
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Kotlin recipes for Android (I): OnGlobalLayoutListener"
    - property: og:description
      content: "Kotlin recipes for Android (I): OnGlobalLayoutListener"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/antonioleiva.com/kotlin-ongloballayoutlistener.html
prev: /programming/java-android/articles/README.md
date: 2016-03-16
isOriginal: false
cover: /assets/image/antonioleiva.com/kotlin-ongloballayoutlistener/banner.png
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
  name="Kotlin recipes for Android (I): OnGlobalLayoutListener"
  desc="OnGlobalLayoutListener doesn't look good on Kotlin, but we can make it shine if we make use of extension functions, and convert it to a more usable tool."
  url="https://antonioleiva.com/kotlin-ongloballayoutlistener"
  logo="/assets/image/antonioleiva.com/favicon.png"
  preview="/assets/image/antonioleiva.com/kotlin-ongloballayoutlistener/banner.png"/>

![](/assets/image/antonioleiva.com/kotlin-ongloballayoutlistener/banner.png)

Today a mate asked me how he could do an `OnGlobalLayoutListener` properly without incurring in the need of too much boilerplate. This was a tricky question because of a couple of things, let’s see it a little more deeply.

---

## What is OnGlobalLayoutListener for?

This listener is available for any view’s `ViewTreeObserver` and it’s quite often used to get a callback when the view is inflated and measured, and we already have a width and height available to do any kind of calculations, animations, etc.

> If you’re going to use this method, make sure it’s really what you need. Check this tweet from Chris Banes

Thanks to the awesome Java interoperability that Kotlin provides, we can do this on a very clean way using its simulated properties and lambdas for single-method interfaces:

```kotlin
recycler.viewTreeObserver.addOnGlobalLayoutListener {
    // do whatever
}
```

What’s the issue here? To prevent leaks, a recommended practice is to remove the listener once you’ve finished using it. But we don’t have a reference to the object because we used a lambda, and a lambda is not exactly the same as an object.

We could still use the old-fashioned style, but a kitten dies every time we use an anonymous object directly in Kotlin. We are not changing to a nicer language if we still need to do things like this:

```kotlin
recycler.viewTreeObserver.addOnGlobalLayoutListener(
    object : ViewTreeObserver.OnGlobalLayoutListener {
        override fun onGlobalLayout() {
            recycler.viewTreeObserver.removeOnGlobalLayoutListener(this);
            // do whatever
        }
   });
```

---

## Finding a better alternative

Ok, we know we don’t want that. But what can we do to make it better? We are forced to use the not-so-good-looking way, but a good alternative would be to hide this behind an extension function.

We will then create a new function for views that receives another function and creates and removes the listener by itself. Something like:

```kotlin
inline fun View.waitForLayout(crossinline f: () -> Unit) = with(viewTreeObserver) {
    addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
        override fun onGlobalLayout() {
            removeOnGlobalLayoutListener(this)
            f()
        }
    })
}
```

You can now just call the function and be sure that the listener is added and removed by itself. Besides, you’ll never forget about removing it anymore:

```kotlin
recycler.waitForLayout {
     // do whatever
}
```

If you prefer, you could apply the extension function to the `ViewTreeObserver` instead of directly to the `View`. That’s up to you.

---

## But we can improve it

This layout listener is usually used to do something after a view is measured, so you typically would need to wait until width and height are greater than 0. And we probably want to do something with the view that called it, so why don’t we **convert the parameter function into an extension function** too?

I also **generified the function** so that it can be used by any object that extends View and also be able to access to all its specific functions and properties from the function we’ll write.

```kotlin
inline fun  T.afterMeasured(crossinline f: T.() -> Unit) {
    viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
        override fun onGlobalLayout() {
            if (measuredWidth > 0 && measuredHeight > 0) {
                viewTreeObserver.removeOnGlobalLayoutListener(this)
                f()
            }
        }
    })
}
```

This `afterMeasured` function is very similar to the previous one, but you can use the properties and public methods of the view directly inside the lambda. We can, for instance, get the width of the recycler and set a layout with a dynamic number of columns depending on it.

```kotlin
recycler.afterMeasured {
    val columnCount = width / columnWidth
    layoutManager = GridLayoutManager(context, columnCount)
}
```

---

## Conclusion

It’s true that there are still some things that don’t look nice when working with Android, even moving to Kotlin, but we can always find an alternative that improves readability and avoids boilerplate, by hiding this boilerplate behind other structures. At least you’ll have to only write it once and the rest of the code will look awesome!
