---
lang: en-US
title: "Fine-Grained Reactivity in Svelte 5"
description: "Article(s) > Fine-Grained Reactivity in Svelte 5"
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
      content: "Article(s) > Fine-Grained Reactivity in Svelte 5"
    - property: og:description
      content: "Fine-Grained Reactivity in Svelte 5"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/fine-grained-reactivity-in-svelte-5.html
prev: /programming/js-svelte/articles/README.md
date: 2024-08-14
isOriginal: false
author: Adam Rackis
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3438
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
  name="Fine-Grained Reactivity in Svelte 5"
  desc="Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. "
  url="https://frontendmasters.com/blog/fine-grained-reactivity-in-svelte-5"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3438"/>

We’ve been looking at the up and coming Svelte 5. We looked at basic features like state, props, and side effects. Then we looked at Snippets, which is a lightweight feature Svelte added for re-using bits of HTML within (for now) a single component.

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

In this post, we’ll take a close look at Svelte’s new fine-grained reactivity.

---

## What is fine-grained reactivity?

The best way to describe fine-grained reactivity is to show what it isn’t, and the best example of non-fine grained reactivity is React. In React, in *any* component, setting a single piece of state will cause the entire component, and all of the descendent components to re-render (unless they’re created with `React.memo`). Even if the state you’re setting is rendered in a single, simple `<span>` tag in the component, and not used anywhere else at all, the entire world from that component on down will be re-rendered.

This may seem absurdly wasteful, but in reality this is a consequence of the design features that made React popular when it was new: the data, values, callbacks, etc., that we pass through our component trees are all plain JavaScript. We pass plain, vanilla JavaScript objects, arrays and functions around our components and everything just works. At the time, this made an incredibly compelling case for React compared to alternatives like Angular 1 and Knockout. But since then, alternatives like Svelte have closed the gap. My[first post](/frontendmasters.com/introducing-svelte-5.md)on Svelte 5 showed just how simple, flexible, and most importantly *reliable* Svlete’s new state management primitives are. This post will show you the performance wins these primitives buy us.

---

## Premature optimization is still bad

This post will walk through some Svelte templates using trickery to snoop on just how much of a component is being re-rendered when we change state. This is**not**something you will usually do or care about. As always, write clear, understandable code, then optimize when needed (not before). Svelte 4 is considerably less efficient than Svelte 5, but still much more performant than what React does out of the box. And React is more than fast enough for the overwhelming majority of use cases —so it’s all relative.

Being *fast enough* doesn’t mean we can’t still look at how much of a better performance baseline Svelte now starts you off at. With a fast-growing ecosystem, and now an incredibly compelling performance story, hopefully this post will encourage you to at least look at Svelte for your next project.

