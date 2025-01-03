---
lang: en-US
title: "Unit Testing Clean Architecture Use Cases"
description: "Article(s) > Unit Testing Clean Architecture Use Cases"
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
      content: "Article(s) > Unit Testing Clean Architecture Use Cases"
    - property: og:description
      content: "Unit Testing Clean Architecture Use Cases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/unit-testing-clean-architecture-use-cases.html
prev: /programming/cs/articles/README.md
date: 2025-01-04
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_123.png
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
  name="Unit Testing Clean Architecture Use Cases"
  desc="Drawing from years of experience, I share my battle-tested approach to unit testing Clean Architecture use cases in .NET, focusing on the critical balance between code coverage and test quality. Through practical examples and real-world scenarios, I'll demonstrate how to write effective tests that not only catch bugs but also provide confidence in your code deployments."
  url="https://milanjovanovic.tech/blog/unit-testing-clean-architecture-use-cases"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_123.png"/>

Writing tests is a crucial part of my daily work. Over the years, I've learned that good tests can make or break a project.

One project I worked on remains the best example of this. It was a large, complex system with many moving parts. We had a requirement that code coverage must be above 90%.

Code coverage doesn't directly translate to good tests, but it's a good starting point. It's up to you to write quality tests that cover the most critical parts of your system.

Today, I want to share my approach to testing Clean Architecture use cases in .NET.

---

## Why Testing Matters

I've seen many projects fail because of poor testing practices. The codebase grows, changes become risky, and developers lose confidence in their deployments. This is especially true for Clean Architecture projects, where we need to ensure our use cases work correctly.

Testing isn't just about catching bugs. It's about having confidence in your code. When I make changes, I want to know immediately if I've broken something. Good tests give me that confidence.

---

## Understanding Different Testing Approaches

Before diving into the specific examples, let's talk about testing types. In my experience, there are three main types of tests you'll write:

1. **Unit tests** focus on testing individual components in isolation. They're fast, reliable, and help you catch issues early. I write these tests first, and they make up the majority of my test suite.
2. [**Integration tests**](/milanjovanovic.tech/testcontainers-integration-testing-using-docker-in-dotnet.md) verify that different components work together correctly. They're slower but essential for testing database operations or external services.
3. [**End-to-end tests**](/milanjovanovic.tech/testing-modular-monoliths-system-integration-testing.md) check the entire system flow. They're the slowest but provide confidence that everything works together.

For this article, we'll focus on unit tests. They're the foundation of a solid test suite and the most common type you'll write.

---

## Breaking Down Our Use Case

Looking at our `ReserveBookingCommandHandler` class, we have a typical Clean Architecture use case. It handles apartment booking reservations with several business rules:

1. The apartment must exist
2. The booking dates must not overlap with existing bookings
3. A new booking should be created if all checks pass

This is a perfect example for unit testing because it has clear inputs, outputs, and dependencies we can mock.

```cs :collapsed-lines title="ReserveBookingCommandHandler.cs"
internal sealed class ReserveBookingCommandHandler(
    IApartmentRepository apartmentRepository,
    IBookingRepository bookingRepository,
    IDateTimeProvider dateTimeProvider) : ICommandHandler<ReserveBookingCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        ReserveBookingCommand request,
        CancellationToken cancellationToken)
    {
        var apartment = await apartmentRepository.GetByIdAsync(request.ApartmentId, cancellationToken);

        if (apartment is null)
        {
            return Result.Failure<Guid>(ApartmentErrors.NotFound);
        }

        var duration = DateRange.Create(request.StartDate, request.EndDate);

        if (await bookingRepository.IsOverlappingAsync(apartment, duration, cancellationToken))
        {
            return Result.Failure<Guid>(BookingErrors.Overlap);
        }

        var booking = Booking.Create(
            apartment,
            duration,
            dateTimeProvider.UtcNow);

        bookingRepository.Add(booking);

        return booking.Id;
    }
}
```

---

## Setting Up Our Test Environment

The test class setup shows the standard approach I use for all my handler tests. Let's break it down:

