---
lang: en-US
title: "How Event Handling Works in Vue 3: A Guide for Developers"
description: "Article(s) > How Event Handling Works in Vue 3: A Guide for Developers"
icon: fa-brands fa-vuejs
category: 
  - Node.js
  - Vue.js
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - vue
  - vuejs
  - vue-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Event Handling Works in Vue 3: A Guide for Developers"
    - property: og:description
      content: "How Event Handling Works in Vue 3: A Guide for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-event-handling-works-in-vue-3-guide-for-devs.html
prev: /programming/js-vue/articles/README.md
date: 2024-09-12
isOriginal: false
author:
  - name: Asfak Ahmed
    url : https://freecodecamp.org/news/author/asfakahmed/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725980520061/87728aa1-f3c5-451d-9f11-5163f527d029.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Vue.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-vue/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Event Handling Works in Vue 3: A Guide for Developers"
  desc="Event handling in Vue 3 allows developers to respond to user interactions like clicks, key presses, form submissions, and more. Vue provides simple and flexible ways to manage these interactions, enabling you to build dynamic and engaging application..."
  url="https://freecodecamp.org/news/how-event-handling-works-in-vue-3-guide-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1725980520061/87728aa1-f3c5-451d-9f11-5163f527d029.png"/>

Event handling in Vue 3 allows developers to respond to user interactions like clicks, key presses, form submissions, and more.

Vue provides simple and flexible ways to manage these interactions, enabling you to build dynamic and engaging applications.

::: info In this guide, we'll cover:

- Basic event handling (for example, `click` events)
- Event modifiers like `.prevent`, `.once`, and `.stop`
- Custom events between parent and child components
- Handling events in forms
- Keyboard events
- The basics of `emit`
- The basics of `v-model`

:::

By the end, you'll be able to handle a wide range of events and improve user interaction in your Vue applications.

---

## Basic Event Handling

Vue makes it easy to handle basic events like `click`, `input`, and `submit` directly in your template. You can use the `@` symbol (short for `v-on`) to listen for events on DOM elements.

### Example: Handling a Click Event

```vue
<template>
  <div>
    <button @click="handleClick">Click Me</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vue 3!');

function handleClick() {
  message.value = 'Button Clicked!';
}
</script>
```

::: info Code explanation

- `@click="handleClick"`: The `@` symbol is shorthand for `v-on`. It listens for the `click` event and calls the `handleClick` method when the button is clicked.
- `message.value = 'Button Clicked!'`: In Vue 3's Composition API, `ref` creates reactive variables. When the button is clicked, the `message` reacts to variable updates, and the change is reflected in the DOM automatically.

:::

This simple mechanism of listening to events and binding methods is foundational to handling user interactions in Vue.

---

## Event Modifiers

Vue event modifiers allow you to control how events are handled, preventing default behavior or stopping propagation, for example. Common event modifiers include `.prevent`, `.stop`, `.once`, `.capture`, and `.passive`.

### 1. The `.prevent` Modifier

The `.prevent` modifier calls `event.preventDefault()`, preventing the default behavior of events like form submission.

::: Example: Using `.prevent` to Handle Form Submission

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="inputValue" />
    <button type="submit">Submit</button>
  </form>
  <p>{{ output }}</p>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const output = ref('');

function handleSubmit() {
  output.value = `Form submitted with value: ${inputValue.value}`;
}
</script>
```

:::

::: info Code explanation

- `@submit.prevent`: Prevents the form from refreshing the page when submitted, allowing the `handleSubmit` function to process the form data instead.
- `v-model="inputValue"`: Two-way data binding between the form input and the `inputValue` reactive variable. It updates in real time as the user types.

:::

::: info When to use `.prevent`

Use `.prevent` when handling forms or other elements where you want to prevent the default behavior, such as preventing links from navigating.

:::

### 2. The `.stop` Modifier

The `.stop` modifier calls `event.stopPropagation()`, preventing the event from bubbling up to parent elements.

::: tip Example: Prevent Event Bubbling

```vue
<template>
  <div @click="handleDivClick">
    <button @click.stop="handleButtonClick">Click Me</button>
  </div>
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

function handleDivClick() {
  message.value = 'Div clicked!';
}

function handleButtonClick() {
  message.value = 'Button clicked!';
}
</script>
```

:::

::: info Code explanation:

- `.stop`: Clicking the button only triggers `handleButtonClick` and prevents the click from propagating to the parent `div`. Without `.stop`, clicking the button would also trigger `handleDivClick`.

:::

::: info When to use `.stop`

Use it to prevent parent elements from reacting to child element events.

:::

### 3. The `.once` Modifier

The `.once` modifier ensures that the event listener is only called once.

::: tip Example: Handling a Click Event Once

```vue
<template>
  <button @click.once="handleClickOnce">Click Me Once</button>
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

