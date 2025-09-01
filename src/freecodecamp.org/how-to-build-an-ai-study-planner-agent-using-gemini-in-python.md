---
lang: en-US
title: "How to Build an AI Study Planner Agent using Gemini in Python"
description: "Article(s) > How to Build an AI Study Planner Agent using Gemini in Python"
icon: iconfont icon-flask
category:
  - Python
  - Flask
  - CSS
  - TailwindCSS
  - AI
  - LLM
  - Google 
  - GOogle Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - flask
  - py-flask
  - css
  - tailwindcss
  - tailwind-css
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - gemini
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Study Planner Agent using Gemini in Python"
    - property: og:description
      content: "How to Build an AI Study Planner Agent using Gemini in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-study-planner-agent-using-gemini-in-python.html
prev: /programming/py-flask/articles/README.md
date: 2025-09-06
isOriginal: false
author:
  - name: Tarun Singh
    url : https://freecodecamp.org/news/author/tarunsinghofficial/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757085526077/66391609-bf27-4206-aa29-382508d15ee8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
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
  name="How to Build an AI Study Planner Agent using Gemini in Python"
  desc="The world is shifting from simple AI chatbots answering our queries to full-fledged systems that are capable of so much more. AI Agents can not only answer our queries but can also perform tasks we give them independently, making them much more power..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-study-planner-agent-using-gemini-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757085526077/66391609-bf27-4206-aa29-382508d15ee8.png"/>

The world is shifting from simple AI chatbots answering our queries to full-fledged systems that are capable of so much more. AI Agents can not only answer our queries but can also perform tasks we give them independently, making them much more powerful and useful.

In this tutorial, you’ll build an advanced, web-based agent that serves as your Virtual Study Planner. This AI agent will be able to understand your goals, make decisions, and act to achieve them.

This project goes beyond basic conversation. You’ll learn to build a goal-based agent with two key capabilities:

1. **Memory:** The agent will remember your entire conversation history, allowing it to provide follow-up advice and adapt its plans based on your feedback.
2. **Tool Use:** The agent will be capable of using a search tool to find relevant online resources, making it a more powerful assistant than one that relies solely on its internal knowledge.

You’ll learn to create a complete system with a simple web UI built with Flask and Tailwind CSS, providing a solid foundation for building even more complex agents in the future. So, let’s get started.

::: note Prerequisites

Before following this tutorial, you should have:

- Basic Python knowledge
- Basics of web development
- Python 3+ is installed on your machine
- Installed VS Code or another IDE of your choice

:::

---

## Tools You'll Be Using to Build this Agent

To build this study planner agent, you'll need a few components:

- **Google Gemini API:** This is the core AI service that provides the generative model. It allows our agent to understand natural language, reason, and generate human-like responses.
- **Flask:** This is a lightweight web framework for Python. We’ll use it to create our web server (that is, the backend). Its primary purpose here is to handle web requests from the user's browser, process them, and send back a response.
- **Tailwind CSS:** This is a CSS framework for building the user interface (that is, the frontend). Instead of writing custom CSS, you use pre-defined classes like `bg-blue-300`, `m-4`, and so on, to style the page directly in your HTML.
- **Python-dotenv:** This library helps us manage environment variables.
- **DuckDuckGo Search:** This library provides a simple way to perform real-time web searches. It acts as the "tool" for our AI agent. When a user asks a question that requires external information, our agent can use this tool to find relevant resources on the web and use that information to formulate a response.

---

## Understanding AI Agents

Before jumping into the code, let’s cover the basics so you understand what an AI agent is and what it’s capable of.

### What Are AI Agents? How Many Types Are There?

An AI agent is software that can autonomously perform tasks on a user’s behalf. AI agents perceive their surroundings, process information, and act to achieve the user’s goals. Unlike fixed programs, an agent can reason and adapt.

There are a few different types of agents, including:

- **Simple Reflex** (acts on current input, like a thermostat)
- **Model-Based** (uses an internal map, like robot vacuums)
- **Goal-Based** (plans to reach goals, like a study planner)
- **Utility-Based** (chooses best outcomes, like trading bots)
- **Learning Agents** (improve over time, like recommendation systems).

### How Are AI Agents Unique Compared to Other AI Tools?

AI agents use technologies like LLMs, but they’re distinct because of their autonomy and ability to act. Let’s understand these different types of AI tools in more detail:

1. **Large Language Models (LLMs):** LLMs are the brain of the operation. They’re trained on a very large dataset to understand and process user queries in natural language to generate human-like output. OpenAI’s GPT, Google’s Gemini, and Anthropic’s Claude are all examples of LLMs.
2. **Retrieval-Augmented Generation (RAG):** RAG is a process or a technique that allows LLMs to not only get their information from training data but also from external sources, like a database or document library, to answer user queries. While RAG retrieves information, it doesn't independently decide to perform an action or plan a sequence of steps to achieve a goal.
3. **AI Agents:** As explained above, agents are the systems that can perform user tasks using LLMs as their core reasoning engine. An agent’s full architecture allows it to perceive its environment, plan, act, and learn (memory, based on past interactions).

In this tutorial, you are going to use an LLM (Gemini) to reason, as well as a web search engine, DuckDuckGo search, for building the agent. So, now let’s move on to the next step.

---

## How to Set Up Your Environment

Before you can build your Virtual Study Planner AI agent, you’ll need to set up your development environment. Here are the steps you’ll need to follow:

### 1. Create a Project Directory

First, create a new folder with any name and move to that directory:

```sh
mkdir study-planner
cd study-planner
```

### 2. Create a Virtual Environment

In Python, it’s always recommended to work in a virtual environment. So, create one and activate it like this:

```sh
python -m venv venv
```

Now activate the virtual environment:

::: tabs

@tab:active <FontIcon icon="iconfont icon-macos"/>,<FontIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

@tab <FontIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

### 3. Install Dependencies

We’ll need a couple of packages or dependencies to build the AI study planner agent, and they include:

- `flask`: web server
- `google-generativeai`: Gemini client
- `python-dotenv`: load GEMINI_API_KEY from .env
- `requests`: useful HTTP helper (nice to have)
- `duckduckgo-search`: real web search

You can install them with a single command:

```sh
pip install flask google-generativeai python-dotenv requests duckduckgo-search
```

### 4. Get Your Gemini API Key

