---
lang: en-US
title: "C# Intermediate – Queue, Stack, and Hashtable"
description: "Article(s) > C# Intermediate – Queue, Stack, and Hashtable"
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
      content: "Article(s) > C# Intermediate – Queue, Stack, and Hashtable"
    - property: og:description
      content: "C# Intermediate – Queue, Stack, and Hashtable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-queue-stack-hashtable.html
prev: /programming/cs/articles/README.md
date: 2018-10-24
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-queue-stack-hashtable/banner.png
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
  name="C# Intermediate – Queue, Stack, and Hashtable"
  desc="Let's learn about Queue, Stack, And Hashtable Collections in C#. We'll also show the usage of different methods they provide."
  url="https://code-maze.com/csharp-queue-stack-hashtable/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-queue-stack-hashtable/banner.png"/>

In this article, we are going to talk about the queue, stack, and hashtable collections in C#, how to use them and how to use the methods they provide.

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
- Queue, Stack, Hashtable (Current article)
<!-- - [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md) -->
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see the complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Collections in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/queue-stack-hashtable).

:::

So, let’s start.

---

## Queue Collection

The `queue` collection represents a first-in, first-out collection of objects. This means that we can place our objects in a queue collection in a certain order and remove those objects in the same order. So, the first object which goes in is the first object to go out.

To create an object instance of a `queue` collection we can use two different statements.

By using `System.Collection.Generic` namespace:

```cs
Queue<int> intCollection = new Queue<int>();
```

And by using `System.Collection` namespace:

```cs
Queue queueCollection = new Queue();
```

If we declare an object by providing a type (in our example an int), we can store only integer numbers inside. On the other hand, if we use the second example we can store different data types in a collection because it stores objects.

---

## The Most Common Methods and Properties

The `Enqueue` method adds an element inside a collection:

```cs
Queue queueCollection = new Queue();
queueCollection.Enqueue(54);
queueCollection.Enqueue("John");
queueCollection.Enqueue(54.10);

foreach (var item in queueCollection)
{
      Console.WriteLine(item);
}
```

When we want to  remove an element at the beginning of the collection and return it, we are going to use the `Dequeue` method:

```cs
Queue queueCollection1 = new Queue();
queueCollection1.Enqueue(54);
queueCollection1.Enqueue("John");
queueCollection1.Enqueue(54.10);

int number = Convert.ToInt32(queueCollection1.Dequeue());
Console.WriteLine($"Removed element is: {number}");
Console.WriteLine();

foreach (var item in queueCollection1)
{
    Console.WriteLine(item);
}
```

The `Peek` method returns the element at the beginning of the collection but does not remove it:

```cs
Queue queueCollection2 = new Queue();
queueCollection2.Enqueue(54);
queueCollection2.Enqueue("John");
queueCollection2.Enqueue(54.10);
            
int peekNumber = Convert.ToInt32(queueCollection2.Peek());
Console.WriteLine($"Returned element is: {number}");
Console.WriteLine();

foreach (var item in queueCollection2)
{
    Console.WriteLine(item);
}
```

The `Clear` method removes all the elements from a collection.

If we want to check how many elements we have inside a collection, we can use the `Count` property:

```cs
queueCollection2.Clear();
Console.WriteLine(queueCollection2.Count);
```

---

## Stack Collection

A `stack` collection represents a simple last-in, first-out collection. It means that an element that enters first in a collection will exit last.

As with a `Queue` collection, we can use the `System.Collection` and `System.Collection.Generic` namespaces:

```cs
Stack stack = new Stack();
Stack<int> stackInt = new Stack<int>();
```

---

## Related Methods and Properties

The `Push` method inserts an object at the top of the collection:

```cs
Stack stack1 = new Stack();
stack1.Push(328);
stack1.Push("Fifty Five");
stack1.Push(124.87);

foreach (var item in stackCollection1)
{
    Console.WriteLine(item);
}
```