If you’d like to try out the code we’ll be looking at in this post, it’s all in[this repo](https://github.com/arackaf/svelte-fine-grained-reactivity).

---

## Getting started

The code we’ll be looking at is from a [<VPIcon icon="iconfont icon-svelte"/>SvelteKit scaffolded project](https://kit.svelte.dev/docs/creating-a-project). If you’ve never used Svelte*Kit*before that’s totally fine. We’re not really using any SvelteKit features until the very end of this post, and even then it’s just re-hashing what we’ll have already covered.

Throughout this post, we’re going to be inspecting if and when individual bindings in a component are re-evaluated when we change state. There’s various ways to do this, but the simplest, and frankly *dumbest*, is to force some global, non-reactive, always-changing state into these bindings. What do I mean by that? In the root page that hosts our site, I’m adding this:

```html
<script>
  var __i = 0;
  var getCounter = () => __i++; 
</script>
```

This adds a global`getCounter`function, as well as the`__i`variable.`getCounter`will always return the next value, and if we stick a call to it in our bindings, we’ll be able to snoop on when those bindings are being re-executed by Svelte. If you’re using TypeScript, you can avoid errors when calling this like so:

```ts
declare global {
  interface Window {
    getCounter(): number;
  }
}

export {};
```

This post will look at different pages binding to the same data, declared mostly like this (we’ll note differences as we go).

```ts
let tasks = [
  { id: 1, title: "Task A", assigned: "Adam", importance: "Low" },
  { id: 2, title: "Task B", assigned: "Adam", importance: "Medium" },
  { id: 3, title: "Task C", assigned: "Adam", importance: "High" },
  { id: 4, title: "Task D", assigned: "Mike", importance: "Medium" },
  { id: 5, title: "Task E", assigned: "Adam", importance: "High" },
  { id: 6, title: "Task F", assigned: "Adam", importance: "High" },
  { id: 7, title: "Task G", assigned: "Steve", importance: "Low" },
  { id: 8, title: "Task H", assigned: "Adam", importance: "High" },
  { id: 9, title: "Task I", assigned: "Adam", importance: "Low" },
  { id: 10, title: "Task J", assigned: "Mark", importance: "High" },
  { id: 11, title: "Task K", assigned: "Adam", importance: "Medium" },
  { id: 12, title: "Task L", assigned: "Adam", importance: "High" },
];
```

And we’ll render these tasks with this markup:

```html :collapsed-lines
<div>
  {#each tasks as t}
    <div>
      <div>
        <span>{t.id + getCounter()}</span>
        <button onclick={() => (t.id += 10)} class="border p-2">Update id</button>
     </div>
     <div>
       <span>{t.title + getCounter()}</span>
       <button onclick={() => (t.title += 'X')} class="border p-2">Update title</button>
     </div>
     <div>
        <span>{t.assigned + getCounter()}</span>
        <button onclick={() => (t.assigned += 'X')} class="border p-2">Update assigned</button>
      </div>
      <div>
        <span>{t.importance + getCounter()}</span>
        <button onclick={() => (t.importance += 'X')} class="border p-2">Update importance</button>
      </div>
    </div>
  {/each}
</div>
```

The Svelte 4 code we’ll start with uses the`on:click`syntax for events, but everything else will be the same.

The calls to`getCounter` inside the bindings will let us see when those bindings are re-executed, since the call to`getCounter()`will always return a new value.

Let’s get started!

---

## Svelte 4

We’ll render the content we saw above, using Svelte 4. 

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte4.png?resize=1024%2C399&ssl=1)

Plain and simple. But now let’s click any of those buttons, to modify one property, of one of those tasks—it doesn’t matter which.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte4-updated.png?resize=1024%2C387&ssl=1)

Notice that the entire component (every binding in the component) re-rendered. As inefficient as this seems, it’s*still*much better than what React does. It’s not remotely uncommon for a single state update to trigger*multiple*re-renders of*many*components.

Let’s see how Svelte 5 improves things.

---

## Svelte 5

For Svelte 5, the code is pretty much the same, except we declare our state like this:

```js
let tasks = $state([
  { id: 1, title: "Task A", assigned: "Adam", importance: "Low" },
  <em>// and so on ...</em>
  { id: 12, title: "Task L", assigned: "Adam", importance: "High" },
]);
```

We render the page, and see the same as before. If you’re following along in the repo, be sure to refresh the page after navigating, so the page will start over with the global counter.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte5.png?resize=1024%2C395&ssl=1)

Now let’s change one piece of state, as before. We’ll update the title for Task C, the third one.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte5-updated.png?resize=1024%2C392&ssl=1)

Just like that, only the *single* piece of state we modified has re-rendered. Svelte was smart enough to leave everything else alone. 99% of the time this won’t make any difference, but if you’re rendering a*lot*of data on a page, this can be a substantial performance win.

### Why did this happen?

This is the default behavior when we pass arrays and objects (and arrays of objects) into the`$state`rune, like we did with:

```js
let tasks = $state([
```

Svelte will read everything you pass, set up[<VPIcon icon="fa-brands fa-firefox"/>Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)objects to track what changes, and update the absolute minimum amount of DOM nodes necessary.

---

## False Coda

We could end the post here. Use the`$state`primitive to track your reactive data. Svelte will make it deeply reactive, and update whatever it needs to update when you change anything. This will be*just fine*the vast majority of the time.

But what if you’re writing a web application that has to manage a*ton*of data? Making everything deeply reactive is not without cost.

