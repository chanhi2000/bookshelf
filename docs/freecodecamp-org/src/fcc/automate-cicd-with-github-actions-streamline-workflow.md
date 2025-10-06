---
lang: en-US
title: "How to Automate CI/CD with GitHub Actions and Streamline Your Workflow"
description: "Article(s) > How to Automate CI/CD with GitHub Actions and Streamline Your Workflow"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate CI/CD with GitHub Actions and Streamline Your Workflow"
    - property: og:description
      content: "How to Automate CI/CD with GitHub Actions and Streamline Your Workflow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/automate-cicd-with-github-actions-streamline-workflow.html
prev: /devops/github/articles/README.md
date: 2025-04-15
isOriginal: false
author:
  - name: Chidiadi Anyanwu
    url : https://freecodecamp.org/news/author/chidiadi01/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744638276204/5cf04403-6bf0-4bf1-b9d3-89722bd90425.png
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

[[toc]]

---

<SiteInfo
  name="How to Automate CI/CD with GitHub Actions and Streamline Your Workflow"
  desc="CI/CD stands for Continuous Integration and Continuous Delivery. It is a system or set of processes and methodologies that help developers quickly update codebases and deploy applications. The Continuous Integration (CI) part of CI/CD means that deve..."
  url="https://freecodecamp.org/news/automate-cicd-with-github-actions-streamline-workflow"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638276204/5cf04403-6bf0-4bf1-b9d3-89722bd90425.png"/>

CI/CD stands for Continuous Integration and Continuous Delivery. It is a system or set of processes and methodologies that help developers quickly update codebases and deploy applications.

The Continuous Integration (CI) part of CI/CD means that developers can always integrate or merge their changes into the shared repository without breaking anything. Continuous Delivery, on the other hand, means that the code changes are automatically prepared for release after testing and validation.

CI/CD primarily involves various stages like building, testing, staging and deployment.

- **Build phase:** This is where the code and its dependencies are compiled into a single executable. This is the first phase of Continuous Integration, and is triggered by an event like pushing code to the repository.
- **Test phase:** Here, the built artifacts are tested to be sure that the code runs as expected.
- **Staging:** Here, the application is run in a production-like environment so as to be sure it is production ready.
- **Deployment:** Here, the application is automatically deployed to the end-users.

In this article, I’m going to explain how GitHub Actions works. I’ll also talk about basic GitHub Actions concepts, and then we’ll use it to build an example CI/CD pipeline.

---

## What is GitHub Actions?

GitHub Actions is a service or feature of the GitHub platform that lets developers create their own CI/CD workflows directly on GitHub. It runs jobs on containers hosted by GitHub. The tasks are executed as defined in a YAML file called a workflow. This workflow file has to live on the *.github/workflows* folder on the repository for it to work.

---

## Basic GitHub Actions Concepts

GitHub Actions consists of events, jobs, tasks, runners, workflows, and various other features. Here is a brief explanation of the main concepts:

### Events

An event is basically something that happened. With GitHub, an event can be a push (when you push your code to the repository), a pull request, or even a cron job. These events trigger the CI/CD process.

### Tasks

When you use CI/CD, you want to be able to trigger an activity that should be done automatically. That activity is known as a task or step in GitHub. It could be building your code or testing it or deploying it.

Each of those tasks has to be defined by commands. A GitHub Actions task usually consists of the name, and the instructions on what to do in the form of a command which starts with `- run:` or an Action which starts with `- uses:`.

```yaml title=".github/workflows/deploy.yaml"
steps:
  - name: Checkout code
    uses: actions/checkout@v3

  - name: Set up Node.js
    uses: actions/setup-node@v3
    with:
      node-version: 16

  - name: Install dependencies
    run: npm install

  - name: Run tests
    run: npm test

  - name: Build project
    run: npm run build

  - name: Deploy
    run: echo "Deploy step goes here"
```

#### Runner

A GitHub runner is a server that runs your tasks. It executes what is defined in your GitHub workflow. You can use your own runners or you can use the GitHub runners.

#### Job

A job is a collection of steps that are being executed on the same runner. Jobs are defined in a file called the workflow.

#### Workflow

The GitHub workflow is a series of jobs defined in a YAML file, that are triggered upon an event. The events do not trigger individual tasks. They can only trigger workflows. Then the tasks in the jobs of the workflow are executed.

#### Contexts

These provide a way to access information about workflows, jobs, and environments in GitHub. They are accessed with the expression `$${{ <context> }}`. Examples include `github`, `env`, `vars`, and `secrets`. The `github` context is used to access information about the workflow. For example:

```yaml
$${{github.repository}} # should tell the name of the repository

$${{github.actor}}  # should tell the username of user that initially triggered the workflow
```

