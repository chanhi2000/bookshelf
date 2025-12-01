---
lang: en-US
title: "How to Build No-Code AI Workflows Using Activepieces"
description: "Article(s) > How to Build No-Code AI Workflows Using Activepieces"
icon: iconfont icon-typescript
category:
  - Node.js
  - TypeScript
  - DevOps
  - Sevalla
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ts
  - typescript
  - devops
  - sevalla
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build No-Code AI Workflows Using Activepieces"
    - property: og:description
      content: "How to Build No-Code AI Workflows Using Activepieces"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-no-code-ai-workflows-using-activepieces.html
prev: /programming/ts/articles/README.md
date: 2025-12-06
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764948981880/a78ae4ab-0430-4f37-a30a-1683e1403c0a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build No-Code AI Workflows Using Activepieces"
  desc="Artificial intelligence is now part of daily work for many teams. People use it to write content, analyse data, answer support requests, and guide business decisions. But building AI workflows is still hard for many users. Most tools need code, a com..."
  url="https://freecodecamp.org/news/how-to-build-no-code-ai-workflows-using-activepieces"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764948981880/a78ae4ab-0430-4f37-a30a-1683e1403c0a.png"/>

Artificial intelligence is now part of daily work for many teams. People use it to write content, analyse data, answer support requests, and guide business decisions.

But building AI workflows is still hard for many users. Most tools need code, a complex setup, or long training.

Activepieces makes this much easier. It's an open source tool that lets anyone create smart workflows with a simple visual builder.

You can mix AI models, data sources, and systems without writing code. This makes automation more open to teams that want to work faster and cut manual effort.

In this guide, we will learn what Activepieces is, how to work with it, and how to deploy our own version to the cloud using Sevalla.

---

## What is Activepieces?

