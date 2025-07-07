---
lang: en-US
title: "How to Transform JSON Data to Match Any Schema"
description: "Article(s) > How to Transform JSON Data to Match Any Schema"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Transform JSON Data to Match Any Schema"
    - property: og:description
      content: "How to Transform JSON Data to Match Any Schema"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/transform-json-data-schema.html
prev: /programming/py-pandas/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Nneoma Uche
    url : https://freecodecamp.org/news/author/Nene23/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752121420492/513db316-cdc7-47ef-8f20-4911cf5d41f9.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Transform JSON Data to Match Any Schema"
  desc="Whether you’re transferring data between APIs or just preparing JSON data for import, mismatched schemas can break your workflow.  Learning how to clean and normalize JSON data ensures a smooth, error-free data transfer. This tutorial demonstrates ho..."
  url="https://freecodecamp.org/news/transform-json-data-schema"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752121420492/513db316-cdc7-47ef-8f20-4911cf5d41f9.png"/>

Whether you’re transferring data between APIs or just preparing JSON data for import, mismatched schemas can break your workflow. Learning how to clean and normalize JSON data ensures a smooth, error-free data transfer.

This tutorial demonstrates how to clean messy JSON and export the results into a new file, based on a predefined schema. The JSON file we’ll be cleaning contains a dataset of 200 synthetic customer records.

In this tutorial, we’ll apply two methods for cleaning the input data:

- With pure Python
- With `pandas`

You can apply either of these in your code. But the `pandas` method is better for large, complex data sets. Let’s jump right into the process.

::: note Prerequisites

To follow along with this tutorial, you should have a basic understanding of:

- Python dictionaries, lists, and loops
- JSON data structure (keys, values, and nesting)
- How to read and write JSON files with Python’s `json` module

:::

---

## Add and Inspect the JSON File

Before you begin writing any code, make sure that the <FontIcon icon="iconfont icon-json"/>`.json` file you intend to clean is in your project directory. This makes it easy to load in your script using the file name alone.

You can now inspect the data structure by viewing the file locally or loading it in your script, with Python’s built-in `json` module.

Here’s how (assuming the file name is <FontIcon icon="iconfont icon-json"/>`old_customers.json`):

![Code to view or print contents of the raw JSON file in terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1752079424973/3cd77410-6fa9-483d-9a73-edbe4c035327.jpeg)

This shows you whether the JSON file is structured as a dictionary or a list. It also prints out the entire file in your terminal. Mine is a dictionary that maps to a list of 200 customer entries. You should always open up the raw JSON file in your IDE to get a closer look at its structure and schema.

---

## Define the Target Schema