`Pop` removes the element which was included last in a collection and returns it:

```cs
Stack stackCollection2 = new Stack();
stackCollection2.Push(328);
stackCollection2.Push("Fifty Five");
stackCollection2.Push(124.87);

double number = Convert.ToDouble(stackCollection2.Pop());
Console.WriteLine($"Element removed from a collection is: {number}");

foreach (var item in stackCollection2)
{
    Console.WriteLine(item);
}
```

`Peek` returns an object ready to exit the collection, but it doesn’t remove it:

```cs
Stack stackCollection3 = new Stack();
stackCollection3.Push(328);
stackCollection3.Push("Fifty Five");
stackCollection3.Push(124.87);

double number1 = Convert.ToDouble(stackCollection3.Peek());
Console.WriteLine($"Element returned from a collection is: {number}");

foreach (var item in stackCollection3)
{
    Console.WriteLine(item);
}
```

To remove all objects from a collection, we use the `Clear` method.

If we want to count the number of elements, we use the `Count` property:

```cs
stackCollection3.Clear();
Console.WriteLine(stackCollection3.Count);
```

---

## Hashtable

The Hashtable represents a collection of a key-value pair that is organized based on the hash code of the key. Differently, from the queue and stack collections, we can instantiate a hashtable object by using the only `System.Collections` namespace:

```cs
Hashtable hashTable = new Hashtable();
```

A Hashtable’s constructor has fifteen overloaded constructors.

---

## Common Methods In The Hashtable Collection

The `Add` method adds an element with the specified key and value into the collection:

```cs
Hashtable hashTable = new Hashtable();
hashTable.Add(Element.First, 174);
hashTable.Add(Element.Second, "Sixty");
hashTable.Add(Element.Third, 124.24);
foreach (var key in hashTable.Keys)
{
    Console.WriteLine($"Key: {key}, value: {hashTable[key]}");
}
```

The `Remove` method removes the element with the specified key from a collection:

```cs
Hashtable hashTable1 = new Hashtable();
hashTable1.Add(Element.First, 174);
hashTable1.Add(Element.Second, "Sixty");
hashTable1.Add(Element.Third, 124.24);

hashTable1.Remove(Element.Second);

foreach (var key in hashTable1.Keys)
{
    Console.WriteLine($"Key: {key}, value: {hashTable[key]}");
}
```

`ContainsKey`  determines whether a collection contains a specific key:

```cs
if (hashTable.ContainsKey(Element.Second))
{
      Console.WriteLine($"Collection contains key: {Element.Second} and its value is {hashTable[Element.Second]}");
}
```

The `ContainsValue` method determines whether a collection contains a specific value.

`Clear` removes all elements from a collection:

```cs
hashTable.Clear();
```

---

## Common Properties in the Hashtable Collection

`Count` property counts the number of elements inside a collection:

```cs
Console.WriteLine(hashTable.Count);
```

`Keys` property returns all the keys from a collection and the `Value` property returns all the values from a collection:

```cs
Hashtable hashTable2 = new Hashtable();
hashTable2.Add(Element.First, 174);
hashTable2.Add(Element.Second, "Sixty");
hashTable2.Add(Element.Third, 124.24);

var keys = hashTable2.Keys;
foreach (var key in keys)
{
     Console.WriteLine(key);
}
Console.WriteLine();

var values = hashTable2.Values;
foreach (var value in values)
{
     Console.WriteLine(value);
}
```

---

## Conclusion

In this article, we have learned:

- To use the Queue collection with its methods
- To use the Stack collection with its methods
- How to use Hashtable collection with its methods

In the next article, we are going to talk about [**List and Dictionary in C#**](/code-maze.com/cshart-generic-list-dictionary.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Queue, Stack, and Hashtable",
  "desc": "Let's learn about Queue, Stack, And Hashtable Collections in C#. We'll also show the usage of different methods they provide.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-queue-stack-hashtable.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
