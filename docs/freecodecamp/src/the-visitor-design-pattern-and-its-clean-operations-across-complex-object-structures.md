---
lang: en-US
title: "A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures"
description: "Article(s) > A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures"
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
      content: "Article(s) > A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures"
    - property: og:description
      content: "A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-visitor-design-pattern-and-its-clean-operations-across-complex-object-structures.html
prev: /programming/dart/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ff25cbd5-72fc-4f17-8d37-ba8dc909de46.png
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
  name="A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures"
  desc="There's a problem that shows up in almost every growing software system, and most developers don't even realize they're hitting it until the damage is already done. You have a set of objects: differen"
  url="https://freecodecamp.org/news/the-visitor-design-pattern-and-its-clean-operations-across-complex-object-structures"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ff25cbd5-72fc-4f17-8d37-ba8dc909de46.png"/>

There's a problem that shows up in almost every growing software system, and most developers don't even realize they're hitting it until the damage is already done.

You have a set of objects: different types, shapes, and data. And at some point, someone asks you to perform an operation on all of them, like exporting them them to PDF, sending them a notification, generating a report, or calculating their fees.

Your first instinct might be to write a function that checks the type and branches accordingly, like an if-else block or switch statement. Something that says: if this is a NewUser, do this. If this is a JointAccountUser, do that. It works, you ship it, and everyone is happy.

Then another operation comes in. And another. Every single time, you go back to the same place and add another branch. The function grows. The class grows. The test surface grows. What started as a clean model is now a god object that knows how to do everything for everyone.

The Visitor Design Pattern exists to break this cycle completely.

---

## What is the Visitor Design Pattern?

The Visitor pattern is a behavioral design pattern that lets you define a new operation on a family of objects without changing the objects themselves.

The key word there is behavioral. Behavioral patterns are about how objects communicate and distribute responsibility. Where creational patterns deal with how objects are created and structural patterns deal with how they are composed, behavioral patterns deal with how they interact and who is responsible for what.

The Visitor pattern specifically deals with the question of who should own an operation when that operation needs to work differently across multiple object types.

The classic answer is: put the operation on each object. Give each class a method that handles the operation for its own type. But this breaks down the moment you have multiple operations, because now every new operation means touching every class. You're spreading one concern across your entire object hierarchy.

The Visitor pattern flips this. Instead of spreading the operation across the objects, you collect it into one place called a Visitor. The objects simply accept the visitor and let it do its work. Adding a new operation means creating a new Visitor. The existing objects don't change at all.

This is the Open/Closed Principle working exactly as intended: open for extension, closed for modification.

---

## The Problem the Visitor Pattern Solves

Let me show you exactly what this looks like without the Visitor pattern.

Say you have a fintech platform with four types of users: existing customers, new customers, minor account holders, and joint account holders. Your product manager comes in and asks you to add document export. Every user type should be exportable to PDF, Excel, and CSV.

Without Visitor, the natural approach looks something like this:

```dart
class ExistingUser {
  final int id;
  final String firstName;
  final String lastName;
  final DateTime lastPaymentDate;
  final num accountBalance;

  String exportToPdf() {
    return '$firstName\n$lastName\n$lastPaymentDate\n$accountBalance';
  }

  String exportToExcel() {
    return '$firstName,$lastName,$lastPaymentDate,$accountBalance';
  }

  String exportToCsv() {
    return '"$firstName","$lastName","$lastPaymentDate","$accountBalance"';
  }
}
```

And you repeat this for NewUser, MinorAccountUser, and JointAccountUser. Twelve methods spread across four classes just for document export.

Now the product manager comes back. They want notifications: email, SMS, and Push. Back you go to all four classes, adding three more methods each. Twelve more methods spread across the same four classes.

Then they want fee calculation. Then they want KYC status checks. Every new operation multiplies across every user type. The classes grow, the reasons to change multiply, and testing becomes painful.

This is the exact problem the Visitor pattern was built to solve.

---

## Core Components

The Visitor pattern has four core components. Understanding each one before looking at code makes the implementation much easier to follow.

### The Visitor Interface

This is the contract that every visitor must implement. It declares one method per object type it needs to visit. A visitor that handles four user types declares four visit methods, one for each type.

### The Concrete Visitors

These are the real implementations of the Visitor interface. Each one represents a single operation and knows how to handle every object type. A PdfHandler is a concrete visitor. An ExcelHandler is a concrete visitor. A SmsNotificationHandler is a concrete visitor. Each one has one job and knows how to do that job for every user type.

