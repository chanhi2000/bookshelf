---
lang: en-US
title: "How Vue Composables Work – Explained with Code Examples"
description: "Article(s) > How Vue Composables Work – Explained with Code Examples"
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
      content: "Article(s) > How Vue Composables Work – Explained with Code Examples"
    - property: og:description
      content: "How Vue Composables Work – Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-vue-composables-work.html
prev: /programming/js/articles/README.md
date: 2025-06-14
isOriginal: false
author:
  - name: Brian Barrow
    url : https://freecodecamp.org/news/author/the_BrianB/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749830866913/e732db46-638b-42cd-aabf-ad51a54a3409.png
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
  name="How Vue Composables Work – Explained with Code Examples"
  desc="Vue composables are a very helpful tool when developing Vue applications. They give developers an easy way to reuse logic across our applications. In addition to allowing for “stateless” logic (things like formatting or routine calculations), composa..."
  url="https://freecodecamp.org/news/how-vue-composables-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1749830866913/e732db46-638b-42cd-aabf-ad51a54a3409.png"/>

Vue composables are a very helpful tool when developing Vue applications. They give developers an easy way to reuse logic across our applications. In addition to allowing for “stateless” logic (things like formatting or routine calculations), composables also give us the ability to reuse stateful logic throughout the app.

Before diving into the tutorial below, I want to mention that the documentation for Vue is *really* good. [<FontIcon icon="iconfont icon-vuejs"/>The page on composables](https://vuejs.org/guide/reusability/composables) explains the basics really well and will get you 90 percent of the way there. I am writing this article because I think the examples in the docs could go a little deeper in explaining how things can work inside of a composable. I will be reiterating some of the information from the docs, but I will also provide an example of a more complex composable.

---

## Why Use Composables?

Composables let you reuse stateful logic across your apps. Whenever there is logic that is used in more than two places, we typically want to pull that logic into its own function. Most of the time, that logic is considered “stateless”, meaning that it takes an input and returns an output. The docs mention date formatting, but this could also include something like currency calculations or string validation.

In modern web applications, there are often pieces of logic that require managing state over time. Inside a typical component, we have the ability to adapt the application depending on the “state” of different variables within the component. Sometimes that logic, or at least pieces of that logic, are reused throughout the app.

For example, in an e-commerce application, you might have logic to increase and decrease the quantity of a product a person is adding to their cart. This logic could be used both on the product page, and inside the cart itself.

The look and feel of both those places will be different, so re-using a full component wouldn’t make sense – but we still want to centralize the logic to make the code easier to maintain. That is where Composables come in.

(It is worth noting that not everything needs to be a composable. Logic that is only used in a single component shouldn’t be refactored into a composable until necessary.)

---

## Simple Composable Example

Let’s take a look at a simple counter example. Here is some code for a very simple `Counter` component.

```vue :collapsed-lines
<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const count: Ref<number> = ref(0)
  const increment = () => {
    count.value++
  }
  const decrement = () => {
    count.value--
  }
</script>

<template>
  <div class="bg-teal-100 border-2 border-gray-800 rounded-xl p-4 w-64">
    <div class="text-center mb-4">
      <span class="text-lg font-medium text-gray-800">Count: {{ count }}</span>
    </div>

    <div class="flex gap-2 justify-center">
      <button
        @click="decrement"
        class="bg-red-100 border-2 border-gray-800 rounded px-4 py-0 text-gray-800 font-medium hover:bg-red-500 transition-colors"
      >
        -
      </button>

      <button
        @click="count = 0"
        class="bg-gray-100 border-2 border-gray-800 rounded px-4 py-0 text-gray-800 font-medium hover:bg-gray-300 transition-colors"
      >
        Reset
      </button>

      <button
        @click="increment"
        class="bg-green-100 border-2 border-gray-800 rounded px-4 py-0 text-gray-800 font-medium hover:bg-green-500 transition-colors"
      >
        +
      </button>
    </div>
  </div>
</template>
```

The output of that component would look like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748355723167/8c39759c-6fd9-4fcf-abdf-f67e672c172f.gif)

