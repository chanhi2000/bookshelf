---
lang: en-US
title: "How to Develop Chrome Extensions using Plasmo [Full Handbook]"
description: "Article(s) > How to Develop Chrome Extensions using Plasmo [Full Handbook]"
icon: fa-brands fa-chrome
category:
  - Node.js
  - React.js
  - Web Browser
  - Google
  - Chrome
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Develop Chrome Extensions using Plasmo [Full Handbook]"
    - property: og:description
      content: "How to Develop Chrome Extensions using Plasmo [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-develop-chrome-extensions-using-plasmo-handbook/
prev: /tool/chrome/articles/README.md
date: 2026-05-12
isOriginal: false
author:
  - name: Preston Mayieka
    url: https://freecodecamp.org/news/author/preston176/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e0d0bca4-a2e8-495a-9c1c-4f0b9ef52630.png
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
  name="How to Develop Chrome Extensions using Plasmo [Full Handbook]"
  desc="Chrome extensions are lightweight tools that enhance and personalize your browsing experience, whether that's managing passwords, translating pages, or adding entirely new features to websites you use"
  url="https://freecodecamp.org/news/how-to-develop-chrome-extensions-using-plasmo-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e0d0bca4-a2e8-495a-9c1c-4f0b9ef52630.png"/>

Chrome extensions are lightweight tools that enhance and personalize your browsing experience, whether that's managing passwords, translating pages, or adding entirely new features to websites you use every day.

Millions of developers have published extensions to the Chrome Web Store, and building one is more approachable than you might think.

In this handbook you'll go from zero to a published Chrome extension using TypeScript, React, and Plasmo, a modern framework that handles the repetitive setup and configuration so you can focus on writing features instead of boilerplate.

Along the way you'll touch the real Chrome extension APIs that power production extensions: querying tabs, creating tab groups, and passing messages between different parts of an extension.

By the end you'll have working code, a mental model of how extensions are structured, and everything you need to publish your own ideas to the Chrome Web Store.

---

## What is Plasmo?

