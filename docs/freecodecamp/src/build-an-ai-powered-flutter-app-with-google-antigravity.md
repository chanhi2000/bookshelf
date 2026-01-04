---
lang: en-US
title: "How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial"
description: "Article(s) > How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial"
icon: iconfont icon-antigravity
category:
  - AI
  - LLM
  - Google
  - Google Antigravity
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - antigravity
  - google-antigravity
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial"
    - property: og:description
      content: "How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-flutter-app-with-google-antigravity.html
prev: /ai/antigravity/articles/README.md
date: 2026-01-08
isOriginal: false
author:
  - name: Anna Muzykina
    url : https://freecodecamp.org/news/author/muzykina/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1767806742391/846769af-4cbe-482c-b884-8f9ca50d7456.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Antigravity > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/antigravity/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial"
  desc="As a Flutter developer who’s building a cloud-based ecosystem for digital media lifecycle management, I’m constantly looking for ways to speed up the transition from idea to prototype. In November 2025, Google launched antigravity, a new interactive ..."
  url="https://freecodecamp.org/news/build-an-ai-powered-flutter-app-with-google-antigravity"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1767806742391/846769af-4cbe-482c-b884-8f9ca50d7456.png"/>

As a Flutter developer who’s building a cloud-based ecosystem for digital media lifecycle management, I’m constantly looking for ways to speed up the transition from idea to prototype.

