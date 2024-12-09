---
lang: en-US
title: "Java Optionals"
description: "Article(s) > Java Optionals"
icon: fa-brands fa-java
category:
  - Java
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - java
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Java Optionals"
    - property: og:description
      content: "Java Optionals"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/java-optionals.html
prev: /programming/java/articles/README.md
date: 2024-08-30
isOriginal: false
author: Adam Rackis
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3683
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
  name="Java Optionals"
  desc="The post discusses the drawbacks of null references in programming and introduces the Optional type as a solution, particularly in Java. The Optional type helps avoid null reference exceptions by allowing safe interaction with absent values using methods like ifPresent, ifPresentOrElse, map, and flatMap."
  url="https://frontendmasters.com/blog/java-optionals/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3683"/>

There’s an old saying in computer science that null was the “billion dollar mistake.” It’s actually a quote from [<FontIcon icon="fa-brands fa-wikipedia-w"/>Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare), the creator of the null reference.

It’s easy to understand the hate for `null`. We’ve all run into null reference exceptions in just about any language we’ve used. But as annoying as they can be, it’s easy to wonder how they can be avoided. After all, it’s inevitable that sometimes you have a variable pending assignment. If not null, how would the absence of a value be represented in a way that prevents a developer from creating exceptions when interacting with that non-value?

---

## Optionals

This post is about the Optional type, which is a common way programming languages protect developers from null references. The idea is, the optional type gives you a box that can be empty (null) *or* have a value in it. Along with some APIs to safely deal with these possibilities.

This is a concept that exists in many languages. Swift has a particularly elegant implementation, which is integrated into various language-level features. But for this post, we’ll look at Java, which added an Optional type in version 8 of the language. Along the way we’ll run into a few other modern Java features.

---

## The Old Way

Let’s say we have a basic `Person` type:

```java
record Person(String name, int age){}
```

Records were added to Java 14, and are essentially simplified classes for objects which are mainly carriers of data.

Let’s say we want to declare a variable of type `Person`. Normally we’d write:

```java
Person p;
```

Then carefully check for null before referencing any properties.

```java
if (p != null) {
  System.out.println(p.name);
}
```

If you failed to check, you’d be greeted with something like:

```plaintext title="log"
Exception in thread "main" java.lang.NullPointerException: Cannot read field "name" because "p" is null  
	at Main.main(Main.java:13)
```

---

## Your First Optional

To use the Optional type, make sure to do the proper import:

```java
import java.util.Optional;
```

Then declare your variable:

```java
Optional<Person> personMaybe;
```

If you don’t have a value to assign, you can indicate that by assigning `Optional.empty()`

```java
personMaybe = Optional.empty();
```

Or, you can assign an actual value with the `of` static method.

```java
personMaybe = Optional.of(new Person("Mike", 30));
```

If you try to get cute and assign null this way:

```java
personMaybe = Optional.of(null);
```

You’ll be greeted by an error immediately.

```plaintext title="log"
Exception in thread "main" java.lang.NullPointerException
	at java.base/java.util.Objects.requireNonNull(Objects.java:209)
	at java.base/java.util.Optional.of(Optional.java:113)
	at Main.main(Main.java:12)
```

If you truly have a value that might be null, which you want to safely and correctly assign to an optional, you can use the `ofNullable` method:

```java
// where x is of type Person that could be null
personMaybe = Optional.ofNullable(x);
```

---

## Using Your Optional

It’s one thing to have an optional type that can hold a value, but how do you *use* the value? The crudest, most dangerous way to access the value contained in your optional is with the `get` method

```java
System.out.println(personMaybe.get().name);
```

The `get()` method returns the value that’s in the optional if there is one, or if the optional is empty, it will promptly error out.

```plaintext title="log"
Exception in thread "main" java.util.NoSuchElementException: No value present  
	at java.base/java.util.Optional.get(Optional.java:143)  
	at Main.main(Main.java:21)
```

There’s an `isPresent()` you can call, to check for this.

```java
if (personMaybe.isPresent()) {
  System.out.println(personMaybe.get().name);
}
```

Here we’re no better off than we were before. These APIs allow you to (carefully) interact with other APIs that are not coded with Optional types. In general, using `get` should be avoided where possible.

Let’s see some of the better APIs Optional ships with.

---

## Using Optionals Effectively

If we want to use an optional, rather than carefully calling `get` (after verifying there’s a value) we can use the `ifPresent()` method.

```java
personMaybe.ifPresent(p -> System.out.println(p.name));
```

We pass in a lambda expression that will be invoked with the `person` value. If the optional is empty, nothing will be done. If you’d like to also handle the empty use case, we can use `ifPresentOrElse`.

