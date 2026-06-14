---
lang: en-US
title: "How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3"
description: "Article(s) > How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3"
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
      content: "Article(s) > How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3"
    - property: og:description
      content: "How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-dartexceptor-a-lighter-way-to-handle-errors-in-dart-3.html
prev: /programming/dart/articles/README.md
date: 2026-06-18
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc40f61f-a62e-42f6-b644-6a3742f60714.png
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
  name="How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3"
  desc="If you've worked with Flutter for any meaningful length of time, you've likely written this:..."
  url="https://freecodecamp.org/news/how-to-use-dartexceptor-a-lighter-way-to-handle-errors-in-dart-3"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cc40f61f-a62e-42f6-b644-6a3742f60714.png"/>

If you've worked with Flutter for any meaningful length of time, you've likely written this:

```dart
try {
  final user = await repo.getUser();
  print(user.name);
} catch (e) {
  print('Something went wrong: $e');
}
```

It compiles. It ships. And six months later, a bug report lands from a user staring at a blank screen, because somewhere, a `catch (e)` swallowed the real failure.

This snippet looks harmless, but it has three problems that only surface under pressure.

First, the failure is invisible in the signature. Whatever `repo.getUser()` returns tells you nothing about what happens when the network drops, the token expires, or the response is malformed. You only find out by reading the implementation, or by hitting the bug in production.

Second, the compiler can't help you. If a teammate forgets the `try/catch` somewhere else in the codebase, the app compiles fine. Nothing warns you. The crash happens at runtime, in front of a real user, not at build time in front of you.

Third, `catch (e)` catches everything indiscriminately. A typo, a null dereference, an actual network failure, and a malformed JSON response all land in the same block. You can't tell them apart without inspecting the error string, and that's fragile since it breaks the moment the message changes.

Put together, every failure path becomes a social contract between a function's author and its caller instead of something the type system enforces. Social contracts break under pressure, in large teams, and at 2am during an incident.

A few weeks ago, I wrote [**Advanced Error Handling in Dart: Records, Result Types, Monads, and Freezed Exceptions**](/freecodecamp.org/advanced-error-handling-in-dart-records-result-types-monads-and-freezed-exceptions.md) to walk through fixing exactly this, using Records, sealed Result types, the Monad pattern, `dartz`, and Freezed exceptions to make failure typed, visible, and impossible to ignore.

This article is meant to stand on its own, so we'll start with a quick recap of where that one landed before we pick the thread back up.

---

## Recap: Where the Previous Article Left Off

That article moved through several layers, each one fixing a limitation in the layer before it.

It started with Dart Records as the simplest possible fix, a typed tuple with nullable fields for success and failure:

```dart
typedef Result<E, T> = ({E? e, T? data});
```

This is already better than a bare exception because the return type now admits a function can fail.

But records have a real limitation. Nothing stops you from forgetting to check which field is populated, and there's no way to transform a result without manually unwrapping it first.

That gap is what led to a proper sealed Result type, `AppResult<T>`, which replaces the nullable-field record with two structurally distinct subclasses, `AppSuccess` and `AppFailure`, plus a `when()` method that forces both cases to be handled:

```dart :collapsed-lines
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
  }) => success(value);
}

class AppFailure<T> extends AppResult<T> {
  const AppFailure(this.error);
  final AppError error;

  @override
  R when<R>({
    required R Function(T value) success,
    required R Function(AppFailure failure) failure,
  }) => failure(this);
}
```

Because `AppResult` is `sealed`, the compiler enforces exhaustiveness. You genuinely can't forget the failure branch the way you could with a record or a `try/catch`.

From there, the article extended `AppResult` into a proper Monad by adding `map` and `flatMap`, so results could be transformed and chained without ever leaving the wrapper, and brought in `dartz`'s `Either` as the more conventional functional programming equivalent for teams who wanted that vocabulary. It closed with Freezed-based typed exceptions, so even the failure side carried structured, pattern-matchable data instead of a bare string.

By the end, the pattern looked like this across a full stack: a sealed result type, structured exceptions, and `map`/`flatMap` for transformation, wired consistently through the repository, domain, and presentation layers.

If you want the full derivation, why each layer was added, the `dartz` integration, and the Freezed exception setup, that article covers it in depth. What follows here only assumes the shape above, not the journey to it.

---

## The Problem After the Pattern

Here's what happened after I published that article.

Every time I started a new project, I found myself doing the same thing: recreating the sealed `Result` class, rewriting `Ok` and `Err`, re-implementing `map`, `flatMap`, and the rest. Copying the same roughly 150 lines from project to project, tweaking small things, occasionally introducing inconsistencies between projects because I forgot what I'd named something last time.

The pattern was right. The repetition wasn't.

A pattern you have to rewrite every time isn't a pattern, it's a chore. So I packaged it.

---

## How DartExceptor Works

