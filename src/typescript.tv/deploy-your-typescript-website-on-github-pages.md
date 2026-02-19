---
lang: en-US
title: "Deploy your TypeScript Website on GitHub Pages"
description: "Article(s) > Deploy your TypeScript Website on GitHub Pages"
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
  - gtihub
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Deploy your TypeScript Website on GitHub Pages"
    - property: og:description
      content: "Deploy your TypeScript Website on GitHub Pages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/deploy-your-typescript-website-on-github-pages.html
prev: /devops/github/articles/README.md
date: 2025-10-27
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
  name="Deploy your TypeScript Website on GitHub Pages"
  desc="Learn how to automatically deploy your TypeScript website to GitHub Pages using GitHub Actions. This step-by-step guide shows you how to set up a CI/CD pipeline that builds and deploys your site whenever you push to the main branch."
  url="https://typescript.tv/hands-on/deploy-your-typescript-website-on-github-pages"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to automatically deploy your TypeScript website to GitHub Pages using GitHub Actions. This step-by-step guide shows you how to set up a CI/CD pipeline that builds and deploys your site whenever you push to the main branch.

GitHub Pages offers free hosting for static websites, making it an excellent choice for documentation sites, portfolios, and project pages. Combined with **GitHub Actions**, you can automate your TypeScript website deployment so that every push to your main branch triggers a fresh build and deployment.

In this guide, you'll learn how to set up a GitHub Actions workflow that automatically builds your TypeScript project and deploys it to GitHub Pages.

::: note Prerequisites

Before setting up automated deployment, you need a TypeScript project with a build script configured in <VPIcon icon="iconfont icon-json"/>`package.json`, a GitHub repository for your project, and GitHub Pages enabled in your repository settings.

:::

---

## Enabling GitHub Pages

Before creating the workflow, you need to enable GitHub Pages in your repository. Navigate to your repository on GitHub and click on **Settings**. In the left sidebar, find and click on **Pages**. Under "Build and deployment", you'll see a **Source** dropdown menu. Select **GitHub Actions** from this dropdown. This configuration tells GitHub to use GitHub Actions workflows for deployments instead of deploying from a branch directly.

---

## Creating the Deployment Workflow

Create a new file in your repository at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`deploy.yml` with the following content:

```yaml :collapsed-lines title=".github/workflows/deploy.yml"
name: 'Deploy Website'
 
# Trigger Configuration
on:
  push:
    branches: ['main']
 
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
 
jobs:
  # Build Job
  build:
    name: 'Build'
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout Code'
        uses: actions/checkout@v5
      - name: 'Setup Node'
        uses: actions/setup-node@v6
        with:
          node-version: '22'
      - name: 'Build Website'
        run: npm ci && npm run build
      - name: 'Upload artifact'
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./doc
  # Deploy Job
  deploy:
    name: 'Deploy'
    needs: build
    permissions:
      pages: write
      id-token: write
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 'Deploy to GitHub Pages'
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Understanding the Workflow

Let's break down what each part of this workflow does:

### Trigger Configuration

```yaml
on:
  push:
    branches: ['main']
```

This configuration triggers the workflow automatically whenever code is pushed to the <VPIcon icon="fas fa-code-branch"/>`main` branch. You can modify this to use a different branch like `production` or `gh-pages` if needed.

### Build Job

The build job handles compiling your TypeScript code and preparing it for deployment:

```yaml
build:
  name: 'Build'
  runs-on: ubuntu-latest
  steps:
    - name: 'Checkout Code'
      uses: actions/checkout@v5
    - name: 'Setup Node'
      uses: actions/setup-node@v6
      with:
        node-version: '22'
    - name: 'Build Website'
      run: npm ci && npm run build
    - name: 'Upload artifact'
      uses: actions/upload-pages-artifact@v4
      with:
        path: ./doc
