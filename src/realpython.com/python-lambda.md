---
lang: en-US
title: "How to Use Python Lambda Functions"
description: "Article(s) > How to Use Python Lambda Functions"
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
      content: "Article(s) > How to Use Python Lambda Functions"
    - property: og:description
      content: "How to Use Python Lambda Functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-lambda.html
prev: /programming/py/articles/README.md
date: 2019-06-19
isOriginal: false
author:
  - name: Andre Burgaud
    url : https://realpython.com/team/aburgaud/
cover: https://files.realpython.com/media/How-to-Use-Python-Lambda-Functions_Watermarked.2afa4f5ea5d4.jpg
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
  name="How to Use Python Lambda Functions"
  desc="In this step-by-step tutorial, you'll learn about Python lambda functions. You'll see how they compare with regular functions and how you can use them in accordance with best practices."
  url="https://realpython.com/python-lambda"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Lambda-Functions_Watermarked.2afa4f5ea5d4.jpg"/>

Watch Now This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: [**Using Python Lambda Functions**](/realpython.com/python-lambda-functions/README.md)

Python and other languages like Java, C#, and even C++ have had lambda functions added to their syntax, whereas languages like LISP or the ML family of languages, Haskell, OCaml, and F#, use lambdas as a core concept.

Python lambdas are little, anonymous functions, subject to a more restrictive but more concise syntax than regular Python functions.

::: info By the end of this article, you’ll know

- How Python lambdas came to be
- How lambdas compare with regular function objects
- How to write lambda functions
- Which functions in the Python standard library leverage lambdas
- When to use or avoid Python lambda functions

:::

::: note

You’ll see some code examples using `lambda` that seem to blatantly ignore Python style best practices. This is only intended to illustrate lambda calculus concepts or to highlight the capabilities of Python `lambda`.

:::

Those questionable examples will be contrasted with better approaches or alternatives as you progress through the article.

This tutorial is mainly for intermediate to experienced Python programmers, but it is accessible to any curious minds with interest in programming and lambda calculus.

All the examples included in this tutorial have been tested with Python 3.7.

::: info Quiz - Python Lambda Functions

Python lambdas are little, anonymous functions, subject to a more restrictive but more concise syntax than regular Python functions. Test your understanding on how you can use them better!

<SiteInfo
  name="Python Lambda Functions Quiz - Real Python"
  desc="Python lambdas are little, anonymous functions, subject to a more restrictive but more concise syntax than regular Python functions. Test your understanding on how you can use them better!"
  url="https://realpython.com/quizzes/python-lambda/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Lambda-Functions_Watermarked.2afa4f5ea5d4.jpg"/>

:::

::: tip Free Download

