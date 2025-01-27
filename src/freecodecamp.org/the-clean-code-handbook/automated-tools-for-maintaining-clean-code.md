---
lang: en-US
title: "Automated Tools for Maintaining Clean Code ⚓"
description: "Article(s) > (6/7) The Clean Code Handbook: How to Write Better Code for Agile Software Development" 
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/7) The Clean Code Handbook: How to Write Better Code for Agile Software Development"
    - property: og:description
      content: "Automated Tools for Maintaining Clean Code ⚓"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-clean-code-handbook/automated-tools-for-maintaining-clean-code.html
date: 2025-01-30
isOriginal: false
author:
  - name: Programming with Shahan
    url : https://freecodecamp.org/news/author/codewithshahan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738170236859/edacf21e-7180-4f65-9e7e-f7cf95b4f9d8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Clean Code Handbook: How to Write Better Code for Agile Software Development",
  "desc": "Building scalable software applications requires writing clean code that’s so simple that any dev can understand it. In this article, I’ll explain and demonstrate what clean code is. Then I’ll share my favorite clean code patterns for building modern...",
  "link": "/freecodecamp.org/the-clean-code-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Clean Code Handbook: How to Write Better Code for Agile Software Development"
  desc="Building scalable software applications requires writing clean code that’s so simple that any dev can understand it. In this article, I’ll explain and demonstrate what clean code is. Then I’ll share my favorite clean code patterns for building modern..."
  url="https://freecodecamp.org/news/the-clean-code-handbook#heading-automated-tools-for-maintaining-clean-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738170236859/edacf21e-7180-4f65-9e7e-f7cf95b4f9d8.png"/>

Tools and automation techniques can be really helpful in writing clean code. If you’re not using the right tools and automating things to save yourself time, you’re missing out.

You think you can "eyeball" your way through code quality? Guess again. Without automation, this is what happens:

1. 👎 You miss obvious mistakes because you're "too busy."
2. 🤕 Your code looks different in every file, making collaboration a headache.
3. 🪦 Deployment breaks because you skipped a critical test.

Successful developers use the right tools to automate code and get things done. Here are four strategies for maintaining clean code using modern tools.

---

## 1️⃣ Static Analysis

Static analysis is actually a code inspector that reads through your code and points out potential issues early on. The best part? It works **before** runtime, catching errors that could otherwise lead to crashes, downtime, or embarrassing bugs.

### How does it work?

1. **Syntax checking**: It looks at your code to analyze everything written in the correct syntax. If you misspell a variable or forget a closing bracket, it’ll call you out instantly.
2. **Code quality rules**: Tools like ESLint enforce rules like consistent indentation, avoiding unused variables, and sticking to best practices.
3. **Error prevention**: It identifies logic errors, such as using variables that haven’t been defined, or making comparisons that don’t make sense.

Here’s how static analysis works in action:

### 🚨 Before static analysis:

```js{2}
let sum = (a, b) => { return a + b; }
console.log(sume(2, 3)); // Typo, unnoticed until runtime
```

> **Problem**: The typo in `sume` will only cause an error when the code runs, and that could lead to frustrating debugging sessions or worse — breaking the app in production.

### 🚑 After static analysis (using ESLint):

```plaintext tile="log"
codeError: 'sume' is not defined.
```

