---
lang: en-US
title: "The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface"
description: "Article(s) > The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface"
icon: fas fa-pen-ruler
category:
  - Dart
  - Flutter
  - C#
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - c#
  - cs
  - csharp
  - dotnet
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface"
    - property: og:description
      content: "The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-composite-design-pattern-work-with-individual-objects-and-groups-through-the-same-interface.html
prev: /academics/system-design/articles/README.md
date: 2026-09-10
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2b0e9823-e943-4665-bc01-4390cf5b6a01.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface"
  desc="Structural design patterns deal with how objects are created in terms of their structure and hierarchy. One of the patterns that explicitly helps you manage complex hierarchical scenarios is the Compo"
  url="https://freecodecamp.org/news/the-composite-design-pattern-work-with-individual-objects-and-groups-through-the-same-interface"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2b0e9823-e943-4665-bc01-4390cf5b6a01.png"/>

Structural design patterns deal with how objects are created in terms of their structure and hierarchy.

One of the patterns that explicitly helps you manage complex hierarchical scenarios is the Composite Design Pattern.

So what does this pattern really do?

Let me give you an example. You have a dataset and you want a common interface to be responsible for managing that dataset, ensuring one method is used for everything. You also want to allow a blueprint to manage this data and allow the data to grow as much as it can. This is a great fit for the Composite Design Pattern in object composition.

Here are some other clear use cases:

- A shopping cart contains individual items. It also has bundles of items sold together. Both need a price.
- A tax system has individual taxpayers. It also has family groups and corporate groups. All of them need tax calculated, discounts applied, and year-to-date totals computed.
- A file system has individual files. It also has folders that contain files or other folders. Both need a size.

The naïve approach is to write separate logic for individuals and groups, then add a type check wherever you need to handle both. But the logic diverges. The type checks multiply. And every new operation means updating both branches. The code becomes harder to extend and harder to trust.

The Composite Design Pattern eliminates this entirely. It defines a common interface that both individual objects and groups implement. The calling code never checks types. It calls the same method on a leaf or a composite and gets the correct result either way.

::: note Prerequisites

Before reading this article, you should be comfortable with:

- Object-oriented programming: abstract classes, interfaces, and inheritance
- What a design pattern is at a conceptual level
- Basic Dart or C# syntax

You don't need prior experience with structural design patterns. This article introduces the Composite pattern from first principles with real production examples.

:::

---

## What is the Composite Design Pattern?

The Composite Design Pattern is a structural design pattern. Where creational patterns deal with how objects are created and behavioral patterns deal with how objects communicate, structural patterns deal with how objects are composed and related to each other.

The Composite pattern specifically deals with part-whole hierarchies. It lets you compose objects into tree structures and then work with those trees as if every node in the tree is the same type of thing.

The core idea is deceptively simple: define a common interface, make individual objects implement it, and make groups of objects implement it too. Now everything in the hierarchy responds to the same methods and the calling code never needs to distinguish between a leaf and a composite.

This is what "treating individual objects and groups through a unified interface" means in practice. One method call, any object in the hierarchy, correct result regardless of whether you are calling it on a single item or a nested group containing hundreds of items.

---

## The Three Layers

The Composite pattern has three distinct layers. Understanding each one before looking at code makes the implementation much clearer.

### The Component Layer

This is the abstract class or interface that defines the contract for every object in the hierarchy. It declares the methods that both individual objects and groups must implement.

The Component is what makes uniform treatment possible: because everything in the hierarchy implements this interface, everything responds to the same method calls.

### The Leaf Layer

A Leaf is a concrete implementation of the Component. It represents an individual object with no children, like a single item in a shopping cart, a single taxpayer, or a single file. The Leaf implements the Component methods with its own specific logic.

### The Composite Layer

A Composite is also a concrete implementation of the Component. But unlike a Leaf, it holds a collection of children. Each child is a Component, which means each child can be either a Leaf or another Composite.

The Composite implements the Component methods by delegating to its children and aggregating the results.

The relationship between these layers is what enables the tree structure and the uniform interface simultaneously.

---

