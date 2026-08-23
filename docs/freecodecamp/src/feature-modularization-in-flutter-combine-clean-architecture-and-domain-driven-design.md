---
lang: en-US
title: "Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features"
description: "Article(s) > Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features"
    - property: og:description
      content: "Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/feature-modularization-in-flutter-combine-clean-architecture-and-domain-driven-design.html
prev: /programming/dart/articles/README.md
date: 2026-09-02
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9dac98f7-f9bf-4597-bbd9-95e220cce9ec.png
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
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features"
  desc="As an engineer working on a small team, your current structure could fly. But what if your team, all contributing to the same codebase, reaches 20 or more people at scale? You'll need careful design t"
  url="https://freecodecamp.org/news/feature-modularization-in-flutter-combine-clean-architecture-and-domain-driven-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9dac98f7-f9bf-4597-bbd9-95e220cce9ec.png"/>

As an engineer working on a small team, your current structure could fly. But what if your team, all contributing to the same codebase, reaches 20 or more people at scale? You'll need careful design thinking, seamless contribution workflows, and processes for keeping the codebase concise and compact.

You'll also need to be quite intentional in selecting your folder structure, architecture, and the patterns you use in your projects.

Most Flutter apps start the same way. In the beginning, you have a lib folder, a few screens, maybe a models directory, and a services file that handles everything. It works, the app ships, and everyone is happy.

Then the app grows. New features come in. The team expands. What was once a manageable codebase becomes a maze. Changing one thing breaks another. Nobody is sure where business logic actually lives. The models folder has three hundred files. The services file is six thousand lines long. New engineers take weeks to understand where to add anything.

This isn't a discipline problem. It's a structure problem. The app was never organized in a way that could absorb growth without collapsing.

Feature Modularization is the organizational strategy that prevents this collapse. It's not a new framework, and it's not a replacement for Clean Architecture or Domain-Driven Design. It takes the principles of both and applies them feature by feature, so that every piece of your application is self-contained, independently testable, and scalable without interference.

In this article, we'll cover the current issues you might encounter using the layer first pattern, how Domain-Driven Design actually works, some business rules with value objects, what Clean Architecture means, and how they all come together in feature modularization.

::: note Prerequisites

Before reading this article, you should be comfortable with:

- Building Flutter applications in Dart
- What object-oriented programming is: classes, inheritance, interfaces
- What layers mean in software architecture: separating UI from business logic from data access
- Async programming in Dart: Futures and async/await

You don't need prior experience with Clean Architecture or Domain-Driven Design. This article introduces the relevant concepts from both as they come up.

:::

---

## What Feature Modularization Actually Is

Feature Modularization is the practice of organizing your application around features, not around technical layers.

Every feature in your application contains everything it needs to function: its domain model, business rules, data access, and UI. The feature is a vertical slice through the entire application stack. It doesn't depend on other features to function. It doesn't expose its internals to other features. It stands alone.

This is fundamentally different from how most apps are initially organized, where all the domain code lives in one folder, all the data access lives in another folder, and all the UI lives in a third folder, regardless of which feature that code belongs to.

Feature Modularization isn't Clean Architecture. Clean Architecture defines what the layers are and the rules that govern how they interact. It tells you that the domain layer can't depend on the infrastructure layer, that business rules can't know about the UI, and that data flows inward through defined boundaries.

Feature Modularization isn't Domain-Driven Design either. DDD gives you the vocabulary for modeling complex business domains. It introduces entities, value objects, aggregates, domain services, and bounded contexts as tools for capturing business complexity in code.

Feature Modularization takes both of these and combines them. It uses Clean Architecture's layering rules and DDD's modeling vocabulary, and it applies them at the feature level. Each feature gets its own domain layer, its own application layer, its own infrastructure layer, and its own presentation layer. The rules from Clean Architecture govern how those layers interact within the feature. The concepts from DDD govern how the domain model is structured inside the domain layer.

The result is a codebase that can grow indefinitely without any single part of it becoming too large to understand or modify safely.

---

## The Problem With Layer-First Organization

To understand why Feature Modularization matters, you need to see what the alternative looks like at scale.

In a layer-first organization, the folder structure groups code by technical role:

