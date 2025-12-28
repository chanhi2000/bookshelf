---
lang: en-US
title: "How Java HashMaps Work – Internal Mechanics Explained"
description: "Article(s) > How Java HashMaps Work – Internal Mechanics Explained"
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
      content: "Article(s) > How Java HashMaps Work – Internal Mechanics Explained"
    - property: og:description
      content: "How Java HashMaps Work – Internal Mechanics Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-java-hashmaps-work-internal-mechanics-explained.html
prev: /programming/java/articles/README.md
date: 2024-08-10
isOriginal: false
author:
  - name: Anjan Baradwaj
    url : https://freecodecamp.org/news/author/anjanbaradwaj/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Or_Fa550XaQ/upload/f4d40f1c8e94855d53776a3bb6179673.jpeg
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
  name="How Java HashMaps Work – Internal Mechanics Explained"
  desc="A HashMap is one of the most commonly used data structures in Java, and it's known for its efficiency. Data in a HashMap is stored in the form of key-value pairs. In this article, I will introduce you to HashMaps in Java. We will explore the common o..."
  url="https://freecodecamp.org/news/how-java-hashmaps-work-internal-mechanics-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/Or_Fa550XaQ/upload/f4d40f1c8e94855d53776a3bb6179673.jpeg"/>

A `HashMap` is one of the most commonly used data structures in Java, and it's known for its efficiency. Data in a `HashMap` is stored in the form of key-value pairs.

In this article, I will introduce you to `HashMap`s in Java. We will explore the common operations of `HashMap` and then delve into how it operates internally. You will gain an understanding of the hash function and how index calculation takes place. Finally, we will look at the time complexities of the operations and touch upon the behavior in a concurrent environment.

---

## What is a** `HashMap` in Jav

A `HashMap` implements the `Map` interface, which is part of the Java collection framework. It's based on the concept of Hashing.

Hashing is a technique that transforms an input of arbitrary size into a fixed-size output using a hash function. The generated output is called the hash code and is represented by an integer value in Java. Hash codes are used for efficient lookup and storage operations in a `HashMap`.

---

## Common Operations

Like we discussed above, data in a `HashMap` is stored in the form of key-value pairs. The key is a unique identifier, and each key is associated with a value.

Below are some common operations supported by a `HashMap`. Let's understand what these methods do with some simple code examples:

### Insertion

- This method inserts a new key-value pair to the `HashMap`.
- The insertion order of the key-value pairs is not maintained.
- During insertion, if a key is already present, the existing value will be replaced with the new value that is passed.
- You can insert only one null key into the `HashMap`, but you can have multiple null values.

The method signature for this operation is given below, followed by an example:

```java
public V put(K key, V value)
```

```java
Map<String, Integer> map = new HashMap<>();
map.put("apple", 1);
map.put("banana", 2);
```

In the code above, we have a HashMap example where we add a key of type String and value of type Integer.

### Retrieval

- Fetches the value associated with a given key.
- Returns `null` if the key does not exist in the `HashMap`.

The method signature for this operation is given below, followed by an example:

```java
public V get(Object key)
```

```java
Integer value = map.get("apple"); // returns 1
```

In the code above, we're retrieving the value associated with the key `apple`.

Other common operations include:

- `remove`: Removes the key-value pair for the specified key. It returns `null` if the key is not found.
- `containsKey`: Checks if a specific key is present in the `HashMap`.
- `containsValue`: Checks if the specified value is present in the `HashMap`.

---

## Internal Structure of a** `HashMa

Internally, a `HashMap` uses an array of buckets or bins. Each bucket is a linked list of type `Node`, which is used to represent the key-value pair of the `HashMap`.

```java
static class Node<K, V> {
    final int hash;
    final K key;
    V value;
    Node<K, V> next;

    Node(int hash, K key, V value, Node<K, V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
```

Above, you can see the structure of the `Node` class which is used to store the key-value pairs of the `HashMap`.

The `Node` class has the following fields:

- `hash`: Refers to the `hashCode` of the key.
- `key`: Refers to the key of the key-value pair.
- `value`: Refers to the value associated with the key.
- `next`: Acts as a reference to the next node.

