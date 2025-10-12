---
lang: en-US
title: "Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation"
description: "Article(s) > Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation"
    - property: og:description
      content: "Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/prompt-engineering-cheat-sheet-for-gpt-5.html
prev: /articles/README.md
date: 2025-09-12
isOriginal: false
author:
  - name: Tarun Singh
    url : https://freecodecamp.org/news/author/tarunsinghofficial/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757672756195/67ddcb24-b8dd-4bf6-a83b-103940f4ae85.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation"
  desc="When large language models like ChatGPT first became widely available, a lot of us developers felt like we’d been handed a new superpower. We could use LLMs to help us develop new coding projects, build websites, and much more – just using a few prom..."
  url="https://freecodecamp.org/news/prompt-engineering-cheat-sheet-for-gpt-5"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757672756195/67ddcb24-b8dd-4bf6-a83b-103940f4ae85.png"/>

When large language models like ChatGPT first became widely available, a lot of us developers felt like we’d been handed a new superpower. We could use LLMs to help us develop new coding projects, build websites, and much more – just using a few prompts.

LLMs were like a tireless, super knowledgeable pair programmer that could conjure code out of thin air. We’d type a quick, messy request, and out would pop something that...kind of worked. It was amazing, but also a little frustrating. The code might be buggy, inefficient, or completely miss the subtle context of our project.

