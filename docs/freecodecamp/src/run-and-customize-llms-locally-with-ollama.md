---
lang: en-US
title: "How to Run and Customize LLMs Locally with Ollama"
description: "Article(s) > How to Run and Customize LLMs Locally with Ollama"
icon: iconfont icon-ollama
category:
  - AI
  - LLM
  - Ollama
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run and Customize LLMs Locally with Ollama"
    - property: og:description
      content: "How to Run and Customize LLMs Locally with Ollama"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/run-and-customize-llms-locally-with-ollama.html
prev: /ai/ollama/articles/README.md
date: 2026-03-03
isOriginal: false
author:
  - name: Ikegah Oliver
    url: https://freecodecamp.org/news/author/Oliverkrane/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/1d477910-f378-421b-87a2-20e390738e7c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Ollama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/ollama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run and Customize LLMs Locally with Ollama"
  desc="In the long history of technological innovation, only a few developments have been as impactful as Large Language Models (LLMs). LLMs are advanced AI systems trained on vast datasets to understand, ge"
  url="https://freecodecamp.org/news/run-and-customize-llms-locally-with-ollama"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/1d477910-f378-421b-87a2-20e390738e7c.png"/>

In the long history of technological innovation, only a few developments have been as impactful as Large Language Models (LLMs). LLMs are advanced AI systems trained on vast datasets to understand, generate, and process human language for tasks like writing, translation, summarization, and powering chatbots.

Having a powerful tool like this available offline is a game-changer. These **Local LLMs** keep high-level intelligence at your fingertips, even when you're offline. By the end of this guide, you’ll understand what local LLMs are, why they matter, and how to run them yourself, both the easy way and the more technical way.

This guide is suited but not limited to:

- Developers, technical writers, or curious engineers.
- Anyone comfortable with the terminal.
- People with some exposure to AI tools (ChatGPT, Claude, and so on).
- Anyone with little or no experience running LLMs locally.

---

## What are Local LLMs?

Local Large Language Models (LLMs) bring AI off the cloud and onto your personal hardware. While standard models are originally too large for consumer devices, a process called **quantization** reduces their numerical precision, much like compressing a large high-resolution video file so it can stream smoothly on a mobile phone. This allows powerful intelligence to run locally on your laptop without needing massive server farms.

Running models such as Meta’s Llama 3.3, Google’s Gemma 3, or Alibaba’s Qwen series locally ensures full data privacy and eliminates subscription costs. Because the AI lives on your machine, you get a fast, offline-capable workspace that keeps your code secure and under your direct control.

---

## What Running “Locally” Means

To understand how local LLMs run on your machine, you have to look into the physical components of your computer. When you run a model like Llama 3 or Mistral locally, your hardware transforms from a general-purpose machine into a specialized AI engine.

The process relies on a tight coordination between four key hardware pillars: **Storage, RAM, the GPU, and the CPU.**

### Storage (The model's permanent home)

Before you can chat, you must download the model. Unlike a standard app, an LLM is primarily a massive file of "weights", numerical values that represent everything the AI knows.

- **The Files:** You’ll likely see formats like .gguf or .safetensors. These files are large: a "small" 7B (7 billion parameter) model usually occupies **5GB to 10GB** of disk space.
- **SSD vs. HDD:** An SSD is mandatory. Because the computer must move several gigabytes of data into memory every time you launch the model, a traditional hard drive will leave you waiting minutes for the "brain" to wake up.

### VRAM and RAM (The Model’s Workspace)

This is the most critical bottleneck. For an AI to respond quickly, its entire "brain" must fit into high-speed memory.

- **VRAM (Video RAM):** This is the memory physically attached to your graphics card (GPU). It is significantly faster than regular system RAM. If your model fits entirely in VRAM, the AI will likely type faster than you can read.
- **System RAM:** If your model is too big for your GPU, the software will "spill over" into your computer’s regular RAM. While this allows you to run massive models on modest hardware, the speed penalty is severe—often dropping from 50 words per second to just one or two.

### The GPU (The Mathematical Engine)

While your CPU is the "manager" of your computer, the **GPU (Graphics Processing Unit)** is the "mathematician."

- **Parallel Power:** LLMs work by performing billions of simple math problems (matrix multiplications) at the same time. A CPU has a few powerful cores, but a GPU has thousands of smaller cores designed specifically for this parallel math.
- **Unified Memory (Apple Silicon):** On modern Macs (M1/M2/M3), the CPU and GPU share the same pool of memory. This "Unified Memory" is a game-changer for local AI, allowing even thin laptops to handle relatively large models that would typically require a chunky desktop GPU.

