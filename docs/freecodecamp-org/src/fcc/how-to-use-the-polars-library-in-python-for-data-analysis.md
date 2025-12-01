---
lang: en-US
title: "How to Use the Polars Library in Python for Data Analysis"
description: "Article(s) > How to Use the Polars Library in Python for Data Analysis"
icon: iconfont icon-polars
category:
  - Python
  - Polars
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - polars
  - py-polars
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Polars Library in Python for Data Analysis"
    - property: og:description
      content: "How to Use the Polars Library in Python for Data Analysis"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-polars-library-in-python-for-data-analysis.html
prev: /programming/py-polars/articles/README.md
date: 2025-12-11
isOriginal: false
author:
  - name: Sara Jadhav
    url : https://freecodecamp.org/news/author/Eccentric-/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765325732081/94ab547b-fdaf-41bb-ae60-ad03be31211a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Polars > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-polars/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Polars Library in Python for Data Analysis"
  desc="In this article, I’ll give you a beginner-friendly introduction to the Polars library in Python. Polars is an open-source library, originally written in Rust, which makes data wrangling easier in Python. The syntax of Polars is very similar to Pandas..."
  url="https://freecodecamp.org/news/how-to-use-the-polars-library-in-python-for-data-analysis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765325732081/94ab547b-fdaf-41bb-ae60-ad03be31211a.png"/>

In this article, I’ll give you a beginner-friendly introduction to the Polars library in Python.

Polars is an open-source library, originally written in Rust, which makes data wrangling easier in Python. The syntax of Polars is very similar to Pandas, so if you’ve worked with Pandas or the PySpark library before, using Polars should be a breeze.

Polars excels at giving fast results. It’s also memory efficient and helps you optimize your code using parallelism. It also lets you convert data from and to various libraries like NumPy, Pandas, and others.

In this tutorial, we’ll be learning about the Polars Library from absolute scratch, from installing and importing the library on the system, to manipulating data in a dataset with the help of this library.

First, we’ll look at Polars basic functions. We’ll be also writing some practical code, which will help you apply what you’ve learned. Finally, we’ll be working with an example dataset to solidify some more key Polars concepts. Let’s dive in.

::: note Prerequisites

Even though this tutorial is beginner-friendly, having some basic knowledge of the following areas will help you understand this article better:

- Basic Python syntax
- Data structures
- Ability to import libraries and knowledge of using functions and methods
- Basics of NumPy and Pandas will come in handy (not necessary).

:::

Now, that you’re aware of the prior requirements to follow along, let’s get started with our tutorial.

---

## Installing and Importing the Polars Library

To install the Polars library, you can use the following command in your terminal:

```sh
pip install polars
```

Now, this works if you already have the pip package manager on your system. If you’re on a conda environment, you can work with this:

```sh
conda install -c conda-forge polars
```

But I strongly recommend using the pip package manager to avoid various inconveniences.

Let’s import Polars in our program. We’ll follow the same process as we use for importing other libraries in Python:

```py
import polars as pl # pl is a conventional alias
```

While creating a Polars object with the data, it’s important to know the size of our data. Polars has the capacity to have 2³² rows in the DataFrame. To load more data, use the following command to install the Polars library:

```sh
pip install polars[rt64]
```

If you want to use the Polars library right away without actually installing it on your system, using a Google Colab notebook is the best option. When using a Google Colab Notebook, you can directly import and start using Polars in your program. I’ll be using Google Colab Notebook for this tutorial.

---

## What is a Series?

A series is a fundamental element of a DataFrame. It’s a 1-dimensional data-structure that you can correlate with a ‘list’ in Python or a ‘1-D array’ in NumPy. But the difference between a series and a 1-D array is that the former is labeled while the later is not. Many series come together to form a DataFrame.

We can create a series with homogenous data as well as heterogenous data.

### Creating a Series with Homogenous Data

In a series, the datatype of all the elements should be the same. If it’s not, an error is thrown.

The syntax to define a Polars series is as follows:

```py
var_name = pl.Series(“column_name”, [values])
```
 
The following code shows an example of a homogenous series definition in Python:

```py
import polars as pl
series_homo = pl.Series("Numbers", ['One', 'Two', 'Three', 'Four', 'Five'])
print(series_homo)
#
# shape: (5,)
# Series: 'Numbers' [str]
# [
#     "One"
#     "Two"
#     "Three"
#     "Four"
#     "Five"
# ]
```

In the above code, we first imported the Polars library using the `pl` alias to start using it throughout the code. Using aliases is a matter of choice, but `pl` is a conventional one (like `np` for NumPy and `pd` for Pandas). The benefit of using conventional aliases is that when you hand over the code to someone else, it’s easy for them to follow along.

