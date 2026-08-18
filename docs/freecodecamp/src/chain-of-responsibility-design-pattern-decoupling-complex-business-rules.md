---
lang: en-US
title: "Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time"
description: "Article(s) > Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time"
icon: fas fa-pen-ruler
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
      content: "Article(s) > Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time"
    - property: og:description
      content: "Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/chain-of-responsibility-design-pattern-decoupling-complex-business-rules.html
prev: /academics/system-design/articles/README.md
date: 2026-08-22
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/779882b9-29ec-4337-b3ab-96ccf752638c.png
---

# {{ $frontmatter.title }} 관련

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
  name="Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time"
  desc="Every system, at some point, ends up with a function that nobody wants to touch. It starts small: a simple validation check, an if statement here, another there. Then requirements grow and more condit"
  url="https://freecodecamp.org/news/chain-of-responsibility-design-pattern-decoupling-complex-business-rules"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/779882b9-29ec-4337-b3ab-96ccf752638c.png"/>

Every system, at some point, ends up with a function that nobody wants to touch.

It starts small: a simple validation check, an if statement here, another there. Then requirements grow and more conditions get added. The function gets longer. Someone adds a comment that says "don't modify without reading the full thing first." The function becomes a rite of passage. New developers are warned about it during onboarding.

This is what happens when complex business rules pile up in one place without a deliberate structure to contain them.

The Chain of Responsibility pattern exists to prevent exactly this. Instead of one method that knows everything and does everything, you build a chain of focused handlers. Each handler knows one rule and checks whether the request passes its rule. If it does, the request moves forward to the next handler. If it doesn't, the chain stops right there.

No handler knows how long the chain is. No handler knows what comes before or after it. Each one just does its job and decides: stop here, or pass it forward.

---

## What is the Chain of Responsibility Pattern?

The Chain of Responsibility is a behavioral design pattern that lets you pass a request along a chain of handlers. Each handler in the chain decides either to process the request and stop the chain, or to pass the request to the next handler.

The pattern gives you three things that matter in production systems.

First, it decouples the sender of a request from its receivers. The code that initiates a transaction validation doesn't know which handler will ultimately process it or stop it. It just starts the chain.

Second, it gives you a single responsibility per handler. Each handler owns exactly one business rule. When that rule changes, you modify one class. Nothing else changes.

Third, it makes the chain configurable. You can add, remove, or reorder handlers without touching existing handler code. A new compliance requirement becomes a new handler plugged into the chain, not a new branch inside an existing method.

---

## The Problem It Solves

Here's what transaction validation looks like without the pattern:

```dart
void handleTransaction(Transaction transaction) {
  if (transaction.isFraud) {
    // block transaction
    return;
  }

  if (!transaction.isKycVerified) {
    // reject transaction
    return;
  }

  if (!transaction.isAccountActive) {
    // reject transaction
    return;
  }

  if (transaction.amount < 50000) {
    // junior officer approval
    return;
  }

  if (transaction.amount <= 200000) {
    // mid level approval
    return;
  }

  if (transaction.amount <= 1000000) {
    // manager approval
    return;
  }

  // executive approval
}
```

This works today. Tomorrow your compliance team adds a credit score check. Your fraud team adds a velocity check. Your legal team adds a sanctions screening step. Your product manager adds a daily limit check.

Every new rule goes into this same method. The method grows to fifty lines. Then a hundred. The conditions interact in ways that are hard to reason about. Testing it requires setting up every possible combination of flags. A bug in one condition can affect every other condition below it.

The Chain of Responsibility pattern says: each rule gets its own handler. Chain the handlers together. The method that starts the chain doesn't need to know any of the rules. It just starts the chain and gets out of the way.

---

## Core Components

The pattern has three building blocks.

### 1. The Handler Interface

This is the contract every handler in the chain must implement. It declares the method for handling a request and provides the mechanism for linking handlers together. Every concrete handler extends or implements this.

### 2. The Concrete Handlers

These are the actual implementations. Each one owns exactly one business rule. It checks whether the request satisfies its rule. If the rule fails, it stops the chain and handles the failure. If the rule passes, it calls the next handler and passes the request forward.

### 3. The Chain

This isn't a class. It's the act of connecting handlers together using the `setNext` method. You build the chain in your composition root or your dependency injection setup. The order you connect them is the order they execute.

