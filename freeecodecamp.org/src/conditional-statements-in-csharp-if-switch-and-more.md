---
lang: en-US
title: "How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code"
description: "Article(s) > How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code"
icon: iconfont icon-csharp
category: 
  - C#
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - csharp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code"
    - property: og:description
      content: "How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/conditional-statements-in-csharp-if-switch-and-more.html
prev: /articles/README.md
date: 2024-10-22
isOriginal: false
author: Grant Riordan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729432206658/e802fcca-bf0c-424f-9915-b02fd847bdcc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code"
  desc="Being able to update variables, call particular branches of code, or simply output different code based on a certain condition is a vital part of programming in any language. C# (C Sharp) offers multiple ways to do these things, and I’m about to show..."
  url="https://freecodecamp.org/news/conditional-statements-in-csharp-if-switch-and-more"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729432206658/e802fcca-bf0c-424f-9915-b02fd847bdcc.png"/>

Being able to update variables, call particular branches of code, or simply output different code based on a certain condition is a vital part of programming in any language.

C# (C Sharp) offers multiple ways to do these things, and I’m about to show you some of the most common ones. We’ll discuss the pros and cons of each method, and which ones are more suited for particular scenarios.

---

## What You Will Learn In This Article

I will teach you all about the following conditional coding mechanisms within C#.

- If / Else If / Else statements
- Ternary statements
- Switch-Case statements
- Analysing performance of conditional coding options

::: note prerequisites

- Very basic knowledge of the C# coding language
- Coding IDE (to code along if you wish)

:::

---

## If / Else if / Else Statements

When first learning a new programming language, the `if` statement is a staple in any developer’s learning syllabus. It’s the easiest way in which you can conditionally route the flow of your code’s execution.

Let’s take a look at building up the complexity of the the `if` statement syntax. In its most basic form, you can use it as a simple `if` clause, meaning the code within the `if` block will only be executed if a condition is met.

**Example:**

```cs
// For the demo we're using a hard coded age.
int age = 22;

//check person is of legal age in the UK
if (!string.IsNullOrEmpty(age) && age >= 18)
{
   // If true, run the following code
   AllowAccessToNightClub();
}
```

Going one step further, if we wanted to carry out some code where the statement results in `false`, we can do that using an `if / else` statement like so:

```cs
var ageLimit = 18;
var customersAge = 17

if(customersAge >= ageLimit){
{   
    AllowAccessToTheClub();
} else{
    // Deny Access
    DenyAccess();
    // we can also nest if statements
    // if the customer doesn't leave call the Police!
    if(!CustomerLeaves()){
        CallThePolice();
    };
}
```

The above example illustrates how you can use `if / else` statements to control your flow of code. You’ve seen how you can handle specific scenarios with nested statements, allowing you to check future outcomes.

In the above code, we are checking if `CustomerLeaves()` returns a true or false value, and depending on the outcome, we see whether we need to `CallThePolice()` or not.

For situations where you want to check more than one condition before defaulting to `else`, you can use the `if / else if / else` syntax. Let's see how it works:

```cs
int age = 17;

if(age >= 18){
    Console.WriteLine("You can drink alcohol in the UK");
    Console.WriteLine("You can vote in the UK");
    Console.WriteLine("You can get a tattoo");
} else if(age >= 16 && age < 18){
    Console.WriteLine("You can join the royal forces in the UK");
} else{
   Console.WriteLine("Stay in School!");
}
```

The example above uses `if / else if / else` to display different text based on which condition is met. Only one block will ever run, as you can only match a single condition with this syntax.

Let’s say you wanted to build a stringup based on multiple conditions, but you wanted all conditions to be checked individually. In that case, you could utilise multiple `if statements` to accomplish this. Be aware, though, that this can make your code less performant and harder to read.

```cs
using System.Text;

int age = 20;
bool hasDrivingLicense = true;
bool hasVoterID = false;

var builder = new StringBuilder();

// Multiple independent if statements
if (age >= 18)
{
    builder.Append("You are an adult.");
}

if (hasDrivingLicense)
{
    builder.Append("You can drive.");
}

if (hasVoterID)
{
    builder.Append("You are eligible to vote.");
}

Console.WriteLine(builder.ToString());
Console.WriteLine(builder.ToString());
/* Output
You are an adult.You can drive.
*/
```

