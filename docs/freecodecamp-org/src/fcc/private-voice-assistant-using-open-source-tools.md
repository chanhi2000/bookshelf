---
lang: en-US
title: "How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools"
description: "Article(s) > How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools"
icon: 
category:
  - AI
  - LLM
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools"
    - property: og:description
      content: "How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/private-voice-assistant-using-open-source-tools.html
prev: /programming/py/articles/README.md
date: 2025-11-06
isOriginal: false
author:
  - name: Surya Teja Appini
    url : https://freecodecamp.org/news/author/appinisurya/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762380694991/10687751-7aec-4d78-8af8-1f76edc28afd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools"
  desc="Most commercial voice assistants send your voice data to cloud servers before responding. By using open‑source tools, you can run everything directly on your phone for better privacy, faster responses, and full control over how the assistant behaves...."
  url="https://freecodecamp.org/news/private-voice-assistant-using-open-source-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762380694991/10687751-7aec-4d78-8af8-1f76edc28afd.png"/>

Most commercial voice assistants send your voice data to cloud servers before responding. By using open‑source tools, you can run everything directly on your phone for better privacy, faster responses, and full control over how the assistant behaves.

In this tutorial, I’ll walk you through the process step-by-step. You don’t need prior experience with machine learning models, as we’ll build up the system gradually and test each part as we go. By the end, you will have a fully local mobile voice assistant powered by:

- Whisper for Automatic Speech Recognition (ASR)
- Machine Learning Compiler (MLC) LLM for on-device reasoning
- System Text-to-Speech (TTS) using built-in Android TTS

Your assistant will be able to:

- Understand your voice commands offline
- Respond to you with synthesized speech
- Perform tool calling actions (such as controlling smart devices)
- Store personal memories and preferences
- Use Retrieval-Augmented Generation (RAG) to answer questions from your own notes
- Perform multi-step agentic workflows such as generating a morning briefing and optionally sending the summary to a contact

This tutorial focuses on Android using Termux (the terminal environment for Android) for a fully local workflow.

---

## System Overview

This diagram shows how your voice moves through the assistant: speech in → transcription → reasoning → action → spoken reply.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762319872832/7b52b715-79c0-4c92-b431-b84c49ba7299.png)

This pipeline describes the core flow:

- You speak into the microphone.
- Whisper converts audio into text.
- The local LLM interprets your request.
- The assistant may call tools (for example, send notifications or create events).
- The response is spoken aloud using the device’s Text-to-Speech system.

### Key Concepts Used in This Tutorial

- **Automatic Speech Recognition (ASR):** Converts your speech into text. We use Whisper or Faster‑Whisper.
- **Local Large Language Model (LLM):** A reasoning model running on your phone using the MLC engine.
- **Text‑to‑Speech (TTS):** Converts text back to speech. We use Android’s built‑in system TTS.
- **Tool Calling:** Allows the assistant to perform actions (for example, sending a notification or creating an event).
- **Memory:** Stores personalized facts the assistant learns during conversation.
- **Retrieval‑Augmented Generation (RAG):** Lets the assistant reference your documents or notes.
- **Agent Workflow:** A multi‑step chain where the assistant uses multiple abilities together.

---

## Requirements

What you should already be familiar with:

- Basic command line usage (running commands, navigating directories)
- Very basic Python (calling a function, editing a `.py` script)

You do **not** need to have:

- Machine learning experience
- A deep understanding of neural networks
- Prior experience with speech or audio models

Here are the tools and technologies you’ll need to follow along:

- An Android phone with Snapdragon 8+ Gen 1 or newer recommended (older devices will still work, but responses may be slower)
- Termux
- Python 3.9+ inside Termux
- Enough free storage (at least 4–6 GB) to store the model and audio files

::: important Why these requirements matter

