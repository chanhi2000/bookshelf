---
lang: en-US
title: "How to Use Collections in C# - Lists, Arrays, Dictionaries, and More"
description: "Article(s) > How to Use Collections in C# - Lists, Arrays, Dictionaries, and More"
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
      content: "Article(s) > How to Use Collections in C# - Lists, Arrays, Dictionaries, and More"
    - property: og:description
      content: "How to Use Collections in C# - Lists, Arrays, Dictionaries, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-collections-in-csharp.html
prev: /programming/cs/articles/README.md
date: 2025-01-24
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737729136643/4cc12d37-da1c-45f0-928f-fbe02d7fdf52.png
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
  name="How to Use Collections in C# - Lists, Arrays, Dictionaries, and More"
  desc="One of the first challenges beginners face when developing applications in C# is organising and managing data efficiently. Imagine keeping track of a list of items, mapping unique keys to values, or ensuring there are no duplicates in a collection - ..."
  url="https://freecodecamp.org/news/how-to-use-collections-in-csharp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737729136643/4cc12d37-da1c-45f0-928f-fbe02d7fdf52.png"/>

One of the first challenges beginners face when developing applications in C# is organising and managing data efficiently. Imagine keeping track of a list of items, mapping unique keys to values, or ensuring there are no duplicates in a collection - these are all common tasks where choosing the right data structure can make a big difference.

C# provides a rich set of built-in data structures, such as **lists**, **dictionaries**, and more, making it easier to work with data differently. Each structure has strengths and is optimised for specific scenarios, so understanding their differences is key to writing clean, efficient, and maintainable code.

In this tutorial, we’ll explore:

- **Lists**: Your go-to for dynamic, ordered collections where elements can grow and shrink effortlessly.
- **Arrays**: The efficient choice for fixed-size collections with predictable memory usage and blazing-fast indexing.
- **Dictionaries**: Perfect for quick lookups and managing key-value pairs with unmatched speed and clarity.
- **Stacks**: Ideal for last-in-first-out (LIFO) operations, like tracking history or nested structures.
- **Queues**: Best for first-in-first-out (FIFO) tasks, like processing jobs or managing sequential workflows.
- **HashSets:** The choice for collections where uniqueness matters and fast lookups are key.

By the end of this guide, you'll understand the differences between these structures and be equipped to choose the right one for your next project.

For some of the following examples, you’ll need the `Animal` record below:

```cs
public record Animal(int Age, string Name, int Legs, string Sound);
```

---

## Arrays

An **array** in C# is a fixed-size collection of elements. Arrays are indexed, and their size is set when they are created unlike Lists and other collections. Once defined, the size of an array cannot be changed, making the memory efficient with a low overhead.

### Single-Dimension Arrays

Arrays are zero-index based, meaning their index begins at 0, rather than 1. If you’re not familiar, an index is a pointer to help you find an item.

For example, if you have 5 names in an Array, the first name is index \[0\], and the last name would be at index \[4\].

Arrays are great in scenarios where low-level performance is critical, as they have very little overhead due to their lack of metadata (additional attached information).

```cs
int[] numbers = new int[] { 1, 2, 3, 4, 5 };

foreach(var number in numbers){
    Console.Write(number);
}
//
// 1 2 3 4 5
```

In the above example, we instantiate an array with its values (thus giving it a fixed length). But we can assign values after the array is created by using index assignment.

::: note

You must still specify the size of the array at the time of creation, as the code needs to know the fixed size of the Array.

:::

```cs :collapsed-lines
// create an empty array of 20 indexes
var numbers = new int[20];

// loop over available indexes and assign `i` 
for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] = i + 1;
}

foreach (var number in numbers)
{
    Console.Write($" {number}");
}
//
//  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
```

### Multi-Dimensional Arrays

Arrays can also be multi-dimensional (for example, rows and columns), meaning they can hold two values. This makes them perfect for building grid-like structures.

