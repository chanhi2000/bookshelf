---
lang: en-US
title: "How to Use FakeLogger to Make Testing Easier In .Net"
description: "Article(s) > How to Use FakeLogger to Make Testing Easier In .Net"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use FakeLogger to Make Testing Easier In .Net"
    - property: og:description
      content: "How to Use FakeLogger to Make Testing Easier In .Net"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-fakelogger-to-make-testing-easier-in-net.html
prev: /programming/cs/articles/README.md
date: 2025-02-18
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739486043718/2d1e6339-fb93-4719-a89a-5b29e30c2bfc.png
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
  name="How to Use FakeLogger to Make Testing Easier In .Net"
  desc="When writing unit tests in .NET, you may need to verify that methods are logging exceptions, errors, or other key information. You might think, No problem, I'll just mock ILogger using my favourite mocking library - for example Moq, NSubstitute, or F..."
  url="https://freecodecamp.org/news/how-to-use-fakelogger-to-make-testing-easier-in-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739486043718/2d1e6339-fb93-4719-a89a-5b29e30c2bfc.png"/>

When writing unit tests in .NET, you may need to verify that methods are logging exceptions, errors, or other key information. You might think, *No problem, I'll just mock* `ILogger` using my favourite mocking library - for example Moq, NSubstitute, or FakeItEasy.

While `ILogger` itself is an interface and can be mocked, many of its commonly used logging methods (like `LogInformation()`, `LogError()`, and so on) are what’s called static or extension methods. Since static and extension methods can't be mocked directly, you often need a custom abstraction layer (LoggingService) or a decorator to pass to various other methods or services.

There is another much easier way though. In this article, I will show you how to use the relatively new feature available from .Net 8 upwards called `FakeLogger`.

---

## Tutorial Setup

Let’s imagine you’ve created an online shopping ordering and invoicing service. The logical code tests have been completed, but you now need to test the logging functionality.

For this tutorial we’ll be using the `OrderService` and `InvoiceService` classes defined below. I’ve provided comments to illustrate where normally your logic would go, but as this isn’t relevant for the purpose of this tutorial, comments will suffice.

```cs :collapsed-lines
namespace FakeLogger_Tutorial;

public class OrderService(ILogger logger, IInvoiceService invoiceService)
{
    public void ProcessOrder(Order order)
    {
        logger.LogInformation("Processing order...");

        // Order processing code goes here

        logger.LogInformation("Order processed successfully.");

        invoiceService.SendInvoice(order);
    }
}

public class InvoiceService(ILogger logger) : IInvoiceService
{
    public void SendInvoice(Order order)
    {
        // Dispatch order to shipping service
        logger.LogInformation("Order dispatched: {OrderId}", order.ID);

        // Generate invoice code

        SendEmail();
    }

    private void SendEmail()
    {
        // Send email to customer
        logger.LogInformation("Sending invoice to customer");

        // Perform email sending logic...

        logger.LogInformation("Email sent successfully.");
    }
}

public interface IInvoiceService
{
    void SendInvoice(Order order);
}
```

As well as a very basic `Order` and `Product` classes:

```cs :collapsed-lines
public class Order
{
    public Guid ID { get; set; }
    public required Guid CustomerId { get; set; }

    public List<Product> Products = [];

    public decimal TotalPrice => Products.Sum(x => x.Price);

    public DateTime OrderDate { get; set; }
}

public class Product
{
    public Guid ID { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

---

## How to Test the Logging Functionality

Like most aspects of coding, there are multiple ways to achieve this. The recommended approach is to mock the logger and assert against the mocked logger object rather than a concrete instance. This allows for controlled, isolated, and verifiable tests without relying on external dependencies or real logging behaviour - meaning cleaner and more maintainable tests.

You can do this using your preferred mocking library, such as **Moq, FakeItEasy, or NSubstitute**. You can learn more about these libraries and how to mock successfully in another tutorial I wrote, which you can find [**here**](https://freecodecamp.org/explore-mocking-in-net.md).

Your initial thoughts may be to write tests like the below example using `Moq` and `XUnit` but this won’t work, and I’ll explain why.

```cs :collapsed-lines title="FailingTestCases.cs"
using FakeLogger_Tutorial;
using Microsoft.Extensions.Logging;
using Moq;

namespace UnitTests;

