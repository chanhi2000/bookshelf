---
lang: en-US
title: "Data Types, Declarations and Variable Definitions in C#"
description: "Article(s) > Data Types, Declarations and Variable Definitions in C#"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - code-maze.com
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Data Types, Declarations and Variable Definitions in C#"
    - property: og:description
      content: "Data Types, Declarations and Variable Definitions in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-data-types-variables.html
prev: /programming/cs/articles/README.md
date: 2018-07-27
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/csharp-data-types-variables/banner.png
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
  name="Data Types, Declarations and Variable Definitions in C#"
  desc="Find out more about C# Data Types, what kind of data types exists in C#, how to use declarations and how to use variables as well."
  url="https://code-maze.com/csharp-data-types-variables/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/csharp-data-types-variables/banner.png"/>

In C#, different data types are registered differently. Furthermore, different actions are allowed to be executed upon them as well. For different data types, a certain amount of memory space is reserved on our computers.

With each data type we define:

- How to register data in memory
- The possible values for that data
- Possible actions on the data

So, let’s talk more about data types in C#.

::: details

- [**Development Environment Setup**](/code-maze.com/csharp-basics-ide-introduction.md)
- Data Types, Declarations and Variable Definitions (Current article)
<!-- - [**Data Types, Declarations and Variable Definitions**](/code-maze.com/csharp-basics-data-types-variables.md) -->
- [**Operators in C#**](/code-maze.com/csharp-basics-operators.md)
- [**Type Conversion**](/code-maze.com/csharp-basics-type-conversion.md)
- [**Input and Output in C#**](/code-maze.com/csharp-basics-input-output.md)
- [**Working with Strings**](/code-maze.com/csharp-basics-string-methods.md)
- [**Conditions in C# (If, If-Else, If-ElseIf, Switch-Case)**](/code-maze.com/csharp-basics-conditions.md)
- [**Loops(While, Do-While, For)**](/code-maze.com/csharp-basics-loops.md)
- [**Handling Exceptions**](/code-maze.com/csharp-basics-handling-exceptions.md)
- [**Access Modifiers**](/code-maze.com/csharp-basics-access-modifiers.md)
- [**Methods**](/code-maze.com/csharp-basics-methods.md)
- [**Ref and Out Keywords**](/code-maze.com/cshrap-basics-ref-out-keywords.md)
- [**Recursion and Recursive Methods**](/code-maze.com/csharp-basics-recursion.md)
- [**Arrays (single-dimensional and multi-dimensional arrays)**](/code-maze.com/csharp-basics-arrays.md)
- [**Working with Files, StreamWriter and StreamReader**](/code-maze.com/csharp-basics-streamwriter-streamreader.md)
- [**Working with Files, File, and Directory**](/code-maze.com/csharp-basics-file-directory.md)

:::
For the complete navigation of this series check out: [**C# Back to Basics**](/code-maze.com/csharp-back-to-basics.md).

---

## Data Type Registration in C#

Data types that represent the whole numbers are expressed with a certain number of bits. For unsigned numbers, the range is from 0 to 2N-1, and the signed numbers range is from -2N-1 to 2N-1-1. So if the data type has a size of 8 bits like the sbyte data type, we can represent its range like this: from -27 to 27-1 => from -128 to 127. The following table contains different data types that represent the whole numbers:

![whole numbers table - C# Data Types](/assets/image/code-maze.com/csharp-data-types-variables/04.1-WholeNumbersTable.png)

Letter `u` in front of the type means that type can’t contain negative numbers, it is unsigned.

The types mentioned above are the whole number types. But in C#, we have the number types with the floating-point.

We can present them in a table as well:

![Decimal numbers table in C# Data Types](/assets/image/code-maze.com/csharp-data-types-variables/04.2-TableDecimalNumbers.png)

In C#, we have two more basic data types:

![Char-bool table C# Data Types](/assets/image/code-maze.com/csharp-data-types-variables/04.3-TableCharBool.png)

To use char type in our code we must place it inside the single quotes: ’a’ or ’A’ or ’3’…

One more type that is often introduced as the basic data type is the **string** type. But the **string** is not a value type it is a reference type. To use a string in our code we must place the value inside the double quotes: „This is the string type“ or „3452“…

So, we know we have the value types and reference types, and it is time to talk more about them and variables as well.

---

## Variables in C#

Variable is a name of a memory location in which the application stores values.

We should create our variables by following examples:

- studentName
- subject
- work_day …

The wrong examples would be

- student Name
- work-day
- 1place

We should mention that C# is a case-sensitive language so the **studentName** is not the same as the **StudentName**.

The C# language has its own set of reserved words, so-called keywords. We can’t use them as a name for our variables. For the list of keywords, you can visit [<FontIcon icon="iconfont icon-csharp"/>keyword-list](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/).

But if for some reason we want to name our variable with a keyword, to avoid clashes, we can use the `@` sign in front of the name:

```cs
int @int; //valid
string @return; //valid
decimal decimal; //not valid
```

### Contextual Keywords

The contextual keywords are the ones that we can use for the variable names but without using the @ sign in front:

```plaintext title="output"
add alias ascending async await by descending dynamic equals from get global group in into join
let nameof on orderby partial remove select set unmanaged value var when where yield
```

### Value and Reference Types

In C#, we have variables divided into two categories: **Value** type and **Reference** type. The difference is that the value type variables stores their values inside their own memory locations, but the memory location for the reference type variables contains only address to the dynamic memory location where the value is stored.

Let’s see how the value types behave in a graphic example:

![Value type C# Data Type](/assets/image/code-maze.com/csharp-data-types-variables/04-ValueType.png)

Let’s do the same for the reference types:

![Reference type C# Data Types](/assets/image/code-maze.com/csharp-data-types-variables/05-ReferenceType.png)

---

## Variable Declarations and Expressions in C#

We should declare our variables in the following way:

`<data type> <variable name>;  or <data type> <variable name>, <variable name> ... ;`

So a few examples would be:

```cs
class Program
{
    static void Main(string[] args)
    {
        int age;
        double temperature, change;
        Student student;
    }
}
```

Just with the declaration, we can’t assign a value to a value type variable. To do that, we need to use expressions in addition:

`<data type> <variable name> = <expression> ;`

Again, let’s look at this with an example:

```cs
class Program
{
    static void Main(string[] args)
    {
        int x = 5;
        int y = 145 + x;
        char p = 'p';
        p = 'A';
    }
}
```

To add value for the reference type variable, we need to use the  `new` keyword in the expression part (string is an exception to this rule):

```cs
class Program
{
    static void Main(string[] args)
    {
        Student student = new Student("John", 25);
    }
}
```

We would like to mention that we don’t recommend calling variables with names „x“ or „y“… We have used those names just for the sake of simplicity. It is a better idea to give meaningful names to our variables.

---

## Conclusion

Now we have learned how to declare our variables and how to assign values to them as well.

[**In the next post**](/code-maze.com/csharp-basics-operators.md), we are going to talk about operators in C#.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Data Types, Declarations and Variable Definitions in C#",
  "desc": "Find out more about C# Data Types, what kind of data types exists in C#, how to use declarations and how to use variables as well.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/csharp-data-types-variables.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
