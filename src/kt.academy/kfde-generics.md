---
lang: en-US
title: "Generics in Kotlin"
description: "Article(s) > Generics in Kotlin"
icon: iconfont icon-kotlin
category:
  - Java
  - Kotlin
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - kotlin
  - generic
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Generics in Kotlin"
    - property: og:description
      content: "Generics in Kotlin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/kfde-generics.html
prev: /programming/java/articles/README.md
date: 2024-03-18
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kotlin_essentials_book/promotion/generics.jpg
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
  name="Generics in Kotlin"
  desc="The essence of how generics work in Kotlin."
  url="https://kt.academy/article/kfde-generics"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kotlin_essentials_book/promotion/generics.jpg"/>

::: note

This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [<VPIcon icon="fas fa-globe"/>LeanPub](https://leanpub.com/effectivekotlin) or [<VPIcon icon="fa-brands fa-amazon"/>Amazon](https://amazon.com/Effective-Kotlin-Best-Practices-Developers-ebook/dp/B0CHBR5XPF/).

:::

In the early days of Java, it was designed such that all lists had the same type `List`, instead of specific lists with specific parameter types, like `List<String>` or `List<Int>`. The `List` type in Java accepts all kinds of values; when you ask for a value at a certain position, the result type is `Object` (which, in Java, is the supertype of all the types).

```java
// Java
List names = new ArrayList();
names.add("Alex");
names.add("Ben");
names.add(123); // this is incorrect, but compiles
for (int i = 0; i < names.size(); i++) {
  String name = (String) names.get(i); // exception at i==2
  System.out.println(name.toUpperCase());
}
```

Such lists are hard to use. We much prefer to have a list with specified types of elements. Only then can we be sure that our list contains elements of the correct type, and only then do we not need to explicitly cast these elements when we get them from a list. This was one of the main reasons Java introduced generics in version 5. In Kotlin, we do not have this problem because it was designed with generics support from the beginning, and all lists are generic, so they must specify what kinds of elements they accept. Generics are an important feature of most modern programming languages; so, in this chapter, we will discuss what they are and how we use them in Kotlin.

In Kotlin, we have three kinds of generic elements:

- generic functions,
- generic classes,
- generic interfaces.

Let's discuss them one by one.

---

## Generic functions

Just as we can pass an argument value to a parameter, we can pass a type as a **type argument**. For this, a function needs to define one or more type parameters inside angle brackets immediately after the `fun` keyword. By convention, type parameter names are capitalized. When a function defines a type parameter, we have to specify the type arguments when calling this function. The type parameter is a placeholder for a concrete type; the type argument is the actual type that is used when a function is called. To specify type arguments explicitly, we also use angle brackets.

```kotlin
fun <T> a() {} // T is type parameter
a<Int>() // Int is used here as a type argument
a<String>() // String is used here as a type argument
```

There is a popular practice that a single type argument is called `T` (from "type"); if there are multiple type arguments, they are called `T` with consecutive numbers. However, this practice is not a fixed rule, and there are many other conventions for naming type parameters.

```kotlin
fun <T> a() {}
fun <T1, T2> b() {}
```

When we call a generic function, all its type arguments must be clear for the Kotlin compiler. We can either specify them explicitly, or their values can be inferred from the compiler.

::: kotlin-playground Generic functions (1)

@file main.kt

```kotlin
fun <T> a() {}
fun <T1, T2> b() {}
fun <T> c(t: T) {}
fun <T1, T2> d(a: T1, b: T2) {}
fun <T> e(): T = TODO()

fun main() {
  // Type arguments specified explicitly
  a<Int>()
  a<String>()
  b<Double, Char>()
  b<Float, Long>()
  
  // Inferred type arguments
  c(10) // The inferred type of T is Int
  d("AAA", 10.0)
  // The inferred type of T1 is String, and of T2 is Double
  val e: Boolean = e() // The inferred type of T is Boolean
}
```

:::

So, how are these type parameters useful? We use them primarily to specify the relationship between the arguments and the result type. For instance, we can express that the result type is the same as an argument type or that we expect two arguments of the same type.

::: kotlin-playground Generic functions (2)

@file main.kt

```kotlin
import kotlin.random.Random

// The result type is the same as the argument type
fun <T> id(value: T): T = value

// The result type is the closest supertype of arguments
fun <T> randomOf(a: T, b: T): T =
  if (Random.nextBoolean()) a else b

fun main() {
  val a = id(10) // Inferred a type is Int
  val b = id("AAA") // Inferred b type is String
  val c = randomOf("A", "B") // Inferred c type is String
  val d = randomOf(1, 1.5) // Inferred d type is Number
}
```

:::

Type parameters for functions are useful for the compiler since they allow it to check and correctly infer types; this makes our programs safer and makes programming more pleasurable for developers. Better parameter types and type suggestions protect us from using illegal operations and let our IDE give us better suggestions.

In the next book, *Functional Kotlin*, you will see plenty of generic function examples, especially for collection processing. Such functions are really important and useful. But, for now, let's get back to the initial motivation for introducing generics: let's talk about generic classes.

---

## Generic classes

We can make classes generic by adding a type parameter after the class name. Such a type parameter can be used all over the class body, especially to specify properties, parameters, and result types. A type parameter is specified when we define an instance, after which it remains unchanged. Thanks to that, when you declare `ValueWithHistory<String>` and then call `setValue` in the example below, you must use an object of type `String`; when you call `currentValue`, the result object will be typed as `String`; and when you call `history`, its result is of type `List<String>`. It’s the same for all other possible type arguments.

::: kotlin-playground Generic classes (1)

@file main.kt

```kotlin
class ValueWithHistory<T>(
  private var value: T
) {
  private var history: List<T> = listOf(value)

  fun setValue(value: T) {
    this.value = value
    this.history += value
  }
  
  fun currentValue(): T = value
  
  fun history(): List<T> = history
}

fun main() {
  val letter = ValueWithHistory<String>("A")
  // The type of letter is ValueWithHistory<String>
  letter.setValue("B")
  // letter.setValue(123) <- this would not compile
  val l = letter.currentValue() // the type of l is String
  println(l) // B
  val h = letter.history() // the type of h is List<String>
  println(h) // \[A, B\]
}
```

:::

The constructor type argument can be inferred. In the above example, we specified it explicitly, but we did not need to. This type can be inferred from the argument type.

```kotlin
val letter = ValueWithHistory("A")
// The type of letter is ValueWithHistory<String>
```

Type arguments can also be inferred from variable types. Let's say that we want to use `Any` as a type argument. We can specify this by specifying the type of variable `letter` as `ValueWithHistory<Any>`.

```kotlin
val letter: ValueWithHistory<Any> = ValueWithHistory("A")
// The type of letter is ValueWithHistory<Any>
```

As I mentioned in the introduction to this chapter, the most important motivation for introducing generics was to make collections with certain types of elements. Consider the `ArrayList` class from the Standard Library (stdlib). It is generic, so when we create an instance from this class we need to specify the types of elements. Thanks to that, Kotlin protects us by expecting only values with accepted types to be added to the list, and Kotlin uses this type when we operate on the elements in the list.

::: kotlin-playground Generic classes (2)

@file main.kt

```kotlin
fun main() {
  val letters = ArrayList<String>()
  letters.add("A") // the argument must be of type String
  letters.add("B") // the argument must be of type String
  // The type of letters is List<String>
  val a = letters\[0\] // the type of a is String
  println(a) // A
  for (l in letters) { // the type of l is String
    println(l) // first A, then B
  }
}

```

:::

---

## Generic classes and nullability

Notice that type arguments can be nullable, so we could create `ValueWithHistory<String?>`. In such a case, the `null` value is a perfectly valid option.

::: kotlin-playground Generic classes and nullability

@file main.kt

```kotlin
fun main() {
  val letter = ValueWithHistory<String?>(null)
  letter.setValue("A")
  letter.setValue(null)
  val l = letter.currentValue() // the type of l is String?
  println(l) // null
  val h = letter.history() // the type of h is List<String?>
  println(h) // \[null, A, null\]
  
  val letters = ArrayList<String?>()
  letters.add("A")
  letters.add(null)
  println(letters) // \[A, null\]
  val l2 = letters\[1\] // the type of l2 is String?
  println(l2) // null
}
```

:::

Another thing is that when you use generic parameters inside classes or functions, you can make them nullable by adding a question mark. See the example below. The type `T` might or might not be nullable, depending on the type argument, but the type `T?` is always nullable. We can assign `null` to variables of the type `T?`. Nullable generic type parameter `T?` must be unpacked before using it as `T`.

```kotlin
class Box<T> {
  var value: T? = null
  
  fun getOrThrow(): T = value!!
}
```

The opposite can also be expressed. Since a generic type parameter might represent a nullable type (you can have `List<Int?>`), we might specify a definitely non-nullable variant of this type by adding `& Any` after the type parameter. In the example below, the method `orThrow` can be invoked on any value, but it unpacks nullable types into non-nullable ones.

```kotlin
fun <T> T.orThrow(): T & Any = this ?: throw Error()

fun main() {
  val a: Int? = if (Random.nextBoolean()) 42 else null
  val b: Int = a.orThrow()
  val c: Int = b.orThrow()
  println(b)
}
```

:::

---

## Generic interfaces

Interfaces can also be generic, which has similar consequences as for classes: the specified type parameters can be used inside the interface body as types for properties, parameters, and result types. A good example is the `List` interface.

```kotlin
interface List<out E> : Collection<E> {
  override val size: Int
  override fun isEmpty(): Boolean
  override fun contains(element: @UnsafeVariance E): Boolean
  override fun iterator(): Iterator<E>
  override fun containsAll(
    elements: Collection<@UnsafeVariance E>
  ): Boolean
  operator fun get(index: Int): E
  fun indexOf(element: @UnsafeVariance E): Int
  fun lastIndexOf(element: @UnsafeVariance E): Int
  fun listIterator(): ListIterator<E>
  fun listIterator(index: Int): ListIterator<E>
  fun subList(fromIndex: Int, toIndex: Int): List<E>
}
```

::: note

The `out` modifier and the `UnsafeVariance` annotation will be explained in the book *Advanced Kotlin*.

:::

![For `List<String>` type, methods like `contains` expect an argument of type `String`, and methods like `get` declare `String` as the result type.](https://marcinmoskala.com/kotlin_essentials_book/manuscript/resources/list_str_suggestions.png&w=1200&q=75)

![For `List<String>`, methods like `filter` can infer `String` as a lambda parameter.](https://marcinmoskala.com/kotlin_essentials_book/manuscript/resources/list_suggestions.png&w=1200&q=75)

Generic interfaces are inherited by classes. Let's say that we have a class `Dog` that inherits from `Consumer<DogFood>`, as shown in the snippet below. The interface `Consumer` expects a method `consume` with the type parameter `T`. This means our `Dog` must override the `consume` method with an argument of type `DogFood`. It must be `DogFood` because we implement the `Consumer<DogFood>` type, and the parameter type in the interface `Consumer` must match the type argument `DogFood`. Now, when you have an instance of `Dog`, you can up-cast it to `Consumer<DogFood>`.

::: kotlin-playground Generic interfaces

@file main.kt

```kotlin
interface Consumer<T> {
  fun consume(value: T)
}
class DogFood

class Dog : Consumer<DogFood> {
  override fun consume(value: DogFood) {
    println("Mlask mlask")
  }
}

fun main() {
  val dog: Dog = Dog()
  val consumer: Consumer<DogFood> = dog
}
```

:::

---

## Type parameters and inheritance

Classes can inherit from open generic classes or implement generic interfaces; however, in both cases they must explicitly specify the type argument. Consider the snippet below. Class `A` inherits from `C<Int>` and implements `I<String>`.

::: kotlin-playground Type parameters and inheritance (1)

@file main.kt

```kotlin
open class C<T>
interface I<T>
class A : C<Int>(), I<String>

fun main() {
  val a = A()
  val c: C<Int> = a
  val i: I<String> = a
}
```

:::

It is actually quite common that a non-generic class inherits from a generic one. Consider `MessageListAdapter` presented below, which inherits from `ArrayAdapter<String>`.

```kotlin title="MessageListAdapter.kt"
class MessageListAdapter(
  context: Context,
  val values: List<ClaimMessage>
) : ArrayAdapter<String>(
  context,
  R.layout.row_messages,
  values.map { it.title }.toTypedArray()
) {
  fun getView(
    position: Int,
    convertView: View?,
    parent: ViewGroup?
  ): View {
     // ...
  }
}
```

An even more common case is when one generic class or interface inherits from another generic class or interface and uses its type parameter as a type argument of the class it inherits from. In the snippet below, the class `A` is generic and uses its type parameter `T` as an argument for both `C` and `I`. This means that if you create `A<Int>`, you will be able to up-cast it to `C<Int>` or `I<Int>`. However, if you create `A<String>`, you will be able to up-cast it to `C<String>` or to `I<String>`.

::: kotlin-playground Type parameters and inheritance (2)

@file main.kt

```kotlin
open class C<T>
interface I<T>
class A<T> : C<T>(), I<T>

fun main() {
 val a: A<Int> = A<Int>()
 val c1: C<Int> = a
 val i1: I<Int> = a

 val a1: A<String> = A<String>()
 val c2: C<String> = a1
 val i2: I<String> = a1
}
```

:::

A good example is the collection hierarchy. An object of type `MutableList<Int>` implements `List<Int>`, which implements `Collection<Int>`, which implements `Iterable<Int>`.

```kotlin
interface Iterable<out T> {
  // ...
}
interface MutableIterable<out T> : Iterable<T> {
  // ...
}
interface Collection<out E> : Iterable<E> {
  // ...
}
interface MutableCollection<E> : Collection<E>,MutableIterable<E>{
  // ...
}
interface List<out E> : Collection<E> {
  // ...
}
interface MutableList<E> : List<E>, MutableCollection<E> {
  // ...
}
```

However, a class does not need to use its type parameter when inheriting from a generic class or implementing a generic interface. Type parameters of parent and child classes are independent of one another and should not be confused, even if they have the same name.

::: kotlin-playground Type parameters and inheritance (3)

@file main.kt

```kotlin
open class C<T>
interface I<T>
class A<T> : C<Int>(), I<String>

fun main() {
  val a1: A<Double> = A<Double>()
  val c1: C<Int> = a1
  val i1: I<String> = a1
}
```

:::

---

## Type erasure

Generic types were added to Java for developers' convenience, but they were never built into the JVM platform. All type arguments are lost when we compile Kotlin to JVM bytecode[^1]. Under the hood, this means that `List<String>` becomes `List`, and `emptyList<Double>` becomes `emptyList`. The process of losing type arguments is known as **type erasure**. Due to this process, type parameters have some limitations compared to regular types. You cannot use them for `is` checks; you cannot reference them[^2]; and you cannot use them as reified type arguments[^3].

```kotlin
import kotlin.reflect.typeOf

fun <T> example(a: Any) {
  val check = a is T // ERROR
  val ref = T::class // ERROR
  val type = typeOf<T>() // ERROR
}
```

However, Kotlin can overcome these limitations thanks to the use of inline functions with reified type arguments. This topic is covered in depth in the chapter *Inline functions* in the book *Functional Kotlin*.

```kotlin
import kotlin.reflect.typeOf

inline fun <reified T> example(a: Any) {
  val check = a is T
  val ref = T::class
  val type = typeOf<T>()
}
```

---

## Generic constraints

An important feature of type parameters is that they can be constrained to be a subtype of a concrete type. We set a constraint by placing a supertype after a colon. For instance, let's say that you implement the `maxOf` function, which returns the biggest of its arguments. To find the biggest one, the arguments need to be comparable. So, next to the type parameter, we can specify that we accept only types that are a subtype of `Comparable<T>`.

::: kotlin-playground Generic constraints (1)

@file main.kt

```kotlin
import java.math.BigDecimal

fun <T : Comparable<T>> maxOf(a: T, b: T): T {
  return if (a >= b) a else b
}

fun main() {
  val m = maxOf(BigDecimal("10.00"), BigDecimal("11.00"))
  println(m) // 11.00
  
  class A
  maxOf(A(), A()) // Compilation error, 
  // A is not Comparable<A>
}
```

:::

Type parameter constraints are also used for generic classes. Consider the `ListAdapter` class below, which expects a type argument that is a subtype of `ItemAdapter`.

```kotlin
class ListAdapter<T : ItemAdapter>(/*...*/) { /*...*/ }
```

An important result of having a constraint is that instances of this type can use all the methods offered by this type. In this way, when `T` is constrained as a subtype of `Iterable<Int>`, we know that we can iterate over an instance of type `T`, and that elements returned by the iterator will be of type `Int`. When we are constrained to `Comparable<T>`, we know that this type can be compared with another instance of the same type. Another popular choice for a constraint is `Any`, which means that a type can be any non-nullable type.

In rare cases in which we might need to set more than one upper bound, we can use `where` to set more constraints. We add it after the class or function name, and we use it to specify more than one generic constraint for a single type.

::: kotlin-playground Generic constraints (2)

@file main.kt

```kotlin
interface Animal {
  fun feed()
}
interface GoodTempered {
  fun pet()
}

fun <T> pet(animal: T) where T : Animal, T : GoodTempered {
  animal.pet()
  animal.feed()
}

class Cookie : Animal, GoodTempered {
  override fun pet() {
    // ...
  }
  override fun feed() {
    // ...
  }
}
class Cujo : Animal {
  override fun feed() {
    // ...
  }
}

fun main() {
  pet(Cookie()) // OK
  pet(Cujo()) //COMPILATION ERROR, Cujo is not GoodTempered
}
```

:::

---

## Star projection

In some cases, we don’t want to specify a concrete type argument for a type. In these scenarios, we can use a star projection `*`, which accepts any type. There are two situations where this is useful. The first is when you check if a variable is a list. In this case, you should use the `is List<*>` check. Star projection should be used in such a case because of type erasure. If you used `List<Int>`, it would be compiled to `List` under the hood anyway. This means a list of strings would pass the `is List<Int>` check. Such a check would be confusing and is illegal in Kotlin. You must use `is List<*>` instead.

::: kotlin-playground Star projection (1)

@file main.kt

```kotlin
fun main() {
  val list = listOf("A", "B")
  println(list is List<*>) // true
  println(list is List<Int>) // Compilation error
}
```

:::

Star projection can also be used for properties or parameters. You can use `List<*>` when you want to express that you want a list, no matter what the type of its elements. When you get elements from such a list, they are of type `Any?`, which is the supertype of all the types.

```kotlin
fun printSize(list: List<*>) {
  println(list.size)
}

fun printList(list: List<*>) {
  for (e in list) { // the type of e is Any?
    println(e)
  }
}
```

Star projection should not be confused with the `Any?` type argument. To see this, let's compare `MutableList<Any?>` and `MutableList<*>`. Both of these types declare `Any?` as generic result types. However, when elements are added, `MutableList<Any?>` accepts anything (`Any?`), but `MutableList<*>` accepts `Nothing`, so it does not accept any values.

::: kotlin-playground Star projection (2)

@file main.kt

```kotlin
fun main() {
  val l1: MutableList<Any?> = mutableListOf("A")
  val r1 = l1.first() // the type of r1 is Any?
  l1.add("B") // the expected argument type is Any?
  
  val l2: MutableList<*> = mutableListOf("A")
  val r2 = l2.first() // the type of r2 is Any?
  l2.add("B") // ERROR,
  // the expected argument type is Nothing,
  // so there is no value that might be used as an argument
}
```

:::

When a star projection is used as an argument, it will be treated as `Any?` in all the out-positions (result types), and it will be treated as `Nothing` in all the in-positions (parameter types).

---

## Underscore operator for type arguments

Type arguments can be either specified explicitly or inferred from the context. However, sometimes we want to specify one type argument and let the compiler infer the other. In such a case, we can use the underscore operator `_` as a type argument. This operator specifies that we want to infer a type argument.

::: kotlin-playground Underscore operator for type arguments

@file main.kt

```kotlin
inline fun <K, reified V> Map<K, *>.filterValueIsInstance(): Map<K, V> =
  filter { it.value is V } as Map<K, V>

fun main() {
  val props = mapOf(
    "name" to "Alex",
    "age" to 25,
    "city" to "New York"
  )
  // One type argument inferred with _, one specified
  val strProps = props.filterValueIsInstance<_, String>()
  println(strProps) // {name=Alex, city=New York}
}
```

:::

---

## Summary

For many developers, generics seem so hard and scary, but they are actually quite simple and intuitive. We can make an element generic by specifying its type parameter (or parameters). Such a type parameter can be used inside this element. This mechanism lets us generalize algorithms and classes so that they can be used with different types. It is good to understand how generics work, which is why this chapter has presented nearly all aspects of this mechanism. However, there are a few more, and we will get back to this topic in the book *Advanced Kotlin*, where we still need to discuss variance modifiers (`out` and `in`).

[^1]: I use JVM as a reference because it is the most popular target for Kotlin, but also because it was the first one, so many Kotlin mechanisms were designed for it. However, regarding a lack of support for type arguments, other platforms are not better. For example, JavaScript does not support types at all.
[^2]: Class and type references are explained in the book *Advanced Kotlin*.
[^3]: Reified type arguments are explained in the book *Functional Kotlin*.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Generics in Kotlin",
  "desc": "The essence of how generics work in Kotlin.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/kfde-generics.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
