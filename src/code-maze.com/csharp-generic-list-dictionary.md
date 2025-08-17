---
lang: en-US
title: "C# Intermediate - Generic List and Dictionary"
description: "Article(s) > C# Intermediate - Generic List and Dictionary"
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
      content: "Article(s) > C# Intermediate - Generic List and Dictionary"
    - property: og:description
      content: "C# Intermediate - Generic List and Dictionary"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-generic-list-dictionary.html
prev: /programming/cs/articles/README.md
date: 2018-10-26
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-generic-list-dictionary/banner.png
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
  name="C# Intermediate - Generic List and Dictionary"
  desc="In this article, you will learn about Generic List and Dictionary in C#. You will learn how lists work, how we can use tham and how to use key value pairs."
  url="https://code-maze.com/csharp-generic-list-dictionary"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-generic-list-dictionary/banner.png"/>

In this article, we are going to talk more about Generic List and Dictionary in C#. A `List<T>` and `Dictionary` are very useful collections in C#, and we are going to discover its features in the rest of the article.

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
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- Generic List and Dictionary (Current article)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

To download the source code, you can visit [the Generic List and Dictionary in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/list-dictionary).

---

## `List<T>`

A `List<T>` represents a strongly typed collection of objects that can be accessed by index.

To instantiate a `List<T>` we need to provide a type between the angle brackets:

```cs
List<int> numberList = new List<int>();
List<Student> students = new List<Student>();
```

It has two more constructors that we can use to initialize a List object. With the first one, we can set initial capacity:

```cs
List<int> numbers = new List<int>(2);
```

With the second one, we can populate our list with the IEnumerable collection:

```cs
int[] nums = new int[5] { 1, 2, 3, 4, 5 };
List<int> numbers = new List<int>(nums);
```

To access any element we can specify its index position:

```cs
int number = numbers[1];
```

### Methods and Properties

The `Add` method adds the element inside a list:

```cs
List<int> numbers = new List<int>();
numbers.Add(34);
numbers.Add(58);
numbers.Add(69);

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

`AddRange` adds the elements of the specified collection to the end of a list:

```cs
List<int> numbers = new List<int>();
numbers.Add(34);
numbers.Add(58);
numbers.Add(69);

int[] nums = new int[] { 1, 22, 44 };

numbers.AddRange(nums);

foreach (int number in numbers)
{
     Console.WriteLine(number);
}
```

`Contains` determines whether an element exists in the list:

```cs
if(numbers.Contains(34))
{
     Console.WriteLine("The number 34 exists in a list");
}
```

The `IndexOf` method returns the position of an element as an integer number. If an element couldn’t be found, this method returns -1:

```cs
int index;
if((index = numbers.IndexOf(58)) != -1)
{
    Console.WriteLine($"The number 58 is on the index: {index}");
}
```

`LastIndexOf` is similar to a previous method except it returns a last occurrence of the element.

`CopyTo` method copies the entire collection to a compatible array, starting from the beginning of that array:

```cs
int[] copyArray = new int[6];

numbers.CopyTo(copyArray);

foreach (int copyNumber in copyArray)
{
     Console.WriteLine(copyNumber);
}
```

The `Remove` method removes the first occurrence of a specific element from the list:

```cs
numbers.Remove(69);
```

The Clear method clears all the elements from a list:

```cs
numbers.Clear();
```

We can check how many elements a list has by using the `Count` property:

```cs
Console.WriteLine(numbers.Count);
```

---

## Dictionary

`Dictionary` represents a collection of keys and values. To instantiate an object we can use the following syntax:

```cs
Dictionary<KeyType, ValueType> Name = new Dictionary<KeyType, ValueType>();
```

The KeyType represents a type for our key in a collection. The ValueType represents the value assigned to the key. So, we can extract our value from a collection by using the key inside the square brackets:

```cs
DictionaryName[key];
```

Dictionary has several constructors we can use to instantiate objects:

```cs
Dictionary<string, int> dictExample = new Dictionary<string, int>();

Dictionary<string, int> dictExample1 = new Dictionary<string, int>(5); //to set initial size

Dictionary<string, int> dictExample2 = new Dictionary<string, int>(dictExample1); //accepts all the elements from created Key-Value collection
```

### Methods and Properties

The `Add` method adds the key-value pair inside a collection:

```cs
Dictionary<string, int> dictExample = new Dictionary<string, int>();

dictExample.Add("First", 100);
dictExample.Add("Second", 200);
dictExample.Add("Third", 300);

foreach (var item in dictExample)
{
     Console.WriteLine(dictExample[item.Key]);
}
```

`Remove` removes the key-value pair from a collection based on the specified key:

```cs
dictExample.Remove("Second");
foreach (var item in dictExample)
{
     Console.WriteLine(dictExample[item.Key]);
}
```

`ContainsKey` determines if a collection contains a specific key.

`ContainsValue` determines if a collection contains a specific value:

```cs
if(dictExample.ContainsKey("First"))
{
     Console.WriteLine("It contains key");
}

if(dictExample.ContainsValue(300))
{
      Console.WriteLine("It contains value");
}
```

The `Clear` method removes all key-value pairs from a collection:

```cs
dictExample.Clear();
```

If we want to count all of our elements inside a collection, we can use the `Count` property. If we want to get a collection of containing `Keys` or containing `Values` from a dictionary, we can use the `Keys` and `Values` properties:

```cs
Console.WriteLine(dictExample.Count);

foreach (var key in dictExample.Keys)
{
     Console.WriteLine(key);
}

foreach (var value in dictExample.Values)
{
     Console.WriteLine(value);
}
```

---

## Conclusion

In this article, we have learned:

- To use the `List<T>` collection with its methods
- To use a Dictionary with its methods and properties

In the next article, we are going to talk about [**Delegates in C#**](/code-maze.com/csharp-delegates.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate - Generic List and Dictionary",
  "desc": "In this article, you will learn about Generic List and Dictionary in C#. You will learn how lists work, how we can use tham and how to use key value pairs.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-generic-list-dictionary.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