Let’s see how we can tell Svelte that only*some of*our data is reactive. I’ll stress again, laboring over this will almost never be needed. But it’s good to know how it works if it ever comes up.

---

## Rediscovering a long-lost JavaScript feature

Classes in JavaScript have gotten an unfortunately bad reputation. Classes are an outstanding way to declare the*structure*of a set of objects, which also happen to come with a built-in factory function for creating those objects. Not only that, but TypeScript is deeply integrated with them.

You can declare:

```ts
class Person {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
```

Not only will this provide you a factory function for creating instances of a Person, via`new Person('Adam', 'Rackis')`, but`Person`can also be used as a type within TypeScript. You can create variables or function parameters of type`Person`. It’s one of the few things that exist as a runtime construct and *also* a TypeScript type.

That said, if you find yourself reaching for`extends`in order to create deep inheritance hierarchies with classes, please please re-think your decisions.

Anyway, why am I bringing up classes in this post?

---

## Fine-grained reactivity in Svelte 5

If you have a performance-sensitive section of code where you need to mark some properties as non-reactive, you can do this by creating class instances rather than vanilla JavaScript objects. Let’s define a Task class for our tasks. For the properties we*want to*be reactive, we’ll set default values with the`$state()`rune. For properties we*don’t*want to be reactive, we won’t.

```js
class Task {
  id: number = 0;
  title = $state("");
  assigned = $state("");
  importance = $state("");

  constructor(data: Task) {
    Object.assign(this, data);
  }
}
```

And then we just use that class

```js
let tasks = $state([
  new Task({ id: 1, title: "Task A", assigned: "Adam", importance: "Low" }),
  <em>// and so on</em>
  new Task({ id: 12, title: "Task L", assigned: "Adam", importance: "High" }),
]);
```

