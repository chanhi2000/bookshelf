---
lang: en-US
title: "What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)"
description: "Article(s) > What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)"
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
      content: "Article(s) > What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)"
    - property: og:description
      content: "What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-invariants-are-and-why-a-domain-model-is-the-best-place-to-enforce-them.html
prev: /programming/cs/articles/README.md
date: 2026-05-02
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_192.png
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
  name="What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)"
  desc="Most 'DDD-ish' code I review enforces business rules everywhere except where it should: in the model itself. The same rule ends up duplicated across handlers, validators, and controllers, and each copy drifts a little over time. Here's how I think about invariants, and why an always-valid domain model is the cleanest way to enforce them."
  url="https://milanjovanovic.tech/blog/what-invariants-are-and-why-a-domain-model-is-the-best-place-to-enforce-them"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_192.png"/>

A lot of the "DDD-ish" .NET code I review scatters business rules across handlers, validators, and controllers, and barely puts any on the domain model itself.

Each copy of the same rule drifts a little over time, and whether a given object is *valid* starts to depend on which path the caller took to reach it.

You can absolutely build a working system this way. I've shipped plenty of procedural code with enough `if`-checks to keep things in line. But there's a cleaner way to think about it, and it starts with a single idea.

---

## What Is an Invariant?

An **invariant** is a rule about an object that must hold true for as long as the object exists.

Not just when you save it, or when a validator happens to run. The rule has to hold every time you touch the object, no matter how it got into memory.

A few examples:

- A `Course` always has a non-empty title.
- An `Order` total always equals the sum of its line items.
- A `Subscription` is in exactly one state: `Trial`, `Active`, `PastDue`, or `Canceled`.
- A published course has at least one lesson.

None of these mention validation, persistence, or HTTP. They're statements about the *domain*, and they should be true regardless of how the object got loaded.

---

## Where Procedural Code Goes Wrong

Take a simple `Course` written the way most CRUD-ish .NET apps still write it:

```cs
public class Course
{
    public string Title { get; set; }
    public CourseStatus Status { get; set; }
    public DateTime? PublishedOn { get; set; }
    public decimal Price { get; set; }
}
```

There's no constructor and every property has a public setter, so the class is willing to accept any combination of values.

To keep the data correct, the rules end up scattered across the application:

- `CreateCourseValidator` checks the title isn't empty.
- `PublishCourseHandler` sets `Status` and `PublishedOn`, and remembers to check the course isn't already published.
- `ChangePriceHandler` checks the course isn't archived.
- A new endpoint shows up, someone copies an existing handler, and the archive check quietly goes missing.

Every rule lives in a place that just happens to be on the path the request took. Nothing on the `Course` itself prevents it from drifting into an invalid state.

That's the real cost of an [**anemic model**](/milanjovanovic.tech/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model.md). It isn't that there's no behavior on the class. It's that the class makes no promises, so every caller has to enforce the rules itself.

---

## Always-Valid: The Model as the Source of Truth

The shift I want to make is simple: the model never accepts an invalid state.

If you're holding a `Course` reference, you can trust it. You don't need an `if (course.Title is null)` somewhere down the call stack, you don't need a parallel validator double-checking, and you don't need to hope the handler remembered the right guard.

Three moves get you there.

### 1. Block construction of invalid objects

A `Course` without a title shouldn't exist, so the easiest fix is to make it impossible to construct.

```cs
public class Course
{
    private Course(CourseId id, string title, Money price)
    {
        Id = id;
        Title = title;
        Price = price;
        Status = CourseStatus.Draft;
    }

    public static Result<Course> Create(string title, Money price)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return CourseErrors.TitleRequired;
        }

        return new Course(CourseId.New(), title, price);
    }
}
```

A private constructor with a static factory gives you a single, well-known place where a `Course` can come into existence, and that's where the validation runs. From that point on, any code holding a `Course` reference can assume it has a valid title.

