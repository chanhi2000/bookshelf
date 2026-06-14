---
lang: en-US
title: "Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop"
description: "Article(s) > Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop"
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
      content: "Article(s) > Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop"
    - property: og:description
      content: "Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/advanced-dart-learn-async-programming-with-streams-isolates-event-loop.html
prev: /programming/dart/articles/README.md
date: 2026-06-26
isOriginal: false
author:
  - name: Gidudu Nicholas
    url: https://freecodecamp.org/news/author/nicowalter/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bc97ef43-0f34-4cf1-a824-814a0ec2834d.png
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
  name="Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop"
  desc="I had been writing Flutter apps for over a year before I actually understood how Dart handles concurrency. I knew how to use await. I knew FutureBuilder and StreamBuilder well enough to get things wor"
  url="https://freecodecamp.org/news/advanced-dart-learn-async-programming-with-streams-isolates-event-loop"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bc97ef43-0f34-4cf1-a824-814a0ec2834d.png"/>

I had been writing Flutter apps for over a year before I actually understood how Dart handles concurrency.

I knew how to use `await`. I knew `FutureBuilder` and `StreamBuilder` well enough to get things working. But I didn't really understand what was happening underneath: why some code ran in a specific order, why certain operations froze my UI, or why stream subscriptions kept causing memory leaks I couldn't track down.

The moment I actually sat down and learned the event loop, everything else clicked. Why `mounted` checks work. Why `compute()` exists. Why streams behave differently depending on how many listeners you attach. These weren't separate things to memorize. They were all consequences of the same underlying model.

This article is the explanation I wish I'd had earlier. We'll go deep on how Dart's event loop actually works, how streams give you control over data that arrives over time, and how isolates let you escape the single thread when you need real parallelism — with practical Flutter examples throughout.

---

## How Dart's Single-Threaded Model Works

Most languages let you run code on multiple threads simultaneously. One thread handles the network call, another handles user input, another renders the UI — all running at the same time in parallel.

Dart doesn't work that way. Dart runs everything on a single thread. One thing at a time. Always.

When I first learned this, it felt like a limitation. How could a single thread handle a network call, a user tapping a button, and rendering 60 frames per second simultaneously? The answer is that it doesn't handle them simultaneously — it handles them in turns, managed by the event loop.

Think of it like a chef working alone in a kitchen. One chef, one pair of hands. They can't chop and stir at the same time. But a good chef doesn't stand idle waiting for water to boil — they go prep vegetables, come back when the water's ready, then move to the next task. They stay productive by switching between tasks as each one becomes available.

Dart is that chef. The event loop is the system that decides which task to pick up next.

---

## The Event Loop and Its Two Queues

The event loop runs for the entire lifetime of your Dart app. Its job is simple: check if there's work to do, do it, then check again. It does this continuously, in a loop, until the app exits.

Work doesn't happen immediately in Dart. When something is ready to run — a network response arriving, a timer firing, a `.then()` callback completing — it gets added to a queue. The event loop processes items from those queues one at a time.

Dart has exactly two queues, and understanding both is what separates developers who use async from developers who truly understand it.

### The Microtask Queue

This is the high-priority queue. The event loop always empties this queue completely before looking at anything else. `.then()` callbacks and `Future.microtask()` land here.

Think of it as the fast checkout lane: short, urgent tasks that should run as soon as possible after the current synchronous code finishes.

### The Event Queue

This is where everything external goes — timer callbacks, network responses, user input events, stream data, and `Future.delayed()` completions. The event loop processes one item from this queue, then goes back to check the microtask queue before processing the next event.

Here's what that ordering looks like in practice:

```dart
void main() {
  print('1 — synchronous, runs immediately');

  // Goes into the EVENT queue — regular lane
  Future.delayed(Duration.zero, () {
    print('4 — event queue');
  });

  // Goes into the MICROTASK queue — high priority lane
  Future.microtask(() {
    print('3 — microtask queue');
  });

  print('2 — synchronous, runs immediately');
}
//
// 1 — synchronous, runs immediately
// 2 — synchronous, runs immediately
// 3 — microtask queue
// 4 — event queue
```

