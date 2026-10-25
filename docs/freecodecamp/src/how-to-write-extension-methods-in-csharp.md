---
lang: en-US
title: "How to Write Extension Methods in C#"
description: "Article(s) > How to Write Extension Methods in C#"
icon: iconfont icon-csharp
category:
  - C#
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Extension Methods in C#"
    - property: og:description
      content: "How to Write Extension Methods in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-extension-methods-in-csharp.html
prev: /programming/cs/articles/README.md
date: 2024-10-31
isOriginal: false
author: Grant Riordan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730322390431/42cfe64d-0fce-4f36-a4f7-25e1e56267a4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Extension Methods in C#"
  desc="Extension methods are a fundamental part of C# and Object Oriented Programming (OOP). Extension methods in C# allow you to ”extend” existing types, including classes, interfaces, or structs, without modifying their original code. This is particularly..."
  url="https://freecodecamp.org/news/how-to-write-extension-methods-in-csharp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730322390431/42cfe64d-0fce-4f36-a4f7-25e1e56267a4.png"/>

Extension methods are a fundamental part of C# and Object Oriented Programming (OOP). Extension methods in C# allow you to "extend" existing types, including classes, interfaces, or structs, without modifying their original code.

This is particularly useful when you want to add new functionality to a type you don't own or can't change, like types from third-party libraries or built-in .NET types such as `string`, `List<T>`, and so on.

In this article, you’ll learn how to add extension methods to your classes, as well as third-party and system classes.

---

## How to Create DateTime Extension Methods

Let’s say we want some methods that can be used along with the existing `DateTime` class, perhaps a method that returns whether the given `DateTime` object is a weekend or something different.

Extension methods need to be defined in a static class because they are essentially syntactic sugar that allows you to call a static method as if it were an instance method on the type you're extending.

Extension methods need to be in a static class because:

1. **No Object Needed:** You don’t need to create an object to use an extension method. Since the method adds new functionality to an existing type (like `string`), it can work without needing an instance of the class.
2. **Organized Code:** Putting extension methods in a static class keeps things tidy. It allows you to group related methods, and you can easily include them in your code by using the appropriate namespace.

So, by using a static class, you can add useful methods to existing types without changing their original code, and you don’t need an object to call them.

First, let’s create a `DateTimeExtensions` static class.

```cs
public static class DateTimeExtensions {

}
```

This will encompass all the `DateTime` extensions we want to create.

```cs
public static bool IsWeekend(this DateTime date)
{
    return date.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
}
```

::: info Explanation:

- `public static bool IsWeekend`: This defines that it is a static method called `IsWeekend` which will return a `bool` value (true/false).
- `this DateTime date`: The `this` keyword as a method argument denotes that this method is an extension method. It means that the method will be an extension of the `DateTime` class.

:::

---

## How to Chain Same-Type Extension Methods

For an extension method to be chained with others, it typically needs to return the same type as the one it's extending (or a compatible type). This allows another method to be called on the result of the previous one.

```cs
using System.Globalization;

public static string ToTitleCase(this string str)
{
    return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str.ToLower());
}

public static string TrimAndAppend(this string str, string toAppend)
{
    return str.Trim() + toAppend;
}
```

In the above example, both the `ToTitleCase` and `TrimAndAppend` methods return a string value, meaning that we can chain the extension methods as below, which will convert the string to title-case before trimming all whitespace and appending the provided string.

Notice that we only provided the second parameter to the `TrimAndAppend` method, as the first parameter is the string having the extension method applied to (as explained previously, denoted by the `this` keyword).

```cs
var title = "hello world   "
    .ToTitleCase()
    .TrimAndAppend("!!");

// Output:
// Hello World!!
```

If the extension method returns a different type (not the original one or a compatible type), you cannot chain it. For example:

```cs
var date = new DateTime();
date.IsWeekend().AddDays(1);
```

For less obvious reasons, this will not work. When you chain methods, they do not chain from the original variable—they chain from the return type of the previous method call.

Here, we have a date called `IsWeekend()` which returns a Boolean. We then attempted to call `AddDays(1)` on a Boolean value which doesn’t exist, as it is a `DateTime` extension. The code compiler will fail to build, raising an error informing you of this.

