---
lang: en-US
title: "How to Copy Objects in Python"
description: "Article(s) > How to Copy Objects in Python"
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
      content: "Article(s) > How to Copy Objects in Python"
    - property: og:description
      content: "How to Copy Objects in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-copy-objects-in-python.html
prev: /programming/py/articles/README.md
date: 2025-04-18
isOriginal: false
author:
  - name: Sara Jadhav
    url : https://freecodecamp.org/news/author/Eccentric-/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744913871670/5ed210bd-1d42-436e-907b-5b304010dbd7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Copy Objects in Python"
  desc="In this tutorial, you’ll learn about copying objects in Python using the copy module. We’ll cover how to use the copy module and when to use its copy() function and deepcopy() function, depending on the scenario. You’ll also learn which way of copyin..."
  url="https://freecodecamp.org/news/how-to-copy-objects-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744913871670/5ed210bd-1d42-436e-907b-5b304010dbd7.png"/>

In this tutorial, you’ll learn about copying objects in Python using the `copy` module. We’ll cover how to use the `copy` module and when to use its `copy()` function and `deepcopy()` function, depending on the scenario. You’ll also learn which way of copying is suitable for mutable and immutable objects.

By the end of this tutorial, you’ll understand:

- What is the `copy` module?
- The difference between copying and referencing.
- The difference between a deep copy and a shallow copy.
- How to actually shallow copy and deep copy objects in Python.
- The difference in referencing for immutable objects and mutable objects.

::: note Prerequisites

To get the most out of this tutorial, you need to have a basic understanding of the following:

1. Fundamental knowledge of programming and its terminology (such as objects, memory addresses, and so on)
2. Basic knowledge of Python programming, especially (for this tutorial),
    - Function `id()`: Outputs the memory address of the object passed as argument.
    - Data structures: Dictionaries and Lists.
    - Modules: importing and using them in the program. Basic understanding of methods and functions.

:::

---

## What is the `copy` Module?

The `copy` module is an in-built module in Python which is primarily used for copying objects in Python. it lets you make changes to a mutable object and save it as a different copy in memory. So basically, it makes a copy of the original object and stores it in a different memory location.

### Why can’t we just use the assignment operator (`=`) for copying objects?

If we use the assignment operator for the purpose of copying objects, it doesn’t actually **copy** the object - rather, it creates a binding between the object and the identifier. This means that if the original object points at memory location `x`, then the identifier in which we attempted to copy the object by using the `=` operator will also point at the same memory location, that is location `x`.

Now, this may create problems while manipulating various aspects of the data, as the changes that we make in the object will reflect in its binding as well.

Before jumping into the code, let’s first look at the difference between copying and referencing:

- **Copying:** Creating a copy refers to replicating the target object and storing it separately into the memory, making it an independent object with same data.
- **Referencing:** Referencing an object refers to pointing to the same memory address where the target object is stored. The referenced object is just another name (which we call as an ‘alias’ in programming) to call out the original object.

Let’s understand this with an example:

```py
# creating a dictionary object.
d1 = {
    'A' : 1,
    'B' : 2,
    'C' : 3
}

# using assignment operator to copy d1 in d2.
d2=d1

# printing both the dictionaries.
print(f'd1 = {d1} \nd2 = {d2}')
```

```plaintext title="output"
d1 = {'A': 1, 'B': 2, 'C': 3}

d2 = {'A': 1, 'B': 2, 'C': 3}
```

From above example, it may seem that the dictionary got copied in variable `d2` - but in reality, it’s just pointing to the object stored in variable `d1`. In this case, variable `d2` is just an alias or reference to the same object `d1`. We can prove this as follows:

```py
d1 = {
    'A' : 1,
    'B' : 2,
    'C' : 3
}

d2=d1

d1['D'] = 4 # added a key-value pair in d1

print(f'd1 = {d1} \nd2 = {d2}')
```

```plaintext title="output"
d1 = {'A': 1, 'B': 2, 'C': 3, 'D': 4}

d2 = {'A': 1, 'B': 2, 'C': 3, 'D': 4}
```

Now, in the above code, we appended a key-value pair in dictionary `d1` only - but the change is seen in dictionary `d2`, too. From this, it is evident that both the identifiers were referencing the same object.

From this we understand that, assignment operator `=` can be used for referencing the objects and we cannot use it for copying objects in true sense.