[<VPIcon icon="fas fa-globe"/>Get a sample chapter from Python Tricks: The Book](https://realpython.com/bonus/python-tricks-sample-pdf/) that shows you Python’s best practices with simple examples you can apply instantly to write more beautiful + Pythonic code.

<SiteInfo
  name="Python Tricks: The Book - Free Sample Chapter (PDF) - Real Python"
  desc=""
  url="https://realpython.com/bonus/python-tricks-sample-pdf/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://realpython.com/static/social-default-image.5e1aa4786b3a.png"/>

:::

---

## Lambda Calculus

Lambda expressions in Python and other programming languages have their roots in lambda calculus, a model of computation invented by Alonzo Church. You’ll uncover when lambda calculus was introduced and why it’s a fundamental concept that ended up in the Python ecosystem.

### History

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Alonzo Church](https://en.wikipedia.org/wiki/Alonzo_Church) formalized [<VPIcon icon="fa-brands fa-wikipedia-w"/>lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus), a language based on pure abstraction, in the 1930s. Lambda functions are also referred to as lambda abstractions, a direct reference to the abstraction model of Alonzo Church’s original creation.

Lambda calculus can encode any computation. It is [<VPIcon icon="fa-brands fa-wikipedia-w"/>Turing complete](https://simple.wikipedia.org/wiki/Turing_complete), but contrary to the concept of a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Turing machine](https://en.wikipedia.org/wiki/Turing_machine), it is pure and does not keep any state.

[**Functional**](/realpython.com/python-functional-programming.md) languages get their origin in mathematical logic and lambda calculus, while imperative programming languages embrace the state-based model of computation invented by Alan Turing. The two models of computation, lambda calculus and [<VPIcon icon="fa-brands fa-wikipedia-w"/>Turing machines](https://en.wikipedia.org/wiki/Turing_machine), can be translated into each another. This equivalence is known as the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Church-Turing hypothesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis).

Functional languages directly inherit the lambda calculus philosophy, adopting a declarative approach of programming that emphasizes abstraction, data transformation, composition, and purity (no state and no side effects). Examples of functional languages include [<VPIcon icon="iconfont icon-haskell"/>Haskell](https://haskell.org/), [<VPIcon icon="fa-brands fa-wikipedia-w"/>Lisp](https://en.wikipedia.org/wiki/Lisp_%28programming_language%29), or [<VPIcon icon="iconfont icon-erlang"/>Erlang](https://erlang.org/).

By contrast, the Turing Machine led to imperative programming found in languages like [<VPIcon icon="fa-brands fa-wikipedia-w"/>Fortran](https://en.wikipedia.org/wiki/Fortran), [<VPIcon icon="iconfont icon-c"/>C](https://en.wikipedia.org/wiki/C_%28programming_language%29), or [<VPIcon icon="fa-brands fa-python"/>Python](https://python.org/).

The imperative style consists of programming with statements, driving the flow of the program step by step with detailed instructions. This approach promotes mutation and requires managing state.

The separation in both families presents some nuances, as some functional languages incorporate imperative features, like [OCaml](https://ocaml.org/), while functional features have been permeating the imperative family of languages in particular with the introduction of lambda functions in [<VPIcon icon="fa-brands fa-wikipedia-w"/>Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29), or Python.

Python is not inherently a functional language, but it adopted some functional concepts early on. In January 1994, [**`map()`**](https://realpython.com/python-map-function.md), [**`filter()`**](/realpython.com/python-filter-function.md), `reduce()`, and the `lambda` operator were added to the language.

### First Example

Here are a few examples to give you an appetite for some Python code, functional style.

The [<VPIcon icon="fa-brands fa-wikipedia-w"/>identity function](https://en.wikipedia.org/wiki/Identity_function), a function that returns its argument, is expressed with a standard Python function definition using the [**keyword**](/realpython.com/python-keywords.md) `def` as follows:

```py
def identity(x):
    return x
```

`identity()` takes an argument `x` and returns it upon invocation.

In contrast, if you use a Python lambda construction, you get the following:

```py
lambda x: x
```

In the example above, the expression is composed of:

- **The keyword:** `lambda`
- **A bound variable:** `x`
- **A body:** `x`

:::: note

In the context of this article, a **bound variable** is an argument to a lambda function.

:::

In contrast, a **free variable** is not bound and may be referenced in the body of the expression. A free variable can be a constant or a variable defined in the enclosing [**scope**](/realpython.com/python-namespaces-scope.md) of the function.

You can write a slightly more elaborated example, a function that adds `1` to an argument, as follows:

```py
lambda x: x + 1
```

You can apply the function above to an argument by surrounding the function and its argument with parentheses:

```py
(lambda x: x + 1)(2)
#
# 3
```

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Reduction](https://en.wikipedia.org/wiki/Reduction_strategy_%28lambda_calculus%29) is a lambda calculus strategy to compute the value of the expression. In the current example, it consists of replacing the bound variable `x` with the argument `2`:

```py
(lambda x: x + 1)(2) = lambda 2: 2 + 1
                     = 2 + 1
                     = 3
```

Because a lambda function is an expression, it can be named. Therefore you could write the previous code as follows:

```py
add_one = lambda x: x + 1
add_one(2)
# 
# 3
```

The above lambda function is equivalent to writing this:

```py
def add_one(x):
    return x + 1
```

These functions all take a single argument. You may have noticed that, in the definition of the lambdas, the arguments don’t have parentheses around them. Multi-argument functions (functions that take more than one argument) are expressed in Python lambdas by listing arguments and separating them with a comma (`,`) but without surrounding them with parentheses:

```py
full_name = lambda first, last: f'Full name: {first.title()} {last.title()}'
full_name('guido', 'van rossum')
'Full name: Guido Van Rossum'
```

The lambda function assigned to `full_name` takes two arguments and returns a [**string**](/realpython.com/python-strings.md) interpolating the two parameters `first` and `last`. As expected, the definition of the lambda lists the arguments with no parentheses, whereas calling the function is done exactly like a normal Python function, with parentheses surrounding the arguments.

---

## Anonymous Functions

The following terms may be used interchangeably depending on the programming language type and culture:

- Anonymous functions
- Lambda functions
- Lambda expressions
- Lambda abstractions
- Lambda form
- Function literals

For the rest of this article after this section, you’ll mostly see the term **lambda function**.

Taken literally, an anonymous function is a function without a name. In Python, an anonymous function is created with the `lambda` keyword. More loosely, it may or not be assigned a name. Consider a two-argument anonymous function defined with `lambda` but not bound to a variable. The lambda is not given a name:

```py
lambda x, y: x + y
```

The function above defines a lambda expression that takes two arguments and returns their sum.

Other than providing you with the feedback that Python is perfectly fine with this form, it doesn’t lead to any practical use. You could invoke the function in the Python interpreter:

```py
_(1, 2)
#
# 3
```

The example above is taking advantage of the interactive interpreter-only feature provided via the [**underscore**](/realpython.com/python-double-underscore.md) (`_`). See the note below for more details.

You could not write similar code in a Python module. Consider the `_` in the interpreter as a side effect that you took advantage of. In a Python module, you would assign a name to the lambda, or you would pass the lambda to a function. You’ll use those two approaches later in this article.

::: note

In the interactive interpreter, the single underscore (`_`) is bound to the last expression evaluated.

:::

In the example above, the `_` points to the lambda function. For more details about the usage of this special character in Python, check out [<VPIcon icon="fas fa-globe"/>The Meaning of Underscores in Python](https://dbader.org/blog/meaning-of-underscores-in-python).

Another pattern used in other languages like JavaScript is to immediately execute a Python lambda function. This is known as an **Immediately Invoked Function Expression** ([<VPIcon icon="fa-brands fa-firefox"/>IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), pronounce “iffy”). Here’s an example:

```py
(lambda x, y: x + y)(2, 3)
5
```

The lambda function above is defined and then immediately called with two arguments (`2` and `3`). It returns the value `5`, which is the sum of the arguments.

Several examples in this tutorial use this format to highlight the anonymous aspect of a lambda function and avoid focusing on `lambda` in Python as a shorter way of defining a function.

Python does not encourage using immediately invoked lambda expressions. It simply results from a lambda expression being callable, unlike the body of a normal function.

Lambda functions are frequently used with [<VPIcon icon="fa-brands fa-wikipedia-w"/>higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function), which take one or more functions as arguments or return one or more functions.

A lambda function can be a higher-order function by taking a function (normal or lambda) as an argument like in the following contrived example:

```py
high_ord_func = lambda x, func: x + func(x)
high_ord_func(2, lambda x: x * x)
#
# 6
high_ord_func(2, lambda x: x + 3)
#
# 7
```

Python exposes higher-order functions as built-in functions or in the standard library. Examples include `map()`, `filter()`, `functools.reduce()`, as well as key functions like [**`sort()`, `sorted()`**](/realpython.com/python-sort.md), [**`min()`, and `max()`**](/realpython.com/python-min-and-max.md). You’ll use lambda functions together with Python higher-order functions in [Appropriate Uses of Lambda Expressions](#appropriate-uses-of-lambda-expressions).

---

## Python Lambda and Regular Functions

This quote from the [<VPIcon icon="fa-brands fa-python"/>Python Design and History FAQ](https://docs.python.org/3/faq/design.html) seems to set the tone about the overall expectation regarding the usage of lambda functions in Python:

::: info

Unlike lambda forms in other languages, where they add functionality, Python lambdas are only a shorthand notation if you’re too lazy to define a function. ([<VPIcon icon="fa-brands fa-python"/>Source](https://docs.python.org/3/faq/design.html#why-can-t-lambda-expressions-contain-statements))

<SiteInfo
  name="Design and History FAQ"
  desc="Contents: Design and History FAQ- Why does Python use indentation for grouping of statements?, Why am I getting strange results with simple arithmetic operations?, Why are floating-point calculatio..."
  url="https://docs.python.org/3/faq/design.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

:::

Nevertheless, don’t let this statement deter you from using Python’s `lambda`. At first glance, you may accept that a lambda function is a function with some [<VPIcon icon="fa-brands fa-wikipedia-w"/>syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) shortening the code to define or invoke a function. The following sections highlight the commonalities and subtle differences between normal Python functions and lambda functions.

### Functions

At this point, you may wonder what fundamentally distinguishes a lambda function bound to a variable from a regular function with a single `return` line: under the surface, almost nothing. Let’s verify how Python sees a function built with a single [**return statement**](/realpython.com/python-return-statement.md) versus a function constructed as an expression (`lambda`).

The [<VPIcon icon="fa-brands fa-python"/>`dis`](https://docs.python.org/3/library/dis.html) module exposes functions to analyze Python bytecode generated by the Python compiler:

```py
import dis
add = lambda x, y: x + y
type(add)
# 
# <class 'function'>
dis.dis(add)
#
# 1           0 LOAD_FAST                0 (x)
#             2 LOAD_FAST                1 (y)
#             4 BINARY_ADD
#             6 RETURN_VALUE
add
# 
# <function <lambda> at 0x7f30c6ce9ea0>
```

You can see that `dis()` expose a readable version of the Python bytecode allowing the inspection of the low-level instructions that the Python interpreter will use while executing the program.

Now see it with a regular function object:

```py
import dis
def add(x, y): return x + y
type(add)
#
# <class 'function'>
dis.dis(add)
#
# 1           0 LOAD_FAST                0 (x)
#             2 LOAD_FAST                1 (y)
#             4 BINARY_ADD
#             6 RETURN_VALUE
add
#
# <function add at 0x7f30c6ce9f28>
```

The bytecode interpreted by Python is the same for both functions. But you may notice that the naming is different: the function name is `add` for a function defined with `def`, whereas the Python lambda function is seen as `lambda`.

### Traceback

You saw in the previous section that, in the context of the lambda function, Python did not provide the name of the function, but only `<lambda>`. This can be a limitation to consider when an exception occurs, and a [**traceback**](/realpython.com/python-traceback.md) shows only `<lambda>`:

```py
div_zero = lambda x: x / 0
div_zero(2)
#
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#  File "<stdin>", line 1, in <lambda> ZeroDivisionError: division by zero
```

The [**traceback**](/realpython.com/python-traceback/README.md) of an exception raised while a lambda function is executed only identifies the function causing the exception as `<lambda>`.

Here’s the same exception raised by a normal function:

```py
def div_zero(x): return x / 0
div_zero(2)
#
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#  File "<stdin>", line 1, in div_zero ZeroDivisionError: division by zero
 ```

The normal function causes a similar error but results in a more precise traceback because it gives the function name, `div_zero`.

### Syntax

As you saw in the previous sections, a lambda form presents syntactic distinctions from a normal function. In particular, a lambda function has the following characteristics:

- It can only contain expressions and can’t include statements in its body.
- It is written as a single line of execution.
- It does not support type annotations.
- It can be immediately invoked (IIFE).

#### No Statements

A lambda function can’t contain any statements. In a lambda function, statements like `return`, `pass`, `assert`, or `raise` will raise a [**`SyntaxError`**](/realpython.com/invalid-syntax-python.md) exception. Here’s an example of adding `assert` to the body of a lambda:

```py
(lambda x: assert x == 2)(2)
#
#   File "<input>", line 1
#  (lambda x: assert x == 2)(2)
#  ^
# SyntaxError: invalid syntax
```

This contrived example intended to `assert` that parameter `x` had a value of `2`. But, the interpreter identifies a `SyntaxError` while parsing the code that involves the statement `assert` in the body of the `lambda`.

#### Single Expression

In contrast to a normal function, a Python lambda function is a single expression. Although, in the body of a `lambda`, you can spread the expression over several lines using parentheses or a multiline string, it remains a single expression:

```py
(lambda x:
    (x % 2 and 'odd' or 'even'))(3)
#
# 'odd'
```

The example above returns the string `'odd'` when the lambda argument is odd, and `'even'` when the argument is even. It spreads across two lines because it is contained in a set of parentheses, but it remains a single expression.

#### Type Annotations

If you’ve started adopting type hinting, which is now available in Python, then you have another good reason to prefer normal functions over Python lambda functions. Check out [**Python Type Checking (Guide)**](/realpython.com/python-type-checking.md#hello-types) to get learn more about Python type hints and type checking. In a lambda function, there is no equivalent for the following:

```py
def full_name(first: str, last: str) -> str:
    return f'{first.title()} {last.title()}'
```

Any type error with `full_name()` can be caught by tools like [<VPIcon icon="fas fa-globe"/>`mypy`](http://mypy-lang.org/) or [<VPIcon icon="fas fa-globe"/>`pyre`](https://pyre-check.org/), whereas a `SyntaxError` with the equivalent lambda function is raised at runtime:

```py
lambda first: str, last: str: first.title() + " " + last.title() -> str
#
#   File "<stdin>", line 1
#  lambda first: str, last: str: first.title() + " " + last.title() -> str
#
# SyntaxError: invalid syntax
```

Like trying to include a statement in a lambda, adding type annotation immediately results in a `SyntaxError` at runtime.

#### IIFE

You’ve already seen several examples of [<VPIcon icon="fa-brands fa-firefox"/>immediately invoked function execution](https://developer.mozilla.org/en-US/docs/Glossary/IIFE):

```py
(lambda x: x * x)(3)
#
# 9
```

Outside of the Python interpreter, this feature is probably not used in practice. It’s a direct consequence of a lambda function being callable as it is defined. For example, this allows you to pass the definition of a Python lambda expression to a higher-order function like `map()`, `filter()`, or `functools.reduce()`, or to a key function.

### Arguments

Like a normal function object defined with `def`, Python lambda expressions support all the different ways of passing arguments. This includes:

- Positional arguments
- Named arguments (sometimes called keyword arguments)
- Variable list of arguments (often referred to as **varargs**)
- Variable list of keyword arguments
- Keyword-only arguments

The following examples illustrate options open to you in order to pass arguments to lambda expressions:

```py
(lambda x, y, z: x + y + z)(1, 2, 3)
#
# 6
(lambda x, y, z=3: x + y + z)(1, 2)
#
# 6
(lambda x, y, z=3: x + y + z)(1, y=2)
#
# 6
(lambda *args: sum(args))(1,2,3)
#
# 6
(lambda **kwargs: sum(kwargs.values()))(one=1, two=2, three=3)
#
# 6
(lambda x, *, y=0, z=0: x + y + z)(1, y=2, z=3)
#
# 6
```

### Decorators

In Python, a [<VPIcon icon="fa-brands fa-python"/>decorator](https://python.org/dev/peps/pep-0318/) is the implementation of a pattern that allows adding a behavior to a function or a class. It is usually expressed with the `@decorator` syntax prefixing a function. Here’s a contrived example:

```py
def some_decorator(f):
    def wraps(*args):
        print(f"Calling function '{f.__name__}'")
        return f(args)
    return wraps

@some_decorator
def decorated_function(x):
    print(f"With argument '{x}'")
```

In the example above, `some_decorator()` is a function that adds a behavior to `decorated_function()`, so that invoking `decorated_function("Python")` results in the following output:

```plaintext title="output"
Calling function 'decorated_function'
With argument 'Python'
```

`decorated_function()` only prints `With argument 'Python'`, but the decorator adds an extra behavior that also prints `Calling function 'decorated_function'`.

A decorator can be applied to a lambda. Although it’s not possible to decorate a lambda with the `@decorator` syntax, a decorator is just a function, so it can call the lambda function:

```py{11,15,18}
# Defining a decorator
def trace(f):
    def wrap(*args, **kwargs):
        print(f"[TRACE] func: {f.__name__}, args: {args}, kwargs: {kwargs}")
        return f(*args, **kwargs)

    return wrap

# Applying decorator to a function
@trace
def add_two(x): 
    return x + 2

# Calling the decorated function
add_two(3)

# Applying decorator to a lambda
print((trace(lambda x: x ** 2))(3))
```

`add_two()`, decorated with `@trace` on line 11, is invoked with argument `3` on line 15. By contrast, on line 18, a lambda function is immediately involved and embedded in a call to `trace()`, the decorator. When you execute the code above you obtain the following:

```plaintext title="output"
[TRACE] func: add_two, args: (3,), kwargs: {}
[TRACE] func: <lambda>, args: (3,), kwargs: {}
9
```

See how, as you’ve already seen, the name of the lambda function appears as `<lambda>`, whereas `add_two` is clearly identified for the normal function.

Decorating the lambda function this way could be useful for debugging purposes, possibly to debug the behavior of a lambda function used in the context of a higher-order function or a key function. Let’s see an example with `map()`:

```py
list(map(trace(lambda x: x*2), range(3)))
```

The first argument of `map()` is a lambda that multiplies its argument by `2`. This lambda is decorated with `trace()`. When executed, the example above outputs the following:

```plaintext title="output
[TRACE] Calling <lambda> with args (0,) and kwargs {}
[TRACE] Calling <lambda> with args (1,) and kwargs {}
[TRACE] Calling <lambda> with args (2,) and kwargs {}
[0, 2, 4]
```

The result `[0, 2, 4]` is a [**list**](/realpython.com/python-lists-tuples.md) obtained from multiplying each element of `range(3)`. For now, consider `range(3)` equivalent to the list `[0, 1, 2]`.

You will be exposed to `map()` in more details in [Map](#map).

A lambda can also be a decorator, but it’s not recommended. If you find yourself needing to do this, consult [<VPIcon icon="fa-brands fa-python"/>PEP 8, Programming Recommendations](https://python.org/dev/peps/pep-0008/#programming-recommendations).

For more on Python decorators, check out [**Primer on Python Decorators**](/realpython.com/primer-on-python-decorators.md).

### Closure

A [<VPIcon icon="fa-brands fa-wikipedia-w"/>closure](https://en.wikipedia.org/wiki/Closure_%28computer_programming%29) is a function where every free variable, everything except parameters, used in that function is bound to a specific value defined in the enclosing scope of that function. In effect, closures define the environment in which they run, and so can be called from anywhere.

The concepts of lambdas and closures are not necessarily related, although lambda functions can be closures in the same way that normal functions can also be closures. Some languages have special constructs for closure or lambda (for example, Groovy with an anonymous block of code as Closure object), or a lambda expression (for example, Java Lambda expression with a limited option for closure).

Here’s a closure constructed with a normal Python function:

```py{5,9}
def outer_func(x):
    y = 4
    def inner_func(z):
        print(f"x = {x}, y = {y}, z = {z}")
        return x + y + z 
    return inner_func

for i in range(3):
    closure = outer_func(i) 
    print(f"closure({i+5}) = {closure(i+5)}")
```

`outer_func()` returns `inner_func()`, a [**nested function**](/realpython.com/inner-functions-what-are-they-good-for.md) that computes the sum of three arguments:

- `x` is passed as an argument to `outer_func()`.
- `y` is a variable local to `outer_func()`.
- `z` is an argument passed to `inner_func()`.

To test the behavior of `outer_func()` and `inner_func()`, `outer_func()` is invoked three times in a [**`for` loop**](/realpython.com/python-for-loop.md) that prints the following:

```plaintext title="output"
x = 0, y = 4, z = 5
closure(5) = 9
x = 1, y = 4, z = 6
closure(6) = 11
x = 2, y = 4, z = 7
closure(7) = 13
```

On line 9 of the code, `inner_func()` returned by the invocation of `outer_func()` is bound to the name `closure`. On line 5, `inner_func()` captures `x` and `y` because it has access to its embedding environment, such that upon invocation of the closure, it is able to operate on the two free variables `x` and `y`.

Similarly, a `lambda` can also be a closure. Here’s the same example with a Python lambda function:

```py{3,6}
def outer_func(x):
    y = 4
    return lambda z: x + y + z 4
for i in range(3):
    closure = outer_func(i)
    print(f"closure({i+5}) = {closure(i+5)}")
```

When you execute the code above, you obtain the following output:

```plaintext title="output"
closure(5) = 9
closure(6) = 11
closure(7) = 13
```

On line 6, `outer_func()` returns a lambda and assigns it to to the variable `closure`. On line 3, the body of the lambda function references `x` and `y`. The variable `y` is available at definition time, whereas `x` is defined at runtime when `outer_func()` is invoked.

In this situation, both the normal function and the lambda behave similarly. In the next section, you’ll see a situation where the behavior of a lambda can be deceptive due to its evaluation time (definition time vs runtime).

### Evaluation Time

In some situations involving [**loops**](/realpython.com/python-for-loop/README.md), the behavior of a Python lambda function as a closure may be counterintuitive. It requires understanding when free variables are bound in the context of a lambda. The following examples demonstrate the difference when using a regular function vs using a Python lambda.

Test the scenario first using a regular function:

```py
def wrap(n):
    def f():
        print(n)
    return f

numbers = 'one', 'two', 'three'
funcs = []
for n in numbers:
    funcs.append(wrap(n))

for f in funcs:
    f()
# 
# one
# two
# three
```

In a normal function, `n` is evaluated at definition time, on line 9, when the function is added to the list: `funcs.append(wrap(n))`.

Now, with the implementation of the same logic with a lambda function, observe the unexpected behavior:

```py
numbers = 'one', 'two', 'three'
funcs = []
for n in numbers:
    funcs.append(lambda: print(n))

for f in funcs:
    f()
# 
# three
# three
# three
```

The unexpected result occurs because the free variable `n`, as implemented, is bound at the execution time of the lambda expression. The Python lambda function on line 4 is a closure that captures `n`, a free variable bound at runtime. At runtime, while invoking the function `f` on line 7, the value of `n` is `three`.

To overcome this issue, you can assign the free variable at definition time as follows:

```py
numbers = 'one', 'two', 'three'
funcs = []
for n in numbers:
    funcs.append(lambda n=n: print(n))

for f in funcs:
    f()
# 
# one
# two
# three
```

A Python lambda function behaves like a normal function in regard to arguments. Therefore, a lambda parameter can be initialized with a default value: the parameter `n` takes the outer `n` as a default value. The Python lambda function could have been written as `lambda x=n: print(x)` and have the same result.

The Python lambda function is invoked without any argument on line 7, and it uses the default value `n` set at definition time.

### Testing Lambdas

Python lambdas can be tested similarly to regular functions. It’s possible to use both `unittest` and `doctest`.

::: tabs

@tab:active <code>unittest</code>

The `unittest` module handles Python lambda functions similarly to regular functions:

```py :collapsed-lines
import unittest

addtwo = lambda x: x + 2

class LambdaTest(unittest.TestCase):
    def test_add_two(self):
        self.assertEqual(addtwo(2), 4)

    def test_add_two_point_two(self):
        self.assertEqual(addtwo(2.2), 4.2)

    def test_add_three(self):
        # Should fail
        self.assertEqual(addtwo(3), 6)

if __name__ == '__main__':
    unittest.main(verbosity=2)
```

`LambdaTest` defines a test case with three test methods, each of them exercising a test scenario for `addtwo()` implemented as a lambda function. The execution of the Python file `lambda_unittest.py` that contains `LambdaTest` produces the following:

```sh :collapsed-lines
python lambda_unittest.py
# 
# test_add_three (__main__.LambdaTest) FAIL
# test_add_two (__main__.LambdaTest) ok
# test_add_two_point_two (__main__.LambdaTest) ok
# 
# ======================================================================
# FAIL: test_add_three (__main__.LambdaTest)
# ----------------------------------------------------------------------
# Traceback (most recent call last):
#  File "lambda_unittest.py", line 18, in test_add_three
#  self.assertEqual(addtwo(3), 6)
# AssertionError: 5 != 6
# 
# ----------------------------------------------------------------------
# Ran 3 tests in 0.001s
# 
# FAILED (failures=1)
```

As expected, we have two successful test cases and one failure for `test_add_three`: the result is `5`, but the expected result was `6`. This failure is due to an intentional mistake in the test case. Changing the expected result from `6` to `5` will satisfy all the tests for `LambdaTest`.

@tab <code>doctest</code>

The `doctest` module extracts interactive Python code from `docstring` to execute tests. Although the syntax of Python lambda functions does not support a typical `docstring`, it is possible to assign a string to the `__doc__` element of a named lambda:

```py
addtwo = lambda x: x + 2
addtwo.__doc__ = """Add 2 to a number.
   addtwo(2)
   4
   addtwo(2.2)
   4.2
   addtwo(3) # Should fail
   6
   """

if __name__ == '__main__':
    import doctest
    doctest.testmod(verbose=True)
```

The `doctest` in the doc comment of lambda `addtwo()` describes the same test cases as in the previous section.

When you execute the tests via `doctest.testmod()`, you get the following:

```sh :collapsed-lines
python lambda_doctest.py
# 
# Trying:
#  addtwo(2)
# Expecting:
#  4
# ok
# Trying:
#  addtwo(2.2)
# Expecting:
#  4.2
# ok
# Trying:
#  addtwo(3) # Should fail
# Expecting:
#  6
# **********************************************************************
# File "lambda_doctest.py", line 16, in __main__.addtwo
# Failed example:
#  addtwo(3) # Should fail
# Expected:
#  6
# Got:
#  5
# 1 items had no tests:
#  __main__
# **********************************************************************
# 1 items had failures:
#  1 of   3 in __main__.addtwo
# 3 tests in 2 items.
# 2 passed and 1 failed.
# ***Test Failed*** 1 failures.
```

The failed test results from the same failure explained in the execution of the unit tests in the previous section.

You can add a `docstring` to a Python lambda via an assignment to `__doc__` to document a lambda function. Although possible, the Python syntax better accommodates `docstring` for normal functions than lambda functions.

For a comprehensive overview of unit testing in Python, you may want to refer to [**Getting Started With Testing in Python**](/realpython.com/python-testing.md).

---

## Lambda Expression Abuses

Several examples in this article, if written in the context of professional Python code, would qualify as abuses.

If you find yourself trying to overcome something that a lambda expression does not support, this is probably a sign that a normal function would be better suited. The `docstring` for a lambda expression in the previous section is a good example. Attempting to overcome the fact that a Python lambda function does not support statements is another red flag.

The next sections illustrate a few examples of lambda usages that should be avoided. Those examples might be situations where, in the context of Python lambda, the code exhibits the following pattern:

- It doesn’t follow the Python style guide (PEP 8)
- It’s cumbersome and difficult to read.
- It’s unnecessarily clever at the cost of difficult readability.

### Raising an Exception

Trying to raise an exception in a Python lambda should make you think twice. There are some clever ways to do so, but even something like the following is better to avoid:

```py
def throw(ex): raise ex
#
# (lambda: throw(Exception('Something bad happened')))()
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
#  File "<stdin>", line 1, in <lambda>
#  File "<stdin>", line 1, in throw
# Exception: Something bad happened
```

Because a statement is not syntactically correct in a Python lambda body, the workaround in the example above consists of abstracting the statement call with a dedicated function `throw()`. Using this type of workaround should be avoided. If you encounter this type of code, you should consider refactoring the code to use a regular function.

### Cryptic Style

As in any programming languages, you will find Python code that can be difficult to read because of the style used. Lambda functions, due to their conciseness, can be conducive to writing code that is difficult to read.

The following lambda example contains several bad style choices:

```py
(lambda _: list(map(lambda _: _ // 2, _)))([1,2,3,4,5,6,7,8,9,10])
#
# [0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```

The underscore (`_`) refers to a variable that you don’t need to refer to explicitly. But in this example, three `_` refer to different variables. An initial upgrade to this lambda code could be to name the variables:

```py
(lambda some_list: list(map(lambda n: n // 2, some_list)))([1,2,3,4,5,6,7,8,9,10])
#
# [0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```

Admittedly, it’s still difficult to read. By still taking advantage of a `lambda`, a regular function would go a long way to render this code more readable, spreading the logic over a few lines and function calls:

```py
def div_items(some_list):
    div_by_two = lambda n: n // 2
    return map(div_by_two, some_list)
list(div_items([1,2,3,4,5,6,7,8,9,10])))
#
# [0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
```

This is still not optimal but shows you a possible path to make code, and Python lambda functions in particular, more readable. In [Alternatives to Lambdas](#alternatives-to-lambdas), you’ll learn to replace `map()` and `lambda` with list comprehensions or [**generator expressions**](/realpython.com/introduction-to-python-generators.md). This will drastically improve the readability of the code.

### Python Classes

You can but should not write [**class**](/realpython.com/python-classes.md) methods as Python lambda functions. The following example is perfectly legal Python code but exhibits unconventional Python code relying on `lambda`. For example, instead of implementing `__str__` as a regular function, it uses a `lambda`. Similarly, `brand` and `year` are [<VPIcon icon="fa-brands fa-python"/>properties](https://docs.python.org/3/library/functions.html#property) also implemented with lambda functions, instead of regular functions or decorators:

```py :collapsed-lines
class Car:
 """Car with methods as lambda functions."""
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year

    brand = property(lambda self: getattr(self, '_brand'),
                     lambda self, value: setattr(self, '_brand', value))

    year = property(lambda self: getattr(self, '_year'),
                    lambda self, value: setattr(self, '_year', value))

    __str__ = lambda self: f'{self.brand} {self.year}'  # 1: error E731

    honk = lambda self: print('Honk!')     # 2: error E731
```

Running a tool like [<VPIcon icon="fas fa-globe"/>`flake8`](http://flake8.pycqa.org/), a style guide enforcement tool, will display the following errors for `__str__` and `honk`:

```plaintext title="output"
E731 do not assign a lambda expression, use a def
```

Although `flake8` doesn’t point out an issue for the usage of the Python lambda functions in the properties, they are difficult to read and prone to error because of the usage of multiple strings like `'_brand'` and `'_year'`.

Proper implementation of `__str__` would be expected to be as follows:

```py
def __str__(self):
    return f'{self.brand} {self.year}'
```

`brand` would be written as follows:

```py
@property
def brand(self):
    return self._brand

@brand.setter
def brand(self, value):
    self._brand = value
```

As a general rule, in the context of code written in Python, prefer regular functions over lambda expressions. Nonetheless, there are cases that benefit from lambda syntax, as you will see in the next section.

---

## Appropriate Uses of Lambda Expressions

Lambdas in Python tend to be the subject of controversies. Some of the arguments against lambdas in Python are:

- Issues with readability
- The imposition of a functional way of thinking
- Heavy syntax with the `lambda` keyword

Despite the heated debates questioning the mere existence of this feature in Python, lambda functions have properties that sometimes provide value to the Python language and to developers.

The following examples illustrate scenarios where the use of lambda functions is not only suitable but encouraged in Python code.

### Classic Functional Constructs

Lambda functions are regularly used with the built-in functions [<VPIcon icon="fa-brands fa-pyhthon"/>`map()`](https://docs.python.org/3/library/functions.html#map) and [<VPIcon icon="fa-brands fa-pyhthon"/>`filter()`](https://docs.python.org/3/library/functions.html#filter), as well as [<VPIcon icon="fa-brands fa-pyhthon"/>`functools.reduce()`](https://docs.python.org/3/library/functools.html?highlight=reduce#functools.reduce), exposed in the module [<VPIcon icon="fa-brands fa-pyhthon"/>`functools`](https://docs.python.org/3/library/functools.html). The following three examples are respective illustrations of using those functions with lambda expressions as companions:

```py
list(map(lambda x: x.upper(), ['cat', 'dog', 'cow']))
#
# ['CAT', 'DOG', 'COW']
list(filter(lambda x: 'o' in x, ['cat', 'dog', 'cow']))
# 
# ['dog', 'cow']
from functools import reduce
reduce(lambda acc, x: f'{acc} | {x}', ['cat', 'dog', 'cow'])
# 'cat | dog | cow'
```

You may have to read code resembling the examples above, albeit with more relevant data. For that reason, it’s important to recognize those constructs. Nevertheless, those constructs have equivalent alternatives that are considered more Pythonic. In [Alternatives to Lambdas](#alternatives-to-lambdas), you’ll learn how to convert higher-order functions and their accompanying lambdas into other more idiomatic forms.

### Key Functions

Key functions in Python are higher-order functions that take a parameter `key` as a named argument. `key` receives a function that can be a `lambda`. This function directly influences the algorithm driven by the key function itself. Here are some key functions:

- **`sort()`:** list method
- **`sorted()`, `min()`, `max()`:** built-in functions
- **`nlargest()` and `nsmallest()`:** in the Heap queue algorithm module [**`heapq`**](/realpython.com/python-heapq-module.md)

Imagine that you want to sort a list of IDs represented as strings. Each ID is the [**concatenation**](/realpython.com/python-string-concatenation.md) of the string `id` and a number. Sorting this list with the built-in function `sorted()`, by default, uses a lexicographic order as the elements in the list are strings.

To influence the sorting execution, you can assign a lambda to the named argument `key`, such that the sorting will use the number associated with the ID:

```py
ids = ['id1', 'id2', 'id30', 'id3', 'id22', 'id100']
print(sorted(ids)) # Lexicographic sort 
#
# ['id1', 'id100', 'id2', 'id22', 'id3', 'id30']
sorted_ids = sorted(ids, key=lambda x: int(x[2:])) # Integer sort
print(sorted_ids)
#
# ['id1', 'id2', 'id3', 'id22', 'id30', 'id100']
```

### UI Frameworks

UI frameworks like [**Tkinter**](/realpython.com/python-gui-tkinter.md), [<VPIcon icon="fas fa-globe"/>wxPython](https://wxpython.org/), or .NET Windows Forms with [<VPIcon icon="fas fa-globe"/>IronPython](https://ironpython.net/) take advantage of lambda functions for mapping actions in response to UI events.

The naive Tkinter program below demonstrates the usage of a `lambda` assigned to the command of the *Reverse* button:

```py{13} :collapsed-lines
import tkinter as tk
import sys

window = tk.Tk()
window.grid_columnconfigure(0, weight=1)
window.title("Lambda")
window.geometry("300x100")
label = tk.Label(window, text="Lambda Calculus")
label.grid(column=0, row=0)
button = tk.Button(
    window,
    text="Reverse",
    command=lambda: label.configure(text=label.cget("text")[::-1]),
)
button.grid(column=0, row=1)
window.mainloop()
```

Clicking the button *Reverse* fires an event that triggers the lambda function, changing the label from *Lambda Calculus* to *suluclaC adbmaL*\*:

![Animated TkInter Windows demonstrating the action of the button to the text](https://files.realpython.com/media/tkinter_lambda.be4b6259769e.gif)

Both wxPython and IronPython on the .NET platform share a similar approach for handling events. Note that `lambda` is one way to handle firing events, but a function may be used for the same purpose. It ends up being self-contained and less verbose to use a `lambda` when the amount of code needed is very short.

To explore wxPython, check out [**How to Build a Python GUI Application With wxPython**](/realpython.com/python-gui-with-wxpython.md).

### Python Interpreter

When you’re playing with Python code in the interactive interpreter, Python lambda functions are often a blessing. It’s easy to craft a quick one-liner function to explore some snippets of code that will never see the light of day outside of the interpreter. The lambdas written in the interpreter, for the sake of speedy discovery, are like scrap paper that you can throw away after use.

### `timeit`

In the same spirit as the experimentation in the Python interpreter, the module `timeit` provides functions to time small code fragments. `timeit.timeit()` in particular can be called directly, passing some Python code in a string. Here’s an example:

```py
from timeit import timeit
timeit("factorial(999)", "from math import factorial", number=10)
# 
# 0.0013087529951008037
```

When the statement is passed as a string, `timeit()` needs the full context. In the example above, this is provided by the second argument that sets up the environment needed by the main function to be timed. Not doing so would raise a `NameError` exception.

Another approach is to use a `lambda`:

```py
from math import factorial
timeit(lambda: factorial(999), number=10)
# 
# 0.0012704220062005334
```

This solution is cleaner, more readable, and quicker to type in the interpreter. Although the execution time was slightly less for the `lambda` version, executing the functions again may show a slight advantage for the `string` version. The execution time of the `setup` is excluded from the overall execution time and shouldn’t have any impact on the result.

### Monkey Patching

For testing, it’s sometimes necessary to rely on repeatable results, even if during the normal execution of a given software, the corresponding results are expected to differ, or even be totally random.

Let’s say you want to test a function that, at runtime, handles [**random values**](/realpython.com/python-random.md). But, during the testing execution, you need to assert against predictable values in a repeatable manner. The following example shows how, with a `lambda` function, monkey patching can help you:

```py{14}
from contextlib import contextmanager
import secrets

def gen_token():
    """Generate a random token."""
    return f'TOKEN_{secrets.token_hex(8)}'

@contextmanager
def mock_token():
    """Context manager to monkey patch the secrets.token_hex
    function during testing.
    """
    default_token_hex = secrets.token_hex
    secrets.token_hex = lambda _: 'feedfacecafebeef'
    yield
    secrets.token_hex = default_token_hex

def test_gen_token():
    """Test the random token."""
    with mock_token():
        assert gen_token() == f"TOKEN_{'feedfacecafebeef'}"

test_gen_token()
```

A context manager helps with insulating the operation of monkey patching a function from the standard library ([<VPIcon icon="fa-brands fa-python"/>`secrets`](https://docs.python.org/3/library/secrets.html#module-secrets), in this example). The lambda function assigned to `secrets.token_hex()` substitutes the default behavior by returning a static value.

This allows testing any function depending on `token_hex()` in a predictable fashion. Prior to exiting from the context manager, the default behavior of `token_hex()` is reestablished to eliminate any unexpected side effects that would affect other areas of the testing that may depend on the default behavior of `token_hex()`.

Unit test frameworks like `unittest` and `pytest` take this concept to a higher level of sophistication.

With [**`pytest`**](/realpython.com/pytest-python-testing.md), still using a `lambda` function, the same example becomes more elegant and concise :

```py{7}
import secrets

def gen_token():
    return f'TOKEN_{secrets.token_hex(8)}'

def test_gen_token(monkeypatch):
    monkeypatch.setattr('secrets.token_hex', lambda _: 'feedfacecafebeef')
    assert gen_token() == f"TOKEN_{'feedfacecafebeef'}"
```

With the [<VPIcon icon="fas fa-globe"/>pytest `monkeypatch` fixture](https://docs.pytest.org/en/latest/monkeypatch.html), `secrets.token_hex()` is overwritten with a lambda that will return a deterministic value, `feedfacecafebeef`, allowing to validate the test. The pytest `monkeypatch` fixture allows you to control the scope of the override. In the example above, invoking `secrets.token_hex()` in subsequent tests, without using monkey patching, would execute the normal implementation of this function.

Executing the `pytest` test gives the following result:

```sh
pytest test_token.py -v
#
# ============================= test session starts ==============================
# platform linux -- Python 3.7.2, pytest-4.3.0, py-1.8.0, pluggy-0.9.0
# cachedir: .pytest_cache
# rootdir: /home/andre/AB/tools/bpython, inifile:
# collected 1 item
# 
# test_token.py::test_gen_token PASSED                                     [100%]
# 
# =========================== 1 passed in 0.01 seconds ===========================
```

The test passes as we validated that the `gen_token()` was exercised, and the results were the expected ones in the context of the test.

---

## Alternatives to Lambdas

While there are great reasons to use `lambda`, there are instances where its use is frowned upon. So what are the alternatives?

Higher-order functions like `map()`, `filter()`, and `functools.reduce()` can be converted to more elegant forms with slight twists of creativity, in particular with list comprehensions or generator expressions.

To learn more about list comprehensions, check out [**When to Use a List Comprehension in Python**](/realpython.com/list-comprehension-python.md). To learn more about generator expressions, check out [**How to Use Generators and yield in Python**](/realpython.com/introduction-to-python-generators.md).

### Map

The built-in function `map()` takes a function as a first argument and applies it to each of the elements of its second argument, an **iterable**. Examples of iterables are strings, lists, and tuples. For more information on iterables and iterators, check out [**Iterables and Iterators**](/realpython.com/looping-over-iterables/README.md).

`map()` returns an iterator corresponding to the transformed collection. As an example, if you wanted to transform a list of strings to a new list with each string capitalized, you could use `map()`, as follows:

```py
list(map(lambda x: x.capitalize(), ['cat', 'dog', 'cow']))
#
# ['Cat', 'Dog', 'Cow']
```

You need to invoke `list()` to convert the iterator returned by `map()` into an expanded list that can be displayed in the Python shell interpreter.

Using a list comprehension eliminates the need for defining and invoking the lambda function:

```py
[x.capitalize() for x in ['cat', 'dog', 'cow']]
#
# ['Cat', 'Dog', 'Cow']
```

### Filter

The built-in function `filter()`, another classic functional construct, can be converted into a list comprehension. It takes a [<VPIcon icon="fa-brands fa-wikipedia-w"/>predicate](https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)) as a first argument and an iterable as a second argument. It builds an iterator containing all the elements of the initial collection that satisfies the predicate function. Here’s an example that filters all the even numbers in a given list of integers:

```py
even = lambda x: x%2 == 0
list(filter(even, range(11)))
#
# [0, 2, 4, 6, 8, 10]
```

Note that `filter()` returns an iterator, hence the need to invoke the built-in type [**`list`**](/realpython.com/python-list/README.md) that constructs a list given an iterator.

The implementation leveraging the list comprehension construct gives the following:

```py
[x for x in range(11) if x%2 == 0]
#
# [0, 2, 4, 6, 8, 10]
```

### Reduce

Since Python 3, [**`reduce()`**](/realpython.com/python-reduce-function.md) has gone from a built-in function to a `functools` module function. As `map()` and `filter()`, its first two arguments are respectively a function and an iterable. It may also take an initializer as a third argument that is used as the initial value of the resulting accumulator. For each element of the iterable, `reduce()` applies the function and accumulates the result that is returned when the iterable is exhausted.

To apply `reduce()` to a list of pairs and calculate the sum of the first item of each pair, you could write this:

```py
import functools
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
functools.reduce(lambda acc, pair: acc + pair[0], pairs, 0)
#
# 6
```

A more idiomatic approach using a [<VPIcon icon="fa-brands fa-python"/>generator expression](https://python.org/dev/peps/pep-0289/), as an argument to [**`sum()`**](/realpython.com/python-sum-function.md) in the example, is the following:

```py
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
sum(x[0] for x in pairs)
#
# 6
```

A slightly different and possibly cleaner solution removes the need to explicitly access the first element of the pair and instead use unpacking:

```py
pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
sum(x for x, _ in pairs)
#
# 6
```

The use of underscore (`_`) is a Python convention indicating that you can ignore the second value of the pair.

`sum()` takes a unique argument, so the generator expression does not need to be in parentheses.

---

## Are Lambdas Pythonic or Not?

[<VPIcon icon="fa-brands fa-python"/>PEP 8](https://python.org/dev/peps/pep-0008/), which is the style guide for Python code, reads:

::: info

Always use a `def` statement instead of an assignment statement that binds a lambda expression directly to an identifier. ([<VPIcon icon="fa-brands fa-python"/>Source](https://python.org/dev/peps/pep-0008/#programming-recommendations))

<SiteInfo
  name="PEP 8 - Style Guide for Python Code | peps.python.org"
  desc="This document gives coding conventions for the Python code comprising the standard library in the main Python distribution.  Please see the companion informational PEP describing style guidelines for the C code in the C implementation of Python."
  url="https://peps.python.org/pep-0008/"
  logo="https://peps.python.org/_static/py.png"
  preview="https://peps.python.org/_static/og-image.png"/>

:::

This strongly discourages using lambda bound to an identifier, mainly where functions should be used and have more benefits. PEP 8 does not mention other usages of `lambda`. As you have seen in the previous sections, lambda functions may certainly have good uses, although they are limited.

A possible way to answer the question is that lambda functions are perfectly Pythonic if there is nothing more Pythonic available. I’m staying away from defining what “Pythonic” means, leaving you with the definition that best suits your mindset, as well as your personal or your team’s coding style.

Beyond the narrow scope of Python `lambda`, [**How to Write Beautiful Python Code With PEP 8**](/realpython.com/python-pep8.md) is a great resource that you may want to check out regarding code style in Python.

---

## Conclusion

You now know how to use Python `lambda` functions and can:

- Write Python lambdas and use anonymous functions
- Choose wisely between lambdas or normal Python functions
- Avoid excessive use of lambdas
- Use lambdas with higher-order functions or Python key functions

If you have a penchant for mathematics, you may have some fun exploring the fascinating world of [<VPIcon icon="fa-brands fa-wikipedia-w"/>lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

Python lambdas are like salt. A pinch in your spam, ham, and eggs will enhance the flavors, but too much will spoil the dish.

::: info Quiz - Python Lambda Functions

Python lambdas are little, anonymous functions, subject to a more restrictive but more concise syntax than regular Python functions. Test your understanding on how you can use them better!

<SiteInfo
  name="Python Lambda Functions Quiz - Real Python"
  desc="Python lambdas are little, anonymous functions, subject to a more restrictive but more concise syntax than regular Python functions. Test your understanding on how you can use them better!"
  url="https://realpython.com/quizzes/python-lambda/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Lambda-Functions_Watermarked.2afa4f5ea5d4.jpg"/>

:::

::: note

The Python programming language, named after Monty Python, prefers to use [<VPIcon icon="fa-brands fa-wikipedia-w"/>`spam`](https://en.wikipedia.org/wiki/Spam_%28Monty_Python%29), `ham`, and `eggs` as metasyntactic variables, instead of the traditional `foo`, `bar`, and `baz`.

:::

Watch Now This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: [**Using Python Lambda Functions**](/realpython.com/python-lambda-functions/README.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Python Lambda Functions",
  "desc": "In this step-by-step tutorial, you'll learn about Python lambda functions. You'll see how they compare with regular functions and how you can use them in accordance with best practices.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-lambda.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
