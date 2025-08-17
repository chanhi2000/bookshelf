---
lang: en-US
title: "Python Booleans: Use Truth Values in Your Code"
description: "Article(s) > Python Booleans: Use Truth Values in Your Code"
icon: fa-brands fa-python
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
      content: "Article(s) > Python Booleans: Use Truth Values in Your Code"
    - property: og:description
      content: "Python Booleans: Use Truth Values in Your Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-boolean.html
prev: /programming/py/articles/README.md
date: 2020-10-19
isOriginal: false
author:
  - name: Moshe Zadka
    url : https://realpython.com/team/mzadka/
cover: https://files.realpython.com/media/What-is-a-Python-Boolean_Watermarked.ba6413996cb3.jpg
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
  name="Python Booleans: Use Truth Values in Your Code"
  desc="In this tutorial, you'll learn about the built-in Python Boolean data type, which is used to represent the truth value of an expression. You'll see how to use Booleans to compare values, check for identity and membership, and control the flow of your programs with conditionals."
  url="https://realpython.com/python-boolean"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-a-Python-Boolean_Watermarked.ba6413996cb3.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Python Booleans: Leveraging the Values of Truth - Real Python"
  desc="In this course, you'll learn about the built-in Python Boolean data type, which is used to represent the truth value of an expression. You'll see how to use Booleans to compare values, check for identity and membership, and control the flow of your programs with conditionals."
  url="https://realpython.com/courses/booleans-leveraging-truth/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-a-Python-Boolean_Watermarked.ba6413996cb3.jpg"/>

:::

The **Python Boolean** type is one of Python’s [**built-in data types**](/realpython.com/python-data-types.md). It’s used to represent the truth value of an expression. For example, the expression `1 <= 2` is `True`, while the expression `0 == 1` is `False`. Understanding how Python Boolean values behave is important to programming well in Python.

::: info In this tutorial, you’ll learn how to

- Manipulate Boolean values with **Boolean operators**
- Convert Booleans to **other types**
- Convert other types to **Python Booleans**
- Use Python Booleans to write **efficient and readable** Python code

:::

---

## The Python Boolean Type

The Python Boolean type has only two possible values:

1. `True`
2. `False`

No other value will have `bool` as its type. You can check the type of `True` and `False` with the built-in `type()`:

```py
type(False)
# 
# <class 'bool'>
type(True)
# 
# <class 'bool'>
```

The `type()` of both `False` and `True` is `bool`.

The type `bool` is **built in**, meaning it’s always available in Python and doesn’t need to be imported. However, the name itself isn’t a keyword in the language. While the following is considered bad style, it’s possible to assign to the name `bool`:

```py
bool
# 
# <class 'bool'>
bool = "this is not a type"
bool
# 
# 'this is not a type'
```

Although technically possible, to avoid confusion it’s highly recommended that you don’t assign a different value to `bool`.

### Python Booleans as Keywords

Built-in names aren’t keywords. As far as the Python language is concerned, they’re regular [**variables**](/realpython.com/python-variables.md). If you assign to them, then you’ll override the built-in value.

In contrast, the names `True` and `False` are *not* built-ins. They’re **keywords**. Unlike many other [**Python keywords**](/realpython.com/python-keywords.md), `True` and `False` are Python **expressions**. Since they’re expressions, they can be used wherever other expressions, like `1 + 1`, can be used.

It’s possible to assign a Boolean value to variables, but it’s not possible to assign a value to `True`:

```py
a_true_alias = True
a_true_alias
# 
# True
True = 5
# 
#   File "<stdin>", line 1
# SyntaxError: cannot assign to True
```

Because `True` is a keyword, you can’t assign a value to it. The same rule applies to `False`:

```py
False = 5
# 
#   File "<stdin>", line 1
# SyntaxError: cannot assign to False
```

You can’t assign to `False` because it’s a keyword in Python. In this way, `True` and `False` behave like other numeric constants. For example, you can pass `1.5` to functions or assign it to variables. However, it’s impossible to assign a value to `1.5`. The statement `1.5 = 5` is not valid Python. Both `1.5 = 5` and `False = 5` are invalid Python code and will raise a [**`SyntaxError`**](/realpython.com/invalid-syntax-python.md) when parsed.

### Python Booleans as Numbers

Booleans are considered a **numeric** type in Python. This means they’re [**numbers**](/realpython.com/python-numbers.md) for all intents and purposes. In other words, you can apply arithmetic operations to Booleans, and you can also compare them to numbers:

```py
True == 1
# 
# True
False == 0
# 
# True
True + (False / True)
# 
# 1.0
```

There aren’t many uses for the numerical nature of Boolean values, but there’s one technique you may find helpful. Because `True` is equal to `1` and `False` is equal to `0`, adding Booleans together is a quick way to count the number of `True` values. This can come in handy when you need to count the number of items that satisfy a condition.

