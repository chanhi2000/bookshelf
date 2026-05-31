---
lang: en-US
title: "How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo"
description: "Article(s) > How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo"
icon: fas fa-language
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
      content: "Article(s) > How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo"
    - property: og:description
      content: "How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-an-llm-locally-on-your-mobile-phone-with-qvac-and-expo.html
prev: /ai/llm/articles/README.md
date: 2026-06-04
isOriginal: false
author:
  - name: Djibril-M🍀
    url: https://freecodecamp.org/news/author/djibrilm/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a5fb9baf-a10d-4e53-9c66-3980919a35b8.png
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
  name="How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo"
  desc="When I was younger, I remember my mother’s Android phone, a Samsung Galaxy Note 3 that she bought right after losing her BlackBerry. During that time, a phone with 16 GB of storage was considered cutt"
  url="https://freecodecamp.org/news/how-to-run-an-llm-locally-on-your-mobile-phone-with-qvac-and-expo"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a5fb9baf-a10d-4e53-9c66-3980919a35b8.png"/>

When I was younger, I remember my mother’s Android phone, a Samsung Galaxy Note 3 that she bought right after losing her BlackBerry. During that time, a phone with 16 GB of storage was considered cutting-edge technology. The ability to store five 720p torrented movies on a single phone honestly felt unreal.

Most flagship devices back then shipped with somewhere between 2 and 8 GB of RAM, and GPUs were nowhere near what we carry around today. My mom’s Galaxy Note 3 featured the Qualcomm Adreno 330 GPU with 32 unified shader cores running at up to 578 MHz — a complete powerhouse for its time.

Fast forward to today, and the phones in our pockets are ridiculously more powerful, more efficient, and, honestly, capable of things people would’ve considered science fiction back then.

But enough about my mom’s phone. What I’m really trying to say is this: instead of spending hundreds of dollars every month on AI subscriptions and tokens, we can take advantage of the insanely capable devices we already carry around every day.

Modern smartphones now have dedicated AI acceleration, impressive thermal efficiency, and enough compute power to run lightweight language models locally, completely offline. That means better privacy, full control over your chat history, lower latency, and the ability to use AI without depending entirely on cloud services.

In this article, we’re going to build a React Native application that interacts with an LLM running directly on the device itself. The implementation will revolve around QVAC, a family of inference tools designed specifically for running AI models locally.

::: note Prerequisites

To get the most out of this article, you should have a basic understanding of front end development and React in general. You don't have to be a mobile developer, but understanding React will help a lot.

:::

---

## What is QVAC?

QVAC (QuantumVerse Automatic Computer) is a local-first AI inference platform developed by Tether. It's designed to move artificial intelligence away from centralized cloud systems and bring computation back to the user’s own device.

Most modern AI tools rely heavily on remote servers, API keys, and cloud infrastructure controlled by a handful of companies. While this makes AI accessible, it also creates major concerns around privacy, censorship, vendor lock-in, internet dependency, and ownership of user data. Every prompt, conversation, or uploaded file often passes through third-party servers that users have little control over.

QVAC was designed to solve that problem by allowing AI models and agents to run directly on devices like smartphones, laptops, and embedded systems, even while completely offline. Instead of sending personal conversations and sensitive data to the cloud, users can process everything locally on their own hardware.

The platform also embraces decentralization through peer-to-peer communication, reducing reliance on centralized infrastructure and eliminating single points of failure. This approach makes AI systems more private, resilient, autonomous, and accessible, especially in environments with limited internet access or strict data privacy requirements.

In simple terms, QVAC exists to make AI truly owned by its users — local-first, private by default, and independent from centralized control.

---

## Environment Setup

