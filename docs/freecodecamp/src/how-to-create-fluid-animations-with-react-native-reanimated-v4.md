---
lang: en-US
title: "How to Create Fluid Animations with React Native Reanimated v4"
description: "Article(s) > How to Create Fluid Animations with React Native Reanimated v4"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Fluid Animations with React Native Reanimated v4"
    - property: og:description
      content: "How to Create Fluid Animations with React Native Reanimated v4"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-fluid-animations-with-react-native-reanimated-v4.html
prev: /programming/js-react/articles/README.md
date: 2025-11-18
isOriginal: false
author:
  - name: Balogun Wahab
    url : https://freecodecamp.org/news/author/03balogun/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763052228638/4416e81d-b76e-4c40-987e-0aff1d82ff7b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Fluid Animations with React Native Reanimated v4"
  desc="Reanimated 4 brings Cascading Style Sheets (CSS) animations to React Native while keeping full backward compatibility with its worklet-based API. You can now build 60+ frames-per-second (FPS) animations using familiar web syntax, or drop down to work..."
  url="https://freecodecamp.org/news/how-to-create-fluid-animations-with-react-native-reanimated-v4"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763052228638/4416e81d-b76e-4c40-987e-0aff1d82ff7b.png"/>

Reanimated 4 brings Cascading Style Sheets (CSS) animations to React Native while keeping full backward compatibility with its worklet-based API. You can now build 60+ frames-per-second (FPS) animations using familiar web syntax, or drop down to worklets for gesture-driven interactions.

The library requires React Native's New Architecture (Fabric), so you'll need version 0.76 or newer.

In this tutorial, you'll learn:

- How to use CSS transitions for state-driven animations
- When to use worklets for gesture and scroll interactions
- How to migrate from Reanimated 3 to 4
- Practical patterns for collapsing headers, bottom sheets, and carousels
- Performance optimization techniques

::: note Prerequisites

You should have:

- React Native 0.76+ with New Architecture enabled
- Basic React hooks knowledge (`useState`, `useEffect`)
- Node.js and npm or yarn are installed

:::

---

## Installation and Setup

To get started, you'll need to install the required packages:

```sh
# For Expo
npx expo install react-native-reanimated react-native-worklets

# For React Native CLI  
npm install react-native-reanimated react-native-worklets
cd ios && pod install && cd ..
```

Update <VPIcon icon="fa-brands fa-js"/>`babel.config.js` (the plugin must be last):

```js title="babel.config.js"
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-worklets/plugin', // Must be last
  ],
};
```

Then clear the cache and rebuild:

```sh
npm start -- --reset-cache
npx react-native run-ios
```

---

## Understanding the Two Approaches

React Native Reanimated is an animation library that runs animations on the native thread instead of the JavaScript thread. This means your animations stay smooth even when your JavaScript code is busy processing data or handling user interactions.

Unlike React Native's built-in Animated API, Reanimated executes animation logic directly on the UI thread. This eliminates the performance bottleneck caused by communication between JavaScript and native code, which enables Reanimated to maintain 60 FPS even during complex operations.

Reanimated 4 offers two animation systems, each designed for different use cases.

### CSS Animations

CSS animations work declaratively, meaning you describe what you want to happen rather than how to make it happen. You define which properties should animate (like width, color, or opacity), specify the timing and easing, then simply change the values through React state updates. Reanimated automatically handles the animation between the old and new values.

This approach excels at predictable, state-driven animations where you know both the starting and ending states. It's ideal for:

- Showing and hiding UI elements (modals, tooltips, notifications)
- Expanding and collapsing content (accordions, dropdown menus)
- Visual feedback for state changes (button hover effects, selection highlights)
- Loading indicators and progress animations
- Color and opacity transitions

### Worklets

Worklets take a different approach by giving you imperative, frame-by-frame control over animations. They run on the UI thread and use "shared values" – special variables that can be accessed and modified from both JavaScript and native code without any communication overhead.

Worklets are essential for interactive animations that need to respond in real-time to user input or continuous data streams. They're best for:

- Gesture-driven interactions (drag-and-drop, swipe-to-dismiss, pinch-to-zoom)
- Scroll-linked effects (parallax images, collapsing headers, sticky elements)
- Physics-based animations (spring effects, momentum scrolling)
- Sensor-based animations (responding to device orientation)
- Any animation requiring dynamic, real-time control

Now that you understand the two approaches Reanimated offers, let's look at how to migrate from version 3 if you're already using the library.