This works great, but if we end up needing this same counter logic in another component with a completely different look and feel, then we would end up repeating the logic. We can extract the logic into a composable and access the same stateful logic anywhere we need to.

```ts title="counter.ts"
import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useCounter(): Readonly<{
  count: Ref<number>
  increment: () => void
  decrement: () => void
}> {
  const count: Ref<number> = ref(0)
  const increment = () => {
    count.value++
  }
  const decrement = () => {
    count.value--
  }
  return { count, increment, decrement }
}
```

Then we update the script tag in the component to use the composable:

```vue
<script setup>
import { useCounter } from '@/counter.ts'

const { count, increment, decrement } = useCounter()
</script>

<template>
  ...
</template>
```

Now we can use this logic in multiple components throughout the app.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748355833182/d90d000e-f309-4b22-9530-8e4614b450ec.gif)

You will notice that only the logic is copied and each component still has its own copy of the `count` state. Using a composable does not mean the state is shared across components, only the stateful logic.

---

## Complex Composable Example

In the Vue docs, they give an example of using a composable to handle async data fetching. There are a couple of issues I have with the example they give. The main one is that the error handling is not robust for real world applications. Given that they just want to showcase a straightforward use of composables, this is understandable. But I wanted to showcase a more realistic implementation.

### Util function for `fetch`

Before getting into the composable, we need to set up a util function for the `fetch` API. This is because we want to make sure every request throws an error if it fails. The `fetch` API doesn’t throw an error if the request responds with an error status. We have to check the `response.ok` in order to verify the status, and then throw an error if necessary.

```ts title="utils.ts"
export async function handleFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, options)
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err)
  }
  return res
}
```

### useAsyncState Composable

When working with async state, the requests can be in a few different states:

- Pending
- Resolved
- Rejected

In addition to these states, we want to track the data or the error that comes back from the request.

```ts :collapsed-lines title="useAsyncState.ts"
import { shallowRef } from 'vue'
import type { Ref } from 'vue'

// Specify a type for the response
export type AsyncState<T> = {
  data: Ref<T | null>
  error: Ref<Error | null>
  isPending: Ref<boolean>
  isResolved: Ref<boolean>
  isRejected: Ref<boolean>
}

export default function useAsyncState<T>(promise: Promise<T>): AsyncState<T> {
  // I used shallowRef instead of ref to avoid deep reactivity
  // I only care about the top-level properties being reactive
  const data = shallowRef<T | null>(null)
  const error = shallowRef<Error | null>(null)
  const isPending = shallowRef(false)
  const isResolved = shallowRef(false)
  const isRejected = shallowRef(false)

  data.value = null
  error.value = null
  isPending.value = true
  isRejected.value = false
  isResolved.value = false

  promise.then((result) => {
    data.value = result
    isPending.value = false
    isResolved.value = true
  }).catch(err => {
    error.value = err
    isPending.value = false
    isRejected.value = true
  })

  return { data, error, isPending, isResolved, isRejected }
}
```

This gives a few more explicit properties for the different states, rather than relying on the values in `data` and `error`. You’ll also notice that this composable takes in a promise rather than a URL string like the docs show. Different endpoints will have different response types and I wanted to be able to handle those outside of this composable.

### Usage in a component

I have set up an endpoint that will wait a random number of seconds before responding either successfully or with an error. My component is calling this endpoint using the composable and using the data from the composable to update the template.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748364641116/304b8c08-5277-4243-b621-70a7c19edcfd.gif)

With the error state showing like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748364674070/7d0c6923-85b9-4971-8f69-d127ffa6c1f4.png)

::: info

You can see a working example

```component VPCard
{
  "title": "Understanding Composables",
  "desc": "Each counter below uses the same useCounter composable but maintains independent state.",
  "link": "https://understanding-composables.pages.dev/",
  "logo": "https://understanding-composables.pages.dev/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

To make this a bit easier to explain and understand, I am breaking up the `<script>` tag and the `<template>` sections of the component.

#### Script

```vue :collapsed-lines
<script lang="ts" setup>
import { ref, unref } from 'vue'
import type { Ref } from 'vue'
import { useAsyncState } from '@/composables'
import type { AsyncState } from '@/composables'
import { handleFetch } from '@/utils'

