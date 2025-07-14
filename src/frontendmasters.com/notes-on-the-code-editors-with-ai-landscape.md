---
lang: en-US
title: "Notes on the Code Editors with AI Landscape"
description: "Article(s) > Notes on the Code Editors with AI Landscape"
icon: iconfont icon-vscode
category:
  - VSCode
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - vscode
  - visualstudiocode
  - visual-studio-code
  - productivity
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Notes on the Code Editors with AI Landscape"
    - property: og:description
      content: "Notes on the Code Editors with AI Landscape"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/notes-on-the-code-editors-with-ai-landscape.html
prev: /tool/vscode/articles/README.md
date: 2025-02-03
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5080
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "VSCode > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vscode/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Notes on the Code Editors with AI Landscape"
  desc="There are A LOT of options these days for getting AI help right in your code editor. What seemed to begin with plugins has morphed into a lot of VS Code forks."
  url="https://frontendmasters.com/blog/notes-on-the-code-editors-with-ai-landscape/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5080"/>

No surprise to anyone: there is a lot of movement in the AI space in regards to helping with code. It’s a rather perfect use case for AI and a perfect set of customers, so I expect it to continue. I’m not an expert in any of this, but I’ve been having a play lately and figured I’d jot down notes.

---

## Plugins

It seemed like offering AI plugins was *the move* at first. I imagine the thinking from the companies that make them was that *you can come to developers*, you don’t need *developers to come to you*. A lot of power can be had through a plugin. GitHub Copilot is a plugin, so clearly a *big* player in this market agrees. The rub is that what a plugin can do is entirely subject to the capabilities that editor makes available.