Whisper and Llama models run on-device, so the phone must handle real‑time compute. MLC optimizes models for your device's GPU / NPU, so newer processors will run faster and cooler. And system TTS and Termux APIs let the assistant speak and interact with the phone locally.

If your phone is older or mid‑range, switch the model in Step 3 to `Phi-3.5-Mini` which is smaller and faster.

:::

We’ll start by setting up your Android environment with Termux, Python, media access, and storage permissions so later steps can record audio, run models, and speak.

```sh
# In Termux
pkg update && pkg upgrade -y
pkg install -y python git ffmpeg termux-api
termux-setup-storage  # grant storage permission
```

---

## Step 1: Test Microphone and Audio Playback on Android

::: info What this step does

Verifies that your device microphone and speakers work correctly through Termux before connecting them to the voice assistant.

On-device assistants need reliable access to the microphone and speakers. On Android, Termux provides utilities to record audio and play media. This avoids complex audio dependencies and works on more devices.

These commands let you quickly test your microphone and audio playback without writing any code. This is useful to verify that your device permissions and audio paths are working before introducing Whisper or TTS.

- `termux-microphone-record` records from the device microphone to a `.wav` file
- `termux-media-player` plays audio files
- `termux-tts-speak` speaks text using the system TTS voice (fast fallback)

:::

```sh
# Start a 4 second recording
termux-microphone-record -f in.wav -l 4 && termux-microphone-record -q

# Play back the captured audio
termux-media-player play in.wav

# Speak text via system TTS (fallback if you do not install a Python TTS)
termux-tts-speak "Hello, this is your on-device assistant running locally."
```

---

## Step 2: Install and Run Whisper for ASR

::: info What this step does

Converts recorded speech into text so the language model can understand what you said.

Whisper listens to your audio recording and converts it into text. Smaller versions like `tiny` or `base` run faster on most phones and are good enough for everyday commands.

Install Whisper:

```sh
pip install openai-whisper
```

If you run into installation issues, you can use Faster‑Whisper instead:

```sh
pip install faster-whisper
```

Below is a small Python script that takes the recorded audio file and turns it into text. It tries Whisper first, and if that isn’t available, it will automatically fall back to Faster‑Whisper.

```py
# Convert recorded speech to text (asr_transcribe.py)
import sys

# Try Whisper, fallback to Faster-Whisper if needed
try:
    import whisper
    use_faster = False
except Exception:
    use_faster = True

if use_faster:
    from faster_whisper import WhisperModel
    model = WhisperModel("tiny.en")
    segments, info = model.transcribe(sys.argv[1])
    text = " ".join(s.text for s in segments)
    print(text.strip())
else:
    model = whisper.load_model("tiny.en")
    result = model.transcribe(sys.argv[1], fp16=False)
    print(result["text"].strip())
```

:::

```sh
# Record 4 seconds and transcribe
termux-microphone-record -f in.wav -l 4 && termux-microphone-record -q
python asr_transcribe.py in.wav
```

---

## Step 3: Install a Local LLM with MLC

::: info What this step does

Installs and tests the on-device reasoning model that will generate responses to transcribed speech.

MLC compiles transformer models to mobile GPUs and Neural Processing Units, enabling on-device inference. You will run an instruction-tuned model with 4-bit or 8-bit weights for speed.

**Install the command-line interface like this:**

```sh
# Clone and install Python bindings (for scripting) and CLI
git clone https://github.com/mlc-ai/mlc-llm.git
cd mlc-llm
pip install -r requirements.txt
pip install -e python
```

We will use **Llama 3 8B Instruct q4** because it offers strong reasoning while still running on many recent Android devices. If your phone has less memory or you want faster responses, you can swap in **Phi-3.5 Mini** (about 3.8B) without changing any code.

**Download a mobile-optimized model:**

```sh
mlc_llm download Llama-3-8B-Instruct-q4f16_1
```

We will use a short Python script to send text to the model and print the response. This lets us verify that the model is installed correctly before we connect it to audio.

