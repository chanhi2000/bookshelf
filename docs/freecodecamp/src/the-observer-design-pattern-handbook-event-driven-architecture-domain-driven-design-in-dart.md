---
lang: en-US
title: "The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart"
description: "Article(s) > The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart"
    - property: og:description
      content: "The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-observer-design-pattern-handbook-event-driven-architecture-domain-driven-design-in-dart.html
prev: /programming/dart/articles/README.md
date: 2026-07-17
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0621293d-e82e-4f24-bb6e-40dec481c7cd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart"
  desc="Every application, at some point, has to deal with a fundamental challenge: something happens, and several other things need to react to it. A user logs in, and the app needs to save a token, cache th"
  url="https://freecodecamp.org/news/the-observer-design-pattern-handbook-event-driven-architecture-domain-driven-design-in-dart"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0621293d-e82e-4f24-bb6e-40dec481c7cd.png"/>

Every application, at some point, has to deal with a fundamental challenge: something happens, and several other things need to react to it.

A user logs in, and the app needs to save a token, cache the user profile, fire an analytics event, and navigate to the home screen.

A payment is confirmed, and the inventory needs to update, the user needs a receipt, and the fulfillment system needs to kick off delivery.

A sensor reading changes, and three different UI panels need to reflect the new value simultaneously.

The naïve solution is to write all of that logic in one place. One function that does everything or one class that knows about everything.

This works at first. Then requirements change. A new reaction needs to be added. An existing one needs to be removed. A side effect starts failing and takes everything else down with it. The code becomes a wall of responsibilities that's impossible to test, painful to extend, and dangerous to touch.

The Observer Design Pattern exists to solve exactly this problem. It gives you a structured, production-grade way to say: when this event happens, notify everyone who cares, without the event source knowing who those people are.

In this handbook, you'll learn the Observer pattern from first principles. You'll see how it's implemented in Dart, understand how it connects to Event-Driven Architecture, and discover how it integrates cleanly with Domain-Driven Design and Riverpod in a real Flutter application.

By the end, you won't just understand the pattern. You'll know how to use it deliberately in production code.

---

## What is the Observer Design Pattern?

The Observer pattern is a behavioural design pattern that defines a one-to-many dependency between objects. When one object changes state or fires an event, all of its dependents are notified and updated automatically.

Think of a newspaper subscription service. The newspaper publisher doesn't know who its individual subscribers are. It doesn't call each reader personally. It publishes the paper, and every subscriber who signed up receives it.

A subscriber can cancel at any time. A new subscriber can join at any time. The publisher's job never changes. It just publishes.

That's the Observer pattern in plain terms.

The publisher is called the **Subject**. The subscribers are called **Observers**. The newspaper is the **event**.

The pattern was formally defined in the Gang of Four book, Design Patterns: Elements of Reusable Object-Oriented Software. It remains one of the most widely used patterns in software engineering, especially in reactive and event-driven systems.

---

## The Problem It Solves

Let's look at what happens without the Observer pattern.

Say you have a login feature. When login succeeds, you need to do four things:

- Save the authentication token to secure storage
- Cache the user profile data
- Navigate to the home screen
- Fire an analytics event

The straightforward approach puts all of this inside the login function:

```dart
Future<void> login(String email, String password) async {
  final response = await _authRepository.login(email, password);

  await _secureStorage.write(key: 'token', value: response.token);
  await _userCache.save(response.user);
  _navigationService.navigateTo('/home');
  _analytics.track('login_success', {'userId': response.user.id});
}
```

This looks fine at first glance. But count how many reasons this single function has to change:

- The token storage strategy changes. You modify this function.
- The navigation destination changes. You modify this function.
- The analytics event name or payload changes. You modify this function.
- The user caching logic changes. You modify this function.

Every single change to any of these four concerns forces you back into this one function. And every time you touch it, you risk breaking all the other three things it's doing.

Now imagine you need to add a fifth thing, such as enrolling the user in push notifications. You open this function again. You add more code. The function grows. Testing it requires mocking four, then five different dependencies. New teammates struggle to understand what this function is actually responsible for. The answer, of course, is everything. And that's the problem.

This is called tight coupling. The login logic is coupled to every single consequence of a successful login.

The Observer pattern breaks these couplings completely. The login logic does one thing: it performs the login and announces the result. Every consequence is handled by a separate, independent observer. Each observer has one job. None of them know about each other. The login logic doesn't know they exist.

---

## Core Components

The Observer pattern has four core building blocks. Understanding each one before writing code makes the implementation much easier to follow.

### Subject

The Subject is the object that something happens to. It holds a list of observers and is responsible for notifying them when an event occurs. It exposes methods for observers to register and unregister themselves. The Subject doesn't care what observers do with the notification. It just delivers it.

### Observer

The Observer is an interface or abstract class that defines the contract all observers must follow. It declares the method or methods the Subject will call when notifying. Any class that wants to react to an event must implement this interface.

### Concrete Subject

The Concrete Subject is the real implementation of the Subject. It manages the actual list of observers, handles subscriptions, and fires notifications at the right moment.

