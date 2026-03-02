---
lang: en-US
title: "5 Architecture Tests You Should Add to Your .NET Projects"
description: "Article(s) > 5 Architecture Tests You Should Add to Your .NET Projects"
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
      content: "Article(s) > 5 Architecture Tests You Should Add to Your .NET Projects"
    - property: og:description
      content: "5 Architecture Tests You Should Add to Your .NET Projects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/5-architecture-tests-you-should-add-to-your-dotnet-projects.html
prev: /programming/cs/articles/README.md
date: 2026-03-07
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_184.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="5 Architecture Tests You Should Add to Your .NET Projects"
  desc="Learn about five essential architecture tests that can help ensure the quality and maintainability of your .NET projects."
  url="https://milanjovanovic.tech/blog/5-architecture-tests-you-should-add-to-your-dotnet-projects"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_184.png"/>

Every project starts with good intentions. You agree on layer boundaries, naming conventions, dependency direction. The diagram goes on Confluence.

Six months later, someone moves a domain service into the `Infrastructure` project because it needs database access. Or a handler gets named `ProcessPaymentService` because the dev didn't know the convention. Or a class that should be `internal` is `public` because that's the default. Nobody catches it in code review.

[**Architecture tests**](/milanjovanovic.tech/shift-left-with-architecture-testing-in-dotnet.md) stop this from happening. They turn your architectural rules into automated tests that run in CI. If someone violates a rule, the build fails.

Here are 5 types of architecture tests I add to every .NET project.

---

## ArchUnitNET and the Test Setup

[<VPIcon icon="iconfont icon-github" />`TNG/ArchUnitNET`](https://github.com/TNG/ArchUnitNET) is the .NET port of the Java [<VPIcon icon="fas fa-globe"/>ArchUnit](https://archunit.org/) library. It lets you write [**architecture rules**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md) using a fluent API and run them as regular xUnit tests.

```sh
# there are other test frameworks supported, but I use xUnit
dotnet add package TngTech.ArchUnitNET.xUnit
```

You need a base class that loads all the assemblies you want to test. Each layer gets an "anchor type" to grab a reference to the assembly at compile time:

```cs
public abstract class BaseTest
{
    protected static readonly Assembly DomainAssembly = typeof(User).Assembly;
    protected static readonly Assembly ApplicationAssembly = typeof(ICommand).Assembly;
    protected static readonly Assembly InfrastructureAssembly = typeof(ApplicationDbContext).Assembly;
    protected static readonly Assembly PresentationAssembly = typeof(Program).Assembly;

    protected static readonly Architecture Architecture = new ArchLoader()
        .LoadAssemblies(
            DomainAssembly,
            ApplicationAssembly,
            InfrastructureAssembly,
            PresentationAssembly)
        .Build();
}
```

The `ArchLoader` scans these assemblies and builds an in-memory model of all types and their dependencies. Every test class inherits from `BaseTest`.

---

## 1. Layer Dependency Tests

The most important rule in [**Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) is the **dependency rule**. Inner layers must not reference outer layers. All dependencies point inward.

In most Clean Architecture setups, the project references already prevent the obvious violations. You can't add a reference from `Application` to `Infrastructure` because `Infrastructure` already references `Application`, and the compiler won't allow circular dependencies.

So why bother with these tests?

Because project references aren't the only way dependencies leak in. A NuGet package used in Infrastructure might expose types that bleed into Application through transitive references. Someone could reorganize the solution and change the project reference graph. Or you might move to a [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md) where multiple layers share an assembly, and the compiler can't help you at all.

These tests are a safety net. And they double as living documentation of the intended architecture.

```cs :collapsed-lines
public class LayerTests : BaseTest
{
    private static readonly IObjectProvider<IType> DomainLayer =
        Types().That().ResideInAssembly(DomainAssembly).As("Domain layer");

    private static readonly IObjectProvider<IType> ApplicationLayer =
        Types().That().ResideInAssembly(ApplicationAssembly).As("Application layer");

    private static readonly IObjectProvider<IType> InfrastructureLayer =
        Types().That().ResideInAssembly(InfrastructureAssembly).As("Infrastructure Layer");

    private static readonly IObjectProvider<IType> PresentationLayer =
        Types().That().ResideInAssembly(PresentationAssembly).As("Presentation Layer");

    [Fact]
    public void DomainLayer_ShouldNotDependOn_ApplicationLayer()
    {
        Types().That().Are(DomainLayer).Should()
            .NotDependOnAny(ApplicationLayer)
            .Check(Architecture);
    }

    [Fact]
    public void DomainLayer_ShouldNotDependOn_InfrastructureLayer()
    {
        Types().That().Are(DomainLayer).Should()
            .NotDependOnAny(InfrastructureLayer)
            .Check(Architecture);
    }

    [Fact]
    public void DomainLayer_ShouldNotDependOn_PresentationLayer()
    {
        Types().That().Are(DomainLayer).Should()
            .NotDependOnAny(PresentationLayer)
            .Check(Architecture);
    }

    [Fact]
    public void ApplicationLayer_ShouldNotDependOn_InfrastructureLayer()
    {
        Types().That().Are(ApplicationLayer).Should()
            .NotDependOnAny(InfrastructureLayer)
            .Check(Architecture);
    }

    [Fact]
    public void ApplicationLayer_ShouldNotDependOn_PresentationLayer()
    {
        Types().That().Are(ApplicationLayer).Should()
            .NotDependOnAny(PresentationLayer)
            .Check(Architecture);
    }

    [Fact]
    public void InfrastructureLayer_ShouldNotDependOn_PresentationLayer()
    {
        Types().That().Are(InfrastructureLayer).Should()
            .NotDependOnAny(PresentationLayer)
            .Check(Architecture);
    }
}
```

Six tests, one for each illegal dependency direction.

The fluent API reads like English: "Types that are in the Domain layer should not depend on any types in the Application layer". When a violation happens, the test tells you exactly which type depends on which.

This is the first architecture test I add to any project. If you only add one type from this list, make it this one.

You can also extend this further. For example, I sometimes add tests that specific namespaces within a layer can't reference each other (like `Application.Orders` shouldn't depend on `Application.Users`). This can be great for enforcing a [**vertical slice architecture**](/milanjovanovic.tech/vertical-slice-architecture.md) where each feature is self-contained, or inside a [**modular monolith**](/milanjovanovic.tech/modular-monolith-architecture/README.md) where modules shouldn't depend on each other.

