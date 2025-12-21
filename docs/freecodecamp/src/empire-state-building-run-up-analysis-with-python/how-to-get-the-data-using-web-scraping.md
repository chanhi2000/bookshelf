---
lang: en-US
title: "How to Get the Data using Web Scraping"
description: "Article(s) > (1/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
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
      content: "Article(s) > (1/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:description
      content: "How to Get the Data using Web Scraping"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/empire-state-building-run-up-analysis-with-python/how-to-get-the-data-using-web-scraping.html
date: 2024-12-03
isOriginal: false
author:
  - name: Jose Vicente Nunez
    url : https://freecodecamp.org/news/author/josevnz/
cover: https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance",
  "desc": "A tower running race is a race that you run up the stairs of a building. These happen around the world. I got the chance to participate in the Empire State Run Up in NYC, 2023 edition. The Empire State Building Run-Up (ESBRU)—the world’s first and m...",
  "link": "/freecodecamp.org/empire-state-building-run-up-analysis-with-python/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
  desc="A tower running race is a race that you run up the stairs of a building. These happen around the world. I got the chance to participate in the Empire State Run Up in NYC, 2023 edition. The Empire State Building Run-Up (ESBRU)—the world’s first and m..."
  url="https://freecodecamp.org/news/empire-state-building-run-up-analysis-with-python#heading-how-to-get-the-data-using-web-scraping"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png"/>

The race results site doesn't have an export feature, and I never heard back from their support team to see if there was an alternate way to get the race data. So the only alternative left was to do some web scraping.

The website is pretty basic and only allows scrolling through each record, so I decided to do web scraping to get the results into a format I could use later for data analysis.

---

## The rules of web scraping

There are very 3 simple rules:

1. Rule #1: **Don't do it**. Data flow changes, and your scraper will break the minute you are done getting the data. It will require time and effort. *Lots of it*.
2. Rule #2: **Re-read rule number 1**. If you can't get the data in any another format, then go to rule #3
3. Rule #3: **Choose a good framework to automate what you can** and prepare to do heavy data cleanup (also known as "give me patience for the stuff I can't control, like poorly done HTML and CSS").

I decided to use <VPIcon icon="iconfont icon-selenium"/>[Selenium Web Driver](https://selenium.dev/documentation/webdriver/) as it calls a real browser, like Firefox, to navigate the website. Selenium allows you to automate browser actions while you get the same rendered HTML you see when you navigate the site.

Selenium *is a complex tool* and will require you to spend some time experimenting with what works and what does not. Below is a simple script I wrote to get all the runner's names and race detail links in one run:

```py :collapsed-lines
import re
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.webdriver import WebDriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions
# AthLinks is nice enough to post the race results and their interface is very human-friendly. Not so machine parsing friendly.
RESULTS = "https://www.athlinks.com/event/382111/results/Event/1062909/Course/2407855/Results"
LINKS = {}


def print_links(web_driver: WebDriver, page: int) -> None:
    for a in web_driver.find_elements(By.TAG_NAME, "a"):
        href = a.get_attribute('href')
        if re.search('Bib', href):
            name = a.text.strip().title()
            print(f"Page={page}, {name}={href.strip()}")
            LINKS[name] = href.strip()


def click(level: int) -> None:
    button = WebDriverWait(driver, 20).until(
        expected_conditions.element_to_be_clickable((By.CSS_SELECTOR, f"div:nth-child({level}) > button")))
    driver.execute_script("arguments[0].click();", button)
    sleep(2.5)


options = Options()
options.add_argument("--headless")
driver = webdriver.Firefox(options=options)
driver.get(RESULTS)
sleep(2.5)
print_links(driver, 1)
click(6)
print_links(driver, 2)
click(7)
print_links(driver, 3)
click(7)
print_links(driver, 4)
click(9)
print_links(driver, 5)
click(9)
print_links(driver, 6)
click(7)
print_links(driver, 7)
click(7)
print_links(driver, 8)
print(len(LINKS))
```

The code above is hardly reusable, but it gets the job done by doing the following:

1. Gets the main web-page with the `driver.get(...)` method
2. Then gets the `<a href` tags, and sleeps a little to get a chance to render the HTML
3. Then finds and clicks the `>` (next page) button
4. Does these steps a total of 8 times, as this is how many pages of results are available (each page has 50 runners)

To get the full race results I wrote scraper.py code. The code deals with navigating multiple pages and extracting the data. Demonstration below:

```sh
esru_scraper /home/josevnz/temp/raw_data.csv
# 
# 2023-12-30 14:05:00,987 Saving results to /home/josevnz/temp/raw_data.csv
# 2023-12-30 14:05:53,091 Got 377 racer results
# 2023-12-30 14:05:53,091 Processing BIB: 19, will fetch: https://www.athlinks.com/event/382111/results/Event/1062909/Course/2407855/Bib/19
# 2023-12-30 14:06:02,207 Wrote: name=Wai Ching Soh, position=1, {'name': 'Wai Ching Soh', 'url': 'https://www.athlinks.com/event/382111/results/Event/1062909/Course/2407855/Bib/19', 'overall position': '1', 'gender': 'M', 'age': 29, 'city': 'Kuala Lumpur', 'state': '-', 'country': 'MYS', 'bib': 19, '20th floor position': '1', '20th floor gender position': '1', '20th floor division position': '1', '20th floor pace': '42:30', '20th floor time': '1:42', '65th floor position': '1', '65th floor gender position': '1', '65th floor division position': '1', '65th floor pace': '54:03', '65th floor time': '7:34', 'gender position': '1', 'division position': '1', 'pace': '53:00', 'time': '10:36', 'level': 'Full Course'}
# ...
```

It does just minimal manipulation of the data from the web page. The purpose of this code is just to get the data as quickly as possible before the formatting changes.

Data cannot be used yet as-is - it needs cleaning up. And that's the next step in this article.

