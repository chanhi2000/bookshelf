---
lang: en-US
title: "Using the Python datetime Module"
description: "Article(s) > (2/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (2/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Using the Python datetime Module"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/using-the-python-datetime-module.html
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
  url="https://realpython.com/python-datetime#using-the-python-datetime-module"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

As you can see, working with dates and times in programming can be complicated. Fortunately, you rarely need to implement complicated features from scratch these days since many open-source libraries are available to help out. This is definitely the case in Python, which includes three separate modules in the standard library to work with dates and times:

1. [<FontIcon icon="fa-brands fa-python"/>`calendar`](https://docs.python.org/3/library/calendar.html#module-calendar) outputs calendars and provides functions using an idealized [<FontIcon icon="fa-brands fa-wikipedia-w"/>Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar).
2. [<FontIcon icon="fa-brands fa-python"/>`datetime`](https://docs.python.org/3/library/datetime.html) supplies classes for manipulating dates and times.
3. [<FontIcon icon="fa-brands fa-python"/>`time`](https://docs.python.org/3/library/time.html) provides time-related functions where dates are not needed.

In this tutorial, you’ll focus on using the Python `datetime` module. The main focus of `datetime` is to make it less complicated to access attributes of the object related to dates, times, and time zones. Since these objects are so useful, `calendar` also returns instances of classes from `datetime`.

[**`time`**](/realpython.com/python-time-module.md) is less powerful and more complicated to use than `datetime`. Many functions in `time` return a special [<FontIcon icon="fa-brands fa-python"/>`struct_time`](https://docs.python.org/3/library/time.html#time.struct_time) instance. This object has a [**named tuple**](/realpython.com/python-namedtuple.md) interface for accessing stored data, making it similar to an instance of `datetime`. However, it doesn’t support all of the features of `datetime`, especially the ability to perform arithmetic with time values.

`datetime` provides three classes that make up the high-level interface that most people will use:

1. [<FontIcon icon="fa-brands fa-python"/>`datetime.date`](https://docs.python.org/3/library/datetime.html#date-objects) is an idealized date that assumes the Gregorian calendar extends infinitely into the future and past. This object stores the `year`, `month`, and `day` as attributes.
2. [<FontIcon icon="fa-brands fa-python"/>`datetime.time`](https://docs.python.org/3/library/datetime.html#time-objects) is an idealized time that assumes there are 86,400 seconds per day with no leap seconds. This object stores the `hour`, `minute`, `second`, `microsecond`, and `tzinfo` (time zone information).
3. [<FontIcon icon="fa-brands fa-python"/>`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime-objects) is a combination of a `date` and a `time`. It has all the attributes of both classes.

---

## Creating Python `datetime` Instances

The three classes that represent dates and times in `datetime` have similar **initializers**. They can be [**instantiated**](/realpython.com/python3-object-oriented-programming/README.md#how-do-you-instantiate-a-class-in-python) by passing keyword arguments for each of the attributes, such as `year`, `date`, or `hour`. You can try the code below to get a sense of how each object is created:

```py
from datetime import date, time, datetime
date(year=2020, month=1, day=31)
#
# datetime.date(2020, 1, 31)
time(hour=13, minute=14, second=31)
#
# datetime.time(13, 14, 31)
datetime(year=2020, month=1, day=31, hour=13, minute=14, second=31)
#
# datetime.datetime(2020, 1, 31, 13, 14, 31)
```

In this code, you [**import**](/realpython.com/absolute-vs-relative-python-imports.md) the three main classes from `datetime` and **instantiate** each of them by passing arguments to the constructor. You can see that this code is somewhat verbose, and if you don’t have the information you need as [<FontIcon icon="fas fa-globe"/>integers](https://realpython.com/lessons/integers/), these techniques can’t be used to create `datetime` instances.

Fortunately, `datetime` provides several other convenient ways to create `datetime` instances. These methods don’t require you to use integers to specify each attribute, but instead allow you to use some other information:

1. [<FontIcon icon="fa-brands fa-python"/>`date.today()`](https://docs.python.org/3/library/datetime.html#datetime.date.today) creates a `datetime.date` instance with the current local date.
2. [<FontIcon icon="fa-brands fa-python"/>`datetime.now()`](https://docs.python.org/3/library/datetime.html#datetime.datetime.now) creates a `datetime.datetime` instance with the current local date and time.
3. [<FontIcon icon="fa-brands fa-python"/>`datetime.combine()`](https://docs.python.org/3/library/datetime.html#datetime.datetime.combine) combines instances of `datetime.date` and `datetime.time` into a single `datetime.datetime` instance.

These three ways of creating `datetime` instances are helpful when you don’t know in advance what information you need to pass into the basic initializers. You can try out this code to see how the alternate initializers work:

```py
from datetime import date, time, datetime
today = date.today()
today
#
# datetime.date(2020, 1, 24)
now = datetime.now()
now
#
# datetime.datetime(2020, 1, 24, 14, 4, 57, 10015)
current_time = time(now.hour, now.minute, now.second)
datetime.combine(today, current_time)
#
# datetime.datetime(2020, 1, 24, 14, 4, 57)
```

In this code, you use `date.today()`, `datetime.now()`, and `datetime.combine()` to create instances of `date`, `datetime`, and `time` objects. Each instance is stored in a different [**variable**](/realpython.com/python-variables.md):

1. `today` is a `date` instance that has only the year, month, and day.
2. `now` is a `datetime` instance that has the year, month, day, hour, minute, second, and microseconds.
3. `current_time` is a `time` instance that has the hour, minute, and second set to the same values as `now`.

On the last line, you combine the date information in `today` with the time information in `current_time` to produce a new `datetime` instance.

::: warning

`datetime` also provides `datetime.utcnow()`, which returns an instance of `datetime` at the current UTC. However, the Python [<FontIcon icon="fa-brands fa-python"/>documentation](https://docs.python.org/3/library/datetime.html#datetime.datetime.utcnow) recommends against using this method because it doesn’t include any time zone information in the resulting instance.

Using `datetime.utcnow()` may produce some [<FontIcon icon="fas fa-globe"/>surprising results](https://blog.ganssle.io/articles/2019/11/utcnow.html) when doing arithmetic or comparisons between `datetime` instances. In a [later section](/realpython.com/python-datetime/working-with-time-zones.md), you’ll see how to assign time zone information to `datetime` instances.

:::

---

## Using Strings to Create Python `datetime` Instances

Another way to create `date` instances is to use [<FontIcon icon="fa-brands fa-python"/>`.fromisoformat()`](https://docs.python.org/3/library/datetime.html#datetime.date.fromisoformat). To use this method, you provide a [**string**](/realpython.com/python-strings.md) with the date in the ISO 8601 format that you learned about [**earlier**](/realpython.com/python-datetime/programming-with-dates-and-times.md#how-standard-dates-can-be-reported). For instance, you might provide a string with the year, month, and date specified:

```plaintext
2020-01-31
```

This string represents the date January 31, 2020, according to the ISO 8601 format. You can create a `date` instance with the following example:

```py
from datetime import date
date.fromisoformat("2020-01-31")
# 
# datetime.date(2020, 1, 31)
```

In this code, you use `date.fromisoformat()` to create a `date` instance for January 31, 2020. This method is very useful because it’s based on the ISO 8601 standard. But what if you have a string that represents a date and time but isn’t in the ISO 8601 format?

Fortunately, Python `datetime` provides a method called [<FontIcon icon="fa-brands fa-python"/>`.strptime()`](https://docs.python.org/3/library/datetime.html#datetime.datetime.strptime) to handle this situation. This method uses a special **mini-language** to tell Python which parts of the string are associated with the `datetime` attributes.

To construct a `datetime` from a string using `.strptime()`, you have to tell Python what each of the parts of the string represents using formatting codes from the mini-language. You can try this example to see how `.strptime()` works:

```py
date_string = "01-31-2020 14:45:37"
format_string = "%m-%d-%Y %H:%M:%S"
```

On **line 1**, you create `date_string`, which represents the date and time January 31, 2020, at 2:45:37 PM. On **line 2**, you create `format_string`, which uses the mini-language to specify how the parts of `date_string` will be turned into `datetime` attributes.

In `format_string`, you include several formatting codes and all of the dashes (`-`), colons (`:`), and spaces exactly as they appear in `date_string`. To process the date and time in `date_string`, you include the following formatting codes:

| Component | Code | Value |
| ---: | :---; | --- |
| Year (as four-digit integer ) | `%Y` | 2020 |
| Month (as zero-padded decimal) | `%m` | 01 |
| Date (as zero-padded decimal) | `%d` | 31 |
| Hour (as zero-padded decimal with 24-hour clock) | `%H` | 14 |
| Minute (as zero-padded decimal) | `%M` | 45 |
| Second (as zero-padded decimal) | `%S` | 37 |

A complete listing of all of the options in the mini-language is outside the scope of this tutorial, but you can find several good references on the web, including in Python’s [<FontIcon icon="fa-brands fa-python"/>documentation](https://docs.python.org/3/library/datetime.html#strftime-strptime-behavior) and on a website called [<FontIcon icon="fas fa-globe"/>strftime.org](https://strftime.org/).

Now that `date_string` and `format_string` are defined, you can use them to create a `datetime` instance. Here’s an example of how `.strptime()` works:

```py
from datetime import datetime
datetime.strptime(date_string, format_string)
#
# datetime.datetime(2020, 1, 31, 14, 45, 37)
```

In this code, you import `datetime` on **line 3** and use `datetime.strptime()` with `date_string` and `format_string` on **line 4**. Finally, **line 5** shows the values of the attributes in the `datetime` instance created by `.strptime()`. You can see that they match the values shown in the table above.

::: note

There are more advanced ways to create `datetime` instances, but they involve using third-party libraries that must be installed. One particularly neat library is called [<FontIcon icon="fas fa-globe"/>`dateparser`](https://dateparser.readthedocs.io/en/latest/), which allows you to provide natural language string inputs. The input is even supported in a number of languages:

```py
import dateparser
dateparser.parse("yesterday")
#
# datetime.datetime(2020, 3, 13, 14, 39, 1, 350918)
dateparser.parse("morgen")
#
# datetime.datetime(2020, 3, 15, 14, 39, 7, 314754)
```

In this code, you use `dateparser` to create two `datetime` instances by passing two different string representations of time. On **line 1**, you import `dateparser`. Then, on **line 2**, you use `.parse()` with the argument `"yesterday"` to create a `datetime` instance twenty-four hours in the past. At the time of writing, this was March 13, 2020, at 2:39 PM.

On **line 3**, you use `.parse()` with the argument `"morgen"`. *Morgen* is the German word for tomorrow, so `dateparser` creates a `datetime` instance twenty-four hours in the future. At the time of writing, this was March 15 at 2:39 PM.

:::
