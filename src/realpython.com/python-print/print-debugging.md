---
lang: en-US
title: "print() Debugging"
description: "Article(s) > (5/7) Your Guide to the Python print() Function"
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
      content: "Article(s) > (5/7) Your Guide to the Python print() Function"
    - property: og:description
      content: "print() Debugging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/print-debugging.html
date: 2019-08-12
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Your Guide to the Python print() Function",
  "desc": "In this step-by-step tutorial, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative.",
  "link": "/realpython.com/python-print/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Your Guide to the Python print() Function"
  desc="In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python."
  url="https://realpython.com/python-print#print-debugging"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

In this section, you’ll take a look at the available tools for debugging in Python, starting from a humble `print()` function, through the `logging` module, to a fully fledged debugger. After reading it, you’ll be able to make an educated decision about which of them is the most suitable in a given situation.

::: note

Debugging is the process of looking for the root causes of **bugs** or defects in software after they’ve been discovered, as well as taking steps to fix them.

The term **bug** has an [<FontIcon icon="fa-brands fa-wikipedia-w"/>amusing story](https://en.wikipedia.org/wiki/Debugging#Origin_of_the_term) about the origin of its name.

:::

---

## Tracing

Also known as **print debugging** or **caveman debugging**, it’s the most basic form of debugging. While a little bit old-fashioned, it’s still powerful and has its uses.

The idea is to follow the path of program execution until it stops abruptly, or gives incorrect results, to identify the exact instruction with a problem. You do that by inserting print statements with words that stand out in carefully chosen places.

Take a look at this example, which manifests a rounding error:

```py
def average(numbers):
    print('debug1:', numbers)
    if len(numbers) > 0:
        print('debug2:', sum(numbers))
        return sum(numbers) / len(numbers)

0.1 == average(3*[0.1])
# 
# debug1: [0.1, 0.1, 0.1]
# debug2: 0.30000000000000004
# False
```

As you can see, the function doesn’t return the expected value of `0.1`, but now you know it’s because the sum is a little off. Tracing the state of variables at different steps of the algorithm can give you a hint where the issue is.

### Rounding Error

In this case, the problem lies in how **floating point** numbers are represented in computer memory. Remember that numbers are stored in binary form. Decimal value of `0.1` turns out to have an infinite binary representation, which gets rounded.

For more information on rounding numbers in Python, you can check out [**How to Round Numbers in Python**](/realpython.com/python-rounding.md).

This method is simple and intuitive and will work in pretty much every programming language out there. Not to mention, it’s a great exercise in the learning process.

On the other hand, once you master more advanced techniques, it’s hard to go back, because they allow you to find bugs much quicker. Tracing is a laborious manual process, which can let even more errors slip through. The build and deploy cycle takes time. Afterward, you need to remember to meticulously remove all the `print()` calls you made without accidentally touching the genuine ones.

Besides, it requires you to make changes in the code, which isn’t always possible. Maybe you’re debugging an application running in a remote web server or want to diagnose a problem in a **post-mortem** fashion. Sometimes you simply don’t have access to the standard output.

That’s precisely where [<FontIcon icon="fas fa-name"/>logging](https://realpython.com/courses/logging-python/) shines.

---

## Logging

Let’s pretend for a minute that you’re running an e-commerce website. One day, an angry customer makes a phone call complaining about a failed transaction and saying he lost his money. He claims to have tried purchasing a few items, but in the end, there was some cryptic error that prevented him from finishing that order. Yet, when he checked his bank account, the money was gone.

You apologize sincerely and make a refund, but also don’t want this to happen again in the future. How do you debug that? If only you had some trace of what happened, ideally in the form of a chronological list of events with their context.

Whenever you find yourself doing print debugging, consider turning it into permanent log messages. This may help in situations like this, when you need to analyze a problem after it happened, in an environment that you don’t have access to.

There are sophisticated tools for log aggregation and searching, but at the most basic level, you can think of logs as text files. Each line conveys detailed information about an event in your system. Usually, it won’t contain personally identifying information, though, in some cases, it may be mandated by law.

Here’s a breakdown of a typical log record:

```plaintext title="output"
[2019-06-14 15:18:34,517][DEBUG][root][MainThread] Customer(id=123) logged out
```

As you can see, it has a structured form. Apart from a descriptive message, there are a few customizable fields, which provide the context of an event. Here, you have the exact date and time, the log level, the logger name, and the thread name.

Log levels allow you to filter messages quickly to reduce noise. If you’re looking for an error, you don’t want to see all the warnings or debug messages, for example. It’s trivial to disable or enable messages at certain log levels through the configuration, without even touching the code.

With logging, you can keep your debug messages separate from the standard output. All the log messages go to the standard error stream by default, which can conveniently show up in different colors. However, you can redirect log messages to separate files, even for individual modules!

Quite commonly, misconfigured logging can lead to running out of space on the server’s disk. To prevent that, you may set up **log rotation**, which will keep the log files for a specified duration, such as one week, or once they hit a certain size. Nevertheless, it’s always a good practice to archive older logs. Some regulations enforce that customer data be kept for as long as five years!

Compared to other programming languages, [**logging in Python**](/realpython.com/python-logging.md) is simpler, because the `logging` module is bundled with the standard library. You just import and configure it in as little as two lines of code:

```py
import logging
logging.basicConfig(level=logging.DEBUG)
```

You can call functions defined at the module level, which are hooked to the **root logger**, but more the common practice is to obtain a dedicated logger for each of your source files:

```py
logging.debug('hello')  # Module-level function

logger = logging.getLogger(__name__)
logger.debug('hello')   # Logger's method
```

The advantage of using custom loggers is more fine-grain control. They’re usually named after the module they were defined in through the `__name__` variable.

::: note

There’s a somewhat related `warnings` module in Python, which can also log messages to the standard error stream. However, it has a narrower spectrum of applications, mostly in library code, whereas client applications should use the `logging` module.

That said, you can make them work together by calling `logging.captureWarnings(True)`.

:::

One last reason to switch from the `print()` function to logging is thread safety. In the upcoming section, you’ll see that the former doesn’t play well with multiple threads of execution.

---

## Debugging

The truth is that neither tracing nor logging can be considered real debugging. To do actual debugging, you need a debugger tool, which allows you to do the following:

- Step through the code interactively.
- Set breakpoints, including conditional breakpoints.
- Introspect variables in memory.
- Evaluate custom expressions at runtime.

A crude debugger that runs in the terminal, unsurprisingly named `pdb` for “The Python Debugger,” is distributed as part of the standard library. This makes it always available, so it may be your only choice for performing remote debugging. Perhaps that’s a good reason to get familiar with it.

However, it doesn’t come with a graphical interface, so [**using `pdb`**](/realpython.com/python-debugging-pdb.md) may be a bit tricky. If you can’t edit the code, you have to run it as a module and pass your script’s location:

```sh
python -m pdb my_script.py
```

Otherwise, you can set up a breakpoint directly in the code, which will pause the execution of your script and drop you into the debugger. The old way of doing this required two steps:

```py
import pdb
pdb.set_trace()
# 
# --Return--
# > <stdin>(1)<module>()->None
# (Pdb)
```

This shows up an interactive prompt, which might look intimidating at first. However, you can still type native Python at this point to examine or modify the state of local variables. Apart from that, there’s really only a handful of debugger-specific commands that you want to use for stepping through the code.

::: note

It’s customary to put the two instructions for spinning up a debugger on a single line. This requires the use of a semicolon, which is rarely found in Python programs:

```py
import pdb; pdb.set_trace()
```

While certainly not Pythonic, it stands out as a reminder to remove it after you’re done with debugging.

:::

Since Python 3.7, you can also call the built-in `breakpoint()` function, which does the same thing, but in a more compact way and with some additional [**bells and whistles**](/realpython.com/python37-new-features.md#the-breakpoint-built-in):

```py
def average(numbers):
    if len(numbers) > 0:
        breakpoint()  # Python 3.7+
        return sum(numbers) / len(numbers)
```

You’re probably going to use a visual debugger integrated with a code editor for the most part. [<FontIcon icon="iconfont icon-pycharm"/>PyCharm](https://jetbrains.com/pycharm/) has an excellent debugger, which boasts high performance, but you’ll find [**plenty of alternative IDEs**](/realpython.com/python-ides-code-editors-guide.md) with debuggers, both paid and free of charge.

Debugging isn’t the proverbial silver bullet. Sometimes logging or tracing will be a better solution. For example, defects that are hard to reproduce, such as [<FontIcon icon="fa-brands fa-wikipedia-w"/>race conditions](https://en.wikipedia.org/wiki/Race_condition), often result from temporal coupling. When you stop at a breakpoint, that little pause in program execution may mask the problem. It’s kind of like the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Heisenberg principle](https://en.wikipedia.org/wiki/Uncertainty_principle): you can’t measure and observe a bug at the same time.

These methods aren’t mutually exclusive. They complement each other.