```sh title="file structure"
lib/
  domain/
    employee.dart
    payment.dart
    product.dart
    notification.dart
    user.dart
    # ... 47 more files

  application/
    get_employee_usecase.dart
    process_payment_usecase.dart
    get_products_usecase.dart
    send_notification_usecase.dart
    # ... 83 more use cases

  infrastructure/
    employee_repository_impl.dart
    payment_repository_impl.dart
    product_datasource.dart
    notification_service_impl.dart
    # ... 91 more implementations

  presentation/
    employee_page.dart
    payment_page.dart
    product_list_page.dart
    # ... 200 more screens and widgets
```

This works fine at small scale. At medium scale it starts to show cracks. At large scale it becomes genuinely painful.

When a developer needs to modify the Employee feature, they touch files in four separate top-level folders. A change to the Employee entity in the domain folder requires navigating to the application folder for the use case, then the infrastructure folder for the repository implementation, and then the presentation folder for the UI. These folders aren't next to each other. They're separated by all the other features sharing those folders.

Understanding any single feature requires mentally assembling it from pieces scattered across the entire codebase. Onboarding a new engineer to the Employee feature means showing them four different locations before they can see the complete picture.

Testing the Employee feature in isolation is difficult because its pieces aren't isolated. They share folders and sometimes share dependencies with other features in ways that make it hard to draw a clean boundary.

Feature Modularization solves this by keeping everything that belongs to a feature together.

---

## The Building Blocks: Clean Architecture Meets DDD

Before looking at the folder structure and code, you need to understand what Clean Architecture and DDD each contribute to Feature Modularization and why both are necessary.

### What Clean Architecture Contributes

Clean Architecture organizes code into layers with a strict dependency rule: inner layers never depend on outer layers. The domain is the innermost layer. The application layer wraps the domain. The infrastructure layer is outermost.

In a Flutter application, this means a few things:

The **domain layer** contains entities, value objects, and repository interfaces. It has zero dependencies on Flutter, on HTTP libraries, on local databases, or on any external package. It's pure Dart, and it's the business logic of the feature, completely isolated from how the app is built or deployed.

The **application layer** contains use cases. A use case orchestrates domain objects to accomplish a specific business task. It depends only on the domain layer. It knows about entities and repositories but doesn't know about HTTP or SQLite or Riverpod.

The **infrastructure layer** contains the concrete implementations of repository interfaces defined in the domain. It knows about HTTP clients, local databases, and external services. It depends on the domain layer interfaces but the domain layer never depends on it.

The **presentation layer** contains the UI: widgets, notifiers, and state. It depends on the application layer through use cases. It reacts to state and has no business logic.

This dependency direction ensures that business rules are never corrupted by infrastructure details. Changing your HTTP client from Dio to http doesn't require touching a single domain entity. Changing your state management from Riverpod to BLoC doesn't require touching a single use case.

### What Domain-Driven Design Contributes

DDD provides the vocabulary for modeling the domain layer properly.

An **Entity** is a domain object with identity. It has an ID that distinguishes it from other entities of the same type. An Employee entity is identified by its employee ID. Two employees with the same name are still different entities because they have different IDs. Entities can have state that changes over time, and they enforce rules about how that state can change.

A **Value Object** wraps a single piece of data and enforces its intrinsic validity. An EmployeeId is a Value Object, as is an email address or monetary amount. Value Objects are immutable. If the data is invalid, the Value Object throws an exception at construction time, before invalid data can enter the domain.

A **Domain Service** handles business logic that doesn't naturally belong to a single entity. If a rule spans multiple entities or requires coordination between entities in ways that don't fit on any single entity, that logic belongs in a Domain Service.

A **Repository** is an interface defined in the domain layer that describes how to persist and retrieve domain objects. The domain knows what operations it needs. The infrastructure layer provides the concrete implementation. The domain never knows which database or API is behind the repository.

---

## Entities, Value Objects, and DTOs in a Modular Feature

Understanding the distinction between these three types is fundamental to feature modularization. Getting this wrong leads to business rules leaking into the wrong layers.

### Value Objects

A Value Object wraps a single piece of data and enforces that the data is always valid. It throws immediately when invalid data is provided. This means invalid data can never exist inside your domain.

```dart
class EmployeeId {
  final String value;

  EmployeeId(this.value) {
    if (value.isEmpty) {
      throw DomainException('Employee ID cannot be empty');
    }
    if (value.length < 4) {
      throw DomainException('Employee ID must be at least 4 characters');
    }
  }

  @override
  bool operator ==(Object other) =>
      other is EmployeeId && other.value == value;

  @override
  int get hashCode => value.hashCode;

  @override
  String toString() => value;
}
```