```cs :collapsed-lines title="ReserveBookingCommandHandlerTests.cs"
public class ReserveBookingCommandHandlerTests
{
    private readonly ReserveBookingCommandHandler _handler;
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IBookingRepository _bookingRepository;
    private readonly IDateTimeProvider _dateTimeProvider;

    private static readonly Guid ApartmentId = Guid.NewGuid();
    private static readonly DateTime UtcNow = DateTime.UtcNow;

    public ReserveBookingCommandHandlerTests()
    {
        _apartmentRepository = Substitute.For<IApartmentRepository>();
        _bookingRepository = Substitute.For<IBookingRepository>();
        _dateTimeProvider = Substitute.For<IDateTimeProvider>();
        _dateTimeProvider.UtcNow.Returns(UtcNow);

        _handler = new ReserveBookingCommandHandler(
            _apartmentRepository,
            _bookingRepository,
            _dateTimeProvider);
    }
}
```

I'm using [<FontIcon icon="fas fa-globe"/>NSubstitute](https://nsubstitute.github.io/) to create mocks of our dependencies. Each test starts with fresh mocks, preventing test interference. The static fields provide consistent values across all tests.

Notice how I mock `IDateTimeProvider`. This is crucial for testing time-dependent code. Never use `DateTime.UtcNow` directly in your production code - it makes testing much harder.

---

## Testing the Not Found Scenario

Our first test verifies the behavior when an apartment doesn't exist:

```cs :collaspsed-lines
[Fact]
public async Task Handle_WhenApartmentDoesNotExist_ShouldReturnNotFoundError()
{
    // Arrange
    var command = new ReserveBookingCommand(
        ApartmentId,
        new DateOnly(2024, 1, 1),
        new DateOnly(2024, 1, 5));

    _apartmentRepository.GetByIdAsync(ApartmentId, Arg.Any<CancellationToken>())
        .Returns((Apartment?)null);

    // Act
    var result = await _handler.Handle(command, default);

    // Assert
    result.IsFailure.Should().BeTrue();
    result.Error.Should().Be(ApartmentErrors.NotFound);
}
```

This test follows the **Arrange-Act-Assert** pattern:

1. Arrange: Set up the command and mock the repository to return `null`
2. Act: Call the handler
3. Assert: Verify we get the correct error

