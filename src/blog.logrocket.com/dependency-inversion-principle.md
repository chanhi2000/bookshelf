---
lang: en-US
title: "Understanding the dependency inversion principle (DIP)"
description: "Article(s) > Understanding the dependency inversion principle (DIP)"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - TypeScript
  - Java
  - Spring
  - C#
  - DotNet
  - Python
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - design
  - system
  - ts
  - typescript
  - java
  - java-spring
  - spring
  - cs
  - c#
  - csharp
  - dotnet
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding the dependency inversion principle (DIP)"
    - property: og:description
      content: "Understanding the dependency inversion principle (DIP)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/dependency-inversion-principle.html
prev: /articles/README.md
date: 2025-02-20
isOriginal: false
author:
  - name: Samuel Olusola
    url : https://blog.logrocket.com/author/samuelolusola/
cover: /assets/image/blog.logrocket.com/dependency-inversion-principle/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Understanding the dependency inversion principle (DIP)"
  desc="Learn about the dependency inversion principle (DIP), its importance, and how to implement it across multiple programming languages."
  url="https://blog.logrocket.com/dependency-inversion-principle"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/dependency-inversion-principle/banner.png"/>

The SOLID principles (single responsibility, open/closed, Liskov substitution, interface segregation, and dependency inversion) are essential for writing maintainable, scalable, and flexible software. While many developers are familiar with these principles, fully grasping their application can be challenging.

![dependency inversion principle](/assets/image/blog.logrocket.com/dependency-inversion-principle/banner.png)

By the end of this guide, you will have a clear understanding of the dependency inversion principle (DIP), its importance, and how to implement it across multiple programming languages, including [**TypeScript**](/blog.logrocket.com/applying-solid-principles-typescript.md), Python, Java, C#, and more.

::: info

