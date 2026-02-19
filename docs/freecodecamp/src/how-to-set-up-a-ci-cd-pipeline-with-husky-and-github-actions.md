---
lang: en-US
title: "How to Set Up a CI/CD Pipeline with Husky and GitHub Actions"
description: "Article(s) > How to Set Up a CI/CD Pipeline with Husky and GitHub Actions"
icon: iconfont icon-github
category: 
  - DevOps
  - Github
  - Node.js
  - Next.js
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - devops
  - microsoft
  - github
  - github-action
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up a CI/CD Pipeline with Husky and GitHub Actions"
    - property: og:description
      content: "How to Set Up a CI/CD Pipeline with Husky and GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-a-ci-cd-pipeline-with-husky-and-github-actions.html
prev: /devops/github/articles/README.md
date: 2024-07-16
isOriginal: false
author:
  - name: Viviana Yanez
    url: https://freecodecamp.org/news/author/vivianay/
cover: https://freecodecamp.org/news/content/images/2024/07/how-to-set-a-cicd-pipeline-1.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up a CI/CD Pipeline with Husky and GitHub Actions"
  desc="CI/CD is a core practice in the modern software development ecosystem. It helps agile teams deliver high-quality software in short release cycles. In this tutorial, you'll learn what CI/CD is, and I'll help you set up a CI/CD pipeline using Husky and..."
  url="https://freecodecamp.org/news/how-to-set-up-a-ci-cd-pipeline-with-husky-and-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/how-to-set-a-cicd-pipeline-1.jpg"/>

CI/CD is a core practice in the modern software development ecosystem. It helps agile teams deliver high-quality software in short release cycles.

In this tutorial, you'll learn what CI/CD is, and I'll help you set up a CI/CD pipeline using Husky and GitHub Actions in a Next.js application.

This tutorial assumes that you already have knowledge of React and Next.js or other modern JavaScript frameworks. You will need also a GitHub account, and basic knowledge of Git will be strongly beneficial.

If you already have a working web app that is not built with Next.js, you might still find this article useful. All the concepts and most of the configurations will work with little adaptation in apps created with other frameworks.

---

## What is CI/CD?

Continuous Integration/Continuous Delivery or Continuous Deployment (CI/CD) is a practice that involves automating the process of building, testing, and deploying software.

Its main benefit is speeding up the entire development process. It also increases productivity by ensuring smooth code integration, standards, and security best practices adoption. It also helps produce a shorter feedback cycle with early issue detection, among other advantages explained below.

CI/CD is an essential tool in today’s software development practices, enabling teams to deliver high-quality software quickly, efficiently, and reliably.

Let’s learn more about it in detail.

### What is CI?

**Continuous Integration** is a software practice that means that developers in a team merge code changes into a central repository multiple times a day.

Instead of having independent dev environments and merging at a specific time, developers frequently integrate their changes to an application into a shared branch or “trunk”.

### What is CD?

The CD in CI/CD usually refers to **Continuous Delivery**. It's a practice that, on top of CI, automates the software integration, testing, and release process. The automation stops just before deploying to production, where a human-controlled step is needed.

But CD can also refer to **Continuous Deployment**, which adds automation to the step of releasing software to a production environment.

Even though CD usually refers to Continuous Delivery, both terms are sometimes used interchangeably. The difference between them is the amount of automation implemented in a project.

### What is a CI/CD pipeline and what are its benefits?

When put together, these two practices create a CI/CD pipeline. Adding CI/CD to your project brings the following benefits:

- Faster development: reduces the time required to deliver new features thanks to automating the build, test and deploy.
- Enhanced Collaboration: encourages frequent code integrations and reduces integration conflicts.
- Improved Code Quality: enforces the adoption of coding standards and best practices throughout the codebase.
- Early Detection of Issues: makes the feedback cycle smaller, as issues can be caught in advance.
- Increased Productivity: prevents developers from needing to work on repetitive tasks.

These are some of the reasons why CI/CD is a core practice in modern software development and why it is such an important topic to learn about. The following steps will guide you through the process of setting up a CI/CD pipeline for your project.

---

## How to Set Up a CI/CD Pipeline

### Step 1: Set Up a Next.js App

If you already have a working web app, you can skip this and go directly to the first step.

Otherwise, let's set up a basic Next.js app with the default ESLint configuration and Vitest, and push it to a GitHub repo.

#### Create a Next.js app

Navigate into the directory where you want to create the new project folder, then run the following command in your terminal:

```sh
npx create-next-app@latest
```

When prompted with the installation options, make sure you choose to use ESLint in your project. This will ensure that ESLint is properly installed and a `lint` script is created in the package.json.

