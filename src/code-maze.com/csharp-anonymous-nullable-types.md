---
lang: en-US
title: "C# Intermediate – Anonymous and Nullable Types"
description: "Article(s) > C# Intermediate – Anonymous and Nullable Types"
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
      content: "Article(s) > C# Intermediate – Anonymous and Nullable Types"
    - property: og:description
      content: "C# Intermediate – Anonymous and Nullable Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-anonymous-nullable-types.html
prev: /programming/cs/articles/README.md
date: 2018-09-28
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-anonymous-nullable-types/banner.png
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
  name="C# Intermediate – Anonymous and Nullable Types"
  desc="In this article, you will learn about Anonymous and Nullable types in C#. We are going to show how to use anonymous classes and nullable type properteis."
  url="https://code-maze.com/csharp-anonymous-nullable-types"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-anonymous-nullable-types/banner.png"/>

In this article, we are going to talk about anonymous classes, how to create them, and why they are useful. Moreover, we are going to talk about nullable types and how to use them with the value types and what properties we have with the nullable types.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- Anonymous and Nullable Types (Current article)
<!-- - [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md) -->
- [**Structures**](/code-maze.com/csharp-structures.md)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
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

To download the source code, you can visit [Anonymous and Nullable Types in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/anonymous-nullable-types).

:::

---

## Anonymous Classes

An anonymous class is a class that does not have a name. This sounds strange but sometimes an anonymous class can be useful, especially when using query expressions.

Let’s see what we mean by that.

We can create an object of the anonymous class simply by using the `new` keyword in front of curly braces:

```cs
myAnonymousObj = new { Name = "John", Age = 32 };
```

This object contains two properties the `Name` and the `Age`. The compiler will implicitly assign the types to the properties based on the types of their values. So what this means basically is that the `Name` property will be of the string type and the `Age` property of the int type.

But now, we can ask, what type the `myAnonymousObj` is? And the answer is that we don’t know, which is the point of anonymous classes. But in C# this is not a problem, we can declare our object as an implicitly typed variable by using the `var` keyword:

```cs
var myAnonymousObj = new { Name = "John", Age = 32 };
```

The var keyword causes the compiler to create a variable of the same type as the expression that we use to initialize that object. So let’s see a couple of examples of well-known types:

```cs
var number = 15; // the number is of type int
var word = "example"; //the word is of type string
var money = 987.32; //the money is of type double
```

We can access the properties of our anonymous object the same way we did with regular objects:

```cs
Console.WriteLine($"The name of myAnonymousObject is {myAnonymousObj.Name}, the age is {myAnonymousObj.Age}");
```

---

## Nullable Types

The null value is useful for initializing reference types. So, it is logical that we can’t assign the null value to the value type because the null is itself a reference.

That being said, we can see that the following statement will throw an error:

![nullable type error - Anonymous and Nullable types in C#](/assets/image/code-maze.com/csharp-anonymous-nullable-types/09-Nullable_Error.png)

However, C# provides us with a modifier that we can use to declare a value type as a nullable value type. We can use the `?` sign to indicate that value type is nullable:

```cs
int? number = null;
```

We can still assign an integer value to our nullable value type:

```cs
int? number = null;
int another = 200;

number = 345;
number = another;
```

This is all valid. But if we try to assign the variable of an int type with a value of our nullable type, we are going to have a problem:

```cs
int? number = null;
int another = 200;

another = number; //this is the problem
```

This makes sense if we consider that the variable `number` might contain the null but the variable `another` can’t contain null at all.

---

## Properties of Nullable Types

The nullable types expose a few properties which can come in handy while working on our projects. The `HasValue` property indicates whether a nullable type contains a value or it is a null. The `Value` property enables us to retrieve the value of the nullable type if it is not null:

```cs
int? number = null;
number = 234; //comment this line to print out the result from the else block

if(number.HasValue)
{
    Console.WriteLine(number.Value);
}
else
{
     Console.WriteLine("number is null");
}
```

---

## Conclusion

In this article, we have learned:

- How to use anonymous classes
- What the nullable types are
- About properties of nullable types

In the next article, we are going to talk about [**Structures in C#**](/code-maze.com/csharp-structures.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Anonymous and Nullable Types",
  "desc": "In this article, you will learn about Anonymous and Nullable types in C#. We are going to show how to use anonymous classes and nullable type properteis.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-anonymous-nullable-types.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

