---
lang: en-US
title: "How to Build AI Workflows with n8n"
description: "Article(s) > How to Build AI Workflows with n8n"
icon: iconfont icon-n8n
category:
  - Node.js 
  - n8n
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - n8n
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build AI Workflows with n8n"
    - property: og:description
      content: "How to Build AI Workflows with n8n"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-workflows-with-n8n.html
prev: /programming/js-n8n/articles/README.md
date: 2025-10-14
isOriginal: false
author:
  - name: Soham Mehta
    url : https://freecodecamp.org/news/author/mehtasoham/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760371342462/f8874220-238b-4819-a6f1-c35756b355bc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "n8n > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-n8n/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build AI Workflows with n8n"
  desc="n8n is a visual, node-based automation platform that lets you automate tasks with drag-and-drop nodes. It’s popular for multi-step automations and AI chains thanks to built-in nodes for agents and app integrations. In this tutorial, you’ll build a sm..."
  url="https://freecodecamp.org/news/how-to-build-ai-workflows-with-n8n"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760371342462/f8874220-238b-4819-a6f1-c35756b355bc.png"/>

n8n is a visual, node-based automation platform that lets you automate tasks with drag-and-drop nodes. It’s popular for multi-step automations and AI chains thanks to built-in nodes for agents and app integrations.

In this tutorial, you’ll build a small personal calendar agent that listens to a chat message, extracts event details, and creates a Google Calendar entry. Along the way, you’ll learn how to set up n8n, add an AI Agent node, and pass structured data between nodes.

::: note Prerequisites