The `HashMap` is fundamentally based on a hash table implementation, and its performance depends on two key parameters: initial capacity and load factor. The [<VPIcon icon="iconfont icon-oracle"/>original javadocs](https://docs.oracle.com/javase/8/docs/api/java/util/Hashtable.html) of the Hash table class define these two parameters as follows:

- The capacity is the number of buckets in the hash table, and the initial capacity is simply the capacity at the time the hash table is created.
- The load factor is a measure of how full the hash table is allowed to get before its capacity is automatically increased.

Let's now try and understand how the basic operations, `put` and `get`, work in a `HashMap`.

### Hash Function

During the insertion (`put`) of a key-value pair, the `HashMap` first calculates the hash code of the key. The hash function then computes an integer for the key. Classes can use the `hashCode` method of the `Object` class or override this method and provide their own implementation. (Read about the hash code contract [<VPIcon icon="iconfont icon-oracle"/>here](https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#hashCode())). The hash code is then XORed (eXclusive OR) with its upper 16 bits (h >>> 16) to achieve a more uniform distribution.

XOR is a bitwise operation that compares two bits, resulting in 1 if the bits are different and 0 if they are the same. In this context, performing a bitwise XOR operation between the hash code and its upper 16 bits (obtained using the unsigned right shift `>>>` operator) helps to mix the bits, leading to a more evenly distributed hash code.

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

Above, you can see the static hash method of the `HashMap` class.

The idea is to have a unique hash code for each key, but the hash function could produce the same hash code for different keys. This leads to a situation known as a collision. We will see how to handle collisions in the next section.

### Index Calculation

Once the hash code for a key is generated, the `HashMap` calculates an index within the array of buckets to determine where the key-value pair will be stored. This is done using a bitwise AND operation, which is an efficient way to calculate the modulo when the array length is a power of two.

```java
int index = (n - 1) & hash;
```

Here, we're calculating the index where n is the length of the bucket array.

Once the index is calculated, the key is then stored at that index in the bucket array. However, if multiple keys end up having the same index, it causes a collision. In such a scenario, the `HashMap` handles it in one of two ways:

- Chaining/Linking: Each bucket in the array is a linked list of nodes. If a key already exists at a particular index and another key gets hashed to the same index, it gets appended to the list.
- Treeify: If the number of nodes exceeds a certain threshold, the linked list is converted into a tree (This was introduced in Java 8).

```java
static final int TREEIFY_THRESHOLD = 8;
```

This is the threshold that determines treeification.

Therefore, it is essential to have a good hash function that uniformly distributes the keys across the buckets and minimizes the chances of collisions.

The retrieval (`get`) and deletion (`remove`) operations work similarly to the insertion (`put`) operation. Here's how:

- Retrieval (`get`): Computes the hash code using the hash function -> calculates the index using the hash code -> traverses the linked list or tree to find the node with the matching key.
- Deletion (`remove`): Computes the hash code using the hash function -> calculates the index using the hash code -> removes the node from the linked list or tree.

### Time Complexity

The basic operations of a `HashMap`, such as `put`, `get`, and `remove`, generally offer constant time performance of O(1), assuming that the keys are uniformly distributed. In cases where there is poor key distribution and many collisions occur, these operations might degrade to a linear time complexity of O(n).

Under treeification, where long chains of collisions are converted into balanced trees, lookup operations can improve to a more efficient logarithmic time complexity of O(log n).

### Synchronization

The `HashMap` implementation is not synchronized. If multiple threads access a HashMap instance concurrently and iterate over the map, and if any one of the threads performs a structural modification (such as adding or removing a key-value mapping) on the map, it leads to a `ConcurrentModificationException`.

To prevent this, you can create a thread-safe instance using the `Collections.synchronizedMap` method.

---

## Conclusion

In summary, understanding the internal workings of a `HashMap` is crucial for developers to make informed decisions. Knowing how a key is mapped, how collisions happen, and how they can be avoided helps you use the `HashMap` efficiently and effectively.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Java HashMaps Work – Internal Mechanics Explained",
  "desc": "A HashMap is one of the most commonly used data structures in Java, and it's known for its efficiency. Data in a HashMap is stored in the form of key-value pairs. In this article, I will introduce you to HashMaps in Java. We will explore the common o...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-java-hashmaps-work-internal-mechanics-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
