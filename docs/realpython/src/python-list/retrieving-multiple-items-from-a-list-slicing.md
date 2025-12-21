---
lang: en-US
title: "Retrieving Multiple Items From a List: Slicing"
description: "Article(s) > (4/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (4/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Retrieving Multiple Items From a List: Slicing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/retrieving-multiple-items-from-a-list-slicing.html
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
  url="https://realpython.com/python-list#retrieving-multiple-items-from-a-list-slicing"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Another common requirement when working with lists is to extract a portion, or [<VPIcon icon="fa-brands fa-python"/>slice](https://docs.python.org/3/glossary.html#term-slice), of a given list. You can do this with a [<VPIcon icon="fa-brands fa-python"/>slicing](https://docs.python.org/dev/whatsnew/2.3.html#extended-slices) operation, which has the following syntax:

```py
list_object[start:stop:step]
```

The `[start:stop:step]` part of this construct is known as the **slicing operator**. Its syntax consists of a pair of square brackets and three optional indices, `start`, `stop`, and `step`. The second colon is optional. You typically use it only in those cases where you need a `step` value different from `1`.

::: note

Slicing is an operation that’s common to all Python sequence data types, including lists, tuples, strings, ranges, and others.

:::

Here’s what the indices in the slicing operator mean:

- `start` specifies the index at which you want to start the slicing. The resulting slice includes the item at this index.
- `stop` specifies the index at which you want the slicing to stop extracting items. The resulting slice doesn’t include the item at this index.
- `step` provides an integer value representing how many items the slicing will skip on each step. The resulting slice won’t include the skipped items.

All the indices in the slicing operator are optional. They have the following default values:

| Index | Default Value |
| --- | --- |
| `start` | `0` |
| `stop` | `len(list_object)` |
| `step` | `1` |

The minimal working variation of the indexing operator is `[:]`. In this variation, you rely on the default values of all the indices and take advantage of the fact that the second colon is optional. The `[::]` variation of the slicing operator produces the same result as `[:]`. This time, you rely on the default value of the three indices.

::: note

Both of the above variations of the slicing operator (`[:]` and `[::]`) allow you to create a shallow copy of your target list. You’ll learn more about this topic in the [Shallow Copies of a List](/realpython.com/python-list/creating-copies-of-a-list.md#shallow-copies-of-a-list) section.

:::

Now it’s time for you to explore some examples of how slicing works:

```py
letters = ["A", "a", "B", "b", "C", "c", "D", "d"]

upper_letters = letters[0::2] # Or [::2]
upper_letters
# 
# ['A', 'B', 'C', 'D']

lower_letters = letters[1::2]
lower_letters
# 
# ['a', 'b', 'c', 'd']
```

In this example, you have a list of letters in uppercase and lowercase. You want to extract the uppercase letters into one list and the lowercase letters into another list. The `[0::2]` operator helps you with the first task, and `[1::2]` helps you with the second.

In both examples, you’ve set `step` to `2` because you want to retrieve every other letter from the original list. In the first slicing, you use a `start` of `0` because you want to start from the very beginning of the list. In the second slicing, you use a `start` of `1` because you need to jump over the first item and start extracting items from the second one.

You can use any variation of the slicing operator that fits your needs. In many situations, relying on the default indices is pretty helpful. In the examples above, you rely on the default value of `stop`, which is `len(list_object)`. This practice allows you to run the slicing all the way up to the last item of the target list.

Here are a few more examples of slicing:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

first_three = digits[:3]
first_three
#
# [0, 1, 2]

middle_four = digits[3:7]
middle_four
#
# [3, 4, 5, 6]

last_three = digits[-3:]
last_three
#
# [7, 8, 9]

every_other = digits[::2]
every_other
# 
# [0, 2, 4, 6, 8]

every_three = digits[::3]
every_three
# 
# [0, 3, 6, 9]
```

In these examples, the variable names reflect the portion of the list that you’re extracting in every slicing operation. As you can conclude, the slicing operator is pretty flexible and versatile. It even allows you to use negative indices.

Every slicing operation uses a `slice` object internally. The built-in [<VPIcon icon="fa-brands fa-python"/>`slice()`](https://docs.python.org/dev/library/functions.html#slice) function provides an alternative way to create `slice` objects that you can use to extract multiple items from a list. The signature of this built-in function is the following:

```py
slice(start, stop, step)
```

It takes three arguments with the same meaning as the indices in the slicing operator and returns a slice object equivalent to `[start:stop:step]`. To illustrate how `slice()` works, get back to the `letters` example and rewrite it using this function instead of the slicing operator. You’ll end up with something like the following:

```py
letters = ["A", "a", "B", "b", "C", "c", "D", "d"]

upper_letters = letters[slice(0, None, 2)]
upper_letters
# 
# ['A', 'B', 'C', 'D']

lower_letters = letters[slice(1, None, 2)]
lower_letters
#
# ['a', 'b', 'c', 'd']
```

Passing [**`None`**](/realpython.com/null-in-python.md) to any arguments of `slice()` tells the function that you want to rely on its internal default value, which is the same as the equivalent index’s default in the slicing operator. In these examples, you pass `None` to `stop`, which tells `slice()` that you want to use `len(letters)` as the value for `stop`.

As an exercise, you can write the `digits` examples using `slice()` instead of the slicing operator. Go ahead and give it a try! This practice will help you better understand the intricacies of slicing operations in Python.

Finally, it’s important to note that out-of-range values for `start` and `stop` don’t cause slicing expressions to [**raise**](/realpython.com/python-raise-exception.md) a [**`TypeError`**](/realpython.com/python-traceback.md#typeerror) exception. In general, you’ll observe the following behaviors:

- If `start` is before the beginning of the list, which can happen when you use negative indices, then Python will use `0` instead.
- If `start` is greater than `stop`, then the slicing will return an empty list.
- If `stop` is beyond the length of the list, then Python will use the length of the list instead.

Here are some examples that show these behaviors in action:

```py
colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
]

len(colors)
# 
# 7

colors[-8:]
# 
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

colors[8:]
# 
# []

colors[:8]
# 
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
```

In these examples, your color list has seven items, so `len(colors)` returns `7`. In the first example, you use a negative value for `start`. The first item of `colors` is at index `-7`. Because `-8 < -7`, Python replaces your `start` value with `0`, which results in a slice that contains the items from `0` to the end of the list.

::: note

In the examples above, you use only one colon in each slicing. In day-to-day coding, this is common practice. You’ll only use the second colon if you need to provide a `step` different from `1`. Here’s an example where `step` equals `2`:

```py
>>> colors[::2]
['red', 'yellow', 'blue', 'violet']
```

In this example, you set `step` to `2` because you need a copy of `colors` that contains every other color. The slicing jumps over two colors in every step and gives you back a list of four colors.

:::

In the second example, you use a `start` value that’s greater than the length of `colors`. Because there’s nothing to retrieve beyond the end of the list, Python returns an empty list. In the final example, you use a `stop` value that’s greater than the length of `colors`. In this case, Python retrieves all the items up to the end of the list.
