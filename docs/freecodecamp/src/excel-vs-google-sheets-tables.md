---
lang: en-US
title: "How to Work with Tables in Excel vs Google Sheets"
description: "Article(s) > How to Work with Tables in Excel vs Google Sheets"
icon: iconfont icon-microsoftexcel
category: 
  - Microsoft
  - Microsoft Office
  - Excel
  - Google 
  - Google Drive
  - Google Sheets
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - excel
  - xls
  - xlsx
  - google
  - google-drive
  - google-sheets
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work with Tables in Excel vs Google Sheets"
    - property: og:description
      content: "How to Work with Tables in Excel vs Google Sheets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/excel-vs-google-sheets-tables.html
prev: /tool/xls/articles/README.md
date: 2024-07-03
isOriginal: false
author:
  - name: Eamonn Cottrell
    url : https://freecodecamp.org/news/author/sieis/
cover: https://freecodecamp.org/news/content/images/2024/07/4.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Excel > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/xls/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Drive > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/google-drive/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with Tables in Excel vs Google Sheets"
  desc="Google Sheets recently released an all new feature: tables. Well, new is a bit of an overstatement. Excel has had proper tables for many, many years, and it's been a point of contention in the spreadsheet community. In this article, I'll break down w..."
  url="https://freecodecamp.org/news/excel-vs-google-sheets-tables"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/4.jpg"/>

Google Sheets recently released an all new feature: tables.

Well, *new* is a bit of an overstatement. Excel has had proper tables for many, many years, and it's been a point of contention in the spreadsheet community.

In this article, I'll break down what exactly tables are, why they're important, and then see how Google Sheet's new tables stack up against Microsoft Excel's.

Here is a video walkthrough of everything we'll cover:

---

## What's a Table?

A table is a way of structuring and formatting data in a spreadsheet. It groups together rows and columns of data so that they can be more easily filtered, grouped, and analyzed.

Many people would look at the following bit of data and wrongly assume that it's already in a table.