Items `1` and `2` run first because they're synchronous — no queue involved, just straight execution. Then `3` runs before `4` even though both were scheduled with zero delay, because microtasks always run before events.

This ordering matters more than it might seem. When you chain multiple `.then()` calls, each callback goes into the microtask queue — which is why they feel immediate and always run before any timer or I/O callback, even one scheduled with zero delay.

```dart
void main() {
  Future(() => print('event 1'));
  Future(() => print('event 2'));
  Future.microtask(() => print('microtask 1'));
  Future.microtask(() => print('microtask 2'));
  print('synchronous');
}
//
// synchronous
// microtask 1
// microtask 2
// event 1
// event 2
```

Both microtasks run before either event, regardless of the order they were scheduled in.

---

## How async/await Fits Into This

`async/await` doesn't create new threads. It doesn't run things in parallel. It's syntactic sugar built on top of the event loop, a cleaner way to write code that works with Dart's single-threaded concurrency model.

Here's the best way I've found to think about it. Imagine you're a waiter in a restaurant, and you're the only waiter on shift. You can only do one thing at a time, but you don't have to stand at the kitchen pass waiting for food. You hand the order to the kitchen and walk away. You go refill water, take another order, clear a table. When the kitchen rings the bell, you pick up the food and deliver it.

`await` is that moment of handing the order to the kitchen and walking away. You're not blocking, you're pausing this particular task and telling the event loop "come back to me when this is ready." The event loop can now handle other things while the network call, file read, or timer is in progress.

When the awaited operation completes, the rest of your function gets added to the queue and runs when the event loop gets back to it.

```dart
Future<void> loadUser() async {
  print('A — before await');

  // Dart pauses here and hands control back to the event loop.
  // The event loop is now free to handle other work —
  // rendering frames, processing other futures, handling taps —
  // while the network call is in progress.
  final user = await dio.get('/user');

  // This only runs when the network response arrives
  // and the event loop gets back to this function.
  print('B — after await, got user');
}

void main() {
  loadUser();

  // This runs before B because loadUser() paused at the await
  // and returned control here before the network call completed.
  print('C — main continues');
}
//
// A — before await
// C — main continues
// B — after await, got user
```

### Why Blocking the Event Loop Causes Jank in Flutter

Flutter's UI rendering runs on the same main isolate as your Dart code. The engine needs the event loop to be free roughly every 16 milliseconds to render a frame at 60fps. Any synchronous operation that takes longer than that blocks the event loop completely — no frames get rendered, no taps get processed, the UI freezes.

```dart
// This is dangerous in Flutter.
// Parsing a large JSON response synchronously
// can take 100-300ms on slower devices.
// The event loop is completely blocked the entire time.
// Flutter drops every frame during that window.
// The user sees a frozen screen.
final users = (response.data as List)
    .map((json) => User.fromJson(json))
    .toList();
```

`await` doesn't help here because the work is CPU-bound — the CPU is busy the entire time, so there's no natural pause where the event loop can breathe. That's exactly the problem isolates exist to solve, which we'll get to shortly.

---

## Streams: Controlling Data That Arrives Over Time

A `Future` delivers one value and completes. A `Stream` delivers multiple values over time and stays open until it's cancelled or exhausted.

If a `Future` is ordering food at a restaurant — you wait once, you get one meal, it's done — then a `Stream` is a subscription newsletter. New editions keep arriving over time, and you keep receiving them until you unsubscribe.

```dart
// A stream that counts from 1 to 5, one number per second.
// async* marks this as a stream generator function.
// yield pushes a value into the stream and pauses
// until the listener is ready for the next value.
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(const Duration(seconds: 1));
    yield i;
  }
  // When the loop ends the stream closes automatically.
}
```

You can consume a stream with `await for` or with `.listen()`:

```dart
// Method 1 — await for: clean, readable for simple cases
await for (final number in countStream()) {
  print(number); // prints 1, 2, 3, 4, 5, one per second
}

// Method 2 — listen(): more control, can cancel midway
final subscription = countStream().listen(
  (number) => print(number),
  onError: (error) => print('Error: $error'),
  onDone: () => print('Stream closed'),
);

// Cancel after 3 seconds — stops receiving values
await Future.delayed(const Duration(seconds: 3));
subscription.cancel();
```

### Single-Subscription vs Broadcast Streams

This distinction trips up a lot of Flutter developers, and understanding it prevents a whole category of confusing errors.

**Single-subscription streams** can only have one listener at a time. This is the default. Most streams — file reads, HTTP response bodies — are single-subscription. Try to listen twice and you get a `StateError`.

```dart
final stream = countStream();

stream.listen(print); // fine
stream.listen(print); // throws: Stream has already been listened to
```

**Broadcast streams** can have any number of simultaneous listeners. All of them receive the same values. This is what you want for app-wide events, user interactions, or anything multiple parts of your app need to react to.

```dart
// StreamController.broadcast() creates a stream
// that any number of listeners can subscribe to.
final controller = StreamController<String>.broadcast();

controller.stream.listen((v) => print('Listener 1: $v'));
controller.stream.listen((v) => print('Listener 2: $v'));

// Both listeners receive this value
controller.sink.add('Hello');
// Listener 1: Hello
// Listener 2: Hello

// Always close the controller when you're done with it.
// An unclosed controller keeps resources alive indefinitely.
controller.close();
```

### Using StreamController to Create Streams Manually

`StreamController` gives you full manual control. You decide exactly when to push values, when to push errors, and when to close the stream. This is how you build reactive data sources from scratch.

```dart
class LocationService {
  // Broadcast so multiple widgets can listen to
  // location updates simultaneously.
  final _controller = StreamController<Position>.broadcast();

  // Expose only the stream publicly.
  // The controller stays private so only this class
  // can push new values into it.
  Stream<Position> get locationStream => _controller.stream;

  void startTracking() {
    Timer.periodic(const Duration(seconds: 2), (_) {
      final position = Position(lat: 0.3476, lng: 32.5825);
      // sink.add() pushes a value into the stream.
      // All active listeners receive it immediately.
      _controller.sink.add(position);
    });
  }

  void dispose() {
    // Always close the controller when you're done.
    // An unclosed controller is a memory leak.
    _controller.close();
  }
}
```

### Using Streams in Flutter with StreamBuilder

`StreamBuilder` is the Flutter widget for consuming a stream directly in the UI. It rebuilds every time a new value arrives.

```dart
StreamBuilder<List<Message>>(
  stream: firestore
      .collection('messages')
      .snapshots()
      .map((snapshot) => snapshot.docs
          .map((doc) => Message.fromJson(doc.data()))
          .toList()),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();
    }

    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    }

    if (!snapshot.hasData || snapshot.data!.isEmpty) {
      return const Text('No messages yet');
    }

    return ListView.builder(
      itemCount: snapshot.data!.length,
      itemBuilder: (context, index) {
        return MessageBubble(message: snapshot.data![index]);
      },
    );
  },
)
```

### Always Cancel Stream Subscriptions in `dispose`

This is one of the most common memory leaks in Flutter apps, and it comes directly from not understanding streams.

An active subscription keeps the stream's callback alive. If the widget it belonged to is gone but the subscription is still running, callbacks fire on a disposed widget, `setState` gets called after `dispose`, and objects that should have been freed stay in memory.

```dart
class _ChatScreenState extends State<ChatScreen> {
  StreamSubscription<Message>? _subscription;

  @override
  void initState() {
    super.initState();
    _subscription = messageStream.listen((message) {
      if (mounted) setState(() => messages.add(message));
    });
  }

  @override
  void dispose() {
    // cancel() unsubscribes from the stream.
    // Without this, the callback keeps firing
    // even after this screen is removed from the tree.
    _subscription?.cancel();
    super.dispose();
  }
}
```

---

## StreamTransformers and Advanced Stream Control

