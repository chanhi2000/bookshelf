---
lang: en-US
title: "How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools"
description: "Article(s) > How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools"
icon: iconfont icon-streamlit
category:
  - Python
  - Streamlit
  - Prefect
  - Dagster
  - BentoML
  - Modal
  - Pinecone
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - streamlit
  - py-streamlit
  - prefect
  - py-prefect
  - dagster
  - py-dagster
  - bentoml
  - py-bentoml
  - pinecone
  - py-pinecone
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools"
    - property: og:description
      content: "How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-take-machine-learning-beyond-python-notebooks-with-these-helpful-tools.html
prev: /programming/py-streamlit/articles/README.md
date: 2026-02-17
isOriginal: false
author:
  - name: Oyedele Tioluwani
    url: https://freecodecamp.org/news/author/Tioluwani/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771281111134/f0951ffe-73f0-46a0-b13b-6f691322b081.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Prefect > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-prefect/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Dagster > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-dagster/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "BentoML > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-bentoml/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Pinecone > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pinecone/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools"
  desc="Machine learning tasks usually start in a Python notebook, and for good reason. Notebooks make it easy to explore data, test ideas, and iterate quickly with minimal setup. They give teams a familiar place to experiment while questions remain open and..."
  url="https://freecodecamp.org/news/how-to-take-machine-learning-beyond-python-notebooks-with-these-helpful-tools"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771281111134/f0951ffe-73f0-46a0-b13b-6f691322b081.png"/>

Machine learning tasks usually start in a Python notebook, and for good reason. Notebooks make it easy to explore data, test ideas, and iterate quickly with minimal setup. They give teams a familiar place to experiment while questions remain open and the problem's shape is coming into focus.

But as projects grow, expectations change. A model that once ran during exploration now needs to run reliably again, often outside the environment in which it was first developed. Other people need to use the results, and the work needs to hold up over time. At that point, exporting a notebook output or saving a serialized file no longer reflects everything the system is responsible for.

Modern machine learning work extends beyond interactive sessions. Models need to be packaged so they can be used consistently, executed in environments that are not tied to a single user, and supported as part of an ongoing workflow

In this article, we’ll examine the tools your team can use once their work outgrows a notebook, focusing on how those tools support the production of machine learning for real products and systems.

Let’s begin!

---

## 1. Streamlit

<SiteInfo
  name="Streamlit • A faster way to build and share data apps"
  desc="Streamlit is an open-source Python framework for data scientists and AI/ML engineers to deliver interactive data apps – in only a few lines of code."
  url="https://streamlit.io"
  logo="https://streamlit.io/favicon.svg"
  preview="https://streamlit.io/images/uploads/sharing-image-facebook.jpg"/>

![Streamlit logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1769993543152_streamlit-seeklogo.png)

