---
lang: en-US
title: "Understanding $extensions in the Design Tokens Specification"
description: "Article(s) > Understanding $extensions in the Design Tokens Specification"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding $extensions in the Design Tokens Specification"
    - property: og:description
      content: "Understanding $extensions in the Design Tokens Specification"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/understanding-extensions-in-the-design-tokens-spec.html
prev: /academics/system-design/articles/README.md
date: 2026-01-30
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/what-are-extensions.png
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
  name="Understanding $extensions in the Design Tokens Specification"
  desc="How the $extensions property lets teams innovate with design tokens without waiting for spec updates"
  url="https://alwaystwisted.com/articles/understanding-extensions-in-the-design-tokens-spec.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/what-are-extensions.png"/>

One of the smart things in the [<VPIcon icon="fas fa-globe"/>W3C Design Tokens Community Group (DRCG) Design Tokens spec](https://designtokens.org/tr/2025.10/format/) is how it acknowledges something simple, no standard can anticipate every use case.

Instead of trying to force everything into the specification, they created `$extensions`. Essentially it's a deliberate, scoped escape hatch. You can add extra data to your tokens without breaking them or polluting the standard.

---

## What is `$extensions`?

Think of it like this.

Your design tokens follow the spec strictly. But, sometimes you need to attach metadata that falls outside of it, tool-specific configuration, governance info, version history, whatever. Instead of inventing your own properties (which will create chaos), `$extensions` creates a place to put all this stuff.

Here's the important bit: The content of `$extensions` is completely freeform.

The spec doesn't validate what's inside. It can be strings, numbers, booleans, objects, whatever your use case needs. The only constraint is that it must be valid in whatever format you're using (JSON, YAML, etc.).

This is by design.

The DTCG intentionally placed almost no constraints on what can go in here, recognising that trying to anticipate every use case is foolish, if not futile.

You can use it for:

- Tool-specific configuration: Figma sync IDs, Style Dictionary transforms
- Team metadata: who owns this token, approval status, links to docs
- Workflow annotations: version history, changelog, deprecation warnings
- Experimental features: anything not yet standardised
- Integration data: bridges between tools, AI metadata, accessibility info

One key rule? Use reverse domain notation. Instead of `myData` or `myData.mySite.com`, use `com.yourcompany.featureName`. This eliminates naming collisions and keeps things organised.

---

## Why this matters

Without something like `$extensions`, teams could be tempted to just add custom metadata at the token level. You would see things like `_figmaId`, `vendor-config`, `customData` scattered through your token files.

It would be a mess.

With `$extensions`:

1. **Your tokens stay clean**: All the extra stuff lives in a designated place
2. **Tools ignore what they don't understand**: A token can pass through multiple tools and not lose data, even if those tools don't know about each others' extensions
3. **No waiting for spec updates**: Teams can try new approaches immediately instead of proposing, debating, and waiting for standardisation

---

## Real-world examples

### Tool integration

If you're syncing tokens between Figma and your codebase, you might want to store Figma's internal IDs:

Code languagejson

```json
{
  "primary-blue": {
    "$type": "color",
    "$value": "#0066CC",
    "$extensions": {
      "com.figma.tokens": {
        "styleId": "S:abc123def",
        "lastSynced": "2026-01-28T10:30:00Z"
      }
    }
  }
}
```

### Team governance

Or maybe your design system has approval workflows and you need to track who owns what:

Code languagejson

```json
{
  "heading-large": {
    "$type": "typography",
    "$value": {
      /* ... */
    },
    "$extensions": {
      "com.acme.governance": {
        "owner": "design-system-team",
        "approvedBy": "jane.doe@acme.com",
        "approvalDate": "2026-01-15",
        "usageGuidelines": "https://docs.acme.com/tokens/heading-large"
      }
    }
  }
}
```

### Build-time metadata

Style Dictionary might need specific transforms for certain tokens:

Code languagejson

```json
{
  "spacing-md": {
    "$type": "dimension",
    "$value": "16px",
    "$extensions": {
      "io.github.style-dictionary": {
        "transforms": ["size/rem"],
        "platforms": ["web", "ios"],
        "category": "spacing"
      }
    }
  }
}
```

### Accessibility data

You could even attach contrast ratios or WCAG conformance info. This is a good example of *computed or derived* metadata. The contrast ratio isn't inherent to the token itself, but depends on what you're comparing it against.

Code languagejson

```json
{
  "text-body": {
    "$type": "color",
    "$value": "#333333",
    "$extensions": {
      "org.w3.wcag": {
        "contrastRatio": {
          "onWhite": 12.6,
          "onPrimaryBg": 4.8
        },
        "level": "AAA"
      }
    }
  }
}
```

::: note

These examples focus on token-level extensions (the most common case), but `$extensions` also works at group and root levels. Use whatever scope makes sense for your metadata.

:::

---

## Real-world support

The DTCG spec reached a stable version (2025.10) in October 2025, and adoption seems to be happening fast, although unevenly.

Figma announced native support at their 2025 Schema conference. You can now export variables as spec-compliant JSON and import them back. However, Figma's not preserving `$extensions` (yet). If you import a token file with extensions, they will get removed when you export them.

Penpot did it differently. They were the first design tool to natively implement the specification (working with [<VPIcon icon="fas fa-globe"/>Tokens Studio](https://tokens.studio)), including `$extensions` support. You can import and export tokens with custom extensions, and Penpot preserves what it doesn't understand, exactly how the specification intends.

Build tools are where things get interesting. Style Dictionary, Tokens Studio, and Terrazzo all have solid `$extensions` support out of the box.

But here's the thing.

The spec says tools should preserve extensions they don't understand, and not all of them are there yet. If your workflow relies on `$extensions` for important metadata, you need to know which tools will keep that data and which won't.

---

## What not to put in `$extensions`

Just because you *can* put something in extensions doesn't mean you should. Here's what to avoid:

- **Data that changes a token's meaning**: This belongs in the core spec properties, not extensions
- **Secrets or sensitive information**: Token files are often committed to version control, so don't store API keys, credentials, or anything that shouldn't be in a repo
- **Massive amounts of data**: Keep your token files parseable and version-control friendly

::: note

**Tools are free to ignore extensions entirely**. A tool that only cares about the core spec can safely strip all `$extensions` and still have valid tokens. This is a feature, not a bug — it means your core token data is never held hostage by proprietary extensions.

:::

---

## The challenges

It's not perfect though. A few things to think about:

### File bloat

Every extension you add makes your token files bigger. Larger files could mean slower parsing, bigger version control diffs, more overhead. You can manage this with smart tooling. Strip extensions for production builds, use compression, externalize large extension data, but it will require discipline and governance.

### Fragmentation risk

If teams all solve the same problems differently in their extensions, you would end up with incompatible ecosystems. One team uses `com.team1.metadata`, another uses `com.team2.metadata`, and suddenly migrating between them is painful.

The antidote? Document your extensions. Share them. When something proves valuable, perhaps propose it for standardisation. Your design system will work better when people aren't inventing in silos.

### Discovery

There's no central registry of extensions (yet). If you want to know what extensions exist or how other teams handle something, you're basically having to reverse-engineer other peoples' token files. This will hopefully get better as the community matures.

---

## Best practices

If you're adding extensions to your tokens:

- **Document them**: Include schemas, examples, and rationale
- **Keep it optional**: Never make extensions critical to understanding a token's actual value
- **Version your extensions**: If you change structure significantly, bump a version
- **Think about preservation**: If you're building a tool, always maintain extensions you don't understand
- **Plan for obsolescence**: Extensions can be a proving ground, not a forever home. When something is proven, consider proposing it for standardisation

---

## The bigger picture

`$extensions` represents a mature way of thinking about standards. It says: "We're going to nail down what matters to everyone. For the rest, we'll create a clear, defined space where you can innovate without breaking things."

Too rigid, and the standard stifles innovation. Too loose, and you have chaos. I think this is a reasonable middle ground.

If you're working with design tokens, understanding how to use `$extensions` well should make your token files more flexible, more portable, and way more useful across different tools and workflows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding $extensions in the Design Tokens Specification",
  "desc": "How the $extensions property lets teams innovate with design tokens without waiting for spec updates",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/understanding-extensions-in-the-design-tokens-spec.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
