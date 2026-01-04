---
lang: en-US
title: "How to Create Scatterplots and Model Data in R Using ggplot2"
description: "Article(s) > How to Create Scatterplots and Model Data in R Using ggplot2"
icon: iconfont icon-r 
category:
  - R
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - r
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Scatterplots and Model Data in R Using ggplot2"
    - property: og:description
      content: "How to Create Scatterplots and Model Data in R Using ggplot2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-scatterplots-and-model-data-in-r.html
prev: /data-science/r/articles/README.md
date: 2026-01-05
isOriginal: false
author:
  - name: Tiffany Mojo Omondi
    url : https://freecodecamp.org/news/author/tiffanymojowrites/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767614352690/8b993426-f193-4ff3-b5ec-dd6dda11028e.png
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
  name="How to Create Scatterplots and Model Data in R Using ggplot2"
  desc="You can use R as a powerful tool for data analysis, data visualization, and statistical modelling. In this guide, you’ll learn how to load real-world data into R, visualize patterns using ggplot2, build simple linear and logistic regression models, a..."
  url="https://freecodecamp.org/news/how-to-create-scatterplots-and-model-data-in-r"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767614352690/8b993426-f193-4ff3-b5ec-dd6dda11028e.png"/>

You can use R as a powerful tool for data analysis, data visualization, and statistical modelling. In this guide, you’ll learn how to load real-world data into R, visualize patterns using ggplot2, build simple linear and logistic regression models, and interpret the models. By the end, you should know how to use R for your own projects.

::: note Prerequisites

Before we get started, you should have the following:

- R installed (version 4.0 or higher).
- RStudio installed (recommended for beginners).
- Basic familiarity with programming concepts such as variables and functions.
- A basic understanding of statistics (mean, correlation, regression).

:::

---

## How to Set Up Your R Environment

Before you start working with data, load the required libraries:

```r
library(tidyverse)   # Data manipulation + ggplot2
library(readxl)      # Importing Excel files
```

These load the required libraries into the R. `tidyverse` is a collection of packages used for data manipulation and visualization, including `ggplot2`. `readxl` allows you to import Excel files directly into R without converting them to CSV format first.

---

## How to Use Data Types in R

Knowing data types helps you avoid errors and choose the right analysis methods.

### Common Data Types

| Data type | Example | Use case |
| --- | --- | --- |
| Numeric | `x <- 5.7` | Measurements, prices |
| Integer | `y <- 10L` | Counts |
| Character | `"House prices"` | Text labels |
| Logical | `TRUE` | Conditions |
| Complex | `2 + 3i` | Advanced math |

### Numeric Data Types in R

```r
price <- 199.99
tax <- 16.5
total_cost <- price + tax
total_cost
```

Numeric data is used for continuous values such as measurements, prices, or averages. As you can see, these are numeric values that can be used in a calculation. Numeric data types allow arithmetic operations such as addition, subtraction, multiplication, and division.

### Integer Data Types in R

```r
students <- 30L
classes <- 4L
total_students <- students * classes
total_students
```

Integers are whole numbers and are commonly used for counting. The `L` tells R that the values are integers. Integers are useful when working with counts, indexes, or discrete values.

### Character Data Types in R

```r
course_name <- "Data Science"
university <- "Harvard University"
paste(course_name, "at", university)
```

Character data is used to store text such as names, labels, or categories. The example above shows how character data can be combined using the `paste()` function. This data type cannot be used in mathematical operations.

### Logical Data Types in R

```r
score <- 75
passed <- score >= 50
passed
```

Logical data represents Boolean values: `TRUE` or `FALSE`. These are commonly used in conditions and filtering. Here, R evaluates a condition and returns `TRUE` because the score meets the requirement. Logical values are essential in decision-making and control flow.

### Complex Data Types in R

Complex numbers contain both real and imaginary parts and are mostly used in advanced mathematical computations.

```r
z <- 2 + 3i
Mod(z)
```

This example calculates the magnitude of a complex number. Complex data types are rarely used in basic data analysis but are available in R.

---

## How to Use Data Structures in R

R stores data in different structures depending on your goals. This is important because choosing the right structure makes operations easier. Its functions behave differently depending on the structure. Moreover, structures help R understand whether your data are numbers, categories, or text.

### Common Data Structures in R

| Structure | Best for |
| --- | --- |
| Vector | Single column of data |
| Matrix | Numeric tables |
| Data Frame | Spreadsheet-like data |
| List | Mixed objects |

