---
lang: en-US
title: "Building Our React Frontend"
description: "(2/2) How to Build a Team of AI Agents for Your Website for Free Using Agno and Groq"
category: 
  - Rust
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - rust
  - rs
head:
  - - meta:
    - property: og:title
      content: "(2/2) How to Build a Team of AI Agents for Your Website for Free Using Agno and Groq"
    - property: og:description
      content: "Building Our React Frontend"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-team-of-ai-agents-for-your-website-for-free/building-our-react-frontend.html
next: /freecodecamp.org/build-a-team-of-ai-agents-for-your-website-for-free/README.md#conclusion
date: 2025-04-01
isOriginal: false
author:
  - name: Andrew Baisden
    url : https://freecodecamp.org/news/author/andrewbaisden/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742397437476/0ffa13b0-c668-40d7-864f-596f523f6101.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Team of AI Agents for Your Website for Free Using Agno and Groq",
  "desc": "AI is quickly changing the way we work, and more and more companies are using it to help them get and retain clients. Teams are also using AI to create innovative and responsive websites capable of engaging visitors while also providing helpful infor...",
  "link": "/freecodecamp.org/build-a-team-of-ai-agents-for-your-website-for-free/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Team of AI Agents for Your Website for Free Using Agno and Groq"
  desc="AI is quickly changing the way we work, and more and more companies are using it to help them get and retain clients. Teams are also using AI to create innovative and responsive websites capable of engaging visitors while also providing helpful infor..."
  url="https://freecodecamp.org/news/build-a-team-of-ai-agents-for-your-website-for-free#heading-building-our-react-frontend"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742397437476/0ffa13b0-c668-40d7-864f-596f523f6101.png"/>

We have reached halfway point, and all that's left is to build your front end. We’ll build the front end using [<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/), and the website will have six pages. Make sure that you are now inside the root folder for the `ai-agent-app` project. You can leave the Python server running because your front end is going to connect to the API routes you created.

Now, run the commands below to setup your React project using Vite, Tailwind CSS, react-router and Axios, which we need for page routing and fetch requests:

```sh
npm create vite@latest frontend -- --template react
cd frontend
npm install -D tailwindcss@3 postcss autoprefixer react-router axios
npx tailwindcss init -p
npm install
```

Great, now with those packages installed and our dependencies set up, we are almost ready to start on the codebase. But before that, we need to run one more script, which is going to create all of the files and folders for our project. It's much faster than doing them all manually.

Run this command inside the frontend folder:

```sh
mkdir -p src/components src/pages
touch src/style.css src/components/{Chat,Footer,Layout,Navbar}.jsx
touch src/pages/{Career,Contact,Home,Projects,Research,Services}.jsx
```

Our React frontend should now have a project structure like the example shown below:

![AI Agent App frontend project structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1741977692485/9940901d-bd7a-49dd-a18b-ab3edf5e3714.png)

We are now ready to start writing some code.

Up first is the <VPIcon icon="fa-brands fa-js"/>`tailwind.config.js` file. This is the only configuration file you’ll need to work on, as the others already have the configuration we need. Replace all of the code in the file with the code below:

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

All this code does is add the paths to all of your template files.

Ok, next, you are going to work on your styles and Tailwind CSS. There are three CSS files to work on: <VPIcon icon="fa-brands fa-css3-alt"/>`App.css`, `<VPIcon icon="fa-brands fa-css3-alt"/>index.css`, and <VPIcon icon="fa-brands fa-css3-alt"/>`style.css`.

First up is the <VPIcon icon="fa-brands fa-css3-alt"/>`App.css` file. Replace all of the code with this code here:

```css title="App.css"
#root {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
```

We just have some basic layout styles here for `root` and `main`.

Next is the <VPIcon icon="fa-brands fa-css3-alt"/>`index.css` file. Below is the code you’ll need, so replace everything in the file with it:

```css title="index.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer components {
  .chat-container {
    @apply w-full h-96 flex flex-col;
  }

  .chat-messages {
    @apply flex-1 overflow-y-auto p-4;
  }

  .message {
    @apply flex mb-4;
  }

  .user-message {
    @apply justify-end;
  }

  .agent-message {
    @apply justify-start;
  }

  .message-avatar {
    @apply flex-shrink-0 mr-2;
  }

  .avatar-placeholder {
    @apply w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold;
  }

  .message-content {
    @apply p-3 rounded-lg max-w-xs sm:max-w-sm md:max-w-md;
  }

  .user-message .message-content {
    @apply bg-blue-500 text-white;
  }

  .agent-message .message-content {
    @apply bg-gray-200 text-gray-800;
  }

  .chat-input-container {
    @apply p-4 border-t border-gray-200;
  }

  .chat-input-group {
    @apply flex;
  }

  .chat-input {
    @apply flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .chat-send-button {
    @apply bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }

  .loading-dots:after {
    @apply content-['...'] animate-pulse;
  }

  .project-image-placeholder {
    @apply h-48 bg-gray-300 flex items-center justify-center text-gray-600 font-semibold;
  }

  .agent-avatar-placeholder {
    @apply w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mx-auto;
  }
}
```

All of these styles relate to your Tailwind CSS setup throughout your project.

