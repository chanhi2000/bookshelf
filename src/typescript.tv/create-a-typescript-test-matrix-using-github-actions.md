---
lang: en-US
title: "Create a TypeScript test matrix using GitHub Actions"
description: "Article(s) > Create a TypeScript test matrix using GitHub Actions"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Create a TypeScript test matrix using GitHub Actions"
    - property: og:description
      content: "Create a TypeScript test matrix using GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/create-a-typescript-test-matrix-using-github-actions.html
prev: /devops/github/articles/README.md
date: 2023-07-25
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Create a TypeScript test matrix using GitHub Actions"
  desc="GitHub workflows are a great way to set up a continuous integration pipeline. You can define jobs within a workflow and use GitHub's runners to execute those jobs. These runners can be hosted on GitHub's infrastructure or your own. In this tutorial, you'll learn how to use a matrix strategy to run jobs concurrently using different runner images."
  url="https://typescript.tv/best-practices/create-a-typescript-test-matrix-using-github-actions"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

GitHub workflows are a great way to set up a continuous integration pipeline. You can define jobs within a workflow and use GitHub's runners to execute those jobs. These runners can be hosted on GitHub's infrastructure or your own. In this tutorial, you'll learn how to use a matrix strategy to run jobs concurrently using different runner images.

GitHub workflows provide an excellent platform for setting up a continuous integration pipeline. Within a workflow, you can define one or more jobs. GitHub provides virtual machines, referred to as **runners**, for executing jobs in a GitHub Actions workflow. These runners can be hosted either on GitHub's infrastructure ([<VPIcon icon="iconfont icon-github"/>GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)) or your own infrastructure ([<VPIcon icon="iconfont icon-github"/>self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)).

In this tutorial, you will learn how to use a [<VPIcon icon="iconfont icon-github"/>matrix strategy](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs) to run jobs concurrently using different runner images. This approach enables you to **test your TypeScript code** across different operating systems or configurations, such as different versions of Node.js.

---

## Setting Up a Basic Workflow

Let's begin by setting up a basic workflow that runs on a single virtual machine hosted by GitHub. We'll use the latest stable Ubuntu version provided by GitHub as the runner image, and you can find more details about the available images in the [actions/runner-images (<VPIcon icon="iconfont icon-github"/>`actions/runner-images`)](https://github.com/actions/runner-images) repository.

In our workflow, we'll use the [<VPIcon icon="fa-brands fa-npm"/>`npm ci`](https://docs.npmjs.com/cli/commands/npm-ci) command, which is similar to [<VPIcon icon="fa-brands fa-npm"/>`npm install`](https://docs.npmjs.com/cli/commands/npm-install), but designed for continuous integration systems. In contrast to `npm install`, it directly installs dependencies from the <VPIcon icon="iconfont icon-json"/>`package-lock.json` file and avoids adding any missing dependencies. If you're familiar with [Yarn](https://classic.yarnpkg.com/), you might recognize this behavior from `yarn install --frozen-lockfile`.

```yml
name: 'Test'
 
on: ['pull_request', 'push']
 
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: |
          npm ci
          npm run build --if-present
          npm test
```

---

## Cross-Version Testing with Matrix Strategy

To demonstrate our TypeScript testing process, we aim to execute the same workflow across various versions of Node.js. Achieving this requires implementing a **matrix strategy**. With this approach, we can define custom keys, such as `os` and `node-version`, which can then be referenced in our [<VPIcon icon="iconfont icon-github"/>runs-on](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idruns-on) workflow syntax or used as an argument in our [Node.js setup (<VPIcon icon="iconfont icon-github"/>`actions/setup-node`)](https://github.com/actions/setup-node):

```yml
name: 'Test'
 
on: ['pull_request', 'push']
 
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest]
        node-version: [16, 18]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: |
          npm ci
          npm run build --if-present
          npm test
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create a TypeScript test matrix using GitHub Actions",
  "desc": "GitHub workflows are a great way to set up a continuous integration pipeline. You can define jobs within a workflow and use GitHub's runners to execute those jobs. These runners can be hosted on GitHub's infrastructure or your own. In this tutorial, you'll learn how to use a matrix strategy to run jobs concurrently using different runner images.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/create-a-typescript-test-matrix-using-github-actions.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
