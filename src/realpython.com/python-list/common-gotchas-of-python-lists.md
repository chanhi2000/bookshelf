---
lang: en-US
title: "Common Gotchas of Python Lists"
description: "Article(s) > (12/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (12/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Common Gotchas of Python Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/common-gotchas-of-python-lists.html
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
  url="https://realpython.com/python-list#common-gotchas-of-python-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

If you’re new to Python and are starting with lists, then you’ll want to be on the lookout for a few gotchas that can cause subtle issues in your code. Up to this point, you’ve learned what you need in order to understand most of these gotchas, so here’s a summary of the most common ones:

- **Confusing aliases of a list with copies**: This can cause issues because changes to one alias affect others. Take a look at the [Aliases of a List](/realpython.com/python-list/creating-copies-of-a-list.md#aliases-of-a-list) section for practical examples of this issue.
- **Forgetting that most `list` methods mutate the list in place and return `None` rather than a new list**: This commonly leads to issues when you assign the return value of a list method to a variable, thinking that you have a new list, but you really get `None`. Check out the [Reversing and Sorting Lists](/realpython.com/python-list/reversing-and-sorting-lists.md) section for practical examples of this gotcha.
- **Confusing `.append()` with `.extend()`**: This can cause issues because `.append()` adds a single item to the end of the list, while the `.extend()` method unpacks and adds multiple items. Have a look at the [**Growing and Shrinking Lists Dynamically**](/realpython.com/python-list/growing-and-shrinking-lists-dynamically.md) section for details on how these methods work.
- **Using an empty list as a default argument value in function definitions**: This can lead to unexpected behaviors because default argument values get defined when Python first parses the function.

You already know the explanation of the first three bullet points in this list. So, you only have to dive deeper into the last point. Why should you avoid using an empty list—or a list in general—as a default argument value? To answer this question, consider the following toy function:

```py
def append_to(item, target=[]):
    target.append(item)
    return target
```

This function appends `item` to the end of `target`, which defaults to an empty list. At first glance, it may seem that consecutive calls to `append_to()` will return single-item lists like in the following hypothetical example:

```py
append_to(1)
#
# [1]
append_to(2)
#
# [2]
append_to(3)
#
# [3]
```

But because Python defines the default argument value when it first parses the function and doesn’t overwrite it in every call, you’ll be working with the same list object in every call. Therefore, you don’t get the above behavior. Instead, you get the following:

```py
append_to(1)
#
# [1]
append_to(2)
#
# [1, 2]
append_to(3)
#
# [1, 2, 3]
```

The `target` list remembers the data between calls. This happens because you’re using the same list object that appears as the default value in the function’s definition.

To prevent this issue, you can use [**`None`**](/realpython.com/null-in-python.md) as the default value:

```py
def append_to(item, target=None):
    if target is None:
        target = []
    target.append(item)
    return target

append_to(1)
#
# [1]
append_to(2)
#
# [2]
append_to(3)
#
# [3]
```

Great! You’ve solved the issue. Now your function returns single-item lists as expected. That’s because the function doesn’t retain the [<VPIcon icon="fa-brands fa-wikipedia-w"/>state](https://en.wikipedia.org/wiki/State_(computer_science)) between calls.
