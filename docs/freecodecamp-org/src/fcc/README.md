---
lang: en-US
title: "How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API"
description: "Article(s) > How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API"
icon: fa-brands fa-js
category:
  - JavaScript
  - AI
  - LLM
  - Google
  - Gemeni
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API"
    - property: og:description
      content: "How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-built-a-makaton-ai-companion-using-gemini-nano-and-the-gemini-api/
prev: /programming/js/articles/README.md
date: 2025-11-08
isOriginal: false
author:
  - name: OMOTAYO OMOYEMI
    url : https://freecodecamp.org/news/author/tayo4christ/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762533154134/e2209ade-6971-464b-aeef-f05abd0a30d7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API"
  desc="When I started my research on AI systems that could translate Makaton (a sign and symbol language designed to support speech and communication), I wanted to bridge a gap in accessibility for learners with speech or language difficulties. Over time, t..."
  url="https://freecodecamp.org/news/how-i-built-a-makaton-ai-companion-using-gemini-nano-and-the-gemini-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762533154134/e2209ade-6971-464b-aeef-f05abd0a30d7.png"/>

When I started my research on AI systems that could translate Makaton (a sign and symbol language designed to support speech and communication), I wanted to bridge a gap in accessibility for learners with speech or language difficulties.

Over time, this academic interest evolved into a working prototype that combines on-device AI and cloud AI to describe images and translate them into English meanings. The idea was simple: I wanted to build a lightweight web app that recognized Makaton gestures or symbols and instantly provided an English interpretation.

In this article, I’ll walk you through how I built my Makaton AI Companion, a single-page web app powered by Gemini Nano (on-device) and the Gemini API (cloud). You’ll see how it works, how I solved common issues like CORS and API model errors, and how this small project became part of my journey toward AI for accessibility.

By the end of this article, you will be able to:

- Understand the core concept behind Makaton and why it’s important in accessibility and inclusive education.
- Learn how to combine on-device AI (Gemini Nano) and cloud-based AI (Gemini API) in a single web project.
- Build a functional AI-powered web app that can describe images and map them to predefined English meanings.
- Discover how to handle common errors such as model endpoint issues, missing API keys, and CORS restrictions when working with generative AI APIs.
- Learn how to store API keys locally for user privacy using `localStorage`.
- Use browser speech synthesis to convert the AI-generated English meanings into spoken output.

---

## Tools and Tech Stack

To build the Makaton AI Companion, I wanted something lightweight, fast to prototype, and easy for anyone to run without complicated dependencies. I chose a plain web stack with a focus on accessibility and transparency.

Here’s what I used:

### Frontend

- **HTML + CSS + JavaScript (Vanilla):** No frameworks, just clean and understandable code that any beginner can follow.
- A single <VPIcon icon="fa-brands fa-html5"/>`index.html` page handles the upload interface, output display, and AI logic.

### AI Components

- **Gemini Nano** runs locally in Chrome Canary. This on-device model lets users generate short text without calling the cloud API.
- **Gemini API (Cloud)** used as a fallback when on-device AI isn’t available or when image analysis is required.
  - Model tested: `gemini-1.5-flash` and `gemini-pro-vision`.
  - Fallback logic ensures the app checks multiple model endpoints if one returns a 404 error.

### Local Storage

- The Gemini API key is stored safely in the browser’s localStorage, so it never leaves the user’s computer.

### Browser SpeechSynthesis API

- Converts the translated English meaning into spoken audio with one click.

### Mapping Logic

- A small custom dictionary (<VPIcon icon="fa-brands fa-js"/>`mapping.js`) links AI-generated descriptions to likely Makaton meanings.

::: tip For example

```js
{ keywords: ["open hand", "raised hand", "wave"], meaning: "Hello / Stop" }
```

### Local Server

- The app is served locally using Python’s built-in HTTP server to avoid CORS issues:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080` in Chrome Canary.

---

## Building the App Step by Step

Now let’s dive into how the Makaton AI Companion works under the hood. This project follows a simple but effective flow: Upload an image → Describe (AI) → Map to Meaning → Speak or Copy the result

We’ll go through each part step by step.

### 1. Setting Up the Project Folder

You don’t need any complex setup. Just create a new folder and add these files:

```sh title="file structue"
makaton-ai-companion/
│
├── index.html
├── styles.css
├── app.js
└── lib/
    ├── mapping.js
    └── ai.js
