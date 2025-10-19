---
lang: en-US
title: "How to Use the Model Context Protocol (MCP) with Flutter and Dart"
description: "Article(s) > How to Use the Model Context Protocol (MCP) with Flutter and Dart"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Model Context Protocol (MCP) with Flutter and Dart"
    - property: og:description
      content: "How to Use the Model Context Protocol (MCP) with Flutter and Dart"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-model-context-protocol-mcp-with-flutter-and-dart.html
prev: /programming/dart/articles/README.md
date: 2025-10-25
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761335181944/18a2fe98-2d77-490c-8b80-5f254c3f9c99.png
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
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Model Context Protocol (MCP) with Flutter and Dart"
  desc="Software development is moving fast toward AI-assisted workflows and smarter tooling. Whether it’s your IDE completing code, an AI assistant analyzing your project, or automated testing pipelines, all these tools need a standardized way to communicat..."
  url="https://freecodecamp.org/news/how-to-use-the-model-context-protocol-mcp-with-flutter-and-dart"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761335181944/18a2fe98-2d77-490c-8b80-5f254c3f9c99.png"/>

Software development is moving fast toward AI-assisted workflows and smarter tooling. Whether it’s your IDE completing code, an AI assistant analyzing your project, or automated testing pipelines, all these tools need a standardized way to communicate. That’s where the **Model Context Protocol (MCP)** comes in.

If you’ve been hearing about MCP and wondering what it means for you as a Dart or Flutter developer, this guide is for you. It explains what MCP is and how it connects with Dart through the official `dart_mcp` package. You’ll also learn how you can start building or integrating MCP-based tools yourself, so AI can actually understand and act on your Flutter/Dart project, not just answer questions about pasted code.

By the end of this guide, you’ll understand:

- What the Model Context Protocol (MCP) is and why it matters.
- How MCP powers AI and development tools to communicate in a structured, consistent way.
- How Dart integrates MCP through the `dart_mcp` package and server tools.
- Practical examples of how to build an MCP server and client in Dart.
- How to get started, including prerequisites and learning resources.

::: note Prerequisites

To follow along with this guide, you should have the following:

1. Dart SDK 3.9 or later/Flutter 3.35 beta or later installed on your machine.
2. Basic understanding of async programming in Dart (using `async` / `await`).
3. Familiarity with standard I/O streams (`stdin`, `stdout`) since the MCP client communicates through them.
4. Access to an MCP-compatible server (for example, Dart MCP Server or a custom implementation).
5. Pub dependencies properly set up with `dart_mcp` added to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`.

:::

---

## What is MCP (Model Context Protocol)?

MCP (Model Context Protocol) is a standard that lets AI models (agents) communicate with developer tools, editors, and projects in a structured, permissioned way. Instead of asking an AI to reason about code you paste into chat, MCP lets the AI call specific capabilities (tools) your project exposes, for example, “run analyzer”, “get file contents”, “run tests”, or “search pub.dev”. This turns the AI into a contextual collaborator that can inspect, run, and even modify your codebase in a controlled fashion.

In simpler terms, it’s a protocol that helps **AI agents and tools talk to each other**. It removes the need for one-off integrations and standardizes how capabilities like “run this tool,” “fetch this file,” or “get these logs” are described and used.

---

## Why MCP Matters for Dart and Flutter Developers

For developers building in Dart and Flutter, MCP opens up new possibilities:

1. You can build your own AI-driven tools (for example, analyzers, file processors, or code review assistants) that integrate with editors and assistants through MCP.
2. You can extend your development workflow, letting AI assistants interact directly with your local Dart projects, run commands, analyze files, or trigger Flutter builds.
3. You can automate tasks within your local dev environment (like linting, dependency analysis, or report generation) without needing a dedicated API server.

It’s not just about AI, it’s also about standardized automation in your toolchain.

---

## MCP in the Dart Ecosystem

The Dart team has started embracing MCP directly through an official experimental package called `dart_mcp`. This package gives Dart developers the tools to create both MCP servers and MCP clients, enabling two-way communication between your Dart tools and AI assistants or IDEs.

### What Is the `dart_mcp` Package?

The [<VPIcon icon="fa-brands fa-dart-lang"/>`dart_mcp`](https://pub.dev/packages/dart_mcp) package provides APIs to implement MCP servers and clients using Dart. It’s published by [<VPIcon icon="fa-brands fa-dart-lang"/>`labs.dart.dev`](https://pub.dev/publishers/labs.dart.dev/packages), which means it’s an official Dart Labs experiment, actively evolving and backed by the Dart team.

::: important Key features

1. Build MCP servers that expose tools and capabilities.
2. Build MCP clients that connect to those servers.
3. Support for STDIO transport, allowing local, low-latency communication.
4. Support for Prompts, Resources, and Tools capabilities.
5. Protocol-aligned structure for initialization, schema validation, and request/response handling.

:::

::: warning Limitations (as of version 0.3.3)

1. HTTP and streamable transports are still experimental.
2. Authorization and batching aren’t fully supported yet.
3. The package API may change as it matures.

:::

---

## Real-World Use Cases

These are some of the situations where MCP moves from “cool” to genuinely useful:

1. **Fix a runtime UI bug.** The AI inspects runtime logs and the widget tree, then suggests and applies a fix for a `RenderFlex` overflow.
2. **Add a package and scaffold usage.** You can ask the assistant to add charting, and it searches `pub.dev`, updates <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, runs `dart pub get`, and generates the basic widget usage.
3. **Automated code review.** On each PR, an AI agent runs `dart analyze` and `flutter test`, and comments with suggested improvements.
4. **Learning and mentorship.** The tool can inspect a learner’s project and then suggest idiomatic Flutter patterns and add unit tests.
5. **Custom dev tools.** It can build internal tools: for example, “list all routes and generate a navigation test”, exposed as a capability and callable by the assistant.

---

## How MCP Actually Works

Before we dive into the flow, it’s important to understand what’s happening under the hood. MCP defines how an AI assistant communicates securely with your local environment. It enables structured, permission-based interactions between your IDE, AI assistant, and development tools, without giving the model unrestricted access.

Let’s look at an example:

```dart
AI Assistant (LLM)  ⇄  MCP Client (in IDE/agent)  ⇄  Dart/Flutter MCP Server (dart mcp-server)  ⇄  Tools & Codebase
```

- The MCP server runs inside your environment and exposes tools (capabilities).
- The MCP client (for example, Gemini CLI, GitHub Copilot, Firebase Studio, Cursor) communicates with the server.
- The AI issues structured tool calls. The server executes and returns structured results.

You stay in control, and tools are explicit and permissioned (instead of having ephemeral “give everything to the model” access).

---

## Getting Started, Step by Step

Follow the below instructions to go from zero to a working MCP-enabled project.

### 1. Prerequisites

First, you’ll need to install Dart SDK 3.9+ and Flutter (if you want to experiment with Flutter runtime introspection). The Dart MCP server requires Dart 3.9 or later.

You can use VS Code, IntelliJ, or another editor. Many clients/plugins will integrate with MCP.

### 2. Start the Dart & Flutter MCP server locally

You can run the Dart MCP server with the following command:

```sh
dart mcp-server
```

This command launches the MCP server, the component that client tools (like IDEs or AI assistants) connect to in order to communicate with your local environment.

### 3. Configure an MCP client

You can configure clients like Gemini CLI, Firebase Studio, GitHub Copilot and Cursor to talk to your server. Here’s an example for the Gemini CLI (add to `~/.gemini/`<VPIcon icon="iconfont icon-json"/>`settings.json` or project `.gemini/`<VPIcon icon="iconfont icon-json"/>`settings.json`):

```json title="~/.gemini/settings.json"
{
  "mcpServers": {
    "dart": {
      "command": "dart",
      "args": ["mcp-server"]
    }
  }
}
```

This tells the client to start the `dart mcp-server` process and use it as a tool provider.

### 4. Try an easy request from your IDE assistant

Open your project in VS Code (with an AI assistant enabled). Ask something practical, like:

> “Find untested functions and create a test file skeleton for them.”

The assistant will use MCP tools to inspect code, run analysis, and can generate test scaffolding for you to review.

### 5. Build a custom capability (optional)

One of the most powerful aspects of MCP is that you can extend it with your own capabilities. For example, you might want to expose a script that lists all Flutter routes, checks for deprecated APIs, or runs internal code quality checks, all from within your IDE or AI assistant.

In the example below, a simple Dart MCP server registers a custom tool called `list_routes`. When the client calls this tool, the server runs a function that scans your project for route definitions and returns them as structured data. This lets your AI assistant interact directly with your codebase in a safe, controlled way.

```dart
import 'package:dart_mcp_server/dart_mcp_server.dart';

