---
lang: en-US
title: "How to Clean Up the Data"
description: "Article(s) > (2/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
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
      content: "Article(s) > (2/5) Data Analysis with Python - How I Analyzed My Empire State Building Run-Up Performance"
    - property: og:description
      content: "How to Clean Up the Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/empire-state-building-run-up-analysis-with-python/how-to-clean-up-the-data.html
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
  url="https://freecodecamp.org/news/empire-state-building-run-up-analysis-with-python#heading-how-to-clean-up-the-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/empire_state_runup-1.png"/>

[Getting the data (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/test/raw_data.csv) is just the first battle of many more to come. [<FontIcon icon="fas fa-globe"/>You will notice inconsistencies on the data](https://en.wikibooks.org/wiki/Statistics/Data_Analysis/Data_Cleaning) and missing values. In order to make your numeric results good, you need to make assumptions.

Luckily for me, the dataset is very small (375+ records, one for each runner) so I was able to come up with a few rules to tidy up the [data file (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/results-first-level-2023.csv) I was going to use during my analysis.

I also supplemented my data with another data set that has the [3-digit country codes (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/country_codes.csv) as well as other details, for a nicer presentation.

The `data_normalizer.raw_read(raw_file: Path) -> Iterable[Dict[str, Any]]` method does the heavy work of fixing the data for inconsistencies before saving into a CSV format.

There are no hard rules here, as cleanup has a high correlation with the data set. For example, to figure out to which wave each runner was assigned I had to make some assumptions based on what I saw the day of the race.

Let me show you what I mean with some code:

```py :collapsed-lines
import datetime
from enum import Enum
from typing import Dict

"""
Runners started on waves, but for basic analysis, we will assume all runners were able to run
at the same time.
"""
BASE_RACE_DATETIME = datetime.datetime(
    year=2023,
    month=9,
    day=4,
    hour=20,
    minute=0,
    second=0,
    microsecond=0
)

class Waves(Enum):
    """
    22 Elite male
    17 Elite female
    There are some holes, so either some runners did not show up or there was spare capacity.
    https://runsignup.com/Race/EmpireStateBuildingRunUp/Page-4
    https://runsignup.com/Race/EmpireStateBuildingRunUp/Page-5
    I guessed who went into which category, based on the BIB numbers I saw that day
    """
    ELITE_MEN = ["Elite Men", [1, 25], BASE_RACE_DATETIME]
    ELITE_WOMEN = ["Elite Women", [26, 49], BASE_RACE_DATETIME + datetime.timedelta(minutes=2)]
    PURPLE = ["Specialty", [100, 199], BASE_RACE_DATETIME + datetime.timedelta(minutes=10)]
    GREEN = ["Sponsors", [200, 299], BASE_RACE_DATETIME + datetime.timedelta(minutes=20)]
    """
    The date people applied for the lottery determined the colors. Let's assume that
    General Lottery Open: 7/17 9AM- 7/28 11:59PM
    General Lottery Draw Date: 8/1
    """
    ORANGE = ["Tenants", [300, 399], BASE_RACE_DATETIME + datetime.timedelta(minutes=30)]
    GREY = ["General 1", [400, 499], BASE_RACE_DATETIME + datetime.timedelta(minutes=40)]
    GOLD = ["General 2", [500, 599], BASE_RACE_DATETIME + datetime.timedelta(minutes=50)]
    BLACK = ["General 3", [600, 699], BASE_RACE_DATETIME + datetime.timedelta(minutes=60)]

"""
Interested only in people who completed the 86 floors. So is it either a full course or dnf
"""
class Level(Enum):
    FULL = "Full Course"
    DNF = "DNF"

# Fields are sorted by interest
class RaceFields(Enum):
    BIB = "bib"
    NAME = "name"
    OVERALL_POSITION = "overall position"
    TIME = "time"
    GENDER = "gender"
    GENDER_POSITION = "gender position"
    AGE = "age"
    DIVISION_POSITION = "division position"
    COUNTRY = "country"
    STATE = "state"
    CITY = "city"
    PACE = "pace"
    TWENTY_FLOOR_POSITION = "20th floor position"
    TWENTY_FLOOR_GENDER_POSITION = "20th floor gender position"
    TWENTY_FLOOR_DIVISION_POSITION = "20th floor division position"
    TWENTY_FLOOR_PACE = '20th floor pace'
    TWENTY_FLOOR_TIME = '20th floor time'
    SIXTY_FLOOR_POSITION = "65th floor position"
    SIXTY_FIVE_FLOOR_GENDER_POSITION = "65th floor gender position"
    SIXTY_FIVE_FLOOR_DIVISION_POSITION = "65th floor division position"
    SIXTY_FIVE_FLOOR_PACE = '65th floor pace'
    SIXTY_FIVE_FLOOR_TIME = '65th floor time'
    WAVE = "wave"
    LEVEL = "level"
    URL = "url"

FIELD_NAMES = [x.value for x in RaceFields if x != RaceFields.URL]
FIELD_NAMES_FOR_SCRAPING = [x.value for x in RaceFields]
FIELD_NAMES_AND_POS: Dict[RaceFields, int] = {}
pos = 0
for field in RaceFields:
    FIELD_NAMES_AND_POS[field] = pos
    pos += 1

def get_wave_from_bib(bib: int) -> Waves:
    for wave in Waves:
        (lower, upper) = wave.value[1]
        if lower <= bib <= upper:
            return wave
    return Waves.BLACK

def get_description_for_wave(wave: Waves) -> str:
    return wave.value[0]
```

I used [<FontIcon icon="fa-brands fa-python"/>enums](https://docs.python.org/3/library/enum.html) to make it clear what type of data I was working on, especially for the names of the fields. Consistency is key.

As for cleaning the data, well there were some obvious fixes I had to apply like:

1. Format of the times like pace, race time, and so on so it could be parsed later
2. Capitalize some values to make them easier to read
3. Early string to integer conversion for values like age, position, and so on. If that fails, assign 'not a number'.

By all means, we are not done massaging the data. A simple function takes care of this stage inside the [data (<FontIcon icon="iconfont icon-github"/>`josevnz/tutorials`)](https://github.com/josevnz/tutorials/blob/main/docs/EmpireStateRunUp/empirestaterunup/data.py) module:

```py :collapsed-lines
# Omitted imports and Enum declarations as they were shown early on. 
# Check the source code for 'data.py' for more details
def raw_csv_read(raw_file: Path) -> Iterable[Dict[str, Any]]:
    record = {}
    with open(raw_file, 'r') as raw_csv_file:
        reader = csv.DictReader(raw_csv_file)
        row: Dict[str, Any]
        for row in reader:
            try:
                csv_field: str
                for csv_field in FIELD_NAMES_FOR_SCRAPING:
                    column_val = row[csv_field].strip()
                    if csv_field == RaceFields.BIB.value:
                        bib = int(column_val)
                        record[csv_field] = bib
                    elif csv_field in [ RaceFields.GENDER_POSITION.value, RaceFields.DIVISION_POSITION.value, RaceFields.OVERALL_POSITION.value,  RaceFields.TWENTY_FLOOR_POSITION.value,
                        RaceFields.TWENTY_FLOOR_DIVISION_POSITION.value, RaceFields.TWENTY_FLOOR_GENDER_POSITION.value, RaceFields.SIXTY_FLOOR_POSITION.value, RaceFields.SIXTY_FIVE_FLOOR_DIVISION_POSITION.value,
                        RaceFields.SIXTY_FIVE_FLOOR_GENDER_POSITION.value, RaceFields.AGE.value ]:
                        try:
                            record[csv_field] = int(column_val)
                        except ValueError:
                            record[csv_field] = math.nan
                    elif csv_field == RaceFields.WAVE.value:
                        record[csv_field] = get_description_for_wave(get_wave_from_bib(bib)).upper()
                    elif csv_field in [RaceFields.GENDER.value, RaceFields.COUNTRY.value]:
                        record[csv_field] = column_val.upper()
                    elif csv_field in [RaceFields.CITY.value, RaceFields.STATE.value,

                    ]:
                        record[csv_field] = column_val.capitalize()
                    elif csv_field in [RaceFields.SIXTY_FIVE_FLOOR_PACE.value, RaceFields.SIXTY_FIVE_FLOOR_TIME.value, RaceFields.TWENTY_FLOOR_PACE.value,
                        RaceFields.TWENTY_FLOOR_TIME.value, RaceFields.PACE.value, RaceFields.TIME.value ]:
                        parts = column_val.strip().split(':')
                        for idx in range(0, len(parts)):
                            if len(parts[idx]) == 1:
                                parts[idx] = f"0{parts[idx]}"
                        if len(parts) == 2:
                            parts.insert(0, "00")
                        record[csv_field] = ":".join(parts)
                    else:
                        record[csv_field] = column_val
                if record[csv_field] in ['-', '--']:
                    record[csv_field] = ""
                yield record
            except IndexError:
                raise
```

The `esru_csv_cleaner` script is the sum of the first stage cleanup effort, which takes the raw captured data and writes a CSV file with some important corrections:

```sh
esru_csv_cleaner --rawfile /home/josevnz/temp/raw_data.csv /home/josevnz/tutorials/docs/EmpireStateRunUp/empirestaterunup/results-full-level-2023.csv
```

Now with the data ready, we can proceed to load the data and ask some questions about the race.
