---
lang: en-US
title: "How To Deploy To Vercel With GitHub Actions"
description: "Article(s) > How To Deploy To Vercel With GitHub Actions"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Github Actions
  - Vercel
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - githubactions
  - github-actions
  - vercel
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Deploy To Vercel With GitHub Actions"
    - property: og:description
      content: "How To Deploy To Vercel With GitHub Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-to-vercel-with-github-actions.html
prev: /devops/github/articles/README.md
date: 2025-06-11
isOriginal: false
author:
  - name: Chidiadi Anyanwu
    url : https://freecodecamp.org/news/author/chidiadi01/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749577622920/8e35a6c1-3f4f-49a3-a4fe-dba80e24eec3.png
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

```component VPCard
{
  "title": "Vercel > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vercel/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Deploy To Vercel With GitHub Actions"
  desc="Vercel is a cloud platform or Platform-as-a-Service (PaaS) designed to help frontend developers create, preview, and deploy web applications swiftly and efficiently. In this tutorial, we’ll focus on deploying a Next.js application to Vercel using Git..."
  url="https://freecodecamp.org/news/deploy-to-vercel-with-github-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1749577622920/8e35a6c1-3f4f-49a3-a4fe-dba80e24eec3.png"/>

Vercel is a cloud platform or Platform-as-a-Service (PaaS) designed to help frontend developers create, preview, and deploy web applications swiftly and efficiently. In this tutorial, we’ll focus on deploying a Next.js application to Vercel using GitHub Actions.

In a [**previous article**](/freecodecamp.org/how-to-build-a-simple-portfolio-blog-with-nextjs.md), we built a Next.js portfolio blog. Here, you’ll learn how to deploy it on Vercel with [**GitHub Actions**](/freecodecamp.org/automate-cicd-with-github-actions-streamline-workflow.md).

::: note Prerequisites

To be able to deploy your project, you should have a GitHub repository of the project (you can still follow along if you already have a Next.js project), and a Vercel account. [Here is the GitHub repository that we’ll be working with (<FontIcon icon="iconfont icon-github"/>`chidiadi01/simple-writer-portfolio`)](https://github.com/chidiadi01/simple-writer-portfolio). You can clone it to follow along.

:::

---

## How to Deploy Your Next App

### Create Vercel Token and Add it to Your Secrets in GitHub

In your Vercel account, go to Settings, then go to Tokens.

![Vercel account settings tokens.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749036906930/1c483351-0e78-4392-a948-53921ba2916c.png)

In the Create Token section, enter a name for your token, select an expiration date and click “create”.

![Creating a vercel token](https://cdn.hashnode.com/res/hashnode/image/upload/v1749037009419/2a48b48d-31c4-4b72-a281-dd8eb689770d.png)

You should see a success message with your token. Next, go to your GitHub repository, and click on the “Settings“ tab.

![Vercel, token created success message.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749037335441/1a46fb8b-8f3c-4d44-8ad5-c7de3340ef2b.png)

In the Settings tab, go to Secrets and Variables on the sidebar, then click on Actions.

![Actions secrets in GitHub repository settings.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749037726010/5ca33111-0dbe-4e3e-bde5-91a8e518f05b.png)

You’ll see a section for adding secrets. Add a secret named `VERCEL_TOKEN`, and paste the token there.

![vercel token, project id, org id.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749037787198/53b42a96-ad79-4895-aba0-abe6d79eceb5.png)

The Vercel token is a token used to authenticate the GitHub runner. The Vercel CLI installed on the GitHub runner is going to execute the commands with your account. So, instead of it having to login, it uses the access token to verify that it was actually authorized by you to take the actions.

The Organization ID is used to tell Vercel which organization or team account the project should be created under.

The Project ID then tells Vercel the specific project you want to deploy. Just like the Organization ID, it is a unique identifier.

### Install the Vercel CLI and Login

Use the command below to install vercel CLI globally on your computer:

```sh
npm install -g vercel
```

Then [<FontIcon icon="iconfont icon-vercel"/>log into the CLI](https://vercel.com/docs/cli/login) with the following command:

```sh
vercel login
```

Use one of the options to login.

![login methods](https://cdn.hashnode.com/res/hashnode/image/upload/v1749312895981/93c13b75-83da-4da7-b5c5-17572d126ce4.png)

I used GitHub. Select one with your arrow keys, and click enter.

![login success](https://cdn.hashnode.com/res/hashnode/image/upload/v1749312974078/2f470d5a-9e73-44be-b520-5179da61f86b.png)

![vercel login](https://cdn.hashnode.com/res/hashnode/image/upload/v1749038078744/bbb5a43d-66a4-4531-a27c-12442c977568.png)

### Create a Vercel Project from Your Local Directory

Navigate to your project directory if you’re not already in it. If you have already created a project on Vercel through the web interfce, use the [<FontIcon icon="iconfont icon-vercel"/>vercel link](https://vercel.com/docs/cli/link) command to link your current directory to the Vercel project. If you don’t already have a Vercel project, just type `vercel` in the CLI and follow the prompts to setup the project.

![Create new Vercel project](https://cdn.hashnode.com/res/hashnode/image/upload/v1749314606959/f6d7a71c-edc5-48f2-81ca-4fd3a92c44da.png)

With that, Vercel will create a <FontIcon icon="fas fa-folder-open"/>`.vercel` folder in the project. Open it, and go to the <FontIcon icon="iconfont icon-json"/>`project.json` file.

![<FontIcon icon="iconfont icon-json"/>`project.json`](https://cdn.hashnode.com/res/hashnode/image/upload/v1749038798352/23d8b1b9-5bbf-43df-9444-7adf1f7a9c2f.png)

In the file, you should see your project ID and organization ID. Copy them and create secrets in your GitHub repository for each one.

![vercel token, org ID, project ID.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749037787198/53b42a96-ad79-4895-aba0-abe6d79eceb5.png)

### Create your GitHub Workflow File

At the root of your project folder, create the <FontIcon icon="fas fa-folder-open"/>`.github/workflow` folder. Then create a workflow file called <FontIcon icon="iconfont icon-yaml"/>`vercel_deploy.yml`.

![f3c3a4ca-5d19-4866-a69d-9f4d3a760d8f](https://cdn.hashnode.com/res/hashnode/image/upload/v1749039652451/f3c3a4ca-5d19-4866-a69d-9f4d3a760d8f.png)

In the file, write this:

```yaml :collapsed-lines title=".github/workflow/vercel_deploy.yml"
name: Vercel Production Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID:s ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
    paths:
      - '01-simple-blog/**'  

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: 01-simple-blog
    steps:
      - uses: actions/checkout@v2

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        continue-on-error: true

      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

