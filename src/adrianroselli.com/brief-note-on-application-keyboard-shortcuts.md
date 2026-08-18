---
lang: en-US
title: "Brief Note on Application Keyboard Shortcuts"
description: "Article(s) > Brief Note on Application Keyboard Shortcuts"
icon: fa-brands fa-accessible-icon
category:
  - Design
  - System
  - Accessibility
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - design
  - system
  - a11y
  - accessibility
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Brief Note on Application Keyboard Shortcuts"
    - property: og:description
      content: "Brief Note on Application Keyboard Shortcuts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/brief-note-on-application-keyboard-shortcuts.html
prev: /academics/system-design/articles/README.md
date: 2026-01-10
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2026/01/kbd-shortcut-300x300.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Brief Note on Application Keyboard Shortcuts"
  desc="Identifying keyboard shortcuts for an application is mostly an internationalization problem. It’s also not a new problem. A recent (to me) example is the WordPress Gutenberg team starting to discuss keyboard shortcuts in 2017, addressing what will and won’t work across keyboards for different languages. Sight gag for my old…"
  url="https://adrianroselli.com/2026/01/brief-note-on-application-keyboard-shortcuts.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/01/kbd-shortcut-300x300.jpg"/>

Identifying keyboard shortcuts for an application is mostly an internationalization problem. It’s also not a new problem. A recent (to me) example is the [WordPress Gutenberg team starting to discuss keyboard shortcuts in 2017 (<VPIcon icon="iconfont icon-github"/>`WordPress/gutenberg`)](https://github.com/WordPress/gutenberg/issues/3218), addressing what will and won’t work across keyboards for different languages.

![Sight gag for [<VPIcon icon="fas fa-globe"/>my old joke](https://xcancel.com/aardrian/status/1644385909674999814) that navigating text fields in NVDA and JAWS is just pressing <kbd>E</kbd>, but in VoiceOver it’s pressing <kbd>Caps Lock</kbd>+<kbd>Ctrl</kbd>+<kbd>Option</kbd>+<kbd>⌘</kbd>+<kbd>J</kbd>.](https://adrianroselli.com/wp-content/uploads/2026/01/kbd-shortcut.jpg)

It’s a fascinating thread given all the international participation. It’s also outside the scope of this post.

Instead, this post is to tell you not to stress about what keys a screen reader uses. This is because screen readers have pass-through commands, which tell the screen reader to ignore the next key or combo and pass it through to the application (whether an installed application or the web browser running your application).

Windows desktop screen readers have explicit pass-through commands:

::: tabs

@tab:active NVDA

```component VPCard
{
  "title": "Using NVDA | NVDA 2026.1.1 Commands Quick Reference",
  "desc": "...",
  "link": "https://download.nvaccess.org/documentation/keyCommands.html#:~:text=Pass%20next%20key%20through",
  "logo": "https://download.nvaccess.org/favicon.ico",
  "background": "rgba(71,47,95,0.2)"
}
```

<kbd>NVDA</kbd>+<kbd>F2</kbd>

@tab JAWS

```component VPCard
{
  "title": "JAWS Keystrokes",
  "desc": "Keystrokes for JAWS screen reader for desktop layout, laptop layout, Internet Explorer, Firefox, and general Windows commands are here in HTML and PDF format.",
  "link": "https://support.freedomscientific.com/content/html/jawshq/JAWS-Keystrokes.html#:~:text=Pass%20Key%20Through,-CAPS",
  "logo": "https://support.freedomscientific.com/favicon.ico",
  "background": "rgba(256,256,256,0.2)"
}
```

<kbd>JAWS</kbd>+<kbd>3</kbd>

@tab Narrator

```component VPCard
{
  "title": "Appendix B: Narrator keyboard commands and touch gestures | Microsoft Support",
  "desc": "Learn about Narrator keyboard commands and touch gestures in Windows.",
  "link": "https://support.microsoft.com/en-US/accessibility/windows/narrator/appendix-b-narrator-keyboard-commands-and-touch-gestures#windowsversion=windows_11:~:text=Pass%20keys%20to%20application",
  "logo": "https://support.microsoft.com/favicon-16x16.png",
  "background": "rgba(0,109,172,0.2)"
}
```

(Microsoft has a poor method of selecting between Win10 and Win11 on that page, so the text link may not work)

<kbd>Narr</kbd>+<kbd>3</kbd>

:::

VoiceOver on macOS does as well, and I’m being very careful to qualify this as macOS, not iOS nor iPadOS:

::: tabs

@tab:active VoiceOver on macOS

[<kbd>VO</kbd>+<kbd>Tab↹</kbd>](https://support.apple.com/guide/voiceover-guide/general-commands-cpvokys01/web#:~:text=Tell%20VoiceOver%20to%20ignore%20the%20next%20key%20or%20key%20combination%20you%20press)

:::

VoiceOver on macOS differs from Windows screen readers by requiring the modifier keys to execute most commands. But if you enable [<VPIcon icon="fa-brands fa-apple"/>Quick Nav](https://support.apple.com/guide/voiceover/with-quick-nav-vo27943/10/mac/26) to allow single key use, you may need to turn it off sometimes (which is not a pass-through):

::: tabs

@tab:active Toggle single-key Quick Nav

<kbd>VO</kbd>+<kbd>Q</kbd>

@tab Toggle arrow-key Quick Nav

<kbd>VO</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd>

:::

Orca generally relies on a modifier key except in [<VPIcon icon="iconfont icon-gnome"/>structural navigation](https://help.gnome.org/orca/commands_structural_navigation.html), which you may need to disable (and is not the same as a pass-through):

::: tabs

@tab:active Toggle structural navigation

<kbd>Orca</kbd>+<kbd>Z</kbd>

:::

In each case, the screen reader modifier key (<kbd>NVDA</kbd>or <kbd>VO</kbd>, for example) represents the <kbd>Caps Lock</kbd> or <kbd>Insert</kbd> (depending on preferences and keyboard layout), and for VoiceOver are the <kbd>Ctrl</kbd>+<kbd>Opt</kbd> keys combined.

This, of course, assumes the screen reader audience for your application knows they exist. Not all screen reader users are *expert* screen reader users (imagine the same breakdown as with the general public and their computers). But this is stuff you would include in documentation and training (because you have documentation, right?) while also telling your developers and QA folks so they don’t file unnecessary bugs.

::: details Update: 22 January 2026

[<VPIcon icon="fas fa-globe"/>James Scholes told me](https://dragonscave.space/@jscholes/115939534075248421) that VoiceOver on macOS does indeed have a pass-through command. I updated the post accordingly. I didn’t do my usual strikes to show the changes, mostly because it was getting unwieldy to read (I moved the Orca section to after macOS).

:::

::: info Other Posts

[**Earlier post: How I Evaluate an ACR (VPAT®)**](/adrianroselli.com/how-i-evaluate-an-acr-vpat.md)

```component VPCard
{
  "title": "Live Region Support",
  "desc": "This post does not discuss whether live regions are good, nor is it a post about the best way to use them. This post only covers how they are exposed to the audience who experiences them — screen reader users. Written by a non-screen-reader user. If you’re here because your…",
  "link": "/bookshelf/adrianroselli.com/live-region-support.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Brief Note on Application Keyboard Shortcuts",
  "desc": "Identifying keyboard shortcuts for an application is mostly an internationalization problem. It’s also not a new problem. A recent (to me) example is the WordPress Gutenberg team starting to discuss keyboard shortcuts in 2017, addressing what will and won’t work across keyboards for different languages. Sight gag for my old…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/brief-note-on-application-keyboard-shortcuts.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
