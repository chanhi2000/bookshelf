---
lang: en-US
title: "How to Run Your Python Scripts and Code"
description: "Article(s) > How to Run Your Python Scripts and Code"
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
      content: "Article(s) > How to Run Your Python Scripts and Code"
    - property: og:description
      content: "How to Run Your Python Scripts and Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/run-python-scripts.html
prev: /programming/py/articles/README.md
date: 2024-12-08
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg
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
  name="How to Run Your Python Scripts and Code"
  desc="A Python script or program is a file containing executable Python code. Being able to run Python scripts and code is probably the most important skill that you need as a Python developer. By running your code, you'll know if it works as planned."
  url="https://realpython.com/run-python-scripts"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: 
<!-- 
<VidStack src="vimeo/326699323" />

<VidStack src="vimeo/326699341" />

<VidStack src="vimeo/326699348" />
-->

<SiteInfo
  name="[COURSE] Running Python Scripts – Real Python"
  desc="This step-by-step course will guide you through a series of ways to run Python scripts, depending on your environment, platform, needs, and skills as a programmer."
  url="https://realpython.com/courses/running-python-scripts/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg"/>

:::

Running a Python script is a fundamental task for any Python developer. You can execute a Python <FontIcon icon="fa-brands fa-python"/>`.py` file through various methods depending on your environment and platform. On Windows, Linux, and macOS, use the command line by typing `python script_name.py` to run your script. You can also use the `python` command with the `-m` option to execute modules. This tutorial covers these methods and more, ensuring you can run Python scripts efficiently.

::: info By the end of this tutorial, you’ll understand that

- **Running a Python <FontIcon icon="fa-brands fa-python"/>`.py` script** involves using the `python` command followed by the script’s filename in the terminal or command prompt.
- **Running Python from the command prompt** requires you to open the command prompt, navigate to the script’s directory, and execute it using `python script_name.py`.
- **Running a <FontIcon icon="fa-brands fa-python"/>`.py` file in Windows** can be done directly from the command prompt or by double-clicking the file if Python is associated with `.py` files.
- **Running a Python script without Python installed** is possible by using online interpreters or converting scripts to executables, but it’s more flexible to install Python and run scripts natively.

:::

To get the most out of this tutorial, you should know the basics of working with your operating system’s [**terminal**](/realpython.com/terminal-commands.md) and file manager. It’d also be beneficial for you to be familiar with a Python-friendly [**IDE or code editor**](/realpython.com/python-ides-code-editors-guide.md) and with the standard Python [**REPL**](/realpython.com/python-repl/README.md) (Read-Eval-Print Loop).

::: info Free Download

