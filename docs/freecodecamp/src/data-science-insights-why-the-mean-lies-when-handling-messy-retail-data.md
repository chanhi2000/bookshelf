---
lang: en-US
title: "Data Science Insights: Why the Mean Lies When Handling Messy Retail Data"
description: "Article(s) > Data Science Insights: Why the Mean Lies When Handling Messy Retail Data"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - Science
  - Mathematics
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - science
  - math
  - mathematics
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Data Science Insights: Why the Mean Lies When Handling Messy Retail Data"
    - property: og:description
      content: "Data Science Insights: Why the Mean Lies When Handling Messy Retail Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-science-insights-why-the-mean-lies-when-handling-messy-retail-data.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Rakshath Naik
    url: https://freecodecamp.org/news/author/rakshath1/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4441dcfc-d100-4613-9937-9c62449c6780.png
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
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Mathematics > Article(s)",
  "desc": "Article(s)",
  "link": "/academcis/math/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Data Science Insights: Why the Mean Lies When Handling Messy Retail Data"
  desc="In our daily life, we use the word ”average” all the time: average salary, average marks, average age, and so on. Let's take the case of a retail shop. If we're looking at the average order value to u"
  url="https://freecodecamp.org/news/data-science-insights-why-the-mean-lies-when-handling-messy-retail-data"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4441dcfc-d100-4613-9937-9c62449c6780.png"/>

In our daily life, we use the word "average" all the time: average salary, average marks, average age, and so on.

Let's take the case of a retail shop. If we're looking at the average order value to understand customer spending, we'd load the data, run the code, and get a result of $20 per order.

Done.

Except something looks odd.

When we take a closer look, we see that most customers are buying items worth 8−15. So where's $20 coming from?

In that case, the problem isn’t data – it’s the average. This is a clean textbook trap where everything works perfectly in the textbook, but real-world data doesn’t behave nicely.

Some customers buy in bulk (very large orders), some return orders (negative quantities), and a few anomalies distort the entire picture.

In this article, we'll use the Online Retail Dataset to answer a simple but tricky question: What does “average” really mean in the real world?

::: note Prerequisites

To follow along here, you'll need:

**Basic Python knowledge:** Understanding of variables and functions.

**The Pandas library:** Familiarity with loading data and basic DataFrame operations.

**A development environment:** Access to a tool like Jupyter Notebook, VS Code, or Google Colab.