To speed up the process, I prepared a React Native starter project with all the dependencies installed. But we will install and set up QVAC in this article, since that's our main topic. Here's a link to the [repository (<VPIcon icon="iconfont icon-github"/>`DjibrilM/QVAC-offline-Chatbot-Article-Project-`)](https://github.com/DjibrilM/QVAC-offline-Chatbot-Article-Project-).

Or you can run the below command to clone the starter project.

```sh
git clone --branch ft-ui-implementation \
--single-branch https://github.com/DjibrilM/QVAC-offline-Chatbot-Article-Project-
```

### QVAC Installation

Run the following command to install the SDK: `npm i @qvac/sdk`. Feel free to use any package manager of your choice. As for me, I will keep things simple with `npm`.

Then add the following peer dependencies to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "dependencies": {
    "@qvac/sdk": "^0.7.0",
    "bare-rpc": "^1.0.0", // [!code ++]
    "expo": "~54.0.33",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-bare-kit": "^0.11.5"  // [!code ++]
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "bare-pack": "^1.5.1", 
    "typescript": "~5.9.2"
  }
}
```

Install the following additional dependencies:

```sh
npx expo install expo-file-system expo-build-properties expo-device
```

Then configure `expo-build-properties` and add `@qvac/sdk/expo-plugin` to the `plugins` array in your `app.json`:

```json
{
  "expo": {
    "plugins": [
      "expo-router",
      "@qvac/sdk/expo-plugin",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "android": {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 76
          }
        }
      ]
    ]
  }
}
```

Run the following command to build the native modules:

```sh
npx expo prebuild
```

::: note

QVAC uses llama.cpp under the hood. Due to optimization requirements and native hardware dependencies, the QVAC SDK doesn't run on emulators. You'll have to test this with a real physical device with Developer Mode enabled.

:::

To run the app on your physical device, execute:

```sh
# For Android:
npx expo run:android --device

# For iOS:
npx expo run:ios --device
```

---

## Model Management

The QVAC model management system is completely local-first and decentralized. It handles the entire lifecycle, from downloading files to lifecycle optimization, abstracting everything behind clean utility APIs.

### Resumable & Deduplicated Downloading (`downloadAsset`)

It writes temporary chunks to local disk. If a network drop occurs, the partial file is preserved and resumes automatically upon the next call. Also, if multiple components invoke a download for the same asset simultaneously, QVAC handles the streaming under a single network stream.

### Memory Lifecycle (`loadModel` & `unloadModel`)

`loadModel` maps the asset file directly into memory, maps it to your hardware target (such as the device GPU), and exposes an ephemeral `modelId`. Because local inference is highly memory-intensive on mobile devices, calling `unloadModel` frees system RAM immediately while preserving the downloaded file on disk.

### Custom Models

Because QVAC relies on an optimized branch of llama.cpp, it remains highly compatible with the open-source AI ecosystem. If you plan to load custom models, ensure they adhere to these criteria:

- **Format:** Must be in the GGUF (`.gguf`) format.
- **Quantization:** For mobile and edge deployments, always prioritize `Q4_0`, `Q4_K_M`, or `Q8_0` configurations to guarantee they fit safely within mobile hardware RAM constraints.

---

## Complete Implementation

Now let's replace your main file codebase logic with the full implementation, combining the UI container layout, user interaction state, model lifecycle setup, and real-time inference handling into a cohesive structure.

Replace your entry file with the following code:

```tsx :collapsed-lines
import { ChatInput } from "@/components/chat-input";
import { ChatMessage, Message } from "@/components/chat-message";
import { ModelLoader } from "@/components/model-loader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import {
  completion,
  deleteCache,
  downloadAsset,
  LLAMA_3_2_1B_INST_Q4_0,
  loadModel,
  type ModelProgressUpdate,
  VERBOSITY,
} from "@qvac/sdk";
import { SymbolView } from "expo-symbols";
import { useEffect, useRef, useState } from "react";