Once you understand streams, you quickly discover that raw streams rarely give you exactly what you want. You need to filter values, transform them, debounce rapid emissions, or combine multiple streams. That's where stream operators and `StreamTransformer` come in.

Dart's `Stream` class has a rich set of built-in transformation methods:

```dart
final stream = countStream();

// map — transform each value before it reaches listeners
stream
    .map((number) => number * 2)
    .listen(print); // 2, 4, 6, 8, 10

// where — filter out values that don't match a condition
stream
    .where((number) => number.isEven)
    .listen(print); // 2, 4

// take — only emit the first N values, then close
stream
    .take(3)
    .listen(print); // 1, 2, 3

// skip — ignore the first N values
stream
    .skip(2)
    .listen(print); // 3, 4, 5

// distinct — only emit when the value changes from the last one
Stream.fromIterable([1, 1, 2, 2, 3])
    .distinct()
    .listen(print); // 1, 2, 3
```

For more complex transformations, you can build a custom `StreamTransformer`. This is the pattern to reach for when the built-in operators don't cover your use case — for example, when you need to transform values in a way that requires maintaining state between emissions.

```dart
// A StreamTransformer that only emits values above a threshold
// and prefixes each one with a label.
StreamTransformer<int, String> aboveThreshold(int threshold) {
  return StreamTransformer.fromHandlers(
    handleData: (value, sink) {
      // sink.add() pushes a transformed value downstream.
      // If we don't call sink.add(), the value is filtered out.
      if (value > threshold) {
        sink.add('Above threshold: $value');
      }
    },
    handleError: (error, stackTrace, sink) {
      // Forward errors downstream unchanged.
      sink.addError(error, stackTrace);
    },
    handleDone: (sink) {
      // Close the output stream when the input stream closes.
      sink.close();
    },
  );
}

// Usage
countStream()
    .transform(aboveThreshold(3))
    .listen(print);
// Above threshold: 4
// Above threshold: 5
```

### Debouncing with Streams in Flutter

One of the most practical stream patterns in Flutter apps is debouncing a search field. Without debouncing, every keystroke fires an API call. With debouncing, you wait for the user to stop typing before firing.

```dart
class _SearchScreenState extends State<SearchScreen> {
  final _searchController = TextEditingController();
  final _searchStream = StreamController<String>();
  StreamSubscription? _subscription;
  List<Result> _results = [];

  @override
  void initState() {
    super.initState();

    _subscription = _searchStream.stream
        // Wait 300ms after the last keystroke before emitting.
        // If a new value arrives within 300ms, the timer resets.
        // This prevents firing an API call on every keystroke.
        .asyncExpand((query) async* {
          await Future.delayed(const Duration(milliseconds: 300));
          yield query;
        })
        // Ignore duplicate queries — no point re-fetching
        // if the user typed the same thing again.
        .distinct()
        // For each query, call the API and emit the results.
        // asyncMap cancels the previous call if a new query
        // arrives before the previous one completes.
        .asyncMap((query) => _repository.search(query))
        .listen((results) {
          if (mounted) setState(() => _results = results);
        });

    _searchController.addListener(() {
      _searchStream.add(_searchController.text);
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    _subscription?.cancel();
    _searchStream.close();
    super.dispose();
  }
}
```

---

## Isolates: Escaping the Single Thread

Dart is single-threaded, but that doesn't mean you're limited to one thread forever. Isolates are Dart's way of running code on a completely separate thread — with one important difference from threads in other languages.

In most languages, threads share memory. Two threads can read and write the same variable at the same time, which creates race conditions and requires careful locking to prevent.

Dart isolates don't share memory at all. Each isolate has its own separate memory heap. The only way two isolates can communicate is by passing messages — like sending notes through a slot in a wall rather than sharing a whiteboard.

This makes isolates safe by design. There are no race conditions because there's nothing to race over. Each isolate owns its data completely.

