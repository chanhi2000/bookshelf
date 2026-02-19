---
lang: en-US
title: "Goodbye JSON Schema: Typing JSON with JSON Structure"
description: "Article(s) > Goodbye JSON Schema: Typing JSON with JSON Structure"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Goodbye JSON Schema: Typing JSON with JSON Structure"
    - property: og:description
      content: "Goodbye JSON Schema: Typing JSON with JSON Structure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/goodbye-json-schema-typing-json-with-json-structure.html
prev: /programming/ts/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Goodbye JSON Schema: Typing JSON with JSON Structure"
  desc="As AI-generated code and LLM-integrated APIs become foundational in software development, traditional JSON Schema shows its limits. This article introduces JSON Structure, a modern, strongly typed schema language designed for the era of AI. We explore how it improves data modeling, supports clean code generation (especially for TypeScript), and enables AI systems to reason more accurately about structured output."
  url="https://typescript.tv/hands-on/goodbye-json-schema-typing-json-with-json-structure"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

As AI-generated code and LLM-integrated APIs become foundational in software development, traditional JSON Schema shows its limits. This article introduces JSON Structure, a modern, strongly typed schema language designed for the era of AI. We explore how it improves data modeling, supports clean code generation (especially for TypeScript), and enables AI systems to reason more accurately about structured output.

In 2025, as AI-generated code and LLM-integrated APIs become standard tools in modern software workflows, the limitations of JSON Schema are becoming more evident. While JSON Schema remains useful for validating JSON documents, it has limited capabilities to precisely describe data structures. That gap will be filled by a new IETF standard called [<VPIcon icon="fas fa-globe"/>JSON Structure](https://json-structure.org/).

JSON Structure is not just a different format, it's a developer-oriented, strongly typed, and modular data definition language. It offers fine-grained types, native composition, semantic extensions (like physical units and currency), and deterministic structure suitable for code generation and AI output validation. It resembles JSON Schema in syntax, but functions more like TypeScript or a formal schema language, enabling better tooling and more accurate data modeling in machine-driven environments.

---

## Limitations of JSON Schema

Large language models (LLMs) like GPT, Claude, and Mistral are increasingly being used to generate structured output. API payloads, config files, or even full data pipelines need clear schemas to guide that generation. LLM prompting improves dramatically when schemas are rich and explicit.

JSON Schema wasn’t designed with this in mind. It’s a validation language, not a type system. Its types are vague, composition is awkward (`allOf`, `anyOf`, `oneOf`) and there’s no built-in way to say something like “this float is in °C” or “this string is a UUID”. JSON Structure fixes all of that.

---

## JSON Structure Example

Here’s a simple core JSON Structure example that shows how to define a basic data type using just the core features:

```json
{
  "$id": "https://schemas.typescript.tv/UserProfile",
  "$schema": "https://json-structure.org/meta/core/v0/#",
  "name": "UserProfile",
  "type": "object",
  "properties": {
    "age": {
      "type": "uint8"
    },
    "id": {
      "type": "uuid"
    },
    "isAdmin": {
      "type": "boolean"
    },
    "name": {
      "description": "A person's name",
      "examples": ["John Doe", "Jane Doe"],
      "type": "string"
    }
  }
}
```

---

## Providing Semantics with JSON Structure

Let’s say you're working with sensor data. In JSON Schema, you’d write something like this:

```json
{
  "type": "object",
  "properties": {
    "temperature": { "type": "number" },
    "speed": { "type": "number" }
  }
}
```

JSON Structure allows for more expressive data definitions by using the [<VPIcon icon="fas fa-globe"/>unit keyword](https://datatracker.ietf.org/doc/draft-vasters-json-structure-units/) to attach precise physical units to numeric values:

```json
{
  "$schema": "https://json-structure.org/meta/extended/v0/#",
  "$id": "SensorReading",
  "$uses": ["JSONSchemaUnits"],
  "type": "object",
  "properties": {
    "temperature": {
      "type": "float32",
      "units": "K"
    },
    "speed": {
      "type": "float32",
      "units": "m/s"
    },
    "resistance": {
      "type": "float32",
      "units": "Ω"
    }
  }
}
```

Now the meaning is explicit. This is invaluable in domains like electronics, physics, and industrial control systems.

These symbols are fully supported and standards-compliant, so whether you're working with `µF` (microfarads), `kΩ` (kilo-ohms), or `m/s²` (acceleration), JSON Structure understands them and so can your tooling or AI models.

---

## JSON Schema vs. JSON Structure

JSON Structure gives you the kind of types you’ve always wanted from JSON Schema. For numeric values, JSON Schema only offers the vague `type: "number"`, while JSON Structure lets you choose specific types like `int32`, `uint64`, or `decimal`. Where JSON Schema treats all identifiers as plain strings, JSON Structure defines clear, purpose-specific types such as `uuid`, `uri`, and `email`.

It also goes beyond basic collections. JSON Schema lacks built-in support for sets, maps, or tuples, but JSON Structure has native types for all three, making data modeling far more expressive.

And when it comes to physical units, JSON Schema requires custom extensions to describe something like meters per second or degrees Celsius. JSON Structure handles that natively through its modular `units` extension.

Even inheritance is simpler. Instead of relying on `allOf` patterns, JSON Structure supports clean inheritance through `$extends` and `abstract` base types.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Goodbye JSON Schema: Typing JSON with JSON Structure",
  "desc": "As AI-generated code and LLM-integrated APIs become foundational in software development, traditional JSON Schema shows its limits. This article introduces JSON Structure, a modern, strongly typed schema language designed for the era of AI. We explore how it improves data modeling, supports clean code generation (especially for TypeScript), and enables AI systems to reason more accurately about structured output.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/goodbye-json-schema-typing-json-with-json-structure.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