```dart
class Money {
  final double amount;
  final String currency;

  Money({required this.amount, required this.currency}) {
    if (amount < 0) {
      throw DomainException('Amount cannot be negative');
    }
    if (currency.isEmpty) {
      throw DomainException('Currency cannot be empty');
    }
  }

  Money add(Money other) {
    if (currency != other.currency) {
      throw DomainException('Cannot add different currencies');
    }
    return Money(amount: amount + other.amount, currency: currency);
  }

  @override
  String toString() => '$currency ${amount.toStringAsFixed(2)}';
}
```

Value Objects are immutable. You never modify a Value Object. Instead, you create a new one. `EmployeeId` and `Money` above both validate at construction. No invalid `EmployeeId` can ever exist anywhere in your domain. No negative `Money` can ever exist. The guard is built into the type itself.

### Entities

An Entity is a domain object with an identity and rules about how its state can change.

```dart :collapsed-lines
class Employee {
  final EmployeeId id;
  final String name;
  DateTime? clockInTime;
  DateTime? clockOutTime;

  Employee({
    required this.id,
    required this.name,
  });

  void clockIn(DateTime time) {
    if (clockInTime != null && clockOutTime == null) {
      throw DomainException('Cannot clock in: already clocked in');
    }
    clockInTime = time;
    clockOutTime = null;
  }

  void clockOut(DateTime time) {
    if (clockInTime == null) {
      throw DomainException('Cannot clock out: not clocked in');
    }
    if (time.isBefore(clockInTime!)) {
      throw DomainException('Clock out time cannot be before clock in time');
    }
    clockOutTime = time;
  }

  bool get isClockedIn => clockInTime != null && clockOutTime == null;

  Duration? get hoursWorked {
    if (clockInTime == null || clockOutTime == null) return null;
    return clockOutTime!.difference(clockInTime!);
  }
}
```

The Entity owns its state transitions. `clockIn` and `clockOut` aren't just setters. They enforce business rules. An employee can't clock in twice without clocking out, just like they can't clock out before they've clocked in. These rules live on the Entity where they belong, not in a use case, widget, or repository.

### DTOs

A Data Transfer Object carries raw data from an external source: an API response, database row, or JSON payload. DTOs have no business rules or behavior. They exist only to transport data across a boundary.

```dart :collapsed-lines
class EmployeeDTO {
  final String id;
  final String name;
  final String? clockInTime;
  final String? clockOutTime;

  const EmployeeDTO({
    required this.id,
    required this.name,
    this.clockInTime,
    this.clockOutTime,
  });

  factory EmployeeDTO.fromJson(Map<String, dynamic> json) {
    return EmployeeDTO(
      id: json['id'] as String,
      name: json['name'] as String,
      clockInTime: json['clock_in_time'] as String?,
      clockOutTime: json['clock_out_time'] as String?,
    );
  }

  Employee toDomain() {
    final employee = Employee(
      id: EmployeeId(id),
      name: name,
    );

    if (clockInTime != null) {
      employee.clockIn(DateTime.parse(clockInTime!));
    }
    if (clockOutTime != null) {
      employee.clockOut(DateTime.parse(clockOutTime!));
    }

    return employee;
  }
}
```

The DTO lives in the infrastructure layer. It knows about JSON, while the domain entity knows nothing about JSON. The `toDomain()` method converts raw data into a properly constructed domain object, firing the business rules along the way.

---

## Business Rules and Where They Live

Every business rule in a modular feature lives in the domain layer. This isn't a preference. It's the architectural contract that makes the entire approach work.

**Value Objects** enforce atomic, intrinsic rules. An email address must contain an @ symbol. A monetary amount can't be negative. An employee ID can't be empty. These rules are about the data itself, and they belong on the Value Object.

**Entities** enforce stateful rules. An employee can't clock in twice. A payment can't be processed if it has already been refunded. A task can't be completed if its dependencies aren't complete. These rules involve the state of the entity changing over time. They belong on the Entity.

**Domain Services** enforce rules that span multiple entities or require coordination. An employee can't approve their own leave request. A payment requires verification from both the payer and a fraud detection check. These rules involve multiple entities and don't naturally belong on any single one. They belong in a Domain Service.

The rule is simple and absolute: if something is a business rule, it lives in the domain layer. The application layer calls the domain. The infrastructure layer implements the domain's interfaces. The presentation layer reacts to the results. None of them define or modify business rules.

