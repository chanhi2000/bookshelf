---
lang: en-US
title: "From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf"
description: "Article(s) > From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - DevOps
  - Docker
  - Fly
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - devops
  - docker
  - fly
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf"
    - property: og:description
      content: "From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-ship-production-rest-apis-with-dart-and-shelf.html
prev: /programming/dart/articles/README.md
date: 2026-06-01
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8ba5ec9d-22ba-4313-9b34-ce1e0e7dce23.png
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
  "title": "Fly > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/fly/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf"
  desc="As a Flutter engineer, you already know Dart. You understand async/await, you work with models and repositories, you think in clean architecture, and you have shipped real applications. The gap betwee"
  url="https://freecodecamp.org/news/how-to-build-and-ship-production-rest-apis-with-dart-and-shelf"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8ba5ec9d-22ba-4313-9b34-ce1e0e7dce23.png"/>

As a Flutter engineer, you already know Dart. You understand async/await, you work with models and repositories, you think in clean architecture, and you have shipped real applications.

The gap between where you are and being able to build and deploy a production backend is smaller than you think.

The missing piece is not a new language. It's not a new paradigm. It's understanding how Dart behaves when there's no widget tree, no BuildContext, no Flutter framework – just a running process handling HTTP requests, talking to a database, and sending responses back to clients.

That's exactly what this article covers.

We're going to build a full User and Profile Management REST API from scratch using Dart and Shelf, connect it to a PostgreSQL database running in Docker, secure it with JWT authentication, and deploy it to Fly.io.

By the end, you'll have a working production-grade backend written entirely in Dart, the same language you already know.

This article is part of a series (of standalone articles) where we'll build the same project using three different frameworks. We'll use Shelf here, Serverpod in the next article, and Dart Frog in the one after that. This will let you directly compare how each framework approaches the same problem.

::: note Prerequisites

Before starting, you should have:

- Comfortable familiarity with Dart and Flutter development
- Understanding of REST API concepts, endpoints, HTTP methods, status codes
- Docker Desktop installed and running
- A Fly.io account (free tier is sufficient, fly.io)
- The Fly CLI installed (brew install flyctl on macOS, or the official installer on Windows/Linux)
- A PostgreSQL client for inspecting the database, like TablePlus or DBeaver – both work well

:::

---

## How Dart Works on the Server

When you run a Flutter app, the Flutter framework is doing an enormous amount of work, managing the widget tree, handling the render pipeline, coordinating state, and responding to platform events. Your Dart code sits on top of all of that.

On the server, none of that exists. There's no widget tree. There's no framework managing a UI lifecycle. There's just a Dart process running, listening on a port, receiving HTTP requests, doing work, and sending responses.

Dart's standard library, dart:io, has everything needed to do this at the lowest level:

```dart
import 'dart:io';

void main() async {
  final server = await HttpServer.bind('0.0.0.0', 8080);
  print('Server running on port 8080');

  await for (final request in server) {
    request.response
      ..statusCode = 200
      ..write('Hello from Dart')
      ..close();
  }
}
```

This is a working HTTP server in raw Dart. No packages, no framework. Every request comes in through the HttpServer stream, and you write directly to the response.

This works, but it scales poorly. As soon as you need routing, middleware, authentication, and structured error handling, raw dart:io becomes difficult to manage. That is the problem Shelf solves.

---

## What is Shelf?

Shelf is a composable web server middleware library for Dart, maintained by the Dart team. It doesn't try to be a full framework – instead, it gives you the primitives to build one, or to assemble exactly what you need.

The Shelf mental model is built on four concepts:

- **Handler:** a function that takes a Request and returns a Response. Everything in Shelf is ultimately a handler.
- **Middleware:** a function that wraps a handler, adding behaviour before or after it runs. Logging, authentication, and error handling are all middleware.
- **Pipeline:** a chain of middleware with a handler at the end. Requests flow through the middleware chain before reaching the handler.
- **Router:** maps URL patterns and HTTP methods to specific handlers.

If you've used Flutter's Navigator or provider middleware concepts, the composition model will feel familiar. Small, single-responsibility pieces assembled into a working whole.

---

## Project Setup

### Creating the Project

Dart includes a server-side project template that gives us a clean starting point:

```sh
dart create -t server-shelf user_profile_api
cd user_profile_api
```

Add the dependencies we need to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
name: user_profile_api
description: User and Profile Management REST API built with Dart and Shelf
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  shelf: ^1.4.1
  shelf_router: ^1.1.4
  postgres: ^3.3.0
  dart_jsonwebtoken: ^2.12.0
  bcrypt: ^1.1.3
  dotenv: ^4.1.0
  crypto: ^3.0.3

dev_dependencies:
  lints: ^3.0.0
  test: ^1.24.0
```

Run:

```sh
dart pub get
```

### Project Structure

Now we'll build a backend project structure that Flutter engineers will find intuitive, that's familiar enough to navigate immediately, and that's correct enough for backend conventions:

```sh title="file structure"
user_profile_api/
  bin/
    server.dart              # entry point
  lib/
    config/
      database.dart          # connection manager
      env.dart               # environment config
    handlers/
      auth_handler.dart      # auth endpoints
      user_handler.dart      # user endpoints
      profile_handler.dart   # profile endpoints
    middleware/
      auth_middleware.dart   # JWT validation
      error_middleware.dart  # global error handling
      logger_middleware.dart # request logging
    models/
      user.dart
      profile.dart
    repositories/
      user_repository.dart
      profile_repository.dart
    services/
      auth_service.dart      # JWT + password logic
    router.dart              # route definitions
  migrations/
    001_create_users.sql
    002_create_profiles.sql
  docker-compose.yml
  Dockerfile
  .env
  .env.example
