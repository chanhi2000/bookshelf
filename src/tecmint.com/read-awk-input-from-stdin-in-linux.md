---
lang: en-US
title: "How to Read and Filter Awk Input from STDIN in Linux - Part 7"
description: "Article(s) > How to Read and Filter Awk Input from STDIN in Linux - Part 7"
icon: iconfont icon-awk
category: 
  - Linux
  - Shell
  - awk
  - Article(s)
tag: 
  - blog
  - tecmint.com
  - sh
  - shell
  - linux
  - awk
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Read and Filter Awk Input from STDIN in Linux - Part 7"
    - property: og:description
      content: "How to Read and Filter Awk Input from STDIN in Linux - Part 7"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/read-awk-input-from-stdin-in-linux.html
prev: /tool/awk/articles/README.md
date: 2024-08-12
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2016/06/Read-Awk-Input-from-STDIN.png
---

# {{ $frontmatter.title }}

```component VPCard
{
  "title": "awk > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/awk/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Read and Filter Awk Input from STDIN in Linux - Part 7"
  desc="In this Part 7 of Awk series, we shall look at few examples where you can filter the output of other commands instead of reading input from a file."
  url="https://tecmint.com/read-awk-input-from-stdin-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2016/06/Read-Awk-Input-from-STDIN.png"/>

In the previous parts of the [**Awk command series**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md), we looked at reading input mostly from files, but what if you want to read input from **STDIN**?

In **Part 7** of the **Awk** series, we shall look at a few examples where you can [**filter the output of other commands**](/tecmint.com/pipe-command-output-to-other-commands.md) instead of reading input from a file.

---

## List Files Owned by User in Directory

We shall start with the [**`dir` command**](/tecmint.com/linux-dir-command-usage-with-examples.md), which works similarly to the [**`ls` command**](/tecmint.com/ls-command-in-linux.md). In the first example below, we use the output of the `dir -l` command as input for **awk** to print the owner’s username, group name, and the files he/she owns in the current directory:

```sh
dir -l | awk '{print $3, $4, $9;}'
```

![List Files Owned By User in Directory](https://tecmint.com/wp-content/uploads/2016/06/List-Files-Owned-By-User-in-Directory.png)

---

## List Files Owned by Root User

Take a look at another example where we [**employ awk expressions**](/tecmint.com/combine-multiple-expressions-in-awk.md), here, we want to print files owned by the **root** user by using an expression to filter strings as in the awk command below:

```sh
dir -l | awk '$3=="root" {print $1,$3,$4, $9;} '
```

![List Files Owned by Root User](https://tecmint.com/wp-content/uploads/2016/06/List-Files-Owned-by-Root-User.png)

The command above includes the `(==)` comparison operator to help us filter out files in the current directory that are owned by the root user. This is achieved using the expression `$3==”root”`.

---

## Use Awk Comparison Operator to Match String

Let us look at another example of where we use an [**awk comparison operator**](/tecmint.com/comparison-operators-in-awk.md) to match a certain string.

Here, we have used the [**`cat` command**](/tecmint.com/13-basic-cat-command-examples-in-linux.md) to view the contents of a file named <VPIcon icon="fas fa-file-lines"/>`tecmint_deals.txt` and we want to view the deals of type **Tech** only, so we shall run the following commands:

```sh
cat tecmint_deals.txt
cat tecmint_deals.txt | awk '$4 ~ /tech/{print}'
cat tecmint_deals.txt | awk '$4 ~ /Tech/{print}'
```

![Use Awk Comparison Operator to Match String](https://tecmint.com/wp-content/uploads/2016/06/Use-Comparison-Operator-to-Match-String.png)

In the example above, we have used the value `~ /pattern/` comparison operator, but there are two commands to try and bring out something very important.

When you run the command with pattern **tech** nothing is printed out because there is no **deal** of that type, but with **Tech**, you get deals of type **Tech**.

So always be careful when using this comparison operator, it is case-sensitive as we have seen above.

You can always use the output of another command instead as input for awk instead of reading input from a file, this is very simple as we have looked at in the examples above.

---

## Filter Files Modified Today

Now to filter files modified today, you can use awk to extract and display these files:

```sh
ls -l | awk '$6 == "Aug" && $7 == "9" {print $9}'
```

This command filters files modified on August 9

---

## Count Files of a Specific Type

To count the number of `.txt` files in a directory, use:

```sh
ls -l | awk '$9 ~ /.txt$/ {count++} END {print count}'
```

---

## Extract Specific Fields from Command Output

If you want to extract specific fields from a [**`ps` command**](/tecmint.com/ps-command-examples-for-linux-process-monitoring.md) output, such as the process ID and command name:

```sh
ps aux | awk '{print $1, $2, $11}'
```

Hope the examples were clear enough for you to understand, if you have any concerns, you can express them through the comment section below, and remember to check the next part of the series where we shall look at **awk** features such as [**variables**](/tecmint.com/learn-awk-variables-numeric-expressions-and-assignment-operators.md), **numeric expressions**, and **assignment operators**.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Read and Filter Awk Input from STDIN in Linux - Part 7",
  "desc": "In this Part 7 of Awk series, we shall look at few examples where you can filter the output of other commands instead of reading input from a file.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/read-awk-input-from-stdin-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```

