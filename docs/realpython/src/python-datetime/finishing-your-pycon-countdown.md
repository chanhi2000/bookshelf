---
lang: en-US
title: "Finishing Your PyCon Countdown"
description: "Article(s) > (7/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (7/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Finishing Your PyCon Countdown"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/finishing-your-pycon-countdown.html
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
  url="https://realpython.com/python-datetime#finishing-your-pycon-countdown"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

You now have enough tools in your belt to finish your PyCon 2021 countdown clock and provide a nice interface to use as well. In this section, you’ll use `relativedelta` to calculate the time remaining until PyCon, develop a function to print the time remaining in a nice format, and show the date of PyCon to the user.

### Using `relativedelta` in Your PyCon Countdown

First, replace the plain subtraction operator with `relativedelta`. With the subtraction operator, your `timedelta` object couldn’t count intervals of time larger than a day. However, `relativedelta` allows you to show the years, months, and days remaining:

```py
1# pyconcd.py
 2
 3from dateutil import parser, tz
 4from dateutil.relativedelta import relativedelta
 5from datetime import datetime
 6
 7PYCON_DATE = parser.parse("May 12, 2021 8:00 AM")
 8PYCON_DATE = PYCON_DATE.replace(tzinfo=tz.gettz("America/New_York"))
 9now = datetime.now(tz=tz.tzlocal())
10
11countdown = relativedelta(PYCON_DATE, now)
12print(f"Countdown to PyCon US 2021: {countdown}")
```

The only change that you made in this code was to replace **line 11** with `countdown = relativedelta(PYCON_DATE, now)`. The output from this script should tell you that PyCon US 2021 will happen in about one year and one month, depending on when you run the script.

However, that output isn’t very pretty since it looks like the signature of `relativedelta()`. You can build up some prettier output by replacing **line 11** in the previous code with the code below:

```py
11def time_amount(time_unit: str, countdown: relativedelta) -> str:
12    t = getattr(countdown, time_unit)
13    return f"{t} {time_unit}" if t != 0 else ""
14
15countdown = relativedelta(PYCON_DATE, now)
16time_units = ["years", "months", "days", "hours", "minutes", "seconds"]
17output = (t for tu in time_units if (t := time_amount(tu, countdown)))
18print("Countdown to PyCon US 2021:", ", ".join(output))
```

This code requires Python 3.8 because it uses the new [**walrus operator**](https://realpython.com/python38-new-features/#the-walrus-in-the-room-assignment-expressions). You can make this script work on older versions of Python by using a traditional [`for` loop](https://realpython.com/python-for-loop/) in place of **line 17**.

In this code, you define `time_amount()`, which takes two arguments, the unit of time and the `relativedelta` instance from which the time units should be retrieved. If the amount of time is not equal to zero, then `time_amount()` returns a string with the amount of time and the time unit. Otherwise, it returns an empty string.

You use `time_amount()` in the [comprehension](https://realpython.com/list-comprehension-python/) on **line 17**. That line creates a [**generator**](https://realpython.com/introduction-to-python-generators/) storing the non-empty strings returned from `time_amount()`. It uses the [walrus operator](https://realpython.com/python38-new-features/#the-walrus-in-the-room-assignment-expressions) to assign the return value of `time_amount()` to `t` and includes `t` only if it is `True`.

Finally, **line 18** prints the final output using [`.join()`](https://realpython.com/python-string-split-concatenate-join/#going-from-a-list-to-a-string-in-python-with-join) on the [generator](https://realpython.com/courses/python-generators/). Next, you’ll take a look at including the PyCon date in the output from your script.

### Showing the PyCon Date in Your PyCon Countdown

[Earlier](#using-strings-to-create-python-datetime-instances), you learned about creating `datetime` instances using `.strptime()`. This method uses a special mini-language within Python to specify how the date string is formatted.

Python `datetime` has an additional method called `.strftime()` that allows you to format a `datetime` instance to a string. In a sense, it’s the reverse operation of parsing using `.strptime()`. You can differentiate between the two methods by remembering that the `p` in `.strptime()` stands for **parse**, and the `f` in `.strftime()` stands for **format**.

In your PyCon countdown, you can use `.strftime()` to print output to let the user know the date on which PyCon US will start. Remember, you can find the formatting codes that you want to use on [strftime.org](https://strftime.org). Now add this code on **line 18** of your PyCon countdown script:

```py
18pycon_date_str = PYCON_DATE.strftime("%A, %B %d, %Y at %H:%M %p %Z")
19print(f"PyCon US 2021 will start on:", pycon_date_str)
20print("Countdown to PyCon US 2021:", ", ".join(output))
```

In this code, **line 18** uses `.strftime()` to create a string representing the starting date of PyCon US 2021. The output includes the weekday, month, day, year, hour, minute, AM or PM, and time zone:

Text

`Wednesday, May 12, 2021 at 08:00 AM EDT
```

On **line 19**, you print this string for the user to see with some explanatory text. The last line prints the amount of time remaining until the PyCon start date. Next, you’ll finish your script to make it easier for other people to reuse.

### Finalizing Your PyCon Countdown

The final step that you’ll want take is to follow Python [best practices](https://realpython.com/tutorials/best-practices/) and put the code that produces output into a [`main()`](https://realpython.com/python-main-function/) function. You can check out the full, final code after applying all these changes:

```py
1# pyconcd.py
 2
 3from dateutil import parser, tz
 4from dateutil.relativedelta import relativedelta
 5from datetime import datetime
 6
 7PYCON_DATE = parser.parse("May 12, 2021 8:00 AM")
 8PYCON_DATE = PYCON_DATE.replace(tzinfo=tz.gettz("America/New_York"))
 9
10def time_amount(time_unit: str, countdown: relativedelta) -> str:
11    t = getattr(countdown, time_unit)
12    return f"{t} {time_unit}" if t != 0 else ""
13
14def main():
15    now = datetime.now(tz=tz.tzlocal())
16    countdown = relativedelta(PYCON_DATE, now)
17    time_units = ["years", "months", "days", "hours", "minutes", "seconds"]
18    output = (t for tu in time_units if (t := time_amount(tu, countdown)))
19    pycon_date_str = PYCON_DATE.strftime("%A, %B %d, %Y at %H:%M %p %Z")
20    print(f"PyCon US 2021 will start on:", pycon_date_str)
21    print("Countdown to PyCon US 2021:", ", ".join(output))
22
23if __name__ == "__main__":
24    main()
```

In this code, you move `print()` and the code used for the generator into `main()`. On **line 23**, you use the **guard clause** to make sure that `main()` only runs when this file is executed as a [script](https://realpython.com/run-python-scripts/). This allows other people to import your code and reuse `PYCON_DATE`, for instance, if they’d like.

Now you can modify this script as much as you want. One neat thing to do might be to allow the user to change the time zone associated with `now` by passing a [command-line argument](https://realpython.com/python-command-line-arguments/). You could also change the `PYCON_DATE` to something closer to home, say [PyCon Africa](https://realpython.com/pycon-africa-2019-recap/) or [EuroPython](https://europython-society.org/).

To get even more excited about PyCon, check out [Real Python at PyCon US 2019](https://realpython.com/real-python-pycon-us/) and [How to Get the Most Out of PyCon](https://realpython.com/pycon-guide/)!
