---
lang: en-US
title: "SOLID Principles in C# – Interface Segregation Principle"
description: "Article(s) > SOLID Principles in C# – Interface Segregation Principle"
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
      content: "Article(s) > SOLID Principles in C# – Interface Segregation Principle"
    - property: og:description
      content: "SOLID Principles in C# – Interface Segregation Principle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/interface-segregation-principle.html
prev: /programming/cs/articles/README.md
date: 2019-01-21
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/interface-segregation-principle/banner.png
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
  name="SOLID Principles in C# - Interface Segregation Principle"
  desc="In this article you are going to learn about Interface Segregation Principle, how to implement it and what are the benefits of its implementation."
  url="https://code-maze.com/interface-segregation-principle/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/interface-segregation-principle/banner.png"/>


The Interface Segregation Principle states that no client should be forced to depend on methods it does not use. So, this is the basic definition which we can read in many different articles, but what does this really mean?

Let’s imagine that we are starting a new feature on our project. We start with some code and from that code, an interface emerges with the required declarations. Soon after, the customer decides that they want another feature that is similar to the previous one and we decide to implement the same interface in another class. But now, as a consequence, we don’t need all the methods from that interface, just some of them. Of course, we have to implement all the methods, which we shouldn’t have to, and that’s the problem and where the ISP helps us a lot.

Basically, the ISP states that we should reduce code objects down to the smallest required implementation thus creating interfaces with only required declarations. As a result, an interface that has a lot of different declarations should be split up into smaller interfaces.

Let’s see how this looks in an example.

::: info Series

