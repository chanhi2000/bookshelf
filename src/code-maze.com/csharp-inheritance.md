---
lang: en-US
title: "C# Intermediate - Inheritance"
description: "Article(s) > C# Intermediate - Inheritance"
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
      content: "Article(s) > C# Intermediate - Inheritance"
    - property: og:description
      content: "C# Intermediate - Inheritance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-inheritance.html
prev: /programming/cs/articles/README.md
date: 2018-10-10
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-inheritance/banner.png
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
  name="C# Intermediate - Inheritance"
  desc="You will learn about C# Inheritance, how to use base keyword, more about polimorphism with the new, virtual and override keywords and what rules to follow."
  url="https://code-maze.com/csharp-inheritance/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-inheritance/banner.png"/>

Inheritance is one of the three key concepts in object-oriented programming. We can use inheritance to avoid repetition when different classes have a number of features in common and are related to each other.

In this post, we are going to talk about C# inheritance, why is it important and what we can use it for.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- [**Structures**](/code-maze.com/csharp-structures.md)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
- Inheritance (Current article)
- [**Interfaces**](/code-maze.com/csharp-interfaces.md)
- [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md)
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Inheritance in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/inheritance).

:::

---

## Using Inheritance

We can define inheritance between two classes by using the following syntax:

```cs
class DerivedClass: BaseClass
{
       
}

class DerivedSubClass: DerivedClass
{

}
```

What this means is that `DerivedSubClass` inherits from the `DerivedClass` and from the `BaseClass` as well, because `DerivedClass` inherits from the `BaseClass`. That way, we can share the class features between multiple classes, even though **the one class can inherit only from one base class**.

So, let’s create some basic inheritance structure:

```cs
public class Writer
{
    public void Write()
    {
        Console.WriteLine("Writing to a file");
    }
}
public class XMLWriter: Writer
{
    public void FormatXMLFile()
    {
        Console.WriteLine("Formating XML file");
    }
}
public class JSONWriter: Writer
{
    public void FormatJSONFile()
    {
        Console.WriteLine("Formating JSON file");
    }
}
```

In this example, the `XMLWriter` and `JSONWriter` classes have they own methods but both of them share the `Write()` method from the base `Writer` class.

So, if we create an object of type `XMLWriter`, we will be able to access its own method and the method from the base class:

```cs
class Program
{
    static void Main(string[] args)
    {
        XMLWriter xmlWriter = new XMLWriter();
        xmlWriter.FormatXMLFile();
        xmlWriter.Write();
    }
}
```

It goes the same for the `JSONWriter` class.

---

## Calling Constructors from the Base Class

From the derived classes, we can access the constructor of a base class. This is used quite common, due to initialization of some properties that are shared between derived classes. We can use the `base` keyword to execute that:

```cs
public class Writer
{
    public string FileName { get; set; }

    public Writer(string fileName)
    {
        FileName = fileName;
    }

    public void Write()
    {
        Console.WriteLine("Writing to a file");
    }
}
public class XMLWriter: Writer
{
    public XMLWriter(string fileName)
        :base(fileName)
    {
    }

    public void FormatXMLFile()
    {
        Console.WriteLine("Formating XML file");
    }
}

public class JSONWriter: Writer
{
    public JSONWriter(string fileName)
        :base(fileName)
    {
    }

    public void FormatJSONFile()
    {
        Console.WriteLine("Formating JSON file");
    }
}
class Program
{
    static void Main(string[] args)
    {
        XMLWriter xmlWriter = new XMLWriter("xmlFileName");
        xmlWriter.FormatXMLFile();
        xmlWriter.Write();
        Console.WriteLine(xmlWriter.FileName);

        JSONWriter jsonWriter = new JSONWriter("jsonFileName");
        jsonWriter.FormatJSONFile();
        jsonWriter.Write();
        Console.WriteLine(jsonWriter.FileName);
    }
}
```

As we can see, we pass a string value to the derived class’s constructors and by using the `base`keyword, we are passing that string value to the constructor of the base class. In there, we set up the value for the `Name` property.

---

## Accessing Classes

The inheritance hierarchy means that our `XMLWriter` (or `JSONWriter`) class is a special type of the `Writer`, it has all the Writer’s non-private members, and additional features declared inside the XML(JSON)Writer class. But there are some limitations to this hierarchy.

Let’s look at the following example:

```cs
XMLWriter xml = new XMLWriter("file.xml");
Writer writer = xml;
writer.Write(); //ok Write is part of the Writer class
writer.FormatXML(); //error FormatXML is not part of the Writer class
```

This means if we refer to the `XMLWriter` or `JSONWriter` object with the `Writer` object, we can just access the methods declared inside the Writer class.

There is one more limitation. We can’t assign a higher rank object to a lower rank object:

```cs
Writer writer = new Writer("any name");
XMLWriter xml = writer; //error
```

But we can solve this problem by using the “`as`” keyword:

```cs
XMLWriter xml = new XMLWriter("any name");
Writer writer = xml; //writer points to xml

XMLWriter newWriter = writer as XMLWriter; //this is ok now because writer was xml
newWriter.FormatXMLFile();
```

---

## Declaring Methods with the New Keyword

