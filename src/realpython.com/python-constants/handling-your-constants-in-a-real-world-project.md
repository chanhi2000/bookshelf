---
lang: en-US
title: "Handling Your Constants in a Real-World Project"
description: "Article(s) > (4/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (4/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Handling Your Constants in a Real-World Project"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/handling-your-constants-in-a-real-world-project.html
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
  url="https://realpython.com/python-constants#handling-your-constants-in-a-real-world-project"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

Now that you know how to create constants in Python, it’s time to learn how to handle and organize them in a real-world project. You can use several approaches or strategies to this end. For example, you can put your constants in:

- The **same file as the code** that uses them
- A **dedicated module** for project-wide constants
- A **configuration file**
- Some **environment variables**

In the following sections, you’ll write some practical examples that demonstrate the above strategies for managing constants appropriately.

---

## Putting Constants Together With Related Code

The first and maybe most natural strategy to organize and manage your constants is to define them together with the code that uses them. With this approach, you’ll be defining the constants at the top of the module that contains the related code.

For example, say that you’re creating a custom module to perform calculations, and you need to use math constants like Pi, Euler’s number, and a few others. In this case, you can do something like this:

```py title="calculations.py"
"""This module implements custom calculations."""

# Imports go here...
import numpy as np

# Constants go here...
PI = 3.141592653589793
EULER_NUMBER = 2.718281828459045
TAU = 6.283185307179586

# Your custom calculations start here...
def circular_land_area(radius):
    return PI * radius**2

def future_value(present_value, interest_rate, years):
    return present_value * EULER_NUMBER ** (interest_rate * years)

# ...
```

In this example, you define your constants in the same module where the code using them lives.

::: note