---

## How to Migrate from Reanimated Version 3 to Version 4

If you're currently using Reanimated 3, you'll be happy to know that version 4 maintains backward compatibility. Your existing animations using worklets, shared values, and `useAnimatedStyle` will continue to work without modification.

But version 4 introduces some architectural changes and removes deprecated APIs, so you'll need to make a few updates to your project configuration and code. Let's walk through the migration process step by step.

### What Changed in Version 4

The most significant change is that worklets have been extracted into a separate package called `react-native-worklets-core`. This modular approach allows other libraries beyond Reanimated to leverage worklet functionality.

Because of this separation, you'll need to update your Babel configuration. Change the plugin from `react-native-reanimated/plugin` to `react-native-worklets/plugin`.

Version 4 also exclusively supports React Native's New Architecture (Fabric). The old Paper renderer is no longer compatible. If your project hasn't migrated to the New Architecture yet, you'll need to either upgrade to React Native 0.76+ (which has New Architecture enabled by default) or stay on Reanimated 3.x until you're ready to make that transition.

### Removed APIs

Several APIs that were deprecated in version 3 have been removed in version 4. Here's what you need to replace:

- `useAnimatedGestureHandler` → Use the `Gesture` API from react-native-gesture-handler 2.x instead
- `useWorkletCallback` → Use `useCallback` with the `'worklet'` directive
- `combineTransition` → Use `EntryExitTransition.entering().exiting()`

The `useScrollViewOffset` hook has been renamed to `useScrollOffset`. The old name still works but is deprecated, so update your code to use the new name.

### Spring Configuration Change

The spring animation configuration has changed to feel more natural. The `duration` parameter now represents "perceptual duration" rather than exact milliseconds. The actual animation runs approximately 1.5 times longer than the specified duration, creating springs that feel more organic and less mechanical.

```js
// Version 3
withSpring(100, { duration: 300 }) // Runs for exactly 300ms

// Version 4  
withSpring(100, { duration: 200 }) // Runs for approximately 300ms
```

If you need to maintain the exact timing from version 3, divide your duration values by 1.5. ### Step-by-Step Migration Process

Here's how to migrate your project from Reanimated 3 to version 4:

#### Step 1

Verify your project is using React Native 0.76 or newer with New Architecture enabled. Check your iOS Podfile for `ENV['RCT_NEW_ARCH_ENABLED'] = '1'` and your Android gradle.properties for `newArchEnabled=true`.

#### Step 2

Install the new versions of Reanimated and the worklets package:

```sh
npm install react-native-reanimated@^4.1.0 react-native-worklets@^0.5.0
```

#### Step 3

Update your `babel.config.js` to use the new worklets plugin:

```js
module.exports = {
  plugins: [
    'react-native-worklets/plugin', // Changed from react-native-reanimated/plugin
  ],
};
```

#### Step 4

Search your codebase for the removed APIs and replace them:

- Replace `useAnimatedGestureHandler` with the `Gesture` API
- Replace `useWorkletCallback` with `useCallback` and add `'worklet'` directive
- Replace `combineTransition` with `EntryExitTransition.entering().exiting()`
- Rename `useScrollViewOffset` to `useScrollOffset`

#### Step 5

Rebuild your native apps:

```sh
cd ios && pod install && cd ..
npx react-native run-ios
# or for Android
npx react-native run-android
```

After completing these steps, your app should be running on Reanimated 4 with all your existing animations working as before. You're now ready to start using the new CSS animation features alongside your existing worklet-based animations. In the next section, you'll learn how to build animations using the CSS syntax.

---

## CSS Animations Tutorial

CSS animations provide a clean, declarative way to handle transitions that are triggered by state changes. Instead of manually managing animation values, you simply declare which properties should animate and how, then update your component state – Reanimated handles the rest.

This approach is particularly powerful for animations where you know the start and end states ahead of time. It's perfect for UI elements that toggle between different visual states, like modals appearing and disappearing, buttons providing feedback on press, or content expanding and collapsing.

### Basic Transitions

A transition animates the change between two property values. When you specify a property that should transition, Reanimated automatically interpolates between the old and new values over the specified duration.

Let's look at an expandable card that grows when tapped:

