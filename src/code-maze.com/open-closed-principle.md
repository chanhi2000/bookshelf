---
lang: en-US
title: "SOLID Principles in C# – Open Closed Principle"
description: "Article(s) > SOLID Principles in C# – Open Closed Principle"
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
      content: "Article(s) > SOLID Principles in C# – Open Closed Principle"
    - property: og:description
      content: "SOLID Principles in C# – Open Closed Principle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/open-closed-principle.html
prev: /programming/cs/articles/README.md
date: 2018-12-31
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/open-closed-principle/banner.png
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
  name="SOLID Principles in C# – Open Closed Principle"
  desc="In this article you will learn about Open Closed Principle, how to implement it step by step and why it is important while developing a project."
  url="https://code-maze.com/open-closed-principle/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/open-closed-principle/banner.png"/>

The Open Closed Principle (**OCP**) is the SOLID principle which states that the software entities (classes or methods) should be open for extension but closed for modification.

But what does this really mean?

Basically, we should strive to write a code that doesn’t require modification every time a customer changes its request. Providing such a solution where we can extend the behavior of a class (with that additional customer’s request) and not modify that class, should be our goal most of the time.

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

In this article, we will show you how to write the code by following the Open Closed Principle with two different examples. Initially, none of the examples will obey the OCP rules, but right after the initial development, we are going to refactor the code using the OCP.

::: info

To download the source code for this project, check out [the Open Closed Principle Project Source Code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/solid-principles-csharp`)](https://github.com/CodeMazeBlog/solid-principles-csharp/tree/open-closed-principle).

<SiteInfo
  name="CodeMazeBlog/solid-principles-csharp at open-closed-principle"
  desc="This repository contains source code for the SOLID principles in C# on Code Maze blog - CodeMazeBlog/solid-principles-csharp at open-closed-principle"
  url="https://github.com/CodeMazeBlog/solid-principles-csharp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea17b32ee72d286321112ce49503fb8ba1f177691cc01f5cf36da56bafc48bec/CodeMazeBlog/solid-principles-csharp"/>

:::

To read about other SOLID principles, check out our [**SOLID Principles page**](/code-maze.com/solid-principles.md).

So, let’s jump right into it.

---

## Salary Calculator Example

Let’s imagine that we have a task where we need to calculate the total cost of all the developer salaries in a single company. Of course, we are going to make this example simple and focus on the required topic.

To get started, we are going to create the model class first:

```cs
public class DeveloperReport
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Level { get; set; }
    public int WorkingHours { get; set; }
    public double HourlyRate { get; set; }
}
```

Once we’ve created our model, we can transition to the salary calculation feature:

```cs
public class SalaryCalculator
{
    private readonly IEnumerable<DeveloperReport> _developerReports;

    public SalaryCalculator(List <DeveloperReport> developerReports)
    {
        _developerReports = developerReports;
    }

    public double CalculateTotalSalaries()
    {
        double totalSalaries = 0D ;

        foreach (var devReport in _developerReports)
        {
            totalSalaries += devReport.HourlyRate * devReport.WorkingHours;
        }

        return totalSalaries;
    }
}
```

Now, all we have to do is to provide some data for this class and we are going to have our total costs calculated:

```cs
static void Main(string[] args)
{
    var devReports = new List<DeveloperReport>
    {
        new DeveloperReport {Id = 1, Name = "Dev1", Level = "Senior developer", HourlyRate  = 30.5, WorkingHours = 160 },
        new DeveloperReport {Id = 2, Name = "Dev2", Level = "Junior developer", HourlyRate  = 20, WorkingHours = 150 },
        new DeveloperReport {Id = 3, Name = "Dev3", Level = "Senior developer", HourlyRate  = 30.5, WorkingHours = 180 }
    };

    var calculator = new SalaryCalculator(devReports);
    Console.WriteLine($"Sum of all the developer salaries is {calculator.CalculateTotalSalaries()} dollars");
}
```

Our result should be:

![Open Closed Principle first example](/assets/image/code-maze.com/open-closed-principle/02-OCP-first-example-result.png)

So, all of this is working great, but now our boss comes to our office and says that we need a different calculation for the senior and junior developers. The senior developers should have a bonus of 20% on a salary.

Of course, to satisfy this requirement, we are going to modify our `CalculateTotalSalaries` method like this:

```cs
public double CalculateTotalSalaries()
{
    double totalSalaries = 0D;

    foreach (var devReport in _developerReports)
    {
        if(devReport.Level == "Senior developer")
        {
            totalSalaries += devReport.HourRate * devReport.WorkingHours * 1.2;
        }
        else
        {
            totalSalaries += devReport.HourRate * devReport.WorkingHours;
        }
    }

    return totalSalaries;
}
```

Even though this solution is going to give us the correct result, this is not an optimal solution.

Why is that?

Mainly, because we had to modify our existing class behavior which worked perfectly. Another thing is that if our boss comes again and ask us to modify calculation for the junior dev’s as well, we would have to change our class again. This is totally against of what OCP stands for.

It is obvious that we need to change something in our solution, so, let’s do it.

---

## Better Salary Calculator Example – OCP implemented

To create a code that abides by the Open Closed Principle, we are going to create an abstract class first:

```cs
public abstract class BaseSalaryCalculator
{
    protected DeveloperReport DeveloperReport { get; private set; }

