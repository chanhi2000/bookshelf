---
lang: en-US
title: "Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose"
description: "Article(s) > Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose"
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
      content: "Article(s) > Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose"
    - property: og:description
      content: "Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/creating-a-modern-bottom-navigation-bar-with-a-curved-cut-out-for-a-docked-floating-action-button-in-jetpack-compose.html
prev: /programming/java-android/articles/README.md
date: 2025-02-13
isOriginal: false
author: Souvik Sarkar
cover: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IZoZYJI3YRqe97HcpN4Spw.png
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
  name="Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose"
  desc="A Step-by-Step Guide to Designing Custom Navigation Panels with Smooth Curves and Docked Action Buttons"
  url="https://droidcon.com/2025/02/13/creating-a-modern-bottom-navigation-bar-with-a-curved-cut-out-for-a-docked-floating-action-button-in-jetpack-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IZoZYJI3YRqe97HcpN4Spw.png"/>

###### A Step-by-Step Guide to Designing Custom Navigation Panels with Smooth Curves and Docked Action Buttons

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IZoZYJI3YRqe97HcpN4Spw.png)

Preview of Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button

Floating Action Button or Docked Action Button — these have become very common UI designs for any app and yet, we faced significant challenges while implementing the same in Jetpack Compose.

We struggled so that you don’t have to anymore. In this tutorial, I’ll break it down into simple steps so that you can do it very easily. In this example, I will be sharing the codes for the bottom navigation panel with a centered curved cutout.

<!-- ###### Part 1: Creating the Custom Shape for the Cutout

###### The`BottomNavShape`Class:

To create the curved cutout effect, we define a custom`Shape`that carves out a semicircle and smooth curves from the navigation bar.

###### **The Code:**

class BottomNavShape(

private val cornerRadius: Float, // Rounded corners at the panel's top

private val dockRadius: Float, // Size of the cutout

) : Shape {

override fun createOutline(

size: Size,

layoutDirection: LayoutDirection,

density: Density,

): Outline {

// baseRect: Creates a rounded rectangle covering the entire size, with rounded top corners. This is the basic shape of the bottom navigation.

val baseRect = Path().apply {

addRoundRect(

RoundRect(

Rect(Offset.Zero, Offset(size.width, size.height)),

topLeft = CornerRadius(cornerRadius, cornerRadius),

topRight = CornerRadius(cornerRadius, cornerRadius),

),

)

}

// rect1: Creates a rectangle from the left edge to just before the center "dock", filling the full height. Will be cut later to add a corner radius

val rect1 = Path().apply {

addRoundRect(

RoundRect(

Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)),

topLeft = CornerRadius(cornerRadius, cornerRadius),

),

)

}

// rect1A: Same rectangle as rect1, but has a smaller topLeft Radius to create a small difference

val rect1A = Path().apply {

addRoundRect(

RoundRect(

Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)),

topLeft = CornerRadius(cornerRadius, cornerRadius),

topRight = CornerRadius(32f, 32f),

),

)

}

// rect1B: This calculates the area between rect1 and rect1A and is one of the path that cuts into baseRect.

val rect1B = Path.combine(

operation = PathOperation.Difference,

path1 = rect1,

path2 = rect1A,

)

// rect2: Creates a rectangle from just after the center "dock" to the right edge, filling the full height.

val rect2 = Path().apply {

addRoundRect(

RoundRect(

Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)),

topRight = CornerRadius(cornerRadius, cornerRadius),

),

)

}

// rect2A: Same rectangle as rect2, but has a smaller topRight Radius to create a small difference

val rect2A = Path().apply {

addRoundRect(

RoundRect(

Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)),

topRight = CornerRadius(cornerRadius, cornerRadius),

topLeft = CornerRadius(32f, 32f),

),

)

}

// rect2B: This calculates the area between rect2 and rect2A and is one of the path that cuts into baseRect.

val rect2B = Path.combine(

operation = PathOperation.Difference,

path1 = rect2,

path2 = rect2A,

)

// circle: Creates a circle at the center, just above the bottom navigation, creating the "dock" for the floating action button.

val circle = Path().apply {

addOval(

Rect(

Offset(size.width / 2 - dockRadius, -dockRadius),

Offset(size.width / 2 + dockRadius, dockRadius),

),

)

}

// path1: Subtracts the "circle" path from the base rectangle, creating the main shape with the cut-out for the dock.