### How to Return the Instance to Chain

In some extension methods, especially those for configuration (like Dependency Injection), you return the same instance to allow method chaining. This lets you continue working with the original object or its modified state across multiple calls, enabling a fluent interface.

Let’s take the example of a list of cars.

```cs
public static List<T> RemoveDuplicates<T>(this List<T> list)
{
    // Use Distinct to remove duplicates and update the list
    list = list.Distinct().ToList();

    // Return the modified list to allow method chaining
    return list;
}

public static List<T> AddRangeOfItems<T>(this List<T> list, IEnumerable<T> items)
{
    // Add a range of items to the list
    list.AddRange(items);

    // Return the modified list to allow method chaining
    return list;  
}
```

Now that we’ve returned the list from these extension methods, we can chain additional methods on the same list. For example, after removing duplicates with `RemoveDuplicates()`, we can immediately call `AddRangeOfItems()` on the same list.

So we can do something like:

```cs
var existingStock = new List<string> { "Ford", "Jaguar", "Ferrari", "Ford", "Renault" };

var availableBrands = existingStock
    .RemoveDuplicates()
    .AddRangeOfItems(new[] { "Lamborghini" }); // new stock available

Console.WriteLine("Brands Available Now: " + string.Join(", ", availableBrands));

// Output: Brands Available Now: Ford, Jaguar, Ferrari, Renault, Lamborghini
```

We removed duplicates from a list of car brands and added new stock to the same list. This works because `RemoveDuplicates` returns the list, enabling us to chain it with `AddRangeOfItems`.

If `RemoveDuplicates` returned `void` instead of the list, we wouldn't be able to chain the methods. It would still remove duplicates, but further actions like adding new stock, wouldn't be possible in the same expression.

We’d also have to update the `RemoveDuplicates` to update the list argument passed in, as `Distinct()` returns a new list which isn’t being returned as shown below, which I think you’ll agree is a lot more verbose.

```cs
public static void RemoveDuplicates<T>(this List<T> list)
{
    // Get the distinct elements and clear the original list
    var distinctItems = list.Distinct().ToList();
    list.Clear(); 

    // Add the distinct items back to the original list
    list.AddRange(distinctItems);
}
```

---

## Why Can’t I Just Add These Methods to My Class?

If the method is not a core part of the class’s functionality, placing it in an extension method can help keep the class focused and maintainable.

**Separation of Concerns**: Using extension methods keeps your code cleaner, and helps reduce complexity**.** It helps avoid bloating the class with methods that may not be used frequently.

**Enhancing External Libraries**: If you’re using a library or framework where you cannot modify the source code, extension methods allow you to add functionality to those types without altering their definitions.

