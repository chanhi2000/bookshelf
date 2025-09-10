---
lang: en-US
title: "Central Package Management in .NET - Simplify NuGet Dependencies"
description: "Article(s) > Central Package Management in .NET - Simplify NuGet Dependencies"
icon: iconfont icon-powershell
category:
  - Powershell
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - pwsh
  - powershell
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Central Package Management in .NET - Simplify NuGet Dependencies"
    - property: og:description
      content: "Central Package Management in .NET - Simplify NuGet Dependencies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/central-package-management-in-net-simplify-nuget-dependencies.html
prev: /programming/pwsh/articles/README.md
date: 2024-12-07
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_119.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Powershell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/pwsh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Central Package Management in .NET - Simplify NuGet Dependencies"
  desc="Managing NuGet packages across multiple .NET projects used to be a nightmare of version mismatches and maintenance headaches, but Central Package Management (CPM) offers a powerful solution by letting you control all package versions from a single source of truth. Learn how CPM can simplify your dependency management, prevent version conflicts, and make your .NET development workflow smoother."
  url="https://milanjovanovic.tech/blog/central-package-management-in-net-simplify-nuget-dependencies"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_119.png"/>

I remember the days when managing NuGet packages across multiple projects was a real pain. You know what I mean - you open a large solution and find out every project uses a different version of the same package. Not fun!

Let me show you how **Central Package Management** (CPM) in .NET can fix this problem once and for all.

---

## The Problem We Need to Solve

I often work with solutions that have lots of projects. It's not uncommon to have solutions with 30 or more projects. Each one needs similar packages like Serilog or Polly. Most test projects I create depend on xUnit. Before CPM, keeping track of package versions was a mess:

- One project uses Serilog `4.1.0`
- Another uses Serilog `4.0.2`
- And somehow, a third one uses Serilog `3.1.1`

This causes real problems. Different versions can behave differently, leading to weird bugs that are hard to track down. I've wasted many hours fixing issues caused by version mismatches.

---

## How Central Package Management Helps

Think of CPM as a control center for all your package versions. Instead of setting versions in each project, you set them once in one place. Then, you just reference a package you want to use without specifying the version. It's that simple.

Here's what you need to use [<VPIcon icon="fa-brands fa-microsoft"/>Central Package Management](https://learn.microsoft.com/en-us/nuget/consume-packages/central-package-management):

- NuGet 6.2 or newer
- .NET SDK 6.0.300 or newer
- If you use Visual Studio, you need version 2022 17.2 or newer

---

## Setting It Up

Let me show you how to set up CPM. It's easier than you might think.

### 1

First, create a file called <VPIcon icon="iconfont icon-code"/>`Directory.Packages.props` in your solution's main folder:

```xml title="Directory.Packages.props"
<Project>
  <PropertyGroup>
    <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>
  </PropertyGroup>
  <ItemGroup>
    <PackageVersion Include="Newtonsoft.Json" Version="13.0.3" />
    <PackageVersion Include="Serilog" Version="4.1.0" />
    <PackageVersion Include="Polly" Version="8.5.0" />
  </ItemGroup>
</Project>
```

Note the use of `PackageVersion` to define NuGet dependencies.

### 2

In your project files, you can list the packages using `PackageReference` without the version component:

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" />
  <PackageReference Include="AutoMapper" />
  <PackageReference Include="Polly" />
</ItemGroup>
```

That's it! Now all your projects will use the same package versions.

---

## Cool Things You Can Do

### Need a Different Version for One Project?

Sometimes you might need a specific project to use a different version. No problem! Just add this to your project file:

```xml
<PackageReference Include="Serilog" VersionOverride="3.1.1" />
```

The `VersionOverride` property lets you define the specific version you want to use.

### Want a Package in Every Project?

If you have packages that every project needs, you can make them global. Define a `GlobalPackageReference` in your props file:

```xml
<ItemGroup>
  <GlobalPackageReference Include="SonarAnalyzer.CSharp" Version="10.3.0.106239" />
</ItemGroup>
```

Now every project gets this package automatically!

---

## Migrating Existing Projects to Central Package Management

1. Create the `Directory.Packages.props` file at the solution root
2. Move all package versions from your `.csproj` files
3. Remove version attributes from `PackageReference` elements
4. Build your solution and fix any version conflicts
5. Test thoroughly before committing

Here's a Powershell script that will list all NuGet package versions in your solution:

```powershell
# Scan all .csproj files and aggregate unique package versions
$packages = Get-ChildItem -Filter *.csproj -Recurse |
    Get-Content |
    Select-String -Pattern '<PackageReference Include="([^"]+)" Version="([^"]+)"' -AllMatches |
    ForEach-Object { $_.Matches } |
    Group-Object { $_.Groups[1].Value } |
    ForEach-Object { @{
        Name = $_.Name
        Versions = $_.Group.ForEach({ $_.Groups[2].Value }) | Select-Object -Unique
    }} |
    Sort-Object { $_.Name }

# Display results
$packages | ForEach-Object {
    "$($_.Name) versions:"
    $_.Versions | ForEach-Object { "  $_" }
}
```

There's also a CLI tool called [<VPIcon icon="iconfont icon-github"/>`Webreaper/CentralisedPackageConverter`](https://github.com/Webreaper/CentralisedPackageConverter), which you can use to automate the migration. It will scan for all .NET project files within that folder tree, gather all the versioned references in the projects, remove the versions from the project files, and write the entries to the `Directory.Packages.props` file.

```bash
# Install the tool globally
dotnet tool install CentralisedPackageConverter --global

# Convert your solution to use Central Package Management
central-pkg-converter /PATH_TO_YOUR_SOLUTION_FOLDER
```

---

## When Should You Use CPM?

I don't see a compelling reason for not using this by default.

I recommend using CPM when:

- You have many projects that share packages
- You're tired of fixing version-related bugs
- You want to make sure everyone uses the same versions

I recently added CPM to a solution with 30 projects.

Here's what happened:

- Fewer merge conflicts
- Caught version problems early
- Made it easier for new team members

This was especially helpful while migrating from .NET 8 to .NET 9. You can combine CPM with [**build configuration and static code analysis**](/milanjovanovic.tech/improving-code-quality-in-csharp-with-static-code-analysis.md).

---

## Wrapping Up

My tips for success with **Central Package Management**:

1. When you add CPM to an existing solution, do it in its own change/PR
2. If you override a version, add a comment explaining why
3. Check your package versions regularly for updates
4. Only make packages global if you really need them everywhere

Since I started using Central Package Management, managing NuGet packages has become much easier. It's like having a single source of truth for all your package versions.

Hope this was helpful. See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Central Package Management in .NET - Simplify NuGet Dependencies",
  "desc": "Managing NuGet packages across multiple .NET projects used to be a nightmare of version mismatches and maintenance headaches, but Central Package Management (CPM) offers a powerful solution by letting you control all package versions from a single source of truth. Learn how CPM can simplify your dependency management, prevent version conflicts, and make your .NET development workflow smoother.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/central-package-management-in-net-simplify-nuget-dependencies.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
