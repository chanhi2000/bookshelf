---
lang: en-US
title: "What is the Windows Subsystem for Android (WSA)?"
description: "Article(s) > What is the Windows Subsystem for Android (WSA)?"
icon: fa-brands fa-windows
category:
  - DevOps
  - Windows
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is the Windows Subsystem for Android (WSA)?"
    - property: og:description
      content: "What is the Windows Subsystem for Android (WSA)?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-the-windows-subsystem-for-android-wsa.html
prev: /devops/win/articles/README.md
date: 2023-09-12
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is the Windows Subsystem for Android (WSA)?"
  desc="The Windows Subsystem for Android (WSA) allows you to run Android apps on Windows 11. You can install it by getting the Amazon Appstore from the Microsoft Store. Developers can activate Developer mode to test and debug Android apps."
  url="https://typescript.tv/hands-on/what-is-the-windows-subsystem-for-android-wsa"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

The Windows Subsystem for Android (WSA) allows you to run Android apps on Windows 11. You can install it by getting the Amazon Appstore from the Microsoft Store. Developers can activate Developer mode to test and debug Android apps.

The **Windows Subsystem for Android (WSA)** enables you to run native Android apps on **Windows 11**. It serves as a virtualization layer, much like how the **Windows Subsystem for Linux (WSL)** allows Linux applications to run natively on Windows. This feature is especially useful for TypeScript developers working on React Native applications, as it offers a convenient way to run and test apps through native integrations.

---

::: info TL;DR

