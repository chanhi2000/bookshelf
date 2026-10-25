---
lang: en-US
title: "Object-Oriented Programming in Java - A Beginner's Guide"
description: "Article(s) > Object-Oriented Programming in Java - A Beginner's Guide"
icon: fa-brands fa-java
category:
  - Java
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Object-Oriented Programming in Java - A Beginner's Guide"
    - property: og:description
      content: "Object-Oriented Programming in Java - A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-programming-concepts-java.html
prev: /programming/java/articles/README.md
date: 2022-04-19
isOriginal: false
author: Patrick Cyubahiro
cover: https://freecodecamp.org/news/content/images/2022/01/ian-dooley-DJ7bWa-Gwks-unsplash-2-2.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Object-Oriented Programming in Java - A Beginner's Guide"
  desc="Hi, folks! Today we are going to talk about object-oriented programming in Java. This article will help give you a thorough understanding of the underlying principles of object-oriented programming and its concepts.  Once you und..."
  url="https://freecodecamp.org/news/object-oriented-programming-concepts-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/01/ian-dooley-DJ7bWa-Gwks-unsplash-2-2.jpg"/>

Hi, folks! Today we are going to talk about object-oriented programming in Java.

This article will help give you a thorough understanding of the underlying principles of object-oriented programming and its concepts.

Once you understand these concepts, you should have the confidence and ability to develop basic problem-solving applications using object-oriented programming principles in Java.

---

## What is Object-Oriented Programming?

Object-oriented programming (OOP) is a fundamental programming paradigm based on the concept of _“*objects*”_. These objects can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods).

The core concept of the object-oriented approach is to break complex problems into smaller objects.

**In this article, we will be looking at the following OOP concepts:**

1. What is Java?
2. What is a class?
3. What is an object?
4. What is a Java Virtual Machine (JVM)?
5. How access modifiers work in Java.
6. How constructors work in Java.
7. How methods work in Java.
8. Key principles of OOP.
9. Interfaces in Java.

---

## What is Java?

Java is a general-purpose, class-based, object-oriented programming language, which works on different operating systems such as Windows, Mac, and Linux.

You can use Java to develop:

- Desktop applications
- Web applications
- Mobile applications (especially Android apps)
- Web and application servers
- Big data processing
- Embedded systems

And much more.

In Java, every application starts with a class name, and this class must match the file name. When saving a file, save it using the class name and add *“*.java*”* to the end of the file name.

Let's write a Java program that prints the message _“*Hello freeCodeCamp community. My name is ...*”_.

We are going to start by creating our first Java file called Main.java, which can be done in any text editor. After creating and saving the file, we are going to use the below lines of code to get the expected output.

```java title="Main.java"
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello freeCodeCamp community. My name is Patrick Cyubahiro.");
  }
}
```

Don't worry if you don't understand the above code at the moment. We are going to discuss, step by step, each line of code just below.

For now, I want you to start by noting that every line of code that runs in Java must be in a class.

You may also note that Java is case-sensitive. This means that Java has the ability to distinguish between upper and lower case letters. For example, the variable _“myClass” and the variable “myclass”_ are two totally different things.

**Alright, let's see what that code's doing:**

Let's first look at the `main()` method: `public static void main(String[] args)`.

This method is required in every Java program, and it is the most important one because it is the entry point of any Java program.

Its syntax is always `public static void main(String[] args)`. The only thing that can be changed is the name of the string array argument. For example, you can change `args` to `myStringArgs`.

---

## What is a Class in Java?

A class is defined as a collection of objects. You can also think of a class as a blueprint from which you can create an individual object.

To create a class, we use the keyword `class`.

### Syntax of a class in Java

```java
class ClassName {
  // fields
  // methods
}
```

In the above syntax, we have fields (also called variables) and methods, which represent the state and behavior of the object, respectively.

::: note

In Java, we use fields to store data, while we use methods to perform operations.

:::

::: tip Example

We are going to create a class named _“Main” with a variable “y”. The variable “y”_ is going to store the value 2.

```java
public class Main { 
  int y = 2; 
}
```

Note that a class should always start with an uppercase first letter, and the Java file should match the class name.

:::

---

## What is an Object in Java?

An object is an entity in the real world that can be distinctly identified. Objects have states and behaviors. In other words, they consist of methods and properties to make a particular type of data useful.

An object consists of:

- **A unique identity:** Each object has a unique identity, even if the state is identical to that of another object.
- **State/Properties/Attributes:** State tells us how the object looks or what properties it has.
- **Behavior:** Behavior tells us what the object does.

### Examples of object states and behaviors in Java:

Let's look at some real-life examples of the states and behaviors that objects can have.

#### Example 1

- Object: car.
- State: color, brand, weight, model.
- Behavior: break, accelerate, turn, change gears.

#### Example 2

- Object: house.
- State: address, color, location.
- Behavior: open door, close door, open blinds.

### Syntax of an object in Java

```java
public class Number {
  int y = 10;
  public static void main(String[] args) {
    Number myObj = new Number();
    System.out.println(myObj.y);
  }
}
```

---

## What is the Java Virtual Machine (JVM)?

The Java virtual machine (JVM) is a virtual machine that enables a computer to run Java programs.

The JVM has two primary functions, which are:

- To allow Java programs to run on any device or operating system (this is also known as the "Write once, run anywhere" principle).
- And, to manage and optimize program memory.

---

## How Access Modifiers Work in Java

In Java, access modifiers are keywords that set the accessibility of classes, methods, and other members.

These keywords determine whether a field or method in a class can be used or invoked by another method in another class or sub-class.

Access modifiers may also be used to restrict access.

In Java, we have four types of access modifiers, which are:

- Default
- Public
- Private
- Protected

Let's look at each one in more detail now.

### Default Access Modifier

The **default access modifier** is also called package-private. You use it to make all members within the same package visible, but they can be accessed only within the same package.

Note that when no access modifier is specified or declared for a class, method, or data member, it automatically takes the default access modifier.

Here is an example of how you can use the default access modifier:

```java
class SampleClass {
    void output() { 
      System.out.println("Hello World! This is an Introduction to OOP - Beginner's guide."); 
    } 
} 

class Main { 
  public static void main(String args[]) {   
    SampleClass obj = new SampleClass(); 
    obj.output();  
  }
}
```

**Now let's see what this code is doing:**

- `void output()`: When there is no access modifier, the program automatically takes the default modifier.
- `SampleClass obj = new SampleClass();`: This line of code allows the program to access the class with the default access modifier.
- `obj.output();`: This line of code allows the program to access the class method with the default access modifier.

The output is: `Hello World! This is an Introduction to OOP - Beginner's guide.`.

### Public Access Modifier

The **public access modifier** allows a class, a method, or a data field to be accessible from any class or package in a Java program. The public access modifier is accessible within the package as well as outside the package.

In general, a public access modifier does not restrict the entity at all.

Here is an example of how the public access modifier can be used:

```java title="Car.java"
// public class
public class Car {
    // public variable
    public int tireCount;

    // public method
    public void display() {
      System.out.println("I am a Car.");
      System.out.println("I have " + tireCount + " tires.");
    }
}
```

```java title="Main.java"
public class Main {
  public static void main(String[] args) {
    // accessing the public class
    Car car = new Car();

    // accessing the public variable
    car.tireCount = 4;
    // accessing the public method
    car.display();
  }
}
```

```plaintext title="Output"
I am a Car.

I have 4 tires.
```

**Now let's see what's going on in that code:**

In the above example,

- The public class `Car` is accessed from the Main class.
- The public variable `tireCount` is accessed from the Main class.
- The public method `display()` is accessed from the Main class.

### Private Access Modifier

The **private access modifier** is an access modifier that has the lowest accessibility level. This means that the methods and fields declared as private are not accessible outside the class. They are accessible only within the class which has these private entities as its members.

You may also note that the private entities are not visible even to the subclasses of the class.

Here is an example of what would happen if you try accessing variables and methods declared private, outside the class:

```java
class SampleClass {
  private String activity;
}

public class Main {
  public static void main(String[] main) {
    SampleClass task = new SampleClass();
    task.activity = "We are learning the core concepts of OOP.";
  }
}
```

**Alright, what's going on here?**

1. `private String activity`: The private access modifier makes the variable “activity” a private one.
2. `SampleClass task = new SampleClass();`: We have created an object of SampleClass.
3. `task.activity = "We are learning the core concepts of OOP.";`: On this line of code we are trying to access the private variable and field from another class (which can never be accessible because of the private access modifier).

When we run the above program, we will get the following error:

```plaintext title="output: compile error"
Main.java:49: error: activity has private access in SampleClass
        task.activity = "We are learning the core concepts of OOP.";
            ^
1 error
```

This is because we are trying to access the private variable and field from another class.