- **Various Editors + [GitHub Copilot](https://google.com/search?q=github+copilot&sourceid=chrome&ie=UTF-8)** — This was the real shakeup combo that ignited this space. There was a good year or so that it was in technical preview and was free that got developers really stoked for the high quality auto completions. It felt like a real UX innovation to offer the gray ghost text out ahead of what you were already coding that you could tab to accept or cycle through other options. Copilot has of course grown up and now offers more features like chat and multi-file editing.
- **Various Editors + [<FontIcon icon="fas fa-globe"/>Tabnine](https://tabnine.com/)** — Tabnine pre-dates Copilot by a bit, but by the time I was playing with it, Copilot was dropping and it didn’t feel like they could co-exist inside one editor very smoothly. Around that 2021 timeframe, I remember being quite impressed how it did autocomplete that was clearly smarter than the normal IntelliSense and seemed to be informed by the active project. Tabnine seems to be going strong and has evolved since then, and it looks like has the same essential feature set as Copilot. Offers limited free plan then starts at $9/month.
- **VS Code + [<FontIcon icon="iconfont icon-github"/>`cline/cline`](https://github.com/cline/cline)** — The Cline plugin seems to lean into the “Agent” capabilities of AI, meaning it does more than just suggest edits. It can create files, execute terminal commands (with permission), examine screenshots, and user a web browser. It’s free, which attracts some developers.
- **Various Editors + [<FontIcon icon="fas fa-globe"/>Codeium](https://codeium.com/download)** — Started as editor plugins, but crucially to me, also a *browser* extension for Chrome. This means that you could get AI autocomplete on certain site across the web automatically. It worked on CodePen and I’m still pretty impressed by the quality of the results there.
- **Various Editors + [<FontIcon icon="fas fa-globe"/>Cody](https://sourcegraph.com/cody)** — Cody is an AI plugin offering largely the same AI features as most of the others. But it appears to have some interesting differentiating extra features like sharing prompts across a team and gathering context from beyond just the code, like connecting to Notion. Offers limited free plan then starts at $9/month.
- **Various Editors + [<FontIcon icon="fas fa-globe"/>Augment](https://augmentcode.com/)** — I haven’t had a chance to try Augument but it again looks like largey the same feature set. They call their proactive editing “Next Edit” which I like.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/02/ai-vscode.png?resize=1024%2C643&ssl=1)

---

## Forks of VS Code

It’s these that seem to be having a big moment right now and what interested me in trying new things out and ultimately writing up these notes. It turns out that plugins just aren’t offering the level of access and control that these AI companies want. They want more full control over the UI and UX, and since VS Code is open source, they can just fork it and do their own thing.

I also suspect that the term “Agents” is involved here, which refers to an AI being able to do more than just return text. Agents can run terminal commands, control a browser, feed answers back into themselves, crawl into a codebase as needed, understanding linters, etc. I suspect that if you’re trying to head heavily into this Agents idea, you want full control over the app such that you won’t run into walls you can’t tear down yourself.

- **[<FontIcon icon="fas fa-globe"/>Cursor](https://cursor.com/)** — This was the first company I heard of that did this and I didn’t quite know what to make of it at first. Are they going to keep up with VS Code releases? (Like some niche browsers do with the browser engines they are created from). How much are they really changing about VS Code… is it worth it? I heard enough good things that I was convinced to give a paid plan a try and I can see what people mean! Cursor feels much more *proactive* about suggestions, which is perhaps my favorite feature. The UX of interacting with AI is essentially via autocompletes, inline chat, sidebar chat, or “Composer”. It’s a smidge confusing, but in practice the help tends to be there when you need it, and just think of Composer as the big fancy one that can deal with multiple files.
- **[<FontIcon icon="fas fa-globe"/>Windsurf](https://codeium.com/download)** — Codieum, who I already think does a good job with their AI products, seems to be quite all-in on this VS Code fork editor. There is a free plan, free trial, and plans starting at $15/month. I’ve been using it off an on for a few weeks and I find it *almost* as proactive as Cursor, if a bit more sluggish. They call their Agent thingy “Cascade” and I had one experience using it to fix a bug where I watched it to an extremely deep dive into the code I was working on and came up with a very good solution, so color me impressed with the quality.
- **[<FontIcon icon="fas fa-globe"/>Trae](https://trae.ai/)** — This is quite the wildcard to me, but here we are. ByteDance, the Chinese company behind TikTok, has released Trae for free. It’s in the same bucket as these others, a VS Code fork, with various AI stuff built-in. Also like the others, it splits the UI/UX into “Builder” (which is like Compose in Cursor or Cascade in Windsurf) and “Chat” which is the quicker and more casual helper. Trae has no announced pricing at all, it’s just free, which will certainly drive adoption if raise a few eyebrows. I found the UI improvements over VS Code quite nice, the best of the bunch, but the AI help to be narrowly the worst of the bunch.
- **[<FontIcon icon="fas fa-globe"/>Aide](https://aide.dev/)** — I haven’t tried Aide yet, but it looks like it’s extremely similar: proactive suggestions, Agent stuff, etc. Paid plans starting at $20/month. It being open source seems like a differentiator amongst this cohort.

Makes you wonder what Microsoft thinks about all this. Microsoft has done the heavy lifting here with VS Code and has their own business models centered around AI. Open source is open source and all, but it’s wild to see so many companies making money exactly in the same space with a thin veneer over the thing Microsoft has the most invested in.

---

## Non-VS Code Forks

VS Code isn’t the only editor on the block, even if it is pretty huge these days.

- **[<FontIcon icon="fas fa-globe"/>Zed](https://zed.dev/)** — Zed is an entirely new editor with good momentum and very strong bones. I’m certainly rooting for it! They have basic autocomplete going in there (arguably the most important AI feature), and what looks like [<FontIcon icon="fas fa-globe"/>a fairly fresh take on other tools](https://zed.dev/ai). I’ve also heard tale of an active beta with even more, so it’s certainly something to watch.
- **[LSP-AI (<FontIcon icon="iconfont icon-github"/>`SilasMarvin/lsp-ai`)](https://github.com/SilasMarvin/lsp-ai)** —This is an open source language server, which would theoretically work with *any* editor, like SublimeText, NeoVim, or Emacs or whatever. I’ve only just heard of the [<FontIcon icon="fas fa-globe"/>Helix](https://helix-editor.com) editor, which has some pretty big fans, so LSP-AI might be an answer in getting AI features into it, with it’s explicit language server support.

---

## Other Editors

VS Code can run in the browser too, which you can see in Google’s [<FontIcon icon="fas fa-globe"/>Project IDX](https://idx.dev/). Project IDX has [<FontIcon icon="fas fa-globe"/>very recently gotten AI chat](https://idx.dev/blog/article/interactive-chat) built in, so it’s catching up with what we’re seeing in VS Code-based AI tools elsewhere.

The online editor Replit has essentially the same paradigms with [<FontIcon icon="fas fa-globe"/>“Agent and Assistant”](https://replit.com/ai). Focused on scaffolding out new projects, there is [Bolt](https://bolt.new/) from the StackBlitz team which has seen enormous [<FontIcon icon="fas fa-globe"/>growth and support](https://anthropic.com/customers/stackblitz), as well as [<FontIcon icon="fas fa-globe"/>v0](https://v0.dev/) from Vercel which [<FontIcon icon="fas fa-globe"/>helped them raise](https://reuters.com/technology/vercel-completes-250-mln-series-e-round-325-bln-valuation-2024-05-16/).

JetBrains are a big player in the editor market as well, and are in on all this as well with their own [<FontIcon icon="iconfont icon-jetbrains"/>JetBrains AI](https://jetbrains.com/ai/), which has, no surprise, AI autocompletions and an “Assistant” tool for more elaborate and contextual chats. The language-specific nature of JetBrains editors may turn out to be a competitive advantage since the interaction with the models could be theoretically honed to be extra helpful with that language. But like I said in the opening, I’m more of a casual user than an expert at this point.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Notes on the Code Editors with AI Landscape",
  "desc": "There are A LOT of options these days for getting AI help right in your code editor. What seemed to begin with plugins has morphed into a lot of VS Code forks.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/notes-on-the-code-editors-with-ai-landscape.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