For example, if you want to analyze a verse in a [<FontIcon icon="fas fa-globe"/>classic children’s poem](https://poetryfoundation.org/poems/42916/jabberwocky) to see what fraction of lines contain the word `"the"`, then the fact that `True` is equal to `1` and `False` is equal to `0` can come in quite handy:

```py
lines="""
He took his vorpal sword in hand;
      Long time the manxome foe he sought—
So rested he by the Tumtum tree
      And stood awhile in thought.
""".splitlines()
sum("the" in line.lower() for line in lines) / len(lines)
# 
# 0.5
```

Summing all values in a [<FontIcon icon="fas fa-globe"/>generator expression](https://realpython.com/lessons/map-function-vs-generator-expressions/) like this lets you know how many times `True` appears in the generator. The number of times `True` is in the generator is equal to the number of lines that contain the word `"the"`, in a case-insensitive way. Dividing this number by the total number of lines gives you the ratio of matching lines to total lines.

To see why this works, you can break the above code into smaller parts:

```py
lines = """
He took his vorpal sword in hand;
      Long time the manxome foe he sought—
So rested he by the Tumtum tree
      And stood awhile in thought.
"""
line_list = lines.splitlines()
"the" in line_list[0]
# 
# False
"the" in line_list[1]
# 
# True
0 + False + True # Equivalent to 0 + 0 + 1
# 
# 1
["the" in line for line in line_list]
# 
# [False, True, True, False]
False + True + True + False
# 
# 2
len(line_list)
# 
# 4
2/4
# 
# 0.5
```

The `line_list` variable holds a list of lines. The first line doesn’t have the word `"the"` in it, so `"the" in line_list[0]` is `False`. In the second line, `"the"` does appear, so `"the" in line_list[1]` is `True`. Since Booleans are numbers, you can add them to numbers, and `0 + False + True` gives `1`.

Since `["the" in line for line in line_list]` is a list of four Booleans, you can add them together. When you add `False + True + True + False`, you get `2`. Now, if you divide that result by `4`, the length of the list, you get `0.5`. The word `"the"` appears in half the lines in the selection. This is a useful way to take advantage of the fact that Booleans are numbers.

---

## Boolean Operators

Boolean operators are those that take **Boolean inputs** and return **Boolean results**.

::: note

Later, you’ll see that these operators can be given other inputs and don’t always return Boolean results. For now, all examples will use Boolean inputs and results. You’ll see how this generalizes to other values in the section on [truthiness](#python-boolean-testing).

:::

Since Python Boolean values have only two possible options, `True` or `False`, it’s possible to specify the operators completely in terms of the results they assign to every possible input combination. These specifications are called **truth tables** since they’re displayed in a table.

As you’ll see later, in some situations, knowing one input to an operator is enough to determine its value. In those cases, the other input is *not* evaluated. This is called **short-circuit evaluation**.

The importance of short-circuit evaluation depends on the specific case. In some cases, it might have little effect on your program. In other cases, such as when it would be computationally intensive to evaluate expressions that don’t affect the result, it provides a significant performance benefit. In the most extreme cases, the correctness of your code can hinge on the short-circuit evaluation.

### Operators With No Inputs

You can think of `True` and `False` as Boolean operators that take no inputs. One of these operators always returns `True`, and the other always returns `False`.

Thinking of the Python Boolean values as operators is sometimes useful. For example, this approach helps to remind you that they’re not variables. For the same reason you can’t assign to `+`, it’s impossible to assign to `True` or `False`.

Only two Python Boolean values exist. A Boolean operator with no inputs always returns the same value. Because of this, `True` and `False` are the only two Boolean operators that don’t take inputs.

### The `not` Boolean Operator

The only Boolean operator with one argument is [**`not`**](/realpython.com/python-not-operator.md). It takes one argument and returns the opposite result: `False` for `True` and `True` for `False`. Here it is in a truth table:

| `A` | `not A` |
| --- | --- |
| `True` | `False` |
| `False` | `True` |

This table illustrates that `not` returns the opposite truth value of the argument. Since `not` takes only one argument, it doesn’t short-circuit. It evaluates its argument before returning its result:

```py
not True
# 
# False
not False
# 
# True
def print_and_true():
    print("I got called")
    return True

not print_and_true()
# 
# I got called
# False
```

The last line shows that `not` evaluates its input before returning `False`.

You might be wondering why there are no other Boolean operators that take a single argument. In order to understand why, you can look at a table that shows all theoretically possible Boolean operators that would take one argument:

| `A` | `not A` | Identity | Yes | No |
| --- | --- | --- | --- | --- |
| `True` | `False` | `True` | `True` | `False` |
| `False` | `True` | `False` | `True` | `False` |

There are only four possible operators with one argument. Other than `not`, the remaining three operators all have somewhat whimsical names since they don’t actually exist:

- `Identity`: Since this operator simply returns its input, you could just delete it from your code with no effect.
- `Yes`: This is a short-circuit operator since it doesn’t depend on its argument. You could just replace it with `True` and get the same result.
- `No`: This is another short-circuit operator since it doesn’t depend on its argument. You could just replace it with `False` and get the same result.

None of the other possible operators with one argument would be useful.

### The `and` Boolean Operator

The [**`and`**](/realpython.com/python-and-operator.md) operator takes two arguments. It evaluates to `False` unless both inputs are `True`. You could define the behavior of `and` with the following truth table:

| `A` | `B` | `A and B` |
| --- | --- | --- |
| `True` | `True` | `True` |
| `False` | `True` | `False` |
| `True` | `False` | `False` |
| `False` | `False` | `False` |

This table is verbose. However, it illustrates the same behavior as the description above. If `A` is `False`, then the value of `B` doesn’t matter. Because of this, `and` short-circuits if the first input is `False`. In other words, if the first input is `False`, then the second input isn’t evaluated.

The following code has a second input that has a [**side effect**](/realpython.com/defining-your-own-python-function.md#side-effects), printing, in order to provide a concrete example:

```py
def print_and_return(x):
    print(f"I am returning {x}")
    return x

True and print_and_return(True)
# 
# I am returning True
True
True and print_and_return(False)
# 
# I am returning False
# False
False and print_and_return(True)
# 
# False
False and print_and_return(False)
# 
# False
```

In the last two cases, nothing is printed. The function isn’t called since calling it isn’t necessary to determine the value of the `and` operator. Being aware of short-circuits is important when expressions have a side effect. In the last two examples, the short-circuit evaluation prevents the printing side effect from happening.

One example in which this behavior can be crucial is in code that might raise exceptions:

```py
def inverse_and_true(n):
    1 // n
    return True

inverse_and_true(5)
# 
# True
inverse_and_true(0)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 2, in inverse_and_true
# ZeroDivisionError: integer division or modulo by zero
False and inverse_and_true(0)
# 
# False
```

The function `inverse_and_true()` is admittedly silly, and many [**linters**](/realpython.com/python-code-quality.md) would warn about the expression `1 // n` being useless. It does serve the purpose of neatly failing when given `0` as a parameter since division by `0` is invalid. However, the last line doesn’t raise an exception. Because of short-circuit evaluation, the function isn’t called, the division by `0` doesn’t happen, and no exception is raised.

In contrast, `True and inverse_and_true(0)` would raise an exception. In that case, the value of the second input would be needed for the result of `and`. Once the second input was evaluated, `inverse_and_true(0)` would be called, it would divide by `0`, and an exception would be raised.

### The `or` Boolean Operator

The value of the [**`or` operator**](/realpython.com/python-or-operator.md) is `True` unless both of its inputs are `False`. The `or` operator could also be defined by the following truth table:

| `A` | `B` | `A or B` |
| --- | --- | --- |
| `True` | `True` | `True` |
| `False` | `True` | `True` |
| `True` | `False` | `True` |
| `False` | `False` | `False` |

This table is verbose, but it has the same meaning as the explanation above.

When used informally, the word *or* can have one of two meanings:

- The [<FontIcon icon="fa-brands fa-wikipedia-w"/>**exclusive _or_**](https://en.wikipedia.org/wiki/Exclusive_or) is how *or* is used in the phrase “You can file for an extension or submit your homework on time.” In this case, you can’t both file for an extension and submit your homework on time.
- The [<FontIcon icon="fa-brands fa-wikipedia-w"/>**inclusive _or_**](https://en.wikipedia.org/wiki/Logical_disjunction) is sometimes indicated by using the conjunction *and/or*. For example, “If you do well on this task, then you can get a raise and/or a promotion” means that you might get both a raise and a promotion.

When Python interprets the keyword `or`, it does so using the inclusive *or*. If both inputs are `True`, then the result of `or` is `True`.

Because it uses an inclusive *or*, the `or` operator in Python also uses short-circuit evaluation. If the first argument is `True`, then the result is `True`, and there is no need to evaluate the second argument. The following examples demonstrate the short-circuit evaluation of `or`:

```py
def print_and_true():
    print("print_and_true called")
    return True

True or print_and_true()
# 
# True
False or print_and_true()
# 
# print_and_true called
# True
```

The second input isn’t evaluated by `or` unless the first one is `False`. In practice, the short-circuit evaluation of `or` is used much less often than that of `and`. However, it’s important to keep this behavior in mind when reading code.

### Other Boolean Operators

The mathematical theory of Boolean logic determines that no other operators beyond `not`, `and`, and `or` are needed. All other operators on two inputs can be specified in terms of these three operators. All operators on three or more inputs can be specified in terms of operators of two inputs.

In fact, even having both `or` and `and` is redundant. The `and` operator can be defined in terms of `not` and `or`, and the `or` operator can be defined in terms of `not` and `and`. However, `and` and `or` are so useful that all programming languages have both.

There are sixteen possible two-input Boolean operators. Except for `and` and `or`, they are rarely needed in practice. Because of this, `True`, `False`, `not`, `and`, and `or` are the only built-in Python Boolean operators.

---

## Comparison Operators

Some of [**Python’s operators**](/realpython.com/python-operators-expressions.md) check whether a relationship holds between two objects. Since the relationship either holds or doesn’t hold, these operators, called **comparison operators**, always return Boolean values.

Comparison operators are the most common source of Boolean values.

### Equality and Inequality

The most common comparison operators are the **equality operator (`==`)** and the **inequality operator (`!=`)**. It’s almost impossible to write any meaningful amount of Python code without using at least one of those operators.

The equality operator (`==`) is one of the most used operators in Python code. You often need to compare either an unknown result with a known result or two unknown results against each other. Some functions return values that need to be compared against a [<FontIcon icon="fa-brands fa-wikipedia-w"/>sentinel](https://en.wikipedia.org/wiki/Sentinel_value) to see if some edge condition has been detected. Sometimes you need to compare the results from two functions against each other.

The equality operator is often used to compare numbers:

```py
1 == 1
# 
# True
1 == 1.0
# 
# True
1 == 2
# 
# False
```

You may have used [**equality operators**](/realpython.com/python-is-identity-vs-equality.md) before. They’re some of the most common operators in Python. For all built-in Python objects, and for most third-party classes, they return a **Boolean** value: `True` or `False`.

::: note

The Python language doesn’t enforce that `==` and `!=` return Booleans. Libraries like [**NumPy**](/realpython.com/numpy-array-programming.md) and [**pandas**](/realpython.com/pandas-python-explore-dataset.md) return other values.

:::

Second only to the equality operator in popularity is the **inequality** operator (`!=`). It returns `True` if the arguments aren’t equal and `False` if they are. The examples are similarly wide-ranging. Many [**unit tests**](/realpython.com/python-testing.md) check that the value isn’t equal to a specific invalid value. A web client might check that the error code isn’t `404 Not Found` before trying an alternative.

Here are two examples of the Python inequality operator in use:

```py
1 != 2
# 
# True
1 != (1 + 0.0)
# 
# False
```

Perhaps the most surprising thing about the Python inequality operator is the fact that it exists in the first place. After all, you could achieve the same result as `1 != 2` with `not (1 == 2)`. Python usually avoids extra syntax, and especially extra core operators, for things easily achievable by other means.

However, inequality is used so often that it was deemed worthwhile to have a dedicated operator for it. In old versions of Python, in the `1.x` series, there were actually *two* different syntaxes.

As an April Fools’ joke, Python still supports an alternative syntax for inequality with the right `__future__` import:

```py
from __future__ import barry_as_FLUFL
1 <> 2
# 
# True
```

This *should never be used* in any code meant for real use. It could come in handy for your next Python trivia night, however.

### Order Comparisons

Another set of test operators are the **order** comparison operators. There are four order comparison operators that can be categorized by two qualities:

- **Direction**: Is it less than or greater than?
- **Strictness**: Is equality allowed or not?

Since the two choices are independent, you get `2 * 2 == 4` order comparison operators. All four are listed in this table:

|  | Less than | Greater than |
| --- | :---: | :---: |
| Strict | `<` | `>` |
| Not strict | `<=` | `>=` |

There are two options for direction and two options for strictness. This results in total of four order comparison operators.

The order comparison operators aren’t defined for all objects. Some objects don’t have a meaningful order. Even though [**lists and tuples**](/realpython.com/python-lists-tuples.md) are ordered **lexicographically**, [<FontIcon icon="fas fa-globe"/>dictionaries](https://realpython.com/courses/dictionaries-python/) don’t have a meaningful order:

```py
{1: 3} < {2: 4}
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: '<' not supported between instances of 'dict' and 'dict'
```

It’s not obvious how dictionaries should be ordered. As per the [**Zen of Python**](/realpython.com/zen-of-python.md), in the face of ambiguity, Python refuses to guess.

While [**strings**](/realpython.com/python-strings.md) and [**integers**](/realpython.com/python-numbers.md#integers) are ordered separately, intertype comparisons aren’t supported:

```py
1 <= "1"
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: '<=' not supported between instances of 'int' and 'str'
```

Again, since there’s no obvious way to define order, Python refuses to compare them. This is similar to the addition operator (`+`). Though you can add strings to strings and integers to integers, adding strings to integers raises an exception.

When the order comparison operators *are* defined, in general they return a Boolean.

::: note

Python doesn’t enforce that comparison operators return Booleans. While all built-in Python objects, and most third-party objects, return Booleans when compared, there are exceptions.

For example, comparison operators between NumPy arrays or [**pandas DataFrames**](/realpython.com/pandas-dataframe.md) return arrays and DataFrames. You’ll see more about the interaction of NumPy and Boolean values later in this tutorial.

:::

Comparing numbers in Python is a common way of checking against boundary conditions. Note that `<` doesn’t allow equality, while `<=` does:

```py
1 <= 1
# 
# True
1 < 1
# 
# False
2 > 3
# 
# False
2 >= 2
# 
# True
```

Programmers often use comparison operators without realizing that they return a Python Boolean value.

### The `is` Operator

The [<FontIcon icon="fas fa-globe"/>`is` operator](https://realpython.com/lessons/is-operator/) checks for **object identity**. In other words, `x is y` evaluates to `True` only when `x` and `y` evaluate to the same object. The `is` operator has an opposite, the `is not` operator.

A typical usage of `is` and `is not` is to compare lists for identity:

```py
>>> x = []
>>> y = []
>>> x is x
True
>>> x is not x
False
>>> x is y
False
>>> x is not y
True
```

Even though `x == y`, they are not the same object. The `is not` operator always returns the opposite of `is`. There’s no difference between the expression `x is not y` and the expression `not (x is y)` except for readability.

Keep in mind that the above examples show the `is` operator used only with lists. The behavior of the `is` operator on [<FontIcon icon="fas fa-globe"/>immutable](https://realpython.com/courses/immutability-python/) objects like numbers and strings is [**more complicated**](/realpython.com/python-is-identity-vs-equality.md#when-only-some-integers-are-interned).

### The `in` Operator

The [**`in` operator**](/realpython.com/python-in-operator.md) checks for **membership**. An object can define what it considers members. Most sequences, such as lists, consider their elements to be members:

```py
small_even = [2, 4]
1 in small_even
#
#False
2 in small_even
# 
# True
10 in small_even
# 
# False
```

Since `2` is an element of the list, `2 in small_even` returns `True`. Since `1` and `10` aren’t in the list, the other expressions return `False`. In all cases, the `in` operator returns a Boolean value.

Since strings are sequences of characters, you might expect them to also check for membership. In other words, characters that are members of the string will return `True` for `in`, while those that don’t will return `False`:

```py
"e" in "hello beautiful world"
# 
# True
"x" in "hello beautiful world"
# 
# False
```

Since `"e"` is the second element of the string, the first example returns `True`. Since `x` doesn’t appear in the string, the second example returns `False`. However, along with individual characters, substrings are also considered to be members of a string:

```py
"beautiful" in "hello beautiful world"
# 
# True
"belle" in "hello beautiful world"
# 
# False
```

Since `"beautiful"` is a substring, the `in` operator returns `True`. Since `"belle"` is not a substring, the `in` operator returns `False`. This is despite the fact that every individual letter in `"belle"` is a member of the string.

Like the operators `is` and `==`, the `in` operator also has an opposite, [**`not in`**](/realpython.com/python-in-operator.md#pythons-not-in-operator). You can use `not in` to confirm that an element is not a member of an object.

### Chaining Comparison Operators

Comparison operators can form **chains**. You can create comparison operator chains by separating expressions with comparison operators to form a larger expression:

```py
1 < 2 < 3
# 
# True
```

The expression `1 < 2 < 3` is a comparison operator chain. It has expressions separated by comparison operators. The result is `True` because both parts of the chain are `True`. You can break up the chain to see how it works:

```py
1 < 2 and 2 < 3
# 
# True
```

Since `1 < 2` returns `True` and `2 < 3` returns `True`, `and` returns `True`. A comparison chain is equivalent to using `and` on all its links. In this case, since `True and True` returns `True`, the result of the whole chain is `True`. This means that if any of the links are `False`, then the whole chain is `False`:

```py
1 < 3 < 2
# 
# False
```

This comparison chain returns `False` since not all of its links are `True`. Because comparison chains are an implicit `and` operator, if even one link is `False`, then the whole chain is `False`. You can break up the chain to see how it works:

```py
>>> 1 < 3 and 3 < 2
False
```

In this case, the parts of the chain evaluate to the following Booleans:

- `1 < 3` is `True`
- `3 < 2` is `False`

This means that one of the results is `True` and one is `False`. Since `True and False` is equal to `False`, the value of the entire chain is `False`.

You can mix types and operations in a comparison chain as long as the types can be compared:

```py
1 < 2 < 1
# 
# False
1 == 1.0 < 0.5
# 
# False
1 == 1.0 == True
# 
# True
1 < 3 > 2
# 
# True
1 < 2 < 3 < 4 < 5
# 
# True
```

The operators don’t have to be all the same. Not even the types have to be all the same. In the examples above, you have three numeric types:

1. `int`
2. `float`
3. `bool`

These are three different numeric types, but you can compare objects of different numeric types without issue.

#### Short-Circuit Chain Evaluation

If chains use an implicit `and`, then chains must also short-circuit. This is important because even in cases where an order comparison isn’t defined, it’s possible for a chain to return `False`:

```py
2 < "2"
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: '<' not supported between instances of 'int' and 'str'
3 < 2 < "2"
# 
# False
```

Even though Python can’t order-compare integers and strings numbers, `3 < 2 < "2"` evaluates to `False` because it doesn’t evaluate the second comparison. In this case, the short-circuit evaluation prevents another side effect: raising an exception.

Short-circuit evaluation of comparison chains can prevent other exceptions:

```py
3 < 2 < (1//0)
# 
# False
```

Dividing `1` by `0` would have raised a `ZeroDivisionError`. However, because of the short-circuit evaluation, Python doesn’t evaluate the invalid division. This means that Python skips evaluating not only the comparison but also the inputs to the comparison.

Another aspect that is important to understand about comparison chains is that when Python *does* evaluate an element in the chain, it evaluates it only once:

```py
def foo():
    print("I'm foo")
    return 1

0 < foo() < 2
# 
# I'm foo
# True
(0 < foo()) and (foo() < 2)
# 
# I'm foo
# I'm foo
# True
```

Because the middle elements are evaluated only once, it’s not always safe to refactor `x < y < z` to `(x < y) and (y < z)`. Although the chain behaves like `and` in its short-circuit evaluation, it evaluates all values, including the intermediate ones, only once.

Chains are especially useful for **range checks**, which confirm that a value falls within a given range. For example, in a daily invoice that includes the number hours worked, you might do the following:

```py
hours_worked = 5
1 <= hours_worked <= 25
# 
# True
```

If there are `0` hours worked, then there’s no reason to send the invoice. Accounting for Daylight Saving Time, the maximum number of hours in a day is `25`. The above range check confirms that the number of hours worked in a day falls within the allowable range.

#### Mixing Operators and Chaining

Until now, all our examples involved `==`, `!=`, and the order comparisons. However, you can chain all of Python’s comparison operators. This can lead to surprising behavior:

```py
a = 0
a is a < 1
# 
# True
(a is a) < 1
# 
# False
a is (a < 1)
# 
# False
```

Because `a is a < 1` is a comparison chain, it evaluates to `True`. You can break the chain into its parts:

- The expression `a is a` is `True`, as it would be for any value evaluated against itself.
- The expression `a < 1` is `True` since `0` is less than `1`.

Since both parts are `True`, the chain evaluates to `True`.

However, people who are used to other operators in Python may assume that, like other expressions involving multiple operators such as `1 + 2 * 3`, Python inserts parentheses into to the expression. However, neither way of inserting parenthesis will evaluate to `True`.

You can see why both evaluate to `False` if you break up the expressions. If you break up the first expression, you get the following:

```py
a = 0
a is a
# 
# True
True == 1
# 
# True
(a is a) < 1
# 
# False
```

You can see above that `a is a` returns `True`, as it would for any value. This means that `(a is a) < 1` is the same as `True < 1`. Booleans are numeric types, and `True` is equal to `1`. So `True < 1` is the same as `1 < 1`. Since this is a **strict** inequality, and `1 == 1`, it returns False.

The second expression works differently:

```py
a = 0
# 
# False
a < 1
# 
# True
0 is True
# 
# <stdin>:1: SyntaxWarning: "is" with a literal. Did you mean "=="?
# False
```

Since `0` is less than `1`, `a < 1` returns `True`. Since `0 != True`, then it can’t be the case that `0 is True`.

::: note

Don’t take the above `SyntaxWarning` lightly. Using `is` on numbers can be [**confusing**](/realpython.com/python-is-identity-vs-equality.md#when-only-some-integers-are-interned). However, specifically for cases in which you know the numbers are *not* equal, you can know that `is` will also return `False`. While this example is correct, it’s not an example of good Python coding style.

:::

The most important lesson to draw from this is that chaining comparisons with `is` usually isn’t a good idea. It confuses the reader and probably isn’t necessary.

Like `is`, the `in` operator and its opposite, `not in`, can often yield surprising results when chained:

```py
"b" in "aba" in "cabad" < "cabae"
# 
# True
```

To maximize the confusion, this example chains comparisons with different operators and uses `in` with strings to check for substrings. Again, this is not an example of well-written code! However, it’s important to be able to read this example and understand why it returns `True`.

Finally, you can chain `is not` with `not in`:

```py
greeting = "hello"
quality = "good"
end_greeting = "farewell"
greeting is not quality not in end_greeting
# 
# True
```

Note that the order of `not` in the two operators isn’t the same! The negative operators are `is not` and `not in`. This corresponds with the regular usage in English, but it’s easy to make a mistake when modifying code.

---

## Python Boolean Testing

The most popular use for a Python Boolean is in an [**`if` statement**](/realpython.com/python-conditional-statements.md). This statement will execute if the value is `True`:

```py
1 == 1
# 
# True
if 1 == 1:
    print("yep")
# 
# yep
1 == 2
# 
# False
if 1 == 2:
    print("yep")

```

`print()` is called only when the expression evaluates to `True`. However, in Python you can give any value to `if`. The values that `if` considers `True` are called [**truthy**](/realpython.com/python-operators-expressions.md#evaluation-of-non-boolean-values-in-boolean-context), and the values that `if` considers `False` are called [**falsy**](/realpython.com/python-operators-expressions.md#evaluation-of-non-boolean-values-in-boolean-context).

`if` decides which values are truthy and which are falsy by internally calling the built-in `bool()`. You’ve already encountered `bool()` as the Python Boolean type. When called, it converts objects to Booleans.

### `None` as a Boolean Value

The singleton object `None` is always falsy:

```py
bool(None)
# 
# False
```

This is often useful in `if` statements that check for a sentinel value. However, it’s usually better to explicitly check for identity with `is None`. Sometimes `None` can be useful in combination with short-circuit evaluation in order to have a default.

For example, you can use `or` to substitute `None` with an empty list:

```py
def add_num_and_len(num, things=None):
    return num + len(things or [])

add_num_and_len(5, [1, 2, 3])
# 
# 8
add_num_and_len(6)
# 
# 6
```

In this example, the list won’t be created if `things` is a non-empty list since `or` will short-circuit before it evaluates `[]`.

### Numbers as Boolean Values

For numbers, `bool(x)` is equivalent to `x != 0`. This means the only falsy integer is `0`:

```py
bool(3), bool(-5), bool(0)
# 
# (True, True, False)
```

All nonzero integers are truthy. This is also true for [**floating-point numbers**](/realpython.com/python-numbers.md#floating-point-numbers), including special floating-point numbers like [**infinity**](/realpython.com/python-math-module.md#infinity) and [**Not a Number (NaN)**](/realpython.com/python-math-module.md#not-a-number-nan):

```py
import math
[bool(x) for x in [0, 1.2, 0.5, math.inf, math.nan]]
# 
# [False, True, True, True, True]
```

Since infinity and NaN aren’t equal to `0`, they’re truthy.

Equality and inequality comparisons on floating-point numbers are subtle operations. Since doing `bool(x)` is equivalent to `x != 0`, this can lead to surprising results for floating-point numbers:

```py
bool(0.1 + 0.2 + (-0.2) + (-0.1))
# 
# True
0.1 + 0.2 + (-0.2) + (-0.1)
# 
# 2.7755575615628914e-17
```

Floating-point number computations can be inexact. Because of that, the results of `bool()` on floating-point numbers can be surprising.

Python has more numeric types in the standard library, and they follow the same rules. For non-built-in numeric types, `bool(x)` is also equivalent to `x != 0`. The `fractions` module is in the standard library. Like other numeric types, the only falsy fraction is `0/1`:

```py
import fractions
bool(fractions.Fraction("1/2")), bool(fractions.Fraction("0/1"))
# 
# (True, False)
```

As with integers and floating-point numbers, fractions are false only when they’re equal to `0`.

The `decimal` module is also in the standard library. Decimals are similarly falsy only when they’re equal to `0`:

```py
import decimal, math
with decimal.localcontext(decimal.Context(prec=3)) as ctx:
    bool(ctx.create_decimal(math.pi) - ctx.create_decimal(22)/7)

# 
# False
with decimal.localcontext(decimal.Context(prec=4)) as ctx:
    bool(ctx.create_decimal(math.pi) - ctx.create_decimal(22)/7)

# 
# True
```

The number `22 / 7` is an approximation of Pi to two decimal places. This fact was discussed by [<FontIcon icon="fas fa-globe"/>Archimedes in the 3rd century BCE](https://archive.org/details/worksofarchimede029517mbp/page/n281/mode/2up). When the difference between `22 / 7` and Pi is computed with this precision, the result is falsy. When the difference is computed with higher precision, the difference isn’t equal to `0`, and so is truthy.

### Sequences as Boolean Values

In general, objects that have a [**`len()`**](/realpython.com/len-python-function.md) will be falsy when the result of `len()` is `0`. It doesn’t matter if they’re lists, tuples, sets, strings, or byte strings:

```py
bool([1]), bool([])
# 
# (True, False)
bool((1,2)), bool(())
# 
# (True, False)
bool({1,2,3}), bool(set())
# 
# (True, False)
bool({1: 2}), bool({})
# 
# (True, False)
bool("hello"), bool("")
# 
# (True, False)
bool(b"xyz"), bool(b"")
# 
# (True, False)
```

All built-in Python objects that have a length follow this rule. Later, you’ll see some exceptions to this rule for non-built-in objects.

### Other Types as Boolean Values

Unless types have a `len()` or specifically define whether they’re truthy or falsy, they’re always truthy. This is true for built-in as well as user-defined types. In particular, functions are always truthy:

```py
def func():
    pass

bool(func)
# 
# True
```

Methods are always truthy, too. You might encounter this if a parenthesis is missing when you call a function or method:

```py
import datetime
def before_noon():
    return datetime.datetime.now().hour < 12

def greet():
    if before_noon:
            print("Good morning!")
    else:
            print("Good evening!")

greet()
# 
# Good morning!
datetime.datetime.now().hour
# 
# 20
```

This can happen as a result of a forgotten parenthesis or misleading documentation that doesn’t mention that you need to call the function. If you expect a Python Boolean value but have a function that returns a Boolean value, then it will always be truthy.

By default, user-defined types are always truthy:

```py
class Dummy:
    pass

bool(Dummy())
# 
# True
```

Creating an empty class makes every object of that class truthy. All objects are truthy unless [**special methods**](/realpython.com/python-classes.md#special-methods-and-protocols) are defined. If you want to make some instances of your class falsy, you can define `.__bool__()`:

```py
class BoolLike:
    am_i_truthy = False
    def __bool__(self):
            return self.am_i_truthy

x = BoolLike()
bool(x)
# 
# False
x.am_i_truthy = True
bool(x)
# 
# True
```

You can also use `.__bool__()` to make an object neither truthy nor falsy:

```py
class ExcludedMiddle:
    def __bool__(self):
            raise ValueError("neither")

x = ExcludedMiddle()
bool(x)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 3, in __bool__
# ValueError: neither

if x:
    print("x is truthy")
else:
    print("x is falsy")
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 3, in __bool__
# ValueError: neither
```

The `if` statement also uses `.__bool__()`. It does so to evaluate whether the object is truthy or falsy, which determines which branch to execute.

If you define the `__len__` method on a class, then its instances have a `len()`. In that case, the Boolean value of the instances will be falsy exactly when their length is `0`:

```py
class DummyContainer:
    my_length = 0
    def __len__(self):
        return self.my_length

x = DummyContainer()
bool(x)
# 
# False
x.my_length = 5
bool(x)
# 
# True
```

In this example, `len(x)` would return `0` before the assignment and `5` afterward. The reverse, however, is not true. Defining `.__bool__()` doesn’t give instances a length:

```py
class AlwaysTrue:
    def __bool__(self):
        return True

class AlwaysFalse:
    def __bool__(self):
        return False

bool(AlwaysTrue()), bool(AlwaysFalse())
# 
# (True, False)

len(AlwaysTrue())
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: object of type 'AlwaysTrue' has no len()

len(AlwaysFalse())
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: object of type 'AlwaysFalse' has no len()
```

Defining `.__bool__()` doesn’t make instances of either class have a `len()`. When both `.__bool__()` and `.__len__()` are defined, `.__bool__()` takes precedence:

```py
class BooleanContainer:
    def __len__(self):
        return 100
    def __bool__(self):
        return False

x=BooleanContainer()
len(x)
# 
# 100
bool(x)
# 
# False
```

Even though `x` has a length of `100`, it’s still falsy.

### Example: NumPy Arrays

The above example may seem like something that only happens when you write a class intended to demonstrate edge cases in Python. However, it’s possible to get similar results using one of the most popular libraries on [**PyPI**](/realpython.com/what-is-pip.md): [<FontIcon icon="iconfont icon-numpy"/>NumPy](https://numpy.org/).

[**Arrays**](/realpython.com/numpy-array-programming.md), like numbers, are falsy or truthy depending on how they compare to `0`:

```py
from numpy import array
x = array([0])
len(x)
# 
# 1
bool(x)
# 
# False
```

Even though `x` has a length of `1`, it’s still falsy because its value is `0`.

When arrays have more than one element, some elements might be falsy and some might be truthy. In those cases, NumPy will raise an exception:

```py
from numpy import array
import textwrap
y=array([0, 1])
try:
    bool(y)
except ValueError as exc:
    print("\n".join(textwrap.wrap(str(exc))))

# 
# The truth value of an array with more than one element is ambiguous.
# Use a.any() or a.all()
```

The exception is so wordy that in order to make it easy to read, the code uses text processing to wrap the lines.

An even more interesting edge case involves empty arrays. You might wonder if those are falsy like other sequences or truthy because they’re not equal to `0`. As you saw above, those aren’t the only two possible answers. The arrays could also refuse to have a Boolean value.

Interestingly, none of these options is entirely true:

```py
bool(array([]))
 
<stdin>:1: DeprecationWarning: The truth value of an empty array is ambiguous.
Returning False, but in future this will result in an error.
Use `array.size > 0` to check that an array is not empty.
False
```

While empty arrays are *currently* falsy, relying on this behavior is dangerous. In some future NumPy version, this will raise an exception.

### Operators and Functions

There are a few more places in Python where Boolean testing takes place. One of those is in Boolean operators.

The operators `and`, `or`, and `not` accept any value that supports Boolean testing. In the case of `not`, it will always return a Boolean value:

```py
not 1
# 
# False
not 0
# 
# True
```

The truth table for `not` is still correct, but now it takes the truthiness of the input.

In the case of `and` and `or`, in addition to short-circuit evaluation, they also return the value at which they stopped evaluating:

```py
1 and 2
# 
# 2
0 and 1
# 
# 0
1 or 2
# 
# 1
0 or 2
# 
# 2
```

The truth tables are still correct, but they now define the truthiness of the results, which depends on the truthiness of the inputs. This can come handy when, for example, you want to give values defaults.

Assume you have a function called `summarize()` that, if the text is too long, takes the beginning and the end and adds an ellipsis (`...`) in the middle. This might be useful in some reports that can’t fit the full text. However, some datasets have missing values represented by `None`.

Since `summarize()` assumes the input is a string, it will fail on `None`:

```py
def summarize(long_text):
    if len(long_text) <= 4:
        return long_text
    return long_text[:2] +"..." + long_text[-2:]

summarize("hello world")
# 
# 'he...ld'
summarize("hi")
# 
# 'hi'
summarize("")
# 
# ''
summarize(None)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 2, in summarize
# TypeError: object of type 'NoneType' has no len()

for a in ["hello world", "hi", "", None]:
    print("-->", summarize(a or ""))
#
# --> he...ld
# --> hi
# -->
# -->
```

This example takes advantage of the falsiness of `None` and the fact that `or` not only short-circuits but also returns the last value to be evaluated. The code for printing the report adds `or ""` to the argument to `summarize()`. The addition of `or ""` helps you to avoid errors with just a small code change.

The built-in functions [**`all()`**](/realpython.com/python-all.md) and [**`any()`**](/realpython.com/any-python.md) evaluate truthiness and also short-circuit, but they don’t return the last value to be evaluated. `all()` checks whether all of its arguments are truthy:

```py
all([1, 2, 3])
# 
# True
all([0, 1, 2])
# 
# False
all(x / (x - 1) for x in [0, 1])
# 
# False
```

In the last line, `all()` doesn’t evaluate `x / (x - 1)` for `1`. Since `1 - 1` is `0`, this would have raised a `ZeroDivisionError`.

`any()` checks whether any of its arguments are truthy:

```py
any([1, 0, 0])
# 
# True
any([False, 0, 0.0])
# 
# False
any(1 / x for x in [1, 0])
# 
# True
```

In the last line, `any()` doesn’t evaluate `1 / x` for `0`.

---

## Conclusion

The Python Boolean is a commonly used data type with many useful applications. You can use Booleans with operators like `not`, `and`, `or`, `in`, `is`, `==`, and `!=` to compare values and check for membership, identity, or equality. You can also use Boolean testing with an `if` statement to control the flow of your programs based on the truthiness of an expression.

::: info In this tutorial, you’ve learned how to

- Manipulate Boolean values with **Boolean operators**
- Convert Booleans to **other types**
- Convert other types to **Python Booleans**
- Use Booleans to write **efficient and readable** Python code

:::

You now know how short-circuit evaluation works and recognize the connection between Booleans and the `if` statement. This knowledge will help you to both understand existing code and avoid common pitfalls that can lead to errors in your own programs.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Python Booleans: Leveraging the Values of Truth - Real Python"
  desc="In this course, you'll learn about the built-in Python Boolean data type, which is used to represent the truth value of an expression. You'll see how to use Booleans to compare values, check for identity and membership, and control the flow of your programs with conditionals."
  url="https://realpython.com/courses/booleans-leveraging-truth/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-a-Python-Boolean_Watermarked.ba6413996cb3.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Booleans: Use Truth Values in Your Code",
  "desc": "In this tutorial, you'll learn about the built-in Python Boolean data type, which is used to represent the truth value of an expression. You'll see how to use Booleans to compare values, check for identity and membership, and control the flow of your programs with conditionals.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-boolean.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
