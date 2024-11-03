---
lang: en-US
title: "How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners"
description: "Article(s) > How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners"
    - property: og:description
      content: "How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-programming-in-python-interview-questions.html
prev: /programming/py/articles/README.md
date: 2024-10-25
isOriginal: false
author: Casmir Onyekani
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729679277832/18ab2f5b-0636-44e7-b063-0773e5039fb0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners"
  desc="OOP is a crucial concept that every developer should grasp, especially when getting ready for job interviews. It helps you organize code into modular and reusable sections, which simplifies the development, maintenance, and scaling of software applic..."
  url="https://freecodecamp.org/news/object-oriented-programming-in-python-interview-questions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729679277832/18ab2f5b-0636-44e7-b063-0773e5039fb0.png"/>

OOP is a crucial concept that every developer should grasp, especially when getting ready for job interviews. It helps you organize code into modular and reusable sections, which simplifies the development, maintenance, and scaling of software applications.

In this article, I'll use some common interview questions to simplify the key OOP concepts, providing clear explanations and code snippets to boost your confidence for your next interview.

---

## What is OOP?

Object-Oriented Programming (OOP) is a way of writing software that revolves around objects**.** These objects can store data and their actions (methods). Rather than concentrating solely on processes and logic, OOP encourages you to structure your code around these objects.

This approach makes it easier to create modular, reusable, and scalable software designs.

---

## What are the Four Main Principles of OOP

The four pillars of OOP are:

- Encapsulation
- Abstraction
- Inheritance
- Polymorphism

### What is Encapsulation, and Why is it Important?

Encapsulation helps protect the data inside an object. Think of it like keeping certain details private, allowing only controlled access to them.

That is, instead of directly changing or viewing the data, you interact with it through specific methods. This ensures that the data is safe from unintended changes.

Example:

```py
class Person:
    def __init__(self, name, age):
        self.name = name
        self.__age = age  # Private attribute (notice the double underscore)

    def get_age(self):
        return self.__age  # A method to access the private age attribute
```

In this example, `__age` is kept private, and we can only get the age using the `get_age()` method. This ensures that `age` is not accidentally modified in a way that could cause issues.

### What is Abstraction, and How is it Different from Encapsulation?

Abstraction allows you to show only the important details of an object or system, while hiding the complex parts that the user doesn't need to see.

Think of it like driving a car, you only need to know how to use the steering wheel, gear, gas pedal, and brakes to drive. You don’t need to understand how the engine works internally.

In programming, abstraction helps you focus on what something does, not how it works inside.

::: info Example

Let’s say you’re using a `Car` class. The abstraction lets you start the car without knowing all the mechanical details:

```py
class Car:
    def start_engine(self):
        print("Engine started")

    def drive(self):
        print("Car is driving")

# The user interacts with the car without knowing how the engine works
my_car = Car()
my_car.start_engine()
my_car.drive()
```

Here, you don’t need to worry about how the `start_engine` method works internally, you just use it!

Key Difference:

- Encapsulation: Focuses on bundling data and restricting access.
- Abstraction: Focuses on hiding complexity and exposing only necessary details.

:::

### What is inheritance in OOP?

Inheritance lets you create a new class by using an existing class. The new class (called the child class) gets all the attributes and methods from the existing class (called the parent class).

This allows you to reuse code and build upon what you've already written without starting from scratch.

Example:

```py
# Parent class
class Vehicle:
    def __init__(self, brand):
        self.brand = brand  # This is an attribute (brand)

    def start(self):
        print(f"{self.brand} vehicle started")  # This is a method

# Child class that inherits from Vehicle
class Car(Vehicle):
    def __init__(self, brand, model):
        super().__init__(brand)  # Inherit the brand from Vehicle (parent class)
        self.model = model  # Add a new attribute specific to Car

    def display_info(self):
        print(f"Car: {self.brand}, Model: {self.model}")

# Creating an object of the Car class
my_car = Car("IVM", "Ikenga")
my_car.start()  # Output: IVM vehicle started
my_car.display_info()  # Output: Car: IVM, Model: Ikenga
```

In this example, `Vehicle` is the parent class, and `Car` is the child class. `Car` inherits the `brand` and `start()` method from `Vehicle`, but it also has its own attribute (`model`) and method (`display_info()`).

Inheritance makes it easier to create more specialized classes (like `Car`) based on a general class (like `Vehicle`).

### What is Polymorphism?

