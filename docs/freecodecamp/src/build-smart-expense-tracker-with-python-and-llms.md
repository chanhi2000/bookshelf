---
lang: en-US
title: "How to Build a Smart Expense Tracker with Python and LLMs"
description: "Article(s) > How to Build a Smart Expense Tracker with Python and LLMs"
icon: fa-brands fa-python
category:
  - Python
  - Pandas
  - Matplotlib
  - Streamlit
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - matplotlib
  - py-matplotlib
  - streamlit
  - py-streamlit
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Smart Expense Tracker with Python and LLMs"
    - property: og:description
      content: "How to Build a Smart Expense Tracker with Python and LLMs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-smart-expense-tracker-with-python-and-llms.html
prev: /programming/py-pandas/articles/README.md
date: 2025-09-09
isOriginal: false
author:
  - name: Happiness Omale
    url : https://freecodecamp.org/news/author/Codinghappiness/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757342938389/164c8a45-d566-4de4-9a0f-cc9c270ce262.png
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

```component VPCard
{
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Smart Expense Tracker with Python and LLMs"
  desc="Imagine that you’re sipping a hot latte from Starbucks on your way to work. You quickly swipe your card, and the receipt gets lost in your bag. Later in the day, you pay for an Uber ride, order lunch, and buy airtime. By evening, you know you’ve spen..."
  url="https://freecodecamp.org/news/build-smart-expense-tracker-with-python-and-llms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757342938389/164c8a45-d566-4de4-9a0f-cc9c270ce262.png"/>

Imagine that you’re sipping a hot latte from Starbucks on your way to work. You quickly swipe your card, and the receipt gets lost in your bag. Later in the day, you pay for an Uber ride, order lunch, and buy airtime. By evening, you know you’ve spent money, but you can’t say precisely how much, or where most of it went.

That’s the challenge with personal finance. Traditional expense trackers exist, but most require you to manually enter every detail, select categories, and run reports. After a while, you stop keeping track because it feels like more work than it’s worth.

But what if your tracker were smart? What if it could:

- Automatically understand that “Dominos Pizza” should be categorized under *Food & Drinks*.
- Summarize your weekly spending in plain English, like: *“This week, you spent $32,000 on transportation, $15,000 on food, and $8,000 on shopping.”*
- Even show you a neat pie chart of where your money went?

In this tutorial, we’ll build exactly that, a Smart Expense Tracker using Python and Large Language Models (LLMs). We’ll start with a simple Python tracker, then gradually enhance it with:

1. A data storage system for expenses.
2. Automatic categorization using LLMs.
3. Visualizations to make spending patterns more straightforward.

By the end, you’ll have an expense tracker that doesn’t just record data, it actually talks back, understands your spending, and helps you make better financial decisions.

---

## How to Set Up the Expense Data

Before you can build an expense tracker, you need real transaction data. Instead of creating a CSV from scratch, let’s use a dataset from Kaggle: [<VPIcon icon="iconfont icon-kaggle"/>My Expenses Data by Tharun Prabu](https://kaggle.com/datasets/tharunprabu/my-expenses-data).

This dataset contains detailed personal expenses with columns like:

- Date: timestamp of the transaction.
- Account: where the payment came from (bank account, card, and so on).
- Category / Subcategory: expense type.
- Note: a short description like “Brownie” or “Metro.”
- Amount: how much was spent.
- Income/Expense: distinguishes between money earned vs spent.
- Some columns (like `Note.1`, `Account.1`) look redundant and can be cleaned up.

### How to Load the Data in Python

Use pandas to read the CSV:

```py
import pandas as pd

