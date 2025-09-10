---
lang: en-US
title: "Data Collection and Cleaning"
description: "Article(s) > (2/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
icon: iconfont icon-r
category:
  - R
  - AI
  - LLM
  - Ollama
  - DevOps
  - Docker
  - Python
  - Java
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - r
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - ollama
  - devops
  - docker
  - py
  - python
  - java
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/9) How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
    - property: og:description
      content: "Data Collection and Cleaning"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/data-collection-and-cleaning.html
date: 2025-04-15
isOriginal: false
author:
  - name: Elabonga Atuo
    url : https://freecodecamp.org/news/author/Ellabee/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language",
  "desc": "A Large Language Model (LLM) is a type of machine learning model that is trained to understand and generate human-like text. These models are trained on vast datasets to capture the nuances of human language, enabling them to generate coherent and co...",
  "link": "/freecodecamp.org/build-a-local-rag-app-with-ollama-and-chromadb-in-r/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Local RAG App with Ollama and ChromaDB in the R Programming Language"
  desc="A Large Language Model (LLM) is a type of machine learning model that is trained to understand and generate human-like text. These models are trained on vast datasets to capture the nuances of human language, enabling them to generate coherent and co..."
  url="https://freecodecamp.org/news/build-a-local-rag-app-with-ollama-and-chromadb-in-r#heading-data-collection-and-cleaning"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744638731389/83993a5e-7a4d-4615-a8c5-582008115fc4.png"/>

The chatbot you are building will be a cooking assistant that suggests recipes given your available ingredients, what you want to eat, and how much food a recipe yields.

You first have to get the data to train the model. You will be using a [<VPIcon icon="iconfont icon-kaggle"/>dataset](https://kaggle.com/datasets/paultimothymooney/recipenlg) that contains recipes from Kaggle.

To start, load the necessary libraries:

```r
# loading required libraries
library(xml2) #read, parse, and manipulate XML,HTML documents
library(jsonlite) #manipulate JSON objects

library(RKaggle) # download datasets from Kaggle 
library(dplyr)   # data manipulation
```

Then download and save recipe dataset:

```r
# Download and read the "recipe" dataset from Kaggle
recipes_list <- RKaggle::get_dataset("thedevastator/better-recipes-for-a-better-life")
```

Inspect the dataframe and extract the first element like this:

```r
# inspect the dataset
class(recipes_list)
str(recipes_list)
head(recipes_list)
# extract the first tibble
recipes_df <- recipes_list[[1]]
```

A quick inspection of the `recipes_list` object shows that it contains two objects of type tibble. You will be using only the first element for this project. A tibble is a type of data structure used for storing and manipulating data. It’s similar to a traditional dataframe, but it’s designed to enforce stricter rules and perform fewer automatic actions compared to traditional dataframes.

We’ll use a regular dataframe in this project because more people are likely familiar with it. It can also efficiently handle row indexing, which is crucial for accessing and manipulating specific rows in our recipe dataset.

In the code block below, you’ll convert the tibble to a dataframe and then drop the first column, which is the index column. Then you’ll inspect the newly converted dataframe and drop unnecessary columns.

Unnecessary columns are best removed to streamline the dataset and focus on relevant features. In this project, we’ll drop certain columns that aren’t particularly useful for training the chatbot. This ensures that the model concentrates on meaningful data to improve its accuracy and functionality.

```r
# convert to dataframe and drop the first column
recipes_df <- as.data.frame(recipes_df[, -1])
# inspect the converted dataframe
head(recipes_df)
class(recipes_df)
colnames(recipes_df)
# drop unnecessary columns
cleaned_recipes_df <- subset(recipes_df, select = -c(yield,rating,url,cuisine_path,nutrition,timing,img_src))
```

Now you need to identify rows with NA (missing) values, which you can do like this:

```r
# Identify rows and columns with NA values
which(is.na(cleaned_recipes_df), arr.ind = TRUE)

# a quick inspection reveals columns [2:4] have missing values
subset_column_names <- colnames(cleaned_recipes_df)[2:4]
subset_column_names
```

It is important to handle NA values to ensure that your data is complete, to prevent errors, and to preserve context.

Now, replace the NA values and confirm that there are no missing values:

```r :collapsed-lines
# Replace NA values dynamically based on conditions
cols_to_modify <- c("prep_time", "cook_time", "total_time")
cleaned_recipes_df[cols_to_modify] <- lapply(
  cleaned_recipes_df[cols_to_modify],
  function(x, df) {
    # Replace NA in prep_time and cook_time where both are NA
    replace(x, is.na(df$prep_time) & is.na(df$cook_time), "unknown")
  },
  df = cleaned_recipes_df  # Pass the whole dataframe for conditions
)
cleaned_recipes_df <- cleaned_recipes_df %>%
  mutate(
    prep_time = case_when(
      # If cooktime is present but preptime is NA, replace with "no preparation required"
      !is.na(cook_time) & is.na(prep_time) ~ "no preparation required",
      # Otherwise, retain original value
      TRUE ~ as.character(prep_time)
    ),
    cook_time = case_when(
      # If prep_time is present but cook_time is NA, replace with "no cooking required"
      !is.na(prep_time) & is.na(cook_time) ~ "no cooking required",
      # Otherwise, retain original value
      TRUE ~ as.character(cook_time)
    )
  )
# confirm there are no missing values
any(is.na(cleaned_recipes_df))
)

# confirm the replacing NA logic works by inspecting specific rows
cleaned_recipes_df[1081,]
cleaned_recipes_df[1,]
cleaned_recipes_df[405,]
```

For this tutorial, we’ll subset the dataframe to the first 250 rows for demo purposes. This saves on time when it comes to generating embeddings.

```r
# recommended for demo/learning purposes
cleaned_recipes_df <- head(cleaned_recipes_df,250)
```
