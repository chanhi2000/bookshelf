---
lang: en-US
title: "The Terminal: First Steps and Useful Commands"
description: "Article(s) > The Terminal: First Steps and Useful Commands"
icon: iconfont icon-shell
category:
  - Shell
  - Git
  - Article(s)
tag:
  - blog
  - realpython.com
  - shell
  - sh
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Terminal: First Steps and Useful Commands"
    - property: og:description
      content: "The Terminal: First Steps and Useful Commands"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/terminal-commands.html
prev: /programming/sh/articles/README.md
date: 2023-02-22
isOriginal: false
author:
  - name: Philipp Acsany
    url : https://realpython.com/team/pacsany/
cover: https://files.realpython.com/media/Showcase-Working-with-the-Terminal_Watermarked.5edec84a1425.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Terminal: First Steps and Useful Commands"
  desc="The terminal is an essential tool in your journey as a Python developer. This tutorial helps you to get started with the terminal, pip, and Git by showcasing interesting commands that you can incorporate into your workflow."
  url="https://realpython.com/terminal-commands"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Showcase-Working-with-the-Terminal_Watermarked.5edec84a1425.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Using the Terminal on Windows – Real Python"
  desc="In this Code Conversation video course, you'll learn how to use the terminal on Windows. You'll navigate the file system with Philipp and Ian and perform common tasks like creating files and folders. If you've never used the terminal before, then this video course will help you get started."
  url="https://realpython.com/courses/using-terminal-windows//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Using-the-Terminal-on-Windows_Watermarked.673920731e65.jpg"/>

:::

The terminal can be intimidating to work with when you’re used to working with graphical user interfaces (GUIs). However, it’s an important tool that you need to get used to in your journey as a Python developer. And once you level up your skill of using the terminal, it becomes an extremely powerful tool in your repertoire. With just a few commands in the terminal, you can do tasks that are impossible or at least very tedious to do in a GUI.

::: info In this tutorial, you’ll learn how to

- **Find the terminal** on your operating system
- **Open the terminal** for the first time
- **Navigate your file system** with basic commans
- **Create files and folders** with the terminal
- Manage packages with **`pip` commands**
- Keep track of your files with **Git in the terminal**

:::

If you’re new to working with the terminal, or you’re looking to expand your understanding of its capabilities, then this tutorial is a great starting point. In it, you’ll get an introduction to some of the basic commands and learn how to use `pip` and Git to manage your projects in the terminal.

Understanding how to integrate the terminal, `pip`, and Git into your workflows is essential for you as a Python developer. However, it’s important to note that you’ll only scratch the surface of what the terminal can do, and there’s much more to learn as you continue to explore the terminal as an essential development tool.

---

## Install and Open the Terminal