## Real World Example One: Shopping Cart Pricing

A shopping cart needs to calculate prices. Individual items have their own prices. Bundles group multiple items and their price is the sum of their contents. Both need to respond to `getPrice()`.

### The Component

```cs
abstract class PriceComponent {
  double getPrice();
}
```

`PriceComponent` is the contract. Every object in the cart hierarchy must implement `getPrice()`. That is the entire interface: one method that's uniform across all objects.

### The Leaf

```cs
class CartItem extends PriceComponent {
  final int id;
  final String name;
  final double price;

  CartItem({required this.id, required this.name, required this.price});

  @override
  double getPrice() {
    return price;
  }
}
```

`CartItem` is the Leaf. It represents a single item in the cart. Its `getPrice()` returns its own price directly. There's no delegation or children. Just its own value.

### The Composite

```cs
class ItemBundle extends PriceComponent {
  final int bundleId;
  final String bundleName;
  final List<PriceComponent> _items = [];

  ItemBundle({required this.bundleId, required this.bundleName});

  void add(PriceComponent component) {
    _items.add(component);
  }

  void remove(PriceComponent component) {
    _items.remove(component);
  }

  @override
  double getPrice() {
    return _items.fold(0, (total, item) => total + item.getPrice());
  }
}
```

`ItemBundle` is the Composite. It holds a list of `PriceComponent` children. Its `getPrice()` delegates to its children using `fold`, summing up whatever each child returns.

The critical detail: `_items` is a `List<PriceComponent>`, not a `List<CartItem>`. This means an `ItemBundle` can contain both `CartItem` leaves and other `ItemBundle` composites. The hierarchy can nest as deeply as needed.

### Using It

```dart
void main() {
  
  final burger = CartItem(id: 1, name: 'Burger', price: 5.99);
  final fries = CartItem(id: 2, name: 'Fries', price: 2.99);
  final drink = CartItem(id: 3, name: 'Drink', price: 1.99);
  final apple = CartItem(id: 4, name: 'Apple', price: 0.99);

 
  final comboMeal = ItemBundle(bundleId: 1, bundleName: 'Combo Meal');
  comboMeal
    ..add(burger)
    ..add(fries)
    ..add(drink);


  final cart = ItemBundle(bundleId: 0, bundleName: 'My Cart');
  cart
    ..add(comboMeal) 
    ..add(apple);
      // same method call on everything
  print('Burger: \$${burger.getPrice()}');           
  print('Combo Meal: \$${comboMeal.getPrice()}');    
  print('Full Cart: \$${cart.getPrice()}');          
}
```

`burger.getPrice()` calls the Leaf implementation directly. `comboMeal.getPrice()` calls the Composite implementation which delegates to its three children. `cart.getPrice()` calls the Composite implementation which delegates to the `combo meal` composite and the `apple` leaf.

The calling code treats all of them identically: `getPrice()`, result, done.

---

## Real World Example Two: Tax Management

This example shows the Composite pattern applied to a more complex domain. A tax management system needs to calculate tax amounts, apply discounts, and compute year-to-date totals. These calculations need to work for individual taxpayers and for groups of taxpayers through exactly the same interface.

### The Component

```dart
abstract class TaxManager {
  num getTaxAmount();
  num getTaxDiscount();
  num getTotalTaxYTD();
}
```

`TaxManager` defines three methods. Every object in the tax hierarchy must implement all three. A single taxpayer implements them with their own data. A group implements them by aggregating across all members. The calling code calls any of these methods on any object and gets the correct result.

### The Leaf

```dart
class SingleUser extends TaxManager {
  final num _amount;
  final List<num> _allTaxes;

  SingleUser(this._amount, this._allTaxes);

  @override
  num getTaxAmount() {
    return _amount;
  }

  @override
  num getTaxDiscount() {
   
    return _amount % 2 == 0 ? _amount : (_amount / 2);
  }

  @override
  num getTotalTaxYTD() {
    num total = 0;
    for (final tax in _allTaxes) {
      total += tax;
    }
    return total;
  }
}
```