public class FailingTestCases
{
    [Fact]
    public void LogError_Should_Call_LogError()
    {
        // Arrange
        var mockLogger = new Mock<ILogger>();

        // pass the mockedLogger to our service
        var orderService = new OrderService(
            mockLogger.Object, 
            new Mock<IInvoiceService>().Object
        );

        var customerId = Guid.NewGuid();
        var order = new Order
        {
            ID = Guid.NewGuid(),
            CustomerId = customerId,
            Products = [new Product { ID = Guid.NewGuid(), Name = "Ping pong balls", Price = 1.00M }],
            OrderDate = default,
        };

        // Act
        orderService.ProcessOrder(order);      

        // Assert
        mockLogger.Verify(x => x.LogInformation("Processing order..."), Times.Once);
        mockLogger.Verify(x => x.LogInformation("Order processed successfully."), Times.Once);
    }
}
```

When you run this code, it **will** fail with the following error:

```plaintext title="output"
System.NotSupportedException: 
Unsupported expression: x => x.LogInformation("Processing order...", new[] {  })
```

### Why Does This Happen?

Mocking libraries struggle with static methods like `LogInformation` because they belong to the type itself, not an instance. Some tools, like JustMock, can handle this using advanced techniques like IL rewriting or shims, but these add complexity.

A common workaround is wrapping `ILogger` in a logging service for easier testing, along with benefits like abstraction and maintainability. But for a simpler approach, we’ll focus on the new `FakeLogger` class.

You could test ILogger using the `Verify` method in Moq, using some overly complicated, verbose methods like below. The test code will work, but it's a bit too complex and hard to read, especially at a glance.

```cs :collapsed-lines title="FailingTestCases.cs"
using FakeLogger_Tutorial;
using Microsoft.Extensions.Logging;
using Moq;

namespace UnitTests;

public class FailingTestCases
{
    [Fact]
    public void LogError_Should_Call_Logger_LogError()
    {
        // Arrange
        var mockLogger = new Mock<ILogger>();
        var mockInvoiceService = new Mock<IInvoiceService>();

        var orderService = new OrderService(
            mockLogger.Object, 
            mockInvoice.Object           
        );

        var customerId = Guid.NewGuid();
        var order = new Order
        {
            ID = Guid.NewGuid(),
            CustomerId = customerId,
            Products = [new Product { ID = Guid.NewGuid(), Name = "Ping pong balls", Price = 1.00M }],
            OrderDate = default,
        };

        // Act
        orderService.ProcessOrder(order);

        // Assert
        mockLogger.Verify(logger => logger.Log(
                It.Is<LogLevel>(logLevel => logLevel == LogLevel.Information),
                It.Is<EventId>(eventId => eventId.Id == 0),
                It.Is<It.IsAnyType>((@object, @type) =>
                    @object.ToString() == "Processing order..."),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()),
            Times.Once);
    }
}
```

---

## How to Use FakeLogger

With .NET 8, we can use the `FakeLogger` class to make tests clearer for other developers. If you haven’t upgraded yet, I highly recommend it—.NET 8 offers Long-Term Support (LTS) and unlocks many other useful features.

Microsoft defines the class as:

> This type is intended for use in unit tests. It captures all the log state to memory and lets you inspect it to validate that your code is logging what it should.

In simple terms means that the FakeLogger acts as an in-memory collection of all the Logs and their associated data, meaning we can access these during out Unit Tests. It exposes all the extension methods we would find on the `ILogger` implementation, making it the perfect way to test our logging functionality.

### Installing FakeLogger and FluentAssertions

FluentAssertions is a great testing library which makes your code easier to test and easier to read. It focuses on using clearly named assertion functions, like `Should(), Have()` / `Be()`.

You can install using the Nuget Package Manager within your preferred IDE, or via the terminal with the following command:

```sh
dotnet add package FluentAssertions
```

::: important

Do not exceed version 7.x.x of FluentAssertions, as v8 comes with a cost, whereas anything prior is free to use.

:::

Once installed, you will need to install `Microsoft.Extensions.Diagnostics.Testing` as before, using either the Package Console Manager, Terminal, or your preferred method.

```sh
dotnet add package Microsoft.Extensions.Diagnostics.Testing
```

### Using the FakeLogger Class

It is as simple as using any other class in C#. We can instantiate it like so:

```cs
using Microsoft.Extensions.Diagnostics.Testing;

