---
lang: en-US
title: "Functional Programming in C#: The Practical Parts"
description: "Article(s) > Functional Programming in C#: The Practical Parts"
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
      content: "Article(s) > Functional Programming in C#: The Practical Parts"
    - property: og:description
      content: "Functional Programming in C#: The Practical Parts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/functional-programming-in-csharp-the-practical-parts.html
prev: /programming/cs/articles/README.md
date: 2024-11-09
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_115.png
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
  name="Functional Programming in C#: The Practical Parts"
  desc="Functional programming patterns can make your C# code safer and more maintainable, without getting lost in academic theory. Learn practical patterns you can use today to write better code."
  url="https://milanjovanovic.tech/blog/functional-programming-in-csharp-the-practical-parts"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_115.png"/>

Functional programming patterns can feel academic and abstract. Terms like "monads" and "functors" scare many developers away. But beneath the intimidating terminology are practical patterns that can make your code safer and more maintainable.

C# has embraced many functional programming features over the years.

- Records for immutability
- LINQ for functional transformations
- Lambda expressions for first-class functions

These features aren't just syntax sugar - they help prevent bugs and make code easier to reason about.

Let's look at five practical patterns you can use in your C# projects today.

---

## Higher-Order Functions

Higher-order functions can take other functions as parameters or return them as results. They let you write code that's more flexible and composable because you can pass behavior around like data.

Common examples of higher-order functions are LINQ's `Where` and `Select`, which take functions to transform data.

Let's refactor this validation example with higher-order functions:

```cs title="OrderValidator.cs"
public class OrderValidator
{
    public bool ValidateOrder(Order order)
    {
        if (order.Items.Count == 0) return false;
        if (order.TotalAmount <= 0) return false;
        if (order.ShippingAddress == null) return false;
        return true;
    }
}

// What if we need:
// - different validation rules for different countries?
// - to reuse some validations but not others?
// - to combine validations differently?
```

Here's how higher-order functions make this more flexible:

```cs title="OrderValidation.cs"
public static class OrderValidation
{
    public static Func<Order, bool> CreateValidator(string countryCode, decimal minimumOrderValue)
    {
        var baseValidations = CombineValidations(
            o => o.Items.Count > 0,
            o => o.TotalAmount >= minimumOrderValue,
            o => o.ShippingAddress != null
        );

        return countryCode switch
        {
            "US" => CombineValidations(
                baseValidations,
                order => IsValidUSAddress(order.ShippingAddress)),
            "EU" => CombineValidations(
                baseValidations,
                order => IsValidVATNumber(order.VatNumber)),
            _ => baseValidations
        };
    }

    private static Func<Order, bool> CombineValidations(params Func<Order, bool>[] validations) =>
        order => validations.All(v => v(order));
}

// Usage
var usValidator = OrderValidation.CreateValidator("US", minimumOrderValue: 25.0m);
var euValidator = OrderValidation.CreateValidator("EU", minimumOrderValue: 30.0m);
```

The higher-order function approach makes validators composable, testable, and easy to extend. Each validation rule is a simple function that we can compose.

---

## Errors as Values

Error handling in C# often looks like this:

```cs title="UserService.cs"
public class UserService
{
    public User CreateUser(string email, string password)
    {
        if (string.IsNullOrEmpty(email))
        {
            throw new ArgumentException("Email is required");
        }

        if (password.Length < 8)
        {
            throw new ArgumentException("Password too short");
        }

        if (_userRepository.EmailExists(email))
        {
            throw new DuplicateEmailException(email);
        }

        // Create user...
    }
}
```

The problem?

