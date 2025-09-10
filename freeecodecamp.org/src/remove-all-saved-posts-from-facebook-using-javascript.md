---
lang: en-US
title: "How to Remove All Saved Posts from Facebook Using JavaScript"
description: "Article(s) > How to Remove All Saved Posts from Facebook Using JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Remove All Saved Posts from Facebook Using JavaScript"
    - property: og:description
      content: "How to Remove All Saved Posts from Facebook Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/remove-all-saved-posts-from-facebook-using-javascript.html
prev: /programming/js/articles/README.md
date: 2024-10-31
isOriginal: false
author: Md. Fahim Bin Amin
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/PTiQqAKzbmM/upload/94f3490edcd662844a0bf56f2e6b0ce2.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Remove All Saved Posts from Facebook Using JavaScript"
  desc="If you're an avid Facebook user, you've probably saved countless posts, videos, and links to revisit later. But sometimes, these saved posts accumulate and become overwhelming. You may decide to un-save them all at once rather than manually uncheckin..."
  url="https://freecodecamp.org/news/remove-all-saved-posts-from-facebook-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/PTiQqAKzbmM/upload/94f3490edcd662844a0bf56f2e6b0ce2.jpeg"/>

If you're an avid Facebook user, you've probably saved countless posts, videos, and links to revisit later.

But sometimes, these saved posts accumulate and become overwhelming. You may decide to un-save them all at once rather than manually unchecking each one, especially if you've amassed a large collection.

Here's a step-by-step guide to bulk un-saving all your saved items on Facebook.

::: warning

Before proceeding, note that this method will un-save all the displayed items on the page permanently. Once unsaved, the items will no longer appear in your saved list. There’s no way to retrieve them unless you manually save each post again. Please use this method with caution.

:::

Also, You might need to use `allow pasting` and hit the Enter key if Facebook warns you before applying any JavaScript commands in the console.

---

## Step 1: Scroll Through Your Saved Items

Start by heading over to your Facebook saved items section. You can access this by clicking the menu icon (three horizontal lines) on the mobile app or the saved section on the left-hand side of the homepage on the desktop version.

Scroll down to load and display all the saved items that you want to un-save. Facebook only loads a few items at a time as you scroll, so ensure you've loaded everything you wish to unsave.

---

## Step 2: Open the Developer Console

To start the bulk un-saving process, you’ll need to use your browser’s developer console. Here’s how to do that:

- On **Google Chrome**: Press <VPIcon icon="fa-brands fa-windows"/><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> or <VPIcon icon="iconfont icon-macos"/><kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> to open the console.
- On **Firefox**: Press <VPIcon icon="fa-brands fa-windows"/><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> or <VPIcon icon="iconfont icon-macos"/><kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>K</kbd>.

Once the console is open, you can start running the necessary JavaScript commands.

---

## Step 3: Open the Context Menu for Each Item

You’ll first need to open the contextual menu (the three dots beside each saved post) for every item on the page. This is where Facebook allows you to un-save individual posts.

Copy and paste the following command into the console and press <kbd>Enter</kbd>:

```js
Array.from(document.querySelector('[role=main]').querySelectorAll('[aria-label="More"]')).slice(1).map(e => e.click())
```

This command finds all the “More” buttons on the page and opens the contextual menu for each saved item.

---

## Step 4: Un-save Each Item

Once the contextual menus have been opened for each saved post, it’s time to bulk un-save them. For that, run the following command in the console:

```js
Array.from(document.querySelectorAll('[role=menuitem]')).map(e => e.click())
```

This command clicks on the "Un-save" option in every contextual menu that has been opened, removing the items from your saved list.

---

## Important Reminder:

All the items that are displayed on the page will be unsaved **permanently**. Ensure that you’ve reviewed the items before proceeding with this method.

---

## Conclusion

This method saves you the hassle of manually un-saving items one by one. Just remember to scroll through and load all the saved items before running the script to ensure nothing is left behind.

Also, since this method affects only the currently displayed items, you may need to scroll and repeat the process if you have a lot of saved posts.

By following these steps, you can easily declutter your Facebook saved items and keep only what truly matters.

You can follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`fahimfba`)](https://github.com/FahimFBA), [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/), and [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`FahimAmin`)](https://youtube.com/@FahimAmin) to get more content like this. Also, my [<VPIcon icon="fas fa-globe"/>website](https://fahimbinamin.com/) is always available for you!

::: note Resource

[GitHub Comment (<VPIcon icon="iconfont icon-github"/>`bouiboui/facebook-saved`)](https://github.com/bouiboui/facebook-saved/issues/6#issuecomment-755982611)

<SiteInfo
  name="[IDEA] Support bulk delete saved items in facebook · Issue #6 · bouiboui/facebook-saved"
  desc="A lot of users are searching how to bulk delete saved items. For example I have 4500+ items in https://www.facebook.com/saved/ and there is no way how I can delete them, except to do it one by one...."
  url="https://github.com/bouiboui/facebook-saved/issues/6#issuecomment-755982611"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8d7feaffeb9d4cabd63c5b3fb65ea800d4a0f5c96188912c8fe096862c5fb786/bouiboui/facebook-saved/issues/6"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Remove All Saved Posts from Facebook Using JavaScript",
  "desc": "If you're an avid Facebook user, you've probably saved countless posts, videos, and links to revisit later. But sometimes, these saved posts accumulate and become overwhelming. You may decide to un-save them all at once rather than manually uncheckin...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/remove-all-saved-posts-from-facebook-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
