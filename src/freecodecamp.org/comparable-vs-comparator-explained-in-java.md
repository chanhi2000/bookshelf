---
lang: en-US
title: "Comparable vs Comparator Interfaces in Java – Which Should You Use and When?"
description: "Article(s) > Comparable vs Comparator Interfaces in Java – Which Should You Use and When?"
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
      content: "Article(s) > Comparable vs Comparator Interfaces in Java – Which Should You Use and When?"
    - property: og:description
      content: "Comparable vs Comparator Interfaces in Java – Which Should You Use and When?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/comparable-vs-comparator-explained-in-java.html
prev: /programming/java/articles/README.md
date: 2024-07-23
isOriginal: false
author: Ashutosh Krishna
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/07/comparable-comparator.png
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
  name="Comparable vs Comparator Interfaces in Java – Which Should You Use and When?"
  desc="Sorting is a fundamental operation in programming, essential for organizing data in a specific order. In Java, built-in sorting methods provide efficient ways to sort primitive data types and arrays, making it easy to manage and manipulate collection..."
  url="https://freecodecamp.org/news/comparable-vs-comparator-explained-in-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/comparable-comparator.png"/>

Sorting is a fundamental operation in programming, essential for organizing data in a specific order. In Java, built-in sorting methods provide efficient ways to sort primitive data types and arrays, making it easy to manage and manipulate collections of data. For instance, you can quickly sort an array of integers or a list of strings using methods like `Arrays.sort()` and `Collections.sort()`.

However, when it comes to sorting custom objects, such as instances of user-defined classes, the built-in sorting methods fall short. These methods don't know how to order objects based on custom criteria. This is where Java's `Comparable` and `Comparator` interfaces come into play, allowing developers to define and implement custom sorting logic tailored to specific requirements.

In this blog post, we'll explore how to use the `Comparable` and `Comparator` interfaces to sort custom objects in Java. I'll provide examples to illustrate the differences and use cases for each approach, helping you master custom sorting in your Java applications.

---

## Sorting Methods for Primitive Types

Java provides a variety of built-in sorting methods that make it easy to sort primitive data types. These methods are highly optimized and efficient, allowing you to sort arrays and collections with minimal code. For primitive types, such as integers, floating-point numbers, and characters, the `Arrays.sort()` method is commonly used.

### How to Use the Arrays.sort() Method

The `Arrays.sort()` method sorts the specified array into ascending numerical order. This method uses a dual-pivot quicksort algorithm, which is faster and more efficient for most data sets.

Let's look at an example of sorting an array of integers and characters using `Arrays.sort()`:

```java
package tutorial;

import java.util.Arrays;

public class PrimitiveSorting {
    public static void main(String[] args) {
        int[] numbers = { 5, 3, 8, 2, 1 };
        System.out.println("Original array: " + Arrays.toString(numbers));

        Arrays.sort(numbers);
        System.out.println("Sorted array: " + Arrays.toString(numbers));

        char[] characters = { 'o', 'i', 'e', 'u', 'a' };
        System.out.println("Original array: " + Arrays.toString(characters));

        Arrays.sort(characters);
        System.out.println("Sorted array: " + Arrays.toString(characters));
    }
}
```

Output:

```sh
# 
# Original array: [5, 3, 8, 2, 1]
# Sorted array: [1, 2, 3, 5, 8]
# Original array: [o, i, e, u, a]
# Sorted array: [a, e, i, o, u]
#
```

### How to Use the `Collections.sort()` Method

The `Collections.sort()` method is used to sort collections such as `ArrayList`. This method is also based on the natural ordering of the elements or a custom comparator.

```java
package tutorial;

import java.util.ArrayList;
import java.util.Collections;

public class CollectionsSorting {
    public static void main(String[] args) {
        ArrayList<String> wordsList = new ArrayList<>();
        wordsList.add("banana");
        wordsList.add("apple");
        wordsList.add("cherry");
        wordsList.add("date");
        System.out.println("Original list: " + wordsList);

        Collections.sort(wordsList);
        System.out.println("Sorted list: " + wordsList);
    }
}
```

Output:

```sh
# 
# Original list: [banana, apple, cherry, date]
# Sorted list: [apple, banana, cherry, date]
# 
```

### Limitations with Custom Classes

While Java's built-in sorting methods, such as `Arrays.sort()` and `Collections.sort()`, are powerful and efficient for sorting primitive types and objects with natural ordering (like `String`), they fall short when it comes to sorting custom objects. These methods do not inherently know how to order user-defined objects because there is no natural way for them to compare these objects.

For example, consider a simple `Person` class that has `name`, `age`, and `weight` attributes:

