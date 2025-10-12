---
lang: en-US
title: "How to Use ObjectBox in Flutter"
description: "Article(s) > How to Use ObjectBox in Flutter"
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
      content: "Article(s) > How to Use ObjectBox in Flutter"
    - property: og:description
      content: "How to Use ObjectBox in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-objectbox-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-09-17
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758042509445/329dd5bf-f143-4a35-9828-8441d501afed.png
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
  name="How to Use ObjectBox in Flutter"
  desc="ObjectBox is a high-performance, lightweight, NoSQL embedded database built specifically for Flutter and Dart applications. It provides reactive APIs, indexes, relationships, and migrations, all designed to make local data management smooth and effic..."
  url="https://freecodecamp.org/news/how-to-use-objectbox-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758042509445/329dd5bf-f143-4a35-9828-8441d501afed.png"/>

ObjectBox is a high-performance, lightweight, NoSQL embedded database built specifically for Flutter and Dart applications. It provides reactive APIs, indexes, relationships, and migrations, all designed to make local data management smooth and efficient.

In this guide, we'll integrate ObjectBox into a Flutter project and implement fundamental CRUD operations (Create, Read, Update, Delete), while explaining each step in detail.

::: note Prerequisites

Before getting started with ObjectBox in Flutter, you need a proper development environment. Make sure you have Flutter 3.x or above installed, along with the Dart SDK that comes bundled with it, and verify the installation with `flutter --version`.

You’ll also need an IDE such as VS Code, Android Studio, or IntelliJ with the Flutter and Dart plugins. Testing can be done on an emulator or simulator, but a real device is recommended since some ObjectBox features perform better there. If you plan to store the database in platform-specific directories, ensure your app has the necessary file storage permissions, although standard app directories typically handle this automatically.

In terms of Flutter and Dart knowledge, you should already be comfortable with Flutter basics such as `StatelessWidget`, `StatefulWidget`, `setState()`, and common widgets like `ListView.builder`, `Column`, `Row`, `Scaffold`, and `AppBar`. Familiarity with UI components including `FloatingActionButton`, `TextField`, `Button`, `IconButton`, and `ExpansionTile` is also important. On the Dart side, you should understand classes, constructors, fields, named parameters, `late` variables, and asynchronous programming with `Future` and `Stream`. Knowing how to use `FutureBuilder` and `StreamBuilder` in Flutter will make integration much smoother.

Finally, you’ll need to grasp the core concepts of ObjectBox. This includes entities (Dart classes annotated with `@Entity()` that map to database tables), primary keys (usually an integer `id`), and boxes (`Box<T>`, which represent tables and handle CRUD operations like `put()`, `getAll()`, and `remove()`). Understanding relationships through `ToOne` and `ToMany`, working with reactive queries using `query().watch()`, and running atomic operations with `store.runInTransaction()` will be essential. Indexes with `@Index()` can also help optimize performance when querying frequently accessed fields. While optional, it’s beneficial to have a solid grasp of streams in Flutter, async/await in Dart, and familiarity with the `path_provider` package for managing database storage locations.

:::

---

## How to Set Up a Flutter Project with ObjectBox

First, ensure you have a Flutter project ready. You can create a new one with:

```sh
flutter create objectbox_demo
```

Once your project is ready, open `pubspec.yaml` and add the ObjectBox dependency:

```yaml
dependencies:
  objectbox: ^4.3.1
```

`objectbox` is the core database package. The version number `^2.4.0` ensures you get a compatible release with Flutter.

Fetch the dependencies by running:

```sh
flutter pub get
```

This downloads ObjectBox and makes it available for your project.

---

## How to Initialize ObjectBox

To use ObjectBox, you need to create a store—the main access point for your database.

Create a new Dart file, for example, <VPIcon icon="fa-brands fa-dart-lang"/>`objectbox_setup.dart`:

```dart title="objectbox_setup.dart"
import 'package:objectbox/objectbox.dart';

late final Store store;

Future<void> initObjectBox() async {
  store = await openStore(); // Initializes the ObjectBox database
}
```

::: info Explanation

- `Store` is the core class that represents the database.
- `openStore()` opens the database and prepares it for CRUD operations.
- `late final Store store;` ensures the store is initialized once and can be accessed globally.

:::

::: tip

You can also customize the directory or enable migrations in `openStore()` if your schema evolves.

:::

---

## How to Create a Data Model

Data in ObjectBox is represented as entities. Each entity corresponds to a Dart class annotated with `@Entity()`. Let's create a `Task` entity:

```dart
import 'package:objectbox/objectbox.dart';

@Entity()
class Task {
  int? id; // Auto-generated primary key

  late String name;       // Task name
  late DateTime createdAt; // Timestamp when task is created

  Task(this.name) : createdAt = DateTime.now(); // Constructor
}
```

::: info Explanation

- `@Entity()` marks the class as an ObjectBox entity.
- `id` is the primary key. ObjectBox auto-generates this if null.
- `late` fields must be initialized before use.
- `createdAt` stores the timestamp automatically when a `Task` is created.

:::

---

## How to Implement CRUD Operations

For clean code, we encapsulate database operations in a repository class:

```dart :collapsed-lines
import 'package:objectbox/objectbox.dart';
import 'task.dart'; // Import your entity

class TaskRepository {
  final Store _store;
  late final Box<Task> _tasks;

  TaskRepository(this._store) : _tasks = _store.box<Task>();

  // CREATE
  Future<void> addTask(String name) async {
    await _store.runInTransaction(() async {
      await _tasks.put(Task(name));
    });
  }

  // READ
  Future<List<Task>> getAllTasks() async {
    return _tasks.getAll();
  }

  // UPDATE
  Future<void> updateTask(Task task) async {
    await _store.runInTransaction(() async {
      await _tasks.put(task); // Replaces existing record if id exists
    });
  }

  // DELETE
  Future<void> deleteTask(Task task) async {
    await _store.runInTransaction(() async {
      await _tasks.remove(task.id!);
    });
  }
}
```

::: info Detailed Breakdown

- `Box<T>`: A container for all objects of type `T`. Think of it as a table in a relational database.
- `put()`: Inserts a new object or updates an existing one if `id` exists.
- `getAll()`: Fetches all objects in the box.
- `remove(id)`: Deletes an object by its id.
- `runInTransaction()`: Ensures all operations inside the block are atomic—either all succeed or all fail.

:::

---

## How to Integrate CRUD Operations with Flutter UI

Now, let’s connect ObjectBox to a Flutter UI for interactive CRUD operations:

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'objectbox_setup.dart';
import 'task_repository.dart';
import 'task.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initObjectBox(); // Initialize ObjectBox
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TaskListScreen(),
    );
  }
}

class TaskListScreen extends StatefulWidget {
  @override
  _TaskListScreenState createState() => _TaskListScreenState();
}

class _TaskListScreenState extends State<TaskListScreen> {
  final TaskRepository _taskRepository = TaskRepository(store);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('ObjectBox CRUD Example')),
      body: FutureBuilder<List<Task>>(
        future: _taskRepository.getAllTasks(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final tasks = snapshot.data ?? [];
            return ListView.builder(
              itemCount: tasks.length,
              itemBuilder: (context, index) {
                final task = tasks[index];
                return ListTile(
                  title: Text(task.name),
                  subtitle: Text('Created at: ${task.createdAt}'),
                  trailing: IconButton(
                    icon: Icon(Icons.delete),
                    onPressed: () => _deleteTask(task),
                  ),
                );
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _addTask,
        child: Icon(Icons.add),
      ),
    );
  }

  Future<void> _addTask() async {
    await _taskRepository.addTask('New Task');
    setState(() {}); // Refresh UI after adding
  }

  Future<void> _deleteTask(Task task) async {
    await _taskRepository.deleteTask(task);
    setState(() {}); // Refresh UI after deletion
  }
}
```

::: info Explanation

- `FutureBuilder`: Handles asynchronous fetching of tasks from ObjectBox.
- `ListView.builder`: Efficiently renders a list of tasks.
- `_addTask` & `_deleteTask`: Call repository methods and refresh the UI with `setState()`.

:::

---

## Advanced ObjectBox Features

### Reactive Queries

ObjectBox can automatically update the UI whenever the database changes:

```dart
final reactiveTasks = _tasks.query().watch().listen((query) {
  // This block executes whenever data changes
});
```

- `watch()`: Returns a stream that emits updates in real-time.
- Useful for live updates in Flutter apps without manually refreshing.

### Indexing

Indexing speeds up query performance:

```dart
@Entity()
class Task {
  @Id(assignable: true)
  int? id;

