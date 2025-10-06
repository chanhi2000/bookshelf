---
lang: en-US
title: "How to Use Pytest: A Simple Guide to Testing in Python"
description: "Article(s) > How to Use Pytest: A Simple Guide to Testing in Python"
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
      content: "Article(s) > How to Use Pytest: A Simple Guide to Testing in Python"
    - property: og:description
      content: "How to Use Pytest: A Simple Guide to Testing in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-pytest-a-guide-to-testing-in-python.html
prev: /programming/py/articles/README.md
date: 2025-07-09
isOriginal: false
author:
  - name: Olowo Jude
    url : https://freecodecamp.org/news/author/Jude-Olowo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752007334998/e196493e-f3e0-4e63-b6eb-ce66c5481d9c.png
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
  name="How to Use Pytest: A Simple Guide to Testing in Python"
  desc="With the recent advancements in AI, tools like ChatGPT have made the development process faster and more accessible. Developers can now write code and build web apps with some well-articulated prompts and careful code reviews. While this brings an in..."
  url="https://freecodecamp.org/news/how-to-use-pytest-a-guide-to-testing-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752007334998/e196493e-f3e0-4e63-b6eb-ce66c5481d9c.png"/>

With the recent advancements in AI, tools like ChatGPT have made the development process faster and more accessible. Developers can now write code and build web apps with some well-articulated prompts and careful code reviews.

While this brings an increase in productivity, there's a growing downside. AI-generated code is prone to errors, unexpected bugs, or poor integration with the rest of your code.

Because of these risks, it’s more important than ever to establish robust testing practices to make sure your code is high quality and properly functioning. Various testing tools are available to help solve these challenges, and Pytest stands out in the Python ecosystem for its simplicity, flexibility, and powerful features.

In this article, we'll explore the following topics:

By the end of this article, you will have a comprehensive knowledge of Pytest and be able to use it in your Python development process.

---

::: note Prerequisites

- Must have Python installed
- An understanding of the Python programming language

:::

---

## Why Use Pytest?

![An image of pytest logo.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751221734601/f5d6093a-37d2-4d49-85f2-c1a41a98ab67.png)

Pytest is a popular testing framework for Python that makes it easy to write and run tests. Unlike unittest and other Python testing frameworks, Pytest’s simple syntax allows developers to write tests directly as functions or within classes. This lets you write clean, readable code without complexities.

Pytest also supports popular Python frameworks like Flask, Django, and more. Combined with other rich features, Pytest equips you with the tools you need to ship reliable software in today’s AI-driven era.

Key features of Pytest that make it a preferred testing tool include:

- **Flexibility:** Pytest provides flexibility in test structure by supporting tests for functions, classes, and modules.
- **Detailed test output:** Pytest provides a detailed and readable test output, making it easy to understand test failures and errors.
- **Automatic test discovery:** Pytest automatically discovers tests by looking for files that start with "`test_`" or end with "<VPIcon icon="fa-brands fa-python"/>`_test.py`". This eliminates the need for manually specifying test files.
- **Parameterization:** Pytest supports parameterized tests, which allow you to run a single test function with multiple sets of inputs.
- **Fixtures:** Pytest fixtures provide `setup` and `tearDown` methods that help prevent code repetition. This enables you to set up baseline conditions for your tests and also delete them after each test.
- **Plugins and extensions:** Pytest has a rich ecosystem of plugins and extensions that add extra functionalities, such as detailed tests reporting, and integration with other tools and Python frameworks like Django and Flask.
- **Compatibility:** Pytest is compatible with other testing frameworks like `unittest` , allowing you to migrate tests from different testing frameworks and run them seamlessly on Pytest.

---

## How to Write Your First Tests with Pytest

This section will guide you through writing your first set of tests using the Pytest framework.

Pytest is a Python package, and you’ll need to install it before using it. You can do that with the following command:

```sh
pip install pytest
```

::: note