[<VPIcon icon="fas fa-globe"/>Plasmo](https://plasmo.com/) is an open-source framework for building browser extensions. Think of it as the equivalent of Create React App or Next.js, but for Chrome extensions.

Without Plasmo, building a Chrome extension requires manually writing a <VPIcon icon="iconfont icon-json"/>`manifest.json` file, wiring up build tooling, and configuring TypeScript and React yourself. Plasmo handles all of that.

A single command scaffolds a working project with TypeScript and React already configured. It reads your <VPIcon icon="iconfont icon-json"/>`package.json` and generates the <VPIcon icon="iconfont icon-json"/>`manifest.json` Chrome requires, so you never edit it directly.
 title="package.json"
Moreover, changes to your source files automatically rebuild and reload the extension in Chrome during development, and full type safety including types for Chrome's own APIs is available out of the box.

Plasmo doesn't hide the Chrome extension concepts from you. You still use `chrome.tabs`, `chrome.runtime`, and the rest of the Chrome APIs directly. It just removes the tedious scaffolding so you can start building immediately.

---

## What You Will Build

In this tutorial, you'll build a **Tab Grouper** Chrome extension from scratch.

This extension automatically organizes your browser tabs by grouping them based on their website domain.

![Animated demo of the Tab Grouper extension grouping open tabs into colored groups by domain](https://cdn.hashnode.com/uploads/covers/64ef9ca6a3a26476fe998b69/43f51cde-41c8-46ac-9305-6b4ad5adc1ac.gif)

::: tip Example Use Case

Imagine you have 20 tabs open: 5 from GitHub, 4 from YouTube, 3 from Stack Overflow, and 8 from other websites.

With one click, the Tab Grouper extension will automatically create colored groups for each website, making it straightforward to find and manage your tabs.

:::

::: info What You Will Learn

By completing this tutorial, you'll get hands-on experience in three areas.

First, **Chrome Extension Basics**: how extensions work under the hood, the anatomy of an extension (manifest, background scripts, popups), and how to load and test extensions in Chrome during development.

Second, **Chrome APIs**: specifically `chrome.tabs` for managing browser tabs, `chrome.tabGroups` for creating and customizing tab groups, and `chrome.runtime` for passing messages between different parts of your extension.

Third, **Modern Web Development tooling**: TypeScript for type-safe JavaScript, React for building the popup UI, and the Plasmo framework that ties it all together.

::: note Prerequisites

You don't need to be an expert in any of these, but you'll have the smoothest experience if you're comfortable with basic JavaScript or TypeScript and have a general understanding of HTML and CSS.

Some familiarity with React is helpful but not required. The pop-up component we'll build is simple enough to follow even if you're new to it.

On the software side, you'll need Node.js version 18 or higher ([<VPIcon icon="fa-brands fa-node"/>download here](https://nodejs.org/)), Google Chrome, a code editor (VS Code is recommended), and pnpm as your package manager.

**Verify Your Setup**

Open your terminal and run these commands to confirm everything is installed:

```sh
node --version
# Should output v18.0.0 or higher

npm --version
# Should output 9.0.0 or higher
```

**Getting Help**

If you get stuck, review the complete code in the repository, consult the Chrome Extension documentation, or ask for help in the community forums.

**Ready to Begin?**

In the next section, you'll set up your development environment and create your first Chrome extension project.

:::

Let's get started!

---

## Project Setup

In this section, you'll use Plasmo to scaffold your Chrome extension project, then customize it for the Tab Grouper.

Rather than creating files manually, you'll let Plasmo generate a starter project with all required configuration, then explore what was created before customizing it for our needs.

---

## Step 1: Install pnpm (Recommended)

Plasmo officially recommends **pnpm** for faster installs and better disk space usage. Check if you already have it:

```sh
pnpm --version
```

If you see a version number, skip to Step 2. ![Terminal output showing pnpm version number after running `pnpm --version`](https://cdn.hashnode.com/uploads/covers/64ef9ca6a3a26476fe998b69/aeed7b06-a403-4fe2-81fe-571a00219acf.png)

If you get "command not found", install it with:

```sh
npm install -g pnpm
```

---

## Step 2: Create Your Extension Project

Run this command to create a new Plasmo project:

```sh
pnpm create plasmo tab-grouper
#
# 🟣 Creating a new Plasmo extension
# 📁 Project name: tab-grouper
# ? Extension description: (Give your extension a nice description)
# ? Author name: (Your Name)
```

Plasmo will then scaffold the project and install dependencies automatically. You might be prompted to enter a description and author name.

Fill these in however you like.

![Terminal output showing Plasmo scaffolding a new project called tab-grouper and installing dependencies.](https://cdn.hashnode.com/uploads/covers/64ef9ca6a3a26476fe998b69/e0a58818-0bec-42a7-bde3-c7a66de68b7a.png)

### Step 3: Navigate to Your Project

```sh
cd tab-grouper
```

### Step 4: Explore What Was Created

List the files that Plasmo generated:

```sh
ls -la
```

You should see something like this:

```sh title="file structure"
tab-grouper/
├── .git/                 # Git repository (already initialized!)
├── .github/              # GitHub Actions workflows
├── assets/
│   └── icon.png          # Default Plasmo icon 
├── node_modules/         # Dependencies (already installed!)
├── package.json          # Project configuration
├── popup.tsx             # Default popup 
├── .prettierrc.cjs       # Code formatting rules
├── .gitignore            # Git ignore rules
├── README.md             # Default readme
└── tsconfig.json         # TypeScript configuration
```

The key files to know about:

- **assets/icon.png**: The extension icon required by Chrome.
- **package.json**: Lists dependencies and scripts, and is where you configure the extension manifest.
- **popup.tsx**: The UI that appears when you click the extension icon.
- **tsconfig.json**: Contains TypeScript settings that are already correctly configured.

### Step 5: Test the Default Extension

Make sure everything works **before** you customize it.

You can do this by starting the development server:

```sh
pnpm dev
#
# 🟣 Plasmo v0.90.5
# 🔴 The Browser Extension Framework
# 🔵 INFO   | Starting the extension development server...
# 🔵 INFO   | Building for target: chrome-mv3
# 🔵 INFO   | Loaded environment variables from: []
# 🟢 DONE   | Extension re-packaged in 1842ms! 🚀
# 
# iew Extension:
# 📦 build/chrome-mv3-dev
```

Your extension is ready. Keep this terminal window open.

Plasmo watches for file changes and rebuilds automatically.

### Step 6: Load the Extension in Chrome

Now load the extension into Chrome to test it:

1. Open Google Chrome
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right)
4. Click **"Load unpacked"**
5. Navigate to your project folder
6. Select the <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-dev` folder
7. Click "Select Folder"

![Animated gif showing how to load an unpacked extension in Chrome via the Extensions page developer mode](https://cdn.hashnode.com/uploads/covers/64ef9ca6a3a26476fe998b69/19cef596-a9d1-4709-8d27-594381d03842.gif)

Your extension should now appear in the list.

### Step 7: Test the Default Popup

1. Click the puzzle piece icon in Chrome's toolbar
2. Find "tab-grouper" and pin it
3. Click the extension icon

You will see a default popup that says "Welcome to Plasmo!"

![The default Plasmo popup showing a Welcome to Plasmo message in the Chrome toolbar popup](https://cdn.hashnode.com/uploads/covers/64ef9ca6a3a26476fe998b69/56bad298-b07e-41c5-a648-49e382e0c51b.png)

The extension is working. Now you can customize it.

### Step 8: Update Extension Information

Open <VPIcon icon="iconfont icon-json"/>`package.json` in your editor. This file stores metadata about your project. name, version, description, dependencies, and scripts for building and running your ex title="package.json"tension.

Find these lines near the top:

```json
{
  "name": "tab-grouper",
  "displayName": "tab-grouper",
  "version": "0.0.0",
  "description": "A basic Plasmo extension.",
  ...
}
```

Change them to:

```json{3-4}
{
  "name": "tab-grouper",
  "displayName": "Tab Grouper",
  "version": "1.0.0",
  "description": "A simple Chrome extension - group tabs by domain",
  ...
}
```

Save the file.

### Step 9: Add Required Permissions (Critical!)

**This is a critical step.** Without permissions, your extension will fail with errors like:

```plaintext
TypeError: Cannot read properties of undefined (reading 'query')
```

Chrome extensions must declare which browser APIs they intend to use. In <VPIcon icon="iconfont icon-json"/>`package.json`, find the `"manifest"` section.

It looks like this: title="package.json"

```json
"manifest": {
  "host_permissions": [
    "https://*/*"
  ]
}
```

Replace it with:

```json{3-4}
"manifest": {
  "permissions": [
    "tabs",
    "tabGroups"
  ]
}
```

Save the file. The `tabs` permission allows you to read tab information (required for `chrome.tabs.query()`), and `tabGroups` allows you to create and manage tab groups (required for `chrome.tabGroups.update()`).

### Finding the right permissions for your own extensions:

The [<VPIcon icon="fa-brands fa-chrome"/>Chrome Extension Permissions Reference](https://developer.chrome.com/docs/extensions/reference/permissions-list) lists every available permission and what it unlocks.

Each API's documentation page also lists which permissions it requires, for example, the [<VPIcon icon="fa-brands fa-chrome"/>chrome.tabs API page](https://developer.chrome.com/docs/extensions/reference/api/tabs) specifies the `"tabs"` permission.

If you're using Plasmo, the [<VPIcon icon="fas fa-globe"/>Manifest Configuration docs](https://docs.plasmo.com/framework/customization/manifest) explain how to add permissions through <VPIcon icon="iconfont icon-json"/>`package.json`.

As a general rule: if you're getting `undefined` errors whe title="package.json"n calling a Chrome API, a missing permission is the first thing to check.

### Step 10: Verify Hot Reload Works

Plasmo automatically reloads your extension when you save changes.

Check the terminal where `pnpm dev` is running. After saving <VPIcon icon="iconfont icon-json"/>`package.json` you should see something like:

```plaintext title="package.json"
🔄 Reloading extension...
✅ Ready in 0.8s
```

Your project is now ready: a working extension loaded in Chrome, a development server running with hot reload, and the required permissions in place.

Leave the dev server running and the extension loaded as you work through the next sections. Your changes will reload automatically.

### Section Summary

In this section you installed pnpm, scaffolded a new extension with `pnpm create plasmo`, explored the generated project structure, started the development server, loaded the extension in Chrome, and updated the extension metadata and permissions.

**Next:** You'll create the background script that handles the tab grouping logic.

---

## Understanding the Background Script

The background script is the heart of your extension. It runs persistently behind the scenes and contains the core logic.

In this case, the code that groups your tabs by domain.

### What is a Background Script?

A background script runs continuously even when the popup is closed.

It can listen to browser events like tabs opening, closing, or updating, perform tasks that don't require direct user interaction, and communicate with other parts of the extension by passing messages.

Think of it as the server-side of your extension. The popup is just a UI that talks to it.

### Step 1: Create background.ts

Plasmo's scaffolding didn't create a background script by default, so you'll create this file from scratch. Create a new file called <VPIcon icon="iconfont icon-typescript"/>`background.ts` in your project root (the same level as <VPIcon icon="fa-brands fa-react"/>`popup.tsx`):

```ts title="background.ts"
export {}

// Background script - runs in the background and handles tab grouping logic

console.log("Tab Grouper background script loaded!")

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GROUP_TABS") {
    groupTabsByDomain()
    sendResponse({ success: true })
  }
  return true
})
```

The `export {}` at the top is required by Plasmo to treat this file as a module. Without it you may get errors about conflicting global variable declarations.

The `console.log` will help you verify the script loaded correctly (you'll see it in the extension's DevTools console). `chrome.runtime.onMessage` sets up a listener so the background script can receive instructions from the popup.

When it receives a `"GROUP_TABS"` message, it calls the grouping function.

You can read more about this messaging pattern in the [<VPIcon icon="fa-brands fa-chrome"/>Chrome Extensions documentation](https://developer.chrome.com/docs/extensions/develop/concepts/messaging).

### Step 2: Implement Tab Grouping Logic

Now add the main grouping function below the message listener:

```ts :collapsed-lines title="background.ts"
async function groupTabsByDomain() {
  try {
    // Step 1: Get all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true })

    // Step 2: Create a Map to organize tabs by domain
    const domainGroups = new Map<string, chrome.tabs.Tab[]>()

    // Step 3: Loop through each tab and group by domain
    tabs.forEach(tab => {
      // Skip tabs without URLs
      if (!tab.url) return

      // Extract the domain from the URL
      const domain = getDomainFromUrl(tab.url)

      // Skip invalid domains (like chrome:// pages)
      if (!domain) return

      // Add tab to the appropriate domain group
      if (!domainGroups.has(domain)) {
        domainGroups.set(domain, [])
      }
      domainGroups.get(domain)!.push(tab)
    })

    // Step 4: Create tab groups for each domain (only if 2+ tabs)
    for (const [domain, domainTabs] of domainGroups) {
      // Skip domains with only 1 tab
      if (domainTabs.length < 2) continue

      // Get all tab IDs
      const tabIds = domainTabs
        .map(t => t.id!)
        .filter(id => id !== undefined)

      if (tabIds.length === 0) continue

      // Create the tab group
      const groupId = await chrome.tabs.group({ tabIds })

      // Customize the group with a title and color
      await chrome.tabGroups.update(groupId, {
        title: domain,
        color: getColorForDomain(domain) // Randomized Tab Group colors.
      })
    }

    console.log(`Successfully grouped ${domainGroups.size} domains`)
  } catch (error) {
    console.error("Error grouping tabs:", error)
  }
}
```

The function starts by querying all tabs in the current window, then iterates over them to build a `Map` keyed by domain name.

Once every tab has been sorted into a domain bucket, it loops through the map and calls `chrome.tabs.group()` for any domain that has two or more tabs, then immediately customizes the resulting group with a title and color.

Domains with only a single tab are skipped. There's no point grouping a lone tab.

### Step 3: Extract Domain Helper

Add a helper function to pull the hostname out of a URL:

```ts
function getDomainFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)

    // Skip Chrome internal pages (chrome://, chrome-extension://)
    if (urlObj.protocol === "chrome:" || urlObj.protocol === "chrome-extension:") {
      return null
    }

    // Remove "www." prefix and return the hostname
    return urlObj.hostname.replace(/^www./, "")
  } catch {
    // Return null if URL is invalid
    return null
  }
}
```

`new URL(url)` gives us a structured object to work with rather than string-parsing the URL manually.

The protocol check filters out Chrome's internal pages like `chrome://extensions` and `chrome://settings`, which extensions can't access.