Unlike a jagged array, where each element is an array that can have different lengths, a multidimensional array is a matrix-like structure where each dimension has a fixed size.

```cs :collapsed-lines
// Create a 2D multi-dimensional array to represent a chessboard

string[,] chessBoard = new string[8, 8];

// Creating the starting positions of a Chessboard
chessBoard[0, 0] = "Rook";
chessBoard[0, 1] = "Knight";
chessBoard[0, 2] = "Bishop";
chessBoard[0, 3] = "Queen";
chessBoard[0, 4] = "King";
chessBoard[0, 5] = "Bishop";
chessBoard[0, 6] = "Knight";
chessBoard[0, 7] = "Rook";

chessBoard[1, 0] = "Pawn";
chessBoard[1, 1] = "Pawn";
chessBoard[1, 2] = "Pawn";
chessBoard[1, 3] = "Pawn";
chessBoard[1, 4] = "Pawn";
chessBoard[1, 5] = "Pawn";
chessBoard[1, 6] = "Pawn";
chessBoard[1, 7] = "Pawn";

chessBoard[6, 0] = "Pawn";
chessBoard[6, 1] = "Pawn";
chessBoard[6, 2] = "Pawn";
chessBoard[6, 3] = "Pawn";
chessBoard[6, 4] = "Pawn";
chessBoard[6, 5] = "Pawn";
chessBoard[6, 6] = "Pawn";
chessBoard[6, 7] = "Pawn";

chessBoard[7, 0] = "Rook";
chessBoard[7, 1] = "Knight";
chessBoard[7, 2] = "Bishop";
chessBoard[7, 3] = "Queen";
chessBoard[7, 4] = "King";
chessBoard[7, 5] = "Bishop";
chessBoard[7, 6] = "Knight";
chessBoard[7, 7] = "Rook";


// Print the chessboard
for (int row = 0; row < 8; row++)
{
    for (int col = 0; col < 8; col++)
    {
        string piece = chessBoard[row, col] ?? "Empty";
        Console.Write($"{piece}\t");
    }
    Console.WriteLine();
}
```

```plaintext title="output"
Rook    Knight  Bishop  Queen   King    Bishop  Knight  Rook    
Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    
Empty   Empty   Empty   Empty   Empty   Empty   Empty   Empty   
Empty   Empty   Empty   Empty   Empty   Empty   Empty   Empty   
Empty   Empty   Empty   Empty   Empty   Empty   Empty   Empty   
Empty   Empty   Empty   Empty   Empty   Empty   Empty   Empty   
Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    Pawn    
Rook    Knight  Bishop  Queen   King    Bishop  Knight  Rook
```

### Jagged Array

Welcome to inception. A **jagged array** in C# is an array of arrays, where each "inner" array can have a different length.

Unlike multi-dimensional arrays, jagged arrays are not rectangular, meaning the rows can have varying sizes.

A usage example could be building a Calendar app. Below is a basic usage outputting the days of each month in the year:

```cs :collapsed-lines
int[][] daysInMonths = new int[12][];

// Initialize each month with its corresponding number of days
daysInMonths[0] = new int[31]; // January
daysInMonths[1] = new int[28]; // February (non-leap year)
daysInMonths[2] = new int[31]; // March
daysInMonths[3] = new int[30]; // April
daysInMonths[4] = new int[31]; // May
daysInMonths[5] = new int[30]; // June
daysInMonths[6] = new int[31]; // July
daysInMonths[7] = new int[31]; // August
daysInMonths[8] = new int[30]; // September
daysInMonths[9] = new int[31]; // October
daysInMonths[10] = new int[30]; // November
daysInMonths[11] = new int[31]; // December

// Print the number of days in each month
for (int month = 0; month < daysInMonths.Length; month++)
{
    Console.WriteLine($"Month {month + 1}: {daysInMonths[month].Length} days");
}
```

You should use an `Array` in:

- **Performance-critical applications** where memory overhead and speed matter.
- **Fixed data sets** where the size will not change.
- **Multi-dimensional data**, for example, graph coordinates (x, y)

---

## Lists

A `List<T>` in C# is a resizable collection of items of the same type, signaled above by the letter `T`. It allows adding, removing, and accessing items by index. Unlike arrays, lists grow dynamically as needed.

Commonly used for sequential data, they support [**LINQ**](/freecodecamp.org/how-to-use-linq.md) queries and various utility methods for data manipulation.

```cs
var animals = new List<Animal>()
{
    new Animal(10, "Dog", 4, "Woof"),
    new Animal(5, "Cat", 4, "Meow"),
    new Animal(2, "Lion", 4, "Roar"),
    new Animal(6, "Giraffe", 4, "Trumpet"),
    new Animal(15, "Red-Panda", 4, "Squeak")    
};

animals.Add(new Animal(2, "Hamster",4,"Squeak"));
animals.Remove(x=>x.Sound == "Meow"); // Remove all squeaking animals
```

Lists are a highly versatile data structure, where the order of items remains the same order in which they are added or removed (no manipulation. For example, whenever you call `.Add()` a method on a list, it will append the item to the list, and the order stays the same as before but with the additional animal.

You can modify the data (for example, filter, map, or sort) before sending lists to other areas of your application thanks to the extensive utility methods available in the `List<T>` class.

---

## Dictionaries

Dictionaries work just like the term we know in the English language.

We have a key (a lookup term) and a value (the mapped object or data). Because of this, you might hear the term 'key-value pair' when referring to dictionaries.

Dictionaries are best used to efficiently retrieve data based on a unique identifier, such as an ID, name, or other uniquely identifying fields. They ensure their unique keys are ideal for scenarios requiring optimal performance without iterative searching.

I recommend using dictionaries when the order of elements is unimportant and you need to represent relationships, such as mapping countries to capitals, products to prices, or people to addresses.

```cs
var animalDictionary = new Dictionary<string, Animal>()
{
    { "Dog", new Animal(10, "Dog", 4, "Woof") },
    { "Cat", new Animal(5, "Cat", 4, "Meow") },
    { "Elephant", new Animal(8, "Elephant", 4, "Trumpet") },
    { "Lion", new Animal(2, "Lion", 4, "Roar") },
    { "Giraffe", new Animal(6, "Giraffe", 4, "Trumpet") },
};
// Add
animalDictionary.Add("Red panda", new Animal(2, "Red Panda", 4, "Squeaker"));

// Remove
animalDictionary.Remove("Cat");

// Get
var giraffe = animalDictionary["Giraffe"];
```

---

## HashSets

A `HashSet<T>` is a collection in C# that stores unique elements. It uses a hash-based implementation to ensure very efficient lookups, additions, and deletions. This means it uses hash functions to quickly map keys to values, you can read more about that here.

Duplicate elements are automatically ignored.

How does this differ from a Dictionary? HashSets don't have keys like Dictionaries. Instead, they store values directly and are accessed by iterating over the elements using a `foreach` loop or LINQ queries.

```cs
var animalHashSet = new HashSet<Animal>()
{
    new Animal(3, "Lion", 4, "Roar"),
    new Animal(5, "Tiger", 4, "Roar"),
    new Animal(2, "Elephant", 4, "Trumpet"),
    new Animal(1, "Giraffe", 4, "Neigh")
};
// Add
animalHashSet.Add(new Animal(3, "Lion", 4, "Roar"));
// Remove
animalHashSet.Remove(x=>x.Sound == "Neigh");
// Get
animalHashSet.FirstOrDefault(x=>x.Name == "Elephant");
```

Above, we create a `HashSet<Animal>` and attempt to add a duplicate object. You may expect this to throw an error, as we know HashSets can only store unique values. But instead it handles it quite beautifully and simply doesn’t add the duplicate object, so the output is:

```plaintext title="Output"
Animal { Age = 3, Name = Lion, Legs = 4, Sound = Roar }
Animal { Age = 5, Name = Tiger, Legs = 4, Sound = Roar }
Animal { Age = 2, Name = Elephant, Legs = 4, Sound = Trumpet }
```

---

## Queues

Queues work in just the same way as a queue does in everyday life, with a first-in, first-out approach.

`Queue<T>` does not implement the ICollection interface like Dictionaries and Lists, meaning it doesn't have an `Add()` method. This means you cannot add elements to the Queue whilst instantiating. It also means you cannot use the `Add()` method to add items - instead, you use the `Enqueue()` method.

```cs
var arc = new Queue<string>();
arc.Enqueue("2 Lions");
arc.Enqueue("2 Tigers");
arc.Enqueue("2 Bears");

// Peek method allows to peek at the front of the queue
Console.WriteLine("Front of the Queue: " + arc.Peek());

// Output
// Front of the Queue: 2 Lions

Console.WriteLine($"Processing: {arc.Dequeue()}"); // Output: 2 Lions
Console.WriteLine($"Processing: {arc.Dequeue()}"); // Output: 2 Tigers
```

The `Dequeue` method not only returns the next item in the queue but also removes the item from the queue as expected. You can also clear the queue using the `Clear()` method.

---

## Stacks

Stacks work oppositely to `Queue<T>`, in that instead of first-in-first-out, they work on a last-in-first-out mechanic.

```cs
var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
stack.Push(3);
stack.Push(4);
stack.Push(5);

// iterate over the Stack
foreach(var number in stack )
{
    Console.WriteLine(number);
}

// Output
// 5 4 3 2 1
```

You may think looping through the items in a `Stack` would work the same as a List or Queue and would still print them out in order of going in. But the system knows it’s a stack, and so it enumerates the items in reverse order of how they were added - that is, the most recently added element (`5`) is returned first.

You can also utilise the `Pop()` method which will return the last item in the collection, and remove it at the same time.

---

## Common Problems

When using various collections, you will more than likely come across common problems, such as `KeyNotFoundException` when using dictionaries, `IndexOutOfRangeException` on lists/arrays, or `InvalidOperationException` when modifying a collection during iteration.

### `KeyNotFoundException`

::: tabs

@tab:active Scenario

You try to access a Dictionary key that doesn’t exist in the Dictionary. This will result in a `KeyNotFoundException`, and error.

```cs
var dictionary = new Dictionary<string, string>()
{
    { "Morning", "Good Morning" },
    { "Afternoon", "Good afternoon" },
    { "Evening", "Good evening" },
    { "Night", "Good night" },
};

var message = dictionary["Dusk"];

Console.WriteLine(message);
// 
// Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'Dusk' was not present in the dictionary.
```

@tab Solution

I recommend using the `TryGetValue` function, which will handle it gracefully and return the item as an `out` parameter (if it can be found, otherwise the default value).

`TryGetValue` returns a boolean to show whether it could or couldn’t find the provided key. This boolean value can then be utilised to determine functionality based on successful retrieval or not, rather than checking the output parameter, for example (if it is null/empty or not).

```cs
var dictionary = new Dictionary<string, string>()
{
    { "Morning", "Good Morning" },
    { "Afternoon", "Good afternoon" },
    { "Evening", "Good evening" },
    { "Night", "Good night" },
};

var input = Console.ReadLine(); // Dusk

dictionary.TryGetValue(input, out var message);
Console.WriteLine($"`Message:{message}`");
// Ouput = `Message ` (blank message as default string value is empty string

//or check if was able to retrieve and access output if it was
if(dictionary.TryGetValue(input,out var m)){
    Console.WriteLine(message);
}
```

:::

### `IndexOutOfRangeException` (Lists/Arrays)

::: tabs

@tab:active Scenario

Trying to access an index that’s outside the valid range of a list or array.

As we know, Arrays are 0 index-based, so trying to access an index of \[5\] on an Array of 5 items will throw the `IndexOutOfRangeException`.

@tab Solutions

1. Ensure the index is within bounds using `list.Count` or `array.Length` before access.
2. Use the `ElementAtOrDefault()` method. If it can’t access an item at the given index, it will return the default value, which can then be handled accordingly.

```cs
var names = new string[]
{
    "Tony", "Clint", "Bob", "Alice", "Lisa"
};

var name = names.ElementAtOrDefault(6);
Console.WriteLine(name ?? "Name not found.");
```

:::

### `InvalidOperationException` (Iterating Collections)

::: tabs

@tab:active Scenario

Modifying a collection (for example, adding or removing items) while iterating over it with a `foreach` loop will throw an `InvalidOperationException` because you're trying to remove an item from the list while iterating over it with a `foreach` loop.

```cs
var myList = new List<string> { "Apple", "Banana", "Cherry", "Banana" };

foreach (var item in myList)
{
    if (item == "Banana")
    {
        myList.Remove(item); // Throws InvalidOperationException
    }
}
```

**Why This Happens:**

- The `foreach` loop maintains an internal enumerator for the collection.
- Modifying the collection (for example, adding/removing items) invalidates the enumerator, which causes the runtime to throw an `InvalidOperationException`.

@tab Solution 1

**Use a `for` Loop**

You can use a `for` loop with an index to safely modify the list during iteration:

```cs
var fruits = new List<string> { "Apple", "Banana", "Cherry", "Banana" };

for (int i = 0; i < fruits; i++)
{
    if (fruits[i] == "Banana")
    {
        fruits.RemoveAt(i);
        // Adjust the index to account for the removed item
        i--; 
    }
}
Console.WriteLine(string.Join(", ", fruits)); 
//
// Apple, Cherry
```

@tab Solution 2

**Iterate Over a Copy**

Another approach is to iterate over a copy of the list using `ToList()`. This way, you’re not directly iterating over the original collection, so modifications won’t affect the loop.

```cs
var originalList = new List<string> { "Apple", "Banana", "Cherry", "Banana" };

foreach (var item in originalList.ToList()) // Create a copy
{
    if (item == "Banana")
    {
        originalList.Remove(item); // Safe removal
    }
}
Console.WriteLine(string.Join(", ", originalList)); 
// 
// Apple, Cherry
```

@tab Solution 3

**Use LINQ to Filter**

If you only want to remove items based on a condition, you can use LINQ to create a new filtered list:

```cs
var fruits = new List<string> { "Apple", "Banana", "Cherry", "Banana" };

fruits = fruits.Where(item => item != "Banana").ToList(); // Filter out "Banana"

Console.WriteLine(string.Join(", ", fruits)); 
//
// Apple, Cherry
```

---

## Closing Thoughts

In this article, you’ve learned about many of the common Data Structures for storing multiple objects and values.

Whether you're storing data in a fixed-size array, managing a dynamic list, working with first-in-first-out queues, last-in-first-out stacks, or key-value pair dictionaries, knowing when and how to use each collection is key to becoming a confident and proficient C# developer.

Mastering these concepts will not only improve your ability to handle data effectively but also lay the groundwork for more advanced topics in data structures and algorithms. Combining these data structures with LINQ can provide some performant and easy-to-use mechanics. To learn more about LINQ you can check out my article [**here**](/freecodecamp.org/how-to-use-linq.md).

As you continue your coding journey, keep experimenting with these collections, apply them in real-world scenarios, and deepen your understanding of their inner workings.

As always should you wish to discuss this article further, any other coding-related problems, or hear about other articles I’m writing, drop me a follow on [X(<VPIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev)

Happy coding! 😊

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Collections in C# - Lists, Arrays, Dictionaries, and More",
  "desc": "One of the first challenges beginners face when developing applications in C# is organising and managing data efficiently. Imagine keeping track of a list of items, mapping unique keys to values, or ensuring there are no duplicates in a collection - ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-collections-in-csharp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
