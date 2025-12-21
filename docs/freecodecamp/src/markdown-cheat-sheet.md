---
lang: en-US
title: "Markdown Cheat Sheet - How to Write in Markdown with Examples"
description: "Article(s) > Markdown Cheat Sheet - How to Write in Markdown with Examples"
icon: fa-brands fa-markdown
category:
  - Markdown
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - markdown
  - md
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Markdown Cheat Sheet - How to Write in Markdown with Examples"
    - property: og:description
      content: "Markdown Cheat Sheet - How to Write in Markdown with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/markdown-cheat-sheet.html
prev: /programming/md/articles/README.md
date: 2022-02-11
isOriginal: false
author:
  - name: Zaira Hira
    url : https://freecodecamp.org/news/author/zaira/
cover: https://freecodecamp.org/news/content/images/size/w2000/2022/01/Copy-of-Copy-of-Cron-jobs-Linux.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Markdown > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Markdown Cheat Sheet - How to Write in Markdown with Examples"
  desc="Markdown has gained popularity because it's easy to use and it's widely accepted across platforms.  You can use markdown to write content that can be conveyed in plain text. A good example would be a blog post. In this article, you'll learn what mark..."
  url="https://freecodecamp.org/news/markdown-cheat-sheet"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2022/01/Copy-of-Copy-of-Cron-jobs-Linux.png"/>

Markdown has gained popularity because it's easy to use and it's widely accepted across platforms.

You can use markdown to write content that can be conveyed in plain text. A good example would be a blog post.

In this article, you'll learn what markdown is and how to use it.

---

## What is Markdown?

Markdown is a markup language just like HTML. We use it to parse text and convert it into a specific format. You can also think of it as a text to HTML converter tool.

Many developers like writing in markdown because it gives them fine-grained control over their text and code. We'll see how and why in the coming paragraphs.

::: info In this guide we'll cover the following topics

- How to create your first markdown file.
- Create a cheat sheet for markdown
- Discuss how markdown can be rendered in VS Code

:::

::: note Tools that Support Markdown

Markdown works in any browser even if you use a simple notepad. But there are certain tools that can help enhance your productivity by providing a real time view (of markdown and rich text) side by side.

The following are some of the tools that support working with markdown:

- VSCode (We'll cover this in this article)
- Atom
- Haroopad
- Sublime text
- MarkPad

:::

---

## How to Work with Markdown

### Download VSCode and enable the plugin

VSCode is a text editor like notepad, but it has many more capabilities. You can also use it for coding and it supports numerous programming languages.

We'll be using VSCode to write and render markdown files.

You can download VSCode from [<VPIcon icon="iconfont icon-vscode"/>here](https://code.visualstudio.com/download).

Once your download is completed, activate the below extension:

![VS code extension](https://freecodecamp.org/news/content/images/2022/01/image-118.png)

### How to create your first markdown file

To work with markdown, simply save the text file with <VPIcon icon="fa-brands fa-markdown"/>`.md` extension. After that, you'll be able to apply markdown syntax.

After creating your file and activating the plugin, the workspace should look something like this.

![](https://freecodecamp.org/news/content/images/2022/01/image-119.png)

### Markdown in action

In markdown, we use a specific syntax to denote headings, bold text, lists, and other text formatting.

You can refer to the table below for an overview of basic markdown syntax:

::: tabs

@tab Heading

- Heading 1: `#`
- Heading 2: `##`
- Heading 3: `###`

@tab Text

- Italics: `*italics*`
- Bold `**Bold**`
- Strike: `~~insert text~~`

@tab Block quote

```md
> Hello world
```

> Hello world

@tab Link

```md
[link name](link.com)
```

[link name](link.com)

@tab Unorderd list

```md
- List item
```

- List item

@tab Code Block

```md
`insert code here`
```

`insert code here`

:::

Simply start writing in your <VPIcon icon="fa-brands fa-markdown"/>`.md` file and see the results side by side.

![](https://freecodecamp.org/news/content/images/2022/01/image-121.png)

### How to write code blocks in Markdown

There is language support available for many programming languages in VSCode.

Here are some examples of coding in different languages.

![Code blocks for HTML and Bash](https://freecodecamp.org/news/content/images/2022/01/image-137.png)

![Code blocks for Python and JS](https://freecodecamp.org/news/content/images/2022/01/image-138.png)

### Escape characters in markdown

If you want the browser to ignore the syntax and retain the characters, the characters can be escaped using the backslash `\`.

For instance, `*` would not parse its succeeding characters as italics.

---

## Practical Applications of Markdown

You can use markdown in email templates, and it is a natural fit for technical documentation.

A great example for markdown is the GitHub README.md file. There, code blocks are easily combined with well-formatted text.

---

## Download the Markdown Cheat Sheet

I've compiled all the tips you've learned here in a cheat sheet.

You can download the cheat sheet [here (<VPIcon icon="iconfont icon-github"/>`zairahira/Markdown-cheatsheet`)](https://github.com/zairahira/Markdown-cheatsheet/blob/main/README.md).

<SiteInfo
  name="zairahira/Markdown-cheatsheet"
  desc="Markdown-cheatsheet/README.md at main"
  url="https://github.com/zairahira/Markdown-cheatsheet/blob/main/README.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/359de6cfca6efd4493ffe8c5fde95eeeb93423d1aa6d74787d8942256b26907c/zairahira/Markdown-cheatsheet"/>

---

## Wrapping up

By now I hope you're confident enough to write your own markdown. Once you get the hang of it, it's easy enough. Apart from being simple, it is also very powerful and widely accepted.

Check out my other [blog posts (<VPIcon icon="fa-brands fa-free-code-camp"/>zaira).](https://freecodecamp.org/news/author/zaira/) Let's connect on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`hira_zaira`)](https://x.com/hira_zaira).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Markdown Cheat Sheet - How to Write in Markdown with Examples",
  "desc": "Markdown has gained popularity because it's easy to use and it's widely accepted across platforms.  You can use markdown to write content that can be conveyed in plain text. A good example would be a blog post. In this article, you'll learn what mark...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/markdown-cheat-sheet.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
