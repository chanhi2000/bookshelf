---
lang: en-US
title: "How to Use Generics in Java - Explained with Code Examples"
description: "Article(s) > How to Use Generics in Java - Explained with Code Examples"
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
      content: "Article(s) > How to Use Generics in Java - Explained with Code Examples"
    - property: og:description
      content: "How to Use Generics in Java - Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/generics-in-java.html
prev: /programming/java/articles/README.md
date: 2024-07-13
isOriginal: false
author:
  - name: Anjan Baradwaj
    url : https://freecodecamp.org/news/author/anjanbaradwaj/
cover: https://freecodecamp.org/news/content/images/2024/06/safety.png
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
  name="How to Use Generics in Java - Explained with Code Examples"
  desc="In your Java program, you might have encountered the dreaded ClassCastException at runtime while working with different types of objects such as Integer, String, and so on. This error is mostly caused by casting an object to the wrong data type.  In ..."
  url="https://freecodecamp.org/news/generics-in-java"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/safety.png"/>

In your Java program, you might have encountered the dreaded `ClassCastException` at runtime while working with different types of objects such as Integer, String, and so on. This error is mostly caused by casting an object to the wrong data type.

In this article, you'll learn about generics and see how they can help address this problem.

---

## Why Do We Need Generics?

Let's begin with a simple example. We will first add different types of objects to an `ArrayList`. Next, we will try to retrieve them and print their values.

```java
List list = new ArrayList();

list.add("Hello");

String str = (String) list.get(0);

System.out.println("String: " + str);
```

As you can see, we have added a `String` object to the `ArrayList`. Since we are the ones who have written the code, we know what type of object the element represents, but, the compiler does not know that. So, when we attempt to retrieve the value from the list, we get back an `Object` and we have to perform an explicit casting.

```java
list.add(123);

String number = (String) list.get(1);

System.out.println("Number: " + number);
```

If we add an `Integer` to the same list and try to fetch the value, we will get a `ClassCastException` because an Integer object cannot be cast to a String.

By using Generics, we can solve both problems discussed above. Let's see how.

First, we need to use the diamond operator and narrow the type of object held in this list. We need to mention the object type explicitly within the diamond operator. This will enforce a compile-time check, so you no longer have to perform explicit casting. You will also be able to eliminate the `ClassCastException`.

```java
List<String> list = new ArrayList();

list.add("Hello");

String str = list.get(0); // No need for explicit casting

System.out.println("String: " + str);

list.add(123); // Throws compile-time error
```

---

## Naming Conventions for Type Parameters

In the previous example, you saw that the use of `List<String>` narrowed the type of the object that the list could hold. Check out the following example of a `Box` class and how it works with different types of data.

```java
public class Box<T> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.setValue("Hello, world!");
        System.out.println(stringBox.getValue());

        Box<Integer> integerBox = new Box<>();
        integerBox.setValue(123);
        System.out.println(integerBox.getValue());
    }
}
```

Note how the `Box<T>` class is declared. Here, the `T` is a type parameter, indicating that the `Box` class can work with any object of that type. The same is illustrated in the main method where an instance of `Box<String>` and `Box<Integer>` are both allowed to be created, thus ensuring type safety.

As per the [<VPIcon icon="iconfont icon-oracle"/>official documentation](https://docs.oracle.com/javase/tutorial/java/generics/types.html):

::: info official documentation (<code>docs.oracle.com</code>)

> By convention, type parameter names are single, uppercase letters.
> 
> The most commonly used type parameter names are:
> 
> E - Element (used extensively by the Java Collections Framework)  
> K - Key  
> N - Number  
> T - Type  
> V - Value  
> S,U,V etc. - 2nd, 3rd, 4th types

:::

Let's take a look at how we can write a generic method. Below is the convention:

```java
public static <T> void printArray(T[] inputArr) {
    for (T element : inputArr) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

Here, we take an array of any type and print its elements. Note that you need to specify the generic type parameter `T` in the angle brackets `<>` before the return type of the method. The method body iterates over the array that we have passed as a parameter, of any type `T`, and prints each element.

```java
public static void main(String[] args) {
    // Create different arrays of type Integer, Double and Character
    Integer[] intArr = {1, 2, 3, 4, 5};
    Double[] doubleArr = {1.1, 2.2, 3.3, 4.4, 5.5};
    Character[] charArr = {'H', 'E', 'L', 'L', 'O'};

    System.out.println("Integer array contains:");
    printArray(intArr);   // pass an Integer array

    System.out.println("Double array contains:");
    printArray(doubleArr);   // pass a Double array

    System.out.println("Character array contains:");
    printArray(charArr);   // pass a Character array
}
```

We can call this generic method by passing different types of arrays (`Integer`, `Double`, `Character`) and you will see that your program will print the elements of each of these arrays.

---

## Restrictions on Generics

In Generics, we use bounds to restrict the types that a generic class, interface, or method can accept. There are two types:

### 1. Upper Bounds

This is used to restrict the generic type to an upper limit. To define an upper bound, you use the `extends` keyword. By specifying an upper bound, you ensure that the class, interface, or method accepts the specified type and all of its subclasses.

The syntax would be as follows: `<T extends SuperClass>`.

If you consider the same `Box` class that we used previously, it can be modified as below:

```java
class Box<T extends Number> {
    private T value;

    public void setValue(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
```

In this example, T can be any type that extends `Number`, such as `Integer`, `Double`, or `Float`.

### 2. Lower Bounds

This is used to restrict the generic type to a lower limit. To define a lower bound, you use the `super` keyword. By specifying a lower bound, you ensure that the class, interface, or method accepts the specified type and all of its superclasses.

The syntax would be as follows: `<T super SubClass>`.

To illustrate the use of lower bounds, let us take a look at the following example:

```java
public static void printList(List<? super Integer> list) {
    for (Object element : list) {
        System.out.print(element + " ");
    }
    System.out.println();
}
```

The usage of a lower bound `<? super Integer>` ensures that you can pass the specified type and all of its superclasses, which in this case would be a list of `Integer`, `Number`, or `Object` to the method `printList`.

---

## What are Wildcards?

The `?` that you saw in the previous example is called a Wildcard. You can use them to refer to an unknown type.

You can use a wildcard with an upper bound, in which case it would look something like this: `<? extends Number>`. It can also be used with a lower bound, such as `<? super Integer>`.

---

## Type Erasure

The generic type that we use in our class, interface, or method is only available at compile time and it is removed at run-time. This is done to ensure backward compatibility, as the older versions of Java (before Java 1.5) do not support it.

The compiler makes use of the generic type information that is available to it to ensure type safety. In the process of type erasure:

- If the type is unbounded, then the parameters get replaced with their bounds or `Object` type
- If the type is bounded, then the parameters get replaced by the first bound, and the generic type information will be removed after compilation

If we take a look at the `Box` class example:

```java
public class Box<T> {
    private T value;
    //getters and setters
}
```

The above code will become this:

```java
public class Box {
    private Object value;
    //getters and setters
}
```

## Conclusion

In this article, we explored the concept of generics in Java and how you can use them, with some basic examples. Understanding and using generics enhances type safety in your program. They also eliminate the need for explicit casting and make your code reusable and maintainable.

Let's connect on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`abaradwaj`)](https://linkedin.com/in/abaradwaj/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Generics in Java - Explained with Code Examples",
  "desc": "In your Java program, you might have encountered the dreaded ClassCastException at runtime while working with different types of objects such as Integer, String, and so on. This error is mostly caused by casting an object to the wrong data type.  In ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/generics-in-java.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
