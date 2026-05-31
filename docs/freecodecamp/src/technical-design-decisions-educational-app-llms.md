---
lang: en-US
title: "Key Technical Design Decisions for Building an Educational App with LLMs"
description: "Article(s) > Key Technical Design Decisions for Building an Educational App with LLMs"
icon: iconfont icon-supabase
category:
  - TypeScript
  - Node.js
  - Supabase
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - node
  - nodejs
  - node-js
  - supabase
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Key Technical Design Decisions for Building an Educational App with LLMs"
    - property: og:description
      content: "Key Technical Design Decisions for Building an Educational App with LLMs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/technical-design-decisions-educational-app-llms.html
prev: /programming/js-supabase/articles/README.md
date: 2026-06-04
isOriginal: false
author:
  - name: Srishti Sethi
    url: https://freecodecamp.org/news/author/srishakatux/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/004bd995-d90e-4589-be82-e66e0be110f5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
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
  name="Key Technical Design Decisions for Building an Educational App with LLMs"
  desc="Recently, I spent time prototyping an educational app using Claude Code. The project is an open-source mobile app for educators to share, discover, and facilitate low-cost creative learning activities"
  url="https://freecodecamp.org/news/technical-design-decisions-educational-app-llms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/004bd995-d90e-4589-be82-e66e0be110f5.png"/>

