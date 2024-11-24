---
lang: en-US
title: "How to Set Semantic Versioning for .NET Core Apps and Libraries"
description: "Article(s) > How to Set Semantic Versioning for .NET Core Apps and Libraries"
icon: iconfont icon-csharp
category:
  - C#
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Semantic Versioning for .NET Core Apps and Libraries"
    - property: og:description
      content: "How to Set Semantic Versioning for .NET Core Apps and Libraries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-semantic-versioning-for-net.html
prev: /programming/cs/articles/README.md
date: 2024-11-08
isOriginal: false
author: Naveed Ausaf
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg
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
  name="How to Set Semantic Versioning for .NET Core Apps and Libraries"
  desc="Semantic Versioning (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form <major>.<minor>.<patch>, such as 1.0.2, with an optional prerelease suffix in the form -<prerelease>, as in 1.0.2-beta. S..."
  url="https://freecodecamp.org/news/set-semantic-versioning-for-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1731065367635/f8ce5091-d526-4d09-8282-2ffe63cead40.jpeg"/>

[<FontIcon icon="fas fa-globe"/>Semantic Versioning](https://semver.org/) (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form `<major>.<minor>.<patch>`, such as `1.0.2`, with an optional prerelease suffix in the form `-<prerelease>`, as in `1.0.2-beta`.

SemVer is perhaps the the most widely used versioning scheme today. For example, both [Nuget](https://learn.microsoft.com/en-us/nuget/concepts/package-versioning?tabs=semver20sort#pre-release-versions) and [npm](https://docs.npmjs.com/about-semantic-versioning) recommend and support it, and VS Code [uses it](https://github.com/microsoft/vscode/releases) as well.

In most GitHub repos that use the GitHub Releases feature to publish releases, you would see a SemVer version number in the latest release badge on the home page, as can be seen in the screenshot below:

![Latest release badge in Next.js GitHub repository showing the three-part Semantic Versioning version number 15.0.3](https://cdn.hashnode.com/res/hashnode/image/upload/v1730988665455/34706cc9-7cf3-401c-9407-2f15933fef49.png)

I frequently need to set a SemVer version number when building ASP.NET Core API projects, and then read or report this at runtime.

For example, if I build a minimal API with its version set to `1.0.2-beta`, this would be reported by a `/version` endpoint exposed by the API, as shown in the screenshot below from [Hoppscotch](https://hoppscotch.io/) (this is a [<FontIcon icon="iconfont icon-postman"/>Postman](https://postman.com/)-like tool with the convenience that it runs the browser):

![Screenshot of Hoppscotch shows that a was call made to the `/version` endpoint of an API running locally (on localhost). The result was a JSON document containing a "version" property whose value is the API's SemVer version number of "1.0.2-beta".](https://cdn.hashnode.com/res/hashnode/image/upload/v1730746046707/eb8968ef-41c7-4919-a0ed-7aeb25e0a03d.png)

Checking that the version reported from deployed services, such as web apps and APIs, is correct is a crucial part of my CD pipeline and is one of the smoke tests I use to determine if a deployment succeeded.

One slight complication when setting a SemVer version number on .NET assemblies is that .NET originally used four part version numbers like `1.0.3.212` and assemblies still have these (assembly is the .NET term for [<FontIcon icon="fa-brands fa-microsoft"/>units of code compiled to .NET bytecode](https://learn.microsoft.com/en-us/dotnet/standard/assembly/), the most typical of these being dll’s and exe’s).

The other is that .NET has not one but but many, slightly different, version numbers that are present in the same assembly.

In this article, I’ll show you how to sidestep these quirks and stamp a SemVer version number on a .NET assembly during build. That is, on a compiled **.exe** or **.dll**, and how to read it at runtime.

---

## Structure of a SemVer Version Number

Consider a SemVer version number like `1.0.2` or `1.0.2-beta`. It has the form `<major>`.`<minor>`.`<patch>`-`<prerelease>`

This is what the various components mean:

The `<major>` component of the version number would be incremented only if the new release would break an existing (most recent) release.

In case of a UI app, clients may be taken to mean *human clients*. So if the new release would break users’ existing assets such as workflow definitions, this would call for incrementing the major version number. In this event, if the previous release was `1.0.2`, the new release should be `2.0.0` (all lower components of the version number would reset).

In case of a library, such as a library package on Nuget or NPM, the clients would be other code. So if the new release would break existing client code, i.e. it would not be backwards compatible with its own previous version, then again it is the `<major>` component would be incremented.

`<minor>` is incremented if new features have been added but the new version is still backwards compatible. So from `1.0.2` you would go to `1.1.0`.

`<patch>` is incremented when a new release needs to be made even though there is no breaking change and no new functionality has been added. This could happen, for example, if there was a bugfix that had to be released.

`-<prerelease>` suffix is optional. It is typically suffixed to a three part version number when software needs to be made available during prerelease testing phases such as alpha and beta. For example, before generally releasing version `1.0.2` of your software, you can make it available to your beta testers as `1.0.2-beta`.

The `<prerelease>` component can pretty much be any string of your choosing and the only requirement is that it is either an *alphanumeric identifier* such as `beta` or `12` or `alpha2` (no characters other than numbers or letters of the alphabet) or multiple alphanumeric identifiers separated by a dot(`.`) e.g. `development.version`.

---

## The Many Version Numbers of a .NET Assembly

As Andrew Lock’s [<FontIcon icon="fas fa-globe"/>article on .NET versioning](https://andrewlock.net/version-vs-versionsuffix-vs-packageversion-what-do-they-all-mean/#how-to-set-the-version-number-when-you-build-your-app-library) explains, a .NET assembly has not one but several different version numbers:

- **AssemblyVersion:** This is a four part version number, for example, `1.0.2.0`. It is used by the runtime when loading linked assemblies.
- **FileVersion:** This is the version number reported for a **.dll** file in Windows File Explorer when you right click the assembly and select Properties.
- **InformationalVersion:** Yet another version number and, like FileVersion, can be seen in Properties dialog if you right-click the assembly in Windows and select Properties. This can contain strings and not only integers and dots that AssemblyVersion and FileVersion are constrained to.
- **PackageVersion:** If the project is a Nuget package, this would be the version number of the package that the assembly is part of.

All of these version numbers are emitted into the assembly during compilation as metadata. You can see them if you inspect the assembly with [<FontIcon icon="iconfont icon-jetbrains"/>JetBrains dotPeek](https://jetbrains.com/decompiler/) (free) or [<FontIcon icon="fas fa-globe"/>Red gate Reflector](https://red-gate.com/products/reflector/) (not free) or similar.

FileVersion and InformationalVersion can also be seen in the Details tab of the Properties dialog that appears when you right-click the assembly file in Windows File Explorer and select Properties:

![Properties Dialog for a compiled .NET DLL in Windows File Explorer. It shows the DLL's "File Version" attribute with value "1.0.2.0" and its "Product version" attribute with value "1.0.2-beta"](https://cdn.hashnode.com/res/hashnode/image/upload/v1730755185100/d444a84b-5148-47e6-ab75-951d9f0f73ac.png)

In the screenshot above, “Product version” is the caption for InformationalVersion whereas “File version” is the caption for FIleVersion.

Of the four types of version numbers described above, only the first three apply to any assembly (i.e. whether or not the assembly is part of a Nuget package).

Of those three, AssemblyVersion alsways adds a `0` in the fourth place if you try to set a SemVer version which only has three numbers (plus an optional *prerelease* suffix). For example if you try to set a SemVer version of `1.0.2-beta` during build and then read the AssemblyVersion value at run time in the assembly, it would be `1.0.2.0`.

FileVersion does the same, as shown in the screenshot above.

InformationalVersion is the only version number which would get set exactly to the server version you set during build, as the screenshot above shows.

Therefore, InformationalVersion is the version that should be read at runtime to retrieve the assembly’s SemVer version.

---

## How to Set a SemVer Version Number

There are two things you need to do to set a SemVer version number on an assembly during build.

**First,** in a `<PropertyGroup>` element in the project’s `csproj` file, add element `<IncludeSourceRevisionInInformationalVersion>false</IncludeSourceRevisionInInformationalVersion>`:

```xml title="csproj"
<PropertyGroup>
 ...
 <IncludeSourceRevisionInInformationalVersion>false</IncludeSourceRevisionInInformationalVersion> 
</PropertyGroup>
```

As described in [<FontIcon icon="iconfont icon-visualstudio"/>this issue](https://developercommunity.visualstudio.com/t/Build-adds-string-to-assembly-Informatio/10515014?sort=newest), this ensures that InformationalVersion is set exactly to the SemVer version number we specified and does not get a `+<hash code>` tacked on at the end.

**Second**, pass the version number as value of `Version` property passed to `dotnet build` command e.g.:

```sh
dotnet build --configuration Release -p Version=1.0.2-beta
```

This would set InformationalVersion in the compiled assembly (.exe or .dll file) to `1.0.2-beta`.

Incidentally, it would also set AssemblyVersion and FileVersion (an extra `0` would be added to the end of `1.0.2`) but we are not interested in those.

Note that instead pf passing `Version` argument on the command line, you can set MS Build property `<Version>1.0.2-beta</Version>` in a `<PropertyGroup>` element in the csproj file. However passing a value of `Version` parameter to `dotnet build` is simpler because the csproj file does not need to be modified everytime the version number is incremented. This is helpful in CD pipelines. Also, by default, csproj files do not have any property related to versioning.

---

## How to Read an Assembly’s SemVer Version at Runtime

Code that reads InfromationalVersion at run time is as follows:

```cs
string? version = Assembly.GetEntryAssembly()?.
  GetCustomAttribute<AssemblyInformationalVersionAttribute>()?.
  InformationalVersion;
```

In my minimal APIs, to add a `/version` endpoint as I showed in the Introduction section above, I place the above snippet in <FontIcon icon="iconfont icon-csharp"/>`Program.cs`, then add the following snippet immediately after. Note that the whole thing should appear **before** `builder.Build()` **is called**:

```cs title="Program.cs"
//this object of an anonymous type will 
//be serialised as JSON in response body
//when returned by a handler
var objVersion = new { Version = version ?? "" };

//OTHER CODE
//var app = builder.Build()
```

After `builder.Build()` is called, I create the handler for the `/version` endpoint:

```cs
app.MapGet("/version", () => objVersion);
```

Now when I run the API project and call the `/version` endpoint, I get the version number back in a JSON object in HTTP response body:

```json
{
  "version": "1.0.2-beta"
}
```

This is what the Hoppscotch screenshot in the Introduction showed.

---

## Conclusion

This article showed you how to set a SemVer version number in your .NET assemblies, libraries, or apps.

It also showed you how to read the version number at runtime.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Semantic Versioning for .NET Core Apps and Libraries",
  "desc": "Semantic Versioning (or SemVer for short) is a software versioning scheme that stipulates three-part version numbers in the form <major>.<minor>.<patch>, such as 1.0.2, with an optional prerelease suffix in the form -<prerelease>, as in 1.0.2-beta. S...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/set-semantic-versioning-for-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