```

This separation of concerns maps directly to what you'll already know if you're a Flutter engineer: models, repositories, and services are the same concepts. Handlers replace ViewModels or Controllers. Middleware replaces interceptors.

### Database Setup with Docker

Create <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in the project root:

```yaml title="docker-compose.yaml"
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: user_profile_db
    environment:
      POSTGRES_DB: user_profile_api
      POSTGRES_USER: dart_user
      POSTGRES_PASSWORD: dart_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start the database:

```sh
docker compose up -d
```

Verify that it's running:

```sh
docker compose ps
# user_profile_db   running   0.0.0.0:5432->5432/tcp
```

### Environment Configuration

Create <VPIcon icon="iconfont icon-dotenv"/>`.env` in the project root:

```sh title=".env"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_profile_api
DB_USER=dart_user
DB_PASSWORD=dart_password
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRY_HOURS=24
PORT=8080
```

Create <VPIcon icon="iconfont icon-dotenv"/>`.env.example` with the same keys but no values. This is what you commit to Git:

```sh title=".env.example"
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
JWT_EXPIRY_HOURS=
PORT=
```

Add <VPIcon icon="iconfont icon-dotenv"/>`.env` to <VPIcon icon="iconfont icon-git"/>`.gitignore`:

```plaintext title=".gitignore"
.env
```

Create <VPIcon icon="fas fa-folder-open"/>`lib/config/`<VPIcon icon="fa-brands fa-dart-lang"/>`env.dart`:

```dart title="lib/config/env.dart"
import 'package:dotenv/dotenv.dart';

class Env {
  static late final DotEnv _env;

  static void load() {
    _env = DotEnv(includePlatformEnvironment: true)..load();
  }

  static String get dbHost => _env['DB_HOST'] ?? 'localhost';
  static int get dbPort => int.parse(_env['DB_PORT'] ?? '5432');
  static String get dbName => _env['DB_NAME'] ?? 'user_profile_api';
  static String get dbUser => _env['DB_USER'] ?? 'dart_user';
  static String get dbPassword => _env['DB_PASSWORD'] ?? '';
  static String get jwtSecret => _env['JWT_SECRET'] ?? '';
  static int get jwtExpiryHours => int.parse(_env['JWT_EXPIRY_HOURS'] ?? '24');
  static int get port => int.parse(_env['PORT'] ?? '8080');
}
```

includePlatformEnvironment: true means the Env class reads from both the .env file and real system environment variables, so the same code works locally with a .env file and in production with injected environment variables.

---

## Table of Contents