```

If you prefer a ready-to-run version, you can serve everything from one zip (I’ll share a GitHub link at the end).

### 2. Creating the Basic HTML Structure

Your <VPIcon icon="fa-brands fa-html5"/>`index.html` file defines the interface where users upload an image, click *Describe*, and view the results.

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Makaton AI Companion</title>
  <link rel="stylesheet" href="styles.css"/>
</head>
<body>
  <header class="app-header">
    <h1>🧩 Makaton AI Companion</h1>
    <button id="btnSettings" class="btn secondary">Settings</button>
  </header>

  <main class="container">
    <section class="card">
      <h2>1) Upload an image (Makaton sign/symbol)</h2>
      <label for="file">
        Choose an image file
        <input id="file" type="file" accept="image/*" title="Select an image file"/>
      </label>
      <div id="preview" class="preview hidden"></div>
      <p id="status" class="status"></p>
      <div class="actions">
        <button id="btnDescribe" class="btn">Describe (Cloud or Nano)</button>
        <button id="btnType" class="btn ghost">Type a description instead</button>
      </div>
      <div id="typedBox" class="typed hidden">
        <textarea id="typed" rows="3" placeholder="Describe what you see..."></textarea>
        <button id="btnUseTyped" class="btn">Use this description</button>
      </div>
    </section>

    <section class="card">
      <h2>2) AI Output</h2>
      <div class="grid">
        <div>
          <h3>Image Description</h3>
          <div id="output" class="output"></div>
        </div>
        <div>
          <h3>English Meaning (Mapped)</h3>
          <div id="meaning" class="meaning"></div>
          <div class="actions">
            <button id="btnSpeak" class="btn ghost" disabled>🔊 Speak</button>
            <button id="btnCopy" class="btn ghost" disabled>📋 Copy</button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <dialog id="settings">
    <form method="dialog" class="settings-form">
      <h2>Settings</h2>
      <label>Gemini API key (optional)<input id="apiKey" type="password" placeholder="AIza..."/></label>
      <div class="settings-actions">
        <button id="btnSaveKey" type="submit" class="btn">Save</button>
        <button id="btnCloseSettings" type="button" class="btn secondary">Close</button>
      </div>
      <div id="apiStatus" class="api-status"></div>
    </form>
  </dialog>

  <script type="module" src="lib/mapping.js"></script>
  <script type="module" src="lib/ai.js"></script>
  <script type="module" src="app.js"></script>
</body>
</html>
```

This interface is intentionally minimal: no frameworks, no build tools, just clear HTML.

### 3. Mapping Descriptions to Makaton Meanings

The <VPIcon icon="fa-brands fa-js"/>`mapping.js` file holds a simple keyword-based dictionary. When the AI describes an image (like *“a raised open hand”*), the app searches for keywords that match known Makaton signs.

```js title="lib/mapping.js"
export const MAKATON_GLOSSES = [
  { keywords: ["open hand", "raised hand", "wave", "hand up"], meaning: "Hello / Stop" },
  { keywords: ["eat", "food", "spoon", "hand to mouth"], meaning: "Eat" },
  { keywords: ["drink", "cup", "glass", "bottle"], meaning: "Drink" },
  { keywords: ["home", "house", "roof"], meaning: "Home" },
  { keywords: ["sleep", "bed", "eyes closed"], meaning: "Sleep" },
  { keywords: ["book", "reading", "pages"], meaning: "Book / Read" },
  // Added so your current screenshot maps correctly:
  { keywords: ["help", "assist", "thumb on palm", "hand over hand", "assisting"], meaning: "Help" },
];

export function mapDescriptionToMeaning(desc) {
  if (!desc) return "";
  const d = desc.toLowerCase();
  for (const entry of MAKATON_GLOSSES) {
    if (entry.keywords.some(k => d.includes(k))) return entry.meaning;
  }
  if (d.includes("hand")) return "Gesture / Hand sign (clarify)";
  return "No direct mapping found.";
}
```

It’s simple but effective enough to simulate real symbol-to-language translation for demo purposes.

### 4. Adding Gemini AI Logic

The <VPIcon icon="fa-brands fa-js"/>`ai.js` file connects to Gemini Nano (on-device) or the Gemini API (cloud). If Nano isn’t available, the app falls back to the cloud model. And if that fails, it lets users type a description manually.

