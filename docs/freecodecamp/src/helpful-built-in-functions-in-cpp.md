---
lang: en-US
title: "Helpful Built-in Functions in C++ that All Devs Should Know"
description: "Article(s) > Helpful Built-in Functions in C++ that All Devs Should Know"
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
      content: "Article(s) > Helpful Built-in Functions in C++ that All Devs Should Know"
    - property: og:description
      content: "Helpful Built-in Functions in C++ that All Devs Should Know"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/helpful-built-in-functions-in-cpp.html
prev: /programming/cpp/articles/README.md
date: 2025-07-23
isOriginal: false
author:
  - name: Ayush Mishra
    url : https://freecodecamp.org/news/author/Ayush01Mishra/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753105870543/7bdb3c7e-873b-46a2-bdbd-0d881aacedfc.png
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
  name="Helpful Built-in Functions in C++ that All Devs Should Know"
  desc="Built-in functions in C++ are those functions that are part of the C++ standard libraries. These functions are designed to provide common and essential functionality that is often required in programming. In this article, we will look at some of the ..."
  url="https://freecodecamp.org/news/helpful-built-in-functions-in-cpp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753105870543/7bdb3c7e-873b-46a2-bdbd-0d881aacedfc.png"/>

Built-in functions in C++ are those functions that are part of the C++ standard libraries. These functions are designed to provide common and essential functionality that is often required in programming.

In this article, we will look at some of the most commonly used built-in functions in C++ so you can start using them in your code.

---

## The `sqrt()` Function

You use the `sqrt()` function to determine the square root of the value of type double. It is defined inside the `<cmath>` header file.

::: info Syntax

```cpp
sqrt(n)
```

- **Parameter**: This function takes only one parameter of type double which is a number we want to find the square root of.
- **Return Type**: The square root of the value of type double.

:::

::: tip Example Code

Let’s look at an example so you can see how this function works:

```cpp
// C++ program to see the use of sqrt() function
#include <cmath>     
#include <iostream>  

using namespace std;  
int main()
{
    double x = 100;

    double answer;

    // Use the sqrt() function to calculate the square root of the number
    answer = sqrt(x);

    // Print the result 
    cout << answer << endl;

    return 0;
}
```

```plaintext title="Output"
10
```

:::

---

## The `pow()` Function

You use the `pow()` function to find the value of the given number raised to some power. This function is also defined inside the `<cmath>` header file.

::: info Syntax

```cpp
double pow(double x, double y);
```

- **Parameters**:
  - `x`: The base number.
  - `y`: The exponential power.
- **Return Type**: value of `x` raised to the power `y`.

:::

::: tip Example Code

Let’s look at an example to see how this works:

```cpp
// C++ program to see the use of the pow() function
#include <cmath>
#include <iostream>
using namespace std;

int main()
{
 // Declare an integer variable 'base' 
    int base = 5;

// Declare an integer variable 'exponent' 
    int exponent = 3;

// pow(5, 3) means 5^3 which is 5*5*5 = 125
// Use the pow() function to calculate base raised to the power of exponent
    int answer = pow(base, exponent);

// output the result
    cout << answer << endl;
}
```

```plaintext title="Output"
125
```

:::

---

## The `sort()` Function

The `sort()` function is part of STL's `<algorithm>` header. It is a function template that you can use to sort the random access containers, such as vectors, arrays, and so on.

::: info Syntax

```cpp
sort(arr , arr + n, comparator)
```

- **Parameters**:
  - `arr`: The pointer or iterator to the first element of the array.
  - `arr + n`: The pointer to the imaginary element next to the last element of the array.
  - **comparator:** The unary predicate function that is used to sort the value in some specific order. The default value of this sorts the array in ascending order.
- **Return Value**: This function does not return any value.

:::

::: tip Example Code

Let’s look at an example:

```cpp
#include <iostream>     
#include <algorithm>    // Header file that includes the sort() function

using namespace std;

int main()
{
    // Declare and initialize an integer array with unsorted elements
    int arr[] = { 13, 15, 12, 14, 11, 16, 18, 17 };

    // Calculate the number of elements in the array
    int n = sizeof(arr) / sizeof(arr[0]);

    // Use the built-in sort() function from the algorithm library
    sort(arr, arr + n);

    // Print the sorted array using a loop
    for (int i = 0; i < n; ++i)
        cout << arr[i] << " ";  

    return 0;
}
```

```plaintext title="Output"
11 12 13 14 15 16 17 18
```

:::

---

## The `find()` Function

