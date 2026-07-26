---
lang: en-US
title: "A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn"
description: "Article(s) > A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Shadcn
  - Tanstack
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
  - shadcn
  - tanstack
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn"
    - property: og:description
      content: "A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-guide-to-modern-react-form-architecture-tanstack-form-zod-shadcn.html
prev: /programming/js-tanstack/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Tapas Adhikary
    url: https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9383f6c8-b938-4540-83cc-42745cdbc943.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tanstack > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-tanstack/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn"
  desc="Building production-grade forms in React can be a painful experience. It's one of the parts of front-end engineering that most developers are uncomfortable with. Usually, you'll start with a simple co"
  url="https://freecodecamp.org/news/a-guide-to-modern-react-form-architecture-tanstack-form-zod-shadcn"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9383f6c8-b938-4540-83cc-42745cdbc943.png"/>

Building production-grade forms in React can be a painful experience. It's one of the parts of front-end engineering that most developers are uncomfortable with.

Usually, you'll start with a simple controlled form using the `useState` hook. But as the form grows, you realise that typing a single character into an input field triggers a re-render of the entire component tree. The application becomes sluggish and ends up creating a terrible user experience.

You might even try mitigating this re-rendering issue by switching to an uncontrolled form using the `useRef` hook. But this introduces horrible scalability issues, and as the form grows, maintaining the code becomes a nightmare.

Vibe coding might get you to a working demo, but actual engineering gets you to production. To fix these performance and scalability issues in the production apps, we need to rethink how inputs work.

In this article, we'll build a production-ready form architecture. We'll use `TanStack Form` as a headless state machine to solve the performance and scalability problems, `Zod` for bulletproof validations, and `ShadCN UI` for accessible, beautiful components.

