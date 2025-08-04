---
lang: en-US
title: "C# Intermediate – Enumerations"
description: "Article(s) > C# Intermediate – Enumerations"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - code-maze.com
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > C# Intermediate – Enumerations"
    - property: og:description
      content: "C# Intermediate – Enumerations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-enumerations.html
prev: /programming/cs/articles/README.md
date: 2018-10-05
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-enumerations/banner.png
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

[[toc]]

---

<SiteInfo
  name="C# Intermediate – Enumerations"
  desc="In this article you are going to learn about Enumerations in C#, what they are, how to use them in C# and how to use their assigned values."
  url="https://code-maze.com/csharp-enumerations"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-enumerations/banner.png"/>

Besides the structures, C# supports another value type Enumeration. In this article, we are going to talk more about Enumerations in C#.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- [**Structures**](/code-maze.com/csharp-structures.md)
- Enumerations (Current article)
- [**Inheritance**](/code-maze.com/csharp-inheritance.md)
- [**Interfaces**](/code-maze.com/csharp-interfaces.md)
- [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md)
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Enumerations in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/enumerations).

:::

---

## Working with Enumerations in C#

Suppose we need to represent days in a week in our C# project. We can use an integer number to represent every single day in a week (from 0 to 6), and even though that would work just fine it is not readable at all. This is where enumerations excel.

To declare enumeration we can use the following syntax:

```cs
public enum DaysInWeek
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
```

After we have declared our enumeration, we can use it in exactly the same way as any other type:

```cs
static void Main(string[] args)
{
    DaysInWeek monday = DaysInWeek.Monday;

    Console.WriteLine(monday); // It is going to print out Monday
    Console.ReadKey();
}
```

As we can see, we must write `DaysInWeek.Monday` and not just Monday because all enumeration literal names are in scope of their enumeration type.

---

## Choosing Enumeration Literal Values

Internally, an enumeration type assigns the integer value to every element inside that enumeration. Those numbers start at 0 and increase by 1 for every other element. In our previous example, we print out the value that matches with the exact element of an enumeration. But we can print the integer value as well by casting it into its underlying type:

```cs
static void Main(string[] args)
{
     DaysInWeek monday = DaysInWeek.Monday;

     Console.WriteLine((int)monday); //prints out the 0

     Console.ReadKey();
}
```

If we prefer, we can assign a specific integer constant to the enumeration elements:

```cs
public enum DaysInWeek
{
    Monday=1,
    Tuesday,
    Wednesday,
    Thursday, Friday,
    Saturday,
    Sunday
}
```

If we do it like this, `Monday` will have the value 1 and all the others will be increased by one (Tuesday=2, Wednesday=3…). But we can assign a random value to each of the elements:

```cs
public enum DaysInWeek
{
    Monday=10,
    Tuesday=20,
    Wednesday=35,
    Thursday=48,
    Friday=74,
    Saturday=12,
    Sunday=154
}
```

Of course, it is always a better way to assign integer values with the equal progression (1, 2, 3… or 10, 20, 30…).

---

## Choosing an Enumerations Underlying Type

When we declare an enumeration, the compiler assigns integer values to all of the elements. But we can change that. We can provide a different type right after the name of an enumeration:

```cs
public enum DaysInWeek: short
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
```

By doing this, we save our memory because the int type is taking more memory than the short, and we don’t need for our example, greater capacity of the short data type.

---

## Conclusion

In this article, we have learned:

- What is enumeration and how to create one
- How to work with literal values in enumerations

In the next article, we are going to talk about [**Inheritance in C#**](/code-maze.com/csharp-inheritance.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Enumerations",
  "desc": "In this article you are going to learn about Enumerations in C#, what they are, how to use them in C# and how to use their assigned values.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-enumerations.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```