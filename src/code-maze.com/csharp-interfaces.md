---
lang: en-US
title: "C# Intermediate – Interfaces"
description: "Article(s) > C# Intermediate – Interfaces"
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
      content: "Article(s) > C# Intermediate – Interfaces"
    - property: og:description
      content: "C# Intermediate – Interfaces"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-interfaces.html
prev: /programming/cs/articles/README.md
date: 2018-10-12
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-interfaces/banner.png
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
  name="C# Intermediate – Interfaces"
  desc="In this article you are going to learn about Interfaces in C#, how to define them, implement them, work with multiple interfaces and more..."
  url="https://code-maze.com/csharp-interfaces/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-interfaces/banner.png"/>

Inheriting from a class is a powerful mechanism, but the real inheritance power comes from an interface. An interface provides the members that a class that inherits from an interface must implement.

We can look at the interface as a contract which states that a class that implements an interface must implement all the members from it.

::: details This article is part of the series

- [**Classes and Constructors**](/code-maze.com/csharp-classes-constructors.md)
- [**Properties**](/code-maze.com/csharp-properties.md)
- [**Static Members, Constants, and Extension Methods**](/code-maze.com/csharp-static-members-constants-extension-methods.md)
- [**Anonymous and Nullable Types**](/code-maze.com/csharp-anonymous-nullable-types.md)
- [**Structures**](/code-maze.com/csharp-structures.md)
- [**Enumerations**](/code-maze.com/csharp-enumerations.md)
- [**Inheritance**](/code-maze.com/csharp-inheritance.md)
- Interfaces (Current article)
<!-- - [**Interfaces**](/code-maze.com/csharp-interfaces.md) -->
- [**Abstract Classes**](/code-maze.com/csharp-abstract-classes.md)
- [**Generics**](/code-maze.com/csharp-generics.md)
- [**Queue, Stack, Hashtable**](/code-maze.com/csharp-queue-stack-hashtable.md)
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- [**Delegates**](/code-maze.com/csharp-delegates.md)

:::

If you want to see the complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Interfaces in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/interfaces).

:::

---

## Defining an Interface

To define an interface we need to use the `interface` keyword. It is quite similar to defining a class just we use another keyword. Inside that interface, we specify our members without access modifier and implementation. So, we just provide a declaration for members, an implementation is a job for a class that implements that interface:

```cs
interface InterfaceName
{
    returnType methodName(paramType paramName...);
}
```

---

## Implementing an Interface

To implement an interface, we declare a class or structure that inherits from the interface and implements **all the members** from it:

```cs
class ClassName: InterfaceName
{
    //members implementation
}
```

Let’s see all of this through the example:

```cs
public interface IWriter
{
    void WriteFile();
}

public class XmlWriter: IWriter
{
    public void WriteFile()
    {
        Console.WriteLine("Writing file in the XmlWriter class.");
    }
}

public class JsonWriter: IWriter
{
    public void WriteFile()
    {
        Console.WriteLine("Writing file in the JsonWritter class.");
    }
}
```

As we can see, after our classes inherit from an interface, they must implement the member `WriteFile()`. Otherwise, we would get a compiler error.

When we implement an interface, we must ensure to provide method implementation by following these rules:

- The method names and return types must match exactly
- Any parameters must match exactly
- All the methods must be public during implementation. This is only not the case with the explicit interface implementation(we will talk about that a little later)

A class can inherit from a class and implement an interface at the same time. But if this is the case, we must specify a base class first and then an interface comma-separated:

```cs
public interface IWriter
{
    void WriteFile();
}

public class FileBase
{
    public virtual void SetName()
    {
        Console.WriteLine("Setting name in the base Writer class.");
    }
}

public class XmlWriter: FileBase, IWriter
{
    public void WriteFile()
    {
        Console.WriteLine("Writing file in the XmlWriter class.");
    }

    public override void SetName()
    {
        Console.WriteLine("Setting name in the XmlWriter class.");
    }
}

public class JsonWriter: FileBase, IWriter
{
    public void WriteFile()
    {
        Console.WriteLine("Writing file in the JsonWritter class.");
    }

    public override void SetName()
    {
        Console.WriteLine("Setting name in the JsonWriter class.");
    }
}
```

---

## Referencing Classes Through Interfaces

In the same way that we can reference an object by using a class variable, we can define an object by using an interface variable:

```cs
XmlWriter writer = new XmlWriter();
writer.SetName(); //overridden method from a base class
writer.WriteFile(); //method from an interface
```

As we can see, all the methods are available through the `writer` object. But let’s now use an interface object for referencing action:

```cs
IWriter writer = new XmlWriter();
writer.WriteFile(); //method from an interface
writer.SetName(); //error the SetName method is not part of the IWriter interface
```

If we use an interface to create an object, we can access only those members declared in that interface.

As we mentioned above, the interface provides a contract for the class that inherits from it. This is a great advantage of using interfaces, we can always be sure when a class inherits from our interface it will implement all of its members.

However, the interface implementation has even more advantages. One of them is object decoupling.

