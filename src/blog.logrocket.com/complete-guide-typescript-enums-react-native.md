---
lang: en-US
title: "A complete guide to TypeScript enums in React Native"
description: "Article(s) > A complete guide to TypeScript enums in React Native"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - typescript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A complete guide to TypeScript enums in React Native"
    - property: og:description
      content: "A complete guide to TypeScript enums in React Native"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-typescript-enums-react-native.html
prev: /programming/js-react/articles/README.md
date: 2025-02-19
isOriginal: false
author:
  - name: Kayode Adeniyi
    url : https://blog.logrocket.com/author/kayodeadeniyi/
cover: /assets/image/blog.logrocket.com/complete-guide-typescript-enums-react-native/banner.jpeg
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

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A complete guide to TypeScript enums in React Native"
  desc="Learn everything you need to know about using React Context — a great feature that enables you to manage and share state across the React application."
  url="https://blog.logrocket.com/complete-guide-typescript-enums-react-native"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/complete-guide-typescript-enums-react-native/banner.jpeg"/>

When building React Native applications, one of the recurring challenges is managing constants. Whether it’s navigation routes, theme colors, or application states, relying on hardcoded values scattered throughout your codebase can lead to errors, poor readability, and maintenance headaches.

![Using Typescript Enums In React Native Web](/assets/image/blog.logrocket.com/complete-guide-typescript-enums-react-native/banner.jpeg)

This is where TypeScript enums come in. Enums allow you to define a set of named values that give your code structure, improve readability, and make debugging a breeze.

In this detailed guide, I’ll walk you through what enums are, why you should use them, and show you step-by-step examples in React Native. I’ll explain each example in simple, relatable terms, ensuring you understand not just how to use enums, but why they matter. I’ll also cover best practices, alternatives like union types, and when to avoid enums.

---

## What are TypeScript enums?

An enum (short for enumeration) is a TypeScript feature that lets you define a collection of related values under one name. Instead of repeating strings or numbers throughout your code, [**enums**](/blog.logrocket.com/typescript-enums-vs-types.md) give those values meaningful names.

### Types of enums

There are two main types of enums in TypeScript:

- **Numeric enums** – Automatically assign numbers to the values
- **String enums** – Explicitly assign custom string values

Here’s how they look:

```ts
// Numeric Enum
enum Status {
  Active = 1,  // Starts at 1
  Inactive,    // Automatically becomes 2
  Archived,    // Automatically becomes 3
}

// String Enum
enum Theme {
  Light = 'LIGHT', // Explicitly assigns "LIGHT"
  Dark = 'DARK',   // Explicitly assigns "DARK"
}
```

Enums are especially useful when you have a small, fixed set of values that you know won’t change frequently. This makes them a perfect fit for many use cases in React Native.

---

## Benefits of using enums in React Native

Enums offer several benefits that directly impact the quality of your code:

### 1. Improved readability

Instead of using arbitrary strings or numbers, enums provide clear, descriptive names. This makes your code self-explanatory.

Without enums:

```ts
if (route === 'HomeScreen') { ... }
```

With enums:

```ts
if (route === Routes.Home) { ... }
```

### 2. Type safety

One of the biggest advantages of using [**TypeScript enums**](/blog.logrocket.com/iterate-over-enums-typescript.md) in React Native is the built-in type safety. With plain strings or numbers, it’s easy to introduce typos, inconsistent naming, or invalid values, errors that can slip through unnoticed until they cause unexpected behavior at runtime.

But with enums, TypeScript acts like a strict gatekeeper, ensuring that only valid values are used. If you try to assign a value that’s not part of the enum, TypeScript will immediately throw an error during development, saving you from runtime crashes and hours of debugging.

Let’s say you’re handling user authentication states in your app:

```ts
enum AuthStatus {
  LoggedIn = "LOGGED_IN",
  LoggedOut = "LOGGED_OUT",
  Pending = "PENDING",
}

// Function expecting an AuthStatus enum
function handleAuth(status: AuthStatus) {
  if (status === AuthStatus.LoggedIn) {
    console.log("User is logged in.");
  }
}

// ❌ Incorrect value (throws an error at compile-time)
handleAuth("LOGGED-IN"); // TypeScript Error: Argument of type '"LOGGED-IN"' is not assignable to parameter of type 'AuthStatus'.

// ✅ Correct usage
handleAuth(AuthStatus.LoggedIn);
```

In a JavaScript-only project, this typo (`LOGGED-IN` instead of `LOGGED_IN`) wouldn’t be caught until the app runs, potentially leading to broken logic. But with TypeScript enums, the error is flagged immediately, helping you catch issues early.

Why does this matter? TypeScript enums can help eliminate the risk of silent failures due to typos, provide clear auto-completion in IDEs (making coding faster), and ensure that only expected values are passed into functions, reducing runtime errors.

### 3. Centralized management

As your app grows, managing hardcoded values scattered across different files becomes a nightmare. Imagine manually updating screen names, theme colors, or API statuses across dozens of components. Not only is it tedious, but the chances of missing a reference are high, leading to [**inconsistencies and bugs**](/blog.logrocket.com/how-to-debug-typescript-chrome.md).

Enums solve this by offering a single source of truth. Instead of manually updating values in multiple places, you define them once in an enum and reference them everywhere. Change it in one place, and it updates across the entire app.

For instance, let’s think about the context of centralizing navigation routes:

```tsx
// Define all route names in one place
enum Routes {
  Home = "HomeScreen",
  Profile = "ProfileScreen",
  Settings = "SettingsScreen",
}

// Using enums in React Navigation
<Stack.Screen name={Routes.Home} component={HomeScreen} />
<Stack.Screen name={Routes.Profile} component={ProfileScreen} />
<Stack.Screen name={Routes.Settings} component={SettingsScreen} />
```

Now, if you ever need to rename `HomeScreen` to `MainScreen`, you only update it in the Routes enum, and it applies everywhere automatically.

This will help prevent inconsistencies, reducing typos or mismatched route names. It also contributes to easier refactoring (changing a value is quicker and less risky), and better code organization, as constants are clearly grouped, making the codebase more readable.

### 4. Ease of debugging

String enums, in particular, make debugging easier by providing meaningful values in logs. The logs always show standardized values, reducing confusion. The risk of logging incorrect or unexpected values is minimized, and if a mistake is made, TypeScript flags it during development, rather than letting it break the app in production.

---

## How to use TypeScript enums in React Native

Let’s dive into some practical, real-world examples. I’ll explain each part of the code so you can see how enums make your life easier.

### 1. Managing navigation routes

When building an app, you’ll often define multiple screens. Hardcoding route names like `HomeScreen` everywhere can lead to typos or inconsistent naming. By using enums, you can define all routes in one place and reference them across your app:

```tsx :collapsed-lines title="App.tsx"
// Define navigation routes using an enum
enum Routes {
  Home = 'HomeScreen',
  Profile = 'ProfileScreen',
  Settings = 'SettingsScreen',
}

// React Navigation setup
import React from 'react';
import { NavigationContainer } from '@reactnavigation/native';
import { createStackNavigator } from '@reactnavigation/stack';
import { Text } from 'react-native';

const Stack = createStackNavigator();

// Screens
const HomeScreen = () => <Text>Welcome to the Home Screen!</Text>;
const ProfileScreen = () => <Text>This is your Profile</Text>;
const SettingsScreen = () => <Text>Here are your Settings</Text>;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/ Use the Routes enum to define screen names /}
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.Profile} component={ProfileScreen} />
        <Stack.Screen name={Routes.Settings} component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
```

Here’s what you might notic; it helps keep your code organized, reduces errors, and improves readability. Below are a few key benefits:

- **Enum definition** – The Routes enum lists all the valid screen names. If you ever need to change `HomeScreen` to something else, you only update it in the enum
- **Consistency** – By referencing `Routes.Home`, you ensure the same name is used everywhere, reducing bugs
- **Readability** – It’s easier for someone reading the code to understand what `Routes.Home` represents compared to a raw string

### 2. Handling theme colors

If you’re implementing light and dark themes in your app, you can use an enum to define your color palette instead of hardcoding color values directly in components. This makes it easy to manage and switch themes:

```tsx :collapsed-lines title="App.tsx"
// Define theme colors using an enum
enum Colors {
  Primary = '',
  Secondary = 'FFC107',
  BackgroundLight = 'FFFFFF',
  BackgroundDark = '121212',
  TextLight = '000000',
  TextDark = 'FFFFFF',
}

// Apply colors in a React Native component
import React from 'react';
import { View, Text, StyleSheet } from 'reactnative';

const App = () => {
  const isDarkMode = true; // Simulate a dark mode toggle

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.BackgroundDark : Colors.BackgroundLight },
      ]}
    >
      <Text
        style={{
          color: isDarkMode ? Colors.TextDark : Colors.TextLight,
        }}
      >
        Enums make theme management easy!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

The benefits of this include:

- **Enum centralization** – The `Colors` enum contains all the color values used in your app. If you want to update the primary color, you do it once in the enum
- **Dynamic styling** – The `isDarkMode` variable dynamically switches between light and dark themes, with the enum handling the logic cleanly
- **Maintainability** – When new colors are added, you can easily extend the `Colors` enum without touching multiple components

### 3. Managing application states

Enums are also helpful for [**managing application states**](/blog.logrocket.com/comparing-typescript-state-management-solutions.md), like a form submission process that includes multiple stages (`idle`, `submitting`, `success`, or `error`):

```tsx :collapsed-lines title="App.tsx"
// Define form states as an enum
enum FormState {
  Idle = 'IDLE',
  Submitting = 'SUBMITTING',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

// Use enums to manage form states
import React, { useState } from 'react';
import { View, Text, Button } from 'reactnative';

const App = () => {
  const [formState, setFormState] = useState<FormState>(FormState.Idle);

  const handleSubmit = () => {
    setFormState(FormState.Submitting);
    // Simulate an API call
    setTimeout(() => {
      setFormState(FormState.Success); // Update state to success
    }, 2000);
  };

  return (
    <View>
      {formState === FormState.Idle && <Button title="Submit" onPress={handleSubmit} />}
      {formState === FormState.Submitting && <Text>Submitting...</Text>}
      {formState === FormState.Success && <Text>Form Submitted Successfully!</Text>}
      {formState === FormState.Error && <Text>Error Submitting Form</Text>}
    </View>
  );
};

export default App;
```

This makes form states clearer, transitions more predictable, and conditions easier to read. Here’s how:

- **State definition** — The FormState enum lists all possible states the form can be in
- **Clear transitions** — Using the enum makes state transitions explicit and predictable
- **Readable conditions** – Instead of checking `formState === 'submitting`, you check `formState === FormState.Submitting`, which is easier to understand

---

## Best practices for using enums

The following tactics will help you make the best use of enums in React Native:

### Group enums by feature

Rather than throwing all enums into a single file, organize them based on their purpose. This makes your code easier to navigate and maintain.

A few examples:

- <FontIcon icon="iconfont icon-typescript"/>`Routes.ts` – For screen names in navigation
- <FontIcon icon="iconfont icon-typescript"/>`Theme.ts` – For managing theme colors
- <FontIcon icon="iconfont icon-typescript"/>`FormStates.ts` – For tracking form submission status

Keeping enums separate prevents clutter and helps avoid unintended dependencies.

### Give preference to string enums

Enums should be stored in well-named files and include comments explaining their purpose. This helps teammates (or your future self) understand them at a glance.

Example:

```ts title="enums/UserRoles.ts"
/**
 * Defines different user roles within the app.
 */
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}
```

This structure makes it clear what the enum is for, without having to dig through unrelated code.

### Use clear and consistent naming conventions

Naming matters. Stick to PascalCase for enum names and UPPER_CASE for values to keep things readable.

Good practice:

```ts title="enums/PaymentStatus.ts"
enum PaymentStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Failed = "FAILED",
}
```

Bad practice:

```ts{1} title="enums/PaymentStatus.ts"
enum paymentstatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
}
```

Following a naming convention keeps your enums easy to read and reduces confusion.

### Use enums only when the values are fixed and unlikely to change

Enums are best for values that won’t change often. If you expect frequent updates (like a list of product categories from an API), consider using objects or union types instead.

Good for enums:

```ts title="enums/NotificationType.ts"
enum NotificationType {
  Success = "SUCCESS",
  Error = "ERROR",
  Warning = "WARNING",
}
```

Bad for enums (better as a dynamic list):

```ts{2-4} title="enums/NotificationType.ts"
enum ProductCategory {
  Electronics = "ELECTRONICS",
  Clothing = "CLOTHING",
  Home = "HOME",
}
```

If new product categories can be added over time, using an enum makes updates harder.

By applying these best practices, enums will stay organized, readable, and easy to manage, without adding unnecessary complexity to your code.

---

## Union types: An enum alternative

While enums are powerful, they [**aren’t always the best choice**](/blog.logrocket.com/understanding-discriminated-union-intersection-types-typescript.md). For example, if you have a dynamic set of values or prefer a simpler approach, [<FontIcon icon="iconfont icon-typescript"/>union types](https://typescriptlang.org/docs/handbook/unions-and-intersections.html) might be a better fit. Union types in TypeScript allow a variable to accept only a predefined set of values, ensuring strict type safety while avoiding runtime overhead:

```ts
type ScreenRoutes = "HomeScreen" | "ProfileScreen" | "SettingsScreen";
```

### Advantages of union types

There are a few key advantages to using union types:

::: tabs

@tab:active Simpler and more lightweight

Enums require explicit declarations, additional syntax, and often a separate file for organization. Union types, on the other hand, let you define all valid values directly without extra setup. This makes your code more concise and self-explanatory. Instead of navigating to an enum file to check what values are allowed, union types keep everything in plain sight, making it easier to read and maintain. That makes union types ideal for small sets of values that don’t need complex mappings.

@tab No runtime overhead

Enums compile into JavaScript objects, meaning they add extra code that exists at runtime. In most cases, this is negligible. But in performance-sensitive applications, every extra bit of JavaScript matters.

Union types, on the other hand, only exist in TypeScript. They disappear at runtime, leaving behind just raw string values in the compiled JavaScript. This keeps your app’s bundle size smaller and removes unnecessary processing. Union types, therefore, are ideal for large-scale applications where performance and minimal runtime code are paramount.

@tab Easier to extend dynamically

One of the biggest limitations of enums is that they are static; you define them once, and they cannot change dynamically. If your app pulls configurations, categories, or feature flags from an API, enums won’t be flexible enough. Union types, however, can easily integrate with dynamically generated values. This is especially useful when dealing with external data sources that might introduce new options over time.

:::

### When to use union types

Union types are typically best used in two common scenarios:

- When the set of values is small and unlikely to grow.
- When you don’t need the additional features of enums (e.g., reverse mapping).

---

## Conclusion

TypeScript enums are an essential tool for creating robust, readable, and maintainable React Native applications. By using enums for navigation routes, [<FontIcon icon="fas fa-globe"/>color schemes](https://blog.logrocket.com/ux-design/best-color-combinations-ux-design/), and application states, you can reduce bugs, make your code easier to understand, and simplify updates.

With these examples, best practices, and alternatives, you’re ready to start using enums effectively in your React Native projects. Embrace enums, and watch your code become cleaner, safer, and more organized. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A complete guide to TypeScript enums in React Native",
  "desc": "Learn everything you need to know about using React Context — a great feature that enables you to manage and share state across the React application.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-typescript-enums-react-native.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
