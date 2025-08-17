---
lang: en-US
title: "How To Add/Edit Path Environment Variable In Windows 11"
description: "Article(s) > How To Add/Edit Path Environment Variable In Windows 11"
icon: fa-brands fa-windows
category:
  - DevOps
  - Windows
  - Article(s)
tag:
  - blog
  - c-sharpcorner.com
  - devops
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Add/Edit Path Environment Variable In Windows 11"
    - property: og:description
      content: "How To Add/Edit Path Environment Variable In Windows 11"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/c-sharpcorner.com/how-to-addedit-path-environment-variable-in-windows-11.html
prev: /devops/win/articles/README.md
date: 2022-02-21
isOriginal: false
author:
  - name: Rohit Gupta
    url : https://c-sharpcorner.com/members/rohit-gupta95
cover: https://c-sharpcorner.com/images/csharp-corner-new.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Add/Edit Path Environment Variable In Windows 11"
  desc="In this article, I will let you know about ways by which you can add or edit the path environment variable in windows 11."
  url="https://c-sharpcorner.com/article/how-to-addedit-path-environment-variable-in-windows-11"
  logo="https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg"
  preview="https://c-sharpcorner.com/images/csharp-corner-new.png"/>

## Introduction

In this article, we will see how we can create and set up path environment variables in Windows 11. ---

## Windows Environment Variables

The Environment Variable is a variable that the computer creates and maintains automatically. It assists the system in determining where to install files, locate programs, and check for user and system preferences. It may also be accessed from anywhere on the computer by graphical and command-line tools. It is required to set up the environment variables so that the system knows the executable file that it needs to run on a given command.

---

## Windows Path Variable

The PATH variable is nothing more than a directory of your computer's applications and instructions. The PATH variable must include the address of any new program on your computer that you want to start through the command-line interface. As part of the process, Windows looks for the address for a certain command. When you send a command from the command line, Windows initially searches for it in the current directory. If it cannot be found in the current directory, the operating system checks for the address in the PATH variable.

---

## Check Environment Variables

Use the following command to check the environment variables set on your PC.

```batch
echo %Environment Variable name%
```

![To check the Path environment variable I will use `echo %Path%`](https://c-sharpcorner.com/article/temp/100567/Images/path1.png)

---

## Setup Path Environment Variable

We require permission from the system administrator and privileges to utilize and set the environment variables. As a result, you must notify the system administrator and request their assistance if you are not one.

### Step 1

Open the Setting using any of the following ways

1. Press <kbd>win</kbd>+<kbd>R</kbd>, type `sysdm.cpl` and press `Ok`.
2. Press <kbd>win</kbd>+<kbd>I</kbd>
3. Press <kbd>win</kbd>+<kbd>X</kbd>, select "System".
4. Press <kbd>win</kbd>+<kbd>S</kbd>, search for "System".

![](https://c-sharpcorner.com/article/temp/100567/Images/Path2.png)

::: note

You can skip steps 1 to 3 and directly open "System Properties" by pressing <kbd>win</kbd>+<kbd>S</kbd> to open the search menu and typing "environment", and press open.

:::

![](https://c-sharpcorner.com/article/how-to-manage-multiple-versions-of-python-on-windows-11/Images/MP1.png)

### Step 2

Under System, click on "About".

![](https://c-sharpcorner.com/article/temp/100567/Images/Path2_1.png)

### Step 3

Click on "Advanced system settings".

![](https://c-sharpcorner.com/article/temp/100567/Images/Parh3_1.png)

### Step 4

Click "Environment Variables...".

![](https://c-sharpcorner.com/article/how-to-manage-multiple-versions-of-python-on-windows-11/Images/MP2.png)

### Step 5

The environment variables panel shows up on the screen. You can observe two types of variables

1. **User Variables:** Use them when you wish to change the environment variables for the current or specific user.
2. **System Variables:** Use them when you want the system-wide changes.

 I want to change the path variable system-wide, hence I will double-click on the highlighted row.

### Step 6

Click the New button to add new paths or edit to modify the existing path. Delete will delete a path.

Press "OK" to save the changes.

If you already know the path, just write it in or copy and paste it. You may simply select Browse and then go to the route you wish to add in the System path variables.

---

## To Create a New Environment Variable

Sometimes you may need to create a new environment variable, so for that, follow steps 1 to 4. After that, click on "New" to open the "New System Variable" popup.

Add "Variable Name". You may choose whatever name you want.

Using "Browse Directory", you can select a directory. Press OK to select the desired folder.

Using "Browse Directory", you can select a particular file. Press OK to select the desired file.

---

## Conclusion

In this article, we discussed how we can manage path environment variables on Windows 11. Visit C# Corner to find answers to more such questions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Add/Edit Path Environment Variable In Windows 11",
  "desc": "In this article, I will let you know about ways by which you can add or edit the path environment variable in windows 11.",
  "link": "https://chanhi2000.github.io/bookshelf/c-sharpcorner.com/how-to-addedit-path-environment-variable-in-windows-11/.html",
  "logo": "https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg",
  "background": "rgba(0,121,199,0.2)"
}
```
