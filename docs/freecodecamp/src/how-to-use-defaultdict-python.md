---
lang: en-US
title: "How to Use DefaultDict in Python"
description: "Article(s) > How to Use DefaultDict in Python"
icon: fa-brands fa-python
category: 
  - Python
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use DefaultDict in Python"
    - property: og:description
      content: "How to Use DefaultDict in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-defaultdict-python.html
prev: /programming/py/articles/README.md
date: 2024-05-02
isOriginal: false
author:
  - name: Gage Schaffer (@gage-schaffer-aa8624133)
    url: https://linkedin.com/in/gage-schaffer-aa8624133
cover: https://freecodecamp.org/news/content/images/2024/05/Add-To-Your-Python-Toolbox.png
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
  name="How to Use DefaultDict in Python"
  desc="Throughout my time working with datasets in Python, the dictionary has been my most used data structure. It’s versatile and easy to use. Need to count occurrences of a character? Use a dictionary! Want to create a list of soccer play..."
  url="https://freecodecamp.org/news/how-to-use-defaultdict-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/Add-To-Your-Python-Toolbox.png"/>

Throughout my time working with datasets in Python, the dictionary has been my most used data structure. It’s versatile and easy to use.

Need to count occurrences of a character? Use a dictionary!

Want to create a list of soccer players and associated stats? Dictionary!

They’re not fool-proof, though. In many tasks, you’ll run into KeyErrors galore when grokking data, which can be frustrating to deal with.

Dealing with these errors results in several extra lines of code. This reduces readability and increases complexity. If you’re handling a lot of data, this problem can spiral out of control.

The collections module addresses this problem of complexity. The collections module is a part of the Python standard library which contains a few awesome ways to wrangle data. The primary goal of the module is to make your code more readable and to simplify data processing with some extra types.

The one that I use the most is `defaultdict`, and we’ll explore some simple use cases for that today. To fully appreciate this data container, you should have a working knowledge of Python. More specifically, the regular dictionary type.

---

## How to Simplify Your Code with the DefaultDict

Before we get into today’s topic, let’s look at a situation. I want to create a dictionary that gives me the count of all the different letters in the word “Mississippi”. There are a lot of S’s and P’s, and I don’t have the time to count them all by hand.

Here’s how I would do that using a standard dictionary:

```py
letters = {}

for letter in "Mississippi":
    if letter not in letters:
        letters[letter] = 1
    else:
        letters[letter] +=1

print(letters)
#
# {'M': 1, 'i': 4, 's': 4, 'p': 2}
```

Simple enough. This program:

- Iterated through the string.
- Each iteration, it checked if the letter currently had an entry into our letters dictionary.
- If the letter is present, it adds one to the current value.
- If the letter is not present in the letters dictionary, it creates the entry and sets the initial value to 1. This example was pretty easy, but you can see the code complexity creeping in already. Let’s see how we can do better:

```py
from collections import defaultdict

letters = defaultdict(int)

for letter in "Mississippi":
    letters[letter] += 1

print(letters)
#
# defaultdict(<class 'int'>, {'M': 1, 'i': 4, 's': 4, 'p': 2})
```

You should notice that all the conditional statements are now gone. The code should be a little easier to read, but we still got the same result at the end of the program.

This is the benefit of `defaultdict`. Let’s break this data container down.

### Exploring the DefaultDict Data Container

The idea of a `defaultdict` is simple: if we attempt to access or change the value of a key that does not exist, it creates the entry in the dictionary with the given default value.

In the above example, we started with an empty defaultdict with no entries. For each unique letter we parsed, the dictionary created an entry. Since we used `int` as the default value, the value of the created entry was 0. After the dictionary created the entry, it added one to the entry.

At the end of the program, the letter count was output without conditionals or manual intervention. Very Pythonic.

### How to Set the Default in DefaultDict

The `defaultdict` data container takes a single argument during its initialization, named `default_factory`.

This `default_factory` argument is a function. When the program attempts to access an entry that does not exist, the `defaultdict` calls the `default_factory` without any arguments. So, for example, I can call a `defaultdict` with the function `int()` like this:

```py
d1 = defaultdict(int)
```

When I attempt to access an entry that does not exist, it’ll append that entry with the value of the `int` function, which is 0. 

```py
d1 = defaultdict(int)
d1[“Adding an entry!”]
print(d1)
#
# defaultdict(<class 'int'>, {'Adding an Entry!': 0})
```

---

## Exploring the Possibilities of DefaultDict

Now that you know the basic usage of `defaultdict`, we can explore the possibilities.

As I mentioned earlier, the `default_factory` is a function without arguments. This means we can use built-in data types as well as custom-defined functions – so, as long as they don’t take arguments.

Let’s go back to our Mississippi example. I want to know the actual index of where all the letter I’s are. I’m going to use a `defaultdict` with a list for the `default_factory` argument so we can track all the indices.

```py
from collections import defaultdict

my_word = "Mississippi"

d1 = defaultdict(list)

for index, letter in enumerate(my_word):
    if letter == "i":
        d1[letter].append(index)

print(d1)
#
# defaultdict(<class 'list'>, {'i': [1, 4, 7, 10]})
```

Awesome! I hand-checked this example, and it looks like it’s correct. There is the letter I located at index 1, 4, 7, and 10. This example looks a little different, but the idea is still the same. Here are the steps:

- I created a `defaultdict` with the `default_factory` argument of `list`.
- I iterated through the word “Mississippi”.
- If the iterated letter equals “i”, I access the dictionary with the key “i”.
- If that entry in the dictionary does not already exist, the `defaultdict` data container will create it for me and use an empty list as the value.
- I then use the list’s append method to add the index of the iterated letter.

Let’s explore some more. Since the `default_factory` takes a function as an argument, we can define our own – so as long as our custom function does not take an argument.

```py
from collections import defaultdict

def return_hello():
    return "Hello!"

d1 = defaultdict(return_hello)

d1[1]
d1[2]
d1[3]

print(d1)
#
# defaultdict(<function return_hello at 0x0000014FC5D28DC0>, {1: 'Hello!', 2: 'Hello!', 3: 'Hello!'})
```

I defined a function here to simply return “Hello!” and assigned it to the `default_factory` argument. Now, when we try to access entries in our dictionary that do not exist, the `defaultdict` calls my custom function to determine the default value!

---

## To Recap

In this guide, we went over the `defaultdict`, which is a data container in the built-in collections module from the Python Standard Library. It allows us to access entries in a dictionary that do not exist by creating them on the fly and assigning a default value.

We saw that the `defaultdict` takes a `default_factory` argument, which tells the dictionary the default value to give a key. These can be built-in functions, such as `int` or `list`, or can be custom-defined functions, such as our `return_hello` function above.

I hope you learned something today!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use DefaultDict in Python",
  "desc": "By Gage Schaffer Throughout my time working with datasets in Python, the dictionary has been my most used data structure. It’s versatile and easy to use. Need to count occurrences of a character? Use a dictionary! Want to create a list of soccer play...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-defaultdict-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
