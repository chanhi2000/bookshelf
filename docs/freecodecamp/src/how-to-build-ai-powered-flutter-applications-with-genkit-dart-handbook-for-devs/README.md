---
lang: en-US
title: "How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs"
description: "Article(s) > How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Anthropic
  - Claude
  - OpenAI
  - Ollama
  - Google
  - Google Gemini
  - DeepSeek
  - Amazon
  - Amazon Bedrock
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
  - openai
  - ollama
  - google
  - gemini
  - google-gemini
  - deepseek
  - deep-seek
  - amazon
  - bedrock
  - aws-bedrock
  - amazon-bedrock
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs"
    - property: og:description
      content: "How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-powered-flutter-applications-with-genkit-dart-handbook-for-devs/
prev: /programming/dart/articles/README.md
date: 2026-04-01
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c3469d7d-95f7-441e-a430-e2ee2968ebf5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "DeepSeek > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/deepseek/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Amazon Bedrock > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/bedrock/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs"
  desc="There's a particular kind of frustration that every mobile developer has felt at some point. You're building a Flutter application, and you want to add an AI feature. Perhaps it's something that reads"
  url="https://freecodecamp.org/news/how-to-build-ai-powered-flutter-applications-with-genkit-dart-handbook-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c3469d7d-95f7-441e-a430-e2ee2968ebf5.png"/>

There's a particular kind of frustration that every mobile developer has felt at some point. You're building a Flutter application, and you want to add an AI feature.

Perhaps it's something that reads a photo and describes what's in it, or something that analyzes text and returns a structured result.

Suddenly you're drowning in provider-specific SDKs, ad-hoc JSON parsing, hand-rolled HTTP wrappers, and zero visibility into what the model is actually doing under the hood. You're not building your app anymore. You are building infrastructure.

This is the problem Genkit was created to solve. And with the arrival of Genkit Dart, the same solution is now in the hands of every Dart and Flutter developer on the planet.

In this guide, you'll learn what Genkit Dart is, how it thinks, every major thing it can do, and why those things matter before a single line of Flutter code is written.

Then, once that foundation is solid, you'll build a complete item identification application that opens the device camera, captures a photo, sends it to a multimodal AI model, and returns a structured, typed description of whatever was photographed.

::: note Prerequisites

To follow this guide and build the item identification project, you'll need to meet several technical requirements. Make sure your environment is configured with the following versions or higher:

1. Dart SDK version 3.5.0 or later is required to support the latest macro and type system features.
2. Flutter SDK version 3.24.0 or later ensures compatibility with the latest plugin architectures.
3. An API key from a supported provider is necessary. For this guide, I recommend a Google AI Studio API key for Gemini.
4. Basic familiarity with asynchronous programming in Dart is expected, specifically the use of Future and await keywords.

:::

You will also need a physical device or an emulator with camera support to test the project. Because we'll be capturing images and processing them, a physical mobile device typically provides the most reliable testing experience.

---

## What Is Genkit?

Genkit is an open-source framework built by Google for constructing AI-powered applications. It wasn't designed for any single language or runtime. The framework has been available for TypeScript and Go since its initial release, and it has since expanded to Python and, most recently, Dart.

Each language implementation follows the same philosophy: give developers a consistent, provider-agnostic way to define, run, test, and deploy AI logic.

The word "framework" here means something specific. Genkit isn't a thin wrapper around a single provider's API. It's a full toolkit that includes a model abstraction layer, a flow definition system, a schema system for type-safe structured output, a tool-calling interface, streaming support, multi-agent pattern utilities, retrieval-augmented generation helpers, and an observability layer that tracks every call and every token as it moves through your application.

It also ships with a visual developer interface that runs on localhost so you can inspect and test everything without writing a test file.

The reason this matters for Dart developers is that Genkit Dart isn't a port of the TypeScript version with Dart syntax substituted in. It's a native Dart implementation, built to feel like idiomatic Dart code, and it plugs directly into the Flutter development workflow through its CLI tooling.

### The Problem It Solves

When you use a model provider directly, every provider is its own world. If you start with Google's Gemini API and later decide you want to compare results with Anthropic's Claude, you are adding a second SDK, learning a second API contract, and writing adapter code to normalize the two different response shapes.

If you then decide that for one particular flow you want to use xAI's Grok because it handles a specific kind of reasoning better, you add a third SDK.

Three SDKs, three authentication patterns, three response parsing strategies, and zero unified observability across any of them.

Genkit collapses this into a single interface. You initialize Genkit with a list of plugins representing the providers you want to use. From that point on, you call `ai.generate()` regardless of which provider is underneath. You switch providers by changing one argument. The rest of your application code stays exactly as it was.

This is model-agnostic design, and it's the single most important architectural decision in Genkit's design.

---

## Why Genkit Dart Changes Everything for Flutter Developers

Flutter's core premise has always been that you write your application logic once and it runs correctly on Android, iOS, web, macOS, Windows, and Linux. Genkit Dart extends this premise to AI logic specifically. You write your AI flows once, in Dart, and you run them wherever Dart runs.

This has a practical consequence that's easy to underestimate. In most mobile AI architectures, there's a hard wall between the mobile client and the AI backend. The client is in Kotlin, Swift, or Dart. The backend is in Python, TypeScript, or Go. The schemas defined on the backend to describe what a flow expects as input and what it returns as output don't exist on the client. The client sends JSON and receives JSON, and both sides maintain their own understanding of what that JSON means. When the backend schema changes, the client breaks silently.

With Genkit Dart, the backend and the Flutter client are both in Dart. They share the same schema definitions. When your AI flow expects a `ScanRequest` object and returns an `ItemDescription` object, both the server and the Flutter app use the same generated Dart classes. Change the schema in one place and the Dart type system catches every mismatch everywhere. This is end-to-end type safety across the client-server boundary, and it is possible only because Dart runs on both sides.

The other thing worth saying plainly is that Genkit Dart is still in preview as of this writing. It's not version 1.0. Some APIs may shift. But the fundamentals, the flow system, the model abstraction, the schemantic integration, and the CLI tooling are already stable enough to build serious applications with, and the trajectory is clearly toward a production-ready release.

---

## Core Concepts

Before looking at code in detail, it helps to have a clear mental model of the four entities that every Genkit application is built from.

### The Genkit Instance

Everything in a Genkit application starts with creating a `Genkit` instance. This is the object that holds the configuration for your application, including which model provider plugins are active.

You pass a list of plugins when constructing it, and from that point forward you use the instance to register flows, define tools, and call models.

```dart
import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';

final ai = Genkit(plugins: [googleAI()]);
```

The `Genkit` constructor takes a `plugins` list. Each plugin registers its models and capabilities with the instance. Once the plugin is registered, its models are available through the instance's `generate` method.

### Plugins

Plugins are the bridge between the generic Genkit API and a specific provider's actual HTTP endpoint.

The `googleAI()` function, for example, configures the plugin that knows how to talk to the Google Generative AI service, authenticate requests using your API key from the environment, and translate Genkit's model calls into the specific request format that the Gemini API expects. You never write that translation code yourself. The plugin handles it entirely.

### Flows

A flow is the primary unit of AI work in Genkit. A flow is a Dart function that accepts a typed input, performs AI-related work (which might be a model call, a sequence of model calls, tool use, or a combination of all three), and returns a typed output.

What makes a flow different from a regular function is the scaffolding Genkit wraps around it: tracing, observability, Developer UI integration, the ability to expose the flow as an HTTP endpoint, and schema enforcement on both the input and the output.

You define a flow using `ai.defineFlow()`. You call a flow exactly like a function.

### Schemas

Schemas define the shape of data that flows with into and out of AI operations. They are defined using the `schemantic` package, which uses Dart code generation to produce strongly typed classes from abstract class definitions annotated with `@Schema()`. This means your AI inputs and outputs are not maps or dynamic objects. They are real Dart types with compile-time safety.

---

## Table of Contents