### Concrete Observers

These are the real classes that implement the Observer interface. Each one has a specific, focused job to do when notified. One saves the token. One navigates. One fires analytics. They don't know about each other and don't need to.

Here's how they relate to each other:

```plaintext
Subject (LoginService)
    |
    |-- subscribe(observer)    <- observer registers itself
    |-- unsubscribe(observer)  <- observer removes itself
    |-- notifySuccess(data)    <- fires when login succeeds
    |-- notifyFailure(error)   <- fires when login fails
         |
         |-----> TokenObserver.onLoginSuccess()
         |-----> UserObserver.onLoginSuccess()
         |-----> NavigationObserver.onLoginSuccess()
         |-----> AnalyticsObserver.onLoginSuccess()
```

The Subject notifies all of them. They each handle their own job independently.

---

## Implementing Observer in Dart

Let's build the pattern step by step.

### Step 1: Define the Observer Interface

```dart
abstract class LoginObserver {
  void onLoginSuccess(UserDto user);
  void onLoginFailed(AppException error);
}
```

This is the contract that every observer must sign. Any class that wants to react to login events must implement both of these methods.

`onLoginSuccess` is called when the login succeeds and receives the user data. `onLoginFailed` is called when the login fails and receives the error.

### Step 2: Define the Subject Interface

```dart
abstract class LoginSubject {
  void subscribe(LoginObserver observer);
  void unsubscribe(LoginObserver observer);
  void notifySuccess(UserDto user);
  void notifyFailure(AppException error);
}
```

`subscribe` lets an observer join the notification list. `unsubscribe` lets an observer leave the notification list. `notifySuccess` broadcasts a success event with the user data to all registered observers. `notifyFailure` broadcasts a failure event with the error to all registered observers.

Defining this as an abstract class instead of going straight to a concrete class is important. It means anything that depends on the subject depends on the abstraction, not the implementation. This makes your code testable and swappable.

### Step 3: Implement the Concrete Subject

```dart :collapsed-lines
class LoginService implements LoginSubject {
  final List<LoginObserver> _observers = [];

  @override
  void subscribe(LoginObserver observer) {
    _observers.add(observer);
  }

  @override
  void unsubscribe(LoginObserver observer) {
    _observers.remove(observer);
  }

  @override
  void notifySuccess(UserDto user) {
    for (final observer in List.of(_observers)) {
      try {
        observer.onLoginSuccess(user);
      } catch (e) {
        debugPrint('Observer error on success: $e');
      }
    }
  }

  @override
  void notifyFailure(AppException error) {
    for (final observer in List.of(_observers)) {
      try {
        observer.onLoginFailed(error);
      } catch (e) {
        debugPrint('Observer error on failure: $e');
      }
    }
  }
}
```

There are two important decisions in this implementation that are easy to miss.

#### 1. Snapshot iteration with `List.of()`

Instead of iterating directly over `_observers`, we iterate over `List.of(_observers)`, which creates a copy of the list before the loop runs.

Why does this matter? Imagine a `NavigationObserver` that, after navigating to the home screen, unsubscribes itself because it no longer needs to listen. If it calls `unsubscribe` while the `notifySuccess` loop is still running over the same list, Dart throws a `ConcurrentModificationError`. The list is being modified while it's being read.

`List.of()` prevents this entirely. The loop runs over the snapshot. The original list can be modified freely during iteration without any errors.

#### 2. Per-observer try/catch

Each observer call is wrapped in its own try/catch block. This is a deliberate choice. If `TokenObserver` throws an exception while writing to secure storage, you don't want `NavigationObserver` and `AnalyticsObserver` to silently never fire. Each observer gets its chance to run regardless of what the others do.

Without this, one failing observer would stop the entire notification chain. That's a hidden bug that's extremely difficult to trace in production.

---

## A Real-World Example: The Login Flow

Now let's build the full login flow using this foundation.

### The Login Logic

```dart
class LoginLogic {
  final LoginSubject _subject;
  final AuthRepository _repository;

  LoginLogic({
    required LoginSubject subject,
    required AuthRepository repository,
  })  : _subject = subject,
        _repository = repository;

  Future<void> callLogin(LoginRequest request) async {
    try {
      final user = await _repository.login(request);
      _subject.notifySuccess(user);
    } on AppException catch (e) {
      _subject.notifyFailure(e);
    } catch (e) {
      _subject.notifyFailure(AppException.unknown(message: e.toString()));
    }
  }
}
```

Let's walk through this carefully.

`LoginLogic` takes two dependencies through its constructor: a `LoginSubject` and an `AuthRepository`. Notice it takes `LoginSubject`, the abstraction, not `LoginService`, the concrete class. This means you can swap the implementation in tests or in different environments without changing `LoginLogic` at all.

Inside `callLogin`, the logic is straightforward. It calls the repository to perform the actual login. If that succeeds, it calls `notifySuccess` on the subject with the returned user. If it throws an `AppException`, it calls `notifyFailure` with that error. If it throws anything unexpected, it wraps it in an `AppException.unknown` and notifies failure.

