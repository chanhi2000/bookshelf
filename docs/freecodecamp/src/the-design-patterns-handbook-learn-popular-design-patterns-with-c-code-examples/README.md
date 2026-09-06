---
lang: en-US
title: "The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples"
description: "Article(s) > The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples"
icon: fas fa-pen-ruler
category:
  - C#
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c#
  - cs
  - csharp
  - dotnet
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples"
    - property: og:description
      content: "The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-design-patterns-handbook-learn-popular-design-patterns-with-c-code-examples/
prev: /academics/system-design/articles/README.md
date: 2026-09-08
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url: https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4b19ec2c-2756-44d4-9a96-a5f196fdaae3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples"
  desc="Design patterns are reusable solutions to common problems in software design. Think of them as blueprints: not finished code, but proven templates you can adapt to solve a specific problem in your own"
  url="https://freecodecamp.org/news/the-design-patterns-handbook-learn-popular-design-patterns-with-c-code-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4b19ec2c-2756-44d4-9a96-a5f196fdaae3.png"/>

Design patterns are **r**eusable solutions to common problems in software design. Think of them as blueprints: not finished code, but proven templates you can adapt to solve a specific problem in your own codebase.

This handbook serves as a practical guide to understanding software design patterns. I wrote it for every developer, regardless of the language you program in. Examples are written in C#, but every concept here applies equally to Python, Java, TypeScript, Go, and beyond.

::: info

