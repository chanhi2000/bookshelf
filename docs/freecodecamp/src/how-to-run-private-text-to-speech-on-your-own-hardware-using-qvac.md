---
lang: en-US
title: "How to Run Private Text-to-Speech on Your Own Hardware Using QVAC"
description: "Article(s) > How to Run Private Text-to-Speech on Your Own Hardware Using QVAC"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Private Text-to-Speech on Your Own Hardware Using QVAC"
    - property: og:description
      content: "How to Run Private Text-to-Speech on Your Own Hardware Using QVAC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-private-text-to-speech-on-your-own-hardware-using-qvac.html
prev: /programming/js-react/articles/README.md
date: 2026-06-14
isOriginal: false
author:
  - name: Djibril-M🍀
    url: https://freecodecamp.org/news/author/djibrilm/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3ac11484-05eb-4e59-9d35-f2bad4d1d730.png
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

[[toc]]

---

<SiteInfo
  name="How to Run Private Text-to-Speech on Your Own Hardware Using QVAC"
  desc="When I was putting the final touches on QuizRope, an educational mobile app I built that uses LLMs for real-time tutoring and homework assistance, I knew the next logical step was voice. Reading text "
  url="https://freecodecamp.org/news/how-to-run-private-text-to-speech-on-your-own-hardware-using-qvac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3ac11484-05eb-4e59-9d35-f2bad4d1d730.png"/>