Next, we used the `pl.Series()` function to create a Polars series object. As its first parameter, we passed the label for our series (`Numbers` in this case). Then we passed the values to be stores in the form of a list. Remember that the list of values that we pass acts as a single argument. Finally, we printed our series.

We can see that the output tells us about the dimensions of the the Polars object as well as the datatype of the series. The shape (rows, columns) tells us about the the number of rows and columns present in the Polars object.

We can find the data-type of a homogenous series explicitly by using the `dtype` method.

```py
print(series_homo.dtype)
#
# String
```

### Creating a Series with Heterogenous Data

Heterogenous data means that the data-type of all the elements is not the same. The syntax to define a series with heterogenous data is as follows:

```py
var_name = pl.Series(“Column_name”, [values], strict=False)
```

So you’re probably wondering, based on what I said above: how can we have a series with heterogenous data? Well, one thing to note is that a series is always homogenous irrespective of the data that is fed to it. I’ll explain below - first let’s look at this code:

```py
import polars as pl

series_hetero = pl.Series("Numbers", [1, "Two", 3, "Four"], strict=False)
print(series_hetero)
#
# shape: (4,)
# Series: 'Numbers' [str]
# [
#     "1"
#     "Two"
#     "3"
#     "Four"
# ]
```

Here, we created a series object using the `pl.Series()` function, labelled it, and passed the values that we want in our series.

But you’ll notice that we have provided heterogenous data (data that doesn’t have the same datatype) to the function. Usually, this throws an error. But as we have set the `strict` parameter as False, the function now becomes lenient with the schema of the series. (The schema is just the expected data-type of the values that are to be recorded in the series.)

If no particular schema is defined for a series that’s fed heterogenous data, `pl.Series()` sets the schema to `pl.Utf8` (string datatype). You can see this automatic fixing of the schema in the above example. This prevents the program from bugging, as a string datatype can comprehend characters – numbers as well as symbols.

Also, we can see that datatype of all elements is the same (`pl.Utf8`). This means that the series is homogenous, even though we put heterogenous data in it.

If we define a schema for the series, then the Polars library converts all the records – which show a different datatype than the defined schema – to null objects. This should be clear in the following example:

```py
import polars as pl
# defined the schema as Integer bit 32
series = pl.Series("ints", [1, -2, 3, 4, 5, 'Thirteen', 'Fourteen'], dtype=pl.Int32, strict=False)
print(series)
#
# shape: (7,)
# Series: 'ints' [i32]
# [
#     1
#     -2
#     3
#     4
#     5
#     null
#     null
# ]
```

Here, we can see that the last two entities were ‘String’, but since we set the schema as ‘Integer’, they were reflected as null records.

So as you can see, the leniency of the program depends on whether you set the `strict` parameter to True of False. If we set it as True, we enforce the schema to the data strictly. Upon failing to obey the schema, the program raises an exception. On the other hand, if we set the `strict` parameter as False, the series still preserves its homogenous nature by turning schema-disobeying elements to null.

Now that you understand how series work, we’re ready to move on to DataFrames.

---

## What is a DataFrame?

A DataFrame is a two-dimensional data structure that you can use to store large numbers of related parameters of the collected data. It’s also useful for analyzing that data. A DataFrame is nothing more than the collection of many series, each labelled differently to store different aspects of data.

Here’s the syntax to create a Polars DataFrame object:

```py
var_name = pl.DataFrame({key: value pairs}, schema)
```