**A Dataset:** For this analysis, I used the Online Retail Dataset, which is available for download [<VPIcon icon="fas fa-globe"/>here](https://archive.ics.uci.edu/dataset/352/online+retail).

:::

---

## The Dataset

We'll work with the Online Retail Dataset, a real-world transactional dataset containing purchase records from a UK-based online retail store.

1. **Source:** UCI Machine Learning Repository
2. **Collected by:** UK-based online retail company (2010–2011)
3. **Size:** 541,909 transactions
4. **Features:** 8 attributes (InvoiceNo, StockCode, Description, Quantity, InvoiceDate, UnitPrice, CustomerID, Country)
5. **Ownership:** Public dataset hosted by UCI
6. **License:** Open for research and educational use

---

## Mean: The Sensitive Giant

In statistics and data analysis, the terms "**average**" and "**arithmetic mean**" are often used interchangeably. We aim to find the mean total price in our dataset. Mean in the context of the Online Retail Dataset is given as:

Average Order Value=Sum of all TotalPrice valuesNumber of transactions

In our dataset, the mean is calculated by summing all transaction values (including bulk purchases and returns) and dividing by the total number of transactions. This means every value, irrespective of unusually high or any negative values, directly influences the final average.

```py
# Load the dataset
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00352/Online%20Retail.xlsx"
df = pd.read_excel(url, engine='openpyxl')

# Clean and Feature Engineering
df = df.dropna(subset=['CustomerID'])
df['TotalPrice'] = df['Quantity'] * df['UnitPrice']

# Calculate the Mean (Average Order Value)
mean_value = df['TotalPrice'].mean()
print(f"Average Order Value (Mean): {mean_value:.2f}")
```

The results are as follows:

```py
Average Order Value (Mean): 20.40
```

At first glance, the results may look promising: every transaction contributes equally. But that’s where the problem lies. Sometimes a few transactions, which are extremely high or low, affect the mean for all customers who lie in the closer range.

Take a look at the graph for the mean below.

![The graph shows the calculated mean for the Online Retail Dataset, where we get a mean of 20.40](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/583bebff-0e5e-44b8-80cb-48e4662b9abf.png)

The graph shows the mean Total Price for the Online Retail Dataset. We get a mean of 20.42. (Image by Author)

The graph shows **a right-skewed distribution** where the calculated mean of 20.40 is actually a textbook trap. The tallest bar clearly shows that the majority of transactions lie in the range of 8−15 range, but the **red line** is being dragged to the right by the **long tail** of high-value bulk orders by some customers.

In this scenario, the average price is well above what a typical customer actually spends because it's highly sensitive to outliers – and in reality, the bulk of the data lives in the lower price range.

In simple words, the mean is being pulled by some extreme values to the right, especially by some lying in the range of 200–300, which is noticeable in the graph.

---

## Median: The Robust Middle

When the mean is distorted by extreme values, we need a metric that remains unaffected by such outliers. This is where the median comes into play.

Median is defined as the **middle value after sorting the data.**

In our dataset, we sort all the transactions and pick the middle one.

The formula for calculating the median is:

$$
\text{Median}=
\begin{cases}X_{\left[\frac{n+1}{2}\right]}&\text{if}\:n\:\text{is odd}\\
\frac{X_{\left[\frac{n}{2}\right]}+X_{\left[\frac{n}{2}+1 right]}}{2}&\text{if}\:n\:\text{is even}
\end{cases}
$$

Unlike the mean, the median doesn't depend on extreme values, and it cares only about the position of the data, not the magnitude.

```py
# Clean and Feature Engineering
df = df.dropna(subset=['CustomerID'])
df['TotalPrice'] = df['Quantity'] * df['UnitPrice']

# Calculate only the Median
median_value = df['TotalPrice'].median()
print(f"Typical Order Value (Median): {median_value:.2f}")
```

The results are as follows:

```plaintext title="output"
Typical Order Value (Median): 11.10
```

Now you'll notice that the result lies in the 8—15 range, where most of the transactions lie.

![The figure demonstrates the graph for the median, where we get an accurate value of the transactions by the customers.](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/d89a4912-0e44-485e-8ea0-ff559cea6eba.png)

The figure demonstrates the graph for the median, where we get an accurate value of the transactions by the customers. (Image by Author)

In the previous graph, the mean was pulled to the right by large orders, but the median just asks what the middle customer spends. So even if someone spends $300 or some transactions are negative, the median stays stable.

In the above figure **the median graph** accurately highlights the range where most of the customers lie.

---

## Beyond Averages: Understanding Spread with Quartiles

So far, we've studied the median, but knowing the center is not enough.

To truly understand how customer spending is, we need to understand how the data is spread, and this is where quartiles come into play.

Quartiles divide the dataset into the following parts:

1. **Q1(25th percentile):** 25% of transactions are below this.
2. **Q2 (50th percentile):** Median
3. **Q3 (75th percentile):** 75% of transactions are below this.

This is formally expressed as the Interquartile Range (IQR):

IQR=Q3−Q1

### The IQR: Detecting Outliers

The IQR measures the spread of the middle 50%.

If the IQR is small, then the data is concentrated. If it's large, the data is spread out. The IQR also helps us identify outliers mathematically.

Outlier Rule:

1. **Lower Bound = Q1 — 1.5 \* IQR**
2. **Upper Bound = Q3 + 1.5 \* IQR**

#### A Simple Example to Understand IQR

Consider the following transaction values:

$$
\left[5,\:8,\:10,\:12,\:15,\:18,\:20\right]
$$

#### Step 1: Find the Median ($Q_2$):

The middle value is:

$$
Q_2=12
$$

#### Step 2: Find $Q_1$ (Lower Quartile):

The lower half is $\left[5,\:8,\:10\right]$. The median of the lower half is:

$$
Q_1=8
$$

#### Step 3: Find $Q_3$ (Upper Quartile):

The upper half is $\left[15,\:18,\:20\right]$. The median of the upper half is:

$$
Q_3=18
$$

#### Step 4: Calculate IQR:

$$
IQR=Q_3-Q_1=18-8=10
$$

#### Step 5: Find Outlier Bounds:

$$
\begin{align*}
\text{Lower Bound}&=Q_1-1.5\times{IQR}=8-15=-7\\
\text{Upper Bound}&=Q_3+1.5\times{IQR}=18+15=33
\end{align*}
$$

Any value **below -7 or above 33** is an outlier (but in this demo problem, no outliers exist).

---

## Applying IQR to Our Dataset

In our retail dataset, instead of neat values, we have bulk values and even negative returns.

```py
# 1. Calculate IQR and Bounds
Q1 = df['TotalPrice'].quantile(0.25)
Q3 = df['TotalPrice'].quantile(0.75)
IQR = Q3 - Q1

lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
```

When we calculate IQR for our dataset, we get:

```plaintext title="output"
Lower Bound: -18.75
Upper Bound: 42.45
Number of Outliers: 33180
```

![The figure demonstrates the outlier range for our dataset](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/e528db9b-57f9-4ee4-b331-143c2b1947fb.png)

The graph demonstrates outliers, which are any values falling outside the range of $-18.75$ to $42.45$. (Image by Author)

As the graph shows, the values outside the range $-18.75$ to $42.45$ are considered outliers. These values will be removed.

### Revisiting the Mean After Removing Outliers

Using the IQR method, we've removed extreme transactions that fell outside the typical spending range.

```py
# Clean and Feature Engineering
df = df.dropna(subset=['CustomerID'])
df['TotalPrice'] = df['Quantity'] * df['UnitPrice']

# Original Mean
mean_value = df['TotalPrice'].mean()
print(f"Original Mean: {mean_value:.2f}")

# IQR Calculation
Q1 = df['TotalPrice'].quantile(0.25)
Q3 = df['TotalPrice'].quantile(0.75)
IQR = Q3 - Q1

# Define bounds
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"Lower Bound: {lower_bound:.2f}")
print(f"Upper Bound: {upper_bound:.2f}")

# Remove Outliers
df_no_outliers = df[(df['TotalPrice'] >= lower_bound) & (df['TotalPrice'] <= upper_bound)]

# New Mean after removing outliers
new_mean = df_no_outliers['TotalPrice'].mean()
print(f"Mean after removing outliers: {new_mean:.2f}")
```

After recomputing, we get:

```plaintext title="output"
Original Mean: 20.40
Lower Bound: -18.75
Upper Bound: 42.45
Mean after removing outliers: 11.63
```

![The graph demonstrates that the mean improves significantly after all outliers are removed. (Image by Author)](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/17e6c2d0-883f-4e48-b45b-d1bf93164c63.png)

Removing outliers significantly shifts the mean toward the region where most transactions occur. We now have a much better mean of 11.63 as opposed to the right-stretched mean of 20.40 we got with outliers.

---

## Final Comparison and Insights

Looking at the results from all the graphs, we get a complete understanding of the dataset. The original mean was 20.40, which appeared to be significantly higher than the most transactions that actually occurred. In that case, the mean was pulled upward by some of the high-valued transactions and was distorted by the outliers.

The median, on the other hand, was 11.10, which lies within the range where most transactions are concentrated. This shows that the median is a much better representation of what a typical customer spends, as it's not affected by extreme values.

After removing the outliers using the IQR, the mean dropped to 11.63, bringing it very close to the median. This confirms that the earlier mean was not inherently wrong, but was simply influenced by extreme values in the data. Once those values were handled, the mean became a much more reliable measure of central tendency.

---

## Conclusion

The results show that the mean can be misleading when data contains outliers. In our dataset, the original mean of 20.40 overstated customer spending, while the median (11.10) gave a more realistic picture. After removing outliers, the mean shifted to 11.63, aligning closely with the median.

This highlights a key lesson: **The mean isn't wrong, but it must be used with an understanding of the data.**

Choosing the right measure of average depends on the dataset, and in messy real-world scenarios, the median or a cleaned mean often tells the true story.

::: info Connect with me

1. [Medium (<VPIcon icon="fa-brands fa-medium"/>`@rakshathnaik62`)](https://medium.com/@rakshathnaik62)
2. [LinkedIN (<VPIcon icon="fa-brands fa-linkedin"/>`rakshath-`)](https://linkedin.com/in/rakshath-/)

If you want to dive deeper, you can visit: [<VPIcon icon="fas fa-globe"/>Mean vs Median vs Mode: Understanding Central Tendency in Data Analysis](https://qubrica.com/mean-median-mode-python-guide/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Data Science Insights: Why the Mean Lies When Handling Messy Retail Data",
  "desc": "In our daily life, we use the word ”average” all the time: average salary, average marks, average age, and so on. Let's take the case of a retail shop. If we're looking at the average order value to u",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/data-science-insights-why-the-mean-lies-when-handling-messy-retail-data.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
