---
lang: en-US
title: "Programming With Dates and Times"
description: "Article(s) > (1/8) Using Python datetime to Work With Dates and Times"
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
      content: "Article(s) > (1/8) Using Python datetime to Work With Dates and Times"
    - property: og:description
      content: "Programming With Dates and Times"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-datetime/programming-with-dates-and-times.html
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
  url="https://realpython.com/python-datetime#programming-with-dates-and-times"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-datetime-With-Examples_Watermarked.2676ca0aacf2.jpg"/>

If you’ve ever worked on software that needed to keep track of times across several geographic areas, then you probably have a sense of why programming with time can be such a pain. The fundamental disconnect is that computer programs prefer events that are perfectly ordered and regular, but the way in which most humans use and refer to time is highly irregular.

::: note

If you want to learn more about why time can be so complicated to deal with, then there are many great resources available on the web. Here are a few good places to start:

- [<FontIcon icon="fa-brands fa-youtube"/>Computerphile: The Problem With Time & Timezones](https://youtu.be/-5wpm-gesOY)
- [<FontIcon icon="fa-brands fa-youtube"/>Working With Time Zones: Everything You Wish You Didn’t Need to Know](https://youtu.be/rz3D8VG_2TY)
- [<FontIcon icon="fas fa-globe"/>The Complexity of Time Data Programming](https://mojotech.com/blog/the-complexity-of-time-data-programming/)

:::

One great example of this irregularity is [<FontIcon icon="fa-brands fa-wikipedia-w"/>daylight saving time](https://en.wikipedia.org/wiki/Daylight_saving_time). In the United States and Canada, clocks are set forward by one hour on the second Sunday in March and set back by one hour on the first Sunday in November. However, this has only been the case [<FontIcon icon="fas fa-globe"/>since 2007](https://nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst). Prior to 2007, clocks were set forward on the first Sunday in April and set back on the last Sunday in October.

Things get even more complicated when you consider [<FontIcon icon="fa-brands fa-wikipedia-w"/>time zones](https://en.wikipedia.org/wiki/Time_zone). Ideally, time zone boundaries would follow lines of longitude exactly. However, for historical and political reasons, time zone lines are rarely straight. Often, areas that are separated by large distances find themselves in the same time zone, and adjacent areas are in different time zones. There are some time zones out there with [<FontIcon icon="fas fa-globe"/>pretty funky shapes](https://upload.wikimedia.org/wikipedia/commons/8/88/World_Time_Zones_Map.png).

---

## How Computers Count Time

Nearly all computers count time from an instant called the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Unix epoch](https://en.wikipedia.org/wiki/Unix_time). This occurred on January 1, 1970, at 00:00:00 UTC. UTC stands for [<FontIcon icon="fa-brands fa-wikipedia-w"/>Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) and refers to the time at a longitude of 0°. UTC is often also called [<FontIcon icon="fa-brands fa-wikipedia-w"/>Greenwich Mean Time](https://en.wikipedia.org/wiki/Greenwich_Mean_Time), or GMT. UTC is not adjusted for daylight saving time, so it consistently keeps twenty-four hours in every day.

By definition, Unix time elapses at the same rate as UTC, so a one-second step in UTC corresponds to a one-second step in Unix time. You can usually figure out the date and time in UTC of any given instant since January 1, 1970, by counting the number of seconds since the Unix epoch, with the exception of [<FontIcon icon="fa-brands fa-youtube"/>leap seconds](https://youtu.be/Uqjg8Kk1HXo). Leap seconds are occasionally added to UTC to account for the slowing of the Earth’s rotation but are not added to Unix time.

::: note

There’s an interesting bug associated with Unix time. Since many older operating systems are 32-bit, they store the Unix time in a 32-bit signed integer.

This means that at 03:14:07 on January 19, 2038, the integer will overflow, resulting in what’s known as the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Year 2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem), or Y2038. Similar to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Y2K problem](https://en.wikipedia.org/wiki/Year_2000_problem), Y2038 will need to be corrected to avoid catastrophic consequences for critical systems.

:::

Nearly all programming languages, including [<FontIcon icon="fa-brands fa-python"/>Python](https://docs.python.org/3/library/time.html), incorporate the concept of Unix time. Python’s standard library includes a module called `time` that can print the number of seconds since the Unix epoch:

```py
import time
time.time()
# 
# 1579718137.550164
```

In this example, you [<FontIcon icon="fas fa-globe"/>import](https://realpython.com/lessons/import-statement/) the [**`time` module**](/realpython.com/python-time-module.md) and execute [<FontIcon icon="fa-brands fa-python"/>`time()`](https://docs.python.org/3/library/time.html#time.time) to print the Unix time, or number of seconds (excluding leap seconds) since the epoch.

In addition to Unix time, computers need a way to convey time information to users. As you saw in the last example, Unix time is nearly impossible for a human to parse. Instead, Unix time is typically converted to UTC, which can then be converted into a local time using **time zone offsets**.

The **Internet Assigned Numbers Authority (IANA)** maintains a [<FontIcon icon="fas fa-globe"/>database](https://iana.org/time-zones) of all of the values of time zone offsets. IANA also releases regular updates that include any changes in time zone offsets. This database is often included with your operating system, although certain applications may include an updated copy.

The database contains a copy of all the designated time zones and how many hours and minutes they’re offset from UTC. So, during the winter, when daylight saving time is not in effect, the US Eastern time zone has an offset of -05:00, or negative five hours from UTC. Other regions have different offsets, which may not be integer hours. The UTC offset for Nepal, for example, is +05:45, or positive five hours and forty-five minutes from UTC.

---

## How Standard Dates Can Be Reported

Unix time is how computers count time, but it would be incredibly inefficient for humans to determine the time by calculating the number of seconds from an arbitrary date. Instead, we work in terms of years, months, days, and so forth. But even with these conventions in place, another layer of complexity stems from the fact that different languages and cultures have different ways of writing the date.

For instance, in the United States, dates are usually written starting with the month, then the day, then the year. This means that January 31, 2020, is written as **01-31-2020**. This closely matches the long-form written version of the date.

However, most of Europe and many other areas write the date starting with the day, then the month, then the year. This means that January 31, 2020, is written as **31-01-2020**. These differences can cause all sorts of confusion when communicating across cultures.

To help avoid communication mistakes, the International Organization for Standardization (ISO) developed [<FontIcon icon="fa-brands fa-wikipedia-w"/>ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). This standard specifies that all dates should be written in order of most-to-least-significant data. This means the format is year, month, day, hour, minute, and second:

```plaintext
YYYY-MM-DD HH:MM:SS
```

In this example, `YYYY` represents a four-digit year, and `MM` and `DD` are the two-digit month and day, starting with a zero if necessary. After that, `HH`, `MM`, and `SS` represent the two-digit hours, minutes, and seconds, starting with a zero if necessary.

The advantage of this format is that the date can be represented with no ambiguity. Dates written as `DD-MM-YYYY` or `MM-DD-YYYY` can be misinterpreted if the day is a valid month number. You’ll see a little [later on](/realpython.com/python-datetime/using-the-python-datetime-module.md#using-strings-to-create-python-datetime-instances) how you can use the ISO 8601 format with Python `datetime`.

---

## How Time Should Be Stored in Your Program

Most developers who have worked with time have heard the advice to convert local time to UTC and store that value for later reference. In many cases, especially when you’re storing dates from the past, this is enough information to do any necessary arithmetic.

However, a problem can happen if a user of your program inputs a future date in their local time. Time zone and daylight saving time rules change fairly frequently, as you saw earlier with the 2007 change in daylight saving time for the United States and Canada. If the time zone rules for your user’s location change before the future date that they inputted, then UTC won’t provide enough information to convert back to the correct local time.

::: note

There are a number of excellent resources available to help you determine the appropriate way to store time data in your application. Here are a few places to start:

- [<FontIcon icon="fa-brands fa-stack-overflow"/>Daylight saving time and time zone best practices](https://stackoverflow.com/a/2532962)
- [<FontIcon icon="fas fa-globe"/>Storing UTC is not a Silver Bullet](https://codeblog.jonskeet.uk/2019/03/27/storing-utc-is-not-a-silver-bullet/)
- [<FontIcon icon="fas fa-globe"/>How to save datetimes for future events](http://creativedeletion.com/2015/03/19/persisting_future_datetimes.html)
- [<FontIcon icon="fa-brands fa-microsoft"/>Coding Best Practices Using DateTime in the .NET Framework](https://docs.microsoft.com/en-us/previous-versions/dotnet/articles/ms973825(v=msdn.10))

:::

In this case, you need to store the local time, including the time zone, that the user inputted as well as the version of the IANA time zone database that was in effect when the user saved the time. This way, you’ll always be able to convert the local time to UTC. However, this approach won’t always allow you to convert UTC to the correct local time.