Polymorphism allows different types of objects to respond to the same action in their own unique way. It’s like how both cats and dogs make sounds, but each makes a different sound when you ask them to!

Polymorphism can be achieved through method overriding (when a child class has a method with the same name as a method in its parent class but provides its own implementation).

Example of method overriding:

```py
# Parent class
class Animal:
    def sound(self):
        return "Some generic animal sound"

# Child class Dog overriding the sound method
class Dog(Animal):
    def sound(self):
        return "Bark"

# Child class Cat overriding the sound method
class Cat(Animal):
    def sound(self):
        return "Meow"

# Creating instances of each class
my_dog = Dog()
my_cat = Cat()

# Calling the sound method
print(my_dog.sound())  # Output: Bark
print(my_cat.sound())  # Output: Meow
```

In this example:

- `Animal` is the parent class, and it has a method called `sound()`.
- Both `Dog` and `Cat` are child classes of `Animal`, and they override the `sound()` method to provide their own specific sound.
- When you call `sound()` on a dog, it returns "Bark", and for a cat, it returns "Meow."

This is polymorphism in action, different objects (Dog, Cat) responding to the same method (`sound()`) in different ways.

It's a powerful tool that helps in creating flexible and easy-to-maintain code!

---

## What is Method Overloading?

Method overloading happens when you create multiple methods with the same name, but with different types of parameters inside the same class.

While Python doesn't support traditional method overloading, you can mimic similar behavior by using default arguments/parameters or handling multiple arguments inside the method.

Example 1: Using Default Parameters

```py
class Calculator:
    def add(self, a, b=0, c=0):
        return a + b + c

# Create an instance of Calculator
calc = Calculator()

# Call the add method with different numbers of arguments
print(calc.add(5))        # Output: 5 (a = 5, b and c default to 0)
print(calc.add(5, 10))    # Output: 15 (a = 5, b = 10, c default to 0)
print(calc.add(5, 10, 15))# Output: 30 (a = 5, b = 10, c = 15)
```

In this example, the `add` method has one required parameter (`a`) and two optional parameters (`b` and `c`) with default values of `0`.

By changing the number of arguments you pass when calling the method, you can achieve a method overloading effect.

Example 2: Using `*args` for Dynamic Parameters

```py
class Calculator:
    def add(self, *args):
        return sum(args)

# Create an instance of Calculator
calc = Calculator()

# Call the add method with different numbers of arguments
print(calc.add(5))           # Output: 5 (adds just one number)
print(calc.add(5, 10))       # Output: 15 (adds two numbers)
print(calc.add(5, 10, 15))   # Output: 30 (adds three numbers)
```

In this example, the `add` method can handle any number of arguments thanks to `*args`, allowing you to call the method with one or more parameters. It sums up all the numbers passed to it.

---

## What is a Constructor in OOP?

A constructor is a special method that automatically runs when you create a new object from a class. It helps to set up the object's initial values (like setting the name or age of a person).

In Python, the constructor method is named `__init__`, which stands for "initialize”.

Example:

```py
class Student:
    def __init__(self, name, grade):  # The constructor method
        self.name = name  # Setting the name when the object is created
        self.grade = grade  # Setting the grade when the object is created

# Creating a new Student object
student1 = Student("Alice", "A")

# Accessing the student's details
print(student1.name)  # Output: Alice
print(student1.grade)  # Output: A
```

In this example, the `__init__` method automatically assigns the values for `name` and `grade` when we create a `Student` object (like `student1`).When you print `student1.name`, it shows "Alice," and `student1.grade` shows "A."

This helps to set up each student object with different details when needed!

---

## What is a Destructor in OOP?

A destructor is a method that is called when an object is destroyed. In Python, the destructor is defined using `__del__`.

Example:

```py
class Demo:
    def __init__(self):
        print("Constructor called")

    def __del__(self):
        print("Destructor called")

obj = Demo()
del obj  # Explicitly calling the destructor
```

In this example, the `Demo` class has a constructor (`__init__`) that prints "Constructor called" when an object is created, and a destructor (`__del__`) that prints "Destructor called" when the object is deleted.

The `del obj` explicitly triggers the destructor to clean up the object.

---

## What is a Class in OOP?

A class is like a template for making objects in programming. It outlines what properties (called attributes) and actions (called methods) the objects will have. Think of a class as a recipe that tells you how to create something, like a car.

Example:

```py
 class Car:
    def __init__(self, make, model):
        self.make = make  # The brand of the car, like IVM
        self.model = model  # The specific model, like Ikenga

    def display_info(self):
        return f"Car: {self.make}, Model: {self.model}"  # Shows the car's information
```