Notice what `LoginLogic` does NOT do. It doesn't save a token. It doesn't navigate anywhere. It doesn't cache anything. It doesn't fire analytics. And it doesn't know how many observers exist or what they do.

Its entire responsibility is: perform the login, announce the result.

### The Concrete Observers

```dart
class TokenObserver implements LoginObserver {
  final SecureStorageService _storage;

  TokenObserver(this._storage);

  @override
  void onLoginSuccess(UserDto user) {
    _storage.write(key: 'auth_token', value: user.token);
  }

  @override
  void onLoginFailed(AppException error) {
    _storage.delete(key: 'auth_token');
  }
}
```

`TokenObserver` has one job: manage the authentication token. On success, it saves the token. On failure, it clears any stale token that might be sitting in storage. It knows nothing about navigation, caching, or analytics.

```dart
class UserObserver implements LoginObserver {
  final UserCacheService _cache;

  UserObserver(this._cache);

  @override
  void onLoginSuccess(UserDto user) {
    _cache.save(user);
  }

  @override
  void onLoginFailed(AppException error) {
    _cache.clear();
  }
}
```

`UserObserver` has one job: manage the user cache. On success, it saves the user profile. On failure, it clears the cache. It knows nothing about tokens, navigation, or analytics.

```dart
class NavigationObserver implements LoginObserver {
  final NavigationService _navigation;

  NavigationObserver(this._navigation);

  @override
  void onLoginSuccess(UserDto user) {
    _navigation.navigateTo('/home');
  }

  @override
  void onLoginFailed(AppException error) {
    _navigation.showError(error.message);
  }
}
```

`NavigationObserver` has one job: handle navigation after a login attempt. It uses an injected `NavigationService` abstraction rather than a `BuildContext`. This is intentional. An observer that depends on `BuildContext` is tied to the widget lifecycle. Using an abstraction keeps this observer completely independent of the UI layer.

```dart
class AnalyticsObserver implements LoginObserver {
  final AnalyticsService _analytics;

  AnalyticsObserver(this._analytics);

  @override
  void onLoginSuccess(UserDto user) {
    _analytics.track('login_success', {'userId': user.id});
  }

  @override
  void onLoginFailed(AppException error) {
    _analytics.track('login_failed', {'reason': error.message});
  }
}
```

`AnalyticsObserver` has one job: fire the right analytics event for each outcome. It has no knowledge of storage, navigation, or caching.

Each observer has exactly one responsibility. Each one has exactly one reason to change. When the analytics payload needs to change, you touch only `AnalyticsObserver`. When navigation logic changes, you touch only `NavigationObserver`. Nothing else is affected.

### Wiring It Together

```dart
void setupLogin() {
  final service = LoginService();

  service
    ..subscribe(TokenObserver(secureStorage))
    ..subscribe(UserObserver(userCache))
    ..subscribe(NavigationObserver(navigationService))
    ..subscribe(AnalyticsObserver(analyticsService));

  final loginLogic = LoginLogic(
    subject: service,
    repository: authRepository,
  );
}
```

This is the composition step. All observers are created with their dependencies and registered onto the service. The cascade operator `..` calls `subscribe` multiple times on the same `service` object, which keeps the setup readable.

`LoginLogic` receives the `service` as its `LoginSubject`. From this point forward, every time `callLogin` is called and an outcome occurs, all four observers are notified automatically.

Adding a fifth observer, say a `PushNotificationObserver`, means creating the class and adding one line here: `..subscribe(PushNotificationObserver(pushService))`. Nothing else in the entire codebase changes.

---

## Making It Production-Grade with a Generic EventBus

The login example above works well, but it's specific to login. In a real application, many features have the same fan-out requirement. Payment confirmed, order placed, profile updated, session expired. All of them need one event to trigger multiple independent reactions.

Rewriting the Subject and Observer interfaces per feature is repetitive and unnecessary. The better approach is a generic `EventBus` that any feature can use.

```dart
abstract class DomainObserver<T> {
  void onSuccess(T data);
  void onFailure(AppException error);
}
```

`DomainObserver<T>` is a generic observer. The type parameter `T` represents the data type the observer expects on success. A login observer would be `DomainObserver<UserDto>`. A payment observer would be `DomainObserver<PaymentDto>`. The interface is the same. The data type changes per feature.

```dart :collapsed-lines
class EventBus<T> {
  final List<DomainObserver<T>> _observers = [];

  void subscribe(DomainObserver<T> observer) {
    _observers.add(observer);
  }

  void unsubscribe(DomainObserver<T> observer) {
    _observers.remove(observer);
  }

  void publishSuccess(T data) {
    for (final observer in List.of(_observers)) {
      try {
        observer.onSuccess(data);
      } catch (e) {
        debugPrint('[EventBus] Observer error on success: $e');
      }
    }
  }

  void publishFailure(AppException error) {
    for (final observer in List.of(_observers)) {
      try {
        observer.onFailure(error);
      } catch (e) {
        debugPrint('[EventBus] Observer error on failure: $e');
      }
    }
  }
}
```

