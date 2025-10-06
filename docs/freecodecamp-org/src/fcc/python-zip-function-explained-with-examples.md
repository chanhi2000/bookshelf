---
lang: en-US
title: "Python’s zip() Function Explained with Simple Examples"
description: "Article(s) > Python’s zip() Function Explained with Simple Examples"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Python’s zip() Function Explained with Simple Examples"
    - property: og:description
      content: "Python’s zip() Function Explained with Simple Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/python-zip-function-explained-with-examples.html
prev: /programming/py/articles/README.md
date: 2024-10-10
isOriginal: false
author: Sahil Mahapatra
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728351007032/90a321bb-4079-4480-90e7-7aa847c54d9d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python’s zip() Function Explained with Simple Examples"
  desc="The zip() function in Python is a neat tool that allows you to combine multiple lists or other iterables (like tuples, sets, or even strings) into one iterable of tuples. Think of it like a zipper on a jacket that brings two sides together. In this g..."
  url="https://freecodecamp.org/news/python-zip-function-explained-with-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728351007032/90a321bb-4079-4480-90e7-7aa847c54d9d.png"/>

The `zip()` function in Python is a neat tool that allows you to combine multiple lists or other iterables (like tuples, sets, or even strings) into one iterable of tuples. Think of it like a zipper on a jacket that brings two sides together.

In this guide, we’ll explore the ins and outs of the `zip()` function with simple, practical examples that will help you understand how to use it effectively.

---

## How Does the `zip()` Function Work?

The `zip()` function pairs elements from multiple iterables, like lists, based on their positions. This means that the first elements of each list will be paired, then the second, and so on. If the iterables are not the same length, `zip()` will stop at the end of the shortest iterable.

The syntax for `zip()` is pretty straightforward:

```py
zip(*iterables)
```

You can pass in multiple iterables (lists, tuples, and so on), and it will combine them into tuples.

### Example 1: Combining Two Lists

Let’s start with a simple case where we have two lists, and we want to combine them. Imagine you have a list of names and a corresponding list of scores, and you want to pair them up.

```py
# Two lists to combine
names = ["Alice", "Bob", "Charlie"]
scores = [85, 90, 88]

# Using zip() to combine them
zipped = zip(names, scores)

# Convert the result to a list so we can see it
zipped_list = list(zipped)
print(zipped_list)
#
# [('Alice', 85), ('Bob', 90), ('Charlie', 88)]
```

In this example, the `zip()` function takes the two lists—`names` and `scores`—and pairs them element by element. The first element from `names` (`"Alice"`) is paired with the first element from `scores` (`85`), and so on. When we convert the result into a list, it looks like this:

This makes it easy to work with related data in a structured way.

### Example 2: What Happens When the Lists Are Uneven?

Let’s say you have lists of different lengths. What happens then? The `zip()` function is smart enough to stop as soon as it reaches the end of the shortest list.

```py
# Lists of different lengths
fruits = ["apple", "banana"]
prices = [100, 200, 150]

# Zipping them together
result = list(zip(fruits, prices))
print(result)
#
# [('apple', 100), ('banana', 200)]
```

In this case, the `fruits` list has two elements, and the `prices` list has three. But `zip()` will only combine the first two elements, ignoring the extra value in `prices`.

Notice how the last value (`150`) in the `prices` list is ignored because there’s no third fruit to pair it with. The `zip()` function ensures that you don’t get errors when working with uneven lists, but it also means you might lose some data if your lists are not balanced.

### Example 3: Unzipping a Zipped Object

What if you want to reverse the `zip()` operation? For example, after zipping two lists together, you might want to split them back into individual lists. You can do this easily using the unpacking operator `*`.

```py
# Zipped lists
cities = ["New York", "London", "Tokyo"]
populations = [8000000, 9000000, 14000000]

zipped = zip(cities, populations)

# Unzipping them
unzipped_cities, unzipped_populations = zip(*zipped)

print(unzipped_cities)
print(unzipped_populations)
#
# ('New York', 'London', 'Tokyo')
# (8000000, 9000000, 14000000)
#
```

