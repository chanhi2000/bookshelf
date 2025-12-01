---
lang: en-US
title: "The New .slnx Solution Format (migration guide)"
description: "Article(s) > The New .slnx Solution Format (migration guide)"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The New .slnx Solution Format (migration guide)"
    - property: og:description
      content: "The New .slnx Solution Format (migration guide)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-new-slnx-solution-format-migration-guide.html
prev: /programming/cs/articles/README.md
date: 2025-12-13
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_172.png
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
  name="The New .slnx Solution Format (migration guide)"
  desc="See what changes in .slnx, how to convert your existing .sln, and what to watch out for in CI."
  url="https://milanjovanovic.tech/blog/the-new-slnx-solution-format-migration-guide"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_172.png"/>

**Solution files** have always been *that one file* nobody wants to touch during a **merge conflict**. I still remember the pain of resolving conflicts in large monorepo solutions with hundreds of projects. Can I just say this was not fun?

Microsoft is (finally!) [<VPIcon icon="iconfont icon-visualstudio"/>addressing that](https://devblogs.microsoft.com/visualstudio/new-simpler-solution-file-format/) with **<VPIcon icon="iconfont icon-code"/>`.slnx`**: an **XML-based**, simpler solution format designed to be easier to read, edit, and merge.

Here is your practical guide to the future of .NET solutions.

---

## The problem with <VPIcon icon="fas fa-file-line"/>`.sln`

Classic <VPIcon icon="fas fa-file-line"/>`.sln` files are verbose: GUID-heavy project entries + configuration blocks that explode as your solution grows. It's also a frequent source of merge conflicts.

To appreciate the new format, we must look at the old one.

Here's a typical <VPIcon icon="fas fa-file-line"/>`.sln` file from a moderately sized .NET solution:

```plaintext title".sln"
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.7.34031.279
MinimumVisualStudioVersion = 10.0.40219.1
Project("{2150E333-8FDC-42A3-9474-1A3956D46DE8}") = "Solution Items", "Solution Items", "{8FC526EA-218B-4615-8410-4E1850611F38}"
	ProjectSection(SolutionItems) = preProject
		.editorconfig = .editorconfig
		Directory.Build.props = Directory.Build.props
		Directory.Packages.props = Directory.Packages.props
	EndProjectSection
EndProject
Project("{2150E333-8FDC-42A3-9474-1A3956D46DE8}") = "src", "src", "{64A28C1B-09AF-426E-8721-D002BE554B48}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "SharedKernel", "src\SharedKernel\SharedKernel.csproj", "{166778A2-518F-47F0-BBC7-DB49C76A963C}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "Domain", "src\Domain\Domain.csproj", "{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "Application", "src\Application\Application.csproj", "{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "Infrastructure", "src\Infrastructure\Infrastructure.csproj", "{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "Web.Api", "src\Web.Api\Web.Api.csproj", "{86506D03-3746-41E7-A645-97D3633981DB}"
EndProject
Project("{2150E333-8FDC-42A3-9474-1A3956D46DE8}") = "tests", "tests", "{1EB88D85-BE1E-46DE-99A2-2F02363060AF}"
EndProject
Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "ArchitectureTests", "tests\ArchitectureTests\ArchitectureTests.csproj", "{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA}"
EndProject
Project("{E53339B2-1760-4266-BCC7-CA923CBCF16C}") = "docker-compose", "docker-compose.dcproj", "{34BB3069-D5D0-4046-ACAD-A2025ED7678F}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Any CPU = Debug|Any CPU
		Release|Any CPU = Release|Any CPU
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{166778A2-518F-47F0-BBC7-DB49C76A963C}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{166778A2-518F-47F0-BBC7-DB49C76A963C}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{166778A2-518F-47F0-BBC7-DB49C76A963C}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{166778A2-518F-47F0-BBC7-DB49C76A963C}.Release|Any CPU.Build.0 = Release|Any CPU
		{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B}.Release|Any CPU.Build.0 = Release|Any CPU
		{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7}.Release|Any CPU.Build.0 = Release|Any CPU
		{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC}.Release|Any CPU.Build.0 = Release|Any CPU
		{86506D03-3746-41E7-A645-97D3633981DB}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{86506D03-3746-41E7-A645-97D3633981DB}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{86506D03-3746-41E7-A645-97D3633981DB}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{86506D03-3746-41E7-A645-97D3633981DB}.Release|Any CPU.Build.0 = Release|Any CPU
		{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA}.Release|Any CPU.Build.0 = Release|Any CPU
		{34BB3069-D5D0-4046-ACAD-A2025ED7678F}.Debug|Any CPU.ActiveCfg = Debug|Any CPU
		{34BB3069-D5D0-4046-ACAD-A2025ED7678F}.Debug|Any CPU.Build.0 = Debug|Any CPU
		{34BB3069-D5D0-4046-ACAD-A2025ED7678F}.Release|Any CPU.ActiveCfg = Release|Any CPU
		{34BB3069-D5D0-4046-ACAD-A2025ED7678F}.Release|Any CPU.Build.0 = Release|Any CPU
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
	GlobalSection(NestedProjects) = preSolution
		{166778A2-518F-47F0-BBC7-DB49C76A963C} = {64A28C1B-09AF-426E-8721-D002BE554B48}
		{6448ADE8-34BC-4F2F-A68C-5B2D6BF4FB0B} = {64A28C1B-09AF-426E-8721-D002BE554B48}
		{0F576D4A-156D-4626-A4D5-83DD0F6FAFE7} = {64A28C1B-09AF-426E-8721-D002BE554B48}
		{C699FD09-4D82-4C4B-8744-4FD3B0D60EFC} = {64A28C1B-09AF-426E-8721-D002BE554B48}
		{86506D03-3746-41E7-A645-97D3633981DB} = {64A28C1B-09AF-426E-8721-D002BE554B48}
		{8D8E2A8A-D3FE-4230-BEF7-C427D6BD87DA} = {1EB88D85-BE1E-46DE-99A2-2F02363060AF}
	EndGlobalSection
	GlobalSection(ExtensibilityGlobals) = postSolution
		SolutionGuid = {B948A3CC-9872-4612-ABD2-BB3D49671542}
	EndGlobalSection
EndGlobal
```

Good luck trying to make sense of that during a merge conflict!

---

## What <VPIcon icon="iconfont icon-code"/>`.slnx` looks like

A minimal <VPIcon icon="iconfont icon-code"/>`.slnx` is basically a list of projects in XML.

Here's the same solution as above, but in <VPIcon icon="iconfont icon-code"/>`.slnx` format. We even have solution items, folders, and a docker-compose project.

```xml title=".slnx"
<Solution>
  <Folder Name="/Solution Items/">
    <File Path=".editorconfig" />
    <File Path="Directory.Build.props" />
    <File Path="Directory.Packages.props" />
  </Folder>
  <Folder Name="/src/">
    <Project Path="src/Application/Application.csproj" />
    <Project Path="src/Domain/Domain.csproj" />
    <Project Path="src/Infrastructure/Infrastructure.csproj" />
    <Project Path="src/SharedKernel/SharedKernel.csproj" />
    <Project Path="src/Web.Api/Web.Api.csproj" />
  </Folder>
  <Folder Name="/tests/">
    <Project Path="tests/ArchitectureTests/ArchitectureTests.csproj" />
  </Folder>
  <Project Path="docker-compose.dcproj">
    <Build />
  </Project>
</Solution>

```

It looks remarkably similar to a <VPIcon icon="iconfont icon-code"/>`.csproj` file.

---

## How to Migrate Today

The <VPIcon icon="iconfont icon-code"/>`.slnx` format is available in recent versions of Visual Studio 2022 (v17.13+) and the .NET 9 SDK. Here is how you can switch.

### Option 1: The Command Line

If you have the .NET 9 SDK installed (specifically 9.0.200 or later), you can migrate instantly via the CLI.

1. Open your terminal in the solution folder.
2. Run the migration command:

```sh
dotnet sln migrate
```

3. This creates a new <VPIcon icon="iconfont icon-code"/>`.slnx` file alongside your old <VPIcon icon="fas fa-file-line"/>`.sln`.

At this point I would recommend deleting the old <VPIcon icon="fas fa-file-line"/>`.sln` file to avoid confusion. There's no point in keeping both in the same repo.

### Option 2: Visual Studio "Save As"

If you prefer the GUI, you can do this directly inside Visual Studio 2022 (or 2026).

1. Select the Solution in the Solution Explorer.
2. Go to `File` > `Save Solution As...`.

![The file menu in Visual Studio with the Save As option highlighted.](https://milanjovanovic.tech/blogs/mnw_172/visual_studio_save_as.png?imwidth=750)

3. Change the "Save as type" dropdown to Xml Solution File (`*.slnx`).

![The Save As dialog in Visual Studio with the Xml Solution File option selected.](https://milanjovanovic.tech/blogs/mnw_172/save_as_xml_solution_file.png?imwidth=640)

---

## Why You Should Care

- **Fewer Merge Conflicts**: The #1 benefit. Because the file is simple XML without random GUIDs changing, git merges become trivial.
- **Human Readable**: You can open this in Notepad, understand it, and edit it without breaking your entire build.
- **Consistency**: It finally aligns the solution format with the project format (<VPIcon icon="iconfont icon-code"/>`.csproj`), which moved to simplified XML years ago.
- **Performance**: Smaller file sizes and simpler parsing mean slightly faster load times for massive solutions.

---

## Is it Ready?

As of late 2025/early 2026, <VPIcon icon="iconfont icon-code"/>`.slnx` is technically a **Preview** feature.

### Safe to use?

Yes, the format is stable.

### Tooling support?

Visual Studio 2022, Visual Studio 2026 and Rider support it well. So does the .NET CLI. Some older CI/CD pipelines or 3rd party tools might not recognize the extension yet.

### My recommendation

Try it on a side project or a branch first. If your CI pipeline passes, you are ready to modernize.

**I'm using this format** in all my new projects and have migrated several existing ones without issues.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The New .slnx Solution Format (migration guide)",
  "desc": "See what changes in .slnx, how to convert your existing .sln, and what to watch out for in CI.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-new-slnx-solution-format-migration-guide.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