`EventBus<T>` is a generic subject. It manages a list of typed observers and notifies them with the same snapshot iteration and per-observer error isolation we established earlier.

Now every feature gets the same infrastructure without duplicating a single line of the pattern:

```dart
final loginBus = EventBus<UserDto>();
final paymentBus = EventBus<PaymentDto>();
final orderBus = EventBus<OrderDto>();
```

Each bus is typed to its domain concept. Observers registered on `loginBus` will never accidentally receive payment events. The type system enforces correctness.

---

## Observer Is Already in Your Flutter Code

Before going further into architecture, here's something worth pausing on. You've been using the Observer pattern all along without calling it by that name.

**Streams and StreamController:**

```dart
final controller = StreamController<String>();

controller.stream.listen((event) {
  print('Observed: $event');
});

controller.sink.add('Login succeeded');
```

`StreamController` is a Subject. `stream.listen` is `subscribe`. `sink.add` is `notifyObservers`. Every stream subscription is an Observer. The pattern is identical. Flutter just gave it different names.

**ChangeNotifier:**

```dart
class CounterModel extends ChangeNotifier {
  int _count = 0;

  void increment() {
    _count++;
    notifyListeners();
  }
}
```

`notifyListeners()` iterates over every registered listener and calls them. Those listeners are Observers. `addListener` is `subscribe`. `removeListener` is `unsubscribe`. `ChangeNotifier` is a concrete Subject.

**BLoC:**

When a BLoC emits a new state, every widget that wrapped itself in a `BlocBuilder` or `BlocListener` reacts. The BLoC is the Subject. The builders and listeners are Observers. The state emission is the notification.

Flutter's entire reactive system (Streams, ChangeNotifier, BLoC, ValueNotifier) is the Observer pattern with lifecycle management built in. Understanding the pattern at this fundamental level means you understand why all of these tools work the way they do. You aren't just using them. You understand them.

---

## Deep Dive Into Event-Driven Architecture

Understanding Observer at the class level is the foundation. The pattern becomes significantly more powerful when applied at the architectural level, and that's where Event-Driven Architecture comes in.

### What is Event-Driven Architecture?

Event-Driven Architecture is a design paradigm where the flow of the application is determined by events. Instead of components calling each other directly, they communicate by producing and consuming events through a shared bus or channel.

In a traditional request-driven flow, this is what happens:

```dart
Component A calls Component B directly
Component B does its work and returns a result
Component A waits for that result and then continues
```

Component A knows about Component B. It depends on it by name. It waits for it to finish. If you want Component C to also react to whatever Component A is doing, you have to go back into Component A and add that call.

But then Component A grows. Component A becomes responsible for orchestrating consequences it should know nothing about.

In an event-driven flow, this is what happens instead:

```dart
Component A publishes an event to the EventBus
EventBus delivers the event to whoever is registered

Component B handles the event
Component C handles the event
Component D handles the event
```

Component A doesn't know about B, C, or D. It doesn't wait for them. It publishes what happened and moves on. New handlers can be added without touching Component A at all. This is the Observer pattern scaled to the architectural level.

### Events Are Facts, Not Commands

This distinction is one of the most important concepts in Event-Driven Architecture.

A command says: "do this." It's an instruction that can be rejected. It expects a response.

An event says: "this happened." It's an immutable record of a fact. It doesn't expect a response. It doesn't care who handles it.

`SaveUserToken` is a command. `UserLoggedIn` is an event.

When you model your system with events as facts, you get a historical record of everything that happened in your application. You can replay events to reconstruct state. You can add new handlers that process historical events. Your system becomes auditable and predictable in ways that command-driven systems are not.

### Modelling Domain Events in Dart

Events should be immutable value objects. They're facts. Facts don't change after they happen.

```dart
abstract class DomainEvent {
  final DateTime occurredAt;
  final String eventId;

  const DomainEvent({
    required this.occurredAt,
    required this.eventId,
  });
}
```

`DomainEvent` is the base class for all events in the system. Every event has a timestamp (`occurredAt`) recording when it happened, and a unique identifier (`eventId`) for traceability.

```dart
class UserLoggedIn extends DomainEvent {
  final UserDto user;

  const UserLoggedIn({
    required this.user,
    required super.occurredAt,
    required super.eventId,
  });
}

class LoginFailed extends DomainEvent {
  final AppException error;

  const LoginFailed({
    required this.error,
    required super.occurredAt,
    required super.eventId,
  });
}
```

`UserLoggedIn` carries the user data. `LoginFailed` carries the error. Both are immutable. Both have timestamps and identifiers. Both are concrete facts about something that happened in the domain.

### A Type-Safe DomainEventBus

Now we can build an event bus that's typed to domain events specifically:

```dart
abstract class EventHandler<T extends DomainEvent> {
  void handle(T event);
}
```

`EventHandler<T>` is the Observer interface for this architecture. Any class that wants to handle a domain event implements this with the specific event type it cares about.

