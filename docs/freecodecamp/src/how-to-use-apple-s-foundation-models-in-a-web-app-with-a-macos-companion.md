---
lang: en-US
title: "How to Use Apple’s Foundation Models in a Web App with a macOS Companion"
description: "Article(s) > How to Use Apple’s Foundation Models in a Web App with a macOS Companion"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Apple
  - Swift
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - apple
  - swift
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Apple’s Foundation Models in a Web App with a macOS Companion"
    - property: og:description
      content: "How to Use Apple’s Foundation Models in a Web App with a macOS Companion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-apple-s-foundation-models-in-a-web-app-with-a-macos-companion.html
prev: /programming/js-react/articles/README.md
date: 2026-07-21
isOriginal: false
author:
  - name: Balogun Wahab
    url: https://freecodecamp.org/news/author/03balogun/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7f0e2343-7394-46b5-a4c8-3ef0fecfa57a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
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
  name="How to Use Apple’s Foundation Models in a Web App with a macOS Companion"
  desc="Not every AI feature needs a cloud model, with its per-token bills, network round-trips, and private data leaving your machine. If you're on a modern Mac, a capable language model is already on your d"
  url="https://freecodecamp.org/news/how-to-use-apple-s-foundation-models-in-a-web-app-with-a-macos-companion"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/7f0e2343-7394-46b5-a4c8-3ef0fecfa57a.png"/>

Not every AI feature needs a cloud model, with its per-token bills, network round-trips, and private data leaving your machine. If you're on a modern Mac, a capable language model is already on your disk.

**Foundation Models** is Apple's Swift framework for working with large language models. It's the on-device model behind Apple Intelligence, Apple's Private Cloud Compute, or another provider's server model.

This tutorial targets the on-device model: you send it a prompt and it runs entirely on the Mac's own hardware locally, free-per-call, and offline-friendly.

Paired with Apple Vision for reading images on device, that's enough to build real AI features like summaries, classification, and structured extraction without the data ever leaving your machine.

---

## What You Will Build

You'll build **Vision Bridge**, a web app that sends an image to a local macOS companion. The companion reads the image with Apple Vision, reasons about it with Foundation Models, and returns structured JSON to the browser: private, on-device AI behind a plain web interface.

::: info

You can find the complete source code in this GitHub repository

<SiteInfo
  name="03balogun/vision-bridge: Vision Bridge is a reference app for an article about calling Apple-native intelligence from a web app."
  desc="Vision Bridge is a reference app for an article about calling Apple-native intelligence from a web app. - 03balogun/vision-bridge"
  url="https://github.com/03balogun/vision-bridge/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/35d57b3d3297c6094f7e12fdc75a33244570deaa7b03b25755532b70f7c5af33/03balogun/vision-bridge"/>

:::

The goal isn't to build a giant product but rather to understand the architecture behind how this works.

