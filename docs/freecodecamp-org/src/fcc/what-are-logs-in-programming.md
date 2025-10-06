---
lang: en-US
title: "What Are Logs in Programming?"
description: "Article(s) > What Are Logs in Programming?"
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
      content: "Article(s) > What Are Logs in Programming?"
    - property: og:description
      content: "What Are Logs in Programming?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/what-are-logs-in-programming.html
prev: /programming/py/articles/README.md
date: 2025-02-12
isOriginal: false
author:
  - name: Syeda Maham Fahim
    url : https://freecodecamp.org/news/author/syedamahamfahim/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738685115991/600c01b6-b031-4ce9-a77a-5d88fcdaa68a.png
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
  name="What Are Logs in Programming?"
  desc="Have you ever run a program, and it crashed? No error messages, no hints, just silence. How do you figure out what went wrong? That's where logging saves the day. Logs keep track of what’s happening inside your code so that when things go wrong, you ..."
  url="https://freecodecamp.org/news/what-are-logs-in-programming"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738685115991/600c01b6-b031-4ce9-a77a-5d88fcdaa68a.png"/>

Have you ever run a program, and it crashed? No error messages, no hints, just silence. How do you figure out what went wrong? That's where logging saves the day.

Logs keep track of what’s happening inside your code so that when things go wrong, you don’t have to guess. They’re similar to `print` or `console.log`, but more powerful.

In this tutorial, I will use Python to create and walk you through some logging code examples.

Before we talk about logs, let’s understand the different error types you might use or encounter.

---

## Types of Errors

When you’re building a production-level application, you need to display errors based on their severity. There are several error types, and the most important ones are:

- **DEBUG:** Detailed information, typically useful for diagnosing problems.
- **INFO:** General information about the program’s progress.
- **WARNING:** Something unexpected happened, but it’s not critical.
- **ERROR:** An error occurred, but the program can still run.
- **CRITICAL:** A very serious error that may stop the program from running.

---

## What is Logging?

Now, let’s get straight to the point and understand what logging is.

In simple terms, logs or logging is the act of recording information about everything your program does. The recorded information could be anything, from basic details like which functions were called to more detailed ones like tracking errors or performance issues.

### Why Do We Need Logging?

You might be thinking, "If logs are printing errors, info, and so on, I can just use print statements. Why do I need logging?" Well, `print` works, but logging gives you more control:

↳ It can store messages in a file.  
↳ It has different levels (info, warning, error, and so on).  
↳ You can filter messages based on importance.  
↳ It helps in debugging without cluttering your code.

These are things `print` statements can't do effectively.

---

## How to Add Logs in Python

In Python, the `logging` module is built specifically for logging purposes.

Let’s set up some logs to see how they work.

### Step 1: Import the Logging Module

To start using logging, we need to import the module:

```py
import logging
```

### Step 2: Log Messages

Now, you can start logging messages in your program. You can use different log levels based on the importance of the message. As a reminder, those levels are (from least to most urgent):

- DEBUG
- INFO
- WARNING
- ERROR
- CRITICAL

Let’s log a simple message at each level:

```py
logging.debug("This is a debug message")
logging.info("This is an info message")
logging.warning("This is a warning message")
logging.error("This is an error message")
logging.critical("This is a critical message")
```

When you run this, you’ll see a message printed to the console, similar to this:

![Terminal showing Python log messages.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738500126070/a2a395c3-5cbe-4f94-bea2-d871cfc1529e.png)

You might wonder why you don’t see the **DEBUG** and **INFO** messages. The default logging level prevents this.

By default, the logging level is set to `WARNING`. This means that only messages with a severity of `WARNING` or higher will be displayed (that is, `WARNING`, `ERROR`, and `CRITICAL`).

### Step 3: Set Up the Basic Configuration

To see the `debug` and `info` messages, we need to set the logging level `DEBUG` before running the code.

This means we need to configure the logs. So to do this, use the method `basicConfig` below:

```py
logging.basicConfig(level=logging.DEBUG)
```

This basic configuration allows you to log messages at the **DEBUG** level or higher. You can change the level depending on the type of logs you want.

Now, all logs are printing:

![log messages: debug, info, warning, error, critical.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738500423798/96b65689-f0e4-4663-9d1a-1dc7147e964e.png)

### Step 4: Log to a File

Now, let’s save these logs in a file so we can keep track of errors, as well as when they occurred. To do this, update the configuration:

```py
logging.basicConfig(filename='data_log.log', level=logging.DEBUG, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
```

Here:

- `asctime` - The time when the event occurred.
- `levelname` - The type of the log (for example, **DEBUG**, **INFO**).
- `message` - The message we display.

Now, when you run the program, the log file will generate and save your logs, showing the exact timing, error type, and message. Like this:

![Log file with debug, info, warning, error, critical messages](https://cdn.hashnode.com/res/hashnode/image/upload/v1738500713832/7895f1db-8740-494a-86dd-86020f4f5569.png)

---

## How to Use Loggers for More Control

If you’re working on a large project, you might want a utility logger that you can use anywhere in the code. Let’s create this custom logger.

First, we’ll update the `basicConfig` to add the filename, line number, and ensure it writes everything, even special characters:

```py
logging.basicConfig(
    filename=log_file,
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s', 
    filemode='w',
    encoding='utf-8' 
)
```

Explanation:

- `encoding='utf-8'` — Ensures special characters are logged.
- `%(filename)s:%(lineno)d` — Logs the filename and line number where the log was generated.

Now, let’s set up a custom console logger:

```py
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
console_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s')  # Added line number
console_handler.setFormatter(console_formatter)

logging.getLogger().addHandler(console_handler)
```

This setup does the following:

- `console_handler`: Sends log messages to the console (stdout).
- `console_formatter`: Formats the log message with time, level, filename, line number, and the message.
- `logging.getLogger().addHandler(console_handler)`: Adds the custom handler to the root logger, so the log messages are printed to the console.

### Full Example Code

```py :collapsed-lines
import logging
import os
from datetime import datetime

def setup_daily_logger():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    log_dir = os.path.join(base_dir, 'logs')  
    os.makedirs(log_dir, exist_ok=True)


    current_time = datetime.now().strftime("%m_%d_%y_%I_%M_%p")
    log_file = os.path.join(log_dir, f"{current_time}.log")


    logging.basicConfig(
        filename=log_file,
        level=logging.DEBUG,
        format='%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s', 
        filemode='w',
        encoding='utf-8' 
    )


    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s')  # Added line number
    console_handler.setFormatter(console_formatter)


    logging.getLogger().addHandler(console_handler)


    return logging.getLogger(__name__)
```

### What Happens Now?

Now, whenever you run the program, a new log file will be created in the `logs` folder. Each time the program is executed, a new log file with a unique timestamp will be generated.

Like this:

![custom log used in app.py](https://cdn.hashnode.com/res/hashnode/image/upload/v1738503550743/1ad9fb99-762a-4ca9-a189-58d044955617.png)

These logs will give you a clear picture of your program’s behavior and help with debugging.

I hope this article helped you get a clearer picture of logs and their importance in programming.

## Practical Real-World Examples

Now that you understand what logs are and how to set them up in Python, let’s look at real-world use cases.

### 1. Bot: Scraping Korea’s Largest Property Website

Here’s an example of a bot designed to scrape Korea’s biggest property website.

- The logs show every step the bot takes, making it easier to track progress.
- If an error occurs at any step, it gets recorded in the log file.
- Even if the bot crashes, I can check the logs to pinpoint where things went wrong.

![Log file with INFO messages showing city and town extraction details.](https://cdn.hashnode.com/res/hashnode/image/upload/v1739037891010/69a8b5ae-d202-4466-add0-bb2ace28230a.png)

![Log file with INFO messages showing city and town extraction details.](https://cdn.hashnode.com/res/hashnode/image/upload/v1739037833210/bf9ceba0-2caf-48c6-bdb8-ac2d9eb901bd.png)

One of the methods in this bot’s class uses logging to track whether the bot correctly selects the province.

![select_province function that utilizes logging](https://cdn.hashnode.com/res/hashnode/image/upload/v1739038058017/6153c909-477d-4cd6-b493-124b96bc595f.png)

Here:

- If an error or warning occurs, it’s saved in the log file.
- Later, you can review the logs and find out exactly what happened

### 2. Bot: Scraping Facebook Groups

Now, let’s see how logging helps in a Facebook group scraper.

#### Error Tracking

- At one point, the bot failed due to an error.
- Since we had logging in place, the error was saved in the log file.
- This allows you to quickly find out what went wrong.

![Error log file](https://cdn.hashnode.com/res/hashnode/image/upload/v1739038507530/9662bed7-a124-4dd8-94a9-9d657ec022a1.png)

Here, you see the exact filename and line number where the error occurs.

![Logs file shows success logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1739038826232/ce717b49-e532-4c5f-a40d-955591aa27a2.png)

Once we identified and fixed the issue, the bot started working again.

It captures every detail in the log, saving hours of debugging by pinpointing where errors occur.

#### Debugging Made Easy

- The logs recorded every detail of the bot’s execution.
- This can save you hours of debugging because you’ll know exactly where the error occurred.

---

## Conclusion

Logging is one of those things no one thinks about until something breaks. But when it does, logs become your best friend.

Remember:

- Logging isn’t just for error tracking—it helps you monitor your program’s flow.
- Instead of guessing what went wrong, check the logs. The answer is usually right there.

Make sure to add logging to your code. You’ll thank yourself later!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Are Logs in Programming?",
  "desc": "Have you ever run a program, and it crashed? No error messages, no hints, just silence. How do you figure out what went wrong? That's where logging saves the day. Logs keep track of what’s happening inside your code so that when things go wrong, you ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/what-are-logs-in-programming.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
