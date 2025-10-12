---
lang: en-US
title: "Introducing Svelte 5"
description: "Article(s) > Introducing Svelte 5"
icon: iconfont icon-svelte
category:
  - Node.js
  - Svelte.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - svelte
  - sveltejs
  - svelte-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing Svelte 5"
    - property: og:description
      content: "Introducing Svelte 5"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-svelte-5.html
prev: /programming/js-svelte/articles/README.md
date: 2024-07-19
isOriginal: false
author: Adam Rackis
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3067
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Svelte.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-svelte/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Introducing Svelte 5"
  desc="Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). "
  url="https://frontendmasters.com/blog/introducing-svelte-5/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3067"/>

[<VPIcon icon="iconfont icon-svelte"/>Svelte](https://svelte.dev/) has always been a delightful, simple, and fun framework to use. It’s a framework that’s always prioritized developer experience (DX), while producing a light and fast result with minimal JavaScript. It achieves this nice DX by giving users dirt simple idioms and a required compiler that makes everything work. Unfortunately, it used to be fairly easy to break Svelte’s reactivity. It doesn’t matter how fast a website is if it’s broken.

These reliability problems with reactivity are gone in Svelte 5. In this post, we’ll get into the exciting Svelte 5 release (in Beta at the time of this writing). Svelte is the latest framework to add **signals** to power their reactivity. Svelte is now every bit as capable of handling robust web applications, with complex state, as alternatives like React and Solid. Best of all, it achieved this with only minimal hits to DX. It’s every bit as fun and easy to use as it was, but it’s now truly reliable, while still producing faster and lighter sites.

::: info Article Series



```component VPCard
{
  "title": "Introducing Svelte 5",
  "desc": "Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). ",
  "link": "/frontendmasters.com/introducing-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Snippets in Svelte 5",
  "desc": "Out with slots, in with snippets.",
  "link": "/frontendmasters.com/snippets-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Fine-Grained Reactivity in Svelte 5",
  "desc": "Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. ",
  "link": "/frontendmasters.com/fine-grained-reactivity-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
:::

Let’s jump in!

---

## The Plan

Let’s go through various pieces of Svelte, look at the “old” way, and then see how Svelte 5 changes things for the better.

If you find this helpful, let me know, as I’d love to cover snippets and Svelte’s exciting new fine-grained reactivity.

As of this writing, Svelte 5 is late in the Beta phase. The API should be stable, although it’s certainly possible some new things might get added.

The docs are also still in beta, so [<VPIcon icon="fas fa-globe"/>here’s a preview URL for them](https://svelte-5-preview.vercel.app/docs/introduction). Svelte 5 *might* be released when you read this, at which point these docs will be on the main Svelte page. If you’d like to see the code samples below in action, you can find them in[this repo (<VPIcon icon="iconfont icon-github"/>)](https://github.com/arackaf/svelte-5-intro-blog).

<SiteInfo
  name="arackaf/svelte-5-intro-blog"
  desc="Contribute to arackaf/svelte-5-intro-blog development by creating an account on GitHub."
  url="https://github.com/arackaf/svelte-5-intro-blog/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7d50084613f9c4b82518ba668606d6e20d54b8db57186c3045a827ec4fa3f03c/arackaf/svelte-5-intro-blog"/>

---

## State

Effectively managing state is probably the most crucial task for any web framework, so let’s start there.

State used to be declared with regular, plain old variable declarations, using`let`.

```js
let value = 0;
```

Derived state was declared with a quirky, but technically valid JavaScript syntax of`$:`. For example:

```js
let value = 0;
$: doubleValue = value * 2;
```

Svelte’s compiler would (in theory) track changes to`value`, and update`doubleValue`accordingly. I say *in theory* since, depending on how creatively you used`value`, some of the re-assignments might not make it to all of the derived state that used it.

You could also put entire code blocks after`$:`and run arbitrary code. Svelte would look at what you were referencing inside the code block, and re-run it when those things changed.

```js
$: {
  console.log("Value is ", value);
}
```

### Stores

Those variable declarations, and the special`$:`syntax was limited to Svelte components. If you wanted to build some portable state you could define anywhere, and pass around, you’d use a[<VPIcon icon="iconfont icon-svelte"/>store](https://svelte.dev/docs/svelte-store).

We won’t go through the whole API, but here’s a minimal example of a store in action. We’ll define a piece of state that holds a number, and, based on what that number is at anytime, spit out a label indicating whether the number is even or odd. It’s silly, but it should show us how stores work.

```js :collapsed-lines
import { derived, writable } from "svelte/store";

export function createNumberInfo(initialValue: number = 0) {
  const value = writable(initialValue);

  const derivedInfo = derived(value, value => {
    return {
      value,
      label: value % 2 ? "Odd number" : "Even number",
    };
  });

  return {
    update(newValue: number) {
      value.set(newValue);
    },
    numberInfo: derivedInfo,
  };
}
```

Writable stores exist to write values to. *Derived* stores take one or more *other* stores, read their current values, and project a new payload. If you want to provide a mechanism to set a new value, close over what you need to. To consume a store’s value, prefix it with a`$`in a Svelte component. It’s not shown here, but there’s also a`subscribe`method on stores, and a`get`import. If the store returns an object with properties, you can either “dot through” to them, or you can use a reactive assignment (`$:`) to get those nested values. The example below shows both, and this distinction will come up later when we talk about interoperability between Svelte 4 and 5.  

```html :collapsed-lines
<script lang="ts"> 
  import { createNumberInfo } from './numberInfoStore';

  let store = createNumberInfo(0);

  $: ({ numberInfo, update } = store);
  $: ({ label, value } = $numberInfo);
</script>

<div class="flex flex-col gap-2 p-5">
  <span>{$numberInfo.value}</span>
  <span>{$numberInfo.label}</span>
  <hr />
  <span>{value}</span>
  <span>{label}</span>

  <button onclick={() => update($numberInfo.value + 1)}>
    Increment count
  </button>
</div>
```

This was the *old* Svelte.

This is a post on the *new* Svelte, so let’s turn our attention there.

---

## State in Svelte 5

Things are substantially simpler in Svelte 5. Pretty much everything is managed by something new called “runes.” Let’s see what that means.

### Runes

Svelte 5 joins the increasing number of JavaScript frameworks that use the concept of *signals*. There is a new feature called *runes* and under the covers they use signals. These accomplish a wide range of features from state to props and even side effects. [<VPIcon icon="iconfont icon-svelte"/>Here’s a good introduction to runes](https://svelte.dev/blog/runes).

To create a piece of state, we use the`$state`rune. You don’t import it, you just use it — it’s part of the Svelte language.

```js
let count = $state(0);
```

For values with non-inferable types, you can provide a generic

```js
let currentUser = $state<User | null>(null);
```

What if you want to create some derived state? Before we did:

```js
$: countTimes2 = count * 2;
```

In Svelte 5 we use the`$derived`rune.

```js
let countTimes2 = $derived(count * 2);
```

Note that we pass in a raw*expression*. Svelte will run it, see what it depends on, and re-run it as needed. There’s also a`$derived.by`rune if you want to pass an actual function.

If you want to use these state values in a Svelte template, you just*use them*. No need for special`$`syntax to prefix the runes like we did with stores. You reference the values in your templates, and they update as needed.

If you want to*update*a state value, you assign to it:

```js
count = count + 1;
// or count++;
```

### What about stores?

We saw before that defining portable state outside of components was accomplished via stores. Stores are not deprecated in Svelte 5, but there’s a good chance they’re on their way out of the framework. You no longer need them, and they’re replaced with what we’ve*already seen*. That’s right, the`$state`and`$derived`runes we saw before can be defined outside of components in top-level TypeScript (or JavaScript) files. Just be sure to name your file with a`.svelte.ts`extension, so the Svelte compiler knows to enable runes in these files. Let’s take a look!

Let’s re-implement our number / label code from before, in Svelte 5. This is what it looked like with stores:

```js :collapsed-lines
import { derived, writable } from "svelte/store";

export function createNumberInfo(initialValue: number = 0) {
  const value = writable(initialValue);

  const derivedInfo = derived(value, value => {
    return {
      value,
      label: value % 2 ? "Odd number" : "Even number",
    };
  });

  return {
    update(newValue: number) {
      value.set(newValue);
    },
    numberInfo: derivedInfo,
  };
}
```

Here it is with runes:

```js :collapsed-lines
export function createNumberInfo(initialValue: number = 0) {
  let value = $state(initialValue);
  let label = $derived(value % 2 ? "Odd number" : "Even number");

  return {
    update(newValue: number) {
      value = newValue;
    },
    get value() {
      return value;
    },
    get label() {
      return label;
    },
  };
}
```

It’s 3 lines shorter, but more importantly,*much*simpler. We declared our state. We computed our derived state. And we send them both back, along with a method that updates our state.

You may be wondering why we did this:

```js
get value() {
    return value;
  },
  get label() {
    return label;
  }
```

rather than just referencing those properties. The reason is that*reading*that state, at any given point in time, evaluates the state rune, and, if we’re reading it in a reactive context (like a Svelte component binding, or inside of a `$derived` expression), then a subscription is set up to update any time that piece of state is updated. If we had done it like this:

```js
// this won't work
return {
  update(newValue: number) {
    value = newValue;
  },
  value,
  label,
};
```

That wouldn’t have worked because those `value` and `label` pieces of state would be *read and evaluated right there* in the return value, with those raw values getting injected into that object. They would not be reactive, and they would never update.

That’s about it! Svelte 5 ships a few universal state primitives which can be used outside of components and easily constructed into larger reactive structures. What’s especially exciting is that Svelte’s component bindings are also updated, and now support fine-grained reactivity that didn’t used to exist.

---

## Props

Defining state inside of a component isn’t too useful if you can’t pass it on to other components as props. Props are also reworked in Svelte 5 in a way that makes them simpler, and also, as we’ll see, includes a nice trick to make TypeScript integration more powerful.

Svelte 4 props were another example of hijacking existing JavaScript syntax to do something unrelated. To declare a prop on a component, you’d use the `export` keyword. It was weird, but it worked.

```html title="ChildComponent.svelte"
<script lang="ts"> export let name: string;
  export let age: number;
  export let currentValue: string; </script>

<div class="flex flex-col gap-2">
  {name} {age}
  <input bind:value={currentValue} />
</div>
```

This component created three props. It also bound the`currentValue`prop into the `<input>`, so it would change as the user typed. Then to render this component, we’d do something like this:

```html
<script lang="ts">
  import ChildComponent from "./ChildComponent.svelte";

  let currentValue = ""; 
</script>

Current value in parent: {currentValue}
<ChildComponent name="Bob" age={20} bind:currentValue />
```

This is Svelte 4, so`let currentValue = ''`is a piece of state that can change. We pass props for name and age, but we also have`bind:currentValue`which is a shorthand for`bind:currentValue={currentValue}`. This creates a*two-way binding*. As the child changes the value of this prop, it propagates the change upward, to the parent. This is a very cool feature of Svelte, but it’s also easy to misuse, so exercise caution.

If we type in the ChildComponent’s `<input>`, we’ll see `currentValue` update in the parent component.

### Svelte 5 version

Let’s see what these props look like in Svelte 5.  

```html
<script lang="ts"> 
  type Props = {
    name: string;
    age: number;
    currentValue: string;
  };

  let { age, name, currentValue = $bindable() }: Props = $props();
</script>

<div class="flex flex-col gap-2">
  {name} {age}
  <input bind:value={currentValue} />
</div>
```

The props are defined via the`$props`rune, from which we destructure the individual values.

```ts
let { age, name, currentValue = $bindable() }: Props = $props();
```

We can apply typings directly to the destructuring expression. In order to indicate that a prop*can be*(but doesn’t have to be) bound to the parent, like we saw above, we use the`$bindable`rune, like this

```js
= $bindable()
```

If you want to provide a default value, assign it to the destructured value. To assign a default value to a bindable prop, pass that value to the`$bindable`rune.

```ts
let { age = 10, name = "foo", currentValue = $bindable("bar") }: Props = $props();
```

### But wait, there’s more!

One of the most exciting changes to Svelte’s prop handling is the improved TypeScript integration. We saw that you can assign types, above. But what if we want to do something like this (in React)

```ts
type Props<T> = {
  items: T[];
  onSelect: (item: T) => void;
};
export const AutoComplete = <T,>(props: Props<T>) => {
  return null;
};
```

We want a React component that receives an array of items, as well as a callback that takes a single item (of the same type). This works in React. How would we do it in Svelte?

At first, it looks easy.

```html
<script lang="ts">
  type Props<T> = {
    items: T[];
    onSelect: (item: T) => void;
  };

  let { items, onSelect }: Props<T> = $props();
  //         Error here _________^
</script>
```

The first`T`is a generic*parameter*, which is defined as part of the`Props`type. This is fine. The problem is, we need to instantiate that generic type with an actual value for T when we attempt to use it in the destructuring. The`T`that I used there is undefined. It doesn’t exist. TypeScript has no idea what that`T`is because it hasn’t been defined.

### What changed?

Why did this work so easily with React? The reason is, React components are*functions*. You can define a generic function, and when you*call it*TypeScript will*infer*(if it can) the values of its generic types. It does this by looking at the arguments you pass to the function. With React,*rendering*a component is conceptually the same as calling it, so TypeScript is able to look at the various props you pass, and infer the generic types as needed.

Svelte components are not functions. They’re a proprietary bit of code thrown into a `.svelte` file that the Svelte compiler turns into something useful. We do still render Svelte components, and TypeScript could easily look at the props we pass, and infer back the generic types as needed. The root of the problem, though, is that we haven’t (yet) declared any generic types that are associated with the*component itself*. With React components, these are the same generic types we declare for any function. What do we do for Svelte?

Fortunately, the Svelte maintainers thought of this. You can declare generic types for the component itself with the`generics`attribute on the`<script>`tag at the top of your Svelte component:

```html
<script lang="ts" generics="T"> 
  type Props<T> = {
    items: T[];
    onSelect: (item: T) => void;
  };

  let { items, onSelect }: Props<T> = $props();
</script>
```

You can even define constraints on your generic arg:

```html
<script lang="ts" generics="T extends { name: string }">
  type Props<T> = {
    items: T[];
    onSelect: (item: T) => void;
  };

  let { items, onSelect }: Props<T> = $props();
</script>
```

TypeScript will enforce this. If you violate that constraint like this:

```html
<script lang="ts">
  import AutoComplete from "./AutoComplete.svelte";

  let items = [{ name: "Adam" }, { name: "Rich" }];
  let onSelect = (item: { id: number }) => {
    console.log(item.id);
  }; </script>

<div>
  <AutoComplete {items} {onSelect} />
</div>
```

TypeScript will let you know:

```plaintesxt title="log"
Type '(item: { id: number; }) => void' is not assignable to type '(item: { name: string; }) => void'. Types of parameters 'item' and 'item' are incompatible.  
  
Property 'id' is missing in type '{ name: string; }' but required in type '{ id: number; }'.
```

---

## Effects

Let’s wrap up with something comparatively easy: side effects. As we saw before, briefly, in Svelte 4 you could run code for side effects inside of`$:`reactive blocks

```js
$: {
  console.log(someStateValue1, someStateValue2);
}
```

That code would re-run when either of those values changed.

Svelte 5 introduces the`$effect`rune. This will run after state has changed, and been applied to the dom. It is for*side effects*. Things like resetting the scroll position after state changes. It is*not*for synchronizing state. If you’re using the`$effect`rune to synchronize state, you’re probably doing something wrong (the same goes for the`useEffect`hook in React).

The code is pretty anti-climactic.

```js
$effect(() => {
  console.log("Current count is ", count);
});
```

When this code first starts, and anytime count changes, you’ll see this log. To make it more interesting, let’s pretend we have a current timestamp value that auto-updates:

```js
let timestamp = $state(+new Date());
setInterval(() => {
  timestamp = +new Date();
}, 1000);
```

We want to include that value when we log, but we*don’t*want our effect to run whenever our timestamp changes; we only want it to run when count changes. Svelte provides an`untrack`utility for that

```js
import { untrack } from "svelte";

$effect(() => {
  let timestampValue = untrack(() => timestamp);
  console.log("Current count is ", count, "at", timestampValue);
});
```

---

## Interop

Massive upgrades where an entire app is updated to use a new framework version’s APIs are seldom feasible, so it should come as no surprise that Svelte 5 continues to support Svelte 4. You can upgrade your app incrementally. Svelte 5 components can render Svelte 4 components, and Svelte 4 components can render Svelte 5 components. The one thing you can’t do is mix and match within a single component. You cannot use reactive assignments`$:`in the same component that’s using Runes (the Svelte compiler will remind you if you forget).

Since stores are not yet deprecated, they can continue to be used in Svelte 5 components. Remember the`createNumberInfo`method from before, which returned an object with a store on it? We can use it in Svelte 5. This component is perfectly valid, and works.

```html
<script lang="ts"> 
  import { createNumberInfo } from '../svelte4/numberInfoStore';

  const numberPacket = createNumberInfo(0);

  const store = numberPacket.numberInfo;
  let junk = $state('Hello');
</script>

<span>Run value: {junk}</span>
<div>Number value: {$store.value}</div>

<button onclick={() => numberPacket.update($store.value + 1)}>Update</button>
```

But the rule against reactive assignments still holds; we cannot use one to destructure values off of stores when we’re in Svelte 5 components. We*have to*“dot through” to nested properties with things like`{$store.value}`in the binding (which always works) rather than:

```js
$: ({ value } = $store);
```

… which generates the error of:

> `$:`is not allowed in runes mode, use`$derived`or`$effect`instead

The error is even clear enough to give you another alternative to inlining those nested properties, which is to create a`$derived`state:

```js
let value = $derived($store.value);
// or let { value } = $derived($store);
```

Personally I’m not a huge fan of mixing the new`$derived`primitive with the old Svelte 4 syntax of`$store`, but that’s a matter of taste.

---

## Parting thoughts

Svelte 5 has shipped some incredibly exciting changes. We covered the new, more reliable reactivity primitives, the improved prop management with tighter TypeScript integration, and the new side effect primitive. But we haven’t come closing to covering everything. Not only are there more variations on the`$state`rune, but Svelte 5 also updated it’s event handling mechanism, and even shipped an exciting new way to re-use “snippets” of HTML.

Svelte 5 is worth a serious look for your next project.

::: info Article Series

```component VPCard
{
  "title": "Introducing Svelte 5",
  "desc": "Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). ",
  "link": "/frontendmasters.com/introducing-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Snippets in Svelte 5",
  "desc": "Out with slots, in with snippets.",
  "link": "/frontendmasters.com/snippets-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Fine-Grained Reactivity in Svelte 5",
  "desc": "Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. ",
  "link": "/frontendmasters.com/fine-grained-reactivity-in-svelte-5.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Svelte 5",
  "desc": "Svelte 5 introduces significant improvements in reactivity, state management, and prop handling, maintaining its user-friendly Developer Experience (DX). ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-svelte-5.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
