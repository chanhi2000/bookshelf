---
lang: en-US
title: "Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions"
description: "Article(s) > Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions"
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
      content: "Article(s) > Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions"
    - property: og:description
      content: "Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/advanced-error-handling-in-dart-records-result-types-monads-and-freezed-exceptions.html
prev: /programming/dart/articles/README.md
date: 2026-05-28
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/21795781-af21-4c57-9457-6c58f22af656.png
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
  name="Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions"
  desc="Every Dart developer has written this at some point: try {   final user = await repository.getUser(id);   // do something with user } catch (e) {   // what is e? who knows.   print(e.toString()); } I"
  url="https://freecodecamp.org/news/advanced-error-handling-in-dart-records-result-types-monads-and-freezed-exceptions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/21795781-af21-4c57-9457-6c58f22af656.png"/>

Every Dart developer has written this at some point:

```dart
try {
  final user = await repository.getUser(id);
  // do something with user
} catch (e) {
  // what is e? who knows.
  print(e.toString());
}
```

It works. It compiles. It ships. And then six months later, a bug report lands in your inbox from a user who got a blank screen instead of an error message, and you spend three hours tracing it back to a `catch (e)` block that swallowed the failure silently.

This is the fundamental problem with exception-based error handling in Dart. Exceptions are invisible in function signatures. They carry no type information at the call site. The compiler can't help you because it doesn't know a function can fail.

Every failure path is a social contract between the author and the caller — and social contracts break under pressure, in large teams, and at 2am during an incident.

Production applications deserve better than that.

In this article, we're going to walk through a complete, modern approach to error handling in Dart — the kind used in real production Flutter codebases. We'll start with Dart Records as lightweight result containers, build a proper sealed Result type, extend it into the Monad pattern, integrate the `dartz` package for functional Either types, and finally cap it off with typed, exhaustive exceptions using Freezed.

By the end, failures in your codebase will be typed, visible, compiler-enforced, and impossible to ignore.

::: note Prerequisites

Before starting, you should have:

- A working Flutter project with Dart 3.0 or later
- Basic familiarity with Dart generics and async/await
- Basic understanding of sealed classes in Dart
- The `freezed`, `freezed_annotation`, and `build_runner` packages available
- The `dartz` package available
- `flutter pub run build_runner build` working in your project

:::

---

## The Problem with Exceptions in Dart

Let's look at what typical exception-based error handling actually looks like across a full stack:

```dart
// Repository
Future<User> getUser(String id) async {
  final response = await dio.get('/users/$id');
  return User.fromJson(response.data);
}

// Use case
Future<User> execute(String id) async {
  return await repository.getUser(id);
}

// ViewModel
Future<void> loadUser(String id) async {
  try {
    final user = await useCase.execute(id);
    state = UserState.loaded(user);
  } catch (e) {
    state = UserState.error(e.toString());
  }
}
```

This looks reasonable. But there are serious hidden problems here.

**The failure is invisible in the signature:** `Future<User>` tells the caller "you will get a User." It says nothing about what happens when the network fails, when the token expires, or when the JSON is malformed. The caller has to know — by reading the implementation — that this function can fail.

**The compiler can't help you:** If you forget the `try/catch` in the ViewModel, the app compiles fine. The crash happens at runtime, in production, in front of a real user.

`catch (e)` **catches everything:** A typo in a variable name, a null dereference, a real network failure — they all land in the same catch block. You can't distinguish between them without inspecting the error string, which is fragile.

**Errors lose their type across layers:** By the time an `UnauthorizedException` from the API layer reaches the ViewModel, it's just an `Object`. All structural information is gone.

The solution is to make failures a first-class part of your function signatures, your type system, and your compiler checks. That is exactly what the patterns in this article do.

---

## Part 1: Record Types as Lightweight Result Containers

### What are Dart Records?

Dart 3.0 introduced Records — anonymous, immutable value types that group multiple fields together without needing a full class definition.

```dart
// A record with two named fields
({String name, int age}) person = (name: 'Seyi', age: 28);

print(person.name); // Seyi
print(person.age);  // 28
```

Records are structurally typed — two records with the same field names and types are the same type, regardless of where they were defined. They're also immutable and compare by value, not by reference.

### Records as Result Types

The simplest application of records in error handling is encoding success and failure as a single return type with nullable fields:

```dart
typedef Result<E, T> = ({E? e, T? data});
```

