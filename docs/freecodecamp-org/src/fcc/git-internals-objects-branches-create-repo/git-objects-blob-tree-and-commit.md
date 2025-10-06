---
lang: en-US
title: "Git Objects — blob, tree and commit"
description: "Article(s) > (1/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
category:
  - Git
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - git
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "Git Objects — blob, tree and commit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/git-internals-objects-branches-create-repo/git-objects-blob-tree-and-commit.html
date: 2020-12-15
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
  desc="Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how"
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-git-objects-blob-tree-and-commit"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

It is very useful to think about `git` as maintaining a file system, and specifically — snapshots of that system in time.

A file system begins with a *root directory* (in UNIX-based systems, `/`), which usually contains other directories (for example, `/usr` or `/bin`). These directories contain other directories, and/or files (for example, `/usr/1.txt`).

In `git`, the contents of files are stored in objects called **blobs**, binary large objects.

The difference between **blobs** and files is that files also contain meta-data. For example, a file “remembers” when it was created, so if you move that file into another directory, its creation time remains the same.

**Blobs**, on the other hand, are just contents — binary streams of data. A **blob** doesn’t register its creation date, its name, or anything but its contents.

Every **blob** in `git` is identified by its [SHA-1 hash](https://en.wikipedia.org/wiki/SHA-1). SHA-1 hashes consist of 20 bytes, usually represented by 40 characters in hexadecimal form. Throughout this post we will sometimes show just the first characters of that hash.

![Blobs have SHA-1 hashes associated with them](https://freecodecamp.org/news/content/images/2020/12/image-34.png)

In `git`, the equivalent of a directory is a **tree**. A **tree** is basically a directory listing, referring to **blobs** as well as other **trees**.

**Trees** are identified by their SHA-1 hashes as well. Referring to these objects, either **blobs** or other **trees**, happens via the SHA-1 hash of the objects.

![A tree is a directory listing](https://freecodecamp.org/news/content/images/2020/12/image-35.png)

Note that the **tree** **CAFE7** refers to the **blob F92A0** as <VPIcon icon="fas fa-file-image"/>`pic.png`. In another **tree**, that same **blob** may have another name.

![A tree may contain sub-trees, as well as blobs](https://freecodecamp.org/news/content/images/2020/12/image-36.png)

The diagram above is equivalent to a file system with a root directory that has one file at <VPIcon icon="fa-brands fa-js"/>`/test.js`, and a directory named <VPIcon icon="fas fa-folder-open"/>`/docs` with two files: <VPIcon icon="fas fa-folder-open"/>`/docs/`<VPIcon icon="fas fa-file-image"/>`pic.png` and `/docs/`<VPIcon icon="fas fa-file-lines"/>`1.txt`.

Now it’s time to take a snapshot of that file system — and store all the files that existed at that time, along with their contents.

In `git`, a snapshot is a **commit**. A **commit** object includes a pointer to the main **tree** (the root directory), as well as other meta-data such as the **committer**, a **commit** message and the **commit** time.

In most cases, a **commit** also has one or more parent **commits** — the previous snapshot(s). Of course, **commit** objects are also identified by their SHA-1 hashes. These are the hashes we are used to seeing when we use `git log`.

![A commit is a snapshot in time. It refers to the root tree. As this is the first commit, it has no parent(s).](https://freecodecamp.org/news/content/images/2020/12/image-37.png)

Every **commit** holds the *entire snapshot*, not just diffs from the previous **commit(s)**.

How can that work? Doesn’t that mean that we have to store a lot of data every commit?

Let’s examine what happens if we change the contents of a file. Say that we edit <VPIcon icon="fas fa-file-lines"/>`1.txt`, and add an exclamation mark — that is, we changed the content from `HELLO WORLD`, to `HELLO WORLD!`.

Well, this change would mean that we have a new **blob,** with a new SHA-1 hash. This makes sense, as `sha1("HELLO WORLD")` is different from `sha1("HELLO WORLD!")`.

![Changing the blob results in a new SHA-1](https://freecodecamp.org/news/content/images/2020/12/image-38.png)

Since we have a new hash, then the **tree**’s listing should also change. After all, our **tree** no longer points to **blob 73D8A**, but rather **blob 62E7A** instead. As we change the **tree**’s contents, we also change its hash.

![The tree that points to the changed blob needs to change as well](https://freecodecamp.org/news/content/images/2020/12/image-39.png)

And now, since the hash of that **tree** is different, we also need to change the parent **tree** — as the latter no longer points to **tree CAFE7**, but rather **tree 24601**. Consequently, the **parent** **tree** will also have a new hash.

![The root tree also changes, and so does its hash.](https://freecodecamp.org/news/content/images/2020/12/image-40.png)

Almost ready to create a new **commit** object, and it seems like we are going to store a lot of data — the entire file system, once more! But is that really necessary?

Actually, some objects, specifically **blob** objects, haven’t changed since the previous commit — **blob F92A0** remained intact, and so did **blob F00D1.**

So this is the trick — as long as an object doesn’t change, we don’t store it again. In this case, we don’t need to store **blob F92A0** and **blob F00D1** once more. We only refer to them by their hash values. We can then create our **commit** object.

![Blobs that remained intact are referenced by their hash values](https://freecodecamp.org/news/content/images/2020/12/image-41.png)

Since this **commit** is not the first **commit**, it has a parent — **commit A1337**.

## So to recap, we introduced three git objects:

- **blob —** contents of a file.
- **tree** — a directory listing (of **blobs** and **trees**).
- **commit** — a snapshot of the working tree.

Let us consider the hashes of these objects for a bit. Let’s say I wrote the string `git is awesome!` and created a **blob** from it. You did the same on your system. Would we have the same hash?

The answer is — Yes. Since the **blobs** consist of the same data, they’ll have the same SHA-1 values.

What if I made a **tree** that references the **blob** of `git is awesome!`, and gave it a specific name and metadata, and you did exactly the same on your system. Would we have the same hash?

Again, yes. Since the **trees** objects are the same, they would have the same hash.

What if I created a **commit** of that **tree** with the commit message `Hello`, and you did the same on your system. Would we have the same hash?

In this case, the answer is — No. Even though our **commit** objects refer to the same **tree**, they have different **commit** details — time, committer etc.