Just one file remains for the CSS and it’s the <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file. This is a big file, so I will split the code into two parts - just copy and paste them into the file.

Here is the first part:

```css :collapsed-lines title="style.css"
/* Main Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #f8f9fa;
}

/* Layout Styles */
#root {
  max-width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
}

footer {
  margin-top: auto;
}

/* Navbar Styles */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: 700;
}

.navbar .container {
  max-width: 1320px;
}

/* Card Styles */
.card {
  border: none;
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1rem;
  padding: 2em;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Agent Styles */
.agent-avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}

/* Chat Container Styles */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f8f9fa;
}
```

And here is the second part:

```css
.chat-input-container {
  padding: 0.5rem;
  background-color: #fff;
  border-top: 1px solid #dee2e6;
}

.chat-input-group {
  display: flex;
}

.chat-input {
  flex: 1;
  margin-right: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

.chat-send-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.chat-send-button:hover {
  background-color: #0069d9;
}

/* Message Styles */
.message {
  margin-bottom: 1rem;
  max-width: 80%;
}

.user-message {
  margin-left: auto;
  text-align: right;
}

.agent-message {
  display: flex;
  align-items: flex-start;
}

.message-avatar {
  margin-right: 0.5rem;
}

.message-content {
  background-color: #fff;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.user-message .message-content {
  background-color: #007bff;
  color: #fff;
}

.agent-message .message-content {
  background-color: #fff;
}

/* Loading Animation */
.loading-dots:after {
  content: '.';
  animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60% {
    content: '...';
  }
  80%,
  100% {
    content: '';
  }
}
```

This code has the main styles for the layout of the website’s content. That takes care of the styling. We just have the components and pages left, and then you can run your app. Before we start on those folders, let’s quickly do the <VPIcon icon="fa-brands fa-react"/>`App.jsx` and <VPIcon icon="fa-brands fa-react"/>`main.jsx` files in the <VPIcon icon="fas fa-folder-open"/>`src` folder.

