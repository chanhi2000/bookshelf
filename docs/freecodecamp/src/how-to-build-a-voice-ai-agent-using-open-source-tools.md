---
lang: en-US
title: "How to Build a Voice AI Agent Using Open-Source Tools"
description: "Article(s) > How to Build a Voice AI Agent Using Open-Source Tools"
icon: fa-brands fa-rust
category:
  - Rust
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - rs
  - rust
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Voice AI Agent Using Open-Source Tools"
    - property: og:description
      content: "How to Build a Voice AI Agent Using Open-Source Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-voice-ai-agent-using-open-source-tools.html
prev: /programming/rs/articles/README.md
date: 2025-10-22
isOriginal: false
author:
  - name: Michael Yuan
    url : https://freecodecamp.org/news/author/michaelyuan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761073279608/a73ce2cd-c95e-4f8b-b529-8774ce39a43f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Rust > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/rs/articles/README.md",
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
  name="How to Build a Voice AI Agent Using Open-Source Tools"
  desc="Voice is the next frontier of conversational AI. It is the most natural modality for people to chat and interact with another intelligent being. In the past year, frontier AI labs such as OpenAI, xAI, Anthropic, Meta, and Google have all released rea..."
  url="https://freecodecamp.org/news/how-to-build-a-voice-ai-agent-using-open-source-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761073279608/a73ce2cd-c95e-4f8b-b529-8774ce39a43f.png"/>

Voice is the next frontier of conversational AI. It is the most natural modality for people to chat and interact with another intelligent being.

In the past year, frontier AI labs such as OpenAI, xAI, Anthropic, Meta, and Google have all released real-time voice services. Yet voice apps also have the highest requirements for latency, privacy, and customization. It’s difficult to have a one-size-fits-all voice AI solution.

