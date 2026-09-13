---
lang: en-US
title: "What's New in macOS 27 for Developers?"
description: "Article(s) > What's New in macOS 27 for Developers?"
icon: iconfont icon-macos
category:
  - DevOps
  - Apple
  - macOS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - apple
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What's New in macOS 27 for Developers?"
    - property: og:description
      content: "What's New in macOS 27 for Developers?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/whats-new-in-macos-27-for-developers.html
prev: /devops/macos/articles/README.md
date: 2026-09-16
isOriginal: false
author:
  - name: Daniel Kehoe
    url: https://freecodecamp.org/news/author/DanielKehoe/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0448ce08-813c-4739-99d7-88fad680006a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What's New in macOS 27 for Developers?"
  desc="macOS 27 Golden Gate is here. Apple released it September 14, 2026, as a free upgrade for every Mac that can run it. I'll show you what actually changes for developers in macOS 27, how to upgrade with"
  url="https://freecodecamp.org/news/whats-new-in-macos-27-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0448ce08-813c-4739-99d7-88fad680006a.png"/>

macOS 27 Golden Gate is here. Apple released it September 14, 2026, as a free upgrade for every Mac that can run it.

I'll show you what actually changes for developers in macOS 27, how to upgrade without waiting hours for the download, and how to check that tools for software development are installed.

Should you upgrade? Here's my recommendation: **upgrade** if your Mac uses an Apple Silicon chip, **download the package installer** instead of using Software Update, then take this opportunity to do any housekeeping to tidy your Mac.

The upgrade itself isn't a reason to hesitate, if you're prepared. The download can be the biggest delay. I'll show you the method that was faster in my testing.

---

## Are You Ready for macOS 27?

If you've got an older Intel-based Mac, you won't be able to upgrade.

