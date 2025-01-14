---
lang: en-US
title: "Learn to Use GitHub Actions: a Step-by-Step Guide"
description: "Article(s) > Learn to Use GitHub Actions: a Step-by-Step Guide"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
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
      content: "Article(s) > Learn to Use GitHub Actions: a Step-by-Step Guide"
    - property: og:description
      content: "Learn to Use GitHub Actions: a Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-to-use-github-actions-step-by-step-guide.html
prev: /programming/git/articles/README.md
date: 2025-01-16
isOriginal: false
author:
  - name: Rajdeep Singh
    url : https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736973439529/e0445f1c-62df-441f-a335-96c468a373da.png
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
  name="Learn to Use GitHub Actions: a Step-by-Step Guide"
  desc="GitHub Actions are one of the most helpful features of GitHub. Actions help you automate, build, test, and deploy your app from your GitHub. They also help you perform code reviews and tests, manage branches, triage issues, and more. In simple terms,..."
  url="https://freecodecamp.org/news/learn-to-use-github-actions-step-by-step-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1736973439529/e0445f1c-62df-441f-a335-96c468a373da.png"/>

[<FontIcon icon="iconfont icon-github-actions"/>GitHub Actions](https://docs.github.com/en/actions) are one of the most helpful features of GitHub. Actions help you automate, build, test, and deploy your app from your GitHub. They also help you perform code reviews and tests, manage branches, triage issues, and more.

In simple terms, the GitHub workflow creates an environment (virtual machine-based on the **runner**) to test, build, and deploy your code into the cloud based on the action that you describe in the GitHub Action file.

This tutorial teaches you how to add a GitHub Action, providing an example and step-by-step guidance. It is suitable for both beginners and intermediate developers.

::: note Prerequisites

To get the most out of this article, you should have at least a basic knowledge of how to use GitHub and YAML. If you don't know GitHub fundamentals, check out [**this in-depth tutorial on Git and GitHub**](/freecodecamp.org/guide-to-git-github-for-beginners-and-experienced-devs.md). And [**here’s an introduction to YAML**](/freecodecamp.org/what-is-yaml-the-yml-file-format.md).

:::

You’ll also need to understand the main concepts behind **events**, **workflows**, **jobs**, and **runners** and why they’re important when creating a GitHub Action.

These are the key ingredients of GitHub actions, so we’ll go through them one by one before diving into the primary part of the tutorial.

---

## Key GitHub Actions Concepts

### Workflows

A workflow is a configurable automated process that runs one or more jobs. It is created with a YAML file in your repository and runs when an event triggers it. Workflows can also be triggered manually or on a defined schedule.

Workflows are defined in the <FontIcon icon="fas fa-folder-open"/>`.github/workflows` directory in a repository. In the repository, you can create multiple workflows that perform different tasks, such as:

1. Building and testing pull requests
2. Deploying your application on the cloud
3. Running a test on every pull request

### Events

An event is a specific activity in a repository that triggers or runs a workflow in your GitHub repository. For example, when you push code to the repository, it triggers the `push` event. The same happens when you create a new issue – it triggers the `issues` event. And when somebody makes a pull request in your repository, it triggers the `pull_request` event.

![Describing the different event types in GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1736342712858/866f61a7-4750-45bf-82ea-d4e9535069a4.png)

These are some common GitHub Action events:

1. Push
2. pull_request
3. release
4. label
5. issues
6. milestone
7. label

The `push`, `release`, and `pull_request` events are the most common events. To read more about events, you can [<FontIcon icon="iconfont icon-github"/>check out the GitHub documentation](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#about-events-that-trigger-workflows).

It’s a good idea to specify the event type in a GitHub Action. For example, specifying the `pull_request` event will trigger the action whenever any user creates a pull request in the GitHub repository.

```yaml title=".github/workflows/demo.yml"
on:
  issues:
    types: [opened, edited, milestoned]

  pull_request:
    types:
      - opened
    branches:
      - 'releases/**'
```

This is helpful because, if you don’t declare a specific event activity type in your event type, it can lead to unnecessary resources getting used. The GitHub Action will be triggered with every new pull request – so it’s best to define which type of event you’re using.

### Jobs

GitHub Action jobs run in parallel by default. A GitHub Action workflow runs one or more jobs, each containing a set of steps that execute commands or actions. Here’s an example:

```yaml title=".github/workflows/demo.yml"
name: Demo Workflows

on:
   push:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:

jobs:
```

You can set one job to depend on (an)other job(s). If jobs don’t have dependencies, they’ll run in parallel. When one job depends on another, it will wait for that job to finish before it starts.

```yaml :collapsed-lines title=".github/workflows/demo.yml"
jobs:
  build:
    name: Build
    needs: [ Development ]
    steps:
      - name: Build and deploy on Cloud
  dev:
    name: Development
    steps:
      - name: Run the developer

  Test:
    needs: [ build, dev ]
    name: Testing
    steps:
      - name: Testing the application
```

### Runners

**Runners** are servers that execute workflows when triggered. Each runner can handle only one job at a time. GitHub offers runners for Ubuntu Linux, Microsoft Windows, and MacOS to run your workflows.

```yaml title=".github/workflows/demo.yml"

name: Demo workflows

on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
   push:
    branches: [ "main" ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
```

To define the runners, specify the runner value in the `runs-on` option. You can provide it as a **single string** or an **array of strings**.

```yaml title=".github/workflows/demo.yml"

# String
runs-on: ubuntu-latest
# Array of string
runs-on: [ ubuntu-latest, windows-latest, macos-latest ]
```

Now that you’re familiar with the key elements of GitHub Actions and how they work, let’s see how to use Actions in practice.

---

## How to Create a GitHub Action in Your Repository

You can create a GitHub Action in GitHub very easily. There are two ways to do it:

1. Using the Github UI
2. Locally with your IDE

Many developers use the GitHub UI to create an Action. This is a common way to create an Action. You don't need to create a `.github/workflow` folder when you use the GitHub UI. GitHub automatically creates this folder for you. On the other hand, for complex Github actions, you'll typically use your IDE.

Let’s look at each approach now.

### Create a GitHub Action Using the GitHub UI

First, go to the GitHub repository where you want to create your GitHub Action.

![GitHub repository where you want to create your action](https://cdn.hashnode.com/res/hashnode/image/upload/v1736510921442/e4b338f5-c928-4aba-953d-0df5adee0bd3.png)

To create the action, follow these steps:

#### 1. Click on the Action Tab

Click on the Action tab to create a GitHub Action. You’ll see the following page:

![Create the GitHub Action](https://cdn.hashnode.com/res/hashnode/image/upload/v1736511145120/79fc5a4a-26b9-4f41-bc7b-1c976ff47663.png)

#### 2. Select the workflow action

GitHub suggestions automatically work according to the nature of your project. Select the GitHub workflow and click on the configure button to create your action.

![Select the github workflow in github](https://cdn.hashnode.com/res/hashnode/image/upload/v1736511580215/48ed1bb6-bc25-43fd-bf3d-2ac9f945f3eb.png)

#### 3. Create the GitHub workflow

You’ll see the following page where you can edit and create your action. Click on the commit change button to save the action.

![Edit and create your Action in Github.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736858011259/267d62ad-f41b-449e-b0dd-dab3a9251ba1.png)

And that’s it – you’ve created your GitHub Action.

### Create a GitHub Action Locally with Your IDE

First, open your project in your current IDE, such as VS Code, Neovim, Vim, or whatever. Then, create a <FontIcon icon="fas fa-folder-open"/>`.github/workflow/`<FontIcon icon="iconfont icon-yaml"/>`name-of-workflow.yml` file in your project. Copy and paste the following code and save and push your local code into the GitHub repository.

Following the GitHub workflow action example code is printed a hello world message.

```yaml :collapsed-lines title=".github/workflows/demo.yml"

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the "main" branch
  push:
    branches: [ "main" ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v4

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!
```

I’m using the Neovim IDE to create a <FontIcon icon="fas fa-folder-open"/>`.github/workflow/`<FontIcon icon="iconfont icon-yaml"/>`demo.yml` file. It looks like this.

![Create an action locally using your IDE.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736935606919/aa187277-118a-4990-b240-684ced2f8a55.png)

---

## GitHub Actions Syntax

To create a GitHub Action, it’s important to understand the GitHub Action syntax. In this section, you’ll learn some of the most common syntax you’ll use to create your Actions.

We’ll work with this example Action and go through it part by part below:

```yaml :collapsed-lines title=".github/workflows/demo.yml"
name: Github Action Template 

on:
  pull_request:
    branches: [ "main" ]

  schedule:
    - cron:  '30 5,17 * * *'

  workflow_call:
    inputs:
      username:
        description: 'A username passed from the caller workflow'
        default: 'john-doe'
        required: false
        type: string

  permissions:
    actions: read|write|none
  # permissions : read|write|none

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:

  # This workflow contains a single job called "build"
  build:
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v4
        if: ${{ github.event_name == 'pull_request' && github.event.action == 'unassigned' }}
        shell: zsh
        name: NPM Install Package
        run: npm install
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          first_name: Github
          last_name: Action
          args: The ${{ github.event_name }} event triggered this step.
          entrypoint: /bin/echo
```

Now, let’s understand each option that you can see in this GitHub Action example workflow:

1. `name`: The name describes the workflow name.
2. `pull_request`: The pull request is part of the event type. It means somebody added a pull request in your repository and the following workflow was run.
3. `schedule`: With a schedule, you can define the time schedule in your workflows. You can schedule a workflow to run at certain tasks on specific UTC times or based on intervals after five minutes, and so on.
4. `workflow_call`: This defines the inputs and outputs for a reusable workflow.
5. `permissions`: In GitHub, certain tasks need special permissions when working with the GitHub app and GitHub API. For example, for issues, `write` permission permits a user to add a comment to an issue. For other permissions, you can check out the documentation.
6. `jobs`: The `jobs` option runs one or more jobs in your GitHub Action, each containing a set of steps that execute commands or actions.
7. `runs-on`: The `runs-on` option defines the type of machine to run the job on.
8. `steps`: The jobs contain a sequence of tasks called `steps`. Steps can run commands, set tasks, or an action in your repository.
9. `name`: The name option is used to set the name of the job, which is displayed in the GitHub UI.
10. `if`: the `if` option works similarly to an if conditional. It prevents a step from running unless a condition is met.
11. `shell`: The `shell` option allows you to define a custom shell.
12. `run`: The `run` option helps run commands in the operating system's shell. For example, `run : ls`, `run : pwd`, and so on.
13. `uses`: With the `uses` option, you can run reusable units of code or other packages. You usually use it to run a GitHub package published by another developer on the [<FontIcon icon="iconfont icon-github"/>GitHub marketplace](https://github.com/marketplace). Most package developers use JavaScript or Docker container files.
14. `with`: the `with` option accepts a value as a map with a key/value pair. It has two sub-options: `args` and an `entrypoint`. The entrypoint is used to define the entry file for Dockerfile. The args option will be passed to the container's entrypoint.

You’ll typically use this syntax to create your GitHub Actions. In the next section, you’ll learn how to use it to actually build a GitHub Action.

For advanced GitHub Action syntax, you can [<FontIcon icon="iconfont icon-github"/>check out the Github documentation](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions).

---

## GitHub Actions Examples

To better understand how GitHub Actions work, let’s build four examples of a GitHub Action workflow. These are common examples that many developers use and will teach you how GitHub Actions work.

### Node Setup

In the following GitHub Action, we’ll set up a Node.js environment for our application. Once you’ve done that, you can test and deploy your Node.js application.

```yaml title=".github/workflows/nodejs.yml"
name: Setup Node.js Env

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version:  21
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

For our example, we’re running our action on an Ubuntu machine. The GitHub action is triggered whenever you (or someone) push code into the repository. The `actions/checkout@v4` extension sets the `$GITHUB_WORKSPACE` environment variable to your working directory.

The `actions/setup-node@v4` extension sets up the Node.js environment, and the GitHub `run` option executes the Linux command.

### Deno Setup

In the following GitHub Action, we’ll set up a Deno environment for our application. You can test and analyse (using deno lint) the code for errors, stylistic issues, and so on.

```yaml title=".github/workflows/demo.yml"
name: Deno

on:
  push:
    branches: ["main"]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Setup repo
        uses: actions/checkout@v4

      - name: Setup Deno
        uses: denoland/setup-deno@v2
        with:
          deno-version: v2.1.5

      - name: Run linter
        run: deno lint

      - name: Run tests
        run: deno test -A
```

For this example, we’re running our action on an Ubuntu machine. The GitHub action is triggered whenever you (or someone) push code into the repository. The `actions/checkout@v4` extension sets the `$GITHUB_WORKSPACE` environment variable to your working directory.

The `denoland/setup-deno@v2` extension sets up the Deno environment and the GitHub `run` option executes the Linux command.

### Zip Files

In the following example, we’ll combine the <FontIcon icon="fas fa-folder-open"/>`dist` folder and the <FontIcon icon="iconfont icon-json"/>`manifest.json` file into a zip archive. Then we’ll save the zipped file as an artifact for later use or download:

```yaml
name: Zip Files

on:
  release:
    types: [published]

jobs:
  zip-files:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: vimtor/action-zip@v1.2
        with:
          files: dist/ manifest.json
          dest: build.zip

       - uses: actions/upload-artifact@v4
         with:
           name: zip file
           path: ${{ github.workspace }}/build.zip
```

For this example, we’re running our action on an Ubuntu machine. The GitHub Action is triggered whenever someone pushes code into the repository. The `actions/checkout@v4` extension sets the `$GITHUB_WORKSPACE` environment variable to your working directory.

The [<FontIcon icon="iconfont icon-github"/>`vimtor/action-zip@v1.2`](https://github.com/marketplace/actions/easy-zip-files) extension or package converts files into a zip folder. The `actions/upload-artifact@v4` package uploads artifacts during a workflow run.

![Upload the artifact in Github Action.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736875426358/0b918abf-317d-407c-a179-50693604deb7.png)

### Deploy a Static Website

The following GitHub Actions example demonstrates how to deploy an HTML website to GitHub Pages.

```yaml :collapsed-lines title=".github/workflows/demo.yml"
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:

  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:

      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload entire repository
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

For this example, we’re running our action on an Ubuntu machine. The GitHub action is triggered whenever you push code to the repository. The `actions/checkout@v4` extension sets the `$GITHUB_WORKSPACE` environment variable to your working directory.

The `actions/configure-pages@v5` package helps you configure GitHub Pages and allows you to gather metadata about your website. For more detail, refer to the [<FontIcon icon="iconfont icon-github"/>configure-pages action](https://github.com/marketplace/actions/configure-github-pages) documentation.

The `actions/upload-pages-artifact@v3` package helps you to package and upload artifacts that can be deployed to [<FontIcon icon="iconfont icon-github"/>GitHub Pages.](https://pages.github.com/)

The `actions/deploy-pages@v4` package is used to [deploy your website (<FontIcon icon="iconfont icon-github"/>`actions/deploy-pages`)](https://github.com/actions/deploy-pages) to GitHub Pages.

---

## Conclusion

Github Actions is a large topic. To more fully understand them, you can start with a basic Action example and then move on to more advanced Actions.

When you’re using Github Actions, the biggest problem is waiting for the results. For example, creating and updating the date on which the GitHub Action file pushes code into GitHub and then waiting for the GitHub Action result. It can be a time-consuming task, so you can use the act CLI tool instead of running GitHub Actions Locally on a laptop or computer.

I have published an in-depth article on freeCodeCamp on [**how to use the Act CLI tool**](/freecodecamp.org/how-to-run-github-actions-locally.md) if you want to read more about that.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn to Use GitHub Actions: a Step-by-Step Guide",
  "desc": "GitHub Actions are one of the most helpful features of GitHub. Actions help you automate, build, test, and deploy your app from your GitHub. They also help you perform code reviews and tests, manage branches, triage issues, and more. In simple terms,...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-to-use-github-actions-step-by-step-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
