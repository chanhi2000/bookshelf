---
lang: en-US
title: "How to Use Loops in C#"
description: "Article(s) > How to Use Loops in C#"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c#
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Loops in C#"
    - property: og:description
      content: "How to Use Loops in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-loops-in-c.html
prev: /programming/cs/articles/README.md
date: 2025-09-17
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757595108095/f7bd2673-3da5-4f34-8541-64cc8129fe96.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Loops in C#"
  desc="Writing the same code repeatedly is poor practice in C# and doesn’t follow the Don’t Repeat Yourself (DRY) principle. But, there are many times in programming where you need to repeat commands, operations, or computations multiple times — perhaps cha..."
  url="https://freecodecamp.org/news/how-to-use-loops-in-c"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757595108095/f7bd2673-3da5-4f34-8541-64cc8129fe96.jpeg"/>

Writing the same code repeatedly is poor practice in C# and doesn’t follow the Don’t Repeat Yourself (DRY) principle. But, there are many times in programming where you need to repeat commands, operations, or computations multiple times — perhaps changing one small thing each iteration.

This is where loops come in. In this article, you’ll learn:

- How to create your first loop
- Benefits and caveats of using loops
- The different types of loops in C# and how to use them
- When it’s best to use each one

Let’s get started. Open your preferred IDE or coding editor and create a new Console Application in .Net 8+.

---

## How to Use a For Loop in C

A for loop repeats a block of code a set number of times by:

- Initialising a loop variable.
- Checking a condition before each iteration.
- Updating the loop variable after each iteration.

You can create a `for` loop with the code below:

```cs
// number of iterations
var totalIterations = 5

// the loop
for(int i = 0; i <= totalIterations; i++){
   Console.Write($"{i},");
}

// Output
0,1,2,3,4,5,
```

::: info Breaking it down:

- `for`: declares the loop
- `int i = 0;`: sets the starting point for the loop variable `i`
- `i <= totalIterations;`: the condition to keep looping. The code inside the loop runs only if this is true.
- `i++`: shorthand for “increase `i` by 1” after each iteration

:::

### Iterations and Zero

Why does the example print six numbers when `totalIterations` is 5? C# uses zero-based indexing. Counting from 0 → 5 includes six numbers: 0,1,2,3,4,5. If you want to print 1 → 5 instead, start `i` at 1:

```cs
var totalIterations = 5;
for (int i = 1; i <= totalIterations; i++)
{
    Console.Write($"{i},");
}
//
// 1,2,3,4,5
```

::: tip

In general, `for` loops are used for indexing/accessing elements in collections, so it’s common practice to start your loop variable at 0 and use `<` (less than) a given number or length of the collection.

:::

### Reversal of Direction

You can reverse a `for` loop by starting at the end and decrementing `i`:

```cs
for (int i = 5; i > 0; i--)
{
    Console.Write($"{i},");
}
// 
// 5,4,3,2,1
```

The loop checks if `i > 0`. After each iteration, `i` decreases by 1, printing numbers in descending order.

### Other Uses of For Loops

Let’s say you want to access every other item in a list. This is where the power of `for` loops come in, and we can maximise our `loop variable`, using it as an index accessor.

```cs :collapsed-lines
public class Address
{
    public string Name { get; set; } = string.Empty;
    public string AddressLineOne { get; set; } = string.Empty;
    public int HouseNumber { get; set; } = default;
    public string PostCode { get; set; } = string.Empty;
    public string Telephone { get; set; } = string.Empty;
}

internal class Program
{
    public static void Main()
    {
        var addressBook = new List<Address>
        {
            new Address
            {
                Name = "Grant", AddressLineOne = "Developer Avenue", HouseNumber = 1, PostCode = "DV19 8EP",
                Telephone = "0102919 93020-92019"
            },
            new Address
            {
                Name = "Bill", AddressLineOne = "Developer Avenue", HouseNumber = 19, PostCode = "DV19 8EP",
                Telephone = "0102919 93020-92019"
            },
            new Address
            {
                Name = "Rebecca", AddressLineOne = "Developer Avenue", HouseNumber = 4, PostCode = "DV19 8EP",
                Telephone = "0102919 93020-92019"
            },
            new Address
            {
                Name = "Amy", AddressLineOne = "Rower Avenue", HouseNumber = 1, PostCode = "DV19 8EP",
                Telephone = "0102919 93020-92019"
            },
            new Address
            {
                Name = "Joe", AddressLineOne = "Olympic Drive", HouseNumber = 1, PostCode = "DV19 10E",
                Telephone = "0102919 93020-92019"
            }
        };

        for (var i = 0; i < addressBook.Count; i += 2)
        {
            Console.WriteLine($"Name: {addressBook[i].Name}, PostCode: {addressBook[i].PostCode}");
        }
    }
}
//
// Name: Grant, PostCode: DV19 8EP
// Name: Rebecca, PostCode: DV19 8EP
// Name: Joe, PostCode: DV19 10E
```