```dart
class DomainEventBus {
  final _handlers = <Type, List<EventHandler>>{};

  void register<T extends DomainEvent>(EventHandler<T> handler) {
    _handlers.putIfAbsent(T, () => []).add(handler);
  }

  void publish<T extends DomainEvent>(T event) {
    final handlers = List.of(_handlers[T] ?? []);
    for (final handler in handlers) {
      try {
        (handler as EventHandler<T>).handle(event);
      } catch (e) {
        debugPrint('[DomainEventBus] Handler error for ${T}: $e');
      }
    }
  }
}
```

Let's go through `DomainEventBus` carefully.

`_handlers` is a map where the key is a `Type` (the event class itself, like `UserLoggedIn`) and the value is a list of all handlers registered for that event type.

`register<T>` takes a handler and adds it to the list for type `T`. `putIfAbsent` ensures the list is created if this is the first handler for that event type.

`publish<T>` looks up all handlers registered for the type of event being published and calls each one's `handle` method. The snapshot with `List.of()` and the per-handler try/catch are both present for the same reasons we established earlier.

Here's how you register handlers and publish events:

```dart
// Registration happens once at startup
eventBus.register<UserLoggedIn>(TokenHandler(secureStorage));
eventBus.register<UserLoggedIn>(UserCacheHandler(userCache));
eventBus.register<UserLoggedIn>(NavigationHandler(navigationService));
eventBus.register<UserLoggedIn>(AnalyticsHandler(analyticsService));

eventBus.register<PaymentConfirmed>(ReceiptHandler(receiptService));
eventBus.register<PaymentConfirmed>(InventoryHandler(inventoryService));

// Publishing happens at the use case level
eventBus.publish(UserLoggedIn(
  user: user,
  occurredAt: DateTime.now(),
  eventId: const Uuid().v4(),
));
```

When `UserLoggedIn` is published, only its registered handlers fire. Payment handlers aren't touched. Every handler for `UserLoggedIn` runs independently with full error isolation.

---

## Application in Domain-Driven Design

Event-Driven Architecture and the Observer pattern find their most structured home inside Domain-Driven Design. DDD gives us the vocabulary and structure to know exactly where events belong, who creates them, and who handles them.

### Key DDD Concepts You Need to Know

**Domain Events** are first-class citizens in DDD. They represent something meaningful that happened in the business domain. Not a technical detail, not an HTTP response, but a business fact.

`UserLoggedIn` is a domain event. `LoginResponseDto` is a data transfer object. The distinction matters deeply. The event belongs to the domain model and expresses business language. The DTO belongs to the data layer and expresses data structure.

**Aggregates** are the natural source of domain events. An Aggregate is a cluster of domain objects that form a consistency boundary. The Aggregate enforces business rules and raises domain events when significant state changes occur within it.

**Use Cases** are the orchestrators. A use case calls the repository, gets the result, raises the appropriate domain event, and returns the outcome. It doesn't handle side effects directly. It announces what happened and lets the registered handlers take over.

### Where Everything Lives in Clean Architecture

```sh
lib/
  core/
    events/
      domain_event.dart           # Base DomainEvent class
      domain_event_bus.dart       # The DomainEventBus
      event_handler.dart          # Base EventHandler interface

  features/
    auth/
      domain/
        events/
          user_logged_in.dart     # Domain event (pure Dart, no Flutter)
          login_failed.dart       # Domain event
        handlers/
          token_handler.dart      # Handles token storage
          user_cache_handler.dart # Handles user caching
          analytics_handler.dart  # Handles analytics
        entities/
          user.dart
        repositories/
          auth_repository.dart    # Abstract interface only
        usecases/
          login_usecase.dart      # Orchestrates, publishes events

      data/
        repositories/
          auth_repository_impl.dart
        datasources/
          auth_remote_datasource.dart

      presentation/
        providers/
          login_provider.dart     # Riverpod notifier (thin)
        pages/
          login_page.dart
```

The critical rule: the domain layer is pure Dart. No Flutter imports. No Riverpod imports. No HTTP imports. The `DomainEventBus`, domain events, handlers, and use cases all live in the domain layer and have zero framework dependencies.

This means that the same domain logic works in Flutter, server-side Dart, or a CLI tool without changing a single line. Framework upgrades, say from Riverpod 2.x to a future version, never touch the domain. Unit tests for the domain run in milliseconds with no widget test overhead.

### The Login Use Case in DDD

```dart :collapsed-lines
class LoginUseCase {
  final AuthRepository _repository;
  final DomainEventBus _eventBus;

  LoginUseCase({
    required AuthRepository repository,
    required DomainEventBus eventBus,
  })  : _repository = repository,
        _eventBus = eventBus;

  Future<Result<UserDto, AppException>> execute(LoginRequest request) async {
    try {
      final user = await _repository.login(request);

      _eventBus.publish(UserLoggedIn(
        user: user,
        occurredAt: DateTime.now(),
        eventId: const Uuid().v4(),
      ));

      return Result.success(user);
    } on AppException catch (e) {
      _eventBus.publish(LoginFailed(
        error: e,
        occurredAt: DateTime.now(),
        eventId: const Uuid().v4(),
      ));

      return Result.failure(e);
    }
  }
}
```

