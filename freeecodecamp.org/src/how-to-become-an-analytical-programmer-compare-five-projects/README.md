---
lang: en-US
title: "How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
description: "How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
icon: iconfont icon-mermaid
category:
  - Node.js
  - Mermaid.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - mermaid
  - mermaidjs
  - mermaid-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
    - property: og:description
      content: "How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/
prev: /programming/js-mermaid/articles/README.md
date: 2025-05-12
isOriginal: false
author:
  - name: evaristo.c
    url : https://freecodecamp.org/news/author/ec001/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746812725602/cd4a5bc4-71f2-4678-8f5d-5571d9cc38e8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Mermaid.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programmnig/js-mermaid/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js"
  desc="Over the past year, I’ve explored tools and practices that help developers build an analytical mindset. One recurring theme is how experienced programmers often describe understanding code as forming a mental picture - a conceptual map of the program..."
  url="https://freecodecamp.org/news/how-to-become-an-analytical-programmer-compare-five-projects"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746812725602/cd4a5bc4-71f2-4678-8f5d-5571d9cc38e8.png"/>

Over the past year, I’ve explored tools and practices that help developers build an analytical mindset. One recurring theme is how experienced programmers often describe understanding code as forming a mental picture - a conceptual map of the program’s flow.

When it comes to software development, finding ways to visualize these mental models is a common thread. Many developers describe sketching workflows or imagining them mentally to reason through code. And in my own experience working with senior developers and software architects, this visualization habit is extremely common.

A 2013 Quora post captures this well:

> “A top coder sees a program graphically (…) A data structure as a hierarchy of relationships, a program as a network of data pipes… The first and only time he reduces pictures to words is when he writes code.” —Rober Wagner

So it appears that developing our ability to recognize patterns in code could help us to develop our expertise. But programming is rarely that straightforward - there are often multiple ways to solve the same problem. It also reflects a developer’s personal habits, experiences, and styles. So which patterns matter, then?

Imagine you assign the same task to five developers: build a small game using HTML, CSS, and JavaScript. Each solution should follow the same functional rules. What are the chances their code will look the same?

You’d expect that their implementations might differ, but the underlying **mental workflow** - the internal logic they follow - might be remarkably similar. If you can reconstruct this mental flow from each codebase, you can create a shared referential point for comparison. Once this conceptual diagram is in place, you can “overlay” it on each codebase to identify where they diverge in structure, logic, or abstraction.

Ever since I started coding, spotting “patterns” while comparing other people’s code has fascinated me. I’ve found the process of comparing code not only educational but also enjoyable.

Up until now, I’ve approached it mostly by intuition - but I’ve always felt the need for a more structured method. This article explores a more systematic approach to code comparison, reflecting on what works well and what can be improved.

::: tip How to Read this Article

This article is intentionally extensive. Instead of just showing the end result, I’ll walk you through the methodology so you can recreate or adapt it for your own code comparisons.

That said, there are different ways you might approach this article, depending on your interests:

- **Just curious about the idea?** The core argument is already laid out in the introduction. Maybe read the conclusion too, and that might be enough for your needs.
- **Looking to improve your portfolio?** Skim through the analyses. If you're working on a game project, you’ll find comparisons of five JavaScript implementations of Rock, Paper, Scissors. These may give you practical ideas for your own code.
- **Interested in code analysis?** Read the whole thing. This article goes deeper into why analyzing code is valuable and presents a practical methodology - including tools - you can apply.

:::

---

## Visual Tools for Code Comparison

There are many tools and approaches for code analysis, and although there are more and more “automatic” ways of doing it, **flow diagrams** are still incredibly useful. Unfortunately, while they’re widely used in programming education and analysis, their use for comparing different implementations is rarely discussed or illustrated in tutorials.

Still, the potential is clear. Flow diagrams capture structure and logic in a compact, readable form. They're heavily used in compiler design for analyzing control flow, optimizing logic, and identifying bugs.

When applied to comparative analysis, they can highlight differences in:

- Modularity and abstraction
- Execution flow
- Separation of concerns or unnecessary complexity

But not all diagram types are equally effective for this purpose. Traditional flowcharts often dive too deep into the nitty-gritty, repeating low-level logic like if-else branches already visible in the source. While helpful for understanding a single script, they may obscure broader design patterns when comparing multiple implementations.

When comparing codebases, a better option is to focus on code structure: how functions, modules, and scopes relate and interact. For that, **system block diagrams** are a better fit.

### Why Use System Block Diagrams?

System block diagrams visualize a program at a higher level. They use labeled blocks to represent major components (functions, classes, modules) and arrows to show how data or control flows between them. This lets you focus on architecture: which part does what, and how do they work together?