The following example shows you how to define a DataFrame object in Python:

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
print(df)
# 
# shape: (10, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# │ ---    ┆ ---         ┆ ---         │
# │ u32    ┆ f64         ┆ f64         │
# ╞════════╪═════════════╪═════════════╡
# │ 1      ┆ 0.0         ┆ 0.0         │
# │ 2      ┆ 0.693147    ┆ 0.30103     │
# │ 3      ┆ 1.098612    ┆ 0.477121    │
# │ 4      ┆ 1.386294    ┆ 0.60206     │
# │ 5      ┆ 1.609438    ┆ 0.69897     │
# │ 6      ┆ 1.791759    ┆ 0.778151    │
# │ 7      ┆ 1.94591     ┆ 0.845098    │
# │ 8      ┆ 2.079442    ┆ 0.90309     │
# │ 9      ┆ 2.197225    ┆ 0.954243    │
# │ 10     ┆ 2.302585    ┆ 1.0         │
# └────────┴─────────────┴─────────────┘
```

Above, we created a Polars DataFrame object with the `pl.DataFrame()` function. In the function, we created a dictionary as an argument for passing the values of the DataFrame.

In the dictionary, each key-value pair represents a series. Each key represents the label of the series, whereas its value represent the values of the series. The values are passed in the form of a list as each key can map to only one value.

Then we defined the schema for the DataFrame. Again, the schema is a dictionary, where each key-value pair corresponds to the schema of the series. In the schema, every key represents the label of the series (to map the schema to the correct series) and its value represents the schema.

In the output, we can see that we got a nice table representing our data. The labels are neatly separated from the data and below them, their schema is also represented.

### What is a Schema?

A schema refers to the definition of the datatype of the series. We fix a particular datatype to the homogenous series to avoid getting in mixed-data.

For example, in the above code, we set the datatype of the column `Number` to `Unsigned Integer - 32 bit (pl.UInt32)` as we don’t want to put negative integers in our NumPy logarithm function.

Now, if we want to hide the datatype (that’s written below each label), we can use the following function:

```py
pl.Config.set_tbl_hide_column_data_types(active=True)
```

### The Head, Tail, and Glimpse Functions

The `head()`, `tail()` and `glimpse()` functions are used to have a quick look at the data by reviewing certain records (rows). These are useful especially for large datasets for taking a look at the data, for example to see which columns are present, what type of data is present in each column, and so on.

The `head()` function prints the given number of rows (passed as the argument of the `head()` function) from the top of the DataFrame. If no argument is passed, it prints the first five rows of the DataFrame.

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)
#
# shape: (3, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪═════════════╪═════════════╡
# │ 1      ┆ 0.0         ┆ 0.0         │
# │ 2      ┆ 0.693147    ┆ 0.30103     │
# │ 3      ┆ 1.098612    ┆ 0.477121    │
# └────────┴─────────────┴─────────────┘
```

In this example, we have the used the same DataFrame that we just created. Then we used the `head()` function to output the first three rows of the DataFrame. Also, you may now notice that the schema representation under column names has disappeared. This is because we used `pl.Config.set_tbl_hide_column_data_types(active=True)`.

The `glimpse()` function presents the data briefly and in a horizontal manner (rows are represented as columns and columns are represented as rows) for better readability.

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)
print(df.glimpse())
# 
# Rows: 10
# Columns: 3
# $ Number      <u32> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
# $ Natural Log <f64> 0.0, 0.6931471805599453, 1.0986122886681098, 1.3862943611198906, 1.6094379124341003, 1.791759469228055, 1.9459101490553132, 2.0794415416798357, 2.1972245773362196, 2.302585092994046
# $ Log Base 10 <f64> 0.0, 0.3010299956639812, 0.47712125471966244, 0.6020599913279624, 0.6989700043360189, 0.7781512503836436, 0.8450980400142568, 0.9030899869919435, 0.9542425094393249, 1.0
# 
# None
```

Here, we used the `glimpse()` function on our previously created DataFrame `df`. We can see the output as our transposed DataFrame. Also, `None` is returned. This is because, by default, `glimpse()` sets its `return_as_string` parameter to `None`. To change it to string, we can set the `return_as_string` parameter to True. The following example shows how to do it:

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)
print(f'Returned as String: \n{df.glimpse(return_as_string=True)}')
# 
# Returned as String: 
# Rows: 10
# Columns: 3
# $ Number      <u32> 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
# $ Natural Log <f64> 0.0, 0.6931471805599453, 1.0986122886681098, 1.3862943611198906, 1.6094379124341003, 1.791759469228055, 1.9459101490553132, 2.0794415416798357, 2.1972245773362196, 2.302585092994046
# $ Log Base 10 <f64> 0.0, 0.3010299956639812, 0.47712125471966244, 0.6020599913279624, 0.6989700043360189, 0.7781512503836436, 0.8450980400142568, 0.9030899869919435, 0.9542425094393249, 1.0
```

In the above code, we can see that the DataFrame is returned as a string and `None` is not returned.

Finally, the `tail()` function outputs the given number of rows (passed as the argument of the `tail()` function) from the bottom of the dataset. When no argument is passed, it outputs the last 5 rows by default.

This is useful for checking if our data was completely loaded. Checking the first few records using the `head()` function and the last few records with the `tail()` function ensures that the data is correctly and totally loaded.

