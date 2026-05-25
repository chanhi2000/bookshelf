---
lang: en-US
title: "How to Build AI Apps in the Browser with TensorFlow.js and WebGPU"
description: "Article(s) > How to Build AI Apps in the Browser with TensorFlow.js and WebGPU"
icon: iconfont icon-tensorflow
category:
  - JavaScript
  - Tensorflow
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - tensorflow
  - js-tensorflow
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
      content: "Article(s) > How to Build AI Apps in the Browser with TensorFlow.js and WebGPU"
    - property: og:description
      content: "How to Build AI Apps in the Browser with TensorFlow.js and WebGPU"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-apps-in-the-browser-with-tensorflow-js-and-webgpu.html
prev: /programming/js-tensorflow/articles/README.md
date: 2026-05-27
isOriginal: false
author:
  - name: Ayantunji Timilehin
    url: https://freecodecamp.org/news/author/timmy471/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/87141e6b-7529-4278-a2fa-ee8e4d9f9062.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tensorflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-tensorflow/articles/README.md",
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
  name="How to Build AI Apps in the Browser with TensorFlow.js and WebGPU"
  desc="Most developers think of AI the same way: you send data to a server, the server thinks, you get a response back. That mental model made sense for a long time. It still makes sense for a lot of use cas"
  url="https://freecodecamp.org/news/build-ai-apps-in-the-browser-with-tensorflow-js-and-webgpu"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/87141e6b-7529-4278-a2fa-ee8e4d9f9062.png"/>

Most developers think of AI the same way: you send data to a server, the server thinks, you get a response back. That mental model made sense for a long time. It still makes sense for a lot of use cases.

But there’s a quiet shift happening inside the browser environment that a lot of engineers are completely missing out on.

The modern browser isn’t just a glorified engine for rendering HTML and CSS anymore. It’s turning into a full-blown runtime for local intelligence. We’ve reached a point where you can ship raw machine learning models straight to a user's device and run inference completely client-side. No server trips, no API keys to protect, and once those initial assets load, zero dependency on an internet connection.

This is the reality of Web AI. If you're building for the web today, understanding this paradigm shift is easily one of the most valuable skills you can add to your stack.

In this guide, we’re going to pull back the curtain on how Web AI actually operates under the hood, break down the browser technology stack making it possible, and build a real, working image classifier using Teachable Machine and TensorFlow.js. Along the way, we’ll also set up a live benchmark so you can watch exactly how WebGL and WebGPU stack up against each other in real-time execution speeds.

::: note Prerequisites

To follow along with this tutorial, you should have:

- A working knowledge of JavaScript
- Basic familiarity with HTML and how the browser works
- Google Chrome installed (required for WebGPU support and Chrome's built-in AI APIs)
- A code editor like VS Code with the Live Server extension installed (recommended for running the demo locally)

No prior machine learning experience is required.

:::

---

## What is Web AI?

Instead of sending data off to a distant cloud server, Web AI lets you run machine learning models directly on the user’s device inside their browser. It uses standard web tech like JavaScript, WebAssembly, and WebGPU to handle all the heavy lifting right then and there.

The simplest definition: **intelligence that runs in the browser, without sending your data anywhere.**

Most of us already interact with on-device AI every day without realizing it. Think about unlocking an iPhone. The second you lift it, Face ID maps out roughly 30,000 infrared points, feeds that data through a neural network living on Apple's local silicon, matches it against an encrypted embedding, and opens the phone. The whole process takes milliseconds and happens entirely offline.

Browser-based AI works on that exact same core architecture. The only real difference is that we're building on top of shared web standards rather than native hardware APIs. When you spin up a face-tracking model using TensorFlow.js or MediaPipe in Chrome, you're running that exact same pipeline:

```plaintext
Camera input → Local ML model → Local decision
```
<!-- TODO: mermaid화 -->

No round trip. No server. The browser is your Neural Engine.

---

## Browser AI vs Cloud AI

There’s no right or wrong answer here. It just depends on what you’re trying to build. Both approaches have their pros and cons, so it’s just a matter of picking the tool that fits your specific use case.

|  | **Browser AI (Client-Side)** | **Cloud AI (Server-Side)** |
| ---: | :--- | :--- |
| **Internet required** | No | Yes |
| **Latency** | Near-zero | Depends on network |
| **Privacy** | Data stays on device | Data leaves the device |
| **Model size** | Small to medium | As large as you need |
| **Cost at inference time** | Free | Per token or per request |

::: tabs

@tab:active Use browser AI when

- You need split-second speed for things like tracking gestures or detecting objects live on a webcam
- The app has to work offline (whether it's a PWA or just needs to survive spotty internet)
- Privacy is a hard requirement to keep sensitive data like medical inputs, biometrics, or financial information strictly local
- You want to reduce or eliminate API costs on high-frequency, lightweight predictions

@tab Use cloud AI when

- You need large models like GPT-4, Gemini Pro, or Stable Diffusion
- You need centralized model updates, A/B testing, or user analytics
- You require serious GPU or TPU compute power

:::

Most production systems actually use a mix of both. Take Google Photos: it handles face detection right on your device so it’s fast and private, but leaves the heavier categorization work for the cloud. Or think of a modern web app that might use TensorFlow.js locally to classify images instantly, but calls the Gemini API when it needs deeper language processing.

This hybrid setup, keeping lightweight intelligence at the edge and heavy compute in the cloud, is usually the sweet spot for most apps.

---

## The Technology Stack

Browser AI isn’t just a single tool – it’s a stacked layer of technologies. Knowing how these layers fit together makes it a lot easier to choose your setup and navigate the trade-offs.

### Tensors

Before jumping into any ML framework, you need to understand tensors. Not deeply, just enough of a handle on them so you don't get blindsided by tensor shape errors, because they will happen and they can be tricky to debug.

Think of a tensor as a multi-dimensional grid of numbers. Whether your model is processing images, audio, or text, everything gets converted into this format first. Models only speak numbers, and tensors are the containers that hold them.

```plaintext
A single number       → 0D tensor (scalar):  42
A list of numbers     → 1D tensor (vector):  [0.2, 0.8, 0.5]
A table of numbers    → 2D tensor (matrix):  [[1,2,3],[4,5,6]]
An image              → 3D tensor:           shape [224, 224, 3]
A batch of images     → 4D tensor:           shape [32, 224, 224, 3]
```

Models accept inputs in specific shapes. If your tensor shape doesn't match the model's expected input, your code breaks. That's why understanding dimensions is practical, not just theoretical.

TensorFlow is literally named after this concept. Tensor + Flow = tensors flowing through neural networks.

Here's how you create tensors in TensorFlow.js:

```js
// 1D tensor — a list of values
const scores = tf.tensor([0.1, 0.7, 0.2]);

// 3D tensor — a single image (height x width x RGB channels)
const image = tf.tensor([
  [[255, 0, 0], [0, 255, 0]],
  [[0, 0, 255], [255, 255, 0]]
]);

// 4D tensor — a batch of 32 images
const batch = tf.zeros([32, 224, 224, 3]);
```

### TensorFlow.js

TensorFlow.js is Google's JavaScript version of TensorFlow. It lets you run pre-trained models right in the browser and, if you really want to, train new ones completely client-side.

The most important concept in TensorFlow.js is the backend, the hardware your model actually runs on. You can switch between backends depending on what the user's device supports, and it makes a significant difference to performance.

```js
await tf.setBackend('webgpu');  // fastest — true GPU compute
await tf.setBackend('webgl');   // very fast — GPU via graphics shaders
await tf.setBackend('wasm');    // fast — near-native CPU speed
await tf.setBackend('cpu');     // slowest — plain JavaScript on CPU

await tf.ready();
console.log('Running on:', tf.getBackend());
```

In practice, you want to try the fastest available backend and fall back gracefully if a user's browser doesn't support it:

```js
const backends = ['webgpu', 'webgl', 'wasm', 'cpu'];

for (const backend of backends) {
  try {
    await tf.setBackend(backend);
    await tf.ready();
    console.log('Using backend:', backend);
    break;
  } catch {
    continue;
  }
}
```

### WebAssembly

WebAssembly (WASM) basically lets code written in C++ or Rust run inside the browser at near-native speeds. When it comes to AI, this is a big deal because heavy math operations like tensor calculations, data preprocessing, and running compressed models happen way faster in WASM than they ever could in standard JavaScript.

Under the hood, TensorFlow.js's WASM backend is using a compiled C++ runtime. If you're running compressed models on a device's CPU, switching to the WASM backend can make your app anywhere from 2 to 10 times faster than just sticking with regular JavaScript.

```js
await tf.setBackend('wasm');
await tf.ready();
```

### WebGL and WebGPU

This is where browser AI performance gets interesting.

**WebGL** was originally built for 3D graphics. But developers discovered that the parallel computation that GPUs use for rendering is exactly the kind of parallel computation neural networks need.

TensorFlow.js's WebGL backend encodes tensor operations as graphics shader programs and runs them on the GPU. It works well, but it's a workaround, as WebGL was never designed for this kind of work.

**WebGPU** is what was actually designed for the job. It launched in Chrome back in April 2023 after six years of collaboration between Apple, Google, Mozilla, Intel, and Microsoft.

Instead of just handling graphics, it's a modern API built from the ground up for general-purpose computing. When it comes to running AI models, it can be 2 to 3 times faster than WebGL, which means you can actually run significantly larger models right in the browser.

Here's how to check for WebGPU support and use it:

```js
if ('gpu' in navigator) {
  console.log('WebGPU is supported');
  await tf.setBackend('webgpu');
} else {
  console.warn('WebGPU not available, falling back to WebGL');
  await tf.setBackend('webgl');
}

await tf.ready();
```

To enable WebGPU in Chrome for development, go to:

```plaintext
chrome://flags/#enable-unsafe-webgpu → Enable → Restart Chrome
```

![Enable web-gpu in chrome](https://cdn.hashnode.com/uploads/covers/66058baaeb0049c5f549a186/77964ba9-2db1-4011-b6fe-17b47f48688b.png)

The performance progression across backends looks like this:

| **Backend** | **What's happening under the hood** | **Relative speed** |
| ---: | :--- | :--- |
| **cpu** | Plain JavaScript on CPU | Slow |
| **wasm** | Compiled C++ on CPU | Fast |
| **webgl** | GPU via graphics shaders | Very fast |
| **webgpu** | GPU via compute shaders | Fastest |

### MediaPipe

MediaPipe is Google's framework for real-time perception tasks like hand tracking, face mesh detection, pose estimation, and object detection. Think of it as plug-and-play AI for anything that involves a camera.

You don't build these models yourself – you just import them and use them. MediaPipe is what actually powers the background blur in Google Meet and the visual filters in YouTube. Under the hood, it runs on TensorFlow.js and WebAssembly to keep everything moving fast.

You can try all MediaPipe models interactively before writing any code at [<VPIcon icon="fa-brands fa-google"/>MediaPipe Studio](https://mediapipe-studio.webapps.google.com/home).

---

## How to Build AI in the Browser

### Step 1: Train a Model with Teachable Machine

[<VPIcon icon="fas fa-globe"/>Teachable Machine](https://teachablemachine.withgoogle.com) is Google's no-code tool for building models. It lets you create custom images, audio, or pose classifiers right from your webcam without needing any machine learning experience. Once you're done, you can export them as TensorFlow.js models that are completely ready to drop straight into your app.

Here's how to get started:

1. Go to [<VPIcon icon="fas fa-globe"/>teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com)
2. Choose Image Project, standard image model.
3. Create two or more classes. "Thumbs Up" and "Thumbs Down" is a simple starting point
4. Record examples for each class using your webcam
5. Click **Train Model** — training happens entirely in your browser
6. Click **Export Model** and choose **TensorFlow.js**

![Train with teachable machine](https://cdn.hashnode.com/uploads/covers/66058baaeb0049c5f549a186/8ec77493-cf3a-4c05-add0-3140185cc5aa.png)

When you export, you get three files:

- .<VPIcon icon="iconfont icon-json"/>`model.json`: The model architecture: layers, input/output shapes, and paths to the weights
- `weights.bin`: The trained weights stored as binary data
- .<VPIcon icon="iconfont icon-json"/>`metadata.json`: Class labels, input size, and inference configuration

#### A note on training data quality

Teachable Machine relies on supervised learning. You give the model labeled examples, and it figures out the underlying patterns. When you're gathering your data, two things matter way more than the sheer number of pictures you take:

- **Balance:** If one class has significantly more examples than another, the model will be biased toward it. Keep the data roughly equal across classes.
- **Variety:** Fifty photos from different angles, distances, and lighting conditions will easily outperform two hundred near-identical shots from the same spot. The model needs to understand the concept of a "thumbs up", not memorise one specific photo of your specific thumb.

Keep in mind that the actual machine learning model is usually just a tiny fraction of your overall codebase. The vast majority of what you write is going to be standard JavaScript. At the end of the day, it's just another asset in your stack.

### Step 2: Setting up and Writing the Code

Now that you have your model files, set up your project structure like this and create an <VPIcon icon="fa-brands fa-html5"/>`index.html` file:

```sh title="file structure"
your-project/
├── index.html
├── model.json
├── weights.bin
└── metadata.json
```

The <VPIcon icon="iconfont icon-json"/>`model.json`, `weights.bin`, and <VPIcon icon="iconfont icon-json"/>`metadata.json` files all go in the same folder as your <VPIcon icon="fa-brands fa-html5"/>`index.html`. The demo loads them from the same directory using `const URL = "./"`.

To run it locally, open the folder in VS Code or your preferred IDE and use the **Live Server** extension. Just right-click <VPIcon icon="fa-brands fa-html5"/>`index.html` and select **Open with Live Server**. Opening the file directly in the browser without a server will cause CORS errors when loading the model files.

### Step 3: Load the Model and Run Predictions

Paste the following in your <VPIcon icon="fa-brands fa-html5"/>`index.html` file. This demo loads your Teachable Machine model, starts your webcam, and runs continuous predictions in a loop:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Teachable Machine - Webcam + Backend Switch Demo</title>
    <style>
      body {
        font-family: Arial;
        text-align: center;
        margin: 20px;
      }

      #webcam-container {
        margin-top: 20px;
      }

      #label-container {
        margin-top: 10px;
        font-size: 18px;
        font-weight: bold;
      }

      button.backend-btn {
        margin: 5px;
        padding: 8px 16px;
        font-size: 16px;
        cursor: pointer;
      }

      #status {
        margin-top: 10px;
        font-weight: bold;
        color: #0078ff;
      }

      table {
        margin: 20px auto;
        border-collapse: collapse;
        width: 80%;
        max-width: 600px;
      }

      th,
      td {
        border: 1px solid #ccc;
        padding: 10px;
      }

      th {
        background: #0078ff;
        color: white;
      }
    </style>
  </head>

  <body>
    <h2>AI in the web Demo</h2>

    <div>
      <button class="backend-btn" onclick="switchBackend('cpu')">CPU</button>
      <button class="backend-btn" onclick="switchBackend('webgl')">
        WebGL
      </button>
      <button class="backend-btn" onclick="switchBackend('webgpu')">
        WebGPU
      </button>
    </div>

    <p id="status">Click a backend to start</p>

    <table>
      <thead>
        <tr>
          <th>Backend</th>
          <th>Load Time (s)</th>
          <th>Inference Time (ms)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="results"></tbody>
    </table>

    <div id="webcam-container"></div>
    <div id="label-container"></div>

    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgpu"></script>
    <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>

    <script>
      const URL = "./";
      const resultsTable = document.getElementById("results");
      const statusEl = document.getElementById("status");
      const backends = ["cpu", "webgl", "webgpu"];

      let model, webcam, maxPredictions;
      const backendResults = {};

      // Initialize webcam
      async function initWebcam() {
        if (!webcam) {
          webcam = new tmImage.Webcam(200, 200, true);
          await webcam.setup();
          await webcam.play();
          document
            .getElementById("webcam-container")
            .appendChild(webcam.canvas);

          const labelContainer = document.getElementById("label-container");
          labelContainer.innerHTML = "";
          for (let i = 0; i < 2; i++)
            labelContainer.appendChild(document.createElement("div"));
        }
      }

      async function switchBackend(backend) {
        statusEl.innerText = `Switching to ${backend.toUpperCase()}...`;

        await initWebcam();

        try {
          const startLoad = performance.now();
          await tf.setBackend(backend);
          await tf.ready();
          model = await tmImage.load(URL + "model.json", URL + "metadata.json");
          maxPredictions = model.getTotalClasses();
          const endLoad = performance.now();
          const loadTime = ((endLoad - startLoad) / 1000).toFixed(2);

          // Single inference to measure time
          const startInference = performance.now();
          await model.predict(webcam.canvas);
          const endInference = performance.now();
          const inferenceTime = (endInference - startInference).toFixed(1);

          // Store results
          backendResults[backend] = { loadTime, inferenceTime };

          updateTable();

          statusEl.innerText = `${backend.toUpperCase()} ready`;
        } catch (err) {
          console.error(`${backend} not supported:`, err);
          statusEl.innerText = `${backend.toUpperCase()} not supported`;
        }
      }

      function updateTable() {
        resultsTable.innerHTML = "";
        for (let backend of backends) {
          const row = document.createElement("tr");
          const backendCell = document.createElement("td");
          const loadCell = document.createElement("td");
          const inferenceCell = document.createElement("td");
          const statusCell = document.createElement("td");

          backendCell.textContent = backend.toUpperCase();

          if (backendResults[backend]) {
            loadCell.textContent = backendResults[backend].loadTime;
            inferenceCell.textContent = backendResults[backend].inferenceTime;
            statusCell.textContent = "✓";
          } else {
            loadCell.textContent = "-";
            inferenceCell.textContent = "-";
            statusCell.textContent = "-";
          }

          row.appendChild(backendCell);
          row.appendChild(loadCell);
          row.appendChild(inferenceCell);
          row.appendChild(statusCell);
          resultsTable.appendChild(row);
        }
      }

      // Continuous prediction loop
      async function loop() {
        if (webcam && model) {
          webcam.update();
          const prediction = await model.predict(webcam.canvas);
          const labelContainer = document.getElementById("label-container");
          labelContainer.innerHTML = "";
          for (let i = 0; i < maxPredictions; i++) {
            const p = document.createElement("div");
            p.textContent = `\({prediction[i].className}: \){(prediction[i].probability * 100).toFixed(1)}%`;
            labelContainer.appendChild(p);
          }
        }
        requestAnimationFrame(loop);
      }

      loop();
    </script>
  </body>
</html>
```

A few things worth understanding about what this code is doing:

The `switchBackend` function does more than just swap the backend. Each time you click a backend button, it records how long the model takes to load on that backend and how long a single inference takes. Those numbers go straight into the comparison table so you can see the difference without having to look at console logs.

The `loop` function runs continuously using `requestAnimationFrame`. Every frame, it grabs the current webcam image, passes it to the model, and updates the prediction labels on screen. This is what makes the detection feel real-time.

Notice that `initWebcam` only runs once. It checks if `webcam` already exists before setting up. Switching backends reloads the model but keeps the same webcam stream running.

Open Chrome DevTools and go to the **Network tab** while the demo runs. After the model files finish loading, you'll see zero outbound requests. Every prediction is happening entirely in the browser.

### Step 4: Switch Backends and Compare Performance

Once the demo is running, click each backend button one at a time: CPU, then WebGL, then WebGPU. The table updates after each switch and shows you the load time in seconds and inference time in milliseconds for each backend side by side.

Here's what you should expect to see:

- **CPU** will be the slowest with everything running in plain JavaScript
- **WebGL** will be noticeably faster as the GPU is now handling the tensor operations
- **WebGPU** will be the fastest with true GPU compute and less overhead than WebGL. The exact numbers depend on your machine, but the gap between CPU and WebGPU is usually significant enough to see immediately in the table.

![Demo with network tab](https://cdn.hashnode.com/uploads/covers/66058baaeb0049c5f549a186/6332c651-9b96-45c7-95cc-0d842595ff51.png)

::: note

WebGPU requires Chrome with the flag enabled. If the WebGPU button shows "not supported", go to `chrome://flags/#enable-unsafe-webgpu`, enable it, and restart Chrome.

:::

---

## Chrome's Built-in AI APIs

Beyond loading your own models, Chrome is rolling out native AI capabilities that you can hook into directly through browser APIs. This means no managing bulky model files, no importing TensorFlow.js, and zero manual setup.

The powerhouse here is Gemini Nano, a lightweight version of Google's Gemini model built to run completely on-device inside Chrome. It handles tasks like smart replies and page summarization right in the browser without ever making a cloud call.

If you want to build with it, you can tap into these experimental APIs that Chrome exposes to developers:

```plaintext
chrome://flags → search "Prompt API for Gemini Nano" → Enable → Restart Chrome
```

![Gemini nano](https://cdn.hashnode.com/uploads/covers/66058baaeb0049c5f549a186/c1db08aa-b5b1-4496-9553-536bbc68a442.png)

These are still experimental and behind flags. But they show clearly where the platform is heading.

::: info

For the full prerequisites and setup guide for Chrome's built-in AI, see the [<VPIcon icon="fa-brands fa-chrome"/>official Chrome AI getting started documentation](https://developer.chrome.com/docs/ai/get-started).

<SiteInfo
  name="Get started with built-in AI  |  AI on Chrome  |  Chrome for Developers"
  desc="Learn the requirements to start building features and applications with built-in AI."
  url="https://developer.chrome.com/docs/ai/get-started/"
  logo="https://gstatic.com/devrel-devsite/prod/v6ae673272608590539f8a06b3f3271c0f5688cde07499d1c9e644aeb66c8c060/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/docs/ai/get-started/images/cover.png"/>

:::

---

## Where Web AI Is Headed

The browser is evolving into something that doesn't really have a clean name yet. It's no longer just a document viewer, and it's not quite a native app runtime either. Instead, it's becoming an intelligent edge node – a piece of infrastructure that can perceive, process, and act all on its own, without constantly phoning home for permission.

A few massive shifts are already well underway:

- **Native AI built directly into the platform:** AI capabilities are turning into standard browser APIs. Because they're cached and shared across the entire ecosystem, you won't have to re-download massive models for every single domain you visit.<br/>Browsers designed with AI as their core foundation are already popping up. OpenAI's Atlas browser is a perfect early signal of this trend. Every year, the idea of the browser acting as an intelligent agent platform rather than a simple content renderer gets more concrete.
- **The developer shift:** For developers, the immediate future is clear: a significant chunk of AI features that currently live on expensive servers will migrate straight to the client side. It won't be everything, but the lightweight, high-frequency, and privacy-sensitive tasks will absolutely make the jump.

WebGPU isn't just a flashy demo technology, and browser inference is definitely not a toy. These are serious production tools, and they're only getting more capable as AI models shrink and user hardware gets more powerful.

If you're currently building an interactive, AI-powered feature, it's well worth pausing to ask yourself: *does this actually need a server?*

Sometimes the answer is still yes. But more and more often, the answer is a definitive no.

---

## What You Learned

In this tutorial, we covered:

- What Web AI is and how it differs from cloud-based AI
- When to use browser AI versus cloud AI and how a hybrid approach works
- The technology stack behind browser AI: tensors, TensorFlow.js, WebAssembly, WebGL, WebGPU, and MediaPipe
- How to train a custom model with Teachable Machine and export it for the browser
- How to load that model, run it against live webcam input, and manage GPU memory correctly
- How to benchmark WebGL vs WebGPU inference times to measure real performance differences
- How to access Chrome's built-in AI APIs including Gemini Nano

If you found this useful or want to connect, you can find me on [Twitter/X (<VPIcon icon="fa-brands fa-x-twitter"/>`timi471`)](https://x.com/timi471) or [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`ayantunji-timilehin`)](https://linkedin.com/in/ayantunji-timilehin).

::: info Resources

<SiteInfo
  name="TensorFlow.js | Machine Learning for JavaScript Developers"
  desc="Train and deploy models in the browser, Node.js, or Google Cloud Platform. TensorFlow.js is an open source ML platform for Javascript and web development."
  url="https://tensorflow.org/js/"
  logo="https://tensorflow.org/static/en/site-assets/images/marketing/favicon.png"
  preview="https://tensorflow.org/static/site-assets/images/project-logos/tensorflow-js-logo-social.png"/>

- [Teachable Machine](https://teachablemachine.withgoogle.com)
- [<VPIcon icon="fa-brands fa-google"/>MediaPipe Studio](https://mediapipe-studio.webapps.google.com/home)
- [<VPIcon icon="fa-brands fa-chrome"/>WebGPU in Chrome](https://developer.chrome.com/docs/web-platform/webgpu)
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome Built-in AI — Getting Started](https://developer.chrome.com/docs/ai/get-started)
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome AI Translator API](https://developer.chrome.com/docs/ai/translator-api)
- [Google Web AI Demos on GitHub (<VPIcon icon="iconfont icon-github"/>`GoogleChromeLabs/web-ai-demos`)](https://github.com/GoogleChromeLabs/web-ai-demos)
- [<VPIcon icon="iconfont icon-huggingface"/>Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js)

```component VPCard
{
  "title": "WebLLM | Home",
  "desc": "WebLLM: High-Performance In-Browser LLM Inference Engine",
  "link": "https://webllm.mlc.ai/",
  "logo": "https://webllm.mlc.ai/assets/img/logo/mlc-favicon.ico",
  "background": "rgba(85,165,217,0.2)"
}
```

<SiteInfo
  name="Go behind the browser with Chrome’s new AI features"
  desc="Google Chrome is getting upgraded with the latest AI to make it safer, smarter and more useful"
  url="https://blog.google/products-and-platforms/products/chrome/new-ai-features-for-chrome/"
  logo="https://blog.google/favicon.ico"
  preview="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Main_video_thumbnail.width-1300.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI Apps in the Browser with TensorFlow.js and WebGPU",
  "desc": "Most developers think of AI the same way: you send data to a server, the server thinks, you get a response back. That mental model made sense for a long time. It still makes sense for a lot of use cas",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-apps-in-the-browser-with-tensorflow-js-and-webgpu.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
