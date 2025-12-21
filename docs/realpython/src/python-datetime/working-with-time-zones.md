---
lang: en-US
title: "Working With Time Zones"
description: "Article(s) > (4/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (4/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Working With Time Zones"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/working-with-time-zones.html
date: 2020-05-04
isOriginal: false
author:
  - name: Bryan Weber
    url : https://realpython.com/team/bweber/
cover: https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Using Python datetime to Work With Dates and Times",
  "desc": "Have you ever wondered about working with dates and times in Python? In this tutorial, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times.",
  "link": "/realpython.com/python-datetime/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using Python datetime to Work With Dates and Times"
  desc="Have you ever wondered about working with dates and times in Python? In this tutorial, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times."
  url="https://realpython.com/python-datetime#working-with-time-zones"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

As you saw earlier, storing the time zone in which a date occurs is an important aspect of ensuring your code is correct. Python `datetime` provides `tzinfo`, which is an abstract base class that allows `datetime.datetime` and `datetime.time` to include time zone information, including an idea of daylight saving time.

However, `datetime` does not provide a direct way to interact with the IANA time zone database. The Python `datetime.tzinfo` documentation [<VPIcon icon="fa-brands fa-python"/>recommends](https://docs.python.org/3/library/datetime.html#tzinfo-objects) using a third-party package called `dateutil`. You can install `dateutil` with [`pip`](https://realpython.com/what-is-pip/):

```sh
python -m pip install python-dateutil
```

Note that the name of the package that you install from PyPI, `python-dateutil`, is different from the name that you use to import the package, which is just `dateutil`.

---

## Using `dateutil` to Add Time Zones to Python `datetime`

One reason that `dateutil` is so useful is that it includes an interface to the IANA time zone database. This takes the hassle out of assigning time zones to your `datetime` instances. Try out this example to see how to set a `datetime` instance to have your local time zone:

```py
from dateutil import tz
from datetime import datetime
now = datetime.now(tz=tz.tzlocal())
now
# 
# datetime.datetime(2020, 1, 26, 0, 55, 3, 372824, tzinfo=tzlocal())
now.tzname()
# 
# 'Eastern Standard Time'
```

In this example, you [<VPIcon icon="fas fa-globe"/>import](https://realpython.com/courses/absolute-vs-relative-imports-python/) `tz` from `dateutil` and `datetime` from `datetime`. You then create a `datetime` instance set to the current time using `.now()`.

You also pass the `tz` keyword to `.now()` and set `tz` equal to `tz.tzlocal()`. In `dateutil`, `tz.tzlocal()` returns a concrete instance of `datetime.tzinfo`. This means that it can represent all the necessary time zone offset and daylight saving time information that `datetime` needs.

You also print the name of the time zone using `.tzname()`, which prints `'Eastern Standard Time'`. This is the output for Windows, but on macOS or Linux, your output might read `'EST'` if you’re in the US Eastern time zone during the winter.

You can also create time zones that are not the same as the time zone reported by your computer. To do this, you’ll use `tz.gettz()` and pass the official [<VPIcon icon="fa-brands fa-wikipedia-w"/>IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the time zone you’re interested in. Here’s an example of how to use `tz.gettz()`:

```py
from dateutil import tz
from datetime import datetime
London_tz = tz.gettz("Europe/London")
now = datetime.now(tz=London_tz)
now
# 
# datetime.datetime(2020, 1, 26, 6, 14, 53, 513460, tzinfo=tzfile('GB-Eire'))
now.tzname()
#
# 'GMT'
```

In this example, you use `tz.gettz()` to retrieve the time zone information for London, United Kingdom and store it in `London_tz`. You then retrieve the current time, setting the time zone to `London_tz`.

On Windows, this gives the `tzinfo` attribute the value `tzfile('GB-Eire')`. On macOS or Linux, the `tzinfo` attribute will look something like `tzfile('/usr/share/zoneinfo/Europe/London)`, but it might be slightly different depending on where `dateutil` pulls the time zone data from.

You also use `tzname()` to print the name of the time zone, which is now `'GMT'`, meaning Greenwich Mean Time. This output is the same on Windows, macOS, and Linux.

In an earlier [section](/realpython.com/python-datetimes/using-the-python-datetime-module.md#creating-python-datetime-instances), you learned that you shouldn’t use `.utcnow()` to create a `datetime` instance at the current UTC. Now you know how to use `dateutil.tz` to supply a time zone to the `datetime` instance. Here’s an example modified from the [<VPIcon icon="fa-brands fa-python"/>recommendation](https://docs.python.org/3/library/datetime.html#datetime.datetime.utcnow) in the Python documentation:

```py
from dateutil import tz
from datetime import datetime
datetime.now(tz=tz.UTC)
# 
# datetime.datetime(2020, 3, 14, 19, 1, 20, 228415, tzinfo=tzutc())
```

In this code, you use [<VPIcon icon="fas fa-globe"/>`tz.UTC`](https://dateutil.readthedocs.io/en/stable/tz.html#dateutil.tz.dateutil.tz.UTC) to set the time zone of `datetime.now()` to the UTC time zone. This method is recommended over using `utcnow()` because `utcnow()` returns a *naive* `datetime` instance, whereas the method demonstrated here returns an *aware* `datetime` instance.

Next, you’ll take a small detour to learn about **naive** vs **aware** `datetime` instances. If you already know all about this, then you can [skip ahead](/realpython.com/python-datetime/improving-your-pycon-countdown.md) to improve your PyCon countdown with time zone information.

---

## Comparing Naive and Aware Python `datetime` Instances

Python `datetime` instances support two types of operation, naive and aware. The basic difference between them is that naive instances don’t contain time zone information, whereas aware instances do. More formally, to quote the Python documentation:

::: info datetime — Basic date and time types — Python 3.13.2 documentation (<code>docs.python.org</code>)

<SiteInfo
  name="datetime — Basic date and time types"
  desc="Source code: Lib/datetime.py The datetime module supplies classes for manipulating dates and times. While date and time arithmetic is supported, the focus of the implementation is on efficient attr..."
  url="https://docs.python.org/3/library/datetime.html#id1"
  logo="https://docs.python.org/3/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

> An aware object represents a specific moment in time that is not open to interpretation. A naive object does not contain enough information to unambiguously locate itself relative to other date/time objects.

:::

This is an important distinction for working with Python `datetime`. An **aware** `datetime` instance can compare itself unambiguously to other aware `datetime` instances and will always return the correct time interval when used in arithmetic operations.

**Naive** `datetime` instances, on the other hand, may be ambiguous. One example of this ambiguity relates to daylight saving time. Areas that practice daylight saving time turn the clocks forward one hour in the spring and backward one hour in the fall. This typically happens at 2:00 AM local time. In the spring, the hour from 2:00 AM to 2:59 AM *never happens*, and in the fall, the hour from 1:00 AM to 1:59 AM happens *twice*!

Practically, what happens is that the offset from UTC in these time zones changes throughout the year. IANA tracks these changes and catalogs them in the different database files that your computer has installed. Using a library like `dateutil`, which uses the IANA database under the hood, is a great way to make sure that your code properly handles arithmetic with time.

::: note

In Python, the difference between naive and aware `datetime` instances is determined by the `tzinfo` attribute. An aware `datetime` instance has the `tzinfo` attribute equal to a subclass of the `datetime.tzinfo` abstract base class.

[**Python 3.8**](/realpython.com/python38-new-features.md) and below provide one concrete implementation of `tzinfo` called `timezone`. However, `timezone` is limited to expressing fixed offsets from UTC that cannot change throughout the year, so it isn’t that useful when you need to account for changes such as daylight saving time.

[**Python 3.9**](/realpython.com/python39-new-features.md) includes a new module called [<VPIcon icon="fa-brands fa-python"/>`zoneinfo`](https://docs.python.org/3.9/library/zoneinfo.html) that provides a concrete implementation of `tzinfo` that tracks the IANA database, so it includes changes like daylight saving time. However, until Python 3.9 becomes widely used, it probably makes sense to rely on `dateutil` if you need to support multiple Python versions.

`dateutil` also provides several concrete implementations of `tzinfo` in the `tz` module that you used earlier. You can check out the [<VPIcon icon="fas fa-globe"/>`dateutil.tz` documentation](https://dateutil.readthedocs.io/en/stable/tz.html) for more information.

:::

This doesn’t mean that you always need to use aware `datetime` instances. But aware instances are crucial if you’re comparing times with each other, especially if you’re comparing times in different parts of the world.
