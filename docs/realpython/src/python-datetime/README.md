---
lang: en-US
title: "Using Python datetime to Work With Dates and Times"
description: "Article(s) > Using Python datetime to Work With Dates and Times"
icon: fa-brands fa-python
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
      content: "Article(s) > Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Using Python datetime to Work With Dates and Times"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/
prev: /programming/py/articles/README.md
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
  name="Using Python datetime to Work With Dates and Times"
  desc="Have you ever wondered about working with dates and times in Python? In this tutorial, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times."
  url="https://realpython.com/python-datetime"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: 

<SiteInfo
  name="Using Python's datetime Module - Real Python"
  desc="Have you ever wondered about working with dates and times in Python? In this video course, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times."
  url="https://realpython.com/courses/python-datetime-module"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

:::

Working with dates and times is one of the biggest challenges in programming. Between dealing with time zones, daylight saving time, and different written date formats, it can be tough to keep track of which days and times you’re referencing. Fortunately, the built-in Python **`datetime`** module can help you manage the complex nature of dates and times.

::: info In this tutorial, you’ll learn

- Why programming with **dates and times** is such a challenge
- Which functions are available in the **Python `datetime`** module
- How to **print or read a date and time** in a specific format
- How to do **arithmetic** with dates and times

:::

Plus, you’re going to develop a neat application to count down the time remaining until the next PyCon US!

Let’s get started!

```component VPCard
{
  "title": "Programming With Dates and Times",
  "desc": "(1/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/programming-with-dates-and-times.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using the Python datetime Module",
  "desc": "(2/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/using-the-python-datetime-module.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Starting Your PyCon Countdown",
  "desc": "(3/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/starting-your-pycon-countdown.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Working With Time Zones",
  "desc": "(4/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/working-with-time-zones.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Improving Your PyCon Countdown",
  "desc": "(5/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/improving-your-pycon-countdown.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Doing Arithmetic With Python datetime",
  "desc": "(6/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/doing-arithmetic-with-python-datetime.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Finishing Your PyCon Countdown",
  "desc": "(7/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/finishing-your-pycon-countdown.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Alternatives to Python datetime and dateutil",
  "desc": "(8/8) Using Python datetime to Work With Dates and Times",
  "link": "/realpython/python-datetime/alternatives-to-python-datetime-and-dateutil.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

In this tutorial, you learned about programming with dates and times and why it often leads to errors and confusion. You also learned about the Python `datetime` and `dateutil` modules as well as how to work with time zones in your code.

::: info Now you can

- **Store** dates in a good, future-proof format in your programs
- **Create** Python `datetime` instances with formatted strings
- **Add** time zone information to `datetime` instances with `dateutil`
- **Perform** arithmetic operations with `datetime` instances using `relativedelta`

:::

In the end, you created a script that counts down the time remaining until the next PyCon US so you can get excited for the biggest Python gathering around. Dates and times can be tricky, but with these Python tools in your arsenal, you’re ready to tackle the toughest problems!

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Using Python's datetime Module - Real Python"
  desc="Have you ever wondered about working with dates and times in Python? In this video course, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times."
  url="https://realpython.com/courses/python-datetime-module"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Python datetime to Work With Dates and Times",
  "desc": "Have you ever wondered about working with dates and times in Python? In this tutorial, you'll learn all about the built-in Python datetime library. You'll also learn about how to manage time zones and daylight saving time, and how to do accurate arithmetic on dates and times.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