Used for code comparison, placing two system block diagrams side by side immediately highlights structural and design differences. You can see at a glance how one solution favors modularity, another embeds logic in fewer blocks, or which one better separates concerns.

Still, system block diagrams can be drawn in different ways - some emphasizing structure, others workflow. Is there a format that combines both?

### The Use Case-Driven System Block Diagram

A strong candidate is the **use case-driven system block diagram**. [<VPIcon icon="fas fa-globe"/>An example](https://clear.rice.edu/comp310/JavaResources/systemblockdiagrams.html) of this variant is suggested as part of the resources for a computer science curriculum (“Advanced Object-Oriented Programming and Design” COMP310) of Rice University.

Unlike use case diagrams (which focus only on actors and goals), use case-driven system block diagrams are more implementation-focused. They still show modules and data flow, but through the lens of system functionality and user-driven logic.

![An example of Use Case-Driven System Block Diagram, by computer science students at Rice University](https://cdn.hashnode.com/res/hashnode/image/upload/v1746025297569/da5599e5-838a-4c90-bbf8-ddcaba58e36f.jpeg)

Interestingly, the example above effectively exemplifies its usage for **evaluating existing architectures**. This confirms the suitability of this type of diagram for comparisons between codebases. Simply draw one diagram per implementation, striving to find their same functional goal. Then, compare their workflows and structures side by side. You’ll quickly spot which solution is more modular, more efficient, or easier to maintain.

---

## What We Are Going to Do

To elaborate upon the suitability of this methodology for code analysis, we’ll apply the fundamentals of use case-driven system block diagram methodology to analyze five JavaScript projects’ code - each created by a different developer - implementing the Rock, Paper, Scissors game on [<VPIcon icon="fa-brands fa-codepen"/>CodePen](https://codepen.io/).

The Rock, Paper, Scissors (RPS) game is a simple two-player challenge where each participant simultaneously shows either a “rock”, a “paper”, or “scissors” depicted by one of their hands, usually after a countdown. Then they apply the following rule to decide the “winner”:

![Rules of the Rock Paper Scissors game, Wikipedia](https://cdn.hashnode.com/res/hashnode/image/upload/v1746025625482/59c24cc3-d1e8-455b-8387-67733487e58d.jpeg)

- Rock beats scissors
- Scissors beats paper
- Paper beats rock

If both players choose the same option, it’s a tie.

In most programming versions, the player faces off against the computer, which makes random (or pseudo-random) choices. It’s a favorite beginner’s project because it’s easy to understand and fun to build.

### The Code Examples

We are going to compare the (vanilla) JavaScript code for the following 5 projects, ordered by complexity:

1. **“CPC Rock Paper Scissors”** by Amit (<VPIcon icon="fa-brands fa-codepen"/>`@ghaste` in CodePen)
2. **“Rock Paper Scissor game using native drag & drop”** by Hmz C (<VPIcon icon="fa-brands fa-codepen"/>`@HmZ2` in CodePen)
3. **“Rock Paper Scissors“** by Brad Traversy (<VPIcon icon="fa-brands fa-codepen"/>`@bradtraversy` in CodePen)
4. **“Rock Paper Scissors OOP“** by Damian (<VPIcon icon="fa-brands fa-codepen"/>`@CvtS` in CodePen)
5. **“Recurrent Neural Network - Rock, Paper, Scissors“** by Andrew Worscerter (<VPIcon icon="fa-brands fa-codepen"/>`@amwmedia` in CodePen)

In order to keep the article shorter, the full code won’t be provided here, except for some exceptional cases. You are encouraged to visit the corresponding projects in CodePen to have a look at the code alongside the analysis. Because the authors can update or even delete the code in CodePen at any time, I’ll also add links to Gists with the code I analyzed at the time I wrote the article.

::: info Follow this link

<SiteInfo
  name="Five Code Examples of Rock, Paper, Scissors"
  desc="Five Code Examples of Rock, Paper, Scissors. GitHub Gist"
  url="https://gist.github.com/evaristoc/81dc9f508aa54c355f3f89b08a2450d5/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

if you want to find the copy of the JavaScript codes used for this article.

#### How to Choose Your Projects

To find the projects, I searched CodePen for any pen about “Rock Paper Scissors”. Then I checked out the edits of some of them, and chose the ones I found the most interesting. I made a point to choose ones with varying complexities.

![Querying CodePen in search for the projects](https://cdn.hashnode.com/res/hashnode/image/upload/v1746808534102/acd2dba9-05d4-454d-8bb8-f4ee51dff304.jpeg)

### The Scope

First of all, our goal here isn’t to judge the quality of the codebases. Instead, it’s to demonstrate how we can use this diagram-based methodology to compare them.

CodePen projects often include quick demos, experiments, or even AI-generated snippets. Some developers might be more interested in the HTML/CSS of the project. But while they don’t always follow best practices, that’s what makes this exercise interesting - the diversity of approaches reveals valuable contrasts worth analyzing.

### The Methodology

For the comparison, we’re using a methodology inspired by Rice University’s COMP310 course, which suggests the following high-level steps for constructing use case-driven system block diagrams:

1. **Add all system use cases** to a single diagram. These use cases will be similar to “steps in a workflow”.
2. **Group related cases** within conceptually - or functionally - related operations.
3. **Encapsulate groups** into modules (or blocks) based on roles and responsibilities. Start drawing the relationships (note: what we should understand for encapsulation here shouldn’t be confused with other definitions like the one given in OOP).
4. **Decouple operations** as much as possible - refine scope and minimize interconnections.

In order to allow the comparison between code examples, we will try to find cases (or steps), modules, and relations that are consistently similar between each code example, independently of the “architecture”.

Although UML compliance is encouraged in the original course, we’ll take a lighter approach - preserving the intent and structure without strictly following every UML rule.

### How We’ll Build the Diagrams

The Rice course focuses more on **what** the diagram should show, but not so much on **how** to actually build it. For that, I refer to a [**previous article**](/freecodecamp.org/how-to-make-flowcharts-with-mermaid.md) where I broke down the diagram creation process. Here’s how the two approaches align:

| **Step** (from earlier article) | **Corresponds to** (Rice methodology) |
| --- | --- |
| Define a scope | Identify the goal and context for your diagram |
| Find the start and end of the workflow | Identify use cases (actually, a general scanning of the workflow) |
| Identify deep-dive vs. generalized sections | Identify groups of cases. Prepare for modular encapsulation |
| Iterative refining and generalization | Applied throughout to improve module clarity and decoupling |
| Enhance and extend | Equivalent to fine-tuning and breaking dependencies |

Feel free to revisit that article if you want a more detailed walkthrough of these steps.

### Our Tool: Mermaid.js

To create the diagrams, we’ll use [<VPIcon icon="iconfont icon-mermaid"/>Mermaid.js](https://mermaid.js.org/), a JavaScript library that converts text into diagrams. It’s Markdown-compatible, which makes it especially handy for online projects, blog posts, and documentation.

The main reason I chose Mermaid.js is that diagrams are easily editable, so we can:

- Focus on defining relationships instead of worrying about layout
- Easily iterate and update as we discover more structure in the code
- Allows code reusability

Mermaid.js is also highly configurable, allowing a certain level of customization. It was also made for the web, so it’s compatible with JavaScript, CSS and Markdown. But it’s not a perfect tool, and its use poses challenges both because of the limitations of the tool itself and even because of the limitations of using visual diagrams for code analysis.

If you aren’t familiar with using Mermaid.js, I wrote [**an extensive tutorial**](/freecodecamp.org/use-mermaid-javascript-library-to-create-flowcharts.md) about the tool, along with its pros and cons. Although I will refrain from talking in-depth about Mermaid.js here, I will make use of some other tricks that were not included in previous articles.

Be aware that to keep consistency in sizing and titling all resulting diagrams were subjected to post-treatment, which also included color filtering to improve contrast.

---

## Five Code Examples of Rock, Paper, Scissors

```component VPCard
{
  "title": "“CPC Rock Paper Scissors” by Amit: A project with fireworks animations",
  "desc": "(1/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/1-cpc-rock-paper-scissors-by-amit-a-project-with-fireworks-animations.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "“Rock paper scissors game using native drag & drop” by Hmz C: A project using the HTML Drag element",
  "desc": "(2/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/2-rock-paper-scissors-game-using-native-drag-drop-by-hmz-c-a-project-using-the-html-drag-element.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "“Rock Paper Scissors” by Brad Traversy: A project with a modal and a reset",
  "desc": "(3/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/3-rock-paper-scissors-by-brad-traversy-a-project-with-a-modal-and-a-reset.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "“Rock Paper Scissors OOP” by Damian: A project written in OOP",
  "desc": "(4/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/4-rock-paper-scissors-oop-by-damian-a-project-written-in-oop.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "“Recurrent Neural Network - Rock, Paper, Scissors” by Andrew Worcerster: A Project Implementing AI",
  "desc": "(5/5) How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "link": "/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects/5-recurrent-neural-network-rock-paper-scissors-by-andrew-worcerster-a-project-implementing-ai.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Final Thoughts

As a developer, you will be exposed to many different lines of creative code yourself. Or how Robert C. Martin pointed it out in his book “Clean Code”:

> “Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code.”

So, learning to understand other people’s code is an essential skill that every programmer should develop. And this learning only happens by studying other people’s code and trying to reveal their tricks and bugs.

That is why finding good ways to reveal patterns when comparing code is so important. And that has been the main purpose of this project.

When I started, I still wasn’t sure about what to expect from the approach. Let me share with you what I learned.

What I found limiting from this approach was:

- The more complex the code, the more complex the diagram gets, making it difficult to read. And the more difficult the diagram, the more difficult is to work out a diagram with Mermaid.js. You will also have to make more definitions, add more color, use more tricks, and so on in order to seek clarity. And the more “solutions” you have to find to clarify your diagram, the higher the risk of making it less clear.
- It takes time and practice. This kind of technique is not something that you learn all at once. You might find yourself making a lot of changes before getting the “right” result. If you are doing this with Mermaid.js or any other scripting tool, you will have to learn to script with them, too.
- This approach is not about visualizing algorithms or syntax. I suspect that if you read the analyses of this article with no knowledge about machine learning or object-oriented programming, this analysis likely didn’t teach you how to do machine learning or OOP. To understand those projects you have to already have internalized the “patterns” on how to do either OOP or machine learning, or be in the right moment of your learning curve, in order to be able to extract something from the code.

What I found beneficial from this approach:

- Something that I learned the hard way was that *good* programming is not only about algorithms and syntax: it is also about structure and organization. And this approach will give you a lot of information about that.
- It helps you break the code apart into functional operations. You adopt a “divide and conquer” approach to studying code.
- Even if you are not visualizing the algorithms, you learn algorithms. Why? Because the approach forces you to understand the code. In order to find those functional operations, you will find yourself forced to study what some sections of the code are doing. So you will have to study more code.
- You learn by comparison. That is an interesting by-product: once you have found different implementations for a similar functional operation, you learn by their differences. The diagrams will then guide you to the sections of the code that are solving *that* specific problem you are interested in and you’ll be able to compare it within the context of a larger codebase.
- The diagrams acts as mnemotechnical artifacts to remember pieces of code. You can use those diagrams to recall a piece of code that was interesting to you, and then you’ll be able to find it more easily than by having to go through the whole code again.

What I found more interesting about this approach is the numerous questions that came to my mind during and after doing the analyses:

- *Why did the author follow this approach?*
- *What drove their decisions?*
- *How could I better organize it if I worked on it?*
- *Which techniques would I like to combine?*
- *What should I avoid for this project?*

And so on.

Another effect was the feeling that I could now easily recognize the same “template” in other projects without having to make the diagrams. It starts to be more natural.

If you feel you want to implement this approach next time you come across several codebases you want to compare, I recommend you do the following:

- **Don’t stick only to visuals**. Combine this with other tools. This is just one part of the whole process. For example, use AI to get a textual description of the code and use the diagrams to visualize the flow.
- **Always go to the code as it is the “source of truth”.** You (or AI, if you’re using it) might have gotten it wrong at certain points, so always check.
- **Better to compare code examples that are at your level or just a bit higher, and be prepared to challenge yourself by studying new concepts**. For example, if you have just the fundamentals of OOP clear in your head but you haven’t started to work on it, find simple examples at your current level and a few more made in OOP that solve similar problems and compare the approaches. I ensure you that you will start finding the patterns.
- **Come up with questions**. The analysis might reveal structures and workflows and help you get into new programming techniques, but it won’t tell you if those structures or techniques were the “right” solution. You have to investigate more from that point. Then you can compare theory with practice. And then you will come up with more questions!
- Select projects that are not subject to change.
- **Don’t worry about how old the projects are**. Syntax is not what you are looking to learn from this analysis. It is code structure, organization, and logic. The “map in the mind of the developer”.
- **Keep it real**. If your goal is to learn to code and your time is limited, bear in mind that this kind of analyses will take extra time. It won’t result in concrete code either. It might be good planning for analyzing new codebases at a high level of generalization. But even if it’s too general, I assure you that the time you devote to it will be worthy.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Become an Analytical Programmer - Solve the “Rock, Paper, Scissors” Game 5 Ways Using JavaScript & Mermaid.js",
  "desc": "Over the past year, I’ve explored tools and practices that help developers build an analytical mindset. One recurring theme is how experienced programmers often describe understanding code as forming a mental picture - a conceptual map of the program...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-become-an-analytical-programmer-compare-five-projects.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
