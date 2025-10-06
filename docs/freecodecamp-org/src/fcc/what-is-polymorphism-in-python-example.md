---
lang: en-US
title: "What is Polymorphism in Python? Explained with an Example"
description: "Article(s) > What is Polymorphism in Python? Explained with an Example"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Polymorphism in Python? Explained with an Example"
    - property: og:description
      content: "What is Polymorphism in Python? Explained with an Example"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/what-is-polymorphism-in-python-example.html
prev: /programming/py/articles/README.md
date: 2025-02-07
isOriginal: false
author:
  - name: Danny
    url : https://freecodecamp.org/news/author/DoableDanny/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738335631634/ef8f79a0-73df-430c-b955-a5325ca22f04.png
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
  name="What is Polymorphism in Python? Explained with an Example"
  desc="Polymorphism is an object-oriented programming (OOP) principle that helps you write high quality, flexible, maintainable, reusable, testable, and readable software. If you plan to work with object-oriented software, it is crucial to understand polymo..."
  url="https://freecodecamp.org/news/what-is-polymorphism-in-python-example"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738335631634/ef8f79a0-73df-430c-b955-a5325ca22f04.png"/>

Polymorphism is an object-oriented programming (OOP) principle that helps you write high quality, flexible, maintainable, reusable, testable, and readable software. If you plan to work with object-oriented software, it is crucial to understand polymorphism.

---

## What is Polymorphism?

The word *polymorphism* is derived from Greek, and means "having multiple forms":

- Poly = many
- Morph = forms
    

**In programming, polymorphism is the ability of an object to take many forms**.

The key advantage of polymorphism is that it allows us to write more **generic** and **reusable** code. Instead of writing separate logic for different classes, we define common behaviours in a parent class and let child classes override them as needed. This eliminates the need for excessive `if-else` checks, making the code more maintainable and extensible.

