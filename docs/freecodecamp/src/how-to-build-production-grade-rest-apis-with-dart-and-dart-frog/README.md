---
lang: en-US
title: "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog"
description: "Article(s) > From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog"
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
      content: "Article(s) > From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog"
    - property: og:description
      content: "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-grade-rest-apis-with-dart-and-dart-frog.html
prev: /programming/dart/articles/README.md
date: 2026-06-12
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a80b24db-c53e-4d36-85cd-0cb999676145.png
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
  name="From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog"
  desc="Dart backend frameworks exist on a spectrum. At the minimal end sits Shelf, with raw primitives and full control. You wire everything yourself. At the maximal end sits Serverpod. It's a full framework"
  url="https://freecodecamp.org/news/how-to-build-production-grade-rest-apis-with-dart-and-dart-frog"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a80b24db-c53e-4d36-85cd-0cb999676145.png"/>

Dart backend frameworks exist on a spectrum. At the [**minimal end sits Shelf,**](/freecodecamp.org/how-to-build-and-ship-production-rest-apis-with-dart-and-shelf/README.md) with raw primitives and full control. You wire everything yourself. [**At the maximal end sits Serverpod**](/freecodecamp.org/how-to-build-production-grade-rest-apis-with-dart-and-serverpod.md). It's a full framework with code generation and opinionated conventions. The framework makes most structural decisions for you.

Dart Frog lives in the middle, and for many Flutter engineers, it's the most natural fit.

Dart Frog is a fast, minimalistic backend framework built on top of Shelf, originally created by Very Good Ventures and now maintained independently. It takes the file-based routing model popularized by Next.js and Remix, applies it to Dart, and wraps it with a clean CLI that handles development server, hot reload, production builds, and Docker generation, all out of the box.

You write a Dart file in the routes/ directory, export an onRequest function, and Dart Frog handles the routing automatically. No router configuration, no handler registration, no mounting. The file system is the router.

In this article, we'll build a User and Profile Management REST API (the same one we built in the linked articles above) using Dart Frog, connect it to PostgreSQL, add JWT authentication, and deploy it to Fly.io.

By the end you'll understand Dart Frog's routing model deeply, and you'll have a clear picture of where it fits compared to Shelf and Serverpod.

::: note Prerequisites

Before starting, you should have:

- Comfortable familiarity with Dart and Flutter development
- Understanding of REST API concepts, endpoints, HTTP methods, status codes
- Docker Desktop installed and running
- A Fly.io account for deployment

---

## Table of Contents

