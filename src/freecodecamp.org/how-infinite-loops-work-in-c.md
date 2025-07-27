---
lang: en-US
title: "How Infinite Loops Work in C++"
description: "Article(s) > How Infinite Loops Work in C++"
icon: iconfont icon-cpp
category:
  - C++
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - c++
  - cpp
  - c-plus-plus
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Infinite Loops Work in C++"
    - property: og:description
      content: "How Infinite Loops Work in C++"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-infinite-loops-work-in-c.html
prev: /programming/cpp/articles/README.md
date: 2025-08-02
isOriginal: false
author:
  - name: AYUSH MISHRA
    url : https://freecodecamp.org/news/author/Ayush01Mishra/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754065314765/5c8e45f0-6a43-4f1f-b254-2603b7d37e0c.png
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
  name="How Infinite Loops Work in C++"
  desc="In C++, a loop is a part of code that is executed repetitively until the given condition is satisfied. An infinite loop is a loop that runs indefinitely, without any condition to exit the loop. In this article, we will learn about infinite loops in C..."
  url="https://freecodecamp.org/news/how-infinite-loops-work-in-c"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754065314765/5c8e45f0-6a43-4f1f-b254-2603b7d37e0c.png"/>

In C++, a loop is a part of code that is executed repetitively until the given condition is satisfied. An infinite loop is a loop that runs indefinitely, without any condition to exit the loop.

In this article, we will learn about infinite loops in C++, their types and causes, and their applications.

---

## What is an Infinite Loop in C++?

An infinite loop is any loop in which the loop condition is always true, leading to the given block of code being executed an infinite number of times. They can also be called endless or non-terminating loops, which will run until the end of the program’s life.

Infinite loops are generally accidental and occur due to some mistake by the programmer. But they are pretty useful, too, in different kinds of applications, such as creating a program that does not terminate until a specific command is given.

---

## Types of Infinite Loops in C++

There are several ways to create an infinite loop in C++, using different loop constructs such as while, for, and do-while loops. Here, we will explore each method and provide examples.

- Infinite While Loops
- Infinite For Loops
- Infinite do-while Loops

### 1. Infinite Loop using While Loop

This is the most popular type of while loop due to its simplicity. You just pass the value that will result in true as the condition of the while loop.

::: info Syntax

```cpp
while(1)
// or
while(true)
```

:::

::: tip Example Code

```cpp
// Example of Infinite loop in C++ using for loop
#include <iostream>
using namespace std;

int main() {
    // Infinite loop using while
    while (true) {
        cout << "This is an infinite loop." << endl;
    }
    return 0;
}
```

```plaintext title="output"
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
………………….
```

:::

### Infinite Loop using For Loop

In a for loop, if we remove the initialization, comparison, and update conditions, then it will result in an infinite loop.

::: info Syntax

```cpp
for(;;)
```

:::

::: tip Example Code

```cpp
//Example of Infinite loop in C++ using for loop
#include <iostream>
using namespace std;

int main() {
    // Infinite loop using for loop
    for (;;) {
        cout << "This is an infinite loop." << endl;
    }
    return 0;
}
```

```plaintext title="output"
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
……………………….
```

:::

### Infinite Loop using do-while Loop

Just like the other two loops discussed above, we can also create an infinite loop using a do-while loop. Although this loop is not preferred much due to its longer syntax.

::: info Syntax

```cpp
do{
}while(1)
```

:::

::: tip Example Code

```cpp
// Infinite loop in C++ using do-while loop

#include <iostream>
using namespace std;

int main() {
   // infinite do-while loop
    do {
        cout << "This is an infinite loop." << endl;
    } while (true);

    return 0;
}
```

```plaintext title="output"
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
……………………….
```

:::

---

## Common Causes of Accidental Infinite Loops in C++

Infinite loops can be both intentional and accidental. Accidental infinite loops are those which were not intended by the programmer but are caused due to some error in the program.

Following are some of the errors that may cause infinite loops in your programs unintentionally:

### 1. Missing Update Statements

Infinite loops are caused when you forget to add an update condition inside the loop, which will terminate the loop in the future. The following program illustrates such a scenario:

::: tip Example Code

```cpp
// Infinite loop caused due to missing update statement

#include <iostream>
using namespace std;

int main() {
    int i = 3;
    while (i < 5) {
        cout << i <<endl;
        // Missing update: i++;
    }
    return 0;
}
```

```plaintext title="output"
3
3
3
3
3
3
3
……………………
```

To fix the above code, we can add an update condition inside the loop like this:

```cpp
// fixed code

#include<iostream>
using namespace std ;

int main() {
int i = 3;
while (i < 5) {
    cout << i << endl;
    i++; // add the condition
}

return 0 ; 

}
```

```plaintext title="output"
3
4
```

:::

### Incorrect Loop Conditions

The conditions mentioned inside the loop body are crucial to terminate a loop. An incorrect loop condition can result in an infinite loop. The following program illustrates such a scenario:

::: tip Example Code

```cpp
// Infinite loop caused due to incorrect loop conditions

#include <iostream>
using namespace std;

int main() {
    int i = 2;
    while (i >= 0) {  
        cout << "Hello AnshuAyush " << endl;

    }
    return 0;
}
```