Wait for `create-next-app` to create the folder and install the project dependencies. Once it's done, navigate into the new folder and start the dev server:

```sh
cd <your-project-name>
npm run dev
```

#### Set up Vitest

Let's add Vitest to the project and add some automated tests to run in the CI/CD pipeline.

First, install `vitest` and the dev dependencies needed:

```sh
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

Create a <VPIcon icon="fa-brands fa-js"/>`vitest.config.js` file (or <VPIcon icon="iconfont icon-typescript"/>`vitest.config.ts` if using TypeScript) with the following content:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

And finally, add the `test` script to the <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "test": "vitest --no-watch"
}
```

Note that I added the no-watch option to the test script. This prevents Vitest from starting in the default watch mode in dev environment.

Now, you can add tests for your project. If you don't know how to start, you can check out [<VPIcon icon="iconfont icon-nextjs"/>this guide](https://nextjs.org/docs/app/building-your-application/testing/vitest#creating-your-first-vitest-unit-test) for some examples.

#### Push the project to GitHub

Log in into your GitHub account and create new repository. Once your are done, you can connect the local repo with the one you just created, adding this repo as the remote. Then push the changes:

```sh
git add .
git commit -m "first commit"
git remote add origin git@github.com:<your-user-name>/<your-repo-name>.git
git push origin main
```

You should be now ready to continue to the interesting part of this tutorial. :)

### Step 2: Set a Git Hook

A Git hook is a script that allows you to run some event within the Git lifecycle. In this case we will be using Husky.

