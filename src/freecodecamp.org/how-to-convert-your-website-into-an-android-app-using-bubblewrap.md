---
lang: en-US
title: "How to Convert Your Website into an Android App Using Bubblewrap"
description: "Article(s) > How to Convert Your Website into an Android App Using Bubblewrap"
icon: fa-brands fa-node
category:
  - Node.js
  - Java
  - Android
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - java
  - jdk
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Convert Your Website into an Android App Using Bubblewrap"
    - property: og:description
      content: "How to Convert Your Website into an Android App Using Bubblewrap"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-your-website-into-an-android-app-using-bubblewrap.html
prev: /programming/js-node/articles/README.md
date: 2025-08-20
isOriginal: false
author:
  - name: Sanjay R
    url : https://freecodecamp.org/news/author/sanjayxr/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755625913612/bfffd5f9-f4d6-4f8d-aae8-72f5730bd7e9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Convert Your Website into an Android App Using Bubblewrap"
  desc="If you are a web developer who doesn’t know about App Development (like me!), then this article is for you. I’ll teach you how to turn your website into a native app, without new frameworks or languages. You’ll learn how to convert a website to a PWA..."
  url="https://freecodecamp.org/news/how-to-convert-your-website-into-an-android-app-using-bubblewrap"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755625913612/bfffd5f9-f4d6-4f8d-aae8-72f5730bd7e9.png"/>

If you are a web developer who doesn’t know about App Development (like me!), then this article is for you. I’ll teach you how to turn your website into a native app, without new frameworks or languages. You’ll learn how to convert a website to a PWA (Progressive Web App) that you can publish on the Play Store.

First, we’ll turn your website into a Progressive Web App (PWA). Then we'll use a free command-line tool from Google called **Bubblewrap** to package that PWA into an Android app. Let’s get started.

::: note Prerequisites

If you follow along with this tutorial, there are some prerequisites:

- Basic knowledge of web development
- Your site should be live to the public, and you’ll need to have access to its source code.
- We'll use npm to install the necessary tools, so make sure you have Node.js installed.

This tutorial is based on a **Vite** project, but the final steps with Bubblewrap are the same for any web framework.

:::

---

## What is a PWA?

PWA stands for **Progressive Web Application**, and its goal is to make your website look and feel just like a native app. If you’ve visited a website in your browser and seen an install icon that lets you download it to your phone or laptop, you've used a PWA.

But it’s not just about the look and feel. A PWA also has app-like features, such as working offline, sending push notifications, and more.

There are two main components of a PWA.

- The manifest file describes your app, such as its name, icons, start URL, and so on.
- A service worker is a background JavaScript file that acts as a proxy. The caching and push notifications are handled by a service file, which runs as a different thread apart from the main thread.

Without these two components, browsers won’t let users download the app locally.

The manifest file and the service worker are like a checklist for the browser. When you visit a website, the browser looks for both of these components. If they are present and correctly configured, the browser knows it's a true PWA and will show the "install" icon, allowing users to download the app locally. Without them, the browser just sees a regular website, and the option to install won't be available.

---

## What is Bubblewrap?

Bubblewrap is a command-line tool made by Google that takes your PWA and turns it into an Android App using a Trusted Web Activity (TWA).

Bubblewrap simplifies the process of creating a TWA, turning a PWA's manifest file into an Android app package (APK or AAB).

### What is a TWA (Trusted Web Activity)?

A Trusted Web Activity (TWA) is a modern Android feature that lets you display your live website full-screen inside an Android app. Basically, it runs the website on the browser, but it doesn’t show the browser address bar on the App. This helps it feel like a native app.

To unlock this full-screen feature, your app needs to be “Trusted“.

This is where the "secret handshake" comes in. Android needs to be sure that the person who built the app and the person who owns the website are the same. Without this proof of ownership, the TWA will run in a fallback mode and show the browser address bar at the top, ruining the native app feel.

### How TWA Verifies Trust

