---
lang: en-US
title: "AI-Generated UI Is Inaccessible by Default"
description: "Article(s) > AI-Generated UI Is Inaccessible by Default"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > AI-Generated UI Is Inaccessible by Default"
    - property: og:description
      content: "AI-Generated UI Is Inaccessible by Default"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/ai-generated-ui-is-inaccessible-by-default.html
prev: /programming/js-react/articles/README.md
date: 2026-04-13
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://frontendmasters.com/blog/author/durgesh/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9221
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="AI-Generated UI Is Inaccessible by Default"
  desc="It doesn't mean you can't get AI to help with accessible code, you've just got to know what you're doing."
  url="https://frontendmasters.com/blog/ai-generated-ui-is-inaccessible-by-default/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9221"/>

**A five-layer enforcement system for semantic correctness in LLM-generated React components**

These days, an AI code-generation tool (e.g., Claude Code, Codex, Cursor) can produce a React sidebar component in 8 seconds. It *looks* correct: smooth hover states, rotating chevrons, harmonious spacing. But take a look at the browser’s accessibility tree in DevTools. Chances are the root side element tree receives: role `generic`, name `none`, focusable `false`. For screen reader users, keyboard navigators, and voice control users, the component effectively doesn’t exist.

This happens because most LLMs optimize for visual output while generating near-zero semantic information for the layer that assistive technologies actually read. This article explains the architectural reasons and presents a five-layer enforcement system of prompt constraints. These include static analysis, runtime testing, CI integration, and accessible component abstractions that make semantic correctness automatic rather than aspirational. The examples use React and Tailwind because that’s what most AI tools emit, but the accessibility tree doesn’t care about your framework. It cares about the DOM it receives.

::: note A caveat

