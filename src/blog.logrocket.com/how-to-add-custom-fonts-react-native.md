---
lang: en-US
title: "How to add custom fonts in React Native"
description: "Article(s) > How to add custom fonts in React Native"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to add custom fonts in React Native"
    - property: og:description
      content: "How to add custom fonts in React Native"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-add-custom-fonts-react-native.html
prev: /programming/js-react/articles/README.md
date: 2025-04-07
isOriginal: false
author:
  - name: Nitish Sharma
    url : https://blog.logrocket.com/author/nitishsharma/
cover: /assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/banner.png
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
  name="How to add custom fonts in React Native"
  desc="Custom fonts provide your apps with a unique identity. Explore modern ways to add custom fonts in a React Native app, including Google Fonts."
  url="https://blog.logrocket.com/how-to-add-custom-fonts-react-native"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/banner.png"/>

Fonts are the building blocks of a great user experience. Using custom fonts can provide your apps with a unique identity, helping your project stand out in a competitive marketplace.

![how to add custom fonts in React Native](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/banner.png)

In this guide, we will explore modern ways to add custom fonts in a React Native app, including Google Fonts integration. To follow along, you should be familiar with the basics of React Native or the Expo SDK, including JSX, components (class and functional), and styling. You can also follow the GitHub repositories for this project to see implementations for both the [React Native CLI (<FontIcon icon="iconfont icon-github"/>`Taofiqq/custom-hook-cli`)](https://github.com/Taofiqq/custom-hook-cli) and [Expo (<FontIcon icon="iconfont icon-gtihub"/>`Taofiqq/custom-hook-expo`)](https://github.com/Taofiqq/custom-hook-expo).

---

## How to add fonts in React Native

### For React Native CLI projects

1. Create an <FontIcon icon="fas fa-folder-open"/>`assets/fonts` folder and add your font files
2. Create a `react-native.config.js` file to specify the font assets path
3. Run `npx react-native-asset` to link the fonts
4. Use the fonts with `fontFamily` in your styles

### For Expo projects

1. Install the required packages: `npx expo install expo-font`
2. For Google Fonts: `npx expo install @expo-google-fonts/[font-name]`
3. Use the `useFonts` Hook to load your fonts
4. Handle the loading state before rendering your UI

::: note Editor’s note

This article was updated by [<FontIcon icon="fas fa-globe"/>Timonwa Akintokun](https://blog.logrocket.com/author/pelumiakintokun/) in April 2025 to align the* the content *with latest best practices for React Native (0.73+) and Expo SDK 50+, replace outdated font linking methods, update Google Fonts integration, enhance dynamic font loading best practices, and introduce system font recommendations for better UX.

:::

---

## Adding custom fonts to a React Native CLI project

For our project, we will add custom fonts to a React Native CLI project by building a basic application using Google Fonts. [<FontIcon icon="fa-brands fa-google"/>Google Fonts](https://fonts.google.com/) is a library of free, open source fonts that can be used while designing web and mobile applications.

To bootstrap the React Native CLI project, run the following command in your terminal:

```sh
npx @react-native-community/cli@latest init CustomFontCLI
```

`CustomFontCLI` is the name of our project folder. Once the project has been successfully installed, you will see the project creation confirmation in your terminal:

![custom font cli project](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/1_react-native-cli-project.png)

Open your project in your [**preferred IDE**](/blog.logrocket.com/how-choose-best-ide-react-native.md) to get started. In this tutorial, we will use [<FontIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/).  
Once the project has been bootstrapped, we will move on to getting the fonts we want to use. We’ll go over how to import them and use them in our project.

### Downloading and integrating Google Fonts into our project

In this project, we will demonstrate custom font integration using two fonts: Quicksand and Raleway, which you can find on Google Fonts.

Find your desired fonts in Google Fonts, select the styles you want (e.g., Light 300, Regular 400, select variable if you want to use the Variable font format), and click on the **Download** button:

![integrating google fonts to your project](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/2_integrating-google-fonts.png)

The folder will be downloaded as a ZIP file with a font folder. Inside the folder, there is a static folder where all the TTF files reside. Copy and keep the TTF files.

In the next section, we will go through integrating these fonts’ TTF files into our React Native CLI project.

### Integrating the Google Fonts into the project

Create an <FontIcon icon="fas fa-folder-open"/>`assets` folder in the root directory of your project, with a subfolder called <FontIcon icon="fas fa-folder-open"/>`fonts`. Then, paste all the TTF files you copied from the static folder earlier into the <FontIcon icon="fas fa-folder-open"/>`fonts` folder of your project:

![pasting ttf files into project](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/3_pasting-ttf-files-into-project.png)

Next, create a <FontIcon icon="fa-brands fa-js"/>`react-native.config.js` file in the root directory and paste the code below inside it:

```js title="react-native.config.js"
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
```

Adjust the assets path according to your font directory. Also, make sure your file is named correctly.

### Linking the fonts to be used in project files

We have successfully integrated the font files into our project. Now we need to link them so we’ll be able to use them in any files inside the project. To do that, run the following command:

```sh
npx react-native-asset
```

Once the assets have been successfully linked, you should see the following message in your terminal:

![terminal message after assets are successfully linked](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/4_terminal-message-after.png)

Then, in your <FontIcon icon="fa-brands fa-react"/>`App.tsx` file, paste the following code:

```js :collapsed-lines title="App.tsx"
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.quicksandRegular}>
        This text uses a quick sand font
      </Text>
      <Text style={styles.quicksandLight}>
        This text uses a quick sand light font
      </Text>
      <Text style={styles.ralewayThin}>
        This text uses a thin italic raleway font
      </Text>
      <Text style={styles.ralewayItalic}>
        This text uses a thin italic raleway font
      </Text>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lavender",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quicksandLight: {
    fontFamily: "Quicksand-Light",
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: "Quicksand-Regular",
    fontSize: 20,
  },
  ralewayItalic: {
    fontFamily: "Raleway-Italic",
    fontSize: 20,
  },
  ralewayThin: {
    fontFamily: "Raleway-ThinItalic",
    fontSize: 20,
  },
});
```

This is a basic <FontIcon icon="fa-brands fa-react"/>`App.tsx` file with four texts being styled, each by different font styles of Raleway and Quicksand. Essentially, we are rendering the JSX with four texts to display on the screen and React Native’s StyleSheet API to append different `fontFamily` styles to each of the `Text` components.

Let’s see the output:

![code ouput showing four text styled by quicksand and raleway fonts](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/5_code-styled-byraleway-quicksand.png)

---

## Using custom fonts in React Native with Expo

In this section, we will learn how to use custom [<FontIcon icon="fas fa-globe"/>fonts](https://blog.logrocket.com/ux-design/types-of-fonts/) with Expo. Expo supports two font formats, OTF and TTF, which work consistently on iOS, Android, and the web. If you have your font in another format, you’ll need [<FontIcon icon="iconfont icon-expo"/>advanced configurations](https://docs.expo.dev/guides/customizing-metro/#adding-more-file-extensions-to-assetexts).

First, create a new Expo project by running this command:

```sh
npx create-expo-app@latest my-app
```

Once the project has been successfully installed, start the development server by running `npm run start` and choose either the iOS or Android option to open your project.

You should see the default Expo screen in your simulator or device:

![default expo screen](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/6_default-expo-screen.png)

### Loading custom fonts using the`useFonts` Hook

In React Native with Expo, the `useFonts` Hook is the recommended approach for loading and using custom fonts. It takes an object where the key is the name you want to use to reference the font, and the value is the required statement pointing to the font file.

The syntax looks like this:

```jsx
import { useFonts } from "expo-font";

const [loaded, error] = useFonts({
  FontName: require("./path/to/font.ttf"),
});
```

### Using Google Fonts in Expo

In this section, we will see how to add Google Fonts to our application. The Expo team has created a set of packages that make it easy to [**use Google Fonts**](/blog.logrocket.com/next-js-font-optimization-custom-google-fonts.md) in your Expo project.

To add Google Fonts like Raleway and Quicksand, install these packages using the commands below:

```sh
npx expo install expo-font @expo-google-fonts/raleway @expo-google-fonts/quicksand
```

If you have other Google Fonts you want to use, you can [check here for the available fonts with Expo support (<FontIcon icon="iconfont icon-github"/>`expo/google-fonts`)](https://github.com/expo/google-fonts).

### Integrating custom Google Fonts in the Expo project

In your <FontIcon icon="fa-brands fa-react"/>`App.jsx` file, paste the following code block:

```jsx :collapsed-lines title="App.jsx"
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Quicksand_300Light } from "@expo-google-fonts/quicksand";

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Quicksand_300Light,
  });
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>This text has default style</Text>
      <Text style={styles.raleway}>This text uses Raleway Font</Text>
      <Text style={styles.quicksand}>This text uses QuickSand Font</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  raleway: {
    fontSize: 20,
    fontFamily: "Raleway_200ExtraLight",
  },
  quicksand: {
    fontSize: 20,
    fontFamily: "Quicksand_300Light",
  },
});
```

Here, we imported `Raleway_200ExtraLight` and `Quicksand_300Light` from their respective packages. We use the `useFonts` Hook to load these custom fonts asynchronously. The result from the `useFonts` Hook is an array of Boolean values that was destructured using the syntax `const [fontsLoaded]` to access the Boolean value that it returns.

If the fonts are successfully loaded, the result will be `[true, null]` , which means `fontsLoaded` is true.

We’ve added an `ActivityIndicator` to provide visual feedback while the fonts are loading, which is a best practice to improve user experience.

Let’s see what this looks like in our simulator:

![custom font integration in expo app](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/7_custom-font-export.png)

### Using local custom fonts in Expo

Let’s say you have a personal React Native project you are building, and you have been given custom fonts that are not among the available Google Fonts supported by Expo.

First, you will need to download the `font` file into your project and install the `expo-font` package. For this tutorial, I downloaded Space Mono from [<FontIcon icon="fas fa-globe"/>FontSquirrel](https://fontsquirrel.com/fonts/space-mono) as my custom font.

Create a folder called <FontIcon icon="fas fa-folder-open"/>`assets` and, within it, create a <FontIcon icon="fas fa-folder-open"/>`fonts` folder, just like you did with the React Native CLI. Then, move the font files from the <FontIcon icon="fas fa-folder-open"/>`fonts` folder into your project like so:

![folder structure of expo project](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/8_folder-structure-expo-project.png)

In your <FontIcon icon="fa-brands fa-react"/>`App.jsx` file, update the code to include the Space Mono custom font:

```jsx :collapsed-lines title="App.jsx"
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Quicksand_300Light } from "@expo-google-fonts/quicksand";

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Quicksand_300Light,
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>This text has default style</Text>
      <Text style={styles.raleway}>This text uses Raleway Font</Text>
      <Text style={styles.quicksand}>This text uses QuickSand Font</Text>
      <Text style={styles.spacemono}>This text uses Space Mono Font</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  raleway: {
    fontSize: 20,
    fontFamily: "Raleway_200ExtraLight",
  },
  quicksand: {
    fontSize: 20,
    fontFamily: "Quicksand_300Light",
  },
  spacemono: {
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
});
```

Then, view the updates in the simulator:

![adding space mono font](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/9_adding-space-mono-font-1.png)

As shown in the simulator output above, the additional text uses the `SpaceMono` font family that has been used to style the fourth text.

---

## React Native fonts best practices

These strategies will help you get the most out of React Native fonts

### Using system fonts for better performance

While custom fonts provide unique branding, system fonts offer several advantages:

1. **No loading time**: They’re built into the device
2. **Better performance**: Optimized for the platform
3. **Native feel**: Familiar to users of each platform

To use system fonts effectively, you can use `Platform.select()` to provide platform-specific font families:

```jsx :collapsed-lines
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
export default function App() {
  return (
    <View style={styles.container}>
      <Text>This text has default style</Text>
      <Text>This text no longer uses Raleway Font</Text>
      <Text>This text no longer uses QuickSand Font</Text>
      <Text>This text no longer uses Space Mono Font</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: Platform.select({
      ios: "System",
      android: "Roboto",
      default: "System",
    }),
    // Optional: You can also switch font weights dynamically
    // fontWeight: "400", // normal
    fontWeight: "900", // black
  },
});
```

This approach ensures that your text looks native on each platform while still maintaining control over the style:

![ensuring text appears native](/assets/image/blog.logrocket.com/how-to-add-custom-fonts-react-native/10_ensure-text-appears-native-1.png)

### Dynamic font loading and preventing FOIT

Flash of invisible text (FOIT) occurs when your UI renders before fonts are loaded. To prevent this, always implement proper loading states like we did in the examples above.

You can also use a splash screen or skeleton UI to improve the user experience while fonts are loading.

### Adapting to accessibility preferences

When implementing custom fonts, always ensure that they work well with the device accessibility settings. Users with visual impairments often increase the font size on their devices. You can support these preferences by using `useWindowDimensions`:

```js
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
export default function AccessibleText() {
  const { fontScale } = useWindowDimensions();

  return (
    <Text style={[styles.text, { fontSize: 16 * fontScale }]}>
      This text will respect the user's font size preferences
    </Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'CustomFont-Regular',
  },
});
```

This approach ensures your app’s typography remains accessible regardless of the custom fonts you implement.

### Cross-device font rendering validation

Font rendering can vary significantly across different devices, operating systems, and screen resolutions. Before releasing your app:

- Test your fonts on multiple physical devices with different screen densities
- Check the rendering of your fonts on both iOS and Android platforms
- Verify that the text appears correctly in different orientations and screen sizes
- Examine how the fonts appear in both light and dark modes

This thorough validation process helps identify font rendering inconsistencies early, ensuring your typography looks professional across all supported devices.

---

## Common pitfalls when working with custom fonts in React Native

When working with custom fonts in React Native, there might be some drawbacks you’ll encounter.

### Font loading time

This happens when the UI or page is rendered before the fonts are loaded. This leads to fallback fonts appearing, i.e., the default font of your mobile device. To fix this issue, use conditional rendering to render the app only after the fonts are loaded. We can see this applied throughout this article.

If the fonts are not ready, render a loading screen or an `ActivityIndicator`:

```jsx title="App.jsx"
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      // application codes
    </View>
  );
}
```

### Mismatched font family names

As discussed in earlier sections, it’s crucial that font family names are consistent. For example, if you import a font as `SourceCodePro-ExtraLight.otf` but then load it into the application under a different path or file name, such as <FontIcon icon="fas fa-folder-open"/>`/assets/fonts/SourceCodePro-ExtraLight.ttf`, this will cause the application to throw an error because there has been a `fontFamily` name mismatch.

### Incorrect font path

Using the wrong path for your font file will also cause the application to throw an error. Double-check the file structure and ensure the paths match the exact location of the font file. Place your fonts in a <FontIcon icon="fas fa-folder-open"/>`/assets/fonts/` folder for easy matches, like <FontIcon icon="fas fa-folder-open"/>`/assets/fonts/SourceCodePro-ExtraLight.ttf`.

### Using unsupported font formats

When working with custom fonts, it’s important to verify that the system you’re working on (iOS, Android, or web) supports the font format you are using (e.g., .ttf, .otf). If not, unexpected errors may occur during development.

### Performance impact

When adding custom fonts to your React Native applications, be mindful of their file size (measured in kb/mb). Large font files can significantly increase an app’s loading time, especially when custom fonts are being loaded.

Minimize the number of custom fonts you load by using a single font family with different weights (regular, bold, italic, etc.) rather than multiple unrelated ones or using a full zip folder.

### Font weight and style issues

This is when the `fontWeight` or `fontStyle` properties do not apply because the loaded font doesn’t support the variations (bold, italic, regular).

Let’s say you downloaded a zip file of SpaceMono font. It comes in different variations such as `SpaceMono-Bold.ttf`, `SpaceMono-Regular.ttf`, `SpaceMono-Light.ttf`, and so on. If you need a bold weight of the font, then you need to use the `SpaceMono-Bold.ttf` font or you will run into this issue. Most custom fonts are explicitly named with their weights or styles, so use the one you need to avoid this issue.

### Production build issue*

When building standalone apps (for Google PlayStore or Apple’s App Store), it is good to include the `expo-font` plugin in <FontIcon icon="iconfont icon-json"/>`app.json`. This is because the expo configuration helps ensure that Expo knows how to handle the fonts and bundle them properly. To do that, add the code below to your <FontIcon icon="iconfont icon-json"/>`app.json` config file:

```js title="app.json"
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/Inter-Black.otf"] // your font's path
        }
      ]
    ]
  }
}
```

### `react-native-asset` errors

If you use the React Native CLI, you might encounter some issues with the `npx react-native-asset` command, like `error Assets destination folder is not defined.`

This usually occurs when your <FontIcon icon="fa-brands fa-js"/>`react-native.config.js` file is missing, is incorrectly configured, or is placed in the wrong location. To resolve this:

Ensure your <FontIcon icon="fa-brands fa-js"/>`react-native.config.js` file exists in the root directory of your project.

Then, verify it has the correct format:

```js title="react-native.config.js"
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
```

Conclude by double-checking that the path to your fonts folder is correct.

Another common issue is when assets appear to be linked successfully, but the fonts are still not rendered. In this case:

1. Confirm that the app was rebuilt after running the asset linking command
2. Verify that the font family name matches exactly what’s in your styles
3. For iOS specifically, try cleaning the build folder and rebuilding it.

---

## Conclusion

Integrating custom fonts in React Native applications is not just a technical enhancement but a strategic approach to improving user experience. The modern approach using the `useFonts` Hook for Expo projects and `npx react-native-asset` for React Native CLI projects significantly simplifies the process compared to older methods.

Remember these key takeaways:

1. For Expo projects, always use the `useFonts` Hook from expo-font
2. For React Native CLI projects, use the `react-native.config.js` file and `npx react-native-asset`
3. Handle font loading states to prevent FOIT
4. Consider using system fonts for better performance where brand identity isn’t critical
5. Be mindful of font file sizes and limit the number of font variations

By following these best practices, you’ll be able to integrate custom fonts seamlessly while maintaining optimal performance in your React Native applications.

Check out the GitHub repo for this project using the [React Native CLI (<FontIcon icon="iconfont icon-github"/>`Taofiqq/custom-hook-cli`)](https://github.com/Taofiqq/custom-hook-cli) and [Expo (<FontIcon icon="iconfont icon-github"/>`Taofiqq/custom-hook-expo`)](https://github.com/Taofiqq/custom-hook-expo).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to add custom fonts in React Native",
  "desc": "Custom fonts provide your apps with a unique identity. Explore modern ways to add custom fonts in a React Native app, including Google Fonts.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-add-custom-fonts-react-native.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
