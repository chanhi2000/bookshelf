---
lang: en-US
title: "Creating an Asynchronous Context Manager"
description: "Article(s) > (9/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (9/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Creating an Asynchronous Context Manager"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/creating-an-asynchronous-context-manager.html
next: /realpython.com/python-with-statement/README.md#conclusion
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
  url="https://realpython.com/python-with-statement#creating-an-asynchronous-context-manager"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

To create an asynchronous context manager, you need to define the `.__aenter__()` and `.__aexit__()` methods. The script below is a reimplementation of the original script <FontIcon icon="fa-brands fa-python"/>`site_checker_v0.py` you saw before, but this time you provide a custom asynchronous context manager to wrap the session creation and closing functionalities:

```py :collapsed-lines title="site_checker_v1.py"
import aiohttp
import asyncio

class AsyncSession:
    def __init__(self, url):
        self._url = url

    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        response = await self.session.get(self._url)
        return response

    async def __aexit__(self, exc_type, exc_value, exc_tb):
        await self.session.close()

async def check(url):
    async with AsyncSession(url) as response:
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

This script works similar to its previous version, `site_checker_v0.py`. The main difference is that, in this example, you extract the logic of the original outer `async with` statement and encapsulate it in `AsyncSession`.

In `.__aenter__()`, you create an `aiohttp.ClientSession()`, await the `.get()` response, and finally return the response itself. In `.__aexit__()`, you close the session, which corresponds to the teardown logic in this specific case. Note that `.__aenter__()` and `.__aexit__()` must return awaitable objects. In other words, you must define them with `async def`, which returns a coroutine object that is awaitable by definition.

If you run the script from your command line, then you get an output similar to this:

```sh
python site_checker_v1.py
# 
# https://realpython.com: status -> 200
# https://pycoders.com: status -> 200
# https://realpython.com: type -> <!doctype html>
# https://pycoders.com: type -> <!doctype html>
```

Great! Your script works just like its first version. It sends [<FontIcon icon="fa-brands fa-wikipedia-w"/>`GET` requests](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) to both sites concurrently and processes the corresponding responses.

Finally, a common practice when you’re writing asynchronous context managers is to implement the four special methods:

1. `.__aenter__()`
2. `.__aexit__()`
3. `.__enter__()`
4. `.__exit__()`

This makes your context manager usable with both variations of `with`.