The `find()` function is also part of the STL `<algorithm>` library. You use this function to find a value in the given range. You can use it with both sorted and unsorted datasets as it implements a linear search algorithm.

::: info Syntax

```cpp
find(startIterator, endIterator, key)
```

- **Parameters**:
  - `startIterator`: Iterates to the beginning of the range.
  - `endIterator`: Iterates to the end of the range.
  - `key`: The value to be searched.
- **Return Value**: If the element is found, then the iterator is set to the element. Otherwise, it iterates to the end.

:::

::: tip Example Code

Let’s look at an example to better understand how it works:

```cpp
// C++ program to see the the use of the find() function

#include <algorithm>   // Required for the find() function
#include <iostream>    
#include <vector>

using namespace std;   

int main()
{
    // Initialize a vector 
    vector<int> dataset{ 12, 28, 16, 7, 33, 43 };

    // Use the find() function to search for the value 7
    auto index = find(dataset.begin(), dataset.end(), 7);

    // Check if the element was found
    if (index != dataset.end()) {
        // If found, print the position (index) by subtracting the starting iterator
        cout << "The element is found at the "
             << index - dataset.begin() << "nd index";
    }
    else {
        // If not found
        cout << "Element not found";
   }
    return 0;
}
```

```plaintext title="Output"
The element is found at the 3rd index
```

:::

---

## The `binary_search()` Function

The `binary_search()` function is also used to find an element in the range - but this function implements binary search instead of linear search as compared to the `find()` function. It’s also faster than the `find()` function, but you can only use it on sorted datasets with random access. It’s defined inside the `<algorithm>` header file.

::: info Syntax

```cpp
binary_search(starting_pointer , ending_pointer , target);
```

- **Parameters**:
  - `starting_pointer`: Pointer to the start of the range.
  - `ending_pointer`: Pointer to the element after the end of the range.
  - `target`: Value to be searched in the dataset.
- **Return Value**:
  - Returns true if the target is found.
  - Else return false.

:::

::: tip Example Code

Let’s check out an example to see how it works:

```cpp
// C++ program for the binary_search() function

#include <algorithm>   
#include <iostream>    
#include <vector>

using namespace std;   

int main()
{
    // Initialize a sorted vector of integers
    vector<int> arr = { 56, 57, 58, 59, 60, 61, 62 };

    // binary_search() works only on sorted containers
    if (binary_search(arr.begin(), arr.end(), 62)) {
        // If found, print that the element is present
        cout << 62 << " is present in the vector.";
    }
    else {
        // If not found, print that the element is not present
        cout << 16 << " is not present in the vector";
    }

    cout << endl;
}
```

```plaintext title="Output"
62 is present in the vector.
```

:::

---

## The `max()` Function

You can use the `std::max()` function to compare two numbers and find the bigger one between them. It’s also defined inside the `<algorithm>` header file.

::: info Syntax

```cpp
max(a , b)
```

- **Parameters**:
  - `a`: First number
  - `b`: Second number
- **Return Value**:
  - This function returns the larger number between the two numbers `a` and `b`.
  - If the two numbers are equal, it returns the first number.

:::

::: tip Example Code

Here’s an example:

```cpp
// max() function

#include <algorithm>  
#include <iostream>   
using namespace std;

int main()
{
    // Declare two integer variables
    int a = 8 ;
    int b = 10 ;

    // Use the max() function to find the larger number between a and b
    int maximum = max(a, b);

    // Display the result with a meaningful message
    cout << "The maximum of " << a << " and " << b << " is: " << maximum << endl;

    return 0;
}
```

```plaintext title="Output"
The maximum of 8 and 10 is: 10
```

:::

---

## The `min()` Function

You can use the `std::min()` function to compare two numbers and find the smaller of the two. It’s also defined inside the `<algorithm>` header file.

::: info Syntax

```cpp
min(a , b)
```

- **Parameters**:
  - `a`: First number
  - `b`: Second number
- **Return Value**:
  - This function returns the smaller number between the two numbers `a` and `b`.
  - If the two numbers are equal, it returns the first number.

:::

::: tip Example Code

Here’s an example:

```cpp
// use of the min() function

#include <algorithm>  // For the built-in min() function
#include <iostream>   
using namespace std;

int main()
{
    // Declare two integer variables to store user input
    int a = 4 ;
    int b = 8 ;

    // Use the min() function to find the smaller 
    int smallest = min(a, b);

    // Display the result 
    cout << "The smaller number between " << a << " and " << b << " is: " << smallest << endl;

    return 0;
}
```

```plaintext title="Output"
The smaller number between 4 and 8 is: 4
```

:::

---

## The `swap()` Function

