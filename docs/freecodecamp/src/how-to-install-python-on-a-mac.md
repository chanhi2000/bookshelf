---
lang: en-US
title: "How to Install Python on a Mac"
description: "Article(s) > How to Install Python on a Mac"
icon: fa-brands fa-python
category: 
  - Python
  - uv
  - DevOps
  - macOS
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - mac
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install Python on a Mac"
    - property: og:description
      content: "How to Install Python on a Mac"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-python-on-a-mac.html
prev: /programming/py/articles/README.md
date: 2024-05-09
isOriginal: false
author:
  - name: Daniel Kehoe
    url: https://freecodecamp.org/news/author/DanielKehoe/
cover: https://freecodecamp.org/news/content/images/2024/05/python-shop.png
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

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Install Python on a Mac"
  desc="Python is the most popular first language for programmers on a Mac. Until recently, the language's lack of standard development tooling, plus competing optional-but-essential development tools, meant a rocky start for Python beginners.  To cut throug..."
  url="https://freecodecamp.org/news/how-to-install-python-on-a-mac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/python-shop.png"/>

Python is the most popular first language for programmers on a Mac.

Until recently, the language's lack of standard development tooling, plus competing optional-but-essential development tools, meant a rocky start for Python beginners.

To cut through the confusion, I'll show you an up-to-date approach to install Python and set up a programming project, using a single tool named Rye, to install Python versions and software libraries.