### The Consumer Interface (also called Element or Acceptor)

This is the contract that every object in the hierarchy must implement. It declares a single accept method that takes a Visitor and calls the right visit method on it. This is the double dispatch mechanism that makes the pattern work.

### The Concrete Consumers

These are the real objects in the hierarchy: ExistingCustomers, NewCustomers, MinorCustomer, and JointCustomer. Each one implements accept by calling the specific visit method that corresponds to its own type.

Think of it this way. The Visitor interface is implemented by every operation you want to perform: PdfHandler, ExcelHandler, and CsvHandler. Each of these knows how to handle all four user types.

The Consumer interface is implemented by every object in the hierarchy: ExistingCustomers, NewCustomers, MinorCustomer, and JointCustomer. Each of these knows how to receive a visitor and route it to the correct method.

When you call `existingCustomer.accept(pdfHandler)`, ExistingCustomers calls `pdfHandler.visitExistingCustomer(this)` and passes itself as the argument. The right method fires automatically. There's no type checking, if-else, or switch. The object tells the visitor who it is, and the visitor knows exactly what to do with that information.

---

## Real World Example One: Document Export

This is a real scenario from a fintech platform. There are four user types with different data structures, all needing to export their information to three document formats: PDF, Excel, and CSV.

### Step 1: Define the User Models

```dart :collapsed-lines
class ExistingUser {
  final int id;
  final String firstName;
  final String lastName;
  final DateTime lastPaymentDate;
  final num accountBalance;

  const ExistingUser({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.lastPaymentDate,
    required this.accountBalance,
  });
}

class NewUser {
  final String firstName;
  final String lastName;

  const NewUser({
    required this.firstName,
    required this.lastName,
  });
}

class MinorAccountUser {
  final int age;
  final int guardianId;
  final String firstName;
  final String lastName;
  final String guardianName;

  const MinorAccountUser({
    required this.age,
    required this.guardianId,
    required this.firstName,
    required this.lastName,
    required this.guardianName,
  });
}

class JointAccountUser {
  final int jointAccountId;
  final List<String> accountHoldersInfo;
  final num accountBalance;

  const JointAccountUser({
    required this.jointAccountId,
    required this.accountHoldersInfo,
    required this.accountBalance,
  });
}
```

We have four models. Each one owns its own data and nothing else. There's no export logic or notification logic. And no business operations of any kind. Just clean data structures.

This is exactly how it should be. The model's job is to hold data. The visitor's job is to operate on it.

### Step 2: Define the Visitor and Consumer Interfaces

```dart
abstract class UserVisitor<T> {
  T visitExistingCustomer(ExistingUser user);
  T visitNewCustomer(NewUser user);
  T visitMinorCustomer(MinorAccountUser user);
  T visitJointCustomer(JointAccountUser user);
}

abstract class UserConsumer {
  T accept<T>(UserVisitor<T> visitor);
}
```

`UserVisitor<T>` is generic. The type parameter `T` represents what the visitor returns. A document export visitor returns a String. A fee calculation visitor might return a double. A validation visitor might return a bool. The same pattern works for any return type.

`UserConsumer` declares the accept method. Every object in the hierarchy must implement this. The accept method is what makes the double dispatch work. The object receives the visitor and immediately calls the right visit method on it, passing itself as the argument.

### Step 3: Implement the Concrete Consumers

```dart
class ExistingCustomers implements UserConsumer {
  final ExistingUser user;
  ExistingCustomers({required this.user});

  @override
  T accept<T>(UserVisitor<T> visitor) {
    return visitor.visitExistingCustomer(user);
  }
}

class NewCustomers implements UserConsumer {
  final NewUser user;
  NewCustomers({required this.user});

  @override
  T accept<T>(UserVisitor<T> visitor) {
    return visitor.visitNewCustomer(user);
  }
}

class MinorCustomer implements UserConsumer {
  final MinorAccountUser user;
  MinorCustomer({required this.user});

  @override
  T accept<T>(UserVisitor<T> visitor) {
    return visitor.visitMinorCustomer(user);
  }
}

class JointCustomer implements UserConsumer {
  final JointAccountUser user;
  JointCustomer({required this.user});

  @override
  T accept<T>(UserVisitor<T> visitor) {
    return visitor.visitJointCustomer(user);
  }
}
```

