---
lang: en-US
title: "How to Use Object-Oriented Programming in C# – Explained With Examples"
description: "Article(s) > How to Use Object-Oriented Programming in C# – Explained With Examples"
icon: iconfont icon-csharp
category: 
  - C#
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Object-Oriented Programming in C# – Explained With Examples"
    - property: og:description
      content: "How to Use Object-Oriented Programming in C# – Explained With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-oop-in-c-sharp.html
prev: /programming/cs/articles/README.md
date: 2024-05-01
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url: https://freecodecamp.org/news/author/Clifftech/
cover: https://freecodecamp.org/news/content/images/2024/04/Attractive-1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Object-Oriented Programming in C# – Explained With Examples"
  desc="Welcome to this comprehensive guide on object-oriented programming (OOP) using C#. This article will delve into the four fundamental pillars of OOP: Inheritance Encapsulation Polymorphism Abstraction Whether you're a seasoned programmer or a beginn..."
  url="https://freecodecamp.org/news/how-to-use-oop-in-c-sharp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/04/Attractive-1.png"/>

Welcome to this comprehensive guide on object-oriented programming (OOP) using C#. This article will delve into the four fundamental pillars of OOP:

- Inheritance
- Encapsulation
- Polymorphism
- Abstraction

Whether you're a seasoned programmer or a beginner stepping into the world of C#, this article aims to enhance your understanding of OOP concepts and their implementation in C#.

If you're new to C#, consider taking the free certification course on [**freeCodeCamp**](/freecodecamp.org/foundational-c-sharp-with-microsoft/) or the free course on [<VPIcon icon="fa-brands fa-microsoft"/>Microsoft Learn](https://learn.microsoft.com/en-us/courses/browse/?term=c%23&resource_type=learning%20path) to familiarize yourself with the language.

Remember, the principles of OOP are universal and apply to most object-oriented programming languages. Therefore, the knowledge you gain from this article can be applied to learning OOP in any language.

Let's get started!

---

## What is Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming paradigm that uses `objects` and `classes` to design and develop software applications. It is based on the concept of objects, which can contain data in the form of fields (attributes or properties) and code in the form of procedures (methods or functions).

Object-Oriented Programming offers several benefits, including:

- **Modularity**: OOP promotes modularity by breaking down complex systems into smaller, manageable parts (objects). This makes it easier to maintain and update the code.
- **Reusability**: OOP allows you to reuse existing code by creating new objects based on existing ones. This saves time and effort in developing new applications.
- **Flexibility**: OOP provides flexibility in designing and implementing software systems. You can easily modify and extend the functionality of objects without affecting other parts of the system.
- **Scalability**: OOP supports scalability by allowing you to add new objects and classes as the system grows. This makes it easier to accommodate changes and enhancements in the software.

As you can see, OOP offers several advantages that makes it a popular choice for developing software applications. Let's explore the four fundamental pillars of OOP in more detail.

---

## The Four Pillars of Object-Oriented Programming

