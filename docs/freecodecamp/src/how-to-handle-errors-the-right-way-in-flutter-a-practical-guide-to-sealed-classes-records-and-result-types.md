---
lang: en-US
title: "How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types"
description: "Article(s) > How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types"
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
      content: "Article(s) > How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types"
    - property: og:description
      content: "How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-errors-the-right-way-in-flutter-a-practical-guide-to-sealed-classes-records-and-result-types.html
prev: /programming/dart/articles/README.md
date: 2026-06-21
isOriginal: false
author:
  - name: Gidudu Nicholas
    url: https://freecodecamp.org/news/author/nicowalter/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e607269-f3fe-4e0b-9fd5-def1fa4d3a4c.png
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
  name="How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types"
  desc="I used to think I was handling errors well in my Flutter apps. I had try/catch blocks everywhere. I was catching exceptions, logging them, and showing error messages to users. It felt solid. Then I st"
  url="https://freecodecamp.org/news/how-to-handle-errors-the-right-way-in-flutter-a-practical-guide-to-sealed-classes-records-and-result-types"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e607269-f3fe-4e0b-9fd5-def1fa4d3a4c.png"/>

I used to think I was handling errors well in my Flutter apps. I had try/catch blocks everywhere. I was catching exceptions, logging them, and showing error messages to users. It felt solid.

Then I started looking more carefully at what was actually happening in production. There were silent failures I never knew about. Functions that could throw but nothing in the type system warned you about it. Error handling scattered inconsistently across the codebase — some places caught errors, others didn't.

A junior developer on the team added a new API call and forgot the try/catch entirely, and nobody caught it in review because there was nothing in the code that said "this function can fail."

That's when I started taking error handling seriously as an architectural decision, not just a defensive habit.

This article covers the patterns I now use in production Flutter apps — Result types, sealed classes, Dart 3 records, and pattern matching — and how they work together to make errors visible, explicit, and impossible to ignore.

---

## Why try/catch Alone Isn't Enough

Try/catch works. I'm not saying it doesn't. For simple cases it's perfectly fine. But as your app grows, relying on try/catch as your primary error handling strategy creates a specific set of problems that only become obvious at scale.

The problem is invisibility.

When a function can throw an exception, there's nothing in its signature that tells you that. Look at this:

```dart
Future<User> getUser(String userId) async {
  final response = await dio.get('/users/$userId');
  return User.fromJson(response.data);
}
```

This function looks like it always returns a User. Nothing about its signature suggests it might fail. A developer calling this function has no idea whether to wrap it in a try/catch unless they read the implementation or have been burned by it before.

Now imagine this function is called in ten different places across your app. Some developers remember to handle errors. Others don't. There's no compiler warning, no lint rule, nothing to catch the inconsistency. The errors are invisible until a user reports a crash.

The second problem is that exceptions are contagious.

When a function throws, every caller has to handle it. And every caller of those callers. The error handling responsibility spreads outward through your codebase, often inconsistently. Some layers swallow exceptions silently. Others re-throw them. The flow of errors through your app becomes hard to reason about.

The third problem is that not all errors are exceptional.

A network request failing isn't an exceptional event in a mobile app. It's expected. Treating it as an exception — something abnormal that interrupts the normal flow — is the wrong mental model. It's a normal outcome that should be handled like any other outcome.

This is the core insight behind Result types: errors are values, not interruptions.

---

## Errors as Values: the Core Idea

The idea is simple. Instead of a function either returning a value or throwing an exception, it always returns a value — but that value can represent either success or failure.

```dart
// Instead of this — may or may not throw
Future<User> getUser(String userId);

// We write this — always returns a result
Future<Result<User>> getUser(String userId);
```

Now the function signature is honest. It tells you "this operation can succeed or fail, and you have to deal with both." The compiler enforces that you handle both cases. There's no way to accidentally ignore the failure path.

This pattern comes from languages like Rust and Kotlin where it's built into the standard library. In Dart we build it ourselves — and with sealed classes and pattern matching in Dart 3, it's cleaner than ever.

---

## Building a Result Type with Sealed Classes

Here's the Result type I use in production:

```dart title="result.dart"
// Sealed means every possible subtype is defined
// right here in this file. The compiler knows
// there are exactly two possible outcomes —
// Success and Failure — and nothing else.
sealed class Result<T> {}

// Success carries the value we wanted.
// T is the type parameter — Result<User> means
// Success carries a User, Result<List<Post>> carries a list.
class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

// Failure carries an AppError describing what went wrong.
// We use a typed error class rather than a raw exception
// so the UI can make decisions based on the error type.
class Failure<T> extends Result<T> {
  final AppError error;
  const Failure(this.error);
}
```

