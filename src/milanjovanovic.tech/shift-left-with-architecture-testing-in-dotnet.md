---
lang: ko-KR
title: "Shift Left With Architecture Testing in .NET"
description: "Article(s) > Shift Left With Architecture Testing in .NET"
icon: iconfont icon-csharp
category: 
  - C#
  - DotNet
  - Article(s)
tag: 
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Shift Left With Architecture Testing in .NET"
    - property: og:description
      content: "Shift Left With Architecture Testing in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/shift-left-with-architecture-testing-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2024-05-25
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_091.png
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
  name="Shift Left With Architecture Testing in .NET"
  desc="In this newsletter, we'll explore how architecture testing can safeguard our project's architecture. Architecture tests can help us shift left and detect architectural issues faster."
  url="https://milanjovanovic.tech/blog/shift-left-with-architecture-testing-in-dotnet/"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_091.png"/>

Picture this: You're part of a team building a shiny new .NET application. You've carefully chosen your software architecture. It could be microservices, a [**modular monolith**](/milanjovanovic.tech/modular-monolith-architecture/README.md), or something else entirely. You've decided which database you will use and all the other tools you need. Everyone's excited, the code is flowing, and features are getting shipped.

Fast forward a few months (or years), and things might look different.

The codebase has grown, and new features have been added. Maybe your team has even changed, with new developers coming on board. Adding new features becomes a pain, and bugs are popping up left and right.