#### Secrets

This is used to store and access sensitive information that’s used by, and is available to, the workflow. Secrets are redacted when printed to the log. An example is `$${{secrets.GITHUB_TOKEN}}`.

---

## How to Build a Simple CI/CD Pipeline

Here, we’re going to build an example workflow to deploy a simple HTML and CSS website to GitHub Pages. Follow the steps below:

::: tabs

@tab:active 1.

Go to the sample code in my repository and fork it from [here (<VPIcon icon="iconfont icon-github"/>`chidiadi01/StaticPage-Starter`)](https://github.com/chidiadi01/StaticPage-Starter).

@tab 2.

Go to the settings tab in the GitHub repository:

![Settings tab](https://cdn.hashnode.com/res/hashnode/image/upload/v1744220928970/d2f62ae0-49be-4770-b931-59e5bc28e20e.png)

@tab 3.

Go to the Pages settings:

![Pages settings menu](https://cdn.hashnode.com/res/hashnode/image/upload/v1744220974335/4aeac1df-be0d-493d-98d3-fb9ea4d48ca0.png)

@tab 4.

Set the deployment source to the <VPIcon icon="fas fa-code-branch"/>`main` branch:

![Setting deployment source to main branch in GitHub pages](https://cdn.hashnode.com/res/hashnode/image/upload/v1744290941501/365d8b5d-1265-42be-9de4-d3a07b984736.png)

@tab 5.

Go to the General Actions settings and scroll down to the bottom:

@tab 6.

![Find General Actions setting](https://cdn.hashnode.com/res/hashnode/image/upload/v1744221468786/d94fe477-65a3-49dc-85ea-6ab8cb2f9c63.png)

At the bottom, set the Workflow permissions to read and write:

![Set workflow permissions to read and write](https://cdn.hashnode.com/res/hashnode/image/upload/v1744221589612/4f5b1cf2-8343-4da8-ad61-21ba76319ffc.png)

@tab 7.

In the GitHub repository, you can clone it to your PC or press the fullstop (`.`) on your keyboard to open GitHub Codespaces, the online version of VS Code.

@tab 8.

Go to the sidebar and click on create a new file:

![Creating new file](https://cdn.hashnode.com/res/hashnode/image/upload/v1744292745424/a3ca0a1e-13cf-4182-8425-9c3500e01e3d.png)

@tab 9.

Create a workflows folder and file. You can call it <VPIcon icon="iconfont icon-yaml"/>`deploy.yaml`.

![Creating a workflows folder and file named deploy.yaml](https://cdn.hashnode.com/res/hashnode/image/upload/v1744292931628/300665a5-d517-46b1-9b30-21dd4bc228a6.png)

@tab 10.

Copy this code into the file:

```yaml title=".github/workflows/deploy.yaml"
name: Deploy Static HTML and CSS to GitHub Pages

# Trigger the workflow on push to the main branch

on:
  push:
    branches:
      - main
# Define what operating system the job should run on
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
    # Step 1: Checkout the repository
    - name: Checkout Code
      uses: actions/checkout@v4

    # Step 2: Check the files that have been checked out
    - name: Display files
      run: ls

    # Step 3: Deploy to GitHub Pages
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./ # The HTML and CSS files lie in the root directory, hence that should be the publish directory
```

@tab 11.

Commit the code. You should see the job running when you go back to the repo:

![Running job](https://cdn.hashnode.com/res/hashnode/image/upload/v1744292376966/93d6078c-02c3-41f4-a4b5-09639522bbbe.png)

When you’re done, go back to the home page of the repository and click on the Deployments section. There, you will see the GitHub Pages link to the deployment:

![GitHub Pages link](https://cdn.hashnode.com/res/hashnode/image/upload/v1744293345646/e523a2b9-73a6-4ecf-9df8-99e03b457ad1.png)

:::

When you’re done, your repository should look like [this (<VPIcon icon="iconfont icon-github"/>`chidiadi01/StaticPage-Final`)](https://github.com/chidiadi01/StaticPage-Final).

---

## Conclusion

In this article, you learned about how the CI/CD process works. We also covered the basic concepts of GitHub Actions. Finally, we created an example CI/CD pipeline with GitHub Actions. If you enjoyed this article, share it with others. You can also reach me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu) or [X (<VPIcon icon="fa-brands fa-linkedin"/>`chidiadi01`)](https://x.com/chidiadi01).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate CI/CD with GitHub Actions and Streamline Your Workflow",
  "desc": "CI/CD stands for Continuous Integration and Continuous Delivery. It is a system or set of processes and methodologies that help developers quickly update codebases and deploy applications. The Continuous Integration (CI) part of CI/CD means that deve...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/automate-cicd-with-github-actions-streamline-workflow.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
