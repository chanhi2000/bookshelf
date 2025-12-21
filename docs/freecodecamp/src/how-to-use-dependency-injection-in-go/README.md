---
lang: en-US
title: "How to Implement Dependency Injection in Go - Explained with Code Examples"
description: "Article(s) > How to Implement Dependency Injection in Go - Explained with Code Examples"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Dependency Injection in Go - Explained with Code Examples"
    - property: og:description
      content: "How to Implement Dependency Injection in Go - Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-dependency-injection-in-go/
prev: /programming/go/articles/README.md
date: 2025-09-25
isOriginal: false
author:
  - name: Gabor Koos
    url : https://freecodecamp.org/news/author/gkoos/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758741125008/e796d218-2cf6-43ed-87a5-dfc772e121f8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement Dependency Injection in Go - Explained with Code Examples"
  desc="Regardless of their initial size or scope, projects tend to grow in complexity over time. As new features are added and requirements evolve, the number of components and the connections between them multiply. Services, handlers, repositories, externa..."
  url="https://freecodecamp.org/news/how-to-use-dependency-injection-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758741125008/e796d218-2cf6-43ed-87a5-dfc772e121f8.png"/>

Regardless of their initial size or scope, projects tend to grow in complexity over time. As new features are added and requirements evolve, the number of components and the connections between them multiply. Services, handlers, repositories, external clients, and more all become intertwined, making it increasingly difficult to keep track of what depends on what.

This growing web of dependencies can quickly become a problem. When the relationships between components are unclear or tightly coupled, the codebase becomes harder to test, refactor, and maintain. Making changes or adding new features can introduce unexpected bugs, and isolating parts of the system for testing often requires pulling in far more than you intended.

Consider a team working on a backend service. At first, the codebase is manageable: a few handlers, a database connection, maybe a logger. But as the product matures, new requirements appear: authentication, caching, integrations with third-party APIs, background jobs, and more. Suddenly, a single handler might need access to several services, each with their own dependencies. The team finds themselves spending more time figuring out what needs what, and less time actually building features. Testing becomes a headache, and refactoring feels risky.

Why is this such a challenge? When dependencies are hidden inside components, it's hard to see how everything fits together. Tightly coupled code means that a change in one place can ripple unpredictably through the system. It's easy to end up with fragile code that's difficult to test, hard to extend, and risky to modify.

One way to address this challenge is dependency injection - often referred to as DI. The core idea is straightforward: instead of having each part of a program create its own dependencies, those dependencies are provided from the outside. This makes the relationships between components explicit, allowing for easier testing, swapping of implementations, and greater flexibility as the project evolves.

DI isn't about frameworks or enterprise patterns, it's a practical technique for structuring code so that complexity remains manageable. By making dependencies clear and configurable, DI helps keep code maintainable and adaptable, no matter how requirements change.

In this tutorial, we'll cover:

- What dependency injection is in Go.
- How to implement manual DI, the idiomatic way.
- When manual DI becomes unwieldy.
- Popular DI libraries in Go.
- Best practices for managing dependencies in real-world projects.

By the end of this guide, you'll have a clear understanding of DI in Go and know how to choose the right approach for your projects.

---

## What We’ll Cover:

- [Manual DI in Go](#heading-manual-di-in-go)
- [When DI Gets Hard](#heading-when-di-gets-hard)
- [Go DI Libraries and Tools](#heading-go-di-libraries-and-tools)
- [Choosing the Right Tool](#heading-choosing-the-right-tool)
- [Best Practices and Takeaways](#heading-best-practices-and-takeaways)

::: note Prerequisites

This article assumes you understand the basics of Go. You don't need to be an expert, but you should be comfortable with:

- Functions and structs – understanding how to define types and their methods.
- Interfaces – knowing how to declare and implement them.
- Packages and imports – organizing code across files and packages.
- Basic Go web server – familiarity with `net/http` and simple handlers will help when we build examples.

If you've read the earlier freeCodeCamp guides on Go collections and standard library helpers, you're in good shape. If not, don't worry - all code examples here are self-contained and explained step by step.

You'll also need:

- Go installed (1.20 or later recommended)
- A text editor or IDE of your choice
- Be comfortable running go run from the terminal

:::

That's it. No special libraries are required unless we explicitly install them in later sections (for example, when we explore `wire`, `dig`, or `fx`).

---

## What is Dependency Injection?

Let's start with a simple example. Imagine a web handler that fetches a user from a database. Without DI, it might look like this:

```go
type UserService struct{}

func (us *UserService) GetUser(id int) string {
    // Pretend we fetch a user from the database
    return "user"
}

type Handler struct {
    userService UserService
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    user := h.userService.GetUser(1)
    fmt.Fprintln(w, user)
}
```

Here, `Handler` is tightly coupled to `UserService`. We can't easily swap out `UserService` for a mock in tests or replace it with a different implementation.

With dependency injection, we pass the dependency into the struct, usually via a constructor function:

```go
type UserService interface {
    GetUser(id int) string
}

type Handler struct {
    userService UserService
}

func NewHandler(us UserService) *Handler {
    return &Handler{userService: us}
}
```

Now `Handler` doesn't care how the `UserService` is created. That decision is left to the calling code (<VPIcon icon="fa-brands fa-go-lang"/>`main.go` or a test). This is the essence of DI: you inject what a component needs rather than letting it create it internally.

This approach has several benefits:

- **Testability**: You can easily pass a mock or fake `UserService` when testing `Handler`.
- **Flexibility**: You can swap out implementations without changing `Handler`.
- **Separation of Concerns**: Each component focuses on its own logic without worrying about how its dependencies are created.

As you can see, the concept is quite simple, but it has powerful implications for how you structure your code. Explicitly managing dependencies has many benefits and barely any downsides. Maybe you have to write some extra boilerplate, but this is a small price to pay for the clarity and flexibility it brings.

The principle of dependency injection is not unique to Go, it's a general software design principle you can find in many programming languages. However, the way you implement it can vary by language, ecosystem, and your specific use case. It's a recurring theme in higher-level design patterns: they tell you what to achieve, but they are not bothered with the details of how to implement it.

So the key idea is to explicitly manage dependencies by passing them in, rather than letting components fetch or create them themselves. This can be done a couple of ways:

- **Constructor Injection**: As shown above, dependencies are provided via constructor functions. This is the most common and idiomatic way in Go.
- **Field Injection**: Dependencies are set directly on struct fields. This is less common in Go and not considered idiomatic, but can be useful in some scenarios.
- **Method Injection**: Dependencies are passed as parameters to methods. This is also less common in Go, but can be useful in certain situations.

The most universal approach in Go is constructor injection. Field and Method injection is less common, mainly because they can lead to less clear code and harder-to-track dependencies (it's always better to see what a component needs upfront in the constructor than to have it hidden in method calls or field assignments).

---

## Manual DI in Go

The most common and idiomatic way to handle dependencies in Go is to wire them manually. That might sound boring, but it's actually one of Go's strengths: you always know where a dependency comes from, and nothing is hidden behind a framework. Especially if you inject dependencies via constructors, it's always clear what a component needs in order to work properly. This explicitness is a key part of Go's philosophy: you make the dependencies obvious and explicit, so that anyone reading the code can easily understand how components fit together.

Let's build a small web application with three layers to see how this works in practice:

- A **repository** that talks to the database.
- A **service** that contains business logic.
- A **handler** that exposes an HTTP endpoint.

We'll then wire these pieces together in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`.

### The Repository Layer

At the bottom of the stack, we'll define a `UserRepository`. In a real-world project, this would talk to a database, but for simplicity we’ll just return some dummy data.

```go
type UserRepository struct {
    // Imagine this struct holds a database client
}

func NewUserRepository() *UserRepository {
    return &UserRepository{}
}

func (r *UserRepository) FindUser(id int) string {
    // In a real app, this would query the database
    return fmt.Sprintf("user-%d", id)
}
```

The key thing here is the constructor `NewUserRepository()`. This is a Go convention:

- Functions named `NewXxx` create and return new instances.
- They make wiring dependencies explicit.

(We call it a "constructor" because Go doesn't have constructors in the traditional OOP sense. Instead, we use functions that return initialized structs, which is closer to factory functions, but the term "constructor" is commonly used in Go parlance.)

### The Service Layer

Above the repository, we'll add a service that uses it:

```go
type UserService struct {
    repo *UserRepository
}

func NewUserService(r *UserRepository) *UserService {
    return &UserService{repo: r}
}

func (s *UserService) GetUser(id int) string {
    // Add some business logic here
    return s.repo.FindUser(id)
}
```

The `UserService` depends on the repository. Notice that the dependency is passed into the "constructor". This is dependency injection in action: instead of `UserService` creating its own repository, we give it one.

This also makes the service easy to test. In tests, we can pass a fake repository instead of the real one.

### The Handler Layer

Finally, at the top, let's add a web handler. This is what responds to HTTP requests:

```go
type Handler struct {
    service *UserService
}

func NewHandler(s *UserService) *Handler {
    return &Handler{service: s}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    user := h.service.GetUser(1)
    fmt.Fprintln(w, user)
}
```

The handler depends on the service. Again, we inject the dependency through the constructor.

### Wiring It All Together in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`

Now we need to put the pieces together. Going from the bottom up, we create the repository, then the service, and finally the handler. This is done in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`:

```go title="main.go"
func main() {
    repo := NewUserRepository()      // lowest layer
    service := NewUserService(repo)  // depends on repo
    handler := NewHandler(service)   // depends on service

    http.Handle("/user", handler)
    http.ListenAndServe(":8080", nil)
}
```

Here, `main()` is responsible for wiring everything together. This is a simple and clear way to manage dependencies:

- Each component declares what it needs via its constructor.
- `main()` creates and connects everything.
- The flow of dependencies is explicit and easy to follow.
- No hidden magic: everything is plain Go code, no frameworks or reflection.

If you run this program and visit `http://localhost:8080/user`, you'll see:

```plaintext
user-1
```

That's it. We've manually injected each dependency and wired everything together in `main()`. We have full control over how components are created and connected. We can easily swap out implementations, add new layers, or change the wiring as needed.

### Why Manual DI Works Well in Go

This style of dependency management is the default in Go. It has several advantages:

- Explicit, clear dependencies: Every dependency is visible in the constructor. If `UserService` needs a repository, you see it right there in `NewUserService()`. Nothing is hidden.
- No magic: There are no reflection tricks, no hidden containers, no annotations. When you look at <VPIcon icon="fa-brands fa-go-lang"/>`main.go`, you see exactly how the application is assembled.
- Easy to test: Because dependencies are injected, you can pass mocks or stubs in tests. For example, you might create a `FakeUserRepository` and pass it to `NewUserService()` in a unit test. (And your `fakeUserRepository` would likely resemble the `UserRepository` above.)
- Great for small and medium apps: For most projects, this approach is all you need. Many production Go services at big companies use nothing more than manual DI.

### Downsides of Manual DI

Of course, nothing is perfect. Manual DI has some drawbacks, especially as your application grows:

- Verbose <VPIcon icon="fa-brands fa-go-lang"/>`main.go`: As the number of services increases, <VPIcon icon="fa-brands fa-go-lang"/>`main.go` can become a wall of wiring code. You may have dozens of lines just creating and passing around dependencies. The same approach that works so well for small or medium apps can become unwieldy in very large projects.
- Nested dependencies: Imagine service A depends on service B, which depends on service C, which depends on a repository. By the time you wire everything in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`, you might end up with long chains of constructor calls. Unlike our previous example, imagine hundreds of services and repositories. This can make the wiring code almost impossible to read and maintain.
- Scaling pain: In very large applications with many modules, it can be hard to keep track of which service depends on which other service. Once your application reaches a certain size, manual DI may no longer be sufficient. This is where various DI frameworks come in, as we'll see in a bit.

### A Quick Testing Example

To see the benefit of manual DI, let's write a quick test. Suppose we want to test `UserService` without touching the real repository. We can define a fake repository:

```go
type FakeUserRepository struct{}

func (f *FakeUserRepository) FindUser(id int) string {
    return "fake-user"
}
```

And then inject this into the service:

```go
func TestUserService(t *testing.T) {
    fakeRepo := &FakeUserRepository{}
    service := NewUserService(fakeRepo)

    got := service.GetUser(1)
    want := "fake-user"

    if got != want {
        t.Errorf("got %s, want %s", got, want)
    }
}
```

This test is only possible because we injected the dependency. If `UserService` had created its own repository internally, we wouldn't be able to replace it.

### Takeaway

Manual DI in Go is simple, explicit, and powerful. It's the idiomatic way to manage dependencies in Go applications. For many projects, it's all you'll ever need. In an ideal world, this article would end here and everybody could go on their merry way to build great software.

But as we'll see in the next section, when your project grows large and your wiring code gets out of hand, manual DI can start to feel painful. That's when developers often look for frameworks or tools to help.

### Exercise for the Reader

We provided all the relevant code snippets in this section, but you can try building the full application yourself. Create a new Go module, add the repository, service, and handler layers as shown, and wire them together in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`. Run the server and visit the endpoint to see it in action. Then, try writing a test for `UserService` using a fake repository. This hands-on practice will help solidify your understanding of manual DI in Go.

---

## When DI Gets Hard

Manual dependency injection works beautifully in small to medium Go projects. It's explicit, testable, and easy to reason about. But as your application grows, wiring dependencies manually can become cumbersome. In this section, we'll explore the pain points that arise when manual DI scales, and why developers sometimes reach for DI frameworks or libraries.

### Nested Dependencies

Consider a slightly larger project with multiple services:

- `AuthService` depends on `UserService`.
- `UserService` depends on `UserRepository`.
- `EmailService` depends on an `SMTPClient`.
- `NotificationService` depends on both `EmailService` and `SMSService`.
- `Handler` depends on `AuthService` and `NotificationService`.

If you try to wire all of this manually, your <VPIcon icon="fa-brands fa-go-lang"/>`main.go` starts to look like this:

```go
func main() {
    userRepo := NewUserRepository()
    userService := NewUserService(userRepo)
    authService := NewAuthService(userService)

    smtpClient := NewSMTPClient("smtp.example.com")
    emailService := NewEmailService(smtpClient)
    smsService := NewSMSService()
    notificationService := NewNotificationService(emailService, smsService)

    handler := NewHandler(authService, notificationService)

    http.Handle("/signup", handler)
    http.ListenAndServe(":8080", nil)
}
```

This example is already verbose and hard to read, even though the application isn't very large. Imagine what happens when dozens of services and repositories are involved.

Problems you might notice:

- Long chains of dependencies: Services depend on other services, which depend on repositories, which might depend on database clients. The chain grows quickly and can be hard to manage.
- Wiring logic in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`: <VPIcon icon="fa-brands fa-go-lang"/>`main.go` becomes full of constructor calls. While explicit, it can be difficult to see the overall structure of the application at a glance.
- Increased risk of mistakes: Passing the wrong dependency to a constructor or forgetting to wire a new service can cause runtime errors. Manual DI requires careful attention as projects scale.

### Testing at Scale

Another challenge arises when testing large applications. Suppose you want to write integration tests for `Handler` with fake dependencies. You'll need to manually create fakes or mocks for every layer:

```go
fakeRepo := &FakeUserRepository{}
fakeUserService := NewUserService(fakeRepo)
fakeAuthService := NewAuthService(fakeUserService)
fakeEmailService := &FakeEmailService{}
fakeSMSService := &FakeSMSService{}
fakeNotificationService := NewNotificationService(fakeEmailService, fakeSMSService)
handler := NewHandler(fakeAuthService, fakeNotificationService)
```

While this works, the test setup becomes verbose and repetitive, especially if multiple tests require different combinations of fake dependencies. This verbosity can make tests very hard to maintain.

### Configuration Complexity

Some services require configuration or external clients, such as:

- Database connections
- HTTP clients
- API keys or credentials
- Logging frameworks

In manual DI, you often end up writing repetitive code to initialize and pass these dependencies around:

```go
db := NewDatabase("postgres://user:pass@localhost:5432/db")
logger := NewLogger("INFO")
repo := NewUserRepository(db, logger)
service := NewUserService(repo, logger)
handler := NewHandler(service, logger)
```

As the number of dependencies grows, it's easy to forget a required parameter or misconfigure a service. This can result in runtime errors that are difficult to debug.

### Patterns to Mitigate Complexity

Even without frameworks, there are some strategies to keep manual DI manageable:

#### 1. Group related dependencies

If multiple services depend on the same configuration or clients, bundle them into a struct:

```go
type AppDeps struct {
    DB     *Database
    Logger *Logger
}

func NewAppDeps() *AppDeps {
    db := NewDatabase("...")
    logger := NewLogger("INFO")
    return &AppDeps{DB: db, Logger: logger}
}
```

This reduces repetitive constructor parameters:

```go
deps := NewAppDeps()
repo := NewUserRepository(deps.DB, deps.Logger)
service := NewUserService(repo, deps.Logger)
```

#### 2. Layered constructors

Create higher-level constructors for feature modules:

```go
func NewUserModule(deps *AppDeps) (*UserService, *UserHandler) {
    repo := NewUserRepository(deps.DB, deps.Logger)
    service := NewUserService(repo, deps.Logger)
    handler := NewHandler(service)
    return service, handler
}
```

This keeps <VPIcon icon="fa-brands fa-go-lang"/>`main.go` cleaner and encapsulates wiring for a specific module.

### When Developers Consider DI Frameworks

Once your project grows beyond a handful of services, manual DI can become a maintenance burden:

- Long constructor chains
- Verbose test setup
- Repetitive wiring code

This is where Go DI libraries like `Google Wire`, `Uber Dig`, or `Uber Fx` can help. They automate some of the wiring while keeping dependencies explicit. Frameworks are not strictly necessary, but they can make large-scale projects more manageable. In the next section, we'll explore some popular DI libraries in Go, how they work, and when to consider using them.

### Key Takeaways

- Manual DI is explicit, simple, and idiomatic. It works best in small to medium applications.
- As the number of dependencies grows, <VPIcon icon="fa-brands fa-go-lang"/>`main.go` can become long and repetitive.
- Testing complex services requires careful setup of fakes or mocks.
- Strategies like grouping dependencies or layered constructors can reduce boilerplate.
- For very large applications, DI frameworks can help manage wiring, but manual DI remains the foundation of idiomatic Go.

---

## Go DI Libraries and Tools

Once your project grows beyond a handful of services, manually wiring all dependencies can become verbose and error-prone. That's where dependency injection libraries can help. Go doesn't force you to use them - manual DI is still idiomatic - but frameworks can simplify wiring in larger projects.

In this section, we'll explore some of the most popular Go DI tools:

- Google Wire (compile-time DI)
- Uber Dig (runtime DI)
- Uber Fx (DI with app lifecycle management)
- A brief look at other lightweight DI helpers

We'll show how each works, with examples, and discuss when to consider them.

### Google Wire (Compile-Time DI)

[Google Wire (<VPIcon icon="iconfont icon-github"/>`google/wire`)](https://github.com/google/wire) is a compile-time code generation tool. You define how dependencies relate to each other, and Wire generates the code to assemble them. There's no runtime magic, all the wiring is explicit in the generated code.

#### Example: Wire in Action

Suppose we have a simple service with a repository and handler:

```go
type UserRepository struct{}
func NewUserRepository() *UserRepository { return &UserRepository{} }

type UserService struct { repo *UserRepository }
func NewUserService(r *UserRepository) *UserService { return &UserService{repo: r} }

type Handler struct { service *UserService }
func NewHandler(s *UserService) *Handler { return &Handler{service: s} }
```

With Wire, we define a *provider set* and an *injector*:

```go
import "github.com/google/wire"

// Provider set
var Set = wire.NewSet(NewUserRepository, NewUserService, NewHandler)

// Injector function
func InitializeHandler() *Handler {
    wire.Build(Set) // generates code here to wire dependencies
    return nil
}
```

`wire` has a CLI tool that generates the code to wire up your dependencies. When you run `wire` in your project, it generates Go code for `InitializeHandler()`, assembling all dependencies. You can then use it in <VPIcon icon="fa-brands fa-go-lang"/>`main.go`:

```go
func main() {
    handler := InitializeHandler()
    http.Handle("/user", handler)
    http.ListenAndServe(":8080", nil)
}
```

So basically, you define the dependencies in the provider set, then annotate the injector function with `wire.Build(Set)`, and Wire generates the boilerplate for you in that function. The generated code is in a separate file.

::: tabs

@tab:active Pros

- No runtime overhead, wiring happens at compile-time.
- Generated code is readable and explicit.
- Safe: missing dependencies cause compile errors.

@tab Cons

- Requires an extra tool (`wire` CLI).
- Generated files add some noise to the codebase.
- Not as flexible for dynamic runtime configuration.

:::

### Uber Dig (Runtime DI)

[Uber Dig (<VPIcon icon="iconfont icon-github"/>`uber-go/dig`)](https://github.com/uber-go/dig) is a runtime dependency injection container. Unlike Wire, Dig uses reflection to automatically resolve dependencies when you invoke them.

#### Example: Dig in Action

```go
import "go.uber.org/dig"

func main() {
    c := dig.New() // create a new container

    // Provide constructors to the container
    c.Provide(NewUserRepository)
    c.Provide(NewUserService)
    c.Provide(NewHandler)

    // Invoke the function, letting Dig resolve dependencies
    err := c.Invoke(func(h *Handler) {
        http.Handle("/user", h)
    })
    if err != nil {
        log.Fatal(err)
    }

    http.ListenAndServe(":8080", nil)
}
```

Here, Dig inspects the constructors' parameters and automatically provides the required dependencies. You no longer have to manually pass each dependency in `main()`. It creates a container, then `Provide()` registers constructors with the container. Dig analyzes the parameters of each constructor to understand what dependencies are needed. Then `c.Invoke(func(h *Handler) { ... })` asks Dig to call the provided function, automatically resolving and constructing all dependencies required for `*Handler` (using the registered constructors).

How Dig resolves dependencies:

- Dig looks at `NewHandler` and sees it needs a `*UserService`.
- It looks at `NewUserService` and sees it needs a `*UserRepository`.
- It calls the constructors in the correct order, passing the results as needed, and finally provides the fully constructed `*Handler` to your function.

Does it look like magic? A bit, but it's all based on reflection and the constructors you provide. You still have full control over how dependencies are created, but Dig handles the wiring for you.

::: tabs

@tab:active Pros:

- Reduces manual wiring, especially in large projects.
- Flexible: easy to swap implementations at runtime.
- Works well with dynamic configurations.

@tab Cons:

- Uses reflection, which can introduce runtime errors if dependencies are misconfigured.
- Less explicit: it's not always obvious how a dependency is resolved.
- Debugging runtime DI issues can be tricky.
- Reflection can have performance implications, though usually negligible.

:::

### Uber Fx (DI + App Lifecycle)

[Uber Fx (<VPIcon icon="iconfont icon-github"/>`uber-go/fx`)](https://github.com/uber-go/fx) builds on Dig and adds application lifecycle management. It's ideal for large microservices with multiple modules and background processes.

#### Example: Fx in Action

```go
import "go.uber.org/fx"

func registerRoutes(lc fx.Lifecycle, handler *Handler) {
    lc.Append(fx.Hook{
        OnStart: func(ctx context.Context) error {
            http.Handle("/user", handler)
            go http.ListenAndServe(":8080", nil)
            return nil
        },
        OnStop: func(ctx context.Context) error {
            log.Println("shutting down server")
            return nil
        },
    })
}

func main() {
    app := fx.New(
        fx.Provide(NewUserRepository, NewUserService, NewHandler),
        fx.Invoke(registerRoutes),
    )

    app.Run() // starts the app and manages lifecycle hooks
}
```

Fx uses Dig under the hood for DI, but adds lifecycle hooks to manage startup and shutdown logic. You can register functions to run when the app starts or stops, making it easy to manage resources like HTTP servers, database connections, and so on. This can be particularly useful in microservices that require background workers, database connections, or scheduled jobs.

Fx also provides a more opinionated structure for your application, encouraging best practices and making it easier to reason about your code. The downside is that it introduces more complexity and a steeper learning curve compared to manual DI or even Dig alone.

::: tabs

@tab:active Pros:

- Simplifies complex applications with lifecycle management.
- Integrates DI with application startup and shutdown.
- Good for microservices and enterprise-scale projects.

@tab Cons:

- Steeper learning curve than manual DI or Wire.
- Locks you into the Fx framework.
- Somewhat heavier than other solutions. May feel overkill for small apps.

:::

### Other Lightweight DI Helpers

Besides Wire, Dig, and Fx, there are smaller tools like:

- [<VPIcon icon="iconfont icon-github"/>`samber/do`](https://github.com/samber/do): A minimalistic DI container that focuses on simplicity and ease of use. It provides basic functionality to register and resolve dependencies without much overhead.
- [<VPIcon icon="iconfont icon-github"/>`justinas/alice`](https://github.com/justinas/alice): A lightweight middleware chaining library that can help manage dependencies in HTTP handlers, though it's not a full DI framework.

These libraries are less commonly used but can be useful in specific scenarios. They typically offer a middle ground between manual DI and full-fledged frameworks.

---

## Choosing the Right Tool

A few considerations when deciding whether to adopt a DI library:

| Factor | Recommendation |
| --- | --- |
| Small project | Stick to manual DI. Explicit is simple and idiomatic. |
| Medium project with several services | Consider Wire for compile-time safety. |
| Large microservices | Dig and Fx can manage wiring and lifecycle. |
| Testing flexibility | Dig and Fx allow swapping implementations dynamically. |

::: note Remember

**manual DI is always valid**. Libraries are optional tools to reduce boilerplate and improve maintainability in larger systems. They should not replace understanding the underlying pattern.

:::

### Key Takeaways

- DI frameworks can reduce wiring complexity, but manual DI is still idiomatic and often sufficient.
- Wire: compile-time safety, explicit generated code.
- Dig: runtime reflection, flexible wiring.
- Fx: DI + app lifecycle, best for large services.
- Other tools: lightweight helpers for specific use cases.

By understanding these tools, you can scale your Go applications cleanly while keeping dependencies manageable, testable, and explicit.

### Exercise for the Reader

Try integrating one of these DI libraries into the example application we built earlier (or all of them). Start with Wire to see how compile-time DI works, then experiment with Dig or Fx for more complex scenarios. Observe how the wiring code changes and consider the trade-offs in terms of complexity, readability, and maintainability. Consult the documentation for each library to understand its features and limitations. This hands-on experience will help you decide when and how to use DI frameworks in your own projects.

---

## Best Practices and Takeaways

We've now looked at dependency injection (DI) from multiple angles: the idiomatic manual approach, the challenges that arise at scale, and the libraries that can help. The next logical question is: how do you decide what's right for your project?

This section summarizes best practices that apply regardless of whether you stick with manual DI or adopt a framework. The goal is to help you make practical, informed choices.

### Prefer Explicit Dependencies

The most important principle in Go is clarity. Whether you're writing a small service or wiring up a large application, make dependencies explicit.

- Pass dependencies through constructors, not hidden global variables.
- Use interfaces to abstract behavior when testing or swapping implementations.
- Avoid magic - readers should see how things are connected.

::: tip Example of explicit constructor-based DI:

```go
func NewOrderService(repo OrderRepository, logger Logger) *OrderService {
    return &OrderService{repo: repo, logger: logger}
}
```

Anyone reading this constructor immediately knows that `OrderService` depends on a repository and a logger.

:::

### Start Simple (Manual DI)

For most Go projects, manual DI is enough. It keeps things simple, predictable, and easy to follow.

- In small to medium services, wiring by hand in <VPIcon icon="fa-brands fa-go-lang"/>`main.go` is rarely a bottleneck.
- Explicit wiring doubles as documentation: you can glance at <VPIcon icon="fa-brands fa-go-lang"/>`main.go` to see how the app is assembled.
- Adding a framework too early can add complexity without clear benefits.

A useful rule of thumb: If your wiring fits comfortably in one screen, manual DI is probably the best choice.

### Use Frameworks to Tame Complexity

That said, frameworks exist for a reason. When your <VPIcon icon="fa-brands fa-go-lang"/>`main.go` turns into hundreds of lines of boilerplate, consider a DI tool.

- Wire: best if you want compile-time safety and explicit generated code.
- Dig: best if you want runtime flexibility with minimal setup.
- Fx: best if you want both DI and application lifecycle management.

Think of these frameworks as productivity helpers, not as replacements for understanding DI. You should always understand how dependencies flow through your code, even if a library is wiring them for you.

### Keep Wiring at the Edges

A common best practice is to keep wiring separate from business logic.

- Business logic should not care about how dependencies are constructed.
- Wiring should happen at the application entry point (<VPIcon icon="fa-brands fa-go-lang"/>`main.go` or an `initApp()` function).
- This separation keeps your core code decoupled and testable.

Example structure:

```sh
/cmd/app/main.go    <-- all wiring here
/internal/service/  <-- business logic
/internal/repo/     <-- data access
```

This way, tests can bypass the wiring entirely and construct only what they need.

### Favor Interfaces for Testability

Dependency injection shines when it comes to testing. To get the most out of it, depend on interfaces rather than concrete types.

::: tip For example:

```go
type UserRepository interface {
    FindUser(id int) string
}

type UserService struct {
    repo UserRepository
}
```

In production, you can inject a real `DBUserRepository`. In tests, you can inject a `FakeUserRepository`. This makes testing fast, isolated, and easy.

:::

### Avoid Over-Engineering

While interfaces are powerful, overusing them can hurt readability. A good heuristic in Go is:

- If there's only one implementation, you probably don't need an interface.
- Add interfaces when you need to mock something or swap implementations.

This keeps your codebase clean without unnecessary abstractions.

### Balance Verbosity and Magic

Every DI strategy sits on a spectrum:

- Manual DI: maximum explicitness, but verbose at scale.
- Dig/Fx: less verbose, but more hidden wiring.
- Wire: middle ground: generated code is explicit, but you don’t write it by hand.

There's no one-size-fits-all answer. The right choice depends on your team's size, project complexity, and tolerance for boilerplate.

### Adopt Incrementally

You don't need to commit to a DI framework from day one. Many teams:

- Start with manual DI.
- As the project grows, refactor to Wire for compile-time safety.
- If the project evolves into a complex service with many modules, adopt Fx for lifecycle management.

This incremental approach ensures you never add more complexity than you need.

### Document Your Wiring

Whether manual or framework-based, document how dependencies are wired.

- In manual DI, <VPIcon icon="fa-brands fa-go-lang"/>`main.go` often serves as self-documenting code.
- With frameworks, add comments or diagrams explaining the flow.
- New contributors should be able to understand the structure without guesswork.

### Key Takeaways

- Be explicit: make dependencies visible and testable.
- Start simple: manual DI works well in most projects.
- Use frameworks only when needed: Wire, Dig, and Fx can only help manage complexity if *there is* complexity.
- Keep wiring at the edges: business logic should stay clean and decoupled.
- Follow Go's philosophy: prefer clarity and simplicity over cleverness.

By following these best practices, you'll be able to manage dependencies effectively in Go - whether you're writing a tiny CLI tool or a large-scale microservice.

---

## Conclusion

Dependency injection in Go doesn't need to be mysterious or complicated. At its core, it's simply about passing dependencies into your code rather than creating them inside it. This small shift in design makes your applications easier to test, more modular, and more maintainable.

We've seen the three main approaches:

- Manual DI: the idiomatic baseline in Go. Explicit, clear, and great for most projects.
- Compile-time tools like Wire: reduce boilerplate while keeping wiring explicit.
- Runtime frameworks like Dig and Fx: powerful for large applications that need flexibility and lifecycle management.

There is no single "right" choice. The best approach depends on the size and complexity of your project, your team's preferences, and how much wiring you're willing to manage by hand.

If you take one thing away from this guide, let it be this: **start simple with manual DI, and only reach for tools when the cost of wiring by hand outweighs the benefits of explicitness**.

By understanding the trade-offs and following best practices, you'll be well equipped to structure Go applications that are clear, testable, and scalable, whether you're writing a tiny web service or a full-blown distributed system.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Dependency Injection in Go - Explained with Code Examples",
  "desc": "Regardless of their initial size or scope, projects tend to grow in complexity over time. As new features are added and requirements evolve, the number of components and the connections between them multiply. Services, handlers, repositories, externa...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-dependency-injection-in-go/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