Also, we can check if there are any empty records at the end of the dataset. Having empty records at the end of the dataset can be fatal in some cases. For example, if you have to train an ML model on a dataset and you split the dataset statically into testing and training datasets, the empty rows at the end are going to cause an issue. So, checking our data beforehand is a best practice, and these functions help us do it.

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)
print(df.tail(3))
#
# shape: (3, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪═════════════╪═════════════╡
# │ 8      ┆ 2.079442    ┆ 0.90309     │
# │ 9      ┆ 2.197225    ┆ 0.954243    │
# │ 10     ┆ 2.302585    ┆ 1.0         │
# └────────┴─────────────┴─────────────┘
```

In the above code, we used the `tail()` function on the dataset (that we created earlier) and passed ‘3’ as our argument. Thus our program returned the last three rows of the dataset.

### The Sample Function

The `sample()` function returns a given number of random rows in random order based on their occurrence in the DataFrame. This helps to avoid biased sampling of data.

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)
print(df.sample(3))
# 
# shape: (3, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪═════════════╪═════════════╡
# │ 6      ┆ 1.791759    ┆ 0.778151    │
# │ 5      ┆ 1.609438    ┆ 0.69897     │
# │ 10     ┆ 2.302585    ┆ 1.0         │
# └────────┴─────────────┴─────────────┘
```

We can see in the output that we got random rows of the data in a random order of their occurrence in the dataset (row 5 comes before row 6 in the DataFrame, yet by sampling we got row 5 after row 6.) Sampling is a good practice as it helps avoid overfitting in ML in some cases and gives us a general idea about the entire dataset.

### Concatenating Two DataFrames

In a nutshell, ‘concatenating’ simply means ‘linking’. Adding or linking one dataset to another – basically, stacking one on top of another – is concatenating the two datasets.

For example, in the previous DataFrame, we had numbers from 1 to 10 and their logarithms. Now, if we want to make it 1 to 20, we have to concatenate a different dataset containing numbers 11 to 20 to the former dataset.

The following code shows how this works:

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)

# new dataset created for concatenation
df1 = pl.DataFrame({
    "Number" : [x for x in range(11, 21)],
    "Log Base 10" : [np.log10(x) for x in range(11,21)],
    "Natural Log" : [np.log(x) for x in range(11, 21)]
}, schema=schema)

print(pl.concat([df, df1], how='vertical')) # concatenating the two datasets
#
# shape: (20, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪═════════════╪═════════════╡
# │ 1      ┆ 0.0         ┆ 0.0         │
# │ 2      ┆ 0.693147    ┆ 0.30103     │
# │ 3      ┆ 1.098612    ┆ 0.477121    │
# │ 4      ┆ 1.386294    ┆ 0.60206     │
# │ 5      ┆ 1.609438    ┆ 0.69897     │
# │ …      ┆ …           ┆ …           │
# │ 16     ┆ 2.772589    ┆ 1.20412     │
# │ 17     ┆ 2.833213    ┆ 1.230449    │
# │ 18     ┆ 2.890372    ┆ 1.255273    │
# │ 19     ┆ 2.944439    ┆ 1.278754    │
# │ 20     ┆ 2.995732    ┆ 1.30103     │
# └────────┴─────────────┴─────────────┘
```

In this code, we first created the DataFrame `df`. Then we created another DataFrame `df1`. Next, we used `pl.concat()` to concatenate the DataFrames.

The first argument that we passed is the list of the DataFrames that are to be linked. The `how` parameter defines the manner of concatenation. ‘Vertical’ in this context means that we are linking DataFrames vertically (adding more rows).

The important thing to note here is that schema incompatibility may raise an exception. If the DataFrames that are to be concatenated have different schemas, there will be a schema incompatibility problem. So it’s better to keep the schemas of both the datasets (that are to be concatenated) the same.

Here, we introduced a variable named `schema` containing the schema parameter of the DataFrame and we applied it to both the DataFrames to avoid schema incompatibility.

Also, concatenation occurs in the order of the passed arguments. For example, in the above code, `df` appears prior to `df1`, thus in the linked DataFrame, `df` appears first and then `df1`. If we had changed the sequence of values, the concatenated DataFrame would start from `df1` and then `df`.

The following code explains that:

```py
import polars as pl
import numpy as np

schema = {"Number": pl.UInt32, "Natural Log": None, "Log Base 10": None}

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
pl.Config.set_tbl_hide_column_data_types(active=True)

# new dataset created for concatenation
df1 = pl.DataFrame({
    "Number" : [x for x in range(11, 21)],
    "Log Base 10" : [np.log10(x) for x in range(11,21)],
    "Natural Log" : [np.log(x) for x in range(11, 21)]
}, schema=schema)

