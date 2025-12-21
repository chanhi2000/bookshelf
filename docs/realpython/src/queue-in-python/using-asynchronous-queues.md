---
lang: en-US
title: "Using Asynchronous Queues"
description: "Article(s) > (5/7) Python Stacks, Queues, and Priority Queues in Practice"
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
      content: "Article(s) > (5/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Using Asynchronous Queues"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/using-asynchronous-queues.html
date: 2022-06-29
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Stacks, Queues, and Priority Queues in Practice",
  "desc": "In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding.",
  "link": "/realpython.com/queue-in-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Stacks, Queues, and Priority Queues in Practice"
  desc="In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding."
  url="https://realpython.com/queue-in-python#using-asynchronous-queues"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>


---

## Using Asynchronous Queues

If you’d like to use queues in an asynchronous context, then Python has you covered. The [`asyncio`](https://realpython.com/async-io-python/) module provides asynchronous counterparts to queues from the `threading` module, which you can use in [coroutine functions](https://docs.python.org/3/glossary.html#term-coroutine-function) on a single thread. Because both queue families share a similar interface, switching from one to the other should be relatively painless.

In this section, you’ll write a rudimentary [web crawler](https://en.wikipedia.org/wiki/Web_crawler), which recursively follows links on a specified website up to a given depth level and counts the number of visits per link. To fetch data asynchronously, you’ll use the popular [`aiohttp`](https://pypi.org/project/aiohttp/) library, and to parse HTML hyperlinks, you’ll rely on [`beautifulsoup4`](https://pypi.org/project/beautifulsoup4/). Be sure to install both libraries into your virtual environment before proceeding:

```sh
(venv) $ python -m pip install aiohttp beautifulsoup4
```

Now you can make HTTP requests asynchronously and select HTML elements from a so-called [tag soup](https://en.wikipedia.org/wiki/Tag_soup) received from the server.

**Note:** You can use Beautiful Soup and Python to [build a web scraper](https://realpython.com/beautiful-soup-web-scraper-python/), which collects valuable data while visiting web pages.

To lay the groundwork for your web crawler, you’ll make a few building blocks first. Create a new file named `async_queues.py` and define the following structure in it:

```py
# async_queues.py

import argparse
import asyncio
from collections import Counter

import aiohttp

async def main(args):
    session = aiohttp.ClientSession()
    try:
        links = Counter()
        display(links)
    finally:
        await session.close()

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("url")
    parser.add_argument("-d", "--max-depth", type=int, default=2)
    parser.add_argument("-w", "--num-workers", type=int, default=3)
    return parser.parse_args()

def display(links):
    for url, count in links.most_common():
        print(f"{count:>3} {url}")

if __name__ == "__main__":
    asyncio.run(main(parse_args()))
```

As with most asynchronous programs, you pass your `main()` coroutine to `asyncio.run()` so that it can execute it on the default [event loop](https://docs.python.org/3/library/asyncio-eventloop.html). The coroutine takes a few command-line arguments parsed with a helper function defined below, starts a new `aiohttp.ClientSession`, and defines a [counter](https://realpython.com/python-counter/) of the visited links. Later, the coroutine displays the list of links sorted by the number of visits in descending order.

To run your script, you’ll specify a root URL and optionally the maximum depth and the number of workers. Here’s an example:

```sh
$ python async_queues.py https://www.python.org/ --max-depth 2 \
 --num-workers 3
```

There are still a few missing pieces like fetching content and parsing HTML links, so add them to your file:

```py
# async_queues.py

from urllib.parse import urljoin
from bs4 import BeautifulSoup

# ...

async def fetch_html(session, url):
    async with session.get(url) as response:
        if response.ok and response.content_type == "text/html":
            return await response.text()

def parse_links(url, html):
    soup = BeautifulSoup(html, features="html.parser")
    for anchor in soup.select("a[href]"):
        href = anchor.get("href").lower()
        if not href.startswith("javascript:"):
            yield urljoin(url, href)
```

You’ll only return the received content as long as it’s HTML, which you can tell by looking at the `Content-Type` [HTTP header](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields). When extracting links from the HTML content, you’ll skip inline [JavaScript](https://realpython.com/python-vs-javascript/) in the `href` attribute, and optionally join a relative path with the current URL.

Next, you’re going to define a new data type representing a job that you’ll put in the queue, as well as an asynchronous worker performing the job:

```py
# async_queues.py

import sys
from typing import NamedTuple

# ...

class Job(NamedTuple):
    url: str
    depth: int = 1

# ...

async def worker(worker_id, session, queue, links, max_depth):
    print(f"[{worker_id} starting]", file=sys.stderr)
    while True:
 url, depth = await queue.get()        links[url] += 1
        try:
            if depth <= max_depth:
                print(f"[{worker_id} {depth=} {url=}]", file=sys.stderr)
                if html := await fetch_html(session, url):
                    for link_url in parse_links(url, html):
                        await queue.put(Job(link_url, depth + 1))
        except aiohttp.ClientError:
            print(f"[{worker_id} failed at {url=}]", file=sys.stderr)
        finally:
            queue.task_done()
```

A job consists of the URL address to visit and the current depth that a worker will use to stop crawling recursively. Thanks to specifying a job as a named tuple, you unpack its individual components on the highlighted line after dequeuing it. When you don’t specify the depth for a job, then it defaults to one.

The worker sits in an infinite loop, waiting for a job to arrive in the queue. After consuming a single job, the worker can put one or more new jobs with a bumped-up depth in the queue to be consumed by itself or other workers.

Because your worker is both a **producer** and a **consumer**, it’s crucial to unconditionally mark a job as done in a `try` … `finally` clause to avoid a deadlock. You should also handle errors in your worker because unhandled [exceptions](https://realpython.com/python-exceptions/) will make your worker stop accepting new jobs otherwise.

**Note:** You can use the [`print()`](https://realpython.com/python-print/) function in asynchronous code—for example, to [log diagnostic messages](https://en.wikipedia.org/wiki/Logging_(software))—because everything runs on a single thread. On the other hand, you’d have to replace it with the [`logging`](https://realpython.com/python-logging/) module in a multithreaded code because the `print()` function isn’t thread-safe.

Also, notice that you print the diagnostic messages to [standard error (stderr)](https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)), while the output of your program prints to [standard output (stdout)](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)), which are two completely separate streams. This allows you to redirect one or both to a file, for instance.

Your worker increments the number of hits when visiting a URL. Additionally, if the current URL’s depth doesn’t exceed the maximum allowed depth, then the worker fetches the HTML content that the URL points to and iterates over its links. The walrus operator (`:=`) lets you await an HTTP response, check if the content was returned, and assign the result to the `html` variable in a single expression.

The last remaining step is to create an instance of the asynchronous queue and pass it to the workers.

### asyncio.Queue

In this section, you’ll update your `main()` coroutine by creating the queue and the asynchronous tasks that run your workers. Each worker will receive a unique identifier to differentiate it in the log messages, an `aiohttp` session, the queue instance, the counter of visits to a particular link, and the maximum depth. Because you’re using a single thread, you don’t need to ensure [mutually exclusive](https://en.wikipedia.org/wiki/Mutual_exclusion) access to shared resources:

Python

 `1# async_queues.py
 2
 3# ...
 4
 5async def main(args):
 6    session = aiohttp.ClientSession()
 7    try:
 8        links = Counter()
 9        queue = asyncio.Queue()
10        tasks = [
11            asyncio.create_task(
12                worker(
13                    f"Worker-{i + 1}",
14                    session,
15                    queue,
16                    links,
17                    args.max_depth,
18                )
19            )
20            for i in range(args.num_workers)
21        ]
22
23        await queue.put(Job(args.url))
24        await queue.join()
25
26        for task in tasks:
27            task.cancel()
28
29        await asyncio.gather(*tasks, return_exceptions=True)
30
31        display(links)
32    finally:
33        await session.close()
34
35# ...
```

Here’s a line-by-line breakdown of the updated code:

- **Line 9** instantiates an asynchronous FIFO queue.
- **Lines 10 to 21** create a number of worker coroutines wrapped in [asynchronous tasks](https://docs.python.org/3/library/asyncio-task.html#creating-tasks) that start running as soon as possible in the background on the event loop.
- **Line 23** puts the first job in the queue, which kicks off the crawling.
- **Line 24** causes the main coroutine to wait until the queue has been drained and there are no more jobs to perform.
- **Lines 26 to 29** do a graceful cleanup when the background tasks are no longer needed.

Please, don’t run the web crawler against an actual website hosted online. It can cause an unwanted spike in the network traffic and get you in trouble. To test your crawler, you’re better off starting an [HTTP server](https://realpython.com/python-http-server/) built into Python, which turns a local folder in your file system into a navigable website. For example, the following command will start a server in a local folder with a Python virtual environment:

```sh
$ cd venv/
$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

This isn’t an ideal analogy to a real-world website, though, because files and folders make up a tree-like hierarchy, whereas websites are often represented by dense multigraphs with backlinks. Anyway, when you run the web crawler against a chosen URL address in another terminal window, you’ll notice that the crawler follows the links in their natural order of appearance:

```sh
$ python async_queues.py http://localhost:8000 --max-depth=4
[Worker-1 starting]
[Worker-1 depth=1 url='http://localhost:8000']
[Worker-2 starting]
[Worker-3 starting]
[Worker-1 depth=2 url='http://localhost:8000/bin/']
[Worker-2 depth=2 url='http://localhost:8000/include/']
[Worker-3 depth=2 url='http://localhost:8000/lib/']
[Worker-2 depth=2 url='http://localhost:8000/lib64/']
[Worker-1 depth=2 url='http://localhost:8000/pyvenv.cfg']
[Worker-3 depth=3 url='http://localhost:8000/bin/activate']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate.csh']
[Worker-1 depth=3 url='http://localhost:8000/bin/activate.fish']
[Worker-3 depth=3 url='http://localhost:8000/bin/activate.ps1']
[Worker-2 depth=3 url='http://localhost:8000/bin/pip']
[Worker-3 depth=3 url='http://localhost:8000/bin/pip3']
[Worker-1 depth=3 url='http://localhost:8000/bin/pip3.10']
[Worker-2 depth=3 url='http://localhost:8000/bin/python']
[Worker-3 depth=3 url='http://localhost:8000/bin/python3']
[Worker-1 depth=3 url='http://localhost:8000/bin/python3.10']
[Worker-2 depth=3 url='http://localhost:8000/lib/python3.10/']
[Worker-3 depth=3 url='http://localhost:8000/lib64/python3.10/']
[Worker-2 depth=4 url='http://localhost:8000/lib/python3.10/site-packages/']
[Worker-3 depth=4 url='http://localhost:8000/lib64/python3.10/site-packages/']
⋮
```

It visits the only URL on the first level with depth equal to one. Then, after visiting all links on the second level, the crawler proceeds to the third level and so on until reaching the maximum depth level requested. Once all links on a given level are explored, the crawler never goes back to an earlier level. That’s a direct consequence of using a FIFO queue, which is different from using a stack or a LIFO queue.

### asyncio.LifoQueue

As with the synchronized queues, their asynchronous companions let you change the behavior of your workers without modifying their code. Go back to your `async_queues` module and replace the existing FIFO queue with a LIFO one:

```py
# async_queues.py

# ...

async def main(args):
    session = aiohttp.ClientSession()
    try:
        links = Counter()
 queue = asyncio.LifoQueue()        tasks = [
            asyncio.create_task(
                worker(
                    f"Worker-{i + 1}",
                    session,
                    queue,
                    links,
                    args.max_depth,
                )
            )
            for i in range(args.num_workers)
        ]

        await queue.put(Job(args.url))
        await queue.join()

        for task in tasks:
            task.cancel()

        await asyncio.gather(*tasks, return_exceptions=True)

        display(links)
    finally:
        await session.close()

# ...
```

Without stopping your HTTP server, run the web crawler using the same options again:

```sh
$ python async_queues.py http://localhost:8000 --max-depth=4
[Worker-1 starting]
[Worker-1 depth=1 url='http://localhost:8000']
[Worker-2 starting]
[Worker-3 starting]
[Worker-1 depth=2 url='http://localhost:8000/pyvenv.cfg']
[Worker-2 depth=2 url='http://localhost:8000/lib64/']
[Worker-3 depth=2 url='http://localhost:8000/lib/']
[Worker-1 depth=2 url='http://localhost:8000/include/']
[Worker-2 depth=3 url='http://localhost:8000/lib64/python3.10/']
[Worker-3 depth=3 url='http://localhost:8000/lib/python3.10/']
[Worker-1 depth=2 url='http://localhost:8000/bin/'] [Worker-2 depth=4 url='http://localhost:8000/lib64/python3.10/site-packages/']
[Worker-1 depth=3 url='http://localhost:8000/bin/python3.10'] [Worker-2 depth=3 url='http://localhost:8000/bin/python3']
[Worker-3 depth=4 url='http://localhost:8000/lib/python3.10/site-packages/']
[Worker-1 depth=3 url='http://localhost:8000/bin/python'] [Worker-2 depth=3 url='http://localhost:8000/bin/pip3.10']
[Worker-1 depth=3 url='http://localhost:8000/bin/pip3']
[Worker-3 depth=3 url='http://localhost:8000/bin/pip']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate.ps1']
[Worker-1 depth=3 url='http://localhost:8000/bin/activate.fish']
[Worker-3 depth=3 url='http://localhost:8000/bin/activate.csh']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate']
⋮
```

Assuming the content hasn’t changed since the last run, the crawler visits identical links but in a different order. The highlighted lines indicate visiting a link on a previously explored depth level.

**Note:** If you kept track of the already visited links and skipped them on the subsequent encounters, then it could lead to different outputs depending on the queue type used. That’s because many alternative paths might originate on different depth levels but lead up to the same destination.

Next up, you’ll see an asynchronous priority queue in action.

### asyncio.PriorityQueue

To use your jobs in a priority queue, you must specify how to compare them when deciding on their priorities. For example, you may want to visit shorter URLs first. Go ahead and add the `.__lt__()` special method to your `Job` class, to which the less than (`<`) operator delegates when comparing two job instances:

```py
# async_queues.py

# ...

class Job(NamedTuple):
    url: str
    depth: int = 1

 def __lt__(self, other): if isinstance(other, Job): return len(self.url) < len(other.url)
```

If you compare a job to a completely different data type, then you can’t say which one is smaller, so you implicitly return `None`. On the other hand, when comparing two instances of the `Job` class, you resolve their priorities by examining the lengths of their corresponding `.url` fields:

```py
>>> from async_queues import Job
>>> job1 = Job("http://localhost/")
>>> job2 = Job("https://localhost:8080/")
>>> job1 < job2
True
```

The shorter the URL, the higher the priority because smaller values take precedence in a min-heap.

The last change to make in your script is using the asynchronous priority queue instead of the other two:

```py
# async_queues.py

# ...

async def main(args):
    session = aiohttp.ClientSession()
    try:
        links = Counter()
 queue = asyncio.PriorityQueue()        tasks = [
            asyncio.create_task(
                worker(
                    f"Worker-{i + 1}",
                    session,
                    queue,
                    links,
                    args.max_depth,
                )
            )
            for i in range(args.num_workers)
        ]

        await queue.put(Job(args.url))
        await queue.join()

        for task in tasks:
            task.cancel()

        await asyncio.gather(*tasks, return_exceptions=True)

        display(links)
    finally:
        await session.close()

# ...
```

Try running your web crawler with an even bigger maximum depth value—say, five:

```sh
$ python async_queues.py http://localhost:8000 --max-depth 5
[Worker-1 starting]
[Worker-1 depth=1 url='http://localhost:8000']
[Worker-2 starting]
[Worker-3 starting]
[Worker-1 depth=2 url='http://localhost:8000/bin/']
[Worker-2 depth=2 url='http://localhost:8000/lib/']
[Worker-3 depth=2 url='http://localhost:8000/lib64/']
[Worker-3 depth=2 url='http://localhost:8000/include/']
[Worker-2 depth=2 url='http://localhost:8000/pyvenv.cfg']
[Worker-1 depth=3 url='http://localhost:8000/bin/pip']
[Worker-3 depth=3 url='http://localhost:8000/bin/pip3']
[Worker-2 depth=3 url='http://localhost:8000/bin/python']
[Worker-1 depth=3 url='http://localhost:8000/bin/python3']
[Worker-3 depth=3 url='http://localhost:8000/bin/pip3.10']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate']
[Worker-1 depth=3 url='http://localhost:8000/bin/python3.10']
[Worker-3 depth=3 url='http://localhost:8000/lib/python3.10/']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate.ps1']
[Worker-3 depth=3 url='http://localhost:8000/bin/activate.csh']
[Worker-1 depth=3 url='http://localhost:8000/lib64/python3.10/']
[Worker-2 depth=3 url='http://localhost:8000/bin/activate.fish']
[Worker-3 depth=4 url='http://localhost:8000/lib/python3.10/site-packages/']
[Worker-1 depth=4 url='http://localhost:8000/lib64/python3.10/site-packages/']
⋮
```

You’ll immediately notice that links are generally explored in the order determined by the URL lengths. Naturally, the exact order will vary slightly with each run because of the non-deterministic nature of the time it takes for the server to reply.

Asynchronous queues are a fairly new addition to the Python standard library. They deliberately mimic an interface of the corresponding thread-safe queues, which should make any seasoned Pythonista feel at home. You can use asynchronous queues to exchange data between coroutines.

In the next section, you’ll familiarize yourself with the last family of queues available in the Python standard library, which lets you communicate across two or more OS-level processes.