The `.replace(/^www./, "")` ensures that `www.github.com` and `github.com` are treated as the same domain rather than two separate groups.

The whole thing is wrapped in a try-catch so malformed URLs simply return `null` and get skipped.

In practice: `https://www.github.com/user/repo` becomes `github.com`, `https://youtube.com/watch?v=123` becomes `youtube.com`, and `chrome://extensions` returns `null`.

### Step 4: Color Assignment Helper

Add a function to deterministically assign a color to each domain:

```ts
function getColorForDomain(domain: string): chrome.tabGroups.ColorEnum {
  // Available colors in Chrome
  const colors: chrome.tabGroups.ColorEnum[] = [
    "blue", "red", "yellow", "green", "pink", "purple", "cyan", "orange"
  ]

  // Create a simple hash from the domain name
  let hash = 0
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Return a color based on the hash
  return colors[Math.abs(hash) % colors.length]
}
```

Chrome supports eight colors for tab groups. Rather than assigning them randomly (which would change every time you group), this function hashes the domain name to a number and uses the modulo operator to pick a consistent index into the color array.

The result is that `github.com` always gets the same color across sessions, while different domains are likely to get different colors.

### Complete <VPIcon icon="iconfont icon-typescript"/>`background.ts` File

Your complete <VPIcon icon="iconfont icon-typescript"/>`background.ts` should look like this:

