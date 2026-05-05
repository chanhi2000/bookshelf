---
lang: en-US
title: "Google’s Prompt API"
description: "Article(s) > Google’s Prompt API"
icon: fa-brands fa-chrome
category:
  - Web Browser
  - Google
  - Chrome
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Google’s Prompt API"
    - property: og:description
      content: "Google’s Prompt API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/googles-prompt-api.html
prev: /tool/chrome/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/chrome-gemini.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Google’s Prompt API"
  desc="Mat Marquis on Google pulling the web standards equivalent of U2 album marketing:"
  url="https://css-tricks.com/googles-prompt-api"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/chrome-gemini.webp"/>

[<VPIcon icon="fas fa-globe"/>Mat Marquis](https://wil.to/posts/googles-prompt-api/) on Google pulling the web standards equivalent of [<VPIcon icon="fa-brands fa-wikipedia-w"/>U2 album marketing](https://en.wikipedia.org/wiki/Songs_of_Innocence_(U2_album)#Release):

::: info Songs of Innocence (U2 album) from Wikipedia (<VPIcon icon="fa-brands fa-wikipedia-w"/><code>en.wikipedia.org</code>)

> As a Chrome user, you’ll have [<VPIcon icon="fas fa-globe"/>received Gemini Nano in the form of a 4GB transfer](https://techspot.com/news/112309-google-chrome-has-silently-pushing-4gb-ai-model.html) recently; no permission asked or required. If you remove it, Chrome will re-download it. For [<VPIcon icon="fas fa-globe"/>reasons I can only guess at](https://gdpr-info.eu/issues/consent/), Gemini Nano is presumably now considered to be part of Chrome itself, despite being a standalone product that is included alongside but not integrated *into* the browser — the way a copy of [<VPIcon icon="fa-brands fa-wikipedia-w"/>Bonzi Buddy](https://en.wikipedia.org/wiki/BonziBuddy) included in a browser update might be considered a part of said browser.

<SiteInfo
  name="Songs of Innocence (U2 album) - Wikipedia"
  desc="In the days leading up to an Apple product launch event on 9 September 2014 in Cupertino, California, rumours circulated that U2 would be involved.[76] A spokesperson for the band denied reports that they would perform at the event or that a new album would come preloaded on the anticipated new iPhone 6 smartpho..."
  url="https://en.wikipedia.org/wiki/Songs_of_Innocence_(U2_album)#Release/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/en/7/7f/U2_Songs_of_Innocence_Physical_Cover.jpg"/>

:::

It’s not exactly *new* news, as we’ve had [<VPIcon icon="fa-brands fa-chrome"/>published](https://developer.chrome.com/docs/ai/prompt-api) [explainers (<VPIcon icon="iconfont icon-github"/>`webmachinelearning/prompt-api`)](https://github.com/webmachinelearning/prompt-api/blob/main/README.md) on it for over a year now, as well as an [<VPIcon icon="fa-brands fa-google"/>intent to prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/x3QEjLYx5Rg) for just as long.

[Mozilla has already voiced its concerns/opposition (<VPIcon icon="iconfont icon-github"/>`mozilla/standards-positions`)](https://github.com/mozilla/standards-positions/issues/1213#issuecomment-4347988313):

::: info <VPIcon icon="iconfont icon-github"/><code>mozilla/standards-positions#1213</code>

> [<VPIcon icon="fa-brands fa-chrome"/><VPIcon icon="fa-brands fa-google"/>According to Chrome’s documentation](https://developer.chrome.com/docs/ai/prompt-api#use_the_prompt_api:~:text=Before%20you%20use%20this%20API%2C%20acknowledge%20Google%27s%20Generative%20AI%20Prohibited%20Uses%20Policy%2E), to use the prompt API you must ‘acknowledge’ [<VPIcon icon="fa-brands fa-google"/>Google’s Generative AI Prohibited Uses Policy](https://policies.google.com/terms/generative-ai/use-policy). Elements of this policy go beyond law. For example:
> 
> > Do not engage … generating or distributing content that facilitates … Sexually explicit content  
> > Do not engage in misinformation, misrepresentation, or misleading activities. This includes … Facilitating misleading claims related to governmental or democratic processes
> 
> This seems like a bad direction for an API on the web platform, and sets a worrying precedent for more APIs that have UA-specific rules around usage.

<SiteInfo
  name="Prompt API · Issue #1213 · mozilla/standards-positions"
  desc="Specification title Prompt API Specification or proposal URL (if available) No response Explainer URL (if available) https://github.com/webmachinelearning/prompt-api/blob/main/README.md Proposal au..."
  url="https://github.com/mozilla/standards-positions/issues/1213/#issuecomment-4347988313"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7aafdb352ce86a4f9da1dbd2dafad4fbb1bd7cd43411e8dc7d33fbb856f42d50/mozilla/standards-positions/issues/1213"/>

:::

I have nothing to add, only that this is the sort of thing that seems worth knowing. Mat’s take-home isn’t exactly comforting because, remember, *this has already shipped*:

> I’d like to say that something to the tune of “their whole argument hinges on ‘positive developer sentiment,’ so let’s show them that there isn’t any” — but there isn’t any; they *cited* places where there isn’t any. That’s not how it works for them. Google participates in the web standards process the way a bear participates in the “camping” process.
>
> […]
>
> Remember this the next time Google announces an “exciting new standard” that they’re heroically championing — for you, for users, for good of the web — in language that has just a hint of inevitability about it.

The [**browser ecosystem**](/css-tricks.com/the-ecological-impact-of-browser-diversity.md) has historically provided us with plenty of concerns. [<VPIcon icon="fas fa-globe"/>Alex Russell’s writing](https://infrequently.org/series/browser-choice-must-matter/) is a treasure trove of the current limits of browser choice. And things are especially murky when we need to be reminded that *[<VPIcon icon="fas fa-globe"/>not all browser APIs are Web APIs](https://polypane.app/blog/not-all-browser-apis-are-web-apis/)*.

Maybe helpful, maybe not:

![Chrome browser settings with system tab open showing disabled on-device AI option.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/chrome-system-settings-ai.png?resize=2218%2C1906)

::: info More coverage, if you’d like:

```component VPCard
{
  "title": "Use Gemini in Chrome - Computer - Gemini Apps Help",
  "desc": "With Gemini in Chrome, you can get AI assistance in your browser to easily get key takeaways, clarify concepts, find answers and more. To provide the most relevant responses, Gemini in Chrome uses",
  "link": "https://support.google.com/gemini/answer/16283624?hl=en&visit_id=639136889569119000-2199918715&p=mws_gic_ga&rd=1/",
  "logo": "https://support.google.com/favicon.png",
  "background": "rgba(11,87,208,0.2)"
}
```

<SiteInfo
  name="Chrome downloads a 4GB AI file without user consent, researcher alleges - Engadget"
  desc="At least there's a toggle to easily turn this off."
  url="https://engadget.com/2166113/chrome-downloads-a-4gb-ai-file-without-user-consent-researcher-alleges//"
  logo="https://engadget.com/img/engadget-favicon.png"
  preview="https://engadget.com/img/gallery/chrome-downloads-a-4gb-ai-file-without-user-consent-researcher-alleges/l-intro-1778094512.jpg"/>

<SiteInfo
  name="Guy finds Google Chrome is quietly installing a 4GB AI model on our devices"
  desc="Google Chrome is reaching into users’ machines and writing a 4GB on-device AI model file to disk without asking, Alexander Hanff writes."
  url="https://cybernews.com/security/google-chrome-ai-model-device-no-consent//"
  logo="https://cybernews.com/images/favicons/favicon.svg"
  preview="https://media.cybernews.com/images/featured-big/2026/05/google-ai-model.jpg"/>

<SiteInfo
  name="Is Chrome's 4GB 'weights.bin' file spyware? Google clarifies (Updated)"
  desc="Chrome is silently downloading 4GB AI model files to your PC. Learn what Gemini Nano ”weights” are and how to delete them to reclaim storage."
  url="https://androidauthority.com/google-chrome-weights-bin-ai-model-download-explained-3664043//"
  logo="https://androidauthority.com/favicon.ico"
  preview="https://androidauthority.com/wp-content/uploads/2025/11/Chrome-Split-View-scaled.jpg"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Google’s Prompt API",
  "desc": "Mat Marquis on Google pulling the web standards equivalent of U2 album marketing:",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/googles-prompt-api.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
