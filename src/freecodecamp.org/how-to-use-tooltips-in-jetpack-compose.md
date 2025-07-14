---
lang: en-US
title: "How to Use Tooltips in JetpackCompose"
description: "Article(s) > How to Use Tooltips in JetpackCompose"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
  - jdk8
  - jdk11
  - kotlin
  - kt
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Tooltips in JetpackCompose"
    - property: og:description
      content: "How to Use Tooltips in JetpackCompose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-tooltips-in-jetpack-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-10-02
isOriginal: false
author: Tomer
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727813989960/b0a7ab29-d87c-4d87-9847-70b7e1c341b1.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Tooltips in JetpackCompose"
  desc="When I wrote my last article about Jetpack Compose, I stated there that Jetpack Compose is missing some (in my opinion) basic components, and one of them is the tooltip. At the time, there was no built-in composable to display tooltips and there were..."
  url="https://freecodecamp.org/news/how-to-use-tooltips-in-jetpack-compose"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727813989960/b0a7ab29-d87c-4d87-9847-70b7e1c341b1.jpeg"/>

When I wrote my [<FontIcon icon="fa-brands fa-medium"/>last article about Jetpack Compose](https://medium.com/better-programming/is-jetpack-compose-ready-for-you-eae6c93ad3f8), I stated there that Jetpack Compose is missing some (in my opinion) basic components, and one of them is the tooltip.

At the time, there was no built-in composable to display tooltips and there were several alternative solutions circling online. The problem with those solutions was that once Jetpack Compose released newer versions, those solutions might break. So it wasn’t ideal and the community was left hoping that sometime in the future, support would be added for tooltips.

I’m glad to say that since [<FontIcon icon="fa-brands fa-android"/>version 1.1.0 of Compose Material 3](https://developer.android.com/jetpack/androidx/releases/compose-material3#1.1.0), we now have built in tooltip support. 👏

While this in itself is great, more than a year has passed since that version was released. And with subsequent versions, the API related to tooltips changed drastically as well.

If you go over the changelog, you will see how the public and internal APIs have changed. So bear in mind, that when you read this article, things may have continued to change as everything related to Tooltips is still marked by the annotation `ExperimentalMaterial3Api::class`.

::: note

❗️ The version of material 3 used for this article is 1.2.1, which was released on March 6th, 2024

:::

---

## Tooltip Types

We now have support for two different types of tooltips:

1. Plain tooltip
2. Rich media tooltip

### Plain Tooltip

You can use the first kind to provide information about an icon button that wouldn’t be clear otherwise. For example, you can use a plain tooltip to indicate to a user what the icon button represents.

![Basic tooltip example](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602449314/94cf84bf-dec0-462c-a8a0-6f878e0d5db3.gif)

To add a tooltip to your application, you use the `TooltipBox` composable. This composable takes several arguments:

```kotlin
fun TooltipBox(
    positionProvider: PopupPositionProvider,
    tooltip: @Composable TooltipScope.() -> Unit,
    state: TooltipState,
    modifier: Modifier = Modifier,
    focusable: Boolean = true,
    enableUserInput: Boolean = true,
    content: @Composable () -> Unit,
)
```

Some of these should be familiar to you if you have used Composables before. I’ll highlight the ones that have a specific use case here:

- `positionProvider`: Of `PopupPositionProvider` type, and is used to calculate the position of the tooltip.
- `tooltip`: This is where you can design the UI of how the tooltip will look like.
- `state`: This holds the state that is associated with a specific Tooltip instance. It exposes methods like showing/dismissing the tooltip and when instantiating an instance of one, you can declare if the tooltip should be persistent or not (meaning if it should keep displaying on the screen until a user performs a click action outside the tooltip).
- `content`: This is the UI that the tooltip will display above/below.

Here is an example of instantiating a `BasicTooltipBox` with all the relevant arguments filled in:

```kotlin
@OptIn(ExperimentalFoundationApi::class, ExperimentalMaterial3Api::class)
@Composable
fun BasicTooltip() {
    val tooltipPosition = TooltipDefaults.rememberPlainTooltipPositionProvider()
    val tooltipState = rememberBasicTooltipState(isPersistent = false)

    BasicTooltipBox(positionProvider = tooltipPosition,
        tooltip =  { Text("Hello World") } ,
        state = tooltipState) {
        IconButton(onClick = { }) {
            Icon(imageVector = Icons.Filled.Favorite, 
                    contentDescription = "Your icon's description")
        }
    }
}
```

![A basic tooltip](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602558759/e00e0bed-6a95-489e-af5c-a7d9dcc33fe6.gif)

Jetpack Compose has a built in class called TooltipDefaults. You can use this class to help you instantiate arguments that make up a TooltipBox. For instance, you could use `TooltipDefaults.rememberPlainTooltipPositionProvider` to correctly position the tooltip in relation to the anchor element.

### Rich Tooltip

A rich media tooltip takes more space than a plain tooltip and can be used to provide more context about the functionality of an icon button. When the tooltip is shown, you can add buttons and links to it to provide further explanation or definitions.

It is instantiated in a similar way as a plain tooltip, inside of a TooltipBox, but you use the RichTooltip composable.

```kotlin
TooltipBox(positionProvider = tooltipPosition,
    tooltip = {
        RichTooltip(
            title = { Text("RichTooltip") },
            caretSize = caretSize,
            action = {
                TextButton(onClick = {
                    scope.launch {
                        tooltipState.dismiss()
                        tooltipState.onDispose()
                    }
                }) {
                    Text("Dismiss")
                }
            }
        ) {
            Text("This is where a description would go.")
        }
    },
    state = tooltipState) {
    IconButton(onClick = {
        /* Icon button's click event */
    }) {
        Icon(imageVector = tooltipIcon,
            contentDescription = "Your icon's description",
            tint = iconColor)
    }
}
```

A few things to notice about a Rich tooltip:

1. A Rich tooltip has support for a caret.
2. You can add an action (that is, a button) to the tooltip to give users an option to find out more information.
3. You can add logic to dismiss the tooltip.

![Rich tooltip without a caret](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602624042/40160d88-4e8a-4487-835d-1b74a9dd7c72.png)

![Rich tooltip with a caret](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602651265/f3e6f7fe-c4e1-4f98-972d-b20a273900b4.png)

### Edge Cases

When you choose to mark your **tooltip state as persistent**, it means that once the user interacts with the UI that shows your tooltip, it will stay visible until the user presses anywhere else on the screen.

If you looked at the example of a Rich tooltip from above, you might have noticed that we have added a button to dismiss the tooltip once it’s clicked.

There is a problem that happens once a user presses that button. Since the dismiss action is performed on the tooltip, if a user wants to perform another long press on the UI item that invokes this tooltip, the tooltip won’t be shown again. This means that the state of the tooltip is persistent on it being dismissed. So, how do we go about and resolve this?

![Second long press does not trigger the tooltip](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602690256/a31b56bb-77c4-4444-bab6-7ffcca3f5207.gif)

In order to “reset” the state of the tooltip, we have to call the `onDispose` method that is exposed through the tooltip state. Once we do that, the tooltip state is reset and the tooltip will be shown again when the user performs a long press on the UI item.

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RichTooltip() {
    val tooltipPosition = TooltipDefaults.rememberRichTooltipPositionProvider()
    val tooltipState = rememberTooltipState(isPersistent = true)
    val scope = rememberCoroutineScope()

    TooltipBox(positionProvider = tooltipPosition,
        tooltip = {
            RichTooltip(
                title = { Text("RichTooltip") },
                caretSize = TooltipDefaults.caretSize,
                action = {
                    TextButton(onClick = {
                        scope.launch {
                            tooltipState.dismiss()
                            tooltipState.onDispose()  /// <---- HERE
                        }
                    }) {
                        Text("Dismiss")
                    }
                }
            ) {

            }
        },
        state = tooltipState) {
        IconButton(onClick = {  }) {
            Icon(imageVector = Icons.Filled.Call, contentDescription = "Your icon's description")
        }
    }
}
```

![`onDispose` solves the issue](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602730404/60f31668-ea66-4127-b6fc-41f3aca952ae.gif)

Another scenario where the tooltip state does not reset is if instead of calling ourselves for the dismiss method per a user’s action, the user clicks outside of the tooltip, causing it to be dismissed. This calls the dismiss method behind the scenes and the tooltip state is set to dismissed. Long pressing on the UI element to see our tooltip again will result in nothing.

![The tooltip does not show again](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602758707/60387e08-72e6-45d4-bd47-ffb2708e0efe.gif)

Our logic that calls the tooltip’s onDispose method does not get triggered, so how can we reset the tooltip’s state?

Currently, I haven’t been able to figure this out. It might be related to the tooltip’s [<FontIcon icon="fa-brands fa-android"/>`MutatorMutex`](https://developer.android.com/reference/kotlin/androidx/compose/foundation/MutatorMutex). Maybe with upcoming releases, there will be an API for this. I did notice that if other tooltips are present on the screen and they are pressed, this resets the previously clicked upon tooltip.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1727602790121/25a81994-a508-4c71-8424-c45370a7999d.gif)

If you would like to see the code featured here, you can go to [this GitHub repository (<FontIcon icon="iconfont icon-github"/>`TomerPacific/MediumArticles`)](https://github.com/TomerPacific/MediumArticles/tree/master/TooltipExample)

If you would like to see tooltips in an application, you can check it out [<FontIcon icon="fa-brands fa-google-play"/>here](https://play.google.com/store/apps/details?id=com.tomerpacific.laundry).

https://play.google.com/store/apps/details?id=com.tomerpacific.laundry

<!-- TODO: StieInfo생성 -->

#### References

<SiteInfo
  name="Tooltips – Material Design 3"
  desc="Tooltips are informative, specific, and action-oriented text labels that provide contextual support"
  url="https://m3.material.io/components/tooltips/overview"
  logo="https://m3.material.io/static/assets/m3-favicon.svg"
  preview="https://lh3.googleusercontent.com/lJM3Eft4qYA2-u8hGts3octhkDMZxRC1yHOnmzOn9CfZGAm7DImHyZyZqvu1YnF7fYICpR5WFWJGyi2gqt3ydxG9QBRqUA2Zz7qiDIHLvQ3QO-1lOog"/>

<SiteInfo
  name="TooltipDefaults  |  Android Developers"
  desc="Tooltip defaults that contain default values for both PlainTooltip and RichTooltip"
  url="https://developer.android.com/reference/kotlin/androidx/compose/material3/TooltipDefaults"
  logo="https://gstatic.com/devrel-devsite/prod/vdf5af65c45d9e2fdd493c581ff01cb1d11a21b4420a9fcc957400a26863da9d2/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

```component VPCard
{
  "title": "Tooltip.kt - Android Code Search",
  "desc": "Tooltip Source Code",
  "link": "https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Tooltip.kt",
  "logo": "https://gstatic.com/devopsconsole/images/oss/favicons/oss-96x96.png",
  "background": "rgba(174,203,250,0.2)"
}
```
