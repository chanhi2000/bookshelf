---
lang: en-US
title: "How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained"
description: "Article(s) > How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - devops
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained"
    - property: og:description
      content: "How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-flutter-apps-unit-widget-golden-and-integration-tests-explained.html
prev: /programming/dart/articles/README.md
date: 2026-08-28
isOriginal: false
author:
  - name: Gidudu Nicholas
    url: https://freecodecamp.org/news/author/nicowalter/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69cb8895-a630-439b-8871-2b16feeebe25.png
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

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained"
  desc="The first time I was asked ”what's your test coverage?” in a technical interview, I didn't have a good answer. I had shipped a couple of real Flutter apps by then. They worked and users were using the"
  url="https://freecodecamp.org/news/how-to-test-flutter-apps-unit-widget-golden-and-integration-tests-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69cb8895-a630-439b-8871-2b16feeebe25.png"/>

The first time I was asked "what's your test coverage?" in a technical interview, I didn't have a good answer.

I had shipped a couple of real Flutter apps by then. They worked and users were using them. But my tests, if you could call them that, were a handful of unit tests for a pricing function I'd been burned by once, and nothing else.

A few months later I refactored a task-completion flow (a change that looked completely safe in the diff) and broke the one thing users actually cared about: marking a task done removed it from the wrong list. Nothing crashed and no error was logged. A user just quietly stopped trusting the app. And I only found out because they told a friend who happened to also be a beta tester.

That's the bug that testing is actually for. Not the crash, as crashes get reported. The silent regression that ships clean and breaks trust is the one you only catch if something was watching.

I've since shipped several more apps, and I test deliberately now: not everything, but the things that have actually burned me.

This article covers the four kinds of tests Flutter gives you (unit, widget, golden, and integration) built around one real feature and tested at all four levels. We'll do it this way because reading four disconnected snippets never taught me how these layers are supposed to fit together. Seeing them stacked on the same feature is what finally made it click.

::: note Prerequisites

Before working through this tutorial, you should be comfortable with:

- **Basic Dart and Flutter syntax**: classes, async/await, and building simple widgets. This isn't a Flutter-from-scratch tutorial, and it assumes you can already build a screen. Perhaps you just haven't tested one properly yet.
- **The Provider/ChangeNotifier pattern** or something similar (Riverpod, Bloc, and so on): `TaskNotifier` extends `ChangeNotifier`, and the examples assume you're comfortable with that style of state management, even if your own app uses a different flavor.

You'll also need the following installed and set up:

- **Flutter SDK** (a recent stable version. The examples don't depend on anything bleeding-edge.)
- **An editor with Flutter/Dart support** (VS Code or Android Studio both work fine)
- **A device or emulator** for the integration test section specifically. An iOS simulator or Android emulator is enough. You don't need physical hardware.
- **The following dev dependencies**, which get introduced as they come up but are worth having on hand:

```yaml title="pubspec.yaml"
  dev_dependencies:
    flutter_test:
      sdk: flutter
    integration_test:
      sdk: flutter
    mocktail: ^1.0.4
    golden_toolkit: ^0.15.0
```

If you can run `flutter test` on an empty project and it exits cleanly, you're ready to go.

---

## Why Four Kinds of Tests, Not Just "Tests"

Every Flutter testing tutorial I read early on treated "testing" as one activity. It isn't. The four types answer four different questions, and confusing them is why testing feels like either overkill or a waste of time depending on which one you happen to be doing.

**Unit tests** answer: does this specific piece of logic produce the right output for a given input? No widgets, rendering, or simulated device. Just a function or a class and an assertion. These run in milliseconds, by the thousands if needed.

**Widget tests** answer: does this widget render and behave correctly given a specific state? They run in a simulated environment with no real device or real pixels. And they're fast enough to run on every save, but real enough to catch "the retry button doesn't appear when the request fails."

**Golden tests** answer: does this widget still *look* the way it's supposed to? They compare a rendered widget against a saved reference image, pixel for pixel. This is the only one of the four that can catch "the padding is now wrong" or "the text overflowed" – things that are visually obvious to a human and invisible to a `find.text()` assertion.

**Integration tests** answer: does the real app, compiled and running on a real or simulated device, actually work end to end? They're slow and comparatively expensive to run, and they're the only one of the four that will catch a bug that only exists in the interaction between layers, like a repository that returns the wrong type to a notifier that renders it correctly anyway.

None of the four replaces the others. A pricing bug belongs in a unit test. A missing error state belongs in a widget test. A shifted layout belongs in a golden test. A broken end-to-end flow belongs in an integration test. Using only one of the four means three categories of bugs slip through undetected.

---

## The Feature We're Testing

To keep this concrete, every section builds on the same feature: a task list where a user can mark a task complete, with the completed count reflected in an app bar.

```dart title="lib/task.dart"
class Task {
  const Task({required this.id, required this.title, this.isDone = false});

  final String id;
  final String title;
  final bool isDone;

  Task copyWith({bool? isDone}) =>
      Task(id: id, title: title, isDone: isDone ?? this.isDone);
}
```

```dart title="lib/task_repository.dart"
abstract class TaskRepository {
  Future<List<Task>> fetchTasks();
  Future<void> setTaskDone(String id, bool isDone);
}
```

```dart title="lib/task_logic.dart"
/// The bug I actually shipped: this used to filter on the wrong
/// field when a task list contained tasks from more than one list,
/// silently completing a task in the wrong place. A single unit
/// test on this function would have caught it before it shipped.
int countCompleted(List<Task> tasks) =>
    tasks.where((t) => t.isDone).length;

List<Task> markDone(List<Task> tasks, String id) => tasks
    .map((t) => t.id == id ? t.copyWith(isDone: true) : t)
    .toList();
```

```dart :collapsed-lines title="lib/task_notifier.dart"
class TaskNotifier extends ChangeNotifier {
  TaskNotifier(this._repository);
  final TaskRepository _repository;

  List<Task> _tasks = [];
  bool isLoading = false;
  String? error;

  List<Task> get tasks => _tasks;
  int get completedCount => countCompleted(_tasks);

  Future<void> load() async {
    isLoading = true;
    error = null;
    notifyListeners();

    try {
      _tasks = await _repository.fetchTasks();
    } catch (_) {
      error = 'Failed to load tasks. Please try again.';
    }

    isLoading = false;
    notifyListeners();
  }

  Future<void> complete(String id) async {
    final previous = _tasks;
    _tasks = markDone(_tasks, id); // optimistic update
    notifyListeners();

    try {
      await _repository.setTaskDone(id, true);
    } catch (_) {
      _tasks = previous; // roll back on failure
      notifyListeners();
    }
  }
}
```

```dart :collapsed-lines title="lib/task_screen.dart"
class TaskScreen extends StatefulWidget {
  const TaskScreen({super.key, required this.notifier});
  final TaskNotifier notifier;

  @override
  State<TaskScreen> createState() => _TaskScreenState();
}

class _TaskScreenState extends State<TaskScreen> {
  @override
  void initState() {
    super.initState();
    widget.notifier.load();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: widget.notifier,
      builder: (context, _) {
        final notifier = widget.notifier;

        return Scaffold(
          appBar: AppBar(title: Text('Tasks (${notifier.completedCount} done)')),
          body: notifier.isLoading
              ? const Center(child: CircularProgressIndicator())
              : notifier.error != null
                  ? Center(
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(notifier.error!),
                          const SizedBox(height: 8),
                          ElevatedButton(
                            onPressed: notifier.load,
                            child: const Text('Retry'),
                          ),
                        ],
                      ),
                    )
                  : ListView(
                      children: notifier.tasks
                          .map((task) => CheckboxListTile(
                                key: ValueKey(task.id),
                                title: Text(task.title),
                                value: task.isDone,
                                onChanged: task.isDone
                                    ? null
                                    : (_) => notifier.complete(task.id),
                              ))
                          .toList(),
                    ),
        );
      },
    );
  }
}
```

That's the whole feature. Now let's test it four different ways.

---

## Unit Tests: Business Logic in Isolation

`countCompleted` and `markDone` are plain Dart functions with zero Flutter dependency: no `BuildContext`, widgets, or anything that requires a test device. That's deliberate: logic this important shouldn't need a rendering engine to verify.

```dart :collapsed-lines title="test/task_logic_test.dart"
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/task.dart';
import 'package:my_app/task_logic.dart';

void main() {
  group('countCompleted', () {
    test('returns 0 for an empty list', () {
      expect(countCompleted([]), 0);
    });

    test('counts only tasks marked done', () {
      final tasks = [
        const Task(id: '1', title: 'A', isDone: true),
        const Task(id: '2', title: 'B', isDone: false),
        const Task(id: '3', title: 'C', isDone: true),
      ];

      expect(countCompleted(tasks), 2);
    });
  });

  group('markDone', () {
    test('marks only the task with the matching id', () {
      final tasks = [
        const Task(id: '1', title: 'A'),
        const Task(id: '2', title: 'B'),
      ];

      final result = markDone(tasks, '2');

      // The critical assertion — this is the exact bug I shipped.
      // A naive implementation that filters on the wrong field
      // would mark task '1' done instead, or both, and this
      // test would fail immediately instead of surfacing in
      // a user's bug report three weeks later.
      expect(result.firstWhere((t) => t.id == '1').isDone, false);
      expect(result.firstWhere((t) => t.id == '2').isDone, true);
    });

    test('returns an unchanged list if the id does not exist', () {
      final tasks = [const Task(id: '1', title: 'A')];
      final result = markDone(tasks, 'nonexistent');

      expect(result.first.isDone, false);
    });
  });
}
```

Run these with:

```sh
flutter test test/task_logic_test.dart
```

Each test runs in a few milliseconds. There's no reason to skip writing tests like these. The cost is near zero and this is exactly the layer where a wrong assumption silently ships to production, because nothing renders differently when the logic is subtly wrong. A checkbox still toggles, it just toggles the wrong task.

There's one habit worth building early: use `group` and parameterized-style loops instead of copy-pasting near-identical tests. I used to write five almost-identical test functions for five edge cases of the same function, and inevitably one of the five would drift out of sync with the others after a refactor.

```dart
group('markDone with various ids', () {
  final cases = <String, bool>{
    '1': true,   // exists, should be marked done
    '2': false,  // exists, different id, should stay unchanged
    'x': false,  // does not exist, should be a no-op
  };

  for (final entry in cases.entries) {
    test('id ${entry.key} resolves to isDone=${entry.value}', () {
      final tasks = [
        const Task(id: '1', title: 'A'),
        const Task(id: '2', title: 'B'),
      ];
      final result = markDone(tasks, '1');
      final target = result.where((t) => t.id == entry.key);

      if (target.isEmpty) {
        // The 'x' case — id doesn't exist, list should be unaffected
        expect(result.length, tasks.length);
      } else {
        expect(target.first.isDone, entry.value);
      }
    });
  }
});
```

This isn't strictly necessary for two or three cases, but the moment a function has five or six branches worth testing, a loop keeps the intent readable and makes adding a sixth case a one-line change instead of a copy-pasted test function that someone forgets to update correctly.

---

## Testing Async Logic and Exceptions

Most of the interesting logic in a real app isn't a pure synchronous function. It's async, and it can fail. `flutter_test`'s `test()` handles `Future`-returning bodies natively, which makes this easier than people expect, but there are two mistakes I made repeatedly before it became automatic.

```dart
test('setTaskDone throws for an unknown task id', () async {
  final repository = FakeTaskRepository();

  // expect() with throwsA works on synchronous throws.
  // For a Future that completes with an error, you need
  // expectLater with throwsA, or the async matcher form below.
  await expectLater(
    () => repository.setTaskDone('nonexistent', true),
    throwsA(isA<TaskNotFoundException>()),
  );
});

test('fetchTasks returns an empty list, not null, when there is nothing to fetch', () async {
  final repository = FakeTaskRepository(seed: []);

  final result = await repository.fetchTasks();

  // This looks trivial, but I've genuinely shipped a null check
  // in a widget that assumed an empty repository always threw
  // instead of returning []. One line here would have caught it.
  expect(result, isEmpty);
  expect(result, isNotNull);
});
```

The mistake I made most often early on: writing `expect(() => someAsyncFunction(), throwsA(...))` without `await` in front of it. Because the function being tested is async, the exception is thrown inside a `Future` that hasn't resolved yet when the synchronous `expect()` runs. The test passes even when the code is broken, silently, because nothing ever actually waited for the failure to happen. `expectLater` combined with `await` is the version that actually exercises the failure path.

---

## Widget Tests: The UI Without a Device

`TaskScreen` needs to render correctly whether it's loading, showing an error, or showing data. And it needs a fake `TaskRepository` to do that without a real network call. `mocktail` is the current standard for this in Dart, since it doesn't require code generation the way older mocking approaches did.

```yaml{1} title="pubspec.yaml"
dev_dependencies:
  mocktail: ^1.0.4
```

```dart :collapsed-lines title="test/task_screen_test.dart"
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:my_app/task.dart';
import 'package:my_app/task_notifier.dart';
import 'package:my_app/task_repository.dart';
import 'package:my_app/task_screen.dart';

class MockTaskRepository extends Mock implements TaskRepository {}

void main() {
  late MockTaskRepository repository;

  setUp(() {
    repository = MockTaskRepository();
  });

  testWidgets('shows a loading indicator while fetching', (tester) async {
    // A Completer that never resolves keeps the widget in the
    // loading state for the duration of this specific test.
    repository.fetchTasks; // registered below via when()
    when(() => repository.fetchTasks())
        .thenAnswer((_) => Completer<List<Task>>().future);

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));

    // pump() advances exactly one frame — enough to see the
    // loading state, without waiting for anything to resolve.
    await tester.pump();

    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });

  testWidgets('shows tasks once loaded', (tester) async {
    when(() => repository.fetchTasks()).thenAnswer(
      (_) async => [
        const Task(id: '1', title: 'Buy milk'),
        const Task(id: '2', title: 'Walk the dog', isDone: true),
      ],
    );

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));

    // pumpAndSettle waits for all pending frames and microtasks —
    // the right call once you want to assert on the final,
    // settled state rather than a specific frame along the way.
    await tester.pumpAndSettle();

    expect(find.text('Buy milk'), findsOneWidget);
    expect(find.text('Tasks (1 done)'), findsOneWidget);
  });

  testWidgets('shows an error state with a working retry button', (tester) async {
    when(() => repository.fetchTasks()).thenThrow(Exception('network error'));

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));
    await tester.pumpAndSettle();

    expect(find.text('Failed to load tasks. Please try again.'), findsOneWidget);

    // Now make the retry succeed, and confirm tapping Retry
    // actually recovers — not just that the button exists.
    when(() => repository.fetchTasks())
        .thenAnswer((_) async => [const Task(id: '1', title: 'Buy milk')]);

    await tester.tap(find.text('Retry'));
    await tester.pumpAndSettle();

    expect(find.text('Buy milk'), findsOneWidget);
    expect(find.text('Failed to load tasks. Please try again.'), findsNothing);
  });

  testWidgets('completing a task updates the done count', (tester) async {
    when(() => repository.fetchTasks()).thenAnswer(
      (_) async => [const Task(id: '1', title: 'Buy milk')],
    );
    when(() => repository.setTaskDone('1', true)).thenAnswer((_) async {});

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));
    await tester.pumpAndSettle();

    expect(find.text('Tasks (0 done)'), findsOneWidget);

    await tester.tap(find.byType(CheckboxListTile));
    await tester.pumpAndSettle();

    expect(find.text('Tasks (1 done)'), findsOneWidget);
  });
}
```

The retry test is the one worth paying attention to. It's tempting to stop at "the retry button appears" – but that only proves the button exists, not that tapping it does anything. Following through and asserting the recovered state is what actually protects against a retry button that's wired to the wrong callback, which is a real and easy mistake to make.

---

## Common Widget Test Mistakes

I've made every one of these, usually more than once.

### 1. Using `pump()` when you meant `pumpAndSettle()`, or the reverse.

`pump()` advances exactly one frame. `pumpAndSettle()` keeps pumping frames until nothing is scheduled to rebuild – which is what you want after an async operation completes, but it will hang indefinitely (and eventually throw a timeout) if something in the widget tree animates continuously, like a `CircularProgressIndicator`.

I once spent twenty minutes confused about a test timing out before realizing the loading spinner itself, being an infinite animation, was the thing preventing `pumpAndSettle` from ever seeing a settled frame.

The fix in that specific case is to call `pump()` a fixed number of times, or `pump(duration)` with an explicit duration, instead of `pumpAndSettle()`, whenever the widget under test contains something that legitimately never stops animating.

```dart
// This will time out if the tree contains a CircularProgressIndicator,
// which animates forever and never "settles."
await tester.pumpAndSettle();

// This advances a fixed number of frames instead — the right
// choice when you specifically want to catch the loading state
// mid-flight rather than wait for it to resolve.
await tester.pump();
await tester.pump(const Duration(milliseconds: 100));
```

### 2. Finding widgets by text when a `Key` would be more stable.

`find.text('Buy milk')` breaks the moment product copy changes, or if two tasks happen to share a title in a future test. I now key anything a test needs to find reliably, the same way `CheckboxListTile` above is keyed with `ValueKey(task.id)`: `find.byKey(const ValueKey('1'))` doesn't care what the task's title says.

### 3. Forgetting that `MaterialApp` wraps every widget test that touches `Theme.of(context)` or `Navigator`.

A raw `pumpWidget(TaskScreen(...))` without a `MaterialApp` ancestor throws a confusing error about a missing `Directionality` or `Navigator` the first time the widget tries to do anything that depends on either. This is an error message that, the first few times you hit it, doesn't obviously point at "wrap it in MaterialApp."

---

## Testing Text Input and Scrolling

Two interactions come up often enough to be worth their own examples: typing into a field, and scrolling to reveal something off-screen.

```dart :collapsed-lines
testWidgets('typing a name and submitting calls the repository', (tester) async {
  final repository = MockTaskRepository();
  when(() => repository.fetchTasks()).thenAnswer((_) async => []);
  when(() => repository.addTask(any())).thenAnswer((_) async {});

  await tester.pumpWidget(MaterialApp(
    home: TaskScreen(notifier: TaskNotifier(repository)),
  ));
  await tester.pumpAndSettle();

  // enterText simulates typing directly — no need to simulate
  // individual keystrokes for the overwhelming majority of tests.
  await tester.enterText(find.byKey(const Key('new_task_field')), 'Buy milk');
  await tester.tap(find.byKey(const Key('add_task_button')));
  await tester.pumpAndSettle();

  verify(() => repository.addTask('Buy milk')).called(1);
});

testWidgets('scrolling reveals a task below the fold', (tester) async {
  final repository = MockTaskRepository();
  when(() => repository.fetchTasks()).thenAnswer(
    (_) async => List.generate(
      30,
      (i) => Task(id: '$i', title: 'Task $i'),
    ),
  );

  await tester.pumpWidget(MaterialApp(
    home: TaskScreen(notifier: TaskNotifier(repository)),
  ));
  await tester.pumpAndSettle();

  // Task 25 is off-screen on first render in a 30-item list.
  expect(find.text('Task 25'), findsNothing);

  // scrollUntilVisible repeatedly scrolls a fixed amount and
  // checks after each attempt — the right tool when you don't
  // know exactly how far to scroll to reach a specific item.
  await tester.scrollUntilVisible(
    find.text('Task 25'),
    500.0,
    scrollable: find.byType(Scrollable),
  );

  expect(find.text('Task 25'), findsOneWidget);
});
```

---

## Golden Tests: Catching Visual Regressions

Every test so far checks *behavior*: that the right text appears or the right count updates. None of them would catch a change that makes the checkbox list overflow its container on a small screen, or a padding tweak that pushes the retry button off-screen. That's why golden tests exist.

A golden test renders a widget and compares it, pixel for pixel, against a saved reference image.

```dart :collapsed-lines title="test/task_screen_golden_test.dart"
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:my_app/task.dart';
import 'package:my_app/task_notifier.dart';
import 'package:my_app/task_repository.dart';
import 'package:my_app/task_screen.dart';

class MockTaskRepository extends Mock implements TaskRepository {}

void main() {
  testWidgets('task screen with data matches the golden file', (tester) async {
    final repository = MockTaskRepository();
    when(() => repository.fetchTasks()).thenAnswer(
      (_) async => [
        const Task(id: '1', title: 'Buy milk'),
        const Task(id: '2', title: 'Walk the dog', isDone: true),
      ],
    );

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));
    await tester.pumpAndSettle();

    // On first run, this generates the reference image.
    // On every run after, it fails if a single pixel differs.
    await expectLater(
      find.byType(TaskScreen),
      matchesGoldenFile('goldens/task_screen_with_data.png'),
    );
  });

  testWidgets('task screen error state matches the golden file', (tester) async {
    final repository = MockTaskRepository();
    when(() => repository.fetchTasks()).thenThrow(Exception('error'));

    await tester.pumpWidget(MaterialApp(
      home: TaskScreen(notifier: TaskNotifier(repository)),
    ));
    await tester.pumpAndSettle();

    await expectLater(
      find.byType(TaskScreen),
      matchesGoldenFile('goldens/task_screen_error.png'),
    );
  });
}
```

Generate the initial reference images with:

```sh
flutter test --update-goldens test/task_screen_golden_test.dart
```

Commit the generated `.png` files alongside the test. From then on, `flutter test` runs the comparison instead of regenerating. If a future change shifts a pixel, the test fails and shows you a diff, rather than a teammate noticing three sprints later that a screen looks slightly off on real devices.

There are two caveats worth knowing before you rely on this heavily. First, fonts and rendering can differ subtly between machines and CI runners, which produces false failures that have nothing to do with your code. Running goldens inside a consistent Docker image, or using a package like `golden_toolkit` (which normalizes font loading) resolves most of this.

Second, goldens are expensive to maintain on screens that change frequently during active development. I reserve them for stable, high-visibility screens rather than everything, since regenerating goldens for every layout tweak defeats the purpose.

---

## Multi-Device and Dark Mode Goldens

A single golden image only proves that the screen looks right at one screen size, in one theme. The bug I actually caught this way: a task title that truncated cleanly on a standard phone width overflowed by nine pixels on a small-screen device, and nobody noticed until a support ticket came in from someone using an older, narrower phone.

`golden_toolkit`'s `multiScreenGolden` renders the same widget across several device sizes in one test, which is the version I use on any screen I'm golden-testing at all:

```yaml{1} title="pubspec.yaml"
dev_dependencies:
  golden_toolkit: ^0.15.0
```

```dart :collapsed-lines
testGoldens('task screen across device sizes', (tester) async {
  final repository = MockTaskRepository();
  when(() => repository.fetchTasks()).thenAnswer(
    (_) async => [const Task(id: '1', title: 'Buy milk, eggs, and bread')],
  );

  final builder = DeviceBuilder()
    ..overrideDevicesForAllScenarios(devices: [
      Device.phone,       // narrow — this is the one that caught the overflow
      Device.iphone11,
      Device.tabletLandscape,
    ])
    ..addScenario(
      widget: MaterialApp(home: TaskScreen(notifier: TaskNotifier(repository))),
      name: 'with data',
    );

  await tester.pumpDeviceBuilder(builder);
  await screenMatchesGolden(tester, 'task_screen_multi_device');
});
```

Dark mode is worth the same treatment if your app supports it. A hardcoded text color that's invisible against a dark background is a real, embarrassing bug class, and it's completely invisible if every golden test only ever renders in light mode:

```dart
testGoldens('task screen in dark mode', (tester) async {
  final repository = MockTaskRepository();
  when(() => repository.fetchTasks()).thenAnswer(
    (_) async => [const Task(id: '1', title: 'Buy milk')],
  );

  await tester.pumpWidgetBuilder(
    TaskScreen(notifier: TaskNotifier(repository)),
    wrapper: materialAppWrapper(theme: ThemeData.dark()),
  );
  await tester.pumpAndSettle();

  await screenMatchesGolden(tester, 'task_screen_dark_mode');
});
```

---

## Keeping Goldens From Becoming a Maintenance Burden

The failure mode I've watched happen on more than one team is that goldens get added enthusiastically for a month, then a legitimate design change touches a shared component used across fifteen screens. Then all fifteen golden tests fail simultaneously, and the team runs `--update-goldens` without actually reviewing each diff. After all, because reviewing fifteen image diffs individually feels like it isn't worth the time under a deadline.

That single moment is where golden tests stop protecting you, because from then on the team's reflex is "regenerate and move on" rather than "look at what changed and confirm it's intentional."

Two things keep this from happening. First, keep the golden set small and specifically chosen. I mentioned this above, but it matters enough to repeat: choose five or six high-value screens, not fifty.

Second, treat a batch of golden failures as a signal to actually open the diffs, not a checkbox to clear. Most CI setups for golden tests can upload the diff images as build artifacts specifically so a reviewer can glance at them in a pull request without pulling the branch locally.

---

## Integration Tests: The Whole App, End to End

Unit and widget tests run in a simulated Dart environment. There's no real rendering engine or platform channels, and a fake repository stands in for the network. That's what makes them fast, and it's also exactly what they can't catch: whether the real app, compiled and running on a real device or emulator, actually works when every layer is genuinely wired together.

```yaml{2-3} title="pubspec.yaml"
dev_dependencies:
  integration_test:
    sdk: flutter
```

```dart title="integration_test/complete_task_test.dart"
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('user can load tasks and complete one, end to end', (tester) async {
    // This runs your actual main() — the real app, the real
    // repository implementation, whatever backend it's wired to
    // in this build (typically a staging environment for CI).
    app.main();
    await tester.pumpAndSettle();

    expect(find.text('Buy milk'), findsOneWidget);
    expect(find.textContaining('0 done'), findsOneWidget);

    await tester.tap(find.byType(CheckboxListTile).first);
    await tester.pumpAndSettle();

    expect(find.textContaining('1 done'), findsOneWidget);
  });
}
```

Run it against a real device or emulator:

```sh
flutter test integration_test/complete_task_test.dart
```

This is slower (seconds instead of milliseconds) because it's compiling and running the real app, not a simulated widget tree. That cost is exactly why integration tests should cover the handful of flows that would genuinely hurt if they broke, like completing a purchase or logging in (that is, the core action your app exists to let someone do) rather than every screen. I run five or six of these on a real project, covering the flows I'd want to know about before a user does.

---

## Flakiness, Retries, and Real Devices

Integration tests fail in ways the other three types mostly don't: intermittently, for reasons that have nothing to do with a bug. A CI emulator running slower than usual, a network call in a staging environment taking half a second longer than the test expected, or an animation still settling when the next action fires: all of these produce a failure that has nothing to do with whether the app actually works.

One habit saved me the most frustration: never chain `tester.tap()` directly to another interaction without a `pumpAndSettle()` (or an explicit `pump(duration)`) in between, even when it feels redundant.

```dart
// Flaky: if the tap triggers any async work (a network call, an
// animation), the next find() can run before it resolves,
// and the test fails unpredictably depending on machine speed.
await tester.tap(find.byType(CheckboxListTile).first);
expect(find.textContaining('1 done'), findsOneWidget);

// Reliable: explicitly wait for everything triggered by the tap
// to finish before asserting on the result.
await tester.tap(find.byType(CheckboxListTile).first);
await tester.pumpAndSettle();
expect(find.textContaining('1 done'), findsOneWidget);
```

For CI specifically, running integration tests against a real device farm (Firebase Test Lab, or a real device connected to a CI runner) catches a category of bug emulators sometimes miss entirely: permission dialogs behaving differently, camera or biometric prompts, or memory pressure that only shows up on actual hardware. It's also the most expensive and slowest option, which is why I run it on a schedule (nightly, or before a release) rather than on every commit.

If your app is complex enough to warrant richer integration-test tooling (native permission handling, biometric mocking, or deeper platform interaction), `patrol` is worth a look. It builds on `integration_test` but adds capabilities the base package doesn't have.

---

## Where Each Test Type Actually Pays Off

After shipping several apps with this four-layer approach, here's roughly how I allocate effort, and why:

**Unit tests, generously.** They're nearly free to write and run, and they're the only layer that catches a logic bug before it has any chance to manifest visually. Every pricing calculation, filter, and piece of business logic that isn't trivial gets one.

**Widget tests, for every screen with more than one state.** Loading, error, and success are three different code paths, and each one is a place a bug can hide silently. If a screen only has one state, a widget test adds less value. If it has three, skipping two of them is skipping two-thirds of the screen's actual behavior.

**Golden tests, sparingly and deliberately.** I reserve these for screens where a visual regression would be genuinely embarrassing, like a checkout flow or a core screen a user sees on every session. I wouldn't use them for every screen in the app, because the maintenance cost is real and not every layout is worth freezing in place.

**Integration tests, for the handful of flows that define the app.** Not comprehensive coverage, but just enough to know that when every real layer is wired together, the thing the app is actually for still works.

---

## Mistakes That Undermine a Test Suite Slowly

None of these break a build immediately. All of them make a test suite less trustworthy every month they go unaddressed, just like how an unstructured codebase gets harder to change every month without ever failing outright on any single day.

The first mistake is mocking the thing you're actually trying to test. I've seen (and written) a "unit test" for a repository that mocked the HTTP client so thoroughly that the test was really just asserting that Dio's own client behaves the way Dio's documentation says it does. If a test can't fail when your code has a real bug in it, it isn't testing your code.

Second is skipping the failure path because it's inconvenient to set up. Every screen in this article has a loading state, an error state, and a success state, and I've watched teams (myself included, early on) write a widget test only for success because it's the easy one to set up. The error state is exactly the one most likely to have a real bug in it, because it's the path developers exercise least often themselves during manual testing.

Treating a flaky test as something to retry rather than fix is also a mistake. A test that fails one time in twenty and passes on rerun isn't "occasionally flaky". It's telling you something real about a race condition, either in your code or your test's assumptions about timing. Silencing it with an automatic retry in CI trains the whole team to stop trusting red builds, which is a much more expensive problem than the flaky test itself.

And finally, it's a mistake to write tests that assert implementation details instead of behavior. A test that checks `notifier._tasks.length` (a private field) instead of `notifier.tasks.length` or the rendered UI ties the test to internal structure that has no business being tested directly. The moment you refactor the internal representation without changing the actual behavior, the test breaks for a reason that has nothing to do with a real bug.

---

## Running Everything Together

A <VPIcon icon="iconfont icon-gnu"/>`Makefile` or a CI script that runs all four in sequence, cheapest first, catches most problems before the expensive ones even start:

```sh
# Fails fast on logic bugs before spending time on anything else.
flutter test test/task_logic_test.dart

# Widget-level behavior across all three UI states.
flutter test test/task_screen_test.dart

# Visual regressions on the screens that matter.
flutter test test/task_screen_golden_test.dart

# The real thing, on a real device or emulator — last, because it's slowest.
flutter test integration_test/complete_task_test.dart
```

In CI, I run the first three on every pull request. They're fast enough that there's no excuse not to. I run the integration suite on a merge to main or a nightly schedule, since it needs a real device or emulator and takes long enough that blocking every PR on it slows the team down for a category of bug that a good widget-test suite already catches most of the time.

---

## End-to-End: All Four Layers on One CI Pipeline

Here's how I actually wire this into GitHub Actions on a real project. Fast checks are first and gated so a failure at any stage stops the pipeline before wasting time on the next one:

```yaml :collapsed-lines title=".github/workflows/test.yml"
name: Test

on: [pull_request, push]

jobs:
  unit-and-widget:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      # Unit and widget tests together — both fast, both run on
      # every PR without a second thought about cost.
      - run: flutter test test/task_logic_test.dart test/task_screen_test.dart

  golden:
    runs-on: ubuntu-latest
    needs: unit-and-widget
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter test test/task_screen_golden_test.dart
      # Upload diffs so a reviewer can see exactly what changed
      # without pulling the branch locally — this is what keeps
      # golden failures from becoming a rubber-stamped --update-goldens.
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: golden-diffs
          path: test/failures/

  integration:
    runs-on: macos-latest # needed for iOS simulator; use ubuntu + Android emulator otherwise
    needs: golden
    if: github.ref == 'refs/heads/main' # only on merges to main, not every PR
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter test integration_test/complete_task_test.dart -d "iPhone 15"
```

The `needs:` chain and the `if:` condition on the integration job are doing real work here: they're what stops the slowest, most expensive check from running on every single push, while still guaranteeing it runs before anything reaches <VPIcon icon="fas fa-code-branch"/>`main`.

---

## Final Thoughts

I used to think of "testing" as a single line item, something you either did or didn't do, a percentage on a dashboard. It isn't. Unit tests protect the logic. Widget tests protect the states. Golden tests protect the pixels. Integration tests protect the promise that all of it actually works together on a real device.

None of these are hard to write once you've set them up once on a real feature, which is why I built this article around one feature all the way through instead of four disconnected snippets. The task-completion bug that started this article (a task marked done in the wrong list) would have been caught by a single unit test on `markDone`, written before I ever touched the widget layer.

I didn't write that test the first time. I write it now, and its siblings, on every feature that matters. That's really the whole lesson: not that testing is complicated, but that each of the four kinds is answering a question the other three can't.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Test Flutter Apps: Unit, Widget, Golden, and Integration Tests Explained",
  "desc": "The first time I was asked ”what's your test coverage?” in a technical interview, I didn't have a good answer. I had shipped a couple of real Flutter apps by then. They worked and users were using the",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-flutter-apps-unit-widget-golden-and-integration-tests-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