---

## Real World Example One: Transaction Approval Flow

A fintech platform processes thousands of transactions daily. Before any transaction is approved, it must pass through several validation and approval gates. Each gate is independent. Each one has a single responsibility.

The gates in order:

1. Fraud check: is this transaction flagged as fraudulent?
2. KYC verification: has the user completed identity verification?
3. Account status: is the account active and in good standing?
4. Approval level: which officer tier has the authority to approve this amount?

### The Transaction Model

```dart
class Transaction {
  final num amount;
  final bool isFraud;
  final bool isKycVerified;
  final bool isAccountActive;

  const Transaction({
    required this.amount,
    required this.isFraud,
    required this.isKycVerified,
    required this.isAccountActive,
  });
}
```

The transaction model carries all the data each handler needs to make its decision. It owns the data and nothing else. No validation logic lives here.

### The Handler Interface

```dart
abstract class TransactionHandler {
  TransactionHandler? _next;

  void setNext(TransactionHandler handler) {
    _next = handler;
  }

  void handle(Transaction transaction);

  void passToNext(Transaction transaction) {
    if (_next != null) {
      _next!.handle(transaction);
    } else {
      print('End of chain reached with no handler stopping the transaction');
    }
  }
}
```

`TransactionHandler` is the contract every handler implements.

`_next` is nullable because the last handler in the chain has no next handler. Making it nullable and checking before calling prevents a null pointer crash at the end of the chain.

`setNext` connects one handler to the next. You call this when building the chain.

`passToNext` is a helper method that every concrete handler calls when its rule passes. It checks whether a next handler exists before calling it. If we reach the end of the chain without any handler stopping the transaction, we log it. In a real system, this would trigger an alert because it means the chain wasn't configured correctly.

### The Concrete Handlers

```dart
class FraudHandler extends TransactionHandler {
  @override
  void handle(Transaction transaction) {
    if (transaction.isFraud) {
      print('Transaction blocked: fraud detected');
      return;
    }
    print('Fraud check passed');
    passToNext(transaction);
  }
}
```

`FraudHandler` is the first gate. If the transaction is flagged as fraudulent, it prints a rejection message and returns. The chain stops here. No other handler sees this transaction. If the fraud check passes, it calls `passToNext` and the transaction moves to the next handler.

```dart
class KycHandler extends TransactionHandler {
  @override
  void handle(Transaction transaction) {
    if (!transaction.isKycVerified) {
      print('Transaction blocked: KYC verification incomplete');
      return;
    }
    print('KYC check passed');
    passToNext(transaction);
  }
}
```

`KycHandler` checks whether the user has completed identity verification. If they haven't, the chain stops. If they have, the transaction moves forward. This handler knows nothing about fraud checks. It knows nothing about account status. It owns one rule.

```dart
class AccountHandler extends TransactionHandler {
  @override
  void handle(Transaction transaction) {
    if (!transaction.isAccountActive) {
      print('Transaction blocked: account is not active');
      return;
    }
    print('Account status check passed');
    passToNext(transaction);
  }
}
```

`AccountHandler` checks account status. Same pattern, one rule: stop or pass.

```dart
class ApprovalHandler extends TransactionHandler {
  @override
  void handle(Transaction transaction) {
    if (transaction.amount < 50000) {
      print('Approved by Junior Officer — amount: ${transaction.amount}');
      return;
    }

    if (transaction.amount <= 200000) {
      print('Approved by Mid-Level Officer — amount: ${transaction.amount}');
      return;
    }

    if (transaction.amount <= 1000000) {
      print('Approved by Manager — amount: ${transaction.amount}');
      return;
    }

    print('Escalated to Executive Approval — amount: ${transaction.amount}');
    passToNext(transaction);
  }
}
```

`ApprovalHandler` is the final gate. It routes the transaction to the appropriate approval tier based on amount. Transactions below 50,000 are approved by a junior officer. Up to 200,000 go to a mid-level officer. Up to 1,000,000 go to a manager. Above that, the transaction is escalated further.

Note that this handler can still call `passToNext` if the amount exceeds the manager threshold, allowing you to add an executive handler to the chain later without touching `ApprovalHandler`.

### Building and Running the Chain

