---
lang: en-US
title: "How to Build a Voice-Powered AI Application with the Web Speech API"
description: "Article(s) > How to Build a Voice-Powered AI Application with the Web Speech API"
icon: fa-brands fa-node
category:
  - Node.js
  - DevOps
  - Google
  - Google Cloud
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - devops
  - google
  - googlecloud
  - google-cloud
  - gcp
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Voice-Powered AI Application with the Web Speech API"
    - property: og:description
      content: "How to Build a Voice-Powered AI Application with the Web Speech API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-voice-powered-ai-application-with-the-web-speech-api.html
prev: /programming/js-node/articles/README.md
date: 2026-03-27
isOriginal: false
author:
  - name: Orim Dominic Adah
    url: https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d6c77704-8ad6-4852-8a10-6656c76a34f4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
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
  name="How to Build a Voice-Powered AI Application with the Web Speech API"
  desc="The Web Speech API is a web browser API that enables web applications to use sound as data in their operations. With the API, web apps can transcribe the speech in sound input and also synthesise spee"
  url="https://freecodecamp.org/news/how-to-build-a-voice-powered-ai-application-with-the-web-speech-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d6c77704-8ad6-4852-8a10-6656c76a34f4.png"/>

The [<VPIcon icon="fa-brands fa-firefox"/>Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) is a web browser API that enables web applications to use sound as data in their operations. With the API, web apps can transcribe the speech in sound input and also synthesise speech from text.

This guide shows you how to build a full-stack web application that:

- Accepts audio input and transcribes the speech in it
- Prompts an AI agent with the transcription
- Displays the AI response on the UI

The application you'll build will be a simplified version of the **Use Voice** feature on AI chat applications highlighted in the image below:

![Use voice feature of AI chat applications](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/7adc60ff-cedb-48bc-a5c9-6e913dd3cc60.png)

By practising along with this article, you'll learn how to:

- Build a frontend application that uses the [<VPIcon icon="fa-brands fa-firefox"/>`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) API to accept voice input and transcribe it
- Build a backend app that prompts an AI assistant of your choice and sends a response back to clients
- Connect both applications together to send the transcription to the backend as a prompt and display the AI response on the frontend

Optionally, you'll also learn how to host the frontend with Firebase and the backend with Google Cloud Run.

::: note Prerequisites

This guide assumes that you have a working knowledge of HTML, CSS, and JavaScript in the browser. Basic familiarity with Node.js is beneficial but not essential.

In addition, you should have:

- Google Chrome (at least version 33 ) and a functional audio input device
- [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/) and npm installed on your computer
- An API key from any AI assistant of your choice
- A Google Cloud account and a Firebase account if you intend to deploy the applications

:::

---

## The Web Speech API

The Web Speech API enables applications to transcribe the speech in audio input and also synthesise audio from text. The API is made up of two components:

- The [<VPIcon icon="fa-brands fa-firefox"/>`SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) component which receives audio input, recognises speech in the input and transcribes it
- The [<VPIcon icon="fa-brands fa-firefox"/>`SpeechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) component which synthesises speech from text

You'll use the `SpeechRecognition` component in this guide.

### How the SpeechRecognition Component Works

The `SpeechRecognition` component works through a JavaScript object instantiated in code.

```js
const recognition = new SpeechRecognition();
```

The `recognition` instance exposes several event listeners that respond to audio input. For example, the `audiostart` event fires when sound is first detected, logging `"audio detected"` to the console as shown in the snippet below.

```js
recognition.addEventListener("audiostart", function(event) {
  console.log("audio detected")
})
```

The first time it recognises speech in a sound byte, the `speechstart` event is fired.

A `SpeechRecognition` instance also has the ability to configure how speech recognition should work. For example, it has a property called `lang` which sets the language that it should recognise. The default value of the `lang` property is the HTML `lang` attribute value, or the browser's language setting. It also has a boolean property called `interimResults`, which when set to true, enables the instance to return transcriptions incrementally rather than waiting for the audio input to end.

![From speech to transcription](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/d3e7b39a-fcf2-4624-81ca-4667346c8269.png)

Audio captured by the microphone is processed by a recognition engine which could be in a remote server (for Google Chrome) or embedded in the browser (for Firefox).

After processing, the recognition engine returns a result, which is a list of words or phrases that have been recognised in the speech.

Each transcription in the list has two properties: `confidence`, a numerical estimate of its accuracy ranging from 0 (low) to 1 (high), and `transcript`, the recognised text for all or part of the speech.

---

## How the Application Works

In order for a `SpeechRecognition` instance to capture audio, it needs access to the microphone. The browser requests for permission to use the microphone and, if granted, the application uses it to capture audio for the instance.

![Diagram of how the application works](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/e2847268-dfca-4f81-b929-7cc8ebd57eee.png)

Speech captured by the instance goes through the recognition engine and produces results or transcriptions. Results with high confidence are combined and sent to the backend via an API request.

The backend uses the transcript it receives to prompt an AI assistant. The response from the AI assistant is sent back to the frontend and displayed on the UI as shown in the screenshot below:

![User interface of prompt AI with the web speech API application](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/0cd3eb46-595b-4193-82a0-874e8b9f9652.png)

---

## How to Build the Application

First, you'll build a Node.js backend application that:

- Receives text prompt from the frontend
- Sends the prompt to an AI assistant and receives a response
- Returns the response of the AI assistant to the frontend

Next, you'll build the frontend to:

- Accept your speech prompt, transcribe it, and display the transcription
- Send the transcription result to the backend
- Receive, format and display the response from the backend

Optionally, you'll deploy the frontend to Firebase and the backend to Google Cloud Run, connecting them so the application is publicly accessible.

### Create the Backend Application with Node.js

The backend application you'll build in this section will receive text prompt from clients and use it to prompt an AI assistant. After receiving a response from the AI assistant, it will send the response back to the client.

We'll use Gemini in this guide, but you can use any AI assistant of your choice.

1. Create a folder for the backend app and give it a name, for example, "server".
2. In terminal, navigate to the project folder, run the `npm init` command, and answer the follow-up questions to generate a <VPIcon icon="iconfont icon-json"/>`package.json` file
3. In the root of the project, create a file named <VPIcon icon="fa-brands fa-js"/>`index.js`.

Your project folder should have a structure like this:

```sh title="file structure"
├── index.js
├── package.json
```

The <VPIcon icon="iconfont icon-json"/>`package.json` file should have the following values for `main` , `type` and `scripts.start`:

```json title="package.json"
{ 
  "main": "index.js", 
  "type": "module", 
  "scripts": { 
    "start": "node index.js" 
  }, 
}  
```

1. Copy and paste the code below into the <VPIcon icon="fa-brands fa-js"/>`index.js` file to set up the server:

```js title="index.js"
import http from "node:http";

async function parseRequestBody(req) { 
  return new Promise((resolve, reject) => { 
    let data = ""; 
    req.on("data", (chunk) => (data += chunk)); 
    req.on("end", () => resolve(JSON.parse(data))); 
    req.on("error", reject); 
  }); 
}

const server = http.createServer(async function (req, res) { 
  switch (req.method) { 
    case "POST":
      return res.end("POST request received");
    default:
      return res.end("non-POST request received");
  }
})

const port = Number(process.env.PORT) || 8000; 
server.listen(port, function () { 
    console.log(server running on port ${port}); 
});
```

In the code snippet above, the `http` module is imported from Node.js. The `parseRequestBody` function converts the request body stream of a HTTP request to a JavaScript object.

The server is created using the `http.createServer` method, with the `Access-Control-Allow-Origin` header set to `*` to allow requests from any client. It responds with `POST request received` for POST requests and `non-POST request received` for all others. By default, it listens on port 8000 unless a `PORT` environment variable is defined.

Run `npm run start` to start the server. To confirm it is running, execute the following command in the terminal:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
curl -X POST -H "Content-Type: application/json" -d '{"prompt":"hello"}' http://localhost:8000
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
curl.exe -X POST -H "Content-Type: application/json" -d '{"prompt":"hello"}' http://localhost:8000
```

:::

You'll get the `POST request received` response from the server.

### Integrate an AI Assistant into the Node.js Application

In this section, you'll integrate the AI assistant into the backend application, prompt it with data sent from the frontend, and return its response to the client. Again, we'll use Gemini for this here.

Visit the npm page for your chosen AI assistant to learn how to install and set it up. Here are the npm pages for the most popular AI assistants:

- [Anthropic AI (<VPIcon icon="fa-brands fa-npm"/>`@anthropic-ai/sdk`)](https://npmjs.com/package/@anthropic-ai/sdk)
- [Google Gemini (<VPIcon icon="fa-brands fa-npm"/>`@google/genai`)](https://npmjs.com/package/@google/genai)
- [Open AI (<VPIcon icon="fa-brands fa-npm"/>`openai`)](https://npmjs.com/package/openai)

Update the <VPIcon icon="fa-brands fa-js"/>`index.js` file to include the setup for the AI assistant using the snippet below:

```js title="index.js"
import http from "node:http";
import { GoogleGenAI } from "@google/genai"; 

const ai = new GoogleGenAI({ apiKey: "<your-api-key>" });

async function parseRequestBody(req) { /* minimised code */ }

const server = http.createServer(async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.method) { 
    case "POST":
      const body = await parseRequestBody(req);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // or whatever model you have
        contents: body.prompt,
    });

    return res.end(response.text);

    default:
      return res.end("non-POST request received");
  }
}
/* previous code minimised*/
```

The `GEMINI_API_KEY` is retrieved from the environment variables and passed as the `apiKey` to `GoogleGenAI`, which initialises the AI assistant.

The POST request body is parsed into a JavaScript object, and `body.prompt` is passed to `ai.models.generateContent` to prompt the AI assistant. The `text` property of the response which is in Markdown format, is then returned to the client.

Restart the server and test the current setup by making an API request to it with curl using the snippet below:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
curl -X POST -H "Content-Type: application/json" -d '{"prompt":"hello"}' http://localhost:8000
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
curl.exe -X POST -H "Content-Type: application/json" -d '{"prompt":"hello"}' http://localhost:8000
```

:::

You'll get an AI text response in the form of Markdown.

### Create the Frontend Application with Vite

[<VPIcon icon="iconfont icon-vite"/>Vite](https://vite.dev/) is a build tool that provides a faster and more seamless development experience for developing applications. You'll use Vite to create the frontend application and connect it with the backend application from the previous section.

In another folder, create a project with Vite by running the `npm create vite@latest` command and answer the prompts:

```sh
npm create vite@latest
# 
# Need to install the following packages:
# create-vite@8.1.0
# Ok to proceed? (y) y
# 
# > npx create-vite
# 
# ◇  Project name:
# │  [name-of-your-frontend-app] e.g prompt-ai-with-speech-frontend
# │
# ◇  Select a framework:
# │  Vanilla
# │
# ◇  Select a variant:
# │  JavaScript
# │
# ◇  Use rolldown-vite (Experimental)?:
# │  No
# │
# ◇  Install with npm and start now?
# │  Yes
```

Open the project created in your code editor and make the following updates:

1. Replace the content of <VPIcon icon="fa-brands fa-html5"/>`index.html` with the code snippet below:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Prompt AI with the Web Speech Recognition API</title>
  </head>
  <body>
    <main id="app">
      <section>
        <h1>Prompt AI with the Web Speech Recognition API</h1>
        <ul id="ulist_chat"></ul>
      </section>
      <div class="btn_container">
        <button id="btn_record">Record prompt</button>
      </div>
    </main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

1. Replace the content of <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-css3-alt"/>`style.css` with the code snippet below:

```css :collapsed-lines title="style.css"
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
.btn_container {
  padding: 16px 0px;
  display: flex;
  justify-content: center;
}

#ulist_chat {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  padding: 0;
}

#ulist_chat .transcript {
  border: 1px solid tomato;
  background: #fce5e5af;
  border-radius: 4px;
  align-self: flex-end;
  list-style-type: none;
  margin: 8px;
  padding: 8px;
  max-width: 80%;
}

#ulist_chat .ai_response p { 
  margin: 2px; 
}

#ulist_chat .ai_response {
  border: 1px solid green;
  background: #e5fce8af;
  border-radius: 4px;
  align-self: flex-start;
  list-style-type: none;
  margin: 8px;
  padding: 8px;
  max-width: 80%;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #000;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

1. Replace the content of <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`main.js` with the code snippet below:

```js :collapsed-lines title="main.js"
import "./style.css";
import { marked } from "marked";

const apiUrl = "http://localhost:8000";
const btnRecord = document.getElementById("btn_record");
const uListChat = document.getElementById("ulist_chat");

function ensureBrowserHasSpeechAPI() {
  if (
    !("webkitSpeechRecognition" in window) &&
    !("SpeechRecognition" in window)
  ) {
    btnRecord.style.display = "none";

    return alert(
      "This browser does not have the features required for this demo. Use Google Chrome >= v33"
    );
  }

  start();
}

function toggleRecording(config, listener) {
  if (config.isListening) {
    config.isListening = false;
    btnRecord.innerText = "Start recording";
    return listener.stop();
  }

  config.isListening = true;
  btnRecord.innerText = "Stop recording";

  return listener.start();
}

/** @param {string} transcript  */
function appendTranscriptToChatList(transcript) {
  const li = document.createElement("li");
  li.innerText = transcript;
  li.classList.add("transcript");
  uListChat.appendChild(li);
}

/** @param {string} aiResponse  */
function appendAIResponseToChatList(aiResponse) {
  const li = document.createElement("li");
  li.innerHTML = marked.parse(aiResponse);
  li.classList.add("ai_response");
  uListChat.appendChild(li);
}

/** @param {string} prompt  */
async function promptAI(prompt) {
  try {
    const response = await fetch(apiUrl, {
      body: JSON.stringify({ prompt }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      alert("An error occurred. Try again");
      return;
    }

    const text = await response.text();
    return text;
  } catch (error) {
    logError(error);
    alert("An error occurred. Try again");
    return ""
  }
}

const btnRecord = document.getElementById("btn_record");
const uListChat = document.getElementById("ulist_chat");

function setUpSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const listener = new SpeechRecognition();
  listener.continuous = true; // listen for long speech
  listener.maxAlternatives = 2; // only two transcription suggestions required
  let transcript = "";

  // automatic: onstart -> onaudiostart -> onsoundstart -> onspeechstart
  // automatic: onspeechend -> onsoundend -> onaudioend -> onresult -> onend
  // click button: onaudioend -> onresult -> onend

  listener.onend = async function () {
    if (!transcript || !transcript.trim()) return;

    btnRecord.innerText = "Thinking...";
    btnRecord.disabled = true;
    appendTranscriptToChatList(transcript);
    promptAI(transcript)
      .then(function (res) {
        appendAIResponseToChatList(res);
      })
      .finally(function () {
        btnRecord.innerText = "Record prompt";
        btnRecord.disabled = false;
        transcript = "";
      });
  };

  listener.onerror = function (err) {
    logError(err);
    alert("Error occurred while capturing speech");
  };

  listener.onresult = function (event) {
    for (const alternatives of event.results) {
      const [bestAlternative] = Array.from(alternatives).toSorted(
        (altA, altB) => altB.confidence - altA.confidence
      );

      transcript += bestAlternative.transcript;
    }
  };

  return listener;
}

async function start() {
  const config = {
    isListening: false,
  };

  const listener = setUpSpeechRecognition();

  btnRecord.addEventListener("click", function () {
    toggleRecording(config, listener);
  });
}

ensureBrowserHasSpeechAPI();

function logError(...str) {
  for (const s of str) {
    console.error("error:", s);
  }
}
```

[`marked`](https://npmjs.com/package/marked) is an npm package that helps convert Markdown text to HTML and it's a required dependency in the project. Install `marked` in the project by running the following command in the project's terminal:

```sh
npm install marked
```

The `ensureBrowserHasSpeechAPI` function in `src/main.js` checks to see if the browser in use has the `WebSpeechAPI` feature. If it doesn't, it prevents the application from displaying the controls for the UI. That's why you'll need a Google Chrome browser with a version greater than or equal to 33 for this guide. Those versions have the `WebSpeechAPI` feature.

The `toggleRecording` function executes when the **Record prompt** button is clicked. On the first click, it requests microphone permission. It also enables/disables the activity of the `SpeechRecognition` instance.

The `setUpSpeechRecognition` function sets up the `SpeechRecognition` instance: `listener`, and its configuration. It also attaches functions to be run when the `end`, `error` and `result` events are triggered.

- `error` is triggered when there is an error in capturing or processing audio
- `result` is triggered when the recognition engine returns transcription results
- `end` is triggered when the speech recognition service has disconnected from the application.

The transcript is displayed on the UI after passing it as an argument to the `appendTranscriptToChatList` function.

The `promptAI` function executes when the `end` event fires, accepting the speech transcript as an argument and sending it to the backend via a POST request using `fetch`. On success, the AI response is returned as Markdown and passed to `appendAIResponseToChatList`, which converts it to HTML and displays it on the UI.

---

## Test the Application Locally

Start the backend application by running `npm run start` in the backend project's terminal and start the frontend application by running `npm run dev` in the frontend project's terminal. Visit `http://localhost:5173` to view the UI of application. You should see a UI similar to the one in the image below:

![Initial look of prompt AI with your voice application](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/c5d6fc8b-d693-4b83-9611-8e0c493c9f7c.png)

Click the **Record prompt** button. A prompt will appear requesting microphone permission. Select "Allow while visiting the site" or "Allow this time" to grant access and begin recording. Click on the **Stop recording** button when you're done.

The UI will display the transcript of your speech and the application will send it to the backend as a prompt. After waiting for a short while, you'll see the response from the AI assistant displayed on the UI.

![Prompt AI with speech and get a response](https://cdn.hashnode.com/uploads/covers/66e28b713f978a0e2cd2b763/7a4ff532-6bd0-478c-ae3d-f6446c9d0a1f.png)

You have been able to use speech input to prompt an AI assistant, receive a response and display it. How do you make this application accessible to everyone? The next section guides you through deploying both applications.

---

## Deploy the Backend Application with Google Cloud Run

In this section, you'll deploy the backend application with Google Cloud Run and get a URL which will be used as the `apiUrl` in the frontend application.

In order to host the backend application with Google Cloud Run, you need to have a:

- Google Cloud developer account
- Google Cloud project

Visit [<VPIcon icon="fa-brands fa-google"/>Google Cloud](https://cloud.google.com/) to create an account and create a project. You can name the project whatever you want but it's a good idea to give a descriptive name. Take note of the project's ID because you'll use it in the deployment process.

There are three ways to deploy applications on Google Cloud Run:

- Deploy a revision from an existing container image
- Deploy from a repository such as GitHub or GitLab
- Create an function using the inline editor

You can see all three options if you visit the [<VPIcon icon="fa-brands fa-google"/>create Cloud Run service](https://console.cloud.google.com/run/create) page.

In this guide, you'll use the option to deploy from an existing container image. Follow the steps below to deploy the backend server from a container image or follow the Cloud Run documentation at [<VPIcon icon="fa-brands fa-google"/>build and deploy Node.js service on Cloud Run](https://docs.cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service):

- Install the Google Cloud (gcloud) CLI on your computer by visiting the [<VPIcon icon="fa-brands fa-google"/>Install Google Cloud CLI](https://docs.cloud.google.com/sdk/docs/install) page and following the instructions on the page for your operating system
- Initialise the gcloud CLI to connect it to your developer account by visiting the [<VPIcon icon="fa-brands fa-google"/>Initializing the gcloud CLI](https://docs.cloud.google.com/sdk/docs/initializing) page and following the instructions on the page
- Set the project you want to deploy the backend server under by running the command below in your terminal:

```sh
# replace <PROJECT_ID> with your project ID
gcloud config set project <PROJECT_ID>
```

- Visit your project's [<VPIcon icon="fa-brands fa-google"/>IAM Admin](https://console.cloud.google.com/iam-admin/iam) page to enable the following roles on the service account created for this project:
  - `roles/run.sourceDeveloper`
  - `roles/iam.serviceAccountUser`
  - `roles/logging.viewer`

These roles are required to enable the Cloud Run Admin API and Cloud Build APIs. Take note of the service account email address.

- Enable the Cloud Run Admin API and Cloud Build APIs by running the code snippet below in your terminal:

```sh
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

- Grant the Cloud Build service account access to your project by running the code snippet below in your terminal:

```sh
# replace <PROJECT_ID> with your project ID and 
# <SERVICE_ACCOUNT_EMAIL_ADDRESS> with the service account's email address
gcloud projects add-iam-policy-binding <PROJECT_ID> \
--member=serviceAccount:<SERVICE_ACCOUNT_EMAIL_ADDRESS> \
--role=roles/run.builder
```

Update <VPIcon icon="fa-brands fa-js"/>`index.js` in the backend project to restrict API requests to clients specified in the `ALLOWED_ORIGINS` environment variable, and update the AI assistant configuration to use the API key loaded from environment variables.

```js
// Use the API key from the environment variable
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Replace res.setHeader("Access-Control-Allow-Origin", "*"); with
res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS);
res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

This ensures that the application will receive POST requests from only frontend URLs specified in the `ALLOWED_ORIGINS` environment variable. This setup prevents the backend from being loaded with requests from frontend clients that you don't know, and also prevents the excess use of your tokens. It also keeps you from deploying the application with the AI API key hardocded in it.

To test that the new changes work, run the backend application with the command below:

```sh
# replace YOUR_API_KEY with your Gemini API key
GEMINI_API_KEY=YOUR_API_KEY ALLOWED_ORIGINS="http://localhost:5173" npm run start
```

With the command in the code snippet above, the backend application will not respond to requests from frontend applications not hosted on `http://localhost:5173`. Try to send a prompt from the frontend application to test that it works.

To deploy the backend application to Cloud Run, run the command in the snippet below in the terminal of the backend project folder. The command sets the environment variables required for the application to run and also deploys it to Google Cloud Run.

```sh
# replace <api-key> with your Gemini API key
gcloud run deploy -- source . \
--set-env-vars "ALLOWED_ORIGINS=http://localhost:5173" \
--set-env-vars "GEMINI_API_KEY=<api-key>"
```

Once deployment is complete, you'll receive the URL of your hosted backend. Copy it and replace the value of `apiUrl` in your frontend application with it. Run the frontend, record a prompt, and confirm that everything works as expected.

---

## Deploy the Frontend Application with Firebase

In this section, you'll host the frontend application with Firebase. You need to have a Firebase account. Follow the steps below to host the frontend with Firebase:

- Create and set up a Firebase project
- Install the Firebase CLI by visiting the [<VPIcon icon="fa-brands fa-google"/>install Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) page and follow the instructions for your operating system
- In the terminal of the frontend project, run `firebase init hosting` to initialise the hosting configuration for the project. Follow the prompts and use `dist` as the public directory when prompted
- Run `firebase deploy --only hosting` to host the application with Firebase

Once deployment is complete, you will receive the URL of your hosted frontend application.

---

## Connect the Deployed Applications

Remember that the first time you deployed your backend application, you set `ALLOWED_ORIGINS` to `http://localhost:5173`. The deployed backend application doesn't know about the URL of the deployed frontend application so it won't accept requests from it.

In the terminal of the backend application, deploy the backend application again using the command in the snippet below:

```sh
# replace <frontend-url> with your Firebase frontend URL and <api-key> 
# with your Gemini API key
gcloud run deploy -- source . \
--set-env-vars "ALLOWED_ORIGINS=<frontend-url>" --set-env-vars "GEMINI_API_KEY=<api-key>"
```

Visit the deployed frontend application and test it. It should work without errors.

---

## Conclusion

In this guide, you built a frontend application that captures and transcribes speech, a Node.js backend application that prompts AI, and you connected both applications together to build a simplified version of the **Use Voice** feature in AI chat applications.

Can you add a feature to the application that will make it read out the response from the backend when it receives it? You can use the `SpeechSynthesis` API to build it.

::: info

Feel free to [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`orimdominicadah`)](https://linkedin.com/in/orimdominicadah/) if you have any questions. Thank you for reading this far and don’t hesitate to share this article if you found it insightful. Cheers!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Voice-Powered AI Application with the Web Speech API",
  "desc": "The Web Speech API is a web browser API that enables web applications to use sound as data in their operations. With the API, web apps can transcribe the speech in sound input and also synthesise spee",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-voice-powered-ai-application-with-the-web-speech-api.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