Let’s say you’re using the `FileInfo` class from the `System.IO` namespace to work with files. You may want to add a method to easily check if a file is too large (for example, more than 1 GB), but you cannot modify the `FileInfo` class directly because it belongs to the System.IO namespace (that is, it's baked into .Net).

**Without an extension:**

```cs
var fileInfo = new FileInfo("myFile.txt");

if (fileInfo.Length > 1024 * 1024 * 1024) // filesize is bigger than 1GB
{
    Console.WriteLine("The file is too large.");
}
else
{
    Console.WriteLine("The file size is acceptable.");
}
```

**With Extension Method:**

You can make this more reusable by adding an extension method that checks whether the file is larger than 1 GB.

```cs title="FileInfoExtensions.cs"
public static class FileInfoExtensions
{
    //extension method, with default file size of 1GB (can be overriden)
    public static bool IsFileTooLarge(this FileInfo fileInfo, long sizeInBytes = 1024 * 1024 * 1024)
    {
        return fileInfo.Length > sizeInBytes;
    }
}
```

Now you can use the `IsFileTooLarge` method directly on `FileInfo` objects, making your code cleaner:

```cs
csharpCopy codevar fileInfo = new FileInfo("myFile.txt");

if (fileInfo.IsFileTooLarge())
{
    Console.WriteLine("The file is too large.");
}
else
{
    Console.WriteLine("The file size is acceptable.");
}
```

Extending third-party libraries and packages can make your code much more compatible.

**Better Organization & Readability**: You can organize extension methods into static classes based on functionality or context, making it easier to find and use them. This is certainly enhanced by allowing extension methods to be chained.

---

## When to Use Extensions

- **For Utility Methods:** If you have utility methods that are useful for a type but don’t belong directly in the type itself (for example, formatting, validation).
- **For Enhancing Built-In Types:** If you want to add functionality to built-in types (like `string` or `DateTime`) without modifying them.
- **When You Want to Keep Methods Optional:** If you want to provide additional methods that users can opt to use without forcing them to incorporate them into the main class design.

### Example Scenario

Imagine that you have a `Person` class, and you want to add a method to format the person's name nicely:

```cs title="Person.cs"
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

// Extension method in a static class
public static class PersonExtensions
{
    public static string GetFullName(this Person person)
    {
        return $"{person.FirstName} {person.LastName}";
    }
}
```

By using an extension method for `GetFullName`, you can keep the `Person` class simple and focused on its core responsibilities, while still providing useful functionality.

---

## When Not to Use Extension Methods

- **For Core Functionality:** If a method is essential to a class's core behavior, it should be part of the class itself, not an extension.
- **For Tight Coupling:** If the extension method requires intimate knowledge of the class's private state or needs regular access to its internal logic.
- **For Public APIs:** When designing a public-facing library or API, it's often better to include necessary methods directly in the class rather than forcing users to find or create their extension methods.

---

## Things to Consider When Designing Extensions

While extension methods are powerful and convenient in many cases, there are certain cons or situations where using them might not be the best choice:

### Hidden Behavior/Confusion

- Extension methods don't appear directly in the class definition, meaning that they can be harder to discover by developers who are unfamiliar with the available extensions.
- Developers need to know that these extension methods exist, or they might miss using them unless they are working in an IDE with features like IntelliSense (for example, Visual Studio, JetBrains Rider). These IDEs can suggest extension methods from other files or namespaces as they detect the appropriate type. Without a feature-rich IDE, the developer would have to be aware of the extension methods or find the folder they’re stored in.

### Can’t Access Private Members

- Extension methods can only access members (methods, properties, fields) that are public or internal.
- They cannot access private or protected members of a class because extension methods operate as if they are part of the class from the outside, similar to regular method calls from outside the class.

**Example:**

```cs title="Car"
public class Car
{
    private string engineNumber = "12345"; // Private field

    public string Brand { get; set; } = "Ford"; // Public property

    private void StartEngine() // Private method
    {
        Console.WriteLine("Engine started");
    }
}
```

```cs title="CarExtensions"
public static class CarExtensions
{
    public static void DisplayBrand(this Car car)
    {
        Console.WriteLine($"Brand: {car.Brand}"); // Accessing the public 'Brand' property
    }

    public static void TryAccessPrivateField(this Car car)
    {
        // Cannot access the private 'engineNumber'
        // This will result in a compile-time error.
        Console.WriteLine(car.engineNumber);
    }
}
```

### Code Duplication & Overuse

- In some cases, extension methods can encourage code duplication. If multiple projects or classes require similar extension methods, you might end up writing or copying the same extension methods in different places, making it harder to manage and update the code consistently.<br/>To avoid this, organize your code effectively. I would recommend keeping all extensions within an extensions folder or project, close to the origin (depending on the design patterns being used within your application).

- **Abuse of Extensions:** If used excessively, they can clutter the global space with methods that might not need to be global. This can cause pollution of the type’s API, making it harder to understand what’s core to the class versus what’s added via extensions.<br/>In some cases, it's better to encapsulate functionality in a separate helper classes or services rather than adding it via extension methods.

---

## Conclusion

Extension methods are useful for adding functionality in a clean and modular way, but they can also introduce confusion, namespace conflicts, and lack of access to private members.

As highlighted throughout the article, they have many usages and are certainly a very nice feature of the Dotnet framework when used effectively. They should be used when appropriate, but not as a substitute for functionality that belongs within the class itself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Extension Methods in C#",
  "desc": "Extension methods are a fundamental part of C# and Object Oriented Programming (OOP). Extension methods in C# allow you to ”extend” existing types, including classes, interfaces, or structs, without modifying their original code. This is particularly...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-write-extension-methods-in-csharp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
