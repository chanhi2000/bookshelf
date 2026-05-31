---
lang: en-US
title: "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod"
description: "Article(s) > From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - DevOps
  - Fly
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - devops
  - fly
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod"
    - property: og:description
      content: "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-grade-rest-apis-with-dart-and-serverpod.html
prev: /programming/dart/articles/README.md
date: 2026-06-03
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/910a29c7-b380-4432-bc3c-d2c6930c3ac9.png
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
  name="From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod"
  desc="Serverpod is one of the most performant backend frameworks built on Dart. It's a fully opinionated backend framework that comes with its own ORM, its own code generation system, migration tooling, aut"
  url="https://freecodecamp.org/news/how-to-build-production-grade-rest-apis-with-dart-and-serverpod"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/910a29c7-b380-4432-bc3c-d2c6930c3ac9.png"/>

Serverpod is one of the most performant backend frameworks built on Dart. It's a fully opinionated backend framework that comes with its own ORM, its own code generation system, migration tooling, authentication module, and deployment platform.

If you use a tool like Shelf to build your API, you assemble everything yourself. You choose your packages, write your own middleware, manage your own database connection, and wire every piece together manually. That's the Shelf way, and it teaches you exactly how server-side Dart works under the hood.

Serverpod is a different philosophy entirely.

Where Shelf gives you primitives, Serverpod gives you a complete system. You define your models in YAML, run a generator, and get fully typed database classes, serialization, and client-side code produced automatically.

For Flutter engineers, this feels immediately familiar. It's the same kind of productivity you get from the Flutter toolchain itself, applied to the backend.

In this article, we're going to build a User and Profile Management REST API from scratch using Serverpod. You'll learn how Serverpod's code generation, built-in ORM, and endpoint system work, and you'll have a fully deployed backend by the end.

::: note Prerequisites

Before starting, you should have:

- Familiarity with Dart and Flutter development
- Understanding of REST API concepts, endpoints, HTTP methods, status codes
- Docker Desktop installed and running
- Flutter SDK installed (Serverpod requires it even for server-only projects)
- A Fly.io account or a Serverpod Cloud account for deployment

:::

---

## How Serverpod Differs from Shelf

Before writing a single line of code, it's worth understanding the fundamental difference in philosophy between Shelf and Serverpod. This will make every design decision in the framework feel deliberate rather than arbitrary.

With Shelf, you write everything. Request parsing, response formatting, database queries, migrations, auth, and logging. Every piece is explicit code that you understand because you wrote it.

With Serverpod, you define things and the framework writes code for you. You define a model in YAML, run serverpod generate, and get a full Dart class with database bindings, serialization, and client-side access automatically. You define an endpoint method, and the framework handles routing, parameter extraction, and response formatting.

This is the same trade-off Flutter makes compared to building with raw platform APIs. Flutter writes the layout engine, the rendering pipeline, and the gesture system for you. You focus on your product logic. Serverpod makes the same bet on the backend.

The cost of that productivity is flexibility. Serverpod has strong opinions about how things should be structured. If your use case fits those opinions, development is extremely fast. If it doesn't, you're working against the framework.

For the User and Profile Management API we're building here, Serverpod is a very good fit.

---

## Installing Serverpod

Serverpod requires Flutter to be installed, even for server-only work. This is because its toolchain builds client packages alongside the server package during project creation.

Install the Serverpod CLI globally:

```sh
dart pub global activate serverpod_cli
```

Verify the installation:

```sh
serverpod
# Should print the Serverpod CLI help
```

Make sure Docker Desktop is running before proceeding. Serverpod uses Docker to manage PostgreSQL and Redis for local development.

---

## Creating the Project

```sh
serverpod create user_profile_api
cd user_profile_api
```

This single command creates three Dart packages:

```sh title="file structure"
user_profile_api/
  user_profile_api_server/    # your server code
  user_profile_api_client/    # auto-generated client (do not edit)
  user_profile_api_flutter/   # Flutter app pre-configured to connect
```

For this article, everything we write lives in <VPIcon icon="fas fa-folder-open"/>`user_profile_api_server`. The client and Flutter packages are generated automatically and used when you want a Flutter frontend talking to your Serverpod backend.

---

## Understanding the Project Structure

Inside <VPIcon icon="fas fa-folder-open"/>`user_profile_api_server`:

```sh title="file structure"
user_profile_api_server/
  bin/
    main.dart                  # entry point
  lib/
    src/
      endpoints/               # your endpoint classes live here
      generated/               # auto-generated code (never edit manually)
    user_profile_api_server.dart
  config/
    development.yaml           # database and server config
    staging.yaml
    production.yaml
    passwords.yaml             # database passwords
  migrations/                  # auto-generated migration files
  web/                         # optional web server files
  Dockerfile
  docker-compose.yaml
  pubspec.yaml
```

The most important thing to understand about this structure is the generated/ folder. Everything in there is produced by serverpod generate and should never be edited manually. When you change a model or endpoint, you run the generator and it rewrites that folder entirely.

The config/ folder holds environment-specific configuration. The development.yaml file is preconfigured to work with the Docker containers Serverpod spins up locally.

---

## Serverpod Core Concepts

### Endpoints and the Session Object

In Serverpod, an endpoint is a class that extends Endpoint. Every public method on that class becomes an API call that clients can make. There's no routing configuration, no handler registration, and no middleware mounting. The framework discovers and registers your endpoints automatically during code generation.

```dart
import 'package:serverpod/serverpod.dart';

class UserEndpoint extends Endpoint {
  Future<String> greet(Session session, String name) async {
    return 'Hello, $name!';
  }
}
```

The Session object is the most important parameter in Serverpod. It's passed to every endpoint method and gives you access to:

- `session.db` for database operations
- `session.auth` for authentication information
- `session.log` for structured logging
- `session.caches` for caching
- `session.messages` for real-time messaging

Think of Session as Serverpod's equivalent of Flutter's BuildContext. It's the gateway to everything the framework provides, and it's always the first parameter.

### Model Files and Code Generation

This is where Serverpod's approach diverges most sharply from Shelf. Instead of writing Dart model classes manually, you define your data structures in <VPIcon icon="fas fa-yaml"/>`.spy.yaml` files and let Serverpod generate the Dart classes.

A model file for a Company looks like this:

```yaml title=-".spy.yaml"
class: Company
table: company
fields:
  name: String
  foundedDate: DateTime?
```

Running serverpod generate produces a full Dart class with:

- Immutable fields with correct types
- toJson and fromJson for serialization
- Database bindings through the db static accessor
- Constructor and copyWith method
- The same class is generated in the client package so the Flutter app can use it directly

This is the core productivity gain. You define the shape once in YAML and get a consistent, typed model that works across the server, the database, and the client without duplication.

### The Built-in ORM

Serverpod's ORM uses the generated model classes directly. All database operations go through the static db accessor on your model:

```dart
// Insert a row
var company = Company(name: 'Serverpod Corp', foundedDate: DateTime.now());
company = await Company.db.insertRow(session, company);

// Find by ID
var found = await Company.db.findById(session, company.id!);

// Find with condition
var result = await Company.db.findFirstRow(
  session,
  where: (t) => t.name.equals('Serverpod Corp'),
);

// Find all with ordering
var all = await Company.db.find(
  session,
  orderBy: (t) => t.name,
);

// Update
company = company.copyWith(name: 'New Name');
await Company.db.updateRow(session, company);

// Delete
await Company.db.deleteRow(session, company);
```

The where parameter uses a type-safe expression builder. The t parameter gives you typed access to the table's columns, so you get autocompletion and compile-time checks on your query conditions. No raw SQL, no string-based column names, no runtime surprises.

### Migrations

When you change a model, Serverpod generates a migration automatically:

```sh
serverpod create-migration
```

This creates a SQL migration file in the migrations/ directory. Apply it when starting the server:

```sh
dart bin/main.dart --apply-migrations
```

Serverpod tracks which migrations have been applied and runs only the new ones. The migration system is fully integrated with the model system, so there's no drift between your Dart classes and your database schema.

---

## Starting the Development Server

Before writing any code, get the development environment running.

Start the Docker containers (PostgreSQL and Redis):

```sh
cd user_profile_api_server
docker compose up --build --detach
```

Start the server with migrations applied:

```sh
dart bin/main.dart --apply-migrations
#
# SERVERPOD version: 2.x.x, mode: development
# Insights listening on port 8081
# Server default listening on port 8080
# Webserver listening on port 8082
```

Three ports: Port 8080 is the main API server. Port 8081 is the Serverpod Insights tool for monitoring. Port 8082 is an optional web server. For this article, we'll work exclusively with port 8080. 

---

## Defining the Models

### The User Model

