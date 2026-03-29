---
lang: en-US
title: "How to Create and Use Checkboxes in Figma"
description: "Article(s) > How to Create and Use Checkboxes in Figma"
icon: fa-brands fa-figma
category:
  - Design
  - Figma
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - figma
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create and Use Checkboxes in Figma"
    - property: og:description
      content: "How to Create and Use Checkboxes in Figma"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-and-use-checkboxes-in-figma.html
prev: /tool/figma/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: Abhijeet Dave
    url: https://freecodecamp.org/news/author/Abhidave/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/895586d9-6b46-4974-858b-2caebdf8c9f1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Figma > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/figma/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create and Use Checkboxes in Figma"
  desc="Checkboxes are a fundamental part of modern UI design. They allow users to make multiple selections, confirm actions, and control features with ease. And while they may appear simple, designing intera"
  url="https://freecodecamp.org/news/how-to-create-and-use-checkboxes-in-figma"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/895586d9-6b46-4974-858b-2caebdf8c9f1.png"/>

Checkboxes are a fundamental part of modern UI design. They allow users to make multiple selections, confirm actions, and control features with ease.

And while they may appear simple, designing interactive and scalable checkboxes in Figma requires a clear understanding of components, variants, states, and properties.

This guide walks you through everything you need to know, from the purpose and variations of checkboxes to step-by-step instructions for building fully interactive components.

You’ll also learn best practices to improve usability and discover ways to speed up your workflow with ready-made components, helping you create more efficient and production-ready designs.

---

## What Is a Checkbox?

A checkbox is a user interface element that allows users to select one or more options from a set of choices. Each checkbox operates independently, allowing multiple selections at the same time.

In Figma, checkboxes are typically created as components with variants, allowing designers to represent different states, such as checked, unchecked, hover, or disabled, in prototypes.

### What Is the Purpose of a Checkbox? (Why We Use It)

You can use checkboxes in your designs when users need to:

- Select multiple options
- Confirm an action
- Enable or disable a feature
- Agree to terms or policies

### Common real-world examples:

- “I agree to the Terms & Conditions.”
- Choosing notification preferences
- Selecting filters in e-commerce apps
- Marking tasks as completed in to-do apps

In Figma prototypes, interactive checkboxes help simulate real user behavior, making designs easier to validate before development.