I use [<FontIcon icon="fas fa-globe"/>FluentAssertions](https://fluentassertions.com/) because it provides clear, readable assertions and better error messages than the standard Assert class.

---

## Handling Booking Conflicts

The overlap test ensures we can't double-book apartments:

```cs :collaspsed-lines
[Fact]
public async Task Handle_WhenBookingOverlaps_ShouldReturnOverlapError()
{
    // Arrange
    var command = new ReserveBookingCommand(
        ApartmentId,
        new DateOnly(2024, 1, 1),
        new DateOnly(2024, 1, 5));

    var apartment = new Apartment { Id = ApartmentId };
    _apartmentRepository.GetByIdAsync(ApartmentId, Arg.Any<CancellationToken>())
        .Returns(apartment);
    _bookingRepository.IsOverlappingAsync(apartment, Arg.Any<DateRange>(), Arg.Any<CancellationToken>())
        .Returns(true);

    // Act
    var result = await _handler.Handle(command, default);

    // Assert
    result.IsFailure.Should().BeTrue();
    result.Error.Should().Be(BookingErrors.Overlap);
}
```

Here, we verify the overlap check works correctly. Notice how we:

1. Mock the apartment repository to return a valid apartment
2. Mock the booking repository to indicate an overlap
3. Verify we get the overlap error

---

## Testing Successful Bookings

The happy path test ensures everything works when all conditions are met:

```cs :collaspsed-lines
[Fact]
public async Task Handle_WhenValidRequest_ShouldCreateBooking()
{
    // Arrange
    var command = new ReserveBookingCommand(
        ApartmentId,
        new DateOnly(2024, 1, 1),
        new DateOnly(2024, 1, 5));

    var apartment = new Apartment { Id = ApartmentId };
    _apartmentRepository.GetByIdAsync(ApartmentId, Arg.Any<CancellationToken>())
        .Returns(apartment);
    _bookingRepository.IsOverlappingAsync(apartment, Arg.Any<DateRange>(), Arg.Any<CancellationToken>())
        .Returns(false);

    // Act
    var result = await _handler.Handle(command, default);

    // Assert
    result.IsSuccess.Should().BeTrue();
    await _bookingRepository.Received(1)
        .Add(Arg.Is<Booking>(b =>
            b.Id == result.Value &&
            b.ApartmentId == ApartmentId));
}
```

This test is more complex because we need to:

1. Set up multiple mocks
2. Verify the success result
3. Check that the booking was added with correct properties

NSubstitute's `Received()` method lets us verify the `Add` method was called **exactly once** with the right booking.

---

## Verifying Exception Handling

Testing exception scenarios is crucial for robust code:

```cs :collaspsed-lines
[Fact]
public async Task Handle_WhenRepositoryThrowsOverlapException_ShouldPropagateException()
{
    // Arrange
    var command = new ReserveBookingCommand(
        ApartmentId,
        new DateOnly(2024, 1, 1),
        new DateOnly(2024, 1, 5));

    var apartment = new Apartment { Id = ApartmentId };
    _apartmentRepository.GetByIdAsync(ApartmentId, Arg.Any<CancellationToken>())
        .Returns(apartment);
    _bookingRepository.IsOverlappingAsync(apartment, Arg.Any<DateRange>(), Arg.Any<CancellationToken>())
        .Throws<BookingOverlapException>();

    // Act
    var act = () => _handler.Handle(command, default);

    // Assert
    await act.Should().ThrowAsync<BookingOverlapException>();
}
```

This test ensures exceptions propagate correctly. We:

1. Set up the scenario
2. Make the repository throw an exception
3. Verify the exception bubbles up

FluentAssertions makes testing async exceptions clean and readable.

---

## Understanding Test Coverage Limitations

When we look back at our booking overlap test, there's an important distinction to make. Our unit test verifies that our command handler behaves correctly when the booking repository reports an overlap. However, it doesn't verify that the overlap detection logic itself works correctly.

Consider what we're actually testing:

```cs
_bookingRepository.IsOverlappingAsync(apartment, Arg.Any<DateRange>(), Arg.Any<CancellationToken>())
    .Returns(true);
```

We're simply telling our mock repository to return `true`. This gives us confidence that our command handler correctly handles the overlap scenario, but it does not tell us whether our actual overlap detection logic works correctly.

This is where integration tests become essential. An integration test for this scenario would:

- Insert real bookings into a test database
- Attempt to create overlapping bookings
- Verify that the overlap detection works with real data

The combination of unit and integration tests provides complete coverage:

- Unit tests verify the business logic flow
- Integration tests verify the actual overlap detection logic

This example highlights why we need different types of tests. Unit tests are excellent for verifying behavior and logic flows, but they can't verify the correctness of complex business rules that depend on real data interactions.

---

## Summary

Unit testing Clean Architecture use cases requires careful thought about dependencies and behavior. Here are the key points:

- Mock all external dependencies
- Test both success and failure scenarios
- Verify exception handling logic
- Use descriptive test names
- Follow the Arrange-Act-Assert pattern

Good tests act as documentation. They show how the code should behave and catch issues before they reach production. Invest time in writing good tests - your future self will thank you.

Want to dive deeper into testing Clean Architecture applications? I cover this and much more in my [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) course. You'll learn how to write effective unit tests, integration tests, and end-to-end tests that give you real confidence in your system.

Writing quality tests is a skill that improves with practice and understanding. Take the time to write them well.

That's all for today.

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Unit Testing Clean Architecture Use Cases",
  "desc": "Drawing from years of experience, I share my battle-tested approach to unit testing Clean Architecture use cases in .NET, focusing on the critical balance between code coverage and test quality. Through practical examples and real-world scenarios, I'll demonstrate how to write effective tests that not only catch bugs but also provide confidence in your code deployments.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/unit-testing-clean-architecture-use-cases.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