This boundary is what makes the system trustworthy. Business rules can't be bypassed by going directly to the database. They can't be skipped by calling a repository method directly from a widget. They're always enforced because the only way to change domain state is through the domain objects themselves.

---

## Exception Handling and Safe State Propagation

When a business rule is violated in the domain layer, the domain throws a `DomainException`. This exception travels up through the application layer to the presentation layer where it's converted into UI state.

The key insight is that the exception doesn't crash the app. It's caught at a defined boundary and converted into a safe state that the UI can render.

Here's the complete flow:

```dart
// domain layer — throws when rules are violated
class Employee {
  void clockIn(DateTime time) {
    if (clockInTime != null && clockOutTime == null) {
      throw DomainException('Cannot clock in: already clocked in');
    }
    clockInTime = time;
  }
}
```

```dart
// application layer — catches domain exceptions and returns Result
class ClockInUseCase {
  final EmployeeRepository _repository;

  ClockInUseCase(this._repository);

  Future<Result<Employee, AppException>> execute(
    String employeeId,
    DateTime time,
  ) async {
    try {
      final employee = await _repository.findById(EmployeeId(employeeId));

      if (employee == null) {
        return Result.failure(AppException.notFound('Employee not found'));
      }

      employee.clockIn(time);
      await _repository.save(employee);

      return Result.success(employee);
    } on DomainException catch (e) {
      return Result.failure(AppException.businessRule(e.message));
    } catch (e) {
      return Result.failure(AppException.unknown(e.toString()));
    }
  }
}
```

```dart
// presentation layer — converts result into UI state
@riverpod
class EmployeeNotifier extends _$EmployeeNotifier {
  @override
  AsyncValue<Employee?> build() => const AsyncData(null);

  Future<void> clockIn(String employeeId) async {
    state = const AsyncLoading();

    final result = await ref
        .read(clockInUseCaseProvider)
        .execute(employeeId, DateTime.now());

    result.fold(
      onSuccess: (employee) => state = AsyncData(employee),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }
}
```

```dart
// widget — renders state, owns nothing
class EmployeeClockInWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(employeeNotifierProvider);

    return state.when(
      data: (employee) => employee != null
          ? ClockInSuccess(employee: employee)
          : const ClockInForm(),
      loading: () => const LoadingIndicator(),
      error: (error, _) => ErrorMessage(message: error.toString()),
    );
  }
}
```

The flow is linear and predictable:

1. User input triggers a use case.
2. The use case calls the domain.
3. The domain enforces rules.
4. If a rule is violated, a DomainException is thrown.
5. The use case catches it and returns a failure Result.
6. The notifier converts the Result into AsyncError state.
7. The widget renders the error.

At no point does the exception escape unhandled. And at no point does the widget touch business logic.

---

## The Folder Structure

With these concepts in place, the folder structure follows naturally:

```sh :collapsed-lines title="file structure"
lib/
  shared/
    core/
      errors/
        domain_exception.dart
        app_exception.dart
      result/
        result.dart
      di/
        injection.dart
      utils/
        date_utils.dart

  features/
    employee/
      domain/
        entities/
          employee.dart
        value_objects/
          employee_id.dart
        repositories/
          employee_repository.dart
        services/
          attendance_domain_service.dart
        exceptions/
          employee_exceptions.dart

      application/
        use_cases/
          clock_in_usecase.dart
          clock_out_usecase.dart
          get_employee_usecase.dart

      infrastructure/
        datasources/
          employee_remote_datasource.dart
          employee_local_datasource.dart
        repositories/
          employee_repository_impl.dart
        dtos/
          employee_dto.dart

      presentation/
        notifier/
          employee_notifier.dart
          employee_notifier.g.dart
        state/
          employee_state.dart
        pages/
          employee_dashboard_page.dart
          clock_in_page.dart
        widgets/
          employee_card.dart
          clock_in_button.dart

    payment/
      domain/
        entities/
          payment.dart
        value_objects/
          money.dart
          payment_reference.dart
        repositories/
          payment_repository.dart
        services/
          payment_verification_service.dart

      application/
        use_cases/
          initiate_payment_usecase.dart
          verify_payment_usecase.dart
          refund_payment_usecase.dart

      infrastructure/
        datasources/
          payment_remote_datasource.dart
        repositories/
          payment_repository_impl.dart
        dtos/
          payment_dto.dart

      presentation/
        notifier/
          payment_notifier.dart
          payment_notifier.g.dart
        pages/
          payment_page.dart
          payment_confirmation_page.dart
        widgets/
          payment_summary_card.dart

  main.dart
```

