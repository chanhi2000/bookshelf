---
lang: en-US
title: "Learn Object-Oriented Programming in TypeScript"
description: "Article(s) > Learn Object-Oriented Programming in TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Object-Oriented Programming in TypeScript"
    - property: og:description
      content: "Learn Object-Oriented Programming in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-object-oriented-programming-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2025-05-12
isOriginal: false
author:
  - name: Lucas
    url : https://freecodecamp.org/news/author/lucasgarcez/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747058547629/98922409-4eaf-45e5-8721-10c6a1e6e5e4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Object-Oriented Programming in TypeScript"
  desc="Object-Oriented Programming (OOP) is one of the most widely used programming paradigms in software development. But is also one of the most misunderstood. This article will help you gain a solid grasp of OOP in TypeScript by walking you through the l..."
  url="https://freecodecamp.org/news/learn-object-oriented-programming-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747058547629/98922409-4eaf-45e5-8721-10c6a1e6e5e4.png"/>

Object-Oriented Programming (OOP) is one of the most widely used programming paradigms in software development. But is also one of the most misunderstood.

This article will help you gain a solid grasp of OOP in TypeScript by walking you through the language features that support it, and then showing how these features naturally give rise to the four foundational principles: **inheritance**, **polymorphism**, **encapsulation**, and **abstraction**.

::: note Prerequisites

To get the most out of this article, you should be familiar with:

- **JavaScript fundamentals** - variables, functions, objects, and arrays.
- **Basic TypeScript syntax** - including types and how they differ from plain JavaScript.

:::

::: tip How to Read This Article

I’ve organized this article into two sections. The first section covers TypeScript language features that enable you to implement Object-Oriented Programming (OOP). The second part discusses concepts derived from these features that lead to the four OOP principles: inheritance, polymorphism, encapsulation, and abstraction.

While many teachers, books, and courses start by explaining these principles, I prefer to start with the language features themselves. The reason is simple: they are formal structures - in other words, concrete. Moreover, throughout the article, you'll notice that the OOP principles naturally emerge when you use the language structure correctly.

:::

---

## TypeScript Language Features

In this section, we’ll explore TypeScript's features that facilitate OOP implementation. Similar mechanisms exist in other object-oriented languages, such as Java and C#, though they may vary in syntax while preserving the core concepts.

### Objects

An object is a data type that stores a collection of values organized into key/value pairs. These may include primitive data or other objects.

In the following example, the `person` object stores various pieces of information, such as the key `name`, which contains the value `"Lucas"` of type `string`, and the `address` key, which holds another object.

```ts
const person = {
  name: "Lucas", // primitive value of type string
  surname: "Garcez",
  age: 28, // primitive value of type number
  address: {
    // object type containing the keys "city" and "country"
    city: "Melbourne",
    country: "Australia",
  },
};
```

### Classes, Attributes, and Methods

A class serves as a blueprint for creating objects. It specifies an object's structure and behavior through its attributes and methods. Attributes outline the data structure (keys and value types), whereas methods define the actions that can be performed on those attributes.

```ts
class Person {
  name: string; // attribute
  surname: string; // attribute
  age: number; // attribute

  // constructor method (special method)
  constructor(name: string, surname: string, age: number) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  // method to obtain the full name: "Lucas Garcez"
  getFullName() {
    return `${this.name} ${this.surname}`;
  }
}
```

#### Constructor Method

The constructor is a special method within a class. It’s automatically invoked when a new object is created. Constructors are responsible for initializing the class attributes with values provided during object creation. In TypeScript, the constructor is defined using the `constructor` keyword, as you can see in the code above.

#### Instance

An instance refers to an object created from a class. For example, using the class `Person` mentioned above, you can create an object named `lucas`. Therefore, `lucas` is an instance of the class `Person`. To create an instance of an object in JavaScript or TypeScript, you use the keyword `new`, as demonstrated below:

```ts
const lucas = new Person("Lucas", "Garcez", 28);
lucas.name; // "Lucas"
lucas.getFullName(); // "Lucas Garcez"
```

