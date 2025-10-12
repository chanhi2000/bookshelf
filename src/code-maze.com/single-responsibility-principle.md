---
lang: en-US
title: "SOLID Principles in C# – Single Responsibility Principle"
description: "Article(s) > SOLID Principles in C# – Single Responsibility Principle"
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
      content: "Article(s) > SOLID Principles in C# – Single Responsibility Principle"
    - property: og:description
      content: "SOLID Principles in C# – Single Responsibility Principle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/single-responsibility-principle.html
prev: /programming/cs/articles/README.md
date: 2018-12-24
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/single-responsibility-principle/banner.png
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
  name="SOLID Principles in C# - Single Responsibility Principle"
  desc="In this article you will learn how to implement Single Responsibility Principle (SRP) in your code thus making it better, readable and maintainable as well."
  url="https://code-maze.com/single-responsibility-principle/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/single-responsibility-principle/banner.png"/>


While developing a project, we strive to write maintainable and readable code (besides the working part 😀 ). To accomplish this, each and every class should do its own task and do it well.

Yes, it is quite important for a class to have no more than one task. If it does, our code becomes harder to maintain, due to the fact that it is responsible for the execution of several different tasks and thus being more likely to change in the future.

This is completely opposite of what the Single Responsibility Principle (SRP) states.

The Single Responsibility Principle states that our classes should have only one reason to change or in other words, it should have only one responsibility.

Simple as that.

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

In this article, we are going to show you, through an example, how to create a code that abides by SRP rules. We will start with the code which isn’t SRP compliant and then refactor it to be in accordance with SRP. To finish our example, we will add a bit of reusability to our code, because we don’t want to repeat ourselves while coding.

::: info