- [Shelf Core Concepts](#heading-shelf-core-concepts)
- [Connecting to PostgreSQL](#heading-connecting-to-postgresql)
- [Building the API](#heading-building-the-api)
- [Authentication](#heading-authentication)
- [Error Handling](#heading-error-handling)
- [Wiring Everything Together](#heading-wiring-everything-together)
- [Deployment](#heading-deployment)
- [Testing the API](#heading-testing-the-api)

---

## Shelf Core Concepts

Before building the API, it's worth understanding each Shelf concept properly – not just what it does, but why it's designed the way it is.

### Handlers

A handler is the most fundamental unit in Shelf. It's simply a function:

```dart
import 'package:shelf/shelf.dart';

Response helloHandler(Request request) {
  return Response.ok('Hello, Dart backend!');
}
```

Request in, Response out. That's the entire contract. Every endpoint you write is a handler. Every piece of middleware is a function that takes a handler and returns a handler.

Handlers can be async:

```dart
Future<Response> getUserHandler(Request request) async {
  final users = await userRepository.findAll();
  return Response.ok(jsonEncode(users));
}
```

### Request and Response

Request gives you everything about the incoming HTTP call:

```dart
Future<Response> handler(Request request) async {
  // URL and path
  print(request.url);           // the full URL
  print(request.url.path);      // just the path

  // Path parameters (when using shelf_router)
  final id = request.params['id'];

  // Query parameters
  final page = request.url.queryParameters['page'];

  // Headers
  final auth = request.headers['authorization'];

  // Body
  final body = await request.readAsString();
  final json = jsonDecode(body) as Map<String, dynamic>;

  return Response.ok('handled');
}
```

Response has named constructors for common status codes:

```dart
Response.ok(body)           // 200
Response.notFound(body)     // 404
Response(201, body: body)   // any status code
Response(400, body: body)   // bad request
Response(401, body: body)   // unauthorized
Response(500, body: body)   // server error
```

Always set the Content-Type header when returning JSON:

```dart
Response.ok(
  jsonEncode({'message': 'success'}),
  headers: {'Content-Type': 'application/json'},
)
```

### Router

shelf_router maps URL patterns and HTTP methods to handlers:

```dart
import 'package:shelf_router/shelf_router.dart';

final router = Router();

router.get('/users', getAllUsersHandler);
router.get('/users/<id>', getUserHandler);
router.post('/users', createUserHandler);
router.put('/users/<id>', updateUserHandler);
router.delete('/users/<id>', deleteUserHandler);
```

The syntax defines a path parameter. Access it inside the handler via request.params['id'].

### Pipeline and Middleware

A Pipeline chains middleware together with a handler at the end:

```dart
import 'package:shelf/shelf.dart';

final handler = Pipeline()
    .addMiddleware(loggerMiddleware())
    .addMiddleware(errorMiddleware())
    .addMiddleware(authMiddleware())
    .addHandler(router.call);
```

Middleware is a function with this signature:

```dart
Middleware myMiddleware() {
  return (Handler innerHandler) {
    return (Request request) async {
      // Before the handler runs
      print('Request received: \({request.method} \){request.url}');

      final response = await innerHandler(request);

      // After the handler runs
      print('Response sent: ${response.statusCode}');

      return response;
    };
  };
}
```

The outer function returns a Middleware. That Middleware is a function that takes the next Handler in the chain and returns a new Handler. This nesting is what allows middleware to run code both before and after the inner handler.

---

## Connecting to PostgreSQL

### The Database Connection Manager

Create <VPIcon icon="fas fa-folder-open"/>`lib/config/`<VPIcon icon="fa-brands fa-dart-lang"/>`database.dart`:

```dart title="lib/config/database.dart"
import 'package:postgres/postgres.dart';
import 'env.dart';

class Database {
  static Connection? _connection;

  static Future<Connection> get connection async {
    if (_connection != null) return _connection!;
    _connection = await _connect();
    return _connection!;
  }

  static Future<Connection> _connect() async {
    final conn = await Connection.open(
      Endpoint(
        host: Env.dbHost,
        port: Env.dbPort,
        database: Env.dbName,
        username: Env.dbUser,
        password: Env.dbPassword,
      ),
      settings: const ConnectionSettings(
        sslMode: SslMode.disable,
      ),
    );

    print('✅ Database connected: \({Env.dbHost}:\){Env.dbPort}/${Env.dbName}');
    return conn;
  }

  static Future<void> close() async {
    await _connection?.close();
    _connection = null;
  }
}
```

This is a singleton connection manager – the same pattern Flutter engineers use for shared services. The connection is created once on first access and reused for every subsequent database call.

### Running Migrations

Create the <VPIcon icon="fas fa-folder-open"/>`migrations` folder and SQL files:

```sql title="migrations/001_create_users.sql"
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

```sql title="migrations/002_create_profiles.sql"
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  avatar_url VARCHAR(500),
  phone VARCHAR(20),
  location VARCHAR(255),
  website VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
```

Create a migration runner in <VPIcon icon="fas fa-folder-open"/>`lib/config/`<VPIcon icon="fa-brands fa-dart-lang"/>`database.dart`:

```dart title="lib/config/database.dart"
static Future<void> runMigrations() async {
  final conn = await connection;
  final migrationsDir = Directory('migrations');

  final files = migrationsDir
      .listSync()
      .whereType<File>()
      .where((f) => f.path.endsWith('.sql'))
      .toList()
      .sort((a, b) => a.path.compareTo(b.path));

  for (final file in files) {
    final sql = await file.readAsString();
    await conn.execute(sql);
    print('✅ Migration applied: ${file.path}');
  }
}
```

---

## Building the API

With the database connected and migrations in place, we can now build the actual API layer.

This section covers the models, repositories, and handlers for both users and profiles. Models define the shape of the data, repositories handle all database interactions, and handlers translate HTTP requests into repository calls and send responses back to the client. We'll build the user layer first, then the profile layer on top of it.

### The User Model

The User model represents a single user record in the database. It maps directly to the users table created in the migration and handles two-way conversion between database rows and Dart objects.

Create <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`user.dart`:

```dart :collapsed-lines title="lib/models/user.dart"
class User {
  final String id;
  final String email;
  final String passwordHash;
  final String firstName;
  final String lastName;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

  const User({
    required this.id,
    required this.email,
    required this.passwordHash,
    required this.firstName,
    required this.lastName,
    required this.isActive,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromRow(Map<String, dynamic> row) => User(
    id: row['id'] as String,
    email: row['email'] as String,
    passwordHash: row['password_hash'] as String,
    firstName: row['first_name'] as String,
    lastName: row['last_name'] as String,
    isActive: row['is_active'] as bool,
    createdAt: row['created_at'] as DateTime,
    updatedAt: row['updated_at'] as DateTime,
  );

  // Never include passwordHash in JSON responses
  Map<String, dynamic> toJson() => {
    'id': id,
    'email': email,
    'firstName': firstName,
    'lastName': lastName,
    'isActive': isActive,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };
}
```

fromRow maps a PostgreSQL result row to a User. toJson deliberately excludes passwordHash – you should never return password data in API responses.

### The User Repository

The UserRepository is the single point of contact between the application and the users table. Every database operation for users goes through here, keeping the SQL contained and the handlers clean.

Create <VPIcon icon="fas fa-folder-open"/>`lib/repositories/`<VPIcon icon="fa-brands fa-dart-lang"/>`user_repository.dart`:

```dart :collapsed-lines title="lib/repositories/user_repository.dart"
import 'dart:async';
import 'package:postgres/postgres.dart';
import '../config/database.dart';
import '../models/user.dart';

class UserRepository {
  Future<Connection> get _conn => Database.connection;

  Future<List<User>> findAll() async {
    final conn = await _conn;
    final results = await conn.execute(
      'SELECT * FROM users WHERE is_active = TRUE ORDER BY created_at DESC',
    );

    return results.map((row) => User.fromRow(row.toColumnMap())).toList();
  }

  Future<User?> findById(String id) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('SELECT * FROM users WHERE id = @id AND is_active = TRUE'),
      parameters: {'id': id},
    );

    if (results.isEmpty) return null;
    return User.fromRow(results.first.toColumnMap());
  }

  Future<User?> findByEmail(String email) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('SELECT * FROM users WHERE email = @email'),
      parameters: {'email': email},
    );

    if (results.isEmpty) return null;
    return User.fromRow(results.first.toColumnMap());
  }

  Future<User> create({
    required String email,
    required String passwordHash,
    required String firstName,
    required String lastName,
  }) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('''
        INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES (@email, @passwordHash, @firstName, @lastName)
        RETURNING *
      '''),
      parameters: {
        'email': email,
        'passwordHash': passwordHash,
        'firstName': firstName,
        'lastName': lastName,
      },
    );

    return User.fromRow(results.first.toColumnMap());
  }

  Future<User?> update({
    required String id,
    String? firstName,
    String? lastName,
  }) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('''
        UPDATE users
        SET
          first_name = COALESCE(@firstName, first_name),
          last_name  = COALESCE(@lastName, last_name),
          updated_at = NOW()
        WHERE id = @id AND is_active = TRUE
        RETURNING *
      '''),
      parameters: {
        'id': id,
        'firstName': firstName,
        'lastName': lastName,
      },
    );

    if (results.isEmpty) return null;
    return User.fromRow(results.first.toColumnMap());
  }

  Future<bool> delete(String id) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('''
        UPDATE users SET is_active = FALSE, updated_at = NOW()
        WHERE id = @id AND is_active = TRUE
        RETURNING id
      '''),
      parameters: {'id': id},
    );

    return results.isNotEmpty;
  }
}
```

A few things worth noting here. Sql.named uses named parameters (`@paramName`) instead of positional parameters. This prevents SQL injection and makes queries readable.

Also, the delete operation is a soft delete. It sets `is_active = FALSE` rather than removing the row. This is the standard production approach: data is never truly deleted, it's deactivated.

`COALESCE(@firstName, first_name)` on the update means: use the new value if provided, otherwise keep the existing value. This handles partial updates cleanly without requiring all fields every time.

### User Handlers

The UserHandler class exposes the repository operations as HTTP endpoints. It owns a Router instance internally and maps each route to a private method, keeping the routing logic and the handler logic together in one place.

Create <VPIcon icon="fas fa-folder-open"/>`lib/handlers/`<VPIcon icon="fa-brands fa-dart-lang"/>`user_handler.dart`:

```dart :collapsed-lines title="lib/handlers/user_handler.dart"
import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import '../repositories/user_repository.dart';