When your machine learning work reaches the point where you need to share the results with others, [<VPIcon icon="iconfont icon-streamlit"/>Streamlit](https://streamlit.io/) is often part of the next step.

For instance, you might be building a forecasting or classification project and have several notebooks that already run correctly. The project behaves the way you expect, and you understand how the pieces fit together.

The next request is usually simple: someone else wants to see the output, try different inputs, or review the results without stepping into the notebooks.

Streamlit fits naturally at this stage because it works directly with the Python code you already have. A model or analysis can be wrapped in a small application that exposes only what others need to interact with. People can adjust inputs and see results update, while the underlying code remains unchanged and under the team’s control. The interaction becomes simpler, even though the logic stays the same.

Teams often bring in Streamlit when they need to:

- Walk through model behavior during internal discussions
- Share predictions or metrics with teammates outside the ML workflow
- Reuse the same logic across demos and internal tools
- Explore how outputs change under different inputs during reviews

With Streamlit, machine learning work becomes easier to use beyond the original development context. People interact directly with the results, without relying on a notebook session or the author. This helps your team move machine learning out of a personal workspace and into shared workflows, where the focus stays on using results to support real decisions.

::: info Pricing and availability

Streamlit’s core framework is open source and can be self-hosted. Streamlit Community Cloud offers a free tier for public apps, with paid options available for private deployments and team features.

:::

---

## 2. Prefect

<SiteInfo
  name="Prefect - Workflow Orchestration & AI Infrastructure"
  desc="Orchestrate workflows with Prefect. Build AI applications with Horizon. Open-source foundations, production-ready platforms."
  url="https://prefect.io/"
  logo="https://prefect.io/favicon.ico?favicon.09a45e64.ico"
  preview="https://prefect.io/og/home.png"/>

![Prefect logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1769993702216_idbe8ocH5o_logos.jpeg)

Once your machine learning work is being shared and used by others, another expectation quickly appears. The same results must be reproducible without requiring anyone to open a notebook and run it manually. What started as a successful experiment now needs to run consistently as part of an ongoing process.

[<VPIcon icon="iconfont icon-prefect"/>Prefect](https://prefect.io/) fits naturally at this stage because it integrates existing Python logic into a managed workflow. Training steps, data preparation, or evaluation logic are defined as part of a process that the system can execute autonomously. Each run produces a clear record of what happened, making it easier for the team to understand progress and respond to issues as they arise.

Once the machine learning work is expected to run autonomously, teams begin asking practical questions about how the process will operate day-to-day.

- How often should this job run without manual involvement?
- What should happen when a step fails during execution?
- How easy it is for someone else to understand or take over the workflow?
- Can the same process be re-run after changes with confidence?

Prefect supports this stage of growth by making execution reliable and visible over time. Workflows continue to run as part of normal operations, even as the code and the team expand. It enables teams to move machine learning from interactive use to processes that support regular updates and ongoing use.

::: info Pricing and availability

Prefect offers an open-source core that teams can self-host. Prefect Cloud provides a managed service with a free tier for small projects and paid plans that include advanced orchestration, collaboration, and governance features.

:::

---

## 3. Dagster

<SiteInfo
  name="Modern Data Orchestrator Platform | Dagster"
  desc="Dagster is the data orchestrator platform that helps you build, schedule, and monitor reliable data pipelines - fast, flexible, and built for teams."
  url="https://dagster.io/"
  logo="https://cdn.prod.website-files.com/681399f654933b29e12fb8bd/681cbb6702de85f9eb0bf220_32x32.png"
  preview="https://cdn.prod.website-files.com/681399f654933b29e12fb8bd/681cb5f07ccf87ece14559ef_OG%20-%20v2FIX.jpg"/>

![Dagster logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1769993959283_dagster-seeklogo.png)

Say you have a machine learning project that now runs automatically every morning at 8:00 AM. The workflow finishes before the team starts the day, and the results are already being used when people log in.

But one morning, something breaks while you’re asleep, and the expected output is missing. When you start looking into it, the harder part is not fixing the issue itself, but determining where the problem originated and what else might be affected.

[<VPIcon icon="iconfont icon-dagster"/>Dagster](https://dagster.io/) fits naturally at this point because it makes the work's structure visible. The workflow is defined as a set of steps with clear relationships, so the system reflects how the work is organized. Each part has a defined role that can be reviewed and discussed, helping teams reason about changes as requirements increase or pipelines grow.

As these workflows become part of daily operations, teams usually need clearer answers to practical questions such as:

- Which parts of the workflow depend on a given input
- What should run again when logic or data changes
- How an issue in one step affects downstream work
- Who is responsible for maintaining each section

Dagster brings the structure of a machine learning pipeline into the open. Teams can review how work is organized, understand the impact of changes, and maintain the pipeline as requirements evolve. Machine learning systems become easier to reason about when the workflow structure is clear.

::: info Pricing and availability

Dagster provides an open-source version that teams can self-host. Dagster Cloud offers a managed service with a free tier for small projects and paid plans that include enhanced observability, collaboration, and enterprise support.

:::

---

## 4. BentoML

<SiteInfo
  name="Bento: Run Inference at Scale"
  desc="Inference Platform built for speed and control. Deploy any model anywhere, with tailored inference optimization, efficient scaling, and streamlined operations."
  url="https://bentoml.com"
  logo="https://bentoml.com/bentoml-favicon/favicon-32x32.png"
  preview="https://admin.bentoml.com/uploads/bentoml_a77c421af1.png"/>

![BentoML logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1770022913045_Bentoml.png)

At some point, a trained model must leave the environment in which it was trained. The work is no longer limited to local testing, and the model is expected to run in environments outside the original setup. The moment the model is handed off, details that were implicit during development become much more important.

[<VPIcon icon="fas fa-globe"/>BentoML](https://bentoml.com/) addresses this moment by changing how the model is packaged. Rather than sharing a serialized file with separate setup notes, the model is bundled into a Bento. A Bento is a standardized distribution unit that includes the model, its dependencies, and the logic required to serve it. The model is packaged with everything needed to run it consistently.

During this handoff, teams often need clarity around:

- How the model should run outside the original environment
- What needs to be present for it to work correctly
- Where the serving logic should live
- How new versions can be introduced without repeating setup work

With BentoML, packaging becomes part of the development workflow. Models are prepared for deployment and shared as complete units rather than loose files. This makes testing, deployment, and reuse easier across teams, which is why BentoML fits naturally once machine learning work moves beyond notebook exports and into systems designed for consistent use.

::: info Pricing and availability

BentoML is open source and can be self-hosted. For teams that prefer a managed deployment experience, BentoCloud offers a hosted model serving with paid plans designed for production use.

:::

---

## 5. Modal

<SiteInfo
  name="Modal: High-performance AI infrastructure"
  desc="Bring your own code, and run CPU, GPU, and data-intensive compute at scale. The serverless platform for AI and data teams."
  url="https://modal.com/"
  logo="https://modal.com/assets/favicon.svg"
  preview="https://modal.com/assets/social-image-4.jpg"/>

![Modal logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1770023542138_modal+logo.png)

Once models and workflows are packaged and ready to run, the next question is where to execute them. Many teams start by running jobs locally or in long-lived notebook environments. That works for development, but it becomes limiting when workloads need more compute, especially GPUs, or when jobs should run only when needed rather than staying active all the time.

[<VPIcon icon="iconfont icon-modal"/>Modal](https://modal.com/) is often introduced when teams want greater control over how machine-learning workloads execute without managing infrastructure directly. Code is written in Python, but execution happens on demand. A job starts when it’s triggered, uses the resources it needs, and shuts down when it is done. This makes it practical to run heavy workloads without keeping environments running continuously.

This shows up clearly in day-to-day work when teams need to:

- Run training or inference jobs that require GPUs only at specific times
- Scale workloads beyond local machines or notebook limits
- Execute batch jobs without maintaining always-on environments
- Keep execution logic close to code while offloading compute management

Using Modal changes how teams think about machine learning execution. Compute is requested as needed rather than remaining active by default. Jobs run in clean, isolated environments, and resources scale with the workload.

This approach aligns well as machine learning systems move beyond interactive development into execution patterns that require flexibility, scalability, and predictable behavior.

::: info Pricing and availability

Modal operates as a managed cloud platform rather than an open-source tool. It offers a free tier with limited usage credits, and pricing scales based on compute time, storage, and GPU usage.

:::

---

## 6. Weights & Biases

<SiteInfo
  name="Weights & Biases: The AI Developer Platform"
  desc="Learn why thousands of companies rely on W&B as their system of record for training AI models and developing AI applications with confidence."
  url="https://wandb.ai/site/"
  logo="https://site.wandb.ai/wp-content/uploads/2024/07/cropped-favicon-3.png?w=192"
  preview="https://site.wandb.ai/wp-content/uploads/2023/05/logo.jpg"/>

![Weights & Biases logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1770026872898_Endorsed_tertiary_goldblack.png)

When teams decide to work iteratively on machine learning, the way experiments are handled needs more structure. Iteration means running the same training process multiple times, adjusting parameters, changing the data, and learning from how those changes affect the results. Progress depends on being able to compare runs and understand why one version performs differently from another.

[<VPIcon icon="fas fa-globe"/>Weights & Biases](https://wandb.ai/site/) supports this stage by providing a clear record for every experiment. Each run captures its configuration, metrics, and outputs in one place, making it easy to review what has already been tried. The information is shared across the team, which helps keep discussions grounded in actual results rather than memory or screenshots.

Teams usually reach for this tool when they start doing things like:

- Testing how parameter changes affect model performance
- Comparing results across datasets or training approaches
- Reviewing experiment history during model selection
- Sharing progress and findings during team discussions

Using Weights & Biases changes how learning accumulates within a project. Experiments provide a clear record of how decisions were made and which changes drove improvements. This record streamlines collaboration and helps teams explain their decisions with confidence. Weights & Biases provides a shared record of experiments that supports deliberate and repeatable iteration.

::: info Pricing and availability

Weights & Biases is a commercial platform that offers a free tier for individual users and academic work. Paid plans are available for teams and enterprises, and a self-hosted deployment option is offered for organizations with stricter infrastructure requirements.

:::

---

## 7. Pinecone

<SiteInfo
  name="The vector database to build knowledgeable AI | Pinecone"
  desc="Search through billions of items for similar matches to any object, in milliseconds. It’s the next generation of search, an API call away."
  url="https://pinecone.io"
  logo="https://pinecone.io/favicon.ico"
  preview="https://pinecone.io/images/ogimage-general.jpg"/>


![Pinecone logo](https://paper-attachments.dropboxusercontent.com/s_0B09DC0A12ED6A31739AC53B97AD0EF9B45C83D3DDACEA36946D2E549C502A90_1770325588032_pinecone-seeklogo.png)

Imagine you’re building a feature that retrieves information based on meaning rather than exact matches. During development, embeddings are created and kept close to the code to enable rapid experimentation. Early tests run as expected in a controlled setup.

Once the feature starts seeing real usage, the demands change. As the dataset grows, queries arrive more frequently, and retrieval must behave consistently across sessions and deployments.

[<VPIcon icon="fas fa-globe"/>Pinecone](https://pinecone.io/) comes into play when embeddings need a permanent home. It provides a managed database designed to store vectors and efficiently perform similarity searches. Embeddings can be written once and queried repeatedly without being recreated for each run or tied to a specific process. Retrieval remains predictable as data volume increases, keeping application behavior consistent.

Teams usually reach for Pinecone when they are working on capabilities such as:

- Semantic search across documents or records
- Retrieval for question answering workflows
- Selecting relevant context for language model prompts
- Similarity-based discovery within an application

Embeddings become part of the system’s data layer and remain available whenever the application needs them. Retrieval continues to perform reliably as data grows, supporting real usage patterns and production workloads built around semantic access. Pinecone fits naturally once machine learning work supports features that depend on consistent, scalable retrieval rather than short-lived experiments.

::: info Pricing and availability

Pinecone is a managed vector database service rather than an open-source tool. It offers a free starter tier with usage limits, and paid plans scale based on storage, performance requirements, and query volume.

:::

---

## Bringing It All Together

Python notebooks remain a strong starting point for machine learning work. They make exploration fast and flexible. What changes is what teams need once that work has to be shared, rerun, deployed, and trusted by others.

The tools in this article reflect those next responsibilities. Each addresses a concern that arises as machine learning moves toward real-world use, spanning interfaces and execution, packaging, tracking, and retrieval. Moving beyond notebooks is less about tools and more about treating machine learning as something teams operate and build on over time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Take Machine Learning Beyond Python Notebooks with These Helpful Tools",
  "desc": "Machine learning tasks usually start in a Python notebook, and for good reason. Notebooks make it easy to explore data, test ideas, and iterate quickly with minimal setup. They give teams a familiar place to experiment while questions remain open and...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-take-machine-learning-beyond-python-notebooks-with-these-helpful-tools.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
