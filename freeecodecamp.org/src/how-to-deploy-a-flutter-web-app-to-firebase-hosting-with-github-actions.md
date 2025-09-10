---
lang: en-US
title: "How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions"
description: "Article(s) > How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions"
icon: 
category:
  - DevOps
  - Github
  - Google
  - Firebase
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - google
  - firebase
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions"
    - property: og:description
      content: "How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-flutter-web-app-to-firebase-hosting-with-github-actions.html
prev: /devops/github/articles/README.md
date: 2025-08-21
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755708006335/0ab99f10-4df5-4fbf-b293-6a6fef1bcade.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabse > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions"
  desc="Deploying a Flutter web app can feel repetitive if you’re doing it manually every time. GitHub Actions automates this by continuously deploying your app to Firebase Hosting whenever you push code to your repository. This guide walks you through setti..."
  url="https://freecodecamp.org/news/how-to-deploy-a-flutter-web-app-to-firebase-hosting-with-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755708006335/0ab99f10-4df5-4fbf-b293-6a6fef1bcade.png"/>

Deploying a Flutter web app can feel repetitive if you’re doing it manually every time. GitHub Actions automates this by continuously deploying your app to Firebase Hosting whenever you push code to your repository.

This guide walks you through setting up Firebase Hosting, configuring GitHub Actions, and managing deployments. By the end, you’ll have a reliable CI/CD pipeline for your Flutter web project.

::: note Prerequisites

Before diving in, make sure you have these ready:

**1. Flutter Installed**

You can install Flutter from [<VPIcon icon="fas fa-globe"/>flutter.dev](https://flutter.dev/), then confirm installation with:

```sh
flutter --version
```

**2. Firebase CLI Installed:**

The Firebase CLI lets you interact with Firebase Hosting. Install it via npm like this:

```sh
npm install -g firebase-tools
```

Check installation with:

```sh
firebase --version
```

**3. A GitHub Repository:**

Your Flutter project should be pushed to GitHub.

**4. Firebase Project Created:**

Go to [<VPIcon icon="iconfont icon-firebase"/>Firebase Console](https://console.firebase.google.com/), create a project, and enable Firebase Hosting.

:::

---

## Step 1: Set Up Firebase Hosting

### Initialize Firebase in Your Project

Open your terminal and navigate to your project:

```sh
cd path/to/your/flutter/project
```

Initialize Firebase Hosting:

```sh
firebase init
```

During setup, you’ll need to provide some information:

1. **Hosting**: Select Firebase Hosting.
2. **Public Directory**: Enter `build/web` (this is where Flutter outputs web builds).
3. **Single-Page App**: Select **Yes** (rewrites all routes to `/index.html`).
4. **Automatic Builds**: You can skip since we’ll configure GitHub Actions manually.

---

## Step 2: Configure Firebase Hosting

A file called `firebase.json` will be created. Ensure it looks like this:

```json title="firebase.json"
{
  "hosting": {
    "public": "build/web",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

1. `hosting.public` tells Firebase where to find your built app (`build/web`).
2. `ignore` files Firebase should not upload (hidden files, config files, `node_modules`).

You may also see a `.firebaserc` file for project aliasing:

```json title=".firebaserc"
{
  "projects": {
    "default": "your-project-id"
  }
}
```

This links your local project to your Firebase project ID.

---

## Step 3: Add Firebase Config to Flutter

When you connect Firebase to Flutter (via the `flutterfire` CLI), it generates a file like <VPIcon icon="fa-brands fa-dart-lang"/>`firebase_options.dart`.

In your <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`, initialize Firebase:

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MyApp());
}
```

1. `WidgetsFlutterBinding.ensureInitialized()` ensures that the Flutter engine is ready before Firebase initializes.
2. `Firebase.initializeApp()` connects your app to Firebase using the auto-generated options.

---

## Step 4: Configure GitHub Actions

We’ll now create a workflow that automatically builds and deploys your Flutter web app.

Create a file in your repo: <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`firebase-hosting.yml`

```yaml :collapsed-lines title=".github/workflows/firebase-hosting.yml"
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main  # Deploy only when code is pushed to main
  pull_request:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Repository
      uses: actions/checkout@v2

    - name: Set up Flutter
      uses: subosito/flutter-action@v3
      with:
        flutter-version: '3.24.1'

    - name: Install Dependencies
      run: flutter pub get

    - name: Build Flutter Web
      run: flutter build web --release

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install Firebase CLI
      run: npm install -g firebase-tools

    - name: Deploy to Firebase Hosting
      run: firebase deploy --only hosting --project <firebase-project-id>
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

