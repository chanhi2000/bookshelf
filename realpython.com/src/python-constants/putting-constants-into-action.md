---
lang: en-US
title: "Putting Constants Into Action"
description: "Article(s) > (3/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (3/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Putting Constants Into Action"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/putting-constants-into-action.html
date: 2025-01-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Constants: Improve Your Code's Maintainability",
  "desc": "In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability.",
  "link": "/realpython.com/python-constants/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Constants: Improve Your Code's Maintainability"
  desc="In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability."
  url="https://realpython.com/python-constants#putting-constants-into-action"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

So far, you’ve learned about constants and their role and importance in programming. You’ve also learned that Python doesn’t support strict constants. That’s why you can think of constants as variables that never change.

In the following sections, you’ll code examples of how valuable constants can be in your day-to-day coding adventure.

---

## Replacing Magic Numbers for Readability

In programming, the term [<VPIcon icon="fa-brands fa-wikipedia-w"/>magic number](https://en.wikipedia.org/wiki/Magic_number_(programming)) refers to any number that appears directly in your code without any explanation. It’s a value that comes out of the blue, making your code enigmatic and difficult to understand. Magic numbers also makes programs less readable and more difficult to maintain and update.

For example, say you have the following function:

```py
def compute_net_salary(hours):
    return hours * 35 * (1 - (0.04 + 0.1))
```

Can you tell up front what the meaning of each number in this computation is? Probably not. The different numbers in this function are magic numbers because you can’t reliably infer their meanings from the numbers themselves.

Check out the following [**refactored**](/realpython.com/python-refactoring.md) version of this function:

```py{1-3,7-8}
HOURLY_SALARY = 35
SOCIAL_SECURITY_TAX_RATE = 0.04
FEDERAL_TAX_RATE = 0.10 
def compute_net_salary(hours):
    return (
        hours
        * HOURLY_SALARY 
        * (1 - (SOCIAL_SECURITY_TAX_RATE + FEDERAL_TAX_RATE))
    )
```

With these minor updates, your function now reads like a charm. You and any other developers reading your code can surely tell what this function does because you’ve replaced the original magic numbers with appropriately named constants. The name of each constant clearly explains its corresponding meaning.

Every time you find yourself using a magic number, take the time to replace it with a constant. This constant’s name must be descriptive and unambiguously explain the meaning of the target magic number. This practice will automatically improve the readability of your code.

---

## Reusing Objects for Maintainability

Another everyday use case of constants is when you have a given value repeatedly appearing in different parts of your code. If you insert the concrete value into the code at every required place, then you’ll be in trouble if you ever need to change the value for any reason. In this situation, you’ll need to change the value in every place.

Changing the target value in multiple places at a time is error-prone. Even if you rely on your editor’s *Find and Replace* feature, you can leave some unchanged instances of the value, which can lead to unexpected bugs and weird behaviors later.

To prevent these annoying issues, you can replace the value with a properly named constant. This will allow you to set the value once and repeat it in as many locations as needed. If you ever need to change the constant’s value, then you just have to change it in a single place: the constant definition.

For example, say you’re writing a `Circle` [**class**](/realpython.com/python-classes.md), and you need methods to compute the circle’s area, perimeter, and so on. After a few coding minutes, you end up with the following class:

```py :collapsed-lines title="circle.py"
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius**2

    def perimeter(self):
        return 2 * 3.14 * self.radius

    def projected_volume(self):
        return 4/3 * 3.14 * self.radius**3

    def __repr__(self):
        return f"{self.__class__.__name__}(radius={self.radius})"
```

This example uncovers how the approximate value of Pi (`3.14`) has been written as a magic number in several methods of your `Circle` class. Why is this practice a problem? Say you need to increase the precision of Pi. Then you’ll have to manually change the value in at least three different places, which is tedious and error-prone, making your code difficult to maintain.

::: note

Generally, you don’t need to define Pi yourself. Python ships with some built-in constants, including Pi. You’ll see how to take advantage of it [later](/realpython.com/python-constants/exploring-other-constants-in-python.md#useful-string-and-math-constants).

:::

Using a named constant to store the value of Pi is an excellent approach to solving these issues. Here’s an enhanced version of the above code:

```py{1,7,9,11} :collapsed-lines title="circle.py"
PI = 3.14 
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return PI * self.radius**2 
    def perimeter(self):
        return 2 * PI * self.radius 
    def projected_volume(self):
        return 4/3 * PI * self.radius**3 
    def __repr__(self):
        return f"{self.__class__.__name__}(radius={self.radius})"
```

This version of `Circle` uses the global constant `PI` to replace the magic number. This code has several advantages compared to the original code. If you need to increase the precision of Pi, then you just have to update the `PI` constant’s value at the beginning of the file. This update will immediately reflect on the rest of the code without requiring any additional action on your side.

::: note

Constants shouldn’t change during your code’s execution. However, during development, you can change and tweak your constants according to your needs. Updating the precision of Pi in your `Circle` class is a good example of why you may need to change the value of a constant during the development of your code.

:::

Another advantage is that now your code is more readable and easier to understand. The constant’s name is self-explanatory and reflects the accepted math terminology.

Declaring a constant once and then reusing it several times, as you did in the above example, represents a significant maintainability improvement. If you ever have to update the constant’s value, then you’ll update it a single place rather than in multiple places, which implies way less effort and error risk.

---

## Providing Default Argument Values

Using named constants to provide default argument values to functions, methods, and classes is another common practice in Python. There are lots of examples of this practice in the Python [<VPIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html).

For example, the [**`zipfile`**](/realpython.com/python-zipfile.md) module provides tools to create, read, write, append, and list ZIP files. The most relevant class in this module is [<VPIcon icon="fa-brands fa-python"/>`ZipFile`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile). With `ZipFile`, you can manipulate your ZIP files efficiently and quickly.

The [**class constructor**](/realpython.com/python-class-constructor.md) of `ZipFile` takes an argument called `compression`, which allows you to select among a few available data compression methods. This argument is [**optional**](/realpython.com/python-optional-arguments.md) and has [<VPIcon icon="fa-brands fa-python"/>`ZIP_STORED`](https://docs.python.org/3/library/zipfile.html#zipfile.ZIP_STORED) as its default value, meaning that `ZipFile` doesn’t compress the input data by default.

In this example, `ZIP_STORED` is a constant defined in `zipfile`. The constant holds a numeric value for uncompressed data. You’ll also find other compression methods represented by named constants like [<VPIcon icon="fa-brands fa-python"/>`ZIP_DEFLATED`](https://docs.python.org/3/library/zipfile.html#zipfile.ZIP_DEFLATED) for the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Deflate](https://en.wikipedia.org/wiki/Deflate) compression algorithm, for example.

The `compression` argument in the `ZipFile` class constructor is a good example of using constants to provide default argument values when you have an argument that can take only a limited number of valid values.

Another example of when constants come in handy as default argument values is when you have several functions with a recurrent argument. Say that you’re developing an application that connects to a local [**SQLite**](/realpython.com/python-sqlite-sqlalchemy.md) database. Your app uses the following set of functions to manage the database:

```py
import sqlite3
from sqlite3 import Error

def create_database(db_path):
    # Code to create the initial database goes here...

def create_connection(db_path):
    # Code to create a database connection goes here...

def backup_database(db_path):
    # Code to back up the database goes here...
```

These functions perform different actions on your SQLite database. Note that all your functions share the `db_path` argument.

While you’re developing the application, you decide to provide a default database path to your functions so that you can quickly test them. In this case, you can directly use the path as a default value to the `db_path` argument.

However, it’s better to use a named constant to provide the default database path:

```py{4,5,8,11} :collapsed-lines
import sqlite3
from sqlite3 import Error

DEFAULT_DB_PATH = "/path/to/database.sqlite" 
def create_database(db_path=DEFAULT_DB_PATH):
    # Code to create the initial database goes here...

def create_connection(db_path=DEFAULT_DB_PATH):
    # Code to create a database connection goes here...

def backup_database(db_path=DEFAULT_DB_PATH):
    # Code to back up the database goes here...
```

This small update enables you to quickly test your app by targeting a sample database during development. It also improves the maintainability of your code because you can reuse this constant in other database-related functions that appear in future versions of your app.

Finally, you’ll find situations in which you want to pass an object with certain behavior to a class, method, or function. This practice is typically known as [**duck typing**](/realpython.com/python-type-checking.md#duck-typing) and is a fundamental principle in Python. Now say that your code will take care of providing a standard implementation of the required object. If your users want a custom object, then they should provide it themselves.

In this situation, you can use a constant to define the default object and then pass this constant as a default argument value to the target class, method, or function. Check out the following example of a hypothetical `FileReader` class:

```py :collapsed-lines title="file_handler.py"
from readers import DEFAULT_READER

class FileHandler:
    def __init__(self, file, reader=DEFAULT_READER):
        self._file = file
        self._reader = reader

    def read(self):
        self._reader.read(self._file)

    # FileHandler implementation goes here...
```

This class provides a way to manipulate different types of files. The `.read()` method uses the injected `reader` object to read the input `file` according to its specific format.

Here’s a toy implementation of a reader class:

```py :collapsed-lines title="readers.py"
class _DefaultReader:
    def read(self, file):
        with open(file, mode="r", encoding="utf-8") as file_obj:
            for line in file_obj:
                print(line)

DEFAULT_READER = _DefaultReader()
```

The `.read()` method in this example takes the path to a file, opens it, and prints its content to the screen line by line. This class will play the role of your default reader. The final step is to create a constant, `DEFAULT_READER`, to store an instance of your default reader. That’s it! You have a class that processes the input files and also a helper class that provides the default reader.

Your users can also code custom readers. For example, they can code readers for [**CSV**](/realpython.com/python-csv.md) and [**JSON**](/realpython.com/python-json/README.md) files. Once they’ve written a given reader, they can pass it into the `FileHandler` class constructor and use the resulting instance to handle files that use the reader’s target file format.
