---
lang: en-US
title: "Starting Your PyCon Countdown"
description: "Article(s) > (3/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (3/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Starting Your PyCon Countdown"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/starting-your-pycon-countdown.html
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
  url="https://realpython.com/python-datetime#starting-your-pycon-countdown"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

Now you have enough information to start working on a countdown clock for next year’s [<FontIcon icon="fas fa-globe"/>PyCon US](https://us.pycon.org/)! PyCon US 2021 will start on May 12, 2021 in Pittsburgh, PA. With the 2020 event [<FontIcon icon="fas fa-globe"/>having been canceled](https://pycon.blogspot.com/2020/03/pycon-us-2020-in-pittsburgh.html), many Pythonistas are extra excited for next year’s gathering. This is a great way to keep track of how long you’ll need to wait and boost your `datetime` skills at the same time!

To get started, create a file called <FontIcon icon="fa-brands fa-python"/>`pyconcd.py` and add this code:

```py title="pyconcd.py"
from datetime import datetime

PYCON_DATE = datetime(year=2021, month=5, day=12, hour=8)
countdown = PYCON_DATE - datetime.now()
print(f"Countdown to PyCon US 2021: {countdown}")
```

In this code, you import `datetime` from `datetime` and define a constant, `PYCON_DATE`, that stores the date of the next PyCon US. You don’t expect the date of PyCon to change, so you name the variable in all caps to indicate that it’s a constant.

Next, you compute the difference between `datetime.now()`, which is the [**current time**](/realpython.com/python-get-current-time.md), and `PYCON_DATE`. Taking the difference between two `datetime` instances returns a [<FontIcon icon="fa-brands fa-python"/>`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#timedelta-objects) instance.

`timedelta` instances represent the change in time between two `datetime` instances. The **delta** in the name is a reference to the Greek letter delta, which is used in science and engineering to mean a change. You’ll learn more [**later**](/realpython.com/python-datetime/doing-arithmetic-with-python-datetime.md) about how to use `timedelta` for more general arithmetic operations.

Finally the printed output, as of April 9, 2020 at a little before 9:30 PM is:

```plaintext title="output"
Countdown to PyCon US 2021: 397 days, 10:35:32.139350
```

Only 397 days until PyCon US 2021! This output is a little clunky, so [**later on**](/realpython.com/python-datetime/finishing-your-pycon-countdown.md) you’ll see how you can improve the formatting. If you run this script on a different day, you’ll get a different output. If you run the script after May 12, 2021 at 8:00 AM, you’ll get a negative amount of time remaining!
