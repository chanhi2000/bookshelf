---
lang: en-US
title: "How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance"
description: "Article(s) > How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance"
icon: fa-brands fa-node
category:
  - Node.js
  - CSS
  - Web Browser
  - Google
  - Chrome
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
  - browser
  - webbrowser
  - web-browser
  - google
  - chrome
  - googlechrome
  - google-chrome
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance"
    - property: og:description
      content: "How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-your-ai-coding-agent-from-writing-outdated-code-with-modern-web-guidance.html
prev: /programming/js-node/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Ophy Boamah
    url: https://freecodecamp.org/news/author/CodeHemaa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c231d1d5-6f7b-40c2-b255-81012edb97e0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programmin g/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
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

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance"
  desc="AI coding agents can save developers a lot of time – that is, until you open the output and realize they've written code like it's 2019. Ask an agent to build a tooltip, for example. The HTML looks po"
  url="https://freecodecamp.org/news/how-to-stop-your-ai-coding-agent-from-writing-outdated-code-with-modern-web-guidance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c231d1d5-6f7b-40c2-b255-81012edb97e0.png"/>

AI coding agents can save developers a lot of time – that is, until you open the output and realize they've written code like it's 2019. Ask an agent to build a tooltip, for example. The HTML looks polished, the CSS transitions are smooth, the `aria-describedby` wiring is correct. Then you get to the JavaScript: a `js-hidden` class toggle system, a `dismissAllTooltips()` function, touch event handlers, click-outside detection, and an entire interaction management layer to compensate for what CSS alone can't do.

The agent isn't broken. It's just reaching for patterns that dominate its training data, even though the browser has had better answers for years.

Modern Web Guidance (MWG) is Google Chrome's open-source fix. It injects expert-vetted, platform-aware guidance directly into your AI agent's context, steering it toward current, accessible, and performant web standards.

In this article, you'll learn why Modern Web Guidance solves the "legacy code" problem, and how to integrate it into your workflow for consistently up-to-date results.

---

## Why Do AI Agents Default to Legacy Patterns?

Every large language model (LLM) learns from the web, which is evolving at a truly rapid pace. New browser APIs ship years before they have enough tutorials, Stack Overflow answers, and real-world codebases to meaningfully appear in training data.

The practical result: even when a model has been trained to know that a modern API exists, it has seen the old approach thousands of times and the new approach a handful of times. As a result, when it generates code, the legacy pattern wins, not because the model is ignorant, but because the training signal for the outdated approach is stronger.

Prompting doesn't fully solve this. Telling your agent to "use modern APIs" nudges things slightly, but it doesn't provide the dense, expert-vetted implementation patterns the model needs to write production-ready modern code confidently. You'd have to paste in documentation for every feature, in every session, indefinitely.

Here's what the problem looks like in practice. To have real outputs to test, I prompted Antigravity IDE to build two separate components without Modern Web Guidance installed.

### Before: Tooltip Component

**Prompt:** "Build a tooltip component that appears above a button when hovered."

The HTML is reasonable. The CSS handles positioning with `position: absolute`, animates opacity, and even wires up `role="tooltip"` and `aria-describedby` correctly. Then you get to the JavaScript:

```js
// ❌ Before MWG — a full interaction management layer built in JS
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.tooltip-container');

  containers.forEach(container => {
    const trigger = container.querySelector('.tooltip-trigger');
    const tooltip = container.querySelector('.tooltip-content');

    const forceHide = () => tooltip.classList.add('js-hidden');
    const resetVisibility = () => tooltip.classList.remove('js-hidden');

    // Escape key to dismiss
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { forceHide(); e.preventDefault(); }
    });

    trigger.addEventListener('blur', resetVisibility);
    container.addEventListener('mouseleave', resetVisibility);
    container.addEventListener('mouseenter', resetVisibility);

    // Touch handling
    trigger.addEventListener('touchstart', (e) => {
      const isVisible = !tooltip.classList.contains('js-hidden') &&
        getComputedStyle(tooltip).visibility === 'visible';
      if (isVisible) { forceHide(); } else { dismissAllTooltips(); resetVisibility(); }
    }, { passive: true });
  });

  function dismissAllTooltips() {
    document.querySelectorAll('.tooltip-content').forEach(t => t.classList.add('js-hidden'));
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tooltip-container')) {
      document.querySelectorAll('.tooltip-content').forEach(t => t.classList.remove('js-hidden'));
    }
  });
});
```

