---
lang: en-US
title: "How to Use the Command Pattern in Python"
description: "Article(s) > How to Use the Command Pattern in Python"
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
      content: "Article(s) > How to Use the Command Pattern in Python"
    - property: og:description
      content: "How to Use the Command Pattern in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-command-pattern-in-python.html
prev: /programming/py/articles/README.md
date: 2026-03-24
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/85170982-e7e8-453a-9fd4-a7f2f4f7edb3.png
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
  name="How to Use the Command Pattern in Python"
  desc="Have you ever used an undo button in an app or scheduled tasks to run later? Both of these rely on the same idea: turning actions into objects. That's the command pattern. Instead of calling a method "
  url="https://freecodecamp.org/news/how-to-use-the-command-pattern-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/85170982-e7e8-453a-9fd4-a7f2f4f7edb3.png"/>

Have you ever used an undo button in an app or scheduled tasks to run later? Both of these rely on the same idea: **turning actions into objects**.

That's the command pattern. Instead of calling a method directly, you package the call – the action, its target, and any arguments – into an object. That object can be stored, passed around, executed later, or undone.

In this tutorial, you'll learn what the command pattern is and how to implement it in Python with a practical text editor example that supports undo.

::: info

You can find the code for this tutorial [on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/command).

<SiteInfo
  name="python-basics/design-patterns/command at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/design-patterns/command/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/dfe116b1789dbb6a9f2c07e7ef34637b0ce2c81966a84c1d111c0c071e016e2f/balapriyac/python-basics"/>

:::

::: note Prerequisites

Before we start, make sure you have:

- Python 3.10 or higher installed
- Basic understanding of Python classes and methods
- Familiarity with object-oriented programming (OOP) concepts

:::

Let's get started!

---

## What Is the Command Pattern?

The **command pattern** is a behavioral design pattern that encapsulates a request as an object. This lets you:

- **Parameterize** callers with different operations
- **Queue or schedule** operations for later execution
- **Support undo/redo** by keeping a history of executed commands

The pattern has four key participants:

- **Command**: an interface with an `execute()` method (and optionally `undo()`)
- **Concrete Command**: implements `execute()` and `undo()` for a specific action
- **Receiver**: the object that actually does the work (for example, a document)
- **Invoker**: triggers commands and manages history

Think of a restaurant. The customer (client) tells the waiter (invoker) what they want. The waiter writes it on a ticket (command) and hands it to the kitchen (receiver). The waiter doesn't cook – they only manage tickets. If you change your mind, the waiter can cancel the ticket before it reaches the kitchen.

---

## Setting Up the Receiver

We'll build a simple document editor. The **receiver** here is the `Document` class. It knows how to insert and delete text, but it has no idea who's calling it or why.

```py
class Document:
    def __init__(self):
        self.content = ""

    def insert(self, text: str, position: int) -> None:
        self.content = (
            self.content[:position] + text + self.content[position:]
        )

    def delete(self, position: int, length: int) -> None:
        self.content = (
            self.content[:position] + self.content[position + length:]
        )

    def show(self) -> None:
        print(f'Document: "{self.content}"')
```

`insert` places text at a given position. `delete` removes `length` characters from a given position. Both are plain methods with no history or awareness of commands. And that's intentional.

---

## Defining Commands

Now let's define a base `Command` interface using an abstract class:

```py
from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

    @abstractmethod
    def undo(self) -> None:
        pass
```

Any concrete command must implement both `execute` and `undo`. This is what makes a full history possible.

### `InsertCommand`

`InsertCommand` stores the text and position at creation time:

```py
class InsertCommand(Command):
    def __init__(self, document: Document, text: str, position: int):
        self.document = document
        self.text = text
        self.position = position

    def execute(self) -> None:
        self.document.insert(self.text, self.position)

    def undo(self) -> None:
        self.document.delete(self.position, len(self.text))
```

When `execute()` is called, it inserts the text. When `undo()` is called, it deletes exactly what was inserted. Notice that `undo` is the inverse of `execute` – this is the key design requirement.

### `DeleteCommand`

Now let's code the `DeleteCommand`:

```py
class DeleteCommand(Command):
    def __init__(self, document: Document, position: int, length: int):
        self.document = document
        self.position = position
        self.length = length
        self._deleted_text = ""  # stored on execute, used on undo

    def execute(self) -> None:
        self._deleted_text = self.document.content[
            self.position : self.position + self.length
        ]
        self.document.delete(self.position, self.length)

    def undo(self) -> None:
        self.document.insert(self._deleted_text, self.position)
```

