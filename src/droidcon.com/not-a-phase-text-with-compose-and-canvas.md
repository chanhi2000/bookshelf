---
lang: en-US
title: "Not a Phase — Text with Compose and Canvas"
description: "Article(s) > Not a Phase — Text with Compose and Canvas"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Not a Phase — Text with Compose and Canvas"
    - property: og:description
      content: "Not a Phase — Text with Compose and Canvas"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/not-a-phase-text-with-compose-and-canvas.html
prev: /programming/java-android/articles/README.md
date: 2024-11-22
isOriginal: false
author: Eevis Panula
cover: https://droidcon.com/wp-content/uploads/2024/11/1_pG4SZiLOj48ecZ7YtEa81A-1024x538.webp
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
  name="Not a Phase — Text with Compose and Canvas"
  desc="I’ve continued my journey with Compose and Canvas! After exploring drawing and animating shapes, I wanted to learn more about text. Bi-visibility Day was coming, so I drew a small animation to publish on Instagram. The final animation looks like this:"
  url="https://droidcon.com/not-a-phase-text-with-compose-and-canvas"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_pG4SZiLOj48ecZ7YtEa81A-1024x538.webp"/>

I’ve continued my journey with Compose and Canvas! After exploring drawing and animating shapes, I wanted to learn more about text. Bi-visibility Day was coming, so I drew a small animation to publish on Instagram. The final animation looks like this:

<VidStack src="youtube/FJUn6FlpLqs" />

In this blog post, we will look at how to add text to Canvas and position and animate it. We’re also utilizing custom Google Fonts in the drawing.

If you’re interested in reading the first two posts, here are the links:

