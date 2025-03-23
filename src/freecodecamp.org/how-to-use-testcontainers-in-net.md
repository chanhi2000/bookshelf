---
lang: en-US
title: "How to Use TestContainers in .Net"
description: "Article(s) > How to Use TestContainers in .Net"
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
      content: "Article(s) > How to Use TestContainers in .Net"
    - property: og:description
      content: "How to Use TestContainers in .Net"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-testcontainers-in-net.html
prev: /programming/cs/articles/README.md
date: 2025-03-26
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742773343798/44c64acc-3862-4325-af21-6b7de417d300.jpeg
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
  name="How to Use TestContainers in .Net"
  desc="At some point in your development lifecycle, you will need to test that your system can integrate with another system, whether it be another API, a database, or caching service, for example. This can be a laborious task of spinning up other servers h..."
  url="https://freecodecamp.org/news/how-to-use-testcontainers-in-net"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742773343798/44c64acc-3862-4325-af21-6b7de417d300.jpeg"/>

At some point in your development lifecycle, you will need to test that your system can integrate with another system, whether it be another API, a database, or caching service, for example. This can be a laborious task of spinning up other servers hosting the 3rd party API replica, or permanently hosting a SQL database seeded with test data.

In this article, I’ll teach you how to use the TestContainers library to make running integration tests much easier and more manageable.

::: note Prerequisites

- Understanding of Docker
- Understanding of xUnit and testing
- Installation of the following packages:
  - `TestContainers`
  - `TestContainers.MsSql`
  - xUnit
  - >= .Net 8
  - `FluentAssertions`
  - `Microsoft.Data.SqlClient`

:::

---

## What Is TestContainers?