`SingleUser` is the Leaf. It represents one individual taxpayer. `_amount` is their current tax amount. `_allTaxes` is a list of their tax payments over the year. Each method operates on this person's data only.

`getTaxDiscount()` applies a simple discount rule: even amounts receive the full amount, odd amounts receive half. This rule lives on the individual and is automatically propagated through any group that contains this user.

`getTotalTaxYTD()` sums the user's historical tax payments to produce their year-to-date total.

### The Composite

```dart :collapsed-lines
class UserGroup extends TaxManager {
  final String groupName;
  final List<TaxManager> _members = [];

  UserGroup(this.groupName);

  void add(TaxManager member) {
    _members.add(member);
  }

  void remove(TaxManager member) {
    _members.remove(member);
  }

  @override
  num getTaxAmount() {
    return _members.fold(0, (total, member) => total + member.getTaxAmount());
  }

  @override
  num getTaxDiscount() {
    return _members.fold(0, (total, member) => total + member.getTaxDiscount());
  }

  @override
  num getTotalTaxYTD() {
    return _members.fold(0, (total, member) => total + member.getTotalTaxYTD());
  }
}
```

`UserGroup` is the Composite. It holds a list of `TaxManager` members. Each method delegates to every member and folds the results.

Notice that `_members` is typed as `List<TaxManager>`, not `List<SingleUser>`. This means a `UserGroup` can contain individual `SingleUser` leaves or other `UserGroup` composites. A family group can contain individual members. A corporate group can contain family groups. The hierarchy can grow as needed and the interface never changes.

### Using It

```dart :collapsed-lines
void main() {
  
  final seyisTax = SingleUser(100000, List.generate(12, (_) => 20000));
  final ronkesTax = SingleUser(5000, List.generate(12, (_) => 50000));
  final inisTax = SingleUser(20000, List.generate(12, (_) => 20000));
  final tiwasTax = SingleUser(10000, List.generate(12, (_) => 10000));

 
  print('Seyi tax amount: ${seyisTax.getTaxAmount()}');       
  print('Ronke tax amount: ${ronkesTax.getTaxAmount()}');     
  print('Seyi discount: ${seyisTax.getTaxDiscount()}');        
  print('Seyi YTD: ${seyisTax.getTotalTaxYTD()}');        
    // build a family group
  final fatunmoles = UserGroup('Fatunmoles');
  fatunmoles
    ..add(seyisTax)
    ..add(ronkesTax)
    ..add(inisTax)
    ..add(tiwasTax);

 
  
  print('Total tax: ${fatunmoles.getTaxAmount()}');      
  print('Total discount: ${fatunmoles.getTaxDiscount()}'); 
  print('Total YTD: ${fatunmoles.getTotalTaxYTD()}');
    // a second family group
  final child1 = SingleUser(100000, List.generate(12, (_) => 20000));
  final child2 = SingleUser(100000, List.generate(12, (_) => 20000));
  final child3 = SingleUser(100000, List.generate(12, (_) => 20000));

  final unknownFamily = UserGroup('UnknownFamily');
  unknownFamily
    ..add(child1)
    ..add(child2)
    ..add(child3);


  print('Tax: ${unknownFamily.getTaxAmount()}');
  print('Discount: ${unknownFamily.getTaxDiscount()}');
  print('YTD: ${unknownFamily.getTotalTaxYTD()}');
}
```

The same three method calls work on `seyisTax` (one person), `fatunmoles` (four people), and `unknownFamily` (three people). The calling code is identical. The results are correct for each level of the hierarchy.

---

## The Power of Nested Composites

The most powerful aspect of the Composite pattern is that a Composite can contain other Composites. A `UserGroup` can contain other `UserGroup` objects. This enables deep hierarchies while maintaining the same uniform interface at every level.