Each consumer wraps one user model and implements accept by forwarding to the correct visit method. This is the entire job of a concrete consumer. It knows who it is, and it tells the visitor by calling the right method.

Notice that none of these classes know anything about PDF, Excel, CSV, email, SMS, or any operation. They're completely decoupled from every operation that will ever be performed on them.

### Step 4: Implement the Concrete Visitors

```dart :collapsed-lines
class PdfHandler implements UserVisitor<String> {
  @override
  String visitExistingCustomer(ExistingUser user) {
    return '${user.firstName} ${user.lastName}'
        '\nBalance: ${user.accountBalance}'
        '\nLast Payment: ${user.lastPaymentDate}';
  }

  @override
  String visitNewCustomer(NewUser user) {
    return '${user.firstName} ${user.lastName}';
  }

  @override
  String visitMinorCustomer(MinorAccountUser user) {
    return '${user.firstName} ${user.lastName}'
        '\nAge: ${user.age}'
        '\nGuardian: ${user.guardianName} (ID: ${user.guardianId})';
  }

  @override
  String visitJointCustomer(JointAccountUser user) {
    final holders = user.accountHoldersInfo.join(', ');
    return 'Joint Account ID: ${user.jointAccountId}'
        '\nHolders: $holders'
        '\nBalance: ${user.accountBalance}';
  }
}

class ExcelHandler implements UserVisitor<String> {
  @override
  String visitExistingCustomer(ExistingUser user) {
    return '${user.firstName}\t${user.lastName}'
        '\t${user.accountBalance}\t${user.lastPaymentDate}';
  }

  @override
  String visitNewCustomer(NewUser user) {
    return '${user.firstName}\t${user.lastName}';
  }

  @override
  String visitMinorCustomer(MinorAccountUser user) {
    return '${user.firstName}\t${user.lastName}'
        '\t${user.age}\t${user.guardianName}\t${user.guardianId}';
  }

  @override
  String visitJointCustomer(JointAccountUser user) {
    final holders = user.accountHoldersInfo.join('\t');
    return '${user.jointAccountId}\t$holders\t${user.accountBalance}';
  }
}

class CsvHandler implements UserVisitor<String> {
  @override
  String visitExistingCustomer(ExistingUser user) {
    return '"${user.firstName}","${user.lastName}"'
        ',"${user.accountBalance}","${user.lastPaymentDate}"';
  }

  @override
  String visitNewCustomer(NewUser user) {
    return '"${user.firstName}","${user.lastName}"';
  }

  @override
  String visitMinorCustomer(MinorAccountUser user) {
    return '"${user.firstName}","${user.lastName}"'
        ',"${user.age}","${user.guardianName}","${user.guardianId}"';
  }

  @override
  String visitJointCustomer(JointAccountUser user) {
    final holders = user.accountHoldersInfo.map((h) => '"$h"').join(',');
    return '"${user.jointAccountId}",$holders,"${user.accountBalance}"';
  }
}
```

Each handler implements the visitor interface and knows exactly how to format each user type for its specific document format. PdfHandler uses newlines and labels. ExcelHandler uses tabs. CsvHandler wraps values in quotes and separates with commas.

The formatting logic for each document type lives in exactly one class. If the PDF format changes, you touch only PdfHandler. If the CSV format changes, you touch only CsvHandler. The user models never change.

### Step 5: Use It

```dart :collapsed-lines
void existingUserLogic() {
  final customer = ExistingCustomers(
    user: ExistingUser(
      id: 10,
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
      lastPaymentDate: DateTime.now(),
      accountBalance: 7373773.39,
    ),
  );

  final pdf = customer.accept(PdfHandler());
  final excel = customer.accept(ExcelHandler());
  final csv = customer.accept(CsvHandler());

  print('PDF:\n$pdf\n');
  print('Excel:\n$excel\n');
  print('CSV:\n$csv\n');
}

void newUserLogic() {
  final customer = NewCustomers(
    user: NewUser(
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
    ),
  );

  customer.accept(PdfHandler());
  customer.accept(ExcelHandler());
  customer.accept(CsvHandler());
}

void minorUserLogic() {
  final customer = MinorCustomer(
    user: MinorAccountUser(
      age: 15,
      guardianId: 82882,
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
      guardianName: 'Inioluwa',
    ),
  );

  customer.accept(PdfHandler());
  customer.accept(ExcelHandler());
  customer.accept(CsvHandler());
}

void jointUserLogic() {
  final customer = JointCustomer(
    user: JointAccountUser(
      jointAccountId: 92,
      accountHoldersInfo: [
        'Oluwaseyi',
        'Aderonke',
        'Inioluwa',
        'Tiwaloluwa',
      ],
      accountBalance: 9200020202.22,
    ),
  );

  customer.accept(PdfHandler());
  customer.accept(ExcelHandler());
  customer.accept(CsvHandler());
}
```

