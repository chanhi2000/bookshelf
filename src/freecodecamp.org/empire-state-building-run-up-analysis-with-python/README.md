---
lang: en-US
title: "Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance"
description: "Article(s) > Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance"
icon: fa-brands fa-python
category: 
  - Python
  - Pandas
  - Selenium
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - selenium
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:description
      content: "Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/empire-state-building-run-up-analysis-with-python/
prev: /programming/py-pandas/articles/README.md
date: 2024-05-09
isOriginal: false
author:
  - name: Jose Vicente Nunez
    url : https://freecodecamp.org/news/author/josevnz/
cover: https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Selenium > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/selenium/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance"
  desc="A tower running race is a race that you run up the stairs of a building. These happen around the world. I got the chance to participate in the Empire State Run Up in NYC, 2023 edition. The Empire State Building Run-Up (ESBRU)—the world’s first and m..."
  url="https://freecodecamp.org/news/empire-state-building-run-up-analysis-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png"/>

A [<FontIcon icon="fa-brands fa-wikipedia-w"/>tower running race](https://en.wikipedia.org/wiki/Tower_running) is a race that you run up the stairs of a building. These happen around the world. I got the chance to participate in the Empire State Run Up in NYC, 2023 edition.

> The Empire State Building Run-Up (ESBRU)—the world’s first and most famous tower race—challenges runners from near and far to race up its famed 86 flights—1,576 stairs.
> 
> While visitors can reach the building’s Observatory via elevator in under one minute, the fastest runners have covered the 86 floors by foot in about 10 minutes.
> 
> Leaders in the sport of professional tower-running converge at the Empire State Building in what some consider the ultimate test of endurance.

I got lucky and managed to participate in this race. A few days after finishing the race, I realized that I wanted to know more about my performance, and what I could have done to better.

So naturally I went to the race organizer website and started looking at the numbers. And it was slow and tedious, plus it brought up more issues:

1. Getting the data for offline analysis is difficult. You can see your results and others for comparison, but I found that the tools didn't offer an option to download the raw data, and they were clumsy to use.
2. Most tools out there to analyze race results are paid or do not apply to this type of race. Knowing what to expect reduces your anxiety, allows you to train better, and keeps your expectations in check.

By now you've probably guessed that you can solve the data retrieval issues and post-race analysis using low-cost Open Source tools. This also allows you to apply different techniques to learn about the race and, depending on the quality of the data, even make performance predictions.

This is a very personal piece for me. I will share my race results and give you my biased opinion about the race. 😁

---

## How I Ended Up Running to the Top of the Empire State Building

Many of us have run a regular race at some point in our lives – there are many distances like *5K*, *10K*, *Half* *Marathon*, and *Full* *Marathon*. But there is no way to compare how you will perform while running the stairs all the way to the top of one of the most famous buildings in the world.

If you have ever been at the base of the skyscrapers in New York City and have looked up, you get the idea. Picture yourself running up the stairs, all the way to the top, without stopping.

Getting accepted is tough, because unlike a race like the [<FontIcon icon="fa-brands fa-wikipedia-w"/>New York Marathon](https://en.wikipedia.org/wiki/New_York_City_Marathon), the Empire State Building can only accommodate around 500 runners (or should I say *climbers*?).

Add to that fact that the demand to participate is high, and then you can see that your chances to get in through the lottery are pretty slim (I read somewhere that there are only 50 lottery positions for more than 5,000 applicants).

You can imagine my surprise when I got an email saying that I was selected to participate after trying for 4 years in a row.

I panicked. Have you ever been at the base of the Empire State and looked up? Some days when it's cloudy you can't even see the top of the building.

I wasn't unprepared. But I had to adjust my training routine to be ready for this challenge with a small window of two months, and no experience doing a tower run.

The day of the race came and this is how it went for me:

- It was tough. I knew I had to pace myself, otherwise, the race would have ended for me on floor 20th as opposed to the 86th. You have to focus on a "keep going" mentality, regardless of how tired you feel. And then it is over, just like that.
- You don't sprint, you climb 2 steps at a time at a steady pace, and you use the handrails to take weight off your legs.
- No need to carb load or hydrate too much. If you do well, you will be done in around 30 minutes.
- Nobody is pushing anyone. At least for non-elite racers like me, I was alone for most of the race.
- I got passed and I passed a lot of people who forgot the 'pace yourself' rule. If you sprint, you will be toasted before floor 25, for sure.

I had a blast and got great satisfaction from having this race ticked off my bucket list, the same way I felt after running the [<FontIcon icon="fas fa-globe"/>NYC Marathon](https://results.nyrr.org/event/40/finishers#search=Jose%2520Nunez%2520Zuleta).

It was time now to do a post-race analysis using several of my favorite Open Source tools, which I'll explain in the next section.

---

## What You Need to Follow this Tutorial

Like the race, most of the challenges to writing this application were mental. You only need to break the main problem down into smaller pieces and then tackle each piece at a time:

1. Get the data by scraping the website (very few sites allow you to export race results as a CSV).
2. Clean up the data, normalize it, and make it ready for automatic processing.
3. Ask questions. Then translate those questions into code and tests, ideally using statistics to get reliable answers.
4. Present the results. A UI (Text or Graphic) will do wonders due to its low consumption, but charts speak volumes too.

You should have some experience in a programming language to get the most out of this article. My code is written in Python (you will need version 3.8+) and runs on Linux (I used [<FontIcon icon="fa-brands fa-fedora"/>Fedora 37 distribution](https://fedoraproject.org/)).

In a nutshell, I want to show that it is possible to do all the above with Open Source technologies. Then you can reuse this knowledge for other projects, not just for tower race analyses. 😅

I strongly recommend that you [get the source code (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/tree/main/docs/EmpireStateRunUp) (It is [Open Source (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/tree/main?tab=Apache-2.0-1-ov-file#readme)!). Get your hands dirty, break the scripts, and have fun. You will need Git to clone the repository:

```sh
git clone https://github.com/josevnz/tutorials.git
cd tutorials/docs/EmpireStateRunUp/
python -m ~/virtualenv/EmpireStateRunUp
. ~/virtualenv/EmpireStateRunUp/bin/activate
pip install --upgrade pip
pip install --upgrade build
pip install --upgrade wheel
pip install --editable .
```

Or if you just want to run the code while reading this tutorial (using my latest version from [<FontIcon icon="iconfont icon-pypi"/>Pypi](https://pypi.org/project/EmpireStateRunUp/)):

```sh
python -m ~/virtualenv/EmpireStateRunUp
. ~/virtualenv/EmpireStateRunUp/bin/activate 
pip install --upgrade EmpireStateRunUp
```

We can now move to the next stage:a getting the data.

```component VPCard
{
  "title": "How to Get the Data using Web Scraping",
  "desc": "(1/5) Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-get-the-data-using-web-scraping.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Clean Up the Data",
  "desc": "(2/5) Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-clean-up-the-data.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Analyze the Data",
  "desc": "(3/5) Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-analyze-the-data.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Visualize the results",
  "desc": "(4/5) Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-visualize-the-results.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Run the Applications",
  "desc": "(5/5) Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-run-the-applications.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## What Else Can We Learn?

![NYC was well represented on the event. Yeah, I'm talking about the NYC police department running in full gear, not me on the left](https://freecodecamp.org/news/content/images/2024/05/esru2023_nyc-1.JPG)

Participating in this race was a great experience. The best part was that it fueled my curiosity and led me to write this code to get more interesting facts about the race.

There is plenty more to learn about the tools you just saw in this tutorial:

- There are a lot of public race datasets, and you can use them to apply what you learned here. Just take a look at [this dataset of the New York City Marathon, period 1970-2018 (<FontIcon icon="iconfont icon-github"/>`davidjaimes/nyc-marathon`)](https://github.com/davidjaimes/nyc-marathon). What [other questions (<FontIcon icon="iconfont icon-github"/>`meiguan/nyc2018marathonfinishers`)](https://github.com/meiguan/nyc2018marathonfinishers) you can ask about the data?
- You saw just the tip of what you can do with Textual. I encourage you to explore the [<FontIcon icon="fa-brands fa-python"/>`apps.py` (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/apps.py) module. Take a look at the [example applications (<FontIcon icon="iconfont icon-github"/>`Textualize/textual`)](https://github.com/Textualize/textual/tree/main/examples) as well.
- [<FontIcon icon="iconfont icon-selenium"/>Selenium Web driver](https://selenium.dev/documentation/webdriver/) is not just a tool for web scraping but for automated testing of web applications. It doesn't get better than having your browser perform automated testing for you. It is a big framework, so be prepared to spend time reading and running your tests. I strongly suggest you look [at the examples (<FontIcon icon="iconfont icon-github"/>`SeleniumHQ/seleniumhq.github.io`)](https://github.com/SeleniumHQ/seleniumhq.github.io/tree/trunk/examples/python). Trial an error will give you better results.
- Apply for the [<FontIcon icon="fas fa-globe"/>Empire Estate Run Up](https://esbnyc.com/empire-state-building-run) lottery or run through a charity, if you like this kind of race. Who said [<FontIcon icon="fa-brands fa-wikipedia-w"/>King Kong](https://en.wikipedia.org/wiki/King_Kong) is the only one who could make it to the top?
- Sadly, I'm not in a position to offer you any training advice. Every person is different. I do recommend that you check with your doctor before you participate in a race like this, and get some professional advice from a running coach.
- But most important of all, believe you can do this (the race and writing some tools to process the race data) and have fun while doing it. This is a pre-requisite for any project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Data Analysis with Python – How I Analyzed My Empire State Building Run-Up Performance",
  "desc": "A tower running race is a race that you run up the stairs of a building. These happen around the world. I got the chance to participate in the Empire State Run Up in NYC, 2023 edition. The Empire State Building Run-Up (ESBRU)—the world’s first and m...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/empire-state-building-run-up-analysis-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