This defines a record type with two nullable fields — `e` for the error and `data` for the success value. The contract is simple: exactly one of them will be non-null.

```dart
// On success — data is present, e is null
Result<String, User> result = (e: null, data: user);

// On failure — e is present, data is null
Result<String, User> result = (e: 'User not found', data: null);
```

This is already a significant improvement over exceptions. The return type now tells the caller that this function can produce either data or an error. The failure is part of the signature.

You can define more specific typedefs for different layers of your application:

```dart
typedef ApiResult<T, E>      = ({T? data, E? exception});
typedef SecurityResponse     = ({bool? isSecured, String? error});
typedef Repository<T>        = ApiResult<T, iException>;
```

Each typedef gives a meaningful name to a record shape, making the intent clear at every call site.

### Sealed Classes as Namespaced Constructors

Creating result records manually every time is repetitive and error-prone. The cleanest solution is to use a sealed class purely as a namespace for static factory methods:

```dart
sealed class Res<E, T> {
  static Result<E, T> success<E, T>(T data) => (e: null, data: data);
  static Result<E, T> failure<E, T>(E e) => (e: e, data: null);
}
```

Notice what `sealed` is doing here: it's not being used for polymorphism. It can't be instantiated. It exists purely to group two related static methods under a meaningful, non-extendable name.

The call site becomes clean and intentional:

```dart
// In a repository
Future<Result<iException, User>> getUser(String id) async {
  try {
    final user = await _api.fetchUser(id);
    return Res.success(user);
  } on NetworkException catch (e) {
    return Res.failure(iException.internet(message: e.message));
  }
}
```

The same pattern applies for Dio-specific responses:

```dart
sealed class DioResult<T, E> {
  static ApiResult<T, E> success<T, E>(T data) => (data: data, exception: null);
  static ApiResult<T, E> failure<T, E>(E exception) => (data: null, exception: exception);
}
```

And for repository-level results with a simplified type alias:

```dart
// GET<E, T> is just ({E? e, T? res})
typedef New<T> = GET<iException, T>;

sealed class R<E, T> {
  static New<T> success<T>(T data) => (e: null, res: data);
  static New<T> failed<T>(iException error) => (e: error, res: null);
}
```

Each sealed class namespace has a single responsibility and maps to a single layer of the application.

### Domain-Specific Record Types

Records also work beautifully for domain-specific result shapes that don't fit a generic success/failure pattern:

```dart
typedef SecurityResponse = ({bool? isSecured, String? error});

sealed class Check {
  static SecurityResponse isSecured() => (isSecured: true, error: null);
  static SecurityResponse isInsecured(String error) => (isSecured: false, error: error);
}
```

Using it:

```dart
final check = Check.isSecured();
if (check.isSecured == true) {
  // proceed
}

final check = Check.isInsecured('Certificate validation failed');
print(check.error); // Certificate validation failed
```

Clean, readable, and self-documenting. The record shape tells you exactly what the function can return.

**The limitation to keep in mind:** Record-based result types require you to manually check which field is non-null. There is no compiler enforcement that you handle both cases, and no built-in way to transform the result without unwrapping it manually. That's where a proper sealed Result type becomes necessary.

---

## Part 2: Building a Proper Sealed Result Type

### The AppResult Sealed Class

A sealed Result type goes further than a record — it uses Dart's type system to make the two possible states structurally distinct, and provides a `when()` method that forces the caller to handle both cases at compile time.

```dart
import 'app_failure.dart';

sealed class AppResult<T> {
  const AppResult();

  R when<R>({
    required R Function(T value) success,
    required R Function(AppFailure failure) failure,
  });
}

class AppSuccess<T> extends AppResult<T> {
  const AppSuccess(this.value);

  final T value;

  @override
  R when<R>({
    required R Function(T value) success,
    required R Function(AppFailure failure) failure,
  }) {
    return success(value);
  }
}

class AppFailureResult<T> extends AppResult<T> {
  const AppFailureResult(this.error);

  final AppFailure error;

  @override
  R when<R>({
    required R Function(T value) success,
    required R Function(AppFailure failure) failure,
  }) {
    return failure(error);
  }
}
```

Let's walk through the design decisions carefully.

`sealed class AppResult<T>`: `sealed` means all subtypes must live in the same file and the compiler knows every possible subtype. This is what enables exhaustive pattern matching. `<T>` is the type of data you get on success.

