---
lang: en-US
title: "How to Use Streams in Flutter"
description: "Article(s) > How to Use Streams in Flutter"
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
      content: "Article(s) > How to Use Streams in Flutter"
    - property: og:description
      content: "How to Use Streams in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-streams-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-10-30
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761774911652/ca6749c7-391b-4a9f-9264-5f15e54855ee.png
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
  name="How to Use Streams in Flutter"
  desc="Flutter, Google's open-source UI software development toolkit, has rapidly become a preferred choice for building natively compiled, cross-platform applications from a single codebase. Its declarative UI paradigm, coupled with robust performance, hel..."
  url="https://freecodecamp.org/news/how-to-use-streams-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761774911652/ca6749c7-391b-4a9f-9264-5f15e54855ee.png"/>

Flutter, Google's open-source UI software development toolkit, has rapidly become a preferred choice for building natively compiled, cross-platform applications from a single codebase. Its declarative UI paradigm, coupled with robust performance, helps developers craft beautiful and highly responsive user experiences.

But in order to build such dynamic and efficient applications in Flutter, you’ll need a profound understanding of asynchronous programming. And within that domain, **streams** are an indispensable tool.

This comprehensive guide will delve deep into the world of streams in Flutter, demystifying their core concepts, illustrating their practical applications, and providing a wealth of code examples to solidify your understanding.

::: note Prerequisites

Before we embark on this journey, make sure you have a basic understanding of:

1. **Dart programming language:** Familiarity with Dart's syntax, variables, functions, and object-oriented concepts.
2. **Flutter fundamentals:** Knowledge of Flutter widgets, `StatefulWidget` vs. `StatelessWidget`, and basic UI layout.
3. **Asynchronous programming basics (Dart's** `Future`): An understanding of what `Future` represents and how the `async`/`await` keywords work to handle single asynchronous operations. If you're new to `Future`, think of it as a placeholder for a value that will be available at some point in the future.

:::

If you're comfortable with these concepts, you're well-prepared to explore the power of streams.

---

## The Challenge of Asynchronous Operations

In modern applications, blocking the UI is bad. Imagine an app freezing while it fetches data from the internet, processes a large file, or performs a complex calculation. This leads to a frustrating user experience.

Traditional synchronous programming executes tasks sequentially. When a long-running task is encountered, the entire program waits for it to complete. Asynchronous programming, on the other hand, allows tasks to run in the background without blocking the main execution thread, particularly the UI thread.

Dart's `Future` class is excellent for handling single asynchronous events (for example, a single network request that returns a single piece of data). But what if you have a continuous flow of events? What if you need to listen for data updates over time, like real-time chat messages, sensor readings, or continuous user input? This is where `Streams` shine.

---

## What are Streams? The Flow of Asynchronous Events

In Flutter (and Dart), a **stream** is fundamentally a sequence of asynchronous events. Think of it as a conveyor belt carrying data items over time. These events can be:

1. **Data values:** The actual information being transmitted (for example, integers, strings, custom objects).
2. **Errors:** Signals that something went wrong during the event sequence.
3. **Stream termination:** A signal indicating that no more events will be sent.

Streams provide a powerful reactive programming paradigm, allowing your application to react to events as they occur, without blocking the user interface. This enables the creation of highly responsive and efficient applications.

### Analogy: The River of Data

Imagine a river. The water flowing in the river is like the data (events) in a stream.

- You can set up a **listener** (like a fishing net) to catch fish (data) as they flow by.
- Sometimes, debris (errors) might come down the river.
- Eventually, the river might dry up (stream termination).

This continuous flow is what makes streams distinct from `Future` objects, which represent a single "delivery" rather than a continuous "flow."

### Why Streams are Crucial in Flutter

1. **Real-time updates:** Ideal for chat applications, live data feeds (stocks, weather), and sensor data.
2. **Event handling:** Managing continuous user input (for example, search bar suggestions), gestures, or notifications.
3. **Decoupling logic:** Separating data fetching/processing from UI rendering, leading to cleaner, more maintainable code.
4. **State management:** Many advanced Flutter state management solutions (like BLoC, Provider's `StreamProvider`) leverage Streams extensively.

Here's a visual representation of how a stream works:

![a visual representation of how a stream works](https://cdn.hashnode.com/res/hashnode/image/upload/v1761638371213/7029f337-d63d-4178-b24c-6678173349ed.png)

---

## Key Concepts of Streams

To effectively work with Streams, you need to understand a few core components:

### 1. `StreamController`

A `StreamController` is your primary tool for creating and managing streams. It acts as both a **sink** (where you add data/events to the stream) and a **source** (from which you can get the stream to listen to). It's the mechanism that allows you to "control" the flow of events into your stream.

The purpose of a `StreamController` is to create, manage, and add events (data, errors, done signals) to a stream.

::: tip Code sample

```dart :collapsed-lines
import 'dart:async'; // Required for StreamController

void main() {
  // 1. Create a StreamController for String data
  //    The type argument <String> specifies the type of data this stream will emit.
  final streamController = StreamController<String>();

  // 2. Get the stream from the controller
  //    This is the stream that other parts of your application will listen to.
  Stream<String> myStream = streamController.stream;

  // 3. Listen to the stream
  //    The .listen() method registers a callback to handle incoming data.
  //    It returns a StreamSubscription, which can be used to manage the listener.
  var subscription = myStream.listen((data) {
    print('Received data: $data');
  });

  // 4. Add data to the stream
  //    Use the sink property of the controller to add events.
  streamController.sink.add('Hello');
  streamController.sink.add('Flutter');
  streamController.sink.add('Streams!');

  // 5. Simulate an error
  //    You can also add errors to the stream.
  streamController.sink.addError('Something went wrong!');

  // 6. Close the stream when you're done
  //    It's crucial to close the stream controller to prevent memory leaks.
  //    This also sends a "done" event to all listeners.
  streamController.close();

  // Optionally cancel the subscription if no longer needed before stream closes
  // subscription.cancel();
}
```

**In this code:**

The line `final streamController = StreamController<String>();` initializes a `StreamController` designed to handle `String` data, though it can be created for any data type (for example, `int`, custom classes, and so on). The `Stream<String> myStream = streamController.stream;` statement retrieves the actual `Stream` that consumers, such as `StreamBuilder` widgets or other listeners, can subscribe to.

By calling `myStream.listen((data) { ... });`, you set up a listener that executes the provided callback function each time `streamController.sink.add()` is invoked with new data. To emit data, you use `streamController.sink.add('Hello');`, while `streamController.sink.addError('Something went wrong!');` allows you to emit error events that listeners can respond to.

Finally, calling `streamController.close();` is essential, as it notifies all listeners that the stream is complete and will emit no further events, while also freeing resources. Neglecting to close a controller can cause memory leaks, especially in long-running applications.

:::

### Types of Streams: Single-Subscription vs. Broadcast

Streams come in two flavors, each suited for different use cases:

#### 1. Single-Subscription Streams (Default)

- **Purpose:** Designed for a single listener. Once you `listen()` to it, you cannot listen again unless the first subscription is cancelled or the stream is created as a broadcast stream.
- **Use Cases:** Data fetches (like a file read), HTTP responses where you only need one component to consume the result.
- **Example:** When you call `http.get(...).asStream()`, you get a single-subscription stream.

#### 2. Broadcast Streams

- **Purpose:** Allows multiple listeners to subscribe and receive events simultaneously. Events are delivered to all active listeners.
- **Use Cases:** Real-time data updates where multiple UI widgets or logic components need the same information (for example, a global authentication status, real-time notifications).
- **Creation:** You create a broadcast stream by passing `broadcast: true` to the `StreamController` constructor.

::: tip Code sample (Broadcast Stream):

```dart :collapsed-lines
import 'dart:async';

void main() async {
  // Create a StreamController that supports multiple listeners
  final broadcastController = StreamController<int>.broadcast();

  // Listener 1
  broadcastController.stream.listen((event) {
    print('Listener 1 received: $event');
  }, onError: (e) => print('Listener 1 error: $e'));

  // Listener 2 (can listen even while Listener 1 is active)
  broadcastController.stream.listen((event) {
    print('  Listener 2 received: $event');
  }, onError: (e) => print('  Listener 2 error: $e'));

  broadcastController.sink.add(1);
  await Future.delayed(Duration(milliseconds: 500)); // Simulate delay
  broadcastController.sink.add(2);
  await Future.delayed(Duration(milliseconds: 500));
  broadcastController.sink.addError('Broadcast error!');
  await Future.delayed(Duration(milliseconds: 500));
  broadcastController.sink.add(3);

  await Future.delayed(Duration(seconds: 1)); // Give time for events to process
  broadcastController.close(); // Close the controller, notifying all listeners
}
```

In `final broadcastController = StreamController<int>.broadcast();`, the key is `.broadcast()`. This ensures that multiple `listen()` calls on `broadcastController.stream` will all receive events. Both `Listener 1` and `Listener 2` independently subscribe and receive `1`, `2`, the error, and `3`.

:::

Choose the stream type carefully based on your application's needs. When in doubt, start with a single-subscription stream and convert to broadcast only if truly necessary, as broadcast streams can sometimes make debugging event flow more complex.

### 2. `StreamBuilder`

The `StreamBuilder` widget is Flutter's dedicated tool for integrating Streams directly into your UI. It's a `StatefulWidget` under the hood that listens to a stream and rebuilds its UI whenever new data, errors, or completion signals arrive. This makes your UI reactive to data changes without manually calling `setState()`.

`StreamBuilder` automatically rebuilds a part of the UI in response to new data from a stream.

::: tip Code sample

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'dart:async';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StreamBuilder Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: StreamBuilderPage(),
    );
  }
}