import {
  Clipboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const makeId = () => Math.random().toString(36).substring(2, 9);

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Model loading state
  const [modelId, setModelId] = useState<string | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const startDownload = () => {
    setIsDownloading(true);
    setupModel();
  };

  // Automatically scroll to bottom when messages list updates
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isGenerating]);

  const copyToClipboard = (text: string) => {
    if (Platform.OS === "web") {
      navigator.clipboard.writeText(text);
    } else {
      Clipboard.setString(text);
    }
  };

  const setupModel = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      
      // 1. Local download path execution
      await downloadAsset({
        assetSrc: LLAMA_3_2_1B_INST_Q4_0,
        onProgress: (progress: ModelProgressUpdate) => {
          setDownloadProgress(progress.percentage / 100);
        },
      });

      setDownloadProgress(1);

      // 2. Load model into runtime memory
      const loadedModel = await loadModel({
        modelSrc: LLAMA_3_2_1B_INST_Q4_0,
        modelType: "llm",
        modelConfig: {
          device: "gpu",
          ctx_size: 2048,
          verbosity: VERBOSITY.ERROR,
        },
      });

      setModelId(loadedModel);
      setIsModelLoaded(true);
      setIsDownloading(false);
    } catch (e: any) {
      console.error("Error setting up model:", e);
      setIsDownloading(false);
    }
  };

  async function handleSend() {
    // Guard against sending before the model is ready or while generating.
    if (!modelId || isGenerating) return;

    const trimmed = input.trim();
    if (!trimmed) return;

    setInput("");
    setIsGenerating(true);

    // Append user message and a placeholder assistant message for streaming.
    const userMsg: Message = {
      id: makeId(),
      role: "user",
      content: trimmed,
    };

    const assistantId = makeId();

    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    try {
      // Build chat history for the completion request.
      const history = [...messagesRef.current, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Run a streaming completion and update the last assistant bubble.
      const result = completion({
        modelId,
        history,
        stream: true,
      });

      let acc = "";

      for await (const token of result.tokenStream) {
        acc += token;

        // Update only the last assistant message content
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: acc } : m
          )
        );
      }

      // Optional: Log completion performance stats
      try {
        const stats = await result.stats;
        console.log("📊 Completion stats:", stats);
      } catch {}

    } catch (e: any) {
      // Show any error in the assistant bubble.
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `❌ Error: ${e?.message ?? String(e)}` }
            : m
        )
      );
    } finally {
      setIsGenerating(false);
    }
  }

  if (!isModelLoaded) {
    return (
      <ModelLoader
        onDownload={startDownload}
        isDownloading={isDownloading}
        progress={downloadProgress}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-row items-center justify-between p-4 border-b border-border">
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-emerald-500" />
            <Text className="font-semibold text-lg">Local Llama 3.2</Text>
          </View>
          <Text className="text-xs text-muted-foreground">Offline Engine</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
        >
          {messages.filter(m => m.content !== "" || m.role === "assistant").map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onCopy={() => copyToClipboard(msg.content)}
            />
          ))}
        </ScrollView>

        <ChatInput
          value={input}
          onChangeText={setInput}
          onSend={handleSend}
          disabled={isGenerating}
          placeholder={isGenerating ? "Thinking..." : "Type a message..."}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
```

### Codebase Breakdown

Let’s lift the hood on how this unified component manages local model workflows and real-time UI streaming.

#### 1. Tracking Model State & Asynchronous Synchronization

At the root of the component, we track both user-facing interface state and underlying QVAC runtime handles:

```tsx
const [messages, setMessages] = useState<Message[]>([]);
const [modelId, setModelId] = useState<string | null>(null);
const [isModelLoaded, setIsModelLoaded] = useState(false);
const [isDownloading, setIsDownloading] = useState(false);
const [downloadProgress, setDownloadProgress] = useState(0);
```

Because state setters in React are asynchronous, streaming loops can accidentally capture stale representations of current chat logs.

To circumvent this, a mutable `messagesRef` acts as a real-time single source of truth for the active session state:

```tsx
const messagesRef = useRef<Message[]>([]);