- [Every AI Provider Supported by Genkit Dart](#heading-every-ai-provider-supported-by-genkit-dart)
- [Flows: The Heart of Genkit](#heading-flows-the-heart-of-genkit)
- [Type Safety with Schemantic](#heading-type-safety-with-schemantic)
- [Tool Calling](#heading-tool-calling)
- [Streaming Responses](#heading-streaming-responses)
- [Multimodal Input](#heading-multimodal-input)
- [Structured Output](#heading-structured-output)
- [The Developer UI](#heading-the-developer-ui)
- [Running Genkit in Flutter: Three Architecture Patterns](#heading-running-genkit-in-flutter-three-architecture-patterns)
- [Deployment](#heading-deployment)
- [Observability and Tracing](#heading-observability-and-tracing)
- [Building a Real-Time Item Identification App](#heading-building-a-real-time-item-identification-app)

---

## Every AI Provider Supported by Genkit Dart

This is one of Genkit's greatest strengths, and it deserves a full treatment. As of the current preview, Genkit Dart supports the following providers as plugins.

### Google Generative AI (Gemini)

Package: `genkit_google_genai`

This is the plugin for Google's Gemini family of models accessed through the Google AI Studio API key. It covers the full Gemini lineup including Gemini 2.5 Flash, Gemini 2.5 Pro, and multimodal variants capable of processing text, images, audio, and video. The free tier for the Gemini API is generous, which makes it the default recommendation for getting started.

```dart
import 'package:genkit_google_genai/genkit_google_genai.dart';

final ai = Genkit(plugins: [googleAI()]);

final result = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: 'What is the capital of Nigeria?',
);
```

The API key is read automatically from the `GEMINI_API_KEY` environment variable. You set it once and every subsequent call to this plugin uses it without any explicit configuration in the code.

### Google Vertex AI

Package: `genkit_vertexai`

Vertex AI is Google's enterprise-grade AI platform. Unlike the Google AI Studio endpoint, Vertex AI is authenticated through Google Cloud credentials, making it the appropriate choice for production systems that need access controls, audit logs, regional data residency options, and integration with other Google Cloud services. It also gives access to Gemini models through a Google Cloud project, plus embedding models for vector search.

```dart
import 'package:genkit_vertexai/genkit_vertexai.dart';

final ai = Genkit(plugins: [
  vertexAI(projectId: 'your-project-id', location: 'us-central1'),
]);

final result = await ai.generate(
  model: vertexAI.gemini('gemini-2.5-pro'),
  prompt: 'Summarize the following contract clause...',
);
```

### Anthropic (Claude)

Package: `genkit_anthropic`

Anthropic's Claude models are available directly through the Anthropic plugin. Claude is known for strong reasoning, careful instruction-following, and a tendency to be conservative rather than hallucinate. If you're building an application where accuracy and careful handling of ambiguous instructions is more important than raw speed, Claude is worth including in your provider options.

```dart
import 'package:genkit_anthropic/genkit_anthropic.dart';

final ai = Genkit(plugins: [anthropic()]);

final result = await ai.generate(
  model: anthropic.model('claude-opus-4-5'),
  prompt: 'Review this code for security vulnerabilities.',
);
```

The API key is read from the `ANTHROPIC_API_KEY` environment variable.

### OpenAI (GPT) and OpenAI-Compatible APIs

Package: `genkit_openai`

This single package covers two distinct use cases, and understanding both is important.

The first is straightforward: it gives you access to OpenAI's GPT-4o, GPT-4 Turbo, and the rest of the OpenAI model catalog. Many teams already have OpenAI integrations in other parts of their infrastructure. This plugin lets you bring those models into the Genkit interface alongside your other providers without learning a second SDK.

```dart
import 'package:genkit_openai/genkit_openai.dart';
 
final ai = Genkit(plugins: [openAI()]);
 
final result = await ai.generate(
  model: openAI.model('gpt-4o'),
  prompt: 'Write a unit test for the following function.',
);
```

The API key is read from the `OPENAI_API_KEY` environment variable.

The second use case is where this plugin really earns its value. The `openAI` plugin accepts a custom `baseUrl` parameter, which means it can communicate with any HTTP API that follows the OpenAI request and response format. This includes a large number of providers and services that have adopted the OpenAI protocol as a standard interface.

The practical consequence is that all of the following become available in Genkit Dart without any additional package:

**xAI's** Grok models are reached by pointing the plugin at xAI's API endpoint. Grok is designed with strong reasoning and real-time information access, and it's straightforward to include as an alternative or comparison provider.

```dart
final ai = Genkit(plugins: [
  openAI(
    apiKey: Platform.environment['XAI_API_KEY']!,
    baseUrl: 'https://api.x.ai/v1',
    models: [
      CustomModelDefinition(
        name: 'grok-3',
        info: ModelInfo(
          label: 'Grok 3',
          supports: {'multiturn': true, 'tools': true, 'systemRole': true},
        ),
      ),
    ],
  ),
]);
 
final result = await ai.generate(
  model: openAI.model('grok-3'),
  prompt: 'Explain the current state of fusion energy research.',
);
```

**DeepSeek's** models, particularly DeepSeek-R1 and DeepSeek-V3, have drawn significant attention for delivering strong results on reasoning and coding tasks at comparatively low cost. They're accessed the same way:

```dart
final ai = Genkit(plugins: [
  openAI(
    apiKey: Platform.environment['DEEPSEEK_API_KEY']!,
    baseUrl: 'https://api.deepseek.com/v1',
    models: [
      CustomModelDefinition(
        name: 'deepseek-chat',
        info: ModelInfo(
          label: 'DeepSeek Chat',
          supports: {'multiturn': true, 'tools': true, 'systemRole': true},
        ),
      ),
    ],
  ),
]);
 
final result = await ai.generate(
  model: openAI.model('deepseek-chat'),
  prompt: 'Optimize this Dart function for memory efficiency.',
);
```

**Groq's** inference platform is also reachable through the same pattern. Groq is known for extremely fast inference speeds, which can be valuable in applications where response latency is the primary constraint:

```dart
final ai = Genkit(plugins: [
  openAI(
    apiKey: Platform.environment['GROQ_API_KEY']!,
    baseUrl: 'https://api.groq.com/openai/v1',
    models: [
      CustomModelDefinition(
        name: 'llama-3.3-70b-versatile',
        info: ModelInfo(
          label: 'Llama 3.3 70B (Groq)',
          supports: {'multiturn': true, 'tools': true, 'systemRole': true},
        ),
      ),
    ],
  ),
]);
```

Together AI and other OpenAI-compatible inference providers follow the identical pattern. You change the `baseUrl`, the `apiKey` environment variable name, and the model name string. Everything else in your application – the flows, the schemas, the tool definitions – stays exactly the same.

It's worth being clear about what AWS Bedrock and Azure AI Foundry don't yet support. Both platforms have dedicated plugins in Genkit's TypeScript version. Neither has a Dart plugin as of the current preview.

If your organization's AI infrastructure lives on AWS or Azure, the current path is to host a TypeScript Genkit backend on those platforms and have your Flutter client call it as a remote flow, which is a valid and production-appropriate pattern described in the Flutter architecture section of this guide.

### Local Models with llamadart

Package: `genkit_llamadart` (community plugin)

For scenarios where you need to run models entirely on-device or on your own hardware without any cloud dependency, `genkit_llamadart` is a community plugin that runs GGUF-format models locally through the llamadart inference engine. This is the appropriate path when data privacy requirements prohibit sending any content to a third-party API, when you need offline-capable AI features, or when you want a development environment that doesn't consume API quota.

```dart
import 'package:genkit/genkit.dart';
import 'package:genkit_llamadart/genkit_llamadart.dart';
 
void main() async {
  final plugin = llamaDart(
    models: [
      LlamaModelDefinition(
        name: 'local-llm',
        // Path to a locally downloaded GGUF model file
        modelPath: '/models/llama-3.2-3b-instruct.gguf',
        modelParams: ModelParams(contextSize: 4096),
      ),
    ],
  );
 
  final ai = Genkit(plugins: [plugin]);
 
  final result = await ai.generate(
    model: llamaDart.model('local-llm'),
    prompt: 'Summarize the key points of this document.',
    config: LlamaDartGenerationConfig(
      temperature: 0.3,
      maxTokens: 512,
      enableThinking: false,
    ),
  );
 
  print(result.text);
 
  // Dispose the plugin when done to release native resources
  await plugin.dispose();
}
```

The plugin supports text generation, streaming, tool calling loops, constrained JSON output for structured responses, and text embeddings. GGUF models can be sourced from Hugging Face or other model hubs.

Good starting points for local experimentation include Llama 3.2 3B Instruct (compact and capable), Phi-3 Mini (very small footprint), and Gemma 3 2B (Google's small open-weight model).

### Chrome Built-In AI (Gemini Nano in the Browser)

Package: `genkit_chrome` (community plugin)

For Flutter Web applications specifically, there's a plugin that runs Google's Gemini Nano model directly inside Chrome using the browser's built-in AI capabilities. This requires no API key, no network call, and no server. The model runs entirely within the browser process.

```dart
import 'package:genkit/genkit.dart';
import 'package:genkit_chrome/genkit_chrome.dart';
 
void main() async {
  final ai = Genkit(plugins: [ChromeAIPlugin()]);
 
  final stream = ai.generateStream(
    model: modelRef('chrome/gemini-nano'),
    prompt: 'Suggest three improvements to this paragraph.',
  );
 
  await for (final chunk in stream) {
    print(chunk.text);
  }
}
```

This plugin requires Chrome 128 or later with specific browser flags enabled. It's experimental and text-only as of the current release. The use cases are niche but real: offline-first web features, low-latency autocomplete where even a round trip to a fast server adds too much delay, and privacy-sensitive features where the user's text should never leave the device.

### A Note on the Provider Landscape

The Genkit Dart plugin ecosystem is intentionally focused in this preview period. The four first-party plugins cover the most widely used providers, the OpenAI-compatible mechanism extends reach to a large number of additional services without requiring new packages, and the community plugins fill in local and browser-native use cases. The TypeScript version has more plugins, and as Genkit Dart matures toward a stable release, that gap will narrow.

Watching the pub.dev package namespace for new `genkit_*` packages is the most reliable way to track what's added.

### Switching Between Providers

The single most powerful thing about this provider list is what you can do with it at the Genkit instance level. You can load multiple plugins simultaneously and use different providers for different flows within the same application.

```dart :collapsed-lines
import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';
import 'package:genkit_anthropic/genkit_anthropic.dart';
import 'package:genkit_openai/genkit_openai.dart';

final ai = Genkit(plugins: [
  googleAI(),
  anthropic(),
  openAI(),
]);

// Use Gemini for multimodal tasks
final visionResult = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: [
    Part.media(url: imageUrl),
    Part.text('What is in this image?'),
  ],
);

// Use Claude for document review
final reviewResult = await ai.generate(
  model: anthropic.model('claude-opus-4-5'),
  prompt: contractText,
);

// Use GPT-4o for code generation
final codeResult = await ai.generate(
  model: openAI.model('gpt-4o'),
  prompt: featureDescription,
);
```

All three calls use the same `ai.generate()` method. No adapter code. No conversion utilities. No separate authentication setup for each. The provider difference is expressed purely in the `model` argument.

---

## Flows: The Heart of Genkit

The flow is the most important concept in Genkit. Understanding what a flow is, what wrapping your AI logic inside one gives you, and how flows compose means that you understand most of what Genkit does.

### Defining a Basic Flow

At its most stripped-down form, a flow is defined with `ai.defineFlow()`:

```dart :collapsed-lines
import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';
import 'package:schemantic/schemantic.dart';

part 'main.g.dart';

@Schema()
abstract class $BookSummaryInput {
  String get title;
  String get author;
}

@Schema()
abstract class $BookSummaryOutput {
  String get summary;
  String get keyThemes;
  int get estimatedReadTimeMinutes;
}

void main() async {
  final ai = Genkit(plugins: [googleAI()]);

  final bookSummaryFlow = ai.defineFlow(
    name: 'bookSummaryFlow',
    inputSchema: BookSummaryInput.$schema,
    outputSchema: BookSummaryOutput.$schema,
    fn: (input, context) async {
      final response = await ai.generate(
        model: googleAI.gemini('gemini-2.5-flash'),
        prompt: 'Provide a summary of the book "${input.title}" '
                'by ${input.author}. Include key themes and estimated '
                'reading time.',
        outputSchema: BookSummaryOutput.$schema,
      );

      if (response.output == null) {
        throw Exception('The model did not return a valid structured response.');
      }

      return response.output!;
    },
  );

  final summary = await bookSummaryFlow(
    BookSummaryInput(title: 'Things Fall Apart', author: 'Chinua Achebe'),
  );

  print(summary.summary);
  print('Key themes: ${summary.keyThemes}');
  print('Estimated reading time: ${summary.estimatedReadTimeMinutes} minutes');
}
```

Let's walk through each piece of this code.

The `@Schema()` annotation on `\(BookSummaryInput` and `\)BookSummaryOutput` tells the `schemantic` package that these abstract classes should have concrete Dart classes generated for them. The convention is to prefix the abstract class name with a dollar sign.

After running `dart run build_runner build`, the generator creates `BookSummaryInput` and `BookSummaryOutput` as concrete classes with constructors, JSON serialization, and Genkit schema definitions attached as the `$schema` static property.

The `part 'main.g.dart'` directive at the top of the file is the Dart code generation include that brings the generated code into scope.

`ai.defineFlow()` takes a `name`, an `inputSchema`, an `outputSchema`, and the function `fn` that contains the actual logic. The `name` is what identifies this flow in the Developer UI and in CLI commands. The schemas attach type enforcement: Genkit will validate the input before calling `fn` and validate the output before returning it to the caller.

Inside `fn`, `input` is already typed as `BookSummaryInput`. You access its properties directly through the type system. No `input['title']`, no null checks on dynamic maps.

The `ai.generate()` call inside the flow specifies the model, the prompt string, and the same output schema. The model is instructed through schema guidance to return JSON that matches `BookSummaryOutput`. Genkit validates the returned JSON and makes it available as a typed `BookSummaryOutput` instance through `response.output`.

The final call `await bookSummaryFlow(BookSummaryInput(...))` invokes the flow exactly like a function call. The return value is typed as `BookSummaryOutput`.

### Why Not Just Call `ai.generate()` Directly?

This is a reasonable question. If you only need one model call with no surrounding logic, the extra definition step can look like ceremony. Here's what wrapping that call in a flow actually gives you.

First, the Developer UI can discover and test flows but can't discover and test bare `ai.generate()` calls. When you define a flow, it immediately becomes visible and executable in the local web interface without any additional setup.

Second, flows can be exposed as HTTP endpoints with one line of code. A bare `ai.generate()` call can't. The deployment story for Genkit AI logic is fundamentally built around flows.

Third, tracing and observability work at the flow level. When you look at a trace in the Developer UI, you see the entire flow execution as a tree: which model was called, with what prompt, what it returned, how long it took, and how many tokens were used. This is not possible with ad-hoc generate calls.

Fourth, flows are the unit of composition in multi-step AI logic. You can call a flow from within another flow, build sequences of AI operations, and have each level of the hierarchy traced and observable independently.

### Multi-Step Flows

A flow doesn't have to be a single model call. It can contain any amount of Dart logic, including multiple model calls, conditionals, loops, and calls to external APIs. The entire sequence is traced as a single flow execution.

```dart
final productResearchFlow = ai.defineFlow(
  name: 'productResearchFlow',
  inputSchema: ProductQuery.$schema,
  outputSchema: ProductReport.$schema,
  fn: (input, context) async {
    // First model call: extract structured search terms
    final searchTermsResponse = await ai.generate(
      model: googleAI.gemini('gemini-2.5-flash'),
      prompt: 'Extract the top 5 search keywords from this product query: '
              '"${input.query}". Return them as a comma-separated list.',
    );

    final keywords = searchTermsResponse.text;

    // External API call: fetch product data using the keywords
    final products = await fetchProductsFromDatabase(keywords);

    // Second model call: synthesize the findings into a structured report
    final reportResponse = await ai.generate(
      model: googleAI.gemini('gemini-2.5-pro'),
      prompt: 'Based on these products: $products\n\n'
              'Write a concise competitive analysis for: ${input.query}',
      outputSchema: ProductReport.$schema,
    );

    if (reportResponse.output == null) {
      throw Exception('Report generation failed.');
    }

    return reportResponse.output!;
  },
);
```

Notice that this flow makes two different model calls using two different Gemini variants (Flash for the cheaper extraction task, Pro for the more complex synthesis). It also calls an external Dart function in between. The entire execution, both model calls and the external call, is captured as a single trace.

---

## Type Safety with Schemantic

The `schemantic` package is what makes Genkit Dart feel genuinely Dart-idiomatic rather than feeling like a TypeScript port. Understanding it fully is important because it underpins every structured output and flow definition in Genkit Dart.

### How Schemantic Works

Schemantic is a code generation library. You write abstract classes with getter declarations and annotate them with `@Schema()`. When you run `dart run build_runner build`, the generator reads those abstract classes and produces concrete implementation classes with:

- A constructor that accepts named parameters for each field
- `fromJson(Map<String, dynamic> json)` factory constructor for deserialization
- `toJson()` method for serialization
- A static `$schema` property that holds the Genkit schema definition Genkit uses at runtime to validate inputs and outputs and to instruct models on the expected output format

The `@Field()` annotation lets you add metadata to individual properties. The most important piece of metadata is the `description` string, which Genkit includes in the prompt instructions it sends to the model. Better field descriptions produce better structured output because the model understands more precisely what each field should contain.

```dart
import 'package:schemantic/schemantic.dart';

part 'schemas.g.dart';

@Schema()
abstract class $ProductScan {
  @Field(description: 'The common name of the product or object identified')
  String get productName;

  @Field(description: 'The primary material the object appears to be made from')
  String get material;

  @Field(description: 'Estimated retail price range in USD')
  String get estimatedPriceRange;

  @Field(description: 'Any visible brand names or logos')
  String? get brandName;

  @Field(description: 'Short description of the item condition')
  String get condition;

  @Field(description: 'Confidence score between 0.0 and 1.0')
  double get confidence;
}
```

After running the build runner, you can use `ProductScan` as a concrete class:

```dart
final scan = ProductScan(
  productName: 'Stainless Steel Water Bottle',
  material: 'Stainless steel',
  estimatedPriceRange: '\\(20 - \\)40',
  brandName: 'Hydro Flask',
  condition: 'Like new',
  confidence: 0.94,
);

print(scan.toJson());
// {productName: Stainless Steel Water Bottle, material: Stainless steel, ...}
```

And in a flow:

```dart
final response = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: [...imageAndTextParts],
  outputSchema: ProductScan.$schema,
);

final ProductScan? result = response.output;
if (result != null) {
  print(result.productName);
  print('Confidence: ${result.confidence}');
}
```

`response.output` is typed as `ProductScan?`. The compiler knows this. There's no casting, no dynamic map access, and no runtime surprises about field names.

### Nullable Fields

Properties declared as nullable with `?` in the abstract class become nullable in the generated class. Genkit communicates this nullability to the model through the schema, so the model understands which fields are optional. This reduces false null values and prevents validation failures for fields the model legitimately can't determine from the input.

### Lists and Nested Types

Schemantic handles lists and nested schema types correctly. A property declared as `List<String>` generates the appropriate array type in the schema definition. A property declared as another `@Schema()`-annotated type generates the appropriate nested object schema.

```dart
@Schema()
abstract class $ItemAnalysis {
  String get name;
  List<String> get tags;
  List<$RelatedItem> get relatedItems;  // nested schema reference
}

@Schema()
abstract class $RelatedItem {
  String get name;
  String get relationship;
}
```

---

## Tool Calling

Tool calling is the mechanism that lets a model take actions and retrieve information during the course of generating a response.

When you define tools and make them available to a model call, the model can decide, based on the conversation, that it needs to use one of those tools. It issues a structured request to call the tool, Genkit executes the tool function, returns the result to the model, and the model continues generating with the new information.

This is what transforms a model from a static knowledge base into something capable of fetching live data, querying databases, calling external APIs, and performing real work.

### Defining a Tool

```dart
import 'package:schemantic/schemantic.dart';

part 'tools.g.dart';

@Schema()
abstract class $StockPriceInput {
  @Field(description: 'The stock ticker symbol, e.g. AAPL, GOOG')
  String get ticker;
}

// Register the tool with the Genkit instance
ai.defineTool(
  name: 'getStockPrice',
  description: 'Retrieves the current market price for a given stock ticker symbol',
  inputSchema: StockPriceInput.$schema,
  fn: (input, context) async {
    // In a real app, this would call a financial data API
    final price = await StockDataService.fetchPrice(input.ticker);
    return 'Current price of ${input.ticker}: \$$price';
  },
);
```

The `description` field for both the tool itself and its input schema fields is critically important. The model uses these descriptions to decide whether to call the tool and how to construct the input. Vague descriptions produce unreliable tool use.

### Using a Tool in a Flow

```dart
final marketAnalysisFlow = ai.defineFlow(
  name: 'marketAnalysisFlow',
  inputSchema: AnalysisRequest.$schema,
  outputSchema: MarketReport.$schema,
  fn: (input, context) async {
    final response = await ai.generate(
      model: googleAI.gemini('gemini-2.5-pro'),
      prompt: 'Perform a brief market analysis for the following companies: '
              '${input.companyTickers.join(', ')}. '
              'Check the current price for each before writing the analysis.',
      toolNames: ['getStockPrice'],
      outputSchema: MarketReport.$schema,
    );

    if (response.output == null) {
      throw Exception('Market analysis generation failed.');
    }

    return response.output!;
  },
);
```

The `toolNames` parameter is a list of tool names (matching the `name` you gave when calling `defineTool`) that you're making available for this specific model call. The model sees the tool descriptions and schemas and decides autonomously when and how to call them during the generation process.

### The Tool Calling Loop

When you provide tools, a single `ai.generate()` call may involve multiple round trips to the model. The sequence is:

1. Genkit sends the prompt and tool schemas to the model.
2. The model responds with a request to call one or more tools instead of (or before) generating final text.
3. Genkit executes the requested tools and collects their outputs.
4. Genkit sends the tool outputs back to the model.
5. The model either calls more tools or generates its final response.

Genkit handles all of this automatically. From your application code, `ai.generate()` is still a single awaited call. The tool loop runs internally.

---

## Streaming Responses

Large language models generate text one token at a time. In most API calls, the client waits for the entire response to be assembled before receiving anything.

For short responses this is fine. For long responses, this creates noticeable latency that degrades the user experience. Streaming solves this by delivering tokens to the client as they're generated.

Genkit supports streaming at both the `ai.generate()` level and the flow level.

### Streaming at the Generate Level

```dart
final stream = ai.generateStream(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: 'Write a detailed history of the Benin Kingdom.',
);

await for (final chunk in stream) {
  // Each chunk contains the new text since the last chunk
  process.stdout.write(chunk.text);
}

// The complete assembled response is available after the stream ends
final completeResponse = await stream.onResult;
print('\n\nTotal tokens used: ${completeResponse.usage?.totalTokens}');
```

The `generateStream()` method returns immediately with a stream object. Iterating over it with `await for` processes each chunk as it arrives. The `stream.onResult` future resolves with the complete assembled response after the stream is exhausted.

### Streaming at the Flow Level

Flows can also stream intermediate results. This is useful for flows that contain multi-step logic where you want to show progress to the user before the flow completes entirely.

```dart
@Schema()
abstract class $StoryRequest {
  String get genre;
  String get protagonist;
}

@Schema()
abstract class $StoryResult {
  String get title;
  String get fullText;
}

final storyGeneratorFlow = ai.defineFlow(
  name: 'storyGeneratorFlow',
  inputSchema: StoryRequest.$schema,
  outputSchema: StoryResult.$schema,
  streamSchema: JsonSchema.string(),
  fn: (input, context) async {
    // Stream the story text as it is generated
    final stream = ai.generateStream(
      model: googleAI.gemini('gemini-2.5-flash'),
      prompt: 'Write a \({input.genre} short story featuring \){input.protagonist}.',
    );

    final buffer = StringBuffer();

    await for (final chunk in stream) {
      buffer.write(chunk.text);
      if (context.streamingRequested) {
        // Send each chunk to the stream consumer
        context.sendChunk(chunk.text);
      }
    }

    final fullText = buffer.toString();

    // Generate a title as a separate quick call
    final titleResponse = await ai.generate(
      model: googleAI.gemini('gemini-2.5-flash'),
      prompt: 'Generate a one-line title for this story: $fullText',
    );

    return StoryResult(title: titleResponse.text.trim(), fullText: fullText);
  },
);
```

The `streamSchema` parameter on `defineFlow` declares the type of data that will be streamed through `context.sendChunk()`. Here it's a string, meaning each chunk is a string of text. You could also define a schema for structured streaming chunks if your use case requires streaming typed objects.

To consume a streaming flow:

```dart
final streamResponse = storyGeneratorFlow.stream(
  StoryRequest(genre: 'science fiction', protagonist: 'a Lagos street vendor'),
);

// Print streamed chunks as they arrive
await for (final chunk in streamResponse.stream) {
  process.stdout.write(chunk);
}

// Get the complete typed output after the stream ends
final finalResult = await streamResponse.output;
print('\n\nTitle: ${finalResult.title}');
```

In a Flutter context, each chunk arriving through `streamResponse.stream` would trigger a `setState()` call to update a `Text` widget, creating a typewriter effect in the UI without waiting for the full response.

---

## Multimodal Input

Many modern models accept more than just text. They can receive images, audio, video, and documents as part of the prompt.

Genkit handles multimodal input through the `Part` class. A prompt that was previously a string becomes a list of parts, where each part is either text, a media reference, or raw data.

### Providing an Image by URL

```dart
final response = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: [
    Part.media(url: 'https://example.com/product.jpg'),
    Part.text('What product is shown in this image? '
              'Include the brand name if visible.'),
  ],
);

print(response.text);
```

### Providing an Image as Raw Bytes

When the image is captured on-device or loaded from the file system, you supply it as base64-encoded bytes with an explicit MIME type:

```dart
import 'dart:convert';
import 'dart:io';

final imageFile = File('/path/to/photo.jpg');
final imageBytes = await imageFile.readAsBytes();
final base64Image = base64Encode(imageBytes);

final response = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: [
    Part.media(
      url: 'data:image/jpeg;base64,$base64Image',
    ),
    Part.text('Identify this item and describe it in detail.'),
  ],
);
```

The `data:` URL scheme encodes the binary image data directly into the prompt part. No intermediate upload to a storage service is required for this approach.

### Multimodal with Structured Output

Multimodal prompts compose cleanly with structured output schemas:

```dart
final response = await ai.generate(
  model: googleAI.gemini('gemini-2.5-flash'),
  prompt: [
    Part.media(url: 'data:image/jpeg;base64,$base64Image'),
    Part.text('Analyze this item thoroughly.'),
  ],
  outputSchema: ProductScan.$schema,
);

final ProductScan? scan = response.output;
```

The model receives both the image and the text instruction and is constrained to respond in the `ProductScan` JSON structure. This combination – multimodal input feeding into typed structured output – is the core mechanism of the item identification application that we'll build later in this guide.

---

## Structured Output

Structured output deserves additional treatment beyond what we covered in the Schemantic section. This is because the mechanics of how Genkit communicates schema requirements to the model are worth understanding.

When you pass `outputSchema` to `ai.generate()`, Genkit does two things. First, it includes schema guidance in the prompt itself, instructing the model to respond with JSON that matches the specified structure. Second, after the model responds, Genkit parses the response and validates it against the schema. If the output doesn't match, Genkit can optionally retry the generation or raise an exception.

This is why the `@Field(description: '...')` annotation on each property matters so much. The description is included in the schema guidance sent to the model. A property named `confidence` with no description leaves the model to guess what scale to use. A property named `confidence` with the description `'A decimal value between 0.0 and 1.0 representing identification certainty'` tells the model precisely what to put there.

The practical advice is: write field descriptions as if they are instructions to a developer who has never seen your code. Be explicit about units, ranges, formats, and any domain-specific meaning.

---

## The Developer UI

The Developer UI is a localhost web application included with the Genkit CLI. It's one of the features that makes Genkit genuinely easier to work with than raw API integration, and it deserves its own detailed section.

### Starting the Developer UI

From your project directory, after installing the Genkit CLI:

```sh
genkit start -- dart run
```

This command starts your Dart application and launches the Developer UI simultaneously, with the UI connected to your running application. The terminal prints the URL, which is `http://localhost:4000` by default.

For Flutter applications specifically, the CLI provides a dedicated command:

```sh
genkit start:flutter -- -d chrome
```

This starts the Genkit UI, runs your Flutter app in Chrome, generates a `genkit.env` file containing the server configuration, and passes those environment variables into the Flutter runtime. All of this happens with one command.

### What the Developer UI Shows You

The left sidebar lists every flow defined in your application. Clicking a flow name opens its detail view.

The **Run** tab shows the flow's input schema as a structured form. You fill in the fields and click Run. The flow executes and the output appears in the response panel. For streaming flows, you see the output arrive incrementally in real time. This lets you test your flows without writing test code or using curl.

The **Traces** tab shows the execution history of every flow run. Each trace is a tree. At the top level is the flow. Inside it you see each `ai.generate()` call, the exact prompt that was sent, the exact response that came back, the model used, the token counts, and the latency. For multi-step flows that make several model calls, you see each call as a node in the tree with its own details.

The traces are the debugging tool you reach for when a flow produces unexpected output. Rather than adding print statements and re-running, you look at the trace and see the exact prompt the model received. Often the problem is immediately obvious: a template string was interpolated incorrectly, a variable was empty, or a field description was misleading the model. Fix the prompt, re-run, check the new trace.

---

## Running Genkit in Flutter: Three Architecture Patterns

Genkit Dart supports three distinct patterns for integrating AI logic with a Flutter application. The right choice depends on the sensitivity of your prompts, the complexity of your AI logic, and the stage of development you're in.

### Pattern 1: Fully Client-Side (Prototyping Only)

In this pattern, all Genkit logic runs inside the Flutter app. The `Genkit` instance is created in the Flutter code, the AI flows are defined there, and the model API calls are made directly from the device.

```dart
// Inside your Flutter app
class AIService {
  late final Genkit _ai;
  late final dynamic _identificationFlow;

  AIService() {
    _ai = Genkit(plugins: [googleAI()]);
    _identificationFlow = _ai.defineFlow(
      name: 'identifyItem',
      inputSchema: ScanInput.$schema,
      outputSchema: ItemResult.$schema,
      fn: (input, _) async {
        final response = await _ai.generate(
          model: googleAI.gemini('gemini-2.5-flash'),
          prompt: [
             MediaPart(media: Media(url: 'data:image/jpeg;base64,${input.imageBase64}'),
            TextPart(text:'Identify and describe this item.'),
          ],
          outputSchema: ItemResult.$schema,
        );
        return response.output!;
      },
    );
  }
}
```

This works and is convenient for development. But it should never be shipped to production. The API key must be embedded in the application to make this work, and mobile applications can be decompiled. Anyone with enough motivation can extract the key from the binary.

For prototyping on your own device where you control the key, this is acceptable. For any published application, use one of the server-based patterns below.

### Pattern 2: Remote Models (Hybrid Approach)

This pattern separates the model calls onto a secure server while keeping the flow orchestration logic in the Flutter client.

You host a Genkit Shelf backend that exposes model endpoints. The Flutter app defines remote models that point to those endpoints. The Flutter code orchestrates the flow, but the actual model API calls happen on the server where the keys are kept.

::: tabs

@tab:active On the server (Dart with Shelf)

```dart
import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';
import 'package:genkit_shelf/genkit_shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as io;

void main() async {
  final ai = Genkit(plugins: [googleAI()]);

  final router = Router()
    ..all('/googleai/<path|.*>', serveModel(ai));

  await io.serve(router.call, '0.0.0.0', 8080);
}
```

@tab In the Flutter app

```dart
final ai = Genkit();  // No plugins needed on the client

final remoteGemini = ai.defineRemoteModel(
  name: 'remoteGemini',
  url: 'https://your-backend.com/googleai/gemini-2.5-flash',
);

final identificationFlow = ai.defineFlow(
  name: 'identifyItem',
  inputSchema: ScanInput.$schema,
  outputSchema: ItemResult.$schema,
  fn: (input, _) async {
    final response = await ai.generate(
      model: remoteGemini,
      prompt: [
         MediaPart(media: Media(url: 'data:image/jpeg;base64,${input.imageBase64}')),
        TextPart(text:'Identify this item.'),
      ],
      outputSchema: ItemResult.$schema,
    );
    return response.output!;
  },
);
```

:::

The Flutter app never touches the Gemini API key. All it knows is the URL of the model endpoint. The server holds the key and proxies the model calls.

### Pattern 3: Server-Side Flows (Most Secure)

This is the recommended architecture for production applications. The entire AI flow, prompts, model calls, tool use, and output schema lives on the server. The Flutter app is a thin client that sends a request and receives a typed response.

::: tabs

@tab:active On the server:

```dart
import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';
import 'package:genkit_shelf/genkit_shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as io;

void main() async {
  final ai = Genkit(plugins: [googleAI()]);

  final identificationFlow = ai.defineFlow(
    name: 'identifyItem',
    inputSchema: ScanInput.$schema,
    outputSchema: ItemResult.$schema,
    fn: (input, _) async {
      final response = await ai.generate(
        model: googleAI.gemini('gemini-2.5-flash'),
        prompt: [
          MediaPart(media: Media(url: 'data:image/jpeg;base64,${input.imageBase64}')),
          TextPart(text:'Identify and describe this item in detail.'),
        ],
        outputSchema: ItemResult.$schema,
      );
      return response.output!;
    },
  );

  final router = Router()
    ..post('/identifyItem', shelfHandler(identificationFlow));

  await io.serve(router.call, '0.0.0.0', 8080);
}
```

@tab In the Flutter app (using the shared schema package):

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'shared_schemas.dart';  // schemas shared between client and server

class IdentificationService {
  static Future<ItemResult> identifyItem(String base64Image) async {
    final request = ScanInput(imageBase64: base64Image);

    final httpResponse = await http.post(
      Uri.parse('https://your-backend.com/identifyItem'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'data': request.toJson()}),
    );

    final body = jsonDecode(httpResponse.body);
    return ItemResult.fromJson(body['result']);
  }
}
```

:::

Because both the server and the Flutter client are in Dart, you can keep `ScanInput` and `ItemResult` in a shared Dart package referenced by both. When the schema changes, you update it in one place and the compiler flags every mismatch on both sides.

---

## Deployment

One of the practical advantages of Genkit Dart is that Dart server applications have several mature deployment targets.

### Shelf

The `genkit_shelf` package integrates Genkit flows with the Shelf HTTP server library. `shelfHandler()` converts a Genkit flow into a Shelf request handler. You add it to a router and start a Shelf server. That's the entire deployment layer.

```dart
import 'package:genkit_shelf/genkit_shelf.dart';
import 'package:shelf_router/shelf_router.dart';
import 'package:shelf/shelf_io.dart' as io;

final router = Router()
  ..post('/api/identifyItem', shelfHandler(identificationFlow))
  ..post('/api/generateReport', shelfHandler(reportFlow));

await io.serve(router.call, '0.0.0.0', 8080);
```

Each flow becomes a POST endpoint. Clients send `{"data": {...}}` and receive `{"result": {...}}` with the typed output serialized to JSON.

### Cloud Run

Google Cloud Run is the most straightforward deployment target for Genkit Dart backends. You containerize the Shelf application with a Dockerfile, push the image to Google Container Registry or Artifact Registry, and deploy it to Cloud Run. Cloud Run handles scaling, HTTPS termination, and regional distribution.

```dockerfile
FROM dart:stable AS build
WORKDIR /app
COPY pubspec.* ./
RUN dart pub get
COPY . .
RUN dart compile exe bin/server.dart -o bin/server

FROM scratch
COPY --from=build /runtime/ /
COPY --from=build /app/bin/server /app/bin/server
EXPOSE 8080
CMD ["/app/bin/server"]
```

### Firebase

The Firebase plugin allows you to deploy Genkit flows as Firebase Cloud Functions. This is convenient if your application already uses Firebase for authentication, Firestore, or other services, since the AI flows live in the same project and benefit from the same IAM setup.

### AWS Lambda and Azure Functions

The framework also provides documentation for AWS Lambda and Azure Functions deployments, making it possible to host Genkit Dart backends in either of the major cloud ecosystems, depending on where your organization's infrastructure already lives.

---

## Observability and Tracing

Every flow execution in Genkit generates a trace. A trace is a structured record of everything that happened during the execution: the input received, every model call made, the exact prompt for each call, the exact response, token counts, latency at each step, and the final output.

In development, these traces are visible in the Developer UI's Traces tab. In production, you export them to Google Cloud Operations (formerly Stackdriver) using the `genkit_google_cloud` plugin, or to any OpenTelemetry-compatible backend.

```dart
import 'package:genkit_google_cloud/genkit_google_cloud.dart';

final ai = Genkit(plugins: [
  googleAI(),
  googleCloud(),  // Exports traces and metrics to Google Cloud
]);
```

With this configuration, every flow execution sends its trace data to Google Cloud. You can use Cloud Trace to visualize flow performance over time, identify bottlenecks, and correlate AI behavior with application-level metrics.

For production applications handling real users, this observability layer isn't optional. It's how you detect when a model change silently degrades the quality of your flows.

---

## Building a Real-Time Item Identification App

Before starting the project section, make sure you have the following in place.

### Dart SDK

You'll need Dart SDK 3.10.0 or later. If you have Flutter installed, check your Dart version with:

```sh
dart --version
```

If the version is below 3.10.0, update Flutter:

```sh
flutter upgrade
```

Flutter ships its own Dart SDK, so upgrading Flutter upgrades Dart as well.

### Flutter SDK

You'll need Flutter 3.22.0 or later. Verify with:

```sh
flutter --version
```

The project uses the `camera` plugin for image capture. That plugin requires at minimum Flutter 3.x and works on Android API 21 and above, iOS 11 and above.

### Genkit CLI

```sh
curl -sL cli.genkit.dev | bash
```

After installation, restart your terminal and verify:

```sh
genkit --version
```

### Gemini API Key

Go to [<VPIcon icon="fa-brands fa-google"/>`aistudio.google.com/apikey`](https://aistudio.google.com/apikey), sign in with a Google account, and generate a new API key. Copy it somewhere safe. You won't need a credit card for this. The Gemini API free tier is sufficient for building and testing the application.

Set the key as an environment variable:

```sh
export GEMINI_API_KEY=your_actual_key_here
```

For persistence across terminal sessions, add that line to your shell profile file (`~/.bashrc`, `~/.zshrc`, and so on).

### Assumed Knowledge

This part of the tutorial assumes you're comfortable with Dart's async/await syntax, that you've built at least one Flutter application before, and that you understand the concept of a widget tree. It doesn't assume any prior experience with AI APIs or LLMs. We'll introduce every AI-related concept as it appears.

The application we're building is called **LensID**. The user opens the app, points the camera at any object, taps a capture button, and receives a structured analysis of what the camera saw: the item name, the condition, usage type, and a confidence score.

![Image of the app](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/43939604-1b9a-4d19-920d-ba8c781ee8ed.png)

This covers the full stack of what Genkit Dart enables in a Flutter context: capturing device input, sending multimodal data to a model through a typed flow, and rendering structured typed output in the UI.

For this guide, the AI logic runs fully client-side to keep the project self-contained, since it's a learning exercise. In a shipped app, you would move the flow to a server following Pattern 3 described earlier.

### Project Structure

```sh title="file structure"
lens_id/
  lib/
    main.dart
    screens/
      camera_screen.dart
      result_screen.dart
      splash_screen.dart
    services/
      identification_service.dart
    models/
      scan_models.dart
      scan_models.g.dart
    widgets/
      result_card.dart
  pubspec.yaml
```

### Step 1: Create the Flutter Project

```sh
flutter create lens_id
cd lens_id
```

### Step 2: Add Dependencies

Open <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and update the `dependencies` and `dev_dependencies` sections:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  genkit: ^0.12.1
  genkit_google_genai: ^0.2.4
  camera: ^0.12.0+1
  permission_handler: ^12.0.1
  google_fonts: ^8.0.2
 image_picker: ^1.2.1
  

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.13.1
  schemantic: 0.1.1
```

Run the install:

```sh
flutter pub get
```

### Step 3: Configure Platform Permissions

#### Android (<VPIcon icon="fas fa-folder-open"/>`android/app/src/main/`<VPIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`):

Add these permissions inside the `<manifest>` tag, above `<application>`:

```xml title="android/app/src/main/AndroidManifest.xml"
<!-- Permissions -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Media/Storage permissions (Android 13+ granular permissions) -->
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<!-- Legacy storage permission for Android 12 and below -->
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />

<!-- Camera hardware feature (not required so app installs on all devices) -->
<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

Also, ensure the `minSdkVersion` in `android/app/build.gradle` is at least 21:

```groovy title="android/app/build.gradle"
defaultConfig {
    minSdkVersion 21
}
```

#### iOS (<VPIcon icon="fas fa-folder-open"/>`ios/Runner/`<VPIcon icon="iconfont icon-ios"/>`Info.plist`):

Add these keys inside the `<dict>` tag:

```xml title="ios/Runner/Info.plist"
<key>NSCameraUsageDescription</key>
<string>LensID needs camera access to scan and identify items.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>LensID needs access to your photo library to upload images for identification.</string>
```

### Step 4: Define the Data Schemas

Create <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`scan_models.dart`:

```dart title="lib/models/scan_models.dart"
import 'package:schemantic/schemantic.dart';

part 'scan_models.g.dart';

/// Input: image to analyze
@Schema()
abstract class $ScanRequest {
  @Field(description: 'Base64-encoded JPEG image of the item to identify')
  String get imageBase64;
}

/// Minimal output for a minimal UI
@Schema()
abstract class $ItemIdentification {
  /// Simple name only
  @Field(description: 'The name of the item')
  String get itemName;

  /// Short condition (keep it very simple)
  @Field(description: 'The condition of the item in a short phrase')
  String get condition;

  /// What it is used for (1 short line)
  @Field(description: 'What the item is used for in one short sentence')
  String get usage;

  /// Optional confidence (keep but do not overuse)
  @Field(
    description:
        'Confidence score between 0% and 100% representing certainty of identification',
  )
  double get confidenceScore;
}
```

This file defines the data contract for the LensID identification flow. The two `@Schema()` abstract classes control what goes into the AI and what comes out of it.

`$ScanRequest` represents the input. It tells the system that the only thing the model needs is a base64 encoded image. There's no extra metadata or complexity, just the image itself.

`$ItemIdentification` represents the output. It defines the exact structure the AI must return and enforces a minimal response. Instead of generating a detailed analysis, the model is limited to four fields which are itemName, condition, usage, and confidenceScore.

Each `@Field()` annotation includes a description, and these descriptions act as instructions that are sent directly to the model through Genkit. They guide how the model should fill each field and keep the output consistent.

The itemName field tells the model to return a simple and recognizable name rather than a long description. The condition field ensures the response stays short and clear, such as New or Worn. The usage field limits the output to one concise sentence explaining what the item is used for. The confidenceScore field defines the expected range and format so the model returns a consistent numeric value.

Because the schema is minimal and the descriptions are precise, the model has very little room to generate unnecessary information. This keeps the response clean, predictable, and aligned with the simple UI.

The `part 'scan_models.g.dart'` directive connects the generated code file to this file once the build runner creates it.

Now run the code generator:

```sh
dart run build_runner build --delete-conflicting-outputs
```

This creates <VPIcon icon="fas fa-folder-open"/>`lib/models/`<VPIcon icon="fa-brands fa-dart-lang"/>`scan_models.g.dart`, which contains the concrete `ScanRequest` and `ItemIdentification` classes with constructors, JSON serialization methods, and the `$schema` static properties that Genkit uses.

### Step 5: Create the Identification Service

Create <VPIcon icon="fas fa-folder-open"/>`lib/services/`<VPIcon icon="fa-brands fa-dart-lang"/>`identification_service.dart`:

```dart :collapsed-lines title="lib/services/identification_service.dart"
import 'dart:convert';
import 'dart:io';

import 'package:genkit/genkit.dart';
import 'package:genkit_google_genai/genkit_google_genai.dart';

import '../models/scan_models.dart';

/// Wraps the Genkit flow that sends an image to Gemini and returns
/// a structured [ItemIdentification] result.
class IdentificationService {
  late final Genkit _ai;
  late final Future<ItemIdentification> Function(ScanRequest) _identifyFlow;

  IdentificationService() {
    // Read the API key injected at build time via --dart-define.
    // Falls back to the GEMINI_API_KEY environment variable when running
    // with `dart run` or `genkit start`.
    const dartDefineKey = String.fromEnvironment('GEMINI_API_KEY');
    final apiKey = dartDefineKey.isNotEmpty
        ? dartDefineKey
        : Platform.environment['GEMINI_API_KEY'];

    _ai = Genkit(
      plugins: [
        googleAI(apiKey: apiKey),
      ],
    );

    // Define the flow once; it is reused for every scan.
    _identifyFlow = _ai.defineFlow(
      name: 'identifyItemFlow',
      inputSchema: ScanRequest.$schema,
      outputSchema: ItemIdentification.$schema,
      fn: _runIdentification,
    ).call;
  }

  /// Core flow logic: builds a multimodal prompt and calls Gemini 2.5 Flash.
  Future<ItemIdentification> _runIdentification(
    ScanRequest request,
    // ignore: avoid_dynamic_calls
    dynamic context,
  ) async {
    // Embed the image directly as a data URL — no storage upload needed.
    final imagePart = MediaPart(
      media: Media(
        url: 'data:image/jpeg;base64,${request.imageBase64}',
        contentType: 'image/jpeg',
      ),
    );

    // The text part sets the model's role and gives clear instructions.
    // Field descriptions in the schema reinforce these instructions.
    final instructionPart = TextPart(
      text: 'You are a product identification assistant. '
          'Carefully analyse the item in this image and provide a thorough '
          'identification based only on what is clearly visible. '
          'Do not invent brand names if none are legible.',
    );

    final response = await _ai.generate(
      model: googleAI.gemini('gemini-2.5-flash'),
      messages: [
        Message(
          role: Role.user,
          content: [imagePart, instructionPart],
        ),
      ],
      outputSchema: ItemIdentification.$schema,
    );

    if (response.output == null) {
      throw Exception(
        'Gemini did not return a valid structured response. '
        'Try again with a clearer, well-lit image.',
      );
    }

    return response.output!;
  }

  /// Public entry point: accepts a captured [File] and returns a typed result.
  Future<ItemIdentification> identifyFromFile(File imageFile) async {
    final bytes = await imageFile.readAsBytes();
    final base64Image = base64Encode(bytes);
    return _identifyFlow(ScanRequest(imageBase64: base64Image));
  }
}
```

This file defines the service that connects your Flutter app to the AI model using Genkit. It's responsible for taking an image, sending it to the model, and returning a structured result that matches your schema.

The `IdentificationService` class sets up a Genkit instance and prepares a reusable flow for identifying items. During initialization, it reads the API key either from a build-time value using `--dart-define` or from the environment. This makes it flexible for both local development and production use.

The `_identifyFlow` is defined once using `defineFlow`. It links the input schema and output schema to a function called `_runIdentification`. This ensures that every request going through the flow follows the exact structure defined in your models, which keeps the system consistent and predictable.

The `_runIdentification` method contains the core logic. It takes the base64 image from the request and embeds it directly into a data URL. This avoids the need to upload the image to external storage.

The image is then combined with a text instruction that tells the model how to behave. The instruction is simple and focused, guiding the model to analyze only what's visible and avoid making assumptions.

The request is sent to the Gemini model using Genkit’s `generate` method. The model processes both the image and the instruction together and returns a structured response that matches the `ItemIdentification` schema. Because the output schema is enforced, the response is automatically parsed into a typed object.

There's a safety check to ensure that the model actually returns a valid structured response. If it doesn't, an exception is thrown with a clear message so the app can handle the failure properly.

The `identifyFromFile` method is the public entry point used by your UI. It takes an image file, converts it into base64, and passes it into the flow. The result returned is already structured and ready to be displayed on your result screen.

Overall, this service acts as the bridge between your UI and the AI model, ensuring that images are processed correctly and that responses remain clean, structured, and aligned with your minimal design.

### Step 6: Build the Camera Screen

Create <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`camera_screen.dart`:

```dart title="lib/screens/camera_screen.dart"
import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

import '../services/identification_service.dart';
import 'result_screen.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen>
    with WidgetsBindingObserver {
  CameraController? _controller;
  List<CameraDescription> _cameras = [];
  bool _isCameraReady = false;
  bool _isCapturing = false;
  String? _initError;

  final _service = IdentificationService();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initCamera();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _controller?.dispose();
    super.dispose();
  }

  // Release and reclaim the camera when the app goes to the background.
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.inactive) {
      _controller?.dispose();
      if (mounted) setState(() => _isCameraReady = false);
    } else if (state == AppLifecycleState.resumed && _cameras.isNotEmpty) {
      _setupController(_cameras.first);
    }
  }

  Future<void> _initCamera() async {
    final status = await Permission.camera.request();
    if (!status.isGranted) {
      if (mounted) {
        setState(() =>
            _initError = 'Camera permission is required to identify items.\nYou can still upload images below.');
      }
      return;
    }

    try {
      _cameras = await availableCameras();
    } catch (e) {
      if (mounted) setState(() => _initError = 'Could not list cameras: $e\nYou can still upload images below.');
      return;
    }

    if (_cameras.isEmpty) {
      if (mounted) setState(() => _initError = 'No cameras found on device.\nYou can still upload images below.');
      return;
    }

    await _setupController(_cameras.first);
  }

  Future<void> _setupController(CameraDescription camera) async {
    await _controller?.dispose();

    final controller = CameraController(
      camera,
      ResolutionPreset.high,
      enableAudio: false,
      imageFormatGroup: ImageFormatGroup.jpeg,
    );

    try {
      await controller.initialize();
      _controller = controller;
      if (mounted) setState(() => _isCameraReady = true);
    } catch (e) {
      if (mounted) setState(() => _initError = 'Camera init failed: $e');
    }
  }

  Future<void> _captureAndIdentify() async {
    if (_isCapturing || !_isCameraReady) return;
    if (_controller == null || !_controller!.value.isInitialized) return;

    setState(() => _isCapturing = true);

    try {
      final xFile = await _controller!.takePicture();
      final imageFile = File(xFile.path);

      if (!mounted) return;
      _showLoadingDialog();

      final result = await _service.identifyFromFile(imageFile);

      if (!mounted) return;
      Navigator.of(context).pop(); // close loading dialog

      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => ResultScreen(
            imageFile: imageFile,
            identification: result,
          ),
        ),
      );
    } catch (error) {
      if (mounted && Navigator.of(context).canPop()) {
        Navigator.of(context).pop();
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Identification failed: $error'),
            backgroundColor: Colors.red.shade700,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isCapturing = false);
    }
  }

  Future<void> _pickImage() async {
    if (_isCapturing) return;

    final picker = ImagePicker();
    final xFile = await picker.pickImage(source: ImageSource.gallery);
    if (xFile == null) return;

    setState(() => _isCapturing = true);

    try {
      final imageFile = File(xFile.path);

      if (!mounted) return;
      _showLoadingDialog();

      final result = await _service.identifyFromFile(imageFile);

      if (!mounted) return;
      Navigator.of(context).pop(); // close loading dialog

      await Navigator.of(context).push(
        MaterialPageRoute(
          builder: (_) => ResultScreen(
            imageFile: imageFile,
            identification: result,
          ),
        ),
      );
    } catch (error) {
      if (mounted && Navigator.of(context).canPop()) {
        Navigator.of(context).pop();
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Identification failed: $error'),
            backgroundColor: Colors.red.shade700,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isCapturing = false);
    }
  }

  void _showLoadingDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => const Center(
        child: Card(
          margin: EdgeInsets.symmetric(horizontal: 48),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 32, vertical: 28),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CircularProgressIndicator(),
                SizedBox(height: 20),
                Text(
                  'Identifying item…',
                  style: TextStyle(fontSize: 16),
                ),
                SizedBox(height: 6),
                Text(
                  'Powered by Gemini',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Camera preview / error / loading 
          if (_initError != null)
            _ErrorPlaceholder(message: _initError!)
          else if (_isCameraReady && _controller != null)
            CameraPreview(_controller!)
          else
            const _LoadingPlaceholder(),

          // Viewfinder corners with scanning line
          if (_isCameraReady) const _ViewfinderCorners(),

          // Bottom Controls
          Positioned(
            bottom: 40,
            left: 0,
            right: 0,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                _CaptureButton(
                  isCapturing: _isCapturing,
                  enabled: _isCameraReady && !_isCapturing,
                  onTap: _captureAndIdentify,
                ),
                const SizedBox(height: 16),
                GestureDetector(
                  onTap: _pickImage,
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.upload_rounded, color: Colors.white60, size: 16),
                      SizedBox(width: 4),
                      Text(
                        'UPLOAD',
                        style: TextStyle(
                          color: Colors.white60,
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 1.0,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Supporting widgets

class _LoadingPlaceholder extends StatelessWidget {
  const _LoadingPlaceholder();

  @override
  Widget build(BuildContext context) => const Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(color: Colors.white54),
          SizedBox(height: 16),
          Text('Starting camera…',
              style: TextStyle(color: Colors.white54, fontSize: 14)),
        ],
      );
}

class _ErrorPlaceholder extends StatelessWidget {
  final String message;
  const _ErrorPlaceholder({required this.message});

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.camera_alt_outlined,
                color: Colors.white38, size: 64),
            const SizedBox(height: 20),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white70, fontSize: 15),
            ),
            const SizedBox(height: 24),
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: const BorderSide(color: Colors.white38),
              ),
              onPressed: () => openAppSettings(),
              child: const Text('Open Settings'),
            ),
          ],
        ),
      );
}

class _ViewfinderCorners extends StatelessWidget {
  const _ViewfinderCorners();

  @override
  Widget build(BuildContext context) {
    const size = 48.0;
    const thickness = 2.0;
    const color = Color(0xFFD67123);

    Widget corner({required bool top, required bool left}) {
      return Positioned(
        top: top ? 0 : null,
        bottom: top ? null : 0,
        left: left ? 0 : null,
        right: left ? null : 0,
        child: SizedBox(
          width: size,
          height: size,
          child: CustomPaint(
            painter: _CornerPainter(
                top: top, left: left, color: color, thickness: thickness),
          ),
        ),
      );
    }

    final screenSize = MediaQuery.of(context).size;
    final boxSize = screenSize.width * 0.75;
    final offsetX = (screenSize.width - boxSize) / 2;
    final offsetY = (screenSize.height - boxSize) / 2 - 40;

    return Positioned(
      left: offsetX,
      top: offsetY,
      width: boxSize,
      height: boxSize,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          corner(top: true, left: true),
          corner(top: true, left: false),
          corner(top: false, left: true),
          corner(top: false, left: false),
          // Scanner line
          const Positioned.fill(
            child: _ScannerLine(),
          ),
        ],
      ),
    );
  }
}

class _CornerPainter extends CustomPainter {
  final bool top;
  final bool left;
  final Color color;
  final double thickness;

  const _CornerPainter({
    required this.top,
    required this.left,
    required this.color,
    required this.thickness,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = thickness
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.square;

    final path = Path();
    final h = size.height;
    final w = size.width;

    if (top && left) {
      path.moveTo(0, h);
      path.lineTo(0, 0);
      path.lineTo(w, 0);
    } else if (top && !left) {
      path.moveTo(0, 0);
      path.lineTo(w, 0);
      path.lineTo(w, h);
    } else if (!top && left) {
      path.moveTo(0, 0);
      path.lineTo(0, h);
      path.lineTo(w, h);
    } else {
      path.moveTo(0, h);
      path.lineTo(w, h);
      path.lineTo(w, 0);
    }

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(_CornerPainter old) => false;
}

class _ScannerLine extends StatefulWidget {
  const _ScannerLine();

  @override
  State<_ScannerLine> createState() => _ScannerLineState();
}

class _ScannerLineState extends State<_ScannerLine>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Align(
          alignment: Alignment(0, -1.0 + (_controller.value * 2.0)),
          child: Container(
            height: 2,
            width: double.infinity,
            decoration: BoxDecoration(
              color: const Color(0xFFD67123),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFFD67123).withAlpha(120),
                  blurRadius: 10,
                  spreadRadius: 2,
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _CaptureButton extends StatelessWidget {
  final bool isCapturing;
  final bool enabled;
  final VoidCallback onTap;

  const _CaptureButton({
    required this.isCapturing,
    required this.enabled,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: enabled ? onTap : null,
      child: Container(
        width: 80,
        height: 80,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: Colors.transparent,
          border: Border.all(
            color: Colors.white.withAlpha(150),
            width: 3,
          ),
        ),
        child: Center(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            width: isCapturing ? 40 : 64,
            height: isCapturing ? 40 : 64,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: Color(0xFFBA2226),
            ),
            child: isCapturing
                ? const Center(
                    child: SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.0,
                        color: Colors.white,
                      ),
                    ),
                  )
                : null,
          ),
        ),
      ),
    );
  }
}
```

This screen handles the full camera lifecycle. The `WidgetsBindingObserver` mixin lets the widget respond to app lifecycle events so the camera is properly released when the app goes to the background and re-initialized when it comes back. This prevents camera resource conflicts on Android.

`_initializeCamera()` requests permission through `permission_handler` before trying to access the camera. Attempting camera access without permission on iOS causes an unrecoverable crash. On Android it causes a silent failure. The explicit permission request with user-facing error handling produces a professional experience.

`CameraController` is initialized with `ResolutionPreset.high` and <VPIcon icon="fas fa-file-image"/>`ImageFormatGroup.jpeg`. High resolution gives the model more detail to work with during identification. JPEG format is specified because that's what the model receives through the `data:image/jpeg;base64,...` URL format in the service.

`_captureAndIdentify()` takes the picture, shows a loading dialog, calls the service, navigates to the result screen, and handles errors. The `try / catch / finally` structure ensures that `_isCapturing` is always reset to `false` regardless of whether the flow succeeded or threw an exception.

### Step 7: Build the Result Screen

Create <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`result_screen.dart`:

```dart :collapsed-lines title="lib/screens/result_screen.dart"
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../models/scan_models.dart';

