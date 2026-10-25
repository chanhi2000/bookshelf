---
lang: en-US
title: "Schema Drift vs. Semantic Drift in Data Pipelines"
description: "Article(s) > Schema Drift vs. Semantic Drift in Data Pipelines"
icon: iconfont icon-pydantic
category:
  - Python
  - Pydantic
  - Data Science
  - SQLite
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pydantic
  - data-sceince
  - sql
  - sqlite
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Schema Drift vs. Semantic Drift in Data Pipelines"
    - property: og:description
      content: "Schema Drift vs. Semantic Drift in Data Pipelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/schema-drift-vs-semantic-drift-in-data-pipelines.html
prev: /programming/py-pydantic/articles/README.md
date: 2026-11-13
isOriginal: false
author:
  - name: Yemi Ojedapo
    url: https://freecodecamp.org/news/author/Hyemiie/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae47b7ae-2c13-49b9-bad7-a20a28edbecb.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pydantic > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pydantic/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "SQLite > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/sqlite/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Schema Drift vs. Semantic Drift in Data Pipelines"
  desc="When a column is removed from a source database or dataset, the next pipeline run usually fails, making the problem easy to detect. But when a field keeps the same name and data type but its meaning c"
  url="https://freecodecamp.org/news/schema-drift-vs-semantic-drift-in-data-pipelines"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae47b7ae-2c13-49b9-bad7-a20a28edbecb.png"/>

When a column is removed from a source database or dataset, the next pipeline run usually fails, making the problem easy to detect. But when a field keeps the same name and data type but its meaning changes (known as semantic drift), the pipeline can continue running normally, allowing the problem to go unnoticed.

This happens because a schema describes the structure of data, not what the values actually represent. It tells us which fields exist, their data types, and whether they can contain null values, but not whether a timestamp uses UTC, a durability score should range from 10 to 100, or an empty string means something different from null.

As a result, most pipeline checks are designed to catch obvious errors, such as missing columns or incorrect data types, but often fail to detect less obvious problems where the data looks correct but its meaning or values have changed.

I wanted to see how far this limitation reaches in practice, so I built a small lab where I introduced nine types of pipeline failures and tested four detectors against each one. This article looks at what each detector caught and what happened when changes went unnoticed and corrupted the data.

