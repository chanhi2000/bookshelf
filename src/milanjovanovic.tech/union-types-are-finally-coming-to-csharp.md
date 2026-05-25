---
lang: en-US
title: "Union Types Are Finally Coming to C#"
description: "Article(s) > Union Types Are Finally Coming to C#"
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
      content: "Article(s) > Union Types Are Finally Coming to C#"
    - property: og:description
      content: "Union Types Are Finally Coming to C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/union-types-are-finally-coming-to-csharp.html
prev: /programming/cs/articles/README.md
date: 2026-05-30
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_196.png
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
  name="Union Types Are Finally Coming to C#"
  desc="For years we faked union types with marker interfaces, base classes, and the OneOf library. C# 15 finally bakes them into the language - and here's a quick tour of what they look like and why I think they're a big deal."
  url="https://milanjovanovic.tech/blog/union-types-are-finally-coming-to-csharp"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_196.png"/>

Every backend developer eventually hits the same wall: a method that can return *one of several things*.

A parse that either gives you a number or an error. A lookup that returns a value or "not found". An operation that succeeds or fails. In C#, we've never had a clean way to model "this is an `A` **or** a `B`". So we faked it - with marker interfaces, abstract base classes, tuples, nullable returns, exceptions, or the excellent [<VPIcon icon="iconfont icon-github"/>`mcintyre321/OneOf`](https://github.com/mcintyre321/OneOf) library.

C# 15 (shipping with .NET 11) finally adds **union types** to the language. I've wanted this for years, so let me give you a quick tour.

Let's dive in.

---

## The Problem

Say a method can return a user or fail because they don't exist. Today you'd reach for something like this:

```cs
// Throw for the "failure" case - control flow via exceptions
public User GetUser(int id) =>
    _users.TryGetValue(id, out var user)
        ? user
        : throw new UserNotFoundException(id);
```

The signature says it returns a `User`, but that's a lie - it might throw instead. The caller has no way to know that without reading the body. The other usual workarounds (a bool `TryGet` with an `out` parameter, a custom `Result` class with nullable fields, or a `OneOf<User, NotFound>`) all add ceremony to express one simple idea.

What you actually want is a **closed set** of types. That's exactly what a union is.

---

## Declaring a Union

The syntax is delightfully small. You list a name and the case types:

```cs
public union Result<T>(T, Exception);
```

That's it. A `Result<T>` is now *either* a `T` *or* an `Exception` - and nothing else. The types don't even need to be related, which is the whole point.

Here's a more concrete example with unrelated record types:

```cs
public record CreditCard(string Last4, string Brand);
public record PayPal(string Email);
public record BankTransfer(string Iban);

public union PaymentMethod(CreditCard, PayPal, BankTransfer);
```

---

## Creating Values

There's an implicit conversion from each case type, so you just assign the value directly:

```cs
PaymentMethod method = new CreditCard("4242", "Visa");
```

Try to assign a type that isn't in the set, and it's a **compile error**. The set is closed.

---

## Consuming a Union

This is where it shines. Pattern matching just works, and the compiler checks the inner value for you:

```cs
string Describe(PaymentMethod method) => method switch
{
    CreditCard card  => $"{card.Brand} ending {card.Last4}",
    PayPal paypal    => $"PayPal ({paypal.Email})",
    BankTransfer ach => $"Bank transfer to {ach.Iban}",
}; // No `_` or `default` needed
```

Notice there's **no discard `_` and no `default` arm**. Because the union is closed, the compiler knows all three cases are covered. Forget one, and you get a warning at compile time:

```plaintext
warning CS8509: The switch expression does not handle all possible values
of its input type (it is not exhaustive). For example, the pattern 'BankTransfer'
is not covered.
```

That exhaustiveness check is the feature I'm most excited about. Add a new case to the union later, and the compiler points you at every `switch` you forgot to update.

---

## Back to The Problem

Remember our lying `GetUser` method from earlier? Let's fix it with a union.

First, declare what the method can actually return - a `User` or a `NotFound`:

```cs
public record NotFound(int Id);

public union UserResult(User, NotFound);
```

Now the signature tells the truth, and there are no exceptions for control flow:

```cs
public UserResult GetUser(int id) =>
    _users.TryGetValue(id, out var user)
        ? user
        : new NotFound(id);
```

And the caller has to handle both outcomes - the compiler won't let them forget:

```cs
IResult response = GetUser(42) switch
{
    User user      => Results.Ok(user),
    NotFound found => Results.NotFound($"No user with id {found.Id}"),
};
```

That's the whole pitch. The return type *tells you the truth*: here are exactly the shapes you'll get back, and you can't ignore one by accident. No more reading the method body to discover what it might throw.

::: tip A Few Caveats

This is still a **preview/experimental** feature. A few things to keep in mind:

- It targets **C# 15 / .NET 11**, and the syntax may still change before release. Try it on .NET 11 Preview 4 or later.
- Under the hood, a union is compiled to a `struct` that boxes value-type cases and stores the contents as a single `object?`. There's a non-boxing path for performance-sensitive code, but the default is simple.
- This is a *type* union (an `A` or a `B`), not a full discriminated union with named cases yet. It covers the vast majority of what I reach for OneOf for today.

:::

---

## Summary

Union types close a gap that's been open in C# for a very long time.

- Declare a **closed set** of types with `public union Name(A, B, C);`.
- Assign case values **directly** - implicit conversions handle the rest.
- **Pattern match** with full compiler-checked exhaustiveness, no `default` arm required.
- Model results, options, and "one of these" returns **without** marker interfaces, base classes, or extra libraries.

It's a small syntax with a big payoff: your method signatures finally tell the truth about what they return, and the compiler keeps every `switch` honest.

I'll explore this feature more in the future, but I wanted to share this quick tour now that it's available in preview.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Union Types Are Finally Coming to C#",
  "desc": "For years we faked union types with marker interfaces, base classes, and the OneOf library. C# 15 finally bakes them into the language - and here's a quick tour of what they look like and why I think they're a big deal.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/union-types-are-finally-coming-to-csharp.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