df = pd.read_csv("Expense_data_1.csv")
print(df.head())
```

::: info Here’s what’s happening line by line:

- `import pandas as pd`: We loaded the pandas library and gave it a short abbreviation (`pd`) so we don’t have to type `pandas` over and over again.
- `pd.read_csv("Expense_data_1.csv")`: This reads your expense dataset from a CSV file into a DataFrame.
- `df.head()`: Shows you the first 5 rows of the dataset, allowing you to quickly examine the structure of columns such as *Date, Description, Amount, Category,* and so on.

:::

Output:

![Table showing sample expense data with columns Date, Account, Category, Note, and Amount](https://cdn.hashnode.com/res/hashnode/image/upload/v1756334641937/a87e1fe8-2fa8-4b95-9732-b52ee836f7b1.jpeg)

### How to Clean the Data

Since you don’t need all the columns, clean the dataset to keep only the useful ones for the tracker.

```py
data = df[["Date", "Category", "Note", "Amount", "Income/Expense"]]
print(data.head())
```

::: info Here’s what’s happening:

- `df[...]`: This tells pandas that you only want to select specific columns from the full DataFrame.
- `["Date", "Category", "Note", "Amount", "Income/Expense"]`: These are the columns we’ve chosen to keep:
  - `Date` : When the expense happened
  - `Category`: Label like Food, Transport, Entertainment
  - `Note`: Short description (for example, “Shawarma”, “Uber ride”)
  - `Amount`: How much you spent
  - `Income/Expense`: Whether it’s money going out or money coming in
  - `print(data.head())`: Again, we look at the first 5 rows to make sure our dataset now looks clean and focused.

:::

Output:

![Table showing sample expense data with columns Date, Category, Note, Amount, and Expense/Income.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756335752749/13188d2d-b5ad-4dcf-b219-5b2f704767a1.jpeg)

Now we have a clean dataset with:

- `Date`
- `Category`
- `Note` (short description)
- `Amount`
- `Income/Expense`

This is enough to start building our basic expense tracker.

---

## How to Build a Basic Expense Tracker

Imagine it’s the weekend:

- On Friday evening, you grab a shawarma after work.
- On Saturday morning, you pay for your Netflix subscription to catch up on your favorite series.
- Later that day, you order an Uber ride to meet friends.
- On Sunday afternoon, you join them for outdoor games at a local sports center.

Wouldn’t it be nice to log all these automatically in your tracker and then see at a glance how much you’ve spent just over the weekend? Let’s do that.

### 1. How to Add Multiple Expenses

We’ll write a function that takes a date, category, note, amount, and type (Income/Expense) and appends it to our dataframe.

```py
def add_expense(date, category, note, amount, exp_type="Expense"):
    global data
    new_entry = {
        "Date": date,
        "Category": category,
        "Note": note,
        "Amount": amount,
        "Income/Expense": exp_type
    }
    data = data.append(new_entry, ignore_index=True)
    print(f" Added: {note} - {amount} ({category})")

add_expense("2025-08-22 19:30", "Food", "Shawarma", 2500, "Expense")
add_expense("2025-08-23 08:00", "Subscriptions", "Netflix Monthly Plan", 4500, "Expense")
add_expense("2025-08-24 14:00", "Entertainment", "Outdoor Games with friends", 7000, "Expense")
```

::: info Here’s what’s happening:

- `def add_expense(...)`: We defined a function called `add_expense` that takes in the details of a new transaction.
- `global data`: This ensures the new expense is added to your main dataset (`data`) instead of a temporary copy.
- `new_entry = {...}`: We created a dictionary for the new row, with keys matching the columns in our DataFrame.
- `data.append(...)`: Adds the new entry to our dataset. The `ignore_index=True` makes sure the row index resets properly.
- `print(...)`: Confirms what was just added.

:::

Output:

![Image showing added expense data](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456560141/93cc57ca-cfcb-4a40-892d-9657b00a5918.jpeg)

### 2. How to View Recent Expenses

```py
def view_expenses(n=5):
    return data.tail(n)
print(view_expenses(5))
```

::: info Here’s what’s happening

- `def view_expenses(n=5):`: Defines a function that shows the last `n` rows from our dataset. By default, `n=5`, so it shows the 5 most recent expenses.
- `data.tail(n)`: Pandas `tail()` method returns the bottom `n` rows of the DataFrame.
- `print(view_expenses(5))`: Prints out the 5 latest expenses so we can quickly confirm that they were recorded correctly.

:::

Output:

![Table showing recent expense data with columns Date, Category, Note, Amount, and Income/Expensed Currency.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456611837/f571b6ee-3bd0-45a8-b7cd-2d6a67f0e242.jpeg)

### 3. How to Summarize Spending

```py
def summarize_expenses(by="Category"):
    summary = data[data["Income/Expense"]=="Expense"].groupby(by)["Amount"].sum()
    return summary.sort_values(ascending=False)