Create <VPIcon icon="fas fa-folder-open"/>`lib/src/models/`<VPIcon icon="iconfont icon-yaml"/>`user.spy.yaml` in the server package:

```yaml title="lib/src/models/user.spy.yaml"
class: AppUser
table: app_users
fields:
  email: String
  passwordHash: String
  firstName: String
  lastName: String
  isActive: bool, default=true
indexes:
  app_users_email_idx:
    fields: email
    unique: true
```

A few things to note here. The class is named AppUser rather than User to avoid conflicts with Serverpod's internal User class from the auth module. The table key defines the PostgreSQL table name. The indexes block creates a unique index on the email column, enforcing uniqueness at the database level.

Serverpod automatically adds an id field of type int? to every model with a table key. You don't declare it yourself.

### The Profile Model

Create <VPIcon icon="fas fa-folder-open"/>`lib/src/models/`<VPIcon icon="iconfont icon-yaml"/>`profile.spy.yaml`:

```yaml title="lib/src/models/profile.spy.yaml"
class: Profile
table: profiles
fields:
  userId: int
  bio: String?
  avatarUrl: String?
  phone: String?
  location: String?
  website: String?
indexes:
  profiles_user_id_idx:
    fields: userId
    unique: true
```

userId is an int referencing the id of an AppUser. Serverpod's model system doesn't yet have a foreign key declaration syntax in the YAML, so referential integrity is handled at the application layer in the endpoint logic.

### Running Code Generation

With both model files in place, run the generator:

```sh
serverpod generate
```

This produces Dart classes in <VPIcon icon="fas fa-folder-open"/>`lib/src/generated/`. For AppUser, you get:

```dart title="lib/src/generated/app_user.dart"
// This is auto-generated, never edit directly
class AppUser extends SerializableEntity {
  AppUser({
    this.id,
    required this.email,
    required this.passwordHash,
    required this.firstName,
    required this.lastName,
    this.isActive = true,
  });

  int? id;
  String email;
  String passwordHash;
  String firstName;
  String lastName;
  bool isActive;

  // db accessor for ORM operations
  static final db = AppUserRepository._();

  // Serialization methods
  factory AppUser.fromJson(Map<String, dynamic> jsonSerialization, ...) { ... }
  Map<String, dynamic> toJson() { ... }
}
```

The generated code is what your endpoints interact with. You never write this by hand.

### Creating and Applying Migrations

With the models generated, create the migration:

```sh
serverpod create-migration
```

This creates timestamped SQL files in migrations/. Apply them:

```sh
dart bin/main.dart --apply-migrations
```

Your app_users and profiles tables now exist in PostgreSQL with the correct columns and indexes.

---

## Building the API

### The Auth Endpoint

Create <VPIcon icon="fas fa-folder-open"/>`lib/src/endpoints/`<VPIcon icon="fa-brands fa-dart-lang"/>`auth_endpoint.dart`:

```dart :collapsed-lines title="lib/src/endpoints/auth_endpoint.dart"
import 'package:serverpod/serverpod.dart';
import 'package:bcrypt/bcrypt.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import '../generated/protocol.dart';

class AuthEndpoint extends Endpoint {
  Future<Map<String, dynamic>> register(
    Session session,
    String email,
    String password,
    String firstName,
    String lastName,
  ) async {
    if (email.isEmpty || password.isEmpty || firstName.isEmpty || lastName.isEmpty) {
      throw Exception('All fields are required');
    }

    if (password.length < 8) {
      throw Exception('Password must be at least 8 characters');
    }

    // Check for existing user
    final existing = await AppUser.db.findFirstRow(
      session,
      where: (t) => t.email.equals(email),
    );

    if (existing != null) {
      throw Exception('An account with this email already exists');
    }

    final passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());

    var user = AppUser(
      email: email,
      passwordHash: passwordHash,
      firstName: firstName,
      lastName: lastName,
    );

    user = await AppUser.db.insertRow(session, user);

    final token = _generateToken(user);

    return {
      'user': _sanitizeUser(user),
      'token': token,
    };
  }

  Future<Map<String, dynamic>> login(
    Session session,
    String email,
    String password,
  ) async {
    if (email.isEmpty || password.isEmpty) {
      throw Exception('Email and password are required');
    }

    final user = await AppUser.db.findFirstRow(
      session,
      where: (t) => t.email.equals(email),
    );

    if (user == null || !BCrypt.checkpw(password, user.passwordHash)) {
      throw Exception('Invalid email or password');
    }

    if (!user.isActive) {
      throw Exception('This account has been deactivated');
    }

    final token = _generateToken(user);

    return {
      'user': _sanitizeUser(user),
      'token': token,
    };
  }

  String _generateToken(AppUser user) {
    final jwt = JWT({'sub': user.id, 'email': user.email});
    return jwt.sign(SecretKey(_jwtSecret), expiresIn: const Duration(hours: 24));
  }

  // Never return the password hash to the client
  Map<String, dynamic> _sanitizeUser(AppUser user) => {
        'id': user.id,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'isActive': user.isActive,
      };

  // Read from Serverpod's config system
  String get _jwtSecret =>
      Session.serverpod.getPassword('jwtSecret') ?? 'fallback_dev_secret';
}
```