This trust is verified using a system called **Digital Asset Links**. You place a special file on your website (we'll do this in the implementation part) that contains your app's unique digital fingerprint. When a user opens your app, the Android OS checks this file. If the fingerprints match, it grants your app "trusted" status, removes the address bar, and enables other features like deep linking.

You can check this relationship yourself using Google's official testing tool: [<FontIcon icon="fa-brands fa-google"/>Digital Asset Links Verifier](https://developers.google.com/digital-asset-links/tools/generator).

Now that you understand the project and tools, let’s start building.

---

## Step 1 - Configure Your PWA in Vite

The first step is to add the two main components for a PWA: the manifest file and service worker. This is what will allow the browser to recognize it as "installable."

This guide is based on a project built with Vite, which makes this process easy with a special plugin. If you're using a different tool, the concepts are the same, but you'll need to look up different resources about the specific steps for your environment.

### Create Your App Icons

Before we touch any code, we need the icons for our app. Android requires specific sizes for the app's launcher icon (what you see on your home screen) and the splash screen (what you see when the app starts).

You'll need two main sizes: `192x192` pixels and `512x512` pixels. You can use this [<FontIcon icon="fas fa-globe"/>Favicon Generator](https://realfavicongenerator.net/) to generate your logo in the respective sizes. You can upload your main logo, and it will generate all the necessary sizes for you.

Then just download the generated files and place the `192x192` and `512x512` files into the <FontIcon icon="fas fa-folder-open"/>`public` folder of your project.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755067586673/f7e06fc2-4b55-4ec3-af05-b2e78bf19273.png)

### Install the Vite PWA plugin

A PWA requires a manifest file and a service worker. We can create these manually, but this plugin automates that entire process. It will automatically generate a <FontIcon icon="iconfont icon-json"/>`manifest.json` and <FontIcon icon="fa-brands fa-js"/>`service-worker.js` for you every time you build your project.

```sh
npm install vite-plugin-pwa -D
```

### Configure the Plugin

In this step, we’ll use this plugin and configure our app's manifest. Edit the <FontIcon icon="iconfont icon-typescript"/>`vite.config.ts` file. This configuration will tell the plugin what to name your app, which icons to use, and so on.

```ts title="vite.config.ts"
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",   
      manifest: {
        name: "your app name",
        short_name: "your app short name",
        description: "write any description",
        theme_color: "#0d1117",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ]
```

Now, when you run `npm run build`, the plugin will automatically generate the manifest and service worker files for you. With that done, deploy the changes. Now your website is a PWA.

---

## Step 2 - Create the Android App

Now that your website is a PWA, let’s use Bubblewrap to package it into an Android app.

### Create a Build Folder

Create a dedicated folder for your Android project files. In your project's root, create a new folder. I'll call mine <FontIcon icon="fas fa-folder-open"/>`android`.

```plaintext title="file structure"
project/
├── client/
├── server/
└── android/
```

Now navigate to the new folder that you created.

### Install the Bubblewrap CLI

```sh
npm install -g @bubblewrap/cli
```

### Initialize the Project

Next, run the `init` command. Bubblewrap will connect to your live website, read the `manifest.webmanifest` file that Vite created, and use that information to generate a basic Android project.

```sh
bubblewrap init --manifest=https://your-website-domain/manifest.webmanifest
```

Run the command, replacing `your-website-domain` with your actual URL:

### Let’s troubleshoot the `init` command

As you run the `init` command, Bubblewrap will need two key software packages: the **Java Development Kit (JDK)** and the **Android SDK**. It will offer to install them for you.

#### JDK setup

```plaintext title="output"
? Do you want Bubblewrap to install the JDK (recommended)?
  (Enter "No" to use your own JDK 17 installation) (Y/n)
```

In my case, when I let Bubblewrap install the JDK, the process downloaded the files but then failed at the "decompressing" step. If you face this same problem, don't worry! The fix is to install it manually.