```plaintext title="output"
Hello AnshuAyush
Hello AnshuAyush
Hello AnshuAyush
Hello AnshuAyush
Hello AnshuAyush
……………………..
```

To fix the above code, we can update `i` inside the loop to eventually make the condition false:

```cpp
// fixed code 

#include<iostream>
using namespace std ;

int main() {
int i = 2;
while (i >= 0) {  
    cout << "Hello AnshuAyush" << endl;
    i--; // loop will stop
}

return 0 ; 

}
```

```plaintext title="Output"
Hello AnshuAyush
Hello AnshuAyush
Hello AnshuAyush
```

:::

### Logical Errors in the Loop

In many scenarios, infinite loops are caused by small logical errors in the code. The following program illustrates such a scenario:

::: tip Example Code

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 3; i >2; i += 2) {  
        cout <<"This is an infinite loop" << endl;
    }
    return 0;
}
```

```plaintext title="output"
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
This is an infinite loop.
……………………….
```

To fix the above code, we can either use a decreasing condition or use an incrementing loop condition.

Decreasing condition:

```cpp
for (int i = 3; i > 0; i--) {
    cout <<"This is NOT an infinite loop" << endl;
}
```

Increasing condition:

```cpp
for (int i = 3; i < 10; i += 2) {
    cout <<"Loop will end when i reaches 10" << endl;
}
```

:::

---

## Applications of Infinite Loops in C++

Infinite loops do not only occur by accident, as I mentioned above. You can also create them on purpose for different use cases. The following are some of the common applications where you might use infinite loops intentionally:

- **Event loops:** Many Graphical User Interfaces (GUIs) use infinite loops to keep the program running and responsive to user actions.
- **Server applications:** Web servers use infinite loops to continuously listen to client connections or requests.
- **Embedded systems:** Embedded systems, such as microcontrollers, frequently use infinite loops as their main program loops to continuously respond to external events.
- **User inputs:** Infinite loops are also used to wait for valid user inputs. The loop keeps running until a valid input is provided by the user. We’ll look at an example of this one.

### Using Infinite Loops to Take User Input in C++

Infinite loops are commonly used in scenarios where a program needs to continuously take user input until a specific condition is met, such as exiting the program or getting a valid user input. The following program demonstrates how we can take user input from the user until a specific condition is met:

::: tip Example Code

```cpp
// C++ Program to take user input from users using infinite loops

#include <iostream>
#include <string>
using namespace std;

int main() {
    string input;

    while (true) {
        cout << "Enter a command (type 'exit' to quit): ";
        getline(cin, input);

        if (input == "exit") {
        // Exit the loop if the user types 'exit'
            break; 
        }

        cout << "You entered: " << input << endl;
        // Process the input
    }
    cout << "Program exited." << endl;
    return 0;
}
```

```plaintext title="output"
Enter a command (type 'exit' to quit): Anshu
You entered: Anshu
Enter a command (type 'exit' to quit): Ayush
You entered: Ayush
Enter a command (type 'exit' to quit): exit
Program exited.
```

:::

---

## Conclusion

Infinite loops aren’t always dangerous. They can be very useful when used with proper control, like break statements or condition checks. But if you use them carelessly, they can crash your program.

So just make sure you check your loop conditions and test your code using print statements between the programs to discover any unexpected behavior. In sum, infinite loops can be very powerful when handled carefully but can be very risky if left unchecked.

If you are beginner in C++, I’ve covered many programming topic in detail on the [<FontIcon icon="fas fa-globe"/>TutorialsPoint platform](https://tutorialspoint.com/authors/ayush-mishra-3), where I regularly write about beginner-friendly programming concepts.

::: info 📚 Other C++ tutorials you may like:

<SiteInfo
  name="C++ Program for Absolute Sum of Array Elements"
  desc="Learn how to write a C++ program to calculate the absolute sum of array elements with detailed examples and explanations."
  url="https://tutorialspoint.com/cplusplus-program-for-absolute-sum-of-array-elements"
  logo="https://tutorialspoint.com/images/favicon-16x16.png"
  preview="https://tutorialspoint.com/images/tp_logo_436.png"/>

<SiteInfo
  name="First and last position of an element in a sorted array in C++"
  desc="Learn how to find the first and last position of an element in a sorted array using C++. This guide provides clear examples and code snippets."
  url="https://tutorialspoint.com/first-and-last-position-of-an-element-in-a-sorted-array-using-cplusplus"
  logo="https://tutorialspoint.com/images/favicon-16x16.png"
  preview="https://tutorialspoint.com/images/tp_logo_436.png"/>

<SiteInfo
  name="C++ program to find the sum of elements between two given indices in array"
  desc="Learn how to find the sum of elements between two given indices in an array using C++. This tutorial provides a step-by-step guide and example code."
  url="https://tutorialspoint.com/cplusplus-program-to-find-the-sum-of-elements-between-two-given-indices-in-array"
  logo="https://tutorialspoint.com/images/favicon-16x16.png"
  preview="https://tutorialspoint.com/images/tp_logo_436.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Infinite Loops Work in C++",
  "desc": "In C++, a loop is a part of code that is executed repetitively until the given condition is satisfied. An infinite loop is a loop that runs indefinitely, without any condition to exit the loop. In this article, we will learn about infinite loops in C...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-infinite-loops-work-in-c.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
