---
lang: en-GB
title: "Hmmarkdown 2"
description: "Article(s) > Hmmarkdown 2"
icon: fa-brands fa-markdown
category:
  - Markdown
  - Article(s)
tag:
  - blog
  - dbushell.com
  - md
  - markdown
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hmmarkdown 2"
    - property: og:description
      content: "Hmmarkdown 2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/hmmarkdown2.html
prev: /programming/md/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2026-01-22-hmmarkdown2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Markdown > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/md/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Hmmarkdown 2"
  desc="The one where I parse and render Markdown (again)"
  url="https://dbushell.com/2026/01/22/hmmarkdown2/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2026-01-22-hmmarkdown2.png"/>

Everyone has an opinion on [<VPIcon icon="fas fa-globe"/>markdown](https://daringfireball.net/projects/markdown/)[^1] but why stop there? Write your own parser, make those opinions **reality!** That’s what I did with [**Hmmarkdown**](/dbushell.com//hmmarkdown.md) — my HTML-aware markdown library. It has built my website content for the past year.

[^1]: A ~simple~ plain text markup language created by John Gruber and bastardised by everyone else. Designed for writers who enjoy teeny-weeny font sizes.

Turns out parsing markdown (with HTML) isn’t easy. My original approach evolved into a game of whac-a-mole to quash edge case bugs. [<VPIcon icon="fas fa-globe"/>Last week](https://dbushell.com/notes/2026-01-15T15:15Z/) I began a new parsing experiment I’d been mulling over. The idea [<VPIcon icon="fas fa-globe"/>proved workable](https://dbushell.com/notes/2026-01-17T09:23Z/) and I finished the job.

[<VPIcon icon="iconfont icon-forgejo"/>Hmmarkdown 2](https://git.dbushell.com/dbushell/hmmarkdown2) was born!

The new codebase is still rough around the edges but already an upgrade. I used my original test suite to ensure the same output. My primary goal was a more maintainable, extendable, and faster library, which it should be soon.

---

## The Purpose

Markdown is best in it’s **simplest form**. Complex extensions to the syntax make no sense. If HTML is the target and easier to markup, just write HTML! Existing markdown libraries allow HTML but they skip past it. The purpose of Hmmarkdown is to allow me to write *primarily* markdown but interweave HTML where it makes sense.

Along with my [**original example**](/dbushell.com/hmmarkdown.md#backstory), here’s a common pattern I use:

```html
<figure>
  > blockquote
  <figcaption>[reference](https://example.com)</figcaption>
</figure>
```

The mix of HTML and markdown above is transformed into the HTML below.

```html
<figure>
  <blockquote>
    <p>blockquote</p>
  </blockquote>
  <figcaption>
    <a href="https://example.com/">reference</a>
  </figcaption>
</figure>
```

In practice I mix little markup but it’s extremely useful to have the ability. Was this worth the investment? Probably not, but I’m in too deep!

---

## Old and Busted

My old parser separated lines by `\n` then grouped lines by block: paragraph, blockquote, heading, list, etc. Those blocks were then [**parsed as HTML**](/dbushell.com/html-parser-conundrum.md) (crudely). Text nodes were parsed for inline markdown: links, bold, italic, etc. A subset of block-level HTML elements were passed back through the parser. [<VPIcon icon="fas fa-globe"/>Regular expressions](https://xkcd.com/208/) did the heavy lifting.

---

## New Hotness

That was the old architecture. It worked but it got messy. The new parser begins with a more traditional tokenizer. The tokenizer iterates the input character by character to generate an array of tokens, namely:

- Asterisk
- Backtick
- Underscore
- Exclamation
- Hash
- Tilde
- Plus†
- Newline‡
- Parentheses
- Square brackets
- Angle brackets
- Tag
- Text

† Wait a minute “+” is not markdown! [I’ll explain later…](#the-plus-token)

Every token is a single ASCII character except for *Tag* and *Text*. *Tag* tokens are HTML tags, like `<div>`, `</div>`, or `<div/>`. *Text* tokens are a unicode string of everything else. From the tokens, I generate a basic DOM-like tree with a “root” node and child tokens.

‡ I ignore carriage returns (macOS user), they’re probably dealt with in *Text* nodes and eventually trimmed?

Using the HTML + markdown input example below:

```jsx
<aside class="Box">
  This is a **"boxed"** paragraph.
</aside>

End of document!
```

The initial token tree state could be visualised like this:

```plaintext
TAG(<root>)
  TAG(<aside class="Box">)
    NEWLINE
    TEXT('  This is a ')
    ASTERISK
    ASTERISK
    TEXT('"boxed"')
    ASTERISK
    ASTERISK
    TEXT(' paragraph.')
    NEWLINE
  NEWLINE
  NEWLINE
  TEXT('End of document')
  EXCLAMATION
```

With this tree I recursively parse the open tag nodes where the tag name is in an allowed set. This lets me ignore hard-coded HTML tags like `<script>`, `<style>`, and `<iframe>` where I never want to parse or modify.

Using the `<aside>` node for example, I iterate the children to generate a *new array of children*. The first two tokens `NEWLINE` and `TEXT` are appended to the new array. Then an `ASTERISK` token is found so `consumeStrong` is called. It will return a `<strong>` node (or nothing, for false positives). If that fails `consumeEmphasis` will be tried. If nothing matches the `ASTERISK` and `TEXT` tokens are appended without change. In this example `**"boxed"**` from the original input matches bold formatting.

The tree state now looks that this:

```plaintext
TAG(<root>)
  TAG(<aside class="Box">)
    NEWLINE
    TEXT('  This is a ')
    TAG(<strong>)
      TEXT('"boxed"')
    TEXT(' paragraph.')
    NEWLINE
  NEWLINE
  NEWLINE
  TEXT('End of document')
  EXCLAMATION
```

The next step wraps text and inline tags with HTML paragraphs. This is probably the ropiest area of my code but it works (mostly). `NEWLINE` tokens play a key role and they’re removed at this stage. Excess whitespace is also trimmed.

```plaintext
TAG(<root>)
  TAG(<aside class="Box">)
    TAG(<p>)
      TEXT('This is a ')
      TAG(<strong>)
        TEXT('"boxed"')
      TEXT(' paragraph.')
  TAG(<p>)
    TEXT('End of document')
    EXCLAMATION
```

Next I merge adjacent text tokens before applying [<VPIcon icon="fas fa-globe"/>SmartyPants](https://daringfireball.net/projects/smartypants/) replacement, and finally HTML entities are escaped. In this example because the `EXCLAMATION` token did not match markdown image syntax it is merged as text.

```plaintext
TAG(<root>)
  TAG(<aside class="Box">)
    TAG(<p>)
      TEXT('This is a ')
      TAG(<strong>)
        TEXT('“boxed”')
      TEXT(' paragraph.')
  TAG(<p>)
    TEXT('End of document!')
```

The final HTML output is a simple recursive function over tree nodes to generate a string. I’ve added extra formatting for readability below. HTML attributes are never parsed they just come along for the ride.

```html
<aside class="Box">
  <p>This is a <strong>“boxed”</strong> paragraph.</p>
</aside>
<p>End of document!</p>
```

And that is how Hmmarkdown 2 works!

Or at least *should work*. We’ll see if any formatting bugs appear on my website. The new tokenizer approach means I can largely avoid regex. The supported markdown syntax is still punishingly strict and opinionated.

The [<VPIcon icon="iconfont icon-forgejo"/>code repo is public](https://git.dbushell.com/dbushell/hmmarkdown2) but I have plenty to tidy up and optimise. There is no validation nor error reporting. I wouldn’t advise using it unless you’re me!

---

## The Plus Token

So about that `PLUS` token. Whereas unordered lists start with an `ASTERISK` token, *ordered lists* would be written as `NUMBER` followed by `PERIOD`.

```md
1. Item one
2. Item two
```

In fact, the numeric order and value doesn’t matter to markdown.

```md
9999. Item one
1. Item two
```

Both examples should output identical items marked 1 and 2 sequentially. (Some libraries do add a [<VPIcon icon="fa-brands fa-firefox"/>`start`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ol#start) attribute. That’s a thing I don’t need.)

Anyway, this is a pain to parse. I would need eleven additional tokens for digits `0` to `9` and `PERIOD`. That adds overhead and a lot of false positives in the look-ahead matching. To avoid this entirely I do a cheeky bit of regex pre-processing. Ordered list lines are replaced with `PLUS` before I tokenize.

```md
+ Item one
+ Item two
```

Now I can use the exact same logic I use to parse unordered lists.

Hmmarkdown has never supported nested lists because in over a decade of blogging I’ve never nested a list. That saves me another headache.

Tune in next year when I throw this all away and announce Hmmarkdown 3!

::: info Sources on 'Markdown'(1)

```component VPCard
{
  "title": "Daring Fireball: Markdown",
  "desc": "Markdown is a text-to-HTML conversion tool for web writers. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML.",
  "link": "https://daringfireball.net/projects/markdown/",
  "logo": "https://daringfireball.net/favicon.ico",
  "background": "rgba(74,82,90,0.2)"
}
```

```component VPCard
{
  "title": "Hmmarkdown 2",
  "desc": "The one where I parse and render Markdown (again)",
  "link": "/dbushell.com/hmmarkdown2.md",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hmmarkdown 2",
  "desc": "The one where I parse and render Markdown (again)",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/hmmarkdown2.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
