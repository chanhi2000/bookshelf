---
lang: en-US
title: "How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension"
description: "Article(s) > How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension"
icon: fa-brands fa-chrome
category:
  - TypeScript
  - Web Browser
  - Google
  - Chrome
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension"
    - property: og:description
      content: "How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-performance-audits-into-ai-fix-prompts-with-a-devtools-extension.html
prev: /tool/chrome/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Olamilekan Lamidi
    url: https://freecodecamp.org/news/author/olamilekanlamidi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/70dc4877-86de-43ec-bdf5-9a6dc34b7bf1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programmming/ts/articles/README.md",
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

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension"
  desc="Performance tools are good at showing you what's slow. They can tell you that your Largest Contentful Paint is 4.2 seconds, your JavaScript bundle is too large, or an image below the fold is loading t"
  url="https://freecodecamp.org/news/how-to-turn-performance-audits-into-ai-fix-prompts-with-a-devtools-extension"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/70dc4877-86de-43ec-bdf5-9a6dc34b7bf1.png"/>

Performance tools are good at showing you what's slow. They can tell you that your Largest Contentful Paint is 4.2 seconds, your JavaScript bundle is too large, or an image below the fold is loading too early.

But they usually don't tell you the next info you need as a developer: **What should I ask my coding agent to change?**

AI coding agents can help you fix performance issues, but they need clear context. If you type "make this site faster", you'll often get broad advice. If you give the agent the metric, the affected resource, the likely cause, and the files to inspect first, you have a much better chance of getting a useful patch.

In this tutorial, you'll learn how to turn a browser performance finding into a structured AI fix prompt. You'll also see how to add a "Copy AI fix prompt" button to a Chrome DevTools extension.

I'll use PerfLens, a Chrome DevTools extension I built, as the example. But the same pattern works with any tool that can collect performance data.

---

## What You Will Build

You'll build a small pipeline that looks like this:

```plaintext
Performance finding
  -> Structured issue object
  -> AI fix prompt
  -> Clipboard
  -> Coding agent
  -> Code change
  -> Re-run audit
```

By the end, you will have:

- A `Finding` type for storing audit results
- A prompt builder function
- A copy-to-clipboard function
- A DevTools panel button that copies the generated prompt
- A simple way to verify whether the fix worked

---

## Prerequisites

To follow along, you should understand:

- Basic JavaScript or TypeScript
- Basic browser extension concepts
- How Chrome DevTools panels work at a high level
- How to use an AI coding agent such as Cursor, Claude Code, GitHub Copilot, or a similar tool

You don't need to build a full performance auditing engine for this tutorial. The focus is the handoff between a performance tool and a coding agent.

---

## Why Performance Reports Are Hard to Turn into Code Changes

A performance score is a symptom. For example, a report might say:

```plaintext
Largest Contentful Paint: 4.2 seconds
```

That number matters, but it doesn't tell you where the fix lives.

The cause might be:

- A large hero image
- A render-blocking script
- Too much JavaScript on the initial route
- A slow API request
- Missing image dimensions that cause layout shift

As a developer, you usually have to translate the report into a code-level task.

That translation step takes time. It's also the step where a coding agent can help most, if you give it enough context.

Instead of asking your agent to "make the site faster", you can give it a focused brief:

```plaintext
The homepage has a 258.1 KB image affecting load performance.
Inspect the hero section and image component first.
Resize or compress the image without changing the layout.
Then explain how to verify the improvement.
```

This is easier for the agent to act on because it points to one specific problem.

---

## What an AI Fix Prompt Should Include

A good AI fix prompt should read like a short engineering brief.

It should include:

- The performance problem
- The measured evidence
- The affected page or resource
- The likely cause
- The files or patterns to inspect first
- A recommended fix
- Constraints for the change
- Verification steps

Here is an example prompt:

```md
You are helping optimize a Next.js app in a production build.

Problem: Image is 258.1 KB and may be slowing down the page.
Evidence: Image size = 258.1 KB
Page: http://localhost:3000
Affected resource: http://localhost:3000/_next/image?url=%2Fhome%2Four_story.webp&w=3840&q=75

Likely cause:
The page is loading an image that is larger than needed for its rendered size.

Inspect first:
- app/page.tsx or pages/index.tsx
- components/**/*.{tsx,jsx}
- next.config.js
- the hero section or image component

Recommended fix:
Resize or compress the image, use an appropriate modern format, and keep explicit width and height values so the layout does not shift.

Constraints:
- Keep the change local to the route or component causing the issue.
- Do not add a new dependency unless there is no reasonable alternative.
- Explain the change before applying it.

After the change:
- Re-run the performance audit.
- Confirm the image transfer size is lower.
- Confirm the layout still looks correct.
```

This prompt is specific. It tells the agent what happened, where to look, what to change, and how to check the result.

That's the core idea behind an AI patch brief.

Here is what that looks like inside PerfLens. A single performance finding is rendered as an AI patch brief, with the measured value, the affected resource, and the generated prompt gathered in one place. The "Copy AI fix prompt" button then hands the whole brief off to your coding agent in one click.