print(pl.concat([df1, df], how='vertical')) # sequence changed from [df,df1] to [df1, df]
# 
# shape: (20, 3)
# ┌────────┬─────────────┬─────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪═════════════╪═════════════╡
# │ 11     ┆ 2.397895    ┆ 1.041393    │
# │ 12     ┆ 2.484907    ┆ 1.079181    │
# │ 13     ┆ 2.564949    ┆ 1.113943    │
# │ 14     ┆ 2.639057    ┆ 1.146128    │
# │ 15     ┆ 2.70805     ┆ 1.176091    │
# │ …      ┆ …           ┆ …           │
# │ 6      ┆ 1.791759    ┆ 0.778151    │
# │ 7      ┆ 1.94591     ┆ 0.845098    │
# │ 8      ┆ 2.079442    ┆ 0.90309     │
# │ 9      ┆ 2.197225    ┆ 0.954243    │
# │ 10     ┆ 2.302585    ┆ 1.0         │
# └────────┴─────────────┴─────────────┘
```

Here, we can see that the `df1` appears first and then `df` appears (unlike the previous example). Thus, the sequence of the values matters.

### How to Join Two DataFrames

**Joining** datasets and **concatenating** datasets are two different concepts. While concatenating means ‘linking’ two separate datasets, [**joining**](/freecodecamp.org/understanding-sql-joins.md) refers to combining datasets based on a shared column (a key).  
The computer matches rows from both datasets where the key values are the same.

In the above dataset ‘df’, we’ll add a new column by joining the dataset ‘df’ with another DataFrame.

```py
# new dataframe
new_col = pl.DataFrame({
    "Number" : [x for x in range(1, 11)],
    "Log Base 2" : [np.log2(x) for x in range(1, 11)]
})

new_data = df.join(new_col, on="Number", how="left") # Both have one column same to map values

print(new_data.head())
#
# shape: (5, 4)
# ┌────────┬─────────────┬─────────────┬────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 ┆ Log Base 2 │
# ╞════════╪═════════════╪═════════════╪════════════╡
# │ 1      ┆ 0.0         ┆ 0.0         ┆ 0.0        │
# │ 2      ┆ 0.693147    ┆ 0.30103     ┆ 1.0        │
# │ 3      ┆ 1.098612    ┆ 0.477121    ┆ 1.584963   │
# │ 4      ┆ 1.386294    ┆ 0.60206     ┆ 2.0        │
# │ 5      ┆ 1.609438    ┆ 0.69897     ┆ 2.321928   │
# └────────┴─────────────┴─────────────┴────────────┘
```

In this example, we used the join function on `df` and passed `new_col` as its argument. This is why the columns of the `df` function occur prior to the column of the `new_col` dataset. The parameter `on` should be given a column name on the basis of which the two datasets are to be joined.

Here, we first mapped the elements of the column `Number` and its corresponding rows and joined the DataFrames accordingly.

If we used the `join()` function on the `new_col` DataFrame, the columns of `df` would appear later than the column in `new_col`. The following code will make it clear:

```py
# new dataframe
new_col = pl.DataFrame({
    "Number" : [x for x in range(1, 11)],
    "Log Base 2" : [np.log2(x) for x in range(1, 11)]
})

new_data = new_col.join(df, on="Number", how="left") # passed df as argument

print(new_data.head())
#
# shape: (5, 4)
# ┌────────┬────────────┬─────────────┬─────────────┐
# │ Number ┆ Log Base 2 ┆ Natural Log ┆ Log Base 10 │
# ╞════════╪════════════╪═════════════╪═════════════╡
# │ 1      ┆ 0.0        ┆ 0.0         ┆ 0.0         │
# │ 2      ┆ 1.0        ┆ 0.693147    ┆ 0.30103     │
# │ 3      ┆ 1.584963   ┆ 1.098612    ┆ 0.477121    │
# │ 4      ┆ 2.0        ┆ 1.386294    ┆ 0.60206     │
# │ 5      ┆ 2.321928   ┆ 1.609438    ┆ 0.69897     │
# └────────┴────────────┴─────────────┴─────────────┘
```

You can notice that the column ‘Log Base 2’ appears prior to other columns (unlike in the previous example). Thus this change is significant.

### How to Use the `with_columns()` Function

The `with_columns()` function enables us to make changes to the column and print it as a new column with existing columns from the original dataset. This is similar to the `join()` function.

The following example will make it clear:

```py
import polars as pl
import numpy as np

df = pl.DataFrame(
    {
        "Number" : np.arange(1, 11),
        "Natural Log" : [np.log(x) for x in range(1,11)],
        'Log Base 10' : [np.log10(x) for x in range(1,11)]
        },
    schema=schema
    )
new_data = df.with_columns((np.log2(pl.col("Number"))).alias("Log Base 2"))

