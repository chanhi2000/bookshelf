---
lang: en-US
title: "How to Get Your Gemini API Key"
description: "Article(s) > (1/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Google
  - Google Gemini
tag:
  - blog
  - freecodecamp.org
  - dart
  - dartlang
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "How to Get Your Gemini API Key"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/how-to-get-your-gemini-api-key.html
date: 2025-05-30
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build an AI-Powered Cooking Assistant with Flutter and Gemini",
  "desc": "After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li...",
  "link": "/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
  desc="After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li..."
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-how-to-get-your-gemini-api-key"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

To use the Gemini model, you'll need an API key. You can obtain one by following these steps:

1. Go to [<FontIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click on "Get API key" or "Create API key in new project."
4. Copy the generated API key.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748068929897/6e05ea8a-b80b-4bef-90c7-0ffddafa4965.png)

::: note Important Security Note:

In the provided HomeScreen code, the API key is directly embedded as String apiKey = "";. This is not a secure practice for production applications. Hardcoding API keys directly into your client-side code (like a Flutter app) exposes them to reverse engineering and potential misuse.

To secure your API keys in a Flutter application, I highly recommend referring to my article: [**How to Secure Mobile APIs in Flutter**](/freecodecamp.org/how-to-secure-mobile-apis-in-flutter.md). This article covers various best practices, including:

- Using environment variables or build configurations.
- Storing keys in secure local storage (though still client-side).
- Proxying API requests through a backend server to truly hide your API key.
- Using Firebase Extensions or Cloud Functions for server-side logic that interacts with AI models, without exposing the key to the client.

:::

For this tutorial, we'll keep it simple, but always prioritize API security in your real-world projects!