class ResultScreen extends StatelessWidget {
  final File imageFile;
  final ItemIdentification identification;

  const ResultScreen({
    super.key,
    required this.imageFile,
    required this.identification,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top Image
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: AspectRatio(
                        aspectRatio: 1.0,
                        child: ClipRRect(
                          borderRadius: BorderRadius.zero,
                          child: Image.file(
                            imageFile,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),

                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 24.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 8),
                          // Subtitle
                          Text(
                            'IDENTIFIED_ASSET',
                            style: GoogleFonts.rajdhani(
                              color: const Color(0xFFDA292E),
                              fontSize: 10,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 1.5,
                            ),
                          ),
                          const SizedBox(height: 4),

                          // Main Title
                          Text(
                            identification.itemName.toUpperCase(),
                            style: GoogleFonts.bebasNeue(
                              color: Colors.black,
                              fontSize: 32,
                              fontWeight: FontWeight.w900,
                              fontStyle: FontStyle.italic,
                              height: 1.0,
                              letterSpacing: -1.0,
                            ),
                          ),
                          const SizedBox(height: 40),

                          // Condition & Usage Type
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'CONDITION',
                                      style: GoogleFonts.rajdhani(
                                        color: Colors.grey,
                                        fontSize: 10,
                                        fontWeight: FontWeight.w800,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      identification.condition.toUpperCase(),
                                      style: GoogleFonts.rajdhani(
                                        color: Colors.black,
                                        fontSize: 13,
                                        fontWeight: FontWeight.w900,
                                        height: 1.2,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 16),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'USAGE_TYPE',
                                      style: GoogleFonts.rajdhani(
                                        color: Colors.grey,
                                        fontSize: 10,
                                        fontWeight: FontWeight.w800,
                                        letterSpacing: 1.0,
                                      ),
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      identification.usage.toUpperCase(),
                                      style: GoogleFonts.rajdhani(
                                        color: Colors.black,
                                        fontSize: 13,
                                        fontWeight: FontWeight.w900,
                                        height: 1.2,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 32),

                          // Confidence Rating
                          Text(
                            'CONFIDENCE_RATING',
                            style: GoogleFonts.rajdhani(
                              color: Colors.grey,
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              letterSpacing: 1.0,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(
                                '${(identification.confidenceScore * 100).toStringAsFixed(2)}%',
                                style: GoogleFonts.bebasNeue(
                                  color: Colors.black,
                                  fontSize: 36,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: -1.0,
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Container(
                                  height: 2,
                                  color: const Color(0xFFDA292E),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            // Bottom Button
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 8, 24, 24),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDA292E),
                    foregroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.zero,
                    ),
                    elevation: 0,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'SCAN ANOTHER ASSET',
                        style: GoogleFonts.rajdhani(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 1.5,
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Icon(Icons.arrow_forward_rounded, size: 20),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

The result screen is a pure display component. It receives two things from the camera screen, which are the captured `File` and the typed `ItemIdentification` object. No API calls happen here and no async work is performed. The screen simply renders the structured data returned from the flow.

The entire UI reads directly from the typed identification object. `identification.itemName`, `identification.condition`, `identification.usage`, and `identification.confidenceScore` are all strongly typed values. There's no need for casting, manual parsing, or defensive checks around missing fields.

Because the schema was intentionally kept minimal, the UI stays simple as well. Each field maps directly to a visible element on the screen without any transformation or extra logic. The image is shown at the top, followed by the item name, condition, usage, and confidence score.

This is the practical payoff of using schemantic. The data that leaves the AI flow as a structured object arrives in the UI in the same form. There is no gap between the model response and the UI layer. The result is a clean, predictable, and fully type safe rendering pipeline.

### Step 8: Wire up the splash screen and <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

Update <VPIcon icon="fas fa-folder-open"/>`lib/screens/`<VPIcon icon="fa-brands fa-dart-lang"/>`splash_screen.dart`:

```dart title="lib/screens/splash_screen.dart"
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:permission_handler/permission_handler.dart';

import 'camera_screen.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF041926),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: Center(
                child: Text(
                  'LENSID',
                  style: GoogleFonts.bebasNeue(
                    color: Colors.white,
                    fontSize: 48,
                    fontWeight: FontWeight.w900,
                    letterSpacing: -2.0,
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () async {
                    await Permission.camera.request();
                    if (!context.mounted) return;
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                        builder: (_) => const CameraScreen(),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDA292E),
                    foregroundColor: Colors.white,
                    shape: const RoundedRectangleBorder(
                      borderRadius: BorderRadius.zero,
                    ),
                    elevation: 0,
                  ),
                  child: Text(
                    'START',
                    style: GoogleFonts.rajdhani(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.2,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

The splash screen is the entry point of the app and is intentionally kept minimal. It serves one purpose: to move the user into the scanning experience as quickly as possible.

The layout is built using a `Column` with two main sections. The top section centers the app name “LENSID” using a custom font, which gives it a strong visual identity without adding extra UI elements. The bottom section contains a single full-width button labeled “START”.

When the user taps the button, the app requests camera permission using `permission_handler`. This ensures that by the time the user reaches the next screen, the camera is already accessible. After requesting permission, the app navigates to the camera screen using `pushReplacement`, which removes the splash screen from the navigation stack so the user can't return to it.

Update `lib/main.dart`:

```dart :collapsed-lines title="lib/main.dart"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock to portrait orientation so the camera UI always looks correct.
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
  ]);

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
    ),
  );

  runApp(const LensIDApp());
}

class LensIDApp extends StatelessWidget {
  const LensIDApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LensID',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF041926),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFFDA292E),
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
        snackBarTheme: const SnackBarThemeData(
          behavior: SnackBarBehavior.floating,
        ),
      ),
      home: const SplashScreen(),
    );
  }
}
```

`WidgetsFlutterBinding.ensureInitialized()` is required before the first frame when your app's initialization code uses platform channels, which the camera plugin does. Calling `runApp()` without this on older Flutter versions causes cryptic errors.

### Step 9: Run the App

Set your API key if you haven't already:

```sh
export GEMINI_API_KEY=your_key_here
```

For Flutter, pass the key as a dart-define so it's available to the running process:

```sh
flutter run --dart-define=GEMINI_API_KEY=$GEMINI_API_KEY
```

Update `identification_service.dart` to read the key from the dart-define:

```dart
import 'package:flutter/foundation.dart';