```dart
void demonstrateNesting() {
  
  final seyi = SingleUser(100000, List.generate(12, (_) => 20000));
  final ronke = SingleUser(5000, List.generate(12, (_) => 50000));
  final ini = SingleUser(20000, List.generate(12, (_) => 20000));
  final tiwa = SingleUser(10000, List.generate(12, (_) => 10000));

  final child1 = SingleUser(100000, List.generate(12, (_) => 20000));
  final child2 = SingleUser(100000, List.generate(12, (_) => 20000));
  final child3 = SingleUser(100000, List.generate(12, (_) => 20000));

  // family groups
  final fatunmoles = UserGroup('Fatunmoles');
  fatunmoles
    ..add(seyi)
    ..add(ronke)
    ..add(ini)
    ..add(tiwa);

  final unknownFamily = UserGroup('UnknownFamily');
  unknownFamily
    ..add(child1)
    ..add(child2)
    ..add(child3);

  // a composite that contains other composites
  // both families treated as one unit
  final allFamilies = UserGroup('AllFamilies');
  allFamilies
    ..add(fatunmoles)    
    ..add(unknownFamily); 

  // same interface, now covers all 7 people across both families
  print('All families combined:');
  print('Total tax: ${allFamilies.getTaxAmount()}');
  print('Total discount: ${allFamilies.getTaxDiscount()}');
  print('Total YTD: ${allFamilies.getTotalTaxYTD()}');
}
```

`allFamilies.getTaxAmount()` traverses the entire tree: it asks `fatunmoles` for its total, which asks each of its four members, and asks `unknownFamily` for its total, which asks each of its three members. Seven people, one method call. The caller doesn't know the depth of the tree or how many members exist at any level.

This is where the pattern demonstrates its full value. You can build an organization with divisions, departments, teams, and individuals, all implementing the same `TaxManager` interface, and call `getTaxAmount()` on the organization to get the total for every single person in it. Or call it on a single department. Or call it on a single person. The interface is always the same.

---

## The Composite Pattern in C#

The same pattern in C# shows that this is a universal structural principle. Here is the tax management system replicated in C# for a corporate payroll context.

### The Component

```cs
public interface ITaxManager
{
    decimal GetTaxAmount();
    decimal GetTaxDiscount();
    decimal GetTotalTaxYTD();
}
```

### The Leaf

```cs
public class Employee : ITaxManager
{
    private readonly string _name;
    private readonly decimal _taxAmount;
    private readonly List<decimal> _yearlyTaxes;

    public Employee(string name, decimal taxAmount, List<decimal> yearlyTaxes)
    {
        _name = name;
        _taxAmount = taxAmount;
        _yearlyTaxes = yearlyTaxes;
    }

    public decimal GetTaxAmount() => _taxAmount;

    public decimal GetTaxDiscount()
    {
        return _taxAmount % 2 == 0 ? _taxAmount : _taxAmount / 2;
    }

    public decimal GetTotalTaxYTD()
    {
        return _yearlyTaxes.Sum();
    }
}
```

### The Composite

```cs
public class Department : ITaxManager
{
    private readonly string _name;
    private readonly List<ITaxManager> _members = new();

    public Department(string name)
    {
        _name = name;
    }

    public void Add(ITaxManager member) => _members.Add(member);
    public void Remove(ITaxManager member) => _members.Remove(member);

    public decimal GetTaxAmount()
    {
        return _members.Sum(m => m.GetTaxAmount());
    }

    public decimal GetTaxDiscount()
    {
        return _members.Sum(m => m.GetTaxDiscount());
    }

    public decimal GetTotalTaxYTD()
    {
        return _members.Sum(m => m.GetTotalTaxYTD());
    }
}
```

### Using It in C#

```cs

var alice = new Employee("Alice", 150000, Enumerable.Repeat(25000m, 12).ToList());

var bob = new Employee("Bob", 80000, Enumerable.Repeat(15000m, 12).ToList());

var carol = new Employee("Carol", 120000, Enumerable.Repeat(20000m, 12).ToList());

var dave = new Employee("Dave", 95000, Enumerable.Repeat(18000m, 12).ToList());


var engineering = new Department("Engineering");
engineering.Add(alice);
engineering.Add(bob);


var design = new Department("Design");
design.Add(carol);
design.Add(dave);


var company = new Department("TechCorp");
company.Add(engineering);
company.Add(design);


Console.WriteLine($"Alice tax: {alice.GetTaxAmount()}");
Console.WriteLine($"Engineering total: {engineering.GetTaxAmount()}");

// entire company — traverses all departments and all employees
Console.WriteLine($"Company total tax: {company.GetTaxAmount()}");
Console.WriteLine($"Company total discount: {company.GetTaxDiscount()}");
Console.WriteLine($"Company YTD: {company.GetTotalTaxYTD()}");
```

