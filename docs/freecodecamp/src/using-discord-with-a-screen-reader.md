---
lang: en-US
title: "How to Use Discord with a Screen Reader: A Quick Guide"
description: "Article(s) > How to Use Discord with a Screen Reader: A Quick Guide"
icon: fa-brands fa-discord
category:
  - Productivity
  - Discord
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - productivity
  - discord
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Discord with a Screen Reader: A Quick Guide"
    - property: og:description
      content: "How to Use Discord with a Screen Reader: A Quick Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/using-discord-with-a-screen-reader.html
prev: /tool/discord/articles/README.md
date: 2026-09-05
isOriginal: false
author:
  - name: Florian Beijers
    url: https://freecodecamp.org/news/author/zersiax/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/364f60fe-def1-4b62-9252-ed59c2b79eb1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Discord > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/discord/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Discord with a Screen Reader: A Quick Guide"
  desc="Discord is one of those technologies that came out of nowhere several years ago and is now everywhere. A huge variety of servers around all sorts of communities, efforts, and initiatives have been pop"
  url="https://freecodecamp.org/news/using-discord-with-a-screen-reader"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/364f60fe-def1-4b62-9252-ed59c2b79eb1.png"/>

Discord is one of those technologies that came out of nowhere several years ago and is now everywhere.

A huge variety of servers around all sorts of communities, efforts, and initiatives have been popping up and are still appearing. And they're largely taking the place of forums, chat rooms and, at times, documentation sites and news boards.

To what degree this is a good thing is up for debate, but the long and short of it is that Discord is likely here to stay.

When it comes to accessibility, Discord's had a bit of a rocky road. For years, it was very painful to use for screen reader users due to an apparent lack of forethought regarding accessibility.

Over the last few years, this situation has improved substantially. While it's by no means fully accessible in 2026, it can be used relatively efficiently once you know the tricks of the trade.

freeCodeCamp uses Discord, and the community has often seen that screen reader users struggle to use this communication tool comfortably. This is where this article comes in.

In this article, I'll go over the basics you'll need to use Discord as a platform to send and receive messages and contribute to communities that use Discord as a communication platform. It's relatively easy to learn but can be difficult to fully grasp due to the various interwoven things it does. Still, these basics should get you up and running and will equip you to learn about all the other features it offers by yourself going forward.

---

## Screen Reader Prerequisites

Discord is an application that, because of the way it was built, has both web app and desktop app aspects to it. I think this is one of the main issues people run into, so I'll give a brief rundown about why this matters for screen reader users.

Particularly on Windows, screen readers tend to operate in two modes when a web app is encountered: you're either in browse/virtual mode or you're in forms/focus mode.

Discord, being essentially a web app, gives you both of these modes as well. In "browse" mode, you have access to keys that navigate by heading, form field, button, and so on. In focus mode, you only have access to the keyboard shortcuts that work with the app. By default, these are tab/shift+tab, the arrow keys, space, enter, and escape.

Knowing when to use which mode is a bit of a mine field, but in general, a good rule of thumb is that you read/browse in browse mode, and you act/type in forms/focus mode.

Many web apps, Discord included, generally gracefully switch you between modes when required, but this isn't always the case. When this doesn't happen, you need to know how and when to switch, which I'll point out when required in the upcoming sections of this article.

---

## The Broad Strokes: How to Navigate Efficiently

The tricky bit with learning an app like this is generally that documentation can be really scarce and hard to find. Discord probably has articles on this, but you'd need to know what to look for. And at the end of the day, all we want to do is use the app for what we're trying to do and move on with our lives. So here's the Cliff's notes.

Discord has a pretty rich list of keyboard shortcuts that allow you to do all sorts of things, but some of the keys aren't super obvious, and some of the navigation patterns are inconsistent.

In general, when navigating or skimming, you want to be in your screen reader's focus or forms mode. NVDA toggles this with NVDA+space, JAWS with JAWS+z. This allows Discord's own navigation keys to work correctly, which makes things go a little faster.

