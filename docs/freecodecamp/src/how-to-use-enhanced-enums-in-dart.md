---
lang: en-US
title: "How to Use Enhanced Enums in Dart – Explained With Code Examples"
description: "Article(s) > How to Use Enhanced Enums in Dart – Explained With Code Examples"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Enhanced Enums in Dart – Explained With Code Examples"
    - property: og:description
      content: "How to Use Enhanced Enums in Dart – Explained With Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-enhanced-enums-in-dart.html
prev: /programming/dart/articles/README.md
date: 2024-07-22
isOriginal: false
author:
  - name: Daniel Asaboro
    url: https://freecodecamp.org/news/author/DanielAsaboro/
cover: https://freecodecamp.org/news/content/images/2024/07/CleanShot-2024-07-18-at-21.42.54@2x.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Enhanced Enums in Dart – Explained With Code Examples"
  desc="Enums are one of the most efficient ways to represent a fixed set of values. For example: days of the week, user online status, traffic light states, role hierarchy in an organization, and so on. What's interesting is that most typed languages such a..."
  url="https://freecodecamp.org/news/how-to-use-enhanced-enums-in-dart"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/CleanShot-2024-07-18-at-21.42.54@2x.png"/>

Enums are one of the most efficient ways to represent a fixed set of values. For example: days of the week, user online status, traffic light states, role hierarchy in an organization, and so on.

What's interesting is that most typed languages such as Typescript, Java, C#, and Dart give you additional features such as iterating over the enum's content, and calling you to attention to uncatered or misspelt cases.

However, if this is the only way you're using enums in Dart, you're missing out on a lot of functionality introduced in Dart 2.17 in 2022. So I'll show you how to unlock and leverage these advanced features in this article.

::: info What You Will Learn

This article dives deep into the world of enhanced enums. We'll explore their capabilities, benefits, when to and when not to use them.

By the time you finish reading, I hope you'll gain valuable insights into:

1. Writing clean and expressive code that's almost self-documenting, as the meaning and functionality of each option are readily apparent.
2. Improving code readability and maintainability by keeping related data and behavior together to simplify future modifications and reduce the risk of introducing errors.

:::

::: note Prerequisite: What You Should Already Know

1. **Introductory knowledge of the Dart Language:** Understanding the basics of Dart, including syntax, data types, and control structures.
2. **Basic Understanding of Enums:** Familiarity with what enums are and how they are typically used to represent fixed sets of values.
3. **Object-Oriented Programming (OOP) Concepts:** Knowledge of classes, objects, inheritance, and polymorphism in Dart or another programming language.

That said, lets get into it.

:::

---

## Enhanced Enums: The Game Changer

Say we're building a to-do list app. We might use a traditional enum to represent task priorities:

```dart
enum Priority { low, medium, high }
```

A quick one for those who don't know: They are called enums, because they are short for enumerations.