When I was putting the final touches on [QuizRope (<VPIcon icon="iconfont icon-github"/>`DjibrilM/Quiz-rope-`)](https://github.com/DjibrilM/Quiz-rope-), an educational mobile app I built that uses LLMs for real-time tutoring and homework assistance, I knew the next logical step was voice. Reading text on a screen is great, but having an AI tutor physically *speak* to you transforms the entire learning experience.

Naturally, my first instinct was to look at cloud providers. While services like ElevenLabs offer incredible voice quality, I quickly ran the numbers. Between the API pricing, token consumption for lengthy tutoring sessions, and the sheer volume of users I anticipated, the math got ugly very quickly. Relying on a paid API for every single sentence spoken within the app simply wasn't sustainable for an independent developer.

If you’re about to ask, "How far did you get with QuizRope?", well honestly, I straight-up gave up on the project back then because I couldn't find a sane, affordable solution for the TTS feature.

Beyond the prohibitive cost, there was the latency. Waiting for a server to process a prompt, generate the audio, and stream it back down to a mobile device completely breaks the conversational illusion. And worst of all, it meant every question a student asked would be beamed to a third-party server.

That frustration became the catalyst for my search to find a reliable, offline, and completely zero-cost solution.

In this article, we’re going to build a React Native application that performs high-fidelity Text-to-Speech (TTS) completely offline using your device's own hardware.

If you haven't set up your environment or need a refresher on local inference fundamentals, I highly recommend reading my previous article, [**How to Run a Local LLM Offline in React Native with QVAC**](/freecodecamp.org/how-to-run-an-llm-locally-on-your-mobile-phone-with-qvac-and-expo.md), where I cover project initialization, prebuilding, and native hardware dependencies.

This guide assumes you already have a project with the QVAC SDK configured and ready to run on a physical device.

::: note Prerequisites

To get the most out of this article, you should have a solid foundation in modern web and mobile development:

- **JavaScript/TypeScript & React**: Familiarity with React concepts and hooks, especially `useState`, `useEffect`, and `useRef`.
- **React Native & Expo**: Basic understanding of layout structures (such as `View`, `ScrollView`, `TextInput`) and styling conventions.
- **Asynchronous JavaScript & Binary Buffers**: Experience with `async/await`, Promises, and basic manipulation of arrays like `Int16Array` or `Buffer`.
- **Development Build Environment**: Familiarity with running local development compilation commands, specifically `npx expo prebuild` to build native iOS and Android modules.
- **Physical Mobile Device**: Because local machine learning models leverage device-specific hardware acceleration and native optimizations, the QVAC SDK doesn't support simulator environments. You must have a physical iOS or Android testing device with Developer Mode enabled.

:::

---

## What is QVAC?

To help you follow along more effectively, let’s establish what QVAC is and why it exists.

Developed by Tether, QVAC is a local-first AI SDK designed for building cross-platform, peer-to-peer (P2P) applications and systems.

Many mobile applications that utilize Large Language Models (LLMs) or Text-to-Speech (TTS) engines rely on network requests to cloud-hosted APIs (such as OpenAI or ElevenLabs). While convenient, this model introduces dependencies on network connectivity, recurring API usage fees, and transmission of user data to third-party servers.

QVAC provides an alternative by executing AI models directly on the client device. This local-first architecture offers several practical advantages:

- **Local-first execution**: Runs inference directly on the client hardware, eliminating the need for external APIs or active internet connections.
- **Peer-to-peer (P2P) support**: Allows distributing inference tasks across local networks, helping coordinate workloads without centralized servers.
- **Cross-platform compatibility**: Provides a single JavaScript/TypeScript interface that works consistently across different hardware and runtime environments.
- **Unified capabilities**: Exposes text generation, transcription, image generation, and speech synthesis within a single package.

### Key Concepts for On-Device Inference

To understand how QVAC runs on a mobile device, we must keep a few key concepts in mind:

- **On-Device Inference**: Running model calculations locally. Rather than relying on a single engine, QVAC supports multiple specialized local inference backends depending on the task (such as <VPIcon icon="iconfont icon-cpp"/>`llama.cpp` for text, <VPIcon icon="iconfont icon-cpp"/>`whisper.cpp` for transcription, or custom diffusion backends for image generation). Under the hood, these engines memory-map quantized model weights directly into the device's RAM and run calculations using native GPU hardware acceleration.
- **Quantization (GGUF format)**: A mathematical optimization technique that compresses the model's weights (for example, from a standard 16-bit floating-point precision down to 4-bit or 8-bit integers). This makes it possible for models to fit into the memory constraints of consumer mobile hardware while keeping output quality high.
- **KV (Key-Value) Cache**: A memory area that stores calculated states of previous tokens so the model doesn't have to re-evaluate the entire context window with every word or token it generates.

---

## The Architecture Supported by QVAC

Before writing code, it's crucial to understand what's actually happening under the hood. To handle local execution without melting your device, the QVAC SDK manages the hardware binding and model lifecycle while hooking into optimized, community-maintained [**GGML**](/huggingface.co/introduction-to-ggml.md) inference backends.

Instead of a one-size-fits-all approach, the QVAC SDK supports two distinctly different neural architectures for speech synthesis. Depending on your application's needs — whether you want instant voice cloning or ultra-high-fidelity pre-trained voices — you'll choose between **Chatterbox** and **Supertonic**.

| Feature | Chatterbox | Supertonic |
| --- | --- | --- |
| **Architecture** | Transformer-based language model | Diffusion-based latent denoising |
| **Model Structure** | Split (T3 GGUF + S3Gen companion) | Single file (GGUF) |
| **Voice Method** | Zero-shot voice cloning (Reference WAV) | Pre-trained voice styles |
| **Sample Rate** | 24,000 Hz | 44,100 Hz |

### 1. The Chatterbox Engine

Chatterbox is built on a **transformer-based language model** architecture. It treats audio generation similarly to how an LLM predicts the next word in a sentence, but instead, it predicts discrete acoustic tokens.

Because of this architecture, Chatterbox excels at **zero-shot voice cloning**. Instead of relying purely on pre-baked voices, you can pass an optional `referenceAudioSrc` (a short WAV file of someone speaking) alongside your text. The transformer analyzes the reference audio's acoustic properties and generates a cloned voice based on those features.

### 2. The Supertonic Engine

Supertonic takes a completely different approach, utilizing [<VPIcon icon="fas fa-globe"/>diffusion-based latent denoising](https://emergentmind.com/topics/latent-denoising-diffusion-models) — the same fundamental architecture used by AI image generators like Stable Diffusion, but applied to audio.

It starts with pure digital noise and iteratively refines it into a 44.1 kHz high-fidelity speech waveform based on the text prompt. Supertonic uses a single, unified GGUF file rather than a split model. Instead of dynamic voice cloning, it relies on highly optimized, pre-trained voice styles (for example, `voice: "F1"` or `voice: "M1"`) baked directly into the model. This makes it incredibly efficient for generating crystal-clear, studio-quality speech when you don't need dynamic cloning capabilities.

For this tutorial, we'll use Supertonic. It yields fantastic results out of the box and avoids the complexity of loading multiple companion files.

---

## The Inference Pipeline

To visualize how we interact with these engines in our codebase, think of local TTS (Text to Speech) as running a virtual recording studio right in your phone's memory:

1. **Hiring the actor (loading the model):** We map the compressed GGUF file directly into the device's RAM or GPU VRAM.
2. **Handing over the script (text input):** We pass plain text to the loaded engine.
3. **The performance (inference):** The engine reads the text and mathematically predicts the sound waves. Crucially, the AI doesn't emit a finished audio file. Instead, it outputs raw digital sound waves known as PCM samples.
4. **Packaging the audio:** Because a raw list of numbers can't be played by standard media players, we must manually wrap the PCM data in a standard WAV header.
5. **Closing the studio (unloading):** Because speech synthesis is memory-intensive and maintains a persistent state, the model is cleared from RAM to free up resources and flush its context.

---

## Environment and Dependency Config

Before we jump into the codebase, there's a crucial dependency setup to keep in mind if your project uses the pnpm package manager.

Because QVAC plugins rely on transitive native peer dependencies, strict package managers like pnpm will lock these dependencies down inside hidden <VPIcon icon="fas fa-folder-open"/>`.pnpm` subfolders.

To ensure the QVAC native bundler (`bare-pack`) can resolve your worker plugins correctly at build time, create a `.npmrc` file in the root of your project:

```ini title=".npmrc"
shamefully-hoist=true
```

IMPORTANT: After creating this file, you must run a clean dependency install (`pnpm install`). This ensures a flat layout in your root <VPIcon icon="fas fa-folder-open"/>`node_modules` so that all QVAC-specific helper packages are resolved properly during your local `npx expo prebuild` compilation step.

---

## The Audio Utility Packaging

Because QVAC outputs raw PCM arrays, we need to construct a valid WAV file in memory and write it to the device's storage before the native audio player can play it.

To achieve this, let's create a utility module inside <VPIcon icon="fas fa-folder-open"/>`src/lib/`<VPIcon icon="iconfont icon-typescript"/>`utils.ts` to build the required WAV header, convert raw audio samples into a binary buffer, and write it to local storage.

```ts :collapsed-lines title="src/lib/utils.ts"
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system/legacy";

/**
 * Creates a WAV header for 16-bit PCM audio
 */
export function createWavHeader(
  dataLength: number,
  sampleRate: number,
): Buffer {
  const buffer = Buffer.alloc(44);
  const channels = 1; // Mono
  const byteRate = sampleRate * channels * 2; // 16-bit audio
  const blockAlign = channels * 2;

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataLength, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // AudioFormat (PCM)
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataLength, 40);

  return buffer;
}

/**
 * Converts the raw Int16Array samples from QVAC to a binary Buffer
 */
export function int16ArrayToBuffer(int16Array: Int16Array): Buffer {
  const buffer = Buffer.alloc(int16Array.length * 2);
  for (let i = 0; i < int16Array.length; i++) {
    buffer.writeInt16LE(int16Array[i] ?? 0, i * 2);
  }
  return buffer;
}

/**
 * Main function to package and save the file to local mobile storage
 */
export async function saveAudioToDevice(
  audioBuffer: Int16Array,
  sampleRate: number,
): Promise<string> {
  try {
    const audioData = int16ArrayToBuffer(audioBuffer);
    const wavHeader = createWavHeader(audioData.length, sampleRate);
    const finalWavBuffer = Buffer.concat([wavHeader, audioData]);
    const base64Data = finalWavBuffer.toString("base64");

    const filename = `tts-speech-${Date.now()}.wav`;
    const fileUri = `\({FileSystem.documentDirectory}\){filename}`;

    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(`✅ File saved locally at: ${fileUri}`);
    return fileUri;
  } catch (error) {
    console.error("❌ Failed to save audio file locally:", error);
    throw error;
  }
}
```

---

## Complete Implementation

Let's bring it all together. We'll implement an interface that takes user input, manages download and loading states for the Supertonic engine, packages generated raw waves into a playable local file, and renders an interactive visual waveform player.

Replace your entry app file <VPIcon icon="fas fa-folder-open"/>`src/app/`<VPIcon icon="fa-brands fa-react"/>`index.tsx` with the following implementation:

```tsx :collapsed-lines title="src/app/index.tsx"
import { useState, useEffect } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  loadModel,
  unloadModel,
  textToSpeech,
  downloadAsset,
  TTS_EN_SUPERTONIC_Q8_0,
  getModelInfo,
  type ModelProgressUpdate,
} from "@qvac/sdk";
import { saveAudioToDevice } from "@/lib/utils";
import { TtsModelLoader } from "@/components/tts-model-loader";
import { AudioPlayer } from "@/components/audio-player";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const SUPERTONIC_SAMPLE_RATE = 44100;

// Global reference for our model ID
let globalModelId: string | null = null;

type TtsStatus =
  | { phase: "idle" }
  | { phase: "synthesizing" }
  | { phase: "done"; audioUri: string }
  | { phase: "error"; message: string };

export default function TextToVoiceScreen() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<TtsStatus>({ phase: "idle" });

  const [isModelLoaded, setIsModelLoaded] = useState(!!globalModelId);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const isBusy = status.phase === "synthesizing";

  useEffect(() => {
    async function checkAndAutoLoad() {
      if (globalModelId) return;
      try {
        const info = await getModelInfo({ name: TTS_EN_SUPERTONIC_Q8_0.name });
        if (info.isCached) {
          setIsDownloading(true);
          setDownloadProgress(1);

          globalModelId = await loadModel({
            modelSrc: TTS_EN_SUPERTONIC_Q8_0,
            modelConfig: {
              ttsEngine: "supertonic",
              language: "en",
              voice: "F1",
              ttsSpeed: 1.05,
              ttsNumInferenceSteps: 5,
            },
          });

          setIsModelLoaded(true);
          setIsDownloading(false);
        }
      } catch (err: unknown) {
        console.warn("Failed to auto-load cached model on mount:", err);
        setIsDownloading(false);
      }
    }
    checkAndAutoLoad();
  }, []);

  const handleDownloadModel = async () => {
    if (isDownloading || isModelLoaded) return;

    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      await downloadAsset({
        assetSrc: TTS_EN_SUPERTONIC_Q8_0,
        onProgress: (p: ModelProgressUpdate) => {
          setDownloadProgress(p.percentage / 100);
        },
      });

      setDownloadProgress(1);

      globalModelId = await loadModel({
        modelSrc: TTS_EN_SUPERTONIC_Q8_0,
        modelConfig: {
          ttsEngine: "supertonic",
          language: "en",
          voice: "F1",
          ttsSpeed: 1.05,
          ttsNumInferenceSteps: 5,
        },
      });

      setIsModelLoaded(true);
      setIsDownloading(false);
    } catch (err: unknown) {
      console.error("Failed to download or load model:", err);
      setIsDownloading(false);
      setStatus({
        phase: "error",
        message: err instanceof Error ? err.message : String(err),
      });
      setIsModelLoaded(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() || isBusy || !globalModelId) return;

    try {
      setStatus({ phase: "synthesizing" });

      // 1. Unload and reload the model to reset its state and clear the KV cache.
      if (globalModelId) {
        await unloadModel({ modelId: globalModelId });
      }
      globalModelId = await loadModel({
        modelSrc: TTS_EN_SUPERTONIC_Q8_0,
        modelConfig: {
          ttsEngine: "supertonic",
          language: "en",
          voice: "F1",
          ttsSpeed: 1.05,
          ttsNumInferenceSteps: 5,
        },
      });

      // 2. Synthesize text to raw PCM samples
      const result = textToSpeech({
        modelId: globalModelId,
        text: text.trim(),
        inputType: "text",
        stream: false,
      });

      const audioBuffer = await result.buffer;

      // 3. Package and save WAV file using our local util
      const samplesInt16 = new Int16Array(audioBuffer);
      const wavUri = await saveAudioToDevice(
        samplesInt16,
        SUPERTONIC_SAMPLE_RATE,
      );

      // 4. Show player
      setStatus({ phase: "done", audioUri: wavUri });
    } catch (err: unknown) {
      console.error("TTS error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setStatus({ phase: "error", message: msg });
    }
  };

  const buttonLabel =
    status.phase === "synthesizing" ? "Synthesizing…" : "Synthesize Speech";

  if (!isModelLoaded) {
    return (
      <TtsModelLoader
        onDownload={handleDownloadModel}
        isDownloading={isDownloading}
        progress={downloadProgress}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-black"
    >
      <ScrollView contentContainerClassName="flex-grow p-6  justify-center">
        <Card className="border border-border bg-card max-w-md w-full mx-auto">
          <CardHeader>
            <CardTitle variant="h3" className="text-white text-center">
              Text to Voice
            </CardTitle>
            <CardDescription className="text-center mt-1">
              Type or paste your content to synthesize speech
            </CardDescription>
          </CardHeader>

          <CardContent className="gap-6">
            <TextInput
              className="bg-muted text-white border border-border rounded-lg p-4 h-48 text-base leading-6"
              multiline
              numberOfLines={8}
              placeholder="Type your message here..."
              placeholderTextColor="#666"
              value={text}
              onChangeText={setText}
              style={{ textAlignVertical: "top" }}
              editable={!isBusy}
            />

            {status.phase === "error" && (
              <Text className="text-destructive text-sm text-center">
                {status.message}
              </Text>
            )}

            {status.phase === "done" && <AudioPlayer uri={status.audioUri} />}

            <Button
              onPress={handleSubmit}
              className="w-full h-12 rounded-xl"
              disabled={!text.trim() || isBusy}
            >
              <Text className="font-semibold text-lg">{buttonLabel}</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

### Codebase Breakdown

Let’s lift the hood on how this local Text-to-Speech implementation manages native model lifecycles and processes raw audio arrays.

#### 1. Managing the Native Lifecycle

Loading neural network weights for speech synthesis is computationally expensive. When the QVAC runtime initializes a model, it must read parameters from the local disk and copy the active weights into device RAM.

To handle this efficiently, we declared the reference variable outside the component scope:

```ts
let globalModelId: string | null = null;
```

If `globalModelId` were tracked inside component states, navigating away from the text-to-speech screen would clean up the state, causing the app to unnecessarily drop the reference. Storing the ID globally ensures we hold onto it across layout transitions.

#### 2. Flushing the KV Cache: Unload and Reload

One of the most important aspects of offline generation using GGML engines is state management:

```ts
// 1. Unload and reload the model to reset its state and clear the KV cache.
if (globalModelId) {
  await unloadModel({ modelId: globalModelId });
}

globalModelId = await loadModel({ ... });
```

WARNING about **acoustic hallucinations:** If you continuously synthesize sentences on a single TTS model instance without resetting it, the model's Key-Value (KV) cache fills up. It begins treating your new sentence as a continuation of the previous one, leading to heavy robotic distortion, echoing, and repeated voices.

By explicitly destroying the model via `unloadModel` and immediately booting a fresh instance with `loadModel`, we're forcing a pristine, empty context window. Since the model is already downloaded and memory-mapped, reloading the model directly from local flash storage is extremely fast, typically completing in a fraction of a second on modern mobile hardware to ensure a seamless user experience while guaranteeing artifact-free audio.

#### 3. Demystifying the WAV Header Structure

Operating systems and built-in mobile media decoders are unable to parse raw, naked PCM (Pulse Code Modulation) sound waves directly. A raw PCM buffer is simply a stream of numerical coordinates representing audio wave amplitudes.

We resolve this by prepending-formatting our PCM buffer with a standard 44-byte RIFF/WAVE header.

This header acts as a passport, defining:

- **AudioFormat (`1`)**: Signals uncompressed linear PCM.
- **NumChannels (`1`)**: Mono audio.
- **SampleRate (`44100`)**: The clock frequency required for Supertonic playback.
- **BitsPerSample (`16`)**: 16-bit word length (2 bytes per sample).

Additionally, writing the file is handled via Base64 encoding to safely cross React Native's JavaScript-to-Native bridge without dropping binary data:

```ts
const base64Data = finalWavBuffer.toString("base64");
await FileSystem.writeAsStringAsync(fileUri, base64Data, {
  encoding: FileSystem.EncodingType.Base64,
});
```

#### 4. Visual Waveform Player

Rather than using a basic headless native audio player that fires immediately in the background, we pass the local WAV file path to a custom `<AudioPlayer>` component powered by `@simform_solutions/react-native-audio-waveform`.

This module analyzes our newly written WAV file and draws a sleek, WhatsApp-inspired interactive visual waveform, giving the user full control over playback, dynamic speed adjustments (`1x`, `1.5x`, `2x`), and seeking. It's a vast UX improvement that makes the final result feel premium and polished.

---

## Conclusion

Transitioning Text-to-Speech from the cloud to on-device hardware offers a practical approach for mobile application developers. Running model inference locally eliminates reliance on remote internet connectivity, removes recurring API usage costs, and ensures that user text inputs never leave the physical device.

Integrating local speech synthesis can be highly beneficial for interactive, educational, or conversational apps. For example, in voice-guided systems, on-device TTS allows applications to function in private or offline environments. As edge processors gain dedicated hardware acceleration cores and open-source models decrease in memory size through quantization research, local-first architectures present a compelling alternative for developers prioritizing privacy, offline resilience, and predictable cost structures.

::: info Resources and Further Reading

To dive deeper into local Text-to-Speech inference, inspect the source code, or explore advanced configurations for your mobile applications, check out the following resources:

- [<VPIcon icon="fas fa-globe"/>QVAC Expo Integration Docs](https://docs.qvac.tether.io/tutorials/expo/): Learn more about configuring custom local models in Expo.
- [<VPIcon icon="iconfont icon-github"/>`SimformSolutionsPvtLtd/react-native-audio-waveform`](https://github.com/SimformSolutionsPvtLtd/react-native-audio-waveform): Learn more about interactive React Native audio visualizations.
- [<VPIcon icon="iconfont icon-huggingface"/>GGUF Model Hub on Hugging Face](https://huggingface.co/models?search=gguf): Browse compatible quantized open-source models.
- [<VPIcon icon="fas fa-globe"/>Latent Denoising Deep Dive](https://emergentmind.com/topics/latent-denoising-diffusion-models): Technical deep dive into Diffusion-based acoustic generation.
- [<VPIcon icon="iconfont icon-github"/>`DjibrilM/QVAC-TTS-Expo-Implementation`](https://github.com/DjibrilM/QVAC-TTS-Expo-Implementation): Full implementation code.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Private Text-to-Speech on Your Own Hardware Using QVAC",
  "desc": "When I was putting the final touches on QuizRope, an educational mobile app I built that uses LLMs for real-time tutoring and homework assistance, I knew the next logical step was voice. Reading text ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-private-text-to-speech-on-your-own-hardware-using-qvac.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