For optimal performance, always compare your computer's specs with the model’s requirements to see which models you can comfortably run.

---

## Why Run LLMs Locally?

Running an LLM locally isn't just for tech enthusiasts, it’s a strategic move for anyone who wants full control over their AI. Core benefits of running an LLM locally are:

1. **Offline Usage**: You're not limited to the cloud. You can explore and use your data wherever you go. Whether you're on a plane or in a remote area, your AI works without an internet connection.
2. **Privacy and data ownership**: Also, because you are not connected to the cloud, there is no risk of your data and prompts being exploited by a third party remotely or used to train a company’s next model.
3. **Cost control**: No need for monthly subscriptions and API tokens. Once you have the hardware, running the model is essentially free, given its capabilities and your configurations.
4. **Customization & Experimentation**: If you have multiple models downloaded, you can "swap brains" instantly. Try different models, fine-tune them for specific tasks, and tweak settings that big providers keep locked.
5. **Faster iteration for dev workflows**: For developers, local hosting eliminates network latency, allowing for near-instant responses and faster testing loops.

### Tradeoffs

Local LLMs have certain tradeoffs to consider:

- **Hardware Requirements:** You’ll need a decent setup—specifically, a GPU with a good amount of VRAM (usually 8GB+) or a Mac with Apple Silicon (M1/M2/M3)—to achieve smooth performance.
- **Performance Limitations:** Local models are getting better every day, but they might not yet match the sheer "reasoning power" of a massive, billion-dollar cloud cluster like GPT-4.
- **Initial Setup Friction:** It isn’t always "plug and play." If you want to get hands-on with specific features, you will have to spend some time configuring software, downloading large model files, and troubleshooting your environment.

Even with these trade-offs, having such a tool at your disposal and under your control remains a significant advantage in everyday life.

---

## How to Set Up a Local LLM

There are many ways to get and set up a local LLM, but for this guide, you will use Ollama, a user-friendly tool that brings private, secure AI directly to your desktop. You will learn to pull and deploy high-performance models with a single command, optimize them for your specific CPU/GPU configuration, and use the powerful **Modelfile** system to "program" custom AI personalities tailored to your exact needs.

What We’ll Cover:

- **The Basics:** Understanding how Ollama turns your PC into an AI powerhouse.
- **Installation & Setup:** Getting up and running in under five minutes.
- **Model Management:** How to find, "pull" (download), and run models like Llama 3 or Mistral.
- **Customization:** Writing your first **Modelfile** to give your AI a specific job or personality.

By the end of this, you will have a fully independent AI workstation, capable of sophisticated reasoning without ever sending a byte of data to the cloud.

---

## What is Ollama?

