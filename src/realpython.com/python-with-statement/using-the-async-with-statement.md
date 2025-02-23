---
lang: en-US
title: "Using the async with Statement"
description: "Article(s) > (4/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (4/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Using the async with Statement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/using-the-async-with-statement.html
date: 2021-06-02
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Context Managers and Python's with Statement",
  "desc": "In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers.",
  "link": "/realpython.com/python-with-statement/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Context Managers and Python's with Statement"
  desc="In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/python-with-statement#using-the-async-with-statement"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

The `with` statement also has an asynchronous version, [<FontIcon icon="fa-brands fa-python"/>`async with`](https://docs.python.org/3/reference/compound_stmts.html?highlight=async#the-async-with-statement). You can use it to write context managers that depend on asynchronous code. It’s quite common to see `async with` in that kind of code, as many [<FontIcon icon="fa-brands fa-wikipedia-w"/>IO operations](https://en.wikipedia.org/wiki/Input/output) involve setup and teardown phases.

For example, say you need to code an asynchronous function to check if a given site is online. To do that, you can use [<FontIcon icon="fa-brands fa-python"/>`aiohttp`](https://docs.aiohttp.org/en/stable/index.html), [**`asyncio`**](/realpython.com/async-io-python.md), and `async with` like this:

```py{5-6} :collapsed-lines title="site_checker_v0.py"
import aiohttp
import asyncio

async def check(url):
    async with aiohttp.ClientSession() as session: 
        async with session.get(url) as response: 
            print(f"{url}: status -> {response.status}")
            html = await response.text()
            print(f"{url}: type -> {html[:17].strip()}")

async def main():
    await asyncio.gather(
        check("https://realpython.com"),
        check("https://pycoders.com"),
    )

asyncio.run(main())
```

Here’s what this script does:

- **Line 3** [**imports**](/realpython.com/python-import.md) `aiohttp`, which provides an asynchronous HTTP client and server for `asyncio` and Python. Note that `aiohttp` is a third-party package that you can install by running `python -m pip install aiohttp` on your command line.
- **Line 4** imports `asyncio`, which allows you to write [**concurrent**](/realpython.com/python-concurrency.md) code using the `async` and `await` syntax.
- **Line 6** defines `check()` as an asynchronous function using the `async` [**keyword**](/realpython.com/python-keywords.md).

Inside `check()`, you define two nested `async with` statements:

- **Line 7** defines an outer `async with` that instantiates `aiohttp.ClientSession()` to get a context manager. It stores the returned object in `session`.
- **Line 8** defines an inner `async with` statement that calls `.get()` on `session` using `url` as an argument. This creates a second context manager and returns a `response`.
- **Line 9** prints the response [<FontIcon icon="fa-brands fa-wikipedia-w"/>status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) for the `url` at hand.
- **Line 10** runs an awaitable call to `.text()` on `response` and stores the result in `html`.
- **Line 11** prints the site `url` and its document type, [<FontIcon icon="fa-brands fa-wikipedia-w"/>`doctype`](https://en.wikipedia.org/wiki/Document_type_declaration).
- **Line 13** defines the script’s [**`main()`**](/realpython.com/python-main-function.md) function, which is also a [<FontIcon icon="fa-brands fa-python"/>coroutine](https://docs.python.org/3/library/asyncio-task.html#coroutine).
- **Line 14** calls [<FontIcon icon="fa-brands fa-python"/>`gather()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.gather) from `asyncio`. This function runs [<FontIcon icon="fa-brands fa-python"/>awaitable objects](https://docs.python.org/3/library/asyncio-task.html#asyncio-awaitables) in a sequence concurrently. In this example, `gather()` runs two instances of `check()` with a different [<FontIcon icon="fa-brands fa-wikipedia-w"/>URL](https://en.wikipedia.org/wiki/URL) for each.
- **Line 19** runs `main()` using [<FontIcon icon="fa-brands fa-python"/>`asyncio.run()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.run). This function creates a new `asyncio` [<FontIcon icon="fa-brands fa-python"/>event loop](https://docs.python.org/3/library/asyncio-eventloop.html) and closes it at the end of the operation.

If you [**run this script**](/realpython.com/run-python-scripts.md) from your command line, then you get an output similar to the following:

```sh
python site_checker_v0.py
# 
# https://realpython.com: status -> 200
# https://pycoders.com: status -> 200
# https://pycoders.com: type -> <!doctype html>
# https://realpython.com: type -> <!doctype html>
```

Cool! Your script works and you confirm that both sites are currently available. You also retrieve the information regarding document type from each site’s home page.

::: note

Your output can look slightly different due to the nondeterministic nature of concurrent task scheduling and network latency. In particular, the individual lines can come out in a different order.

:::

The `async with` statement works similar to the regular `with` statement, but it requires an **asynchronous context manager**. In other words, it needs a context manager that is able to suspend execution in its enter and exit methods. Asynchronous context managers implement the special methods [<FontIcon icon="fa-brands fa-python"/>`.__aenter__()`](https://docs.python.org/3/reference/datamodel.html#object.__aenter__) and [<FontIcon icon="fa-brands fa-python"/>`.__aexit__()`](https://docs.python.org/3/reference/datamodel.html#object.__aexit__), which correspond to `.__enter__()` and `.__exit__()` in a regular context manager.

The `async with ctx_mgr` construct implicitly uses `await ctx_mgr.__aenter__()` when entering the context and `await ctx_mgr.__aexit__()` when exiting it. This achieves `async` context manager behavior seamlessly.