Following Python's best practices, it’s recommended you install Pytest within a virtual environment. [Here's a guide](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/) to help you set it up.

```component VPCard
{
  "title": "Install packages in a virtual environment using pip and venv - Python Packaging User Guide",
  "desc": "This guide discusses how to create and activate a virtual environment using the standard library’s virtual environment tool venv and install packages. The guide covers how to:",
  "link": "https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments//",
  "logo": "https://packaging.python.org/_static/py.png",
  "background": "rgba(0,176,255,0.2)"
}
```

:::

Next, create a Python file where you will write your tests and import Pytest into it using:

```py
import pytest
```

Pytest has 2 basic methods of writing tests, which include:

### The function-based method

This method is straightforward for writing tests because you write the tests in individual functions.

::: note

Each function name must be prefixed with the word `test_` for Pytest to discover and run these tests automatically.

Here’s an example of a function-based test:

```py
def test_addition():
    assert 1 + 1 == 2
```

In the code above, the `assert` statement used here in Pytest is Python’s built-in “`assert`”. It’s more convenient and doesn’t require the specific methods like `assertEqual` and `assertTrue` which are common with unittest. Another advantage of using the `assert` statement is that it provides more detailed error messages when an assertion fails.

:::

### Class-based method

This method is similar to the way of writing tests in `unittest`, except that your test class does not inherit any methods. An example is shown below:

```py
class TestMathOperations:
    def test_addition(self):
        assert 1 + 1 == 2
```

This method of writing tests in Pytest is useful when you want to group related tests together.

---

## How to Run Pytest Tests

Running Pytest differs slightly from the normal convention of running regular Python scripts.

The general method of running Pytest tests is by running the `pytest` command in your terminal. Pytest will automatically look for and run all files of the form `test_*.py` or <VPIcon icon="fa-brands fa-python"/>`*_test.py` in the current directory and subdirectories. But while this may be a great way to run tests, Pytest offers more flexibility beyond this general method of running tests.

Depending on preferences, you may want to run your test files based on the following:

1. **To run a specific test file**: To run tests in a specific file, use the `pytest` command followed by the file name. For example: `pytest test_example.py`.
2. **To run tests in a directory:** Let’s say you have a directory named Tests that contains some test files. To run all the tests in that directory, use the `pytest` command followed by the directory and a forward slash. For example: `pytest Tests/`.
3. **To run tests using specific keywords:** To run tests based on a certain keyword, use the command `pytest -k "keyword"`. Pytest will automatically look for and run function names, class names, or file names matching that keyword in the current directory and subdirectories. But to run tests matching a certain keyword in a specific file, you’d have to specify the file name after the `pytest` command. For example: `pytest test_example.py -k "keyword"`.
4. **Run a specific test within a test file:** To run only a specific test inside a test file, use the command `pytest test_example.py::test_addition`. This will run only the `test_addition` test function within the <VPIcon icon="fa-brands fa-python"/>`test_example.py` module.
5. **To run all test methods in a specific class**: To run all the tests within a specific class, use `pytest test_example.py::TestClass`. This command would run all the test methods inside the `TestClass` class in the <VPIcon icon="fa-brands fa-python"/>`test_example.py` module.
6. **To run a specific test method inside a specific class:** To run a specific test inside a specific class, use `pytest test_example.py::TestClass::test_addition`. This command would run the specific `test_addition` method within the `TestClass` class in the <VPIcon icon="fa-brands fa-python"/>`test_example.py` module.

---

## How to Interpret Pytest Results

One major advantage Pytest has over other Python testing frameworks is the rich output it provides, which gives very detailed information about the status of your tests.

Let’s use a basic test to understand how to interpret Pytest’s output:

```py
import pytest

def test_addition():
    assert 1 + 1 == 3
```

Run this test, and we get an output similar to the one below:

```plaintext title="output"
============================== test session starts ====================================
platform win32 -- Python 3.10.5, pytest-8.4.1, pluggy-1.6.0
rootdir: C:\\Users\\hp\\Desktop\\Pytest
collected 1 items

                                                                                  [ 50%]
test_example.py F                                                                 [100%]

===================================== FAILURES =========================================
____________________________________test_addition ______________________________________

    def test_addition():
>       assert 1 + 1 == 3
E       assert (1 + 1) == 3

test_example.py:4: AssertionError
============================== short test summary info =================================
FAILED test_example.py::test_addition - assert (1 + 1) == 3
========================= 1 failed, 1 passed in 0.13s ==================================
```

The above output is divided into several sections. Here’s a breakdown of what each section means:

### 1. Test session information

```plaintext title="output"
=============================== test session starts ===============================
platform win32 -- Python 3.10.5, pytest-8.4.1, pluggy-1.6.0
rootdir: C:\\Users\\hp\\Desktop\\TDD pytest
collected 1 item
```

- This section displays a summary of the test environment. It begins with a line marker that indicates the beginning of the test session.
- Below the marker, pytest displays information about the operating system, along with the installed versions of Python, pytest and pluggy. (Pluggy is a Pytest dependency used to manage plugins.)
- The next line indicates the root directory where the test is being run.
- The last line in this section displays the number of tests found in this directory.

### 2. Test status

```plaintext title="output"
test_example.py F                                                              [100%]

================================== FAILURES =========================================
________________________________ test_addition ______________________________________

    def test_addition():
>       assert 1 + 1 == 3
E       assert (1 + 1) == 3

test_example.py:4: AssertionError
```

- This section displays information about the status of our tests
- The first line in this section specifies the test file which is being run, followed by the status (F in this case, which indicates a test failure).
- The next set of lines gives specific information about the failed tests. This includes the function where the failure occurred (`test_addition`), and the exact line of code responsible for the error.
- The last line gives a concise summary of this section. It indicates that the error occurred in <VPIcon icon="fa-brands fa-python"/>`test_example.py` on line `4` and it was an `AssertionError`.

### 3. Test summary

```plaintext title="output"
 ============================= short test summary info =============================
 FAILED test_example.py::test_addition - assert (1 + 1) == 3
 ================================ 1 failed in 0.13s ================================
```

- This section provides an overall summary of the test.
- It indicates that the failed test occurred in <VPIcon icon="fa-brands fa-python"/>`test_example.py` file in the `test_addition` function because of an incorrect assertion `(1 + 1) == 3` which isn’t true.

Edit the code with the correct assertion `assert(1 + 1) == 2` and rerun the code. This time, the code passes with a different output.

```plaintext title="output"
=============================== test session starts ==================================
platform win32 -- Python 3.10.5, pytest-8.3.2, pluggy-1.5.0
rootdir: C:\\Users\\hp\\Desktop\\TDD pytest
collected 1 items

test_example.py .                                                               [100%]

=============================== 1 passed in 0.01s =================================
```

### How to Handle Exceptions in Pytest

Exceptions are unexpected errors that occur while running our tests, and they prevent our code from performing as expected. As a result, Pytest offers several built-in mechanisms for handling these exceptions (but we’ll just cover one of them in this article).

`pytest.raises` **Context Manager** is a tool that checks if your code raises specific exceptions. If the specified exception is raised, that test passes, confirming that the expected error occurred. But if the specified exception is not raised, that test fails.

::: tip Usage Examples of <code>pytest.raises</code>

**1. Checking for `ValueError`**

In Python, a `ValueError` is raised when a function receives an argument with an incorrect value. In the example below, we can verify that a `ValueError` is raised when attempting to calculate the square root of a negative number.

```py
import pytest
import math

def calculate_square_root(value):
    if value < 0:
        raise ValueError("Cannot calculate the square root of a negative number")
    return math.sqrt(value)

def test_calculate_square_root():
    with pytest.raises(ValueError):
        calculate_square_root(-1)
```