print(new_data.head())
#
# shape: (5, 4)
# ┌────────┬─────────────┬─────────────┬────────────┐
# │ Number ┆ Natural Log ┆ Log Base 10 ┆ Log Base 2 │
# ╞════════╪═════════════╪═════════════╪════════════╡
# │ 1      ┆ 0.0         ┆ 0.0         ┆ 0.0        │
# │ 2      ┆ 0.693147    ┆ 0.30103     ┆ 1.0        │
# │ 3      ┆ 1.098612    ┆ 0.477121    ┆ 1.584963   │
# │ 4      ┆ 1.386294    ┆ 0.60206     ┆ 2.0        │
# │ 5      ┆ 1.609438    ┆ 0.69897     ┆ 2.321928   │
# └────────┴─────────────┴─────────────┴────────────┘
```

In this example, we have a DataFrame `df`. To add a column to it , we use the `with_columns()` function. In this function, we selected column named ‘Number’ using the `pl.col()` function and put it inside the `np.log2()` to get the log base 2 value for every record. Finally, to label the new column, we used the `alias()` function, with the label passed to it as an argument.

Now that we know about the basics of DataFrames, let’s look at how we can work with CSV files.

---

## How to Read CSV Files with Polars

Reading CSV files with Polars is extremely similar to how it works in Pandas. For this tutorial, I’ll be using the Titanic Dataset. Here’s the [<VPIcon icon="iconfont icon-kaggle"/>link to the dataset](https://kaggle.com/datasets/yasserh/titanic-dataset?select=Titanic-Dataset.csv) so you can download it. In this part of the tutorial, we’ll be mainly talking about column selection (useful in feature selection) and filtering the data.

Here’s the syntax for reading a CSV file:

```py
var_name = pl.read_csv(“path_dataset“)
```

Example code:

```py
import polars as pl

data = pl.read_csv("/titanic_dataset.csv")
print(data.head())
#
# shape: (5, 12)
# ┌─────────────┬──────────┬────────┬─────────────────────┬───┬─────────┬─────────┬───────┬──────────┐
# │ PassengerId ┆ Survived ┆ Pclass ┆ Name                ┆ … ┆ Ticket  ┆ Fare    ┆ Cabin ┆ Embarked │
# ╞═════════════╪══════════╪════════╪═════════════════════╪═══╪═════════╪═════════╪═══════╪══════════╡
# │ 892         ┆ 0        ┆ 3      ┆ Kelly, Mr. James    ┆ … ┆ 330911  ┆ 7.8292  ┆ null  ┆ Q        │
# │ 893         ┆ 1        ┆ 3      ┆ Wilkes, Mrs. James  ┆ … ┆ 363272  ┆ 7.0     ┆ null  ┆ S        │
# │             ┆          ┆        ┆ (Ellen Need…        ┆   ┆         ┆         ┆       ┆          │
# │ 894         ┆ 0        ┆ 2      ┆ Myles, Mr. Thomas   ┆ … ┆ 240276  ┆ 9.6875  ┆ null  ┆ Q        │
# │             ┆          ┆        ┆ Francis             ┆   ┆         ┆         ┆       ┆          │
# │ 895         ┆ 0        ┆ 3      ┆ Wirz, Mr. Albert    ┆ … ┆ 315154  ┆ 8.6625  ┆ null  ┆ S        │
# │ 896         ┆ 1        ┆ 3      ┆ Hirvonen, Mrs.      ┆ … ┆ 3101298 ┆ 12.2875 ┆ null  ┆ S        │
# │             ┆          ┆        ┆ Alexander (Helg…    ┆   ┆         ┆         ┆       ┆          │
# └─────────────┴──────────┴────────┴─────────────────────┴───┴─────────┴─────────┴───────┴──────────┘
```

We can get the statistical analysis of the data by using the `describe()` function.

```py
print(data.describe())
# 
# shape: (9, 13)
# ┌────────────┬─────────────┬──────────┬──────────┬───┬─────────────┬───────────┬───────┬──────────┐
# │ statistic  ┆ PassengerId ┆ Survived ┆ Pclass   ┆ … ┆ Ticket      ┆ Fare      ┆ Cabin ┆ Embarked │
# ╞════════════╪═════════════╪══════════╪══════════╪═══╪═════════════╪═══════════╪═══════╪══════════╡
# │ count      ┆ 418.0       ┆ 418.0    ┆ 418.0    ┆ … ┆ 418         ┆ 417.0     ┆ 91    ┆ 418      │
# │ null_count ┆ 0.0         ┆ 0.0      ┆ 0.0      ┆ … ┆ 0           ┆ 1.0       ┆ 327   ┆ 0        │
# │ mean       ┆ 1100.5      ┆ 0.363636 ┆ 2.26555  ┆ … ┆ null        ┆ 35.627188 ┆ null  ┆ null     │
# │ std        ┆ 120.810458  ┆ 0.481622 ┆ 0.841838 ┆ … ┆ null        ┆ 55.907576 ┆ null  ┆ null     │
# │ min        ┆ 892.0       ┆ 0.0      ┆ 1.0      ┆ … ┆ 110469      ┆ 0.0       ┆ A11   ┆ C        │
# │ 25%        ┆ 996.0       ┆ 0.0      ┆ 1.0      ┆ … ┆ null        ┆ 7.8958    ┆ null  ┆ null     │
# │ 50%        ┆ 1101.0      ┆ 0.0      ┆ 3.0      ┆ … ┆ null        ┆ 14.4542   ┆ null  ┆ null     │
# │ 75%        ┆ 1205.0      ┆ 1.0      ┆ 3.0      ┆ … ┆ null        ┆ 31.5      ┆ null  ┆ null     │
# │ max        ┆ 1309.0      ┆ 1.0      ┆ 3.0      ┆ … ┆ W.E.P. 5734 ┆ 512.3292  ┆ G6    ┆ S        │
# └────────────┴─────────────┴──────────┴──────────┴───┴─────────────┴───────────┴───────┴──────────┘
```

### How to Select Columns from the Dataset

Now we’re going to learn how to select certain columns from the dataset and transform those columns into a new DataFrame. This can be useful if we want to train an ML model based on only certain columns and not the entire dataset (that is, using feature selection).

Let’s first look at the code below:

```py
new_df = data.select(
    pl.col("Survived"),
    pl.col("Name"),
    pl.col("Age"),
    pl.col("Sex")
)