// Replace:
_ai = Genkit(plugins: [googleAI()]);

// With:
const apiKey = String.fromEnvironment('GEMINI_API_KEY');
_ai = Genkit(plugins: [googleAI(apiKey: apiKey.isEmpty ? null : apiKey)]);
```

When `apiKey` is not provided, `googleAI()` falls back to the `GEMINI_API_KEY` environment variable, which works during development. The `String.fromEnvironment` approach works for both dev and production builds.

### Step 10: Test with the Developer UI

While developing, you can test the identification flow without needing the camera at all. Start the Developer UI:

```sh
genkit start:flutter -- -d chrome
```

Open `http://localhost:4000`. Find `identifyItemFlow` in the sidebar. In the Run tab, provide a base64-encoded test image and click Run. The flow executes and you see the `ItemIdentification` result as structured JSON in the output panel. The trace panel shows the exact multimodal prompt sent to the model, the response received, and the token count.

This is how you iterate on the quality of your identifications: adjust the field descriptions in <VPIcon icon="fa-brands fa-dart-lang"/>`scan_models.dart`, re-run the build runner, test in the Developer UI, check the trace. No device needed, no app restart required.

::: info Screenshots

![Splash Screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/61153023-e0e2-4930-8ea8-70eea94437b1.png)

![Capture/Scan Screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/f54f6eff-a2ed-470f-a149-0c9a14454cc1.png)