```js :collapsed-lines title="lib/ai.js"
// dynamic model discovery (try-all version)

// --- On-device availability (Gemini Nano) ---
export async function checkAvailability() {
  const res = { nanoTextPossible: false };
  try {
    const canCreate = self.ai?.canCreateTextSession || self.ai?.languageModel?.canCreate;
    if (typeof canCreate === "function") {
      const ok = await (self.ai.canCreateTextSession?.() || self.ai.languageModel.canCreate?.());
      res.nanoTextPossible = ok === "readily" || ok === "after-download" || ok === true;
    }
  } catch {}
  return res;
}

export async function createNanoTextSession() {
  if (self.ai?.createTextSession) return await self.ai.createTextSession();
  if (self.ai?.languageModel?.create) return await self.ai.languageModel.create();
  throw new Error("Gemini Nano text session not available");
}

// --- Cloud: dynamically discover models for this key ---
async function listModels(key) {
  const url = "https://generativelanguage.googleapis.com/v1/models?key=" + encodeURIComponent(key);
  const r = await fetch(url);
  if (!r.ok) throw new Error("ListModels failed: " + (await r.text()));
  const j = await r.json();
  return (j.models || []).map(m => m.name).filter(Boolean);
}

function rankModels(names) {
  // Prefer Gemini 1.5 (multimodal), then flash variants, then anything with vision/pro.
  return names
    .filter(n => n.startsWith("models/"))              // ignore tunedModels, etc.
    .filter(n => !n.includes("experimental"))          // skip experimental
    .sort((a, b) => score(b) - score(a));

  function score(n) {
    let s = 0;
    if (n.includes("1.5")) s += 10;
    if (n.includes("flash")) s += 8;
    if (n.includes("pro-vision")) s += 7;
    if (n.includes("pro")) s += 6;
    if (n.includes("vision")) s += 5;
    if (n.includes("latest")) s += 2;
    return s;
  }
}

async function tryGenerateForModels(imageDataUrl, key, models, mimeType) {
  const base64 = imageDataUrl.split(",")[1];
  const body = {
    contents: [{
      parts: [
        { text: "Describe this image briefly in one sentence focusing on the main gesture or symbol." },
        { inline_data: { mime_type: mimeType || "image/png", data: base64 } }
      ]
    }]
  };
  let lastErr = "";
  for (const model of models) {
    const endpoint = "https://generativelanguage.googleapis.com/v1/" + model + ":generateContent?key=" + encodeURIComponent(key);
    try {
      const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)});
      if (!r.ok) { lastErr = await r.text().catch(()=>String(r.status)); continue; }
      const j = await r.json();
      const text = j?.candidates?.[0]?.content?.parts?.map(p=>p.text).join(" ").trim();
      if (text) return text;
      lastErr = "Empty response from " + model;
    } catch (e) {
      lastErr = String(e?.message || e);
    }
  }
  throw new Error("All discovered models failed. Last error: " + lastErr);
}

export async function describeImageWithGemini(imageDataUrl, apiKey, mimeType = "image/png") {
  if (!apiKey) throw new Error("No API key provided");

  const models = await listModels(apiKey);
  if (!models.length) throw new Error("No models returned for this key. Ensure Generative Language API is enabled and T&Cs accepted in AI Studio.");

  const ranked = rankModels(models);
  if (!ranked.length) throw new Error("No usable model names returned (models/*).");

  return await tryGenerateForModels(imageDataUrl, apiKey, ranked, mimeType);
}

// --- Key storage (local only) ---
const KEY = "makaton_demo_gemini_key";
export function saveApiKey(k) { localStorage.setItem(KEY, k || ""); }
export function loadApiKey() { return localStorage.getItem(KEY) || ""; }
```

Note: This retry system is essential because many users encounter 404 model errors due to the unavailability of certain Gemini versions in every account.

### 5. The Main Logic (<VPIcon icon="fa-brands fa-js"/>`app.js`)

This script ties everything together: file upload, AI call, meaning mapping, and output display.