This is the workflow file for my [<FontIcon icon="iconfont icon-github"/>`chidiadi01/simple-writer-portfolio`](https://github.com/chidiadi01/simple-writer-portfolio/blob/main/.github/workflows/vercel_deploy.yml) project.

First, we have the environment variables:

```yaml title=".github/workflow/vercel_deploy.yml"
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
# Other code
```

Then we have the trigger. This triggers when I push to the main branch, affecting files in the `01-simple-blog` subdirectory.

```yaml title=".github/workflow/vercel_deploy.yml"
# Previous code
on:
  push:
    branches:
      - main
    paths:
      - '01-simple-blog/**'  
# Other code
```

Then we have the job definition. Here, I defined a job “Deploy-Production” that runs on Ubuntu. By default, all commands there will run in the `01-simple-blog` directory, which is equivalent to running `cd 01-simple-blog` from the root before running commands on the shell. I did this because the Next.js project is in that directory, where the <FontIcon icon="iconfont icon-json"/>`package.json` is located.

```yaml title=".github/workflow/vercel_deploy.yml"
# Previous code
jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: 01-simple-blog
# Other code
```

Then the steps involved:

```yaml title=".github/workflow/vercel_deploy.yml"
# Previous code
 steps:
      - uses: actions/checkout@v2

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        continue-on-error: true

      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

With these steps, Vercel is first installed on the GitHub runner. Then the vercel environment information is pulled. The project is built with `vercel build`, and the pre-built artifacts are then pushed to Vercel.

### Push to GitHub and watch your code deploy

Stage your changes, if any:

```sh
git add .
```

Commit the changes:

```sh
git commit -m "Added GitHub Actions workflow"
```

And push:

```sh
git push origin
```

Now, go to your repository online, and check the deployment.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749042451313/3fa5a9a8-c14b-4f55-9e04-c51310500c3f.png)

![Workflow run logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1749042384631/d941710c-697d-46b8-a106-30f6ac3cedc3.png)

---

## Conclusion

With your basic GitHub workflow in place, you can now make changes to your code, push to GitHub, and have it deploy automatically. Though Vercel allows you to connect your repository directly, this method provides you with more flexibility and customizability. If you enjoyed this article, share it with others. You can also reach me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`chidiadi-anyanwu`)](https://linkedin.com/in/chidiadi-anyanwu) or [X (<FontIcon icon="fa-brands fa-x-twitter"/>`chidiadi01`)](https://x.com/chidiadi01).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Deploy To Vercel With GitHub Actions",
  "desc": "Vercel is a cloud platform or Platform-as-a-Service (PaaS) designed to help frontend developers create, preview, and deploy web applications swiftly and efficiently. In this tutorial, we’ll focus on deploying a Next.js application to Vercel using Git...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-to-vercel-with-github-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