print(summarize_expenses())
```

::: info Here’s what’s happening

1. `data[data["Income/Expense"]=="Expense"]`: Filters the dataset to include only expenses (ignores income).
2. `.groupby(by)["Amount"].sum()`: Groups expenses by a column (default = `"Category"`) and adds up all amounts in each group. For example, all *Food* expenses are summed together.
3. `.sort_values(ascending=False)`: Sorts categories by total spending from highest to lowest.

:::

Output:

![Table showing summary of expenses](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456680569/4e86263c-4b7b-4f00-80e2-d633b8c479cd.jpeg)

This shows that over the weekend:

- You spent 7000 on *Entertainment* (outdoor games).
- 4500 went to *Subscriptions* (Netflix).
- 25896 on *Food*.

This tracker makes it crystal clear where your money goes. Even without AI yet.

---

## How to Make It Smart with LLMs (Auto-Categorization)

We’ll use an LLM to read the Note column (like *Shawarma*, *Netflix*, *Uber*, *Football game*) and then automatically assign the most relevant Category.

### 1. Choose an LLM API

- You can use OpenAI GPT.
- Example categories we’ll support:
  - Food
  - Transportation
  - Entertainment
  - Other

### 2. Prompt the LLM

We’ll send something like:

```md
“Categorize this expense note into one of these: Food, Transportation, Entertainment, Other. Note: Netflix.”  
```

The model will return: `Subscription`.

### 3. Integrate into our pipeline

- Save the predicted Category back into the dataset.

```py
from openai import OpenAI  
client = OpenAI(api_key="YOUR_API_KEY")

def auto_categorize(note):
    prompt = f"""
    Categorize this expense note into one of these categories: 
    Food, Transportation, Entertainment, Other.
    Note: {note}
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return "Other"

data['Category'] = data.apply(
    lambda row: auto_categorize(row['Note']) if pd.isna(row['Category']) else row['Category'],
    axis=1
)

print(data[['Note', 'Category']].head(10))
```

::: info Here’s what’s happening:

1. Prompt engineering: We clearly instruct the model:
    - Choose from *Food, Transportation, Entertainment, Other*.
    - Give it the `Note` (for example, *Shawarma*, *Uber ride*, *Netflix Monthly Plan*).
2. OpenAI API call: Sends the request to `gpt-4o-mini` (a fast, lightweight model).
3. Returns prediction: Model picks the most likely category.
4. If a row’s Category is missing, it asks the LLM to predict one from the note.
5. Otherwise, it keeps the user’s manually entered category.
6. `data[['Note', 'Category']]`: Selects only the Note (user input) and Category (AI-predicted or user-provided) columns.
7. `.head(10)`: Shows the first 10 rows for a quick check.

:::

Output:

![Table showing categorization of expenses](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456793309/83f686cf-658c-4456-8d21-0ca8a80e2b20.jpeg)

Now, our tracker is smart enough to automatically guess categories.

---

## How to Visualize Expenses

Currently, our tracker is smart - it can recognize a line like *“Paid 7,000 for Netflix”* and categorize it under Subscription. But raw numbers in a table still don’t give you that “aha!” moment. What we need is a way to see where the money is going.

Let’s imagine that it’s the end of the month. You’re staring at your bank balance, wondering, *“Where did all my money go?”* Instead of scrolling endlessly through transactions, our tracker provides a clear dashboard with visuals that tell the story at a glance.

We’ll use Matplotlib to build two charts:

1. Pie Chart – to see the percentage share of each category.
2. Bar Chart – to compare actual amounts spent across categories.

```py
import matplotlib.pyplot as plt
expense_summary = data[data['Category'] != 'Income'].groupby("Category")["Amount"].sum()

# Pie Chart
plt.figure(figsize=(6,6))
expense_summary.plot.pie(autopct='%1.1f%%', startangle=90, shadow=True)
plt.title("Expenses Breakdown by Category")
plt.ylabel("")
plt.show()

# Bar Chart
plt.figure(figsize=(8,5))
expense_summary.plot(kind="bar", color="skyblue", edgecolor="black")
plt.title("Expenses by Category")
plt.xlabel("Category")
plt.ylabel("Amount Spent")
plt.show()
```

::: info Here’s what’s happening:

1. `groupby("Category")["Amount"].sum()`: Groups the dataset by category and calculates the total spent per category.
2. Pie Chart: Quickly shows the *percentage breakdown* of expenses across categories. For example, if “Food” is 20% of spending, you’ll see that instantly.
3. Bar Chart: Shows *absolute values* of spending by category, which makes it easy to see which category has the highest or lowest total spend.

:::

Output:

![Pie chart showing percentage breakdown of expenses by category, with each slice representing spending areas like Food, Entertainment, and Transportation.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456884383/663058d1-e9f9-428d-912d-8a16cd456235.jpeg)

![Bar chart showing total expenses grouped by category, highlighting spending differences such as Food, Transportation, Entertainment, and Gift.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756456902426/abbef7c3-0575-45a1-8a67-f9d06f2948fd.jpeg)

What these visuals tell us:

- The pie chart answers the question: *"What's taking most of my money?"*
- The bar chart makes it easy to compare categories side by side. For example, you might realize that you're spending almost as much on transportation as you do on subscriptions and social life combined.

At this point, you’ve moved from raw numbers to actionable insights.

---

## How to Build a Simple Expense Tracker Streamlit Dashboard

Imagine you’re done coding and now you want to see your spending habits in a sleek dashboard you built yourself. That’s where Streamlit comes in.

With just a few lines, you can turn your expense tracker into an interactive web app where you can enter new expenses directly from the app, update the DataFrame in real time, categorize them automatically with LLMs, and see updated charts. And also save them to your <VPIcon icon="fas fa-file-csv"/>`expenses.csv`

```py :collapsed-lines
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import os

from openai import OpenAI
client = OpenAI(api_key="YOUR_API_KEY")

def predict_category(description):
    prompt = f"""
    You are a financial assistant. Categorize this expense into one of:
    ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Others'].

    Expense: "{description}"
    Just return the category name.
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return response.choices[0].message.content.strip()

