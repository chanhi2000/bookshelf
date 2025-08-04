---
lang: en-US
title: "Automating UI Model Generation With KSP"
description: "Article(s) > Automating UI Model Generation With KSP"
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
      content: "Article(s) > Automating UI Model Generation With KSP"
    - property: og:description
      content: "Automating UI Model Generation With KSP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/automating-ui-model-generation-with-ksp.html
prev: /programming/java-android/articles/README.md
date: 2025-02-12
isOriginal: false
author: João Cevada
cover: https://miro.medium.com/v2/resize:fit:720/format:webp/1*fj37iju-vPqoHPAvPD6zFg.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Automating UI Model Generation With KSP"
  desc="In this article, we’ll explore how to generate UI presentation models directly from Composable function definitions using KSP. This approach helps us structure and model data within the presentation layer (ViewModel) in a way that naturally aligns with UI components, leading to reduced maintenance overhead."
  url="https://droidcon.com/2025/02/11/automating-ui-model-generation-with-ksp"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://miro.medium.com/v2/resize:fit:720/format:webp/1*fj37iju-vPqoHPAvPD6zFg.png"/>

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*fj37iju-vPqoHPAvPD6zFg.png)Image was created with the assistance of DALL·E 3

In this article, we’ll explore**how to generate UI presentation models directly from Composable function definitions** using KSP**.**This approach helps us structure and model data within the presentation layer (ViewModel) in a way that naturally aligns with UI components, leading to**reduced maintenance overhead**.

By ensuring that our data models reflect the structure of the UI components, we ensure that business logic doesn’t leak into the view layer. Instead,**all data formatting and manipulation will reside within the ViewModel**, preventing common issues such as embedding UI-specific logic — like boolean visibility conditions, label changes, or style adjustments — directly in the view.

This approach aligns with clean architecture principles, improving maintainability, enhancing code readability, and making testing easier and more efficient. By centralizing logic in the presentation layer, we reduce the reliance on UI tests.

<!-- ###### ViewItems

Let’s walk through a simplified example from the**Wise Android App**to demonstrate how we structure a screen and its ViewModel using this approach. From this point on, we’ll refer to our UI models as**ViewItems**.