`AppSuccess<T>`: holds the actual data. When `when()` is called on an `AppSuccess`, it always calls the `success` callback and passes the value through.

`AppFailureResult<T>`: holds an `AppFailure` (your error model). When `when()` is called on an `AppFailureResult`, it always calls the `failure` callback. Notice it still carries `<T>` even though there is no value — this makes both subtypes compatible with the same `AppResult<T>` type.

**The** `when()` **method**: this is the key mechanism. Both callbacks are `required`. The compiler won't let you call `when()` without handling both cases. You can't forget the error path. You can't forget the success path. The object itself decides which branch runs — not an if/else in the calling code.

```dart
// Repository returning AppResult
Future<AppResult<User>> login(String email, String password) async {
  try {
    final user = await _api.login(email, password);
    return AppSuccess(user);
  } on UnauthorizedException {
    return AppFailureResult(AppFailure.unauthorized());
  } on NetworkException {
    return AppFailureResult(AppFailure.network());
  } catch (e) {
    return AppFailureResult(AppFailure.unknown(e.toString()));
  }
}
```

### Consuming Results with `when()`

```dart
final result = await _repository.login(email, password);

result.when(
  success: (user) => emit(AuthState.authenticated(user)),
  failure: (error) => emit(AuthState.error(error.message)),
);
```

You can also use it to return values:

```dart
// Returning a Widget
final widget = result.when(
  success: (user) => UserProfileCard(user: user),
  failure: (error) => ErrorView(message: error.message),
);

// Returning a String
final message = result.when(
  success: (data) => 'Welcome back, ${data.name}',
  failure: (error) => 'Something went wrong: ${error.message}',
);
```

The return type `R` is inferred — whatever both callbacks return, `when()` returns. If they return a `Widget`, you get a `Widget`. If they return a `String`, you get a `String`.

### Why This is Better

|  | Exceptions | AppResult |
| --- | --- | --- |
| Failure visible in signature | ❌ | ✅ |
| Compiler enforces handling | ❌ | ✅ |
| Both paths required at call site | ❌ | ✅ |
| Type safe across all layers | ❌ | ✅ |
| Readable and self-documenting | ❌ | ✅ |

---

## Part 3: Extending to the Monad Pattern

### What Makes Something a Monad?

A monad is a pattern from functional programming. In practical terms, a type is monadic when it satisfies three things:

**Wrap** — you can put a value into the context.

```dart
AppSuccess(user) // wrapping a User into AppResult
```

**Transform (map)** — you can apply a function to the wrapped value without manually unwrapping it. If the result is a failure, the transformation is skipped and the failure propagates.

**Chain (flatMap)** — you can sequence multiple operations that each return the same wrapper type, without nesting. The first failure short-circuits the entire chain.

`AppResult` as defined above satisfies the first rule and the *spirit* of the second through `when()`. But without `map` and `flatMap`, it's not mechanically monadic. Let's fix that.

### Adding `map` and `flatMap`

```dart
sealed class AppResult<T> {
  const AppResult();

  /// Transform the success value, propagate failure untouched
  AppResult<R> map<R>(R Function(T value) transform) {
    return when(
      success: (value) => AppSuccess(transform(value)),
      failure: (error) => AppFailureResult(error),
    );
  }

  /// Chain an operation that itself returns an AppResult
  AppResult<R> flatMap<R>(AppResult<R> Function(T value) transform) {
    return when(
      success: (value) => transform(value),
      failure: (error) => AppFailureResult(error),
    );
  }

  R when<R>({
    required R Function(T value) success,
    required R Function(AppFailure failure) failure,
  });
}
```

`map` transforms the success value using a regular function. If the result is already a failure, `map` skips the transformation entirely and passes the failure through unchanged. This is called "failure propagation" — errors flow through the chain automatically.

`flatMap` chains an operation that itself returns an `AppResult`. This is what allows sequencing — when each step in a process can independently succeed or fail, `flatMap` connects them so the first failure stops the chain.

### Chaining Operations

Without monadic chaining, sequential operations that can each fail look like this:

```dart
final loginResult = await login(email, password);

loginResult.when(
  success: (user) async {
    final profileResult = await getProfile(user.id);
    profileResult.when(
      success: (profile) async {
        final settingsResult = await loadSettings(profile.settingsId);
        settingsResult.when(
          success: (settings) => emit(AppState.ready(settings)),
          failure: (error) => emit(AppState.error(error)),
        );
      },
      failure: (error) => emit(AppState.error(error)),
    );
  },
  failure: (error) => emit(AppState.error(error)),
);
```

Deeply nested, repetitive error handling on every single step. With `flatMap`:

```dart
final result = (await login(email, password))
    .flatMap((user) => getProfile(user.id))
    .flatMap((profile) => loadSettings(profile.settingsId))
    .map((settings) => settings.theme);

result.when(
  success: (theme) => emit(AppState.ready(theme)),
  failure: (error) => emit(AppState.error(error)),
);
```

Each step only runs if the previous one succeeded. The first failure short-circuits the entire chain. Error handling happens once at the end, not at every step. This is the full power of the monad pattern applied to real application code.

---

## Part 4: Either with dartz

### What is Either?

`Either<L, R>` is a type from functional programming that represents one of two possible values — a `Left` or a `Right`. By convention:

- `Left` — the failure case
- `Right` — the success case

The `dartz` package brings this and many other functional programming primitives to Dart. Add it to your project:

```yaml title="pubspec.yaml"
dependencies:
  dartz: ^0.10.1
```

In the codebase we are building from, `Either` is used with a type alias that makes the intent explicit:

```dart
import 'package:dartz/dartz.dart';

typedef API<T> = Either<T, iException>;
```

Note the convention here: `Left` holds the success value `T`, and `Right` holds the failure `iException`. This is intentionally flipped from the functional programming norm. Both conventions exist in real codebases — what matters is that you're consistent.

### Using Either in Practice

Creating Either values:

```dart
// Success — Left holds the data
Either<User, iException> result = Left(user);

// Failure — Right holds the exception
Either<User, iException> result = Right(iException.internet(message: 'No connection'));
```

Checking which side you're on:

```dart
if (result.isLeft()) {
  final user = result.fold((user) => user, (_) => null);
}
```

### Bridging Records and Either

The real power of the `API` typedef comes from `ApiRes` — a utility class that converts between the record-based world of your data layer and the Either-based world of your domain layer:

```dart
class ApiRes {
  static Future<API<T>> deserialize<T>(ApiResult<T, iException> res) async {
    return (res.data != null)
        ? Left(res.data as T)
        : Right(res.exception!);
  }

  static Future<API> deserializeDynamic(
    ApiResult<dynamic, iException> res,
  ) async {
    return (res.data != null) ? Left(res.data) : Right(res.exception!);
  }
}
```

`ApiResult<T, iException>` is your record type from the data layer — a Dio response wrapped with nullable fields. `ApiRes.deserialize` takes that record and converts it into a proper `Either`, ready to be used in the domain layer.

In practice, a repository method looks like this:

```dart
Future<API<User>> getUser(String id) async {
  // Data layer returns a record
  final res = await _dataSource.fetchUser(id);

  // Convert to Either at the boundary
  return ApiRes.deserialize<User>(res);
}
```

The boundary between layers is the conversion point. Inside the data layer, you work with records. At the boundary, you convert. In the domain layer, you work with Either. Each layer has the type that suits it best.

### Folding an Either

`dartz` provides a `fold` method on Either that works similarly to `when()` on `AppResult`:

```dart
final result = await repository.getUser(id);

result.fold(
  (user) => emit(UserState.loaded(user)),       // Left — success
  (exception) => emit(UserState.error(exception.message)), // Right — failure
);
```

`dartz` also gives you monadic operations out of the box:

```dart
// map — transform the Left value
final nameResult = result.map((user) => user.name);

// flatMap / bind — chain Either-returning operations
final profileResult = result.flatMap(
  (user) => getProfile(user.id),
);
```

The full functional toolkit, ready to use without building it yourself.

---

## Part 5: Typed Exceptions with Freezed

### Why Freezed for Exceptions?

Standard Dart exceptions carry almost no useful information:

```dart
throw Exception('Something went wrong');
// At the catch site: what went wrong? what type? what code? who knows.
```

Even custom exception classes require significant boilerplate to implement properly — `==`, `hashCode`, `toString`, immutability, copyWith. Freezed generates all of that automatically, and adds exhaustive pattern matching on top.

Add the required packages:

```yaml title="pubspec.yaml"
dependencies:
  freezed_annotation: ^2.4.1

dev_dependencies:
  freezed: ^2.4.5
  build_runner: ^2.4.6
```

### Building iException

```dart
import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'exception.freezed.dart';

@freezed
class iException with _$iException {
  const factory iException.internet({
    required String message,
    int? code,
  }) = InternetException;

  const factory iException.mapper({
    required String message,
    int? code,
  }) = MapperException;

  const factory iException.validation({
    required String message,
    int? code,
  }) = ValidationException;

  const factory iException.unauthorized({
    required String message,
    int? code,
  }) = UnauthorizedException;

  const factory iException.unknown({
    required String message,
    int? code,
  }) = UnknownException;

  const iException._();
}
```

Run code generation:

```sh
flutter pub run build_runner build --delete-conflicting-outputs
```

What Freezed generates from this:

```plaintext
iException (sealed base)
├── InternetException    — network failures, no connectivity
├── MapperException      — JSON parsing and deserialization failures
├── ValidationException  — input validation failures
├── UnauthorizedException — auth failures, expired tokens
└── UnknownException     — catch-all for unexpected errors
```

Each subclass is fully immutable, has `==` and `hashCode` based on its fields, and a proper `toString`. Creating exceptions is clean and explicit:

```dart
iException.internet(message: 'No internet connection')
iException.unauthorized(message: 'Session expired', code: 401)
iException.validation(message: 'Email format is invalid')
iException.mapper(message: 'Failed to parse UserResponse', code: 500)
iException.unknown(message: e.toString())
```

The private constructor `const iException._()` is a Freezed requirement when you add any instance method or getter to the base class — it allows Freezed's generated subclasses to call `super._()` without exposing a public constructor on the base.

### Pattern Matching on Exception Types

Because `iException` is a Freezed sealed class, you get `when`, `maybeWhen`, `map`, and `maybeMap` for free from code generation:

```dart
exception.when(
  internet: (message, code) => 'No internet: $message',
  mapper: (message, code) => 'Parse error: $message',
  validation: (message, code) => 'Invalid input: $message',
  unauthorized: (message, code) => 'Unauthorised — please log in again',
  unknown: (message, code) => 'Unexpected error: $message',
);
```

Every case is required. The compiler rejects incomplete matches. You can't accidentally handle only some exception types and silently miss others.

For cases where you only care about specific types:

```dart
exception.maybeWhen(
  unauthorized: (message, code) => _redirectToLogin(),
  orElse: () => _showGenericError(exception),
);
```

### A Cleaner Base Getter Pattern

One thing worth improving in the base `iException` is providing a safe `message` getter that works across all subtypes without throwing `UnimplementedError`:

```dart
const iException._();

String get displayMessage => when(
  internet: (message, _) => message,
  mapper: (message, _) => message,
  validation: (message, _) => message,
  unauthorized: (message, _) => message,
  unknown: (message, _) => message,
);
```

Now any code holding an `iException` — regardless of which subtype — can call `.displayMessage` safely:

```dart
// In a ViewModel or BLoC — no need to pattern match just for the message
emit(ErrorState(message: exception.displayMessage));
```

This is significantly cleaner than a base getter that throws `UnimplementedError` at runtime.

---

## Part 6: Putting It All Together

### The Full Architecture

Here's how all four patterns connect across a real clean architecture Flutter application:

```plaintext
Data Layer
  Dio/HTTP call returns raw response
    └── Wrapped in ApiResult<T, iException> (record type)
          │
          ▼
Repository Layer
  ApiRes.deserialize() converts record → Either<T, iException>
    └── Returns API<T> = Either<T, iException>
          │
          ▼
Domain / Use Case Layer
  AppResult<T> is the standard return type
    └── Sealed class with AppSuccess and AppFailureResult
          │
          ▼
Presentation Layer
  result.when() handles both paths
    └── exception.when() handles all failure types
```

Each layer has the result type that suits its responsibility. Conversion happens at the boundaries. The presentation layer always deals with `AppResult<T>` — it doesn't need to know about Either or records.

### Repository Layer

