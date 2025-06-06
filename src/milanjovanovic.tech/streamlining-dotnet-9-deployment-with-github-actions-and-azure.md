---
lang: en-US
title: "Streamlining .NET 9 Deployment With GitHub Actions and Azure"
description: "Article(s) > Streamlining .NET 9 Deployment With GitHub Actions and Azure"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Github Actions
  - Microsoft
  - Azure
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - github
  - github-actions
  - microsoft
  - azure
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Streamlining .NET 9 Deployment With GitHub Actions and Azure"
    - property: og:description
      content: "Streamlining .NET 9 Deployment With GitHub Actions and Azure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/streamlining-dotnet-9-deployment-with-github-actions-and-azure.html
prev: /devops/github/articles/README.md
date: 2025-03-15
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_133.png
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
  "title": "Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Streamlining .NET 9 Deployment With GitHub Actions and Azure"
  desc="Build a robust, automated CI/CD pipeline for .NET 9 applications using GitHub Actions and Azure App Service to transform deployments from stressful events into reliable, repeatable processes."
  url="https://milanjovanovic.tech/blog/streamlining-dotnet-9-deployment-with-github-actions-and-azure"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_133.png"/>

I remember the days of deploying .NET applications by hand: publishing locally, copying files to servers, running scripts, and crossing my fingers that nothing would break. It was stressful, time-consuming, and honestly, a bit scary.

But those days are over.

