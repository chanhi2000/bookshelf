---
lang: en-US
title: "How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC"
description: "Article(s) > How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC"
    - property: og:description
      content: "How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-neural-machine-translation-works-build-your-own-translation-app-with-react-native-and-qvac.html
prev: /programming/js-react/articles/README.md
date: 2026-07-18
isOriginal: false
author:
  - name: Jibril-M🍀
    url: https://freecodecamp.org/news/author/djibrilm/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/89b0a610-cd98-4112-95cc-fb01597911dc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
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
  name="How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC"
  desc="For the past 10 years, we've experienced a massive improvement in translation technologies. We went from robotic-like translations to systems that not only understand the meaning of each word in a sen"
  url="https://freecodecamp.org/news/how-neural-machine-translation-works-build-your-own-translation-app-with-react-native-and-qvac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/89b0a610-cd98-4112-95cc-fb01597911dc.png"/>

For the past 10 years, we've experienced a massive improvement in translation technologies. We went from robotic-like translations to systems that not only understand the meaning of each word in a sentence, but also how the word fits into the context of the full sentence.

For instance, current translation systems know how to differentiate the meaning of "bank" in a sentence like:

> "I can't make the bank deposit today," and "We shall meet near the river bank."

Both sentences have "bank" in them, but with different meanings.