- [Paint the Stars — Drawing with Compose and Canvas](https://medium.com/proandroiddev/paint-the-stars-drawing-with-compose-and-canvas-6a4e719efe20)
- [Floating in Space — Animations with Compose and Canvas](https://medium.com/@eevajonna/floating-in-space-animations-with-compose-and-canvas-7e2978629cd7)

---

## Before We Start

Before we start drawing, I want to say a few words about the design. It has the moon in the waning crescent phase, with a dashed line to complete it to the full moon shape. The text says, “Not a phase”.

Now, if you’re familiar with the discrimination and stereotypes bisexuals face, you probably already know what all of this means. But for those who are not, one of the stereotypes is that bisexuality is “just a phase on the way to being straight/gay”.

But it’s not — it’s an (umbrella) term for people who feel attraction towards their own and other genders. And even if a bi person is in a monogamous relationship with a person from one gender, it doesn’t make them straight/gay. They’re still bi.

So yeah, we’re here. We exist.

Now, let’s get to the coding part.

---

## Drawing the Text

### Measuring

Drawing text on Canvas is a two-step process: First, measure the text and then draw it. To start with measuring, we’ll need a `TextMeasurer`, and with Compose-code, we have this neat remember-function we can use:

```kotlin
val textMeasurer = rememberTextMeasurer()
```

For measuring, `TextMeasurer` has a function `measure`, which takes in the text as either `AnnotatedString` or `String`, and a bunch of other (mainly) optional parameters that affect the size of the text. Things like `density`, `layoutDirection`, `style`, `fontFamilyResolver`, and others.

We will divide the text into two strings, as we want to animate and position them a bit differently. As both of our texts are just simple strings with one style, we can use the `String`-version for both. The first version of the “Not”-text looks like this:

```kotlin
val notText =
    textMeasurer.measure(
        text = "Not",
        style =
            MaterialTheme.typography.titleSmall.copy(
                brush = Brush.linearGradient(
                    colors = Colors.biFlag
                ),
            ),
    )
```

For the `measure`-function, we pass in the text and then styles. We want to use the theme typography here for straightforwardness, so we copy the small title styles and add a brush to have a linear gradient as the text color. Here, we’re using the bi-flag colors pink, purple, and blue.

The second text is pretty similar:

```kotlin
val phaseText =
    textMeasurer.measure(
        text = "a phase",
        style =
            MaterialTheme.typography.titleLarge.copy(
                brush =
                    Brush.linearGradient(
                        colors = Colors.biFlag,
                    ),
                fontSize = 30.sp,
            ),
    )
```

For this text, we’re utilizing the large title styles from the theme. In addition to gradient colors, we’re setting the font size to 30 `sp` to make the text bigger.

Alright, now we have everything we need from the measuring step. Next up is drawing the texts on canvas.

---

## Drawing

Compose Canvas has a method called `drawText` for drawing text. It takes in a `TextLayoutResult`, which is the type that `measure` function returns. In addition, it takes other parameters meant for styling and positioning the text on Canvas.

For the `notText` we defined in the previous subsection, the `drawText` would look like this:

```kotlin
drawText(
    textLayoutResult = notText,
    topLeft =
        Offset(
            size.width * 0.25f,
            size.height * 0.6f,
        ),
)
```

We pass in the text layout result, and then we define the `topLeft` offset to position the text correctly.

The other text is a bit different. We want to position it relative to the `notText`, so we use `notText` for calculating the correct position:

```kotlin
drawText(
    textLayoutResult = phaseText,
    topLeft =
        Offset(
            x = size.width * 0.35f,
            y = (size.height * 0.6f + notText.size.height * 0.7f),
        ),
)
```

So here, we define the y-offset to be the same as for the `notText`, and then we add 70% of the height of the `notText`. This could be the whole height, but I wanted to keep less break between the texts.

![After these steps, our text looks like this](https://droidcon.com/wp-content/uploads/2024/11/0_s2dsi0JrLwORGpMV-300x300.webp)

There is just one thing left for the drawing — using custom fonts. Let’s talk about that next.

---

## Adding Fonts

For this animation, I wanted to have custom fonts. After playing around with Google Fonts, I decided that the two fonts I’m using are Poppins and Damion.

Android documentation has a page about adding fonts to your project: [<FontIcon icon="fa-brands fa-androd"/>Work with fonts](https://developer.android.com/develop/ui/compose/text/fonts#downloadable-fonts). However, I accidentally found that Android Studio lets you add Google Fonts as XML files straightforwardly. Here’s how it happens:

1. Go to Resource Manager and select the “Font”-tab.
2. Click the “+” button to add new resource.
3. Select “More Fonts…”.
4. Find the Google Font you want to use, select weights, and press OK.
5. Let Android Studio add everything needed, like the certification for fonts.

However, previews don’t work correctly if you do it this way and don’t import the ttf-files for fonts. So, if you rely on previews when developing, importing those files should resolve the issue.

After the font is available, the next thing to do is to use it in the styles. Here’s the code for the font families we’re going to use:

```kotlin
val PoppinsFontFamily =
    FontFamily(
        Font(R.font.poppins\_bold, FontWeight.Bold),
    )

val DamionFontFamily =
    FontFamily(
        Font(R.font.damion, FontWeight.Normal),
    )
```

Then we add the font families to both texts — Damion for the “Not” text and Poppins to the “a phase”-text:

```kotlin
val notText =
    textMeasurer.measure(
        text = "Not",
        style =
            MaterialTheme.typography.titleSmall.copy(
                ...
                fontFamily = DamionFontFamily
            ),
    )
```

And

```kotlin
val phaseText =
    textMeasurer.measure(
        text = "a phase",
        style =
            MaterialTheme.typography.titleLarge.copy(
                ...
                fontFamily = PoppinsFontFamily
            ),
    )
```

![After these changes, the drawing looks like this](https://droidcon.com/wp-content/uploads/2024/11/0_mgOSDM0mPoS1PP8o-300x300.webp)

---

## Animating the Text

The last step we’ll need to take is animating the text. We will do that by animating colors and floats. To set things up, let’s define `infiniteTransition`, which we’re going to use later:

```kotlin
val infiniteTransition = rememberInfiniteTransition(
    label = "infinite"
)
```

We also want to show the color animation first on the “not”-text and only after that on the “a phase”-text. One way to accomplish that is to define a helper float, based on which we use to animate the words. We’ll get back to the implementation later.

We’ll define a variable called `animationPosition`, an infinitely transitioning float from 0f to 4f, which restarts from 0 when it reaches 4. These values could be anything, but after testing, I found that these values worked best when combined with other things in this drawing.

The code for `animationPosition` could look like this:

```kotlin
val animationPosition by infiniteTransition.animateFloat(
    initialValue = 0f,
    targetValue = 4f,
    animationSpec =
        infiniteRepeatable(
            tween(
                durationMillis = 10000,
                easing = EaseIn,
            ),
            RepeatMode.Restart,
        ),
    label = "animationPosition",
)
```

In addition, we will define a helper function for animating the colors. Let’s call it `biColorsAnimated`, define it to take in a Boolean parameter `animated`, and return a list of colors:

```kotlin
@Composable
fun biColorsAnimated(animated: Boolean): List<Color> {
    // ....
}
```

Inside the function, we define our animated colors. We first create a list with the colors, and then map through it. For each color, we return `animateColorAsState`‘s value, which has the type `Color`, and finally, we return the list of colors:

```kotlin
val colors = listOf(
    biFlag.pink,
    biFlag.purple,
    biFlag.blue
)
```

```kotlin
return colors.map {
    animateColorAsState(
        targetValue = if (animated) it else white,
        animationSpec =
            tween(
                durationMillis = 1000,
                easing = EaseInBounce,
            ),
        label = it.toString()
    ).value
}
```

This way, we have the bi flag’s colors as animated values and can use them with our text.

Finally, we get to tie everything together. For both of the texts, we change the brush gradient’s color parameter to use this new function:

```kotlin
val notText =
    textMeasurer.measure(
        text = "Not",
        style =
            MaterialTheme.typography.titleSmall.copy(
                brush =
                    Brush.linearGradient(
                        colors = biColorsAnimated(
                            animated = animationPosition in 0.5f..1.5f
                        ),
                    ),
            // ...
            ),
    )

val phaseText =
    textMeasurer.measure(
        text = "a phase",
        style =
            MaterialTheme.typography.titleLarge.copy(
                brush =
                    Brush.linearGradient(
                        colors = biColorsAnimated(
                            animated = animationPosition in 2f..3.5f
                        ),
                    ),
            // ...
            ),
    )
```

We use the `animationPosition` value to define if the colors for that text are animated. For the first text, we change the colors from white to the bi flag colors if the `animationPosition` is between 0.5f and 1.5f, and for the second, if the value is between 2f and 3.5f.

These changes get us the animation you can see at the beginning of this blog post. You can find [<FontIcon icon="iconfont icon-github"/>the complete code in this code snippet](https://gist.github.com/eevajonnapanula/f47b5eab078cf903648555559ba50b2d).

<SiteInfo
  name="not-a-phase.kt"
  desc="GitHub Gist: instantly share code, notes, and snippets."
  url="https://gist.github.com/eevajonnapanula/f47b5eab078cf903648555559ba50b2d/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

---

## Wrapping Up

In this blog post, we’ve looked into adding text to Canvas, using custom Google Fonts, and animating colors. There was a lot to cover, but the end result is pretty nice!

I hope you’ve enjoyed this blog post and learned something. If you want to share your learnings, post on the social media of your choosing, or let me know in the comments!

---

## Links in the Blog Post

<SiteInfo
  name="Paint the Stars — Drawing with Compose and Canvas"
  desc="I’ve always struggled with drawing in Canvas, and I decided to learn more about it. This blog post shares part of that learning journey."
  url="https://proandroiddev.com/paint-the-stars-drawing-with-compose-and-canvas-6a4e719efe20/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*PeUL15ImxTXYw4uLVu4UvQ.png"/>

<SiteInfo
  name="Floating in Space — Animations with Compose and Canvas"
  desc="Let’s animate the Canvas! This blog post discusses how to do that with animated floats."
  url="https://proandroiddev.com/floating-in-space-animations-with-compose-and-canvas-7e2978629cd7/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*Fu-haBheuLWMsukdcTc6Iw.png"/>

<SiteInfo
  name="Work with fonts   |  Jetpack Compose  |  Android Developers"
  desc="This page describes how to set fonts in your Compose app."
  url="https://developer.android.com/develop/ui/compose/text/fonts?hl=en#downloadable-fonts"
  logo="https://gstatic.com/devrel-devsite/prod/v6f23042ee535b54d461e0cc5c1cc12493e4d0aea4f2d54a7a63063da7859ead0/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png?hl=ko"/>

<SiteInfo
  name="not-a-phase.kt"
  desc="GitHub Gist: instantly share code, notes, and snippets."
  url="https://gist.github.com/eevajonnapanula/f47b5eab078cf903648555559ba50b2d/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com.](https://proandroiddev.com/not-a-phase-text-with-compose-and-canvas-97cacc35a5f7)

<SiteInfo
  name="Not a Phase — Text with Compose and Canvas"
  desc="I’ve continued my journey with Compose and Canvas! After exploring drawing and animating shapes, I wanted to learn more about text…"
  url="https://proandroiddev.com/not-a-phase-text-with-compose-and-canvas-97cacc35a5f7/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*pG4SZiLOj48ecZ7YtEa81A.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Not a Phase — Text with Compose and Canvas",
  "desc": "I’ve continued my journey with Compose and Canvas! After exploring drawing and animating shapes, I wanted to learn more about text. Bi-visibility Day was coming, so I drew a small animation to publish on Instagram. The final animation looks like this:",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/not-a-phase-text-with-compose-and-canvas.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