![](https://miro.medium.com/v2/resize:fit:800/format:webp/1*xC3sJ7fVC2EnEDho3ggDfw.png)

The avatar in this image was created with the assistance of DALL·E 3

**Screen Example**

@Composable

fun QrCodeScreenExample() {

val viewModel = QrCodeExampleViewModel()

val state = viewModel.viewState.collectAsState().value

CustomizableAppBarScaffold(

collapsedAppBarContent = {

CollapsedTitle(state.title)

},

extendedAppBarContent = {

// Rendering header (Avatar + Text + Link)

state.header.Render()

},

navigationAction = {},

collapsedAppBarContentAlignment = Alignment.CenterHorizontally,

) { paddingValues ->

Column(

horizontalAlignment = Alignment.CenterHorizontally,

modifier = Modifier

.padding(paddingValues)

.padding(horizontal = 16.dp)

.fillMaxWidth()

.verticalScroll(rememberScrollState()),

) {

Spacer(Modifier.height(32.dp))

with(state) {

// Rendering QR code section (QR code + tag)

qrCode.Render(Modifier.padding(bottom = 16.dp))

// Redering Text

Text(

text = disclaimer.resolve(),

appearance = TextAppearance.DefaultBody,

)

// Rendering actions (3 Circular Buttons)

actions.Render(Modifier.padding(bottom = 32.dp))

}

}

}

}

@Composable fun QrCodeScreenExample() { val viewModel = QrCodeExampleViewModel() val state = viewModel.viewState.collectAsState().value CustomizableAppBarScaffold( collapsedAppBarContent = { CollapsedTitle(state.title) }, extendedAppBarContent = { // Rendering header (Avatar + Text + Link) state.header.Render() }, navigationAction = {}, collapsedAppBarContentAlignment = Alignment.CenterHorizontally, ) { paddingValues -> Column( horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier .padding(paddingValues) .padding(horizontal = 16.dp) .fillMaxWidth() .verticalScroll(rememberScrollState()), ) { Spacer(Modifier.height(32.dp)) with(state) { // Rendering QR code section (QR code + tag) qrCode.Render(Modifier.padding(bottom = 16.dp)) // Redering Text Text( text = disclaimer.resolve(), appearance = TextAppearance.DefaultBody, ) // Rendering actions (3 Circular Buttons) actions.Render(Modifier.padding(bottom = 32.dp)) } } } }

@Composable
fun QrCodeScreenExample() {
    val viewModel = QrCodeExampleViewModel()
    val state = viewModel.viewState.collectAsState().value
    CustomizableAppBarScaffold(
        collapsedAppBarContent = {
            CollapsedTitle(state.title)
        },
        extendedAppBarContent = {
            // Rendering header (Avatar + Text + Link)
            state.header.Render()
        },
        navigationAction = {},
        collapsedAppBarContentAlignment = Alignment.CenterHorizontally,
    ) { paddingValues ->
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .padding(paddingValues)
                .padding(horizontal = 16.dp)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState()),
        ) {
            Spacer(Modifier.height(32.dp))
            with(state) {
        // Rendering QR code section (QR code + tag)
                qrCode.Render(Modifier.padding(bottom = 16.dp))
                // Redering Text
                Text(
                    text = disclaimer.resolve(),
                    appearance = TextAppearance.DefaultBody,
                )
                // Rendering actions (3 Circular Buttons)
                actions.Render(Modifier.padding(bottom = 32.dp))
            }
        }
    }
}

In the code above, we simplify the screen code by using the`Render()`function to automatically handle UI component data binding and rendering. Instead of manually binding UI properties, we**instantiate the auto-generated UI models (ViewItems) in the ViewModel.** The`Render()`function then takes care of binding the data and creating the corresponding Composable components.

**ViewModel Example**

class QrCodeExampleViewModel : ViewModel() {

val viewState: MutableStateFlow<ExampleState> = MutableStateFlow(loadData())

private fun loadData() = ExampleState(

// Instantiation of the auto-generated UI models

title = "User",

header = PaymentHeaderCompositeExampleViewItem(

profileName = Text.Raw("User"),

avatarImage = ImageSource.Resource(R.drawable.il_preview_thumbnail),

avatarAction = { },

link = Text.Raw("wise.com/pay/me/wiser1226"),

linkAction = {},

),

qrCode = QrCodeCompositeExampleViewItem(

content = Text.Raw("<https://www.google.com/search?q=wise+payments+limited&>"),

link = Text.Raw("@wiser121"),

),

actions = HorizontalCircularButtonsViewItem(

items = generateButtons(),

alignment = Alignment.CenterHorizontally

),

disclaimer = Text.Raw("User disclaimer, that's here for legal reasons."),

)

private fun generateButtons() = listOf(

CircularButtonItem(

text = Text.Raw("Share"),

iconDrawableRes = com.wise.resources.R.drawable.ic_share_android_24dp,

enabled = true,

onClick = { },

),

CircularButtonItem(

text = Text.Raw("Download"),

iconDrawableRes = com.wise.resources.R.drawable.ic_download_24dp,

enabled = true,

onClick = { },

),

CircularButtonItem(

text = Text.Raw("Scan"),

iconDrawableRes = com.wise.resources.R.drawable.ic_scan_qr_code_24dp,

enabled = true,

onClick = { },

),

)

internal data class ExampleState(

val title: String,

val header: PaymentHeaderCompositeExampleViewItem,

val qrCode: QrCodeCompositeExampleViewItem,

val actions: HorizontalCircularButtonsViewItem,

val disclaimer: Text,

)

}

class QrCodeExampleViewModel : ViewModel() { val viewState: MutableStateFlow<ExampleState> = MutableStateFlow(loadData()) private fun loadData() = ExampleState( // Instantiation of the auto-generated UI models title = "User", header = PaymentHeaderCompositeExampleViewItem( profileName = Text.Raw("User"), avatarImage = ImageSource.Resource(R.drawable.il_preview_thumbnail), avatarAction = { }, link = Text.Raw("wise.com/pay/me/wiser1226"), linkAction = {}, ), qrCode = QrCodeCompositeExampleViewItem( content = Text.Raw("<https://www.google.com/search?q=wise+payments+limited&>"), link = Text.Raw("@wiser121"), ), actions = HorizontalCircularButtonsViewItem( items = generateButtons(), alignment = Alignment.CenterHorizontally ), disclaimer = Text.Raw("User disclaimer, that's here for legal reasons."), ) private fun generateButtons() = listOf( CircularButtonItem( text = Text.Raw("Share"), iconDrawableRes = com.wise.resources.R.drawable.ic_share_android_24dp, enabled = true, onClick = { }, ), CircularButtonItem( text = Text.Raw("Download"), iconDrawableRes = com.wise.resources.R.drawable.ic_download_24dp, enabled = true, onClick = { }, ), CircularButtonItem( text = Text.Raw("Scan"), iconDrawableRes = com.wise.resources.R.drawable.ic_scan_qr_code_24dp, enabled = true, onClick = { }, ), ) internal data class ExampleState( val title: String, val header: PaymentHeaderCompositeExampleViewItem, val qrCode: QrCodeCompositeExampleViewItem, val actions: HorizontalCircularButtonsViewItem, val disclaimer: Text, ) }

class QrCodeExampleViewModel : ViewModel() {
val viewState: MutableStateFlow<ExampleState> = MutableStateFlow(loadData())
    private fun loadData() = ExampleState(
      // Instantiation of the auto-generated UI models
        title = "User",
        header = PaymentHeaderCompositeExampleViewItem(
            profileName = Text.Raw("User"),
            avatarImage = ImageSource.Resource(R.drawable.il_preview_thumbnail),
            avatarAction = { },
            link = Text.Raw("wise.com/pay/me/wiser1226"),
            linkAction = {},
        ),
        qrCode = QrCodeCompositeExampleViewItem(
            content = Text.Raw("<https://www.google.com/search?q=wise+payments+limited&>"),
            link = Text.Raw("@wiser121"),
        ),
        actions = HorizontalCircularButtonsViewItem(
            items = generateButtons(),
            alignment = Alignment.CenterHorizontally
        ),
        disclaimer = Text.Raw("User disclaimer, that's here for legal reasons."),
    )
    private fun generateButtons() = listOf(
        CircularButtonItem(
            text = Text.Raw("Share"),
            iconDrawableRes = com.wise.resources.R.drawable.ic_share_android_24dp,
            enabled = true,
            onClick = { },
        ),
        CircularButtonItem(
            text = Text.Raw("Download"),
            iconDrawableRes = com.wise.resources.R.drawable.ic_download_24dp,
            enabled = true,
            onClick = { },
        ),
        CircularButtonItem(
            text = Text.Raw("Scan"),
            iconDrawableRes = com.wise.resources.R.drawable.ic_scan_qr_code_24dp,
            enabled = true,
            onClick = { },
        ),
    )
    internal data class ExampleState(
        val title: String,
        val header: PaymentHeaderCompositeExampleViewItem,
        val qrCode: QrCodeCompositeExampleViewItem,
        val actions: HorizontalCircularButtonsViewItem,
        val disclaimer: Text,
    )
}

*In the example ViewModel, we instantiate the ViewItems with dummy data. In a real-world scenario, we would map and format the properties of the domain models into these UI models.*

The ViewItems are simply instantiated as regular data classes. Generating them automatically**eliminates the need to manually create separate models for the UI layer**which is another benefit of this approach. As typically, UI-specific models are used to map domain objects to, which promotes encapsulation and, more importantly, enables proper data formatting within the ViewModel.

For example, a`Contact`domain object might include a creation date, which could be presented in the UI with a`(New)`tag based on a date threshold. By creating models aligned with the Composable’s interface, you ensure the data is formatted as needed for display, avoiding the temptation to include this logic in the view layer.

However, it’s crucial to carefully design the Composable’s interface to**avoid exposing implementation details** unrelated to the semantic purpose of the component. For example, let’s consider a Composable called`Alert`. You might need to decide between a property like`alertType`(e.g., [Neutral, Positive, Negative]) or`alertColor`(e.g., [Grey, Green, Red]). It’s better to always choose the semantic representation (`alertType`), as it describes what to render rather than how to render it. This prevents the ViewModel from holding those implementation details — part of the view layer responsibilities — and promotes better separation of concerns.

**Composable Example**

@AutoViewItem

@Composable

internal fun QrCodeCompositeExample(

modifier: Modifier = Modifier,

content: String?,

state: QrCodeState = QrCodeState.Enabled,

link: String,

) {

Card(modifier) {

Column(

horizontalAlignment = Alignment.CenterHorizontally,

modifier = Modifier.wrapContentSize(),

) {

QrCode(

modifier = Modifier.size(220.dp),

content = content,

state = state,

)

Spacer(modifier = Modifier.height(Size8))

Box(

modifier

.background(

color = NeptuneTheme.color.background.screen,

RoundedCornerShape(NeptuneTheme.shape.radius.buttonsAndControls),

)

.padding(

vertical = Size8,

horizontal = Size24,

),

) {

Text(link, TextAppearance.DefaultLink)

}

}

}

}

@AutoViewItem @Composable internal fun QrCodeCompositeExample( modifier: Modifier = Modifier, content: String?, state: QrCodeState = QrCodeState.Enabled, link: String, ) { Card(modifier) { Column( horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.wrapContentSize(), ) { QrCode( modifier = Modifier.size(220.dp), content = content, state = state, ) Spacer(modifier = Modifier.height(Size8)) Box( modifier .background( color = NeptuneTheme.color.background.screen, RoundedCornerShape(NeptuneTheme.shape.radius.buttonsAndControls), ) .padding( vertical = Size8, horizontal = Size24, ), ) { Text(link, TextAppearance.DefaultLink) } } } }

@AutoViewItem
@Composable
internal fun QrCodeCompositeExample(
    modifier: Modifier = Modifier,
    content: String?,
    state: QrCodeState = QrCodeState.Enabled,
    link: String,
) {
    Card(modifier) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.wrapContentSize(),
        ) {
            QrCode(
                modifier = Modifier.size(220.dp),
                content = content,
                state = state,
            )
            Spacer(modifier = Modifier.height(Size8))
            Box(
                modifier
                    .background(
                        color = NeptuneTheme.color.background.screen,
                        RoundedCornerShape(NeptuneTheme.shape.radius.buttonsAndControls),
                    )
                    .padding(
                        vertical = Size8,
                        horizontal = Size24,
                    ),
            ) {
                Text(link, TextAppearance.DefaultLink)
            }
        }
    }
}

For simplicity, we’re only showing one composable used to generate**ViewItems**. What’s important to highlight here is the`@AutoViewItem`annotation, which is responsible for**automatically generating the UI models**.

In addition, we have other Composables that are not shown in this example which aren’t used to generate**ViewItems**. These include some of our custom building blocks, such as`CustomizableAppBarScaffold`—a custom AppBar solution used at**Wise**to ensure consistent screen layouts—and`Text`, which is a custom wrapper for text resources resolution that is used throughout the app.

###### Implementation (using KSP)

First, let’s start with a brief introduction to Kotlin Symbol Processing (KSP). KSP enhances annotation processing by analyzing Kotlin code directly, unlike KAPT, which compiles Kotlin code into Java stubs before processing. Since stub generation is expensive and significantly impacts build speed, KSP offers faster build times and more efficient processing. This makes KSP a modern and powerful replacement for KAPT in Kotlin-based projects. You can learn more about KSP[here](https://kotlinlang.org/docs/ksp-overview.html).

Traditionally, annotation processors were primarily used by third-party libraries due to their complexity and impact on compilation times. However, KSP**offers a simpler learning curve, making it a practical tool for everyday Android development**. So instead of building a generic library for auto-generating ViewModels — which can be complex and difficult to maintain — we’ve implemented a custom solution tailored to our project’s needs. Generic libraries that attempt to cover all possible use cases often become unwieldy and challenging to maintain.

Our custom plugin enables us to annotate UI component Composables with the`@AutoViewItem`annotation, streamlining the generation of ViewItems**without over-engineering a highly configurable**, hard-to-maintain library.

When a Composable is annotated with`@AutoViewItem`, the plugin automatically generates the required data class and data binding code.

###### Example

To begin, we annotate a composable function, as shown in the example below:

@AutoViewItem(SpacingRoleType.Default)

@Composable

internal fun QrCodeCompositeExample(

modifier: Modifier = Modifier,

content: String?,

state: QrCodeState = QrCodeState.Enabled,

link: String,

) {

// ...

}

@AutoViewItem(SpacingRoleType.Default) @Composable internal fun QrCodeCompositeExample( modifier: Modifier = Modifier, content: String?, state: QrCodeState = QrCodeState.Enabled, link: String, ) { // ... }

@AutoViewItem(SpacingRoleType.Default)
@Composable
internal fun QrCodeCompositeExample(
    modifier: Modifier = Modifier,
    content: String?,
    state: QrCodeState = QrCodeState.Enabled,
    link: String,
) {
  // ...
}

Our KSP processor processes this annotation and generates the following code:

// Generated code

public data class QrCodeCompositeExampleViewItem(

public val content: Text?,

public val state: QrCodeState = QrCodeState.Enabled,

public val link: Text,

) : ViewItem {

public override val spacingRole: SpacingRole

get() = SpacingRole.Default

@Composable

public override fun Render(modifier: Modifier): Unit {

QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link =

link.resolve())

}

}

// Generated code public data class QrCodeCompositeExampleViewItem( public val content: Text?, public val state: QrCodeState = QrCodeState.Enabled, public val link: Text, ) : ViewItem { public override val spacingRole: SpacingRole get() = SpacingRole.Default @Composable public override fun Render(modifier: Modifier): Unit { QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link = link.resolve()) } }

// Generated code
public data class QrCodeCompositeExampleViewItem(
  public val content: Text?,
  public val state: QrCodeState = QrCodeState.Enabled,
  public val link: Text,
) : ViewItem {
  public override val spacingRole: SpacingRole
    get() = SpacingRole.Default
@Composable
  public override fun Render(modifier: Modifier): Unit {
    QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link =
        link.resolve())
  }
}

**Note:** Not all types will align with those of the original composable. For example, we’re replacing`String`with our custom type`Text`, this is done to avoid the need for resolving string resources when instantiating ViewItems in the ViewModel.

###### Custom Types in Our Implementation

Our implementation relies heavily on our project’s existing codebase. To provide clarity, here’s an overview of the key custom types we use:

- **Text** **Type:**This custom`Text`class wraps text resource references, enabling the use of both plain strings and string resource references. This approach eliminates the need to resolve string resources within the ViewModel.
- **ImageSource** **Type**: Similar to`Text`, the`ImageSource`class handles images by referencing resource IDs, URIs, or bitmaps, ensuring that image resources don’t need to be resolved in the ViewModel.
- **ViewItem** **Interface**: The`ViewItem`interface guarantees that each presentation model includes a`Render`function and a`SpacingRole`, ensuring consistency across all components.
- **SpacingRole** **Type**: This property manages spacing behavior between items, dynamically adjusting it based on the items above and bellow.

Below is a simplified version of these custom types:

sealed class Text {

data class StringRes private constructor(

@androidx.annotation.StringRes val resId: Int,

val args: List<Text>

) : Text()

data class Raw(val text: String) : Text()

}

sealed class ImageSource {

data class Uri(val uri: String, val headers: Map<String, String> = emptyMap()) : ImageSource()

data class Image(val asset: ImageBitmap) : ImageSource()

data class Resource(val id: Int) : ImageSource()

}

interface ViewItem {

@Composable

fun Render(

modifier: Modifier,

)

@Composable

fun Render() {

Render(Modifier)

}

val spacingRole: SpacingRole

}

enum class SpacingRole(

internal val vertical: VerticalSpacingRole,

internal val horizontal: HorizontalSpacingRole,

) {

Text(VerticalSpacingRole.Text, HorizontalSpacingRole.Default),

Image(VerticalSpacingRole.Image, HorizontalSpacingRole.Default),

Option(VerticalSpacingRole.Option, HorizontalSpacingRole.Default),

Button(VerticalSpacingRole.Button, HorizontalSpacingRole.Default),

Section(VerticalSpacingRole.Section, HorizontalSpacingRole.Default),

Default(VerticalSpacingRole.Default, HorizontalSpacingRole.Default),

Card(VerticalSpacingRole.Default, HorizontalSpacingRole.Card),

Chip(VerticalSpacingRole.Default, HorizontalSpacingRole.Chip),

None(VerticalSpacingRole.None, HorizontalSpacingRole.None),

}

sealed class Text { data class StringRes private constructor( @androidx.annotation.StringRes val resId: Int, val args: List<Text> ) : Text() data class Raw(val text: String) : Text() } sealed class ImageSource { data class Uri(val uri: String, val headers: Map<String, String> = emptyMap()) : ImageSource() data class Image(val asset: ImageBitmap) : ImageSource() data class Resource(val id: Int) : ImageSource() } interface ViewItem { @Composable fun Render( modifier: Modifier, ) @Composable fun Render() { Render(Modifier) } val spacingRole: SpacingRole } enum class SpacingRole( internal val vertical: VerticalSpacingRole, internal val horizontal: HorizontalSpacingRole, ) { Text(VerticalSpacingRole.Text, HorizontalSpacingRole.Default), Image(VerticalSpacingRole.Image, HorizontalSpacingRole.Default), Option(VerticalSpacingRole.Option, HorizontalSpacingRole.Default), Button(VerticalSpacingRole.Button, HorizontalSpacingRole.Default), Section(VerticalSpacingRole.Section, HorizontalSpacingRole.Default), Default(VerticalSpacingRole.Default, HorizontalSpacingRole.Default), Card(VerticalSpacingRole.Default, HorizontalSpacingRole.Card), Chip(VerticalSpacingRole.Default, HorizontalSpacingRole.Chip), None(VerticalSpacingRole.None, HorizontalSpacingRole.None), }

sealed class Text {
    data class StringRes private constructor(
        @androidx.annotation.StringRes val resId: Int,
        val args: List<Text>
    ) : Text()
    data class Raw(val text: String) : Text()
}
sealed class ImageSource {
    data class Uri(val uri: String, val headers: Map<String, String> = emptyMap()) : ImageSource()
    data class Image(val asset: ImageBitmap) : ImageSource()
    data class Resource(val id: Int) : ImageSource()
}
interface ViewItem {
    @Composable
    fun Render(
        modifier: Modifier,
    )
    @Composable
    fun Render() {
        Render(Modifier)
    }
    val spacingRole: SpacingRole
}
enum class SpacingRole(
    internal val vertical: VerticalSpacingRole,
    internal val horizontal: HorizontalSpacingRole,
) {
    Text(VerticalSpacingRole.Text, HorizontalSpacingRole.Default),
    Image(VerticalSpacingRole.Image, HorizontalSpacingRole.Default),
    Option(VerticalSpacingRole.Option, HorizontalSpacingRole.Default),
    Button(VerticalSpacingRole.Button, HorizontalSpacingRole.Default),
    Section(VerticalSpacingRole.Section, HorizontalSpacingRole.Default),
    Default(VerticalSpacingRole.Default, HorizontalSpacingRole.Default),
    Card(VerticalSpacingRole.Default, HorizontalSpacingRole.Card),
    Chip(VerticalSpacingRole.Default, HorizontalSpacingRole.Chip),
    None(VerticalSpacingRole.None, HorizontalSpacingRole.None),
}

###### **Additional Notes**

The`Render`function includes an optional`Modifier`, making it easy to adjust the layout and placement of`ViewItems`within a screen.

###### LazyList Use Case

In addition to the auto-generated`ViewItems`based on the`ViewItem`interface, we introduce another interface called`KeyedListViewItem`. This interface extends`ViewItem`by adding a**key (identifier)**, which is a requirement for rendering items dynamically in lists like`LazyColumn`. This approach allows us to automatically render these view items in lazy lists and even mix different`ViewItem`objects to dynamically compose a screen.

So for each`@AutoViewItem`annotation,**two models**are generated: one implementing the`ViewItem`interface and another implementing the`KeyedListViewItem` interface. In addition to the previously generated code, the following is also generated:

// Generated code

public data class QrCodeCompositeExampleListViewItem(

public override val key: Any,

public val content: Text?,

public val state: QrCodeState = QrCodeState.Enabled,

public val link: Text,

) : ViewItem, KeyedListViewItem {

public override val spacingRole: SpacingRole

get() = SpacingRole.Default

@Composable

public override fun Render(modifier: Modifier): Unit {

QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link =

link.resolve())

}

@Composable

public override fun Render(): Unit {

Render(Modifier)

}

}

// Generated code public data class QrCodeCompositeExampleListViewItem( public override val key: Any, public val content: Text?, public val state: QrCodeState = QrCodeState.Enabled, public val link: Text, ) : ViewItem, KeyedListViewItem { public override val spacingRole: SpacingRole get() = SpacingRole.Default @Composable public override fun Render(modifier: Modifier): Unit { QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link = link.resolve()) } @Composable public override fun Render(): Unit { Render(Modifier) } }

// Generated code
public data class QrCodeCompositeExampleListViewItem(
  public override val key: Any,
  public val content: Text?,
  public val state: QrCodeState = QrCodeState.Enabled,
  public val link: Text,
) : ViewItem, KeyedListViewItem {
  public override val spacingRole: SpacingRole
    get() = SpacingRole.Default
@Composable
  public override fun Render(modifier: Modifier): Unit {
    QrCodeCompositeExample(modifier = modifier, content = content?.resolve(), state = state, link =
        link.resolve())
  }
  @Composable
  public override fun Render(): Unit {
    Render(Modifier)
  }
}

We can then reference a list of`KeyedListViewItem`in a`LazyColumn`, where the items will be rendered automatically. Additionally, different spacing will be applied for different`ViewItem`types using our`SpacingRole`logic:

val viewModel: UserViewModel by viewModels()

LazyColumn {

renderItemsColumn(viewModel.state.items)

}

val viewModel: UserViewModel by viewModels() LazyColumn { renderItemsColumn(viewModel.state.items) }

val viewModel: UserViewModel by viewModels()
LazyColumn {
    renderItemsColumn(viewModel.state.items)
}

We use a custom function here,`renderItemsColumn`, which is an extension function that contains logic to extract the key from`KeyedListViewItem`and apply the appropriate spacing based on the`SpacingRole`. A heuristic is then used to calculate spacing between two`SpacingRole`s.

Below is a simplified version of our custom implementation for this functionality:

interface KeyedListViewItem {

val key: Any

@Composable

fun Render()

val spacingRole: SpacingRole

}

fun LazyListScope.renderItemsColumn(

items: List<KeyedListViewItem>,

) {

val previousItem = if (index > 0) items[index - 1] else null

val item = items[index]

val spacing = calculateSpacing(

previousItem = previousItem,

item = item,

)

Box(

modifier = Modifier.padding(spacing)

) {

item.Render()

}

}

interface KeyedListViewItem { val key: Any @Composable fun Render() val spacingRole: SpacingRole } fun LazyListScope.renderItemsColumn( items: List<KeyedListViewItem>, ) { val previousItem = if (index > 0) items[index - 1] else null val item = items[index] val spacing = calculateSpacing( previousItem = previousItem, item = item, ) Box( modifier = Modifier.padding(spacing) ) { item.Render() } }

interface KeyedListViewItem {
  val key: Any
    @Composable
    fun Render()
    val spacingRole: SpacingRole
}

fun LazyListScope.renderItemsColumn(
    items: List<KeyedListViewItem>,
) {
  val previousItem = if (index > 0) items[index - 1] else null
  val item = items[index]

  val spacing = calculateSpacing(
      previousItem = previousItem,
      item = item,
  )

  Box(
      modifier = Modifier.padding(spacing)
  ) {
      item.Render()
  }
}

###### Building the KSP Plugin

While much has already been written about creating KSP plugins, this section provides an overview of our specific implementation. Our setup is organized into two main modules:

- **view-item-generator-annotation**: Defines the`AutoViewItem`annotation.
- **view-item-generator-processor**: Manages the processing and code generation tasks.

###### Annotation Module

The annotation module includes the definition of the`AutoViewItem`annotation class:

package com.wise.viewitemgenerator.annotation

@Target(AnnotationTarget.FUNCTION)

@Retention(AnnotationRetention.SOURCE)

annotation class AutoViewItem(

val spacingRole: SpacingRoleType = SpacingRoleType.Default,

val viewItemCustomName: String = "",

)

enum class SpacingRoleType { Text, Image, DisplayText, Option, Button, Section, Default, Card, Chip, None, }

fun spacingRoleTypeFrom(value: String?): SpacingRoleType? {

return value?.let { SpacingRoleType.valueOf(value) }

}

package com.wise.viewitemgenerator.annotation @Target(AnnotationTarget.FUNCTION) @Retention(AnnotationRetention.SOURCE) annotation class AutoViewItem( val spacingRole: SpacingRoleType = SpacingRoleType.Default, val viewItemCustomName: String = "", ) enum class SpacingRoleType { Text, Image, DisplayText, Option, Button, Section, Default, Card, Chip, None, } fun spacingRoleTypeFrom(value: String?): SpacingRoleType? { return value?.let { SpacingRoleType.valueOf(value) } }

package com.wise.viewitemgenerator.annotation

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.SOURCE)
annotation class AutoViewItem(
    val spacingRole: SpacingRoleType = SpacingRoleType.Default,
    val viewItemCustomName: String = "",
)