val path1 = Path.combine(

operation = PathOperation.Difference,

path1 = baseRect,

path2 = circle,

)

// path2: Subtracts the "rect1B" from the base rectangle, create more curvature on the sides

val path2 = Path.combine(

operation = PathOperation.Difference,

path1 = path1,

path2 = rect1B,

)

// path: Subtracts the "rect2B" from the base rectangle, create more curvature on the sides

val path = Path.combine(

operation = PathOperation.Difference,

path1 = path2,

path2 = rect2B,

)

// Return the final path

return Outline.Generic(path)

}

}

class BottomNavShape( private val cornerRadius: Float, // Rounded corners at the panel's top private val dockRadius: Float, // Size of the cutout ) : Shape { override fun createOutline( size: Size, layoutDirection: LayoutDirection, density: Density, ): Outline { // baseRect: Creates a rounded rectangle covering the entire size, with rounded top corners. This is the basic shape of the bottom navigation. val baseRect = Path().apply { addRoundRect( RoundRect( Rect(Offset.Zero, Offset(size.width, size.height)), topLeft = CornerRadius(cornerRadius, cornerRadius), topRight = CornerRadius(cornerRadius, cornerRadius), ), ) } // rect1: Creates a rectangle from the left edge to just before the center "dock", filling the full height. Will be cut later to add a corner radius val rect1 = Path().apply { addRoundRect( RoundRect( Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)), topLeft = CornerRadius(cornerRadius, cornerRadius), ), ) } // rect1A: Same rectangle as rect1, but has a smaller topLeft Radius to create a small difference val rect1A = Path().apply { addRoundRect( RoundRect( Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)), topLeft = CornerRadius(cornerRadius, cornerRadius), topRight = CornerRadius(32f, 32f), ), ) } // rect1B: This calculates the area between rect1 and rect1A and is one of the path that cuts into baseRect. val rect1B = Path.combine( operation = PathOperation.Difference, path1 = rect1, path2 = rect1A, ) // rect2: Creates a rectangle from just after the center "dock" to the right edge, filling the full height. val rect2 = Path().apply { addRoundRect( RoundRect( Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)), topRight = CornerRadius(cornerRadius, cornerRadius), ), ) } // rect2A: Same rectangle as rect2, but has a smaller topRight Radius to create a small difference val rect2A = Path().apply { addRoundRect( RoundRect( Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)), topRight = CornerRadius(cornerRadius, cornerRadius), topLeft = CornerRadius(32f, 32f), ), ) } // rect2B: This calculates the area between rect2 and rect2A and is one of the path that cuts into baseRect. val rect2B = Path.combine( operation = PathOperation.Difference, path1 = rect2, path2 = rect2A, ) // circle: Creates a circle at the center, just above the bottom navigation, creating the "dock" for the floating action button. val circle = Path().apply { addOval( Rect( Offset(size.width / 2 - dockRadius, -dockRadius), Offset(size.width / 2 + dockRadius, dockRadius), ), ) } // path1: Subtracts the "circle" path from the base rectangle, creating the main shape with the cut-out for the dock. val path1 = Path.combine( operation = PathOperation.Difference, path1 = baseRect, path2 = circle, ) // path2: Subtracts the "rect1B" from the base rectangle, create more curvature on the sides val path2 = Path.combine( operation = PathOperation.Difference, path1 = path1, path2 = rect1B, ) // path: Subtracts the "rect2B" from the base rectangle, create more curvature on the sides val path = Path.combine( operation = PathOperation.Difference, path1 = path2, path2 = rect2B, ) // Return the final path return Outline.Generic(path) } }

class BottomNavShape(
  private val cornerRadius: Float, // Rounded corners at the panel's top
  private val dockRadius: Float,   // Size of the cutout
) : Shape {
  override fun createOutline(
    size: Size,
    layoutDirection: LayoutDirection,
    density: Density,
): Outline {

    // baseRect: Creates a rounded rectangle covering the entire size, with rounded top corners. This is the basic shape of the bottom navigation.
    val baseRect = Path().apply {
      addRoundRect(
        RoundRect(
          Rect(Offset.Zero, Offset(size.width, size.height)),
          topLeft = CornerRadius(cornerRadius, cornerRadius),
          topRight = CornerRadius(cornerRadius, cornerRadius),
        ),
      )
    }

    // rect1: Creates a rectangle from the left edge to just before the center "dock", filling the full height.  Will be cut later to add a corner radius
    val rect1 = Path().apply {
      addRoundRect(
        RoundRect(
          Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)),
          topLeft = CornerRadius(cornerRadius, cornerRadius),
        ),
      )
    }

    // rect1A: Same rectangle as rect1, but has a smaller topLeft Radius to create a small difference
    val rect1A = Path().apply {
      addRoundRect(
        RoundRect(
          Rect(Offset.Zero, Offset(size.width / 2 - dockRadius + 4f, size.height)),
          topLeft = CornerRadius(cornerRadius, cornerRadius),
          topRight = CornerRadius(32f, 32f),
        ),
      )
    }

    // rect1B: This calculates the area between rect1 and rect1A and is one of the path that cuts into baseRect.
    val rect1B = Path.combine(
      operation = PathOperation.Difference,
      path1 = rect1,
      path2 = rect1A,
    )

    // rect2: Creates a rectangle from just after the center "dock" to the right edge, filling the full height.
    val rect2 = Path().apply {
      addRoundRect(
        RoundRect(
          Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)),
          topRight = CornerRadius(cornerRadius, cornerRadius),
        ),
      )
    }

    // rect2A: Same rectangle as rect2, but has a smaller topRight Radius to create a small difference
    val rect2A = Path().apply {
      addRoundRect(
        RoundRect(
          Rect(Offset(size.width / 2 + dockRadius - 4f, 0f), Offset(size.width, size.height)),
          topRight = CornerRadius(cornerRadius, cornerRadius),
          topLeft = CornerRadius(32f, 32f),
        ),
      )
    }

    // rect2B: This calculates the area between rect2 and rect2A and is one of the path that cuts into baseRect.
    val rect2B = Path.combine(
      operation = PathOperation.Difference,
      path1 = rect2,
      path2 = rect2A,
    )

    // circle: Creates a circle at the center, just above the bottom navigation, creating the "dock" for the floating action button.
    val circle = Path().apply {
      addOval(
        Rect(
          Offset(size.width / 2 - dockRadius, -dockRadius),
          Offset(size.width / 2 + dockRadius, dockRadius),
        ),
      )
    }

    // path1: Subtracts the "circle" path from the base rectangle, creating the main shape with the cut-out for the dock.
    val path1 = Path.combine(
      operation = PathOperation.Difference,
      path1 = baseRect,
      path2 = circle,
    )

    // path2: Subtracts the "rect1B" from the base rectangle, create more curvature on the sides
    val path2 = Path.combine(
      operation = PathOperation.Difference,
      path1 = path1,
      path2 = rect1B,
    )

    // path: Subtracts the "rect2B" from the base rectangle, create more curvature on the sides
    val path = Path.combine(
      operation = PathOperation.Difference,
      path1 = path2,
      path2 = rect2B,
    )

    // Return the final path
    return Outline.Generic(path)
  }
}

