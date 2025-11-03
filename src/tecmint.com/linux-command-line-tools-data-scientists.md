---
lang: en-US
title: "10 Essential Linux Commands for Data Scientists"
description: "Article(s) > 10 Essential Linux Commands for Data Scientists"
icon: fa-brands fa-fedora
category:
  - Programming
  - Shell
  - grep
  - awk
  - sed
  - cut
  - sort
  - uniq
  - wc
  - head
  - tail
  - find
  - jq
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - linux
  - grep
  - awk
  - sed
  - cut
  - sort
  - uniq
  - wc
  - head
  - tail
  - find
  - jq
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 10 Essential Linux Commands for Data Scientists"
    - property: og:description
      content: "10 Essential Linux Commands for Data Scientists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/linux-command-line-tools-data-scientists.html
prev: /programming/sh/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2025/10/linux-command-line-tools-data-scientists.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "awk > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/awk/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="10 Essential Linux Commands for Data Scientists"
  desc="In this article, explore essential command-line tools like grep, awk, sed, and jq with practical CSV examples and beginner-friendly tutorials."
  url="https://tecmint.com/linux-command-line-tools-data-scientists"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/10/linux-command-line-tools-data-scientists.webp"/>

If you’re just starting your journey into data science, you might think it’s all about **Python** libraries, **Jupyter** notebooks, and fancy machine learning algorithms and while those are definitely important, there’s a powerful set of tools that often gets overlooked: the humble command line.

I’ve spent over a decade working with Linux systems, and I can tell you that mastering these command-line tools will make your life significantly easier. They’re fast, efficient, and often the quickest way to peek at your data, clean files, or automate repetitive tasks.

To make this tutorial practical and hands-on, we’ll use a sample e-commerce sales dataset throughout this article. Let me show you how to create it first, then we’ll explore it using all 10 tools.

```sh title="Create the sample file"
cat > sales_data.csv << 'EOF'
order_id,date,customer_name,product,category,quantity,price,region,status
1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
1002,2024-01-16,Sarah Johnson,Mouse,Electronics,2,24.99,South,completed
1003,2024-01-16,Mike Brown,Desk Chair,Furniture,1,199.99,East,completed
1004,2024-01-17,John Smith,Keyboard,Electronics,1,79.99,North,completed
1005,2024-01-18,Emily Davis,Notebook,Stationery,5,12.99,West,completed
1006,2024-01-18,Sarah Johnson,Laptop,Electronics,1,899.99,South,pending
1007,2024-01-19,Chris Wilson,Monitor,Electronics,2,299.99,North,completed
1008,2024-01-20,John Smith,USB Cable,Electronics,3,9.99,North,completed
1009,2024-01-20,Anna Martinez,Desk,Furniture,1,399.99,East,completed
1010,2024-01-21,Mike Brown,Laptop,Electronics,1,899.99,East,cancelled
1011,2024-01-22,Emily Davis,Pen Set,Stationery,10,5.99,West,completed
1012,2024-01-22,Sarah Johnson,Monitor,Electronics,1,299.99,South,completed
1013,2024-01-23,Chris Wilson,Desk Chair,Furniture,2,199.99,North,completed
1014,2024-01-24,Anna Martinez,Laptop,Electronics,1,899.99,East,completed
1015,2024-01-25,John Smith,Mouse Pad,Electronics,1,14.99,North,completed
1016,2024-01-26,Mike Brown,Bookshelf,Furniture,1,149.99,East,completed
1017,2024-01-27,Emily Davis,Highlighter,Stationery,8,3.99,West,completed
1018,2024-01-28,NULL,Laptop,Electronics,1,899.99,South,pending
1019,2024-01-29,Chris Wilson,Webcam,Electronics,1,89.99,North,completed
1020,2024-01-30,Sarah Johnson,Desk Lamp,Furniture,2,49.99,South,completed
EOF
```

Now let’s explore this file using our 10 essential tools!

---

## 1. `grep` – Your Pattern-Matching Tool

Think of [**`grep` command**](/tecmint.com/12-practical-examples-of-linux-grep-command.md) as your data detective, as it searches through files and finds lines that match patterns you specify, which is incredibly useful when you’re dealing with large log files or text datasets.

::: tabs

@tab:active Example 1

Find all orders from **John Smith**.

