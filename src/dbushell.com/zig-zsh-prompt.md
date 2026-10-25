---
lang: en-GB
title: "I built a ZSH Prompt with Zig"
description: "Article(s) > I built a ZSH Prompt with Zig"
icon: iconfont icon-zig
category:
  - Zig
  - Article(s)
tag:
  - blog
  - dbushell.com
  - zig
head:
  - - meta:
    - property: og:title
      content: "Article(s) > I built a ZSH Prompt with Zig"
    - property: og:description
      content: "I built a ZSH Prompt with Zig"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/zig-zsh-prompt.html
prev: /programming/zig/articles/README.md
date: 2025-03-05
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2025-03-05-zig-zsh-prompt.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Zig > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/zig/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="I built a ZSH Prompt with Zig"
  desc="The one where I use something other than JavaScript."
  url="https://dbushell.com/2025/03/05/zig-zsh-prompt/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2025-03-05-zig-zsh-prompt.png"/>

I built a prompt! Not the “AI” kind. I’m talking about this thing:

![[<VPIcon icon="iconfont icon-forgejo"/>Zigbar on Forgejo](https://git.dbushell.com/dbushell/zsp)](https://dbushell.com/images/blog/2025/zigbar-prompt.avif)

I customised the part of the terminal shell that asks for user input. I used [<VPIcon icon="iconfont icon-zig"/>Zig](https://ziglang.org/) to write my own dev-focused prompt.

---

## Why

I’m currently on [<VPIcon icon="fas fa-globe"/>Ghostty terminal](https://dbushell.com/notes/2025-03-02T09:39Z/) with ZSH. I’ve also used [<VPIcon icon="fas fa-globe"/>Starship prompt](https://starship.rs/) for years but never really understood where the boundaries were between terminal, shell, and prompt. I just install stuff with cool logos and lack understanding of what does what. This project helped me understand how the pieces fit together.

---

## How

Digging into [Starship code (<VPIcon icon="iconfont icon-github"/>`starship/starship`)](https://github.com/starship/starship/) I learnt that customising a ZSH prompt is far more simple that I thought. It’s done by defining the `PROMPT` variable in ZSH config.

For example:

```sh title="~/.zshrc"
# ~/.zshrc
PROMPT="👉 "
```

![screenshot of a prompt using a pointing finger unicode emoji](https://dbushell.com/images/blog/2025/finger-prompt.avif)

Simple as that. Prompts can be multiple lines but the final line is typically an arrow pointing to where the text cursor will be.

It’s possible and probably intended to use shell scripting to add extra stuff to the prompt. The [Pure prompt (<VPIcon icon="iconfont icon-github"/>`sindresorhus/pure`)](https://github.com/sindresorhus/pure) by **Sindre Sorhus** is written in shell script. Personally I prefer to write as little shell script as I can.

The good news is that it’s possible to leave shell land and call another executable by setting the `promptsubst` option:

```sh title="~/.zshrc"
# ~/.zshrc
setopt promptsubst
PROMPT='$(~/prompt.ts)'
```

In the example above I’m calling a TypeScript file. I need to run `chmod +x prompt.ts` once to make it executable and add a [<VPIcon icon="fa-brands fa-wikipedia-w"/>“shebang”](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) line atop:

```js
#!/usr/bin/env -S bun
await Bun.write(Bun.stdout, "👉 ");
```

And now I’m setting the prompt text with TypeScript 😱

Of course, spinning up a JavaScript runtime every time the prompt is rendered is insane (prompts are not live programs). Even I am not that degenerate and I [**rewrite _everything_**](/dbushell.com/http-tunnel-proxy.md) in JavaScript.

---

## Zig

This little project was an ideal opportunity to [**learn more Zig**](/dbushell.com/zig-the-good-parts.md). I haven’t touched any of the Zig filesystem APIs before.

Grabbing `stdout` in Zig is easy too:

```zig
const std = @import("std");

pub fn main() !void {
    const writer = std.io.getStdOut().writer();
    _ = try writer.write("👉 ");
}
```

From here [<VPIcon icon="fas fa-globe"/>draw the rest of the owl](https://knowyourmeme.com/memes/how-to-draw-an-owl).

My prompt, codenamed [<VPIcon icon="iconfont icon-forgejo"/>Zigbar](https://git.dbushell.com/dbushell/zsp), searches the current path for git repos and attempts to detect a project’s programming language. If you want something similar [<VPIcon icon="fas fa-globe"/>Starship](https://starship.rs/) can do that and more. I’m going to continue developing mine as I use it.

Compiled for macOS, the final executable is 260 KB. Compiled for Linux it was around 2 MB. I’m running Zigbar on a MacBook, Raspberry Pi, and [**an x86 server**](/dbushell.com/self-hosted-update-summer-2024.md) with no issues. Well — only issues with my bad code, not Zig or its build system.

::: note Update for 7 Mar 2024

A small [<VPIcon icon="fas fa-globe"/>note on Zig 0.14](https://dbushell.com/notes/2025-03-07T07:39Z/) build optimisation and binary sizes.

:::

To put 260 KB into perspective, using `bun build --compile` produces a 55 MB executable. That’s basically an entire runtime with a few lines of JavaScript tacked onto the end. Zig builds are tiny as you’d expect from a low-level language. I’m also led to believe Zig is significantly faster than JavaScript.

This experience has me wondering, why is cross-compiling Zig for different CPU architectures an easier experience than building the average web framework? JavaScript [**framework-mania**](/dbushell.com/frameworks-vs-libraries.md) is embarrassing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "I built a ZSH Prompt with Zig",
  "desc": "The one where I use something other than JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/zig-zsh-prompt.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