[<VPIcon icon="fa-brands fa-dart-lang"/>DartExceptor](https://pub.dev/packages/dart_exceptor) is a lightweight, zero-dependency Dart 3 package that implements the exact pattern from the previous article, `Trace<T, E>`, `Ok`, `Err`, and a small, intentional set of monadic operations, as a reusable package.

No `dartz`, no Freezed, and no build_runner. Just `Trace<T, E>`, two implementations, and four methods.

```dart
dependencies:
  dart_exceptor: ^1.1.2
```

```dart
import 'package:dart_exceptor/dart_exceptor.dart';
```

That's the entire setup.

---

## The Core Type

Every operation in DartExceptor returns a `Trace<T, E>`:

- `T` is the success type
- `E` is the error type

`Trace` has exactly two implementations:

```dart
return Ok(user);                                    // success
return Err(AppException(code: 404, e: 'Not found')); // failure
```

You never construct `Trace` directly. You return `Ok` or `Err`, and program against `Trace` everywhere else. The function signature now tells the truth about what can happen:

```dart
Future<Trace<User, AppException>> getUser(String id);
```

Anyone reading that signature immediately knows this can succeed with a `User`, or fail with an `AppException`. No surprises six months later.

---

## The API: Four Methods, Each With One Job

If the previous article's `Result` type had `map`, `flatMap`, and a `when()` for pattern matching, DartExceptor takes that same shape and refines it into four focused methods.

### `split`, the Exit Point

`split` is where you leave the `Trace` world. Both handlers are required, so you can't accidentally ignore a failure path.

```dart
result.split(
  data: (user) => print(user.name),
  e: (e) => print(e.message),
);
```

### `map`, Extract and Transform Success

`map` unwraps the value from an `Ok` and lets you transform it directly:

```dart
final activeUsers = result.map(
  data: (users) => users.where((u) => u.isActive).toList(),
);
```

### `mapError`, Extract and Transform Failure

This is the mirror of `map`, for the error side. It's useful when crossing architectural boundaries where your data layer's exception type differs from your domain layer's:

```dart
final domainError = result.mapError(
  e: (e) => AppException(code: e.statusCode, e: e.toString()),
);
```

### `bind<B>`, Chain Operations That Return `Trace`

This is the one that does the real work. `bind<B>` lets you chain operations that themselves return a `Trace`, transforming the success type at each step. If any step fails, everything downstream is skipped automatically.

```dart
result
    .bind<User>(
      n: (users) {
        try {
          return Ok(users.firstWhere((u) => u.id == id));
        } catch (e) {
          return Err(AppException(code: 404, e: 'User not found'));
        }
      },
    )
    .bind<String>(n: (user) => Ok(user.firstName))
    .split(
      data: (name) => print('User: $name'),
      e: (e) => print('Error: ${e.e}'),
    );
```

`List<User>` becomes `User` becomes `String`. Each `bind<B>` transforms the type, the compiler checks every step, and a failure anywhere in the chain short-circuits straight to the `e` handler in `split`. This is the previous article's `flatMap` discussion, taken to its logical conclusion.

---

## Where This Fits in Clean Architecture

The pattern from the original article was always about more than syntax. It was about making failure visible across layers. DartExceptor slots into that exact structure with zero modification:

```dart
// Data layer
abstract class DataSource {
  Future<Trace<List<User>, AppException>> getAllUsers();
}

// Repository layer
abstract class IUserRepository {
  Future<Trace<List<User>, AppException>> getAllUsers();
}

// Use case layer
class UserUseCase {
  Future<Trace<List<User>, AppException>> getAllUsers() => repository.getAllUsers();
}

// Presentation layer
void loadUsers() async {
  final result = await useCase.getAllUsers();

  result.split(
    data: (users) => print('Loaded ${users.length} users'),
    e: (e) => print('Failed: ${e.e}'),
  );
}
```

The same layers, same separation, and same typed failure paths, just without rewriting the foundation every time.

---

## Why Not Just Use `dartz`?

The previous article covered `dartz`'s `Either` in depth, and it's a genuinely solid choice if your team is comfortable with its API surface and the dependency footprint isn't a concern.

DartExceptor exists for a narrower case, when you want the result type pattern without importing a library built around Haskell-style functional programming conventions. Theres no `Left`/`Right`, no `fold`, and no transitive dependencies. Just `Trace`, `Ok`, `Err`, and four methods that map directly onto how the previous article's pattern was actually used in practice.

|  | DartExceptor | dartz |
| --- | --- | --- |
| Dependencies | Zero | Multiple |
| Dart 3 native | Yes | No |
| API surface | 4 methods | Large |
| Haskell concepts required | No | Yes |
| Type-safe chaining (`bind<B>`) | Yes | Yes (`flatMap`) |

---

## Try It Out

DartExceptor is live on pub.dev:

```yaml title="pubspec.yaml"
dependencies:
  dart_exceptor: ^1.1.2
```

::: info

**Package**

<SiteInfo
  name="dart_exceptor | Dart package"
  desc="A lightweight, idiomatic Dart result type. Built on Dart 3 with zero dependencies. Features Trace<T,E>, Ok, Err, split, map, mapError and bind."
  url="https://pub.dev/packages/dart_exceptor/"
  logo="/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-u1hvgj6f/img/pub-dev-icon-cover-image.png"/>

**Source**

<SiteInfo
  name="seyifunmi92/Dart-Exceptor-Plugin"
  desc="Official Repository for the Dart Exceptor Exception handler Plugin - seyifunmi92/Dart-Exceptor-Plugin"
  url="https://github.com/seyifunmi92/Dart-Exceptor-Plugin/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4430bfc6c241d50aeaeb48826be94850c87d82e92745aaa4af062bac8d6d25ab/seyifunmi92/Dart-Exceptor-Plugin"/>

:::

If you've read the previous article and built something like this yourself, I'd genuinely love to hear how your version compares. And if DartExceptor saves you from rewriting that pattern one more time, a star on GitHub goes a long way.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use DartExceptor: A Lighter Way to Handle Errors in Dart 3",
  "desc": "If you've worked with Flutter for any meaningful length of time, you've likely written this:...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-dartexceptor-a-lighter-way-to-handle-errors-in-dart-3.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
