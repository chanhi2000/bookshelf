---
lang: ko-KR
title: Force execution, skipping breakpoints, when paused
description: Article(s) > Force execution, skipping breakpoints, when paused
icon: iconfont icon-template
category: 
  - Browser
  - Google
  - Google Chrome
  - Firefox
  - Article(s)
tag: 
  - blog
  - devtoolstips.org
  - js
  - debug
  - tips
  - google
  - googlechrome
  - google-chrome
  - firefox
head:
  - - meta:
    - property: og:title
      content: Article(s) > Force execution, skipping breakpoints, when paused
    - property: og:description
      content: Force execution, skipping breakpoints, when paused
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/devtoolstips.org/force-execution-at-breakpoint.html
prev: /tool/chrome/articles/README.md
date: 2023-10-26
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Firefox > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/firefox/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Force execution, skipping breakpoints, when paused | Devtools Tips",
  "desc": "Force execution, skipping breakpoints, when paused",
  "link": "https://devtoolstips.org/tips/en/force-execution-at-breakpoint/",
  "logo": "https://devtoolstips.org/assets/logo-small.png",
  "background": "rgba(31,44,43,0.2)"
}
```

When using breakpoints to debug your JavaScript code, sometimes you end up setting many breakpoints in different functions. You might want to keep these breakpoints but not always pause at them.

There are two ways to do this in DevTools:

- Forcing execution, skipping over other breakpoints.
- Or temporarily deactivating breakpoints.

---

## Force execution

Forcing execution is only supported in <FontIcon icon="fa-brands fa-chrome"/>Chrome and <FontIcon icon="fa-brands fa-edge"/>Edge:

1. Open the **Sources** tool.
2. Set all of the breakpoints that you need.
3. Once paused at your first breakpoint, click and hold the <FontIcon icon="iconfont icon-select"/>`[Resume script execution]` button and then select the <FontIcon icon="iconfont icon-select"/>`[Force script execution]` button. The script execution resumes, and doesn't pause at any other breakpoint.

![The Sources tool in Edge, showing the Force script execution button](https://devtoolstips.org/assets/img/force-execution-at-breakpoint-edge.png)

---

## Temporarily deactivate breakpoints

In <FontIcon icon="fa-brands fa-chrome"/>Chrome, <FontIcon icon="fa-brands fa-edge"/>Edge, and <FontIcon icon="fa-brands fa-firefox-browser"/>Firefox, you can temporarily deactivate breakpoints:

1. Open the **Sources** tool in Chrome or Edge, or the **Debugger** tool in Firefox.
2. Set all of the breakpoints that you need.
3. Once paused at your first breakpoint, click the <FontIcon icon="iconfont icon-select"/>`[Deactivate breakpoints]` button, and then click <FontIcon icon="iconfont icon-select"/>`[Resume]`. The script execution resumes, and doesn't pause at any other breakpoint.

![The Debugger tool in <FontIcon icon="fa-brands fa-firefox-browser"/>Firefox, showing the Deactive breakpoints button](https://devtoolstips.org/assets/img/force-execution-at-breakpoint-firefox.png)

::: details See also

- [Pause script execution when the DOM changes](https://devtoolstips.org/tips/en/break-on-dom-changes) <!-- TODO: add VPCard -->

:::
