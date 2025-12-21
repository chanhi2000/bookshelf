---
lang: en-US
title: "Check Python Version - How to Check Py in Mac, Windows, and Linux"
description: "Article(s) > Check Python Version - How to Check Py in Mac, Windows, and Linux"
icon: fa-brands fa-python
category: 
  - Python
  - Shell
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - windows
  - win
  - linux
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Check Python Version - How to Check Py in Mac, Windows, and Linux"
    - property: og:description
      content: "Check Python Version - How to Check Py in Mac, Windows, and Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/check-python-version-how-to-check-py-in-mac-windows-and-linux.html
prev: /programming/py/articles/README.md
date: 2023-07-08
isOriginal: false
author: Shittu Olumide
cover: https://freecodecamp.org/news/content/images/2023/06/Shittu-Olumide-Check-Python-Version---How-to-Check-Py-in-Mac--Windows--and-Linux.png
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
  name="Check Python Version - How to Check Py in Mac, Windows, and Linux"
  desc="By Shittu Olumide Python is a versatile and widely used programming language known for its simplicity and readability.  With its ever-evolving nature, different versions of Python are often released, each offering new features, enhancements, and bug ..."
  url="https://freecodecamp.org/news/check-python-version-how-to-check-py-in-mac-windows-and-linux/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2023/06/Shittu-Olumide-Check-Python-Version---How-to-Check-Py-in-Mac--Windows--and-Linux.png"/>

Python is a versatile and widely used programming language known for its simplicity and readability.

With its ever-evolving nature, different versions of Python are often released, each offering new features, enhancements, and bug fixes.

As a Python developer, it is crucial to be aware of the Python version you are using, as it determines the compatibility of libraries, syntax, and functionalities.

In this article, we will explore various methods to check the Python version installed on your system. Whether you are a beginner starting your Python journey or an experienced developer working on a project, knowing your Python version is the first step towards ensuring smooth execution and compatibility.

We will dive into the command-line approaches to determine the Python version. By the end of this article, you will be equipped with the knowledge to effortlessly check your Python version and make informed decisions regarding the tools and libraries you can utilize.

---

## How to Check Python Version in Mac

To check the Python version on a Mac, you can follow these steps:

### Open the Terminal application on your Mac

You can find the terminal by navigating to "**Applications**" -> "**Utilities**" -> "**Terminal**", or by using Spotlight search (<kbd>Cmd</kbd>+<kbd>Space</kbd>) and typing `Terminal`.

Once the Terminal is open, you will see a command prompt where you can enter commands. Type the following command and press Enter:

```sh
python --version
```

This command will display the Python version installed on your Mac. For example, if you have Python 3.9.2 installed, it will display something like:

```sh
Python 3.9.2
```

The version number will vary depending on the specific Python installation on your system.

### Alternative methods for Mac

If the `python --version` command does not work, try using the `python3` command instead. Python 3 is the latest major version of Python, and some systems have both Python 2 and Python 3 installed.

To check the Python 3 version, enter the following command and press Enter:

```sh
python3 --version
```

This command will display the Python 3 version installed on your Mac.

Another way to check the Python version is by using the `sys` module within the Python interpreter. In the Terminal, type the following command and press Enter to start the Python interpreter:

```sh
python
```

This will launch the Python interpreter, and you will see a new prompt (`>>>`) indicating that you can enter Python commands.

Within the Python interpreter, type the following command and press Enter:

```sh
import sys
print(sys.version)
```

This will print the detailed Python version information, including the version number and additional details such as the build number and the date of the Python installation.

After checking the Python version, you can exit the Python interpreter by typing `exit()` and pressing Enter, or by pressing <kbd>Ctrl</kbd>+<kbd>Z</kbd> followed by Enter.

By following these steps, you will be able to check the Python version installed on your Mac using the Terminal application.

---

## How to Check Python Version in Windows

To check the Python version on a Windows operating system, you can follow these detailed steps:

### Open the Command Prompt:

- Press the Windows key on your keyboard.
- Type `cmd` (without quotes) in the search bar.
- Click on the "**Command Prompt**" app from the search results. This will open the Command Prompt window.

### Check if Python is installed:

In the Command Prompt window, type the following command and press Enter:

```sh
python --version
```

If Python is installed on your system, it will display the version number. For example, "**Python 3.9.2**".

If Python is not installed, you will see an error message stating that the command is not recognized. In this case, you need to install Python before proceeding.

### Verify the Python installation location (optional)

In the Command Prompt, type the following command and press Enter:

```sh
where python
```

This command will display the path of the Python executable file. By default, Python is installed in the `C:\\PythonXX` directory, where `XX` represents the version number.

If the command doesn't return any result, it means Python is not installed or not added to the system's `PATH` environment variable.

### Check the Python version using the Python interpreter:

In the Command Prompt, type the following command and press Enter:

```sh
python
```

This will launch the Python interpreter, displaying the Python version information at the top. For example, "**Python 3.9.2 (tags/v3.9.2:1a79785, Feb 22 2021, 12:26:58)**".

To exit the Python interpreter, you can type `exit()` and press Enter.

#### Check the Python version using IDLE (optional)

IDLE is an integrated development environment that comes bundled with Python.

In the Command Prompt, type the following command and press Enter:

```sh
idle
```

This will launch the IDLE Python Shell, which will display the Python version information at the top. For example, "**Python 3.9.2 (tags/v3.9.2:1a79785, Feb 22 2021, 12:26:58)**".

To exit the IDLE Python Shell, you can go to the "**File**" menu and choose "**Exit**" or simply close the window.

By following these steps, you can easily check the Python version installed on your Windows system using the Command Prompt or Python interpreter.

---

## How to Check Python Version in Linux

### Open a terminal

Launch the terminal application on your Linux system. You can typically find it in the applications menu or by using a keyboard shortcut such as Ctrl+Alt+T.

In the terminal, type the following command and press Enter:

```sh
python --version
```

This command will display the Python version installed on your system.

::: note

Some Linux distributions, such as Ubuntu, may have both Python 2 and Python 3 installed. In that case, the above command may display the version of Python 2. To check the version of Python 3, you can use the following command:

```sh
python3 --version
```

:::

### Check the output

After executing the command, the terminal will display the Python version installed on your system. It will typically be in the format "Python x.y.z", where x, y, and z represent the major, minor, and micro versions respectively.

For example, the output might be:

```sh
python3 --version
#
# Python  3.9.2
```

This means Python version 3.9.2 is installed on your Linux system.

### Verify the installation

To verify that the Python version displayed is correct, you can also enter the Python interactive shell by typing the following command and pressing Enter:

```sh
python
```

This will open the Python shell, where you can interactively execute Python commands.

### Check the version from the Python shell:

In the Python shell, you can confirm the version by typing the following command and pressing Enter:

```py
import sys
print(sys.version)
```

The output will display detailed information about the Python version, including the version number, build information, and additional details.

### Exit the Python shell

To exit the Python shell, you can type `exit()` or press <kbd>Ctrl</kbd>+<kbd>D</kbd>.

By following these steps, you can easily check the Python version installed on your Linux system.

---

## Conclusion

By following the instructions provided in this article, you can easily check your Python version whether you use Mac, Windows, or Linux. This will help you write your Python programs confidently.

Remember to consult the relevant documentation or community resources if you encounter any issues or if you are using non-standard Python distributions or virtual environments.

As Python continues to evolve, staying updated with the installed Python version becomes increasingly important. This knowledge lets you to take advantage of new features and improvements introduced in newer Python releases while ensuring compatibility with existing codebases.

Let's connect on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`Shittu_Olumide_`)](https://x.com/Shittu_Olumide_) and on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`olumide-shittu`)](https://linkedin.com/in/olumide-shittu). You can also subscribe to my [<VPIcon icon="fa-brands fa-youtube"/>YouTube](https://youtube.com/channel/UCNhFxpk6hGt5uMCKXq0Jl8A) channel.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Check Python Version - How to Check Py in Mac, Windows, and Linux",
  "desc": "By Shittu Olumide Python is a versatile and widely used programming language known for its simplicity and readability.  With its ever-evolving nature, different versions of Python are often released, each offering new features, enhancements, and bug ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/check-python-version-how-to-check-py-in-mac-windows-and-linux.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