The problem isn't that the above code is wrong – not at all, it works. The problem is what it reveals: because the CSS `:hover` and `:focus-within` selectors can't handle Escape-to-dismiss, touch toggle, or click-outside detection, the agent has to build a parallel JavaScript system to manage tooltip state. Visibility is now split across two systems that have to stay in sync. A `js-hidden` class exists specifically to let JavaScript override CSS.

::: info

You can move ahead to [see the updated Tooltip component code after Modern Web Guidance was installed](#after-tooltip-component) if you're curious right now.

:::

Next, let's look at how the agent builds a toast notification without Modern Web Guidance.

### Before: Toast Notification with Exit Animation

**Prompt:** "Build a toast notification system where notifications fade out before being removed."

```js
// ❌ Before MWG — JavaScript owns the entire animation lifecycle
const dismissToast = (toast) => {
  if (toast.classList.contains('toast-fade-out')) return;

  // 1. Apply fade-out class to trigger CSS transition
  toast.classList.add('toast-fade-out');

  // 2. Wait for transition, then remove from DOM
  const handleUnmount = (e) => {
    if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
      toast.removeEventListener('transitionend', handleUnmount);
      toast.remove();
    }
  };
  toast.addEventListener('transitionend', handleUnmount);

  // 3. Fallback in case transitionend doesn't fire
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 400);
};

// Auto-dismiss after 4 seconds
autoDismissTimer = setTimeout(() => {
  dismissToast(toast);
}, 4000);
```

Reviewing the code above: this pattern is extremely common, and again it does work. But notice how much JavaScript is dedicated to a problem that's fundamentally about animation timing.

The agent adds a CSS class to start a transition, then uses `transitionend` to know when to remove the element, then adds a `setTimeout` fallback in case `transitionend` doesn't fire, then another `setTimeout` for auto-dismissal.

The JavaScript and CSS are deeply entangled. Change the transition duration in CSS and you have to update the JavaScript timeout to match.

::: note

You can move ahead to [see the updated Toast notification code after Modern Web Guidance was installed](#after-toast-notification-with-exit-animation) if you're curious now.

:::

Both examples share the same shape: the agent writes JavaScript to compensate for what it doesn't know the browser can handle natively.

---

## What Is Modern Web Guidance (MWG)?

[<VPIcon icon="fa-brands fa-chrome"/>Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance) is an open-source project backed by the Google Chrome team and the Microsoft Edge team. Instead of hoping the model knows what the modern platform offers, you give it a structured, expert-vetted reference file that maps common development scenarios to the right solutions.

It ships as an **agent skill**, a <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file that lives in your project and gets read by your coding agent before it generates code. Think of it as a project-specific instruction manual that teaches the agent which modern APIs exist and when to use them. The skill shifts the probability distribution toward modern platform solutions in a way that a one-line prompt instruction can't.

Under the hood, the mechanism works in three steps:

1. Your agent activates the skill because the task is web-related.
2. The agent runs `modern-web-guidance search "<query>"`, a local semantic search using an offline TensorFlow.js model. No API key, and no network call.
3. The agent retrieves the matched guide via `modern-web-guidance retrieve <guide-id>`, injecting targeted patterns, gotchas, and fallback strategies directly into its context window.

Two skill packs are available. `modern-web-guidance` covers modern browser APIs, CSS layout systems, performance, accessibility, and built-in AI APIs. This is what most developers want.

`chrome-extensions` covers Manifest V3, background workers, and Chrome Web Store publishing. [<VPIcon icon="fa-brands fa-chrome"/>Early evals show a 37 percentage point improvement](https://developer.chrome.com/docs/modern-web-guidance/get-started#how_is_accuracy_ensured) in adherence to modern best practices when agents run with it installed.

---

## How to Install Modern Web Guidance

The universal path (works with any agent):

```sh
npx modern-web-guidance@latest install
```

This runs an interactive wizard that detects your coding agent, asks which skill packs you want, and drops the <VPIcon icon="fa-brands fa-markdown"/>`SKILL.md` file in the correct location automatically. The CLI is fully offline and self-contained: no external dependencies and no API keys.

Claude Code:

```sh
#1. Add the marketplace /plugin marketplace add GoogleChrome/modern-web-guidance

#2. Install the plugin
/plugin install modern-web-guidance@googlechrome

#3. Reload plugins
/reload-plugins
```

After installation, verify that .claude/skills/ exists in your project root and contains the skill file. That's where Claude Code reads skills from.

Cursor:

Modern Web Guidance is listed in the Skill Marketplace.

`Search for modern-web-guidance and click Install, no CLI step required.`

GitHub Copilot CLI:

```sh
# 1. Add the marketplace /plugin marketplace add GoogleChrome/modern-web-guidance

# 2. Install the plugin
/plugin install modern-web-guidance@googlechrome
```

Vercel Agent Skills:

```sh
npx skills add GoogleChrome/modern-web-guidance
```

Google Antigravity:

One-click install available directly inside the app.

---

## After Installing Modern Web Guidance: What Actually Changes

[Earlier](#why-do-ai-agents-default-to-legacy-patterns), we saw the outputs for the prompts on both the Tooltip and Toast Notification components when Modern Web Guidance was not installed. Run the same prompts with Modern Web Guidance installed and the agent reaches for entirely different tools.

### After: Tooltip Component

With Modern Web Guidance, the same tooltip prompt produces no JavaScript at all. Instead, the agent reaches for two APIs working together: `popover="hint"` for native hover/focus-triggered visibility, and `interestfor` (the Interest Invokers API) to wire the trigger to its target declaratively in HTML.

```html
<!-- ✅ After MWG — declarative HTML, zero JavaScript -->
<div class="tooltip-wrapper">
  <button
    id="btn-deploy"
    class="btn-trigger"
    interestfor="tooltip-deploy"
  >
    Deploy App
  </button>
  <div popover="hint" id="tooltip-deploy" class="tooltip-content">
    Instantly push code changes live
  </div>
</div>
```

```css
/* Anchor positioning wires layout to the trigger */
#btn-deploy {
  anchor-name: --tooltip-deploy;
}

#tooltip-deploy {
  position-anchor: --tooltip-deploy;
}

.tooltip-content[popover] {
  position: absolute;
  bottom: anchor(top);
  left: anchor(center);
  transform: translateX(-50%) translateY(8px);

  opacity: 0;
  transition: opacity 0.2s ease,
              display 0.2s allow-discrete,
              overlay 0.2s allow-discrete;
}

.tooltip-content[popover]:popover-open {
  opacity: 1;
  transform: translateX(-50%) translateY(-12px);
}

@starting-style {
  .tooltip-content[popover]:popover-open {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
}
```

The `js-hidden` class is gone. The `dismissAllTooltips()` function is gone. The `touchstart` handler is gone. The click-outside detection is gone.

`popover="hint"` provides light-dismiss behavior natively, the browser handles hover intent, focus management, Escape-to-dismiss, and touch semantics without a line of JavaScript. `@starting-style` defines the entry animation state, and `allow-discrete` handles the exit, so both directions of the transition are owned entirely by CSS.

::: note Browser compatibility note

The Interest Invokers API (`interestfor`) is currently available in Chrome with a flag and has a polyfill at `unpkg.com/interestfor`. CSS Anchor Positioning is Baseline 2025. The agent also included polyfill loading in the output. Check [<VPIcon icon="iconfont icon-caniuse"/>caniuse.com/css-anchor-positioning](https://caniuse.com/css-anchor-positioning) and assess against your browser support requirements before shipping.

:::

::: note One thing worth knowing

of the two APIs here, CSS Anchor Positioning is already shipping in stable browsers, while `interestfor` is the more experimental one. The polyfill covers it, but think of it as a preview of where the platform is heading rather than something you would ship to production today without testing.

:::

### After: Toast Notification with Exit Animation

The same toast prompt with Modern Web Guidance produces a `popover="manual"` element instead of a class-toggled `<div>`. The browser's Top Layer handles rendering and stacking context natively.

```js
// ✅ After MWG — the browser handles show/hide; JS handles auto-dismiss timing only
const createToast = (type) => {
  const toast = document.createElement('div');
  toast.setAttribute('popover', 'manual');
  toast.className = `toast toast-${type}`;

  toast.innerHTML = `
    <div class="toast-icon">...</div>
    <div class="toast-content">...</div>
    <button
      popovertarget="${toastId}"
      popovertargetaction="hide"
      class="toast-close"
      aria-label="Dismiss notification"
    >&times;</button>
  `;

  container.appendChild(toast);
  toast.showPopover(); // triggers @starting-style entry animation natively

  // Auto-dismiss
  const autoDismissTimer = setTimeout(() => {
    if (toast.matches(':popover-open')) toast.hidePopover();
  }, 4000);

  // Remove from DOM after exit transition completes
  toast.addEventListener('beforetoggle', (event) => {
    if (event.newState === 'closed') {
      clearTimeout(autoDismissTimer);
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
      setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500); // fallback
    }
  });
};
```

```css
/* ✅ CSS owns both entry and exit animation */
.toast[popover] {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
  transition: opacity 0.3s ease,
              transform 0.3s ease,
              display 0.3s allow-discrete,
              overlay 0.3s allow-discrete;
}

.toast[popover]:popover-open {
  opacity: 1;
  transform: translateX(0) scale(1);
}

@starting-style {
  .toast[popover]:popover-open {
    opacity: 0;
    transform: translateX(60px) scale(0.95);
  }
}
```

The manual close button now uses `popovertarget` and `popovertargetaction="hide"`, a declarative HTML binding that requires no click handler. `showPopover()` triggers the `@starting-style` entry animation natively. `hidePopover()` triggers the CSS exit transition via `allow-discrete`.

JavaScript is now responsible for only two things: scheduling the auto-dismiss timeout and removing the element from the DOM after the exit transition completes. The animation coordination that previously required `transitionend` listeners, CSS class toggling, and synchronized timing is gone, as the browser owns it.

---

## What Modern Web Guidance Does Not Handle for You

Modern Web Guidance shifts what the agent writes on a first attempt. It doesn't eliminate the need for code review, and in practice two friction points come up consistently.

### 1. The Bleeding-edge Cliff

Modern Web Guidance defaults to the newest Baseline features. `@starting-style`, `transition-behavior: allow-discrete`, CSS Anchor Positioning, and the Interest Invokers API are all correct, but some are new enough that they require polyfills for production use today. The agent will include those polyfill imports in its output.

You still need to verify the features used against your actual browser support requirements. A junior developer reading `interestfor` or `position-anchor` for the first time will need to look these up, because Modern Web Guidance assumes you want the most modern correct answer, not the most familiar one.

### 2. The CSS Encapsulation Trade-off

When Modern Web Guidance guides the agent toward moving inline styles or `dangerouslySetInnerHTML` keyframes into a global stylesheet, which it does for security and hydration reasons, it breaks component-level encapsulation. Delete the component later and you'll have orphaned CSS in your global file. The call is architecturally correct, but you still need to namespace those classes and track the dependency manually.

The 37-point improvement in best-practice adherence is real, but Modern Web Guidance is better understood as raising the default ceiling and not removing the need for human judgment. Think of it as giving your agent the habits of a developer who stays updated by actually reading current web docs.

---

## Conclusion

The problem was never that AI coding agents were bad at web development. The problem is that they were working from an outdated picture of the platform, one shaped by training data that reflects the early 2020s web more than the browser capabilities available today.

Modern Web Guidance updates that picture. The tooltip before/after alone tells the whole story: the agent went from a `js-hidden` state machine with touch handlers and click-outside detection to two HTML attributes and a block of CSS. The JavaScript interaction layer didn't get refactored, it became unnecessary.

The code your agent writes is only as current as what it was trained on. Modern Web Guidance closes that gap.

I ran this exact experiment on my own project. You can read the full case study with raw diffs at [<VPIcon icon="fas fa-globe"/>ophyboamah.com/blog](https://ophyboamah.com/blog/i-installed-modern-web-guidance-in-my-projects-heres-what-actually-changed).

::: info

Here are some helpful resources:

```component VPCard
{
  "title": "Modern Web Guidance  |  Chrome for Developers",
  "desc": "Guidance on how to build for the modern web.",
  "link": "https://developer.chrome.com/docs/modern-web-guidance?hl=en",
  "logo": "https://gstatic.com/devrel-devsite/prod/v5c6c2ba835e8720a8eaa6bc4810fa5cab5cbf351b6cee9f9510467b6e0c34519/chrome/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

<VidStack src="youtube/bo3i0FzDUYo" />

- [Modern Web Guidance open-source (<VPIcon icon="iconfont icon-github"/>`GoogleChrome/modern-web-guidance`)](https://github.com/GoogleChrome/modern-web-guidance) (open to contributions)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Stop Your AI Coding Agent from Writing Outdated Code with Modern Web Guidance",
  "desc": "AI coding agents can save developers a lot of time – that is, until you open the output and realize they've written code like it's 2019. Ask an agent to build a tooltip, for example. The HTML looks po",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-your-ai-coding-agent-from-writing-outdated-code-with-modern-web-guidance.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
