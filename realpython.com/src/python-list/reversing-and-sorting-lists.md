---
lang: en-US
title: "Reversing and Sorting Lists"
description: "Article(s) > (9/15) Python's list Data Type: A Deep Dive With Examples"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (9/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Reversing and Sorting Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/reversing-and-sorting-lists.html
date: 2023-07-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python's list Data Type: A Deep Dive With Examples",
  "desc": "In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python.",
  "link": "/realpython.com/python-list/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python's list Data Type: A Deep Dive With Examples"
  desc="In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python."
  url="https://realpython.com/python-list#reversing-and-sorting-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Reversing and specially sorting lists of values are commonplace tasks in programming. In Python, you’ll have the built-in [<VPIcon icon="fa-brands fa-python"/>`reversed()`](https://docs.python.org/3/library/functions.html#reversed) and [<VPIcon icon="fa-brands fa-python"/>`sorted()`](https://docs.python.org/3/library/functions.html#sorted) functions to perform these tasks. When you’re working with lists, then you also have the `.reverse()` and `.sort()` methods, which reverse and sort the target list in place.

In the following sections, you’ll learn how to reverse and sort lists using the tools that Python provides for these tasks.

---

## Reversing a List: `reversed()` and `.reverse()`

The built-in `reversed()` function takes a sequence as an argument and returns an iterator that yields the values of that sequence in reverse order:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

reversed(digits)
#
# <list_reverseiterator object at 0x10b261a50>

list(reversed(digits))
#
# [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

digits
#
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

When you call `reversed()` with a list as an argument, you get a reverse iterator object. This iterator yields values from the input list in reverse order. In this example, you use the `list()` constructor to consume the iterator and get the reversed data as a list.

::: note

To dive deeper into reversing lists in Python, check out [**Reverse Python Lists: Beyond `.reverse()` and `reversed()`**](/realpython.com/python-reverse-list.md).

:::

The `reversed()` function doesn’t modify the input object. You’ll typically use `reversed()` in loops as a way to iterate over your data in reverse order. If you need to keep a reference to your data, then you can use `list()` and assign its return value to a new variable, which will be completely independent of your original sequence.

It’s important to note that `reversed()` retrieves items from the input sequence lazily. This means that if something changes in the input sequence during the reversing process, then those changes will reflect in the final result:

```py
numbers = [1, 2, 3]

reversed_numbers = reversed(numbers)
next(reversed_numbers)
#
# 3

numbers[1] = 222 
next(reversed_numbers)
#
# 222

next(reversed_numbers)
#
# 1
```

In this example, you use the built-in [**`next()`**](/realpython.com/python-iterators-iterables.md#using-the-built-in-next-function) function to consume the iterator value by value. The first call to `next()` returns the last item from `numbers`. Then you update the value of the second item from `2` to `222`. When you call `next()` again, you get `222` instead of `2`. This is because `reversed()` doesn’t create a copy of the input iterable. Instead, it works with a reference to it.

The `reversed()` function is great when you want to iterate over a list in reverse order without altering the original list. What if you have a list, and for some reason, you need to reverse its content persistently? In that case, you can use the `.reverse()` method:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

digits.reverse()
digits
#
# [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

The `.reverse()` method reverses a list in place. This means that if you call `.reverse()` on an existing list, then the changes will reflect in the underlying list.

Keep in mind that while `reversed()` returns an iterator, the `.reverse()` method returns `None`. This behavior may be the source of subtle errors when you’re starting to use lists. Consider the following code:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

reversed_digits = digits.reverse()
reversed_digits is None
#
# True
```

In this example, `reversed_digits` doesn’t get a list of reversed digits. Instead, it gets `None` because `.reverse()` mutates the underlying list in place and has no fruitful return value.

Finally, slicing is another technique that you can use to get a reversed copy of an existing list. To do this, you can use the following slicing operation:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

digits[::-1] [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
```

The `[::-1]` variation of the slicing operator does the magic in this code. With this operator, you create a reversed copy of the original list. But how does it work? The third index, `step`, is typically a positive number, which is why a normal slicing operation extracts the items from left to right.

By setting `step` to a negative number, such as `-1`, you tell the slicing operator to extract the items from right to left. That’s why you get a reversed copy of `digits` in the example above.

---

## Sorting a List: `sorted()` and `.sort()`

When you need to sort a list of values without altering the original list, you can use the built-in [<VPIcon icon="fa-brands fa-python"/>`sorted()`](https://docs.python.org/3/library/functions.html#sorted) function. This function takes an iterable of values and returns a list of sorted values:

```py
numbers = [2, 9, 5, 1, 6]

sorted(numbers)
#
# [1, 2, 5, 6, 9]

numbers
#
# [2, 9, 5, 1, 6]
```

When you pass a list to `sorted()`, you get a list of sorted values as a result. The function doesn’t alter the original data in your list.

::: note

It’s important to note that `sorted()` returns a list rather than an iterator. This behavior differs from `reversed()`, which returns an iterator instead of a list.

:::

As you can see in the above example, Python sorts numbers according to their specific values. When it comes to sorting strings, things can be a bit confusing. Consider the following example:

```py
words = ["Hello,", "World!", "I", "am", "a", "Pythonista!"]

sorted(words)
#
# ['Hello,', 'I', 'Pythonista!', 'World!', 'a', 'am']
```

What? The sorted list isn’t in alphabetical order. Why? Python sorts strings character by character using each character’s [**Unicode**](/realpython.com/python-encodings-guide.md) **code point**. Because uppercase letters come before lowercase letters in Python’s [<VPIcon icon="fa-brands fa-python"/>default character set](https://docs.python.org/3/howto/unicode.html#the-string-type), [<VPIcon icon="fa-brands fa-wikipedia-w"/>UTF-8](https://en.wikipedia.org/wiki/UTF-8), you end up with `"Hello"` in the first position and `"am"` in the last.

::: note

To dive deeper into sorting tools, check out [**How to Use `sorted()` and `.sort()` in Python**](/realpython.com/python-sort.md).

:::

You can use the built-in [<VPIcon icon="fa-brands fa-python"/>`ord()`](https://docs.python.org/3/library/functions.html#ord) function to get the Unicode code point of a character in Python:

```py
ord("H")
#
# s72
ord("a")
#
# s97
```

As you can confirm in this code snippet, the uppercase `"H"` comes before the lowercase `"a"` in the Unicode table. That’s why you get `"Hello"` before `"am"` in the above example.

By default, the `sorted()` function sorts the items of a list in ascending order. If you need to sort the items in descending order, then you can use the `reverse` [**keyword-only argument**](/realpython.com/defining-your-own-python-function.md#keyword-only-arguments). This argument defaults to `False`. If you set it to `True`, then you get the data in descending order:

```py
numbers = [2, 9, 5, 1, 6]

sorted(numbers, reverse=True)
#
# [9, 6, 5, 2, 1]
```

By setting the `reverse` argument to `True`, you tell `sorted()` to sort the input iterable in reverse order. Isn’t that neat?

::: note

As you already learned, lists can store objects of different types. However, heterogeneous lists often don’t allow you to sort their content:

```py
numbers = [2, "9", 5, "1", 6]

sorted(numbers)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: '<' not supported between instances of 'str' and 'int'
```

In practice, you won’t find heterogeneous lists in many use cases. Sequences of heterogeneous objects are like a database record with a few known and immutable fields. In those cases, using a tuple is a better way to go.

:::

To illustrate how `sorted()` can help you in the real world, say that you want to calculate the [<VPIcon icon="fa-brands fa-wikipedia-w"/>median](https://en.wikipedia.org/wiki/Median) of a numeric dataset or sample. The median is the value that lies in the middle when you sort the data. In most cases, your data won’t be sorted, so sorting will be the first step. Then you just need to locate the value in the middle.

If the number of values in your dataset is even, then the median is the average of the two values in the middle. Here’s a Python function that allows you to compute the median of a sample of values:

```py
def median(samples):
    n = len(samples)
    middle_index = n // 2
    sorted_samples = sorted(samples) ...     # Odd number of values
    if n % 2:
        return sorted_samples[middle_index]
    # Even number of values
    lower, upper = middle_index - 1, middle_index + 1
    return sum(sorted_samples[lower:upper]) / 2


median([3, 5, 1, 4, 2])
#
# 3

median([3, 5, 1, 4, 2, 6])
#
# 3.5
```

Inside `median()`, you use `sorted()` to sort the samples in ascending order. Then you check if your list has an odd number of data points, in which case, you return the item in the middle directly. If the list has an even number of samples, then you compute the index of the two items in the middle, calculate their average, and return the resulting value.

The `sorted()` function also accepts another keyword-only argument called `key`. This argument allows you to specify a one-argument function that will extract a comparison key from each list item.

As an example of how to use `key`, say that you have a list of tuples where each tuple holds an employee’s data, including the employee’s name, age, position, and salary. Now imagine that you want to sort the employees by their age.

In that situation, you can do something like the following:

```py
employees = [
    ("John", 30, "Designer", 75000),
    ("Jane", 28, "Engineer", 60000),
    ("Bob", 35, "Analyst", 50000),
    ("Mary", 25, "Service", 40000),
    ("Tom", 40, "Director", 90000)
]

sorted(employees, key=lambda employee: employee[1])
# 
# [
#  ('Mary', 25, 'Service', 40000),
#  ('Jane', 28, 'Engineer', 60000),
#  ('John', 30, 'Designer', 75000),
#  ('Bob', 35, 'Analyst', 50000),
#  ('Tom', 40, 'Director', 90000)
# ]
```

In this example, you pass a [**`lambda`**](/realpython.com/python-lambda.md) function to the `key` argument. This `lambda` takes an employee tuple as an argument and returns the age value, which lives at index `1`. Then `sorted()` uses this value to sort the tuples.

The `key` argument is quite useful in practice because it allows you to fine-tune the sorting process by changing the sorting criteria according to your specific needs.

If you need to sort a list in place instead of getting a new list of sorted data, then you can use the `.sort()` method. This method is similar to the `sorted()` function:

```py
numbers = [2, 9, 5, 1, 6]

numbers.sort()
numbers
#
# [1, 2, 5, 6, 9]
```

The main difference between `sorted()` and `.sort()` is that the former returns a new list of sorted data, while the latter sorts the target list in place. Also, because `.sort()` is a method, you need to call it on a list object.

Like most `list` methods that run mutations, `.sort()` returns `None`. For example, in the code below, you run into a common mistake that can occur when working with lists:

```py
numbers = [2, 9, 5, 1, 6]

sorted_numbers = numbers.sort()
sorted_numbers is None
#
# True
```

The `.sort()` method sorts the list in place and returns `None` to remind users that it operates by [<VPIcon icon="fa-brands fa-wikipedia-w"/>side effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science)). You must keep this behavior in mind because it can lead to subtle bugs.

You can also use the `reverse` and `key` keyword-only arguments with `.sort()`. They have the same meaning and functionality as the equivalent arguments in the `sorted()` function. Go ahead and give them a try!