You can find the code [here (<VPIcon icon="iconfont icon-github"/>`hyemiie/game_inventory-schema_drift_lab-`)](https://github.com/hyemiie/game_inventory-schema_drift_lab-) and reproduce the experiment with a few commands.

::: note Prerequisites

To follow along and run the lab yourself, you’ll need:

- **Python 3.10 or newer**, and basic comfort reading Python code
- **Pydantic v2**, installed with `pip install pydantic`
- **Git**, to clone the repository
- **A terminal**, to run the scripts
- **Basic SQL**, such as `GROUP BY` and `WHERE ... IS NULL`. SQLite comes with Python, so there is nothing extra to install.
- **A general idea of what a data pipeline does**: reading data from a source, transforming it, and loading it somewhere else

:::

---

## How the Lab Works

I intentionally kept the pipeline simple. It reads 1,000 game-inventory records from a JSONL file, flattens the nested `stats` and `attributes` objects, loads the data into SQLite, and calculates six metrics: total number of records, unequipped items, item counts by rarity, average attack per category, items acquired per day, and average durability. I also left out defensive checks so that each change could affect the pipeline in the same way it might affect a real pipeline when someone assumes the source data is reliable.

Each drift applies a deterministic function that takes one record and returns a changed one, so every result is repeatable. For instance, the timezone drift shifts each UTC timestamp to UTC+4 wall time and drops the offset:

```py
def local_time_without_offset(row):
    timestamp = row["acquired_at"]
    if not timestamp.endswith("Z"):
        raise ValueError(f"Expected UTC timestamp ending in Z, got: {timestamp!r}")

    utc_time = datetime.fromisoformat(timestamp.removesuffix("Z") + "+00:00")
    local_time = utc_time + timedelta(hours=4)
    row["acquired_at"] = local_time.replace(tzinfo=None).isoformat()
    return row
```

After applying each drift, I ran the pipeline and saved its output in a separate SQLite database. I then compared it with the database generated from the original data, checking each row and column for differences. This step helped identify whether the pipeline had produced correct results, rather than simply checking whether it ran successfully.

The comparison placed each change into one of four categories:

- failed loudly (the error names a field the drift touched)
- failed confusingly (the pipeline crashed but the error doesn't mention the cause)
- passed with corruption (it finished, but values differ from the baseline)
- or passed clean (the database matches the baseline exactly).

I tested each drifted file with four detectors. Each detector follows the same structure: it takes the baseline file and the incoming file as input, checks for changes, and returns whether it found a problem along with a message. This shared interface keeps the setup simple and makes it easy to add more detectors.

The four detectors are:

1. **Schema snapshot diff:** Compares the fields and data types in the incoming file against the baseline to identify schema changes.
2. **Loose Pydantic model:** Validates the data against a basic set of rules and restricts `rarity` to the five known values.
3. **Strict Pydantic model:** Applies additional validation rules. It also restricts `rarity` to the five known values, requires timezone-aware timestamps, limits `equipped_slot` to five known values, and rejects unknown top-level fields. This refers to the validation rules in the model, not Pydantic's `strict=True` mode.
4. **Statistical profile:** Compares the statistical profile of the incoming data with the baseline. It checks each field's mean, category shares, and null rate to identify changes that the other detectors might miss

---

## Understanding Data Shape and Meaning

The rest of this article uses two terms: **data shape** and **data meaning**. Data shape refers to the fields in a dataset, their paths, and the types of values they contain. The schema detector captures this information by checking each field and the types found in it.

```py
def walk(obj, prefix, schema):
    for key, value in obj.items():
        field = f"{prefix}{key}"
        if isinstance(value, dict):
            walk(value, field + ".", schema)
        else:
            schema.setdefault(field, set()).add(type(value).__name__)
```

For the baseline, this returns entries like `acquired_at: {'str'}`, `equipped_slot: {'NoneType', 'str'}`, and `attributes.durability: {'int'}`.  
  
Data meaning, however, includes everything the dictionary leaves out including the unit and time zone of a value, its expected range, the set of valid strings, and what a null value represents. This reveals a limitation of any detector that only looks at data shape. Since the schema detector bases its results on the dictionary of field paths and data types, it can't distinguish between datasets that produce the same dictionary but contain values with different meanings.

Three of the nine drifts left this dictionary unchanged: the timezone shift, the new enum value, and the durability scaling. As a result, the schema detector didn't flag any of them.

Detectors can check data at different levels:

1. Shape: Checks which fields exist and the types of values they contain.
2. Value constraints: Checks whether individual values follow specific rules, such as requiring timezone information or limiting a field to a known set of values.
3. Distribution: Compares statistics, such as averages, category shares, and null rates, against a baseline. This can reveal changes in the data without defining exactly what each value should mean.
4. Semantics: Checks what the data actually represents, including units, timezone conventions, and the meaning of null values. These rules require knowledge of the data and must come from the people or systems that produce and use it.

The four detectors cover the first three levels. The fourth level goes beyond what these detectors can establish because a dataset can pass checks on its structure, individual values, and statistical distributions while its meaning has changed. To know what the data means, we need context that can't be gotten from its values alone.

---

## The Results Matrix

The results matrix summarizes how each of the four detectors responded to the nine drift scenarios.

```py
for drift in ALL_DRIFTS:
    dst = ROOT / "data" / "drifted" / f"{drift.name}.jsonl"
    drifted_db = DB_DIR / f"{drift.name}.db"

    apply_drift(drift, BASELINE, dst)
    result = run_pipeline(dst, db_path=str(drifted_db))
    outcome = classify(result, baseline_db, drifted_db, drift.fields)

    detected = {
        det.name: det.check(str(BASELINE), str(dst))["detected"]
        for det in DETECTORS
    }

    rows.append((drift, outcome, detected, result.get("error")))
```

It shows which changes they caught, which they missed, and whether the pipeline failed or continued with incorrect data.

| Drift | What changed | Pipeline outcome | Rows corrupted | Schema diff | Pydantic (loose) | Pydantic (strict) | Statistical profile |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `rename_rarity` | `rarity` renamed | Failed loudly | n/a | Yes | Yes | Yes | No |
| `drop_equipped_slot` | `equipped_slot` removed | Failed loudly | n/a | Yes | Yes | Yes | No |
| `stats_become_list` | `stats` object became an array | Failed confusingly | n/a | Yes | Yes | Yes | No |
| `add_column` | New `guild` field | Passed clean | 0 | Yes | No | Yes | No |
| `type_change_level` | `level` int became string | Passed clean | 0 | Yes (only) | No | No | No |
| `empty_equipped_slot` | Null slots became `""` | Passed with corruption | 205 | Yes | No | Yes | Yes |
| `new_enum_value` | 20 rows relabeled `mythic` | Passed with corruption | 20 | No | Yes | Yes | No |
| `local_time_without_offset` | Timestamps shifted to UTC+4, offset dropped | Passed with corruption | 1,000 | No | No | Yes (only) | No |
| `durability_scaled` | Durability multiplied by 10 | Passed with corruption | 1,000 | No | No | No | Yes (only) |
| **Total caught** |  |  |  | **6 / 9** | **4 / 9** | **7 / 9** | **2 / 9** |

"Yes (only)” means that detector was the only one to catch the change. “n/a” means the pipeline crashed, so no rows were loaded.

### Pipeline Errors

| Drift | Label | Error |
| --- | --- | --- |
| `rename_rarity` | Failed loudly | `KeyError: 'rarity'` |
| `drop_equipped_slot` | Failed loudly | `KeyError: 'equipped_slot'` |
| `stats_become_list` | Failed confusingly | `TypeError: list indices must be integers or slices, not str` |

The strict model detected the most changes (7 out of 9), followed by the schema diff (6), the loose model (4), and the statistical profile (2).

But each detector missed some changes. Three drifts were detected by only one detector: the strict model caught the timezone shift, the schema diff caught the `level` change, and the statistical profile caught the durability scaling.

---

## Detecting Changes in Data Shape

Five of the nine drifts changed the data structure. These included renaming `rarity`, removing `equipped_slot`, adding a `guild` field, replacing the `stats` object with an array, and changing `level` from an integer to a string.

The schema diff detected all five changes. The strict model detected four, and the loose model detected three. This shows that the schema diff was the most effective at detecting structural changes.

The pipeline failed on three of the drifts, but some error messages were more useful than others. Renaming `rarity` caused a `KeyError: 'rarity'`, which tells us exactly which field is missing. Replacing `stats` with `[attack, defense, speed]` caused a `TypeError: list indices must be integers or slices, not str`. This message explains the type of error but doesn't identify the field involved. To find the cause, the reader has to trace the error back through the transformation code.

The classifier labels the first error loud and the second confusing. It makes this distinction by checking whether the error message mentions a field affected by the drift.

```py
if result["status"] == "error":
    error_text = result["error"].lower()
    names_cause = any(f.lower() in error_text for f in drift_fields)
    return {
        "label": "failed_loudly" if names_cause else "failed_confusingly",
        "rows_affected": None,
        "loss_cells": 0,
        "corrupt_cells": 0,
        "extra_rows": 0,
    }
```

The Pydantic detectors ran on the same file and reported `stats: Input should be a valid dictionary`, directly identifying the field with the problem.

The `level` change reveals another way a structural change can go undetected. Both Pydantic models accepted it because Pydantic's default lax mode converts the string `"42"` into the integer `42`. The pipeline also accepted it because SQLite's INTEGER affinity converts text that looks like a number when inserting it into an INTEGER column. As a result, the database matched the baseline, and the classifier labeled the run `passed_clean`.

Only the schema diff detected the change because it checks the type of the raw value before any conversion takes place. This shows the limitation of checking data after coercion: once a value has been converted, the original type change is no longer visible. In this case, the simplest detector caught a change that both Pydantic models accepted.

The experiment also showed that not every detected change causes a problem. Adding `guild` and changing `level` from an integer to a string both triggered alerts. The schema diff detected both changes, while the strict model detected only the addition of `guild`. But neither change corrupted any rows because the load step reads only the fields it expects.

This highlights the need to distinguish between changes that should stop a pipeline and those that only need to be logged. If detectors flag too many harmless changes, users may start to ignore their warnings.

---

## Semantic Changes: What the Wrong Numbers Looked Like

The remaining drifts didn't change the fields or data types. They changed what the values represented. These changes were harder to detect but had real effects on the results. The table below shows the impact of each drift and whether it was visible in the pipeline's output.

| Drift | Rows corrupted | Metric that moved | Before | After |
| --- | --- | --- | --- | --- |
| Timestamps shifted to UTC+4, offset dropped | 1,000 | items acquired per day | Jan 2: 9, Jan 3: 3 | Jan 2: 6, Jan 3: 6 |
| Null slots replaced with `""` | 205 | unequipped item count | 205 | 0 |
| New `mythic` rarity on 20 rows | 20 | item count per rarity | common: 619 | common: 609, mythic: 20 |
| Durability multiplied by 10 | 1,000 | average durability | 54.78 | 547.85 |

A major thing I noticed is that most of the numbers still look normal. For example, moving timestamps forward by four hours shifts some items onto the next calendar day. Since four hours is one-sixth of a day, roughly one in six items moves to a different day. Each day loses some items to the next day but also gains items from the previous day.

The total number of items remains 1,000, and the daily counts change very little overall. With an average of about 5.5 items per day, the counts already vary by two or three items. So a drop from 9 items to 6 can easily look like typical variation rather than a data problem.

The pipeline's total-row-count check still passed because no items were lost. Any check that only compares totals would also miss the problem. The total is correct, but some items are now counted under the wrong day.

I also looked at why the pipeline didn't report a problem. The original timestamp, `2026-01-02T22:30:00+00:00`, changed to `2026-01-03T02:30:00` after the drift. The new timestamp has no timezone offset, so `datetime.fromisoformat` reads it as a naïve datetime. The `isoformat()` method then writes it back without an offset. SQLite's `DATE()` treats this offset-free timestamp as UTC, placing the item on January 3 instead of January 2. The pipeline processed the timestamp without errors but assigned the item to the wrong day. If the producer had written `2026-01-03T02:30:00+04:00` instead, the timestamp would have represented the same instant as the original. SQLite would have converted it to UTC, and the item would still have been counted on January 2. The problem was the missing timezone offset. Without it, the pipeline had no way to know which timezone the timestamp represented, so it treated the time as UTC.

The empty-string drift caused a different problem. Replacing `null` with `""` kept the field as a string, so checks that only verify the data type still passed.

The schema diff caught the change because the type set for `equipped_slot` changed from `{'NoneType', 'str'}` to `{'str'}`. The pipeline raised no errors, but the query `WHERE equipped_slot IS NULL` returned no rows. The dashboard would show 0 unequipped items instead of 205, making it look as though every player had equipped their gear.

The statistical profile showed what had happened: `equipped_slot: null rate 20% -> 0%; equipped_slot='': share 0% -> 20%`. The null values had been replaced with empty strings, not real values.

The new `mythic` rarity went through the pipeline without an error for a similar reason. The drift changed 20 records to `mythic`: 10 from `common` (619 to 609), 9 from `uncommon` (236 to 227), and 1 from `rare` (98 to 97). The query `GROUP BY rarity` accepted the new value without any error. It simply created a new row for `mythic` and reduced the counts for the other rarities. A dashboard that only knows the five original rarities might hide `mythic` or group it under "other", depending on how it handles unknown values.

The durability change shows most clearly how data can keep the same structure but mean something different. In the original data, durability ranges from 10 to 100, so an average of 547.85 is clearly wrong. But the field kept the same name and integer type, so the schema diff didn't detect the change.

The pipeline also accepted the values because nothing checked them against the expected range. Only a check that knows durability should be between 10 and 100 can catch this problem. To test this, I added a range constraint to the strict Pydantic model:

```py
class RangedAttributes(Attributes):
    durability: int = Field(ge=10, le=100)


class StrictWithRange(StrictItem):
    attributes: RangedAttributes


flagged = 0
for row in drifted:
    try:
        StrictWithRange(**row)
    except ValidationError:
        flagged += 1
```

This caught 985 of the 1,000 drifted records. The remaining 15 had an original durability value of 10, which became 100 after scaling by 10. Since 100 still falls within the allowed range, those records passed validation.

---

## Damage vs. Visibility

The four drifts corrupted 1,000, 205, 20, and 1,000 rows, but each one changed only one of the six metrics the pipeline calculates. The other five metrics stayed the same. Anyone monitoring the pipeline could miss the damage unless they checked the affected metric and knew its expected value.

The main finding is that data can change across many rows without changing most of the results people monitor. People only notice the problem if they check the metric that the drift affects.

---

## Detecting Changes in Data Meaning

To catch changes beyond the data structure, we need checks that examine the values themselves.

The strict model checks whether values follow specific rules. It caught the timezone drift because `AwareDatetime` rejects timestamps without a timezone offset (`acquired_at: Input should have timezone info`). It also caught the empty-string slot because its `Literal` rule only accepts five known slot names and rejects `""`.

The loose model has fewer restrictions. It accepts any string for `acquired_at`, any string or `None` for `equipped_slot`, and unknown fields. As a result, it missed the timezone shift, the empty-string slot, and the new column.

The strict model also missed the durability change because I hadn't defined an allowed range for that field. In a separate run, I added `Field(ge=10, le=100)` to a copy of the model. This caught 985 of the 1,000 changed rows. It missed the remaining 15 because their original durability was 10, which became exactly 100 after scaling and still passed the check.

The statistical profile compares data distributions with the baseline. It was the only detector to catch the durability scaling because it doesn't need a predefined range. It simply detected that the average durability rose from 54.8 to 547.9. But it may also flag normal changes in the data. To test this, I scaled durability by factors from 1.02 to 1.3 and tried four mean-change thresholds. I also tested the detector on 200 clean files generated with different seeds to see how often it raised false alarms. I excluded the baseline seed because it would produce identical data.

| Mean threshold | False alarms, durability only | False alarms, any numeric field | Shifts caught |
| --- | --- | --- | --- |
| 25% | 0 / 200 | 0 / 200 | 1.3x only |
| 10% | 0 / 200 | 0 / 200 | 1.1x and above |
| 5% | 0 / 200 | 23 / 200 (11.5%) | 1.05x and above |
| 2% | 37 / 200 (18.5%) | 188 / 200 (94%) | every shift tested |

The 2% threshold shows how easily the detector can flag normal variation. Durability is roughly uniform from 10 to 100, so a 1,000-row sample has a standard deviation of about 26. That means the sample mean typically lands within about 0.8 of the true mean, which is roughly 1.5% of its value. A 2% threshold is only a little bigger than that, so it should fire on roughly 18% of clean files. It fired on 37 of 200 (18.5%). This shows a tradeoff that lowering the threshold helps catch small changes but also increases false alarms.

The results also show why one threshold doesn't work for every numeric field. `stats.attack`, `level`, and `player_id` vary more than durability relative to their averages. At a 2% threshold, at least one of these fields triggered an alarm in 188 of 200 clean files. At 5%, they caused all 23 false alarms, while durability caused none. `stats.attack` caused 15 of those alarms. Even `player_id` triggered alarms, although its average has no useful meaning.

Using a single threshold treats every numeric field the same, even though some vary more than others and some shouldn't be checked by their average at all.

The category-share check uses a fixed 5-percentage-point threshold, so changing the mean threshold doesn't affect its results. It raised 26 alarms across 22 of the 200 clean files (11%). Seventeen alarms involved `equipped_slot`, and 16 of those involved `chest` or `off_hand`.

There are two reasons for these alarms. First, the check calculates each slot's share using only the 795 non-null rows, not all 1,000. This gives each share a standard error of about 1.4 percentage points.

Second, my baseline doesn't match the intended shares exactly. `chest` makes up 17.2% of the baseline instead of the intended 20%. As a result, a clean file only needs to reach 22.2% to trigger an alarm. This happens in roughly 6% of files. `off_hand` has the opposite problem: its baseline share is higher than intended, at 22.3%. This shows that a baseline can contain its own sampling errors, which then affect every comparison.

One more limitation comes from the detector design, not from a measured result. I didn't test this case, but the code shows why it would go undetected. The strict model caught the timezone drift because the timestamp lost its offset. But a producer could shift the clock and keep the `Z` suffix. Every detector would then accept the data. The strict model checks only whether a timestamp has an offset, not whether the time is correct. The statistical profile skips timestamp strings because they have too many distinct values to treat as categories and aren't numeric.

This is a limitation of the fourth layer: the timestamp still looks valid, but it represents the wrong time. None of the detectors checks whether the timestamp matches the actual time it is supposed to represent.

---

## What this Experiment Suggests

The results suggest that combining all four detectors provides better coverage because each one catches changes the others miss.

The schema diff is simple and cheap to run on every load. It caught six of the nine drifts, including the `level` change that both Pydantic models missed because they converted the value before checking it. It also identified the field that caused an error when the pipeline's own error message did not. But it caught only one of the four drifts that corrupted data.

The strict model and statistical profile caught all four harmful drifts between them. I'd use the strict model for fields with known rules, such as timezone-aware timestamps, allowed values, and numeric ranges. I'd use statistical checks for important metrics that have no clear validation rules, setting a separate threshold for each field based on past data.

The lab showed why one threshold doesn't work for every field. A global 5% mean threshold raised 23 false alarms across 200 clean files, all from fields other than durability. I'd only apply statistical checks to fields where the average is meaningful and set thresholds based on how much each field normally varies.

The fourth layer requires the producer and consumers to agree on what the data means. If the producer changes a field's unit, time zone, or allowed values without telling anyone, consumers can't interpret it correctly. Both sides should agree on clear rules, such as the unit of measurement, the time zone, and the allowed values.

This is a recommendation based on what my detectors couldn't catch. I haven't tested this approach in the lab yet.

---

## Limitations

The data is synthetic and independent, so it's much simpler than real data, which often has seasonal patterns and natural growth. Real-world false-alarm rates may therefore be higher than the ones I measured. I also used one fixed baseline, so any sampling error in that sample affects every comparison. A production system would likely use a rolling baseline instead.

I used the same thresholds across fields. Setting a separate threshold based on how much each field normally varies might work better, but I didn't test this. I also tested only four detectors from a much larger set of available tools. These results show where the detectors have blind spots, not which tools are best.

Finally, I chose to group changes into "shape" and "meaning," but some changes, such as replacing `null` with an empty string, could fit into either group.

My first threshold test also contained a bug. I used the wrong variable name (`SEED` instead of `seed`) in the data generator, which caused all 20 clean files to match the baseline exactly. This produced zero false alarms. A result that good at a 2% threshold seemed unlikely, so I checked the code and found the mistake. I corrected the bug and excluded seed 42, the baseline's own seed, because it would generate identical data and could never trigger an alarm. All results in this article use the corrected run.

---

## Conclusion

The experiment showed that schema changes are not the only source of pipeline failures. The schema diff caught all five structural changes but missed semantic changes that left field names and types untouched. For example, timestamps shifted to the wrong day, null values became empty strings, and durability values increased tenfold. In each case, the pipeline ran successfully but produced incorrect results.

The four detectors caught different types of changes, and using them together improved detection coverage. However, detecting changes is only part of the problem. Pipeline checks also need to validate whether values fall within expected ranges and whether they still represent what downstream calculations assume.

A pipeline completing successfully doesn't necessarily mean the data is correct. It’s just as important to check that the data retains its intended meaning and that downstream calculations still produce reliable results.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Schema Drift vs. Semantic Drift in Data Pipelines",
  "desc": "When a column is removed from a source database or dataset, the next pipeline run usually fails, making the problem easy to detect. But when a field keeps the same name and data type but its meaning c",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/schema-drift-vs-semantic-drift-in-data-pipelines.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