Here’s what’s going on in this code:

1. **Checkout Repository**: Pulls your code into the runner.
2. **Set up Flutter**: Installs the specified Flutter version.
3. **Install Dependencies**: Runs `flutter pub get`.
4. **Build Flutter Web**: Builds the release version of your web app.
5. **Set up Node.js**: Needed for Firebase CLI.
6. **Install Firebase CLI**: Installs Firebase deploy tool.
7. **Deploy to Firebase Hosting**: Deploys the built files to Firebase.

---

## Step 5: Set Up Firebase Token

GitHub needs a token to authenticate with Firebase.

Run this locally:

```sh
firebase login:ci
```

Then copy the token shown.

Next, go to your **GitHub Repository → Settings → Secrets and Variables → Actions.**

Create a new secret named: `FIREBASE_TOKEN` and paste in the token you copied. This keeps your credentials safe.

---

## Step 6: Validate & Monitor Deployment

Commit the workflow file like this:

```sh
git add .github/workflows/firebase-hosting.yml
git commit -m "Setup GitHub Actions for Firebase Hosting"
git push origin main
```

Go to your GitHub repo, select the Actions tab, and then watch the workflow run. You will see an interface that looks like these images:

![work flow in running in progress](https://cdn.hashnode.com/res/hashnode/image/upload/v1724583714171/e9e6e064-cfb2-4597-84c9-ae5970c034d2.png)

![work flow completed](https://cdn.hashnode.com/res/hashnode/image/upload/v1724752407403/aa243495-a2b8-4d2d-a62b-2691d0cf4f21.png)

Once it’s successful, go to:

- <VPIcon icon="fas fa-globe"/>`https://your-project-id.web.app`
- <VPIcon icon="fas fa-globe"/>`https://your-project-id.firebaseapp.com`

---

## Advanced Configurations

### Custom Build

If you need a specific renderer (for example, HTML instead of CanvasKit):

```yaml
run: flutter build web --release --web-renderer html
```

### Multiple Environments (Staging & Production)

```yaml
run: firebase deploy --only hosting --project ${{ secrets.FIREBASE_PROJECT }}
```

Define `FIREBASE_PROJECT` as a secret for each environment.

### Cache Dependencies (Speed up builds)

```yaml
- name: Cache Flutter Dependencies
  uses: actions/cache@v3
  with:
    path: ~/.pub-cache
    key: ${{ runner.os }}-pub-cache-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-pub-cache-
```

---

## Troubleshooting

You might encounter a few common issues. Her are some quick fixes to help you deal with them:

| Issue | Fix |
| --- | --- |
| **No active project** | Run `firebase use --add` locally and check `.firebaserc`. |
| **Node.js version mismatch** | Ensure `node-version: '18'` in workflow. |
| **Firebase CLI errors** | Reinstall with `npm install -g firebase-tools`. |
| **Deprecated warnings in index.html** | Update to latest Flutter web template. |

---

## Wrapping Up

By integrating Firebase Hosting with GitHub Actions, you now have a **CI/CD pipeline** for your Flutter web app.

Every push to `main` automatically triggers a build and deploy, keeping your app live with zero manual effort.

To dive deeper, check:

<SiteInfo
  name="Web support for Flutter"
  desc="Details of how Flutter supports the creation of web experiences."
  url="https://docs.flutter.dev/platform-integration/web/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

```component VPCard
{
  "title": "Firebase Hosting",
  "desc": "Firebase Hosting provides fast and secure hosting for your web app.",
  "link": "https://firebase.google.com/docs/hosting/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Flutter Web App to Firebase Hosting with GitHub Actions",
  "desc": "Deploying a Flutter web app can feel repetitive if you’re doing it manually every time. GitHub Actions automates this by continuously deploying your app to Firebase Hosting whenever you push code to your repository. This guide walks you through setti...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-flutter-web-app-to-firebase-hosting-with-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
