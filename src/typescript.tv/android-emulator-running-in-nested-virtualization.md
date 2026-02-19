---
lang: en-US
title: "Android Emulator Running in Nested Virtualization"
description: "Article(s) > Android Emulator Running in Nested Virtualization"
icon: fa-brands fa-android
category:
  - Java
  - Android
  - adb
  - Article(s)
tag:
  - blog
  - typescript.tv
  - java
  - jdk
  - android
  - adb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Android Emulator Running in Nested Virtualization"
    - property: og:description
      content: "Android Emulator Running in Nested Virtualization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/android-emulator-running-in-nested-virtualization.html
prev: /programming/java-android/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Android Emulator Running in Nested Virtualization"
  desc="Running the Android Emulator directly inside WSL2 can cause performance issues. The solution is to run the emulator on Windows and connect to it from WSL2 using ADB. Make sure to use the same ADB version in both environments."
  url="https://typescript.tv/hands-on/android-emulator-running-in-nested-virtualization"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Running the Android Emulator directly inside WSL2 can cause performance issues. The solution is to run the emulator on Windows and connect to it from WSL2 using ADB. Make sure to use the same ADB version in both environments.

When setting up an Android development environment for React Native using Windows and WSL2, a common pitfall is attempting to run the Android Emulator directly inside WSL2. Doing so triggers the following warning:

::: info Emulator Running in Nested Virtualization

> Emulator is running using nested virtualization. This is not recommended. It may not work at all. And typically the performance is not quite good.

:::

This article walks through the issue, explains why it happens, and presents a clean setup that avoids the performance and stability problems caused by nested virtualization.

---

## The Problem: Nested Virtualization

If you install Android SDK and Emulator inside WSL2 (Ubuntu) and try to launch an Android Virtual Device (AVD) from there, you're essentially running a virtualized Android device inside a virtualized Linux environment, which itself runs inside of Windows on your actual hardware. This is called nested virtualization and it doesn't play well with the Android Emulator. Issues you’ll likely run into are slow or failed emulator startup, rendering glitches or crashes, and limited support for hardware acceleration.

Alongside nested virtualization warnings, you might also see:

::: info GPU Driver Issue

> Some users have experienced emulator stability issues with this driver version. As a result, we're selecting a compatibility renderer. Please check with your manufacturer to see if there is an updated driver available.

:::

This usually means your GPU driver isn't compatible with the emulator’s preferred acceleration mode. It forces the emulator to use a software compatibility renderer, which further slows things down.

---

## The Solution: Run Emulator on Windows, Connect via ADB in WSL2