> **Solution**: [<FontIcon icon="fas fa-globe"/>ESLint](https://eslint.org/) immediately flags the typo before you even run the code. The error is caught early, saving you time and headaches.

---

## 2️⃣ Automated Code Formatting

Before Formatting:

```js
function calculate ( x , y ){ return x+ y;}
console.log( calculate (2,3 ) )
```

> **Problem**: Inconsistent spacing and formatting make the code harder to read.

### After using Prettier:

```js
function calculate(x, y) {
  return x + y;
}
console.log(calculate(2, 3));
```

> **Solution**: Clean, consistent, and professional formatting is applied automatically. No more nitpicking over spaces or alignment.

Pretty basic stuff though. I covered this in case you write code in notepad or something where IDE is not provided (for example, a job interview).

---

## 3️⃣ Continuous Integration (CI) Testing

CI testing make sure every new change to your code is verified automatically. It’s like a safety net that catches bugs introduced during development. CI tools run your tests every time you push code, so nothing breaks after deployment.

### How Does CI Testing Work?

1. **Triggers on change**: Each time code is committed, the CI tool (like [<FontIcon icon="iconfont icon-github"/>GitHub Actions](https://github.com/features/actions), [<FontIcon icon="iconfont icon-jenkins"/>Jenkins](https://jenkins.io/)) runs automated tests.
2. **Feedback**: It gives you instant feedback if something fails.
3. **Prevents broken code**: Commits only clean, and the working code gets merged into the main branch.

---

## 4️⃣ CI/CD pipelines

We also use CI/CD pipelines as a continuous process that includes code building, testing, and deployment, while CI testing is a part of that process that focuses on automating the testing of code changes.

**Differece between CI/CD pipelines vs CI testing:**

- **CI/CD pipelines:** A CI/CD pipeline combines code building, testing, and deployment into a single process. This process make sure that all changes to the main branch code are releasable to production. CI/CD pipelines can reduce deployment time, decrease costs, and improve team collaboration.
- **CI testing:** CI testing is the process of automatically testing code changes that are integrated into a central repository. CI testing focuses on making sure the codebase is stable and that integration issues are resolved. CI testing help developer build software that is stable, bug-free, and meets functional requirements

::: note

This is what CI testing CI/CD pipelines concepts are really about. Not as complex as it seems. So let me elaborate more on CI testing with GitHub Actions, as we usually run tests through automated tools nowadays.

:::

---

## ⚡ Continuous Integration (CI) Testing with GitHub Actions

As I said earlier, CI tools run automated tests every time you push code or open a pull request. This guarantees that only working, bug-free code gets merged into the main branch.

### How to Set Up CI Testing with GitHub Actions

#### Step 1: Create Your Repository

Set up a GitHub repository for your project. Then, push your code to GitHub using the following commands:

```sh
git init
git add .
git commit -m "Initial commit for CI Testing"
git branch -M main
git remote add origin https://github.com/codewithshahan/codewithshahan.git
git push -u origin main
```

Or you can create a new repo from your GitHub account without using the command. Just login to your GItHub account and visit dashboard. Here you will find a “New” button to create a brand new repo:

![image of creating a new repo on github by Shahan](https://cdn.hashnode.com/res/hashnode/image/upload/v1737618697327/dcef8be8-0d08-45d7-8000-34c4c65df425.png)

#### Step 2: Add a GitHub Actions Workflow

Navigate to your repository’s **Actions** tab. To do this, first, you have to visit your repo on Github (you will find the link after creating your repo). In this case, I created a new repo called “codewithshahan”. Here, look for the **Actions** tab on the right side of the navigation bar.

![Image of github actions navigation tab by shahan](https://cdn.hashnode.com/res/hashnode/image/upload/v1737618879398/7c5aa37a-72be-4701-a8f8-9ea9e05c0d5d.png)

After navigating the Actions tab, scroll down a little and you will find the **continuous integration** section:

![Image of CI (Continuous Integration) testing on Github Actions Page by Shahan](https://cdn.hashnode.com/res/hashnode/image/upload/v1737619002674/60003e57-f2b2-48f1-bef8-9bde39149faf.png)

Choose a setup workflow yourself. I will use Node.js for this project.

After clicking the configure button, a <FontIcon icon="iconfont icon-yaml"/>`node.js.yml` file will be created automatically, and you can adjust the code depending on your goals.

![Image of GitHub workflow snippet for automated testing by Shahan](https://cdn.hashnode.com/res/hashnode/image/upload/v1737619475568/74da6d46-c105-42c8-8662-fc72e9410bda.png)

I won’t go into detail about how should modify your <FontIcon icon="iconfont icon-yaml"/>`.yml` file. It depends on your project goals and personal preference. Also, it is a whole different broader topic and as this article has already become quite long, so I’ll explain it in a future article. For now, just stick with this foundational knowledge.

This CI Testing workflow is best for modern application development. Your app remains stable while incorporating key features including testing (e,g. Dark Mode), Building and deploying applications directly within your GitHub repository. This way, you can push your code confidently, knowing your code is always clean and ready for production.
