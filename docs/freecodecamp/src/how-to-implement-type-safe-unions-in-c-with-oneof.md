---
lang: en-US
title: "How to Implement Type Safe Unions in C# With OneOf"
description: "Article(s) > How to Implement Type Safe Unions in C# With OneOf"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c#
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Type Safe Unions in C# With OneOf"
    - property: og:description
      content: "How to Implement Type Safe Unions in C# With OneOf"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-type-safe-unions-in-c-with-oneof.html
prev: /programming/cs/articles/README.md
date: 2026-01-24
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769193036631/70de89f6-047b-4894-9685-2c65c05b3620.jpeg
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
  name="How to Implement Type Safe Unions in C# With OneOf"
  desc="Have you ever needed a method to return different types depending on the situation? Perhaps a payment processor that returns different payment types, an order that can be in various states with different data, or better, a file loader that handles mu..."
  url="https://freecodecamp.org/news/how-to-implement-type-safe-unions-in-c-with-oneof"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769193036631/70de89f6-047b-4894-9685-2c65c05b3620.jpeg"/>

Have you ever needed a method to return different types depending on the situation? Perhaps a payment processor that returns different payment types, an order that can be in various states with different data, or better, a file loader that handles multiple formats?

In C#, we typically solve this with inheritance hierarchies, marker interfaces, or wrapper objects – all of which add complexity and reduce type safety. But luckily, there's a better way: discriminated unions using the OneOf library.

You may be familiar with union types if you’ve programmed with TypeScript before, as they’re one of the pivotal features of the language. Union types are not a concept which can be found natively within C#, but they are planned for a future release. Until then, you can use the `OneOf<T1,T2..>` library.

In this article, I'll show you how `OneOf` brings F#-like discriminated unions to C#, enabling you to write cleaner, more expressive, and type-safe code across a variety of scenarios – from polymorphic return types to state machines, even elegant error handling.

---

## What is OneOf?

The OneOf package offers discriminated unions for C#, allowing you to return one of several predefined types from a single method. Unlike a `Tuple`, which bundles multiple values together (A **and** B), OneOf represents a choice (A **or** B **or** C).

Think of it as a type-safe way to say: "This method returns either type A, **or** type B, **or** type C" – and the compiler enforces that you handle all possibilities.

```cs
// Instead of this (returns both, whether you need them or not)
public (User user, Error error) GetUser(int id) { ...  }

// You can do this (returns one OR the other)
public OneOf<User, NotFound, DatabaseError> GetUser(int id) { ... }
```

### Why OneOf Matters

- **Type safety**: The compiler ensures you handle every possible return type
- **Self-documenting**: Method signatures clearly show all possible outcomes
- **No inheritance required**: Returns different types without forcing them into a class hierarchy
- **Pattern matching**: Uses `.Match()` to handle each case exhaustively
- **Flexibility**: Supports 2, 3, 4+ different return types as needed

---

## Installing OneOf

::: tabs

@tab:active Option 1 (Recommended)

Using the terminal, navigate to your project folder and run the below command:

```sh
dotnet add package OneOf
```

@tab Option 2:

Using your IDE (Visual Studio, Rider, or VS Code):

1. Right-click your project file
2. Select "Manage NuGet Packages"
3. Search for "OneOf"
4. Click Install

:::

---

## Core Concepts And Functionality

There are multiple core concepts you’ll need to understand to get the most out of the OneOf library and understand its real benefits. These are:

### Union Types: One of Many

At its heart, OneOf represents a union type. A value that can be one of several predefined types at any given time. Think of it as a type-safe container that holds exactly one value, but that value could be any of the types you specify.

```cs
// This variable can hold a string OR an int OR a bool
// but only ONE at a time
OneOf<string, int, bool> myValue;

myValue = "hello";     // Currently holds a string
myValue = 42;          // Now holds an int
myValue = true;        // Now holds a bool
```

This is fundamentally different from a C# `Tuple` type, which holds multiple values simultaneously:

```cs
// Tuple: Holds ALL values at once (AND) 
var tuple = ("hello", 42, true); // Has string AND int AND bool

// OneOf: Holds ONE value at a time (OR) 
OneOf<string, int, bool> union = "hello"; // Has string OR int OR bool
```

### Type Safety and Exhaustive Handling

OneOf isn't just convenient, it's compiler-enforced. When you work with a OneOf value, the compiler ensures that you handle every possible type within your `.Match()` method. This eliminates entire categories of bugs where you forget to handle a case.

For example:

```cs
OneOf<Success, Failure, Pending> result = GetResult();

// Compiler forces you to handle all three
result.Match(
    success => HandleSuccess(success),
    failure => HandleFailure(failure),
);

// Missing a case? Won't compile!
```

You’ll get a compiler warning and if you hover over it in your IDE or code editor, you’ll see a hint like so:

![Image showing intellisense hints, informing the developer that they have missed a handler function, based on 3 types specified and only 2 handlers](https://cdn.hashnode.com/res/hashnode/image/upload/v1769177846621/88d52e4b-3e8b-4e1b-8e2c-4eba36c6d24d.png)

### The `.Match()` Method

The `.Match()` method is one of OneOf's killer features. It requires you to provide a handler function for each possible type in your union, ensuring you never forget to handle a case.

Think of it like a type-safe switch statement that the compiler enforces:

```cs
OneOf<CreditCardInfo,PayPalUser,CryptoAccount> result = GetPaymentMethod(); // MasterCard

result.Match(
    creditCard => ProcessCreditCard(creditCard),
    paypal => ProcessPayPal(paypal),
    crypto => ProcessCrypto(crypto)
);
```

::: info How <code>.Match()</code> works:

1. OneOf determines which type the value currently holds
2. It executes the corresponding handler function for that type
3. It passes the actual value (with the correct type) to your handler
4. It returns the result from whichever handler executed

:::

The generic type ordering matters, especially in relation to the `.Match()` method and the defined handlers.

![code block showing order of return types, CreditCard, Paypal and CryptoWallet, combined with the .Match method to define each handler for each type.](https://cdn.hashnode.com/res/hashnode/image/upload/v1769194375840/9832db95-6d04-4cc0-9376-751cb4e50138.png)

- **Generic typing order:** If you declare `OneOf<CreditCard, PayPal, CryptoWallet>`, then `CreditCard` is `T0`, `PayPal` is `T1,` and `CryptoWallet` is `T2`. That order determines which handler in `.Match(...)` will be executed, not its type.
- **Handler parameter names are arbitrary**: You can name them `option1`, `foo`, or `creditCard`. The name doesn’t determine the type, position does. The compiler binds the first handler to `CreditCard`, the second to `PayPal`, and third to CryptoWallet.
- Each handler receives a strongly-typed parameter corresponding to its position. When the first handler runs, its parameter is a `CreditCard` object (with full IntelliSense and compile-time checks).
- For readability, prefer meaningful names (for example, `creditCard`, `payPal`, `crypto`) rather than `option1/2/3`, as this was only for demonstration purposes.

### Accessing Values

While `.Match()` is the recommended approach, OneOf also provides direct type checking and access, albeit quite cumbersome and not as intuitive.

```cs
OneOf<string, int> example = "hello";

// Check which type it contains
if (example.IsT0)  // Is it the first type (string)?
{
    string str = example.AsT0;  // Get it as a string
    Console.WriteLine(str);
}
else if (example.IsT1)  // Is it the second type (int)?
{
    int num = example.AsT1;  // Get it as an int
    Console.WriteLine(num);
}
```

You should avoid this approach in most cases for several reasons:

Firstly, you lose the compiler enforcement that makes `.Match()` so powerful. Want to add a third type later? The compiler won't remind you to handle it here, and your code could become brittle and be more prone to failure.

Secondly, it's verbose and cluttered. Instead of one clean `.Match()` call, you need multiple if-else blocks that make your code harder to read and maintain.

Thirdly, the `T0`, `T1`, `T2` naming convention is positional and confusing. Which type was `T0` again? You have to constantly refer back to the method signature to remember the order, which can become frustrating for yourself and development team.

Finally, it's error-prone. Nothing prevents you from forgetting to check `IsT2` when dealing with three or more types.

Use `.Match()` whenever possible. Only resort to `IsT0`/`AsT0` when you have a specific reason to check for just one type, and the others are irrelevant in the current code flow.

---

## A Solution to Exception-Driven Control Flow

Many codebases overuse exceptions for control flow, making code harder to follow and debug. When you see a method call, there's no indication in the signature whether it might throw an exception or what type of errors to expect. This leads to several issues:

### Hidden Control Flow

```cs
// What can go wrong here? The signature doesn't tell you.
public User GetUser(int id)
{
    var user = _dbContext.Users.Find(id);
    if (user == null)
        throw new UserNotFoundException();  // Hidden jump in control flow!

    return user;
}

// Caller has no idea this can throw an exception
var user = _userService.GetUser(123);  // Might explode!
Console.WriteLine(user.Name);
```

### Exceptions As Expected Outcomes

When a user enters an invalid email or a record isn't found, these aren't truly *exceptional* circumstances –they're expected, predictable outcomes that should be part of your normal business logic. Using exceptions for these scenarios treats routine validation as a crisis.

### Performance Impact in Hot Paths

While not always significant, throwing exceptions involves stack unwinding which can be hundreds of times slower than returning a value. In tight loops or high-throughput APIs, this overhead accumulates quickly.

```cs
// Which exceptions should I catch? All of them? Specific ones?
try
{
    var user = _userService.GetUser(id);
    var order = _orderService.CreateOrder(user);
    var payment = _paymentService.ProcessPayment(order);
}
catch (Exception ex)  // Too broad? Catching things we shouldn't?
{
    // Which operation failed? Hard to tell.
    return StatusCode(500, "Something went wrong");
}
```

---

## OneOf Provides a Cleaner Alternative

OneOf makes failures explicit, type-safe, and part of the method signature. When you see a method that returns `OneOf<Success<T>, Failure>`, you immediately know:

1. This method can fail
2. You must handle both success and failure cases
3. The compiler will enforce this

The following code shows how to implement it:

```cs :collapsed-lines
// Define your result types
public record Success<T>(T Value);
public record Failure(ErrorType Type, string[] Messages);

public enum ErrorType 
{
    Validation,
    NotFound,
    Database,
    Conflict,
}

// The signature now TELLS you this can fail
public OneOf<Success<User>, Failure> GetUser(int id)
{
    try
    {
        var user = _dbContext.Users.Find(id);

        if (user == null)
            return new Failure(ErrorType.NotFound, new[] { $"User {id} not found" });

        return new Success<User>(user);
    }
    catch (DbException ex)
    {
        return new Failure(ErrorType.Database, new[] { "Database error", ex.Message });
    }
}

// Usage: Now the caller MUST handle both cases - compiler enforces it
public IActionResult GetUserEndpoint(int id)
{
    var result = _userService.GetUser(id);

    return result.Match(
        success => Ok(success.Value),
        failure => failure.Type switch
        {
            ErrorType.NotFound => NotFound(new { errors = failure.Messages }),
            ErrorType.Database => StatusCode(500, new { errors = failure.Messages }),
            ErrorType.Validation => BadRequest(new { errors = failure.Messages }),
            ErrorType.Conflict => Conflict(new { errors = failure.Messages }),
            _ => StatusCode(500, new { errors = failure.Messages })
        }
    );
}
```

::: info What makes this better?

- **It’s self-documenting**: The method signature explicitly states "this returns a User OR a Failure" – no hidden surprises.
- **There’s compiler-enforced handling**: Forget to handle the failure case? Compilation error. The compiler won't let you ignore potential failures.
- **There’s clear intent**: When you call a method returning `OneOf<Success<T>, Failure>`, you know immediately you need to handle both paths. No guessing about which exceptions might be thrown.

:::

::: info When to Still Use Exceptions:

The goal isn't to eliminate exceptions entirely, but to reserve them for truly exceptional circumstances while using `OneOf` for predictable, business-logic failures. You could still use exceptions in these scenarios:

- Truly unexpected failures (out-of-memory, hardware failures)
- Framework/library boundaries that expect exceptions
- Constructor failures (constructors can't return Result types)
- Third-party code contracts

:::

---

## Other OneOf Use Cases

### Use Case 1: Polymorphic Return Types (Without Inheritance)

When you need to return different types based on logic but don't want to force inheritance:

```cs
// Different payment methods - no shared base class needed
public OneOf<CreditCardPayment, PayPalPayment, CryptoPayment> GetPaymentMethod(PaymentRequest request)
{
    return request.Method switch
    {
        "card" => new CreditCardPayment(request.CardNumber, request.CVV),
        "paypal" => new PayPalPayment(request.Email),
        "crypto" => new CryptoPayment(request.WalletAddress),
        _ => throw new ArgumentException("Unknown payment method")
    };
}
// Usage - compiler enforces handling all types
var payment = GetPaymentMethod(request);
payment.Match(
    card => ChargeCard(card),
    paypal => ProcessPayPal(paypal),
    crypto => ProcessCrypto(crypto)
);
```

::: info Why this is better than inheritance:

- No artificial base class needed
- Each payment type can have completely different properties
- Clear, explicit handling of each case
- Easy to add new payment types (compiler will tell you everywhere to update)

:::

### Use Case 2: State Machines With Rich Data

Representing different states in a workflow where each state carries different information:

```cs
public class Order
{
    public OneOf<Pending, Processing, Shipped, Delivered, Cancelled> Status { get; set; }
}

public record Pending(DateTime OrderedAt);
public record Processing(DateTime StartedAt, string WarehouseId);
public record Shipped(DateTime ShippedAt, string TrackingNumber, string Carrier);
public record Delivered(DateTime DeliveredAt, string SignedBy);
public record Cancelled(DateTime CancelledAt, string Reason);

// Each state carries relevant data
var statusMessage = order.Status. Match(
    pending => $"Order placed on {pending.OrderedAt:d}",
    processing => $"Processing in warehouse {processing.WarehouseId}",
    shipped => $"Shipped via {shipped.Carrier}, tracking:  {shipped.TrackingNumber}",
    delivered => $"Delivered on {delivered.DeliveredAt:d}, signed by {delivered.SignedBy}",
    cancelled => $"Cancelled: {cancelled.Reason}"
);
```

::: info Why not just use an enum?

- Enums only store the state – they can't carry additional data
- With OneOf, `Processing` knows which warehouse, and `Shipped` knows the tracking number offering more functionality and potential other logic to be carried out easily
- Type-safe access to state-specific data
- Impossible to access wrong data for a state (compiler prevents it)

:::

### Use Case 3: Multi-Channel Notifications

Sending notifications through different channels, each with different requirements:

```cs
public record EmailNotification(string To, string Subject, string Body);
public record SmsNotification(string PhoneNumber, string Message);
public record PushNotification(string DeviceToken, string Title, string Body);
public record InAppNotification(int UserId, string Message);

public async Task SendNotification(
    OneOf<EmailNotification, SmsNotification, PushNotification, InAppNotification> notification)
{
    await notification.Match(
        async email => await _emailService.SendAsync(email.To, email.Subject, email.Body),
        async sms => await _smsService.SendAsync(sms.PhoneNumber, sms.Message),
        async push => await _pushService.SendAsync(push.DeviceToken, push.Title, push.Body),
        async inApp => await _notificationRepo.CreateAsync(inApp.UserId, inApp.Message)
    );
}

// Usage
await SendNotification(new EmailNotification("user@example.com", "Welcome", "Hello! "));
await SendNotification(new SmsNotification("+1234567890", "Your code is 123456"));
```

::: info Benefits:

- Could have a single, unified notification interface
- Each channel has exactly the parameters it needs
- No optional/nullable properties for irrelevant fields
- Clear routing logic

:::

### Use Case 4: File Format Handling

Handling different file types and data formats:

```cs
public record CsvData(string[] Lines);
public record JsonData(string Content);
public record ExcelData(IWorkbook Workbook);

public OneOf<CsvData, JsonData, ExcelData> LoadDataFile(string path)
{
    var extension = Path.GetExtension(path).ToLower();

    return extension switch
    {
        ". csv" => new CsvData(File.ReadAllLines(path)),
        ".json" => new JsonData(File.ReadAllText(path)),
        ".xlsx" => new ExcelData(LoadExcelFile(path)),
        _ => throw new UnsupportedFileFormatException(extension)
    };
}

// Process different formats uniformly
var data = LoadDataFile(filePath);
var records = data.Match(
    csv => ParseCsv(csv.Lines),
    json => ParseJson(json.Content),
    excel => ParseExcel(excel.Workbook)
);
```

::: info This is perfect for:

- APIs that offer multiple export formats
- Import wizards that accept various file types
- Configuration loaders supporting multiple formats

:::

---

## Key Benefits of OneOf

OneOf shines when you have:

- Multiple valid return types that don't share a common base class
- Different data shapes for different scenarios
- Type-safe branching where you want the compiler to enforce handling all cases
- Domain modeling where different states carry different information
- Explicit outcomes that should be part of the method signature

It's essentially a way to say "this method returns **A** or **B** or **C**" in a type-safe way, forcing consumers to explicitly handle each possibility. This leads to more robust, self-documenting code that's harder to misuse.

---

## Conclusion

OneOf brings the power of discriminated unions to C#, enabling more expressive and type-safe code across numerous scenarios. Whether you're modeling payment methods, order states, notification channels, or error handling, OneOf provides a clean, compiler-enforced way to handle multiple return types.

Start incorporating OneOf into your projects, and you'll find your code becomes more intentional, easier to maintain, and less error-prone.

As always, if you’ve enjoyed reading this article feel free to [reach out on Twitter (<VPIcon icon="fa-brands fa-x-twitter" />`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Type Safe Unions in C# With OneOf",
  "desc": "Have you ever needed a method to return different types depending on the situation? Perhaps a payment processor that returns different payment types, an order that can be in various states with different data, or better, a file loader that handles mu...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-type-safe-unions-in-c-with-oneof.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
