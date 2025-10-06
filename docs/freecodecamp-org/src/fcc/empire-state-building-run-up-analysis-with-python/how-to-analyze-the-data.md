---
lang: en-US
title: "How to Analyze the Data"
description: "Article(s) > (3/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
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
      content: "Article(s) > (3/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:description
      content: "How to Analyze the Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/empire-state-building-run-up-analysis-with-python/how-to-analyze-the-data.html
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
  url="https://freecodecamp.org/news/empire-state-building-run-up-analysis-with-python#heading-how-to-analyze-the-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png"/>

Once the data is clean (or as clean as we can get it), it's time to move into running some numbers. Before writing more code, I took a piece of paper and asked myself a few questions about the race:

- There are any interesting buckets/ clusters for age, race time, wave, and country participation?
- A histogram for Age and Country would be nice to see
- Describe the data! (median, percentiles, and so on)
- Find outliers. [<VPIcon icon="fas fa-globe"/>There is a way to apply Z-scores](https://investopedia.com/terms/z/zscore.asp) here?

I decided to use [<VPIcon icon="iconfont icon-pandas"/>Python Pandas](https://pandas.pydata.org/) for this task. This Open Source framework has an arsenal of tools to manipulate the data and to calculate statistics. It also has good tools to perform additional cleanup if needed.

So how does Pandas work?

---

## Crash Course on Pandas

I strongly recommend that you check out [<VPIcon icon="iconfont icon-pandas"/>10 minutes to pandas](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html) if you are not familiar with the tool. For my DataFrame, I made the BIB an index as it is unique, and it has no special value for aggregation functions - but the 'id' attribute is unique.

It's important to note that also at this stage I needed to normalize the data, which I'll explain shortly:

```py :collapsed-lines
# Omitted imports and Enum declarations as they were shown early on. 
# Check the source code for 'data.py' for more details
def load_data(data_file: Path = None, remove_dnf: bool = True) -> DataFrame:
    """
    * The code removes by default the DNF runners to avoid distortion on the results.
    * Replace unknown/ nan values with the median, to make analysis easier and avoid distortions
    """
    if data_file:
        def_file = data_file
    else:
        def_file = RACE_RESULTS_FULL_LEVEL
    df = pandas.read_csv(
        def_file
    )
    for time_field in [
        RaceFields.PACE.value,
        RaceFields.TIME.value,
        RaceFields.TWENTY_FLOOR_PACE.value,
        RaceFields.TWENTY_FLOOR_TIME.value,
        RaceFields.SIXTY_FIVE_FLOOR_PACE.value,
        RaceFields.SIXTY_FIVE_FLOOR_TIME.value
    ]:
        try:
            df[time_field] = pandas.to_timedelta(df[time_field])
        except ValueError as ve:
            raise ValueError(f'{time_field}={df[time_field]}', ve)
    df['finishtimestamp'] = BASE_RACE_DATETIME + df[RaceFields.TIME.value]
    if remove_dnf:
        df.drop(df[df.level == 'DNF'].index, inplace=True)

    # Normalize Age
    median_age = df[RaceFields.AGE.value].median()
    df[RaceFields.AGE.value].fillna(median_age, inplace=True)
    df[RaceFields.AGE.value] = df[RaceFields.AGE.value].astype(int)

    # Normalize state and city
    df.replace({RaceFields.STATE.value: {'-': ''}}, inplace=True)
    df[RaceFields.STATE.value].fillna('', inplace=True)
    df[RaceFields.CITY.value].fillna('', inplace=True)

    # Normalize overall position, 3 levels
    median_pos = df[RaceFields.OVERALL_POSITION.value].median()
    df[RaceFields.OVERALL_POSITION.value].fillna(median_pos, inplace=True)
    df[RaceFields.OVERALL_POSITION.value] = df[RaceFields.OVERALL_POSITION.value].astype(int)
    median_pos = df[RaceFields.TWENTY_FLOOR_POSITION.value].median()
    df[RaceFields.TWENTY_FLOOR_POSITION.value].fillna(median_pos, inplace=True)
    df[RaceFields.TWENTY_FLOOR_POSITION.value] = df[RaceFields.TWENTY_FLOOR_POSITION.value].astype(int)
    median_pos = df[RaceFields.SIXTY_FLOOR_POSITION.value].median()
    df[RaceFields.SIXTY_FLOOR_POSITION.value].fillna(median_pos, inplace=True)
    df[RaceFields.SIXTY_FLOOR_POSITION.value] = df[RaceFields.SIXTY_FLOOR_POSITION.value].astype(int)

    # Normalize gender position, 3 levels
    median_gender_pos = df[RaceFields.GENDER_POSITION.value].median()
    df[RaceFields.GENDER_POSITION.value].fillna(median_gender_pos, inplace=True)
    df[RaceFields.GENDER_POSITION.value] = df[RaceFields.GENDER_POSITION.value].astype(int)
    median_gender_pos = df[RaceFields.TWENTY_FLOOR_GENDER_POSITION.value].median()
    df[RaceFields.TWENTY_FLOOR_GENDER_POSITION.value].fillna(median_gender_pos, inplace=True)
    df[RaceFields.TWENTY_FLOOR_GENDER_POSITION.value] = df[RaceFields.TWENTY_FLOOR_GENDER_POSITION.value].astype(int)
    median_gender_pos = df[RaceFields.SIXTY_FIVE_FLOOR_GENDER_POSITION.value].median()
    df[RaceFields.SIXTY_FIVE_FLOOR_GENDER_POSITION.value].fillna(median_gender_pos, inplace=True)
    df[RaceFields.SIXTY_FIVE_FLOOR_GENDER_POSITION.value] = df[
        RaceFields.SIXTY_FIVE_FLOOR_GENDER_POSITION.value].astype(int)

    # Normalize age/ division position, 3 levels
    median_div_pos = df[RaceFields.DIVISION_POSITION.value].median()
    df[RaceFields.DIVISION_POSITION.value].fillna(median_div_pos, inplace=True)
    df[RaceFields.DIVISION_POSITION.value] = df[RaceFields.DIVISION_POSITION.value].astype(int)
    median_div_pos = df[RaceFields.TWENTY_FLOOR_DIVISION_POSITION.value].median()
    df[RaceFields.TWENTY_FLOOR_DIVISION_POSITION.value].fillna(median_div_pos, inplace=True)
    df[RaceFields.TWENTY_FLOOR_DIVISION_POSITION.value] = df[RaceFields.TWENTY_FLOOR_DIVISION_POSITION.value].astype(int)
    median_div_pos = df[RaceFields.SIXTY_FIVE_FLOOR_DIVISION_POSITION.value].median()
    df[RaceFields.SIXTY_FIVE_FLOOR_DIVISION_POSITION.value].fillna(median_div_pos, inplace=True)
    df[RaceFields.SIXTY_FIVE_FLOOR_DIVISION_POSITION.value] = df[
        RaceFields.SIXTY_FIVE_FLOOR_DIVISION_POSITION.value].astype(int)

    # Normalize 65th floor pace and time
    sixty_five_floor_pace_median = df[RaceFields.SIXTY_FIVE_FLOOR_PACE.value].median()
    sixty_five_floor_time_median = df[RaceFields.SIXTY_FIVE_FLOOR_TIME.value].median()
    df[RaceFields.SIXTY_FIVE_FLOOR_PACE.value].fillna(sixty_five_floor_pace_median, inplace=True)
    df[RaceFields.SIXTY_FIVE_FLOOR_TIME.value].fillna(sixty_five_floor_time_median, inplace=True)

    # Normalize BIB and make it the index
    df[RaceFields.BIB.value] = df[RaceFields.BIB.value].astype(int)
    df.set_index(RaceFields.BIB.value, inplace=True)

    # URL was useful during scraping, not needed for analysis
    df.drop([RaceFields.URL.value], axis=1, inplace=True)

    return df
```

I do a few things here after giving back the converted CSV back to the user, as a DataFrame:

- Replaced "Not a Number" (nan) values with the median to avoid affecting the aggregation results. This makes analysis easier.
- Dropped rows for runners that did not reach floor 86. Makes the analysis easier, and there are too few of them.
- Convert some string columns into native data types like integers, timestamps
- A few entries did not have the gender defined. That affected other fields like 'gender_position'. To avoid distortions, these were filled with the median.

In the end, this is how my [<VPIcon icon="iconfont icon-pandas"/>DataFrame](https://pandas.pydata.org/pandas-docs/stable/user_guide/dsintro.html) loading looked like:

```sh
python3
# 
# Python 3.11.6 (main, Oct  3 2023, 00:00:00) [GCC 12.3.1 20230508 (Red Hat 12.3.1-1)] on linux
# Type "help", "copyright", "credits" or "license" for more information.
```

And the resulting [<VPIcon icon="iconfont icon-pandas"/>DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html) instance:

```sh
# >>> # Using custom load_data function that returns a Panda DataFrame
# >>> from empirestaterunup.data import load_data
# >>> load_data('empirestaterunup/results-full-level-2023.csv')
#                     name  overall position            time gender  gender position  age  ...  65th floor division position 65th floor pace 65th floor time       wave        level     finishtimestamp
# bib                                                                                      ...                                                                                                          
# 19         Wai Ching Soh                 1 0 days 00:10:36      M                1   29  ...                             1 0 days 00:54:03 0 days 00:07:34  ELITE MEN  Full Course 2023-09-04 20:10:36
# 22        Ryoji Watanabe                 2 0 days 00:10:52      M                2   40  ...                             1 0 days 00:54:31 0 days 00:07:38  ELITE MEN  Full Course 2023-09-04 20:10:52
# 16            Fabio Ruga                 3 0 days 00:11:14      M                3   42  ...                             2 0 days 00:57:09 0 days 00:08:00  ELITE MEN  Full Course 2023-09-04 20:11:14
# 11        Emanuele Manzi                 4 0 days 00:11:28      M                4   45  ...                             3 0 days 00:59:17 0 days 00:08:18  ELITE MEN  Full Course 2023-09-04 20:11:28
# 249             Alex Cyr                 5 0 days 00:11:52      M                5   28  ...                             2 0 days 01:01:19 0 days 00:08:35   SPONSORS  Full Course 2023-09-04 20:11:52
# ..                   ...               ...             ...    ...              ...  ...  ...                           ...             ...             ...        ...          ...                 ...
# 555     Caroline Edwards               372 0 days 00:55:17      F              143   47  ...                            39 0 days 04:57:23 0 days 00:41:38  GENERAL 2  Full Course 2023-09-04 20:55:17
# 557        Sarah Preston               373 0 days 00:55:22      F              144   34  ...                            41 0 days 04:58:20 0 days 00:41:46  GENERAL 2  Full Course 2023-09-04 20:55:22
# 544  Christopher Winkler               374 0 days 01:00:10      M              228   40  ...                            18 0 days 01:49:53 0 days 00:15:23  GENERAL 2  Full Course 2023-09-04 21:00:10
# 545          Jay Winkler               375 0 days 01:05:19      U               93   33  ...                            18 0 days 05:28:56 0 days 00:46:03  GENERAL 2  Full Course 2023-09-04 21:05:19
# 646           Dana Zajko               376 0 days 01:06:48      F              145   38  ...                            42 0 days 05:15:14 0 days 00:44:08  GENERAL 3  Full Course 2023-09-04 21:06:48
# 
# [375 rows x 24 columns]
```

Once the data was loaded, I was able to start asking questions. For example, to detect the outliers I used a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Z-score](https://en.wikipedia.org/wiki/Standard_score).

All the analysis logic [was kept together on a single module called 'analyze' (<VPIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/analyze.py), separate from presentation, data loading, or reports, to promote reuse.

```py
from pandas import DataFrame
import numpy as np
def get_zscore(df: DataFrame, column: str):
    filtered = df[column]
    return filtered.sub(filtered.mean()).div(filtered.std(ddof=0))

def get_outliers(df: DataFrame, column: str, std_threshold: int = 3) -> DataFrame:
    """
    Use the z-score, anything further away than 3 standard deviations is considered an outlier.
    """
    filtered_df = df[column]
    z_scores = get_zscore(df=df, column=column)
    is_over = np.abs(z_scores) > std_threshold
    return filtered_df[is_over]
```

Also, it is very simple to get common statistics just by calling `describe` on our data:

```py
from pandas import DataFrame
def get_5_number(criteria: str, data: DataFrame) -> DataFrame:
    return data[criteria].describe()
```

For example, let me show you summary metrics for different aspects of the race:

```py :collapsed-lines
from empirestaterunup.data import load_data
df = load_data('empirestaterunup/results-full-level-2023.csv')
from empirestaterunup.analyze import get_5_number
from empirestaterunup.analyze import SUMMARY_METRICS
print(SUMMARY_METRICS)
#
# ('age', 'time', 'pace')
for key in SUMMARY_METRICS:
    ndf = get_5_number(criteria=key, data=df)
    print(ndf)
# 
# count    375.000000
# mean      41.309333
# std       11.735968
# min       11.000000
# 25%       33.000000
# 50%       40.000000
# 75%       49.000000
# max       78.000000
# Name: age, dtype: float64
# count                          375
# mean     0 days 00:23:03.461333333
# std      0 days 00:08:06.313479117
# min                0 days 00:10:36
# 25%                0 days 00:18:09
# 50%                0 days 00:21:20
# 75%         0 days 00:25:13.500000
# max                0 days 01:06:48
# Name: time, dtype: object
# count                          375
# mean     0 days 01:55:17.306666666
# std      0 days 00:40:31.567395588
# min                0 days 00:53:00
# 25%                0 days 01:30:45
# 50%                0 days 01:46:40
# 75%         0 days 02:06:07.500000
# max                0 days 05:34:00
# Name: pace, dtype: object
```

Making sure data web scraping, data loading, and analytics work well is a must. Testing is an integral part of writing code, so I kept adding more of it and went back to writing unit tests.

Let's check how to test our code (feel free to skip the next section if you are familiar with unit testing)

---

## Testing, testing, and after that...more testing

I assume you are familiar with writing small, self-contained pieces of code to test your code. These are called unit tests.

::: info From Python docs (<code>docs.python.org</code>)

> The unittest unit testing framework was originally inspired by JUnit and has a similar flavor as major unit testing frameworks in other languages. It supports test automation, sharing of setup and shutdown code for tests, aggregation of tests into collections, and independence of the tests from the reporting framework.

<SiteInfo
  name="unittest — Unit testing framework"
  desc="Source code: Lib/unittest/__init__.py(If you are already familiar with the basic concepts of testing, you might want to skip to the list of assert methods.) The unittest unit testing framework was ..."
  url="https://docs.python.org/3/library/unittest.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3.13/_images/social_previews/summary_library_unittest_7f61b5f1.png"/>

:::

I tried to have a simple [<VPIcon icon="fa-brands fa-python"/>unit test](https://docs.python.org/3/library/unittest.html) for every method I wrote on the code. This saved me lots of headaches down the road. As I refactored the code, I found better ways to get the same results, producing correct numbers.

A Unit test in this context is a class that extends `unittest.TestCase`. Each method that starts with `test_` is a test that must pass several assertions.

For example, to make sure the analytics worked as expected, I wrote a test module called `test_analyze`:

```py
# Not all test cases are shown, please check the full code of 'test/test_analyze.py'
import unittest
from pandas import DataFrame
from empirestaterunup.analyze import get_country_counts
from empirestaterunup.data import load_data

class AnalyzeTestCase(unittest.TestCase):
    df: DataFrame

    @classmethod
    def setUpClass(cls) -> None:
        cls.df = load_data()

    def test_get_country_counts(self):
        country_counts, min_countries, max_countries = get_country_counts(df=AnalyzeTestCase.df)
        self.assertIsNotNone(country_counts)
        self.assertEqual(2, country_counts['JPN'])
        self.assertIsNotNone(min_countries)
        self.assertEqual(3, min_countries.shape[0])
        self.assertIsNotNone(max_countries)
        self.assertEqual(14, max_countries.shape[0])


if __name__ == '__main__':
    unittest.main()
```

So far we got the data, and made sure [it meets the expectations (<VPIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/test/test_data.py). I wrote [separate tests (<VPIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/test/test_analyze.py) for the analytics code and also for the scraper.

Testing the user interface requires a different approach, as it needs to simulate clicks and wait for screen changes. Sometimes failures are easy to spot (like crashes), but sometimes issues are much more subtle (did we get the right data displayed?).

Will revisit this particular testing modality after we introduce first how to visualize the results.
