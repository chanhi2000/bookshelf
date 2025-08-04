---
lang: en-US
title: "C# Intermediate – Properties"
description: "Article(s) > C# Intermediate – Properties"
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
      content: "Article(s) > C# Intermediate – Properties"
    - property: og:description
      content: "C# Intermediate – Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-properties.html
prev: /programming/cs/articles/README.md
date: 2018-09-21
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-properties/banner.png
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
  name="C# Intermediate – Properties"
  desc="In this article you are going to learn about Properties in C#, how to use them, different property types and about property accessibility."
  url="https://code-maze.com/csharp-properties/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-properties/banner.png"/>

A property is a member that provides a flexible tool to read and write the value of a private field. We use them as public data members but actually, they are specific methods called accessors.

In this article, we are going to talk more about properties and how to use them in C#.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- Properties (Current article)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
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

To download the source code, you can visit [Properties in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/properties).

:::

---

## Property Syntax

The syntax of a property declaration can be used in the following way:

```cs
Access_Modifier Type PropertyName
{
    get
    {
        //read actions
    }
    set
    {
        //write action
    }
}
```

As we can see, a property can contain two blocks of code. The get block contains statements that execute when we read from a property. The set block contains statements that execute when we write to a property:

```cs
public class Student
{
    private string _name;
    private string _lastName;

    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public string LastName
    {
        get { return _lastName; }
        set { _lastName = value; }
    }

    public Student(string name, string lastName)
    {
        _name = name;
        _lastName = lastName;
    }

    public string GetFullName()
    {
        return _name + ' ' + _lastName;
    }

}
```

In the example above we see that our private fields are now exposed through the properties. If we want to read the value of the `_name` field all we have to do is to call the `Name` property with the `student` object. The same applies to the `_lastName` field. Moreover, if we want to set a value to our fields, all we have to do is to call a set block of our properties:

```cs
class Program
{
    static void Main(string[] args)
    {
        Student student = new Student("John", "Doe");

        string name = student.Name; //call to a get block of the Name property
        string lastName = student.LastName; // call to a get block of the LastName property

        student.Name = "David"; //call to a set block of the Name property
        student.LastName = "Dauni"; // call to a set block of the LastName property
    }
}
```

Our properties can have a complex code inside get or set blocks. They are not limited only to read a value or just to write a value. We can use conditions or method calls etc. in the get or set blocks:

```cs
public int X
{
    get 
    {
        return _x;
    }
    set
    {
        _x = CheckValue(value);
    }
}	

private int CheckValue(int val)
{
    //code execution in here
}
```

---

## Read-Only and Write-Only Properties

We can declare a property that only has a `get` block and not the `set`. That kind of property is called Read-Only property. If we create a read-only property, we can only read the value of a private field. It is quite common to create a read-only property inside our class. What we want with it is to set it with the constructor method and then to use its value throughout the entire class, but never to set its value **outside the constructor**. If we try to set it, the compiler will throw an error:

```cs
public string Name
{
    get { return _name; }
}
```

![Read only property error - Properties in C#](/assets/image/code-maze.com/csharp-properties/03-Read_only_prop_error.png)

In the same way, as we can create a read-only property, we can create a write-only property. That type of property has only the set block and not the get. It is not a common case to create write-only properties. Of course, if we need it, we can only set the values with this type of property and not read it:

```cs
public string Name
{
    set { _name = value; }
}
```

![Write only property error - Properties in C#](/assets/image/code-maze.com/csharp-properties/04-Write_only_prop_error.png)

---

## Property Accessibility

We can specify an access modifier for our property (public, private…) if we want to restrict its availability. But in C# we can even override the accessibility of get or set accessors. So, what we can do is declare a public property which has the public get accessor and private set accessor. If our property is a public one, we don’t have to add the public keyword for the get accessor, it is going to be public anyway:

```cs
public string Name
{
     get { return _name; }
     private set { _name = value; }
} 
```

![Privete set accessor - Properties in C#](/assets/image/code-maze.com/csharp-properties/05-Private_set_accessor_error.png)

This means that we can read in all the classes from our Name property, but we can set it only within the `Student` class.

When we use an accessor overriding inside the property, we must pay attention to the following rules:

- We can change the accessibility level of only one accessor. There is no point in having both accessors modified. If we want to modify both accessors, we should just modify the property access level.
- We can’t use access modifier on the get or set blocks that are less restrictive of the access modifier applied on a property itself. So, if our property is private, there is no point in having the public get or set block.

---

## Auto-Implemented Properties

If no additional logic is required in a property accessor, we can use the auto-implemented properties for more readable and concise way of declaring properties. The auto-implemented property consists only of the get and set keywords, nothing more:

```cs
public string Name { get; set; }
public string LastName { get; set; }
```

When we declare the properties like this, the compiler creates a private field for us, which could be accessed only through the property’s get or set accessors.

So in our example instead of:

```cs
private string _name;

public string Name
{
    get { return _name; }
    set { _name = value; }
}
```

We can just write:

```cs
public string Name { get; set; }
```

In the Visual Studio, we are even going to get a suggestion to use an auto property:

![Property suggestion](/assets/image/code-maze.com/csharp-properties/06-Auto-property_suggestion.png)

---

## Conclusion

Excellent.

In this article, we have learned:

- About properties and it’s syntax
- How to use read and write-only properties
- How to modify the accessibility level of the property
- The way to use auto-implemented properties

In the next article, we are going to talk about [**Static methods, static classes, and extension methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md) as well.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Properties",
  "desc": "In this article you are going to learn about Properties in C#, how to use them, different property types and about property accessibility.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-properties.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
