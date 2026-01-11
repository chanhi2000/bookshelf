---
lang: en-US
title: "How to Create Boxplots and Model Data in R Using ggplot2"
description: "Article(s) > How to Create Boxplots and Model Data in R Using ggplot2"
icon: iconfont icon-r 
category:
  - Data Science
  - R
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - r
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Boxplots and Model Data in R Using ggplot2"
    - property: og:description
      content: "How to Create Boxplots and Model Data in R Using ggplot2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-boxplots-and-model-data-in-r.html
prev: /data-science/r/articles/README.md
date: 2026-01-16
isOriginal: false
author:
  - name: Tiffany Mojo Omondi
    url : https://freecodecamp.org/news/author/tiffanymojowrites/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768418231372/f36e1cca-eed9-4620-bd7c-19788d8beafe.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "R > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/r/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Boxplots and Model Data in R Using ggplot2"
  desc="In this tutorial, you’ll walk through a complete data analysis project using the HR Analytics dataset by Saad Haroon on Kaggle. You’ll start by loading and cleaning the data, then explore it visually using boxplots with ggplot2. Finally, you’ll learn..."
  url="https://freecodecamp.org/news/how-to-create-boxplots-and-model-data-in-r"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768418231372/f36e1cca-eed9-4620-bd7c-19788d8beafe.png"/>

In this tutorial, you’ll walk through a complete data analysis project using the HR Analytics dataset by Saad Haroon on Kaggle. You’ll start by loading and cleaning the data, then explore it visually using boxplots with ggplot2. Finally, you’ll learn about statistical modelling using linear regression and logistic regression in R.

By the end of this article, you should understand how to create boxplots in R, why they matter, and how they fit into a real-world analytics workflow.

::: note Prerequisites

Before you begin, you should be comfortable with the following:

- Basic R syntax (variables, functions, data frames).
- Installing and loading R packages.
- Understanding what rows and columns represent in a dataset.
- Very basic statistics (mean, median, distributions).

:::

---

## How to Set Up Your R Environment

Start by installing and loading the packages you will need.

```r
install.packages(c("tidyverse", "ggplot2"))
library(tidyverse)
library(ggplot2)
```

`tidyverse` provides tools for data manipulation and visualization. `ggplot2` is the visualization engine you will use for boxplots. Loading the libraries makes their functions available for use

---

## How to Load and Inspect the Data

First, download the [<VPIcon icon="iconfont icon-kaggle"/>HR Analytics dataset by Saad Haroon from Kaggle](https://kaggle.com/datasets/saadharoon27/hr-analytics-dataset).

Assuming the downloaded dataset is saved as <VPIcon icon="fas fa-folder-open"/>`C:/Users/johndoe/Downloads/archive (2)/`<VPIcon icon="fas fa-file-csv"/>`HR_Analytics.csv`, load the path file into R.

You can view a sample of the the dataset by running the `head` function. To view the structure of the dataset, you can run the `str` function.

```r
hr <- read.csv("C:/Users/johndoe/Downloads/archive (2)/HR_Analytics.csv")
head(hr)
str(hr)
```

The `read.csv` function imports the dataset into R. The `head` function shows the first six rows so you can preview the data. The `str` function reveals data types, helping you spot categorical versus numeric variables early.

Remember that understanding your data structure early prevents errors later when plotting or modeling. Once you run the `head` function, you should see the following in your console:

From the `head` function, you can see:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768489839861/f304305e-b889-4e25-8315-ff24c5201681.png)

### Structure

- Each row represents **one employee**.
- Each column represents a **feature/variable** about the employee.

### Key Columns & Meaning

- `EmpID` → Employee identifier
- `Age` → Age in years
- `AgeGroup` → Age category (for example, `18-25`)
- `Attrition` → Whether the employee left or not (`Yes/No`)
- `BusinessTravel` → Travel frequency (`Travel_Rarely`, `Travel_Frequently`, `Non-Travel`)
- `Department` → Employee department
- `DistanceFromHome` → Distance from home to office (km)
- `Education` / `EducationField` → Level and field of education
- `EmployeeCount` → Usually 1 per employee (redundant)
- `Gender` → Male / Female
- `JobRole` / `JobSatisfaction` → Job title and satisfaction level
- `MonthlyIncome` / `SalarySlab` → Salary amount and category
- `YearsAtCompany` / `YearsInCurrentRole` → Experience metrics
- `OverTime` → Works overtime (`Yes/No`)
- Other features: `PerformanceRating`, `TrainingTimesLastYear`, `WorkLifeBalance`, `StockOptionLevel`, and so on.

### Data Types

- **Numeric**:`Age`, `DistanceFromHome`, `MonthlyIncome`, `YearsAtCompany`
- **Categorical / Character**: `Attrition`, `Gender`, `Department`, `JobRole`

### Observations

- The dataset is tabular, like a spreadsheet.
- There are multiple categorical columns
- There are multiple numeric columns
- Some columns seem redundant or constant; doesn’t provide useful information because of the same values (for example, `EmployeeCount`)

