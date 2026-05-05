---
lang: en-US
title: "Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool"
description: "Article(s) > Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - DevOps
  - Docker
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - devops
  - docker
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool"
    - property: og:description
      content: "Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-command-line-interface-cli-development-with-dart-from-zero-to-a-fully-published-developer-tool/
prev: /programming/dart/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a4c564c2-f5f3-4824-b4e7-d103b5fc488e.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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
  name="Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool"
  desc="Most developers spend a significant portion of their day in the terminal. They run flutter build, push with git, manage packages with dart pub, and orchestrate pipelines from the command line. Every o"
  url="https://freecodecamp.org/news/learn-command-line-interface-cli-development-with-dart-from-zero-to-a-fully-published-developer-tool"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a4c564c2-f5f3-4824-b4e7-d103b5fc488e.png"/>

Most developers spend a significant portion of their day in the terminal. They run `flutter build`, push with `git`, manage packages with `dart pub`, and orchestrate pipelines from the command line. Every one of those tools is a CLI, or command line interface: a program that lives in the terminal and responds to text commands.

Yet most developers have never built one.

That's a missed opportunity. CLI tools are one of the most practical things a developer can ship. They automate repetitive workflows, standardise processes across teams, and, when published, become tangible artifacts that the developer community can discover, install, and use.

In this handbook, you'll go from zero to building a fully distributed Dart CLI tool. We'll start with the fundamentals – how CLIs work, how Dart receives and processes terminal input, and the core syntax you need to know. Then we'll build three progressively complex CLIs, starting with the basics and finishing with a real-world API request runner. Finally, we will cover every distribution path available, from `pub.dev` to compiled binaries, Homebrew taps, Docker, and local team activation.

By the end of the guide, you'll understand both how to build a CLI tool in Dart as well as how to ship it so other developers can actually use it.

::: note Prerequisites

Before starting, you should have:

- Dart SDK installed (`dart --version` should work in your terminal)
- Basic familiarity with Dart syntax
- Comfort with the terminal and running commands
- A pub.dev account (for the publishing section)
- A GitHub account (for the binary distribution section)

:::

---

## What is a CLI and Why Should You Build One?

A CLI (or **Command Line Interface**) is a program you interact with entirely through text commands in a terminal, rather than through buttons and screens in a graphical interface.

Many of the tools you likely already rely on as a developer are CLI tools:

```sh
flutter build apk
git commit -m "fix: auth flow"
dart pub get
npm install
```

Flutter, Git, Dart, npm – all CLIs. You are already a CLI user every single day. This article is about becoming a CLI builder.

There are three strong reasons to build CLI tools as a developer:

1. **Automating repetitive work:** Anything you type more than twice a week is a candidate for automation. Generating boilerplate folder structures, running sequences of commands, scaffolding files, checking environments before a build a CLI turns a seven-step manual process into a single command.
2. **Standardising team workflows:** Instead of a README that says "run these commands in this order," you ship one command that does all of it – consistently, every time, with no room for human error or a missed step.
3. **Building and publishing tooling.** A published Dart CLI package is a tangible artifact. It shows up on pub.dev, gets installed and used by other developers, and communicates real engineering depth in a way that a portfolio or resume cannot.

---

## CLI Syntax Anatomy

Before writing a single line of code, it helps to understand the structure of a CLI command. Every command follows a consistent pattern:

```sh
tool [subcommand] [arguments] [options/flags]
```

Breaking down a real example:

```sh
flutter build apk --release --obfuscate
│       │     │   │
tool    sub   arg  flags
```

- **Tool** — the program itself (`flutter`, `dart`, `git`)
- **Subcommand** — the action being performed (`build`, `run`, `pub`)
- **Arguments** — what the action operates on (`apk`, `main.dart`, a filename)
- **Flags and Options** — modifiers that change behaviour

There are two types of options:

```plaintext
--release              # Boolean flag — either present or absent

--output=build/app     # Key-value option — name and a value
-v                     # Short flag — single hyphen, single character
```

This is the anatomy your CLIs will follow. Understanding it before writing any code means you will design your commands intentionally rather than stumbling into structure by accident.

---

## How Dart Receives Terminal Input

In Dart, everything the user types after your tool name is passed into your program through the `main` function:

```dart
void main(List<String> args) {
  print(args);
}
```

Run it:

```sh
dart run bin/mytool.dart hello world --name=Seyi
# [hello, world, --name=Seyi]
```

That `List<String> args` is just a list of strings. Each word or flag the user typed becomes an element in that list. Everything else you build on top of a CLI subcommands, flags, validation — is ultimately just processing this list.


---

## Table of Contents

