---
lang: en-US
title: "Screenshot testing in Jetpack Compose"
description: "Article(s) > Screenshot testing in Jetpack Compose"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Screenshot testing in Jetpack Compose"
    - property: og:description
      content: "Screenshot testing in Jetpack Compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/screenshot-testing-in-jetpack-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-12-04
isOriginal: false
author: Oliver Vicente
cover: https://droidcon.com/wp-content/uploads/2024/12/1_V1-JTPCSJ2rYG-En0wxasQ-1024x1024.webp
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
  name="Screenshot testing in Jetpack Compose"
  desc="In this article, I’ll introduce a useful tool for screenshot testing in Jetpack Compose. This tool was officially announced at the last Google I/O as part of a new library. Although it’s still in the early stages (version 0.0.1-alpha08), it can already be integrated into your projects with minimal configuration and code, allowing you to start testing your UI efficiently."
  url="https://droidcon.com/screenshot-testing-in-jetpack-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/1_V1-JTPCSJ2rYG-En0wxasQ-1024x1024.webp"/>

![Designed by [<FontIcon icon="fas fa-globe"/>Freepik](http://freepik.com/)](https://droidcon.com/wp-content/uploads/2024/12/1_V1-JTPCSJ2rYG-En0wxasQ-1024x1024.webp)

In this article, I’ll introduce a useful tool for screenshot testing in Jetpack Compose. This tool was officially announced at the last Google I/O as part of a new library. Although it’s still in the early stages (version`0.0.1-alpha08`), it can already be integrated into your projects with minimal configuration and code, allowing you to start testing your UI efficiently.

---

## What is Screenshot Testing?

Screenshot testing involves comparing a**reference image**(a baseline) with the**current state**of your UI to detect visual discrepancies. Screenshots are taken with specific configurations such as:

- **Screen size**
- **Dark or light theme**
- **Font scaling**

This approach allows developers to validate UI designs with stakeholders (e.g., designers) by taking screenshots, reviewing them, and then using these validated screenshots as a safeguard to ensure future changes don’t “break” the approved UI. If intentional UI changes occur, new reference images must replace the outdated ones.

**The best part?**The process is automated — only new reference screenshots need manual validation.

---

## Why Use This Tool?

### 1. Backed by Google

Having Google’s developer team maintaining and evolving this tool ensures it follows best practices and integrates seamlessly with the Jetpack ecosystem.

### 2. Integration with Compose Previews

One standout feature is its ability to leverage**Compose Preview annotations**. If you’re familiar with previews in Jetpack Compose, you know how useful they are for quickly visualizing UI components. With this screenshot testing tool, you can use custom preview annotations to define multiple configurations and test them effortlessly.

For example, you can create a single annotation to generate previews for:

- **Four screen sizes**in both**light and dark themes**, or
- **Two screen sizes**with**five different font scales**.

If you want to learn more about optimizing your previews, check out[my post (<FontIcon icon="fa-brands fa-medium"/>`olivervicente`)](https://medium.com/@olivervicente/9-tips-to-improve-your-jetpack-compose-previews-a4e00831bacc), where I share tips like creating your own preview annotations.

### 3. Dedicated Source Set for Screenshot Tests

All screenshot tests are stored in a special source set called`screenshotTest`. This structure keeps screenshot tests separate from other unit and integration tests, maintaining a clean and organized codebase.

### 4. Future Enhancements

At**London Droidcon**,[Jose Alcérreca (<FontIcon icon="fa-brands fa-medium"/>`JoseAlcerreca`)](https://medium.com/u/e0a4c9469bb5)and[Adarsh Fernando (<FontIcon icon="fa-brands fa-medium"/>`adarshf`)](https://medium.com/u/d0f719b3e5e9)(in their talk on[testing strategies](/droidcon.com/scalable-testing-strategies.md), around the 19-minute mark) mentioned an upcoming feature: the ability to use screenshot tests as**previews**in the files where your composables are defined. This would eliminate the need to duplicate code — one function for the preview and another for the screenshot test. While this feature isn’t available in version`0.0.1-alpha08`, it’s a promising addition to look forward to!

---

## Let’s Get Started

Enough talk — let’s set up this tool in your project!  
Follow along as we configure the tool step-by-step, so you can start testing and validating your Jetpack Compose UIs with screenshot tests.

### Setting Up the Plugin

To get started with screenshot testing in Jetpack Compose, you’ll need to ensure your project meets the following prerequisites:

- **Kotlin Version**: At least`1.9.20`(or newer). For this guide, I’ll be using a more recent version for improved compatibility.
- **Android Gradle Plugin**: Version`8.5.0-beta01`or higher.

```toml title="libs.versions.toml"
[versions]

agp = "8.6.1"
kotlin = "2.0.21"
composeScreenshot = "0.0.1-alpha08"

[plugins]
compose-screenshot = { id = "com.android.compose.screenshot", version.ref = "composeScreenshot"}
```

### Step 1: Add the Plugin

Include the screenshot testing plugin in your**module-level <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` file**:

```kotlin title="build.gradle.kts"
plugins {
    // ...
    alias(libs.plugins.compose.screenshot)
    // ...
}
```

### Step 2: Enable Experimental Properties

In your**project’s <FontIcon icon="fas fa-file-lines"/>`gradle.properties` file**, enable the necessary experimental properties:

```properties title="gradle.properties"
android.experimental.enableScreenshotTest=true
```

You’ll also need to set the experimental flag in your**module-level <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts` file**:

```kotlin title="build.gradle.kts"
android {
  // ...
  experimentalProperties\["android.experimental.enableScreenshotTest"\] = true
  // ...
}
```

### Step 3: Check the`ui-tooling`Dependency

Ensure the`ui-tooling`dependency is included in your**version catalog**(if you’re using one) and in your**module-level build.gradle.kts file**. This dependency is essential for rendering and testing Compose UI elements. If you’re using the**Compose BOM (Bill of Materials)**, the version should be managed automatically:

```toml title="libs.versions.toml"
[libraries]
...
# compose
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui-tooling = { group = "androidx.compose.ui", name = "ui-tooling" }
...
```

```kotlin title="build.gradle.kts"
dependencies {
    // ...
    // Compose
    screenshotTestImplementation(platform(libs.androidx.compose.bom)
    screenshotTestImplementation(libs.androidx.ui.tooling)
    // ...
}
```

---

## Creating Screenshot Tests

In the previous section, I mentioned an exciting upcoming feature: the ability to use preview functions from screenshot testing classes to preview composables directly within the file where they are developed. While this feature isn’t available yet, there’s a workaround to avoid duplicating code in the meantime.

### Step 1: Mark Previews as Internal

For composables that already have preview functions, start by marking these preview functions as`internal`. This ensures they remain accessible within your testing source set while keeping them encapsulated.

```kotlin :collapsed-lines title="OBookScaffold.kt"
package com.example.obook.ui.component.scaffold

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.adaptive.currentWindowAdaptiveInfo
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffold
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteScaffoldDefaults
import androidx.compose.material3.adaptive.navigationsuite.NavigationSuiteType
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.PreviewScreenSizes
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.obook.ui.component.menu.MenuIcon
import com.example.obook.ui.component.menu.getMenuItems
import com.example.obook.ui.navigation.NavigationRoutes
import com.example.obook.ui.preview.getNavigationSuiteType
import com.example.obook.ui.theme.OBookTheme

@Composable
fun OBookScaffold(
    navController: NavHostController = rememberNavController(),
    layoutType: NavigationSuiteType = NavigationSuiteScaffoldDefaults.calculateFromAdaptiveInfo(currentWindowAdaptiveInfo())
) {
    var selectedIndex by remember { mutableIntStateOf(0) }
    val menuItems = getMenuItems(
        onNavigateToBook = {
            navController.navigate(route = NavigationRoutes.BOOK_SEARCH)
            selectedIndex = it
        },
        onNavigateToCart = {
            navController.navigate(route = NavigationRoutes.SHOPPING_CART)
            selectedIndex = it
        },
        onNavigateToUser = {
            navController.navigate(route = NavigationRoutes.USER)
            selectedIndex = it
        }
    )
    NavigationSuiteScaffold(
        layoutType = layoutType,
        navigationSuiteItems = {
            menuItems.forEachIndexed { index, navItem ->
                item(
                    icon = { MenuIcon(icon = navItem.icon, label = navItem.label) },
                    label = { Text(navItem.label) },
                    selected = selectedIndex == index,
                    onClick = { navItem.navigationCallback(index) }
                )
            }
        }
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.fillMaxSize()
        ) {
            Text(text = "Content", style = MaterialTheme.typography.headlineLarge)
        }
    }
}

@PreviewScreenSizes
@Composable
internal fun PreviewOBookScaffold() {
    OBookTheme {
        Surface {
            OBookScaffold(layoutType = getNavigationSuiteType())
        }
    }
}
```

<!-- @include: https://gist.github.com/OliverVicente/0c63321eb4306e31ea032cac51403940/raw/962e1ee49cf9a69e13d70b58d90a271d3a497a55/OBookScaffold.kt -->

### Step 2: Reference Preview Functions in Testing Classes

Next, create a dedicated testing class for each composable within the`screenshotTest`source set. In these classes, reference the existing preview function instead of creating a duplicate.

```kotlin title="OBookScaffoldScreenshots.kt"
package com.example.obook.ui.component.scaffold

import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.PreviewScreenSizes

class OBookScaffoldScreenshots {

    @PreviewScreenSizes
    @Composable
    private fun OBookScaffoldPreview() {
        PreviewOBookScaffold()
    }
}
```

<!-- @include: https://gist.github.com/OliverVicente/327c59200e9481a8c651de1deb13d9a8/raw/6ab1534390b4e135e83930198abcd7505b8d8ed0/OBookScaffoldScreenshots.kt -->

### Generating Reference Images

To generate reference images for your screenshot tests, use the following Gradle commands based on your operating system:

- Linux and macOS:`./gradlew updateDebugScreenshotTest`(`./gradlew {:module:}update{Variant}ScreenshotTest`)
- Windows:`gradlew updateDebugScreenshotTest`(`gradlew {:module:}update{Variant}ScreenshotTest`)

In my case, I’m running macOS and have a single module named<FontIcon icon="fas fa-folder-open"/>`app`. Therefore, I use the following command:

```sh
./gradlew :app:updateDebugScreenshotTest
```

### Output Location

After running the command, the reference images are generated and stored in the following directory:

```plaintext title="location"
/app/src/debug/screenshotTest/reference/com/example/obook/ui/component/scaffold/
```

Inside this folder, I find a subfolder named after the testing class,`OBookScaffoldScreenshots`.

![This folder contains five reference image files](https://droidcon.com/wp-content/uploads/2024/12/1_wVPkpKw8t5gKH5MmMrJC3Q.webp)

### Why Five Files?

This is because I used the`@PreviewScreenSizes`annotation in my test class, which generates previews for**five different screen sizes**.

### Preview Example

For instance, if I open the file corresponding to the portrait phone screen size, I can see the captured screenshot representing the composable for that specific configuration.

![This setup provides a straightforward way to validate UI designs across multiple configurations efficiently.](https://droidcon.com/wp-content/uploads/2024/12/1_2auWdi4HuINRJJkFkUTA_Q-472x1024.webp)

### Validating the Test Report

With reference images generated, you can now validate your screenshot tests and inspect the results through a detailed report.

### Command to Validate Screenshot Tests

Depending on your operating system, run the following commands:

- Linux and macOS:`./gradlew validateDebugScreenshotTest`(`./gradlew {:module:}validate{Variant}ScreenshotTest`)
- Windows:`gradlew validateDebugScreenshotTest`(`gradlew {:module:}validate{Variant}ScreenshotTest`)

### Example Usage

In my case, since I have a single module named<FontIcon icon="fas fa-folder-open"/>`app`, the command is:

```sh
./gradlew :app:validateDebugScreenshotTest
```

### Report Location

The test report is generated at the following path:

```plaintext title="folder location"
app/build/reports/screenshotTest/preview/debug/index.html  
# General format: {module}/build/reports/screenshotTest/preview/{variant}/index.html
```

### Testing Changes and Understanding Errors

To simulate a failure, I made a change to the text in the component and ran the validation command again. This resulted in an error.

![Test Report With Errors](https://droidcon.com/wp-content/uploads/2024/12/1_VzxBmBMmUx9PwVaY0CWbmg-1024x336.webp)

By inspecting the report, I could analyze the issue:

- **Left Panel**: Displays the reference screenshot image.
- **Middle Panel**: Shows the current image (with the changes applied).
- **Right Panel**: Highlights the differences between the reference and the current image.

![](https://droidcon.com/wp-content/uploads/2024/12/1_-f9hS0z55vWz8OYweOTbfA-1024x259.webp)

In the case of a real error, you have two options:

1. Verify that the issue is an actual error, fix it, and re-run the validation to ensure the test passes successfully.
2. Confirm that the new image is correct due to an intentional design update, update the reference image to reflect the change, and then re-validate to ensure consistency.

### Use Git LFS (Large File Storage)

Git LFS is a tool to avoid having large files that are not code files in our repository. In our case the reference images.

Follow[<FontIcon icon="iconfont icon-github"/>official documentation](https://docs.github.com/es/enterprise-cloud@latest/repositories/working-with-files/managing-large-files/installing-git-large-file-storage)to install Git LFS. In my case, I will install it using Homebrew:

```sh
brew install git-lfs
```

then track screenshot images with Git LFS

```sh
git lfs track "app/src/debug/**/*.png"
```

Add <FontIcon icon="iconfont icon-git"/>`.gitattributes` to the repository

```sh
git add .gitattributes
```

Commit the changes

```sh
git commit -m "Track PNG files in app/src/debug/* subfolders with Git LFS"
```

### Configuring CI/CD

To streamline the development team’s workflow with screenshot tests, we need to automate the process by creating a CI/CD workflow.

```yaml :collapsed-lines title="test-ui.yml"
name: Test UI

on:
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    concurrency: test-ui-${{ github.ref }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'

      - name: Cache Gradle dependencies
        uses: actions/cache@v4
        with:
            path: |
              ~/.gradle/caches
              ~/.gradle/wrapper
            key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
            restore-keys: |
              ${{ runner.os }}-gradle-    
      - name: Install Git LFS
        run: |
            sudo apt-get install git-lfs
            git lfs install
      - name: Pull LFS files
        run: git lfs pull

      - name: Grant execute permission for gradlew
        run: chmod +x ./gradlew

      - name: Build with Gradle
        run: ./gradlew build

      - name: Run screenshot tests
        run: ./gradlew :app:validateDebugScreenshotTest

      - name: Upload screenshot test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: screenshot-test-report
          path: app/build/reports/screenshotTest/

permissions:
  contents: read
  pull-requests: read
```

<!-- @include: https://gist.github.com/OliverVicente/4106b394a6eda1f334457733037e4676/raw/e6feed78540059a9af92b2411e963d82f0bef978/test-ui.yml -->

### Steps to Configure

#### Install LFS and Pull Files

Configure the workflow to install Git LFS (Large File Storage) and pull the required files. This ensures that the reference images are accessible when running the tests.

```yaml
- name: Install Git LFS
  run: |
    sudo apt-get install git-lfs
    git lfs install

- name: Pull LFS files
  run: git lfs pull
```

#### Set Read Permissions

Grant the necessary read permissions to the workflow so it can access the required resources, including reference images and other test-related files.

```yaml
permissions:
  contents: read
  pull-requests: read
```

#### Run Tests, Generate Reports, and Host Artifacts

The workflow should automate the following steps:

- Execute the screenshot tests.
- Generate the test report.
- Store the report as an artifact, making it accessible for review.

```yaml
- name: Run screenshot tests
  run: ./gradlew :app:validateDebugScreenshotTest

- name: Upload screenshot test report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: screenshot-test-report
    path: app/build/reports/screenshotTest/
```

### Image Difference Threshold

When running the validation in GitHub Actions, an error might occur because the images are not identical. However, the root cause isn’t a significant issue but rather a minor discrepancy in how colors are rendered on different platforms. For example, your local machine (Mac) and the GitHub Actions runner (Ubuntu server) may generate slightly different color values, leading to false positives in the comparison.

![Screenshot Difference](https://droidcon.com/wp-content/uploads/2024/12/1_RCGEiCDrx33Q_rFQFnSFcw-1024x457.webp)

To address the issue of minor image differences, we can adjust the**Image Difference Threshold**. To configure this, add the following to your**module-level <FontIcon icon="iconfont icon-kotlin"/>`build.gradle.kts`**file:

```kotlin title="build.gradle.kts"
android {
  // ...
  testOptions {
        screenshotTests {
            imageDifferenceThreshold = 0.002f // 0.2%
        }
    }
  // ...
}
```

Now, when you run the pipeline again, the job will succeed without errors.

In a real project scenario, it’s generally better to generate reference images on the server itself. This ensures that both the updates and validations occur on the same machine, eliminating the need for adjustments to the**Image Difference Threshold**configuration. This approach helps maintain consistency across environments and simplifies the testing process.

---

## Closing

If you found this article helpful or interesting, please give it a clap and consider subscribing for more content! I’d love to hear your thoughts! Your feedback and insights are always welcome, as I’m eager to learn, collaborate, and grow with other developers in the community.

Have any questions? Feel free to reach out!

You can also follow me on[Medium (<FontIcon icon="fa-brands fa-medium"/>`olivervicente`)](https://medium.com/@olivervicente)or[LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`olivervicentealfonso`)](https://linkedin.com/in/olivervicentealfonso/)for more insightful articles and updates. Let’s stay connected!

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/screenshot-testing-in-jetpack-compose-bbed440ea19a)

<SiteInfo
  name="Screenshot testing in Jetpack Compose"
  desc="In this article, I’ll introduce a useful tool for screenshot testing in Jetpack Compose. This tool was officially announced at the last…"
  url="https://proandroiddev.com/screenshot-testing-in-jetpack-compose-bbed440ea19a/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*V1-JTPCSJ2rYG-En0wxasQ.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Screenshot testing in Jetpack Compose",
  "desc": "In this article, I’ll introduce a useful tool for screenshot testing in Jetpack Compose. This tool was officially announced at the last Google I/O as part of a new library. Although it’s still in the early stages (version 0.0.1-alpha08), it can already be integrated into your projects with minimal configuration and code, allowing you to start testing your UI efficiently.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/screenshot-testing-in-jetpack-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