The same customer object accepts any visitor with the same call. The type dispatch happens automatically through the accept method. There's no type checking anywhere in the calling code, and no if-else or switch. Just `customer.accept(handler)` and the right method fires.

Now think about what happens when you need to add an XML export. You create one new class, XmlHandler, implement the four visit methods, and that's it. You don't touch ExistingUser, NewUser, MinorAccountUser, JointAccountUser, or any of the existing handlers. The system is genuinely open for extension and closed for modification.

---

## Real World Example Two: Notification System

Here we have the same four user types and the same pattern. But it's a different operation entirely.

Your platform needs to notify users about account events. But not every user type should be notified the same way.

Existing users get email and push notifications. New users only get email because they haven't fully set up their profile yet. Minor account users get SMS to their guardian's number. Joint account users get notified on all channels because multiple people share the account.

Without the Visitor pattern, this logic would spread across all four user models or collapse into one enormous function full of type checks. With Visitor, it lives in three focused classes.

### The Notification Visitor Interface

```dart
abstract class NotificationVisitor {
  void visitExistingCustomer(ExistingUser user);
  void visitNewCustomer(NewUser user);
  void visitMinorCustomer(MinorAccountUser user);
  void visitJointCustomer(JointAccountUser user);
}
```

This visitor returns void because notifications are side effects. They send messages, they don't return values.

### The Concrete Notification Visitors

```dart :collapsed-lines
class EmailNotificationHandler implements NotificationVisitor {
  @override
  void visitExistingCustomer(ExistingUser user) {
    print('Sending email to existing customer: ${user.firstName}');
    // email service call with full account details
  }

  @override
  void visitNewCustomer(NewUser user) {
    print('Sending welcome email to new customer: ${user.firstName}');
    // welcome email with onboarding steps
  }

  @override
  void visitMinorCustomer(MinorAccountUser user) {
    print('Sending email to guardian: ${user.guardianName}');
    // email goes to guardian, not the minor
  }

  @override
  void visitJointCustomer(JointAccountUser user) {
    for (final holder in user.accountHoldersInfo) {
      print('Sending email to joint holder: $holder');
      // all account holders get notified
    }
  }
}

class SmsNotificationHandler implements NotificationVisitor {
  @override
  void visitExistingCustomer(ExistingUser user) {
    print('Sending SMS to existing customer: ${user.firstName}');
  }

  @override
  void visitNewCustomer(NewUser user) {
    // new users are not SMS-verified yet, skip
    print('New customer ${user.firstName} not SMS-eligible yet');
  }

  @override
  void visitMinorCustomer(MinorAccountUser user) {
    print('Sending SMS to guardian ${user.guardianName} for minor ${user.firstName}');
    // SMS goes to guardian's registered number
  }

  @override
  void visitJointCustomer(JointAccountUser user) {
    for (final holder in user.accountHoldersInfo) {
      print('Sending SMS to joint holder: $holder');
    }
  }
}

class PushNotificationHandler implements NotificationVisitor {
  @override
  void visitExistingCustomer(ExistingUser user) {
    print('Push notification to existing customer: ${user.firstName}');
  }

  @override
  void visitNewCustomer(NewUser user) {
    print('Push notification to new customer: ${user.firstName}');
  }

  @override
  void visitMinorCustomer(MinorAccountUser user) {
    // minors do not have the app installed yet, guardian gets push
    print('Push notification to guardian: ${user.guardianName}');
  }

  @override
  void visitJointCustomer(JointAccountUser user) {
    for (final holder in user.accountHoldersInfo) {
      print('Push notification to joint holder: $holder');
    }
  }
}
```

Each handler knows the specific rules for each user type. `SmsNotificationHandler` knows that new users aren't SMS-verified yet. `PushNotificationHandler` knows that minor account notifications go to the guardian. `EmailNotificationHandler` knows that joint account holders all need to be notified individually.

This business logic lives in exactly one place per notification channel. When the rules change (and they always change), you update one class.

### Using the Notification Visitors