class UserHandler {
  final UserRepository _repository;

  UserHandler(this._repository);

  Router get router {
    final router = Router();
    router.get('/', _getAll);
    router.get('/<id>', _getOne);
    router.put('/<id>', _update);
    router.delete('/<id>', _delete);
    return router;
  }

  Future<Response> _getAll(Request request) async {
    final users = await _repository.findAll();
    return Response.ok(
      jsonEncode(users.map((u) => u.toJson()).toList()),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _getOne(Request request, String id) async {
    final user = await _repository.findById(id);

    if (user == null) {
      return Response.notFound(
        jsonEncode({'error': 'User not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    return Response.ok(
      jsonEncode(user.toJson()),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _update(Request request, String id) async {
    final body = jsonDecode(await request.readAsString()) as Map<String, dynamic>;

    final user = await _repository.update(
      id: id,
      firstName: body['firstName'] as String?,
      lastName: body['lastName'] as String?,
    );

    if (user == null) {
      return Response.notFound(
        jsonEncode({'error': 'User not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    return Response.ok(
      jsonEncode(user.toJson()),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _delete(Request request, String id) async {
    final deleted = await _repository.delete(id);

    if (!deleted) {
      return Response.notFound(
        jsonEncode({'error': 'User not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    return Response(
      204,
      headers: {'Content-Type': 'application/json'},
    );
  }
}
```

### The Profile Model

The Profile model represents a user's extended information, stored separately from the core user record. The one-to-one relationship is enforced by the unique index on `user_id` in the profiles table. All fields except `userId` are nullable since a profile can be created with partial information and filled in over time.

Create <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile.dart`:

```dart :collapsed-lines title="lib/models/profile.dart"
class Profile {
  final String id;
  final String userId;
  final String? bio;
  final String? avatarUrl;
  final String? phone;
  final String? location;
  final String? website;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Profile({
    required this.id,
    required this.userId,
    this.bio,
    this.avatarUrl,
    this.phone,
    this.location,
    this.website,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Profile.fromRow(Map<String, dynamic> row) => Profile(
    id: row['id'] as String,
    userId: row['user_id'] as String,
    bio: row['bio'] as String?,
    avatarUrl: row['avatar_url'] as String?,
    phone: row['phone'] as String?,
    location: row['location'] as String?,
    website: row['website'] as String?,
    createdAt: row['created_at'] as DateTime,
    updatedAt: row['updated_at'] as DateTime,
  );

  Map<String, dynamic> toJson() => {
    'id': id,
    'userId': userId,
    'bio': bio,
    'avatarUrl': avatarUrl,
    'phone': phone,
    'location': location,
    'website': website,
    'createdAt': createdAt.toIso8601String(),
    'updatedAt': updatedAt.toIso8601String(),
  };
}
```

### The Profile Repository

The ProfileRepository handles all database operations for the profiles table. Unlike the user repository which looks up by id, most profile operations use userId as the lookup key since that is how the client references a profile — by whose it belongs to, not by its own internal ID.

Create <VPIcon icon="fas fa-folder-open"/>`lib/repositories/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile_repository.dart`:

```dart :collapsed-lines title="lib/repositories/profile_repository.dart"
import 'package:postgres/postgres.dart';
import '../config/database.dart';
import '../models/profile.dart';

class ProfileRepository {
  Future<Connection> get _conn => Database.connection;

  Future<Profile?> findByUserId(String userId) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('SELECT * FROM profiles WHERE user_id = @userId'),
      parameters: {'userId': userId},
    );

    if (results.isEmpty) return null;
    return Profile.fromRow(results.first.toColumnMap());
  }

  Future<Profile> create({
    required String userId,
    String? bio,
    String? avatarUrl,
    String? phone,
    String? location,
    String? website,
  }) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('''
        INSERT INTO profiles (user_id, bio, avatar_url, phone, location, website)
        VALUES (@userId, @bio, @avatarUrl, @phone, @location, @website)
        RETURNING *
      '''),
      parameters: {
        'userId': userId,
        'bio': bio,
        'avatarUrl': avatarUrl,
        'phone': phone,
        'location': location,
        'website': website,
      },
    );

    return Profile.fromRow(results.first.toColumnMap());
  }

  Future<Profile?> update({
    required String userId,
    String? bio,
    String? avatarUrl,
    String? phone,
    String? location,
    String? website,
  }) async {
    final conn = await _conn;
    final results = await conn.execute(
      Sql.named('''
        UPDATE profiles
        SET
          bio        = COALESCE(@bio, bio),
          avatar_url = COALESCE(@avatarUrl, avatar_url),
          phone      = COALESCE(@phone, phone),
          location   = COALESCE(@location, location),
          website    = COALESCE(@website, website),
          updated_at = NOW()
        WHERE user_id = @userId
        RETURNING *
      '''),
      parameters: {
        'userId': userId,
        'bio': bio,
        'avatarUrl': avatarUrl,
        'phone': phone,
        'location': location,
        'website': website,
      },
    );

    if (results.isEmpty) return null;
    return Profile.fromRow(results.first.toColumnMap());
  }
}
```

### Profile Handlers

The ProfileHandler manages the profile endpoints nested under a user's ID. Before every operation, it verifies the parent user exists — a profile can't be created, fetched, or updated for a user that doesn't exist. It also prevents duplicate profiles by checking for an existing record before allowing a create.

Create <VPIcon icon="fas fa-folder-open"/>`lib/handlers/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile_handler.dart`:

```dart :collapsed-lines title="lib/handlers/profile_handler.dart"
import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import '../repositories/profile_repository.dart';
import '../repositories/user_repository.dart';

class ProfileHandler {
  final ProfileRepository _profileRepository;
  final UserRepository _userRepository;

  ProfileHandler(this._profileRepository, this._userRepository);

  Router get router {
    final router = Router();
    router.get('/<userId>/profile', _getProfile);
    router.post('/<userId>/profile', _createProfile);
    router.put('/<userId>/profile', _updateProfile);
    return router;
  }

  Future<Response> _getProfile(Request request, String userId) async {
    final user = await _userRepository.findById(userId);
    if (user == null) {
      return Response.notFound(
        jsonEncode({'error': 'User not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final profile = await _profileRepository.findByUserId(userId);
    if (profile == null) {
      return Response.notFound(
        jsonEncode({'error': 'Profile not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    return Response.ok(
      jsonEncode(profile.toJson()),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _createProfile(Request request, String userId) async {
    final user = await _userRepository.findById(userId);
    if (user == null) {
      return Response.notFound(
        jsonEncode({'error': 'User not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final existing = await _profileRepository.findByUserId(userId);
    if (existing != null) {
      return Response(
        409,
        body: jsonEncode({'error': 'Profile already exists for this user'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final body = jsonDecode(await request.readAsString()) as Map<String, dynamic>;

    final profile = await _profileRepository.create(
      userId: userId,
      bio: body['bio'] as String?,
      avatarUrl: body['avatarUrl'] as String?,
      phone: body['phone'] as String?,
      location: body['location'] as String?,
      website: body['website'] as String?,
    );

    return Response(
      201,
      body: jsonEncode(profile.toJson()),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _updateProfile(Request request, String userId) async {
    final body = jsonDecode(await request.readAsString()) as Map<String, dynamic>;

    final profile = await _profileRepository.update(
      userId: userId,
      bio: body['bio'] as String?,
      avatarUrl: body['avatarUrl'] as String?,
      phone: body['phone'] as String?,
      location: body['location'] as String?,
      website: body['website'] as String?,
    );

    if (profile == null) {
      return Response.notFound(
        jsonEncode({'error': 'Profile not found'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    return Response.ok(
      jsonEncode(profile.toJson()),
      headers: {'Content-Type': 'application/json'},
    );
  }
}
```

---

## Authentication

With the core user and profile CRUD in place, the next step is securing the API.

Authentication in this project works in two parts: an AuthService handles the cryptographic operations — password hashing and JWT generation and verification — and an AuthHandler exposes the register and login endpoints that clients call to get a token. Once a token is issued, the AuthMiddleware validates it on every protected request before it reaches a handler.

### Password Hashing

Create <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_service.dart`:

```dart :collapsed-lines title="lib/services/auth_service.dart"
import 'package:bcrypt/bcrypt.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import '../config/env.dart';
import '../models/user.dart';

class AuthService {
  String hashPassword(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt());
  }

  bool verifyPassword(String password, String hash) {
    return BCrypt.checkpw(password, hash);
  }

  String generateToken(User user) {
    final jwt = JWT(
      {
        'sub': user.id,
        'email': user.email,
        'iat': DateTime.now().millisecondsSinceEpoch ~/ 1000,
      },
    );

    return jwt.sign(
      SecretKey(Env.jwtSecret),
      expiresIn: Duration(hours: Env.jwtExpiryHours),
    );
  }

  JWT? verifyToken(String token) {
    try {
      return JWT.verify(token, SecretKey(Env.jwtSecret));
    } catch (_) {
      return null;
    }
  }
}
```

BCrypt.hashpw generates a salted hash. BCrypt.checkpw verifies a plain password against a stored hash. The salt is embedded in the hash itself – you don't store it separately.

verifyToken returns null on any failure, expired token, invalid signature, or malformed token rather than throwing. This keeps the auth middleware clean.

### Auth Handlers

Create <VPIcon icon="fas fa-folder-open"/>`lib/handlers/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_handler.dart`:

```dart :collapsed-lines title="lib/handlers/auth_handler.dart"
import 'dart:convert';
import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import '../repositories/user_repository.dart';
import '../services/auth_service.dart';

class AuthHandler {
  final UserRepository _userRepository;
  final AuthService _authService;

  AuthHandler(this._userRepository, this._authService);

  Router get router {
    final router = Router();
    router.post('/register', _register);
    router.post('/login', _login);
    return router;
  }

  Future<Response> _register(Request request) async {
    final body = jsonDecode(await request.readAsString()) as Map<String, dynamic>;

    final email = body['email'] as String?;
    final password = body['password'] as String?;
    final firstName = body['firstName'] as String?;
    final lastName = body['lastName'] as String?;

    if (email == null || password == null || firstName == null || lastName == null) {
      return Response(
        400,
        body: jsonEncode({'error': 'email, password, firstName, and lastName are required'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    if (password.length < 8) {
      return Response(
        400,
        body: jsonEncode({'error': 'Password must be at least 8 characters'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final existing = await _userRepository.findByEmail(email);
    if (existing != null) {
      return Response(
        409,
        body: jsonEncode({'error': 'An account with this email already exists'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final passwordHash = _authService.hashPassword(password);

    final user = await _userRepository.create(
      email: email,
      passwordHash: passwordHash,
      firstName: firstName,
      lastName: lastName,
    );

    final token = _authService.generateToken(user);

    return Response(
      201,
      body: jsonEncode({
        'user': user.toJson(),
        'token': token,
      }),
      headers: {'Content-Type': 'application/json'},
    );
  }

  Future<Response> _login(Request request) async {
    final body = jsonDecode(await request.readAsString()) as Map<String, dynamic>;

    final email = body['email'] as String?;
    final password = body['password'] as String?;

    if (email == null || password == null) {
      return Response(
        400,
        body: jsonEncode({'error': 'email and password are required'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final user = await _userRepository.findByEmail(email);

    // Deliberately vague error, never confirm whether an email exists
    if (user == null || !_authService.verifyPassword(password, user.passwordHash)) {
      return Response(
        401,
        body: jsonEncode({'error': 'Invalid email or password'}),
        headers: {'Content-Type': 'application/json'},
      );
    }

    final token = _authService.generateToken(user);

    return Response.ok(
      jsonEncode({
        'user': user.toJson(),
        'token': token,
      }),
      headers: {'Content-Type': 'application/json'},
    );
  }
}
```

The login error message is deliberately vague: "Invalid email or password" rather than "Email not found" or "Wrong password." Confirming which part is wrong helps attackers enumerate valid accounts.

### Auth Middleware

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_middleware.dart`:

```dart title="lib/middleware/auth_middleware.dart"
import 'dart:convert';
import 'package:shelf/shelf.dart';
import '../services/auth_service.dart';

Middleware authMiddleware(AuthService authService) {
  return (Handler innerHandler) {
    return (Request request) async {
      final authHeader = request.headers['authorization'];

      if (authHeader == null || !authHeader.startsWith('Bearer ')) {
        return Response(
          401,
          body: jsonEncode({'error': 'Authorization header missing or malformed'}),
          headers: {'Content-Type': 'application/json'},
        );
      }

      final token = authHeader.substring(7); // Remove 'Bearer '
      final jwt = authService.verifyToken(token);

      if (jwt == null) {
        return Response(
          401,
          body: jsonEncode({'error': 'Invalid or expired token'}),
          headers: {'Content-Type': 'application/json'},
        );
      }

      // Attach the user ID to the request context for downstream handlers
      final updatedRequest = request.change(
        context: {
          ...request.context,
          'userId': jwt.payload['sub'] as String,
          'userEmail': jwt.payload['email'] as String,
        },
      );

      return innerHandler(updatedRequest);
    };
  };
}
```

`request.change(context: {...})` is how Shelf passes data from middleware to handlers, the equivalent of attaching data to a request in Express or ASP.NET middleware. Any handler downstream can read `request.context['userId']` to know which user is authenticated.

---

## Error Handling

No matter how carefully you write your handlers, unexpected failures will happen in production — malformed request bodies, database timeouts, unhandled edge cases.

Rather than letting each handler manage its own error responses individually, we'll centralise error handling in a single middleware that wraps the entire pipeline. This guarantees a consistent error response shape across every endpoint and prevents internal error details from leaking to the client.

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`error_middleware.dart`:

```dart title="lib/middleware/error_middleware.dart"
import 'dart:convert';
import 'package:shelf/shelf.dart';

Middleware errorMiddleware() {
  return (Handler innerHandler) {
    return (Request request) async {
      try {
        return await innerHandler(request);
      } on FormatException catch (e) {
        return Response(
          400,
          body: jsonEncode({'error': 'Invalid request body: ${e.message}'}),
          headers: {'Content-Type': 'application/json'},
        );
      } catch (e, stackTrace) {
        // Log the full error and stack trace server-side
        print('Unhandled error: $e');
        print(stackTrace);

        // Never expose internal error details to the client
        return Response(
          500,
          body: jsonEncode({'error': 'An internal server error occurred'}),
          headers: {'Content-Type': 'application/json'},
        );
      }
    };
  };
}
```

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`logger_middleware.dart`:

```dart title="lib/middleware/logger_middleware.dart"
import 'package:shelf/shelf.dart';

Middleware loggerMiddleware() {
  return (Handler innerHandler) {
    return (Request request) async {
      final start = DateTime.now();

      final response = await innerHandler(request);

      final duration = DateTime.now().difference(start).inMilliseconds;
      print(
        '[${DateTime.now().toIso8601String()}] '
        '\({request.method} \){request.url.path} '
        '→ \({response.statusCode} (\){duration}ms)',
      );

      return response;
    };
  };
}
```

---

## Wiring Everything Together

With the handlers, repositories, and middleware all in place, the final step is connecting them into a single running server. The router maps URL prefixes to their handler, the pipeline stacks the middleware in the correct order, and the entry point boots everything up in sequence — loading environment variables, running migrations, and starting the server.

Create <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`router.dart`:

```dart title="lib/router.dart"
import 'package:shelf_router/shelf_router.dart';
import 'handlers/auth_handler.dart';
import 'handlers/user_handler.dart';
import 'handlers/profile_handler.dart';
import 'middleware/auth_middleware.dart';
import 'repositories/user_repository.dart';
import 'repositories/profile_repository.dart';
import 'services/auth_service.dart';

Router createRouter() {
  final userRepository = UserRepository();
  final profileRepository = ProfileRepository();
  final authService = AuthService();

  final authHandler = AuthHandler(userRepository, authService);
  final userHandler = UserHandler(userRepository);
  final profileHandler = ProfileHandler(profileRepository, userRepository);

  final router = Router();

  // Public routes, no auth required
  router.mount('/auth', authHandler.router.call);

  // Protected routes, auth middleware applied
  router.mount(
    '/users',
    Pipeline()
        .addMiddleware(authMiddleware(authService))
        .addHandler(userHandler.router.call),
  );

  router.mount(
    '/users',
    Pipeline()
        .addMiddleware(authMiddleware(authService))
        .addHandler(profileHandler.router.call),
  );

  return router;
}
```

Create the entry point <VPIcon icon="fas fa-folder-open"/>`bin/`<VPIcon icon="fa-brands fa-dart-lang"/>`server.dart`:

```dart title="bin/server.dart"
import 'dart:io';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import '../lib/config/database.dart';
import '../lib/config/env.dart';
import '../lib/middleware/error_middleware.dart';
import '../lib/middleware/logger_middleware.dart';
import '../lib/router.dart';

void main() async {
  // Load environment variables
  Env.load();

  // Run database migrations
  await Database.runMigrations();

  // Build the handler pipeline
  final router = createRouter();

  final handler = Pipeline()
      .addMiddleware(errorMiddleware())
      .addMiddleware(loggerMiddleware())
      .addHandler(router.call);

  // Start the server
  final server = await shelf_io.serve(
    handler,
    InternetAddress.anyIPv4,
    Env.port,
  );

  print('🚀 Server running on port ${server.port}');
}
```

Run the server:

```sh
dart run bin/server.dart
#
# ✅ Database connected: localhost:5432/user_profile_api
# ✅ Migration applied: `migrations/001_create_users.sq`l
# ✅ Migration applied: `migrations/002_create_profiles.sq`l
# 🚀 Server running on port 8080
```

---

## Deployment

The server is running locally and all endpoints are working. Now it's time to ship it.

We'll cover two deployment paths: first packaging the app and database together with Docker Compose for local production testing, then deploying to Fly.io where your API will be accessible over the internet with a managed PostgreSQL database and automatic TLS.

### Dockerfile

Create <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` in the project root:

```dockerfile title="Dockerfile"
FROM dart:stable AS build

WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

COPY . .
RUN dart compile exe bin/server.dart -o bin/server

FROM debian:stable-slim

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/bin/server bin/server
COPY --from=build /app/migrations migrations/

EXPOSE 8080

CMD ["bin/server"]
```

This is a multi-stage build. The first stage uses the full Dart SDK image to compile the server to a native binary. The second stage copies only the compiled binary and migrations into a minimal Debian image – no Dart SDK, no source code, no build tools. The final image is lean and production-ready.

### Docker Compose for Local Production Testing

Update <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` to include the app alongside the database:

```yaml title="docker-compose.yaml"
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: user_profile_db
    environment:
      POSTGRES_DB: user_profile_api
      POSTGRES_USER: dart_user
      POSTGRES_PASSWORD: dart_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dart_user -d user_profile_api"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    build: .
    container_name: user_profile_api
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: user_profile_api
      DB_USER: dart_user
      DB_PASSWORD: dart_password
      JWT_SECRET: local_test_secret_replace_in_production
      JWT_EXPIRY_HOURS: 24
      PORT: 8080
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
```

The healthcheck on the Postgres service ensures that the API container only starts once the database is ready to accept connections (a common production problem when services start simultaneously).

Build and run everything:

```sh
docker compose up --build
```

### Deploying to Fly.io

Fly.io is one of the cleanest deployment targets for containerized backend services. It handles global distribution, automatic TLS, and managed PostgreSQL databases.

#### Step 1 – Install and authenticate

```sh
brew install flyctl
# Authenticate
fly auth login
```

#### Step 2 – Launch the app

```sh
fly launch
```

Fly detects the <VPIcon icon="fa-brands fa-docker"/>`Dockerfile` automatically and asks a few questions: app name, region, and whether to create a PostgreSQL database. Answer yes to the PostgreSQL prompt, and Fly will provision a managed database and inject the connection string automatically.

#### Step 3 – Set environment variables

```sh
fly secrets set JWT_SECRET="your_production_secret_here"
fly secrets set JWT_EXPIRY_HOURS="24"
```

Database connection variables are set automatically by Fly when it provisions the PostgreSQL cluster.

#### Step 4 – Deploy

```sh
fly deploy
```

Fly builds the Docker image, pushes it to their registry, and deploys it to your chosen region. Once complete:

```sh
fly status
# Your app is running at https://your-app-name.fly.dev
```

**Step 5 – Verify the deployment:**

```sh
curl https://your-app-name.fly.dev/auth/register \
-X POST \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123","firstName":"Seyi","lastName":"Dev"}'
```

---

## Testing the API

With the server running locally on port 8080, here's the full flow to verify that everything works end to end.

Register a user:

```sh
curl http://localhost:8080/auth/register \
-X POST \
-H "Content-Type: application/json" \
-d '{
  "email": "seyi@example.com",
  "password": "securepassword",
  "firstName": "Seyi",
  "lastName": "Dev"
}'
```

Response:

```json
{
  "user": {
    "id": "uuid-here",
    "email": "seyi@example.com",
    "firstName": "Seyi",
    "lastName": "Dev",
    "isActive": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGci..."
}
```

Login:

```sh
curl http://localhost:8080/auth/login \
-X POST \
-H "Content-Type: application/json" \
-d '{"email": "seyi@example.com", "password": "securepassword"}'
```

Get all users (authenticated):

```sh
curl http://localhost:8080/users \
-H "Authorization: Bearer eyJhbGci..."
```

Create a profile:

```sh
curl http://localhost:8080/users/{userId}/profile \
-X POST \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{
  "bio": "Flutter engineer turned backend developer",
  "location": "Lagos, Nigeria",
  "website": "https://example.com"
}'
```

Update a user:

```sh
curl http://localhost:8080/users/{userId} \
-X PUT \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{"firstName": "Oluwaseyi"}'
```

Delete a user:

```sh
curl http://localhost:8080/users/{userId} \
-X DELETE \
-H "Authorization: Bearer eyJhbGci..."
```

---

## Conclusion

You just built and deployed a production-grade REST API in Dart – the same language you already know from Flutter. No new language, no new paradigm. Just Dart running in a different context.

The Shelf mental model (Handlers, Middleware, Pipelines, Routers) is deliberately minimal. It doesn't make decisions for you. It gives you composable primitives and lets you assemble them into exactly the architecture your project needs. That philosophy will feel familiar to Flutter engineers who build their own clean architecture rather than relying on a prescriptive framework.

What you built here – models, repositories, services, handlers, and middleware – is the same separation of concerns you apply in Flutter, applied to the backend. The concepts transfer. The Dart skills transfer. The architecture discipline transfers.

With this, you'll understand that Dart is a powerful language that cuts across both frontend and backend ecosystems. Aside from Shelf, we have Dartfrog and Serverpod which still functions well on the backend side of things. More on those in upcoming articles.

So yeah, try this out and thank me later!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Flutter to Backend: How to Build and Ship Production REST APIs with Dart and Shelf",
  "desc": "As a Flutter engineer, you already know Dart. You understand async/await, you work with models and repositories, you think in clean architecture, and you have shipped real applications. The gap betwee",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-and-ship-production-rest-apis-with-dart-and-shelf.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