It is important to note that you can create multiple objects (instances) from the same class. Although all these objects share the same structure (attributes and methods), they are independent and occupy separate memory spaces within the program.

For instance, when creating a new object:

```ts
const maria = new Person("Maria", "Oliveira", 19);
```

You now have a new instance of the `Person` class that doesn't interfere with the previously created `lucas` object. Each instance maintains its own values and behaviors, ensuring that manipulating one object doesn't affect the others.

### Interfaces

An interface defines a contract establishing which attributes and methods a class must implement. In TypeScript, this relationship is established using the keyword `implements`. When a class implements an interface, it must include all the attributes and methods specified by that interface and their respective types.

In the following example, you have a banking system where a customer can have either `CurrentAccount` or `SavingsAccount` account. Both options must adhere to the bank’s general account rules defined by the `BankAccount` interface.

```ts :collapsed-lines
// Contract defining the attributes and methods of a bank account
interface BankAccount {
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

class CurrentAccount implements BankAccount {
  balance: number;
  // The class can have other attributes and methods
  // beyond those specified in the interface
  overdraftLimit: number;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }
}

class SavingsAccount implements BankAccount {
  balance: number;

  deposit(amount: number): void {
    // can have different logic from CurrentAccount
    // but must respect the method signature,
    // i.e., parameters (amount: number) and return type (void)
  }

  withdraw(amount: number): void {
    // ...
  }
}
```

### Abstract Classes

Just like interfaces, abstract classes define a model or contract that other classes must follow. But while an interface only describes the structure of a class without providing implementations, an abstract class can include method declarations and concrete implementations.

Unlike regular classes, though, abstract classes **cannot be instantiated directly** - they exist solely as a base from which other classes can inherit their methods and attributes.

In TypeScript, the `abstract` keyword is used to define an abstract class. In the following example, you’ll refactor the banking system by replacing the interface with an abstract class to define base behavior for all bank accounts.

```ts :collapsed-lines
// Abstract class that serves as the base for any type of bank account
abstract class BankAccount {
  balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // Concrete method (with implementation)
  deposit(amount: number): void {
    this.balance += amount;
  }

  // Abstract method (must be implemented by subclasses)
  abstract withdraw(amount: number): void;
}

class CurrentAccount extends BankAccount {
  withdraw(amount: number): void {
    const fee = 2; // Current accounts have a fixed withdrawal fee
    const totalAmount = amount + fee;

    if (this.balance >= totalAmount) {
      this.balance -= totalAmount;
    } else {
      console.log("Insufficient balance.");
    }
  }
}

class SavingsAccount extends BankAccount {
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log("Insufficient balance.");
    }
  }
}

// ❌ Error! Cannot instantiate an abstract class
const genericAccount = new BankAccount(1000); // Error

// ✅ Creating a current account
const currentAccount = new CurrentAccount(2000); // uses the BankAccount constructor
currentAccount.deposit(500); // uses the deposit method from BankAccount
currentAccount.withdraw(300); // uses the withdraw method from CurrentAccount

// ✅ Creating a savings account
const savingsAccount = new SavingsAccount(1500); // uses the BankAccount constructor
savingsAccount.deposit(1100); // uses the deposit method from BankAccount
savingsAccount.withdraw(500); // uses the withdraw method from SavingsAccount
```

---

## Object-Oriented Programming Principles

Now that you understand the key language mechanisms, you can formalize the pillars of Object-Oriented Programming that guide the creation of systems that are better organized, reusable, and scalable.

### Inheritance - Superclass and Subclass

Inheritance is a mechanism that allows a class to derive characteristics from another class. When a class `B` inherits from a class `A`, it means that `B` automatically acquires the attributes and methods of `A` without needing to redefine them.

You can visualize this relationship as a parent-child structure, where `A` is the superclass (base/parent class) and `B` is the subclass (derived/child class). A subclass can use inherited resources, add new behaviors, or override superclass methods to address specific needs.

We’ve already discussed inheritance when learning about abstract classes, but inheritance can also be applied to concrete classes. This allows for code reuse and behavior specialization.