    public BaseSalaryCalculator(DeveloperReport developerReport)
    {
        DeveloperReport = developerReport;
    }

    public abstract double CalculateSalary();
}
```

As a continuation, we are going to create two classes which will inherit from the BaseSalaryCalculator class. Because it is obvious that our calculation depends on the developer’s level, we are going to create our new classes in that manner:

```cs
public class SeniorDevSalaryCalculator : BaseSalaryCalculator
{
    public SeniorDevSalaryCalculator(DeveloperReport report)
        :base(report)
    {
    }

    public override double CalculateSalary() => DeveloperReport.HourlyRate * DeveloperReport.WorkingHours * 1.2;
}
```

```cs
public class JuniorDevSalaryCalculator : BaseSalaryCalculator
{
    public JuniorDevSalaryCalculator(DeveloperReport developerReport)
        :base(developerReport)
    {
    }

    public override double CalculateSalary() => DeveloperReport.HourlyRate * DeveloperReport.WorkingHours;
} 
```

Excellent. Now we can modify the `SalaryCalculator` class:

```cs
public class SalaryCalculator
{
    private readonly IEnumerable<BaseSalaryCalculator> _developerCalculation;

    public SalaryCalculator(IEnumerable<BaseSalaryCalculator> developerCalculation)
    {
        _developerCalculation = developerCalculation;
    }

    public double CalculateTotalSalaries()
    {
        double totalSalaries = 0D;

        foreach (var devCalc in _developerCalculation)
        {
            totalSalaries += devCalc.CalculateSalary();
        }

        return totalSalaries;
    }
}
```

This looks so much better because we won’t have to change any of our current classes if our boss comes with another request about the intern payment calculation or any other as well.

All we have to do now is to add another class with its own calculation logic. So basically, our `SalaryCalculator` class is now closed for modification and opened for an extension, which is exactly what OCP states.

To finish this example, let’s modify the `Program.cs` class:

```cs
class Program
{
    static void Main(string[] args)
    {
        var devCalculations = new List<BaseSalaryCalculator>
        {
            new SeniorDevSalaryCalculator(new DeveloperReport {Id = 1, Name = "Dev1", Level = "Senior developer", HourlyRate = 30.5, WorkingHours = 160 }),
            new JuniorDevSalaryCalculator(new DeveloperReport {Id = 2, Name = "Dev2", Level = "Junior developer", HourlyRate = 20, WorkingHours = 150 }),
            new SeniorDevSalaryCalculator(new DeveloperReport {Id = 3, Name = "Dev3", Level = "Senior developer", HourlyRate = 30.5, WorkingHours = 180 })
        };

        var calculator = new SalaryCalculator(devCalculations);
        Console.WriteLine($"Sum of all the developer salaries is {calculator.CalculateTotalSalaries()} dollars");
    }
} 
```

Awesome. We have finished our first example.

Let’s start with another one.

---

## Filtering Computer Monitors Example

Let’s imagine for a moment that we have a task to write an application which gives us all the required information about computer monitors in our shop, based on different criteria. We will introduce only two criteria here, the type of monitors and the screen size. So let’s start with that:

```cs
public enum MonitorType
{
    OLED,
    LCD,
    LED
}
```

```cs
public enum Screen
{
    WideScreen,
    CurvedScreen
}
```

To continue, we are going to create a simple model class:

```cs
public class ComputerMonitor
{
    public string Name { get; set; }
    public MonitorType Type { get; set; }
    public Screen Screen { get; set; }
}
```

Now, we need to implement our filtering functionality. For example, we want to filter by the monitor types:

```cs
public class MonitorFilter
{
    public List<ComputerMonitor> FilterByType(IEnumerable<ComputerMonitor> monitors, MonitorType type) =>
            monitors.Where(m => m.Type == type).ToList();
}
```

And finally the `Program.cs` class:

```cs
class Program
{
    static void Main(string[] args)
    {
        var monitors = new List<ComputerMonitor>
        {
            new ComputerMonitor { Name = "Samsung S345", Screen = Screen.CurvedScreen, Type = MonitorType.OLED },
            new ComputerMonitor { Name = "Philips P532", Screen = Screen.WideScreen, Type = MonitorType.LCD },
            new ComputerMonitor { Name = "LG L888", Screen = Screen.WideScreen, Type = MonitorType.LED },
            new ComputerMonitor { Name = "Samsung S999", Screen = Screen.WideScreen, Type = MonitorType.OLED },
            new ComputerMonitor { Name = "Dell D2J47", Screen = Screen.CurvedScreen, Type = MonitorType.LCD }        
        };

        var filter = new MonitorFilter();

        var lcdMonitors = filter.FilterByType(monitors, MonitorType.LCD);
        Console.WriteLine("All LCD monitors");
        foreach (var monitor in lcdMonitors)
        {
            Console.WriteLine($"Name: {monitor.Name}, Type: {monitor.Type}, Screen: {monitor.Screen}");
        }
    }
 }
