---
lang: en-US
title: "How to Work with Awk Variables, Expressions, and Operators - Part 8"
description: "Article(s) > How to Work with Awk Variables, Expressions, and Operators - Part 8"
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
      content: "Article(s) > How to Work with Awk Variables, Expressions, and Operators - Part 8"
    - property: og:description
      content: "How to Work with Awk Variables, Expressions, and Operators - Part 8"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/work-with-awk-variables-expressions-and-operators.html
prev: /tool/awk/articles/README.md
date: 2024-08-12
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2016/07/Learn-Awk-Variables-Numeric-Expressions-Assignment-Operators.png
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
  name="How to Work with Awk Variables, Expressions, and Operators - Part 8"
  desc="We'll explore advanced Awk features for complex text filtering, including variables, numeric expressions, and assignment operators."
  url="https://tecmint.com/work-with-awk-variables-expressions-and-operators"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2016/07/Learn-Awk-Variables-Numeric-Expressions-Assignment-Operators.png"/>

The [**Awk command series**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md) is getting exciting! I believe that, in the previous seven parts, we walked through some fundamentals of Awk that you need to master to enable you to perform basic text or string filtering in Linux.

Starting with this part, we shall dive into advanced areas of **Awk** to handle more complex text or string filtering operations. Therefore, we will cover Awk features such as **variables**, **numeric expressions**, and **assignment operators**.

These concepts are not significantly different from those you may have encountered in many programming languages before, such as Shell, C, Python, and many others. So, there is no need to worry much about this topic; we are simply revising the common ideas of using these features.

This will probably be one of the easiest Awk command sections to understand, so sit back and let’s get going

---

## 1. Awk Variables

In any programming language, a **variable** is a placeholder that stores a **value**. When you create a variable in a program file, as the file is executed, some space is created in memory that will store the value you specify for the variable.

You can define **Awk** variables in the same way you define shell variables as follows:

```sh
variable_name=value 
```

In the syntax above:

- `variable_name`: is the name you give a variable.
- `value`: the value stored in the variable.

Let’s look at some examples below:

```sh
computer_name=”tecmint.com”
port_no=”22”
email=”admin@tecmint.com”
server=”computer_name”
```

Take a look at the simple examples above, in the first variable definition, the value `tecmint.com` is assigned to the variable `computer_name`.

Furthermore, the value `22` is assigned to the variable `port_no`, it is also possible to assign the value of one variable to another variable as in the last example where we assigned the value of `computer_name` to the variable server.