```sh
grep "John Smith" sales_data.csv
#
# 1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 1004,2024-01-17,John Smith,Keyboard,Electronics,1,79.99,North,completed
# 1008,2024-01-20,John Smith,USB Cable,Electronics,3,9.99,North,completed
# 1015,2024-01-25,John Smith,Mouse Pad,Electronics,1,14.99,North,completed
```

@tab Example 2

Count how many laptop orders we have.

```sh
grep -c "Laptop" sales_data.csv
#
# 5
```

@tab Example 3

Find all orders that are NOT completed.

```sh
grep -v "completed" sales_data.csv | grep -v "order_id"
#
# 1006,2024-01-18,Sarah Johnson,Laptop,Electronics,1,899.99,South,pending
# 1010,2024-01-21,Mike Brown,Laptop,Electronics,1,899.99,East,cancelled
# 1018,2024-01-28,NULL,Laptop,Electronics,1,899.99,South,pending
```

@tab Example 4

Find orders with line numbers.

```sh
grep -n "Electronics" sales_data.csv | head -5
#
# 2:1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 3:1002,2024-01-16,Sarah Johnson,Mouse,Electronics,2,24.99,South,completed
# 5:1004,2024-01-17,John Smith,Keyboard,Electronics,1,79.99,North,completed
# 7:1006,2024-01-18,Sarah Johnson,Laptop,Electronics,1,899.99,South,pending
# 8:1007,2024-01-19,Chris Wilson,Monitor,E1ectronics,2,299.99,North,completed
```

:::

---

## 2. `awk` – The Swiss Army Knife for Text Processing

[**`awk`**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md) is like a mini programming language designed for text processing, which is perfect for extracting specific columns, performing calculations, and transforming data on the fly.

::: tabs

@tab:active Example 1

Extract just product names and prices.

```sh
awk -F',' '{print $4, $7}' sales_data.csv | head -6
# 
# product prlce
# Laptop 899.99
# Mouse 24.99
# Desk Chair 199.99
# Keyboard 79.99
# Notebook 12.99
```

@tab Example 2

Calculate total revenue from all orders.

```sh
awk -F',' 'NR>1 {sum+=$7} END {print "Total Revenue: $" sum}' sales_data.csv
#
# Total Revenue: $6342.8
```

@tab Example 3

Show orders where the price is greater than `$100`.

```sh
awk -F',' 'NR>1 && $7>100 {print $1, $4, $7}' sales_data.csv
#
# 1001 Laptop 899.99
# 1003 Desk Chair 199.99
# 1006 Laptop 899.99
# 1007 Monitor 299.99
# 1009 Desk 399.99
# 1010 Laptop 899.99
# 1012 Monitor 299.99
# 1013 Desk Chair 199.99
# 1014 Laptop 899.99
# 1016 BooksheIf 149 .99
# 1018 Laptop 899.99
```

@tab Example 4

Calculate the average price by category.

```sh
awk -F',' 'NR>1 {
    category[$5]+=$7
    count[$5]++
} 
END {
    for (cat in category) 
        printf "%s: $%.2f\n", cat, category[cat]/count[cat]
}' sales_data.csv
#
# Furniture: $199.99
# EIectronics : $443.32
# stationery: $7.66
```

:::

---

## 3. `sed` – The Stream Editor for Quick Edits

[**`sed`**](/tecmint.com/linux-sed-command-tips-tricks.md) is your go-to tool for find-and-replace operations and text transformations. It’s like doing “**find and replace**” in a text editor, but from the command line and much faster.

::: tabs

::: tabs

@tab:active Example 1

Replace `NULL` values with “**Unknown**“.

```sh
sed 's/NULL/Unknown/g' sales_data.csv | grep "Unknown"
#
# 1018,2024_01_28,Unknown,Laptop,Electronics,899.99,South,pend1ng
```

@tab Example 2

Remove the header line.

```sh
sed '1d' sales_data.csv | head -3
#
# 1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 1002,2024-01-16,Sarah Johnson,Mouse,Electronics,2,24.99,South,completed
# 1003,2024-01-16,Mike Brown,Desk Chair,Furniture,1,199.99,East,completed
```

@tab Example 3

Change “**completed**” to “**DONE**“.