So, add this code to the <VPIcon icon="fa-brands fa-react"/>`App.jsx` file:

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Career from './pages/Career';
import Services from './pages/Services';
import Research from './pages/Research';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/career" element={<Career />} />
          <Route path="/services" element={<Services />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
```

In this file, you have all of your routes. This is how you’ll navigate between pages using `BrowserRouter`.

Finally, replace and update all of the code inside of <VPIcon icon="fa-brands fa-react"/>`main.jsx` with this:

```jsx title="main.jsx"
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './style.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

The only update we did here was add an import for `import './style.css'` so now you can access the styles from this file across your application.

Time to work on your component files, starting with the <VPIcon icon="fa-brands fa-react"/>`Chat.jsx` file. I split the codebase because it’s a big file, so make sure you add it all together.

Like before, here is the first part:

```jsx :collapsed-lines title="Chat.jsx"
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

function Chat({ agentType, initialMessage, agentInitials, directQuestion }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [processedQuestions, setProcessedQuestions] = useState([]);

  const API_BASE_URL = "http://127.0.0.1:5001";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = useCallback(
    async (questionOverride = null) => {
      const messageToSend = questionOverride || input;

      if (!messageToSend.trim()) return;

      const userMessage = {
        content: messageToSend,
        isUser: true,
      };

      setMessages((prev) => [...prev, userMessage]);

      if (!questionOverride) {
        setInput("");
      }

      setIsLoading(true);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/${agentType}`,
          {
            message: messageToSend,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (response.data && response.data.response) {
          setMessages((prev) => [
            ...prev,
            {
              content: response.data.response,
              isUser: false,
            },
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            content:
              "Sorry, there was an error connecting to the AI agent. Please make sure the Flask server is running at http://127.0.0.1:5001/",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, agentType, API_BASE_URL]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const cleanQuestion = (question) => {
    return question.replace(/\s*[\d+]\s*$/, "");
  };

  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          content: initialMessage,
          isUser: false,
        },
      ]);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
```

The first part of this code has your imports, base URL to connect to the backend, and the functions.

Now let’s add the second part of the codebase:

```jsx :collapsed-lines title="Chat.jsx"
  useEffect(() => {
    if (
      directQuestion &&
      directQuestion.trim() !== "" &&
      !processedQuestions.includes(directQuestion)
    ) {
      const cleanedQuestion = cleanQuestion(directQuestion);
      setInput(cleanedQuestion);
      handleSendMessage(cleanedQuestion);
      setProcessedQuestions((prev) => [...prev, directQuestion]);
    }
  }, [directQuestion, processedQuestions, handleSendMessage]);

  const renderContent = (content) => {
    let formattedContent = content;

    formattedContent = formattedContent.replace(
      /#{6}\s+(.*?)(?=\n|$)/g,
      "<h6>$1</h6>"
    );
    formattedContent = formattedContent.replace(
      /#{5}\s+(.*?)(?=\n|$)/g,
      "<h5>$1</h5>"
    );
    formattedContent = formattedContent.replace(
      /#{4}\s+(.*?)(?=\n|$)/g,
      "<h4>$1</h4>"
    );
    formattedContent = formattedContent.replace(
      /#{3}\s+(.*?)(?=\n|$)/g,
      "<h3>$1</h3>"
    );
    formattedContent = formattedContent.replace(
      /#{2}\s+(.*?)(?=\n|$)/g,
      "<h2>$1</h2>"
    );
    formattedContent = formattedContent.replace(
      /#{1}\s+(.*?)(?=\n|$)/g,
      "<h1>$1</h1>"
    );

    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    formattedContent = formattedContent.replace(/\*(.*?)\*/g, "<em>$1</em>");

    formattedContent = formattedContent.replace(/`(.*?)`/g, "<code>$1</code>");

    formattedContent = formattedContent.replace(
      /[(.*?)]\((.*?)\)/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    formattedContent = formattedContent.replace(
      /^\s*\*\s+(.*?)(?=\n|$)/gm,
      "<li>$1</li>"
    );
    formattedContent = formattedContent.replace(
      /<li>(.*?)<\/li>(?:\s*<li>.*?<\/li>)*/g,
      "<ul>$&</ul>"
    );

    formattedContent = formattedContent.replace(
      /^\s*\d+.\s+(.*?)(?=\n|$)/gm,
      "<li>$1</li>"
    );
    formattedContent = formattedContent.replace(
      /<li>(.*?)<\/li>(?:\s*<li>.*?<\/li>)*/g,
      "<ol>$&</ol>"
    );

    return { __html: formattedContent };
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" id={`${agentType}-messages`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser ? "user-message" : "agent-message"
            }`}
          >
            {!message.isUser && (
              <div className="message-avatar">
                <div className="avatar-placeholder">
                  {agentInitials || "AI"}
                </div>
              </div>
            )}
            <div className="message-content">
              <div dangerouslySetInnerHTML={renderContent(message.content)} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message agent-message">
            <div className="message-avatar">
              <div className="avatar-placeholder">{agentInitials || "AI"}</div>
            </div>
            <div className="message-content">
              <p className="loading-dots">Thinking</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <div className="chat-input-group">
          <input
            type="text"
            id={`${agentType}-input`}
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            id={`${agentType}-send`}
            className="chat-send-button"
            onClick={() => handleSendMessage()}
          >
            <i className="fa-solid fa-paper-plane mr-2"></i>Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
```

The second part of the code mostly has the JSX for the components.

Right, next let’s do the <VPIcon icon="fa-brands fa-react"/>`Footer.jsx` file by adding this code to the file:

```jsx :collapsed-lines title="Footer.jsx"
function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Portfolio</h5>
            <p>Showcasing my work with the help of AI agents</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h5>Connect</h5>
            <div className="social-links">
              <a href="#" className="text-white me-2"></a>
              <a href="#" className="text-white me-2"></a>
              <a href="#" className="text-white me-2"></a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

The code is pretty much self-explanatory - it has some contact details which will show up at the bottom of your page in the footer section.

Now we can work on the <VPIcon icon="fa-brands fa-react"/>`Layout.jsx`. I have also split it into two parts.

Add the first part of the codebase here:

```jsx :collapsed-lines title="Layout.jsx"
import { Link, useLocation } from "react-router";
import { useState } from "react";

function Layout({ children }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link className="text-xl font-bold" to="/">
                Portfolio
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/projects"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/projects"
                >
                  Projects
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/career"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/career"
                >
                  Career
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/services"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/services"
                >
                  Services
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/research"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/research"
                >
                  Research
                </Link>
                <Link
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === "/contact"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
```

This part of the code has a lot of components, as expected for the layout.

Here is the second part of the code to be added to the file:

```jsx :collapsed-lines title="Layout.jsx"
        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/projects"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/projects"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/career"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/career"
                onClick={() => setIsMenuOpen(false)}
              >
                Career
              </Link>
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/services"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/services"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/research"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/research"
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
              <Link
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/contact"
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h5 className="text-lg font-semibold mb-2">Portfolio</h5>
              <p className="text-gray-300">
                Showcasing my work with the help of AI agents
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
```

This code has more components, which completes the Layout component.

We’re almost done. Now for the last component, <VPIcon icon="fa-brands fa-react"/>`Navbar.jsx`, before we move on to the pages.

This is the code you need for the file:

```jsx :collapsed-lines title="Navbar.jsx"
import { Link, useLocation } from 'react-router';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Portfolio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/projects' ? 'active' : ''
                }`}
                to="/projects"
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/career' ? 'active' : ''
                }`}
                to="/career"
              >
                Career
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/services' ? 'active' : ''
                }`}
                to="/services"
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/research' ? 'active' : ''
                }`}
                to="/research"
              >
                Research
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/contact' ? 'active' : ''
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

The navbar component has your navigation links, which lets you navigate between pages using `react-router`.

Alright, the component codebase is ready! All that remains is the six page routes in our pages folder.

The first file we’ll work on will be the <VPIcon icon="fa-brands fa-react"/>`Career.jsx` file. I will split the codebase for readability like before, so copy the different sections starting with the first part here:

```jsx :collapsed-lines title="Career.jsx"
import { useState } from "react";
import Chat from "../components/Chat";

function Career() {
  const initialMessage =
    "Hello! I'm CareerAgent, the career specialist. I can provide information about skills, experience, and professional background. What would you like to know?";

  const [currentQuestion, setCurrentQuestion] = useState("");

  const askCareerQuestion = (question) => {
    setCurrentQuestion(`${question} [${Date.now()}]`);

    setTimeout(() => {
      setCurrentQuestion("");
    }, 500);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Career</h1>
          <p className="text-lg mb-4">
            Here you can find information about my professional background,
            skills, and experience. Feel free to ask CareerAgent for more
            details.
          </p>
        </div>
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Chat with CareerAgent
              </h5>
              <p className="text-gray-600 mb-4">
                Our career specialist can provide information about skills,
                experience, and professional background.
              </p>
              <Chat
                agentType="career"
                initialMessage={initialMessage}
                agentInitials="CA"
                directQuestion={currentQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">
                Frontend Development
              </h5>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  React
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Expert
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Vue.js
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Angular
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Intermediate
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  TypeScript
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  CSS/SASS
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Expert
                  </span>
                </li>
              </ul>
              <button
                className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion(
                    "Tell me more about your frontend development skills"
                  )
                }
              >
                Ask About Frontend Skills
              </button>
```

Like before, we have imports, states, and some components. Now for the second part, which is here:

```jsx :collapsed-lines title="Career.jsx"
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">
                Backend Development
              </h5>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  Node.js
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Expert
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Python
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Django
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Intermediate
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Flask
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  SQL/NoSQL
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
              </ul>
              <button
                className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion(
                    "Tell me more about your backend development skills"
                  )
                }
              >
                Ask About Backend Skills
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">Other Skills</h5>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  DevOps
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Intermediate
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  UI/UX Design
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Project Management
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Advanced
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Agile Methodologies
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Expert
                  </span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  Technical Writing
                  <span className="px-2.5 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                    Intermediate
                  </span>
                </li>
              </ul>
              <button
                className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion("What other skills do you have?")
                }
              >
                Ask About Other Skills
              </button>
            </div>
          </div>
        </div>
      </div>
```

There is a lot more component code here for the career page. Lastly, lets add the last part of the code for this page:

```jsx :collapsed-lines title="Career.jsx"
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-xl font-semibold">
                  Senior Full-Stack Developer
                </h5>
                <span className="text-gray-500 text-sm">2020 - Present</span>
              </div>
              <h6 className="text-gray-600 mb-3">Tech Innovations Inc.</h6>
              <p className="text-gray-700 mb-4">
                Lead developer for multiple web and mobile applications,
                managing a team of 5 developers. Implemented CI/CD pipelines and
                improved development workflow efficiency by 30%.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion(
                    "Tell me more about your experience at Tech Innovations Inc."
                  )
                }
              >
                More Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-xl font-semibold">Full-Stack Developer</h5>
                <span className="text-gray-500 text-sm">2017 - 2020</span>
              </div>
              <h6 className="text-gray-600 mb-3">WebSolutions Co.</h6>
              <p className="text-gray-700 mb-4">
                Developed and maintained multiple client websites and web
                applications. Specialized in React frontend development and
                Node.js backend services.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion(
                    "Tell me more about your experience at WebSolutions Co."
                  )
                }
              >
                More Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h5 className="text-xl font-semibold">Junior Web Developer</h5>
                <span className="text-gray-500 text-sm">2015 - 2017</span>
              </div>
              <h6 className="text-gray-600 mb-3">Digital Creations Ltd.</h6>
              <p className="text-gray-700 mb-4">
                Worked on frontend development for e-commerce websites. Gained
                experience with JavaScript, CSS, and responsive design
                principles.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askCareerQuestion(
                    "Tell me more about your experience at Digital Creations Ltd."
                  )
                }
              >
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-4">Education</h5>
            <div className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h6 className="font-medium">
                  Master of Science in Computer Science
                </h6>
                <span className="text-gray-500 text-sm">2013 - 2015</span>
              </div>
              <p className="text-gray-600">University of Technology</p>
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h6 className="font-medium">
                  Bachelor of Science in Software Engineering
                </h6>
                <span className="text-gray-500 text-sm">2009 - 2013</span>
              </div>
              <p className="text-gray-600">State University</p>
            </div>
            <button
              className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() =>
                askCareerQuestion(
                  "Tell me more about your educational background"
                )
              }
            >
              Ask About Education
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-4">Certifications</h5>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between items-center">
                AWS Certified Solutions Architect
                <span className="text-gray-500 text-sm">2022</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                Google Cloud Professional Developer
                <span className="text-gray-500 text-sm">2021</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                Microsoft Certified: Azure Developer Associate
                <span className="text-gray-500 text-sm">2020</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                Certified Scrum Master
                <span className="text-gray-500 text-sm">2019</span>
              </li>
            </ul>
            <button
              className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() =>
                askCareerQuestion("Tell me more about your certifications")
              }
            >
              Ask About Certifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;
```

And this completes our <VPIcon icon="fa-brands fa-react"/>`Career.jsx` page: we have forms and more components in this part of the code.

Next is our <VPIcon icon="fa-brands fa-react"/>`Contact.jsx` page. Like before, I will split the codebase for readability, so add the first part of this code to it:

```jsx :collapsed-lines title="Contact.jsx"
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formResponse, setFormResponse] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormResponse({
      type: "success",
      message:
        "Thank you for your message! I'll get back to you as soon as possible.",
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    document
      .getElementById("form-response")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
          <p className="text-lg mb-4">
            Have a question or want to discuss a potential project? Feel free to
            reach out using the form below or through any of my social media
            channels.
          </p>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <div className="flex flex-col gap-2">
                <a
                  href="/projects"
                  className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 text-center transition-colors"
                >
                  View Projects
                </a>
                <a
                  href="/services"
                  className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 text-center transition-colors"
                >
                  Services & Pricing
                </a>
                <a
                  href="/research"
                  className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 text-center transition-colors"
                >
                  Research & Resources
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-4">Contact Form</h5>
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
```

We have our imports, functions, and part of the components here. Lastly, add the second part to complete this page:

```jsx
<div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="subject"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  id="message"
                  rows="5"
                  placeholder="Your message..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
            <div
              id="form-response"
              className="mt-4"
              style={{ display: formResponse ? "block" : "none" }}
            >
              {formResponse && (
                <div
                  className={`p-4 ${
                    formResponse.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } rounded-md`}
                >
                  <i className="bi bi-check-circle-fill mr-2"></i>
                  {formResponse.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-4">
                Contact Information
              </h5>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="bi bi-envelope mr-2"></i>
                  <a
                    href="mailto:contact@example.com"
                    className="text-blue-500 hover:underline"
                  >
                    contact@example.com
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="bi bi-geo-alt mr-2"></i>
                  UK
                </li>
              </ul>
              <h5 className="text-xl font-semibold mt-6 mb-3">
                Connect on Social Media
              </h5>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  className="px-3 py-1.5 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 flex items-center transition-colors"
                >
                  <i className="bi bi-github mr-1"></i> GitHub
                </a>
                <a
                  href="#"
                  className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 flex items-center transition-colors"
                >
                  <i className="bi bi-linkedin mr-1"></i> LinkedIn
                </a>
                <a
                  href="#"
                  className="px-3 py-1.5 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100 flex items-center transition-colors"
                >
                  <i className="bi bi-twitter mr-1"></i> X
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-3">Availability</h5>
              <p className="text-gray-700 mb-3">
                I'm currently available for freelance work and consulting. My
                typical response time is within 24 hours.
              </p>
              <p className="text-gray-700">
                For urgent inquiries, please call the phone number listed above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
```

With that, this page is now done, and we have the rest of the components and form.

Ok just four pages left: let’s work on the home page first. The code is not that big so we can do it all at once.

This is the code to add to the <VPIcon icon="fa-brands fa-react"/>`Home.jsx` page file:

```jsx :collapsed-lines title="Home.jsx"
import { Link } from 'react-router';
import Chat from '../components/Chat';

function Home() {
  const initialMessage =
    "Hello! I'm WelcomeAgent, the welcome specialist. I can help you navigate this portfolio website. Are you an employer, client, or fellow programmer?";

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Welcome to my Portfolio</h1>
          <p className="text-lg mb-4">
            This portfolio showcases my work and skills with the help of
            specialized AI agents. Each agent is designed to assist you with
            different aspects of my portfolio.
          </p>
          <p className="text-gray-700">
            Feel free to interact with the WelcomeAgent to get personalized
            recommendations on which sections of the portfolio to explore based
            on your interests.
          </p>
        </div>
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Chat with WelcomeAgent
              </h5>
              <p className="text-gray-600 mb-4">
                Our welcome specialist can help you navigate this portfolio
                website.
              </p>
              <Chat
                agentType="welcome"
                initialMessage={initialMessage}
                agentInitials="WA"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Meet the Agents</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col items-center">
              <div className="agent-avatar-placeholder mb-4">PA</div>
              <h5 className="text-xl font-semibold mb-2">ProjectAgent</h5>
              <p className="text-gray-600 mb-4 text-center">
                Provides detailed information about my projects, technologies
                used, and challenges overcome.
              </p>
              <Link
                to="/projects"
                className="mt-auto py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col items-center">
              <div className="agent-avatar-placeholder mb-4">CA</div>
              <h5 className="text-xl font-semibold mb-2">CareerAgent</h5>
              <p className="text-gray-600 mb-4 text-center">
                Shares information about my skills, experience, and professional
                background.
              </p>
              <Link
                to="/career"
                className="mt-auto py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Career
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col items-center">
              <div className="agent-avatar-placeholder mb-4">BA</div>
              <h5 className="text-xl font-semibold mb-2">BusinessAdvisor</h5>
              <p className="text-gray-600 mb-4 text-center">
                Provides information about services, pricing, and client
                engagement process.
              </p>
              <Link
                to="/services"
                className="mt-auto py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">Featured Projects</h5>
            <p className="text-gray-600 mb-4">
              Check out some of my recent work:
            </p>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 px-2">E-commerce Platform</li>
              <li className="py-3 px-2">Task Management Application</li>
              <li className="py-3 px-2">Data Visualization Dashboard</li>
            </ul>
            <div className="mt-4">
              <Link
                to="/projects"
                className="inline-block py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">Research & Insights</h5>
            <p className="text-gray-600 mb-4">
              Explore my research on emerging technologies and industry trends:
            </p>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 px-2">AI in Web Development</li>
              <li className="py-3 px-2">Modern Frontend Frameworks</li>
              <li className="py-3 px-2">Cloud Architecture Patterns</li>
            </ul>
            <div className="mt-4">
              <Link
                to="/research"
                className="inline-block py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                View Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
```

