---
lang: en-US
title: "6 Steps for Setting Up a New .NET Project the Right Way"
description: "Article(s) > 6 Steps for Setting Up a New .NET Project the Right Way"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 6 Steps for Setting Up a New .NET Project the Right Way"
    - property: og:description
      content: "6 Steps for Setting Up a New .NET Project the Right Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/6-steps-for-setting-up-a-new-dotnet-project-the-right-way.html
prev: /programming/cs/articles/README.md
date: 2025-10-18
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_164.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="6 Steps for Setting Up a New .NET Project the Right Way"
  desc="Learn how to properly set up a new .NET project with EditorConfig for code consistency, Directory.Build.props for centralized configuration, central package management, static code analysis, Docker Compose or .NET Aspire for local orchestration, and GitHub Actions for CI/CD."
  url="https://milanjovanovic.tech/blog/6-steps-for-setting-up-a-new-dotnet-project-the-right-way"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_164.png"/>

Starting a new .NET project is always exciting. But it's also easy to skip the groundwork that makes a project scalable and maintainable.

Before you write your first line of business logic, there are a few key setup steps that make your life (and your teammates) much easier later on.

Here's how I usually set up a new .NET project in **six simple steps**.

---

## 1. Enforce a Consistent Code Style

The first thing I add is an <VPIcon icon="fas fa-file-lines"/>`.editorconfig` file.

This file ensures everyone on your team uses the same formatting and naming conventions, reducing inconsistent indents or random naming rules.

You can create one directly in Visual Studio:

![](https://milanjovanovic.tech/blogs/mnw_164/add_editorconfig.png?imwidth=1920)

The default configuration is a great start. But you can customize it further to fit your team's preferences.

Place it at the **solution root** so all projects follow the same rules. You can still override specific settings in subfolders if needed by placing an <VPIcon icon="fas fa-file-lines"/>`.editorconfig` file there.

Here are two sample <VPIcon icon="fas fa-file-lines"/>`.editorconfig` files you can use:

<SiteInfo
  name="runtime/.editorconfig at main · dotnet/runtime"
  desc=".NET is a cross-platform runtime for cloud, mobile, desktop, and IoT apps. - dotnet/runtime"
  url="https://github.com/dotnet/runtime/blob/main/.editorconfig/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/226fac2efe6bbe04bcdf030b5d1736fae92b92f4d7616e0b345c545dd5c6e0ec/dotnet/runtime"/>

<SiteInfo
  name="Sample editor config with a bunch of rules turned off 😅"
  desc="Sample editor config with a bunch of rules turned off 😅 - .editorconfig"
  url="https://gist.github.com/m-jovanovic/417b7d0a641d7dd7d1972550fba298db/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

---

## 2. Centralize Build Configuration

Next, I add a <VPIcon icon="iconfont icon-code"/>`Directory.Build.props` file to the solution root. This file lets you define build settings that apply to every project in the solution.

Here's an example:

```xml title="Directory.Build.props"
<Project>
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
```

This keeps your <VPIcon icon="iconfont icon-code"/>`.csproj` files clean and consistent, since there's no need to repeat these properties in every project.

If you later want to enable static analyzers or tweak build options, you can do it once here.

What's cool about this is your <VPIcon icon="iconfont icon-code"/>`.csproj` files become basically empty, with only NuGet package references most of the time.

---

## 3. Centralize Package Management

As your solution grows, managing NuGet package versions across multiple projects gets painful.

That's where [**central package management**](/milanjovanovic.tech/central-package-management-in-net-simplify-nuget-dependencies.md) helps.

Create a file named <VPIcon icon="iconfont icon-code"/>`Directory.Packages.props` at the root:

```xml title="Directory.Packages.props"
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>

  <ItemGroup>
    <PackageVersion Include="Microsoft.AspNetCore.OpenApi" Version="10.0.0" />
    <PackageVersion Include="SonarAnalyzer.CSharp" Version="10.15.0.120848" />
  </ItemGroup>
</Project>
```

Now, when you reference a NuGet package in your project, you don't specify the version. You can only use the package name like this:

```xml
<PackageReference Include="Microsoft.AspNetCore.OpenApi" />
```

All versioning is handled centrally. This makes dependency upgrades trivial and avoids version drift between projects.

You can still override versions in individual projects if needed.

---

## 4. Add Static Code Analysis

[**Static code analysis**](/milanjovanovic.tech/improving-code-quality-in-csharp-with-static-code-analysis.md) helps catch potential bugs and maintain code quality. .NET has a set of built-in analyzers, but I like to add **SonarAnalyzer.CSharp** for more comprehensive checks.

Let's install **SonarAnalyzer.CSharp** to catch potential code issues early:

```powershell
Install-Package SonarAnalyzer.CSharp
```

Add it as a global package reference inside your <VPIcon icon="iconfont icon-code"/>`Directory.Build.props`:

```xml title="Directory.Build.props"
<ItemGroup>
  <PackageReference Include="SonarAnalyzer.CSharp" />
</ItemGroup>
```

Combine this with:

```xml title="Directory.Build.props"
<Project>
  <PropertyGroup>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <AnalysisLevel>latest</AnalysisLevel>
    <AnalysisMode>All</AnalysisMode>
    <CodeAnalysisTreatWarningsAsErrors>true</CodeAnalysisTreatWarningsAsErrors>
    <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
  </PropertyGroup>
</Project>
```

…and your build will fail on serious code quality issues. This can be a great safety net.

But it can also be noisy at first. If some rules don't fit your context, you can adjust or suppress them in <VPIcon icon="fas fa-file-lines"/>`.editorconfig` by setting the rule severity to `none`.

---

## 5. Set Up Local Orchestration

For a consistent local environment across your team, you'll want container orchestration.

You have two main options:

### Option 1: Docker Compose

Add **Docker Compose support** in Visual Studio. It will scaffold a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` file where you can define services like:

```yaml title="docker-compose.yml"
services:
  webapi:
    build: .
  postgres:
    image: postgres:18
    environment:
      POSTGRES_PASSWORD: password
```

This lets every developer spin up the same stack locally with one command.

### Option 2: .NET Aspire

[**.NET Aspire**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md) takes orchestration a step further. It provides [**service discovery**](/milanjovanovic.tech/how-dotnet-aspire-simplifies-service-discovery.md), [**telemetry**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md), and streamlined configuration, all integrated with your .NET projects. It's become a **personal favorite of mine**.

You can add a .NET project and a Postgres resource with a few lines of code:

```cs
var postgres = builder.AddPostgres("demo-db");

builder.AddProject<WebApi>("webapi")
       .WithReference(postgres)
       .WaitFor(postgres);

builder.Build().Run();
```

Aspire still uses Docker under the hood but provides a richer developer experience.

Whether you pick Docker Compose or Aspire, the goal is the same: a repeatable, reliable local setup that works the same on every machine.

---

## 6. Automate Builds with CI

Finally, I set up a simple [**GitHub Actions**](/milanjovanovic.tech/how-to-build-ci-cd-pipeline-with-github-actions-and-dotnet.md) workflow to validate each commit.

```yaml title=".github/workflows/build.yml"
name: Build

on:
  push:
    # Filter to only run on main branch
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v5
        with:
          dotnet-version: 10.0.x
      - run: dotnet restore
      - run: dotnet build --no-restore --configuration Release
      - run: dotnet test --no-build --configuration Release
```

This ensures your project always builds and passes tests, and it catches issues before they reach production. If the CI build fails, you know something's wrong right away.

When it comes to testing, I highly recommend exploring:

- [**Architecture testing**](/milanjovanovic.tech/shift-left-with-architecture-testing-in-dotnet.md) to enforce architectural rules in your codebase
- [**Integration testing with Testcontainers**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md) to spin up real dependencies in Docker during tests (you can run this locally and in CI)

This will give you confidence that your code works as expected in an (as close as possible) production-like environment.

---

## Wrapping Up

That's a wrap. Your **new .NET project** is now set up with:

- consistent code style
- centralized build and package management
- code quality enforcement
- reproducible local orchestration
- continuous integration

These small setup steps save countless hours down the road and keep your codebase clean, predictable, and ready to scale.

Once your project setup is solid, the next step is designing scalable boundaries. In my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course, I show how to grow a .NET application without turning it into a tangled mess, through clear module boundaries, messaging, and domain isolation.

If you're looking for a practical walkthrough of these steps, check out [<VPIcon icon="fa-brands fa-youtube"/>this video](https://youtu.be/QRgtcbxJlo0).

<VidStack src="youtube/QRgtcbxJlo0" />

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "6 Steps for Setting Up a New .NET Project the Right Way",
  "desc": "Learn how to properly set up a new .NET project with EditorConfig for code consistency, Directory.Build.props for centralized configuration, central package management, static code analysis, Docker Compose or .NET Aspire for local orchestration, and GitHub Actions for CI/CD.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/6-steps-for-setting-up-a-new-dotnet-project-the-right-way.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