```ts :collapsed-lines
// BankAccount is now a regular class where you define attributes and methods
// that will be reused by the child class CurrentAccount
class BankAccount {
  balance: number = 0;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }
}

// CurrentAccount is a subclass of BankAccount, meaning 
// it inherits its attributes and methods.
class CurrentAccount extends BankAccount {
  overdraftLimit: number; // new attribute exclusive to CurrentAccount

  // When specifying a constructor method for a subclass,
  // we need to call another special method, "super".
  // This method calls the superclass (BankAccount) constructor to ensure
  // it is initialized before creating the CurrentAccount object itself.
  constructor(initialBalance: number, overdraftLimit: number) {
    super(initialBalance); // Must match the superclass constructor method signature
    this.overdraftLimit = overdraftLimit;
  }

  // Even though the withdraw method already exists in the superclass (BankAccount),
  // it is overridden here. This means every time a CurrentAccount
  // object calls the withdraw method, this implementation will be used, 
  // ignoring the superclass method.
  override withdraw(amount: number): void {
    const totalAvailable = this.balance + this.overdraftLimit;
    if (amount > 0 && amount <= totalAvailable) {
      this.balance -= amount;
    }
  }
}

// Creating a CurrentAccount with an initial balance of $0.00
// and an overdraft limit of $100.
const currentAccount = new CurrentAccount(0, 100);

// Making a $200 deposit by calling the deposit method
// In this case, the method from BankAccount will be invoked
// since deposit was not overridden in CurrentAccount
currentAccount.deposit(200); // balance: 200

// Withdrawing $250 by calling the withdraw method
// In this case, the method from CurrentAccount will be invoked
// as it has been overridden in its definition
currentAccount.withdraw(250); // balance: -50
```

### Polymorphism

Polymorphism is a concept that often creates confusion in Object-Oriented Programming. But in practice, it is merely a natural consequence of using interfaces and inheritance.

The term polymorphism originates from Greek and means "many forms" (poly = many, morphos = forms). This concept allows objects from different classes to respond to the same method call but with distinct implementations, making code more flexible and reusable.

To clarify this concept, let's consider a practical example. Suppose you have a function named `sendMoney`, responsible for processing a financial transaction, transferring a certain amount from account A to account B. The only requirement is that both accounts follow a common contract, ensuring the methods `withdraw` and `deposit` are available.

```ts
// BankAccount could be an interface, a concrete class,
// or an abstract class. For the sendMoney function, the specific implementation
// does not matter—only that BankAccount includes withdraw and deposit methods.
function sendMoney(
  sender: BankAccount,
  receiver: BankAccount,
  amount: number
) {
  sender.withdraw(amount);
  receiver.deposit(amount);
}

const lucasAccount = new CurrentAccount(500, 200);
const mariaAccount = new SavingsAccount(300);

// transferring $100 from Lucas to Maria
sendMoney(lucasAccount, mariaAccount, 100);
```

#### Polymorphic Methods:

The `withdraw` and `deposit` methods are called within the `sendMoney` function without requiring the function to know whether it is dealing with a `CurrentAccount` or `SavingsAccount`. Each class implements `withdraw` according to its own rules, demonstrating the concept of polymorphism.

#### Decoupling:

The `sendMoney` function does not depend on the specific type of bank account. Any class that extends `BankAccount` (if it's a class) or implements `BankAccount` (if it's an interface) can be used without requiring modifications to the `sendMoney` function.

With this approach, you ensure flexibility and code reusability, as new account types can be introduced without affecting the functionality of `sendMoney`.

### Encapsulation

Encapsulation is one of the fundamental principles of OOP, but its concept can be applied to any programming paradigm. It involves hiding the internal implementation details of a module, class, function, or any other software component, exposing only what is necessary for external use. This improves code security, maintainability, and modularity by preventing unauthorized access and ensuring controlled interactions.

#### Access Modifiers - `public`, `private`, and `protecte

In OOP, encapsulation is essential for controlling the visibility and access to methods and attributes within a class. In TypeScript, this is achieved using access modifiers, which are defined by the keywords `public`, `protected`, and `private`.