[<VPIcon icon="iconfont icon-github"/>`activepieces/activepieces`](https://github.com/activepieces/activepieces) is an open-source automation platform that focuses on ease of use.

You can host it on your own server or use it in the cloud. The platform uses a clean flow builder where each block represents a step. These blocks are called pieces.

![Activepieces Layout](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683020718/b2d3f49b-8edf-435e-bbd7-4cb10dd80dbf.png)

A piece may call an API, connect to a tool like Google Sheets, run an AI model, or wait for human input. By linking pieces together, you can build workflows that act like agents.

They can listen to events, run analysis, create content, evaluate data, or push results into other tools.

---

## Understanding the Activepieces Ecosystem

The main goal of Activepieces is to let both technical and non-technical users build workflows that include AI. It gives a simple visual interface but also has a strong developer layer under the hood.

Developers can build new pieces in TypeScript. These custom pieces then appear in the visual builder for anyone to use. This keeps advanced logic invisible behind a friendly interface.

The platform has a growing library of over two hundred pieces. Many come from the community.

![ActivePieces Integrations](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683057739/69d6eb1c-b75e-4711-9d76-0638b43c242f.png)

They include common tools like email, Slack, Google Workspace, OpenAI, and Notion. There are also pieces for reading links, parsing text, calling webhooks, or waiting for timed events.

The library grows fast because anyone can contribute new pieces. Each piece is an npm package, so it fits well into the wider JavaScript ecosystem.

Activepieces also supports human input. For example, a workflow can pause and wait for someone to review a message before sending it. It can also collect answers from a form.

These options make it possible to build flows that mix automation with human judgment. This is useful in tasks where risk or correctness matters, such as compliance checks or approval flows.

A major part of the platform is its AI-first design. It includes native support for popular AI providers. You can build agents that analyse text, rewrite messages, classify content, extract fields, or make decisions.

You can even ask the AI to clean data inside a flow, without needing code. This makes it easy to use AI to speed up work and remove repetitive steps.

---

## Building a Workflow in Activepieces

Every workflow begins with a trigger. A trigger is an action that starts the flow.

It may be a new message, a new file, a web request, or a timed schedule. After the trigger fires, the flow runs step by step. Each step is a piece you choose from the library.

The builder shows the flow in a simple vertical layout. You can add branches, loops, retries, and data mapping.

![ActivePieces Workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683082555/3a25c6b8-7454-4b2e-b421-7bbbe65212be.png)

Data mapping is the process of telling the flow how to pass information from one step to another. It uses a simple interface where you pick fields from earlier steps and connect them to new ones.

When AI pieces are added, the workflow becomes more powerful. For example, you can pass text from a form to an AI model and get a summary.

You can pass a document link and extract the main points. You can ask the AI to answer a question or decide if a message fits a category. These results then move to the next step, where they can be stored or sent.

---

## Deploying Activepieces on the Cloud using Sevalla

To use Activepieces, you can either install it on your computer (not recommended due to the complex setup), [<VPIcon icon="fas fa-globe"/>buy a cloud subscription](https://activepieces.com/), or self-host it.

If you prefer to install it on your computer, [<VPIcon icon="fas fa-globe"/>here are the instructions](https://activepieces.com/docs/install/options/docker).

Self-hosting gives you full control and is usually preferred by technical teams who want to keep sensitive data in-house.

You can choose any cloud provider, like AWS, DigitalOcean, or others to set up ActivePieces. But I will be using Sevalla.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a PaaS provider designed for developers and dev teams shipping features and updates constantly in the most efficient way. It offers application hosting, database, object storage, and static site hosting for your projects.

I am using Sevalla for two reasons:

- Every platform will charge you for creating a cloud resource. Sevalla comes with a $50 credit for us to use, so we won’t incur any costs for this example.
- Sevalla has a [<VPIcon icon="iconfont icon-sevalla"/>template for ActivePieces](https://docs.sevalla.com/templates/overview), so it simplifies the manual installation and setup for each resource you will need for installation.

[<VPIcon icon="iconfont icon-sevalla"/>Log in](https://app.sevalla.com/login) to Sevalla and click on Templates. You can see Activepieces as one of the templates.

![Sevalla Templates](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683152719/dcc829e0-c06e-4e23-b118-d09a3b5cea32.png)

Click on the “Activepieces” template. You will see the resources needed to provision the application. Click on “Deploy Template”.

![Sevalla Provisioning](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683186122/a6e557b8-b001-4fb3-9637-c208f8a7d81f.png)

You can see the resource being provisioned. Once the deployment is complete, go to the Activepieces application and click on “Visit app”. Enter your name, email and password, and you will be taken to the dashboard.

![Activepieces Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683211801/02a70ff2-7f42-4b98-8109-4acf22e690cd.png)

Click on “New Flow”. You can either create a flow from scratch or choose one of the many templates Activepieces offers.

Let's pick the “LinkedIn content idea generator” template.

![Activepieces Templates](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683242859/1dc73871-8e16-4f0b-b535-0f781a4e5cb6.png)

Click on “Use template”. You will see the workflow generated for you. You can also add/remove components based on your requirements.

![ActivePieces Workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683271246/17d52f70-0d79-47c4-ac3a-2a887136d5b9.png)

You will see the option to update each block of the workflow. You can create connections to your email, Google Sheets, and so on, to integrate them into the blocks.

In the rank news block, it will ask you to choose a model and add your API key. For example, you can find your [OpenAI API key here](https://platform.openai.com/settings/organization/api-keys). You will also see a pre-built prompt template ready for you to use with your workflow.

![AI Component](https://cdn.hashnode.com/res/hashnode/image/upload/v1764683293561/8a7baa9a-2f5c-4c64-8775-1e68308d70b4.png)

Great! You now have a production-grade Activepieces server running on the cloud. You can use this to set up all your workflows.

---

## Real-World Examples

A sales team can automate lead enrichment by passing new leads through an AI model. The AI extracts company size, industry, and intent. The results go to a CRM. The team saves hours of manual research.

A content team can create a writing assistant. It gathers ideas from a form, generates outlines using an AI model, and stores drafts in Google Docs. Editors then refine the text.

A compliance team can process long documents. They upload a file, an AI model extracts key rules, and the workflow sends a summary to reviewers. This makes it easier to track changes in regulations.

An operations team can watch for new tickets in a helpdesk system. AI summarises the ticket. The workflow checks severity and sends it to the right team. This speeds up response times.

---

## Conclusion

The idea behind Activepieces is simple: automate work that slows you down. Mix AI with your tools. Build flows visually. Let both technical and non-technical users create automation. This helps teams move faster, reduce errors, and stay focused on meaningful work.

The rise of AI means teams will use more specialised models. They will also need smooth ways to link these models with their daily tools.

No-code platforms like Activepieces give teams control and speed without asking them to learn programming. The platform keeps improving with new pieces and stronger AI features. As the community grows, the number of available integrations will rise.

::: info

Hope you enjoyed this article. Find me on [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`manishmshiva`)](https://linkedin.com/in/manishmshiva) or [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build No-Code AI Workflows Using Activepieces",
  "desc": "Artificial intelligence is now part of daily work for many teams. People use it to write content, analyse data, answer support requests, and guide business decisions. But building AI workflows is still hard for many users. Most tools need code, a com...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-no-code-ai-workflows-using-activepieces.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
