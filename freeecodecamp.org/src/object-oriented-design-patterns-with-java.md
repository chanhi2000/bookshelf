---
lang: en-US
title: "Object-Oriented Design Patterns with Java"
description: "Article(s) > Object-Oriented Design Patterns with Java"
icon: fa-brands fa-java
category:
  - Java
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Object-Oriented Design Patterns with Java"
    - property: og:description
      content: "Object-Oriented Design Patterns with Java"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-design-patterns-with-java.html
prev: /programming/java/articles/README.md
date: 2025-07-29
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753734965769/4d53f28e-7d85-4571-831f-1760490e06dc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Object-Oriented Design Patterns with Java"
  desc="In this article I will introduce some of the most useful object-oriented design patterns. Design patterns are solutions to common problems that show up over and over again. These problems will show up in many different contexts but always have the sa..."
  url="https://freecodecamp.org/news/object-oriented-design-patterns-with-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753734965769/4d53f28e-7d85-4571-831f-1760490e06dc.png"/>

In this article I will introduce some of the most useful object-oriented [**design patterns**](/freecodecamp.org/javascript-design-patterns-explained.md). Design patterns are solutions to common problems that show up over and over again. These problems will show up in many different contexts but always have the same problem at the root.

A design pattern attempts to describe an effective solution to the problem in a generic way so that it can be applied to a specific set of circumstances.

I will use Java to build an example of each pattern. I’m assuming that you have some programming experience in Java. In particular, you should be (at least somewhat) familiar with the concepts of inheritance and polymorphism. These design patterns really show the power of inheritance and polymorphism, so if you are just learning about these topics this is a great opportunity to dig deeper.

What if you not a Java programmer? If you are familiar with any Object-Oriented language you will probably still get a lot out of the examples. Give it a shot!

---

## Code Playbacks

