---
lang: en-US
title: "SOLID Principles in C# – Dependency Inversion Principle"
description: "Article(s) > SOLID Principles in C# – Dependency Inversion Principle"
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
      content: "Article(s) > SOLID Principles in C# – Dependency Inversion Principle"
    - property: og:description
      content: "SOLID Principles in C# – Dependency Inversion Principle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/dependency-inversion-principle.html
prev: /programming/cs/articles/README.md
date: 2019-01-28
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/dependency-inversion-principle/banner.png
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
  name="SOLID Principles in C# – Dependency Inversion Principle"
  desc="In this article you are going to learn about Dependency Inversion Principle, how to implement this principle and what are the benefits of implementation."
  url="https://code-maze.com/dependency-inversion-principle"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/dependency-inversion-principle/banner.png"/>

The basic idea behind the Dependency Inversion Principle is that we should create the higher-level modules with its complex logic in such a way to be reusable and unaffected by any change from the lower-level modules in our application. To achieve this kind of behavior in our apps, we introduce abstraction which decouples higher from lower-level modules.

Having this idea in mind the Dependency Inversion Principle states that

- High-level modules should not depend on low-level modules, both should depend on abstractions.
- Abstractions should not depend on details. Details should depend on abstractions.

We are going to make all of this easier to understand with an example and additional explanations.

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

