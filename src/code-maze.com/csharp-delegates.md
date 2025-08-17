---
lang: en-US
title: "C# Intermediate - Delegates"
description: "Article(s) > C# Intermediate - Delegates"
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
      content: "Article(s) > C# Intermediate - Delegates"
    - property: og:description
      content: "C# Intermediate - Delegates"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-delegates.html
prev: /programming/cs/articles/README.md
date: 2018-10-31
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-delegates/banner.png
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
  name="C# Intermediate - Delegates"
  desc="In this article, you will learn about Delegates in C#. Differences between Action and Func delegates and how to write better code with delegates."
  url="https://code-maze.com/csharp-delegates/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/csharp-delegates/banner.png"/>

In this article, we are going to talk more about delegates in C#.

A delegate is a reference to a method. We can use a delegate object to pass it to the code in which we want to call a referenced method, without knowing at compile time which method will be invoked.

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
- [**Generic List and Dictionary**](/code-maze.com/cshart-generic-list-dictionary.md)
- Delegates (Current article)

:::

If you want to see the complete navigation of this tutorial, you can do that here [**C# Intermediate Tutorial**](/code-maze.com/csharp-intermediate-tutorial-oop.md).

::: info

To download the source code, you can visit [Delegates in C# Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/csharp-intermediate-module`)](https://github.com/CodeMazeBlog/csharp-intermediate-module/tree/delegates).

:::

---

## Delegate Syntax

A base syntax to create a delegate object is:

```cs
delegate Result_Type identifier([parameters]);
```

There are three steps in defining and using delegates:

- Declaration of our delegate
- Instantiation, creating the delegate’s object
- Invocation, where we call a referenced method

```cs
//Declaration
public delegate void WriterDelegate(string text);
class Program
{
    public static void Write(string text)
    {
        Console.WriteLine(text);
    }

    static void Main(string[] args)
    {
        //Instantiation
        WriterDelegate writerDelegate = new WriterDelegate(Write);

        //Invocation
        writerDelegate("Some example text.");
    }
}
```

It is important to understand that the return type of a method and the number of parameters must match the delegate’s return type and the number of parameters. Otherwise, we will get a compiler error. We can see in our example that our `Write` method has a void as return type and only one string parameter as well as our delegate.

Delegates are very useful in the encapsulation of our methods.

C# has the two built-in delegates: `Func<T>` and `Action<T>`, there are widely used, so let’s talk more about them.

---

## `Func<T>` Delegate

This delegate encapsulates a method that has up to sixteen parameters and returns a value of the specified type. So, in other words, we use the `Func` delegate only with a method that has a return type other than void.

We can instantiate the `Func` delegate with this syntax:

```cs
Func<Type1, Type2..., ReturnType> DelegateName = new Func<Type1, Type2..., ReturnType>(MethodName);
```

We can see that the last parameter inside square brackets is a return type. Of course, we don’t have to initialize a delegate object like this, we can do it in another way:

```cs
Func< Type1, Type2..., ReturnType> name = MethodName;
```

Let’s see how to use `Func` delegate with an example:

```cs
class Program
{
    public static int Sum(int a, int b)
    {
        return a + b;
    }

    static void Main(string[] args)
    {
        Func<int, int, int> sumDelegate = Sum;
        Console.WriteLine(sumDelegate(10, 20));
    }
}
```

---

## `Action<T>` Delegate

This delegate encapsulates a method that has up to sixteen parameters and doesn’t return any result. So we can assign to this delegate only methods with the void return type.

We can instantiate the `Action` object with this syntax:

```cs
Action<Type1, Type2...> DelegateName = new Action<Type1, Type2...>(MethodName);
```

Or, we can use another way:

```cs
Action < Type1, Type2...> DelegateName = MethodName;
```

Let’s see how to use `Action` delegate with an example:

```cs
public static void Write(string text)
{
    Console.WriteLine(text);
}

static void Main(string[] args)
{
    Action<string> writeDelegate = Write;
    writeDelegate("String parameter to write.");
}
```

---

## Practical Example

In this example, we are going to create an application that executes one of three methods (Sum, Subtract, Multiply) based on a single provided parameter. Basically, if we send `Sum` as a parameter, the Sum method will be executed, and so on. First, we will write this example without delegates and then we will refactor that code by introducing delegates.

So let’s start with the first part:

```cs :collapsed-lines
public enum Operation
{
    Sum,
    Subtract,
    Multiply
}

public class OperationManager
{
    private int _first;
    private int _second;
    public OperationManager(int first, int second)
    {
        _first = first;
        _second = second;
    }

    private int Sum()
    {
        return _first + _second;
    }

    private int Subtract()
    {
        return _first - _second;
    }

    private int Multiply()
    {
        return _first * _second;
    }

    public int Execute(Operation operation)
    {
        switch (operation)
        {
            case Operation.Sum:
                return Sum();
            case Operation.Subtract:
                return Subtract();
            case Operation.Multiply:
                return Multiply();
            default:
                return -1; //just to simulate
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        var opManager = new OperationManager(20, 10);
        var result = opManager.Execute(Operation.Sum);
        Console.WriteLine($"The result of the operation is {result}");

        Console.ReadKey();
    }
}
```

If we start this application, we will get the correct response for any operation we send to the `Execute` method. But this code could be much better and easier to read without `switch-case` expression. If we are going to have more than ten operations (for example), this `switch` block would be very ugly to read and maintain as well.

So, let’s change our code to make it readable, maintainable, and more object-oriented. Let’s introduce a new class `ExecutionManager`:

```cs
public class ExecutionManager
{
    public Dictionary<Operation, Func<int>> FuncExecute { get; set; }
    private Func<int> _sum;
    private Func<int> _subtract;
    private Func<int> _multiply;

    public ExecutionManager()
    {
        FuncExecute = new Dictionary<Operation, Func<int>>(3);
    }

    public void PopulateFunctions(Func<int> Sum, Func<int> Subtract, Func<int> Multiply)
    {
        _sum = Sum;
        _subtract = Subtract;
        _multiply = Multiply;
    }

    public void PrepareExecution()
    {
        FuncExecute.Add(Operation.Sum, _sum);
        FuncExecute.Add(Operation.Subtract, _subtract);
        FuncExecute.Add(Operation.Multiply, _multiply);
    }
}
```

Here, we create a dictionary that will hold all the operations and all the references towards our methods (Func delegates). Now we can inject this class into the `OperationManager` class and change the `Execute` method:

```cs :collapsed-lines
public class OperationManager
{
    private int _first;
    private int _second;
    private readonly ExecutionManager _executionManager;

    public OperationManager(int first, int second, ExecutionManager executionManager)
    {
        _first = first;
        _second = second;
        _executionManager = executionManager;
        _executionManager.PopulateFunctions(Sum, Subtract, Multiply);
        _executionManager.PrepareExecution();
    }

    private int Sum()
    {
        return _first + _second;
    }

    private int Subtract()
    {
        return _first - _second;
    }

    private int Multiply()
    {
        return _first * _second;
    }

    public int Execute(Operation operation)
    {
        return _executionManager.FuncExecute.ContainsKey(operation) ?
            _executionManager.FuncExecute[operation]() :
            -1;
    }
}
```

Now, we are configuring all in the constructor of the `OperationManager` class and executing our action in the `Execute` method if it contains the required operation. At the first look, we can see how much better this code is.

Finally, we need to change the `Program` class:

```cs
class Program
{
    static void Main(string[] args)
    {
        var executionManager = new ExecutionManager();
        var opManager = new OperationManager(20, 10, executionManager);
        var result = opManager.Execute(Operation.Sum);
        Console.WriteLine($"The result of the operation is {result}");

        Console.ReadKey();
    }
}
```

---

## Conclusion

In this article, we have learned:

- How to instantiate a delegate
- The way to use Func and Action delegates
- How to write a better code by using delegates

If you have been with us along with this entire intermediate series, you’ve hopefully mastered OOP concepts in C#.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "C# Intermediate - Delegates",
  "desc": "In this article, you will learn about Delegates in C#. Differences between Action and Func delegates and how to write better code with delegates.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-delegates.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