I simplified the class a bit by taking a raw object with all the properties of the class, and assigning those properties with`Object.assign`. The object literal is typed in the constructor as`Task`, the same as the class, but that’s fine because of TypeScript’s[<VPIcon icon="fas fa-globe"/>structural typing](https://css-tricks.com/typescript-discriminated-unions/).

When we run that, we’ll see the same exact thing as before, except clicking the button to change the `id` will not re-render anything at all in our Svelte component. To be clear, the`id`is still changing, but Svelte is not re-rendering. This demonstrates Svelte intelligently not wiring any kind of observability into that particular property.

Side note: if you wanted to encapsulate / protect the`id`, you could declare `id` as`#id`to make it a[<VPIcon icon="fa-brands fa-firefox"/>private property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)and then expose the value with a getter function.

---

## Going deeper

What if you don’t want these tasks to be reactive at the individual property at all? What if we have a*lot*of these tasks coming down, and you’re not going to be editing them? So rather than have Svelte set up reactivity for each of the tasks’ properties, you just want the array itself to be reactive.

You basically want to be able to add or remove entries in your array, and have Svelte update the tasks that are rendered. But you don’t want Svelte setting up any kind of reactivity for each property on each task.

This is a common enough use case that other state management systems support this directly, for example, MobX’s[<VPIcon icon="fas fa-globe"/>`observable.shallow`](https://mobx.js.org/observable-state.html#available-annotations). Unfortunately Svelte does not have any such helper, as of yet. That said, it*is*currently being debated, so keep your eyes open for a`$state.shallow()`that would do what we’re about to show. But even if it does get added, implementing it ourselves will be a great way to kick the tires of Svelte’s new reactivity system. Let’s see how.

### Implementing our own `$state.shallow()` equivalent

We already saw how passing class instances to an array shut off fine-grained reactivity by default, leaving you to opt-in, as desired, by setting class fields to`$state()`. But our data are likely coming from a database, as plain (hopefully typed) JavaScript objects, unrelated to any class; more importantly we likely have zero desire to cobble together a class just for this.

So let’s simulate it. Let’s say that a database is providing our Task objects as JS objects. We (of course) have a type for this:

```ts
type Task = {
  id: number;
  title: string;
  assigned: string;
  importance: string;
};
```

We want to put those instances into an array that itself is reactive, but not the individual properties on the tasks. With a tiny bit of cleverness we can make it mostly painless.

```ts
class NonReactiveObjectGenerator {
  constructor(data: unknown) {
    Object.assign(this, data);
  }
}

function shallowObservable<T>(data: T[]): T[] {
  let result = $state(data.map(t => new NonReactiveObjectGenerator(t) as T));
  return result;
}
```

Our`NonReactiveObjectGenerator`class takes in any object, and then smears all that object’s properties onto itself. And our`shallowObservable`takes an array of whatever, and maps it onto instances of our`NonReactiveObjectGenerator`class. This will force each instance to be a class instance, with nothing reactive. The`as T`is us forcing TypeScript to treat these new instances as whatever type was passed in. This is accurate, but something TypeScript needs help understanding, since it’s not (as of now) able to read and understand our call to`Object.assign`in the class constructor.

If you closely read my[first post](/frontendmasters.com/introducing-svelte-5.md#state)on Svelte 5, you might recall that you can’t directly return reactive state from a function, since the state will be read and unwrapped right at the call-site, and won’t be reactive any longer. Normally you’d have to do this:

```ts
return {
  get value() {
    return result;
  },
  set value(newData: T[]) {
    result = newData;
  },
};
```

Why wasn’t that needed here? It’s true, the`$state()`value will be read at the function’s call site. So with…

```js
let tasks = shallowObservable(getTasks());
```

…the tasks*variable*will not be reactive. But the array itself will still be fully reactive. We can still call `push`, `pop`, `splice` and so on. If you can live without needing to re-assign to the variable, this is much simpler. But even if you do need to set the tasks variable to a fresh array of values, you still don’t even need to use variable assignment. Stay tuned.

I changed the initial tasks array to help out in a minute, but the rest is what you’d expect.

```js
const getTasks = () => [
  { id: 1, title: "Task A", assigned: "Adam", importance: "Low" },
  <em>// ...</em>
  { id: 12, title: "Task L", assigned: "Adam", importance: "High" },
];

let tasks = shallowObservable(getTasks());
```

And with that, rendering should now work, and none of our properties are reactive. Clicking the edit buttons do nothing.

But we can now add a button to push a new task onto our array.

```tsx
<button
  onclick={() =>
    tasks.value.push(
      new NonReactiveObjectGenerator({
        id: nextId++,
        title: 'New task',
        assigned: 'Adam',
        importance: 'Low'
      }) as Task
    )}
>
  Add new task
</button>
```

We can even add a delete button to each row.

```tsx
<button onclick={() => tasks.value.splice(idx, 1)}>
  Delete
</button>
```

Yes, Svelte’s reactive array is smart enough to understand push and splice.

### Editing tasks this way

You might be wondering if we can still actually edit the individual tasks. We assumed the tasks would be read-only, but what if that changes? We’ve been modifying the array and watching Svelte re-render correctly. Can’t we edit an individual task by just cloning the task, updating it, and then re-assigning to that index? The answer is yes, with a tiny caveat.

Overriding an array index (with a*new*object instance) does work, and makes Svelte update. But we can’t just do this:

```js
tasks[idx] = { ...t, importance: "X" + t };
```

Since that would make the new object, which is an object literal, deeply reactive. We have to keep using our class. This time, to keep the typings simple, and to keep the code smell that is the `NonReactiveObjectGenerator` class hidden as much as possible, I wrote up a helper function.

```ts
function cloneNonReactive<T>(data: T): T {
  return new NonReactiveObjectGenerator(data) as T;
}
```

As before, the type assertion is unfortunately needed. This same function could also be used for the add function we saw above, if you prefer.

To prove editing works, we’ll leave the entire template alone, except for the`importance`field, which we’ll modify like so

```jsx
<div>
    <span>{t.importance + getCounter()}</span>
    <button
      onclick={() => {
        const taskClone = cloneNonReactive(t);
        taskClone.importance += 'X';
        tasks[idx] = cloneNonReactive(taskClone);
      }}
    >
      Update importance
    </button>
</div>
```

Now running shows everything as it’s always been.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte5-shallow.png?resize=1024%2C470&ssl=1)

If we click the button to change the id, title or assigned value, nothing changes, because we’re still mutating those properties directly (since I didn’t change anything) in order to demonstrate that they’re not reactive. But clicking the button to update the importance field runs the code above, and updates the*entire*row, showing any other changes we’ve made.

Here I clicked the button to update the title, twice, and then clicked the button to update the importance. The former did nothing, but the latter updated the component to show all changes.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/08/svelte5-shallow-updated.png?resize=1024%2C457&ssl=1)

### tasks array

We saved a bit of convenience by returning our state value directly from our `shallowObservable` helper, but at the expense of not being able to assign directly to our array. Or did we?

If you know a bit of JavaScript, you might know…

```js
tasks.length = 0;
```

…is the old school way to clear an array. That works with Svelte; the Proxy object Svelte sets up to make our array observable works with that. Similarly, we can set the array to a fully new array of values (after clearing it like we just saw) like this:

```js
tasks.push(...newArray);
```

It’s up to you which approach you take, but hopefully Svelte ships a`$state.shallow`to provide the best of both worlds: the array would be reactive, and so would the binding, since we don’t have to pass it across a function boundary; it would be built directly into`$state`.

---

## SvelteKit

Let’s wrap up by briefly talking about how data from SvelteKit loaders is treated in terms of reactivity. In short, it’s exactly how you’d expect. First and foremost, if you return a raw array of objects from your loader like this:

```js
export const load = () => {
  return {
    tasks: [
      { id: 1, title: "Task A", assigned: "Adam", importance: "Low" },
      <em>// ...</em>
      { id: 12, title: "Task L", assigned: "Adam", importance: "High" },
    ],
  };
};
```

Then none of that data will be reactive in your component. This is to be expected. To make data reactive, you need to wrap it in`$state()`. As of now, you can’t call`$state`in a loader, only in a universal Svelte file (something that ends in`.svelte.ts`). Hopefully in the future Svelte will allow us to have loaders named`+page.svelte.ts`but for now we can throw something like this in a`reactive-utils.svelte.ts`file.

```ts
export const makeReactive = <T>(arg: T[]): T[] => {
  let result = $state(arg);
  return result;
};
```

Then import it and use it in our loader.

```tsx
import { makeReactive } from "./reactive-utils.svelte";

export const load = () => {
  return {
    tasks: makeReactive([
      { id: 1, title: "Task A", assigned: "Adam", importance: "Low" },
      <em>// ...</em>
      { id: 12, title: "Task L", assigned: "Adam", importance: "High" },
    ]),
  };
};
```

Now those objects will support the same fine-grained reactivity we saw before. To customize which properties are reactive, you’d swap in class instances, instead of vanilla object literals, again just like we saw. All the same rules apply.

If you’re wondering why we did this…

```ts
export const makeReactive = <T>(arg: T[]): T[] => {
  let result = $state(arg);
  return result;
};
```

…rather than this…

```ts
export const makeReactive = <T>(arg: T[]): T[] => {
  return $state(arg);
};
```

… the answer is that the latter is simply disallowed. Svelte forces you to only put`$state()`calls into assignments. It cannot appear as a return value like this. The reason is that while returning $state variables directly across a function boundary works fine for objects and arrays, doing this for primitive values (strings or numbers) would produce a senseless result. The variable could not be re-assigned (same as we saw with the array), but as a primitive, there’d be no other way to edit it. It would just be a non-reactive constant.

Svelte forcing you to take that extra step, and assign $state to a variable before returning, is intended to help prevent you from making that mistake.

---

## Wrapping up

One of the most exciting features of Svelte 5 is the fine-grained reactivity it adds. Svelte was already lightweight, and faster than most, if not all of the alternatives. These additions in version 5 only improve on that. When added to the state management improvements we’ve already covered in prior posts, Svelte 5 really becomes a serious framework option.

Consider it for your next project.

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
  "title": "Fine-Grained Reactivity in Svelte 5",
  "desc": "Svelte is already quite lightweight and fast, but Svelte 5 still overs big improvements in fine-grained reactivity, meaning re-rendering as absolutely little as possible. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/fine-grained-reactivity-in-svelte-5.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