```component VPCard
{
  "title": "SOLID Principles in C# – Single Responsibility Principle",
  "desc": "In this article you will learn how to implement Single Responsibility Principle (SRP) in your code thus making it better, readable and maintainable as well.",
  "link": "/code-maze.com/single-responsibility-principle.md",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

```component VPCard
{
  "title": "SOLID Principles in C# – Open Closed Principle",
  "desc": "In this article you will learn about Open Closed Principle, how to implement it step by step and why it is important while developing a project.",
  "link": "/code-maze.com/open-closed-principle.md",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

```component VPCard
{
  "title": "SOLID Principles in C# – Liskov Substitution Principle",
  "desc": "In this article you will learn more about Liskov Substitution Principle, how to achieve it in your code and why should we use it.",
  "link": "/code-maze.com/liskov-substitution-principle.md",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

```component VPCard
{
  "title": "SOLID Principles in C# – Interface Segregation Principle",
  "desc": "In this article you are going to learn about Interface Segregation Principle, how to implement it and what are the benefits of its implementation.",
  "link": "/code-maze.com/interface-segregation-principle.md",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

```component VPCard
{
  "title": "SOLID Principles in C# – Dependency Inversion Principle",
  "desc": "In this article you are going to learn about Dependency Inversion Principle, how to implement this principle and what are the benefits of implementation.",
  "link": "/code-maze.com/dependency-inversion-principle.md",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

:::

::: info

To download the source code for this project, check out the [Interface Segregation Principle Project Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/solid-principles-csharp`)](https://github.com/CodeMazeBlog/solid-principles-csharp/tree/interface-segregation-principle).

<SiteInfo
  name="CodeMazeBlog/solid-principles-csharp at interface-segregation-principle"
  desc="This repository contains source code for the SOLID principles in C# on Code Maze blog - CodeMazeBlog/solid-principles-csharp at interface-segregation-principle"
  url="https://github.com/CodeMazeBlog/solid-principles-csharp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea17b32ee72d286321112ce49503fb8ba1f177691cc01f5cf36da56bafc48bec/CodeMazeBlog/solid-principles-csharp"/>

:::

To read about other SOLID principles, check out our [**SOLID Principles page**](/code-maze.com/solid-principles.md).

---

## Starting Example

There are vehicles that we can drive, and there are those we can fly with. But there are cars we can drive and fly (yes those are on sale). So, we want to create a code structure which supports all the actions for a single vehicle, and we are going to start with an interface:

```cs
public interface IVehicle
{
    void Drive();
    void Fly();
}
```

Now if we want to develop a behavior for a multifunctional car, this interface is going to be perfect for us:

```cs
public class MultiFunctionalCar : IVehicle
{
    public void Drive()
    {
        //actions to start driving car
        Console.WriteLine("Drive a multifunctional car");
    }

    public void Fly()
    {
        //actions to start flying
        Console.WriteLine("Fly a multifunctional car");
    }
}
```

This is working great. Our interface covers all the required actions.

But now, we want to implement the `Car` class and the `Airplane` class as well:

```cs
public class Car : IVehicle
{
    public void Drive()
    {
        //actions to drive a car
        Console.WriteLine("Driving a car");
    }

    public void Fly()
    {
        throw new NotImplementedException();
    }
}
```

```cs
public class Airplane : IVehicle
{
    public void Drive()
    {
        throw new NotImplementedException();
    }

    public void Fly()
    {
        //actions to fly a plane
        Console.WriteLine("Flying a plane");
    }
}
```

Now we can see what the problem with the `IVehicle` interface is. It contains only one required declaration per each class. The other method, which is not required, is implemented to throw an exception. That is a bad idea because we should be writing our code to do something and not just to throw exceptions. Furthermore, we would have to put an additional effort to document our class so that users know why they shouldn’t be using the not implemented method. A really bad idea.

So, in order to fix this problem, we are going to do some refactoring to our code and write it in accordance to ISP.

---

## Implementing the ISP In the Current Solution

The first thing we are going to do is to divide our `IVehicle` interface:

```cs
public interface ICar
{
    void Drive();
}
```

```cs
public interface IAirplane
{
    void Fly();
}
```

As a result, our classes can implement only the methods they need:

```cs
public class Car : ICar
{
    public void Drive()
    {
        //actions to drive a car
        Console.WriteLine("Driving a car");
    }
}
```

```cs
public class Airplane : IAirplane
{
    public void Fly()
    {
        //actions to fly a plane
        Console.WriteLine("Flying a plane");
    }
}
```

```cs
public class MultiFunctionalCar : ICar, IAirplane
{
    public void Drive()
    {
        //actions to start driving car
        Console.WriteLine("Drive a multifunctional car");
    }

    public void Fly()
    {
        //actions to start flying
        Console.WriteLine("Fly a multifunctional car");
    }
}
```

We can even use a higher level interface if we want in a situation where a single class implements more than one interface:

```cs
public interface IMultiFunctionalVehicle : ICar, IAirplane
{
}
```

Once we have our higher level interface, we can implement it in different ways. The first one is to implement the required methods:

```cs
public class MultiFunctionalCar : IMultiFunctionalVehicle
{
    public void Drive()
    {
        //actions to start driving car
        Console.WriteLine("Drive a multifunctional car");
    }

    public void Fly()
    {
        //actions to start flying
        Console.WriteLine("Fly a multifunctional car");
    }
}
```

Or if we already have implemented the Car class and the Airplane class, we can use them inside our class by using the decorator pattern:

```cs
public class MultiFunctionalCar : IMultiFunctionalVehicle
{
    private readonly ICar _car;
    private readonly IAirplane _airplane;

    public MultiFunctionalCar(ICar car, IAirplane airplane)
    {
        _car = car;
        _airplane = airplane;
    }

    public void Drive()
    {
        _car.Drive();
    }

    public void Fly()
    {
        _airplane.Fly();
    }
}
```

---

## What are the Benefits of the Interface Segregation Principle

We can see from the example above, that smaller interface is a lot easier to implement due to not having to implement methods that our class doesn’t need.

Of course, due to the simplicity of our example, we can make a single interface with a single method inside it. But in real-world projects, we often come up with an interface with multiple methods, which is perfectly normal as long as those methods are highly related to each other. Therefore, we make sure that our class needs all these actions to complete its task.

Another benefit is that the Interface Segregation Principle increases the readability and maintainability of our code. We are reducing our class implementation only to required actions without any additional or unnecessary code.

---

## Conclusion

To sum this article up, we should put an effort into creating smaller interfaces while developing our project. Yes, we may end up with a lot of different interfaces in the end but from our point of view, this is much better than having a few large interfaces that can force us to implement non-required methods in our classes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SOLID Principles in C# – Interface Segregation Principle",
  "desc": "In this article you are going to learn about Interface Segregation Principle, how to implement it and what are the benefits of its implementation.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/interface-segregation-principle.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