![Data in Excel](https://freecodecamp.org/news/content/images/2024/06/image-103.png)

This is merely well organized rows and columns of data in Excel. Each column is a separate category of information, that is ids, names, emails, job titles, and salaries.

Each row represents one entry of that data. So, you'd put your id, name, email, job title and salary going left to right in a row.

Simple, yes?

A table contains all the same data, but by formatting it as a table we can unlock a whole lot of additional functionality.

The first of which is the appearance itself. When we create a table, Excel immediately colors our data with a dark header row and bands of alternating colors.

![Table in Excel](https://freecodecamp.org/news/content/images/2024/06/image-104.png)

Sheets does the same thing, as we can see below.

![Table in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/image-105.png)

So, a table is simply a way of managing and grouping data more easily. But it goes much further than just formatting, as we'll see.

---

## Why are Tables Important?

Tables help reduce errors. When dealing with data, we are always making sure the data is clean and that we don't have errors in our formulas.

Tables help keep things orderly simply by being structured and formatted well. But as we'll see in the formula section in a moment, they also allow us to reduce errors in formulas by dynamically calculating things for us

---

## How to Create a Table in Excel and Sheets

In Microsoft Excel, creating a table is as easy as clicking anywhere in the data range and pressing <kbd>CTRL</kbd>+<kbd>T</kbd>. Immediately, Excel will predict the data range for the table and ask you to confirm this.

![Excel table data range](https://freecodecamp.org/news/content/images/2024/06/image-106.png)

Alternatively, you can find the same create table option from the Insert Menu in the Ribbon at the top.

![Excel insert menu](https://freecodecamp.org/news/content/images/2024/06/table.png)

Over in Sheets, you'll need to either right click in a cell in the data range, or select the option from the Format menu to Convert to Table.

![Convert to table options in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/sheets.png)

One caveat in Sheets: if you right click in a cell, you have to select the whole data range for it to convert to a table. Whereas, if you select Format - Convert to table from the menu, it is (like Excel) smart enough to predict the whole data range.

A small thing. But Excel takes the prize for ease of creation.

![Convert to table in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/right-click.png)

**⭐Winner: EXCEL**

---

## How to Format Tables in Excel and Sheets

As we saw initially, some formatting is done as soon as we create a table.

From here, though, both programs allow for further customization.

In Sheets, we can select the dropdown in the top left next to the table name to access a few options immediately. For the most part, we can simply change the alternating colors of the table.

![Formatting options in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/sheets-format.png)

If we select Custom, it opens up the full alternating colors menu that is also accessible through the Format menu. This gives us more control over the colors, but it's all aesthetic.

![Alternating colors menu in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/image-110.png)

Meanwhile in Excel, we have the same options with a few more toggle selections for styling. For instance, we can check the first column to bold the text in the id column or we toggle between banded columns and/or rows.

And on the far right of the Table Design tab in the Ribbon, there are a ton of prebuilt styles that we can toggle on and off.

![Table design in Excel](https://freecodecamp.org/news/content/images/2024/06/format-excel.png)

Both programs give plenty of options here, and this is mostly to make the tables look good. But Excel comes out on top with more options.

**⭐Winner: EXCEL**

---

## How to Sort Tables in Excel and Google Sheets

In both programs, there is a dropdown toggle button in each of the header row's cells. Selecting this in Excel allows us to sort ascending or descending...or even by color.

![sort in excel](https://freecodecamp.org/news/content/images/2024/06/sort.png)

For instance, if we have some of our data using a blue font color, we can actually sort it by that color:

![Sort by color in Excel](https://freecodecamp.org/news/content/images/2024/06/sort-color.png)

What about Google Sheets? Yep, same deal there. It will also detect when different colors are used and allow you to do the same type of sorting.

![Sort by color in Sheets](https://freecodecamp.org/news/content/images/2024/06/sheets-sorting-options-1.png)

Excel does have a Custom Sorting dialog box that can drill down into more detail. For instance, you can add levels of sorting.

Using our color example, we can first sort by the blue font colors in the email color and then by the red font colors in the job title column.

![Multiple column sorting in Excel](https://freecodecamp.org/news/content/images/2024/06/double-sort.png)

Google Sheets can do the same thing, but not from the header drop downs. The header drop down sorting is restricted to one row at a time in Sheets.

But, if you select the entire table's data range and then `Data - Sort Range - Advanced range sorting options`, you are able to sort by multiple columns in Google Sheets.

![Advanced sorting in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/advanced-sort-google-sheets.png)

Sheets' advanced sorting is not as powerful as Excel's, though. You are only able to sort ascending or descending by value. Excel takes the cake on this one by a hair.

![Image](https://freecodecamp.org/news/content/images/2024/06/google-sheets-muiltiple-row-sorting.png)

**⭐Winner: EXCEL**

---

## How to Filter Tables in Excel and Google Sheets

Filtering works exactly the same as sorting. In both programs, click the dropdown selector in the header row to see the options for filtering.

In both programs, we have the same options. We can filter by color just like in our sorting. We can filter by values by either selecting all, none, or individual values. And we can filter by condition.

Here's Google Sheet's menu:

![Filtering in Google Sheets](https://freecodecamp.org/news/content/images/2024/06/image-113.png)

And here's Excel's menu. All the same options are available. Both programs allow for custom filter formulas to be entered as well.

![Filtering in Excel](https://freecodecamp.org/news/content/images/2024/06/image-112.png)

**⭐Winner: TIE**

---

## How to Use Tables in Formulas in Excel and Google Sheets

One of the big reasons to use tables lies in formulas. Whether you use Excel or Sheets, you are likely taking advantage of built-in functions and the ability to create custom formulas for analyzing your data.

By holding your data in a table, your formulas can reference that data dynamically.

Meaning, if you add rows of data to your table, any formulas referencing those table values will update automatically.

The risk of breaking things by adding data decreases dramatically with the use of tables.

Here's a simple example. If we wanted to combine the first and last names into one cell, we could concatenate them with this formula `=Salary[first_name]&" "&Salary[last_name]`.

In Excel, we reference a table by its name, in this case, `Salary`. Then within brackets, we reference a column name, `[last_name]`.

![Spill formula in Excel](https://freecodecamp.org/news/content/images/2024/06/image-115.png)

We can do the exact same in Sheets.

![Formula referencing in Sheets](https://freecodecamp.org/news/content/images/2024/06/image-116.png)

There's one powerful difference, though. In Excel, the formula will spill down. Meaning, we only have to write it once at the very top, but because it sees that we're referencing values in a table, it will spill down to every row in the table.

In Google Sheets, we still have to drag the formula down.

Now, sometimes, we may not want things to spill down. In this case we can use different syntax in Excel. Instead of the column name within brackets, we can add an @ sign and another set of brackets. This tells Excel to only make the calculation on one row:

![Formula referencing in Excel](https://freecodecamp.org/news/content/images/2024/06/image-117.png)

Excel flexes on this one. It's much more powerful to use tables in formulas in Excel than in Sheets.

**⭐Winner: EXCEL**

---

## How to Change Table Range in Excel and Google Sheets

What if we want to extend our table or remove data from it? Both Google Sheets and Excel allow us to do this easily.

Say we want to add a column for the full name of a person. In both programs, if we simply type in `full_name` in G1 to the right of our last column, that column will become a part of the table's data range.

Anytime we type in an adjacent column or row to our table data, the programs will assume the table needs to extend to include it.

Then, we can use a version of the formula from our previous example to insert the full names. Now that we are inside of the table, though, it's not necessary to include the title of the table in our formula.

Now, all that's needed in Excel is `=[@[first_name]]&" "&[@[last_name]]`.

![Reference table columns in Excel](https://freecodecamp.org/news/content/images/2024/06/image-119.png)

For Google Sheets, it's the same inside the table as outside it: `=Table2[first]&" "&Table2[last]`. Sheets also requires us to drag the formula down. It does not handle spilling like Excel (yet).

![Reference table columns in Sheets](https://freecodecamp.org/news/content/images/2024/06/image-118.png)

To add columns within a table, we can right click the column name and select insert.

![Insert column in Excel](https://freecodecamp.org/news/content/images/2024/06/image-120.png)

Google has a slight edge here in that you can select whether to insert to the left or the right, whereby Excel only inserts to the left.

![Insert column Google Sheets](https://freecodecamp.org/news/content/images/2024/06/image-121.png)

Inserting rows is exactly the same. Excel allows for inserting rows above, while Sheets allows you to select above or below.

![Inserting rows Google Sheets](https://freecodecamp.org/news/content/images/2024/06/image-122.png)

In both programs, deleting rows and columns is as simple as selecting the row(s) or column(s), right clicking, and selecting delete.

In Excel you have the added benefit of a keyboard shortcut. `CTRL + -` will delete the selected rows or columns.

Both programs will also allow you to convert a table back to a regular data range. In Excel, it's the `Convert to Range` button in the `Table Design` tab of the menu

![Convert to Range option in Excel](https://freecodecamp.org/news/content/images/2024/07/convert.png)

And in Google Sheets, it's the `Revert to unformatted data` option from the table dropdown menu.

![Revert to unformatted data option in Sheets](https://freecodecamp.org/news/content/images/2024/07/revert.png)

**⭐Winner: TIE**

---

## How to Add a Total Row in a Table

There's a good chance you'll want to total up the amounts in a column. How easy is this to add in a table?

You can do it in both programs, but...

Excel makes it incredibly easy. There's a toggle option for this in the Table Design menu in the Ribbon. Toggle this on, and a Total row is automatically included and calculated at the bottom.

![Total row in Excel](https://freecodecamp.org/news/content/images/2024/06/total-row.png)

Can you do the same in Sheets?

Yes, you've just got to do it yourself.

![Total row in Sheets](https://freecodecamp.org/news/content/images/2024/06/image-124.png)

**⭐Winner: EXCEL**

---

## Who Wins?

Well, it's no surprise that Excel comes out on top. Sheets users (myself included) have a lot to be excited about with the ability to finally create proper tables. By and large, the functionality is just as powerful as Excel.

And much like many features compared between the two programs, Sheets can probably get the job done for most use cases.

Excel, as per normal, simply does more and does it a little bit better.

I'm Eamonn, and I'll help you **get good at spreadsheets**. Join my free newsletter, [<VPIcon icon="fas fa-globe"/>Got Sheet, here](https://gotsheet.xyz/subscribe).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Tables in Excel vs Google Sheets",
  "desc": "Google Sheets recently released an all new feature: tables. Well, new is a bit of an overstatement. Excel has had proper tables for many, many years, and it's been a point of contention in the spreadsheet community. In this article, I'll break down w...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/excel-vs-google-sheets-tables.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
