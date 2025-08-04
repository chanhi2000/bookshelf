---
lang: en-US
title: "C# Intermediate – Abstract Classes"
description: "Article(s) > C# Intermediate – Abstract Classes"
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
      content: "Article(s) > C# Intermediate – Abstract Classes"
    - property: og:description
      content: "C# Intermediate – Abstract Classes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-abstract-classes.html
prev: /programming/cs/articles/README.md
date: 2018-10-17
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-abstract-classes/banner.png
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
  name="C# Intermediate – Abstract Classes"
  desc="In this article you are going to laearn about Abstract Classes in C#, how to create them and what is Seald class as well."
  url="https://code-maze.com/csharp-abstract-classes"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-abstract-classes/banner.png"/>

Different classes may implement the same interface, and that is the common case in software development. What is common as well is that the method from that interface can have the same implementation in those classes. That could be a signal that we are doing something wrong. We don’t want to repeat the code in our classes, but to reuse the common implementation.

To fix this, we can extract this common implementation to a base class, and make our classes implement a base class and then make the base class implement an interface. This will solve our problem, but it is not a complete solution.

Why is that?

The problem is that now we can create an instance of our base class, which holds nothing except the common implementation of a method (or methods). This doesn’t make any sense. A class that contains only the common implementation should have a sole purpose to be inherited from.

That’s why we are going to talk about abstract classes in this article.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- [**Structures**](/code-maze.com/csharp-structures.md)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
- [**Inheritance**](/code-maze.com/csharp-inheritance.md)
- [**Interfaces**](/code-maze.com/csharp-interfaces.md)
- Abstract Classes (Current article)
<!-- - [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md) -->
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Abstract Classes in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/abstract-classes).

:::

---

## Creating Abstract Classes

To create an abstract class, we use the `abstract` keyword. The only purpose of the abstract class is to be inherited from and it cannot be instantiated:

![Abstract instance error - Abstract Classes in C#](/assets/image/code-maze.com/csharp-abstract-classes/14-Abstract_instance_error.png)

An abstract class can contain abstract methods. An abstract method doesn’t contain implementation just a definition with the `abstract` keyword:

```cs
public abstract void Print(string text);
```

To implement an abstract method in the class that derives from an abstract class, we need to use the `override` keyword:

```cs
public override void Print()
{
    //method implementation
}
```

As we could see from a previous picture, an abstract class doesn’t have to have any abstract member but the more important thing is if a class have at least one abstract member, that class must be an abstract class. Otherwise, the compiler will report an error:

![Abstract method error - Abstract Classes in C#](/assets/image/code-maze.com/csharp-abstract-classes/15-Abstrac_method_error.png)

---

## Sealed Classes

If we want to prevent our class to be inherited from, we need to use the `sealed` keyword. If anyone tries to use a sealed class as a base class, the compiler will throw an error:

![Sealed classes error - Abstract Classes in C#](/assets/image/code-maze.com/csharp-abstract-classes/15.1-Sealed-classes-error-1.png)

---

## Conclusion

In this article, we have learned:

- How to create an abstract class
- How to use abstract members and how to implement them
- What a sealed class is and its purpose

In the next article, we are going to talk about [**Generics in C#**](/code-maze.com/csharp-generics.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Abstract Classes",
  "desc": "In this article you are going to laearn about Abstract Classes in C#, how to create them and what is Seald class as well.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-abstract-classes.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
