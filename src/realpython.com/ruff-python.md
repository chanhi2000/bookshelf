---
lang: en-US
title: "Ruff: A Modern Python Linter for Error-Free and Maintainable Code"
description: "Article(s) > Ruff: A Modern Python Linter for Error-Free and Maintainable Code"
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
      content: "Article(s) > Ruff: A Modern Python Linter for Error-Free and Maintainable Code"
    - property: og:description
      content: "Ruff: A Modern Python Linter for Error-Free and Maintainable Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/ruff-python.html
prev: /programming/py/articles/README.md
date: 2024-06-17
isOriginal: false
author:
  - name: Ricky White
    url : https://realpython.com/team/rwhite/
cover: https://files.realpython.com/media/Showcase-Ruff-Linter_Watermarked.71e600eb11de.jpg
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
  name="Ruff: A Modern Python Linter for Error-Free and Maintainable Code"
  desc="Ruff is an extremely fast, modern linter with a simple interface, making it straightforward to use. It also aims to be a drop-in replacement for other linting and formatting tools, like Pylint, isort, and Black. It's no surprise it's quickly becoming one of the most popular Python linters."
  url="https://realpython.com/ruff-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Showcase-Ruff-Linter_Watermarked.71e600eb11de.jpg"/>

Linting is essential to writing **clean and readable code** that you can share with others. A linter, like Ruff, is a tool that analyzes your code and looks for errors, stylistic issues, and suspicious constructs. Linting allows you to address issues and [**improve your code quality**](/realpython.com/python-code-quality.md) before you [**commit**](/realpython.com/python-git-github-intro.md#committing-changes) your code and share it with others.

Ruff is a modern linter that’s extremely fast and has a simple interface, making it straightforward to use. It also aims to be a drop-in replacement for many other linting and formatting tools, such as [<FontIcon icon="iconfont icon-github"/>`PyCQA/flake8`](https://github.com/PyCQA/flake8), [<FontIcon icon="iconfont icon-github"/>`PyCQA/isort`](https://github.com/PyCQA/isort), and [<FontIcon icon="iconfont icon-github"/>`psf/black`](https://github.com/psf/black). It’s quickly becoming one of the most popular Python linters.

::: info In this tutorial, you’ll learn how to

- Install **Ruff**
- **Check your Python code** for errors
- Automatically **fix your linting errors**
- Use Ruff to **format your code**
- **Add optional configurations** to supercharge your linting

:::

To get the most from this tutorial, you should be familiar with [**virtual environments**](/realpython.com/python-virtual-environments-a-primer.md), [**installing third-party modules**](/realpython.com/what-is-pip.md), and be comfortable with using the [**terminal**](/realpython.com/terminal-commands.md).

::: info Quiz - Ruff: A Modern Python Linter

<SiteInfo
  name="Ruff: A Modern Python Linter Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of Ruff, a modern linter for Python. By working through this quiz, you'll revisit why you'd want to use Ruff to check your Python code and how it automatically fixes errors, formats your code, and provides optional configurations to enhance your linting."
  url="https://realpython.com/quizzes/ruff-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Showcase-Ruff-Linter_Watermarked.71e600eb11de.jpg"/>

In this quiz, you'll test your understanding of Ruff, a modern linter for Python. By working through this quiz, you'll revisit why you'd want to use Ruff to check your Python code and how it automatically fixes errors, formats your code, and provides optional configurations to enhance your linting.

:::

---

## Installing Ruff

Now that you know why linting your code is important and how Ruff is a powerful tool for the job, it’s time to install it. Thankfully, Ruff works out of the box, so no complicated installation instructions or configurations are needed to start using it.

Assuming your project is already set up with a virtual environment, you can install Ruff in the following ways:

```sh
python -m pip install ruff
```

In addition to `pip`, you can also install Ruff with [<FontIcon icon="iconfont icon-homebrew"/>Homebrew](https://brew.sh/) if you’re on macOS or Linux:

```sh
brew install ruff
```

[<FontIcon icon="iconfont icon-anaconda"/>Conda](https://docs.conda.io/en/latest/) users can install Ruff using `conda-forge`:

```sh
conda install -c conda-forge ruff
```

If you use Arch, Alpine, or openSUSE Linux, you can also use the official distribution repositories. You’ll find specific instructions on the [<FontIcon icon="fas fa-globe"/>Ruff installation page](https://docs.astral.sh/ruff/installation/) of the official documentation.

Additionally, if you’d like Ruff to be available for all your projects, you might want to install Ruff with [**`pipx`**](/realpython.com/python-pipx.md).

You can check that Ruff installed correctly by using the `ruff version` command:

```sh
ruff version
#
# ruff 0.4.7
```

For the `ruff` command to appear in your [<FontIcon icon="fa-brands fa-wikipedia-w"/>`PATH`](https://en.wikipedia.org/wiki/PATH_(variable)), you may need to close and reopen your terminal application or start a new terminal session.

---

## Linting Your Python Code

While linting helps keep your code consistent and error-free, it doesn’t guarantee that your code will be *bug-free*. Finding the bugs in your code is best handled with a [**debugger**](/realpython.com/python-debug-idle.md) and adequate [**testing**](/realpython.com/pytest-python-testing.md), which won’t be covered in this tutorial. Coming up in the next sections, you’ll learn how to use Ruff to check for errors and speed up your workflow.

### Checking for Errors

The code below is a simple script called `one_ring.py`. When you run it, it gets a [**random**](/realpython.com/python-random.md) **Lord of the Rings** character name from a [**`tuple`**](/realpython.com/python-tuple.md) and lets you know if that character bore the burden of the **One Ring**. This code has no real practical use and is just a bit of fun. Regardless of the size of your code base, the steps are going to be the same:

```py :collapsed-lines title="one_ring.py"
import os
import random

CHARACTERS = ("Frodo", "Sam", "Merry", "Pippin", "Aragorn", "Legolas", "Gimli", "Boromir", "Gandalf", "Saruman", "Sauron")

def random_character():
    return random.choice(CHARACTERS)

def ring_bearer():
    return name in ("Frodo", "Sam")

if __name__ == "__main__":
    character = random_character()
    if ring_bearer(character):
        print(f"{character} is a ring bearer")
    else:
        print(f"{character} is not a ring bearer")
```

Now, if you’re eagle-eyed, you may have already spotted some problems with this code. If not, don’t worry, you can use Ruff to find them all.

The most basic command the Ruff CLI (command-line interface) has is `check`. By default, this command will check all files in the current directory. For this example, you can run the `check` command without any arguments. When you run `check` on the above code, it outputs the following:

```sh
ruff check
# 
# one_ring.py:1:8: F401 [*] `os` imported but unused
# one_ring.py:10:12: F821 Undefined name `name`
# Found 2 errors.
# [*] 1 fixable with the `--fix` option.`
```

Success! Ruff found two errors. Not only does it show the file and line numbers of the errors, but it also gives you error codes and messages. In addition, it lets you know that one of the two errors is fixable. Great!

::: note

In this example, you only have one file in your directory, <FontIcon icon="fa-brands fa-python"/>`one_ring.py`. But if you had more, you could check a single file with `ruff check one_ring.py`. And, if you prefer to keep your files in a <FontIcon icon="fas fa-folder-open"/>`src/` directory and have multiple nested directories, then `ruff check src/` will check all files and subdirectories in your <FontIcon icon="fas fa-folder-open"/>`src/` folder.

:::

You can tell Ruff to fix errors by applying the `--fix` flag. Here’s what happens when you follow its suggestion:

```sh
ruff check --fix
# 
# one_ring.py:9:12: F821 Undefined name `name`
# Found 2 errors (1 fixed, 1 remaining).`
```

The unused import is now fixed, and that line of code has been removed from <FontIcon icon="fa-brands fa-python"/>`one_ring.py`. The last of these two errors isn’t automatically fixable. The problem in **line 9** may be obvious to you, but maybe it’s not.

::: note

Notice how the line number changed for the remaining error? That’s because the unused import was removed, which moved all the code up one line.

:::

Thankfully, Ruff gives you the error code and a way to look it up quickly without having to search the documentation online. Enter the second `ruff` command: `rule`.

Since Ruff provides the error code, you can pass it to the `ruff rule` command to see more details about the error message, including a code example:

```sh
ruff rule F821
```

When you run this command, you get more details in Markdown format in your terminal:

````md
# undefined-name (F821)

Derived from the **PyFlakes** linter.

---

## What it does
Checks for uses of undefined names.

---

## Why is this bad?
An undefined name is likely to raise `NameError` at runtime.

---

## Example

```python
def double():
    return n * 2  # raises `NameError` if `n` is undefined when `double` is called
```

Use instead:

```python
def double(n):
    return n * 2
```

---

## References
- [Python documentation: Naming and binding](https://docs.python.org/3/reference/executionmodel.html#naming-and-binding)`
````

With the extra context from the error code, you can now see that the example code you saw earlier made the same mistake. The `name` variable in line 9 wasn’t passed as an argument to the `ring_bearer()` function signature. Whoops!

To fix this error, you can amend `ring_bearer()` to take the `name` argument:

```py{3} title="one_ring.py"
# ...

def ring_bearer(name):
  return name in ("Frodo", "Sam")
```

Now that you’ve made that small edit to the code, you can run `ruff check` again to see if it passes:

```sh
ruff check
# 
# All checks passed!
```

Great! Both errors are now fixed, and your code should look like this:

```py :collapsed-lines title="one_ring.py"
import random

CHARACTERS = ("Frodo", "Sam", "Merry", "Pippin", "Aragorn", "Legolas", "Gimli", "Boromir", "Gandalf", "Saruman", "Sauron")

def random_character():
    return random.choice(CHARACTERS)

def ring_bearer(name):
    return name in ("Frodo", "Sam")

if __name__ == "__main__":
    character = random_character()
    if ring_bearer(character):
        print(f"{character} is a ring bearer")
    else:
        print(f"{character} is not a ring bearer")
```

Having to run `ruff check` every time you change your code can be impractical. Thankfully, Ruff has a solution. In the next section, you’ll look at how you can check your code continuously for errors.

### Speeding Up Your Workflow

When you’re actively working on code, Ruff can simplify your workflow even more by informing you of errors as you develop. This will speed up the overall process and make you more productive. To have **continuous linting** as you code, open a new terminal window and pass the `--watch` flag to the `check` command:

```sh
ruff check --watch
```

After you run the above command, you should see something like this in your terminal:

```plaintext tile="output"
[14:04:01 PM] Starting linter in watch mode...
[14:04:01 PM] Found 0 errors. Watching for file changes.
```

Your code is now free from errors. Or is it? In the next section, you’ll learn what Ruff didn’t pick up by default.

### Finding More Errors

Even though the errors Ruff found have been fixed, the code still needs to be cleaned up. There are a couple more problems with the `one_ring.py` file that could be fixed to make this code even **cleaner and more readable**. The most notable issue is in **line 3**. The `CHARACTERS` tuple seems too long and could be made more readable.

You may be asking the question, why didn’t Ruff pick that up? This is a perfectly valid question. Digging into the documentation gives this answer:

::: info Ruff <FontIcon icon="fas fa-globe"/>docs.astral.sh

> By default, Ruff enables Flake8’s`F`rules, along with a subset of the`E`rules, omitting any stylistic rules that overlap with the use of a formatter, like`ruff format`orBlack.

```component VPCard
{
  "title": "Tutorial | Ruff",
  "desc": "An extremely fast Python linter and code formatter, written in Rust.",
  "link": "https://docs.astral.sh/ruff/tutorial/#rule-selection/",
  "logo": "https://docs.astral.sh/static/favicon-16x16.png",
  "background": "rgba(35,19,47,0.2)"
}
```

:::

Out-of-the-box Ruff doesn’t apply the rule to check line length. You can, however, tell it which **additional rules** you want to include or exclude. You can ask it to include all `E` rules or a specific rule with the `--select` flag:

```sh
ruff check --select E
#
# one_ring.py:4:89: E501 Line too long (122 > 88)
# Found 1 error.

ruff check --select E501
#
# one_ring.py:4:89: E501 Line too long (122 > 88)
# Found 1 error.
```

Ah, you found the additional error. However, you may notice that there’s no suggestion to let you know the line length can be automatically fixed with the `--fix` flag. Don’t worry because there’s a way to fix formatting errors in Ruff with a new command. In the next section, you’ll learn about `ruff format`.

---

## Formatting Your Python Code

By default, Ruff has sensible formatting rules and was designed to be a **drop-in replacement** for Black. The `format` command has been available since [Ruff version 0.1.2 (<FontIcon icon="iconfont icon-github"/>`astral-sh/ruff`)](https://github.com/astral-sh/ruff/blob/main/CHANGELOG.md#012).

Just like the `check` command, the `format` command takes optional arguments for a path to a single file or directory. Since the code you have in this tutorial example is a single file, you can go ahead and use it without any arguments:

```sh
ruff format
# 
# 1 file reformatted
```

Your <FontIcon icon="fa-brands fa-python"/>`one_ring.py` file should now look more readable and have consistent formatting:

```py :collapsed-lines title="one_ring.py"
import random

CHARACTERS = (
    "Frodo",
    "Sam",
    "Merry",
    "Pippin",
    "Aragorn",
    "Legolas",
    "Gimli",
    "Boromir",
    "Gandalf",
    "Saruman",
    "Sauron",
)


def random_character():
    return random.choice(CHARACTERS)


def ring_bearer(name):
    return name in ("Frodo", "Sam")


if __name__ == "__main__":
    character = random_character()
    if ring_bearer(character):
        print(f"{character} is a ring bearer")
    else:
        print(f"{character} is not a ring bearer")
```

As you can see, the previous line length error in **line 3** has been addressed. And although the tuple takes up more lines, it’s much easier to parse and read the list of character names. This also makes it easier for code reviewers to review changes, as most tools and platforms will only show what has exactly changed in the [<FontIcon icon="fa-brands fa-wikipedia-w"/>`diff`](https://en.wikipedia.org/wiki/Diff) and not the whole data structure.

The next change it made is that the spacing between functions is now consistent and [**PEP 8 compliant**](/realpython.com/python-pep8.md), with the recommended two spaces between functions.

The last change, although it may seem insignificant, is that Ruff added the missing newline at the end of the file.

This is a short piece of code that was straightforward to format. Longer code bases may need many changes, which could potentially break some functionality, though this is rare as formatters always err on the side of caution. To learn more about **unsafe fixes** in Ruff, refer to the [<FontIcon icon="fas fa-globe"/>fix safety](https://docs.astral.sh/ruff/linter/#fix-safety) section in Ruff’s documentation.

If you’d like to see what changes will be made when you run `ruff format`, you can run it with the `--diff` flag to see the proposed changes before you make them. If you had run the `--diff` flag before running `ruff format`, you would’ve seen this output:

```py title="one_ring.py"
--- one_ring.py # [!code --]
+++ one_ring.py # [!code ++]
@@ -1,16 +1,31 @@
import random

-CHARACTERS = ("Frodo", "Sam", "Merry", "Pippin", "Aragorn", "Legolas", "Gimli", "Boromir", "Gandalf", "Saruman", "Sauron") # [!code --]
+CHARACTERS = ( # [!code ++]
+    "Frodo", # [!code ++]
+    "Sam", # [!code ++]
+    "Merry", # [!code ++]
+    "Pippin", # [!code ++]
+    "Aragorn", # [!code ++]
+    "Legolas", # [!code ++]
+    "Gimli", # [!code ++]
+    "Boromir", # [!code ++]
+    "Gandalf", # [!code ++]
+    "Saruman", # [!code ++]
+    "Sauron", # [!code ++]
+) # [!code ++]
+ # [!code ++]

def random_character():
    return random.choice(CHARACTERS)

+ # [!code ++]
 def ring_bearer(name):
     return name in ("Frodo", "Sam")

+ # [!code ++]
 if __name__ == "__main__":
     character = random_character()
     if ring_bearer(character):
         print(f"{character} is a ring bearer")
     else:
-      print(f"{character} is not a ring bearer") # [!code --]
\ No newline at end of file
+        print(f"{character} is not a ring bearer") # [!code ++]

1 file would be reformatted
```

This may be all you ever need to format your code. However, there may be times you’d prefer a different line length or would like to include or exclude certain rules. In these situations, it can be time-consuming to list all your required rules to the command line each time you want to lint your code. There must be a better way!

There is. Although not required, Ruff can be **highly configurable**. In the next section, you’ll get a brief look into a few configuration basics.

---

## Configuring Ruff

If you’re linting a larger code base, have multiple committers, or want to customize your experience, Ruff allows you to store your configuration in a [**TOML file**](/realpython.com/python-toml.md). More specifically, a <FontIcon icon="iconfont icon-toml"/>`ruff.toml`, `<FontIcon icon="iconfont icon-toml"/>.ruff.toml`, or your existing <FontIcon icon="iconfont icon-toml"/>`pyproject.toml` file.

As mentioned earlier, `ruff` has sensible defaults. These configurations are documented on the [<FontIcon icon="fas fa-globe"/>Ruff configuration page](https://docs.astral.sh/ruff/configuration/) for you to read. The full [<FontIcon icon="fas fa-globe"/>list of settings](https://docs.astral.sh/ruff/settings/) available for your configuration is well documented. Here’s an example of a simple <FontIcon icon="iconfont icon-toml"/>`ruff.toml` configuration you can add to your project:

```toml title="ruff.toml"
line-length = 88

[lint]
select = ["E501", "I"]

[format]
docstring-code-format = true
docstring-code-line-length = 72
```

And here’s the same example in a <FontIcon icon="iconfont icon-toml"/>`pyproject.toml` format. The only change is that you need to include a `tool.ruff` prefix in each table header:

```toml title="pyproject.toml"
[tool.ruff]
line-length = 88

[tool.ruff.lint]
select = ["E501", "I"]

[tool.ruff.format]
docstring-code-format = true
docstring-code-line-length = 72
```

In these examples, you’ll notice a few new rules. Just as you did earlier, you’ve specifed that you want to include the [<FontIcon icon="fas fa-globe"/>`E501`](https://docs.astral.sh/ruff/rules/line-too-long/) rule when linting with `ruff`, which will return an error when the line length is greater than the default 88 characters.

In addition to adding the `E501` rule to the linting configuration, you’ve also asked Ruff to add all the `I` rules. `I` rules are unique to isort, another package you may have used before to lint and format your Python `import` statements. With this configuration, you no longer need isort and Black to format your code. This means fewer tools to manage and fewer developer dependencies.

In **lines 6 to 8**, you’ll see that Ruff will now format your [**docstrings**](/realpython.com/documenting-python-code.md#documenting-your-python-code-base-using-docstrings) to a length of 72 characters. This number could be anything you want it to be, and many might choose 88 characters to match the code line length. Keep in mind that by default, Ruff doesn’t format docstrings.

There are many linting and formatting settings available, so it’s a good idea to scroll through the list of settings to see which ones you want to add to your Ruff configuration.

If you already have experience with a linter, please feel free to share your favorite rules and customizations in the comments below.

---

## Next Steps

Now that you’ve learned why you should use a linter and how Ruff is a great tool to help you **achieve clean, readable, and error-free code**, you should take Ruff for a spin.

As mentioned above, there are a plethora of configurations you can use to take your linting to the next level. There are also [<FontIcon icon="fas fa-globe"/>a few integrations](https://docs.astral.sh/ruff/integrations/) that can **speed up your workflow**, such as the [**VS Code**](/realpython.com/python-development-visual-studio-code.md) extension, [**PyCharm**](/realpython.com/pycharm-guide.md) plugin, [<FontIcon icon="fas fa-globe"/>pre-commit](https://pre-commit.com/) hook, and [**GitHub Actions**](/realpython.com/docker-continuous-integration.md#learn-to-speak-the-github-actions-lingo).

---

## Conclusion

Ruff is an extremely fast Python linter and code formatter that can help you improve your code quality and maintainability. This tutorial explained how to get started with Ruff, showcased its key features, and demonstrated how powerful it can be.

::: info In this tutorial, you learned how to

- **Install Ruff**
- **Check your Python code** for errors
- Automatically **fix your linting errors**
- Use Ruff to **format your code**
- **Add optional configurations** to supercharge your linting

:::

With this new tool in your toolbox, you’ll be able to take your code to the next level and ensure it looks professional and, more importantly, is error-free.

::: info Quiz - Ruff: A Modern Python Linter

<SiteInfo
  name="Ruff: A Modern Python Linter Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of Ruff, a modern linter for Python. By working through this quiz, you'll revisit why you'd want to use Ruff to check your Python code and how it automatically fixes errors, formats your code, and provides optional configurations to enhance your linting."
  url="https://realpython.com/quizzes/ruff-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Showcase-Ruff-Linter_Watermarked.71e600eb11de.jpg"/>

In this quiz, you'll test your understanding of Ruff, a modern linter for Python. By working through this quiz, you'll revisit why you'd want to use Ruff to check your Python code and how it automatically fixes errors, formats your code, and provides optional configurations to enhance your linting.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Ruff: A Modern Python Linter for Error-Free and Maintainable Code",
  "desc": "Ruff is an extremely fast, modern linter with a simple interface, making it straightforward to use. It also aims to be a drop-in replacement for other linting and formatting tools, like Pylint, isort, and Black. It's no surprise it's quickly becoming one of the most popular Python linters.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/ruff-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