So, the best way to access these private variables is to use the getter and setter methods.

Getters and setters are used to protect your data, particularly when creating classes. When we create a getter method for each instance variable, the method returns its value while a setter method sets its value.

Let's have a look at how we can use the getters and setters method to access the private variable.

```java
class SampleClass {
  private String task;

  // This is the getter method.
  public String getTask()  {
    return this.task;
  }

  // This is the setter method.
  public void setTask(String task) {
    this.task= task;
  }
}

public class Main {
  public static void main(String[] main) {
    SampleClass task = new SampleClass();
    // We want to access the private variable using the getter and setter.
    task.setTask("We are learning the core concepts of OOP.");
    System.out.println(task.getTask());
  }
}
```

When we run the above program, this is the output:

```plaintext title="output"
We are learning the core concepts of OOP.
```

As we have a private variable named `task` in the above example, we have used the methods `getTask()` and `setTask()` in order to access the variable from the outer class. These methods are called getter and setter in Java.

We have used the setter method (`setTask()`) to assign value to the variable and the getter method (`getTask()`) to access the variable.

To learn more about the `this` keyword, you can read this article [<VPIcon icon="fas fa-globe"/>here](https://programiz.com/java-programming/this-keyword).

### Protected Access Modifier

When methods and data members are declared `protected`, we can access them within the same package as well as from subclasses.

We can also say that the `protected` access modifier is somehow similar to the default access modifier. It is just that it has one exception, which is its visibility in subclasses.

Note that classes cannot be declared protected. This access modifier is generally used in a parent-child relationship.

Let's have a look at how we can use the protected access modifier:

```java title="Multiplication.java"
package learners;

public class Multiplication {
  protected int multiplyTwoNumbers(int a, int b) {
    return a*b;
  }
}
```

```java Test.java
package javalearners;

import learners.*;

class Test extends Multiplication {
  public static void main(String args[]) {
    Test obj = new Test();
    System.out.println(obj.multiplyTwoNumbers(2, 4));
  }
} 
//
//output: 8
```

**What's this code doing?**

In this example, the class `Test` which is present in another package is able to call the `multiplyTwoNumbers()` method, which is declared protected.

The method is able to do so because the `Test` class extends class Addition and the `protected` modifier allows the access of `protected` members in subclasses (in any packages).

---

## What are Constructors in Java?

A constructor in Java is a method that you use to initialize newly created objects.

### Syntax of a constructor in Java:

```java
public class Main { 
  int a;  
  public Main() { 
    a = 3 * 3; 
  } 

  public static void main(String[] args) { 
    Main myObj = new Main();
    System.out.println(myObj.a); 
  } 
}
```

**So what's going on in this code?**

1. We have started by creating the `Main` class.
2. After that, we have created a class attribute, which is the variable `a`.
3. Third, we have created a class constructor for the Main class.
4. After that, we have set the initial value for variable `a` that we have declared. The variable `a` will have a value of 9. Our program will just take 3 times 3, which is equal to 9. You are free to assign any value to the variable `a`. (In programming, the symbol “\*” means multiplication).

Every Java program starts its execution in the `main()` method. So, we have used the `public static void main(String[] args)`, and that is the point from where the program starts its execution. In other words, the `main()` method is the entry point of every Java program.

Now I'll explain what every keyword in the `main()` method does.

#### The `public` keyword

The `public` keyword is an **access modifier**. Its role is to specify from where the method can be accessed, and who can access it. So, when we make the `main()` method public, it makes it globally available. In other words, it becomes accessible to all parts of the program.

#### The `static` keyword

When a method is declared with a `static` keyword, it is known as a static method. So, the Java `main()` method is always `static` so that the compiler can call it without or before the creation of an object of the class.

If the `main()` method is allowed to be non-static, then the Java Virtual Machine will have to instantiate its class while calling the `main()` method.

The static keyword is also important as it saves unnecessary memory wasting which would have been used by the object declared only for calling the `main()` method by the Java Virtual Machine.

#### The Void keyword

The `void` keyword is a keyword used to specify that a method doesn’t return anything. Whenever the `main()` method is not expected to return anything, then its return type is void. So, this means that as soon as the `main()` method terminates, the Java program terminates too.

#### Main

**Main** is the name of the Java main method. It is the identifier that the Java Virtual Machine looks for as the starting point of the java program.

#### The `String[] args`

This is an array of strings that stores Java command line arguments.

The next step is to create an object of the class Main. We have created a function call that calls the class constructor.

The last step is to print the value of `a`, which is 9. 

---

## How Methods Work in Java

A method is a block of code that performs a specific task. In Java, we use the term method, but in some other programming languages such as C++, the same method is commonly known as a function.

In Java, there are two types of methods:

- **User-defined Methods**: These are methods that we can create based on our requirements.
- **Standard Library Methods**: These are built-in methods in Java that are available to use.

Let me give you an example of how you can use methods in Java.

::: tip Java methods example 1:

```java :collapsed-lines title="Main.java"
class Main {
  // create a method
  public int divideNumbers(int x, int y) {
    int division = x / y;
    // return value
    return division;
  }

  public static void main(String[] args) {
    int firstNumber = 4;
    int secondNumber = 2;

    // create an object of Main
    Main obj = new Main();
    // calling method
    int result = obj.divideNumbers(firstNumber, secondNumber);
    System.out.println("Dividing " + firstNumber + " by " + secondNumber + " is: " + result);
  }
}
```

```plaintext title="output"
Dividing 4 by 2 is: 2
```

In the above example, we have created a method named `divideNumbers()`. The method takes two parameters x and y, and we have called the method by passing two arguments `firstNumber` and `secondNumber` .

:::

Now that you know some Java basics, let's look at object-oriented programming principles in a bit more depth.

---

## Key Principles of Object-Oriented Programming

There are the four main principles of the Object-Oriented Programming paradigm. These principles are also known as the pillars of Object-Oriented Programming.

The four main principles of Object-Oriented Programming are:

1. Encapsulation (I will also touch briefly on Information Hiding)
2. Inheritance
3. Abstraction
4. Polymorphism

### Encapsulation and Information Hiding in Java

Encapsulation is when you wrap up your data under a single unit. In simple terms, it is more or less like a protective shield that prevents the data from being accessed by the code outside this shield.

A simple example of encapsulation is a school bag. A school bag can keep all your items safe in one place, such as your books, pens, pencils, ruler, and more.

Information hiding or data hiding in programming is about protecting data or information from any inadvertent change throughout the program. This is a powerful Object-Oriented Programming feature, and it is closely associated with encapsulation.

The idea behind encapsulation is to ensure that "**sensitive**" data is hidden from users. To achieve this, you must:

1. Declare class variables/attributes as `private`.
2. Provide public `get` and `set` methods to access and update the value of a `private` variable.

As you remember, `private` variables can only be accessed within the same class and an external class cannot access them. However, they can be accessed if we provide public `get` and `set` methods.

Let me give you an additional example that demonstrates how the `get` and `set` methods work:

```java title="Student.java"
public class Student {
  private String name; // private = restricted access

  // Getter
  public String getName() {
    return name;
  }

  // Setter
  public void setName(String newName) {
    this.name = newName;
  }
}
```

### Inheritance in Java

Inheritance allows classes to inherit attributes and methods of other classes. This means that parent classes extend attributes and behaviors to child classes. Inheritance supports reusability.

A simple example that explains the term inheritance is that human beings (in general) inherit certain properties from the class "Human" such as the ability to speak, breathe, eat, drink, and so on.

We group the "inheritance concept" into two categories:

- **subclass** (child) - the class that inherits from another class.
- **superclass** (parent) - the class being inherited from.

To inherit from a class, we use the `extends` keyword.

In the below example, the `JerryTheMouse` class is created by inheriting the methods and fields from the `Animal` class.

`JerryTheMouse` is the subclass and `Animal` is the superclass.

```java title="Animal.java"
class Animal {

  // field and method of the parent class
  String name;
  public void eat() {
    System.out.println("I can eat");
  }
}
```

```java title="JerryTheMouse.java"
// inherit from Animal
class JerryTheMouse extends Animal {

  // new method in subclass
  public void display() {
    System.out.println("My name is " + name);
  }
}
```

```java :collapsed-lines title="Main.java"
class Main {
  public static void main(String[] args) {

    // create an object of the subclass
    JerryTheMouse labrador = new JerryTheMouse();

    // access field of superclass
    mouse.name = "Jerry, the mouse";
    mouse.display();

    // call method of superclass
    // using object of subclass
    mouse.eat();
  }
}
```

```plaintext title="output"
My name is Jerry

I can eat
```

### Abstraction in Java

Abstraction is a concept in object-oriented programming that lets you show only essential attributes and hides unnecessary information in your code. The main purpose of abstraction is to hide unnecessary details from your users.

A simple example to explain abstraction is to think about the process that comes into play when you send an email. When you send an email, complex details such as what happens as soon as it is sent and the protocol that the server uses are hidden from you.

When you send an e-mail, you just need to enter the email address of the receiver, the email subject, type the content, and click send.

You can abstract stuff by using **abstract classes** or **interfaces**.

The `abstract` keyword is a non-access modifier, used for classes and methods:

- **Abstract class:** is a restricted class that cannot be used to create objects. To access it, it must be inherited from another class.
- **Abstract method:** A method that doesn't have its body is known as an abstract method. We use the same `abstract` keyword to create abstract methods.

The body of an abstract method is provided by the subclass (inherited from).

::: tip Example

```java title="Animal.java"
// Abstract class
abstract class Animal {
  // Abstract method (does not have a body)
  public abstract void animalSound();
  // Regular method
  public void sleep() {
    System.out.println("Zzzz");
  }
}
```

```java title="Cow.java"
// Subclass (inherit from Animal)
class Cow extends Animal {
  public void animalSound() {
    // The body of animalSound() is provided here
    System.out.println("The cow says: Moo");
  }
}
```

```java title="Main.java"
class Main {
  public static void main(String[] args) {
    Cow myCow = new Cow(); // Create a Cow object
    myCow.animalSound();
    myCow.sleep();
  }
}
```

:::

### Polymorphism in Java

Polymorphism refers to the ability of an object to take on many forms. Polymorphism normally occurs when we have many classes that are related to each other by inheritance.

Polymorphism is similar to how a person can have different characteristics at the same time.

For instance, a man can be a father, a grandfather, a husband, an employee, and so forth - all at the same time. So, the same person possesses different characteristics or behaviors in different situations.

::: tip Example

We are going to create objects Cow and Cat, and call the `animalSound()` method on each of them.

```java title="Animal.java"
class Animal {
  public void animalSound() {
    System.out.println("An animal can make a sound.");
  }
}
```

```java title="Cow.java"
class Cow extends Animal {
  public void animalSound() {
    System.out.println("A cow says: Moooo");
  }
}
```

```java title="Cat.java"
class Cat extends Animal {
  public void animalSound() {
    System.out.println("A cat says: Meeooww");
  }
}
```

```java title="Main.java"
class Main {
  public static void main(String[] args) {
    Animal myAnimal = new Animal();
    Animal myCow = new Cow();
    Animal myCat = new Cat();

    myAnimal.animalSound();
    myCow.animalSound();
    myCat.animalSound();
  }
}
```

:::

Inheritance and polymorphism are very useful for code reusability. You can reuse the attributes and methods of an existing class when you create a new class.

---

## Interfaces in Java

An `interface` is a collection of abstract methods. In other words, an `interface` is a completely "**abstract class**" used to group related methods with empty bodies.

An interface specifies what a class can do but not how it can do it.

::: tip Example

```java title="Language.java"
// create an interface
interface Language {
  void getName(String name);
}
```

```java title="ProgrammingLanguage.java"
// class implements interface
class ProgrammingLanguage implements Language {

  // implementation of abstract method
  public void getName(String name) {
    System.out.println("One of my favorite programming languages is: " + name);
  }
}
```

```java title="Main.java"
class Main {
  public static void main(String[] args) {
    ProgrammingLanguage language = new ProgrammingLanguage();
    language.getName("Java");
  }
}
```

```plaintext title="output"
One of my favorite programming languages is: Java
```

---

## Conclusion

We have looked at some of the main object-oriented programming concepts in this article. Having a good understanding of these concepts is essential if you want to use them well and write good code.

I hope this article was helpful.

My name is Patrick Cyubahiro, I am a software & web developer, UI/UX designer, technical writer, and Community Builder.

Feel free to connect with me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`Pat_Cyubahiro`)](https://x.com/Pat_Cyubahiro), or to write to: [<VPIcon icon="fas fa-envelope"/>ampatrickcyubahiro@gmail.com](mailto://ampatrickcyubahiro@gmail.com)

Thanks for reading and happy learning!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Object-Oriented Programming in Java - A Beginner's Guide",
  "desc": "By Patrick Cyubahiro Hi, folks! Today we are going to talk about object-oriented programming in Java. This article will help give you a thorough understanding of the underlying principles of object-oriented programming and its concepts.  Once you und...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-programming-concepts-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
