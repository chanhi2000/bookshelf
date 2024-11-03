---
lang: en-US
title: "Bubble Sort – Algorithm in Java, C++, Python with Example Code"
description: "Article(s) > Bubble Sort – Algorithm in Java, C++, Python with Example Code"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Java
  - Python
  - C++
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - java
  - py
  - python
  - c++
  - cpp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Bubble Sort – Algorithm in Java, C++, Python with Example Code"
    - property: og:description
      content: "Bubble Sort – Algorithm in Java, C++, Python with Example Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/bubble-sort-algorithm-in-java-cpp-python-with-example-code.html
prev: /academcis/coen/articles/README.md
date: 2022-09-30
isOriginal: false
author: Kolade Chris
cover: https://freecodecamp.org/news/content/images/2022/09/bubbleSortCover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Java > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Bubble Sort – Algorithm in Java, C++, Python with Example Code"
  desc="Bubble sort is a type of sorting algorithm you can use to arrange a set of values in ascending order. If you want, you can also implement bubble sort to sort the values in descending order. A real-world example of a bubble sort algorithm is how the c..."
  url="https://freecodecamp.org/news/bubble-sort-algorithm-in-java-cpp-python-with-example-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/09/bubbleSortCover.png"/>

Bubble sort is a type of sorting algorithm you can use to arrange a set of values in ascending order. If you want, you can also implement bubble sort to sort the values in descending order.

A real-world example of a bubble sort algorithm is how the contact list on your phone is sorted in alphabetical order. Or the sorting of files on your phone according to the time they were added.

In this article, I will explain all you need to know about the bubble sort algorithm with some infographics I’ve prepared. I will then show you example code of the bubble sort algorithm in Python, Java, and C++.

---

## How the Bubble Sort Algorithm Works

To implement a bubble sort algorithm, developers often write a function, and then a loop within a loop – inner loop and outer loop. You will see it in action when I show you the code in Python, C++, and Java.

Let's say we want to sort a series of numbers 5, 3, 4, 1, and 2 so that they are arranged in ascending order…

The sorting begins the first iteration by comparing the first two values. If the first value is greater than the second, the algorithm pushes the first value to the index of the second value.

### First Iteration of the Sorting

::: tabs

@tab:active Step 1

In the case of 5, 3, 4, 1, and 2, 5 is greater than 3. So 5 takes the position of 3 and the numbers become 3, 5, 4, 1, and 2. 

