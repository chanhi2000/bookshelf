---
lang: en-US
title: "An Animated Introduction to Programming in C++"
description: "Article(s) > An Animated Introduction to Programming in C++"
icon: iconfont icon-cpp
category:
  - C++
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cpp
  - c++
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Animated Introduction to Programming in C++"
    - property: og:description
      content: "An Animated Introduction to Programming in C++"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-programming-in-cpp.html
prev: /programming/cpp/articles/README.md
date: 2025-03-27
isOriginal: false
author:
  - name: Mark Mahoney
    url : https://freecodecamp.org/news/author/markm208/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743028744653/12f33ee5-4ef4-47da-b50d-060a9ee327ce.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="An Animated Introduction to Programming in C++"
  desc="In this tutorial, I’ll give you a comprehensive introduction to programming in C++. You don't need to have any previous programming experience in order to begin. Along the way, you will learn about the flow of control, variables, conditional statemen..."
  url="https://freecodecamp.org/news/learn-programming-in-cpp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743028744653/12f33ee5-4ef4-47da-b50d-060a9ee327ce.png"/>

In this tutorial, I’ll give you a comprehensive introduction to programming in C++. You don't need to have any previous programming experience in order to begin.

Along the way, you will learn about the flow of control, variables, conditional statements, loops, arrays, functions, structured data, pointers and dynamic memory, classes, common data structures, and working with databases.

Integrated Development Environments (IDE’s) are tools that allow you to write, run, and debug C++ programs. There are some great free C++ IDE’s out there.