[<VPIcon icon="iconfont icon-ollama"/>Ollama](https://ollama.com/) is a free, open-source tool that makes running Large Language Models (LLMs) on your own hardware as easy as opening a web browser. It strips away the technical complexity that usually comes with AI research, giving you a clean, simple way to chat with, manage, and even customize your own AI models.

Before Ollama, running a local AI was a headache. You had to hunt for the right "weights" files on the internet, set up complex coding environments, and hope your hardware doesn't crash. Now, instead of spending hours configuring software, Ollama handles the heavy lifting. It automatically finds your graphics card (GPU) and tunes the settings for you.

---

## How Ollama Operates

Ollama follows a simple "Mental Model" that mimics how you handle apps on a phone or music on a streaming service.

### The Model Registry (The Library)

Ollama maintains a massive [<VPIcon icon="iconfont icon-ollama"/>"Library"](https://ollama.com/library), a central library of prepackaged AI models such as Llama 3, Mistral, and Gemma. You don't have to worry about file formats, you just pick a name from the list, and Ollama "pulls" it down to your machine.

### The Local Runtime (The Engine)

Once you have a model, Ollama acts as the engine. It wakes the model up, loads it into your computer's memory (RAM/VRAM), and starts the mathematical "thinking" process. It is smart enough to use your GPU for speed, but it can also run on a standard CPU if that's all you have.

### The CLI (The Control Centre)

Ollama uses a **Command Line Interface (CLI)**. While that sounds technical, it just means you type simple, human-like instructions into a terminal window. Want to talk to a model? You just tell it to run. Want to see what you've downloaded? You ask it to list them.

---

## How to Install Ollama

Go to the Ollama [<VPIcon icon="iconfont icon-ollama"/>download page](https://ollama.com/download). 

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>,<VPIcon icon="iconfont icon-maocs"/>

For Windows and Mac, click the download button.

![Screenshot of the Ollama download page showing macOS, Linux, and Windows options, with Windows selected and a PowerShell install command `(irm https://ollama.com/install.ps1 | iex)` plus a “Download for Windows” button (requires Windows 10 or later).](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/0e61c2b6-598f-49af-8de7-9029240ed9c2.png)

@tab <VPIcon icon="fa-brands fa-linux"/>

For Linux, run this command:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

:::

After downloading, open the file, follow the setup instructions, and install it.

On Windows and Mac, after installation, the Ollama native Desktop Application should open.

![Screenshot of the Ollama desktop app interface showing the sidebar with “New Chat” and “Settings,” a blank chat area with a llama icon, a message input field, and the selected model set to `llama2:7b`.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/811604e9-ad6a-44cb-afde-c842c249b32e.png)

This GUI is most beneficial for those who feel the CLI is intimidating; you don't have to be a coder to use Ollama. Instead of typing commands, you can manage your models and start conversations through a sleek window that feels just like any other chat app.

---

## How to Pull an LLM

As mentioned earlier, Ollama has a vast [<VPIcon icon="iconfont icon-ollama"/>library](https://ollama.com/library) of Large Language Models for different specs and uses. To download one to your computer, use the pull command followed by the name of the LLM. For example:

```sh
ollama pull gemma3:1b
```

To see the models you downloaded or have, use the list command, like:

```sh
ollama list
```

---

## How to Run Your LLM

You now have your LLM on your computer. To use it, you use the run command, followed by the name of the LLM. For example:

```sh
ollama run gemma3:1b
```

The LLM will load up, and you can prompt it.

![Screenshot of a Windows Command Prompt showing ollama run gemma3:1b executed successfully, with the prompt displaying “Send a message (`/?` for help)” indicating the model is ready for input.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/b78fba39-1de0-4ec8-b313-8bc19211bda9.png)

To exit the LLM, use Ctrl + d or type in `/bye`.  
You can perform other operations like deleting a model, copying a model, show information on a model, and so on. Type in ollama help to see all these commands.

![Screenshot of a command line interface on a dark background displays the help message for "ollama" with the title "Large language model runner". It includes sections for "Usage" and "Available Commands," listing options such as `serve`, `create`, `show`, `run`, `stop`, `pull`, and `list`, with brief descriptions of each. The bottom of the screen displays "Flags," which lists options such as `-h`, `--help`, `--verbose`, and `--version`.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/a30f393e-0b88-40db-b5ef-e0e1e30acc43.png)

---

## How to Customize Local LLMs in Ollama with Modelfiles

One of Ollama’s most powerful features is the ability to customize how a local model behaves using **Modelfiles**. Rather than treating models as fixed black boxes, Modelfiles allow you to define *how* a model should respond, what role it should play, and how it should generate text, without retraining or fine-tuning.

This makes Modelfiles ideal for creating reusable, task-specific local models such as technical writers, code reviewers, research assistants, internal developer tools, or even character-driven assistants.

---

## What are ModelFiles?

A Modelfile is a plain-text configuration file used by Ollama to create a new model based on an existing one. It describes how a base model should be wrapped, prompted, and configured at runtime.

Essentially, a Modelfile:

- Starts from a base model
- Applies a set of instructions
- Produces a new, named model that can be run like any other

Modelfiles do not modify the underlying model weights. Instead, they define behavioral rules, how the model should be prompted, how it should generate text, and how it should respond to user input.

### Modelfile Syntax and Structure

Modelfiles are line-based and declarative. Each directive defines a specific aspect of the model’s behavior.

A minimal <VPIcon icon="iconfont icon-ollama"/>`Modelfile` looks like this:

```dockerfile title="Modelfile
FROM llama3

SYSTEM """
You are a senior technical writer.
"""

PARAMETER temperature 0.2
```

- **FROM**: This is the foundation. It tells the system which base architecture (like llama3) to inherit its intelligence and tokenizer from.
- **SYSTEM**: This sets the "permanent" instructions. By assigning the Senior Technical Writer role, we ensure that every response maintains a professional, structured tone without needing to remind the AI in every prompt.
- **PARAMETER**: These are the model's dials and knobs. In this case, we use the temperature 0.2 parameter to set a low "creativity dial," forcing the model to be more deterministic and precise, which is ideal for the consistent, factual output.

Advanced users can also use `TEMPLATE` for custom prompt formatting and additional MESSAGE directives to include specific conversation history, though these aren't required for this basic setup.

**Quick reference cheat sheet:**

| **Directive** | **Purpose** | **Example**
| :---: | :--- | :--- |
| `FROM` | **Required**. Defines the base model. | `FROM llama3` |
| `SYSTEM` | Sets the model's persona and rules. | `SYSTEM "You are a helpful assistant."` |
| `PARAMETER` | Adjusts generation settings (randomness, context). | `PARAMETER temperature 0.2` |
| `TEMPLATE` | Formats how User/System prompts are structured. | `TEMPLATE "{{ .System }}\nUser: {{ .Prompt }}"` |
| `STOP` | Defines tokens that end the model's response. | `STOP "</s>"` |
| `MESSAGE` | Adds specific message history to the model. | `MESSAGE user "Hello!"` |

---

## How to Customize a Model

To create a model using a Modelfile, Ollama performs the following steps:

- Loads the specified base model
- Applies system-level instructions
- Configures generation parameters
- Registers the result as a new local model

For this article, you will be creating a technical writing assistant from any local LLM of your choice. You can use the LLM you downloaded earlier, or download another one you feel is a better fit for this model.

1. Set up your environment: Create a folder named `my-writing-assistant`, then open it in your preferred IDE or text editor.
2. Create a <VPIcon icon="iconfont icon-ollama"/>`Modelfile`: Create a file named <VPIcon icon="iconfont icon-ollama"/>`Modelfile` in your folder. Populate it with the following:

```dockerfile title="Modelfile"
FROM llama3 

SYSTEM """
You are a senior technical writer.
Write clear, concise explanations.
Use headings and bullet points where appropriate.
Avoid marketing language.
"""

PARAMETER temperature 0.2
PARAMETER top_p 0.9
PARAMETER repeat_penalty 1.1
PARAMETER num_ctx 4096
```

1. Create your model: Open the terminal in your IDE, or if you are using a text editor without a built-in terminal, open your Command Prompt and navigate into the my-writing-assistant directory. Run this command:

```sh
ollama create tech-writer -f Modelfile
```

You should see a response like this:

![Screenshot of a command line interface showing the successful creation of a custom model named "tech-writer" using the command ollama create `tech-writer -f Modelfile`. The terminal displays progress logs for gathering components, using existing layers, and creating new layers, ending with a "success" message.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/a403675f-396d-43af-b2ae-63bf3e56906c.png)

2. Run your model: You can run your model like any other Ollama model, with the run command:

```sh
ollama run tech-writer
```

![Screenshot of a command line interface showing the command ollama run tech-writer being executed. Below the command, an interactive prompt appears with the text ">>> Send a message (`/?` for help)," indicating the custom model is ready for use.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/ea8bb6a7-b64d-422c-9f52-6526ed1c8496.png)

Try a documentation-based prompt and see your model behave exactly how your Modelfile designed it.

You can also interact with your models(downloaded and modified) using the **Desktop App**. Simply open the application, select your preferred model from the chatbox dropdown menu, and start prompting.

![A screenshot of a white theme chat interface showing a model selection dropdown menu open.](https://cdn.hashnode.com/uploads/covers/6349de767b9ff550634412bf/896cd707-0695-494c-b8a8-b70ded37ce10.png)

---

## What Modelfiles Do and Don't Do

Modelfiles are powerful, but it’s important to understand their scope.

They:

- Customize model behavior
- Enforce consistent prompting
- Tune generation characteristics
- Create reusable local models

They do not:

- Retrain or fine-tune model weights
- Add new knowledge
- Change the model’s architecture

A Modelfile shapes how a model responds, not what it knows.

---

## Conclusion

Running large language models locally is no longer limited to researchers or high-end machines. With Ollama and Modelfiles, you can download capable models, run them on your own device, and tailor their behavior to fit your workflow.

In this guide, we covered what local LLMs are, why they matter, how Ollama simplifies setup, and how Modelfiles let you control tone, structure, and generation settings. Instead of relying on a generic chatbot, you can build assistants that feel intentional and purpose-built.

More importantly, running models locally changes how you interact with AI. You move from simply consuming an API to understanding and shaping the system itself. As AI continues to influence software, business, and everyday tools, hands-on experience with local models gives you a clearer view of where the technology is heading. The best way to understand that shift is to experiment, pull a model, refine a Modelfile,

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run and Customize LLMs Locally with Ollama",
  "desc": "In the long history of technological innovation, only a few developments have been as impactful as Large Language Models (LLMs). LLMs are advanced AI systems trained on vast datasets to understand, ge",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/run-and-customize-llms-locally-with-ollama.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