The `shared/core` folder holds only what's genuinely shared across all features: base error types, the Result type, dependency injection configuration, and utilities that have no business logic. Everything else belongs inside a feature.

Each feature is a complete vertical slice. Every layer a feature needs lives inside that feature's folder. A developer working on the Employee feature never needs to navigate outside the `features/employee` directory to understand or modify the feature.

---

## Real World Example One: The Employee Feature

The Employee feature manages the complete lifecycle of employee attendance in a workforce management application. Clock-in, clock-out, shift management, and attendance records.

### The Domain

```dart
// value objects
class EmployeeId {
  final String value;

  EmployeeId(this.value) {
    if (value.isEmpty) throw DomainException('Employee ID cannot be empty');
  }
}

class ShiftDuration {
  final Duration duration;

  ShiftDuration(this.duration) {
    if (duration.isNegative) {
      throw DomainException('Shift duration cannot be negative');
    }
    if (duration.inHours > 16) {
      throw DomainException('Shift duration cannot exceed 16 hours');
    }
  }
}
```

```dart :collapsed-lines
// entity
class Employee {
  final EmployeeId id;
  final String name;
  final String teamId;
  DateTime? clockInTime;
  DateTime? clockOutTime;

  Employee({
    required this.id,
    required this.name,
    required this.teamId,
  });

  void clockIn(DateTime time) {
    if (isClockedIn) {
      throw DomainException('Employee is already clocked in');
    }
    clockInTime = time;
    clockOutTime = null;
  }

  void clockOut(DateTime time) {
    if (!isClockedIn) {
      throw DomainException('Employee is not clocked in');
    }
    if (time.isBefore(clockInTime!)) {
      throw DomainException('Clock out time cannot be before clock in time');
    }

    final shift = ShiftDuration(time.difference(clockInTime!));
    clockOutTime = time;
  }

  bool get isClockedIn => clockInTime != null && clockOutTime == null;

  Duration? get currentShiftDuration {
    if (!isClockedIn) return null;
    return DateTime.now().difference(clockInTime!);
  }
}
```

```dart
// repository interface — in the domain layer
abstract class EmployeeRepository {
  Future<Employee?> findById(EmployeeId id);
  Future<List<Employee>> findByTeam(String teamId);
  Future<void> save(Employee employee);
}
```

### The Application Layer

```dart :collapsed-lines
class ClockInUseCase {
  final EmployeeRepository _repository;

  ClockInUseCase(this._repository);

  Future<Result<Employee, AppException>> execute(String employeeId) async {
    try {
      final id = EmployeeId(employeeId);
      final employee = await _repository.findById(id);

      if (employee == null) {
        return Result.failure(
          AppException.notFound('Employee $employeeId not found'),
        );
      }

      employee.clockIn(DateTime.now());
      await _repository.save(employee);

      return Result.success(employee);
    } on DomainException catch (e) {
      return Result.failure(AppException.businessRule(e.message));
    } catch (e) {
      return Result.failure(AppException.unknown(e.toString()));
    }
  }
}

class ClockOutUseCase {
  final EmployeeRepository _repository;

  ClockOutUseCase(this._repository);

  Future<Result<Employee, AppException>> execute(String employeeId) async {
    try {
      final id = EmployeeId(employeeId);
      final employee = await _repository.findById(id);

      if (employee == null) {
        return Result.failure(
          AppException.notFound('Employee $employeeId not found'),
        );
      }

      employee.clockOut(DateTime.now());
      await _repository.save(employee);

      return Result.success(employee);
    } on DomainException catch (e) {
      return Result.failure(AppException.businessRule(e.message));
    } catch (e) {
      return Result.failure(AppException.unknown(e.toString()));
    }
  }
}
```

### The Infrastructure Layer