class StreamBuilderPage extends StatefulWidget {
  @override
  _StreamBuilderPageState createState() => _StreamBuilderPageState();
}

class _StreamBuilderPageState extends State<StreamBuilderPage> {
  final _dataController = StreamController<int>();
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    // Start adding data to the stream every second
    Timer.periodic(Duration(seconds: 1), (timer) {
      _counter++;
      _dataController.sink.add(_counter);
      if (_counter >= 5) {
        timer.cancel(); // Stop adding after 5 events
        _dataController.close(); // Close the stream
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('StreamBuilder Example')),
      body: Center(
        // StreamBuilder is the core widget here
        child: StreamBuilder<int>(
          stream: _dataController.stream, // The stream to listen to
          // initialData: 0, // Optional: A value to display before any stream data arrives
          builder: (context, snapshot) {
            // The builder function is called every time the stream emits a new event.
            // 'snapshot' contains the latest state of the stream.

            if (snapshot.connectionState == ConnectionState.waiting) {
              // Show a loading indicator while waiting for the first event
              return CircularProgressIndicator();
            } else if (snapshot.hasError) {
              // Display an error message if the stream emits an error
              return Text('Error: ${snapshot.error}', style: TextStyle(color: Colors.red));
            } else if (snapshot.hasData) {
              // Display the received data
              return Text(
                'Received Data: ${snapshot.data}',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              );
            } else {
              // This case might occur if the stream closes without sending data
              // or initialData wasn't provided and no data has arrived yet.
              return Text('No data yet or stream closed.');
            }
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // You could also add data from a button press, for instance
          // _dataController.sink.add(99);
        },
        child: Icon(Icons.add),
      ),
    );
  }

  @override
  void dispose() {
    // IMPORTANT: Close the StreamController when the widget is disposed
    // to prevent memory leaks.
    _dataController.close();
    super.dispose();
  }
}
```

This is a lot – so let’s explore what’s going on in this code:

A `StreamBuilder<int>(stream: _dataController.stream, builder: (context, snapshot) { ... })` widget listens to a stream and rebuilds the UI in response to new events or connection state changes.

The `stream` parameter specifies the stream to listen to, while the `builder` function is called every time the stream emits a new event or changes state. It receives the `BuildContext` and an `AsyncSnapshot<T>`, which encapsulates the latest stream data and status.

The `snapshot` provides key details about the stream:

- `snapshot.connectionState` shows the current connection state, `none` (no stream connected), `waiting` (connected but no data yet), `active` (actively receiving events), and `done` (stream closed).
- `snapshot.hasData` and `snapshot.data` indicate whether the stream has emitted data and provide access to the most recent value.
- `snapshot.hasError` and `snapshot.error` handle errors emitted by the stream.

In the `builder`, conditional rendering (using `if` or `switch` statements) allows you to display appropriate UI for each state, such as loading indicators, error messages, or the actual data.

You can also specify `initialData` to provide a starting value before the first event arrives, avoiding unnecessary loading indicators if you already have a known initial state.

Finally, always close your `StreamController` in the widget’s `dispose()` method to prevent memory leaks when the widget is removed from the widget tree.

:::

### 3. `StreamSubscription`

When you call `stream.listen()`, it returns a `StreamSubscription` object. This object represents the active connection between your listener and the stream. It's essential for managing the lifecycle of your listener.

`StreamSubscription` manages an active listener on a stream, primarily for cancelling it.

::: tip Code sample (already shown partially in `StreamController` example, but emphasizing `StreamSubscription`):

```dart :collapsed-lines
import 'dart:async';

void main() async {
  final streamController = StreamController<String>();

  StreamSubscription<String>? subscription; // Declare it nullable

  // Listen to the stream and store the subscription object
  subscription = streamController.stream.listen(
    (data) {
      print('Received data: $data');
      // After receiving 'Stop', cancel the subscription
      if (data == 'Stop') {
        print('Cancelling subscription...');
        subscription?.cancel(); // Use null-safe call
        streamController.close(); // Close the controller after stopping
      }
    },
    onError: (error) {
      print('Error: $error');
    },
    onDone: () {
      print('Stream is done (closed)!');
    },
    cancelOnError: false, // Don't cancel subscription if an error occurs
  );

  streamController.sink.add('Start');
  await Future.delayed(Duration(milliseconds: 500));
  streamController.sink.add('Continue');
  await Future.delayed(Duration(milliseconds: 500));
  streamController.sink.add('Stop'); // This will trigger cancellation

  // If the stream wasn't closed by 'Stop' logic, ensure it's closed here after a delay
  // await Future.delayed(Duration(seconds: 2));
  // if (!streamController.isClosed) {
  //   streamController.close();
  // }
}
```

In this code, a `StreamSubscription<String>? subscription;` variable is declared to hold the subscription to a stream. When `subscription = streamController.stream.listen(...)` is called, the `listen` method returns a `StreamSubscription` object that allows you to control the stream’s behavior.

The `subscription?.cancel();` method is the most crucial part: it detaches the listener from the stream, preventing it from receiving further events. This is especially important for single-subscription streams or when you need to stop listening to a broadcast stream temporarily. Forgetting to cancel subscriptions, particularly in `StatefulWidgets`, can lead to memory leaks.

The `listen` method accepts several parameters:

- The first positional argument is the `onData` callback (triggered when new data arrives)
- `onError` is an optional callback for handling errors
- `onDone` is an optional callback for when the stream closes
- And `cancelOnError` is a boolean that, when true, automatically cancels the subscription after the first error, stopping all further events.

:::

### Async Programming with Streams: `async*` and `yield`

While `StreamController` gives you fine-grained control over adding events, Dart also provides a more declarative way to create streams using `async*` and `yield`. This syntax is similar to `async`/`await` for `Future`s but for continuous streams of data.

1. `async*` (async-generator function): A function marked with `async*` returns a `Stream`.
2. `yield`: Inside an `async*` function, `yield` is used to emit data events to the stream.

We use `async*` and `yield` to easily create streams by iteratively yielding data without manually managing a `StreamController`.

::: tip Code sample

```dart :collapsed-lines
import 'dart:async';

// A function that returns a Stream of integers
Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    // Simulate some asynchronous work
    await Future.delayed(Duration(milliseconds: 500));
    // Yield (emit) the current value to the stream
    yield i;
  }
  // No explicit close() needed; the stream closes automatically when the function completes.
}