```java
personMaybe.ifPresentOrElse(
  p -> System.out.println(p.name), 
  () -> System.out.println("No person")
);
```

It’s the same as before, except we now provide a lambda for when the optional is empty.

---

## Getting Values from an Optional

Let’s say we want to get a value from an Optional. Let’s first expand our `Person` type just a bit and add a `bestFriend` property of type `Optional<Person>`.

```java
record Person(String name, int age, Optional<Person> bestFriend){}
```

Now let’s say we have a `Person` optional:

```java
personMaybe = Optional.of(new Person("Mike", 30, Optional.empty()));
```

Then let’s say we want to get that person’s name (and we don’t want to assume there’s a value in there). We want to store this as an `Optional<String>`. Obviously we could do something ridiculous like this

```java
Optional<String> personsName = personMaybe.isPresent() 
  ? Optional.of(personMaybe.get().name) 
  : Optional.empty();
```

It should come as no surprise that there’s a more direct API: `map`. The `map` API takes a lambda expression, from which you return whatever you want from the object. The type system will look at what you return and fit that into an Optional of that type. If there’s no value present in the Optional, the lambda will not be called, and you’ll be safely left with `Optional.empty()`

```java
Optional<String> personsName = personMaybe.map(p -> p.name);
```

Since records automatically create getter methods for all properties, the following would also work:

```java
Optional<String> personsName = personMaybe.map(Person::name);
```

The `::` syntax is a method reference, which was added in Java 8. As of version 10 Java supports inferred typings, so you could also write:

```java
var personsName = personMaybe.map(Person::name);
```

The `var` keyword takes the meaning from C#, not JavaScript. It does *not* represent a dynamically typed value. Rather, it’s merely a shortcut where, instead of typing out your type, you can tell the type system to infer the correct type based on what’s on the right hand side of the assignment, and pretend you typed that. Needless to say…

```java
var x;
```

… produces a compiler error of:

```plaintext title="log"
java: cannot infer type for local variable x  
  (cannot use 'var' on variable without initializer)
```

---

## Optionals of Optionals

So far we’ve added the `bestFriend` property to our Person record, which is of type `Optional<Person>`. Let’s put it to good use.

```java
Optional<Person> personsBestFriend = personMaybe.map(p -> p.bestFriend);
```

Rather than use `var`, I explicitly typed out the type, so we’d know immediately what was wrong. IntelliJ highlights this line as an error, and when we hover, we’re greeted by this (surprisingly clear) error message.

```java
Required type: Optional<Person>
Provided: Optional<Optional<Person>>
```

The value we return from the `map` method is placed inside of an optional for us. But, here, the value we return is *already an* optional, so we’re left with an optional of an optional. If we want to “flatten” this optional of an optional into just an optional, we use `flatMap` (just like we use `flatMap` in JavaScript when we want to flatten an array of arrays from `Array.map`).

```java
Optional<Person> personsBestFriend = personMaybe.flatMap(p -> p.bestFriend);
```

We can use this optional now, as we did before.

```java
personsBestFriend.ifPresentOrElse(
  s -> System.out.println(s.name), 
  () -> System.out.println("No person")
);
```

---

## Chaining Things Together

Rather than pulling the name off of the best friend, let’s clean the code above up a bit by extracting the best friend’s name directly, and then using that. Let’s also start to use method references more, to remove some of the bloat

```java
Optional<String> bestFriendsName = personMaybe.flatMap(Person::bestFriend).map(Person::name);
```

We can use this as before:

```java
bestFriendsName.ifPresentOrElse(System.out::println, () -> System.out.println("Nothing"));
```

For one final trick, let’s note that Optionals have an `orElse` method. If you have an `Optional<T>`, `orElse` takes a value (not an optional) of type T. If the optional had a value, that value is returned. If the optional was empty, the value you provided is returned. It’s a good way to convert an optional to a real value, while providing a default value if the optional was empty. Let’s see it in action with the code above, grabbing our person’s best friend’s name (if there is one).

```java
String bestFriendsName = personMaybe
    .flatMap(Person::bestFriend)
    .map(Person::name)
    .orElse("No friend found");
```

and now we can use this string, which is guaranteed to not be null.

```java
System.out.println(bestFriendsName);
```

---

## Wrapping up

I hope you enjoyed this introduction to Java’s Optional type. It’s a great tool to make your code safer and more clear.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Java Optionals",
  "desc": "The post discusses the drawbacks of null references in programming and introduces the Optional type as a solution, particularly in Java. The Optional type helps avoid null reference exceptions by allowing safe interaction with absent values using methods like ifPresent, ifPresentOrElse, map, and flatMap.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/java-optionals.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