But with [<VPIcon icon="iconfont icon-openai"/>GPT-5](https://platform.openai.com/docs/models/gpt-5), the game has changed quite a bit. This model doesn’t just spit out code – it reasons, adapts, and understands context like never before. Still, here’s the catch: you need to speak its language to be able to generate the best output. But how? That’s where **prompt engineering** comes in.

In this article, I’ll share 10 proven patterns that will help you transform GPT-5 from a helpful tool into a rock-solid coding partner you can trust for accuracy and speed. Let’s get started!

---

## What is GPT-5? Why You Should Use It as a Developer?

OpenAI recently launched one of its best models, GPT-5. It’s capable of performing coding and agentic tasks across various domains. Think of it as a full-stack, super-intelligent intern who’s been given a master key to the internet's knowledge. It's not just better at writing code, it can under *why* you need the code, how it should fit into a larger system, and how to debug it.

It excels at:

- **Long-context reasoning:** It can handle an entire codebase or a lengthy API documentation, a game-changer for refactoring or fixing bugs across multiple files.
- **Instruction following:** It’s far less likely to get confused by a long list of constraints or a detailed set of steps.
- **Tool use and agentic tasks:** It can intelligently decide to call an external API, execute a shell command, or search a repository to complete a task.

---

## Why Prompt Engineering?

Think of LLMs as junior developers: super smart, but literal. The way you phrase your request drastically changes the output. Prompt engineering is the art and science of crafting effective instructions for an LLM to achieve a specific goal. It’s the method you use to communicate your intent, provide necessary context, and structure your request in a way that the model can most accurately understand and respond to. When you master it, you can:

- Make GPT-5 generate working, testable code.
- Avoid vague or irrelevant answers.
- Save tokens (and money).
- Reduce the time spent editing or debugging outputs.

---

## How to Use GPT-5 for Free

While the API for GPT-5 is a **paid** service, many developers can access its power for free or at a low cost. Now, for example, the default public version of ChatGPT often uses the version of GPT-5 with certain usage caps. Many tools like **Cursor, GitHub Copilot, Microsoft Copilot** integrate GPT-5 or lighter variants.

See the screenshot below of the Cursor IDE with integration of various models, including `gpt-5-fast`, `gpt-5-low`, and so on. If you’re experimenting, this is the easiest way to explore GPT-5 without paying for direct API calls.

![Screenshot of the Cursor IDE's settings, showing various GPT-5 model options](https://cdn.hashnode.com/res/hashnode/image/upload/v1757253133347/525d9160-fce7-4310-a85e-7e7dcd9d929d.png)

For this article, we'll use a standard API call structure, but these same principles apply whether you're using a web interface or an integrated tool. Let’s dive into the patterns.

---

## Patterns Every Developer Should Know

### Persona Pattern

You know how, when you're interviewing a candidate, you might ask them to act as if they're a "Engineering Lead or Manager" or a "Frontend engineer"? This pattern is the same idea. By assigning the model a role, you give it an immediate set of assumptions and a knowledge filter.

To effectively craft a persona, be specific. For example, instead of saying "You are a developer," try "You are a senior JavaScript developer specializing in backend APIs and scalability." This provides context on their skill level, their domain, and their preferred programming language, guiding the LLM toward a more tailored and expert-level response.

::: tip Example

```py
# Python Example
from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5",
    input="""You are a senior JavaScript developer. 
    Refactor this code for readability:
    numbers = [8, 9, 10, 11, 12]; total=0
    for i in numbers: total+=i
    print(total)"""
)

print(response.output_text)
```

This code ensures answers match the tone and expertise you expect, as specified in the prompt.

:::

### Few-Shot Pattern

Sometimes, the best way to get a specific style or format of code is to provide an example. This is called "few-shot" prompting. Instead of just describing what you want, you show the model a few completed examples.

::: tip Example

```py
from openai import OpenAI

client = OpenAI()

prompt = """
Convert functions to arrow syntax:

Example:
function sum(x, y) { return x + y; }
=> const sum = (x, y) => x + y;

Then convert:
function greet(name) { return "Hey, " + name; }
"""

response = client.responses.create(
    model="gpt-5",
    input=prompt
)

print(response.output_text)
```

This code example provides a concrete, undeniable pattern for the model to follow, which is much more effective than a verbose description.

:::

### Chain-of-Thought Pattern

When faced with a complex problem, humans don't just jump to a solution instead, we think through the steps. The Chain-of-Thought pattern asks the LLM to do the same. By telling the model to “think step by step,” you're not just requesting a final answer but you're instructing it to perform internal reasoning and break down the problem into smaller, logical parts. This process is what gives you room to debug.

If the final output is incorrect, you can review its thought process to identify where the logic went wrong. This is particularly effective with GPT-5's enhanced reasoning capabilities. The LLM's reasoning might look like an intermediate, internal monologue you don't always see, but asking it to print its thought process can make it explicit.

::: tip Example

```py
prompt = """
Debug the below step by step:
My Python function loop skips the last element of the list. Check why?
"""
```

By encouraging reasoning, you reduce errors in the code.

:::

### Delimiter Pattern

When you’re giving the LLM instructions, it’s important to give it a clear way to differentiate your instructions from the data you want it to process. To do this, you can use delimiters like `###`, `"""`, or `<>` wrapped around your input text to create a clean boundary. This is a general best practice for all LLMs, as they all can struggle with this distinction without a clear signal.

::: tip Example

```py
prompt = """
Explain this code in simple and easy English:

###
for i in range(10):
    print(i**3)
###
"""
```

This helps prevent the model from misinterpreting your data as part of the instructions, particularly when the data contains instruction-like strings.

:::

### Structured Output Pattern

If you need the model's response to be easily parseable by a program, you must specify the format clearly. This is particularly important when you want to use the output as an input for a different part of your software, such as generating JSON configuration files, XML for web services, or even markdown (MD) files for documentation. By telling the model to adhere to a rigid structure, you ensure the output is consistent and reliable.

::: tip Example

```py
import json
from openai import OpenAI

client = OpenAI()

def generate_product_list(product_info):
    prompt = f"""
    Generate a JSON object for the following product information.
    The JSON should have a 'products' key, which is an array of objects.
    Each object should have keys for 'name', 'category', 'price', and 'in_stock' (a boolean).

    Product Information:
    {product_info}

    Provide only the JSON output, and nothing else.
    """

    response = client.responses.create(
        model="gpt-5",
        input=prompt
    )

    # Try to parse the response as JSON
    try:
        json_output = json.loads(response.output_text)
        return json_output
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return None

# Let's try it out
product_data = """
Laptop Pro, Electronics, 1500, True
Ergo Mouse, Accessories, 50, True
Wireless Keyboard, Accessories, 90, False
"""

product_list = generate_product_list(product_data)
if product_list:
    print(json.dumps(product_list, indent=2))
```

In this example, the `prompt` is the instruction you give to the LLM. It's a text string that outlines a clear task and specifies the output format (a JSON object with specific keys). The `response` from the model is the raw text it generates, which should be the JSON object you requested. The Python code then attempts to parse this raw text response into a structured JSON object using `json.loads()`.

:::

### Flipped Interaction Pattern

Sometimes, the best way to get GPT-5 to help you is to have it ask you some questions before it writes any code.

::: tip Example

```py
prompt = """
I want a python script to scrape travel websites for travelling data.
Ask me 5 clarifying questions before writing the code.
"""
```

This type of prompt helps prevent assumptions and will provide more accurate code.

:::

### Negative Constraint Pattern

While it’s important to tell the model what it **should do**, it’s also sometimes as important to tell it what it **should not do** or what it shouldn’t include in its response. This helps the model avoid certain words, tones, or topics.

::: tip Example

```py
from openai import OpenAI

client = OpenAI()

def my_func(technical_report):
    prompt = f"""
    Summarize the following technical report for a non-technical audience. 
    Do not use any specialized jargon, acronyms, or complex terms. 
    Use simple, everyday language.

    Technical Report:
    "{technical_report}"
    """
    response = client.responses.create(
        model="gpt-5",
        input=prompt
    )
    return response.output_text

# Let's try it out
report = (
    "The quantum entanglement protocol (QEP) showed significant improvements "
    "in qubit coherence by utilizing a novel multi-photon emission cascade. "
    "The data indicates a 12% reduction in decoherence rates, validating the "
    "hypothesis that non-linear optical feedback could mitigate environmental noise."
)

summary = my_func(report)
print(summary)
```

This pattern is a great way to fine-tune the output and steer it away from common pitfalls, overly technical language, and so on, ensuring it meets your specific requirements.

:::

### Tool Use Pattern

GPT-5 is an incredible reasoning engine, but its real power comes when it can interact with external tools, like a web search, a code interpreter, or a file retrieval system. This pattern involves providing the model with a clear description of the tools it can or should use.

::: tip Example

```py
prompt = """
You have access to a 'code_interpreter' tool.
Its purpose is to execute JavaScript code in a secure sandbox.
The tool takes a single argument: the JavaScript code as a string.

Your task is to use this tool to calculate the area of a rectangle 
with a length and breadth as 15.
After you get the result, respond with only the final answer number.
"""
```

This is what unlocks GPT-5's potential for true agentic behavior. It can autonomously solve a problem by deciding which tools to use and in what order, moving beyond simple text generation.

:::

### Verbosity Pattern

Depending on your needs, you might want more or less concise output from the LLM. With the GPT-5 API, you can adjust the level of detail and length of the output with the use of the new `text.verbosity` parameter. Just select the level of `text.verbosity` as `low`, `medium`, or `high`.

::: tip Example

```py
from openai import OpenAI

client = OpenAI()

# Low Verbosity for a concise function
def get_concise_code(description):
    prompt = f"Write a Python function for {description}."
    response = client.responses.create(
        model="gpt-5",
        input=prompt,
        metadata={"verbosity": "low"} 
    )
    return response.output_text

user_input = "a quicksort algorithm"

concise_code = get_concise_code(user_input)

print("Concise Code-\n", concise_code)
```

This saves you time by preventing the model from "over-explaining" when you just need a quick snippet, and it gives you more context when you're learning something new or working with a complex piece of code.

:::

### Code-as-Context Pattern

GPT-5’s massive context window is a game-changer for working with a full file or even a small project. Instead of just giving it a snippet, you can feed it an entire script and ask it to analyze, refactor, or optimize it.

::: tip Example

```py :collapsed-lines
async def my_optimize_codebase(code_file: str) -> str:
    prompt = f"""
    You are a performance optimization expert. Analyze the following JavaScript 
    code file for potential performance bottlenecks, redundant code, or memory leaks. 
    Provide a detailed report and then a refactored version of the code.

    Code to analyze:
    \"\"\"
    {code_file}
    \"\"\"
    """
    # For this demonstration, we'll just return the prompt
    return prompt


# User input: "your text input here"
my_code = """
// A large, unoptimized JavaScript file
const fetchData = async () => {
  const data = await fetch('https://api.example.com/data');
  const jsonData = await data.json();
  const filteredData = jsonData.filter(item => item.isActive);
  const mappedData = filteredData.map(item => {
    return {
      id: item.id,
      name: item.name.toUpperCase(),
      status: 'active'
    };
  });

  // This is a loop that could be more efficient
  const res= [];
  for (let i = 0; i < mappedData.length; i++) {
    for (let j = 0; j < 10000; j++) {
      res.append(mappedData[i])
    }
  }
  return res;
};
"""

import asyncio

async def main():
    prompt = await my_optimize_codebase(my_code)
    print(prompt)

asyncio.run(main())
```

This prompt allows GPT-5 to see the full picture. It can understand variable scope, function dependencies, and the overall logic of a file in a way that’s impossible with a single, isolated snippet.

:::

---

## Common Pitfalls to Avoid

- **Being Vague or Ambiguous:** A prompt such as “Write some code” will result in a response that lacks focus and is generic. Make sure to clarify which programming language, the specific function, output format, and any limitations that may be required.
- **Overloading a Single Prompt:** An example “Write a Python script, summarize it in three bullet points, and then translate it into French” has multiple unrelated tasks and will commonly generate disorganized or incomplete reports. Focus on complex requests and break them down into a series of prompts.
- **Failing to Iterate:** Usually, your first prompt is hardly the most accurate or relevant to the topic of discussion. A general approach is to focus on the prompts generated and go over the concerns of the first sentence as a response. Take into consideration to elaborate, incorporate more facts, and refine, hence have a conversation back and forth to achieve the desired result.

---

## Final Thoughts

With GPT-5, prompt engineering is much more complex than locating a “magic” phrase. You need to shift your thinking to software engineering and articulate it for the AI. You are not merely instructing the AI – you are defining the parameters within which it should work to arrive at an efficient solution.

You can put these 10 patterns, along with the new features of reasoning effort and verbosity control, to make GPT-5 a dependable coding assistant: generating boilerplate code, debugging, code refactoring, or app scaffolding. Start improving your prompt engineering technique with lower models like GPT-4o, Gemini, and others. Once you are ready, upgrade to GPT-5 to power real-world dev workflows.

If you found this article helpful and want to discuss AI development, LLMs, or software development, feel free to connect with me on [X/Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`itsTarun24`)](https://x.com/itsTarun24), [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tarunsingh24`)](https://linkedin.com/in/tarunsingh24), or check out my portfolio on my [<VPIcon icon="fas fa-globe"/>Blog](http://tarunportfolio.vercel.app/blog). I regularly share insights about AI, development, technical writing, and so on, and would love to see what you build with this foundation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prompt Engineering Cheat Sheet for GPT-5: Learn These Patterns for Solid Code Generation",
  "desc": "When large language models like ChatGPT first became widely available, a lot of us developers felt like we’d been handed a new superpower. We could use LLMs to help us develop new coding projects, build websites, and much more – just using a few prom...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/prompt-engineering-cheat-sheet-for-gpt-5.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