```sh
sed 's/completed/DONE/g' sales_data.csv | tail -5
#
# 1016,2024-01-26,Mike Brown,Bookshelf,Furniture,1,149.99,East,completed
# 1017,2024-01-27,Emily Davis,Highlighter,Stationery,8,3.99,West,completed
# 1018,2024-01-28,NULL,Laptop,Electronics,1,899.99,South,pending
# 1019,2024-01-29,Chris Wilson,Webcam,Electronics,1,89.99,North,completed
# 1020,2024-01-30,Sarah Johnson,Desk Lamp,Furniture,2,49.99,South,completed
```

@tab Example 4

Add a dollar sign before all prices.

```sh
sed 's/,\([0-9]*.[0-9]*\),/,$,/g' sales_data.csv | head -4
#
# order_id,customer_name,prouct,category,quantity,price,region,status
# 1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 1002,2024-01-16,Sarah Johnson,Mouse,Electronics,2,24.99,South,completed
# 1003,2024-01-16,Mike Brown,Desk Chair,Furniture,1,199.99,East,completed
```

:::

---

## 4. `cut` – Simple Column Extraction

While `awk` is powerful, sometimes you just need something simple and fast, that’s where [**`cut` command**](/tecmint.com/cut-command-in-linux.md) comes in, which is specifically designed to extract columns from delimited files.

::: tabs

@tab:active Example 1

Extract customer names and products.

```sh
cut -d',' -f3,4 sales_data.csv | head -6
#
# order_id,product,status
# John Smith,Laptop
# Sarah Johnson,Mouse
# Mike Brown,Desk Chair
# John Smith,Keyboard
# EmiIy Davis,Notebook
```

@tab Example 2

Extract only the region column.

```sh
cut -d',' -f8 sales_data.csv | head -8
#
# region
# North
# South
# East
# North
# West
# South
# North
```

@tab Example 3

Get order ID, product, and status.

```sh
cut -d',' -f1,4,9 sales_data.csv | head -6
#
# order_id,product,status
# 1001,Laptop,completed
# 1002,Mouse,completed
# 1003,Desk Chair,completed
# 1004,Keyboard,completed
# 1005,Notebook,completed
```

:::

---

## 5. `sort` – Organize Your Data

Sorting data is fundamental to analysis, and the [**`sort` command**](/tecmint.com/sort-command-linux.md) does this incredibly efficiently, even with files that are too large to fit in memory.

::: tabs

@tab:active Example 1

Sort by customer name alphabetically.

```sh
sort -t',' -k3 sales_data.csv | head -6
#
# 1009,2024-01-20,Anna Martinez,Desk,Furniture,1,399.99,East,completed
# 1014,2024-01-24,Anna Martinez,Laptop,Electronics,1,899.99,East,completed
# 1013,2024-01-23,Chris Wilson,Desk Chair,Furniture,2,199.99,North,completed
# 1007,2024-01-19,Chris Wilson,Monitor,Electronics,2,299.99,North,completed
# 1019,2024-01-29,Chris Wilson,Webcam,Electronics,1,89.99,North,completed
# order_id,date,customer_name,product,category,quantity,price,region,status
```

@tab Example 2

Sort by price (highest to lowest).

```sh
sort -t',' -k7 -rn sales_data.csv | head -6
#
# 1018, 2024_01_28,NULL,Laptop,EIectron1cs,1,899.99 ,South,pend1ng
# 1014,2024-01-24,Anna Martinez,Laptop,Electronics,1,899.99,East,completed
# 1010,2024-01-21,Mike Brown,Laptop,Electronics,1,899.99,East,cancelled
# 1006,2024-01-18,Sarah Johnson,Laptop,Electronics,1,899.99,South,pending
# 1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 1009,2024-01-20,Anna Martinez,Desk,Furniture,1,399.99,East,completed
```

@tab Example 3

Sort by region, then by price.

