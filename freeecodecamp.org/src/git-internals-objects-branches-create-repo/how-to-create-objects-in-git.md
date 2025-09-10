---
lang: en-US
title: "How to Create Objects in Git"
description: "Article(s) > (7/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
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
      content: "Article(s) > (7/8) A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch"
    - property: og:description
      content: "How to Create Objects in Git"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-internals-objects-branches-create-repo/how-to-create-objects-in-git.html
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
  url="https://freecodecamp.org/news/git-internals-objects-branches-create-repo#heading-how-to-create-objects-in-git"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/A-Visual-Guide-to-Git-Internals-Book-Cover--1-.png"/>

Let's start with creating an object and writing it into the objects’ database of `git`, residing within <VPIcon icon="fas fa-folder-open"/>`.git\objects`. We'll find the SHA-1 hash value of a **blob** by using our first plumbing command, `git hash-object`, in the following way:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```batch
ECHO git is awesome | git hash-object --stdin
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
echo "git is awesome" | git hash-object --stdin
```

By using `--stdin` we are instructing `git hash-object` to take its input from the standard input. This will provide us with the relevant hash value.

In order to actually write that **blob** into `git`’s object database, we can simply add the `-w` switch for `git hash-object`. Then, we can check the contents of the <VPIcon icon="fas fa-folder-open"/>`.git` folder, and see that they have changed.