Here, we first zip the `cities` and `populations` lists together. Then, using `zip(*zipped)`, we can "unzip" the combined tuples back into two separate lists. The `*` operator unpacks the zipped tuples into their original components.

This shows how you can reverse the zipping process to get the original data back.

### Example 4: Zipping More Than Two Lists

You aren’t limited to just two lists with `zip()`. You can zip together as many iterables as you want. Here’s an example with three lists.

```py
# Three lists to zip
subjects = ["Math", "English", "Science"]
grades = [88, 79, 92]
teachers = ["Mr. Smith", "Ms. Johnson", "Mrs. Lee"]

# Zipping three lists together
zipped_info = zip(subjects, grades, teachers)

# Convert to a list to see the result
print(list(zipped_info))
#
# [('Math', 88, 'Mr. Smith'), ('English', 79, 'Ms. Johnson'), ('Science', 92, 'Mrs. Lee')]
#
```

In this example, we are zipping three lists—`subjects`, `grades`, and `teachers`. The first item from each list is grouped together, then the second, and so on.

This way, you can combine multiple related pieces of information into easy-to-handle tuples.

### Example 5: Zipping Strings

Strings are also iterables in Python, so you can zip over them just like you would with lists. Let’s try combining two strings.

```py
# Zipping two strings
str1 = "ABC"
str2 = "123"

# Zipping the characters together
zipped_strings = list(zip(str1, str2))
print(zipped_strings)
# 
# [('A', '1'), ('B', '2'), ('C', '3')]
#
```

Here, the first character of `str1` is combined with the first character of `str2`, and so on.

This is especially useful if you need to process or pair characters from multiple strings together.

### Example 6: Zipping Dictionaries

Although dictionaries are slightly different from lists, you can still use `zip()` to combine them. By default, `zip()` will only zip the dictionary keys. Let’s look at an example:

```py
# Two dictionaries
dict1 = {"name": "Alice", "age": 25"}
dict2 = {"name": "Bob", "age": 30"}

# Zipping dictionary keys
zipped_keys = list(zip(dict1, dict2))
print(zipped_keys)
#
# [('name', 'name'), ('age', 'age')]
# 
```

Here, `zip()` pairs up the keys from both dictionaries.

If you want to zip the values of the dictionaries, you can do that using the `.values()` method:

```py
zipped_values = list(zip(dict1.values(), dict2.values()))
print(zipped_values)
#
# [('Alice', 'Bob'), (25, 30)]
# 
```

Now you can easily combine the values of the two dictionaries.

### Example 7: Using `zip()` in Loops

One of the most common uses of `zip()` is in loops when you want to process multiple lists at the same time. Here’s an example:

```py
# Lists of names and scores
names = ["Alice", "Bob", "Charlie"]
scores = [85, 90, 88]

# Using zip() in a loop
for name, score in zip(names, scores):
    print(f"{name} scored {score}")
#
# Alice scored 85
# Bob scored 90
# Charlie scored 88
#
```

This loop iterates over both the `names` and `scores` lists simultaneously, pairing up each name with its corresponding score.

Using `zip()` in loops like this makes your code cleaner and easier to read when working with related data.

---

## Conclusion

The `zip()` function is a handy tool in Python that lets you combine multiple iterables into tuples, making it easier to work with related data. Whether you're pairing up items from lists, tuples, or strings, `zip()` simplifies your code and can be especially useful in loops.

With the examples in this article, you should now have a good understanding of how to use `zip()` in various scenarios.

If you found this explanation of Python's `zip()` function helpful, you might also enjoy more in-depth programming tutorials and concepts I cover on my [<FontIcon icon="fas fa-globe"/>blog](https://blog.theenthusiast.dev).

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python’s zip() Function Explained with Simple Examples",
  "desc": "The zip() function in Python is a neat tool that allows you to combine multiple lists or other iterables (like tuples, sets, or even strings) into one iterable of tuples. Think of it like a zipper on a jacket that brings two sides together. In this g...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/python-zip-function-explained-with-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
