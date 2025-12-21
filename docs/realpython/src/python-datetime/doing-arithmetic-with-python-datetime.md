---
lang: en-US
title: "Doing Arithmetic With Python datetime"
description: "Article(s) > (6/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (6/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Doing Arithmetic With Python datetime"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/doing-arithmetic-with-python-datetime.html
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
  url="https://realpython.com/python-datetime#doing-arithmetic-with-python-datetime"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

Python `datetime` instances support several types of arithmetic. As you saw earlier, this relies on using `timedelta` instances to represent time intervals. `timedelta` is very useful because it’s built into the Python standard library. Here’s an example of how to work with `timedelta`:

```py
from datetime import datetime, timedelta
now = datetime.now()
now
# 
# datetime.datetime(2020, 1, 26, 9, 37, 46, 380905)
tomorrow = timedelta(days=+1)
now + tomorrow
# 
# datetime.datetime(2020, 1, 27, 9, 37, 46, 380905)
```

In this code, you create `now`, which stores the current time, and `tomorrow`, which is a `timedelta` of `+1` days. Next, you add `now` and `tomorrow` to produce a `datetime` instance one day in the future. Note that working with naive `datetime` instances, as you are here, means that the `day` attribute of the `datetime` increments by one and does not account for any repeated or skipped time intervals.

`timedelta` instances also support negative values as the input to the arguments:

```py
yesterday = timedelta(days=-1)
now + yesterday
# 
# datetime.datetime(2020, 1, 25, 9, 37, 46, 380905)
```

In this example, you provide `-1` as the input to `timedelta`, so when you add `now` and `yesterday`, the result is a decrease by one in the `days` attribute.

`timedelta` instances support addition and subtraction as well as positive and negative integers for all arguments. You can even provide a mix of positive and negative arguments. For instance, you might want to add three days and subtract four hours:

```py
delta = timedelta(days=+3, hours=-4)
now + delta
# 
# datetime.datetime(2020, 1, 29, 5, 37, 46, 380905)
```

In this example, you add three days and subtract four hours, so the new `datetime` is at January 29 at 5:37 AM. `timedelta` is very useful in this way, but it’s somewhat limited because it cannot add or subtract intervals larger than a day, such as a month or a year. Fortunately, `dateutil` provides a more powerful replacement called [<VPIcon icon="fas fa-globe"/>`relativedelta`](https://dateutil.readthedocs.io/en/stable/relativedelta.html).

The basic syntax of `relativedelta` is very similar to `timedelta`. You can provide keyword arguments that produce changes of any number of years, months, days, hours, seconds, or microseconds. You can reproduce the first `timedelta` example with this code:

```py
from dateutil.relativedelta import relativedelta
tomorrow = relativedelta(days=+1)
now + tomorrow
# 
# datetime.datetime(2020, 1, 27, 9, 37, 46, 380905)
```

In this example, you use `relativedelta` instead of `timedelta` to find the `datetime` corresponding to tomorrow. Now you can try adding five years, one month, and three days to `now` while subtracting four hours and thirty minutes:

```py
delta = relativedelta(years=+5, months=+1, days=+3, hours=-4, minutes=-30)
now + delta
# 
# datetime.datetime(2025, 3, 1, 5, 7, 46, 380905)
```

Notice in this example that the date ends up as March 1, 2025. This is because adding three days to `now` would be January 29, and adding one month to that would be February 29, which only exists in a leap year. Since 2025 is not a leap year, the date rolls over to the next month.

You can also use `relativedelta` to calculate the difference between two `datetime` instances. Earlier, you used the subtraction operator to find the difference between two Python `datetime` instances, `PYCON_DATE` and `now`. With `relativedelta`, instead of using the subtraction operator, you need to pass the two `datetime` instances as arguments :

```py
now
# 
# datetime.datetime(2020, 1, 26, 9, 37, 46, 380905)
tomorrow = datetime(2020, 1, 27, 9, 37, 46, 380905)
relativedelta(now, tomorrow)
# 
# relativedelta(days=-1)
```

In this example, you create a new `datetime` instance for `tomorrow` by incrementing the `days` field by one. Then, you use `relativedelta` and pass `now` and `tomorrow` as the two arguments. `dateutil` then takes the difference between these two `datetime` instances and returns the result as a `relativedelta` instance. In this case, the difference is `-1` days, since `now` happens before `tomorrow`.

`dateutil.relativedelta` objects have countless other uses. You can use them to find complex calendar information, such as the next year in which October the 13th falls on a Friday or what the date will be on the last Friday of the current month. You can even use them to replace attributes of a `datetime` instance and create, for example, a `datetime` one week in the future at 10:00 AM. You can read all about these other uses in the `dateutil` [<VPIcon icon="fas fa-globe"/>documentation](https://dateutil.readthedocs.io/en/stable/examples.html#relativedelta-examples).