print(new_df.head())
#
# shape: (5, 4)
# ┌──────────┬─────────────────────────────────┬──────┬────────┐
# │ Survived ┆ Name                            ┆ Age  ┆ Sex    │
# ╞══════════╪═════════════════════════════════╪══════╪════════╡
# │ 0        ┆ Kelly, Mr. James                ┆ 34.5 ┆ male   │
# │ 1        ┆ Wilkes, Mrs. James (Ellen Need… ┆ 47.0 ┆ female │
# │ 0        ┆ Myles, Mr. Thomas Francis       ┆ 62.0 ┆ male   │
# │ 0        ┆ Wirz, Mr. Albert                ┆ 27.0 ┆ male   │
# │ 1        ┆ Hirvonen, Mrs. Alexander (Helg… ┆ 22.0 ┆ female │
# └──────────┴─────────────────────────────────┴──────┴────────┘
```

In the code above, we selected four columns using the `select()` and `pl.col()` functions from the Titanic Dataset and transformed them into a new DataFrame called `new_df`.

Now, we can filter this data however we want. Let’s make a new DataFrame by filtering out only surviving passengers from the dataset:

```py
survived_data = data.select(
    pl.col("Survived"),
    pl.col("Name"),
    pl.col("Age"),
    pl.col("Sex")
).filter(pl.col("Survived")==1)