```dart
class AuthRepository {
  final AuthDataSource _dataSource;

  AuthRepository(this._dataSource);

  Future<AppResult<User>> login(String email, String password) async {
    // Data source returns a record
    final res = await _dataSource.login(email, password);

    // Convert to Either at the data/domain boundary
    final either = await ApiRes.deserialize<User>(res);

    // Convert Either to AppResult for the domain layer
    return either.fold(
      (user) => AppSuccess(user),
      (exception) => AppFailureResult(exception),
    );
  }

  Future<AppResult<List<User>>> getUsers() async {
    final res = await _dataSource.fetchUsers();
    final either = await ApiRes.deserialize<List<User>>(res);

    return either.fold(
      (users) => AppSuccess(users),
      (exception) => AppFailureResult(exception),
    );
  }
}
```

### Domain Layer

```dart
class LoginUseCase {
  final AuthRepository _repository;

  LoginUseCase(this._repository);

  Future<AppResult<User>> execute(String email, String password) async {
    if (email.isEmpty || password.isEmpty) {
      return AppFailureResult(
        iException.validation(message: 'Email and password are required'),
      );
    }

    return _repository.login(email, password);
  }
}
```

The use case adds its own validation layer — returning a `ValidationException` before even hitting the repository. All failures flow through the same `AppResult<T>` type regardless of where they originated.

### Presentation Layer

```dart
class AuthViewModel extends ChangeNotifier {
  final LoginUseCase _loginUseCase;

  AuthViewModel(this._loginUseCase);

  AuthState _state = const AuthState.idle();
  AuthState get state => _state;

  Future<void> login(String email, String password) async {
    _state = const AuthState.loading();
    notifyListeners();

    final result = await _loginUseCase.execute(email, password);

    result.when(
      success: (user) {
        _state = AuthState.authenticated(user);
      },
      failure: (exception) {
        // Pattern match on the exception type for specific handling
        final message = exception.when(
          internet: (msg, _) => 'No internet connection. Please check your network.',
          unauthorized: (msg, _) => 'Your session has expired. Please log in again.',
          validation: (msg, _) => msg,
          mapper: (msg, _) => 'Something went wrong. Please try again.',
          unknown: (msg, _) => 'An unexpected error occurred.',
        );

        _state = AuthState.error(message);
      },
    );

    notifyListeners();
  }
}
```

Two levels of exhaustive pattern matching — one for the result, one for the exception type. Every possible failure has a specific, user-friendly message. The compiler guarantees nothing is missed.

And using the monadic chain from Part 3 for a multi-step flow:

```dart
Future<void> loadDashboard(String userId) async {
  _state = const DashboardState.loading();
  notifyListeners();

  final result = (await _userRepo.getUser(userId))
      .flatMap((user) => _profileRepo.getProfile(user.profileId))
      .flatMap((profile) => _settingsRepo.loadSettings(profile.settingsId))
      .map((settings) => DashboardData(settings: settings));

  result.when(
    success: (data) => _state = DashboardState.loaded(data),
    failure: (exception) => _state = DashboardState.error(
      exception.displayMessage,
    ),
  );

  notifyListeners();
}
```

Three sequential async operations, each of which can independently fail, handled in a clean chain with a single error handler at the end. This is what production-grade error handling looks like.

---

## Conclusion

Error handling is one of those things that every codebase has, but few codebases have done well. The default in Dart , throwing and catching exceptions, is convenient for small projects and becomes a liability at scale. Failures become invisible, type information is lost across layers, and the compiler can't help you when something goes wrong.

The patterns in this article change that entirely.

Records give you lightweight result containers with zero boilerplate — perfect for layer-specific result types and domain-specific responses. Sealed Result types bring compiler enforcement — both paths are required, no failure can be silently ignored. The Monad pattern adds the ability to chain sequential operations cleanly, with automatic failure propagation through the chain. Either with `dartz` brings the full functional toolkit and a clean boundary type between your data and domain layers. And Freezed exceptions give your failure states structure, immutability, and exhaustive pattern matching, so every error type is handled explicitly and nothing slips through.

None of these patterns are complicated once you understand the problem they solve. And the problem they solve – invisible, unenforceable, type-unsafe error handling – is one of the most common sources of production bugs in Flutter applications.

The next step is taking one of these patterns into a real project. Using these will totally transform the error handling story and processes of your entire code base.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions",
  "desc": "Every Dart developer has written this at some point: try {   final user = await repository.getUser(id);   // do something with user } catch (e) {   // what is e? who knows.   print(e.toString()); } I",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/advanced-error-handling-in-dart-records-result-types-monads-and-freezed-exceptions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
