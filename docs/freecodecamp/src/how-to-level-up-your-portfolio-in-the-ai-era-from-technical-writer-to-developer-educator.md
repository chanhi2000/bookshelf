---
lang: en-US
title: "How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator"
description: "Article(s) > How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator"
icon: 
category:
  - 
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator"
    - property: og:description
      content: "How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-level-up-your-portfolio-in-the-ai-era-from-technical-writer-to-developer-educator.html
prev: /articles/README.md
date: 2026-09-27
isOriginal: false
author:
  - name: Casmir Onyekani
    url: https://freecodecamp.org/news/author/Casmir/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d611049d-c9ed-4083-b3bc-f203ba7b42ff.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator"
  desc="Until recently, building a technical writing portfolio could be as simple as creating a website, adding a list of articles, describing your writing experience, and linking to your social profiles. Tha"
  url="https://freecodecamp.org/news/how-to-level-up-your-portfolio-in-the-ai-era-from-technical-writer-to-developer-educator"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d611049d-c9ed-4083-b3bc-f203ba7b42ff.png"/>

Until recently, building a technical writing portfolio could be as simple as creating a website, adding a list of articles, describing your writing experience, and linking to your social profiles.

That's no longer enough.

Developers can ask an AI assistant to generate an explanation of an API, summarize documentation, produce a tutorial outline, or even write a first version of a coding article in seconds.

That changes what a technical writer brings to the table.

The valuable skill is no longer simply producing technically correct sentences. It's understanding the technology well enough to know what should be written, testing whether the instructions actually work, identifying where developers will get stuck, and turning that knowledge into documentation someone can implement.

That's the thinking behind [<VPIcon icon="fas fa-globe"/>my portfolio website](https://casmironyekani.netlify.app/).

I built it as more than an online résumé. I wanted it to demonstrate how I approach developer education.

This article explains how I built the portfolio, the technologies behind it, how I organized the application, how I deployed it, and what the project taught me about becoming a technical writer for developers during this AI era.

---

## What Changed About Technical Writing?

Let's start with the bigger question: **why does a technical writer need to understand software development**?

Because the audience has changed.

A developer reading an API guide doesn't only need someone who can explain what an endpoint does. They need someone who understands how the endpoint fits into an application.

Consider a simple API instruction: `POST /api/users`

A beginner writer might explain:

> This endpoint creates a new user.

That sentence may be technically correct. But a developer may immediately have several other questions:

- What authentication does the endpoint require?
- What headers are required?
- What does the request body look like?
- Which fields are required?
- What happens when validation fails?
- What does a successful response look like?
- What status code is returned?
- What happens if the email already exists?
- Is the endpoint idempotent?
- How should the response be handled in JavaScript or Python?

Good developer documentation answers those questions.

That requires more than writing ability. It requires technical investigation.

This is why I think the role is moving from **technical writer** toward **developer educator**.

A developer educator doesn't simply explain technology. They help another developer successfully use it.

---

## Why AI Hasn’t Made Technical Writers Obsolete

AI has changed how I approach writing, but I don't think the lesson is that technical writers should avoid AI.

The lesson is that we should use it differently.

AI is excellent at helping with repetitive work:

- generating an initial outline
- suggesting alternative explanations
- simplifying complicated sentences
- finding possible edge cases
- converting notes into a first draft
- generating test cases
- explaining unfamiliar syntax
- reviewing structure
- brainstorming examples
- comparing approaches

But there's an important distinction: **AI can accelerate my thinking without replacing my responsibility for correctness.**

If an AI assistant generates a Node.js example, I should run it.

If it explains an API, I should compare the explanation with the API implementation or official documentation.

If it suggests a command, I should execute the command.

If it generates a tutorial, I should follow the tutorial from the beginning as if I were the reader.

That workflow changes the role of AI from "**Write this article for me**" to "Help me investigate, test, challenge, and improve this article."

That's a much more useful relationship.

---

## You Should Be Able to Build What You Teach