void main() {
  print('Starting stream...');
  // Listen to the stream generated by countStream
  final subscription = countStream(5).listen(
    (data) {
      print('Received: $data');
    },
    onDone: () {
      print('Stream is done!');
    },
    onError: (error) {
      print('Error in stream: $error');
    },
  );

  // You can still cancel the subscription manually if needed
  // Future.delayed(Duration(seconds: 2), () => subscription.cancel());
}
```

In this code, the `Stream<int> countStream(int max) async*` function uses the `async*` keyword to indicate that it returns a stream. Inside it, `await Future.delayed(Duration(milliseconds: 500));` demonstrates that `await` can still be used within an `async*` function to pause execution until a future completes, enabling asynchronous operations during stream generation.

The `yield i;` statement is what adds each value to the stream. Every time it’s called, the value `i` is emitted as an event, and the function pauses until the next value is ready or requested.

When the function completes (for example, when the `for` loop finishes), the stream automatically closes and emits an `onDone` event to all listeners, making stream management simpler than using a `StreamController` manually.

:::

This `async*`/`yield` syntax is particularly elegant for generating streams of data where the sequence is known or can be computed iteratively.

---

## How to Work with Streams: Practical Scenarios

Let's explore common patterns and operations with streams.

### 1. Transforming Streams: `map`, `where`, `take`, `skip`, and so on.

Streams are powerful because they are iterable, meaning you can apply various transformations to their data flow using methods similar to those found on Dart's `Iterable`s (`List`, `Set`).

```dart :collapsed-lines
import 'dart:async';