```

The workflow starts by checking out your repository code to the runner, then sets up Node.js version 22 (adjust this to match your project requirements or reference a [node-version-file (<VPIcon icon="iconfont icon-github"/>`actions/setup-node`)](https://github.com/actions/setup-node/tree/v6.0.0?tab=readme-ov-file#usage)).

Next, it runs `npm ci` for a clean install followed by `npm run build` to compile your TypeScript code. Finally, it packages the build output from the <VPIcon icon="fas fa-folder-open"/>`./doc` directory as a deployment artifact.

Make sure to update the `path: ./doc` to match your project's build output directory. Common alternatives include <VPIcon icon="fas fa-folder-open"/>`./dist`, <VPIcon icon="fas fa-folder-open"/>`./build`, or <VPIcon icon="fas fa-folder-open"/>`./public`.

### Deploy Job

The deploy job takes the build artifact and publishes it to GitHub Pages:

```yaml
deploy:
  name: 'Deploy'
  needs: build
  permissions:
    pages: write
    id-token: write
  runs-on: ubuntu-latest
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  steps:
    - name: 'Deploy to GitHub Pages'
      id: deployment
      uses: actions/deploy-pages@v4
```

The deploy job includes several important configurations. The `needs: build` directive ensures the deploy job only runs after the build job completes successfully.

The `permissions` section is crucial for GitHub Pages deployments. It grants the workflow two specific permissions: `pages: write` allows the workflow to deploy content to GitHub Pages, while `id-token: write` enables the workflow to request an OpenID Connect (OIDC) token for secure authentication with GitHub's deployment service. Without these permissions, the deployment step would fail with authorization errors.

The `environment` configuration associates the deployment with the `github-pages` environment, which enables deployment protection rules and displays the live URL.

---

## Customizing the Build Directory

If your build output goes to a different directory, update the `path` in the upload step. For example:

```yaml{4}
- name: 'Upload artifact'
  uses: actions/upload-pages-artifact@v4
  with:
    path: ./dist
```

Different frameworks use different build output directories. Astro and Vite typically output to <VPIcon icon="fas fa-folder-open"/>`./dist`, Next.js uses <VPIcon icon="fas fa-folder-open"/>`./out` when configured for static export, and Create React App outputs to <VPIcon icon="fas fa-folder-open"/>`./build`. For custom TypeScript projects, check your <VPIcon icon="iconfont icon-json"/>`tsconfig.json` or build script to determine the correct output directory.

---

## Testing the Workflow

Once you've committed the workflow file, push your changes to the <VPIcon icon="fas fa-code-branch"/>`main` branch and navigate to the **Actions** tab in your GitHub repository. You'll see the "Deploy Website" workflow running. After successful completion, your site will be live at `https://<username>.github.io/<repository>/`. If the workflow fails, click on the failed run to see detailed logs and identify the issue.

---

## Adding a Build Badge

You can add a status badge to your <VPIcon icon="fa-brands fa-markdown"/>`README.md` to show the deployment status:

```md
![Deploy Website](https://github.com/<username>/<repository>/actions/workflows/deploy.yml/badge.svg)
```

This badge will display whether your latest deployment succeeded or failed, giving visitors confidence in your site's status.

---

## Best Practices

To maintain a robust deployment pipeline, consider implementing dependency caching to speed up your builds. You can do this by adding a `cache: 'npm'` configuration to the Setup Node step:

```yaml{6}
- name: 'Setup Node'
  uses: actions/setup-node@v6
  with:
    node-version: '22'
    cache: 'npm'
```

Always pin action versions to specific releases (like `@v5`) instead of using `@latest` to ensure reproducible builds. Additionally, you can add a test job that runs before the build job to catch errors early:

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - name: 'Checkout Code'
      uses: actions/checkout@v5
    - name: 'Setup Node'
      uses: actions/setup-node@v6
      with:
        # Reads Node.js version from .nvmrc file
        node-version-file: '.nvmrc'
    - name: 'Install dependencies'
      run: npm ci
    - name: 'Test project'
      run: npm test
 
build:
  needs: test
  # ... rest of build job
```

For projects that require API keys or other sensitive values, store them in GitHub Secrets and reference them in your workflow to keep credentials secure.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Deploy your TypeScript Website on GitHub Pages",
  "desc": "Learn how to automatically deploy your TypeScript website to GitHub Pages using GitHub Actions. This step-by-step guide shows you how to set up a CI/CD pipeline that builds and deploys your site whenever you push to the main branch.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/deploy-your-typescript-website-on-github-pages.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