---

## How to Properly Copy Objects in Python

Since you now understand the difference between copying and referencing, let’s see how you can actually copy objects in Python. For this, we will make use of the `copy` module (mentioned earlier).

Now, before using this module, you should understand the difference between a deep copy and a shallow copy.

- **Deep copy**: While working with compound objects (also known as container objects or composite objects), deep copying means to create a copy of the inner objects as well as the outer object.
- **Shallow copy:** While working with compound objects, shallow copying refers to copying only the outer object and referencing the inner objects.

::: note 

Compound objects are objects that contain other objects inside them.

:::

Let’s better understand the difference between deep and shallow copies by actually implementing them in a program:

```py
import copy # importing copy module

# creating a composite object
categories = {
    'Fruits' : ['Apple', 'Banana', 'Mango'],
    'Flowers' : ['Rose', 'Sunflower', 'Tulip'],
}

# copying the object by using the copy() function of the copy module
categories_copy = copy.copy(categories)

print(f'Categories = {categories}\nCategories (Copied) = {categories_copy}')
```

```plaintext title="output"
Categories = {'Fruits': ['Apple', 'Banana', 'Mango'], 'Flowers': ['Rose', 'Sunflower', 'Tulip']}

Categories (Copied) = {'Fruits': ['Apple', 'Banana', 'Mango'], 'Flowers': ['Rose', 'Sunflower', 'Tulip']}
```

In the above example, we made a composite object called `categories` that contains lists as the inner objects. Then, we used the `copy()` function of the `copy` module to shallow copy the original object. Also, since the `copy` module is in-built, there is no need to install it manually! Now, both the objects appear similar.

Next, let’s modify the original object to see if the object is really copied or it is just referenced:

```py
import copy

categories = {
    'Fruits' : ['Apple', 'Banana', 'Mango'],
    'Flowers' : ['Rose', 'Sunflower', 'Tulip'],
}

categories_copy = copy.copy(categories)

# added a key-value pair in the original dictionary.
categories['Color'] = ['Red', 'Yellow', 'Blue']

print(f'Categories = {categories}\nCategories (Copied) = {categories_copy}')
```

```plaintext title="output"
Categories = {'Fruits': ['Apple', 'Banana', 'Mango'], 'Flowers': ['Rose', 'Sunflower', 'Tulip'], 'Color': ['Red', 'Yellow', 'Blue']}

Categories (Copied) = {'Fruits': ['Apple', 'Banana', 'Mango'], 'Flowers': ['Rose', 'Sunflower', 'Tulip']}
```

Here, we can see that even when we changed the original dictionary, the copied dictionary (stored in variable `categories_copy`) remained the same. This means that we successfully copied the dictionary to a different memory location.

But we shallow copied the dictionary. We know that, for a shallow copied composite object, the inner objects point at same memory location as that of the original composite object. You can see this in the following example:

```py
import copy

categories = {
    'Fruits' : ['Apple', 'Banana', 'Mango'],
    'Flowers' : ['Rose', 'Sunflower', 'Tulip'],
}

categories_copy = copy.copy(categories)

# checking if the inner object list 'Fruits' of both the dictionaries point to same memory address.
print(f"""
Do 'categories' and 'categories_copy' inner object share same memory address? 
--> {id(categories_copy['Fruits']) == id(categories['Fruits'])}
""")

# checking if the outer objects (dictionaries) point to same memory address.
print(f"""
Do 'categories' and 'categories_copy' outer object share same memory address? 
--> {id(categories_copy) == id(categories)}
""")
```

``` plaintext title="output"
Do 'categories' and 'categories_copy' inner object share same memory address?

--> True

Do 'categories' and 'categories_copy' outer object share same memory address?

--> False
```

In the above code, we used the same example as earlier. Then, we made use of the in-built function `id()` to extract and compare the memory addresses of both the dictionaries.

For inner objects, the memory address is the same. But outer objects are located at different locations in the memory. Thus, we can say that while shallow copying objects, the inner objects are only referenced, while the outer objects are copied to a separate memory address.

On the other hand, the `deepcopy()` function of the `copy` module copies the object completely (both inner and outer objects are stored at different memory locations). The following code shows how we can deep copy the objects within our code:

```py
import copy

categories = {
    'Fruits' : ['Apple', 'Banana', 'Mango'],
    'Flowers' : ['Rose', 'Sunflower', 'Tulip'],
}

# deep copying the dictionary
categories_copy = copy.deepcopy(categories)

print(f"""
Do 'categories' and 'categories_copy' inner object share same memory address? 
--> {id(categories_copy['Fruits']) == id(categories['Fruits'])}
""")

print(f"""
Do 'categories' and 'categories_copy' outer object share same memory address? 
--> {id(categories_copy) == id(categories)}
""")
```

```plaintext title="output"
Do 'categories' and 'categories_copy' inner object share same memory address?

--> False

Do 'categories' and 'categories_copy' outer object share same memory address?

--> False
```

In the code, we deep copied the dictionary by using the `deepcopy()` function. When we compared the memory addresses of the inner and the outer objects stored in both the identifiers, we can see that they are separately stored in the memory.

So you’ll use a shallow copy or a deep copy depending upon the situation.

For example, if you just want to copy the outer object and keep the nested object same for all, you should opt for a shallow copy. If you have defined a class to create students’ ID of grade X, then you might need to keep the `self.grade = X` for all the students. In such cases, you can just reference the nested object.

Also, for non-nested objects, the shallow copy method fulfills the purpose, as there are no nested objects and shallow copying completely copies the outer object to a different memory location.

On the other hand, if you want a complete, independent copy of the object, you should deep copy the object.

---

## More About Copying Objects in Python

You can use the `copy` module for both immutable and mutable objects. But for immutable objects, you can also use assignment operator `=` for copying objects.

Now, as I mentioned earlier, in this case too, the object is referenced when you use the `=` operator. But, when you mutate immutable objects, the mutated objects get stored at a different memory location. This makes the alias of the original object an independent object, pointing at the same memory address as earlier.

Let’s understand this with an example:

```py
str1 = "String" # created a string object

str2 = str1 # using '=' to reference the string stored in 'str1'

print(str2, str1, sep='\n') # printing the strings
```

```plaintext title="output"
String

String
```

Above, the variable `str2` referenced the string stored in variable `str1`. Basically, `str2` and `str1` point at same memory address and `str2` is just an alias of `str1`.

But if we go further and modify the string in `str1`, then `str1` starts to point at a new memory location (since a string is immutable, if it’s modified it gets stored at a different memory address). But `str2` will still point at the previous memory address, commonly fulfilling the purpose of copying the objects.

```py
str1 = "String"

str2 = str1

# printing memory addresses of both the variables before mutation.
print(f"""
Memory address of str1: {id(str1)}
Memory address of str2: {id(str2)}
""")

str1+='***' # concatenated the string '***' with str1. print(str2, str1, sep='\n')

# printing memory addresses of both the variables after mutation.
print(f"""
Memory address of str1: {id(str1)}
Memory address of str2: {id(str2)}
""")
```

```plaintext title="output"
Memory address of str1: 2652367074480

Memory address of str2: 2652367074480

String

String***

Memory address of str1: 2652367370736

Memory address of str2: 2652367074480
```

::: note

Memory addresses may vary on your device from the ones shown above.

:::

Now, in the above example, we first created a string object and referenced it in another variable, and printed the memory addresses of both the variables. Then, we modified the original string, and again, printed the memory addresses of both the variables.

In the output, we can see that the memory addresses of both the variables before mutation were the same. So you can see that both the variables were pointing at the same memory location. But after mutation, the variable `str1` started pointing at a different memory location, thus making the alias `str2` an independent object, which still points at the previous memory address.

To sum up, you can use the `=` operator for storing a copy of the original object if you plan to modify it further in the program.

---

## Summary

In this tutorial, you learned about copying objects in Python. Specifically, we talked about:

- How the assignment operator `=` is used for referencing and not copying.
- The built-in `copy` module, which provides functions that allow us to shallow copy and deep copy the objects in our program.
- The concept of shallow copy and deep copy, which are essential when copying compound objects.
- How a shallow copy copies the outer object and references the inner objects.
- How a deep copy copies both the outer object and the inner objects.
- How for immutable objects, the assignment operator works fine for copying the objects most of the time.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Copy Objects in Python",
  "desc": "In this tutorial, you’ll learn about copying objects in Python using the copy module. We’ll cover how to use the copy module and when to use its copy() function and deepcopy() function, depending on the scenario. You’ll also learn which way of copyin...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-copy-objects-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
