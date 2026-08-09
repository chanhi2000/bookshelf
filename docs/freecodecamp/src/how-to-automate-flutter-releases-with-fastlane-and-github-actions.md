---
lang: en-US
title: "How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect"
description: "Article(s) > How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Ruby
  - DevOps
  - Apple
  - macOS
  - Github
  - Github Actions
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - rb
  - ruby
  - devops
  - apple
  - macos
  - github
  - githubactions
  - github-actions
  - google
  - gcp
  - google-cloud-platform
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect"
    - property: og:description
      content: "How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-flutter-releases-with-fastlane-and-github-actions.html
prev: /programming/dart/articles/README.md
date: 2026-08-12
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/597b4887-5912-4a71-a0c2-ecbf8bdcfb4c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Ruby > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devpos/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devpos/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect"
  desc="Picture this: it's 4pm on a Friday, and your team has just merged the last feature for the sprint. But your product manager asks for a new build on TestFlight by the end of the day so the client can r"
  url="https://freecodecamp.org/news/how-to-automate-flutter-releases-with-fastlane-and-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/597b4887-5912-4a71-a0c2-ecbf8bdcfb4c.png"/>

Picture this: it's 4pm on a Friday, and your team has just merged the last feature for the sprint. But your product manager asks for a new build on TestFlight by the end of the day so the client can review it over the weekend.

You open Xcode, wait for the archive to finish, deal with a code signing error that wasn't there yesterday, fix it, re-archive, wait again, upload, and wait for App Store Connect to process it. Then you do the same for Android, but now through Android Studio. You sign the APK, log into Firebase App Distribution, drag the file in, add the testers, write the release notes, and hit send.

It's now 6:45 PM. You haven't written a line of product code in two hours. This happens every release cycle.

Now picture the alternative: you push your code to the <VPIcon icon="fas fa-code-branch"/>`dev` branch. GitHub's servers take over. Within minutes, an isolated cloud environment has checked out your code, installed Flutter, decoded your signing credentials from encrypted secrets, built the APK and the IPA, and distributed both to Firebase App Distribution for Android testers and TestFlight for iOS testers simultaneously. You're already home. The notification goes out to testers automatically.

That's the pipeline this handbook builds.

By the time you reach the end of this guide, pushing to <VPIcon icon="fas fa-code-branch"/>`dev` will automatically distribute builds to Firebase App Distribution and TestFlight. Pushing to <VPIcon icon="fas fa-code-branch"/>`prod` will distribute to the Google Play Store and the Apple App Store. You'll never manually export an IPA or upload an APK again.

The tools that make this possible are GitHub Actions, which provides the cloud computers that run the automation, and Fastlane, which handles the build, signing, and distribution logic. This handbook treats both as production infrastructure deserving the same care and documentation as the app itself.

::: note Prerequisites

Before starting, make sure the following are in place. Skipping any of these will cause failures that are difficult to diagnose.

1. **An existing Flutter project with a GitHub repository:** The project should already be building locally. If `flutter build apk --release` and `flutter build ios --release --no-codesign` both succeed on your machine, you're ready.
2. **An Apple Developer account with Admin or Account Holder role:** You need this to create App Store Connect API keys. A Developer role isn't sufficient.
3. **A Google Play Console account with a published app in at least draft state:** The Google Play API can't push to an app that has never had any version uploaded. If your app is brand new, you need to do one manual upload to create the app listing before automation can take over.
4. **A Firebase project** with Firebase App Distribution enabled for both Android and iOS.
5. **Ruby installed on your development machine:** Fastlane is a Ruby gem. Run `ruby -v` to check. macOS ships with Ruby but it's often outdated. Install a current version via Homebrew: `brew install ruby`.
6. **Fastlane installed locally:** Install it with `gem install fastlane`. You'll use it from your terminal during setup before the CI server takes over.
7. **Homebrew installed on macOS:** Used for installing dependencies locally.
8. **A terminal you're comfortable with:** Every step in this guide involves running commands. There's no GUI alternative for most of it.

:::

---

## What is CI/CD and Why Your Flutter App Needs It

### The Concept

CI/CD stands for Continuous Integration and Continuous Delivery. At its core, it's the practice of automating the steps between writing code and getting that code to users. Continuous Integration means every code change is automatically built and tested. Continuous Delivery means every successful build is automatically prepared for distribution.

For mobile development specifically, this matters more than in almost any other software domain. Mobile builds are complex: they involve code signing with certificates, provisioning profiles, keystore files, and API keys that must be correctly assembled in exactly the right way for the build to succeed. Doing this manually is error-prone. Automating it makes it reliable and repeatable.

### Why Manual Deployment Is a Problem

When deployment is manual, several things happen over time. First, it becomes a specialized skill. Only the one or two people who have done it before know the steps, and when they're unavailable, the team can't ship.

Second, it's inconsistent. The build one person produces on their laptop may have subtly different environment variables or Xcode settings than the build someone else produces on theirs.

Third, it's slow. Builds, archives, and uploads are waiting games that interrupt the flow of real engineering work.

Automation solves all three. The steps are written down in version-controlled files. The environment is identical on every run because it's a fresh cloud machine assembled from those files. And the process runs in the background while you work on the next feature.

![A side-by-side comparison diagram titled "Manual vs Automated Deployment." The left side illustrates a manual mobile app deployment process performed on a developer's computer. The workflow shows a developer opening Xcode or Android Studio, archiving and building the application, resolving signing errors, rebuilding, uploading the app, waiting for processing, writing release notes, and notifying testers. The diagram emphasizes that this process typically takes one to three hours per release and is prone to human error, inconsistent environments, and knowledge silos.  The right side illustrates an automated deployment pipeline. A developer pushes code to the dev branch, which automatically triggers GitHub Actions on a cloud runner. The workflow checks out the code, installs Flutter, decodes secrets, builds and signs Android and iOS applications, uploads them to Firebase App Distribution and TestFlight, and automatically notifies testers. The diagram highlights that the developer's effort is limited to pushing code, resulting in zero manual deployment work, with a deterministic, version-controlled process that minimizes human error and ensures consistent releases.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/90da1ffa-63bf-4452-8384-593016817541.png)

---

## The Architecture: How All the Pieces Connect

Before touching any configuration file, understand the full system and how every component fits together. Building without this picture leads to debugging failures without knowing where to look.

**GitHub Actions** provides cloud-based virtual machines called runners. Every time you push to a configured branch, GitHub spins up a fresh runner (Ubuntu for Android, macOS for iOS), executes the steps in your workflow file, and tears down the machine when done. The machine starts completely clean every time.

**Fastlane** is an open-source tool for automating mobile build and deployment tasks. It runs inside the GitHub Actions runner and handles the platform-specific steps: building the app bundle, managing iOS code signing, and uploading binaries to distribution platforms. You write Fastlane "lanes" (named sequences of steps) that GitHub Actions calls.

**Fastlane Match** is a sub-system within Fastlane for iOS code signing. iOS apps require a certificate and a provisioning profile to be installed on the machine that builds them. Match stores these in an encrypted private GitHub repository and downloads them onto the CI runner before the build. This eliminates the nightmare of managing certificates manually across multiple machines.

**Firebase App Distribution** receives your built APK and IPA files for the <VPIcon icon="fas fa-code-branch"/>`dev` environment and notifies your testers automatically.

**App Store Connect and Google Play Console** receive your production builds for the <VPIcon icon="fas fa-code-branch"/>`prod` environment.

![A flowchart showing the overall CI/CD architecture for a Flutter application. At the top is a GitHub repository with four branches: main and develop, which are protected and view-only, and dev and prod, which trigger Android and iOS workflows. The flow continues downward to GitHub Actions, where two runners execute in parallel: an Ubuntu runner for Android and a macOS runner for iOS. The Android runner checks out the code, installs Flutter, decodes the Android keystore, builds the APK, and uses Fastlane to distribute development or production builds. The iOS runner checks out the code, installs Flutter, decodes Apple credentials, builds the iOS app, retrieves signing certificates with Fastlane Match, and uses Fastlane to distribute development or production builds. Development builds are uploaded to Firebase App Distribution, with iOS builds also sent to TestFlight for beta testing. Production Android builds are uploaded to Google Play Console, while production iOS builds are uploaded to App Store Connect for review and release.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/48457243-dd61-4d00-85e9-93f492c0ad1d.png)