###### **How It Works:**

1. **Base Shape:**Start with a rounded rectangle (the main navigation panel).
2. **Central Cutout:**Subtract a semicircle (`addOval`) from the base.
3. **Side Curves:**Use`Path.combine`with`PathOperation.Difference`to carve out curved sections on both sides of the cutout.
4. **Final Outline:**The result is a navigation bar with smooth curves and a docked area for the floating button.

###### Part 2: Building the Navigation Panel

###### The`BottomNavPanelWithCutOut`Composable:

@Composable

fun BoxScope.BottomNavPanelWithCutOut() {

Box(

modifier = Modifier

.align(Alignment.BottomCenter)

.fillMaxWidth()

.height(64.dp)

.clip(

BottomNavShape(

cornerRadius = with(LocalDensity.current) { 20.dp.toPx() },

dockRadius = with(LocalDensity.current) { 38.dp.toPx() },

),

) // Apply the custom shape

.background(Color.Blue)

) {

Row(

modifier = Modifier

.fillMaxWidth()

.padding(horizontal = 56.dp),

horizontalArrangement = Arrangement.SpaceBetween

) {

// Navigation icons (left and right of the cutout)

}

}

}

@Composable fun BoxScope.BottomNavPanelWithCutOut() { Box( modifier = Modifier .align(Alignment.BottomCenter) .fillMaxWidth() .height(64.dp) .clip( BottomNavShape( cornerRadius = with(LocalDensity.current) { 20.dp.toPx() }, dockRadius = with(LocalDensity.current) { 38.dp.toPx() }, ), ) // Apply the custom shape .background(Color.Blue) ) { Row( modifier = Modifier .fillMaxWidth() .padding(horizontal = 56.dp), horizontalArrangement = Arrangement.SpaceBetween ) { // Navigation icons (left and right of the cutout) } } }

@Composable  
fun BoxScope.BottomNavPanelWithCutOut() {  
  Box(
    modifier = Modifier
      .align(Alignment.BottomCenter)
      .fillMaxWidth()
      .height(64.dp)
      .clip(
        BottomNavShape(
          cornerRadius = with(LocalDensity.current) { 20.dp.toPx() },
          dockRadius = with(LocalDensity.current) { 38.dp.toPx() },
        ),
      ) // Apply the custom shape
      .background(Color.Blue)
  ) {
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 56.dp),
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      // Navigation icons (left and right of the cutout)
    }
  }
}

