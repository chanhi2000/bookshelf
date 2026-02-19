---
lang: en-US
title: "How To Use LINQ in C# – With Code Examples"
description: "Article(s) > How To Use LINQ in C# – With Code Examples"
icon: iconfont icon-csharp
category: 
  - C#
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Use LINQ in C# – With Code Examples"
    - property: og:description
      content: "How To Use LINQ in C# – With Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-linq.html
prev: /programming/cs/articles/README.md
date: 2024-07-16
isOriginal: false
author:
  - name: Grant Riordan
    url: https://freecodecamp.org/news/author/grantdotdev/
cover: https://freecodecamp.org/news/content/images/2024/07/How-to-use-linq.png
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
  name="How To Use LINQ in C# – With Code Examples"
  desc=".Net (pronounced as ”dot net”) has many internal libraries and tools, but one that wields great power is LINQ (Language Integrated Query). It can be used in two ways: the language-level query syntax, or the LINQ API. In this article, we'll explore: ..."
  url="https://freecodecamp.org/news/how-to-use-linq"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/How-to-use-linq.png"/>

.Net (pronounced as "dot net") has many internal libraries and tools, but one that wields great power is LINQ (Language Integrated Query). It can be used in two ways: the language-level query syntax, or the LINQ API.

In this article, we'll explore:

- What LINQ is.
- How to use it.
- Examples of some common LINQ methods.

We'll be utilizing an `Animal` class in this article:

```cs
public class Animal
{
    public string Name { get; set; }
    public int Age {get;set;}
    public string Sound { get; set; }
}
```

---

## Language Level Query Syntax

You may see something that resembles a SQL query in some code snippets. For example:

```cs
var animals = new List<Animal>
{
    new Animal { Name = "Dog", Age = 2, Sound = "Bark" },
    new Animal { Name = "Cat", Age = 2, Sound = "Meow" },
    new Animal { Name = "Fox", Age = 5, Sound = "Bark" }
};


var barkingAnimals =
    from animal in animals
    where animal.Sound == "Bark"
    select animal;
```

You can build queries similar to SQL for complex tasks, but this can be excessive. You can simplify these queries using the LINQ API methods syntax.

---

## Method Syntax

The LINQ API methods utilizes a predicate (in the form of a lambda extension) to determine the criteria.

We can write the above query using the method syntax like so:

```cs
var barkingAnimals = animals.Where(x=> x.Sound == "Bark").ToList();
```

It's a lot easier to write and much more concise for such a simple query.

It reads a lot better too: barking Animals equals all the animals where the sound property equals `Bark`.

LINQ querying methods all return an `IQueryable` object. This informs the compiler that the variable is not the result of the query, but the definition of the query. [see deferred execution later in this article.]

In order to use the results of the query we can either:

- Iterate over the "queryable" object (for example: using a ForEach loop)
- Convert to an IEnunerable type. For example: a List/Array.

---

## Common LINQ API Methods

OrderBy Method

`OrderBy` is a useful LINQ API method that lets you order any IEnumerable object.

We can use it like so:

```cs

var orderedByAge = people.OrderBy(x=>x.Age);

// or

var orderedByAgeDescending = people.OrderByDescending(x=>x.Age);
```

The above shows examples of ordering by Age in both ascending and descending order.

### First Method

```cs
var first = animals.First(x=> x.Sound == "Bark");
```

This will return the first object from the list that matches the criteria.

### Single and SingleOrDefault Method

This is used when you know/expect that there will be only one object that matches your criteria.

Example:

```cs
var cat = animals.Single(x=>x.Name == "Cat");
```

Data can change over time, leading to unexpected results. Writing defensive code is important. If multiple objects named "Cat" are found, an uncaught error will occur. To prevent this, use the `SingleOrDefault` method, which returns a default value (null for strings) on error. Then check if the cat variable is not null.

```cs
var cat = animals.SingleOrDefault(x=> x.Name=="Cat");

if(cat != null){
  Console.WriteLine("A single cat was found");
}
```

### Select Method

Let's say that you wish to return only the types of animal, from the `Animal` object. This can be accomplished with the `Select` method. This will create a new object for each element in the list/array.

```cs
var typesOfAnimal = animals.Select(x=>x.Name).ToList();
```

But what if you want to return their name and sound? That's just as easy with the `Select` method. However, you'll have to create an anonymous object instead of just returning the property.

```cs
var animals = animals.Select(x=> { Name = x.Name, 
Noise = x.Sound}).ToList();
```

This should now return a list of anonymous objects, with a `Name` and a `Sound` property.

---

## How to Combine Methods

Using the `People` class:

```cs
public class Person
{
    public string Name { get; set; }
    public string Address { get; set; }
}

var people = new List<Person>()
{
    new() { Name = "Harry Potter", Address = "123 Privet Drive, Hogwarts, United Kingdom" },
    new() { Name = "Alex the Kidd", Address = "Rock Paper Scissors Avenue, United Kingdom" },
    new() { Name = "Donkey Kong", Address = " The Monkey Temple, Jungle" }
};
```