- Say **No** to the prompt.
- Download the recommended version (usually JDK 17) from a source like [<FontIcon icon="fa-brands fa-java"/>Adoptium](https://adoptium.net/temurin/releases/?version=17).
- Install it and set up your system's environment variables to include the JDK's `bin` path. If you’re not sure how to set environment variables, you can check out this site: [**Set Environment Variables**](/c-sharpcorner.com/how-to-addedit-path-environment-variable-in-windows-11.md).
- When Bubblewrap asks for the path, provide it directly, such as `C:\java\jdk-17.0.16.8-hotspot`.

#### Android SDK setup

Once the JDK is set up successfully, the next step is to configure the Android SDK.

```plaintext title="output"
? Do you want Bubblewrap to install the Android SDK (recommended)?
  (Enter "No" to use your own Android SDK installation) (Y/n)
```

Since I didn't have the Android SDK, I let Bubblewrap handle this by selecting **Yes**. I didn't face any problems here.

If you face any problem in setting up on Android SDK, just set it up manually and give the path, just like the JDK setup.

---

## Step 3 - Answer Bubblewrap Questions

After the SDK is set up, Bubblewrap will ask a bunch of questions to configure your app. This information is used to create the <FontIcon icon="iconfont icon-json"/><FontIcon icon="iconfont icon-json"/>`twa-manifest.json` file, which is the blueprint for your App.

```plaintext
Domain: Press Enter (auto-filled from your manifest)

Application name: Your full app name

Application ID: (e.g, chat.yourapp.twa)

Display mode: standalone

Orientation: portrait

Status bar color: Press Enter (accepts default)

Splash screen color: Press Enter (accepts default)

Icon URL: Press Enter (accepts default)

Include support for Play Billing?: Type Y if your app uses Google Play in-app purchases. Otherwise, N

Request geolocation permission?: Type Y if your app needs location access. Otherwise, N
```

In these questions, the important part is the key store and the key.

```plaintext
First and Last names: Your full name

Organizational Unit: Developer or anything

Organization: Your organization name

Country (2-letter code): Your country code

Password for key store: Enter a new password

Password for key: Re-enter the same password
```

::: note

These passwords for both the key store and key should be the same, or else it will throw an error. **Refer to this issue:** [Bubblewrap Issue (<FontIcon icon="iconfont icon-github"/>`GoogleChromeLabs/bubblewrap`)](https://github.com/GoogleChromeLabs/bubblewrap/issues/713).

:::

---

## Step 4 - Build the App

```sh
bubblewrap build --universalApk
```

This command starts building your application. Here, the flag `universalApk` will produce the `.apk` and `.abb`. If you’re going to publish your application in the Play Store, upload the `.abb` file to the Play Store. For our testing, we need an APK file, so this flag `universalApk` will produce both files. If we didn't give this flag, it would only give us `.abb`.

---

## Step 5 - Setting Up TWA Validation

Once the build is done, you’ll get the APK. Transfer it to your phone and test it. When you open the app, you’ll see the browser address bar. This is because we haven't set up the "trust" between your app and your website yet. Let's fix that now.

In your frontend project, go to the <FontIcon icon="fas fa-folder-open"/>`public` folder, create a new folder called <FontIcon icon="fas fa-folder-open"/>`.well-known`, and inside that, create a file called <FontIcon icon="iconfont icon-json"/>`assetlinks.json`.

```plaintext title="file structure"
frontend/
├── public/
    ├── .well-known/
        └── assetlinks.json
```

### What is the <FontIcon icon="fas fa-folder-open"/>`.well-known` folder?

A well-known folder is used to store files that define configurations for protocols, as it’s used for external sources to find the validation for your website. In our case, our app checks the well-known folder from our website and verifies the validation.

Paste the following into <FontIcon icon="iconfont icon-json"/>`assetlinks.json`:

```json title="assetlinks.json"
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "chat.yourapp.twa",
      "sha256_cert_fingerprints": [
       "your_sha256_fingerprint"
      ]
    }
  }
]
```

### What is `delegate_permission/common.handle_all_urls`?

This is a special flag that opens all the links from the app instead of the domain. Simply put, it acts as a deeplink. After you install the app, if you click your website link from WhatsApp or from somewhere, it will open your app instead of opening in a browser, acting as a deeplink.

The `package_name` field should be the `packageId`, which you can get from your Android build folder in <FontIcon icon="iconfont icon-json"/>`twa-manifest.json`.

Now, get your fingerprints. Run the following command to do so:

```sh
keytool -list -v -keystore android.keystore -alias android
```

The alias name should be the value that you created. Once you enter this command, it’ll ask for the key store password. Enter that, and you’ll get your `SHA256` fingerprint. Copy that and paste it into the <FontIcon icon="iconfont icon-json"/>`assetslinks.json` file in the `sha256_cert_fingerprints` array. Now push these changes to production. You can verify the validation in [<FontIcon icon="fa-brands fa-google"/>Digital Asset Links](https://developers.google.com/digital-asset-links/tools/generator)

That’s it! Now you can install the app and test it.

---

## Step 6 (Optional) - Customize the In-App Experience

Now, additionally, there will be some cases where we want to show different content to users on the website vs the mobile app. Can we do that? Yes!

In your Android build folder, in <FontIcon icon="iconfont icon-json"/>`twa-manifest.json`, there will be a field called `startUrl`. If not, add it and add the value `"startUrl": "/?twa=true"`. The `startUrl` is the entry point. I have a query parameter of value `twa=true`.

Run the build again with `bubblewrap build --universalApk`.

Now, if you open your app, it will open the app with the entry URL as `yourwebsitedomain.com/?twa=true`.

In your frontend:

```ts
const twaParam = queryParams.get("twa");

const [isTwa, setIsTwa] = useState<boolean>(() => {
   return localStorage.getItem("isTwa") === "true";
});

useEffect(() => {
  if (twaParam === "true") {
    localStorage.setItem("isTwa", "true"); // set the value to local storage
    setIsTwa(true);
  }
}, [twaParam]);
```

```ts
{isTwa? (
  <Link to="/contact" className="underline hover:text-primary">
     Contact
  </Link> 
) : (
   <Link to="/download" className="underline hover:text-primary">
     Download App
    </Link>
)}
```

In the code above, we check for the `twa=true` query parameter in the URL. If it's present, we save that information to local storage, and then we conditionally render the content for the user.

That's it. We have created an App.

If you want to change any name, colour, or splash screen, you can change it in <FontIcon icon="iconfont icon-json"/>`twa-manifest.json` and run the build again.

---

## Wrapping Up

Bubblewrap is only for Android. If you want the app to support cross-platform, there are some other platforms, like Capacitor, which I’ll write about in another article.

By the way, you can check out the App that I made using Bubblewrap here:

<SiteInfo
  name="Stranger Talk - Chat with Random People Anonymously"
  desc="Stranger Talk lets you connect instantly and chat with random people around the world without registration. Start talking now!"
  url="https://strangertalk.chat"
  logo="https://strangertalk.chat/favicon.ico"
  preview="https://strangertalk.chat/preview.png"/>

If there are any mistakes or you have any questions, contact me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`sanjay-r-ab6064294`)](https://linkedin.com/in/sanjay-r-ab6064294/) or [Instagram (<FontIcon icon="fa-brands fa-instagram"/>`heheheh_pet`)](https://instagram.com/heheheh_pet/profilecard/?igsh=eXh3MWw4ZzZ3NTRq).

Thank you for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Convert Your Website into an Android App Using Bubblewrap",
  "desc": "If you are a web developer who doesn’t know about App Development (like me!), then this article is for you. I’ll teach you how to turn your website into a native app, without new frameworks or languages. You’ll learn how to convert a website to a PWA...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-your-website-into-an-android-app-using-bubblewrap.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