```js :collapsed-lines title="app.js"
import { mapDescriptionToMeaning } from './lib/mapping.js';
import { checkAvailability, createNanoTextSession, describeImageWithGemini, saveApiKey, loadApiKey } from './lib/ai.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Makaton] DOM ready');

  const $ = (s) => document.querySelector(s);

  // Elements
  const fileInput   = $('#file');
  const preview     = $('#preview');
  const meaningEl   = $('#meaning');
  const outputEl    = $('#output');
  const btnDescribe = $('#btnDescribe');
  const btnType     = $('#btnType');
  const typedBox    = $('#typedBox');
  const typed       = $('#typed');
  const btnUseTyped = $('#btnUseTyped');
  const btnSpeak    = $('#btnSpeak');
  const btnCopy     = $('#btnCopy');
  const statusEl    = $('#status');

  const settings        = $('#settings');
  const btnSettings     = $('#btnSettings');
  const btnCloseSettings= $('#btnCloseSettings');
  const btnSaveKey      = $('#btnSaveKey');
  const apiKeyInput     = $('#apiKey');
  const apiStatus       = $('#apiStatus');

  let currentImageDataUrl = null;
  let currentImageMime    = "image/png";

  // Sanity logs
  console.log('[Makaton] Elements:', {
    fileInput: !!fileInput, preview: !!preview, outputEl: !!outputEl,
    meaningEl: !!meaningEl, btnDescribe: !!btnDescribe, statusEl: !!statusEl
  });

  // Init API key
  if (apiKeyInput) apiKeyInput.value = loadApiKey() || "";

  // --- Helpers ---
  function setStatus(text) {
    if (statusEl) statusEl.textContent = text || '';
    console.log('[Makaton][Status]', text);
  }
  function clearOutputs() {
    if (outputEl) outputEl.textContent = '';
    if (meaningEl) meaningEl.textContent = '';
    if (btnSpeak) btnSpeak.disabled = true;
    if (btnCopy)  btnCopy.disabled  = true;
  }
  function setOutput(desc) {
    if (outputEl) outputEl.textContent = desc || '';
    const meaning = mapDescriptionToMeaning(desc || '');
    if (meaningEl) meaningEl.textContent = meaning;
    if (btnSpeak) btnSpeak.disabled = !meaning || meaning.includes('No direct mapping');
    if (btnCopy)  btnCopy.disabled  = !meaning;
    setStatus('Done.');
  }
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
  function handleFiles(files) {
    const file = files?.[0];
    if (!file) { setStatus('No file selected.'); return; }
    currentImageMime = file.type || "image/png";
    fileToDataURL(file)
      .then((dataUrl) => {
        currentImageDataUrl = dataUrl;
        if (preview) {
          preview.innerHTML = `<img alt="preview" src="${dataUrl}" />`;
          preview.classList.remove('hidden');
        }
        setStatus('Image loaded. Click "Describe" to continue.');
      })
      .catch((err) => {
        console.error('[Makaton] fileToDataURL error', err);
        setStatus('Could not read the image.');
      });
  }

  // --- File input change ---
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      console.log('[Makaton] file input change');
      handleFiles(e.target.files);
    });
  } else {
    console.warn('[Makaton] #file input not found in DOM.');
  }

  // --- Drag & drop support on preview area ---
  if (preview) {
    preview.addEventListener('dragover', (e) => { e.preventDefault(); preview.classList.add('drag'); });
    preview.addEventListener('dragleave', () => preview.classList.remove('drag'));
    preview.addEventListener('drop', (e) => {
      e.preventDefault();
      preview.classList.remove('drag');
      console.log('[Makaton] drop');
      handleFiles(e.dataTransfer?.files);
    });
  }

  // --- Describe click ---
  if (btnDescribe) {
    btnDescribe.addEventListener('click', async () => {
      console.log('[Makaton] Describe clicked');
      if (!currentImageDataUrl) { setStatus('Please upload an image first.'); return; }
      clearOutputs();
      setStatus('Checking on-device AI availability…');

      const avail = await checkAvailability().catch(() => ({ nanoTextPossible: false }));
      try {
        const apiKey = loadApiKey();
        if (apiKey) {
          setStatus('Using Gemini cloud for image description…');
          const desc = await describeImageWithGemini(currentImageDataUrl, apiKey, currentImageMime);
          setOutput(desc);
          return;
        }
        if (avail.nanoTextPossible) {
          setStatus('No API key found. Using on-device AI (text) for best guess…');
          const session = await createNanoTextSession();
          const desc = await session.prompt('Given an image is uploaded by the user (not directly visible to you), infer a likely one-sentence description of a common Makaton sign or symbol a teacher might upload. Keep it generic and safe.');
          setOutput(desc);
          return;
        }
        setStatus('No AI available. Please type a brief description.');
        if (typedBox) typedBox.classList.remove('hidden');
      } catch (err) {
        console.error('[Makaton] Describe error', err);
        setStatus('Description failed: ' + (err?.message || err));
        if (typedBox) typedBox.classList.remove('hidden');
      }
    });
  } else {
    console.warn('[Makaton] Describe button not found.');
  }

  // --- Manual typing flow ---
  if (btnType) {
    btnType.addEventListener('click', () => {
      if (typedBox) typedBox.classList.remove('hidden');
      if (typed) typed.focus();
    });
  }
  if (btnUseTyped) {
    btnUseTyped.addEventListener('click', () => {
      const text = (typed?.value || '').trim();
      if (!text) { setStatus('Type a description first.'); return; }
      setOutput(text);
    });
  }

  // --- Utilities ---
  if (btnSpeak) {
    btnSpeak.addEventListener('click', () => {
      const text = meaningEl?.textContent?.trim();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    });
  }
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      const text = meaningEl?.textContent?.trim();
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        setStatus('Copied meaning to clipboard.');
      } catch {
        setStatus('Copy failed.');
      }
    });
  }

  // --- Settings modal ---
  if (btnSettings && settings) btnSettings.addEventListener('click', () => settings.showModal());
  if (btnCloseSettings && settings) btnCloseSettings.addEventListener('click', () => settings.close());
  if (btnSaveKey) {
    btnSaveKey.addEventListener('click', (e) => {
      e.preventDefault();
      const k = apiKeyInput?.value?.trim() || "";
      saveApiKey(k);
      if (apiStatus) apiStatus.textContent = k ? "API key saved locally. Try Describe again." : "Cleared API key. You can still use on-device or typed mode.";
    });
  }

  // First status
  setStatus('Ready. Upload an image to begin.');
});
```