To download the source code for this project, check out [the Single Responsibility Principle Project Source Code (<VPIcon icon="iconfont icon-github"/>`CodeMazeBlog/solid-principles-csharp`)](https://github.com/CodeMazeBlog/solid-principles-csharp/tree/single-responsibility-principle).

<SiteInfo
  name="CodeMazeBlog/solid-principles-csharp at single-responsibility-principle"
  desc="This repository contains source code for the SOLID principles in C# on Code Maze blog - CodeMazeBlog/solid-principles-csharp at single-responsibility-principle"
  url="https://github.com/CodeMazeBlog/solid-principles-csharp/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ea17b32ee72d286321112ce49503fb8ba1f177691cc01f5cf36da56bafc48bec/CodeMazeBlog/solid-principles-csharp"/>

:::

To read about other SOLID principles, check out our [**SOLID Principles page**](/code-maze.com/solid-principles.md).

So, let’s start.

---

## Creating the Initial Project

We are going to start with a simple console application.

Imagine if we have a task to create a work report feature that, once created, can be saved to a file and perhaps uploaded to the cloud or used for some other purpose.

So we are going to start with a simple model class:

```cs
public class WorkReportEntry
{
    public string ProjectCode { get; set; }
    public string ProjectName { get; set; }
    public int SpentHours { get; set; }
}
```

The next step is creating a `WorkReport` class which will handle all the required features for our project:

```cs
public class WorkReport
{
    private readonly List<WorkReportEntry> _entries;

    public WorkReport()
    {
        _entries = new List<WorkReportEntry>();
    }

    public void AddEntry(WorkReportEntry entry) => _entries.Add(entry);

    public void RemoveEntryAt(int index) => _entries.RemoveAt(index);

    public override string ToString() =>
        string.Join(Environment.NewLine, _entries.Select(x => $"Code: {x.ProjectCode}, Name: {x.ProjectName}, Hours: {x.SpentHours}"));
}
```

In this class, we are keeping track of our work report entries by adding and removing them to/from a list. Furthermore, we are just overriding `ToString()` method to adjust it to our requirements.

Because we have our `WorkReport` class, it is quite fine to add our additional features to it, like saving to a file:

```cs
public class WorkReport
{
    private readonly List<WorkReportEntry> _entries;

    public WorkReport()
    {
        _entries = new List<WorkReportEntry>();
    }

    public void AddEntry(WorkReportEntry entry) => _entries.Add(entry);

    public void RemoveEntryAt(int index) => _entries.RemoveAt(index);

    public void SaveToFile(string directoryPath, string fileName)
    {
        if(!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }
        
        File.WriteAllText(Path.Combine(directoryPath, fileName), ToString());
    }

    public override string ToString() =>
        string.Join(Environment.NewLine, _entries.Select(x => $"Code: {x.ProjectCode}, Name: {x.ProjectName}, Hours: {x.SpentHours}"));
}
```

### Problems With This Code

We can add even more features in this class, like the Load or UploadToCloud methods because they are all related to our WorkReport, but, just because we can doesn’t mean we have to do it.

Right now, there is one issue with the WorkReport class.

**It has more than one responsibility.**

Its job is not only to keep track of our work report entries but to save the entire work report to a file. This means that we are violating the SRP and our class has more than one reason to change in the future.

The first reason to change this class is if we want to modify the way we keep track of our entries. But if we want to save a file in a different way, that is entirely a new reason to change our class. And imagine what this class would look like if we added additional functionalities to it. We would have so many unrelated code parts in a single class.

So, in order to avoid that, let’s refactor the code.

---

## Refactoring Towards SRP

The first thing we need to do is to separate the part of our code that is unlike others. In our case, that  is obviously the SaveToFile method, so we are going to move it to another class which is more appropriate:

```cs
public class FileSaver
{
    public void SaveToFile(string directoryPath, string fileName, WorkReport report)
    {
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

            File.WriteAllText(Path.Combine(directoryPath, fileName), report.ToString());
        }
    }
}
```

```cs
public class WorkReport
{
    private readonly List<WorkReportEntry> _entries;

    public WorkReport()
    {
        _entries = new List<WorkReportEntry>();
    }

    public void AddEntry(WorkReportEntry entry) => _entries.Add(entry);

    public void RemoveEntryAt(int index) => _entries.RemoveAt(index);

    public override string ToString() =>
        string.Join(Environment.NewLine, _entries.Select(x => $"Code: {x.ProjectCode}, Name: {x.ProjectName}, Hours: {x.SpentHours}"));
}
```

In this case, we have separated our responsibilities in two classes. The `WorkReport` class is now responsible for keeping track of work report entries and the `FileSaver` class is responsible for saving a file.

Having done this, we have separated the concerns of each class thus making them more readable and maintainable as well. As a result, if we want to change how we save a file, we only have one reason to do that and one place to do it, which is the `FileSaver` class.

We can check that everything is working as it supposed to do:

```cs
class Program
{
    static void Main(string[] args)
    {
        var report = new WorkReport();
        report.AddEntry(new WorkReportEntry { ProjectCode = "123Ds", ProjectName = "Project1", SpentHours = 5 });
        report.AddEntry(new WorkReportEntry { ProjectCode = "987Fc", ProjectName = "Project2", SpentHours = 3 });

        Console.WriteLine(report.ToString());

        var saver = new FileSaver();
        saver.SaveToFile(@"Reports", "WorkReport.txt", report);
    }
}
```

![SRP finished example - Single Responsibility Principle](/assets/image/code-maze.com/single-responsibility-principle/01-SRP-finished.png)

---

## Making the Code Even Better

If we look at our `SaveToFile` method, we see that it does its job which is saving a work report to a file, but can it do it even better? This method is tightly coupled with the `WorkReport` class, but what if we want to create a `Scheduler` class that keeps track of its scheduled tasks? We would still like to save it to a file.

Well, in that case, we are going to create some changes to our code:

```cs
public interface IEntryManager<T>
{
    void AddEntry(T entry);
    void RemoveEntryAt(int index);
}
```

The only change to the WorkReport class is to implement this interface:

```cs
public class WorkReport: IEntryManager<WorkReportEntry>
```

Finally, we have to change the `SaveToFile` method signature:

```cs
public void SaveToFile<T>(string directoryPath, string fileName, IEntryManager<T> workReport)
```

After these modifications, we are going to have the same result, but now if we have a task to implement Scheduler, it is going to be quite simple to implement that:

```cs
public class ScheduleTask
{
    public int TaskId { get; set; }
    public string Content { get; set; }
    public DateTime ExecuteOn { get; set; }
}
```

```cs
public class Scheduler : IEntryManager<ScheduleTask>
{
    private readonly List<ScheduleTask> _scheduleTasks;

    public Scheduler()
    {
        _scheduleTasks = new List<ScheduleTask>();
    }

    public void AddEntry(ScheduleTask entry) => _scheduleTasks.Add(entry);

    public void RemoveEntryAt(int index) => _scheduleTasks.RemoveAt(index);

    public override string ToString() => 
        string.Join(Environment.NewLine, _scheduleTasks.Select(x => $"Task with id: {x.TaskId} with content: {x.Content} is going to be executed on: {x.ExecuteOn}"));
}
```

```cs
class Program
{
    static void Main(string[] args)
    {
        var report = new WorkReport();
        report.AddEntry(new WorkReportEntry { ProjectCode = "123Ds", ProjectName = "Project1", SpentHours = 5 });
        report.AddEntry(new WorkReportEntry { ProjectCode = "987Fc", ProjectName = "Project2", SpentHours = 3 });

        var scheduler = new Scheduler();
        scheduler.AddEntry(new ScheduleTask { TaskId = 1, Content = "Do something now.", ExecuteOn = DateTime.Now.AddDays(5) });
        scheduler.AddEntry(new ScheduleTask { TaskId = 2, Content = "Don't forget to...", ExecuteOn = DateTime.Now.AddDays(2) });

        Console.WriteLine(report.ToString());
        Console.WriteLine(scheduler.ToString());

        var saver = new FileSaver();
        saver.SaveToFile(@"Reports", "WorkReport.txt", report);
        saver.SaveToFile(@"Schedulers", "Schedule.txt", scheduler);
    }
}
```

After we execute this code, we will have our file saved in a required location on a defined schedule.

We are going to leave it at that. Now every class we have is responsible for one thing and one thing only.

---

## Benefits of Single Responsibility Principle

Our code has improved in several ways by implementing SRP. The first one being that it has become less complex. Because we are trying to accomplish only one task in our class, they have become free of clutter and simple to read. As we reduce code complexity, our code becomes readable and therefore maintainable.

As we could see from our example, if our class does its job well, we can reuse its logic in a project. Furthermore, with such a code, testing becomes easier as well.

When we implement SRP in our code, our methods become highly related (coherent). It means that different methods are joined to do one thing and to do it well.

Finally, our classes are less dependent on each other (decoupled) which is one of the most important things to achieve while working on a project.

---

## Potential Downsides of SRP

There is no strict rule which states what is that „one reason to change“ in our class. Everyone interprets this subjectively or rather how he/she feels it should be implemented. The rules are not clear to where we should draw the line, so we can potentially find different „right ways“ to implement the same feature.

But still, the bottom line is that no matter what someone thinks about what reason to change is, we should all strive to write readable and maintainable code thus implementing Single Responsibility Principle in our own way.

One of the potential downsides is that in projects that are already written, is difficult to implement SRP. We don’t say that it is not possible, just that it will take longer and take more resources as well.

Implementing SRP leads to writing compact classes with tiny methods as well. And on a first look, this looks great. But having one big class decomposed into a lot of small classes creates an organizational risk. If those classes are not organized and grouped well, it could actually increase the amount of work needed to change a system and to understand it which is opposite of what we wanted to achieve in the first place.

---

## Conclusion

Implementing the Single Responsibility Principle should be always in our mind while writing code. It can be tough to write the code according to SRP right from scratch, but you can write your code iteratively and return to the parts that need attention later. Refactoring is a common practice and nobody writes code perfectly right away. So refactor towards the SRP later if you are not sure which class does what at that moment. It will help not only you but the other developers that need to maintain your code later as well.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SOLID Principles in C# – Single Responsibility Principle",
  "desc": "In this article you will learn how to implement Single Responsibility Principle (SRP) in your code thus making it better, readable and maintainable as well.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/single-responsibility-principle.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