- [<VPIcon icon="fa-brands fa-youtube"/>Exceptions are expensive](https://youtu.be/E3dU9Y1CsnI)
- Callers often forget to handle exceptions
- The method signature lies - it claims to return a User but might throw

<VidStack src="youtube/E3dU9Y1CsnI" />

We can make errors explicit using the [<VPIcon icon="iconfont icon-github"/>`mcintyre321/OneOf`](https://github.com/mcintyre321/OneOf) library. It provides discriminated unions for C#, using a custom type `OneOf<T0, ... Tn>`.

```cs title="UserService.cs"
public class UserService
{
    public OneOf<User, ValidationError, DuplicateEmailError> CreateUser(string email, string password)
    {
        if (string.IsNullOrEmpty(email))
        {
            return new ValidationError("Email is required");
        }

        if (password.Length < 8)
        {
            return new ValidationError("Password too short");
        }

        if (_userRepository.EmailExists(email))
        {
            return new DuplicateEmailError(email);
        }

        return new User(email, password);
    }
}
```

By making the errors explicit:

- The method signature tells the whole truth
- Callers must handle all possible outcomes
- No performance overhead from exceptions
- The flow is easier to follow

Here's how you use it:

```cs
var result = userService.CreateUser(email, password);

result.Switch(
    user => SendWelcomeEmail(user),
    validationError => HandleError(validationError),
    duplicateError => HandleError(duplicateError)
);
```

---

## Monadic Binding

A **monad** is a container for values - like `List<T>`, `IEnumerable<T>`, or `Task<T>`. What makes it special is that you can chain operations on the contained values without dealing with the container directly. This chaining is called monadic binding.

You use monadic binding daily with LINQ, but you might not know it. It's what allows us to chain operations that transform data.

Map (`Select`) transforms values:

```cs
// Simple transformations with Select (Map)
var numbers = new[] { 1, 2, 3, 4 };

var doubled = numbers.Select(x => x * 2);
```

Bind (`SelectMany`) transforms and flattens:

```cs
// Operations that return multiple values use SelectMany (Bind)
var folders = new[] { "docs", "photos" };

var files = folders.SelectMany(folder => Directory.GetFiles(folder));
```

A popular example of applying monads in practice is the [**Result pattern**](/milanjovanovic.tech/functional-error-handling-in-dotnet-with-the-result-pattern.md), which provides a clean way to chain operations that might fail.

---

## Pure Functions

Pure functions are predictable: they depend only on their inputs and don't change anything in the system. No database calls, no API requests, no global state. This constraint makes them easier to understand, test, and debug.

```cs title="PriceCalculator.cs"
// Impure - relies on hidden state
public class PriceCalculator
{
    private decimal _taxRate;
    private List<Discount> _activeDiscounts;

    public decimal CalculatePrice(Order order)
    {
        var price = order.Items.Sum(i => i.Price);

        foreach (var discount in _activeDiscounts)
        {
            price -= discount.Calculate(price);
        }

        return price * (1 + _taxRate);
    }
}
```

Here's the same example as a pure function:

```cs title="PriceCalculator.cs"
// Pure - everything is explicit
public static class PriceCalculator
{
    public static decimal CalculatePrice(
        Order order,
        decimal taxRate,
        IReadOnlyList<Discount> discounts)
    {
        var basePrice = order.Items.Sum(i => i.Price);

        var afterDiscounts = discounts.Aggregate(
            basePrice,
            (price, discount) => price - discount.Calculate(price));

        return afterDiscounts * (1 + taxRate);
    }
}
```

Pure functions are thread-safe, easy to test, and simple to reason about because all dependencies are explicit.

---

## Immutability

Immutable objects can't be changed after creation. Instead, they create new instances for every change. This simple constraint eliminates entire categories of bugs: race conditions, accidental modifications, and inconsistent state.

Here's an example of a mutable type:

```cs title="Order.cs"
public class Order
{
    public List<OrderItem> Items { get; set; }
    public decimal Total { get; set; }
    public OrderStatus Status { get; set; }

    public void AddItem(OrderItem item)
    {
        Items.Add(item);
        Total += item.Price;
        // Bug: Thread safety issues
        // Bug: Can modify shipped orders
        // Bug: Total might not match Items
    }
}
```

Let's make this an immutable type:

```cs title="Order.cs"
public record Order
{
    public ImmutableList<OrderItem> Items { get; init; }
    public OrderStatus Status { get; init; }
    public decimal Total => Items.Sum(x => x.Price);

    public Order AddItem(OrderItem item)
    {
        if (Status != OrderStatus.Created)
        {
            throw new InvalidOperationException("Can't modify shipped orders");
        }

        return this with
        {
            Items = Items.Add(item)
        };
    }
}
```

The immutable version:

- Is thread-safe by default
- Makes invalid states impossible
- Keeps data and calculations consistent
- Makes changes explicit and traceable

---

## Takeaway

[**Functional programming**](/milanjovanovic.tech/how-to-apply-functional-programming-in-csharp.md) isn't just about writing "cleaner" code. These patterns fundamentally change how you handle complexity:

- **Push errors to compile time** - Catch problems before running the code
- **Make invalid states impossible** - Don't rely on documentation or conventions
- **Make the happy path obvious** - When everything is explicit, the flow is clear

You can adopt these patterns gradually. Start with one class, one module, one feature. The goal isn't to write purely functional code. The goal is to write code that's safer, more predictable, and easier to maintain.

Hope this was helpful. See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Functional Programming in C#: The Practical Parts",
  "desc": "Functional programming patterns can make your C# code safer and more maintainable, without getting lost in academic theory. Learn practical patterns you can use today to write better code.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/functional-programming-in-csharp-the-practical-parts.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
