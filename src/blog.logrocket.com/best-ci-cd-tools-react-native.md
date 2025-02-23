---
lang: en-US
title: "Best CI/CD tools for React Native"
description: "Article(s) > Best CI/CD tools for React Native"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Best CI/CD tools for React Native"
    - property: og:description
      content: "Best CI/CD tools for React Native"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/best-ci-cd-tools-react-native.html
prev: /programming/js-react/articles/README.md
date: 2025-02-05
isOriginal: false
author:
  - name: Hussain Arif
    url : https://blog.logrocket.com/author/hussain-arif/
cover: /assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  "title": "Jenkins > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/jenkins/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Best CI/CD tools for React Native"
  desc="Get a high-level comparison of five of the most popular and well-used CI/CD tools for React Native apps, including the features they support."
  url="https://blog.logrocket.com/best-ci-cd-tools-react-native"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/banner.png"/>

::: note Editor’s note

This post was last updated on 5 February 2025 to include new information about EAS Workflows.

:::

![Best CI/CD tools for React Native](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/banner.png)

Continuous integration (CI) and continuous delivery (CD) pipelines are a set of automated processes that help developer teams deliver software more quickly and reliably. CI pipelines automate the process of building, testing, and deploying code, while CD pipelines automate the process of delivering that code to the end user.

In this article, we will discuss the most popular CI/CD pipelines used by React Native developers.

---

## What problems does a CI/CD pipeline solve?

As developers, we know that one of the most crucial steps while programming is to build, deploy and test our code. To make this happen, we can do the following:

- Create a separate branch on our repository called `production`
- When someone on the team commits to the branch, that team member must run a build script to create an executable file
- Finally, the developer has to download this file on their machine and then upload it to a distribution platform. Through this platform, clients can then download and run the app

Even though this solution works, there are a few issues with this:

- This process is tedious. In the first step, developers must first commit to the branch and then run a build script
  - This takes up [<FontIcon icon="fa-brands fa-stack-overflow"/>valuable time](https://stackoverflow.com/questions/57918898/react-native-ios-build-is-taking-a-long-time) because the building process involves compiling the project, testing, and producing an artifact file
- Furthermore, it consumes valuable resources on the local machine, which may lead to serious problems in cases where the project’s codebase is large and complex

This is the problem a [<FontIcon icon="fa-brands fa-redhat"/>CI/CD pipeline](https://redhat.com/en/topics/devops/what-cicd-pipeline) comes in to solve. Let’s cover a few different options for React Native development.

---

## EAS Workflows

[<FontIcon icon="fas fa-globe"/>EAS Workflows](https://docs.expo.dev/eas-workflows/get-started/) is a dedicated React Native CI/CD solution for iOS, Android, and Web. With this service, developers can automate their development and release processes, which makes the whole development experience smoother and more efficient. EAS Workflows is the easiest service on this list to work with because it only requires a few commands to get up and running:

![Expo App Services dashboard](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/expo-app-services-dashboard.png)

For example, to build and publish, all we need to do is the following:

```sh
npm install --global eas-cli
npx eas-login # sign into the service
eas build:configure # this will generate an eas.json file
# this file will allow you to configure your building process.
```

For more information on deployment and build configuration, navigate to [<FontIcon icon="fas fa-globe"/>Expo’s documentation](https://docs.expo.dev/build/setup/).

### Pros and cons of EAS

::: tabs

@tab:active Pro(s)

- It’s the easiest option to host and deploy apps, especially if they’re built with Expo
- Developers provide an option to host the [<FontIcon icon="fas fa-globe"/>Expo Build process on your server](https://docs.expo.dev/build-reference/local-builds/) but, consequently, it is suited for companies where the project’s code has to be kept private
- Handles the stressful stuff for you, like signing certificates and keystore files, which saves a lot of engineering time and effort
- Provides extensive documentation in case you need help
- Supports both Expo and React Native apps
- Run Maestro tests, lint checks, or any part of your release process. Just write custom YAML code to run tasks specific to your project
- Send previews for review and QA in seconds

@tab Con(s)

- The free tier is limited if builds are frequent
- During peak hours, you might have to wait a bit for your builds to complete on the free tier, which might be a problem if you’re on a tight deadline

:::

---

## Microsoft App Center

[<FontIcon icon="fa-brands fa-microsoft"/>Microsoft App Center (MAC)](https://appcenter.ms/apps) is a CI/CD platform dedicated to app development. Unlike Expo Application Services, it supports both React Native and other cross-platform technologies like Unity and Xamarin.

![Here’s what it looks like: Microsoft App Center dashboard](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/microsoft-app-center-dashboard.png)

Building an app on App Center is a bit involved, but it is still straightforward. First, upload your project on GitHub, Azure, or another code hosting platform:

![Select a service in Microsoft App Center](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/select-service-mac.png)

Next, specify the project’s location in App Center’s settings:

![Specify the project location in MAC](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/specify-project-location-mac.png)

Finally, the service will then ask you to configure your build settings. You also might have to generate and [<FontIcon icon="fa-brands fa-android"/>upload a keystore file in this step](https://developer.android.com/studio/publish/app-signing#generate-key).

That’s it! When that’s done, the pipeline will start building the app for you.

### Pros and cons of MAC

Microsoft App Center has some significant strengths that stand out among the competition.

It can run a test to verify whether the app can launch successfully. It is particularly useful in situations where you need to ensure the functionality of a new build.

With this feature, you can verify this without manually running the app on a mobile device:

![Build verification is device-optional](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/build-verification-device-optional.png)

Here are a few other pros worth mentioning:

- The free tier is generous. In many cases, it is enough for personal and small-scale projects, but the service also provides a 30-day free trial for their paid tier
- Provides clear and exhaustive documentation
- Supports end-to-end tests
- Widely used in enterprise environments, so extensive support is available from the community

However, there were some things that I found unappealing:

- No option to run builds on local infrastructure. As discussed before, this might be a problem in situations where source code privacy is important
- Paid option may be too expensive for small startups
- E2E tests are locked behind a paywall
- As of writing this article, [Microsoft doesn’t support Expo apps (<FontIcon icon="iconfont icon-github"/>`microsoft/appcenter`)](https://github.com/microsoft/appcenter/issues/189)

---

## GitHub Actions

[<FontIcon icon="iconfont icon-github"/>GitHub Actions](https://github.com/features/actions) is a prominent option among numerous open-source programmers. One reason for its popularity is that this tool integrates with GitHub, so developers can use it to automate their workflows directly from their GitHub repository:

![GitHub Actions can be deployed from your repository](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/github-actions-repository.png)

Although building an app on GitHub Actions is tricky, it provides greater control over the building process as compared to other platforms, thus making it a worthwhile trade-off.

To deploy with GitHub Actions, create a folder in your repo called <FontIcon icon="fas fa-folder-open"/>`.github/workflows`. There, create a new file called <FontIcon icon="iconfont icon-yaml"/>`ci.yml`:

![Create a new file called <FontIcon icon="iconfont icon-yaml"/>`ci.yml` in your repo](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/new-file-ci-yml.png)

This tells GitHub that our project will use GitHub Actions for deployment. After this step, follow the [**instructions in this LogRocket article**](/blog.logrocket.com/react-native-ci-cd-using-github-actions.md) to build a CI/CD pipeline using GitHub Actions in React Native.

### Pros and cons of GitHub Actions

Here are some of the reasons why this pipeline service might be suitable for you:

- The service allows for more control, which means that you can add tests and even change your build agent
- Its free tier is more than enough for personal projects. Moreover, GitHub even issues [<FontIcon icon="iconfont icon-github"/>Pro accounts for students](https://education.github.com/pack), which allows them to upgrade to a paid option for free
- Other than building apps, GitHub Actions can also run [<FontIcon icon="iconfont icon-github"/>automated code quality checks](https://github.com/marketplace/actions/sonarqube-scan). This is suitable in situations where you want to detect code smells and bugs in your project before deployment
- The [<FontIcon icon="iconfont icon-github"/>self-hosted runners feature](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) allows companies to host their version of Actions on local infrastructure. As discussed before, this is great for private code repositories
- The free tier allows for [<FontIcon icon="fas fa-globe"/>end-to-end tests](https://remarkablemark.org/blog/2023/02/18/how-to-run-react-native-detox-tests-on-github-actions/)

However, as compared to other platforms, here are some things that I didn’t like:

- The process of building a CI/CD pipeline is too involved. In some cases, it might be too complex for beginners who are looking to deploy their app
- GitHub Actions does not have dedicated documentation for React Native apps. Because of this, you might have to rely on the community for help

---

## CodeMagic

[<FontIcon icon="fas fa-globe"/>CodeMagic](https://codemagic.io/start/) is another CI/CD pipeline specifically geared towards mobile app development frameworks, including [<FontIcon icon="fas fa-globe"/>Flutter](https://blog.logrocket.com/tag/flutter), Cordova, Ionic, and others:

![The CodeMagic dashboard](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/codemagic-dashboard.png)

Just like Expo and Microsoft’s App Center, deploying and building your React Native app is fairly easy. To get started, create a file called <FontIcon icon="iconfont icon-yaml"/>`codemagic.yml` in your React Native app, and write the following code:

```yaml
workflows:
  sample-workflow:
    name: Codemagic Sample Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
```

This tells the pipeline that our build will use [**Apple’s M1 Mac machine**](/blog.logrocket.com/how-to-set-up-m1-macbook-web-development.md) for deployment.

After this step, it’s best to head to [<FontIcon icon="fas fa-globe"/>CodeMagic’s documentation](https://docs.codemagic.io/yaml-quick-start/building-a-react-native-app/) to learn how to build and deploy your project.

### Pros and cons of CodeMagic

Here are some of the things I loved about it:

- Their servers use Apple’s M-series machines, which leads to [<FontIcon icon="fas fa-globe"/>rapid build times](https://jeffgeerling.com/blog/2021/apple-m1-compiles-linux-30-faster-my-intel-i9)
- CodeMagic uses a pay-as-you-go model, which means that you only pay for the resources you use. In some cases, this might be a cheaper option as compared to other services in this list
- Amazing documentation with step-by-step guides
- Supports [<FontIcon icon="fas fa-globe"/>end-to-end tests](https://docs.codemagic.io/yaml-testing/testing/) on the free tier

However, there were some things that I didn’t like about it:

- Does not have a self-hosted option, which can be a problem for privacy-sensitive code

---

## Honorable mentions

Professional mobile developers also widely use other CI services, such as Bitrise and Jenkins CI. Since these services have compilation steps similar to Microsoft App Center, we won’t discuss their building processes here.

### Bitrise

Just like CodeMagic, this service is geared towards mobile app development. Furthermore, it supports [<FontIcon icon="fas fa-globe"/>add-ons](https://devcenter.bitrise.io/en/references/bitrise-add-ons.html) to help in development with, for example, [<FontIcon icon="fas fa-globe"/>debug reports](https://devcenter.bitrise.io/en/testing/test-reports.html) or [<FontIcon icon="fas fa-globe"/>release management](https://devcenter.bitrise.io/en/release-management.html).

![The Bitrise dashboard](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/bitrise-dashboard.png)

#### Pros and cons of Bitrise

Here are some aspects of Bitrise that might make it a appealing option:

- Rapid build times: Just like CodeMagic, this also supports Apple’s M series machines to compile and build code
- Pay-as-you-go model: The biggest upside to this service is that you can save money by only paying for the resources you use
- Supports [end-to-end tests](https://devcenter.bitrise.io/en/testing.html) on the free tier

However, there were some flaws that might be a deal-breaker to some:

- Does not provide a self-hosted option

### Jenkins

Jenkins is another pipeline service that is targeted towards enterprises and large businesses. This is because the software is completely self-hosted. As discussed before, this is great for situations where the project’s source code has to be kept private.

![The Jenkins dashboard](/assets/image/blog.logrocket.com/best-ci-cd-tools-react-native/jenkins-dashboard.png)

#### Pros and cons of Jenkins

One major factor that made me like Jenkins was that it is completely self-hosted. Because of this, Jenkins is a popular tool among larger businesses. This is because self hosting allows companies to avoid spending money on expensive tiers and instead use local hardware.

However, this comes at a cost: maintaining and making sure your Jenkins host remains secure might be a hassle for some teams.

---

## Comparison table

Here is a small table that summarizes all pros and cons of all platforms discussed in this article:

::: tabs

@tab:active Expo Application Services

**Key Features**

Built for React Native and Expo projects

**Pros**

- Easiest to deploy
- Handles certificates and keystore files
- Extensive documentation

**Cons**

- Limited free tier
- Peak hours may require waiting
- Early state of E2E tests

**Pricing**

Free tier & Paid tiers

@tab Microsoft App Center

**Key Features**

Supports multiple platforms, including React Native

**Pros**

- Generous free tier
- Runs app launch tests
- E2E tests support
- Extensive documentation

**Cons**

- No local infrastructure
- Can be costly for startups
- E2E tests behind paywall
- No support for Expo apps

**Pricing**

Free tier & Paid tiers

@tab GitHub Actions

**Key Features**

Integrates directly with GitHub repository

**Pros**

- More control
- Pro accounts for students
- Automated code quality checks
- Self-hosted runners
- E2E tests on the free tier

**Cons**

- Complex setup
- Lacks dedicated documentation for React Native

**Pricing**

Free tier & Paid tiers

@tab CodeMagic

**Key Features**

Specifically geared towards mobile app frameworks

**Pros**

- Uses Apple’s M-series machines
- Pay-as-you-go model
- Extensive documentation
- E2E tests on the free tier

**Cons**

No self-hosted option

**Pricing**

Pay-as-you-go

@tab Bitrise

**Key Features**

Built for mobile apps, Uses Apple’s M-series machines

**Pros**

- Rapid build times
- Pay-as-you-go model
- Great documentation
- E2E tests on the free tier

**Cons**

No self-hosted option

**Pricing**

Pay-as-you-go

@tab Jenkins CI

**Key Features**

Completely self-hosted, no online hosting option available

**Pros**

- Great for maximum privacy and security
- Completely free

**Cons**

Maintaining and hosting of the CI server on local infrastructure can be a pain

**Pricing**

Free

:::

---

## Conclusion

In this article, we briefly discussed some popular CI/CD platforms for React Native and why they are crucial in the programming world. We also included some honorable mentions, [<FontIcon icon="iconfont icon-jenkins"/>Jenkins CI](https://jenkins.io/) and [<FontIcon icon="fas fa-globe"/>Bitrise](https://bitrise.io/), in our comparison table. It is important to remember that every project is different, and therefore it is important to evaluate each tool’s advantages and disadvantages.

In my projects, I typically use Expo Services because it is incredibly easy to set up and use, and its free tier is more than enough for my needs. Thank you so much for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Best CI/CD tools for React Native",
  "desc": "Get a high-level comparison of five of the most popular and well-used CI/CD tools for React Native apps, including the features they support.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/best-ci-cd-tools-react-native.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