In the real world project, we often need to have so many different functionalities, and that usually leads to the existence of many different methods, properties etc. Sometimes it is pretty hard to come up with the unique and meaningful name for our identifiers, especially if we have the inheritance hierarchy. Sooner or later we are going to try to reuse a name that is already in use by one of the classes in the higher hierarchy level. If it comes to that (we have two methods with the same name in derived and base class) we are going to receive a warning:

![Hiding implementation - C# Inheritance](/assets/image/code-maze.com/csharp-inheritance/12-Hiding_implementation_warning.png)

---

## Using the New Keyword

A method in a derived class hides a method in a base class with the same signature. So, as you can see in the picture above, our method `SetName` exists in the `XMLWriter` class and `Writer` class. Since the `XMLWriter` class inherits from the `Writer` class it hides an implementation of the `SetName` method from the `Writer` class.

Although our code will compile and run, we should take this warning seriously. It can happen that another class inherits from the `XMLWriter` class and implements the `SetName` method. The developer may expect to execute the `SetName` method from the `Writer` class (because `XMLWriter` inherits from the `Writer`) but this is not a case. The `SetName` method from the `Writer` class is hidden by the `SetName` method from the `XMLWriter` class.

If we find ourselves in this kind of situation the best way is to change the method signatures. But if we are sure that we want a behavior like this, we can use the `new` keyword. The `new` keyword will simply tell the compiler that we are hundred percent sure in what we are doing and that we don’t want a warning message to appear anymore:

```cs
public class Writer
{
    public string FileName { get; set; }

    public Writer(string fileName)
    {
        FileName = fileName;
    }

    public void Write()
    {
        Console.WriteLine("Writing to a file");
    }

    public void SetName()
    {
        Console.WriteLine("Setting name in the base Writer class");
    }
}
 
public class XMLWriter: Writer
{
    public XMLWriter(string fileName)
        :base(fileName)
    {
    }

    public void FormatXMLFile()
    {
        Console.WriteLine("Formating XML file");
    }

    public new void SetName()
    {
        Console.WriteLine("Setting name in the XMLWriter class");
    }
}
```

Now we don’t have a warning message anymore.

---

## Declaring Methods with the Virtual Keyword

Sometimes, we don’t want to hide an implementation of a method from a base class with the same signature as a method from a derived class. What we want is to provide an opportunity for a different implementation of a method with the same signature in a derived class. So, we want to override our method from a base class with the method inside a derived class.

A method that is intended to be overridden is called a virtual method. When we talk about overriding and hiding, we need to be clear with those terms. The hide means that we want completely to hide the implementation of a method from the base class, but the override means that we want a different implementation of a method from a base class.

To create a virtual method we use the `virtual` keyword:

```cs
public class Writer
{
    public string FileName { get; set; }

    public Writer(string fileName)
    {
        FileName = fileName;
    }

    public void Write()
    {
        Console.WriteLine("Writing to a file");
    }

    public void SetName()
    {
        Console.WriteLine("Setting name in the base Writer class");
    }

    public virtual void CalculateFileSize()
    {
        Console.WriteLine("Calculating file size in a Writer class");
    }
}
```

---

## Declaring Methods with the Override Keyword

If we declare a method as a `virtual` in our base class, we can create a method in a derived class with the keyword `override` to declare another implementation of that method:

```cs
public class XMLWriter: Writer
{
    public XMLWriter(string fileName)
        :base(fileName)
    {
    }

    public void FormatXMLFile()
    {
        Console.WriteLine("Formating XML file");
    }

    public new void SetName()
    {
        Console.WriteLine("Setting name in the XMLWriter class");
    }

    public override void CalculateFileSize()
    {
        Console.WriteLine("Calculating file size in the XMLWriter class");
    }
}
```

If we want, we can call an original implementation of that method in a derived class by using the `base` keyword:

```cs
public class XMLWriter: Writer
{
    ...

    public override void CalculateFileSize()
    {
        base.CalculateFileSize();
        Console.WriteLine("Calculating file size in the XMLWriter class");
    }
}
```

All these inheritance actions and different method implementations with the mentioned keywords has its own unique name **polymorphism.**

---

## Rules to Follow While Working With Polymorphic Methods

There are some important rules which we need to follow when declaring polymorphic methods by using the virtual and override keywords:

- We can’t declare a virtual method as private. Its purpose is to be exposed to a derived class, so making it private is meaningless. Similarly, overridden methods can’t be private because a derived class can’t change the protection level of a method that it inherits
- The signatures of virtual and overridden methods must be identical
- We can override only a virtual method. If we try to override a method that has no virtual keyword, we will get an error
- If we don’t use the override keyword we are not overriding the method we are just hiding it. If this is the behavior we want, we should use the new keyword
- An overridden method is a virtual one as well, so it can be overridden in a further derived class

---

## Conclusion

In this article, we have learned:

- What is inheritance and how to use it
- How to use the new, virtual and override keywords
- Rules of polymorphism in the C# language

In the next article, we are going to talk about [**Interfaces in C#**](/code-maze.com/csharp-interfaces.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate - Inheritance",
  "desc": "You will learn about C# Inheritance, how to use base keyword, more about polimorphism with the new, virtual and override keywords and what rules to follow.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-inheritance.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