![Add-a-heading](https://freecodecamp.org/news/content/images/2024/04/Add-a-heading.png)

The four pillars of Object-Oriented Programming are:

1. **Inheritance**
2. **Encapsulation**
3. **Polymorphism**
4. **Abstraction**

These pillars form the foundation of OOP and are essential concepts to understand when working with object-oriented programming languages like C#.

Let go deep into each of the pillars of OOP in the next sections.

Let's start with the first pillar of OOP: `Inheritance`.

---

## Inheritance

Inheritance is a concept used in most programming languages and is something you can't avoid when working with object-oriented programming. Programming languages like `C#` and Java are some of the languages that support inheritance. In this article, we will be looking at inheritance in `C#` and how to use it in your application.

### What is Inheritance?

Imagine that you have a family tree, where each generation represents a class in C#. The first generation is the `base class`, which is the foundational class that provides the basic structure and properties. This could be likened to the patriarch of the family, who establishes the family's core values and characteristics.

As the family tree progresses, each subsequent generation inherits the traits and characteristics of the previous generation but also adds or modifies them to reflect their unique identity. These subsequent generations can be thought of as `derived` classes in C#, which inherit from the `base` class but also introduce their own unique features or modifications.

For example, the patriarch might have established the family's love for gardening, which becomes a fundamental trait passed down through the generations. However, as the family tree evolves, some members might develop a special interest in growing exotic plants, while others might focus on organic gardening. These special interests represent the unique characteristics of the derived classes, which inherit the basic love for gardening from the base class but also introduce their own unique features.

In this analogy, the `base` class is the patriarch, which represents the foundational class with its basic properties and characteristics. The `derived` classes are the subsequent generations, each with their unique features or modifications, inheriting the basic traits from the base class but also adding their own unique aspects. This process of inheritance allows for the creation of a rich and varied family tree, where each generation builds upon the previous one, introducing new traits and refining existing ones.

Inheritance is a mechanism that allows you to define a new `class` based on an existing `class`. The new class inherits all the members (fields, properties, and methods) of the existing class. The existing class is known as the `base` class, and the new class is known as the `derived` class.

Basic Syntax of inheritance in C#:

```cs
class BaseClass
{
    // Base class members
}

class DerivedClass : BaseClass
{
    // Derived class members
}
```

In the above code snippet, `BaseClass` is the base class, and `DerivedClass` is the derived class. The `DerivedClass` inherits all the members of the `BaseClass`. The colon `(:)` is used to indicate that the `DerivedClass` is derived from the `BaseClass`.

If You are new to `C#` and you don't know what a class is, don't worry, I will explain it to you. A class is a blueprint for creating objects. It defines the properties and methods that an object of the class will have. Here is an example of a class in `C#`:

```cs
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void Display()
    {
        Console.WriteLine($"Name: {Name}, Age: {Age}");
    }
}
```

In the above code snippet, the `Person` class has two properties (`Name` and `Age`) and a method (`Display`). The properties represent the state of the object, and the method represents the behavior of the object. You can create an object of the `Person` class and set its properties like this:

```cs
Person person = new Person();
person.Name = "John";
person.Age = 30;
```

You can call the `Display` method on the `person` object to display the name and age of the person:

```cs
person.Display(); // Output: Name: John, Age: 30
```

Before moving on with the article, let's look at some keywords you're going to come across a lot `base class`, `Abstract class` ,`derived class`, `parent class`, and `child class`.

Let me explain them to you.

#### Base class

This is the class whose members are inherited by another class. It is also known as the parent class.

```cs
public class BaseClass
{
    public void Display()
    {
        Console.WriteLine("This is a base class");
    }
}
```

#### Abstract class

This is a class that cannot be instantiated. It is used to provide a common base for all the derived classes. It can contain both abstract and non-abstract methods.

```cs
public abstract class AbstractClass
{
    public abstract void Display();
}
```

#### Derived class

This is the class that inherits the members of the base class. It is also known as the child class.

```cs
public class DerivedClass : BaseClass
{
    public void Show()
    {
        Console.WriteLine("This is a derived class");
    }
}
```

So now you know what these keywords mean, let's move on to the next section.

### Types of Inheritance

Inheritance can be classified into different types based on the way the classes are derived. The following are the types of inheritance:

#### Single Inheritance

Single inheritance is a fundamental concept in object-oriented programming where a class, known as the `derived class`, is based on another class, known as the `base class`. This is the simplest form of inheritance.

To illustrate this, let's consider a real-world analogy. Imagine you are the only child of your father. In this scenario, you inherit characteristics from your father. This is akin to single inheritance in programming.

Let's look at an example in `C#`:

```cs
public class Father
{
    public void Display()
    {
        Console.WriteLine("This is the father class");
    }
}
```

In the above code, `Father` is the base class with a method `Display`.

Now, let's create a derived class `Child` that inherits from the `Father` class:

```cs
public class Child : Father
{
    public void Show()
    {
        Console.WriteLine("This is the child class");
    }
}
```

In this code snippet, the `Child` class is derived from the `Father` class. The `Child` class inherits the `Display` method from the `Father` class.

You can create an object of the `Child` class and call the `Display` method. This demonstrates that the `Child` class can access the `Display` method from the `Father` class.

```cs
Child child = new Child();
child.Display(); // Output: This is the father class
```

#### Multilevel Inheritance

Multilevel inheritance is a concept in object-oriented programming where a class is derived from another derived class, creating a chain of inheritance.

To better understand this, let's consider a family tree analogy. Assuming you are the `child` of your `father`, and your `father` is the `child` of your `grandfather`. In this scenario, you inherit characteristics from both your father and grandfather. This is similar to multilevel inheritance in programming.

Let's explore this concept with an example in `C#`:

```cs
public class Grandfather
{
    public void Display()
    {
        Console.WriteLine("This is the grandfather class");
    }
}
```

In the above code, `Grandfather` is the base class with a method `Display`.

Next, we created a derived class `Father` that inherits from the `Grandfather` class:

```cs
public class Father : Grandfather
{
    public void Show()
    {
        Console.WriteLine("This is the father class");
    }
}
```

Here, the `Father` class is derived from the `Grandfather` class and inherits the `Display` method from it.

Finally, we created another derived class `Child` that inherits from the `Father` class:

```cs
public class Child : Father
{
    public void DisplayChild()
    {
        Console.WriteLine("This is the child class");
    }
}
```

In this code snippet, the `Child` class is derived from the `Father` class. The `Child` class inherits the `Display` and `Show` methods from the `Father` class.

We can create an object of the `Child` class and call the `Display` and `Show` methods. This demonstrates that the `Child` class can access the `Display` and `Show` methods from the `Father` class.

```cs
Child child = new Child();
child.Display(); // Output: This is the grandfather class
child.Show(); // Output: This is the father class
child.DisplayChild(); // Output: This is the child class
```

#### Hierarchical Inheritance

Hierarchical inheritance is a concept in object-oriented programming where multiple classes are derived from a `single base class`, forming a `tree-like structure`.

To illustrate this, let's consider a real-world analogy. Assuming you and your `siblings` share the `same parent`. In this scenario, all of you inherit characteristics from the same parent. This is akin to hierarchical inheritance in programming.

Let's explore this concept with an example in `C#`:

```cs
public class Parent
{
    public void Display()
    {
        Console.WriteLine("This is the parent class");
    }
}
```

In the above code, `Parent` is the base class with a method `Display`.

Next, we created two derived classes `Child1` and `Child2` that inherit from the `Parent` class:

```cs
public class Child1 : Parent
{
    public void Show1()
    {
        Console.WriteLine("This is the first child class");
    }
}

public class Child2 : Parent
{
    public void Show2()
    {
        Console.WriteLine("This is the second child class");
    }
}
```

In this code snippet, the `Child1` and `Child2` classes are derived from the `Parent` class. Both classes inherit the `Display` method from the `Parent` class.

We can create objects of the `Child1` and `Child2` classes and call the `Display`, `Show1`, and `Show2` methods. This demonstrates that both `Child1` and `Child2` classes can access the `Display` method from the `Parent` class.

```cs
Child1 child1 = new Child1();
child1.Display(); // Output: This is the parent class
child1.Show1(); // Output: This is the first child class

Child2 child2 = new Child2();
child2.Display(); // Output: This is the parent class
child2.Show2(); // Output: This is the second child class
```

Congratulation you have learned the basics of inheritance in C#, let's move to the next section `Encapsulation`.

### Understanding Encapsulation and Properties in C

As we continue our journey through the pillars of OOP, we now arrive at `Encapsulation`. Before we delve into `Encapsulation`, it's crucial to understand a common concept in C# called `properties`.

Properties in C# are members of a class that provide a flexible mechanism to read, write, or compute the value of a private field. They can be used as if they are public data members, but they are actually special methods called accessors. These accessors are used to get and set the values of private fields.

If you're new to this concept, don't worry. Let's break it down with an example:

```cs
public class Person
{
    private string name;

    public string Name
    {
        get { return name; }
        set { name = value; }
    }
}
```

In the above code snippet, the `Person` class has a private field `name` and a property `Name`. The property `Name` has two accessors: a `get` accessor to retrieve the value of the `name` field, and a `set` accessor to set the value of the `name` field.

Understanding properties is key to grasping the concept of `Encapsulation`, which we will explore in the next section.

---

## Encapsulation

To understand `Encapsulation`, let's use an analogy. Consider a `gift box` that contains a `gift`. The `gift box` acts as a container that encapsulates the `gift`. The `gift` is hidden from the outside world and can only be accessed through the `gift box`. This is akin to `Encapsulation` in object-oriented programming.

`Encapsulation` is the principle of bundling the data (fields) and methods (functions) that operate on the data into a single unit, known as a `class`. It restricts direct access to some of an object's components and allows access only through the methods of the class. In essence, `Encapsulation` conceals the internal state of an object and only exposes the necessary information to the outside world.

Let's see an example in C#:

```cs
public class Person
{
    private string name;
    private int age;

    public string Name
    {
        get { return name; }
        set { name = value; }
    }

    public int Age
    {
        get { return age; }
        set { age = value; }
    }

    public void Display()
    {
        Console.WriteLine($"Name: {Name}, Age: {Age}");
    }
}
```

In the above code snippet, the `Person` class encapsulates the data (fields `name` and `age`) and methods (`Display`) into a single unit. The fields `name` and `age` are private, meaning they cannot be accessed directly from outside the class. The properties `Name` and `Age` provide controlled access to the private fields using `get` and `set` accessors.

Let's add another example to further illustrate this concept:

```cs
public class BankAccount
{
    private double balance;

    public double Balance
    {
        get { return balance; }
        private set { balance = value; }
    }

    public void Deposit(double amount)
    {
        if (amount > 0)
        {
            Balance += amount;
        }
    }

    public void Withdraw(double amount)
    {
        if (amount > 0 && Balance >= amount)
        {
            Balance -= amount;
        }
    }

    public void DisplayBalance()
    {
        Console.WriteLine($"Balance: {Balance}");
    }
}
```

In this example, the `BankAccount` class encapsulates the `balance` field and the methods that operate on it (`Deposit`, `Withdraw`, `DisplayBalance`). The `balance` field is private and can only be accessed through the `Balance` property and the methods of the class. This ensures that the balance cannot be directly manipulated from outside the class, providing a secure way to manage a bank account.

Congratulations! You have learned about `Encapsulation` and how it is implemented in C#. Let's move on to the next section, `Polymorphism`.

### Understanding Polymorphism in C

As we delve deeper into the four pillars of OOP, we now encounter `Polymorphism`. The term `Polymorphism` originates from the Greek words `poly` (many) and `morphos` (forms), signifying "many forms". In the realm of object-oriented programming, `Polymorphism` denotes an object's ability to assume multiple forms.

To comprehend `Polymorphism`, let's consider a `music player`. It can play various types of music files, such as `MP3`, `WAV`, or `AAC`. Each of these file types is different, yet our music player can handle all of them. This is akin to `Polymorphism` in object-oriented programming.

---

## Polymorphism

`Polymorphism` is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It provides a single interface to represent multiple underlying forms (classes) and enables objects to be processed in a generic manner.

In C#, there are two types of `Polymorphism`:

1. **Compile-time Polymorphism (Method Overloading)**
2. **Run-time Polymorphism (Method Overriding)**

### Compile-time Polymorphism (Method Overloading)

`Compile-time Polymorphism`, also known as `Method Overloading`, allows a class to have multiple methods with the same name but different parameters. The compiler determines which method to invoke based on the number and types of arguments.

Here's an example of `Method Overloading` in C#:

```cs
public class Printer
{
    public void Print(string message)
    {
        Console.WriteLine($"Printing string: {message}");
    }

    public void Print(int number)
    {
        Console.WriteLine($"Printing number: {number}");
    }

    public void Print(string message, int copies)
    {
        for (int i = 0; i < copies; i++)
        {
            Console.WriteLine($"Printing string: {message}");
        }
    }
}
```

In this example, the `Printer` class has three `Print` methods with the same name but different parameters. This is an example of `Method Overloading` in C#.

### Run-time Polymorphism (Method Overriding)

`Run-time Polymorphism`, also known as `Method Overriding`, allows a subclass to provide a specific implementation of a method that is already provided by its superclass.

Here's an example of `Method Overriding` in C#:

```cs
public class MusicPlayer
{
    public virtual void Play()
    {
        Console.WriteLine("Playing music");
    }
}

public class Mp3Player : MusicPlayer
{
    public override void Play()
    {
        Console.WriteLine("Playing MP3 music");
    }
}

public class WavPlayer : MusicPlayer
{
    public override void Play()
    {
        Console.WriteLine("Playing WAV music");
    }
}
```

In this example, the `MusicPlayer` class has a virtual method `Play`. The `Mp3Player` and `WavPlayer` classes override the `Play` method with specific implementations for playing MP3 and WAV music, respectively. This is an example of `Method Overriding` in C#.

Let's see how `Polymorphism` can be used in a program:

```cs
MusicPlayer player = new Mp3Player();
player.Play(); // Output: Playing MP3 music

player = new WavPlayer();
player.Play(); // Output: Playing WAV music
```

In this code snippet, we created an object of the `Mp3Player` class and assigned it to a variable of type `MusicPlayer`. We then called the `Play` method on the `player` object, which invokes the overridden `Play` method in the `Mp3Player` class. We then created an object of the `WavPlayer` class and assigned it to the `player` variable. When we call the `Play` method again, it invokes the overridden `Play` method in the `WavPlayer` class.

Congratulations! You have learned about `Polymorphism` and how it is implemented in C#. Let's move on to the final pillar of OOP, `Abstraction`.

### Understanding Abstraction in C

As we delve into the final pillar of OOP, we encounter `Abstraction`. `Abstraction` is the process of hiding complex implementation details and exposing only the essential features of an object. It emphasizes on what an object does rather than how it does it.

To comprehend `Abstraction`, let's consider a `smartphone`. When you use a smartphone, you don't need to understand the intricacies of how the internal components like the `processor` or the `memory` work. You only need to know how to interact with the user interface to make calls, send messages, or use apps. This is akin to `Abstraction` in object-oriented programming.

---

## Abstraction

`Abstraction` is a key concept in object-oriented programming that allows you to create a blueprint for a class with some abstract methods that must be implemented by the derived classes. It enables you to define the structure of a class without providing the implementation details.

In C#, `Abstraction` can be achieved using `abstract` classes and `interfaces`. Let's explore both concepts:

### Abstract Classes

An `abstract class` is a class that cannot be instantiated and can contain both abstract and non-abstract methods. An abstract method is a method without a body that must be implemented by the derived classes.

Here's an example of an `abstract class` in C#:

```cs
public abstract class Animal
{
    public abstract void Speak();
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("The dog barks");
    }
}

public class Cat : Animal
{
    public override void Speak()
    {
        Console.WriteLine("The cat meows");
    }
}
```

In this example, the `Animal` class is an abstract class with an abstract method `Speak`. The `Dog` and `Cat` classes inherit from the `Animal` class and provide specific implementations for the `Speak` method. This is an example of `Abstraction` using abstract classes in C#.

### Interfaces

An `interface` is a reference type in C# that defines a contract for classes to implement. It contains only the declaration of the methods, properties, events, or indexers, without providing the implementation.

Here's an example of an `interface` in C#:

```cs
public interface IFlyable
{
    void Fly();
}

public class Bird : IFlyable
{
    public void Fly()
    {
        Console.WriteLine("The bird flies");
    }
}

public class Airplane : IFlyable
{
    public void Fly()
    {
        Console.WriteLine("The airplane flies");
    }
}
```

In this example, the `IFlyable` interface defines a contract with a method `Fly`. The `Bird` and `Airplane` classes implement the `IFlyable` interface and provide specific implementations for the `Fly` method. This is an example of `Abstraction` using interfaces in C#.

Congratulations! You have now learned about `Abstraction` and how it is implemented in C#. The key takeaway is that `Abstraction` allows us to hide the complexity of the system and expose only the necessary details to the user.

---

## Summary

In this article, we have explored the four fundamental pillars of object-oriented programming (OOP) in C#: `Inheritance`, `Encapsulation`, `Polymorphism`, and `Abstraction`.

These pillars form the foundation of OOP and are essential concepts to understand when working with object-oriented programming languages like C#. The knowledge gained from this article will help you enhance your understanding of OOP concepts and their implementation in C#.

Thank you for reading this article, I hope you find it helpful. If you have any questions or feedback, feel free to reach out to me. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Object-Oriented Programming in C# – Explained With Examples",
  "desc": "Welcome to this comprehensive guide on object-oriented programming (OOP) using C#. This article will delve into the four fundamental pillars of OOP: Inheritance Encapsulation Polymorphism Abstraction Whether you're a seasoned programmer or a beginn...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-oop-in-c-sharp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
