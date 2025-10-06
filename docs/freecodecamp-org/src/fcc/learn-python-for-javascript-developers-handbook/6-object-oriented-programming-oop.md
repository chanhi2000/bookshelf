---
lang: en-US
title: "6. Object-Oriented Programming (OOP)"
description: "Article(s) > (6/12) How to Learn Python for JavaScript Developers [Full Handbook]"
category:
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - javascript
  - js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "6. Object-Oriented Programming (OOP)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-python-for-javascript-developers-handbook/6-object-oriented-programming-oop.html
date: 2024-11-22
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Learn Python for JavaScript Developers [Full Handbook]",
  "desc": "As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m...",
  "link": "/freecodecamp.org/learn-python-for-javascript-developers-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Learn Python for JavaScript Developers [Full Handbook]"
  desc="As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m..."
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-6-object-oriented-programming-oop"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Object-Oriented Programming (OOP) allows developers to create reusable and modular code by encapsulating data and behavior into objects. Both Python and JavaScript support OOP, but they implement it differently.

Python uses a class-based model, with clearly defined syntax for attributes and methods. JavaScript traditionally relied on prototype-based inheritance but has introduced class syntax (since ES6) that closely resembles traditional OOP languages, providing familiarity for developers transitioning from Python or Java.

---

## Classes, Inheritance, and Polymorphism

At its core, OOP involves defining **classes** (blueprints for objects), creating **instances** of those classes, and implementing **inheritance** to extend or modify behavior. Both Python and JavaScript support these concepts, albeit with different syntax.

::: tip Example Basic Class Definition

**<FontIcon icon="fa-brands fa-python"/>**

```py
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound."

class Dog(Animal):
    def speak(self):
        return f"{self.name} barks."

# Using the classes
generic_animal = Animal("Generic Animal")
dog = Dog("Buddy")

print(generic_animal.speak())  # Output: Generic Animal makes a sound.
print(dog.speak())             # Output: Buddy barks.
```

**<FontIcon icon="fa-brands fa-js"/>**

```js :collapsed-lines
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a sound.`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} barks.`;
    }
}

// Using the classes
const genericAnimal = new Animal("Generic Animal");
const dog = new Dog("Buddy");

console.log(genericAnimal.speak()); // Output: Generic Animal makes a sound.
console.log(dog.speak());           // Output: Buddy barks.
```

:::

In both examples, you see:

- **Class Definition**: `class` is used in both Python and JavaScript.
- **Inheritance**: The `Dog` class extends the `Animal` class, overriding the `speak` method in both languages.

---

## Differences in Constructors and the `this` vs. `self` Keyword

One key difference in OOP syntax between Python and JavaScript lies in how constructors are defined and how the instance is referenced within a class.

### <FontIcon icon="fa-brands fa-python"/>Constructor and `self`

Python uses `__init__` as a special method to initialize an object. It explicitly requires `self` as the first parameter in all instance methods to refer to the object itself.

::: tip Example:

```py
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"My name is {self.name} and I am {self.age} years old."

person = Person("Alice", 30)
print(person.greet())  # Output: My name is Alice and I am 30 years old.
```

:::

### <FontIcon icon="fa-brands fa-js"/>Constructor and `this`

JavaScript uses a `constructor` method to initialize an object. Inside methods, `this` is used to reference the current instance, but `this` can behave differently depending on the context.

::: tip Example:

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `My name is ${this.name} and I am ${this.age} years old.`;
    }
}

const person = new Person("Alice", 30);
console.log(person.greet()); // Output: My name is Alice and I am 30 years old.
```

:::

::: info Key Differences

1. **Explicit vs. Implicit Instance Reference**: Python always requires `self` explicitly, while JavaScript implicitly uses `this`.
2. **Context Sensitivity**: In JavaScript, `this` can lose its binding in certain contexts (for example, when passing methods as callbacks). Arrow functions provide a way to avoid this issue by binding `this` to the lexical scope.

:::

---

## Polymorphism in Python and JavaScript

Polymorphism allows methods to behave differently depending on the object that calls them. This is a fundamental OOP concept and is supported in both Python and JavaScript.

::: tip <FontIcon icon="fa-brands fa-python"/>

```py
class Bird:
    def fly(self):
        return "Birds can fly."

class Penguin(Bird):
    def fly(self):
        return "Penguins cannot fly."

def get_flight_ability(bird):
    print(bird.fly())

sparrow = Bird()
penguin = Penguin()

get_flight_ability(sparrow)  # Output: Birds can fly.
get_flight_ability(penguin)  # Output: Penguins cannot fly.
```

:::

::: tip <FontIcon icon="fa-brands fa-js"/>

```js
class Bird {
    fly() {
        return "Birds can fly.";
    }
}

class Penguin extends Bird {
    fly() {
        return "Penguins cannot fly.";
    }
}

function getFlightAbility(bird) {
    console.log(bird.fly());
}

const sparrow = new Bird();
const penguin = new Penguin();

getFlightAbility(sparrow);  // Output: Birds can fly.
getFlightAbility(penguin);  // Output: Penguins cannot fly.
```

:::

---

## Prototypes in JavaScript vs. Classes in Python

JavaScript's OOP was initially based on prototypes, where objects could inherit properties and methods directly from other objects. Although ES6 introduced `class`, it is syntactic sugar over JavaScript's prototypal inheritance.

::: tip JavaScript Prototype Example

```js
function Calculator() {}

Calculator.prototype.add = function (a, b) {
    return a + b;
};

Calculator.prototype.multiply = function (a, b) {
    return a * b;
};

const calc = new Calculator();
console.log(calc.add(5, 3));       // Output: 8
console.log(calc.multiply(5, 3));  // Output: 15
```

:::

::: tip Modern JavaScript Class Example

```js
class Calculator {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3));       // Output: 8
console.log(calc.multiply(5, 3));  // Output: 15
```

:::

Python, in contrast, always uses a class-based system for OOP, avoiding the confusion of prototypes.

::: tip Example

```py
class Calculator:
    def add(self, a, b):
        return a + b

    def multiply(self, a, b):
        return a * b

calc = Calculator()
print(calc.add(5, 3))       # Output: 8
print(calc.multiply(5, 3))  # Output: 15
```

:::

::: important Key Takeaways:

- Python’s OOP model is straightforward, using `class`, `__init__` for constructors, and `self` to refer to instance attributes.
- JavaScript has both prototypal and class-based OOP. The modern `class` syntax simplifies prototypal inheritance but can lead to confusion with `this`.
- Both languages support core OOP principles like encapsulation, inheritance, and polymorphism, but Python’s implementation is more explicit and traditional, while JavaScript’s flexibility stems from its prototypal roots.

:::