**Your Mac needs Apple Silicon.** macOS 27 is the first release to drop every Intel Mac, so a Mac with an Intel processor can't upgrade at all. If you're running macOS Tahoe 26 on an Intel-based Mac, you must stay on Tahoe, which Apple is expected to patch for security into 2028. To check if your Mac is compatible, see <VPIcon icon="fas fa-globe"/>[macOS 27 compatibility](https://mac.install.guide/macos/compatibility).

**The release is stable.** Reviewers who installed the betas this summer said macOS 27 is unusually stable. Several compare it to Mac OS X Snow Leopard, the 2009 release that focused on refinement. Apple built this version around performance rather than a redesign.

Still, for a Mac you depend on for work, wait for the first 27.1 point release to reduce risk.

---

## Time Needed to Upgrade

Two things need time: the software download and the actual on-machine installation.

Your local internet connection speed may not be the bottleneck to a fast download. Apple offers a convenient Software Update in System Settings, which most people use. But it's the slowest way to get the update.

On a 300 Mbps connection, Software Update showed me a four-hour forecast and took even longer. Downloading Apple's package installer in a browser took about 50 minutes, perhaps because a web browser is optimized for downloading large files using multiple connections. On-machine installation takes about an hour, once you've completed the download, with several automatic restarts.

If you use the convenient Software Update in System Settings, let it run overnight while you sleep. Otherwise, download the package installer and then run the installation process while you go to lunch or run errands.

---

## Notable Changes in macOS 27

What do you get with the new macOS 27?

- **Liquid Glass is adjustable.** macOS Tahoe 26 introduced the Liquid Glass interface redesign, which triggered numerous hate posts last year. By now, most people have gotten used to it. To help, Apple has added a slider to adjust transparency from ultra-clear to fully tinted, which addresses the readability complaints about macOS Tahoe.
- **The Passwords app can fix weak passwords.** The Passwords app finds compromised passwords and updates them on supported sites for you. It's one less reason to use a third-party password manager.
- **Safari groups tabs by topic.** Also, in the Safari browser, a Notify Me feature watches a page and tells you when it changes, for ordering tickets or similar tasks.
- **Access to other apps' data is more restricted.** Apps that try to read another developer's app data containers are now denied access by default, instead of prompting for permission. You can manage access in `System Settings` > `Privacy & Security`. In the ongoing trade of convenience for greater security, Apple has tightened permissions.

Finally, in the wait for the blossoming of Apple Intelligence, macOS 27 delivers Siri AI as a beta, in English only (and not for every country). For a more detailed feature list, see my Mac Install Guide article [<VPIcon icon="fas fa-globe"/>macOS 27 Golden Gate](https://mac.install.guide/macos/macos27).

---

## The New fm Command

macOS 27 adds a built-in command-line interface to Apple's on-device language model. A command called `fm` (for "Foundation Models") runs Apple's on-device language model from any terminal application, with no account, no API key, and no per-token cost.

Apple will also offer a Private Cloud Compute (PCC) option for [<VPIcon icon="fa-brands fa-apple"/>Apple Intelligence](https://support.apple.com/en-us/121115), which has usage limits and is designed for harder tasks, but I haven't seen it yet.

I've written more about the `fm` command in my article [<VPIcon icon="fas fa-globe"/>fm Command for Apple AI](https://mac.install.guide/terminal/fm-command).

Before you can use it, you'll have to accept Apple's terms with `sudo fm license`, which needs an administrator password. macOS downloads the on-device model separately after the macOS update. You can check whether the model is ready:

```sh
fm available
#
# System model available
```

If you see `modelNotReady`, leave the Mac on power and Wi-Fi and check again later.

The `fm` command is a tool that accesses the on-device language model, which isn't a frontier model like Anthropic's Claude, OpenAI's ChatGPT, or Google's Gemini. [<VPIcon icon="fa-brands fa-apple"/>Apple's own documentation](https://developer.apple.com/documentation/foundationmodels/generating-content-and-performing-tasks-with-foundation-models) says to avoid writing code, doing math, and logical reasoning with this model.

I asked it five questions a stuck beginner might actually type, and none of its answers was fully correct. When I asked how to use a nonexistent `brew update-all` command, it invented instructions instead of correcting my question.

You can play around to see if it could be useful for scripting or applications, as the best use of the `fm` command is to trial the Foundation Models framework when building applications.

---

## Before You Start

Again, Apple Silicon is a requirement. After that, there are a few things to consider:

The first is **disk space.** Apple's installer is large, so allow about 60 GB free.

The next is **power.** Connect your Mac before you begin. A software upgrade needs at least 20 percent battery to start.

Finally, consider a **backup.** If your work lives in GitHub or other cloud services, and the Mac holds nothing irreplaceable, you don't need to worry about backups. Otherwise, make a Time Machine backup to an external drive, or use a cloud backup service like Backblaze or IDrive.

---

## How to Upgrade to macOS 27

Two choices deliver exactly the same macOS, but the download and installation steps differ.

Downloading Apple's full installer package in a browser can be substantially faster than using Software Update. If Software Update seems slow, don't assume you've got slow internet. [<VPIcon icon="fas fa-globe"/>Open a terminal application](https://mac.install.guide/terminal/open) and measure it:

```sh
networkQuality -v
#
# ...
# ==== SUMMARY ====
# Uplink capacity: 313.557 Mbps
# Downlink capacity: 131.295 Mbps
```

The test takes about fifteen seconds. `Downlink capacity` is the number that matters. If it's healthy (above 100 Mbps) and Software Update is crawling on a fast connection, try downloading the package directly.

### Download the Full Installer Instead

Apple publishes a package installer, `InstallAssistant.pkg`, on its own download server. A web browser downloads it at full speed and resumes on its own if it stops.

Apple doesn't link that file from its support pages, so get the link from [<VPIcon icon="fas fa-globe"/>Download macOS](https://mac.install.guide/macos/download), which I've updated for the current release. Check your browser's downloads list and confirm the address starts with `swcdn.apple.com`, which is Apple's own domain.

You can also let Apple's own command fetch it with a terminal command, but it's not as fast as the browser download:

```sh
softwareupdate --fetch-full-installer --full-installer-version 27.0
```

The command places the installer app in your Applications folder. Launch the app to begin the upgrade, skipping the package verification step below.

### Verify the Package Came From Apple

If you've downloaded the package installer, confirm the file is Apple's genuine installer before you run it:

```sh
pkgutil --check-signature ~/Downloads/InstallAssistant.pkg
#
# Status: signed Apple Software
```

Look for a certificate chain that ends with `Apple Root CA`. If you see anything else, delete the file. The check runs locally, so it protects you wherever the link came from.

### Run the Installer

After the download, double-click `InstallAssistant.pkg` and follow the onscreen instructions. This installs an application named `Install macOS Golden Gate` in your Applications folder. It doesn't yet upgrade macOS.

Open that application and follow the steps:

1. Click "Continue" and agree to the license.
2. Select your startup disk.
3. Enter your password to begin.
4. Wait about an hour. Your Mac restarts several times, which is normal.

### Or Use Software Update

If you'd rather not download anything yourself, the standard path works fine and needs no link:

1. Open `System Settings` and click `General`, then `Software Update`.
2. Click "Upgrade Now" when macOS 27 appears.
3. Enter your password and wait for the download.

The macOS 27 version is identical. The only difference is time.

---

## Check Your Developer Tools After the Upgrade

First confirm you're on macOS 27:

```sh
sw_vers
#
# ProductName:		macOS
# ProductVersion:		27.0
# BuildVersion:		26A428
```

I've built a free downloadable application named "Set Up Your Mac for the Command Line" that you can use to get your Mac ready for software development. It checks what you have and installs Xcode Command Line Tools and Homebrew if they're missing. It fixes the shell configuration problem that causes a `command not found` error and verifies your Mac is set up to use the command line to develop software.

[<VPIcon icon="fas fa-globe"/>Here are all the details about the app](https://mac.install.guide/set-up-your-mac/command-line) before you download. Click [<VPIcon icon="fas fa-globe"/>Set Up Your Mac for the Command Line](https://downloads.install.guide/suym-cli/Set-Up-Your-Mac-for-the-Command-Line.dmg?utm_source=freecodecamp-macos-27-developers&utm_medium=article&utm_campaign=suym-cli_setup&utm_term=freecodecamp) to download it from my Mac Install Guide website.

You can perform your own check, of course, for the tools that are basic to software development:

```sh
xcode-select -p
#
# /Library/Developer/CommandLineTools
brew --version
#
# Homebrew 6.0.15
git --version
#
# git version 2.50.1 (Apple Git-155)
```

You're checking that each command responds. Your version numbers may differ. If you have the full Xcode application installed for developing macOS and iOS applications, `xcode-select -p` will point inside `Xcode.app`.

If `xcode-select -p` reports no developer tools, you may need to [<VPIcon icon="fas fa-globe"/>reinstall Xcode Command Line Tools with `xcode-select --install`](https://mac.install.guide/commandlinetools/4).

If `brew --version` reports `command not found`, Homebrew may be installed but your shell isn't finding it. See [<VPIcon icon="fas fa-globe"/>command not found: brew](https://mac.install.guide/homebrew/zsh-command-not-found-brew) for how to add it to your PATH.

Git version control will be ready if Xcode Command Line Tools is installed.

---

## What's Next

You now have macOS 27 running on your Mac. You've verified that Xcode Command Line Tools, Homebrew, and Git version control all came through the upgrade.

If you want to [<VPIcon icon="fas fa-globe"/>reinstall macOS](https://mac.install.guide/macos/reinstall) on an empty disk for a clean install, or build a [<VPIcon icon="fas fa-globe"/>macOS bootable USB drive](https://mac.install.guide/macos/bootable-usb) for portable installs, the article [<VPIcon icon="fas fa-globe"/>Upgrade macOS](https://mac.install.guide/macos/upgrade) goes into more detail.

With macOS 27 installed and your tools verified, you're up to date and ready for any other Mac tutorial you'll find on freeCodeCamp.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What's New in macOS 27 for Developers?",
  "desc": "macOS 27 Golden Gate is here. Apple released it September 14, 2026, as a free upgrade for every Mac that can run it. I'll show you what actually changes for developers in macOS 27, how to upgrade with",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/whats-new-in-macos-27-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