csv_file = "expense_data_1.csv"
if os.path.exists(csv_file):
    data = pd.read_csv(csv_file)
else:
    data = pd.DataFrame(columns=["Date", "Description", "Amount", "Category"])

st.title("Smart Expense Tracker")

with st.form("expense_form"):
    date = st.date_input("Date")
    description = st.text_input("Description")
    amount = st.number_input("Amount", min_value=0.0, format="%.2f")

    predicted_category = ""
    if description:
        predicted_category = predict_category(description)

    category = st.text_input(
        "Category (auto-predicted, but you can edit)", 
        value=predicted_category
    )

    submitted = st.form_submit_button("Add Expense")

    if submitted:
        new_expense = {"Date": date, "Description": description, "Amount": amount, "Category": category}
        data = pd.concat([data, pd.DataFrame([new_expense])], ignore_index=True)
        data.to_csv(csv_file, index=False)
        st.success(f"Added: {description} - {amount} ({category})")

st.subheader("All Expenses")
st.dataframe(data)

if not data.empty:
    st.subheader("Expense Breakdown by Category")

    category_totals = data.groupby("Category")["Amount"].sum()

    # Bar Chart
    fig, ax = plt.subplots()
    category_totals.plot(kind="bar", ax=ax)
    ax.set_ylabel("Amount")
    st.pyplot(fig)

    # Pie Chart
    st.subheader("Category Distribution")
    fig2, ax2 = plt.subplots()
    category_totals.plot(kind="pie", autopct="%1.1f%%", ax=ax2)
    st.pyplot(fig2)
```

::: info Here’s what’s happening:

1. Form Input with Smart Predictions
    - Users enter Date, Description, and Amount.
    - As soon as you type “Netflix subscription”, the LLM auto-suggests *Entertainment*.
2. Storing Expenses in a CSV File
    - Each new entry is saved back into <VPIcon icon="fas fa-file-csv"/>`expense_data_1.csv`, so your history doesn’t disappear when you restart the app.
3. Interactive Dashboard
    - A table shows all recorded expenses.
    - Bar and Pie charts update instantly as new data is added.

:::

Run the file:

![Image showing how to run your Streamlit app](https://cdn.hashnode.com/res/hashnode/image/upload/v1756468770764/8ab43931-cd37-4791-826f-2ec47bb8dd4b.jpeg)

Output:

![Image of the Streamlit expense tracker app showing an input form with fields for Date, Description, Amount, and auto-predicted Category, followed by a table of recorded expenses, and charts displaying spending breakdown by category.](https://cdn.hashnode.com/res/hashnode/image/upload/v1756458330622/83081c5e-4be7-4dc6-a32c-02a5cf78371a.jpeg)

### Conclusion

Using Streamlit to build a personal expense tracker is a practical way to combine data collection, visualization, and AI assistance in a single interactive application. In addition to logging entries, we integrated an LLM-powered feature to auto-predict expense categories, making the process easier for users who prefer not to tag every transaction manually.

This project shows how tools, including Streamlit for interactivity, Pandas for data processing, and LLMs for intelligent predictions, can be combined to solve everyday problems in a simple yet powerful manner. Whether for personal use or as a portfolio project, this tracker demonstrates how machine learning and data science skills can be applied to real-world use cases that make life easier.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Smart Expense Tracker with Python and LLMs",
  "desc": "Imagine that you’re sipping a hot latte from Starbucks on your way to work. You quickly swipe your card, and the receipt gets lost in your bag. Later in the day, you pay for an Uber ride, order lunch, and buy airtime. By evening, you know you’ve spen...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/build-smart-expense-tracker-with-python-and-llms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