The structure is identical to the Dart implementation. `ITaxManager` is the Component, `Employee` is the Leaf, and `Department` is the Composite. The hierarchy nests: a `Department` of `Departments` forms the company. The calling code calls the same three methods on any node in the tree and gets the correct aggregated result.

This is the same pattern solving the same problem in a different language. The structural principle is universal.

---

## When to Use the Composite Pattern

Use the Composite pattern when you have a part-whole hierarchy where both parts and wholes need to be treated uniformly.

It's also a good choice when the calling code shouldn't need to distinguish between individual objects and groups. If you find yourself writing writing conditional statements to check if an object is a group or single frequently, that's a signal that Composite would eliminate those branches.

It's helpful when the hierarchy needs to be flexible and deeply nestable. File systems, organizational charts, UI component trees, category hierarchies, tax systems, or shopping carts with bundles: any domain where containers can hold other containers benefits from Composite.

And it's useful when new types of leaves or composites might be added in the future. Because everything implements the same Component interface, adding a new type of leaf (a `CorporateTaxpayer` alongside `SingleUser`) or a new type of composite (a `TaxBracketGroup`) means creating one new class. The calling code and all existing classes remain unchanged.

---

## When Not to Use It

Avoid Composite when the hierarchy is simple and unlikely to nest. If you have individual items and exactly one level of grouping with no nesting, the pattern adds abstraction that a simpler approach would not require.

It's also not a good choice when individual objects and groups genuinely need different interfaces. If groups need many additional methods that individuals never need, forcing them into the same interface creates an interface that's too broad and violates the Interface Segregation Principle.

Avoid it when performance is critical and the overhead of recursive traversal matters. Deep hierarchies with millions of nodes traversed frequently might benefit from a different approach that caches aggregated results.

---

## Conclusion

The Composite Design Pattern solves a fundamental problem in hierarchical systems: how do you perform the same operation on both individual objects and groups of objects without writing two separate implementations or littering your code with type checks?

The answer is a common interface. Every object in the hierarchy implements the same contract. Individual objects implement it with their own data. Groups implement it by delegating to their children and aggregating the results. The calling code calls the same method and gets the correct answer regardless of whether it's talking to a leaf or a composite containing a hundred nested levels.

The shopping cart example shows this for pricing: one `getPrice()` method, called identically on a single item or a bundle containing other bundles. The tax management example shows this for a domain with multiple operations: `getTaxAmount()`, `getTaxDiscount()`, and `getTotalTaxYTD()` called identically on a single taxpayer, a family group, or a composite of family groups.

The nested composite demonstration shows the full power: a `UserGroup` containing other `UserGroups`, each containing `SingleUsers`, all responding to the same interface and producing correct aggregated results at every level. Seven people, one method call. The tree is traversed automatically.

C# shows the same principle in a corporate payroll context: employees as leaves, departments as composites, and the company as a composite of departments. One interface, any level of the hierarchy. Correct result every time.

The Composite pattern doesn't eliminate complexity. It contains it. The complexity of aggregating results across a deep hierarchy lives inside the Composite's `fold` calls, not scattered across the calling code. The calling code stays clean. The hierarchy stays flexible. New types can be added without changing anything that already exists.

That's the structural discipline the Composite pattern provides.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Composite Design Pattern: How to Work with Individual Objects and Groups Through the Same Interface",
  "desc": "Structural design patterns deal with how objects are created in terms of their structure and hierarchy. One of the patterns that explicitly helps you manage complex hierarchical scenarios is the Compo",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-composite-design-pattern-work-with-individual-objects-and-groups-through-the-same-interface.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