![Screenshot of the Vision Bridge app, with image upload on the left and JSON output on the right](https://cdn.hashnode.com/uploads/covers/5db93b3da2342e8354088115/6d18db01-e921-4291-bb2e-26be2c02b304.png)

Vision Bridge has two parts:

- A React app with a split-screen interface.
- A macOS companion app that exposes a local API.

The React app has:

- An image upload area
- An image preview
- Automatic analysis after upload
- A JSON output viewer
- A companion health status indicator

The macOS companion app has:

- `GET /v1/health`
- `POST /v1/analyze-image`
- Apple Vision OCR
- Foundation Models availability checks
- Foundation Models reasoning over Vision output

The final response looks like this:

```json :collapsed-lines
{
  "support": {
    "visionAvailable": true,
    "foundationModelAvailable": true,
    "foundationModelStatus": "available"
  },
  "image": {
    "filename": "screenshot.png",
    "contentType": "image/png",
    "byteCount": 1048576,
    "width": 1440,
    "height": 900
  },
  "vision": {
    "detectedText": [
      {
        "text": "Build failed",
        "confidence": 0.96,
        "boundingBox": {
          "x": 0.12,
          "y": 0.31,
          "width": 0.45,
          "height": 0.08
        }
      }
    ]
  },
  "model": {
    "summary": "The image appears to show a software build failure.",
    "description": "A developer tool window is showing an error state with diagnostic text.",
    "suggestedTags": ["screenshot", "developer-tool", "error"],
    "possibleUses": [
      "Generate alt text",
      "Summarize screenshots",
      "Extract document data"
    ]
  }
}
```

::: note Prerequisites

To follow along, you need:

- macOS 26 or newer
- Xcode with the macOS 26 SDK
- Node.js 20 or newer
- Basic React knowledge
- Basic Swift knowledge
- A Mac that supports Apple Intelligence

:::

Foundation Models availability depends on the Mac, the OS version, and Apple Intelligence settings. The companion checks this at runtime, which we'll cover below.

---

## Why a macOS Companion App?

You can't write this in a regular React app:

```ts
import FoundationModels from "apple-frameworks";
```

That API doesn't exist in the browser. A native macOS app, however, can use any Apple framework, so the companion acts as a local bridge. The same pattern works for any native capability the web platform doesn't expose.

---

## Foundation Models Can't Read Images Directly

The public Foundation Models framework is a language model interface. It doesn't currently expose direct image input the way a multimodal cloud model might, so this tutorial never sends the image to the model. Instead, the companion feeds the Vision OCR observations and image metadata into the prompt. The model reasons over structured text, never the original pixels.

That split plays to each framework's strength: Vision is excellent at pulling machine-readable information out of images, and Foundation Models turns that information into summaries, labels, explanations, and structured output.

![Vision Bridge architecture: the browser sends the image over localhost to the Swift companion, which runs Apple Vision OCR, feeds the observations to Foundation Models, and returns structured JSON](https://cdn.hashnode.com/uploads/covers/5db93b3da2342e8354088115/a5c11ad4-dcac-4690-bc6d-08b27fd6fed8.png)

The above diagram shows the round trip that the rest of this tutorial builds. The browser sends the uploaded image as base64 JSON over localhost to the Swift companion. Inside the companion, Apple Vision runs OCR on the image and produces text observations: the recognized strings, their confidence scores, and their bounding boxes.

Those observations, not the image itself, are formatted into a prompt for Foundation Models, which generates a summary, description, and tags. The companion then bundles the Vision output and the model output into one JSON response and returns it to the browser.

---

## Project Structure

Create a project with this structure:

```sh title="file structure"
vision-bridge/
  apps/
    web/
      src/
        main.tsx
        styles.css
      package.json
      vite.config.ts
    macos-companion/
      Package.swift
      Sources/
        VisionBridgeCompanion/
          main.swift
  package.json
  README.md
```

The root `package.json` gives us a few convenient commands:

```json
{
  "scripts": {
    "dev": "npm --workspace apps/web run dev",
    "build": "npm --workspace apps/web run build",
    "companion": "swift run --package-path apps/macos-companion VisionBridgeCompanion"
  },
  "workspaces": ["apps/web"]
}
```

---

## Build the React App

The web app is intentionally simple. It has one job: let the user pick an image and show the JSON returned by the companion.

The web app uses Vite, React, Lucide icons, and a JSON viewer:

```json
{
  "dependencies": {
    "@vitejs/plugin-react": "^6.0.3",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-json-view-lite": "^2.5.0",
    "vite": "^8.1.3"
  }
}
```

After defining the dependencies, install them:

```sh
npm i
```

The API base URL points to the local companion:

```ts
const API_BASE_URL = "http://127.0.0.1:43119";
```

### Check Companion Health

The web app pings the companion so the UI can show whether the native bridge is online:

```ts
async function checkHealth() {
  setHealthError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/v1/health`);
    if (!response.ok) {
      throw new Error(`Health check failed with ${response.status}`);
    }

    const payload = await response.json();
    setHealth(payload);
  } catch (error) {
    setHealth(null);
    setHealthError(error instanceof Error ? error.message : "Companion unavailable");
  }
}
```

![Screenshot of the companion online status pill](https://cdn.hashnode.com/uploads/covers/5db93b3da2342e8354088115/dc3c37eb-1d9c-4b44-82db-f38adada4f19.png)

### Convert the Image to Base64

When the user selects a file, the app converts it to base64 so it can be sent as JSON:

```ts
function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
```

This isn't the only way to upload files. You could also use `multipart/form-data`, but JSON keeps the demo easy to inspect.

### Analyze Immediately After Upload

The app starts analysis as soon as an image is uploaded:

```ts
async function handleFile(file: File) {
  if (!file.type.startsWith("image/")) {
    setError("Choose a PNG, JPEG, HEIC, or another browser-readable image.");
    return;
  }

  const base64 = await readFileAsBase64(file);
  const nextImage = {
    file,
    previewUrl: URL.createObjectURL(file),
    base64,
  };

  setSelectedImage(nextImage);
  setAnalysis(null);
  setError(null);
  setCopied(false);

  analyzeImage(nextImage);
}
```

`handleFile` does the preparation work for every new image. It rejects anything that isn't a browser-readable image, converts the file to base64, and builds a single object holding everything the rest of the flow needs: the original `File` (for its name and MIME type), an object URL for the preview, and the base64 payload for the API call.

It then clears out the previous run the old analysis, any error message, and the "copied" indicator so the UI never shows results from the last image next to a new one. Finally, it kicks off `analyzeImage(nextImage)` immediately.

Note that it passes the fresh object directly instead of relying on the `selectedImage` state: React state updates don't apply until the next render, so reading the state here would still give you the *previous* image.

The `Analyze` button still exists in the UI, but it works as a manual rerun button.

### Send the Image to the Companion

Here's the core request:

```ts :collapsed-lines
const analysisRequestId = useRef(0);