In this article, we’ll explore how to use open-source technologies to create [<VPIcon icon="fas fa-globe"/>voice AI agents](https://echokit.dev/) that utilize your custom knowledge base, voice style, actions, fine-tuned AI models, and run on your own computer.

::: note Prerequisites

You’ll need to have and know a few things to most effectively follow along with this tutorial:

- Access to a Linux-like system. Mac or Windows WSL suffice too.
- Be comfortable with command line (CLI) tools.
- Be able to run server applications on the Linux system.
- Have/get free API keys from [<VPIcon icon="iconfont icon-groq"/>Groq](https://console.groq.com/keys) and [<VPIcon icon="fas fa-globe"/>ElevenLabs](https://elevenlabs.io/app/sign-in?redirect=%2Fapp%2Fdevelopers%2Fapi-keys).
- Optional: be able to compile and build Rust source code.
- Optional: have/get an [<VPIcon icon="fas fa-globe"/>EchoKit device](https://echokit.dev/echokit_diy.html) or assemble your own.

:::

---

## What it Looks Like

The key software component we will cover is the [<VPIcon icon="iconfont icon-github"/>`second-state/echokit_server`](https://github.com/second-state/echokit_server) project. It is an open-source agent orchestrator for voice AI applications. That means it coordinates services such as LLMs, ASR, TTS, VAD, MCP, search, knowledge/vector databases, and others to generate intelligent voice responses from user prompts.

The EchoKit server provides a WebSocket interface that allows compatible clients to send and receive voice data to and from it. The [<VPIcon icon="iconfont icon-github"/>`second-state/echokit_box`](https://github.com/second-state/echokit_box) project provides an ESP32-based firmware that can act as a client to collect audio from the user and play TTS-generated voice from the EchoKit server. You can see a couple of demos here. You can assemble your own EchoKit device or [<VPIcon icon="fas fa-globe"/>purchase one](https://echokit.dev/echokit_diy.html).

Of course, you can also use a pure software client that conforms to the [<VPIcon icon="iconfont icon-github"/>`second-state/echokit_server`](https://github.com/second-state/echokit_server) WebSocket interface. The project publishes a [<VPIcon icon="fas fa-globe"/>JavaScript web page](https://echokit.dev/chat/) that you can run locally to connect to your own EchoKit server as a reference.

In the rest of the article, I will discuss how it’s implemented and how to deploy the system for your own voice AI applications.

---

## Two Voice AI Approaches

When OpenAI released its “realtime voice” services in October 2024, the consensus was that voice AI required “end-to-end” AI models. Traditional LLMs take text as input and then respond in text. The voice end-to-end models take voice audio data as input and respond in voice audio data as well. The end-to-end models could reduce latency since the voice processing, understanding, and generation are done in a single step.

But an end-to-end model is very difficult to customize. For example, it’s impossible to add your own prompt and knowledge to the context for each LLM request, or to act on the LLM's thinking or tool-call responses, or to clone your own voice for the response.

The second approach is to use an “agent orchestration” service to tie together multiple AI models, using one model’s output as the input for the next model. This allows us to customize or select each model and manipulate or supplement the model input at every step.

- The VAD model is used to detect conversation turns in the user's speech. It determines when the user is finished speaking and is now expecting a response.
- The ASR/STT model turns user speech into text.
- The LLM model generates a text response, including MCP tool calls.
- The TTS model turns the response text into voice.

The issue with multi-model and multi-step orchestration is that it can be slow. A lot of optimizations are needed for this approach to work well. For example, a useful technique is to utilize streaming input and output wherever possible. This way, each model doesn’t have to wait for the complete response from the upstream model.

The [EchoKit server (<VPIcon icon="iconfont icon-github"/>`second-state/echokit_server`)](https://github.com/second-state/echokit_server) is a stream-everything, highly efficient AI model orchestrator. It is entirely written in Rust for stability, safety, and speed.

---

## The Voice AI Orchestrator

The EchoKit server project is an open-source AI service orchestrator focused on real-time voice use cases. It starts up a WebSocket server that listens for streaming audio input and returns streaming audio responses.

You can build the [<VPIcon icon="iconfont icon-github"/>`second-state/echokit_server`](https://github.com/second-state/echokit_server) project yourself using the Rust toolchain. Or, you can simply download the pre-built binary for your computer.

```sh
# for x86 / AMD64 CPUs
curl -LO https://github.com/second-state/echokit_server/releases/download/v0.1.0/echokit_server-v0.1.0-x86_64-unknown-linux-gnu.tar.gz
unzip echokit_server-v0.1.0-x86_64-unknown-linux-gnu.tar.gz

# for arm64 CPUs
curl -LO https://github.com/second-state/echokit_server/releases/download/v0.1.0/echokit_server-v0.1.0-aarch64-unknown-linux-gnu.tar.gz
unzip echokit_server-v0.1.0-aarch64-unknown-linux-gnu.tar.gz
```

Then, run it as follows:

```sh
nohup ./echokit_server &
```

It reads the <VPIcon icon="iconfont icon-toml"/>`config.toml` file from the current directory. At the top of the file, you can configure the port on which the WebSocket server listens. You can also specify a WAV file that is downloaded to the connected [<VPIcon icon="fas fa-globe"/>EchoKit client device](https://echokit.dev/echokit_diy.html) as a welcome message.

```toml title="config.toml"
addr = "0.0.0.0:8000"
hello_wav = "hello.wav"
```

### Configure an ASR

When the EchoKit server receives the user's voice data, it first sends the data to an ASR service to convert it into text.

There are many compelling ASR models available today. The EchoKit server can work with any OpenAI-compatible API providers, such as OpenAI itself, x.ai, OpenRouter, and Groq.

In our example, we use Groq’s Whisper ASR service. Whisper is a state-of-the-art ASR model released by OpenAI. Groq provides specialized hardware chips to run it very fast. You will first get [a free API key from Groq](https://console.groq.com/keys). Then, configure the ASR service as follows. Notice the “prompt” for the Whisper model. It is a tried-and-true prompt to reduce hallucination of the Whisper model.

```toml title="config.toml"
[asr]
url = "https://api.groq.com/openai/v1/audio/transcriptions"
api_key = "gsk_XYZ"
model = "whisper-large-v3"
lang = "en"
prompt = "Hello\n你好\n(noise)\n(bgm)\n(silence)\n"
```

### Run and configure a VAD

In order to carry out a voice conversation, participants must detect each other's intentions and speak only when a turn arises. VAD (Voice Activity Detection) is a specialized AI model used to detect activities and, in particular, when the speaker has finished and expects an answer.

In EchoKit, we have VAD detection on both the device and the server.

- Device-side VAD: It detects human language. The device ignores background noise, music, keyboard sounds, and dog barking. It only sends human voice to the server.
- Server-side VAD: It processes the audio stream in 100ms (0.1s) chunks. Once it detects that the speaker has finished, it sends all transcribed text to the LLM and starts waiting for the LLM’s response stream.

The server-side VAD is optional, since the device-side VAD can also generate “conversation turn” signals. But due to the limited computing resources on the device, adding the server-side VAD can dramatically improve the overall VAD performance.

We’re porting the popular [Silero VAD](https://github.com/snakers4/silero-vad) project from Python to Rust, and creating the [silero_vad_server](https://github.com/second-state/silero_vad_server) project. Build the project [as instructed](https://github.com/second-state/silero_vad_server?tab=readme-ov-file#build-the-api-server). You can start the VAD server on your EchoKit server’s port 9094 as follows:

```sh
VAD_LISTEN=0.0.0.0:9094 nohup target/release/silero_vad_server &
```

You might be wondering: why port to Rust? While many AI projects are written in Python for ease of development, Rust applications are often much lighter, faster, and safer at deployment. So, we’ll leverage AI tools like [RustCoder](https://github.com/cardea-mcp/RustCoder) to port as much Python code as possible to Rust. The EchoKit software stack is largely written in Rust.

The VAD server is a WebSocket service that listens on port 9094. As we discussed, the EchoKit server will stream audio to this WebSocket and stop the ASR when a conversation turn is detected. Therefore, we’ll add the VAD service to the EchoKit server’s ASR config section in <VPIcon icon="iconfont icon-toml"/>`config.toml`.

```toml title="config.toml"
[asr]
url = "https://api.groq.com/openai/v1/audio/transcriptions"
api_key = "gsk_XYZ"
model = "whisper-large-v3"
lang = "en"
prompt = "Hello\n你好\n(noise)\n(bgm)\n(silence)\n"
vad_realtime_url = "ws://localhost:9094/v1/audio/realtime_vad"
```

### Configure an LLM

Once the ASR service transcribes the user's voice into text, the next step in the pipeline is the LLM (Large Language Model). It’s the AI service that actually “thinks” and generates an answer in text.

Again, the EchoKit server can work with any OpenAI-compatible API providers for LLMs, such as OpenAI itself, x.ai, OpenRouter, and Groq. Since the voice service is highly sensitive to speed, we’ll choose Groq again. Groq supports a number of open-source LLMs. We’ll choose the `gpt-oss-20b` model released by OpenAI.

```toml title="config.toml"
[llm]
llm_chat_url = "https://api.groq.com/openai/v1/chat/completions"
api_key = "gsk_XYZ"
model = "openai/gpt-oss-20b"
history = 20
```

The “history” field indicates how many messages should be kept in the context. Another crucial feature of an LLM application is the “system prompt,” where you instruct the LLM how it should “behave.” You can specify the system prompt in the EchoKit server config as well.

```toml title="config.toml"
[[llm.sys_prompts]]
role = "system"
content = """
You are a comedian. Engage in lighthearted and humorous conversation with the user. Tell jokes when appropriate.

"""
```

Since Groq is very fast, it can process very large system prompts in under one second. You can add a lot more context and instructions to the system prompt. For example, you can give the application “knowledge” about a specific field by putting entire books into the system prompt.

### Configure a TTS

Finally, once the LLM generates a text response, the EchoKit server will call a TTS (text to speech) service to convert the text into voice and stream it back to the client device.

While Groq has a TTS service, it’s not particularly compelling. ElevenLabs is a leading TTS provider that offers hundreds of voice characters. It can express emotions and supports easy voice cloning. In the config below, you’ll put in your [<VPIcon icon="fas fa-globe"/>ElevenLabs API key](https://elevenlabs.io/app/sign-in?redirect=%2Fapp%2Fdevelopers%2Fapi-keys) and select a voice.

```toml title="app.ini"
[tts]
platform = "Elevenlabs"
token = "sk_xyz"
voice = "VOICE-ID-ABCD"
```

The ElevenLabs TTS models and API services are all great, but they are not open-source. A very compelling open-source TTS, known as GPT-SoVITS, is also available.

You can port GPT-SoVITS from Python to Rust and create an open-source API server project called [<VPIcon icon="iconfont icon-github"/>`second-state/gsv_tts`](https://github.com/second-state/gsv_tts). It allows easy cloning of any voice. You can run a [<VPIcon icon="iconfont icon-github"/>`second-state/gsv_tts`](https://github.com/second-state/gsv_tts) API server by following its instructions. Then, you can configure the EchoKit server to stream text to it and receive streaming audio from it.

```toml title="app.ini"
[tts]
platform = "StreamGSV"
url = "http://gsv_tts.server:port/v1/audio/stream_speech"
speaker = "michael"
```

### Configure MCP and actions

Of course, an “AI agent” is not just about chatting. It is about performing actions on specific tasks. For example, the [“US civics test prep”](https://youtu.be/Zy-rLT4EgZQ) use case, which I shared as an example video at the beginning of this article, requires the agent to get exam questions from a database, and then generate responses that guide the user toward the official answer. This is accomplished using LLM tools and actions.

- The LLM detects that the user is requesting a new question.
- Instead of responding in natural language, it responds with a JSON structure that instructs the agent to "get a new question and answer."
- The EchoKit server intercepts this JSON response and retrieves the question and answer from a database.
- The EchoKit server sends the question and answer back to the LLM.
- The LLM formulates a natural language response based on the question and answer.
- The EchoKit server generates a voice response using its TTS service.

As you can see, the EchoKit server needs to perform a few extra steps behind the scenes before it responds in voice. The EchoKit server leverages the MCP protocol for this. The function to look up questions and answers is provided by an open-source MCP server called [<VPIcon icon="iconfont icon-github"/>`cardea-mcp/ExamPrepAgent`](https://github.com/cardea-mcp/ExamPrepAgent).

The MCP protocol standardizes the tools and functions for LLMs to call. There are many MCP servers available for all kinds of different tasks. ExamPrepAgent is just one of them.

We are running this MCP server on port 8003. With the MCP server up and running, you only need to add the following configuration to EchoKit server’s <VPIcon icon="iconfont icon-toml"/>`config.toml`.

```toml title="config.toml"
[[llm.mcp_server]]
server = "http://localhost:8003/mcp"
type = "http_streamable"
```

With MCP integration, the EchoKit AI agent can now perform actions. It can call APIs to send messages, make payments, or even turn electronic devices on or off.

---

## Local AI With LlamaEdge

You’ve now seen the open-source EchoKit device working with the open-source EchoKit server to understand and respond to users in voice. But the AI models we use, while also open-source, run on commercial cloud providers. Can we run AI models using open-source technologies at home?

[<VPIcon icon="iconfont icon-github"/>`LlamaEdge/LlamaEdge`](https://github.com/LlamaEdge/LlamaEdge) is an open-source, cross-platform API server for AI models. It [<VPIcon icon="fas fa-globe"/>supports many mainstream LLM, ASR, and TTS models](https://llamaedge.com/docs/ai-models/) across Linux, Mac, Windows, and many CPU/GPU architectures. It’s perfect for running AI models on home or office computers. It also provides OpenAI-compatible API endpoints, which makes them very easy to integrate into the EchoKit server.

To install LlamaEdge and its dependencies, run the following shell command. It will detect your hardware and install the appropriate software that can fully take advantage of your GPUs (if any).

```sh
curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install_v2.sh | bash -s
```

Then, download an open-source LLM model. I am using Google's Gemma model as an example.

```sh
curl -LO https://huggingface.co/second-state/gemma-3-4b-it-GGUF/resolve/main/gemma-3-4b-it-Q5_K_M.gguf
```

Download the cross-platform LlamaEdge API server.

```sh
curl -LO https://github.com/second-state/LlamaEdge/releases/latest/download/llama-api-server.wasm
```

Start an LLamaEdge API server with the Google Gemma LLM model. by default, it listens on localhost port 8080. 

```sh
wasmedge --dir .:. --nn-preload default:GGML:AUTO:gemma-3-4b-it-Q5_K_M.gguf llama-api-server.wasm -p gemma-3
```

Test the OpenAI compatible API on that server.

```sh
curl -X POST http://localhost:8080/v1/chat/completions \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{"messages":[{"role":"system", "content": "You are a helpful assistant. Try to be as brief as possible."}, {"role":"user", "content": "Where is the capital of Texas?"}]}'
```

Now, you can add this local LLM service to your EchoKit server configuration.

```toml title="config.toml"
[llm]
llm_chat_url = "http://localhost:8080/v1/chat/completions"
api_key = "NONE"
model = "default"
history = 20
```

The LlamaEdge project supports more than LLMs. It runs the [Whisper ASR model (<VPIcon icon="iconfont icon-github"/>`LlamaEdge/whisper-api-server`)](https://github.com/LlamaEdge/whisper-api-server) and the [Piper TTS model (<VPIcon icon="iconfont icon-github"/>`LlamaEdge/whisper-api-server`)](https://github.com/LlamaEdge/tts-api-server) as OpenAI-compatible API servers as well.

---

## Conclusion

The voice AI agent software stack is complex and deep. EchoKit is an open-source platform that ties together and coordinates all those components. It provides a good vantage point for us to learn about the entire stack.

I can’t wait to see what you build!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Voice AI Agent Using Open-Source Tools",
  "desc": "Voice is the next frontier of conversational AI. It is the most natural modality for people to chat and interact with another intelligent being. In the past year, frontier AI labs such as OpenAI, xAI, Anthropic, Meta, and Google have all released rea...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-voice-ai-agent-using-open-source-tools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