- `public` - Allows the attribute or method to be accessed from anywhere, both inside and outside the class. This is the default visibility, meaning that if no access modifier is specified in the code, TypeScript assumes it as `public`.
- `protected` - Allows access within the class and its subclasses but prevents external access.
- `private` - Restricts access to the attribute or method only within the class itself.

```ts :collapsed-lines
export class Person {
  private firstName: string; // Accessible only within the class itself
  private lastName: string; // Accessible only within the class itself
  protected birthDate: Date; // Accessible by subclasses but not from outside

  constructor(firstName: string, lastName: string, birthDate: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }

  // Public method that can be accessed from anywhere
  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// The Professor class inherits from Person and can access
// attributes and methods according to their access modifiers.
class Professor extends Person {
  constructor(firstName: string, lastName: string, birthDate: Date) {
    super(firstName, lastName, birthDate); // Calls the superclass (Person) constructor
  }

  getProfile() {
    this.birthDate; // ✅ Accessible because it is protected
    this.getFullName(); // ✅ Accessible because it is public
    this.firstName; // ❌ Error! Cannot be accessed because it is private in the Person class
    this.lastName; // ❌ Error! Cannot be accessed because it is private in the Person class
  }
}

function main() {
  // Creating an instance of Professor
  const lucas = new Professor("Lucas", "Garcez", new Date("1996-02-06"));

  // Testing direct access to attributes and methods
  lucas.birthDate; // ❌ Error! birthDate is protected and can only be accessed within the class or subclasses
  lucas.getFullName(); // ✅ Accessible because it is a public method
  lucas.firstName; // ❌ Error! firstName is private and cannot be accessed outside the Person class
  lucas.lastName; // ❌ Error! lastName is also private and inaccessible outside the Person class
}
```

#### Access Modifiers Table

| **Modifier** | Access within the class | Access in subclass | Access outside the class  |
| --- | --- | --- | --- |
| `public` | ✅ Yes | ✅ Yes | ✅ Yes |
| `protected` | ✅ Yes | ✅ Yes | ❌ No |
| `private` | ✅ Yes | ❌ No | ❌ No |

### Abstraction

The concept of abstraction frequently causes confusion because its meaning goes beyond the technical context. If you look up the definition of the word in English, the Cambridge Dictionary defines **"abstract"** as:

> *Something that exists as an idea, feeling, or quality, rather than as a material object.*

This definition can be directly applied to OOP: Abstraction represents an idea or concept without going into concrete implementation details.

Many online references describe abstraction as *"*hiding implementation details*,"* which can be misleading since this concept is more closely related to encapsulation. In OOP, abstraction does NOT mean hiding details but defining contracts through abstract **classes** and **interfaces**.

```ts
// Abstraction using interface
interface BankAccountInterface {
  balance: number;
  deposit(amount: number): void;
  withdraw(amount: number): void;
}

// Abstraction using class
abstract class BankAccountClass {
  balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // Concrete method (with implementation)
  deposit(amount: number): void {
    this.balance += amount;
  }

  // Abstract method (must be implemented by subclasses)
  abstract withdraw(amount: number): void;
}
```

In the examples above, both `BankAccountInterface` and `BankAccountClass` are examples of abstraction as they define contracts that must be implemented by those who use them.

---

## Conclusion

Although learning Object-Oriented Programming isn't easy, I hope this article has helped clarify the OOP fundamentals and advanced topics.

If you want to keep learning TypeScript and OOP, I highly recommend reading Martin Fowler's book **Refactoring: Improving the Design of Existing Code**. This book contains a massive catalog of refactoring techniques, and the second edition has all code examples written in TypeScript, many of which use OOP features and principles mentioned here.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Object-Oriented Programming in TypeScript",
  "desc": "Object-Oriented Programming (OOP) is one of the most widely used programming paradigms in software development. But is also one of the most misunderstood. This article will help you gain a solid grasp of OOP in TypeScript by walking you through the l...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/learn-object-oriented-programming-in-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