[Get a sample chapter from Python Tricks: The Book](https://realpython.com/bonus/python-tricks-sample-pdf/) that shows you Python’s best practices with simple examples you can apply instantly to write more beautiful + Pythonic code.

:::

::: info Quiz - How to Run Your Python Scripts

One of the most important skills you need to build as a Python developer is to be able to run Python scripts and code. Test your understanding on how good you are with running your code.

<SiteInfo
  name="How to Run Your Python Scripts Quiz – Real Python"
  desc="One of the most important skills you need to build as a Python developer is to be able to run Python scripts and code. Test your understanding on how good you are with running your code."
  url="https://realpython.com/quizzes/run-python-scripts//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg"/>

:::

---

## What Scripts and Modules Are

In computing, the term **script** refers to a text file containing a logical sequence of orders that you can run to accomplish a specific task. These orders are typically expressed in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>scripting language](https://en.wikipedia.org/wiki/Scripting_language), which is a [<FontIcon icon="fa-brands fa-wikipedia-w"/>programming language](https://en.wikipedia.org/wiki/Programming_language) that allows you to manipulate, customize, and automate tasks.

Scripting languages are usually [<FontIcon icon="fa-brands fa-wikipedia-w"/>interpreted](https://en.wikipedia.org/wiki/Interpreter_(computing)) at [<FontIcon icon="fa-brands fa-wikipedia-w"/>runtime](https://en.wikipedia.org/wiki/Runtime_(program_lifecycle_phase)) rather than [<FontIcon icon="fa-brands fa-wikipedia-w"/>compiled](https://en.wikipedia.org/wiki/Compiler). So, scripts are typically run by some kind of interpreter, which is responsible for executing each order in a sequence.

Python is an interpreted language. Because of that, Python programs are commonly called scripts. However, this terminology isn’t completely accurate because Python programs can be way more complex than a simple, sequential script.

In general, a file containing executable Python code is called a script—or an **entry-point script** in more complex applications—which is a common term for a top-level **program**. On the other hand, a file containing Python code that’s designed to be imported and used from another Python file is called a **module**.

So, the main difference between a [**module**](/realpython.com/python-modules-packages.md) and a script is that modules store **importable code** while scripts hold **executable code**.

::: note

Importable code is code that defines something but doesn’t perform a specific action. Some examples include function and class definitions. In contrast, executable code is code that performs specific actions. Some examples include [**function calls**](/realpython.com/defining-your-own-python-function.md#function-calls-and-definition.md), loops, and [**conditionals**](/realpython.com/python-conditional-statements.md).

:::

In the following sections, you’ll learn how to run Python scripts, programs, and code in general. To kick things off, you’ll start by learning how to run them from your operating system’s command line or terminal.

---

## How to Run Python Scripts From the Command Line

In Python programming, you’ll write programs in plain text files. By convention, files containing Python code use the `.py` extension, and there’s no distinction between scripts or executable programs and modules. All of them will use the same extension.

::: note

On [**Windows**](/realpython.com/python-coding-setup-windows.md) systems, the extension can also be <FontIcon icon="fa-brands fa-python"/>`.pyw` for those applications that should use the `pythonw.exe` launcher.

:::

To create a Python script, you can use any Python-friendly [**code editor or IDE**](/realpython.com/python-ides-code-editors-guide.md) (integrated development environment). To keep moving forward in this tutorial, you’ll need to create a basic script, so fire up your favorite text editor and create a new <FontIcon icon="fa-brands fa-python"/>`hello.py` file containing the following code:

```py title="hello.py"
print("Hello, World!")
```

This is the classic `"Hello, World!"` program in Python. The executable code consists of a call to the built-in [**`print()`**](/realpython.com/python-print/README.md) function that displays the `"Hello, World!"` message on your screen.

With this small program ready, you’re ready to learn different ways to run it. You’ll start by running the program from your command line, which is arguably the most commonly used approach to running scripts.

### Using the `python` Command

To run Python scripts with the `python` command, you need to open a command-line window and type in the word `python` followed by the path to your target script:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python .\hello.py
#
# Hello, World!

py .\hello.py
#
# Hello, World!
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python ./hello.py
#
# Hello, World!
```

After you press <kbd>Enter</kbd>, you’ll see the phrase `Hello, World!` on your screen. If the previous command doesn’t work right, then you may need to check if Python is in your system’s [**`PATH`**](/realpython.com/add-python-to-path.md). You can also check where you saved <FontIcon icon="fa-brands fa-python"/>`hello.py`.

:::: note

In some Linux distributions and probably in some macOS versions, you may need to use the `python3` command instead of simply `python`.

:::

That’s it! You’ve run your first script! Note that on Windows, you also have the option of using the `py` command, which triggers the `py.exe` launcher for console applications. This is the most basic and practical way to run Python scripts.

::: note

If you’ve never worked with the command line or terminal, then you can try the following, depending on your operating system:

- On Windows, recent versions of the OS come with an application called PowerShell that you can quickly run from the *Search* bar. Once you’ve launched this program, you can start running commands in it.
- On Linux, there are several applications that give you access to the system command line. In many desktop environments, you can quickly access the default terminal by pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>.
- On macOS, you can access the system terminal from the Launchpad by typing *Terminal* and pressing <kbd>Enter</kbd> when the app appears.

:::

To learn more about using the command line or terminal, check out [**The Terminal: First Steps and Useful Commands**](/realpython.com/terminal-commands.md).

A cool feature of a terminal or [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell application](https://en.wikipedia.org/wiki/Unix_shell) is that you can redirect the output of your commands using a straightforward syntax. This feature may be useful in those situations where you have a Python program that can generate a long output, and you’d like to save it to a file for later analysis.

In these situations, you can do something like the following:

```sh
python hello.py > output.txt
```

In this command, the `>` symbol tells the shell to redirect the output of your command to the <FontIcon icon="fas fa-file-lines"/>`output.txt` file, rather than to the standard system output, your screen. This process is commonly known as [<FontIcon icon="fa-brands fa-wikipedia-w"/>redirection](https://en.wikipedia.org/wiki/Redirection_(computing)), and it works on both Windows and [<FontIcon icon="fa-brands fa-wikipedia-w"/>Unix-like](https://en.wikipedia.org/wiki/Unix) systems, such as Linux and macOS.

If the output file doesn’t exist, then the shell automatically creates it. On the other hand, if the file already exists, then the shell overwrites its old content with the new output.

Finally, if you want to add the output of consecutive executions to the end of <FontIcon icon="fas fa-file-lines"/>`output.txt`, then you can use two angle brackets (`>>`) instead of one:

```sh
python hello.py >> output.txt
```

Now, the shell app will append the current output to the end of <FontIcon icon="fas fa-file-lines"/>`output.txt`. You’ll end up with a file containing the phrase `"Hello, World!"` twice.

### Using the Script’s Filename Directly

On Windows, you can also run Python scripts by simply entering the name of the file containing the executable code at the command line:

```powershell
.\hello.py
```

Once you’ve written the path to your script and pressed Enter, you’ll note that a new terminal window appears on your screen for a few seconds, showing the script output. This is possible because Windows associates <FontIcon icon="fa-brands fa-python"/>`.py` and <FontIcon icon="fa-brands fa-python"/>`.pyw` files to `python.exe` and `pythonw.exe`, respectively.

This way of running Python scripts on Windows may be annoying because the code runs in a new terminal window that automatically closes after the execution ends. In most cases, you won’t be able to check the program’s output.

On Linux and macOS, you can also run your scripts directly. However, things are a bit different here, and you need some setup steps. Go ahead and run the following command:

```sh
./hello.py
# 
# bash: ./hello.py: Permission denied
```

Unix systems prioritize security, which means that you can’t go around executing any file as a program. So, you get a permission denied error when you try to run <FontIcon icon="fa-brands fa-python"/>`hello.py` directly. To fix this issue, you need to explicitly tell the system that the file is executable. To do this, you can use the `chmod` command:

```sh
chmod +x hello.py
```

After running this command, your <FontIcon icon="fa-brands fa-python"/>`hello.py` file will be executable. However, that’s not enough for the script to run properly:

```sh
./hello.py
# 
# ./hello.py: line 1: syntax error near unexpected token `"Hello, World!"'
# ./hello.py: line 1: `print("Hello, World!")'`
```

Why are you getting another error now? The problem is that your operating system (OS) doesn’t know which program to use for running your script and is trying to run it with the shell itself. You can fix that by making a small addition to your <FontIcon icon="fa-brands fa-python"/>`hello.py` file:

```py title="hello.py"
#!/usr/bin/env python3
print("Hello, World!")
```

You’ve added a new line at the beginning of <FontIcon icon="fa-brands fa-python"/>`hello.py`. It now starts with a Unix-style [**shebang**](/realpython.com/python-shebang.md), which is a special kind of [**comment**](/realpython.com/python-comments-guide.md) that you can include in your scripts to tell the operating system which program to use for running the content of this file. In this case, you tell the OS to use Python.

::: note

You’ll have at least two different ways to specify the path to the interpreter in the shebang comment:

1. Provide the absolute path to the interpreter, like in `#!/usr/bin/python3`
2. Use the operating system’s `env` command, like in `#!/usr/bin/env python3`

:::

The first approach is less portable because not all Unix systems place the Python interpreter in the same directory. In contrast, the second approach is safer and more portable. It invokes the `env` command to find out where the interpreter lives.

Now you can run the script directly from your command line:

```sh
./hello.py
#
# Hello, World!
```

Wow! That was a long road! However, the effort was worth it. Now when you create a Python script to automate tasks in a Unix operating system, you know how to make it executable and run it from your command line.

### Running Modules With the `-m` Option

The `python` command has a series of [**command-line options**](/realpython.com/python-command-line-arguments.md) that can be useful in specific situations. For example, if you want to run a Python module, then you can use the command `python -m <module-name>`. The `-m` option searches Python’s [<FontIcon icon="fa-brands fa-python"/>module search path](https://docs.python.org/3/tutorial/modules.html#the-module-search-path), `sys.path`, for the module name and runs its content:

```sh
python -m hello
# 
# Hello, World!
```

In this example, you run the <FontIcon icon="fa-brands fa-python"/>`hello.py` file as a module. This is possible because Python automatically adds the current directory to its `sys.path` list. Note that the `module-name` argument needs to be the name of a module object, not a file name. In other words, you don’t include the `.py` suffix.

::: note

Using the `-m` option is common practice when you need to use the [**command-line interface (CLI)**](/realpython.com/command-line-interfaces-python-argparse.md#command-line-interfaces-clis) of standard-library modules, such as [`pip`](https://realpython.com/what-is-pip/), [**`venv`**](/realpython.com/python-virtual-environments-a-primer.md), [**`http.server`**](/realpython.com/python-http-server.md), and [**`zipfile`**](/realpython.com/python-zipfile.md#running-zipfile-from-your-command-line).

:::

If the target module isn’t in `sys.path`, then you get an error:

```sh
python -m missing
# 
# .../python: No module named missing
```

In this example, the `missing` name isn’t in the `sys.path` list, so Python isn’t able to execute it, and therefore it returns an error.

---

## How to Run Python Code Interactively

Running scripts isn’t the only way to run Python code. Because Python is an interpreted language, you can use the interpreter to run code interactively. When you run the `python` command without arguments, you start a new interactive session, or [**REPL**](/realpython.com/python-repl/README.md) (Read-Eval-Print Loop). In there, you can run any Python code and get immediate feedback about how the code works.

In the following sections, you’ll learn the basics of the Python interpreter and how to run code in it. This knowledge will be pretty valuable for you, especially in those situations where you need to quickly test a small piece of Python code.

### Getting to Know the Python Interpreter

Python is a high-level programming language with a clean and readable syntax. Python and its wide ecosystem of packages and libraries can boost your productivity in a [**variety of fields**](/realpython.com/what-can-i-do-with-python.md). The name Python also refers to a piece of software called the **interpreter**, which is the program that allows you to run Python code.

The interpreter is a layer of software that works between your program and your computer hardware to get your code running. Depending on the Python [<FontIcon icon="fa-brands fa-python"/>implementation](https://python.org/download/alternatives/) that you use, the interpreter can be a program written in:

- [**C**](/realpython.com/c-for-python-programmers.md), like [<FontIcon icon="fa-brands fa-python"/>CPython](https://python.org/about/), which is the core implementation of the language
- Python itself, like [**PyPy**](/realpython.com/pypy-faster-python.md), which is a [<FontIcon icon="fas fa-globe"/>fast](http://speed.pypy.org/) implementation with a [<FontIcon icon="fa-brands fa-wikipedia-w"/>just-in-time (JIT) compiler](https://en.wikipedia.org/wiki/Just-in-time_compilation)
- [**Java**](/realpython.com/oop-in-python-vs-java.md), like [<FontIcon icon="fas fa-globe"/>Jython](http://www.jython.org/index.html), which can take advantage of the Java ecosystem
- .NET, like [<FontIcon icon="fas fa-globe"/>IronPython](http://ironpython.net/), which uses the .NET ecosystem

Whatever interpreter you use, the code that you write will run in this program. Therefore, the first condition to be able to run scripts and code is to have the interpreter correctly [**installed**](/realpython.com/installing-python.md) on your operating system.

The Python interpreter can run code in two different modes:

1. [**Script**](/realpython.com/run-python-scripts.md), or program
2. [**Interactive**](/realpython.com/interacting-with-python.md), or REPL

In **script mode**, you use the interpreter to run a source file as an executable program, just like you learned in the previous section. In this case, Python loads the file content and runs the code line by line, following the program’s execution flow.

Alternatively, **interactive mode** is when you launch the interpreter and use it as a platform to run code that you type in directly. This mode is pretty useful for learning Python as well as for developing, testing, and debugging your applications.

### Running Python Code Interactively

Interactive sessions are a widely used tool for running Python code. To start a Python interactive session, or REPL, open a command-line window, type in the `python` command, and then press <kbd>Enter</kbd>.

These steps will take you into the Python interpreter, which looks something like the following:

::: tabs

@tab:active <FontIcon icon="iconfont icon-powershell"/>

```powershell
python
# 
# Python 3.13.1 (main, Dec 5 2024, 14:38:34) [MSC v.1936 64 bit] on win32
# Type "help", "copyright", "credits" or "license" for more information.
# >>>
```

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

```sh
python
# 
# Python 3.13.1 (main, Dec  5 2024, 13:58:44) [GCC 9.4.0] on linux
# Type "help", "copyright", "credits" or "license" for more information.
# >>>
```

:::

The standard primary prompt for the interactive mode consists of three right angle brackets, `>>>`. So, as soon as you see these characters, you’ll know that you’re in.

::: note

The standard REPL also has a secondary prompt that consists of three periods (`...`). This prompt appears when you add indented lines to a [<FontIcon icon="fa-brands fa-python"/>compound statement](https://docs.python.org/3/reference/compound_stmts.html), such as conditionals, function and class definitions, and loops.

:::

The Python interpreter is an interactive way to talk to your computer using the language. It’s like live chat. It’s also known as the REPL because it goes through four steps that run under the hood:

1. **Reading** your input, which consists of Python code as [<FontIcon icon="fa-brands fa-python"/>expressions](https://docs.python.org/3/glossary.html#term-expression) and [<FontIcon icon="fa-brands fa-python"/>statements](https://docs.python.org/3/glossary.html#term-statement)
2. **Evaluating** your Python code, which generates a result or causes [<FontIcon icon="fa-brands fa-wikipedia-w"/>side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science))
3. **Printing** any output so that you can check your code’s results and get immediate feedback
4. **Looping** back to step one to continue the interaction

This feature of Python is a powerful tool that you’ll wind up needing in your Python coding adventure, especially when you’re learning the language or when you’re in the early stages of a development process.

Once you’ve started a REPL session, you can write and run Python code as you wish. The only drawback is that when you close the session, your code will be gone. This is another difference between the script and interactive modes. Scripts are persistent.

When you work interactively, Python evaluates and executes every expression and statement immediately:

```py title="hello.py"
print("Hello, World!")
# 
# Hello, World!
2 + 5
#
# 7
print("Welcome to Real Python!")
#
# Welcome to Real Python!
```

An interactive session will allow you to test every piece of code that you execute. That’s why this tool is an awesome development helper and an excellent space to experiment with the language and test ideas on the fly.

To leave interactive mode and jump back to the system shell, you can use one of the following options:

- Executing the built-in `quit()` or `exit()` functions
- Pressing the <kbd>Ctrl</kbd>+<kbd>Z</kbd> and Enter key combination on Windows, or the <kbd>Ctrl</kbd>+<kbd>D</kbd> combination on Unix systems, such as Linux and macOS

Go ahead and give the Python REPL a try. You’ll see that it’s a great development tool that you must keep in your tool kit.

---

## How to Run Scripts From Python Code

You can also run Python scripts and modules from an interactive session or from a `.py` file. This option opens a variety of possibilities. In the following sections, you’ll explore a few tools and techniques that will allow you to run scripts and code from Python code.

### Taking Advantage of `import` Statements

When you [**import a module**](/realpython.com/absolute-vs-relative-python-imports.md) from another module, script, or interactive session, what really happens is that Python loads its contents for later access and use. The interesting point is that the [**`import`**](/realpython.com/absolute-vs-relative-python-imports.md) statement runs any executable code in the imported module.

When the module contains only [**class**](/realpython.com/python-classes.md), function, [**variable**](/realpython.com/python-variables.md), and [**constant**](/realpython.com/python-constants/README.md) definitions, you probably won’t be aware that the code was run. However, when the module includes calls to functions, methods, or other statements that generate visible results, then you’ll witness its execution.

This provides you with another option to run scripts:

```py title="hello.py"
import hello
# 
# Hello, World!
```

You’ll note that `import` runs the code only once per session. After you first import a module, successive imports do nothing, even if you modify the content of the module. This is because `import` operations are expensive, and Python takes some extra steps to optimize overall performance:

```py title="hello.py"
import hello  # Do nothing
import hello  # Do nothing again
```

These two imports do nothing because Python knows that the `hello` module was already imported. Therefore, Python skips the import. This behavior may seem annoying, especially when you’re working on a module and trying to test your changes in an interactive session. However, it’s an intentional optimization.

### Using the `importlib` Standard-Library Module

In the Python [<FontIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html), you can find the [<FontIcon icon="fa-brands fa-python"/>`importlib`](https://docs.python.org/3/library/importlib.html) module. This module provides the [<FontIcon icon="fa-brands fa-python"/>`import_module()`](https://docs.python.org/3/library/importlib.html#importlib.import_module) function, which allows you to programmatically import modules.

With `import_module()`, you can emulate an `import` operation and, therefore, execute any module or script. Take a look at this example:

```py
import importlib
importlib.import_module("hello")
#
# Hello, World!
# <module 'hello' from '/home/username/hello.py'>
```

The `import_module()` function imports a module, bringing its name to your current [**namespace**](/realpython.com/python-namespace-package.md). It also runs any executable code that the target module contains. That’s why you get `Hello, World!` on your screen.

You already know that once you’ve imported a module for the first time, you won’t be able to import it again using another `import` statement. If you want to reload the module and run it once again, then you can use the [<FontIcon icon="fa-brands fa-python"/>`reload()`](https://docs.python.org/3/library/importlib.html#importlib.reload) function, which forces the interpreter to import the module again:

```py
import hello
# 
# Hello World!

import importlib
importlib.reload(hello)
#
# Hello World!
# <module 'hello' from '/home/username/hello.py'>
```

An important point to note here is that the argument of `reload()` has to be the name of a module object, not a string. So, to use `reload()` successfully, you need to provide a module that’s already imported.

### Leveraging the Power of the Built-in `exec()` Function

So far, you’ve learned about some handy ways to run Python scripts. In this section, you’ll learn how to do that by using the built-in [**`exec()`**](/realpython.com/python-exec.md) function, which supports the dynamic execution of Python code.

The `exec()` function provides an alternative way to run your scripts from inside your code:

```py
with open("hello.py") as hello:
    exec(hello.read())
# 
# Hello, World!
```

In this example, you use the [**`with` statement**](/realpython.com/python-with-statement/README.md) to open the <FontIcon icon="fa-brands fa-python"/>`hello.py` file for reading. Then, you read the file’s content with the `.read()` method. This method returns a string that you pass to `exec()` for execution.

You must be careful when using the `exec()` function because it implies some important security risks, especially if you’re using it for running external code. To learn more about this function, check out [**Python’s `exec()`: Execute Dynamically Generated Code**](/realpython.com/python-exec.md).

---

## How to Run Python Scripts on IDEs and Code Editors

For developing a large and complex application, you should use an integrated development environment (IDE) or an advanced text editor that incorporates programmer-friendly features.

Most of these programs have options that allow you to run your programs from inside the environment itself. It’s common for them to include a *Run* or *Build* action, which is usually available from the toolbar or from the main menu.

Python’s standard distribution comes with [**IDLE**](/realpython.com/python-idle.md) as the default IDE. You can use this program to write, debug, modify, and run your modules and scripts. Other IDEs, such as [**PyCharm**](/realpython.com/pycharm-guide.md) and [**Thonny**](/realpython.com/python-thonny.md), also allow you to run scripts from inside the environment. For example, in PyCharm, you can press <kbd>Ctrl</kbd>+<kbd>R</kbd> on your keyboard to quickly run your app’s entry-point script.

Advanced code editors like [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Code](https://code.visualstudio.com/docs) and [**Sublime Text**](/realpython.com/setting-up-sublime-text-3-for-full-stack-python-development.md) also allow you to run your scripts. In Visual Studio Code, you can press <kbd>Ctrl</kbd>+<kbd>F5</kbd> to run the file that’s currently active, for example.

To learn how to run Python scripts from your preferred IDE or code editor, check its specific documentation or take a quick look at the program’s GUI. You’ll quickly figure out the answer.

---

## How to Run Python Scripts From a File Manager

Running a script by double-clicking on its icon in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>file manager](https://en.wikipedia.org/wiki/File_manager) is another way to run your Python scripts. You probably won’t use this option much in the development stage, but you may use it when you release your code for production.

In order to run your scripts with a double click, you must satisfy some conditions that will depend on your operating system.

Windows, for example, associates the extensions <FontIcon icon="fa-brands fa-python"/>`.py` and <FontIcon icon="fa-brands fa-python"/>`.pyw` with the programs `python.exe` and `pythonw.exe`, respectively. This allows you to run your scripts by double-clicking on their icons.

On Unix systems, you’ll probably be able to run your scripts by double-clicking on them in your file manager. To achieve this, your script must have execution permissions, and you’ll need to use the shebang trick that you’ve already learned. Like on Windows, you may not see any output on-screen when it comes to command-line interface scripts.

The execution of scripts through a double click has several limitations and depends on many factors, such as the operating system, the file manager, execution permissions, and file associations. Still, you can consider this alternative a viable option for production-ready scripts and programs.

---

## Conclusion

You’ve acquired the knowledge and skills that you need for running Python scripts and code in several ways and in a variety of situations and development environments. The command line will be your best friend when you need to run production-ready scripts. During development, your IDE or code editor will provide the right option to run your code.

::: info In this tutorial, you’ve learned how to

- Run Python scripts from the **command line** or **terminal** in your current OS
- Execute code in **interactive mode** using Python’s standard REPL
- Use your favorite **IDE** or **code editor** to run Python scripts during development
- Launch scripts and programs from your operating system’s **file manager**

:::

These skills are essential for you as a Python developer. They’ll make your development process much faster, as well as more productive and flexible.


::: info Quiz - How to Run Your Python Scripts

One of the most important skills you need to build as a Python developer is to be able to run Python scripts and code. Test your understanding on how good you are with running your code.

<SiteInfo
  name="How to Run Your Python Scripts Quiz – Real Python"
  desc="One of the most important skills you need to build as a Python developer is to be able to run Python scripts and code. Test your understanding on how good you are with running your code."
  url="https://realpython.com/quizzes/run-python-scripts//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg"/>

:::

---

## Frequently Asked Questions

Now that you have some experience with running Python scripts and code, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details How do I run a Python script from the command line?

To run a Python script from the command line, open a terminal or command prompt and type `python` followed by the path to your script file. For example, `python<FontIcon icon="fa-brands fa-python"/> hello.py`. On Windows, you might also use `py` instead of `python`. If you see any errors, check that Python is added to your system’s PATH variable.

:::

::: details What is the difference between running Python code in script mode and running it in interactive mode?

In script mode, you execute a file containing Python code using the Python interpreter, and the code runs sequentially. In interactive mode, you use the Python interpreter to run code directly, one statement at a time, often in a REPL (Read-Eval-Print Loop). This allows for immediate feedback and experimentation.

:::

::: details Can I run a Python script by double-clicking it in a file manager?

Yes. On Windows, you can double-click <FontIcon icon="fa-brands fa-python"/>`.py` files to run them since they’re associated with `python.exe`. On Unix systems, you need to ensure that the script has execution permissions and includes a shebang (`#!/usr/bin/env python`) as the first line. However, this method may not display output for console applications.

:::

::: details How can I execute a Python module using the command line?

You can execute a Python module using the command line with the `-m` option. For example, `python -m module_name`. This runs the module as a script, provided it’s available in the Python module search path.

:::

::: details What tools or environments are available to run Python scripts besides the command line?

Besides the command line, you can run Python scripts using an IDE (Integrated Development Environment) like PyCharm or Thonny, a code editor like Visual Studio Code, or from an interactive session using the Python REPL. Each environment provides additional features to aid development and debugging.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:
<!-- 
<VidStack src="vimeo/326699323" />

<VidStack src="vimeo/326699341" />

<VidStack src="vimeo/326699348" />
-->
<SiteInfo
  name="[COURSE] Running Python Scripts – Real Python"
  desc="This step-by-step course will guide you through a series of ways to run Python scripts, depending on your environment, platform, needs, and skills as a programmer."
  url="https://realpython.com/courses/running-python-scripts/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Run-A-Python-Script_Watermarked.65fe32bf5487.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Your Python Scripts and Code",
  "desc": "A Python script or program is a file containing executable Python code. Being able to run Python scripts and code is probably the most important skill that you need as a Python developer. By running your code, you'll know if it works as planned.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/run-python-scripts.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
