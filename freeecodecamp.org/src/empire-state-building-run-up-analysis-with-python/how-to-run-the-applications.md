---
lang: en-US
title: "How to Run the Applications"
description: "Article(s) > (5/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
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
      content: "Article(s) > (5/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:description
      content: "How to Run the Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-run-the-applications.html
next: /freecodecamp.org/empire-state-building-run-up-analysis-with-python/README.md#what-else-can-we-learn
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
  url="https://freecodecamp.org/news/empire-state-building-run-up-analysis-with-python#heading-how-to-run-the-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png"/>

Finally, it's time to get familiar with mini applications (you can see an animated [demonstration of the TUI applications here (<VPIcon icon="iconfont icon-github`josevnz/tutorials`"/>)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/EmpireStateRunUp.svg)).

---

## Browsing Through the Data

The `esru_browser` is a simple browser that lets you navigate through the raw race data.

```sh
esru_browser
```

The application shows all the race details for every Runner in a table that allows sorting by column.

![Raw runners data in a table<br/>The esru_browser window shows all runners' results. Here you can sort, search for runners, and click to get more details](https://freecodecamp.org/news/content/images/2024/05/esru_browser.png)

And the command palette allows searching for runners by name (it's basically a search bar with fuzzy logic):

![`race_runners_2023-12-31T18_35_53_558956.svg`, searching for runners by name](https://freecodecamp.org/news/content/images/2024/05/race_runners_2023-12-31T18_35_53_558956.svg)

---

## Summary Reports

To get insights about racer behavior, you need some summary reports (as opposed to drilling down into each racer's details).

This application provides details about the following:

- Count, standard deviation, mean, min, max 45%, 50%, and 75% for age, time, and pace
- Group and count distribution for Age, Wave, and Gender

```sh
esru_numbers
```

Some interesting facts about the race:

- The average age was 41 years old, and 40 years old was the largest age group.
- The majority number of people belonged to the 'BLACK WAVE'.
- The majority of the people finished the race in between 20 and 30 minutes.
- The youngest runner was 11 years old, and the oldest was 78.

![Statistics of interest, like average age, wave they belong, finishing time<br/>`esru_numbers` gives a bird's eye view of all the racers, categorized by buckets](https://freecodecamp.org/news/content/images/2024/05/esru_numbers.svg)

---

## Finding Outliers

This application uses the *Z-score* to find the outliers for several metrics for this race:

```sh
esru_outlier
```

![Table with outliers details<br/>the `esru_outlier` main screen shows you racers that did not follow regular patterns](https://freecodecamp.org/news/content/images/2024/05/esru_outlier-1.svg)

Because these results drill down to the BIB number, you can click on a row and get more details about a runner:

![Outlier racer details, including BIB<br/>And you can get details for each outlier. Yes, code is reusable and is the same to show details for any runner](https://freecodecamp.org/news/content/images/2024/05/esru_outlier-2.svg)

Textual has excellent support for rendering Markdown as well as programming languages. Take a look at the code to see for yourself.

---

## A Few Plot Graphics For You

The [`esru_plot` (<VPIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/apps.py) application offers a few plot graphics to help you visualize the data. Inside, the class `Plotter` does all the heavy lifting

### Age plots

The program can generate two flavors for the same data, one is a Box diagram:

![Age plot, Pie chart<br/>The age box diagram we saw before](https://freecodecamp.org/news/content/images/2024/05/esru_age_box_plot-1.png)

The second is a regular histogram:

![Age histogram<br/>Age histogram shows the same as the box diagram but the buckets are more visible. Same data, many ways to explain the racer demographics.](https://freecodecamp.org/news/content/images/2024/05/age_histogram.png)

You can see from both graphics that the group age with the most participants is the 40-45-year-old bracket and the outliers are in the 10-20 and 70-80 year old groups.

### Participants per country plot

![Histogram<br/>This plot shows all the countries with the number of participants, with the best runner from each.](https://freecodecamp.org/news/content/images/2024/05/participants_per_country.png)

No surprises here: the overwhelming majority of racers come from the United States, followed by Mexico. Interestingly, the winner of the 2023 race is from Malaysia, with only 2 runners participating.

### Gender distribution

![Gender pie<br/>The gender distribution pie showing the best racer for each category](https://freecodecamp.org/news/content/images/2024/05/gender_distribution.png)

The majority of the runners identified themselves as Males, followed by Females.
