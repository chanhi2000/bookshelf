---
lang: en-US
title: "C# Intermediate – Structures"
description: "Article(s) > C# Intermediate – Structures"
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
      content: "Article(s) > C# Intermediate – Structures"
    - property: og:description
      content: "C# Intermediate – Structures"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-structures.html
prev: /programming/cs/articles/README.md
date: 2018-10-03
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-structures/banner.png
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
  name="C# Intermediate – Structures"
  desc="We are going to learn about Structures in C#, how to use them, what are the constraints, and when to use structs instead of a classes."
  url="https://code-maze.com/csharp-structures/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-structures/banner.png"/>

In the previous articles, we have learned about classes, how to use them and how to create an object as an instance of a class. In this article, we are going to talk about structures that are similar to classes but have some differences as well.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- Structures (Current article)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
- [**Inheritance**](/code-maze.com/csharp-inheritance.md)
- [**Interfaces**](/code-maze.com/csharp-interfaces.md)
- [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md)
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see the complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Structures in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/structures).

:::

---

## Working with Structures

A structure is a value type, in the opposite of a class which is a reference type, and it has its own fields, methods, and constructors like a class.

Maybe you didn’t realize, but we have worked with structures in our previous articles, especially in [**module 1 C# basics**](/code-maze.com/csharp-back-to-basics.md). Int, double, decimal, bool type etc. are all aliases for the structures System.Int32, System.Int64 etc. In a table below, we can see the primitive types and what are they built from (class or structure):

![Table - Structures in C#](/assets/image/code-maze.com/csharp-structures/10.1-Table-Structures.png)

---

## Structure Declaration

To declare our own structure, we need to use the `struct` keyword followed by the name of the type and then the body of the structure between two curly braces:

```cs
public struct Time
{
    private int _hours, _minutes, _seconds;
}
```

We can create our own constructor to initialize our private fields:

```cs
public struct Time
{
    private int _hours, _minutes, _seconds;

    public Time(int hours, int minutes, int seconds)
    {
        _hours = hours;
        _minutes = minutes;
        _seconds = seconds;
    }

    public void PrintTime()
    {
        Console.WriteLine($"Hours: {_hours}, Minutes: {_minutes}, Seconds: {_seconds}");
    }
}
```

To access our structure we can use this syntax:

```cs
static void Main(string[] args)
{
    Time time = new Time(3, 30, 25);
    time.PrintTime();

    Console.ReadKey();
}
```

---

## Differences Between Classes and Structures

- The structure is a value type, while the class is a reference type
- We **can’t** declare our own default constructor in a structure. That’s because a structure is always generating a default constructor for us. In a class, we **can** create a default constructor because a class won’t generate one for us
- We can initialize fields in our structure by creating a non-default constructor, but we must initialize all of the fields inside that constructor (Before C# 11). It is not allowed to leave a single field without a value:

![Error - Structures in C#](/assets/image/code-maze.com/csharp-structures/10-Structure_Initialization_Error.png)

But, from C# 11 the situation is a bit different. The C# 11 compiler ensures that all fields of a struct type are initialized to their default value as part of executing a constructor. This change means any field or auto property not initialized by a constructor is automatically initialized by the compiler.

- An instance of a class lives on a heap memory while the instance of a structure lives on a stack
- In a structure, we can create a non-default constructor, but nevertheless, the compiler will always generate the default one. This is not the case with a class.

---

## When to Use Structure Instead of a Class

The general rule that we can follow is that our structures need to be small and simple types and above all immutable. For anything else, we should use a class.

Why is immutability so important?

Well let’s take a look at this example:

```cs
class Test
{
    public int Number { get; set; }

    public Test(int number)
    {
        Number = number;
    }
}
class Program
{
    static void Main(string[] args)
    {
        Test test = new Test(10);
        Console.WriteLine(test.Number);

        ChangeNumber(test);
        Console.WriteLine(test.Number);
    }

    public static void ChangeNumber(Test test)
    {
        test.Number = 45;
    }
}
```

If we inspect the result, we will see printed out 10 and 45. And that is the correct result. But if we change our Test class to be a structure and then inspect the result, we will see 10 and 10. This can lead to confusion and problems as well, because the consumer may expect that the `ChangeNumber` method would modify the `Number` property because we allowed it in the code. But if we create properties or fields immutably (as read-only in a structure) then we can avoid this kind of confusion. The consumer can assign values to the properties by calling the constructor method but after that those properties need to stay immutable.

---

## Conclusion

In this article, we have learned:

- What structures in C# are and how to create them
- About structures limitations
- When to use structures in your C# code

In the next article, we are going to talk about [**Enumerations in C#**](/code-maze.com/csharp-enumerations.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Structures",
  "desc": "We are going to learn about Structures in C#, how to use them, what are the constraints, and when to use structs instead of a classes.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-structures.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