Let's walk through this step by step.

`LoginUseCase` receives two dependencies: an `AuthRepository` abstraction and a `DomainEventBus`. Neither is a concrete class. Both can be swapped in tests.

Inside `execute`, it calls the repository to perform the login. If the login succeeds, it publishes a `UserLoggedIn` event to the bus, which immediately notifies all registered handlers. Then it returns a `Result.success` wrapping the user data.

If an `AppException` is caught, it publishes a `LoginFailed` event to the bus, which notifies all failure handlers. Then it returns a `Result.failure` wrapping the error.

The use case doesn't know how many handlers are registered. It doesn't know what they do. It performs the operation, publishes the outcome as a domain event, and returns the result.

The `Result` type is a return value for the caller (the Riverpod notifier) to know the outcome. The domain event is the broadcast for all side effect handlers. Both travel from the same single use case call. This is what makes the architecture clean.

---

## The Riverpod Hybrid: Clean Architecture in Practice

This is where everything comes together in a real Flutter application.

### The Problem We Are Solving

There are two common pain points in Flutter apps that use Riverpod:

Fat ref.listen in widgets:

```dart
// This is messy
ref.listen<AsyncValue<UserDto?>>(loginProvider, (previous, next) {
  next.whenData((user) {
    if (user != null) {
      secureStorage.write(key: 'token', value: user.token);
      userCache.save(user);
      context.go('/home');
      analytics.track('login_success');
    }
  });
});
```

The widget is mounted. If it unmounts before all of this completes, some side effects may never run. Business consequences like token storage and navigation shouldn't depend on whether a widget is still alive. This is fragile architecture.

Fat notifiers:

```dart
// Notifier doing too much
Future<void> login(LoginRequest request) async {
  state = const AsyncLoading();
  try {
    final user = await _loginUseCase.execute(request);
    await _secureStorage.write(key: 'token', value: user.token);
    await _userCache.save(user);
    _navigationService.navigateTo('/home');
    _analytics.track('login_success');
    state = AsyncData(user);
  } catch (e, st) {
    state = AsyncError(e, st);
  }
}
```

The notifier is violating the Single Responsibility Principle. It's performing the login, saving the token, caching the user, navigating, tracking analytics, and managing UI state. That's six responsibilities in one class. It's impossible to test cleanly and painful to maintain.

### The Clean Rule

Before looking at the solution, establish this rule clearly:

**The use case owns domain consequences. The notifier owns UI state. Widgets own nothing.**

The use case performs the operation and publishes domain events. Handlers fire when those events are published and run completely independently of the widget lifecycle. The notifier receives the result from the use case and emits loading, success, or error state so the UI knows what to display. Widgets read that state and render accordingly.

That's the full picture. And it means this architecture works correctly whether login is triggered from a widget, a biometric prompt, a deep link, or a background service. The use case always publishes. The handlers always fire. The notifier only deals with UI state.

### Understanding AsyncNotifier

Before writing the notifier, let's understand what `AsyncNotifier` is and how it works.

`AsyncNotifier` is a Riverpod 2.0 class designed specifically for asynchronous state. It holds an `AsyncValue<T>`, which is a sealed type that can be one of three things:

`AsyncData<T>` means the operation succeeded and data is available. `AsyncLoading` means an operation is in progress. `AsyncError` means an operation failed.

When you extend `AsyncNotifier<T>`, you implement a `build` method that returns the initial state, and you write methods that mutate `state` as async operations progress.

With code generation using `@riverpod`, you annotate your class and run `flutter pub run build_runner build`. The generator creates the provider and all the boilerplate automatically. You focus entirely on the logic.

Here's the full setup for code generation:

```yaml title="pubspec.yaml"
dependencies:
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5

dev_dependencies:
  riverpod_generator: ^2.4.0
  build_runner: ^2.4.9
```

### The Thin Notifier

```dart title="login_provider.dart"
part 'login_provider.g.dart';

@riverpod
class LoginNotifier extends _$LoginNotifier {

  @override
  AsyncValue<UserDto?> build() {
    return const AsyncData(null);
  }

  Future<void> login(LoginRequest request) async {
    state = const AsyncLoading();

    final result = await ref.read(loginUseCaseProvider).execute(request);

    result.fold(
      onSuccess: (user) => state = AsyncData(user),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }
}
```

Let's go through this line by line.

`part 'login_provider.g.dart'` tells Dart that the generated file is part of this library. The `@riverpod` annotation and `_$LoginNotifier` base class come from the generated file.

`build()` is the initialisation method. It runs when the provider is first read. It returns `AsyncData(null)`, meaning the initial state is a successful state with no user yet. This is correct because no login has been attempted.

Inside `login`, the first thing we do is set `state = const AsyncLoading()`. This immediately notifies any widget watching this provider that an operation is in progress. The UI can show a loading indicator.

