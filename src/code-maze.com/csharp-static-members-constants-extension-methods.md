---
lang: en-US
title: "C# Intermediate - Static Members, Constants and Extension Methods"
description: "Article(s) > C# Intermediate - Static Members, Constants and Extension Methods"
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
      content: "Article(s) > C# Intermediate - Static Members, Constants and Extension Methods"
    - property: og:description
      content: "C# Intermediate - Static Members, Constants and Extension Methods"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-static-members-constants-extension-methods.html
prev: /programming/cs/articles/README.md
date: 2018-09-26
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-static-members-constants-extension-methods/banner.png
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
  name="C# Intermediate - Static Members, Constants and Extension Methods"
  desc="In this article, you are going to learn about Static Memebers in C# (Classes and Methods). Furthermore, we will explain how to create extension methods."
  url="https://code-maze.com/csharp-static-members-constants-extension-methods/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-static-members-constants-extension-methods/banner.png"/>

In this article, we are going to talk about static members in C#, when and why to use them.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- Static Members, Constants, and Extension Methods (Current article)
<!-- - [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md) -->
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
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

To download the source code, you can visit [Static Members in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/static-members)

:::

---

## About Static Methods

When we define a method in a class, it belongs to that class, and every instance of that class will be able to access it. One class can have many such methods. But there are some methods that are independent of the specific class instance. That kind of methods is called “static methods”. So, the static methods are the methods that don’t belong to an instance of a class, can interact only with other static elements and have the static keyword in the method description.

Let’s take the `Sqrt()` method for example. This method calculates the square root of a number, and we don’t have to instantiate the `Math` class (which the Sqrt belongs in) because this method is a static method:

```cs
int number = 4;
Console.WriteLine(Math.Sqrt(number));
```

So, why is the `Sqrt` method a static method and not a nonstatic one?

Well, the `Sqrt` accepts only one argument and it is enough to do its job. We provide an argument number and the method returns a square root of that number. We didn’t mention the `Math` class at all. That’s because we don’t have to. The `Math` class doesn’t provide any support to the `Sqrt` method to do its job. It only provides a space for the `Sqrt` method to reside in.

When we have a case like this one, it is usually a good solution to create a method as a static one.

---

## Working with a Static Method

To call a static method, as we said, we don’t need an instance of a class. We can call it with the following syntax: `ClassName.MethodName(arguments…);`

So, when we want to use the `Sqrt` method or any other method from the `Math` class, we can call it like this:  `Math.Sqrt(16);`

---

## Creating a Field by Using the Const Keyword

If we prefix our field with the const keyword, we can declare such a field where its value can never change. The keyword `const` is short for constant. A constant member is defined at compile time and it can’t be modified at runtime.

We can create a const variable in the following way: `AccessModifier const Type Name = Value;`

![Const member - Static Members in C#](/assets/image/code-maze.com/csharp-static-members-constants-extension-methods/07-Constant.png)

---

## Static Class

In C#, next to static methods we can declare static classes as well. The static class can contain only the static members. Its purpose is to act as a holder for the utility methods and fields. There is no point in instantiating this type of classes by using the `new` keyword. Furthermore, we can’t do that at all. But we can create a default constructor as long as it is a static one. Any other type of constructor is illegal:

```cs
public static class TestClass
{
    private static int number;

    static TestClass()
    {
        number = 54;
    }
 }
```

---

## About Extension Methods and How to Use Them

Let’s suppose that we want to add a new feature to the `string` type, for example, the `FirstLetterUpperCase` functionality that always makes the first letter of a string with upper case. We can write a normal method for that purpose:

```cs
public static string FirstLetterUpperCase(string word)
{
     char letter = Char.ToUpper(word[0]);
     string remaining = word.Substring(1);

     return letter + remaining;
}

static void Main(string[] args)
{
     string word = "football";
     string newWord = FirstLetterUpperCase(word);
}
```

But, as we can see, we need to send a word as a parameter every time and to accept returned value every time as well. This is not the wrong approach but we can do it even better. There’s where the extension methods come in.

An extension method enables us to extend an existing type with additional static methods. We must create that kind of methods inside a static class and they have the first parameter prefixed with the `this` keyword.

But why do we have to place a prefix in front of the first parameter?

Because that parameter is an indicator that tells to the compiler which type we extend.

So here is the previous example but with the extension method:

```cs
public static class StringExtensions
{
    public static string FirstLetterUpperCase(this string word)
    {
        char letter = Char.ToUpper(word[0]);
        string remaining = word.Substring(1);

        return letter + remaining;
    }
}

class Program
{
    static void Main(string[] args)
    {
        string word = "football"
                      .FirstLetterUpperCase();

        Console.WriteLine(word);
        Console.ReadKey();
    }
}
```

![Extension methods result - Static Members in C#](/assets/image/code-maze.com/csharp-static-members-constants-extension-methods/08-ExtensionMethod.png)

Excellent.

---

## Conclusion

We are done with the static members and now we have a great tool in our toolbox that we can use while developing our C# applications.

In this article, we have learned:

- How to use static classes
- The way to use static methods
- How to create extension methods
- About const keywords and creating constants

In the next article, we are going to talk about Anonymous [**Types and Nullable Types in C#**](/code-maze.com/csharp-anonymous-nullable-types.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate - Static Members, Constants and Extension Methods",
  "desc": "In this article, you are going to learn about Static Memebers in C# (Classes and Methods). Furthermore, we will explain how to create extension methods.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-static-members-constants-extension-methods.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