::: info What’s Happening

- `i` starts at 0 and increases by 2 (`i += 2`) each iteration
- `addressBook[i]` now accesses every other item
- This shows the power of using `i` as an index

:::

So far we’ve seen how `for` loops give control over indexes and step sizes.

But sometimes you just want to loop through every item in a collection, without worrying about indexes. That’s where the foreach loop shines.

---

## How to Use a ForEach Loop in C

A `foreach` loop iterates over any object that inherits from `IEnumerable` (lists, arrays, collections). It automatically accesses each item in order, so you don’t need an index.

### How To Write a ForEach Loop

```cs
var characters = new List<string>{"Batman", "CatWoman", "The Joker","Harley Quinn"};

foreach(var character in characters){
    Console.WriteLine(character);
}
//
// Batman
// CatWoman
// The Joker
// Harley Quinn
```

::: important Key points:

- No need for indexes
- Works with any enumerable collection
- Cleaner, more expressive code

:::

### Caveats of ForEach Loop

#### No Indexing

You can’t directly access items with `addressBook[i]` inside a foreach. That’s because `foreach` works on `IEnumerable`, which doesn’t expose indexes.

#### Performance

A `foreach` loop has a small overhead compared to a `for` loop. In most cases this won’t matter, but in performance-critical code, a `for` loop may be faster.

#### Modifying Items

`foreach` gives you a copy of the current item, not a direct reference. That means you can’t reassign values to the list items inside the loop.

- You can read properties.
- You can’t update the items themselves (use a for loop for that).

`foreach` is ideal when you want to visit every item, but not control the number of iterations.

---

## How to Use a Do..While Loop in C

`do..while` loops run code at least once, then repeat while a condition is true:

```cs
int num;
do {
    Console.Write("Enter a positive number: ");
    num = int.Parse(Console.ReadLine());
} while (num <= 0);

Console.WriteLine(num);
```

The above code requests a number to be entered within the console application if the condition is met. That is, if a positive number is provided, the code will not ask for another, exiting the loop.

Should the user enter a negative number, it would continue to loop, requesting a positive number to be entered.

What if you didn’t want the code to run at least once, and only if a condition is met? This where you can use a `while` loop.

---

## How to Use a While Loop in C

`while` loops repeat code as long as a condition is true, but the body may never run if the condition is initially false:

We can use an example of a darts score board:

```cs
var sum = 0;
var dartsThrown = 0;
var random = new Random();

while (sum < 180 && dartsThrown < 3)
{
    var dartScore = random.Next(61); // 0–60
    sum += dartScore;
    dartsThrown++;
}

Console.WriteLine("Your score is " + sum);
```

While the player has darts to throw, the code will pick a number at random and increase their score.

::: tip

Always include code that changes the condition, or you risk creating an infinite loop. An infinite loop, is a loop which never stops, and causes your application to break.

:::

You’ve seen four different ways to repeat code in C#: `for`, `foreach`, `do..while`, and `while`. Let’s summarise when to use each one.

---

## Final Thoughts: Choosing the Right Loop

C# gives us several types of loops. Choosing the right one makes your code readable, efficient, and intentional.

- **For Loop:** Use when you know how many times to run something, or when you need an index, like using arrays, skipping items. Use a `for` loop when you need more control over the iterative nature of the loop.
- **ForEach Loop:** Use when you want to iterate through every item in a collection without worrying about indexes.
- **While Loop:** Use when you don’t know in advance how many times to run the code, but a condition drives the loop.
- **Do..While Loop:** Use when the loop body must run at least once, such as for user input or retry logic.

By matching the loop type to your intent, your code will be correct, readable, and maintainable.

I hope this tutorial was useful, and as always I’d love to hear your thoughts and discuss further on social media. You can find me on [twitter/x (<VPIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Loops in C#",
  "desc": "Writing the same code repeatedly is poor practice in C# and doesn’t follow the Don’t Repeat Yourself (DRY) principle. But, there are many times in programming where you need to repeat commands, operations, or computations multiple times — perhaps cha...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-loops-in-c.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