![Result Screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/aa12dc27-f3fd-4416-bb16-244cb578259d.png)

:::

::: info Github Repo

<SiteInfo
  name="Atuoha/lens_id_genkit_dart"
  desc="Article Demo App for demonstrating Genkit Dart. https://freecodecamp.org/news/how-to-build-ai-powered-flutter-applications-with-genkit-dart-handbook-for-devs/"
  url="https://github.com/Atuoha/lens_id_genkit_dart/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5dae3448a383931337231003dc0d6d66a6b292a7ec31289fa8d0752e527a4082/Atuoha/lens_id_genkit_dart"/>

:::

::: info Architectural Diagram

![Architectural Diagram](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/29196df9-09aa-4395-8f04-212b0628afc6.png)

Data flows from the device camera to a file, is encoded as base64, wrapped in a typed `ScanRequest`, sent through a Genkit flow to the Gemini model, and returns as a fully typed `ItemIdentification` that the UI renders directly.

:::

---

## Where Genkit Dart Is Headed

Genkit Dart is currently in preview, which means it's actively being developed and some APIs are subject to change before a stable release. But even in preview, the fundamentals are solid enough to build real applications.

The trajectory points in a few clear directions:

1. Multi-agent support, already present in the TypeScript version, is coming to Dart. This means flows that spawn sub-agents, delegate tasks to specialized sub-flows, and coordinate multiple model calls toward a single complex goal.
2. RAG (retrieval-augmented generation) support through vector database plugins like Pinecone, Chroma, and pgvector is already listed in the documentation and will allow Flutter applications to build document-aware AI features with a consistent API.
3. Model Context Protocol support in Genkit Dart will allow models to connect to external tools and data sources using the emerging MCP standard. This is important because MCP is becoming a common integration layer between AI models and developer tools. Genkit's MCP support means those integrations become accessible in your Dart flows without building custom adapters.
4. On the Flutter side, the streaming story will become more refined. Patterns for updating Flutter UI in real time as a flow streams its output are emerging in the community. Genkit's native streaming support, combined with Flutter's reactive widget model, creates a genuinely good foundation for typewriter-style AI UI patterns.