```py title="local_llm.py"
# Local LLM text generation
from mlc_llm import MLCEngine
import sys

engine = MLCEngine(model="Llama-3-8B-Instruct-q4f16_1")
prompt = sys.argv[1] if len(sys.argv) > 1 else "Hello"
resp = engine.chat([{"role": "user", "content": prompt}])
# The engine may return different structures across versions
reply_text = resp.get("message", resp) if isinstance(resp, dict) else str(resp)
print(reply_text)
```

:::

```sh
python local_llm.py "Summarize this in one sentence: building a local voice assistant on Android"
```

---

## Step 4: Local Text-to-Speech (TTS)

::: info What this step does

Turns the model’s text responses into spoken audio so the assistant can talk back.

This step converts the text returned by the model into spoken audio so the assistant can talk back. It uses the built-in Android Text-to-Speech voice and requires no additional Python packages.

:::

```sh
termux-tts-speak "Hello, I am running entirely on your device."
```

This is the voice output method we will use throughout the tutorial.

---

## Step 5: The Core Voice Loop

::: info What this step does

Connects speech recognition, language model reasoning, and speech synthesis into a single interactive conversation loop.

This loop ties together recording, transcription, response generation, and playback.

:::

::: tip Run it now

```py
# Core voice loop tying ASR + LLM + TTS (voice_loop.py)
import subprocess, os

def run(cmd): return subprocess.check_output(cmd).decode().strip()

print("Listening...")
subprocess.run(["termux-microphone-record", "-f", "in.wav", "-l", "4"]) ; subprocess.run(["termux-microphone-record", "-q"])
text = run(["python", "asr_transcribe.py", "in.wav"])
reply = run(["python", "local_llm.py", text])
try:
    subprocess.run(["python", "speak_xtts.py", reply]); subprocess.run(["termux-media-player", "play", "out.wav"])
except:
    subprocess.run(["termux-tts-speak", reply])
```

:::

```sh
python voice_loop.py
```

---

## Step 6: Tool Calling (Make It Act)

::: info What this step does

Enables the assistant to perform actions – not just reply – by calling real functions on your device.

Tool calling lets the assistant perform actions, not just answer. When the model recognizes an action request, it outputs a small JSON instruction, and your code runs the corresponding function. You show the model which tools exist and how to call them. The program intercepts calls and runs the corresponding code.

:::

::: tip Example use case

You say: *"Schedule a meeting tomorrow at 3 PM with John."*

The assistant:

1. Transcribes what you said.
2. Detects that this is not a question, but an action request.
3. Calls the `add_event()` function with the correct parameters.
4. Confirms: *"Okay, I scheduled that."*

Here’s the structure of how tool calls will work:

- Define Python functions such as `add_event`, `control_light`
- Provide a schema for the model to output when it wants to call a tool
- Detect that schema in the LLM output and execute the function

```py title="tools.py"
# Tool calling functions
import json

def add_event(title: str, date: str) -> dict:
    # Replace with actual calendar integration
    return {"status": "ok", "title": title, "date": date}

TOOLS = {
    "add_event": add_event,
}

def run_tool(call_json: str) -> str:
    """call_json: '{"tool":"add_event","args":{"title":"Dentist","date":"2025-11-10 10:00"}}'"""
    data = json.loads(call_json)
    name = data["tool"]
    args = data.get("args", {})
    if name in TOOLS:
        result = TOOLS[name](**args)
        return json.dumps({"tool_result": result})
    return json.dumps({"error": "unknown tool"})
```

Prompt the model to use tools:

```py title="llm_with_tools.py"
# LLM wrapper enabling tool use
from mlc_llm import MLCEngine
import json, sys

SYSTEM = (
    "You can call tools by emitting a single JSON object with keys 'tool' and 'args'. "
    "Available tools: add_event(title:str, date:str). "
    "If no tool is needed, answer directly."
)

engine = MLCEngine(model="Llama-3-8B-Instruct-q4f16_1")
user = sys.argv[1]
resp = engine.chat([
    {"role": "system", "content": SYSTEM},
    {"role": "user", "content": user},
])
print(resp.get("message", resp) if isinstance(resp, dict) else str(resp))
```

And then glue it together:

```py title="run_with_tools.py"
# Run LLM with tool call detection
import subprocess, json
from tools import run_tool

user = "Add a dentist appointment next Thursday at 10"
raw = subprocess.check_output(["python", "llm_with_tools.py", user]).decode().strip()

# If the model returned a JSON tool call, run it
try:
    data = json.loads(raw)
    if isinstance(data, dict) and "tool" in data:
        print("Tool call:", data)
        print(run_tool(raw))
    else:
        print("Assistant:", raw)
except Exception:
    print("Assistant:", raw)
```

:::

```sh
python run_with_tools.py
```

---

## Step 7: Memory and Personalization

::: info What this step does

Allows the assistant to remember personal information you share so conversations feel continuous and adaptive.

A helpful assistant should feel like it learns alongside you. Memory allows the system to keep track of small details you mention naturally in conversation.

Without memory, every conversation starts from scratch. With memory, your assistant can remember personal facts (for example, birthdays, favorite music), your routines, device settings, or notes you mention in conversation. This unlocks more natural interactions and enables personalization over time.

:::

::: tip Run it now

You can start with a simple key-value store and expand over time. Your program reads memory before inference and writes back new facts after.

```py title="memory.py"
# Simple key-value memory store
import json
from pathlib import Path

MEM_PATH = Path("memory.json")

def mem_load():
    return json.loads(MEM_PATH.read_text()) if MEM_PATH.exists() else {}

def mem_save(mem):
    MEM_PATH.write_text(json.dumps(mem, indent=2))

def remember(key: str, value: str):
    mem = mem_load()
    mem[key] = value
    mem_save(mem)
```

Use memory in the loop:

```py title="voice_loop_with_memory.py"
# Voice loop with memory loading and updating
import subprocess, json
from memory import mem_load, remember

# 1) Record and transcribe
subprocess.run(["termux-microphone-record", "-f", "in.wav", "-l", "4"]) 
subprocess.run(["termux-microphone-record", "-q"]) 
user_text = subprocess.check_output(["python", "asr_transcribe.py", "in.wav"]).decode().strip()

# 2) Load memory and add as system context
mem = mem_load()
SYSTEM = "Known facts: " + json.dumps(mem)

# 3) Ask the model
from mlc_llm import MLCEngine
engine = MLCEngine(model="Llama-3-8B-Instruct-q4f16_1")
resp = engine.chat([
    {"role": "system", "content": SYSTEM},
    {"role": "user", "content": user_text},
])
reply = resp.get("message", resp) if isinstance(resp, dict) else str(resp)
print("Assistant:", reply)

# 4) Very simple pattern: if the user said "remember X is Y", store it
if user_text.lower().startswith("remember ") and " is " in user_text:
    k, v = user_text[9:].split(" is ", 1)
    remember(k.strip(), v.strip())
```

:::

```sh
python voice_loop_with_memory.py
```

---

## Step 8: Retrieval-Augmented Generation (RAG)

::: info What this step does

Lets the assistant search your offline notes or documents at answer time, improving accuracy for personal tasks.

To use RAG, we first install a lightweight vector database, then add documents to it, and later query it when answering questions.

A language model cannot magically know details about your life, your work, or your files unless you give it a way to look things up.

[**Retrieval-Augmented Generation (RAG)**](/freecodecamp.org/learn-rag-fundamentals-and-advanced-techniques.md) bridges that gap. RAG allows the assistant to search your own stored data at query time. This means the assistant can answer questions about your projects, home details, travel plans, studies, or any personal documents you store completely offline.