async function analyzeImage(image = selectedImage) {
  if (!image) {
    setError("Choose an image first.");
    return;
  }

  const requestId = analysisRequestId.current + 1;
  analysisRequestId.current = requestId;

  setRequestState("loading");
  setError(null);
  setCopied(false);

  try {
    const response = await fetch(`${API_BASE_URL}/v1/analyze-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: image.file.name,
        mimeType: image.file.type || "application/octet-stream",
        base64: image.base64,
      }),
    });

    const payload = await response.json();

    if (requestId !== analysisRequestId.current) {
      return;
    }

    if (!response.ok) {
      throw new Error(payload.error?.message ?? `Analysis failed with ${response.status}`);
    }

    setAnalysis(payload);
    setRequestState("success");
  } catch (error) {
    if (requestId !== analysisRequestId.current) {
      return;
    }

    setRequestState("error");
    setError(error instanceof Error ? error.message : "Could not analyze image");
  }
}
```

This function is the entire client side of the bridge. It flips `requestState` to `loading` (which drives the spinner and disables the button), then sends a `POST` to `/v1/analyze-image` with a JSON body containing three fields: the filename, the MIME type, and the base64 image data. That body maps one-to-one onto the `AnalyzeImageRequest` struct the Swift companion decodes later.

Notice that the response is parsed as JSON *before* checking `response.ok`. That's deliberate: when the companion rejects a request (bad base64, oversized image), it still returns a JSON body with an `error.message` field, so the UI can show the companion's own explanation instead of a generic status code. On success, the payload goes straight into state, and the JSON viewer re-renders with the result.

The `requestId` bookkeeping guards against stale responses. If a user uploads a second image while the first is still analyzing, whichever request finishes *last* would win, and OCR plus model generation takes long enough that responses can genuinely arrive out of order. So every call increments a counter stored in a ref and remembers its own ID.

After the `await`, it checks whether it's still the newest request; if a newer upload started in the meantime, the older response is silently discarded instead of overwriting the latest image's result. The same check runs in the `catch` block, so an old failure can't clobber a newer success either. If you also want to cancel the in-flight HTTP request rather than just ignore its result, an `AbortController` is the natural next step.

### Render the JSON Output

The output pane uses `react-json-view-lite`:

```tsx
<JsonView
  data={jsonData}
  shouldExpandNode={allExpanded}
  style={jsonViewTheme}
/>
```

---

## Build the macOS Companion App

The companion is a Swift command-line app. It exposes a small local HTTP API.

If you come from the web side, the mapping is simple: Swift Package Manager is Swift's npm, `Package.swift` is its `package.json`, and `swift run` is its `npm start`. It ships with Xcode, so there's nothing extra to install.

The `Package.swift` file looks like this:

```swift
// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "VisionBridgeCompanion",
    platforms: [
        .macOS("26.0")
    ],
    products: [
        .executable(
            name: "VisionBridgeCompanion",
            targets: ["VisionBridgeCompanion"]
        )
    ],
    targets: [
        .executableTarget(
            name: "VisionBridgeCompanion"
        )
    ]
)
```

The companion imports the Apple frameworks it needs:

```swift
import Foundation
import FoundationModels
import ImageIO
import Network
import Vision
```

It listens on `127.0.0.1:43119`:

```swift
private let defaultPort: UInt16 = 43119
```

The app exposes two routes:

```swift
switch (request.method, request.path) {
case ("GET", "/v1/health"):
    let health = HealthResponse(support: ModelSupport.current)
    return try json(health)

case ("POST", "/v1/analyze-image"):
    let payload = try JSONDecoder().decode(AnalyzeImageRequest.self, from: request.body)
    let response = try await service.analyze(payload)
    return try json(response)

default:
    return try json(
        ErrorResponse(error: APIErrorPayload(message: "Route not found")),
        status: .notFound
    )
}
```

This `switch` is the companion's entire routing layer — no web framework, just pattern matching on the method and path.

The two routes split the work cleanly:

- `GET /v1/health` is the cheap, read-only route. It runs no analysis, it just reports whether Vision and Foundation Models are usable on this Mac via `ModelSupport.current` (covered in the next section). The React app calls it on load to render the online/offline status pill, so the user knows the bridge is up before they upload anything.
- `POST /v1/analyze-image` is where the real work happens. It decodes the request body into an `AnalyzeImageRequest` (with the same `filename`, `mimeType`, and `base64` fields the browser sent) and hands it to the analysis service. This validates the image, runs Vision OCR, prompts Foundation Models, and returns the combined result. The `try await` matters here: analysis is asynchronous, and the route simply waits for it before serializing the response.

Anything else falls through to a JSON 404, so even unknown routes respond in the same format the browser already knows how to parse.

Errors work the same way: thrown errors are caught in one place and converted into JSON error responses with an appropriate status code, which is exactly what the web app's `payload.error?.message` check reads.

One practical detail: because the browser calls the companion from a different origin (the Vite dev server), every response also carries CORS headers, and the router answers preflight `OPTIONS` requests with an empty `204`. Without that, the browser would block the `fetch` before it ever reached these routes.

---

## Check Foundation Models Availability

The companion shouldn't assume that the model is available. Check it first:

```swift
private struct ModelSupport: Encodable {
    let visionAvailable: Bool
    let foundationModelAvailable: Bool
    let foundationModelStatus: String

    static var current: ModelSupport {
        let model = SystemLanguageModel.default

        switch model.availability {
        case .available:
            return ModelSupport(
                visionAvailable: true,
                foundationModelAvailable: true,
                foundationModelStatus: "available"
            )

        case .unavailable(let reason):
            return ModelSupport(
                visionAvailable: true,
                foundationModelAvailable: false,
                foundationModelStatus: "unavailable.\(reason.description)"
            )

        @unknown default:
            return ModelSupport(
                visionAvailable: true,
                foundationModelAvailable: false,
                foundationModelStatus: "unavailable.unknown"
            )
        }
    }
}
```

A user might have an unsupported Mac, Apple Intelligence might be disabled, or the model might not be ready yet. The response tells the browser which case it's dealing with.

---

## Extract Text with Apple Vision

The companion decodes the base64 image, checks its metadata, then runs Vision OCR.

Here's the text recognition flow:

```swift
private func recognizeText(in imageData: Data) async throws -> [DetectedText] {
    var request = RecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.automaticallyDetectsLanguage = true
    request.usesLanguageCorrection = true

    let observations = try await request.perform(on: imageData)

    var detectedText: [DetectedText] = []

    for observation in observations {
        guard let candidate = observation.topCandidates(1).first else {
            continue
        }

        let bounds = NormalizedBox.from(points: [
            observation.topLeft,
            observation.topRight,
            observation.bottomRight,
            observation.bottomLeft
        ])

        detectedText.append(DetectedText(
            text: candidate.string,
            confidence: Double(candidate.confidence),
            boundingBox: bounds
        ))
    }

    return detectedText
}
```

Vision gives us structured observations:

- recognized text
- confidence scores
- normalized bounding boxes

Those observations become the model’s context.

---

## Ask Foundation Models to Explain the Vision Output

Now the companion creates a prompt from the image metadata and OCR results.

Notice the instruction:

```text
You cannot see the original image. Use only the metadata and OCR observations below.
```

That keeps the model honest. It shouldn't pretend to see pixels it never received.

Here's the prompt shape:

```swift
let textPreview = detectedText
    .prefix(30)
    .map { "- \($0.text) (confidence: \(String(format: "%.2f", $0.confidence)))" }
    .joined(separator: "\n")

let prompt = """
You are summarizing Apple Vision OCR output for a developer tool named Vision Bridge.
You cannot see the original image. Use only the metadata and OCR observations below.

Image:
- filename: \(image.filename)
- content type: \(image.contentType)
- size: \(image.width ?? 0)x\(image.height ?? 0)

OCR observations:
\(textPreview.isEmpty ? "- No text detected." : textPreview)

Return a compact JSON object with these exact keys:
summary: one sentence
description: one short paragraph
suggestedTags: 3 to 6 short tags
possibleUses: 3 to 5 practical use cases for this kind of image analysis
"""
```

Then call the model:

```swift
let session = LanguageModelSession(
    model: .default,
    instructions: "Return valid JSON only. Do not include Markdown fences."
)

let response = try await session.respond(to: prompt)
let raw = response.content.trimmingCharacters(in: .whitespacesAndNewlines)
```

Even when you ask for JSON, always validate the output. Models can still return Markdown fences or malformed text. The sample app strips simple Markdown code fences and falls back to a raw response if parsing fails.

---

## Return JSON to the Browser

The companion combines the support state, image metadata, Vision results, and model output:

```swift
return AnalyzeImageResponse(
    support: support,
    image: metadata,
    vision: VisionPayload(detectedText: detectedText),
    model: modelInsight
)
```

The browser doesn't need to know how Vision or Foundation Models work. It just receives JSON. The native app owns the native capabilities, while the web app owns the interface.

It's worth pausing on what each of the four blocks actually gives you, because they're not all the same kind of data:

- `support` tells you what was possible on this Mac. If `foundationModelAvailable` is `false`, the `model` block still exists but contains a fallback message rather than real analysis, and the `foundationModelStatus` string (for example, `unavailable.appleIntelligenceNotEnabled`) tells the UI *why*, so it can explain rather than silently degrade.
- `image` echoes back the file's metadata plus the measured pixel dimensions. It's useful as a sanity check, and you need the width and height to do anything spatial with the Vision results.
- `vision` is the ground truth. Each entry in `detectedText` is a string Vision actually found, with a confidence score between 0 and 1 and a normalized bounding box: coordinates expressed as fractions of the image size, so `x: 0.12, width: 0.45` means "starts 12% from the left and spans 45% of the width." Because the boxes are normalized, you can draw highlight overlays on the preview at any display size by multiplying by the rendered dimensions. Low-confidence entries are worth filtering or flagging before you trust them.
- `model` is interpretation, not observation. The `summary`, `description`, `suggestedTags`, and `possibleUses` fields are generated by the language model from the OCR text. This is useful as alt text, captions, or tag suggestions, but they inherit whatever the OCR missed and should be treated as a draft, not a fact. When the model's output can't be parsed as JSON, `rawResponse` carries the unparsed text so nothing is lost.

For a screenshot of a failed build, the model block might come back like this:

```json
{
  "model": {
    "summary": "The image appears to show a software build failure.",
    "description": "A developer tool window is showing an error state with diagnostic text.",
    "suggestedTags": ["screenshot", "developer-tool", "error"],
    "possibleUses": [
      "Generate alt text",
      "Summarize screenshots",
      "Extract document data"
    ]
  }
}
```

That combination (exact text with positions from Vision, plus a human-readable interpretation from the model) is enough to build real features on top of a searchable screenshot library indexed by `detectedText` and `suggestedTags`, automatic alt text for uploaded images, or click-to-highlight overlays powered by the bounding boxes.

And because the prompt lives in the companion, changing what comes back (say, extracting line items from receipts instead of tagging screenshots) is a prompt edit, not an architecture change.

---

## Run the App

Start the companion:

```sh
npm run companion
```

In another terminal, start the web app:

```sh
npm run dev
```

Open the Vite URL:

```text
http://127.0.0.1:5173
```

If that port is busy, Vite will choose another one.

The companion should be available at:

```text
http://127.0.0.1:43119
```

You can test it directly:

```sh
curl http://127.0.0.1:43119/v1/health
```

Expected response:

```json
{
  "app": "Vision Bridge Companion",
  "ok": true,
  "support": {
    "foundationModelAvailable": true,
    "foundationModelStatus": "available",
    "visionAvailable": true
  },
  "version": "0.1.0"
}
```

![Screenshot of terminal running companion](https://cdn.hashnode.com/uploads/covers/5db93b3da2342e8354088115/76a47c9a-934c-4133-ba7c-e2a9c6b6dad4.png)

---

## Conclusion

You now have a React interface that uploads an image, a Swift companion that analyzes it with Apple-native frameworks, and structured JSON flowing between them.

Vision Bridge is intentionally small, but the bridge itself is reusable. Once you have a trusted native companion, a web app can do more than send prompts to a remote model: it can ask the Mac to work with local context, use any Apple framework, and return structured data the browser can render, store, or sync.

::: info Resources

<SiteInfo
  name="Foundation Models | Apple Developer Documentation"
  desc="Perform tasks with models that specialize in language understanding, structured output, and tool calling."
  url="https://developer.apple.com/documentation/foundationmodels/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

<SiteInfo
  name="Vision | Apple Developer Documentation"
  desc="Analyze image and video content in your app using computer vision algorithms for object detection, text recognition, and image segmentation."
  url="https://developer.apple.com/documentation/vision/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Apple’s Foundation Models in a Web App with a macOS Companion",
  "desc": "Not every AI feature needs a cloud model, with its per-token bills, network round-trips, and private data leaving your machine. If you're on a modern Mac, a capable language model is already on your d",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-apple-s-foundation-models-in-a-web-app-with-a-macos-companion.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
