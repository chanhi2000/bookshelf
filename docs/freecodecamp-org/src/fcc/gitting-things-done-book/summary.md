---
lang: en-US
title: Summary
description: Article(s) > (6/6) Gitting Things Done - A Visual and Practical Guide to Git [Full Book]
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
      content: Article(s) > (6/6) Gitting Things Done - A Visual and Practical Guide to Git [Full Book] 
    - property: og:description
      content: Summary
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/gitting-things-done-book/summary.html
next: /freecodecamp.org/gitting-things-done-book/README.md#appendixes
date: 2024-01-09
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://freecodecamp.org/news/content/images/2023/12/Gitting-Things-Done-Cover-with-Photo.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Gitting Things Done - A Visual and Practical Guide to Git [Full Book]",
  "desc": "Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us...",
  "link": "/freecodecamp.org/gitting-things-done-book/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Gitting Things Done - A Visual and Practical Guide to Git [Full Book]"
  desc="Introduction Git is awesome. Most software developers use Git on a daily basis. But how many truly understand Git? Do you feel like you know what's going on under the hood as you use Git to perform various tasks? For example, what happens when you us..."
  url="https://freecodecamp.org/news/gitting-things-done-book/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/12/Gitting-Things-Done-Cover-with-Photo.png"/>

Well, this was FUN!

Can you believe how much you have learned?

In **Part 1** you learned about - blobs, trees, and commits.

You then learned about **branches**, seeing that they are nothing but a named reference to a commit.

You learned the process of recording changes in Git, and that it involves the **working directory**, the **staging area (index)**, and the **repository**.

Then - you created a new repository from scratch, by using `echo` and low-level commands such as `git hash-object`. You created a blob, a tree, and a commit object pointing to that tree.

In **Part 2** you learned about branching and integrating changes in Git.

You learned what a **diff** is, and the difference between a diff and a **patch**. You also learned how the output of `git diff` is constructed.

Then, you got an extensive overview of merging with Git, specifically understanding the three-way merge algorithm. You understood when **merging conflicts** occur, when Git can resolve them automatically, and how to resolve them manually when needed.

You saw that `git rebase` is powerful - but also that it is quite simple once you understand what it does. You understood the differences between merging and rebasing, and when you should use each.

In **Part 3** you learned how to **undo changes** in Git - especially when things go wrong. You learned how to use a bunch of tools, like `git reset`, `git commit --amend`, `git revert`, `git reflog` (and `git log -g`).

The most important tool, even more important than the tools I just listed, is to whiteboard the current situation vs the desired one. Trust me on this, it will make every situation seem less daunting and the solution more clear.

In **Part 4** you acquired additional powerful tools, like different switches of `git log`, `git bisect`, `git cherry-pick`, `git revert` and `git add -p`.

Wow, you should be proud of yourself!

---

## A Message From Me to You

Indeed, this was fun, but all things must pass. You finished reading this book, but this doesn't mean your learning journey ends here.

What you have acquired, more than any specific tool, is intuition and understanding of how Git operates, and how to think about various operations in Git. Keep researching, reading, and using Git. I am sure you will be able to teach me something new, and by all means - please do.

If you liked this book, please share it with more people.

If you want to read more of my Git articles and handbooks, here they are:

```component VPCard
{
  "title": "The Git Rebase Handbook - A Definitive Guide to Rebasing",
  "desc": "One of the most powerful tools a developer can have in their toolbox is git rebase. Yet it is notorious for being complex and misunderstood.  The truth is, if you understand what it actually does, git rebase is a very elegant, and straightforward too...",
  "link": "/freecodecamp.org/git-rebase-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Git Merge Handbook - Definitive Guide to Merging in Git",
  "desc": "By reading this post, you are going to really understand git merge, one of the most common operations you'll perform in your Git repositories. Notes before we start I also created two videos covering the contents of this post. If you wish to watch a...",
  "link": "/freecodecamp.org/the-definitive-guide-to-git-merge/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Git Diff and Patch - Full Handbook for Developers",
  "desc": "Many of the interesting processes in Git like merging, rebasing, or even committing are based on diffs and patches. Developers work with diffs all the time, whether using Git directly or relying on the IDE's diff view. In this post, you will learn wh...",
  "link": "/freecodecamp.org/git-diff-and-patch.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "A Visual Guide to Git Internals — Objects, Branches, and How to Create a Repo From Scratch",
  "desc": "Many of us use git on a daily basis. But how many of us know what goes on under the hood?  For example, what happens when we use git commit? What is stored between commits? Is it just a diff between the current and previous commit? If so, how",
  "link": "/freecodecamp.org/git-internals-objects-branches-create-repo/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "GitReset Explained - How to Save the Day with the Reset Command",
  "desc": "Does this sound familiar? “Help! I committed to the wrong branch!” “It happened again… Where is my commit?” Well, I’ve been there so many times. Someone calls my name for help when something goes wrong with git. And it has happened not only when I wa...",
  "link": "freecodecamp.org/save-the-day-with-git-reset.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Acknowledgements

Many people helped make this book the best it can be. Among them, I was lucky to have many beta readers that provided me with feedback so that I can improve the book. Specifically, I would like to thank Jason S. Shapiro, Anna Łapińska, C. Bruce Hilbert, and Jonathon McKitrick for their thorough reviews.

Abbey Rennemeyer has been a wonderful editor. After she has reviewed my posts for freeCodeCamp for over three years, it was clear that I would like to ask her to be the editor of this book as well. She helped me improve the book in many ways, and I am grateful for her help.

Quincy Larson founded the amazing community at freeCodeCamp, motivated me throughout emails and face to face discussions. I thank him for starting this incredible community, and for his friendship.

Estefania Cassingena Navone designed the cover of this book. I am grateful for her professional work and her patience with my perfectionism and requests.

Daphne Gray-Grant's website, [<VPIcon icon="fas fa-globe"/>"Publication Coach"](https://publicationcoach.com/), has provided me with inspiring as well as technical advice that has greatly helped me with my writing process.

---

## If You Wish to Support This Book

If you would like to support this book, you are welcome to buy the [<VPIcon icon="fa-brands fa-amazon"/>Paperback version](https://amazon.com/dp/B0CQXTJ5V5), an [<VPIcon icon="fas fa-globe"/>E-Book version](https://buymeacoffee.com/omerr/e/197232), or [<VPIcon icon="fas fa-globe"/>buy me a coffee](https://buymeacoffee.com/omerr). Thank you!

---

## Contact Me

This book has been created to help you and people like you learn, understand Git, and apply their knowledge in real life. 

Right from the beginning, I asked for feedback and was lucky to receive it from great people (mentioned in the Acknowledgements to make sure the book achieves these goals. If you liked something about this book, felt that something was missing or needed improvement - I would love to hear from you. Please reach out at [<VPIcon icon="fas fa-envelope"/>gitting.things@gmail.com](mailto:gitting.things@gmail.com).

Thank you for learning and allowing me to be a part of your journey.