To make design patterns more approachable, I developed an interactive tutorial that uses annotated [<VPIcon icon="fas fa-globe"/>code playbacks](https://markm208.github.io/) to walk through key design pattern features step-by-step.

Each design pattern is presented as a code playback that shows how a program changes over time along with my explanation about what's happening. This format helps you focus on the reasoning behind the code changes.

You can access the free 'book' of code playbacks here:

::: info OO Design Patterns with Java by Mark Mahoney (that’s me)

```component VPCard
{
  "title": "PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

:::

To view a code playback, click on the comments in the left panel. Each comment updates the code in the editor and highlights any changes. Read the explanation and study the code. If you get stuck, use the AI assistant like a tutor to help explain what is happening in the code.

For more information about code playbacks, you can watch a short demo here.

<VidStack src="youtube/uYbHqCNjVDM" />

---

## Key Design Patterns You Should Know

### Strategy Pattern

The [**Strategy Pattern**](/freecodecamp.org/a-beginners-guide-to-the-strategy-design-pattern.md) is used to define a 'family' of algorithms, encapsulate each one, and make them interchangeable. Software developers use the Strategy pattern when they know there are many different ways of accomplishing some behavior. Rather than include all the different ways in a single class, they separate them out into individual classes and plug them in when necessary.

This program creates some classes to hold student grades. Some instructors like to adjust the entire course’s grades to make them higher. Some instructors do this by dropping every student's lowest grade. Other instructors 'curve' each assignment. Since there are several different options, I will use the **Strategy Pattern** to isolate them and let the client choose which one they prefer.

Start by looking at the `Assignment`, `Student`, and `Course` classes. Once you are familiar with the core classes, watch as I change the code to implement two different approaches to *curving* the grades using the **Strategy Pattern**:

```component VPCard
{
  "title": "1.1 **Strategy Pattern** Adjusting Grades in a Course - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/1",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Singleton Pattern

There are times when you need to make sure there is only one instance of a class and it is accessible everywhere in your code. This is the problem that the [**Singleton Pattern**](https://en.wikipedia.org/wiki/Singleton_pattern) solves.

In this program, I will create a class that generates random numbers. I will rely on Java's built-in `Random` class but will be able to reproduce the exact same sequence of random numbers when in 'test mode'. I'll make sure that there is only one instance of this random number generator using the **Singleton Pattern**:

```component VPCard
{
  "title": "1.2 **Singleton Pattern** A Testable Random Number Class - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/2",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Composite Pattern

Often, we’ll create whole/part containment tree structures. For example, in a file system there are simple files. I call these simple elements, *primitives*. We can group primitives together to form larger *composites*. Files can be grouped into directories. These composites (directories) can be grouped into still larger composites, and so on.

We could treat composites and primitives differently. But it often makes sense to treat them the same. Having to distinguish between the object types makes the application more complex.

The [<VPIcon icon="fa-brands fa-wikipedia-w"/>Composite Pattern](https://en.wikipedia.org/wiki/Composite_pattern) describes how to use recursive composition so that clients don't need to make this distinction.

This program creates classes for printing a hierarchical collection of files and directories using the **Composite Pattern**:

```component VPCard
{
  "title": "1.3 **Composite Pattern** Displaying a Hierarchical File System - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/3",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Decorator Pattern

Sometimes we want to add responsibilities to individual objects, not an entire class. The [<VPIcon icon="fa-brands fa-wikipedia-w"/>Decorator Pattern](https://en.wikipedia.org/wiki/Decorator_pattern) allows us to create *decorators* to provide a flexible alternative to inheritance for extending a class.

In this program, I create an interface for logging messages while a program is running. I use the interface to create a `ConsoleLogger` that prints the log messages to the screen. Then I start to add decorator objects that surround, or wrap, the `ConsoleLogger`. I add decorators to attach the date, author name, and time to the log messages using the **Decorator Pattern**:

```component VPCard
{
  "title": "1.4 **Decorator Pattern** Logging with Decorators System - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/4",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### State Pattern

Sometimes there are systems that react differently based on the 'state' that they are in. A state is a period of time during which a system will react to events according to certain rules. This state-based behavior is implemented using the [<VPIcon icon="fa-brands fa-wikipedia-w"/>State Pattern](https://en.wikipedia.org/wiki/State_pattern).

I’ll show you how to move through the characters in a string and parse it to account for quotes within it. For example, the following string:

`"hamburgers chips 'hot dogs' pickles 'french fries'"`

can be split into a collection like this:

`["hamburgers", "chips", "hot dogs", "pickles", "french fries"]`

There are may ways to accomplish this in Java, but I’ll show a state-based approach. When a single quote is encountered within a string I will use that as an event and move between different states using the **State Pattern**:

```component VPCard
{
  "title": "1.5 **State Pattern** String Splitting for Search Bars - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/5",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Observer Pattern

The [<VPIcon icon="fa-brands fa-wikipedia-w"/>Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) is used when the update of a single piece of data in one object needs to be propagated to a collection of other objects.

For example, when the value of a cell in a spreadsheet changes, several other cells may need to be notified of that change so that they can update themselves. Similarly, in a social network application when a user makes a post, all of their friends need to be notified so that their feeds can be updated. Both of these are essentially the same problem that the **Observer Pattern** solves.

This program creates a class to hold a time in a day called `MyTime`. Then I create two different types of `Observers` that will be notified when the time changes. The two observers will re-display the time every time it changes using the **Observer Pattern**:

```component VPCard
{
  "title": "1.6 **Observer Pattern** Observing the Time Change - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/6",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Proxy Pattern

Sometimes we design a set of objects that have a client/server relationship but later decide that the two objects should not interact directly. This program shows how to use the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Proxy Pattern](https://en.wikipedia.org/wiki/Proxy_pattern) to place some new functionality in between two previously cooperating classes.

I create a `Card` and `Deck` class for card games. The `Deck` starts out being hosted on the same machine as the `Driver`. Then I split the `Driver` and the `Deck` class so that they can be run on different machines using the **Proxy Pattern**:

```component VPCard
{
  "title": "1.7 **Proxy Pattern** Dealing Cards from a Remote Deck - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/7",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Factory Pattern

The [<VPIcon icon="fa-brands fa-wikipedia-w"/>Factory Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) provides a mechanism for creating 'families' of related objects without specifying their concrete classes. Instantiating concrete objects in an application makes it hard to change those objects later.

In this program, I will create two different families of classes for a help system for two different computing platforms using the **Factory Pattern**:

```component VPCard
{
  "title": "1.8 **Factory Pattern** Getting Help in Mac and Windows - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/8",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

### Visitor Pattern

The [<VPIcon icon="fa-brands fa-wikipedia-w"/>Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern) lets you add functionality to a hierarchy of classes without changing its interface.

The reason why this is important is that there are times when we cannot change an existing hierarchy of classes. Perhaps I am using a hierarchy of classes that I am not in control of but I want to add some new functionality to it anyway. This is where the **Visitor Pattern** comes in.

In this program, I’ll add functionality to the `File` and `Directory` classes from the *Composite* program that I wrote earlier with minimal changes to those classes.

I create a *visitor* to count the number of files and directories in a topmost directory. Then I write a *visitor* to collect only the filenames in a directory including its sub-directories using the **Visitor Pattern**:

```component VPCard
{
  "title": "1.9 **Visitor Pattern** Adding Functionality to a Hierarchy of Classes (File and Directory) - PlaybackPress",
  "desc": "OO Design Patterns with Java by Mark Mahoney",
  "link": "https://playbackpress.com/books/patternsbook/chapter/1/9",
  "logo": "https://playbackpress.com/favicon.ico",
  "background": "rgba(59,76,98,0.2)"
}
```

---

## Conclusion

I hope you enjoyed learning about object-oriented design patterns. If you are interested in other programming paradigms, you can check out some of my other 'books' [<VPIcon icon="fas fa-globe"/>here](https://playbackpress.com/books).

Questions and feedback are always welcome here: [<VPIcon icon="fas fa-envelope"/>`mark@playbackpress.com`](mailto:mark@playbackpress.com)

If you'd like to support my work and help keep Playback Press free for all, consider donating using [<VPIcon icon="iconfont icon-github"/>GitHub Sponsors](https://github.com/sponsors/markm208). I use all of the donations for hosting costs. Your support helps me continue creating educational content like this. Thank you!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Object-Oriented Design Patterns with Java",
  "desc": "In this article I will introduce some of the most useful object-oriented design patterns. Design patterns are solutions to common problems that show up over and over again. These problems will show up in many different contexts but always have the sa...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-design-patterns-with-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