```plaintext
Main Isolate                    Worker Isolate
─────────────────               ─────────────────
Own memory heap                 Own memory heap
Own event loop                  Own event loop
UI rendering                    Heavy computation
User input                      No UI access
│                               │
│──── sends data ──────────────→│
│                               │ (processes independently)
│←─── receives result ──────────│
```

### When You Actually Need an Isolate

The distinction that matters is CPU-bound vs I/O-bound work:

- **I/O-bound work**: waiting for a network response, reading a file — just use `await`. The CPU is idle while waiting, so the event loop stays free.
- **CPU-bound work**: actually computing something, processing data, parsing large files — needs an isolate. The CPU is busy the whole time, so `await` can't help.

If parsing your API response takes 200ms, `await` doesn't save you. The event loop is blocked for those 200ms regardless. You need to move that work to a separate isolate.

### `Isolate.run()` — the Modern Approach

`Isolate.run()` was added in Dart 2.19 and is the cleanest way to run a one-off task in a background isolate. It spawns the isolate, runs your function, returns the result, and closes the isolate automatically.

```dart
// In your repository:
Future<List<User>> getUsers() async {
  // Step 1 — network call is I/O-bound.
  // We await it and the event loop stays free while waiting.
  final response = await dio.get('/users');

  // Step 2 — parsing thousands of users is CPU-bound.
  // We move it to a separate isolate with Isolate.run().
  // The main isolate's event loop stays free the whole time.
  // Flutter keeps rendering frames normally.
  final users = await Isolate.run(() {
    final data = response.data as List<dynamic>;
    return data
        .map((json) => User.fromJson(json as Map<String, dynamic>))
        .toList();
  });

  return users;
}
```

### `compute()` — Flutter's Built-in Helper

`compute()` is Flutter's wrapper around isolates that predates `Isolate.run()`. It's still widely used and works well, but has one constraint: the function you pass must be a top-level or static function, not a closure that captures local variables.

```dart
// The function must be top-level or static.
// It can't be a closure because closures that capture
// state can't be sent across isolate boundaries.
List<User> parseUsers(dynamic data) {
  return (data as List)
      .map((json) => User.fromJson(json as Map<String, dynamic>))
      .toList();
}

// In your repository:
final users = await compute(parseUsers, response.data);
```

For most use cases, `Isolate.run()` is simpler and more flexible. `compute()` is still useful if you need to support Flutter versions below 2.19. ### Full Isolate Communication with `SendPort` and `ReceivePort`

For long-running background tasks where you need to send multiple messages back and forth — a background sync service, a real-time data processor, a file watcher — you need a full isolate with `SendPort` and `ReceivePort`.

```dart
void main() async {
  // ReceivePort is how the main isolate listens
  // for messages coming back from the worker.
  final receivePort = ReceivePort();

  // Spawn the worker isolate and give it a SendPort
  // so it can send messages back to us.
  await Isolate.spawn(
    workerFunction,
    receivePort.sendPort,
  );

  // Listen for messages from the worker.
  receivePort.listen((message) {
    print('Main received: $message');
  });
}

// This function runs entirely in the worker isolate.
// It has its own memory heap, completely separate
// from the main isolate. It cannot access any
// variables from main() directly.
void workerFunction(SendPort sendPort) {
  for (int i = 0; i < 5; i++) {
    // sendPort.send() passes a message to the main isolate.
    // The message is copied, not shared — no shared memory.
    sendPort.send('Processed item $i');
  }
}
```

### Choosing the Right Approach

| Situation | Use |
| --- | --- |
| One-off background task | `Isolate.run()` |
| Need to support Flutter below 2.19 | `compute()` |
| Long-running background worker | Full isolate with `SendPort` |
| Waiting for network or file I/O | Just `await` — no isolate needed |

---

## Putting It All Together in Flutter

Here's a complete example that uses all three concepts together (the event loop, streams, and isolates) in a single Flutter feature: a search screen that fetches results from a mock API, parses them in a background isolate, and delivers them via a stream.