Now we need a typed error class. Instead of passing raw exception messages around, we define the specific errors our app can produce:

```dart title="app_error.dart"
// AppError is also sealed — every error type our app
// can produce is defined here. This makes it impossible
// to have an unhandled error type slip through.
sealed class AppError {}

// No internet connection
class NoInternetError extends AppError {}

// The server returned an error response
class ServerError extends AppError {
  final int statusCode;
  final String message;
  const ServerError({required this.statusCode, required this.message});
}

// The data came back in an unexpected format
class ParseError extends AppError {
  final String message;
  const ParseError(this.message);
}

// Something unexpected happened that we didn't anticipate
class UnknownError extends AppError {
  final String message;
  const UnknownError(this.message);
}
```

Now let's use this in a repository:

```dart :collapsed-lines title="post_repository.dart"
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'result.dart';
import 'app_error.dart';
import 'post.dart';

class PostRepository {
  final Dio _dio;
  PostRepository(this._dio);

  Future<Result<List<Post>>> getPosts() async {
    try {
      final response = await _dio.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      // Parse the response into a list of Post objects.
      // We wrap this in its own try/catch because parsing
      // can fail independently of the network call —
      // the API might return valid JSON but in an unexpected shape.
      try {
        final List<dynamic> data = response.data as List<dynamic>;
        final posts = data
            .map((json) => Post.fromJson(json as Map<String, dynamic>))
            .toList();

        // Wrap the success value in Success<List<Post>>
        // and return it. The caller receives a Result,
        // not a raw list, so they know they have to
        // check whether it succeeded or failed.
        return Success(posts);
      } catch (e) {
        return Failure(ParseError('Failed to parse posts: $e'));
      }
    } on DioException catch (e) {
      // Map Dio's exception types to our own AppError types.
      // This keeps Dio-specific types out of the rest of the app.
      // If we ever swap Dio for a different HTTP client,
      // only this file needs to change.
      if (e.type == DioExceptionType.connectionError) {
        return Failure(NoInternetError());
      }

      return Failure(
        ServerError(
          statusCode: e.response?.statusCode ?? 0,
          message: e.message ?? 'Server error',
        ),
      );
    } catch (e) {
      // Catch-all for anything unexpected
      return Failure(UnknownError(e.toString()));
    }
  }
}
```

Notice what changed. The function signature `Future<Result<List<Post>>>` is now honest. Anyone calling `getPosts()` knows they're getting a Result — they can't pretend it always succeeds. And the try/catch is contained entirely inside the repository. Nothing leaks out to the callers.

---

## Dart 3 Records and What They Add

Before we get to pattern matching, it's worth talking about Dart 3 records because they pair naturally with Result types.

A record is a lightweight, anonymous object that groups multiple values together without needing to define a full class. Think of it as a quick way to return multiple values from a function.

```dart
// Before records — you needed a class or a Map
// to return multiple values
Map<String, dynamic> getUserInfo() {
  return {'name': 'Nicholas', 'age': 28};
  // No type safety — 'age' could be anything
}

// With records — type safe, no class needed
(String name, int age) getUserInfo() {
  return ('Nicholas', 28);
  // The compiler knows name is a String and age is an int
}
```

Records become useful in error handling when you need to return a value and some metadata alongside it:

```dart
// A function that returns a post and its fetch timestamp
Future<Result<(Post, DateTime)>> getPostWithTimestamp(
  String postId,
) async {
  try {
    final response = await _dio.get('/posts/$postId');
    final post = Post.fromJson(response.data);

    // The record (post, DateTime.now()) groups both values
    // without needing a wrapper class
    return Success((post, DateTime.now()));
  } catch (e) {
    return Failure(UnknownError(e.toString()));
  }
}
```

And consuming it:

```dart
final result = await repository.getPostWithTimestamp('1');

switch (result) {
  case Success(:final data):
    // Destructure the record directly in the pattern
    final (post, fetchedAt) = data;
    print('Got \({post.title} at \)fetchedAt');
  case Failure(:final error):
    print('Failed: $error');
}
```

Records are not essential for Result types but they remove the need for small helper classes that exist purely to carry two or three values together. I use them regularly in repository methods that need to return data alongside pagination cursors or cache metadata.

