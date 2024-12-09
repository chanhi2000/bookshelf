---
lang: en-US
title: "Widgets with Glance: Standing out"
description: "Article(s) > Widgets with Glance: Standing out"
icon: iconfont icon-jetpack-compose
category:
  - Java
  - Kotlin
  - Android
  - Jetpack Compose
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
  - jetpack-compse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Widgets with Glance: Standing out"
    - property: og:description
      content: "Widgets with Glance: Standing out"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-standing-out.html
prev: /programming/java-android/articles/README.md
date: 2024-11-07
isOriginal: false
author: Katie Barnett
cover: https://droidcon.com/wp-content/uploads/2024/11/1_cMIA8nBu_GImuIfLIgioxQ-600x360.webp
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
  name="Widgets with Glance: Standing out"
  desc="Widgets can look great against a home screen wallpaper when they have a solid background (check out my article Widgets with Glance: Blending in to see how to pick a color that matches the app icons) but what if instead the background is transparent?"
  url="https://droidcon.com/widgets-with-glance-standing-out"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_cMIA8nBu_GImuIfLIgioxQ-600x360.webp"/>

![All good so far](https://droidcon.com/wp-content/uploads/2024/11/1_cMIA8nBu_GImuIfLIgioxQ-600x360.webp)

Widgets can look great against a home screen wallpaper when they have a solid background (check out my article [Widgets with Glance: Blending in (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/widgets-with-glance-blending-in-ae1e52a6cb6f) to see how to pick a color that matches the app icons) but what if instead the background is transparent? It looks fine if the text or graphics are a good contrast from the wallpaper:

But what about if the wallpaper is not a good contrast? How do you choose a suitable color?

![Works on a light background, not on a dark.](https://droidcon.com/wp-content/uploads/2024/11/1_L6ieC3kyYswQJ3F9FpRH6Q-600x360.webp)

Even if you are using dynamic colors in your `GlanceTheme` (as I am in the image above), the theme system won’t automatically check for contrast against the background. So we must do this ourselves.

First thing, we need to detect the device wallpaper. This can be done using the [<FontIcon icon="fa-brands fa-android"/>WallpaperManager API](https://developer.android.com/reference/android/app/WallpaperManager).

First, get the `WallpaperManager` instance, then fetch the dominant colors. A list is available, arranged in order of priority (note: a minimum color occurrence percentage `MIN_COLOR_OCCURRENCE` — 5% by default — is applied for the color to appear in this list), from here we need to get the primary color and decide whether dark or light text should be used.

This can be added to the `GlanceTheme` and initialised in a boolean state variable that can be then passed into the composable `content`.

```kotlin{6} title="MotivateMeGlanceTheme.kt"
@Composable
fun MotivateMeGlanceTheme(
    context: Context,
    content: @Composable (Boolean) -> Unit,
) {
    val wallpaperManager = WallpaperManager.getInstance(context)
    val colors = wallpaperManager.getWallpaperColors(FLAG_SYSTEM)
    var useDarkColorOnWallpaper by remember {
        mutableStateOf(
            getUseDarkColorOnWallPaper(colors, FLAG_SYSTEM) ?: false
        )
    }
    GlanceTheme(
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            GlanceTheme.colors
        } else {
            MotivateMeGlanceColorScheme.colors
        }
    ) {
        content.invoke(useDarkColorOnWallpaper)
    }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/a708ad418930f630ce6733a2ed33d8f8/raw/dff62c8d3b2b81333b31bf306fde931934f838a9/MotivateMeGlanceTheme.kt -->

In the above code we can get the wallpaper colors using

```kotlin
wallpaperManager.getWallpaperColors(FLAG_SYSTEM)
```

`FLAG_SYSTEM` indicates we want the colors for the home screen — passing in `FLAG_LOCK` would give the colors of the lock screen.

An important thing to note is that `getWallpaperColors` is limited to `API 27` and above so you can either update the `minimumSdk` of the app to `27` or surround this with an version check if statement.

To detect whether to use dark or light text, we can use a utility function `getUseDarkColorOnWallPaper`. In this we can use the wallpaper colors `colorHints` to check if we should use dark text with the `WallpaperColors.HINT_SUPPORTS_DARK_TEXT` flag. As per the API documentation, `HINT_SUPPORTS_DARK_TEXT`:

::: info

Specifies that dark text is preferred over the current wallpaper for best presentation.  

> eg. A launcher may set its text color to black if this flag is specified.

:::

There is also `HINT_SUPPORTS_DARK_THEME` which could also be useful for a widget with a solid background to detect whether a dark or light background would be preferable.

Using `HINT_SUPPORTS_DARK_TEXT` and `colorHints`:

```kotlin title="WidgetUtil.kt"
fun getUseDarkColorOnWallpaper(colors: WallpaperColors?, type: Int): Boolean? {
    return if (type and FLAG_SYSTEM != 0 && colors != null) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            (colors.colorHints) and WallpaperColors.HINT_SUPPORTS_DARK_TEXT != 0
        } else {
            val hsv = FloatArray(3)
            val primaryColor = colors.primaryColor.toArgb()
            RGBToHSV(
                primaryColor.red,
                primaryColor.green,
                primaryColor.blue,
                hsv
            )
            !colorIsDarkAdvanced(primaryColor)
        }
    } else {
        null
    }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/250ba461df486d9db169b66b021daf72/raw/eb002904924fc9f0b6c927d57c621735e380a43e/WidgetUtil.kt -->

`colorHints` is only available in [Android 12 and above](https://android.com/intl/en_au/android-12/#a12-color-reimagined), if we are using a lower version a more manual approach is required. For this, we get the primary color as a HSV value and then evaluate the intensity and contrast in another utility function.

::: note

I did not originally write this code, I found it on this *[<FontIcon icon="fa-brands fa-stack-overflow"/>StackOverflow answer](https://stackoverflow.com/a/41491220/4714860) from [SudoPlz (<FontIcon icon="fa-brands fa-stack-overflow"/>`sudoplz`)](https://stackoverflow.com/users/1658268/sudoplz). You could replace this with whichever algorithm you prefer.*

:::

```kotlin title="WidgetUtil.kt"
fun colorIsDarkAdvanced(bgColor: Int): Boolean {
    // hexToB
    val uicolors = doubleArrayOf(
        bgColor.red.toDouble() / 255.0,
        bgColor.green.toDouble() / 255.0,
        bgColor.blue.toDouble() / 255.0
    )
    val c = uicolors.map { col ->
        if (col <= 0.03928) {
            col / 12.92
        } else {
            Math.pow((col + 0.055) / 1.055, 2.4)
        }
    }
    val L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
    return L <= 0.179
}
```

<!-- @include: https://gist.github.com/KatieBarnett/95ed365619d5846ba5cae38afcf4cf28/raw/e56f0f251d1e540702fd4e3cd6785d5037e81fbd/WidgetUtil.kt -->

Now that we can tell if we should use dark or light text on widget creation, we need to ensure that whenever the wallpaper is changed the color is checked and the widget theme is updated.

To do this we can create a `WallpaperManager.OnColorsChangedListener` in a `DisposableEffect`:

```kotlin title="MotivateMeGlanceTheme.kt"

@Composable
fun MotivateMeGlanceTheme(
    context: Context,
    content: @Composable (Boolean) -> Unit,
) {
    val wallpaperManager = WallpaperManager.getInstance(context)
    val colors = wallpaperManager.getWallpaperColors(FLAG_SYSTEM)
    var useDarkColorOnWallpaper by remember {
        mutableStateOf(
            getUseDarkColorOnWallpaper(colors, FLAG_SYSTEM) ?: false
        )
    }
    DisposableEffect(wallpaperManager) {
        val listener = WallpaperManager.OnColorsChangedListener { colors, type ->
            getUseDarkColorOnWallpaper(colors, type)?.let {
                useDarkColorOnWallpaper = it
            }
        }
        wallpaperManager.addOnColorsChangedListener(
            listener,
            Handler(Looper.getMainLooper())
        )
        onDispose {
            wallpaperManager.removeOnColorsChangedListener(listener)
        }
    }
    // ...
}
```

<!-- @include: https://gist.github.com/KatieBarnett/349352b14c35d5ed23a65e174d4a21ea/raw/1162b7b978457250d40f5ca932c3beb2b6c941bb/MotivateMeGlanceTheme.kt -->

Now, every time the wallpaper is changed the widget will update!

![Looking good in all situations!](https://droidcon.com/wp-content/uploads/2024/11/1_mky0GpsMOkUNapd6diKK2A-600x360.webp)

To see a full example, see my [sample widget app (<FontIcon icon="iconfont icon-github"/>`KatieBarnett/MotivateMe`)](https://github.com/KatieBarnett/MotivateMe/tree/workshop/Activity-12):

<SiteInfo
  name="KatieBarnett/MotivateMe"
  desc="Sample app for Widget Fever: A Hands-On Workshop with Jetpack Compose Glance & Gemini"
  url="https://github.com/KatieBarnett/MotivateMe/tree/workshop/Activity-12"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e48744e1af1e9e66eb80f2b5d2e02dc223574c5da2a50758e30a7af1b5bb0d3f/KatieBarnett/MotivateMe"/>

Check out my article [Widgets with Glance: Blending in (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/widgets-with-glance-blending-in-ae1e52a6cb6f) to see how to pick a color that matches the app icons and device dynamic colours.

::: info

This article is previously published on [proandroiddev.com (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee).

<SiteInfo
  name="Widgets with Glance: Standing out"
  desc="Detect wallpaper colors so transparent widgets do not get lost in the background"
  url="https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*mky0GpsMOkUNapd6diKK2A.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Widgets with Glance: Standing out",
  "desc": "Widgets can look great against a home screen wallpaper when they have a solid background (check out my article Widgets with Glance: Blending in to see how to pick a color that matches the app icons) but what if instead the background is transparent?",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-standing-out.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
