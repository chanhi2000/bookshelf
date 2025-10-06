---
lang: en-US
title: "How to Store Data Locally with Isar in Flutter"
description: "Article(s) > How to Store Data Locally with Isar in Flutter"
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
      content: "Article(s) > How to Store Data Locally with Isar in Flutter"
    - property: og:description
      content: "How to Store Data Locally with Isar in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/store-data-locally-with-isar-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-09-19
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758287132737/7886bedc-374f-401d-b59c-04c59590e81f.png
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
  name="How to Store Data Locally with Isar in Flutter"
  desc="When building Flutter applications, managing local data efficiently is critical. You want a database that is lightweight, fast, and easy to integrate, especially if your app will work offline. Isar is one such database. It is a high-performance, easy..."
  url="https://freecodecamp.org/news/store-data-locally-with-isar-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758287132737/7886bedc-374f-401d-b59c-04c59590e81f.png"/>

When building Flutter applications, managing local data efficiently is critical. You want a database that is lightweight, fast, and easy to integrate, especially if your app will work offline. Isar is one such database. It is a high-performance, easy-to-use NoSQL embedded database tailored for Flutter. With features like reactive queries, indexes, relationships, migrations, and transactions, Isar makes local data persistence both powerful and developer-friendly.

In this article, you’lll learn how to integrate Isar into a Flutter project, set up a data model, and perform the full range of CRUD (Create, Read, Update, Delete) operations. To make this practical, you’ll build a simple to-do app that allows users to create, view, update, and delete tasks.

::: note Prerequisites

Before starting, ensure you have the following:

**1. Flutter SDK** installed (version 3.0 or above recommended).  

Check your version with:

```sh
flutter --version
```

**2. Dart knowledge**: Familiarity with Dart syntax, classes, and async programming.
**3. Flutter basics**: You should know how to set up a Flutter project, build widgets, and use `FutureBuilder` or `setState` for state management.
**4. Code editor**: VS Code or Android Studio is recommended.

:::

If these are in place, we are ready to begin.

::: info What We Are Building

We will create a Task Manager App that lets users:

- Add new tasks.
- View all tasks in a list.
- Update existing tasks.
- Delete tasks.

By the end, you will have a fully functioning CRUD app built with Flutter and Isar.

:::

---

## How to Set Up Isar in a Flutter Project

### Step 1: Add dependencies

Open your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file and add the following:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  isar: ^3.1.0
  isar_flutter_libs: ^3.1.0

dev_dependencies:
  isar_generator: ^3.1.0
  build_runner: any
```

- `isar`: The core Isar package.
- `isar_flutter_libs`: Required for Flutter integration.
- `isar_generator`: Used to generate code for your models.
- `build_runner`: Runs the code generator.

Run:

```sh
flutter pub get
```

### Step 2: Create and initialize Isar

Create a file named <VPIcon icon="fa-brands fa-dart-lang"/>`isar_setup.dart`. This will handle the opening of the Isar database.

```dart title="isar_setup.dart"
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';
import 'task.dart'; // we will create this model soon

late final Isar isar;

Future<void> initializeIsar() async {
  final dir = await getApplicationDocumentsDirectory();
  isar = await Isar.open(
    [TaskSchema],
    directory: dir.path,
  );
}
```

::: info Explanation

- `getApplicationDocumentsDirectory()` provides a storage location for the database file.
- `Isar.open()` initializes the database and registers our `Task` schema.
- `late final Isar isar;` ensures we can access the database instance globally after initialization.

:::

---

## How to Create the Task Model

Now let’s define our data model for tasks. Create a file named <VPIcon icon="fa-brands fa-dart-lang"/>`task.dart`.

```dart title="task.dart"
import 'package:isar/isar.dart';

part 'task.g.dart';

@Collection()
class Task {
  Id id = Isar.autoIncrement; // auto-incrementing primary key

  late String name;

  late DateTime createdAt;

  Task(this.name) : createdAt = DateTime.now();
}
```

::: info Explanation

- `@Collection()` tells Isar this class represents a database collection.
- `Id id = Isar.autoIncrement;` creates a unique identifier automatically.
- `late String name;` stores the task name.
- `late DateTime createdAt;` stores the creation timestamp.
- `part 'task.g.dart';` links to the generated code, which will be created after running the code generator.

:::

Generate the code with:

```sh
flutter pub run build_runner build
```

This generates <VPIcon icon="fa-brands fa-dart-lang"/>`task.g.dart`, which contains the necessary schema code.

---

## How to Build the Repository for CRUD Operations

Create a new file called <VPIcon icon="fa-brands fa-dart-lang"/>`task_repository.dart`. This will house the methods for interacting with the database.

```dart title="task_repository.dart"
import 'package:isar/isar.dart';
import 'task.dart';
import 'isar_setup.dart';