var fakeLogger = new FakeLogger();
```

Now, rather than passing the `mockLogger.Object` to our OrderService as before, we shall instead pass our new `fakeLoger` object like so:

```cs
var loggingService = new OrderService(fakeLogger);
```

Below is an example of how we can use `FakeLogger` to check if an *Information* message was logged.

```cs
public void OrderService_ProcessOrder_ShouldLogProgress()
{
    // Arrange
    var fakeLogger = new FakeLogger();
    var mockInvoiceService = new Mock<IInvoiceService>();

    var orderService = new OrderService(
        fakeLogger,
        mockInvoiceService.Object
    );

    var customerId = Guid.NewGuid();
    var order = new Order
    {
        ID = Guid.NewGuid(),
        CustomerId = customerId,
        Products = [new Product { ID = Guid.NewGuid(), Name = "Ping pong balls", Price = 1.00M }],
        OrderDate = default,
    };

    // Act
    orderService.ProcessOrder(order);

    // Assert
    fakeLogger.Collector.Count.Should().Be(2);
    fakeLogger.Collector.LatestRecord.Level.Should().Be(LogLevel.Information);
    fakeLogger.Collector.LatestRecord.Message.Should().Be("Order processed successfully.");
}
```

As you can see, it is much easier to read than the previous `Moq` implementation. The `FakeLogger` solution combined with `FluentAssertions` is much more concise and humanly readable to developers of all skillsets.

### What Is `Collector`?

The `Collector` property in `FakeLogger` is an instance of `FakeLogCollector`, which collects and stores log information. It stores the messages in the same order they were called, making it easy to assert later.

#### Purpose of the `Collector` Property

- It **stores all log messages** captured by the `FakeLogger`.
- You can access, filter, and assert against logs in your tests.
- Useful when verifying structured logs or ensuring correct log levels.

### Useful Collector Properties

### `LatestRecord`

There is more than one way in which you can access and assert logged messages. In the example above, we use the `LatestRecord` property. The `LatestRecord` property returns the last `FakeLogRecord` recorded. This comes from the internal property `Records`, returning the last record in the List.

The `FakeLogRecord` object has the following properties:

- `Level`
- `Id`
- `State`
- `Exception`
- `Message`
- `Scopes`
- `Category`
- `LevelEnabled`
- `Timestamp`

We can therefore check any one of these properties in our assertions.

### `GetSnapshot()`

GetSnapshot() returns all log records collected.

- This method is useful when you want to inspect **all** logged messages, not just the most recent one.
- It returns an **immutable collection**, ensuring that logs are not modified unexpectedly.

As `GetSnapshot()` returns an immutable collection of messages. We can access these like any other collection of data, whilst also being able to use LINQ to filter, sort, and query the logs. This can be very useful when we would like to assert against the first, last, or any other logged message.

The following test utilises a concrete instance of `InvoiceService` as we wish to test the actual flow of logs, through both services.

```cs
[Fact]
public void ProcessOrder_ShouldLogMultipleMessages()
{
    // Arrange
    var fakeLog = new FakeLogger();
    var invoiceService = new InvoiceService(fakeLog);
    var orderService = new OrderService(fakeLog, invoiceService);
    var testOrder = new Order
    {
        ID = Guid.NewGuid(),
        CustomerId = Guid.NewGuid(),
        Products =
        [
            new Product { ID = Guid.NewGuid(), Name = "Product 1", Price = 99.99m },
            new Product { ID = Guid.NewGuid(), Name = "Product 2", Price = 199.99m }
        ],
    };

    // Act
    orderService.ProcessOrder(testOrder);

    // Assert
    fakeLog.Collector.GetSnapshot()[0].Message.Should().Be("Processing order...");
    fakeLog.Collector.GetSnapshot()[0].Level.Should().Be(LogLevel.Information);

    fakeLog.Collector.GetSnapshot()[1].Message.Should().Be("Order processed successfully.");
    fakeLog.Collector.GetSnapshot()[1].Level.Should().Be(LogLevel.Information);

    fakeLog.Collector.GetSnapshot()[2].Message.Should().Be($"Order dispatched: {testOrder.ID}");
    fakeLog.Collector.GetSnapshot()[2].Level.Should().Be(LogLevel.Information);

    fakeLog.Collector.GetSnapshot()[3].Message.Should().Be("Sending invoice to customer");
    fakeLog.Collector.GetSnapshot()[3].Level.Should().Be(LogLevel.Information);

    fakeLog.Collector.GetSnapshot()[4].Message.Should().Be("Email sent successfully.");
    fakeLog.Collector.GetSnapshot()[4].Level.Should().Be(LogLevel.Information);
}
```

This test demonstrates how straightforward it is to assert that the logger captures messages in execution order with the correct `LogLevel` and message. It also highlights the readability of the test.

---

## How to Assert That Structured Log Arguments Are Passed Correctly

Structured logging allows us to pass objects and variables as arguments to log messages, providing richer and more searchable logs. In `ILogger`, we can pass an object like this:

```cs
_logger.LogInformation("Order processed: {OrderId}", order.ID);
```

By default, logging providers (like the built-in .NET `ILogger` provider) replace placeholders immediately in the final log message.

With the built-in `ILogger`, the log message is fully formatted at runtime, for example:

```cs
_logger.LogInformation("Order number {OrderId} dispatched", 123);
```

**Final log recorded is:**

```plaintext title="output"
"Order number 123 dispatched"
```

This means that when retrieving logs in tests using the default log provider, we can only verify the final formatted string when using `FakeLogger` as it captures the fully rendered log message.

::: important

This differs from structured logging providers such as Serilog, where message templates and structured properties are stored separately. In Serilog, the `Message` column stores the original raw template string, while structured properties / objects are stored in a separate JSON field.

:::

This doesn’t mean you can’t use `FakeLogger` with Serilog—you absolutely can. But when asserting logs, you must adjust your assertions depending on whether you're verifying the fully formatted message or structured properties.

If we log an order dispatch:

```cs
logger.LogInformation("Order dispatched: {OrderId}", order.ID);
```

Unlike Serilog, `FakeLogger` does not store `{OrderId}` as a separate property. Instead, it captures the fully formatted message:

```plaintext title="output"
"Order dispatched: 550e8400-e29b-41d4-a716-446655440000"
```

Thus, when testing with `FakeLogger`, we **must** assert against the final formatted string.

Even though `FakeLogger` does not store the original message template, it does capture structured data separately. This allows you to assert both:

1. The final formatted message (since placeholders are replaced at runtime).
2. The structured data (objects or properties passed as arguments).

The test below asserts the final formatted message, as well as a `StructuredState` object (the recorded structured log information).

```cs
[Fact]
public void InvoiceOrder_ShouldLog_StructuredLogInfo()
{
    // Arrange
    var fakeLogger = new FakeLogger<InvoiceService>();
    var service = new InvoiceService(fakeLogger);
    var testOrder = new Order
    {
        ID = Guid.NewGuid(),
        CustomerId = Guid.NewGuid(),
        Products =
        [
            new Product { ID = Guid.NewGuid(), Name = "Product 1", Price = 99.99m },
            new Product { ID = Guid.NewGuid(), Name = "Product 2", Price = 199.99m }
        ],
    };

    // Act
    service.SendInvoice(testOrder);

    // Assert
    fakeLogger.Collector.GetSnapshot()[0].Message.Should().Be($"Order dispatched: {testOrder.ID}");
    var keyValuePairs = fakeLogger.Collector.GetSnapshot()[0].StructuredState;

    var orderIdProperty = keyValuePairs != null && keyValuePairs
        .Any(x => x.Key == "OrderId" && x.Value == testOrder.ID.ToString());

    orderIdProperty.Should().BeTrue();
}
```

---

## How to Verify That a Message Has Been Called at Any Time

What if you want to test that a message or a set of messages are called **anywhere** within the call stack? You can easily do this with the help of LINQ (if you’re not familiar with LINQ you can read it about it in my other article [**here**](/freecodecamp.org/how-to-use-linq.md)).

We don’t wish to assert that messages are sent in the correct order, just that the messages are logged. We can do this as follows:

```cs
[Fact]
public void AllMessages_Should_BeSentInAnyOrder()
{
    // Arrange
    var testOrder = new Order
    {
        ID = Guid.NewGuid(),
        CustomerId = Guid.NewGuid(),
        Products =
        [
            new Product { ID = Guid.NewGuid(), Name = "Product 1", Price = 99.99m },
            new Product { ID = Guid.NewGuid(), Name = "Product 2", Price = 199.99m }
        ],
    };

    var fakeLogger = new FakeLogger();
    var invoiceService = new InvoiceService(fakeLogger);
    var orderService = new OrderService(fakeLogger, invoiceService);
    var expectedMessages = new List<string>
    {
        $"Order Dispatched: {testOrder.ID}",         
        "Processing order...",
        "Invoice sent"
    };

    // Act
    orderService.ProcessOrder(testOrder);

    // Assert
    fakeLogger.Collector.GetSnapshot()
        .Select(x => x.Message)
        .Should().IntersectWith(expectedMessages);
}
```

Here, we can utilise the power of LINQ and FluentAssertions to `Select` each message stored within the `Collector` property, and then assert that the array of messages can `IntersectWith` the expected messages.

The `IntersectWith` method asserts that the collection shares one or more items with the provided collection, a perfect fit for this kind of scenario where we don’t care about the order of logged messages - only that at some point they are logged.

---

## Final Thoughts

Testing logging in .NET applications has traditionally been tricky because of extension methods in `ILogger`. But with .NET 8’s `FakeLogger`, we now have a cleaner, more readable, and efficient way to verify log messages in unit tests.

By using `FakeLogger` alongside `FluentAssertions`, we can simplify assertions, improve test readability, and ensure our logging behaviour is correctly implemented without the complexity of traditional mocking libraries.

Whether you're verifying message content, structured logs, or execution order, `FakeLogger` provides a robust solution that integrates seamlessly into modern .NET testing practices. If you haven't already, I highly recommend upgrading to .NET 8 to take full advantage of this powerful feature.

Hope you found this helpful! If you want to chat more, feel free to reach out on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use FakeLogger to Make Testing Easier In .Net",
  "desc": "When writing unit tests in .NET, you may need to verify that methods are logging exceptions, errors, or other key information. You might think, No problem, I'll just mock ILogger using my favourite mocking library - for example Moq, NSubstitute, or F...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-fakelogger-to-make-testing-easier-in-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