If you can recall, right from [part 2 of this Awk series](https://tecmint.com/awk-print-fields-columns-with-space-separator/), where we covered field editing, we talked about how Awk divides input lines into fields and uses a standard field access operator, `$` to read the different fields that have been parsed. We can also use variables to store the values of fields as follows.

```sh
first_name=$2
second_name=$3
```

In the examples above, the value of `first_name` is set to the second field and `second_name` is set to the third field.

As an illustration, consider a file named <VPIcon icon="fas fa-file-lines"/>`names.txt` which contains a list of users indicating their first and last names plus gender.

Using the [**`cat` command**](/tecmint.com/cat-command-linux.md), we can view the contents of the file as follows

```sh
cat names.txt
```

![List File Content Using cat Command](https://tecmint.com/wp-content/uploads/2016/07/List-File-Content-Using-cat-Command.png)

Then, we can also use the variables `first_name` and `second_name` to store the first and second names of the first user on the list as by running the **Awk** command below:

```sh
awk '/Aaron/{ first_name=$2 ; second_name=$3 ; print first_name, second_name ; }' names.txt
```

![Store Variables Using Awk Command](https://tecmint.com/wp-content/uploads/2016/07/Store-Variables-Using-Awk-Command.png)

Let us also take a look at another case, when you issue the command `uname -a` on your terminal, it prints out all your system information.

The second field contains your `hostname`, therefore we can store the **hostname** in a variable called `hostname` and print it using **Awk** as follows:

```sh
uname -a
uname -a | awk '{hostname=$2 ; print hostname ; }' 
```

![Store Command Output to Variable Using Awk](https://tecmint.com/wp-content/uploads/2016/07/Store-Command-Output-to-Variable-Using-Awk.png)

---

## 2. Numeric Expressions

In **Awk**, numeric expressions are built using the following numeric operators:

- `*` : multiplication operator
- `+` : addition operator
- `/` : division operator
- `-` : subtraction operator
- `%` : modulus operator
- `^` : exponentiation operator

The syntax for a numeric expression is:

```sh
operand1 operator operand2
```

In the form above, `operand1` and `operand2` can be numbers or variable names, and `operator` is any of the operators above.

Below are some examples to demonstrate how to build numeric expressions:

```sh
counter=0
num1=5
num2=10
num3=num2-num1
counter=counter+1
```

To understand the use of numeric expressions in **Awk**, we shall consider the following example below, with the file <VPIcon icon="fas fa-file-lines"/>`domains.txt` which contains all domains owned by **Tecmint**.

```plaintext title="domains.txt"
news.tecmint.com
tecmint.com
linuxsay.com
windows.tecmint.com
tecmint.com
news.tecmint.com
tecmint.com
linuxsay.com
tecmint.com
news.tecmint.com
tecmint.com
linuxsay.com
windows.tecmint.com
tecmint.com
```

To view the contents of the file, use the command below:

```sh
cat domains.txt
```

![View Contents of File](https://tecmint.com/wp-content/uploads/2016/07/View-Contents-of-File.png)

If we want to count the number of times the domain `tecmint.com` appears in the file, we can write a simple script to do that as follows:

```sh title="script.sh"
#!/bin/bash
for file in $@; do
        if [ -f $file ] ; then
                #print out filename
                echo "File is: $file"
                #print a number incrementally for every line containing tecmint.com 
                awk  '/^tecmint.com/ { counter=counter+1 ; printf "%s\n", counter ; }'   $file
        else
                #print error info incase input is not a file
                echo "$file is not a file, please specify a file." >&2 && exit 1
        fi
done
#terminate script with exit code 0 in case of successful execution 
exit 0
```

![Shell Script to Count a String or Text in File](https://tecmint.com/wp-content/uploads/2016/07/Shell-Script-to-Count-a-String-in-File.png)

After creating the script, save it and make it executable, when we run it with the file, <VPIcon icon="fas fa-file-lines"/>`domains.txt` as our input, we get the following output:

```sh
./script.sh  ~/domains.txt
```

![Script to Count String or Text](https://tecmint.com/wp-content/uploads/2016/07/Script-To-Count-String.png)

From the output of the script, there are 6 lines in the file <VPIcon icon="fas fa-file-lines"/>`domains.txt` which contain `tecmint.com`, to confirm that you can manually count them.

---

## 3. Assignment Operators

The last **Awk** feature we shall cover is assignment operators, there are several assignment operators in Awk and these include the following:

- `*=` : multiplication assignment operator
- `+=` : addition assignment operator
- `/=` : division assignment operator
- `-=` : subtraction assignment operator
- `%=` : modulus assignment operator
- `^=` : exponentiation assignment operator

The simplest syntax of an assignment operation in **Awk** is as follows:

```sh
variable_name=variable_name operator operand
```

Examples:

```sh
counter=0
counter=counter+1

num=20
num=num-1
```

You can use the assignment operators above to shorten assignment operations in **Awk**, consider the previous examples, we could perform the assignment in the following form:

```sh
variable_name operator=operand
```

```sh
counter=0
counter+=1

num=20
num-=1
```

Therefore, we can alter the **Awk** command in the shell script we just wrote above using `+=` assignment operator as follows:

```sh title="script.sh"
#!/bin/bash
for file in $@; do
        if [ -f $file ] ; then
                #print out filename
                echo "File is: $file"
                #print a number incrementally for every line containing tecmint.com 
                awk  '/^tecmint.com/ { counter+=1 ; printf  "%s\n",  counter ; }'   $file
        else
                #print error info incase input is not a file
                echo "$file is not a file, please specify a file." >&2 && exit 1
        fi
done
#terminate script with exit code 0 in case of successful execution 
exit 0
```

![Alter Shell Script](https://tecmint.com/wp-content/uploads/2016/07/Alter-Shell-Script.png)

In this segment of the [**Awk command series**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md), we covered some powerful **Awk** features, that is variables, building numeric expressions, and using assignment operators, plus a few illustrations of how we can actually use them.

These concepts are not any different from the ones in other programming languages but there may be some significant distinctions under Awk programming.

In **part 9**, we shall look at more **Awk** features that are [**special patterns: BEGIN and END**](/tecmint.com/learn-use-awk-special-patterns-begin-and-end.md). Until then, stay connected to **Tecmint**.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Awk Variables, Expressions, and Operators - Part 8",
  "desc": "We'll explore advanced Awk features for complex text filtering, including variables, numeric expressions, and assignment operators.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/work-with-awk-variables-expressions-and-operators.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