```dart :collapsed-lines
import 'dart:isolate';
import 'package:flutter/material.dart';

// Model
class SearchResult {
  final String id;
  final String title;
  const SearchResult({required this.id, required this.title});
}

// Top-level function — required for Isolate.run()
// because it can't be a closure
List<SearchResult> parseResults(List<dynamic> data) {
  // Simulate expensive parsing work
  return data.map((item) => SearchResult(
    id: item['id'].toString(),
    title: item['title'] as String,
  )).toList();
}

// Repository
class SearchRepository {
  // Mock data — in a real app this would be a network call
  final List<Map<String, dynamic>> _mockData = List.generate(
    100,
    (i) => {'id': i, 'title': 'Result ${i + 1}'},
  );

  Future<List<SearchResult>> search(String query) async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 500));

    // Filter mock data
    final filtered = _mockData
        .where((item) =>
            (item['title'] as String)
                .toLowerCase()
                .contains(query.toLowerCase()))
        .toList();

    // Parse in a background isolate so the main
    // isolate's event loop stays free
    return Isolate.run(() => parseResults(filtered));
  }
}

// Screen
class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final _controller = TextEditingController();
  final _repository = SearchRepository();

  bool _isLoading = false;
  List<SearchResult> _results = [];
  String? _error;

  Future<void> _search(String query) async {
    if (query.trim().isEmpty) {
      setState(() => _results = []);
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final results = await _repository.search(query);

      // mounted check — the user might have navigated away
      // while the search was running
      if (!mounted) return;

      setState(() {
        _results = results;
        _isLoading = false;
      });
    } catch (e) {
      if (!mounted) return;

      setState(() {
        _error = 'Search failed. Please try again.';
        _isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Search')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _controller,
              decoration: const InputDecoration(
                labelText: 'Search',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.search),
              ),
              onChanged: _search,
            ),
          ),
          Expanded(child: _buildBody()),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(_error!),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => _search(_controller.text),
              child: const Text('Try again'),
            ),
          ],
        ),
      );
    }

    if (_results.isEmpty) {
      return const Center(child: Text('No results found.'));
    }

    return ListView.builder(
      itemCount: _results.length,
      itemBuilder: (context, index) {
        final result = _results[index];
        return ListTile(
          leading: Text(result.id),
          title: Text(result.title),
        );
      },
    );
  }
}

void main() {
  runApp(const MaterialApp(home: SearchScreen()));
}
```

This example brings together everything we've covered:

- The **event loop** keeps the UI responsive while the mock network delay is in progress — `await` hands control back to the event loop so Flutter keeps rendering frames
- **Isolates** handle the parsing work in the background so even with a large result set the main thread stays free
- The **mounted check** protects against the widget being disposed while the search is in flight
- All four UI states (loading, error, empty, and results) are handled explicitly

---

## Final Thoughts

Understanding the event loop, streams, and isolates helps you understand why Dart behaves the way it does. Once that mental model is in place, a lot of things that used to feel arbitrary start making sense.

Why do you need the `mounted` check? Because `await` pauses your function and returns control to the event loop — the widget can be disposed before your function resumes. Why does `compute()` help with jank? Because CPU-bound work blocks the event loop, and moving it to an isolate frees the loop to keep rendering. Why do broadcast streams exist? Because the default single-subscription stream only allows one listener, and some data sources need to serve multiple parts of your app simultaneously.

These aren't separate rules to memorize. They're all consequences of the same single-threaded concurrency model, once you understand it from the ground up.

If you're already comfortable with `await` and `FutureBuilder`, pick one concept from this article and go deeper on it this week. Build the stream debounce example. Try `Isolate.run()` on a real parsing task in one of your apps. Watch what happens to your frame rate in Flutter DevTools before and after. The understanding sticks much faster when you see it working in your own code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Advanced Dart: Learn Asynchronous Programming with Streams, Isolates, and the Event Loop",
  "desc": "I had been writing Flutter apps for over a year before I actually understood how Dart handles concurrency. I knew how to use await. I knew FutureBuilder and StreamBuilder well enough to get things wor",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/advanced-dart-learn-async-programming-with-streams-isolates-event-loop.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
