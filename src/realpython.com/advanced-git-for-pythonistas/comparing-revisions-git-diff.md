---
lang: en-US
title: "Comparing Revisions: git diff"
description: "Article(s) > (3/6) Advanced Git Tips for Python Developers"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/6) Advanced Git Tips for Python Developers"
    - property: og:description
      content: "Comparing Revisions: git diff"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/advanced-git-for-pythonistas/comparing-revisions-git-diff.html
date: 2018-08-13
isOriginal: false
author:
  - name: Jim Anderson
    url : https://realpython.com/team/janderson/
cover: https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Advanced Git Tips for Python Developers",
  "desc": "In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Comparing Revisions: git diff, and how to clean up the mess if something doesn't work out.",
  "link": "/realpython.com/advanced-git-for-pythonistas/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced Git Tips for Python Developers"
  desc="In this Git tutorial for Python developers, we'll talk about how to address specific commits and entire ranges of commits, using the stash to save temporary work, comparing different commits, Comparing Revisions: git diff, and how to clean up the mess if something doesn't work out."
  url="https://realpython.com/advanced-git-for-pythonistas#comparing-revisions-git-diff"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Advanced-Git-for-Python-Developers_Watermarked.2b24c6a6fe45.jpg"/>
  
The `git diff` command is a powerful feature that you’ll find yourself using quite frequently. I looked up the list of things it can compare and was surprised by the list. Try typing `git diff --help` if you’d like to see for yourself. I won’t cover all of those use cases here, as many of them aren’t too common.

This section has several use cases with the `diff` command, which displays on the command line. The next section shows how you can set Git up to use a visual diff tool like Meld, Windiff, BeyondCompare, or even extensions in your IDE. The options for `diff` and `difftool` are the same, so most of the discussion in this section will apply there too, but it’s easier to show the output on the command line version.

The most common use of `git diff` is to see what you have modified in your working directory:

```sh
echo "I'm editing file3 now" >> file3
git diff
# 
# diff --git a/file3 b/file3
# index faf2282..c5dd702 100644
# --- a/file3
# +++ b/file3
# @@ -1,3 +1,4 @@
# {other contents of files3}
# +I'm editing file3 now
```

As you can see, `diff` shows you the diffs in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>“patch”](https://en.wikipedia.org/wiki/Patch_(Unix)) format right on the command line. Once you work through the format, you can see that the `+` characters indicate that a line has been added to the file, and, as you’d expect, the line `I'm editing file3 now` was added to <FontIcon icon="fas fa-file-lines"/>`file3`.

The default options for `git diff` are to show you what changes are in your working directory that are **not** in your index or in HEAD. If you add the above change to the index and then do diff, it shows that there are no diffs:

```sh
git add file3
git diff
# 
# [no output here]
```

I found this confusing for a while, but I’ve grown to like it. To see the changes that are in the index and staged for the next commit, use the `--staged` option:

```sh
git diff --staged
# 
# diff --git a/file3 b/file3
# index faf2282..c5dd702 100644
# --- a/file3
# +++ b/file3
# @@ -1,3 +1,4 @@
#  file1
#  file2
#  file3
# +I'm editing file3 now
```

The `git diff` command can also be used to compare any two commits in your repo. This can show you the changes between two SHAs:

```sh
git diff b3e9b4d 387dcfc
# 
# diff --git a/file3 b/file3
# deleted file mode 100644
# index faf2282..0000000
# --- a/file3
# +++ /dev/null
# @@ -1,3 +0,0 @@
# -file1
# -file2
# -file3
```

You can also use branch names to see the full set of changes between one branch and another:

```sh
git diff master tmp
# 
# diff --git a/file1 b/file1
# index e212970..04dbd7b 100644
# --- a/file1
# +++ b/file1
# @@ -1 +1,2 @@
#  file1
# +editing file1
```

You can even use any mix of the revision naming methods we looked at above:

```sh
git diff master^ master
# 
# diff --git a/file3 b/file3
# new file mode 100644
# index 0000000..faf2282
# --- /dev/null
# +++ b/file3
# @@ -0,0 +1,3 @@
# +file1
# +file2
# +file3
```

When you compare two branches, it shows you all of the changes between two branches. Frequently, you only want to see the diffs for a single file. You can restrict the output to a file by listing the file after a `--` (two minuses) option:

```sh :collapsed-lines
git diff HEAD~3 HEAD
# 
# diff --git a/file1 b/file1
# index e212970..04dbd7b 100644
# --- a/file1
# +++ b/file1
# @@ -1 +1,2 @@
#  file1
# +editing file1
# diff --git a/file2 b/file2
# index 89361a0..91c5d97 100644
# --- a/file2
# +++ b/file2
# @@ -1,2 +1,3 @@
#  file1
#  file2
# +editing file2
# diff --git a/file3 b/file3
# index faf2282..c5dd702 100644
# --- a/file3
# +++ b/file3
# @@ -1,3 +1,4 @@
#  file1
#  file2
#  file3
# +I'm editing file3 now
# $ git diff HEAD~3 HEAD -- file3
# diff --git a/file3 b/file3
# index faf2282..c5dd702 100644
# --- a/file3
# +++ b/file3
# @@ -1,3 +1,4 @@
#  file1
#  file2
#  file3
# +I'm editing file3 now
```

There are many, many options for `git diff`, and I won’t go into them all, but I do want to explore another use case, which I use frequently, showing the files that were changed in a commit.

In your current repo, the most recent commit on <FontIcon icon="fas fa-code-branch"/>`master` added a line of text to <FontIcon icon="fas fa-file-lines"/>`file1`. You can see that by comparing `HEAD` with `HEAD^`:

```sh
git diff HEAD^ HEAD
# 
# diff --git a/file1 b/file1
# index e212970..04dbd7b 100644
# --- a/file1
# +++ b/file1
# @@ -1 +1,2 @@
#  file1
# +editing file1
```

That’s fine for this small example, but frequently the diffs for a commit can be several pages long, and it can get quite difficult to pull out the filenames. Of course, Git has an option to help with that:

```sh
git diff HEAD^ HEAD --name-only
# 
# file1
```

The `--name-only` option will show you the list of filename that were changed between two commits, but not what changed in those files.

As I said above, there are **many** options and use cases covered by the `git diff` command, and you’ve just scratched the surface here. Once you have the commands listed above figured out, I encourage you to look at `git diff --help` and see what other tricks you can find. I definitely learned new things preparing this tutorial!