Serverpod endpoints return typed values. When you return a `Map<String, dynamic>`, Serverpod serializes it automatically. When you throw an Exception, Serverpod catches it and returns a structured error response to the client. No manual response formatting, no status code management for common cases.

### The User Endpoint

Create <VPIcon icon="fas fa-folder-open"/>`lib/src/endpoints/`<VPIcon icon="fa-brands fa-dart-lang"/>`user_endpoint.dart`:

```dart :collapsed-lines title="lib/src/endpoints/user_endpoint.dart"
import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

class UserEndpoint extends Endpoint {
  @override
  bool get requireLogin => true;

  Future<List<Map<String, dynamic>>> getAll(Session session) async {
    final users = await AppUser.db.find(
      session,
      where: (t) => t.isActive.equals(true),
      orderBy: (t) => t.id,
    );

    return users.map(_sanitizeUser).toList();
  }

  Future<Map<String, dynamic>> getById(Session session, int userId) async {
    final user = await AppUser.db.findById(session, userId);

    if (user == null || !user.isActive) {
      throw Exception('User not found');
    }

    return _sanitizeUser(user);
  }

  Future<Map<String, dynamic>> update(
    Session session,
    int userId,
    String? firstName,
    String? lastName,
  ) async {
    final user = await AppUser.db.findById(session, userId);

    if (user == null || !user.isActive) {
      throw Exception('User not found');
    }

    final updated = user.copyWith(
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
    );

    await AppUser.db.updateRow(session, updated);
    return _sanitizeUser(updated);
  }

  Future<void> delete(Session session, int userId) async {
    final user = await AppUser.db.findById(session, userId);

    if (user == null || !user.isActive) {
      throw Exception('User not found');
    }

    // Soft delete
    final deactivated = user.copyWith(isActive: false);
    await AppUser.db.updateRow(session, deactivated);
  }

  Map<String, dynamic> _sanitizeUser(AppUser user) => {
        'id': user.id,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'isActive': user.isActive,
      };
}
```

Notice `@override bool get requireLogin => true`. This is Serverpod's built-in mechanism for protecting endpoints. When this getter returns `true`, Serverpod validates the authentication token on every request to this endpoint before the method is called. Unauthenticated requests are rejected automatically by the framework.

### The Profile Endpoint

Create <VPIcon icon="fas fa-folder-open"/>`lib/src/endpoints/`<VPIcon icon="fa-brands fa-dart-lang"/>`profile_endpoint.dart`:

```dart :collapsed-lines title="lib/src/endpoints/profile_endpoint.dart"
import 'package:serverpod/serverpod.dart';
import '../generated/protocol.dart';

class ProfileEndpoint extends Endpoint {
  @override
  bool get requireLogin => true;

  Future<Map<String, dynamic>> getByUserId(
    Session session,
    int userId,
  ) async {
    final user = await AppUser.db.findById(session, userId);
    if (user == null || !user.isActive) {
      throw Exception('User not found');
    }

    final profile = await Profile.db.findFirstRow(
      session,
      where: (t) => t.userId.equals(userId),
    );

    if (profile == null) {
      throw Exception('Profile not found');
    }

    return _profileToMap(profile);
  }

  Future<Map<String, dynamic>> create(
    Session session,
    int userId,
    String? bio,
    String? avatarUrl,
    String? phone,
    String? location,
    String? website,
  ) async {
    final user = await AppUser.db.findById(session, userId);
    if (user == null || !user.isActive) {
      throw Exception('User not found');
    }

    final existing = await Profile.db.findFirstRow(
      session,
      where: (t) => t.userId.equals(userId),
    );

    if (existing != null) {
      throw Exception('Profile already exists for this user');
    }

    var profile = Profile(
      userId: userId,
      bio: bio,
      avatarUrl: avatarUrl,
      phone: phone,
      location: location,
      website: website,
    );

    profile = await Profile.db.insertRow(session, profile);
    return _profileToMap(profile);
  }

  Future<Map<String, dynamic>> update(
    Session session,
    int userId,
    String? bio,
    String? avatarUrl,
    String? phone,
    String? location,
    String? website,
  ) async {
    final profile = await Profile.db.findFirstRow(
      session,
      where: (t) => t.userId.equals(userId),
    );

    if (profile == null) {
      throw Exception('Profile not found');
    }

    final updated = profile.copyWith(
      bio: bio ?? profile.bio,
      avatarUrl: avatarUrl ?? profile.avatarUrl,
      phone: phone ?? profile.phone,
      location: location ?? profile.location,
      website: website ?? profile.website,
    );

    await Profile.db.updateRow(session, updated);
    return _profileToMap(updated);
  }

  Map<String, dynamic> _profileToMap(Profile profile) => {
        'id': profile.id,
        'userId': profile.userId,
        'bio': profile.bio,
        'avatarUrl': profile.avatarUrl,
        'phone': profile.phone,
        'location': profile.location,
        'website': profile.website,
      };
}
```

After adding these endpoints, run the generator again so Serverpod registers them:

```sh
serverpod generate
```

---

## Authentication

### Password Hashing and JWT

Add the required packages to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` in the server package:

```yaml title="pubspec.yaml"
dependencies:
  serverpod: ^2.5.0
  bcrypt: ^1.1.3
  dart_jsonwebtoken: ^2.12.0
```

Then run dart pub get.

The `_generateToken` and `_sanitizeUser` helpers in the auth endpoint handle password hashing and JWT generation. The JWT secret is read from Serverpod's built-in password management system via `Session.serverpod.getPassword('jwtSecret')`.

Add the secret to <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="iconfont icon-yaml"/>`passwords.yaml`:

```yaml title="config/passwords.yaml"
development:
  database: 'dart_password'
  jwtSecret: 'your_development_jwt_secret_here'