The certificates repository is a separate private GitHub repository that Fastlane Match reads from and writes to. It holds your iOS signing materials encrypted with a password that only you know.

![A diagram illustrating how Fastlane Match manages iOS code signing certificates. At the top is a private GitHub repository that stores encrypted signing assets protected by a MATCH_PASSWORD. The repository contains App Store distribution certificates, Ad-Hoc distribution certificates, App Store provisioning profiles, and Ad-Hoc provisioning profiles. An arrow points downward to Fastlane Match, which retrieves and decrypts these certificates during the CI build on the macOS GitHub Actions runner. The final step shows the iOS application being signed with the retrieved certificates and successfully built without requiring developers to manage certificates manually.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3be183ce-6689-44ac-befc-08654bd6cf7c.png)

---

## Generating Your Credentials and Keys

This section involves navigating multiple third-party dashboards to collect the credentials that the CI pipeline needs.

### Firebase Credentials

Firebase App Distribution needs two pieces of information: your app IDs and a service account that grants the CI server permission to upload builds.

Navigate to the Firebase Console and open your project.

![Firebase Console project overview](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/bc822324-3c39-41eb-b3a4-ca6c15bb02e2.png)

Go to **Project Settings** (the gear icon next to Project Overview in the left sidebar).

![Firebase Console left sidebar with gear icon highlighted and Project Settings open](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/319c6709-60ce-46f5-9ebe-e177eceab8e1.png)

Scroll down to the **Your apps** section. You'll see your registered Android and iOS apps listed. Find and copy the **App ID** for each. Android App IDs look like `1:1234567890:android:abc123def456`. iOS App IDs look like `1:1234567890:ios:abc123def456`.

![Firebase Console Project Settings showing the "Your apps" section with both Android and iOS app cards visible, App ID fields highlighted](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/22fdc2fd-7173-4d82-a0a6-9e1f22be13a8.png)

Stay in Project Settings and click the **Service accounts** tab.

![Firebase Console Project Settings with "Service accounts" tab selected](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/64be4919-e01e-4b72-9b23-c697e751d74e.png)

Click **Generate new private key** and confirm the dialog. A <VPIcon icon="iconfont icon-json"/>`.json` file downloads to your machine. This file is the service account credential. Keep it secure and don't commit it to any repository.

![The confirmation dialog that appears when generating the key](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/69cc3f64-5af4-45ff-a9fa-35f71be0e06a.png)

### Apple App Store Connect API Key

Apple replaced password-based API access with API keys. You need one to let Fastlane communicate with App Store Connect without requiring your Apple ID credentials.

