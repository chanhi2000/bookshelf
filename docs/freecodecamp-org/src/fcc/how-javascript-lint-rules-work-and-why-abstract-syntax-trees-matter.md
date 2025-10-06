---
lang: en-US
title: "How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)"
description: "Article(s) > How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)"
    - property: og:description
      content: "How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-javascript-lint-rules-work-and-why-abstract-syntax-trees-matter.html
prev: /programming/js/articles/README.md
date: 2025-05-22
isOriginal: false
author:
  - name: Tilda Udufo
    url : https://freecodecamp.org/news/author/tildaudufo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747835156597/f30994d4-f4da-4100-af25-9f858c015aa8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)"
  desc="Before I started to contribute to eslint-plugin-react, I didn’t think too deeply about the linters I used every day while writing code. Like many developers, I installed them at the start of a project, appreciated the red underlines or auto-fixes, an..."
  url="https://freecodecamp.org/news/how-javascript-lint-rules-work-and-why-abstract-syntax-trees-matter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747835156597/f30994d4-f4da-4100-af25-9f858c015aa8.png"/>

Before I started to contribute to [<VPIcon icon="iconfont icon-github"/>`jsx-eslint/eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react/), I didn’t think too deeply about the linters I used every day while writing code. Like many developers, I installed them at the start of a project, appreciated the red underlines or auto-fixes, and moved on.

But behind those helpful messages is a powerful system of rules and structure that most of us rarely explore.

Linters are everywhere - across languages, frameworks, and workflows. They help catch errors, enforce consistent formatting, and promote best practices. They’re among the first tools we install in a new project, and yet they’re also some of the most underrated and least understood.

In this article, I’m going to take you under the hood. We’ll look at how JavaScript lint rules work, why ASTs (Abstract Syntax Trees) are such a big deal, and how you can use this understanding to write or contribute to a linter yourself.

---

## 🧹What Even Is a Linter?

A linter is a tool that automatically analyzes your code to flag errors, enforce style rules and catch potential bugs. Think of it as the Grammarly of the coding world - helping you write cleaner, more consistent code by pointing out problems early.

A popular example is [<VPIcon icon="fas fa-globe"/>ESLint](https://eslint.org/), an open-source linter for JavaScript and TypeScript that checks code for issues and can even auto-fix some of them.

Linters are often:

- Integrated into your text editor or IDE
- Run as part of a CI pipeline or pre-commit hook
- Used alongside formatters like Prettier for even stricter consistency

But how do they decide what to flag as an issue? That’s where **lint rules** come in.

### 🧱 Lint Rules: The Brains Behind the Linter

Lint rules are the building blocks of any linter. Each rule defines:

1. **What to look for**: a specific pattern in your code.
2. **What to do about it**: a warning, an error, or an auto-fix.

There are many types of rules, often grouped into categories like:

- **Error prevention**: Catching bugs, like using undeclared variables.
- **Code style**: Enforcing consistent formatting and naming conventions.
- **Best practices**: Encouraging safer or more readable coding patterns.
- **Security**: Flagging risky code, like direct `eval()` calls or unsafe regex.

If you’ve ever seen an ESLint message like this:

```plaintext
Unexpected console.log

Missing semicolon

'myVar' is assigned a value but never used
```

…you’ve seen lint rules in action.

They’re not just “**style police**.” Linters help reduce mental overhead by catching little issues early, so you can focus on the bigger picture of what your code is trying to do.

---

## 🌳 From Code to Tree: Enter the AST

To understand how lint rules work under the hood, we need to talk about the **Abstract Syntax Tree (AST)** - the data structure at the heart of every linter.

An AST is a structured, tree-like representation of your code. Instead of reading your code as raw text, a linter converts it into a tree where each part of your code (a variable, a string, a function, and so on) becomes a **node** in the tree.

Here’s an example.

Paste this code into [<VPIcon icon="fas fa-globe"/>AST Explorer](https://astexplorer.net/), a tool that lets you view the AST for code in real time:

```js
const name = "Tilda";
```

Set the language to **JavaScript**, and choose one of the ESLint parsers like **Espree**. You’ll see something like this in the right panel:

![AST (Abstract Syntax Tree) showing a VariableDeclaration node for a constant declaration. Inside it is a VariableDeclarator that assigns a Literal node with the string value 'Tilda' to an Identifier named 'name'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747767760645/7929c578-7558-4a1b-8aa6-ed30399b090b.png)

In the image above from AST Explorer, you can see how the tree is structured:

### Program:

- The root node of the AST. It wraps the entire code.
- Contains a `body`, which is an array of statements.

### VariableDeclaration

- Type: `"VariableDeclaration"`
- Represents a declaration using the `const` keyword.
- Has a `kind` of `"const"` and a list of `declarations`.

### VariableDeclarator

- Type: `"VariableDeclarator"`
- Represents a single variable being declared.
- Contains two key parts:
  - **Identifier**
    - Type: `"Identifier"`
    - Name: `"name"`
    - This is the variable being declared.
  - **Literal**
    - Type: `"Literal"`
    - Value: `"Tilda"`
    - This is the string being assigned to the variable.

This nesting is what makes the structure **“tree-like”**. Each node is a parent to smaller pieces (its children), which helps linters navigate code reliably.

So while your eyes see a short line of JavaScript, the linter sees a detailed map of what that line *means* structurally. This hierarchy allows tools like ESLint to pinpoint exactly what kind of code is being used - and where - so rules can target patterns like:

- "Flag all `const` variables"
- "Warn when a variable is named `name`"
- "Disallow hardcoded strings like `Tilda`"

---

## 🤖 Why ASTs Matter for Linting

Now, here’s the key idea: lint rules don’t work by reading your code like text. They work by matching specific node patterns in the AST.

That matters a lot because there are dozens of ways to write the same logic in JavaScript. Let’s take two versions of the same logic: one written as a **function declaration**, and one as an **arrow function**.

```js
function greet() {
  return "hello";
}

const greet = () => "hello";
```

At a glance, they look different. But when we examine their ASTs, we see that both follow similar structural patterns. This is what allows a linter to recognize what your code is doing, no matter how it’s written.

### 🌳 The Tree Behind the Function Declaration

![Abstract Syntax Tree (AST) showing a FunctionDeclaration node with an Identifier for the function name. The function contains a BlockStatement with a ReturnStatement node. Inside the ReturnStatement is a Literal node returning the string 'hello'](https://cdn.hashnode.com/res/hashnode/image/upload/v1747766773571/dfe619ca-d3a4-43a6-9018-c31e4abc6ed8.png)

Here’s what ESLint sees in the AST tree when you write a function declaration:

- It starts with a `FunctionDeclaration` node.
- That node contains:
  - An `Identifier` (the function name: `greet`)
  - A `BlockStatement` representing the function body
  - Inside the `BlockStatement`, there’s a `ReturnStatement`
  - The `ReturnStatement` returns a `Literal` — the string `"hello"`

### 🌳 The Tree Behind the Arrow Function

![Abstract Syntax Tree (AST) showing a VariableDeclaration node for a const arrow function. Inside it is a VariableDeclarator assigning an ArrowFunctionExpression to an identifier. The ArrowFunctionExpression contains a body with a Literal node returning the string 'hello'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747766822908/4723a1e9-c616-4b0d-bdde-ccf1f1cd6b0d.png)

Here’s what ESLint sees when you write the same logic using an arrow function:

- A `VariableDeclaration` with `kind: "const"`
  - Inside it, a `VariableDeclarator`, which assigns a value to the `greet` variable
  - The value is an `ArrowFunctionExpression`
  - The body of the arrow function is a `Literal` — the string `"hello"`

Even though the syntax is different, both paths eventually lead to a **Literal node** containing `"hello"` - which is all your linter needs to care about.

### 💡 Let’s Bring It Home with an Example

Imagine your team has a rule: functions shouldn’t return hardcoded strings like `"hello"`. You want a linter that flags this.

With ASTs, you can write **one lint rule** that matches a `ReturnStatement` or an `ArrowFunctionExpression` whose body is a `Literal`.

Here's the basic idea:

```js
ReturnStatement(node) {
  if (node.argument?.type === "Literal" && node.argument.value === "hello") {
    context.report({ node, message: "Avoid returning static 'hello' strings." });
  }
}
```

And for arrow functions with expression bodies:

```js
ArrowFunctionExpression(node) {
  if (node.body?.type === "Literal" && node.body.value === "hello") {
    context.report({ node, message: "Avoid returning static 'hello' strings." });
  }
}
```

Even though the code styles are different, the **structure of the AST is similar enough** that both functions will trigger the rule, because the linter isn’t looking at how the code is written, only what the structure of the AST actually is.

This is what makes ASTs so useful: they let linters ignore surface-level differences and focus on the actual meaning and structure of your code. As a result, you can write smarter, more flexible rules that catch patterns across different styles, no matter how someone wrote their JavaScript.

---

## 🔨 How ESLint Uses ASTs Under the Hood

ESLint relies on a standardized format called [ESTree (<VPIcon icon="iconfont icon-github"/>`estree/estree`)](https://github.com/estree/estree) to represent JavaScript code as an Abstract Syntax Tree (AST). ESTree isn’t a parser itself - it’s a specification that defines how JavaScript code should be represented as a tree. This makes it possible for ESLint (and similar tools) to understand code in a consistent, structured way.

When you run ESLint on your code, here’s what’s happening under the hood:

### 1. Your Code Is Parsed into an AST

ESLint converts your code into an AST that follows the ESTree format. This tree is made up of nodes, each representing a piece of your code (like a variable, function, or expression). The resulting structure is what every lint rule will analyze.

### 2. Lint Rules “Subscribe” to Specific Node Types

Each lint rule tells ESLint which **node types** it wants to listen to. For example, a rule might care about:

- `Identifier`
- `CallExpression`
- `VariableDeclaration`

These node types match the structure you’d see in tools like AST Explorer.

### 3. ESLint Traverses the Tree and Triggers Rules

ESLint walks through the AST, visiting one node at a time. When it reaches a node type that a rule has subscribed to, it triggers the corresponding function in that rule.

This process is efficient and declarative, you don’t have to worry about manually scanning through every line of code. ESLint does the walking, your rule just listens.

### 4. Rules Inspect Nodes and Report Problems

Inside each rule, you receive the node ESLint has passed in. You can look at its properties - like name, value, or surrounding structure - and decide whether it violates your intended pattern.

If it does, you use `context.report()` to tell ESLint to flag it as an issue. ESLint can also fix the issue automatically if you provide a `fix()` function inside `context.report()`.

```js
context.report({
    node: node,
    message: "Missing semicolon".
    fix: function(fixer) {
        return fixer.insertTextAfter(node, ";");
    }
});
```

---

## 🩻 Anatomy of a Lint Rule

Let’s look at a very simple custom ESLint rule. This one flags any variable named `any`:

```js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow variables named 'any'",
    },
  },

  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'any') {
          context.report({
            node,
            message: "Don't use 'any' as a variable name."
          });
        }
      }
    };
  }
};
```

::: info 🔎 What’s happening here:

- The meta section provides info about the rule (used in ESLint docs and tooling).
- The `create()` function defines which node types the rule listens for.
- `Identifier(node)` is triggered every time an identifier is found in the code.
- If the identifier’s name is `any`, the rule calls `context.report()` to raise a warning.

:::

---

## 🛠 Helpful Tools for Exploring ASTs

Understanding ASTs can feel abstract at first, but some tools make the learning curve much smoother. These are especially helpful when you’re trying to visualize how your code translates into tree structures, or when debugging a custom rule.

### 1. AST Explorer

```component VPCard
{
  "title": "AST explorer",
  "desc": "An online AST explorer.",
  "link": "https://astexplorer.net/",
  "logo": "https://astexplorer.net/favicon.png",
  "background": "rgba(239,239,239,0.2)"
}
```

This is the most beginner-friendly and powerful tool for working with ASTs. You can:

- Paste in any JavaScript code
- Choose an ESLint-compatible parser (like Espree)
- Instantly see the AST structure on the right-hand side
- Hover over tree nodes and see how they map to specific parts of your code

If you're writing a custom rule, AST Explorer will likely become your best friend. It helps you figure out exactly which node type you need to target and what properties are available on that node.

### 2. ESLint’s Rule Examples and Tests

Sometimes the best way to learn is to read real code. ESLint's core rules (or rules from popular plugins like [<VPIcon icon="iconfont icon-github"/>`jsx-eslint/eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react/)) include:

- Rule definitions
- Test files showing code that **should** and **shouldn’t** trigger the rule
- Fix examples (if the rule is auto-fixable)

Browsing these helps you understand how real-world rules are structured and how the test setup works.

::: tip

Look in the <VPIcon icon="fas fa-folder-open"/>`tests/lib/rules/` or <VPIcon icon="fas fa-folder-open"/>`lib/rules/` folders of ESLint or plugin repositories.

:::

### 3. ESLint’s Documentation

ESLint has comprehensive documentation about working with rules:

- [<VPIcon icon="fas fa-globe"/>ESLint: Working with Rules](https://archive.eslint.org/docs/2.0.0/developer-guide/working-with-rules)
- [<VPIcon icon="fas fa-globe"/>ESLint: Custom Rules](https://eslint.org/docs/latest/extend/custom-rules)

---

## ✅ Wrapping Up: Why You Should Understand This

Understanding how ASTs work gives you superpowers when it comes to customizing and contributing to linting tools. Whether you're trying to enforce a specific pattern in your team’s codebase or want to contribute to a plugin like [<VPIcon icon="iconfont icon-github"/>`jsx-eslint/eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react/), this knowledge will help you:

- 🔧 **Contribute to existing rules** by understanding what they’re checking and how
- 🐛 **Debug confusing linter behavior** when rules fire unexpectedly (or not at all)
- 🛠 **Write your own custom rules** to enforce specific coding standards, project conventions, or best practices

You don’t need to be a compiler expert or fully grasp every node type in the spec. You just need to recognize patterns, explore trees, and get comfortable identifying the nodes your rule cares about.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How JavaScript Lint Rules Work (and Why Abstract Syntax Trees Matter)",
  "desc": "Before I started to contribute to eslint-plugin-react, I didn’t think too deeply about the linters I used every day while writing code. Like many developers, I installed them at the start of a project, appreciated the red underlines or auto-fixes, an...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-javascript-lint-rules-work-and-why-abstract-syntax-trees-matter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