print(survived_data.head())
# 
# shape: (5, 4)
# ┌──────────┬─────────────────────────────────┬──────┬────────┐
# │ Survived ┆ Name                            ┆ Age  ┆ Sex    │
# ╞══════════╪═════════════════════════════════╪══════╪════════╡
# │ 1        ┆ Wilkes, Mrs. James (Ellen Need… ┆ 47.0 ┆ female │
# │ 1        ┆ Hirvonen, Mrs. Alexander (Helg… ┆ 22.0 ┆ female │
# │ 1        ┆ Connolly, Miss. Kate            ┆ 30.0 ┆ female │
# │ 1        ┆ Abrahim, Mrs. Joseph (Sophie H… ┆ 18.0 ┆ female │
# │ 1        ┆ Snyder, Mrs. John Pillsbury (N… ┆ 23.0 ┆ female │
# └──────────┴─────────────────────────────────┴──────┴────────┘
```

In the above code, we used the `filter()` function. This function helps us gather data that applies to our given condition. In the above example, we added the condition that, “Every element in the column named ‘Survived’ should be equal to 1”. Hence, we got our required data.

---

## Some Other Important Functions

### How to Print the Names of the Columns of a Dataset

You can print the names of a column using the `columns` method. The following code shows how to use the columns method:

```py
print(data.columns) # data --> Titanic Dataset
# 
# ['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked']
```

### How to Index a Dataset

Indexing a dataset means adding an index column to the existing dataset. It can prove useful in keeping track of the rows of the dataset.

We can index the dataset using the `with_row_index()` function. Inside this function, we can pass the argument to name this new index column. If we don’t pass any argument, the index column name is set as ‘index’ by default.

```py
data = pl.read_csv("/titanic_dataset.csv").with_row_index('#') # naming the index column as '#'
print(data.head())
#
# shape: (5, 13)
# ┌─────┬─────────────┬──────────┬────────┬───┬─────────┬─────────┬───────┬──────────┐
# │ #   ┆ PassengerId ┆ Survived ┆ Pclass ┆ … ┆ Ticket  ┆ Fare    ┆ Cabin ┆ Embarked │
# │ --- ┆ ---       ┆ ---    ┆ ---  ┆   ┆ ---   ┆ ---   ┆ --- ┆ ---    │
# │ u32 ┆ i64         ┆ i64      ┆ i64    ┆   ┆ str     ┆ f64     ┆ str   ┆ str      │
# ╞═════╪═════════════╪══════════╪════════╪═══╪═════════╪═════════╪═══════╪══════════╡
# │ 0   ┆ 892         ┆ 0        ┆ 3      ┆ … ┆ 330911  ┆ 7.8292  ┆ null  ┆ Q        │
# │ 1   ┆ 893         ┆ 1        ┆ 3      ┆ … ┆ 363272  ┆ 7.0     ┆ null  ┆ S        │
# │ 2   ┆ 894         ┆ 0        ┆ 2      ┆ … ┆ 240276  ┆ 9.6875  ┆ null  ┆ Q        │
# │ 3   ┆ 895         ┆ 0        ┆ 3      ┆ … ┆ 315154  ┆ 8.6625  ┆ null  ┆ S        │
# │ 4   ┆ 896         ┆ 1        ┆ 3      ┆ … ┆ 3101298 ┆ 12.2875 ┆ null  ┆ S        │
# └─────┴─────────────┴──────────┴────────┴───┴─────────┴─────────┴───────┴──────────┘
```

### How to Rename Columns in the Dataset

Lastly, to rename columns in the Dataset, we use the `rename()` function.

```py
data = pl.read_csv("/titanic_dataset.csv").with_row_index('#').rename({'PassengerId':'renamed_col'})
print(data.head())
# 
# shape: (5, 13)
# ┌─────┬─────────────┬──────────┬────────┬───┬─────────┬─────────┬───────┬──────────┐
# │ #   ┆ renamed_col ┆ Survived ┆ Pclass ┆ … ┆ Ticket  ┆ Fare    ┆ Cabin ┆ Embarked │
# │ --- ┆ ---       ┆ ---    ┆ ---  ┆   ┆ ---   ┆ ---   ┆ --- ┆ ---    │
# │ u32 ┆ i64         ┆ i64      ┆ i64    ┆   ┆ str     ┆ f64     ┆ str   ┆ str      │
# ╞═════╪═════════════╪══════════╪════════╪═══╪═════════╪═════════╪═══════╪══════════╡
# │ 0   ┆ 892         ┆ 0        ┆ 3      ┆ … ┆ 330911  ┆ 7.8292  ┆ null  ┆ Q        │
# │ 1   ┆ 893         ┆ 1        ┆ 3      ┆ … ┆ 363272  ┆ 7.0     ┆ null  ┆ S        │
# │ 2   ┆ 894         ┆ 0        ┆ 2      ┆ … ┆ 240276  ┆ 9.6875  ┆ null  ┆ Q        │
# │ 3   ┆ 895         ┆ 0        ┆ 3      ┆ … ┆ 315154  ┆ 8.6625  ┆ null  ┆ S        │
# │ 4   ┆ 896         ┆ 1        ┆ 3      ┆ … ┆ 3101298 ┆ 12.2875 ┆ null  ┆ S        │
# └─────┴─────────────┴──────────┴────────┴───┴─────────┴─────────┴───────┴──────────┘
```

In the above example, we renamed the column named ‘PassengerId’ to ‘renamed_col’.

---

## Summary

Now you know how to work with the Polars Python library to analyze your data more effectively.

In this article, you learned:

- What Polars is and how to install it
- How to define series and DataFrames in Polars
- Different functions to deal with DataFrames.
- How to read and work with CSV files in Polars

Thanks for Reading, and happy data wrangling!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Polars Library in Python for Data Analysis",
  "desc": "In this article, I’ll give you a beginner-friendly introduction to the Polars library in Python. Polars is an open-source library, originally written in Rust, which makes data wrangling easier in Python. The syntax of Polars is very similar to Pandas...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-polars-library-in-python-for-data-analysis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