The landscape is not monolithic. Specialized tools like Vercel’s [<VPIcon icon="iconfont icon-v0"/>v0](https://v0.app/) have begun hardcoding accessible primitives into their generation pipelines v0 outputs [<VPIcon icon="iconfont icon-shadcn"/>`shadcn/ui`](https://ui.shadcn.com/) components built on Radix, which means its output inherits Radix’s accessibility contracts by default.

:::

This is the right architectural approach, and it’s encouraging. But v0 is the exception. The general-purpose tools that most developers use daily, like ChatGPT, Claude, Copilot, and Cursor, still produce the `<div>` soup this article dissects. And even v0’s output benefits from the verification layers described here, because no generation pipeline eliminates the need to confirm that what is shipped actually works.

---

## The Problem, Demonstrated

Here is a navigation sidebar representative of what general-purpose AI code generation tools produce. I’ve tested variations of this prompt across multiple tools; the structural patterns are consistent.

<CodePen
  user="anon"
  slug-hash="ogzGxjX"
  title="“AI-Generated Sidebar — Inaccessible Version”"
  :default-tab="['css','result']"
  :theme="dark"/>

The browser’s accessibility tree for this component

```plaintext
group  
  text "Settings"  
  group  
    group  
      text "Account"  
      image (no accessible name)  
    group  
      text "Profile"  
      text "Security"
```

::: info What’s broken:

1. **No landmark.** The outer `<div>` produces no navigation role. Screen reader users can’t jump to this section via landmark navigation.
2. **No heading.** “Settings” is a styled `<div>`, not an `<h2>`. Navigation by heading will never find it.
3. **No list structure.** The items aren’t in `<ul>`/`<li>`. No “list, 2 items” context.
4. **Wrong role on the toggle.** The Account `<div>` maps to `generic`. Not announced as interactive.
5. **Not focusable.** `<div>` elements aren’t in the tab order. Keyboard users can’t reach the toggle.
6. **No expanded/collapsed state.** No `aria-expanded`. The chevron rotation is visual-only.
7. **No control relationship.** No `aria-controls` linking the trigger to the panel.
8. **No keyboard interaction.** No `onKeyDown`. Even if focused, Enter and Space do nothing.
9. **Unlabeled icon.** The SVG lacks both `aria-hidden` and an accessible name.
10. **Fake links.** Profile and Security are `<div>` elements with click handlers. No `link` role, not focusable, can’t be opened in a new tab.

:::

Ten distinct failures in twenty-nine lines. The exact count matters less than the density: nearly every element is semantically wrong, and the failures compound. A screen reader user encountering this hears flat, unstructured text with no affordance for interaction.

In my testing across several tools over the past two months, this pattern was pervasive. `<div onClick>` instead of `<button>` or `<a>` appeared in the vast majority of interactive components. Missing ARIA state attributes were nearly universal. Keyboard handling was absent from almost every custom control. Landmarks were missing from most layouts. Icons shipped without text alternatives more often than not

General-purpose AI tools are improving some recent model versions generate better semantic HTML than they did six months ago, and some are beginning to incorporate accessibility-aware system prompts. But improvement is inconsistent, and the default output remains inaccessible enough to require systematic enforcement.

---

## Why This Happens: The Accessibility Tree

When the browser receives your HTML and CSS, it builds two primary representations. The **render tree** (derived from the DOM and CSSOM) determines what gets painted to the screen: layout, color, typography, hover states, and transitions. This is the visual layer, and it’s the one AI-generated code handles well.

But the browser also constructs a separate, parallel structure: the **Accessibility Tree**. This is a filtered, semantically-enriched representation of the DOM, built according to the [<VPIcon icon="iconfont icon-w3c"/>WAI-ARIA](https://w3.org/TR/wai-aria-1.2/), [<VPIcon icon="iconfont icon-w3c"/>HTML-AAM](https://w3.org/TR/html-aam-1.0/), and [<VPIcon icon="iconfont icon-w3c"/>Core AAM](https://w3.org/TR/core-aam-1.2/) specifications. When a screen reader traverses a page, it reads this tree, not the DOM, not the render tree. Each node has four properties:

- **Role**: What is this thing? (`button`, `link`, `navigation`, `tab`)
- **Name**: What is it called? (computed from text content, `aria-label`, `alt`)
- **State**: What condition is it in? (`expanded`, `selected`, `checked`, `disabled`)
- **Value**: What data does it hold? (input value, progress value)

The render tree and the accessibility tree are built from the same DOM, but they serve different consumers and extract different information. The render tree cares about `cursor-pointer` and `hover:bg-gray-800`. The accessibility tree cares about `<button>`, `aria-expanded`, and `aria-controls`. CSS can make a `<div>` *look* like a button. Only HTML semantics can make it *be* one.

```html
<button>Account</button>
<!--
  role: button | name: "Account" | focusable: true | activation: Enter, Space
-->
```

```html
<div onClick={handleClick}>Account</div>
<!--
  ​​role: generic | name: none | focusable: false | activation: none
-->
```

Same pixels. One is a door. The other is a painting of a door.

---

## Why AI Gets This Wrong

The exact mechanisms are difficult to isolate empirically, but several plausible factors explain the consistent bias:

- **Training data**: Most React code on GitHub uses `<div>` elements with CSS classes. Semantic HTML and ARIA are underrepresented, which likely means they’re underrepresented in training corpora.
- **Feedback loops**: When developers and RLHF evaluators assess AI output, they almost certainly evaluate visually. The feedback signal reinforces visual fidelity without penalizing semantic failures.
- **Token economics**: `<div onClick={fn}>` is fewer tokens than `<button type="button" aria-expanded={isOpen} aria-controls="panel-id">`. Absent specific constraints, the model has no incentive to spend extra tokens.
- **No AOM model**: The model has no representation of the accessibility tree. It models what code *looks like*, not what code *means* to assistive technologies.

These are informed hypotheses. But the pattern they predict high visual fidelity, near-zero semantic fidelity, matches what I observe consistently.

Understanding this makes the fix clear: you need to enforce semantic correctness at every stage where it could be lost.

---

## Layer 1: Prompt Constraints

An unconstrained prompt produces unconstrained output. The model converges on its statistical default `<div>` soup. A constrained prompt narrows the output space to semantically valid components.

**This prompt should not be typed manually each time.** Bake it into your workspace context: Cursor reads a `.cursorrules` file from your project root. GitHub Copilot supports <VPIcon icon="fas fa-folder-open"/>`.github/`<VPIcon icon="fa-brands fa-markdown"/>`copilot-instructions.md`. Other tools have similar mechanisms. The prompt below belongs in one of those files, applied automatically to every generation. If your tool doesn’t support persistent context, you have a stronger argument for investing in Layers 2 5. \# Component Generation Rules  
  
You are generating a React component. Follow these rules strictly.  

```md title=".github/copilot-instructions.md"
## HTML Semantics  
- Use <button> for actions. Never <div onClick> or <span onClick>.  
- Use <a href="..."> for navigation. Never <span onClick={navigate}>.  
- Use <nav>, <main>, <aside>, <header>, <footer> for landmarks.  
- Use <h1>-<h6> in correct hierarchical order. Do not skip levels.  
- Use <ul>/<ol> with <li> for lists.  
- Use <table>, <thead>, <tbody>, <th>, <td> for tabular data.  
- Use <form>, <fieldset>, <legend>, <label> for forms.  
- Use <dialog> for modal dialogs with its showModal() API.  
- Use <details>/<summary> for simple disclosures when appropriate.  
  
## Accessibility  
- Every interactive element must have an accessible name   
  (visible text, aria-label, or aria-labelledby).  
- Every form input must have an associated <label> or aria-label.  
- Icon-only buttons: aria-label on button, aria-hidden on icon.  
- Decorative images: alt="" or aria-hidden="true".  
- Dynamic state: use aria-expanded, aria-selected, aria-checked,   
  aria-current, aria-disabled as appropriate.  
- Use aria-live="polite" for status messages.  
- Use aria-describedby for help text and error messages.  
  
## Keyboard Interaction  
- All interactive elements must be keyboard accessible.  
- Use focus-visible styles. Never remove outlines without replacement.  
- Composite widgets: arrow keys per WAI-ARIA Authoring Practices.  
- Modals must trap focus and restore it on close.  
- Escape must close overlays.  
  
## Motion  
- Respect prefers-reduced-motion. Use motion-safe: or   
  motion-reduce: Tailwind variants on transitions involving   
  spatial movement (transforms, position changes, scaling).   
  Simple color transitions on hover/focus are acceptable   
  without motion guards.  
  
## Library Preferences  
- For complex patterns (tabs, combobox, dialog, listbox, menu),   
  use Headless UI, Radix UI, or React Aria instead of building   
  from scratch.  
- Use Tailwind CSS for styling.  
- Include focus-visible ring styles on all interactive elements.  
  
## Testing
- Query elements using getByRole with accessible name,   
  not getByTestId.
```

::: note

[<VPIcon icon="fas fa-globe"/>Here are some other ideas](https://ericwbailey.website/published/heres-how-to-instruct-a-llm-to-reference-the-aria-authoring-practices-guide/) for prompting from Eric Bailey.

:::

Here is the sidebar regenerated with these constraints:

<CodePen
  user="anon"
  slug-hash="ByLwKVx"
  title="AI-Generated Sidebar — Accessible Version"
  :default-tab="['css','result']"
  :theme="dark"/>

The accessibility tree:

```plaintext
navigation "Settings"   
    heading "Settings" (level 2)  
    list (2 items)  
     listitem  
        button "Account" (expanded)  
        region "Account"  
            list (2 items)  
              listitem  
                  link "Profile"   
              listitem  
                  link "Security"  
     listitem  
        button "Preferences" (collapsed)
```

Every element has a role, a name, and a state. None of this is React-specific; the same structure in plain HTML produces the same tree:

<CodePen
  user="anon"
  slug-hash="KwgXzbY"
  title="Accessible Sidebar (Semantic HTML Reference)"
  :default-tab="['css','result']"
  :theme="dark"/>

Same `<button>`, same `aria-expanded`, same `aria-controls`, same accessibility tree. The remaining examples use React because that’s where AI generation is most prevalent, but the principles have equivalents in every ecosystem (`eslint-plugin-vuejs-accessibility` for Vue, SvelteKit’s built-in a11y warnings, and axe-core works against any rendered DOM regardless of origin).

### When the Model Ignores Your Constraints

This happens regularly. Three strategies:

1. **Targeted follow-up**: Don’t regenerate from scratch. Prompt with a specific correction: *“The Account toggle is a div with onClick. Replace it with a button and add aria-expanded and aria-controls.”*
2. **Audit prompt**: After generation: *“Audit this component for WCAG 2.1 AA violations and fix all issues. Check for: interactive divs that should be buttons, missing aria-expanded/aria-controls, missing keyboard support, missing focus-visible styles.”* Models review code more reliably than they generate correct code from scratch.
3. **Manual checklist**: Before committing, are there interactive elements `<button>` or `<a>`? Do toggles have `aria-expanded`? Can you Tab to and activate every control? Do landmarks and headings exist? Do icons have `aria-hidden`? Two minutes.

When Layer 1 is weak or absent, inline Copilot suggestions and tab completions, where there’s no prompt to constrain Layers 2 through 5, become your primary defense. The system is designed for the reality that any individual layer might fail.

---

## Layer 2: Static Analysis

You can be checking your code directly with tools. A great option for the code we’re working with so far is [<VPIcon icon="iconfont icon-eslint"/>ESLint](https://eslint.org/) with the [<VPIcon icon="iconfont icon-github"/>`jsx-eslint/eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) plugin.

```sh
npm install --save-dev eslint-plugin-jsx-a11y
```

Here’s an example configuration that errors on issues we know are preventable through better code.

```js
export default [
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
    },
  },
];
```

Now when the AI generates poor code like `<div onClick>`, we’ll get an error message when calling this tool like:

```plaintext title="output"
error Visible, non-interactive elements with click handlers must have at least one keyboard listener jsx-a11y/click-events-have-key-events
```

With pre-commit hooks and CI enforcement, the code cannot ship.

Static analysis is fast and cheap, but it can only evaluate JSX structure; it can’t assess runtime behavior, dynamic state, or the actual accessibility tree.

---

## Layer 3: Runtime Testing

We can add another layer on top of static analysis: actual browser testing. A tool like [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/) can help here along with a plugin specifically for accessibility testing, [<VPIcon icon="fa-brands fa-npm"/>`@axe-core/playwright`](https://npmjs.com/package/@axe-core/playwright).

```sh
npm install --save-dev jest-axe @axe-core/playwright
```

Here’s an example test that mounts the actual components and tests things in a browser.

```js
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SettingsSidebar } from './SettingsSidebar';

expect.extend(toHaveNoViolations);

describe('SettingsSidebar', () => {
  it('has no axe violations in collapsed state', async () => {
    const { container } = render(<SettingsSidebar />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations in expanded state', async () => {
    const { container } = render(<SettingsSidebar />);
    await userEvent.setup().click(
      screen.getByRole('button', { name: /account/i })
    );

    // axe evaluates the DOM at a point in time. Scanning during
    // a React re-render or CSS transition can produce results 
    // against intermediate DOM states. Wait for it to settle.
    await waitFor(async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  it('supports full keyboard navigation', async () => {
    render(<SettingsSidebar />);
    const user = userEvent.setup();

    await user.tab();
    expect(
      screen.getByRole('button', { name: /account/i })
    ).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(
      screen.getByRole('button', { name: /account/i })
    ).toHaveAttribute('aria-expanded', 'true');

    await user.tab();
    expect(
      screen.getByRole('link', { name: /profile/i })
    ).toHaveFocus();
  });

  it('exposes correct roles and states', () => {
    render(<SettingsSidebar />);

    expect(
      screen.getByRole('navigation', { name: /settings/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /account/i })
    ).toHaveAttribute('aria-expanded', 'false');
  });
});
```

These tests query by **role** and **accessible name**. This is not a stylistic choice. If `getByRole('button', { name: /account/i })` fails, a screen reader can’t find that element either. The testing Library’s query API is itself an accessibility assertion.

### What axe-core Catches and What It Doesn’t

axe-core reliably detects missing ARIA attributes, invalid ARIA usage, missing form labels, missing text alternatives, many color contrast failures, incorrect role usage, and duplicate IDs. These are structural problems with deterministic answers, and axe is excellent at them.

It cannot assess whether your labels are *meaningful;* it checks that an `aria-label` exists, not that “click here” is useful. It cannot evaluate whether focus moves to the *right place* when a modal opens. It cannot catch mismatches between reading order and visual order, whether a live region fires at the right moment, voice control usability, or cognitive load.

axe-core confirms that the accessibility scaffolding is in place. It cannot confirm that the building is habitable. Manual testing with screen readers, VoiceOver, NVDA, and JAWS, remains necessary.

---

## Layer 4: CI Integration

Continuous Integration (CI) is a powerful place to test accessibility issues as it has real power. You can set it up such that Pull Requests (PRs) on the codebase cannot be merged unless the tests pass (like the tests we talked about above).

[<VPIcon icon="iconfont icon-github"/>GitHub Actions](https://docs.github.com/en/actions) isn’t the only option, but it’s very popular because GitHub itself is. Here is an example [<VPIcon icon="iconfont icon-github"/>workflow](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows) that runs our static-analysis linting and also includes a new browser test that loads the actual page and clicks things.

```yaml
name: Accessibility Checks
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - name: ESLint a11y rules
        run: npx eslint 'src/**/*.{ts,tsx}' --max-warnings 0

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - name: Component accessibility tests
        run: npx jest --testPathPattern='.test.'

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - name: Playwright axe audit
        run: npx playwright test --grep @a11y
```

And here’s an End-to-End test example (i.e. see how it visits actual URLs).

```js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('settings page passes axe audit @a11y', async ({ page }) => {
  await page.goto('/settings');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('sidebar keyboard navigation @a11y', async ({ page }) => {
  await page.goto('/settings');
  await page.keyboard.press('Tab');

  // Playwright locators are lazy-evaluated — :focus resolves to
  // whatever element has focus at assertion time, not capture time.
  const focused = page.locator(':focus');
  await expect(focused).toHaveRole('button');
  await expect(focused).toHaveAttribute('aria-expanded', 'false');

  await page.keyboard.press('Space');
  await expect(focused).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveRole('link');
});
```

---

## Layer 5: Accessible Component Abstractions

The deepest solution is architectural. Instead of relying on every prompt to produce correct primitives, use libraries that encode accessibility into their API contracts.

- [<VPIcon icon="fas fa-globe"/>Headless UI](https://headlessui.com/) provides roughly ten components designed for Tailwind Disclosure, Dialog, Listbox, Menu, and Tabs. Smallest API surface, gentlest learning curve, fastest integration. Its limitation is scope: if you need a pattern it doesn’t cover, you’re on your own. 
- [<VPIcon icon="fas fa-globe"/>Radix UI](https://radix-ui.com/) covers roughly thirty unstyled primitives with a composable component API the pragmatic middle ground for most projects. 
- [<VPIcon icon="fas fa-globe"/>React Aria](https://react-spectrum.adobe.com/react-aria/) from Adobe provides over forty hooks covering virtually every ARIA pattern, plus internationalization and virtual scrolling. It’s the right choice for teams building a design system. It’s overkill for adding an accessible dropdown to a CRUD app. The choice between them matters less than the decision to use *one of them* instead of letting AI build interactive primitives from `<div>` elements.

Here’s an example of using Headless UI (bringing Tailwind for styling).

```jsx :collapsed-lines
import { Disclosure } from '@headlessui/react';

function SettingsSidebar() {
  return (
    <nav aria-label="Settings" className="w-64 bg-gray-900 
                                          text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6 px-2">Settings</h2>
      
      <ul className="space-y-2 list-none" role="list">
        {sections.map(section => (
          <li key={section.id}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className="flex w-full items-center 
                               justify-between px-2 py-2 rounded-lg 
                               text-sm font-medium hover:bg-gray-800 
                               focus-visible:ring-2 
                               focus-visible:ring-blue-500
                               transition-colors"
                  >
                    {section.label}
                    <ChevronIcon
                      aria-hidden="true"
                      className={`w-4 h-4 
                                 motion-safe:transition-transform
                                 motion-safe:duration-200 ${
                                   open ? 'rotate-180' : ''
                                 }`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="ml-4 mt-1 space-y-1">
                    <ul className="list-none" role="list">
                      {section.links.map(link => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="block px-2 py-1.5 text-sm 
                                       text-gray-300 hover:text-white 
                                       hover:bg-gray-800 rounded 
                                       focus-visible:ring-2
                                       focus-visible:ring-blue-500
                                       transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </li>
        ))}
      </ul>
    </nav>
  );
}`
```

By using these components, the aria-expanded attribute, keyboard activation, and panel association are handled automatically. If we can prompt the AI to use these components and work this way, the AI’s job shrinks to visual composition. The accessibility is structural. There can be advantages to **decoupling the semantic layer from the visual layer.** We let battle-tested libraries own the semantics and let AI own the styling.

---

## Common AI Failure Patterns

Three additional patterns beyond the sidebar merit attention because they involve more complex accessibility requirements.

### The Invisible Modal

```jsx
{isOpen && (
  <div className="fixed inset-0 z-50 flex items-center 
                  justify-center bg-black/50">
    <div className="rounded-xl bg-white p-6 shadow-xl">
      <div className="text-lg font-bold">Confirm</div>
      <div className="mt-2">Are you sure?</div>
      <div className="mt-4 flex gap-2">
        <div className="cursor-pointer rounded bg-red-500 px-4 py-2 
                        text-white" onClick={onConfirm}>Yes</div>
        <div className="cursor-pointer rounded bg-gray-300 px-4 py-2" 
             onClick={onClose}>No</div>
      </div>
    </div>
  </div>
)}
```

Issues:

- No `role="dialog"`
- No `aria-modal`
- No label
- No focus trap
- No Escape handler
- No focus restoration

The native `<dialog>` element with `showModal()` provides focus trapping, Escape to close, `aria-modal`, and backdrop handling for free. Better:

```jsx
<dialog
  ref={dialogRef}
  className="rounded-xl bg-white p-6 shadow-xl backdrop:bg-black/50"
  aria-labelledby="dialog-title"
  onClose={onClose}
>
  <h2 id="dialog-title" className="text-lg font-bold">Confirm</h2>
  <p className="mt-2">Are you sure?</p>
  <div className="mt-4 flex gap-2">
    <button type="button"
            className="rounded bg-red-500 px-4 py-2 text-white 
                       hover:bg-red-600 focus-visible:ring-2 
                       focus-visible:ring-red-400"
            onClick={onConfirm}>Yes</button>
    <button type="button"
            className="rounded bg-gray-300 px-4 py-2 
                       hover:bg-gray-400 focus-visible:ring-2 
                       focus-visible:ring-gray-500"
            onClick={onClose}>No</button>
  </div>
</dialog>
```

::: note One caveat

Native `<dialog>` has mostly excellent support in modern browsers, but there are still edge cases, particularly around focus restoration in older WebKit versions and inconsistent aria-modal behavior across screen reader/browser combinations. Test with your target assistive technologies. For maximum cross-browser reliability, use Radix Dialog or Headless UI Dialog to handle these edge cases.

:::

### The Icon-Only Button

```jsx
<div className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
     onClick={onClose}>
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
       stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" 
          strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</div>
```

Issues:

- The `role` is `generic` instead of `button`
- Entirely empty name – invisible to assistive technology
- Unfocusable

Better to use the correct native elements and attributes to help with naming:

```jsx
<button type="button"
        aria-label="Close dialog"
        className="rounded-full p-2 hover:bg-gray-100 
                   focus-visible:ring-2 focus-visible:ring-blue-500"
        onClick={onClose}>
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" 
       fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" 
          strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
```

### The Custom Select

```jsx
<div className="relative">
  <div className="cursor-pointer rounded border px-3 py-2" 
       onClick={() => setIsOpen(!isOpen)}>
    {selected || 'Choose an option'}
  </div>
  {isOpen && (
    <div className="absolute mt-1 w-full rounded border bg-white 
                    shadow-lg">
      {options.map(opt => (
        <div key={opt} className="cursor-pointer px-3 py-2 
                                  hover:bg-blue-50"
             onClick={() => { setSelected(opt); setIsOpen(false); }}>
          {opt}
        </div>
      ))}
    </div>
  )}
</div>
```

Issues:

- No `listbox` role
- No `aria-expanded` attribute
- No `aria-selected` attribute
- No `aria-activedescendant` attribute
- No keyboard navigation

A correct implementation requires ~150 lines of keyboard management. My suggestion is to use a headless library:

```jsx
import { Listbox } from '@headlessui/react';

<Listbox value={selected} onChange={setSelected}>
  <Listbox.Label className="block text-sm font-medium text-gray-700">
    Choose an option
  </Listbox.Label>
  <div className="relative mt-1">
    <Listbox.Button className="relative w-full cursor-pointer rounded 
                               border bg-white py-2 pl-3 pr-10 
                               text-left focus-visible:ring-2 
                               focus-visible:ring-blue-500">
      {selected || 'Select...'}
    </Listbox.Button>
    <Listbox.Options className="absolute mt-1 w-full rounded border 
                                bg-white shadow-lg">
      {options.map(opt => (
        <Listbox.Option
          key={opt}
          value={opt}
          className={({ active }) =>
            `cursor-pointer px-3 py-2 ${
              active ? 'bg-blue-50 text-blue-900' : ''
            }`
          }
        >
          {opt}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </div>
</Listbox>`
```

### Color Contrast Failures

Color contrast is the single most common WCAG failure on the web, and AI regularly generates insufficient contrast, particularly for placeholder text, disabled states, and text over colored backgrounds. The axe-core integration in Layers 3 and 4 automatically catches most contrast violations.

### Motion Sensitivity Failures

Some of those code examples above use  [<VPIcon icon="iconfont icon-tailwindcss"/>`motion-safe` classes (from Tailwind)](https://tailwindcss.com/docs/animation#supporting-reduced-motion) on the chevron rotation, but don’t use them on the `transition-colors` for buttons and links. The distinction: `prefers-reduced-motion` media queries best address spatial movement, transforms, position changes, and scaling. Simple color transitions don’t involve spatial movement and are generally safe. If your component includes sliding panels, expanding animations, or transform-based transitions, you should use `prefers-reduced-motion` media queries (or the special Tailwind classes that help) to reduce or remove that movement.

---

## Costs and Limits

Adding accessibility constraints to AI-generated components adds **3-8 minutes** per component:

- Workspace config setup (once)
- ARIA review
- Keyboard verification
- Then: Iteration when the constraints are ignored

Comparing this to remediation after the fact is much more efficient. Discovering issues via audit, diagnosing root causes, refactoring the DOM, adding ARIA, implementing keyboard handlers, and writing tests take about **45-90 minutes** per component.

The five layers overlap deliberately. axe-core in a component test and axe-core in Playwright catch many of the same violations. Combined automated coverage is probably 70-85% of real-world issues. The rest of the meaningful labels, correct focus logic, live region timing, reading order, and cognitive load require manual testing with real assistive technologies and real users.

Some AI tools are actively building accessibility into their pipelines. v0’s approach, generating Radix-based components by default, is the strongest example: it solves the problem architecturally by never generating raw `<div>` interactives in the first place. As more tools adopt similar approaches, the severity of the problem described here will diminish. But even the best generation pipeline benefits from verification, and the enforcement system described here provides exactly that: proof, on every commit, that shipped code works.

The two highest-leverage interventions are `eslint-plugin-jsx-a11y` set to `error` in CI and an architectural decision to use Headless UI, Radix, or React Aria for interactive components. They prevent more failures than any amount of prompt engineering because they work regardless of which AI tool generated the code, whether a prompt was involved, or whether the developer thought about accessibility at all. Everything else is refinement on that foundation.

The accessibility tree reflects whatever DOM you give it. Make it good.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "AI-Generated UI Is Inaccessible by Default",
  "desc": "It doesn't mean you can't get AI to help with accessible code, you've just got to know what you're doing.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/ai-generated-ui-is-inaccessible-by-default.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