The advice at this stage is to build with Genkit Dart now for learning and internal tools. Follow the framework's development through the official Genkit Discord and GitHub repository. By the time a stable release lands, you'll have genuine hands-on experience rather than theoretical knowledge.

---

## Conclusion

Genkit Dart isn't just a client library for calling AI models from Flutter. It's a framework that changes how you think about building AI features into applications.

It gives you a consistent, provider-agnostic model interface so that switching between Gemini, Claude, GPT-4o, Grok, or a local Ollama model is a one-line change. It gives you flows as the structured, observable, deployable unit of AI logic. It gives you schemantic-powered type safety so your AI outputs are real Dart objects, not loosely typed maps. It gives you a visual developer UI so you can test and trace your flows without writing test scaffolding. And it gives you a deployment path from localhost to a production server with minimal ceremony.

For Flutter developers specifically, the dual-runtime nature of Dart makes Genkit uniquely powerful. Your AI logic can live in a Shelf backend or in your Flutter client, and because both sides are Dart, they share schemas, types, and mental models. The complexity that comes from maintaining separate server and client representations of the same data disappears.

There has never been a better time to start building AI-powered applications with Dart and Flutter. The tooling is here. The framework is here. The model ecosystem is richer than it has ever been. Genkit Dart brings all of it together in a way that's idiomatic, type-safe, and genuinely a pleasure to work with.