The `std::swap()` function lets you swap two values. It’s defined inside `<algorithm>` header file.

::: info Syntax

```cpp
swap(a , b);
```

- **Parameters**:
  - `a`: First number
  - `b`: Second number
- **Return Value**: This function does not return any value.

::: tip Example:

Here’s how it works:

```cpp
//  use of the swap() function

#include <algorithm>  // For the built-in swap() function
#include <iostream>   
using namespace std;

int main()
{
    int firstNumber = 8 ;
    int secondNumber = 9 ;


    // Use the built-in swap() function to exchange values
    swap(firstNumber, secondNumber);

    // Display values after swapping
    cout << "After the swap:" << endl;
    cout << firstNumber << " " << secondNumber << endl;

    return 0;
}
```

```plaintext title="Output"
After the swap:

9 8
```

:::

---

## The `tolower()` Function

You can use the `tolower()` function to convert a given alphabet character to lowercase. It’s defined inside the `<cctype>` header.

::: info Syntax

```cpp
tolower(c);
```

- **Parameter(s):**
  - `c`: The character to be converted.
- **Return Value**:
  - Lowercase of the character `c`.
  - Returns `c` if `c` is not a letter.

:::

::: tip Example Code

Here’s how it works:

```cpp
// C++ program

// use of tolower() function

#include <cctype>     
#include <iostream>   
using namespace std;

int main()
{
    // Declare and initialize a string with uppercase characters
    string str = "FRECODECAMP";

    for (auto& a : str) {
        a = tolower(a);
    }

    // Print the modified string 
    cout << str;

    return 0;
}
```

```plaintext title="Output"
freecodecamp
```

:::

---

## The `toupper()` Function

You can use the `toupper()` function to convert the given alphabet character to uppercase. It’s defined inside the `<cctype>` header.

::: info Syntax

```cpp
toupper(c);
```

- **Parameters**:
  - **c:** The character to be converted.
- **Return Value**
  - Uppercase of the character `c`.
  - Returns `c` if `c` is not a letter.

:::

::: tip Example Code

Here’s how it works:

```cpp
// use of toupper() function

#include <cctype>     
#include <iostream>   
using namespace std;

int main()
{
    // Declare and initialize a string 
    string str = "freecodecamp";

    for (auto& a : str) {
        a = toupper(a);
    }

    // Output the converted uppercase string
    cout << str;

    return 0;
}
```

```plaintext title="Output"
FREECODECAMP
```

:::

---

## Conclusion

Inbuilt functions are helpful tools in competitive programming and in common programming tasks. These help in improving code readability and enhance the efficiency of code. In the above article, we discussed some very useful common inbuilt functions. Some common inbuilt functions are `max()`, `min()`, `sort()`, and `sqrt()`, etc. By using these inbuilt libraries, we can reduce boilerplate code and speed up the process of software development. These help in writing more concise, reliable, and maintainable C++ programs.

If you enjoyed this article, you can check out more of my work here:  

<SiteInfo
  name="AYUSH MISHRA has Published 128 Articles "
  desc="Latest Articles and Resources to provide Simple and Easy Learning on Technical and Non-Technical Subjects. These tutorials and articles have been created by industry experts and university professors with a high level of accuracy and providing the best learning experience."
  url="https://tutorialspoint.com/authors/ayush-mishra-3/"
  logo="https://tutorialspoint.com/images/favicon.ico?1.0"
  preview="https://tutorialspoint.com/images/tp_bottom_logo.png"/>

And I’ve written some other tutorials about math and programming:

<SiteInfo
  name="Python Program to find area of square"
  desc="Learn how to calculate the area of a square using Python programming with this simple and easy guide."
  url="https://tutorialspoint.com/python-program-to-find-area-of-square/"
  logo="https://tutorialspoint.com/images/favicon-16x16.png"
  preview="https://tutorialspoint.com/images/tp_logo_436.png"/>

<SiteInfo
  name="C++ program to calculate area of circle"
  desc="Learn how to write a C++ program to calculate the area of a circle using the formula A = πr². Step-by-step guide with code examples."
  url="https://tutorialspoint.com/cplusplus-program-to-calculate-area-of-circle/"
  logo="https://tutorialspoint.com/images/favicon-16x16.png"
  preview="https://tutorialspoint.com/images/tp_logo_436.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Helpful Built-in Functions in C++ that All Devs Should Know",
  "desc": "Built-in functions in C++ are those functions that are part of the C++ standard libraries. These functions are designed to provide common and essential functionality that is often required in programming. In this article, we will look at some of the ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/helpful-built-in-functions-in-cpp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
