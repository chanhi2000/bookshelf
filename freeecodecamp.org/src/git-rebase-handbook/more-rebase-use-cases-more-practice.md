---
lang: en-US
title: "More Rebase Use Cases + More Practice"
description: "Article(s) > (6/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
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
      content: "Article(s) > (6/8) The Git Rebase Handbook - A Definitive Guide to Rebasing"
    - property: og:description
      content: "More Rebase Use Cases + More Practice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/git-rebase-handbook/more-rebase-use-cases-more-practice.html
prev: /programming/git/articles/README.md
date: 2023-07-03
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Git Rebase Handbook - A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Git Rebase Handbook - A Definitive Guide to Rebasing"
  desc="One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too..."
  url="https://freecodecamp.org/news/git-rebase-handbook#heading-more-rebase-use-cases-more-practice"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/The-Git-Rebase-Handbook-Book-Cover--1-.png"/>

By now I hope you feel comfortable with the syntax of rebase. The best way to actually understand it is to consider various cases and figure out how to solve them yourself.

With the upcoming use cases, I strongly suggest you stop reading after I've introduced each use case, and then try to solve it on your own.

---

## How to Exclude Commits

Say you have this history on another repo:

![Another commit history<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-284.png)

Before playing around with it, store a tag to "Commit F" so you can get back to it later:

```sh
git tag original_commit_f
```

Now, you actually don't want the changes in "Commit C" and "Commit D" to be included. You could use an interactive rebase like before and remove their changes. Or, could can use again `git rebase --onto`. How would you use `--onto` in order to "remove" these two commits?

You can rebase `HEAD` on top of "Commit B", where the old parent was actually "Commit D", and now it should be "Commit B". Consider the history again:

![The history again<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-284.png)

Rebasing so that "Commit B" is the base of "Commit E", means "moving" both "Commit E" and "Commit F", and giving them another *base* - "Commit B". Can you come up with the command yourself?

```sh
git rebase --onto <SHA_OF_COMMIT_B> <SHA_OF_COMMIT_D> HEAD
```

Notice that using the syntax above would not move <VPIcon icon="fa-brands fa-code-branch"/>`main` to point to the new commit, so the result is a "detached" `HEAD`. If you use `gg` or another tool that displays the history reachable from branches it might confuse you:

![Rebasing with `--onto` results in a detached `HEAD`<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-285.png)

But if you simply use `git log` (or my alias `git lol`), you will see the desired history:

![The resulting history<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-286.png)

I don't know about you, but these kinds of things make me really happy. 😊😇

By the way, you could omit `HEAD` from the previous command as this is the default value for the third parameter. So just using:

```sh
git rebase --onto <SHA_OF_COMMIT_B> <SHA_OF_COMMIT_D>
```

Would have the same effect. The last parameter actually tells Git where the end of the current sequence of commits to rebase is. So the syntax of `git rebase --onto` with three arguments is:

```sh
git rebase --onto <new_parent> <old_parent> <until>
```

---

## How to move commits across branches

So let's say we get to the same history as before:

```sh
git checkout original_commit_f
```

And now I want only "Commit E", to be on a branch based on "Commit B". That is, I want to have a new branch, branching from "Commit B", with only "Commit E".

![The current history, considering "Commit E"<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-287.png)

So, what does this mean in terms of rebase? Consider the image above. What commit (or commits) should I rebase, and which commit would be the new base?

I know I can count on you here 😉

What I want is to take "Commit E", and this commit only, and change its base to be "Commit B". In other words, to *replay* the changes introduced in "Commit E" onto "Commit B".

Can you apply that logic to the syntax of `git rebase`?

Here it is (this time I'm writing `<COMMIT_B>` instead of `<SHA_OF_COMMIT_B>`, for brevity):

```sh
git rebase --onto <COMMIT_B> <COMMIT_D> <COMMIT_E>
```

Now the history looks like so:

![The history after rebase<br/><Source: [<VPIcon icon="fa-brands fa-youtube"/>Brief](https://youtu.be/3VFsitGUB3s)>](https://freecodecamp.org/news/content/images/2023/06/image-288.png)

Awesome!