Recently, I spent time prototyping an educational app using [<VPIcon icon="iconfont icon-claude"/>Claude Code](https://anthropic.com/claude-code). The project is an open-source mobile app for educators to share, discover, and facilitate low-cost creative learning activities.

One of the core features of the app is AI-assisted activity creation. Activity creation has always been a key aspect of the project, and in the earlier desktop version, this was handled through manual long-form activity submission forms.

Given the current AI landscape, it felt important to explore alternative ways to simplify and streamline activity creation using AI, while reducing the amount of manual form-filling required from users.

I started with a blank slate, letting Claude guide me on the technologies to use for the app. The app was eventually built with React Native (Expo) and Firebase, and builds on a web version that is currently in beta.

What stood out to me most during prototyping was the speed: the mobile app went from ideation and mockups to a working prototype in about a month, compared to nearly a year for the original web version.

I haven't been coding heavily in recent years, and most of my professional work today is centered around technical community management. But since I do have a technical background and prior experience working in software development, I found it surprisingly accessible to quickly build a functional app using Claude alongside its reference guides and documentation.

I do think that experience helped me reason through tradeoffs, evaluate architectural decisions, and critically analyze the generated code rather than relying on the LLM blindly.

In this article, I’ll share some of the technical design decisions I made along the way.

![App Screenshots - Activity, Facilitation Step and Profile View](https://cdn.hashnode.com/uploads/covers/6a172a9fbadcd8afcb11f314/3bca2984-4e06-4e6c-b494-d005bd1db319.png)

::: note Prerequisites

The key technical decisions I discuss here are reflections that come from my hands-on experimentation. They're intended for others working at the intersection of education and technology, especially developers, community practitioners, or technically curious people looking to prototype and build quickly using AI tools.

You'll need to have some basic familiarity with the React Native framework, how databases and Firebase work, as well as how to use Claude tools, command-line tools, and API integrations.

It also helps to be comfortable making decisions along the way around tradeoffs, such as choosing one infrastructure over another based on cost, geography, multilingual support, scalability, or ease of use.

:::

---

## Which Model to Choose

When it comes to choosing the model to build the app itself, it was a straightforward choice. I picked [<VPIcon icon="iconfont icon-claude"/>Opus 4.7](https://anthropic.com/news/claude-opus-4-7) for its advanced capabilities because I needed the model to help architect the app from scratch.

But when it came to choosing the model inside the app, the decision required more consideration.

Before diving into the reasons for picking a model, let’s first understand the context. Some of the features in the app include lesson plan creation and structuring with AI, machine translation of the content into 10 languages, a facilitation mode that guides educators through AI-generated tips for each activity step, educator profiles, and more.

If we break these features down, the model needs to support a few key capabilities: structured JSON generation that follows strict schemas, pedagogical reasoning for activity design, multilingual content generation, and the ability to infer constraints such as time, materials, and age-appropriateness. It also needs to reliably map user inputs into predefined activity categories while maintaining consistency in output structure.

The activity generation workflow is the key AI feature in the app. Since it's an asynchronous, one-shot generation feature, I picked Sonnet among the available Claude models because of the quality and non-generic educational content it was able to generate.

---

## Choosing For Geography and Cost

Latency and network reliability were also important considerations. The app is designed to support educators working in underserved contexts and slower network environments. Although Claude’s [<VPIcon icon="iconfont icon-claude"/>Haiku](https://anthropic.com/claude/haiku) model would have offered lower latency, it might not be as reliable on slower networks compared to other models.

At the same time, I plan to keep the app free and open source, and I'm not currently planning to market it aggressively. Using Opus for end-user generation would therefore have been expensive, even though it may have produced richer outputs.

For a structured generation task like this, Sonnet felt like the right balance between quality, cost, and response time. Longer generation times with Opus could have negatively impacted user experience.

When it comes to configuring `maxTokens` in the API setup, I also made decisions keeping cost and generation length in mind.

A typical activity generated for the platform should ideally not exceed roughly 1,500–2,000 words, which translates to around 2,500 output tokens and approximately 30–45 seconds of generation time.

Based on this, I kept the `maxTokens` value around that range to help control token costs while still allowing enough space for meaningful structured educational content generation.

```ts
/**
 * Claude AI configuration.
 *
 * NOTE: For production, move the API key to a server-side proxy to avoid
 * exposing it in the client bundle. The `baseUrl` can be swapped to your
 * own backend endpoint that forwards requests to Anthropic.
 */
export const aiConfig = {
  apiKey: process.env.EXPO_PUBLIC_CLAUDE_API_KEY ?? '',
  model: 'claude-sonnet-4-6',
  maxTokens: 2500,
  baseUrl: 'https://api.anthropic.com/v1/messages',
  anthropicVersion: '2023-06-01',
};
```

---

## Choosing the Programming Framework and Backend Architecture

I wanted to build an app using a framework that could work seamlessly on both Android and iOS devices. React Native seemed like an obvious choice here, both because it directly fit this requirement and because of its simplicity, ease of use, and overall popularity in the ecosystem.

For the database and backend, I wanted to pick a system that felt credible from both a data privacy and security perspective.

I had a slightly unexpected moment during development while discussing architecture choices with Claude Code. It suggested commonly used developer platforms, such as [<VPIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com/). At first, this felt like a reasonable default choice.

But the key here was to not just go with what's commonly suggested, and instead do a quick but thorough check on how reliably these services are accessible in the target user regions. While looking deeper, I came across reports that [<VPIcon icon="fas fa-globe"/>Supabase access had been restricted in India](https://techcrunch.com/2026/02/27/india-disrupts-access-to-popular-developer-platform-supabase-with-blocking-order/), likely related to cybersecurity concerns.

That immediately changed my decision. Even though Claude had initially scaffolded the backend setup assuming Supabase, I later switched the architecture to [<VPIcon icon="fa-brands fa-google"/>Firebase](https://firebase.google.com/) by creating a project directly in the Firebase Console.

That was one of those small but important reminders that it's not enough to accept AI suggestions at face value. It's useful to actively check for the latest context, especially when it comes to infrastructure and platform availability.

The Firebase setup itself looked fairly straightforward:

- Create a project at [<VPIcon icon="fa-brands fa-google"/>Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password)
- Create a Firestore database
- Enable Storage
- Add a Web app and copy the config values

Another pattern I noticed was that AI is very quick to suggest interesting or “modern” infrastructure choices along the way: for example, for video uploads or media handling.

But in practice, thoughtful tradeoff decisions matter much more. Especially at an early stage, when I'm still validating the app idea with a small group of educators, I don't actually need a full-scale video infrastructure. This keeps the system lightweight, reduces implementation complexity, and helps avoid overengineering before the product direction and user needs are fully validated.

The prompt I used reflected this thinking:

> I am in the early validation stage for this app, focusing on feedback from a small group of educators. Therefore, we do not require a scalable and robust video infrastructure yet. Let’s design for easier alternatives, such as users uploading their videos to YouTube and simply copying the URL into a field for embedding on the activity page.

---

## Machine Translation and Multilingualism

Given that the primary audience of the earlier version of the app was multilingual, with the platform targeting users from different Indian language communities, it was really difficult as a small project to get translation coverage for content across all languages. But with AI, machine translation is possible at least for popular languages for which training datasets are available.

For the prototyping phase, I'm providing 5 of the world’s most popular languages and 5 popular Indian languages in the language selection. At least for these languages, the machine translation quality is pretty good and AI is reasonably reliable.

Without this, it would have been a cumbersome maintenance effort in the early stages of the app, both to keep translations updated and to recruit contributors to translate content manually.

There are two translation layers in the project: a static layer for interface messages kept in a `src/i18n` folder, and a dynamic layer for activity content.

For the dynamic part, AI generates translations for activity content using the Google Translate API. This is the same public web endpoint that the Google Translate web widget uses. It's free and no API key is needed.

But the API is unofficial and rate limits aren't guaranteed. For production use, we'll eventually switch to something more commercial and reliable such as the [<VPIcon icon="fa-brands fa-google"/>Cloud Translation API](https://cloud.google.com/translate).

---

## “Create with AI” with Humans in the Loop

The core idea behind the app is to help educators document and share their creative projects. So making documentation easier through AI while still keeping educators in the loop to maintain ownership over the final published content felt like an essential design choice.

Initially, I experimented with using Claude as a conversational chat partner for activity creation. The idea was that the AI would guide educators through a back-and-forth interaction and gradually build the activity plan through follow-up questions.

But during prototyping, I realized that this often introduced too much friction into the experience. It started to feel like users were being asked too many questions, and the final outputs frequently deviated from the intended structure or became inconsistent across activities.

To make the experience as quick and lightweight as possible, the app now primarily works from a single input. Users can briefly describe their activity idea in natural language and optionally upload media files, after which the AI generates a complete structured activity plan.

Instead of relying on open-ended conversational outputs, the app uses prompts with specific guidelines and schema requirements. The generated output is strictly valid JSON following a predefined structure (for example: 3-6 activity steps, 4-5 facilitation steps depending on complexity, automatic selection of a featured image based on visual relevance, and so on). This allows the generated content to be directly consumed by the app without requiring an additional parsing or mapping layer.

If a user uploads multiple photos, the AI also identifies which images belong to which activity steps. The experience works somewhat similarly to Facebook’s “[<VPIcon icon="fa-brands fa-meta"/>Create your listing with Meta AI](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)” feature. Users can upload different types of media files, after which the AI generates titles, materials, objectives, activity steps, and facilitation tips.

Importantly, everything remains editable before publishing, so educators can review, refine, and personalize the final content before sharing it with the community.

Return ONLY valid JSON (no markdown, no backticks) matching this exact schema:
```ts
{
  "title": "string (catchy, max 60 chars)",
  "description": "string (2-3 sentences, educator-facing)",
  "duration_minutes": number,
  "min_age": number,
  "max_age": number or null,
  "category": one of "Art" | "Science" | "Coding" | "Circuits" | "Engineering" | "Storytelling" | "Drama" | "Film" | "Music" | "Nature",
  "materials": [{ "name": "string", "buy_hint": "string (where to find it, e.g. craft store, hardware store, recycled)" }],
  "objectives": ["string (learning objective)"],
  "steps": [{
    "number": 1,
    "title": "string",
    "description": "string (2-3 sentences, detailed instructions for the educator)",
    "duration_minutes": number,
    "tip": "string (practical facilitation tip for educators running this step for the first time)",
    "assignedPhotoIndex": number or null
  }],
  "featured_image_index": number or null,
  "tips": ["string (general facilitation tip)"]
}
```

---

## Optimizing for Low Bandwidth

Keeping in mind that the app is intended for users on low-bandwidth networks during the initial development phase, I made sure to provide these constraints to Claude and ensure that the prototype included the bare minimum needed to support users on slower connections.

The app loads 10 activities at a time, and uses the Expo module `expo-image-manipulator` for lightweight image processing tasks such as resizing photos to 1200 px and re-encoding them as JPEGs before upload. As a result, a typical 3–5 MB image can be reduced to ~200 KB.

The AI calls are also kept text-only. While images are uploaded and stored in Firebase, they're never sent to the model itself, which helps keep requests lightweight and responsive even on slower internet connections.

---

## Producing a Demo Video

Finally, this was probably the most fun part of the process. Before my first demo meeting with an educator, I managed to generate a ~1 minute demo video out of a 4 minute screen recording. I used Claude to identify and cut the most relevant segments, and the `ffmpeg` command line tool to convert the final output into the appropriate format.

After trying out numerous AI video generation tools that would exhaust my tokens pretty quickly, I eventually found myself coming back to Claude for this workflow, and it ended up working surprisingly well. 🙂

---

## Summary

A little over a year ago, I had started implementing a similar version of this app, but never reached a functional prototype. The tooling was still evolving, and I often found myself stuck in loops of agentic errors, spending more time debugging the AI workflow itself than actually building the product. With the recent advancements in AI-assisted development tools, it has genuinely felt empowering to shape and prototype ideas much more quickly.

At the same time, one of the biggest lessons from this experience was that you can't blindly build applications using AI tools. You can't simply ask an agent to do all the work and make decisions while you go on a hike – though perhaps you can do the dishes between prompts.

Each step still needs careful evaluation. The reasoning, suggestions, and discussions generated by the agent need to be read, understood, and refined through follow-up prompts and human input.

A large part of the work involves making thoughtful decisions along the way: what model to choose and why, what tradeoffs matter most for your use case (cost, geography, latency, reasoning capability, multilingual support), what infrastructure choices make sense for hosting and scalability, what API integrations are appropriate, and what decisions should be optimized for the early stages of the app versus long-term growth.

Similarly, design decisions should be grounded in the actual needs and contexts of users rather than simply following what AI tools suggest by default.

That's ultimately what I have tried to document through this article: not just how the educational app was built, but also the reasoning and tradeoffs behind the technical and design decisions made throughout the process.

Hopefully, these reflections are useful to others experimenting with AI-assisted development, especially in educational or community-centered contexts.

And if you have ideas for evolving the app further, feel free to contribute or comment on GitHub.

::: info Resources

<SiteInfo
  name="unstructuredstudio/zubhub-mobile"
  desc="ZubHub is an open-source mobile app for educators to document, share, and collaborate on activity-based learning."
  url="https://github.com/unstructuredstudio/zubhub-mobile/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/46bd94e215c18ef48516795290a561c71063886e12643ee7a4c92de9171c52a6/unstructuredstudio/zubhub-mobile"/>

- [<VPIcon icon="fa-brands fa-google"/>Watch demo of the final workflow](https://drive.google.com/file/d/1W0rr9O6dBw9_9yCcgufVdCf8nbydHAo1/view?usp=sharing)

<VidStack src="youtube/undefined" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Key Technical Design Decisions for Building an Educational App with LLMs",
  "desc": "Recently, I spent time prototyping an educational app using Claude Code. The project is an open-source mobile app for educators to share, discover, and facilitate low-cost creative learning activities",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/technical-design-decisions-educational-app-llms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