```java
package tutorial;

public class Person {
    String name;
    int age;
    double weight;

    public Person(String name, int age, double weight) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + ", weight=" + weight + " kgs]";
    }
}
```

If we try to sort a list of `Person` objects using `Arrays.sort()` or `Collections.sort()`, we will encounter a compilation error because these methods do not know how to compare `Person` objects:

```java
package tutorial;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CustomClassSorting {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(Arrays.asList(
                new Person("Alice", 30, 65.5),
                new Person("Bob", 25, 75.0),
                new Person("Charlie", 35, 80.0)
        ));
        System.out.println("Original people list: " + people);

        Collections.sort(people);
        System.out.println("Sorted people list: " + people);
    }
}
```

Compilation Error:

```sh
# 
# java: no suitable method found for sort(java.util.List<tutorial.Person>)
#     method java.util.Collections.<T>sort(java.util.List<T>) is not applicable
#       (inference variable T has incompatible bounds
#         equality constraints: tutorial.Person
#         lower bounds: java.lang.Comparable<? super T>)
#     method java.util.Collections.<T>sort(java.util.List<T>,java.util.Comparator<? super T>) is not applicable
#       (cannot infer type-variable(s) T
#         (actual and formal argument lists differ in length))
#
```

The error occurs because the `Person` class does not implement the `Comparable` interface, and there is no way for the sorting method to know how to compare two `Person` objects.

To sort custom objects like `Person`, we need to provide a way to compare these objects. Java offers two main approaches to achieve this:

1. Implementing the `Comparable` Interface: This allows a class to define its natural ordering by implementing the `compareTo` method.
2. Using the `Comparator` Interface: This allows us to create separate classes or lambda expressions to define multiple ways of comparing objects.

We will explore both approaches in the upcoming sections, starting with the `Comparable` interface.

---

## How to Use the Comparable Interface

Java provides a `Comparable` interface to define a natural ordering for objects of a user-defined class. By implementing the `Comparable` interface, a class can provide a single natural ordering that can be used to sort its instances. This is particularly useful when you need a default way to compare and sort objects.

### Overview

The `Comparable` interface contains a single method, `compareTo()`, which compares the current object with the specified object for order. The method returns:

- A negative integer if the current object is less than the specified object.
- Zero if the current object is equal to the specified object.
- A positive integer if the current object is greater than the specified object.

### How Comparable Allows for a Single Natural Ordering of Objects

By implementing the `Comparable` interface, a class can ensure that its objects have a natural ordering. This allows the objects to be sorted using methods like `Arrays.sort()` or `Collections.sort()` without the need for a separate comparator.

Let's implement the `Comparable` interface in a new `PersonV2` class, comparing by age.

```java
package tutorial;

public class PersonV2 implements Comparable<PersonV2> {
    String name;
    int age;
    double weight;

    public PersonV2(String name, int age, double weight) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "PersonV2 [name=" + name + ", age=" + age + ", weight=" + weight + " kgs]";
    }

    @Override
    public int compareTo(PersonV2 other) {
        return this.age - other.age;
    }
}
```

In this implementation, the `compareTo()` method compares the `age` attribute of the current `PersonV2` object with the `age` attribute of the specified `PersonV2` object by subtracting one age from the other. By using the expression `this.age - other.age`, we’re effectively implementing this logic as follows:

- If `this.age` is less than `other.age`, the result will be negative.
- If `this.age` is equal to `other.age`, the result will be zero.
- If `this.age` is greater than `other.age`, the result will be positive.

::: note

We can also use `Integer.compare(this.age, other.age)` instead of performing the arithmetic operation manually.

:::

Now that the `PersonV2` class implements the `Comparable` interface, we can sort a list of `PersonV2` objects using `Collections.sort()`:

```java
package tutorial;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CustomClassSortingV2 {
    public static void main(String[] args) {
        List<PersonV2> people = new ArrayList<>(Arrays.asList(
                new PersonV2("Alice", 30, 65.5),
                new PersonV2("Bob", 25, 75.0),
                new PersonV2("Charlie", 35, 80.0)
        ));
        System.out.println("Original people list: " + people);

        Collections.sort(people);
        System.out.println("Sorted people list: " + people);
    }
}
```

Output:

```sh
# 
# Original people list: [PersonV2 [name=Alice, age=30, weight=65.5 kgs], PersonV2 [name=Bob, age=25, weight=75.0 kgs], PersonV2 [name=Charlie, age=35, weight=80.0 kgs]]
# Sorted people list: [PersonV2 [name=Bob, age=25, weight=75.0 kgs], PersonV2 [name=Alice, age=30, weight=65.5 kgs], PersonV2 [name=Charlie, age=35, weight=80.0 kgs]]
# 
```

