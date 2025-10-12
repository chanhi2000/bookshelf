---
lang: en-US
title: "What is Mocking? Mocking in .NET Explained With Examples"
description: "Article(s) > What is Mocking? Mocking in .NET Explained With Examples"
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
      content: "Article(s) > What is Mocking? Mocking in .NET Explained With Examples"
    - property: og:description
      content: "What is Mocking? Mocking in .NET Explained With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/explore-mocking-in-net.html
prev: /programming/cs/articles/README.md
date: 2024-04-13
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://freecodecamp.org/news/content/images/2024/04/Mocking-in-Dotnet.png
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
  name="What is Mocking? Mocking in .NET Explained With Examples"
  desc="Let's go on a journey to demystify the concept of mocking in .NET software development. Let's delve into how straightforward and accessible mocking truly is. Join me as we navigate through this subject, as I cover: Understanding mocking: Why it's ne..."
  url="https://freecodecamp.org/news/explore-mocking-in-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/04/Mocking-in-Dotnet.png"/>

Let's go on a journey to demystify the concept of mocking in .NET software development. Let's delve into how straightforward and accessible mocking truly is. Join me as we navigate through this subject, as I cover:

- Understanding mocking: Why it's necessary for building a robust testing strategy.
- Exploring some of the most common mocking libraries: Such as Moq, NSubstitute, FakeItEasy, and Rhino Mocks.
- Mastering mocking techniques: Using each of these libraries, equipping you with the knowledge to choose the best mocking tool for your needs.

The aim of this tutorial is to give you the knowledge to make up your own mind on which mocking library you prefer, so you can go forward and write some powerful tests in your application.

::: note Prerequisites for this tutorial

1. Understanding of C# programming
2. Understanding of C# Unit Testing
3. An IDE (Rider, Visual Studio, and so on), or Code Editor (VS Code, Sublime Text, Atom, and so on)

:::

---

## Getting Started/Setup

To speed up the process, I've made a public GitHub repo available for this tutorial,. You can clone and use it on your local machine to follow along.