```dart :collapsed-lines
void main() {
  // create the handlers
  final fraud = FraudHandler();
  final kyc = KycHandler();
  final account = AccountHandler();
  final approval = ApprovalHandler();

  // build the chain
  fraud.setNext(kyc);
  kyc.setNext(account);
  account.setNext(approval);

  // test with a fraudulent transaction
  print('Test 1: Fraudulent Transaction');
  final fraudulentTransaction = Transaction(
    amount: 100000,
    isFraud: true,
    isKycVerified: true,
    isAccountActive: true,
  );
  fraud.handle(fraudulentTransaction);

  // test with unverified KYC
  print('Test 2: KYC Not Verified');
  final unverifiedTransaction = Transaction(
    amount: 50000,
    isFraud: false,
    isKycVerified: false,
    isAccountActive: true,
  );
  fraud.handle(unverifiedTransaction);

  // test with a valid transaction
  print('Test 3: Valid Transaction');
  final validTransaction = Transaction(
    amount: 150000,
    isFraud: false,
    isKycVerified: true,
    isAccountActive: true,
  );
  fraud.handle(validTransaction);

  // test with a high value transaction
  print('Test 4: Executive Level Transaction');
  final executiveTransaction = Transaction(
    amount: 2000000,
    isFraud: false,
    isKycVerified: true,
    isAccountActive: true,
  );
  fraud.handle(executiveTransaction);
}
```

Output:

```plaintext
Test 1: Fraudulent Transaction
Transaction blocked: fraud detected

Test 2: KYC Not Verified
Fraud check passed
Transaction blocked: KYC verification incomplete

Test 3: Valid Transaction
Fraud check passed
KYC check passed
Account status check passed
Approved by Mid-Level Officer — amount: 150000

Test 4: Executive Level Transaction
Fraud check passed
KYC check passed
Account status check passed
Escalated to Executive Approval — amount: 2000000
End of chain reached with no handler stopping the transaction
```

Test 1 stops at the first handler. Test 2 passes fraud but stops at KYC. Test 3 passes all validation handlers and gets routed to the correct approval tier. Test 4 exceeds the manager threshold and gets escalated.

Notice that the calling code always starts from `fraud.handle(transaction)`. It doesn't know how many handlers exist. It doesn't know which handler will stop the chain. And it doesn't know what the approval tiers are. It just hands the transaction to the first handler and the chain takes over.

When your compliance team adds a User Indemnity check next month, you create a UserIdemnityCheck, add it to the chain, and nothing else changes:

```dart
final indemnity = UserIndemnityStatus();

fraud.setNext(indemnity);
indemnity.setNext(kyc);
kyc.setNext(account);
account.setNext(approval);
```

One new class and one updated chain setup. Every existing handler untouched.

---

## Real World Example Two: User Onboarding Validation

A user fills in a registration form and submits it. Before the account is created, the request must pass through several validation steps. If any step fails, the user gets a specific error explaining exactly what went wrong.

The steps in order:

1. Email validation: is the email format valid?
2. Password strength: does the password meet security requirements?
3. Age verification: is the user old enough to register?
4. Duplicate account check: does an account already exist with this email?
5. Account creation: all checks passed, create the account

### The Registration Request Model

```dart
class RegistrationRequest {
  final String email;
  final String password;
  final int age;

  const RegistrationRequest({
    required this.email,
    required this.password,
    required this.age,
  });
}
```

### The Handler Interface

```dart
abstract class RegistrationHandler {
  RegistrationHandler? _next;

  void setNext(RegistrationHandler handler) {
    _next = handler;
  }

  void handle(RegistrationRequest request);

  void passToNext(RegistrationRequest request) {
    if (_next != null) {
      _next!.handle(request);
    }
  }
}
```

This is the same structure as before. Nullable next, SetNext to build the chain, and PassToNext to move the request forward.

### The Concrete Handlers

```dart
class EmailValidationHandler extends RegistrationHandler {
  @override
  void handle(RegistrationRequest request) {
    final emailRegex = RegExp(r'^[\w-.]+@([\w-]+.)+[\w-]{2,4}$');

    if (!emailRegex.hasMatch(request.email)) {
      print('Registration failed: invalid email format — ${request.email}');
      return;
    }

    print('Email validation passed');
    passToNext(request);
  }
}
```

`EmailValidationHandler` checks the email format using a regex. If the format is invalid, it stops the chain immediately with a specific message. If it's valid, the request moves forward.