If you want to explicitly communicate that a constant should be used in its containing module only, then you can add a leading underscore (`_`) to its name. For example, you can do something like `_PI = 3.141592653589793`. This leading underscore labels the name as [<FontIcon icon="fa-brands fa-python"/>non-public](https://peps.python.org/pep-0008/#method-names-and-instance-variables), which means that the user’s code shouldn’t use this name directly.

:::

Putting your constants together with the code that uses them is a quick and appropriate strategy for narrow-scope constants that are only relevant to a single module in a given project. In this case, you probably won’t be using the constants outside the containing module itself.

---

## Creating a Dedicated Module for Constants

Another common strategy for organizing and managing your constants is creating a **dedicated module** in which to put them all. This strategy is appropriate for constants that are used in many modules and even packages across a given project.

The central idea of this strategy is to create an intuitive and unique namespace for constants. To apply this strategy to your calculations example, you can create a Python package containing the following files:

```plaintext title="file structure"
calc/
├── __init__.py
├── calculations.py
└── constants.py
```

The <FontIcon icon="fa-brands fa-python"/>`__init__.py` file will turn the <FontIcon icon="fas fa-folder-open"/>`calc/` directory into a Python package. Then you can add the following content to your <FontIcon icon="fa-brands fa-python"/>`constants.py` file:

```py title="constants.py"
"""This module defines project-level constants."""

PI = 3.141592653589793
EULER_NUMBER = 2.718281828459045
TAU = 6.283185307179586
```

Once you’ve added this code to <FontIcon icon="fa-brands fa-python"/>`constants.py`, then you can import the module whenever you need to use any of your constants:

```py{6,9,11} title="calculations.py"
"""This module implements custom calculations."""

# Imports go here...
import numpy as np

from . import constants 
# Your custom calculations start here...
def circular_land_area(radius):
    return constants.PI * radius**2 
def future_value(present_value, interest_rate, years):
    return present_value * constants.EULER_NUMBER ** (interest_rate * years) 
# ...
```

Note that you import the `constants` module directly from the `calc` package using a [**relative import**](/realpython.com/absolute-vs-relative-python-imports.md#relative-imports). Then you use fully qualified names to access any required constants in your calculations. This practice improves your communication of intent. Now it’s completely clear that `PI` and `EULER_NUMBER` are constants in your project because of the `constants` prefix.

To use your `calculations` module, you can do something like this:

```py
from calc import calculations
calculations.circular_land_area(100)
#
# 31415.926535897932

from calc.calculations import circular_land_area
circular_land_area(100)
#
# 31415.926535897932
```

Now your `calculations` module lives inside the `calc` package. This means that if you want to use the functions in `calculations`, then you need to import `calculations` from `calc`. You can also import the functions directly by referencing the package and the module like you did in the second example above.

---

## Storing Constants in Configuration Files

Now say that you want to go further when it comes to externalizing the constants of a given project. You may need to keep all your constants out of your project’s source code. To do this, you can use an external **configuration file**.

Here’s an example of how to move your constants to a configuration file:

```conf title="constants.ini"
[CONSTANTS]
PI=3.141592653589793
EULER_NUMBER=2.718281828459045
TAU=6.283185307179586
```

This file uses the [<FontIcon icon="fa-brands fa-wikipedia-w"/>INI file](https://en.wikipedia.org/wiki/INI_file) format. You can read this type of file using the `configparser` module from the standard library.

Now get back to <FontIcon icon="fa-brands fa-python"/>`calculations.py` and update it to look something like the following:

```py{4,8-9,13,17-20} title="calculations.py"
"""This module implements custom calculations."""

# Imports go here...
from configparser import ConfigParser 

import numpy as np

constants = ConfigParser() 
constants.read("path/to/constants.ini") 

# Your custom calculations start here...
def circular_land_area(radius):
    return float(constants.get("CONSTANTS", "PI")) * radius**2 

def future_value(present_value, interest_rate, years):
    return (
        present_value * float(constants.get(
            "CONSTANTS",
            "EULER_NUMBER"
        ))) ** (interest_rate * years) 

# ...
```

In this example, your code first reads the configuration file and stores the resulting `ConfigParser` object in a global variable, `constants`. You can also name this variable `CONSTANTS` and use it globally as a constant. Then you update your calculations to read the constants from the configuration object itself.

Note that `ConfigParser` objects store the configuration parameters as strings, so you need to use the built-in `float()` function to convert the values into numbers.

This strategy may be beneficial when you’re creating a [**graphical user interface (GUI) app**](/realpython.com/python-pyqt-gui-calculator.md) and need to set some parameters to define the shape and size of the app’s windows when loading and showing the GUI, for example.

---

## Handling Constants as Environment Variables

Another helpful strategy to handle your constants is to define them as **system variables** if you’re on Windows or **environment variables** if you’re on macOS or Linux.

This approach is commonly used to configure [<FontIcon icon="fas fa-globe"/>deployment](https://12factor.net/config) in different environments. You can also use environment variables for constants that imply security risks and shouldn’t be directly committed to the source code. Examples of these types of constants include authentication credentials, API access tokens, and so on.

::: note

You should [be careful](https://blog.diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/) when using environment variables for sensitive information because they may be accidentally exposed in logs or to child processes. All cloud providers offer some kind of [secrets management](https://kubernetes.io/docs/concepts/configuration/secret/) that’s more secure.

:::

To use this strategy, you first must export your constants as environment or system variables in your operating system. There are at least two ways to do this:

1. Manually export the constants in your current [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell](https://en.wikipedia.org/wiki/Shell_(computing)) session
2. Add your constants to the shell’s configuration file

The first technique is pretty quick and practical. You can use it to run some fast tests on your code. For example, say that you need to export an API token as a system or environment variable. In that case, you just need to run the following command:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
set API_TOKEN="593086396372"
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
export API_TOKEN="593086396372"
```

:::

The main drawback of this technique is that your constants will be accessible only from the command-line session in which you defined them. A much better approach is to make your operating system load the constants whenever you fire up a command-line window.

If you’re on Windows, then check out the [**Configuring Environment Variables**](/realpython.com/python-coding-setup-windows.md#configuring-environment-variables) section in [**Your Python Coding Environment on Windows: Setup Guide**](/realpython.com/python-coding-setup-windows.md) to learn how to create system variables. Follow the instructions in this guide and add an `API_TOKEN` system variable with a value of `593086396372`.

If you’re on Linux or macOS, then you can go to your home folder and open your shell’s configuration file. Once you’ve opened that file, add the following line at the end of it:

::: tabs

@tab:active <FontIcon icon="fa-brands fa-linux"/>

```sh title=".bashrc"
export API_TOKEN="593086396372"
```

@tab <FontIcon icon="iconfont icon-macos"/>

```sh title=".zshrc"
export API_TOKEN="593086396372"
```

:::

Linux and macOS automatically load the corresponding shell configuration file whenever you start a terminal or command-line window. This way, you ensure that the `API_TOKEN` variable is always available on your system.

Once you’ve defined the required environment variables for your Python constant, then you need to load them into your code. To do this, you can use the [<FontIcon icon="fa-brands fa-python"/>`environ`](https://docs.python.org/3/library/os.html#os.environ) dictionary from Python’s [<FontIcon icon="fa-brands fa-python"/>`os`](https://docs.python.org/3/library/os.html#module-os) module. The keys and values of `environ` are strings representing the environment variables and their values, respectively.

Your `API_TOKEN` constant is now present in the `environ` dictionary. Therefore, you can read it from there with just two lines of code:

```py
import os

os.environ["API_TOKEN"]
#
# '593086396372'
```

Using environment variables to store constants, and the `os.environ` dictionary to read them into your code, is an effective way of configuring constants that depend on the environment your application is deployed in. It’s particularly useful when working with the cloud, so keep this technique in your Python tool kit.