```

This is going to work just fine. But, after a couple of days, we receive a request that our customers want to have the filter by Screen functionality as well.

So this should be quite simple, shouldn’t it?

Let’s just change the `MonitorFilter` class:

```cs
public class MonitorFilter
{
    public List<ComputerMonitor> FilterByType(IEnumerable<ComputerMonitor> monitors, MonitorType type) =>
        monitors.Where(m => m.Type == type).ToList();

    public List<ComputerMonitor> FilterByScreen(IEnumerable<ComputerMonitor> monitors, Screen screen) =>
        monitors.Where(m => m.Screen == screen).ToList();
}
```

Even though this is going to give us the correct result, we have a problem because we have to modify our existing class. And what if we receive another request to filter all the monitors by type and screen together? We all see where this lead us, towards breaking the OCP. We are not extending our `MonitorFilter` class but modifying it.

So, in order to avoid existing class modification, let’s try another approach.

Creating a couple of interfaces is going to be our first step:

```cs
public interface ISpecification<T>
{
    bool isSatisfied(T item);
}
```

```cs
public interface IFilter<T>
{
    List<T> Filter(IEnumerable<T> monitors, ISpecification<T> specification);
}
```

With the `ISpecification` interface, we can determine whether or not our criterion is satisfied and we can send it to the Filter method from the `IFilter` interface.

To continue on, we are going to create a separate class for the monitor type specification:

```cs
public class MonitorTypeSpecification: ISpecification<ComputerMonitor>
{
    private readonly MonitorType _type;

    public MonitorTypeSpecification(MonitorType type)
    {
        _type = type;
    }

    public bool isSatisfied(ComputerMonitor item) => item.Type == _type;
}
```

After this modification, all we have to do is to write a class that implements IFilter interface. But because we already have the `MonitorFilter` class, we are just going to modify it:

```cs
public class MonitorFilter : IFilter<ComputerMonitor>
{
    public List<ComputerMonitor> Filter(IEnumerable<ComputerMonitor> monitors, ISpecification<ComputerMonitor> specification) =>
        monitors.Where(m => specification.isSatisfied(m)).ToList();
}
```

Finally, let’s modify the `Program.cs` class:

```cs
var filter = new MonitorFilter();

var lcdMonitors = filter.Filter(monitors, new MonitorTypeSpecification(MonitorType.LCD));
Console.WriteLine("All LCD monitors");
foreach (var monitor in lcdMonitors)
{
    Console.WriteLine($"Name: {monitor.Name}, Type: {monitor.Type}, Screen: {monitor.Screen}");
}
```

The result should be the same:

![Open Closed Principle second example](/assets/image/code-maze.com/open-closed-principle/03-OCP-second-example-result-1.png)

---

## Additional Filter Requests

Right now, we are perfectly able to extend our `MonitorFilter` class without any further modification. So, if now we have to implement the filter by screen feature, for example only widescreen monitors, we can do it with a new class:

```cs
public class ScreenSpecification : ISpecification<ComputerMonitor>
{
    private readonly Screen _screen;

    public ScreenSpecification(Screen screen)
    {
        _screen = screen;
    }

    public bool isSatisfied(ComputerMonitor item) => item.Screen == _screen;
}
```

And, we can make a call towards the `MonitorFilter` class:

```cs
Console.WriteLine("All WideScreen Monitors");
var wideScreenMonitors = filter.Filter(monitors, new ScreenSpecification(Screen.WideScreen));
foreach (var monitor in wideScreenMonitors)
{
     Console.WriteLine($"Name: {monitor.Name}, Type: {monitor.Type}, Screen: {monitor.Screen}");
}
```

Excellent.

With this project structure, we can even extend our filtering criterion to, for example, only OLED and widescreen monitors. All we have to do is to create another specification class.

---

## Why Should We Implement the Open Closed Principle

By implementing the OCP we are lowering the chance of producing bugs in our project.

For example, if we have a fully working and already tested class in production, by extending it instead of changing it, we would definitely have a lesser impact on the rest of the system.

Therefore, we introduce another class to extend the behavior of the main class thus avoid the existing functionality modification that other classes may rely upon.

Another benefit is that we only have to test and deploy the new features, which wouldn’t be the case if we had to change existing functionality. Furthermore, if we decide that we don’t need this feature anymore (sometime in the future), all we have to do is to revert just newly implemented change and that’s it.

---

## Conclusion

We’ve seen how the OCP can help us create better and more maintainable code. But, as with everything else, we should be cautious when implementing this principle.

Sometimes it’s just impossible to extend our class and all we are left to do is to modify existing functionality. We shouldn’t be afraid to do it, it is quite normal, but at least we should try to make those changes as discrete as they can be.

So, we should develop our applications with the OCP in mind and we should strive to write extendable code as much as we can because it leads to the maintainable, scalable and testable codebase.

And that’s what we want, isn’t it?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SOLID Principles in C# – Open Closed Principle",
  "desc": "In this article you will learn about Open Closed Principle, how to implement it step by step and why it is important while developing a project.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/open-closed-principle.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