---

## Using an Interface to Decouple Classes

When one class depends on another class those classes are coupled. This is something we want to avoid because if something changes in Class A and Class B depending heavily on Class A, there is a great possibility that we would have to change Class B as well. Or at least, we won’t be sure if Class B still works properly. Consequently, we want our classes to be loosely coupled or “decoupled”.

Let’s see what would happen if we create our classes as strongly coupled:

```cs
public class XmlFileWriter
{
    private XmlWriter _xmlWriter;

    public XmlFileWriter(XmlWriter xmlWriter)
    {
        _xmlWriter = xmlWriter;
    }

    public void Write()
    {
        _xmlWriter.WriteFile();
    }
}
```

This `XmlFileWriter` is a class that has the purpose of writing to an xml file. Now we can instantiate our `XmlWriter` class, send the object through the `XmlFileWriter` constructor and call the `Write` method:

```cs
class Program
{
    static void Main(string[] args)
    {
        XmlWriter xmlWriter = new XmlWriter();
        XmlFileWriter fileWriter = new XmlFileWriter(xmlWriter);
        fileWriter.Write();
    }
}
```

Ok, everything works great for now.

But we have a couple of problems here. Our `XmlFileWriter` class is strongly coupled to the `XmlWriter` class. If we change the `WriteFile` method inside the `XmlWriter` class, we must change it in the `XmlFileWriter` class as well. So, the change in one class leads to change in another. That’s not how we want our code to work.

Another thing. We surely want to have the same behavior for our `JsonWriter` class. We can’t use this `XmlFileWriter` (because it accepts only the `XmlWriter` object), we must create another class and repeat all of our actions. This is pretty bad as well.

Finally, we can ask ourselves, if we need two classes for the same job. Why can’t we use just one? Well, that’s where interfaces come in.

Let’s modify the `XmlFileWriter` class:

```cs
public class FileWriter
{
    private readonly IWriter _writer;

    public FileWriter(IWriter writer)
    {
        _writer = writer;
    }

    public void Write()
    {
        _writer.WriteFile();
    }
}
```

Excellent. This is so much better.

Now our class name tells us that this class doesn’t write only xml files. Furthermore, we are not restricting our constructor to accept just `XmlWriter` class, but all the classes that inherit from the `IWriter` interface. Our method `WriteFile` can’t be renamed now because of our interface `IWritter`, which states that all classes must implement a method with an identical name. We can see now that `FileWriter` class are decoupled from the `XmlWriter` or from the `JsonWriter`, and that we can send objects of both classes to the `FileWriter` class:

```cs
class Program
{
    static void Main(string[] args)
    {
        XmlWriter xmlWriter = new XmlWriter();
        JsonWriter jsonWriter = new JsonWriter();

        FileWriter fileWriter = new FileWriter(xmlWriter);
        fileWriter.Write();

        fileWriter = new FileWriter(jsonWriter);
        fileWriter.Write();

        Console.ReadKey();
    }
}
```

![Decoupled objects - Interfaces in C#](/assets/image/code-maze.com/csharp-interfaces/13-Loosely_Coupled_Objects.png)

Isn’t this so much better?

Now, we have one class that does its job for any class that inherits from the `IWriter` interface.

This feature is well known as a Dependency Injection.

---

## Working with Multiple Interfaces

A class can inherit just from one base class, but it can implement multiple interfaces. The class must implement all the methods defined in those interfaces:

```cs
public interface IFormatter
{
    void FormatFile();
}

public class XmlWriter: FileBase, IWriter, IFormatter
{
    public void WriteFile()
    {
        Console.WriteLine("Writing file in the XmlWriter class.");
    }

    public override void SetName()
    {
        Console.WriteLine("Setting name in the XmlWriter class.");
    }

    public void FormatFile()
    {
        Console.WriteLine("Formatting file in XmlWriter class.");
    }
}
```

---

## Explicit Interface Implementation

As we already said, a class can implement more than one interface. It’s not unusual that two of those interfaces have a method with the same name, but we still need to implement them in our class. To do that we do not implement a method as we did before, but we need to state the name of the interface first and then the name of a method with parameters:

```cs
public interface Interface1
{
    void MethodExample();
}

public interface Interface2
{
    void MethodExample();
}

public class ExampleClass: Interface1, Interface2
{
    void Interface1.MethodExample()
    {
        Console.WriteLine("");
    }

    void Interface2.MethodExample()
    {
        Console.WriteLine("");
    }

}
```

As we can see, we are not using an access modifier in the method implementation.

---

## Conclusion

In this article, we have learned:

- How to define and implement an interface
- How to reference a class through the interface
- The way to decouple our objects with interfaces and dependency injection
- To explicitly implement our interfaces

In the next article, we are going to talk about [**Abstract Classes in C#**](/code-maze.com/csharp-abstract-classes.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate – Interfaces",
  "desc": "In this article you are going to learn about Interfaces in C#, how to define them, implement them, work with multiple interfaces and more...",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-interfaces.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