---

## 2. Naming Convention Tests

This one might seem minor, but it adds up fast.

When you have 50 command handlers and 3 of them are named `CreateOrderService` or `ProcessPaymentUseCase`, searching the codebase becomes unreliable. You search for `CommandHandler` and miss three handlers.

ArchUnitNET lets you enforce naming rules by selecting classes based on the interfaces they implement:

```cs
public class NamingConventionTests : BaseTest
{
    [Fact]
    public void CommandHandlers_ShouldHave_NameEndingWith_CommandHandler()
    {
        Classes().That()
            .ImplementInterface(typeof(ICommandHandler<>))
            .Or()
            .ImplementInterface(typeof(ICommandHandler<,>))
            .And().DoNotResideInNamespace("Application.Abstractions.Behaviors")
            .Should().HaveNameEndingWith("CommandHandler")
            .Check(Architecture);
    }

    [Fact]
    public void QueryHandlers_ShouldHave_NameEndingWith_QueryHandler()
    {
        Classes().That()
            .ImplementInterface(typeof(IQueryHandler<,>))
            .And().DoNotResideInNamespace("Application.Abstractions.Behaviors")
            .Should().HaveNameEndingWith("QueryHandler")
            .Check(Architecture);
    }

    [Fact]
    public void Validators_ShouldHave_NameEndingWith_Validator()
    {
        Classes().That()
            .HaveNameEndingWith("Validator")
            .Should().ResideInAssembly(ApplicationAssembly)
            .Check(Architecture);
    }
}
```

One gotcha here: decorators like `ValidationBehavior` implement handler interfaces too. They're decorators in the pipeline, not domain-specific handlers. The `DoNotResideInNamespace("Application.Abstractions.Behaviors")` filter excludes them. I learned this the hard way when every behavior started failing the naming check.

The validator test works in the opposite direction. It says "classes ending with `Validator` should live in the Application assembly". I've seen validators accidentally placed in the Infrastructure project. This catches that.

---

## 3. Colocation Tests

This is the test I wish I had earlier in my career.

When you use [**CQRS**](/milanjovanovic.tech/cqrs-pattern-the-way-it-should-have-been-from-the-start.md), you end up with pairs: a command (or query) and its handler. I keep them in the same namespace so everything for a use case lives together. `Application.TodoItems.Create` would contain both `CreateTodoItemCommand` and `CreateTodoItemCommandHandler`.

But nothing stops someone from putting the handler in a completely different namespace:

```cs :collapsed-lines
public class ColocationTests : BaseTest
{
    [Theory]
    [MemberData(nameof(GetHandlerAndCommandPairs))]
    public void Handlers_ShouldResideInSameNamespace_AsTheirCommandOrQuery(
        Type handlerType,
        Type commandOrQueryType)
    {
        handlerType.Namespace.ShouldBe(
            commandOrQueryType.Namespace,
            $"{handlerType.Name} should be in the same namespace as {commandOrQueryType.Name}");
    }

    public static TheoryData<Type, Type> GetHandlerAndCommandPairs()
    {
        Type[] handlerInterfaces =
        [
            typeof(ICommandHandler<>),
            typeof(ICommandHandler<,>),
            typeof(IQueryHandler<,>)
        ];

        var pairs = new TheoryData<Type, Type>();

        IEnumerable<Type> handlers = ApplicationAssembly
            .GetTypes()
            .Where(t => t is { IsClass: true, IsAbstract: false, IsGenericTypeDefinition: false })
            .Where(t => t.DeclaringType is null);

        foreach (Type handler in handlers)
        {
            foreach (Type iface in handler.GetInterfaces())
            {
                if (!iface.IsGenericType)
                {
                    continue;
                }

                Type genericDef = iface.GetGenericTypeDefinition();

                if (!handlerInterfaces.Contains(genericDef))
                {
                    continue;
                }

                Type commandOrQueryType = iface.GetGenericArguments()[0];
                pairs.Add(handler, commandOrQueryType);
            }
        }

        return pairs;
    }
}
```

This test doesn't use ArchUnitNET. It uses **raw reflection** combined with xUnit's `[Theory]` and `[MemberData]`. ArchUnitNET can't express a rule like "this class should be in the same namespace as the generic type argument of its interface". So we drop down to reflection.

The `GetHandlerAndCommandPairs` method scans the Application assembly, finds all classes implementing a handler interface, extracts the command/query type from the generic argument, and returns pairs for the test to assert on.

This enforces a [**vertical slice**](/milanjovanovic.tech/vertical-slice-architecture-structuring-vertical-slices.md) style of organizing code. When a new developer joins the team, they can find everything for a use case in one folder.

You can expand this to cover request and response types, validators, or anything else that should be colocated.

---

## 4. Visibility Tests

Command and query handlers are implementation details. They get resolved through DI, not referenced directly.

But most developers make them `public` by default. It's just muscle memory. The problem is that a `public` handler can be referenced directly from another layer, bypassing the abstractions you set up.

```cs
public class VisibilityTests : BaseTest
{
    [Fact]
    public void CommandHandlers_ShouldBeInternal()
    {
        Classes().That()
            .ImplementInterface(typeof(ICommandHandler<>))
            .Or()
            .ImplementInterface(typeof(ICommandHandler<,>))
            .Should().BeInternal()
            .Check(Architecture);
    }

    [Fact]
    public void QueryHandlers_ShouldBeInternal()
    {
        Classes().That()
            .ImplementInterface(typeof(IQueryHandler<,>))
            .Should().BeInternal()
            .Check(Architecture);
    }
}
```

If you're worried about DI not finding `internal` classes, don't be. Assembly scanning discovers them just fine.

You could extend this to other types too. I've thought about enforcing that EF Core configurations are `internal` as well, since there's no reason for `OrderConfiguration` to be visible outside of Infrastructure.

---

## 5. Dependency Guard Tests

Layer tests guard against references to your own assemblies. But infrastructure libraries can leak in through transitive NuGet references.

Your Domain layer shouldn't know about Entity Framework. Your Application layer shouldn't know about Npgsql. The compiler won't stop this if the package is transitively available.

```cs
public class DependencyGuardTests : BaseTest
{
    [Fact]
    public void DomainLayer_ShouldNotDependOn_EntityFramework()
    {
        Types().That().ResideInAssembly(DomainAssembly).Should()
            .NotDependOnAnyTypesThat()
            .ResideInNamespace("Microsoft.EntityFrameworkCore")
            .Check(Architecture);
    }

    [Fact]
    public void ApplicationLayer_ShouldNotDependOn_EntityFramework()
    {
        Types().That().ResideInAssembly(ApplicationAssembly).Should()
            .NotDependOnAnyTypesThat()
            .ResideInNamespace("Microsoft.EntityFrameworkCore")
            .Check(Architecture);
    }
}
```

Add whatever libraries make sense for your project.

---

## Summary

Architectural rules that only exist in documentation will be violated. It's not a question of *if*, it's *when*.

All of these tests run in milliseconds and don't require any infrastructure to run. They sit right next to your unit tests and run on every build.

Architecture tests are a safety net that catches violations before they reach production.

Start with layer dependency tests. They take five minutes to set up and catch the most damaging violations. Then add the rest as your codebase grows.

If you want to see how I structure Clean Architecture projects with these guardrails, check out [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md).

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "5 Architecture Tests You Should Add to Your .NET Projects",
  "desc": "Learn about five essential architecture tests that can help ensure the quality and maintainability of your .NET projects.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/5-architecture-tests-you-should-add-to-your-dotnet-projects.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