The above code demonstrates using multiple `if` statements instead of `if`, `else if`, `else`. This allows multiple conditions to be checked independently, so multiple code blocks can run if the conditions are met. This is useful when wanting to assign values to an object’s properties based on different criteria or independent conditions.

---

## Replacing If / Else with Ternary Operator

`If / Else` statements are very useful, but sometimes they can take up a lot of space for really simple assignment code. The **ternary operator** is perfect for these situations. Its syntax uses `?` and `:` to represent what happens if the condition is true or false, eliminating the need for brackets.

Here’s an example:

```cs
var backgroundColor = isDarkMode ? "black" : "white";
```

**Explanation:**

- `backgroundColor`: The variable being assigned.
- `isDarkMode`: A boolean condition being evaluated.
- `?`: Marks the start of the ternary operator. If `isDarkMode` is `true`, the value after `?` ("black") is assigned.
- `:`: Separates the true case from the false case. If `isDarkMode` is `false`, the value after `:` ("white") is assigned.

The ternary statement is shorthand for simple conditional assignments, making your code more compact. I would recommend using it for simple variable assignment or simple binary calling of functions (like call A or call B).

Here’s an example:

```cs
isLoggedIn ? ShowWelcomeMessage() : PromptLogin();

void ShowWelcomeMessage()
{
    Console.WriteLine("Welcome back, user!");
}

void PromptLogin()
{
    Console.WriteLine("Please log in to continue.");
}
```

Ternary operations can be nested also like so:

```cs
var isDarkMode = true;
var isAccessibilityActive = true;

var backgroundColor = isDarkMode ? isAccessibilityActive ? "green" : "black" : "white";

Console.WriteLine(backgroundColor);
```

The above example uses nested ternary operators to replace a nested if / else statement. Just keep in mind that the flow is different from a regular ternary operation. It would read like this:

```cs
IF isDarkMode is true, then check if isAccessibilityActive is true

IF isAccessibility is true, set the value to “green” otherwise return “black”

IF isDarkMode is false it will skip the inner checks, and return “white”;
```

I’d avoid using nested ternary operators where you can, as they’re messy and can be difficult to read.

---

## Switch Case Statements

Switch case statements work by testing a variable (*switch*) against multiple possibilities (*case*).

```cs
string userRole = "Admin";

// check the user role against following criteria.
switch (userRole)
{
    case "Admin":
        Console.WriteLine("You have full access.");
        break;
    case "Moderator":
        Console.WriteLine("You can moderate content.");
        break;
    case "User":
        Console.WriteLine("You have limited access.");
        break;
    default:
        Console.WriteLine("Role not recognised.");
        break;
}
```

::: note the value and type of variable being evaluated must match.

For example, you can’t compare a string with a integer (without casting / parsing first)*.* If none of the cases match, the `default` block is executed, similar to the `else` in an `if/else` structure, usually used for a fallback case.

:::

### Why Use Switch-Case Over If Statement?

- **Readability**: When handling **multiple distinct values** (like roles, commands, or enum types), `switch` is easier to read and maintain because it organises conditions more cleanly, without multiple `if` and `else if` blocks.
- **Performance**: In some cases, **switch** statements can be more efficient than multiple `if / else if` blocks, especially when dealing with multiple possible values of a single variable. Some compilers optimise `switch` statements into lookup tables, improving performance
- **Scalability**: When managing a long list of distinct options or conditions, a `switch` case scales better. Adding new cases is simpler and doesn't involve updating long chains of `if / else if`.
- **Clean Defaults**: The `default` case provides a clear way to handle unrecognised or unexpected scenarios, similar to the `else` block in an `if / else if` statement, but it feels more naturally integrated with the `switch` structure. This can be handy for throwing exceptions, logging, and so on.

### Switch Statements - Expression Syntax

There are times where you need slightly more complex conditions to be evaluated yet still wish to utilise the `switch` syntax. In this scenario you can utilise the `switch expression` syntax which was introduced in C# 8.