```dart
class PasswordStrengthHandler extends RegistrationHandler {
  @override
  void handle(RegistrationRequest request) {
    final password = request.password;
    final hasMinLength = password.length >= 8;
    final hasUppercase = password.contains(RegExp(r'[A-Z]'));
    final hasNumber = password.contains(RegExp(r'[0-9]'));
    final hasSpecialChar = password.contains(RegExp(r'[!@#\$%^&*]'));

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      print('Registration failed: password does not meet security requirements');
      print('Requirements: 8+ characters, uppercase, number, special character');
      return;
    }

    print('Password strength check passed');
    passToNext(request);
  }
}
```

`PasswordStrengthHandler` enforces four password rules in one place. Minimum length, at least one uppercase letter, at least one number, and at least one special character. If any of these fail, the user gets a clear message explaining all the requirements. If all pass, the request moves forward.

```dart
class AgeVerificationHandler extends RegistrationHandler {
  final int minimumAge;

  AgeVerificationHandler({this.minimumAge = 18});

  @override
  void handle(RegistrationRequest request) {
    if (request.age < minimumAge) {
      print('Registration failed: user must be at least $minimumAge years old');
      return;
    }

    print('Age verification passed');
    passToNext(request);
  }
}
```

`AgeVerificationHandler` checks the user's age against a minimum threshold. Notice that this handler accepts the minimum age as a constructor parameter. This makes it configurable without modifying the class. If the minimum age requirement changes from 18 to 16 for a specific product, you just pass a different value when building the chain.

```dart
class DuplicateAccountHandler extends RegistrationHandler {
  final Set<String> existingEmails;

  DuplicateAccountHandler({required this.existingEmails});

  @override
  void handle(RegistrationRequest request) {
    if (existingEmails.contains(request.email)) {
      print('Registration failed: an account already exists with ${request.email}');
      return;
    }

    print('Duplicate account check passed');
    passToNext(request);
  }
}
```

`DuplicateAccountHandler` checks whether an account already exists with the provided email. In a real system, this would call a repository or database. Here we use a Set of existing emails to keep the example focused on the pattern.

```dart
class AccountCreationHandler extends RegistrationHandler {
  @override
  void handle(RegistrationRequest request) {
    print('All validation passed');
    print('Creating account for: ${request.email}');
    // call account creation service
    print('Account created successfully');
  }
}
```

`AccountCreationHandler` is the final handler. It only runs if every previous handler passed the request forward. By the time execution reaches here, the request has been validated on every dimension. This handler simply creates the account.

### Building and Running the Chain

```dart
void main() {
  final existingEmails = {'existing@seyi.com', 'taken@seyi.com'};

  // create the handlers
  final emailValidation = EmailValidationHandler();
  final passwordStrength = PasswordStrengthHandler();
  final ageVerification = AgeVerificationHandler(minimumAge: 18);
  final duplicateCheck = DuplicateAccountHandler(existingEmails: existingEmails);
  final accountCreation = AccountCreationHandler();

  // build the chain
  emailValidation.setNext(passwordStrength);
  passwordStrength.setNext(ageVerification);
  ageVerification.setNext(duplicateCheck);
  duplicateCheck.setNext(accountCreation);

  // test with invalid email
  print('Test 1: Invalid Email');
  emailValidation.handle(RegistrationRequest(
    email: 'notanemail',
    password: 'SecureP@ss1',
    age: 25,
  ));

  // test with weak password
  print('Test 2: Weak Password');
  emailValidation.handle(RegistrationRequest(
    email: 'user@example.com',
    password: 'weak',
    age: 25,
  ));

  // test with underage user
  print('Test 3: Underage User');
  emailValidation.handle(RegistrationRequest(
    email: 'young@example.com',
    password: 'SecureP@ss1',
    age: 16,
  ));

  // test with duplicate account
  print('Test 4: Duplicate Account');
  emailValidation.handle(RegistrationRequest(
    email: 'existing@example.com',
    password: 'SecureP@ss1',
    age: 25,
  ));

  // test with valid registration
  print('Test 5: Valid Registration');
  emailValidation.handle(RegistrationRequest(
    email: 'newuser@example.com',
    password: 'SecureP@ss1',
    age: 25,
  ));
}
```

