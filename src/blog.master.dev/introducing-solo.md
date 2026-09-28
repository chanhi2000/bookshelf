---
lang: en-US
title: "Discover Solo: The Ultimate AI-Integrated Control Panel"
description: "Article(s) > Discover Solo: The Ultimate AI-Integrated Control Panel"
icon: iconfont icon-claude
category:
  - AI
  - LLM
  - Anthropic
  - Claude
  - MCP
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Discover Solo: The Ultimate AI-Integrated Control Panel"
    - property: og:description
      content: "Discover Solo: The Ultimate AI-Integrated Control Panel"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/blog.master.devintroducing-solo.html
prev: /ai/claude/articles/README.md
date: 2026-09-23
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11114
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Discover Solo: The Ultimate AI-Integrated Control Panel"
  desc="Discover Solo: the ultimate tool for streamlining coding projects with AI integration, terminal management, and powerful debugging features."
  url="https://master.dev/blog/blog.master.dev/introducing-solo/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11114"/>

[<VPIcon icon="fas fa-globe"/>Solo](https://soloterm.com/) is one of my favorite new tools. I heard about it recently from its creator, Aaron Francis, while at a conference he was emceeing.

Solo’s website describes it as a Meta-harness for coding agents, but I don’t think that does the project justice. To me, Solo is a control panel for whatever project I’m working on, with deep AI integration (naturally). It’s home to any terminals I might need, with common commands preloaded into dedicated slots in Solo, with the option to auto-start. And again, AI is deeply integrated: you can launch agents, and what’s especially neat is that Solo provides its own MCP server that gives your agents access to your tasks and terminals to help debug problems you’re having.

Let’s take a look!

---

## Solo

I won’t walk you through installation or adding a project. It’ll make some best guesses on which commands you’ll likely want. Tweak as desired (you can always adjust later) and create it.

Here’s what mine looks like for a fitness tracking application I’ve been messing with.

![Development environment window showing the output of a local server setup for a fitness tracker project, including commands and instructions for accessing the server.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-00-main-ui.jpg?resize=1024%2C895&quality=89&ssl=1)

This is [**a TanStack Start web application**](/blog.master.dev/introducing-tanstack-start.md), and as you can see, I’ve got two commands (basically a terminal embedded in Solo) running: my dev web server and Postgres via Docker.

![TanStack Start & TanStack Query](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/07/tanstack-course.webp?fit=500%2C500&quality=80&ssl=1)

As you hover over those commands, you’d see buttons to stop, start, or restart any of these commands. Naturally, you can click any of these commands and see that terminal’s output in the main Solo window. In the image above, you can see my dev server.

And obviously you can edit these commands anytime.

![Screenshot of a development server configuration in a terminal interface, displaying settings such as the command 'npm run dev', working directory, auto-start options, and notification levels.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-00a-edit-command.jpg?resize=916%2C1024&quality=89&ssl=1)

---

## Starting Agents

So far, all I’ve shown is an app that manages multiple terminals in one convenient place, with common commands pre-set.

But it’s 2026, so obviously you want to see the AI integration. Naturally you can start agents in Solo; there’s even a dedicated section for it, which you can see in the image above. There’s no shortage of shortcuts and UI commands for this, but just hit Command-T and type “agent”

![A screenshot of a software interface displaying options for creating new agents, including 'New Claude agent' and 'New Codex agent' with variations such as 'with custom flags'.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-01a-new-agent.jpg?resize=1024%2C464&quality=89&ssl=1)

Don’t worry, Solo supports virtually any agent you’ve ever heard of; only Claude and Codex show up here because that’s all I bothered to set up.

Once you start an agent, it’s living as normal right inside Solo, just like you’re used to.

![Screenshot of Claude Code interface v2.1.220 displaying a welcome message, tips for getting started, and recent updates.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-01b-agent.png?resize=1024%2C225&quality=80&ssl=1)

Nothing changes for you as the user.

---

## Solo’s Built-in MCP

I moved kind of fast above because I wanted to get to the more interesting AI pieces. I mentioned earlier that Solo has a built-in MCP server that lets your agents inspect (among other things) your other commands and their outputs to help debug problems.

Let’s try it out. I’ll stop my database process.

![Screenshot of a code management interface showing project details for 'fitness-tracker', including sections for to-dos, agents, terminals, commands, and scratchpads.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-02a-stopped-db.jpg?resize=486%2C930&quality=89&ssl=1)

Obviously nothing will work now.

![Code snippet displaying an error message related to API session management, indicating an internal server error with the status code 500.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-02b-errors-in-dev-server.jpg?resize=1024%2C586&quality=89&ssl=1)

As a control, before I touch Solo’s MCP, let’s make sure this isn’t something a vanilla Claude agent could easily debug. When I ask it why I have errors in my dev server, it starts taking steps to start the dev server and reproduce.

![Screenshot of a terminal displaying a request for help with debugging dev server errors and commands to check dev scripts in package.json.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-02c-bad-prompt-debug.jpg?resize=1024%2C279&quality=89&ssl=1)

I’d prefer it to just look at my existing output, along with neighboring commands.

---

## Enabling MCP

The MCP section in Solo has a dirt-simple way to enable it for whatever agent you use. It gives you a bash command, or if that’s too much effort, a nice fat “Run” button that executes that command for you.

![Terminal interface displaying a command to add a user entry in Claude Code, with instructions to check for existing entries and a button to run the command.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-03-setup-mcp.jpg?resize=1024%2C244&quality=89&ssl=1)

Find your harness of choice and smash that Run button, and it should show as installed.

![Screenshot of terminal commands for Claude Code installation and setup, displaying commands to add, check, and remove an MCP entry.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-04-solo-claude-installed.jpg?resize=1024%2C241&quality=89&ssl=1)

---

## Using Solo’s MCP

When we try to debug the same problem with the same prompt, unfortunately nothing really changes.

![A programmer seeks help with debugging errors on a development server, displaying text in a code editor revealing package.json reading and npm run commands.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-05a-bad-prompt-with-mcp.jpg?resize=1024%2C278&quality=89&ssl=1)

If you want to engage Solo’s MCP, you need to be a bit more specific in your prompt

![Debugging report for a dev server process showing PostgreSQL is down, causing connection errors in a database application.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-05b-solo-mcp-debug.jpg?resize=1024%2C499&quality=89&ssl=1)

### Adding a Skill

Like any software engineer, I tend to be lazy and would prefer to not have to manually tell it “hey, use Solo’s MCP to blah blah” every time I want it to. A skill is a nice way to wrap that bit of functionality up.

At the time of writing, Skills have sort of gotten a bad name, with devs dumping way too many of them in their repo, flooding context windows, potentially affecting skill selection quality, etc. But a skill that can only be manually invoked can avoid those issues and essentially serve as a subroutine for wrapping common functionality (like any function we’re used to writing).

Here’s the skill I whipped up:

```md
---
name: solo-debug
description: Debug this application using Solo MCP
disable-model-invocation: true
---

# Solo Debug

Use the Solo MCP tools to inspect the processes already running
for this project.

1. Inspect recent output and errors.
2. Use those process outputs to help diagnose what's being asked.
3. Do not start new processes unless necessary.
```

Note this line:

```yaml
disable-model-invocation: true
```

That prevents models from invoking it on their own.

I put that in <VPIcon icon="fas fa-folder-open"/>`.claude/skills/solo-debug/`<VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` and with that, I can now just do `/solo-debug` and type my original prompt

![A terminal output showing debugging information for a development server, highlighting a PostgreSQL database connection issue and instructions to restart the Postgres container.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-07-solo-use-debug-skill.jpg?resize=1024%2C579&quality=89&ssl=1)

---

## There’s So Much More

I’m about to wrap this post up, but if you’re feeling underwhelmed with Solo, I promise I’m barely scratching the surface. Solo also supports scratchpads and to-dos, which, of course, can integrate with your agents. And there are entire [<VPIcon icon="fas fa-globe"/>AI orchestration workflows](https://soloterm.com/docs/workflows/agent-orchestration). They even have guides on [<VPIcon icon="fas fa-globe"/>building better daily workflows](https://soloterm.com/docs/workflows/daily-operating-patterns).

---

## Wrapping Up

Solo is a superb tool for managing multiple processes and agents and connecting everything seamlessly. The process management alone is nice, but the built-in MCP support for improved debugging really makes this tool a favorite of mine. And that is before we’ve even scratched the surface of the deeper AI workflows it supports.

```component VPCard
{
  "title": "What Senior Engineers Need to Know About AI Coding Tools",
  "desc": "Senior engineers actually have a massive advantage with AI tools once they learn the basics. They know what questions to ask. They understand edge cases. A junior dev accepts the first output. A senior dev knows what's missing.",
  "link": "/blog.master.dev/what-senior-engineers-need-to-know-about-ai-coding-tools.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```


[![black google smartphone on box](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/10/pexels-photo-1482061.jpeg?fit=1200%2C800&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/chrome-devtools-mcp/ "chrome-devtools-mcp")

#### [chrome-devtools-mcp](https://blog.master.dev/chrome-devtools-mcp/ "chrome-devtools-mcp")

I'm no expert here, but I understand an "MCP server" as a way to make an AI system a bit "smarter" by having more context and capabilities. I find AI coding agents pretty darn smart already particularly when they have your entire codebase and your instruction for context. But if…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Discover Solo: The Ultimate AI-Integrated Control Panel",
  "desc": "Discover Solo: the ultimate tool for streamlining coding projects with AI integration, terminal management, and powerful debugging features.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/blog.master.devintroducing-solo.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