```dart :collapsed-lines
class EmployeeDTO {
  final String id;
  final String name;
  final String teamId;
  final String? clockInTime;
  final String? clockOutTime;

  const EmployeeDTO({
    required this.id,
    required this.name,
    required this.teamId,
    this.clockInTime,
    this.clockOutTime,
  });

  factory EmployeeDTO.fromJson(Map<String, dynamic> json) {
    return EmployeeDTO(
      id: json['id'] as String,
      name: json['name'] as String,
      teamId: json['team_id'] as String,
      clockInTime: json['clock_in_time'] as String?,
      clockOutTime: json['clock_out_time'] as String?,
    );
  }

  Employee toDomain() {
    final employee = Employee(
      id: EmployeeId(id),
      name: name,
      teamId: teamId,
    );

    if (clockInTime != null) {
      employee.clockIn(DateTime.parse(clockInTime!));
    }
    if (clockOutTime != null) {
      employee.clockOut(DateTime.parse(clockOutTime!));
    }

    return employee;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'team_id': teamId,
      'clock_in_time': clockInTime,
      'clock_out_time': clockOutTime,
    };
  }
}

class EmployeeRepositoryImpl implements EmployeeRepository {
  final EmployeeRemoteDataSource _remote;

  EmployeeRepositoryImpl(this._remote);

  @override
  Future<Employee?> findById(EmployeeId id) async {
    final dto = await _remote.fetchEmployee(id.value);
    return dto?.toDomain();
  }

  @override
  Future<List<Employee>> findByTeam(String teamId) async {
    final dtos = await _remote.fetchTeamEmployees(teamId);
    return dtos.map((dto) => dto.toDomain()).toList();
  }

  @override
  Future<void> save(Employee employee) async {
    final dto = EmployeeDTO(
      id: employee.id.value,
      name: employee.name,
      teamId: employee.teamId,
      clockInTime: employee.clockInTime?.toIso8601String(),
      clockOutTime: employee.clockOutTime?.toIso8601String(),
    );
    await _remote.updateEmployee(dto);
  }
}
```

### The Presentation Layer

```dart
@riverpod
class EmployeeNotifier extends _$EmployeeNotifier {
  @override
  AsyncValue<Employee?> build() => const AsyncData(null);

  Future<void> clockIn(String employeeId) async {
    state = const AsyncLoading();

    final result = await ref
        .read(clockInUseCaseProvider)
        .execute(employeeId);

    result.fold(
      onSuccess: (employee) => state = AsyncData(employee),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }

  Future<void> clockOut(String employeeId) async {
    state = const AsyncLoading();

    final result = await ref
        .read(clockOutUseCaseProvider)
        .execute(employeeId);

    result.fold(
      onSuccess: (employee) => state = AsyncData(employee),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }
}
```

```dart
class EmployeeDashboardPage extends ConsumerWidget {
  final String employeeId;

  const EmployeeDashboardPage({required this.employeeId, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(employeeNotifierProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Employee Dashboard')),
      body: state.when(
        data: (employee) => employee != null
            ? EmployeeDashboardContent(
                employee: employee,
                onClockIn: () => ref
                    .read(employeeNotifierProvider.notifier)
                    .clockIn(employeeId),
                onClockOut: () => ref
                    .read(employeeNotifierProvider.notifier)
                    .clockOut(employeeId),
              )
            : const EmptyDashboard(),
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => ErrorView(message: error.toString()),
      ),
    );
  }
}
```

The widget knows nothing about clocking in, the EmployeeId Value Object, or the DomainException. It renders state and delegates actions to the notifier. Everything else happens in the layers below.

---

## Real World Example Two: The Payment Feature

The Payment feature handles the complete payment lifecycle: initiation, processing, verification, and failure handling. This is a domain with complex business rules that benefit enormously from being modeled explicitly.

### The Domain

```dart :collapsed-lines
enum PaymentStatus {
  pending,
  processing,
  completed,
  failed,
  refunded,
}

class PaymentReference {
  final String value;

  PaymentReference(this.value) {
    if (value.isEmpty) {
      throw DomainException('Payment reference cannot be empty');
    }
    if (!RegExp(r'^[A-Z0-9]{8,16}$').hasMatch(value)) {
      throw DomainException('Invalid payment reference format');
    }
  }
}

class Payment {
  final PaymentReference reference;
  final Money amount;
  final String payerId;
  final String recipientId;
  PaymentStatus status;
  String? failureReason;
  DateTime? processedAt;

  Payment({
    required this.reference,
    required this.amount,
    required this.payerId,
    required this.recipientId,
    this.status = PaymentStatus.pending,
  });

  void startProcessing() {
    if (status != PaymentStatus.pending) {
      throw DomainException(
        'Cannot process payment: current status is ${status.name}',
      );
    }
    status = PaymentStatus.processing;
  }

  void complete() {
    if (status != PaymentStatus.processing) {
      throw DomainException(
        'Cannot complete payment: current status is ${status.name}',
      );
    }
    status = PaymentStatus.completed;
    processedAt = DateTime.now();
  }

  void fail(String reason) {
    if (status != PaymentStatus.processing) {
      throw DomainException(
        'Cannot fail payment: current status is ${status.name}',
      );
    }
    status = PaymentStatus.failed;
    failureReason = reason;
  }

  void refund() {
    if (status != PaymentStatus.completed) {
      throw DomainException(
        'Cannot refund payment: only completed payments can be refunded',
      );
    }
    status = PaymentStatus.refunded;
  }

  bool get canBeRefunded => status == PaymentStatus.completed;
  bool get isTerminal =>
      status == PaymentStatus.completed ||
      status == PaymentStatus.failed ||
      status == PaymentStatus.refunded;
}
```