```jsx
import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';

function ExpandableCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Pressable onPress={() => setExpanded(!expanded)}>
      <Animated.View style={{
        width: expanded ? 300 : 200,
        height: expanded ? 200 : 100,
        backgroundColor: expanded ? '#4ade80' : '#86efac',
        transitionProperty: ['width', 'height', 'backgroundColor'],
        transitionDuration: 300,
        transitionTimingFunction: 'ease-in-out',
      }}>
        <Text>Tap to toggle</Text>
      </Animated.View>
    </Pressable>
  );
}
```

Here's what's happening: The card's width, height, and background color are controlled by the `expanded` state. The `transitionProperty` array tells Reanimated which properties to animate. When `expanded` changes, Reanimated smoothly animates from the current values to the new values over 300 milliseconds, using an ease-in-out timing function that starts slow, speeds up, then slows down again.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762274975831/7e25aa04-24b8-43eb-9db0-a3c088c44132.gif)

### Keyframe Animations

While transitions handle changes between two states, keyframe animations let you define multi-step sequences with precise control over each stage. You create an object where each key represents a percentage of the animation timeline, and the value defines what properties should look like at that point.

Here's a pulsing badge that scales up and fades slightly, then returns to normal:

```jsx
const pulseAnimation = {
  '0%': { scale: 1, opacity: 1 },
  '50%': { scale: 1.05, opacity: 0.8 },
  '100%': { scale: 1, opacity: 1 },
};

function PulsingBadge() {
  return (
    <Animated.View style={{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#ef4444',
      animationName: pulseAnimation,
      animationDuration: 2000,
      animationIterationCount: 'infinite',
    }} />
  );
}
```

The animation starts at 0% (normal size and opacity), grows and fades at the 50% mark, then returns to the original state at 100%. By setting `animationIterationCount` to 'infinite', the animation loops continuously. This creates the pulsing effect you often see on notification badges or live indicators.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762274903470/d10d856f-03b8-4d6c-b616-22cbea3434c2.gif)

### Built-in Animations

Reanimated includes a collection of pre-built animations for common entrance and exit effects. These save you from writing animation configurations for standard patterns like fading, sliding, and zooming.

Here's a modal that fades in when shown and fades out when hidden:

```jsx
import { FadeIn, FadeOut } from 'react-native-reanimated';

function Modal({ visible, children }) {
  if (!visible) return null;

  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
    >
      {children}
    </Animated.View>
  );
}
```

The `entering` prop automatically applies the fade-in animation when the component mounts, and `exiting` applies the fade-out before unmounting. Other commonly used built-in animations include `SlideInRight`, `SlideOutLeft` (for drawer-style entrances), and `ZoomIn`, `ZoomOut` (for attention-grabbing pop-ins).

Now that you understand CSS animations for state-driven transitions, let's explore worklets for creating interactive animations that respond to user input in real-time.

---

## Worklets Tutorial

While CSS animations excel at predefined state transitions, many animations need to respond dynamically to user input. This is where worklets come in. Worklets give you frame-by-frame control over animations, allowing them to follow gestures, scroll position, or any other real-time input source.

Interactive animations differ from CSS animations in that they don't have predefined start and end states. Instead, they continuously update based on user input. For example, a draggable element needs to follow your finger precisely as you move it – there's no way to know ahead of time where you'll drag it. This requires imperative control, where you directly manipulate animation values in response to events.

### Basic Worklet Animation

Shared values are the foundation of worklet-based animations. They're special variables that exist simultaneously in both the JavaScript and UI threads, allowing you to update them from JavaScript while the UI thread reads them to update the display – all without any communication overhead.

Here's a button that scales down when pressed and bounces back when released:

```jsx
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

function BouncyButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.9); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text>Press Me</Text>
      </Animated.View>
    </Pressable>
  );
}
```

The `useSharedValue(1)` creates a shared value initialized to 1 (normal scale). The `useAnimatedStyle` hook creates a style object that depends on this shared value and runs on the UI thread. When you press the button, `scale.value = withSpring(0.9)` updates the shared value, and `withSpring` creates a spring animation to the new value. The `useAnimatedStyle` hook automatically re-runs, updating the transform with the new scale value.

### Gesture Animations

Gestures require even tighter integration between user input and animation. The react-native-gesture-handler library provides high-performance gesture recognition that works seamlessly with Reanimated.

First, install the gesture handler:

```sh
npm install react-native-gesture-handler
cd ios && pod install && cd ..
```

Next, you need to wrap your app with `GestureHandlerRootView`. This component sets up the gesture handling system at the root of your application. Without it, gestures won't work. Think of it as activating the gesture system for your entire app:

```jsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content goes here */}
    </GestureHandlerRootView>
  );
}
```

Now you can create gesture-driven animations. Here's a box you can drag around the screen that springs back to center when released:

```jsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

function DraggableBox() {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value += event.changeX;
      offsetY.value += event.changeY;
    })
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}
```

The `Gesture.Pan()` creates a pan gesture recognizer. The `.onChange()` callback fires continuously while you're dragging – `event.changeX` and `event.changeY` tell you how much the finger moved since the last frame. By adding these values to the offsets, the box follows your finger. When you lift your finger, `.onEnd()` fires and springs the box back to the center (0, 0).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762275456257/3a536406-d678-46eb-9cfe-f689428d3412.gif)

### Scroll-Linked Animations

Another common use case for worklets is creating effects that respond to scroll position, like headers that shrink as you scroll down or parallax backgrounds.

Here's a header that collapses as you scroll:

```jsx :collapsed-lines
function ParallaxHeader() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 150],
      [200, 60],
      'clamp'
    );

    return { height };
  });

  return (
    <>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text>Header</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Content */}
      </Animated.ScrollView>
    </>
  );
}
```

The `useAnimatedScrollHandler` creates a scroll event handler that runs on the UI thread. Every time you scroll, it updates `scrollY` with the current scroll position. The `interpolate` function maps the scroll position to the header height – when scrollY is 0 (top of the scroll), height is 200. When scrollY reaches 150, height is 60. The 'clamp' option prevents the height from going outside this range.

With these fundamentals of CSS animations and worklets covered, let's look at how to apply them to common real-world scenarios.

---

## Real-World Patterns

Now that you understand both CSS animations and worklets, let's combine them to build three patterns you'll frequently encounter in production apps. These examples demonstrate when to use each animation approach and how to structure your code for maintainability.

In this section, you'll learn how to build a collapsing header that shrinks as users scroll (using worklets for scroll tracking), a bottom sheet that responds to drag gestures (using worklets for gesture control), and a swipe-to-delete interaction for list items (combining worklets for gesture detection with animations for the deletion effect).

### Collapsing Header

A collapsing header is a navigation bar that starts tall and shrinks as you scroll down. This pattern is popular because it maximizes content space while keeping navigation accessible. You'll use worklets here because the animation needs to follow the scroll position in real-time.

```jsx
function CollapsibleHeader() {
  const scrollY = useSharedValue(0);
  const HEADER_MAX = 200;
  const HEADER_MIN = 60;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HEADER_MAX - HEADER_MIN],
      [HEADER_MAX, HEADER_MIN],
      'clamp'
    ),
  }));

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text>My App</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <View style={{ height: 1000, padding: 16 }}>
          <Text>Scroll to see header collapse</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
```

This pattern tracks scroll position in `scrollY` and uses `interpolate` to map it to header height. When you're at the top (`scrollY = 0`), the header is `200` pixels tall. As you scroll down `140` pixels, the header shrinks to 60 pixels. The animation happens on every frame as you scroll, which is why worklets are necessary – CSS animations couldn't track scroll position this smoothly.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762326945758/044ca9d6-dd6e-4891-b9f4-3a4dc8590b58.gif)

### Bottom Sheet

A bottom sheet is a panel that slides up from the bottom of the screen, commonly used for action menus, filters, or additional content. Users can drag it to different heights or dismiss it with a swipe down. This requires worklets because it needs frame-by-frame gesture tracking.

```jsx :collapsed-lines
function BottomSheet({ children }) {
  const translateY = useSharedValue(300);
  const context = useSharedValue({ y: 0 });

  const pan = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onChange((event) => {
      translateY.value = Math.max(
        event.translationY + context.value.y,
        -300
      );
    })
    .onEnd((event) => {
      if (event.velocityY > 500) {
        translateY.value = withSpring(300); // Dismiss
      } else if (translateY.value > -100) {
        translateY.value = withSpring(-50); // Collapsed
      } else {
        translateY.value = withSpring(-300); // Expanded
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.bottomSheet, animatedStyle]}>
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
```

The bottom sheet starts off-screen at translateY = 300. When you start dragging, `.onStart()` saves the starting position in `context`. As you drag, `.onChange()` updates the position, but `Math.max()` prevents it from going below -300 (fully expanded). When you release, `.onEnd()` checks the velocity – if you swiped down quickly (velocity > 500), it dismisses. Otherwise, it snaps to either the collapsed (-50) or expanded (-300) position based on where you released it.