function handleClickOnce() {
  message.value = 'Button clicked once!';
}
</script>
```

:::

::: info Code explanation

- `.once`: The `handleClickOnce` method is triggered the first time the button is clicked. Subsequent clicks do nothing because the event listener is removed after the first execution.

:::

::: info When to use `.once`

Use it for actions that should only happen once, such as a one-time form submission.

:::

### 4. The `.capture` Modifier

The `.capture` modifier makes the event handler trigger during the capture phase rather than the bubbling phase.

::: tip Example: Handling an Event in the Capture Phase

```vue
<template>
  <div @click.capture="handleClickCapture">
    <button @click="handleClickButton">Click Me</button>
  </div>
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

function handleClickCapture() {
  message.value = 'Click event captured!';
}

function handleClickButton() {
  message.value = 'Button clicked!';
}
</script>
```

:::

::: info Code explanation:

- `.capture`: The click on the parent `div` is handled first, before the child button’s click event, because the `capture` phase happens before the bubbling phase.

:::

::: info When to use `.capture`

Useful when you need to intercept an event before it reaches its target.

:::

---

## Custom Events

In Vue, child components can emit custom events to communicate with parent components. This pattern is commonly used to pass data or trigger methods in parent components.

::: tip Example: Emitting and Handling Custom Events

```vue title="ParentComponent.vue"
<template>
  <ChildComponent @custom-event="handleCustomEvent" />
  <p>{{ parentMessage }}</p>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('');

function handleCustomEvent(payload) {
  parentMessage.value = `Received custom event with payload: ${payload}`;
}
</script>
```

```vue title="ChildComponent.vue"
<template>
  <button @click="emitCustomEvent">Emit Custom Event</button>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();

function emitCustomEvent() {
  emit('custom-event', 'Hello from ChildComponent');
}
</script>
```

:::

::: info Code explanation

- `defineEmits()`: This is used in the child component to define custom events. Here, the child emits a `custom-event` with a payload of `'Hello from ChildComponent'`. ([<VPIcon icon="fas fa-globe"/>you can learn more details of emit from here](https://asfakahmedsblog.hashnode.dev/understanding-vuejs-emit-a-complete-guide))
- **Event Handling in Parent**: The parent component listens for `custom-event` and responds by updating its `parentMessage` with the event payload.

:::

::: info When to use custom events

Use them for communication between parent and child components, especially for passing data from child to parent.

:::

---

## Event Handling in Forms

Vue’s `v-model` simplifies handling form inputs by creating two-way data binding between the form field and a data variable.

::: tip Example: Handling Input and Form Submission

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData.name" placeholder="Name" />
    <input v-model="formData.email" placeholder="Email" />
    <button type="submit">Submit</button>
  </form>
  <p>{{ formOutput }}</p>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({ name: '', email: '' });
const formOutput = ref('');

function handleSubmit() {
  formOutput.value = `Submitted Name: ${formData.value.name}, Email: ${formData.value.email}`;
}
</script>
```

:::

::: info Code explanation:

- `v-model="formData.name"`: This binds the input field directly to the `formData.name` variable, allowing automatic updates as the user types. ([<VPIcon icon="fas fa-globe"/>you can learn more details of `v-model` from here](https://asfakahmedsblog.hashnode.dev/understanding-vuejs-v-model-a-complete-guide))
- The `handleSubmit` method processes the form data and displays it in the paragraph below the form.

:::

---

## Keyboard Events

Vue also makes it easy to handle keyboard events such as `keydown`, `keyup`, and `keypress`.

::: tip Example: Handling Keyboard Events

```vue 
<template>
  <input @keydown.enter="handleEnterKey" placeholder="Press Enter" />
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');

function handleEnterKey() {
  message.value = 'Enter key pressed!';
}
</script>
```

:::

::: info Code explanation

- `@keydown.enter`: Listens for the <kbd>Enter</kbd> keypress and triggers the `handleEnterKey` function when pressed. This is useful for form submissions or other actions that should be triggered by a specific key press.

:::

---

## Wrapping Up

Event handling in Vue 3 is pretty straightforward and flexible. From basic click events to custom events and form handling, Vue's event system allows you to create interactive, dynamic applications.

By using event modifiers and custom events, you can fine-tune how events are handled in your app. Understanding these techniques will enable you to create responsive, user-friendly interfaces.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Event Handling Works in Vue 3: A Guide for Developers",
  "desc": "Event handling in Vue 3 allows developers to respond to user interactions like clicks, key presses, form submissions, and more. Vue provides simple and flexible ways to manage these interactions, enabling you to build dynamic and engaging application...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-event-handling-works-in-vue-3-guide-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