The Payment entity enforces every valid status transition. A payment that's already processing can't start processing again. A payment that hasn't completed can't be refunded. And a payment that has failed can't be completed.

These rules are encoded into the entity and enforced at every state change.

### The Application Layer

```dart :collapsed-lines
class InitiatePaymentUseCase {
  final PaymentRepository _repository;

  InitiatePaymentUseCase(this._repository);

  Future<Result<Payment, AppException>> execute({
    required String reference,
    required double amount,
    required String currency,
    required String payerId,
    required String recipientId,
  }) async {
    try {
      final payment = Payment(
        reference: PaymentReference(reference),
        amount: Money(amount: amount, currency: currency),
        payerId: payerId,
        recipientId: recipientId,
      );

      payment.startProcessing();
      await _repository.save(payment);

      return Result.success(payment);
    } on DomainException catch (e) {
      return Result.failure(AppException.businessRule(e.message));
    } catch (e) {
      return Result.failure(AppException.unknown(e.toString()));
    }
  }
}

class VerifyPaymentUseCase {
  final PaymentRepository _repository;
  final PaymentVerificationService _verificationService;

  VerifyPaymentUseCase(this._repository, this._verificationService);

  Future<Result<Payment, AppException>> execute(String reference) async {
    try {
      final ref = PaymentReference(reference);
      final payment = await _repository.findByReference(ref);

      if (payment == null) {
        return Result.failure(
          AppException.notFound('Payment $reference not found'),
        );
      }

      final isVerified = await _verificationService.verify(payment);

      if (isVerified) {
        payment.complete();
      } else {
        payment.fail('Verification failed');
      }

      await _repository.save(payment);
      return Result.success(payment);
    } on DomainException catch (e) {
      return Result.failure(AppException.businessRule(e.message));
    } catch (e) {
      return Result.failure(AppException.unknown(e.toString()));
    }
  }
}
```

### The Presentation Layer

```dart :collapsed-lines
@riverpod
class PaymentNotifier extends _$PaymentNotifier {
  @override
  AsyncValue<Payment?> build() => const AsyncData(null);

  Future<void> initiatePayment({
    required String reference,
    required double amount,
    required String currency,
    required String payerId,
    required String recipientId,
  }) async {
    state = const AsyncLoading();

    final result = await ref.read(initiatePaymentUseCaseProvider).execute(
          reference: reference,
          amount: amount,
          currency: currency,
          payerId: payerId,
          recipientId: recipientId,
        );

    result.fold(
      onSuccess: (payment) => state = AsyncData(payment),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }

  Future<void> verifyPayment(String reference) async {
    state = const AsyncLoading();

    final result = await ref
        .read(verifyPaymentUseCaseProvider)
        .execute(reference);

    result.fold(
      onSuccess: (payment) => state = AsyncData(payment),
      onFailure: (error) => state = AsyncError(error, StackTrace.current),
    );
  }
}
```

```dart
class PaymentPage extends ConsumerWidget {
  const PaymentPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(paymentNotifierProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Payment')),
      body: state.when(
        data: (payment) {
          if (payment == null) return const PaymentForm();
          return PaymentStatusView(payment: payment);
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => PaymentErrorView(message: error.toString()),
      ),
    );
  }
}
```

---

## Cross-Feature Communication

Self-contained features inevitably need to communicate. The Employee feature might need to check if a user is authenticated. The Payment feature might need to notify the Employee feature about a salary disbursement.

The rules for cross-feature communication preserve the self-containment of each feature:

### 1. Features never import directly from each other's internal layers.