We then call the use case and `await` its result. The use case returns a `Result<UserDto, AppException>`, which is a type that holds either a success value or a failure value, never both. We call `fold` on it to handle each case.

In the `onSuccess` branch, we set `state = AsyncData(user)`. This tells the UI the operation succeeded and here is the user data to render.

In the `onFailure` branch, we set `state = AsyncError(error, StackTrace.current)`. This tells the UI something went wrong so it can display the appropriate error state.

That's the entire notifier. It does exactly one thing: reflect the outcome of the use case as UI state.

Notice there's no token saving here. No navigation, caching, or analytics. All of that is already handled. The moment the use case called `_eventBus.publish(UserLoggedIn(...))` inside `execute`, every registered handler fired automatically. By the time `result` is returned to this notifier, all side effects are already done. The notifier just needs to update the UI.

This is the cleanest possible separation. The use case owns domain consequences. The notifier owns render state. Each has exactly one responsibility.

### The Widget

```dart :collapsed-lines
class LoginPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final loginState = ref.watch(loginNotifierProvider);

    return Scaffold(
      body: loginState.when(
        data: (_) => const LoginForm(),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => ErrorView(message: error.toString()),
      ),
    );
  }
}

class LoginForm extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () {
            ref.read(loginNotifierProvider.notifier).login(
              LoginRequest(email: 'user@example.com', password: 'secret'),
            );
          },
          child: const Text('Login'),
        ),
      ],
    );
  }
}
```

`ref.watch(loginNotifierProvider)` subscribes this widget to the notifier's state. Every time `state` changes inside the notifier, `build` is called again and the widget re-renders.

`loginState.when` is how you handle each case of `AsyncValue`. When the state is `AsyncData`, it renders the login form. When it is `AsyncLoading`, it renders a loading indicator. When it is `AsyncError`, it renders the error view.

The widget knows nothing about tokens, navigation, or caching. It renders what it's told to render by the state. That's its entire job.

### Wiring the Composition Root

All handler registrations happen once at app startup inside a Riverpod provider:

```dart
@riverpod
DomainEventBus eventBus(EventBusRef ref) {
  final bus = DomainEventBus();

  bus.register<UserLoggedIn>(
    TokenHandler(ref.read(secureStorageProvider)),
  );
  bus.register<UserLoggedIn>(
    UserCacheHandler(ref.read(userCacheProvider)),
  );
  bus.register<UserLoggedIn>(
    NavigationHandler(ref.read(navigationServiceProvider)),
  );
  bus.register<UserLoggedIn>(
    AnalyticsHandler(ref.read(analyticsServiceProvider)),
  );

  bus.register<LoginFailed>(
    AnalyticsFailureHandler(ref.read(analyticsServiceProvider)),
  );

  return bus;
}
```

`eventBus` is a provider that creates the `DomainEventBus` and registers all handlers at the moment it is first read. Because Riverpod providers are lazy by default and cached after first creation, this runs once and the bus lives for the entire app session.

Every handler gets its dependencies injected via `ref.read`. Nothing is hardcoded. Everything is swappable in tests.

The `LoginUseCase` receives this event bus as a dependency through its own provider:

```dart
@riverpod
LoginUseCase loginUseCase(LoginUseCaseRef ref) {
  return LoginUseCase(
    repository: ref.read(authRepositoryProvider),
    eventBus: ref.read(eventBusProvider),
  );
}
```

This is the only place that connects the use case to the event bus. The notifier receives only the use case. The widget receives only the notifier's state. Each layer knows only about the layer directly below it and nothing else.

Adding a new side effect to login means creating a new handler class and adding one `bus.register` line in the composition root. The notifier, the use case logic, the widget, and every existing handler remain completely untouched.

---

## Testing the Observer Architecture

One of the most significant advantages of this architecture is how clearly it separates test concerns. Each layer has its own focused test scope.

### Testing the Use Case

```dart :collapsed-lines
void main() {
  group('LoginUseCase', () {
    late LoginUseCase useCase;
    late MockAuthRepository mockRepository;
    late MockDomainEventBus mockEventBus;

    setUp(() {
      mockRepository = MockAuthRepository();
      mockEventBus = MockDomainEventBus();
      useCase = LoginUseCase(
        repository: mockRepository,
        eventBus: mockEventBus,
      );
    });

    test('publishes UserLoggedIn event on success', () async {
      final user = UserDto(id: '1', token: 'token123');
      when(() => mockRepository.login(any())).thenAnswer((_) async => user);

      await useCase.execute(LoginRequest(email: 'a@b.com', password: '123'));

      verify(() => mockEventBus.publish(any<UserLoggedIn>())).called(1);
    });

    test('publishes LoginFailed event on error', () async {
      when(() => mockRepository.login(any()))
          .thenThrow(AppException.unauthorized(message: 'Invalid credentials'));

      await useCase.execute(LoginRequest(email: 'a@b.com', password: 'wrong'));

      verify(() => mockEventBus.publish(any<LoginFailed>())).called(1);
    });
  });
}
```

