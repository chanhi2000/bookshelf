---
lang: en-US
title: "How to Use React 19 in Power Apps PCF Components"
description: "Article(s) > How to Use React 19 in Power Apps PCF Components"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use React 19 in Power Apps PCF Components"
    - property: og:description
      content: "How to Use React 19 in Power Apps PCF Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-react-19-in-pcf-components.html
prev: /programming/js-react/articles/README.md
date: 2025-05-23
isOriginal: false
author:
  - name: Brandon Wozniewicz
    url : https://freecodecamp.org/news/author/scriptedBytes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747861011004/173ecdcd-7bca-4c4f-967b-47616bd79a06.png
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

[[toc]]

---

<SiteInfo
  name="How to Use React 19 in Power Apps PCF Components"
  desc="The Power Apps Component Framework - PCF for short - lets you create complex custom components using traditional web development tools like HTML, CSS, and JavaScript. When creating a new PCF project, you can choose from two types of controls: standar..."
  url="https://freecodecamp.org/news/how-to-use-react-19-in-pcf-components"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747861011004/173ecdcd-7bca-4c4f-967b-47616bd79a06.png"/>

The Power Apps Component Framework - PCF for short - lets you create complex custom components using traditional web development tools like HTML, CSS, and JavaScript.

When creating a new PCF project, you can choose from two types of controls: **standard controls** and **React virtual controls**. For non-trivial components, React is often a good choice because it abstracts away much of the heavy DOM manipulation. But, when you’re using React with PCF, you’re currently limited to React 16 in Canvas apps and React 17 in Model-Driven apps.

That doesn’t mean you *can’t* use a newer version - but doing so means opting out of virtualization support. For many PCF components, that trade-off is usually acceptable.

In this article, I’ll show you how to integrate the latest version of React (v19) with your PCF component. We’ll install the necessary dependencies and configure the component to take full advantage of the latest version of React.

::: info This article assumes that you:

- Understand how to use the PAC CLI to create PCF projects.
- Are comfortable using the command line and a code editor (for example, VS Code)
- Know the basics of React
- Have some experience with PCF development

:::

Note: You don’t need access to a Power Platform environment unless you want to deploy the component. The built-in test harness will be sufficient to follow along with this article.

---

## Create a PCF Project

To create a PCF project, you’ll use the **PAC CLI**. If you haven’t installed it yet, follow the instructions [<VPIcon icon="fa-brands fa-microsoft"/>here](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction?tabs=windows).

From the directory of your choice, create a new folder for this project, and then open your terminal and run:

```sh
pac pcf init -ns SampleNameSpace \
-n SampleComponent \
--template field
```

Once it finishes, run:

```sh
npm i
```

This installs the default project dependencies.

So why didn’t we use the `--framework` flag to specify React during project creation? Because that flag sets up a React virtual control, which only supports React 16/17. Instead, we’re creating a standard control and installing React ourselves.

---

## Install the React Dependencies

To use React 19, you’ll need four dependencies:

- `react`
- `react-dom`
- `@types/react`
- `@types/react-dom`

These last two provide TypeScript typings for React. Install the above dependencies with:

```sh
npm install -D react react-dom @types/react @types/react-dom
```

You can verify the installation by looking at the <VPIcon icon="iconfont icon-json"/>`package.json` file in the project.

![The <VPIcon icon="iconfont icon-json"/>`package.json` file showing the react dependencies installed.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747410603816/a7eeeb60-dcbe-49c9-9913-6319cd246333.png)

While not necessary for what we will be doing, in order to use some newer React features, you may need to tweak the `compilerOptions` in the <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file to include the line below:

```json title="tsconfig.json"
"jsx": "react-jsx"
```

Here is what the <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file should look like with the added `jsx` line:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747410782472/524ac9a6-3898-4427-8bab-090fe0a3f718.png)

---

## Create a Non-React Button

Let’s verify that everything works before we introduce React.

From the command line, run:

```sh
npm run start:watch
```

This may take a moment. It will open a browser showing your PCF test harness. You’ll likely see an empty screen. That’s expected - we haven’t rendered anything yet.

Open <VPIcon icon="iconfont icon-typescript"/>`index.ts` in the `SampleComponent` folder. This file contains a class that implements the PCF standard control interface. Let’s create a basic non-React button.

Update the `init` method in the <VPIcon icon="iconfont icon-typescript"/>`index.ts` file like this:

```tsx title="index.ts"
public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
): void {
    // A basic button with vanilla JS and the DOM
    const btn = document.createElement('button');
    btn.textContent = 'Click me!';
    container.appendChild(btn);

    // A simple event lister for button clicks
    btn.addEventListener('click', () => {
        alert('Button clicked!');
    });
}
```

Now, head back to your test harness. You should see a button. Clicking it should display an alert.

![PCF test harness with clickable button.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747411524929/36d26f79-1d48-403c-9005-56655a16ed04.png)

![PCF test harness with alert displayed after button was clicked.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747411544199/85aab788-1a02-439c-8597-d74d6fa3a39c.png)

---

## Create a React Button

Next, let’s replace our plain DOM code with React.

Delete the button code from `init()`, leaving the `init` method empty.

Then, create a new file: <VPIcon icon="fa-brands fa-react"/>`Button.tsx`. Inside <VPIcon icon="fa-brands fa-react"/>`Button.tsx`, add the code below. This component will accept a label prop and emit an `onClick` event. Make sure to export the function.

```tsx title="Button.tsx"
export default function Button(props: { label: string; onClick: () => void }) {
    return <button onClick={props.onClick}>{props.label}</button>;
}
```

---

## Add the React Button to the PCF Component

In <VPIcon icon="fa-brands fa-react"/>`index.tsx`, update the file to:

1. Import `createRoot` from `react-dom/client`
2. Import the `Button` component
3. Render the `Button` component

Here is the minimal example:

```tsx title="SampleComponent.tsx"
import { createRoot } from 'react-dom/client'; // import the createRoot method
import Button from './Button'; //import the button.tsx component we just created

export class SampleComponent
    implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
    constructor() {
        // Empty
    }
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        // Add the code below to create a React root that allows us to render our button component.
        const root = createRoot(container);
        root.render(
            Button({ label: 'React Button', onClick: () => alert('React Button Clicked!') })
        );
    }
    // Other methods here...
}
```

You should now see “React Button” in the browser. Clicking it will trigger the alert.

![PCF test harness with the React button](https://cdn.hashnode.com/res/hashnode/image/upload/v1747412200377/ef496e75-de8f-4abe-8371-25dd295ee057.png)

![PCF test harness with alert displayed after the React buttons was clicked.](https://cdn.hashnode.com/res/hashnode/image/upload/v1747412239139/d4c73764-667f-445c-9366-aa270e456d13.png)

---

## Render the React Button When the PCF Component Updates

Many PCF components receive dynamic input values. If the inputs change, we want the React component to re-render. This is where `updateView()` comes in. `updateView()` is triggered when the PCF property bag changes.

Let’s move the rendering logic from `init()` to `updateView()`.

First, import `Root` from `react-dom/client`, and initialize `root` as a property of the class.

```tsx
import { createRoot, Root } from 'react-dom/client'; //add Root as an import

export class SampleComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    root: Root; // initialize the root property on the SampleComponent class
    constructor() {
        // Empty
    }
    // other methods here...
}
```

Then, modify `init()` to set `this.root` to the root created by React’s `createRoot` method. Move the rendering logic from the `init` method to `updateView()`, replacing `root` with `this.root`.

```tsx
public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
    ): void {
        this.root = createRoot(container); // assign the root React creates to this.root
    }

public updateView(context: ComponentFramework.Context<IInputs>): void {
    // render the React button component, by referencing this.root
    this.root.render(
        Button({ label: 'React Button', onClick: () => alert('Button Clicked!') })
    );
}
```

With the above setup, React will now re-render your button when the property bag of a PCF component changes.

---

## Wrapping Up

You’ve now created a PCF component that uses the latest version of React! By installing and configuring React manually, you avoid the version limitations of Microsoft’s built-in React controls - unlocking the power of modern React features.

While this setup doesn’t support virtualization, for many components that’s a fair trade-off for modern tooling and maintainability.

If you’re building PCF components beyond simple DOM manipulation, React can be a powerful way to improve your development workflow and UI flexibility.

_**Enjoyed this article?**_ I write regularly about low-code, development patterns, and practical tech topics at [<VPIcon icon="fas fa-globe"/>scriptedbytes.com](https://scriptedbytes.com/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use React 19 in Power Apps PCF Components",
  "desc": "The Power Apps Component Framework - PCF for short - lets you create complex custom components using traditional web development tools like HTML, CSS, and JavaScript. When creating a new PCF project, you can choose from two types of controls: standar...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-react-19-in-pcf-components.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
