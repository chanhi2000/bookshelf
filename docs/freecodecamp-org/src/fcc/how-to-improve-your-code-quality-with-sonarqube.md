---
lang: en-US
title: "How to Use SonarQube to Improve Your Code Quality"
description: "Article(s) > How to Use SonarQube to Improve Your Code Quality"
icon: iconfont icon-sonarqube
category:
  - DevOps
  - SonarQube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sonarqube
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use SonarQube to Improve Your Code Quality"
    - property: og:description
      content: "How to Use SonarQube to Improve Your Code Quality"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-improve-your-code-quality-with-sonarqube.html
prev: /devops/sonarqube/articles/README.md
date: 2025-05-03
isOriginal: false
author:
  - name: Divya Valsala Saratchandran
    url : https://freecodecamp.org/news/author/divyasaratchandran/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746207275407/7b0da6c9-9bd7-40ca-853e-b1f7957acf3b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "SonarQube > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sonarqube/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use SonarQube to Improve Your Code Quality"
  desc="SonarQube is a powerful open-source tool that helps you maintain code quality and security by analyzing your codebase for bugs and vulnerabilities. And it can play a major role when integrated into your CI/CD pipeline. In this tutorial, we will cover..."
  url="https://freecodecamp.org/news/how-to-improve-your-code-quality-with-sonarqube"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746207275407/7b0da6c9-9bd7-40ca-853e-b1f7957acf3b.png"/>

SonarQube is a powerful open-source tool that helps you maintain code quality and security by analyzing your codebase for bugs and vulnerabilities. And it can play a major role when integrated into your CI/CD pipeline.

In this tutorial, we will cover:

1. What is SonarQube?
2. How SonarQube Improves Code Quality
3. Step-by-step Installation and Configuration
4. How to Run Your First Code Analysis

---

## What is SonarQube?

SonarQube is an open-source tool that checks for code quality continuously. It analyzes code to find issues like duplication, bad practices, test coverage gaps, bugs, and vulnerabilities, giving detailed reports. It works with many programming languages like Java, C#, JavaScript, Python, TypeScript, and Kotlin.

You can add SonarQube to your CI/CD pipelines, IDEs, and version control systems like GitHub, GitLab, or Bitbucket. It provides detailed dashboards that show metrics, trends, and issues in your code.

You can use custom rules to enforce coding standards and reduce technical debt. SonarQube also supports code coverage analysis to help teams improve their tests. With the Quality Gate feature, teams can ensure only clean, maintainable code goes into production.

SonarQube offers both free and paid versions to suit any team size. Overall, it helps improve software quality and encourages good coding practices.

---

## How Does SonarQube Improve Code Quality?

Here’s how SonarQube helps improve code quality:

1. **Early bug detection:** Identifies bugs before they reach production
2. **Improved maintainability:** Highlights code and design issues
3. **Security insights:** Identifies vulnerabilities and security risks
4. **Code coverage:** Integration with testing tools to monitor unit test coverage
5. **Customizable rules:** Allows teams to set coding standards and policies
6. **Team collaboration:** Ensures consistent code quality across development teams

---

## Step-by-Step Installation and Configuration

::: note Prerequisites:

Here are the prerequisites that you will need before installing SonarQube

1. **Java Runtime Environment(JRE)**: Java 11 or above installed in your system.
2. **System Requirements**: 2GB RAM minimum (Recommended: 4GB+).
3. **MacOS**: You can use HomeBrew, which is the package manager for MacOS that simplifies the installation of software.

:::

Below are the steps to install SonarQube in your local machine:

### Download SonarQube

