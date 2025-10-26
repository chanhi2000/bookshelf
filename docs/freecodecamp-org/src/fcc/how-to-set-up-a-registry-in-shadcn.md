---
lang: en-US
title: "How to Set Up a Registry in shadcn"
description: "Article(s) > How to Set Up a Registry in shadcn"
icon: iconfont icon-shadcn
category:
  - Node.js
  - Shadcn
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - shadcn
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up a Registry in shadcn"
    - property: og:description
      content: "How to Set Up a Registry in shadcn"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-a-registry-in-shadcn.html
prev: /programming/js-shadcn/articles/README.md
date: 2025-10-27
isOriginal: false
author:
  - name: Abhijeet Dave
    url : https://freecodecamp.org/news/author/Abhidave/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761575215365/54597001-a10f-4a3d-a082-3eb5ac8b9a7d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up a Registry in shadcn"
  desc="In this guide, you’ll learn how to set up a registry in shadcn. If you’re not familiar with this tool, shadcn is a collection of reusable and accessible components you can use in your projects. You’ll learn about essential concepts such as setting up..."
  url="https://freecodecamp.org/news/how-to-set-up-a-registry-in-shadcn"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761575215365/54597001-a10f-4a3d-a082-3eb5ac8b9a7d.png"/>

In this guide, you’ll learn how to set up a registry in shadcn. If you’re not familiar with this tool, shadcn is a collection of reusable and accessible components you can use in your projects.

You’ll learn about essential concepts such as setting up and configuring the registry, adding authentication, CLI commands you can use, and more.

---

## What is a registry in shadcn?

A **registry** in shadcn is a central place for sharing and managing your reusable components, utilities, and UI elements (along with other resources) across different projects. It lets developers give numbers to and organize components in a standard way. This makes it easier to integrate and share resources within and across teams.

The registry system helps make these components easily reusable. It also helps teams keep their code clean and manage dependencies more effectively.

shadcn's main system uses the <VPIcon icon="iconfont icon-json"/>`registry.json` file. The file provides key information about the registry, such as resource names and places along with the files that go with them.

### Why use a shadcn registry?

Using registries is helpful because it helps you standardize rules for your components. Every component, UI element, or utility follows a clear plan, which makes it easier to integrate and manage them.

Also, version numbers let you manage different versions of a component. This makes sure various parts work together and lets you update them without trouble.

Registries also give you the ability to organize resources into groups while managing what depends on what. Everything is flexible this way.

And if you create a registry, it lets you share your components with other developers (either everyone or just certain people). This allows for both inside and open-source work.

---

## How to Create and Configure Your Registry

Creating a shadcn registry involves setting up a configuration file (<VPIcon icon="iconfont icon-json"/>`registry.json`) at the root of your project. This file contains the metadata and structure of your registry, helping define components and their relationships.