[<VPIcon icon="fas fa-globe"/>Husky](https://typicode.github.io/husky/) is a pre-commit hook for Git that allows you maintain code quality by executing some task upon committing or pushing. You can run various checks before making a commit with new changes, such as linting the code and running automated tests.

By implementing these checks, you can avoid wasting time and resources by catching issues in advance before triggering the GitHub Actions workflow.

Let’s start by adding Husky to the project with the following command:

```sh
npm i --save-dev husky
```

Next, let’s set up the project using the Husky init command:

```sh
npx husky init
```

After running this command, you will notice that a pre-commit file was created under <VPIcon icon="fas fa-folder-open"/>`./husky`. Also, a `“prepare”` script was added in the package.json.

If you open the pre-commit file inside <VPIcon icon="fas fa-folder-open"/>`./husky`, you will find the following content:

```sh
npm test
```

As its name suggests, this file contains the code that executes before completing a commit. With everything set up as described, tests will run each time you attempt to create a new commit and new commits will be added only if all tests pass.

#### Adding more git hooks

Now, let’s change the content in the pre-commit file so the code linter also executes before creating a new commit.

You can open your preferred code editor and add `npm run lint` (or the corresponding ESLint script if you’re not using Next.js) in a new line in the pre-commit file. Alternatively, you can simply run the following command from the root folder of your project:

```sh
echo "npm run lint" >> ./.husky/pre-commit
```

Now, each time you attempt to make a new commit, the tests and the linter will run, and the commit will be created – only if all tests are passing and no errors are found in the code.

#### Setting up lint-staged

You can go one step further and include a tool called [lint-staged (<VPIcon icon="iconfont icon-github"/>`lint-staged/lint-staged`)](https://github.com/lint-staged/lint-staged). This tool will be especially useful if your project is large, because it allows you to run the Git hooks only for staged files. In this case, it will lint only the files that will be committed, avoiding wasting time by linting the entire project.

To start using lint-staged, let's add it as a dev dependency to the project:

```sh
npm i --save-dev lint-staged
```

There are [different ways to configure lint-staged (<VPIcon icon="iconfont icon-github"/>`lint-staged/lint-staged?tab=readme-ov-file#configuration`)](https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration) and you can choose the one that best suits your needs. I will add a `lint-staged` script and object to the package.json of my project with the following content:

```json title="package.json"
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest --no-watch",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js, jsx,ts,tsx}": [
        "eslint --fix"
        ]
  },
}
```

Now, I can replace `npm run lint` with `npm run lint-staged` in the pre-commit file.

Each time I make a new commit, any `js`, `jsx`, `ts`, or `tsx` staged files will be linted and, if there are fixable issues, they will be automatically fixed.

Let's test that the pre-commit hook is working as expected by:

1. Running `git add .`
2. Running `git commit`
3. Waiting for the linter to run and entering a commit message when prompted
4. Running `git log` to confirm that the commit was properly created

If you want, you can add more checks to your pre-commit file to fit your project's needs. For example, you could run a tool like Prettier to automatically format your code, or [<VPIcon icon="fas fa-globe"/>commitlint](https://commitlint.js.org/) to lint your commit messages.

Now, let’s move on to setting up a GitHub Actions workflow for the project.

### Step 3: Create a GitHub Actions Workflow

With the first part complete, we can move on to the next step. Here, you will add a GitHub Actions workflow to ensure the smooth integration of changes into the entire project.

#### GitHub Actions Basics

GitHub Actions is a CI/CD platform that allows you to automate the building, testing, and deployment of your project. It also lets you perform actions when certain activities happen in your repository, such as opening a pull request or creating an issue.

GitHub Actions are configured through workflows defined in YAML files. These workflows typically run when triggered by an event in the repository, but they can also be scheduled or run manually.

Workflows are located in the <VPIcon icon="fas fa-folder-open"/>`.github/workflows` folder and run different jobs. Each job includes a set of steps that run in order on the same runner or server. A step can be either a shell script or an action (a reusable piece of code that helps reduce repetitive code in your workflows).

Let's put all this together by creating the first workflow.

#### Creating a workflow to execute when you push to main branch

First create a <VPIcon icon="fas fa-folder-open"/>`.github/workflows/` under your project root. Then create a <VPIcon icon="iconfont icon-yaml"/>`run-test.yml` file. You will be adding content to this file to create a CI workflow.

The first line is optional and includes a name for the workflow. It will appear at the "Actions" tab in the GitHub repo:

```yaaml title=".github/workflows/run-test.yml"
name: Run linter and tests on push
```

Then, you will use the `on` key to define the event or events that will trigger the workflow run. This can be an event in your repo or a time schedule. In this case, let's set it to run each time a push to the repo happens:

```yaml title=".github/workflows/run-test.yml"
on:
  push
```

You can also set options below the `on` keyword to limit the execution of a workflow to some branch or files – for example to run only on push to main branch:

```yaml title=".github/workflows/run-test.yml"
on:
  push:
    branches:
      - main
```

Below this, you will add the `jobs` key. It groups all the jobs in the workflow, followed by the name of the first job, in this case `run-linter-and-tests`.

The lines below that define workflow properties, configuring it to run on the latest version of an Ubuntu Linux runner and grouping all the steps that run on this job.

```yaml title=".github/workflows/run-test.yml"
jobs:
  run-linter-and-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm i

      - name: Lint code
        run: npm run lint

      - name: Run tests
        run: npm test
```

As mentioned before, each step can be either a shell script or an action. You can see the difference between the first and the second step in the previous code.

The first one specifies with the `uses` keyword that will run the `actions/checkout`. This action is used to checkout the repository onto the runner so the workflow can use the repository code. The second step `Install dependencies` uses the `run` keyword to tell the job to execute the `npm i` command on the runner.

This is the complete resulting file:

```yaml title=".github/workflows/run-test.yml"
name: CI workflow
on:
  push

jobs:
  run-linter-and-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: npm install
        run: npm i

      - name: Lint code
        run: npm run lint

      - name: Run tests
        run: npm test
```

Let's commit the changes and push them to the GitHub repository.

Now each time you push to your repository, the workflow will trigger. If you click on the "Actions" tab in your GitHub repository navigation bar, you will find a list of all the runs from all your workflows and its complete logs.

!["Actions" tab in a GitHub repository navigation bar](https://freecodecamp.org/news/content/images/2024/07/Screenshot-2024-07-03-at-12.13.05-1.png)

Also, you will see that in the GitHub repository's "Code" tab, a green checkmark appears next to the last commit message. This means that workflows ran and finished successfully.

When jobs are still running, you'll see a brown dot, and a red cross when a workflow finished with an error.

![](https://freecodecamp.org/news/content/images/2024/07/Screenshot_.png)

#### Adding a second workflow to run when a PR is created

Each repository can have one or more workflows, so let's add a second workflow to run each time a PR is created. Let's run the code coverage report each time a PR is opened against the main branch of the repo.

First, create and checkout a new <VPIcon icon="fas fa-code-branch"/>`add-wf` branch:

```sh
git checkout -b add-wf
```

Then, create a new YAML file under the <VPIcon icon="fas fa-folder-open"/>`.github/workflows` directory and start adding some content on it.

First, let's add the name and when to run the workflow with the `on` keyword:

```yaml
name: Run Coverage on PR
on: pull_request
```

After that, you will use the `jobs` keyword to describe the jobs to run. Let's define the first one as `build-and-run-coverage` to run in `ubuntu-latest` runner:

```yaml
jobs:
  build-and-run-coverage:
    runs-on: ubuntu-latest
```

Now, let's add `steps` for this job:

```yaml
  steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Install dependencies
      run: npm i

    - name: Build code
      run: npm run build

    - name: Run tests and coverage
      run: npm run coverage
```

Following is the complete resulting code:

```yaml :collapsed-liens
name: Run Coverage on PR
on: pull_request

jobs:
  build-and-run-coverage:
    runs-on: ubuntu-latest

      steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm i

      - name: Build code
        run: npm run build

      - name: Run tests and coverage
        run: npm run coverage
```

Now, you can push the change to your GitHub repo:

```sh
git add .
git commit -m 'add a wf to run on opened PR'
git push origin add-wf
```

Now you can open a PR against your<VPIcon icon="fas fa-code-branch"/> `main` branch and and wait for the workflow to complete.

##### Comment coverage report in the PR

As mentioned earlier in this article, actions are reusable pieces of code that avoid repetitive code in the workflow. One cool thing about them is that there are many already written by the community that you can use in your workflows, saving lots of time.

To complete the workflow we created, let's add a new step that uses an action to report coverage results as a comment on the pull request.

First, let's modify the `permissions` keyword to ensure the workflow has the right access to content and to create comments:

```yaml
permissions:
  contents: read
  pull-requests: write
```

Then, let's use the [Vitest Coverage Report (<VPIcon icon="iconfont icon-github"/>`marketplace/actions`)](https://github.com/marketplace/actions/vitest-coverage-report) action by adding a `step` into the `build-and-run-coverage` job:

```yaml
- name: Report Coverage
  uses:  davelosert/vitest-coverage-report-action@v2
```

The final `yaml` file will look like this:

```yaml :collapsed-lines
name: Run Coverage on PR
on: pull_request

jobs:
  build-and-run-coverage:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      pull-requests: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install dependencies
        run: npm i

      - name: Build
        run: npm run build

      - name: Run test and coverage
        run: npm run coverage

      - name: Report Coverage
        uses:  davelosert/vitest-coverage-report-action@v2
```

There is one more step to ensure all works as expected. You must add the `json-summary` reporter in the Vitest configuration:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      extension: [".tsx"],
      reporter: ['text', 'json-summary', 'json'],
    },
  },
});
```

Now, make some changes in your project and add corresponding tests to check if the workflow is working as expected.

Once you push your changes to the GitHub repo, open a PR against the main branch of your project. After the workflows finish running, you should see a comment showing the coverage result:

![Coverage Report in a pull request comment](https://freecodecamp.org/news/content/images/2024/07/Screen-Shot-2024-07-12-at-19.18.05.png)

### Step 4: Deploy the Project

As a last step in this tutorial, let's deploy the project on [<VPIcon icon="iconfont icon-vercel"/>Vercel](https://vercel.com/). You will set up an automatic deployment through Git that will trigger a redeploy each time new changes are pushed or merged into the main branch.

First, log in to your Vercel account, or create one if you don't already have one. Then, in your dashboard, click on "Add New Project" and click on the "Import" button next to your repository name in the "Import Git Repository" section.

If you don't see your repository listed, it may be due to your GitHub app permissions configuration. You can manage them in your settings section in your GitHub account.

Finally, choose a name for the project in the "Configure Project" section and click on the "Deploy" button. You can now see the deploy details by clicking on the "Deployment" link.

Vercel automatic deployments ensure that the deployed project is always updated with the latest changes. They also have the benefit of [<VPIcon icon="iconfont icon-vercel"/>Preview Deployments](https://vercel.com/docs/deployments/preview-deployments), a preview URL that lets you test new features in advance of merging changes into production.

If you have followed along with the tutorial, with this step completed, you'll have completed the CD part of the CI/CD pipeline for your project. Now, you can be sure any code that is pushed to the main branch is linted and tested, and once all checks pass, it is automatically pushed to production.

---

## Conclusion

In this guide, you learned about the importance of CI/CD in today’s software development ecosystem and its main benefits. You also took your first steps in this area by creating your own CI/CD pipeline for your project, learning how to use Husky and GitHub Actions.

Now, you can keep learning more about these tools and improve your CI/CD pipeline by customizing it to better fit your project's needs.

I hope you were able to gain some new knowledge and enjoyed following along. Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up a CI/CD Pipeline with Husky and GitHub Actions",
  "desc": "CI/CD is a core practice in the modern software development ecosystem. It helps agile teams deliver high-quality software in short release cycles. In this tutorial, you'll learn what CI/CD is, and I'll help you set up a CI/CD pipeline using Husky and...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-a-ci-cd-pipeline-with-husky-and-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