- n8n account – setup steps below.
- [<VPIcon icon="fa-brands fa-google"/>Google account](https://support.google.com/accounts/answer/27441) – you’ll create events in Google Calendar.

**How to Set Up Your n8n Account**

You can setup n8n either on the cloud or locally.

To set it up on the cloud (the easiest option), you can create a free trial account on the [<VPIcon icon="iconfont icon-n8n"/>n8n website](https://n8n.io/).

If you’d rather self-host via npm, you can install the free [<VPIcon icon="fa-brands fa-npm"/>`n8n` npm package](https://npmjs.com/package/n8n) and run it on your localhost (here are the [<VPIcon icon="iconfont icon-n8n"/>steps](https://docs.n8n.io/hosting/installation/npm/) for that).

You can also self-host via [<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) and run the n8n image on your machine. I’ll walk you through how to do that now.

First, download and install the [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/) application.

![Screenshot of the Docker website showing navigation links and buttons for "Download Docker Desktop" and "Learn about Docker for AI" under the heading "Develop Agents".](https://cdn.hashnode.com/res/hashnode/image/upload/v1760074532772/e3987b3e-403c-4a96-b7a7-ed3347acbca0.png)

Then click “Search Images” and select the `n8nio/n8n` image:

![Docker Desktop interface showing a search for "n8nio" under Images. Several container images are listed with download and star counts. Options to Pull and Run the selected image are visible.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760074368306/eff04dd0-dcae-4c34-b5a1-f28c0db72373.png)

Click `run` on the image and set your localhost port in the options.

![Screenshot of a browser window showing a "Set up owner account" page for n8n, a workflow automation tool. The form requires email, first name, last name, and password.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760076583465/5f0bea8c-8d9d-4703-9561-1ede643c852e.png)

You should now be able to access n8n on your localhost.

:::

---

## How to Build a Personal Calendar Agent

Now for the fun part! We’re going to build a workflow that listens for a chat message, uses an AI Agent to understand the user's request, and automatically creates a Google Calendar event. This simple workflow highlights n8n’s new AI capabilities.

Here’s a breakdown of the steps we’ll go through below:

1. Add a Chat node to send a message to the agent.
2. Let the AI Agent parse the message and extract key details (title, location, times).
3. Create a Google calendar event with those details.

### Step 1: Set Up the Chat Trigger

Every workflow starts with a trigger. This is the event that kicks everything off. Use a chat trigger that listens for new messages.

1. Visit the dashboard at `https://<YOUR_USERNAME>.app.n8n.cloud/home/workflows` and Click `Create Workflow`.
2. Click `“Add first step..”` and add `On chat message` as the trigger.
3. In the node's properties panel, Enable `Make Chat Publicly Available` (This will provide a URL which you can share with friends to book events on your calendar).

![n8n workflow where you click "On chat mesage" as starting node](https://cdn.hashnode.com/res/hashnode/image/upload/v1759649236134/c9ffc656-26b9-45a1-9c17-a6aa97a9e997.gif)

### Step 2: Configure the AI Agent

This node is the “brain” of the workflow. The AI Agent node can understand natural language, make decisions, and extract structured data. Each agent has 4 main modules: model, prompt, tools, and output.

#### 1. Setup the Model

Click the `+` icon after the trigger node and add the `AI Agent` node. The AI Agent needs a model to power its reasoning. Click `+` below `Chat Model` and select `OpenAI Chat Model` node.

Then select `n8n free OpenAI API credits` as your credential for now. In the future, you can sign up on the [<VPIcon icon="iconfont icon-openai"/>OpenAI Platform](https://platform.openai.com/) website and navigate to the "API keys" section to create a new secret key

![Click "AI agent" node and select the OpenAI chat model ](https://cdn.hashnode.com/res/hashnode/image/upload/v1759692503994/ac37a0bf-1d39-4fbe-9393-94fda82ea7a8.gif)

#### 2. Enable date time tool

A tool is a connected node the agent can call during execution to perform actions (like fetching data, formatting dates, or running code) rather than only reasoning in text. We will be using the “Date Time” tool to convert the user readable date into a [<VPIcon icon="fas fa-globe"/>Unix Timestamp](https://help.clicksend.com/en/articles/44235-what-is-a-unix-timestamp) before calling the Google calendar API.

Here are the steps to enable this tool:

1. Click the + button below the AI Agent Tool
2. Find the Date & Time tool
3. Set Operation as `Format a Date`
4. Select Date as `Defined automatically by the model` (allow agent to pass date itself)
5. Select Format as `Unix Timestamp`
6. Rename Output field name to `unixTime`

![n8n workflow where we click the Tool under AI agent and select the Date time tool and select "Unix timestamp" for format](https://cdn.hashnode.com/res/hashnode/image/upload/v1759692990713/e59e5f3e-4898-4aeb-af3a-e7dffbb44615.gif)

#### 3. Add agent prompt

An agent prompt is the set of instructions and context you give an AI Agent that defines its behavior, goals, and how it should interpret or respond to user inputs.

1. Double-click the AI Agent to edit the prompt.
2. Select Source for Prompt (User Message) as `Define below`
3. Copy the following prompt in the Prompt (User Message)

```md
---

## Overview
You are an agent which helps parse the user message to identify the following details:
1. The title for the meeting
2. The location of the meeting
3. The meeting start and end Unix times.

Here is the User Message: {{ $json.chatInput }}

---

## Rules for event time identification:
- The current date time now is: {{ $now }}
- Resolve relative phrases like "tomorrow", "next Friday", "in 2 hours" relative to now.
- If duration given (e.g., "30 min" or "2 hours"), compute end_time from start_time.
- If only a start time given, default duration = 60 minutes.

---

## Getting event_start and event_end unix
- Use the "Date & Time" tool to convert the computed event start and end time to unixtime.
```

![User interface of the n8n workflow editor displaying a workflow named "My workflow 2." The screen shows nodes including "When chat message received," "AI Agent," and connections to OpenAI Chat Model and Date & Time. The user is interacting with the interface, and various menu options are visible on the left sidebar.](https://cdn.hashnode.com/res/hashnode/image/upload/v1759693520456/df1a9a71-f790-42c3-9128-7289aaa35b22.gif)

#### 4. Set up structured output

1. Enable the `Require Specific Output Format` switch in AI Agent
2. Click + below Output Parser and select `Structured Output Parser`
3. Copy the following example JSON which we want to extract from user message

```json
{
  "meeting_title": "Learn Geometry",
  "meeting_location": "Library",
  "event_start": 1759644763,
  "event_end": 1759644764
}
```

![Screenshot of an AI agent interface with a dialogue box showing parameters such as source for the user message and options for enabling specific output format. The workspace also displays input and output sections with no data.](https://cdn.hashnode.com/res/hashnode/image/upload/v1759693798967/bc8ba49e-09f3-43ed-9278-1cd4ada54560.gif)

### Step 3: Add Google Calendar Node

The final step is to take the structured data from the AI Agent and create the calendar event.

1. Click the `+` icon after the AI Agent node and search for the **Google Calendar** node.
2. Select Resource as `Event` and Operation as `Create`
3. Create new OAuth2 credentials and sign in to your Google account. You'll be prompted to sign in to Google and grant N8N permission.

Now, you’re going to map the data from the AI Agent to the fields in the Google Calendar node. This is where the magic happens.

1. Select Start as `{{ DateTime.fromSeconds($json.output.event_start).toFormat("yyyy-MM-dd HH:mm:ss") }}`
2. Select End as `{{ DateTime.fromSeconds($json.output.event_end).toFormat("yyyy-MM-dd HH:mm:ss") }}`
3. Select Location as `{{ $json.output.meeting_location }}`
4. Select Summary as `{{ $json.output.meeting_title }}`

![Workflow automation interface displaying a chat message integration with an AI agent, using nodes for OpenAI Chat Model, Date & Time, and Structured Output Parser. Sidebar shows options for AI, app actions, data transformation, and more. A save button and trial information are visible at the top. Add "Google Calender" create event node](https://cdn.hashnode.com/res/hashnode/image/upload/v1759696195078/a35054a9-5c3d-44e8-9a30-5539f3675525.gif)

### Step 4: Time to Test!

That’s it! You now have an AI-powered workflow that creates events on your calendar. You can activate your workflow using the toggle at the top of the screen. Click “Open Chat” to initiate a chat conversation and send a message. You will see the entire workflow in action along with input and output of each node

You can also click on the Google calendar node to find the `htmlLink` column which will provide a URL where you can see your created event.

![A workflow automation setup in n8n showing a process where a chat message triggers an AI agent, which interacts with the OpenAI Chat Model and a Structured Output Parser to create an event. The interface includes various options like adding projects, templates, and accessing the admin panel.](https://cdn.hashnode.com/res/hashnode/image/upload/v1759696671635/a98acab0-2fa6-4c86-976e-996d5af00c59.gif)

---

## Conclusion

In this tutorial, you’ve learned how to build a simple, AI-driven automation workflow in n8n’s visual interface. The true power lies in creating personalized AI workflows by easily customizing your own agent, prompt, and tools to fit your exact needs.

n8n's ecosystem thrives on [<VPIcon icon="iconfont icon-n8n"/>community templates](https://n8n.io/workflows/), allowing you to utilize thousands of pre-built solutions or share your own creations with the community. If this guide helped you, try extending the workflow on your own and explore the n8n docs for more nodes. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build AI Workflows with n8n",
  "desc": "n8n is a visual, node-based automation platform that lets you automate tasks with drag-and-drop nodes. It’s popular for multi-step automations and AI chains thanks to built-in nodes for agents and app integrations. In this tutorial, you’ll build a sm...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-ai-workflows-with-n8n.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