interface RandomResponse {
  msg: string
}

async function getRandomResponse(): Promise<RandomResponse> {
  const response = await handleFetch('https://briancbarrow.com/api/random')
  const text = await response.text()
  return { msg: text }
}

const randomResponseData: Ref<AsyncState<RandomResponse> | null> = ref(null)

const handleMakeRequest = async () => {
    const data = getRandomResponse()
    randomResponseData.value = useAsyncState(data)
}
</script>
```

Here we have a method, `getRandomResponse` that calls an endpoint and returns a promise. That promise is then passed into the `useAsyncState` when `handleMakeRequest` is called. That puts the full return value into the `randomResponseData` ref which we can then use inside the template.

Rather than show the full template, I will just show a few portions of it.

Here you can see two different buttons being used depending on the state. I am using a separate button element to indicate the “loading” state, but in practice you can use the composable properties to set the `disabled` property of the button and change the text.

```xml
        <button
          v-if="
            !randomResponseData?.isPending &&
            !randomResponseData?.error &&
            !randomResponseData?.data
          "
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          @click="handleMakeRequest"
        >
          Make Request
        </button>

        <!-- Loading State Button -->
        <button
          v-if="randomResponseData?.isPending"
          disabled
          class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg opacity-75 cursor-not-allowed flex items-center mx-auto"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </button>
```

Here are a couple of the rows from the table:

```xml
<tr class="divide-x divide-gray-200">
  <td class="py-4 pr-4 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
    isPending
  </td>
  <td
    class="p-4 text-sm whitespace-nowrap text-gray-500"
    :class="randomResponseData?.isPending ? 'bg-blue-500' : 'bg-gray-300'"
  ></td>
  <td class="p-4 text-sm whitespace-nowrap text-gray-500">
    {{ randomResponseData?.isPending }}
  </td>
</tr>

<tr class="divide-x divide-gray-200">
  <td class="py-4 pr-4 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
    data
  </td>
  <td
    class="p-4 text-sm whitespace-nowrap text-gray-500"
    :class="randomResponseData?.data ? 'bg-green-500' : 'bg-gray-300'"
  ></td>
  <td class="p-4 text-sm whitespace-nowrap text-gray-500">
    {{ unref(randomResponseData?.data)?.msg }}
  </td>
</tr>
```

In those `tr` tags, you can see the template rendering different things depending on the state coming from the composable.

::: info

For a more complete look at the code, you can visit [the GitHub repo (<FontIcon icon="iconfont icon-github"/>`briancbarrow/understanding-composables`)](https://github.com/briancbarrow/understanding-composables). You can also look at how VueUse, a collection of composables, handles similar functionality:

<SiteInfo
  name="VueUse"
  desc="Collection of essential Vue Composition Utilities"
  url="https://vueuse.org/core/useAsyncState"
  logo="https://vueuse.org/favicon.svg"
  preview="https://vueuse.org/og-useAsyncState.png"/>

:::

In a future article, I’ll dive into their implementation.

---

## Conclusion

Composables are an incredibly useful tool in Vue 3. As projects grow in size and scope, knowing how and when to use composables can improve the maintainability of the project over the long term.

The key is identifying when you have stateful logic that needs to be reused across components, then extracting it into a well-structured composable that handles edge cases properly.

For more real world examples you can check out the [<FontIcon icon="iconfont icon-vuejs"/>VueUse library](https://vueuse.org/) and [repo (<FontIcon icon="iconfont icon-github"/>`vueuse/vueuse`)](https://github.com/vueuse/vueuse).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Vue Composables Work – Explained with Code Examples",
  "desc": "Vue composables are a very helpful tool when developing Vue applications. They give developers an easy way to reuse logic across our applications. In addition to allowing for “stateless” logic (things like formatting or routine calculations), composa...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-vue-composables-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