```r
vec <- c(1, 2, 3, 4)
mat <- matrix(1:9, nrow = 3)
df <- data.frame(Name = c("Car", "Bike"), Number = c(110, 95))
lst <- list(numbers = vec, matrix = mat, info = df)

str(lst) ##shows the structure of the list
```

Lets understand the code above:

- `vec` is a vector that stores a single type of data.
- `mat` is a matrix that organizes numeric values into rows and columns.
- `df` is a data frame that works like a spreadsheet, allowing different data types in each column.
- `lst` is a list that stores multiple objects of different types.
- The `str()` function shows how these objects are nested within the list.

---

## How to Import Data in R

Now you can start working with your real data. You can import files into R by copying the path of the CSV or Excel file and pasting it into the command.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

Replace single backward slashes / with either double backward slashes `\\` or single forward slashes `\`. For example:

```r
data <- read.csv("C:\\Users\\file\\Documents\\data.csv") or 
data <- read.csv("C:/Users/file/Documents/data.csv")
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

Single forward slashes work fine:

```r
data <- read.csv("/Users/file/Documents/data.csv")
```

:::

### How to Read a CSV and Excel File

```r
#Import CSV file 
data <- read.csv("C:/Users/file/Documents/data.csv") or data <- read.csv("C:\\Users\\file\\Documents\\data.csv") ## for windows

head(data.csv)
```

You can import a CSV file into R using a file path. On Windows systems, file paths can use either double forward slashes (`//`) or double backslashes (``). The imported data is stored as a data frame named data.

```r
data_excel <- read_excel("C:/Users/file/Documents/HR Data Set.xlsx")
head(data_excel)
```

You can import an Excel file into R using the code `read_excel()` function from the `readxl` package. The `head()` function is then used to preview the first few rows of the dataset.

Use the following commands to understand your data:

```r
str(data.csv)
summary(data.csv)

str(data_excel)
summary(data_excel)
```

`str()` shows the structure of the dataset, including column names and data types. `summary()` provides descriptive statistics such as minimum, maximum, mean, and quartiles for each variable. Together, these functions help you understand the dataset before analysis.

---

## How to Visualize Data with ggplot2

Visualization helps you spot patterns before you build models.

### Scatter Plot Example

We’ll use the built-in `mtcars` dataset in R. First, load the library to make it available for use:

```r
data(mtcars)
library(ggplot2)

ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3,color="blue") +geom_smooth(method="lm",color="red",se=FALSE)+
  labs(
    title = "Fuel Efficiency by Weight and Cylinders",
    x = "Weight (1000 lbs)",
    y = "Miles per Gallon"
  ) +
  theme_minimal()
```

Let us break down the code to grasp it fully:

- `data(mtcars)` loads the built-in `mtcars` dataset, which contains information about car specifications.
- `library(ggplot2)` enables data visualization.
- `aes()` was used to insert your dataset columns, which defines the `x` and `y` values.
- `aes()` was used to design the plot outside. For example, set point `size` and `color`.
- `geom_smooth()` wass used to add a trend line with. Here, we use `method="lm"` to fit a linear regression line. The `se=TRUE/FALSE` option controls the shading for confidence intervals. Use `TRUE` if you want the shading and `FALSE` if you don’t.
- `labs()` was used for label the plot and set the `title`, `x`-axis, and `y`-axis labels.
- Finally, we set the plot theme using `theme_minimal()`.

Running this code will produce a scatterplot showing fuel efficiency by weight and cylinders. The plot should look like this:

![Scatterplot of mpg against vehicle weight with regression line](https://cdn.hashnode.com/res/hashnode/image/upload/v1765914755069/8921e803-7fa6-4705-802c-23ff8918bee5.png)

---

## How to Build Statistical Models in R

### Linear Regression

You can use linear regression for continuous outcomes, basically to predict numerical values. For example, to predict a car’s miles per gallon (`mpg`) based on weight (`wt`) and horsepower (`hp`), you can use this formula:

```r
lm_model <- lm(mpg ~ wt + hp, data = mtcars)
summary(lm_model)
```

But what does it mean?

- `lm()` stands for linear model.
- The response variable is `mpg`. This is the outcome you want to predict.
- Predictor variables are `wt` and `hp`. These explain changes in the response.

Once you run the model, it should look like this in your console:

```plaintext title="output"
Call:
lm(formula = mpg ~ wt + hp, data = mtcars)

Residuals:
   Min     1Q Median     3Q    Max 
-3.941 -1.600 -0.182  1.050  5.854 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept) 37.22727    1.59879  23.285  < 2e-16 ***
wt          -3.87783    0.63273  -6.129 1.12e-06 ***
hp          -0.03177    0.00903  -3.519  0.00145 ** 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

Residual standard error: 2.593 on 29 degrees of freedom
Multiple R-squared:  0.8268,    Adjusted R-squared:  0.8148 
F-statistic: 69.21 on 2 and 29 DF,  p-value: 9.109e-12
```

Here’s an interpretation of the linear regression model:

- You created a model on miles per gallon (`mpg`) based on weight (`wt`) and horsepower (`hp`).
- The intercept `37.227` is the `mpg` when `wt=0` and `hp=0`. In other words, when all other variables are `0`, the base `mpg` is `37.227`. The intercept is always the baseline value of the outcome when all other variables in the model are zero.
- With every additional unit of weight (1000lbs), the `mpg` decreases by `3.877`. This variable affects the `mpg` greatly as seen with the `p-value`. The `p-value` is <0.001, hence strong and statistically significant.
- With every additional unit of horsepower, the `mpg` decreases by `0.031`. This variable affects the `mpg`, as seen with the `p-value` being `0.00145`, which is **less than 0.01**, indicating that horsepower is a statistically significant predictor of `mpg`, although its effect is smaller compared to vehicle weight.

### Does the Model Fit the Data, and Why?

The R-squared value shows that 83% of the variation in `mpg` is explained by weight and horsepower.

::: info Summary of the interpretation

Cars that are heavier and with more horsepower have lower fuel efficiency. These two variables explain most of the variation in `mpg` in the dataset.

:::

### Logistic Regression

You can use logistic regression for binary outcomes, like yes/no questions. For example, predicting whether a vehicle is automatic or manual based on weight and horsepower.

```r
glm_model <- glm(am ~ wt + hp, data = mtcars, family = binomial)
summary(glm_model)
```

Lets understand the code

- `glm()` stands for generalized linear model.
- The `family=binomial` option tells R to run logistic regression.
- The response variable `am` indicates transmission type: 0 = automatic, 1 = manual.
- Predictor variables remain `wt` and `hp`.

Once you run the model, it should look like this in your console:

```plaintext title="output"
Call:
glm(formula = am ~ wt + hp, family = binomial, data = mtcars)

Coefficients:
            Estimate Std. Error z value Pr(>|z|)   
(Intercept) 18.86630    7.44356   2.535  0.01126 * 
wt          -8.08348    3.06868  -2.634  0.00843 **
hp           0.03626    0.01773   2.044  0.04091 * 
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 43.230  on 31  degrees of freedom
Residual deviance: 10.059  on 29  degrees of freedom
AIC: 16.059

Number of Fisher Scoring iterations: 8
```

Here’s an interpreting of the logistic regression model:

- The intercept `18.866` represents the log-odds of a car being manual when `wt=0` and `hp=0`. In other words, when all other variables are `0`, the baseline log-odds of the outcome is `18.866`. The intercept is always the baseline value of the outcome when all other variables in the model are zero.
- With every additional unit of weight (1000 lbs), the log odds of the car being manual decrease by `8.083`. This variable strongly affects the probability of the car being manual, as seen with the `p-value` being `0.008`, which is statistically significant.
- With every additional unit of horsepower, the log odds of the car being manual increase by `0.036`. This variable also affects the probability of being manual, as seen with the `p-value` being `0.041`, which is statistically significant.

::: info Summary of the interpretation

Heavier cars are more likely to be automatic, while higher horsepower slightly increases the chance of being manual. Together, `wt` and `hp` explain a large portion of transmission type variation.

:::

---

## Conclusion

In this tutorial, you learned how to use R for data analysis, visualization, and statistical modeling, and how to set up your R environment and work with basic data types and data structures.

This article also showed you how to import real-world datasets and explore them using summary statistics. This should help you understand your data before analysis.

Using ggplot2, we visualized the relationships and identified patterns. We built and interpreted a linear regression model to predict fuel efficiency and a logistic regression model to classify transmission type.

You also learned how to interpret coefficients, p-values, and goodness-of-fit measures.

With these skills, you can load datasets, visualize trends, and build simple predictive models in R. Keep practicing with new datasets and explore more advanced techniques to improve your data analysis skills.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Scatterplots and Model Data in R Using ggplot2",
  "desc": "You can use R as a powerful tool for data analysis, data visualization, and statistical modelling. In this guide, you’ll learn how to load real-world data into R, visualize patterns using ggplot2, build simple linear and logistic regression models, a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-scatterplots-and-model-data-in-r.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