Let's break down the main sections of the `app.js` script for the Makaton AI Companion, as there’s a lot going on here:

1. **Imports and Initial Setup:**
    - The script imports functions from <VPIcon icon="fa-brands fa-js"/>`mapping.js` and <VPIcon icon="fa-brands fa-js"/>`ai.js` to handle mapping descriptions to meanings and AI interactions.
    - It sets up event listeners for when the DOM content is fully loaded, ensuring all elements are ready for interaction.
2. **Element Selection:**
    - It uses a helper function `$` to select DOM elements by their CSS selectors. This includes file inputs, buttons, and display areas for image previews and outputs.
3. **Sanity Logs:**
    - It logs the presence of key elements to the console for debugging purposes, ensuring that all necessary elements are found in the DOM.
4. **API Key Initialization:**
    - It loads any saved API key from local storage and sets it in the input field for user convenience.
5. **Helper Functions:**
    - `setStatus`: Updates the status message displayed to the user.
    - `clearOutputs`: Clears the output and meaning display areas and disables buttons for speaking and copying.
    - `setOutput`: Displays the AI-generated description and maps it to a Makaton meaning, enabling buttons if a valid meaning is found.
    - `fileToDataURL`: Converts an uploaded file to a data URL for image preview and processing.
    - `handleFiles`: Handles file selection, updating the preview and setting the current image data URL.
6. **File Input Change Handling:**
    - It listens for changes in the file input, processes the selected file, and updates the preview area.
7. **Drag & Drop Support:**
    - It adds drag-and-drop functionality to the preview area, allowing users to drag files directly onto the app for processing.
8. **Describe Button Click:**
    - It handles the "Describe" button click event, checking for an uploaded image and attempting to describe it using either the Gemini API or on-device AI.
    - If no AI is available, it prompts the user to type a description manually.
9. **Manual Typing Flow:**
    - It allows users to manually type a description if AI processing is unavailable or fails, updating the output with the typed text.
10. **Utilities:**
    - `btnSpeak`: Uses the browser's SpeechSynthesis API to read aloud the mapped meaning.
    - `btnCopy`: Copies the mapped meaning to the clipboard for easy sharing.
11. **Settings Modal:**
    - It manages the settings modal for entering and saving the API key, providing feedback on the key's status.
12. **Initial Status:**
    - It sets the initial status message to guide the user to upload an image to begin the process.

This script effectively ties together the user interface, file handling, AI processing, and output display, providing a seamless experience for translating Makaton signs into English meanings.

#### How Vision and Language Work Together Here

While working on this project, I started appreciating how computer vision and language understanding complement each other in multimodal systems like this one.

- The vision model (Gemini or Nano) interprets *what it sees* like hand shapes, gestures, or layout and turns that visual context into descriptive language.
- The language mapping logic then interprets those words, infers intent, and finds the closest semantic match (e.g., “help,” “friend,” “eat”).
- It’s a collaboration between two forms of understanding (*perceptual* and *semantic*) that together allow the AI to bridge the gap between gesture and meaning.

This realization reshaped how I think about accessibility: the best assistive technologies often emerge not from smarter models alone, but from the interaction between modalities like seeing, describing, and reasoning in context.

### 6. Optional — Speak and Copy

To make the app more accessible, I added speech output and a quick copy button:

```js
btnSpeak.addEventListener('click', () => {
  const text = meaningEl.textContent.trim();
  if (text) speechSynthesis.speak(new SpeechSynthesisUtterance(text));
});

btnCopy.addEventListener('click', async () => {
  const text = meaningEl.textContent.trim();
  if (text) await navigator.clipboard.writeText(text);
});
```

