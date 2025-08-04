---
lang: en-US
title: "C# Basics – Development Environment Setup"
description: "Article(s) > C# Basics – Development Environment Setup"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Microsoft
  - Visual Studio
  - Article(s)
tag:
  - blog
  - code-maze.com
  - cs
  - c#
  - csharp
  - dotnet
  - microsoft
  - visaulstudio
head:
  - - meta:
    - property: og:title
      content: "Article(s) > C# Basics – Development Environment Setup"
    - property: og:description
      content: "C# Basics – Development Environment Setup"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-basics-ide-introduction.html
prev: /programming/cs/articles/README.md
date: 2018-07-26
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-basics-ide-introduction/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Visual Studio > Article(s)",
  "desc": "Article(s)",
  "link": "/tools/visualstudio/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="C# Basics – Development Environment Setup"
  desc="Find out the basics about Visual Studio 2017 environment. How we can use it in our complete tutorial and how it can help us with our examples."
  url="https://code-maze.com/csharp-basics-ide-introduction/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-basics-ide-introduction/banner.png"/>

In this article, we are going to talk about what IDE is and how we can use Visual Studio to create a new project.

::: details

- Development Environment Setup (Current article)
<!-- - [**Development Environment Setup**](/code-maze.com/csharp-basics-ide-introduction.md) -->
- [**Data Types, Declarations and Variable Definitions**](/code-maze.com/csharp-basics-data-types-variables.md)
- [**Operators in C#**](/code-maze.com/csharp-basics-operators.md)
- [**Type Conversion**](/code-maze.com/csharp-basics-type-conversion.md)
- [**Input and Output in C#**](/code-maze.com/csharp-basics-input-output.md)
- [**Working with Strings**](/code-maze.com/csharp-basics-string-methods.md)
- [**Conditions in C# (If, If-Else, If-ElseIf, Switch-Case)**](/code-maze.com/csharp-basics-conditions.md)
- [**Loops(While, Do-While, For)**](/code-maze.com/csharp-basics-loops.md)
- [**Handling Exceptions**](/code-maze.com/csharp-basics-handling-exceptions.md)
- [**Access Modifiers**](/code-maze.com/csharp-basics-access-modifiers.md)
- [**Methods**](/code-maze.com/csharp-basics-methods.md)
- [**Ref and Out Keywords**](/code-maze.com/cshrap-basics-ref-out-keywords.md)
- [**Recursion and Recursive Methods**](/code-maze.com/csharp-basics-recursion.md)
- [**Arrays (single-dimensional and multi-dimensional arrays)**](/code-maze.com/csharp-basics-arrays.md)
- [**Working with Files, StreamWriter and StreamReader**](/code-maze.com/csharp-basics-streamwriter-streamreader.md)
- [**Working with Files, File, and Directory**](/code-maze.com/csharp-basics-file-directory.md)

:::

For the complete navigation of this series check out: [**C# Back to Basics**](/code-maze.com/csharp-back-to-basics.md).

---

## Integrated Development Environment (IDE)

IDE stands for Integrated Development Environment. It is basically a tool that helps us develop applications more easily. It has many features that can make our lives easier.

For example, some common features include:

- Source code editor
- Debugger
- Compiler
- Templates for different kinds of projects
- Much more

Our IDE of choice will be Visual Studio 2017 Community Edition. To download it, visit [<FontIcon icon="iconfont icon-visualstudio"/>Visual Studio Download Page](https://visualstudio.microsoft.com/downloads/). Visual Studio has support for multiple programming languages, which makes it a very popular development tool.

After the installation, we can start a new project by clicking the File menu and choosing New => Project:

![New Project Page - Visual Studio](/assets/image/code-maze.com/csharp-basics-ide-introduction/01-NewProjectPage-e1639648804467.png)

For this tutorial, we will use the console application project the most, so let’s choose that option:

![Creating Console Project in Visual Studio](/assets/image/code-maze.com/csharp-basics-ide-introduction/02-CreatingConsoleProject-e1639648869904.png)

After we click on the OK button, we are going to see our created project. The main file to work with is the `Program.cs` and soon enough we are going to talk more about it:

![Program file in Visual Studio](/assets/image/code-maze.com/csharp-basics-ide-introduction/03-Program-cs-file-1024x596.png)

---

## Watch Window

In some examples, we are going to use this window to examine results. To open it we need to place a breakpoint on any code line first (by clicking left mouse button):

![Brakepoint in Visual Studio](/assets/image/code-maze.com/csharp-basics-ide-introduction/03.1-Brakepoint.png)

Then start our application by pressing F5, and finally to open the watch window:

![Watch window in Visual Studio](/assets/image/code-maze.com/csharp-basics-ide-introduction/03.2-Watch_window.png)

---

## Conclusion

Now we have the perfect IDE that will help us and the knowledge to create a new project. Soon enough we are going to use this knowledge in our applications.

In [**the next part**](/code-maze.com/csharp-basics-data-types-variables.md), we will learn about data types, declarations and definitions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Basics – Development Environment Setup",
  "desc": "Find out the basics about Visual Studio 2017 environment. How we can use it in our complete tutorial and how it can help us with our examples.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-basics-ide-introduction.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