```ts :collapsed-lines title="background.ts"
export {}

console.log("Tab Grouper background script loaded!")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GROUP_TABS") {
    groupTabsByDomain()
    sendResponse({ success: true })
  }
  return true
})

async function groupTabsByDomain() {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true })
    const domainGroups = new Map<string, chrome.tabs.Tab[]>()

    tabs.forEach(tab => {
      if (!tab.url) return
      const domain = getDomainFromUrl(tab.url)
      if (!domain) return

      if (!domainGroups.has(domain)) {
        domainGroups.set(domain, [])
      }
      domainGroups.get(domain)!.push(tab)
    })

    for (const [domain, domainTabs] of domainGroups) {
      if (domainTabs.length < 2) continue

      const tabIds = domainTabs
        .map(t => t.id!)
        .filter(id => id !== undefined)

      if (tabIds.length === 0) continue

      const groupId = await chrome.tabs.group({ tabIds })

      await chrome.tabGroups.update(groupId, {
        title: domain,
        color: getColorForDomain(domain)
      })
    }

    console.log(`Successfully grouped ${domainGroups.size} domains`)
  } catch (error) {
    console.error("Error grouping tabs:", error)
  }
}

function getDomainFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    if (urlObj.protocol === "chrome:" || urlObj.protocol === "chrome-extension:") {
      return null
    }
    return urlObj.hostname.replace(/^www./, "")
  } catch {
    return null
  }
}

function getColorForDomain(domain: string): chrome.tabGroups.ColorEnum {
  const colors: chrome.tabGroups.ColorEnum[] = [
    "blue", "red", "yellow", "green", "pink", "purple", "cyan", "orange"
  ]

  let hash = 0
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}
```

### Testing the Background Script

If your development server isn't already running from the previous section, start it:

```sh
pnpm dev
```

To verify the background script loaded correctly, go to `chrome://extensions`, find "Tab Grouper Tutorial", and click the **"service worker"** link.

A DevTools console will open and you should see "Tab Grouper background script loaded!" confirming everything is wired up.

---

## Building the Popup UI

The popup is the small window that appears when a user clicks your extension icon in the Chrome toolbar.

It can display information, provide buttons for actions, and show settings.

In this section you'll build a React-based popup that shows live tab statistics and triggers the grouping logic in the background script.

### Step 1: Replace popup.tsx

When you ran `pnpm create plasmo`, a default <VPIcon icon="fa-brands fa-react"/>`popup.tsx` was created that just displays a welcome message.

Open that file and replace **all** of its contents with this starting skeleton:

```tsx popup.tsx
import { useState, useEffect } from "react"

function IndexPopup() {
  const [tabCount, setTabCount] = useState(0)
  const [groupCount, setGroupCount] = useState(0)
  const [isGrouping, setIsGrouping] = useState(false)

  return (
    <div>
      <h2>Tab Grouper</h2>
      <button>Group Tabs</button>
    </div>
  )
}

export default IndexPopup
```

Save the file and the extension will automatically reload.

The three state variables track the number of open tabs, the number of existing groups, and whether a grouping operation is currently in progress.

That last one lets us disable the button and show a loading state so users can't trigger multiple groupings at once.

### Step 2: Load Statistics

Now add the logic to load tab and group counts when the popup opens. Add this inside the `IndexPopup` function, right after the state declarations:

```tsx
// Load tab statistics when popup opens
useEffect(() => {
  loadStats()
}, [])

async function loadStats() {
  const tabs = await chrome.tabs.query({ currentWindow: true })
  const groups = await chrome.tabGroups.query({
    windowId: chrome.windows.WINDOW_ID_CURRENT
  })

  setTabCount(tabs.length)
  setGroupCount(groups.length)
}
```

The `useEffect` with an empty dependency array `[]` runs once when the component first mounts. In other words, every time the popup opens.

It calls `loadStats`, which queries Chrome for the current window's tabs and groups, then updates the state variables with the counts.

### Step 3: Trigger Tab Grouping

Add the handler that sends a message to the background script when the button is clicked:

```tsx
async function handleGroupTabs() {
  setIsGrouping(true)

  // Send message to background script
  await chrome.runtime.sendMessage({ type: "GROUP_TABS" })

  // Refresh statistics
  await loadStats()
  setIsGrouping(false)
}
```

`chrome.runtime.sendMessage` delivers the `{ type: "GROUP_TABS" }` message to the listener we set up in <VPIcon icon="iconfont icon-typescript"/>`background.ts`.

After the background script finishes, we reload the statistics so the group count updates immediately, then re-enable the button.

### Step 4: Build the UI

Replace the placeholder `return` statement with this complete, styled version:

```tsx :collapsed-lines popup.tsx
return (
  <div style={{
    width: 300,
    padding: 20,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  }}>
    {/* Header */}
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
        🗂️ Tab Grouper
      </h2>
      <p style={{ margin: "8px 0 0", fontSize: 13, color: "#666" }}>
        Organize your tabs by domain
      </p>
    </div>

    {/* Statistics */}
    <div style={{
      display: "flex",
      gap: 12,
      marginBottom: 20,
      padding: 12,
      background: "#f5f5f5",
      borderRadius: 8
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: "#333" }}>
          {tabCount}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          Open Tabs
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: "#0066ff" }}>
          {groupCount}
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>
          Tab Groups
        </div>
      </div>
    </div>

    {/* Group Button */}
    <button
      onClick={handleGroupTabs}
      disabled={isGrouping}
      style={{
        width: "100%",
        padding: "12px 16px",
        fontSize: 14,
        fontWeight: 500,
        color: "white",
        background: isGrouping ? "#ccc" : "#0066ff",
        border: "none",
        borderRadius: 8,
        cursor: isGrouping ? "not-allowed" : "pointer",
        transition: "background 0.2s"
      }}
    >
      {isGrouping ? "Grouping..." : "🗂️ Group Tabs by Domain"}
    </button>

    {/* Footer */}
    <div style={{
      marginTop: 16,
      padding: 12,
      fontSize: 12,
      color: "#666",
      background: "#fff9e6",
      borderRadius: 6,
      border: "1px solid #ffe066"
    }}>
      💡 <strong>Tip:</strong> This will group all tabs in this window by their website domain.
    </div>
  </div>
)
```

The UI has four parts: a header with the extension title and a short description, a statistics box showing the live tab and group counts side by side, the main action button (which grays out and changes text to "Grouping..." while work is in progress), and a tip box at the bottom.

This tutorial uses inline styles for simplicity. In a production extension, you'd likely reach for CSS modules, Tailwind, or styled-components instead.

### Complete popup.tsx File

Your complete <VPIcon icon="fa-brands fa-react"/>`popup.tsx` should look like this:

```tsx :collapsed-lines title="popup.tsx"
import { useState, useEffect } from "react"

function IndexPopup() {
  const [tabCount, setTabCount] = useState(0)
  const [groupCount, setGroupCount] = useState(0)
  const [isGrouping, setIsGrouping] = useState(false)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    const tabs = await chrome.tabs.query({ currentWindow: true })
    const groups = await chrome.tabGroups.query({
      windowId: chrome.windows.WINDOW_ID_CURRENT
    })

    setTabCount(tabs.length)
    setGroupCount(groups.length)
  }

  async function handleGroupTabs() {
    setIsGrouping(true)
    await chrome.runtime.sendMessage({ type: "GROUP_TABS" })
    await loadStats()
    setIsGrouping(false)
  }

  return (
    <div style={{
      width: 300,
      padding: 20,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
          🗂️ Tab Grouper
        </h2>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "#666" }}>
          Organize your tabs by domain
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: 12,
        marginBottom: 20,
        padding: 12,
        background: "#f5f5f5",
        borderRadius: 8
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#333" }}>
            {tabCount}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            Open Tabs
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#0066ff" }}>
            {groupCount}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            Tab Groups
          </div>
        </div>
      </div>

      <button
        onClick={handleGroupTabs}
        disabled={isGrouping}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: 14,
          fontWeight: 500,
          color: "white",
          background: isGrouping ? "#ccc" : "#0066ff",
          border: "none",
          borderRadius: 8,
          cursor: isGrouping ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}
      >
        {isGrouping ? "Grouping..." : "🗂️ Group Tabs by Domain"}
      </button>

      <div style={{
        marginTop: 16,
        padding: 12,
        fontSize: 12,
        color: "#666",
        background: "#fff9e6",
        borderRadius: 6,
        border: "1px solid #ffe066"
      }}>
        💡 <strong>Tip:</strong> This will group all tabs in this window by their website domain.
      </div>
    </div>
  )
}

export default IndexPopup
```

---

## Testing Your Extension

Now that you have both the background script and popup UI built, it's time to verify that everything works together in Chrome.

### Step 1: Make Sure the Dev Server is Running

If `pnpm dev` isn't already running from an earlier step, start it now:

```sh
pnpm run dev
# or
pnpm dev
```

Plasmo will build the extension into <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-dev` and watch for changes.

### Step 2: Load the Extension in Chrome

If you haven't already loaded the extension, go to `chrome://extensions/`, enable **Developer mode**, click **Load unpacked**, and select the <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-dev` folder.

Once loaded you should see the extension listed with the name "Tab Grouper Tutorial", version "1.0.0", and status Enabled.

### Step 3: Pin the Extension

Click the puzzle piece icon in the Chrome toolbar, find "Tab Grouper Tutorial", and click the pin icon to keep it visible.

The extension icon will now appear directly in your toolbar.

### Step 4: Test the Extension

#### Test 1: Open Multiple Tabs

Open several tabs across a few domains so there's something to group:

1. `https://github.com/topics`, `https://github.com/trending`, `https://github.com/explore`
2. `https://www.youtube.com/` and `https://www.youtube.com/trending`
3. `https://stackoverflow.com/questions` and `https://stackoverflow.com/tags`

Have at least 7 tabs open.

#### Test 2: Group the Tabs

Click the Tab Grouper extension icon. The popup should appear showing your open tab count (7 or more) and group count (probably 0).

Click **"Group Tabs by Domain"** and watch your tabs get organized into colored groups.

#### Test 3: Verify Groups

After clicking the button, GitHub tabs should be grouped together with a label like "github.com" and a consistent color, and YouTube tabs similarly.

Click the extension icon again, the group count should now show 2, while the tab count stays the same.

### Step 5: Debug the Extension

If something doesn't work, Chrome's DevTools are your best friend.

To inspect the background script, go to `chrome://extensions/`, find your extension, and click the **"service worker"** link.

A DevTools console opens where you can look for the "Tab Grouper background script loaded!" message and any error output in red.

To inspect the popup, right-click the extension icon and select **"Inspect popup"**. This opens DevTools for the popup specifically — check the Console tab for any errors there.

**If nothing happens when you click the button**, check the background script console for errors, confirm you have at least 2 tabs from the same domain, and verify the message is being sent (look in the popup console for any `sendMessage` failures).