```cs
string userType = "VIP";
decimal purchaseAmount = 500m;

decimal discount = userType switch
{
    "Regular" when purchaseAmount < 100 => 0.05m,  
    "Regular" => 0.10m,  
    "VIP" when purchaseAmount < 500 => 0.15m,  
    "VIP" => 0.20m,  
    "Employee" => 0.25m,  
    _ => 0m 
};

Console.WriteLine($"Your discount is: {discount * 100}%");
```

This syntax is great when needing to assign a value to the outcome of the case.

- `userType switch { ... }`: a **switch expression** that returns a value (in this case, the discount) based on the `userType` and optional conditions (like `purchaseAmount`).
- The `when` clause allows for more complex conditions, such as checking the `purchaseAmount` in addition to the `userType` to alter the discount amount.

**Default Case / Fallback**

The default case in this syntax uses the `_` character. In our example, if none of the above cases are met, the default case is met and we return `0m` (no discount).

### Benefits of Switch Expressions Over Conventional `switch` Statements

- **Concise and Readable:** The switch expression is more **compact** and **readable**, especially when returning values directly based on conditions, without needing to declare variables or use `break` statements.
- **Pattern Matching:** It supports **pattern matching** (`when`), making it easier to add complex conditions to each case, something that would require more verbose `if` checks in a traditional switch statement.
- **Returns a Value**: The switch expression is an **expression** that directly returns a value, making it ideal for assignments or inline use, reducing boilerplate code. Below, you’ll find an example using a switch expression as the return value in a method without assigning it to a variable.
- **Simplifies Complex Logic**: It's excellent for scenarios like this one, where multiple conditions affect the outcome, handling them concisely without deeply nested `if / else if` blocks.

```cs
decimal CalculateDiscount(string userType, decimal purchaseAmount) =>
    userType switch
    {
        "Regular" when purchaseAmount < 100 => 0.05m,
        "Regular" => 0.10m,
        "VIP" when purchaseAmount < 500 => 0.15m,
        "VIP" => 0.20m,
        "Employee" => 0.25m,
        _ => 0m
    };

// Usage
decimal discount = CalculateDiscount("VIP", 500m);
Console.WriteLine($"Your discount is: {discount * 100}%");
```

---

## Performance Summary

To help you decide, here are is a quick Benchmarking project (using BenchmarkDotNet package, which you can install with `dotnet add package BenchmarkDotnet`):

```cs :collapsed-lines
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Order;
using System.Collections.Generic;

namespace Csharp_Console_Playground
{
    [MemoryDiagnoser]
    [Orderer(SummaryOrderPolicy.FastestToSlowest)]
    public class BenchMarkRunner
    {
        private static readonly Dictionary<int, string> RankingMessages = new()
        {
            { 0, "Do not stay in this hotel" },
            { 1, "It's cheap and cheerful" },
            { 2, "It's clean and tidy" },
            { 3, "In the middle hotel, good service and great amenities" },
            { 4, "It's a nice hotel, but the price is not too high" },
            { 5, "It's the best hotel in the area" }
        };

        private int ranking = 5;

        [Benchmark]
        public string BenchMarkIfElse()
        {
            var winningMessage = "";

            if (ranking == 0)
            {
                winningMessage = "Do not stay in this hotel";
            }
            else if (ranking == 1)
            {
                winningMessage = "It's cheap and cheerful";
            }
            else if (ranking == 2)
            {
                winningMessage = "It's clean and tidy";
            }
            else if (ranking == 3)
            {
                winningMessage = "In the middle hotel, good service and great amenities";
            }
            else if (ranking == 4)
            {
                winningMessage = "It's a nice hotel, but the price is not too high";
            }
            else if (ranking == 5)
            {
                winningMessage = "It's the best hotel in the area";
            }

            return winningMessage;
        }

        [Benchmark]
        public string BenchMarkSwitchCaseExpression()
        {
            var winningMessage = ranking switch
            {
                0 => "Do not stay in this hotel",
                1 => "It's cheap and cheerful",
                2 => "It's clean and tidy",
                3 => "In the middle hotel, good service and great amenities",
                4 => "It's a nice hotel, but the price is not too high",
                5 => "It's the best hotel in the area",
                _ => ""
            };

            return winningMessage;
        }

        [Benchmark]
        public string BenchMarkSwitchCase()
        {
            var winningMessage = "";
            switch (ranking)
            {
                case 0:
                    winningMessage = "Do not stay in this hotel";
                    break;
                case 1:
                    winningMessage = "It's cheap and cheerful";
                    break;
                case 2:
                    winningMessage = "It's clean and tidy";
                    break;
                case 3:
                    winningMessage = "In the middle hotel, good service and great amenities";
                    break;
                case 4:
                    winningMessage = "It's a nice hotel, but the price is not too high";
                    break;
                case 5:
                    winningMessage = "It's the best hotel in the area";
                    break;
                default:
                    winningMessage = "Invalid ranking";
                    break;
            }

            return winningMessage;
        }

        [Benchmark]
        public string? BenchMarkDictionary()
        {
            return RankingMessages.TryGetValue(ranking, out var rankingMessage) ? rankingMessage : null;
        }
    }
}
```

