---
lang: en-US
title: "Editing Code in the Standard REPL"
description: "Article(s) > (4/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (4/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Editing Code in the Standard REPL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/editing-code-in-the-standard-repl.html
date: 2023-01-25
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Python Standard REPL: Try Out Code and Ideas Quickly",
  "desc": "In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.",
  "link": "/realpython.com/python-repl/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly"
  desc="In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/python-repl#editing-code-in-the-standard-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

Most versions of the Python interpreter support code editing when running in [<FontIcon icon="fa-brands fa-python"/>interactive](https://docs.python.org/3/tutorial/interactive.html) mode. These editing features include code history and basic code completion. If you usually work on Unix-like systems, such as Linux and macOS, then you may be familiar with some of these features, which are present in the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>Korn](https://en.wikipedia.org/wiki/KornShell) shells.

These editing features are implemented using the [<FontIcon icon="fas fa-globe"/>GNU Readline](https://tiswww.case.edu/php/chet/readline/rltop.html) library, which supports several useful styles of editing.

::: note

A quick way to check whether you have code editing features available in your current setup is to press <kbd>Ctrl</kbd>+<kbd>P</kbd> in the REPL’s prompt. This shortcut should show the last code instruction in your history. If nothing happens or `^P` appears on the screen, then the code editing features aren’t available. Otherwise, you’re ready to go!

In the following sections, you’ll learn how to use code history and code completion in a Python interactive session when you’re using the standard REPL.

---

## Code History

The standard REPL logs a complete history of all the code that you’ve typed and run while working in interactive mode. This history is saved to a file called `.python_history`, typically located in your home directory.

While in interactive mode, you can browse this history by using the arrow keys on your keyboard. With the Up key, you can go back in history. With Down, you can go forward in history.

Once you find the desired line of code, you can press <kbd>Enter</kbd> to confirm your selection and reuse the target instruction:

Note how the code in your REPL’s history immediately becomes available for reuse. To navigate the code history, use the Up and Down keys until you find the desired snippet.

The navigation starts from the end of the history file and goes up. Every time you press the Up key, you jump to the previous line of code in your history.

Once you find the line of code that you want to reuse or modify, press <kbd>Enter</kbd> to accept it. Remember that every line in your code history keeps the original indentation that you used when you first typed the code, which is convenient and saves time.

---

## Code Completion

The standard REPL provides basic completion capabilities for variable, object, and module names. This feature is automatically enabled when you start an interactive session. To invoke the available code completions, you can type the starting characters of a given name and press the <kbd>Tab</kbd> key. This action triggers the completion search.

If the search finds a match, then the name will automatically be completed for you. If the search finds more than one match, then you’ll have to press <kbd>Tab</kbd> again to get the entire list of matching names. If nothing appears after pressing <kbd>Tab</kbd> twice, then your search didn’t find any result.

The code completion system looks at the following objects when running its search:

- Python [**keywords**](/realpython.com/python-keywords.md)
- Built-in **function**, **class**, and **object** names
- Currently defined names, such as [**variables**](/realpython.com/python-variables.md), [**functions**](/realpython.com/defining-your-own-python-function.md), and **classes**
- Imported **module** and **package** names

Here’s an example of how the REPL’s code completion system works in practice:

When you type the first character or characters of your target name and press <kbd>Enter</kbd>, you get an automatic completion if the REPL finds a unique match. When the completion system finds more than one name that matches your search, you need to press <kbd>Tab</kbd> again to get the list of matching names.

You can type a few more characters and press <kbd>Tab</kbd> again, or you can just type the complete name or keyword.

When it comes to accessing attributes with **dot notation**, like in `obj.attr`, the code completion system will suggest completions from the target object’s attributes and methods:

Once you type the name of an object followed by a dot, you can press <kbd>Tab</kbd> to quickly inspect the list of attributes and methods of that object. Then you can start typing the name of your target attribute or method and press <kbd>Tab</kbd> again for completion.

The standard REPL provides a rather limited set of code editing features. However, they can be pretty useful when you need to use an interactive session and don’t have a more advanced REPL. These code editing features can improve your productivity and make your coding experience more pleasant.

---

## Useful Keyboard Shortcuts

Leaning useful keyboard shortcuts can significantly boost your productivity and efficiency when you’re working in a REPL session. For example, pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> on the REPL’s primary or secondary prompt cancels the input and returns to the primary prompt:

```py
print(
#  
# KeyboardInterrupt

if True:

#
# KeyboardInterrupt
```

When you press <kbd>Ctrl</kbd>+<kbd>C</kbd> on the primary or secondary prompt, the interpreter raises a [<FontIcon icon="fa-brands fa-python"/>`KeyboardInterrupt`](https://docs.python.org/3/library/exceptions.html#KeyboardInterrupt) exception and immediately returns to the primary prompt.

If you press <kbd>Ctrl</kbd>+<kbd>C</kbd> while some piece of code is running, then the interpreter raises a `KeyboardInterrupt` exception, interrupting the code’s execution and returning to the primary prompt.

This latter behavior is useful when you launch a long-running task that you’re not willing to complete or when you accidentally run into an [**infinite loop**](/realpython.com/python-while-loop.md#infinite-loops):

```py
while True:
    print("Hello!")
# 
# Hello!
# Hello!
# Hello!
# ^CTraceback (most recent call last):
#   File "<stdin>", line 2, in <module>
# KeyboardInterrupt
# Hello!
```

This example presents an infinite `while` loop. You can break the loop by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> on your keyboard. After this key combination, you’re again back to the primary prompt, and your REPL session is ready for new input.

The standard REPL provides many other interesting and useful keyboard shortcuts. The table below shows some of them:

| Keyboard Shortcut | Description |
| --- | --- |
| <kbd>Ctrl</kbd>+<kbd>L</kbd> | Clears the screen, reprinting the current line at the top |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | Exits the current REPL session |
| <kbd>Ctrl</kbd>+<kbd>C</kbd> | Raises a `KeyboardInterrupt` exception and loops back to the primary prompt |
| <kbd>Ctrl</kbd>+<kbd>B</kbd> | Moves the cursor back one character |
| <kbd>Ctrl</kbd>+<kbd>F</kbd> | Moves the cursor forward one character |
| <kbd>Del</kbd> or <kbd>Backspace</kbd> | Deletes the character to the right or left of the cursor, respectively |
| <kbd>Ctrl</kbd>+<kbd>D</kbd> | Deletes the character underneath the cursor |
| <kbd>Ctrl</kbd>+<kbd>A</kbd> | Moves the cursor to the start of the line |
| <kbd>Ctrl</kbd>+<kbd>E</kbd> | Moves the cursor to the end of the line |
| <kbd>Ctrl</kbd>+<kbd>K</kbd> | Kills, or deletes, the text from the current cursor position to the end of the line |
| <kbd>Ctrl</kbd>+<kbd>W</kbd> | Kills from the cursor to the previous whitespace |

These keyboard shortcuts will help you be more proficient when typing and editing code in an interactive session. You’ll find a few more keyboard shortcuts in the official documentation of the [<FontIcon icon="fas fa-globe"/>GNU Readline](https://tiswww.case.edu/php/chet/readline/rluserman.html#Readline-Bare-Essentials) library.