And slowly but surely, the neat architecture you started with has turned into a [<VPIcon icon="fas fa-globe"/>big ball of mud](https://deviq.com/antipatterns/big-ball-of-mud). What went wrong? And more importantly, what can we do about it?

Today, I want to show you how architecture testing can prevent this problem.

---

## Technical Debt

Technical debt is the consequence of prioritizing development speed over well-designed code. It happens when teams cut corners to meet deadlines, make quick fixes, or don't understand the architecture clearly.

Each shortcut or hack adds to the pile, making the code harder to understand, change, and maintain. But why do developers take these shortcuts in the first place?

Don't developers care about keeping the code clean?

Well, the truth is, most developers do care. If you're reading this newsletter, odds are you also care. But, developers are often under pressure to deliver features quickly. Sometimes, the quickest way to do that is to take a shortcut.

Plus, not everyone has a deep understanding of software architecture, or they might disagree on what the "right" architecture is. And let's be honest: some developers want to get their code working and move on to the next thing.

---

## Architecture Testing

Luckily, there's a way to enforce software architecture on your project before things get out of hand. It's called [**architecture testing**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md). These are automated tests that check whether your code follows the architectural rules you've set up.

With architecture testing, you can [<VPIcon icon="fa-brands fa-wikipedia-w"/>"shift left"](https://en.wikipedia.org/wiki/Shift-left_testing. This enables you to find and fix problems early in the development process when they're much easier and cheaper to deal with.

Think of it like a safety net for your software architecture and design rules. If someone accidentally breaks a rule, the test will catch it and alert you. Bonus points if you integrate architecture testing into your [**CI pipeline**](/milanjovanovic.tech/how-to-build-ci-cd-pipeline-with-github-actions-and-dotnet.md).

There are a few libraries you can use for architecture testing. I prefer working with the [<VPIcon icon="iconfont icon-github"/>`BenMorris/NetArchTest`](https://github.com/BenMorris/NetArchTest) library, which I'll use for the examples.

<SiteInfo
  name="BenMorris/NetArchTest"
  desc="A fluent API for .Net that can enforce architectural rules in unit tests."
  url="https://github.com/BenMorris/NetArchTest"
  logo="https://avatars.githubusercontent.com/u/1744805?s=96&v=4"
  preview="https://opengraph.githubassets.com/4c8300674a4b7439d39f13b79063a42dfa61d3592cb63f349a3c93ee9d9066c2/BenMorris/NetArchTest"/>

You can check out this article to learn the [**fundamentals of architecture testing**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md).

Let's see how to write some architecture tests.

---

## Architecture Testing: Modular Monolith

You built an application using the [**modular monolith architecture**](/milanjovanovic.tech/what-is-a-modular-monolith.md). But how can you maintain the constraints between the modules?

- Modules aren't allowed to reference each other
- Modules can only call the public API of other modules

Here's an architecture test that enforces these module constraints. The `Ticketing` module is not allowed to reference the other modules directly. However, it can reference the public API of other modules (integration events in this example). The entry point is the `Types` class, which exposes a fluent API to build the rules you want to enforce. NetArchTest allows us to enforce the direction of dependencies between modules.

```cs
[Fact]
public void TicketingModule_ShouldNotHaveDependencyOn_AnyOtherModule()
{
    string[] otherModules = [
        UsersNamespace,
        EventsNamespace,
        AttendanceNamespace];

    string[] integrationEventsModules = [
        UsersIntegrationEventsNamespace,
        EventsIntegrationEventsNamespace,
        AttendanceIntegrationEventsNamespace];

    List<Assembly> ticketingAssemblies =
    [
        typeof(Order).Assembly,
        Modules.Ticketing.Application.AssemblyReference.Assembly,
        Modules.Ticketing.Presentation.AssemblyReference.Assembly,
        typeof(TicketingModule).Assembly
    ];

    Types.InAssemblies(ticketingAssemblies)
        .That()
        .DoNotHaveDependencyOnAny(integrationEventsModules)
        .Should()
        .NotHaveDependencyOnAny(otherModules)
        .GetResult()
        .ShouldBeSuccessful();
}
```

If you want to learn how to build robust and scalable systems using this architectural approach, check out [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

---

## Architecture Testing: Clean Architecture

We can also write architecture tests for [**Clean Architecture**](/milanjovanovic.tech/why-clean-architecture-is-great-for-complex-projects.md). The inner layers aren't allowed to reference the outer layers. Instead, the inner layers define abstractions and the outer layers implement these abstractions.

For example, the `Domain` layer isn't allowed to reference the `Application` layer. Here's an architecture test enforcing this rule:

```cs
[Fact]
public void DomainLayer_ShouldNotHaveDependencyOn_ApplicationLayer()
{
    Types.InAssembly(DomainAssembly)
        .Should()
        .NotHaveDependencyOn(ApplicationAssembly.GetName().Name)
        .GetResult()
        .ShouldBeSuccessful();
}
```

It's also simple introduce a rule that the `Application` layer isn't allowed to reference the `Infrastructure` layer. The architecture test will fail whenever someone in the team breaks the dependency rule.

```cs
[Fact]
public void ApplicationLayer_ShouldNotHaveDependencyOn_InfrastructureLayer()
{
    Types.InAssembly(ApplicationAssembly)
        .Should()
        .NotHaveDependencyOn(InfrastructureAssembly.GetName().Name)
        .GetResult()
        .ShouldBeSuccessful();
}
```

We can introduce more architecture tests for the `Infrastructure` and `Presentation` layers, if needed.

Ready to learn more about building production-ready applications using this architectural approach? You should check out [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md).

---

## Architecture Testing: Design Rules

Architecture testing is also useful for enforcing design rules in your code. If your team has coding standards everyone should follow, architecture testing can help you enforce them.

For example, we want to ensure that all domain events are sealed types. You can use the `BeSealed` method to enforce a design rule that types implementing `IDomainEvent` or `DomainEvent` should be sealed.

```cs
[Fact]
public void DomainEvents_Should_BeSealed()
{
    Types.InAssembly(DomainAssembly)
        .That()
        .ImplementInterface(typeof(IDomainEvent))
        .Or()
        .Inherit(typeof(DomainEvent))
        .Should()
        .BeSealed()
        .GetResult()
        .ShouldBeSuccessful();
}
```

An interesting design rule could be requiring all domain entities not to have a public constructor. Instead, you would create an `Entity` instance through a static factory method. This approach improves the encapsulation of your `Entity`.

Here's an architecture test enforcing this design rule:

```cs
[Fact]
public void Entities_ShouldOnlyHave_PrivateConstructors()
{
    IEnumerable<Type> entityTypes = Types.InAssembly(DomainAssembly)
        .That()
        .Inherit(typeof(Entity))
        .GetTypes();

    var failingTypes = new List<Type>();
    foreach (Type entityType in entityTypes)
    {
        ConstructorInfo[] constructors = entityType
            .GetConstructors(BindingFlags.Public | BindingFlags.Instance);

        if (constructors.Any())
        {
            failingTypes.Add(entityType);
        }
    }

    failingTypes.Should().BeEmpty();
}
```

Another thing you can do with architecture tests is enforce naming conventions in your code. Here's an example of requiring all command handlers to have a name ending with `CommandHandler`:

```cs
[Fact]
public void CommandHandler_ShouldHave_NameEndingWith_CommandHandler()
{
    Types.InAssembly(ApplicationAssembly)
        .That()
        .ImplementInterface(typeof(ICommandHandler<>))
        .Or()
        .ImplementInterface(typeof(ICommandHandler<,>))
        .Should()
        .HaveNameEndingWith("CommandHandler")
        .GetResult()
        .ShouldBeSuccessful();
}
```

---

## Summary

Even the most well-planned software projects decay because of technical debt. Most developers have good intentions. However, time pressure, misunderstandings, and resistance to rules all contribute to this problem.

[**Architecture testing**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md) acts as a safeguard. It prevents your codebase from turning into a big ball of mud. By catching architectural violations early on, you can shift left. Short feedback loops avoid costly rework and improve developer productivity. It also ensures the long-term health of your project.

A few key takeaways:

- **Technical debt is inevitable**: It slows down development, introduces bugs, and frustrates developers.
- **Architecture testing is your safety net**: It helps you catch architectural violations before they become problematic.
- **Start small and iterate**: You don't have to test everything at once. Focus on the most critical rules first.
- **Make it part of your workflow**: Integrate architecture tests into your CI/CD pipeline so they run automatically.

::: info Action point

Start by exploring popular .NET architecture testing libraries like [<VPIcon icon="iconfont icon-github"/>`BenMorris/ArchUnitNET`](https://github.com/BenMorris/ArchUnitNET). Experiment with writing tests for common architectural rules and gradually integrate them into your development workflow.

<SiteInfo
  name="TNG/ArchUnitNET"
  desc="A C# architecture test library to specify and assert architecture rules in C# for automated testing."
  url="https://github.com/TNG/ArchUnitNET"
  logo="https://avatars.githubusercontent.com/u/432256?s=88&v=4"
  preview="https://opengraph.githubassets.com/686a0d4957388dbf014b2807249af0019cd0ae23730f21d3709bf0562887b8cf/TNG/ArchUnitNET"/>

:::

That's all for today.

See you next week.