Download the software from [<VPIcon icon="fas fa-globe"/>sonarsource downloads](https://sonarsource.com/products/sonarqube/downloads/) and choose the *Community Edition* for open-source projects.

### Extract and Configure

To install SonarQube, you need to run the below command to unzip the file:

```sh
unzip sonarqube-<version>.zip
cd sonarqube-<version>/bin/<your-OS-folder>
```

### Start SonarQube

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

On Linux/Mac, you need to run the below command:

```sh
./sonar.sh start
```

@tab <VPIcon icon="fa-brands fa-windows"/>

On Windows, you need to run this one:

```sh
StartSonar.bat
```

:::

### Access SonarQube

To access SonarQube, you need to open browser and go to: [<VPIcon icon="fas fa-globe"/>`http://localhost:9000`](http://localhost:9000)

Enter the default credentials:

- **Username:** `admin`
- **Password:** `admin` (you’ll be prompted to change it)

The page will look similar to below:

![SonarQube project creation page](https://cdn.hashnode.com/res/hashnode/image/upload/v1746152681985/0b1829cb-bd2a-4961-bc69-18f5d677d9dd.png)

### Set Up SonarQube in Your Project

To set up SonarQube in your project, start by opening the Java project on your machine. In the project root, create a <VPIcon icon="fas fa-file-lines"/>`sonar-project.properties` ile.

Add the below key value pairs in the file:

```sh title="sonar-project.properties"
sonar.projectKey=spring-myproject
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sources=.
sonar.host.url=http://localhost:9000
```

---

## How to Run Your First Code Analysis

### Configure and Run SonarScanner

SonarScanner is the tool that actually sends your code to SonarQube for analysis. Below are the detailed steps to follow to use it:

#### Install SonarScanner:

On Windows/Linux, download the software from [<VPIcon icon="iconfont icon-sonarqube"/>SonarSource](https://docs.sonarsource.com/sonarqube-server/10.4/analyzing-source-code/scanners/sonarscanner/) and unzip it:

```sh
unzip sonar-scanner-cli-<version>.zip
```

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
brew install sonar-scanner
```

:::

For both Windows/Linux and MacOS, verify the install by running the below command:

```sh
sonar-scanner -v
```

#### Configure SonarScanner

After installing SonarScanner, you’ll need to configure it by setting the **SonarQube server** URL and **authentication token**. Then go to your SonarQube profile (top-right corner > My Account > Security) and generate a token.

![Generate tokens in SolarQube](https://cdn.hashnode.com/res/hashnode/image/upload/v1746154994148/02ccf0cd-68ce-4447-bb1f-12ff04cd9e59.png)

Provide a name for the token and click ‘Generate’:

![Name token and then generate](https://cdn.hashnode.com/res/hashnode/image/upload/v1746155102747/834dcbac-070e-4958-9cb7-44a738059343.png)

In the `sonar-project.properties` file in your project, add `sonar.login` property and save.

```sh{4} title="sonar-project.properties"
sonar.projectKey=test-project
sonar.projectName=Test Project
sonar.host.url=http://localhost:9000
sonar.login=<YOUR_TOKEN_HERE>
```

#### Run the Analysis

Once the SonarScanner is configured, you can start scanning your project.

In a terminal or command prompt, go to the root of your project (where <VPIcon icon="fas fa-file-lines"/>`sonar-project.properties` is located).

Run the following command:

```sh
sonar-scanner
```

SonarScanner will analyze your code and push the results to your local SonarQube server. Visit `http://localhost:9000`, and you’ll see your project listed on the dashboard.

![Scanner results dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1746151289131/d2794dc7-1a53-4787-8137-668849d50d2b.png)

To view the analysis report, go to [<VPIcon icon="fas fa-globe"/>`http://localhost:9000/dashboard?id=java-sonar-demo`](http://localhost:9000/dashboard?id=java-sonar-demo):

![Analysis results](https://cdn.hashnode.com/res/hashnode/image/upload/v1746151477685/931d1170-3c90-45d2-ab07-b60b551f3856.png)

If you go to the ‘Issues’ tab at top left corner, you can view different categories of Software Quality, Severity of the Issues, and various other attributes in your code.

![Detailed results](https://cdn.hashnode.com/res/hashnode/image/upload/v1746151632987/090c61d0-0a37-4bb1-82a1-76f149a4cc86.png)

---

## Conclusion

Now you have installed and configured SonarQube and learned how to scan your code using SonarScanner. You can easily configure it in your projects for continuous code quality analysis.

This is a fantastic tool for keeping your code base clean and maintainable. As the next steps, you can consider adding test coverage reports, enforcing quality gates in your pipeline, and exploring SonarCloud for cloud-based analysis.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use SonarQube to Improve Your Code Quality",
  "desc": "SonarQube is a powerful open-source tool that helps you maintain code quality and security by analyzing your codebase for bugs and vulnerabilities. And it can play a major role when integrated into your CI/CD pipeline. In this tutorial, we will cover...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-improve-your-code-quality-with-sonarqube.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