```

This file is already in .gitignore by default in a Serverpod project. Production secrets are injected via environment variables or Serverpod Cloud's secret management.

### Protecting Endpoints

Serverpod has two levels of endpoint protection:

`requireLogin` — rejects unauthenticated requests automatically:

```dart
@override
bool get requireLogin => true;
```

requiredScopes — requires specific permission scopes:

```dart
@override
Set<Scope> get requiredScopes => {Scope.admin};
```

For the User and Profile endpoints in this article, `requireLogin` is sufficient. The token from the login response is passed in the Authorization header on every subsequent request, and Serverpod validates it before the endpoint method is called.

Verifying the token inside an endpoint to get the current user's ID:

```dart
Future<void> someProtectedMethod(Session session) async {
  final authInfo = await session.authenticated;

  if (authInfo == null) {
    throw Exception('Not authenticated');
  }

  final userId = authInfo.userId;
  // proceed with userId
}
```

---

## Error Handling in Serverpod

Serverpod handles exceptions thrown from endpoint methods and converts them into structured error responses automatically. When you throw:

```dart
throw Exception('User not found');
```

The client receives a structured error response. For more granular control, Serverpod provides typed exceptions:

```dart
throw ServerpodClientException('User not found', statusCode: 404);
```

For server-side logging without exposing details to the client:

```dart
session.log('Unexpected error during user creation', level: LogLevel.error);
throw Exception('An internal error occurred');
```

Serverpod's logging system stores logs in the database and makes them queryable through the Insights dashboard on port 8081. Every request is automatically logged with timing information, endpoint name, and outcome, no additional middleware required.

---

## Testing the API

Serverpod exposes its endpoints over HTTP. You can test them directly with curl, though the request format follows Serverpod's RPC convention rather than a traditional REST structure.

The generated URL pattern for an endpoint method is:

```plaintext
POST /[endpoint]/[method]
```

With a JSON body containing the method parameters.

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

Login:

```sh
curl http://localhost:8080/auth/login \
-X POST \
-H "Content-Type: application/json" \
-d '{"email": "seyi@example.com", "password": "securepassword"}'
```

Get all users (authenticated):

```sh
curl http://localhost:8080/user/getAll \
-X POST \
-H "Authorization: Bearer eyJhbGci..."
```

Get user by ID:

```sh
curl http://localhost:8080/user/getById \
-X POST \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{"userId": 1}'
```

Create a profile:

```sh
curl http://localhost:8080/profile/create \
-X POST \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{
  "userId": 1,
  "bio": "Flutter engineer turned backend developer",
  "location": "Lagos, Nigeria",
  "website": "https://example.com"
}'
```

Update a user:

```sh
curl http://localhost:8080/user/update \
-X POST \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{"userId": 1, "firstName": "Oluwaseyi"}'
```

Delete a user:

```sh
curl http://localhost:8080/user/delete \
-X POST \
-H "Authorization: Bearer eyJhbGci..." \
-H "Content-Type: application/json" \
-d '{"userId": 1}'
```

---

## Deployment

### Deploying with Docker and Fly.io

Serverpod generates a Dockerfile as part of the project creation. It's located in user_profile_api_server/Dockerfile and is ready to use.

The included docker-compose.yaml in the server package manages PostgreSQL and Redis for local development. For production deployment on Fly.io, the process follows the same Docker-based pattern covered in the deployment section below.

**Step 1 — Authenticate with Fly:**

```sh
fly auth login
```

**Step 2 — Launch the app from the server directory:**

```sh
cd user_profile_api_server
fly launch
```

**Step 3 — Set production secrets:**

```sh
fly secrets set JWT_SECRET="your_production_jwt_secret"
```

**Step 4 — Update the production config:**

Edit config/production.yaml with your Fly-provisioned database connection details. Fly injects the DATABASE_URL environment variable which you map to the Serverpod config format.

**Step 5 — Deploy:**

```sh
fly deploy
```

**Step 6 — Apply migrations on first deploy:**

```sh
fly ssh console
dart bin/main.dart --apply-migrations --mode production
```

### Deploying with Serverpod Cloud

Serverpod Cloud is the native deployment platform built specifically for Serverpod applications. It handles database provisioning, scaling, monitoring, and deployments with minimal configuration.

Install the Serverpod Cloud CLI:

```sh
dart pub global activate serverpod_cloud_cli
```

Authenticate:

```sh
scloud login
```

Create a project in the Serverpod Cloud dashboard at cloud.serverpod.dev, then link your local project:

```sh
scloud link --project-id your-project-id
```

Deploy:

```sh
scloud deploy
```

Serverpod Cloud provisions a managed PostgreSQL database, applies your migrations, and deploys your server automatically. It also provides the Insights dashboard for monitoring requests, logs, and performance in production.

For teams already committed to the Serverpod ecosystem, Serverpod Cloud is the fastest path to a production deployment.

---

## Conclusion

Serverpod takes a fundamentally different approach from Shelf. Where Shelf gives you control, Serverpod gives you speed. You define your models in YAML, run a generator, and get database classes, serialization, and client code produced automatically. You write an endpoint method and the framework handles routing, parameter extraction, authentication, and error formatting.

The ORM is the strongest part of the experience. Type-safe query expressions, automatic migration generation, and no SQL drift between your code and your schema make database work noticeably faster and safer than raw SQL.

The cost is rigidity. Serverpod's URL structure, serialization format, and architectural conventions aren't optional. If your API needs to conform to a specific REST structure that differs from Serverpod's RPC style, you'll be working against the framework.

For greenfield Flutter backends where the Dart client will consume the API, Serverpod is hard to beat. The code sharing between server and client, the automatic client generation, and the tight toolchain integration make it the most productive Dart backend option available.

For APIs that need to serve multiple clients, conform to external REST conventions, or integrate with existing infrastructure that doesn't expect Serverpod's format, a lower-level tool like Shelf gives you more control. If you want to see how the same User and Profile Management API is built with Shelf and compare the two approaches directly, you can [**find that article here**](/freecodecamp.org/how-to-build-and-ship-production-rest-apis-with-dart-and-shelf/README.md).

Knowing which tool fits which job is what separates a developer who knows a framework from one who understands backend development.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Flutter to Backend: How to Build Production-Grade REST APIs with Dart and Serverpod",
  "desc": "Serverpod is one of the most performant backend frameworks built on Dart. It's a fully opinionated backend framework that comes with its own ORM, its own code generation system, migration tooling, aut",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-grade-rest-apis-with-dart-and-serverpod.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