---

## References

### Official Documentation & Core Resources

<SiteInfo
  name="Get started with Genkit"
  desc="Learn how to get started with Genkit, including project setup, installing packages, configuring API keys, creating your first flow, and testing in the Developer UI."
  url="https://genkit.dev/docs/dart/get-started/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="genkit-ai/genkit-dart"
  desc="Genkit for Dart and Flutter."
  url="https://github.com/genkit-ai/genkit-dart/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bc41bb8a16aa39b2fe0046217b0f88700b0b091574b8b939b231f21d8c8ca7ef/genkit-ai/genkit-dart"/>

<SiteInfo
  name="genkit | Dart package"
  desc="Genkit Dart package, a Generative AI library for pure Dart client/server and Flutter apps."
  url="https://pub.dev/packages/genkit/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

### Packages & Plugins

<SiteInfo
  name="schemantic | Dart package"
  desc="A general-purpose builder for generating type-safe data classes and JSON schemas from abstract definitions."
  url="https://pub.dev/packages/schemantic/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="genkit_google_genai | Dart package"
  desc="Google AI plugin for Genkit Dart."
  url="https://pub.dev/packages/genkit_google_genai/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="camera | Flutter package"
  desc="A Flutter plugin for controlling the camera. Supports previewing the camera feed, capturing images and video, and streaming image buffers to Dart."
  url="https://pub.dev/packages/camera/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="permission_handler | Flutter package"
  desc="Permission plugin for Flutter. This plugin provides a cross-platform (iOS, Android) API to request and check permissions."
  url="https://pub.dev/packages/permission_handler/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