[**Value objects**](/milanjovanovic.tech/value-objects-in-dotnet-ddd-fundamentals.md) like `Money` apply the same idea at a smaller scope, so a `Money` can't be negative or be missing its currency by the time you're using it.

### 2. Encapsulate state transitions

Once construction is locked down, the next leak is state changes. The class should control how it changes, instead of leaving that up to whoever has a reference to it. No setters, and every change goes through a method that knows the rules.

```cs
public Result Publish(IDateTimeProvider clock)
{
    if (Status != CourseStatus.Draft)
    {
        return CourseErrors.AlreadyPublished;
    }

    if (_lessons.Count == 0)
    {
        return CourseErrors.CannotPublishWithoutLessons;
    }

    Status = CourseStatus.Published;
    PublishedOn = clock.UtcNow;
    return Result.Success();
}
```

The handler doesn't need to know whether the course was already published, and it doesn't need to remember to check for empty lessons. It calls `Publish` and propagates whatever result comes back. The rule lives next to the state it protects, in one place.

### 3. Encapsulate the aggregate

Some rules span multiple entities inside the same boundary. The aggregate root is the right place to enforce those, because it's the transactional boundary.

Take this rule: a published course must have at least one lesson, and lessons can't be removed once it's published.

The wrong way is to expose `Lessons` as a mutable collection and rely on the application service to remember the rule everywhere it's used. The right way is to keep the collection private and force every change through the root:

```cs
public sealed class Course
{
    private readonly List<Lesson> _lessons = [];
    public IReadOnlyCollection<Lesson> Lessons => _lessons.AsReadOnly();

    public Result RemoveLesson(LessonId id)
    {
        if (Status == CourseStatus.Published)
        {
            return CourseErrors.CannotModifyPublishedLessons;
        }

        var lesson = _lessons.FirstOrDefault(l => l.Id == id);
        if (lesson is null)
        {
            return CourseErrors.LessonNotFound;
        }

        _lessons.Remove(lesson);
        return Result.Success();
    }
}
```

When a rule needs to span *two* aggregates instead of one, that's a different problem, and I'd reach for a [**domain event**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md) rather than letting one aggregate reach into another.

---

## What You Actually Get

You can write the same system procedurally, and it can work well. The thing you give up is **trust**.

In a procedural system, every caller shares responsibility for not breaking the rules. In an always-valid model, that responsibility lives on the domain model. The difference compounds over time:

- Validators don't drift, because there's nothing to duplicate.
- Code reviews focus on behavior instead of "did we forget a check?".
- New endpoints can't accidentally bypass a rule that lives on the entity.
- Tests stop covering scenarios that aren't even expressible.

The model goes from being a passive data carrier to being the smallest, sharpest place where the business rules live.

Fundamentally, this is about **encapsulation**. The model encapsulates the rules that govern its state, and the rest of the system interacts with it through a well-defined interface. That leads to cleaner code, fewer bugs, and a more maintainable system overall.

---

## Summary

An invariant is a rule that must always hold true while the object exists, and the cleanest place to enforce it is on the object itself.

- **Construction invariants** belong in a private constructor behind a factory.
- **State transition invariants** belong in methods that own the state they change.
- **Aggregate-wide invariants** belong on the root, with child entities accessed only through it.

The tradeoff is that you give up the freedom to write procedural code that could be easier to understand in the short term, but you get a model that you can trust to always be valid.

If you want to go deeper into modeling aggregates, value objects, and rich behavior across a real system, I think you will enjoy [**Pragmatic Domain-Driven Design**](/milanjovanovic.tech/pragmatic-domain-driven-design/README.md).

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Invariants Are (and Why a Domain Model Is the Best Place to Enforce Them)",
  "desc": "Most 'DDD-ish' code I review enforces business rules everywhere except where it should: in the model itself. The same rule ends up duplicated across handlers, validators, and controllers, and each copy drifts a little over time. Here's how I think about invariants, and why an always-valid domain model is the cleanest way to enforce them.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-invariants-are-and-why-a-domain-model-is-the-best-place-to-enforce-them.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
