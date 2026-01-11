---
lang: en-US
title: "The Missing Link for Web Components"
description: "Article(s) > The Missing Link for Web Components"
icon: iconfont icon-storybook
category:
  - Node.js
  - Storybook.js
  - Lit
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - storybook
  - storybookjs
  - storybook-js
  - lit
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Missing Link for Web Components"
    - property: og:description
      content: "The Missing Link for Web Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-missing-link-for-web-components.html
prev: /programming/js-storybook/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Florian Geierstanger
    url : https://frontendmasters.com/blog/author/floriangeierstanger/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8268
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Storybook > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-storybook/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Lit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-lit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Missing Link for Web Components"
  desc="If your project uses web components of your own making, you could be auto-generating a Custom Elements Manifest that can be ultra-helpful, like powering a VS Code language server. "
  url="https://frontendmasters.com/blog/the-missing-link-for-web-components/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8268"/>

Last year I was mainly working in a component library. I noticed that we had *a lot* of duplicated code.

Every component defines its properties, events and slots, their types, whether they are required or not, plus a lot of [<VPIcon icon="fas fa-globe"/>JSDoc annotations](https://jsdoc.app/about-getting-started). This is repeated for [<VPIcon icon="iconfont icon-storybook"/>Storybook](https://storybook.js.org/), to inform the controls of the Storybook UI, for example to switch from the primary to the secondary variant of a button.

Then we need a template, where you wire these controls to the attributes of the component. A similar template is present in both unit and end-to-end tests. And another template for [<VPIcon icon="fa-brands fa-figma"/>Figma Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect), which maps a component in Figma to the actual web component code. Naturally this can get out of sync far too easily. And since the codebase had already gone through a lot of hands for years, we had a lot of outdated Storybook files, properties that no longer existed but in test file templates etc. (For the particular Storybook sync problem, there was even an add-on, but since the [<VPIcon icon="fas fa-globe"/>StencilJS](https://stenciljs.com/) community is not huge, we wondered how well this would be maintained in the future).

What if there was a solution to all of the problems above?

Even better if it could be used across all web component frameworks, and thus maintained and improved by a much larger community. Enter the [Custom Elements Manifest (<VPIcon icon="iconfont icon-github" />`webcomponents/custom-elements-manifest`)](https://github.com/webcomponents/custom-elements-manifest). This is the missing link to connect the tooling in a web components project, enable more automation and much improve the developer experience.

I’ll use the [custom-elements-manifest-demo repository (<VPIcon icon="iconfont icon-github" />`fgeierst/custom-elements-manifest-demo`)](https://github.com/fgeierst/custom-elements-manifest-demo) to show how to set up the different parts and how to use them.

---

## Scaffold a New Lit project with a Button Component

First, we scaffold a new [<VPIcon icon="lit"/>Lit](https://lit.dev/) project:

```sh
pnpm create vite
```

In the CLI dialog, pick “Select a framework: Lit”. Our example project will start with a single component: `touch src/my-button/my-button.ts`

```ts
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-button")
export class MyButton extends LitElement {
  /**
   * The button variant style.
   */
  @property()
  variant: "primary" | "secondary" = "primary";

  render() {
    return html`<button part="button" class=${this.variant}>
      <slot></slot>
    </button>`;
  }

  static styles = css` button {
    }
  `;
}`
```

The button has a default slot and a variant property that can be either primary or secondary.

---

## Create the Manifest JSON

You can imagine [the Custom Elements Manifest like a detailed table of contents (<VPIcon icon="iconfont icon-github" />`webcomponents/custom-elements-manifest`)](https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.d.ts#L264) for the entire project. Every component has its entry, complete with all attributes, and other meta data like default values, available options and textual descriptions.

Here’s the beginning of a <VPIcon icon="iconfont icon-json"/>`custom-elements.json` file about our new button:

```json title="custom-element.json"
{
  "schemaVersion": "1.0.0",
  "modules": [
    {
      "path": "src/my-button/my-button.ts",
      "declarations": [
        {
          "name": "MyButton",
          "tagName": "my-button",
          "customElement": true
          "attributes": [
            {
              "name": "variant",
              "type": { "text": "\"primary\" | \"secondary\"" },
              "default": "\"primary\"",
              "description": "The button variant style."
```

Luckily we don’t need to gather all of this information *by hand*. Instead, there is a tool that walks all files in a project, parses out the useful bits and compiles it to a JSON file.

First we need to install the [<VPIcon icon="fas fa-globe"/>Custom Elements Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/):

pnpm add -D @custom-elements-manifest/analyzer

The analyzer comes with built-in configuration for common web component frameworks, like Lit, StencilJS or Fast, but you can also roll your own. Let’s add an entry to the package.json scripts:

```json{2} title="package.json"
  "scripts": {
    "analyze": "cem analyze --litelement --globs \"src/**/*.ts\"",
```

Now lets run the analyzer `pnpm analyze` and it writes custom-elements.json to disk.

---

## Auto-Generate the Storybook Stories File

Having the manifest, we can make our first use of it. As we will see, it can do most of the configuration part of a .stories file for us. Let’s install Storybook first:

```sh
pnpm create storybook@latest
```

Then we need some initial wiring between Storybook and the manifest file. We will use a helper tool for that: 

```sh
pnpm i -D @wc-toolkit/storybook-helpers
```

Add the following to our existing. <VPIcon icon="fas fa-folder-open"/>`storybook/`<VPIcon icon="iconfont icon-typescript"/>`preview.ts`:

```ts title="storybook/preview.ts"
import { setCustomElementsManifest } from "@storybook/web-components-vite";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import { withActions } from 'storybook/actions/decorator';
import manifest from "../custom-elements.json" with { type: "json" };

setCustomElementsManifest(manifest); // (1)
setStorybookHelpersConfig({  hideArgRef: true, }); // (2)

const preview: Preview = {
  // existing config here
  tags: ['autodocs'], // (3)
  decorators: [withActions], // (4)
}
```

The first function call **(1)** makes our manifest available as a global in all stories files. The second **(2)** configures the helpers that we will use in the next step. Autodocs **(3)** adds a auto generated Docs page for each stories file, which includes a table with the component API definition and a preview for each story. The withActions decorator **(4)** is needed to display events that our component emits in Storybook’s Actions panel.

Now let’s create a stories file for our button:

```sh
touch src/my-button/my-button.stories.ts.
```

```ts title="my-button/my-button.stories.ts"
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./my-button";
import type { MyButton } from "./my-button";

export const { events, args, argTypes, template } =
  getStorybookHelpers<MyButton>("my-button");

const meta = {
  title: "Components/Button",
  component: "my-button",
  argTypes,
  args: { ...args, "default-slot": "Click me" },
  render: (args) => template(args),
  parameters: { actions: { handles: events } },
} as Meta<MyButton>;

export default meta;
export const Primary: StoryObj<MyButton> = {};
```

If you are familiar with typical stories files, you will notice that this one is very succinct. We can infer events, args, argTypes and even the template from the manifest data.

Now lets run Storybook.

```sh
pnpm storybook
```

![Screenshot of a Storybook interface displaying documentation for a custom button component, including sections for attributes and slots.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/image6.png?resize=1024%2C726&ssl=1)

Notice how this documents the interface of the component extensively. We see the attribute and the default slot, each with description and even the options “primary” and “secondary”. Also the controls are fully functional.

---

## Get Editor Support with the VSCode Language Server

Another application for the manifest file is editor support. First, we install [the Web Components Language Server extension for VSCode (<VPIcon icon="iconfont icon-vscode"/>`wc-toolkit.web-components-language-server`)](https://marketplace.visualstudio.com/items?itemName=wc-toolkit.web-components-language-server). To see it in action we add a new story, where we write the template ourselves:

```ts title="my-button/my-button.stories.ts"
// ...existing code

export const Variants: StoryObj<MyButton> = {
  render: () => `
    <my-button variant="primary">Primary</my-button>
    <my-button variant="">Secondary</my-button>
  `,
};`
```

Hovering over reveals a lot of useful IntelliSense information.

![A code snippet displaying the render function of a custom button component in a web development context, featuring two button instances with different variant attributes, and documentation about the component's attributes, events, and slots.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/image5.png?resize=1024%2C607&ssl=1)

Hitting <kbd>Ctrl</kbd>+<kbd>Space</kbd> shows the available options for the variant attribute.

![Code snippet demonstrating the render function for a button component in a web development context, showcasing options for the 'variant' attribute.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/image3.png?resize=1024%2C203&ssl=1)

---

## Ground Copilot with the MCP server

Wouldn’t it be nice if GitHub copilot had the same information? For this, we enable [<VPIcon icon="fas fa-globe"/>the MCP server](https://wc-toolkit.com/integrations/vscode/#model-context-protocol-mcp-server) that is part of the language server extension.

```json title="~/Library/Application Support/Code/User/settings.json"
// ...existing configuration

  "wctools.mcp.enabled": true,
```

Now we can ask the AI agent about our web components by @-mentioning the MCP server.

![A screenshot showing the description of a custom button component called 'my-button', including its attributes, properties, and events.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/image1.png?resize=848%2C1024&ssl=1)

While this seems trivial in this example, it helps to ground the LLM and makes it less likely to hallucinate components or properties.

---

## Ensure Components are Used Correctly with the Web Components Linter

But what if you already have a lot of code and want to make sure the components are used correctly. This is where the [<VPIcon icon="fas fa-globe"/>Web Component Linter](https://wc-toolkit.com/integrations/wctools/) into play. Install it with:

```sh
pnpm add @wc-toolkit/wctools
```

```json{3} title="package.json"
"scripts": {  
  // ...existing scripts 
  "lint": "wctools validate"
```

Running this…

```sh
pnpm lint
```

… checks the entire codebase against what is written in manifest. If my AI agent had invented a tertiary variant that does not exist `<my-button variant="tertiary">Tertiary</my-button>` the linter would catch it.

![Error message displayed in a terminal window indicating a validation issue with a web component, specifically that 'tertiary' is not a valid value for the 'variant' attribute.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/image4.png?resize=1024%2C273&ssl=1)

Note that the naming here is a bit confusing, there is also the [<VPIcon icon="fas fa-globe"/>CEM Validator](https://wc-toolkit.com/cem-utilities/cem-validator/), which looks at the manifest file itself.

---

## Future Ideas

Looking at the future, I think there is a lot more that we could do with the Custom Elements Manifest! Component tests need a template, so why not use a helper that generates these, similar to the one for Storybook? Same for Figma Code Connect files.

::: info Recommended Podcasts

<SiteInfo
  name="🎙️ Rage Coding, Headless Web Components, and the Future of DX with Burton Smith - Podcast Awesome "
  desc="Have you ever rage-coded your way into building a developer tool that actually fixes things? Burton Smith has. And we’re here for it.In this episode of Podcast Awesome, Matt and Web Awesome's boss, Cory Laviska chat with Burton Smith. Burton is an..."
  url="https://buzzsprout.com/2092855/episodes/17732733-rage-coding-headless-web-components-and-the-future-of-dx-with-burton-smith/"
  logo="https://buzzsprout.com/favicon.ico"
  preview="https://buzzsprout.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCQkwySHdrPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--65023e02b035bd00e71724263e13aca7278c2234/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9MWm05eWJXRjBPZ2hxY0djNkUzSmxjMmw2WlY5MGIxOW1hV3hzV3docEFmcHBBZnA3QmpvSlkzSnZjRG9MWTJWdWRISmxPZ3B6WVhabGNuc0dPZ3h4ZFdGc2FYUjVhVUU2RUdOdmJHOTFjbk53WVdObFNTSUpjM0puWWdZNkJrVlUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--bfdad5b04912fa8a9db85eb3989e46c5908e2723/Episode%20Art%20(4).png"/>

<SiteInfo
  name="692: Killer Feature of Web Components, Skills > MCP, and Streaming HTML?"
  desc="Dave has famous people blindness, a cologne life hack is dropped, what is the killer feature of web components, MCPs are so done—focus on skills instead, should custom events exist, and thoughts ab…"
  url="https://shoptalkshow.com/692"
  logo="https://shoptalkshow.com/favicon.svg"
  preview="https://i0.wp.com/shoptalkshow.com/wp-content/uploads/2013/03/logo-itunes-1400.png?fit=1200%2C1200&ssl=1"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Missing Link for Web Components",
  "desc": "If your project uses web components of your own making, you could be auto-generating a Custom Elements Manifest that can be ultra-helpful, like powering a VS Code language server. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-missing-link-for-web-components.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