MVC frameworks like [Django<VPIcon icon="iconfont icon-django"/>](http://djangoproject.com/) use polymorphism to make code more flexible. For example, Django supports different databases like SQLite, MySQL, and PostgreSQL. Normally, each database requires different code to interact with it, but Django provides a single database API that works with all of them. This means you can write the same code for database operations, no matter which database you use. So, if you start a project with SQLite and later switch to PostgreSQL, you won’t need to rewrite much of your code, thanks to polymorphism.

In this article, to make things easy to understand, I’ll show you a bad code example with no polymorphism. We’ll discuss the issues that this bad code causes, and then solve the issues by refactoring the code to use polymorphism.

::: note 

Btw, if you learn better by video, checkout my [<VPIcon icon="fa-brands fa-youtube"/>Polymorphism in Python](https://youtu.be/zuPg8_qsL7A) YouTube video.

<VidStack src="youtube/zuPg8_qsL7A" />

:::



---

## First, an example with no polymorphism:

```py title="Car.py"
class Car:
    def __init__(self, brand, model, year, number_of_doors):
        self.brand = brand
        self.model = model
        self.year = year
        self.number_of_doors = number_of_doors

    def start(self):
        print("Car is starting.")

    def stop(self):
        print("Car is stopping.")
```

```py title="Motorcycle.py"
class Motorcycle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def start_bike(self):
        print("Motorcycle is starting.")

    def stop_bike(self):
        print("Motorcycle is stopping.")
```

Let’s say that we want to create a list of vehicles, then loop through it and perform an inspection on each vehicle:

```py
# Create list of vehicles to inspect
vehicles = [
    Car("Ford", "Focus", 2008, 5),
    Motorcycle("Honda", "Scoopy", 2018),
]

# Loop through list of vehicles and inspect them
for vehicle in vehicles:
    if isinstance(vehicle, Car):
        print(f"Inspecting {vehicle.brand} {vehicle.model} ({type(vehicle).__name__})")
        vehicle.start()
        vehicle.stop()
    elif isinstance(vehicle, Motorcycle):
        print(f"Inspecting {vehicle.brand} {vehicle.model} ({type(vehicle).__name__})")
        vehicle.start_bike()
        vehicle.stop_bike()
    else:
        raise Exception("Object is not a valid vehicle")
```

Notice the ugly code inside the `for` loop! Because `vehicles` is a list of any type of object, we have to figure out what type of object we are dealing with inside each loop before we can access any information on the object.

This code will continue to get uglier as we add more vehicle types. For example, if we *extended* our codebase to include a new `Plane` class, then we’d need to *modify* (and potentially break) existing code - we’d have to add another conditional check in the `for` loop for planes.

### Introducing: Polymorphism…

Cars and motorcycles are both vehicles. They both share some common properties and methods. So, let’s create a parent class that contains these shared properties and methods:

Parent class (or "superclass"):

```py title="Vehicle.py"
class Vehicle:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year

    def start(self):
        print("Vehicle is starting.")

    def stop(self):
        print("Vehicle is stopping.")
```

`Car` and `Motorcycle` can now *inherit* from `Vehicle`. Let’s create the child classes (or "subclasses") of the `Vehicle` superclass:

```py title="Car.py"
class Car(Vehicle):
    def __init__(self, brand, model, year, number_of_doors):
        super().__init__(brand, model, year)
        self.number_of_doors = number_of_doors

    # Below, we "override" the start and stop methods, inherited from Vehicle, to provide car-specific behaviour

    def start(self):
        print("Car is starting.")

    def stop(self):
        print("Car is stopping.")
```

```py title="Motorcycle.py"
class Motorcycle(Vehicle):
    def __init__(self, brand, model, year):
        super().__init__(brand, model, year)

    # Below, we "override" the start and stop methods, inherited from Vehicle, to provide bike-specific behaviour

    def start(self):
        print("Motorcycle is starting.")

    def stop(self):
        print("Motorcycle is stopping.")
```

`Car` and `Motorcycle` both extend `Vehicle`, as they are vehicles. But what’s the point in `Car` and `Motorcycle` both extending `Vehicle` if they are going to implement their own versions of the `start()` and `stop()` methods? Look at the code below:

::: tip Example

```py
# Create list of vehicles to inspect
vehicles = [Car("Ford", "Focus", 2008, 5), Motorcycle("Honda", "Scoopy", 2018)]

# Loop through list of vehicles and inspect them
for vehicle in vehicles:
    if isinstance(vehicle, Vehicle):
        print(f"Inspecting {vehicle.brand} {vehicle.model} ({type(vehicle).__name__})")
        vehicle.start()
        vehicle.stop()
    else:
        raise Exception("Object is not a valid vehicle")
```

**In this example**:

- We have a list, `vehicles`, containing instances of both `Car` and `Motorcycle`.
- We iterate through each vehicle in the list and perform a general inspection on each one.
- The inspection process involves starting the vehicle, checking its brand and model, and stopping it afterwards.
- Despite the vehicles being of different types, polymorphism allows us to treat them all as instances of the base `Vehicle` class. The specific implementations of the `start()` and `stop()` methods for each vehicle type are invoked dynamically at runtime, based on the actual type of each vehicle.
    
:::

Because the list can *only* contain objects that extend the `Vehicle` class, we know that every object will share some common fields and methods. This means that we can safely call them, without having to worry about whether each specific vehicle has these fields or methods.

This demonstrates how polymorphism enables code to be written in a more generic and flexible manner, allowing for easy extension and maintenance as new types of vehicles are added to the system.

For example, if we wanted to add another vehicle to the list, we don’t have to modify the code used to inspect vehicles (“the client code”). Instead, we can just *extend* our code base (that is, create a new class), without *modifying* existing code:

```py title="Plane.py"
class Plane(Vehicle):
    def __init__(self, brand, model, year, number_of_doors):
        super().__init__(brand, model, year)
        self.number_of_doors = number_of_doors

    def start(self):
        print("Plane is starting.")

    def stop(self):
        print("Plane is stopping.")
```

```py
# Create list of vehicles to inspect
vehicles = [
    Car("Ford", "Focus", 2008, 5),
    Motorcycle("Honda", "Scoopy", 2018),

    ########## ADD A PLANE TO THE LIST: #########

    Plane("Boeing", "747", 2015, 16),

    ############################################
]
```

The code to perform the vehicle inspections doesn’t have to change to account for a plane. Everything still works, without having to modify our inspection logic.

---

## Conclusion

Polymorphism allows clients to treat different types of objects in the same way. This greatly improves the flexibility of software and maintainability of software, as new classes can be created without you having to modify (often by adding extra `if` / `else if` blocks) existing working and tested code.

---

## Further Learning

Polymorphism is related to many other object-oriented programming principles, such as *dependency injection* and the *open-closed* SOLID principle. If you’d like to master OOP, then check out my Udemy course:

<SiteInfo
  name="Python OOP: Object Oriented Programming From Beginner to Pro"
  desc="Everything you need to develop great object oriented software. Classes, objects, polymorphism, SOLID, Design Patterns..."
  url="https://udemy.com/course/python-oop-object-oriented-programming-from-beginner-to-pro/"
  logo="https://udemy.com/staticx/udemy/images/v8/favicon-16x16.png"
  preview="https://img-c.udemycdn.com/course/480x270/6341221_65ef_3.jpg"/>

If you prefer book to video, check out my books:

```component VPCard
{
  "title": "Amazon.com: Python OOP: Object Oriented Programming from Beginner to Pro: A Beginner-Friendly Guide to OOP, Including SOLID and Design Patterns eBook : Adams, Danny: Kindle Store",
  "desc": "Amazon.com: Python OOP: Object Oriented Programming from Beginner to Pro: A Beginner-Friendly Guide to OOP, Including SOLID and Design Patterns eBook : Adams, Danny: Kindle Store",
  "link": "https://amazon.com/dp/B0DR6ZPZQ8/",
  "logo": "https://www.amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```
<SiteInfo
  name="Python OOP: Object Oriented Programming From Beginner to Pro"
  desc="What you'll learn Go from complete OOP beginner to being confident and ready to get a job working on OOP software Learn the basics of OOP: creating classes, objects, attributes, methods, access modifiers, abstract classes, getters & setters, properties, static attributes..."
  url="https://doabledanny.gumroad.com/l/python-oop-beginner-to-pro/"
  logo="https://public-files.gumroad.com/a6uezsulee4rwwngqrwt6k6np5cv"
  preview="https://public-files.gumroad.com/944x5wdggpao7aslc84kt41ou7f2"/>

Thanks for reading

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Polymorphism in Python? Explained with an Example",
  "desc": "Polymorphism is an object-oriented programming (OOP) principle that helps you write high quality, flexible, maintainable, reusable, testable, and readable software. If you plan to work with object-oriented software, it is crucial to understand polymo...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/what-is-polymorphism-in-python-example.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