void main() async {
  final server = McpServer();

  // Define a custom capability
  server.registerTool(
    'list_routes',
    (context, params) async {
      // Example logic: extract all route names in your project
      final routes = await extractRoutesFromProject();
      return {'routes': routes};
    },
  );

  await server.start();
}

Future<List<String>> extractRoutesFromProject() async {
  // Your logic here — e.g., scanning lib/ for route definitions
  return ['/', '/login', '/dashboard'];
}
```

Once registered, your MCP client (for example, Gemini, Cursor, or Copilot) can call this tool just like any built-in capability, enabling the AI assistant to understand your app’s routes or detect outdated APIs.

Beyond custom scripts, you can tailor MCP to your team’s needs by integrating internal linters, CI scripts, or design system checkers. You can also connect it to internal APIs such as analytics or configuration servers, or create domain-specific commands that reflect how your team builds, tests, and deploys projects. This makes MCP not just a protocol but a flexible foundation you can shape around your workflow.

---

## Hands-On Example

Before we look at the code, let’s clarify what it means to **expose an MCP capability in Dart**. In the MCP world, a **capability** is simply a tool or function that an AI assistant can call, for example, to analyze code, read a file, or run a build. **Exposing** a capability means making that tool accessible through a well-defined interface (usually over HTTP or another structured protocol) so the AI or MCP client can request it, execute it, and receive structured results in return.

In this example, you’ll see how to simulate that idea using a small Dart script. Instead of using the full MCP stack, we’ll create a simple local HTTP server that exposes two basic capabilities: `analyze`, which runs `dart analyze` on your project, and `getFileContent`, which reads and returns the contents of a given file.

This shows the same underlying pattern MCP uses: structured requests come in, your server performs an action, and structured responses go back out.

Create a file <VPIcon icon="fa-brands fa-dart-lang"/>`simple_mcp_server.dart`:

```dart :collapsed-lines title="simple_mcp_server.dart"
import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 8081);
  print('Simple MCP-like server listening at http://localhost:8081');

  await for (final request in server) {
    try {
      final body = await utf8.decoder.bind(request).join();
      final data = jsonDecode(body) as Map<String, dynamic>;

      final command = data['command'] as String? ?? '';
      if (command == 'analyze') {
        final result = await Process.run('dart', ['analyze']);
        request.response
          ..statusCode = 200
          ..headers.contentType = ContentType.json
          ..write(jsonEncode({'output': result.stdout.toString(), 'exitCode': result.exitCode}));
      } else if (command == 'getFileContent') {
        final path = data['args']?['path'] as String?;
        if (path == null) {
          request.response
            ..statusCode = 400
            ..write(jsonEncode({'error': 'Missing path'}));
        } else {
          final file = File(path);
          if (!await file.exists()) {
            request.response
              ..statusCode = 404
              ..write(jsonEncode({'error': 'File not found'}));
          } else {
            final content = await file.readAsString();
            request.response
              ..statusCode = 200
              ..headers.contentType = ContentType.json
              ..write(jsonEncode({'content': content}));
          }
        }
      } else {
        request.response
          ..statusCode = 400
          ..write(jsonEncode({'error': 'Unknown command'}));
      }
    } catch (e, st) {
      request.response
        ..statusCode = 500
        ..write(jsonEncode({'error': e.toString(), 'stack': st.toString()}));
    } finally {
      await request.response.close();
    }
  }
}
```

This Dart script creates a simple local HTTP server that listens for JSON commands on port 8081. It accepts specific commands such as `"analyze"` and `"getFileContent"`, executes corresponding actions on your machine, and returns a JSON response.

This is a simplified demonstration of how an MCP (Model Context Protocol) server handles requests and executes tools or actions.

Let’s go through it piece by piece so you understand the code really well.

### 1. Imports

```dart
import 'dart:convert';
import 'dart:io';
```

- `dart:io` provides access to file system, processes, and networking features (used here to start the HTTP server and interact with the system).
- `dart:convert` allows encoding and decoding of JSON data (used to parse the incoming request body and send structured JSON responses).

### 2. Starting the server

```dart
final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 8081);
print('Simple MCP-like server listening at http://localhost:8081');
```

`HttpServer.bind` starts an HTTP server on the local machine (`127.0.0.1`) and port `8081`. The server will only be accessible from your own computer, not the internet, and the message confirms the server is running and listening for incoming requests.

### 3. Handling requests

```dart
await for (final request in server) {
```

This continuously listens for incoming HTTP requests. Each request triggers a new iteration of the loop, allowing multiple requests over time.

### 4. Reading the request body

```dart
final body = await utf8.decoder.bind(request).join();
final data = jsonDecode(body) as Map<String, dynamic>;
```

This reads the full request body (assuming it’s UTF-8 encoded text) and converts the JSON string into a Dart map (`data`) so it can be accessed programmatically.

::: tip Example expected input:

```json
{
  "command": "analyze"
}
```

:::

### 5. Parsing and routing the command

```dart
final command = data['command'] as String? ?? '';
```

This extracts the `command` key from the request body. If it’s missing or null, it defaults to an empty string.

The server uses this value to determine what action to perform.

### 6. Handling the "analyze" command

```dart
if (command == 'analyze') {
  final result = await Process.run('dart', ['analyze']);
  request.response
    ..statusCode = 200
    ..headers.contentType = ContentType.json
    ..write(jsonEncode({'output': result.stdout.toString(), 'exitCode': result.exitCode}));
}
```

If the command is `"analyze"`, the script runs the terminal command `dart analyze` using `Process.run()`. This checks your Dart project for errors, warnings, or lints. The output of that command (`stdout`) and its exit code are sent back as JSON in the HTTP response.

::: tip Expected response example

```json
{
  "output": "Analyzing project...\nNo issues found!",
  "exitCode": 0
}
```

:::

### 7. Handling the "getFileContent" command

```dart
else if (command == 'getFileContent') {
  final path = data['args']?['path'] as String?;
```

This command expects an `"args"` object containing a `"path"` key.

::: tip Example request:

```json
{
  "command": "getFileContent",
  "args": { "path": "lib/main.dart" }
}
```

:::

The rest of the block:

```dart
if (path == null) {
  request.response
    ..statusCode = 400
    ..write(jsonEncode({'error': 'Missing path'}));
} else {
  final file = File(path);
  if (!await file.exists()) {
    request.response
      ..statusCode = 404
      ..write(jsonEncode({'error': 'File not found'}));
  } else {
    final content = await file.readAsString();
    request.response
      ..statusCode = 200
      ..headers.contentType = ContentType.json
      ..write(jsonEncode({'content': content}));
  }
}
```

If no path is provided, it returns an HTTP 400 error. If the file doesn’t exist, it returns a 404. And if the file exists, it reads its content and sends it back in JSON format.

::: tip Example response:

```json
{
  "content": "void main() { print('Hello World'); }"
}
```

:::

### 8. Handling unknown commands

```dart
else {
  request.response
    ..statusCode = 400
    ..write(jsonEncode({'error': 'Unknown command'}));
}
```

If the `command` field does not match any known options, the server returns an error.

### 9. Error handling

```dart
} catch (e, st) {
  request.response
    ..statusCode = 500
    ..write(jsonEncode({'error': e.toString(), 'stack': st.toString()}));
}
```

If any unhandled exception occurs (such as invalid JSON or runtime errors), the server catches it. It responds with a 500 status and includes both the error message and stack trace for debugging.

### 10. Closing the response

```dart
finally {
  await request.response.close();
}
```

Ensures that the response is properly closed after every request to prevent resource leaks.

#### Summary

This is a local HTTP server that mimics a very basic MCP workflow. It accepts commands over HTTP, performs system or file operations, and returns structured JSON results. It demonstrates how an AI assistant could interact with a Dart environment programmatically (for example, by analyzing code or reading files) through a safe, structured protocol.

::: info How to run it

1. Save the file in the root of a Dart project.
2. Run `dart run simple_mcp_server.dart`.
3. In another terminal, test the `analyze` command:

```sh
curl -X POST http://localhost:8081 -H "Content-Type: application/json" -d '{"command":"analyze"}'
```

:::

You’ll get back the analyzer output as JSON. In a real MCP workflow, the AI client would make similarly structured calls, except those calls are managed by an MCP client and follow the MCP spec for tools/resources/roots. The official Dart MCP server provides many more built-in tools and a full implementation that integrates with supported clients.

---

## How to Build a Simple MCP Server in Dart

In the previous section, we built a simplified, conceptual version of an MCP-like server using plain Dart and HTTP. That example helped illustrate the basic idea: receiving structured requests, executing specific actions, and returning structured results.

Now, let’s take that concept further and see how to build a proper MCP server using the official `dart_mcp` package. This version follows the real MCP specification and can interact with actual MCP clients, giving you a foundation for extending, testing, or customizing how your development tools communicate with the AI assistant.

### Step 1: Add Dependency

Add this to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  dart_mcp: ^0.3.3
```

### Step 2: Create the Server

```dart
import 'package:dart_mcp/server.dart';

class MyServer extends MCPServer with ToolsSupport, ResourcesSupport {
  MyServer()
      : super(Implementation(
          name: 'my-dart-mcp-server',
          version: '1.0.0',
        ));

  @override
  Future<void> initialize() async {
    // Register a simple tool
    registerTool(
      'analyzeCode',
      description: 'Analyze Dart code using the analyzer.',
      inputSchema: {
        'type': 'object',
        'properties': {
          'path': {'type': 'string'}
        },
        'required': ['path']
      },
      callback: (args, extra) async {
        final path = args['path'];
        // You can call `dart analyze` here or integrate analyzer APIs
        return {'message': 'Analyzed project at $path successfully.'};
      },
    );

    await super.initialize();
  }
}

void main() {
  final server = MyServer();
  server.connect(StdioServerTransport());
}
```

This Dart code defines a basic MCP server using the official `dart_mcp` package.

It’s a minimal working example that demonstrates how to create a custom MCP server, register a command (“tool”) that AI assistants or clients can call, and expose it over a local connection (using standard input/output, `stdio`).

Let’s break it down line by line.

#### 1. Import the package

```dart
import 'package:dart_mcp/server.dart';
```

This imports the server-side APIs from the `dart_mcp` package. These APIs allow you to create and configure an MCP server, register tools (commands) and resources, and handle incoming requests from MCP clients (for example, editors or AI assistants).

#### 2. Create a server class

```dart
class MyServer extends MCPServer with ToolsSupport, ResourcesSupport {
```

This defines a custom class named `MyServer` that extends `MCPServer`.

`MCPServer` is the base class that manages communication, initialization, and capability discovery. The `with` keywords mix in additional capabilities. `ToolsSupport` allows you to register tools, callable commands that perform actions. `ResourcesSupport` allows you to register resources, accessible data like project files or datasets.

So this server supports both tools (commands) and resources (data).

#### 3. The constructor

```dart
MyServer()
    : super(Implementation(
        name: 'my-dart-mcp-server',
        version: '1.0.0',
      ));
```

Here, the constructor passes information about the implementation to the parent `MCPServer` class.

`Implementation` is a metadata object that describes the server, including:

- `name`, a unique name for your server, and
- `version`, the version number.

This metadata helps clients identify which MCP server they’re communicating with.

#### 4. Overriding the initialization method

```dart
@override
Future<void> initialize() async {
```

This method runs when the server starts up. It’s where you register tools and resources before the server begins listening for commands.

#### 5. Registering a tool

```dart
registerTool(
  'analyzeCode',
  description: 'Analyze Dart code using the analyzer.',
  inputSchema: {
    'type': 'object',
    'properties': {
      'path': {'type': 'string'}
    },
    'required': ['path']
  },
  callback: (args, extra) async {
    final path = args['path'];
    // You can call `dart analyze` here or integrate analyzer APIs
    return {'message': 'Analyzed project at $path successfully.'};
  },
);
```

This section defines a tool called `"analyzeCode"`.

Let’s explain each part:

- `'analyzeCode'`: the tool’s name (how a client identifies it).
- `description`: a short explanation of what the tool does.
- `inputSchema`: a JSON schema that defines what input this tool expects. It expects an object with one property `"path"`, which must be a string.
- `callback`: a function that runs when the client calls this tool.
- `args` contains the client’s input, and you can use `args['path']` to access the provided path. In a real implementation, you could call `dart analyze` or use the Dart analyzer APIs to check the code at that path. The callback returns a response (in this case, a success message).

This tool can later be invoked by a connected MCP client, for example:

```json
{
  "command": "analyzeCode",
  "args": { "path": "lib/" }
}
```

And the server would respond:

```json
{
  "message": "Analyzed project at lib/ successfully."
}
```

#### 6. Call the parent initializer

```dart
await super.initialize();
```

This ensures that the base class (`MCPServer`) performs its own initialization logic after your custom setup (for example, registering built-in tools or preparing internal structures).

#### 7. Main entry point

```dart
void main() {
  final server = MyServer();
  server.connect(StdioServerTransport());
}
```

This is the entry point of the application. It creates an instance of your `MyServer` class. Then it connects using `StdioServerTransport()` which allows the server to communicate via standard input/output (stdio), the same mechanism used by local AI assistants and command-line tools.

In practice, this means the server doesn’t need to run an HTTP server. It can talk directly to other local tools that use MCP, such as IDE extensions or AI assistants that launch it.

This kind of MCP server could be connected to an IDE like VS Code or JetBrains via MCP to run Dart analysis automatically. It would let an AI assistant access your local Dart project, analyze files, and return insights, serving as a bridge between your Flutter project and external automation tools.

It’s a simple example that creates a command (`analyzeCode`) that an MCP client (like an AI assistant) can call. The client will send input through the MCP protocol, and your Dart server responds accordingly.

---

## Connecting to Your MCP Server with a Client

Now that you’ve built a simple MCP server, the next logical step is to see how a client interacts with it. The client is the other half of the equation: it connects to your server, initializes communication, and calls the tools (capabilities) you’ve registered.

The example below shows how to create a basic Dart-based MCP client that talks to the server you built earlier and invokes one of its tools.

```dart
import 'package:dart_mcp/client.dart';

void main() async {
  final client = await MCPClient.connectStdioServer(stdin, stdout);
  final initResult = await client.initialize(
    Implementation(name: 'my-client', version: '1.0.0'),
  );

  print('Connected to server: ${initResult.serverCapabilities.tools}');
  final result = await client.callTool('analyzeCode', {'path': 'lib/'});
  print(result);
}
```

This code creates a simple MCP client that connects to an MCP server (like the one you built earlier) and calls one of its registered tools.

Here’s what it does, step by step:

```dart
import 'package:dart_mcp/client.dart';
```

This imports the client-side API from the `dart_mcp` package. This lets you connect to an MCP server and call its tools.

```dart
final client = await MCPClient.connectStdioServer(stdin, stdout);
```

This creates a new MCP client and connects to a server using standard input/output (stdio). Again, this is how local tools or AI assistants communicate with MCP servers running on your system.

```dart
final initResult = await client.initialize(
  Implementation(name: 'my-client', version: '1.0.0'),
);
```

This sends an initialization request to the server. The `Implementation` object identifies this client by name and version. The server responds with its available capabilities (like registered tools and resources).

```dart
print('Connected to server: ${initResult.serverCapabilities.tools}');
```

This prints the list of tools that the server has registered, for example, `["analyzeCode"]`.

```dart
final result = await client.callTool('analyzeCode', {'path': 'lib/'});
```

This calls the server’s `analyzeCode` tool, passing `{'path': 'lib/'}` as the input. The server runs the callback registered for that tool and returns a response.

```dart
print(result);
```

And this prints the result returned by the server (for example: `{"message": "Analyzed project at lib/ successfully."}`).

### Summary

This client connects to an MCP server over stdio, initializes communication, lists available tools, calls one (`analyzeCode`), and prints the response. It’s the client-side counterpart of the earlier server example. Together, they demonstrate how two Dart programs can communicate using the MCP protocol.

This connects to the MCP server through stdin/stdout, initializes communication, and calls the `analyzeCode` tool.

---

## MCP vs. Custom HTTP Servers

If you’ve ever built a simple Dart HTTP server that handles commands like “analyze” or “getFileContent,” you’ve already done something similar to MCP. The difference is that MCP provides a formal structure and protocol that standardizes how such interactions occur.

Instead of manual JSON parsing and ad-hoc commands, the MCP layer handles:

- Tool registration and discovery
- Schema-based validation
- Standardized request and response types
- Built-in initialization and capabilities negotiation

So while a custom HTTP approach works for quick experiments, `dart_mcp` lets you build compliant, future-proof MCP tools that integrate cleanly with editors and assistants.

---

## Best Practices, Safety, and Permissions

- **Start read-only.** Give the assistant tools that read project state first (analyze, read file, run tests). Only enable write actions (edit files, git commit) after you trust the automation.
- **Review every change.** Even if the AI can apply fixes, treat it as a co-author: inspect diffs and run your tests.
- **Limit scopes.** Don’t expose secrets or keys to the MCP server. Use environment separation (dev vs. CI) and explicit capability gating.
- **Audit logs.** Keep logs for MCP calls and changes made by agents so you can trace who did what and when.
- **Set up team rules.** Define team policies for automated edits, for example, “AI can apply formatting and minor lint fixes, but not major architectural changes without human approval.”

---

## Getting Started as a Beginner

If you’re new to this space, here’s a simple roadmap:

1. **Read about MCP basics:** Visit the [<VPIcon icon="fa-brands fa-dart-lang"/>official Dart MCP](https://dart.dev/tools/mcp-server) page to understand what it is and where it fits in your workflow.
2. **Install and explore** `dart_mcp`: Try running one of the examples on [<VPIcon icon="fa-brands fa-dart-lang"/>pub.dev](https://pub.dev/packages/dart_mcp/example). Experiment with building your own simple tool.
3. **Connect it with your AI assistant or IDE:** Tools like Gemini or VS Code MCP plugins allow you to register your local Dart MCP server in the `mcpServers` configuration file.
4. **Expand your tools:** Build more complex commands like “run tests,” “format code,” “fetch dependencies,” or “generate reports.”
5. **Contribute or follow the Dart Labs repo:** MCP support in Dart is evolving rapidly. Keeping up with updates helps you stay ahead.

---

## Moving Beyond Beginner Level

Once you understand the basics:

- Start integrating your MCP tools into Flutter development pipelines.
- Build an AI-powered assistant that interacts directly with your Flutter project files.
- Explore the MCP GitHub discussions and OpenAI’s model context spec for deeper insights.

---

## Conclusion

The Model Context Protocol is shaping the next generation of developer tools, enabling smarter, AI-driven, and more integrated workflows. As a Dart or Flutter developer, learning MCP now positions you ahead of the curve.

By leveraging the `dart_mcp` package, you can start building compliant, extensible, and automated tools today, transforming how your development environment interacts with code, analysis, and AI.

::: info References

<SiteInfo
  name="Dart and Flutter MCP server"
  desc="Learn about the Dart and Flutter MCP server tool that exposes Dart and Flutter tools to compatible AI-assistant clients and agents."
  url="https://dart.dev/tools/mcp-server"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

<SiteInfo
  name="dart_mcp | Dart package"
  desc="A package for making MCP servers and clients."
  url="https://pub.dev/packages/dart_mcp/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-pqg4tc09/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="Supercharge Your Dart & Flutter Development Experience with the Dart MCP Server"
  desc="By Ander Dobo — Product Manager, and Kenzie Davisson — Engineer"
  url="https://blog.flutter.dev/supercharge-your-dart-flutter-development-experience-with-the-dart-mcp-server-2edcc8107b49/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/da:true/resize:fit:1200/1*3K1rgoDtIBWbIFZPp1VCEQ.gif"/>

<SiteInfo
  name="its-dart/dart-mcp-server"
  desc="Dart AI Model Context Protocol (MCP) server."
  url="https://github.com/its-dart/dart-mcp-server/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/520c8d2db9af931f66b1514b31ca868e1a0c4221a8050a46cd45b84bc4bd0a6d/its-dart/dart-mcp-server"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Model Context Protocol (MCP) with Flutter and Dart",
  "desc": "Software development is moving fast toward AI-assisted workflows and smarter tooling. Whether it’s your IDE completing code, an AI assistant analyzing your project, or automated testing pipelines, all these tools need a standardized way to communicat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-model-context-protocol-mcp-with-flutter-and-dart.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