If you own a Windows computer, I recommend using [<FontIcon icon="iconfont icon-visualstudio"/>Visual Studio Community Edition](https://visualstudio.microsoft.com/vs/community). If you own a Mac, I recommend using [<FontIcon icon="iconfont icon-xcode"/>Xcode](https://developer.apple.com/xcode). These provide robust features and excellent support for C++ development. If you're looking for a lightweight install on any platform, [<FontIcon icon="iconfont icon-jetbrains"/>CLion](https://jetbrains.com/clion/download) is a fantastic choice.

For those who prefer not to install any software or are unable to, [<FontIcon icon="iconfont icon-replit"/>replit](https://replit.com) is a convenient web-based IDE that allows you to start coding immediately.

There are practice problems in each section so that you can use to practice while learning from the content. These are in the '**Hands-On Practice**' portion of each section. You will use your IDE to write and run these practice programs.

---

## Code Playbacks

This is not a traditional online tutorial or video series. Each section will have links to interactive ‘**code playbacks’** that visually animate the changes made to a program in a step-by-step manner.

A code playback shows how a program evolves by replaying all the steps in its development. It has an author-supplied narrative, screenshots, whiteboard-style drawings, and self-grading multiple choice questions to make the learning process more dynamic and interactive. Just click on the numbered comments on the left hand side of the screen to drive the playback forward.

![Screenshot showing what the playbacks look like](https://cdn.hashnode.com/res/hashnode/image/upload/v1742956414812/64ed10ba-5f80-442b-b469-9d6462521578.png)

Watch this short [<FontIcon icon="fa-brands fa-youtube"/>YouTube video](https://youtu.be/uYbHqCNjVDM) which explains how to view a code playback in more detail.

<VidStack src="youtube/uYbHqCNjVDM" />

::: info Playback Press

[<FontIcon icon="fas fa-globe"/>Playback Press](https://playbackpress.com/books) is a platform for sharing code playbacks. The site contains collections of code playbacks grouped together by language/technology into different ‘books’. If you want to see the full C++ book, you can go here: [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Programming in C++](https://playbackpress.com/books/cppbook).

Code playbacks on the platform include AI tutoring, mini-quizzes, and text-to-speech features.

[<FontIcon icon="fas fa-globe"/>Storyteller](https://markm208.github.io/) is the free and open-source tool that powers code playbacks.

:::

::: info AI Tutor

When viewing a code playback, you can ask an AI tutor about the code. It answers questions clearly and patiently, making it a helpful resource for learners. You can also ask the AI tutor to generate new self-grading multiple choice questions to test your knowledge of what you are learning.

In order to access the AI tutor and to generate new multiple choice questions, simply create a free account on Playback Press and add the [<FontIcon icon="fas fa-globe"/>book](https://playbackpress.com/books/cppbook) to your bookshelf. It is still free, but you do need to register in order to access the AI features.

:::

## C++ Overview

C++ is a powerful, high-performance programming language that is widely used in various domains such as system development, game development, real-time simulations, and high-performance applications. It is an extension of the C programming language, adding object-oriented features, which makes it suitable for large-scale software engineering projects.

C++ provides fine-grained control over system resources and memory management, which can lead to highly optimized and efficient code. C++ remains a popular choice due to its versatility, performance, and the vast ecosystem of libraries and tools available.

---

## Part 1: Variables

Simply watching an experienced artist paint is not enough to say that you have learned how to become a painter. Watching an experienced artist is an important *part* of the learning process, but you can only call yourself a painter after struggling to make your own paintings first.

There are a lot of similarities between learning to paint and learning to program. The only way to truly learn programming is through practice!

So, let's get started. Follow along with the code playbacks below. Click the links below to load each code playback (it may help to open them in a new tab). Click on the playback comments on the left-hand side of the playback screen to step through the code's development.

### Flow of Control

The following playback explains the **flow of control** in a program by describing how to print to the screen from it:

- [<FontIcon icon="fas fa-globe"/>1.1 Name printer program](https://playbackpress.com/books/cppbook/chapter/1/1)

### Variables and Types

This next group of programs describes declaring variables to hold data in a program. All variables have a **type** which specifies what can be stored in them and what operations can be performed on them.

- [<FontIcon icon="fas fa-globe"/>1.2 Distance formula](https://playbackpress.com/books/cppbook/chapter/1/2)
- [<FontIcon icon="fas fa-globe"/>1.3 Basic types in C++](https://playbackpress.com/books/cppbook/chapter/1/3)
- [<FontIcon icon="fas fa-globe"/>1.4 Number types](https://playbackpress.com/books/cppbook/chapter/1/4)
- [<FontIcon icon="fas fa-globe"/>1.5 Characters and strings](https://playbackpress.com/books/cppbook/chapter/1/5)

### Reading from the Keyboard

This final group of programs builds on previous concepts and shows how to prompt the user for input.

- [<FontIcon icon="fas fa-globe"/>1.6 Weekly pay calculator](https://playbackpress.com/books/cppbook/chapter/1/6)
- [<FontIcon icon="fas fa-globe"/>1.7 Distance formula revisited](https://playbackpress.com/books/cppbook/chapter/1/7)
- [<FontIcon icon="fas fa-globe"/>1.8 Gas Mileage](https://playbackpress.com/books/cppbook/chapter/1/8)

### Hands-On Practice

Now that you have reviewed the guided code walk-throughs, write a program that prompts the user for three integers: one representing an hour, one representing a minute, and one representing a second. Next, calculate the number of seconds until midnight based on the time that was input. Print the number of seconds until midnight on the screen.

Then, prompt the user for a single integer representing the number of seconds until midnight. From that value, do the reverse calculation to find the hour, minute, and second of that time. Print it to the screen in a time format HH:MM:SS.

---

## Part 2: Selection

This section discusses altering the flow of control with `if/else` statements. These statements ask the computer to evaluate whether a condition is `true` or `false` and changes the flow of control based on the answer. It also explains the data type, `bool`, which can hold either true or false and it shows a few examples of how to use selection with `if`, `if/else`, `if/else if/else`, and `switch` statements.

- [<FontIcon icon="fas fa-globe"/>2.1 Booleans](https://playbackpress.com/books/cppbook/chapter/2/1)
- [<FontIcon icon="fas fa-globe"/>2.2 Even/odd calculator](https://playbackpress.com/books/cppbook/chapter/2/2)
- [<FontIcon icon="fas fa-globe"/>2.3 Overtime pay with an if/else](https://playbackpress.com/books/cppbook/chapter/2/3)
- [<FontIcon icon="fas fa-globe"/>2.4 Water temperature](https://playbackpress.com/books/cppbook/chapter/2/4)
- [<FontIcon icon="fas fa-globe"/>2.5 Switch](https://playbackpress.com/books/cppbook/chapter/2/5)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, try to write a few programs:

::: tabs

@tab:active Problem 1

Problem 1 asks you to write a program to determine if one date comes after another. The program will ask for two sets of dates. Next, the program will determine if the first date comes before, is equal to, or comes after.

```plaintext
Enter in the first month: 2
Enter in the first day: 21
Enter in the first year: 2012

Enter in the second month: 2
Enter in the second day: 22
Enter in the second year: 2011

The first date comes after the second.
```

@tab Problem 2

Problem 2 asks you to write a program that prompts the user for a date and determines if that date is valid. For example, 9/19/2017 is a valid date, but these are not valid dates:

- 4/31/2006 (only 30 days in April)
- 2/29/2005 (not a leap year)
- 16/1/2010 (invalid month)
- 4/59/2013 (invalid day)

If the date is correct, print it out. If it is incorrect, display an error message explaining why the date is not correct.

@tab Problem 3

Problem 3 asks you to write a program that will calculate change for a sales purchase. Your program should prompt for a sales price. Validate that the data entered is a number greater than 0. If the data entered is incorrect, display an error message and end the program.

Next, prompt the user for the amount that the customer will pay to the cashier. Validate that this value is greater than or equal to the sales price. If it is not, display an error message and end the program.

If the entry is correct, your program must calculate the amount of change to return to the user. Next, calculate what bills and coins that the the cashier needs to return to the customer. The fewest number of paper bills and coins should be returned. You can make change in many different combinations, but the only correct implementation is the one that returns the fewest paper bills and coins.

Display the number of each of the bills and coins. Here is a sample run of the program:

```plaintext :collpased-lines
Enter in a sales amount: $20.38
Enter in the amount the customer pays: $30.00

The change due back is $9.62

You should give the customer this change:
0 $100 bills
0 $50 bills
0 $20 bills
0 $10 bills
1 $5 bills
4 $1 bills
1 Half Dollars
0 Quarters
1 Dimes
0 Nickels
2 Pennies
```

Because of the way arithmetic works with float variables, storing the monetary values as floats may cause some problems.

For example, if you had a float variable that held 1.29 to represent $1.29 and you subtracted the .05 from it (to represent giving back a nickel), you would think that you would be left with exactly 1.24. Unfortunately, the computer might store that value or it might store 1.2399999 or 1.2400001 instead of exactly 1.24. These very small inconsistencies can cause a problem calculating the number of pennies to return. Consider converting the amounts into ints to solve this problem.

:::

---

## Part 3: Looping

This group of playbacks discusses repeatedly executing the same code over and over again in a loop. They show how to create count controlled and event controlled loops with the `while` keyword, nested loops, a `for` loop, and how to exit a loop with `break` and `continue`.

- [<FontIcon icon="fas fa-globe"/>3.1 A simple loop](https://playbackpress.com/books/cppbook/chapter/3/1)
- [<FontIcon icon="fas fa-globe"/>3.2 More loops](https://playbackpress.com/books/cppbook/chapter/3/2)
- [<FontIcon icon="fas fa-globe"/>3.3 Summation](https://playbackpress.com/books/cppbook/chapter/3/3)
- [<FontIcon icon="fas fa-globe"/>3.4 Nested loop](https://playbackpress.com/books/cppbook/chapter/3/4)
- [<FontIcon icon="fas fa-globe"/>3.5 `for` loop](https://playbackpress.com/books/cppbook/chapter/3/5)
- [<FontIcon icon="fas fa-globe"/>3.6 Capitalization](https://playbackpress.com/books/cppbook/chapter/3/6)
- [<FontIcon icon="fas fa-globe"/>3.7 `break` and `continue`](https://playbackpress.com/books/cppbook/chapter/3/7)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a few programs:

::: tabs

@tab Problem 1

Problem 1 asks you to write a program that will calculate the sum of the squares from 1 up to and including that number. For example, if the user entered in the value 5, then the sum of the squares for the numbers one through five would be (1 + 4 + 9 + 16 + 25) = 55. Your program should repeatedly calculate this value until the user enters in a value of -99. This is the sentinel value that the program uses to determine when to quit.

```plaintext
Enter in an integer number(ex. 10), -99 to quit: 5
The sum of the squares up to 5 is 55

Enter in an integer number(ex. 10), -99 to quit: 4
The sum of the squares up to 4 is 30

Enter in an integer number(ex. 10), -99 to quit: -99
Have a nice day!
```

@tab Problem 2

Problem 2 asks you to write a program that will determine whether a number is prime or not. A prime number is any number that is evenly divisible only by the number one and itself.

7 is prime because the only numbers that divide into it without a remainder are 1 and 7. 12 is not prime because the numbers that divide into it evenly are 1, 2, 3, 4, 6, and 12. Your program will prompt for a number and then display whether the number is prime or not. The number entered must be a positive number. Repeatedly prompt for a number until a positive number is entered.

@tab Problem 3

Problem 3 asks you to calculate a mortgage schedule for someone thinking of buying a new house. The inputs to determine a monthly schedule are the principal loan amount and the annual interest rate. Assume this will be a conventional 30 year loan.

Your program should prompt for these inputs and find a monthly payment using this calculation:

```plaintext
                                   monthly interest rate                                              
monthly payment =  ------------------------------------------------- * principal
                   1 - (1 + monthly interest rate)^-number of months
```

Notice that you will have to calculate the monthly interest rate (the annual interest rate divided by 12.0) and number of months (360 for a 30 year loan). The `^` in this formula means raise one number to a power. There is a function called `pow()` which raises one number to another and returns the result. For example, if you wanted to raise 2 to the -3rd power, you would do this:

```cpp
float result = pow(2.0, -3.0);
```

After you have calculated the monthly payment, create a summary of the loan characteristics. Display the loan amount, the interest rate, the monthly payment, the total amount paid for the loan, the total amount of interest paid, and the ratio of amount paid over the principal.

After you have printed the summary, you can begin to make the schedule. Prompt the user for the ending month to display in the schedule. The schedule should display the month number, the monthly payment, the amount paid in principal in that month, the amount paid in interest in that month, and the amount remaining in the principal (the amount paid in principle each month is deducted from the remaining principle). A month's interest amount is equal to monthly interest rate times the remaining principal. The monthly principal is the difference between the monthly payment and the monthly interest paid. Remember to update the remaining principal after every month.

After each year of the schedule has been printed, display a message with the year number.

:::

---

## Part 4: Arrays

This batch of programs shows how to use arrays in C/C++. An array is a collection of variables (all of the same type) that have a single name and sit next to each other in memory. Loops are almost always used to go through the elements of an array. They show how to create two and three dimensional arrays and use the random number generator in C/C++.

- [<FontIcon icon="fas fa-globe"/>4.1 Arrays](https://playbackpress.com/books/cppbook/chapter/4/1)
- [<FontIcon icon="fas fa-globe"/>4.2 Average and standard deviation of an array of values](https://playbackpress.com/books/cppbook/chapter/4/2)
- [<FontIcon icon="fas fa-globe"/>4.3 Problems with arrays](https://playbackpress.com/books/cppbook/chapter/4/3)
- [<FontIcon icon="fas fa-globe"/>4.4 Flipping coins](https://playbackpress.com/books/cppbook/chapter/4/4)
- [<FontIcon icon="fas fa-globe"/>4.5 Multi-dimensional arrays](https://playbackpress.com/books/cppbook/chapter/4/5)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a few programs:

::: tabs

@tab:active Problem 1

Problem 1 asks you to write a program that displays a menu with three options.

The first option allows the user to enter in a month number (between 1-12) and a day number within that month (1-31) and calculates the day number in the year. January 1 is day 1. January 31 is day 31. February 1 is day 32. February 28 is day 59. December 31 is day 365 (don’t worry about leap years). If the user enters an invalid combination (like February 31) the program should continuously prompt the user to enter in a new value until they enter a valid date.

The second menu option allows the user to enter in a day number (1-365) and prints out the month name and day number of that month. If the user enters in 59, the program should print out:

```plaintext
Day 59 is February 28
```

If the user enters an invalid day number, the program should continuously prompt the user to enter in a new value until it is in the correct range.

The last menu option allows the user to quit the program. The menu should repeatedly be displayed until the user chooses to quit the program.

Use an array of integers to hold the number of days in each of the months. Use the array to keep a running sum to help with your day calculations. You may also want to create an array of strings with the month names.

```cpp
int numDaysInMonths[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
```

Here is a sample run of the program:

```plaintext :collpased-lines
1. Enter in a month and day
2. Enter in a day number
3. Quit
Enter in a menu option: 1

Enter in a month number: 2
Enter in a day number: 1

February 1 is day 32

1. Enter in a month and day
2. Enter in a day number
3. Quit
Enter in a menu option: 2

Enter in a day number: 59
Day 59 is February 28

1. Enter in a month and day
2. Enter in a day number
3. Quit
Enter in a menu option: 3
```

@tab Problem 2

Problem 2 asks you to create a program that will find the number of days in between two dates.

For example, say a user would like to know how many days are in between two dates (1/1/2000) and (3/19/2030). The program must find out how many whole days are in between these two dates (include the starting and ending date).

If the two dates are in the same year, then the algorithm to find the number of days may be different than if the dates are in different years. Your program must handle each case.

Here is a sample run of the program:

```plaintext
Enter in a start month: 1
Enter in a start day: 1
Enter in a start year: 2000

Enter in an end month: 3
Enter in an end day: 19
Enter in an end year: 2030

There are 11035 days in between 1/1/2000 and 3/19/2030
```

:::

---

## Part 5: Functions

This group of playbacks describes another flow of control-altering mechanism called functions. A function is a named block of code that can be *called* and the flow of control will jump to it.

When calling a function, some data can be passed into it (called parameters) and the function can return a piece of data when it is complete (called a return value). These playbacks discuss passing in data 'by value' versus 'by reference'. They show that every variable has a limited lifetime that it sits in memory, or scope.

- [<FontIcon icon="fas fa-globe"/>5.1 Functions](https://playbackpress.com/books/cppbook/chapter/5/1)
- [<FontIcon icon="fas fa-globe"/>5.2 Value returning functions](https://playbackpress.com/books/cppbook/chapter/5/2)
- [<FontIcon icon="fas fa-globe"/>5.3 Functions with parameters](https://playbackpress.com/books/cppbook/chapter/5/3)
- [<FontIcon icon="fas fa-globe"/>5.4 Passing parameters by reference](https://playbackpress.com/books/cppbook/chapter/5/4)
- [<FontIcon icon="fas fa-globe"/>5.5 The scope of variables](https://playbackpress.com/books/cppbook/chapter/5/5)
- [<FontIcon icon="fas fa-globe"/>5.6 Prime number function](https://playbackpress.com/books/cppbook/chapter/5/6)
- [<FontIcon icon="fas fa-globe"/>5.7 Passing arrays to functions](https://playbackpress.com/books/cppbook/chapter/5/7)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a few programs:

::: tabs

@tab:active Problem 1

Problem 1 asks you to extend the prime number problem from a previous section. Write a program that includes a function that will print all the prime numbers in a range. The program will ask for a lower bound and an upper bound and print all the primes in that range.

@tsb Problem 2

Problem 2 asks you to write a function that takes an integer year number and returns a `bool` whether that year is a leap year or not. The calculation for leap year is as follows:

- most years evenly divisible by four are leap years
- if a year is divisible by four and is a century year, like 1800 or 1900, then it is NOT a leap year
- if a century year also happens to be divisible by 400, like 2000 or 2400, then it is a leap year

The function should look something like this:

```cpp
bool isLeapYear(int year)
{
    //calculate if it is leap year or not and return true or false
}
```

@tab Problem 3

Problem 3 asks you to write a program that will print a calendar for a whole year given the day that January 1st falls on. Your program will prompt for the day that January 1st falls on and the year. You must print the calendar for all 12 months of that year. The options for the first day of the year will be entered with the first three letters of each of the seven days of the week from Sunday ('sun') to Saturday ('sat').

The year does not need to be validated, but the day of the week does. You should not allow the user to enter in a value other than 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', or 'sat'.

The format of your calendar should be very similar to the example below. You must use at least one function in addition to the main function. Pass data between functions, do not use global variables.

The final requirement is that your program should only display one month at a time and then wait for some user input before continuing.

It is very important that you come up with a plan to solve this program before you begin coding (as it is with every program). Think about how you would print a single month's calendar given the day of the month that it begins on.

**Sample Output:**

```plaintext :collapsed-lines
What year do you want the calendar for?
2003

What day of the week does January 1st fall on (sun for Sunday, mon for Monday, etc..)?
s
Invalid Entry - please enter the first three letters of the day

What day of the week does January 1st fall on (sun for Sunday, mon for Monday, etc..)?
wed

    January 2003
 S  M  T  W  T  F  S
---------------------
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31

Do you want to continue? y

   February 2003
 S  M  T  W  T  F  S
---------------------
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28

Do you want to continue? y
...
...
```

:::

---

## Part 6: Vectors

C++ comes with the Standard Template Library (STL) which is a collection of different containers. This section will cover vectors. A `vector` is an array-based container that holds data very much like an array does but it is *smarter*. It knows how many elements are in it and it can grow as the program is running. It also shows how to read and write data from a file, efficiently search through an array-based container, sort values, and more.

- [<FontIcon icon="fas fa-globe"/>6.1 `vector`](https://playbackpress.com/books/cppbook/chapter/6/1)
- [<FontIcon icon="fas fa-globe"/>6.2 Passing a `vector` to a function](https://playbackpress.com/books/cppbook/chapter/6/2)
- [<FontIcon icon="fas fa-globe"/>6.3 Advanced features of `vector`s](https://playbackpress.com/books/cppbook/chapter/6/3)
- [<FontIcon icon="fas fa-globe"/>6.4 Reading from a file and storing in a `vector`](https://playbackpress.com/books/cppbook/chapter/6/4)
- [<FontIcon icon="fas fa-globe"/>6.5 Linear search and binary search](https://playbackpress.com/books/cppbook/chapter/6/5)
- [<FontIcon icon="fas fa-globe"/>6.6 Bubble sort](https://playbackpress.com/books/cppbook/chapter/6/6)
- [<FontIcon icon="fas fa-globe"/>6.7 Writing to a file](https://playbackpress.com/books/cppbook/chapter/6/7)
- [<FontIcon icon="fas fa-globe"/>6.8 Two dimensional `vector`s](https://playbackpress.com/books/cppbook/chapter/6/8)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a program to read in whole words from a file and store them in a vector of strings. Create a simple text file (`.txt`) using your coding editor. Then add a few sentences of text to it. Strip any punctuation marks from the words and make them all lowercase letters. Only store a word in the vector if it is not already present.

---

## Part 7: Structured Data

This section describes how to use structured data types. Structured data types allow you to group related data together so that it can be passed around easily.

- [7.1 Simple `struct`](https://playbackpress.com/books/cppbook/chapter/7/1)
- [7.2 Hierarchical `struct`s](https://playbackpress.com/books/cppbook/chapter/7/2)
- [7.3 `vector`s as members of `struct`s](https://playbackpress.com/books/cppbook/chapter/7/3)
- [7.4 `struct`s with a `vector` of objects](https://playbackpress.com/books/cppbook/chapter/7/4)
- [7.5 Calculus with `struct`s](https://playbackpress.com/books/cppbook/chapter/7/5)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a program that has a struct to represent a cell phone. Every cell phone has a model name and manufacturer along with a camera with a mega-pixel resolution. For example, a user may want to store information about an Apple IPhone X with a 12 MP camera or a Google Pixel 4 with a 16 MP camera.

Your program will create three cell phone objects, fill them, and then add them to a vector. Lastly, print out the information about each cell phone on the screen.

Write a function that takes a cell phone object by reference and prompts the user to enter in the model, manufacturer, and camera resolution. Write another function that prints information about a cell phone. Write a function that takes a vector of cell phones and prints each one.

---

## Part 8: Pointers

This section describes pointers in C/C++. A pointer is a variable that holds the address of another variable. Pointers are important because they allow us to use a special section of memory called the 'heap'. This section discusses the different types of memory that can be used in a program (global, local, and dynamic).

- [<FontIcon icon="fas fa-globe"/>8.1 Simple pointers](https://playbackpress.com/books/cppbook/chapter/8/1)
- [<FontIcon icon="fas fa-globe"/>8.2 Pointer to an object](https://playbackpress.com/books/cppbook/chapter/8/2)
- [<FontIcon icon="fas fa-globe"/>8.3 Vectors of pointers](https://playbackpress.com/books/cppbook/chapter/8/3)
- [<FontIcon icon="fas fa-globe"/>8.4 Arrays are pointers](https://playbackpress.com/books/cppbook/chapter/8/4)
- [<FontIcon icon="fas fa-globe"/>8.5 Passing data to functions with pointers](https://playbackpress.com/books/cppbook/chapter/8/5)
- [<FontIcon icon="fas fa-globe"/>8.6 Comparing pointers](https://playbackpress.com/books/cppbook/chapter/8/6)
- [<FontIcon icon="fas fa-globe"/>8.7 Three types of variables- global, local, and dynamic](https://playbackpress.com/books/cppbook/chapter/8/7)
- [<FontIcon icon="fas fa-globe"/>8.8 Dynamic variables example](https://playbackpress.com/books/cppbook/chapter/8/8)
- [<FontIcon icon="fas fa-globe"/>8.9 Dangling pointers and null pointers](https://playbackpress.com/books/cppbook/chapter/8/9)
- [<FontIcon icon="fas fa-globe"/>8.10 Dynamic array of students](https://playbackpress.com/books/cppbook/chapter/8/10)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a program that will read a sequence of words from the keyboard and store them in a dynamic array of strings. Use the word 'quit' as the word that terminates the input. Print the words back to the screen in the order in which they were entered, each on its own line. Do not store the same word twice.

Up until now, the size of an array has been determined at compile time. Now that you know about pointers and about the keyword `new`, write a program which is not restricted to selecting an upper bound at compile time for the number of words which can be read in.

One way to do this is to use `new` to create arrays of strings on the fly. Each time an array fills up, dynamically create an array which is twice as large, copy over the contents of the existing array to the new array, and continue (remember to `delete` the original array). Start with an array of 5 elements.

Here is an example of the output:

```plaintext :collapsed-lines
Enter in some text and end with the word quit:
This lab asks you to write a program that will read a sequence of words from the keyboard and store them in a dynamic array of strings. Use the word 'quit' as the word that terminates the input. Print the words back to the screen in the order in which they were entered each on its own line. Do not store the same word twice. quit

Doubling Array from 5 to 10
Doubling Array from 10 to 20
Doubling Array from 20 to 40
Doubling Array from 40 to 80
1. This
2. lab
3. asks
4. you
5. to
6. write
7. a
8. program
9. that
10. will
11. read
12. sequence
13. of
14. words
15. from
16. the
17. keyboard
18. and
19. store
20. them
21. in
22. dynamic
23. array
24. strings.
25. Use
26. word
27. 'quit'
28. as
29. terminates
30. input.
31. Print
32. back
33. screen
34. order
35. which
36. they
37. were
38. entered
39. each
40. on
41. its
42. own
43. line.
44. Do
45. not
46. same
47. twice.
Press any key to continue . . .
```

---

## Part 9: Object-Oriented Programming

This section discusses object-oriented programming using classes in C++. A class is like a `struct`, except that in addition to collecting data, it also collects methods that work on that data. This is called encapsulation. It also discusses inheritance and polymorphism that make it easier to reuse code.

- [<FontIcon icon="fas fa-globe"/>9.1 Simple class](https://playbackpress.com/books/cppbook/chapter/9/1)
- [<FontIcon icon="fas fa-globe"/>9.2 A class with data members](https://playbackpress.com/books/cppbook/chapter/9/2)
- [<FontIcon icon="fas fa-globe"/>9.3 A class with objects for data members](https://playbackpress.com/books/cppbook/chapter/9/3)
- [<FontIcon icon="fas fa-globe"/>9.4 Common word analysis](https://playbackpress.com/books/cppbook/chapter/9/4)
- [<FontIcon icon="fas fa-globe"/>9.5 Student and course registration system](https://playbackpress.com/books/cppbook/chapter/9/5)
- [<FontIcon icon="fas fa-globe"/>9.6 Inheritance and polymorphism](https://playbackpress.com/books/cppbook/chapter/9/6)
- [<FontIcon icon="fas fa-globe"/>9.7 Shape inheritance hierarchy](https://playbackpress.com/books/cppbook/chapter/9/7)
- [<FontIcon icon="fas fa-globe"/>9.8 Inheritance and polymorphism in C++](https://playbackpress.com/books/cppbook/chapter/9/8)
- [<FontIcon icon="fas fa-globe"/>9.9 Copy Constructor Example](https://playbackpress.com/books/cppbook/chapter/9/9)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a few programs:

::: tabs

@tab:active Problem 1

Problem 1 asks you to create a Date class to represent a date.

There should be an int for the day number, month number, and year number declared in the private section. Instead of having a setter for each of those, have one method called setDate(int m, int d, int y) that sets the date. You can have a getter method for each piece of data.

Add two constructors: one that takes no data and sets the date to 1/1/2000, and another that takes three ints to set the date.

Include a print() method that will print the date in this format: MM/DD/YYYY and a method called printLong() that prints in this format: `MonthName Day, Year`. For example, the first day of the 21st century should print `January 1, 2000`.

Include a method to add some number of days, months, and years to a Date:

```cpp
void addDays(int d)
void addMonths(int m)
void addYears(int y)
```

@tab Problem 2

Problem 2 asks you to create some related classes for playing card games. The data needed to be stored for a card is a numeric value and a suit. A card is responsible for being able to display itself. For example, when we want to display a two of hearts, ten of diamonds, jack of clubs, or ace of spades, the output would look like this:

```plaintext
2 of Hearts
10 of Diamonds
J of Clubs
A of Spades
```

Next, create a deck class. A deck is a collection of fifty-two cards. Each card is unique. There should be a card with a numeric value from two to the ace in each of the four suits. The responsibilities of the deck class are that it must be able to shuffle itself and deal out some number of cards from the deck. To shuffle the deck, you will need to randomly move cards around in the deck. You can generate a random number in C++ using the rand() function.

When dealing out cards, the user will ask the deck for some number of cards. If there are enough cards in the deck, it should deal those cards out. Once a card is dealt from the deck, it cannot be dealt again from the same deck. The user will pass in a vector of cards and the deck will fill it with the number of cards requested. If there aren't enough cards in the deck, print an error message and then kill the program with an exit(0).

When creating a class, you always have to think about the data needed for the class and the responsibilities of the class. The data for the class should be private and an interface to the class should be provided.

Think about how each card and deck should be constructed. Write at least one constructor for each class. Write the card class first and test it in a driver program. Then work on the deck class.

To test the deck, create a deck object, ask for 52 cards, and print each of those cards to the screen.

Next, alter the program so that it will allow a person to evaluate the probabilities of getting certain poker hands. Poker is a card game played with a deck of 52 cards. In this program, you only need to handle the five card variety of poker. The program will repeatedly get groups of five cards from the deck and count how many times each hand occurs.

In most variations of poker, the precedence of hands goes like this:

```plaintext
Royal Flush - 5 cards that are a straight (5 cards in numeric order) and a flush (5 cards that are the same suit) from the 10 to the Ace.
Straight Flush - 5 cards that are a straight (5 cards in numeric order) and a flush (5 cards that are the same suit).
Four of a Kind - any 4 cards with the same number.
Full House - three of a kind (3 cards with the same number) and a pair (two cards with the same number).
Flush - any 5 cards of the same suit.
Straight - any 5 cards in numeric order.
Three of a Kind - any 3 cards with the same number.
Two Pair - 2 sets of pairs.
Pair - any 2 cards with the same number.
High Card in your Hand - if you don't have any of the above, your high card is the best hand.
```

You will need to create additional classes with more responsibilities than the Deck and Card classes.

Your program needs an 'evaluator' that can look at a collection of cards and determine the best hand that can be made from those cards. In order to determine probabilities, deal a great number of hands and keep track of how many times each hand shows up.

In other words, your program might create 100,000 collections of five cards to be evaluated. The evaluator will count how many times a royal flush comes up, how many times a straight flush comes up, an so on. Your program will show the probabilities as percentages of the likelihood of getting each hand.

Below is a driver to illustrate how to use the evaluator:

```cpp :collapsed-lines
int main()
{
    //five card evaluator
    //create a poker evaluator for 5 card poker
    PokerEvaluator fiveCardPokerEvaluator;

    //set the number of hands to play - one hundred thousand this time
    fiveCardPokerEvaluator.setNumberOfHandsToPlay(100000);

    //play all the hands and track the statistics, then print the results to the screen
    fiveCardPokerEvaluator.playAndDisplay();

    return 0;
}
```

:::

---

## Part 10: Data Structures

This section describes how to build some common data structures: a hash table, a binary search tree, and a graph. It also describes how to use the STL `unordered_map` class.

- [<FontIcon icon="fas fa-globe"/>10.1 Simple linked list](https://playbackpress.com/books/cppbook/chapter/10/1)
- [<FontIcon icon="fas fa-globe"/>10.2 Simple hash table](https://playbackpress.com/books/cppbook/chapter/10/2)
- [<FontIcon icon="fas fa-globe"/>10.3 More complex hash table](https://playbackpress.com/books/cppbook/chapter/10/3)
- [<FontIcon icon="fas fa-globe"/>10.4 STL `unordered_map`](https://playbackpress.com/books/cppbook/chapter/10/4)
- [<FontIcon icon="fas fa-globe"/>10.5 Binary search tree](https://playbackpress.com/books/cppbook/chapter/10/5)
- [<FontIcon icon="fas fa-globe"/>10.6 Graph adjacency matrix](https://playbackpress.com/books/cppbook/chapter/10/6)

**Hands-On Practice**

Now that you have reviewed the guided code walk-throughs, write a program that includes a class which is equivalent of the `vector` called SafeArray. SafeArray has a method called `at` that returns the element at the specified position.

A SafeArray maintains a pointer to an array on the heap. Use the pointer to make the array grow and shrink with calls to `push_back` and `pop_back`.

The SafeArray will have a method called `size` that returns the number of items in it. Include a default constructor that sets the initial size of the underlying array to hold 10 elements. Include a destructor to `delete` the array when the SafeArray falls out of scope.

---

## Part 11: SQLite Databases

This section describes working with a SQLite database. SQLite is my favorite Database Management System (DBMS), because it is powerful and easy to add to any program. This section assumes that you are familiar with relational database design and SQL.

The first program shows how to use the API to write and run SQL queries in a C++ program. In the second, some of the repetitive code is abstracted into a separate class. In the third, transactions in SQLite are explained and it shows that they can be used to ensure the ACID properties of a database:

- [<FontIcon icon="fas fa-globe"/>11.1 The C++ SQLite API](https://playbackpress.com/books/cppbook/chapter/11/1)
- [<FontIcon icon="fas fa-globe"/>11.2 An Object Oriented Auction Program](https://playbackpress.com/books/cppbook/chapter/11/2)
- [<FontIcon icon="fas fa-globe"/>11.3 SQLite Transactions](https://playbackpress.com/books/cppbook/chapter/11/3)

**Hands-On Practice**

Extend the auction program from the second playback to include a method that prints the names and email addresses of all of the users who won an auction. Then write a method that prints an item followed by the names and email addresses of anyone who made a bid on the item.

---

## Comments and Feedback

You can find all of these code playbacks in my free book, [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Programming in C++](https://playbackpress.com/books/cppbook/). There are more free books here:

- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Programming with Python](https://playbackpress.com/books/pybook)
- [<FontIcon icon="fas fa-globe"/>Database Design and SQL for Beginners](https://playbackpress.com/books/sqlbook)
- [<FontIcon icon="fas fa-globe"/>Worked SQL Examples](https://playbackpress.com/books/workedsqlbook)
- [<FontIcon icon="fas fa-globe"/>Programming with SQLite](https://playbackpress.com/books/sqlitebook)
- [<FontIcon icon="fas fa-globe"/>An Introduction to Web Development from Back to Front](https://playbackpress.com/books/webdevbook)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Clojure](https://playbackpress.com/books/cljbook)
- [<FontIcon icon="fas fa-globe"/>An Animated Introduction to Elixir](https://playbackpress.com/books/exbook)
- [<FontIcon icon="fas fa-globe"/>A Brief Introduction to Ruby](https://playbackpress.com/books/rubybook)
- [<FontIcon icon="fas fa-globe"/>Mobile App Development with Dart and Flutter](https://playbackpress.com/books/flutterbook)
- [<FontIcon icon="fas fa-globe"/>OO Design Patterns with Java](https://playbackpress.com/books/patternsbook)
- [<FontIcon icon="fas fa-globe"/>How I Built It: Word Zearch](https://playbackpress.com/books/wordzearchbook)

Comments and feedback are welcome via email: <FontIcon icon="fas fa-envelope"/>`mark@playbackpress.com`

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Animated Introduction to Programming in C++",
  "desc": "In this tutorial, I’ll give you a comprehensive introduction to programming in C++. You don't need to have any previous programming experience in order to begin. Along the way, you will learn about the flow of control, variables, conditional statemen...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-programming-in-cpp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