In this example:

- `Car` is the class that describes what a car is.
- `make` and `model` are attributes that hold information about the car.
- `display_info` is a method that tells us how to get details about the car.

When we create a car object from this class, it will have its own make and model, just like real cars do!

---

## What is an Object in OOP?

An object is a specific example of a class. Think of it like a real-life item that has certain characteristics defined by the class. When you create an object, you're giving it actual values for its properties.

```py
my_car = Car("IVM", "Ikenga")
print(my_car.display_info())  # This will show: Car: IVM, Model: Ikenga
```

In this example, `my_car` is an object created from the `Car` class.

---

## What is a Static Method?

This is a method that belongs to a class, not to an instance (object) of that class. Unlike other methods, static methods don’t need access to instance-specific data (attributes) or class-specific data.

You can call a static method directly from the class without creating an object.

Example:

```py
class MathOperations:
    @staticmethod  # This tells Python it's a static method
    def add(a, b):
        return a + b

# We don't need to create an object of the class to use the static method
result = MathOperations.add(5, 3)
print(result)  # Output: 8
```

In this example, `@staticmethod` is used to define the method as static. You can call `MathOperations.add()` directly using the class name, without creating an object of `MathOperations`.

---

## What is the Difference Between a Class Variable and an Instance Variable?

A class variable is shared among all instances of a class, while an instance variable is specific to each object and defined inside methods, usually within the constructor.

Example:

```py
class MyClass:
    class_var = "I am a class variable"

    def __init__(self, instance_var):
        self.instance_var = instance_var  # Instance variable
```

In this example, a class `MyClass` has a class variable `class_var` that is shared by all instances, and an instance variable `instance_var` that is unique to each object created from the class.

---

## Does Python Support Multiple Inheritance?

Yes, Python allows multiple inheritance, where a class can inherit from more than one parent class.

Example:

```py
class Parent1:
    def display(self):
        print("Parent1")

class Parent2:
    def display(self):
        print("Parent2")

class Child(Parent1, Parent2):
    pass

child = Child()
child.display()  # Method resolution order determines which display() is called
```

In this example, the `Child` class inherits from both `Parent1` and `Parent2`, and due to the [method resolution order (MRO)](https://docs.python.org/3/howto/mro.html), `Child` will call `Parent1`'s `display()` method first.

---

## What is the Difference Between an Abstract Class and an Interface?

An abstract class is a special type of class that you cannot create an object from. It can have both incomplete methods (called abstract methods) that don’t have any implementation, as well as fully implemented methods that do have code.

An interface is like a contract that defines methods that must be implemented by any class that uses it. In Python, we achieve interfaces through abstract base classes (ABCs), which only contain abstract methods. They don’t have any implementation.

Simple example to illustrate the concepts:

```py
from abc import ABC, abstractmethod

# Abstract Class
class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass  # This is an abstract method, no implementation

    def sleep(self):
        return "Sleeping..."  # This is a regular method with implementation

# Subclass that implements the abstract method
class Dog(Animal):
    def sound(self):
        return "Bark"  # Implementation of the abstract method

class Cat(Animal):
    def sound(self):
        return "Meow"  # Another implementation of the abstract method

# Using the classes
my_dog = Dog()
print(my_dog.sound())  # Output: Bark
print(my_dog.sleep())  # Output: Sleeping...

my_cat = Cat()
print(my_cat.sound())  # Output: Meow
print(my_cat.sleep())  # Output: Sleeping...
```

In this example, an abstract class `Animal` with an abstract method `sound`, and two subclasses, `Dog` and `Cat`, implement the `sound` method, demonstrating the use of abstract classes and method overriding in Python.

---

## Conclusion

Understanding these OOP principles is crucial for any developer. It forms the foundation of most modern programming languages.

By mastering the key concepts and being prepared for interview questions, you’ll not only build better software but also enhance your chances of landing your next developer role.

If you found this guide helpful please give it a like. You can follow me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`casweb_dev`)](https://x.com/casweb_dev) for more insightful articles.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Object-Oriented Programming in Python – Key OOP Concepts and Interview Questions for Beginners",
  "desc": "OOP is a crucial concept that every developer should grasp, especially when getting ready for job interviews. It helps you organize code into modular and reusable sections, which simplifies the development, maintenance, and scaling of software applic...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/object-oriented-programming-in-python-interview-questions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