Go to [<VPIcon icon="fa-brands fa-apple"/>App Store Connect](https://appstoreconnect.apple.com) and navigate to **Users and Access** in the top navigation.

![App Store Connect home page with "Users and Access" visible in the top navigation](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/368acdea-0f46-4ff1-9eee-42808a4903c6.png)

Click the **Integrations** tab, then select **App Store Connect API** in the left sidebar.

![App Store Connect Users and Access page with the Integrations tab selected and App Store Connect API item visible in the sidebar](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/cd535eea-8343-4514-9b60-f1cec6652153.png)

Click the **+** button to generate a new key. Name it something clear like `GitHub Actions CI`. Set the access level to **App Manager**.

![App Store Connect API key creation form with name and access fields visible](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/44b0f66a-d000-42e5-9e42-6ff002e3375a.png)

After creating the key, note down the **Issuer ID** shown at the top of the page and the **Key ID** shown in the key row. Click **Download API Key** to save the <VPIcon icon="fas fa-key"/>`.p8` file. You can only download this file once. If you lose it, you must create a new key.

![App Store Connect API keys list showing the Issuer ID at the top, and the Key ID column and Download button in the key row](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/0320fd6a-76fb-4e67-b028-dc6c554c352b.png)

### Google Play Store Service Account

The Google Play API uses a service account (a machine identity in Google Cloud) to authenticate uploads.

Open the [<VPIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://console.cloud.google.com) and make sure you're in the project linked to your Play Console.

![Google Cloud Console project selector showing the correct project selected](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/f7fa6bdb-a1d2-4bce-97ca-677de7eb6484.png)

Navigate to **IAM and Admin** in the left sidebar, then click **Service Accounts**.

![Google Cloud Console with IAM and Admin expanded in the sidebar and Service Accounts visible](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3fdeb9f5-51e9-4810-afbf-90564019f72e.png)

Click **Create Service Account**. Give it a clear name like `github-actions-play-store`. Assign the role **Service Account User**. Complete the creation.

![Google Cloud Console Create Service Account form with name and role fields visible](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3217cf5a-0fdc-4ee5-9ba5-1778094bdbca.png)

Click on the newly created service account in the list. Go to the **Keys** tab. Click **Add Key** then **Create new key**. Select **JSON** format. A <VPIcon icon="iconfont icon-json"/>`.json` file downloads.

![Google Cloud Console Service Account detail page with the Keys tab selected and "Add Key" button visible](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/6e8e7b87-45f0-450f-8e0e-74de4c6a094a.png)

Now link this service account to your Play Console. Go to [<VPIcon icon="fa-brands fa-google"/>Google Play Console](https://play.google.com/console), open your app, and navigate to **Setup** then **API access**. Grant the service account access with at minimum **Release manager** permission on your app.

![Google Play Console API access page showing the service account list and permission assignment options](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/e5a5e067-648a-45c9-b11e-4fa75fe724ab.png)

### Fastlane Match Certificates Repository

Fastlane Match stores your iOS signing materials in a dedicated private GitHub repository. Create a brand-new, completely empty, private repository now. Name it something like `your-app-certificates`. Don't initialize it with any files.

![GitHub new repository creation page with the repository name filled in, "Private" selected, and all initialization checkboxes unchecked](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/003836d4-1912-42d1-a8b6-2237203663ef.png)

Next, create a Personal Access Token so Fastlane can read from and write to this repository from the CI runner. Go to your GitHub account **Settings**, scroll to the bottom and click **Developer settings**, then click **Personal access tokens** and then **Tokens (classic)**.

![GitHub Settings sidebar with "Developer settings" visible at the bottom](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/43288275-e755-4d00-bebc-5096840b56d4.png)

Generate a new classic token. Give it a descriptive name like `fastlane-match-ci`. Under **Select scopes**, check the **repo** scope (which grants full repository access). Set the expiration to at least one year or to no expiration if your security policy allows it. Generate the token and copy it immediately. GitHub won't show it again.

![GitHub personal access token creation form with the "repo" scope checkbox checked and other options visibl](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/82755ac6-eca1-4736-899e-f64c98c92b55.png)

The newly generated token:

![The newly generated token](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/1762b6be-e4cc-42d7-b1ed-94d619c5346f.png)

---

## Background Cryptography: Turning Files Into Secrets

GitHub Actions Secrets only accepts plain text strings. Your signing credentials are binary files: the Android `.jks` keystore, the Apple <VPIcon icon="fas fa-key"/>`.p8` key file, and the Firebase <VPIcon icon="iconfont icon-json"/>`.json` service account. To store binary files as secrets, you convert them to Base64, which is a way of representing any binary data as a string of printable ASCII characters.

Every command in this section runs in your terminal. After running each command, open the resulting <VPIcon icon="fas fa-file-lines"/>`.txt` file, copy its entire contents, and save that string somewhere safe (a password manager works well). Once copied, delete the <VPIcon icon="fas fa-file-lines"/>`.txt` file.

### Generating the Android Keystore

The Android keystore is the cryptographic identity of your app on the Play Store. Once you publish an app with a particular keystore, you must use that same keystore for every update forever. Losing it means you can't push updates to your existing app. Generate it and back it up securely.

```sh
keytool -genkey -v \
-keystore release-keystore.jks \
-keyalg RSA \
-keysize 2048 \
-validity 10000 \
-alias YOUR_KEY_ALIAS \
-dname "CN=Your Name, OU=App, O=Your Company, L=Your City, ST=Your State, C=US" \
-storepass "YOUR_SECURE_PASSWORD" \
-keypass "YOUR_SECURE_PASSWORD"
```

`keytool` is part of the Java Development Kit and is the standard tool for managing Java cryptographic keystores. `-keystore release-keystore.jks` names the output file. `-keyalg RSA` and `-keysize 2048` specify the encryption algorithm and key length, which are the standard choices for Android signing.

`-validity 10000` sets the certificate validity to approximately 27 years, which is the commonly recommended value for Play Store keys. `-alias YOUR_KEY_ALIAS` is the name you will reference this key by inside the keystore. Replace it with something meaningful like your app name. `-dname` is the Distinguished Name, used to identify the certificate owner. Replace all values with your own information.

`-storepass` and `-keypass` are the passwords to protect the keystore file and the key inside it respectively. They can be the same value, which simplifies the GitHub Secrets configuration.

Now convert the keystore file to a Base64 string that GitHub Secrets can store:

```sh
base64 -i release-keystore.jks > release-keystore-base64.txt
```

`base64 -i release-keystore.jks` reads the binary `.jks` file and encodes it as a Base64 string. The `>` operator redirects the output to <VPIcon icon="fas fa-file-lines"/>`release-keystore-base64.txt` instead of printing it to the terminal. Open this file, copy the entire string (it will be long), save it to your password manager under the label `ANDROID_KEYSTORE_BASE64`, and then delete the <VPIcon icon="fas fa-file-lines"/>`.txt` file.

### Encoding the Apple API Key

```sh
base64 -i AuthKey_YOUR_KEY_ID.p8 > authkey-base64.txt
```

Replace <VPIcon icon="fas fa-key"/>`AuthKey_YOUR_KEY_ID.p8` with the exact filename of the <VPIcon icon="fas fa-key"/>`.p8` file you downloaded from App Store Connect. The Key ID is in the filename. The command encodes the binary key file to a Base64 string. Open `authkey-base64.txt`, copy the contents, save it under `APPSTORE_API_PRIVATE_KEY_BASE64`, and delete the file.

### Encoding GitHub Credentials for Match

Fastlane Match authenticates to your certificates repository using HTTP Basic Authentication, which requires a username and token encoded as Base64. This is the standard format for HTTP Basic auth.

```sh
echo -n "YOUR_GITHUB_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN" | base64
```

`echo -n` outputs the string without a trailing newline. The `-n` flag is critical: a trailing newline would be included in the Base64 encoding and would corrupt the credential. `| base64` pipes the output directly to the Base64 encoder without writing an intermediate file. The encoded result is printed directly to your terminal. Copy it and save it under `MATCH_GIT_BASIC_AUTHORIZATION`.

### Encoding Your Environment File

If your Flutter app uses a <VPIcon icon="iconfont icon-dotenv"/>`.env` file for sensitive configuration like API keys (which should never be committed to Git), you need to encode it so the CI runner can reconstruct it before building:

```sh
base64 -i .env > env-base64.txt
```

The <VPIcon icon="iconfont icon-dotenv"/>`.env` file is read from the project root and encoded to Base64. Open <VPIcon icon="fas fa-file-lines"/>`env-base64.txt`, copy the contents, save it under `ENV_FILE_BASE64`, and delete the file. If your project doesn't use a <VPIcon icon="iconfont icon-dotenv"/>`.env` file, skip this step and remove the corresponding step from the GitHub Actions workflow files later.

---

## Configuring GitHub Actions Secrets

With all your credentials encoded, add them to your GitHub repository's secret vault. Secrets stored here are encrypted at rest, masked in workflow logs (they appear as `***` if they would otherwise be printed), and are never accessible to code running outside of GitHub Actions.

In your repository on GitHub, go to **Settings** in the top navigation bar.

![GitHub repository page with "Settings" tab visible in the top navigation](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/505290af-108b-4586-a0d1-44fd31e8b1d8.png)

In the left sidebar, click **Secrets and variables**, then **Actions**.

![GitHub repository Settings page with "Secrets and variables" expanded in the left sidebar and "Actions" selected, showing the Secrets management page](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d5086bac-a8bb-4a9e-a2c9-3985cff781cb.png)

Click **New repository secret** for each secret below. The name must match exactly as written, because the workflow files reference these names directly.

![GitHub Actions Secrets page showing the "New repository secret" button and an empty secrets list](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/440f33a2-3f0c-42a3-b93d-d0d6c3e05e5e.png)

Add the following secrets one by one:

**Environment and Configuration:**

- `ENV_FILE_BASE64`: The Base64 string from encoding your <VPIcon icon="iconfont icon-dotenv"/>`.env` file.

**Firebase and Google Play:**

- `FIREBASE_APP_ID_ANDROID`: The Android App ID copied from Firebase Console (format: `1:xxx:android:xxx`).
- `FIREBASE_APP_ID_IOS`: The iOS App ID copied from Firebase Console.
- `FIREBASE_SERVICE_ACCOUNT_JSON`: Paste the raw contents of the Firebase service account <VPIcon icon="iconfont icon-json"/>`.json` file directly. Don't encode this one: the workflow writes it to a file directly.
- `GOOGLE_PLAY_JSON`: Paste the raw contents of the Google Play service account <VPIcon icon="iconfont icon-json"/>`.json` file directly.

**Android Signing:**

- `ANDROID_KEYSTORE_BASE64`: The Base64 string from encoding the `.jks` keystore file.
- `ANDROID_KEY_ALIAS`: The alias you used when generating the keystore (for example, `your-app-key`).
- `ANDROID_KEY_PASSWORD`: The key password you set when generating the keystore.
- `ANDROID_STORE_PASSWORD`: The store password you set when generating the keystore.

**Apple App Store:**

- `APPSTORE_ISSUER_ID`: The Issuer ID from App Store Connect API keys page.
- `APPSTORE_API_KEY_ID`: The Key ID from App Store Connect API keys page.
- `APPSTORE_API_PRIVATE_KEY_BASE64`: The Base64 string from encoding the <VPIcon icon="fas fa-key"/>`.p8` file.

**Fastlane Match:**

- `MATCH_GIT_BASIC_AUTHORIZATION`: The Base64 string of `username:token`.
- `MATCH_PASSWORD`: A strong password you create yourself. This is used to encrypt the certificates in the Match repository. Use a password manager to generate something strong. Keep it safe because it can't be recovered: if you lose it, you must re-create the certificates repository.

![GitHub Actions Secrets page after all secrets have been added, showing the complete list of secret names (values are hidden](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/34f6cebb-4e05-4a14-9de1-3abd41a27a7f.png)

---

## Setting Up Fastlane for Android

Fastlane for Android lives inside the <VPIcon icon="fas fa-folder-open"/>`android/` directory of your Flutter project. Create the following files.

### The Gemfile

```ruby title="android/Gemfile"
source "https://rubygems.org"
gem "fastlane"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
```

`source "https://rubygems.org"` tells Bundler (Ruby's package manager) where to fetch gems from. `gem "fastlane"` declares Fastlane as a dependency.

The `plugins_path` lines load additional plugin declarations from the `Pluginfile` if it exists. This structure allows the main `Gemfile` and the plugin list to be maintained separately, which is the convention Fastlane projects follow.

Always use Bundler (`bundle exec fastlane`) rather than calling `fastlane` directly, because Bundler ensures the exact gem versions declared in the `Gemfile.lock` are used, making builds reproducible across machines.

### The Gradle Properties File

```conf title="android/gradle.properties"
org.gradle.jvmargs=-Xmx4G -XX:MaxMetaspaceSize=1G -XX:ReservedCodeCacheSize=512m -XX:+HeapDumpOnOutOfMemoryError
```

`org.gradle.jvmargs` configures the Java Virtual Machine arguments for the Gradle build process. `-Xmx4G` sets the maximum heap memory to 4 gigabytes. `-XX:MaxMetaspaceSize=1G` limits the metaspace (class metadata) to 1 gigabyte. `-XX:ReservedCodeCacheSize=512m` reserves 512 megabytes for compiled code caching. `-XX:+HeapDumpOnOutOfMemoryError` generates a heap dump file if the JVM runs out of memory, which helps with post-mortem debugging.

Without this configuration, GitHub Actions runners frequently fail with Exit Code 137 or 143 during Gradle builds, because the default JVM memory settings exceed the 7 GB RAM limit of standard GitHub-hosted runners.

### The Android <VPIcon icon="iconfont icon-ruby"/>`Appfile`

```ruby title="android/fastlane/Appfile"
json_key_file(ENV["FIREBASE_SERVICE_ACCOUNT_JSON_PATH"])
package_name("com.yourcompany.app")
```

`json_key_file(...)` tells Fastlane where to find the Google service account JSON file that grants access to Google Play. It reads from the `FIREBASE_SERVICE_ACCOUNT_JSON_PATH` environment variable, which is set by the GitHub Actions workflow step. `package_name(...)` declares the app's package identifier. Replace `com.yourcompany.app` with your actual app package name as defined in your `AndroidManifest.xml`.

### The Android <VPIcon icon="iconfont icon-ruby"/>`Pluginfile`

```ruby title="android/fastlane/Pluginfile"
gem 'fastlane-plugin-firebase_app_distribution'
```

This declares the Firebase App Distribution plugin as a dependency. Fastlane's core installation doesn't include platform-specific plugins. The `fastlane-plugin-firebase_app_distribution` gem adds the `firebase_app_distribution` action that the `firebase` lane uses to upload builds and notify testers. Without this line, the `firebase` lane would fail with an "undefined method" error when it tries to call `firebase_app_distribution`.

### The Android Fastfile

```ruby :collapsed-lines title="android/fastlane/Fastfile"
default_platform(:android)

platform :android do
  desc "Submit a new Beta Build to Firebase App Distribution"
  lane :firebase do
    notes = ENV["RELEASE_NOTES"]
    if notes.nil? || notes.strip.empty?
      file_path = File.join(Dir.pwd, "..", "release_notes.txt")
      if File.exist?(file_path) && !File.read(file_path).strip.empty?
        notes = File.read(file_path)
      else
        notes = "New build uploaded by CI"
      end
    end

    firebase_app_distribution(
      app: ENV["FIREBASE_APP_ID_ANDROID"],
      apk_path: "../build/app/outputs/flutter-apk/app-release.apk",
      groups: "testers",
      release_notes: notes,
      service_credentials_file: ENV["FIREBASE_SERVICE_ACCOUNT_JSON_PATH"]
    )
  end

  desc "Deploy to Google Play Store"
  lane :prod do
    upload_to_play_store(
      track: 'production',
      aab: '../build/app/outputs/bundle/release/app-release.aab',
      json_key: 'play-store-service-account.json',
      skip_upload_metadata: true,
      skip_upload_images: true,
      skip_upload_screenshots: true
    )
  end
end
```

`default_platform(:android)` sets the default context so Fastlane knows it's operating on an Android project. `lane :firebase do` defines a named sequence of steps called `firebase`.

The `notes` logic at the top attempts to get release notes from three sources in priority order: first from the `RELEASE_NOTES` environment variable (set by GitHub Actions when the workflow is manually triggered with a notes input), then from a <VPIcon icon="fas fa-file-lines"/>`release_notes.txt` file in the project root, and finally a default fallback string. `firebase_app_distribution(...)` is the action provided by the plugin.

`app: ENV["FIREBASE_APP_ID_ANDROID"]` identifies which Firebase app to upload to, read from the environment variable set in the workflow. `apk_path` points to where Flutter outputs the compiled APK. `groups: "testers"` targets a named tester group in Firebase App Distribution. Replace this with your actual group name. For the <VPIcon icon="fas fa-code-branch"/>`prod` lane, `upload_to_play_store(...)` is a built-in Fastlane action. `track: 'production'` uploads to the production track. `skip_upload_metadata: true`, `skip_upload_images: true`, and `skip_upload_screenshots: true` prevent Fastlane from trying to manage your store listing, which is not part of this pipeline's responsibility.

---

## Setting Up Fastlane for iOS

iOS setup is more involved than Android because of code signing. The <VPIcon icon="fas fa-folder-open"/>`ios/` directory needs its own Fastlane configuration.

### The iOS <VPIcon icon="iconfont icon-ruby"/>`Gemfile`

```ruby title="ios/Gemfile"
source "https://rubygems.org"
gem "fastlane"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
```

This is identical in structure to the Android Gemfile. iOS and Android maintain separate Bundler environments because they live in separate directories and may need different gem versions or plugins. Running `bundle install` inside <VPIcon icon="fas fa-folder-open"/>`ios/` installs the gems independently of what is installed inside <VPIcon icon="fas fa-folder-open"/>`android/`.

### The iOS <VPIcon icon="iconfont icon-ruby"/>`Appfile`

```ruby title="ios/fastlane/Appfile"
app_identifier("com.yourcompany.app")
```

`app_identifier(...)` declares the iOS bundle identifier. This must exactly match the bundle identifier set in Xcode (visible under the General tab of your Runner target). Replace `com.yourcompany.app` with your actual bundle ID. Fastlane Match uses this identifier when naming the certificate and provisioning profile files it stores in the certificates repository.

### The <VPIcon icon="iconfont icon-ruby"/>`Matchfile`

```ruby title="ios/fastlane/Matchfile"
git_url(ENV["MATCH_GIT_URL"] || "https://github.com/YOUR_GITHUB_USERNAME/your-certificates-repo")
storage_mode("git")
type("appstore")
```

`git_url(...)` tells Match where the private certificates repository is. In the GitHub Actions workflow, the `MATCH_GIT_URL` environment variable is set to include the Personal Access Token embedded in the URL, so Match can authenticate to the private repository. The `|| "https://github.com/..."` fallback is used when running Match locally, where you would be prompted for credentials interactively instead. `storage_mode("git")` tells Match to use Git as the storage backend, as opposed to S3 or Google Cloud Storage. `type("appstore")` sets the default certificate type, though each lane can override this.

### The iOS <VPIcon icon="iconfont icon-ruby"/>`Pluginfile`

```ruby title="ios/fastlane/Pluginfile"
gem 'fastlane-plugin-firebase_app_distribution'
```

The same Firebase App Distribution plugin is needed on iOS for the `firebase` lane that uploads the ad-hoc IPA to Firebase. The iOS and Android Pluginfiles are separate and both need this declaration.

### The iOS <VPIcon icon="iconfont icon-ruby"/>`Fastfile`

```ruby :collapsed-lines title="ios/fastlane/Fastfile"
default_platform(:ios)

before_all do
  setup_ci
end

platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do
    api_key = app_store_connect_api_key(
      key_id: ENV["APP_STORE_CONNECT_API_KEY_KEY_ID"],
      issuer_id: ENV["APP_STORE_CONNECT_API_KEY_ISSUER_ID"],
      key_filepath: ENV["APP_STORE_CONNECT_API_KEY_KEY_FILEPATH"],
      in_house: false
    )

    match(
      type: "appstore",
      readonly: false,
      app_identifier: "com.YOUR-APP.app",
      api_key: api_key
    )

    update_code_signing_settings(
      path: "Runner.xcodeproj",
      use_automatic_signing: false,
      team_id: "GL369K3W98",
      code_sign_identity: "Apple Distribution",
      profile_name: "match AppStore com.YOUR-APP.app",
      targets: ["Runner"]
    )

    build_app(
      workspace: "Runner.xcworkspace",
      scheme: "Runner",
      export_method: "app-store"
    )

    notes = ENV["RELEASE_NOTES"]
    if notes.nil? || notes.strip.empty?
      file_path = File.join(Dir.pwd, "..", "release_notes.txt")
      if File.exist?(file_path) && !File.read(file_path).strip.empty?
        notes = File.read(file_path)
      else
        notes = "New build uploaded by CI"
      end
    end

    upload_to_testflight(
      skip_waiting_for_build_processing: true,
      changelog: notes
    )
  end

  desc "Deploy to Apple App Store"
  lane :prod do
    api_key = app_store_connect_api_key(
      key_id: ENV["APP_STORE_CONNECT_API_KEY_KEY_ID"],
      issuer_id: ENV["APP_STORE_CONNECT_API_KEY_ISSUER_ID"],
      key_filepath: ENV["APP_STORE_CONNECT_API_KEY_KEY_FILEPATH"],
      in_house: false
    )

    match(
      type: "appstore",
      readonly: false,
      app_identifier: "com.YOUR-APP.app",
      api_key: api_key
    )

    update_code_signing_settings(
      path: "Runner.xcodeproj",
      use_automatic_signing: false,
      team_id: "GL369K3W98",
      code_sign_identity: "Apple Distribution",
      profile_name: "match AppStore com.YOUR-APP.app",
      targets: ["Runner"]
    )

    build_app(
      workspace: "Runner.xcworkspace",
      scheme: "Runner",
      export_method: "app-store"
    )

    upload_to_app_store(
      force: true, # Skip HTML report
      submit_for_review: false, # Uploads to App Store Connect without auto-submitting for review
      automatic_release: false
    )
  end

  desc "Push a new beta build to Firebase App Distribution"
  lane :firebase do
    api_key = app_store_connect_api_key(
      key_id: ENV["APP_STORE_CONNECT_API_KEY_KEY_ID"],
      issuer_id: ENV["APP_STORE_CONNECT_API_KEY_ISSUER_ID"],
      key_filepath: ENV["APP_STORE_CONNECT_API_KEY_KEY_FILEPATH"],
      in_house: false
    )

    match(
      type: "adhoc",
      readonly: false,
      app_identifier: "com.YOUR-APP.app",
      api_key: api_key
    )

    update_code_signing_settings(
      path: "Runner.xcodeproj",
      use_automatic_signing: false,
      team_id: "GL369K3W98",
      code_sign_identity: "Apple Distribution",
      profile_name: "match AdHoc com.YOUR-APP.app",
      targets: ["Runner"]
    )

    build_app(
      workspace: "Runner.xcworkspace",
      scheme: "Runner",
      export_method: "ad-hoc"
    )

    notes = ENV["RELEASE_NOTES"]
    if notes.nil? || notes.strip.empty?
      file_path = File.join(Dir.pwd, "..", "release_notes.txt")
      if File.exist?(file_path) && !File.read(file_path).strip.empty?
        notes = File.read(file_path)
      else
        notes = "New build uploaded by CI"
      end
    end

    firebase_app_distribution(
      app: ENV["FIREBASE_APP_ID_IOS"],
      groups: "testers",
      release_notes: notes,
      service_credentials_file: ENV["FIREBASE_SERVICE_ACCOUNT_JSON_PATH"]
    )
  end
end
```

`before_all do setup_ci end` runs before every lane. `setup_ci` is a built-in Fastlane action that configures the environment for CI use: it sets up a temporary keychain (so certificates can be installed without macOS prompting for a password), disables code signing pop-ups, and configures other CI-specific settings. Without this, certificate installation would hang waiting for a user to click an approval dialog that never comes.

`app_store_connect_api_key(...)` reads the App Store Connect API key and creates an API key object that subsequent actions use for App Store authentication. `key_id`, `issuer_id`, and `key_filepath` all come from environment variables set by the workflow. `in_house: false` indicates this is a standard developer account (not an Apple Enterprise Program account, which has different distribution rules).

`match(type: "appstore", ...)` connects to the certificates repository, downloads the AppStore distribution certificate and provisioning profile, and installs them into the macOS keychain.

`readonly: false` allows Match to create the certificate if it doesn't already exist. The first time this runs for a new project, Match generates the certificate and pushes it to the repository. Subsequent runs simply download the existing certificate. For the `firebase` lane, `type: "adhoc"` is used because Firebase App Distribution requires an ad-hoc distribution certificate, not an App Store one.

`update_code_signing_settings(...)` modifies the Xcode project file to use the specific certificate and profile that Match just downloaded.

`use_automatic_signing: false` is critical: automatic signing would prompt Xcode to manage certificates itself, which fails in a headless CI environment. `team_id: "YOUR_TEAM_ID"` is your Apple Developer Team ID, visible in the Membership section of the Apple Developer Portal. `profile_name: "match AppStore com.yourcompany.app"` matches the naming convention Match uses when it creates profiles.

`build_app(workspace: "Runner.xcworkspace", scheme: "Runner", export_method: "app-store")` invokes `xcodebuild` to archive and export the app. `Runner.xcworkspace` is the Flutter-generated Xcode workspace. Using the workspace rather than the project file is required when CocoaPods dependencies are present. `export_method: "app-store"` tells Xcode which export options to use for the final IPA. For the Firebase lane, this is `"ad-hoc"`.

`upload_to_testflight(skip_waiting_for_build_processing: true)` uploads the IPA to App Store Connect. `skip_waiting_for_build_processing: true` tells Fastlane not to wait for Apple to finish processing the build, which can take 15 to 30 minutes. The upload completes and the workflow finishes. The build appears in TestFlight once Apple completes processing on their side.

`upload_to_app_store(force: true, submit_for_review: false, automatic_release: false)` uploads to App Store Connect for production distribution. `force: true` skips Fastlane's HTML summary report, which is not useful in CI. `submit_for_review: false` uploads the build without automatically submitting it for App Review, giving you a chance to review and submit manually. `automatic_release: false` prevents automatic release after approval.

---

## Writing the GitHub Actions Workflows

Workflows are YAML files placed in <VPIcon icon="fas fa-folder-open"/>`.github/workflows/` at the root of your repository. Each file defines a workflow with a name, the events that trigger it, and the sequence of steps to execute.

### The Android Workflow

```yaml :collapsed-lines title=".github/workflows/android_distribution.yml"
name: Android Firebase App Distribution
on:
  push:
    branches:
      - dev
      - prod
  workflow_dispatch:
    inputs:
      release_notes:
        description: 'Release Notes'
        required: false
        default: 'Manual trigger from GitHub Actions'

jobs:
  distribute_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
          cache: true

      - run: flutter pub get

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
          working-directory: android

      - name: Decode Keystore
        env:
          ANDROID_KEYSTORE_BASE64: ${{ secrets.ANDROID_KEYSTORE_BASE64 }}
        run: |
          echo $ANDROID_KEYSTORE_BASE64 | base64 --decode > android/app/upload-keystore.jks
          echo "storeFile=upload-keystore.jks" > android/key.properties
          echo "storePassword=${{ secrets.ANDROID_STORE_PASSWORD }}" >> android/key.properties
          echo "keyPassword=${{ secrets.ANDROID_KEY_PASSWORD }}" >> android/key.properties
          echo "keyAlias=${{ secrets.ANDROID_KEY_ALIAS }}" >> android/key.properties

      - name: Create .env file
        env:
          ENV_FILE_BASE64: ${{ secrets.ENV_FILE_BASE64 }}
        run: echo $ENV_FILE_BASE64 | base64 --decode > .env

      - name: Build Android Release
        run: |
          if [ "${{ github.ref_name }}" == "prod" ]; then
            flutter build appbundle --release
          else
            flutter build apk --release
          fi

      - name: Create Firebase Service Account JSON
        if: ${{ github.ref_name == 'dev' }}
        env:
          FIREBASE_SERVICE_ACCOUNT_JSON: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_JSON }}
        run: echo $FIREBASE_SERVICE_ACCOUNT_JSON > android/firebase-service-account.json

      - name: Distribute to Firebase App Distribution (Dev)
        if: ${{ github.ref_name == 'dev' }}
        env:
          FIREBASE_APP_ID_ANDROID: ${{ secrets.FIREBASE_APP_ID_ANDROID }}
          FIREBASE_SERVICE_ACCOUNT_JSON_PATH: "firebase-service-account.json"
          RELEASE_NOTES: ${{ github.event.inputs.release_notes }}
        run: bundle exec fastlane firebase
        working-directory: android

      - name: Distribute to Google Play Store (Prod)
        if: ${{ github.ref_name == 'prod' }}
        env:
          GOOGLE_PLAY_JSON: ${{ secrets.GOOGLE_PLAY_JSON }}
        run: |
          echo $GOOGLE_PLAY_JSON > play-store-service-account.json
          bundle exec fastlane prod
        working-directory: android
```

`name: Android Firebase App Distribution` is the display name visible in the GitHub Actions tab of your repository.

`on: push: branches: [dev, prod]` configures the trigger. This workflow runs every time a commit is pushed to either the <VPIcon icon="fas fa-code-branch"/>`dev` or <VPIcon icon="fas fa-code-branch"/>`prod` branch. It doesn't run for any other branch, including `main` and `develop`, which remain untouched staging branches.

`workflow_dispatch: inputs: release_notes` adds a manual trigger. In the GitHub Actions tab, you can click "Run workflow" and optionally type release notes that will be passed to Fastlane. This is useful for testing and for ad-hoc releases.

`runs-on: ubuntu-latest` specifies the virtual machine. Ubuntu is used for Android because the Android build toolchain runs on Linux and Ubuntu runners are less expensive than macOS runners.

`actions/checkout@v4` clones your repository into the runner's working directory. Without this, no other step can access your code.

`actions/setup-java@v3` installs Java 17 using the Zulu distribution. Java 17 is required for Gradle 8 compatibility, which is what current Flutter projects use. Without the correct Java version, Gradle fails immediately.

`subosito/flutter-action@v2` installs the Flutter SDK. `channel: 'stable'` uses the stable release channel, which is correct for production builds. `cache: true` caches the Flutter SDK download between workflow runs, significantly reducing the setup time on subsequent runs.

`ruby/setup-ruby@v1` installs Ruby 3.2 and runs `bundle install` in the <VPIcon icon="fas fa-folder-open"/>`android/` directory automatically when `bundler-cache: true` is set. The `bundler-cache` option also caches the installed gems between runs, which saves two to three minutes per workflow execution.

The **Decode Keystore** step is the core of Android security setup. `echo $ANDROID_KEYSTORE_BASE64 | base64 --decode > android/app/upload-keystore.jks` reverses the Base64 encoding to recreate the binary `.jks` file at the expected path. The subsequent `echo` commands write the `key.properties` file that the Android Gradle build reads to find the keystore and its passwords. This file is created fresh on every run directly from secrets, so it is never stored anywhere permanently.

`if [ "${{ github.ref_name }}" == "prod" ]` is a bash conditional. `github.ref_name` is the name of the branch that triggered the push. If the branch is <VPIcon icon="fas fa-code-branch"/>`prod`, the workflow builds an App Bundle (`.aab`, required for Play Store). Otherwise (for <VPIcon icon="fas fa-code-branch"/>`dev`), it builds an APK (`.apk`, simpler and faster, appropriate for Firebase App Distribution). The same workflow file handles both branches with this one conditional.

`if: ${{ github.ref_name == 'dev' }}` is a step-level conditional. Steps with this condition only run when the triggering branch is <VPIcon icon="fas fa-code-branch"/>`dev`. The Firebase distribution steps are skipped entirely on <VPIcon icon="fas fa-code-branch"/>`prod` pushes, and the Play Store step is skipped entirely on <VPIcon icon="fas fa-code-branch"/>`dev` pushes.

### The iOS Workflow

```yaml :collapsed-lines title=".github/workflows/ios_distribution.yml"
name: iOS TestFlight and Firebase Distribution
on:
  push:
    branches:
      - dev
      - prod
  workflow_dispatch:
    inputs:
      release_notes:
        description: 'Release Notes'
        required: false
        default: 'Manual trigger from GitHub Actions'

jobs:
  distribute_ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
          cache: true

      - run: flutter pub get

      - name: Create .env file
        env:
          ENV_FILE_BASE64: ${{ secrets.ENV_FILE_BASE64 }}
        run: echo $ENV_FILE_BASE64 | base64 --decode > .env

      - name: Build Flutter iOS (No Codesign)
        run: flutter build ios --release --no-codesign

      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
          working-directory: ios

      - name: Configure Fastlane Match
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }}
          MATCH_GIT_BASIC_AUTHORIZATION: ${{ secrets.MATCH_GIT_BASIC_AUTHORIZATION }}
        run: |
          echo "MATCH_PASSWORD=${MATCH_PASSWORD}" >> $GITHUB_ENV
          AUTH=$(echo "$MATCH_GIT_BASIC_AUTHORIZATION" | base64 --decode)
          echo "MATCH_GIT_URL=https://$AUTH@github.com/YOUR_GITHUB_USERNAME/your-certificates-repo" >> $GITHUB_ENV

      - name: Create Auth Key for App Store Connect
        env:
          APPSTORE_API_PRIVATE_KEY_BASE64: ${{ secrets.APPSTORE_API_PRIVATE_KEY_BASE64 }}
          APPSTORE_API_KEY_ID: ${{ secrets.APPSTORE_API_KEY_ID }}
        run: |
          mkdir -p ~/.appstoreconnect/private_keys/
          echo $APPSTORE_API_PRIVATE_KEY_BASE64 | base64 --decode > ~/.appstoreconnect/private_keys/AuthKey_${APPSTORE_API_KEY_ID}.p8

      - name: Create Firebase Service Account JSON
        if: ${{ github.ref_name == 'dev' }}
        env:
          FIREBASE_SERVICE_ACCOUNT_JSON: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_JSON }}
        run: echo $FIREBASE_SERVICE_ACCOUNT_JSON > ios/firebase-service-account.json

      - name: Distribute to Firebase App Distribution (Dev)
        if: ${{ github.ref_name == 'dev' }}
        env:
          FIREBASE_APP_ID_IOS: ${{ secrets.FIREBASE_APP_ID_IOS }}
          FIREBASE_SERVICE_ACCOUNT_JSON_PATH: "firebase-service-account.json"
          RELEASE_NOTES: ${{ github.event.inputs.release_notes }}
          APP_STORE_CONNECT_API_KEY_ISSUER_ID: ${{ secrets.APPSTORE_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_ID: ${{ secrets.APPSTORE_API_KEY_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_FILEPATH: ~/.appstoreconnect/private_keys/AuthKey_${{ secrets.APPSTORE_API_KEY_ID }}.p8
        run: bundle exec fastlane firebase
        working-directory: ios

      - name: Distribute to TestFlight (Dev)
        if: ${{ github.ref_name == 'dev' }}
        env:
          APP_STORE_CONNECT_API_KEY_ISSUER_ID: ${{ secrets.APPSTORE_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_ID: ${{ secrets.APPSTORE_API_KEY_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_FILEPATH: ~/.appstoreconnect/private_keys/AuthKey_${{ secrets.APPSTORE_API_KEY_ID }}.p8
        run: bundle exec fastlane beta
        working-directory: ios

      - name: Distribute to Apple App Store (Prod)
        if: ${{ github.ref_name == 'prod' }}
        env:
          APP_STORE_CONNECT_API_KEY_ISSUER_ID: ${{ secrets.APPSTORE_ISSUER_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_ID: ${{ secrets.APPSTORE_API_KEY_ID }}
          APP_STORE_CONNECT_API_KEY_KEY_FILEPATH: ~/.appstoreconnect/private_keys/AuthKey_${{ secrets.APPSTORE_API_KEY_ID }}.p8
        run: bundle exec fastlane prod
        working-directory: ios
```

`runs-on: macos-latest` is non-negotiable for iOS builds. Xcode only runs on macOS, and `xcodebuild` (which Fastlane uses under the hood) is only available there. macOS runners are approximately ten times more expensive per minute than Ubuntu runners, which is why Android uses Ubuntu. For iOS, there's no alternative.

`flutter build ios --release --no-codesign` compiles the Flutter Dart code and the native iOS framework code into a release build without applying any code signing. The `--no-codesign` flag is critical here: Flutter's build step shouldn't attempt signing because the signing certificate isn't yet installed. Fastlane Match handles the signing in the subsequent Fastlane lane, after it has downloaded and installed the correct certificate.

The **Configure Fastlane Match** step does something important. `AUTH=$(echo "$MATCH_GIT_BASIC_AUTHORIZATION" | base64 --decode)` decodes the Base64 `username:token` string back to plain text. `echo "MATCH_GIT_URL=https://$AUTH@github.com/..." >> $GITHUB_ENV` writes the complete authenticated URL (with the token embedded) to the `$GITHUB_ENV` file, which GitHub Actions reads to propagate environment variables to subsequent steps. The authenticated URL format `https://username:token@github.com/...` is HTTP Basic Authentication, the format that Git uses for credential passing in non-interactive environments.

The **Create Auth Key** step reconstructs the <VPIcon icon="fas fa-key"/>`.p8` file from its Base64 encoding. `mkdir -p ~/.appstoreconnect/private_keys/` creates the directory that Fastlane expects to find the key in. `echo $APPSTORE_API_PRIVATE_KEY_BASE64 | base64 --decode > ~/.appstoreconnect/private_keys/AuthKey_${APPSTORE_API_KEY_ID}.p8` writes the decoded key to the exact filename pattern that `app_store_connect_api_key` looks for.

The iOS workflow runs two parallel distribution steps for the <VPIcon icon="fas fa-code-branch"/>`dev` branch: the `firebase` lane (which builds an ad-hoc IPA and uploads to Firebase App Distribution) and the `beta` lane (which builds an App Store IPA and uploads to TestFlight). Both run sequentially after the shared setup steps. This means a single push to <VPIcon icon="fas fa-code-branch"/>`dev` delivers the build to both distribution channels automatically.

::: details Screenshots:

![Android and iOS Workflow running](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/c96c1e9f-790e-4a00-90dc-543e34611340.png)

![Completed Android Workflow](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/2ce589e4-0d55-43ff-bf1e-b26cf64ea251.png)

![Completed iOS Workflow](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/dab9942e-2914-4d35-9722-10b5518e8585.png)

![Android and iOS Completed Workflow](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/a23f025c-61fd-4c0e-abec-214b9c9ae958.png)

![Firebase App Distribution -Android](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/388e7552-6a05-4d1c-b8bd-d605aae50692.png)

![Firebase App Distribution -iOS](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/2a1c4bcd-f740-4eb4-950f-457baceaada4.png)

![TestFlight iOS Build](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/6363e5d8-b619-4b57-a621-01f3d0cec3ff.png)

:::

---

## How a Full Deployment Runs End to End

When all configuration is in place, here's the complete sequence of events from a push to <VPIcon icon="fas fa-code-branch"/>`dev`:

![A workflow diagram showing the deployment process after a developer pushes code to the dev branch. GitHub Actions automatically starts two workflows in parallel: an Android workflow on an Ubuntu runner and an iOS workflow on a macOS runner. The Android workflow checks out the code, installs Java and Flutter, restores project dependencies, decodes the Android keystore and environment configuration, builds an APK, and uses Fastlane to upload the APK to Firebase App Distribution. The iOS workflow checks out the code, installs Java and Flutter, restores dependencies, decodes environment variables, builds the iOS application without code signing, retrieves signing certificates using Fastlane Match, loads the App Store API key, and produces both an Ad-Hoc build for Firebase App Distribution and an App Store build for TestFlight. The workflow ends with Android testers receiving Firebase App Distribution email notifications and iOS testers receiving TestFlight email invitations automatically.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/68f3c2d6-ac2b-4e41-927e-6212a5b102c2.png)

Both runners execute in parallel, so the total wall clock time is approximately equal to whichever platform takes longer, typically iOS due to Xcode compilation time.

For <VPIcon icon="fas fa-code-branch"/>`prod` pushes, the sequence is identical in structure but the final distribution steps target Google Play Store (Android) and App Store Connect (iOS).

---

## Best Practices

### Keep Your Certificates Repository Private and Access-Controlled

The certificates repository holds your iOS signing materials encrypted with the Match password. Even though the files are encrypted, treat access to this repository as you would treat access to a production database. Revoke personal access tokens that are no longer needed. Don't share the Match password in plain text anywhere.

### Set a Minimum Build Number Strategy

Automated CI builds need a unique build number per upload. App Store Connect and Google Play both reject uploads with duplicate build numbers. Implement a versioning strategy that doesn't require manual intervention. One reliable approach is using the GitHub Actions `GITHUB_RUN_NUMBER`, which is an integer that increments with every workflow run:

```yaml
- name: Set Build Number
  run: |
    BUILD_NUMBER=${{ github.run_number }}
    # For Flutter, update the build number in pubspec.yaml
    sed -i '' "s/version: .*/version: 1.0.0+${BUILD_NUMBER}/" pubspec.yaml
```

`github.run_number` is a GitHub-provided environment variable that starts at 1 for the first workflow run in a repository and increments by 1 for every subsequent run. This guarantees a unique, monotonically increasing build number across all runs. The `sed` command replaces the version line in `pubspec.yaml` with the run number appended as the build number.

### Add Branch Protection Rules

With automation in place, protect your branches from accidental direct pushes. In your repository Settings, go to **Branches** and add protection rules for `main`, `develop`, <VPIcon icon="fas fa-code-branch"/>`dev`, and <VPIcon icon="fas fa-code-branch"/>`prod`.

For <VPIcon icon="fas fa-code-branch"/>`prod` specifically, consider requiring at least one pull request approval before merging, which creates a human gate before the production deployment trigger fires.

### Monitor Your Workflow Run Times and Costs

GitHub Actions charges based on runner minutes. macOS minutes cost ten times more than Linux minutes. Go to your GitHub organization's **Settings**, then **Billing** to see your current usage.

Caching (the `cache: true` on Flutter and `bundler-cache: true` on Ruby) is the most impactful optimization. After the first run, subsequent runs that hit the cache skip the download and extraction steps entirely.

### Store Release Notes in a File, Not Just as Input

The <VPIcon icon="fas fa-file-lines"/>`release_notes.txt` fallback in the Fastfile means you can commit release notes as part of your pull request, and they automatically appear in the Firebase and TestFlight distribution notifications. Create this file at the project root and update it with each release branch. This keeps release notes in version history alongside the code they describe.

---

## Common Mistakes

### Using the Xcode Project Instead of the Workspace in Fastlane

Flutter iOS projects always use a workspace (`Runner.xcworkspace`) rather than a project file (`Runner.xcodeproj`) because CocoaPods dependencies are wired in at the workspace level. Passing `Runner.xcodeproj` to `build_app` will fail with missing dependency errors. Always use `workspace: "Runner.xcworkspace"`.

### Not Setting `setup_ci` for iOS

Omitting `setup_ci` from the `before_all` block causes the workflow to hang indefinitely while macOS waits for keychain access approval that never comes. This looks like a timeout and the error message points elsewhere. Always include `before_all do setup_ci end` in any iOS Fastfile used in CI.

### Running Match in Readonly Mode for a New Project

The first time Match runs on a new app identifier, it needs to create the certificate and provisioning profile. If `readonly: true` is set, Match can't create them and fails with a "No certificates found" error. Use `readonly: false`. In production, some teams switch to `readonly: true` after the initial setup to prevent inadvertent certificate regeneration, but `false` is correct for this setup.

### Forgetting to Increment the Build Number

Both Apple and Google reject builds with the same version number as a previously uploaded build. If you push twice to <VPIcon icon="fas fa-code-branch"/>`dev` without incrementing the build number, the second upload fails. The `GITHUB_RUN_NUMBER` strategy described in Best Practices prevents this automatically.

### Encoding Files With a Trailing Newline

Using `echo "content" | base64` instead of `echo -n "content" | base64` adds a trailing newline to the string before encoding. When decoded on the CI runner, the file contains a trailing newline that wasn't in the original. For the `username:token` string in `MATCH_GIT_BASIC_AUTHORIZATION`, a trailing newline corrupts the credential and causes authentication failures that look like permission errors. Always use `echo -n` when encoding strings that aren't files.

### Using the Wrong Distribution Type for Firebase

Firebase App Distribution for iOS requires an **ad-hoc** distribution certificate, not an App Store one. Uploading an App Store-signed IPA to Firebase fails because ad-hoc builds are specifically designed for direct device distribution outside the App Store. The `firebase` lane in the iOS Fastfile explicitly uses `type: "adhoc"` and `export_method: "ad-hoc"` for this reason. The `beta` lane uses `type: "appstore"` because TestFlight requires an App Store certificate.

### Granting Insufficient Permissions to the Google Play Service Account

The most common Play Store upload failure is a permissions error from the API. The service account must be linked to your Play Console app with at least Release manager permissions. Creating the service account in Google Cloud is only half the setup: you must also grant it access inside Play Console under API access. Missing the Play Console step results in `403 Forbidden` errors from the Fastlane upload action.

---

## Conclusion

What you've built here is infrastructure that pays compounding returns. The first time you push to <VPIcon icon="fas fa-code-branch"/>`dev` and watch the GitHub Actions tab show both an Android and iOS build completing without your involvement, the value of the setup is immediate and visceral. The fourth time, the tenth time, the fiftieth time: the value compounds silently because you're never aware of the deployment happening. It just happens.

The architecture in this guide covers the common paths, but the underlying tools (GitHub Actions, Fastlane, Match) are flexible enough to accommodate nearly any workflow. Teams add steps for automated testing before the build, Slack notifications when a build completes or fails, version number management driven by Git tags, and multiple target environments beyond just <VPIcon icon="fas fa-code-branch"/>`dev` and <VPIcon icon="fas fa-code-branch"/>`prod`. The foundation you have here supports all of those extensions.

The one practice worth emphasizing above all others is this: treat your CI configuration files with the same care as your production code. Review changes to workflow files in pull requests. Add comments to non-obvious steps. Keep secrets out of the workflow files and in the Secrets vault where they belong. The pipeline fails for the same reasons production code fails: unreviewed changes, missing context, and undocumented assumptions.

With this pipeline in place, your team can ship faster and with more confidence, because the process of getting code into testers' hands is no longer a manual, error-prone ritual. It's a side effect of committing code, which is exactly what it should be.

::: info References

**GitHub Actions**

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

> Complete reference for workflow syntax, contexts, secret management, and runner specifications.

<SiteInfo
  name="actions/checkout"
  desc="Action for checking out a repo."
  url="https://github.com/actions/checkout/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/af09c84014573f4628fde30d92ffc546ff883f162bbac739bb10b57fbe17b3b0/actions/checkout"/>

> Official action for checking out your repository in a workflow.

<SiteInfo
  name="subosito/flutter-action"
  desc="Flutter environment for use in GitHub Actions. It works on Linux, Windows, and macOS."
  url="https://github.com/subosito/flutter-action/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9e9ae5e49cee01ec1db20be4dedce88d3001016396a30cc060fe8fd885c16eff/subosito/flutter-action"/>

> Community-maintained action for installing the Flutter SDK in GitHub Actions runners.

<SiteInfo
  name="ruby/setup-ruby"
  desc="An action to download a prebuilt Ruby and add it to the PATH in 5 seconds"
  url="https://github.com/ruby/setup-ruby/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c30c4a7ec69d5de429c423ad49c48873da8b6c022e03efea6e355c28ffd2c6f6/ruby/setup-ruby"/>

> Official Ruby action that installs a specified Ruby version and optionally runs Bundler.

<SiteInfo
  name="GitHub Actions billing - GitHub Docs"
  desc="Learn how usage of GitHub Actions is measured against your free allowance and how to pay for additional use."
  url="https://docs-internal.github.com/en/billing/concepts/product-billing/github-actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/billing.png"/>

> Reference for runner minutes, billing, and cost multipliers for macOS and Windows runners.

**Fastlane**

```component VPCard
{
  "title": "fastlane docs",
  "desc": "Documentation for fastlane tools, the easiest way to automate building and releasing your iOS and Android apps",
  "link": "https://docs.fastlane.tools/",
  "logo": "https://docs.fastlane.tools/img/favicon.ico",
  "background": "rgba(51,51,51,0.2)"
}
```

> Complete reference for all Fastlane actions including `upload_to_testflight`, `upload_to_play_store`, `match`, and `build_app`.

```component VPCard
{
  "title": "match - fastlane docs",
  "desc": "Alias for the sync_code_signing action",
  "link": "https://docs.fastlane.tools/actions/match/",
  "logo": "https://docs.fastlane.tools/img/favicon.ico",
  "background": "rgba(51,51,51,0.2)"
}
```

> Detailed documentation for the code signing management system, including initial setup and certificate rotation.

```component VPCard
{
  "title": "Distribute Android apps to testers using fastlane  |  Firebase App Distribution",
  "desc": "A guide to distributing your Android app to testers by using fastlane to automate the process of building and releasing your app.",
  "link": "https://firebase.google.com/docs/app-distribution/android/distribute-fastlane/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v25f01968170374b7bd062a383d0367da1beee7ed413abaee67eec4296f4ba687/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

> Documentation for the plugin that adds the `firebase_app_distribution` action to Fastlane lanes.

**Apple**

<SiteInfo
  name="App Store Connect API | Apple Developer Documentation"
  desc="The data structure that represents an app store connect api resource."
  url="https://developer.apple.com/documentation/appstoreconnectapi/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

> Reference for App Store Connect API keys, required roles, and the <VPIcon icon="fas fa-key"/>`.p8` file format.

```component VPCard
{
  "title": "Code Signing Resources | Apple Developer Forums",
  "desc": "",
  "link": "https://developer.apple.com/forums/thread/707080/",
  "logo": "https://developer.apple.com/forums/build-06042026/public/assets/favicon.ico",
  "background": "rgba(29,29,31,0.2)"
}
```

> Apple's official explanation of certificates and provisioning profiles.

<SiteInfo
  name="TestFlight - Apple Developer"
  desc="TestFlight beta testing lets you invite users to beta test versions of your apps before you release them on the App Store."
  url="https://developer.apple.com/testflight/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/news/images/og/testflight-og.png"/>

> Reference for tester limits, build expiration, and processing time between upload and availability.

**Google**

<SiteInfo
  name="Google Play Developer API  | Google for Developers"
  desc="Discover the Subscriptions and In-App Purchases API and Publishing API, get started guide, and related APIs."
  url="https://developers.google.com/android-publisher/"
  logo="https://gstatic.com/devrel-devsite/prod/v25f01968170374b7bd062a383d0367da1beee7ed413abaee67eec4296f4ba687/developers/images/favicon-new.png"
  preview="https://gstatic.com/devrel-devsite/prod/v25f01968170374b7bd062a383d0367da1beee7ed413abaee67eec4296f4ba687/developers/images/opengraph/google-blue.png"/>

> Documentation for the API Fastlane uses to upload to the Play Store, including track names and required permissions.

```component VPCard
{
  "title": "Firebase App Distribution",
  "desc": "Firebase App Distribution makes distributing your apps to trusted testers painless. By getting your apps onto testers' devices quickly, you can get feedback early and often. And if you use Crashlytics in your apps, you’ll automatically get stability metrics for all your builds, so you know when you’re ready to ship.",
  "link": "https://firebase.google.com/docs/app-distribution/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v25f01968170374b7bd062a383d0367da1beee7ed413abaee67eec4296f4ba687/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

> Complete reference for tester group management, release notes, and CI/CD integration.

<SiteInfo
  name="Service accounts overview  |  Identity and Access Management (IAM)  |  Google Cloud Documentation"
  desc="Conceptual and lifecycle information about IAM service accounts."
  url="https://docs.cloud.google.com/iam/docs/service-account-overview/"
  logo="https://gstatic.com/devrel-devsite/prod/v25f01968170374b7bd062a383d0367da1beee7ed413abaee67eec4296f4ba687/clouddocs/images/favicons/onecloud/favicon.ico"
  preview="https://docs.cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png"/>

> Documentation for creating and managing service accounts and IAM role assignment.

**Flutter**

<SiteInfo
  name="Build and release an Android app"
  desc="How to prepare for and release an Android app to the Play store."
  url="https://docs.flutter.dev/deployment/android"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

> Reference for `flutter build apk`, `flutter build appbundle`, and `flutter build ios` commands and their flags.

<SiteInfo
  name="Build and release an Android app"
  desc="How to prepare for and release an Android app to the Play store."
  url="https://docs.flutter.dev/deployment/android/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

> Flutter's official guide for creating keystores and configuring Gradle for release builds.

<SiteInfo
  name="Build and release an iOS app"
  desc="How to release a Flutter app to the App Store."
  url="https://docs.flutter.dev/deployment/ios/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

> Flutter's guide to deploying to App Store and TestFlight.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate Flutter Releases with Fastlane and GitHub Actions for Firebase App Distribution, Google Play, TestFlight, and App Store Connect",
  "desc": "Picture this: it's 4pm on a Friday, and your team has just merged the last feature for the sprint. But your product manager asks for a new build on TestFlight by the end of the day so the client can r",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-flutter-releases-with-fastlane-and-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