You can combine LINQ API methods to carry out multiple actions. Take the following scenario as an example:

We want to find all the people in a list whose address contains "United Kingdom".

To accomplish this, you can utilize a combination of `Where()`and `Contains()`, passing the `Contains()` function as part of the predicate.

```cs
var ukResidents = peopleList.Where(p => p.Address.Contains("United Kingdom")).ToList();
```

---

## Deferred Execution

LINQ queries use what's called deferred execution. This means that the query will not be executed immediately when it is defined.

Instead, it is executed when the query results are iterated or when certain operators trigger the execution explicitly. This deferred execution enables optimizations and improves performance by avoiding unnecessary computations.

This goes back to what I discussed earlier with the conversion of `IQueryable` to another object. For example, a list using `.ToList()`. It's the `ToList()`that converts the `IQueryable` object to a list and actually executes the query.

Lets take a look at an example:

```cs
var people = new List<Person>()
{
    new() { Name = "Harry Potter", Address = "123 Privet Drive, Hogwarts, United Kingdom" },
    new() { Name = "Alex the Kidd", Address = "Rock Paper Scissors Avenue, United Kingdom" },
    new() { Name = "Donkey Kong", Address = " The Monkey Temple, Jungle" }
};

// then we'll define the query
var peopleCalledHarryPotter = people.Where(x => x.Name == "Harry Potter");

// this will create the query object, You could write other code here.

// now convert the IQueryable query object to a List, thus invoking the actual query.

var list = peopleCalledHarryPotter.ToList();
```

Though a basic example, this demonstrates that you can create a queryable object and execute additional code before actually running the query using the `.ToList()` extension method.

---

## How to Chain IQueryable API Methods

Similar to combining `Where` and `Contains`, you can further enhance your queries by chaining LINQ API methods.

For example, using `Where()` and `GroupBy()` together allows you to filter and then group data by a property.

Let's apply what we've learned and chain these methods. Instead of using `.ToList()` to create a new variable with the results, we can utilize the query object within a `ForEach` loop to execute the query and iterate over the results simultaneously.

Update the `Person` class to have a `Age` property:

```cs
public class Person
{
    public string Name { get; set; }
    public string Address { get; set; }    
    public int Age { get; set; }
}
```

Then look at the following code, which will first filter the list of people, and then group them based on `Age`.

```cs
using System;
using System.Collections.Generic;
using System.Linq;

public class Program
{
    public static void Main()
    {
        List<Person> people = new List<Person>
        {
            new Person { Name = "John", Age = 30 },
            new Person { Name = "Alice", Age = 25 },
            new Person { Name = "Bob", Age = 30 },
            new Person { Name = "Charlie", Age = 25 },
            new Person { Name = "Eve", Age = 35 }
        };

        var groupsOfPeople = people
            .Where(p => p.Age >= 30)  // Filter people with age >= 30
            .GroupBy(p => p.Age);    // Group people by their age

        foreach (var group in groupsOfPeople)
        {
            Console.WriteLine($"Age Group: {group.Key}"); // output the Age
            foreach (var person in group)
            {
                Console.WriteLine($"Name: {person.Name}, Age: {person.Age}");
            }
        }
    }
}
```

This combination of LINQ methods allow us to define more complex quieries without using the Language Level Query Syntax.

Sometimes it can based on personal preference, but I believe the method syntax is much more readable.

---

## Conclusion

In this article, we've explored the power of LINQ in .NET, comparing its language-level query syntax and method syntax. We've demonstrated how to simplify complex queries using LINQ API methods and discussed common methods like `OrderBy`, `First()`, `Single()`, `SingleOrDefault()`, and `Select`.

We highlighted the importance of writing defensive code and the concept of deferred execution, which optimizes performance. By combining and chaining LINQ methods, you can create complex, readable queries efficiently.

LINQ is a versatile tool that enhances your ability to handle data in .NET applications. Whether using query syntax or method syntax, LINQ provides a powerful way to write efficient and maintainable code.

::: info

You can find some useful examples on the Microsoft website [<VPIcon icon="fa-brands fa-microsoft"/>here](https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/working-with-linq)

<SiteInfo
  name="Working with LINQ - C#"
  desc="This tutorial teaches you how to generate sequences with LINQ, write methods for use in LINQ queries, and distinguish between eager and lazy evaluation."
  url="https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/working-with-linq/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="https://learn.microsoft.com/dotnet/media/logo_csharp.png"/>


As always I'd welcome comments, or discussion on the topic. You can follow me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter" />`grantdotdev`)](https://twitter.com/grantdotdev)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Use LINQ in C# – With Code Examples",
  "desc": ".Net (pronounced as ”dot net”) has many internal libraries and tools, but one that wields great power is LINQ (Language Integrated Query). It can be used in two ways: the language-level query syntax, or the LINQ API. In this article, we'll explore: ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-linq.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