The source code lives at [<VPIcon icon="iconfont icon-github"/>`Clifftech123/design-patterns-handbook`](https://github.com/Clifftech123/design-patterns-handbook).

:::

::: note Things to Keep in Mind:

- **Design patterns aren't code.** They're a way of *thinking* about how to structure your code. They're a tool, not a silver bullet, for solving specific design problems.
- **The concepts are universal.** The examples here are written in C#, but the same patterns exist in every language. If you write Python, Java, Go, or TypeScript, you're already using some of these without knowing it.
- **There's no one-size-fits-all pattern.** Each pattern exists to address a particular kind of problem. Understanding *what problem a pattern solves* is more important than memorizing the implementation.

:::

I use C# here as the teaching language because it's clear, readable, and widely understood. The goal of this handbook is for you to walk away understanding the pattern itself, not just the C# code.

There are three main types of design patterns: Creational, Structural, and Behavioral. We'll look at each one in turn here, starting with Creational.

### What We'll Cover:

- [Creational Design Patterns](#heading-creational-design-patterns)
- [Structural Design Patterns](#heading-structural-design-patterns)
- [Behavioral Design Patterns](#heading-behavioral-design-patterns)

---

## Creational Design Patterns

Simply put, Creational patterns are all about **how objects are created**. They can be divided into class-creation patterns, which use inheritance to decide which class to instantiate, and object-creation patterns, which use delegation to get the job done.

Wikipedia describes them as:

::: info "Creational pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"A creational pattern aims to separate a system from how its objects are created, composed, and represented. They increase the system's flexibility in terms of the what, who, how, and when of object creation."*

```component VPCard
{
  "title": "Creational pattern - Wikipedia",
  "desc": "A creational pattern is a software design pattern for creating objects in a manner suitable to a particular situation. As object creation that is otherwise available (i.e. via the programming language) can sometimes result in design limitations, a custom mechanism for creation can provide for better design. A creational pattern aims to s...",
  "link": "https://en.wikipedia.org/wiki/Creational_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

So Creational patterns keep the details of object creation **hidden from the client code**, making the system easier to manage and maintain.

They also abstract away how objects are created, composed, and represented, so the rest of your code doesn't need to care.

There are five Creational design patterns, which we'll go over one by one below:

1. **Singleton**: Ensures a class has only one instance and provides a global point of access to it.
2. **Factory Method**: Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
3. **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
4. **Builder**: Separates the construction of a complex object from its representation, so the same construction process can produce different results.
5. **Prototype**: Creates new objects by cloning an existing instance rather than building one from scratch.

### 1. Singleton Design Pattern

#### Real World Example:

Think of the conductor of an orchestra. An orchestra has one conductor. Every musician on stage looks to that same conductor for direction: when to start, when to stop, how fast to play, and how loud to go.

The conductor is the single point of authority that all musicians connect to and take decisions from. You can't have two conductors standing at the front giving different instructions. That would cause chaos. No matter which musician needs guidance, they all reach the same one person.

That's exactly how the Singleton works in code: one instance, shared by everyone who needs it, making decisions from one place.

#### Problems it solves:

- What if two musicians get different conductors giving different instructions? The performance falls apart. There must be one conductor that every musician looks to, without exception.
- How does a musician find the conductor? They don't go searching. There's one well-known place everyone looks, and the same conductor is always there.
- What stops someone from appointing a second conductor? The orchestra itself controls this. Once a conductor is on the podium, no second one can take it.

In simple terms, there's only one instance of the class, and every part of the system that needs it gets access to that exact same instance (never a new one).

Here's how Wikipedia describes the Singleton pattern:

::: info "Singleton pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In object-oriented programming, the singleton pattern is a software design pattern that restricts the instantiation of a class to a singular instance. The pattern is useful when exactly one object is needed to coordinate actions across a system."

<SiteInfo
  name="Singleton pattern - Wikipedia"
  desc="A creational pattern is a software design pattern for creating objects in a manner suitable to a particular situation. As object creation that is otherwise available (i.e. via the programming language) can sometimes result in design limitations, a custom mechanism for creation can provide for better design. A creational pattern aims to separate a system from how its objects are created, composed, and represented. They increase the system's flexibility in terms of the what, who, how, and when of object creation."
  url="https://en.wikipedia.org/wiki/Singleton_pattern"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Singleton_UML_class_diagram.svg/1280px-Singleton_UML_class_diagram.svg.png"/>

:::

::: tip Programming Example

We'll model the analogy directly now. The `OrchestraConductor` is the Singleton: one instance, shared by all musicians, making all decisions.

```cs
public class OrchestraConductor
{
    // Step 1: Hold the one instance here
    private static OrchestraConductor _instance;

    // Step 2: Private constructor - nobody outside can do: new OrchestraConductor()
    private OrchestraConductor() { }

    // Step 3: The only way to get the conductor
    public static OrchestraConductor GetInstance()
    {
        if (_instance == null)
        {
            _instance = new OrchestraConductor();
        }

        return _instance;
    }

    // Decisions the conductor makes
    public void Start()                    => Console.WriteLine("Conductor: Begin playing.");
    public void Stop()                     => Console.WriteLine("Conductor: Stop playing.");
    public void SetTempo(string tempo)     => Console.WriteLine($"Conductor: Tempo is now {tempo}.");
}
```

Now let's see it in action:

```cs
// Violinist asks for the conductor
OrchestraConductor violinist = OrchestraConductor.GetInstance();

// Pianist asks for the conductor
OrchestraConductor pianist = OrchestraConductor.GetInstance();

// Are they talking to the same conductor?
Console.WriteLine(object.ReferenceEquals(violinist, pianist)); // True

violinist.SetTempo("Allegro");
pianist.Start();
// 
// True
// Conductor: Tempo is now Allegro.
// Conductor: Begin playing.
```

Both musicians got the **same conductor**. The constructor never ran twice. That is the Singleton pattern.

:::

#### When to Use the Singleton Pattern

Reach for Singleton when you need one shared resource that the whole application talks to, such as a logger, a configuration manager, or a database connection pool.

It's also a good idea when having more than one instance would cause incorrect behaviour or conflicting state.

And it's helpful when you want a global point of access to an object without passing it around everywhere.

### 2. The Factory Method

Think of a recruitment agency. A company calls the agency and says "we need a worker." The company doesn't go out and create the worker themselves. They just make the request.

The agency decides which specific person to send: a developer, a designer, or a tester, depending on what the company needs. The company doesn't know or care exactly who is coming. They just know the person will be able to do the job.

That's the Factory Method. Your code asks for an object. The Factory decides which specific type to create and hands it back. You work with it without needing to know exactly what it is under the hood.

#### Problems it solves:

- The company shouldn't need to know who they're getting. They just need someone who can do the job. The agency handles the decision of whom to send. The company never has to worry about the details.
- What if the company needs a different type of worker tomorrow? They call the same agency. The agency decides. The company's process doesn't change, only the agency's decision does.
- What if a new type of worker needs to be introduced? A new specialist agency is created to handle that. Everything else stays exactly the same.

In simple terms, we define an interface for creating an object, but let subclasses decide which class to instantiate. The factory method lets a class defer instantiation to subclasses.

Wikipedia describes it like this:

::: info "Factory method pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In object-oriented programming, the factory method pattern is a design pattern that uses factory methods to deal with the problem of creating objects without having to specify their exact classes. Factory methods can be specified in an interface and implemented by subclasses, or implemented in a base class and optionally overridden by subclasses."

```component VPCard
{
  "title": "Factory method pattern - Wikipedia",
  "desc": "In object-oriented programming, the factory method pattern is a design pattern that uses factory methods to deal with the problem of creating objects without having to specify their exact classes. Rather than by calling a constructor, this is accomplished by invoking a factory method to create an object. Factory methods can be specified in an interface and implemented by subclasses or implemented in a base class and optionally overridden by subclasses. It is one of the 23 classic design patterns described in the book Design Patterns and is subcategorized as a creational pattern.",
  "link": "https://en.wikipedia.org/wiki/Factory_method_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The agency is the factory. The worker types are the products. The company is the client.

```cs :collapsed-lines
// The worker interface - all workers can do a job
public interface IWorker
{
    void DoWork();
}

// The concrete workers
public class Developer : IWorker
{
    public void DoWork() => Console.WriteLine("Developer: Writing code.");
}

public class Designer : IWorker
{
    public void DoWork() => Console.WriteLine("Designer: Creating designs.");
}

// The base agency - declares the factory method
public abstract class RecruitmentAgency
{
    // This is the Factory Method - subclasses decide who to hire
    public abstract IWorker HireWorker();
}

// Concrete agencies - each one decides which worker to send
public class TechAgency : RecruitmentAgency
{
    public override IWorker HireWorker() => new Developer();
}

public class DesignAgency : RecruitmentAgency
{
    public override IWorker HireWorker() => new Designer();
}
```

Now let's see it in action:

```cs
// Company A needs a tech worker
RecruitmentAgency agency = new TechAgency();
IWorker worker = agency.HireWorker();
worker.DoWork();

// Company B needs a design worker
RecruitmentAgency agency2 = new DesignAgency();
IWorker worker2 = agency2.HireWorker();
worker2.DoWork();
// 
// Developer: Writing code.
// Designer: Creating designs.
```

The company never used `new Developer()` or `new Designer()` directly. The agency made that decision. That is the Factory Method.

:::

### 3. The Abstract Factory Design Pattern

#### Real World Example

Think of a furniture store that sells collections. You walk in and choose a style: Modern or Victorian. Once you choose, everything you get comes from that same collection. The sofa, the chair, and the coffee table all match. The store ensures that you never walk out with a modern sofa paired with a Victorian chair. You don't pick individual pieces and hope they go together. The collection guarantees they will.

That's the Abstract Factory. You choose a family, and the Factory produces every object you need from that same family. Everything it gives you is guaranteed to work together.

#### Problems it solves:

- What if a customer mixes furniture from different collections? The room looks inconsistent. The store solves this by grouping everything into collections. You pick one collection and everything comes from it.
- What if the store wants to introduce a new collection? They create a new collection set. Every existing collection stays untouched. The customer's experience doesn't change, only the options grow.
- What if different stores carry different collections? Each store is its own factory. A customer walks into any store and follows the same process. The store handles which specific pieces to provide.

In simple terms, you provide an interface for creating families of related objects, without specifying their concrete classes.

Wikipedia describes it like this:

::: info "Abstract factory pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The abstract factory pattern provides a way to create families of related objects without imposing their concrete classes, by encapsulating a group of individual factories that have a common theme without specifying their concrete classes."*

<SiteInfo
  name="Abstract factory pattern - Wikipedia"
  desc="The abstract factory pattern in software engineering is a design pattern that provides a way to create families of related objects without imposing their concrete classes, by encapsulating a group of individual factories that have a common theme without specifying their concrete classes. According to this pattern, a client software component creates a concrete implementation of the abstract factory and then uses the generic interface of ..."
  url="https://en.wikipedia.org/wiki/Abstract_factory_pattern"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Abstract_factory_UML.svg/1280px-Abstract_factory_UML.svg.png"/>

:::

::: tip Programming Example

The furniture store is the abstract factory. Modern and Victorian are the concrete factories. Sofa and Chair are the products.

```cs :collapsed-lines
// The product interfaces - every furniture type has a contract
public interface ISofa  { void Describe(); }
public interface IChair { void Describe(); }

// Modern collection
public class ModernSofa : ISofa
{
    public void Describe() => Console.WriteLine("Sofa: Sleek modern design.");
}

public class ModernChair : IChair
{
    public void Describe() => Console.WriteLine("Chair: Minimalist modern style.");
}

// Victorian collection
public class VictorianSofa : ISofa
{
    public void Describe() => Console.WriteLine("Sofa: Ornate Victorian design.");
}

public class VictorianChair : IChair
{
    public void Describe() => Console.WriteLine("Chair: Classic Victorian style.");
}

// The abstract factory - every store can produce a sofa and a chair
public interface IFurnitureFactory
{
    ISofa  CreateSofa();
    IChair CreateChair();
}
// Concrete factories - each one produces its own collection
public class ModernFurnitureFactory : IFurnitureFactory
{
    public ISofa  CreateSofa()  => new ModernSofa();
    public IChair CreateChair() => new ModernChair();
}

public class VictorianFurnitureFactory : IFurnitureFactory
{
    public ISofa  CreateSofa()  => new VictorianSofa();
    public IChair CreateChair() => new VictorianChair();
}
```

Now let's see it in action:

```cs
// Customer orders a Modern collection
IFurnitureFactory factory = new ModernFurnitureFactory();
ISofa  sofa  = factory.CreateSofa();
IChair chair = factory.CreateChair();
sofa.Describe();
chair.Describe();

// Customer orders a Victorian collection
IFurnitureFactory factory2 = new VictorianFurnitureFactory();
ISofa  sofa2  = factory2.CreateSofa();
IChair chair2 = factory2.CreateChair();
sofa2.Describe();
chair2.Describe();
//
// Sofa: Sleek modern design.
// Chair: Minimalist modern style.
// Sofa: Ornate Victorian design.
// Chair: Classic Victorian style.
```

Every piece came from the same collection. The client never used `new ModernSofa()` or `new VictorianChair()` directly. The factory kept the family together. That's the Abstract Factory.

:::

#### When to Use Abstract Factory:

Use the Abstract Factory pattern when your system needs to work with multiple families of related objects and you need to ensure they're always used together.

It also works well when you want to swap out an entire family of objects in one place without touching the rest of your code.

And it's a good choice when you want to enforce consistency across related objects, so nothing from one family gets accidentally mixed with another.

### 4. The Builder Design Pattern

#### Real World Example

Think of a tailor making a suit. Every customer that walks in goes through the same process: take measurements, choose the fabric, select the lining, pick the buttons, and decide on the lapel style.

The tailor follows those same steps for every order. But the finished suit is completely unique to each customer. A businessman walks out with a sharp formal suit. A wedding guest walks out with something entirely different. Same process, same tailor, but with different result every time.

That's the Builder. The construction process stays the same. What changes are the choices made at each step.

#### Problems it solves:

- What if a suit had to be assembled all at once with no steps? You would have to know every detail upfront and get it all right in one go. The tailor breaks it down into steps so each decision is made clearly, one at a time.
- What if two customers want completely different suits but go through the same tailor? The tailor follows the same process for both. The steps don't change, only the choices within each step.
- What if a new suit style needs to be introduced? A new set of choices is defined for that style. The tailoring process itself stays untouched.

In simple terms, you separate the construction of a complex object from its representation, so that the same construction process can create different results.

Wikipedia describes it like this:

::: info "Builder pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The Builder pattern separates the construction of a complex object from its representation so that the same construction process can create different representations."*

```component VPCard
{
  "title": "Builder pattern - Wikipedia",
  "desc": "The builder pattern is a design pattern that provides a flexible solution to various object creation problems in object-oriented programming. The builder pattern separates the construction of a complex object from its representation. It is one of the 23 classic design patterns described in the book Design Patterns and is sub-categorized as a creational pattern.",
  "link": "https://en.wikipedia.org/wiki/Builder_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The tailor is the director. The suit is the product. The builder handles the step-by-step construction.

```cs :collapsed-lines
// The product
public class Suit
{
    public string Fabric  { get; set; }
    public string Lining  { get; set; }
    public string Buttons { get; set; }

    public void Describe()
    {
        Console.WriteLine($"Suit: {Fabric} fabric, {Lining} lining, {Buttons} buttons.");
    }
}

// The builder - defines the steps
public interface ISuitBuilder
{
    void SetFabric();
    void SetLining();
    void SetButtons();
    Suit GetSuit();
}

// Business suit builder
public class BusinessSuitBuilder : ISuitBuilder
{
    private Suit _suit = new Suit();

    public void SetFabric()  => _suit.Fabric  = "Dark wool";
    public void SetLining()  => _suit.Lining  = "Silk";
    public void SetButtons() => _suit.Buttons = "Black horn";
    public Suit GetSuit()    => _suit;
}

// Wedding suit builder
public class WeddingSuitBuilder : ISuitBuilder
{
    private Suit _suit = new Suit();

    public void SetFabric()  => _suit.Fabric  = "Ivory linen";
    public void SetLining()  => _suit.Lining  = "Satin";
    public void SetButtons() => _suit.Buttons = "Pearl";
    public Suit GetSuit()    => _suit;
}

// The tailor - the director who runs the process
public class Tailor
{
    public Suit MakeSuit(ISuitBuilder builder)
    {
        builder.SetFabric();
        builder.SetLining();
        builder.SetButtons();
        return builder.GetSuit();
    }
}
```

Now let's see it in action:

```cs
Tailor tailor = new Tailor();

Suit businessSuit = tailor.MakeSuit(new BusinessSuitBuilder());
businessSuit.Describe();

Suit weddingSuit = tailor.MakeSuit(new WeddingSuitBuilder());
weddingSuit.Describe();
//
// Suit: Dark wool fabric, Silk lining, Black horn buttons.
// Suit: Ivory linen fabric, Satin lining, Pearl buttons.
```

The same tailor, following the same process, creates two completely different suits. That is the Builder.

#### When to Use the Builder Design Pattern

Use the Builder pattern when an object has many parts or configurations and building it all at once would be confusing.

It's also a good choice when you want the same construction process to produce different results depending on the choices made at each step.

And reach for it when you want to keep the construction logic separate from the object itself, so each can change independently.

### 5. The Prototype Design Pattern

#### Real World Example

Imagine you're building a drawing application. Users can create shapes like circles, rectangles, or triangles, each with its own colour, size, and position.

Now imagine the user wants ten red circles of the same size placed across the canvas. Creating each one from scratch means repeating the same setup ten times. What if the shape is complex, with many configured properties? That becomes expensive and repetitive.

The Prototype pattern solves this by letting you take one fully configured shape and clone it. The clone starts as an exact copy. The user then moves it, recolours it, or resizes it independently. The original shape is never touched. This also means new shape types can be added at runtime without the application needing to know about them in advance.

#### Problems it solves:

- Creating a new shape from scratch every time is expensive. If a shape has many properties, setting them all up repeatedly wastes resources. Cloning an already configured object is far cheaper.
- The application shouldn't need to know the exact type of shape it's copying. At runtime, shapes can be added or removed dynamically. The app just calls clone and gets back a ready object, whatever type it happens to be.
- Modifying a copy should never affect the original. Each cloned shape is fully independent. Changes to the copy stay with the copy.

In simple terms, you can create new objects by copying an existing one. The copy starts identical to the original and can then be changed independently.

Wikipedia describes it like this:

::: info *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The Prototype pattern is used when the type of objects to create is determined by a prototypical instance, which is cloned to produce new objects."*

```component VPCard
{
  "title": "Prototype pattern - Wikipedia",
  "desc": "The prototype pattern is a creational design pattern in software development. It is used when the types of objects to create is determined by a prototypical instance, which is cloned to produce new objects. This pattern is used to avoid subclasses of an object creator in the client application, like the factory method pattern does, and to avoid the inherent cost of creating a new object in the standard way (e.g., using the 'new' keyword) when it is prohibitively expensive for a given application.",
  "link": "https://en.wikipedia.org/wiki/Prototype_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

Every shape knows how to clone itself. The application never calls `new Circle()` or `new Rectangle()` directly at runtime. It clones what already exists.

```cs
// The prototype interface - every shape must be able to clone itself
public abstract class Shape
{
    public string Colour { get; set; }
    public int    Size   { get; set; }

    public abstract Shape Clone();
    public abstract void  Describe();
}

// Concrete shapes
public class Circle : Shape
{
    public override Shape Clone()    => (Shape)this.MemberwiseClone();
    public override void  Describe() => Console.WriteLine($"Circle  | Colour: {Colour} | Size: {Size}");
}

public class Rectangle : Shape
{
    public override Shape Clone()    => (Shape)this.MemberwiseClone();
    public override void  Describe() => Console.WriteLine($"Rectangle | Colour: {Colour} | Size: {Size}");
}
```

Now let's see it in action:

```cs
// Create one configured circle
Circle original = new Circle { Colour = "Red", Size = 50 };

// Clone it instead of building from scratch
Shape clone1 = original.Clone();
Shape clone2 = original.Clone();

// Modify the clones independently
clone2.Colour = "Blue";

original.Describe();
clone1.Describe();
clone2.Describe();
//
// Circle  | Colour: Red  | Size: 50
// Circle  | Colour: Red  | Size: 50
// Circle  | Colour: Blue | Size: 50
```

`clone2` changed to blue. The original stayed red. Each object is fully independent. That's the Prototype.

#### When to Use the Prototype Design Pattern:

Use Prototype when creating a new object from scratch is expensive or complex and an existing object already has everything configured.

It's also helpful when the application needs to create objects at runtime without knowing their exact type in advance.

And it's great when you need many variations of an object and want to start from a known good state rather than rebuild every time.

---

## Structural Design Patterns

Simply put, structural patterns are all about **how classes and objects are composed to form larger structures**. They use inheritance and composition to let you build flexible, efficient structures without having to rewrite everything from scratch.

Wikipedia describes them as:

::: info "Structural pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In software engineering, structural patterns are design patterns that ease the design by identifying a simple way to realize relationships among entities."*

```component VPCard
{
  "title": "Structural pattern - Wikipedia",
  "desc": "A structural pattern is a software design pattern that encapsulates relationships between entities.",
  "link": "https://en.wikipedia.org/wiki/Structural_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Structural design patterns describe how objects and classes are combined to form **larger, more complex structures** while keeping those structures flexible and efficient.

They focus on composition over inheritance: how you connect things, not just what things are.

There are seven Structural design patterns:

1. **Adapter**: Converts one interface into another that a client expects, letting incompatible interfaces work together.
2. **Bridge**: Decouples an abstraction from its implementation so the two can vary independently.
3. **Composite**: Composes objects into tree structures to represent part-whole hierarchies, letting clients treat individual objects and compositions uniformly.
4. **Decorator**: Attaches additional responsibilities to an object dynamically, as a flexible alternative to subclassing.
5. **Facade**: Provides a simplified, unified interface to a complex subsystem.
6. **Flyweight**: Uses sharing to efficiently support a large number of fine-grained objects.
7. **Proxy**: Provides a surrogate or placeholder for another object to control access to it.

### 1. The Adapter Design Pattern

#### Real World Example

Think of a language translator at a business meeting. A British CEO needs to address a Japanese team. The CEO speaks only English. The team speaks only Japanese. A translator sits between them, converting every English sentence into Japanese and delivering it to the team. Both sides keep speaking their own language. Neither the CEO nor the team change anything about how they communicate. The translator makes them compatible.

That's the Adapter. The client speaks one interface, while the other side speaks a different one. The Adapter sits between them and makes both sides work together without either having to change.

#### Problems it solves:

- The CEO can't speak Japanese, and the team can't speak English. They're incompatible. The translator adapts one to the other without changing either side.
- What if the CEO now needs to address a French team? A French translator is brought in. The CEO's process doesn't change. Only the translator changes.
- What if an existing class has a useful method but the wrong interface? You wrap it in an adapter. The rest of the system talks to the adapter while the existing class stays untouched.

In simple terms, you wrap an existing class with a new interface so the client can use it without any changes to either side.

Wikipedia describes it like this:

::: info "Adapter pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In software engineering, the adapter pattern is a software design pattern (also known as wrapper) that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code."*

```component VPCard
{
  "title": "Adapter pattern - Wikipedia",
  "desc": "In software engineering, the adapter pattern is a software design pattern (also known as wrapper, an alternative naming shared with the decorator pattern) that allows the interface of an existing class to be used as another interface.  It is often used to make existing classes work with others without modifying their source code. An example is an adapter that converts the interface of a Document Object Model of an XML document into a tree structure that can be displayed.",
  "link": "https://en.wikipedia.org/wiki/Adapter_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The CEO is the client and the Japanese team member is the adaptee. They're useful, but they speak the wrong interface. The Translator is the adapter.

```cs
// What the CEO expects, someone who can receive a message in English
public interface IEnglishSpeaker
{
    void Speak(string message);
}

// The Japanese team member, speaks only Japanese (the adaptee)
public class JapaneseTeamMember
{
    public void SpeakJapanese(string message)
    {
        Console.WriteLine($"Team member (Japanese): {message}");
    }
}

// The Translator, adapts the Japanese speaker to the English interface
public class Translator : IEnglishSpeaker
{
    private readonly JapaneseTeamMember _teamMember;

    public Translator(JapaneseTeamMember teamMember)
    {
        _teamMember = teamMember;
    }

    public void Speak(string message)
    {
        string translated = TranslateToJapanese(message);
        _teamMember.SpeakJapanese(translated);
    }

    private string TranslateToJapanese(string english) => english switch
    {
        "Good morning, team."         => "おはようございます、チームの皆さん。",
        "Please review the proposal." => "提案書を確認してください。",
        _                             => $"[Japanese: {english}]"
    };
}

// The CEO, only knows how to talk to an IEnglishSpeaker
public class CEO
{
    private readonly IEnglishSpeaker _speaker;

    public CEO(IEnglishSpeaker speaker)
    {
        _speaker = speaker;
    }

    public void Address(string message)
    {
        Console.WriteLine($"CEO (English): {message}");
        _speaker.Speak(message);
    }
}
```

Now let's see it in action:

```cs
JapaneseTeamMember teamMember = new JapaneseTeamMember();
IEnglishSpeaker translator    = new Translator(teamMember);
CEO ceo = new CEO(translator);

ceo.Address("Good morning, team.");
ceo.Address("Please review the proposal.");
//
// CEO (English): Good morning, team.
// Team member (Japanese): おはようございます、チームの皆さん。
// CEO (English): Please review the proposal.
// Team member (Japanese): 提案書を確認してください。
```

The CEO never knew about `JapaneseTeamMember`. The team never knew about the CEO's interface. The `Translator` made both sides work together without touching either. That's the Adapter.

:::

#### When to Use it

Use Adapter when you want to use an existing class but its interface doesn't match what your code expects.

It's also helpful when you want to create a reusable class that cooperates with classes that don't have compatible interfaces.

And reach for it when you need to integrate a third-party library or legacy code without modifying it.

### 2. The Bridge Design Pattern

#### Real World Example

Think of a TV remote control and a television. The remote is one thing and the TV is another. You can have a basic remote or a smart remote. You can have a Sony TV or a Samsung TV. Any remote works with any TV you're not locked in. Buy a new Samsung TV, and your old remote still works. Buy a smart universal remote, and it works with every TV you own. Neither side needs to know the inner details of the other.

That's the Bridge. The abstraction (remote) and the implementation (TV) are two separate hierarchies that can grow and change completely independently of each other.

#### Problems it solves:

- What if every remote was hardwired to one specific TV brand? You would need a SonyBasicRemote, a SamsungBasicRemote, a SonySmartRemote, a SamsungSmartRemote...and so on. One class for every combination. Adding one new TV brand would double your remote classes. The Bridge stops this explosion.
- What if you want to add a new remote type without touching the TVs? With Bridge, you just create a new remote class. The TVs are untouched.
- What if you want to add a new TV brand without touching the remotes? Same answer. You add a new TV class. Every existing remote already works with it.

In simple terms, you split a large class into two separate hierarchies (the abstraction and the implementation) so each can be changed and extended without affecting the other.

Wikipedia describes it like this:

::: info "Bridge pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The bridge pattern is a design pattern used in software engineering that is meant to decouple an abstraction from its implementation so that the two can vary independently."

```component VPCard
{
  "title": "Bridge pattern - Wikipedia",
  "desc": "The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction from its implementation so that the two can vary independently", introduced by the Gang of Four. The bridge uses encapsulation, aggregation, and can use inheritance to separate responsibilities into different classes.",
  "link": "https://en.wikipedia.org/wiki/Bridge_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The remote control is the abstraction and the TV brand is the implementation. They're connected through a bridge (the `ITV` interface), but neither hierarchy depends on the other's details.

```cs :collapsed-lines
// The implementation interface — what any TV must be able to do
public interface ITV
{
    void TurnOn();
    void TurnOff();
    void SetChannel(int channel);
    void SetVolume(int volume);
}

// Concrete implementations — each brand handles things its own way
public class SonyTV : ITV
{
    public void TurnOn()           => Console.WriteLine("Sony TV: Powering on. BRAVIA display ready.");
    public void TurnOff()          => Console.WriteLine("Sony TV: Shutting down.");
    public void SetChannel(int ch) => Console.WriteLine($"Sony TV: Switching to channel {ch}.");
    public void SetVolume(int vol) => Console.WriteLine($"Sony TV: Volume set to {vol}.");
}

public class SamsungTV : ITV
{
    public void TurnOn()           => Console.WriteLine("Samsung TV: Turning on. Smart Hub loading.");
    public void TurnOff()          => Console.WriteLine("Samsung TV: Powering off.");
    public void SetChannel(int ch) => Console.WriteLine($"Samsung TV: Channel {ch} selected.");
    public void SetVolume(int vol) => Console.WriteLine($"Samsung TV: Volume at {vol}.");
}

// The abstraction — the remote holds a reference to whichever TV it controls
public abstract class RemoteControl
{
    protected ITV _tv;

    protected RemoteControl(ITV tv) { _tv = tv; }

    public abstract void TurnOn();
    public abstract void TurnOff();
    public abstract void SetChannel(int channel);
}

// Refined abstraction — a basic remote, does exactly what the TV does
public class BasicRemote : RemoteControl
{
    public BasicRemote(ITV tv) : base(tv) { }

    public override void TurnOn()           => _tv.TurnOn();
    public override void TurnOff()          => _tv.TurnOff();
    public override void SetChannel(int ch) => _tv.SetChannel(ch);
}

// Refined abstraction — a smart remote, adds its own behaviour on top
public class SmartRemote : RemoteControl
{
    public SmartRemote(ITV tv) : base(tv) { }

    public override void TurnOn()
    {
        Console.WriteLine("Smart Remote: Activating voice control.");
        _tv.TurnOn();
    }

    public override void TurnOff()
    {
        Console.WriteLine("Smart Remote: Saving watch history.");
        _tv.TurnOff();
    }

    public override void SetChannel(int ch)
    {
        Console.WriteLine("Smart Remote: Looking up channel guide.");
        _tv.SetChannel(ch);
    }

    public void SetVolume(int vol) => _tv.SetVolume(vol);
}
```

Now let's see it in action:

```cs :collapsed-lines
// Basic remote paired with a Sony TV
Console.WriteLine("--- Basic Remote + Sony TV ---");
RemoteControl basicSony = new BasicRemote(new SonyTV());
basicSony.TurnOn();
basicSony.SetChannel(5);
basicSony.TurnOff();

// Smart remote paired with a Samsung TV
Console.WriteLine("\n--- Smart Remote + Samsung TV ---");
SmartRemote smartSamsung = new SmartRemote(new SamsungTV());
smartSamsung.TurnOn();
smartSamsung.SetChannel(10);
smartSamsung.SetVolume(20);
smartSamsung.TurnOff();

// Swap freely — smart remote now with Sony, no code changes needed
Console.WriteLine("\n--- Smart Remote + Sony TV ---");
SmartRemote smartSony = new SmartRemote(new SonyTV());
smartSony.TurnOn();
smartSony.SetChannel(3);
smartSony.TurnOff();
//
// --- Basic Remote + Sony TV ---
// Sony TV: Powering on. BRAVIA display ready.
// Sony TV: Switching to channel 5.
// Sony TV: Shutting down.
// 
// --- Smart Remote + Samsung TV ---
// Smart Remote: Activating voice control.
// Samsung TV: Turning on. Smart Hub loading.
// Smart Remote: Looking up channel guide.
// Samsung TV: Channel 10 selected.
// Samsung TV: Volume at 20.
// Smart Remote: Saving watch history.
// Samsung TV: Powering off.
// 
// --- Smart Remote + Sony TV ---
// Smart Remote: Activating voice control.
// Sony TV: Powering on. BRAVIA display ready.
// Smart Remote: Looking up channel guide.
// Sony TV: Switching to channel 3.
// Smart Remote: Saving watch history.
// Sony TV: Shutting down.
```

The same `SmartRemote` worked with both Sony and Samsung without any changes. Adding a new TV brand like LG means creating one new class, and every existing remote works with it immediately. That's the Bridge.

:::

#### When to Use it

Use the Bridge pattern when you want to avoid a permanent binding between an abstraction and its implementation, so either can be swapped at runtime.

You can also use it when both the abstraction and the implementation should be independently extensible through subclassing.

And it's a good fit when changes to the implementation should have no impact on the client code. The client shouldn't need to be recompiled.

### 3. The Composite Design Pattern

#### Real World Example

Think of a company organisation chart. A company has a CEO. Under the CEO are department heads, each leading a department full of employees. Under some departments are even smaller sub-teams.

Now imagine you want to know the total salary cost. You can ask a single employee they tell you their salary. You can ask a whole department, which adds up every person inside it, including nested teams. Or you can ask the entire company: it rolls up every salary across every level.

The same question, asked the same way, whether you're talking to one person or thousands.

That's the Composite pattern. Individual items and groups of items share the same interface. The caller never needs to know which one they're dealing with.

#### Problems it solves:

- What if you had to write different code to handle a single employee versus a whole department? You would end up with `if` checks everywhere just to figure out what you're talking to. Composite removes that entirely: one interface, always.
- What if departments can contain other departments? Composite handles any depth of nesting naturally. The caller just asks the top of the tree and the operation flows down automatically.
- What if you want to add a new type of team or role? You implement the same interface. Everything above it in the tree keeps working without any changes.

In simple terms, you compose objects into tree structures. This lets individual objects and groups of objects be treated through the same interface, so the caller never has to care about the difference.

Wikipedia describes it like this:

::: info "Composite pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The composite pattern describes a group of objects that are treated the same way as a single instance of the same type of object. The intent of a composite is to compose objects into tree structures to represent part-whole hierarchies."*

```component VPCard
{
  "title": "Composite pattern - Wikipedia",
  "desc": "In software engineering, the composite pattern is a partitioning design pattern. The composite pattern describes a group of objects that are treated the same way as a single instance of the same type of object. The intent of a composite is to "compose" objects into tree structures to represent part-whole hierarchies. Implementing the composite pattern lets clients treat individual objects and compositions uniformly.",
  "link": "https://en.wikipedia.org/wiki/Composite_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

Every node in the tree (whether a single employee or an entire department) implements `IEmployee`. The caller treats them identically.

```cs :collapsed-lines
// The component interface — every leaf and composite shares this contract
public interface IEmployee
{
    string Name    { get; }
    int    GetSalary();
    void   GetDetails(string indent = "");
}

// The leaf — a single employee with no reports
public class Employee : IEmployee
{
    private readonly int _salary;

    public string Name { get; }

    public Employee(string name, int salary)
    {
        Name    = name;
        _salary = salary;
    }

    public int  GetSalary()                    => _salary;
    public void GetDetails(string indent = "") => Console.WriteLine($"{indent}- {Name} (£{_salary:N0})");
}

// The composite — a department that holds employees or other departments
public class Department : IEmployee
{
    private readonly List<IEmployee> _members = new();

    public string Name { get; }

    public Department(string name) { Name = name; }

    public void Add(IEmployee employee)    => _members.Add(employee);
    public void Remove(IEmployee employee) => _members.Remove(employee);

    public int GetSalary() => _members.Sum(m => m.GetSalary());

    public void GetDetails(string indent = "")
    {
        Console.WriteLine($"{indent}[{Name}] Total: £{GetSalary():N0}");
        foreach (var member in _members)
            member.GetDetails(indent + "  ");
    }
}
```

Now let's see it in action:

```cs :collapsed-lines
// Individual employees
var ceo        = new Employee("Alice (CEO)",        120_000);
var cto        = new Employee("Bob (CTO)",           95_000);
var dev1       = new Employee("Carol (Developer)",   65_000);
var dev2       = new Employee("David (Developer)",   62_000);
var cfo        = new Employee("Eve (CFO)",           90_000);
var accountant = new Employee("Frank (Accountant)",  55_000);

// Build the Engineering department
var engineering = new Department("Engineering");
engineering.Add(cto);
engineering.Add(dev1);
engineering.Add(dev2);

// Build the Finance department
var finance = new Department("Finance");
finance.Add(cfo);
finance.Add(accountant);

// Build the whole company
var company = new Department("Acme Corp");
company.Add(ceo);
company.Add(engineering);
company.Add(finance);

// Ask the whole company — one call, rolls up everything
Console.WriteLine("=== Full Company ===");
company.GetDetails();

// Ask just one department — same call, same interface
Console.WriteLine("\n=== Engineering Only ===");
engineering.GetDetails();

// Ask a single employee — same call, same interface
Console.WriteLine("\n=== Single Employee ===");
dev1.GetDetails();
//
// === Full Company ===
// [Acme Corp] Total: £487,000
//   - Alice (CEO) (£120,000)
//   [Engineering] Total: £222,000
//     - Bob (CTO) (£95,000)
//     - Carol (Developer) (£65,000)
//     - David (Developer) (£62,000)
//   [Finance] Total: £145,000
//     - Eve (CFO) (£90,000)
//     - Frank (Accountant) (£55,000)
// 
// === Engineering Only ===
// [Engineering] Total: £222,000
//   - Bob (CTO) (£95,000)
//   - Carol (Developer) (£65,000)
//   - David (Developer) (£62,000)
// 
// === Single Employee ===
// - Carol (Developer) (£65,000)
```

`company.GetDetails()`, `engineering.GetDetails()`, and `dev1.GetDetails()`: the same call on three different levels of the tree. The caller never checked what it was talking to. That's the Composite pattern.

:::

#### When to Use it

Use Composite when you need to represent part-whole hierarchies, like trees where individual items and groups of items need to be used interchangeably.

It also works well when you want client code to treat single objects and collections of objects uniformly, without any special-casing.

And it's a good fit when the structure can be nested to any depth and that depth shouldn't affect how the caller interacts with it.

### 4. The Decorator Design Pattern

#### Real World Example

Think of ordering a coffee at a cafe. You start with a plain espresso. Then you ask for milk. Then vanilla syrup. Then whipped cream on top. Each addition wraps around or adds to what was already there, adding its own cost and its own description. The espresso at the centre never changes. You're just layering on top of it, one addition at a time. You could add two shots of syrup. You could skip the milk entirely. Every combination is possible without creating a new type of coffee for each one.

That's the Decorator pattern. You start with a base object and wrap it in layers. Each layer adds its own behaviour and then delegates to whatever is underneath it.

#### Problems it solves:

- What if you needed a class for every combination? EspressoWithMilk, EspressoWithMilkAndVanilla, EspressoWithMilkAndVanillaAndCream...the list explodes. Decorator adds behaviour at runtime, so you never need those classes.
- What if the base coffee shouldn't change? It does not. The espresso class stays untouched. The decorators wrap around it and extend it independently.
- What if a new topping needs to be added? You create one new decorator class. Every existing combination still works exactly as before.

In simple terms, you wrap an object in one or more layers, where each layer adds its own behaviour before or after delegating to the layer beneath it.

Wikipedia describes it like this:

::: info "Decorator pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The decorator pattern is a design pattern that allows behaviour to be added to an individual object, dynamically, without affecting the behaviour of other instances of the same class."*

```component VPCard
{
  "title": "Decorator pattern - Wikipedia",
  "desc": "In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object dynamically, without affecting the behavior of other instances of the same class. The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it enables functionality to be distributed across classes with distinct concerns. It also supports the Open–Closed Principle, since a class's functionality can be extended without modifying its source code. Using decorators can be more flexible and efficient than subclassing, as an object's behavior can be augmented or combined at runtime without creating an entirely new class hierarchy.",
  "link": "https://en.wikipedia.org/wiki/Decorator_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The coffee is the component. Each topping is a decorator. Every decorator wraps the component and adds to its description and cost.

```cs :collapsed-lines
// The component interface — every coffee, plain or decorated, shares this
public interface ICoffee
{
    string GetDescription();
    double GetCost();
}

// The base component — a plain espresso
public class Espresso : ICoffee
{
    public string GetDescription() => "Espresso";
    public double GetCost()        => 1.00;
}

// The base decorator — wraps any ICoffee and delegates to it
public abstract class CoffeeDecorator : ICoffee
{
    protected readonly ICoffee _coffee;

    protected CoffeeDecorator(ICoffee coffee) { _coffee = coffee; }

    public virtual string GetDescription() => _coffee.GetDescription();
    public virtual double GetCost()        => _coffee.GetCost();
}

// Concrete decorators — each one adds its own layer
public class Milk : CoffeeDecorator
{
    public Milk(ICoffee coffee) : base(coffee) { }

    public override string GetDescription() => _coffee.GetDescription() + ", Milk";
    public override double GetCost()        => _coffee.GetCost() + 0.30;
}

public class VanillaSyrup : CoffeeDecorator
{
    public VanillaSyrup(ICoffee coffee) : base(coffee) { }

    public override string GetDescription() => _coffee.GetDescription() + ", Vanilla Syrup";
    public override double GetCost()        => _coffee.GetCost() + 0.50;
}

public class WhippedCream : CoffeeDecorator
{
    public WhippedCream(ICoffee coffee) : base(coffee) { }

    public override string GetDescription() => _coffee.GetDescription() + ", Whipped Cream";
    public override double GetCost()        => _coffee.GetCost() + 0.75;
}
```

Now let's see it in action:

```cs
// A plain espresso
ICoffee order = new Espresso();
Console.WriteLine($"{order.GetDescription()} => £{order.GetCost():F2}");

// Wrap it with milk
order = new Milk(order);
Console.WriteLine($"{order.GetDescription()} => £{order.GetCost():F2}");

// Wrap it with vanilla syrup on top
order = new VanillaSyrup(order);
Console.WriteLine($"{order.GetDescription()} => £{order.GetCost():F2}");

// Wrap it with whipped cream on top of that
order = new WhippedCream(order);
Console.WriteLine($"{order.GetDescription()} => £{order.GetCost():F2}");
//
// Espresso => £1.00
// Espresso, Milk => £1.30
// Espresso, Milk, Vanilla Syrup => £1.80
// Espresso, Milk, Vanilla Syrup, Whipped Cream => £2.55
```

Each line is a new layer wrapped around the previous one. The espresso never changed. The cost and description grew with every wrapper. That's the Decorator pattern.

:::

#### When to Use it

Use the Decorator pattern when you want to add responsibilities to individual objects without affecting other objects of the same class.

It's also a good choice when subclassing would lead to an explosion of classes to cover every possible combination of behaviours.

And use it when you need to be able to stack behaviours in any order at runtime, independently of each other.

### 5. The Facade Design Pattern

#### Real World Example

Think of clicking "Place Order" on a shopping website. In that single click, several things happen behind the scenes: the system checks whether the item is in stock, your payment is charged, a shipping label is generated, and a confirmation email is sent to you. You don't see any of that. You click one button and get one result. The complexity of four separate systems is hidden behind a single, clean action.

That's the Facade pattern: one simple interface in front of many complex moving parts. The caller doesn't need to know what's happening behind the scenes.

#### Problems it solves:

- What if the client had to call each subsystem directly? Check inventory, then process payment, then generate a label, and then send an email, all in the right order, handling each failure separately. The Facade wraps all of that into one call.
- What if one of the subsystems changes? The Facade absorbs the change. The client code never needs to know. Only the Facade is updated.
- What if different clients need the same flow? They all call the same Facade method. The logic is in one place, not duplicated across every caller.

In simple terms, you provide a single, simple interface that hides the complexity of a set of subsystems behind it.

Wikipedia describes it like this:

::: info "Facade pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The facade pattern (also spelled façade) is a software-design pattern commonly used in object-oriented programming. Analogous to a facade in architecture, a facade is an object that serves as a front-facing interface masking more complex underlying or structural code."*

```component VPCard
{
  "title": "Facade pattern - Wikipedia",
  "desc": "The facade pattern (also spelled façade) is a software design pattern commonly used in object-oriented programming. Analogous to a façade in architecture, it is an object that serves as a front-facing interface masking more complex underlying or structural code. A facade can:",
  "link": "https://en.wikipedia.org/wiki/Facade_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

Each subsystem does its own job. The `OrderFacade` is the single entry point that coordinates all of them. The client only ever talks to the facade.

```cs :collapsed-lines
// Subsystem 1: checks whether the item is available
public class InventoryService
{
    public bool CheckStock(string item)
    {
        Console.WriteLine($"Inventory: Checking stock for {item}.");
        return true;
    }
}

// Subsystem 2: handles the payment
public class PaymentService
{
    public bool ProcessPayment(string cardNumber, double amount)
    {
        Console.WriteLine($"Payment: Charging £{amount:F2} to card ending {cardNumber[^4..]}.");
        return true;
    }
}

// Subsystem 3: generates a shipping label
public class ShippingService
{
    public string GenerateLabel(string item, string address)
    {
        Console.WriteLine($"Shipping: Generating label for {item} to {address}.");
        return "TRACK-29384";
    }
}

// Subsystem 4: sends the confirmation email
public class EmailService
{
    public void SendConfirmation(string email, string trackingCode)
    {
        Console.WriteLine($"Email: Confirmation sent to {email}. Tracking code: {trackingCode}.");
    }
}

// The Facade — one method, hides all four subsystems
public class OrderFacade
{
    private readonly InventoryService _inventory = new();
    private readonly PaymentService   _payment   = new();
    private readonly ShippingService  _shipping  = new();
    private readonly EmailService     _email     = new();

    public void PlaceOrder(string item, string cardNumber, double amount, string address, string email)
    {
        Console.WriteLine("=== Placing Order ===");

        if (!_inventory.CheckStock(item))
        {
            Console.WriteLine("Order failed: item out of stock.");
            return;
        }

        if (!_payment.ProcessPayment(cardNumber, amount))
        {
            Console.WriteLine("Order failed: payment declined.");
            return;
        }

        string trackingCode = _shipping.GenerateLabel(item, address);
        _email.SendConfirmation(email, trackingCode);

        Console.WriteLine($"\nOrder complete. Your tracking code is {trackingCode}.");
    }
}
```

Now let's see it in action:

```cs
OrderFacade store = new OrderFacade();

store.PlaceOrder(
    item:       "Wireless Headphones",
    cardNumber: "4111111111111234",
    amount:     79.99,
    address:    "42 Maple Street, London",
    email:      "customer@email.com"
);
//
// === Placing Order ===
// Inventory: Checking stock for Wireless Headphones.
// Payment: Charging £79.99 to card ending 1234.
// Shipping: Generating label for Wireless Headphones to 42 Maple Street, London.
// Email: Confirmation sent to customer@email.com. Tracking code: TRACK-29384. Order complete. Your tracking code is TRACK-29384.
```

> The client called one method. Four subsystems ran in the right order. None of that complexity was visible to the caller. That is the Facade.

:::

#### When to Use it

Use Facade when you want to provide a simple interface to a complex subsystem so callers aren't burdened by its internals.

It also works well when you want to layer your system so that high-level code talks to facades, not directly to low-level subsystems.

And it's a good choice when you want a single entry point that coordinates a sequence of steps across multiple services.

### 6. The Flyweight Design Pattern

#### Real World Example

Think of a game that renders a forest. The forest has ten thousand trees. Each tree has a type name, a colour, and a texture. But most of those trees are Oaks, and all Oaks look exactly the same.

Creating ten thousand separate objects, each storing the same name, colour, and texture, wastes enormous amounts of memory. Instead, you create one shared Oak object that holds all that data. Every Oak tree in the forest points to that same shared object and only stores its own position on the map.

That's the Flyweight pattern. The data that's the same across many instances is shared. The data that's unique per instance is stored separately and passed in only when needed.

#### Problems it solves:

- What if you created a full object for every single tree? With ten thousand trees, you store the same name, colour, and texture ten thousand times. Flyweight stores that shared data once and reuses it everywhere.
- What if a new tree type is introduced? The factory creates one new shared object for it. Every tree of that type immediately uses it without any extra memory.
- What if the forest needs to render each tree at its own position? The position is unique per tree, so it's stored on the tree itself and passed to the shared object only at render time. The shared object never holds it.

In simple terms, you split an object's data into what's shared across many instances and what's unique per instance. Share the common part. Pass the unique part in only when needed.

Wikipedia describes it like this:

::: info "Flyweight pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"A flyweight is an object that minimizes memory usage by sharing as much data as possible with other similar objects. It is a way to use objects in large numbers when a simple repeated representation would use an unacceptable amount of memory."*

<SiteInfo
  name="Flyweight pattern - Wikipedia"
  desc="In computer programming, the flyweight software design pattern refers to an object that minimizes memory usage by sharing some of its data with other similar objects. The flyweight pattern is one of twenty-three GoF design patterns."
  url="https://en.wikipedia.org/wiki/Flyweight_pattern"
  logo="/static/favicon/wikipedia.ico"
  preview="https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Linux-Mint-20-MATE-writer.png/1280px-Linux-Mint-20-MATE-writer.png"/>

:::

::: tip Programming ExampleL

`TreeType` is the flyweight: it holds shared data. `Tree` holds only the unique position and a reference to a shared `TreeType`. The factory ensures each `TreeType` is created only once.

```cs :collapsed-lines
// The flyweight — holds shared intrinsic state (same for all trees of this type)
public class TreeType
{
    public string Name    { get; }
    public string Colour  { get; }
    public string Texture { get; }

    public TreeType(string name, string colour, string texture)
    {
        Name    = name;
        Colour  = colour;
        Texture = texture;
    }

    public void Render(int x, int y)
    {
        Console.WriteLine($"Rendering {Name} tree ({Colour}, {Texture}) at ({x}, {y})");
    }
}

// The flyweight factory — creates and caches tree types so they are never duplicated
public class TreeTypeFactory
{
    private readonly Dictionary<string, TreeType> _cache = new();

    public TreeType GetTreeType(string name, string colour, string texture)
    {
        string key = $"{name}_{colour}_{texture}";

        if (!_cache.ContainsKey(key))
        {
            Console.WriteLine($"Factory: Creating new TreeType for '{name}'.");
            _cache[key] = new TreeType(name, colour, texture);
        }

        return _cache[key];
    }

    public int TotalTypes => _cache.Count;
}

// The context — holds unique extrinsic state (position) and a reference to a shared flyweight
public class Tree
{
    private readonly int      _x;
    private readonly int      _y;
    private readonly TreeType _type;

    public Tree(int x, int y, TreeType type)
    {
        _x    = x;
        _y    = y;
        _type = type;
    }

    public void Render() => _type.Render(_x, _y);
}

// The forest — plants trees using shared flyweights
public class Forest
{
    private readonly List<Tree>      _trees   = new();
    private readonly TreeTypeFactory _factory = new();

    public void PlantTree(int x, int y, string name, string colour, string texture)
    {
        TreeType type = _factory.GetTreeType(name, colour, texture);
        _trees.Add(new Tree(x, y, type));
    }

    public void Render()
    {
        foreach (var tree in _trees)
            tree.Render();
    }

    public int TreeCount     => _trees.Count;
    public int TreeTypeCount => _factory.TotalTypes;
}
```

Now let's see it in action:

```cs
Forest forest = new Forest();

// Plant 6 trees — but only 2 unique types
forest.PlantTree(1,  5,  "Oak",  "Dark Green",  "Rough bark");
forest.PlantTree(3,  12, "Oak",  "Dark Green",  "Rough bark");
forest.PlantTree(7,  2,  "Oak",  "Dark Green",  "Rough bark");
forest.PlantTree(10, 8,  "Pine", "Light Green", "Smooth bark");
forest.PlantTree(15, 3,  "Pine", "Light Green", "Smooth bark");
forest.PlantTree(20, 14, "Pine", "Light Green", "Smooth bark");

forest.Render();

Console.WriteLine($"\nTrees planted:              {forest.TreeCount}");
Console.WriteLine($"Unique tree types in memory: {forest.TreeTypeCount}");
//
// Factory: Creating new TreeType for 'Oak'.
// Factory: Creating new TreeType for 'Pine'.
// Rendering Oak tree (Dark Green, Rough bark) at (1, 5)
// Rendering Oak tree (Dark Green, Rough bark) at (3, 12)
// Rendering Oak tree (Dark Green, Rough bark) at (7, 2)
// Rendering Pine tree (Light Green, Smooth bark) at (10, 8)
// Rendering Pine tree (Light Green, Smooth bark) at (15, 3)
// Rendering Pine tree (Light Green, Smooth bark) at (20, 14)
//
// Trees planted:              6
// Unique tree types in memory: 2
```

Six trees, but only two `TreeType` objects were ever created. Scale that to ten thousand trees and the factory still creates exactly two. The positions are unique per tree, and the appearance is shared. That's the Flyweight.

:::

#### When to Use it

Use Flyweight when your application needs to create a very large number of similar objects that would otherwise consume too much memory.

It's also useful when most of the object's state can be made shared across instances, with only a small part being unique per instance.

And it's a good choice when the unique part of the state can be passed in externally rather than stored inside every object.

### 7. The Proxy Design Pattern

#### Real World Example

Think of a security guard at the entrance of an office building. You can't walk straight into the building. You have to go through the guard first. The guard checks your name against the authorised list, logs your visit, and only then lets you through. If you're not on the list, you're turned away. The building itself never deals with any of that. It just lets people in. All the checking, logging, and decision-making happens at the guard (the proxy) before the building ever gets involved.

That's the Proxy pattern. It sits between the caller and the real object, controls what gets through, and can add behaviour like access checks or logging without the real object knowing anything about it.

#### Problems it solves:

- What if anyone could walk straight into the building? There would be no access control. The proxy intercepts every request and decides whether it should be allowed through.
- What if you need to log every entry without changing the building? The proxy handles it. The real building stays simple and focused on its own job.
- What if the real object is expensive to create and you want to delay that? The proxy can hold off creating it until someone actually passes the check and needs it.

In simple terms, you place an object in front of another object to control access to it. The caller thinks it's talking directly to the real object, but the proxy is handling it first.

Wikipedia describes it like this:

::: info "Proxy pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"A proxy, in its most general form, is a class functioning as an interface to something else. The proxy could interface to anything: a network connection, a large object in memory, a file, or some other resource that is expensive or impossible to duplicate."

```component VPCard
{
  "title": "Proxy pattern - Wikipedia",
  "desc": "n computer programming, the proxy pattern is a software design pattern which is a class functioning as an interface to something else.[vague] The proxy could interface to anything: a network connection, a large object in memory, a file, or some other resource that is expensive or impossible to duplicate. In short, a proxy is a wrapper or agent object that is being called by the client to access the real serving object behind the scenes. Use of the proxy can sim...",
  "link": "https://en.wikipedia.org/wiki/Proxy_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The client talks to `IBuilding`. The `SecurityGuard` is the proxy: it implements the same interface, controls access, and only lets authorised visitors through to the `OfficeBuilding`.

```cs :collapsed-lines
// The subject interface — the building and the proxy both implement this
public interface IBuilding
{
    void Enter(string visitorName);
}

// The real subject — the actual building, just grants entry
public class OfficeBuilding : IBuilding
{
    public void Enter(string visitorName)
    {
        Console.WriteLine($"Building: {visitorName} has entered.");
    }
}

// The proxy — the security guard controls who gets through
public class SecurityGuard : IBuilding
{
    private readonly OfficeBuilding _building          = new();
    private readonly List<string>   _authorisedVisitors = new() { "Alice", "Bob", "Carol" };

    public void Enter(string visitorName)
    {
        Console.WriteLine($"Guard: {visitorName} is requesting entry.");

        if (_authorisedVisitors.Contains(visitorName))
        {
            Console.WriteLine("Guard: ID verified. Access granted.");
            _building.Enter(visitorName);
        }
        else
        {
            Console.WriteLine($"Guard: {visitorName} is not on the list. Access denied.");
        }
    }
}
```

Now let's see it in action:

```cs
IBuilding entrance = new SecurityGuard();

entrance.Enter("Alice");
Console.WriteLine();
entrance.Enter("David");
Console.WriteLine();
entrance.Enter("Bob");
//
// Guard: Alice is requesting entry.
// Guard: ID verified. Access granted.
// Building: Alice has entered.
//
// Guard: David is requesting entry.
// Guard: David is not on the list. Access denied.
//
// Guard: Bob is requesting entry.
// Guard: ID verified. Access granted.
// Building: Bob has entered.
```

The client called `Enter()` on what it thought was the building. It was actually the security guard. The guard decided what happened. The building only ever saw the people who were allowed through. That's the Proxy.

:::

#### When to Use it

Use Proxy when you need access control, like only letting certain callers through to the real object.

It's a good fit when you want to add behaviour such as logging, caching, or validation without changing the real object.

And you can use it when the real object is expensive to create and you want to delay or guard that creation until it's truly needed.

---

## Behavioral Design Patterns

Simply put, behavioral patterns are all about **how objects communicate and share responsibility**. They focus on the assignment of responsibilities between objects, and how objects cooperate to get a job done.

Wikipedia describes them as:

::: info "Behavioral pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In software engineering, behavioral design patterns are design patterns that identify common communication patterns among objects. By doing so, these patterns increase flexibility in carrying out this communication."*

```component VPCard
{
  "title": "Behavioral pattern - Wikipedia",
  "desc": "A behavioral pattern is a software design pattern for collaboration between objects.",
  "link": "https://en.wikipedia.org/wiki/Behavioral_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Behavioral design patterns describe how objects interact and distribute responsibility, not just how they're structured. They focus on communication between objects: who talks to whom, and how much each side knows about the other.

There are 11 behavioral design patterns:

1. **Chain of Responsibility**: Passes a request along a chain of handlers, letting each one decide to handle it or pass it on.
2. **Command**: Encapsulates a request as an object, letting you parameterize clients, queue actions, and support undo.
3. **Interpreter**: Given a language, defines a representation for its grammar along with an interpreter that evaluates sentences in it.
4. **Iterator**: Provides a way to access the elements of a collection sequentially without exposing how it's built underneath.
5. **Mediator**: Defines an object that encapsulates how a set of objects interact, so they don't refer to each other directly.
6. **Memento**: Captures an object's internal state so it can be restored later, without breaking encapsulation.
7. **Observer**: Defines a one-to-many dependency so that when one object changes state, everything depending on it is notified automatically.
8. **State**: Lets an object change its behaviour when its internal state changes, as if it had changed its class.
9. **Strategy**: Defines a family of interchangeable algorithms and lets the client pick which one to use at runtime.
10. **Template Method**: Defines the skeleton of an algorithm in a method, leaving some steps for subclasses to fill in.
11. **Visitor**: Lets you define a new operation without changing the classes of the elements it operates on.

### 1. The Chain of Responsibility Design Pattern

#### Real World Example

Think of an expense approval process at a company. An employee submits a request to their director. If the amount is small enough, the director approves it and that's the end of it. If it's too large for the director to sign off on, it goes up to the vice president. If it's still too large, it goes up to the chief executive.

Each person in the chain only needs to know two things: what they're allowed to approve, and who to hand it to if they can't. The employee never needs to know who ends up approving it.

That's the Chain of Responsibility design pattern. A request travels along a chain of handlers until one of them deals with it, and each handler only cares about its own link in that chain.

#### Problems it solves:

- What if the sender had to know exactly who should handle the request? That would tie the sender to a specific handler and break the moment the approval structure changed. The chain lets the sender submit the request without knowing who will end up handling it.
- What if one handler could only ever approve or reject, with no fallback? Requests that fell outside its authority would simply fail. The chain lets a handler pass what it can't deal with further along.
- What if you needed to change the approval structure? Rewiring which handler comes after which is enough. Neither the sender nor the other handlers need to change.

In simple terms, you pass a request along a chain of handlers. Each handler decides whether to deal with it or hand it off to the next one in line.

Wikipedia describes it like this:

::: info "Chain-of-responsibility pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In object-oriented design, the chain-of-responsibility pattern is a behavioral design pattern consisting of a source of command objects and a series of processing objects. Each processing object contains logic that defines the types of command objects that it can handle; the rest are passed to the next processing object in the chain."*

```component VPCard
{
  "title": "Chain-of-responsibility pattern - Wikipedia",
  "desc": "In object-oriented design, the chain-of-responsibility pattern is a behavioral design pattern consisting of a source of command objects and a series of processing objects. Each processing object contains logic that defines the types of command objects that it can handle; the rest are passed to the next processing object in the chain. A mechanism also exists for adding new processing objects to the end of this chain.",
  "link": "https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

Each `Approver` knows its own approval limit and holds a reference to the next approver in the chain. The `ExpenseRequest` is passed along until someone can approve it, or nobody can.

```cs :collapsed-lines
// The request that travels along the chain
public class ExpenseRequest
{
    public string Description { get; }
    public decimal Amount     { get; }

    public ExpenseRequest(string description, decimal amount)
    {
        Description = description;
        Amount      = amount;
    }
}

// The handler, every link in the chain implements this
public abstract class Approver
{
    private Approver? _next;

    public void SetNext(Approver next) => _next = next;

    public void Approve(ExpenseRequest request)
    {
        if (CanApprove(request))
        {
            Console.WriteLine($"{GetType().Name}: Approved '{request.Description}' (${request.Amount}).");
        }
        else if (_next is not null)
        {
            Console.WriteLine($"{GetType().Name}: Can't approve '{request.Description}' (${request.Amount}). Passing it up.");
            _next.Approve(request);
        }
        else
        {
            Console.WriteLine($"{GetType().Name}: No one left to approve '{request.Description}' (${request.Amount}). Request denied.");
        }
    }

    protected abstract bool CanApprove(ExpenseRequest request);
}

// Concrete handlers, each with its own approval limit
public class Director : Approver
{
    protected override bool CanApprove(ExpenseRequest request) => request.Amount <= 1000;
}

public class VicePresident : Approver
{
    protected override bool CanApprove(ExpenseRequest request) => request.Amount <= 20000;
}

public class Chief : Approver
{
    protected override bool CanApprove(ExpenseRequest request) => request.Amount <= 50000;
}
```

Now let's see it in action:

```cs
Approver directorApprover = new Director();
Approver vpApprover       = new VicePresident();
Approver ceoApprover      = new Chief();

directorApprover.SetNext(vpApprover);
vpApprover.SetNext(ceoApprover);

directorApprover.Approve(new ExpenseRequest("Laptop", 800));
Console.WriteLine();
directorApprover.Approve(new ExpenseRequest("Team offsite", 12000));
Console.WriteLine();
directorApprover.Approve(new ExpenseRequest("New office lease", 90000));
//
// Director: Approved 'Laptop' ($800).
//
// Director: Can't approve 'Team offsite' ($12000). Passing it up.
// VicePresident: Approved 'Team offsite' ($12000).
//
// Director: Can't approve 'New office lease' ($90000). Passing it up.
// VicePresident: Can't approve 'New office lease' ($90000). Passing it up.
// Chief: No one left to approve 'New office lease' ($90000). Request denied.
```

The employee only ever talked to the director. Whether the director, the vice president, or the chief ended up approving it, was decided by the chain itself, not the employee.

:::

#### When to Use it

Use Chain of Responsibility when more than one object might handle a request, and the handler isn't known in advance.

It's also a good choice when you want to issue a request without specifying the receiver explicitly.

And it's helpful when the set of handlers, and their order, should be configurable rather than hard-coded.

### 2. The Command Design Pattern

#### Real World Example

Think of a universal remote control. Every button is programmed to do one specific thing: turn a light on, turn a light off, and so on. When you press a button, the remote doesn't know or care how the light actually works internally. It just triggers the action that button was set up to perform. And because each button's action is a self-contained thing, the remote can also press it in reverse, undoing what it just did.

That's the Command pattern. A request "turn the light on" is wrapped up as its own object. The thing that triggers it doesn't need to know anything about how it's carried out.

#### Problems it solves:

- What if the button had to know exactly how the light worked? Every button would need to be rewritten if the light's internals changed. Wrapping the action as a command means the remote never touches those details.
- What if you wanted to undo the last action? Without a command object there's nothing to reverse, only a completed side effect. Wrapping the action gives you something you can also unwind.
- What if you wanted to queue actions, log them, or trigger them later? A plain method call happens immediately and leaves nothing behind. A command is an object, so it can be stored, queued, and replayed.

In simple terms, you wrap a request up as an object, so the thing that triggers it doesn't need to know how it's carried out, and the action itself can be queued, logged, or undone.

Wikipedia describes it like this:

::: info "Command pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time."

```component VPCard
{
  "title": "Command pattern - Wikipedia",
  "desc": "In object-oriented programming, the command pattern is a behavioral design pattern in which an object is used to encapsulate all information needed to perform an action or trigger an event at a later time. This information includes the method name, the object that owns the method and values for the method parameters.",
  "link": "https://en.wikipedia.org/wiki/Command_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

The `RemoteControl` is the invoker it only knows about `ICommand`. `LightOnCommand` and `LightOffCommand` are the concrete commands, each wrapping the `Light` receiver and the action to perform on it.

```cs :collapsed-lines
// The command interface, every action implements this
public interface ICommand
{
    void Execute();
    void Undo();
}

// The receiver, the object that actually does the work
public class Light
{
    private readonly string _room;

    public Light(string room) => _room = room;

    public void On()  => Console.WriteLine($"{_room} light: turned on.");
    public void Off() => Console.WriteLine($"{_room} light: turned off.");
}

// Concrete commands, each wraps a receiver and an action
public class LightOnCommand : ICommand
{
    private readonly Light _light;

    public LightOnCommand(Light light) => _light = light;

    public void Execute() => _light.On();
    public void Undo()    => _light.Off();
}

public class LightOffCommand : ICommand
{
    private readonly Light _light;

    public LightOffCommand(Light light) => _light = light;

    public void Execute() => _light.Off();
    public void Undo()    => _light.On();
}

// The invoker, it holds a command and triggers it without knowing what it does
public class RemoteControl
{
    private ICommand? _command;

    public void SetCommand(ICommand command) => _command = command;

    public void PressButton() => _command?.Execute();
    public void PressUndo()   => _command?.Undo();
}
```

Now let's see it in action:

```cs
var livingRoomLight = new Light("Living Room");
var remote          = new RemoteControl();

remote.SetCommand(new LightOnCommand(livingRoomLight));
remote.PressButton();

remote.SetCommand(new LightOffCommand(livingRoomLight));
remote.PressButton();

Console.WriteLine();
Console.WriteLine("Undoing last action...");
remote.PressUndo();
//
// Living Room light: turned on.
// Living Room light: turned off.
//
// Undoing last action...
// Living Room light: turned on.
```

The remote never called `_light.On()` or `_light.Off()` directly. It called `Execute()` and `Undo()` on whatever command it was holding. That's the Command pattern: the request itself became an object.

:::

#### When to Use it

Use the Command pattern when you want to parameterize objects with an action to perform, rather than hard-coding it.

Reach for it when you need to queue, log, or support undo for requests.

And consider it when you want to decouple the object that invokes an action from the object that knows how to perform it.

### 3. The Interpreter Design Pattern

#### Real World Example

Think of a basic calculator reading an expression like `(5 + 3) - 2`. Nobody hardcodes a single method that handles every possible expression. Instead, the expression is broken down into small pieces: numbers and operation buttons, each of which knows how to evaluate itself and combine with the others. `(5 + 3) - 2` becomes a subtraction of two things: the number 2, and the result of adding 5 and 3. Each piece only needs to know how to interpret itself.

That's the Interpreter pattern. A grammar is represented as a tree of small objects, and each one knows how to evaluate its own little piece of it.

#### Problems it solves:

- What if you tried to evaluate an entire expression in one big method? It would grow unmanageable the moment the grammar got more complex. Breaking the grammar into small classes, one per rule, keeps each piece simple.
- What if the grammar needed to grow? Adding a new operation, like multiplication, is just a new class. The existing pieces don't need to change.
- What if the same expression needed to be evaluated more than once, or in different contexts? Because each piece is just an object, the same tree can be interpreted again without rebuilding it.

In simple terms, you represent a grammar as a tree of small objects, where each object knows how to interpret its own piece of the expression.

Wikipedia describes it like this:

::: info "Interpreter pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In computer programming, the interpreter pattern is a design pattern that specifies how to evaluate sentences in a language. The basic idea is to have a class for each symbol (terminal or nonterminal) in a specialized computer language."*

```component VPCard
{
  "title": "Interpreter pattern - Wikipedia",
  "desc": "In computer programming, the interpreter pattern is a design pattern that specifies how to evaluate sentences in a language. The basic idea is to have a class for each symbol (terminal or nonterminal) in a specialized computer language. The syntax tree of a sentence in the language is an instance of the composite pattern and is used to evaluate (interpret) the sentence for a client.[1]: 243  See also Composite pattern.",
  "link": "https://en.wikipedia.org/wiki/Interpreter_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`Number` is the terminal expression, a plain value. `Add` and `Subtract` are non-terminal expressions, each combining two other expressions. Every node, terminal or not, knows how to `Interpret()` itself.

```cs :collapsed-lines
// The abstract expression, every node in the grammar implements this
public abstract class Expression
{
    public abstract int Interpret();
}

// A terminal expression, a plain number that needs no further interpretation
public class Number : Expression
{
    private readonly int _value;

    public Number(int value) => _value = value;

    public override int Interpret() => _value;
}

// Non-terminal expressions, each combines other expressions
public class Add : Expression
{
    private readonly Expression _left;
    private readonly Expression _right;

    public Add(Expression left, Expression right)
    {
        _left  = left;
        _right = right;
    }

    public override int Interpret() => _left.Interpret() + _right.Interpret();
}

public class Subtract : Expression
{
    private readonly Expression _left;
    private readonly Expression _right;

    public Subtract(Expression left, Expression right)
    {
        _left  = left;
        _right = right;
    }

    public override int Interpret() => _left.Interpret() - _right.Interpret();
}
```

Now let's see it in action:

```cs
// (5 plus 3) minus 2
Expression expression = new Subtract(
    new Add(new Number(5), new Number(3)),
    new Number(2)
);

Console.WriteLine($"Result: {expression.Interpret()}");

// (10 minus 4) plus (2 plus 2)
Expression another = new Add(
    new Subtract(new Number(10), new Number(4)),
    new Add(new Number(2), new Number(2))
);

Console.WriteLine($"Result: {another.Interpret()}");
//
// Result: 6
// Result: 10
```

Nothing ever evaluated the whole expression at once. `Subtract` asked its own `_left` and `_right` to interpret themselves, and those asked their own children, all the way down to plain numbers. That's the Interpreter pattern: the grammar interprets itself, one small piece at a time.

:::

#### When to Use it

Use Interpreter when you have a simple language or grammar to evaluate, and representing it as a tree of expressions keeps it manageable.

It also works well when the grammar is relatively stable. For example, adding new rules means adding new classes, not rewriting existing ones.

And it's useful when you would rather have many small, focused classes than one large method trying to parse and evaluate everything at once.

### 4. The Iterator Design Pattern

#### Real World Example

Think of a bookshelf. You want to go through it one book at a time, from left to right, without needing to know whether the books are held in an array, multiple piles and stacks, or something else entirely. All you need is a way to ask "what's next?" and to know when you've reached the end. How the shelf actually stores its books internally is none of your concern.

That's the Iterator pattern. It gives you a consistent way to step through a collection, one element at a time, without exposing how that collection is built underneath.

#### Problems it solves:

- What if the client had to know how the collection was stored internally to loop over it? Any change to that internal structure would break every piece of code that loops over it. The iterator hides that structure behind a simple "get next" interface.
- What if you needed more than one traversal in progress at the same time? A single shared position wouldn't work. Each iterator keeps its own position, so multiple traversals can happen independently.
- What if you wanted to loop over the collection using the language's own `foreach`? Implementing the iterator interface the language expects means your custom collection gets that support for free.

In simple terms, you give a collection a way to be walked through, one element at a time, without exposing how it's actually built underneath.

Wikipedia describes it like this:

::: info "Iterator pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container's elements."*

```component VPCard
{
  "title": "Iterator pattern - Wikipedia",
  "desc": "In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers; in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.",
  "link": "https://en.wikipedia.org/wiki/Iterator_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`Bookshelf` is the aggregate it exposes an `IEnumerator<string>` without revealing that it stores books in a `List<string>` internally. `BookshelfIterator` is the iterator that walks through them one at a time.

```cs
// The aggregate, exposes an iterator without revealing how books are stored
public class Bookshelf : IEnumerable<string>
{
    private readonly List<string> _books = new();

    public void Add(string title) => _books.Add(title);

    public IEnumerator<string> GetEnumerator() => new BookshelfIterator(_books);

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

// The iterator, walks the collection one book at a time
public class BookshelfIterator : IEnumerator<string>
{
    private readonly List<string> _books;
    private int _position = -1;

    public BookshelfIterator(List<string> books) => _books = books;

    public string Current => _books[_position];

    object IEnumerator.Current => Current;

    public bool MoveNext()
    {
        _position++;
        return _position < _books.Count;
    }

    public void Reset() => _position = -1;

    public void Dispose() { }
}
```

Now let's see it in action:

```cs
var bookshelf = new Bookshelf();
bookshelf.Add("Clean Code");
bookshelf.Add("The Pragmatic Programmer");
bookshelf.Add("Design Patterns");

foreach (var book in bookshelf)
{
    Console.WriteLine($"On the shelf: {book}");
}
//
// On the shelf: Clean Code
// On the shelf: The Pragmatic Programmer
// On the shelf: Design Patterns
```

The `foreach` loop never touched the `List<string>` inside `Bookshelf` directly. It called `MoveNext()` and `Current` on the `BookshelfIterator`, one step at a time. That's the Iterator pattern: the traversal logic lives outside the collection itself.

:::

#### When to Use it

Use Iterator when you want to traverse a collection without exposing its internal structure.

It's also a good choice when you need to support multiple simultaneous traversals over the same collection.

And try it when you want your custom collection to work with the language's built-in iteration syntax, like `foreach`.

### 5. The Mediator Design Pattern

#### Real World Example

Think of an air traffic control tower. Planes don't radio each other directly to negotiate who lands first. That would be chaos: dozens of pilots all trying to coordinate with each other at once.

Instead, every plane talks only to the tower. The tower knows the state of the runway and tells each plane what to do. The planes never need to know how many other planes are around, or what they're doing.

That's the Mediator pattern. Instead of objects talking to each other directly, they all talk to one central object that coordinates them.

#### Problems it solves:

- What if every aircraft had to communicate directly with every other aircraft? The number of connections would explode as more aircraft joined, and each one would need to know about all the others. The mediator means each aircraft only needs to know about the tower.
- What if the coordination logic was scattered across every object involved? Changing how landings get prioritised would mean touching every aircraft. With a mediator, that logic lives in one place.
- What if you wanted to add a new aircraft to the system? It only needs to know how to talk to the tower. It doesn't need to be introduced to every other aircraft already in the sky.

In simple terms, instead of letting objects talk to each other directly, you route all communication through one central object that knows how to coordinate them.

Wikipedia describes it like this:

::: info "Mediator pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In software engineering, the mediator pattern defines an object that encapsulates how a set of objects interact. This pattern is considered to be a behavioral pattern due to the way it can alter the program's running behavior."*

```component VPCard
{
  "title": "Mediator pattern - Wikipedia",
  "desc": "In software engineering, the mediator pattern defines an object that encapsulates how a set of objects interact. This pattern is considered to be a behavioral pattern due to the way it can alter the program's running behavior.",
  "link": "https://en.wikipedia.org/wiki/Mediator_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`ControlTower` is the mediator. It's the only thing an `Aircraft` ever talks to. It decides whether a plane can land based on the state it holds, and no aircraft ever contacts another aircraft directly.

```cs :collapsed-lines
// The mediator interface
public interface IControlTower
{
    void RequestLanding(Aircraft requester);
}

// The concrete mediator, coordinates all the aircraft instead of letting them talk to each other
public class ControlTower : IControlTower
{
    private readonly List<Aircraft> _aircraft = new();
    private bool _runwayFree = true;

    public void Register(Aircraft aircraft) => _aircraft.Add(aircraft);

    public void RequestLanding(Aircraft requester)
    {
        if (_runwayFree)
        {
            _runwayFree = false;
            Console.WriteLine($"Tower: Runway clear. {requester.Name}, you are cleared to land.");
        }
        else
        {
            Console.WriteLine($"Tower: Runway occupied. {requester.Name}, please hold your position.");
        }
    }
}

// The colleague, only ever talks to the mediator, never to other aircraft directly
public class Aircraft
{
    public string Name { get; }

    private readonly IControlTower _tower;

    public Aircraft(string name, IControlTower tower)
    {
        Name   = name;
        _tower = tower;
    }

    public void RequestLanding()
    {
        Console.WriteLine($"{Name}: Requesting permission to land.");
        _tower.RequestLanding(this);
    }
}
```

Now let's see it in action:

```cs
var tower = new ControlTower();

var flight101 = new Aircraft("Flight 101", tower);
var flight202 = new Aircraft("Flight 202", tower);

tower.Register(flight101);
tower.Register(flight202);

flight101.RequestLanding();
flight202.RequestLanding();
//
// Flight 101: Requesting permission to land.
// Tower: Runway clear. Flight 101, you are cleared to land.
// Flight 202: Requesting permission to land.
// Tower: Runway occupied. Flight 202, please hold your position.
```

Flight 101 and Flight 202 never spoke to each other. Neither one even knows the other exists. Both only ever talked to the tower, and the tower decided what happened next. That's the Mediator pattern.

:::

#### When to Use it

Use Mediator when a group of objects communicate in complex, tangled ways, and you want to centralise that communication.

It's also helpful when you want to reuse objects independently, without them being locked together by direct references to each other.

And reach for it when the way objects interact changes often, and you'd rather change it in one place than in every object involved.

### 6. The Memento Design Pattern

#### Real World Example

Think of the undo history in a text editor. Every so often, the editor quietly takes a snapshot of what the document looks like. It doesn't ask the document to expose its internals to do this. It just captures a copy of the content at that moment.

When you press undo, the editor hands that snapshot back, and the document restores itself to exactly how it was. The history keeps a pile of these snapshots, but it never looks inside them or changes them. It only stores them and hands them back.

That's the Memento pattern. It lets you capture and restore an object's state without exposing how that state is structured internally.

#### Problems it solves:

- What if undo required exposing every private field of the document? That would break encapsulation, and any change to the document's internals would ripple out to whatever handles undo. The memento hides that structure inside an object only the document itself knows how to read.
- What if the history needed to inspect or modify old snapshots? It shouldn't be able to. The caretaker only stores and returns mementos, it never reads or changes what's inside them.
- What if you needed several restore points, not just one? Because each memento is just an object, they can be stacked, listed, or discarded, giving you as many restore points as you want to keep.

In simple terms, you capture an object's state in a snapshot you can restore later, without exposing how that state is put together internally.

Wikipedia describes it like this:

::: info "Memento pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The memento pattern is a software design pattern that provides the ability to restore an object to its previous state (undo via rollback)."*

```component VPCard
{
  "title": "Memento pattern - Wikipedia",
  "desc": "The memento pattern is a software design pattern in the field of object-oriented programming that allows reverting the state of an object. Uses of this design pattern include undo, version control, and serialization.",
  "link": "https://en.wikipedia.org/wiki/Memento_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`TextEditor` is the originator: it creates `EditorMemento` snapshots of itself and can restore from one. `History` is the caretaker: it stores mementos on a stack without ever looking inside them.

```cs
// The memento, an immutable snapshot of the editor's state
public class EditorMemento
{
    public string Content { get; }

    public EditorMemento(string content) => Content = content;
}

// The originator, creates and restores from mementos of its own state
public class TextEditor
{
    public string Content { get; private set; } = string.Empty;

    public void Write(string text) => Content += text;

    public EditorMemento Save() => new(Content);

    public void Restore(EditorMemento memento) => Content = memento.Content;
}

// The caretaker, stores mementos without ever looking inside them
public class History
{
    private readonly Stack<EditorMemento> _snapshots = new();

    public void Save(EditorMemento memento) => _snapshots.Push(memento);

    public EditorMemento Undo() => _snapshots.Pop();
}
```

Now let's see it in action:

```cs
var editor  = new TextEditor();
var history = new History();

editor.Write("Hello");
history.Save(editor.Save());

editor.Write(", world");
history.Save(editor.Save());

editor.Write("!!!");
Console.WriteLine($"Current: {editor.Content}");

editor.Restore(history.Undo());
Console.WriteLine($"After undo: {editor.Content}");

editor.Restore(history.Undo());
Console.WriteLine($"After undo: {editor.Content}");
//
// Current: Hello, world!!!
// After undo: Hello, world
// After undo: Hello
```

`History` never read or changed the text inside a snapshot. It just pushed mementos on and popped them off. Only `TextEditor` knew what to do with the content inside one. That's the Memento pattern.

:::

#### When to Use it

Use Memento when you need undo/redo functionality and want to capture state without exposing an object's internals.

It's also a good choice when taking a snapshot directly would break encapsulation by exposing private fields.

And it's helpful when you want the object that stores history to stay dumb: like holding snapshots without knowing or caring what's inside them.

### 7. The Observer Design Pattern

#### Real World Example

Think of subscribing to a YouTube channel. You don't sit there refreshing the page, checking if a new video has been uploaded. You subscribe once, and the moment the channel uploads something, you get notified automatically.

The channel doesn't know or care what each subscriber does with that notification. It just knows it has a list of subscribers, and when something changes, it tells all of them.

That's the Observer pattern. One object holds a list of dependents, and whenever its state changes, it notifies every one of them automatically.

#### Problems it solves:

- What if every subscriber had to keep checking the channel for updates? That would waste effort and add delay. The channel notifying its subscribers directly means they find out the moment it happens.
- What if the channel had to know exactly what each subscriber wanted to do with a new video? It shouldn't need to. The channel only calls `Notify()`, each subscriber decides for itself what that means.
- What if you wanted to add or remove subscribers at runtime? The channel doesn't need to change. It just keeps a list, and subscribing or unsubscribing only ever affects that list.

In simple terms, one object keeps a list of dependents and automatically notifies all of them whenever its own state changes.

Wikipedia describes it like this:

::: info "Observer pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The observer pattern is a software design pattern in which an object, named the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods."*

```component VPCard
{
  "title": "Observer pattern - Wikipedia",
  "desc": "In software design and software engineering, the observer pattern is a software design pattern in which an object, called the subject (also known as event source or event stream), maintains a list of its dependents, called observers (also known as event sinks), and automatically notifies them of any state changes, typically by calling one of their methods. The subject knows its observers through a standardized interface and manages the subscription list directly.",
  "link": "https://en.wikipedia.org/wiki/Observer_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`YouTubeChannel` is the subject: it keeps a list of `ISubscriber`s and notifies all of them whenever a video is uploaded. `Subscriber` is the concrete observer, deciding for itself what to do with that notification.

```cs :collapsed-lines
// The observer interface, every subscriber implements this
public interface ISubscriber
{
    void Notify(string channelName, string videoTitle);
}

// The concrete observer
public class Subscriber : ISubscriber
{
    private readonly string _name;

    public Subscriber(string name) => _name = name;

    public void Notify(string channelName, string videoTitle)
    {
        Console.WriteLine($"{_name}: {channelName} just uploaded '{videoTitle}'!");
    }
}

// The subject, keeps track of its subscribers and notifies them of changes
public class YouTubeChannel
{
    private readonly string _name;
    private readonly List<ISubscriber> _subscribers = new();

    public YouTubeChannel(string name) => _name = name;

    public void Subscribe(ISubscriber subscriber)   => _subscribers.Add(subscriber);
    public void Unsubscribe(ISubscriber subscriber) => _subscribers.Remove(subscriber);

    public void UploadVideo(string title)
    {
        Console.WriteLine($"{_name}: Uploaded '{title}'.");

        foreach (var subscriber in _subscribers)
        {
            subscriber.Notify(_name, title);
        }
    }
}
```

Now let's see it in action:

```cs
var channel = new YouTubeChannel("Code With Isaiah");

var alice = new Subscriber("Alice");
var bob   = new Subscriber("Bob");

channel.Subscribe(alice);
channel.Subscribe(bob);

channel.UploadVideo("Design Patterns Explained");

channel.Unsubscribe(bob);
channel.UploadVideo("Understanding the Observer Pattern");
//
// Code With Isaiah: Uploaded 'Design Patterns Explained'.
// Alice: Code With Isaiah just uploaded 'Design Patterns Explained'!
// Bob: Code With Isaiah just uploaded 'Design Patterns Explained'!
// Code With Isaiah: Uploaded 'Understanding the Observer Pattern'.
// Alice: Code With Isaiah just uploaded 'Understanding the Observer Pattern'!
```

Once Bob unsubscribed, he stopped hearing about new uploads entirely. The channel never singled him out, it just no longer had him on the list it notifies. That's the Observer pattern.

:::

#### When to Use it

Use Observer when a change to one object should automatically update an unknown number of others.

It's also useful when you want objects to stay loosely coupled: the subject only knows about an observer interface, never concrete details.

And it's a good option when the number of dependents can grow or shrink at runtime, such as subscribing and unsubscribing.

### 8. The State Design Pattern

#### Real World Example

Think of an online order moving through its lifecycle: pending, then shipped, then delivered. What "moving to the next step" actually means is different at every stage. From pending it means handing the package to a courier. From shipped it means marking it as received. From delivered, there's nowhere left to go. Rather than one giant method full of `if` checks for every possible stage, each stage can just know what comes after it.

That's the State pattern. The object's behaviour changes based on its current state, and each state knows how to transition to the next one.

#### Problems it solves:

- What if one method had to handle every stage with a long chain of conditionals? It would grow harder to follow every time a new stage was added. Giving each stage its own class keeps the logic for that stage self-contained.
- What if adding a new stage meant editing that same giant method? It's easy to introduce a bug in an unrelated stage while doing so. A new state is just a new class, dropped in alongside the others.
- What if the object needed to behave completely differently depending on where it was in its lifecycle? Delegating to the current state object means the context doesn't need to know the details. It just asks the current state what to do.

In simple terms, you let an object change its behaviour by changing which state object it's currently holding, so the object appears to change how it acts as its state changes.

Wikipedia describes it like this:

::: info "State pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The state pattern is a behavioral software design pattern that allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines."*

```component VPCard
{
  "title": "State pattern - Wikipedia",
  "desc": "The state pattern is a behavioral software design pattern that allows an object to alter its behavior when its internal state changes. This pattern is close to the concept of finite-state machines. The state pattern can be interpreted as a strategy pattern, which is able to switch a strategy through invocations of methods defined in the pattern's interface.",
  "link": "https://en.wikipedia.org/wiki/State_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`Order` is the context: it holds whatever `IOrderState` it's currently in and delegates to it. Each concrete state, `PendingState`, `ShippedState`, `DeliveredState`, knows what the next state should be.

```cs :collapsed-lines
// The state interface, every state implements this
public interface IOrderState
{
    void Next(Order order);
    string Name { get; }
}

// The context, delegates behaviour to whatever state it currently holds
public class Order
{
    public IOrderState State { get; set; } = new PendingState();

    public void Next()
    {
        Console.WriteLine($"Order is currently: {State.Name}");
        State.Next(this);
    }
}

// Concrete states, each knows what comes after it
public class PendingState : IOrderState
{
    public string Name => "Pending";

    public void Next(Order order) => order.State = new ShippedState();
}

public class ShippedState : IOrderState
{
    public string Name => "Shipped";

    public void Next(Order order) => order.State = new DeliveredState();
}

public class DeliveredState : IOrderState
{
    public string Name => "Delivered";

    public void Next(Order order)
    {
        Console.WriteLine("Order has already been delivered. Nothing left to do.");
    }
}
```

Now let's see it in action:

```cs
var order = new Order();

order.Next();
order.Next();
order.Next();
order.Next();
//
// Order is currently: Pending
// Order is currently: Shipped
// Order is currently: Delivered
// Order has already been delivered. Nothing left to do.
```

`Order` never checked "if pending, do this, if shipped, do that." It just asked its current state what to do next, and the state itself decided what came after. That's the State pattern.

:::

#### When to Use it

Use State when an object's behaviour depends on its state, and it must change that behaviour at runtime as the state changes.

It's also helpful when you have large conditional blocks that branch on the object's current state or type.

And choose it when transitions between states should be explicit and self-contained, rather than scattered across one big method.

### 9. The Strategy Design Pattern

#### Real World Example

Think of checking out of an online store. You can pay by credit card, or you can pay through PayPal. The shopping cart doesn't care which one you pick. It just knows the total, hands it to whichever payment method you chose, and lets that method handle the details of actually charging you. Swap the payment method, and the cart's own code never changes.

That's the Strategy pattern. An algorithm (in this case "how to pay") is pulled out into its own interchangeable object, and the client just picks which one to use.

#### Problems it solves:

- What if the cart had a big `if/else` for every payment method? Adding a new one would mean editing that method every time. Pulling each payment method out into its own class means the cart never needs to change.
- What if you wanted to swap the algorithm at runtime? A hardcoded method can't be swapped. A strategy object can simply be replaced with another one that implements the same interface.
- What if two different payment methods needed to share a common interface but nothing else? Each one implements the strategy interface, but its internal details (a card number here, an email there) stay private to it.

In simple terms, you pull an algorithm out into its own interchangeable object, so the class using it doesn't need to know or care which specific version is running.

Wikipedia describes it like this:

::: info "Strategy pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The strategy pattern is a behavioral software design pattern that enables selecting an algorithm at runtime."*

```component VPCard
{
  "title": "Strategy pattern - Wikipedia",
  "desc": "In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives runtime instructions as to which in a family of algorithms to use.",
  "link": "https://en.wikipedia.org/wiki/Strategy_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`ShoppingCart` is the context: it holds an `IPaymentStrategy` and delegates the actual payment to it. `CreditCardPayment` and `PayPalPayment` are concrete strategies, each a different way to pay.

```cs :collapsed-lines
// The strategy interface, every payment method implements this
public interface IPaymentStrategy
{
    void Pay(decimal amount);
}

// Concrete strategies, each a different way to pay
public class CreditCardPayment : IPaymentStrategy
{
    private readonly string _cardNumber;

    public CreditCardPayment(string cardNumber) => _cardNumber = cardNumber;

    public void Pay(decimal amount)
    {
        Console.WriteLine($"Charged ${amount} to credit card ending in {_cardNumber[^4..]}.");
    }
}

public class PayPalPayment : IPaymentStrategy
{
    private readonly string _email;

    public PayPalPayment(string email) => _email = email;

    public void Pay(decimal amount)
    {
        Console.WriteLine($"Charged ${amount} via PayPal account {_email}.");
    }
}

// The context, holds a strategy and delegates the actual payment work to it
public class ShoppingCart
{
    private readonly decimal _total;
    private IPaymentStrategy? _paymentMethod;

    public ShoppingCart(decimal total) => _total = total;

    public void SetPaymentMethod(IPaymentStrategy method) => _paymentMethod = method;

    public void Checkout()
    {
        if (_paymentMethod is null)
        {
            Console.WriteLine("No payment method selected.");
            return;
        }

        _paymentMethod.Pay(_total);
    }
}
```

Now let's see it in action:

```cs
var cart = new ShoppingCart(59.99m);

cart.SetPaymentMethod(new CreditCardPayment("4111 1111 1111 1111"));
cart.Checkout();

cart.SetPaymentMethod(new PayPalPayment("isaiah@example.com"));
cart.Checkout();
//
// Charged $59.99 to credit card ending in 1111.
// Charged $59.99 via PayPal account isaiah@example.com.
```

`ShoppingCart` never knew how a payment actually got processed. It just called `Pay()` on whatever strategy it was holding at the time. That's the Strategy pattern: the algorithm is swapped out, the class using it stays exactly the same.

:::

#### When to Use it

Use Strategy when you have several variants of an algorithm, and want to switch between them at runtime.

It's also helpful when you want to avoid a class full of conditionals that pick behaviour based on a type or flag.

And it's a solid choice when related classes only differ in the behaviour they use, and that behaviour should be interchangeable.

### 10. The Template Method Design Pattern

#### Real World Example

Think of making a hot drink, tea or coffee. Both follow the exact same basic steps: boil water, brew, pour into a cup, and add something to taste. What differs is only two of those steps: tea gets steeped, and coffee gets brewed through grounds. Tea gets lemon, and coffee gets sugar and milk. The overall recipe never changes, only the specific details of a couple of steps within it.

That's the Template Method pattern. A base class defines the fixed skeleton of an algorithm, and subclasses only fill in the steps that are actually allowed to vary.

#### Problems it solves:

- What if every beverage repeated the entire recipe from scratch? Boiling water and pouring into a cup would be duplicated in every single class. The template method keeps those steps in one place, written once.
- What if a subclass could reorder the steps, or skip one entirely? That would let each beverage break the overall recipe. Because the algorithm's skeleton lives in the base class as a single method, the order and structure stay fixed.
- What if you wanted to add a new beverage? Only the steps that differ, brewing and condiments, need to be written. Everything else is already handled by the base class.

In simple terms, you define the fixed skeleton of an algorithm in a base class, and let subclasses fill in only the steps that are actually allowed to differ.

Wikipedia describes it like this:

::: info "Template method pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"In object-oriented programming, the template method is one of the behavioral design patterns identified by Gamma et al. in the book Design Patterns. The template method is a method in a superclass, usually an abstract superclass, and defines the skeleton of an operation in terms of a number of high-level steps."*

```component VPCard
{
  "title": "Template method pattern - Wikipedia",
  "desc": "In object-oriented programming, the template method is one of the behavioral design patterns identified by Gamma et al. in the book Design Patterns. The template method is a method in a superclass, usually an abstract superclass, and defines the skeleton of an operation in terms of a number of high-level steps. These steps are themselves implemented by additional helper methods in the same class as the template method.",
  "link": "https://en.wikipedia.org/wiki/Template_method_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`Beverage` defines `Prepare()` as the template method: the fixed sequence of steps. `Tea` and `Coffee` only override `Brew()` and `AddCondiments()`, the two steps that are actually allowed to vary.

```cs :collapsed-lines
// The abstract class, defines the skeleton of the algorithm
public abstract class Beverage
{
    // The template method, the steps and their order never change
    public void Prepare()
    {
        BoilWater();
        Brew();
        PourInCup();
        AddCondiments();
    }

    private void BoilWater() => Console.WriteLine("Boiling water.");
    private void PourInCup() => Console.WriteLine("Pouring into cup.");

    // Steps left for subclasses to fill in
    protected abstract void Brew();
    protected abstract void AddCondiments();
}

// A concrete class, fills in the steps specific to tea
public class Tea : Beverage
{
    protected override void Brew() => Console.WriteLine("Steeping the tea bag.");
    protected override void AddCondiments() => Console.WriteLine("Adding lemon.");
}

// Another concrete class, fills in the steps specific to coffee
public class Coffee : Beverage
{
    protected override void Brew() => Console.WriteLine("Brewing the coffee grounds.");
    protected override void AddCondiments() => Console.WriteLine("Adding sugar and milk.");
}
```

Now let's see it in action:

```cs
Beverage tea    = new Tea();
Beverage coffee = new Coffee();

tea.Prepare();
Console.WriteLine();
coffee.Prepare();
//
// Boiling water.
// Steeping the tea bag.
// Pouring into cup.
// Adding lemon.
//
// Boiling water.
// Brewing the coffee grounds.
// Pouring into cup.
// Adding sugar and milk.
```

Both drinks boiled water and poured into a cup in exactly the same way, because `Prepare()` in the base class handled that. Only brewing and condiments changed, because those were the steps each subclass was actually responsible for. That's the Template Method pattern.

:::

#### When to Use it

Use Template Method when several classes share the same overall algorithm, but differ in a few specific steps.

It's a good choice when you want to enforce a fixed sequence of steps, while still letting subclasses customise parts of it.

And it's helpful when you want to avoid duplicating the parts of an algorithm that never change across every subclass.

### 11. The Visitor Design Pattern

#### Real World Example

Think of a shopping cart with different kinds of items: books and electronics, each taxed differently at checkout. You don't want to bake pricing logic into the `Book` and `Electronic` classes themselves, especially if you'll need other operations on them later too, like generating a shipping label or a warranty summary. Instead, each item just accepts a visitor and hands itself over. The visitor is the one that actually knows how to price a book differently from an electronic.

That's the Visitor pattern. The operation lives outside the objects it acts on, and each object just lets the visitor know what it needs to know: what type of thing it actually is.

#### Problems it solves:

- What if pricing logic was written directly inside `Book` and `Electronic`? Every new operation (tax, shipping, warranty) would mean editing both classes again and again. The visitor keeps each new operation in its own self-contained class instead.
- What if you needed to add a new operation without touching the existing item classes? Normally that means modifying every class the operation applies to. A new visitor is a new class, while `Book` and `Electronic` never change.
- What if a generic loop had to guess the concrete type of each item? That usually means a chain of type checks. `Accept()` calling `Visit(this)` lets the compiler pick the right overload automatically, without a single `if` or type check.

In simple terms, you move an operation out of the objects it acts on and into its own class. Each object just accepts a visitor and lets it know what concrete type it is.

Wikipedia describes it like this:

::: info "Visitor pattern" *From Wikipedia* (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> *"The visitor design pattern is a way of separating an algorithm from an object structure on which it operates."*

```component VPCard
{
  "title": "Visitor pattern - Wikipedia",
  "desc": "A visitor pattern is a software design pattern that separates the algorithm from the object structure. Because of this separation, new operations can be added to existing object structures without modifying the structures. It is one way to follow the open/closed principle in object-oriented programming and software engineering.",
  "link": "https://en.wikipedia.org/wiki/Visitor_pattern",
  "logo": "https://en.wikipedia.org/static/favicon/wikipedia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

::: tip Programming Example

`Book` and `Electronic` both implement `IItem` and simply call `visitor.Visit(this)`. `PricingVisitor` implements `IVisitor` with an overload for each concrete type, so the right pricing logic runs automatically.

```cs :collapsed-lines
// The element interface, every item in the cart implements this
public interface IItem
{
    void Accept(IVisitor visitor);
}

// Concrete elements, each accepts a visitor and hands itself over
public class Book : IItem
{
    public string Title { get; }
    public decimal Price { get; }

    public Book(string title, decimal price)
    {
        Title = title;
        Price = price;
    }

    public void Accept(IVisitor visitor) => visitor.Visit(this);
}

public class Electronic : IItem
{
    public string Name { get; }
    public decimal Price { get; }

    public Electronic(string name, decimal price)
    {
        Name  = name;
        Price = price;
    }

    public void Accept(IVisitor visitor) => visitor.Visit(this);
}

// The visitor interface, one Visit overload per concrete element
public interface IVisitor
{
    void Visit(Book book);
    void Visit(Electronic electronic);
}

// A concrete visitor, adds a new operation without touching Book or Electronic
public class PricingVisitor : IVisitor
{
    public decimal Total { get; private set; }

    public void Visit(Book book)
    {
        Console.WriteLine($"Book: {book.Title} — ${book.Price:F2} (no tax).");
        Total += book.Price;
    }

    public void Visit(Electronic electronic)
    {
        var priceWithTax = electronic.Price * 1.15m;
        Console.WriteLine($"Electronic: {electronic.Name} — ${priceWithTax:F2} (with 15% tax).");
        Total += priceWithTax;
    }
}
```

Now let's see it in action:

```cs
var cart = new List<IItem>
{
    new Book("Design Patterns", 45.00m),
    new Electronic("Headphones", 120.00m)
};

var pricingVisitor = new PricingVisitor();

foreach (var item in cart)
{
    item.Accept(pricingVisitor);
}

Console.WriteLine($"Total: ${pricingVisitor.Total:F2}");
//
// Book: Design Patterns — $45.00 (no tax).
// Electronic: Headphones — $138.00 (with 15% tax).
// Total: $183.00
```

Neither `Book` nor `Electronic` contained a single line of pricing logic. Each one only knew how to `Accept()` a visitor. `PricingVisitor` was the one that actually decided how each type gets priced. That's the Visitor pattern: the operation lives outside the object structure, not inside it.

:::

#### When to Use it

Use Visitor when you need to perform operations across a group of unrelated classes, without polluting each class with that logic.

It's also helpful when you want to add new operations often, but the object structure itself rarely changes.

And it's a good choice when you'd otherwise need type checks or casting to figure out what to do with each object in a collection.

---

## Conclusion

That covers all 23 classic design patterns across the three families: Creational, Structural, and Behavioral.

None of them are rules you must follow. They're answers to problems that show up again and again in software: how to create objects without hard-coding their exact type, how to compose bigger structures out of smaller ones, and how to let objects communicate without being tightly bound to each other.

A few things worth remembering:

- You won't use most of these patterns most of the time. Recognising *when a problem calls for one* is the actual skill. Forcing a pattern onto a problem that doesn't need it usually makes the code harder to follow, not easier.
- The real world analogies exist to build intuition, not to be taken literally. Once a pattern's shape clicks in a story you understand, spotting it in real code becomes far easier.
- Patterns compose. A Factory Method might produce objects that are themselves Decorators. A Composite tree might be built with a Builder. Real systems mix and layer patterns rather than using them in isolation.
- The language doesn't matter. Every example here is in C#, but the same shapes exist in Python, Java, TypeScript, Go, Rust, and beyond. If you understand the *problem* a pattern solves, translating it to any language is straightforward.

The goal isn't to memorise 23 names. It's to recognise the recurring problems underneath them, so that when one shows up in your own code, you already know a proven shape for solving it.

::: info "A Pattern Language" *From Christopher Alexander*

> *"Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice."*

:::

::: info

If this handbook was useful, the source lives at [<VPIcon icon="iconfont icon-github"/>`Clifftech123/design-patterns-handbook`](https://github.com/Clifftech123/design-patterns-handbook). Star it, fork it, or open a PR with a pattern you think is missing.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Design Patterns Handbook: Learn Popular Design Patterns with C# Code Examples",
  "desc": "Design patterns are reusable solutions to common problems in software design. Think of them as blueprints: not finished code, but proven templates you can adapt to solve a specific problem in your own",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-design-patterns-handbook-learn-popular-design-patterns-with-c-code-examples/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