class TaskRepository {
  Future<void> addTask(String name) async {
    final task = Task(name);
    await isar.writeTxn(() async {
      await isar.tasks.put(task);
    });
  }

  Future<List<Task>> getAllTasks() async {
    return await isar.tasks.where().findAll();
  }

  Future<void> updateTask(Task task) async {
    await isar.writeTxn(() async {
      await isar.tasks.put(task);
    });
  }

  Future<void> deleteTask(Task task) async {
    await isar.writeTxn(() async {
      await isar.tasks.delete(task.id);
    });
  }
}
```

::: info Explanation

- `addTask`: Creates a new task and saves it.
- `getAllTasks`: Reads all tasks from the database.
- `updateTask`: Updates an existing task by calling `.put()` again.
- `deleteTask`: Removes a task by its `id`.
- `isar.writeTxn`: Ensures operations run inside a transaction for safety and consistency.

:::

---

## How to Integrate CRUD into the Flutter UI

Now, let’s connect everything inside <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`.

```dart :collapsed-lines title="main.dart"
import 'package:flutter/material.dart';
import 'isar_setup.dart';
import 'task_repository.dart';
import 'task.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeIsar(); // initialize Isar before runApp
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
  final TaskRepository _taskRepository = TaskRepository();
  late Future<List<Task>> _tasksFuture;

  @override
  void initState() {
    super.initState();
    _tasksFuture = _taskRepository.getAllTasks();
  }

  Future<void> _addTask() async {
    await _taskRepository.addTask('New Task');
    setState(() {
      _tasksFuture = _taskRepository.getAllTasks();
    });
  }

  Future<void> _deleteTask(Task task) async {
    await _taskRepository.deleteTask(task);
    setState(() {
      _tasksFuture = _taskRepository.getAllTasks();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Isar CRUD Example')),
      body: FutureBuilder<List<Task>>(
        future: _tasksFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final tasks = snapshot.data ?? [];
            if (tasks.isEmpty) {
              return Center(child: Text('No tasks yet.'));
            }
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
}
```

::: info Explanation

- `initializeIsar()`: Ensures the database is ready before the app runs.
- `_tasksFuture`: Holds a future of the list of tasks.
- `_addTask`: Adds a new task and refreshes the list.
- `_deleteTask`: Deletes a task and refreshes the list.
- `FutureBuilder`: Automatically rebuilds the UI when the future completes.
- `ListView.builder`: Displays all tasks dynamically.

:::

This gives you a simple yet complete CRUD app using Isar.

---

## Beyond CRUD: Advanced Features of Isar

Once you are comfortable with CRUD, Isar provides advanced tools to optimize and extend your application:

### 1. Reactive Queries

Instead of using `FutureBuilder`, you can listen for changes directly.

```dart
final stream = isar.tasks.where().watch(fireImmediately: true);
```

### 2. Indexes

Improve query performance by indexing fields.

```dart
@Collection()
class Task {
  Id id = Isar.autoIncrement;
    
  @Index()
  late String name;
}
```

### 3. Relations

Link one collection to another (for example, `Project` with many `Tasks`).

### 4. Custom Queries

Perform complex filtering, sorting, and pagination.

### 5. Migrations

Safely evolve your schema as the app grows.

### 6. Batch Operations

Insert or update many records in one transaction.

---

## Conclusion

We built a simple Flutter to-do app with Isar that supports creating, reading, updating, and deleting tasks. Along the way, we learned how to:

1. Add Isar dependencies.
2. Define a model with annotations.
3. Generate schema code.
4. Implement CRUD operations in a repository.
5. Connect Isar to the Flutter UI.

With its performance, developer-friendly API, and advanced features, Isar is an excellent choice for local persistence in Flutter applications.

::: info For further learning, consult the official docs:

<SiteInfo
  name="isar | Dart package"
  desc="Extremely fast, easy to use, and fully async NoSQL database for Flutter."
  url="https://pub.dev/packages/isar/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-jei44tt8/img/pub-dev-icon-cover-image.png"/>

```component VPCard
{
  "title": "Home | Isar Database",
  "desc": "Super Fast Cross-Platform Database for Flutter",
  "link": "https://isar.dev/",
  "logo": "https://isar.dev/icon-512x512.png",
  "background": "rgba(101,170,253,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Store Data Locally with Isar in Flutter",
  "desc": "When building Flutter applications, managing local data efficiently is critical. You want a database that is lightweight, fast, and easy to integrate, especially if your app will work offline. Isar is one such database. It is a high-performance, easy...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/store-data-locally-with-isar-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