###### **Key Features:**

- `clip()`: Uses our`BottomNavShape`to create the curved cutout.
- `padding(horizontal = 56.dp)`: Ensures icons stay clear of the central cutout area.
- `Arrangement.SpaceBetween`: Distributes icons evenly across the available space.

###### Part 3: Adding the Docked/Floating Button

###### The`BottomNavPanel`Composable:

@Composable

fun BoxScope.BottomNavPanel() {

Box(

modifier = Modifier

.align(Alignment.BottomCenter)

.fillMaxWidth()

) {

BottomNavPanelWithCutOut(...) // The navigation panel

// Floating button positioned over the cutout

Box(

modifier = Modifier

.align(Alignment.BottomCenter)

.padding(bottom = 32.dp)

.size(58.dp)

.clip(CircleShape)

.background(Color.Blue),

contentAlignment = Alignment.Center,

) {

// Your central action button (e.g., the camera icon)

}

}

}

@Composable fun BoxScope.BottomNavPanel() { Box( modifier = Modifier .align(Alignment.BottomCenter) .fillMaxWidth() ) { BottomNavPanelWithCutOut(...) // The navigation panel // Floating button positioned over the cutout Box( modifier = Modifier .align(Alignment.BottomCenter) .padding(bottom = 32.dp) .size(58.dp) .clip(CircleShape) .background(Color.Blue), contentAlignment = Alignment.Center, ) { // Your central action button (e.g., the camera icon) } } }

@Composable  
fun BoxScope.BottomNavPanel() {  
  Box(
    modifier = Modifier
      .align(Alignment.BottomCenter)
      .fillMaxWidth()
    ) {
    BottomNavPanelWithCutOut(...) // The navigation panel
    
    // Floating button positioned over the cutout
    Box(
      modifier = Modifier
        .align(Alignment.BottomCenter)
        .padding(bottom = 32.dp)
        .size(58.dp)
        .clip(CircleShape)
        .background(Color.Blue),
      contentAlignment = Alignment.Center,
    ) {
      // Your central action button (e.g., the camera icon)
    }
  }
}

**Why This Works:**

- The`Box`layout stacks the navigation panel and floating button.
- `padding(bottom = 24.dp)`positions the button slightly above the panel.
- `clip(CircleShape)`creates the circular button shape.

###### Tips for Customization

1. Adjust`cornerRadius`and`dockRadius`to control the curve sizes.
2. Modify the floating button’s`size`and`padding`to match your design.
3. Use`Surface`or`shadow`modifiers to add elevation effects.

###### Conclusion

There you have it. By leveraging Jetpack Compose’s`Shape`and layout system, you’ve created a professional-grade navigation bar with a curved cutout and docked/floating action button.

Give it a go. If you face any issues, feel free to drop a comment and I will certainly share the solution for you.

> **Souvik Sarkar**, founder @[Kaffein](https://kaffein.in/), — writes about the hurdles of first-time founders.

This article is previously published on [proandroiddev.com.](https://proandroiddev.com/creating-a-modern-bottom-navigation-bar-with-a-curved-cut-out-for-a-docked-floating-action-button-1e4455413024) -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating a Modern Bottom Navigation Bar with a Curved Cut-Out for a Docked/Floating Action Button in Jetpack Compose",
  "desc": "A Step-by-Step Guide to Designing Custom Navigation Panels with Smooth Curves and Docked Action Buttons",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/creating-a-modern-bottom-navigation-bar-with-a-curved-cut-out-for-a-docked-floating-action-button-in-jetpack-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