![Bottom sheet demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1763051520805/dd09d10f-4d77-40a9-be9c-ef85d69be69e.gif)

### Swipe to Delete

Swipe-to-delete lets users remove items from a list by swiping left. It's a common pattern in email apps and to-do lists. This uses worklets for gesture tracking and timing functions for the deletion animation.

```jsx :collapsed-lines
function SwipeToDelete({ children, onDelete }) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(60);

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onChange((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        translateX.value = withTiming(-500, { duration: 200 });
        itemHeight.value = withTiming(0, { duration: 200 }, () => {
          runOnJS(onDelete)();
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: itemHeight.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.item, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
```

The `.activeOffsetX([-10, 10])` setting means the gesture only activates after you've moved 10 pixels horizontally, preventing accidental triggers during vertical scrolling. The `if (event.translationX < 0)` check ensures you can only swipe left, not right. If you swipe past -100 pixels and release, it triggers the deletion: the item slides off-screen (-500), the height collapses to 0, and `runOnJS` calls your delete function from the UI thread back to JavaScript.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763051815614/6e2c2d60-3d2e-49ec-9fb5-c17db00e9120.gif)

These patterns demonstrate the power of combining Reanimated's animation approaches with gesture handling. Now, let's look at how to keep these animations performing smoothly.

---

## Performance Optimizations

Even though Reanimated runs on the UI thread, poorly structured animations can still drop frames. Here are four key optimizations that will keep your animations consistently smooth at 60 FPS.

### Memoize Animations

Every time your component re-renders, any animations you create inside the render function are recreated. This wastes memory and processing time.

Don't do this – creating a new animation object on every render:

```js
{items.map(item => (
  <Animated.View entering={FadeIn.duration(300)} key={item.id} />
))}
```

Instead, create the animation once outside the component or memoize it:

```js
const fadeIn = FadeIn.duration(300);
{items.map(item => (
  <Animated.View entering={fadeIn} key={item.id} />
))}
```

By storing the animation in a constant, you create it once and reuse the same object for all items. This reduces memory allocation and garbage collection, keeping your animations smooth even with long lists.

### Use useDerivedValue

If you're doing expensive calculations inside `useAnimatedStyle`, those calculations run every frame, even if the dependencies haven't changed.

Don't do this – recalculating every frame:

```js
const animatedStyle = useAnimatedStyle(() => ({
  width: Math.min(Math.max(offset.value * 2, 100), 500),
}));
```

Instead, use `useDerivedValue` to compute the value only when dependencies change:

```js
const width = useDerivedValue(() => 
  Math.min(Math.max(offset.value * 2, 100), 500)
);

const animatedStyle = useAnimatedStyle(() => ({
  width: width.value,
}));
```

Now the complex calculation only runs when `offset.value` changes, not on every frame. The `useAnimatedStyle` just reads the pre-computed width, which is much faster.

### Batch Updates

When you update multiple shared values, each update can trigger a separate re-render. This creates unnecessary work for the UI thread.

Don't do this – triggering multiple re-renders:

```js
scale.value = withSpring(1.2);
opacity.value = withSpring(0.8);
```

Instead, batch the updates using `runOnUI`:

```js
runOnUI(() => {
  'worklet';
  scale.value = withSpring(1.2);
  opacity.value = withSpring(0.8);
})();
```

The `runOnUI` function ensures both updates happen in the same frame, so the UI only re-renders once. This is especially important when updating many values at once, like in complex gestures or choreographed animations.

### Prefer Transform Over Layout

Animating layout properties like width, height, or margins forces React Native to recalculate the position of every element that depends on the changing element. This is expensive.

Don't do this – expensive layout recalculation:

```js
width: withSpring(newWidth)
```

Instead, use transform properties, which only affect the visual appearance without triggering layout:

```js
transform: [{ scaleX: withSpring(scale) }]
```

Transform operations are hardware-accelerated and don't affect layout, making them dramatically faster. Whenever possible, use `translateX/Y` instead of changing position, `scale` instead of changing size, and `rotate` instead of changing orientation.

These optimizations will keep your animations buttery smooth. Now let's look at how to debug issues when they arise.

---

## Debugging Tips

Even with proper setup, you may encounter issues with animations. Here are the most common problems and their solutions, written as complete troubleshooting steps.

### Animations Not Working