shadcn provides this [starter template (<VPIcon icon="iconfont icon-github"/>`shadcn-ui/registry-template`)](https://github.com/shadcn-ui/registry-template) to help you understand how registries work.

### Step by Step Guide to Create a Registry

#### 1. Define the Registry's Metadata

You’ll need to fill in the following information:

- `name`: A unique name for the registry.
- `homepage`: A URL pointing to the homepage for the registry.
- `items`: An array that contains all available components, UI elements, or utilities in the registry.

Here’s an example of a simple <VPIcon icon="iconfont icon-json"/>`registry.json`:

```json title="registry.json"
{
  "$schema": "<https://ui.shadcn.com/schema/registry.json>",
  "name": "acme",
  "homepage": "<https://acme.com>",
  "items": [
    // Components will go here
  ]
}
```

#### 2. Components Structure

Each item in the registry can be a component, theme, hook, or utility. These items have the following properties:

- `name`: Unique name of the component.
- `type`: Specifies the type of item (for example, `registry:component`, `registry:block`).
- `files`: An array of files that make up the component.

Here’s an example:

```json title="registry.json"
{
  "name": "name",
  "type": "registry:block",
  "title": "title",
  "description": "Simple description",
  "files": [
    {
      "path": "registry/new-york/...",
      "type": "registry:component"
    }
  ]
}
```

This component contains a simple button. You can keep adding more components to the `items` array.

#### 3. Adding Components

After creating the <VPIcon icon="iconfont icon-json"/>`registry.json` file, you can add components to the registry. These components can be UI elements, functions, or utilities.

::: tip Example 1: Adding a Simple Button Component

First, create the component file. You can define your component in a separate directory. For example, we will create a `HelloWorld` component.

```tsx title="registry/new-york/hello-world/hello-world.tsx"
import { Button } from "@/components/ui/button"

export function HelloWorld() {
  return <Button>Hello World</Button>
}
```

Reference the component in your <VPIcon icon="iconfont icon-json"/>`registry.json` like this:

```json title="registry.json"
{
  "name": "hello-world",
  "type": "registry:block",
  "title": "Hello World",
  "description": "A simple hello world component.",
  "files": [
    {
      "path": "registry/new-york/hello-world/hello-world.tsx",
      "type": "registry:component"
    }
  ]
}
```

The `"files"` key points to the path where the component is stored, while the `type` helps categorize the item.

:::

::: tip Example 2: Adding Multiple Components

You can add multiple components to the registry as well. For instance, a button and a form could be part of a UI package:

```json title="registry.json"
{
  "name": "ui-kit",
  "type": "registry:block",
  "title": "UI Kit",
  "description": "A collection of basic UI components.",
  "files": [
    {
      "path": "registry/ui-kit/button/button.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/ui-kit/form/form.tsx",
      "type": "registry:component"
    }
  ]
}
```

This modular approach allows for scalable development, enabling easy additions or updates to the registry without affecting other parts of the application.

::: note

You can learn more about [<VPIcon icon="iconfont icon-shadcn"/>registry basics](https://ui.shadcn.com/docs/registry/getting-started) in the shadcn UI docs.

<SiteInfo
  name="Getting Started"
  desc="Learn how to get setup and run your own component registry."
  url="https://ui.shadcn.com/docs/registry/getting-started/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Getting%20Started&description=Learn%20how%20to%20get%20setup%20and%20run%20your%20own%20component%20registry."/>

:::

---

## Namespace System

Namespaces in shadcn help arrange components, utilities, themes, or other resources. The goal is to avoid conflicts and provide a good structure for your resources.

### What is a Namespace?

A namespace groups resources under a plain identifier, usually prefixed with an '@'. With this, you can separate different types of resources, teams, or even public versus private components.

::: info For instance:

- `@shadcn/button` could represent a button component from shadcn's registry.
- `@acme/auth-utils` could represent authentication utilities developed by the Acme company.

:::

### How to Configure Multiple Registries Using Namespaces

You can configure multiple registries under different namespaces, which helps organize resources by type or team:

```json title="registry.json"
{
  "registries": {
    "@acme-ui": "<https://registry.acme.com/ui/{name}.json>",
    "@acme-docs": "<https://registry.acme.com/docs/{name}.json>",
    "@acme-ai": "<https://registry.acme.com/ai/{name}.json>",
    "@acme-internal": {
      "url": "<https://internal.acme.com/registry/{name}.json>",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    }
  }
}
```

This setup allows you to:

- Keep UI components, documentation, AI resources, and internal libraries separate.
- Easily manage public and private resources within the same registry configuration.

::: info

You can learn more about [<VPIcon icon="iconfont icon-shadcn"/>Namespace](https://ui.shadcn.com/docs/registry/namespace#authentication--security) in the shadcn UI docs.

<SiteInfo
  name="Namespaces"
  desc="Configure and use multiple resource registries with namespace support."
  url="https://ui.shadcn.com/docs/registry/namespace/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Namespaces&description=Configure%20and%20use%20multiple%20resource%20registries%20with%20namespace%20support."/>

:::

---

## Authentication for Private Registries

If you have private registries, shadcn offers several authentication methods to ensure that only authorized users can access them. These include Bearer Token (OAuth 2.0), API Key, Basic Authentication, and Query Parameter Authentication. Let’s look at each one in more detail.

### Bearer Token (OAuth 2.0)

Bearer tokens are ideal for integrating with external APIs like GitHub or internal services that support OAuth 2.0. You include the token in the `Authorization` header of the request. You typically get this token through an OAuth 2.0 flow, and it grants access to protected resources.

::: tip Here’s an example:

```json title="registry.json"
{
  "@github": {
    "url": "<https://api.github.com/repos/org/registry/contents/{name}.json>",
    "headers": {
      "Authorization": "Bearer ${GITHUB_TOKEN}"
    }
  }
}
```

:::

### API Key

You commonly use API keys for private NPM registries or internal APIs where a simple key is sufficient for access control.

An API key is included in the request headers, often under `X-API-Key`. This key is issued by the service and you should keep it confidential.

::: tip Here’s an example:

```json title="registry.json"
{
  "@private": {
    "url": "<https://api.company.com/registry/{name}>",
    "headers": {
      "X-API-Key": "${API_KEY}"
    }
  }
}
```

:::

### Basic Authentication

You’ll typically use basic authentication in legacy systems that require basic HTTP authentication.

The `Authorization` header contains a base64-encoded string of the format `username:password`. While it’s pretty easy to implement, it’s less secure than more modern methods like OAuth 2.0. **Here’s an example**:

```json title="registry.json"
{
  "@internal": {
    "url": "<https://registry.company.com/{name}.json>",
    "headers": {
      "Authorization": "Basic ${BASE64_CREDENTIALS}"
    }
  }
}
```

### Query Parameter Authentication

Query parameter auth is a simpler form of authentication using query parameters for APIs.

It works by passing authentication details as query parameters in the URL. While this is convenient, it’s less secure than other methods since query parameters can be exposed in logs or URLs.

::: tip Here’s an example:

```json title="registry.json"
{
  "@secure": {
    "url": "<https://registry.example.com/{name}.json>",
    "params": {
      "api_key": "${API_KEY}",
      "client_id": "${CLIENT_ID}",
      "signature": "${REQUEST_SIGNATURE}"
    }
  }
}
```

:::

### Multiple Authentication Methods

Some registries require multiple authentication methods simultaneously – for example, a combination of a Bearer token and an API key.

The request includes multiple headers and possibly query parameters to satisfy all required authentication mechanisms. This is common in enterprise environments where different layers of security are enforced.

::: tip Here’s an example:

```json title="registry.json"
{
  "@enterprise": {
    "url": "https://api.enterprise.com/v2/registry/{name}",
    "headers": {
      "Authorization": "Bearer ${ACCESS_TOKEN}",
      "X-API-Key": "${API_KEY}",
      "X-Workspace-Id": "${WORKSPACE_ID}"
    },
    "params": {
      "version": "latest"
    }
  }
}
```

:::

::: note

You can learn more about [<VPIcon icon="iconfont icon-shadcn"/>Authentication and Security](https://ui.shadcn.com/docs/registry/namespace#authentication--security) in the shadcn UI docs.

<SiteInfo
  name="Namespaces"
  desc="Configure and use multiple resource registries with namespace support."
  url="https://ui.shadcn.com/docs/registry/namespace/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Namespaces&description=Configure%20and%20use%20multiple%20resource%20registries%20with%20namespace%20support."/>

:::

---

## CLI Commands

The shadcn CLI lets you interact with the registry directly from the command line. With commands like `add`, `view`, `search`, and `list`, you can easily install and manage resources. Let’s look at some examples to see how this works.

### Install Resources from the Registry

Use the following commands to add resources to your project:

```sh
# Install a specific component
npx shadcn@latest add @acme/button

# Install multiple components at once
npx shadcn@latest add @acme/button @lib/utils @ai/prompt
```

These commands fetch the specified components from the registry and integrate them into your project, ensuring all necessary dependencies are also installed.

### Viewing Metadata

Before integrating a component, it's crucial to understand its structure and dependencies. The `view` command allows you to inspect a component's metadata:

```sh
# View a specific component
npx shadcn@latest view @acme/button

# View multiple components
npx shadcn@latest view @acme/button @lib/utils @ai/prompt

# View from a URL directly
npx shadcn@latest view https://registry.example.com/button.json

# View from a local file
npx shadcn@latest view ./local-registry/button.json
```

So what does the `view` command display?

- Resource metadata: Information such as the component's name, type, and description.
- Dependencies: Lists both direct and registry dependencies required by the component.
- File contents: Displays the actual code that will be installed.
- CSS variables and Tailwind configuration: Shows any styling configurations associated with the component.
- Required environment variables: Lists any environment variables needed for the component to function correctly.

This command is invaluable for reviewing a component's details before installation, ensuring compatibility and understanding its requirements.

### Searching Resources

To discover components within a registry, you can use these commands:

```sh
# Search a specific registry
npx shadcn@latest search @v0

# Search with a query
npx shadcn@latest search @acme --query "auth"

# Search multiple registries
npx shadcn@latest search @v0 @acme @lib

# Limit results
npx shadcn@latest search @v0 --limit 10 --offset 20

# List all items (alias for search)
npx shadcn@latest list @acme
```

They help you find components based on criteria like registry, query terms, and result limits.

Learn more about [<VPIcon icon="iconfont icon-shadcn"/>CLI Commands](https://ui.shadcn.com/docs/registry/namespace#cli-commands) in the shadcn UI docs.

---

## Dependency Resolution

The CLI automatically resolves and installs all dependencies from their respective registries.

Understanding how dependencies are resolved internally is important if you're developing registries or need to customize third-party resources.

In shadcn, components often rely on other resources from various registries. When you install a component, shadcn ensures that all its dependencies are also installed, even if they reside in different registries. This process is known as **dependency resolution**.

### What Does It Mean to "Resolve Dependencies"?

So to be clear resolving dependencies involves identifying, fetching, and installing dependencies.

First, shadcn determines which components a resource requires to function correctly. Then it retrieves these dependent components from their respective registries. Finally, it ensures that all dependencies are installed before the main component, maintaining the correct order.

This process guarantees that when you install a component, all its prerequisites are also installed, ensuring smooth functionality.

### Understanding Topological Sorting in Dependency Resolution

**Topological sorting** might sound complicated, but it's essentially a method of organizing tasks (or components) in a way that makes sure everything gets done in the right order.

Imagine you have a list of tasks, and some tasks depend on others to be completed first. For example, you can't make a cake without first measuring out and then mixing the ingredients. So, the tasks “measure ingredients” and "mix ingredients" need to be completed before "bake the cake."

In the context of shadcn, topological sorting works in a similar way to organizing the installation of components:

- Each component (like `dashboard`) can depend on other components (like `@shadcn/card` or `@acme/data-table`).
- Topological sorting arranges the components so that each one is installed only after the components it depends on have been installed.

#### Why Is Topological Sorting Important?

Topological sorting takes care of a couple key things. First, it makes sure that components are installed in the correct order. For example, if Component A depends on Component B, then Component B will be installed first, followed by Component A.

It also prevents circular dependencies. If two components depend on each other, topological sorting detects this and prevents a never-ending loop (also called a circular dependency).

#### Example of Dependency Resolution:

Consider the following component with its dependencies:

```json title="registry.json"
{
  "name": "dashboard",
  "registryDependencies": [
    "@shadcn/card",
    "@v0/chart",
    "@acme/data-table"
  ]
}
```

In this example, we have a **component**: `dashboard` and its **dependencies**: `@shadcn/card`, `@v0/chart`, and `@acme/data-table`.

In this case, shadcn will first identify the dependencies by recognizing that `dashboard` depends on `@shadcn/card`, `@v0/chart`, and `@acme/data-table`. Then it will fetch these components from their respective registries. Finally, it’ll install `@shadcn/card`, `@v0/chart`, and `@acme/data-table` first, before installing `dashboard`, ensuring all prerequisites are met.

You can learn more about [<VPIcon icon="iconfont icon-shadcn"/>Dependency Resolution](https://ui.shadcn.com/docs/registry/namespace#authentication--security) in the shadcn UI docs.

<SiteInfo
  name="Getting Started"
  desc="Learn how to get setup and run your own component registry."
  url="https://ui.shadcn.com/docs/registry/getting-started/"
  logo="/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Getting%20Started&description=Learn%20how%20to%20get%20setup%20and%20run%20your%20own%20component%20registry."/>

---

## Error Handling

shadcn’s CLI is equipped to handle several types of errors. Here are some common scenarios and how to resolve them:

### Common Errors

#### 1. Unknown Registry

This error occurs when the registry isn’t defined in the configuration.

::: tip Here’s an example:

```plaintext
Error: Unknown registry "@non-existent"
```

**Solution:** To fix this, just add the registry in the `registries` section of your configuration.

:::

#### 2. Missing Environment Variables

If your registry requires certain environment variables that are not set, you'll get an error.

::: tip Here’s an example:

```plaintext title="output"
Registry "@private" requires REGISTRY_TOKEN
```

**Solution:** To fix this, just add the required environment variables to <VPIcon icon="fas fa-file-lines"/>`.env` or <VPIcon icon="fas fa-file-lines"/>`.env.local`.

:::

#### 3. 404 Not Found

The resource may not exist or the URL could be incorrect.

::: tip Here’s an example:

```plaintext title="output"
Error: The resource was not found at <https://api.company.com/button.json>
```

:::

#### 4. Authentication Failures (401/403)

If you’re not authorized to access a resource, you’ll see 401 or 403 errors.

To fix this, make sure your tokens, API keys, or credentials are valid.

You can learn more about [<VPIcon icon="iconfont icon-shadcn"/>Error Handling](https://ui.shadcn.com/docs/registry/namespace#authentication--security) in the shadcn UI docs.

---

## Conclusion

The shadcn registry system provides a good, modular solution for managing and sharing components or utilities across projects. If you’re looking to explore practical implementations, platforms like [<VPIcon icon="iconfont icon-shadcn"/>shadcn/studio](https://shadcnstudio.com/) which showcase how you can leverage [<VPIcon icon="iconfont icon-shadcn"/>shadcn components](https://shadcnstudio.com/components) to build sleek, modern UI solutions with minimal setup.

With its structured approach to dependencies, flexible namespaces, good authentication, and CLI commands, registries enable teams to share secure resources and customize them along the way.

I have prepared this article with the help of [Pruthvi Prajapati(<VPIcon icon="iconfont icon-github"/>`PruthviPraj00`)](https://github.com/PruthviPraj00), a front-end developer with 3 years of experience.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up a Registry in shadcn",
  "desc": "In this guide, you’ll learn how to set up a registry in shadcn. If you’re not familiar with this tool, shadcn is a collection of reusable and accessible components you can use in your projects. You’ll learn about essential concepts such as setting up...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-a-registry-in-shadcn.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