Simply navigate to [this link (<VPIcon icon="iconfont icon-github"/>`grant-dot-dev/mocking-tutorial`)](https://github.com/grant-dot-dev/mocking-tutorial) and clone the repo to your local machine.

Quick refresher if you've forgotten to do that: go to the link above, and in the top right corner click "Code", and then copy the URL provided.

![](https://freecodecamp.org/news/content/images/2024/04/image-2.png)

![](https://freecodecamp.org/news/content/images/2024/04/image-3.png)

Find your local <VPIcon icon="fas fa-folder-open"/>`git` folder, (if you don't have one, create one in your user root folder). Then in your preferred terminal navigate to your <VPIcon icon="fas fa-folder-open"/>`git` folder, and execute the following command.

```sh
# (replacing <url> with the url)
git clone <url>
```

---

## A Brief Overview of the Application

The solution you've just cloned is a basic Web API project which references a class library with some Todo domain objects and services which will alter a list of todo items.

For the purpose of this tutorial, these elements are stored in an in-memory list, rather than connecting to a database. But you can use a database or other forms of data persistence methods.

However, for the purpose of this tutorial, we're less concerned with persisting the data, and more so around mocking this service.

---

## What Is Mocking?

![With mocking you won't tell the difference](https://freecodecamp.org/news/content/images/2024/03/image-112.png)

Mocking in software development is the concept of simulating a behavior or returned object of a class, method or service that another part of the system under test depends on.

When testing a particular component or unit of code, it's often necessary to isolate it from its dependencies, such as databases, web services, or other classes, in order to ensure that the test focuses solely on the functionality of the unit being tested rather than concerning itself with external aspects of the code.

Mocking allow developers to create mock objects or dummy implementations of these dependencies that behave in a predetermined way, mimicking the behavior of the real objects.

By using mocked objects or methods, we can control the input and output of the dependencies. This makes it a lot easier to test different scenarios, where business logic is dependent on the outcome of a dependency.

### Example

Let's say we have a API endpoint that calls a repository which connects to a database. Our API response type depends on the returned value from the repository: we either return a 400 or a 200 response from our API.

We can simply mock the repository return value, and test that our API returns the correct response in both scenarios without having to actually touch our database at all.

In essence, mocking helps developers write more reliable and efficient tests by isolating the code under test and providing predictable behaviour for its dependencies, thereby improving the overall quality of the software.

---

## What Are the Benefits of Mocking?

![Benefits<br/>Image showing jigsaw pieces, with one highlighted saying Benefits](https://freecodecamp.org/news/content/images/2024/03/image-113.png)

### Code Isolation

As I've already explained, mocking dependencies allows for isolation of code for testing. By mocking the dependencies, you can assert the points of failure in the code under test, and not the dependencies themselves (unless you mock them incorrectly - which hopefully this tutorial will help you avoid).

### Faster Testing

By replacing real dependencies with mocked implementations, testing can be performed faster. You're not battling with inconsistencies, unreliable or unpredictable outcomes from those dependencies. It eliminates the need for setting up and tearing down external sources, which can sometimes be complex and time consuming.

### Deterministic Testing

Mock objects offer a controlled environment, allowing developers to specify the exact behavior and responses of dependencies. This approach means that the tests are consistent, making it easier to find bugs and debug issues, especially those adopting a TDD (Test Driven Development) approach.

### Parallel Testing

Mocking enables parallel testing (multiple tests being ran at the same time) by removing dependencies on external resources that may be limited or inaccessible during testing.

For example if you weren't mocking your database connection layer, trying to run tests in parallel may cause inconsistent pass/fail metrics, as another test could be affecting the database table you're utilizing in another test. Mocking this layer means your tests are now agnostic to this layer, and can be ran at the same time.

### Reduced Test Maintenance

Since mock objects encapsulate the behavior of dependencies, changes to those dependencies do not necessarily require updates to the tests themselves. This reduces the maintenance overhead associated with evolving codebases and dependencies.

### Enhanced Test Coverage

Mocking allows developers to simulate a wide range of scenarios and edge cases. By controlling the behavior of dependencies, developers can ensure that their tests exercise all relevant paths through the code, removing any real life or physical limitations.

::: important Things To Be Aware of With Mocking

![](https://freecodecamp.org/news/content/images/2024/04/image-20.png)

**Complexity:** Sometimes when mocking/testing complex areas of the application, mocking can also become complex. However, if the system is too difficult to mock, you may need to reassess your architecture.

**Learning Curve:** It requires an understanding of the syntax and concepts of the mocking library, which can be challenging for developers who are new to unit testing or the specific framework.

**Over-specification**: Mocking can lead to over-specifying the behavior of the code under test. This means that tests may become tightly coupled to the implementation details, making them brittle and prone to breaking when the implementation changes. It's essential to strike a balance between verifying behavior and focusing on the desired outcomes.

**Be mindful of false-positive tests:** While mocking allows you to isolate units of code, it may also create a false sense of security. Mocks simulate dependencies, but they may not fully replicate the behaviour of the real dependencies. [<VPIcon icon="fas fa-globe"/>Integration](https://browserstack.com/guide/integration-testing) tests or [<VPIcon icon="fas fa-globe"/>end-to-end tests](https://browserstack.com/guide/end-to-end-testing) are still necessary to verify the system's behavior as a whole.

:::

---

## Popular .NET Mocking Libraries

![](https://freecodecamp.org/news/content/images/2024/04/image-25.png)

Here are some popular .NET testing libraries:

- FakeItEasy
- NSubstitute
- Moq
- Rhino Mocks

These are just a list of the most commonly used .NET mocking libraries available online, but there are many more. I'd highly recommend using one of these as they have a larger community, more reputable code base, and good documentation (vital when starting out).

Each of these mocking libraries have their own syntax for creating mocks of objects however they all follow the same principles.

1. Declare the object/type/service you'd like to mock
2. How you want that object/type/service to run (the implementation)
3. What is the returned value (where necessary).

---

## Looking at the Tests

If you open the solution, and navigate to the "Test" project, you can see that we have four files with each of the different mocking library tests in there.

1. <VPIcon icon="iconfont icon-csharp"/>`FakeItEasyApiTests.cs`
2. <VPIcon icon="iconfont icon-csharp"/>`MoqApiTests.cs`
3. <VPIcon icon="iconfont icon-csharp"/>`NSubstituteApiTests.cs`
4. <VPIcon icon="iconfont icon-csharp"/>`RhinoMocksApiTests.cs`

Within these files, you will see that we have four very basic XUnit tests. I've kept them brief and simple for the purpose of this tutorial.

---

## Deep Dive Into the Test Structure

Each test file uses a constructor to initialize a private version of their respectable services, and you can see how these differ from one library to the next, yet still follow the same concepts.

```cs
// FakeItEasy
 _fakeTodoService = A.Fake<ITodoService>();

// NSubstitute
  _substituteTodoService = Substitute.For<ITodoService>();

// Moq
 _mockTodoService = new Mock<ITodoService>();

// Rhino Mocks
 _mockTodoService = MockRepository.GenerateMock<ITodoService>();
```

Choosing the "right" mocking library all comes down to personal preference, and what you feel is easier to write, work with and read/understand.

Some may find the use of words like `Fake`, or `Substitute.For` easier to comprehend or read. Whereas others may find the `A.Fake` unintuitive and prefer `new Mock<type>` more obvious.

---

## Arrange, Act and Assert

Following the testing principle of AAA (Arrange, Act and Assert) we can carefully structure our tests, making it obvious what we're doing and where.

The AAA approach to testing involves three steps:

1. **Arrange**: Set up the test environment, mocked services/external dependencies.
2. **Act**: Perform the action being tested.
3. **Assert**: Verify the expected outcome.

---

## Using Mocks to Simulate Returned Items

Let's test the `getAll` (GetAllTodoItems) endpoint by mocking the `TodoService.GetAllTodos` method to return a stubbed list of tasks.

This approach eliminates the need to set up and seed a database for each test scenario, ensuring focused testing of API endpoint returning values against specific criteria.

Mocks provide an ideal solution, allowing us to simulate the desired behavior without interference from other tests.

We can do this like so (remember the full code is available in the repo):

```cs
// FakeItEasy
A.CallTo(() => _fakeTodoService.GetAllTodos()).Returns(expectedTodos);

// NSubstitute
 _substituteTodoService.GetAllTodos().Returns(expectedTodos);

 // Moq
 _moqTodoService.Setup(s => s.GetAllTodos()).Returns(expectedTodos);

 // Rhino Mocks
 _mockTodoService.Stub(s => s.GetAllTodos()).Return(expectedTodos);
```

### What are these methods doing?

A common feature you will see across the majority of libraries is the usage of lambda functions to dictate which method is being mocked.

The lambda function provided in the setup method is essentially a configuration step that defines what action should be taken when the mocked method is called. This configuration is stored and applied when the mocked method is invoked during the test.

Let's break it down, what we're doing:

1. The lambda specifies which method on the mocked service we wish to configure/setup.
2. The lambda we pass in isn't ran straight away by the setup method. We're not telling the test to run the method immediately; we're saying, "Remember this instruction/setup for when the actual method is called during the test."
3. When the method we're mocking gets called during the test then it checks if the call signature matches a setup configuration we've provided. If it matches, the test follows the instructions given during setup.

::: important Important Notes

NSubstitute, on the other hand, allows the developer to mock the method directly on the fake object. This means that you can access the fake `GetAllTodos` method and simply set the return value to your expected value.

Although Moq uses a Setup method, it differs ever so slightly from the other methods. Moq internally creates a proxy object that represents the mocked object, and exposes a `.Object` property to access it. We'll see how this works in the next part.

:::

---

## How to Call The System Under Test (SUT)

```cs
// FakeItEasy
var sut = new TodoController(_fakeTodoService);

// NSubstitute
var sut = new TodoController(_substituteTodoService);

// Moq -- slightly different to the others
 var sut = new TodoController(_moqTodoService.Object);

// Rhino Mocks
var sut = new TodoController(_mockTodoService);
```

In three of the four libraries, you can pass the mocked object directly. However, Moq requires accessing the `.Object` property on the mock to use it. Thus, we passed `moqTodoService.Object` as an argument to the controller.

![an image showing that all the tests passed](https://freecodecamp.org/news/content/images/2024/04/image-26.png)

Running the tests, you can see they all pass. Should you change any of the code in the repository, it would not make any difference as the repo is mocked in these tests. Have a go, try changing the repo functionality and re-running the tests, they will continue to pass.

We are concentrating on the functionality of the endpoint, not what the mocked repo is doing, and this is the beauty of mocking.

---

## The Options with Mocking Are Endless

![](https://freecodecamp.org/news/content/images/2024/04/image-5.png)

Mocking doesn't just allow us to set what is returned from a mocked object, it can also allow us to mock the implementation, including the ability to throw specific errors so we can test our API error handling and unhappy paths too.

This is illustrated in the `Delete_Returns500_AndErrorMessageThrown_WhenExceptionThrown` test within each library test file.

```cs
// FakeItEasy
A.CallTo(() => _fakeTodoService.Delete(1)).Throws(new Exception(errorMessage));

// NSubstitute
_substituteTodoService.When(x => x.Delete(1)).Do(x => throw new Exception(errorMessage));

// Moq
_moqTodoService.Setup(s => s.Delete(1)).Throws(new Exception(errorMessage));

// Rhino Mocks
 _mockTodoService.Stub(s => s.Delete(1)).Throw(new Exception(errorMessage));
```

Using the different libraries, we can make the `Delete` method on the service throw whatever exception we'd like to. This is ideal for when you want to return different status codes, or handle errors in different ways depending on the type of exception thrown.

As an example we could change `Throws(new Exception(errorMessage)` to `Throws(new UnauthorizedAccessException()` and test that if a 401 status code is returned when thrown.

---

## Global Setup

You can assign multiple configurations to the same method. This is great in situations where you want to set up all your configurations of the mocked object in one place. For example, in the test class constructor.

In some test frameworks (like NUnit) you can use a `[OneTimeSetUp]` attribute above your method, which is ran before your test cases, or simply use your test class constructor.

In this scenario you could do something (in Moq) like:

```cs
public MoqApiTests()
{
    _mockTodoService = new Mock<ITodoService>();
    _mockTodoService.Setup(x => x.Delete(1)).Throws(new Exception("This is a generic exception"));
    _mockTodoService.Setup(x => x.Delete(2)).Throws(new UnauthorizedAccessException("You cannot perform this action on this item"));
}
```

In this example, we demonstrate setting up mocked service calls to the same method with various arguments, each causing it to throw different exceptions.

This approach is beneficial for testing different outcomes when different exceptions occur in separate tests, without cluttering our test code with repetitive setup.

For example:

```cs
// Test 1
var result = TodoController.Delete(1);
// Assert handles general exception

// Test 2
var result = TodoController.Delete(2); 
// Assert handles UnauthorizedAccessException
```

I prefer to set up mocks within each individual tests to ensure there are no external factors influencing the mock.

This way, I can easily identify what is being mocked within the test without searching for the mocked object and setup elsewhere.

---

## What If I Don't Care What I'm Passing In?

In our deletion examples, we consistently passed an ID to the mock implementation. Consequently, if we were to call the method with a different ID like `101` through the `TodoController.DeleteTodoItem` call, we wouldn't receive the same result.

This is because we explicitly instructed the mocked object to throw an error when the stubbed method is called with an ID of 1. To address this issue, we can be less specific. Each library has its own syntax for this, enabling us to specify that if any integer is passed to the method, it will throw a particular exception.

```cs
// FakeItEasy
A.CallTo(() => _fakeTodoService.Delete(A<int>._)).Throws( new Exception(errorMessage));

// NSubstitute
_substituteTodoService.When(x => x.Delete(Arg.Any<int>())).Do(x => throw new Exception(errorMessage));

// Moq
_mockTodoService.Setup(s => s.Delete(It.IsAny<int>())).Throws(new Exception(errorMessage));

// Rhino Mocks
_mockTodoService.Stub(s => s.Delete(Arg<int>.Is.Anything)).Throw(new Exception(errorMessage));
```

This code indicates that when any argument of type `int` is passed, it should throw this exception.

NSubstitute differs slightly in syntax: it requires explicit instruction to throw the specified error when encountering this scenario, unlike when were were informing it to return an object. This difference stems from the internal mechanisms of the library.

---

## Asserting Mocks Are Called

In some cases, you might want to verify that a mocked service is called with the correct arguments. This is particularly useful when dealing with a "fire-and-forget" service.

In this scenario, your API endpoint is called, and while it always returns true, it also triggers a service to perform some action independently, which doesn't affect the API's return type (perhaps an asynchronous notification service).

This is one of the few instances where you may want to perform a quick sanity check to ensure that your "fire-and-forget" service is invoked (although ideally, you'd conduct an integration test with that service).

If you take a look at the `DeleteTodoItem` endpoint, and the `DeleteAPI_CallsNotificationService_WithTaskId_AndUserId` test within each test file you can see full examples of how this can be done.

We are verifying that when we call the `DeleteTodoItem`, on our happy path, the `NotificationService.NotifyUserTaskCompleted` is called with the ID of the item for deletion, and the hard-coded user ID.

As an exercise, you could create a user service which returns an ID of logged in user, and this can be used to pass the ID to the service. This can also be mocked in the test.

```cs
// FakeItEasy
A.CallTo(() => _fakeNotificationService.NotifyUserTaskCompleted(1,1)).MustHaveHappened(1, Times.Exactly);

// NSubstitute _notificationService.Received().NotifyUserTaskCompleted(1,1);

// Moq 
 _moqNotificationService.Verify(x => x.NotifyUserTaskCompleted(1,1)); // Defaults to Times.AtLeastOnce

// Rhino Mock
_mockNotificationService.AssertWasCalled(x=>x.NotifyUserTaskCompleted(1,1));
```

---

## Conclusion

In conclusion, the versatility of mocked objects offers a myriad of applications, proving indispensable in the testing of individual units of code.

While I've covered several functionalities and validations achievable with mocks, there are more, such as method call order and negative validation.

In my view, the choice of a mocking library for a project is subjective, with no definitive right or wrong option. While some libraries may offer more convenient extensions or clearer syntax, the decision ultimately boils down to personal preference.

My hope is that this tutorial has provided you with a glimpse into the world of mocking and shed light on the syntax variances across different libraries.

As always, don't hesitate to reach out (links in bio).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Mocking? Mocking in .NET Explained With Examples",
  "desc": "Let's go on a journey to demystify the concept of mocking in .NET software development. Let's delve into how straightforward and accessible mocking truly is. Join me as we navigate through this subject, as I cover: Understanding mocking: Why it's ne...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/explore-mocking-in-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