```sh
sort -t',' -k8,8 -k7,7rn sales_data.csv | grep -v "order_id" | head -8
#
# 1010,2024-01-21,Mike Brown,Laptop,Electronics,1,899.99,East,cancelled
# 1014,2024-01-24,Anna Martinez,Laptop,Electronics,1,899.99,East,completed
# 1009,2024-01-20,Anna Martinez,Desk,Furniture,1,399.99,East,completed
# 1003,2024-01-16,Mike Brown,Desk Chair,Furniture,1,199.99,East,completed
# 1016,2024-01-26,Mike Brown,Bookshelf,Furniture,1,149.99,East,completed
# 1001,2024-01-15,John Smith,Laptop,Electronics,1,899.99,North,completed
# 1007,2024-01-19,Chris Wilson,Monitor,Electronics,2,299.99,North,completed
# 1013,2024-01-23,Chris Wilson,Desk Chair,Furniture,2,199.99,North,completed
```

---

## 6. `uniq` – Find and Count Unique Values

[**`uniq` command**](/tecmint.com/remove-duplicate-lines-linux-files.md) helps you identify unique values, count occurrences, and find duplicates, which is like a lightweight version of pandas’ `value_counts()`.

`uniq` only works on sorted data, so you’ll usually `pipe` it with `sort`.

::: tabs

@tab:active Example 1

Count orders by region.

```sh
cut -d',' -f8 sales_data.csv | tail -n +2 | sort | uniq -c
#
#     5 East
#     7 North
#     5 South
#     3 West
```

@tab Example 2

Count orders by product category.

```sh
cut -d',' -f5 sales_data.csv | tail -n +2 | sort | uniq -c | sort -rn
#
#    12 E1ectron1cs
#     5 Furni ture
#     3 stationery
```

@tab Example 3

Find which customers made multiple purchases.

```sh
cut -d',' -f3 sales_data.csv | tail -n +2 | sort | uniq -c | sort -rn
#
#     4 Sarah
#     4 John Smith
#     3 Mike Brown
#     3 EmiIy Davis
#     3 Chris Wilson
#     2 Anna Martinez
#     1 NULL
```

@tab Example 4

Show unique products ordered.

```sh
cut -d',' -f4 sales_data.csv | tail -n +2 | sort | uniq
#
# Bookshe1f
# Desk
# Desk Chair
# Desk Lamp
# Highlighter
# Keyboard
# Laptop
# Monitor
```

:::

---

## 7. `wc` – Word Count (and More)

Don’t let the name fool you, [**`wc` (word count)**](/tecmint.com/wc-command-examples.md) is useful for much more than counting words, which is your quick statistics tool.

::: tabs

@tab:active Example 1

Count the total number of orders (minus header).

```sh
wc -l sales_data.csv
```

@tab Example 2

Count how many electronics orders.

```sh
grep "Electronics" sales_data.csv | wc -l
```

@tab Example 3

Count total characters in the file.

```sh
wc -c sales_data.csv
```

@tab Example 4

Multiple statistics at once.

```sh
wc sales_data.csv
```

:::

