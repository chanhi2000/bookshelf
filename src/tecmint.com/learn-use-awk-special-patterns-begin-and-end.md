---
lang: ko-KR
title: "How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9"
description: "Article(s) > How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9"
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
      content: "Article(s) > How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9"
    - property: og:description
      content: "How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/learn-use-awk-special-patterns-begin-and-end.html
prev: /tool/awk/articles/README.md
date: 2024-08-14
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2016/07/Learn-Awk-Patterns-BEGIN-and-END.png
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
  name="How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9"
  desc="In this article, we shall cover Awk special patterns: BEGIN and END and these special features will help to expand and explore more complex Awk operations."
  url="https://tecmint.com/learn-use-awk-special-patterns-begin-and-end"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2016/07/Learn-Awk-Patterns-BEGIN-and-END.png"/>

In **Part 8** of [**this Awk series**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md), we introduced some powerful awk command features, that is [**variables, numeric expressions, and assignment operators**](/tecmint.com/learn-awk-variables-numeric-expressions-and-assignment-operators.md).

In this segment, we will cover additional Awk features, specifically special patterns: `BEGIN` and `END`. These special features will be useful as we expand our exploration of complex Awk operations.

To get started, let us drive our thoughts back to the introduction of the **Awk** series, remember when we started this series, I pointed out that the general syntax of running an **Awk** command is:

```sh
awk 'script' filenames  
```

In this syntax, the Awk script is formatted as:

```sh
/pattern/ { actions } 
```

When you consider the pattern in the script, it is normally a regular expression, additionally, you can also think of patterns as special patterns `BEGIN` and `END`.

Therefore, we can also write an **Awk** command in the form below:

```sh
awk '
  BEGIN { actions }
  /pattern/ { actions }
  /pattern/ { actions }
  ...
  END { actions }
' filenames  
```

In the event that you use the special patterns: `BEGIN` and `END` in an **Awk** script, this is what each of them means:

- **BEGIN pattern**: means that Awk will execute the action(s) specified in `BEGIN` once before any input lines are read.
- **END pattern**: means that Awk will execute the action(s) specified in `END` before it exits.

The flow of execution for an Awk command script with these patterns is:

- When the `BEGIN` pattern is used in a script, all the actions for `BEGIN` are executed once before any input line is read.
- Then an input line is read and parsed into the different fields.
- Next, each of the non-special patterns specified is compared with the input line for a match, when a match is found, the action(s) for that pattern are then executed. This stage will be repeated for all the patterns you have specified.
- Next, stage 2 and 3 are repeated for all input lines.
- When all input lines have been read and dealt with, in case you specify the `END` pattern, the action(s) will be executed.

You should always remember this sequence of execution when working with special patterns to achieve the best results in an **Awk** operation.

To understand it all, let us illustrate using the example from [**part 8**](/tecmint.com/learn-awk-variables-numeric-expressions-and-assignment-operators.md), about the list of domains owned by **Tecmint**, as stored in a file named <FontIcon icon="fas fa-file-lines"/>`domains.txt`.

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

![View Contents of File](https://tecmint.com/wp-content/uploads/2016/07/View-Contents-of-File.png)

In this example, we want to count the number of times the domain `tecmint.com` is listed in the file <FontIcon icon="fas fa-file-lines"/>`domains.txt`. So we wrote a small shell script called <FontIcon icon="iconfont icon-shell"/>`script.sh` to help us do that using the idea of variables, numeric expressions, and assignment operators which have the following content:

```sh title="script.sh"
#!/bin/bash
for file in $@; do
    if [ -f $file ]; then
        echo "File is: $file"
        awk '/^tecmint.com/ { counter+=1 ; printf "%s\n", counter ; }' $file
    else
        echo "$file is not a file, please specify a file." >&2 && exit 1
    fi
done
exit 0
```

Let us now employ the two special patterns: `BEGIN` and `END` in the **Awk** command in the script above as follows:

```sh
awk '
  BEGIN { print "The number of times tecmint.com appears in the file is:" ; }
  /^tecmint.com/ { counter+=1 ; }
  END { printf "%s\n", counter ; }
' $file
```

After making the changes to the **Awk** command, the complete shell script now looks like this:

```sh title="script.sh"
#!/bin/bash
for file in $@; do
    if [ -f $file ]; then
        echo "File is: $file"
        awk '
          BEGIN { print "The number of times tecmint.com appears in the file is:" ; }
          /^tecmint.com/ { counter+=1 ; }
          END { printf "%s\n", counter ; }
        ' $file
    else
        echo "$file is not a file, please specify a file." >&2 && exit 1
    fi
done
exit 0
```

![Awk BEGIN and END Patterns](https://tecmint.com/wp-content/uploads/2016/07/Awk-BEGIN-and-END-Patterns.png)

When you run this script, it will first display the file’s location and then execute the Awk command. The `BEGIN` pattern prints the message before any input lines are processed. The pattern `/^tecmint.com/` counts the occurrences of **tecmint.com**, and the `END` pattern prints the total count.

Then our pattern, `/^tecmint.com/` is compared against every input line and the action, `{ counter+=1 ; }` is executed for each input line, which counts the number of times `tecmint.com` appears in the file.

Finally, the `END` pattern will print the total number of times the domain `tecmint.com` appears in the file.

```sh
./script.sh domains.txt
```

![Script to Count Number of Times String Appears](https://tecmint.com/wp-content/uploads/2016/07/Script-to-Count-Number-of-Times-String-Appears.png)

---

## Conclusion

To conclude, we walked through more **Awk** features exploring the concepts of special patterns: `BEGIN` and `END`.

As I pointed out before, these Awk features will help us build more complex [**text filtering operations**](/tecmint.com/use-linux-awk-command-to-filter-text-string-in-files.md), there is more to cover under **Awk** features, and in **part 10**, we shall approach the idea of [**Awk built-in variables**](/tecmint.com/awk-built-in-variables-examples.md), so stay connected.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Awk Special Patterns ‘BEGIN and END’ - Part 9",
  "desc": "In this article, we shall cover Awk special patterns: BEGIN and END and these special features will help to expand and explore more complex Awk operations.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/learn-use-awk-special-patterns-begin-and-end.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```