In this example, the `PersonV2` objects are sorted in ascending order of age using the `Collections.sort()` method, which relies on the natural ordering defined by the `compareTo()` method in the `PersonV2` class.

### Limitations of Comparable

While the `Comparable` interface provides a way to define a natural ordering for objects, it has several limitations that can restrict its use in practical applications. Understanding these limitations can help us determine when to use other mechanisms, such as the `Comparator` interface, to achieve more flexible sorting.

- **Single Natural Ordering**: The primary limitation of `Comparable` is that it allows only one natural ordering for the objects of a class. When you implement `Comparable`, you define a single way to compare objects, which is used whenever the objects are sorted or compared. This can be restrictive if you need to sort objects in multiple ways.
- **Inflexibility**: If you need to sort objects by different attributes or in different orders, you will have to modify the class or create new implementations of `Comparable`. This inflexibility can lead to a proliferation of comparison methods and can make the code harder to maintain.
- **Non-Adaptable**: Once a class implements `Comparable`, the natural ordering is fixed and cannot be easily changed. For instance, if your `PersonV2` class initially sorts by age but later you need to sort by weight or name, you have to either change the `compareTo()` method or create a new version of the class.

This is where the `Comparator` interface comes into play. To define multiple ways of comparing objects, we can use the `Comparator` interface, which we will explore in the next section.

---

## How to Use the Comparator Interface

The `Comparator` interface in Java provides a way to define multiple ways of comparing and sorting objects. Unlike the `Comparable` interface, which allows only a single natural ordering, `Comparator` is designed to offer flexibility by allowing multiple sorting strategies. This makes it particularly useful for scenarios where objects need to be sorted in different ways.

### Overview

The `Comparator` interface defines a single method, `compare()`, which compares two objects and returns:

- A negative integer if the first object is less than the second object.
- Zero if the first object is equal to the second object.
- A positive integer if the first object is greater than the second object.

This method provides a way to define custom ordering for objects without modifying the class itself.

### How Comparator Allows for Multiple Ways of Ordering Objects

The `Comparator` interface allows you to create multiple `Comparator` instances, each defining a different ordering for objects. This flexibility means that you can sort objects by various attributes or in different orders without altering the object's class.

Let's implement multiple `Comparator` instances for the `Person` class. We'll define comparators for sorting by name, by age, and by weight. First, we need to update the `Person` class to include getters and ensure that attributes are accessible.

```java
package tutorial;

public class Person {
    String name;
    int age;
    double weight;

    public Person(String name, int age, double weight) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public double getWeight() {
        return weight;
    }

    @Override
    public String toString() {
        return "Person [name=" + name + ", age=" + age + ", weight=" + weight + " kgs]";
    }
}
```

#### Comparator by Name

This comparator sorts `Person` objects alphabetically by their `name`.

```java
package tutorial.comparator;

import tutorial.Person;

import java.util.Comparator;

public class PersonNameComparator implements Comparator<Person> {

    @Override
    public int compare(Person p1, Person p2) {
        return p1.getName().compareTo(p2.getName());
    }
}
```

#### Comparator by Age

This comparator sorts `Person` objects by their `age`, in ascending order.

```java
package tutorial.comparator;

import tutorial.Person;

import java.util.Comparator;

public class PersonAgeComparator implements Comparator<Person> {

    @Override
    public int compare(Person p1, Person p2) {
        return p1.getAge() - p2.getAge();
    }
}
```

#### Comparator by Weight

This comparator sorts `Person` objects by their `weight`, in ascending order.

```java
package tutorial.comparator;

import tutorial.Person;

import java.util.Comparator;

public class PersonWeightComparator implements Comparator<Person> {

    @Override
    public int compare(Person p1, Person p2) {
        return (int) (p1.getWeight() - p2.getWeight());
    }
}
```

Now, here’s how you can use these `Comparator` instances to sort a list of `Person` objects:

```java
package tutorial;

import tutorial.comparator.PersonAgeComparator;
import tutorial.comparator.PersonNameComparator;
import tutorial.comparator.PersonWeightComparator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CustomClassSortingV3 {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>(Arrays.asList(
                new Person("Alice", 30, 65.5),
                new Person("Bob", 25, 75.0),
                new Person("Charlie", 35, 80.0)
        ));
        System.out.println("Original people list: " + people);

        Collections.sort(people, new PersonNameComparator());
        System.out.println("Sorted people list by name: " + people);

        Collections.sort(people, new PersonAgeComparator());
        System.out.println("Sorted people list by age: " + people);

        Collections.sort(people, new PersonWeightComparator());
        System.out.println("Sorted people list by weight: " + people);
    }
}
```