![`wc`: Count Words, Lines, and More](https://tecmint.com/wp-content/uploads/2025/10/wc-Count-Words-Lines-and-More.png)

---

## 8. `head` and `tail` – Preview Your Data

Instead of opening a massive file, use [**`head` command**](/tecmint.com/head-command-examples.md) to see the first few lines or `tail` to see the last few.

::: tabs

@tab:active Example 1

View the first 5 orders.

```sh
head -6 sales_data.csv
```

@tab Example 2

View just the column headers.

```sh
head -1 sales_data.csv
```

@tab Example 3

View the last 5 orders.

```sh
tail -5 sales_data.csv
```

@tab Example 4

Skip the header and see the data

```sh
tail -n +2 sales_data.csv | head -3
```

:::

![Quickly Preview Files with Head and Tail Commands](https://tecmint.com/wp-content/uploads/2025/10/Quickly-Preview-Files-with-Head-and-Tail-Commands.png)

---

## 9. `find` – Locate Files Across Directories

When working on projects, you often need to find files scattered across directories, and the [**`find` command**](/tecmint.com/35-practical-examples-of-linux-find-command.md) is incredibly powerful for this.

First, let’s create a realistic directory structure:

```sh
mkdir -p data_project/{raw,processed,reports}
cp sales_data.csv data_project/raw/
cp sales_data.csv data_project/processed/sales_cleaned.csv
echo "Summary report" > data_project/reports/summary.txt
```

::: tabs

@tab:active Example 1

Find all CSV files.

```sh
find data_project -name "*.csv"
```

@tab Example 2

Find files modified in the last minute.

```sh
find data_project -name "*.csv" -mmin -1
```

@tab Example 3

Find and count lines in all CSV files.

```sh
find data_project -name "*.csv" -exec wc -l {} \;
```

@tab Example 4

Find files larger than 1KB.

```sh
find data_project -type f -size +1k
```

:::

![Quickly Find Files Across Directories Using the Find Command](https://tecmint.com/wp-content/uploads/2025/10/Quickly-Find-Files-Across-Directories-Using-the-Find-Command.png)

---

## 10. `jq` – JSON Processor Extraordinaire

In modern data science, a lot of information comes from APIs, which usually send data in **JSON** format, a structured way of organizing information.

While tools like `grep`, `awk`, and `sed` are great for searching and manipulating plain text, `jq` is built specifically for handling JSON data.

```sh
sudo apt install jq    # Ubuntu/Debian
sudo yum install jq    # CentOS/RHEL
```

Let’s convert some of our data to JSON format first:

```sh
cat > sales_sample.json << 'EOF'
{
  "orders": [
    {
      "order_id": 1001,
      "customer": "John Smith",
      "product": "Laptop",
      "price": 899.99,
      "region": "North",
      "status": "completed"
    },
    {
      "order_id": 1002,
      "customer": "Sarah Johnson",
      "product": "Mouse",
      "price": 24.99,
      "region": "South",
      "status": "completed"
    },
    {
      "order_id": 1006,
      "customer": "Sarah Johnson",
      "product": "Laptop",
      "price": 899.99,
      "region": "South",
      "status": "pending"
    }
  ]
}
EOF
```

::: tabs

@tab:active Example 1

Pretty-print JSON.

```sh
jq '.' sales_sample.json
```

@tab Example 2

Extract all customer names.

```sh
jq '.orders[].customer' sales_sample.json
```

@tab Example 3

Filter orders over $100. 

```sh
jq '.orders[] | select(.price > 100)' sales_sample.json
```

@tab Example 4

Convert to CSV format.

```sh
jq -r '.orders[] | [.order_id, .customer, .product, .price] | @csv' sales_sample.json
```

:::

![Convert Data to JSON format](https://tecmint.com/wp-content/uploads/2025/10/convert-Data-to-JSON-format.png)

---

## Bonus: Combining Tools with Pipes

Here’s where the magic really happens: you can chain these tools together using pipes `(|)` to create powerful data processing pipelines.

::: tabs

@tab:active Example 1

Find the 10 most common words in a text file:

```sh
cat article.txt | tr '[:upper:]' '[:lower:]' | tr -s ' ' '\n' | sort | uniq -c | sort -rn | head -10
```

@tab Example 2

Analyze web server logs:

```sh
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -20
```

@tab Example 3

Quick data exploration:

```sh
cut -d',' -f3 sales.csv | tail -n +2 | sort -n | uniq -c
```

:::

### Practical Workflow Example

Let me show you how these tools work together in a real scenario. Imagine you have a large CSV file with sales data, and you want to:

- Remove the header.
- Extract the product name and price columns.
- Find the top 10 most expensive products.

Here’s the one-liner:

```sh
tail -n +2 sales.csv | cut -d',' -f2,5 | sort -t',' -k2 -rn | head -10
```

::: info Breaking it down:

- `tail -n +2`: Skip the header row.
- `cut -d',' -f2,5`: Extract columns 2 and 5.
- `sort -t',' -k2 -rn`: Sort by second field, numerically, reverse order.
- `head -10`: Show top 10 results.

:::

---

## Conclusion

These 10 command-line tools are like having a Swiss Army knife for data. They’re fast, efficient, and once you get comfortable with them, you’ll find yourself reaching for them constantly, even when you’re working on Python projects.

Start with the basics: `head`, `tail`, `wc`, and `grep`. Once those feel natural, add `cut`, `sort`, and `uniq` to your arsenal. Finally, level up with `awk`, `sed`, and `jq`.

Remember, you don’t need to memorize everything. Keep this guide bookmarked, and refer back to it when you need a specific tool. Over time, these commands will become second nature.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 Essential Linux Commands for Data Scientists",
  "desc": "In this article, explore essential command-line tools like grep, awk, sed, and jq with practical CSV examples and beginner-friendly tutorials.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/linux-command-line-tools-data-scientists.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
