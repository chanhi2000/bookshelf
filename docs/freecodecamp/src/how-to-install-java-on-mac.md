---
lang: en-US
title: "How to Install Java on Mac in 2026"
description: "Article(s) > How to Install Java on Mac in 2026"
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
      content: "Article(s) > How to Install Java on Mac in 2026"
    - property: og:description
      content: "How to Install Java on Mac in 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-java-on-mac.html
prev: /devops/macos/articles/README.md
date: 2026-02-21
isOriginal: false
author:
  - name: Daniel Kehoe
    url: https://freecodecamp.org/news/author/DanielKehoe/
cover: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ab23255a-f10d-485b-9fd2-ee247138ed9e.png
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
  name="How to Install Java on Mac in 2026"
  desc="Java is the most widely used programming language for enterprise software, Android development, and university computer science courses. Apple doesn't include Java with macOS, so you need to install i"
  url="https://freecodecamp.org/news/how-to-install-java-on-mac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ab23255a-f10d-485b-9fd2-ee247138ed9e.png"/>

Java is the most widely used programming language for enterprise software, Android development, and university computer science courses. Apple doesn't include Java with macOS, so you need to install it yourself.

If you search for "install Java on Mac," you'll find a confusing number of vendors, version numbers, and installation methods. To make it easy, I'll cut through the confusion and show you a recommended Java installation path that takes about five minutes.

Here's my recommendation: Install **Java 25** using **Homebrew** with the **Eclipse Temurin** distribution. Java 25 is the current LTS (Long-Term Support) release and your best choice unless your work team or university course uses an older version. With Homebrew, one terminal command accommodates the entire installation. The Temurin distribution is free, certified, and unencumbered by Oracle's licensing restrictions.

Now I’ll walk you through the process.

---

## What You Need Before You Begin

With this recommended path, you only need two things before you install Java: a terminal application and the Homebrew package manager.

### Terminal