A key that works in a lot of applications on Windows is f6. This jumps you between specific regions of an application and is a bit of a hold-over from Ye olden Days of Windows 98 and XP. File explorer, office apps and browsers generally use this key in this way, but other apps like VS Code, Slack, and Discord do as well. It's a bit of a super power for keyboard-only navigation, as it gets you places a lot quicker.

In Discord, it bounces you between the server list, the message list, and a few other spots. But, oddly enough, it doesn't take you to the actual message entry field. To go there, the quickest way is to just start typing. This will zip your cursor to the right place.

With Discord having essentially its own keyboard navigation layer, I would generally recommend that you stay in focus/forms mode for most interactions, unless you need the conveniences of browse mode. More on that below.

When in focus mode, f6 moves you between the various regions of the screen, as I mentioned above. Tab will navigate you between those regions, as well as the interactable elements within those regions.

This, together with the arrow keys to navigate lists of channels, messages, and servers, will get you to most places you'll need to go for basic Discord usage.

---

## Speeding Things Up: How to Navigate and Interact Efficiently

If you know where you're going, the best way to get there quickly is the ctrl+k or cmd+k hotkeys, depending on your operating system. This hotkey will bring up a search field where you can type part of a channel name, user name, or server name to search for it. A list of results will be focused after a brief pause, and then you can use the arrow keys to move to the correct result. Pressing enter takes you straight to the server, channel, or user you selected.

On Discord servers, it can be difficult to keep up with everything happening, given how many channels a lot of servers have. Here's a few tips to keep track of it all:

- Ctrl+i / cmd+i will open your so-called "inbox". This is where you can get a list of your mentions on the various servers you're in, which can be a great way to keep track of people trying to get your attention.
- There are a number of hotkeys that also let you cycle between various types of channels. For example, shift+alt+up and down will navigate between channels with unread messages. This is another quick way to get through a large amount of unread channels efficiently.

---

## When is Browse Mode More Efficient?

I'd say there are two scenarios in which browse mode may be beneficial.

First, if you want to look at a message more granularly (for example to see how a word is spelled), dropping into browse mode will let you do that.

You can also use review cursors/object navigation shortcuts if you want, but browse mode tends to be easier in these cases. It also allows for more convenient copying of text if you need to do that.

To my knowledge, there's no quick way to jump to the earliest unread message in focus mode, which can be a bit annoying if you're scrolling back to see what messages you did and didn't read yet.

There is a "NEW" indicator above that message, which you can find with a reverse NVDA search, or by scrolling and listening out for it. Discord does have a hotkey (shift+page-up) to do this as well, but in my testing it doesn't always work as advertised.

Apart from that, barring a few niche edge cases, you can generally stay in focus mode unless you want to NVDA or JAWS search for button labels. This can be useful to quickly, say, find the disconnect button in a voice channel, which currently doesn't appear to have a hotkey associated with it.

---

## Conclusion

Discord is a pretty complicated app, and this guide touches on the basics to get you started. With these general strategies, you should be able to deal with day-to-day messaging, channel management, and voice channels.

I always encourage anyone to just explore and work out your own strategies though. You can rarely break things irreparably, so see how things work for you personally and develop a way of working that works for you, specifically. This is always the best strategy for any kind of app, particularly when using assistive technology.

If you want to learn about all the other hotkeys Discord offers, you can find [<VPIcon icon="fa-brands fa-discored"/>a keyboard reference](https://support.discord.com/hc/en-us/articles/225977308--Windows-Discord-Hotkeys) on the Discord website. They offer both visual charts, which are inaccessible for screen reader users in this instance, or a readable table.

I hope this was helpful. Go forth and Discord!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Discord with a Screen Reader: A Quick Guide",
  "desc": "Discord is one of those technologies that came out of nowhere several years ago and is now everywhere. A huge variety of servers around all sorts of communities, efforts, and initiatives have been pop",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/using-discord-with-a-screen-reader.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