![bubble1](https://freecodecamp.org/news/content/images/2022/09/bubble1.png)

@tab Step 2

The algorithm now has 3, 5, 4, 1, and 2 to compare, this time around, it compares the next two values, which are 5 and 4. 5 is greater than 4, so 5 takes the index of 4 and the values now become 3, 4, 5, 1, and 2. 

![bubble2](https://freecodecamp.org/news/content/images/2022/09/bubble2.png)

@tab Step 3

The algorithm now has 3, 4, 5, 1, and 2 to compare. It compares the next two values, which are 5 and 1. 5 is greater than 1, so 5 takes the index of 1 and the numbers become 3, 4, 1, 5, and 2. 
 
![bubble3](https://freecodecamp.org/news/content/images/2022/09/bubble3.png)

@tab Step 4

The algorithm now has 3, 4, 1, 5, and 2 to compare. It compares the next two values, which are 5 and 2. 5 is greater than 2, so 5 takes the index of 2 and the numbers become 3, 4, 1, 2, and 5.

![bubble4](https://freecodecamp.org/news/content/images/2022/09/bubble4.png)

:::

That’s the first iteration. And the numbers are now arranged as 3, 4, 1, 2, and 5 – from the initial 5, 3, 4, 1, and 2. As you might realize, 5 should be the last number if the numbers are sorted in ascending order. This means the first iteration is really completed.

### Second Iteration of the Sorting and the Rest

The algorithm starts the second iteration with the last result of 3, 4, 1, 2, and 5. This time around, 3 is smaller than 4, so no swapping happens. This means the numbers will remain the same.

![bubbleb1](https://freecodecamp.org/news/content/images/2022/09/bubbleb1.png)

The algorithm proceeds to compare 4 and 1. 4 is greater than 1, so 4 is swapped for 1 and the numbers become 3, 1, 4, 2, and 5.

![bubbleb2](https://freecodecamp.org/news/content/images/2022/09/bubbleb2.png)

The algorithm now proceeds to compare 4 and 2. 4 is greater than 2, so 4 is swapped for 2 and the numbers become 3, 1, 2, 4, and 5.

![bubbleb4](https://freecodecamp.org/news/content/images/2022/09/bubbleb4.png)

4 is now in the right place, so no swapping occurs between 4 and 5 because 4 is smaller than 5.

![bubbleb5](https://freecodecamp.org/news/content/images/2022/09/bubbleb5.png)

That’s how the algorithm continues to compare the numbers until they are arranged in ascending order of 1, 2, 3, 4, and 5.

![bubblebFinal](https://freecodecamp.org/news/content/images/2022/09/bubblebFinal.png)

---

## Python Code Example of Bubble Sort Algorithm

Here’s a code example showing the implementation of the bubble sort algorithm in Python:

```py
def bubble_sort(arr):
    arr_len = len(arr)
    for i in range(arr_len-1):
        flag = 0
        for j in range(0, arr_len-i-1):
            if arr[j] > arr[j+1]:
                arr[j+1], arr[j] = arr[j], arr[j+1]
                flag = 1
                if flag == 0:
                    break
    return arr

arr = [5, 3, 4, 1, 2]
print("List sorted with bubble sort in ascending order: ", bubble_sort(arr))

# Output: List sorted with bubble sort in ascending order:  [1, 2, 3, 4, 5]
```

To make the sorting appear in descending order, just replace the greater than symbol (`>`) with lesser than (`<`):

```py
def bubble_sort(arr):
    arr_len = len(arr)
    for i in range(arr_len-1):
        flag = 0
        for j in range(0, arr_len-i-1):
            if arr[j] < arr[j+1]:
                arr[j+1], arr[j] = arr[j], arr[j+1]
                flag = 1
                if flag == 0:
                    break
    return arr

arr = [5, 3, 4, 1, 2]
print("List sorted with bubble sort in descending order: ", bubble_sort(arr))

# Output: List sorted with bubble sort in descending order:  [5, 4, 3, 2, 1]
```

Here’s a version of the code where I added comments to so you can know what’s going on:

```py
# Define a function to create the sorting and pass in an array as the parameter
def bubble_sort(arr):
    # Get the length of the array
    arr_len = len(arr)
    # Loop through the array to access the elements in it, including the last one - outer loop
    for i in range(arr_len-1):
        # declare a flag variable to check if a swap has occured - for optimization
        flag = 0
        # create a loop to compare each element of the array till the last one
        for j in range(0, arr_len-i-1):
            # compare 2 adjacent elements and sort them in ascending order
            if arr[j] > arr[j+1]:
                # Swap the elements if they are not in the right order
                arr[j+1], arr[j] = arr[j], arr[j+1]
                flag = 1
                # break out of the loop at 0
                if flag == 0:
                    break
    # return value must be in the outer loop block
    return arr

arr = [5, 3, 4, 1, 2]
print("List sorted with bubble sort in ascending order: ", bubble_sort(arr))

# Output: List sorted with bubble sort in ascending order:  [1, 2, 3, 4, 5]
```

---

## Java Code Example of Bubble Sort Algorithm

To implement the bubble sort algorithm in Java, you have to write more code than you did with Python.

That’s why I added comments to let you know about the steps as they are executed:

```java
import java.util.Arrays;

class Main {
  static void bubbleSort(int array[]) {
    int size = array.length;
    // loop over each element of the array to access them
    for (int i = 0; i < size - 1; i++)
      // compare the elements of the array with a loop
      for (int j = 0; j < size - i - 1; j++)
        // compare two adjacent elements in the array
        if (array[j] > array[j + 1]) {
          // Swap if the elements aren't in the right order
          int temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
  }

  public static void main(String args[]) {
    int[] data = { 5, 3, 4, 1, 2 };
    // call the method using class name
    Main.bubbleSort(data);

    System.out.println("Array sorted with bubble sort: ");
    System.out.println(Arrays.toString(data));
  }
}

// Output: Array sorted with bubble sort: [1, 2, 3, 4, 5]
```

---

## C++ Code Example of Bubble Sort Algorithm

Like I did for Java, I also added comments to the implementation of the bubble sort algorithm in C++ because it’s more verbose than that of Python and Java:

```cpp
#include <iostream>

using namespace std;

// create a function to execute bubble sort
void bubble_sort(int array[], int size) {
  // loop over each element of the array to access them - outer loop
  for (int step = 0; step < (size-1); ++step) {
    // check if swapping occurs
    int swapped = 0;
    // loop over each element of the array to compare them - inner loop
    for (int i = 0; i < (size-step-1); ++i) {
     // compare 2 adjacent elements and sort them in ascending order
      if (array[i] > array[i + 1]) {

        //Swap the elements if they are not in the right order
        int temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;

        swapped = 1;
      }
    }

    // break out of the loop if no swapping occurs anymore
    if (swapped == 0)
      break;
  }
}

// print an array
void printArray(int array[], int size) {
  for (int i = 0; i < size; ++i) {
    cout << "  " << array[i];
  }
  cout << "\n";
}

int main() {
  int data[] = {5, 3, 4, 1, 2};
  // find the length of the array
  int size = sizeof(data) / sizeof(data[0]);

  // call the function   
  bubble_sort(data, size);

  cout << "Array sorted with bubble sort: \n";
  printArray(data, size);
}

// Output: Array sorted with bubble sort: 1  2  3  4  5
```

---

## Final Thoughts

I won’t say the implementation of the bubble sort algorithm is either simple or hard. For an experienced programmer, it’s not hard, but for a beginner, it could be intimidating at first.

However, to really understand how the algorithm works, you need to know that:

- you need to write a function to pass the data \[or array\] into
- you need to write an outer loop to access the elements
- you need to write an inner loop to compare the elements
- you need to call the function and pass in the data (array)

I hope this article helps you understand the bubble sort algorithm and how to implement it.

Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Bubble Sort – Algorithm in Java, C++, Python with Example Code",
  "desc": "Bubble sort is a type of sorting algorithm you can use to arrange a set of values in ascending order. If you want, you can also implement bubble sort to sort the values in descending order. A real-world example of a bubble sort algorithm is how the c...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/bubble-sort-algorithm-in-java-cpp-python-with-example-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