**If tabs aren't grouping**, double-check that you added the `tabs` and `tabGroups` permissions to <VPIcon icon="iconfont icon-json"/>`package.json` and reloaded the extension after saving.
 title="package.json"
**If you see "Extension cannot access chrome://..."**, that's expected behavior — extensions can't interact with Chrome's internal pages and the code skips them intentionally.

### Step 6: Hot Reloading

One of the benefits of Plasmo is hot reloading, which allows you to update code in a running app instantly without needing to restart it manually.

Open <VPIcon icon="fa-brands fa-react"/>`popup.tsx`, change the header emoji from 🗂️ to 📁, and save.

The extension reloads automatically.

Click the icon and you'll see the updated emoji immediately.

Hot reloading is advantageous because it speeds up development by letting you see changes in real time.

You can change the emoji back afterward if you'd like to keep the extension consistent with the rest of the tutorial examples and screenshots.

### Step 7: Test Edge Cases

It's worth testing a few scenarios to make sure the extension handles them gracefully.

If you close all tabs except one and click "Group Tabs", nothing should happen. The extension requires at least two tabs from the same domain to form a group. Opening `chrome://extensions` and `chrome://settings` and then grouping should also do nothing, since those pages are filtered out.

If you have one tab from `reddit.com` and one from `freecodecamp.org`, each domain appearing only once, no groups should be created.

### Step 8: Production Build

When you're ready to share your extension, run:

```sh
pnpm run build
```

This creates a production-optimized version in <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod`, minified JavaScript, no development-only code, and smaller file size.

To verify the production build, go to `chrome://extensions/`, remove the development version, click "Load unpacked", and select <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod`. Test thoroughly before publishing.

The extension is lightweight (under 100 KB), only runs when you click the button, and has no background processes when idle.

---

## Next Steps and Extension Ideas

Congratulations on building your first Chrome extension!

You now have a working tool that groups tabs by domain with one click, shows live statistics about open tabs and groups, and is built on modern tooling: TypeScript, React, and Plasmo following Chrome extension best practices.

The extension is a solid foundation. Here are some ideas for where to take it next.

### 1. Auto-Grouping

Instead of requiring a button click, you could automatically group new tabs as they're opened. You'd listen for the `chrome.tabs.onCreated` event in <VPIcon icon="iconfont icon-typescript"/>`background.ts` and trigger `groupTabsByDomain()` with a short delay to let the page URL load:

```ts title="background.ts"
chrome.tabs.onCreated.addListener(async (tab) => {
  // Wait a bit for the URL to load
  setTimeout(() => {
    groupTabsByDomain()
  }, 2000)
})
```

This gets into event listeners, asynchronous timing, and thinking carefully about when to fire — a good next step for understanding how background scripts can be more proactive.

### 2. Keyboard Shortcuts

You can trigger grouping without even opening the popup by adding a keyboard shortcut. Add a `commands` section to the manifest in <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
"manifest": {
  "commands": {
    "group-tabs": {
      "suggested_key": {
        "default": "Ctrl+Shift+G",
        "mac": "Command+Shift+G"
      },
      "description": "Group tabs by domain"
    }
  }
}
```

Then listen for the command in <VPIcon icon="iconfont icon-typescript"/>`background.ts`:

```ts title="background.ts"
chrome.commands.onCommand.addListener((command) => {
  if (command === "group-tabs") {
    groupTabsByDomain()
  }
})
```

### 3. Category-Based Grouping

Rather than grouping by raw domain, you could group by category — putting GitHub, Stack Overflow, and npm together in a "Dev" group, for instance:

```ts title="background.ts"
const categories = {
  social: ["facebook.com", "twitter.com", "instagram.com"],
  shopping: ["amazon.com", "ebay.com", "etsy.com"],
  dev: ["github.com", "stackoverflow.com", "npmjs.com"]
}

function getCategoryForDomain(domain: string): string {
  for (const [category, domains] of Object.entries(categories)) {
    if (domains.includes(domain)) {
      return category
    }
  }
  return "other"
}
```

### 4. Options Page

Plasmo makes it trivial to add a settings page by creating an <VPIcon icon="fa-brands fa-react"/>`options.tsx` file.

This is where you'd let users toggle auto-grouping, choose between domain and category mode, or configure their own category mappings.

It's a good introduction to the Chrome Storage API and persisting user preferences.

```tsx title="options.tsx"
function OptionsPage() {
  return (
    <div>
      <h1>Tab Grouper Settings</h1>
      <label>
        <input type="checkbox" />
        Enable auto-grouping
      </label>
      <label>
        <input type="checkbox" />
        Group by category instead of domain
      </label>
    </div>
  )
}
```

### 5. Tab Age Tracking

You could track when each tab was created and surface tabs that have been sitting untouched for a week or more, a nice way to encourage tab hygiene:

```ts
// Track tab creation times
const tabCreationTimes = new Map<number, number>()

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.id) {
    tabCreationTimes.set(tab.id, Date.now())
  }
})

// Find old tabs (e.g., > 7 days)
function getOldTabs(): chrome.tabs.Tab[] {
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
  return tabs.filter(tab => {
    const created = tabCreationTimes.get(tab.id!)
    return created && created < sevenDaysAgo
  })
}
```

### 6. Search Within Groups

A search bar in the popup would let users filter their open tabs by title, making it easy to jump to a specific tab:

```tsx
const [searchQuery, setSearchQuery] = useState("")

const filteredTabs = tabs.filter(tab =>
  tab.title?.toLowerCase().includes(searchQuery.toLowerCase())
)
```

### 7. Export/Import Groups

You could let users save their current tab groups to a JSON file and restore them later. Useful for preserving a working session across restarts:

```ts
// Export
async function exportGroups() {
  const groups = await chrome.tabGroups.query({})
  const data = JSON.stringify(groups)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  chrome.downloads.download({ url, filename: 'tab-groups.json' })
}

