---
lang: en-US
title: "LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts"
description: "Article(s) > LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - py
  - python
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts"
    - property: og:description
      content: "LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/leetcode-dsa-concepts-handbook/
prev: /academics/coen/articles/README.md
date: 2025-05-30
isOriginal: false
author:
  - name: Eda Eren
    url : https://freecodecamp.org/news/author/edae/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748548297673/2ea8ee5a-e873-4401-b024-86412bf00f8a.png
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts"
  desc="It may seem like an oxymoron when the words ”LeetCode” and ”meditation” are used together - after all, one thing that almost everyone can agree is that LeetCode is challenging. It's called grinding LeetCode for a reason. It doesn't have anything to d..."
  url="https://freecodecamp.org/news/leetcode-dsa-concepts-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748548297673/2ea8ee5a-e873-4401-b024-86412bf00f8a.png"/>

It may seem like an oxymoron when the words "LeetCode" and "meditation" are used together - after all, one thing that almost everyone can agree is that [<VPIcon icon="fas fa-globe"/>LeetCode](https://leetcode.com/) is challenging. It's called *grinding* LeetCode for a reason.

It doesn't have anything to do with the platform, of course, but rather what it represents: tackling problems for hours on end, usually to find a solution that is even harder to understand.

But what is more challenging is finding a roadmap to solve those problems with very little knowledge of data structures and algorithms. This handbook is more or less based on the [<VPIcon icon="fas fa-globe"/>Blind 75 list](https://neetcode.io/practice?tab=blind75) that's included in [<VPIcon icon="fas fa-globe"/>neetcode.io](http://neetcode.io)'s practice problems. This is an amazing resource that offers an organized study roadmap for solving LeetCode problems.

In fact, why not take a more structured and *calmer* approach? We can treat learning about the topics on the list like taking a brief walk in nature - a sort of meditation, if you will.

That said, this handbook is not about specific problems. Rather it’s about understanding the concepts behind them in a casual manner. It is also language agnostic - sometimes you’ll see TypeScript, sometimes Python, and sometimes JavaScript.

This handbook also requires you to be patient, to relax, to take a step back and pay attention. The mid-quality GIFs used in the handbook (maybe ironically!) intend to encourage this. They are not videos, so you can wait for it to come to a moment that you didn't understand or missed instead of hastily rewinding it back or rushing to a certain point in the future.

Solving hundreds of LeetCode problems may be the gate to go through to get an interview at big tech companies…but learning the topics that the problems are about is not under anyone's monopoly.

With that said, let's start the first chapter.

::: note Prerequisites

Before diving in, some familiarity with TypeScript/JavaScript and Python may be helpful, as these are the languages I use for the examples. Also, a basic understanding of Big O notation is useful as we go over time and space complexities.

Even though we don't go through the mathematics behind the concepts, some basic mathematical knowledge can also help. That said, it's definitely not necessary to enjoy or learn something useful from this handbook.

:::

---

## Table of Contents

(1/15) [Chapter One: Arrays & Hashing](#heading-chapter-one-arrays-amp-hashing)
(2/15) [Chapter Two: Two Pointers](#heading-chapter-two-two-pointers)
(3/15) [Chapter Three: Sliding Window](#heading-chapter-three-sliding-window)
(4/15) [Chapter Four: Stack](#heading-chapter-four-stack)
(5/15) [Chapter Five: Binary Search](#heading-chapter-five-binary-search)
(6/15) [Chapter Six: Linked Lists](#heading-chapter-six-linked-lists)
(7/15) [Interlude: Fast & Slow Pointers](#heading-interlude-fast-amp-slow-pointers)
(8/15) [Chapter Seven: Trees](#heading-chapter-seven-trees)
(9/15) [Chapter Eight: Heap / Priority Queue](#heading-chapter-eight-heap-priority-queue)
(10/15) [Chapter Nine: Backtracking](#heading-chapter-nine-backtracking)
(11/15) [Chapter Ten: Tries](#heading-chapter-ten-tries)
(12/15) [Chapter Eleven: Graphs](#heading-chapter-eleven-graphs)
(13/15) [Chapter Twelve: Dynamic Programming](#heading-chapter-twelve-dynamic-programming)
(14/15) [Chapter Thirteen: Intervals](#heading-chapter-thirteen-intervals)
(15/15) [Chapter Fourteen: Bit Manipulation](#heading-chapter-fourteen-bit-manipulation)

---

## Chapter One: Arrays & Hashing

Let's very briefly get to know our topics for this chapter: dynamic arrays, hash tables, and prefix sums.

### Dynamic Arrays

Dynamic arrays are, well, dynamic. They're flexible and can change their size during execution.

Python's `list` type is a dynamic array. We can create an `items` list, for example:

```py
items = [3, 5]
```

The **length** of `items` is 2, as you can see, but its **capacity** is greater than or equal to its length. In fact, capacity refers to the total size, whereas length is the actual size.

Since dynamic arrays are still arrays, they need a contiguous block of memory.

We can easily add an item to `items`:

```py
items.append(7)
```

And add some more:

```py
items.append(9)
items.append(11)
items.append(13)
```

All the while, the length and capacity of `items` keep growing dynamically.

![Animated visualization of four boxes for an "items" array that holds the values 3 and 5 on initialization, appending 7 to the array adds four more boxes to it.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747912308935/960ff442-e095-4781-8ab5-9b84e0ecb804.gif)

::: info Time and space complexity

Accessing an element is $O\left(1\right)$ as we have [<VPIcon icon="fa-brands fa-wikipedia-w"/>random access](https://en.wikipedia.org/wiki/Random_access).

Inserting a new element or deleting an element is $O\left(n\right)$ (think about having to shift all the elements before inserting or after deleting an item). But, in order to not be too pessimistic, we can look at [<VPIcon icon="fa-brands fa-wikipedia-w"/>amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis) - in that case, inserting/deleting at the end of the array becomes $O\left(1\right)$.

Space complexity is $O\left(n\right)$, as the need for space will grow proportionately as the input increases.

:::

If you need more info about time and space complexity, you can [**refer to this guide**](/freecodecamp.org/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c.md).

### Hash Tables

A hash table maps keys to values, implementing an *associative array*.

Python's `dict` is one example:

```py
number_of_petals = {
    'Euphorbia': 2, 
    'Trillium': 3, 
    'Columbine': 5,
}
```

Also JavaScript's "object"s:

```js
let numberOfMoons = {
  'Earth': 1,
  'Mars': 2,
  'Jupiter': 95,
  'Saturn': 146,
  'Uranus': 27,
  'Neptune': 14,
};
```

There are two important ingredients for a hash table:

- an array of "buckets" to store the data
- a hash function to map the data to a specific index in the array

Hashes are usually large integers, so to find an index, we can take the result of the hash modulo the array's length.

![Animated visualization of an array with 5 buckets, the hash function finding a bucket for each value in number_of_petals dict.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747913143164/2a8371ba-133c-4d5a-a270-b44f935fc91b.gif)

**Note:** The **hash function** that's mapping the elements to buckets is **not** the `hash()` used in the visual (it's just a [<VPIcon icon="fa-brands fa-python"/>Python function](https://docs.python.org/3/library/functions.html#hash) to calculate the hash value of an object). The hash function in this case is the modulo ( `%` ) operation.

Here, with the hash value of each item's key, we calculate the remainder when it's divided by the length of the array to find which "bucket" it should go to.

The ratio of the number of elements to the number of buckets is called the **load factor**, and the higher it gets, the more **collisions** (when elements have to be inserted at the same place in the array) occur.

There are some collusion resolution tactics like **linear probing** (probing through the array until finding an empty bucket) and **chaining** (chaining multiple elements as linked lists), but we'll not go into those for now.

::: info Time and space complexity

The average case for searching, inserting, and deleting operations are $O\left(1\right)$ as we use keys to look up the values.

Space complexity is $O\left(n\right)$ as it grows linearly with the amount of elements.

:::

### Prefix Sums

A prefix sum is the sequence of numbers we get after adding the sums of running totals of another sequence. It's also called the **cumulative sum**.

The first element of the resulting array is the first element of the input array. That's fine. We start at the second item, and add the previous numbers each time as we go. That is:

$$
\text{result}[i]=\begin{cases}
\text{nums}[0]&\text{if}\:i\:\text{is zero}\\
\text{result}[i−1]+\text{nums}[i]&\text{if}\:i\ge{1}
\end{cases}
$$

In code, we can implement that easily:

```py
def runningSum(nums):
    result = [nums[0]]

    for i in range(1, len(nums)):
        result.append(result[i - 1] + nums[i])

    return result
```

![Animated visualization of runningSum of the array `[1, 2, 3, 4, 5]`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747913501237/e9c95eef-6310-457c-b94e-da5a61fc890a.gif)

::: info Time and space complexity

Time complexity for a prefix sum is $O\left(n\right)$ because we're iterating over each of the elements in the array.

The space complexity is also $O\left(n\right)$ because the need for external space grows as the length of the original array grows.

:::

---

## Chapter Two: Two Pointers

One of the techniques of iterating through an array is the **two pointers technique**, and it is as simple as it sounds: we just keep two pointers, one starting from the left, and the other from the right, gradually getting closer to each other.

![Animated visualization of two pointers technique](https://cdn.hashnode.com/res/hashnode/image/upload/v1747913831967/b8e251a9-2e9e-41be-84ed-46f2559b1515.gif)

### Palindrome example

A very basic example can be the one where we check if a string is a palindrome or not. A palindrome is a string that reads the same forwards and backwards.

In an imaginary world where all the inputs always consist of lowercase English letters, we can do it like this:

```ts
// s consists of lowercase English letters
function isPalindrome(s: string) {
  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    if (s[left++] !== s[right--]) {
      return false;
    }
  }

  return true;
}
```

We initialize two pointers: `left` and `right`. `left` points to the start of the array, while the `right` points to the last element. As we loop while `left` is less than `right`, we check if they are equal. If not, we return `false` immediately. Otherwise, our `left` pointer is increased - that is, it's moved to the *right* one step, and our `right` pointer is decreased, meaning that it's moved to the *left* one step. When they eventually overlap, the loop terminates, and we return `true`.

Let's say our string is `'racecar'`, which is a palindrome. It will go like this:

![Animated visualization of isPalindrome, with the example 'racecar' resulting in true.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747913932303/e60727a0-4e45-4452-8648-d35d1ae680c9.gif)

### Squares of a sorted array example

Another example where we can use the two pointers technique is the problem [<VPIcon icon="fas fa-globe"/>Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array).

The description says:

> Given an integer array `nums` sorted in **non-decreasing** order, return _an array of **the squares of each number** sorted in non-decreasing order_.

For example, if the input is `[-4, -1, 0, 3, 10]`, the output should be `[0, 1, 9, 16, 100]`.

Now obviously, we can just square each one, and then sort the array with a built-in sort method, and be done with it. But a sorting operation is never better than $O\left(n\:log_{}{n}\right)$ runtime, so we can do it using two pointers in just $O\left(n\right)$ time:

```ts
function sortedSquares(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  let result = [];

  while (left <= right) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) {
      result.push(nums[left++] ** 2);
    } else {
      result.push(nums[right--] ** 2);
    }
  }

  return result.reverse();
}
```

We compare the absolute value of the items that `left` and `right` are pointing to, and push the square of the greater one to our `result` array. And we return the reversed version of it.

::: note

The reason we return the reversed result is that the array is initially already sorted, and we get the largest absolute value first. The reason that works is related to how *two pointers* work: as we start from both ends, we initially start with the smallest and largest values in the array.

:::

Because we only make one pass through the array while comparing, and then later reversing, it ends up being $O\left(n\right)$, a better runtime than $O\left(n\:log_{}{n}\right)$.

---

## Chapter Three: Sliding Window

Now that we're familiar with the Two Pointers technique, we can add another one to our toolbox: the Sliding Window. It's usually used for operations done on the subsets of a given data. It also comes in two flavors: **fixed window size** and **dynamic window size**.

### Fixed window size

If we have a size constraint in a given problem - say, we need to check a $k$-sized subarray - sliding window is an appropriate technique to use.

For example, getting the maximum subarray (of size $k$) sum of a given array can be done like this:

![Animated visualization of fixed window size sliding window technique, array `[1, 5, 4, 2, 9]` with k = 3, having the `maxSum` of 15.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747914357907/ecd51e70-e649-4856-a563-47621b950526.gif)

Note that the window size is k, and it doesn't change throughout the operation - hence, **fixed size**.

A very cool thing to notice here is that with each **slide**, what happens to our sum is that we *add* the right element, and *decrease* the left element.

Let's look at an example for getting the maximum sum of subarray with given size `k`:

```ts :collapsed-lines
function maxSubarray(numbers: number[], k: number) {
  if (numbers.length < k) {
    return 0;
  }

  let currentSum = 0;

  // Initial sum of the first window 
  for (let i = 0; i < k; i++) {
    currentSum += numbers[i];
  }

  let maxSum = currentSum;

  let left = 0;
  let right = k;

  while (right < numbers.length) {
    currentSum = currentSum - numbers[left++] + numbers[right++];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

::: note

Updating the pointers can be done outside the brackets as well, like this:

```ts
while (right < numbers.length) {
  currentSum = currentSum - numbers[left] + numbers[right];
  maxSum = Math.max(maxSum, currentSum);
  left++;
  right++;
}
```

:::

Since the postfix operator returns the value first, they can be used inside the brackets to be slightly more concise.

Here, we first get the initial sum of our window using the `for` loop, and set it as the maximum sum.

Then we initialize two pointers: `left` that points to the left end of the window, and `right` that points to the right end of the window. As we loop, we update our `currentSum`, decreasing the `left` value, and adding the `right` value. When our current sum is more than the maximum sum, `maxSum` variable is updated as well.

### Dynamic window size

As opposed to the fixed window size version, the size of the window changes dynamically this time.

For example, let's take a brief look at the problem [<VPIcon icon="fas fa-globe"/>Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock). We need to choose a day to buy a stock, and sell it in the *future*. The numbers in the array are prices, and we need to buy the stock at as low a price as we can, and sell it as high as we can.

We can initialize `left` and `right` pointers again, but this time, we'll update them depending on a condition. When the left item is less than the one on the right, that means it's good - we can buy and sell at those prices, so we get their difference and update our `maxDiff` variable that holds the maximum difference between the two.

If, however, the left one is greater than the right one, we update our `left` pointer to be where the `right` is at. In both cases, we'll continue updating `right` until we reach the end of the array.

With the blue arrow indicating the left pointer, and the red the right one, the process looks like this:

![Animated visualization of dynamic window size sliding window technique, array `[7, 1, 5, 3, 6]` having the `maxDiff` of 5.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747914550588/222996a0-d2a6-414e-86cf-fe60deb908d8.gif)

The solution looks like this:

```ts
function maxProfit(prices: number[]): number {
  let left = 0;
  let right = left + 1;
  let maxDiff = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      let diff = prices[right] - prices[left];
      maxDiff = Math.max(maxDiff, diff);
    } else {
      left = right;
    }

    right++;
  }

  return maxDiff;
}
```

::: note

This one is also called **fast/catch-up** version of dynamic sliding window, because the `left` pointer jumps to catch up with the `right` pointer in the `else` block.

:::

::: info Time and space complexity

Both examples have the same time and space complexity: The time complexity is $O\left(n\right)$ because in the worst case we iterate through all the elements in the array. The space complexity is $O\left(1\right)$ as we don't need additional space.

:::

---

## Chapter Four: Stack

A stack data type is perhaps one of the most well-known ones. A stack of books might be a good example to visualize, but insertion and deletion can only happen from the one end. A stack operates through the last-in first-out (LIFO) principle: the last item to go in is the first to go out.

Usually we'll have methods for *pushing* an element onto the stack, and *popping* an element from the stack.

For example, let's say we're looking for valid parentheses in a given string, and the operation we'll do goes like this.

As we iterate over the characters in the string, we *push* the character onto the stack. If we pushed a closing parenthesis (one of `)`, `}`, or `]`), then, if the previous pushed element is its opening pair, we'll *pop* that pair from the stack.

If, at the end, the stack is empty, the string consists of valid parentheses.

![Animated visualization of pushing to and popping off from a stack of parentheses.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747914829489/e86baf72-22f6-41fe-9de9-f4da136a8777.gif)

A stack can be implemented as an array or a linked list. But using linked lists is more common because with arrays, we have a potential *stack overflow* when we predefine a maximum stack size. On the other hand, linked lists are not static when it comes to memory, so they are a good candidate to implement stacks.

Linked lists are also efficient because we are using one end of the stack for insertion and deletion, and doing these are constant time operations.

Let's look at one easy stack implementation in Python.

Now, we can use a `list`, but [<VPIcon icon="fa-brands fa-python"/>a list in Python is implemented as a dynamic array underneath](https://docs.python.org/3/faq/design.html#how-are-lists-implemented-in-cpython), so at one point, pushing an item can be an $O\left(n\right)$ operation if the list needs to be copied into another memory location. For that reason, we'll use a [<VPIcon icon="fa-brands fa-python"/>`deque`](https://docs.python.org/3/library/collections.html#collections.deque), which is implemented as a doubly-linked list, so that we know push and pop operations will be $O\left(1\right)$.

```py
from collections import deque

class Stack:
    def __init__(self):
        self._stack = deque()

    def push(self, item):
        self._stack.append(item)

    def pop(self):
        return self._stack.pop()

    def peek(self):
        return self._stack[-1]

    def is_empty(self):
        return not bool(len(self._stack))

    def size(self):
        return len(self._stack)
```

In addition to `push` and `pop`, we'll also usually have functions like `peek` to get the topmost item in the stack, `is_empty` to check if the stack is empty, and `size` to get the size of the stack.

We can also do it using JavaScript. Now, we can do it using an array, but we want to use a linked list instead. Since we don't have a robust built-in library like Python this time, we'll implement a very simple version of it ourselves. Even though we haven't seen linked lists so far, the basic idea is that we have nodes, each of which has a `data` value, and a `next` pointer pointing to the next node.

Let's create a simple node first:

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

We can write our stack now:

```js :collapsed-lines
class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    node.next = this.top;
    this.top = node;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) { return null; }

    const data = this.top.data;
    this.top = this.top.next;
    this.length--;

    return data;
  }

  peek() {
    if (this.isEmpty()) { return null; }

    return this.top.data;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.length;
  }
}
```

Now, let’s use it:

```js
let myStack = new Stack();

myStack.push(5);
myStack.push(17);
myStack.push(55345);
myStack.push(0);
myStack.push(103)

console.log(myStack.size()) // 5
console.log(myStack.peek()) // 103

myStack.pop()

console.log(myStack.size()) // 4
console.log(myStack.peek()) // 0
```

::: info Time and space complexity

Each method we defined for our stack has $O\left(1\right)$ time complexity, and it would be the same if we were to use an array as well. However, as mentioned above, arrays have limitations in that having to allocate a predefined stack size can lead to a stack overflow. And if we were to use a dynamic array, the whole array might need to be copied to go into another memory location after a certain size is reached, leading to $O\left(n\right)$ time. So, linked lists are ideal to implement a stack data type.

If the space complexity is linear - $O\left(n\right)$- the stack will grow linearly with the number of items in it.

:::

---

## Chapter Five: Binary Search

Binary search is one of the most well-known algorithms. It's also a [<VPIcon icon="fas fa-globe"/>divide-and-conquer algorithm](https://brilliant.org/wiki/divide-and-conquer/), where we break the problem into smaller components.

The crux of binary search is to find a target element in a given sorted array. We have two pointers: `high` to point to the largest element, and `low` to point to the smallest element. We first initialize them for the whole array itself, with `high` being the last index and `low` being the first index.

Then, we calculate the midpoint. If the target is greater than the midpoint, then we adjust our `low` pointer to point to the `mid + 1`, otherwise if the target is less than the midpoint, we adjust `high` to be `mid - 1`. With each iteration, we eliminate half the array until the midpoint equals the target or the `low` pointer passes `high`.

If we find the index of the target, we can return it as soon as we find it. Otherwise, we can just return `-1` to indicate that the target doesn't exist in the array.

For example, if we have a `nums` array `[-1, 0, 3, 5, 9, 12]` and our `target` is `9`, the operation looks like this:

![Animated visualization of binary search, array `[-1, 0, 3, 5, 9. 12]` with `target=9`, the result being the index 4.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747915126875/c27134cb-ae7c-4f09-88d8-13fc64900319.gif)

We can write it in TypeScript like this:

```ts
function search(nums: number[], target: number): number {
  let high = nums.length - 1;
  let low = 0;

  while (high >= low) {
    let mid = Math.floor((high + low) / 2);

    if (target > nums[mid]) {
      low = mid + 1;
    } else if (target < nums[mid]) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}
```

::: info Time and space complexity

The time complexity of a binary search algorithm is $O\left(\log_{}{n}\right)$ in the worst case. (For example, if the target is not in the array, we'll be halving the array until there is one element left.) The space complexity is $O\left(1\right)$ as we don't need extra space.

:::

---

## Chapter Six: Linked Lists

A linked list is a linear data structure that you're likely to be familiar with. It is also a data structure that can grow and shrink dynamically - so unlike arrays, there's no need to allocate memory beforehand.

An important part of a linked list is the **head pointer** that points to the beginning of the list. There may or may not be a **tail pointer** that also points to the end of the list.

The core ingredient of a linked list is a simple node, which consists of two parts: data and the next pointer. So, it is an important idea to remember: *a node only knows about its data and its neighbor.*

The very last node in the linked list points to `null` to indicate it's the end of the list.

But there are different types of linked lists that differ from each other slightly, so let's briefly take a look at them.

### Singly linked lists

The core idea with singly linked lists is that each node, along with the data it has, has a pointer that points *only* to the next node:

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

And here is an example where we have three nodes, holding the values `1`, `2`, and `3` consecutively:

![Animated visualization of a singly linked list, with nodes having 1, 2, and 3 as values.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747915365474/8604a69f-f24f-4dc5-b4a0-2eba452a4305.gif)

Here is a simple implementation of a singly linked list in JavaScript:

```js :collapsed-lines
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add value to the end of the list
  append(value) {
    let node = new Node(value);
    // If the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return this;
  }

  // Add value to the beginning of the list
  prepend(value) {
    let node = new Node(value);
    // If the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;
    return this;
  }

  remove(value) {
    // If the list is empty, return null
    if (this.head === null) { 
      return null; 
    }

    // If it is the first element
    if (this.head.data === value) {
      this.head = this.head.next;
      this.length--;
      // If it is the only element 
      // (we don't have anything after removing it)
      if (this.head === null) {
        this.tail = null;
      } 
      return;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (currentNode.next.data === value) {
        currentNode.next = currentNode.next.next;
        // If it is the last element, update tail
        if (currentNode.next === null) {
          this.tail = currentNode;
        } 
        this.length--;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  search(value) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.data === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    // If the value does not exist, return null
    return null;
  }

  printList() {
    let values = [];
    let currentNode = this.head;
    while (currentNode) {
      values.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log(values);
  }
}
```

::: note

We'll keep a tail pointer in all these examples for convenience. It [<VPIcon icon="fas fa-globe"/>doesn't hurt](https://softwareengineering.stackexchange.com/a/301863) to have a tail pointer.

:::

We can now use it:

```js :collapsed-lines
const mySinglyLinkedList = new SinglyLinkedList();

mySinglyLinkedList.prepend(3);
mySinglyLinkedList.prepend(143);
mySinglyLinkedList.prepend(5);

mySinglyLinkedList.printList(); // [ 5, 143, 3 ]

mySinglyLinkedList.append(21);
mySinglyLinkedList.printList(); // [ 5, 143, 3, 21 ]

console.log(mySinglyLinkedList.search(143));
// Node {
//   data: 143,
//   next: Node { data: 3, next: Node { data: 21, next: null } }
// }

mySinglyLinkedList.remove(143);
mySinglyLinkedList.printList(); // [ 5, 3, 21 ]

console.log(mySinglyLinkedList.search(143)); // null
```

### Doubly linked lists

Doubly linked lists differ from the "singly" ones in that each node also has another pointer that points to the previous element.

So, this time, a single node will look different:

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
}
```

Here is the same example as above, but as a doubly linked list:

![Animated visualization of a doubly linked list, with nodes having 1, 2 and 3 as values.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747915463580/605d3541-a702-4bef-9777-28c47800b7aa.gif)

A simple implementation might look like this:

```js :collapsed-lines
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add value to the end of the list
  append(value) {
    let node = new Node(value);
    // If the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.previous = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return this;
  }

  // Add value to the beginning of the list
  prepend(value) {
    let node = new Node(value);
    // If the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.head.previous = node;
      node.next = this.head;
      this.head = node;
    }

    this.length++;
    return this;
  }

  remove(value) {
    // If the list is empty, return null
    if (this.head === null) { 
      return null;
    }

    let currentNode = this.head;

    // If it is the first element
    if (currentNode.data === value) {
      this.head = currentNode.next;
      // If the removed element is not the only one,
      // make the previous pointer of the new head null
      if (this.head) {
        this.head.previous = null;
      // If the removed element was the only element,
      // point the tail to null as well
      } else {
        this.tail = null;
      }
      this.length--;
      return;
    }

    while (currentNode) {
      if (currentNode.data === value) {
        if (currentNode.previous) {
          currentNode.previous.next = currentNode.next;
        }
        if (currentNode.next) {
          currentNode.next.previous = currentNode.previous;
        // If it's the last element in the list, update tail
        // to point to the previous node
        } else {
          this.tail = currentNode.previous;
        }

        this.length--;
        return;
      }

      currentNode = currentNode.next;
    }
  }

  search(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    // If the value does not exist, return null
    return null;
  }

  printList() {
    let values = [];
    let currentNode = this.head;

    while (currentNode) {
      values.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log(values);
  }
}
```

### Circular linked lists

With circular linked lists, we have the last node also pointing to the first element, creating circularity.

We'll only look at the singly circular linked list for simplicity's sake, so our node will look the same as in the first example:

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

The same example, in a circular linked list fashion:

![Animated visualization of a circular linked list, nodes having 1, 2, and 3 as values.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747915538225/ea4341cb-2a39-4728-b833-362455a51cdd.gif)

Here is a simple implementation:

```js :collapsed-lines
class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add value to the "end" of the list
  append(value) {
    let node = new Node(value);
    // If the list is empty
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      // As the only node in the list, it should point to itself
      node.next = node;
    } else {
      // As the "last" node, it should point to the head (this.tail.next)
      node.next = this.tail.next;
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
    return this;
  }

  // Add value to the beginning of the list
  prepend(value) {
    let node = new Node(value);
    node.next = this.head;
    // Update last node's next pointer to point to the new node
    this.tail.next = node;
    this.head = node;
    this.length++;
    return this;
  }  

  remove(value) {
    // If the list is empty, return null
    if (this.head === null) { 
      return null; 
    }

    // If it is the first element
    if (this.head.data === value) {
      // If it's the only element
      if (this.head.next === this.head) {
        this.head = null;
        this.tail = null;
        return;
      }
      this.head = this.head.next;
      this.tail.next = this.head;
      this.length--;
      return;
    }

    let currentNode = this.head;
    let prevNode = null;

    // Iterate until you find the value or
    // you don't find it after traversing the whole list
    while (currentNode.data !== value || prevNode === null) {
      if (currentNode.next === this.head) { 
        break; 
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    if (currentNode.data === value) {
      // If there is a previous node before the element to be removed,
      // update the previous node's next pointer to point to
      // the one after the element to be removed
      // (unlink it)
      if (prevNode) {
        prevNode.next = currentNode.next;
        // If the element to be removed is the last one,
        // update tail to be the previous node
        if (this.tail === currentNode) {
          this.tail = prevNode;
        }
      // If the element to be removed is the first one in the list
      } else {
        // If it's the only one in the list
        if (this.head.next === this.head) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
          this.tail.next = this.head;
        }
      }
    }
  }

  printList() {
    let nodes = [];
    let currentNode = this.head;
    if (this.head === null) { 
      console.log(nodes); 
      return;
    }

    // Traverse the list once to add the values, 
    // don't go in circles
    do {
      nodes.push(currentNode.data);
      currentNode = currentNode.next;
    } while (currentNode !== this.head);

    console.log(nodes);
  }
}
```

::: info Time and space complexity

With linked lists, the time complexity for accessing an element is in the worst case $O\left(n\right)$. *Prepending* and *appending* an element depends on whether we have a tail pointer. If we have it, then both operations are $O\left(1\right)$, as we only need to arrange pointers. But if we don't have a tail pointer, *appending* an element requires traversing the whole list, so it is an $O\left(n\right)$ operation. Removing an element is similar - in the worst case, it is $O\left(n\right)$.

If the space complexity is linear - $O\left(n\right)$- then the amount of data to store grows linearly with the number of nodes in the list.

:::

---

## Interlude: Fast & Slow Pointers

Let's take a quick look at a technique that comes in handy when it comes to working with linked lists.

We can keep two pointers while traversing a linked list: fast and slow. While the fast one increases by two steps, the slow pointer will increase by just one step.

### Finding the middle node of a linked list

When the fast pointer reaches the end of the list, the slow pointer will be at the "middle" node.

Let's see how it might work:

```js
let slow = head;
let fast = head;

while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}
```

We can think of a list like `[1, 2, 3, 4, 5]` (where each value is a node in the linked list).

Both `fast` and `slow` start pointing to the head, that is, `1`.

Then, we update the slow pointer one step, which will be `2`. And, `fast` will be at `3`.

When we update `slow` again, it will be at `3`. When the fast pointer increases, it will be two steps ahead, and its `next` pointer will point to the `null` value, at which point our loop will stop iterating.

`slow` will end up pointing to the node with the value `3`, which is the middle node.

![Animated visualization of fast and slow pointers technique on a linked list of 5 nodes.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747915833404/d3c562e8-36e3-459f-a29c-860e0d4869f0.gif)

With an even number of nodes, there are two candidates for the middle node. For example, with a list like `[1, 2, 3, 4]`, our current implementation will find the middle as `3`. This technique is also useful to detect cycles in a linked list.

---

## Chapter Seven: Trees

Let’s take a look at a non-linear data structure that is pretty familiar to many developers: trees.

Whether familiarity breeds contempt or not is arguable, so let's start with the simplest component of a tree: a node.

Trees, like linked lists, are made up of nodes. The simplest version of a tree is just the **root node** which doesn't have any edges (links) pointing to it; that is, it has no **parent nodes**. It is the starting point, in a way.

A tree can only have one root node, and when you think about it, *if there are* n *nodes in a tree, that means there are* $n−1$ *edges (links)* because there is no edge (link) pointing to the root node.

If you've looked at a tree long enough, you might've had a moment of epiphany: a tree has smaller trees within itself. A branch may as well be a trunk, having other branches for the little tree it constitutes.

The tree data structure is like this, it is recursive: *a child node can be the root of a subtree*.

Two terms that are important when it comes to a tree node are **depth** and **height**.

The **depth** of a node is how far away it is from the root node (how many edges (links) does it take to travel from the root node to it), and the **height** of a node is how far away it is from its furthest **leaf node** (which is a node that has no children).

::: note

The height of the root node is the same as the height of the whole tree.

:::

A **balanced tree** is one where *the heights of the left and right subtrees of every node differ by at most 1*.

### Binary trees, binary search trees (BSTs)

A **binary tree** is a tree where each node has at most two children. That is, a node can have a left child node and a right child node, and no more.

The maximum number of nodes in a binary tree is $2h−1$ where h is the height of the tree. This is where the *binary* of the binary tree makes sense: on each level, the number of nodes grows proportionately to the exponents of 2. For example, the number of nodes on the first level (the 0th level) is $20=1$, which is just the root node. The second level has at most 2 nodes: $21=2$ (remember that we're counting from 0, so the second level is 1).

A **binary search tree** is a binary tree where the values smaller than the node go to its left and those greater than it go to its right:

$$
\text{left children}\:\gt\text{node}\:\gt\:\text{right children}
$$

::: note Example

Here is an example:

![Animated visualization of a binary search tree with 8 as the root node, 3 as its left child, 10 as its right child. 3 has 1 as it left child, 6 as its right child. 6 has 4 as its left child, 7 as its right child. 10 has 14 as its right child. 14 has 13 as its left child. ](https://cdn.hashnode.com/res/hashnode/image/upload/v1747916761231/c0b5301c-6832-43a9-8abd-30f578ac2a29.gif)

We can define a tree node like this:

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val;
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}
```

:::

#### Inserting into a binary search tree

If we want to insert a new node into a binary search tree, we need to insert it into its proper place to keep the properties of a BST intact.

##### Recursive solution:

```ts
function insertIntoBST(root: TreeNode | null, val: number) {
  if (root === null) {
    return new TreeNode(val);
  }

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
```

Here, we traverse the tree until we find a space (a `null` position) for our value that is waiting to be a `TreeNode`. We start with the root node. If the value of the node-to-be-inserted is less than the value of the root node, we go left (passing `root.left` as the `root` argument to the function). Otherwise, we go right (passing `root.right` as the `root` argument).

::: info Time and space complexity

The time complexity is $O\left(h\right)$ where h is the height of the tree. On each level in the tree, we either go left or right, so we don't necessarily visit every single node. The space complexity is also $O\left(h\right)$ because we use recursion, creating a new stack frame for each function call.

:::

::: note

Note that if the tree is unbalanced, the time and space complexity can be said to be $O\left(n\right)$.

:::

##### Iterative solution:

We can also do it iteratively, using pointers only:

```ts :collapsed-lines
function insertIntoBST(root: TreeNode | null, val: number) {
  if (root === null) {
    return new TreeNode(val);
  }

  let prevNode: TreeNode | null = null;
  let currentNode: TreeNode | null = root;

  while (currentNode !== null) {
    prevNode = currentNode;
    if (val < currentNode.val) {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
  }

  if (prevNode) {
    if (val < prevNode.val) {
      prevNode.left = new TreeNode(val);
    } else {
      prevNode.right = new TreeNode(val);
    }
  }

  return root;
}
```

Here, we do the same thing: iterating until we find the correct place, but also keeping track of the parent node. Then, we insert the node as either the left or the right child of the parent, depending on its value.

::: info Time and space complexity

The time complexity is again $O\left(h\right)$ (*or if the tree is unbalanced,* $O\left(n\right)$) for the same reason as in the recursive solution. But the space complexity is constant - $O\left(1\right)$ - as we only use pointers.

:::

#### Deleting from a binary search tree

The challenging thing when deleting a node from a BST is keeping the BST as a BST. All smaller values should still go to the root node's left subtree, and all those that are larger should go to the root node's right subtree.

Let's take a look at how we might do it in JavaScript:

```js :collapsed-lines
function deleteNode(root: TreeNode | null, key: number) {
  if (root === null) {
    return root;
  }

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node-to-be-deleted has no children
    if (root.left === null && root.right === null) {
      return null;
    } 

    // If either the left or the right child exists,
    // return the one that exists as the new child 
    // of the parent node (of the node-to-be-deleted)
    if (root.left === null || root.right === null) {
      return root.left ? root.left : root.right;
    }

    // If both children exist, traverse the left subtree, get its maximum value...
    let currentNode = root.left;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    // ...replace it with the node-to-be-deleted
    root.val = currentNode.val;
    // ...then apply the recursion to the left subtree to get rid of the duplicate value
    root.left = deleteNode(root.left, root.val);
  }

  return root;
}
```

We traverse the tree until we find the node to be deleted. Once we find it, there are several things to do.

In the case where it doesn't have any child nodes, we can return `null` and be done with it.

If it has one child node, we can return the one that exists using the ternary operation (`return root.left ? root.left : root.right`).

::: note

In this case, we're essentially making the root of the subtree the child of the parent node.

:::

For example, in the image, if the node-to-be-deleted is 10 (it has only right child node with the value 14), we make 14 the right child of 8. It doesn't break our BST, because those that are larger than 8 continue to be in the right subtree of 8:

![A binary tree that has the value 8 as its root node. It has a left child with the value 3 and a right child with the value 10. The left child has a left child node that has the value 1 and a right child node that has the value 6, which has a left child node with the value 4 and a right child node with the value 7. The right child of the root node that has the value 10 has a right child node with value 14, which has a left child node that has the value 13.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747918477656/7a66ad05-3c93-4482-987e-399f65e9dc57.png)

Otherwise, if both the left and right children of the node-to-be-deleted exist, we need to do something different.

In this case, we'll replace the node-to-be-deleted with the largest value in the left subtree.

But, after replacing, we'll have two nodes of the same value in both places, so we need to apply `deleteNode` itself to the subtree that we've taken our replacement node from.

This is all done to keep the BST as BST. It might be a bit difficult to wrap your head around at first, but [<VPIcon icon="fa-brands fa-youtube"/>NeetCode has a detailed explanation of this problem](https://youtu.be/LFzAoJJt92M).

<VidStack src="youtube/LFzAoJJt92M" />

::: note

Note that we can also use the smallest value in the right subtree as well. In that case, our code would look like this:

```js
let currentNode = root.right;

while (currentNode.left !== null) {
  currentNode = currentNode.left;
}

root.val = currentNode.val;
root.right = deleteNode(root.right, root.val);
```

:::

::: info Time and space complexity

Similar to inserting into a BST, both the time and space complexity of deleting from a BST will be $O\left(h\right)$ where h is the height of the tree.

:::

#### Traversals

We'll take a brief look at two of the most famous ways to traverse a tree where the order in which we visit the nodes matters: depth-first search and breadth-first search.

##### 1. Depth-First Search (DFS)

In a depth-first search, we traverse through a branch until we get to a leaf node. Then, we backtrack and do the same thing with another branch.

There are three common ways to do a depth-first search:

- preorder traversal
- inorder traversal
- postorder traversal

###### Preorder traversal:

It goes like this: We first visit the node, then go on to its left subtree, then the right subtree.

**node ➞ left subtree ➞ right subtree**

![Animated visualization of the same binary search tree displaying preorder traversal, with highlighted nodes in this order: $8$, $3$, $1$, $6$, $4$, $7$, $10$, $14$, $13$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747918872908/dedfc341-d32e-4558-abd6-00ff8d67b46f.gif)

We can do a preorder walk recursively:

```js
function preorderWalk(node) {
  if (node === null) {
    return;
  }

  console.log(node.val);
  preorderWalk(node.left);
  preorderWalk(node.right);
}
```

###### Inorder traversal:

It goes like this: we first visit the left subtree, then the node, then the right subtree.

**left subtree ➞ node ➞ right subtree**

![Animated visualization of the same binary search tree displaying inorder traversal, with highlighted nodes in this order: $1$, $3$, $4$, $6$, $7$, $8$, $10$, $13$, $14$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747918945108/a1ff3284-8aa0-4815-928c-99cdbd8ac956.gif)

::: note

The inorder traversal gives us the sorted values.

:::

We can do an inorder walk recursively as well:

```js
function inorderWalk(node) {
  if (node === null) {
    return;
  }

  inorderWalk(node.left);
  console.log(node.val);
  inorderWalk(node.right);
}
```

###### Postorder traversal:

It goes like this: we first visit the left subtree, then the right subtree, and finally the node.

**left subtree ➞ right subtree ➞ node**

![Animated visualization of the same binary search tree displaying postorder traversal, with highlighted nodes in this order: $1$, $4$, $7$, $6$, $3$, $13$, $14$, $10$, $8$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919023258/e3c7f4a3-3ec8-47d3-aa49-e8f4b0f8d30a.gif)

We can do a postorder walk recursively:

```js
function postorderWalk(node) {
  if (node === null) {
    return;
  }

  postorderWalk(node.left);
  postorderWalk(node.right);
  console.log(node.val);
}
```

##### 2. Breadth-First Search (BFS)

In breadth-first search, we visit the nodes level by level, that is, visiting every child of a node first before moving on.

A queue is used when implementing a BFS. Since we don't have edges connecting all the children on one level together, it makes sense to keep them in a queue and visit each one when their time comes. When a node is added to the queue and has not been visited yet, it's called a **discovered node**.

A simple BFS operation looks like this (which is repeated until the queue is empty):

- visit node
- enqueue left child
- enqueue right child

Note that the breadth-first search is also known as *level-order traversal*.

![Animated visualization of the same binary search tree displaying level-order traversal, with highlighted nodes in this order: $8$, $3$, $10$, $1$, $6$, $14$, $4$, $7$, $13$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919081789/17beb70f-7302-4f32-9a9a-72d69e190ac9.gif)

A simple example of a level-order traversal in JavaScript might look like this:

```js :collapsed-lines
function levelOrderWalk(root) {
  if (root === null) {
    return;
  }

  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    let currentNode = queue[0];

    console.log(currentNode.val);

    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }

    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }

    // Remove the current node
    queue.shift();
  }
}
```

This example is based on Vaidehi Joshi's [GitHub Gist (<VPIcon icon="iconfont icon-github"/>`vaidehijoshi`)](https://gist.github.com/vaidehijoshi/27f9fa6b6b68f70360019805b5ca3692#file-level_order_search-js).

---

## Chapter Eight: Heap / Priority Queue

It’s now time to take a look at a data structure called a *heap*, which is a great way to implement an [<VPIcon icon="fa-brands fa-wikipedia-w"/>abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type) called a **priority queue**. They're so interrelated that priority queues are sometimes referred to as heaps - because heaps are a very efficient way to create a priority queue.

### Heap properties

The kind of heap we're interested in is also called a **binary heap** because it's just a binary tree that has specific properties.

One of them is that it must be a **complete binary tree**, meaning that all the levels must be filled, and *all nodes in the last level should be as far left as possible*.

For example, when it comes to shape, this is a complete binary tree:

![Animated visualization of a tree with root node having two children, both of its left and right children having two children their own. The left child of the left child has only a left child on its own.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919274226/cdc2f987-3327-4220-8584-ad3999ea7f39.gif)

But heaps must also be either a **max heap** or a **min heap** - all the parent nodes must be either greater than or equal to the values of their children (if it's a max heap) or less than or equal to the values of their children (if it's a min heap).

A max heap might look like this:

![Animated visualization of a max heap, having 42 at the top, 19 at its left, 36 at its right. 19 has 17 at its left, 3 at its right. 36 has 25 at its left, 1 at its right. 17 has 2 at its left.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919301787/6a3b30cd-a686-4112-80a9-0249c7597751.gif)

::: note

A left child doesn't have to be less than the right child at all, as in a binary search tree. Also, we can always have duplicate values in a heap.

:::

A min heap, on the other hand, has the values of parent nodes less than those of their children:

![Animated visualization of a min heap, having 1 at the top, 2 at its left, 3 at its right. 2 has 17 at its left, 19 at its right. 3 has 36 at its left, 7 at its right. 17 has 42 at its left.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919335031/b5b82848-ac1f-405d-9124-725a9c26af55.gif)

::: note

When we have a max heap, the root node will have the maximum value. And, if we have a min heap instead, the root node will have the minimum value.

:::

### Heaps with arrays

We can create a heap using an array. Since the root node is the most interesting element with either a maximum or minimum value, it'll be the first element in our array, residing at the 0th index.

What's nice about using an array is that, given a parent node's index $i$, its left child will be at the index $2i+1$, and its right child will be at the index $2i+2$. ![Animated visualization of the max heap above implemented as an array. A left child's index corresponds to $2i+1$, a right child's index corresponds to $2i+2$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919415922/b98a55a9-f9cc-4e11-8d53-f5a8a411d861.gif)

Given that, any child node's parent will be at the index $\left\lfloor\frac{\left(n−1\right)}{2}\right\rfloor$.

::: note

⌊ and ⌋indicate the [floor function](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions).

:::

One question we might ask at this moment is that why should we use an array at all?

The answer lies in the word **queue** of a **priority queue**. Since a queue is mainly concerned with the first element (following the [<VPIcon icon="fa-brands fa-wikipedia-w"/>FIFO principle](https://en.wikipedia.org/wiki/FIFO_\(computing_and_electronics\))), an array can be an ideal choice. In a priority queue, each element has a priority, and the value with the highest priority is dequeued first.

### Inserting/removing elements

Let's take a look at how we can add an element to a heap.

We know that we have to add the new element to the bottom leftmost place, but once we do that, it might violate the max heap or the min heap property. Then, how can we avoid violating the **heap-order property**?

We'll **heapify**, of course!

Let's say that we want to add a node with the value `20`:

![Animated visualization of the max heap above. A new item $20$ is first inserted at the leftest possible place. Then it swaps places with $17$ and then $19$, coming to the left of $42$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919523941/eb0959dd-fcf8-4fb7-9ebf-938fde24ba10.gif)

So, heapify is the swapping of nodes until we know that the heap-order property is maintained.

A similar thing happens when we need to remove an element. But since we're mainly concerned with the maximum or the minimum element, we just need to remove the root node. So, how are we going to do that?

We start off by swapping the last element (the bottom leftmost one) with the root. Now we can easily remove the "root," which resides as a leaf node. But we still need to maintain the heap-order property, so we need to **heapify** again.

![Animated visualization of the max heap above. $2$ swapping places with $42$, $42$ being disappeared. $2$ later swaps places with $36$ and $25$, now $36$ coming to the top.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747919564248/0e7b9a38-6b23-4448-a804-cf095d16f30e.gif)

### Heapsort

Even better thing is that if we have a heap, and continually heapify it, we can sort an array.

Let's build a max heap first:

```ts
function buildMaxHeap(arr: number[]) {
  /*
  Index of the last internal node 
  (i.e., the parent of the last leaf node, 
   or, the last non-leaf node).
  The last leaf node will reside at index arr.length - 1,
  so, we're getting its parent using the formula mentioned above.
  */
  let i = Math.floor((arr.length - 1) / 2);

  while (i >= 0) {
    heapify(arr, i, arr.length);
    i--;
  }

  return arr;
}
```

Then, the `heapify` function:

```ts
function heapify(arr: number[], i: number, maxLength: number) {
  while (i < maxLength) {
    let index = i;
    let leftChildIdx = 2 * i + 1;
    let rightChildIdx = leftChildIdx + 1;

    if (leftChildIdx < maxLength && arr[leftChildIdx] > arr[index]) {
      index = leftChildIdx;
    }

    if (rightChildIdx < maxLength && arr[rightChildIdx] > arr[index]) {
      index = rightChildIdx;
    }

    if (index === i) { return; }

    // Swap
    [arr[i], arr[index]] = [arr[index], arr[i]];

    i = index;
  }
}
```

With a given index `i`, we get its left and right children indices, and if the indices are within bounds, we check if they are out of order. In that case, we make the `index` the index of the child, and swap the two nodes. Then, we continue with that new index, assigning it to `i`.

Now, `heapify` is nice and all, but how can we actually use it for sorting?

```ts
function heapSort(arr: number[]) {
  buildMaxHeap(arr);

  let lastElementIdx = arr.length - 1;

  while (lastElementIdx > 0) {
    [arr[0], arr[lastElementIdx]] = [arr[lastElementIdx], arr[0]];

    heapify(arr, 0, lastElementIdx);
    lastElementIdx--;
  }

  return arr;
}
```

::: note

Note that our max heap `[42, 19, 36, 17, 3, 25, 1, 2]` won't change when used in the `buildMaxHeap` function, as it's already a max heap! But if it were to have `17` as the right child of `42`, then `17` would have `25` as a child, which breaks the heap-order property. So, using `buildMaxHeap` with this broken version will correctly swap the `17` and `25`, making it a max heap:

```ts
buildMaxHeap([42, 36, 17, 19, 3, 25, 1, 2]);

// -> [42, 36, 25, 19, 3, 17, 1, 2]
```

:::

In `heapSort`, with our newly built max heap, we'll start with swapping the first and last nodes. Then, we'll keep heapifying until we get all the elements in their place. If we use it with our very own max heap, we can see that it returns the sorted array:

```ts
heapSort([42, 19, 36, 17, 3, 25, 1, 2]);
// -> [1, 2, 3, 17, 19, 25, 36, 42]
```

The examples are adapted from [Vaidehi Joshi's article (<VPIcon icon="fa-brands fa-medium"/>`basecs`)](https://medium.com/basecs/heapify-all-the-things-with-heap-sort-55ee1c93af82).

::: info Time and space complexity

Heap sort, as a nice sorting algorithm it is, runs in $O\left(n\:log_{}{n}\right)$ time.

In this example, building the max heap starts from the last non-leaf node and goes up to the root node, each time calling `heapify`. The `heapify` function has a time complexity of $O\left(\log_{}{n}\right)$ as we're working with a binary tree, and in the worst case, we get to do it for all the levels. Since we do it n/2 times, overall, `buildMaxHeap` has $O\left(n\:log_{}{n}\right)$ time complexity.

We're swapping the first and last elements, and heapifying as we go through each element, so this is also overall an $O\left(n\:log_{}{n}\right)$ operation — which makes the time complexity of `heapSort` $O\left(n\:log_{}{n}\right)$*.*

:::

::: note

Building the max heap [<VPIcon icon="fa-brands fa-stack-overflow"/>can be improved to have](https://stackoverflow.com/questions/9755721/how-can-building-a-heap-be-on-time-complexity) $O\left(n\right)$ [runtime](https://stackoverflow.com/questions/9755721/how-can-building-a-heap-be-on-time-complexity).

Since there is no use of auxiliary space, the space complexity is constant, $O\left(1\right)$.

:::

---

## Chapter Nine: Backtracking

Let's start with admitting this one fact: backtracking is hard. Or rather, *understanding it the first time* is hard. Or, it's one of those concepts that you think you grasped it, only to realize later that you actually didn't.

We'll focus on one problem of finding the subsets of an array, but before that, let's imagine that we're walking along a path.

Then, we reach a fork. We pick one of the paths, and walk.

Then, we reach another fork in the path. We pick one of the paths again, and go on walking, then we reach a dead end. So, we *backtrack* to the last point we had a fork, then go through the other path that we didn't choose the first time.

Then we reach another dead end. So, we *backtrack* once more and realize that there are no other paths we can go from there. So we *backtrack* again, and explore the other path we didn't choose the first time we came to this point.

We reach yet another dead end, so we *backtrack*. We see that there are no more paths to explore, so we *backtrack* once more.

Now, we're at our starting point. There are no more paths left to explore, so we can stop walking.

It was a nice but tiring walk, and it went like this:

![Animated visualization of the concept of backtracking.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747920157477/3151155c-d40c-408d-bff6-5d326ad0a0f3.gif)

Now, let's take a look at a LeetCode problem.

### Subsets

The description for [<VPIcon icon="fas fa-globe"/>Subsets](https://leetcode.com/problems/subsets) says:

> Given an integer array `nums` of **unique** elements, return *all possible subsets (the power set)*.
> 
> The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

For example:

```plaintext
Input: nums = [1, 2, 3]
Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

Or:

```plaintext
Input: nums = [0]
Output: [[], [0]]
```

Before diving into the solution code, let's take a look at how backtracking will work in this case. Let's call the `nums` array `items` instead:

![Animated visualization of backtracking for an array [1, 2, 3], exploring each possible choice.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747920218696/a85bf516-9bc1-4231-ab39-4a31ce1a8e6d.gif)

For each item in `items`, we have initially two choices: to include the item, or not to include it.

For each level n in this *decision tree*, we have the option to include the next item in `items`. We have 2n possible subsets in total.

Let's simplify the example a bit, and say that `items` is now `['a', 'b']` (**We'll ignore the problem specifics for now**).

![Animated visualization of backtracking for an array `['a', 'b']`, exploring each possible choice.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747920275978/ab435765-7b05-4939-bd72-55dcfae7a6d4.gif)

In this case, we can use backtracking like this:

```ts
function subsets(items: string[]) {
  let result: string[][] = [];
  let currentSubset: string[] = [];

  function backtrack(idx: number) {
    if (idx >= items.length) {
      result.push([...currentSubset]);
      return;
    }

    currentSubset.push(items[idx]);
    backtrack(idx + 1);

    currentSubset.pop();
    backtrack(idx + 1);
  }

  backtrack(0);

  return result;
}

console.log(subsets(['a', 'b']));
// -> [['a', 'b'], ['a'], ['b'], []]
```

Well, it looks simple at first glance, but what's going on?

One thing to notice is that we `pop` from the `currentSubset`, then call `backtrack`. In our example of walking, that's the part we go back to our previous point, and continue our walk.

In the first animation, we indicated a dead end with a cross mark, and in this case, a dead end is the **base case** we reach.

It might still be tough to understand, so let's add some helpful `console.log`s, and see the output:

```ts :collapsed-lines
function subsets(items: string[]) {
  let result: string[][] = [];
  let currentSubset: string[] = [];

  function backtrack(idx: number) {
    console.log(`======= this is backtrack(${arguments[0]}) =======`)
    if (idx >= items.length) {
      console.log(`idx is ${idx}, currentSubset is [${currentSubset}], adding it to result...`);
      result.push([...currentSubset]);
      console.log(`backtrack(${arguments[0]}) is returning...\n`)
      return;
    }

    currentSubset.push(items[idx]);
    console.log(`added ${items[idx]} to currentSubset, inside backtrack(${arguments[0]})`);
    console.log(`calling backtrack(${idx + 1})...`)
    backtrack(idx + 1);

    let item = currentSubset.pop();
    console.log(`popped ${item} from currentSubset, inside backtrack(${arguments[0]})`);
    console.log(`calling backtrack(${idx + 1})...`)
    backtrack(idx + 1);

    console.log(`******* done with backtrack(${arguments[0]}) *******\n`);
  }

  backtrack(0);

  return result;
}

console.log(subsets(['a', 'b']));
```

The output looks like this:

```plaintext :collapsed-lines
======= this is backtrack(0) =======
added a to currentSubset, inside backtrack(0)
calling backtrack(1)...
======= this is backtrack(1) =======
added b to currentSubset, inside backtrack(1)
calling backtrack(2)...
======= this is backtrack(2) =======
idx is 2, currentSubset is [a,b], adding it to result...
backtrack(2) is returning...

popped b from currentSubset, inside backtrack(1)
calling backtrack(2)...
======= this is backtrack(2) =======
idx is 2, currentSubset is [a], adding it to result...
backtrack(2) is returning...

******* done with backtrack(1) *******

popped a from currentSubset, inside backtrack(0)
calling backtrack(1)...
======= this is backtrack(1) =======
added b to currentSubset, inside backtrack(1)
calling backtrack(2)...
======= this is backtrack(2) =======
idx is 2, currentSubset is [b], adding it to result...
backtrack(2) is returning...

popped b from currentSubset, inside backtrack(1)
calling backtrack(2)...
======= this is backtrack(2) =======
idx is 2, currentSubset is [], adding it to result...
backtrack(2) is returning...

******* done with backtrack(1) *******

******* done with backtrack(0) *******

[ [ 'a', 'b' ], [ 'a' ], [ 'b' ], [] ]
```

If you noticed, *Add* `'a'`? and *Go ahead?* arrows on the first level are calls to `backtrack(0)`.

*Add* `'b'`? and *Go ahead?* arrows on the second level are calls to `backtrack(1)`.

`backtrack(2)` calls are when we reach the "dead ends". In those cases, we add `currentSubset` to the `result`. We always reach the base case in a `backtrack(2)` call because it's only when the `idx` equals `items.length`.

![Animated visualization of backtrack function for the array `['a', 'b']`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747920409397/0c18c7a6-1776-415b-8918-a6cafe6ba70c.gif)

::: note

We modified the function in the above examples to work with strings, but in the actual solution we'll only deal with numbers, so in TypeScript, `result` and `currentSubset` will look like this:

```ts
let result: number[][] = [];
let currentSubset: number[] = [];
```

Also, the function parameter and return types are different:

```ts
function subsets(nums: number[]): number[][] { ... }
```

Otherwise, everything stays the same.

:::

::: info Time and space complexity

A subset is, in the worst case, length n which is the length of our input. We'll have 2n subsets and since we also use a [<VPIcon icon="fa-brands fa-firefox"/>spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in our example to copy `currentSubset`, the time complexity will be $O\left(n\cdot2^{n}\right)$. The space complexity is - *I think* - $O\left(n\cdot2^{n}\right)$ as well because of the recursive call stack (which is of depth `n`), and the space needed for `result` (which is in the worst case 2n).

:::

---

## Chapter Ten: Tries

The trie data structure [랴<VPIcon icon="fa-brands fa-wikipedia-w"/>gets its name from the word _re**trie**val_](https://en.wikipedia.org/wiki/Trie#History,_etymology,_and_pronunciation) - and it's usually pronounced as "try," so that we don't get confused with another familiar and friendly data structure, "tree."

But a trie is still a tree (or tree-like) data structure whose nodes usually store individual letters. So, by traversing the nodes in a trie, we can retrieve strings.

Tries are useful for applications such as autocompletion and spellchecking - and the larger our trie is, the less work we have to do for inserting a new value.

::: note

Using arrays is not very memory-efficient, but for now, we'll stick to the array implementation.

:::

First, let's see what a trie looks like:

![Animated visualization of a trie having the values "sea" and "see"](https://cdn.hashnode.com/res/hashnode/image/upload/v1747920685051/e152eedd-75c6-478b-8291-5510b8f1421c.gif)

In this trie, we can retrieve the strings "sea" and "see" - but not "sew", for example.

There is a lot going on, but we can try to understand it piece by piece.

Let's look at a trie node.

We'll create a `TrieNode` class that has `children`, which is an array of length $26$ (so that each index corresponds to a letter in the English alphabet), and a flag variable `isEndOfWord` to indicate whether that node represents the last character of a word:

```ts
class TrieNode {
  children: (TrieNode | null)[];
  isEndOfWord: boolean;

  constructor() {
    this.children = Array.from({ length: 26 }, () => null);
    this.isEndOfWord = false;
  }
}
```

We're initializing `children` with `null` values. As we add a character to our trie, the index that corresponds to that character will be filled.

::: note

We're not storing the actual character itself in this implementation - it's implicit in the usage of indices.

:::

In a trie, we start with an empty root node.

```ts
class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }
  // ...
}
```

To insert a word, we're going to loop through each character, and initialize a new `TrieNode` to the corresponding index.

```ts
insert(word: string) {
  let currentNode = this.root;
  for (const char of word) {
    let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
    if (currentNode.children[idx] === null) {
      currentNode.children[idx] = new TrieNode();
    }
    currentNode = currentNode.children[idx];
  }

  currentNode.isEndOfWord = true;
}
```

Once we reach the node that indicates the last character of the word we inserted, we also mark the `isEndOfWord` variable as `true`.

::: note

`word` is going to be lowercase in these examples - otherwise, we have to convert it, such as:

```ts
word = word.toLowerCase();
```

:::

For searching a word's existence in the trie, we'll do a similar thing. We'll look at the nodes for each character, and if we reach the last one that has `isEndOfWord` marked as `true`. That means we've found the word:

```ts
search(word: string) {
  let currentNode = this.root;
  for (const char of word) {
    let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
    if (currentNode.children[idx] === null) {
      return false;
    }      
    currentNode = currentNode.children[idx];
  }

  return currentNode.isEndOfWord;
}
```

::: note

If we find the word we're looking for, then it's called a **search hit**. Otherwise, we have a **search miss** and the word doesn't exist in our trie.

:::

Removing a word is a bit more challenging. Let's say that we want to remove the word "see." But, there is also another word "sea," with the same prefix ('s' and 'e'). So, we should remove only the nodes that we're allowed to.

For this reason, we'll define a recursive function. Once we reach the last character of the word we want to remove, we'll back up and remove the characters we can remove:

```ts :collapsed-lines
const removeRecursively = (node: TrieNode | null, word: string, depth: number) => {
  if (node === null) {
    return null;
  }

  if (depth === word.length) {
    if (node.isEndOfWord) {
      node.isEndOfWord = false;
    }
    if (node.children.every(child => child === null)) {
      node = null;
    }

    return node;
  }

  let idx = word[depth].charCodeAt(0) - 'a'.charCodeAt(0);
  node.children[idx] = removeRecursively(node.children[idx], word, depth + 1);

  if (node.children.every(child => child === null) && !node.isEndOfWord) {
    node = null;
  }

  return node;
}
```

`depth` indicates the index of the word, or *the depth of the trie we reach*.

Once `depth` is equal to the word's length (one past the last character), we check if it's the end of the word. If that's the case, we'll mark it as `false` now, because that word won't exist from here on. Then, we can only mark the node as `null` if it doesn't have any children (in other words, if all of them are `null`). We'll apply this logic to each child node recursively until the word is removed as far as it can be removed.

Here is the final example implementation of a trie:

```ts :collapsed-lines
class TrieNode {
  children: (TrieNode | null)[];
  isEndOfWord: boolean;

  constructor() {
    this.children = Array.from({ length: 26 }, () => null);
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let currentNode = this.root;
    for (const char of word) {
      let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (currentNode.children[idx] === null) {
        currentNode.children[idx] = new TrieNode();
      }
      currentNode = currentNode.children[idx];
    }

    currentNode.isEndOfWord = true;
  }

  search(word: string) {
    let currentNode = this.root;
    for (const char of word) {
      let idx = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (currentNode.children[idx] === null) {
        return false;
      }      
      currentNode = currentNode.children[idx];
    }

    return currentNode.isEndOfWord;
  }

  remove(word: string) {
    const removeRecursively = (node: TrieNode | null, word: string, depth: number) => {
      if (node === null) {
        return null;
      }

      if (depth === word.length) {
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
        }
        if (node.children.every(child => child === null)) {
          node = null;
        }

        return node;
      }

      let idx = word[depth].charCodeAt(0) - 'a'.charCodeAt(0);
      node.children[idx] = removeRecursively(node.children[idx], word, depth + 1);

      if (node.children.every(child => child === null) && !node.isEndOfWord) {
        node = null;
      }

      return node;
    }

    removeRecursively(this.root, word, 0);
  }
}

let t = new Trie();

t.insert('sea');
t.insert('see');

console.log(t.search('sea')); // true
console.log(t.search('see')); // true

console.log(t.search('hey')); // false
console.log(t.search('sew')); // false

t.remove('see');

console.log(t.search('see')); // false 
console.log(t.search('sea')); // true
```

::: info Time and space complexity

The time complexity of creating a trie is going to be $O\left(m\times{n}\right)$ where $m$ is the longest word and $n$ is the total number of words. Inserting, searching, and deleting a word is $O\left(a\times{n}\right)$ where a is the length of the word and n is the total number of words.

When it comes to space complexity, in the worst case, each node can have children for all the characters in the alphabet we're representing. But, the size of the alphabet is constant, so the growth of storage needs will be proportionate to the number of nodes we have, which is $O\left(n\right)$ where n is the number of nodes.

:::

---

## Chapter Eleven: Graphs

A graph is probably *the* data structure that everyone is familiar with, regardless of their profession or interests.

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Graph theory](https://en.wikipedia.org/wiki/Graph_theory#Representation) is a very broad topic, but we'll simply look at some of the main ingredients of what makes a graph and how to represent it, as well as basic graph traversals.

In a graph, there are two main components: vertices (or nodes) and edges that connect those vertices.

::: note

Here, we're going to use "vertex" and "node" interchangeably. The terms "adjacent vertices" and "neighbors" are used interchangeably as well.

:::

A graph can be **directed** or **undirected**. With a directed edge, we have an origin and a destination vertex. On the other hand, an undirected edge is bidirectional, origin and destination are not fixed.

::: note

There might also be [<VPIcon icon="fa-brands fa-wikipedia-w"/>mixed graphs](https://en.wikipedia.org/wiki/Graph_\(discrete_mathematics\)#Mixed_graph) that have both directed and undirected edges.

:::

A graph can also be weighted or unweighted, each edge can have different weights, usually representing the cost of going from one vertex to the other.

We can define a graph like this:

$$
G=\left(V,\:E\right)
$$

$V$ is a set of vertices, and $E$ is a set of edges.

For example, if we have a directed graph like this:

![Animated visualization of a graph with nodes $A$, $B$, $C$, $D$. A has directed edges to $B$ and $C$, $C$ has one to $B$ and $D$. $D$ has one to $C$. ](https://cdn.hashnode.com/res/hashnode/image/upload/v1747921387268/fe3d0ef9-a271-4c87-9143-84e80e41af5f.gif)

Then, we have the vertices:

$$
V=\left\{A,\:B,\:C,\:D\right\}
$$

And, the edges are:

$$
E=\left\{\left(A,\:B\right),\:\left(A,\:C\right),\:\left(C,\:B\right),\:\left(C,\:D\right)\:\left(D,\:C\right)\right\}
$$
If we have an undirected graph such as this one:

![Animated visualization of the same graph above with undirected edges.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747921458245/d2920859-81c0-4082-a49d-e41b08b81124.gif)

We have the same vertices:

$$
V=\left\{A,\:B,\:C,\:D\right\}
$$

But our edges can look like this:

$$
E=\left\{\{B,\:A\},\:\{A,\:C\},\:\{C,\:B\},\{D,\:C\}\right\}
$$

::: note

We use parentheses when it comes to directed edges, but curly braces with undirected edges as there is no direction from one vertex to the other.

:::

When two vertices share an edge, they are **adjacent** to each other. The **degree** of a vertex is the number of adjacent vertices to it. We can also define the degree as the number of edges coming out of the vertex. For example, in the above image, the vertex A has a degree of 2. A **simple path** is the one that we don't repeat any vertices while traversing the graph.

An example might look like this:

![Animated visualization of the same graph above with highlighted nodes in this order: $A$, $B$, $C$, $D$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747921569022/50f556e7-f954-4203-8c4b-493b2be5a353.gif)

A **cycle** is a simple path, except that we end up at the vertex we started with:

![Animated visualization of the same graph above with highlighted nodes in this order: $A$, $B$, $C$ (with all the edges also highlighted).](https://cdn.hashnode.com/res/hashnode/image/upload/v1747921594728/717408ba-f9fb-4cef-9b52-70f487e9162d.gif)

### Representing graphs

When it comes to representing graphs, there are several ways to do it, and we'll look at three of them: an edge list, an adjacency matrix, and an adjacency list.

#### Edge List

We can simply put all the edges in an array:

```plaintext
[ [A, B], [A, C], [B, C], [C, D] ]
```

But to find an edge in an edge list, we'll have to iterate through them, so it will have $O\left(E\right)$ time complexity, where in the worst case, we'll search the whole list to find an edge. Similarly, it needs $O\left(E\right)$ amount of space to represent all the edges.

#### Adjacency Matrix

The adjacency matrix for our example might look like this:

$$
\left\lceil\begin{matrix}
&A&B&C&D\\
A&0&1&1&0\\
B&1&0&1&0\\
C&1&1&0&1\\
D&0&0&1&0
\end{matrix}\right\rceil
$$

Each row is for a vertex, and the matching column shows the relationship between those vertices. For example, the vertex $A$ doesn't have an edge pointing to $D$, so the cell that matches $A$ and $D$ is $0$. On the other hand, $A$ is connected to $B$ and $C$, so those cells have the value 1.

::: note

If the graph is weighted, we can simply put the weight instead of `1`, and when there is no edge, the value can stay `0`.

:::

*An adjacency matrix will have 0s in the "main diagonal," showing that there are no self-loops.*

Let's try implementing it in TypeScript.

We'll start with a minimal graph vertex:

```ts
class GraphVertex {
  value: string | number;

  constructor(value: string | number) {
    this.value = value;
  }
}
```

Now we can define our graph. We'll make it really simple with three properties to hold: `matrix` to represent the graph as an adjacency matrix, `vertices` to hold vertices, and `isDirected` to indicate whether our graph is directed:

```ts
class Graph {
  matrix: number[][];
  vertices: GraphVertex[];
  isDirected: boolean;

  constructor(vertices: GraphVertex[], isDirected = true) {
    this.vertices = vertices;
    this.isDirected = isDirected;
    // ...
  }

  // ...
}
```

Initializing our adjacency matrix might look like this:

```ts
this.matrix = Array.from({ length: vertices.length }, () => {
  return Array.from({ length: vertices.length }, () => 0)
});
```

We'll have an array with the length of vertices. Each item in the array is an array with the length of vertices as well, but filled with zeroes.

In our example with four vertices, the initial adjacency matrix looks like this:

```plaintext
[ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ]
```

Then, adding an edge is just marking the corresponding value as `1`, so that we can represent a connection between two vertices:

```ts
this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] = 1;
```

::: note

This implementation assumes that all vertices are distinct.

:::

If we have an undirected graph, we can have it both ways:

```ts
if (!this.isDirected) {
  this.matrix[this.vertices.indexOf(v2)][this.vertices.indexOf(v1)] = 1;
}
```

Removing an edge, in this case, will be just resetting the value to `0`:

```ts
this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] = 0;
```

And, checking for the existence of an edge is simply checking whether the corresponding value is `0` or not:

```ts
this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] !== 0;
```

And, here is the whole example with additional methods for adding and removing an edge, checking if there is an edge between two vertices, and checking if a specific vertex is in the graph:

```ts :collapsed-lines
class Graph {
  matrix: number[][];
  vertices: GraphVertex[];
  isDirected: boolean;

  constructor(vertices: GraphVertex[], isDirected = true) {
    this.vertices = vertices;
    this.matrix = Array.from({ length: vertices.length }, () => {
      return Array.from({ length: vertices.length }, () => 0)
    });
    this.isDirected = isDirected;
  }

  addEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] = 1;

    if (!this.isDirected) {
      this.matrix[this.vertices.indexOf(v2)][this.vertices.indexOf(v1)] = 1;
    }
  }

  /* 
  For a weighted graph:

  addEdge(v1: GraphVertex, v2: GraphVertex, weight: number) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] = weight;
    if (!this.isDirected) {
      this.matrix[this.vertices.indexOf(v2)][this.vertices.indexOf(v1)] = weight;
    }
  }
  */

  removeEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] = 0;

    if (!this.isDirected) {
      this.matrix[this.vertices.indexOf(v2)][this.vertices.indexOf(v1)] = 0;
    }
  }

  hasEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    return this.matrix[this.vertices.indexOf(v1)][this.vertices.indexOf(v2)] !== 0;
  }

  getAdjacencyMatrix() {
    return this.matrix;
  }

  _checkVertexIsInGraph(v: GraphVertex) {
    if (!this.vertices.includes(v)) {
      throw new Error('Vertex doesn\'t exist');
    }
  }
}


let a = new GraphVertex('A');
let b = new GraphVertex('B');
let c = new GraphVertex('C');
let d = new GraphVertex('D');

let graph = new Graph([a, b, c, d], false);

graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, c);
graph.addEdge(c, d);

console.log(graph.getAdjacencyMatrix());
// -> [ [0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 1], [0, 0, 1, 0] ]
```

Operations on an adjacency matrix have $O\left(1\right)$ time complexity. But our storage needs will be $O\left(V^{2}\right)$ where $V$ is the number of vertices.

#### Adjacency List

In an adjacency list, usually a hashmap **or** an array of linked lists is used. For example:

```ts
let graph = {
  'A': ['B', 'C'],
  'B': ['A', 'C'],
  'C': ['A', 'B', 'D'],
  'D': ['C']
}
```

Let's see how we can modify our code above to use an adjacency list instead.

Instead of having a `matrix` which is an array of arrays, we can have a [<VPIcon icon="fa-brands fa-firefox"/>`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that maps the vertices to an array of their neighbors.

We can initialize it as a map that has the vertices as keys, each of which has a value of an empty array for now:

```ts
this.list = new Map<GraphVertex, GraphVertex[]>();
for (const v of vertices) {
  this.list.set(v, []);
}
```

Adding an edge will be just pushing to the array of corresponding vertex:

```ts
this.list.get(v1)!.push(v2);
```

If our graph is undirected, we can do it both ways here as well:

```ts
if (!this.isDirected) {
  this.list.get(v2)!.push(v1);
}
```

Removing an edge will be deleting that vertex from the array:

```ts
this.list.set(v1, this.list.get(v1)!.filter(v => v !== v2));
```

Checking if an edge exists is just checking the existence of that vertex in the array:

```ts
this.list.get(v1)!.includes(v2);
```

::: note

We're using a [<VPIcon icon="iconfont icon-typescript"/>non-null assertion operator](https://typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) as we’re using TypeScript in these examples. As we'll see below, we first check if the vertex is in the graph. And since we're adding all the vertices in the graph as keys to `this.list`, we're sure that getting that vertex from the list is not `undefined`. But TypeScript will warn us because if a key is not found in a `Map` object, it could [<VPIcon icon="fa-brands fa-firefox"/>potentially return `undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get#return_value).

:::

Here is our graph:

```ts :collapsed-lines
class Graph {
  list: Map<GraphVertex, GraphVertex[]>;
  vertices: GraphVertex[];
  isDirected: boolean;

  constructor(vertices: GraphVertex[], isDirected = true) {
    this.vertices = vertices;
    this.list = new Map();
    for (const v of vertices) {
      this.list.set(v, []);
    }
    this.isDirected = isDirected;
  }

  addEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    this.list.get(v1)!.push(v2);

    if (!this.isDirected) {
      this.list.get(v2)!.push(v1);
    }
  }

  removeEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    this.list.set(v1, this.list.get(v1)!.filter(v => v !== v2));

    if (!this.isDirected) {
      this.list.set(v2, this.list.get(v2)!.filter(v => v !== v1));
    }
  }

  hasEdge(v1: GraphVertex, v2: GraphVertex) {
    this._checkVertexIsInGraph(v1);
    this._checkVertexIsInGraph(v2);

    return this.list.get(v1)!.includes(v2);
  }

  getAdjacencyList() {
    return this.list;
  }

  _checkVertexIsInGraph(v: GraphVertex) {
    if (!this.vertices.includes(v)) {
      throw new Error('Vertex doesn\'t exist');
    }
  }
}


let a = new GraphVertex('A');
let b = new GraphVertex('B');
let c = new GraphVertex('C');
let d = new GraphVertex('D');

let graph = new Graph([a, b, c, d], false);

graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, c);
graph.addEdge(c, d);

console.log(graph.getAdjacencyList());

/* Output:

Map (4) {
  GraphVertex: { "value": "A" } => [
    GraphVertex: { "value": "B" }, 
    GraphVertex: { "value": "C" }
  ], 
  GraphVertex: { "value": "B" } => [
    GraphVertex: { "value": "A" }, 
    GraphVertex: { "value": "C" }
  ], 
  GraphVertex: { "value": "C" } => [
    GraphVertex: { "value": "A" }, 
    GraphVertex: { "value": "B" }, 
    GraphVertex: { "value": "D" }
  ], 
  GraphVertex: { "value": "D" } => [
    GraphVertex: { "value": "C" }
  ]
} 

*/
```

Getting the neighbors of a vertex is $O\left(1\right)$ because we're just looking up a key in a map. But finding a particular edge can be $O\left(d\right)$ where d is the number of degrees of the vertex, because we might need to traverse all the neighbors to find it. And, it could be $V−1$ where $V$ is the number of vertices in the graph. It's the case when that vertex has all the other vertices as its neighbors.

The space complexity can be $O\left(V+E\right)$ where $V$ is the number of vertices and $E$ is the number of edges.

### Traversals

Continuing with the adjacency list representation, let's now take a look at two (very familiar) ways to traverse a graph: breadth-first search and depth-first search.

But first, we'll modify our graph a little bit. We'll add a new vertex `'E'` and update some edges:

```ts
let a = new GraphVertex('A');
let b = new GraphVertex('B');
let c = new GraphVertex('C');
let d = new GraphVertex('D');
let e = new GraphVertex('E');


let graph = new Graph([a, b, c, d, e], false);

graph.addEdge(a, b);
graph.addEdge(a, c);
graph.addEdge(b, d);
graph.addEdge(c, e);
```

The important idea to remember is that there is no hierarchy of vertices, so we don't have a root node.

For a breadth-first or depth-first search, we can use an arbitrary node as a starting point.

#### Breadth-First Search

With our new graph, a breadth-first search traversal looks like this:

![Animated visualization for a breadth-first search of a graph with nodes $A$, $B$, $C$, $D$, $E$ with highlighted nodes in this order: $A$, $B$, $C$, $D$, $E$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922399341/f4b9f63b-5188-48a2-83ec-51524721c2b1.gif)

When it comes to breadth-first search, usually a queue is used, and the idea is simple: given a current node, we'll add the adjacent nodes first, marking them as visited as we go.

Inside the `Graph` class, we can implement a `bfs` method that does just that:

```ts
bfs(startNode: GraphVertex) {
  const visited = new Set();
  const queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    // console.log(currentNode);
    this.list.get(currentNode as GraphVertex)!.forEach((node) => {
      if (!visited.has(node)) {
        visited.add(node);
        queue.push(node);
      }
    });
  }
}
```

If we call the `bfs` method with `a` as the starting vertex (`graph.bfs(a)`), and log `currentNode` to console each time we go, it's as we expected:

```plaintext
GraphVertex { value: 'A' }
GraphVertex { value: 'B' }
GraphVertex { value: 'C' }
GraphVertex { value: 'D' }
GraphVertex { value: 'E' }
```

With the adjacency list, using a BFS has $O\left(V+E\right)$ time complexity (sum of the vertices and edges) as we're traversing the whole graph.

#### Depth-First Search

With the same modified graph, a depth-first search looks like this:

![Animated visualization for a depth-first search of a graph with nodes $A$, $B$, $C$, $D$, $E$ with highlighted nodes in this order: $A$, $B$, $D$, $C$, $E$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922463260/72e852c1-642f-4ce0-829d-e658a8a7b880.gif)

With depth-first search there is usually recursion involved as we're traversing through a path until we have visited all the nodes in that path. Once we hit a dead end, we'll **backtrack** and continue exploring until we have visited all the vertices in the graph.

Again, inside the `Graph` class, we can add a `dfs` method:

```ts
dfs(startNode: GraphVertex, visited = new Set()) {
  visited.add(startNode);
  // console.log(startNode);
  this.list.get(startNode)!.forEach((node) => {
    if (!visited.has(node)) {
      this.dfs(node, visited);
    }
  });
}
```

Starting with a node, we check how deep we can go from there. Once we reach a dead end (when the `dfs` inside `forEach` returns), we continue checking other neighbors (with `forEach`) until none is left. We essentially do the same thing until all the vertices are visited.

Logging the output matches our expectation:

```plaintext
GraphVertex { value: 'A' }
GraphVertex { value: 'B' }
GraphVertex { value: 'D' }
GraphVertex { value: 'C' }
GraphVertex { value: 'E' }
```

The time complexity for a depth-first search traversal of a graph is the similar to BFS, $O\left(V+E\right)$.

---

## Chapter Twelve: Dynamic Programming

Dynamic programming (DP) is one of those concepts that is a bit intimidating when you hear it for the first time. But the crux of it is simply breaking problems down into smaller parts and solving them. It’s also about storing those solutions so that we don't have to compute them again.

Breaking problems down into subproblems is nothing new - that's pretty much what problem-solving is all about. What dynamic programming is also specifically concerned with are **overlapping subproblems** that are repeating - we want to calculate solutions to those subproblems so that we won't be calculating them again each time. Put another way, *we want to remember the past so that we won't be condemned to repeat it*.

For example, calculating $1+1+1+1+1$ is very easy if we have already calculated $1+1+1+1$. We can just remember the previous solution, and use it:

![Animated visualization of the result of $1+1+1+1$ constituting a subproblem of $1+1+1+1+1$.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922611072/bcb33cae-aed3-41bd-8823-4e10a0e13fbf.gif)

Calculating the Fibonacci sequence is one of the well-known examples when it comes to dynamic programming. Because we have to calculate the same functions each time for a new number, it lends itself to DP very well.

For example, to calculate `fib(4)` we need to calculate `fib(3)` and `fib(2)`. But calculating `fib(3)` also involves calculating `fib(2)`, so we'll be doing the same calculation, *again*.

A classic, good old recursive Fibonacci function might look like this:

```ts
function fib(n: number): number {
  if (n === 0 || n === 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}
```

Though the issue we have just mentioned remains: we'll keep calculating the same values:

![Animated visualization displaying repeated fibonacci calls.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747922659848/577aef57-17b5-40ad-a926-74387b0e3731.gif)

But, we want to do better.

**Memoization** is remembering the problems we have solved before so that we don't have to solve them again and waste our time. We can *reuse* the solution to the subproblem we've already memoized. So, we can keep a *cache* to store those solutions and use them:

```ts
function fib(n: number, cache: Map<number, number>): number {
  if (cache.has(n)) {
    return cache.get(n)!;
  }

  if (n === 0 || n === 1) {
    return n;
  }

  const result = fib(n - 1, cache) + fib(n - 2, cache);
  cache.set(n, result);

  return result;
}
```

For example, we can initially pass an empty `Map` as the argument for `cache`, and print the first 15 Fibonacci numbers:

```ts :collapsed-lines
let m = new Map<number, number>();

for (let i = 0; i < 15; i++) {
  console.log(fib(i, m));
}

/*
  0
  1
  1
  2
  3
  5
  8
  13
  21
  34
  55 
  89
  144
  233
  377 
 */
```

There are two different approaches with dynamic programming: **top-down** and **bottom-up**.

Top-down is like what it sounds: starting with a large problem, breaking it down to smaller components, memoizing them. It's what we just did with the `fib` example.

Bottom-up is also like what it sounds: starting with the smallest subproblem, finding out a solution, and working our way up to the larger problem itself. It also has an advantage: with the bottom-up approach, we don't need to store every previous value - we can only keep the two elements at the bottom so that we can use them to build up to our target.

With the bottom-up approach, our `fib` function can look like this:

```ts
function fib(n: number) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}
```

Just note that we are keeping an array whose size will grow linearly as the input increases. So, we can do better with constant space complexity, not using an array at all:

```ts
function fib(n: number) {
  if (n === 0 || n === 1) {
    return n;
  }

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    let tmp = a + b;
    a = b;
    b = tmp;
  }

  return b;
}
```

::: info Time and space complexity

The time complexities for both the top-down and bottom-up approaches in the Fibonacci example are $O\left(n\right)$ as we solve each subproblem, each of which is of constant time.

:::

::: note

The time complexity of the recursive Fibonacci function that doesn't use DP is exponential (in fact, $O\left(\phi^{n}\right)$ - yes [<VPIcon icon="fa-brands fa-wikipedia-w"/>the golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) as its base).

:::

But when it comes to space complexity, the bottom-up approach (the second version) is $O\left(1\right)$.

::: note

The first version we've used for the bottom-up approach has $O\left(n\right)$ time complexity as we store the values in an array.

:::

The top-down approach has $O\left(n\right)$ space complexity because we store a `Map` whose size will grow linearly as `n` increases.

---

## Chapter Thirteen: Intervals

An interval simply has a start and an end. The easiest way to think about intervals is as time frames.

With intervals, the usual concern is whether they overlap or not.

For example, if we have an interval `[1, 3]` and another `[2, 5]`, they are clearly overlapping, so they can be merged together to create a new interval `[1, 5]`:

![Animated visualization with interval `[1, 3]` merging with `[2, 5]`, becoming `[1, 5]`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923034510/05767713-f24f-4467-82f5-89e025631be9.gif)

In order for two intervals **not to overlap**:

- the *start* of one should be *strictly larger* than the *end* of the other

```plaintext
newInterval[0] > interval[1]
```

Or:

- the *end* of the one should be *strictly smaller* than the *start* of the other

```plaintext
newInterval[1] < interval[0]
```

If both of these are false, they are overlapping.

If they are overlapping, the new (merged) interval will have the minimum value from both intervals as its start, and the maximum as its end:

```plaintext
[
  min(newInterval[0], interval[0]),
  max(newInterval[1], interval[1])
]
```

---

## Chapter Fourteen: Bit Manipulation

[<VPIcon icon="fa-brands fa-wikipedia-w"/>A bitwise operation](https://en.wikipedia.org/wiki/Bitwise_operation) operates on a bit string, a bit array, or a binary numeral (considered as a bit string) at the level of its individual bits.

Let's first represent a number in binary (base 2). We can use `toString` method on a [<VPIcon icon="fa-brands fa-firefox"/>number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), and specify the **radix**:

```js
const n = 17;

console.log(n.toString(2)); // 10001
```

We can also parse an integer giving it a base:

```js
console.log(parseInt(10001, 2)); // 17
```

::: note

We can also represent a binary number with the prefix `0b`:

:::

```js
console.log(0b10001); // 17
console.log(0b101); // 5
```

For example, these are the same number:

```js
0b1 === 0b00000001 // true
```

All bitwise operations are performed on 32-bit binary numbers in JavaScript. That is, *before a bitwise operation is performed, JavaScript converts numbers to 32-bit* ***signed*** *integers.*

So, for example, `17` won't be simply `10001` but `00000000 00000000 00000000 00010001`.

*After the bitwise operation is performed, the result is converted back to 64-bit JavaScript numbers.*

### Bitwise operators

#### AND (`&`)

If two bits are `1`, the result is `1`, otherwise `0`.

The GIFs below show the numbers as 8-bit strings, but when doing bitwise operations, remember they are converted to 32-bit numbers.

![Animated visualization of an AND operation. 00010001 & 00000101 = 00000001.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923324409/4415a01f-6129-4dcf-a1ce-b8e898bdba9a.gif)

```js
const x1 = 0b10001;
const x2 = 0b101;

const result = x1 & x2; // 1 (0b1)
```

#### OR (`|`)

If either of the bits is `1`, the result is `1`, otherwise `0`.

![Animated visualization of an OR operation. 00010001 | 00000101 = 00010101.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923365941/22e562c4-e195-4567-b8ef-4b94cb4a394f.gif)

```js
const x1 = 0b10001;
const x2 = 0b101;

const result = x1 | x2; // 21 (0b10101)
```

#### XOR (`^`)

If the bits are different (one is `1` and the other is `0`), the result is `1`, otherwise `0`.

![Animated visualization of a XOR operation. 00010001 ^ 00000101 = 00010100.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923403151/52090e1a-98ee-4303-a433-6318ec6f18d2.gif)

```js
const x1 = 0b10001;
const x2 = 0b101;

const result = x1 ^ x2; // 20 (0b10100)
```

#### NOT (`~`)

Flips the bits (`1` becomes `0`, `0` becomes `1`).

![Animated visualization of a NOT operation. ~00010001 = 11101110.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747923458432/2807b821-8069-45e6-a37b-d8167ec722e7.gif)

```js
const n = 17;

const result = ~n; // -18
```

::: note

Bitwise NOTing any 32-bit integer `x` yields `-(x + 1)`.

:::

If we use [<VPIcon icon="fa-brands fa-stack-overflow"/>a helper function](https://stackoverflow.com/a/33758875) to see the binary representations, it is as we expected:

```js
console.log(createBinaryString(n));
// -> 00000000 00000000 00000000 00010001

console.log(createBinaryString(result));
// -> 11111111 11111111 11111111 11101110
```

The leftmost bit indicates the signal - whether the number is negative or positive.

Remember that we said JavaScript uses 32-bit **signed** integers for bitwise operations. **The leftmost bit is** `1` for negative numbers and `0` for positive numbers. Also, the operator operates on the operands' bit representations in [<VPIcon icon="fa-brands fa-wikipedia-w"/>two's complement](https://en.wikipedia.org/wiki/Two's_complement). The operator is applied to each bit, and the result is constructed bitwise.

::: note

Two's complement allows us to get a number with an inverse signal. One way to do it is to invert the bits of the number in the positive representation and add 1 to it:

```js
function twosComplement(n) {
  return ~n + 0b1;
}
```

:::

#### Left shift (zero fill) (`<<`)

Shifts the given number of bits to the left, adding zero bits shifted in from the right.

```js
const n = 17;
const result = n << 1; // 34


console.log(createBinaryString(17));
// -> 00000000 00000000 00000000 00010001

console.log(createBinaryString(34));
// -> 00000000 00000000 00000000 00100010
```

::: note

Note that the 32nd bit (the leftmost one) is discarded.

:::

#### Right shift (sign preserving) (`>>`)

Shifts the given number of bits to the right, preserving the sign when adding bits from the left.

```js
const n = 17;
const result = n >> 1; // 8


console.log(createBinaryString(17));
// -> 00000000 00000000 00000000 00010001

console.log(createBinaryString(8));
// -> 00000000 00000000 00000000 00001000
```

```js
const n = -17;
const result = n >> 1; // -9

console.log(createBinaryString(-17));
// -> 11111111 11111111 11111111 11101111

console.log(createBinaryString(-9));
// -> 11111111 11111111 11111111 11110111
```

#### Right shift (unsigned) (`>>>`)

Shifts the given number of bits to the right, adding `0`s when adding bits in from the left, no matter what the sign is.

```js
const n = 17;
const result = n >>> 1; // 8


console.log(createBinaryString(17));
// -> 00000000 00000000 00000000 00010001

console.log(createBinaryString(8));
// -> 00000000 00000000 00000000 00001000
```

```js
const n = -17;
const result = n >>> 1; // 2147483639

console.log(createBinaryString(-17));
// -> 11111111 11111111 11111111 11101111

console.log(createBinaryString(2147483639));
// -> 01111111 11111111 11111111 11110111
```

### Getting a bit

To get a specific bit, we first need to create a **bitmask**. We can do this by shifting `1` to the left by the index of the bit we want to get. The result is the **AND** of the binary number and the bitmask.

But using JavaScript, we can also do an unsigned right shift by the index to put the bit in the first place (so that we don't get the actual value that is in that position, but whether it is a `1` or a `0`):

```js
function getBit(number, idx) {
  const bitMask = 1 << idx;
  const result = number & bitMask;

  return result >>> idx;
}
```

For example, let's try `13`, which is `1101` in binary:

```js
const binaryNumber = 0b1101;

console.log('Bit at position 0:', getBit(binaryNumber, 0));
console.log('Bit at position 1:', getBit(binaryNumber, 1));
console.log('Bit at position 2:', getBit(binaryNumber, 2));
console.log('Bit at position 3:', getBit(binaryNumber, 3));

/*
Output:

Bit at position 0: 1
Bit at position 1: 0
Bit at position 2: 1
Bit at position 3: 1
*/
```

### Setting a bit

If we want to turn a bit to `1` (in other words, to "*set a bit*"), we can do a similar thing.

First, we can create a bitmask again by shifting `1` to the left by the index of the bit we want to set to `1`. The result is the **OR** of the number and the bitmask:

```js
function setBit(number, idx) {
  const bitMask = 1 << idx;
  return number | bitMask;    
}
```

Remember that in our example `13` was `1101` in binary, let's say we want to set the `0` at index 1:

```js
const binaryNumber = 0b1101;
const newBinaryNumber = setBit(binaryNumber, 1);

console.log(createBinaryString(newBinaryNumber));
// -> 00000000 00000000 00000000 00001111

console.log('Bit at position 1:', getBit(newBinaryNumber, 1));
// -> Bit at position 1: 1
```

---

## Conclusion

With some detours here and there, we took a look at fourteen (or fifteen, if you count our *interlude*) different concepts, from arrays and hashing to bit manipulation.

Although I have to say that eventually, with time, it’s easy to forget all that we learned. But, that's not a problem in itself, because as you might have realized, if there is one idea that should stick with you with this handbook, it’s that problems are best solved when they are broken into smaller parts. And, as with anything else, writing or talking to yourself (see [**duck debugging**](/freecodecamp.org/rubber-duck-debugging.md)) works miracles.

Now, it's time to take a deep breath.

It was a delightful adventure to explore data structures and algorithms, and hopefully you found some value in it.

Have a beautiful journey ahead, and until then, happy coding.

### Resources & Credits

This handbook was mainly inspired by the amazing [BaseCS series (<VPIcon icon="fa-brands fa-medium"/>`basecs`)](https://medium.com/basecs) by Vaidehi Joshi, which is an incredible resource for learning basic computer science concepts.

The visualization idea was inspired by Lydia Hallie's [JavaScript Visualized series (<VPIcon icon="fa-brands fa-dev"/>`lydiahallie`)](https://dev.to/lydiahallie/series/3341).

Of course, you can also check out [<VPIcon icon="fas fa-globe"/>NeetCode's courses](https://neetcode.io/courses) which can be incredibly helpful for a serious study.

There are many other resources to check out if you want to go further, here are some of the ones I used in our exploration:

<SiteInfo
  name="Brilliant | Learn by doing"
  desc="Get smarter in 15 minutes a day with thousands of interactive, bite-sized lessons in math, science, data analysis, programming, computer science, AI, and beyond."
  url="https://brilliant.org/"
  logo="https://brilliant.org/favicon.ico"
  preview="https://brilliant.org/images/opengraph/learn-interactively.png"/>

```component VPCard
{
  "title": "LeetCode The Hard Way | LeetCode The Hard Way",
  "desc": "LeetCode The Hard Way - From Absolute Beginner to Quitter",
  "link": "http://leetcodethehardway.com",
  "logo": "http://leetcodethehardway.com/img/favicon.ico",
  "background": "rgba(0,67,137,0.2)"
}
```

<SiteInfo
  name="JavaScript reference - JavaScript | MDN"
  desc="The JavaScript reference serves as a repository of facts about the JavaScript language. The entire language is described here in detail. As you write JavaScript code, you'll refer to these pages often (thus the title ”JavaScript reference”)."
  url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="Baeldung on Computer Science"
  desc="Learn about Computer Science in practice."
  url="https://baeldung.com/cs/"
  logo="https://baeldung.com/wp-content/themes/baeldung/favicon/cs/favicon.ico"
  preview="https://baeldung.com/wp-content/uploads/sites/4/2021/08/CS-Featured-Image-06.png"/>

```component VPCard
{
  "title": "The Absolute Essentials for Bit Manipulation in JavaScript",
  "desc": "This post aims to demystify bitwise operations in JavaScript, as they can be useful for a myriad of applications. They are also very useful, for example, whe...",
  "link": "https://lucasfcosta.com/2018/12/25/bitwise-operations.html/",
  "logo": "https://lucasfcosta.com/favicon-16x16.png",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Heap & HeapSort - Noriko Tomuro",
  "desc": "Noriko Tomuro Associate Professor College of Computing and Digital Media (CDM)",
  "link": "https://condor.depaul.edu/ntomuro/courses/402/notes/heap.html/",
  "logo": "https://condor.depaul.edu/_layouts/15/images/favicon.ico",
  "background": "rgba(0,87,183,0.2)"
}
```

```component VPCard
{
  "title": "Heaps",
  "desc": "Reva Freedman Associate Professor Department of Computer Science Northern IllinoisUniversity",
  "link": "https://faculty.cs.niu.edu/~freedman/340/340notes/340heap.htm/",
  "logo": "",
  "background": "rgba(200,16.46,0.2)"
}
```

```component VPCard
{
  "title": "How to Implement a Python Stack",
  "desc": "In this tutorial, you'll learn how to implement a Python stack. You'll see how to recognize when a stack is a good choice for data structures, how to decide which implementation is best for a program, and what extra considerations to make about stacks in a threading or multiprocessing environment.",
  "link": "/realpython.com/how-to-implement-python-stack#using-collectionsdeque-to-create-a-python-stack.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "LeetCode Meditations: A Visual Handbook of Data Structures and Algorithms Concepts",
  "desc": "It may seem like an oxymoron when the words ”LeetCode” and ”meditation” are used together - after all, one thing that almost everyone can agree is that LeetCode is challenging. It's called grinding LeetCode for a reason. It doesn't have anything to d...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/leetcode-dsa-concepts-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