- [How Dart Frog Differs from Shelf and Serverpod](#heading-how-dart-frog-differs-from-shelf-and-serverpod)
- [Installing Dart Frog](#heading-installing-dart-frog)
- [Creating the Project](#heading-creating-the-project)
- [Understanding the Project Structure](#heading-understanding-the-project-structure)
- [Dart Frog Core Concepts](#heading-dart-frog-core-concepts)
- [Setting Up the Database](#heading-setting-up-the-database)
- [Defining the Models](#heading-defining-the-models)
- [Building the Repositories](#heading-building-the-repositories)
- [Authentication Service](#heading-authentication-service)
- [Middleware](#heading-middleware)
- [Building the Routes](#heading-building-the-routes)
- [Wiring the Middleware Pipeline](#heading-wiring-the-middleware-pipeline)
- [Testing the API](#heading-testing-the-api)
- [Deployment](#heading-deployment)

---

## How Dart Frog Differs from Shelf and Serverpod

Understanding where Dart Frog sits in relation to the other two frameworks helps you make the right choice for each project.

Shelf gives you a Router and you mount handlers manually. Your folder structure has nothing to do with your URL structure. You decide what goes where.

Serverpod generates your routes from endpoint class names and method names. You define a class, run a generator, and the URL is derived automatically.

Dart Frog maps your file system directly to your URL structure. A file at routes/users/index.dart becomes the /users endpoint. A file at routes/users/[id].dart becomes /users/:id. No configuration, no registration, no generation step. The file is the route.

This model will feel immediately intuitive to Flutter engineers who have worked with Next.js or any modern web framework. It's also significantly easier to navigate in a team. You look at the folder structure and you instantly know what endpoints exist.

The other key difference is the RequestContext. Where Shelf passes a raw Request to handlers, Dart Frog wraps it in a RequestContext that carries both the request and any values injected by middleware. This is Dart Frog's dependency injection mechanism, and it's elegant.

---

## Installing Dart Frog

Install the Dart Frog CLI:

```sh
dart pub global activate dart_frog_cli
```

Verify the installation:

```sh
dart_frog --version
```

---

## Creating the Project

```sh
dart_frog create user_profile_api
cd user_profile_api
```

Start the development server with hot reload:

```sh
dart_frog dev
```

Visit `localhost:8080` and you'll see the default welcome response. The dev server watches for file changes and reloads automatically. No restart needed as you build.

---

## Understanding the Project Structure

```sh title="file structure"
user_profile_api/
  routes/
    index.dart              # GET /
  <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`
  analysis_options.yaml
```

That's the entire starting structure. Clean and minimal. Everything we add will extend from here.

After building our API, the full structure will look like this:

```sh title="file structure"
user_profile_api/
  routes/
    _middleware.dart         # global middleware pipeline
    index.dart               # GET /
    auth/
      login.dart             # POST /auth/login
      register.dart          # POST /auth/register
    users/
      index.dart             # GET /users
      [id].dart              # GET, PUT, DELETE /users/:id
      [id]/
        profile.dart         # GET, POST, PUT /users/:id/profile
  <VPIcon icon="fas fa-folder-open"/>`lib`/
    config/
      database.dart
      env.dart
    models/
      user.dart
      profile.dart
    repositories/
      user_repository.dart
      profile_repository.dart
    services/
      auth_service.dart
    middleware/
      auth_middleware.dart
      error_middleware.dart
  <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`
```

The routes/ folder is the heart of a Dart Frog project. The <VPIcon icon="fas fa-folder-open"/>`lib/ folder holds all shared logic that routes import. This separation is clean and deliberate: routing concerns live in routes/, while business logic lives in <VPIcon icon="fas fa-folder-open"/>lib/`.

---

## Dart Frog Core Concepts

### File-Based Routing

Every .dart file in the routes/ directory is a route. The file path determines the URL path:

| File | URL |
| --- | --- |
| routes/index.dart | / |
| routes/users/index.dart | /users |
| routes/users/[id].dart | /users/:id |
| routes/auth/login.dart | /auth/login |
| routes/users/[id]/profile.dart | /users/:id/profile |

Every route file must export an onRequest function:

```dart
import 'package:dart_frog/dart_frog.dart';

Future<Response> onRequest(RequestContext context) async {
  return Response.json(body: {'message': 'Hello from Dart Frog'});
}
```

That's the entire contract. One function, one file, one route. Dart Frog generates the internal routing glue automatically when you run dart_frog dev or dart_frog build.

### The RequestContext

RequestContext is the object passed to every route handler and middleware. It's more than just the HTTP request: it's a container for the request and any values that middleware has injected:

```dart
Future<Response> onRequest(RequestContext context) async {
  // The raw HTTP request
  final request = context.request;

  // HTTP method
  print(request.method); // GET, POST, etc.

  // Path parameters (for dynamic routes like [id].dart)
  final id = context.request.uri.pathSegments.last;

  // Query parameters
  final page = request.uri.queryParameters['page'];

  // Request body
  final body = await request.json() as Map<String, dynamic>;

  // Values injected by middleware
  final db = context.read<DatabaseConnection>();
  final currentUser = context.read<AuthenticatedUser>();

  return Response.json(body: {'ok': true});
}
```

context.read() is the dependency injection mechanism. Middleware provides values, and routes consume them. This keeps routes clean and testable: a route handler doesn't know how a database connection was created, it just reads it from context.

### Middleware and Dependency Injection

A `_middleware.dart` file in any route folder applies middleware to all routes in that folder and its subfolders. A `_middleware.dart` at the root routes/ level applies globally.

Middleware in Dart Frog uses the provider pattern to inject values into the context:

```dart
import 'package:dart_frog/dart_frog.dart';

Handler middleware(Handler handler) {
  return handler.use(
    provider<DatabaseConnection>(
      (context) => DatabaseConnection.instance,
    ),
  );
}
```

Any route in the same folder, or any subfolder, can then call context.read() to get the connection. No global singletons, no manual passing. The context carries it.

Middleware functions can also intercept requests before they reach the route handler, making them perfect for authentication:

```dart
Handler middleware(Handler handler) {
  return (context) async {
    final authHeader = context.request.headers['authorization'];

    if (authHeader == null) {
      return Response.json(
        statusCode: 401,
        body: {'error': 'Authorization required'},
      );
    }

    // Verify token and inject user
    final user = verifyToken(authHeader);
    return handler(context.provide<AuthenticatedUser>(() => user));
  };
}
```

### Dynamic Routes

A file named [id].dart matches any single path segment. Inside the handler, extract the parameter from the URL:

```dart
Future<Response> onRequest(RequestContext context, String id) async {
  // id is automatically passed as a parameter for dynamic routes
  return Response.json(body: {'userId': id});
}
```

Dart Frog passes dynamic route parameters as additional arguments to onRequest. This is cleaner than parsing them manually from the URL.

---

## Setting Up the Database

### Docker Compose for PostgreSQL

Create <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in the project root:

```yaml title="docker-compose.yml"
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

volumes:
  postgres_data:
```

Start the database:

```sh
docker compose up -d
```

### Environment Configuration

Add dependencies to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  dart_frog: ^1.4.0
  dart_frog_auth: ^0.1.0
  postgres: ^3.3.0
  dart_jsonwebtoken: ^2.12.0
  bcrypt: ^1.1.3
  dotenv: ^4.1.0

dev_dependencies:
  dart_frog_cli: ^1.2.0
  test: ^1.24.0
  dart_frog_test: ^0.1.0
```

Run dart pub get.

Create <VPIcon icon="iconfont icon-dotenv"/>`.env`:

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

Create <VPIcon icon="fas fa-folder-open"/>`lib/config/env.dart`:

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
  static int get jwtExpiryHours =>
      int.parse(_env['JWT_EXPIRY_HOURS'] ?? '24');
}
```

### Database Connection Manager

Create <VPIcon icon="fas fa-folder-open"/>`lib/config/database.dart`:

```dart :collapsed-lines title="lib/config/database.dart"
import 'package:postgres/postgres.dart';
import 'env.dart';

class Database {
  static Connection? _connection;

  static Future<Connection> get connection async {
    if (_connection != null) return _connection!;
    _connection = await Connection.open(
      Endpoint(
        host: Env.dbHost,
        port: Env.dbPort,
        database: Env.dbName,
        username: Env.dbUser,
        password: Env.dbPassword,
      ),
      settings: const ConnectionSettings(sslMode: SslMode.disable),
    );
    print('Database connected');
    return _connection!;
  }

  static Future<void> runMigrations() async {
    final conn = await connection;
    await conn.execute('''
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
    ''');
    print('Migrations applied');
  }
}
```

### Migrations

Dart Frog projects have a main.dart entry point generated during dart_frog build. For the development server, migrations are best run from the project entrypoint. Create main.dart in the project root:

```dart
import 'dart:io';
import 'package:dart_frog/dart_frog.dart';
import 'lib/config/database.dart';
import 'lib/config/env.dart';

Future<HttpServer> run(Handler handler, InternetAddress ip, int port) async {
  Env.load();
  await Database.runMigrations();
  return serve(handler, ip, port);
}
```

This run function is Dart Frog's server lifecycle hook. It runs before the server starts accepting requests, giving us the right place to load environment variables and run migrations.

---

## Defining the Models

With the database layer in place, we need Dart classes to represent the data coming in and out of it.

The User model maps to the users table and handles conversion between database rows and Dart objects. The Profile model does the same for the profiles table. Both models follow the same pattern: a factory constructor for reading from the database and a `toJson` method for sending data back to the client.

Note that `toJson` on the User model deliberately excludes the password hash. You should never return credential data in an API response.

Create <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`user.dart`:

```dart title="lib/models/user.dart"
class User {
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

  final String id;
  final String email;
  final String passwordHash;
  final String firstName;
  final String lastName;
  final bool isActive;
  final DateTime createdAt;
  final DateTime updatedAt;

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

Create <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile.dart`:

```dart title="lib/models/profile.dart"
class Profile {
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

  final String id;
  final String userId;
  final String? bio;
  final String? avatarUrl;
  final String? phone;
  final String? location;
  final String? website;
  final DateTime createdAt;
  final DateTime updatedAt;

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

---

## Building the Repositories

Repositories are the single point of contact between the application and the database. Rather than writing SQL directly inside route handlers, we'll centralise all database operations here. This keeps the handlers clean and makes the data access logic easy to find, maintain, and test independently.

The UserRepository handles every operation on the users table. The ProfileRepository does the same for profiles, using userId as its primary lookup key since profiles are always accessed in the context of a specific user.

### User Repository

Create <VPIcon icon="fas fa-folder-open"/>`lib/repositories/`<VPIcon icon="fa-brands fa-dart-lang"/>`user_repository.dart`:

```dart :collapsed-lines title="lib/repositories/user_repository.dart"
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
    return results.map((r) => User.fromRow(r.toColumnMap())).toList();
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
      parameters: {'id': id, 'firstName': firstName, 'lastName': lastName},
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

### Profile Repository

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

---

## Authentication Service

Authentication in this project is handled by a dedicated AuthService that lives in <VPIcon icon="fas fa-folder-open"/>`lib/services/`. It has one clear responsibility: the cryptographic operations that power auth: hashing passwords before storing them, verifying passwords at login, generating signed JWT tokens on success, and verifying those tokens on protected requests`.

Keeping this logic in a service rather than spreading it across route handlers means it can be injected via middleware and consumed cleanly anywhere in the app.

Create <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_service.dart`:

```dart :collapsed-lines title="lib/services/auth_service.dart"
import 'package:bcrypt/bcrypt.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import '../config/env.dart';
import '../models/user.dart';

class AuthService {
  String hashPassword(String password) =>
      BCrypt.hashpw(password, BCrypt.gensalt());

  bool verifyPassword(String password, String hash) =>
      BCrypt.checkpw(password, hash);

  String generateToken(User user) {
    final jwt = JWT({
      'sub': user.id,
      'email': user.email,
      'iat': DateTime.now().millisecondsSinceEpoch ~/ 1000,
    });
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

---

## Middleware

Middleware is where Dart Frog's dependency injection model does its most important work. Rather than instantiating repositories and services inside each route handler, we create them once in middleware and make them available to every handler downstream via the RequestContext.

This section defines three pieces of middleware: the database middleware that injects the repositories and auth service, the auth middleware that validates JWT tokens and protects routes, and the error middleware that catches unhandled exceptions and returns consistent error responses across the entire API.

### Database Middleware

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`database_middleware.dart`:

```dart title+"lib/middleware/database_middleware.dart"
import 'package:dart_frog/dart_frog.dart';
import '../repositories/user_repository.dart';
import '../repositories/profile_repository.dart';
import '../services/auth_service.dart';

Middleware databaseMiddleware() {
  return (handler) {
    return handler
        .use(provider<UserRepository>((_) => UserRepository()))
        .use(provider<ProfileRepository>((_) => ProfileRepository()))
        .use(provider<AuthService>((_) => AuthService()));
  };
}
```

This middleware injects the repositories and auth service into every request context. Routes read them with `context.read()` without caring how they were created.

### Auth Middleware

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_middleware.dart`:

```dart :collapsed-lines title="lib/middleware/auth_middleware.dart"
import 'dart:convert';
import 'package:dart_frog/dart_frog.dart';
import '../services/auth_service.dart';

Middleware authMiddleware() {
  return (handler) {
    return (context) async {
      final authHeader = context.request.headers['authorization'];

      if (authHeader == null || !authHeader.startsWith('Bearer ')) {
        return Response.json(
          statusCode: 401,
          body: {'error': 'Authorization header missing or malformed'},
        );
      }

      final token = authHeader.substring(7);
      final authService = context.read<AuthService>();
      final jwt = authService.verifyToken(token);

      if (jwt == null) {
        return Response.json(
          statusCode: 401,
          body: {'error': 'Invalid or expired token'},
        );
      }

      final userId = jwt.payload['sub'] as String;
      final userEmail = jwt.payload['email'] as String;

      return handler(
        context.provide<Map<String, String>>(
          () => {'userId': userId, 'userEmail': userEmail},
        ),
      );
    };
  };
}
```

### Error Middleware

Create <VPIcon icon="fas fa-folder-open"/>`lib/middleware/`<VPIcon icon="fa-brands fa-dart-lang"/>`error_middleware.dart`:

```dart title="lib/middleware/error_middleware.dart"
import 'package:dart_frog/dart_frog.dart';

Middleware errorMiddleware() {
  return (handler) {
    return (context) async {
      try {
        return await handler(context);
      } on FormatException catch (e) {
        return Response.json(
          statusCode: 400,
          body: {'error': 'Invalid request body: ${e.message}'},
        );
      } catch (e, stackTrace) {
        print('Unhandled error: \(e\n\)stackTrace');
        return Response.json(
          statusCode: 500,
          body: {'error': 'An internal server error occurred'},
        );
      }
    };
  };
}
```

---

## Building the Routes

With the models, repositories, auth service, and middleware all in place, we can now build the route handlers.

In Dart Frog, each file in the routes/ folder is a self-contained endpoint. Routes don't manage dependencies directly. Instead, they read what middleware has already injected into the context and call the appropriate repository or service method.

This section covers three groups of routes: the auth routes for registration and login, the user routes for CRUD operations, and the profile routes nested under a user's ID.

### Auth Routes

Create <VPIcon icon="fas fa-folder-open"/>`routes/auth/`<VPIcon icon="fa-brands fa-dart-lang"/>`register.dart`:

```dart :collapsed-lines title="routes/auth/register.dart"
import 'package:dart_frog/dart_frog.dart';
import '../../lib/repositories/user_repository.dart';
import '../../lib/services/auth_service.dart';

Future<Response> onRequest(RequestContext context) async {
  if (context.request.method != HttpMethod.post) {
    return Response.json(statusCode: 405, body: {'error': 'Method not allowed'});
  }

  final body = await context.request.json() as Map<String, dynamic>;
  final email = body['email'] as String?;
  final password = body['password'] as String?;
  final firstName = body['firstName'] as String?;
  final lastName = body['lastName'] as String?;

  if (email == null || password == null ||
      firstName == null || lastName == null) {
    return Response.json(
      statusCode: 400,
      body: {'error': 'email, password, firstName, and lastName are required'},
    );
  }

  if (password.length < 8) {
    return Response.json(
      statusCode: 400,
      body: {'error': 'Password must be at least 8 characters'},
    );
  }

  final userRepo = context.read<UserRepository>();
  final authService = context.read<AuthService>();

  final existing = await userRepo.findByEmail(email);
  if (existing != null) {
    return Response.json(
      statusCode: 409,
      body: {'error': 'An account with this email already exists'},
    );
  }

  final user = await userRepo.create(
    email: email,
    passwordHash: authService.hashPassword(password),
    firstName: firstName,
    lastName: lastName,
  );

  return Response.json(
    statusCode: 201,
    body: {
      'user': user.toJson(),
      'token': authService.generateToken(user),
    },
  );
}
```

Create <VPIcon icon="fas fa-folder-open"/>`routes/auth/`<VPIcon icon="fa-brands fa-dart-lang"/>`login.dart`:

```dart :collapsed-lines title="routes/auth/login.dart"
import 'package:dart_frog/dart_frog.dart';
import '../../lib/repositories/user_repository.dart';
import '../../lib/services/auth_service.dart';

Future<Response> onRequest(RequestContext context) async {
  if (context.request.method != HttpMethod.post) {
    return Response.json(statusCode: 405, body: {'error': 'Method not allowed'});
  }

  final body = await context.request.json() as Map<String, dynamic>;
  final email = body['email'] as String?;
  final password = body['password'] as String?;

  if (email == null || password == null) {
    return Response.json(
      statusCode: 400,
      body: {'error': 'email and password are required'},
    );
  }

  final userRepo = context.read<UserRepository>();
  final authService = context.read<AuthService>();
  final user = await userRepo.findByEmail(email);

  if (user == null || !authService.verifyPassword(password, user.passwordHash)) {
    return Response.json(
      statusCode: 401,
      body: {'error': 'Invalid email or password'},
    );
  }

  return Response.json(
    body: {
      'user': user.toJson(),
      'token': authService.generateToken(user),
    },
  );
}
```

### User Routes

Create <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`index.dart`:

```dart :collapsed-lines title="routes/users/index.dart"
import 'package:dart_frog/dart_frog.dart';
import '../../lib/repositories/user_repository.dart';

Future<Response> onRequest(RequestContext context) async {
  if (context.request.method != HttpMethod.get) {
    return Response.json(statusCode: 405, body: {'error': 'Method not allowed'});
  }

  final userRepo = context.read<UserRepository>();
  final users = await userRepo.findAll();

  return Response.json(
    body: users.map((u) => u.toJson()).toList(),
  );
}
```

Create <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`[id].dart`:

```dart :collapsed-lines title="routes/users/[id].dart"
import 'package:dart_frog/dart_frog.dart';
import '../../lib/repositories/user_repository.dart';

Future<Response> onRequest(RequestContext context, String id) async {
  final userRepo = context.read<UserRepository>();

  switch (context.request.method) {
    case HttpMethod.get:
      return _getUser(userRepo, id);
    case HttpMethod.put:
      return _updateUser(context, userRepo, id);
    case HttpMethod.delete:
      return _deleteUser(userRepo, id);
    default:
      return Response.json(
        statusCode: 405,
        body: {'error': 'Method not allowed'},
      );
  }
}

Future<Response> _getUser(UserRepository repo, String id) async {
  final user = await repo.findById(id);
  if (user == null) {
    return Response.json(statusCode: 404, body: {'error': 'User not found'});
  }
  return Response.json(body: user.toJson());
}

Future<Response> _updateUser(
  RequestContext context,
  UserRepository repo,
  String id,
) async {
  final body = await context.request.json() as Map<String, dynamic>;
  final user = await repo.update(
    id: id,
    firstName: body['firstName'] as String?,
    lastName: body['lastName'] as String?,
  );
  if (user == null) {
    return Response.json(statusCode: 404, body: {'error': 'User not found'});
  }
  return Response.json(body: user.toJson());
}

Future<Response> _deleteUser(UserRepository repo, String id) async {
  final deleted = await repo.delete(id);
  if (!deleted) {
    return Response.json(statusCode: 404, body: {'error': 'User not found'});
  }
  return Response.json(statusCode: 204, body: null);
}
```

Notice how onRequest receives String id as a second parameter, Dart Frog automatically passes the dynamic path segment to the handler. The switch on context.request.method handles all HTTP methods in a single file which is the idiomatic Dart Frog pattern for CRUD endpoints.

### Profile Routes

Create <VPIcon icon="fas fa-folder-open"/>`routes/users/[id]/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile.dart`:

```dart :collapsed-lines title="routes/users/[id]/profile.dart"
import 'package:dart_frog/dart_frog.dart';
import '../../../lib/repositories/user_repository.dart';
import '../../../lib/repositories/profile_repository.dart';

Future<Response> onRequest(RequestContext context, String id) async {
  final userRepo = context.read<UserRepository>();
  final profileRepo = context.read<ProfileRepository>();

  final user = await userRepo.findById(id);
  if (user == null) {
    return Response.json(statusCode: 404, body: {'error': 'User not found'});
  }

  switch (context.request.method) {
    case HttpMethod.get:
      return _getProfile(profileRepo, id);
    case HttpMethod.post:
      return _createProfile(context, profileRepo, id);
    case HttpMethod.put:
      return _updateProfile(context, profileRepo, id);
    default:
      return Response.json(
        statusCode: 405,
        body: {'error': 'Method not allowed'},
      );
  }
}

Future<Response> _getProfile(ProfileRepository repo, String userId) async {
  final profile = await repo.findByUserId(userId);
  if (profile == null) {
    return Response.json(statusCode: 404, body: {'error': 'Profile not found'});
  }
  return Response.json(body: profile.toJson());
}

Future<Response> _createProfile(
  RequestContext context,
  ProfileRepository repo,
  String userId,
) async {
  final existing = await repo.findByUserId(userId);
  if (existing != null) {
    return Response.json(
      statusCode: 409,
      body: {'error': 'Profile already exists for this user'},
    );
  }

  final body = await context.request.json() as Map<String, dynamic>;
  final profile = await repo.create(
    userId: userId,
    bio: body['bio'] as String?,
    avatarUrl: body['avatarUrl'] as String?,
    phone: body['phone'] as String?,
    location: body['location'] as String?,
    website: body['website'] as String?,
  );
  return Response.json(statusCode: 201, body: profile.toJson());
}

Future<Response> _updateProfile(
  RequestContext context,
  ProfileRepository repo,
  String userId,
) async {
  final body = await context.request.json() as Map<String, dynamic>;
  final profile = await repo.update(
    userId: userId,
    bio: body['bio'] as String?,
    avatarUrl: body['avatarUrl'] as String?,
    phone: body['phone'] as String?,
    location: body['location'] as String?,
    website: body['website'] as String?,
  );
  if (profile == null) {
    return Response.json(statusCode: 404, body: {'error': 'Profile not found'});
  }
  return Response.json(body: profile.toJson());
}
```

---

## Wiring the Middleware Pipeline

The routes and middleware are all written, but they aren't connected yet. In Dart Frog, the connection happens through <VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` files placed strategically in the routes/ folder.

To review, a <VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` file at the root level applies to every route in the project. A <VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` inside a subfolder applies only to routes in that folder and below. This gives us precise, folder-scoped control over which middleware runs where without any manual registration or mounting.

Create <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` for global middleware applied to every route:

```dart title="routes/_middleware.dart"
import 'package:dart_frog/dart_frog.dart';
import '../lib/middleware/database_middleware.dart';
import '../lib/middleware/error_middleware.dart';

Handler middleware(Handler handler) {
  return handler
      .use(databaseMiddleware())
      .use(errorMiddleware());
}
```

Create <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` to protect all user routes with authentication:

```dart title="routes/users/_middleware.dart"
import 'package:dart_frog/dart_frog.dart';
import '../../lib/middleware/auth_middleware.dart';

Handler middleware(Handler handler) {
  return handler.use(authMiddleware());
}
```

This is one of the most elegant parts of Dart Frog's model. The <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`_middleware.dart` file automatically applies auth to every route under <VPIcon icon="fas fa-folder-open"/>`routes/users/`, including <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`index.dart`, <VPIcon icon="fas fa-folder-open"/>`routes/users/`<VPIcon icon="fa-brands fa-dart-lang"/>`[id].dart`, and <VPIcon icon="fas fa-folder-open"/>`routes/users/[id]/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile.dart`. The auth routes under routes/auth/ are untouched because they live outside the users/ folder.

There's no manual middleware mounting, no array of protected routes, and no route group configuration. The folder structure does the work.

---

## Testing the API

With the server running and all routes wired up, we can verify the full flow end to end. Start the development server and run through each endpoint in order: register a user first to get a token, then use that token on the protected routes. Replace {userId} in the commands below with the actual ID returned from the register response.

Start the development server:

```sh
dart_frog dev
# Server is now running at: http://localhost:8080
```

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
#
# {
#   "user": {
#     "id": "uuid-here",
#     "email": "seyi@example.com",
#     "firstName": "Seyi",
#     "lastName": "Dev",
#     "isActive": true,
#     "createdAt": "2025-01-01T00:00:00.000Z",
#     "updatedAt": "2025-01-01T00:00:00.000Z"
#   },
#   "token": "eyJhbGci..."
# }
```

Login:

```sh
curl http://localhost:8080/auth/login \
-X POST \
-H "Content-Type: application/json" \
-d '{"email": "seyi@example.com", "password": "securepassword"}'
```

Get all users:

```sh
curl http://localhost:8080/users \
-H "Authorization: Bearer eyJhbGci..."
```

Get a specific user:

```sh
curl http://localhost:8080/users/{userId} \
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

## Deployment

With everything tested locally, the final step is getting the API live. Dart Frog makes this straightforward: a single CLI command generates a production-ready Dockerfile, and from there we deploy to Fly.io where the app will run as a containerized service alongside a managed PostgreSQL database.

### Production Build

Dart Frog generates a production-ready Docker setup with a single command:

```sh
dart_frog build
```

This creates a <VPIcon icon="fas fa-folderopen"/>`build/` directory containing:

```sh title="file structure"
build/
  bin/
    server.dart         # compiled entry point
  Dockerfile            # production Dockerfile
  pubspec.yaml
  pubspec.lock
```

The generated Dockerfile is a multi-stage build, compiles to a native binary in the first stage, runs from a minimal Debian image in the second. You do not need to write this yourself.

### Deploying to Fly.io

#### Step 1 — Authenticate

```sh
fly auth login
```

#### Step 2 — Launch from the build directory

```sh
cd build
fly launch
```

Fly detects the Dockerfile and prompts for configuration. Create a PostgreSQL database when asked.

#### Step 3 — Set secrets

```sh
fly secrets set JWT_SECRET="your_production_jwt_secret"
fly secrets set JWT_EXPIRY_HOURS="24"
```

#### Step 4 — Deploy

```sh
fly deploy
```

#### Step 5 — Verify

```sh
curl https://your-app-name.fly.dev/auth/register \
-X POST \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123","firstName":"Seyi","lastName":"Dev"}'
```

---

## Conclusion

Dart Frog sits exactly where it positions itself: between the raw control of Shelf and the full opinions of Serverpod. It takes the file-based routing model that has proven itself in the JavaScript ecosystem and brings it to Dart cleanly, without compromising on the language's strengths.

The routing model is its strongest feature. Looking at the routes/ folder tells you everything about your API: what endpoints exist, how they are grouped, and which middleware applies to which sections. That transparency makes codebases easier to navigate, easier to onboard into, and easier to reason about as they grow.

The RequestContext and the provider pattern for dependency injection are well thought out. Middleware injects, routes consume, and nothing bleeds between the two. The folder-scoped middleware is particularly clean, protecting an entire section of your API is as simple as dropping a _middleware.dart file in the right folder.

For Flutter engineers building APIs that need to serve multiple client types, conform to standard REST conventions, or integrate cleanly with existing frontend infrastructure, Dart Frog hits a practical sweet spot that neither Shelf nor Serverpod reaches as naturally.

Dart is now a full-stack language in the truest sense. The same team, the same language, the same conventions – from the Flutter app to the server that powers it.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Dart Frog",
  "desc": "Dart backend frameworks exist on a spectrum. At the minimal end sits Shelf, with raw primitives and full control. You wire everything yourself. At the maximal end sits Serverpod. It's a full framework",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-grade-rest-apis-with-dart-and-dart-frog.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
