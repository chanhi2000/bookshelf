---
lang: en-US
title: "C# Intermediate - Generics"
description: "Article(s) > C# Intermediate - Generics"
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
      content: "Article(s) > C# Intermediate - Generics"
    - property: og:description
      content: "C# Intermediate - Generics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-generics.html
prev: /programming/cs/articles/README.md
date: 2018-10-19
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: https://code-maze.com/wp-content/uploads/2018/10/10-Generics.png
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
  name="C# Intermediate - Generics"
  desc="In this article you will learn more about Generics in C#. We will talk about Generic Types, whata are the constraints and generic methods."
  url="https://code-maze.com/csharp-generics/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-generics/banner.png"/>

C# provides generics to help us remove the need for casting, to improve type safety and make it easier to create generic classes and generic methods.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- [**Structures**](/code-maze.com/csharp-structures.md)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
- [**Inheritance**](/code-maze.com/csharp-inheritance.md)
- [**Interfaces**](/code-maze.com/csharp-interfaces.md)
- [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md)
- Generics (Current article)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Generics in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/generics).

:::

---

## Generic Type T

To create a generic class, we need to provide a type between angle brackets:

```cs
public class CollectionInitializer<T>
{
    ...
}
```

The `T` in this example acts as a placeholder for a type we want to work with. We need to provide that type once we instantiate this generic class. So let’s see this with a simple example:

```cs
public class CollectionInitializer<T>
{
    private T[] collection;

    public CollectionInitializer(int collectionLength)
    {
        collection = new T[collectionLength];
    }

    public void AddElementsToCollection(params T[]elements)
    {
        for(int i=0; i<elements.Length; i++)
        {
            collection[i] = elements[i];
        }
    }

    public T[] RetrieveAllElements()
    {
        return collection;
    }

    public T RetreiveElementOnIndex(int index)
    {
        return collection[index];
    }
}
```

And to use this generic class:

```cs
class Program
{
    static void Main(string[] args)
    {
        CollectionInitializer<int> initializer = new CollectionInitializer<int>(5);

        initializer.AddElementsToCollection(5, 8, 12, 74, 13);
        int[] collection = initializer.RetrieveAllElements();
        int number = initializer.RetreiveElementOnIndex(3);

        foreach (int element in collection)
        {
            Console.WriteLine(element);
        }

        Console.WriteLine();
        Console.WriteLine($"Element on the selected index is: {number}");

        Console.ReadKey();
    }
}
```

As we can see in our `CollectionInitializer` class, we need to provide the type which we want to work with. Then, we can just call the methods implemented within our generic class. Of course, we didn’t implement safety checks (if we send more elements than the array length is etc) just for a sake of simplicity. Now we can see the result:

![Generic example - Generics in C#](/assets/image/code-maze.com/csharp-generics/16-Generic_example.png)

A generic class can have more than one type parameter:

```cs
public class CollectionKeyValueInitializer<TKey, TValue>
```

---

## Constraints with Generics

Sometimes, we want to ensure that just certain types can be invoked with our generic class. It is often useful while working with classes or interfaces. We can do that by using the where keyword:

```cs
public class CollectionInitializer<T> where T: Student
```

or we can limit our generic class to work only with classes:

```cs
public class CollectionInitializer<T> where T: class
```

There are different variations for this constraints, they depend on the situation we are working in. It is important to know that if we constraint our generic class to work only with classes, we will get an error if we provide value type. If we want to work only with value types, we can constraint our generic class like this:

```cs
public class CollectionInitializer<T> where T: struct
```

---

## Generic Methods

In the same way that we can create a generic class, we can create a generic method. We just need to set a type parameter in angle brackets right behind a method name:

```cs
public void ExampleMethod<T>(T param1, T param2)
{
    //Methods body
}
```

We must pay attention to the type parameter identifier if our generic method exists inside a generic class. If that class has a type T then, our method needs to have a different type (U, Y, R…). Otherwise, the type T from a method will hide the type T from a class.

---

## Conclusion

In this article, we have learned:

- How to use Generics in C#
- How to implement constraints in our generic classes
- The way to create generic methods

In the next article, we are going to talk about [**Queue, Stack, and Hashtable in C#**](/code-maze.com/csharp-queue-stack-hashtable.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate - Generics",
  "desc": "In this article you will learn more about Generics in C#. We will talk about Generic Types, whata are the constraints and generic methods.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-generics.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
