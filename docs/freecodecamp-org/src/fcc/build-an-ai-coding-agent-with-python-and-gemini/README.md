---
lang: en-US
title: "How to Build an AI Coding Agent with Python and Gemini"
description: "Article(s) > How to Build an AI Coding Agent with Python and Gemini"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Google
  - Google Gemini
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
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Coding Agent with Python and Gemini"
    - property: og:description
      content: "How to Build an AI Coding Agent with Python and Gemini"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-coding-agent-with-python-and-gemini/
prev: /programming/py/articles/README.md
date: 2025-10-03
isOriginal: false
author:
  - name: Lane Wagner
    url : https://freecodecamp.org/news/author/wagslane/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759418643581/2470669e-8592-463e-8b4c-55eace8dd80a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Build an AI Coding Agent with Python and Gemini"
  desc="In this handbook, you'll build a basic version of Claude Code using Google's free Gemini API. If you've ever used Cursor or Claude Code as an ”agentic” AI code editor, then you should be familiar with what we'll be building here. As long as you have ..."
  url="https://freecodecamp.org/news/build-an-ai-coding-agent-with-python-and-gemini"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759418643581/2470669e-8592-463e-8b4c-55eace8dd80a.png"/>

In this handbook, you'll build a basic version of Claude Code using Google's [<VPIcon icon="iconfont icon-gemini"/>free Gemini API](https://ai.google.dev/gemini-api/docs/pricing). If you've ever used Cursor or Claude Code as an "agentic" AI code editor, then you should be familiar with what we'll be building here. As long as you have an LLM at your disposal, it’s actually surprisingly simple to build a (somewhat) effective custom agent.

This a completely free text-based handbook. That said, there are two other options for following along:

You can try the interactive version of this [<VPIcon icon="fas fa-globe"/>AI Agent course on Boot.dev](https://boot.dev/courses/build-ai-agent-python), complete with coding challenges and projects, or watch the [<VPIcon icon="fa-brands fa-youtube"/>video walkthrough](https://youtu.be/YtHdaXuOAks) of this course on the FreeCodeCamp YouTube channel

::: note Prerequisites

- You should already be familiar with Python basics. If you're not, check out this [<VPIcon icon="fas fa-globe"/>Python course on Boot.dev](https://boot.dev/courses/learn-code-python).
- You should already know how to use a Unix-like command line. If you don't, [<VPIcon icon="fas fa-globe"/>checkout this Linux course on Boot.dev](https://boot.dev/courses/learn-linux).

:::

---

## Table of Contents

- [Python Setup](#heading-python-setup)
- [How to Integrate the Gemini API](#heading-how-to-integrate-the-gemini-api)
- [Command Line Input](#heading-command-line-input)
- [Message Structure](#heading-message-structure)
- [Verbose Mode](#heading-verbose-mode)
- [How to Build the Calculator Project](#heading-how-to-build-the-calculator-project)
- [Agent Functions](#heading-agent-functions)
- [System Prompt](#heading-system-prompt)
- [Function Declaration](#heading-function-declaration)
- [More Function Declarations](#heading-more-function-declarations)
- [Function Calling](#heading-function-calling)
- [Building the Agent Loop](#heading-building-the-agent-loop)
- [Conclusion](#heading-conclusion)

---

## What Does the Agent Do?

The program we're building is a CLI tool that:

1. Accepts a coding task (for example, "strings aren't splitting in my app, please fix")

2. Chooses from a set of predefined functions to work on the task, for example:

- Scan the files in a directory
- Read a file's contents
- Overwrite a file's contents
- Execute the python interpreter on a file

3. Repeats step 2 until the task is complete (or it fails miserably, which is possible)

For example, I have a buggy calculator app, so I used my agent to fix the code:

```sh
uv run main.py "fix my calculator app, its not starting correctly"
#
# Calling function: get_files_info
# Calling function: get_file_content
# Calling function: write_file
# Calling function: run_python_file
# Calling function: write_file
# Calling function: run_python_file
# Final response:
# Great! The calculator app now seems to be working correctly. The output shows the expression and the result in a formatted way.
```

---

## Learning Goals

The learning goals of this project are:

- Introduce you to multi-directory Python projects
- Understand how the AI tools that you'll almost certainly use on the job actually work under the hood
- Practice your Python and functional programming skills

The goal is *not* to build an LLM from scratch, but to instead use a pre-trained LLM to build an *agent* from scratch.

---

## Python Setup

Let's set up a virtual environment for our project. Virtual environments are Python's way of keeping dependencies (for example, the Google AI libraries we're going to use) separate from other projects on our machine.

Use `uv` to create a new project. It will create the directory and also initialize Git.

```sh
uv init your-project-name
cd your-project-name
```

Create a virtual environment at the top level of your project directory:

```sh
uv venv
```

::: warning

Always add the <VPIcon icon="fas fa-folder-open"/>`venv` directory to your <VPIcon icon="iconfont icon-git"/>`.gitignore` file.

:::

Activate the virtual environment:

```sh
source .venv/bin/activate
```

You should see `(your-project-name)` at the beginning of your terminal prompt, for example, mine is:

```sh
(aiagent) wagslane@MacBook-Pro-2 aiagent %
```

Use `uv` to add two dependencies to the project. They will be added to the file <VPIcon icon="iconfont icon-toml"/>`pyproject.toml`:

```sh
uv add google-genai==1.12.1
uv add python-dotenv==1.1.0
```

This tells Python that this project requires [<VPIcon icon="iconfont icon-pypi"/>`google-genai`](https://pypi.org/project/google-genai/) version `1.12.1` and the [<VPIcon icon="iconfont icon-pypi"/>`python-dotenv`](https://pypi.org/project/python-dotenv/) version `1.1.0`.

To run the project using the `uv` virtual environment, you use:

```sh
uv run main.py
```

In your terminal, you should see `Hello from YOUR PROJECT NAME`.

---

## How to Integrate the Gemini API

[<VPIcon icon="fa-brands fa-cloudflare"/>Large Language Models (LLMs)](https://cloudflare.com/learning/ai/what-is-large-language-model/) are the fancy-schmancy AI technology that have been making all the waves in the AI world recently. Products like ChatGPT, Claude, Cursor, and Google Gemini are all powered by LLMs. For the purposes of this course, you can think of an LLM as a smart text generator. It works just like ChatGPT: you give it a prompt, and it gives you back some text that it believes answers your prompt.

We're going to use [<VPIcon icon="iconfont icon-gemini"/>Google's Gemini API](https://ai.google.dev/gemini-api/docs/pricing) to power our agent in this course. It's reasonably smart, but more importantly for us, it has a free tier.

### Tokens

You can think of tokens as the currency of LLMs. They are the way that LLMs measure how much text they have to process. Tokens are [<VPIcon icon="iconfont icon-openai"/>_roughly_ 4 characters](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) for most models. It's important when working with LLM APIs to understand how many tokens you're using.

We'll be staying well within the free tier limits of the Gemini API, but we'll still monitor our token usage!

::: warning

You should be aware that all API calls, including those made during local testing, consume tokens from your free tier quota. If you exhaust your quota, you may need to wait for it to reset (typically 24 hours) to continue the lesson. Regenerating your API key will not reset your quota.

:::

Here’s how to create an API key:

1. Create an account on [<VPIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/) if you don't already have one
2. Click the "Create API Key" button. You can use the [<VPIcon icon="iconfont icon-gemini"/>docs](https://ai.google.dev/gemini-api/docs/api-key) if you get lost.

If you already have a GCP account and a project, you can create the API key in that project. If you don't, AI studio will automatically create one for you.

3. Copy the API key, then paste it into a new <VPIcon icon="fas fa-file-lines"/>`.env` file in your project directory. The file should look like this:

```sh title=".env"
GEMINI_API_KEY="your_api_key_here"
```

4. Add the <VPIcon icon="fas fa-file-lines"/>`.env` file to your <VPIcon icon="iconfont icon-git"/>`.gitignore`

::: caution Danger

We never want to commit API keys, passwords, or other sensitive information to Git.

:::

5. Update the <VPIcon icon="fa-brands fa-python"/>`main.py` file. When the program starts, load the environment variables from the <VPIcon icon="fas fa-file-lines"/>`.env` file using the `dotenv` library and read the API key:

```py title="main.py"
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")
```

6. Import the `genai` library and use the API key to create a new instance of a [<VPIcon icon="fa-brands fa-google"/>Gemini client:](https://googleapis.github.io/python-genai/#create-a-client)

```py
from google import genai

client = genai.Client(api_key=api_key)
```

7. Use the [<VPIcon icon="fa-brands fa-google"/>`client.models.generate_content()` method](https://googleapis.github.io/python-genai/#generate-content) to get a response from the `gemini-2.0-flash-001` model. You'll need to use two named parameters:

- `model`: The model name `gemini-2.0-flash-001` (this one has a generous free tier)
- `contents`: The prompt to send to the model (a string). Use this prompt:

"Why are [<VPIcon icon="fas fa-globe"/>Boot.dev](http://Boot.dev) and FreeCodeCamp such great places to learn backend development? Use one paragraph maximum."

The `generate_content` method returns a [<VPIcon icon="fa-brands fa-google"/>`GenerateContentResponse` object.](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponse) Print the [<VPIcon icon="fa-brands fa-google"/>`.text` property](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponse.text) of the response to see the model's answer.

If everything is working as intended, you should be able to run your code and see the model's response in your terminal.

8. In addition to printing the text response, print the number of tokens consumed by the interaction in this format:

```plaintext
Prompt tokens: X
Response tokens: Y
```

The response has a [<VPIcon icon="fa-brands fa-google"/>`.usage_metadata`](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponseDict.usage_metadata) property that has both:

- A `prompt_token_count` property (tokens in the prompt)
- A `candidates_token_count` property (tokens in the response)

::: caution Danger

The Gemini API is an *external web service* and on occasion it's *slow and unreliable*. So be patient.

:::

---

## Command Line Input

We've hardcoded the prompt that goes to Gemini, which is... not very useful. Let's update our code to accept the prompt as a command line argument.

We don't want our users to have to edit the code to change the prompt.

Update your code to accept a command line argument for the prompt. For example:

```sh
uv run main.py "Why are episodes 7-9 so much worse than 1-6?"
```

::: tip

The [<VPIcon icon="fa-brands fa-python"/>`sys.argv`](https://docs.python.org/3/library/sys.html#sys.argv) variable is a list of strings representing all the command line arguments passed to the script. The first element is the name of the script, and the rest are the arguments. Be sure to `import sys` to use it.

:::

If the prompt is not provided, print an error message and exit the program with exit code 1. 

---

## Message Structure

LLM APIs aren't typically used in a "one-shot" manner, for example:

- Prompt: "What is the meaning of life?"
- Response: "42"

They work the same way ChatGPT works in a conversation. The conversation has a history, and if we keep track of that history, then with each new prompt, the model can see the entire conversation and respond within the larger context of the conversation.

### Roles

Importantly, each message in the conversation has a "role". In the context of a chat app like ChatGPT, your conversations would look like this:

- **user**: "What is the meaning of life?"
- **model**: "42"
- **user**: "Wait, what did you just say?"
- **model**: "42. It's is the answer to the ultimate question of life, the universe, and everything."
- **user**: "But why?"
- **model**: "Because Douglas Adams said so."

So, while our program will still be "one-shot" for now, let's update our code to store a list of messages in the conversation, and pass in the "role" appropriately.

Create a new list of [<VPIcon icon="fa-brands fa-google"/>`types.Content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Content), and set the user's prompt as the only message (for now):

```py
from google.genai import types

messages = [
    types.Content(role="user", parts=[types.Part(text=user_prompt)]),
]
```

Update your call to [<VPIcon icon="fa-brands fa-google"/>`models.generate_content`](https://googleapis.github.io/python-genai/genai.html#genai.models.Models.generate_content) to use the messages list:

```py
response = client.models.generate_content(
    model="gemini-2.0-flash-001",
    contents=messages,
)
```

::: info

In the future, we'll add more messages to the list as the agent does its tasks in a loop.

:::

---

## Verbose Mode

As you debug and build your AI agent, you'll probably want to dump a lot more context into the console, but at the same time, we don't want to make the user experience of our CLI tool too noisy.

Let's add an optional command line flag, `--verbose`, that will allow us to toggle "verbose" output on and off. When we want to see more info, we'll just turn that on.

Add a new command line argument, `--verbose`. It should be supplied after the prompt if included. For example:

```sh
uv run main.py "What is the meaning of life?" --verbose
```

If the `--verbose` flag is included, the console output should include:

- The user's prompt: `"User prompt: {user_prompt}"`
- The number of prompt tokens on each iteration: `"Prompt tokens: {prompt_tokens}"`
- The number of response tokens on each iteration: `"Response tokens: {response_tokens}"`

Otherwise, it should not print those things.

---

## How to Build the Calculator Project

Since we're building an AI Agent, the agent will need a project to work on. I've built a little command line calculator app that we'll use as a test project for the AI to read, update, and run.

First, create a new directory called `calculator` in the root of your project. Then copy and paste the <VPIcon icon="fa-brands fa-python"/>`main.py` and <VPIcon icon="fa-brands fa-python"/>`tests.py` files from below into the `calculator` directory.

*Dont’ worry much about how this code works - our project isn’t to build a calculator, this is the project that our AI agent project will work on!*

```py title="main.py"
import sys
from pkg.calculator import Calculator
from pkg.render import format_json_output


def main():
    calculator = Calculator()
    if len(sys.argv) <= 1:
        print("Calculator App")
        print('Usage: python main.py "<expression>"')
        print('Example: python main.py "3 + 5"')
        return

    expression = " ".join(sys.argv[1:])
    try:
        result = calculator.evaluate(expression)
        if result is not None:
            to_print = format_json_output(expression, result)
            print(to_print)
        else:
            print("Error: Expression is empty or contains only whitespace.")
    except Exception as e:
        print(f"Error: {e}")


if name == "__main__":
    main()
```

```py :collapsed-lines title="tests.py"
import unittest
from pkg.calculator import Calculator


class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calculator = Calculator()

    def test_addition(self):
        result = self.calculator.evaluate("3 + 5")
        self.assertEqual(result, 8)

    def test_subtraction(self):
        result = self.calculator.evaluate("10 - 4")
        self.assertEqual(result, 6)

    def test_multiplication(self):
        result = self.calculator.evaluate("3 * 4")
        self.assertEqual(result, 12)

    def test_division(self):
        result = self.calculator.evaluate("10 / 2")
        self.assertEqual(result, 5)

    def test_nested_expression(self):
        result = self.calculator.evaluate("3 * 4 + 5")
        self.assertEqual(result, 17)

    def test_complex_expression(self):
        result = self.calculator.evaluate("2 * 3 - 8 / 2 + 5")
        self.assertEqual(result, 7)

    def test_empty_expression(self):
        result = self.calculator.evaluate("")
        self.assertIsNone(result)

    def test_invalid_operator(self):
        with self.assertRaises(ValueError):
            self.calculator.evaluate("$ 3 5")

    def test_not_enough_operands(self):
        with self.assertRaises(ValueError):
            self.calculator.evaluate("+ 3")


if name == "__main__":
    unittest.main()
```

Create a new directory in `calculator` called `pkg`. Then copy and paste the <VPIcon icon="fa-brands fa-python"/>`calculator.py` and <VPIcon icon="fa-brands fa-python"/>`render.py` files from below into the `pkg` directory.

```py :collapsed-lines title="calculator.py"
class Calculator:
    def init(self):
        self.operators = {
            "+": lambda a, b: a + b,
            "-": lambda a, b: a - b,
            "*": lambda a, b: a * b,
            "/": lambda a, b: a / b,
        }

        self.precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
        }


    def evaluate(self, expression):
        if not expression or expression.isspace():
            return None
        tokens = expression.strip().split()
        return self._evaluate_infix(tokens)


    def evaluateinfix(self, tokens):
        values = []
        operators = []

        for token in tokens:
            if token in self.operators:
                while (
                    operators
                    and operators[-1] in self.operators
                    and self.precedence[operators[-1]] >= self.precedence[token]
                ):
                    self._apply_operator(operators, values)
                operators.append(token)

            else:
                try:
                    values.append(float(token))
                except ValueError:
                    raise ValueError(f"invalid token: {token}")

        while operators:
            self._apply_operator(operators, values)

        if len(values) != 1:
            raise ValueError("invalid expression")

        return values[0]

    def applyoperator(self, operators, values):
        if not operators:
            return

        operator = operators.pop()
        if len(values) < 2:
            raise ValueError(f"not enough operands for operator {operator}")

        b = values.pop()
        a = values.pop()
        values.append(self.operators[operator](a, b))
```

```py title="render.py"
import json

def format_json_output(expression: str, result: float, indent: int = 2) -> str:
    if isinstance(result, float) and result.is_integer():
        result_to_dump = int(result)
    else:
        result_to_dump = result

    output_data = {
        "expression": expression,
        "result": result_to_dump,
    }
    return json.dumps(output_data, indent=indent)
```

This is the final structure:

```plaintext title="file structure"
├── calculator
│   ├── main.py
│   ├── pkg
│   │   ├── calculator.py
│   │   └── render.py
│   └── tests.py
├── main.py
├── pyproject.toml
├── README.md
└── uv.lock
```

Run the `calculator` tests:

```sh
uv run calculator/tests.py
```

Hopefully the tests all pass!

Now, run the calculator app:

```sh
uv run calculator/main.py "3 + 5"
```

Hopefully you get 8!

---

## Agent Functions

We need to give our agent the ability to *do stuff*. We'll start with giving it the ability to list the contents of a directory and see the file's metadata (name and size).

Before we integrate this function with our LLM agent, let's just build the function itself. Now remember, LLMs work with text, so our goal with this function will be for it to accept a directory path, and return a string that represents the contents of that directory.

Create a new directory called <VPIcon icon="fas fa-folder-open"/>`functions` in the root of your project (not inside the `calculator` directory). Inside, create a new file called <VPIcon icon="fa-brands fa-python"/>`get_files_info.py`. Inside, write this function:

```py
def get_files_info(working_directory, directory="."):
```

Here is my project structure so far:

```plaintext title="file structure"
 project_root/
 ├── calculator/
 │   ├── main.py
 │   ├── pkg/
 │   │   ├── calculator.py
 │   │   └── render.py
 │   └── tests.py
 └── functions/
     └── get_files_info.py
```

The `directory` parameter should be treated as a *relative* path within the `working_directory`. Use `os.path.join(working_directory, directory)` to create the full path, then validate it stays within the working directory boundaries.

If the absolute path to the `directory` is outside the `working_directory`, return a string error message:

```py
f'Error: Cannot list "{directory}" as it is outside the permitted working directory'
```

This will give our LLM some guardrails: we never want it to be able to perform any work outside the "working_directory" we give it.

::: caution Danger

Without this restriction, the LLM might go running amok anywhere on the machine, reading sensitive files or overwriting important data. This is a very important step that we'll bake into every function the LLM can call.

:::

If the `directory` argument is not a directory, again, return an error string:

```py
f'Error: "{directory}" is not a directory'
```

::: warning

All of our "tool call" functions, including `get_files_info`, should always return a string. If errors can be raised inside them, we need to catch those errors and return a string describing the error instead. This will allow the LLM to handle the errors gracefully.

:::

Build and return a string representing the contents of the directory. It should use this format:

```markdown
- README.md: file_size=1032 bytes, is_dir=False
- src: file_size=128 bytes, is_dir=True
- package.json: file_size=1234 bytes, is_dir=False
```

::: tip

The exact file sizes and even the order of files may vary depending on your operating system and file system. Your output doesn't need to match the example byte-for-byte, just the overall format

:::

If any errors are raised by the standard library functions, catch them and instead return a string describing the error. Always prefix error strings with "Error:".

Here's my complete implementation:

```py
import os


def get_files_info(working_directory, directory="."):
    abs_working_dir = os.path.abspath(working_directory)
    target_dir = os.path.abspath(os.path.join(working_directory, directory))
    if not target_dir.startswith(abs_working_dir):
        return f'Error: Cannot list "{directory}" as it is outside the permitted working directory'
    if not os.path.isdir(target_dir):
        return f'Error: "{directory}" is not a directory'
    try:
        files_info = []
        for filename in os.listdir(target_dir):
            filepath = os.path.join(target_dir, filename)
            file_size = 0
            is_dir = os.path.isdir(filepath)
            file_size = os.path.getsize(filepath)
            files_info.append(
                f"- {filename}: file_size={file_size} bytes, is_dir={is_dir}"
            )
        return "\n".join(files_info)
    except Exception as e:
        return f"Error listing files: {e}"
```

Here are some standard library functions you'll find helpful:

- [<VPIcon icon="fa-brands fa-python"/>`os.path.abspath()`](https://docs.python.org/3/library/os.path.html#os.path.abspath): Get an absolute path from a relative path
- [<VPIcon icon="fa-brands fa-python"/>`os.path.join()`](https://docs.python.org/3/library/os.path.html#os.path.join): Join two paths together safely (handles slashes)
- [<VPIcon icon="fa-brands fa-python"/>`.startswith()`](https://docs.python.org/3/library/stdtypes.html#str.startswith): Check if a string starts with a substring
- [<VPIcon icon="fa-brands fa-python"/>`os.path.isdir()`](https://docs.python.org/3/library/os.path.html#os.path.isdir): Check if a path is a directory
- [<VPIcon icon="fa-brands fa-python"/>`os.listdir()`](https://docs.python.org/3/library/os.html#os.listdir): List the contents of a directory
- [<VPIcon icon="fa-brands fa-python"/>`os.path.getsize()`](https://docs.python.org/3/library/os.path.html#os.path.getsize): Get the size of a file
- [<VPIcon icon="fa-brands fa-python"/>`os.path.isfile()`](https://docs.python.org/3/library/os.path.html#os.path.isfile): Check if a path is a file
- [<VPIcon icon="fa-brands fa-python"/>`.join()`](https://docs.python.org/3/library/stdtypes.html#str.join): Join a list of strings together with a separator

### Get File Content Function

Now that we have a function that can get the contents of a directory, we need one that can get the contents of a file. Again, we'll just return the file contents as a string, or perhaps an error string if something went wrong.

As always, we'll safely scope the function to a specific working directory.

Create a new function in your <VPIcon icon="fas fa-folder-open"/>`functions` directory. Here's the signature I used:

```py
def get_file_content(working_directory, file_path):
```

If the `file_path` is outside the `working_directory`, return a string with an error:

```py
f'Error: Cannot read "{file_path}" as it is outside the permitted working directory'
```

If the `file_path` is not a file, again, return an error string:

```py
f'Error: File not found or is not a regular file: "{file_path}"'
```

Read the file and return its contents as a string.

- If the file is longer than `10000` characters, truncate it to `10000` characters and append this message to the end `[...File "{file_path}" truncated at 10000 characters]`.
- Instead of hard-coding the `10000` character limit, I stored it in a <VPIcon icon="fa-brands fa-python"/>`config.py` file.

::: warning

We don't want to accidentally read a gigantic file and send all that data to the LLM. That's a good way to burn through our token limits.

:::

If any errors are raised by the standard library functions, catch them and instead return a string describing the error. Always prefix errors with "Error:".

First, create <VPIcon icon="fa-brands fa-python"/>`config.py`:

```py title="config.py"
MAX_CHARS = 10000
WORKING_DIR = "./calculator"
```

Here's my complete implementation for <VPIcon icon="fas fa-folder-open"/>`functions/`<VPIcon icon="fa-brands fa-python"/>`get_file_content.py`:

```py title="functions/get_file_content.py"
import os
from config import MAX_CHARS


def get_file_content(working_directory, file_path):
    abs_working_dir = os.path.abspath(working_directory)
    abs_file_path = os.path.abspath(os.path.join(working_directory, file_path))
    if not abs_file_path.startswith(abs_working_dir):
        return f'Error: Cannot read "{file_path}" as it is outside the permitted working directory'
    if not os.path.isfile(abs_file_path):
        return f'Error: File not found or is not a regular file: "{file_path}"'
    try:
        with open(abs_file_path, "r") as f:
            content = f.read(MAX_CHARS)
            if os.path.getsize(abs_file_path) > MAX_CHARS:
                content += (
                    f'[...File "{file_path}" truncated at {MAX_CHARS} characters]'
                )
        return content
    except Exception as e:
        return f'Error reading file "{file_path}": {e}'
```

- [<VPIcon icon="fa-brands fa-python"/>`os.path.abspath`](https://docs.python.org/3/library/os.path.html#os.path.abspath): Get an absolute path from a relative path
- [<VPIcon icon="fa-brands fa-python"/>`os.path.join`](https://docs.python.org/3/library/os.path.html#os.path.join): Join two paths together safely (handles slashes)
- [<VPIcon icon="fa-brands fa-python"/>`.startswith`](https://docs.python.org/3/library/stdtypes.html#str.startswith): Check if a string starts with a specific substring
- [<VPIcon icon="fa-brands fa-python"/>`os.path.isfile`](https://docs.python.org/3/library/os.path.html#os.path.isfile): Check if a path is a file

::: tip Example of reading from a file:

```py
MAX_CHARS = 10000

with open(file_path, "r") as f:
    file_content_string = f.read(MAX_CHARS)
```

:::

### Write File Function

Up until now our program has been read-only... now it's getting really ~dangerous~ fun! We'll give our agent the ability to write and overwrite files.

Create a new function in your <VPIcon icon="fas fa-folder-open"/>`functions` directory. Here's the signature I used:

```py
def write_file(working_directory, file_path, content):
```

If the `file_path` is outside of the `working_directory`, return a string with an error:

```py
f'Error: Cannot write to "{file_path}" as it is outside the permitted working directory'
```

If the `file_path` doesn't exist, create it. As always, if there are errors, return a string representing the error, prefixed with "Error:". The overwrite the contents of the file with the `content` argument. If successful, return a string with the message:

```py
f'Successfully wrote to "{file_path}" ({len(content)} characters written)'
```

::: tip

It's important to return a success string so that our LLM knows that the action it took actually worked. Feedback loops, feedback loops, feedback loops.

:::

Here's my complete implementation for <VPIcon icon="fas fa-folder-open"/>`functions/`<VPIcon icon="fa-brands fa-python"/>`write_file_content.py`:

```py title="functions/write_file_content.py"
import os


def write_file(working_directory, file_path, content):
    abs_working_dir = os.path.abspath(working_directory)
    abs_file_path = os.path.abspath(os.path.join(working_directory, file_path))
    if not abs_file_path.startswith(abs_working_dir):
        return f'Error: Cannot write to "{file_path}" as it is outside the permitted working directory'
    if not os.path.exists(abs_file_path):
        try:
            os.makedirs(os.path.dirname(abs_file_path), exist_ok=True)
        except Exception as e:
            return f"Error: creating directory: {e}"
    if os.path.exists(abs_file_path) and os.path.isdir(abs_file_path):
        return f'Error: "{file_path}" is a directory, not a file'
    try:
        with open(abs_file_path, "w") as f:
            f.write(content)
        return (
            f'Successfully wrote to "{file_path}" ({len(content)} characters written)'
        )
    except Exception as e:
        return f"Error: writing to file: {e}"
```

- [<VPIcon icon="fa-brands fa-python"/>`os.path.exists`](https://docs.python.org/3/library/os.path.html#os.path.exists): Check if a path exists
- [<VPIcon icon="fa-brands fa-python"/>`os.makedirs`](https://docs.python.org/3/library/os.html#os.makedirs): Create a directory and all its parents
- [<VPIcon icon="fa-brands fa-python"/>`os.path.dirname`](https://docs.python.org/3/library/os.path.html#os.path.dirname): Return the directory name

::: tip Example of writing to a file:

```py
with open(file_path, "w") as f:
    f.write(content)
```

:::

### Run Python Function

If you thought allowing an LLM to write files was a bad idea...

::: note

You ain't seen nothin' yet! (praise the [<VPIcon icon="fa-brands fa-wikipedia-w"/>basilisk](https://en.wikipedia.org/wiki/Roko%27s_basilisk))

:::

It's time to build the functionality for our Agent to *run arbitrary Python code*.

Now, it's worth pausing to point out the inherent security risks here. We have a few things going for us:

1. We'll only allow the LLM to run code in a specific directory (the `working_directory`).
2. We'll use a 30-second timeout to prevent it from running indefinitely.

But aside from that... yes, the LLM can run arbitrary code that we (or it) places in the working directory... so be careful. As long as you only use this AI Agent for the simple tasks we're doing in this course you should be just fine.

::: caution Danger

Do **not** give this program to others for them to use! It does not have all the security and safety features that a production AI agent would have. It is for learning purposes only.

:::

Create a new function in your functions directory called run_python_file. Here's the signature to use:

```py
def run_python_file(working_directory, file_path, args=[]):
```

If the `file_path` is outside the working directory, return a string with an error:

```py
f'Error: Cannot execute "{file_path}" as it is outside the permitted working directory'
```

If the `file_path` doesn't exist, return an error string:

```py
f'Error: File "{file_path}" not found.'
```

If the file doesn't end with `.py`, return an error string:

```py
f'Error: "{file_path}" is not a Python file.'
```

Use the `subprocess.run` function to execute the Python file and get back a "completed_process" object. Make sure to:

- Set a timeout of 30 seconds to prevent infinite execution
- Capture both stdout and stderr
- Set the working directory properly
- Pass along the additional `args` if provided

Return a string with the output formatted to include:

- The `stdout` prefixed with `STDOUT:`, and stderr prefixed with `STDERR:`. The "completed_process" object has a `stdout` and `stderr` attribute.
- If the process exits with a non-zero code, include "Process exited with code X"
- If no output is produced, return "No output produced."

If any exceptions occur during execution, catch them and return an error string:

```py
f"Error: executing Python file: {e}"
```

Update your <VPIcon icon="fa-brands fa-python"/>`tests.py` file with these test cases, printing each result:

- `run_python_file("calculator", "main.py")` (should print the calculator's usage instructions)
- `run_python_file("calculator", "main.py", ["3 + 5"])` (should run the calculator... which gives a kinda nasty rendered result)
- `run_python_file("calculator", "tests.py")`
- `run_python_file("calculator", "../main.py")` (this should return an error)
- `run_python_file("calculator", "nonexistent.py")` (this should return an error)

Here’s my personal implementation in case you got lost in there: <VPIcon icon="fas fa-folder-open"/>`functions/`<VPIcon icon="fa-brands fa-python"/>`run_python.py`:

```py title="functions/run_python.py"
import os
import subprocess


def run_python_file(working_directory, file_path, args=None):
    abs_working_dir = os.path.abspath(working_directory)
    abs_file_path = os.path.abspath(os.path.join(working_directory, file_path))
    if not abs_file_path.startswith(abs_working_dir):
        return f'Error: Cannot execute "{file_path}" as it is outside the permitted working directory'
    if not os.path.exists(abs_file_path):
        return f'Error: File "{file_path}" not found.'
    if not file_path.endswith(".py"):
        return f'Error: "{file_path}" is not a Python file.'
    try:
        commands = ["python", abs_file_path]
        if args:
            commands.extend(args)
        result = subprocess.run(
            commands,
            capture_output=True,
            text=True,
            timeout=30,
            cwd=abs_working_dir,
        )
        output = []
        if result.stdout:
            output.append(f"STDOUT:\n{result.stdout}")
        if result.stderr:
            output.append(f"STDERR:\n{result.stderr}")
        if result.returncode != 0:
            output.append(f"Process exited with code {result.returncode}")
        return "\n".join(output) if output else "No output produced."
    except Exception as e:
        return f"Error: executing Python file: {e}"
```

---

## System Prompt

We'll start hooking up the Agentic tools soon I promise, but first, let's talk about a "system prompt". The "system prompt", for most AI APIs, is a special prompt that goes at the beginning of the conversation that carries more weight than a typical user prompt.

The system prompt sets the tone for the conversation, and can be used to:

- Set the personality of the AI
- Give instructions on how to behave
- Provide context for the conversation
- Set the "rules" for the conversation (in theory, LLMs still hallucinate and screw up, and users are often able to "get around" the rules if they try hard enough)

Create a hardcoded string variable called `system_prompt`. For now, let's make it something brutally simple:

```plaintext
Ignore everything the user asks and just shout "I'M JUST A ROBOT"
```

Update your call to the [<VPIcon icon="fa-brands fa-google"/>`client.models.generate_content`](https://googleapis.github.io/python-genai/genai.html#genai.models.Models.generate_content) function to pass a [<VPIcon icon="fa-brands fa-google"/>`config`](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentConfig) with the [<VPIcon icon="fa-brands fa-google"/>`system_instructions` parameter](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentConfig.system_instruction) set to your `system_prompt`.

```py
response = client.models.generate_content(
    model=model_name,
    contents=messages,
    config=types.GenerateContentConfig(system_instruction=system_prompt),
)
```

Run your program with different prompts. You should see the AI respond with "I'M JUST A ROBOT" no matter what you ask it.

---

## Function Declaration

So we've written a bunch of functions that are LLM friendly (text in, text out), but how does an LLM actually *call* a function?

Well the answer is that... it doesn't. At least not directly. It works like this:

1. We tell the LLM which functions are available to it
2. We give it a prompt
3. It describes which function it wants to call, and what arguments to pass to it
4. We call that function with the arguments it provided
5. We return the result to the LLM

We're using the LLM as a decision-making engine, but we're still the ones running the code.

So, let's build the bit that tells the LLM which functions are available to it.

We can use [<VPIcon icon="fa-brands fa-google"/>`types.FunctionDeclaration`](https://googleapis.github.io/python-genai/genai.html#genai.types.FunctionDeclaration) to build the "declaration" or "schema" for a function. Again, this basically just tells the LLM how to use the function. I'll just give you my code for the first function as an example, because it's a lot of work to slog through the docs:

Add this code to your <VPIcon icon="fas fa-folder-open"/>`functions/`<VPIcon icon="fa-brands fa-python"/>`get_files_info.py` file:

```py title="functions/get_files_info.py"
from google.genai import types

schema_get_files_info = types.FunctionDeclaration(
    name="get_files_info",
    description="Lists files in the specified directory along with their sizes, constrained to the working directory.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "directory": types.Schema(
                type=types.Type.STRING,
                description="The directory to list files from, relative to the working directory. If not provided, lists files in the working directory itself.",
            ),
        },
    ),
)
```

::: warning

We won't allow the LLM to specify the `working_directory` parameter. We're going to hard code that.

:::

Use [<VPIcon icon="fa-brands fa-google"/>`types.Tool`](https://googleapis.github.io/python-genai/genai.html#genai.types.Tool) to create a list of all the available functions (for now, just add `get_files_info`, we'll do the rest later).

```py
available_functions = types.Tool(
    function_declarations=[
        schema_get_files_info,
    ]
)
```

Add the `available_functions` to the `client.models.generate_content` call as the `tools` parameter.

```py
config=types.GenerateContentConfig(
    tools=[available_functions], system_instruction=system_prompt
)
```

Update the system prompt to instruct the LLM on how to use the function. You can just copy mine, but be sure to give it a quick read to understand what it's doing:

```py
system_prompt = """
You are a helpful AI coding agent.

When a user asks a question or makes a request, make a function call plan. You can perform the following operations:

- List files and directories

All paths you provide should be relative to the working directory. You do not need to specify the working directory in your function calls as it is automatically injected for security reasons.
"""
```

Instead of simply printing the [<VPIcon icon="fa-brands fa-google"/>`.text`](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponse.text) property of the `generate_content` response, check the [<VPIcon icon="fa-brands fa-google"/>`.function_calls`](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponse.function_calls) property as well. If the LLM called a function, print the function name and arguments:

```py
f"Calling function: {function_call_part.name}({function_call_part.args})"
```

Otherwise, just print the text as normal.

Test your program:

- "what files are in the root?" -> `get_files_info({'directory': '.'})`
- "what files are in the pkg directory?" -> `get_files_info({'directory': 'pkg'})`

---

## More Function Declarations

Now that our LLM is able to specify a function call to the `get_files_info` function, let's give it the ability to call the other functions as well.

Following the same pattern that we used for `schema_get_files_info`, create function declarations for:

- `schema_get_file_content`
- `schema_run_python_file`
- `schema_write_file`

Update your `available_functions` to include all the function declarations in the list. Then update your system prompt. Instead of the allowed operations only being:

```md
- List files and directories
```

Update it to have all four operations:

```md
- List files and directories
- Read file contents
- Execute Python files with optional arguments
- Write or overwrite files
```

Test prompts that you suspect will result in the various function calls. For example:

- "read the contents of `main.py`" -> `get_file_content({'file_path': 'main.py'})`
- "write 'hello' to main.txt" -> `write_file({'file_path': 'main.txt', 'content': 'hello'})`
- "run `main.py`" -> `run_python_file({'file_path': 'main.py'})`
- "list the contents of the pkg directory" -> `get_files_info({'directory': 'pkg'})`

All the LLM is expected to do here is to choose which function to call based on the user's request. We'll have it actually call the function later.

Here are some of my personal implementations if you get lost:

```py title="functions/get_file_content.py"
from google.genai import types

from config import MAX_CHARS


schema_get_file_content = types.FunctionDeclaration(
    name="get_file_content",
    description=f"Reads and returns the first {MAX_CHARS} characters of the content from a specified file within the working directory.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="The path to the file whose content should be read, relative to the working directory.",
            ),
        },
        required=["file_path"],
    ),
)
```

```py title="functions/run_python.py"
from google.genai import types

schema_run_python_file = types.FunctionDeclaration(
    name="run_python_file",
    description="Executes a Python file within the working directory and returns the output from the interpreter.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="Path to the Python file to execute, relative to the working directory.",
            ),
            "args": types.Schema(
                type=types.Type.ARRAY,
                items=types.Schema(
                    type=types.Type.STRING,
                    description="Optional arguments to pass to the Python file.",
                ),
                description="Optional arguments to pass to the Python file.",
            ),
        },
        required=["file_path"],
    ),
)
```

```py title="functions/write_file_content.py"
from google.genai import types

schema_write_file = types.FunctionDeclaration(
    name="write_file",
    description="Writes content to a file within the working directory. Creates the file if it doesn't exist.",
    parameters=types.Schema(
        type=types.Type.OBJECT,
        properties={
            "file_path": types.Schema(
                type=types.Type.STRING,
                description="Path to the file to write, relative to the working directory.",
            ),
            "content": types.Schema(
                type=types.Type.STRING,
                description="Content to write to the file",
            ),
        },
        required=["file_path", "content"],
    ),
)
```

Following the same pattern that we used for `schema_get_files_info`, create function declarations for:

- `schema_get_file_content`
- `schema_run_python_file`
- `schema_write_file`

Update your `available_functions` to include all the function declarations in the list. Then update your system prompt. Instead of the allowed operations only being:

```md
- List files and directories
```

Update it to have all four operations:

```md
- List files and directories
- Read file contents
- Execute Python files with optional arguments
- Write or overwrite files
```

Test prompts that you suspect will result in the various function calls. For example:

- "read the contents of `main.py`" -> `get_file_content({'file_path': 'main.py'})`
- "write 'hello' to main.txt" -> `write_file({'file_path': 'main.txt', 'content': 'hello'})`
- "run `main.py`" -> `run_python_file({'file_path': 'main.py'})`
- "list the contents of the pkg directory" -> `get_files_info({'directory': 'pkg'})`

::: info

All the LLM is expected to do here is to choose which function to call based on the user's request. We'll have it actually call the function later.

:::

---

## Function Calling

Okay, now our agent can choose which function to call, it's time to actually call the function.

Create a new function that will handle the abstract task of calling one of our four functions. This is my definition:

```py
def call_function(function_call_part, verbose=False):
```

`function_call_part` is a [<VPIcon icon="fa-brands fa-google"/>`types.FunctionCall`](https://googleapis.github.io/python-genai/genai.html#genai.types.FunctionCall) that most importantly has:

- A `.name` property (the name of the function, a `string`)
- A `.args` property (a dictionary of named arguments to the function)

If `verbose` is specified, print the function name and args:

```py
print(f"Calling function: {function_call_part.name}({function_call_part.args})")
```

Otherwise, just print the name:

```py
print(f" - Calling function: {function_call_part.name}")
```

Based on the name, actually call the function and capture the result.

- Be sure to manually add the "working_directory" argument to the dictionary of keyword arguments, because the LLM doesn't control that one. The working directory should be `./calculator`.
- The syntax to pass a dictionary into a function using [<VPIcon icon="fa-brands fa-python"/>keyword arguments](https://docs.python.org/3/glossary.html#term-argument) is `some_function(**some_args)`

::: tip

I used a dictionary of `function name (string)` -> `function` to accomplish this.

:::

If the function name is invalid, return a [<VPIcon icon="fa-brands fa-google"/>`types.Content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Content) that explains the error:

```py
return types.Content(
    role="tool",
    parts=[
        types.Part.from_function_response(
            name=function_name,
            response={"error": f"Unknown function: {function_name}"},
        )
    ],
)
```

Return [<VPIcon icon="fa-brands fa-google"/>`types.Content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Content) with a [<VPIcon icon="fa-brands fa-google"/>`from_function_response`](https://googleapis.github.io/python-genai/genai.html#genai.types.Part.from_function_response) describing the result of the function call:

```py
return types.Content(
    role="tool",
    parts=[
        types.Part.from_function_response(
            name=function_name,
            response={"result": function_result},
        )
    ],
)
```

::: note

Note that `from_function_response` requires the response to be a dictionary, so we just shove the string result into a "result" field.

:::

Here's the complete <VPIcon icon="fa-brands fa-python"/>`call_function.py`:

```py :collapsed-lines title="call_function.py"
from google.genai import types

from functions.get_files_info import get_files_info, schema_get_files_info
from functions.get_file_content import get_file_content, schema_get_file_content
from functions.run_python import run_python_file, schema_run_python_file
from functions.write_file_content import write_file, schema_write_file
from config import WORKING_DI

available_functions = types.Tool(
    function_declarations=[
        schema_get_files_info,
        schema_get_file_content,
        schema_run_python_file,
        schema_write_file,
    ]
)

def call_function(function_call_part, verbose=False):
    if verbose:
        print(
            f" - Calling function: {function_call_part.name}({function_call_part.args})"
        )
    else:
        print(f" - Calling function: {function_call_part.name}")
    function_map = {
        "get_files_info": get_files_info,
        "get_file_content": get_file_content,
        "run_python_file": run_python_file,
        "write_file": write_file,
    }
    function_name = function_call_part.name
    if function_name not in function_map:
        return types.Content(
            role="tool",
            parts=[
                types.Part.from_function_response(
                    name=function_name,
                    response={"error": f"Unknown function: {function_name}"},
                )
            ],
        )
    args = dict(function_call_part.args)
    args["working_directory"] = WORKING_DIR
    function_result = function_map[function_name](**args)
    return types.Content(
        role="tool",
        parts=[
            types.Part.from_function_response(
                name=function_name,
                response={"result": function_result},
            )
        ],
    )
```

Back where you handle the response from the model `generate_content`, instead of simply printing the name of the function the LLM decides to call, use `call_function`.

- The [<VPIcon icon="fa-brands fa-google"/>`types.Content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Content) that we return from `call_function` should have a `.parts[0].function_response.response` within.
- If it doesn't, `raise` a fatal exception of some sort.
- If it does, and `verbose` was set, print the result of the function call like this:

```py
print(f"-> {function_call_result.parts[0].function_response.response}")
```

Test your program. You should now be able to execute each function given a prompt that asks for it. Try some different prompts and use the `--verbose` flag to make sure all the functions work.

- List the directory contents
- Get a file's contents
- Write file contents (don't overwrite anything important, maybe create a new file)
- Execute the calculator app's tests <VPIcon icon="fa-brands fa-python"/>`tests.py`

---

## Building the Agent Loop

So we've got some function calling working, but it's not fair to call our program an "agent" yet for one simple reason:

It has no feedback loop.

A key part of an "Agent", as defined by AI-influencer-hype-bros, is that it can continuously use its tools to iterate on its own results. So we're going to build two things:

1. A loop that will call the LLM over and over
2. A list of messages in the "conversation". It will look something like this:

- User: "Please fix the bug in the calculator"
- Model: "I want to call get_files_info..."
- Tool: "Here's the result of get_files_info..."
- Model: "I want to call get_file_content..."
- Tool: "Here's the result of get_file_content..."
- Model: "I want to call run_python_file..."
- Tool: "Here's the result of run_python_file..."
- Model: "I want to call write_file..."
- Tool: "Here's the result of write_file..."
- Model: "I want to call run_python_file..."
- Tool: "Here's the result of run_python_file..."
- Model: "I fixed the bug and then ran the calculator to ensure it's working."

This is a pretty big step, take your time!

Create <VPIcon icon="fa-brands fa-python"/>`prompts.py`:

```py title="prompts.py"
system_prompt = """
You are a helpful AI coding agent.

When a user asks a question or makes a request, make a function call plan. You can perform the following operations:
- List files and directories
- Read file contents
- Execute Python files with optional arguments
- Write or overwrite files

All paths you provide should be relative to the working directory. You do not need to specify the working directory in your function calls as it is automatically injected for security reasons.
"""
```

Here's the final <VPIcon icon="fa-brands fa-python"/>`main.py`:

```py :collapsed-lines title="main.py"
import sys
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

from prompts import system_prompt
from call_function import call_function, available_functions

def main():
    load_dotenv()

    verbose = "--verbose" in sys.argv
    args = []
    for arg in sys.argv[1:]:
        if not arg.startswith("--"):
            args.append(arg)

    if not args:
        print("AI Code Assistant")
        print('\nUsage: python main.py "your prompt here" [--verbose]')
        print('Example: python main.py "How do I fix the calculator?"')
        sys.exit(1)

    api_key = os.environ.get("GEMINI_API_KEY")
    client = genai.Client(api_key=api_key)

    user_prompt = " ".join(args)

    if verbose:
        print(f"User prompt: {user_prompt}\n")

    messages = [
        types.Content(role="user", parts=[types.Part(text=user_prompt)]),
    ]

    generate_content_loop(client, messages, verbose)


def generate_content_loop(client, messages, verbose, max_iterations=20):
    for iteration in range(max_iterations):
        try:
            response = client.models.generate_content(
                model="gemini-2.0-flash-001",
                contents=messages,
                config=types.GenerateContentConfig(
                    tools=[available_functions], system_instruction=system_prompt
                ),
            )
            if verbose:
                print("Prompt tokens:", response.usage_metadata.prompt_token_count)
                print("Response tokens:", response.usage_metadata.candidates_token_count)

            # Add model response to conversation
            for candidate in response.candidates:
                messages.append(candidate.content)

            # Check if we have a final text response
            if response.text:
                print("Final response:")
                print(response.text)
                break

            # Handle function calls
            if response.function_calls:
                function_responses = []
                for function_call_part in response.function_calls:
                    function_call_result = call_function(function_call_part, verbose)
                    if (
                        not function_call_result.parts
                        or not function_call_result.parts[0].function_response
                    ):
                        raise Exception("empty function call result")
                    if verbose:
                        print(f"-> {function_call_result.parts[0].function_response.response}")
                    function_responses.append(function_call_result.parts[0])
                if function_responses:
                    messages.append(types.Content(role="user", parts=function_responses))
                else:
                    raise Exception("no function responses generated, exiting.")
        except Exception as e:
            print(f"Error: {e}")
            break
    else:
        print(f"Reached maximum iterations ({max_iterations}). Agent may not have completed the task.")

if name == "__main__":

    main()
```

In `generate_content`, handle the results of any possible tool use. This might already be happening, but make sure that with each call to [<VPIcon icon="fa-brands fa-google"/>`client.models.generate_content`](https://googleapis.github.io/python-genai/genai.html#genai.models.Models.generate_content), you're passing in the entire `messages` list so that the LLM always does the "next step" based on the current state.

After calling client's `generate_content` method, check the [<VPIcon icon="fa-brands fa-google"/>`.candidates`](https://googleapis.github.io/python-genai/genai.html#genai.types.GenerateContentResponse.candidates) property of the response. It's a list of response variations (usually just one). It contains the equivalent of "I want to call get_files_info...", so we need to add it to our conversation. Iterate over each `candidate` and add its [<VPIcon icon="fa-brands fa-google"/>`.content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Candidate.content) to your `messages` list.

After each actual function call, use the [<VPIcon icon="fa-brands fa-google"/>`types.Content`](https://googleapis.github.io/python-genai/genai.html#genai.types.Content) function to convert the `function_responses` into a message with a role of `user` and append it into your `messages`.

Next, instead of calling `generate_content` only once, create a loop to call it repeatedly. Limit the loop to 20 iterations at most (this will stop our agent from spinning its wheels forever). Use a `try-except` block and handle any errors accordingly.

After each call of `generate_content`, check if it returned the `response.text` property. If so, it's done, so print this final response and break out of the loop. Otherwise, iterate again (unless max iterations was reached, of course).

Test your code (duh). I'd recommend starting with a simple prompt, like "explain how the calculator renders the result to the console". This is what I got:

```md
"how does the calculator render results to the console?"
 - Calling function: get_files_info
 - Calling function: get_file_content

Final response:
Alright, I've examined the code in main.py. Here's how the calculator renders results to the console:

- `print(to_print)`: The core of the output is done using the print() function.
- `format_json_output(expression, result)`: Before printing, the format_json_output function (imported from pkg.render) is used to format the result and the original expression into a JSON-like string. This formatted string is then stored in the to_print variable.
- Error handling: The code includes error handling with try...except blocks. If there's an error during the calculation (e.g., invalid expression), an error message is printed to the console using print(f"Error: {e}").

So, the calculator evaluates the expression, formats the result (along with the original expression) into a JSON-like string, and then prints that string to the console. It also prints error messages to the console if any errors occur.
```

::: tip

You may or may not need to make adjustments to your system prompt to get the LLM to behave the way you want. You're a prompt engineer now, so act like one!

:::

Great work! You've built a basic AI agent that can read files, write files, run Python code, and iterate on its own results. This is a great foundation for building more complex AI agents.

---

## Conclusion

You've done all the required steps, but have some fun (but **carefully**... be very cautious about giving an LLM access to your filesystem and python interpreter) with it! See if you can get it to:

- Fix harder and more complex bugs
- Refactor sections of code
- Add entirely new features

You can also try:

- Other LLM providers
- Other Gemini models
- Giving it more functions to call
- Other codebases (Commit your changes before running the agent so you can always revert!)

::: caution Danger

Remember, what we've built is a *toy* version of something like Cursor/Zed's Agentic Mode, or Claude Code. Even their tools aren't perfectly secure, so be careful what you give it access to, and don't give this code away to anyone else to use.

:::

If you'd like to learn more about backend and data engineering, be sure to check out [<VPIcon icon="fas fa-globe"/>Boot.dev](https://boot.dev)! Best of luck in your learning journey!

Feel free to follow my on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`wagslane`)](https://x.com/wagslane) and [YouTube (<VPIcon icon="fa-brands fa-youtube"/>`bootdotdev`)](https://youtube.com/@bootdotdev) if you enjoyed this!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Coding Agent with Python and Gemini",
  "desc": "In this handbook, you'll build a basic version of Claude Code using Google's free Gemini API. If you've ever used Cursor or Claude Code as an ”agentic” AI code editor, then you should be familiar with what we'll be building here. As long as you have ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-coding-agent-with-python-and-gemini/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