---

## Pattern Matching on Errors

This is where everything comes together. Sealed classes plus pattern matching means the compiler forces you to handle every possible outcome. You can't accidentally ignore the failure case.

```dart
final result = await repository.getPosts();

switch (result) {
  // Named field pattern — extracts 'data' directly
  // from Success without a manual cast
  case Success(:final data):
    print('Got ${data.length} posts');

  case Failure(:final error):
    // Now pattern match on the error type
    // to give the user the right message
    switch (error) {
      case NoInternetError():
        print('No internet connection. Please check your connection.');
      case ServerError(:final statusCode, :final message):
        print('Server error \(statusCode: \)message');
      case ParseError(:final message):
        print('Something went wrong parsing the data: $message');
      case UnknownError(:final message):
        print('Unexpected error: $message');
    }
}
```

Both switch statements are exhaustive. If you add a new Result subtype and forget to handle it here, you get a compile error. Add a new AppError subtype and forget to handle it here, you get a compile error. The compiler is working as your quality control.

You can also use the `when` extension pattern for more concise handling:

```dart
// A helper extension that makes Result easier to consume
extension ResultExtension<T> on Result<T> {
  // Runs onSuccess if this is a Success,
  // runs onFailure if this is a Failure
  R when<R>({
    required R Function(T data) onSuccess,
    required R Function(AppError error) onFailure,
  }) {
    return switch (this) {
      Success(:final data) => onSuccess(data),
      Failure(:final error) => onFailure(error),
    };
  }

  // Returns the data if Success, null if Failure
  T? getOrNull() => switch (this) {
    Success(:final data) => data,
    Failure() => null,
  };

  // Returns true if this is a Success
  bool get isSuccess => this is Success<T>;

  // Returns true if this is a Failure
  bool get isFailure => this is Failure<T>;
}
```

Usage becomes very clean:

```dart
final result = await repository.getPosts();

final posts = result.when(
  onSuccess: (data) => data,
  onFailure: (error) => <Post>[],
);
```

---

## Applying This to a Real Bloc Feature

Let's wire everything into a complete Bloc. We'll use the posts feature we built in the previous session and upgrade it to use Result types.

The states, now with sealed classes:

```dart title="post_state.dart"
sealed class PostState {}

class PostInitial extends PostState {}

class PostLoading extends PostState {}

// Success state carries the posts directly
class PostLoaded extends PostState {
  final List<Post> posts;
  const PostLoaded(this.posts);
}

// Error state carries a typed AppError, not just a string.
// This means the UI can make decisions based on the
// error type — show a "no internet" message vs a
// "server error" message vs a "try again" message.
class PostError extends PostState {
  final AppError error;
  const PostError(this.error);
}
```

The Bloc:

```dart title="post_bloc.dart"
class PostBloc extends Bloc<PostEvent, PostState> {
  final PostRepository _repository;

  PostBloc(this._repository) : super(PostInitial()) {
    on<LoadPosts>(_onLoadPosts);
  }

  Future<void> _onLoadPosts(
    LoadPosts event,
    Emitter<PostState> emit,
  ) async {
    emit(PostLoading());

    // getPosts() now returns Result<List<Post>>
    // We pattern match on the result directly —
    // no try/catch needed here because the repository
    // already handles all error cases and wraps them
    // in a Failure. The Bloc just reads the result.
    final result = await _repository.getPosts();

    switch (result) {
      case Success(:final data):
        emit(PostLoaded(data));
      case Failure(:final error):
        emit(PostError(error));
    }
  }
}
```

Notice there's no try/catch in the Bloc at all. The repository owns error handling. The Bloc just reads the Result and emits the right state. It's clean, simple, and each layer doing exactly one job.

The UI:

```dart :collapsed-lines title="post_screen.dart"
BlocBuilder<PostBloc, PostState>(
  builder: (context, state) {
    return switch (state) {
      PostInitial() => const Center(
          child: Text('Press the button to load posts'),
        ),

      PostLoading() => const Center(
          child: CircularProgressIndicator(),
        ),

      PostLoaded(:final posts) => ListView.builder(
          itemCount: posts.length,
          itemBuilder: (context, index) {
            final post = posts[index];
            return ListTile(
              leading: Text('${post.id}'),
              title: Text(post.title),
              subtitle: Text(post.body),
            );
          },
        ),

      // Pattern match on the error type to show
      // the right message for each specific error.
      // This is something try/catch cannot give you —
      // typed, structured errors that the UI can act on.
      PostError(:final error) => Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                switch (error) {
                  NoInternetError() =>
                    'No internet connection. Please check your connection.',
                  ServerError(:final statusCode) =>
                    'Server error ($statusCode). Please try again.',
                  ParseError() =>
                    'Something went wrong. Please try again.',
                  UnknownError() =>
                    'An unexpected error occurred.',
                },
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  context.read<PostBloc>().add(LoadPosts());
                },
                child: const Text('Try again'),
              ),
            ],
          ),
        ),
    };
  },
)
```

The UI now shows a different message for each error type. A user with no internet gets a different message than a user who hit a server error. That's a much better user experience than a generic "something went wrong". And it comes directly from having typed errors rather than raw exception messages.

### When This Approach Is Worth It and When It Isn't

I want to be honest here, because I've seen developers over-engineer simple things in the name of good architecture.

**Use Result types when:**

- The function can fail in multiple distinct ways that the caller needs to handle differently
- You're building a repository or service layer that multiple features depend on
- You're working in a team where inconsistent error handling is a real problem
- The feature involves money, user data, or anything where silent failures are dangerous

**Stick with try/catch when:**

- It's a simple, one-off operation in a small feature
- The error handling is the same regardless of what went wrong: show a message, log it, done
- You're prototyping or in early development and the architecture is still changing
- The added complexity isn't justified by the size of the codebase

The Result type pattern adds ceremony. There's no point denying that. A simple try/catch is less code. The tradeoff is that try/catch is invisible — nothing enforces that callers handle errors. Result types are explicit — the type system enforces it.

For production apps that serve real users and have more than one developer working on them, that explicitness is worth the extra code. For a side project you're building alone, it might be overkill.

---

## End-to-End Example

Here's everything together in one complete feature. Copy this into a new Flutter project and run it.

```sh title="file structure"
lib/
  core/
    result.dart
    app_error.dart
  models/
    post.dart
  data/
    post_repository.dart
  bloc/
    post_bloc.dart
    post_event.dart
    post_state.dart
  ui/
    post_screen.dart
  main.dart
```

```dart :collapsed-lines title="result.dart"
sealed class Result<T> {}

class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

class Failure<T> extends Result<T> {
  final AppError error;
  const Failure(this.error);
}

extension ResultExtension<T> on Result<T> {
  R when<R>({
    required R Function(T data) onSuccess,
    required R Function(AppError error) onFailure,
  }) {
    return switch (this) {
      Success(:final data) => onSuccess(data),
      Failure(:final error) => onFailure(error),
    };
  }
}
```

```dart title="app_error.dart"
sealed class AppError {}

class NoInternetError extends AppError {}

class ServerError extends AppError {
  final int statusCode;
  final String message;
  const ServerError({required this.statusCode, required this.message});
}

class ParseError extends AppError {
  final String message;
  const ParseError(this.message);
}

class UnknownError extends AppError {
  final String message;
  const UnknownError(this.message);
}
```

```dart title="post.dart"
class Post {
  final int id;
  final String title;
  final String body;
  final int userId;

  const Post({
    required this.id,
    required this.title,
    required this.body,
    required this.userId,
  });

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'] as int,
      title: json['title'] as String,
      body: json['body'] as String,
      userId: json['userId'] as int,
    );
  }
}
```

```dart title="post_repository.dart"
import 'package:dio/dio.dart';
import '../core/result.dart';
import '../core/app_error.dart';
import '../models/post.dart';

class PostRepository {
  final Dio _dio;
  PostRepository(this._dio);

  Future<Result<List<Post>>> getPosts() async {
    try {
      final response = await _dio.get(
        'https://jsonplaceholder.typicode.com/posts',
      );

      try {
        final List<dynamic> data = response.data as List<dynamic>;
        final posts = data
            .map((json) => Post.fromJson(json as Map<String, dynamic>))
            .toList();
        return Success(posts);
      } catch (e) {
        return Failure(ParseError('Failed to parse posts: $e'));
      }
    } on DioException catch (e) {
      if (e.type == DioExceptionType.connectionError) {
        return Failure(NoInternetError());
      }
      return Failure(
        ServerError(
          statusCode: e.response?.statusCode ?? 0,
          message: e.message ?? 'Server error',
        ),
      );
    } catch (e) {
      return Failure(UnknownError(e.toString()));
    }
  }
}
```