Back in the day, the term *terminal* referred to [<FontIcon icon="fa-brands fa-wikipedia-w"/>some clunky hardware](https://en.wikipedia.org/wiki/Computer_terminal) that you used to enter data into a computer. Nowadays, people are usually talking about a [<FontIcon icon="fa-brands fa-wikipedia-w"/>terminal emulator](https://en.wikipedia.org/wiki/terminal_emulator) when they say **terminal**, and they mean some kind of terminal software that you can find on most modern computers.

::: note

There are two other terms that you might hear now and then in combination with the terminal:

1. A **shell** is the program that you interact with when running commands in a terminal.
2. A **command-line interface (CLI)** is a program designed to run in a shell inside the terminal.

:::

In other words, the shell provides the commands that you use in a command-line interface, and the terminal is the application that you run to access the shell.

If you’re using a Linux or macOS machine, then the terminal is already built in. You can start using it right away.

On Windows, you also have access to command-line applications like the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Command Prompt](https://en.wikipedia.org/wiki/Cmd.exe). However, for this tutorial and terminal work in general, you should use the Windows terminal application instead.

Read on to learn how to install and open the terminal on Windows and how to find the terminal on Linux and macOS.

### <FontIcon icon="fa-brands fa-windows"/>Windows

The **Windows terminal** is a modern and feature-rich application that gives you access to the command line, multiple shells, and advanced customization options. If you have Windows 11 or above, chances are that the Windows terminal is already present on your machine. Otherwise, you can download the application from the [<FontIcon icon="fa-brands fa-microsoft"/>Microsoft Store](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) or from the official [GitHub repository (<FontIcon icon="iconfont icon-github"/>`microsoft/terminal`)](https://github.com/microsoft/terminal).

Before continuing with this tutorial, you need to get the terminal working on your Windows computer. You can follow the [Your Python Coding Environment on Windows: Setup Guide](https://realpython.com/python-coding-setup-windows/) to learn [**how to install the Windows terminal**](/realpython.com/python-coding-setup-windows.md#installing-windows-terminal).

After you install the Windows terminal, you can find it in the Start menu under *Terminal*. When you start the application, you should see a window that looks like this:

![Windows Terminal with Windows PowerShell tab](https://files.realpython.com/media/win-10-setup-14-windows-powershell_-_cropped.f114376b1071.png)

It can be handy to create a desktop shortcut for the terminal or pin the application to your task bar for easier access.

### <FontIcon icon="fa-brands fa-linux"/>Linux

You can find the terminal application in the application menu of your Linux distribution. Alternatively, you can press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> on your keyboard or use the application launcher and search for the word *Terminal*.

After opening the terminal, you should see a window similar to the screenshot below:

![Screenshot of the Linux terminal](https://files.realpython.com/media/linux-terminal.28e537154512.png)

How you open the terminal may also depend on which Linux distribution you’re using. Each one has a different way of doing it. If you have trouble opening the terminal on Linux, then the Real Python community will help you out in the comments below.

### <FontIcon icon="iconfont icon-macos"/>macOS

A common way to open the terminal application on macOS is by opening the [<FontIcon icon="iconfont icon-macos"/>Spotlight Search](https://support.apple.com/en-us/guide/mac-help/mchlp1008/mac) and searching for *Terminal*. You can also find the terminal app in the application folder inside Finder.

When you open the terminal, you see a window that looks similar to the image below:

![Screenshot of the macOS terminal](https://files.realpython.com/media/macos-terminal.9764cd36cc33.png)

After you launch the terminal application, you’ll see a window that waits for commands. That’s similar to when you’re interacting with a [**Python script that expects user input**](/realpython.com/python-input-output.md).

If you want to interact with the terminal, then you need to know which terminal commands you can enter to proceed. In the next section, you’ll learn about basic terminal commands that’ll help you get started.

---

## Learn Basic Terminal Commands

To work with the terminal effectively, it’s important to understand some basic **terminal commands** and know how to use them. Terminal commands are the instructions that you type into the terminal to execute a specific task.

Depending on your operating system, you’ll run the terminal commands in a specific shell. For Linux, it’s most likely [<FontIcon icon="fa-brands fa-wikipedia-w"/>Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)), for newer macOS versions it’s [<FontIcon icon="fa-brands fa-wikipedia-w"/>Zsh](https://en.wikipedia.org/wiki/Z_shell), and for Windows it’s [<FontIcon icon="fa-brands fa-wikipedia-w"/>PowerShell](https://en.wikipedia.org/wiki/PowerShell). These shells differ in their features, but they share most of the basic commands.

::: note

You can think of commands as little programs that are built into your shell or can be added by external applications. In PowerShell, commands are also known as [<FontIcon icon="iconfont icon-powershell"/>cmdlets](https://learn.microsoft.com/en-us/powershell/scripting/powershell-commands?view=powershell-7.3).

:::

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

These are the Windows commands that you’ll cover:

| Command | Description |
| :--- | :--- |
| `pwd` | Print the path of the current directory |
| `mkdir` `FOLDERPATH` | Create a new directory |
| `ni FILEPATH` | Create a new file |
| `clear` | Clear the terminal window |
| `ls` | List the contents of a folder |
| `ls -al` | List all the contents of a folder with info |
| `cat TARGET` | Show the content of `TARGET` |
| `cd FOLDERPATH` | Change into a directory |
| `cd ..` | Change into the parent directory |
| `echo TEXT` | Print `TEXT` to the terminal |
| `echo TEXT > TARGET` | Print `TEXT` to a file named `TARGET` |
| `echo TEXT >> TARGET` | Append `TEXT` to `TARGET` |
| `cp SOURCE TARGET` | Copy `SOURCE` to `TARGET` |
| `rni SOURCE TARGET` | Rename `SOURCE` to `TARGET` |
| `python PYTHONFILE` | Run `PYTHONFILE` |

The terms in uppercase letters are references to the arguments that the commands allow.

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

These are the Linux and macOS commands that you’ll cover:

| Command | Description |
| :--- | :--- |
| `pwd` | Print the path of the current directory |
| `mkdir` `FOLDERPATH` | Create a new directory |
| `touch` `FILEPATH` | Create a new file |
| `clear` | Clear the terminal window |
| `ls` | List the contents of a folder |
| `ls -al` | List all the contents of a folder with info |
| `cat TARGET` | Show the content of `TARGET` |
| `cd FOLDERPATH` | Change into a directory |
| `cd ..` | Change into the parent directory |
| `echo TEXT` | Print `TEXT` to the terminal |
| `echo TEXT > TARGET` | Print `TEXT` to a file named `TARGET` |
| `echo TEXT >> TARGET` | Append `TEXT` to `TARGET` |
| `cp SOURCE TARGET` | Copy `SOURCE` to `TARGET` |
| `mv SOURCE TARGET` | Rename or move `SOURCE` to `TARGET` |
| `python PYTHONFILE` | Run `PYTHONFILE` |

The terms in uppercase letters are references to the arguments that the commands allow.

:::

You’ll learn how to navigate the file system and create, edit, and delete files and directories. By the end of this section, you’ll have a solid foundation for working with the terminal and be able to perform many everyday tasks with confidence. You can take this confidence and use it to tackle other tasks in the terminal, such as using `pip`, interacting with Git, and [**building command-line interfaces with Python**](/realpython.com/command-line-interfaces-python-argparse.md).

### Navigate Your File System

The file system is the hierarchical structure of directories and files on a computer. It’s usually what you see when you open a GUI file system application like Windows Explorer or the macOS Finder. It also happens to be an excellent place to start your terminal journey, but again, you’re just dipping a toe into all the terminal’s capabilities here.

The folder that you have currently open in a file system is the **current working directory** (cwd). As you’ll notice, you use the working directory as a reference point for many file system operations. Understanding the file system and the current working directory as a state is important for effectively navigating and managing files and directories in the terminal.

After you’ve opened the terminal app, you usually start in the user folder of your operating system. You see a **command prompt** that’s waiting for your input. As you’ll learn, you can use a wide variety of commands as input. But some common commands are the ones to navigate the file system.

To get things started, find out what your current working directory is:

```sh
pwd
#
# /Users/realpython
```

The `pwd` command stands for *print working directory*, which is the command that you use to determine your current location within the file system. Here `pwd` shows that the current working directory is `/Users/realpython`.

The working directory is the current directory that you’re operating in. It’s where commands will be executed by default.

Dig Deeper Into the Current Working DirectoryShow/Hide

There are two terms that are worth exploring in the context of the current working directory:

#### Environment Variables

**Environment variables** are variables that store stateful information about the environment in which the terminal is running. They can be used to store information such as the current working directory, the location of installed software, or the user’s home directory. The terminal can access and use this information to determine how to operate and where to look for files.

#### PATH

**PATH** is an environment variable that stores a list of directories. To see what paths are in your PATH, call the following command:

::: tabs

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
(cat ENV:Path) -Split ";"
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
echo "${PATH//:/\n}"
```

:::

When you enter a command in the terminal, the system will look for a program that matches the command in the directories listed in the PATH. The list visible after running the previous command is the list of locations that your system will look for when evaluating which program to run.

To see which files and folders the <FontIcon icon="fas fa-folder-open"/>`/Users/realpython` directory contains, you can use `ls`, which is short for *list*:

```sh
ls
# 
# Applications          Movies
# Desktop               Music
# Documents             Pictures
# Downloads             Public
# Library
```

When you type `ls` and press <kbd>Enter</kbd>, you see a list of all the items in the current working directory. In this case, the example shows the folders that you commonly find in the user directory on a macOS machine.

You can also use the `-a` flag with the `ls` command, which stands for *all*. The `-a` flag shows you all the items in the current working directory, including the hidden items.

Another flag that you can use is `-l`, which stands for *long*. When you use this flag along with `ls`, the command shows you detailed information about the items in the current working directory.

You can also combine these flags to show detailed information about all the items, including the hidden ones, by using `ls -al`:

```sh
ls -al
#
# total 80
# drwxr-xr-x+  25 realpython  staff    800 Nov 26 11:51 .
# drwxr-xr-x    6 root        admin    192 Nov  7 13:22 ..
# -rw-r--r--@   1 realpython  staff  14340 Nov  7 16:04 .DS_Store
# drwx------  134 realpython  staff   4288 Nov  8 18:37 .Trash
# drwx------@   3 realpython  staff     96 Dec  3  2021 Applications
# drwx------@  22 realpython  staff    704 Nov  7 16:00 Desktop
# drwx------+   4 realpython  staff    128 Nov 17  2021 Documents
# drwx------+   3 realpython  staff     96 Nov  1  2021 Downloads
# drwx------@  86 realpython  staff   2752 Nov  7 21:08 Library
# drwx------  6 realpython  staff    192 Jul 12 14:53 Movies
# drwx------+   4 realpython  staff    128 Nov 26  2021 Music
# drwx------+   4 realpython  staff    128 Nov  1  2021 Pictures
# drwxr-xr-x+   4 realpython  staff    128 Nov  1  2021 Public
```

The output will show the file type, permissions, owner, size, and timestamp of all the items in the current working directory, including the hidden files and folders. Here, for example, the hidden items are `.DS_Store` and `.Trash`.

::: note

You can recognize hidden items in the terminal by a dot (`.`) at the start of their name, but there are a couple of dot items that you shouldn’t confuse for hidden files. The single dot (`.`) in the list above represents the current directory, and the two dots (`..`) link to the parent directory. You’ll work with both of them later in this tutorial.

:::

Hidden files and folders aren’t displayed by default. That’s okay for casual users. But for you as a developer, hidden items can be of interest. They often store configuration data or settings for various applications or the system itself.

The output above may be a bit overwhelming at first. Have a look at this line to understand the output better:

```sh
# drwx------@  22 realpython  staff    704 Nov  7 16:00 Desktop
```

This line gives you valuable information about an item. There’s a directory named *Desktop*. The last modified date is November 7 at 16:00, and it has a size of 704 bytes.

Apart from that, you can see information about the owner and group permissions. If you want to learn more about the file system permission notation, then you can check out the [<FontIcon icon="fa-brands fa-wikipedia-w"/>notation of traditional Unix permissions](https://en.wikipedia.org/wiki/File-system_permissions#Notation_of_traditional_Unix_permissions).

Each folder in the output of `ls` represents a subfolder that’s inside your current working directory. To change the current working directory into the <FontIcon icon="fas fa-folder-open"/>`Desktop/` subfolder, you use the *change directory* command, `cd`:

```sh
pwd
# 
# /Users/realpython
cd Desktop 
pwd
#
# /Users/realpython/Desktop
```

When you enter `cd` followed by a directory name, it’ll change the current working directory to the specified directory. After you run the command `cd Desktop`, the current working directory changes to <FontIcon icon="fas fa-folder-open"/>`/Users/realpython/Desktop`.

Note that you don’t specify a slash `/` or drive indicator like `C:` at the beginning of `Desktop`. Calling a path like this indicates that you want to navigate into a path that’s relative to the directory that you’re in right now.

You used a **relative path** in the command above to navigate into a subfolder. Relative paths make it convenient to reference items in your file system because you don’t have to specify the complete path from the root directory. That being said, you can also change into any directory of your file system by using a complete or **absolute path**:

::: tabs

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
cd C:\Users\realpython\Desktop
pwd
# 
# C:\Users\realpython\Desktop
```

In this case, the `cd` command changes the current working directory to the directory <FontIcon icon="fas fa-folder-open"/>`C:\Users\realpython\Desktop`, independently of its previous location.

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
cd /Users/realpython/Desktop
pwd
# 
# /Users/realpython/Desktop
```

In this case, the `cd` command changes the current working directory to the directory <FontIcon icon="fas fa-folder-open"/>`/Users/realpython/Desktop`, independently of its previous location.

:::

If you use `cd` with a path that doesn’t exist, then the terminal will print an error. You’ll soon learn how to create new directories. Before you do, make one last move in your file system.

To move one directory up, you usually don’t use the name of the parent folder but two dots:

```sh
cd ..
pwd
#
# /Users/realpython
```

The two dots (`..`) represent the parent directory of the current directory. Using `cd ..` moves you up one directory in the file system hierarchy.

In a GUI file system application like Windows Explorer or the macOS Finder, you’d click little folder icons with your mouse cursor. In the terminal application, you use commands to perform tasks—for example, `cd` to move between folders and `ls` to get an overview of the items in a directory.

### Create Files and Folders

In this section, you’ll learn how to create and manage files and folders directly from the terminal with some new commands. Additionally, you’ll continue to list the contents of a directory with `ls` and move between folders with `cd`, just like you learned before.

With the knowledge from this section, you’ll be able to create and organize your projects from within the terminal.

Start by making sure that your current working directory is the Desktop. Then, use `mkdir` to create a new folder named <FontIcon icon="fas fa-folder-open"/>`rp_terminal`:

::: tabs

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
cd C:\Users\realpython\Desktop
pwd
# 
# C:\Users\realpython\Desktop
mkdir rp_terminal
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
cd /Users/realpython/Desktop
pwd
#
# /Users/realpython/Desktop
mkdir rp_terminal
```

You use the `mkdir` command to create a new directory. The command stands for *make directory*. Here, you name the new directory <FontIcon icon="fas fa-folder-open"/>`rp_terminal`.

Next, move into <FontIcon icon="fas fa-folder-open"/>`rp_terminal/` and create a new file named <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py`. Select your operating system below and use your platform-specific command accordingly:

::: tabs

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
cd rp_terminal
ni hello_terminal.py
```

When you run the `ni` command, you create an empty file with the given name. In this case, the file is a Python script named <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py`.

If a file with the provided name already exists, then using `ni` updates the file’s timestamp to the current date and time, but doesn’t change its contents. The `ni` command stands for *new item*.

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
cd rp_terminal
touch hello_terminal.py
```

When you run the `touch` command, you create an empty file with the given name. In this case, the file is a Python script named <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py`.

If a file with the provided name already exists, then using `touch` updates the file’s timestamp to the current date and time. The `touch` command also updates a file’s access and modification times, even if its content remains the same.

:::

Use the long format of `ls` to verify that you created the file successfully:

```sh
ls -l
#
# total 0
# -rw-r--r--@ 1 realpython  staff  0 Nov 27 12:09 hello_terminal.py
```

The `0` between the group and the timestamp indicates that <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` is currently empty. You’ll use the `echo` command to add content to <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` in a moment. Before you do so, have a look at what `echo` does when you type the command followed by some text:

```sh
echo 'print("Hello, terminal!")'
#
# print("Hello, terminal!")
```

As a Python developer, you know that the text you just provided to `echo` is a [**`print()` function call**](/realpython.com/python-print/README.md/). However, for the echo command, it’s a plain string, which it outputs back into the terminal. More specifically, the `echo` command sends the string to the **standard output stream (`stdout`)**.

The `stdout` is the default destination for data that a command-line program sends. The data is displayed on the screen, but you can tell the terminal to redirect `stdout` to a file:

```sh
echo 'print("Hello, terminal!")' > hello_terminal.py
```

Again, you’re using `echo` to output a given string. But this time, you use the caret symbol (`>`) to send the output into <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py`.

::: note

Be careful when redirecting the `stdout` to existing files. Any content that the file contains will be overwritten without warning.

:::

When you redirect the output of the `echo` command into a nonexistent file, then you’re creating the file in the same step.

One way to check if the command worked is to list the contents of your folder again:

```sh
ls -l
#
# total 8
# -rw-r--r--@ 1 realpython  staff  26 Nov 27 12:12 hello_terminal.py
```

Perfect, the size of <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` is 26 bytes now. To verify that it contains the `print()` function call, you can use the `cat` command:

```sh
cat hello_terminal.py
#
# print("Hello, terminal!")
```

Disappointingly, the `cat` command doesn’t have to do anything with cats. It’s short for *concatenate*.

When you use `cat` with multiple files as arguments, you can concatenate them and display the contents one after another. If you use `cat` with only one file, then `cat` is a convenient way to display the contents of a file in the terminal.

Now that you know that <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` contains valid Python code, you can [**run the Python script**](/realpython.com/run-python-scripts.md):

```sh
python hello_terminal.py
#
# Hello, terminal!
```

When you’re using the `python` command, the terminal looks for the Python executable in your [**PATH**](/realpython.com/add-python-to-path.md).

If you run the `python` command without any arguments, then you’ll launch the [**interactive Python interpreter**](/realpython.com/interacting-with-python.md), also known as the [**REPL**](/realpython.com/python-repl/README.md). When you run the command with a script file as an argument, then Python runs the provided script.

In this case, you’re executing `hello_terminal.py`, and you see the output of your `print()` function directly in the terminal. This works because Python’s `print()` uses `stdout` by default.

::: note

When you run a Python script in the terminal, the script will output any [**error messages**](/realpython.com/python311-error-messages.md) to the **standard error stream** (`stderr`). The standard error stream is a separate output channel that’s used specifically for error messages, warnings, and other diagnostic information.

:::

With this separate output channel for error messages, you can redirect or filter regular output and diagnostic messages independently.

With the knowledge gained in this section, you can now create, edit, and inspect Python files within the terminal. You’re now well equipped to move on to working with a command-line tool that’s essential on your journey as a Python developer. It’s called `pip`, and it enables you to include external packages in your Python projects.

---

## Manage Packages With `pip`

The `pip` package manager is an essential tool for [**managing Python packages**](/realpython.com/what-is-pip.md). To avoid installing packages directly into your system Python installation, you can use a **virtual environment**.

A [**virtual environment**](/realpython.com/python-virtual-environments-a-primer.md) provides an isolated Python interpreter for your project. Any packages that you use inside this environment will be independent of your system interpreter. This means that you can keep your project’s dependencies separate from other projects and the system at large.

### Create a Virtual Environment

Python has the built-in [<FontIcon icon="fa-brands fa-python"/>`venv`](https://docs.python.org/3/library/venv.html) module for creating virtual environments. This module helps you create virtual environments with an isolated Python installation. Once you’ve activated the virtual environment, you can install packages into this environment. The packages that you install into one virtual environment are isolated from all the other environments on your system.

You can follow these steps to create and activate a virtual environment named `venv`:

::: tabs

@tab <FontIcon icon="iconfont icon-powershell"/>

```powershell
python -m venv venv
venv\Scripts\activate
#
# (venv) PS>
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python -m venv venv
source venv/bin/activate
#
# (venv) $
```

:::

Note that the command prompt has changed. This is a reminder that you’re working within the indicated virtual environment.

::: note

When you’re done working with this virtual environment, then you can deactivate it by running the `deactivate` command.

:::

When you activate a virtual environment with Python’s `venv` module, you’re adding a new entry to the `PATH` environment variable. The new entry points to the location of the virtual environment’s Python executable. This ensures that when you run Python commands or scripts, they’ll use this specific Python executable instead of any other version of Python that may be installed on your system.

### Install a Package

In this section, you’ll install the [**Rich library**](/realpython.com/python-rich-package.md) by [**Will McGugan**](/realpython.com/interview-will-mcgugan.md), which enables you to create colorful text user interface (TUI) applications for the terminal.

Before you install `rich`, check which Python packages are currently installed in your virtual environment:

```sh
python -m pip list
#
# Package    Version
# ---------- -------
# pip        22.3
# setuptools 65.5.0
```

Running `python -m pip list` lists all the packages installed in the current environment. Both `pip` and `setuptools` are default packages that you’ll find when you start a new virtual environment.

To install `rich`, use the command below:

```sh
python -m pip install rich
#
# Collecting rich
#  ...
# Installing collected packages: commonmark, pygments, rich
# Successfully installed commonmark-0.9.1 pygments-2.14.0 rich-13.0.1
```

Besides `rich`, you also installed some other dependencies that you need when you want to use `rich`. To check all the currently installed packages, you can run `python -m pip list` again:

```sh
python -m pip list
#
# Package    Version
# ---------- -------
# commonmark 0.9.1
# pip        22.3
# Pygments   2.14.0
# rich       13.0.1
# setuptools 65.5.0
```

To see the capabilities that `rich` offers, run `rich` without any arguments:

```sh
python -m rich
```

Depending on your terminal’s capabilities, you should see examples that look like this:

![Example output of the rich Python package](https://files.realpython.com/media/python-rich-example.a5212b91d9b6.png)

In the screenshot above, you can get an impression of what you can do with the `rich` library. The terminal doesn’t have to be a dark place after all!

Now that your screen is filled from top to bottom, you may want to clear your terminal window again. For this, you can use the `clear` command:

```sh
clear
```

You use the `clear` command to clear the terminal screen. It removes all the text and content currently displayed on the terminal, leaving a blank screen. For example, you might want to clear the terminal screen before you run new commands.

In some terminals, you can use <kbd>Ctrl</kbd>+<kbd>L</kbd> or <kbd>Cmd</kbd>+<kbd>L</kbd> as keyboard shortcuts to clear the screen.

You’ve learned how to use `pip` directly from the terminal in this section. Knowing how to use `pip` in the terminal is crucial for any Python developer, as it allows you to effectively manage and update the packages that you use in your projects.

If you want to learn more about virtual environments and `pip`, then you can check out Real Python’s [**primer on Python virtual environments**](/realpython.com/python-virtual-environments-a-primer.md) and tutorial on how to [**use Python’s `pip` to manage your projects’ dependencies**](/realpython.com/what-is-pip.md). Both are essential tools to make your life as a Python developer more convenient.

Another helpful tool to manage your projects is Git. Read on to learn how to improve your terminal skills and dive into the world of version control with Git.

---

## Interact With Git

[<FontIcon icon="iconfont icon-git"/>Git](https://git-scm.com) is a **version control system** that developers commonly use, no matter which programming language they’re writing their code in. A version control system tracks changes made to files over time and helps you revert code to a previous version if needed.

In this section, you’ll learn how to interact with Git directly from the terminal. You’ll initialize a Git repository, track files, and create commits.

There are a bunch of [<FontIcon icon="iconfont icon-git"/>GUI clients](https://git-scm.com/downloads/guis) for Git. They can be convenient to use and help you understand Git logic better by providing rich visual feedback.

However, it’s still a good idea to learn the basics of interacting with Git in the terminal. Learning the basic Git terminal commands can help you understand how Git works under the hood.

### Initiate a Git Repository

The first step in using Git is to initialize a **repository**. A repository is a container that holds all your project files, folders, and metadata.

Create a new Git repository with the command below:

```sh
git init
#
# Initialized empty Git repository in
# ⮑ /Users/realpython/Desktop/rp_terminal/.git/
```

When you run the `git init` command, Git creates an empty repository in the current working directory. This creates a new subdirectory named `.git/` that contains all of the necessary repository files.

::: note

If you get an error when you use the `git` command, then you may need to [<FontIcon icon="iconfont icon-git"/>download and install a current version of Git](https://git-scm.com/downloads) for your operating system.

:::

After initializing the repository, you can check the status of your repository:

```sh
git status
# 
# On branch main
# 
# No commits yet
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#  hello_terminal.py
#  venv/
# 
# nothing added to commit but untracked files present (use "git add" to track)
```

The `git status` command shows your repository’s current status. It displays which **branch** you’re on and whether or not there are any **commits**.

A Git commit is a snapshot of the changes made to the files in a Git repository. When you make changes to your files and save them, you can take a snapshot of those changes by creating a commit on a branch. As you make new commits, the branch points to the latest commits.

In this case, you’re on the <FontIcon icon="fas fa-code-branch"/>`main` branch, and there are no commits yet. You can also create new branches to work on new features or bug fixes and then switch between branches as needed. If you want to, then you can create multiple branches to work on various versions of your codebase simultaneously.

Additionally, `git status` shows you which files are untracked, meaning that Git isn’t tracking them. You might want to ignore specific files and folders, such as the <FontIcon icon="fas fa-folder-open"/>`venv/` folder, so that Git won’t track them.

::: details Which Files to Ignore

A general rule of thumb for ignoring files in a Git repository is to ignore any files that are specific to your local development environment or files that are generated by your build process. Some examples of files that should typically be ignored include:

- Files containing **sensitive information**, such as passwords or private keys
- Binary files that are generated by your **build process**, like compiled executables or object files
- Files specific to your **local development environment**, such as virtual environment files or user-specific editor configuration files
- **Temporary files** or files created by your **operating system**, such as `.DS_Store` on macOS or `Thumbs.db` on Windows
- **Log files** or other files that your application generates at runtime

Check out [GitHub’s collection of <FontIcon icon="iconfont icon-git"/>`.gitignore` templates (<FontIcon icon="iconfont icon-github"/>`github/gitignore`)](https://github.com/github/gitignore) to get an overview of common <FontIcon icon="iconfont icon-git"/>`.gitignore` files. There you’ll also find a [Python specific <FontIcon icon="iconfont icon-git"/>`.gitignore` example (<FontIcon icon="iconfont icon-github"/>`github/gitignore`)](https://github.com/github/gitignore/blob/main/Python.gitignore).

:::

You can ignore files in Git by creating a <FontIcon icon="iconfont icon-git"/>`.gitignore` file and listing the files and folders that you want to ignore in that file:

```sh
echo "venv" > .gitignore
```

As you learned before, this command creates a new file named <FontIcon icon="iconfont icon-git"/>`.gitignore` and writes `venv` to it. Verify the current items in your Git repository by leveraging another command that you already know:

```sh
ls -a
# 
# .          .git          hello_terminal.py
# ..         .gitignore    venv
```

You now have a <FontIcon icon="iconfont icon-git"/>`.gitignore` file next to your <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` file, your <FontIcon icon="fas fa-folder-open"/>`venv/` folder, and the <FontIcon icon="fas fa-folder-open"/>`.git/` folder. To check if Git ignores the <FontIcon icon="fas fa-folder-open"/>`venv/` folder, run `git status` again:

```sh
git status
# 
# On branch main
# 
# No commits yet
# 
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#  .gitignore
#  hello_terminal.py
# 
# nothing added to commit but untracked files present (use "git add" to track)
```

Perfect, Git now only shows <FontIcon icon="iconfont icon-git"/>`.gitignore` and <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` as untracked files. Git knows the files are there, but you haven’t yet added them to the repository.

### Track Files With Git

When you start a new project, you’ll likely want to keep track of your changes over time. In the previous section, you initialized a new repository with `git init`. Now it’s time to start tracking files.

You use the `git add` command to tell Git which files you want to track:

```sh
git add .
```

Remember the dot `.` in the directory listing before? The dot refers to the current directory. Using `.` at the end of the `git add` command tells Git to track all the files in the current directory. Once you’ve added files to the repository, you can check the status of your files using the `git status` command:

```sh
git status
# 
# On branch main
# 
# No commits yet
# 
# Changes to be committed:
#  (use "git rm --cached <file>..." to unstage)
#  new file:   .gitignore
#  new file:   hello_terminal.py
```

You can see in the output that the files <FontIcon icon="fa-brands fa-python"/>`hello_terminal.py` and <FontIcon icon="iconfont icon-git"/>`.gitignore` are added and ready to be committed:

```sh
git commit -m "Initiate git repository"
# 
# [main (root-commit) 7b20833] Initiate git repository
#  2 files changed, 2 insertions(+)
#  create mode 100644 .gitignore
#  create mode 100644 hello_terminal.py
```

With the `git commit` command, you take a snapshot of the current state of your files and store it in the repository’s history. The `-m` flag allows you to include a message describing your changes. The output shows the branch that you’re on and the number of files changed.

After you commit any changes, it’s a good idea to check the status of your Git repository again:

```sh
git status
# 
# On branch main
# nothing to commit, working tree clean
```

You can see in the output that there’s nothing to commit, meaning that all changes have been successfully committed.

The workflow that you used in this section is typical when you use Git in the terminal. You use the `git add` command to tell Git which files to track. Then you use `git commit` to take a snapshot of the current state of your files and save it to the repository’s history.

Additionally, it’s good practice to use `git status` often to check the current status of your repository.

While you’ve gotten an introduction to using Git in the terminal, there’s much more that Git has to offer you as a Python developer. If you’re interested in learning more about Git, then you can check out the [**introduction to Git and GitHub for Python developers**](/realpython.com/python-git-github-intro.md) and dive even deeper with [**advanced Git tips for Python developers**](/realpython.com/advanced-git-for-pythonistas.md).

---

## Next Steps

The more you use the terminal, the more comfortable you’ll get. A fun way to introduce the terminal into your workflows as a Python developer is to create Python scripts with command-line interfaces. For example, you can build a:

- [**Quiz Application With Python**](/realpython.com/python-quiz-application.md)
- [**Site Connectivity Checker in Python**](/realpython.com/site-connectivity-checker-python.md)
- [**Command-Line To-Do App With Python and Typer**](/realpython.com/python-typer-cli.md)
- [**Python Directory Tree Generator for the Command Line**](/realpython.com/directory-tree-generator-python.md)
- [**Weather CLI App With Python**](/realpython.com/build-a-python-weather-app-cli.md)
- [**Wordle Clone With Python and Rich**](/realpython.com/python-wordle-clone.md)

Especially for a Python developer, knowing how to work with the terminal can be extremely useful for various reasons. Besides using `pip` and Git to manage your Python projects, there are even more examples of when the terminal comes in handy:

- **Command-line interfaces:** Many popular Python libraries and frameworks—such as [<FontIcon icon="fas fa-globe"/>Django](https://realpython.com/tutorials/django/), [<FontIcon icon="fas fa-globe"/>Flask](https://realpython.com/tutorials/flask/), and [**Poetry**](/realpython.com/dependency-management-python-poetry.md)—come with command-line interfaces that allow you to perform tasks such as creating new projects, running development servers, and managing databases.
- **Automation and scripting:** The terminal allows you to automate repetitive tasks and create scripts to manage your development workflow—for example, [**running tests**](/realpython.com/python-testing.md) or [**deploying your application**](/realpython.com/django-hosting-on-heroku.md).
- **Debugging:** The terminal can be useful for debugging your code. For instance, you can use [**`print()`**](/realpython.com/python-print/README.md) or [**logging in Python**](/realpython.com/python-logging.md) to show output in the terminal and understand what’s happening in your code. You can also use [**pdb for debugging your Python code**](/realpython.com/python-debugging-pdb.md).
- **Performance:** Many command-line tools are faster than their GUI counterparts and ideal for working with large datasets or performing advanced tasks such as [**data processing and analysis**](/realpython.com/pyspark-intro.md).

Overall, the terminal is a powerful tool that can help you streamline your development workflow, automate tasks, debug your code, and access advanced features of libraries and frameworks. With practice, you’ll find the terminal an invaluable tool for your journey as a Python developer.

---

## Conclusion

When you’re comfortable using the terminal, then you’ll probably be able to navigate your file system faster and with more control than when using your mouse and clicking buttons.

::: info In this tutorial, you’ve learned how to

- **Find the terminal** on your operating system
- **Open the terminal** for the first time
- **Navigate your file system** with basic commands
- **Create files and folders** with the terminal
- Manage packages with **`pip` commands**
- Keep track of your files with **Git in the terminal**

:::

You’ve boosted your programming skills by learning how to do three really important tasks in the terminal: navigate the file system, manage Python packages with `pip`, and make commits to Git. Learning terminal commands is a great investment for you as a Python developer. Just take your time and get to know this powerful tool step by step. Soon enough, it’ll be an important tool in your repertoire that you can’t live without.

How important is the terminal for your workflow as a Python developer? Are there any essential commands that you would add to the tutorial? Let the Real Python community know in the comments below!

:: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Using the Terminal on Windows – Real Python"
  desc="In this Code Conversation video course, you'll learn how to use the terminal on Windows. You'll navigate the file system with Philipp and Ian and perform common tasks like creating files and folders. If you've never used the terminal before, then this video course will help you get started."
  url="https://realpython.com/courses/using-terminal-windows//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Using-the-Terminal-on-Windows_Watermarked.673920731e65.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Terminal: First Steps and Useful Commands",
  "desc": "The terminal is an essential tool in your journey as a Python developer. This tutorial helps you to get started with the terminal, pip, and Git by showcasing interesting commands that you can incorporate into your workflow.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/terminal-commands.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
