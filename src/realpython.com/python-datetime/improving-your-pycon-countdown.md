---
lang: en-US
title: "Improving Your PyCon Countdown"
description: "Article(s) > (5/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (5/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Improving Your PyCon Countdown"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/improving-your-pycon-countdown.html
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
  url="https://realpython.com/python-datetime#improving-your-pycon-countdown"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

Now that you know how to add time zone information to a Python `datetime` instance, you can improve your PyCon countdown code. Earlier, you used the standard `datetime` constructor to pass the year, month, day, and hour that PyCon will start. You can update your code to use the [<FontIcon icon="fas fa-globe"/>`dateutil.parser`](https://dateutil.readthedocs.io/en/stable/parser.html) module, which provides a more natural interface for creating `datetime` instances:

```py title="pyconcd.py"
from dateutil import parser, tz
from datetime import datetime

PYCON_DATE = parser.parse("May 12, 2021 8:00 AM")
PYCON_DATE = PYCON_DATE.replace(tzinfo=tz.gettz("America/New_York"))
now = datetime.now(tz=tz.tzlocal())

countdown = PYCON_DATE - now
print(f"Countdown to PyCon US 2021: {countdown}")
```

In this code, you [**import**](/realpython.com/python-import.md) `parser` and `tz` from `dateutil` and `datetime` from `datetime`. Next, you use `parser.parse()` to read the date of the next PyCon US from a string. This is much more readable than the plain `datetime` constructor.

`parser.parse()` returns a naive `datetime` instance, so you use `.replace()` to change the `tzinfo` to the `America/New_York` time zone. PyCon US 2021 will take place in Pittsburgh, Pennsylvania, which is in the US Eastern time zone. The canonical name for that time zone is `America/New_York` since New York City is the largest city in the time zone.

`PYCON_DATE` is an aware `datetime` instance with the time zone set to US Eastern time. Since May 12 is after daylight saving time takes effect, the time zone name is `'EDT'`, or `'Eastern Daylight Time'`.

Next, you create `now` to represent the current instant of time and give it your local time zone. Last, you find the `timedelta` between `PYCON_DATE` and `now` and print the result. If you’re in a locale that does not adjust the clocks for daylight saving time, then you may see the number of hours remaining until PyCon change by an hour.