![Writing a blob to the objects’ database](https://freecodecamp.org/news/content/images/2020/12/image-113.png)

We can now see that the hash of our **blob** is — `54f6...36`. We can also see that a directory has been created under <VPIcon icon="fas fa-folder-open"/>`.git\objects`, a directory named `54`, and within it, a file by the name of `f6...36`.

So `git` actually takes the first two characters of the SHA-1 hash and uses them as the name of a directory. The remaining characters are used as the filename for the file that actually contains the **blob**.

Why is that so? Consider a fairly big repository, one that has 300,000 objects (**blobs**, **trees**, and **commits**) in its database. To look up a hash inside that list of 300,000 hashes can take a while. Thus, `git` simply divides that problem by 256. To look up the hash above, `git` would first look for the directory named `54` inside the directory <VPIcon icon="fas fa-folder-open"/>`.git\objects`, which may have up to 256 directories (`00` through `FF`). Then, it will search that directory, narrowing down the search as it goes.

Back to our process of generating a **commit**. We have now created an object. What is the type of that object? We can use another plumbing command, `git cat-file -t` (`-t` stands for “type”), to check that out:

![](https://freecodecamp.org/news/content/images/2020/12/image-114.png)

Not surprisingly, this object is a **blob**.

![We can also use `git cat-file -p` (`-p` stands for “pretty-print”) to see its contents:](https://freecodecamp.org/news/content/images/2020/12/image-115.png)

This process of creating a **blob** usually happens when we add something to the **staging area** — that is, when we use `git add`.

Remember that `git` creates a **blob** of the *entire* file that is staged. Even if a single character is modified or added (as we added `!` in our example before), the file has a new **blob** with a new **hash**.

![Will there be any change to `git status`?](https://freecodecamp.org/news/content/images/2020/12/image-116.png)

Apparently, no. Adding a **blob** object to `git`’s internal database doesn’t change the status, as `git` doesn’t know of any tracked or untracked files at this stage.

We need to track this file — add it to the **staging area**. To do that, we can use the plumbing command `git update-index`, like so: `git update-index --add --cacheinfo 100644 <blob-hash> <filename>`.

Note: (The `cacheinfo` is a 16-bit file mode [as stored by git](https://github.com/git/git/blob/master/Documentation/technical/index-format.txt), following the layout of [POSIX types and modes](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/sys_stat.h.html). This is not within the scope of this post).

![Running the command above will result in a change to <VPIcon icon="fas fa-folder-open"/>`.git`'s contents](https://freecodecamp.org/news/content/images/2020/12/image-117.png)

Can you spot the change? A new file by the name of `index` was created. This is it — the famous **index** (or **staging area**), is basically a file that resides within <VPIcon icon="fas fa-folder-open"/>`.git\index`.

![So now that our **blob** has been added to the **index**, we expect `git status` to look different, like this](https://freecodecamp.org/news/content/images/2020/12/image-118.png)

That’s interesting! Two things happened here.

First, we can see that <VPIcon icon="fas fa-file-lines"/>`new_file.txt` appears in green, in the `Changes to be committed` area. That is so because the **index** now has <VPIcon icon="fas fa-file-lines"/>`new_file.txt`, waiting to be committed.

Second, we can see that <VPIcon icon="fas fa-file-lines"/>`new_file.txt` appears in red — because `git` believes the *file* <VPIcon icon="fas fa-file-lines"/>`my_file.txt` has been deleted, and the fact that the file has been deleted is not staged.

This happens as we added the **blob** with the contents `git is awesome` to the objects’ database, and told the **index** that the file <VPIcon icon="fas fa-file-lines"/>`my_file.txt` has the contents of that **blob**, but we never actually created that file.

We can easily solve this by taking the contents of the **blob**, and writing them to our file system, to a file called <VPIcon icon="fas fa-file-lines"/>`my_file.txt`:

![](https://freecodecamp.org/news/content/images/2020/12/image-119.png)

![As a result, it will no longer appear in red by `git status`](https://freecodecamp.org/news/content/images/2020/12/image-120.png)

So now it’s time to create a **commit** object from our **staging area**. As explained above, a **commit** object has a reference to a **tree**, so we need to create a **tree**.

We can do this with the command `git write-tree`, which records the contents of the **index** in a **tree** object. Of course, we can use `git cat-file -t` to see that it’s indeed a **tree**:

![Creating a tree object of the index*](https://freecodecamp.org/news/content/images/2020/12/image-121.png)

![And we can use `git cat-file -p` to see its contents:](https://freecodecamp.org/news/content/images/2020/12/image-122.png)

Great, so we created a **tree**, and now we need to create a **commit** object that references this **tree**.

![To do that, we can use `git commit-tree <tree-hash> -m <commit message>`](https://freecodecamp.org/news/content/images/2020/12/image-123.png)

You should now feel comfortable with the commands used to check the created object’s type, and print its contents:

![Creating a commit object](https://freecodecamp.org/news/content/images/2020/12/image-124.png)

Note that this **commit** doesn’t have a **parent**, because it’s the first **commit**. When we add another **commit** we will have to declare its **parent** — we will do so later.

The last hash that we got — `80e...8f` - is a **commit**’s hash. We are actually very used to using these hashes — we look at them all the time. Note that this **commit** owns a **tree** object, with its own hash, which we rarely specify explicitly.

![Will something change in `git status`?](https://freecodecamp.org/news/content/images/2020/12/image-125.png)

Nope 🤔.

Why is that? Well, to know that our file has been committed, `git` needs to know about the latest **commit**. How does `git` do that? It goes to the `HEAD`:

![Looking at `HEAD` on Windows](https://freecodecamp.org/news/content/images/2020/12/image-126.png)

![Looking at `HEAD` on UNIX](https://freecodecamp.org/news/content/images/2020/12/image-127.png)

`HEAD` points to <VPIcon icon="fas fa-code-branch"/>`master`, but what is <VPIcon icon="fas fa-code-branch"/>`master`? We haven’t really created it yet.

As we explained earlier in this post, a branch is simply a named reference to a **commit**. And in this case, we would like <VPIcon icon="fas fa-code-branch"/>`master` to refer to the **commit** with the hash `80e8ed4fb0bfc3e7ba88ec417ecf2f6e6324998f`.

We can achieve this by simply creating a file at <VPIcon icon="fas fa-folder-open"/>`\refs\heads\master`, with the contents of this hash, like so:

![](https://freecodecamp.org/news/content/images/2020/12/image-128.png)

::: note

In sum, a **branch** is just a file inside <VPIcon icon="fas fa-folder-open"/>`.git\refs\heads`, containing a hash of the **commit** it refers to.

![Now, finally, `git status` and `git log` seem to appreciate our efforts](https://freecodecamp.org/news/content/images/2020/12/image-129.png)

:::

We have successfully created a **commit** without using porcelain commands! How cool is that? 🎉
