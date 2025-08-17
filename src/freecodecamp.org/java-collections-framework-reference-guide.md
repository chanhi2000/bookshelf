---
lang: en-US
title: "How to Use the Java Collections Framework - A Guide for Developers"
description: "Article(s) > How to Use the Java Collections Framework - A Guide for Developers"
icon: fa-brands fa-java
category:
  - Java
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Java Collections Framework - A Guide for Developers"
    - property: og:description
      content: "How to Use the Java Collections Framework - A Guide for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/java-collections-framework-reference-guide.html
prev: /programming/java/articles/README.md
date: 2025-01-29
isOriginal: false
author:
  - name: Anjan Baradwaj
    url : https://freecodecamp.org/news/author/anjanbaradwaj/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738077724002/cfbf6a90-f9c2-4853-b1c3-c33774f078c1.png
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
  name="How to Use the Java Collections Framework - A Guide for Developers"
  desc="In your Java applications, you’ll typically work with various types of objects. And you might want to perform operations like sorting, searching, and iterating on these objects. Prior to the introduction of the Collections framework in JDK 1.2, you w..."
  url="https://freecodecamp.org/news/java-collections-framework-reference-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738077724002/cfbf6a90-f9c2-4853-b1c3-c33774f078c1.png"/>

In your Java applications, you’ll typically work with various types of objects. And you might want to perform operations like sorting, searching, and iterating on these objects.

Prior to the introduction of the Collections framework in JDK 1.2, you would’ve used Arrays and Vectors to store and manage a group of objects. But they had their own share of drawbacks.

The Java Collections Framework aims to overcome these issues by providing high-performance implementations of common data structures. These allow you to focus on writing the application logic instead of focusing on low-level operations.

Then, the introduction of Generics in JDK 1.5 significantly improved the Java Collections Framework. Generics let you enforce type safety for objects stored in a collection, which enhances the robustness of your applications. You can read more about Java Generics [**here**](/freecodecamp.org/generics-in-java.md).

In this article, I will guide you through how to use the Java Collections Framework. We’ll discuss the different types of collections, such as Lists, Sets, Queues, and Maps. I’ll also provide a brief explanation of their key characteristics such as:

- Internal mechanisms
- Handling of duplicates
- Support for null values
- Ordering
- Synchronization
- Performance
- Key methods
- Common implementations

We’ll also walk through some code examples for better understanding, and I’ll touch on the Collections utility class and its usage.

---

## Understanding the Java Collections Framework