useEffect(() => {
  messagesRef.current = messages;
}, [messages]);
```

#### 2. Orchestrating Download & Memory Instantiation

When the user strikes the download button action trigger, the application launches `setupModel()`. This function splits tasks clearly across local storage caching and active hardware allocation layers:

```tsx
await downloadAsset({
  assetSrc: LLAMA_3_2_1B_INST_Q4_0,
  onProgress: (progress: ModelProgressUpdate) => {
    setDownloadProgress(progress.percentage / 100);
  },
});
```

- **Storage Sync:** `downloadAsset` reaches out to pull the designated standard model signature down into mobile device disk files.
- **Hardware Binding:** Once safe on disk, `loadModel` executes to wake up the engine runtime:

```tsx
const loadedModel = await loadModel({
  modelSrc: LLAMA_3_2_1B_INST_Q4_0,
  modelType: "llm",
  modelConfig: {
    device: "gpu",
    ctx_size: 2048,
    verbosity: VERBOSITY.ERROR,
  },
});
```

Passing `device: "gpu"` tells QVAC to run hardware-accelerated kernels across the smartphone's graphic processing hardware structure, ensuring rapid performance metrics instead of locking execution to slower CPU loops.

#### 3. Pipeline Ingest & Streaming Generation Loop

Once user validation confirms the prompt is ready, `handleSend()` sets up user bubbles and generates an empty assistant placeholder card to catch token output segments.

The application map transforms references straight out of `messagesRef.current` into a structured history syntax before processing:

```tsx
const result = completion({
  modelId,
  history,
  stream: true,
});
```

With `stream: true` enabled, QVAC doesn't hold up your application thread waiting for long string sequences to complete. Instead, it yields an asynchronous iterable stream that spits out fresh updates instantly:

```tsx
let acc = "";

for await (const token of result.tokenStream) {
  acc += token;

  setMessages((prev) =>
    prev.map((m) =>
      m.id === assistantId ? { ...m, content: acc } : m
    )
  );
}
```

The loop continuously concatenates token text variables into the tracking accumulator (`acc`), target patching state properties exclusively against our placeholder identifier (`assistantId`). This creates a lightning-fast typing animation experience while executing fully offline on your user's physical device hardware.

---

## Conclusion

Building a local-first AI application is no longer a concept confined to high-end desktops or specialized research labs. As we’ve seen, the smartphones we carry in our pockets every day possess more than enough computational muscle and dedicated hardware acceleration to run highly capable language models completely offline.

By leveraging React Native and the QVAC SDK, we successfully bypassed the traditional cloud-dependent architecture. We eliminated the need for complex server infrastructure, API key management, and recurring token subscription fees, all while providing an ultra-private, low-latency, streaming chat experience directly on-device.

As open-source models continue to shrink in size and grow in capabilities, edge inference will become an essential architecture for developers prioritizing privacy, offline resilience, and cost efficiency. The power to compute is back where it belongs: in the hands of the user.

### Resources & Further Reading

To dive deeper into local inference, inspect the source code, or explore advanced configurations for your mobile applications, check out the following resources:

- [**QVAC Expo Integration Tutorial**](https://docs.qvac.tether.io/tutorials/expo/) – The official step-by-step documentation for configuring QVAC within the Expo and React Native ecosystems.
- [**Project GitHub Repository** (<VPIcon icon="iconfont icon-github"/>`DjibrilM/QVAC-offline-Chatbot-Article-Project-`)](https://github.com/DjibrilM/QVAC-offline-Chatbot-Article-Project-) – Access the complete source code, including the UI layout components, starter themes, and full configuration files used in this guide.
- [**Llama.cpp Official Repository** (<VPIcon icon="iconfont icon-github"/>`ggml-org/llama.cpp`)](https://github.com/ggml-org/llama.cpp) – Learn more about the underlying inference engine that powers QVAC's hardware-accelerated local execution.
- [<VPIcon icon="iconfont icon-huggingface"/>**Hugging Face GGUF Models**](https://huggingface.co/models?search=gguf) – Explore thousands of open-source, quantized models that you can download and experiment with inside your local application.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run an LLM Locally on Your Mobile Phone with QVAC and Expo",
  "desc": "When I was younger, I remember my mother’s Android phone, a Samsung Galaxy Note 3 that she bought right after losing her BlackBerry. During that time, a phone with 16 GB of storage was considered cutt",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-an-llm-locally-on-your-mobile-phone-with-qvac-and-expo.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