If someone asks for JSON data to be cleaned, it probably means that the [<FontIcon icon="fas fa-globe"/>current schema](https://json-schema.org/understanding-json-schema/about) is unsuitable for its intended purpose. At this point, you want to be clear on what the final JSON export should look like.

JSON schema is essentially a blueprint that describes:

- required fields
- field names
- data type for each field
- standardized formats (for example, lowercase emails, trimmed whitespace, etc.)

Here’s what the old schema versus the target schema looks like:

![A screenshot of the old JSON Schema to be transformed](https://cdn.hashnode.com/res/hashnode/image/upload/v1751956173106/d5957404-57ae-4de9-b61b-90eefa0b9260.jpeg)

![The expected JSON Schema](https://cdn.hashnode.com/res/hashnode/image/upload/v1751956365336/dcf6a024-1ae6-4c95-92ae-5544ba4cbb3e.jpeg)

As you can see, the goal is to delete the `customer_id` and `address` fields in each entry and rename the rest from:

- `name` to `full_name`
- `email` to `email_address`
- `phone` to `mobile`
- `membership_level` to `tier`

The output should contain 4 response fields instead of 6, all renamed to fit the project requirements.

---

## How to Clean JSON Data with Pure Python

Let’s explore using Python’s built-in `json` module to align the raw data with the predefined schema.

### Step 1: Import `json` and `time` modules

Importing `json` is necessary because we’re working with JSON files. But we’ll use the `time` module to track how long the data cleaning process takes.

```py
import json
import time
```

### Step 2: Load the file with `json.load()`

```py
start_time = time.time()
with open('old_customers.json') as file:
    crm_data = json.load(file)
```

### Step 3: Write a function to loop through and clean each customer entry in the dictionary

```py
def clean_data(records):
    transformed_records = []
    for customer in records["customers"]:
        transformed_records.append({
                "full_name": customer["name"],
                "email_address": customer["email"],
                "mobile": customer["phone"],
                "tier": customer["membership_level"],

                })
    return {"customers": transformed_records}

new_data = clean_data(crm_data)
```

`clean_data()` takes in the original data (**temporarily**) stored in the records variable, transforming it to match our target schema.

Since the JSON file we loaded is a dictionary containing a `customers` key, which maps to a list of customer entries, we access this key and loop through each entry in the list.

In the for loop, we rename the relevant fields and store the cleaned entries in a new list called `transformed_records`.

Then, we return the dictionary, with the `customers` key intact.

### Step 4: Save the output in a <FontIcon icon="iconfont icon-json"/>`.json` file

Decide on a name for your cleaned JSON data and assign that to an `output_file` variable, like so:

```py
output_file = "transformed_data.json"
with open(output_file, "w") as f:
    json.dump(new_data, f, indent=4)
```

You can also add a `print()` statement below this block to confirm that the file has been saved in your project directory.

### Step 5: Time the data cleaning process

At the beginning of this process, we imported the time module to measure how long it takes to clean up JSON data using pure Python. To track the runtime, we stored the current time in a `start_time` variable before the cleaning function, and we’ll now include an `end_time` variable at the end of the script.

The difference between the `end_time` and `start_time` values gives you the total runtime in seconds.

```py
end_time = time.time()
elapsed_time = end_time - start_time

print(f"Transformed data saved to {output_file}")
print(f"Processing data took {elapsed_time:.2f} seconds")
```

Here’s how long the data cleaning process took with the pure Python approach:

![Script runtime displayed in terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1751957367537/4a33fc16-7158-427e-b715-bec10a586857.jpeg)

---

## How to Clean JSON Data with Pandas

Now we’re going to try achieving the same results as above, using Python and a third-party library called `pandas`. Pandas is an open-source library used for data manipulation and analysis in Python.

To get started, you need to have the Pandas library installed in your directory. In your terminal, run:

```sh
pip install pandas
```

Then follow these steps:

### Step 1: Import the relevant libraries

```py
import json
import time
import pandas as pd
```

### Step 2: Load file and extract customer entries

Unlike the pure Python method, where we simply indexed the key name `customers` to access the list of customer data, working with `pandas` requires a slightly different approach.

We must extract the list before loading it into a DataFrame because `pandas` expects structured data. Extracting the list of customer dictionaries upfront ensures that we isolate and clean the relevant records alone, preventing errors caused by nested or unrelated JSON data.

```py
start_time = time.time()
with open('old_customers.json', 'r') as f:
    crm_data = json.load(f)

#Extract the list of customer entries
clients = crm_data.get("customers", [])
```

### Step 3: Load customer entries into a DataFrame

Once you’ve got a clean list of customer dictionaries, load the list into a DataFrame and assign said list to a variable, like so:

```py
#Load into a dataframe
df = pd.DataFrame(clients)
```

This creates a tabular or spreadsheet-like structure, where each row represents a customer. Loading the list into a DataFrame also allows you to access `pandas`’ powerful data cleaning methods like:

- `drop_duplicate()`: removes duplicate rows or entries from a DataFrame
- `dropna()`: drops rows with any missing or null data
- `fillna(value)`: replaces all missing or null data with a specified value
- `drop(columns)`: drops unused columns explicitly

### Step 4: Write a custom function to rename relevant fields

At this point, we need a function that takes in a single customer entry – a row – and returns a cleaned version that fits the target schema (`full_name`, `email_address`, `mobile` and `tier`).

The function should also handle missing data by setting default values like **”Unknown”** or **”N/A”** when a field is absent.

::: note P.S

At first, I used `drop(columns)` to explicitly remove the `address` and `customer_id` fields. But it’s not needed in this case, as the `transform_fields()` function only selects and renames the required fields. Any extra columns are automatically excluded from the cleaned data.

:::

### Step 5: Apply schema transformation to all rows

We’ll use `pandas`' `apply()` method to apply our custom function to each row in the DataFrame. This will creates a Series (for example, 0 → {...}, 1 → {...}, 2 → {...}), which is not JSON-friendly.

As `json.dump()` expects a list, not a Pandas Series, we’ll apply `tolist()`, converting the Series to a list of dictionaries.

```py
# Apply schema transformation to all rows
transformed_df = df.apply(transform_fields, axis=1)

#Convert series to list of dicts
transformed_data = transformed_df.tolist()
```

Another way to approach this is with list comprehension. Instead of using `apply()` at all, you can write:

```py
transformed_data = [transform_fields(row) for row in df.to_dict(orient="records")]
```

`orient=”records` is an argument for `df.to_dict` that tells pandas to convert the DataFrame to a list of dictionaries, where each dictionary represents a single customer record (that is, one row).

Then the **for loop** iterates through every customer record on the list, calling the custom function on each row. Finally, the list comprehension (**[...]**) collects the cleaned rows into a new list.

### Step 6: Save the output in a <FontIcon icon="iconfont icon-json"/>`.json` file

```py
#Save the cleaned data
output_data = {"customers": transformed_data}
output_file = "applypandas_customer.json"
with open(output_file, "w") as f:
    json.dump(output_data, f, indent=4)
```

I recommend picking a different file name for your `pandas` output. You can inspect both files side by side to see if this output matches the result you got from cleaning with pure Python.

### Step 7: Track runtime

Once again, check for the difference between start time and end time to determine the program’s execution time.

```py
end_time = time.time()
elapsed_time = end_time - start_time

#print(f"Transformed data saved to {output_file}")
print(f"Transformed data saved to {output_file}")
print(f"Processing data took {elapsed_time:.2f} seconds")
```

When I used **list comprehension** to apply the custom function, my script’s runtime was **0.03 seconds**, but with `pandas`’ `apply()` function, the total runtime dropped to **0.01 seconds**.

### Final output preview

If you followed this tutorial closely, your JSON output should look like this – whether you used the `pandas` method or the pure Python approach:

![The expected JSON output after schema transformation](https://cdn.hashnode.com/res/hashnode/image/upload/v1751961256627/d7b585f7-4585-4354-9fa7-a171adb31f90.jpeg)

---

## How to Validate the Cleaned JSON

Validating your output ensures that the cleaned data follows the expected structure before being used or shared. This step helps to catch formatting errors, missing fields, and wrong data types early.

Below are the steps for validating your cleaned JSON file:

### Step 1: Install and import `jsonschema`

`jsonschema` is a third-party validation library for Python. It helps you define the expected structure of your JSON data and automatically check if your output matches that structure.

In your terminal, run:

```sh
pip install jsonschema
```

Import the required libraries:

```py
import json
from jsonschema import validate, ValidationError
```

`validate()` checks whether your JSON data matches the rules defined in your schema. If the data is valid, nothing happens. But if there’s an error – like a missing field or wrong data type – it raises a `ValidationError`.

### Step 2: Define a schema

As you know, JSON schema changes with each file structure. If your JSON data differs from what we’ve been working with so far, learn how to create a schema [<FontIcon icon="fas fa-globe"/>here](https://json-schema.org/learn/getting-started-step-by-step#validate-json-data-against-the-schema). Otherwise, the schema below defines the structure we expect for our cleaned JSON:

```py :collapsed-lines
schema = {
    "type": "object",
    "properties": {
        "customers": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "full_name": {"type": "string"},
                    "email_address": {"type": "string"},
                    "mobile": {"type": "string"},
                    "tier": {"type": "string"}
                },
                "required": ["full_name", "email_address", "mobile", "tier"]
            }
        }
    },
    "required": ["customers"]
}
```

- The data is an object that must contain a key: `customers`.
- `customers` must be an **array** (a list), with each object representing one customer entry.
- Each customer entry must have four fields–all strings:
  - `full_name`
  - `email_address`
  - `mobile`
  - `tier`
- The `required` fields ensure that none of the relevant fields are missing in any customer record.

### Step 3: Load the cleaned JSON file

```py
with open("transformed_data.json") as f:
    data = json.load(f)
```

### Step 4: Validate the data

For this step, we’ll use a `try. . . except` block to end the process safely, and display a helpful message if the code raises a `ValidationError`.

```py
try:
    validate(instance=data, schema=schema)
    print("JSON is valid.")
except ValidationError as e:
    print("JSON is invalid:", e.message)
```

---

## Pandas vs Pure Python for Data Cleaning

From this tutorial, you can probably tell that using pure Python to clean and restructure JSON is the more straightforward approach. It is fast and ideal for handling small datasets or simple transformations.

But as data grows and becomes more complex, you might need advanced data cleaning methods that Python alone does not provide. In such cases, `pandas` becomes the better choice. It handles large, complex datasets effectively, providing built-in functions for handling missing data and removing duplicates.

You can study the [<FontIcon icon="iconfont icon-pandas"/>Pandas cheatsheet](https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf) to learn more data manipulation methods.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Transform JSON Data to Match Any Schema",
  "desc": "Whether you’re transferring data between APIs or just preparing JSON data for import, mismatched schemas can break your workflow.  Learning how to clean and normalize JSON data ensures a smooth, error-free data transfer. This tutorial demonstrates ho...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/transform-json-data-schema.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