From the `str` function, you can gather that:

![r-output-showing-structure-of-hr-dataset](https://cdn.hashnode.com/res/hashnode/image/upload/v1768488901453/80d8cae9-d569-4749-8028-0a6e9cc128c4.png)

The dataset contains 1,480 observations and 38 variables. Each row represents one employee, and each column represents a feature about that employee.

Each column has a name, data type, and example values. For instance, `Age` and `DistanceFromHome` are numeric (`int`), with values like 28 or 12. `EmpID` and `Department` are character strings (`chr`), with examples like Research & Development or Sales. Other features include `JobRole` (Analyst, Manager) and `Attrition` (Yes/No).

The dataset contains mixed data types. Some columns are numeric, such as `MonthlyIncome` or `YearsAtCompany`. Some are character or categorical, like `Gender` (Male/Female) and `BusinessTravel` (Travel_Rarely, Travel_Frequently). A few columns are redundant or constant. For example, `EmployeeCount` has the same value of 1 for all rows and does not provide useful information.

---

## How to Clean and Prepare the Data

Before visualization, you must clean your data. In order to find out what you need to clean you can investigate the data.

Run the `summary` function to view the statistics of the dataset. You also need to run the `is.na` function to identify missing values to be removed.

```r
summary(hr)
colSums(is.na(hr))
```

The `summary` function gives quick statistics and flags suspicious values. The `is.na` function checks for missing data. Boxplots are sensitive to extreme values, so knowing what you are working with is critical.

After running the `summary` function, the following will appear in your console:

![r-summary-output-of-hr-dataset-showing-statistical-distributions](https://cdn.hashnode.com/res/hashnode/image/upload/v1768490404469/ef3bd30d-c3c9-4cf0-9c91-80a0e56f52f5.png)

This shows the basic statistics of each column. After running the `is.na` function, the following will also appear in your console:

![r-output-showing-missing-value-counts-per-column-in-hr-dataset](https://cdn.hashnode.com/res/hashnode/image/upload/v1768490678134/00a12c24-224e-4c8f-80ee-bc7bbd4d8ca6.png)

From this output, you can see that only `YearsWithCurrManager` has `57`, meaning that **57 employees** don’t have a value for this column.

You can drop this whole column along with the other redundant columns we saw earlier on. You can do this with the code below.

```r
hr <- hr %>% select(-c(EmployeeCount, Over18, StandardHours, YearsWithCurrManager))
```

To verify if the columns are gone, use this code:

```r
colnames(hr)
```

Now we need to convert important categorical variables to factors. Doing this tells R that the column has **two categories** (‘Yes’ and ‘No’), not continuous text.

```r
hr$Attrition <- as.factor(hr$Attrition)
hr$JobRole <- as.factor(hr$JobRole)
hr$Department <- as.factor(hr$Department)
```

This also ensures ggplot2 treats them correctly when grouping.

---

## How to Use Boxplots

A boxplot displays key features of a dataset. The median is shown by the line in the middle of the box. The interquartile range is represented by the box itself while the whiskers show the spread of the data. Outliers appear as individual points.

Boxplots are mostly useful when you want to compare distributions across groups, such as income by job role or age by attrition status.

Let’s start with a simple boxplot of monthly income.

```r
ggplot(hr, aes(y = MonthlyIncome)) +
  geom_boxplot(fill = "blue") +
  labs(
    title = "Distribution of Monthly Income",
    y = "Monthly Income")
```

The `aes` function tells ggplot what variable to plot. `geom_boxplot` draws the boxplot. The `labs` function labels parts of the plot drawn, that is the `x` axis, `y` axis, and the title.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766410411798/200b1c22-3b73-49f0-ba30-9b83d28f3055.png)

---

## How to Create Boxplots with ggplot2

Now lets compare `income` across `job roles`.

```r
ggplot(hr, aes(x = JobRole, y = MonthlyIncome)) +
  geom_boxplot(fill = "lightblue") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  labs(
    title = "Monthly Income by Job Role",
    x = "Job Role",
    y = "Monthly Income")
```

The x aesthetic lists all the job roles. The labels are rotated to improve readability. This visualization quickly reveals income differences across roles.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766508710023/c12ca136-38bf-492e-af90-24d7021b54a4.png)

---

## How to Perform Exploratory Data Analysis (EDA)

Exploratory data analysis involves using visual methods to ask questions and gain a deeper understanding of the data.

We can use the example of `Years at company` by `department`.

```r
ggplot(hr, aes(x = Department, y = YearsAtCompany)) +
  geom_boxplot(fill = "darkblue") +
  labs(
    title = "Years at Company by Department",
    y = "Years at Company")
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1766512679598/5e5da8cd-8fe7-4fae-bbe9-362af901b330.png)

---

## How to Build Linear Regression Models

To understand how to build linear regression models, you have to model `MonthlyIncome` using `YearsAtCompany` with the command below.

The first one creates the model while the second displays it.

```r
hr_lm<- lm(MonthlyIncome ~ YearsAtCompany, data = hr)
summary(hr_lm)
```

Linear regression estimates how income changes with tenure. This works when the variables are numeric.

After running the code, your console should show you this output:

```r
lm(formula = MonthlyIncome ~ YearsAtCompany, data = hr)
#
# Residuals:
#    Min     1Q Median     3Q    Max 
#  -9506  -2488  -1186   1403  15483 
# 
# Coefficients:
#                Estimate Std. Error t value Pr(>|t|)    
# (Intercept)     3734.47     159.41   23.43   <2e-16 ***
# YearsAtCompany   395.25      17.14   23.07   <2e-16 ***
# ---
# Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
# 
# Residual standard error: 4032 on 1478 degrees of freedom
# Multiple R-squared:  0.2647,    Adjusted R-squared:  0.2642 
# F-statistic:   532 on 1 and 1478 DF,  p-value: < 2.2e-16
```

Let’s interpret this model.

If an employee has 0 years at the company, their base monthly income is $3734.47. This comes from the intercept.

For each year an employee spends at the company, their monthly income is predicted to increase by $395.25. Both coefficients have p-values < `2e-16`. This means they are highly significant. It strongly shows that the years an employee spends at a company affects their income.

The model’s R-squared is `0.2647`. This means about 26% of the variation in monthly income is explained by the years an employee spends at the company. This is low, so other factors like role, department, or education likely affect income too.

The model’s F-statistic is `532`, with a p-value < `2.2e-16`. This means the model is statistically significant overall.

In general, the longer an employee stays at a company, the more they earn, roughly $395 extra per year. But years at the company alone explain only about a quarter of their income. You need to consider other variables for better predictions.

---

## How to Build Logistic Regression Models

You can now learn how to predict attrition. The first command generates the model while the second displays it.

```r
hr_glm<- glm(
  Attrition ~ MonthlyIncome + YearsAtCompany,
  data = hr,
  family = binomial)


summary(hr_glm)
```

Your console should show this as an output when you run both commands.

```r
glm(formula = Attrition ~ MonthlyIncome + YearsAtCompany, family = binomial, 
    data = hr)
#
# Coefficients:
#                  Estimate Std. Error z value Pr(>|z|)    
# (Intercept)    -8.094e-01  1.375e-01  -5.886 3.96e-09 ***
# MonthlyIncome  -9.449e-05  2.302e-05  -4.104 4.05e-05 ***
# YearsAtCompany -5.047e-02  1.792e-02  -2.817  0.00485 ** 
# ---
# Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1
# 
# (Dispersion parameter for binomial family taken to be 1)
# 
#     Null deviance: 1305.4  on 1479  degrees of freedom
# Residual deviance: 1252.5  on 1477  degrees of freedom
# AIC: 1258.5
# 
# Number of Fisher Scoring iterations: 5
```

Logistic regression is used for binary outcomes, that is, yes or no. It estimates probability.

Let’s interpret this logistic regression model. The model predicts whether an employee is likely to leave the company (Attrition) based on their `Monthly Income` and `Years at Company.`

The intercept is `-0.809`. This is the baseline log-odds of leaving when their income and years at the company are zero.

The employees’ `Monthly Income` has a coefficient of `-0.0000945`. This means that as their income increases, their chance of leaving decreases slightly. An increase in income makes them less likely to quit.

The employees’ `Years at Company` have a coefficient of `-0.0505`. This shows that the longer they stay, the less likely they are to leave. Each additional year reduces their attrition probability.

All coefficients are statistically significant. `Monthly Income` and `Years at Company` both strongly affect their likelihood to stay.

The model’s residual deviance is `1252.5`, lower than the null deviance of `1305.4`. This means the model explains some of the variation in attrition.

The key takeaway is that if an employee earns more and stays longer at the company, they are less likely to leave. These factors matter, but other elements also influence attrition.

::: important Why Visualization Comes Before Modeling

Boxplots help you to:

- **Detect outliers:** Boxplots highlight extreme values that interfere with model results.
- **Compare groups:** Boxplots allow quick comparison of distributions across different categories.
- **Form hypotheses:** Visual patterns assist in identifying relationships worth testing in a model.
- **Validate modeling assumptions:** Boxplots help check distribution shape and variance before modeling.

:::

Modeling without visualization often leads to misinterpretation or false confidence.

---

## Conclusion

In this tutorial, you learned how to load and clean data, understand boxplots and their importance. You also learned how to use ggplot2 to compare distributions, perform exploratory data analysis (EDA), build linear and logistic regression models, and link visualization insights to modeling results.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Boxplots and Model Data in R Using ggplot2",
  "desc": "In this tutorial, you’ll walk through a complete data analysis project using the HR Analytics dataset by Saad Haroon on Kaggle. You’ll start by loading and cleaning the data, then explore it visually using boxplots with ggplot2. Finally, you’ll learn...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-boxplots-and-model-data-in-r.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