RAG allows the assistant to reference your actual notes when answering, instead of relying only on the model's internal training.

Install the vector store:

```sh
pip install chromadb
```

Add and search your notes:

```py
# Local vector DB indexing and querying (rag.py)
from chromadb import Client

client = Client()
notes = client.create_collection("notes")

# Add your documents (repeat as needed)
notes.add(documents=["Contractor quote was 42000 United States Dollars for the extension."], ids=["q1"]) 

# Query the local vector database
results = notes.query(query_texts=["extension quote"], n_results=1)
context = results["documents"][0][0]
print(context)
```

Use retrieved context in responses:

```py
# LLM answering using retrieved context (llm_with_rag.py)
from mlc_llm import MLCEngine
from chromadb import Client

engine = MLCEngine(model="Llama-3-8B-Instruct-q4f16_1")
client = Client()
notes = client.get_or_create_collection("notes")

question = "What was the quoted amount for the home extension?"
res = notes.query(query_texts=[question], n_results=2)
ctx = "\n".join([d[0] for d in res["documents"]])

SYSTEM = "Use the provided context to answer accurately. If missing, say you do not know.\nContext:\n" + ctx
ans = engine.chat([
    {"role": "system", "content": SYSTEM},
    {"role": "user", "content": question},
])
print(ans.get("message", ans) if isinstance(ans, dict) else str(ans))
```

:::

```sh
python rag.py
python llm_with_rag.py
```

---

## Step 9: Multi-Step Agentic Workflow

::: info What this step does

Combines listening, reasoning, memory, and tool usage into a multi-step routine that runs automatically.

Now that the assistant can listen, respond, remember facts, and call tools, we can combine those abilities into a small routine that performs several steps automatically.

:::

::: tip Practical example: "Morning Briefing" on your phone

Goal: when you say *"Give me my morning briefing and text it to my partner"*, the assistant will:

1. Read today's agenda from a local file,
2. summarize it,
3. speak it aloud, and
4. send the summary via SMS using Termux.