If your animations aren't running at all, the most common cause is a missing or incorrectly configured Babel plugin. Open your `babel.config.js` file and verify that `react-native-worklets/plugin` is present in the plugins array and is the last plugin in the list. The order matters because the worklets plugin needs to process your code after all other transformations.

After confirming the plugin is correctly configured, clear your Metro bundler cache by running `npm start -- --reset-cache`, then rebuild your app completely. Simply reloading JavaScript won't work because Babel transformations happen during the build process.

### App Crashes on Startup or Reload

If your app crashes immediately after installing Reanimated or when you reload, the native modules likely aren't properly linked. With React Native 0.76+, this usually means the pods weren't installed or the native build is out of sync.

For iOS, run `cd ios && pod install && cd ..` then do a clean build with `npx react-native run-ios`. For Android, clean the build with `cd android && ./gradlew clean && cd ..` then rebuild with `npx react-native run-android`.

If you're getting build errors about missing headers or modules, make sure you've added both `react-native-reanimated` and `react-native-worklets` to your package.json dependencies.

### "TurboModuleRegistry Not Found"

If you see an error message saying "TurboModuleRegistry.get('NativeReanimated'): 'NativeReanimated' could not be found", it means the native code hasn't been properly linked to your JavaScript code.

First, verify you're using React Native 0.76 or newer, as Reanimated 4 requires the New Architecture. Check your `ios/Podfile` for `ENV['RCT_NEW_ARCH_ENABLED'] = '1'` and `android/gradle.properties` for `newArchEnabled=true`.

Then rebuild completely: `cd ios && pod install && cd .. && npx react-native run-ios`.

### Logging and Inspecting Shared Values

If you try to debug worklets using `console.log()`, you'll notice nothing appears in your console. This is because worklets run on the UI thread, which doesn't have direct access to the JavaScript console.

To log values from worklets, use the `useDerivedValue` hook:

```js
const offset = useSharedValue(0);

useDerivedValue(() => {
  console.log('Offset:', offset.value);
  return offset.value;
});
```

For more advanced debugging, React Native's built-in debugger (accessed through dev menu → "Open Debugger") now supports debugging both threads. You can set breakpoints in worklets and inspect shared values in real-time.

### Monitor Performance

To see if your animations are actually running at 60 FPS, enable the Performance Monitor built into React Native. Shake your device (or press Cmd+D in the iOS simulator, Cmd+M in Android emulator) to open the dev menu, then select "Show Perf Monitor".

The monitor displays two critical numbers: JS thread FPS and UI thread FPS. Your animations run on the UI thread, so watch that number. If it stays at 60 FPS, your animations are smooth. If it drops below 60, your animations are skipping frames and will appear janky. The JS thread FPS shows whether your React code is keeping up – if this drops, it indicates issues with your component renders, not your animations.

For more detailed debugging information and advanced troubleshooting, check the [<VPIcon icon="fas fa-globe"/>official debugging guide here](https://docs.swmansion.com/react-native-reanimated/docs/guides/debugging/).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1763053624344/7aeffb5f-4829-4871-bd49-6e589adeb8ad.png)

---

## Conclusion

Reanimated 4 gives you two powerful approaches to animation: CSS animations for simple state changes and worklets for complex, interactive animations that need real-time control.

Start with CSS transitions when building your next animation feature. They're simpler to write, easier to maintain, and perfect for the majority of UI animations. Reach for worklets when you need gesture control, scroll effects, or any animation that requires frame-by-frame updates.

The [<VPIcon icon="fas fa-globe"/>official documentation](https://docs.swmansion.com/react-native-reanimated) provides complete API references, detailed guides, and interactive examples. The [GitHub repository (<VPIcon icon="iconfont icon-github"/>`software-mansion/react-native-reanimated`)](https://github.com/software-mansion/react-native-reanimated) includes production-ready sample code you can study and adapt.

Building smooth animations isn't just about technical capability – it's about creating experiences that feel responsive, intuitive, and delightful to use. Reanimated 4 makes achieving that standard straightforward, whether you're animating a simple button press or building a complex screen transition with multiple coordinated elements.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Fluid Animations with React Native Reanimated v4",
  "desc": "Reanimated 4 brings Cascading Style Sheets (CSS) animations to React Native while keeping full backward compatibility with its worklet-based API. You can now build 60+ frames-per-second (FPS) animations using familiar web syntax, or drop down to work...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-fluid-animations-with-react-native-reanimated-v4.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