Go to [<FontIcon icon="fa-brands fa-google"/>Google AI Studio](https://aistudio.google.com/) and create a new account (if you don’t have one already).

![Google AI Studio Landing Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1756829119333/fd2f68f8-2d15-491e-9b9d-a5563f3d926b.png)

Next, get yourself a new API key by clicking the **Create API Key** from the [<FontIcon icon="iconfont icon-openai"/>API Keys](https://platform.openai.com/api-keys) section.

![Google AI Studio API Keys dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1756829166748/a79ec404-2267-42f3-8185-a88903f5bcaf.png)

::: note

Once the API Key is generated, SAVE it somewhere else. You may not get the same API key again.

:::

### 5. Add Your Key to the <FontIcon icon="fas fa-file-lines"/>`.env` File

Create a <FontIcon icon="fas fa-file-lines"/>`.env` file inside <FontIcon icon="fas fa-folder-open"/>`backend/` and add your API key.

```sh title=".env"
GEMINI_API_KEY=your_api_key_here
```

Now you should have set up your development environment successfully. You’re ready to build the Virtual Study Planner AI agent. Let’s start!

---

## How to Build the Real-Time Agent Logic

The core of this project is a continuous loop that accepts user input, maintains a conversation history, and sends that history to the Gemini API to generate a response. This is how we give the agent memory.

### Create the Gemini Client (with web search)

Create a new file at <FontIcon icon="fas fa-folder-open"/>`backend/`<FontIcon icon="fa-brands fa-python"/>`gemini_client.py`:

```py :collapsed-lines title="backend/gemini_client.py"
import os
from typing import List, Dict
import google.generativeai as genai
from dotenv import load_dotenv
from duckduckgo_search import DDGS

# Load environment variables
load_dotenv()

# function uses a query string and duckduckgo_search library to perform a web search
def perform_web_search(query: str, max_results: int = 6) -> List[Dict[str, str]]:
    """Perform a DuckDuckGo search and return a list of results.

    Each result contains: title, href, body.
    """
    results: List[Dict[str, str]] = []
    try:
        with DDGS() as ddgs:
            for result in ddgs.text(query, max_results=max_results):
                # result keys typically include: title, href, body
                if not isinstance(result, dict):
                    continue
                title = result.get('title') or ''
                href = result.get('href') or ''
                body = result.get('body') or ''
                if title and href:
                    results.append({
                        'title': title,
                        'href': href,
                        'body': body,
                    })
        return results
    except Exception as e:
        print(f"DuckDuckGo search error: {e}")
        return []

# A class that manages the interaction with the Gemini API and core agent logic 
class GeminiClient:
    def __init__(self):
        try:
            genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.chat = self.model.start_chat(history=[])
        except Exception as e:
            print(f"Error configuring Gemini API: {e}")
            self.chat = None

    def generate_response(self, user_input: str) -> str:
        """Generate an AI response with optional web search when prefixed.

        To trigger web search, start your message with one of:
        - "search: <query>"
        - "/search <query>"
        Otherwise, the model responds directly using chat history.
        """
        if not self.chat:
            return "AI service is not configured correctly."

        try:
            text = user_input or ""
            lower = text.strip().lower()

            # Search trigger
            search_query = None
            if lower.startswith("search:"):
                search_query = text.split(":", 1)[1].strip()
            elif lower.startswith("/search "):
                search_query = text.split(" ", 1)[1].strip()

            if search_query:
                web_results = perform_web_search(search_query, max_results=6)
                if not web_results:
                    return "I could not retrieve web results right now. Please try again."

                # Build context with numbered references
                refs_lines = []
                for idx, item in enumerate(web_results, start=1):
                    refs_lines.append(f"[{idx}] {item['title']} — {item['href']}\n{item['body']}")
                refs_block = "\n\n".join(refs_lines)

                system_prompt = (
                    "You are an AI research assistant. Use the provided web search results to answer the user query. "
                    "Synthesize concisely, cite sources inline like [1], [2] where relevant, and include a brief summary."
                )
                composed = (
                    f"<system>\n{system_prompt}\n</system>\n"
                    f"<user_query>\n{search_query}\n</user_query>\n"
                    f"<web_results>\n{refs_block}\n</web_results>"
                )
                response = self.chat.send_message(composed)
                return response.text

            # Default: normal chat
            response = self.chat.send_message(text)
            return response.text
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm sorry, I encountered an error processing your request."
```

Let’s understand what’s going on in the above code:

- The `perform_web_search()` function:
  - We keep a chat session open so the model remembers the conversation.
  - If a message starts with `search:` or `/search`, the DuckDuckGo service is called, gathers a few results, and passes them to Gemini with a short instruction to cite sources.
  - Otherwise, we just send the message as normal.
- The `GeminiClient` class:
  - The `GeminiClient` class is designed to connect and talk with Google’s Gemini AI. Inside the `__init__` method, it first calls `genai.configure()` with the API key from the environment variables, which basically unlocks access to Gemini’s services.
  - Then, `self.model = genai.GenerativeModel('gemini-1.5-flash')` loads the specific Gemini model, and `self.chat = self.model.start_chat(history=[])` starts a new conversation with no previous history. This way, the class is ready to send and receive AI responses.
  - The real action happens in `generate_response()`. If a user’s message begins with `search:` or `/search`, it triggers a DuckDuckGo search using `perform_web_search()`.
  - The results are formatted with titles, links, and snippets, and then passed to Gemini to create a clear, cited answer (you can sanitize the incoming data later by using any package in Python to make it more user-friendly in the frontend).
  - If no search command is used, it simply chats with Gemini using the given input. Error handling is built in, so instead of breaking, it returns a general safe message.

### Create the Flask Backend and Frontend

Next, we'll set up the Flask web server to connect our agent logic to a simple web interface.

#### The Flask Backend

Create a new `backend` folder inside the study-planner directory, and add a new file <FontIcon icon="fa-brands fa-python"/>`app.py`:

```py title="backend/app.py"
import os
from flask import Flask, render_template, request, jsonify
from gemini_client import GeminiClient

app = Flask(__name__, template_folder='../templates')
client = GeminiClient()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    payload = request.get_json(silent=True) or {}
    user_message = payload.get('message', '').strip()
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response_text = client.generate_response(user_message)
        return jsonify({'response': response_text})
    except Exception as e:
        return jsonify({'error': 'Error generating response'}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

What it does:

- `@app.route('/')`: This is the homepage. When a user navigates to the main URL, like, `http://localhost:5000`), Flask runs the `index()` function, which simply renders the `index.html` file. This serves the entire user interface to the browser useful when you don’t want to use the command line interface.
- Next, we have created `@app.route('/api/chat', methods=['POST'])`, the API endpoint. When the user clicks "Send" on the frontend, the JavaScript sends a `POST` request to this URL. The `chat()` function then receives the user's message, passes it to the `GeminiClient` to get a response, and then sends that response back to the frontend as a JSON object.

#### The Flask Frontend

Create a new folder named <FontIcon icon="fas fa-folder-open"/>`templates` in your project's root directory. Inside it, create a file <FontIcon icon="fa-brands fa-html5"/>`index.html`.

```xml :collapsed-lines title="templates/index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI Study Planner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        background-color: #f3f4f6;
      }
      .chat-container {
        max-width: 768px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .typing-indicator {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        color: #6b7280;
      }
      .typing-dot {
        width: 8px;
        height: 8px;
        margin: 0 2px;
        background-color: #6b7280;
        border-radius: 50%;
        animation: typing 1s infinite ease-in-out;
      }
      .message-bubble {
        padding: 1rem;
        border-radius: 1.5rem;
        max-width: 80%;
        margin-bottom: 1rem;
      }
      .user-message {
        background-color: #3b82f6;
        color: white;
        align-self: flex-end;
      }
      .agent-message {
        background-color: #e5e7eb;
        color: #374151;
        align-self: flex-start;
      }
    </style>
  </head>
  <body class="bg-gray-100">
    <div class="chat-container">
      <header
        class="bg-white shadow-sm p-4 text-center font-bold text-xl text-gray-800"
      >
        AI Study Planner
      </header>

      <main id="chat-history" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="message-bubble agent-message">
          Hello! I'm your AI Study Planner. What topic would you like to study
          today?
        </div>
      </main>

      <footer class="bg-white p-4">
        <div class="flex items-center">
          <input
            type="text"
            id="user-input"
            class="flex-1 p-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            id="send-btn"
            class="ml-4 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </footer>
    </div>

    <script>
      const chatHistory = document.getElementById("chat-history");
      const userInput = document.getElementById("user-input");
      const sendBtn = document.getElementById("send-btn");

      function addMessage(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(
          "message-bubble",
          sender === "user" ? "user-message" : "agent-message"
        );
        messageElement.textContent = text;
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }

      async function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        addMessage("user", message);
        userInput.value = "";

        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
          });

          const data = await response.json();
          if (data.response) {
            addMessage("agent", data.response);
          } else if (data.error) {
            addMessage("agent", `Error: ${data.error}`);
          } else {
            addMessage("agent", "Unexpected response from server.");
          }
        } catch (error) {
          console.error("Error:", error);
          addMessage("agent", "Sorry, something went wrong. Please try again.");
        }
      }

      sendBtn.addEventListener("click", sendMessage);
      userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      });
    </script>
  </body>
</html>
```

That’s the entire UI. It’s just one page with a text box and a send button. It contains a simple JavaScript function to handle the chat interaction. Here’s how it works:

- When the user types a message and hits "Send," it:
  - Takes the message from the input field.
  - Creates a new `user-message` bubble and displays it.
  - Uses the `fetch()` API to send the message to the backend's `/api/chat` endpoint.
  - Waits for the backend's response.
  - Once the response is received, it creates a new `agent-message` bubble and displays the AI’s reply.

---

## How to Test the AI Agent

At this point, your project structure should look like this:

```plaintext title="file structure"
study-planner/
├── backend/
│   ├── .env
│   ├── app.py
│   └── gemini_client.py
└── templates/
    └── index.html
```

Now, navigate to the <FontIcon icon="fas fa-folder-open"/>`backend` directory, and run:

```sh
cd backend
python app.py
```

If everything is set up, you’ll see the Flask app start on `http://127.0.0.1:5000` or `http://localhost:5000`.

Open that URL in your browser. That’s it, you have finally created an AI agent for yourself!

Try out asking normal questions like:

- “Make me a 3-week plan to learn Java programming for beginners.”
- “Provide me a quiz on AI agents development?”

Or you can also trigger a web search like:

- `search: resources for java`
- `/search how to prepare frontend coding interviews`

When you use the search prefix like above, the agent fetches a handful of links and asks **Gemini** to synthesize them with short inline citations like `[1]`, `[2]`. It’s great for quick research summaries.

---

## Wrapping Up

Congratulations! You now have a working study planner agent that remembers your chats and can even look things up online.

From here, you can further enhance this agent by:

- Saving user histories in a database.
- Adding authentication, handling multiple users.
- Connecting calendars or task managers, and much more.

This foundation provides a solid starting point for building even more sophisticated AI agents tailored to your specific needs.

If you found this tutorial helpful and want to discuss AI development or software development, feel free to connect with me on [X/Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`itsTarun24`)](https://x.com/itsTarun24), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`tarunsingh24`)](https://linkedin.com/in/tarunsingh24), or check out my portfolio at [<FontIcon icon="fas fa-globe"/>Blog](http://tarunportfolio.vercel.app/blog). I regularly share insights about AI, development, technical writing, and so on, and would love to see what you build with this foundation.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Study Planner Agent using Gemini in Python",
  "desc": "The world is shifting from simple AI chatbots answering our queries to full-fledged systems that are capable of so much more. AI Agents can not only answer our queries but can also perform tasks we give them independently, making them much more power...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-study-planner-agent-using-gemini-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
