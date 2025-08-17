---
lang: en-US
title: "Using Python's pip to Manage Your Projects' Dependencies"
description: "Article(s) > Using Python's pip to Manage Your Projects' Dependencies"
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
      content: "Article(s) > Using Python's pip to Manage Your Projects' Dependencies"
    - property: og:description
      content: "Using Python's pip to Manage Your Projects' Dependencies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/what-is-pip.html
prev: /programming/py/articles/README.md
date: 2024-12-22
isOriginal: false
author:
  - name: Philipp Acsany
    url : https://realpython.com/team/pacsany/
cover: https://files.realpython.com/media/What-is-PIP_Watermarked.4944e95d83ad.jpg
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
  name="Using Python's pip to Manage Your Projects' Dependencies"
  desc="What is pip? In this beginner-friendly tutorial, you'll learn how to use pip, the standard package manager for Python, so that you can install and manage packages that aren't part of the Python standard library."
  url="https://realpython.com/what-is-pip"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-PIP_Watermarked.4944e95d83ad.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="A Beginner's Guide to pip - Real Python"
  desc="What is pip? In this beginner-friendly course, you'll learn how to use pip, the standard package manager for Python, so that you can install and manage additional packages that are not part of the Python standard library."
  url="https://realpython.com/courses/what-is-pip/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-PIP_Watermarked.c46f49dc33f9.jpg"/>

:::

`pip` is the standard package manager for Python, used to install and manage libraries that aren’t part of the Python standard library. You use `pip` to manage dependencies and install packages from the Python Package Index (PyPI).

You can verify if you have `pip` by using commands like `where pip3` on Windows or `which pip3` on Linux and macOS. To install packages listed in a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file, use the command `pip install -r requirements.txt`. This ensures your environment replicates the specified dependencies, maintaining consistency across different setups.

::: info By the end of this tutorial, you’ll understand that

- `pip` stands for **“pip installs packages”**, indicating its primary function.
- `pip` **manages Python packages** that aren’t part of the standard library.
- You should use `pip` whenever you need **external Python packages** for your projects.
- You can **install and uninstall packages** with `pip`.
- You use **requirements files** to manage projects’ dependencies.

:::

You can do a lot with `pip`, but the Python community is very active and has created some neat alternatives to `pip`. You’ll learn about those later in this tutorial.

::: info Quiz - Using Python's pip to Manage Your Projects' Dependencies

<SiteInfo
  name="Using Python's pip to Manage Your Projects' Dependencies Quiz - Real Python"
  desc="In this quiz, you'll test your understanding of Python's standard package manager, pip. You'll revisit the ideas behind pip, important commands, and how to install packages."
  url="https://realpython.com/quizzes/what-is-pip/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-PIP_Watermarked.4944e95d83ad.jpg"/>

In this quiz, you'll test your understanding of Python's standard package manager, pip. You'll revisit the ideas behind pip, important commands, and how to install packages.

:::

---

## Getting Started With `pip`

