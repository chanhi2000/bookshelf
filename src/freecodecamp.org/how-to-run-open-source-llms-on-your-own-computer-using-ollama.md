---
lang: en-US
title: "How to Run Open Source LLMs on Your Own Computer Using Ollama"
description: "Article(s) > How to Run Open Source LLMs on Your Own Computer Using Ollama"
icon: fa-brands fa-meta
category:
  - AI
  - LLM
  - Meta
  - Llama
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - llm
  - large-language-model
  - meta
  - facebook
  - llama
  - ollama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Open Source LLMs on Your Own Computer Using Ollama"
    - property: og:description
      content: "How to Run Open Source LLMs on Your Own Computer Using Ollama"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-open-source-llms-on-your-own-computer-using-ollama.html
prev: /ai/llama/articles/README.md
date: 2024-12-21
isOriginal: false
author: Krishna Sarathi Ghosh
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1734681473969/20c1a1cd-898a-4f48-a26f-d2d3d2917efc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Llama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run Open Source LLMs on Your Own Computer Using Ollama"
  desc="AI tools have become commonplace these days, and you may use them daily. One of the key ways to secure your confidential data – both personal and business-related – is by running your own AI on your own infrastructure. This guide will explain how to ..."
  url="https://freecodecamp.org/news/how-to-run-open-source-llms-on-your-own-computer-using-ollama"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1734681473969/20c1a1cd-898a-4f48-a26f-d2d3d2917efc.png"/>

AI tools have become commonplace these days, and you may use them daily. One of the key ways to secure your confidential data – both personal and business-related – is by running your own AI on your own infrastructure.

This guide will explain how to host an open source LLM on your computer. Doing this helps make sure you don’t compromise your data to third-party companies through cloud-based AI solutions.

::: note Prerequisites

- **A little AI knowledge**. I’ll cover the main concepts related to what we’ll be doing in the article, but some basic knowledge about LLMs will help you understand this better. No worries if you don’t know anything though – you should still find this interesting.

- **A decent computer:** A system with at least 16GB of RAM, a multi-core CPU, and preferably a GPU for optimal performance. (If you have lesser specs, it may be quite slow)
- **Internet connection**: Required to download and install the models.
- **Time and patience**

:::

---

## What is an LLM?

LLMs, or Large Language Models, are advanced AI systems that are trained to understand and generate natural human-readable language. They use algorithms to process and understand natural language and are trained on large amounts of information to understand patterns and relationships in the data.

Companies like OpenAI, Anthropic, and Meta have created LLMs that you can use to perform tasks such as generating content, analyzing code, planning trips, and so on.

---

## Cloud-Based AI vs. Self-Hosted AI

Before deciding to host an AI model locally, it’s important to understand how this approach differs from cloud-based solutions. Both options have their strengths and are suited to different use cases.

### Cloud-Based AI Solutions

These services are hosted and maintained by providers like OpenAI, Google, or AWS. Examples include OpenAI’s GPT models, Google Bard, and AWS SageMaker. You access these models over the internet using APIs or their endpoints.

::: important Key Characteristics

- **Easy to use**: Setup is minimal – you simply integrate with an API or access through the web pages.
- **Scalability**: Handles large workloads and concurrent requests better since they’re managed by companies.
- **Cutting-edge models**: Often the latest and most powerful models are available in the cloud.
- **Data dependency**: Your data is sent to the cloud for processing, which may raise privacy concerns.
- **Ongoing costs**: Though some models are free, others are typically billed per request or usage on certain models like the more powerful or latest ones, making it an operational expense.

:::

### Self-Hosted AI

With this approach, you run the model on your own hardware. Open-source LLMs like Llama 2, GPT-J, or Mistral can be downloaded and hosted using tools like Ollama.

::: important Key Characteristics

- **Data privacy**: Your data stays on your infrastructure, giving you full control over it.
- **More cost-effective over the long-term**: Requires an upfront investment in hardware, but avoids recurring API fees.
- **Customizability**: You can fine-tune and adapt models to specific needs.
- **Technical requirements**: Requires powerful hardware, setup effort, and technical know-how.
- **Limited scalability**: Best suited for personal or small-scale use.

:::

### Which Should You Choose?

If you need quick and scalable access to advanced models and don’t mind sharing data with a third party, cloud-based AI solutions are likely the better option. On the other hand, if data security, customization, or cost savings are top priorities, hosting an LLM locally could be the way to go.

---

## How Can You Run LLMs Locally on Your Machine?

There are various solutions out there that let you run certain open source LLMs on your own infrastructure.

While most locally-hosted solutions focus on **open-source LLMs**—such as Llama 2, GPT-J, or Mistral—there are cases where proprietary or licensed models can also be run locally, depending on their terms of use.