The use case test mocks the repository and the event bus. It verifies that the correct event type was published for each outcome. It doesn't test what any handler does. That's not the use case's responsibility, so it's not the use case's test.

### Testing Each Handler

```dart :collapsed-lines
void main() {
  group('TokenHandler', () {
    late TokenHandler handler;
    late MockSecureStorageService mockStorage;

    setUp(() {
      mockStorage = MockSecureStorageService();
      handler = TokenHandler(mockStorage);
    });

    test('writes token to secure storage on UserLoggedIn', () {
      final event = UserLoggedIn(
        user: UserDto(id: '1', token: 'abc123'),
        occurredAt: DateTime.now(),
        eventId: 'event-1',
      );

      handler.handle(event);

      verify(
        () => mockStorage.write(key: 'auth_token', value: 'abc123'),
      ).called(1);
    });
  });
}
```

Each handler test is tiny. It creates the handler with a mocked dependency, fires the event, and verifies the exact side effect that handler is responsible for. No other handler is involved, no notifier is involved, and no widget is involved.

### Testing the Notifier

```dart :collapsed-lines
void main() {
  group('LoginNotifier', () {
    test('transitions from loading to data on success', () async {
      final mockUseCase = MockLoginUseCase();
      final user = UserDto(id: '1', token: 'token123');

      when(() => mockUseCase.execute(any()))
          .thenAnswer((_) async => Result.success(user));

      final container = ProviderContainer(overrides: [
        loginUseCaseProvider.overrideWithValue(mockUseCase),
      ]);

      final notifier = container.read(loginNotifierProvider.notifier);

      await notifier.login(LoginRequest(email: 'a@b.com', password: '123'));

      expect(
        container.read(loginNotifierProvider),
        isA<AsyncData<UserDto?>>(),
      );
    });

    test('transitions from loading to error on failure', () async {
      final mockUseCase = MockLoginUseCase();
      final error = AppException.unauthorized(message: 'Invalid credentials');

      when(() => mockUseCase.execute(any()))
          .thenAnswer((_) async => Result.failure(error));

      final container = ProviderContainer(overrides: [
        loginUseCaseProvider.overrideWithValue(mockUseCase),
      ]);

      final notifier = container.read(loginNotifierProvider.notifier);

      await notifier.login(LoginRequest(email: 'a@b.com', password: 'wrong'));

      expect(
        container.read(loginNotifierProvider),
        isA<AsyncError>(),
      );
    });
  });
}
```

The notifier test only verifies state transitions. It doesn't need to mock the event bus because the notifier no longer touches the event bus. That's the use case's job, and the use case has its own test that verifies events are published correctly. Each layer is tested in complete isolation with no overlap.

---

::: info When to Use the Observer Pattern

Use Observer when:

- One event needs to trigger multiple independent reactions
- You want to add or remove reactions without modifying the event source
- Side effects need to be decoupled from business logic
- Each reaction should be independently testable
- Multiple parts of the system need to react to the same state change
- You are building a feature that will grow in number of side effects over time

:::

::: info When Not to Use It

Avoid Observer when:

- You have only one consumer and no realistic expectation of more
- The relationship between producer and consumer is simple and direct
- The pattern adds structural overhead without meaningful benefit
- Streams, ChangeNotifier, or Riverpod's built-in reactivity already solve the problem naturally
- Strict ordering of side effects is critical and fan-out makes that hard to guarantee

:::

---

## Conclusion

The Observer Design Pattern is one of the most important tools in a software engineer's arsenal. This isn't because it's clever, but because it solves a problem every growing application faces: how do you let one event trigger many reactions without turning your codebase into a tightly coupled mess?

You started by understanding the pattern at its core. A Subject holds a list of Observers and notifies them when events occur. You saw it built step by step in Dart, with snapshot iteration to prevent concurrent modification errors, per-observer try/catch to prevent failure cascades, and dependency inversion to keep everything testable.

You discovered that the Observer pattern is already embedded in Flutter's Streams, ChangeNotifier, and BLoC. Understanding its foundations means you understand why those tools work the way they do.

You then took the pattern into Event-Driven Architecture, where events become immutable domain facts and the system is composed of producers and consumers with no direct coupling between them.

You applied it inside Domain-Driven Design, giving events a proper home in a pure Dart domain layer that is framework-independent, fully portable, and fully testable.

And you saw how it integrates with Riverpod through a hybrid architecture with a clear and enforced rule: handlers own side effects, the notifier owns UI state, and widgets own nothing.

The result is a codebase that scales gracefully. When a new side effect needs to be added, you create one handler and register it in one place. Nothing else changes. That's the promise of the Observer pattern. And as you've seen throughout this handbook, it's a promise it keeps.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Observer Design Pattern Handbook: Event-Driven Architecture & Domain-Driven Design in Dart",
  "desc": "Every application, at some point, has to deal with a fundamental challenge: something happens, and several other things need to react to it. A user logs in, and the app needs to save a token, cache th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-observer-design-pattern-handbook-event-driven-architecture-domain-driven-design-in-dart.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