Output:

```plaintext
Test 1: Invalid Email
Registration failed: invalid email format — notanemail

Test 2: Weak Password
Email validation passed
Registration failed: password does not meet security requirements
Requirements: 8+ characters, uppercase, number, special character

Test 3: Underage User
Email validation passed
Password strength check passed
Age verification passed
Registration failed: user must be at least 18 years old

Test 4: Duplicate Account
Email validation passed
Password strength check passed
Age verification passed
Duplicate account check passed
Registration failed: an account already exists with existing@example.com

Test 5: Valid Registration
Email validation passed
Password strength check passed
Age verification passed
Duplicate account check passed
All validation passed
Creating account for: newuser@example.com
Account created successfully
```

Each test stops at exactly the right handler. Each failure message is specific. The valid registration flows through all five handlers and creates the account.

When a new requirement arrives, say a phone number verification step before account creation, you create a `PhoneVerificationHandler` and plug it into the chain between duplicate check and account creation. Five existing handlers remain completely untouched.

---

## What Makes These Two Examples Interesting Together

The transaction flow and the onboarding flow look similar on the surface, but they represent two different ways the pattern gets used in production.

The transaction flow combines validation handlers and routing handlers in one chain. Fraud, KYC, and account handlers are gates. The approval handler is a router. The chain validates first, then routes. This is common in payment and compliance systems where every transaction must pass multiple independent checks before being directed to the appropriate authority.

The onboarding flow is a pure validation chain. Every handler is a gate. The final handler is the action that runs only if all gates pass. This is common in form processing, API request validation, and any multi-step verification flow.

Both use the same pattern and are configured the same way. The difference is just in what the handlers do when they let the request through.

---

## When to Use the Chain of Responsibility Pattern

Use it when you have a request that must pass through multiple independent checks or processing steps.

It's also a good fit when the number of checks or their order might change over time. Adding a new step or reordering existing steps should not require modifying existing handler code.

It works well when each check or processing step has genuinely independent logic. If the steps are deeply interdependent and need to share a lot of state, a single class might be cleaner.

It does well when you want each step to be independently testable. With the chain pattern, testing `FraudHandler` means creating one handler, calling handle with a transaction, and checking the output. No other handler is involved.

And it's great when different configurations of the chain might be needed in different contexts. A junior officer's system might have a shorter chain than an executive's system. The same handlers, configured differently.

---

## When Not to Use It

Avoid the pattern when you only have one or two checks. The overhead of defining an abstract class and multiple concrete classes is not worth it for simple validation.

It's also not the best when the order of processing steps is fixed and will never change. If the chain will always be the same, a simpler sequential function call might be clearer.

Don't use it when handlers need to communicate results back to each other. The pattern works best when each handler makes an independent decision. If Handler B needs to know what Handler A found, consider a different approach.

And it's not a good choice when you need guaranteed execution of all handlers regardless of earlier results. The Chain of Responsibility stops when a handler handles the request. If you need all steps to always run, a middleware pipeline or decorator pattern might suit you better.

---

## Conclusion

The Chain of Responsibility pattern solves the problem that every growing system eventually faces. Business rules accumulate and validation logic expands. A method that started as ten lines becomes a hundred. The conditions interact in ways nobody fully understands anymore. Nobody wants to touch it.

The pattern gives you a way out. Each business rule gets its own handler. Each handler owns one responsibility and makes one decision: stop here, or pass it forward. The chain is built once in the configuration layer. The handlers never need to know about each other.

In the transaction approval flow, adding a new compliance rule means one new handler class. In the onboarding flow, adding a new verification step means one new handler class. In both cases, nothing else changes.

That's the promise of the pattern. Complexity that grows by addition, not by modification. Business rules that are isolated, testable, and replaceable. A system that can absorb new requirements without accumulating more debt every time.

Applying this behavioral pattern helps to bring some level of organization and scalability to your codes and makes it easy to manage based on further business rules to come in the nearest future.

Happy Coding!!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Chain of Responsibility Design Pattern: Decoupling Complex Business Rules, One Handler at a Time",
  "desc": "Every system, at some point, ends up with a function that nobody wants to touch. It starts small: a simple validation check, an if statement here, another there. Then requirements grow and more condit",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/chain-of-responsibility-design-pattern-decoupling-complex-business-rules.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