`DeleteCommand` has one important detail: it captures the deleted text *during* `execute()`, not at creation time. This is because we don't know what text is at that position until the command actually runs. Without this, `undo()` wouldn't know what to restore.

---

## The Invoker: Running and Undoing Commands

The **invoker** is the object that executes commands and keeps a history stack. It has no idea what a document is or how text editing works. It just manages command objects.

```py
class EditorInvoker:
    def __init__(self):
        self._history: list[Command] = []

    def run(self, command: Command) -> None:
        command.execute()
        self._history.append(command)

    def undo(self) -> None:
        if not self._history:
            print("Nothing to undo.")
            return
        command = self._history.pop()
        command.undo()
        print("Undo successful.")
```

`run()` executes the command and pushes it onto the history stack. `undo()` pops the last command and calls its `undo()` method. The stack naturally gives you the right order: last in, first undone.

---

## Putting It All Together

Let's put it all together and walk through a real editing session:

```py
doc = Document()
editor = EditorInvoker()

# Type a title
editor.run(InsertCommand(doc, "Quarterly Report", 0))
doc.show()

# Add a subtitle
editor.run(InsertCommand(doc, " - Finance", 16))
doc.show()

# Oops, wrong subtitle — undo it
editor.undo()
doc.show()

# Delete "Quarterly" and replace with "Annual"
editor.run(DeleteCommand(doc, 0, 9))
doc.show()

editor.run(InsertCommand(doc, "Annual", 0))
doc.show()

# Undo the insert
editor.undo()
doc.show()

# Undo the delete (restores "Quarterly")
editor.undo()
doc.show()
#
# Document: "Quarterly Report"
# Document: "Quarterly Report - Finance"
# Undo successful.
# Document: "Quarterly Report"
# Document: " Report"
# Document: "Annual Report"
# Undo successful.
# Document: " Report"
# Undo successful.
# Document: "Quarterly Report"
```

::: info Here's the step-by-step breakdown of how (and why) this works:

- Each `InsertCommand` and `DeleteCommand` carries its own instructions for both doing and undoing.
- `EditorInvoker` never looks inside a command. It only calls `execute()` and `undo()`.
- The document (`Document`) never thinks about history. It mutates its content when told to.

:::

Each participant has a single, clear responsibility.

---

## Extending with Macros

One of the lesser-known benefits of the command pattern is that commands are just objects. So you can group them. Here's a `MacroCommand` that batches several commands and undoes them as a unit:

```py
class MacroCommand(Command):
    def __init__(self, commands: list[Command]):
        self.commands = commands

    def execute(self) -> None:
        for cmd in self.commands:
            cmd.execute()

    def undo(self) -> None:
        for cmd in reversed(self.commands):
            cmd.undo()

# Apply a heading format in one shot: clear content, insert formatted title
macro = MacroCommand([
    DeleteCommand(doc, 0, len(doc.content)),
    InsertCommand(doc, "== Annual Report ==", 0),
])

editor.run(macro)
doc.show()

editor.undo()
doc.show()
#
# Document: "== Annual Report =="
# Undo successful.
# Document: "Quarterly Report"
```

The macro undoes its commands in reverse order. This is correct since the last thing done should be the first thing undone.

---

## When to Use the Command Pattern

The command pattern is a good fit when:

- **You need undo/redo**: the pattern is practically made for this. Store executed commands in a stack and reverse them.
- **You need to queue or schedule operations**: commands are objects, so you can put them in a queue, serialize them, or delay execution.
- **You want to decouple the caller from the action**: the invoker doesn't need to know what the command does. It just runs it.
- **You need to support macros or batched operations**: group commands into a composite and run them together, as shown above.

Avoid it when:

- The operations are simple and will never need undo or queuing. The pattern adds classes and indirection that may not be worth it for a simple CRUD action.
- Commands would need to share so much state that the "encapsulate the request" idea breaks down.

---

## Conclusion

I hope you found this tutorial useful. To summarize, the command pattern turns actions into objects. And that single idea unlocks a lot: undo/redo, queuing, macros, and clean separation between who triggers an action and what the action does.

We built a document editor from scratch using `InsertCommand`, `DeleteCommand`, an `EditorInvoker` with a history stack, and a `MacroCommand` for batched edits. Each class knew exactly one thing and did it well.

As a next step, try extending the editor with a `RedoCommand`. You'll need a second stack alongside the history to bring back undone commands.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Command Pattern in Python",
  "desc": "Have you ever used an undo button in an app or scheduled tasks to run later? Both of these rely on the same idea: turning actions into objects. That's the command pattern. Instead of calling a method ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-command-pattern-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
