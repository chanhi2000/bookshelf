---
lang: en-US
title: "SonarQube in Android — Implementation tips and challenges faced"
description: "Article(s) > SonarQube in Android — Implementation tips and challenges faced"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
  - devops
  - vm
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > SonarQube in Android — Implementation tips and challenges faced"
    - property: og:description
      content: "SonarQube in Android — Implementation tips and challenges faced"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/sonarqube-in-android-implementation-tips-and-challenges-faced.html
prev: /programming/java-android/articles/README.md
date: 2024-11-26
isOriginal: false
author: Dilipchandar
cover: https://droidcon.com/wp-content/uploads/2024/11/1_Qb_6n_mQxOyOTuuf48s9XQ-1024x388.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="SonarQube in Android — Implementation tips and challenges faced"
  desc="SonarQube is an open-source tool that helps developers and teams improve the quality of their code:"
  url="https://droidcon.com/sonarqube-in-android-implementation-tips-and-challenges-faced"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_Qb_6n_mQxOyOTuuf48s9XQ-1024x388.webp"/>

---

## Introduction

SonarQube is an open-source tool that helps developers and teams improve the quality of their code:

- **Code quality analysis**: Analyzes code quality for over 30 languages, frameworks, and IaC platforms
- **Automatic reviews**: Performs automatic reviews with static analysis of code to detect bugs and code smells
- **Integration with DevOps platforms**: Integrates with GitHub, GitLab, Azure, and Bitbucket
- **Real-time feedback**: Provides immediate feedback in your IDE as you write code
- **Quality gates**: Keeps code with issues from being released to production

---

## Steps to implement