[<FontIcon icon="fas fa-globe"/>TestContainers](https://testcontainers.com) is an open source library that provides you with easily disposable container instances for things like database hosting, message brokers, browsers and more – basically anything that can run in a Docker container.

It removes the necessity to maintain hosted environments for testing in the cloud or on local machines. As long as the user’s machine and CI/CD host supports Docker, the testContainer tests can easily be run.

---

## How Does It All Work?

You define the image you’re wanting to utilise, and specify a configuration.

The TestContainer library spins up a Docker Container with the configured image.

### Provides Connection Details

After starting the container, TestContainers exposes connection strings (for example, a database connection URL), so your tests can use the real service, rather than having to configure this yourself.

### Cleans Up Automatically

When the test finishes, TestContainers removes the container automatically, ensuring no leftover resources. This is one of the best things about using TestContainers: all the creation, tear down, and container setup is handled within the library itself, making it perfect for use within delivery pipelines.

---

## How to Set Up Your First Test

For the purpose of this tutorial, we’re going to keep things simple, and only use a `MS Sql Server` image.

The first thing we’re going to do is configure our Microsoft SQL Server Docker container via the TestContainer fluid API.

Create your test class like below:

```cs title="IntegrationTests.cs"
public class IntegrationTests: IAsyncLifetime 
{
    private MsSqlContainer _container;
    private FakeLogger _logger

    public async Task InitializeAsync()
    {
           _container = new MsSqlBuilder()
                .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
                .WithPassword("P@ssw0rd123")
                .WithPortBinding(1443)
                .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
                .Build();

            _logger = new FakeLogger();
    }

    public async Task DisposeAsync() => await _container.DisposeAsync();
}
```

Here we’re using xUnit’s `IAsyncLifetime` interface. It’s an interface in xUnit that provides a way to handle async setup and teardown for test classes. It's useful when you need to initialise and clean up resources asynchronously. We’re using the `InitializeAsync()` to setup and define our Microsoft SQL Database container as well as starting the container, then using the `DisposeAsync()` method to stop and dispose of our container.

### Explanation of Builder Methods

- `WithImage()`: this allows us to specify the image we want Docker to pull down and run. We’ve opted for the latest version of SQL Server 2022.
- `WithPassword()`: This allows us to specify the password for the database (when creating most databases, a password is normally required).
- `WithPortBinding()`: This allows us to specify both the hosting port number on your machine, as well as the container port number
- `WithWaitStrategy()`: Here we can specify a wait strategy, which informs our container to wait for a condition before the container is ready to use. This is important because some services (like databases or APIs) take time to fully start up.
- `Build()`" This is the command that builds the test container based on the configuration. This **does not** run or start the container – you can do this using the `container.StartAsync()` method as mentioned previously.

#### Why Is** `WithWaitStrategy()` Neede

By default, TestContainers assumes the container is ready as soon as it starts running. But some services might:

- Take time to initialize.
- Require a specific log message before they are ready.
- Need a port to be accessible before you can connect.

Using `WithWaitStrategy()`, you can customise how TestContainers waits before considering the container "ready."

### Adding the Test

```cs :collapsed-lines title="IntegrationTests.cs"
public class IntegrationTests: IAsyncLifetime 
{
    private MsSqlContainer _container;
    private FakeLoger _logger;

    public async Task InitializeAsync()
    {
           _container = new MsSqlBuilder()
                .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
                .WithPassword("P@ssw0rd123")
                .WithPortBinding(1443)
                .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
                .Build();

            await _container.StartAsync();
            _logger = new FakeLogger();
    }

    public async Task DisposeAsync() => await _container.DisposeAsync();

    [Fact]
    public async Task Test_Database_Connection()
    {
        var connectionString = _container.GetConnectionString();
        using var conn = new SqlConnection(connectionString);
        await conn.OpenAsync();

        Assert.True(conn.State == System.Data.ConnectionState.Open);
    }
}
```

The above test, although it’s simple, illustrates how easy it is to spin up a container and create a simple test. The above test will work, but it can lead to low performing tests and high usage of machine resource when not used correctly. Let me explain:

Using `IAsyncLifetime` is necessary, as we’re calling async setup methods (`StartAsync`), for example. But the `InitializeAsync() / DisposeAsync()` methods when situated in a test class are run before and after every test (`Fact` in xUnit).

This means that every time a test begins, it is:

- creating a brand new Docker container,
- pulling the MS Sql image,
- creating the DB,
- running the tests, and
- tearing down the container.

You can test this by copying and pasting the above `Test_Database_Connection()` test multiple times, adding a number to each duplicate test (to keep the compiler happy), and opening Docker Desktop. Running all the tests, you will see a new container (with a different name) being created for each test run.

Now, this can be acceptable if you have a limited number of tests in your test class. But it can have negative outcomes on test classes with a larger number of tests, meaning test maintenance and planning is key. It’s useful, though, when you want to make sure that the database is in a completely clean state before each test, ensuring no data contamination from other tests running.

---

## Key Behaviors of** `IAsyncLifetime` in a Test Cla

When your test class implements `IAsyncLifetime`, xUnit's default behaviour is:

1. Creates a new instance of the test class for each test method.  
2. Calls `InitializeAsync()` before each test.  
3. Calls `DisposeAsync()` after each test.

### What Does This Mean for TestContainers?

- In our case, since `InitializeAsync()` sets up a new container, a new container is created for each test.
- `DisposeAsync()` stops the container after each test finishes.
- Ensures a completely fresh database state for every test, avoiding data contamination.
- Is slow and resource-intensive, especially if you have many test methods.

A more visual look on a test class could look like this:

```
🟢 InitializeAsync() -> New Container Created (For Test_1)

🧪 Running Test_1

🛑 DisposeAsync() -> Container Stopped (After Test_1)

🟢 I`nitializeAsync()` -> New Container Created (For Test_2)

🧪 Running Test_2

🛑 DisposeAsync() -> Container Stopped (After Test_2)
```

### When Is This Useful?

- You need a completely fresh database state or container for each test.
- Avoids test data contamination.
- Each test starts from a clean slate.

### When Is This a Problem?

- It results in slow execution – a new container is started for every test.
- It’s resource-heavy – multiple containers run sequentially.
- And it’s not scalable – hundreds of tests will take a long time to complete.

---

## How to Improve Performance

Ok, so we’ve seen how to create containers once per test, and explored scenarios where this would be useful, but what if performance and cost are a concern?

Here we can combine `IClassFixture` and `IAsyncLiftetime` to achieve a *Once per test class* approach, where we create one container and one database, and its lifecycle is the full length of the test class (that is, all tests run against the same DB).

### How to Write This

We can utilise a TestFixture class which inherits the IAsyncLifetime interface, exposing the `InitializeAsync()` and `DisposeAsync()` methods as before.

```cs :collapsed-lines title="TestClassFixture.cs"
using DotNet.Testcontainers.Builders;
using Microsoft.Extensions.Logging.Testing;
using Testcontainers.MsSql;

namespace IntegrationTests;

public class TestClassFixture : IAsyncLifetime
{
    public MsSqlContainer Container { get; set; }
    private FakeLogger _logger;

    public async Task InitializeAsync()
    {
        Container = new MsSqlBuilder()
            .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
            .WithPassword("P@ssw0rd123")
            .WithPortBinding(1443)
            .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
            .Build();

        _logger = new FakeLogger();
        await Container.StartAsync();
    }

    public async Task DisposeAsync()
    {
        await Container.DisposeAsync();
    }
}
```

Using xUnit’s `IClassFixture` interface, we can pass our `TestClassFixture` and have our test class inherit from this. A test fixture is only run once per test class, making it perfect for our scenario.

```cs :collapsed-lines title="IntegrationFixtureTests.cs"
public class IntegrationFixtureTests : IClassFixture<TestClassFixture>
{
    private readonly string _connectionString;

    public IntegrationFixtureTests(TestClassFixture testClassFixture)
    {
        _connectionString = testClassFixture.Container.GetConnectionString();

        // other test class specific setup goes here
    }

    [Fact]
    public async Task Test_Database_Connection()
    {
        await using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();

        Assert.True(conn.State == System.Data.ConnectionState.Open);
    }
}
```

We now have a much cleaner test class, and all our container logic is handled by the `IClassFixture` instead. Should you need to add test class specific code, for example seeding the database prior to running, or the mocking of any resources, you can place this code within the constructor.

---

## Explanation of Differences

We set our `Container` property as public, rather than private so that our test class can access the container. The test fixture is injected by xUnit's own internal dependency injection mechanics when you use `IClassFixture<T>`.

xUnit automatically creates an instance of the fixture class and passes it into the test class constructor.

The container is started within the `InitializeAsync()` method on the **TestFixture** now, rather than the test class, meaning it only gets started once and is readily available for all the tests. This improves performance and test speeds (no more waiting for each container to spin up before each test).

The test flow would look something more like this now:

```
🟢 InitializeAsync() → Container Created → Container Started

🧪 Running Test_1

🧪 Running Test_2

🛑 DisposeAsync() -> Container Stopped → Container Disposed of
```

### Advantages and Disadvantages

::: tabs

@tab:active ✅Advantages

- **Faster Execution**: Significantly reduces setup/teardown overhead, especially when using slow-starting services like databases.
- **Lower Resource Usage**: Running a container once per test class consumes far fewer system resources compared to one container per test. This is especially beneficial when running integration tests in CI/CD pipelines where resource usage needs to be optimised to keep costs low.
- **More Realistic Testing**: In real-world scenarios, applications don’t restart their databases between API calls, so why should your integration tests?

@tab ❌Disadvantages

**Data Contamination**

Effective test data management is essential for maintaining reliable tests. If test data is not properly isolated, it can lead to unintended interference between tests. For example, a test that creates a new record might introduce unexpected data, causing a retrieval test to fail if it runs afterward. This type of data contamination is a common issue when all tests in a test class share the same database setup. But,with careful test design—such as proper data isolation, cleanup strategies, or using transactional rollbacks—these issues can be mitigated or entirely avoided.

**More Care Needs To Be Taken Around Indempotency**

“Indempotency” refers to the ability to run any test on its own in any order. If the test class is accessing data from the same areas, the assertions may fail when ran in certain orders than others. For example:

- Test_1 inserts a record.
- Test_2 assumes the table is empty and asserts `QueryByName()` should return 1 record
- Test_2 fails because Test_1 has already inserted its own record

:::

---

## How to Share Your Container Across Multiple Test Classes

So we’ve covered a container per test and a container per test class. But what about sharing a container for multiple test classes? Well, it’s as simple as using the `ICollectionFixture` interface instead of `IClassFixture`, and it can be used like so:

```cs
[CollectionDefinition("Database collection")]
public class DatabaseCollection : ICollectionFixture<TestClassFixture>
{
    // This class has no code, 
    // it’s just used to apply the [Collection] attribute to test classes.
}
```

The `ICollectionFixture<T>` mechanism in xUnit automatically ties the fixture instance to all test classes marked with the `[Collection("Collection Name")]` attribute, for example:

```cs :collapsed-lines title="IntegrationFixtureTests.cs"
using IntegrationTests;
using Microsoft.Data.SqlClient;

[Collection("Database collection")]
public class IntegrationFixtureTests
{
    private readonly string _connectionString;

    public IntegrationFixtureTests(TestClassFixture testClassFixture)
    {
        _connectionString = testClassFixture.Container.GetConnectionString();
    }

    [Fact]
    public async Task Test_Database_Connection()
    {
        await using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();

        Assert.True(conn.State == System.Data.ConnectionState.Open);
    }
}

[Collection("Database collection")]
public class AnotherIntegrationTest
{
    private readonly string _connectionString;

    public AnotherIntegrationTest(TestClassFixture testClassFixture)
    {
        _connectionString = testClassFixture.Container.GetConnectionString();
    }

    [Fact]
    public async Task Another_Database_Test()
    {
        await using var conn = new SqlConnection(_connectionString);
        await conn.OpenAsync();

        Assert.True(conn.State == System.Data.ConnectionState.Open);
    }
}
```

Now you can group your integration tests, whether it be all read tests or all write tests – making your tests much more maintainable.

---

## Summary of Approaches:

| **Approach** | **Container Creation** | **Best For** |
| ---: | --- | --- |
| `IAsyncLifetime` inside the test class | **One per test** | When a fresh DB state per test is needed, avoiding test contamination |
| `IClassFixture<T>` with `IAsyncLifetime` | **One per test class** | Faster execution, sharing DB instance across tests in a class |
| `ICollectionFixture<T>` with `IAsyncLifetime` | **One per multiple test classes** | Sharing a DB instance across different test classes |

---

## How to Create Multiple Containers

Yes, you can create multiple containers which can host different images, making it perfect for when you have multiple systems you need to integrate with – for example Microsoft SQL Server and a Redis instance.

You can do this by calling the constructor of the relevant TestContainer package like below:

```cs :collapsed-lines title="TestContainersFixture.cs"
public class TestContainersFixture : IAsyncLifetime
{
    public MsSqlContainer SqlContainer { get; private set; }
    public RedisContainer RedisContainer { get; private set; }

    public async Task InitializeAsync()
    {
        // SQL Server Container
        SqlContainer = new MsSqlBuilder()
            .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
            .WithPassword("P@ssw0rd123")
            .WithPortBinding(1433)
            .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
            .Build();

        // Redis Container
        RedisContainer = new RedisContainerBuilder()
            .WithImage("redis:latest")
            .WithPortBinding(6379)
            .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(6379))
            .Build();

        await Task.WhenAll(SqlContainer.StartAsync(), RedisContainer.StartAsync());
    }

    public async Task DisposeAsync()
    {
        await Task.WhenAll(SqlContainer.DisposeAsync(), RedisContainer.DisposeAsync());
    }
}
```

And just like that, we have a SQL Server and a Redis instance ready to integrate test against.

---

## How to Make Your Setup Easier With Custom Images

To make testing easier, and leverage the power of Docker and TestContainers, here’s a great tip. TestContainers fully supports using custom images, including pre-configured ones with seeded databases. Instead of defining everything in the test setup, you can build and use a custom Docker image that already contains the required schema and test data.

When creating your own custom package to use, you can:

### 1. Upload your custom image to DockerHub and reference from there

```cs
SqlContainer = new MsSqlBuilder()
            .WithImage("your-dockerhub-username/custom-sql-image") 
            .WithPassword("P@ssw0rd123")
            .WithPortBinding(1433)
            .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
            .Build();
```

### 2. Build your Docker image locally

If you're using a local image in TestContainers, you can simply reference the image name (e.g., `my-custom-sql-image`) in your code. TestContainers will first check your local Docker Desktop for the image before attempting to pull it from a registry like Docker Hub.

```cs
SqlContainer = new MsSqlBuilder()
    .WithImage("custom-sql-image") // Reference your local image
    .WithPassword("P@ssw0rd123")
    .WithPortBinding(1433)
    .WithWaitStrategy(Wait.ForUnixContainer().UntilPortIsAvailable(1433))
    .Build();
```

Having a pre-built image can speed up your tests especially in CI/CD pipelines, not to mention make them more readable by removing the seeding code.

To access your custom image in a CI/CD pipeline, you can upload it to DockerHub or GitHub Container Registry (GHCR) and access it from your tests. Build your DockerFile and push it to either system before accessing it in your tests.

---

## Final Thoughts

Using TestContainers in .NET is a game-changer for integration testing. It’s a lightweight and automated way to manage external dependencies like databases, caching systems, and more. By using test containers in a test class, TestFixture, or ICollectionFixture, you can create cleaner, more reliable tests with isolated environments.

TestContainers can also save you money by eliminating the need for dedicated testing environments with long-lived dependencies. You can create and destroy them on the fly, or even integrate them into your CI/CD pipelines, especially in GitHub where Docker can be easily used.

As always I hope you’ve found this article helpful, and if you have any questions don’t hesitate to reach out on X / Twitter - [<FontIcon icon="fa-brands fa-x-twitter"/>@grantdotdev](https://x.com/grantdotdev)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use TestContainers in .Net",
  "desc": "At some point in your development lifecycle, you will need to test that your system can integrate with another system, whether it be another API, a database, or caching service, for example. This can be a laborious task of spinning up other servers h...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-testcontainers-in-net.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