This has the code for our home page and WelcomeAgent.

Alright, now let's work on the <VPIcon icon="fa-brands fa-react"/>`Projects.jsx` page. For readability it's easier to split the code in half again. So here is the first part:

```jsx :collapsed-lines title="Projects.jsx"
import { useState } from "react";
import Chat from "../components/Chat";

function Projects() {
  const initialMessage =
    "Hello! I'm ProjectAgent, the project specialist. I can provide detailed information about projects, technologies used, and challenges overcome. What would you like to know?";

  const [currentQuestion, setCurrentQuestion] = useState("");

  const askProjectQuestion = (question) => {
    setCurrentQuestion(`${question} [${Date.now()}]`);

    setTimeout(() => {
      setCurrentQuestion("");
    }, 500);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Projects</h1>
          <p className="text-lg mb-4">
            Here you can explore my portfolio of projects. Feel free to ask
            ProjectAgent for more details about any project.
          </p>
        </div>
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Chat with ProjectAgent
              </h5>
              <p className="text-gray-600 mb-4">
                Our project specialist can provide detailed information about
                projects, technologies, and challenges.
              </p>
              <Chat
                agentType="project"
                initialMessage={initialMessage}
                agentInitials="PA"
                directQuestion={currentQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="project-image-placeholder">E-commerce Platform</div>
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                E-commerce Platform
              </h5>
              <p className="text-gray-600 mb-4">
                A full-featured e-commerce platform with product management,
                shopping cart, and payment processing.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "Tell me more about the E-commerce Platform project"
                      )
                    }
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-gray-500 text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "What technologies were used in the E-commerce Platform project?"
                      )
                    }
                  >
                    Technologies
                  </button>
                </div>
                <span className="text-sm text-gray-500">2023</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="project-image-placeholder">Task Management App</div>
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Task Management Application
              </h5>
              <p className="text-gray-600 mb-4">
                A collaborative task management application with real-time
                updates and team collaboration features.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "Tell me more about the Task Management Application project"
                      )
                    }
                  >
                    View Details
                  </button>
```

As previously mentioned, we have our imports, functions, and some components. Complete the page with the second part of the code here:

```jsx
 <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-gray-500 text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "What technologies were used in the Task Management Application project?"
                      )
                    }
                  >
                    Technologies
                  </button>
                </div>
                <span className="text-sm text-gray-500">2022</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="project-image-placeholder">Data Visualization</div>
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Data Visualization Dashboard
              </h5>
              <p className="text-gray-600 mb-4">
                An interactive dashboard for visualizing complex datasets with
                customizable charts and filters.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "Tell me more about the Data Visualization Dashboard project"
                      )
                    }
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="py-1.5 px-3 text-sm border border-gray-500 text-gray-500 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      askProjectQuestion(
                        "What technologies were used in the Data Visualization Dashboard project?"
                      )
                    }
                  >
                    Technologies
                  </button>
                </div>
                <span className="text-sm text-gray-500">2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">
              Technical Skills Showcase
            </h5>
            <p className="text-gray-600 mb-4">
              These projects demonstrate proficiency in the following
              technologies:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-semibold mb-2">Frontend</h6>
                <ul className="list-disc pl-5 space-y-1">
                  <li>React</li>
                  <li>Vue.js</li>
                  <li>Angular</li>
                  <li>TypeScript</li>
                  <li>CSS/SASS</li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold mb-2">Backend</h6>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Django</li>
                  <li>Flask</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
            <button
              className="mt-4 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() =>
                askProjectQuestion(
                  "What other technologies are you proficient in?"
                )
              }
            >
              Ask About Other Skills
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">Project Inquiry</h5>
            <p className="text-gray-600 mb-4">
              Interested in a specific type of project or technology? Ask
              ProjectAgent for more information.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askProjectQuestion(
                    "Do you have any projects involving machine learning or AI?"
                  )
                }
              >
                Ask About AI Projects
              </button>
              <button
                className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askProjectQuestion("What are your most challenging projects?")
                }
              >
                Ask About Challenging Projects
              </button>
              <button
                className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askProjectQuestion(
                    "Can you show me examples of your UI/UX work?"
                  )
                }
              >
                Ask About UI/UX Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
```

With the remaining components added, this page is now complete.

Its time to do the <VPIcon icon="fa-brands fa-react"/>`Research.jsx` page, starting with the first half of the codebase:

```jsx :collapsed-lines title="Research.jsx"
import { useState } from "react";
import Chat from "../components/Chat";

function Research() {
  const initialMessage =
    "Hello! I'm ResearchAgent, the research specialist. I can provide information about technologies, trends, and industry news. What would you like to know?";
  const [searchQuery, setSearchQuery] = useState("");
  const [tech1, setTech1] = useState("");
  const [tech2, setTech2] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState("");

  const askResearchQuestion = (question) => {
    setCurrentQuestion(`${question} [${Date.now()}]`);

    setTimeout(() => {
      setCurrentQuestion("");
    }, 500);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      askResearchQuestion(`Search for information about: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (tech1.trim() && tech2.trim()) {
      askResearchQuestion(`Compare ${tech1} vs ${tech2}`);
      setTech1("");
      setTech2("");
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Research & Insights</h1>
          <p className="text-lg mb-4">
            Here you can explore research on technologies, trends, and industry
            news. Feel free to ask ResearchAgent for more information.
          </p>
        </div>
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Chat with ResearchAgent
              </h5>
              <p className="text-gray-600 mb-4">
                Our research specialist can provide information about
                technologies, trends, and industry news.
              </p>
              <Chat
                agentType="research"
                initialMessage={initialMessage}
                agentInitials="RA"
                directQuestion={currentQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-3">
              Search for Information
            </h5>
            <p className="text-gray-600 mb-4">
              Enter a topic to search for the latest information and insights.
            </p>
            <form onSubmit={handleSearch}>
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., WebAssembly, Edge Computing, etc."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-3">Compare Technologies</h5>
            <p className="text-gray-600 mb-4">
              Compare two technologies to understand their pros, cons, and use
              cases.
            </p>
            <form onSubmit={handleCompare}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First technology"
                    value={tech1}
                    onChange={(e) => setTech1(e.target.value)}
                  />
                </div>
```

We have our imports, state, functions, and some components for the ResearchAgent, so it's pretty straightforward. Now, we can complete the page by finishing it with the rest of the code:

```jsx
<div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Second technology"
                    value={tech2}
                    onChange={(e) => setTech2(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Compare
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Current Tech Trends</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col h-full">
              <h5 className="text-xl font-semibold mb-3">
                AI in Web Development
              </h5>
              <p className="text-gray-600 mb-4 flex-grow">
                Exploring how artificial intelligence is transforming web
                development practices and tools.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors self-start"
                onClick={() =>
                  askResearchQuestion("Tell me about AI in web development")
                }
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col h-full">
              <h5 className="text-xl font-semibold mb-3">
                Modern Frontend Frameworks
              </h5>
              <p className="text-gray-600 mb-4 flex-grow">
                Analysis of current frontend frameworks, their strengths, and
                ideal use cases.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors self-start"
                onClick={() =>
                  askResearchQuestion("Compare modern frontend frameworks")
                }
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6 flex flex-col h-full">
              <h5 className="text-xl font-semibold mb-3">
                Cloud Architecture Patterns
              </h5>
              <p className="text-gray-600 mb-4 flex-grow">
                Best practices and patterns for designing scalable cloud-based
                applications.
              </p>
              <button
                className="py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors self-start"
                onClick={() =>
                  askResearchQuestion("Explain cloud architecture patterns")
                }
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-3">Industry Trends</h5>
            <p className="text-gray-600 mb-4">
              Stay updated on the latest trends in software development and
              technology.
            </p>
            <button
              className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() =>
                askResearchQuestion(
                  "What are the current trends in software development and technology?"
                )
              }
            >
              Get Industry Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
```

The second half of the code has the remaining components, which complete the page.

Now for the final page which is for `Services.jsx`. The codebase is quite large so we will break it down.

And here's the first part of the codebase to add:

```jsx
import { useState } from "react";
import axios from "axios";
import Chat from "../components/Chat";

function Services() {
  const initialMessage =
    "Hello! I'm BusinessAdvisor, the client specialist. I can provide information about services, pricing, and project details. What would you like to know?";
  const [projectDescription, setProjectDescription] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState("");

  const askClientQuestion = (question) => {
    setCurrentQuestion(`${question} [${Date.now()}]`);

    setTimeout(() => {
      setCurrentQuestion("");
    }, 500);
  };

  const generateProposal = async () => {
    if (!projectDescription.trim()) return;

    try {
      const response = await axios.post("/api/client/proposal", {
        project_description: projectDescription,
      });

      if (response.data && response.data.proposal) {
        askClientQuestion(
          `Can you provide a proposal for this project: ${projectDescription}`
        );
      }
    } catch (error) {
      console.error("Error generating proposal:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Services</h1>
          <p className="text-lg mb-4">
            Here you can find information about the services I offer. Feel free
            to ask BusinessAdvisor for more details about pricing, timelines,
            and project specifics.
          </p>
        </div>
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Chat with BusinessAdvisor
              </h5>
              <p className="text-gray-600 mb-4">
                Our client specialist can provide information about services,
                pricing, and project details.
              </p>
              <Chat
                agentType="client"
                initialMessage={initialMessage}
                agentInitials="BA"
                directQuestion={currentQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Services Offered</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">Web Development</h5>
              <p className="text-gray-600 mb-4">
                Custom web application development using modern frameworks and
                best practices.
              </p>
              <h6 className="font-semibold mb-2">Technologies</h6>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>React</li>
                <li>Vue.js</li>
                <li>Node.js</li>
                <li>Django</li>
                <li>Flask</li>
              </ul>
              <h6 className="font-semibold mb-2">Details</h6>
              <ul className="space-y-2 mb-4">
                <li>
                  <strong>Pricing Model:</strong> Project-based or hourly
                </li>
                <li>
                  <strong>Price Range:</strong> $5,000 - $50,000 depending on
                  complexity
                </li>
                <li>
                  <strong>Timeline:</strong> 4-12 weeks depending on scope
                </li>
              </ul>
              <button
                className="mt-2 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askClientQuestion(
                    "Tell me more about your web development services"
                  )
                }
              >
                Ask about Web Development
              </button>
            </div>
          </div>
```

We have more import statements, state, and components for our BusinessAdvisor AI agent. Onto the next part of this codebase here:

```jsx :collapsed-lines title="Research.jsx"
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Mobile App Development
              </h5>
              <p className="text-gray-600 mb-4">
                Native and cross-platform mobile application development for iOS
                and Android.
              </p>
              <h6 className="font-semibold mb-2">Technologies</h6>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>React Native</li>
                <li>Flutter</li>
                <li>Swift</li>
                <li>Kotlin</li>
              </ul>
              <h6 className="font-semibold mb-2">Details</h6>
              <ul className="space-y-2 mb-4">
                <li>
                  <strong>Pricing Model:</strong> Project-based
                </li>
                <li>
                  <strong>Price Range:</strong> $8,000 - $60,000 depending on
                  complexity
                </li>
                <li>
                  <strong>Timeline:</strong> 6-16 weeks depending on scope
                </li>
              </ul>
              <button
                className="mt-2 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askClientQuestion(
                    "Tell me more about your mobile app development services"
                  )
                }
              >
                Ask about Mobile Development
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="p-6">
              <h5 className="text-xl font-semibold mb-2">
                Technical Consulting
              </h5>
              <p className="text-gray-600 mb-4">
                Expert advice on architecture, technology stack, and development
                practices.
              </p>
              <h6 className="font-semibold mb-2">Areas of Expertise</h6>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>System Architecture</li>
                <li>Database Design</li>
                <li>Performance Optimization</li>
                <li>Security Best Practices</li>
                <li>DevOps Implementation</li>
              </ul>
              <h6 className="font-semibold mb-2">Details</h6>
              <ul className="space-y-2 mb-4">
                <li>
                  <strong>Pricing Model:</strong> Hourly
                </li>
                <li>
                  <strong>Price Range:</strong> $150 - $250 per hour
                </li>
                <li>
                  <strong>Timeline:</strong> Ongoing or as needed
                </li>
              </ul>
              <button
                className="mt-2 py-1.5 px-3 text-sm border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() =>
                  askClientQuestion(
                    "Tell me more about your technical consulting services"
                  )
                }
              >
                Ask about Consulting
              </button>
            </div>
          </div>
        </div>
      </div>
```

We can expect to see lots of component code here for the page, so lets finish it off with the final part now:

```jsx :collapsed-lines title="Research.jsx"
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Client Engagement Process</h2>
        </div>
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      1
                    </div>
                    <h5 className="text-lg font-semibold mt-2 mb-1">
                      Initial Consultation
                    </h5>
                    <p className="text-gray-600 text-center">
                      Understanding your requirements and project goals
                    </p>
                  </div>
                </div>
                <div className="mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      2
                    </div>
                    <h5 className="text-lg font-semibold mt-2 mb-1">
                      Proposal
                    </h5>
                    <p className="text-gray-600 text-center">
                      Detailed quote and project plan preparation
                    </p>
                  </div>
                </div>
                <div className="mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      3
                    </div>
                    <h5 className="text-lg font-semibold mt-2 mb-1">
                      Development
                    </h5>
                    <p className="text-gray-600 text-center">
                      Regular sprints with client feedback
                    </p>
                  </div>
                </div>
                <div className="mb-6 md:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                      4
                    </div>
                    <h5 className="text-lg font-semibold mt-2 mb-1">
                      Delivery
                    </h5>
                    <p className="text-gray-600 text-center">
                      Testing, deployment, and ongoing support
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <button
                  className="py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
                  onClick={() =>
                    askClientQuestion(
                      "Explain your client engagement process in detail"
                    )
                  }
                >
                  Learn More About the Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-2">Request a Proposal</h5>
            <p className="text-gray-600 mb-4">
              Interested in working together? Describe your project below and
              BusinessAdvisor will generate a custom proposal for you.
            </p>
            <div className="mb-4">
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Describe your project:
              </label>
              <textarea
                id="project-description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="5"
                placeholder="Enter project description..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={generateProposal}
            >
              Generate Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
```

Our services page is complete, and so is the application!

Make sure that the Python backend server is running, and then start your React frontend with the usual Vite run script here inside the <VPIcon icon="fas fa-folder-open"/>`frontend` folder:

```sh
npm run dev
```

You should see the website up and running on `http://localhost:5173/` with working AI agents on all pages (apart from the contact page, which does not have one). Remember that every time you use one of the AI agents to ask a question, it will use 1 API call on Groq Cloud, so check the [<VPIcon icon="iconfont icon-groq"/>Rate Limits](https://console.groq.com/docs/rate-limits) for the different LLMs.