I followed this [medium article (<FontIcon icon="fa-brands fa-medium"/>`@niranjanky14`)](https://medium.com/@niranjanky14/sonarqube-tutorial-for-getting-started-in-android-app-7d11e2ef6932) while trying to implement SonarQube.

### Step 1. Download **SonarQube Free Edition** from below link

<SiteInfo
  name="Download SonarQube"
  desc="Get the latest version of SonarQube, the leading product for code quality and security, from the official download page."
  url="https://sonarsource.com/products/sonarqube/downloads/"
  logo="https://sonarsource.com/favicon.ico"
  preview="https://assets-eu-01.kc-usercontent.com:443/f42196a6-70a1-01d0-99f1-43134f12a58b/85b81454-7b7d-4a5b-aa0a-ccfb58055bf9/meta-tag-sonar.png"/>

### Step 2. Download and install **Docker** from below link

<SiteInfo
  name="Home"
  desc="Docker is a platform designed to help developers build, share, and run container applications. We handle the tedious setup, so you can focus on the code."
  url="https://docker.com/"
  logo="https://docker.com/wp-content/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/wp-content/uploads/2013/06/Docker-logo-01.png"/>

### Step 3. Open terminal and run the following command

```sh
docker pull sonarqube:latest
```

::: note

If you get an error — **Docker command not found**, then export its path

```sh
export PATH="$PATH:/Applications/Docker.app/Contents/Resources/bin/"
```

Keep Docker Application open in your system while typing the command **docker pull sonarqube:latest,** otherwise you may get the following error

> *Cannot connect to the Docker daemon at `unix:///var/run/docker.sock`. Is the docker daemon running?*

:::

If Step 3 is successful, you will see the following

```sh
docker pull sonarqube:latest
# 
# latest: Pulling from library/sonarqube
# a186900671ab: Download complete
# 4821edbf1831: Download complete
# 4bec9b5f92ec: Download complete
# b0c3c08b4553: Download complete
# 4f4fb700ef54: Download complete
# 666db0722bb8: Download complete
# 26811a6e12de: Download complete
# 6c88cd8dd883: Download complete
# Digest: sha256:0842dcd4c8f851ce44f8edaf45ac93f7c9079017d60d99f614663e60cef5efe9
# Status: Downloaded newer image for sonarqube:latest
# docker.io/library/sonarqube:latest
```

### Step 4: After step 3, enter the following command to pull all the necessary postgres library

If Step 4 is successful, you will see the following results

```sh
docker run -d --name sonarqube-db \
-e POSTGRES_USER=sonar \
-e POSTGRES_PASSWORD=sonar \
-e POSTGRES_DB=sonarqube \
postgres:alpine
# 
# Unable to find image 'postgres:alpine' locally
# alpine: Pulling from library/postgres
# 440196fcba86: Download complete 
# c97ff27562e7: Download complete 
# 2f5a5dbb159e: Download complete 
# e64e42d2e378: Download complete 
# 0a8fa91fd8dd: Download complete 
# 368fad94fbf5: Download complete 
# cf04c63912e1: Download complete 
# 044d9972b6f9: Download complete 
# 1c4b963fa70b: Download complete 
# fc336a10ac24: Download complete 
# Digest: sha256:14195b0729fce792f47ae3c3704d6fd04305826d57af3b01d5b4d004667df174
# Status: Downloaded newer image for postgres:alpine
# 44c04103a85884090a9cbe479c4dd3c2fa73f4d61c56c35cfaed5c474db52528
```

### Step 5: Setup the SonarQube container with a link to PostgresSQL using the following command

On successful completion of Step 5, you will see a **hash** value. For me it was

```sh
docker run -d --name sonarqube \
-p 9000:9000 \
--link sonarqube-db:db \
-e SONAR_JDBC_URL=jdbc:postgresql://db:5432/sonarqube \
-e SONAR_JDBC_USERNAME=sonar \
-e SONAR_JDBC_PASSWORD=sonar sonarqube
# 
# b473d891d6f9e842fe2e7ba72b2b0493640ca44552250e6770d6d9468ad1c956
```

Once SonarQube is up and running, you can access the web interface by opening `http://localhost:9000` (or the appropriate IP address if running on a remote server) in your web browser.

The default login credentials for the first-time login are `admin` for both **username and password**. You’ll be prompted to change the password after the initial login.

Next, we can see how to configure SonarQube in Android Studio

---

## Configuration

### Step 1: In app’s <FontIcon icon="iconfont icon-gradle"/>`build.gradle`, if we add SonarQube Plugin and other details like this

```groovy title="build.gradle"
allprojects {
    apply plugin: 'org.sonarqube'
    sonar {
        properties {
            property "sonar.host.url", "http://localhost:9000" 
            property "sonar.test.inclusions", "src/test/**"
            property 'sonar.profile', 'Android Lint'
            property "sonar.sourceEncoding", "UTF-8"
            property "sonar.projectName", "SonarTestApp"
            property "sonar.projectKey", "SonarTestKey"
            property "sonar.projectVersion", 1.0.0
            property "sonar.login", "sqp_123123kj123k123j123kj123j1k23k123jk132j"
        }
    }
}
```

we may get the following error **Plugin with id ‘org.sonarqube’ not found**

So, we can try this instead (applying plugin outside allprojects and mentioning other details inside allprojects)

```groovy title="build.gradle"
plugins {
    id "org.sonarqube" version "4.0.0.2929"
}
```

```groovy title="build.gradle"
allprojects {
    sonar {
        properties {
            property "sonar.host.url", "http://localhost:9000"
            property "sonar.test.inclusions", "src/test/**"
            property 'sonar.profile', 'Android Lint'
            property "sonar.sourceEncoding", "UTF-8"
            property "sonar.projectName", "SonarTestApp"
            property "sonar.projectKey", "SonarTestKey"
            property "sonar.projectVersion", 1.0.0
            property "sonar.login", "sqp_123123kj123k123j123kj123j1k23k123jk132j"
        }
    }
}
```

In the above code, property “sonar.projectVersion” should match your project’s `versionName`.

### Step 2: In gradle.properties

```properties title="gradle.properties"
systemProp.sonar.host.url=http://localhost:9000
# (Optional, if not using credentials in build.gradle)
systemProp.sonar.login=your_sonar_username
systemProp.sonar.password=your_sonar_password
```

### Step 3: Finally run your sonar analysis for your project using this command in Android Studio Terminal:

```sh
./gradlew sonarqube
```

You may get the following error if JDK is not installed.

::: warning

> The operation couldn’t be completed. Unable to locate a Java Runtime.

I downloaded suitable JDK Version 17 as my **Android Gradle plugin requires Java 17 to run**. After installing JDK and typing the same command `./gradlew sonarqube` again

:::

Build was getting failed due to an error.

:: warning

> Execution failed for task ‘:app:sonarqube’. > Cannot get property ‘0.0’ on null object

**Solution?** From Step 2, we should replace property `"sonar.projectVersion”`, `1.0.0` to `“sonar.projectVersion”`, `1.0` (as my project’s `versionName` is 1.0) like this

```groovy title="build.gradle"
allprojects {
    sonar {
        properties {
            property "sonar.host.url", "http://localhost:9000"
            property "sonar.test.inclusions", "src/test/**"
            property 'sonar.profile', 'Android Lint'
            property "sonar.sourceEncoding", "UTF-8"
            property "sonar.projectName", "SonarTestApp"
            property "sonar.projectKey", "SonarTestKey"
            property "sonar.projectVersion", 1.0
            property "sonar.login", "sqp_123123kj123k123j123kj123j1k23k123jk132j"
        }
    }
}
```

:::

After all steps are successful, we will get **BUILD SUCCESSFUL** message in terminal

---

## View SonarQube Reports:

- Open your SonarQube server URL (usually `http://localhost:9000`) in a web browser.
- Log in with your SonarQube credentials.
- You should see your project listed and its code quality metrics.

Screenshots for my sample project has been attached for reference

![](https://www.droidcon.com/wp-content/uploads/2024/11/1_yZX7v1lT7UQ1GmDm3tnGGA-600x388.webp)
![](https://www.droidcon.com/wp-content/uploads/2024/11/1_MGCdMMi7qmwgRkqzaRiqRQ-600x388.webp)
![](https://www.droidcon.com/wp-content/uploads/2024/11/1_DO7zpYwYrJoeQzL3WULpMQ-600x388.webp)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SonarQube in Android — Implementation tips and challenges faced",
  "desc": "SonarQube is an open-source tool that helps developers and teams improve the quality of their code:",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/sonarqube-in-android-implementation-tips-and-challenges-faced.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
