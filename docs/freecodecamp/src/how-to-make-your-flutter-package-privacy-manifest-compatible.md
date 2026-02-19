---
lang: en-US
title: "How to Make Your Flutter Package Privacy Manifest Compatible"
description: "Article(s) > How to Make Your Flutter Package Privacy Manifest Compatible"
icon: iconfont icon-flutter
category: 
  - Dart
  - Flutter
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Make Your Flutter Package Privacy Manifest Compatible"
    - property: og:description
      content: "How to Make Your Flutter Package Privacy Manifest Compatible"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-your-flutter-package-privacy-manifest-compatible.html
prev: /programming/dart/articles/README.md
date: 2024-05-20
isOriginal: false
author:
  - name: Tomer
    url: https://freecodecamp.org/news/author/tomerpacific/
cover: https://freecodecamp.org/news/content/images/2024/05/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Make Your Flutter Package Privacy Manifest Compatible"
  desc="Beginning May 1st, Apple will enforce all new applications or updated versions of applications that will be uploaded to the Apple Store, to include a Privacy Manifest file.  If you are unfamiliar with what a Privacy Manifest is, I suggest reading my ..."
  url="https://freecodecamp.org/news/how-to-make-your-flutter-package-privacy-manifest-compatible"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/tierra-mallorca-rgJ1J8SDEAY-unsplash.jpg"/>

Beginning May 1st, Apple will enforce all new applications or updated versions of applications that will be uploaded to the Apple Store, to include a Privacy Manifest file.

If you are unfamiliar with what a Privacy Manifest is, I suggest reading my [**other article**](/freecodecamp.org/what-the-ios-privacy-manifest-means-for-developers.md).

There has been a lot of confusion regarding what developers need to do if they are using Flutter.

This is because Flutter has been marked by Apple as a [<VPIcon icon="fa-brands fa-apple"/>“commonly used SDK”](https://developer.apple.com/news/?id=r1henawx#:~:text=Third%2Dparty%20SDK%20privacy%20manifest%20and%20signatures.&text=Starting%20in%20spring%202024%2C%20if,used%20as%20a%20binary%20dependency.) (including several other Flutter packages). This has been somewhat addressed by the Flutter community. If you are interested, you can read the following GitHub issues:

- [Support Privacy Manifest and Required APIs in iOS and macOS (<VPIcon icon="iconfont icon-github"/>`flutter/flutter`)](https://github.com/flutter/flutter/issues/143232)
- [Determine how to handle privacy manifests in packages (<VPIcon icon="iconfont icon-github"/>`flutter/flutter`)](https://github.com/flutter/flutter/issues/131940)

As of May 2024, things are still a bit vague. It would be preferable to have a solution that reassures us of being able to update our package and not cause applications that use it to be rejected.

We want to continue being good citizens in the Mobile ecosystem.

---

## How to Upgrade Dependencies

Regardless of what logic you have inside your package, in order to support Apple’s changes, you have to enforce your package to use [Flutter version 3.19 (<VPIcon icon="fa-brands fa-medium" />`flutter`)](https://medium.com/flutter/whats-new-in-flutter-3-19-58b1aae242d2) at the very least.

You can do this by going to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file and changing the version there:

```yaml title="pubspec.yaml"
environment:
  sdk: ">=3.0.0 <4.0.0"
  flutter: "^2.0.0"   /// <--- Change this to 3.19
```

Then, you need to go over any dependencies you may have in your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file and find out if you have packages that are listed under the “commonly used sdks”.

If so, you will need to find out if that package has released a new version with a privacy manifest file. For example, if our package’s <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` looks like this:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  intl: ^0.17.0
  shared_preferences: ^2.0.5
  url_launcher: ^6.0.17
  package_info_plus: ^3.1.2
```

our package depends on `url_launcher`, which as it happens, is also listed under the “commonly used sdks”.

When we go over to `url_launcher`’s page on [pub.dev (<VPIcon icon="fa-brands fa-dart-lang"/>`url_launcher`)](https://pub.dev/packages/url_launcher), we will be able to see that they released a new version, 6.2.6, that includes a privacy manifest.

![Screenshot of `url_launcher` package and its version that supports privacy manifest](https://freecodecamp.org/news/content/images/2024/05/1.jpg)

So we will upgrade to that version.

Once we have gone over all our our dependencies, we can go ahead and deal with the code in our own package.

---

## How to Add the Privacy Manifest File

The privacy manifest file needs to reside inside of the <VPIcon icon="fas fa-folder-open"/>`Resources` folder in your project structure (under <VPIcon icon="fas fa-folder-open"/>`darwin`).

![Directory structure of iOS folder inside a Flutter package](https://freecodecamp.org/news/content/images/2024/05/1-1.jpg)

Make sure to follow Apple’s guidelines on what data to include there. This will depend on your package’s use case. If you are unsure, you can either refer to [<VPIcon icon="fa-brands fa-apple"/>Apple’s documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files), or check out my article that I linked to at the beginning.

Then, inside of your package’s `podspec` file, you need to add the privacy manifest as a resource there:

```rb title="podspec"
s.resource_bundles = {'package_name_privacy' => ['Resources/PrivacyInfo.xcprivacy']}
```

---

## Almost Done

As stated, things are not yet clear on whether the solutions proposed will stand the test of time.

One issue that is currently being investigated is the fact that Flutter packages are under the hood, static frameworks. This can cause issues for application developers.

When using your package, the privacy manifest file can be obscured by top level resources of the application itself. Meaning, the application’s own privacy manifest file might overshadow your package’s privacy manifest file. This in turn, will cause the application to get rejected from the Apple store since it will not perceive that your package does indeed have a privacy manifest file.

According to [this GitHub issue comment (<VPIcon icon="iconfont icon-github"/>`flutter/flutter`)](https://github.com/flutter/flutter/issues/145269#issuecomment-2070221423), this is a known issue to Apple and they are working on fixing this.

In [<VPIcon icon="fa-brands fa-apple"/>Apple’s April 26th announcement](https://developer.apple.com/news/?id=pvszzano), they state that:

> Apps won’t be accepted if they fail to meet the manifest and signature requirements.

Apps also won’t be accepted if all of the following apply:

- They’re missing a reason for a listed API.
- The code is part of a dynamic framework embedded via the Embed Frameworks build phase.
- The framework is a newly added third-party SDK that’s on the list of commonly used third-party SDKs.

It seems that things have been limited to dynamic frameworks for the time being, as Apple adds:

> _In the future, these required reason requirements will expand to include the entire app binary._

---

## Conclusion

Hopefully by now you have the knowledge and the tools to make sure your Flutter package is compatible with Apple's Privacy Manifest changes.

But be sure to keep your eyes and ears peeled for any announcement Apple makes because more changes to your Flutter package could be needed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Make Your Flutter Package Privacy Manifest Compatible",
  "desc": "Beginning May 1st, Apple will enforce all new applications or updated versions of applications that will be uploaded to the Apple Store, to include a Privacy Manifest file.  If you are unfamiliar with what a Privacy Manifest is, I suggest reading my ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-make-your-flutter-package-privacy-manifest-compatible.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