According to the Java [<FontIcon icon="iconfont icon-oracle"/>documentation](https://docs.oracle.com/javase/8/docs/technotes/guides/collections/overview.html), “*A collection is an object that represents a group of objects. A collections framework is a unified architecture for representing and manipulating collections*.”

In simple terms, the Java Collections Framework helps you manage a group of objects and perform operations on them efficiently and in an organized way. It makes it easier to develop applications by offering various methods to handle groups of objects. You can add, remove, search, and sort objects effectively using the Java Collections Framework.

### Collection Interfaces

In Java, an interface specifies a contract that must be fulfilled by any class that implements it. This means the implementing class must provide concrete implementations for all the methods declared in the interface.

In the Java Collections Framework, various collection interfaces like `Set`, `List`, and `Queue` extend the `Collection` interface, and they must adhere to the contract defined by the `Collection` interface.

### Decoding the Java Collections Framework Hierarchy

Check out this neat diagram from this [article (<FontIcon icon="fa-brands fa-medium"/>`@mbanaee61`)](https://medium.com/@mbanaee61/mastering-the-java-collections-framework-hierarchy-with-java-code-and-junit-testing-ab2eb87746ed) that illustrates the Java Collection Hierarchy:

![Diagram showing the Java Collection Framework hierarchy. It includes interfaces like Iterable, Collection, List, Queue, Set, Map, and SortedMap, with classes such as ArrayList, LinkedList, Vector, Stack, PriorityQueue, Deque, HashSet, LinkedHashSet, SortedSet, TreeSet, Hashtable, LinkedHashMap, HashMap, and TreeMap. Arrows indicate implementation and extension relationships.](https://cdn.hashnode.com/res/hashnode/image/upload/v1736532451482/6ef571c1-afe0-4314-9038-b472b06f4065.webp)

We’ll start from the top and work down so you can understand what this diagram is showing:

1. At the root of the Java Collections Framework is the `Iterable` interface, which lets you iterate over the elements of a collection.
2. The `Collection` interface extends the `Iterable` interface. This means it inherits the properties and behavior of the `Iterable` interface and adds its own behavior for adding, removing, and retrieving elements.
3. Specific interfaces such as `List`, `Set`, and `Queue` further extend the `Collection` interface. Each of these interfaces has other classes implementing their methods. For example, `ArrayList` is a popular implementation of the `List` interface, `HashSet` implements the `Set` interface, and so on.
4. The `Map` interface is part of the Java Collections Framework, but it does not extend the `Collection` interface, unlike the others mentioned above.
5. All the interfaces and classes in this framework are part of the `java.util` package.

::: note

A common source of confusion in the Java Collections Framework revolves around the difference between `Collection` and `Collections`. `Collection` is an interface in the framework, while `Collections` is a utility class. The `Collections` class provides static methods that perform operations on the elements of a collection.

:::

---

## Java Collection Interfaces

By now, you’re familiar with the different types of collections that form the foundation of the collections framework. Now we’ll take a closer look at the `List`, `Set`, `Queue`, and `Map` interfaces.

In this section, we'll discuss each of these interfaces while exploring their internal mechanisms. We'll examine how they handle duplicate elements and whether they support the insertion of null values. We'll also understand the ordering of elements during insertion and their support for synchronization, which deals with the concept of thread safety. Then we’ll walk through a few key methods of these interfaces and conclude by reviewing common implementations and their performance for various operations.

Before we begin, let's talk briefly about Synchronization and Performance.

- Synchronization controls access to shared objects by multiple threads, ensuring their integrity and preventing conflicts. This is crucial for maintaining thread safety.
- When choosing a collection type, one important factor is its performance during common operations like insertion, deletion, and retrieval. Performance is usually expressed using Big-O notation. You can learn more about it [**here**](https://freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/).
<!-- TODO: /freecodecamp.org/big-o-notation-why-it-matters-and-why-it-doesnt.md -->

### Lists

A `List` is an ordered or sequential collection of elements. It follows zero-based indexing, allowing the elements to be inserted, removed, or accessed using their index position.

::: tabs

@tab:active 1. Internal mechanism

A `List` is internally supported by either an array or a linked list, depending on the type of implementation. For example, an `ArrayList` uses an array, while a `LinkedList` uses a linked list internally. You can read more about `LinkedList` [**here**](/freecodecamp.org/how-linked-lists-work.md). A `List` dynamically resizes itself upon the addition or removal of elements. The indexing-based retrieval makes it a very efficient type of collection.

@tab 2. Duplicates

Duplicate elements are allowed in a `List`, which means there can be more than one element in a `List` with the same value. Any value can be retrieved based on the 
index at which it is stored.

@tab 3. Null

Null values are also allowed in a `List`. Since duplicates are permitted, you can also have multiple null elements.

@tab 4. Ordering

A `List` maintains insertion order, meaning the elements are stored in the same order they are added. This is helpful when you want to retrieve elements in the exact order they were inserted.

@tab 5. Synchronization

A `List` is not synchronized by default, which means it doesn't have a built-in way to handle access by multiple threads at the same time.

@tab 6. Key methods

Here are some key methods of a `List` interface: `add(E element)`, `get(int index)`, `set(int index, E element)`, `remove(int index)`, and `size()`. Let's look at how to use these methods with an example program.

```java :collapsed-lines title="ListExample.java"
import java.util.ArrayList;
import java.util.List;

public class ListExample {
    public static void main(String[] args) {
        // Create a list
        List<String> list = new ArrayList<>();

        // add(E element)
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // get(int index)
        String secondElement = list.get(1); // "Banana"

        // set(int index, E element)
        list.set(1, "Blueberry");

        // remove(int index)
        list.remove(0); // Removes "Apple"

        // size()
        int size = list.size(); // 2

        // Print the list
        System.out.println(list); // Output: [Blueberry, Cherry]

        // Print the size of the list
        System.out.println(size); // Output: 2
    }
}
```

@tab 7. Common implementations

`ArrayList`, `LinkedList`, `Vector`, `Stack`

@tab 8. Performance

Typically, insert and delete operations are fast in both `ArrayList` and `LinkedList`. But fetching elements can be slow because you have to traverse through the nodes.

| **Operation** | **ArrayList** | **LinkedList** |
| ---: | --- | --- |
| Insertion | Fast at the end - $O\left(1\right)$ amortized, slow at the beginning or middle - $O\left(n\right)$ | Fast at the beginning or middle - $O\left(1\right)$, slow at the end - $O\left(n\right)$ |
| Deletion | Fast at the end - $O\left(1\right)$ amortized, slow at the beginning or middle- $O\left(n\right)$ | Fast - $O\left(1\right)$ if position is known |
| Retrieval | Fast - $O\left(1\right)$ for random access | Slow - $O\left(n\right)$ for random access, as it involves traversing |

:::

### Sets

A `Set` is a type of collection that does not allow duplicate elements and represents the concept of a mathematical set.

::: tabs

@tab:active 1. Internal mechanism

A `Set` is internally backed by a `HashMap`. Depending on the implementation type, it is supported by either a `HashMap`, `LinkedHashMap`, or a `TreeMap`. I have written a detailed article about how `HashMap` works internally [**here**](/freecodecamp.org/how-java-hashmaps-work-internal-mechanics-explained.md). Be sure to check it out.

@tab 2. Duplicates

Since a `Set` represents the concept of a mathematical set, duplicate elements are not allowed. This ensures that all elements are unique, maintaining the integrity of the collection.

@tab 3. Null

A maximum of one null value is allowed in a `Set` because duplicates are not permitted. But this does not apply to the `TreeSet` implementation, where null values are not allowed at all.

@tab 4. Ordering

Ordering of elements in a `Set` depends on the type of implementation.

- `HashSet`: Order is not guaranteed, and elements can be placed in any position.
- `LinkedHashSet`: This implementation maintains the insertion order, so you can retrieve the elements in the same order they were inserted.
- `TreeSet`: Elements are inserted based on their natural order. Alternatively, you can control the insertion order by specifying a custom comparator.

@tab 5. Synchronization

A `Set` is not synchronized, meaning you might encounter concurrency issues, like race conditions, which can affect data integrity if two or more threads try to access a `Set` object simultaneously

@tab 6. Key methods

Here are some key methods of a `Set` interface: `add(E element)`, `remove(Object o)`, `contains(Object o)`, and `size()`. Let's look at how to use these methods with an example program.

```java :collapsed-lines title="SetExample.java"
import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        // Create a set
        Set<String> set = new HashSet<>();

        // Add elements to the set
        set.add("Apple");
        set.add("Banana");
        set.add("Cherry");

        // Remove an element from the set
        set.remove("Banana");

        // Check if the set contains an element
        boolean containsApple = set.contains("Apple");
        System.out.println("Contains Apple: " + containsApple);

        // Get the size of the set
        int size = set.size();
        System.out.println("Size of the set: " + size);
    }
}
```

@tab 7. Common implementations

`HashSet`, `LinkedHashSet`, `TreeSet`

@tab 8. Performance

`Set` implementations offer fast performance for basic operations, except for a `TreeSet`, where the performance can be relatively slower because the internal data structure involves sorting the elements during these operations.

| **Operation** | **HashSet** | **LinkedHashSet** | **TreeSet** |
| ---: | --- | --- | --- |
| Insertion | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |
| Deletion | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |
| Retrieval | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |

:::

### Queues

A `Queue` is a linear collection of elements used to hold multiple items before processing, usually following the FIFO (first-in-first-out) order. This means elements are added at one end and removed from the other, so the first element added to the queue is the first one removed.

::: tabs

@tab:active 1. Internal mechanism

The internal workings of a `Queue` can differ based on its specific implementation.

- `LinkedList` - uses a doubly-linked list to store elements, which means you can traverse both forward and backward, allowing for flexible operations.
- `PriorityQueue` - is internally backed by a binary heap, which is very efficient for retrieval operations.
- `ArrayDeque` - is implemented using an array that expands or shrinks as elements are added or removed. Here, elements can be added or removed from both ends of the queue.

@tab 2. Duplicates

In a `Queue`, duplicate elements are permitted, allowing multiple instances of the same value to be inserted

@tab 3. Null

You cannot insert a null value into a `Queue` because, by design, some methods of a `Queue` return null to indicate that it is empty. To avoid confusion, null values are not allowed.

@tab 4. Ordering

Elements are inserted based on their natural order. Alternatively, you can control the insertion order by specifying a custom comparator.

@tab 5. Synchronization

A `Queue` is not synchronized by default. But, you can use a `ConcurrentLinkedQueue` or a `BlockingQueue` implementation for achieving thread safety.

@tab 6. Key methods

Here are some key methods of a `Queue` interface: `add(E element)`, `offer(E element)`, `poll()`, and `peek()`. Let's look at how to use these methods with an example program.

```java :collapsed-lines title="QueueExample.java"
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
    public static void main(String[] args) {
        // Create a queue using LinkedList
        Queue<String> queue = new LinkedList<>();

        // Use add method to insert elements, throws exception if insertion fails
        queue.add("Element1");
        queue.add("Element2");
        queue.add("Element3");

        // Use offer method to insert elements, returns false if insertion fails
        queue.offer("Element4");

        // Display queue
        System.out.println("Queue: " + queue);

        // Peek at the first element (does not remove it)
        String firstElement = queue.peek();
        System.out.println("Peek: " + firstElement); // outputs "Element1"

        // Poll the first element (retrieves and removes it)
        String polledElement = queue.poll();
        System.out.println("Poll: " + polledElement); // outputs "Element1"

        // Display queue after poll
        System.out.println("Queue after poll: " + queue);
    }
}
```

@tab 7. Common implementations

`LinkedList`, `PriorityQueue`, `ArrayDeque`

@tab 8. Performance

Implementations like `LinkedList` and `ArrayDeque` are usually quick for adding and removing items. The `PriorityQueue` is a bit slower because it inserts items based on the set priority order.

| **Operation** | **LinkedList** | **PriorityQueue** | **ArrayDeque** |
| ---: | --- | --- | --- |
| Insertion | Fast at the beginning or middle - $O\left(1\right)$, slow at the end - $O\left(n\right)$ | Slower - $O\left(\log_{}n\right)$ | Fast - $O\left(1\right)$, Slow - $O\left(n\right)$, if it involves resizing of the internal array |
| Deletion | Fast - $O\left(1\right)$ if position is known | Slower - $O\left(\log_{}n\right)$ | Fast - $O\left(1\right)$, Slow - $O\left(n\right)$, if it involves resizing of the internal array |
| Retrieval | Slow - $O\left(n\right)$ for random access, as it involves traversing | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ |

:::

### Maps

A `Map` represents a collection of key-value pairs, with each key mapping to a single value. Although `Map` is part of the Java Collection framework, it does not extend the `java.util.Collection` interface.

::: tabs

@tab 1. Internal mechanism

A `Map` works internally using a `HashTable` based on the concept of hashing. I have written a detailed [**article**](/freecodecamp.org/how-java-hashmaps-work-internal-mechanics-explained.md) on this topic, so give it a read for a deeper understanding.

@tab 2. Duplicates

A `Map` stores data as key-value pairs. Here, each key is unique, so duplicate keys are not allowed. But duplicate values are permitted.

@tab 3. Null

Since duplicate keys are not allowed, a `Map` can have only one null key. As duplicate values are permitted, it can have multiple null values. In the `TreeMap` implementation, keys cannot be null because it sorts the elements based on the keys. However, null values are allowed.

@tab 4. Ordering

Insertion order of a `Map` varies on the implementation:

- `HashMap` - the insertion order is not guaranteed as they are determined based on the concept of hashing.
- `LinkedHashMap` - the insertion order is preserved and you can retrieve the elements back in the same order that they were added into the collection.
- `TreeMap` - Elements are inserted based on their natural order. Alternatively, you can control the insertion order by specifying a custom comparator.

@tab 5. Synchronization

A `Map` is not synchronized by default. But you can use `Collections.synchronizedMap()` or `ConcurrentHashMap` implementations for achieving thread safety.

@tab 6. Key methods

Here are some key methods of a `Map` interface: `put(K key, V value)`, `get(Object key)`, `remove(Object key)`, `containsKey(Object key)`, and `keySet()`. Let's look at how to use these methods with an example program.

```java :collapsed-lines title="MapMethodsExample.java"
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MapMethodsExample {
    public static void main(String[] args) {
        // Create a new HashMap
        Map<String, Integer> map = new HashMap<>();

        // put(K key, V value) - Inserts key-value pairs into the map
        map.put("Apple", 1);
        map.put("Banana", 2);
        map.put("Orange", 3);

        // get(Object key) - Returns the value associated with the key
        Integer value = map.get("Banana");
        System.out.println("Value for 'Banana': " + value);

        // remove(Object key) - Removes the key-value pair for the specified key
        map.remove("Orange");

        // containsKey(Object key) - Checks if the map contains the specified key
        boolean hasApple = map.containsKey("Apple");
        System.out.println("Contains 'Apple': " + hasApple);

        // keySet() - Returns a set view of the keys contained in the map
        Set<String> keys = map.keySet();
        System.out.println("Keys in map: " + keys);
    }
}
```

@tab 7. Common implementations

`HashMap`, `LinkedHashMap`, `TreeMap`, `Hashtable`, `ConcurrentHashMap`

@tab 8. Performance

`HashMap` implementation is widely used mainly due to its efficient performance characteristics depicted in the below table.

| **Operation** | **HashMap** | **LinkedHashMap** | **TreeMap** |
| ---: | --- | --- | --- |
| Insertion | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |
| Deletion | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |
| Retrieval | Fast - $O\left(1\right)$ | Fast - $O\left(1\right)$ | Slower - $O\left(\log_{}n\right)$ |

:::

---

## Collections Utility Class

As highlighted at the beginning of this article, the `Collections` utility class has several useful static methods that let you perform commonly used operations on the elements of a collection. These methods help you reduce the boilerplate code in your application and lets you focus on the business logic.

Here are some key features and methods, along with what they do, listed briefly:

1. **Sorting:** `Collections.sort(List<T>)` - this method is used to sort the elements of a list in ascending order.
2. **Searching:** `Collections.binarySearch(List<T>, key)` - this method is used to search for a specific element in a sorted list and return its index.
3. **Reverse order:** `Collections.reverse(List<T>)` - this method is used to reverse the order of elements in a list.
4. **Min/Max Operations:** `Collections.min(Collection<T>)` and `Collections.max(Collection<T>)` - these methods are used to find the minimum and maximum elements in a collection, respectively.
5. **Synchronization:** `Collections.synchronizedList(List<T>)` - this method is used to make a list thread-safe by synchronizing it.
6. **Unmodifiable Collections:** `Collections.unmodifiableList(List<T>)` - this method is used to create a read-only view of a list, preventing modifications.

Here's a sample Java program that demonstrates various functionalities of the `Collections` utility class:

```java :collapsed-lines title="CollectionsExample.java"
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        numbers.add(5);
        numbers.add(3);
        numbers.add(8);
        numbers.add(1);

        // Sorting
        Collections.sort(numbers);
        System.out.println("Sorted List: " + numbers);

        // Searching
        int index = Collections.binarySearch(numbers, 3);
        System.out.println("Index of 3: " + index);

        // Reverse Order
        Collections.reverse(numbers);
        System.out.println("Reversed List: " + numbers);

        // Min/Max Operations
        int min = Collections.min(numbers);
        int max = Collections.max(numbers);
        System.out.println("Min: " + min + ", Max: " + max);

        // Synchronization
        List<Integer> synchronizedList = Collections.synchronizedList(numbers);
        System.out.println("Synchronized List: " + synchronizedList);

        // Unmodifiable Collections
        List<Integer> unmodifiableList = Collections.unmodifiableList(numbers);
        System.out.println("Unmodifiable List: " + unmodifiableList);
    }
}
```

This program demonstrates sorting, searching, reversing, finding minimum and maximum values, synchronizing, and creating an unmodifiable list using the `Collections` utility class.

---

## Conclusion

In this article, you’ve learned about the Java Collections Framework and how it helps manage groups of objects in Java applications. We explored various collection types like Lists, Sets, Queues, and Maps and gained insight into some of the key characteristics and how each of these types supports them.

You learned about performance, synchronization, and key methods, gaining valuable insights into choosing the right data structures for your needs.

By understanding these concepts, you can fully utilize the Java Collections Framework, allowing you to write more efficient code and build robust applications.

If you found this article interesting, feel free to check out my other articles on [freeCodeCamp (<FontIcon icon="fa-brands fa-free-code-camp"/>`anjanbaradwaj`)](https://freecodecamp.org/news/author/anjanbaradwaj/) and connect with me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`abaradwaj`)](https://linkedin.com/in/abaradwaj/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Java Collections Framework - A Guide for Developers",
  "desc": "In your Java applications, you’ll typically work with various types of objects. And you might want to perform operations like sorting, searching, and iterating on these objects. Prior to the introduction of the Collections framework in JDK 1.2, you w...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/java-collections-framework-reference-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