```dart :collapsed-lines
void notifyExistingUser() {
  final customer = ExistingCustomers(
    user: ExistingUser(
      id: 10,
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
      lastPaymentDate: DateTime.now(),
      accountBalance: 7373773.39,
    ),
  );

  customer.accept(EmailNotificationHandler());
  customer.accept(SmsNotificationHandler());
  customer.accept(PushNotificationHandler());
}

void notifyMinorUser() {
  final customer = MinorCustomer(
    user: MinorAccountUser(
      age: 15,
      guardianId: 82882,
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
      guardianName: 'Inioluwa',
    ),
  );

  // all three channels fire, each with minor-specific rules
  customer.accept(EmailNotificationHandler());
  customer.accept(SmsNotificationHandler());
  customer.accept(PushNotificationHandler());
}

void notifyJointUser() {
  final customer = JointCustomer(
    user: JointAccountUser(
      jointAccountId: 92,
      accountHoldersInfo: [
        'Oluwaseyi',
        'Aderonke',
        'Inioluwa',
        'Tiwaloluwa',
      ],
      accountBalance: 9200020202.22,
    ),
  );

  customer.accept(EmailNotificationHandler());
  customer.accept(SmsNotificationHandler());
  customer.accept(PushNotificationHandler());
}
```

The calling code is identical regardless of the user type or the notification channel. The dispatch is automatic. The rules live inside the visitors.

When WhatsApp notifications become a requirement (and they will), you create one `WhatsAppNotificationHandler` class with four visit methods. Nothing else changes.

---

## Real World Example Three: Fee Calculation

Again, we have the same four user types and the same pattern. And once again, we have a completely different operation.

Your platform needs to calculate monthly maintenance fees. But each user type has different rules.

Existing customers pay a flat monthly fee based on their account balance. New customers are fee-exempt for their first three months. Minor account holders pay a reduced fee because their accounts have restricted features. Joint account holders have their fee split equally across all account holders.

Without Visitor, this logic ends up as a giant method somewhere with four branches, or worse, it leaks into the user models themselves. With Visitor, it lives in one focused class.

### The Fee Visitor Interface

```dart
abstract class FeeVisitor {
  double visitExistingCustomer(ExistingUser user);
  double visitNewCustomer(NewUser user);
  double visitMinorCustomer(MinorAccountUser user);
  double visitJointCustomer(JointAccountUser user);
}
```

This visitor returns a double because fee calculation produces a numeric value.

### The Concrete Fee Visitor

```dart
class MonthlyFeeCalculator implements FeeVisitor {
  @override
  double visitExistingCustomer(ExistingUser user) {
    // 0.5% of account balance, minimum 500, maximum 5000
    final fee = user.accountBalance * 0.005;
    return fee.clamp(500, 5000).toDouble();
  }

  @override
  double visitNewCustomer(NewUser user) {
    // new customers are fee-exempt for the first 3 months
    return 0.0;
  }

  @override
  double visitMinorCustomer(MinorAccountUser user) {
    // flat reduced fee for minor accounts
    return 150.0;
  }

  @override
  double visitJointCustomer(JointAccountUser user) {
    // standard fee split equally across all holders
    const standardFee = 2000.0;
    return standardFee / user.accountHoldersInfo.length;
  }
}
```

Every fee rule for every user type lives in this one class. When the fee structure changes for existing customers, you touch one method in one class. When minor account fees are updated, same thing. None of the user models change, and no other visitor changes.

### Using the Fee Visitor

```dart :collapsed-lines
void calculateFees() {
  final existingCustomer = ExistingCustomers(
    user: ExistingUser(
      id: 10,
      firstName: 'Oluwaseyi',
      lastName: 'Fatunmole',
      lastPaymentDate: DateTime.now(),
      accountBalance: 7373773.39,
    ),
  );

  final newCustomer = NewCustomers(
    user: NewUser(
      firstName: 'Aderonke',
      lastName: 'Fatunmole',
    ),
  );

  final minorCustomer = MinorCustomer(
    user: MinorAccountUser(
      age: 15,
      guardianId: 82882,
      firstName: 'Inioluwa',
      lastName: 'Fatunmole',
      guardianName: 'Oluwaseyi',
    ),
  );

  final jointCustomer = JointCustomer(
    user: JointAccountUser(
      jointAccountId: 92,
      accountHoldersInfo: [
        'Oluwaseyi',
        'Aderonke',
        'Inioluwa',
        'Tiwaloluwa',
      ],
      accountBalance: 9200020202.22,
    ),
  );

  final calculator = MonthlyFeeCalculator();

  final existingFee = existingCustomer.accept(calculator);
  final newFee = newCustomer.accept(calculator);
  final minorFee = minorCustomer.accept(calculator);
  final jointFee = jointCustomer.accept(calculator);

  print('Existing customer fee: NGN $existingFee');
  print('New customer fee: NGN $newFee');
  print('Minor account fee: NGN $minorFee');
  print('Joint account fee per holder: NGN $jointFee');
}
```