void main() async {
  final numbersController = StreamController<int>();

  // Create a stream that emits squares of numbers from another stream,
  // but only for even numbers, and only takes the first 3 results.
  numbersController.stream
      .where((number) => number % 2 == 0) // Only let even numbers pass
      .map((evenNumber) => evenNumber * evenNumber) // Transform even numbers to their squares
      .take(3) // Only take the first 3 squared even numbers
      .listen(
        (squaredEven) {
          print('Transformed data: $squaredEven');
        },
        onDone: () {
          print('Transformed stream is done!');
        },
        onError: (e) {
          print('Transformed stream error: $e');
        }
      );

  // Add some numbers to the source stream
  numbersController.sink.add(1);
  numbersController.sink.add(2); // Passes where, maps to 4, taken (1st)
  numbersController.sink.add(3);
  numbersController.sink.add(4); // Passes where, maps to 16, taken (2nd)
  numbersController.sink.add(5);
  numbersController.sink.add(6); // Passes where, maps to 36, taken (3rd)
  numbersController.sink.add(7);
  numbersController.sink.add(8); // Will not be processed due to .take(3)
  await Future.delayed(Duration(milliseconds: 100)); // Allow events to process

  numbersController.close();
}
```

In Dart streams, several transformation and filtering methods are available:

- `.where(bool test(T element))` filters events based on a condition
- `.map<R>(R convert(T event))` transforms each event from one type to another
- `.take(int count)` emits only the first specified number of events
- `.skip(int count)` ignores the first few events and emits the rest
- `.distinct()` allows only unique consecutive events to pass
- `.first`, `.last`, and `.single` return a `Future` that completes with the first, last, or single event respectively
- `.fold<R>(R initialValue, R combine(R previous, T element))` accumulates values like `reduce`
- `.asyncMap<R>(FutureOr<R> convert(T event))` applies asynchronous transformations to each event, making it useful for async operations on stream items.

These operators are incredibly powerful for manipulating and refining the data flow within your application.

### 2. Combining Streams

Sometimes you need to combine events from multiple streams.

1. `Stream.fromFutures(Iterable<Future<T>> futures)`: Creates a stream that emits the results of multiple `Future(s)` as they complete.
2. `StreamGroup` (from `package:async`): A utility for combining multiple streams into a single stream, preserving the order of events from the original streams.

::: tip Code sample (`Stream.fromFutures`):

```dart :collapsed-lines
import 'dart:async';

Future<String> fetchUserData(String userId) async {
  await Future.delayed(Duration(seconds: 1));
  return 'User Data for $userId';
}

Future<String> fetchProductData(String productId) async {
  await Future.delayed(Duration(milliseconds: 500));
  return 'Product Data for $productId';
}

void main() {
  final userFuture = fetchUserData('user123');
  final productFuture = fetchProductData('prod456');

  // Create a stream from these two futures
  Stream.fromFutures([userFuture, productFuture]).listen(
    (data) {
      print('Received: $data');
    },
    onDone: () {
      print('All futures completed and stream is done.');
    },
    onError: (e) {
      print('Error: $e');
    }
  );
}
```

The stream created by `Stream.fromFutures` will emit "Product Data for prod456" first (because it resolves faster), and then "User Data for user123". This demonstrates that events are emitted as their respective futures complete, not necessarily in the order they were provided in the list.

:::

---

## Real-World Examples in Flutter

### 1. Fetching Data from a Network with Live Updates

Imagine an app displaying a list of news articles that should refresh automatically.

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http; // Add http: ^0.13.0 to pubspec.yaml

// Model for a simple Article
class Article {
  final String title;
  final String description;

  Article({required this.title, required this.description});

  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      title: json['title'] ?? 'No Title',
      description: json['body'] ?? 'No Description', // Using 'body' for simplicity
    );
  }
}

class NewsService {
  final _articleController = StreamController<List<Article>>.broadcast();
  Stream<List<Article>> get articlesStream => _articleController.stream;

  Timer? _refreshTimer;

  NewsService() {
    _startAutoRefresh();
  }

  Future<void> _fetchArticles() async {
    try {
      final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts?_limit=5')); // Fake API
      if (response.statusCode == 200) {
        List<dynamic> jsonList = json.decode(response.body);
        List<Article> fetchedArticles = jsonList.map((json) => Article.fromJson(json)).toList();
        _articleController.sink.add(fetchedArticles);
      } else {
        _articleController.sink.addError('Failed to load articles: ${response.statusCode}');
      }
    } catch (e) {
      _articleController.sink.addError('Network Error: $e');
    }
  }

  void _startAutoRefresh() {
    _fetchArticles(); // Fetch immediately
    _refreshTimer = Timer.periodic(Duration(seconds: 10), (timer) {
      print('Auto-refreshing articles...');
      _fetchArticles(); // Fetch every 10 seconds
    });
  }

  void dispose() {
    _refreshTimer?.cancel();
    _articleController.close();
  }
}

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Live News Feed',
      theme: ThemeData(primarySwatch: Colors.deepPurple),
      home: NewsFeedPage(),
    );
  }
}

class NewsFeedPage extends StatefulWidget {
  @override
  _NewsFeedPageState createState() => _NewsFeedPageState();
}

class _NewsFeedPageState extends State<NewsFeedPage> {
  final NewsService _newsService = NewsService();

  @override
  void dispose() {
    _newsService.dispose(); // Important: dispose the service when widget is gone
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Live News Feed')),
      body: StreamBuilder<List<Article>>(
        stream: _newsService.articlesStream,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text('Error: ${snapshot.error}', style: TextStyle(color: Colors.red, fontSize: 18)),
              ),
            );
          } else if (snapshot.hasData) {
            final articles = snapshot.data!;
            if (articles.isEmpty) {
              return Center(child: Text('No articles found.'));
            }
            return ListView.builder(
              itemCount: articles.length,
              itemBuilder: (context, index) {
                final article = articles[index];
                return Card(
                  margin: EdgeInsets.all(8.0),
                  elevation: 4.0,
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(article.title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                        SizedBox(height: 8),
                        Text(article.description, style: TextStyle(fontSize: 14, color: Colors.grey[700])),
                      ],
                    ),
                  ),
                );
              },
            );
          } else {
            return Center(child: Text('Waiting for news...'));
          }
        },
      ),
    );
  }
}
```