![PerfLens screenshot](https://cdn.hashnode.com/uploads/covers/69daa79bc8e5007ddbe1b633/2f5fa3ec-f3c1-44d0-b53b-3ce37fac65e9.png)

---

## How to Store a Performance Finding as Structured Data

Before you can build a prompt, you need to store the performance issue as data.

Here is a simple TypeScript type:

```ts
type Finding = {
  id: string;
  title: string;
  metric: string;
  measured: string;
  budget?: string;
  resource?: string;
  likelyCause: string;
  recommendedFix: string;
  inspectFirst: string[];
  severity: "low" | "medium" | "high";
};
```

Each field has a job:

- `id` identifies the type of issue.
- `title` gives the human-readable summary.
- `metric` names the measurement.
- `measured` stores the actual value.
- `budget` stores the target value, if you have one.
- `resource` stores the affected URL, file, or asset.
- `likelyCause` explains why the issue may be happening.
- `recommendedFix` gives the agent a direction.
- `inspectFirst` points the agent toward likely files.
- `severity` helps you decide what to show first.

Here is an example finding for an oversized image:

```ts
const finding: Finding = {
  id: "image-weight",
  title: "Image is 258.1 KB and may be slowing down the page",
  metric: "Image size",
  measured: "258.1 KB",
  resource: "http://localhost:3000/_next/image?url=%2Fhome%2Four_story.webp&w=3840&q=75",
  likelyCause:
    "The page is loading an image that is larger than needed for its rendered size.",
  recommendedFix:
    "Resize or compress the image, use an appropriate modern format, and keep explicit width and height values.",
  inspectFirst: [
    "app/page.tsx or pages/index.tsx",
    "components/**/*.{tsx,jsx}",
    "next.config.js",
    "the hero section or image component",
  ],
  severity: "high",
};
```

At this stage, you aren't doing anything with AI yet. You're only turning a performance result into a clean object.

That object gives you something reliable to transform into a prompt later.

---

## How to Choose the Most Important Finding

You should avoid sending ten unrelated performance issues to an agent at once.

A large prompt with many issues can lead to a large patch. That makes the result harder to review.

A better approach is to generate one prompt per finding.

You can start with a simple severity score:

```ts
function scoreFinding(finding: Finding): number {
  const severityWeight = {
    low: 1,
    medium: 2,
    high: 3,
  };

  return severityWeight[finding.severity];
}
```

Then you can sort findings by score:

```ts
function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort(
    (a, b) => scoreFinding(b) - scoreFinding(a)
  );
}
```

This is a simple version, but it's enough to get started.

Later, you can improve the score by considering:

- How far the metric is over budget
- Whether the issue affects Largest Contentful Paint
- Whether the issue affects layout shift or interaction delay
- Whether the affected resource is part of the first page load
- How confident you are in the recommended fix

The goal isn't to create a perfect scoring system. The goal is to help you focus on one high-impact issue at a time.

---

## How to Build the AI Fix Prompt

Once you have a `Finding`, building the prompt becomes a string formatting task.

You also need a small amount of page context:

```ts
type PageContext = {
  framework: string;
  mode: string;
  pageUrl: string;
};
```

Page context is a few facts about the page the finding came from: the framework the app uses, whether it's a development or production build, and the URL being audited.

The finding tells the agent *what* is slow. The page context tells it *where* the fix will land and *how* the code is built. This matters because the same problem is fixed differently from one stack to the next. An oversized image is handled through `next/image` and `next.config.js` in Next.js, but through other files and conventions elsewhere. The `mode` field also hints whether production optimizations should already be in place.

Giving the agent this up front means it spends less effort guessing about your setup and more on the actual fix.

Then you can create a prompt builder:

```ts :collapsed-lines
function buildFixPrompt(finding: Finding, ctx: PageContext): string {
  const lines = [
    "You are helping optimize a " + ctx.framework + " app in a " + ctx.mode + " build.",
    "",
    "Problem: " + finding.title,
    "Evidence: " + finding.metric + " = " + finding.measured +
      (finding.budget ? " (budget: " + finding.budget + ")" : ""),
    "Page: " + ctx.pageUrl,
  ];

  if (finding.resource) {
    lines.push("Affected resource: " + finding.resource);
  }

  lines.push(
    "",
    "Likely cause:",
    finding.likelyCause,
    "",
    "Inspect first:",
    ...finding.inspectFirst.map((file) => "- " + file),
    "",
    "Recommended fix:",
    finding.recommendedFix,
    "",
    "Constraints:",
    "- Keep the change local to the route or component causing the measured cost.",
    "- Do not add new dependencies unless there is no reasonable alternative.",
    "- Explain the change before applying it.",
    "",
    "After the change:",
    "- Re-run the performance audit.",
    "- Confirm the measured issue improved.",
    "- Check that the UI still works correctly.",
  );

  return lines.join("\n");
}
```

You can call it like this:

```ts
const pageContext: PageContext = {
  framework: "Next.js",
  mode: "production",
  pageUrl: "http://localhost:3000",
};

const prompt = buildFixPrompt(finding, pageContext);
```

The output is a prompt you can paste into a coding agent.

The `framework` field is especially useful. If the agent knows the app uses Next.js, it can look for files such as <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`, <VPIcon icon="fas fa-folder-open"/>`pages/`<VPIcon icon="fa-brands fa-react"/>`index.tsx`, `next.config.js`, and image usage through `next/image`.

---

## How to Copy the Prompt to the Clipboard

The safest integration is clipboard-first.

Many coding agents and editors support different launch methods. Some support deep links. Some run in the terminal. Some live inside an editor. But every agent can accept pasted text.

Here's a small copy function:

```ts
async function copyPrompt(prompt: string): Promise<void> {
  await navigator.clipboard.writeText(prompt);
}
```

In a browser extension UI, call this from a user action such as a button click:

```ts
copyButton.addEventListener("click", async () => {
  const prompt = buildFixPrompt(finding, pageContext);

  await copyPrompt(prompt);

  copyButton.textContent = "Prompt copied";
});
```

You can also try to open an editor after copying the prompt:

```ts
type AgentTarget = "cursor" | "vscode" | "copy-only";

async function sendToAgent(
  prompt: string,
  target: AgentTarget
): Promise<void> {
  await navigator.clipboard.writeText(prompt);

  if (target === "cursor") {
    window.location.href = "cursor://";
    return;
  }

  if (target === "vscode") {
    window.location.href = "vscode://";
    return;
  }
}
```

This doesn't paste the prompt into the agent automatically. It only copies the prompt and tries to open the selected tool.

That is a useful limitation. It keeps the workflow predictable and lets you review the prompt before sending it.

---

## How to Add the Button to a DevTools Panel

If you build this into a Chrome extension, you can expose it inside a DevTools panel.

First, register a DevTools page in your <VPIcon icon="iconfont icon-json"/>`manifest.json` file:

```json title="manifest.json"
{
  "manifest_version": 3,
  "name": "PerfLens",
  "version": "1.0.0",
  "devtools_page": "devtools.html",
  "permissions": ["clipboardWrite", "activeTab", "scripting"]
}
```

Then create the panel from your DevTools script:

```ts
chrome.devtools.panels.create(
  "PerfLens",
  "icons/icon-32.png",
  "panel.html"
);
```

Inside the panel, render each finding with a button:

```ts
function renderFinding(
  finding: Finding,
  ctx: PageContext
): HTMLElement {
  const item = document.createElement("article");
  const title = document.createElement("h3");
  const button = document.createElement("button");

  title.textContent = finding.title;
  button.textContent = "Copy AI fix prompt";

  button.addEventListener("click", async () => {
    const prompt = buildFixPrompt(finding, ctx);

    await sendToAgent(prompt, "copy-only");

    button.textContent = "Prompt copied";
  });

  item.append(title, button);

  return item;
}
```

The important part is the button handler.

When you click the button, your extension:

1. Builds a prompt from the performance finding.
2. Copies the prompt to the clipboard.
3. Shows feedback that the prompt was copied.

You can then paste the prompt into your coding agent and review the suggested patch.

---

## How to Verify the Fix

An AI-generated patch is only useful if the metric improves.

After the agent suggests a change, you should:

1. Review the code diff.
2. Run the app locally.
3. Reload the page.
4. Re-run the performance audit.
5. Compare the new measurement with the original one.

For the image example, you would check:

- Did the image transfer size go down?
- Does the image still look sharp enough?
- Did the page layout stay stable?
- Did Largest Contentful Paint improve?
- Did the change affect any other route?

This creates a simple loop:

```plaintext
Measure -> Prompt -> Patch -> Measure again
```

You shouldn't treat the agent's answer as the final authority. The browser measurement is the final authority.

---

## How This Fits Alongside Lighthouse

Lighthouse is still useful. It gives you a detailed lab audit and a consistent score. This workflow solves a different problem.

Lighthouse helps you answer:

```plaintext
How does this page perform under controlled conditions?
```

An AI patch brief helps you answer:

```plaintext
What should I ask my coding agent to fix right now?
```

You can use both.

Use Lighthouse for scoring, regression tracking, and deeper audits. Use an AI prompt workflow when you want to move from a specific finding to a code change faster.

---

## A Note on Privacy

AI fix prompts can include URLs, resource names, routes, filenames, and implementation details.

Before you paste a prompt into a cloud-based coding agent, check that it doesn't include:

- Access tokens
- Private customer data
- Internal URLs you can't share
- Secrets from environment variables
- Sensitive logs

Keep the prompt focused on the performance issue. Give the agent enough context to help, but not more than it needs.

---

## Conclusion

In this tutorial, you learned how to turn a performance audit finding into an AI fix prompt.

You created:

- A structured `Finding` type
- A way to rank findings
- A `buildFixPrompt` function
- A clipboard-first agent handoff
- A DevTools panel button
- A verification loop for checking the result

The main idea is simple: performance tools produce evidence, and coding agents need context. A good AI patch brief connects the two.

PerfLens is one example of this workflow. If you want to try the extension or inspect how it implements this flow, you can find it here:

- Chrome Web Store: [<VPIcon icon="fa-brands fa-google"/>PerfLens](https://chromewebstore.google.com/detail/perflens/gkogamlpcnneeficmcdcnnnhobnbebdc)
- Source code: [GitHub (<VPIcon icon="iconfont icon-github"/>`oluwatosinolamilekan/PerfLens`)](http://github.com/oluwatosinolamilekan/PerfLens)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Turn Performance Audits into AI Fix Prompts with a DevTools Extension",
  "desc": "Performance tools are good at showing you what's slow. They can tell you that your Largest Contentful Paint is 4.2 seconds, your JavaScript bundle is too large, or an image below the fold is loading t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-turn-performance-audits-into-ai-fix-prompts-with-a-devtools-extension.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