If you're a visual learner, I've recorded a full masterclass video covering this exact architecture over on my YouTube channel, [tapaScript (<VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary). You can watch it right here:

<VidStack src="youtube/qSR6UeSKnT0" />

---

## The Problem with Traditional Forms

When developers realize that `useState` gives them the control to manage forms using React's state, they often create form components like this:

```tsx :collapsed-lines
import { useState } from "react";

export function StandardRegistrationForm() {
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  console.log("Form Re-rendered! Current state:", formData.firstName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md mx-auto mt-10 text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-red-500">The Problem</h2>
        <p className="text-sm text-neutral-400">Standard Controlled Form</p>
      </div>

      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            First Name
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            Last Name
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-red-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full mt-4 bg-neutral-800 text-neutral-400 py-2 rounded-md font-bold cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
```

The component uses a centralized `useState` object, which is the standard way most developers are taught to build forms. The moment a value changes for any input fields, the state gets updated.

In React, every time you update a state, the component re-renders to display the current state value. This introduces a performance issue that you need to solve.

The image below shows the exact performance problem of the form component getting re-rendered with every keystroke inside the input elements.

![The component re-rendering](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/e80e63f0-96c3-4a7d-bd39-6c13ccc71282.gif)

### The Uncontrolled "Ref" Workaround

Acknowledging the problem we've seen with the controlled form component, devs found a workaround. Instead of using state, if we use ref, the components don't re-render on ref's current value changes. That sounds like an AHA! moment until we figure out that it introduces completely different architectural headaches.

Here's the same form, but managed using refs instead of states:

```tsx :collapsed-lines
import { useRef } from "react";

export function RefRegistrationForm() {
 
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  console.log("Form Rendered (Notice it doesn't log when typing)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
    };

    console.log("Submitted Data:", formData);

  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-md mx-auto mt-10 text-white">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-orange-500">The Ref Workaround</h2>
        <p className="text-sm text-neutral-400">Fast, but scales horribly.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            First Name
          </label>
          <input
            name="firstName"
            ref={firstNameRef} // Attaching the ref
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            Last Name
          </label>
          <input
            name="lastName"
            ref={lastNameRef} // Attaching the ref
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            ref={emailRef} // Attaching the ref
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-orange-600 hover:bg-orange-500 py-2 rounded-md font-bold transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
```

Let's talk about the problems with this approach:

- The Ref Soup: We've created a separate ref for every single input. Imagine this form grows to 20+ fields, and you have to manage all those refs!
- We need to extract the data manually and stitch the object back together. There's no mechanism like `setState()` that exists here.
- How do we do real-time validation? Since the field/component doesn't re-render here as you type, showing a dynamic error message under the inputs becomes incredibly hard without introducing new state variables, and doing that would defeat the whole purpose of refs.

### Why Not Just Use Native HTML Forms?

Oh yes! We shouldn't ignore this possibility as well. Why use a library at all? Can't we just use native HTML forms and grab the data with FormData on submit?

If you're building a simple "Contact Us" or "Login Form", the native HTML forms are actually the best tool for the job. They're lean, require zero library knowledge, and are incredibly efficient.

But for complex, production-grade web applications, the native approach quickly hits a wall:

1. Complex data structures: `FormData` is a flat object. If you're dealing with deeply nested objects or dynamic arrays, manually parsing `speakers[0][firstName]` out of a flat FormData object could be messy.
2. Dynamic UI: If you have a requirement where Field B should appear if Field A is set to "Yes", you need client-side state to track Field A's value anyway. FormData only exists at the exact moment of submission.
3. UX & Real-time Validations: Native HTML validations are rigid and hard to style cleanly across browsers. If you need complex cross-field validations (like confirming passwords match) or async validations (checking if a username is taken while the user types), you need JavaScript.

When native forms aren't enough, we move to React.

---

## Introducing TanStack Form

[<VPIcon icon="iconfont icon-tanstack"/>TanStack Form](https://tanstack.com/form/latest) is a headless state machine for your inputs. It gives you the strict typing and easy data management of a controlled form, but uses fine-grained reactivity to ensure that only the specific field you're typing in re-renders, and nothing else.

Let's set it up in a modern Vite + TypeScript environment. First, install the TanStack Form using this command:

```sh
npm i @tanstack/react-form # Or use, equivallent yarn, pnpm commands
```

Instead of a massive list of individual state hooks, you just need the `useForm` hook to spin up the form engine:

```tsx :collapsed-lines
import { useForm } from '@tanstack/react-form';

export function SpeakerForm() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      twitterHandle: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Form Submitted!', value);
    },
  });

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md mx-auto text-white">
      <h2 className="text-xl font-bold mb-6">Add New Speaker</h2>
      {/* We will build the fields here */}
    </div>
  );
}
```

Notice the `defaultValues`. TanStack Form automatically infers your entire form structure from this object. If you try to reference an invalid field name later, TypeScript will throw an error immediately.

---

## Fine-Grained Reactivity

Let's now connect the form inputs to the engine. To do that, we need to wrap them in TanStack's `Field` component. This uses the standard JSX [<VPIcon icon="fa-brands fa-youtube"/>render prop pattern](https://youtu.be/tIdJj0n1mg4) to pass the isolated field state directly into our UI.

```tsx :collapsed-lines
<form
  onSubmit={(e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }}
  className="space-y-4"
>
  <form.Field name="firstName">
    {(field) => {
      // PROOF: This log will only fire when firstName changes!
      console.log("Rendering First Name Field");
      
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={field.name} className="text-sm text-neutral-300">
            First Name
          </label>
          <input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            className="p-2 rounded-md bg-neutral-950 border border-neutral-700 focus:border-emerald-500 outline-none"
          />
        </div>
      );
    }}
  </form.Field>
  
  <button type="submit" className="w-full mt-4 bg-emerald-600 py-2 rounded-md font-bold">
    Save Speaker
  </button>
</form>
```

If you place a `console.log` in the parent component and one inside the field, you'll see the magic. When you type in the First Name input, the parent component doesn't re-render. Here's a visual of only the form field re-rendering.

![TanStack Form](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/0ffbaa73-0d42-41d7-bbb3-eeb12e51ad62.gif)

The state update is strictly isolated to the function inside that specific `Field` component.

---

## Validation with Zod

A form is only useful if it has field validations. In the current ecosystem, [<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev/) is the industry standard. First, install Zod and the zod form adapter.

```sh
npm i zod @tanstack/zod-form-adapter # Or use, equivallent yarn, pnpm commands
```

Then inject the Zod adapter into your form engine:

```ts
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

// Inside your component...
const form = useForm({
  defaultValues: { firstName: '', lastName: '' },
  validatorAdapter: zodValidator(),
  onSubmit: async ({ value }) => { /* ... */ },
});
```

Next, we'll update our field to use Zod rules. Here we opted for a rule that the first name must be at least 2 characters. Also, by checking the `field.state.meta.isTouched`, we ensure the error only shows after the user interacts with the input.

```tsx :collapsed-lines
<form.Field
  name="firstName"
  validators={{
    onChange: z.string().min(2, "First name must be at least 2 characters"),
  }}
>
  {(field) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className="text-neutral-300">
        First Name
      </label>
      
      <input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="bg-neutral-950 border-neutral-700 focus-visible:ring-emerald-500"
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500 text-xs">
        {
           field.state.meta.errors.map((error) =>  error.message)
         }
        </em>) : null}
    
    </div>
  )}
</form.Field>
```

The image below shows how the error message appears below the field when the First Name field value is changed and it fails validation.

![Form Validation](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/13ec370d-68d9-450e-badc-5a0269816231.png)

---

## Headless TanStack Form with ShadCN UI

TanStack Form is headless. This means you can map it to any design system seamlessly. Let's take one of the modern design systems available today: [<VPIcon icon="iconfont icon-shadcn"/>ShadCN UI](https://ui.shadcn.com/).

If you are using a Vite-TypeScript-based React project, you can integrate the ShadCN UI in a few simple steps:

First, open the `tsconfig.json` file and add this compiler option:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
```

Then open the `vite.config.json` file and add the mapping for the `@` alias:

```ts
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

Install shadcn and its components like label, input, and button:

```sh
npx shadcn@latest add input label button
```

Now, you can import these ShadCN components into your form component and replace the native HTML label, input, and button.

```tsx :collapsed-lines
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<form.Field
  name="firstName"
  validators={{
    onChange: z.string().min(2, "First name must be at least 2 characters"),
  }}
>
  {(field) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name} className="text-neutral-300">
        First Name
      </Label>
      
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className="bg-neutral-950 border-neutral-700 focus-visible:ring-emerald-500"
      />
      
       {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500 text-xs">
        {
           field.state.meta.errors.map((error) =>  error.message)
         }
        </em>) : null}
    
    </div>
  )}
</form.Field>
```

---

## Handling Nested Dynamic Arrays with TanStack Form

Suppose we're building a speaker form for a meetup. What if we want to feature multiple speakers for a talk in our meetup? Now we need to manage a data structure to hold more than one speaker's details. We'll need an array of objects.

In classic React, managing an array of objects with complex states leads to spaghetti code. TanStack Form treats arrays exactly like a typical form field. We just need to update our `defaultValues` to an array:

```ts
defaultValues: {
  speakers: [ { firstName: '', lastName: '' } ],
},
```

Now, set the mode to `array` on your field and map over it:

```tsx :collapsed-lines
<form.Field name="speakers" mode="array">
  {(field) => (
    <div className="space-y-6">
      {field.state.value.map((_, index) => (
        <div key={index} className="p-4 border border-neutral-800 rounded-lg relative">
          
          <div className="grid grid-cols-2 gap-4">
            {/* Nested Fields use bracket notation! */}
            <form.Field name={`speakers[${index}].firstName`}>
              {(subField) => (
                 <div>
                    <Label>First Name</Label>
                    <Input 
                      value={subField.state.value} 
                      onChange={(e) => subField.handleChange(e.target.value)} 
                    />
                 </div>
              )}
            </form.Field>
          </div>

          {/* Remove Button */}
          {field.state.value.length > 1 && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={() => field.removeValue(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      
      {/* Add Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => field.pushValue({ firstName: '', lastName: '' })}
      >
        + Add Speaker
      </Button>
    </div>
  )}
</form.Field>
```

To append data, we call `field.pushValue()` and to remove, we call `field.removeValue(index)`. Typing into the newest row leaves the previous array fields completely static. It's incredibly performant.

![Array of Object](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/2a5552f6-2103-441f-ac47-758796985eae.png)

The image above shows the multi-speaker form and its output when submitted.

---

## TanStack Form's Granular Reactivity: `useSelector` vs `form.Subscribe`

Sometimes, you need to access form state outside an input. For example, you want to show the "Unsaved Changes!" notification the moment the user changes the value in the input fields.

Notice that here the notification is outside the form, but it solely depends on the form field values.

![unsaved data](https://cdn.hashnode.com/uploads/covers/5c9bb4026656f09759cdc1f0/e22c66a8-7ebc-40df-b598-fe91eb257182.png)

TanStack gives you two distinct tools for this, and knowing when to use them is the key to mastering this architecture.

### With `useSelector()`

If the state change affects the macro-layout of your page (like showing a global "unsaved Changes" banner like the above), you want the parent component to re-render. We'll use the standalone `useSelector()` hook for this:

```tsx
import { useForm, useSelector } from "@tanstack/react-form";

export function ReactivityDemo() {
  const form = useForm({ defaultValues: { bio: "" } });

  // This isolates the exact piece of state we want the parent to track
  const isFormDirty = useSelector(form.store, (state) => state.isDirty);

  return (
    <div className="relative">
      {isFormDirty && (
        <div className="absolute top-0 w-full bg-orange-500 text-center">
          Unsaved Changes!
        </div>
      )}
      {/* Form goes here */}
    </div>
  );
}
```

### With `form.Subscribe()`

If the state change only affects a micro-interaction like disabling a submit button while the form is being saved, we don't want the whole form to re-render. In that case, we wrap the button tightly inside `<form.Subscribe>`.

```tsx
<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
  {([canSubmit, isSubmitting]) => (
    <Button
      type="submit"
      disabled={!canSubmit || isSubmitting}
      className="w-full mt-4"
    >
      {isSubmitting ? "Saving..." : "Save Changes"}
    </Button>
  )}
</form.Subscribe>
```

This isolates the re-render exclusively to the button. The rest of the component stays completely undisturbed.

---

## TanStack Form vs. React Hook Form

If you've been building React applications for a while, you're probably thinking: "Why not just use React Hook Form?"

`React Hook Form` is an extraordinary library and has been the industry standard for years. It solves the performance problem by leveraging uncontrolled components and `useRef` under the hood. It isolates re-renders perfectly and handles validation well.

But as applications scale in complexity, the TanStack Form architecture offers three distinct advantages over React Hook Form:

### Dynamic Arrays

If you've ever built a complex form with React Hook Form that needs dynamic, nested arrays (like adding multiple speakers in our example above), you probably need a hook like `useFieldArray`. Managing complex useFieldArray implementations often needs huge boilerplate, careful index tracking, and jumping through to maintain strict TypeScript safety deep within the tree.

TanStack Form eliminates this. It treats arrays the same as a string input. The form is a centralized state machine: you simply inform a field that it has a `mode=array`, and you instantly get access to `pushValue()` and `removeValue()` along with deeply nested type-safety.

### Deeply Nested Components

React Hook Form relies on uncontrolled inputs to achieve performance. While this is fast, passing refs around deeply nested component trees can get messy, especially when integrating with complex UI libraries.

TanStack Form gives us the strict, predictable architecture of a controlled component but uses fine-grained reactivity to ensure only the specific parts of the UI that change are re-rendered.

### The Ecosystem Sync

If you're moving towards modern, production-ready stacks using TanStack Query (React Query) for data fetching and TanStack Router for navigation, TanStack Form shares the exact same mental model and family. It integrates seamlessly into the ecosystem, providing a unified DX across your entire application architecture.

---

## Conclusion & Important Resources

By combining TanStack Form, Zod, and ShadCN UI, we've created a strictly typed, reactive, production-ready form architecture that handles everything from basic text inputs to complex nested arrays without sacrificing any bit of performance.

You can grab the complete starter code and the final project from my GitHub:

- All the source code used in the article and the complete project source code: [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`11-tanstack-form` (<VPIcon icon="iconfont icon-github"/>`tapascript/full-stack-vibe-to-prod`)](https://github.com/tapascript/full-stack-vibe-to-prod/tree/main/11-tanstack-form)
- A code scaffolding repo for React projects using TypeScript, Vite, and TailwindCSS: [<VPIcon icon="iconfont icon-github"/>`atapas/code-react19-ts`](https://github.com/atapas/code-react19-ts)

::: info

If you found this helpful, you'll find these two in-depth video tutorials helpful, too:

<VidStack src="youtube/9VnPRZ0F7yc" />

<VidStack src="youtube/Hu1dtgK_CkU" />


:::

::: info If You've Read This Far...

Thank You!

I'm thrilled to announce that I've started a [<VPIcon icon="fa-brands fa-youtube"/>Full Stack FREE Course](https://youtube.com/playlist?list=PLIJrr73KDmRwySan3tObLmLZp0NYWSmCT) to take developers from vibe coding to a production-ready mental model. I'd be delighted if you check it out and take part.

- Subscribe to my [YouTube Channel <VPIcon icon="fa-brands fa-youtube"/>`tapasadhikary`](https://youtube.com/tapasadhikary)
- Follow on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://x.com/tapasadhikary)
- Catch up with my [<VPIcon icon="fas fa-globe"/>React Clean Code Rules Book](https://tapascript.io/books/react-clean-code-rule-book)
- All the source code used in this article is on my [GitHub Repository (<VPIcon icon="iconfont icon-github"/>`tapascript/full-stack-vibe-to-prod`)](https://github.com/tapascript/full-stack-vibe-to-prod).

See you soon with my next article. Until then, please take care of yourself and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Guide to Modern React Form Architecture: TanStack Form + Zod + Shadcn",
  "desc": "Building production-grade forms in React can be a painful experience. It's one of the parts of front-end engineering that most developers are uncomfortable with. Usually, you'll start with a simple co",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-guide-to-modern-react-form-architecture-tanstack-form-zod-shadcn.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