**2. Checking for `ZeroDivisionError`**

Dividing a number by zero raises a `ZeroDivisionError`. In this example, we check that this error is raised when dividing a number by zero.

```py
import pytest

def divide_numbers(numerator, denominator):
    return numerator / denominator

def test_divide_numbers():
    with pytest.raises(ZeroDivisionError):
        divide_numbers(10, 0)
```

**3. Checking for `TypeError`**

A `TypeError` is raised when an operation is applied to an object of an inappropriate type. Here, we check that this error is raised when adding incompatible data types, such as a string and an integer given in the example.

```py
import pytest
    
def add_numbers(a, b):
    return a + b
    
def test_add_numbers():
    with pytest.raises(TypeError):
        add_numbers("10", 5)
```

**4. Checking for `KeyError`**

A `KeyError` is raised when we try to access a dictionary key that doesn’t exist. We can verify and handle this error using the following code:

```py
import pytest
    
def get_value(dictionary, key):
    return dictionary[key]
    
def test_get_value():
    with pytest.raises(KeyError):
        get_value({"name": "Alice"}, "age")
```

:::

---

## Advanced Pytest Features

As a robust testing framework, Pytest offers some advanced features that help you manage complex test scenarios. In this section, we will explore some of these advanced features at a beginner-friendly level and demonstrate how you can start applying them in your tests.

### 1. Pytest Markers

When working with a large codebase, sometimes running every single test can be time-consuming. This is where Pytest markers come in handy.

A marker is just like a label that you can attach to a test function to categorise it. Once a test is labelled, you can instruct Pytest to run only tests with certain markers. For example, you may label some tests as "slow" if they take longer to execute and run them separately from the faster ones.

One advantage to using Markers is that it allows you to run specific tests based on categories or specific parameters, and also skip tests if certain conditions aren’t met.

Pytest comes along with some built-in markers that can be quite useful:

#### 1. `@pytest.mark.skip`

This marker allows you to skip a test unconditionally, and can be useful when you know a test will fail due to an external issue or incomplete code.

::: tip Example:

```py
@pytest.mark.skip(reason="Feature not yet implemented")
def test_feature():
    pass
```

:::

#### 2. `@pytest.mark.skipif`

This marker allows you to skip a test conditionally if certain conditions are met.

::: tip Example

```py
import sys
    
@pytest.mark.skipif(sys.platform == "win32", reason="does not run on windows")
class TestClass:
    def test_function(self):
        "This test will not run under 'win32' platform"
```

:::

#### 3. `@pytest.mark.xfail`

This marker is attached to tests that are expected to fail, probably due to a bug or incomplete feature. So when Pytest runs such tests, it won’t count it as a failure.

::: tip Example

```py
@pytest.mark.xfail(reason="division by zero not handled yet")
def test_divide_by_zero():
    assert divide(10, 0) == 0
```

:::

::: note

Detailed information about skipped/failed tests is not shown by default to avoid cluttering the output.

:::