The output:

```plaintext
Existing customer fee: NGN 5000.0
New customer fee: NGN 0.0
Minor account fee: NGN 150.0
Joint account fee per holder: NGN 500.0
```

When a `PremiumFeeCalculator` is needed for a new tier of customers, you create one new class that implements `FeeVisitor`. The user models stay exactly as they are. The `MonthlyFeeCalculator` stays exactly as it is. The accept methods on all four consumers stay exactly as they are.

---

## The Power of Combining All Three Operations

Here's what makes the Visitor pattern truly shine in a system like this. You have the same four user types, and you can run any combination of visitors on any of them in the same call chain.

```dart
void processUser(UserConsumer customer) {
  final pdf = customer.accept(PdfHandler());
  final csv = customer.accept(CsvHandler());

  customer.accept(EmailNotificationHandler());
  customer.accept(PushNotificationHandler());

  final fee = customer.accept(MonthlyFeeCalculator());

  print('Fee: NGN $fee');
  print('Documents generated and notifications sent');
}
```

One function, any user type, any combination of operations. The consumer doesn't care which visitors it receives. The visitors don't care which consumers call them. They speak to each other through the interface, and the interface guarantees everything works correctly.

We have three completely different operations (document export, notifications, and fee calculation) all applied to the same object with the same call pattern. None of these operations know about each other. None of them touch the user models. Each one lives in its own focused class with its own single reason to change.

---

## When to Use the Visitor Pattern

Use Visitor when you have a stable set of object types and a growing set of operations on them.

The pattern shines when the object hierarchy is unlikely to change frequently. It's optimized for adding new operations, not new types. Adding a new user type means updating every existing visitor. If your object types change constantly, Visitor creates more work than it saves.

It's also very effective when you need to perform multiple unrelated operations on a family of objects without polluting their classes with that logic. Document export, notification handling, fee calculation, and KYC validation are all unrelated operations. Each belongs in its own visitor, not scattered across the user models.

Visitor also works well when you want clean separation between data and behavior. The models hold data and the visitors define behavior. This makes both easier to understand, easier to test, and easier to maintain independently.

---

## When Not to Use It

Avoid Visitor when the object hierarchy changes frequently. Every time you add a new type, you must update every existing visitor. In a system where new user types appear regularly, this becomes painful quickly.

It's also not helpful when you only have one or two operations. For simple cases, the overhead of creating visitor interfaces, consumer interfaces, and multiple classes is not worth the benefit.

And avoid it when the operations are tightly coupled to the object's internal state in ways that make sense to keep together. Some behavior naturally belongs on the object itself.

---

## Conclusion

The Visitor Design Pattern solves a problem that most developers only recognize after they've already made a mess of it. You have a family of objects with different types and different data. Operations come in one after another. Without a deliberate structure, those operations spread everywhere: into the models, utility classes, and massive switch statements that nobody wants to touch.

Visitor collects each operation into one focused class. The models stay clean and the operations stay isolated. Adding a new operation means creating one new class. The existing code doesn't change.

In the fintech examples above, we have three entirely different concerns: document export, notifications, and fee calculation. All are handled by handled by focused classes, none of which know anything about each other. The user models don't know about PDF or email or fees. The PdfHandler doesn't know about SMS. The MonthlyFeeCalculator doesn't know about push notifications. Each class has exactly one reason to exist and exactly one reason to change.

That s what a well-applied Visitor pattern looks like in practice. Clean, focused, and genuinely extensible.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Deep Dive into Behavioral Patterns: The Visitor Design Pattern and its Clean Operations Across Complex Object Structures",
  "desc": "There's a problem that shows up in almost every growing software system, and most developers don't even realize they're hitting it until the damage is already done. You have a set of objects: differen",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-visitor-design-pattern-and-its-clean-operations-across-complex-object-structures.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
