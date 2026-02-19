---
lang: en-US
title: "Upgrading Expo in a React Native Project with TypeScript"
description: "Article(s) > Upgrading Expo in a React Native Project with TypeScript"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Upgrading Expo in a React Native Project with TypeScript"
    - property: og:description
      content: "Upgrading Expo in a React Native Project with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-expo-in-a-react-native-project-with-typescript.html
prev: /programming/js-react/articles/README.md
date: 2024-07-08
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Upgrading Expo in a React Native Project with TypeScript"
  desc="Upgrade Expo in your TypeScript React Native project with ease. Check your versions, update the main Expo dependency, sync and fix others, and patch vulnerabilities — all in one streamlined process."
  url="https://typescript.tv/hands-on/upgrading-expo-in-a-react-native-project-with-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Upgrade Expo in your TypeScript React Native project with ease. Check your versions, update the main Expo dependency, sync and fix others, and patch vulnerabilities — all in one streamlined process.

[<VPIcon icon="iconfont icon-expo"/>Expo](https://expo.dev/) is a powerful framework for building React Native applications. Staying current with your Expo project ensures you get the latest features, performance boosts, and essential security patches. This guide will show you how to effortlessly upgrade Expo in a TypeScript-based React Native project.

Before upgrading, it’s essential to know the current versions of Expo, React Native, and other dependencies your project is using. Open `package.json` and note these versions. Refer to the [<VPIcon icon="iconfont icon-expo"/>Expo Changelog notes](https://expo.dev/changelog) for details on breaking changes and migration guides.

I recently tried to update my Expo app using `expo upgrade` but I received the following message:

::: note

```plaintext
expo upgrade is not supported in the local CLI, please use expo-cli upgrade instead
```

:::


I then tried `npx expo-cli upgrade` but it gave me the same message. So, I referred to the official [<VPIcon icon="iconfont icon-expo"/>Expo documentation on upgrading the SDK](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) and figured out the necessary steps:

1. First, run `npm install expo@latest` to upgrade your main "expo" dependency to the latest production version available.
2. Next, run `npx expo install --fix` to update all dependencies based on Expo, such as "expo-dev-client", "expo-apple-authentication", "expo-build-properties,", "expo-constants", etc.
3. Then, run `npm update --save` to update all other dependencies, such as "@shopify/restyle", "axios", etc. and save the updated versions in the package-lock.json file (due to the `update` command) and the package.json file (due to the `--save` option).
4. Finally, run `npm audit fix` to update all vulnerable packages that come from transitive dependencies.
5. To ensure your app is correctly configured with the upgraded Expo SDK, run `npx expo-doctor`.

By following the steps listed above, I was able to upgrade [<VPIcon icon="fa-brands fa-apple"/><VPIcon icon="fa-brands fa-google"/>Programming Tutorials for Android](https://play.google.com/store/apps/details?id=com.welovecoding.app) and [<VPIcon icon="fa-brands fa-apple"/>Programming Tutorials for iOS](https://apps.apple.com/us/app/programming-tutorials/id659282498).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Upgrading Expo in a React Native Project with TypeScript",
  "desc": "Upgrade Expo in your TypeScript React Native project with ease. Check your versions, update the main Expo dependency, sync and fix others, and patch vulnerabilities — all in one streamlined process.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-expo-in-a-react-native-project-with-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