While Pytest comes along with some built-in markers, you can also create your own custom marker (but we won’t cover that in this tutorial). Kindly refer to the documentation for more information on [<VPIcon icon="fas fa-globe"/>working with custom markers](https://docs.pytest.org/en/stable/example/markers.html)

### 2. Pytest Fixtures

In Pytest, fixtures allow you to create reusable default data that can be shared across multiple tests. By using fixtures, you can reduce code repetition, making your tests cleaner and more maintainable.

In Pytest, fixtures are defined with the `@pytest.fixture` decorator as shown in the example below:

Let’s say we have several tests that rely on a list of user data. Instead of repeating the same data in each test, we can create a fixture to hold this data, and the fixture is passed across the tests that need it.

```py
import pytest

@pytest.fixture
def user_data():
    return [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25},
        {"name": "Charlie", "age": 35}
    ]

# Test function to check for a specific user by name and age
def test_user_exists(user_data):
    user = {"name": "Alice", "age": 30}

    # Check if the target user is in the list
    assert user in user_data

# Test average age of users
def test_average_age(user_data):
    ages = [user["age"] for user in user_data]
    avg_age = sum(ages) / len(ages)
    assert avg_age == 30
```

::: note

The `@pytest.fixture` decorator in the code above marks the `user_data` function as a fixture in Pytest. This fixture provides reusable data that can be shared across multiple test functions, allowing them to share the same setup without repeating code.

:::

### 3. Parametrization

Parametrization is a Pytest feature that allows you to run a test function with different sets of data at once.

For example: Let’s say you have a function that calculates the square of a number. To provide enough coverage while testing, you would want to test the function with zero, positive, and negative numbers.

Instead of writing separate test functions for each scenario, you can use parametrization to run a test function with different sets of data at once. This approach is more concise, and reduces code duplication.

To use parametrization in Pytest, we use the `@pytest.mark.parametrize` decorator as shown in the example below:

```py
import pytest

# Function to calculate the square of a number
def square_numbers(num):
    return num * num

#Parametrize decorator to test the square function with different inputs
@pytest.mark.parametrize("input_value, expected_output", [
    (2, 4),     
    (-3, 9),    
    (0, 0)    
])

def test_square(input_value, expected_output):
    assert square_numbers(input_value) == expected_output
```

In the example above, the different input values and expected values are listed in the `@pytest.mark.parametrize` decorator. We’re testing the `square_numbers()` function with three different input values: `2`, `-3`, and `0`.

For each value, Pytest calls the `test_square()` function and compares the result of `square_numbers(input_value)` to `expected_output`.

This approach is more efficient and ensures the function behaves as expected across a variety of cases.

### 4. Pytest Plugins

Plugins are an extension mechanism that allows you to add new functionality to Pytest or modify its existing behaviour. These plugins work by providing additional features that extend Pytest's capabilities, which can be useful, especially in complex test scenarios.

Pytest has a vast ecosystem of plugins, each designed to suit your different testing needs. You can find the full list of available plugins on [<VPIcon icon="iconfont icon-pypi"/>PyPI](https://pypi.org/) in the [<VPIcon icon="fas fa-globe"/>Pytest Plugin List](https://docs.pytest.org/en/stable/reference/plugin_list.html#plugin-list).

To use a plugin, simply install it with `pip`.

::: tip For example

```sh
pip install <pytest-NAME>
pip uninstall <pytest-NAME>
```

:::

::: note

`NAME` in the code above should be replaced with the name of the plugin you want to install.

:::

After installing a plugin, Pytest automatically finds and integrates it. There’s no need for any additional configuration.

In this section, we explored some of Pytest's advanced features. By leveraging these features, you can now significantly improve the quality of your tests by ensuring they’re more efficient, scalable, and easier to maintain over time.

---

## Conclusion

In this article, you’ve learned the basics of testing with Pytest, from writing and interpreting tests to handling exceptions and using advanced features like fixtures and parametrization.

Whether your code is written manually or generated by AI, learning how to write tests empowers you to detect bugs early, and build more reliable software. Testing acts as a safety net that boosts you confidence during development and ensures your code works as expected.

If you're ready to go a step further, I’ve written an in-depth article on [<VPIcon icon="fas fa-globe"/>Test Driven Development in Python](https://judeolowo.hashnode.dev/test-driven-development-in-python-a-complete-guide-to-unittest). It is a powerful approach where writing tests guides your entire coding process.

If you found this helpful, let me know, share it with your network, or give it a like to help others discover it too.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Pytest: A Simple Guide to Testing in Python",
  "desc": "With the recent advancements in AI, tools like ChatGPT have made the development process faster and more accessible. Developers can now write code and build web apps with some well-articulated prompts and careful code reviews. While this brings an in...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-pytest-a-guide-to-testing-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