Terminal is the built-in [<VPIcon icon="fas fa-globe"/>Mac terminal application](https://mac.install.guide/terminal/). If you don’t know, you can learn [<VPIcon icon="fas fa-globe"/>how to open Terminal here](https://mac.install.guide/terminal/open). You'll use it to run the installation commands.

### Homebrew

Homebrew is a package manager you can use to install software programs for the command line. Check if you already have it like this:

```sh
brew --version
#
# Homebrew 5.0.11
```

If you see a version number, you're ready. If you see [<VPIcon icon="fas fa-globe"/>zsh: command not found: brew](https://mac.install.guide/homebrew/zsh-command-not-found-brew) you need to install Homebrew first. Follow the instructions at [<VPIcon icon="fas fa-globe"/>Install Homebrew](https://mac.install.guide/homebrew/3).

---

## How to Check if Java Is Already Installed

Run this command to check for an existing Java installation:

```sh
java -version
```

You'll see one of two results.

**If Java is installed,** you'll see output like this:

```sh
openjdk version "25.0.1" 2025-10-21 LTS
#
# OpenJDK Runtime Environment Temurin-25.0.1+8 (build 25.0.1+8-LTS)
# OpenJDK 64-Bit Server VM Temurin-25.0.1+8 (build 25.0.1+8-LTS, mixed mode)
```

If the version number shows 25, you already have the latest Java and you can stop here.

**If Java is not installed,** you'll see a message, "The operation couldn't be completed. Unable to locate a Java Runtime." You'll need to install Java as described below.

If you previously installed Java but see this dialog, something is wrong with your installation. See [<VPIcon icon="fas fa-globe"/>Unable to Locate a Java Runtime](https://mac.install.guide/java/unable-to-locate) for troubleshooting. For detailed guidance on Java version output, see [<VPIcon icon="fas fa-globe"/>Check Java Version on Mac](https://mac.install.guide/java/version).

---

## Why Eclipse Temurin and Why Not Oracle

If you search for Java downloads, you'll encounter several potentially confusing terms. Here's what they mean.

**JDK** stands for Java Development Kit. It contains the compiler, runtime, and developer tools you need to build and run Java applications. Vendors used to offer a JRE (Java Runtime Environment) for non-developers, but now the JDK does everything.

**OpenJDK** is the official open-source implementation of Java. All major Java vendors build from this same source code, so the core functionality is identical across vendors.

**Eclipse Temurin** is the distribution many developers recommend. It comes from the Adoptium project and is backed by IBM, Microsoft, Red Hat, and Google, among others. It's completely free for any use, including commercial production. Temurin is TCK-certified, meaning it passes Oracle's official compatibility tests (over 139,000 of them). You can trust that your Java code will run correctly.

**Why not Oracle JDK?** Oracle changed its licensing in January 2023. The new model charges per employee across the entire organization, not per Java user. A 500-person company would pay $90,000 per year. Oracle actively audits for compliance.

Temurin is functionally identical to Oracle JDK and is free to use under its open‑source license, avoiding Oracle’s Java subscription fees.

If you deploy to AWS, Amazon Corretto is another good free option. If you need Java 8 for legacy code, Azul Zulu provides well-supported builds. For a comparison of Java distributions, see [<VPIcon icon="fas fa-globe"/>Install JDK on Mac](https://mac.install.guide/java/jdk).

---

## How to Install Java with Homebrew

Homebrew offers two ways to install Java: the cask method and the formula method. The cask method is easier because it installs the vendor's macOS package to the standard system location. Apple's macOS discovers it automatically with no extra configuration.

Run these two commands:

```sh
brew update
brew install --cask temurin@25
```

The first command refreshes Homebrew's package list. The second downloads and installs Eclipse Temurin JDK 25. Homebrew places the JDK at <VPIcon icon="fas fa-folder-open"/>`/Library/Java/JavaVirtualMachines/temurin-25.jdk/`. This is the standard macOS location for Java installations. Apple's macOS includes a Java launcher at <VPIcon icon="fas fa-folder-open"/>`/usr/bin/java` that automatically searches this directory. You don't need to configure your PATH.

Homebrew also detects your Mac's chip architecture automatically. You'll get the correct native build whether you have an Apple Silicon or Intel Mac.

For more details about the Homebrew installation process, including the alternative formula method and troubleshooting, see [<VPIcon icon="fas fa-globe"/>Brew Install Java, Cask Method](https://mac.install.guide/java/brew-cask).

---

## How to Verify the Installation

After installation, open a new Terminal window. Existing windows may not detect the new installation.

Check the Java version:

```sh
java -version
#
# openjdk version "25.0.1" 2025-10-21 LTS
# OpenJDK Runtime Environment Temurin-25.0.1+8 (build 25.0.1+8-LTS)
# OpenJDK 64-Bit Server VM Temurin-25.0.1+8 (build 25.0.1+8-LTS, mixed mode)
```

This confirms three things: the version number (25.0.1), the distribution (Temurin), and that the 64-Bit Server VM is active.

Check the compiler:

```sh
javac -version
#
# javac 25.0.1
```

List all installed JDKs:

```sh
/usr/libexec/java_home -V
#
# Matching Java Virtual Machines (1):
#     25.0.1 (arm64) "Eclipse Adoptium" - "OpenJDK 25.0.1" /Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home
```

If all three commands produce the expected output, Java is installed and working.

---

## How to Set JAVA_HOME for Build Tools

For most users, Java works immediately after installation. The `java` and `javac` commands are available with no additional setup.

However, some build tools require the `JAVA_HOME` environment variable. Apache Maven, Gradle, and Android SDK all look for it. If you see errors mentioning "JAVA_HOME is not set," you need this step.

If you only run Java applications or use IntelliJ IDEA (which manages Java paths internally), you can skip this section.

Add this line to your `~/.zprofile` file:

```sh title=".zprofile"
export JAVA_HOME=$(/usr/libexec/java_home)
```

This uses Apple's `java_home` utility to find the installed JDK automatically. After saving the file, you'll need to run `source ~/.zprofile` or close and reopen your terminal. Verify it works:

```sh
\( echo \)JAVA_HOME
#
# /Library/Java/JavaVirtualMachines/temurin-25.jdk/Contents/Home
```

For complete configuration instructions, see [<VPIcon icon="fas fa-globe"/>Set JAVA_HOME on Mac](https://mac.install.guide/java/java-home).

---

## How to Troubleshoot Common Problems

**"Unable to locate a Java Runtime" message keeps appearing.** Run `java -version` to verify Java is installed. If you just installed Java, see [<VPIcon icon="fas fa-globe"/>Unable to Locate a Java Runtime](https://mac.install.guide/java/unable-to-locate).

**Wrong Java version appears.** You have multiple JDKs installed and macOS selected a different one. Run `/usr/libexec/java_home -V` to list all installed versions. See [<VPIcon icon="fas fa-globe"/>Set `JAVA_HOME` on Mac](https://mac.install.guide/java/java-home) to point to the version you want.

::: tip Alternative Installation Methods

Homebrew is the fastest path, but other options exist.

1. **Manual download**: You can download the .pkg installer directly from [<VPIcon icon="fas fa-globe"/>adoptium.net](http://adoptium.net) and double-click to install. This is a good choice if you don't use Homebrew. See [<VPIcon icon="fas fa-globe"/>Install Java on Mac](https://mac.install.guide/java/install) for detailed instructions.
2. **Homebrew formula.** The command `brew install openjdk@25` installs a Homebrew-managed build. This approach requires manual symlink configuration before macOS can discover it. See [<VPIcon icon="fas fa-globe"/>Brew Install Java, Formula Method](https://mac.install.guide/java/brew-formula) for details.
3. **Version managers.** Tools like SDKMAN and mise can install and switch between multiple Java versions per project. If you work on codebases that require different Java versions, see [<VPIcon icon="fas fa-globe"/>Java Version Managers](https://mac.install.guide/java/version-managers).

:::

---

## What's Next

You now have Java 25 installed on your Mac. You've verified it works and configured `JAVA_HOME` for build tools. You're ready to compile and run Java applications.

If your team or university course requires Java 21 instead, see [<VPIcon icon="fas fa-gobe"/>Install Java 21 on Mac](https://mac.install.guide/java/java-21). If you need to remove Java, see [<VPIcon icon="fas fa-gobe"/>Uninstall Java on Mac](https://mac.install.guide/java/uninstall).

This article is based on my guides that offer additional details about how to [<VPIcon icon="fas fa-gobe"/>install Java on Mac](https://mac.install.guide/java/install) and choose the [<VPIcon icon="fas fa-gobe"/>latest Java version](https://mac.install.guide/java/new).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install Java on Mac in 2026",
  "desc": "Java is the most widely used programming language for enterprise software, Android development, and university computer science courses. Apple doesn't include Java with macOS, so you need to install i",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-java-on-mac.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