![Diagram: Multi-step morning briefing workflow with retrieval, summary, speech output, and SMS action.](https://cdn.hashnode.com/res/hashnode/image/upload/v1762319593253/99e670d4-4934-47ce-a164-f0f7880ea80f.png)
<!-- TODO: mermaid 화 -->

### Prepare your agenda file

This file stores your events for the day. You can edit it manually, generate it, or sync it later if you want.

Create <VPIcon icon="iconfont icon-json"/>`agenda.json` in the same folder:

```json title="agenda.json"
{
  "2025-11-03": [
    {"time": "09:30", "title": "Standup meeting"},
    {"time": "13:00", "title": "Lunch with Priya"},
    {"time": "16:30", "title": "Gym"}
  ]
}
```

Phone-integrated tools for this workflow:

```py title="tools_phone.py"
# Phone-integrated agent tools
import json, subprocess, datetime
from pathlib import Path

AGENDA_PATH = Path("agenda.json")

def load_today_agenda():
    today = datetime.date.today().isoformat()
    if not AGENDA_PATH.exists():
        return []
    data = json.loads(AGENDA_PATH.read_text())
    return data.get(today, [])

def send_sms(number: str, text: str) -> dict:
    # Requires Termux:API and SMS permission
    subprocess.run(["termux-sms-send", "-n", number, text])
    return {"status": "sent", "to": number}

def notify(title: str, content: str) -> dict:
    subprocess.run(["termux-notification", "--title", title, "--content", content])
    return {"status": "notified"}
```

Create the agent routine:

```py :collapsed-lines title="agent_morning.py"
# Multi-step morning briefing agent
import json, subprocess, os
from mlc_llm import MLCEngine
from tools_phone import load_today_agenda, send_sms, notify

PARTNER_PHONE = os.environ.get("PARTNER_PHONE", "+15551234567")

TOOLS = {
    "send_sms": send_sms,
    "notify": notify,
}

SYSTEM = (
  "You assist on a phone. You may emit a single-line JSON when an action is needed "
  "with keys 'tool' and 'args'. Available tools: send_sms(number:str, text:str), "
  "notify(title:str, content:str). Keep messages concise. If no tool is needed, answer in plain text."
)

engine = MLCEngine(model="Llama-3-8B-Instruct-q4f16_1")

agenda = load_today_agenda()
agenda = load_today_agenda()
agenda_text = "
".join(f"{e['time']} - {e['title']}" for e in agenda) or "No events for today."

user_request = "Give me my morning briefing and text it to my partner." "Give me my morning briefing and text it to my partner."

# 1) Ask LLM for a 2-3 sentence summary to speak
summary = engine.chat([
  {"role": "system", "content": "Summarize this agenda in 2-3 sentences for a morning briefing:"},
  {"role": "user", "content": agenda_text},
])
summary_text = summary.get("message", summary) if isinstance(summary, dict) else str(summary)
print("Briefing:
", summary_text)

# 2) Speak locally (prefer XTTS, fallback to system TTS)
try:
    subprocess.run(["python", "speak_xtts.py", summary_text], check=True)
    subprocess.run(["termux-media-player", "play", "out.wav"]) 
except Exception:
    subprocess.run(["termux-tts-speak", summary_text])

# 3) Ask LLM whether to send SMS and with what text, using tool schema
resp = engine.chat([
  {"role": "system", "content": SYSTEM},
  {"role": "user", "content": f"User said: '{user_request}'. Partner phone is {PARTNER_PHONE}. Summary: {summary_text}"},
])
msg = resp.get("message", resp) if isinstance(resp, dict) else str(resp)

# 4) If the model requested a tool, execute it
try:
    data = json.loads(msg)
    if isinstance(data, dict) and data.get("tool") in TOOLS:
        # Auto-fill phone number if missing
        if data["tool"] == "send_sms" and "number" not in data.get("args", {}):
            data.setdefault("args", {})["number"] = PARTNER_PHONE
        result = TOOLS[data["tool"]](**data.get("args", {}))
        print("Tool result:", result)
    else:
        print("Assistant:", msg)
except Exception:
    print("Assistant:", msg)
```

:::

```sh
export PARTNER_PHONE=+15551234567
python agent_morning.py
```

This example is realistic on Android because it uses Termux utilities you already installed: local TTS for speech output, `termux-sms-send` for messaging, and `termux-notification` for a quick on-device confirmation. You can extend it with a Home Assistant tool later if you have a local server (for example, to toggle lights or set thermostat scenes).

---

## Conclusion and Next Steps

Building a fully local voice assistant is an incremental process. Each step you added – speech recognition, text generation, memory, retrieval, and tool execution – unlocked new capabilities and moved the system closer to behaving like a real assistant.

You built a fully local voice assistant on your phone with:

- On-device Automatic Speech Recognition with Whisper (with Faster-Whisper fallback)
- On-device reasoning with MLC Large Language Model
- Local Text-to-Speech using the built-in system TTS
- Tool calling for real actions
- Memory and personalization
- Retrieval-Augmented Generation for document-based knowledge
- A simple agent loop for multi-step work

::: tip From here you can add:

- Wake word detection (for example, Porcupine or open wake word models)
- Device-specific integrations (for example, Home Assistant, smart lighting)
- Better memory schemas and calendars or contacts adapters

:::

Your data never leaves your device, and you control every part of the stack. This is a private, customizable assistant you can expand however you like.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Private Voice Assistant: A Step-by-Step Guide Using Open-Source Tools",
  "desc": "Most commercial voice assistants send your voice data to cloud servers before responding. By using open‑source tools, you can run everything directly on your phone for better privacy, faster responses, and full control over how the assistant behaves....",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/private-voice-assistant-using-open-source-tools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