// Import
async function importGroups(file: File) {
  const text = await file.text()
  const groups = JSON.parse(text)
  // Restore groups...
}
```

### 8. Group Statistics Dashboard

An expanded popup could show browsing analytics, total tabs opened today, most-visited domain, and more:

```tsx
function Statistics() {
  const [stats, setStats] = useState({
    totalTabs: 0,
    totalGroups: 0,
    mostUsedDomain: "",
    tabsToday: 0
  })

  return (
    <div>
      <h3>Browsing Statistics</h3>
      <p>Total tabs opened today: {stats.tabsToday}</p>
      <p>Most visited domain: {stats.mostUsedDomain}</p>
    </div>
  )
}
```

---

## Learning Resources

If you want to go deeper, the [<VPIcon icon="fa-brands fa-chrome"/>official Chrome Extension docs](https://developer.chrome.com/docs/extensions/) are excellent and cover every API in detail.

The [Chrome Extension Samples repository (<VPIcon icon="iconfont icon-github"/>`GoogleChrome/chrome-extensions-samples`)](https://github.com/GoogleChrome/chrome-extensions-samples) on GitHub has dozens of real examples to learn from. For Plasmo-specific questions, the [<VPIcon icon="fas fa-globe"/>Plasmo documentation](https://docs.plasmo.com/) and [example repository (<VPIcon icon="iconfont icon-github"/>`PlasmoHQ/examples`)](https://github.com/PlasmoHQ/examples) are the best starting points, and the community is active on [Plasmo Discord](https://plasmo.com/community).

The [<VPIcon icon="fa-brands fa-react"/>React docs](https://react.dev/) and [<VPIcon icon="iconfont icon-typescript"/>TypeScript docs](https://typescriptlang.org/docs/) are worth bookmarking as reference material, and the [<VPIcon icon="fas fa-globe"/>React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) is handy when you're unsure about specific type patterns.

For community support, Stack Overflow's `chrome-extension` tag is well-monitored, and r/chrome_extensions on Reddit is a friendly place to ask questions.

---

## Deploying to Chrome Web Store

Now that you've built and tested your extension, here's how to publish it and share it with the world.

### What You'll Need

Before you can publish, you'll need a completed and tested extension, a Google account, a $5 USD one-time developer registration fee, and some store assets such as icons, screenshots, and a written description.

The $5 fee is a one-time charge (not annual) that Google uses to verify developer identity and reduce spam. It covers unlimited extension submissions and is processed immediately via Google Payments.

### Step 1: Create a Production Build

Build your extension for production if you didn't do this before:

```sh
cd tab-grouper-tutorial
npm run build
```

This creates an optimized version in <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod/`. The production build minifies JavaScript and CSS for a smaller file size, strips out development-only code and console logs, and optimizes assets for faster loading.

Before uploading, load <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod/` as an unpacked extension and test all features one more time to confirm nothing broke in the build process.

### Step 2: Create Store Assets

#### Extension Icons

You'll need icons in three sizes: **128×128 pixels** for the main store listing (required), **48×48** for the extension management page, and **16×16** for use as a favicon.

All should be PNG files with transparent backgrounds. Keep the design simple and recognizable at small sizes. Avoid putting text in the 16×16 version.

[<VPIcon icon="fa-brands fa-figma"/>Figma](https://figma.com) is free and works well for this, as does [<VPIcon icon="fas fa-globe"/>Canva](https://canva.com) or [<VPIcon icon="fas fa-globe"/>GIMP](https://gimp.org).

#### Screenshots

Upload between 1 and 5 screenshots at either 1280×800 or 640×400 pixels (PNG or JPEG).

Show the extension in actual use rather than mockups. The popup with statistics, tabs being grouped, and the before/after state all work well.

Adding annotations to highlight key features helps users understand what they're looking at.

#### Promotional Images (Optional)

If you want to be featured on the store, you can also upload a small tile (440×280), large tile (920×680), and marquee image (1400×560). These are only needed if Google chooses to promote your extension.

#### Demo Video (Optional)

A short YouTube video (30–60 seconds) showing the extension in action can significantly increase conversions. Link to it in your store listing.

### Step 3: Write Your Store Listing

**Extension Name** (45 character limit): Be clear and descriptive. "Tab Grouper - Organize Tabs by Domain" works well. Avoid keyword stuffing or excessive punctuation.

**Summary** (132 character limit): This is what appears in search results. Lead with what the extension does: "Automatically organize browser tabs by domain. One-click grouping keeps your workspace clean and productive."

**Detailed Description** (16,000 character limit): Start with what the extension does, list features clearly, explain how to use it, address privacy, and provide contact information. Here's a template you can adapt:

```md :collapsed-lines
---

## What is Tab Grouper?

Tab Grouper automatically organizes your browser tabs by grouping them based on their website domain. No more hunting through dozens of tabs - everything is neatly organized.

---

## Features

- ✅ One-click tab grouping
- ✅ Automatic color-coding by domain
- ✅ Real-time statistics
- ✅ Works with all websites
- ✅ Lightweight and fast

---

## How to Use

1. Click the Tab Grouper icon in your toolbar
2. Click "Group Tabs by Domain"
3. Your tabs are instantly organized

---

## Why You Need This

If you regularly have numerous tabs open, finding the right one can waste valuable time. Tab Grouper solves this by automatically organizing tabs into colored groups, making navigation quick and straightforward.

---

## Privacy

This extension does not collect any personal data. It only accesses tab information locally to perform grouping. No data is sent to external servers.

---

## Support

Found a bug or have a suggestion? Contact us at support@example.com
```

**Category**: Choose **Productivity** for Tab Grouper. You can add additional languages later if you want to localize the listing.

### Step 4: Register as a Chrome Web Store Developer

Go to the [<VPIcon icon="fa-brands fa-google"/>Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole), sign in with your Google account, accept the Developer Agreement, and pay the $5 registration fee. Your account is activated within minutes.

### Step 5: Submit Your Extension

In the Developer Dashboard, click **"New Item"** and upload your extension. You can either manually zip the <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod/` folder or use Plasmo's package command:

```sh
# Option 1: Manual zip
cd build/chrome-mv3-prod
zip -r ../../tab-grouper.zip .

# Option 2: Use Plasmo package command
cd tab-grouper-tutorial
npm run package
```

Once uploaded, fill in all four sections of the store listing form: **Product details** (name, summary, description, category, language), **Graphic assets** (icon and screenshots), **Privacy practices** (see below), and **Distribution** (visibility, regions, pricing).

#### Single Purpose Description

Chrome requires each extension to have a single, clearly stated purpose. For Tab Grouper: "This extension organizes browser tabs by grouping them based on their domain name, helping users manage multiple open tabs efficiently."

#### Permission Justification

You'll need to justify each permission you declared. For `tabs`: "The tabs permission is required to read tab URLs and titles in order to group them by domain." For `tabGroups`: "The tabGroups permission is required to create and manage tab groups for organization."

#### Privacy Policy

Even though Tab Grouper doesn't collect personal data, Chrome may require a privacy policy. Host one on GitHub Pages or your personal website and link to it. Here's a minimal template:

```md :collapsed-lines
# Privacy Policy for Tab Grouper

---

## Data Collection
Tab Grouper does not collect, store, or transmit any personal data.

---

## Permissions
- **tabs**: Used only to read tab URLs for grouping purposes
- **tabGroups**: Used only to create and manage tab groups

---

## Local Processing
All tab grouping happens locally in your browser. No data is sent to external servers.

---

## Contact
For questions: your-email@example.com

Last updated: [Current Date]
```

### Step 6: Submit for Review

Before clicking submit, run through this checklist:

- Production build tested thoroughly
- All store assets uploaded (icon + at least one screenshot)
- Description is clear and accurate
- Permissions are justified
- Privacy policy is linked
- Extension name is descriptive

When you're ready, click **"Submit for review"**, confirm your details, and click **"Publish"**. Your extension enters the review queue.

### Step 7: The Review Process

Google typically reviews extensions within 1–3 business days for straightforward submissions, though complex extensions or first submissions can take up to a week. Reviewers check that the extension works as described, that permissions are justified, that there's no malicious code, and that the listing complies with Chrome Web Store policies.

You can track your status in the Developer Dashboard: Pending review → In review → Approved or Rejected. If rejected, Google will email you specific reasons and instructions for resubmitting.

The most common rejection reasons are insufficient permission justification, misleading descriptions, missing privacy policies, and requesting more permissions than necessary. Address each point in the rejection email, update your submission, and resubmit.

### Step 8: After Approval

Once approved, your extension is live at `https://chrome.google.com/webstore/detail/[extension-id]`. Share the link on social media, write a blog post, post to Reddit (r/chrome, r/chrome_extensions), or submit to Product Hunt to drive installs.

The Developer Dashboard gives you ongoing analytics — total and weekly installs, reviews and ratings, impressions, and uninstall counts. Check it regularly, especially in the first week. Respond to reviews (particularly negative ones), thank users for positive feedback, and use reported bugs to prioritize future updates.

### Step 9: Publishing Updates

When you fix bugs or add features, bump the version number in <VPIcon icon="iconfont icon-json"/>`package.json` (following [<VPIcon icon="fas fa-globe"/>Semantic Versioning](https://semver.org/) — patch for bug fixes, minor for new features, major for breaking changes), run `npm title="package.json" run build`, and upload the new package through the Developer Dashboard's **Package** tab. Updates are typically reviewed faster than initial submissions, often within 24 hours.

### Step 10: Managing Your Extension Long-Term

The Chrome Web Store provides built-in analytics, but you can also add Google Analytics if you need more detail.

For user support, an email address in the description or a GitHub issues page both work well. As you add features, keep the description updated and maintain a changelog so users know what changed and when. Responding to user questions and reviews goes a long way toward building a loyal base of users who'll recommend the extension to others.

### Troubleshooting Common Publishing Issues

**"Package is invalid" on upload**: Make sure you zipped the contents of <VPIcon icon="fas fa-folder-open"/>`build/chrome-mv3-prod/` rather than the folder itself, and verify the generated <VPIcon icon="iconfont icon-json"/>`manifest.json` is valid JSON.

**Rejection: Permissions Not Justified**: In the "Permission justification" field, be specific about which feature requires each permission and what would break without it.

**Rejection: Single Purpose Unclear**: Rewrite the single purpose description to focus on one main function, stated plainly.

**Low installation rate after launch**: Poor screenshots are often the culprit — they're the first thing most users look at. Make sure they clearly show the extension solving a real problem. Building even a small number of early reviews also makes a big difference to new visitors.

### Alternative Distribution

The Chrome Web Store is the right choice for most public extensions. If you're building an internal tool, an **Unlisted** extension (accessible only via direct link, not searchable) is a good option.

If you need to restrict it to users in a specific Google Workspace organization, a **Private** extension is available for that. Self-hosting and sideloading is possible but requires users to enable Developer Mode manually, so it's only practical for very technical audiences.

---

## Congratulations!

You've gone from an empty folder to a live Chrome extension on the Web Store. Along the way you learned how extensions are structured, how background scripts and popups communicate, how Chrome's tab APIs work, and how to navigate the publishing process end to end.

More than any specific API or configuration detail, the most important thing you've built is a mental model for how extensions work and that transfers directly to any extension idea you want to build next.

Keep building, keep learning, and keep shipping!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Develop Chrome Extensions using Plasmo [Full Handbook]",
  "desc": "Chrome extensions are lightweight tools that enhance and personalize your browsing experience, whether that's managing passwords, translating pages, or adding entirely new features to websites you use",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-develop-chrome-extensions-using-plasmo-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