This gives users both visual and auditory feedback, especially helpful for learners or educators.

---

## How to Fix the Common Issues

No AI or web integration project runs smoothly the first time – and that’s okay. Here’s a breakdown of the main issues I faced while building the Makaton AI Companion, how I diagnosed them, and how I fixed each one.

These lessons will help anyone trying to integrate Gemini APIs, on-device AI, or local web apps without a full backend.

### 1. The “CORS” Error When Running With `file://`

When I first opened my <VPIcon icon="fa-brands fa-html5"/>`index.html` directly from my file explorer, Chrome threw several CORS policy errors:

```plaintext
Access to script at 'file:///lib/ai.js' from origin 'null' has been blocked by CORS policy.
```

At first this looked confusing, but the reason is simple: modern browsers block JavaScript modules (`import/export`) when running from `file://` paths for security reasons.

::: info ✅ Fix

I realized I needed to serve the files over **HTTP**, not from the file system. So I ran a quick local web server using Python:

:::

```sh
python -m http.server 8080
```

Then opened:

```plaintext
http://localhost:8080/index.html
```

That single step fixed all the CORS errors and allowed my modules to load correctly.

:::

### 2. “Model Not Found” (404) From the Gemini API

The next big challenge came from the Gemini API. Even though I had a valid API key, my console showed this error:

```plaintext
"models/gemini-1.5-flash" is not found for API version v1beta, or is not supported for generateContent.
```

It turns out Google’s API endpoints can vary slightly depending on your project setup and key permissions.

::: info ✅ Fix

I rewrote my <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="fa-brands fa-js"/>`ai.js` script to automatically **try multiple Gemini model endpoints** until it found one that worked. Something like this:

```js title="lib/ai.js"
const GEMINI_IMAGE_ENDPOINTS = [
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent",
];
```

And I wrapped it in a loop that stopped once one endpoint succeeded.

Later, I improved it further by listing available models dynamically using `https://generativelanguage.googleapis.com/v1/models?key=YOUR_KEY` and automatically trying whichever ones supported image generation.

That dynamic discovery approach fixed the 404 errors permanently.

:::

### 3. Packaging a Local Single-File Version

Once I got everything working, I wanted a version that others could test easily without installing Node.js or running build tools.

::: info ✅ Fix

I bundled the project into a simple zip file containing:

```plaintext
index.html
app.js
lib/ai.js
lib/mapping.js
styles.css
```

That way, anyone can just unzip and run:

```sh
python -m http.server 8080
```

and open `localhost:8080`.

Everything runs locally in the browser, no server-side code required. This also makes it perfect for demos, classrooms, and so on.

:::

### 4. Debugging Script Import Errors in the Console

Another subtle issue appeared when I noticed this red message:

```plaintext
The requested module './lib/mapping.js' does not provide an export named 'mapDescriptionToMeaning'
```

That line told me exactly what was wrong: my import and export function names didn’t match. The fix was straightforward:

```js title="app.js"
import { mapDescriptionToMeaning } from './lib/mapping.js';
```

And then ensuring the mapping file exported it:

```js title="lib/mapping.js"
export function mapDescriptionToMeaning(desc) { ... }
```

After that, all the pieces connected smoothly.

Using the browser console **as my debugging dashboard** turned out to be the most powerful tool of all. Every fix started by reading and reasoning about those red error lines.

---

## Demo: The Makaton AI Companion in Action

Let’s see the Makaton AI Companion in action and understand what’s happening under the hood.

### Step 1: Run the app locally

Once you’ve downloaded or cloned the project folder, open your terminal in that directory and start a local development server: `python -m http.server 8080`. Then open your browser and visit: `http://localhost:8080/index.html`

You should see the Makaton AI Companion interface:

![Main interface of the Makaton AI Companion app](https://github.com/tayo4christ/makaton-ai-companion/blob/9cc834fa75f6dcd39866c538ed42255f9006bb51/assets/app-interface.jpg?raw=true)

### Step 2: Get Your Gemini API Key

To enable cloud-based image description, you’ll need a [**Gemini API key**](https://aistudio.google.com/welcome?utm_source=PMAX&utm_medium=display&utm_campaign=FY25-global-DR-pmax-1710442&utm_content=pmax&gclsrc=aw.ds&gad_source=1&gad_campaignid=21521981511&gbraid=0AAAAACn9t66nbeHlpP_VYvpWIrX7IJGEW&gclid=EAIaIQobChMIqf-KiIHbkAMV1ZFQBh0KHA8wEAAYASAAEgKLA_D_BwE) from Google AI Studio.

::: info Here’s how to generate one

1. Visit: `https://aistudio.google.com/welcome`
2. Click **“Create API key”** and link it to your Google Cloud project (or create a new one).
3. Copy the key it will look like this: `AIzaSyA...XXXXXXXXXXXX`
4. Open the Makaton AI Companion in your browser and click the **Settings** button (top left).
5. Paste your key in the input box and click **Save**.

![Setting up the OpenAI API key in the app interface](https://github.com/tayo4christ/makaton-ai-companion/blob/9cc834fa75f6dcd39866c538ed42255f9006bb51/assets/api-key-setting.jpg?raw=true)

:::

You’ll see a confirmation message like this:

```plaintext
API key saved locally. Try Describe again.
```

This means your key is stored safely in localStorage and is only accessible from your browser.

### Step 3: Enable Gemini Nano for On-Device AI

If you’re using [<VPIcon icon="fa-brands fa-chrome"/>Chrome Canary](https://google.com/intl/en_uk/chrome/canary/), you can run Gemini Nano locally without internet access. This allows the Makaton AI Companion to generate text even when the API key isn’t set.

#### Download and Install Chrome Canary

Visit the official Chrome Canary download page and install it on your Windows or macOS system. Chrome Canary is a special version of Chrome designed for developers and early adopters, offering the latest features and updates.

#### Enable Gemini Nano

Open Chrome Canary and type `chrome://flags/#prompt-api-for-gemini-nano` in the address bar.

Locate the "Prompt API for Gemini Nano" flag in the list. Set this flag to **Enabled**. This action allows Chrome Canary to support the Gemini Nano model for on-device AI processing.

After enabling the flag, relaunch Chrome Canary to apply the changes.

#### Download the Gemini Nano Model

Open a new tab in Chrome Canary and enter `chrome://components` in the address bar.

Scroll down to find the **“Optimization Guide”** component. Click on **Check for update**. This action will initiate the download of the Gemini Nano model, which is necessary for running AI tasks locally without an internet connection.

#### Verify Installation

Once the Gemini Nano model is installed, the Makaton AI Companion app will automatically detect it. You should see a message indicating that the app is using on-device AI: 

```plaintext
No API key found. Using on-device AI (text) for best guess…
```

This confirmation means that the app can now generate text descriptions using the Gemini Nano model without needing an API key or internet access.

By following these detailed steps, you ensure that the Gemini Nano model is correctly set up and ready to use for on-device AI processing in the Makaton AI Companion.

### Step 4: Upload a Makaton sign or symbol

Click **Choose File** to upload any Makaton image (for example, the “help” sign), then press **Describe (Cloud or Nano)**. You’ll immediately see console logs confirming that the app is running correctly and connecting to the Gemini API:

![Console output showing real-time translation logs](https://github.com/tayo4christ/makaton-ai-companion/blob/9cc834fa75f6dcd39866c538ed42255f9006bb51/assets/console.jpg?raw=true)

### Step 5: AI Description and Mapping

Here’s what happens next:

1. The image is read and encoded as Base64.
2. The Gemini API (cloud or on-device) generates a short visual description.
3. The description is passed to the `mapDescriptionToMeaning()` function.
4. If keywords match an entry in the `MAKATON_GLOSSES` dictionary, the app displays the corresponding English meaning.
5. Finally, users can click **Speak** or **Copy** to hear or reuse the translation.

::: tip Example outputs:

**When no mapping is found:**

The AI description is accurate but doesn’t yet match a known Makaton keyword.

![Incorrect demonstration showing the model misinterpreting a sign](https://github.com/tayo4christ/makaton-ai-companion/blob/9cc834fa75f6dcd39866c538ed42255f9006bb51/assets/Incorrect-demonstration.jpg?raw=true)

**After updating the mapping list:**

Adding new keywords like `"help"`, `"assist"`, or `"hand over hand"` enables correct translation.

![Correct demonstration where the AI accurately recognizes the Makaton sign](https://github.com/tayo4christ/makaton-ai-companion/blob/9cc834fa75f6dcd39866c538ed42255f9006bb51/assets/correct-demonstration.jpg?raw=true)

:::

### Why this matters

This demonstrates how accessible, AI-assisted tools can support communication for people who rely on Makaton. Even when a gesture isn’t recognized, the system provides a structured output and allows users or educators to expand the mapping list making the tool smarter over time.

---

## Broader Reflections

Building this project turned out to be much more than a coding exercise for me.  
It was a meaningful experiment in combining accessibility, natural language processing, and computer vision. These three fields, when brought together, can create real social impact.

While working on it, I began to understand how computer vision and language understanding complement each other in practice. The vision model perceives the world by identifying shapes, gestures, and spatial patterns, while the language model interprets what those visuals mean in human terms.  
In this project, the artificial intelligence system first sees the Makaton sign, then describes it, and finally maps it to an English word that carries intent and meaning.

This interaction between perception and semantics is what makes multimodal artificial intelligence so powerful. It is not only about recognizing an image or generating text; it is about building systems that connect understanding across different forms of information to make technology more inclusive and human centered.

This realization changed how I think about accessibility technology. True innovation happens not only through smarter models but through the harmony between seeing and understanding, between what an artificial intelligence system observes and how it communicates that observation to help people.

### Accessibility Meets AI

Working on this project reminded me that accessibility isn’t just about compliance or assistive devices. It’s also about inclusion. A simple AI system that can describe a hand gesture or symbol in real time can empower teachers, parents, and students who communicate using Makaton or similar systems.

By mapping AI-generated descriptions to meaningful phrases, the app demonstrates how AI can support inclusive education**,** even at small scales. It bridges the communication gap between verbal and nonverbal learners, which is something that traditional translation systems often overlook.

### Integrating NLP and Computer Vision

On the technical side, this project showed me how naturally computer vision and language understanding complement each other. The Gemini API’s multimodal models were able to analyze an image and produce coherent natural-language sentences, something that older APIs couldn’t do without chaining multiple tools.

By feeding that output into a lightweight NLP mapping function, I was able to simulate a very early-stage symbol-to-language translator the core of my broader research interest in automatic Makaton-to-English translation.

### Why Local AI (Gemini Nano) Matters

While the cloud models are powerful, experimenting with Gemini Nano revealed something exciting:  
on-device AI can make accessibility tools faster, safer, and more private.

In classrooms or therapy sessions, you often can’t rely on stable internet connections or share sensitive student data. Running inference locally means learners’ gestures or symbol images never leave the device, a crucial step toward privacy-preserving accessibility AI.

And since Nano runs directly inside Chrome Canary, it shows how AI is becoming embedded at the browser level, lowering barriers for teachers and developers to build inclusive solutions without needing large infrastructure.

### Looking Forward

This prototype is just a starting point. Future iterations could integrate gesture recognition directly from camera input, support multiple symbol sets, or even learn from user feedback to expand the dictionary automatically.

Most importantly, it reinforces a central belief in my research and teaching journey:

**Accessibility innovation doesn’t require massive systems. It starts with curiosity, empathy, and a few lines of purposeful code.**

---

## Conclusion

Building the Makaton AI Companion has been one of the most rewarding projects in my AI journey – not just because it worked, but because it proved how accessible innovation can be.

With just a browser, a few lines of JavaScript, and the right API, I was able to combine computer vision, language understanding, and accessibility design into a working system that translates symbols into meaning. It’s a small step toward a future where anyone, regardless of speech or language ability, can be understood through technology.

The project also reinforced something deeply personal to me as a researcher and educator: that AI for accessibility doesn’t need to be complex, expensive, or centralized. It can be lightweight, open, and built with empathy by anyone who’s willing to learn and experiment.

### Join the Conversation

If this project inspires you, I’d love to see your own experiments and improvements. Can you make it support live webcam gestures? Could you adapt it for other symbol systems, like PECS or BSL?

Share your ideas in the comments or tag me if you publish your own version. Together, we can grow a small prototype into a community-driven accessibility tool and continue exploring how AI can give more people a voice.

::: info

Full source code on GitHub: [<VPIcon icon="iconfont icon-github"/>`tayo4christ/makaton-ai-companion`](https://github.com/tayo4christ/makaton-ai-companion)

<SiteInfo
  name="tayo4christ/makaton-ai-companion"
  desc="AI-powered Makaton symbol translator using Gemini API and local inference (Gemini Nano)."
  url="https://github.com/tayo4christ/makaton-ai-companion/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/09637452ccd15647b3f220a3a549c26322e6c8ef17a2e2f08848a4fdcd2b34e4/tayo4christ/makaton-ai-companion"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How I Built a Makaton AI Companion Using Gemini Nano and the Gemini API",
  "desc": "When I started my research on AI systems that could translate Makaton (a sign and symbol language designed to support speech and communication), I wanted to bridge a gap in accessibility for learners with speech or language difficulties. Over time, t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-i-built-a-makaton-ai-companion-using-gemini-nano-and-the-gemini-api/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