- **Open-Source Models**: These are freely available and can be downloaded, modified, and hosted without licensing restrictions. Examples include Llama 2 (Meta), GPT-J, and Mistral.
- **Proprietary Models with Local Options**: Some companies may offer downloadable versions of their models for offline use, but this often requires specific licensing or hardware. For instance, NVIDIA’s NeMo framework provides tools for hosting their models on your infrastructure, and some smaller companies may offer downloadable versions of their proprietary LLMs for enterprise customers.

Just remember that if you run your own LLM, you’ll need a powerful computer (with a good GPU and CPU). In case your computer is not very powerful, you can try running smaller and more lightweight models, though it can still be slow.

::: info

**Here’s an example of a suitable system setup that I am using for this guide**:

- CPU: Intel Core i7 13700HX
- RAM: 16GB DDR5
- STORAGE: 512GB SSD
- GPU: Nvidia RTX 3050 (6GB)

:::

In this guide, you’ll be using Ollama to download and run AI models on your PC.

### What is Ollama?

[<FontIcon icon="fas fa-globe"/>Ollama](http://ollama.com) is a tool designed to simplify the process of running open-source large language models (LLMs) directly on your computer. It acts as a local model manager and runtime, handling everything from downloading the model files to setting up a local environment where you can interact with them.

**Here’s what Ollama helps you do:**

- **Manage your models**: Ollama provides a straightforward way to browse, download, and manage different open-source models. You can view a list of supported models on their official website.
- **Deploy easily**: With just a few commands, you can set up a fully functional environment to run and interact with LLMs.
- **Host locally**: Models run entirely on your infrastructure, ensuring that your data stays private and secure.
- **Integrate different models**: It includes support for integrating models into your own projects using programming languages like Python or JavaScript.

By using Ollama, you don’t need to dive deep into the complexities of setting up machine learning frameworks or managing dependencies. It simplifies the process, especially for those who want to experiment with LLMs without needing a deep technical background.

You can install Ollama very easily through the **Download** button in their [<FontIcon icon="fas fa-globe"/>website](http://ollama.com).

![ollama official website](https://cdn.hashnode.com/res/hashnode/image/upload/v1734604517326/06605e51-4425-4dbe-b8d9-403270eec95b.png)

### How to Use Ollama to Install/Run Your Model

After you have installed Ollama, follow these steps to install and use your model:

1. Open your browser and go to `localhost:11434` to make sure Ollama is running.
2. Now, open the command prompt, and write `ollama run <model_name>`. Add your desired model name here which is supported by Ollama, say, Llama2 (by Meta) or Mistral.<br/>![picture of a command prompt window where the llama2 model is being installed](https://cdn.hashnode.com/res/hashnode/image/upload/v1734604496300/beef69ca-f6e0-44b8-a3a7-ed488e78e776.png)
3. Wait for the installation process to finish.
4. In the prompt that says `>>> Send a message (/? for help)`, write a message to the AI and press Enter.

You have successfully installed your model and now you can chat with it!

---

## Building a Chatbot with Your Newly Installed Model

With open source models running in your own infrastructure, you have a lot of freedom to alter and use the model any way you like. You can even use it to build local chatbots or applications for personal use by using the `ollama` module in Python, JavaScript, and other languages.

Now let’s walk through how you can build a chatbot with it in Python in just a few minutes.

### Step 1: Install Python

If you don’t already have Python installed, download and install it from the [<FontIcon icon="fa-brands fa-python"/>official Python website](https://python.org/). For best compatibility[,](https://python.org/) avoid using the most recent Python version, as some modules may not yet fully support it. Instead, select the latest stable version (generally the one before the most recent release) to ensure smooth functioning of all required modules.

While setting up Python, make sure to give the installer admin privileges and check the **Add to PATH** checkbox.

### Step 2: Install Ollama

Now, you need to open a new terminal window in the directory where the file is saved. You can open the directory in the File Explorer and **right click**, then click on Open in Terminal (**Open with Command Prompt** or **Powershell** if you’re using Windows 10 or a previous version).

Type `pip install ollama` and press Enter. This will install the `ollama` module for Python, so you can access your models and the functions provided by the tool from Python. Wait until the process finishes.

### Step 3: Add the Python Code

Go ahead and create a Python file with the `.py` extension somewhere in your File System, where you can access it easily. Open the file with your favourite Code Editor, and if you have none installed, you can use the online version of [<FontIcon icon="iconfont icon-vscode"/>VS Code](https://vscode.dev/) from your browser.

Now, add this code in your Python File:

```py :collapsed-lines
from ollama import chat

def stream_response(user_input):
    """Stream the response from the chat model and display it in the CLI."""
    try:
        print("\nAI: ", end="", flush=True)
        stream = chat(model='llama2', messages=[{'role': 'user', 'content': user_input}], stream=True)
        for chunk in stream:
            content = chunk['message']['content']
            print(content, end='', flush=True)
        print() 
    except Exception as e:
        print(f"\nError: {str(e)}")

def main():
    print("Welcome to your CLI AI Chatbot! Type 'exit' to quit.\n")
    while True:
        user_input = input("You: ")
        if user_input.lower() in {"exit", "quit"}:
            print("Goodbye!")
            break
        stream_response(user_input)

if __name__ == "__main__":
    main()
```

If you don’t understand Python code, here’s what it basically does:

- First, the chat module is imported from the `ollama` library, which contains pre-written code to integrate with the Ollama application on your computer.
- Then a `stream_response` function is declared, which passes oyur prompt to the specified model, and streams (provides the response chunk by chunk as it is generated) the live response back to you.
- Then in the main function, a Welcome text is printed to the terminal. It gets the user input which is passed to the `stream_response` function, all wrapped in a `while True` or infinite loop. This lets us ask the AI questions without the execution process breaking. We also specify that if the user input contains either **exit** or **quit**, the code will stop executing.

### Step 4: Write Prompts

Now go back to the terminal window and type `python filename.py`, replacing `filename` with the actual file name that you set, and press Enter.

You should see a prompt saying `You:`, just like we mentioned in the code. Write your prompt and press Enter. You should see the AI Response being streamed. To stop executing, enter the prompt `exit`, or close the Terminal window.

You can even install the module for JavaScript or any other supported language and integrate the AI in your code. Feel free to check the [Ollama Official Documentation (<FontIcon icon="iconfont icon-github"/>`ollama/ollama`)](https://github.com/ollama/ollama/blob/main/docs/README.md) and understand what can you code with the AI Models.

---

## How to Customize Your Models with Fine-Tuning

### What is Fine-Tuning?

Fine-tuning is the process of taking a pre-trained language model and training it further on a specific and custom dataset for a specific purpose. While LLMs are trained on massive datasets, they may not always perfectly align with your needs. Fine-tuning allows you to make the model better suited for your particular use case.

### How to Fine-Tune a Model

Fine-tuning requires:

- **A pre-trained model**: I’d suggest starting with a powerful open-source LLM like LLaMA, Mistral, or Falcon.
- **A quality dataset**: A **dataset** is a collection of data that is used for training, testing, or evaluating machine learning models, including LLMs. The quality and relevance of the dataset directly influence how well the model performs on a given task. Use a dataset relevant to your domain or task. For example, if you want the AI to write blog posts, train it on high-quality blog content.
- **Sufficient resources**: Fine-tuning involves re-training the model, which requires significant computational resources (preferably a machine with a powerful GPU).

For fine tuning your model, there are several tools you can use. [<FontIcon icon="fas fa-globe"/>Unsloth](https://unsloth.ai/) is a fast option to fine-tune a model with any datasets.

---

## What Are the Benefits of Self-hosted LLMs?

As I’ve briefly discussed above, there are various reasons to self-host an LLM. To summarize, here are some of the top benefits:

- Enhanced data privacy and security, as your data does not leave your computer, and you have complete control over it.
- Cost savings, as you do not need to pay for API subscriptions regularly. Instead, it’s a one-time-investment to get powerful-enough infrastructure to help you get going in the long run.
- Great customizability, as you get to tailor the models to your specific needs through fine-tuning or training on your own datasets.
- Lower latency

---

## When Should You NOT Use a Self-hosted AI?

But this might not be the right fit for you for several reasons. First, you may not have the system resources required to be able to run the models – and perhaps you don’t want to or can’t upgrade.

Second, you may not have the technical knowledge or time to set up your own model and fine tune it. It’s not terribly difficult, but it does require some background knowledge and particular skills. This can also be a problem if you don’t know how to troubleshoot errors that may come up.

You also may need your models to be up 24/7, and you might not have the infrastructure to handle it.

None of these issues are insurmountable, but they may inform your decision as to whether you use a cloud-based solution or host your own model.

---

## Conclusion

Hosting your own LLMs can be a game-changer if you value data privacy, cost-efficiency, and customization.

Tools like Ollama make it easier than ever to bring powerful AI models right to your personal infrastructure. While self-hosting isn't without its challenges, it gives you control over your data and the flexibility to adapt models to your needs.

Just make sure you assess your technical capabilities, hardware resources, and project requirements before deciding to go this way. If you need reliability, scalability, and quick access to cutting-edge features, cloud-based LLMs might still be the better fit.

If you liked this article, don’t forget to show your support, and follow me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`Codeskae`)](https://x.com/Codeskae) and [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`imkrishnasarathi`)](https://linkedin.com/in/imkrishnasarathi/) to get connected. Also, I create short but informative tech content on [YouTube (<FontIcon icon="fa-brands fa-youtube"/>`krishcodes`)](https://youtube.com/@krishcodes), so don’t forget to check out my content.

Thanks for reading this article!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run Open Source LLMs on Your Own Computer Using Ollama",
  "desc": "AI tools have become commonplace these days, and you may use them daily. One of the key ways to secure your confidential data – both personal and business-related – is by running your own AI on your own infrastructure. This guide will explain how to ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-open-source-llms-on-your-own-computer-using-ollama.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