  @Index()
  late String name;

  late DateTime createdAt;
}
```

- `@Index()` on a field creates an index for faster search queries.
- Essential for large datasets.

### Relationships

ObjectBox supports relations, enabling complex models:

```dart
@Entity()
class Project {
  int? id;
  late String name;

  @Backlink(to: 'project')
  final tasks = ToMany<Task>();
}
```

- `ToMany<Task>`: A project can have many tasks.
- `@Backlink`: Connects `Task` to `Project` automatically.

### Custom Queries

Perform complex queries with filters, sorting, and pagination:

```dart
final highPriorityTasks = _tasks.query()
    .greater(Task_.priority, 3)
    .order(Task_.createdAt)
    .build()
    .find();
```

- `greater()`, `less()`, `equal()`: Filter records.
- `order()`: Sort by a property.

### Migrations

ObjectBox handles schema changes:

```dart
final store = await openStore(
  directory: getApplicationDocumentsDirectory().path,
  model: getObjectBoxModel(),
  onVersionChanged: (store, oldVersion, newVersion) {
    if (oldVersion == 1) {
      // Migrate schema from version 1 to 2
    }
  },
);
```

- `onVersionChanged`: Execute migration logic for schema updates.

### Transactions & Batch Operations

Execute multiple operations atomically:

```dart
await _store.runInTransaction(() async {
  await _tasks.putMany([
    Task('Task 1'),
    Task('Task 2'),
    Task('Task 3'),
  ]);
});
```

- `putMany()`: Insert multiple objects efficiently.
- Ensures either all succeed or none are saved.

---

## Conclusion

ObjectBox provides a fast, reactive, and easy-to-use local database for Flutter. Beyond CRUD operations, it supports indexing, relationships, reactive queries, migrations, and batch transactions. This makes it perfect for Flutter apps that require robust local storage and high performance.

For official documentation and further learning:

<SiteInfo
  name="objectbox | Dart package"
  desc="Flutter database for super-fast NoSQL ACID compliant object persistence."
  url="https://pub.dev/packages/objectbox/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-056rsjec/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="ObjectBox Docs | ObjectBox Docs"
  desc="Explore the on-device database and SQLite alternative for object and vector data. This is the official ObjectBox documentation for Java/Kotlin, Dart/Flutter, and Python."
  url="https://docs.objectbox.io//"
  logo="https://docs.objectbox.io/~gitbook/image?url=https%3A%2F%2F4174656640-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LETufmyus5LFkviJjr4%252Favatar.png%3Fgeneration%3D1528453316288221%26alt%3Dmedia&width=48&height=48&sign=96b28d45&sv=2"
  preview="https://docs.objectbox.io/~gitbook/ogimage/-LETufmzleoQUwcwW_OL"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use ObjectBox in Flutter",
  "desc": "ObjectBox is a high-performance, lightweight, NoSQL embedded database built specifically for Flutter and Dart applications. It provides reactive APIs, indexes, relationships, and migrations, all designed to make local data management smooth and effic...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-objectbox-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