In November 2025, Google launched [<VPIcon icon="iconfont icon-antigravity"/>antigravity](https://antigravity.google/blog/introducing-google-antigravity), a new interactive coding platform that has fundamentally shifted my workflow.

Antigravity has completely [<VPIcon icon="fa-brands fa-youtube"/>changed how fast you can prototype](https://youtu.be/SVCBA-pBgt0&t=2s) and iterate on projects. Instead of writing boilerplate code or spending hours searching through documentation, you can describe your needs in natural language, review the plan, and let AI agents create, test, and even run the code.

This "coding in the air" approach creates the feeling of working with a very capable junior developer who never tires.

Based on my positive experience, I decided to share my first steps and thoughts about Antigravity. In this hands-on tutorial, we’ll create Water Tracker, a beautiful, modern Flutter app that helps users track their water intake with smart progress visualization and gentle reminders.

We’ll use Antigravity to let AI agents plan, write, test, and show video walkthroughs of your app. This “[**vibe coding**](/freecodecamp.org/how-to-use-vibe-coding-effectively-as-a-dev.md)” style means that you describe what you want, review plans, and approve changes – all while agents handle the heavy lifting.

The app will feature a [**glassmorphism**](/freecodecamp.org/glassmorphism-how-to-create-a-glass-card-in-figma.md) design: frosted glass cards, blurred backgrounds, subtle borders, and soft translucency. This will give the app a premium, modern feel that’s both elegant and calming.

In this tutorial, we will build **Water Tracker**: a modern Flutter app featuring an attractive glassmorphism design. We will use Antigravity’s agentic workflow to handle the heavy lifting, including a circular progress visualization and on-device smart reminders powered by Gemma.

::: note Prerequisites

To follow along, you’ll need:

- Flutter SDK installed (Flutter doctor should be clean)
- Android emulator or physical device
- Google Antigravity installed (you can use the free public preview from [<VPIcon icon="iconfont icon-antigravity"/>antigravity.google](https://antigravity.google/))

:::

---

## Understanding the Antigravity Engine

Before we dive into the code, it is important to understand what is happening under the hood. Unlike standard LLM chat interfaces that simply provide code snippets for you to copy-paste, Google Antigravity is an agentic development platform.

While the core is a familiar AI-powered IDE experience that uses the best of Google’s models, Antigravity is evolving the IDE towards an agent-first future with browser control capabilities, asynchronous interaction patterns, and an agent-first product form factor. Together, all this enables agents to autonomously plan and execute complex, end-to-end software tasks.

It connects to powerful Large Language Models, but it also has "tools" or "skills" that allow it to interact with your file system, run terminal commands like `flutter create`, and even execute the app in an emulator.

When you send a prompt, the system doesn't just guess the next word. It uses a reasoning loop to plan actions, execute them, and verify the output.

But because these agents can make autonomous decisions, your role shifts from "writer" to "editor and supervisor." You must verify the agents’ plans to ensure they follow best practices and don't introduce security or performance regressions.

---

## Prompts: the Key to Successful Vibe Coding in Antigravity

While building my platform, I learned that prompts for Google Antigravity are completely different from regular AI chats or code completers.

Antigravity is **agentic**. It means that AI agents can run commands, create files, launch apps, and test everything autonomously. This power means prompts must be structured like detailed instructions to a very capable junior developer, not short requests.

That's why every prompt in this tutorial follows the same pattern:

- **High-level goal + vibe**: I describe the feature and the desired feel (for example, glassmorphism with soft blues, premium and calming).
- **Detailed requirements in bullets**: Functionality, UX, design, performance, accessibility – everything the agent needs to deliver quality on the first try.
- **Plan-first safety**: Always include something like, "Before any commands/code: generate a detailed plan artifact (folder tree, dependencies, steps) and ask for approval." This forces the agent to think first and lets me review/correct before anything changes.
- **Verification request**: Ask for screenshots and video walkthrough artifacts so I can visually check the result.
- **No roles or fluff**: Use direct, natural language. Agents don't need "You are an expert..." to work well.

This style helps prevent mistakes (so agents can't run wild), ensures consistent premium quality (glassmorphism done right), and creates the relaxed "vibe coding" flow: you can focus on vision, approve plans, and get polished features fast.

Without this structure, agents might skip steps or produce basic results. With it, you get the beautiful, functional app we built together. In this tutorial I’ll share the prompts which I’m using.

---

## Step 1: Open Antigravity and Create a Workspace

To get started, you’ll need to download and install the Antigravity IDE. It’s important to note that Antigravity is a standalone application, not a plugin or extension for your existing editor.

It’s built as a **fork of Visual Studio Code**, which means the setup is incredibly straightforward. If you have ever used VS Code, the interface will be instantly familiar, and you can even bring over your favorite shortcuts and themes. It functions as a standalone development environment that integrates the editor, terminal, and AI agents into a single window.

Next, open the Agent manager by clicking “Open Agent Manager” (either the button at the top or in the center of the screen, as you can see below):

![Open Agent Manager in Antigravity](https://cdn.hashnode.com/res/hashnode/image/upload/v1766772585000/860da5bb-99f5-4e57-a3ef-18f93d4b6a54.png)

The panel on the left has an “+ Open Workspace” – just click that to create a new workspace:

![Click "Open Workspace" to create a new workspace in Antigravity](https://cdn.hashnode.com/res/hashnode/image/upload/v1766432535748/016d64c0-3869-48f7-860d-0a6b087db01e.png)

Then go ahead and click “Open New Workspace”:

![Open the workspace by clicking "Open New Workspace"](https://cdn.hashnode.com/res/hashnode/image/upload/v1766432590892/24504fd9-e621-4ecd-b6d5-7d99ac0fd14a.png)

Then just name it `water_tracker` and create it:

![Name and create the workspace](https://cdn.hashnode.com/res/hashnode/image/upload/v1766432640664/3d9a3522-6199-4659-a62d-ec199c87be2e.png)

Now you have a clean workspace ready for prompts:

![Workspace is now ready](https://cdn.hashnode.com/res/hashnode/image/upload/v1766432668236/e0df1845-6012-4732-97da-f45135d41680.png)

This creates a sandboxed environment where the AI agent can safely manage your files without affecting your other projects. And now your AI agents have the permission to build and test your Flutter code!

---

## Step 2: Mastering the Art of Agentic Prompting

In Antigravity, your success depends on how you communicate with your agents. Good prompts are detailed and always require a plan first. To create an effective prompt, you should think like a Project Manager: define the scope, set technical constraints, and establish a "checkpoint" before the agent executes any code.

### The Anatomy of a Perfect Prompt

As we briefly discussed above, a strong prompt follows a clear structure: **Context + Goal + Constraints + Verification**. By explicitly asking for a plan, you prevent the agent from making assumptions about your architecture or UI style that might be difficult to undo later.

Copy and paste the following prompt into the Agent Manager:

```md
Create a new Flutter project named `water_tracker`.

Design requirements:
- Glassmorphism style throughout: frosted glass cards, blurred backgrounds, subtle borders, translucency
- Soft color palette: light blues, whites, gentle gradients
- Modern, premium feel with depth and elegance

Before any commands:
1. Generate a detailed project plan artifact including:
   - Full folder structure tree
   - Recommended dependencies (e.g., shared_preferences, glassmorphism package if available)
   - High-level architecture (simple state management to start)
2. Ask for my explicit approval.

After approval:
- Run `flutter create water_tracker`
- Add dependencies
- Launch the blank app
- Provide screenshots and video walkthrough artifact.
```

![Paste the prompt into the Agent Manager chat and click the blue "+" button](https://cdn.hashnode.com/res/hashnode/image/upload/v1766433166692/2e0ba4b8-dbb0-4101-a2c6-a250ec318dbf.png)

### Analyzing the Prompt Strategy

I crafted this prompt with specific "hooks" to ensure high-quality output:

1. First, the **Design requirements** block uses sensory language ("frosted," "soft," "depth") to guide the agent's aesthetic choice.
2. Second, the **"Before any commands"** section is the most important element as it creates a safety gate. This forces the agent into a "Plan-First" mode, where it must present its logic as a readable document (an Artifact) before touching your file system.
3. Finally, the **Verification** requests (screenshots/video) ensure the agent is responsible for proving the setup was successful.

### Reviewing the Implementation Plan

After running this prompt, agent will give you plan to review. Scroll down and read everything carefully, making sure the plan looks solid. If it does, reply by clicking on the **"Proceed"** button:

![Review the response/plan and click proceed if you're happy with the results](https://cdn.hashnode.com/res/hashnode/image/upload/v1766777527328/cceff62d-9cf3-4794-b8e6-65565598b4d8.png)

### Authorizing Commands in the Agent Manager

After you proceed with the plan, the agent will begin the **Initializing Project** phase. In Antigravity, agents do not run terminal commands in the background without your knowledge. Instead, they present the specific command for your authorization.

!["Agent is running terminal commands" - for you to review](https://cdn.hashnode.com/res/hashnode/image/upload/v1766778411176/0ea3013b-e7b9-486f-ab3b-c65f2ef1b628.png)

As shown in the above screenshot, the agent will ask to run: 

```sh
flutter pub add provider shared_preferences intl flutter_animate google_fonts
```

Clicking **"Accept"** here is the specific action that gives the agent permission to actually execute the command in your workspace. This is the moment the project actually starts to exist, dependencies are added, and the initial folder structure is generated.

![Accept the agent's work](https://cdn.hashnode.com/res/hashnode/image/upload/v1766436979535/d5b65713-761a-4b3d-ad6e-ebea5be343d9.png)

### Managing Commands and Folders

The "Step Requires Input" gate ensures you maintain full control over what’s being installed on your machine.

Before any directories are actually made, the agent displays the exact `mkdir` command it plans to run. You’ll need to review this proposed folder structure and click the blue **"Accept"** button to authorize the agent to physically create those paths in your workspace.

![Accept the agent creating specific paths in your workspace](https://cdn.hashnode.com/res/hashnode/image/upload/v1766778588513/d348cab7-147a-4733-8a31-cf66010a2449.png)

### Verifying the Emulator Launch

Before launching on the emulator, the agent will ask for permission to launch it:

![Agent asking permission to launch emulator](https://cdn.hashnode.com/res/hashnode/image/upload/v1766779040373/7cfcaf88-ba61-40d2-8eda-f100a65c0151.png)

The agent will then initialize the project and show you the running app in the integrated emulator:

![Agent showing the running app](https://cdn.hashnode.com/res/hashnode/image/upload/v1766833166339/bab74ad2-d15a-4870-b767-1f8a08ca8836.png)

Also, the agent tests the app and records a few seconds of video to demonstrate that all buttons are working:

![dad906af-b0a4-450d-9fcd-68b914c54c85](https://cdn.hashnode.com/res/hashnode/image/upload/v1766833182488/dad906af-b0a4-450d-9fcd-68b914c54c85.png)

---

## Switching to the Editor for Verification

Once the agent has finished initializing the project and building the directory structure, you’ll want to see the results of its work.

Because Antigravity is an agentic IDE, it often keeps the focus on the **Agent Manager** while it runs terminal commands and generates code in the background. To switch from the agent's log to the actual source code, click the “Open editor” button (the `< >` icon) located at the top right of the interface.

![Checking project folders/files](https://cdn.hashnode.com/res/hashnode/image/upload/v1767653383038/5f84773b-0b04-4417-9c1b-c992f1a9e9c1.png)

Clicking this button reveals the **Explorer** view on the left, where you can now see the newly created `water_tracker` project. You should explore the <VPIcon icon="fas fa-folder-open"/>`lib/` directory to verify that the agent successfully created <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` and organized your files into the `core`, `data`, and `ui` folders as proposed in its earlier plan.

This is your chance to perform a sanity check on the code itself. Open <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` to ensure the agent correctly set up the `WaterTrackerApp` and initialized your theme before you proceed to the next stage of development.

![Perform your sanity check](https://cdn.hashnode.com/res/hashnode/image/upload/v1766783330487/83adf159-a017-40e6-9c93-299c243735ca.png)

### Understanding Orchestration vs. Verification

Just to clarify, in Antigravity, the transition between the Agent Manager and the Open editor button (the `< >` icon) represents a shift from **orchestration** to **verification**:

- **The Agent Manager View (Orchestration)**: When you click **Open Agent Manager**, you’re looking at the "command center" for the AI agents. In this view, you see a terminal-like interface where the agent proposes actions.  
    For example, as seen in your screenshot, the agent shows a "Step Requires Input" and waits for you to click Accept on a terminal command like `flutter pub add`. You can’t edit code here – you can only approve or reject the agent's planned terminal operations.
- **The Editor View (Verification)**: When you click the **'Open editor'** button (the `< >` icon) in the top right, the IDE reveals the standard VS Code-style workspace. This is where the physical files (like <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` and the folder structure you just authorized) actually appear.  
    While the Agent Manager shows you the *log* of what the agent did, the Editor View allows you to open those files to verify that the code follows your standards and is ready for production.

### Summary of Workflow

In short: you use the Agent Manager to authorize the agent to run terminal commands and create folders, and you click the 'Open editor' button to actually see, explore, and edit the resulting files.

---

## Step 3: Implement the Glassmorphic Main Screen

Now it’s time to create the beautiful UI. Glassmorphism relies on the `BackdropFilter` widget and `ClipRRect` to create that "frosted glass" effect. We want a central progress ring that shows how much water we’ve had and that feels physical and tactile.

Paste in the following prompt:

```md :collapsed-lines
Implement the main water tracking screen with glassmorphism design.

Detailed requirements:
- Large central circular progress ring (frosted glass style, blurred background visible through it)
- Big floating "+" button with glass effect and subtle glow on tap
- Current intake text in large, elegant font
- Glassmorphic card below showing "X glasses · Y ml of 2000 ml"
- Scrollable history list in frosted cards
- Empty state with calming illustration/text
- Smooth fill animation on progress ring when adding water

Before coding:
1. Plan artifact with:
   - Glassmorphism implementation approach (BackdropFilter, ClipRRect, etc.)
   - Widget hierarchy
   - Animation details
2. Ask approval.

After approval:
- Generate code
- Hot reload
- Provide video walkthrough showing:
   - Adding water multiple times
   - Progress ring filling with glass effect
   - History cards appearing
```

If all looks good, approve the plan. The agent should build a stunning glassmorphic interface. Tap “+” and watch the ring fill with a silky animation through the frosted glass.

![Demo of the animation](https://cdn.hashnode.com/res/hashnode/image/upload/v1766835614486/1930f868-07a9-4264-95cc-af48f163549f.png)

---

## Step 4: Add Persistence and Daily Logic

An app is only useful if it remembers your data. We’ll use `shared_preferences` for simple local storage. We also need logic that checks the current date and resets the counter to zero at midnight.

We’ll now ask the agent to add persistence and daily reset logic using shared_preferences.

The app should save the intake and the last reset date. Before implementing, explain how the midnight reset check will be triggered.

Use this prompt:

```md
Add persistence and daily reset.

Requirements:
- Use shared_preferences to save intake and last reset date
- Auto-reset to 0 ml at midnight
- Preserve today's history until reset
- Simple settings dialog to change daily goal

Before changes:
1. Plan with storage and reset logic
Ask approval.

After:
- Implement
- Test app close/reopen
- Video: add water → close → reopen → data persists
```

Review the agent’s logic for the reset. A common pitfall is only checking the date when the app first opens – so make sure that the agent accounts for the app staying open in the background overnight.

Your progress now survives:

![Saved progress](https://cdn.hashnode.com/res/hashnode/image/upload/v1766837605166/93c57ff2-c279-4897-b8b3-e2697b76064b.png)

---

## Step 5: Add On-Device Smart Reminders with Gemma

The most advanced feature of our Water Tracker is the smart reminder system powered by **Gemma 3n**. Unlike traditional reminders that use static, repetitive text, these reminders are generated dynamically to keep the user engaged and motivated. The primary goal of these reminders is to track the user's progress against their daily hydration goal and provide personalized nudges that ensure they stay on schedule throughout the day.

To achieve this, we’ll use Gemma 3n, which is a specialized variant of Google’s open-weight model family designed specifically for on-device performance. Gemma 3n acts as our AI Hydration Coach by analyzing the user's current intake status. For example, it notices if a user has only consumed 500ml out of their 2000ml goal by mid-afternoon. It then uses this context to generate a friendly, unique message.

We’re using Gemma 3n here for several critical reasons:

- **Privacy and data sovereignty**: Because Gemma 3n runs fully locally on the user's phone, no personal health data or daily habits ever leave the device, providing a "privacy-first" experience where no data leaks to the cloud.
- **Next-generation architecture**: Gemma 3n uses the same architecture as the latest Gemini Nano, which allows it to offer incredible speed and efficiency while maintaining a minimal footprint on the device's battery and memory.
- **Native multimodal support**: This model is unique because it features native audio support for the first time, meaning that while we are currently using it for text notifications, the app is future-proofed for voice-based logging and interaction.

Copy and paste in this prompt:

```md
Add on-device hydration reminders using Gemma.

Requirements:
- Use flutter_gemma or similar 2025 package for Gemma 3n
- Every 2 hours, check progress
- If behind schedule, show local notification: friendly, motivational message like "Time for a refreshing glass! You've had X of Y ml today."
- Use simple on-device prompt for variety
- Toggle in settings
- Privacy badge: "Reminders powered locally"

Before implementation:
1. Plan with package, notification setup, and timing logic
Ask approval.

After:
- Implement
- Test (simulate time or wait)
- Video showing notification appearing.
```

You should verify that the agent is not making frequent, battery-draining calls to the model. The reminders should be scheduled efficiently using background tasks.

![Reminders with Gemma](https://cdn.hashnode.com/res/hashnode/image/upload/v1766838947780/f051ad6e-383d-4965-ae41-dd939cb181c9.png)

::: tip To test the AI Hydration Coach:

1. Go to Settings (gear icon).
2. Enable the "AI Hydration Coach" toggle.
3. You should receive a simulated notification immediately with a motivational message like: *"Hydration Buddy 💧: Stay hydrated! You're at X% of your daily goal."*

:::

---

## Step 6: Final Polish

To finish the app, we will add micro-interactions – the small details that make an app feel premium. This includes a confetti celebration when the daily goal is met and a wave animation for the empty state.

Use this prompt:

```md
Add final polish:
- Confetti explosion when reaching 100% goal
- Glassmorphic settings screen
- Better empty state with subtle wave animation
- Optimize performance

Implement one at a time with quick video updates.
```

Run the app on your phone. Add water throughout the day and enjoy the glassmorphic beauty, gentle reminders, and celebration when you hit your goal.

![Screenshot showing various app features like setting goals and saving](https://cdn.hashnode.com/res/hashnode/image/upload/v1766840697130/8227c083-76af-4ab3-9b59-fd645e429dad.png)

Then go back to your app and click the ‘+’ button to get the results. After you get a score of 100%, the confetti will be visible:

![Showing confetti when you reach your goal](https://cdn.hashnode.com/res/hashnode/image/upload/v1766839488270/7e9f12ce-0d68-45e5-a01d-1634f367e311.png)

### Reviewing the Final Changes

As the agent works, use the **'Open editor'** button (the `< >` icon) to inspect the new animations. When checking the performance optimization, look for the agent's use of `RepaintBoundary` around the glassmorphic layers. This is a key indicator that the agent is following high-performance Flutter standards rather than just writing simple code.

Once every micro-interaction is verified, your Water Tracker is ready for primetime. Run it on your device, log your water throughout the day, and enjoy the combination of glassmorphic beauty, privacy-first reminders, and the celebration of your health goals.

::: warning Antigravity Quota Limit

If your favorite model notifies you that it's reached its quota limit, you can switch to another model before the limit resets. As you can see in my screenshot, my favorite Gemini 3 Pro won’t be available until 8:26 PM, so I'll select another model from the drop-down menu to use before then.

![Selecting another model to use](https://cdn.hashnode.com/res/hashnode/image/upload/v1766831055155/c04b71e6-2949-4294-aa9b-3c8df8511c19.png)

:::

---

## Conclusion

In this tutorial, you built a helpful habit-tracking app using **agentic development**.

You learned about:

- Managing workspaces in Antigravity
- Writing detailed, plan-first prompts
- Creating glassmorphism designs
- Integrating on-device AI with Gemma
- Rapid, high-quality prototyping

This is how modern Flutter development feels: focused on creativity, not boilerplate.

Happy vibe coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Powered Flutter App with Google Antigravity: A Hands-On Tutorial",
  "desc": "As a Flutter developer who’s building a cloud-based ecosystem for digital media lifecycle management, I’m constantly looking for ways to speed up the transition from idea to prototype. In November 2025, Google launched antigravity, a new interactive ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-flutter-app-with-google-antigravity.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