The Employee feature should never import from `features/payment/domain/entities/payment.dart`. Direct imports between features create tight coupling that defeats the purpose of modularization.

### 2. Shared domain concepts live in `shared/core`.

If both the Employee feature and the Payment feature need a concept like a `UserId` or a `Money` value object, that concept lives in `shared/core/domain` and both features import from there.

### 3. Cross-feature communication happens through defined interfaces.

If the Payment feature needs to know about an employee to process a salary, it depends on an `EmployeeService` interface defined in `shared/core`. The Employee feature provides the implementation. The Payment feature never knows which feature provided it.

### 4. Events and domain notifications use a shared event bus.

When a payment completes, the Payment feature publishes a `PaymentCompleted` domain event. Any feature that needs to react to payment completion subscribes to that event. The Payment feature doesn't know who's listening. The listening features don't import from the Payment feature directly.

---

## Patterns That Enhance Modularization

Certain design patterns work particularly well within a modularized feature structure.

**The Prototype Pattern** is useful for creating employee templates in the Employee feature. An organization might have standard employee profiles for different roles. Cloning a template employee creates a new instance with the same configuration, allowing business rules to fire during the clone's state transitions rather than being bypassed.

```dart
class Employee {
  Employee clone() {
    return Employee(
      id: EmployeeId('${id.value}_copy_${DateTime.now().millisecondsSinceEpoch}'),
      name: name,
      teamId: teamId,
    );
  }
}
```

**The Singleton Pattern** applies to genuinely unique domain objects. The currently authenticated user is a Singleton. The current session is a Singleton. These live in `shared/core` because they are cross-feature concerns.

**The Repository Pattern** is the backbone of infrastructure abstraction in every feature. Domain layers define the interface. Infrastructure layers provide the implementation. Application layers use the interface without knowing which implementation is behind it.

**The Observer Pattern,** through domain events, enables cross-feature communication without tight coupling. Each feature publishes events when significant domain state changes. Other features subscribe to those events through a shared event bus.

---

## Scaling to Large Teams

Feature Modularization becomes even more valuable as teams grow. At ten engineers working on different features simultaneously, the self-contained nature of each feature prevents constant merge conflicts. Engineers working on the Employee feature and engineers working on the Payment feature are almost never touching the same files.

At thirty engineers, features can become separate Dart packages. The Employee feature becomes `packages/employee`. The Payment feature becomes `packages/payment`. They depend on a shared `packages/core` package. Each package has its own `pubspec.yaml`, its own tests, and can be independently versioned. This is the next level of modularization and it follows naturally from the feature-first structure.

At fifty engineers, teams can own entire features. The Employee team owns `packages/employee`. The Payment team owns `packages/payment`. The contracts between features, defined through interfaces in `packages/core`, become the API boundaries between teams. A team can release a new version of their feature package independently, and other teams update to that version when they're ready.

The folder structure you start with today is the same structure that scales to a package-based monorepo at fifty engineers. The concepts don't change. The boundaries just become more explicit.

---

## Conclusion

Feature Modularization isn't a folder structure trick. It's a strategic decision about how to organize software so that it can grow without degrading.

It takes Clean Architecture's layering rules and DDD's domain modeling vocabulary and applies them at the feature level. Each feature owns its domain, business rules, data access, and UI. Nothing leaks out or bleeds in. Each feature can be understood, modified, and tested without understanding the entire application.

The Employee feature enforces attendance rules in its entity. The Payment feature enforces transaction state transitions in its entity. Both features use Value Objects to prevent invalid data from ever entering the domain. Both features use the same Result pattern to propagate failures safely from the domain through the application layer to the presentation layer.

When a new requirement arrives for the Employee feature, you open the employee folder and make the change. The Payment feature is untouched. When a new payment method is added to the Payment feature, you open the payment folder and make the change. The Employee feature is untouched.

This is what self-contained actually means. Not just a folder with a name. A complete vertical slice of your application that owns everything it needs and shares nothing it should not.

That is Feature Modularization. And that's how Flutter apps scale from one engineer to fifty without the codebase becoming a liability.

Happy Coding!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Feature Modularization in Flutter: How to Combine Clean Architecture and Domain-Driven Design for Self-Contained, Scalable Features",
  "desc": "As an engineer working on a small team, your current structure could fly. But what if your team, all contributing to the same codebase, reaches 20 or more people at scale? You'll need careful design t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/feature-modularization-in-flutter-combine-clean-architecture-and-domain-driven-design.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