According to [<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/Enumeration#:~:text=An%20enumeration%20is%20a%20complete,the%20elements%20of%20a%20set.): An enumeration is a complete, ordered listing of all the items in a collection.

Each constant within the enum (low, medium, high, and so on) is implicitly assigned an index starting from zero so they can be iterated through like a list/iterable.

This works well, but it only stores the basic names. What if we want to associate a color with each priority for visual cues, or a description? Or making a specific action to be triggered by each priority? Traditional enums can't handle that.

Let's say you actually do, you'd have to do some complex dance to make it "work".

---

## How to Use Enhanced Enums

They allow you to attach additional information, methods, and properties to each enum option. This means that each value in the enum can have its own unique behavior or data associated with it.

For example, let's say you want to add a shortened abbreviation for each day of the week. Instead of using Extension methods and all, here's how you'd do it with enhanced enums:

```dart
enum Day {
  monday("Mon"),
  tuesday("Tue"),
  wednesday("Wed"),
  thursday("Thu"),
  friday("Fri"),
  saturday("Sat"),
  sunday("Sun");

  const Day(this.abbreviation);

  final String abbreviation;
}
```

Let me explain what's happening above.

Unlike normal enums, enhanced enums have custom constructors and you can pass any value to it as long as it's final. It has to be final because enums don't change.

Here's an example:

```dart
// preceeding code removed for brevity

void main() {
  // Example usage
  Day today = Day.monday;
  print('Today is ${today.name} (${today.abbreviation})'); 
  // Output: Today is monday (Mon)
}
```

You can recreate the enum above this way:

```dart
enum Priority {
  low(color: Color.green),
  medium(color: Color.yellow),
  high(color: Color.red),
  ;

  final Color color;

  const Priority(this.color);
}
```

```dart
Priority highPriority = Priority.high;
print(highPriority.color); // Prints Color.red
```

This makes your code more powerful and expressive as data and behavior are bundled together to keep things organized and easy to understand.

Another example I saw in the wild is from the Flutter team. It was an explanatory video for using Flutter and Dart to build a Game for a Raspberry Pi. It's a simple enum that makes working with GPIO pins smooth, intuitive, and less prone to error.

![Flutter, Dart, and RAspberry Pi video from the Flutter team](https://freecodecamp.org/news/content/images/2024/07/image-46.png)

Here's the code for those interested:

```dart

enum GameHatGPIO {
  SELECT_BUTTON(7, GameControlEvent.SELECT),
  TL_BUTTON(12, GameControlEvent.LEFT_SHOULDER),
  TR_BUTTON(16, GameControlEvent.RIGHT_SHOULDER),
  DPAD_UP_BUTTON(29, GameControlEvent.UP),
  DPAD_DOWN_BUTTON(31, GameControlEvent.DOWN),
  DPAD_LEFT_BUTTON(33, GameControlEvent.LEFT),
  DPAD_RIGHT_BUTTON(35, GameControlEvent.RIGHT),
  B_BUTTON(32, GameControlEvent.B),
  X_BUTTON(36, GameControlEvent.X);

  final int pin;
  final GameControlEvent event;

  const GameHatGPIO(this.pin, this.event);
}
```

Next, let's move on to some advance use cases.

The trick to understanding the section that follows is realizing that enums are literally classes, constant ones (all fields must be final and the constructor must be a constant) – albeit a special one.

What does this mean?

It means most things you can do with a class can be done with an enum. For example, it means you can:

1. Override a custom operator.
2. Add addition methods and properties with an extension.
3. Use them with a mixin, and much more.

Let's talk about some of them in detail.

### 1. Enhanced Enums with a Custom Operator

Let's say you are designing the billing service for a mobile app, and somewhere in the app, you want to have a custom defined enum for months in the year like this:

```dart
enum Month {
  January("Jan"),
  February("Feb"),
  ...,
  December("Dec");

  final String abbreviation;

  const Month(this.abbreviation);
}
```

With enhanced enums, you can overload an operator to change the normal logic of the language. For instance, you can overload the `+` operator to add months to a `Month` enum like this:

```dart :collapsed-lines
enum Month {
  January("Jan"),
  February("Feb"),
  March("Mar"),
  April("Apr"),
  May("May"),
  June("Jun"),
  July("Jul"),
  August("Aug"),
  September("Sep"),
  October("Oct"),
  November("Nov"),
  December("Dec");

  final String abbreviation;

  const Month(this.abbreviation);

    Month operator +(int other) {
    // Ensure the result stays within 0-11 range
    int result = (this.index + other) % 12; 
    return Month.values[result];
  }
}


void main() {
  // Example usage
  Month currentMonth = Month.January;
  Month nextMonth = currentMonth + 1;
  print('Current month: ${currentMonth.name}     (${currentMonth.abbreviation})'); 
  // Output: Current month: January (Jan)
  print('Next month: ${nextMonth.name} (${nextMonth.abbreviation})');     
  // Output: Next month: February (Feb)

}
```

What if you need to compare priority degree so that some tasks are ranked over others in your to-do app? Here's how you'd go about:

```dart :collapsed-lines
enum Priority {
  low,
  medium,
  high,
}

extension PriorityOperations on Priority {
  bool operator <(Priority other) {
    return this.index < other.index;
  }

  bool operator >(Priority other) {
    return this.index > other.index;
  }
}

void main() {
  Priority currentPriority = Priority.medium;
  if (currentPriority > Priority.low) {
    print('Priority is higher than low.');
  }
}
```

What about file permission access to a group of people?

```dart
enum AccessFlag { READ, WRITE, EXECUTE }

extension AccessFlagExtension on AccessFlag {
  AccessFlag operator &(AccessFlag other) {
    return AccessFlag.values[this.index | other.index];
  }
}
```

You get the point, right? Your imagination is really the limit.

### 2. Enhanced Enums with Extensions

Sometimes, a library exposes an enum. You can add your own custom methods:

```dart
enum LogLevel {
  DEBUG("[DEBUG]"),
  INFO("[INFO]"),
  WARN("[WARN]"),
  ERROR("[ERROR]");

  final String label;

  const LogLevel(this.label);
}

extension LogLevelExtension on LogLevel {
  String formattedString(String error) {
    return "${this.label} $error";

  }
}

void main() {
  print(LogLevel.WARN.formattedString("you can't override toString method in an extension")); 
  // Prints "[WARN] you can't override toString method in an extension"
}
```

Another example for a game of cards

```dart
enum PlayingCardSuit { HEARTS, SPADES, DIAMONDS, CLUBS }

extension PlayingCardSuitExtension on PlayingCardSuit {
  bool operator >(PlayingCardSuit other) => 
      this.index > other.index;
  // ... similar overloading for other comparison operators
}

void main() {
  PlayingCardSuit suit1 = PlayingCardSuit.SPADES;
  PlayingCardSuit suit2 = PlayingCardSuit.DIAMONDS;
  print(suit1 > suit2); // Prints true (Spades rank higher than Diamonds)
}
```

### 3. Enhanced Enums with Mixins

If you want shared functionality across enums, you should consider using mixins. This can be particularly useful for common behaviors like serialization or validation.

```dart :collapsed-lines
mixin Loggable {
  String getLogMessage();
}

enum OrderStatus with Loggable {
  CREATED("Order Created"),
  SHIPPED("Order Shipped"),
  DELIVERED("Order Delivered");

  final String message;

  const OrderStatus(this.message);

  @override
  String getLogMessage() => "Order status changed to $message";
}

    //another class can implement this

main(){
    OrderStatus newStatus = OrderStatus.SHIPPED;
    String logMessage = newStatus.getLogMessage();
    print(logMessage); // Output: Order status changed to Shipped
}
```

::: note

Although they can both be used to add functionality to existing classes (including enums), mixins and extensions serve complementary purposes in Dart:

Mixins are used to share functionality among different classes or enums, while extensions are used to add new functionalities to specific existing types.

Both provide ways to enhance code reusability, readability, and maintainability in Dart programming. Mixins can access private members of the class they are mixed into, while extensions cannot access private members of the extended type.

:::

### Not All Constants Have To Be Enums

It's essential to understand that not all constants need to be represented as enums.

Misusing enums can lead to less readable and maintainable code. Enums should be reserved for related, fixed sets of values, ensuring clarity and logical grouping.

For example, this is not a great way to use enums:

```dart
enum Basic {
  font,
  weight,
  size,
}
```

In this case, the `Basic` enum groups together `font`, `weight`, and `size`. While these constants are related in a broad sense, they don't necessarily represent a fixed set of values that benefit from being grouped as an enum.

It's the same situation with the following example:

```dart
enum Colors {
  red,
  blue,
  green,
  hexValue,
}
```

In this case, the `Colors` enum groups together `red`, `blue`, `green`, and `hexValue`.

While `red`, `blue`, and `green` are indeed colors, `hexValue` don't fit well into this set. Using enums inappropriately can lead to confusion and make the code harder to understand and maintain. The best way to use enums is when you have a closed set of related constants that are inherently tied together.

::: tip Bonus Tip to Using Enums:

1. Use PascalCase for enum names and camelCase for enum values.
2. Iterate over enum values using the built-in `values` property.
3. Instance variables must be immutable, including those added by mixins.
4. All generative constructors must be constant.
5. Factory constructors can only return one of the predefined, fixed enum instances.
6. No other class can be inherited from, as an enum is automatically inherited.
7. Overrides for index, hashCode, and the equality operator (==) are not allowed.
8. A member named value cannot be declared in an enum, as it would conflict with the automatically generated static values getter.
9. All instances of the enum must be declared at the start of the declaration, and at least one instance must be declared.
10. Instance methods in an enhanced enum can use `this` to reference the current enum value.

:::

---

## Closing Remark

As I've extensively shown, or hoped to, enhanced enums make your code cleaner and more expressive by allowing us to bundle related data and behavior together. Instead of scattering information about your enum options throughout our code, you can encapsulate it directly within the enum itself.

Typically, a blog post about enums or even Enhanced enums wouldn't be explain everything. It's just about understanding the basics and some extensions.

However, what I find truly interesting is that the concept doesn't fully resonate until you see concrete examples and experiment with them in your own work. And that's precisely what I've aimed to achieve here: to demonstrate the power and flexibility of enhanced enums through practical examples.

It's all limited by your imagination.

### Persisting Enums: Best Practices

A crucial thing I'd like to add is to never persist enums directly to storage. If you need to store enum values in a database or a file, always map and store them as strings. This approach ensures clarity and reduces the risk of mixing things up unintentionally.

When loading the data, you can map the strings back to the corresponding enum values. Avoid using integers for this purpose, as they can easily lead to confusion and errors. Using strings makes your code more robust and easier to maintain, as it directly represents the enum values.

Here's a simple way I deserialize strings to enums in my codebase:

```dart :collapsed-liens
mixin Common {
  bool isActive();
}

enum SubscriptionPlan with Common {
  free("Free Plan"),
  basic("Basic Plan"),
  premium("Premium Plan");

  final String description;

  const SubscriptionPlan(this.description);

  @override
  bool isActive() {
  //custom method here
    return true;
  }


  // use a factory method so you don't have to rely
  // on creating an instance of SubscriptionPlan
  factory SubscriptionPlan.extractFrom(String json) {
    try {
      return SubscriptionPlan.values.byName(json);
    } catch (e, s) {
      // Could even be a custom error
      throw Error.throwWithStackTrace(e, s);
    }
  }
}

void main() {
  // [1] Test cases for extractFrom

    // Should print: SubscriptionPlan.free
  print(SubscriptionPlan.extractFrom('free'));

  // Should print: SubscriptionPlan.basic
  print(SubscriptionPlan.extractFrom('basic')); 

    // Should print: SubscriptionPlan.premium
  print(SubscriptionPlan.extractFrom('premium')); 

  // [2] Test case for an invalid input
  try {

      // Should throw an error
    print(SubscriptionPlan.extractFrom('business')); 
  } catch (e) {
    print(e); // Prints the error
  }
}
```

That's all from me for now.

I hope that reading this article help you improve code readability, and maintain scalable applications. It's all about streamlining your development process afterall.

::: info Credits and Resources

```component VPCard
{
  "title": "What interesting ways do you use Advance Enums in Dart? : r/FlutterDev",
  "desc": "...",
  "link": "https://reddit.com/r/FlutterDev/comments/1e4rnsd/comment/ldktlqn/?context=3",
  "logo": "https://reddit.com/favicon.ico",
  "background": "rgba(174,44,0,0.2)"
}
```

<SiteInfo
  name="Dive into Enums in Dart: from the Basics to Advanced Techniques."
  desc="Want to know more about enums in Dart? This article is for you."
  url="https://blog.stackademic.com/dive-into-enums-in-dart-from-the-basics-to-advanced-techniques-40e13bc3569f/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*PHy3rMit8grpdoTXxC9aaw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*J5SxxvPGOlbp7KnmQW-KrQ.png"/>

```component VPCard
{
  "title": "Use Enum’s with caution",
  "desc": "In C# the class Enum is often used. Some geek's argue that the Enum's ”improve code clarity and and reduce the probability of invalid values. ... Enum's are self-documenting. Enum's should be used with caution, since some things are not straight-forward. The following article will show you where to be cautious. What the MSDN documentation...",
  "link": "https://planetgeek.ch/2009/07/01/enums-are-evil/",
  "logo": "https://planetgeek.ch/favicon.ico",
  "background": "rgba(20,47,93,0.2)"
}
```

<SiteInfo
  name="Enumerated types"
  desc="Learn about the enum type in Dart."
  url="https://dart.dev/language/enums"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Enhanced Enums in Dart – Explained With Code Examples",
  "desc": "Enums are one of the most efficient ways to represent a fixed set of values. For example: days of the week, user online status, traffic light states, role hierarchy in an organization, and so on. What's interesting is that most typed languages such a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-enhanced-enums-in-dart.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