So how did we get here? This huge revolution started back in June of 2017 when a team of 8 Google researchers, notoriously known as the "8 Samurai," released a research paper titled [<VPIcon icon="iconfont icon-arxiv"/>"Attention Is All You Need"](https://arxiv.org/abs/1706.03762). This date marked a turning point in modern AI systems and architecture.

For context, this framework is the bedrock of current LLMs like ChatGPT and all large language models.

*The 8 Google researchers who created the Transformer architecture*

![The 8 Google researchers who created the Transformer architecture](https://cdn.hashnode.com/uploads/covers/68e4f3e9867c1707d1b057a9/3826d677-eee8-41bf-ae03-9ab6e805e6f6.png)

So, what is NMT, and how were Google engineers able to develop a framework that enables machines to understand the semantic meaning of each word in a sentence?

---

## Demystifying NMT: The Brain Behind the Screen

To understand this breakthrough, we first have to pull back the curtain on what **NMT** (Neural Machine Translation) actually means.

For decades, computer translation was "rule-based." The computer was essentially given a massive bilingual dictionary and a set of grammar rules. It would translate a sentence word-by-word, swap a few positions around, and hope for the best.

This is why early translations felt so incredibly stiff and robotic: the computer was trying to solve language like a math problem.

NMT changed the game by introducing **Neural Networks**, computer systems inspired by the human brain. Instead of memorizing strict rules, an NMT system learns by looking at millions of existing human translations. It looks at how humans translate phrases, captures patterns, and learns how words actually interact in the real world.

But even early NMT systems had a massive flaw: they read sentences sequentially, from left to right. If a sentence was too long, the system would "forget" how it started by the time it reached the end.

This is where the Google researchers made their historic leap.

---

## How the Transformer Sees the World

The "Attention Is All You Need" paper solved the memory problem by introducing a brand-new architecture called the **Transformer**. Instead of reading a sentence word-by-word, the Transformer reads the entire sentence all at once.

To do this, it splits the job into two main parts: the Encoder and the Decoder.

### The Encoder (The Reader)

Think of the Encoder as a highly analytical reader. When you feed a sentence into the system, the Encoder’s job is to read it and build a "mental map" of what the sentence actually means.

It does this using a mechanism called **Self-Attention**. You can think of Self-Attention as a series of spotlights. When the computer looks at a specific word, it shines spotlights on all the other words in the sentence to see how they relate.

Going back to our earlier example:

> "We shall meet near the river bank."

When the Encoder processes the word **"bank,"** its Self-Attention spotlight instantly flags the word **"river."** Because those two words are highly connected on the AI's mental map, the system immediately knows we're talking about land next to water, not a financial institution. It locks in this "semantic meaning" before moving to the next step.

### The Decoder (The Writer)

Once the Encoder has mapped out the true meaning of the sentence, it hands this blueprint over to the **Decoder**.

The Decoder is the writer. Its only job is to translate that blueprint into the target language. But it doesn't just output a pre-written template. It builds the new sentence word-by-word, constantly looking back at the Encoder's blueprint (using a trick called **Cross-Attention**) to make sure it maintains the correct context, tone, and grammar.

If it's translating our river bank sentence into French, it knows to write *"la rive"* (the bank of the river) instead of *"la banque"* (the financial bank), because the Encoder's blueprint warned it ahead of time.

---

## Why This Matters

By teaching machines to look at the whole picture rather than individual words, Google’s engineers didn't just build a better translator. They built a system that finally understands the nuances, idioms, and context of human language.

And as it turns out, if an AI can understand the context of a sentence well enough to translate it, it can also use that same context to write essays, answer complex questions, and code. The 2017 translation engine accidentally became the foundation of the entire AI era.

---

## The Democratization of AI

A few years after the Transformer's invention, building with it was strictly a toy for the rich. If you wanted to implement even a simple translation feature, you had to pay Big Tech giants like Google a fortune once you went beyond their tiny free tier.

Trying to bypass their dominance was almost impossible because there were practically no resources for independent developers. Back then, just understanding the basic math of a Transformer required an academic PhD. Without a massive research department at your back, trying to build your own solution from scratch was an incredibly expensive nightmare.

Thankfully, the open-source developer community has worked tirelessly to democratize access to AI. Today, we have incredibly powerful models that anyone can download and use freely.

On top of that, the processors in our personal devices have become exceptionally capable. This hardware evolution means that sophisticated AI models can now run locally directly on your smartphone, ensuring maximum data privacy and removing the dependency on external servers.

As the saying goes, *"Today it needs a full building to function, tomorrow it will fit in your pocket."* Of course, I totally made that quote up 😅, but you get my point!

To put this in action, we'll build a mobile application with Expo and QVAC that translates English to French.

---

## What is QVAC?

QVAC (QuantumVerse Automatic Computer) is a decentralized, local-first AI development platform and SDK created by Tether.

Unlike traditional AI tools that require cloud connectivity, QVAC allows users to run AI models entirely on their own devices. By keeping the computation local and offline, it ensures your data remains private, secure, and entirely under your control.

### Key Concepts for On-Device Translation

To understand how QVAC runs on a mobile device, we must keep a few key concepts in mind:

#### 1. On-Device Inference:

Running model calculations locally. Rather than relying on a single engine or cloud API, QVAC supports specialized local inference backends depending on the task.

For translation, it uses the Bergamot engine under the hood. These engines memory-map quantized model weights directly into the device's RAM and run calculations using native hardware acceleration.

#### 2. Quantization

A mathematical optimization technique that compresses the model's weights. This makes it possible for models to fit into the memory constraints of consumer mobile hardware while keeping output quality high.

---

## The Architecture Supported by QVAC

Before writing code, it's crucial to understand what's actually happening under the hood. To handle local execution without melting your device, the QVAC SDK manages the hardware binding and model lifecycle while hooking into optimized inference backends.

For translation, QVAC utilizes the Bergamot engine. Originally developed as part of the Bergamot project (which powers Firefox's offline translation), this engine is highly optimized for fast, accurate Neural Machine Translation (NMT) on consumer hardware.

At its core, the Bergamot engine takes a source sentence, processes it through its Encoder-Decoder transformer architecture, and predicts the target language tokens in a highly efficient manner.

### Understanding Language Pairs

It's important to understand the mechanics of how these models are trained. Translation models like the ones used by Bergamot are strictly unidirectional language pairs. This means the `BERGAMOT_EN_FR` model is designed exclusively to translate from English to French. It can't reverse the process.

If you want to translate French back to English, you would need to download and load a completely separate model trained specifically for that direction.

If a model is trained to be bidirectional (English ↔ French) or multilingual (translating dozens of languages like large language models do), it has to store mathematical representations, vocabulary, and grammar rules for multiple linguistic directions inside a single neural network. This balloons the parameter count, making the file size massive and requiring heavy RAM and compute power to process.

By isolating the task to a single direction (for example `BERGAMOT_EN_FR`), the model only needs the neural network to "understand" English inputs and "generate" French outputs. It doesn't need the capacity to generate English text.

This extreme specialization is exactly how Bergamot shrinks the model weights down to those incredibly tiny 15–35MB files that can run instantly on a local CPU without freezing your browser.

---

## The Inference Pipeline

To visualize how we interact with the translation engine in our codebase, think of local translation as running a dedicated interpreter right in your phone's memory:

1. **Hiring the interpreter (loading the model):** We map the compressed model file (in this case, the `BERGAMOT_EN_FR` English-to-French model) directly into the device's RAM.
2. **Handing over the script (text input):** We pass the source text to the loaded engine.
3. **The performance (inference):** The engine reads the text and mathematically predicts the translated tokens, providing the translated result once the process is complete.
4. **Closing the show (unloading):** Because neural network models are memory-intensive, the model can be cleared from RAM to free up resources once the translation is complete or when the user leaves the screen.

---

## Setting Up the Project

To ensure this guide is completely self-contained, let's start by quickly generating our new Expo application and installing the QVAC SDK. Open your terminal and run the following commands:

```sh
npx create-expo-app translator-app --template blank-typescript
cd translator-app
npm install @qvac/sdk jiti
```

Next, you need to add the following peer dependencies to your `package.json` for QVAC to work correctly. Add these lines to their respective sections:

```json
  "dependencies": {
    "bare-rpc": "^1.0.0",
    "react-native-bare-kit": "^0.11.5"
  },
  "devDependencies": {
    "bare-pack": "^1.5.1"
  }
```

Once added, install the dependencies by running:

```sh
npm install
npx expo install expo-file-system expo-build-properties expo-device
```

### Configuring the Expo Plugin with JITI

Next, we need to add the QVAC SDK plugin to our Expo project. Because the QVAC SDK's Expo plugin is distributed as a modern ECMAScript Module (ESM), but Expo's configuration file (`app.config.js`) runs in a standard Node.js CommonJS environment, we can't use a standard `require()`.

This is why we installed `jiti`. It acts as a bridge, allowing us to synchronously load ESM modules inside CommonJS files without breaking the build process.

Create or update your `app.config.js` file at the root of your project and configure it like this:

```js
const createJiti = require("jiti");
const jiti = createJiti(__filename);

// Synchronously require the ESM module using jiti
const qvacModule = jiti("@qvac/sdk/expo-plugin");
const withQvacSDK = qvacModule.withQvacSDK || qvacModule.default;

// (Include your withEscapeBundleShellScript helper if needed)

module.exports = ({ config }) => {
  config.plugins = [
    [
      "expo-build-properties",
      {
        android: { minSdkVersion: 29 },
      },
    ],
    withQvacSDK,
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
      },
    ],
    withEscapeBundleShellScript, // Custom helper if applicable
  ];

  return config;
};
```

This configuration applies the QVAC native setup scripts and ensures Android requires at least SDK version 29 (which is necessary for the native libraries).

With our base configuration ready to go, let's jump straight into the translation code.

---

## Complete Implementation

Let's bring it all together. We'll implement an interface that takes English text, manages the downloading and loading states for the Bergamot engine, translates the text to French, and renders the output to the screen.

Replace your entry app file <VPIcon icon="fas fa-folder-open"/>`src/app/`<VPIcon icon="fa-brands fa-react"/>`index.tsx` with the following implementation:

```tsx :collapsed-lines title="app/index.tsx"
import { View, ScrollView, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  loadModel,
  translate,
  unloadModel,
  BERGAMOT_EN_FR,
  getModelInfo,
} from "@qvac/sdk";
import { Stack } from "expo-router";

type TranslationStatus =
  | "Idle"
  | "Checking model..."
  | "Downloading model..."
  | "Model downloaded successfully."
  | "Loading model..."
  | "Translating..."
  | "Streaming translation..."
  | "Translation finished."
  | `Error: ${string}`;

export default function HomeScreen() {
  const [status, setStatus] = useState<TranslationStatus>("Checking model...");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean | null>(null);
  const [downloadProgressStr, setDownloadProgressStr] = useState<string>("");

  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        const model = await getModelInfo({ name: BERGAMOT_EN_FR.name });
        setIsDownloaded(model.isCached);
        console.log("Model", model);
        setStatus("Idle");
      } catch (error) {
        console.error("Error checking model:", error);
        setStatus("Error: Failed to check model status");
      }
    };
    checkModelStatus();
  }, []);

  const handleDownload = async () => {
    try {
      setIsTranslating(true);
      setStatus("Downloading model...");
      setDownloadProgressStr("");

      const modelId = await loadModel({
        modelSrc: BERGAMOT_EN_FR,
        modelType: "nmt",
        onProgress: (progress: any) => {
          let pct = progress.percentage;
          let dl = progress.downloaded;
          let tot = progress.total;
          if (progress.shardInfo) {
            pct = progress.shardInfo.overallPercentage;
            dl = progress.shardInfo.overallDownloaded;
            tot = progress.shardInfo.overallTotal;
          }
          const formatBytes = (bytes: number) => {
            if (bytes === 0) return "0 B";
            const k = 1024;
            const sizes = ["B", "KB", "MB", "GB"];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return (
              parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
            );
          };
          setDownloadProgressStr(
            `${pct.toFixed(2)}% (${formatBytes(dl)} / ${formatBytes(tot)})`,
          );
        },
        modelConfig: {
          engine: "Bergamot",
          from: "en",
          to: "fr",
          beamsize: 1,
          normalize: 1,
          temperature: 0.2,
          norepeatngramsize: 3,
          lengthpenalty: 1.2,
        },
      });

      await unloadModel({ modelId, clearStorage: false });

      setIsDownloaded(true);
      setStatus("Model downloaded successfully.");
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsTranslating(false);
      setDownloadProgressStr("");
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setStatus("Error: Please enter text to translate");
      return;
    }

    try {
      setIsTranslating(true);
      setTranslatedText("");
      setStatus("Loading model...");

      const modelId = await loadModel({
        modelSrc: BERGAMOT_EN_FR,
        modelType: "nmt",

        modelConfig: {
          engine: "Bergamot",
          from: "en",
          to: "fr",
          beamsize: 1,
          normalize: 1,
          temperature: 0.2,
          norepeatngramsize: 3,
          lengthpenalty: 1.2,
        },
      });

      setStatus(`Translating...`);

      const result = translate({
        modelId,
        text: inputText,
        modelType: "nmt",
        stream: false,
      });

      const text = await result.text;
      setTranslatedText(text);

      const stats = await result.stats;
      if (stats) {
        console.log(`▸ Processing stats:`, stats);
      }

      setStatus("Translation finished.");

      await unloadModel({ modelId, clearStorage: false });
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Translator",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>
              English to French Translator
            </Text>
            <Text style={styles.subtitle}>
              Enter text to translate:
            </Text>
          </View>

          <View style={styles.content}>
            <TextInput
              style={[styles.input, isTranslating && styles.disabledText]}
              multiline
              placeholder="Type English text here..."
              placeholderTextColor="#888"
              value={inputText}
              onChangeText={setInputText}
              editable={!isTranslating}
            />

            <Text style={styles.statusText}>
              Status: {status}
              {downloadProgressStr ? `\n${downloadProgressStr}` : ""}
            </Text>

            {isDownloaded === null ? (
              <TouchableOpacity disabled style={[styles.button, styles.buttonDisabled]}>
                <Text style={styles.buttonText}>
                  Loading...
                </Text>
              </TouchableOpacity>
            ) : isDownloaded ? (
              <TouchableOpacity
                onPress={handleTranslate}
                style={[
                  styles.button,
                  (isTranslating || !inputText.trim()) && styles.buttonDisabled,
                ]}
                disabled={isTranslating || !inputText.trim()}
              >
                <Text style={styles.buttonText}>
                  {isTranslating ? "Translating..." : "Translate"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleDownload}
                style={[styles.button, isTranslating && styles.buttonDisabled]}
                disabled={isTranslating}
              >
                <Text style={styles.buttonText}>
                  {isTranslating ? "Downloading..." : "Download Model"}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.outputContainer}>
              <Text style={styles.outputText}>
                {translatedText || "Translation will appear here..."}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#ffffff",
    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
    borderRadius: 12,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 16,
    color: "#6b7280",
  },
  content: {
    gap: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    color: "#111827",
    padding: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: "top",
  },
  disabledText: {
    opacity: 0.5,
  },
  statusText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#ffffff",
  },
  outputContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    minHeight: 100,
  },
  outputText: {
    fontSize: 16,
    color: "#111827",
  },
});
```

Here is a translation example from the application.

*Input* (English)

> The location I told you was near the river bank

*Output* (French)

> L'endroit où je vous ai dit était près de la rive de la rivière

### Codebase Breakdown

Let’s lift the hood on how this local translation implementation manages native model lifecycles and processes the streamed tokens.

#### 1. Managing the Native Lifecycle

Loading neural network weights for translation is computationally expensive. When the QVAC runtime initializes a model, it must read parameters from the local disk and copy the active weights into device RAM.

To handle this efficiently, we check if the model is cached before attempting to load it. This is used to check if the model is downloaded. That's the meaning of cached: it means the model has been downloaded to the user's disk:

```tsx
const model = await getModelInfo({ name: BERGAMOT_EN_FR.name });
setIsDownloaded(model.isCached);
```

The `loadModel` function will automatically handle downloading the model from the Hugging Face hub if it hasn't been cached locally yet. Once the file is available locally, it directly memory-maps the weights.

#### 2. Translating the Text

Once the model is loaded, we can pass our text to the translation engine:

```tsx
const result = translate({
  modelId,
  text: inputText,
  modelType: "nmt",
  stream: false,
});

const text = await result.text;
setTranslatedText(text);
```

This waits for the full translation to complete before displaying the final result to the user.

#### 3. Unloading the Model

After the translation is complete, we explicitly destroy the model via `unloadModel`:

```ts
await unloadModel({ modelId, clearStorage: false });
```

By unloading the model, we ensure that the device's RAM is freed up for other processes. Because the model is already downloaded and cached on the disk (and we explicitly set `clearStorage: false`), reloading the model the next time the user wants to translate something will be nearly instantaneous.

---

## Conclusion

Transitioning translation from the cloud to on-device hardware offers a practical approach for mobile application developers. Running model inference locally eliminates reliance on remote internet connectivity, removes recurring API usage costs, and ensures that user text inputs never leave the physical device.

Integrating local translation can be highly beneficial for travel apps, secure communication tools, or educational platforms. As edge processors gain dedicated hardware acceleration cores and open-source models become even more efficient through quantization research, local-first architectures present a compelling alternative for developers prioritizing privacy, offline resilience, and predictable cost structures.

::: info Resources and Further Reading

To dive deeper into local Neural Machine Translation, inspect the source code, or explore advanced configurations for your mobile applications, check out the following resources:

- [**QVAC Translation Docs**](https://docs.qvac.tether.io/ai-capabilities/translation/): Official documentation for integrating local translation capabilities with QVAC.
- [**QVAC Expo Integration Docs**](https://docs.qvac.tether.io/tutorials/expo/): Learn more about configuring custom local models in Expo.
- [**Bergamot Project**](https://browser.mt/): Learn more about the underlying Neural Machine Translation engine.
- [<VPIcon icon="iconfont icon-arxiv"/>**Attention Is All You Need**](https://arxiv.org/abs/1706.03762): The original 2017 Google research paper that introduced the Transformer architecture.

:::

::: info Full Code Example

<SiteInfo
  name="DjibrilM/en-fr-translator-Article-project-"
  desc="Contribute to DjibrilM/en-fr-translator-Article-project- development by creating an account on GitHub."
  url="https://github.com/DjibrilM/en-fr-translator-Article-project-/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c486fbca2cb573b4c5f6ba3bcfc1af5d32b446e2f94127735f4b9929620cde5e/DjibrilM/en-fr-translator-Article-project-"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Neural Machine Translation Works: Build Your Own Translation App with React Native and QVAC",
  "desc": "For the past 10 years, we've experienced a massive improvement in translation technologies. We went from robotic-like translations to systems that not only understand the meaning of each word in a sen",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-neural-machine-translation-works-build-your-own-translation-app-with-react-native-and-qvac.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
