---
lang: en-US
title: "Widgets with Glance: Blending in"
description: "Article(s) > Widgets with Glance: Blending in"
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
      content: "Article(s) > Widgets with Glance: Blending in"
    - property: og:description
      content: "Widgets with Glance: Blending in"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-blending-in.html
prev: /programming/java-android/articles/README.md
date: 2024-11-20
isOriginal: false
author: Katie Barnett
cover: https://droidcon.com/wp-content/uploads/2024/11/1_cvh9AVHBSgPV4h8PggKlvw.webp
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
  name="Widgets with Glance: Blending in"
  desc="Use dynamic colors from your wallpaper in your Widget GlanceTheme"
  url="https://droidcon.com/widgets-with-glance-blending-in"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_cvh9AVHBSgPV4h8PggKlvw.webp"/>

**Use dynamic colors from your wallpaper in your Widget GlanceTheme**

[If you have gone to the effort (<VPIcon icon="fa-brands fa-medium"/>`proadnroiddev`)](https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee)to provide[themed app icons (<VPIcon icon="fa-brands fa-medium"/>`proadnroiddev`)](https://medium.com/proandroiddev/its-time-for-an-app-icon-makeover-107ccbb506eb)for your Android app, you have allowed the user to have a beautiful and consistent home screen aesthetic. Why should app widgets be any different? With Jetpack Compose Glance, you can easily theme your widgets to use dynamic colors from the wallpaper (when supported) and fit right in with the app icons.

::: tip

Do you want your widget to stand out from the background with custom colours depending on the wallpaper? Check out my other article* [*Widgets with Glance: Standing out (<VPIcon icon="fa-brands fa-medium"/>`proadnroiddev`)*](https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee)

<SiteInfo
  name="Widgets with Glance: Standing out"
  desc="Detect wallpaper colors so transparent widgets do not get lost in the background"
  url="https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*mky0GpsMOkUNapd6diKK2A.jpeg"/>

:::

. . .

If you haven’t looked into[<VPIcon icon="fa-brands fa-android"/>Glance theming](https://developer.android.com/develop/ui/compose/glance/theme), it is pretty easy to set up. It is just the same as[<VPIcon icon="fa-brands fa-android"/>Material Design 3](https://developer.android.com/develop/ui/compose/designsystems/material3)theming where you can provide a custom set of colors to style your widget to match your app branding.

```kotlin title="MotivateMeGlanceTheme.kt"
object MotivateMeGlanceColorScheme {
   val colors = ColorProviders(
       light = lightScheme,
       dark = darkScheme
   )
}

@Composable
fun MotivateMeGlanceTheme(
    content: @Composable () -> Unit,
) {
    GlanceTheme(colors = MotivateMeGlanceColorScheme.colors) {
      content.invoke() 
    }
}

class QuoteWidget : GlanceAppWidget() {
  // ...
  override suspend fun provideGlance(context: Context, id: GlanceId) {
    provideContent {
      MotivateMeGlanceTheme() { 
        WidgetContent()
      }
    }
  }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/e6ead24c8afb4cb19c1089613bc092ee/raw/54ccca785faedfae9e16fa4814d9d2fdfdfa6f56/MotivateMeGlanceTheme.kt -->

In this basic set up, we have the app color scheme`lightScheme`and`darkScheme`provided as`ColorProviders`(using`androidx.glance:glance-material3`) to`GlanceTheme`which will set the custom color scheme for the widget.

To use this, wrap the content by the`GlanceTheme`and the widget will use the app branding.

Now, this would look a lot better on this background with coordinating colors rather than the purple app branding which clashes with this particular wallpaper.

For this, we need to use the dynamic system color theming available for some devices (manufacturer depending) with[<VPIcon icon="fa-brands fa-android"/>Android 12 and above](https://android.com/intl/en_au/android-12/#a12-color-reimagined). If you haven’t yet played with the system theming, you just need to long press on the wallpaper and select ‘Wallpaper & style’. Here you can select a color theme to match your wallpaper or personal preference.

![This is what sets the colors for your themed app icons!](https://droidcon.com/wp-content/uploads/2024/11/2-1.webp)

To use this color theme, just update your`GlanceTheme`definition to use`GlanceTheme.colors`for supported versions of Android:

```kotlin title="MotivateMeGlanceTheme.kt"
@Composable
fun MotivateMeGlanceTheme(
    content: @Composable () -> Unit,
) {
    GlanceTheme(
        colors = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            GlanceTheme.colors
        } else {
            MotivateMeGlanceColorScheme.colors
        },
        content = { content.invoke() }
    )
}
```

<!-- @include: https://gist.github.com/KatieBarnett/27c0f401e42847e475d7f561ddb925f6/raw/a7acff565420183a3f7c47a5d4678a066daf11ab/MotivateMeGlanceTheme.kt -->

For non supported devices, the app branding will be used. Now the widget blends nicely with the background without the jarring purple theming.

![Not quite camouflage, but better.](https://droidcon.com/wp-content/uploads/2024/11/3-1.webp)

You may notice that it still doesn’t match the themed app icons. In the example above the background is using`GlanceTheme.colors.background`for the background and`GlanceTheme.colors.onBackground`for the foreground text and icon. If you want to match the themed app icons for your widget then use`GlanceTheme.colors.widgetBackground`for the background and`GlanceTheme.colors.primary` for the foreground.

![From standing out to blending in. Perfect!](https://droidcon.com/wp-content/uploads/2024/11/4-1-1024x614.webp)

To see a full example, see my[sample widget app (<VPIcon icon="iconfont icon-github"/>`KatieBarnett/MotivateMe`)](https://github.com/KatieBarnett/MotivateMe/tree/workshop/Activity-11):

<SiteInfo
  name="KatieBarnett/MotivateMe"
  desc="Sample app for Widget Fever: A Hands-On Workshop with Jetpack Compose Glance & Gemini"
  url="https://github.com/KatieBarnett/MotivateMe/tree/workshop/Activity-11"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e48744e1af1e9e66eb80f2b5d2e02dc223574c5da2a50758e30a7af1b5bb0d3f/KatieBarnett/MotivateMe"/>

Do you want your widget to stand out from the background with custom colours depending on the wallpaper? Check out my other article[Widgets with Glance: Standing out (<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee)

<SiteInfo
  name="Widgets with Glance: Standing out"
  desc="Detect wallpaper colors so transparent widgets do not get lost in the background"
  url="https://proandroiddev.com/widgets-with-glance-standing-out-33834eee2dee/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*mky0GpsMOkUNapd6diKK2A.jpeg"/>

::: info

this article is previously published on [<VPIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/widgets-with-glance-blending-in-ae1e52a6cb6f)

<SiteInfo
  name="Widgets with Glance: Blending in"
  desc="Use dynamic colors from your wallpaper in your Widget GlanceTheme"
  url="https://proandroiddev.com/widgets-with-glance-blending-in-ae1e52a6cb6f/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*1RKuGEZI9txSA9Vnjatzew.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Widgets with Glance: Blending in",
  "desc": "Use dynamic colors from your wallpaper in your Widget GlanceTheme",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-blending-in.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