You can then run these tests in your `Program.cs`:

```cs title="Program.cs"
using BenchmarkDotNet.Running;
using Csharp_Console_Playground;

BenchmarkRunner.Run<BenchMarkRunner>();
```

Make sure you use your `Release` build profile in order to run the benchmarks.

```sh
dotnet build -c Release
```

then execute `dotnet` on your build location, for example:

```sh
dotnet bin/Release/net8.0/FCC-Conditions.dll
```

**Results:**

| **Method** | Mean (execution time in [<VPIcon icon="fa-brands fa-wikipedia-w"/>ns](https://en.wikipedia.org/wiki/Nanosecond)) |
| :--- | :---: |
| BenchMarkSwitchCaseExpression | 0.0000 ns |
| BenchMarkSwitchCase | 0.0003 ns |
| BenchMarkIfElse | 0.3628 ns |
| BenchMarkDictionary | 2.6356 ns |

`switch` statements can be faster than dictionaries because the compiler helps optimise them. When the compiler sees a `switch`, it can create a special lookup table (jump table, or binary search tree) that allows it to find the right case quickly, especially when the cases are close together (like numbers 1, 2, and 3). This means it can check the value almost instantly.

The reason the dictionary is the slowest is due to memory allocation. Within our bench mark test, we needed to create an in-memory variable for the dictionary to be created and stored (time consuming), and then retrieval also needs to be carried out when doing the lookup.

#### Switch-Case Expressions

**Compile-Time Optimisation**: Switch cases are typically optimised at **compile-time** (when you build your code). The compiler analyses the possible case values and generates efficient machine code to handle them. Depending on the cases, this could be via jump tables, or branching / binary search mechanisms.

Since this is all done during **compilation**, the switch statement has no additional overhead at runtime beyond what the compiler has set up.

#### Dictionaries

**Runtime Construction**: In contrast, a dictionary (for example, `Dictionary<TKey, TValue>` in C#) is built at **runtime**. The dictionary uses a **hash table** under the hood, where keys are hashed to generate an index that maps to a value. Here’s the key difference:

- **Hash Function**: When you add a key to a dictionary, the hash function is applied to the key to determine where the value should be stored.
- **Collision Handling**: If two keys happen to have the same hash (a "collision"), the dictionary has to resolve it (usually by chaining or probing), which can introduce some additional overhead.

Since dictionaries are built and modified at runtime, they have to perform these operations dynamically, which adds more overhead compared to the static structure of switch cases.

---

## Conclusion

Understanding how to control the flow of your code through conditional logic is a foundational skill in programming, and C# offers various tools to achieve this. Whether you're using `if/else` statements for simple conditions, the ternary operator for concise assignments, or switch statements for complex logic, each approach has its strengths and ideal use cases.

Switch statements provide clarity and performance optimisations, especially when handling multiple conditions. On the other hand, dictionaries offer flexibility but come with a runtime overhead. Knowing when to use each method allows you to write more efficient, readable, and maintainable code tailored to specific scenarios.

As always if you want to chat about any of my articles you can follow me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Conditional Statements in C#: If, Switch, and More Explained with Example Code",
  "desc": "Being able to update variables, call particular branches of code, or simply output different code based on a certain condition is a vital part of programming in any language. C# (C Sharp) offers multiple ways to do these things, and I’m about to show...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/conditional-statements-in-csharp-if-switch-and-more.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