In this code, the `NewsService` class encapsulates the logic for fetching articles. It uses a `StreamController.broadcast()` to allow multiple widgets to listen for article updates, even though in this example only the `NewsFeedPage` does.

The `_fetchArticles()` method handles the actual HTTP request, while `_startAutoRefresh()` initiates an immediate fetch and uses a `Timer.periodic` to trigger new fetches every 10 seconds, adding each new list of articles to `_articleController.sink`. The `dispose()` method is essential for cancelling the timer and closing the stream controller to prevent memory leaks.

On the UI side, the `NewsFeedPage` creates an instance of `NewsService`, and in its `dispose()` method, it calls `_newsService.dispose()` to release resources. A `StreamBuilder<List<Article>>` listens to `_newsService.articlesStream`, and its builder function updates the UI dynamically, displaying a loading indicator, an error message, or the list of articles as new events arrive from the stream.

This pattern is a robust way to handle dynamic, asynchronously updating data in your Flutter applications.

### 2. User Input Handling: Debouncing a Search Field

Imagine a search bar where you don't want to perform a search API call on every keystroke, but rather after the user pauses typing for a short duration (debouncing).

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'dart:async';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Debounced Search',
      theme: ThemeData(primarySwatch: Colors.green),
      home: DebouncedSearchPage(),
    );
  }
}

class DebouncedSearchPage extends StatefulWidget {
  @override
  _DebouncedSearchPageState createState() => _DebouncedSearchPageState();
}

class _DebouncedSearchPageState extends State<DebouncedSearchPage> {
  final TextEditingController _searchController = TextEditingController();
  final _searchQueryController = StreamController<String>.broadcast();

  String _lastSearchedTerm = '';
  StreamSubscription<String>? _debouncedSubscription;

  @override
  void initState() {
    super.initState();

    // Listen to changes in the text field
    _searchController.addListener(() {
      _searchQueryController.sink.add(_searchController.text);
    });

    // Debounce the stream of search queries
    _debouncedSubscription = _searchQueryController.stream
        .distinct() // Only emit if the value is different from the previous
        .debounce(Duration(milliseconds: 500)) // Wait 500ms after the last event
        .listen((query) {
          if (query.isNotEmpty) {
            _performSearch(query);
          } else {
            setState(() {
              _lastSearchedTerm = '';
         });
          }
        });
     }