enum class SpacingRoleType { Text, Image, DisplayText, Option, Button, Section, Default, Card, Chip, None, }

fun spacingRoleTypeFrom(value: String?): SpacingRoleType? {
    return value?.let { SpacingRoleType.valueOf(value) }
}

###### Processor Module

![](https://miro.medium.com/v2/resize:fit:1136/format:webp/1*F6K-0S5xpBwDSS7vdsoFlA.png)

The Processor Module handles the core logic for processing and generating code. It is organized into four main sub-packages:

- **Base:**Contains the main processor classes as well a utility class with external type definitions we are using.
- **Models:**Defines the data models used for generating code, which are generated by the node visitors (`KSDefaultVisitor`).
- **Input:**Includes node visitors (`KSDefaultVisitor`) responsible for parsing Composables annotated with`@AutoViewItem`and them generating`ViewItem`and`ViewItemProp`models for code generation.
- **Output:**Utilizes KotlinPoet to generate the ViewItems actual code.

**AutoViewItemFunctionVisitor**

This class is responsible for parsing Composable functions annotated with`@AutoViewItem`and delegating property processing to`FunctionPropsVisitor`. It also performs basic validation checks.

internal class AutoViewItemFunctionVisitor(

private val resolver: Resolver,

private val logger: KSPLogger,

) : KSDefaultVisitor<Unit, ViewItem?>() {

// ...

}

internal class AutoViewItemFunctionVisitor( private val resolver: Resolver, private val logger: KSPLogger, ) : KSDefaultVisitor<Unit, ViewItem?>() { // ... }

internal class AutoViewItemFunctionVisitor(
    private val resolver: Resolver,
    private val logger: KSPLogger,
) : KSDefaultVisitor<Unit, ViewItem?>() {
    // ...
}

Full implementation [Here.](https://gist.github.com/juaw-transferwise/e452cf9548b2ad19b07e7243000cd682?file=AutoViewItemFunctionVisitor.kt)

**FunctionPropsVisitor**

The`FunctionPropsVisitor`class processes each property of a Composable function, handling validation and data extraction.

**Note:**KSP currently does not provide detailed information on default argument values beyond`KSValueParameter.hasDefault`. Consequently, we have to manually extract and store default values as raw strings for use during code generation. This limitation is documented in[Issue #268 on the KSP GitHub page](https://github.com/google/ksp/issues/268).

internal class FunctionPropsVisitor(

private val resolver: Resolver,

private val logger: KSPLogger,

) : KSDefaultVisitor<MutableList<ViewItemExcludedProp>, ViewItemProp?>() {

// ...

}

internal class FunctionPropsVisitor( private val resolver: Resolver, private val logger: KSPLogger, ) : KSDefaultVisitor<MutableList<ViewItemExcludedProp>, ViewItemProp?>() { // ... }

internal class FunctionPropsVisitor(
    private val resolver: Resolver,
    private val logger: KSPLogger,
) : KSDefaultVisitor<MutableList<ViewItemExcludedProp>, ViewItemProp?>() {
   // ... 
}

Full implementation [Here](https://gist.github.com/juaw-transferwise/e452cf9548b2ad19b07e7243000cd682?file=FunctionPropsVisitor.kt)

**Models**

The models store parsed data in a format suitable for code generation.

package com.wise.viewitemgenerator.models

import com.google.devtools.ksp.symbol.KSFile

import com.wise.viewitemgenerator.annotation.SpacingRoleType

internal data class ContainingFile(

val file: KSFile,

val packageName: String,

val fileName: String,

)

internal data class ViewItem(

val name: String,

val composableName: String,

val containingFile: ContainingFile,

val spacingRole: SpacingRoleType?,

val props: List<ViewItemProp>,

)

package com.wise.viewitemgenerator.models import com.google.devtools.ksp.symbol.KSFile import com.wise.viewitemgenerator.annotation.SpacingRoleType internal data class ContainingFile( val file: KSFile, val packageName: String, val fileName: String, ) internal data class ViewItem( val name: String, val composableName: String, val containingFile: ContainingFile, val spacingRole: SpacingRoleType?, val props: List<ViewItemProp>, )

package com.wise.viewitemgenerator.models

import com.google.devtools.ksp.symbol.KSFile
import com.wise.viewitemgenerator.annotation.SpacingRoleType

internal data class ContainingFile(
    val file: KSFile,
    val packageName: String,
    val fileName: String,
)

internal data class ViewItem(
    val name: String,
    val composableName: String,
    val containingFile: ContainingFile,
    val spacingRole: SpacingRoleType?,
    val props: List<ViewItemProp>,
)

package com.wise.viewitemgenerator.models

import com.google.devtools.ksp.symbol.KSTypeReference

@JvmInline

internal value class PropType(val value: KSTypeReference)

internal data class ViewItemProp(

val name: String,

val domainType: DomainType,

val type: PropType,

val defaultValue: String?,

)

enum class DomainType {

COLOR, STRING, DIMENSION, REGULAR

}

sealed class ViewItemExcludedProp {

data object Modifier : ViewItemExcludedProp()

}

package com.wise.viewitemgenerator.models import com.google.devtools.ksp.symbol.KSTypeReference @JvmInline internal value class PropType(val value: KSTypeReference) internal data class ViewItemProp( val name: String, val domainType: DomainType, val type: PropType, val defaultValue: String?, ) enum class DomainType { COLOR, STRING, DIMENSION, REGULAR } sealed class ViewItemExcludedProp { data object Modifier : ViewItemExcludedProp() }

package com.wise.viewitemgenerator.models

import com.google.devtools.ksp.symbol.KSTypeReference

@JvmInline
internal value class PropType(val value: KSTypeReference)

internal data class ViewItemProp(
    val name: String,
    val domainType: DomainType,
    val type: PropType,
    val defaultValue: String?,
)

enum class DomainType {
    COLOR, STRING, DIMENSION, REGULAR
}

sealed class ViewItemExcludedProp {
    data object Modifier : ViewItemExcludedProp()
}

**ViewItemFileSpecBuilder**

This builder uses**KotlinPoet**to generate the`ViewItem` code, incorporating custom logic to meet specific requirements.

internal object ViewItemFileSpecBuilder {

operator fun invoke(viewItems: Sequence<ViewItem>): Iterable<FileSpec> {

// ...

}

}

internal object ViewItemFileSpecBuilder { operator fun invoke(viewItems: Sequence<ViewItem>): Iterable<FileSpec> { // ... } }

internal object ViewItemFileSpecBuilder {

    operator fun invoke(viewItems: Sequence<ViewItem>): Iterable<FileSpec> {
        // ...
    }
    
}

Full implementation[Here](https://gist.github.com/juaw-transferwise/e452cf9548b2ad19b07e7243000cd682?file=ViewItemFileSpecBuilder.kt)

**ViewItemGeneratorProcessor**

The`ViewItemGeneratorProcessor`and`ViewItemGeneratorProcessorProvider`orchestrate the processing and code generation logic.

class ViewItemGeneratorProcessor(

private val codeGenerator: CodeGenerator,

private val logger: KSPLogger,

) : SymbolProcessor {

// ...

}

class ViewItemGeneratorProcessorProvider : SymbolProcessorProvider {

//...

}

class ViewItemGeneratorProcessor( private val codeGenerator: CodeGenerator, private val logger: KSPLogger, ) : SymbolProcessor { // ... } class ViewItemGeneratorProcessorProvider : SymbolProcessorProvider { //... }

class ViewItemGeneratorProcessor(
    private val codeGenerator: CodeGenerator,
    private val logger: KSPLogger,
) : SymbolProcessor {
  // ... 
}
class ViewItemGeneratorProcessorProvider : SymbolProcessorProvider {
  //...
}

Full Implementations: [ViewItemGeneratorProcessor](https://gist.github.com/juaw-transferwise/e452cf9548b2ad19b07e7243000cd682?file=ViewItemGeneratorProcessor.kt),[ViewItemGeneratorProcessorProvider](https://gist.github.com/juaw-transferwise/e452cf9548b2ad19b07e7243000cd682?file=ViewItemGeneratorProcessorProvider.kt)

###### Design System Integration and Conclusion

Auto-generating UI presentation models can offer significant benefits to any project, and these**advantages are amplified when integrated with a comprehensive design system** featuring multiple UI components, such as the one used at Wise. Our primary goal was to design UI presentation models that reflect the structure of our UI components and their render functions. This approach eliminates the need for manual binding of view items and enables the creation of dynamic lists of view items without adding extra logic to the views.

While maintaining these presentation models manually was manageable at first, the approach**became increasingly time-consuming as the project grew**. Any changes to UI components required corresponding updates to the models, increasing the risk of bugs and API inconsistencies. Additionally, this approach was not always followed consistently in every screen when using custom or composite components, leading to cases where logic ended up in the view layer. By adopting Kotlin Symbol Processing (KSP), we automated and brought consistency to our screens, resulting in a more efficient and maintainable codebase.

That said, there are trade-offs. Relying on auto-generated code increases build times and can make the codebase harder to navigate, as it’s not as straightforward to trace functionality by “jumping” to a specific function. This can contribute to a feeling of reduced robustness. However, the benefits — such as improved consistency, reduced manual coding, and better test coverage by centralizing logic in the ViewModel — make this approach worthwhile so far.

It’s important to note that this is an ongoing project, and we‘re’ actively working on improvements. For instance, functionally, one key focus improving the handling of default arguments. In the current implementation, default arguments are parsed as simple strings, lacking the processing to handle multiline arguments, extra imports among other complexities. We also have tests to cover a wide range of Composable configurations — thought that could be an article in itself.

**License:**All code samples in this article are licensed under the[Apache License, Version 2.0](https://apache.org/licenses/LICENSE-2.0).

**P.S.**Interested in working with us? We’re hiring![Check out our open Engineering roles here](https://wise.jobs/engineering). -->

This article is previously published on [proandroiddev.com.](https://proandroiddev.com/automating-ui-model-generation-with-ksp-4b1d9d1f5c95)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Automating UI Model Generation With KSP",
  "desc": "In this article, we’ll explore how to generate UI presentation models directly from Composable function definitions using KSP. This approach helps us structure and model data within the presentation layer (ViewModel) in a way that naturally aligns with UI components, leading to reduced maintenance overhead.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/automating-ui-model-generation-with-ksp.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