- [Core CLI Concepts in Dart](#heading-core-cli-concepts-in-dart)
- [CLI 1 — Hello CLI: The Fundamentals](#heading-cli-1-hello-cli-the-fundamentals)
- [CLI 2 — dart_todo: A Terminal Task Manager](#heading-cli-2-darttodo-a-terminal-task-manager)
- [CLI 3 — dart_http: A Lightweight API Request Runner](#heading-cli-3-darthttp-a-lightweight-api-request-runner)
- [Adding Color and Polish to Your CLI](#heading-adding-color-and-polish-to-your-cli)
- [Testing Your CLI Tool](#heading-testing-your-cli-tool)
- [Deploying and Distributing Your CLI](#heading-deploying-and-distributing-your-cli)
- [Choosing the Right Distribution Mode](#heading-choosing-the-right-distribution-mode)

---

## Core CLI Concepts in Dart

Before building anything, there's a set of foundational concepts that every CLI developer needs to understand. These are the building blocks that everything else sits on top of.

### stdout, stderr, and stdin

Most developers use `print()` for all output when they start building CLIs. That works for learning but it's incorrect in production.

There are two separate output streams in a terminal program:

- `stdout`: regular output, meant for the user
- `stderr`: error output, meant for diagnostic messages and failures

```dart
import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Error: no arguments provided');
    exit(1);
  }

  stdout.writeln('Processing: ${args[0]}');
}
```

Keeping these separate matters because users can redirect stdout to a file without errors polluting it:

```sh
dart run bin/tool.dart > output.txt
# Errors still appear in the terminal
# Normal output goes cleanly to the file
```

Tools like `git`, `flutter`, and `curl` all do this correctly. Your CLI should too.

`stdin` is the third stream — reading input from the user interactively at runtime:

```dart
import 'dart:io';

void main() {
  stdout.write('Enter your name: ');
  final name = stdin.readLineSync();

  if (name == null || name.trim().isEmpty) {
    stderr.writeln('Error: no name provided');
    exit(1);
  }

  stdout.writeln('Hello, $name!');
}
```

`stdout.write` (without `ln`) keeps the cursor on the same line so the user types right after the prompt. `stdin.readLineSync()` blocks until the user presses Enter and returns the typed string, or `null` if the stream closes unexpectedly. Always handle the null case.

### Exit Codes

Every program returns an exit code when it finishes. This is how the shell – and any script or CI system calling your tool – knows whether it succeeded or failed.

```dart
import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Error: please provide an argument');
    exit(1); // failure
  }

  stdout.writeln('Done');
  exit(0); // success — also the default if you don't call exit()
}
```

The conventions are:

- `0`: success
- `1`: general failure
- `2`: incorrect usage (wrong arguments, missing flags)

Exit codes are critical when your CLI is called inside shell scripts or GitHub Actions workflows. A non-zero exit code stops a pipeline immediately. That's exactly the behaviour you want from a quality gate or a validation step.

### Environment Variables

Your CLI can read environment variables set in the user's shell:

```dart
import 'dart:io';

void main() {
  final token = Platform.environment['API_TOKEN'];

  if (token == null) {
    stderr.writeln('Error: API_TOKEN environment variable is not set');
    exit(1);
  }

  stdout.writeln('Token found — proceeding...');
}
```

Set it in the terminal and run:

```sh
export API_TOKEN=mytoken123
dart run bin/tool.dart
# Token found — proceeding...
```

This pattern is essential for CLI tools that interact with APIs, cloud services, or CI environments where credentials should never be hardcoded.

### File and Directory Operations

Many CLI tools read from or write to the file system. Dart's `dart:io` library covers everything you need:

```dart
import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: tool <filename>');
    exit(2);
  }

  final file = File(args[0]);

  if (!file.existsSync()) {
    stderr.writeln('Error: "${args[0]}" not found');
    exit(1);
  }

  final contents = file.readAsStringSync();
  stdout.writeln(contents);

  final output = File('output.txt');
  output.writeAsStringSync('Processed:\n$contents');
  stdout.writeln('Written to output.txt');
}
```

Working with directories:

```dart
import 'dart:io';

void main() {
  // Where the command was run from
  final cwd = Directory.current.path;
  stdout.writeln('Working directory: $cwd');

  // Create a directory relative to current location
  final dir = Directory('$cwd/generated');

  if (!dir.existsSync()) {
    dir.createSync(recursive: true);
    stdout.writeln('Created: ${dir.path}');
  } else {
    stdout.writeln('Already exists: ${dir.path}');
  }
}
```

The `recursive: true` flag on `createSync` means it creates all intermediate directories — equivalent to `mkdir -p` in bash.

### Running External Processes

One of the most powerful things a CLI can do is call other programs. Your Dart CLI can run `git`, `flutter`, `dart`, or any shell command programmatically:

```dart
import 'dart:io';

void main() async {
  // Run a command and wait for it to finish
  final result = await Process.run('dart', ['pub', 'get']);

  stdout.write(result.stdout);

  if (result.exitCode != 0) {
    stderr.write(result.stderr);
    exit(result.exitCode);
  }

  stdout.writeln('Dependencies installed successfully');
}
```

For long-running commands where you want output to stream live as it happens:

```dart
import 'dart:io';

void main() async {
  final process = await Process.start('flutter', ['build', 'apk']);

  // Pipe output directly to the terminal in real time
  process.stdout.pipe(stdout);
  process.stderr.pipe(stderr);

  final exitCode = await process.exitCode;
  exit(exitCode);
}
```

`Process.run` — waits for completion, returns all output at once. Use for short commands.

`Process.start` — streams output live as it arrives. Use for long-running commands where the user needs to see progress.

### Platform Detection

Sometimes your CLI needs to behave differently depending on the operating system it is running on:

```dart
import 'dart:io';

void main() {
  if (Platform.isWindows) {
    stdout.writeln('Running on Windows');
  } else if (Platform.isMacOS) {
    stdout.writeln('Running on macOS');
  } else if (Platform.isLinux) {
    stdout.writeln('Running on Linux');
  }

  // Useful for path handling across operating systems
  stdout.writeln(Platform.pathSeparator); // \ on Windows, / elsewhere
  stdout.writeln(Platform.operatingSystem); // 'macos', 'linux', 'windows'
}
```

This matters when your CLI creates files, resolves paths, or calls shell commands that differ between operating systems.

### Async in CLI

Dart CLIs support `async/await` natively. Any `main` function can be made async:

```dart
import 'dart:io';

void main() async {
  stdout.writeln('Starting...');

  await Future.delayed(const Duration(seconds: 1)); // simulating async work

  stdout.writeln('Done');
}
```

Any operation involving file I/O, HTTP requests, or spawning processes will be asynchronous. Get comfortable with async `main` functions early — you'll use them constantly.

---

## Setting Up Your Dart CLI Project

Create a new Dart console project:

```sh
dart create -t console my_cli_tool
cd my_cli_tool
```

This generates a clean structure:

```sh title="file structure"
my_cli_tool/
  bin/
    my_cli_tool.dart    # entry point
  lib/                  # shared library code
  test/                 # tests
  pubspec.yaml
  README.md
```

The <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`bin/` directory is where your executable entry point lives. The <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`lib/` directory is where you put everything else — commands, utilities, models — that <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`bin/` imports and uses.

Open <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`. You'll need to add an `executables` block before publishing:

```yaml title="pubspec.yaml"
name: my_cli_tool
description: A sample CLI tool built with Dart
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

executables:
  my_cli_tool: my_cli_tool  # executable name: bin file name

dependencies:
  args: ^2.4.2

dev_dependencies:
  lints: ^3.0.0
  test: ^1.24.0
```

The `executables` block is what makes `dart pub global activate my_cli_tool` work. It tells Dart which script in <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`bin/` to expose as a runnable command after installation.

---

## CLI 1 — Hello CLI: The Fundamentals

This first CLI uses pure Dart — no packages. The goal is to get comfortable with args, subcommands, input validation, and exit codes before introducing any external dependencies.

Replace the contents of <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`bin/`<VPIcon icon="fa-brands fa-dart-lang"/>`my_cli_tool.dart`:

```dart :collapsed-lines title="bin/my_cli_tool.dart"
import 'dart:io';

void main(List<String> args) {
  if (args.isEmpty) {
    printHelp();
    exit(0);
  }

  final command = args[0];

  switch (command) {
    case 'greet':
      handleGreet(args.sublist(1));
    case 'time':
      handleTime();
    case 'echo':
      handleEcho(args.sublist(1));
    case 'help':
      printHelp();
    default:
      stderr.writeln('Unknown command: "$command"');
      stderr.writeln('Run "mytool help" to see available commands.');
      exit(1);
  }
}

void handleGreet(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: mytool greet <name>');
    exit(2);
  }

  final name = args[0];
  stdout.writeln('Hello, $name! Welcome to your first Dart CLI.');
}

void handleTime() {
  final now = DateTime.now();
  stdout.writeln(
    'Current time: ${now.hour.toString().padLeft(2, '0')}:'
    '${now.minute.toString().padLeft(2, '0')}:'
    '${now.second.toString().padLeft(2, '0')}',
  );
}

void handleEcho(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: mytool echo <message>');
    exit(2);
  }

  stdout.writeln(args.join(' '));
}

void printHelp() {
  stdout.writeln('''
mytool — a simple Dart CLI

Usage:
  mytool <command> [arguments]

Commands:
  greet <name>      Greet someone by name
  time              Show the current time
  echo <message>    Echo a message back to the terminal
  help              Show this help message

Examples:
  mytool greet Seyi
  mytool echo "Hello from the terminal"
  mytool time
  ''');
}
```

Run it:

```sh
dart run bin/my_cli_tool.dart help

dart run bin/my_cli_tool.dart greet Seyi
# Hello, Seyi! Welcome to your first Dart CLI.

dart run bin/my_cli_tool.dart time
# Current time: 14:32:10

dart run bin/my_cli_tool.dart echo "Dart CLIs are powerful"
# Dart CLIs are powerful

dart run bin/my_cli_tool.dart unknown
# Unknown command: "unknown"
# Run "mytool help" to see available commands.
```

Three things this CLI demonstrates that are worth internalising:

1. **Subcommands are just a switch on `args[0]`.** The pattern is simple and scalable — add a new `case` to add a new command.
2. **`args.sublist(1)` passes remaining args to the handler.** When `greet` receives `['greet', 'Seyi']`, it calls `handleGreet(['Seyi'])` — clean and isolated.
3. **Every error path has a message and a non-zero exit code.** The user always knows what went wrong and what to do next.

---

## CLI 2 — dart_todo: A Terminal Task Manager

This CLI introduces the `args` package, JSON file persistence, and structured terminal output. It's meaningfully more complex than CLI 1 and reflects real patterns you will use in production tools.

### Introducing the args Package

Manually parsing `List<String> args` works for simple cases, but breaks down quickly when you add flags like `--priority=high`, boolean options like `--done`, or commands with multiple optional arguments.

The `args` package handles all of that cleanly.

Add it to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  args: ^2.4.2
```

Run:

```sh
dart pub get
```

The core concept in `args` is the `ArgParser`. You define what your CLI accepts, and `args` handles parsing, validation, and generating help text automatically:

```dart
import 'package:args/args.dart';

void main(List<String> arguments) {
  final parser = ArgParser()
    ..addCommand('add')
    ..addCommand('list')
    ..addFlag('help', abbr: 'h', negatable: false);

  final results = parser.parse(arguments);

  if (results['help'] as bool) {
    print(parser.usage);
    return;
  }
}
```

For more complex CLIs with subcommands that each have their own flags, use `ArgParser` per command:

```dart
final parser = ArgParser();

final addCommand = ArgParser()
  ..addOption('priority', abbr: 'p', defaultsTo: 'normal');

parser.addCommand('add', addCommand);
```

### Building dart_todo

Create a fresh project:

```sh
dart create -t console dart_todo
cd dart_todo
```

Update <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
name: dart_todo
description: A terminal task manager built with Dart
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

executables:
  dart_todo: dart_todo

dependencies:
  args: ^2.4.2

dev_dependencies:
  lints: ^3.0.0
  test: ^1.24.0
```

Run `dart pub get`.

Create the folder structure:

```sh title="file structure"
dart_todo/
  bin/
    dart_todo.dart
  lib/
    models/
      task.dart
    storage/
      task_storage.dart
    commands/
      add_command.dart
      list_command.dart
      complete_command.dart
      delete_command.dart
      clear_command.dart
  pubspec.yaml
```

#### Step 1 — The Task Model (<VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`task.dart`)

```dart :collapsed-lines title="lib/models/task.dart"
class Task {
  final int id;
  final String title;
  final String priority;
  final bool isComplete;
  final DateTime createdAt;

  Task({
    required this.id,
    required this.title,
    required this.priority,
    this.isComplete = false,
    required this.createdAt,
  });

  Task copyWith({bool? isComplete}) {
    return Task(
      id: id,
      title: title,
      priority: priority,
      isComplete: isComplete ?? this.isComplete,
      createdAt: createdAt,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'title': title,
        'priority': priority,
        'isComplete': isComplete,
        'createdAt': createdAt.toIso8601String(),
      };

  factory Task.fromJson(Map<String, dynamic> json) => Task(
        id: json['id'] as int,
        title: json['title'] as String,
        priority: json['priority'] as String,
        isComplete: json['isComplete'] as bool,
        createdAt: DateTime.parse(json['createdAt'] as String),
      );
}
```

#### Step 2 — Storage (<VPIcon icon="fas fa-folder-open"/>`lib/storage/`<VPIcon icon="fa-brands fa-dart-lang"/>`task_storage.dart`)

This class handles reading and writing tasks to a local JSON file so they persist between CLI runs:

```dart title="lib/storage/task_storage.dart"
import 'dart:convert';
import 'dart:io';

import '../models/task.dart';

class TaskStorage {
  static final _file = File(
    '${Platform.environment['HOME'] ?? Directory.current.path}/.dart_todo.json',
  );

  static List<Task> loadAll() {
    if (!_file.existsSync()) return [];

    try {
      final content = _file.readAsStringSync();
      final List<dynamic> json = jsonDecode(content) as List<dynamic>;
      return json
          .map((e) => Task.fromJson(e as Map<String, dynamic>))
          .toList();
    } catch (_) {
      return [];
    }
  }

  static void saveAll(List<Task> tasks) {
    final json = jsonEncode(tasks.map((t) => t.toJson()).toList());
    _file.writeAsStringSync(json);
  }
}
```

Tasks are stored in a hidden JSON file in the user's home directory — a common pattern for CLI tools that need lightweight local persistence.

#### Step 3 — Commands

```dart title="lib/commands/add_command.dart"
import 'dart:io';

import '../models/task.dart';
import '../storage/task_storage.dart';

void runAdd(List<String> args, String priority) {
  if (args.isEmpty) {
    stderr.writeln('Usage: dart_todo add <title> [--priority=high|normal|low]');
    exit(2);
  }

  final title = args.join(' ');
  final tasks = TaskStorage.loadAll();

  final newTask = Task(
    id: tasks.isEmpty ? 1 : tasks.last.id + 1,
    title: title,
    priority: priority,
    createdAt: DateTime.now(),
  );

  tasks.add(newTask);
  TaskStorage.saveAll(tasks);

  stdout.writeln('Added task #\({newTask.id}: "\)title" [$priority]');
}
```

```dart title="lib/commands/list_command.dart"
import 'dart:io';

import '../storage/task_storage.dart';

void runList() {
  final tasks = TaskStorage.loadAll();

  if (tasks.isEmpty) {
    stdout.writeln('No tasks yet. Add one with: dart_todo add <title>');
    return;
  }

  stdout.writeln('');
  stdout.writeln('  ID   Status      Priority   Title');
  stdout.writeln('  ───  ──────────  ─────────  ────────────────────────');

  for (final task in tasks) {
    final status = task.isComplete ? 'done  ' : 'pending';
    final id = task.id.toString().padRight(4);
    final priority = task.priority.padRight(9);
    stdout.writeln('  \(id \)status  \(priority  \){task.title}');
  }

  stdout.writeln('');
}
```

```dart :collapsed-lines title="lib/commands/complete_command.dart"
import 'dart:io';

import '../storage/task_storage.dart';

void runComplete(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: dart_todo complete <id>');
    exit(2);
  }

  final id = int.tryParse(args[0]);
  if (id == null) {
    stderr.writeln('Error: "${args[0]}" is not a valid task ID');
    exit(1);
  }

  final tasks = TaskStorage.loadAll();
  final index = tasks.indexWhere((t) => t.id == id);

  if (index == -1) {
    stderr.writeln('Error: No task found with ID $id');
    exit(1);
  }

  if (tasks[index].isComplete) {
    stdout.writeln('Task #$id is already complete.');
    return;
  }

  tasks[index] = tasks[index].copyWith(isComplete: true);
  TaskStorage.saveAll(tasks);

  stdout.writeln('Task #\(id marked as complete: "\){tasks[index].title}"');
}
```

```dart title="lib/commands/delete_command.dart"
import 'dart:io';

import '../storage/task_storage.dart';

void runDelete(List<String> args) {
  if (args.isEmpty) {
    stderr.writeln('Usage: dart_todo delete <id>');
    exit(2);
  }

  final id = int.tryParse(args[0]);
  if (id == null) {
    stderr.writeln('Error: "${args[0]}" is not a valid task ID');
    exit(1);
  }

  final tasks = TaskStorage.loadAll();
  final index = tasks.indexWhere((t) => t.id == id);

  if (index == -1) {
    stderr.writeln('Error: No task found with ID $id');
    exit(1);
  }

  final title = tasks[index].title;
  tasks.removeAt(index);
  TaskStorage.saveAll(tasks);

  stdout.writeln('Deleted task #\(id: "\)title"');
}
```

```dart title="lib/commands/clear_command.dart"
import 'dart:io';

import '../storage/task_storage.dart';

void runClear() {
  stdout.write('Are you sure you want to delete all tasks? (y/N): ');
  final input = stdin.readLineSync()?.trim().toLowerCase();

  if (input != 'y') {
    stdout.writeln('Cancelled.');
    return;
  }

  TaskStorage.saveAll([]);
  stdout.writeln('All tasks cleared.');
}
```

#### Step 4 — Entry Point (<VPIcon icon="fas fa-folder-open"/>`bin/`<VPIcon icon="fa-brands fa-dart-lang"/>`dart_todo.dart`)

```dart :collapsed-lines title="bin/dart_todo.dart"
import 'dart:io';

import 'package:args/args.dart';

import '../lib/commands/add_command.dart';
import '../lib/commands/clear_command.dart';
import '../lib/commands/complete_command.dart';
import '../lib/commands/delete_command.dart';
import '../lib/commands/list_command.dart';

void main(List<String> arguments) {
  final parser = ArgParser();

  // Add subcommand parsers
  final addParser = ArgParser()
    ..addOption(
      'priority',
      abbr: 'p',
      defaultsTo: 'normal',
      allowed: ['high', 'normal', 'low'],
      help: 'Task priority level',
    );

  parser
    ..addCommand('add', addParser)
    ..addCommand('list')
    ..addCommand('complete')
    ..addCommand('delete')
    ..addCommand('clear')
    ..addFlag('help', abbr: 'h', negatable: false, help: 'Show help');

  ArgResults results;

  try {
    results = parser.parse(arguments);
  } catch (e) {
    stderr.writeln('Error: $e');
    stderr.writeln(parser.usage);
    exit(2);
  }

  if (results['help'] as bool || results.command == null) {
    printHelp(parser);
    exit(0);
  }

  final command = results.command!;

  switch (command.name) {
    case 'add':
      runAdd(command.rest, command['priority'] as String);
    case 'list':
      runList();
    case 'complete':
      runComplete(command.rest);
    case 'delete':
      runDelete(command.rest);
    case 'clear':
      runClear();
    default:
      stderr.writeln('Unknown command: "${command.name}"');
      exit(1);
  }
}

void printHelp(ArgParser parser) {
  stdout.writeln('''
dart_todo — a terminal task manager

Usage:
  dart_todo <command> [arguments]

Commands:
  add <title>        Add a new task
    -p, --priority   Priority: high, normal, low (default: normal)
  list               List all tasks
  complete <id>      Mark a task as complete
  delete <id>        Delete a task
  clear              Delete all tasks

Examples:
  dart_todo add "Write the CLI article" --priority=high
  dart_todo list
  dart_todo complete 1
  dart_todo delete 2
  dart_todo clear
  ''');
}
```

Run it:

```sh
dart run bin/dart_todo.dart add "Write the CLI article" --priority=high
# Added task #1: "Write the CLI article" [high]

dart run bin/dart_todo.dart add "Review PR comments"
# Added task #2: "Review PR comments" [normal]

dart run bin/dart_todo.dart list
#   ID   Status      Priority   Title
#   ───  ──────────  ─────────  ────────────────────────
#   1    ⬜ pending  high       Write the CLI article
#   2    ⬜ pending  normal     Review PR comments

dart run bin/dart_todo.dart complete 1
# Task #1 marked as complete: "Write the CLI article"

dart run bin/dart_todo.dart delete 2
# Deleted task #2: "Review PR comments"
```

`dart_todo` demonstrates the patterns that form the backbone of almost every real CLI tool — argument parsing with `args`, JSON persistence, interactive prompts, structured output, and clean error handling across every command.

---

## CLI 3 — dart_http: A Lightweight API Request Runner

This is the most complex CLI in this article – and the most immediately useful. `dart_http` lets developers make HTTP requests directly from the terminal, with pretty-printed JSON responses, response metadata, header support, and the ability to save responses to a file.

```sh
dart_http get https://jsonplaceholder.typicode.com/users/1
dart_http post https://jsonplaceholder.typicode.com/posts --body='{"title":"Hello"}'
dart_http get https://jsonplaceholder.typicode.com/users --save=users.json
dart_http get https://api.example.com/me --header="Authorization: Bearer mytoken"
```

### Building dart_http

Create the project:

```sh
dart create -t console dart_http
cd dart_http
```

Update <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
name: dart_http
description: A lightweight API request runner for the terminal
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

executables:
  dart_http: dart_http

dependencies:
  args: ^2.4.2
  http: ^1.2.1

dev_dependencies:
  lints: ^3.0.0
  test: ^1.24.0
```

Run `dart pub get`.

Project structure:

```sh title="file structure"
dart_http/
  bin/
    dart_http.dart
  lib/
    runner/
      request_runner.dart
    printer/
      response_printer.dart
    utils/
      headers_parser.dart
  pubspec.yaml
```

#### Step 1 — Headers Parser (<VPIcon icon="fas fa-folder-open"/>`lib/utils/`<VPIcon icon="fa-brands fa-dart-lang"/>`headers_parser.dart`)

```dart title="lib/utils/headers_parser.dart"
Map<String, String> parseHeaders(List<String> rawHeaders) {
  final headers = <String, String>{};

  for (final header in rawHeaders) {
    final index = header.indexOf(':');
    if (index == -1) continue;

    final key = header.substring(0, index).trim();
    final value = header.substring(index + 1).trim();
    headers[key] = value;
  }

  return headers;
}
```

#### Step 2 — Response Printer (<VPIcon icon="fas fa-folder-open"/>`lib/printer/`<VPIcon icon="fa-brands fa-dart-lang"/>`response_printer.dart`)

```dart title="lib/printer/response_printer.dart"
import 'dart:convert';
import 'dart:io';

void printResponse({
  required int statusCode,
  required String body,
  required int durationMs,
  required int bodyBytes,
}) {
  final statusLabel = _statusLabel(statusCode);
  final size = _formatSize(bodyBytes);

  stdout.writeln('');
  stdout.writeln('\(statusLabel | \){durationMs}ms | $size');
  stdout.writeln('─' * 50);

  try {
    final decoded = jsonDecode(body);
    const encoder = JsonEncoder.withIndent('  ');
    stdout.writeln(encoder.convert(decoded));
  } catch (_) {
    // Not JSON — print as plain text
    stdout.writeln(body);
  }

  stdout.writeln('');
}

String _statusLabel(int code) {
  if (code >= 200 && code < 300) return '✅ $code';
  if (code >= 300 && code < 400) return '↪️  $code';
  if (code >= 400 && code < 500) return '❌ $code';
  return '$code';
}

String _formatSize(int bytes) {
  if (bytes < 1024) return '${bytes}b';
  if (bytes < 1024 * 1024) return '${(bytes / 1024).toStringAsFixed(1)}kb';
  return '${(bytes / (1024 * 1024)).toStringAsFixed(1)}mb';
}
```

#### Step 3 — Request Runner (<VPIcon icon="fas fa-folder-open"/>`lib/runner/`<VPIcon icon="fa-brands fa-dart-lang"/>`request_runner.dart`)

```dart :collapsed-lines title="lib/runner/request_runner.dart"
import 'dart:io';

import 'package:http/http.dart' as http;

import '../printer/response_printer.dart';

Future<void> runRequest({
  required String method,
  required String url,
  required Map<String, String> headers,
  String? body,
  String? saveToFile,
}) async {
  final uri = Uri.tryParse(url);

  if (uri == null) {
    stderr.writeln('Error: "$url" is not a valid URL');
    exit(1);
  }

  stdout.writeln('→ \({method.toUpperCase()} \)url');

  http.Response response;
  final stopwatch = Stopwatch()..start();

  try {
    switch (method.toLowerCase()) {
      case 'get':
        response = await http.get(uri, headers: headers);
      case 'post':
        response = await http.post(uri, headers: headers, body: body);
      case 'put':
        response = await http.put(uri, headers: headers, body: body);
      case 'patch':
        response = await http.patch(uri, headers: headers, body: body);
      case 'delete':
        response = await http.delete(uri, headers: headers);
      default:
        stderr.writeln('Error: unsupported method "$method"');
        exit(2);
    }
  } catch (e) {
    stderr.writeln('Error: request failed — $e');
    exit(1);
  }

  stopwatch.stop();

  printResponse(
    statusCode: response.statusCode,
    body: response.body,
    durationMs: stopwatch.elapsedMilliseconds,
    bodyBytes: response.bodyBytes.length,
  );

  if (saveToFile != null) {
    final file = File(saveToFile);
    file.writeAsStringSync(response.body);
    stdout.writeln('Response saved to $saveToFile');
  }
}
```

#### Step 4 — Entry Point (<VPIcon icon="fas fa-folder-open"/>`bin/`<VPIcon icon="fa-brands fa-dart-lang"/>`dart_http.dart`)

```dart :collapsed-lines title="bin/dart_http.dart"
import 'dart:io';

import 'package:args/args.dart';

import '../lib/runner/request_runner.dart';
import '../lib/utils/headers_parser.dart';

void main(List<String> arguments) async {
  final parser = ArgParser();

  for (final method in ['get', 'post', 'put', 'patch', 'delete']) {
    final commandParser = ArgParser()
      ..addMultiOption('header', abbr: 'H', help: 'Request header (repeatable)')
      ..addOption('body', abbr: 'b', help: 'Request body (for POST/PUT/PATCH)')
      ..addOption('save', abbr: 's', help: 'Save response body to a file');

    parser.addCommand(method, commandParser);
  }

  parser.addFlag('help', abbr: 'h', negatable: false, help: 'Show help');

  ArgResults results;

  try {
    results = parser.parse(arguments);
  } catch (e) {
    stderr.writeln('Error: $e');
    printHelp();
    exit(2);
  }

  if (results['help'] as bool || results.command == null) {
    printHelp();
    exit(0);
  }

  final command = results.command!;
  final method = command.name!;
  final rest = command.rest;

  if (rest.isEmpty) {
    stderr.writeln('Error: please provide a URL');
    stderr.writeln('Usage: dart_http $method <url>');
    exit(2);
  }

  final url = rest[0];
  final rawHeaders = command['header'] as List<String>;
  final body = command['body'] as String?;
  final saveToFile = command['save'] as String?;

  final headers = parseHeaders(rawHeaders);

  // Default Content-Type for requests with a body
  if (body != null && !headers.containsKey('Content-Type')) {
    headers['Content-Type'] = 'application/json';
  }

  await runRequest(
    method: method,
    url: url,
    headers: headers,
    body: body,
    saveToFile: saveToFile,
  );
}

void printHelp() {
  stdout.writeln('''
dart_http — a lightweight API request runner

Usage:
  dart_http <method> <url> [options]

Methods:
  get       Send a GET request
  post      Send a POST request
  put       Send a PUT request
  patch     Send a PATCH request
  delete    Send a DELETE request

Options:
  -H, --header    Add a request header (repeatable)
  -b, --body      Request body (JSON string)
  -s, --save      Save response body to a file
  -h, --help      Show this help message

Examples:
  dart_http get https://jsonplaceholder.typicode.com/users
  dart_http get https://api.example.com/me --header="Authorization: Bearer token"
  dart_http post https://api.example.com/posts --body=\'{"title":"Hello"}\'
  dart_http get https://api.example.com/users --save=users.json
  ''');
}
```

Run it:

```sh
dart run bin/dart_http.dart get https://jsonplaceholder.typicode.com/users/1
#
# → GET https://jsonplaceholder.typicode.com/users/1
# 200 | 87ms | 510b
# ──────────────────────────────────────────────────
# {
#   "id": 1,
#   "name": "Leanne Graham",
#   "username": "Bret",
#   "email": "Sincere@april.biz"
# }

dart run bin/dart_http.dart get https://jsonplaceholder.typicode.com/users --save=users.json
#
# → GET https://jsonplaceholder.typicode.com/users
# 200 | 143ms | 5.3kb
# ──────────────────────────────────────────────────
# [ ... ]
# Response saved to users.json

dart run bin/dart_http.dart post https://jsonplaceholder.typicode.com/posts \
  --body='{"title":"Hello from dart_http","userId":1}'
# → POST https://jsonplaceholder.typicode.com/posts
#
# 201 | 312ms | 72b
```

---

## Adding Color and Polish to Your CLI

The CLIs above are functional, but terminal output can be made significantly more readable with color. The `ansi_styles` package provides ANSI escape code support for coloring text in the terminal.

Add it to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  ansi_styles: ^0.3.0
```

Using it:

```dart
import 'package:ansi_styles/ansi_styles.dart';

stdout.writeln(AnsiStyles.green('✅ Success'));
stdout.writeln(AnsiStyles.red('❌ Error: something went wrong'));
stdout.writeln(AnsiStyles.yellow('⚠️  Warning: check your config'));
stdout.writeln(AnsiStyles.bold('dart_http — API request runner'));
stdout.writeln(AnsiStyles.cyan('→ GET https://api.example.com/users'));
```

Apply color intentionally and consistently:

- **Green** — success states, completed operations
- **Red** — errors and failures
- **Yellow** — warnings and non-blocking issues
- **Cyan** — informational output, URLs, paths
- **Bold** — headers, tool names, important values

Avoid coloring everything. Color loses meaning when it is everywhere. Use it to draw the user's eye to what actually matters.

---

## Testing Your CLI Tool

CLI tools are testable, and they should be tested. The most reliable approach is to test the logic inside your commands directly — not the terminal output formatting, but the behaviour.

Add `test` to your dev dependencies if it's not already there:

```yaml title="pubspec.yaml"
dev_dependencies:
  test: ^1.24.0
```

**Testing command logic:**

```dart :collapsed-lines
import 'package:test/test.dart';

import '../lib/models/task.dart';

void main() {
  group('Task model', () {
    test('copyWith updates isComplete correctly', () {
      final task = Task(
        id: 1,
        title: 'Write tests',
        priority: 'high',
        createdAt: DateTime.now(),
      );

      final completed = task.copyWith(isComplete: true);

      expect(completed.isComplete, isTrue);
      expect(completed.title, equals('Write tests'));
      expect(completed.id, equals(1));
    });

    test('toJson and fromJson round-trips correctly', () {
      final task = Task(
        id: 2,
        title: 'Ship the tool',
        priority: 'normal',
        createdAt: DateTime.parse('2025-01-01T00:00:00.000'),
      );

      final json = task.toJson();
      final restored = Task.fromJson(json);

      expect(restored.id, equals(task.id));
      expect(restored.title, equals(task.title));
      expect(restored.priority, equals(task.priority));
    });
  });
}
```

**Testing the headers parser:**

```dart :collapsed-lines
import 'package:test/test.dart';

import '../lib/utils/headers_parser.dart';

void main() {
  group('parseHeaders', () {
    test('parses a single header correctly', () {
      final result = parseHeaders(['Authorization: Bearer mytoken']);
      expect(result['Authorization'], equals('Bearer mytoken'));
    });

    test('parses multiple headers', () {
      final result = parseHeaders([
        'Authorization: Bearer token',
        'Accept: application/json',
      ]);
      expect(result.length, equals(2));
      expect(result['Accept'], equals('application/json'));
    });

    test('ignores malformed headers without a colon', () {
      final result = parseHeaders(['malformed-header']);
      expect(result.isEmpty, isTrue);
    });
  });
}
```

Run your tests:

```sh
dart test
```

---

## Deploying and Distributing Your CLI

Building a CLI tool is half the work. Getting it into the hands of developers is the other half. There are five distribution paths available, each suited to a different use case.

### Mode 1: pub.dev — Public Package Distribution

Publishing to pub.dev makes your tool installable by anyone in the Dart and Flutter community with a single command.

#### Prepare your package:

Your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` needs to be complete:

```yaml title="pubspec.yaml"
name: dart_http
description: A lightweight API request runner for Dart developers.
version: 1.0.0
homepage: https://github.com/yourname/dart_http

environment:
  sdk: '>=3.0.0 <4.0.0'

executables:
  dart_http: dart_http
```

The `executables` block is critical. It tells pub.dev which script in <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`bin/` to expose as a runnable command.

You also need:

- .<VPIcon icon="fa-brands fa-markdown"/>`README.md` — what the tool does, how to install it, usage examples
- .<VPIcon icon="fa-brands fa-markdown"/>`CHANGELOG.md` — version history
- <VPIcon icon="fas fa-file-lines"/>`LICENSE` — an open source license (MIT is standard)

#### Validate before publishing:

```sh
dart pub publish --dry-run
```

This runs all validation checks without actually publishing. Fix any warnings before proceeding.

#### Publish:

```sh
dart pub publish
```

You will be prompted to authenticate with your pub.dev account. Once published, your tool is available globally:

```sh
dart pub global activate dart_http
dart_http get https://api.example.com/users
```

### Mode 2: Local Path Activation

For internal team tools that you don't want to publish publicly, activate directly from a local or cloned repository:

```sh
dart pub global activate --source path /path/to/dart_http
```

Any developer on the team clones the repo and runs this command once. The tool is then available globally in their terminal without needing a pub.dev publish.

This is the right distribution mode for:

- Internal company tooling
- Tools that depend on private packages
- Work-in-progress tools shared within a team before a public release

### Mode 3: Compiled Binary via GitHub Releases

Dart can compile to a self-contained native executable — no Dart SDK required on the target machine. This makes your tool accessible to developers outside the Dart ecosystem.

#### Compile:

```sh
# macOS
dart compile exe bin/dart_http.dart -o dist/dart_http-macos

# Linux
dart compile exe bin/dart_http.dart -o dist/dart_http-linux

# Windows
dart compile exe bin/dart_http.dart -o dist/dart_http-windows.exe
```

The compiled binary is fully self-contained. Copy it to any machine and run it — no Dart installation needed.

#### Automate with GitHub Actions:

Create <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`release.yml`:

```yaml title=".github/workflows/release.yml"
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v3

      - uses: dart-lang/setup-dart@v1
        with:
          sdk: stable

      - name: Install dependencies
        run: dart pub get

      - name: Compile binary
        run: |
          mkdir -p dist
          dart compile exe bin/dart_http.dart -o dist/dart_http-${{ runner.os }}

      - name: Upload binary to release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/dart_http-${{ runner.os }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Every time you push a version tag (`v1.0.0`), GitHub Actions compiles binaries for all three platforms and attaches them to the GitHub Release automatically.

#### Write an install script:

```sh
#!/usr/bin/env bash
set -euo pipefail

VERSION="1.0.0"
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
BINARY="dart_http-$OS"
INSTALL_DIR="/usr/local/bin"

curl -L "https://github.com/yourname/dart_http/releases/download/v\(VERSION/\)BINARY" \
  -o "$INSTALL_DIR/dart_http"

chmod +x "$INSTALL_DIR/dart_http"
echo "dart_http installed successfully"
```

Developers install it with:

```sh
curl -fsSL https://raw.githubusercontent.com/yourname/dart_http/main/install.sh | bash
```

### Mode 4: Homebrew Tap

Homebrew is the standard package manager for macOS and is widely used on Linux. A Homebrew tap makes your tool installable with `brew install` — the most familiar installation pattern for macOS developers.

#### Create your tap repository:

Create a new GitHub repository named `homebrew-tools` (the `homebrew-` prefix is required by Homebrew's naming convention).

#### Write the formula:

Create <VPIcon icon="fas fa-folder-open"/>`Formula/`<VPIcon icon="iconfont icon-ruby"/>`dart_http.rb` in that repository:

```ruby title="Formula/dart_http.rb"
class DartHttp < Formula
  desc "A lightweight API request runner for the terminal"
  homepage "https://github.com/yourname/dart_http"
  version "1.0.0"

  on_macos do
    url "https://github.com/yourname/dart_http/releases/download/v1.0.0/dart_http-macOS"
    sha256 "YOUR_SHA256_HASH_HERE"
  end

  on_linux do
    url "https://github.com/yourname/dart_http/releases/download/v1.0.0/dart_http-Linux"
    sha256 "YOUR_SHA256_HASH_HERE"
  end

  def install
    bin.install "dart_http-#{OS.mac? ? 'macOS' : 'Linux'}" => "dart_http"
  end

  test do
    system "#{bin}/dart_http", "--help"
  end
end
```

Generate the SHA256 hash for each binary:

```sh
shasum -a 256 dist/dart_http-macOS
```

#### Install from the tap:

```sh
brew tap yourname/tools
brew install dart_http
```

When you release a new version, update the `url` and `sha256` values in the formula and push the change. Users run `brew upgrade dart_http` to update.

### Mode 5: Docker

Docker distribution is best suited for CI environments, teams that standardise on containers, or tools with complex dependencies.

#### Write a <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM dart:stable AS build

WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/dart_http.dart -o /app/dart_http

FROM debian:stable-slim
COPY --from=build /app/dart_http /usr/local/bin/dart_http

ENTRYPOINT ["dart_http"]
```

This uses a multi-stage build: the first stage compiles the binary using the Dart SDK image, and the second stage copies only the binary into a minimal Debian image. The final image has no Dart SDK — just the compiled binary.

#### Build and run:

```sh
docker build -t dart_http .
docker run dart_http get https://jsonplaceholder.typicode.com/users/1
```

#### Publish to Docker Hub:

```sh
docker tag dart_http yourname/dart_http:1.0.0
docker push yourname/dart_http:1.0.0
```

Users can then run your tool without installing anything locally:

```sh
docker run yourname/dart_http get https://api.example.com/users
```

---

## Choosing the Right Distribution Mode

| Mode | Best for | Dart SDK required |
| --- | --- | --- |
| pub.dev | Public Dart/Flutter developer tools | Yes |
| Local path activation | Internal team tools, pre-release builds | Yes |
| Compiled binary | Language-agnostic tools, broad adoption | No |
| Homebrew tap | macOS/Linux developer tools | No |
| Docker | CI environments, complex dependencies | No |

For most tools, the practical recommendation is:

- Start with **pub.dev** if your audience is Dart developers
- Add **compiled binary + GitHub Releases** once you want broader adoption
- Add a **Homebrew tap** when macOS developers start asking for it
- Use **Docker** only when it is already part of your team's workflow

---

## Conclusion

You've gone from understanding what a CLI is to building three progressively complex tools and distributing them across five different channels.

The foundational skills – `args`, `stdin`, `stdout`, `stderr`, exit codes, file I/O, and process spawning – are the same building blocks that tools like `flutter`, `git`, and `dart` themselves are built on. Everything else is composition.

The three CLIs we built (Hello CLI, `dart_todo`, and `dart_http`) each introduced a new layer: raw Dart fundamentals, the `args` package with JSON persistence, and real-world HTTP interaction. The distribution section ensures that whatever you build next, you have a clear path to getting it in front of the developers who will use it.

Dart is a powerful language for CLI development. Its strong typing, async support, native compilation, and pub.dev ecosystem make it a serious choice for building developer tooling, not just mobile apps.

The next step is building something that solves a real problem for you or your team, and shipping it.

Happy coding!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Command Line Interface (CLI) Development with Dart: From Zero to a Fully Published Developer Tool",
  "desc": "Most developers spend a significant portion of their day in the terminal. They run flutter build, push with git, manage packages with dart pub, and orchestrate pipelines from the command line. Every o",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-command-line-interface-cli-development-with-dart-from-zero-to-a-fully-published-developer-tool/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