This is probably the biggest lesson I would give someone who wants to become a developer-focused technical writer.

You don't necessarily need to become a senior software engineer before writing documentation. But you should be able to work with and explain code.

You should understand the development workflow well enough to investigate a repository, install dependencies, run an application, read errors, modify code, test examples, and explain what happened.

For example, if you're writing a React tutorial, you should be comfortable enough with React to know when an example is incomplete.

If you're documenting a REST API, you should understand HTTP methods, headers, authentication, status codes, JSON payloads, and error handling.

If you're writing about GitHub Actions, you should understand workflows, jobs, triggers, runners, secrets, and deployment steps.

If you're documenting a Python package, you should be able to install it and execute the example.

The goal isn't to know everything. The goal is to be technically independent enough to verify what you write.

That's the standard I used when building my own portfolio or any technical documentation.

---

## My Portfolio Is Itself a Software Project

[<VPIcon icon="fas fa-globe"/>The homepage](https://casmironyekani.netlify.app/) immediately communicates what I do:

> Documentation developers can actually implement.

That sentence is deliberate.

I don't want a potential client to spend two minutes trying to figure out whether I write marketing content, blog posts, or developer documentation.

The site establishes the positioning immediately:

**Software Engineer × Technical Writer**

It then shows four capability areas:

1. API and SDK documentation
2. Quantum and deep-tech documentation
3. Code-heavy technical tutorials
4. Cloud, DevOps, and docs-as-code

The portfolio also demonstrates my working process:

1. Read the repository.
2. Build the examples.
3. Test the code.
4. Ship the documentation.

That process is more important than simply saying, "I am a technical writer."

A portfolio should provide evidence of how you work.

---

## What Should a Technical Writer's Portfolio Contain?

If you're starting today, don't begin by asking: *What should my portfolio website look like*?

Start with: *What evidence does a potential client need before trusting me with their documentation*?

**I'd build the portfolio around six things.**

### 1. A Clear Technical Identity

Don't make visitors guess what you do.

Instead of: **Writer | Blogger | Content Creator**

you could say: **Technical Writer | API Documentation Creator | Developer Educator**

Or, if you also code: **Software Engineer × Technical Writer**

Your positioning should immediately tell the visitor who you help and what kind of technical problems you solve.

### 2. Working Examples

A list of articles is useful, but working examples are better.

If you say you write API documentation, show an API example. If you say you write SDK documentation, show an SDK guide. If you write tutorials, provide tutorials containing reproducible code. If you write DevOps documentation, show a deployment guide.

Your portfolio should answer:

> Can this person actually explain the technology they claim to understand?

### 3. Evidence of Technical Depth

My portfolio includes work around:

- JavaScript
- Python
- TypeScript
- React
- Node.js
- APIs
- Azure
- CI/CD
- Qiskit
- IBM Quantum
- Git
- Markdown
- Docs-as-code

You don't need to list 30 technologies. In fact, listing everything can make your positioning weaker. Choose the technologies you can actually demonstrate.

### 4. Published Work

Published articles provide evidence that you can communicate technical concepts to real readers.

My portfolio connects my work to open source publications and my technical blog.

But don't simply write: **I have published 20 articles**. Show the articles. Give the reader a way to inspect your work.

### 5. Projects

Projects help bridge the gap between writing and engineering.

A good project entry should answer four questions:

- **What was the problem?**
- **What did you build or document?**
- **What technologies were involved?**
- **What did the project demonstrate?**

A project shouldn't be just React portfolio website. That tells the reader almost nothing.

Instead:

> Built a developer-focused technical writing portfolio with React, TypeScript, TanStack Start, Tailwind CSS, and a Netlify deployment workflow.

Now the project communicates technical ability.

### 6. A Clear Next Action

Your portfolio shouldn't leave the visitor wondering what to do next.

End it with a specific offer like: *Send me a link to your API repo or SDK docs, and I'll flag one specific documentation gap.*

That's much stronger than simply saying: *Contact me for technical writing work.*

The first statement gives the potential client something concrete to do.

---

## The Technology Behind My Portfolio

I built the current portfolio using a modern React-based stack.

The major pieces include:

- React
- TypeScript
- TanStack Start
- TanStack Router
- Vite
- Tailwind CSS
- shadcn/ui components
- Lucide React
- npm
- Git and GitHub
- Netlify

The important thing isn't that you use the same stack. You could build a technical writing portfolio with plain HTML and CSS.

The reason I chose a modern application stack was partly practical and partly intentional.

I'm presenting myself as someone who works with developers. The portfolio itself should demonstrate that I can work inside a modern development workflow.

### Why I Used React

React gives me a component-based way to build the interface.

Instead of putting the entire website into one enormous HTML file, I can break the interface into reusable pieces.

For example, a navigation component can be reused across multiple pages. A button can be reused throughout the application. Or a project card can be represented as a reusable component rather than duplicated markup.

This is also useful from a documentation perspective. When you understand component-based development, you begin to think about documentation in terms of reusable concepts, dependencies, inputs, outputs, and behavior.

Those are exactly the things developers care about.

### Why TypeScript?

TypeScript adds static typing to JavaScript.

For a portfolio project, you could argue that TypeScript is unnecessary.

That's fair.

But using TypeScript reflects the kind of development environment I expect to encounter when documenting modern applications.

It also forces me to think about the shape of data moving through components and functions.

For example:

```ts
type Project = {
  title: string;
  description: string;
  technologies: string[];
  url: string;
};
```

Now I have an explicit contract for what a project contains.

That mindset translates directly into technical documentation.

When documenting an API, you're essentially documenting contracts:

- inputs
- outputs
- types
- required fields
- optional fields
- errors
- expected behavior

### Why TanStack Start?

The portfolio uses TanStack Start for the application structure and routing.

The important lesson for a beginner isn't that you must learn TanStack Start. You don't have to.

The lesson is that a technical writer should become comfortable navigating frameworks.

When I encounter an unfamiliar framework in a client's repository, I need to be able to answer questions such as:

- Where are the routes?
- Where are components?
- Where is application configuration?
- Where are shared utilities?
- Where are assets?
- How does data move through the application?
- How does the application build?
- How does it deploy?

Those questions matter more than memorizing a particular framework.

### Vite Handles the Development and Build Workflow

Vite is responsible for the development experience and production build.

During development, I can run the application locally and get fast feedback while editing.

The production build creates the assets that can be deployed.

For this project, that means the workflow is essentially `npm install` and `npm run dev` during development, followed by `npm run build` when preparing the application for production.

Vite's current documentation describes the development server and production build as two core parts of its workflow.

The important technical writing lesson is: **Know the difference between development and production.**

A tutorial that works on `localhost` isn't automatically a deployment tutorial.

A developer needs to know what changes when the application moves from their computer to a production environment.

### Tailwind CSS Handles the Styling

I used Tailwind CSS to build the visual system.

Instead of writing a large custom stylesheet for every component, I can compose utility classes directly in the markup.

For example:

```ts
<h1 className="text-4xl font-semibold leading-tight md:text-6xl">
  Documentation developers can actually implement.
</h1>
```

This also made it easier to iterate quickly on spacing, typography, responsive layouts, and component styling.

Again, the lesson for technical writers isn't: *Learn Tailwind because every technical writer needs Tailwind*.

The lesson is: *Learn enough frontend development to understand how the systems you document are actually assembled*.

### Lucide React Provides the Icons

I use Lucide React for interface icons.

For example:

```ts
import { ArrowRight } from "lucide-react";
```

A component can then render the icon where needed.

Small dependencies like this are worth understanding because they appear constantly in modern frontend repositories.

When documenting an existing codebase, you need to recognize whether an import is part of the application, a third-party dependency, a framework feature, or a local utility.

That distinction becomes important when you're explaining installation and configuration.

---

## Understanding <VPIcon icon="iconfont icon-json"/>`package.json`

One of the first files I inspect in a JavaScript project is <VPIcon icon="iconfont icon-json"/>`package.json`

This file tells me a lot about the project.

It can contain:

- project metadata
- scripts
- dependencies
- development dependencies
- package configuration

For a technical writer, this is one of the most useful files in a JavaScript repository.

If a tutorial tells readers to install five packages manually, but those packages are already defined in <VPIcon icon="iconfont icon-json"/>`package.json`, the tutorial is creating unnecessary work.

Instead, the reader may only need: `npm install`.

Understanding the package file helps you avoid writing instructions that don't match the actual project.

---

## Understanding the Route Files

The portfolio uses route files to represent different pages.

The application includes routes such as:

```plaintext
 /about
 /services
 /projects
 /writing
 /contact
```

Each route is responsible for rendering the appropriate page.

For example, the contact route contains the page metadata as well as the page component.

A simplified version looks like this:

```ts
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Casmir Onyekani",
      },
    ],
  }),
  component: ContactPage,
});
```

The important thing here isn't memorizing `createFileRoute`. It's understanding what the code is doing.

The route defines:

1. the URL
2. the page metadata
3. the component rendered for that route

That makes the source code itself a useful piece of documentation.

---

## Components Separate Reusable Interface Pieces

The project also uses reusable components.

Instead of creating every button, card, navigation element, or UI element from scratch, reusable components can encapsulate common behavior and styling.

This is one of the first things I look for when documenting a codebase.

If a developer asks *How do I create a button*? I don't want to tell them to copy 40 lines of markup if the project already has a reusable `Button` component. I want to point them toward the abstraction the project already uses.

Good documentation follows the architecture of the software. It doesn't fight it.

---

## Assets Are Part of the Documentation Story Too

The portfolio contains assets such as my profile image and other visual resources.

These typically live in locations such as:

```plaintext
public/
src/assets/
```

Understanding the difference matters.

Some assets are imported into application code. Others can be served directly as static files.

When writing documentation, this distinction can prevent confusing instructions such as telling a developer to import an image that the application expects to serve from a public directory.

Again, documentation quality often depends on understanding seemingly small implementation details.

---

## Configuration Files Matter

A beginner technical writer might focus entirely on:

```plaintext
src/
```

But important information often lives outside the source directory.

Files such as these can influence the entire project:

```plaintext
package.json
vite.config.ts
tsconfig.json
.gitignore
```

Depending on the project, you may also find files for:

```plaintext
eslint
prettier
Tailwind
Netlify
environment variables
GitHub Actions
```

These files can explain how the project is built, checked, formatted, and deployed.

If you ignore them, you may miss important parts of the developer workflow.

---

## How I Use AI While Building and Documenting

AI was useful during the development of this portfolio.

But I didn't treat it as the developer. I treated it as a development assistant. There's a major difference.

Suppose I encounter an error. Instead of asking **fix my entire project**, I can ask: **Explain this error and identify the file responsible**.

Then I inspect the file. I might ask: **What are three possible causes of this error**? Then I test those possibilities.

I might ask: **Review this component for accessibility problems**. Then I verify the suggestions myself.

This creates a feedback loop:

```plaintext
        AI suggestion
             ↓
        My investigation
             ↓
        Code change
             ↓
        Run the application
             ↓
        Test the result
             ↓
        Document what actually worked
```

That is how I think technical writers should use AI.

**Use AI to increase your speed, not to outsource your technical judgment.**

---

## The Most Important AI Skill for Technical Writers

Prompt writing is useful. But I'd put something else above it: "**Verification".**

A beautiful prompt doesn't guarantee a correct answer.

If an AI assistant gives you this command: `npm install some-package`, you need to know whether that package exists.

If it gives you an API example, you need to test the request.

If it gives you a React example, you need to run the application.

If it claims a framework supports a particular feature, you need to verify the claim against the framework's current documentation or source code.

This is especially important because software changes. A tutorial that was correct two years ago may contain obsolete commands today.

Technical writers therefore need a habit of checking **source → implementation → test → explanation** rather than **prompt → answer → publish**.

---

## My Development Workflow

When working on a technical project, I think in this sequence:

```plaintext
        Understand
            ↓
          Build
            ↓
          Test
            ↓
        Document
            ↓
         Review
            ↓
        Publish
```

The same workflow applies to technical writing.

Suppose a client gives me an API repository. I don't immediately open a blank document and start writing.

First, I will:

- Inspect the repository
- Identify how the application works
- Install the dependencies
- Run the project
- Find the relevant API functionality
- Make requests
- Record what actually happens

Only after that do I start writing the guide.

This is slower than asking AI to generate a 2,000-word article. But it produces documentation that has a much better chance of being useful.

---

## Deploying the Portfolio to Netlify

Once I had my application was working locally, I needed to put it on the web.

I used [Netlify](https://app.netlify.com). The deployment workflow is straightforward for a Git-based project.

The basic flow is:

```plaintext
        Local project
             ↓
            Git
             ↓
        GitHub repository
             ↓
           Netlify
             ↓
        Production site
```

Netlify can connect to a Git repository and automatically build and deploy the project when changes are pushed.

For a Vite project, the typical production settings are:

- Build command: `npm run build`
- Publish directory: `dist/client`

That means Netlify runs the build command and publishes the resulting production files.

This is an important concept for technical writers. Deployment documentation shouldn't simply say: *Deploy your application to Netlify*. It should explain the relationship between the repository, build command, output directory, and hosting platform.

---

## Why Git Matters to Technical Writers

Git isn't only a developer tool. It's also a documentation tool.

If documentation lives alongside source code, Git gives you:

- version history
- branches
- pull requests
- reviews
- change tracking
- collaboration

Imagine a developer changes an API endpoint.

If the documentation lives in the same repository, that change can trigger a documentation update in the same workflow. This is the foundation of docs-as-code.

You don't need to become a Git expert on day one. But you should be comfortable with the basics:

```plaintext
git clone
git checkout
git pull
git add
git commit
git push
```

You should also understand pull requests and how changes move from a local branch into a shared repository.

---

## What Beginners Should Learn to Become Developer Technical Writers

If you're starting technical writing today, I would divide your learning into five areas.

### 1. Programming Fundamentals

Start with one programming language.

JavaScript or Python are practical choices because they appear across many developer ecosystems.

Learn:

- variables
- functions
- objects
- arrays
- conditions
- loops
- modules
- error handling
- asynchronous programming
- package management

You don't need to know every language. You need enough programming knowledge to understand what developers are doing.

### 2. Web and API Fundamentals

If you want to write developer documentation, learn how the web works.

Understand:

- HTTP
- URLs
- HTTP methods
- status codes
- headers
- JSON
- authentication
- REST APIs
- request and response bodies
- cookies
- tokens

Then build something. For example, create a small API and write documentation for it.

That single exercise can teach you more about API documentation than reading dozens of articles about technical writing.

### 3. Developer Tools

Become comfortable with:

- VS Code
- Git
- GitHub
- terminals
- package managers
- browser developer tools
- Markdown
- environment variables
- JSON
- basic debugging

These tools are part of the environment in which developer documentation is produced and consumed.

### 4. Documentation Skills

Learn how to write:

- README files
- getting-started guides
- tutorials
- API references
- SDK guides
- troubleshooting guides
- conceptual documentation
- migration guides
- configuration guides

And understand that these formats have different jobs.

An API reference is not a tutorial. A tutorial isn't a conceptual guide. And a README isn't a complete developer portal.

Good technical writers know the difference.

### 5. AI-Assisted Workflows

Finally, learn how to use AI effectively.

Use it for:

- research assistance
- brainstorming
- code review
- test-case generation
- editing
- summarization
- restructuring
- identifying gaps
- comparing explanations

But maintain ownership of:

- technical decisions
- source verification
- code testing
- factual accuracy
- examples
- final explanations

The goal isn't to compete with AI at generating words. The goal is to become the person who knows which words need to exist and whether they're true.

---

## Your Portfolio Should Prove These Skills

This is why I don't think a technical writer's portfolio should be treated as an online résumé.

Your portfolio is a demonstration environment.

- If you claim to understand APIs, demonstrate API documentation.
- If you claim to understand software development, show software projects.
- If you claim to write tutorials, publish tutorials with reproducible examples.
- If you claim to understand Git and docs-as-code, show documentation stored and maintained through a development workflow.
- If you claim to use AI effectively, demonstrate a workflow where AI accelerates your work without replacing your verification.

The portfolio itself becomes evidence.

---

## What I Would Build if I Were Starting Today

If you're a beginner, you don't need to build a complicated portfolio like mine.

Start smaller.

Build a simple website with:

```plaintext
Home 
About
Projects 
Writing 
Contact
```

Then add three strong projects.

### Project 1: API Documentation

Build a small REST API.

Document:

- authentication
- endpoints
- parameters
- request bodies
- responses
- errors
- examples

### Project 2: Developer Tutorial

Build something with React or Python. Then write a tutorial that takes another developer from an empty project to a working result.

### Project 3: Deployment Guide

Deploy the project and document the deployment process.

Include the commands, configuration, environment variables, build process, and troubleshooting steps.

Now your portfolio isn't saying: **I can write technical documentation**. It's demonstrating it.

---

## The Real Portfolio Test

Here's a simple test you can apply to your own portfolio.

Give the URL to someone who doesn't know you.

Ask them five questions:

- What does this person do?
- Who do they help?
- What technologies do they understand?
- Where can I see evidence of their work?
- What should I do if I want to hire them?

If they can't answer those questions quickly, your portfolio probably needs work.

You don't need more animations, and you don't necessarily need more pages. You need clearer evidence.

---

## What My Portfolio Taught Me

Building my portfolio reinforced something I've experienced through software development and technical writing:

**Technical writing is becoming increasingly implementation-driven.**

AI can generate an explanation, but developers need an explanation that survives contact with the code.

That's a different standard.

A good developer technical writer should be able to open a repository and become curious.

- What does this function do?
- Why is this dependency here?
- Where does this data come from?
- What happens when the request fails?
- Why does this configuration exist?
- What does the developer need to install?
- What will happen if they use a different version?
- What part of this workflow is undocumented?

Those questions are the real work. Writing is how we communicate the answers.

---

## You Don't Have to Be the Best Developer in the Room

There's another misconception worth addressing.

Becoming a developer-focused technical writer doesn't mean you have to compete with software engineers as a software engineer.

Your job is different.

You need enough technical depth to understand the system, investigate it, test it, and communicate it clearly. You also need the ability to think like the person learning the system.

That combination is valuable.

You're constantly moving between two perspectives:

```plaintext
How does the software work? 
            ↕ 
How does the developer need to learn it?
```

That's the heart of developer education.

---

## Final Thoughts

I built my portfolio because I wanted potential clients and employers to see more than a résumé.

I wanted them to see how I think.

The website is a software project. The projects demonstrate engineering. The articles demonstrate technical communication. The code demonstrates implementation. The deployment demonstrates the development workflow.

And the documentation demonstrates whether I can turn technical complexity into something another developer can use.

That's how I think a technical writer's portfolio should work today.

Don't build a website that only says you're a technical writer. Build something that makes the claim harder to doubt.

- Learn to code.
- Build projects.
- Break things.
- Read repositories.
- Test examples.
- Write documentation.
- Use AI to move faster.

Then verify everything that matters.

Because the future of developer technical writing isn't about who can generate the most words. It's about who can help another developer get from "I don't understand this" to "I can implement this."

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Level Up Your Portfolio in the AI Era: From Technical Writer to Developer Educator",
  "desc": "Until recently, building a technical writing portfolio could be as simple as creating a website, adding a list of articles, describing your writing experience, and linking to your social profiles. Tha",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-level-up-your-portfolio-in-the-ai-era-from-technical-writer-to-developer-educator.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