[<VPIcon icon="fas fa-globe"/>Rye](https://rye-up.com/) is an all-in-one project management tool for Python, written in Rust (for speed) and inspired by Cargo, Rust's comprehensive package manager, from Armin Ronacher, the creator of the Python web framework Flask. It's ideal for beginners, borrowing a folder-based approach to development from other languages such as JavaScript and Ruby.

---

## Before You Get Started

You'll need a terminal application, either [<VPIcon icon="fas fa-globe"/>Mac Terminal](https://mac.install.guide/terminal/) or an alternative such as [<VPIcon icon="fas fa-globe"/>Warp Terminal](https://mac.install.guide/more/download-warp) (a tool I call, "the fastest way to become a command-line power user").

Before you get started, check if you need to [<VPIcon icon="fas fa-globe"/>update macOS](https://mac.install.guide/commandlinetools/1).

You may have heard that Python is pre-installed on your Mac. Older Macs (prior to macOS 12.3) came with Python 2.7. That's an older version, not the Python 3 that you need. Newer Macs don't come with a pre-installed Python.

You'll need to install [<VPIcon icon="fas fa-globe"/>Xcode Command Line Tools](https://mac.install.guide/commandlinetools/) before you begin programming on a Mac. You should check if [<VPIcon icon="fas fa-globe"/>Xcode Command Line Tools are installed](https://mac.install.guide/commandlinetools/2) before you proceed further. When you install Xcode Command Line Tools, Apple includes Python 3.9.6. You might be tempted to use it but that's an older version, intended only for system software, which is why you should install a new version of Python, as shown here.

---

## Python Installation with Rye

There are several ways to set up [<VPIcon icon="fas fa-globe"/>Mac Python](https://mac.install.guide/python/). Here are your options, in a nutshell, with a critique.

On the [<VPIcon icon="fa-brands fa-python"/>Python.org website](https://python.org/downloads/), there's an installer application for the most recent Python version. Most Python developers avoid using it because it clutters a Mac in ways that are difficult to manage.

If you [<VPIcon icon="fas fa-globe"/>install Homebrew](https://mac.install.guide/homebrew/3) for software development, it's easy to [<VPIcon icon="fas fa-globe"/>`brew install python`.](https://mac.install.guide/python/brew) However, the Homebrew-installed Python is not well-suited to managing multiple Python projects and development can be cumbersome.

Some tutorials suggest to [<VPIcon icon="fa-brands fa-python"/>install Pyenv](https://mac.install.guide/python/install-pyenv), a Python version manager. Pyenv is a good choice for managing multiple Python versions, but it requires familiarity with [<VPIcon icon="fa-brands fa-python"/>Pip](https://pip.pypa.io/en/stable/), a package manager, and [<VPIcon icon="fa-brands fa-python"/>Venv](https://docs.python.org/3/library/venv) or [Virtualenv](https://virtualenv.pypa.io/en/latest/), environment managers. Multiple tools make development more complex.

I recommend installing Python with [<VPIcon icon="fas fa-globe"/>Rye](https://rye-up.com/). With this all-in-one tool, you'll manage multiple Python versions, set up project-based environments, and install Python packages without dependency conflicts. I'll show you how to install Python using Rye, the easy way, with a self-install script.

### Check for Python

It's best to start with no previous Python version installed, except for the Python version installed by Xcode Command Line Tools.

Try `python3 --version` and `which -a python3` to check if Python was installed with Xcode Command Line Tools:

```sh
python3 --version
#
# Python 3.9.6
which -a python3
#
# /usr/bin/python3
```

You won't use the Python installed by Xcode Command Line Tools, but it's important to know that Xcode Command Line Tools is already there. Otherwise, [<VPIcon icon="fas fa-globe"/>install Xcode Command Line Tools](https://mac.install.guide/commandlinetools/4).

Check if another version of Python is already installed:

```sh
python --version
#
# zsh: command not found: python
```

You'll see `zsh: command not found: python` if Python is not available. I've written elsewhere about how to [<VPIcon icon="fas fa-globe"/>update Python](https://mac.install.guide/python/update) if you think you already have Python, as well as a guide to resolving the error "[<VPIcon icon="fas fa-globe"/>command not found: python](https://mac.install.guide/python/command-not-found-python)" if you are sure Python is installed but not available.

If you have more than one version of Python installed, it's not a problem because you'll set the [<VPIcon icon="fas fa-globe"/>Mac PATH](https://mac.install.guide/terminal/path) after installing Rye to make the correct Python version available.

### Install Rye

Homebrew is not needed. Rye has a self-install script so you can install Rye with a `curl` command.

```sh
curl -sSf https://rye.astral.sh/get | bash
```

[<VPIcon icon="iconfont icon-curl"/>Curl](https://curl.se/) is a command-line tool that makes HTTP requests from the terminal, useful for tasks like downloading and running installation scripts.

```sh
curl -sSf https://rye.astral.sh/get | bash
#
# This script will automatically download and install rye (latest) for you.
# ####################################################################### 100.0%
# Welcome to Rye!
#
# This installer will install rye to /Users/username/.rye
# This path can be changed by exporting the RYE_HOME environment variable.
# 
# Details:
#   Rye Version: 0.26.0
#   Platform: macos (aarch64)
# 
# ? Continue? (y/n)
```

Enter `y` to continue. Rye will ask questions to customize the installation.

```plaintext
? Select the preferred package installer ›
❯ uv (fast, recommended)
  pip-tools (slow, higher compatibility)
```

By default, Rye offers `uv`, a faster and newer package installer. I recommend choosing `pip-tools` for compatibility. If you're a beginner, it will be easier to follow tutorials that refer to `pip`. Select `pip-tools` with the arrow keys.

Next, the self-installer asks which Python version you'll use as a default, offering the Rye-installed version or previously-installed versions.

```plaintext
? What should running `python` or `python3` do when you are not inside a Rye managed project? ›
❯ Run a Python installed and managed by Rye
  Run the old default Python (provided by your OS, pyenv, etc.)
```

It's best to use the Rye-installed version. Accept the default `Run a Python installed and managed by Rye` by pressing "Enter". Then the self-installer asks which Python version to install as a default.

```plaintext
? Which version of Python should be used as default toolchain? (cpython@3.12) ›
```

Accept the default and Rye will install the latest Python version. Installation begins when you press "Enter."

```plaintext
Installed binary to /Users/username/.rye/shims/rye
Bootstrapping rye internals
Downloading cpython@3.12.1
Checking checksum
Unpacking
Downloaded cpython@3.12.1
Updated self-python installation at /Users/username/.rye/self

The rye directory /Users/username/.rye/shims was not detected on PATH.
It is highly recommended that you add it.
? Should the installer add Rye to PATH via .profile? (y/n) ›
```

Notice that Rye installs its Python files to <VPIcon icon="fas fa-folder-open"/>`~/.rye/shims/rye`.

Rye offers to set the `$PATH` to give precedence to its Python version by modifying the `.profile` file.

Use of the <VPIcon icon="fas fa-file-lines"/>`.profile` file is a Linux convention. On the Mac, it's preferred to set the `$PATH` in <VPIcon icon="fas fa-file-lines"/>`.zprofile` or <VPIcon icon="fas fa-file-lines"/>`.zshrc` files, preferably <VPIcon icon="fas fa-file-lines"/>`.zprofile`. Enter `n` to skip this automatic step. Later, you'll set the `$PATH` manually.

```plaintext
✔ Should the installer add Rye to PATH via .profile? · no
note: did not manipulate the path. To make it work, add this to your .profile manually:

    source "$HOME/.rye/env"

To make it work with zsh, you might need to add this to your .zprofile:

    source "$HOME/.rye/env"

For more information read https://rye.astral.sh/guide/installation/

All done!
```

Rye explains how to complete the installation manually by editing the <VPIcon icon="fas fa-file-lines"/>`.zprofile` file. I'll show you how do it.

### Set the PATH for Rye

There's one final **important** step before Rye works correctly. You must set the Mac PATH to make sure Rye finds the correct Python version. Otherwise, entering the command `python` will trigger `zsh: command not found: python` and the command `python3` will access the older Xcode-installed Python version.

Edit the `~/.zprofile` file. The `~/.zprofile` file is used for setting the `$PATH`. Alternatively, you can modify the `~/.zshrc` file (see [**How Do Zsh Configuration Files Work?**](/freecodecamp.org/how-do-zsh-configuration-files-work.md) for an explanation of the differences). You can use TextEdit, the default macOS graphical text editor, opening a file from the terminal:

```sh
open -e ~/.zprofile
```

You also can use the command line editors `nano` or `vim` to edit the shell configuration files. See [<VPIcon icon="fas fa-globe"/>Zsh Shell Configuration](https://mac.install.guide/terminal/configuration) for more about editing shell configuration files.

Add this command as the last line of your configuration file to configure the Z shell for Rye:

```sh
source "$HOME/.rye/env"
```

When your terminal session starts, Z shell will run the `~/.rye/env` script to set [shims](https://rye-up.com/guide/shims/) to intercept and redirect any Python commands. You'll need double quotes because the command contains special characters.

Rye adds the shims to your `$PATH` so that running the command `python` or `python3` will run a Rye-installed Python version.

Changes to the `~/.zprofile` file will not take effect in the Terminal until you've quit and restarted the terminal. Alternatively (this is easier), you can use the `source` command to reset the shell environment:

```sh
source ~/.zprofile
```

The `source` command reads and executes a shell script file, in this case resetting the shell environment with your new `$PATH` setting.

After resetting your shell, you can check the `$PATH` setting.

```sh
echo $PATH
#
# /Users/username/.rye/shims:/opt/homebrew/bin:/opt/homebrew/sbin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
```

The <VPIcon icon="fas fa-folder-open"/>`~/.rye/shims` directory should be leftmost, taking precedence over other directories.

### Verify Rye installation

After installing Rye, use `rye --version` to verify that it has been installed.

```sh
rye --version
#
# rye 0.26.0
# commit: 0.26.0 (d245f625e 2024-02-23)
# platform: macos (aarch64)
# self-python: cpython@3.12
# symlink support: true
# uv enabled: false
```

### Verify Python installation

Check that Python is available:

```sh
python --version
#
# Python 3.12.1
```

Yay! You've installed Python. If you see `zsh: command not found: python`, check that the Mac PATH is set correctly.

The `python3` command should give you the Rye-installed version, not the Xcode-installed version.

```sh
python3 --version
#
# Python 3.12.1
```

The `which` command shows the Rye shims directory when you try to see where Python is installed. Keep in mind that you've set the `~/.zprofile` file to use Rye shims to intercept the `python` command and deliver the Rye-installed versions.

```sh
which python
#
# /Users/username/.rye/shims/python
```

You've successfully installed Python with Rye.

---

## Version and Package Management with Rye

You can use Rye to:

1. Set up a Python project.
2. Install a specific Python version for a project.
3. Install Python packages for the project.

Other languages adopt a project-based approach to package management (for example, Rust's Cargo, Ruby's Bundler, and JavaScript's npm). Python has been slow to adopt this approach, but Rye is changing that, eliminating the need for separate tools such as Pyenv, Pip, and Venv for managing versions, software libraries, and environments.

With Rye, you'll start by creating a new project and choosing a Python version. You can then install packages for that project. Rye will manage the Python version and packages for you.

### Create a project with Rye

Make a folder for a Python project. Then change directories to the project root:

```sh
mkdir myproject
cd myproject
```

Specify a Python version for your project:

```sh
rye pin 3
#
# pinned 3.12.1 in /Users/username/workspace/myproject/.python-version
```

The command `rye pin 3` will create a `.python-version` file specifying the newest Python version for your project.

You must run the command `rye init` to create a `pyproject.toml` file in your project root directory. This is a project-specific configuration file that Rye uses to manage Python versions and packages.

```sh
rye init
#
# success: Initialized project in /Users/username/workspace/myproject/.
# Run `rye sync` to get started
```

Now you can fetch a Python version and install packages.

### Set a version

Rye can install and switch among different Python versions.

Rye uses the term "toolchains" to refer to installed Python versions. To install a Python version, you can [<VPIcon icon="fas fa-globe"/>fetch a toolchain](https://rye-up.com/guide/toolchains/) using Rye.

```sh
rye fetch
```

If you've specified the default Python with `rye pin`, `rye fetch` does nothing. If you specified a different Python version, `rye fetch` will install the specified version.

```sh
rye fetch
#
# Downloading cpython@3.12.1
# Checking checksum
# success: Downloaded cpython@3.12.1
```

By default, Rye installs all Python executables in a hidden folder in your user home directory `~/.rye/py/`. The Rye shims in the Mac `$PATH` will select the correct Python version you've specified in your project directory,

### Add packages

Package managers allow you to download, install, and update software libraries and their dependencies. Most packages depend on other external software libraries—the package manager will fetch and install any dependencies required by that package.

Experienced Python developers are familiar with [<VPIcon icon="iconfont icon-pypi"/>Pip](https://pip.pypa.io/en/stable/), the standard package manager for Python, included with any version of Python since Python 3.3. The command `pip install` installs packages "globally" into a system Python or shared Python versions, creating potential conflicts.

To safely install Python packages for a specific project with `pip`, you have to use a Python environment manager such as [<VPIcon icon="fa-brands fa-python"/>Venv](https://docs.python.org/3/library/venv) to create and activate a virtual environment to avoid dependency conflicts.

When you use Rye as an all-in-one tool, you won't need `venv` for environment management, installing packages directly with Rye.

Before you try to install a package with Rye, be sure you've created a `pyproject.toml` file in your project root directory with `rye init`.

You can install any Python package from the [<VPIcon icon="iconfont icon-pypi"/>Python Package Index](https://pypi.org/). Here we'll install the [<VPIcon icon="iconfont icon-pypi"/>`cowsay`](https://pypi.org/project/cowsay/) utility.

```sh
rye add cowsay
#
# Added cowsay>=6.1 as regular dependency
```

If you see `error: did not find pyproject.toml`, you need to run `rye init`.

### Sync to set up the project

Before you can use a package in a Rye project, you must run `rye sync` to update lockfiles and install the dependencies into the virtual environment.

```sh :collapsed-lines
rye sync
# 
# Initializing new virtualenv in /Users/username/workspace/python/myproject/.venv
# Python version: cpython@3.12.3
# Generating production lockfile: /Users/username/workspace/python/myproject/requirements.lock
# Creating virtualenv for pip-tools
# Generating dev lockfile: /Users/username/workspace/python/myproject/requirements-dev.lock
# Installing dependencies
# Looking in indexes: https://pypi.org/simple/
# Obtaining file:///. (from -r /var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/tmp06o05xiq (line 2))
#   Installing build dependencies ... done
#   Checking if build backend supports build_editable ... done
#   Getting requirements to build editable ... done
#   Installing backend dependencies ... done
#   Preparing editable metadata (pyproject.toml) ... done
# Collecting cowsay==6.1 (from -r /var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/tmp06o05xiq (line 1))
#   Using cached cowsay-6.1-py3-none-any.whl.metadata (5.6 kB)
# Using cached cowsay-6.1-py3-none-any.whl (25 kB)
# Building wheels for collected packages: myproject
#   Building editable for myproject (pyproject.toml) ... done
#   Created wheel for myproject: filename=myproject-0.1.0-py3-none-any.whl size=1074 sha256=0b34a41cbb517a78e5b60593c75e93a37df0bf7958e8921be5f6f6e24a26b5d1
#   Stored in directory: /private/var/folders/ls/g23m524x5jbg401p12rctz7m0000gn/T/pip-ephem-wheel-cache-m03jgkok/wheels/8b/19/c8/73a63a20645e0f1ed9aae9dd5d459f0f7ad2332bb27cba6c0f
# Successfully built myproject
# Installing collected packages: myproject, cowsay
# Successfully installed cowsay-6.1 myproject-0.1.0
# Done!
```

Rye displays all its operations but you don't have to read all the details.

### Run Python

After installing a package and running `rye sync`, you can use the Python interpreter interactively (the REPL or Read-Eval-Print Loop).

```sh
python
# 
# Python 3.12.1 (main, Jan  7 2024, 23:31:12) [Clang 16.0.3 ] on darwin
# Type "help", "copyright", "credits" or "license" for more information.
```

```py
import cowsay
cowsay.cow('Hello World')
# 
# ___________
# | Hello World |
#   ===========
#            \
#             \
#               ^__^
#               (oo)_______
#               (__)\       )\/\
#                   ||----w |
#                   ||     ||
```

Enter `quit()` or type `Control + D` to exit the Python interpreter.

Now you're ready to develop any Python project with Rye! You can read the [<VPIcon icon="fas fa-globe"/>Rye User Guide](https://rye-up.com/guide/) to learn more.

---

## Python Workflow with Rye

As you code in Python, you'll want to add software libraries to your project. Let's look at an example.

[Requests (<VPIcon icon="iconfont icon-pypi"/>`requests`)](https://pypi.org/project/requests/) is an HTTP library that you'll likely use in many projects. If you visit the [Requests page on PyPI (<VPIcon icon="iconfont icon-pypi"/>`requests`)](https://pypi.org/project/requests/), you'll see the installation instructions:

```sh
python -m pip install requests
```

The `python -m pip` command is a bit cumbersome, and if you use Pip, you have to precede it with `python -m venv .venv` (to set up a virtual environment) and `source .venv/bin/activate` (to activate a virtual environment).

With Rye, you can add Requests to your <VPIcon icon="iconfont icon-yoml"/>`pyproject.toml` file.

```sh
rye add requests
```

Then run `rye sync` to install the package.

```sh
rye sync
```

Now you can use the Requests library in your Python project, including it with an `import` statement.

Remember, when you see `pip install` in a tutorial, you can use `rye add` and `rye sync` instead, without additional commands for a virtual environment.

Beginners using [<VPIcon icon="fas fa-globe"/>pip install](https://mac.install.guide/python/pip-install) often encounter headaches with [<VPIcon icon="fas fa-globe"/>command not found: pip](https://mac.install.guide/python/command-not-found-pip) and [<VPIcon icon="fas fa-globe"/>error: externally-managed-environment](https://mac.install.guide/python/externally-managed-environment). Rye eliminates these problems.

---

## Conclusion

This article is based on a guide that offers additional details about how to [<VPIcon icon="fas fa-globe"/>install Python on Mac](https://mac.install.guide/python/install).

Rye is the new favorite for installing and managing Python because it offers a single coherent setup and packaging system, eliminating the need for separate tools such as Pyenv, Pip, and Venv for managing versions, software libraries, and environments.

Python is the first programming language for most beginners. As it grows in popularity for machine learning and data science, you'll want Python on your Mac for many of the tutorials you'll find on freeCodeCamp.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install Python on a Mac",
  "desc": "Python is the most popular first language for programmers on a Mac. Until recently, the language's lack of standard development tooling, plus competing optional-but-essential development tools, meant a rocky start for Python beginners.  To cut throug...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-install-python-on-a-mac.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