After implementing [<FontIcon icon="fa-brands fa-wikipedia-w"/>CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipelines for dozens of projects, I've seen firsthand how automation transforms the deployment process from a dreaded chore into a reliable, even boring, part of development.

And boring deployments are good deployments.

In this article, I'll walk you through setting up a robust CI/CD pipeline for .NET 9 applications using [<FontIcon icon="iconfont icon-github"/>GitHub Actions](https://github.com/features/actions) and [<FontIcon icon="iconfont icon-microsoftazure"/>Azure App Service](https://azure.microsoft.com/en-us/products/app-service). I'll cover:

- What CI/CD is and why it matters for .NET developers
- A complete workflow that builds, tests, and deploys your application
- How to extend your pipeline with database migrations, code coverage, and more
- Practical tips I've learned from real-world deployments

Whether you're tired of manual deployments or looking to improve your existing automation, this guide will help you build a robust CI/CD pipeline that you can easily extend to fit your needs.

---

## What is CI/CD and Why Should You Care?

CI/CD stands for **Continuous Integration** and **Continuous Delivery/Deployment**.

In simple terms:

- **Continuous Integration (CI)** means frequently merging code changes and running automated tests to catch issues early
- **Continuous Delivery (CD)** means getting those changes to production-ready environments quickly and safely
- **Continuous Deployment (CD)** is an extension of Continuous Delivery where every change that passes automated tests is deployed to production automatically

The main benefits I've seen:

1. **Faster feedback**: Find bugs within minutes instead of days
2. **More stable releases**: Small, incremental changes are easier to fix
3. **Time savings**: Let automation handle repetitive tasks while you focus on writing code
4. **Consistent deployment**: No more "it works on my machine" problems

---

## My GitHub Actions Workflow for .NET 9

Here's the workflow I use to deploy a simple time service API to Azure App Service:

```yaml :collapsed-lines title=".github/workflows/time.yaml"
# Name of the workflow as it appears in GitHub Actions UI
name: Time Service CI

# Define when this workflow will run
on:
  workflow_dispatch: # Allow manual triggering from GitHub UI
  push:
    branches:
      - main # Run automatically when code is pushed to main branch

# Environment variables used throughout the workflow
env:
  AZURE_WEBAPP_NAME: time-service
  AZURE_WEBAPP_PACKAGE_PATH: './Time.Api/publish'
  DOTNET_VERSION: '9.x'
  SOLUTION_PATH: 'Time.Api.sln'
  API_PROJECT_PATH: 'Time.Api'
  PUBLISH_DIR: './publish'

# Define the separate jobs that make up this workflow
jobs:
  # First job: build and test the application
  build-and-test:
    name: Build and Test
    runs-on: ubuntu-latest # Use Ubuntu runner for this job

    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Restore
        run: dotnet restore ${{ env.SOLUTION_PATH }}

      - name: Build
      run: dotnet build ${{ env.SOLUTION_PATH }}
        --configuration Release
        --no-restore

    - name: Test
      run: dotnet test ${{ env.SOLUTION_PATH }}
        --configuration Release
        --no-restore
        --no-build
        --verbosity normal


    - name: Publish
      run: dotnet publish ${{ env.API_PROJECT_PATH }}
        --configuration Release
        --no-restore
        --no-build
        --property:PublishDir=${{ env.PUBLISH_DIR }}

    # Store the published output as an artifact for later jobs
    - name: Publish Artifacts
      uses: actions/upload-artifact@v4
      with:
        name: webapp  # Name of the artifact
        path: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

  # Second job: deploy the application to Azure
  deploy:
    name: Deploy to Azure
    runs-on: ubuntu-latest
    needs: [build-and-test] # This job depends on the build-and-test job

    steps:
      # Retrieve the artifacts from the build job
      - name: Download artifact from build job
        uses: actions/download-artifact@v4
        with:
          name: webapp
          path: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

      # Deploy to Azure App Service using publish profile credentials
      - name: Deploy
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          # Authentication credentials stored as a secret
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: '${{ env.AZURE_WEBAPP_PACKAGE_PATH }}'
```

This workflow does two main things: it builds and tests the code and then deploys it to Azure.

The first job checks out our repository, sets up .NET 9, and runs through a standard build process: restore packages, build the solution, run tests, and publish the application. The detailed comments in the YAML explain each step. Once everything passes, it packages the application as an artifact for the next job.

The second job takes that artifact and deploys it to Azure App Service using a publish profile. I store the publish profile as a [<FontIcon icon="iconfont icon-github"/>GitHub secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions) for security. The `needs: [build-and-test]` line ensures deployment only happens if all tests pass, which protects our production environment from broken code.

![An example of what a workflow run looks like from the GitHub UI.](https://milanjovanovic.tech/blogs/mnw_133/ci_cd_pipeline.png?imwidth=3840)

Here's an example of what a workflow run looks like from the GitHub UI.

---

## Extending Your CI/CD Pipeline

While the basic workflow gets your application deployed, most real-world projects need more sophisticated pipelines. As your project grows, so should your CI/CD process. Extensions to your pipeline could help catch issues earlier, ensure quality standards, and provide better visibility into your development process.

Here are some valuable additions to consider:

### 1. Running Database Migrations

Database schema changes can be tricky to coordinate with code deployments. There are several approaches to handling this:

**Using EF Core Migration Bundles**:

```yaml
- name: Create migration bundle
  run: dotnet ef migrations bundle --project ${{ env.DATA_PROJECT }} --output ${{ env.MIGRATIONS_BUNDLE }}

- name: Apply migrations
  run: ${{ env.MIGRATIONS_BUNDLE }}
```

[**Migration bundles**](/milanjovanovic.tech/efcore-migrations-a-detailed-guide.md) (introduced in EF Core 6.0) package your migrations into a standalone executable, making them easier to run in deployment pipelines.

**Adding Manual Review for Migrations**:

```yaml
deploy-database:
  name: Deploy Database Changes
  environment: production
  runs-on: ubuntu-latest
  needs: [build-and-test]
```

This approach adds an environment with protection rules, requiring a DBA to review and approve migration scripts before they run. This is safer for production databases with valuable data.

::: tabs

@tab:active Pros

- No manual migration steps
- Schema and code changes deploy together
- Database changes are versioned with code

@tab Cons

- Failed migrations can be hard to roll back
- Might need extra handling for production data
- Requires secure database credentials in CI

:::

To minimize risks, I test migrations in a staging environment first and always back up production databases before deployment.

### 2. Code Coverage Reports

I like knowing how much of my code is covered by tests. Here's an example of how to generate and publish code coverage reports to [<FontIcon icon="fas fa-globe"/>Codecov](https://about.codecov.io/):

```yaml
- name: Generate coverage report
  run: dotnet test ${{ env.SOLUTION_PATH }} /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura

- name: Publish coverage report
  uses: codecov/codecov-action@v5
  with:
    files: ./**/coverage.cobertura.xml
    fail_ci_if_error: true
    token: ${{ secrets.CODECOV_TOKEN }}
```

Adding minimum coverage requirements prevents drops in test coverage and encourages the team to maintain quality standards. You can also configure it to fail builds when coverage falls below a threshold.

### 3. Multi-Environment Deployment

For larger projects, deploying to multiple environments with approval gates provides better control:

```yaml
deploy-staging:
  name: Deploy to Staging
  environment: staging
  runs-on: ubuntu-latest
  needs: [build-and-test]
  steps:
    # Deployment steps...

deploy-production:
  name: Deploy to Production
  environment: production
  runs-on: ubuntu-latest
  needs: [deploy-staging]
  steps:
    # Deployment steps...
```

Adding protection rules to your production environment creates checkpoints where team members can verify changes before they reach users.

Here's an example of some GitHub Environment protection rules:

- **Required reviewers**: Specify team members who must approve deployments
- **Wait timers**: Add a delay before deployments to give time for review
- **Deployment branches**: Restrict which branches can deploy to production

These guardrails are especially important for critical environments where downtime can be costly.

---

## Final Thoughts

A good CI/CD pipeline evolves with your project. Start simple, focus on automating the most painful manual tasks first, then gradually add more features as needed.

The initial setup takes time, but the long-term benefits are huge. My team now deploys multiple times per day instead of once every few weeks, with fewer bugs reaching production.

If you want to learn more about building robust APIs that complement your CI/CD process, check out my [**Pragmatic REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md) course. It covers designing, implementing, and deploying production-ready APIs with best practices that work perfectly with the deployment pipeline we've discussed here.

What's your CI/CD setup like? I'd love to hear how you've customized your workflows for .NET applications.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Streamlining .NET 9 Deployment With GitHub Actions and Azure",
  "desc": "Build a robust, automated CI/CD pipeline for .NET 9 applications using GitHub Actions and Azure App Service to transform deployments from stressful events into reliable, repeatable processes.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/streamlining-dotnet-9-deployment-with-github-actions-and-azure.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