This post was updated by [<VPIcon icon="fas fa-globe"/>Oyinkansola Awosan*](https://blog.logrocket.com/author/oyinkansolaawosan/) in February 2025 to explain DIP more conceptually with broader applications, including expanding the scope of the article beyond TypeScript to Java, Python, and C#.

:::

---

## What is the dependency inversion principle?

The dependency inversion principle states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions. This principle ensures that software components remain loosely coupled, making them easier to modify and maintain.

### High-level vs. low-level modules

- **High-level modules**: Provide abstractions over system functionalities and should not directly communicate with low-level modules
- **Low-level modules**: Handle system logic and should conform to interfaces rather than depend directly on high-level modules

![high level vs low level module](/assets/image/blog.logrocket.com/dependency-inversion-principle/high-level-module-vs-low-level-module.jpeg)

In the context of the dependency inversion principle, the high-level module or component provides a high-level abstraction over the tiny implementation details and general functionalities of the system. High-level modules achieve this level of abstraction by not directly communicating with low-level modules. In other words, high-level modules are set up to talk to an interface to interact with the low-level modules to perform specific tasks.

On the other hand, low-level modules are set up to handle the underlying logic in a system architecture. They are also set up to conform to the interface, which is simply the method or properties a low-level component must have. Therefore, low-level modules depend heavily on interfaces to be useful.

### The role of abstractions in DIP

Abstractions in DIP play a significant role in ensuring that high-level and low-level modules are decoupled, making the codebase highly flexible, maintainable, and testable.

What does it mean to say decoupled? In the context of the dependency inversion principle, low-level modules and high-level modules are never supposed to depend entirely on each other, but the interface, particularly when reusability is of paramount concern.

Potential issues can arise when low-level and high-level modules are tightly coupled. For example, a change in the former must cause the latter to be updated to effect the change. Furthermore, it becomes problematic if the high-level modules fail to incorporate well with other low-level modules’ implementation details.

### DIP vs. Dependency Injection (DI)

To write high-quality code, you must understand the dependency inversion principle and dependency injection. So, what is the difference between the two? Let’s find out.

First, when we talk about dependency and object-oriented programming, we usually refer to an object type, a class that has a direct relationship with it. You can also say this direct dependency means that the class and object type are coupled. For instance, a class could depend on another class because it has an attribute of that type, or an object of that type is passed as a parameter to a method, or because the class inherits from the other class.

[**Dependency injection**](/blog.logrocket.com/dependency-injection-react.md) is a design pattern. The idea of the pattern is that if a class uses an object of a certain type, we do not also make that class responsible for creating that object. Dependency injection design shifts the creation responsibility to another class. This design is, therefore, an inversion of control techniques and makes code testing relatively easier.

Dependency inversion, on the other hand, is a principle that aims to decouple concrete classes using abstractions, abstract classes, interfaces, etc. Dependency inversion is only possible if you separate creation from use. In other words, without dependency injection, there is no dependency inversion.

---

## Importance of DIP

DIP employs a concept that uses high-level modules and low-level modules, where the former contains the business rules that solve the business problem. Clearly, these high-level modules contain most of the business value of the software application. Below are some of the benefits of DIP:

### Promotes loose coupling

Coupling means how closely two parts of your system depend on or interact with each other. In one sense, it is how much the logic and implementation details of these two parts begin to blend. When two pieces of code are interdependent this way, they are said to be tightly coupled.

Loose coupling, on the other hand, is if two pieces of code are highly independent and isolated from each other. Loose coupling promotes code maintainability because you will find that all the code related to a particular concern is colocated together.

Furthermore, loose coupling provides more flexibility, allowing you to change the internals of one part of your system without those changes spilling over into the other parts. You could even easily swap out one part entirely, and the other part would not be aware of that.

### Increases code maintainability

Writing good code lets other people understand it. If you have encountered a codebase that looks poorly written or structured, it is difficult to create a mental model of the code.  
The dependency inversion principle helps to ease updating, fixing, or improving a system since the high-level and low-level modules are loosely coupled, and both only rely on abstractions.

### Improves testability

[<VPIcon icon="fas fa-globe"/>Test-driven development](https://blog.logrocket.com/product-management/unit-testing-guide/) is proven to reduce bugs, errors, and defects while improving the maintainability of a codebase It also requires some additional effort. Testing can be done in two ways: manually or automated.

#### Manual testing

Manual testing involves a human clicking on every button and filling out every form that assigns Jira tickets so the developers can backlog them. This manual testing is not very efficient for large-scale projects, and that is where automated testing comes into play.

#### Automated testing

Automated testing is a better approach where developers use testing tools to write code for the sole purpose of testing the main application code in the codebase. In a decoupled architecture, like the one provided by the dependency inversion principle, automated unit testing is relatively easier and faster.

Decoupled architecture ensures that real implementations can be swapped with fake or mock objects since the high-level and low-level modules are decoupled.

### Supports easy scalability

Scalability is one of the most important key concepts for any system design. It defines how a particular system can handle increased load efficiently without any issues and with zero negative impact on the end users.

So, how does the dependency inversion principle support easy scalability? This principle’s components are loosely coupled, which means that further implementation details can be added to the codebase without modifying the high-level logic.

Assuming a system was initially built to process payment transactions using only one payment gateway, the dependency inversion principle allows you to add more payment methods without breaking the existing functionality.

### Encourages code reusability

Reusable components have been discussed since the early days of computers. New software development approaches like module-based development mean that component construction and reuse are back in play.

Reusability simply refers to the ability to use the same piece of code or component, in some cases, without duplication. The dependency inversion principle ensures that both the high-level and low-level components do not directly depend on each other but on abstraction, thereby giving developers a shot at reusability. This means that the same high-level logic can be used with different low-level implementations with no issues.

To put this into context, there can be a high-level logic that implements notification, while the low-level implementation details may be for SMS, email, push notification, or anything else. DIP ensures that there is no need to write notification logic every time; it is as easy as simply swapping low-level implementations.

---

## Implementing DIP in multiple languages

To demonstrate DIP in practice, we will cover implementations in various languages:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-python"/>Python

Use abstract base classes (ABC) to define abstractions:

```py
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def query(self, sql: str):
        pass
```

Implement low-level modules:

```py
class MySQLDatabase(Database):
    def query(self, sql: str):
        print(f"Executing MySQL Query: {sql}")

class MongoDBDatabase(Database):
    def query(self, sql: str):
        print(f"Executing MongoDB Query: {sql}")
```

Create a high-level module:

```py
class UserService:
    def __init__(self, db: Database):
        self.db = db  

    def get_user(self, id: int):
        self.db.query(f"SELECT * FROM users WHERE id = {id}")
```

@tab <VPIcon icon="fa-brands fa-java"/>Java

Define an interface:

```java
interface Database {
    void query(String sql);
}
```

Implement low-level modules:

```java
class MySQLDatabase implements Database {
    public void query(String sql) {
        System.out.println("Executing MySQL Query: " + sql);
    }
}
```

Create a high-level module:

```java
class UserService {
    private Database db;
    public UserService(Database db) {
        this.db = db;
    }
    public void getUser(int id) {
        db.query("SELECT * FROM users WHERE id = " + id);
    }
}
```

@tab <VPIcon icon="iconfont icon-typescript"/>TypeScript

Define an interface:

```ts
interface Database {
    query(sql: string): void;
}
```

Implement low-level modules:

```ts
class MySQLDatabase implements Database {
    query(sql: string): void {
        console.log(`Executing MySQL Query: ${sql}`);
    }
}
```

Create a high-level module:

```ts
class UserService {
    private db: Database;
    constructor(db: Database) {
        this.db = db;
    }
    getUser(id: number): void {
        this.db.query(`SELECT * FROM users WHERE id = ${id}`);
    }
}
```

@tab <VPIcon icon="iconfont icon-spring"/>Spring (Java with IoC)

[<VPIcon icon="iconfont icon-spring"/>Spring’s Inversion of Control (IoC)](https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/beans.html) container helps achieve DIP by injecting dependencies at runtime:

```java :collapsed-lines
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

interface Logger {
    void log(String message);
}

@Service
class ConsoleLogger implements Logger {
    public void log(String message) {
        System.out.println(message);
    }
}

@Service
class Application {
    private final Logger logger;

    @Autowired
    public Application(Logger logger) {
        this.logger = logger;
    }

    public void run() {
        logger.log("Application started");
    }
}

@Configuration
@ComponentScan("com.example")
class AppConfig {}

public class Main {
    public static void main(String[] args) {
        var context = new AnnotationConfigApplicationContext(AppConfig.class);
        Application app = context.getBean(Application.class);
        app.run();
    }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>.NET Core (C#)

In .NET Core, the built-in dependency injection (DI) container makes it easy to implement DIP:

```cs :collapsed-lines
public interface ILoggerService {
    void Log(string message);
}

public class ConsoleLogger : ILoggerService {
    public void Log(string message) {
        Console.WriteLine(message);
    }
}

public class Application {
    private readonly ILoggerService _logger;

    public Application(ILoggerService logger) {
        _logger = logger;
    }

    public void Run() {
        _logger.Log("Application started");
    }
}
```

@tab ASP.NET Core

.NET Core’s built-in DI container ensures that the Application class depends only on the abstraction ILoggerService, making the code modular and testable:

```cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<ILoggerService, ConsoleLogger>();
builder.Services.AddSingleton<Application>();
var app = builder.Build();
var application = app.Services.GetRequiredService<Application>();
application.Run();
```

:::

---

## Practical use cases and benefits of DIP

The dependency inversion principle has many use cases in different areas of software development. This section will explore several practical use cases and break down the benefits of DIP in each case:

- **Microservices architectures** — Ensuring services communicate through well-defined abstractions rather than direct dependencies
- **Event-driven architectures** — Allowing components to subscribe to events instead of directly calling each other
- **Enterprise software** — Managing business logic layers that interact with multiple data sources and APIs
- **Payment processing systems** — Applications requiring multiple payment gateways like [<VPIcon icon="fas fa-globe"/>Stripe](https://stripe.com/) and [<VPIcon icon="fas fa-globe"/>PayPal](https://paypal.com/us/home) benefit from DIP by abstracting the payment processing logic. This allows seamless switching of payment providers without altering core business logic
- **Notification services** — Systems that send notifications through multiple channels (e.g., email, SMS, push notifications) can use DIP to decouple business logic from specific notification implementations, making it easier to add new communication methods
- **Database access layer** — Applications that start with a single database technology but later need to support multiple databases (SQL, NoSQL, cache systems) can leverage DIP for greater flexibility

---

## Common pitfalls and how to avoid them

While DIP offers significant advantages, misusing it can lead to issues. Here are some common pitfalls and solutions:

- **Over-abstraction** — Introducing interfaces unnecessarily can make the system more complex than needed
  - _**Solution —**Use interfaces only when multiple implementations are likely_
- **Interface bloat** — Creating interfaces with excessive methods makes implementations difficult to maintain
  - _**Solution*** — *Keep interfaces focused on a [**single responsibility**](/blog.logrocket.com/solid-principles-single-responsibility-in-javascript-frameworks.md)_
- **Misusing dependency injection** — Over-reliance on DI frameworks can lead to unnecessary complexity
  - _**Solution** — Use DI only where it provides clear modularity and testability benefits_

---

## When to use DIP vs. direct dependencies

Developers often struggle to decide when to use DIP and when to simply use direct dependencies. Not every class requires an interface.

As essential as the dependency inversion principle is in software development, misusing it can create unnecessary complexity. DIP is not always necessary when the variation of services is minimal or implementations do not frequently change, as in a simple payment processing system.

### Use DIP when:

- The implementation is likely to change often, such as in a payment processing system where users may choose any payment gateway
- Interchangeable implementations are required, like switching between different database layers

### Use direct dependencies when:

- A class will never use multiple implementations, such as in a case where there is only one payment gateway or database access layer
- The variations of a service are minimal, making abstraction unnecessary

---

## Best practices for applying DIP

These tactics will help you take full advantage of DIP:

- **Choose the right level of abstraction** — Avoid unnecessary complexity by applying abstraction only where necessary
- **Structure DIP-compliant code in large projects** — Maintain a clear separation between business logic, abstractions, and implementations
- **Apply SOLID principles together** — DIP works best when combined with the other [**SOLID principles**](/blog.logrocket.com/solid-principles-javascript.md), such as single responsibility and open/closed principles

---

## Conclusion

The dependency inversion principle is a powerful concept in software design that enhances flexibility, scalability, and maintainability. By decoupling business logic from implementation details through abstractions, DIP enables testable, reusable, and understandable code. However, like any design principle, its misuse can introduce unnecessary complexity.

In this guide, we have explored the essentials of the dependency inversion principle, its real-world applications, best practices, and practical implementation across different programming languages. With this knowledge, you are now well-equipped to leverage DIP effectively in your software development projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding the dependency inversion principle (DIP)",
  "desc": "Learn about the dependency inversion principle (DIP), its importance, and how to implement it across multiple programming languages.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/dependency-inversion-principle.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