  void _performSearch(String query) {
    // In a real app, this would be an API call
    print('Performing search for: "$query"');
    setState(() {
      _lastSearchedTerm = query;
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    _searchQueryController.close();
    _debouncedSubscription?.cancel(); // Cancel the subscription
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Debounced Search')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: 'Search',
                hintText: 'Type to search...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
              ),
              onChanged: (text) {
                // The addListener already handles adding to the stream
                // You could also add directly here if not using addListener
              },
            ),
            SizedBox(height: 20),
            Text(
              _lastSearchedTerm.isEmpty
                  ? 'Start typing to search.'
                  : 'Last performed search: "${_lastSearchedTerm}"',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 10),
            Text(
              'A search is triggered 500ms after you stop typing.',
              style: TextStyle(fontSize: 14, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}

// Extension to add a debounce operator to any Stream<T>
extension DebounceExtension<T> on Stream<T> {
  Stream<T> debounce(Duration duration) => transform(
    _DebounceStreamTransformer(duration),
  );
}

// Custom StreamTransformer for debouncing
class _DebounceStreamTransformer<T> extends StreamTransformerBase<T, T> {
  final Duration duration;

  _DebounceStreamTransformer(this.duration);

  @override
  Stream<T> bind(Stream<T> stream) {
    StreamController<T> controller = StreamController<T>();
    Timer? _timer;
    StreamSubscription<T>? _subscription;

    controller.onListen = () {
      _subscription = stream.listen(
        (data) {
          _timer?.cancel(); // Cancel previous timer
          _timer = Timer(duration, () {
            controller.add(data); // Add data after duration
            _timer = null;
          });
        },
        onError: controller.addError,
        onDone: () {
          _timer?.cancel(); // Ensure timer is cancelled if stream done
          controller.close();
        },
      );
    };

    controller.onPause = () => _subscription?.pause();
    controller.onResume = () => _subscription?.resume();
    controller.onCancel = () {
      _timer?.cancel(); // Cancel any pending timer
      return _subscription?.cancel();
    };

    return controller.stream;
  }
}
```

In this code, the `TextEditingController _searchController` is a standard Flutter controller that manages the text within a `TextField`. Alongside it, the `StreamController<String> _searchQueryController` serves as the source stream for all raw text input changes. It’s a broadcast stream, allowing multiple listeners, such as the debouncing logic, to receive events whenever text input changes.

Every time the user types, `_searchController.addListener(() { _searchQueryController.sink.add(_searchController.text); });` adds the latest text value to the `_searchQueryController` stream. This ensures that every input change emits an event into the stream.

The `debouncedSubscription = _searchQueryController.stream ... .listen(...);` line contains the main debouncing logic. The `.distinct()` operator ensures that duplicate inputs (like typing “apple,” deleting it, and retyping “apple”) don’t trigger redundant events. The `.debounce(Duration(milliseconds: 500))` operator, implemented as a custom stream transformer, waits for 500 milliseconds of inactivity before emitting the most recent value, resetting its timer with each new event. Once the debounced query is finally emitted, `.listen((query) { performSearch(query); });` executes the `performSearch` method with that query.

The `DebounceExtension` and `_DebounceStreamTransformer` make this possible by defining a custom `StreamTransformer`. The core logic resides in `bind(Stream<T> stream)`, which takes the original stream and produces a transformed one. Inside, a new `StreamController` is created to manage the output stream, while the input stream is listened to with `stream.listen(...)`.

The debouncing behavior is achieved by canceling any existing timer and starting a new one (`timer?.cancel(); timer = Timer(duration, () { ... });`). When the timer completes without new events, the data is emitted via `controller.add(data)`. Lifecycle methods like `onCancel`, `onPause`, and `onResume` handle proper cleanup and control, ensuring efficient resource management when listeners are paused, resumed, or canceled.

This debounce pattern is incredibly useful for optimizing expensive operations tied to rapid user input.

---

## Best Practices and Considerations

Keep the following in mind when you’re working with streams:

#### 1. Always close `StreamControllers`

This is paramount. Forgetting to call `_controller.close()` (especially in `dispose()` methods of `StatefulWidgets` or when a service is no longer needed) leads to memory leaks. If using `async*`/`yield`, the stream closes automatically when the generator function finishes.

#### 2. Cancel `StreamSubscriptions`

If you manually call `stream.listen()`, remember to store the returned `StreamSubscription` and call `subscription.cancel()` when you no longer need to listen. Again, this is typically done in `dispose()`. `StreamBuilder` handles its internal subscriptions automatically.

#### 3. Choose the right stream type

- **Single-Subscription:** For one-time data flows, like a file read or a single HTTP response.
- **Broadcast:** For multiple UI widgets or logic components needing to react to the same ongoing stream of events. Use `StreamController.broadcast()`.

#### 4. Error handling

Always implement `onError` callbacks for `listen()` and handle `snapshot.hasError` in `StreamBuilder` to provide a robust user experience.

#### 5. `initialData` with `StreamBuilder`

Use `initialData` when you have a meaningful value to display before the first stream event arrives. This can prevent brief loading indicators if the initial state is known.

#### 6. Avoid excessive `StreamBuilder` nesting

While convenient, having too many nested `StreamBuilders` can lead to complex code and potential performance issues if not managed well. Consider consolidating related stream logic.

#### 7. Testing streams

Mock `StreamControllers` or use `Stream.fromIterable` to create test streams for your widgets and business logic.

#### 8. Reactive extensions (RxDart)

 For more advanced stream operations (combining, throttling, buffering, and so on), consider using the rxdart package. It provides a rich set of operators inspired by ReactiveX, making complex asynchronous logic more manageable and declarative.

---

## Advanced Concepts (Brief Introduction)

If you want to go further with streams, there are some key concepts you’ll need to understand. Here’s a brief introduction so you know where to go from here:

1. **RxDart:** As mentioned, RxDart extends Dart's Stream API with powerful operators. If you find yourself needing more complex stream manipulation than what the core Dart Stream API offers, RxDart is the next logical step. It introduces concepts like `BehaviorSubject` (a `StreamController` that remembers the last emitted value and emits it immediately to new listeners) and `PublishSubject`.
2. **BLoC/Cubit pattern:** Many popular Flutter state management solutions, like the BLoC (Business Logic Component) pattern, are heavily built on streams. BLoCs expose streams (often using `StreamController`s internally) for UI to listen to state changes, completely decoupling presentation from business logic.
3. **Stream generators with** `sync*` **and** `yield` **(for Iterables):** While `async*`/`yield` create Streams, Dart also has `sync*`/`yield` for creating Iterables (synchronous sequences). This is not directly related to asynchronous streams but uses similar syntax.

---

## Conclusion

Streams are a cornerstone of modern asynchronous programming in Flutter. By understanding `StreamController`, `StreamBuilder`, `StreamSubscription`, and the `async*`/`yield` syntax, you gain the power to build highly reactive, efficient, and dynamic applications.

From handling network data to real-time user interactions, streams provide a flexible and robust mechanism for managing sequences of asynchronous events. Embrace them, and you'll unlock a new level of responsiveness and elegance in your Flutter development.

::: info References

### Official Documentation

<SiteInfo
  name="Asynchronous programming: Streams"
  desc="Learn how to consume single-subscriber and broadcast streams."
  url="https://dart.dev/tutorials/language/streams"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

This is the fundamental resource. It covers the core concepts of streams in Dart, including `StreamController`, `listen`, `async*`/`yield`, and basic transformations.

```component VPCard
{
  "title": "Stream class - dart:async library - Dart API",
  "desc": "API docs for the Stream class from the dart:async library, for the Dart programming language.",
  "link": "https://api.dart.dev/dart-async/Stream-class.html",
  "logo": "https://api.dart.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

The comprehensive reference for all methods and properties of the `Stream` class itself. Essential for understanding transformation methods like `map`, `where`, `take`, `skip`, and so on.

```component VPCard
{
  "title": "StreamController class - dart:async library - Dart API",
  "desc": "API docs for the StreamController class from the dart:async library, for the Dart programming language.",
  "link": "https://api.dart.dev/dart-async/StreamController-class.html",
  "logo": "https://api.dart.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

Details on how to create and manage `StreamController`s, including single-subscription vs. broadcast.

```component VPCard
{
  "title": "StreamSubscription class - dart:async library - Dart API",
  "desc": "API docs for the StreamSubscription class from the dart:async library, for the Dart programming language.",
  "link": "https://api.dart.dev/dart-async/StreamSubscription-class.html/",
  "logo": "https://api.dart.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

Information on managing your listeners and cancelling subscriptions.

```component VPCard
{
  "title": "StreamBuilder class - widgets library - Dart API",
  "desc": "API docs for the StreamBuilder class from the widgets library, for the Dart programming language.",
  "link": "https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html/",
  "logo": "https://api.flutter.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

The official Flutter documentation for the `StreamBuilder` widget, explaining its properties (`stream`, `builder`, `initialData`) and the `AsyncSnapshot`.

**Key Packages**

<SiteInfo
  name="async | Dart package"
  desc="Utility functions and classes related to the 'dart:async' library."
  url="https://pub.dev/packages/async/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qrtjp22n/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="rxdart | Dart package"
  desc="RxDart is an implementation of the popular ReactiveX api for asynchronous programming, leveraging the native Dart Streams api."
  url="https://pub.dev/packages/rxdart/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qrtjp22n/img/pub-dev-icon-cover-image.png"/>

**Articles and Tutorials (General)**

<SiteInfo
  name="Introduction to Dart"
  desc="A brief introduction to Dart programs and important concepts."
  url="https://dart.dev/language"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

Futures, async, await (Official Dart Guide): While not directly about streams, a solid understanding of `Future`s is a prerequisite.

**Related State Management Patterns**

<SiteInfo
  name="flutter_bloc | Flutter package"
  desc="Flutter widgets that make it easy to implement the BLoC (Business Logic Component) design pattern. Built to be used with the bloc state management package."
  url="https://pub.dev/packages/flutter_bloc/"
  logo="https://pub.dev/static/hash-qrtjp22n/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qrtjp22n/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Bloc State Management Library"
  desc="Official documentation for the bloc state management library. Support for Dart, Flutter, and AngularDart. Includes examples and tutorials."
  url="https://bloclibrary.dev/"
  logo="https://bloclibrary.dev/favicon.ico"
  preview="https://bloclibrary.dev/og.png?v=1"/>

**HTTP Package (for Network Examples)**

<SiteInfo
  name="http | Dart package"
  desc="A composable, multi-platform, Future-based API for HTTP requests."
  url="https://pub.dev/packages/http/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qrtjp22n/img/pub-dev-icon-cover-image.png"/>

By exploring these resources, you'll gain an even deeper and more authoritative understanding of streams in the Dart and Flutter ecosystem.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Streams in Flutter",
  "desc": "Flutter, Google's open-source UI software development toolkit, has rapidly become a preferred choice for building natively compiled, cross-platform applications from a single codebase. Its declarative UI paradigm, coupled with robust performance, hel...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-streams-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