```dart title="post_event.dart"
sealed class PostEvent {}

class LoadPosts extends PostEvent {}
```

```dart title="post_state.dart"
import '../core/app_error.dart';
import '../models/post.dart';

sealed class PostState {}

class PostInitial extends PostState {}
class PostLoading extends PostState {}

class PostLoaded extends PostState {
  final List<Post> posts;
  const PostLoaded(this.posts);
}

class PostError extends PostState {
  final AppError error;
  const PostError(this.error);
}
```

```dart title="post_bloc.dart"
import 'package:flutter_bloc/flutter_bloc.dart';
import '../core/result.dart';
import '../data/post_repository.dart';
import 'post_event.dart';
import 'post_state.dart';

class PostBloc extends Bloc<PostEvent, PostState> {
  final PostRepository _repository;

  PostBloc(this._repository) : super(PostInitial()) {
    on<LoadPosts>(_onLoadPosts);
  }

  Future<void> _onLoadPosts(
    LoadPosts event,
    Emitter<PostState> emit,
  ) async {
    emit(PostLoading());

    final result = await _repository.getPosts();

    switch (result) {
      case Success(:final data):
        emit(PostLoaded(data));
      case Failure(:final error):
        emit(PostError(error));
    }
  }
}
```

```dart :collapsed-lines title="post_screen.dart"
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/post_bloc.dart';
import '../bloc/post_event.dart';
import '../bloc/post_state.dart';
import '../core/app_error.dart';

class PostScreen extends StatelessWidget {
  const PostScreen({super.key});

  String _errorMessage(AppError error) {
    return switch (error) {
      NoInternetError() =>
        'No internet connection. Please check your connection.',
      ServerError(:final statusCode) =>
        'Server error ($statusCode). Please try again.',
      ParseError() => 'Something went wrong. Please try again.',
      UnknownError() => 'An unexpected error occurred.',
    };
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Posts')),
      body: BlocBuilder<PostBloc, PostState>(
        builder: (context, state) {
          return switch (state) {
            PostInitial() => const Center(
                child: Text('Press the button to load posts'),
              ),
            PostLoading() => const Center(
                child: CircularProgressIndicator(),
              ),
            PostLoaded(:final posts) => ListView.builder(
                itemCount: posts.length,
                itemBuilder: (context, index) {
                  final post = posts[index];
                  return ListTile(
                    leading: Text('${post.id}'),
                    title: Text(post.title),
                    subtitle: Text(post.body),
                  );
                },
              ),
            PostError(:final error) => Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(_errorMessage(error)),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: () {
                        context.read<PostBloc>().add(LoadPosts());
                      },
                      child: const Text('Try again'),
                    ),
                  ],
                ),
              ),
          };
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.read<PostBloc>().add(LoadPosts()),
        child: const Icon(Icons.download),
      ),
    );
  }
}
```

```dart title="main.dart"
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'bloc/post_bloc.dart';
import 'data/post_repository.dart';
import 'ui/post_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Result Type Demo',
      home: BlocProvider(
        create: (_) => PostBloc(PostRepository(Dio())),
        child: const PostScreen(),
      ),
    );
  }
}
```

---

## Final Thoughts

None of this is about being clever or following a pattern for its own sake. It's about making errors visible.

The fundamental problem with try/catch as your only error handling tool is that it hides the possibility of failure behind a normal-looking function signature. Result types surface that possibility in the type system, where the compiler can help you handle it consistently.

The combination of sealed classes, typed errors, pattern matching, and Dart 3 records gives you a system where:

- Functions are honest about what they can return
- Every error type is handled explicitly
- Adding a new error type automatically breaks every switch that doesn't handle it
- The UI can show the right message for the right error

I wish I'd built my first production app this way. It would have saved me a lot of time tracking down silent failures and inconsistent error states.

If you're already comfortable with try/catch and want to take your error handling to the next level, start small. Add a Result type to one repository. See how it feels. The pattern tends to spread naturally once you experience the clarity it brings.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Errors the Right Way in Flutter: A Practical Guide to Sealed Classes, Records, and Result Types",
  "desc": "I used to think I was handling errors well in my Flutter apps. I had try/catch blocks everywhere. I was catching exceptions, logging them, and showing error messages to users. It felt solid. Then I st",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-errors-the-right-way-in-flutter-a-practical-guide-to-sealed-classes-records-and-result-types.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