### Framework Integrations

<SiteInfo
  name="Shelf integration"
  desc="Learn how to integrate Genkit with Shelf applications for Dart, including manual route handling, authentication, and deployment."
  url="https://genkit.dev/docs/dart/frameworks/shelf/"
  logo="https://pub.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="Flutter integration"
  desc="Learn how to use Genkit within your Flutter applications."
  url="https://genkit.dev/docs/dart/frameworks/flutter/"
  logo="https://pub.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

### Core Concepts & Guides

<SiteInfo
  name="Tool calling"
  desc="Learn how to enable LLMs to interact with external applications and data using Genkit's tool calling feature, covering tool definition, usage, and advanced scenarios."
  url="https://genkit.dev/docs/dart/tool-calling/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="Defining AI workflows"
  desc="Learn how to define and manage AI workflows in Genkit using flows, which provide type safety, integration with the developer UI, and simplified deployment."
  url="https://genkit.dev/docs/dart/flows/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="Generating content with AI models"
  desc="Learn how to generate content with AI models using Genkit's unified interface, covering basic usage, configuration, structured output, streaming, and multimodal input/output."
  url="https://genkit.dev/docs/dart/models/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="Get started with Genkit Monitoring"
  desc="This quickstart guide explains how to set up Genkit Monitoring for your deployed Genkit features to collect and view real-time telemetry data, including metrics, traces, and production trace exports for evaluations."
  url="https://genkit.dev/docs/js/observability/getting-started/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

### AI Providers & Integrations

<SiteInfo
  name="Anthropic plugin"
  desc="Learn how to configure and use the Genkit Anthropic plugin to access Claude models."
  url="https://genkit.dev/docs/js/integrations/anthropic/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="OpenAI plugin"
  desc="Learn how to configure and use the Genkit OpenAI plugin to access models and embedders from OpenAI."
  url="https://genkit.dev/docs/js/integrations/openai/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="Ollama plugin"
  desc="Learn how to configure and use the Ollama plugin for Genkit to interact with local LLMs and embedders."
  url="https://genkit.dev/docs/js/integrations/ollama/"
  logo="/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="AWS Bedrock plugin"
  desc="Learn how to configure and use the AWS Bedrock plugin for Genkit to interact with AWS Bedrock models and embedders."
  url="https://genkit.dev/docs/js/integrations/aws-bedrock/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="xAI plugin"
  desc="Learn how to configure and use the Genkit xAI plugin to access xAI (Grok) models."
  url="https://genkit.dev/docs/js/integrations/xai/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

<SiteInfo
  name="DeepSeek plugin"
  desc="Learn how to configure and use the Genkit DeepSeek plugin to access DeepSeek models."
  url="https://genkit.dev/docs/js/integrations/deepseek/"
  logo="https://genkit.dev/favicon.ico"
  preview="https://genkit.dev/ogimage.png?v=1"/>

### Developer Tools

<SiteInfo
  name="Google AI Studio"
  desc="The fastest path from prompt to production with Gemini"
  url="https://aistudio.google.com/"
  logo="https://gstatic.com/aistudio/ai_studio_favicon_2_256x256.png"
  preview="https://ai.google.dev/static/site-assets/images/share-ais-03.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI-Powered Flutter Applications with Genkit Dart – Full Handbook for Devs",
  "desc": "There's a particular kind of frustration that every mobile developer has felt at some point. You're building a Flutter application, and you want to add an AI feature. Perhaps it's something that reads",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-powered-flutter-applications-with-genkit-dart-handbook-for-devs/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
