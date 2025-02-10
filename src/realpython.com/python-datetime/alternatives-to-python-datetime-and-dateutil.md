---
lang: en-US
title: "Alternatives to Python datetime and dateutil"
description: "Article(s) > (8/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (8/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Alternatives to Python datetime and dateutil"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/alternatives-to-python-datetime-and-dateutil.html
next: /realpython.com/python-datetime/README.md#conclusion
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
  url="https://realpython.com/python-datetime#alternatives-to-python-datetime-and-dateutil"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

Python `datetime` and `dateutil` are a powerful combination of libraries when you’re working with dates and times. `dateutil` is even recommended in the Python documentation. However, there are many other libraries that you can use to work with dates and times in Python. Some of these rely on `datetime` and `dateutil`, while others are completely independent replacements:

- [<FontIcon icon="iconfont icon-pypi"/>`pytz`](https://pypi.org/project/pytz/)** provides time zone information similar to `dateutil`. It uses a somewhat different interface than the standard `datetime.tzinfo`, so be aware of the [<FontIcon icon="fas fa-globe"/>potential problems](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html) if you decide to use it.
- [<FontIcon icon="fas fa-globe"/>Arrow](https://arrow.readthedocs.io/en/latest/) provides a drop-in replacement for `datetime`. It’s inspired by <FontIcon icon="fa-brands fa-js"/>`moment.js`, so if you’re coming from web development, then this might be a more familiar interface.
- [<FontIcon icon="fas fa-globe"/>Pendulum](https://pendulum.eustace.io/) provides another drop-in replacement for `datetime`. It includes a time zone interface and an improved `timedelta` implementation.
- [<FontIcon icon="iconfont icon-github"/>`timofurrer/maya`](https://github.com/timofurrer/maya) provides a similar interface as `datetime`. It relies on Pendulum for parts of the parsing library.
- [<FontIcon icon="fas fa-globe"/>dateparser](https://dateparser.readthedocs.io/en/latest/) provides an interface to generate `datetime` instances from human-readable text. It’s flexible and supports many languages.

In addition, if you work heavily with [<FontIcon icon="fas fa-globe"/>NumPy](https://realpython.com/tutorials/numpy/), [<FontIcon icon="fas fa-globe"/>Pandas](https://realpython.com/courses/introduction-pandas-and-vincent/), or other [<FontIcon icon="fas fa-globe"/>data science](https://realpython.com/tutorials/data-science/) packages, then there are a few options that might be useful to you:

- [<FontIcon icon="iconfont icon-numpy"/>NumPy](https://numpy.org/doc/1.18/reference/arrays.datetime.html) provides a similar API to the built-in Python `datetime` library, but the NumPy version can be used in arrays.
- [<FontIcon icon="iconfont icon-pandas"/>Pandas](https://pandas.pydata.org/pandas-docs/stable/user_guide/timeseries.html) provides support for time-series data in [<FontIcon icon="fas fa-globe"/>DataFrames](https://realpython.com/courses/pandas-dataframes-101/), usually sequential values of time-based events, by using the NumPy `datetime` module.
- [<FontIcon icon="fas fa-globe"/>cftime](https://unidata.github.io/cftime/api.html) provides support for calendars other than the [<FontIcon icon="fa-brands fa-wikipedia-w"/>proleptic Gregorian calendar](https://en.wikipedia.org/wiki/Proleptic_Gregorian_calendar) as well as other time units conforming to the Climate and Forecasting (CF) conventions. It’s used by the [<FontIcon icon="fas fa-globe"/>`xarray`](http://xarray.pydata.org/en/stable/time-series.html) package to provide time-series support.

---

## Further Reading

Since programming with time can be so complicated, there are many resources on the web to help you learn more about it. Fortunately, this is a problem that many people who work in every programming language have thought about, so you can usually find information or tools to help with any problem you may have. Here’s a selected list of articles and videos that I found helpful in writing this tutorial:

- [<FontIcon icon="fa-brands fa-stack-overflow"/>Daylight saving time and time zone best practices](https://stackoverflow.com/a/2532962)
- [<FontIcon icon="fas fa-globe"/>Storing UTC is not a Silver Bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)
- [<FontIcon icon="fas fa-globe"/>How to save datetimes for future events](http://www.creativedeletion.com/2015/03/19/persisting_future_datetimes.html)
- [<FontIcon icon="fa-brands fa-windows"/>Coding Best Practices Using DateTime in the .NET Framework](https://docs.microsoft.com/en-us/previous-versions/dotnet/articles/ms973825(v=msdn.10))
- [<FontIcon icon="fa-brands fa-youtube"/>Computerphile: The Problem with Time & Timezones](https://youtu.be/5wpm-gesOY)
- [<FontIcon icon="fas fa-globe"/>The Complexity of Time Data Programming](https://mojotech.com/blog/the-complexity-of-time-data-programming/)

In addition, Paul Ganssle is a core contributor to CPython and the current maintainer of `dateutil`. His articles and videos are a great resource for Python users:

- [<FontIcon icon="fa-brands fa-youtube"/>Working with Time Zones: Everything You Wish You Didn’t Need to Know](https://youtu,be/rz3D8VG_2TY) (PyCon 2019)
- [<FontIcon icon="fas fa-globe"/>pytz: The Fastest Footgun in the West](https://blog.ganssle.io/articles/2018/03/pytz-fastest-footgun.html)
- [<FontIcon icon="fas fa-globe"/>Stop using utcnow and utcfromtimestamp](https://blog.ganssle.io/articles/2019/11/utcnow.html)
- [<FontIcon icon="fas fa-globe"/>A curious case of non-transitive datetime comparison](https://blog.ganssle.io/articles/2018/02/a-curious-case-datetimes.html)