![figma prototype example](https://cdn.hashnode.com/res/hashnode/image/upload/v1770892845865/d6e00d87-1e44-4b3c-a6ad-92f02f17a9c0.png)

---

## Checkbox Variations in UI Design

### Different Checkbox Formats

Depending on your design system, checkboxes can appear in many formats:

**Card-Based Checkbox Selection** – Uses cards as selectable elements with integrated checkboxes. This pattern improves visual clarity and is ideal for selecting rich content options.

**Simple To-Do List Checkboxes** – Basic checkbox layout for task lists where users can mark items as complete. Commonly used for straightforward tracking and productivity flows.

**Status & Completed Checkboxes** – Represents different task states such as pending, in-progress, or completed. Helps users quickly understand progress and current status.

**Error State Checkboxes** – Displays validation errors when a required checkbox is not selected. Often used in forms to guide users toward required actions.

**Chip-Style Checkbox Selection** – Combines checkboxes with chip UI elements for compact, multi-select options. Ideal for filters, tags, or quick selections.

**Nested Checkbox Structures** – Organizes checkboxes in parent-child relationships. Allows bulk selection and partial (indeterminate) states for better hierarchy control.

![Checkbox Variations in UI Design](https://cdn.hashnode.com/res/hashnode/image/upload/v1770893235721/92abda28-128c-47ec-a03e-cfdbc166a22e.png)

::: tip Design tip

- Use **checkboxes** when users can select multiple options.
- Use **radio buttons** when only one option is allowed.

:::

---

## States of a Checkbox

A well-designed checkbox should clearly communicate its current state to users.

### Common Checkbox States

In the below illustration, you can see examples of the various states of checkboxes – Unchecked, Checked, Indeterminate, Disabled Uncheck, and Disabled Check:

![States of a Checkbox](https://cdn.hashnode.com/res/hashnode/image/upload/v1770893274277/15b5e3f0-f097-4830-9cb3-2ef1b020d112.png)

**Unchecked (default):** The default state where no selection has been made. It indicates that the option is available but not currently chosen.

**Checked:** This state shows that the option has been selected by the user. It confirms an active choice and is typically represented with a checkmark.

**Hover:** Appears when the user moves the cursor over the checkbox. It provides visual feedback to indicate that the element is interactive.

**Active / Pressed:** Triggered when the user clicks or taps the checkbox. This state gives immediate feedback during the interaction before the final state is applied.

**Disabled:** Indicates that the checkbox is not interactive and cannot be changed. It's usually dimmed to show that the option is unavailable.

**Indeterminate (partially selected):** Represents a mixed or partial selection, often used in parent-child relationships. It shows that some, but not all, related options are selected.

### How Figma Handles These States (Using Variants)

In Figma, these states are best managed using **variants within a component**, which allow you to group multiple versions of the same UI element into a single, organized component set.

Instead of creating separate checkbox designs for each state, variants let you define all states, like **checked, unchecked, hover, and disabled** inside one component. Each state becomes a **variant**, and you can switch between them using properties such as:

- `State = Unchecked`
- `State = Checked`
- `State = Disabled`

This approach helps you maintain consistency across all checkbox instances and quickly switch states from the properties panel. It also lets you create interactive prototypes by linking variants (for example, click → change to checked), and scale design systems efficiently without duplicating components.

In simple terms, **variants act as different “versions” of a component**, and Figma allows you to connect these versions together to simulate real UI behavior – just like how a checkbox works in an actual product.

---

## Steps to Create an Interactive Checkbox in Figma

Building interactive checkboxes from scratch is useful for learning. But in real projects, speed and consistency matter.

If you want production-ready checkbox components, check out Shadcn Studio.

It offers clean, scalable UI components inspired by modern design systems, helping designers move faster without sacrificing quality.

### Step 1: Design the Checkbox UI

Start by drawing a square (recommended size: 24 × 24 px). Then add a check icon to it for the checked state (recommended size: 20 × 20 px).

Next, add a text label (recommended size: 14 px medium). You can use Auto Layout for proper spacing (recommended spacing: 12).

It should look like this:

![Design the Checkbox UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1770894656766/480d9c76-c6a2-4fde-a7db-47c6a5c86a3a.png)

### Step 2: Create a Component

Convert your checkbox design into a reusable component to ensure consistency and scalability. By adding variants, you can manage different states efficiently within a single component set.

- Select the checkbox design
- Convert it into a **Component**
- Create **variants** for different states:
  - Unchecked
  - Checked
  - Indeterminate
  - Disable Check
  - Disable Uncheck

Name the variant properties clearly, for example:

- `State = Unchecked`
- `State = Checked`

And so on.

![Create a Component](https://cdn.hashnode.com/res/hashnode/image/upload/v1770894904170/37cc0971-7e01-487f-bdc3-8392a5c1cd65.png)

### Step 3: Add Interactions Between Variants

Before setting up interactions, it’s important to understand what’s happening here.

In Figma, variants don’t automatically “know” how to switch between each other. You have to define how and when one variant transitions to another. This is done using prototype interactions.

Think of it like this:

- Each variant = a **state** (Unchecked, Checked, Hover, and so on)
- Interactions = the **rules** that tell Figma when to switch states

So when a user clicks a checkbox, you're essentially telling Figma: “When this happens (click), change from this state to that state.”

This is what creates the illusion of a working, interactive component, similar to how state changes work in real code.

Now let’s implement it:

- Switch to the **Prototype** tab
- Select the **Unchecked** variant
- Add an interaction:
  - **Trigger:** On click
  - **Action:** Change to → Checked

Now, repeat the same steps to create the reverse interaction (so the checkbox can toggle back):

- Select the **Checked** variant
- Add an interaction:
  - **Trigger:** On click
  - **Action:** Change to → Unchecked

This two-way connection (Unchecked → Checked and Checked → Unchecked) is what creates the **toggle behavior** of a checkbox.

![Add Interactions Between Variants](https://cdn.hashnode.com/res/hashnode/image/upload/v1770894931100/08a7f258-04fa-4639-b96a-ff4e1a080f02.png)

### Step 4: Test the Checkbox

Preview the component to ensure all interactions and states are working as expected. This step helps verify that the checkbox behaves correctly before using it in your designs.

- Click Present
- Interact with the checkbox
- It should toggle between checked and unchecked states

---

## Checkbox: Various Properties

Before diving into specific properties, let’s understand what Figma variables are and why they matter.

### What Are Variables in Figma?

**Variables** in Figma allow you to store and control values, such as visibility, text, colors, sizes, or states, and reuse them across your components. Similar to how variables behave in code.

Instead of manually updating every instance of a component, variables let you define a value once and control it dynamically.

Think of variables like:

- **Switches (Boolean)** – Show / hide elements
- **Options (Variants)** – Change between states like checked or unchecked
- **Scalable controls** – Adjust sizes, styles, or themes across multiple components

This makes your components more flexible, scalable, and easier to manage, especially in larger design systems.

### Why Use Variables for Checkboxes?

Checkboxes often need to adapt based on context, like showing labels, changing sizes, or switching states. Variables help you manage all of this without creating separate components for every variation.

With variables, a single checkbox component can behave in multiple ways.

### What You Can Control with Variables

With Figma variables, you can:

**Show or Hide Label** – Controls whether the label is visible alongside the checkbox. Useful when space is limited or the context is already clear.

**State Variant** – Defines interaction states like checked, unchecked, hover, and disabled to ensure consistent behaviour and feedback.

**Size Variant** – Specifies checkbox sizes (small, medium, large) to maintain visual hierarchy across different UI contexts.

**Creating Different Variant** – Combines state, size, and label visibility into structured variants for scalability and easier management in Figma.

First, let’s learn how to show and hide the label in a checkbox.

### 1. Turn it into a component

You can convert your checkbox into a reusable component so it can be used consistently across your designs. This also allows you to add properties and variants later.

- Select the entire checkbox, including the checkbox icon and the label text
- Press Cmd / Ctrl + Alt + K to convert it into a Component
- Rename the component to Check Box

### 2. Create a Boolean property for the label

You can use a Boolean property to control whether the label is shown or hidden. This makes the component more flexible for different use cases.

- Select the main component
- In the Properties section on the right panel, click +
- Choose Boolean
- Name the property Label
- Set the default value to True

This Boolean property controls the label's visibility.

### 3. Bind the Boolean to the label visibility

You can associate the Boolean property with the label layer to enable dynamic visibility based on the property's value.

- Select only the label text layer
- In the Appearance section of the right panel
- Click the icon that is highlighted in the image with a red square
- Choose Bind to property
- Select the Label Boolean

![Boolean to the label visibility](https://cdn.hashnode.com/res/hashnode/image/upload/v1770894971306/95ef0efe-8299-4ca8-9094-7b11a64bd753.png)

Now, we’re going to learn how to add properties for size, state, and variants.

We'll create all checkbox designs covering:

- States: Unchecked, Checked, Indeterminate, Disabled check, Disabled uncheck
- Variants: Primary, Secondary, Info, Warning, Destructive
- Sizes: Sm, Md, Lg

![how to add properties for size, state, and variant](https://cdn.hashnode.com/res/hashnode/image/upload/v1770895088612/a08aac1e-160a-4a4e-b6eb-171f35d6d170.png)

Then select all checkbox designs and convert them into components by selecting Create Multiple Components (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>K</kbd>)

With all components selected, click **Combine as variants.**

![Grid of labeled checkbox icons in various colors and states. A dropdown menu on the right shows options like "Create multiple components." Additional UI elements display selection information and a "Combine as variants" button.](https://cdn.hashnode.com/res/hashnode/image/upload/v1770895169444/5890e140-abdb-4de2-89cd-1c6443974853.png)

Select the main component set and rename properties:

- Rename **Property 1 to state**
- Add a **Variant** property and rename it to **variant**
- Add another **Variant** property and rename it to size

![checkbox component creation](https://cdn.hashnode.com/res/hashnode/image/upload/v1770895197034/65ec9280-cc35-495f-be4a-1dad60001331.png)

Select all unchecked checkboxes and set:

- **state = Unchecked**

Same for all state values.

- Select all primary checkboxes and set:
  - **variant = Primary**

Same for all Variant values.

![Design process involving checkboxes](https://cdn.hashnode.com/res/hashnode/image/upload/v1770895305294/9faa609f-afe2-4146-9cc0-c26acf80bbf5.png)

Then select all medium checkboxes and set:

- **size = md**

Same for all Size values.

Drag any checkbox instance onto the canvas and verify that State, Variant, and Size properties work correctly:

![size values of checkbox](https://cdn.hashnode.com/res/hashnode/image/upload/v1770895397620/65ba3b77-8d18-432e-b6e5-0f663a8fb8d6.png)

---

## Best Practices for CheckboxDesign in Figma

**Always include clear and readable labels** – Clear labels help users quickly understand the purpose of each checkbox and reduce confusion during interaction.

**Maintain consistent spacing using Auto Layout** – Consistent spacing ensures visual balance and alignment while keeping layouts scalable and structured.

**Ensure sufficient colour contrast for accessibility** – Proper contrast improves visibility and ensures the checkbox is accessible to all users.

**Make the clickable area large enough** – A larger clickable area enhances usability, especially on touch devices, and reduces misclicks.

**Keep interactions simple and predictable** – Simple and predictable interactions help users easily understand behavior and build confidence while using the interface.

---

## Speed Up with Ready-Made Checkbox Components

Building interactive checkboxes from scratch is useful for learning, but in real projects, speed and consistency matter.

If you want production-ready checkbox components, check out [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Studio](https://shadcnstudio.com/). It offers clean, scalable UI [<VPIcon icon="iconfont icon-shadcn"/>shadcn components](https://shadcnstudio.com/components) and blocks inspired by modern design systems, helping designers move faster without sacrificing quality.

::: important Why use Shadcn Studio?

- Save hours on repetitive UI work
- Maintain consistent checkbox styles
- Easy to integrate into existing design systems
- Ideal for SaaS products, dashboards, and web apps

:::

::: info

You can explore [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Checkbox](https://shadcnstudio.com/docs/components/checkbox) components on Shadcn Studio. You'll also find animated checkbox components you can try out.

:::

---

## Conclusion

Checkboxes are small but essential UI elements that improve usability and help simulate real user interactions in Figma. By using components, variants, Auto Layout, and variables, designers can create scalable, accessible, and consistent checkbox systems.

Following best practices ensures clarity and better user experience, while ready-made component libraries can speed up workflows and maintain design consistency. Mastering interactive checkboxes ultimately helps designers prototype more effectively and deliver polished, production-ready interfaces.

I have prepared this article with the help of [Nirmi Nagori (<VPIcon icon="iconfont icon-github"/>`nirmiclevision`)](https://github.com/nirmiclevision), a passionate Figma designer.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create and Use Checkboxes in Figma",
  "desc": "Checkboxes are a fundamental part of modern UI design. They allow users to make multiple selections, confirm actions, and control features with ease. And while they may appear simple, designing intera",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-and-use-checkboxes-in-figma.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