The correct and recommended approach is to run the emulator directly from Windows, and then connect to it from WSL2 using `adb connect`. In order for it to work, you must have the same version of the [<VPIcon icon="fa-brands fa-anddroid"/>Android Debug Bridge](https://developer.android.com/tools/adb) (adb) installed in Windows and Ubuntu (WSL2). Your Windows system will then host the emulator and your Linux Subsystem (Ubuntu/WSL2) will connect through it. Here is a step-by-step setup guide.

---

## Install Android Studio in Windows

The simplest way to install the Android Build Tools, Device Manager, Emulator, and essential platform tools like ADB on Windows is by installing [<VPIcon icon="fa-brands fa-anddroid"/>Android Studio](https://developer.android.com/studio). It includes everything you need out of the box.

However, to use tools like `adb` from the "Terminal" in Windows, you'll need to update your "Environment Variables". If you skip this step, you’ll likely run into the following error:

> 'adb' is not recognized as an internal or external command, operable program or batch file.

To fix this problem, make sure the following path is added to the `Path` under "System variables":

```plaintext
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

This allows you to run `adb` from any terminal window. To confirm it's working, open a terminal and run:

```sh
adb --version
```

You should see output similar to:

```plaintext
Android Debug Bridge version 1.0.41
Version 36.0.0-13206524
Running on Windows 10.0.26200
```

Once verified, make sure you're using **the same ADB version inside your WSL2 distribution** to avoid connection issues between Windows and Linux.

---

## Install ADB in Ubuntu

You can install `adb` on Ubuntu with the following commands:

```sh
sudo add-apt-repository universe
sudo apt-get update
sudo apt install android-sdk
```

This installs the Android SDK along with platform tools, which include `adb`. However, this method doesn't guarantee a specific version of `adb`, and the version installed might be different from what you installed on your Windows host system.

To ensure both environments (Windows + Ubuntu) use the same version, you can manually [<VPIcon icon="fa-brands fa-anddroid"/>download the latest platform-tools](https://developer.android.com/tools/releases/platform-tools#downloads), extract them, and replace the ones installed from the universe repository:

```sh
# Unzip "platform-tools"
unzip platform-tools-latest-linux.zip
# Remove existing "platform-tools"
sudo rm -rf /usr/lib/android-sdk/platform-tools
# Move unzipped "platform-tools" into the Android SDK
sudo mv platform-tools /usr/lib/android-sdk/
```

After updating, you can verify the installation by running `adb --version`. You should now see output similar to:

```plaintext
Android Debug Bridge version 1.0.41
Version 36.0.0-13206524
Running on Linux 6.6.87.2-microsoft-standard-WSL2 (x86_64)
```

This ensures you're using the most up-to-date version of `adb` and avoids potential compatibility issues between Windows and WSL2. ---

## Launch AVD on Windows

Open your "Terminal" on Windows and execute the following command:

```sh
adb -a -P 5037 server
```

The `-a` flag instructs the ADB server to listen on all network interfaces, enabling remote connections from other systems (e.g. WSL2/Ubuntu). The `-P` flag defines the specific port on which the ADB server will listen. Port 5037 is the default ADB server port.

The `server` option tells ADB to start the server process manually rather than performing another client command. You can also include the `nodaemon` option to keep the server running in the foreground rather than letting it move to the background.

If you run `adb devices` now, you’ll see an empty list of connected devices since an Android Virtual Device (AVD) must be launched first.

::: tip Troubleshooting

If you encounter the following error:

> could not install *smartsocket* listener: cannot bind to 0.0.0.0:5037: Only one usage of each socket address (protocol/network address/port) is normally permitted. (10048)

This means another `adb` server is already using that port. To fix this, stop the existing server by running `adb kill-server` and/or close all active Android Emulators.

:::

---

## Create AVD on Windows

When you launch Android Studio on Windows, go to "Projects" and select "More Actions". From there, open the "Virtual Device Manager", which allows you to create and manage "Android Virtual Devices" (AVDs) for emulation.

After creating an AVD, you can start it from the Virtual Device Manager by clicking the "Play" button.

Now, if you run `adb devices` again in your "Terminal" on Windows, you should see an entry similar to the following:

```plaintext
List of devices attached
emulator-5554   device
```

You can also launch the Android emulator from the command line, but first you need to add `%LOCALAPPDATA%\Android\Sdk\emulator` to your system’s `Path` environment variable. Once that’s done, you can list and start your virtual devices with the following commands:

```sh
emulator -list-avds
emulator -avd Pixel_4_XL
```

---

## Connect to ADB from Ubuntu

To connect from Ubuntu's ADB to your ADB running on Windows, you first need to determine the IP addresses of your Windows environment. You can do this by running `ipconfig` in the Windows "Command Prompt", which will display entries similar to the following:

```plaintext
Wireless LAN adapter Wi-Fi:

   Connection-specific DNS Suffix  . : fritz.box
   IPv4 Address. . . . . . . . . . . : 192.168.178.125
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.178.1

Ethernet adapter vEthernet (WSL (Hyper-V firewall)):

   Connection-specific DNS Suffix  . :
   IPv4 Address. . . . . . . . . . . : 172.30.224.1
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :
```

The IP range **172.16.0.0 – 172.31.255.255** is reserved for private networks. Similarly, the range **192.168.178.x** represents private IP addresses commonly used in home networks, often with a Fritzbox or similar router. You can assign a specific address (192.168.178.125 in my case) and configure your router to always reserve that IP for your device, making it easier to reconnect after restarting your computer.

After identifying the IP address of your Windows host system, you can connect from your Ubuntu command line with the following command:

```sh
adb -H 172.20.96.1 -P 5037 devices
```

This command is essentially the same as `adb devices`, but it specifies the host and port of your Windows system.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Android Emulator Running in Nested Virtualization",
  "desc": "Running the Android Emulator directly inside WSL2 can cause performance issues. The solution is to run the emulator on Windows and connect to it from WSL2 using ADB. Make sure to use the same ADB version in both environments.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/android-emulator-running-in-nested-virtualization.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
