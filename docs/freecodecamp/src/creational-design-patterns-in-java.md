---
lang: en-US
title: "What are Creational Design Patterns in Java? Explained With Examples"
description: "Article(s) > What are Creational Design Patterns in Java? Explained With Examples"
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
      content: "Article(s) > What are Creational Design Patterns in Java? Explained With Examples"
    - property: og:description
      content: "What are Creational Design Patterns in Java? Explained With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/creational-design-patterns-in-java.html
prev: /programming/java/articles/README.md
date: 2024-07-26
isOriginal: false
author:
  - name: Anjan Baradwaj
    url : https://freecodecamp.org/news/author/anjanbaradwaj/
cover: https://freecodecamp.org/news/content/images/2024/07/Creational.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What are Creational Design Patterns in Java? Explained With Examples"
  desc="Design Patterns provide you with an idea or a strategy for solving commonly occurring problems. They are proven solutions that follow the best practices and help you make your code flexible, reusable, and maintainable. The design patterns are classif..."
  url="https://freecodecamp.org/news/creational-design-patterns-in-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/Creational.png"/>

Design Patterns provide you with an idea or a strategy for solving commonly occurring problems. They are proven solutions that follow the best practices and help you make your code flexible, reusable, and maintainable.

The design patterns are classified into three categories based on their purpose:

- Creational
- Structural
- Behavioral

In this article, I will walk you through what creational design patterns are, take a look at the different types, and explore some of them using Java code examples.

---

## Creational Design Patterns

As the name suggests, creational design patterns deal with object creation. They provide different ways for you to create objects. Following these design patterns will ensure that the object instantiation process is flexible and highly efficient. This is achieved by making the system independent of the creation, composition, and representation of the object.

There are five different types of creational design patterns:

1. Singleton
2. Factory Method
3. Abstract Factory
4. Builder
5. Prototype

In the following sections, we'll talk about these design patterns by defining them, providing code examples, and explaining their potential use cases.

---

## Singleton Design Pattern

A singleton design pattern ensures that there is only one instance of a class throughout your application. You're allowed to create only one object of the singleton class, and any subsequent call to create another object of the same class will return the existing object reference.

This allows you to have a single point of access to the object across your application. Let's take a look at the code for implementing the singleton pattern:

```java :collapsed-lines title="Singleton.java"
public class Singleton {
    private static Singleton instance;

    private Singleton() {

    }

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    public void displayMessage() {
        System.out.println("Hello, I am a Singleton instance!");
    }

    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();

        singleton.displayMessage();
    }
}
```

In the above example, you'll notice the three crucial aspects you must remember when implementing a singleton class:

- A private static instance
- A private constructor
- A public static method

The private static instance is of the same type as the class itself, and it is marked static as it needs to be accessed only through the class reference and not by creating an object.

The constructor of the class is marked private to prevent objects of the class from being created.

We also have a public static method named `getInstance`, which first checks if the instance is null. If it is, then it allows a new instance of the class to be created. Otherwise, it returns the existing instance reference.

We created an instance of the `Singleton` class by calling the static `getInstance` method.

::: info Use Cases

Here are a few cases where you might use the singleton design pattern:

- Database connections: These operations are expensive, so to avoid the overhead of repeatedly opening and closing the connections, you can implement the singleton design pattern to reuse existing connections from the pool.
- Logging: You can have a single instance of the logger to log the messages in your application to promote efficiency and consistency.
- Configuration: You can have a single, centralized configuration manager for loading the settings from any source and use it across the application

:::

::: note

There are a few other variations of implementing a singleton class, but we will not be exploring those in this article. Additionally, what we have seen above is a simple implementation in a single-threaded application. There are chances that you may encounter some challenges with this in a multi-threaded environment and addressing that is also beyond the scope of this article.

:::

---

## Factory Method Design Pattern

In the book "[<VPIcon icon="fas fa-globe"/>Design Patterns: Elements of Reusable Object-Oriented Software](https://oreilly.com/library/view/design-patterns-elements/0201633612/)" the authors (referred to as the Gang of Four or GoF) define the factory method as follows:

> defines an interface for creating an object, but let subclasses decide which class to instantiate

As the definition shows, in the factory method design pattern, an interface is provided for creating objects. Various classes implement this interface and return instances of their respective types. A factory then determines which type of object should be returned based on predefined conditions.

This design pattern encapsulates the instantiation logic, decouples the object creation process, making your code more flexible, and promotes extensibility. Let us take a look at the code example for better understanding:

### 1. We define an interface `Shape`:

```java title="Shape.java"
public interface Shape {
    void draw();
}
```

### 2. We create concrete implementions of the `Shape` class named `Square` and `Circle`:

```java
public class Square implements Shape {
    public void draw() {
        System.out.println("Drawing a Square");
    }
}

public class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}
```

### 3. We define a `ShapeFactory` interface for creating the objects of type `Shape`:

```java :title="ShapeFactory.java"
public interface ShapeFactory {
    Shape createShape();
}
```

### 4. Finally, we implement concrete factories:

```java
public class SquareFactory implements ShapeFactory {
    public Shape createShape() {
        return new Square();
    }
}

public class CircleFactory implements ShapeFactory {
    public Shape createShape() {
        return new Circle();
    }
}
```

### 5. The client uses the factory to create objects of different shapes:

```java
public class Main {

    public static void main(String[] args) {
        ShapeFactory squareFactory = new SquareFactory();
        Shape square = squareFactory.createShape();
        square.draw();

        ShapeFactory circleFactory = new CircleFactory();
        Shape circle = circleFactory.createShape();
        circle.draw();
    }
}
```

This way, we can ensure that the client code is decoupled from the specific classes, as it does not need to instantiate those objects directly. This makes it easier to add new shapes.

::: note Use Cases:

- Database Connections: You can set up a `DatabaseConnectionFactory` in your application to connect to different types of databases (for example: MySQL, PostgreSQL, Oracle)
- User Authentication: You can set up an `AuthenticationFactory` that supports different authentication methods (for example: OAuth, SAML, LDAP)

:::

---

## Abstract Factory Design Pattern

We will once again refer to the book "[<VPIcon icon="fas fa-globe"/>Design Patterns: Elements of Reusable Object-Oriented Software](https://oreilly.com/library/view/design-patterns-elements/0201633612/)" for the definition of abstract factory. It states:

> Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes.

This means that you have a super-factory that allows you to create a group of related factories. You can think of the abstract factory design pattern as a factory of factories, providing an additional layer of abstraction over the factory method design pattern we discussed earlier.

Let us take an example of the abstract factory design pattern using the idea of a `CarFactory` to create different types of cars.

### 1. We define a common interface for all cars named `Car`:

```java title="Car.java"
public interface Car {
    void drive();
}
```

### 2. We create concrete implementations of the `Car` interface named `Sedan` and `SUV`:

```java
public class Sedan implements Car {
    @Override
    public void drive() {
        System.out.println("Driving a Sedan");
    }
}

public class SUV implements Car {
    @Override
    public void drive() {
        System.out.println("Driving an SUV");
    }
}
```

### 3. We define an interface for car factories named `CarFactory`:

```java
public interface CarFactory {
    Car createCar();
}
```

### 4. We define concrete factories named `SedanFactory` and `SUVFactory` that create `Sedan` and `SUV` cars respectively:

```java
public class SedanFactory implements CarFactory {
    @Override
    public Car createCar() {
        return new Sedan();
    }
}

public class SUVFactory implements CarFactory {
    @Override
    public Car createCar() {
        return new SUV();
    }
}
```

### 5. The `AbstractCarFactory` class defines an abstract class for creating different car factories:

```java
public abstract class AbstractCarFactory {
    public abstract CarFactory getCarFactory(String type);
}
```

6. The `ConcreteCarFactory` class implements the `AbstractCarFactory` to return the appropriate factory based on the type of the car:

```java
public class ConcreteCarFactory extends AbstractCarFactory {
    @Override
    public CarFactory getCarFactory(String type) {
        if (type.equalsIgnoreCase("Sedan")) {
            return new SedanFactory();
        } else if (type.equalsIgnoreCase("SUV")) {
            return new SUVFactory();
        }
        return null;
    }
}
```

### 7. Finally, in the client code, we use the abstract factory design pattern to create `Sedan` and `SUV` cars without specifying their concrete classes:

```java
public class Main {
    public static void main(String[] args) {
        AbstractCarFactory carFactory = new ConcreteCarFactory();

        CarFactory sedanFactory = carFactory.getCarFactory("Sedan");
        Car sedan = sedanFactory.createCar();
        sedan.drive();  // Output - Driving a Sedan

        CarFactory suvFactory = carFactory.getCarFactory("SUV");
        Car suv = suvFactory.createCar();
        suv.drive();  // Output -  Driving an SUV
    }
}
```

::: note Use Cases

- When you want to have a system that is independent of the creation, composition, and representation of its components.
- When you want to configure a system with a family of related components.

:::

---

## Builder Design Pattern

The builder design pattern is another creational design pattern used to construct complex objects. You might encounter a class with many parameters required to create an instance. Some can be mandatory, while some can be optional. Using the builder design pattern, you can separate the process of creating such complex objects from their representation.

Let me give you an example:

```java :collapsed-lines
public class Person {

    private final String firstName;
    private final String lastName;

    private final int age;
    private final String address;
    private final String phoneNumber;

    private Person(PersonBuilder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.address = builder.address;
        this.phoneNumber = builder.phoneNumber;
    }

    // Getters for all the parameters

    @Override
    public String toString() {
        return "Person{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public static class PersonBuilder {

        private final String firstName;
        private final String lastName;

        private int age;
        private String address;
        private String phoneNumber;

        public PersonBuilder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public PersonBuilder age(int age) {
            this.age = age;
            return this;
        }

        public PersonBuilder address(String address) {
            this.address = address;
            return this;
        }

        public PersonBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Person build() {
            return new Person(this);
        }
    }
}
```

In the above example, we have a `Person` class that contains a few required parameters (`firstName` and `lastName`) and some optional parameters (`age`, `address`, `phoneNumber`). The constructor is also marked private so that only the `PersonBuilder` class associated with this is allowed to access it.

The `PersonBuilder` class has the same properties as the `Person` class. The required parameters are set via its constructor. It also has suitable methods for setting the optional parameters that return `this` and enable method chaining.

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        Person person = new Person.PersonBuilder("Mikel", "Arteta")
                .age(42)
                .address("1 North London")
                .phoneNumber("111-1234")
                .build();

        System.out.println(person);
    }
}
```

To use this, we created a `PersonBuilder` instance with the required parameters. We set the optional parameters using method chaining. Finally, we called the `build()` method to create a `Person` object.

::: info Use Cases:

- You can use the builder design pattern when you want to construct a complex object of a class that has a combination of mandatory and optional properties.
- You can use this when your class has many parameters and is inefficient to have different constructors for each combination of the parameters.
- You can use it to provide different representations of the same object to the client.

:::

---

## Prototype Design Pattern

There could be a scenario where you want to create an object that is similar to an existing object. The prtotype design pattern allows you to achieve this. In this pattern, the existing object is known as the prototype, and the idea is that it is much more efficient to copy an existing object than to create a new one from scratch.

It might not be possible for you to create an exact copy of the prototype because some fields of that object might be marked as private. This can be overcome by using the clone method approach. We create a common interface that includes only a clone method, and all classes that support the cloning of their objects implement this interface. Let us take a look at the code example for this:

### 1. We create a `Prototype` interface that defines a `clone` method that classes must implement:

```java title="Prototype.java"
public interface Prototype extends Cloneable {
    Prototype clone();
}
```

### 2. We create `Circle` and `Rectangle` which are concrete classes that implement the `Prototype` interface:

```java :collapsed-lines title="Circle.java"
public class Circle implements Prototype {
    private int radius;

    public Circle(int radius) {
        this.radius = radius;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    @Override
    public Prototype clone() {
        return new Circle(this.radius);
    }

    @Override
    public String toString() {
        return "Circle with radius: " + radius;
    }
}

public class Rectangle implements Prototype {
    private int width;
    private int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public Prototype clone() {
        return new Rectangle(this.width, this.height);
    }

    @Override
    public String toString() {
        return "Rectangle with width: " + width + " and height: " + height;
    }
}
```

### 3. In the client code, we create the original objects (`originalCircle` and `originalRectangle`) and then we clone them to create new instances (`clonedCircle` and `clonedRectangle`)

Note that the cloned instances can be modified independently of the original objects.

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        Circle originalCircle = new Circle(10);
        Circle clonedCircle = (Circle) originalCircle.clone();
        clonedCircle.setRadius(20);

        System.out.println(originalCircle);  
        System.out.println(clonedCircle);

        Rectangle originalRectangle = new Rectangle(15, 25);
        Rectangle clonedRectangle = (Rectangle) originalRectangle.clone();
        clonedRectangle.setWidth(30);
        clonedRectangle.setHeight(50);

        System.out.println(originalRectangle);  
        System.out.println(clonedRectangle);    
    }
}
```

::: info Use Cases

- Follow the prototype design pattern when the object you want to create involves a complex construction process.
- Use it when the object initialization is costly and involves a lot of expensive resources.

:::

---

## Conclusion

In this article, we explored the creational design patterns and delved into code examples and use cases. Understanding these patterns and their application will help you make your code more extensible and maintainable.

Connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`abaradwaj`)](https://linkedin.com/in/abaradwaj/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Creational Design Patterns in Java? Explained With Examples",
  "desc": "Design Patterns provide you with an idea or a strategy for solving commonly occurring problems. They are proven solutions that follow the best practices and help you make your code flexible, reusable, and maintainable. The design patterns are classif...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/creational-design-patterns-in-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