1. Install the "Amazon Appstore" from the "Microsoft Store"
2. It will silently install the "Windows Subsystem for Android"
3. Go to "Windows Subsystem for Android" → "Advanced Settings" and turn on "Developer mode"
4. Go to "Windows Subsystem for Android" → "Experimental features" and turn on "Local network access"
5. Click on "Manage developer settings" to start the emulator
6. Toggle "Developer mode" on and off to see your `adb` connection URL (IP address & port)
7. Install `adb` in your Windows system through the [<VPIcon icon="fa-brands fa-android"/>Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools)
8. Find your local IPv4 address on Windows using `ipconfig`
9. Try to connect `adb` from your Ubuntu terminal (WSL2) with your Android Emulator (WSA) on Windows, Example: `adb connect 192.168.178.70:58526` (the IP address you got from `ipconfig` and the port from the adb connection URL)
10. Try to run an [<VPIcon icon="iconfont icon-expo"/>Expo Go](https://docs.expo.dev/get-started/expo-go/) project using TypeScript (it will discover your emulator) using `expo start --tunnel`

:::

---

## Installing the Windows Subsystem for Android

WSA is designed to work closely with the [<VPIcon icon="fa-brands fa-amazon"/>Amazon Appstore](https://developer.amazon.com/apps-and-games/appstore-on-windows-11), which serves as the platform from which users can download Android apps. When you access the **Microsoft Store**, you have the option to install the **Amazon Appstore**. Doing so will automatically install the Windows Subsystem for Android in the background.

Once installed, the **Amazon Appstore** and the **Windows Subsystem for Android** become available from the Start menu in Windows 11. In terms of window management, Android apps on Windows can be resized freely, and they are expected to be responsive to these changes.

---

## Activating the Developer mode

For developers, the Windows Subsystem for Android offers a new platform to test and debug Android apps. By navigating to **Advanced settings** you can enable the **Developer mode**. Once this mode is activated, an address is displayed that allows you to link the [<VPIcon icon="fa-brands fa-android"/>Android Debug Bridge (adb)](https://developer.android.com/tools/adb) when you start up the Android emulator.

![](https://typescript.tv/images/what-is-the-windows-subsystem-for-android-wsa/wsa-advanced-settings-developer-mode.png)

::: tip Hint

To make the adb address visible, you may need to switch "Developer mode" off and on again after initiating the Android emulator.

:::

---

## Connecting the Android Debug Bridge (adb)

First, make sure Developer mode is enabled in your WSA settings. After activating Developer mode, start an Android app like the "Amazon Appstore". This step is crucial for booting up the virtual machine that operates WSA. You can also initiate the "Windows Subsystem for Android" via the Start menu.

When the Android system is up and running, indicated by icons in your taskbar or listed under running "Apps" in your Task Manager, you can proceed to connect using `adb`. If you don't have `adb` installed on your Windows machine, you will receive this error message in the **Windows Command Prompt**:

> 'adb' is not recognized as an internal or external command, operable program or batch file.

Users of the **Windows PowerShell** will receive a similar error:

> The term 'adb' is not recognized as the name of a cmdlet, function, script file, or operable program.

To make `adb` accessible, install the [<VPIcon icon="fa-brands fa-android"/>Android SDK Platform-Tools](https://developer.android.com/tools/releases/platform-tools). You can also install them via the **Windows Subsystem for Linux (WSL)** using this command:

```sh
sudo apt install adb
```

If an error message appears stating `Error: Unable to locate package adb`, you'll need to add the `universe` repository to your Advanced Packaging Tool (apt). This repository is one of the four [<VPIcon icon="fa-brands fa-ubuntu"/>main repositories within Ubuntu](https://help.ubuntu.com/community/Repositories/Ubuntu) and grants access to a wide array of community-maintained software.

To add the "universe" repository, execute:

```sh
sudo add-apt-repository universe
```

It's a good practice to refresh the package list by running `sudo apt-get update` after adding a new repository. This is because the package manager needs to refresh its local cache of available packages to include the packages from the newly added repository.

With `adb` installed, you can connect to your Android emulator using the following command:

```sh
adb connect 127.0.0.1:58526
```

You may run into the following error when trying it for the first time:

> failed to connect to '127.0.0.1:58526': Connection refused

If you attempt to connect using an address that begins with `172`, which is reserved for use within private networks and is not accessible from the public internet, you may experience this issue:

> failed to connect to '172.23.16.1:58526': Connection timed out

Make sure that your **Microsoft Defender Firewall** (or similar) doesn't block the network requests. You may also need to use a different IP address than `127.0.0.1`. Simply enter `ipconfig` in the **Windows PowerShell** to get an overview of your available network addresses. Generally, you'll want to use an IPv4 address from your home network, typically starting with `192.168`.

![](https://typescript.tv/images/what-is-the-windows-subsystem-for-android-wsa/ipconfig.png)

---

## Starting React Native apps using Expo

In the context of mobile app development with TypeScript and React Native, [Expo](https://expo.dev/) stands out as an efficient way to boost your development workflow. The Expo ecosystem is particularly appealing to Windows developers, as its [EAS Build](https://docs.expo.dev/build/) lets you compile your iOS apps in the cloud, eliminating the need for a macOS system. The [Expo SDK](https://docs.expo.dev/versions/latest/) is well-tested, written in TypeScript, and built for Android, iOS, and the web.

When running `expo start` in an Expo project, the Expo CLI starts a development server and generates a QR code. If you're using a real iOS or Android device, you can scan this code using the [Expo Go app](https://expo.dev/client) to connect. The development server will then distribute the current version of your local mobile app.

To get Expo to work with the WSA, a bit of configuration is needed, so that your local Android emulator can connect to your local Expo development server. Navigate to the "Windows Subsystem for Android", go to "Advanced Settings" and then to "Experimental features". Here, you'll need to enable "Local network access". Once this is done, restart the WSA and run the `expo start` command in your Expo project again.

![](https://typescript.tv/images/what-is-the-windows-subsystem-for-android-wsa/wsa-expo-go.png)

---

## Advanced settings

If you're a developer who intensively works with Android apps, you may want to allocate more system resources to the Windows Subsystem for Android. To do this, follow these steps:

1. "Advanced Settings" -> "Memory and performance" -> "Subsystem resources" -> "Continous" to make sure that the subsystem never goes on idle
2. "Advanced Settings" -> "Memory and performance" -> "Memory allocation" -> "High (16 GB)" if you have enough spare memory to share
3. "Advanced Settings" -> "Graphics preference" -> "High performance" to use a dedicated graphics card if available

For those who don't plan on using WSA frequently, it's advisable to manage its startup settings to prevent it from automatically launching when your computer starts. To do this, open your "System Configuration" and go to the "Startup" section. You might find that WSA is set to start automatically with your operating system, which you can choose to disable.

::: info Video Tutorial

<VidStack src="youtube/XCKNH5ymBN0" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is the Windows Subsystem for Android (WSA)?",
  "desc": "The Windows Subsystem for Android (WSA) allows you to run Android apps on Windows 11. You can install it by getting the Amazon Appstore from the Microsoft Store. Developers can activate Developer mode to test and debug Android apps.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-the-windows-subsystem-for-android-wsa.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