To download the source code for this project, check out the [Dependency Inversion Principle Project Source Code (<VPIcon icon="iconfont icon-github"/>`CodeMazeBlog/solid-principles-csharp`)](https://github.com/CodeMazeBlog/solid-principles-csharp/tree/dependency-inversion-principle).

<SiteInfo
  name="CodeMazeBlog/solid-principles-csharp at dependency-inversion-principle"
  desc="This repository contains source code for the SOLID principles in C# on Code Maze blog"
  url="https://github.com/CodeMazeBlog/solid-principles-csharp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea17b32ee72d286321112ce49503fb8ba1f177691cc01f5cf36da56bafc48bec/CodeMazeBlog/solid-principles-csharp"/>

:::

To read about other SOLID principles, check out our [**SOLID Principles page**](/code-maze.com/solid-principles.md).

---

## What are the High-Level and Low-Level Modules

The high-level modules describe those operations in our application that have more abstract nature and contain more complex logic. These modules orchestrate low-level modules in our application.

The low-level modules contain more specific individual components focusing on details and smaller parts of the application. These modules are used inside the high-level modules in our app.

What we need to understand when talking about DIP and these modules is that both, the high-level and low-level modules, depend on abstractions. We can find different opinions about if the DIP inverts dependency between high and low-level modules or not. Some agree with the first opinion and others prefer the second. But the common ground is that the DIP  creates a decoupled structure between high and low-level modules by introducing abstraction between them.

[**Dependency Injection**](/code-maze.com/dependency-injection-aspnet.md) is one way of implementing the Dependency Inversion Principle.

---

## Example Which Violates DIP

Let’s start by creating two enumerations and one model class:

```cs
public enum Gender
{
    Male,
    Female
}
```

```cs
public enum Position
{
    Administrator,
    Manager,
    Executive
}
```

```cs
public class Employee
{
    public string Name { get; set; }
    public Gender Gender { get; set; }
    public Position Position { get; set; }
}
```

To continue, we are going to create one low-level class which keeps (in a simplified way) track of our employees:

```cs
public class EmployeeManager
{
    private readonly List<Employee> _employees;

    public EmployeeManager()
    {
        _employees = new List<Employee>();
    }

    public void AddEmployee(Employee employee)
    {
        _employees.Add(employee);
    }
}
```

Furthermore, we are going to create a higher-level class to perform some kind of statistical analysis on our employees:

```cs
public class EmployeeStatistics
{
    private readonly EmployeeManager _empManager;

    public EmployeeStatistics(EmployeeManager empManager)
    {
        _empManager = empManager;
    }

    public int CountFemaleManagers()
    {
        //logic goes here
    }
}
```

With this kind of structure in our EmployeeManager class, we can’t make use of the `_employess` list in the `EmployeeStatistics` class, so the obvious solution would be to expose that private list:

```cs
public class EmployeeManager
{
    private readonly List<Employee> _employees;
    
    public EmployeeManager()
    {
        _employees = new List<Employee>();
    }

    public void AddEmployee(Employee employee)
    {
        _employees.Add(employee);
    }

    public List<Employee> Employees => _employees;
}
```

Now, we can complete the `Count` method logic:

```cs
public class EmployeeStatistics 
{ 
    private readonly EmployeeManager _empManager; 
    public EmployeeStatistics(EmployeeManager empManager) 
    {
       _empManager = empManager; 
    } 

    public int CountFemaleManagers () => 
      _empManager.Employees.Count(emp => emp.Gender == Gender.Female && emp.Position == Position.Manager);
 }
```

Even though this will work just fine, this is not what we consider a good code and it violates the DIP.

How is that?

Well, first of all, our `EmployeeStatistics` class has a strong relation (coupled) to the EmployeeManager class and we can’t send any other object in the `EmployeeStatistics` constructor except the `EmployeeManager` object. The second problem is that we are using the public property from the low-level class inside the high-level class. By doing so, our low-level class can’t change its way of keeping track of employees. If we want to change its behavior to use a dictionary instead of a list, we need to change the `EmployeeStatistics` class behavior for sure. And that’s something we want to avoid if possible.

---

## Making Our Code Better by implementing the Dependency Inversion Principle

What we want is to decouple our two classes so the both of them depend on abstraction.

So, the first thing we need to do is to create the `IEmployeeSearchable` interface:

```cs
public interface IEmployeeSearchable
{
    IEnumerable<Employee> GetEmployeesByGenderAndPosition(Gender gender, Position position);
}
```

Then, let’s modify the `EmployeeManager` class:

```cs
public class EmployeeManager: IEmployeeSearchable
{
    private readonly List<Employee> _employees;

    public EmployeeManager()
    {
        _employees = new List<Employee>();
    }
    
    public void AddEmployee(Employee employee)
    {
        _employees.Add(employee);
    }

    public IEnumerable<Employee> GetEmployeesByGenderAndPosition(Gender gender, Position position)
        => _employees.Where(emp => emp.Gender == gender && emp.Position == position);
}
```

Finally, we can modify the `EmployeeStatistics` class:

```cs
public class EmployeeStatistics
{
    private readonly IEmployeeSearchable _emp;

    public EmployeeStatistics(IEmployeeSearchable emp)
    {
        _emp = emp;
    }

    public int CountFemaleManagers() => 
    _emp.GetEmployeesByGenderAndPosition(Gender.Female, Position.Manager).Count();
}
```

This looks much better now and it’s implemented by DIP rules. Now, our `EmployeeStatistics` class is not dependent on the lower-level class and the `EmployeeManager` class can change its behavior about storing employees as well.

Finally, we can check the result by modifying `Program.cs` class:

```cs
class Program
{
    static void Main(string[] args)
    {
        var empManager = new EmployeeManager();
        empManager.AddEmployee(new Employee { Name = "Leen", Gender = Gender.Female, Position = Position.Manager });
        empManager.AddEmployee(new Employee { Name = "Mike", Gender = Gender.Male, Position = Position.Administrator });

        var stats = new EmployeeStatistics(empManager);
        Console.WriteLine($"Number of female managers in our company is: {stats.CountFemaleManagers()}");
    }
}
```

![finished example - Dependency Inversion Principle](/assets/image/code-maze.com/dependency-inversion-principle/06-DIP-finished.png)

---

## Benefits of Implementing the Dependency Inversion Principle

Reducing the number of dependencies among modules is an important part of the process of creating an application. This is something that we get if we implement DIP correctly. Our classes are not tightly coupled with the lower-tier objects and we can easily reuse the logic from the high-tier modules.

So, the main reason why DIP is so important is the modularity and reusability of the application modules.

It is also important to mention that changing already implemented modules is risky. By depending on abstraction and not on a concrete implementation, we can reduce that risk by not having to change high-level modules in our project.

Finally, DIP when applied correctly gives us the flexibility and stability at the level of the entire architecture of our application. Our application will be able to evolve more securely and become stable and robust.

---

## Conclusion

So to sum up, the Dependency Inversion Principle is the last part of the SOLID principles which introduce an abstraction between high and low-level components inside our project to remove dependencies between them.

If someone asks: „Should I put an effort to implement the DIP into my code?“, our answer would be: „Yes you should“.  Loosely coupled code and reusable components should be our goal and responsibility when developing software applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SOLID Principles in C# – Dependency Inversion Principle",
  "desc": "In this article you are going to learn about Dependency Inversion Principle, how to implement this principle and what are the benefits of implementation.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/dependency-inversion-principle.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