Output:

```sh
# 
# Original people list: [Person [name=Alice, age=30, weight=65.5 kgs], Person [name=Bob, age=25, weight=75.0 kgs], Person [name=Charlie, age=35, weight=80.0 kgs]]
# Sorted people list by name: [Person [name=Alice, age=30, weight=65.5 kgs], Person [name=Bob, age=25, weight=75.0 kgs], Person [name=Charlie, age=35, weight=80.0 kgs]]
# Sorted people list by age: [Person [name=Bob, age=25, weight=75.0 kgs], Person [name=Alice, age=30, weight=65.5 kgs], Person [name=Charlie, age=35, weight=80.0 kgs]]
# Sorted people list by weight: [Person [name=Alice, age=30, weight=65.5 kgs], Person [name=Bob, age=25, weight=75.0 kgs], Person [name=Charlie, age=35, weight=80.0 kgs]]
# 
```

In this example, the `Comparator` instances allow sorting the `Person` objects by different attributes: name, age, and weight. This demonstrates how the `Comparator` interface enables flexible and versatile sorting strategies for a class.

---

## Comparable vs Comparator

When sorting objects in Java, you have two primary options: the `Comparable` and `Comparator` interfaces. Understanding the differences between these two interfaces can help you choose the right approach for your needs. Please note that this is also a very important interview question.

### Comparison

Here’s a table comparing and contrasting the `Comparable` and `Comparator` interfaces in Java:

| Feature | Comparable | Comparator |
| :--- | :---: | :---: |
| Definition | Provides a single, natural ordering for objects | Provides multiple ways to compare objects |
| Method | `compareTo(T o)` | `compare(T o1, T o2)` |
| Implementation | Implemented within the class itself | Implemented outside the class |
| Sorting Criteria | One default natural ordering | Multiple sorting criteria |
| Flexibility | Limited to one way of comparing objects | Flexible; multiple comparators can be defined |
| Class Modification | Requires modifying the class to implement `Comparable` | Does not require modifying the class |
| Use Case | Use when there is a clear, natural ordering (e.g., sorting employees by ID) | Use when different sorting orders are needed or when you cannot modify the class |

### Benefits and Drawbacks of Each Approach

#### Comparable Operator

::: tabs

@tab:active Benefits

- **Simplicity**: Provides a default sorting order that is easy to implement and use.
- **Built-in**: The natural ordering is part of the class itself, so it is always available and used by default in sorting methods.

@tab Drawbacks:

- **Single Ordering**: Can only define one way to compare objects. If different sorting orders are needed, the class must be modified or additional `Comparator` instances must be used.
- **Class Modification**: Requires altering the class to implement `Comparable`, which might not be feasible if the class is part of a library or if its natural ordering is not clear.

:::

#### Comparator

::: tabs

@tab:active Benefits

- **Flexibility**: Allows for multiple sorting orders and criteria, which can be defined externally and used as needed.
- **Non-invasive**: Does not require modification of the class itself, making it suitable for classes you do not control or when you need different sorting options.

@tab Drawbacks

- **Complexity**: Requires creating and managing multiple `Comparator` instances, which can add complexity to the code.
- **Overhead**: Might introduce additional overhead if many comparators are used, especially if they are created on the fly.

:::

In summary, `Comparable` is best used when a class has a natural ordering that makes sense for most use cases.

`Comparator`, on the other hand, provides flexibility for sorting by multiple criteria and is useful when the class does not have a natural ordering or when different sorting orders are needed.

Choosing between `Comparable` and `Comparator` depends on your specific sorting needs and whether you need a single default order or multiple flexible sorting options.

---

## Wrapping Up

Understanding and utilizing both `Comparable` and `Comparator` can significantly enhance your ability to manage and manipulate object collections in Java. By applying these concepts, you can create more flexible and powerful sorting mechanisms.

To solidify your understanding, try implementing both `Comparable` and `Comparator` in real-world scenarios. Experiment with different classes and sorting criteria to see how each approach works in practice.

### Links to Official Java Documentation:

- [Java Comparable Interface](https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html)
- [Java Comparator Interface](https://docs.oracle.com/javase/8/docs/api/java/util/Comparator.html)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Comparable vs Comparator Interfaces in Java – Which Should You Use and When?",
  "desc": "Sorting is a fundamental operation in programming, essential for organizing data in a specific order. In Java, built-in sorting methods provide efficient ways to sort primitive data types and arrays, making it easy to manage and manipulate collection...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/comparable-vs-comparator-explained-in-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