So, what exactly does `pip` do? [<FontIcon icon="fas fa-globe"/>`pip`](https://pip.pypa.io/en/stable/) is a **package manager** for Python. That means it’s a tool that allows you to install and manage libraries and dependencies that aren’t distributed as part of the standard library. The name **pip** was introduced by Ian Bicking in 2008:

::: info Ian Bicking (<FontIcon icon="fas fa-globe"/>ianbicking.org)

> I’ve finished renaming pyinstall to its new name: pip. The name pip is \[an\] acronym and declaration: pip installs packages.

```component VPCard
{
  "title": "pyinstall is dead, long livepip!",
  "desc": "I’ve finished renaming pyinstall to its new name: pip. The name pip is a acronym and declaration: pip installs packages.",
  "link": "https://ianbicking.org/blog/2008/10/pyinstall-is-dead-long-live-pip.html/",
  "logo": "https://ianbicking.org/favicon.ico",
  "background": "rgba(251,249,241,0.2)"
}
```

:::

Package management is so important that Python’s installers have included `pip` since versions 3.4 and 2.7.9, for Python 3 and Python 2, respectively. Many Python projects use `pip`, which makes it an essential tool for every Pythonista.

The concept of a package manager might be familiar to you if you’re coming from another programming language. [<FontIcon icon="fa-brands fa-firefox"/>JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) uses [<FontIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com/) for package management, [<FontIcon icon="iconfont icon-ruby"/>Ruby](https://ruby-lang.org/en/) uses [<FontIcon icon="iconfont icon-ruby"/>gem](https://rubygems.org/), and the [<FontIcon icon="fa-brands fa-microsoft"/>.NET platform](https://dotnet.microsoft.com/languages) uses [<FontIcon icon="fas fa-globe"/>NuGet](https://nuget.org/). In Python, `pip` has become the standard package manager.

### Finding `pip` on Your System

The Python installer gives you the option to install `pip` when installing Python on your system. In fact, the option to install `pip` with Python is checked by default, so `pip` should be ready for you to use after installing Python.

::: note

On some Linux (Unix) systems like Ubuntu, `pip` comes in a separate package called `python3-pip`, which you need to install with `sudo apt install python3-pip`. It’s not installed by default with the interpreter.

:::

You can verify that `pip` is available by looking for the `pip3` executable on your system. Select your operating system below and use your platform-specific command accordingly:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
where pip3
```

The `where` command on Windows will show you where you can find the executable of `pip3`. If Windows can’t find an executable named `pip3`, then you can also try looking for `pip` without the three (`3`) at the end.

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
which pip3
```

The `which` command on Linux systems and macOS shows you where the `pip3` binary file is located.

:::

On Windows and Unix systems, `pip3` may be found in more than one location. This can happen when you have multiple Python versions installed. If you can’t find `pip` in any location on your system, then you may consider [reinstalling pip](#reinstalling-pip-when-errors-occur).

Instead of running your system `pip` directly, you can also run it as a Python module. In the next section, you’ll learn how.

### Running `pip` as a Module

When you run your system `pip` directly, the command itself doesn’t reveal which Python version `pip` belongs to. This unfortunately means that you could use `pip` to install a package into the site-packages of an old Python version without noticing. To prevent this from happening, you should run `pip` as a Python module:

```sh
python -m pip
```

Notice that you use `python -m` to run `pip`. The `-m` switch tells Python to run a module as an executable of the `python` interpreter. This way, you can ensure that your system default Python version runs the `pip` command. If you want to learn more about this way of running `pip`, then you can read Brett Cannon’s insightful article about [<FontIcon icon="fas fa-globe"/>the advantages of using `python -m pip`](https://snarky.ca/why-you-should-use-python-m-pip/).

::: note

Depending on how you installed Python, your Python executable may have a different name than `python`. You’ll see `python` used in this tutorial, but you may have to adapt the commands to use something like `py` or `python3` instead.

:::

Sometimes you may want to be more explicit and limit packages to a specific project. In situations like this, you should run `pip` inside a **virtual environment**.

### Using `pip` in a Python Virtual Environment

To avoid installing packages directly into your system Python installation, you can use a [**virtual environment**](/realpython.com/python-virtual-environments-a-primer.md). A virtual environment provides an isolated Python interpreter for your project. Any packages that you use inside this environment will be independent of your system interpreter. This means that you can keep your project’s dependencies separate from other projects and the system at large.

Using `pip` inside a virtual environment has three main advantages. You can:

1. Be sure that you’re using the **right Python version** for the project at hand
2. Be confident that you’re referring to the **correct `pip` instance** when running `pip` or `pip3`
3. Use a **specific package version** for your project without affecting other projects

Python has the built-in [`venv`](https://docs.python.org/3/library/venv.html) module for creating virtual environments. This module helps you create virtual environments with an isolated Python installation. Once you’ve activated the virtual environment, then you can install packages into this environment. The packages that you install into one virtual environment are isolated from all other environments on your system.

You can follow these steps to create a virtual environment and verify that you’re using the `pip` module inside the newly created environment:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m venv venv\
venv\Scripts\activate.bat

pip3 --version
#
# pip 24.2 from ...\lib\site-packages\pip (python 3.12)

pip --version
#
# pip 24.2 from ...\lib\site-packages\pip (python 3.12)
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m venv venv/
source venv/bin/activate

pip3 --version
#
# pip 24.2 from .../python3.12/site-packages/pip (python 3.12)

pip --version
#
# pip 24.2 from .../python3.12/site-packages/pip (python 3.12)
```

:::

Here you initialize a virtual environment named `venv` by using Python’s built-in `venv` module. After running the command above, Python creates a directory named <FontIcon icon="fas fa-folder-pen"/>`venv/` in your current working directory. Then, you activate the virtual environment with the `source` command. The parentheses (`()`) surrounding your `venv` name indicate that you successfully activated the virtual environment.

Finally, you check the version of the `pip3` and `pip` executables inside your activated virtual environment. Both point to the same `pip` module, so once your virtual environment is activated, you can use either `pip` or `pip3`. For consistency, you can also continue to use `python -m pip` inside the virtual environment.

### Reinstalling `pip` When Errors Occur

When you run the `pip` command, you may get an error in some cases. Your specific error message will depend on your operating system:

- <FontIcon icon="fa-brands fa-windows"/>: `'pip' is not recognized as an internal or external command, operable program or batch file.`
- <FontIcon icon="fa-brands fa-linux"/>: `bash: pip: command not found`
- <FontIcon icon="iconfont icon-macos"/>: `zsh: command not found: pip`

Error messages like these indicate that something went wrong with the installation of `pip`.

:::: note 

Before you start any troubleshooting when the `pip` command doesn’t work, you can try out using the `pip3` command with the three (`3`) at the end or the `python -m pip` alternative calling `pip` through your Python installation.

:::

Getting errors like the ones shown above can be frustrating because `pip` is vital for installing and managing external packages. Some common problems with `pip` are related to how this tool was installed on your system.

Although the error messages for various systems differ, they all point to the same problem: Your system can’t find `pip` in the locations listed in your [**`PATH`**](/realpython.com/add-python-to-path.md) variable. On Windows, `PATH` is part of the **system variables**. On macOS and Linux, `PATH` is part of the **environment variables**. You can check the contents of your `PATH` variable with this command:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
echo $env:PATH
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
echo $PATH
```

:::

The output of this command will show a list of locations (directories) on your disk where the operating system looks for executable programs. Depending on your system, locations can be separated by a colon (`:`) or a semicolon (`;`).

By default, the directory that contains the `pip` executable should be present in `PATH` after you install Python or create a virtual environment. However, missing `pip` is a common issue. Two [<FontIcon icon="fas fa-globe"/>supported methods](https://pip.pypa.io/en/stable/installation/#supported-methods) can help you install `pip` again and add it to your `PATH`:

1. The [<FontIcon icon="fa-brands fa-python"/>`ensurepip`](https://docs.python.org/3/library/ensurepip.html#module-ensurepip) module
2. The [`get-pip.py` (<FontIcon icon="iconfont icon-github"/>`pypa/get-pip`)](https://github.com/pypa/get-pip) script

The `ensurepip` module has been part of the standard library since Python 3.4. It was added to [<FontIcon icon="fa-brands fa-python"/>provide a straightforward way](https://python.org/dev/peps/pep-0453/) for you to reinstall `pip` if, for example, you skipped it when installing Python or you uninstalled `pip` at some point. Select your operating system below and run `ensurepip` accordingly:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m ensurepip --upgrade
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m ensurepip --upgrade
```

:::

If `pip` isn’t installed yet, then this command installs it in your current Python environment. If you’re in an active virtual environment, then the command installs `pip` into that environment. Otherwise, it installs `pip` globally on your system. The `--upgrade` option ensures that the `pip` version is the same as the one declared in `ensurepip`.

::: note

The `ensurepip` module doesn’t access the Internet. The latest version of `pip` that `ensurepip` can install is the version that’s bundled in your environment’s Python installation. For example, running `ensurepip` with Python 3.12 installs `pip` 24.2. If you want a newer `pip` version, then you’d need to first run `ensurepip`. Afterward, you can update `pip` manually to its latest version.

:::

Another way to fix your `pip` installation is to use the `get-pip.py` script. The `get-pip.py` file contains a full copy of `pip` as an encoded [**ZIP file**](/realpython.com/python-zip-import.md). You can download `get-pip.py` directly from the [<FontIcon icon="fas fa-globe"/>PyPA bootstrap page](https://bootstrap.pypa.io/get-pip.py). Once you have the script on your machine, then you [**run the Python script**](/realpython.com/run-python-scripts.md) like this:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python get-pip.py
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python get-pip.py
```

:::

This script will install the latest version of `pip`, [<FontIcon icon="fas fa-globe"/>`setuptools`](https://setuptools.pypa.io/en/latest/), and [**`wheel`**](/realpython.com/python-wheels.md) in your current Python environment. If you only want to install `pip`, then you can add the `--no-setuptools` and `--no-wheel` options to your command.

If none of the methods above work, then it might be worth trying to download the latest [<FontIcon icon="fa-brands fa-python"/>Python version](https://python.org/downloads/) for your current platform. You can follow the [**Python Installation & Setup Guide**](/realpython.com/installing-python.md) to make sure that `pip` is appropriately installed and works without errors.

---

## Installing Packages With `pip`

Python is considered a [<FontIcon icon="fa-brands fa-python"/>batteries included](https://python.org/dev/peps/pep-0206/#id3) language. This means that the [<FontIcon icon="fa-brands fa-python"/>Python standard library](https://docs.python.org/3/py-modindex.html) contains an extensive set of [**packages and modules**](/realpython.com/python-modules-packages.md) to help developers with their coding projects.

At the same time, Python has an active community that contributes an even more extensive set of packages that can help you with your development needs. These packages are published to the [<FontIcon icon="fa-brands fa-python"/>Python Package Index](https://pypi.org/), also known as **PyPI** (pronounced *Pie Pea Eye*).

::: note

When you’re installing third-party packages, you have to be careful. Check out [**How to Evaluate the Quality of Python Packages**](/realpython.com/python-package-quality.md) for a full guide to ensuring your packages are trustworthy.

:::

PyPI hosts an extensive collection of packages, including development frameworks, tools, and libraries. Many of these packages provide friendly interfaces to the Python standard library’s functionality.

### Using the Python Package Index (PyPI)

One of the many packages that PyPI hosts is called [**`requests`**](/realpython.com/python-requests.md). The `requests` library helps you to [**interact with web services**](/realpython.com/api-integration-in-python.md) by abstracting the complexities of [<FontIcon icon="fa-brands fa-wikipedia-w"/>HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) requests. You can learn all about `requests` on its official [<FontIcon icon="fa-brands fa-python"/>documentation site](http://docs.python-requests.org/en/master/).

When you want to use the `requests` package in your project, you must first install it into your environment. If you don’t want to install it in your system Python site-packages, then you can create a virtual environment first, as shown above.

Once you’ve created the virtual environment and activated it, then your command-line prompt shows the name of the virtual environment inside the parentheses. Any `pip` commands that you perform from now on will happen inside your virtual environment.

To install packages, `pip` provides an `install` command. You can run it to install the `requests` package:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install requests
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install requests
```

:::

In this example, you run `pip` with the `install` command followed by the name of the package that you want to install. The `pip` command looks for the package in PyPI, resolves its dependencies, and installs everything in your current Python environment to ensure that `requests` will work.

The `pip install <package>` command always looks for the latest version of the package and installs it. It also searches for dependencies listed in the package metadata and installs them to ensure that the package has all the requirements that it needs.

It’s also possible to install multiple packages in a single command:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install rptree codetiming
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install rptree codetiming
```

:::

By chaining the packages `rptree` and `codetiming` in the `pip install` command, you install both packages at once. You can add as many packages as you want to the `pip install` command. In cases like this, a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file can come in handy. Later in this tutorial, you’ll learn how to use a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file to install many packages at once.

::: note

Unless the specific version number of a package is relevant to this tutorial, you’ll notice the version string takes the generic form of `x.y.z`. This is a placeholder format and can stand for `3.1.4`, `2.9`, or any other version number. When you follow along, the output in your terminal will display your actual package version numbers.

:::

You can use the `list` command to display the packages installed in your environment, along with their version numbers:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip list
# 
# Package            Version
# ------------------ ---------
# certifi            x.y.z
# charset-normalizer x.y.z
# codetiming         x.y.z
# idna               x.y.z
# pip                x.y.z
# requests           x.y.z
# rptree             x.y.z
# urllib3            x.y.z
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip list
# 
# Package            Version
# ------------------ ---------
# certifi            x.y.z
# charset-normalizer x.y.z
# codetiming         x.y.z
# idna               x.y.z
# pip                x.y.z
# requests           x.y.z
# rptree             x.y.z
# urllib3            x.y.z
```

:::

The `pip list` command renders a table that shows all installed packages in your current environment. The output above shows the version of the packages using an `x.y.z` placeholder format. When you run the `pip list` command in your environment, `pip` displays the specific version number that you’ve installed for each package.

To get more information about a specific package, you can look at the package’s metadata by using the `show` command in `pip`:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip show requests
# 
# Name: requests
# Version: x.y.z
# Summary: Python HTTP for Humans.
#  ...
# Requires: certifi, idna, charset-normalizer, urllib3
# Required-by:
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip show requests
# 
# Name: requests
# Version: x.y.z
# Summary: Python HTTP for Humans.
#  ...
# Requires: certifi, idna, charset-normalizer, urllib3
# Required-by:
```

:::

The output of this command on your system will list the package’s metadata. The `Requires` line lists packages, such as [<FontIcon icon="fas fa-globe"/>`certifi`](https://pypi.org/project/certifi/), [<FontIcon icon="fas fa-globe"/>`idna`](https://pypi.org/project/idna/), [<FontIcon icon="fas fa-globe"/>`charset-normalizer`](https://charset-normalizer.readthedocs.io/en/latest/), and [<FontIcon icon="fas fa-globe"/>`urllib3`](https://urllib3.readthedocs.io/en/stable/). These were installed because `requests` depends on them to work correctly.

Now that you’ve installed `requests` and its dependencies, you can [**import**](/realpython.com/python-modules-packages.md) it just like any other regular package in your Python code. Start the [**interactive Python interpreter**](/realpython.com/interacting-with-python.md) and import the `requests` package:

```py
import requests
requests.__version__
# 
# "x.y.z"
requests.__file__
# 
# '.../venv/lib/python3.12/site-packages/requests/__init__.py'
```

After starting the interactive Python interpreter, you imported the `requests` module. By calling `requests.__version__`, you verified that you were using the same version of `requests` as you expected. You also investigated `requests.__file__` to confirm that you’ve imported the `requests` module from within your virtual environment.

### Using a Custom Package Index

By default, `pip` uses PyPI to look for packages. But `pip` also gives you the option to define a custom package index.

Using `pip` with a custom index can be helpful when the PyPI domain is blocked on your network or if you want to work with packages that aren’t publicly available. Sometimes, system administrators also create their own internal package index to better control which package versions are available to `pip` users on the company’s network.

A custom package index must comply with [<FontIcon icon="fa-brands fa-python"/>PEP 503 - Simple Repository API](https://python.org/dev/peps/pep-0503/) to work with `pip`. You can get an impression of how such an [<FontIcon icon="fa-brands fa-wikipedia-w"/>API (Application Programming Interface)](https://en.wikipedia.org/wiki/API) looks by visiting the [<FontIcon icon="fas fa-globe"/>PyPI Simple Index](https://pypi.org/simple/)—but be aware that this is a large page with a lot of hard-to-parse content. Any custom index that follows the same API can be targeted with the `--index-url` option. Instead of typing `--index-url`, you can also use the `-i` shorthand.

For example, to install the [**`rptree`**](/realpython.com/directory-tree-generator-python.md) tool from the [<FontIcon icon="fas fa-globe"/>TestPyPI](https://test.pypi.org/) package index, you can run the following command:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install -i https://test.pypi.org/simple/ rptree
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install -i https://test.pypi.org/simple/ rptree
```

:::

With the `-i` option, you tell `pip` to look at a different package index instead of PyPI, the default one. Here, you’re installing `rptree` from TestPyPI rather than from PyPI. You can use TestPyPI to fine-tune the [**publishing process for your Python packages**](/realpython.com/pypi-publish-python-package.md) without cluttering the production package index on PyPI.

If you need to use an alternative index permanently, then you can set the `index-url` option in the `pip` [<FontIcon icon="fas fa-globe"/>configuration file](https://pip.pypa.io/en/stable/topics/configuration/). This file is called `pip.conf`, and you can find its location by running the following command:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip config list -vv
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip config list -vv
```

:::

With the `pip config list` command, you can list the active configuration. This command only outputs something when you have custom configurations set. Otherwise, the output is empty. That’s when the additive `--verbose`, or `-vv`, option can be helpful. When you add `-vv`, `pip` shows you where it looks for the different configuration levels.

If you want to add a <FontIcon icon="fas fa-file-lines"/>`pip.conf` file, then you can choose one of the locations that `pip config list -vv` listed. A `pip.conf` file with a custom package index looks like this:

Configuration File <FontIcon icon="fas fa-file-lines"/>`pip.conf`

```toml title="pip.conf"
[global]
index-url = https://test.pypi.org/simple/
```

When you have a `pip.conf` file like this, `pip` will use the defined `index-url` to look for packages. With this configuration, you don’t need to use the `--index-url` option in your `pip install` command to specify that you only want packages that can be found in the [<FontIcon icon="fas fa-globe"/>Simple API](https://test.pypi.org/simple/) of TestPyPI.

### Installing Packages From Your Git Repositories

You’re not limited to packages hosted on PyPI or other package indexes. `pip` also provides the option to install packages from a [**Git repository**](/realpython.com/python-git-github-intro.md). But even when a package is hosted on PyPI, like the [<FontIcon icon="fas fa-globe"/>Real Python directory tree generator](https://pypi.org/project/rptree/), you can opt to install it from its [Git repository (<FontIcon icon="iconfont icon-github"/>`realpython/rptree`)](https://github.com/realpython/rptree):

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install git+https://github.com/realpython/rptree
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install git+https://github.com/realpython/rptree
```

:::

With the `git+https` scheme, you can point to a Git repository that contains an installable package. You can verify that you installed the package correctly by running an interactive Python interpreter and importing `rptree`:

```py
import rptree
rptree.__version__
# 
# "x.y.z"
```

After starting the interactive Python interpreter, you import the `rptree` module. By calling `rptree.__version__`, you verify that you’re using the `rptree` module that’s based in your virtual environment.

::: note

If you’re using a version control system (VCS) other than Git, `pip` has you covered. To learn how to use `pip` with Mercurial, Subversion, or Bazaar, check out the [<FontIcon icon="fas fa-globe"/>VCS Support chapter](https://pip.pypa.io/en/stable/topics/vcs-support/) of the `pip` documentation.

:::

Installing packages from a Git repository can be helpful if the package isn’t hosted on PyPI but has a remote Git repository. The remote repository you point `pip` to can even be hosted on an internal Git server on your company’s intranet. This can be useful when you’re behind a firewall or have other restrictions for your Python projects.

### Installing Packages in Editable Mode to Ease Development

When working on your own package, installing it in an editable mode can make sense. By doing this, you can work on the source code while still using your command line like you would in any other package. A typical workflow is to first clone the repository and then use `pip` to install it as an editable package in your environment:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
clone https://github.com/realpython/rptree
cd rptree
python -m venv venv\
venv\Scripts\activate.bat
python -m pip install -e .
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
git clone https://github.com/realpython/rptree
cd rptree
python -m venv venv/
source venv/bin/activate
python -m pip install -e .
```

:::

With the commands above, you installed the `rptree` package as an editable module. Here’s a step-by-step breakdown of the actions you just performed:

1. **Line 1** cloned the Git repository of the `rptree` package.
2. **Line 2** changed the working directory to `rptree/`.
3. **Lines 3 and 4** created and activated a virtual environment.
4. **Line 5** installed the content of the current directory as an editable package.

The `-e` option is shorthand for the `--editable` option. When you use the `-e` option with `pip install`, you tell `pip` that you want to install the package in editable mode. Instead of using a package name, you use a dot (`.`) to point `pip` to the current directory.

If you hadn’t used the `-e` flag, `pip` would’ve installed the package normally into your environment’s `site-packages/` folder. When you install a package in editable mode, you’re creating a link in the site-packages to the local project path:

```plaintext title="path"
~/rptree/venv/lib/python3.12/site-packages/rptree.egg-link
```

Using the `pip install` command with the `-e` flag is just one of many options that `pip install` offers. You can check out [<FontIcon icon="fas fa-globe"/>`pip install` examples](https://pip.pypa.io/en/stable/cli/pip_install/#examples) in the `pip` documentation. There you’ll learn how to install specific versions of a package or point `pip` to a different index that’s not PyPI.

In the next section, you’ll learn how requirements files can help with your `pip` workflows.

---

## Using Requirements Files

The `pip install` command by default installs the latest published version of a package, but sometimes your code requires a specific package version to work correctly.

You want to create a specification of the dependencies and versions that you used to develop and test your application so that there are no surprises when you use the application in production.

### Pinning Requirements

When you share your Python project with other developers, you may want them to use the same versions of external packages that you’re using. Maybe a specific version of a package contains a new feature that you rely on, or the version of a package that you’re using is incompatible with former versions.

These external dependencies are also called requirements. You’ll often find Python projects that pin their requirements in a file called <FontIcon icon="fas fa-file-lines"/>`requirements.txt` or similar. The [<FontIcon icon="fas fa-globe"/>requirements file format](https://pip.pypa.io/en/stable/reference/requirements-file-format/) allows you to specify precisely which packages and versions should be installed.

Running `pip help` shows that there’s a `freeze` command that outputs the installed packages in requirements format. You can use this command, redirecting the output to a file to generate a requirements file:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip freeze > requirements.txt
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip freeze > requirements.txt
```

:::

This command creates a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file in your working directory with the following content:

Python Requirements <FontIcon icon="fas fa-file-lines"/>`requirements.txt`

```plaiintext title="requirements.txt"
certifi==x.y.z
charset-normalizer==x.y.z
idna==x.y.z
requests==x.y.z
urllib3==x.y.z
```

Remember that `x.y.z` displayed above is a placeholder format for the package versions. Your <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file will contain real version numbers.

The `freeze` command dumps the name and version of the currently installed packages to standard output. You can redirect the output to a file that you can later use to install your exact requirements into another system. You can name the requirements file whatever you want. However, a widely adopted convention is to name it <FontIcon icon="fas fa-file-lines"/>`requirements.txt`.

When you want to replicate the environment in another system, you can run `pip install`, using the `-r` switch to specify the requirements file:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install -r requirements.txt
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install -r requirements.txt
```

:::

In the command above, you tell `pip` to install the packages listed in <FontIcon icon="fas fa-file-lines"/>`requirements.txt` into your current environment. The package versions will match the version constraints that the <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file contains. You can run `pip list` to display the packages you just installed, with their version numbers:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip list
# 
# Package            Version
# ------------------ ---------
# certifi            x.y.z
# charset-normalizer x.y.z
# idna               x.y.z
# pip                x.y.z
# requests           x.y.z
# urllib3            x.y.z
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip list
# 
# Package            Version
# ------------------ ---------
# certifi            x.y.z
# charset-normalizer x.y.z
# idna               x.y.z
# pip                x.y.z
# requests           x.y.z
# urllib3            x.y.z
```

:::

Now you’re ready to share your project! You can submit <FontIcon icon="fas fa-file-lines"/>`requirements.txt` into a version control system like Git and use it to replicate the same environment on other machines. But wait, what happens if new updates are released for these packages?

### Fine-Tuning Requirements

The problem with hardcoding your packages’ versions and dependencies is that packages are updated frequently with bug and security fixes. You probably want to leverage those updates as soon as they’re published.

The requirements file format allows you to specify dependency versions using comparison operators that give you some flexibility to ensure packages are updated while still defining the base version of a package.

Open <FontIcon icon="fas fa-file-lines"/>`requirements.txt` in your favorite [**editor**](/realpython.com/python-ides-code-editors-guide.md) and turn the equality operators (`==`) into greater than or equal to operators (`>=`), like in the example below:

Python Requirements <FontIcon icon="fas fa-file-lines"/>`requirements.txt`

```plaintext title="requirements.txt"
certifi>=x.y.z
charset-normalizer>=x.y.z
idna>=x.y.z
requests>=x.y.z
urllib3>=x.y.z
```

You can change the [**comparison operator**](/realpython.com/python-operators-expressions.md#comparison-operators) to `>=` to tell `pip` to install an exact or greater version that has been published. When you set a new environment by using the `requirements.txt` file, `pip` looks for the latest version that satisfies the requirement and installs it.

Next, you can upgrade the packages in your requirements file by running the `install` command with the `--upgrade` switch or the `-U` shorthand:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install -U -r requirements.txt
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install -U -r requirements.txt
```

:::

If a new version is available for a listed package, then the package will be upgraded.

In an ideal world, new versions of packages would be backward compatible and would never introduce new bugs. Unfortunately, new versions can introduce changes that’ll break your application. To fine-tune your requirements, the requirements file syntax supports additional [<FontIcon icon="fa-brands fa-python"/>version specifiers](https://python.org/dev/peps/pep-0440/#version-specifiers).

Imagine that a new version, `3.0`, of `requests` is published but introduces an incompatible change that breaks your application. You can modify the requirements file to prevent `3.0` or higher from being installed:

```plaintext title="requirements.txt"
certifi==x.y.z
charset-normalizer==x.y.z
idna==x.y.z
requests>=x.y.z, <3.0 urllib3==x.y.z
```

Changing the version specifier for the `requests` package ensures that any version greater than or equal to `3.0` doesn’t get installed. The `pip` documentation provides extensive information about the [<FontIcon icon="fas fa-globe"/>requirements file format](https://pip.pypa.io/en/stable/reference/requirements-file-format/), and you can consult it to learn more.

### Separating Production and Development Dependencies

Not all packages that you install during the development of your applications will be production dependencies. For example, you’ll probably want to test your application, so you need a test framework. A popular framework for testing is [**`pytest`**](/realpython.com/pytest-python-testing.md). You want to install it in your development environment, but you don’t want it in your production environment because it isn’t a production dependency.

You create a second requirements file, <FontIcon icon="fas fa-file-lines"/>`requirements_dev.txt`, to list additional tools to set up a development environment:

```plaintext title="requirements_dev.txt"
pytest>=x.y.z
```

Having two requirements files will demand that you use `pip` to install both of them, <FontIcon icon="fas fa-file-lines"/>`requirements.txt` and <FontIcon icon="fas fa-file-lines"/>`requirements_dev.txt`. Fortunately, `pip` allows you to specify additional parameters within a requirements file, so you can modify <FontIcon icon="fas fa-file-lines"/>`requirements_dev.txt` to also install the requirements from the production <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file:

```plaintext title="requirements_dev.txt"
-r requirements.txt
pytest>=x.y.z
```

Notice that you use the same `-r` switch to install the production <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file. Now, in your development environment, you only have to run this single command to install all requirements:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install -r requirements_dev.txt
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install -r requirements_dev.txt
```

:::

Because <FontIcon icon="fas fa-file-lines"/>`requirements_dev.txt` contains the `-r requirements.txt` line, you’ll install not only `pytest` but also the pinned requirements of <FontIcon icon="fas fa-file-lines"/>`requirements.txt`. In a production environment, it’s sufficient to install the production requirements only:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip install -r requirements.txt
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip install -r requirements.txt
```

:::

With this command, you install the requirements listed in <FontIcon icon="fas fa-file-lines"/>`requirements.txt`. In contrast to your development environment, your production environment won’t have `pytest` installed.

### Freezing Requirements for Production

You created the production and development requirement files and added them to source control. These files use flexible version specifiers to ensure that you leverage bug fixes published by your dependencies. You’ve also tested your application and are now ready to deploy it to production.

You know that all the tests pass and the application works with the dependencies that you used in your development process, so you probably want to ensure that you deploy identical versions of dependencies to production.

The current version specifiers don’t guarantee that the identical versions will be deployed to production, so you want to freeze the production requirements before releasing your project.

After you’ve finished development with your current requirements, a workflow to create a new release of your current project can look like this:

| Step | Command | Explanation |
| --- | --- | --- |
| 1 | `pytest` | Run your tests and verify that your code is working properly. |
| 2 | `pip install -U -r requirements.txt` | Upgrade your requirements to versions that match the constraints in your <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file. |
| 3 | `pytest` | Run your tests and consider downgrading any dependency that introduced errors to your code. |
| 4 | `pip freeze > requirements_lock.txt` | Once the project works correctly, freeze the dependencies into a <FontIcon icon="fas fa-file-lines"/>`requirements_lock.txt` file. |

With a workflow like this, the <FontIcon icon="fas fa-file-lines"/>`requirements_lock.txt` file will contain exact version specifiers and can be used to replicate your environment. You’ve ensured that when your users install the packages listed in <FontIcon icon="fas fa-file-lines"/>`requirements_lock.txt` into their own environments, they’ll be using the versions that you intend them to use.

Freezing your requirements is an important step to ensure that your Python project works the same way for your users in their environments as it did in yours.

---

## Uninstalling Packages With `pip`

Once in a while, you’ll have to uninstall a package. Either you found a better library to replace it, or it’s something that you don’t need. Uninstalling packages can be a bit tricky.

Notice that when you installed `requests`, you got `pip` to install other dependencies too. The more packages you install, the bigger the chance that multiple packages depend on the same dependency. This is where the `show` command in `pip` comes in handy.

Before you uninstall a package, make sure to run the `show` command for that package:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip show requests
# 
# Name: requests
# Version: 2.32.3
# Summary: Python HTTP for Humans.
# Home-page: https://requests.readthedocs.io
# Author: Kenneth Reitz
# Author-email: me@kennethreitz.org
# License: Apache 2.0
# Location: .../python3.12/site-packages
# Requires: certifi, idna, charset-normalizer, urllib3 Required-by:
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip show requests
# 
# Name: requests
# Version: 2.32.3
# Summary: Python HTTP for Humans.
# Home-page: https://requests.readthedocs.io
# Author: Kenneth Reitz
# Author-email: me@kennethreitz.org
# License: Apache 2.0
# Location: .../python3.12/site-packages
# Requires: certifi, idna, charset-normalizer, urllib3 Required-by:
```

Notice the last two fields, `Requires` and `Required-by`. The `show` command tells you that `requests` requires `certifi`, `idna`, `charset-normalizer`, and `urllib3`. You probably want to uninstall those too. Notice that `requests` isn’t required by any other package. So it’s safe to uninstall it.

You should run the `show` command against all of the `requests` dependencies to ensure that no other libraries also depend on them. Once you understand the dependency order of the packages that you want to uninstall, then you can remove them using the `uninstall` command:

- [Windows](#windows-21)
- [Linux + macOS](#linux-macos-21)

```powershell
(venv) PS> python -m pip uninstall certifi
```

```sh
(venv) $ python -m pip uninstall certifi
```

The `uninstall` command shows you the files that will be removed and asks for confirmation. If you’re sure that you want to remove the package because you’ve checked its dependencies and know that nothing else is using it, then you can pass a `-y` switch to suppress the file list and confirmation dialog:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip uninstall urllib3 -y
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip uninstall urllib3 -y
```

:::

Here you uninstall `urllib3`. Using the `-y` switch, you suppress the confirmation dialog asking you if you want to uninstall this package.

In a single call, you can specify all the packages that you want to uninstall:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip uninstall -y charset-normalizer idna requests
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip uninstall -y charset-normalizer idna requests
```

:::

You can pass in multiple packages to the `pip uninstall` command. If you didn’t add any additional switches, then you’d need to confirm uninstalling each package. By passing the `-y` switch, you can uninstall them all without any confirmation dialog.

You can also uninstall all the packages listed in a requirements file by providing the `-r <requirements file>` option. This command will prompt a confirmation request for each package, but you can suppress it with the `-y` switch:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m pip uninstall -r requirements.txt -y
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m pip uninstall -r requirements.txt -y
```

:::

Remember to always check the dependencies of packages that you want to uninstall. You probably want to uninstall all dependencies, but uninstalling a package used by others will break your working environment, and your project may not work correctly anymore.

::: note

If you’re working in a virtual environment, it can be less work to just delete your virtual environment and create a new one. Then you can install the packages that you need instead of trying to uninstall the packages that you don’t need.

:::

The `pip uninstall` command can be really helpful when you need to uninstall a package from your system Python installation. Using `pip uninstall` is a good way to declutter your system if you accidentally install a package system-wide.

---

## Exploring Alternatives to `pip`

The Python community provides excellent tools and libraries for you to use beyond `pip`. These include alternatives to `pip` that try to simplify and improve package management.

Here are some other package management tools that are available for Python:

::: tabs

@tab:active Conda

```component VPCard
{
  "title": "Conda Documentation — conda-docs   documentation",
  "desc": "Conda provides package, dependency, and environment management for any language. The following documentation site provides all you need to get started with leveraging the power of conda.",
  "link": "https://docs.conda.io/en/latest/",
  "logo": "https://docs.conda.io/_static/favicon.ico?v=92f50989",
  "background": "rgba(98,174,63,0.2)"
}
```

**Conda** is a package, dependency, and environment manager for many languages, including Python. It comes from [<FontIcon icon="iconfont icon-anaconda"/>Anaconda](https://anaconda.com/), which started as a data science package for Python. Consequently, it’s widely used for data science and [**machine learning applications**](/realpython.com/python-windows-machine-learning-setup.md). Conda operates its own [<FontIcon icon="fas fa-globe"/>index](https://repo.continuum.io/) to host compatible packages.

@tab Poetry

```component VPCard
{
  "title": "Poetry - Python dependency management and packaging made easy",
  "desc": "Python dependency management and packaging made easy",
  "link": "https://python-poetry.org",
  "logo": "https://python-poetry.org/images/favicon-origami-32.png",
  "background": "rgba(32,41,58,0.2)"
}
```

**Poetry** will look very familiar to you if you’re coming from [<FontIcon icon="fa-brands fa-firefox"/>JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [<FontIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com/). Poetry goes beyond [**package management**](/realpython.com/dependency-management-python-poetry.md), helping you build distributions for your applications and libraries and deploying them to PyPI.

@tab Pipenv

<SiteInfo
  name="pypa/pipenv"
  desc=" Python Development Workflow for Humans."
  url="https://github.com/pypa/pipenv"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/853c2f87f958b1020906de041eeaff9da804f697e34b5aee03666d3c6dcdb3e5/pypa/pipenv"/>

**Pipenv** is another package management tool that merges virtual environment and package management in a single tool. [**Pipenv: A Guide to the New Python Packaging Tool**](/realpython.com/pipenv-guide.md) is a great place to start learning about Pipenv and its approach to package management.

@tab uv

https://pypi.org/project/uv/

**uv** stands for *universal*, reflecting uv’s broad applicability planned for the future. The tool is being advertised as a [<FontIcon icon="fa-brands fa-rust"/>Cargo for Python](https://blog.rust-lang.org/2016/05/05/cargo-pillars.html#pillars-of-cargo), aiming to become a drop-in replacement for `pip`. The uv project was unveiled in [**February 2024**](/realpython.com/python-news-february-2024.md#astral-unveils-python-packaging-in-rust) by [<FontIcon icon="fas fa-globe"/>Astral](https://astral.sh/), the company founded by [<FontIcon icon="fas fa-globe"/>Charlie Marsh](https://crmarsh.com/), who gained fame after authoring [**Ruff**](/realpython.com/ruff-python.md).

:::

Only `pip` comes bundled in the standard Python installation. If you want to use any alternatives listed above, then you have to follow the installation guides in their documentation. With so many options, you’re sure to find the right tools for your programming journey!

---

## Conclusion

Many Python projects use the `pip` package manager to manage their dependencies. It’s included with the Python installer, and it’s an essential tool for dependency management in Python.

::: info In this tutorial, you learned how to

- **Set up** and run `pip` in your working environment
- Fix **common errors** related to working with `pip`
- **Install and uninstall packages** with `pip`
- **Define requirements** for your projects and applications
- Pin dependencies in **requirements files**

:::

In addition, you’ve learned about the importance of keeping dependencies up to date and alternatives to `pip` that can help you manage those dependencies.

By taking a closer look at `pip`, you’ve explored an essential tool in your Python development workflows. With `pip`, you can install and manage any additional packages that you find on [<FontIcon icon="iconfont icon-pypi"/>PyPI](https://pypi.org/). You can use external packages from other developers as requirements and concentrate on the code that makes your project unique.

---

## Frequently Asked Questions

Now that you have some experience using pip to manage your projects’ dependencies in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details What does `pip` stand for?

`pip` stands for “pip installs packages,” highlighting its primary function as a package manager in Python.

:::

::: details What is `pip` used for in Python?

You use pip to install and manage libraries and dependencies that aren’t included in Python’s standard library.

:::

::: details Does `pip` come with Python?

Yes, `pip` has been included with Python installers since version 3.4. This means that when you install Python 3.4 or later using the official installer, `pip` is bundled with it and ready to use. However, depending on your operating system and how Python is installed, you may need to ensure that `pip` is properly set up or update it to the latest version.

:::

::: details How do you check if you have `pip`?

You can check if you have `pip` by running a command like `where pip3` on Windows or `which pip3` on Linux and macOS.

:::

::: details How can you install packages from a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` with `pip`?

You can install packages from a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file by using the command `pip install -r requirements.txt`, which installs all listed packages with their specified versions.

:::

::: info Quiz - Using Python's pip to Manage Your Projects' Dependencies

<SiteInfo
  name="Using Python's pip to Manage Your Projects' Dependencies Quiz - Real Python"
  desc="In this quiz, you'll test your understanding of Python's standard package manager, pip. You'll revisit the ideas behind pip, important commands, and how to install packages."
  url="https://realpython.com/quizzes/what-is-pip/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-PIP_Watermarked.4944e95d83ad.jpg"/>

In this quiz, you'll test your understanding of Python's standard package manager, pip. You'll revisit the ideas behind pip, important commands, and how to install packages.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="A Beginner's Guide to pip - Real Python"
  desc="What is pip? In this beginner-friendly course, you'll learn how to use pip, the standard package manager for Python, so that you can install and manage additional packages that are not part of the Python standard library."
  url="https://realpython.com/courses/what-is-pip/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/What-is-PIP_Watermarked.c46f49dc33f9.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Python's pip to Manage Your Projects' Dependencies",
  "desc": "What is pip? In this beginner-friendly tutorial, you'll learn how to use pip, the standard package manager for Python, so that you can install and manage packages that aren't part of the Python standard library.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/what-is-pip.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
