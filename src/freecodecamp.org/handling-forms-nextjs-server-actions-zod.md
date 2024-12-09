---
lang: en-US
title: "How to Handle Forms in Next.js with Server Actions and Zod for Validation"
description: "Article(s) > How to Handle Forms in Next.js with Server Actions and Zod for Validation"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle Forms in Next.js with Server Actions and Zod for Validation"
    - property: og:description
      content: "How to Handle Forms in Next.js with Server Actions and Zod for Validation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/handling-forms-nextjs-server-actions-zod.html
prev: /programming/js-next/articles/README.md
date: 2024-11-23
isOriginal: false
author: Chidera Humphrey
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732137561737/293681e0-d2f4-4d88-9fbe-f7e5e9113554.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Handle Forms in Next.js with Server Actions and Zod for Validation"
  desc="Forms are essential in modern websites, as they help you collect your users’ information. So knowing how to handle forms properly is crucial when you’re building web applications. In this article, you will learn how to handle forms in Next.js using s..."
  url="https://freecodecamp.org/news/handling-forms-nextjs-server-actions-zod"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732137561737/293681e0-d2f4-4d88-9fbe-f7e5e9113554.png"/>

Forms are essential in modern websites, as they help you collect your users’ information. So knowing how to handle forms properly is crucial when you’re building web applications.

In this article, you will learn how to handle forms in Next.js using server actions and zod.

---

## Prerequisites and Setting Up the Project

For this tutorial, I assume that you know JavaScript and how to set up a Next.js project (I'm not going to walk through that set up here).

If you haven’t yet set up your Next.js project, use the following command and follow the prompts:

```sh
npx create-next-app
```

This is what we are going to build in this tutorial:

![working form](https://cdn.hashnode.com/res/hashnode/image/upload/v1732051133068/960bd90a-cb22-4e8b-86e2-fdb78b5cf330.gif)

::: note

This tutorial mainly focuses on the logic and not the design. For the complete design, you can visit the GitHub repository which I’ve linked to at the end.

:::

---

## Introduction to Server Actions in Next.js

So what are server actions? Server actions are pretty much what they sound like—actions or functions that run on the server. With server actions, you can make calls to external APIs or fetch data from a database.

Prior to Next.js 13, you had to use routes to handle API calls and form submissions. This was complex and cumbersome.

But the introduction of server actions lets you communicate with external APIs and databases directly in your Next.js components.

By running on the server, server actions enable secure handling of data processing, mitigating security risks.

Server actions are also useful in handling forms as they let you communicate directly with your server and limit the exposure of important credentials to the client.

There are two ways to create server actions:

- The first method is using the `"use server"` directive at the top level of a function. You can only use this method inside a server component. Using it inside a client component will result in an error.

::: tip Example

```ts{2}
async function getPosts() {
  "use server"; // this makes getPosts a server actions

  // rest of code
}
```

:::

- The other method is to create a separate file and add `"use server"` at the top of the file. This ensures that any async function exported from the file is a server action.

```ts{1}
"use server";

export async function getPosts() {
  const res = await fetch("https:...");
  const data = res.json();

  return data;
}
```

In the code example above, `getPosts` is a server action.

---

## Introduction to Zod for Validation

Zod is a validation library that you can use to validate form entries on the server side. This ensures consistency across both the client and server.

Zod is a TypeScript-first library, which means that it comes with type safety out of the box.

To install Zod in your Next.js application, use the following command:

```sh
npm install zod
```

At the core of the Zod library are schemas. You can use schemas to validate inputs.

Here's how to define a schema:

```ts
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});
```

Inside the `contactSchema`, we are specifying that:

- `name` is of type `string` and should be a minimum of 2 characters,
- `email` is of type `string` and `email`, and
- `message` is of type `string` and should be a minimum of 10 characters.

The `message` property is what will be displayed on the screen when all or any of the validation fails.

In the next section, we are going to build the contact form.

---

## How to Build the Contact Form Component

In this section, we are going to build the UI of the contact form.

Inside the <FontIcon icon="fas fa-folder-open"/>`app` directory, create a folder called <FontIcon icon="fas fa-folder-open"/>`components`.

Inside of the <FontIcon icon="fas fa-folder-open"/>`components` folder, create a new file, <FontIcon icon="fa-brands fa-react"/>`contactForm.tsx`, and add the following code:

```tsx title="app/components/contactForm.tsx"
"use client";

function ContactForm() {
  return (
    <form action="">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <textarea name="message" cols={30} rows={10} placeholder="Type in your message"></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
}

export default ContactForm;
```

In the code above, we are creating a simple contact form. We made it a client component – you’ll see why in a bit.

Import the `ContactForm` component in your <FontIcon icon="fa-brands fa-react"/>`page.tsx` file:

```tsx title="app/components/page.tsx"
import ContactForm from "./components/contactForm.tsx";

function Home() {
  return (
    <div>
      <h2>Contact Form</h2>
      <ContactForm />
    </div>
  );
}
```

You should have something like this:

![contact form image](https://cdn.hashnode.com/res/hashnode/image/upload/v1732048786231/694ac568-9d71-4597-ba61-962483740320.png)

Next, we are going to validate our form data using zod.

---

## How to Create the Server Actions and Validate the Form Data with zod

In this section, we are going to create our server action and validate our form entries with zod.

In the <FontIcon icon="fas fa-folder-open"/>`app` folder, create another folder, <FontIcon icon="fas fa-folder-open"/>`api`.

Inside the <FontIcon icon="fas fa-folder-open"/>`api` folder, create a file called <FontIcon icon="iconfont icon-typescript"/>`action.ts` and paste in the following code:

```ts title="app/api/action.ts"
"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name field is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().trim().min(1, { message: "Please type in a message" }),
});

export async function sendEmail(prevState: any, formData: FormData) {
  const contactFormData = Object.fromEntries(formData);
  const validatedContactFormData = contactFormSchema.safeParse(contactFormData);


  if (!validatedContactFormData.success) {
    const formFieldErrors =
      validatedContactFormData.error.flatten().fieldErrors;

    return {
      errors: {
        name: formFieldErrors?.name,
        email: formFieldErrors?.email,
        message: formFieldErrors?.message,
      },
    };
  }

  return {
    success: "Your message was sent successfully!",
  };
}
```

In the code above, we defined a `contactFormSchema` for validating our form entries.

The `sendEmail` function (which is our server action) accepts two arguments:

- `prevState` which will be used in to display our error and success messages, and
- `formData` which is the entries from our form

FormData makes it possible for our function to have access to the form fields without using `useState` and it relies on the `name` attribute.

We are using `Object.fromEntries()` to convert the raw `formData` into a regular JavaScript object and we’re storing it in the `contactFormData` variable.

Next, we are validating the `contactFormData` using the `safeParse()` method of our zod schema, `contactFormSchema`.

As a good programming practice, we return early by checking if the validation fails. If the validation fails, we return an object with an `error` property, which is an object containing the error message of each form field.

`formFieldsError` is assigned the value of the error object from zod, which contains the error message of each form field.

If everything goes well, we simply return an object with a `success` property.

::: note

This is where you send the message to your email using any email service provider of your choice. For the sake of the article, we are simply returning an object.

:::

In the next section, we are going to integrate the server action in our contact form.

---

## How to Integrate the Server Action into Our Contact Form

In this section, we are going to integrate the server action into our contact form.

Navigate to the `contactForm.tsx` file and replace the content with the following code:

```tsx :coallpsed-lines title="app/components/contactForm.tsx"
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendEmail } from "../api/action";

const initialState = {
  success: "",
  errors: {
    name: "",
    email: "",
    message: "",
  }
};

function ContactForm() {
  const [state, formAction] = useFormState(sendEmail, initialState);

  return (
    <div>
      <div className="py-6">
        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="name">Your name</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              // required
              className="border w-full md:w-3/4 py-2 pl-2 rounded-lg rounded-l-lg block md:inline focus:outline-slate-500 border-gray-500"
              placeholder="Enter your name..."
            />
            {state.errors?.name && (
              <p className="text-red-500">{state.errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Your email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              // required
              className="border w-full md:w-3/4 py-2 pl-2 rounded-lg rounded-l-lg block md:inline focus:outline-slate-500 border-gray-500"
              placeholder="Enter your email..."
            />
            {state.errors?.email && (
              <p className="text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <br />
            <textarea
              name="message"
              id="message"
              // required
              cols={100}
              rows={10}
              className="border w-full md:w-3/4 py-3 pl-2 rounded-lg focus:outline-slate-500 border-gray-500"
              placeholder="Enter your message..."
            ></textarea>
            {state.errors?.message && (
              <p className="text-red-500">{state.errors.message}</p>
            )}
          </div>
          <SubmitButton />
        </form>
      </div>
      {state?.success && <p className="text-green-600">{state.success}</p>}
    </div>
  );
}

export default ContactForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending ? true : false}
      className="bg-green-600 text-white font-semibold px-3 py-2 rounded-lg"
    >
      {pending ? (
        <span>
          Submitting <RiLoader5Fill className="animate-spin" />
        </span>
      ) : (
        "Submit"
      )}
    </button>
  );
}
```

In the updated code above, we imported two hooks: `useFormState` and `useFormStatus` from "react-dom" and `sendEmail` from "api/action.ts".

Next, we created a `initialState` variable to hold our initial state. This will be used in the `useFormState` hook.

`initialState` is an object with:

- a `success` property for the success message of our server action, and
- an `errors` object, which is equal to the `errors` object we return in our server action if the validation fails.

Inside our `ContactForm` component, we are using the `useFormState` hook. This hook accepts two arguments: a server action and an initial state and returns an array with two values: current state and `formAction`.

`formAction` will be passed into the `action` prop of the **form** element. This will handle the submission of our form, which incorporates the zod validation.

Below each form field, we conditionally render the error message of each of the form field respectively.

Below the **form** element, we render the success message if the form was successfully submitted.

The submit button is put into a different component, `SubmitButton` so we can make use of the `useFormStatus` hook.

The `useFormStatus` hook returns an object with a `pending` property, which we can use to disable the submit button when the form is submitted.

Assuming everything went correctly, you should have a working contact form like this:

![working form](https://cdn.hashnode.com/res/hashnode/image/upload/v1732051093066/c6cd1da7-fe24-4eea-85db-a6845efc501d.gif)

Congratulations! You have just created a contact form using server actions and the zod validation library.

---

## Conclusion

In this article, you learned what server actions are and how to use the zod library. You also used server actions and zod to build a contact form.

Server actions are not limited to form submission and can also be used for fetching data from external APIs and databases.

You can learn more with these resources:

<SiteInfo
  name="TypeScript-first schema validation with static type inference"
  desc="TypeScript-first schema validation with static type inference"
  url="https://zod.dev/"
  logo="https://github.com/colinhacks/zod/static/favicon.ico"
  preview="https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/colinhacks/zod"/>

<SiteInfo
  name="Data Fetching: Server Actions and Mutations | Next.js"
  desc="Learn how to handle form submissions and data mutations with Next.js."
  url="https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations/"
  logo="https://nextjs.org/favicon.ico"
  preview="https://nextjs.org/api/docs-og?title=Data%20Fetching:%20Server%20Actions%20and%20Mutations"/>

Here's the [GitHub repository (<FontIcon icon="iconfont icon-github"/>`DeraCodings/server-action-zod`)](https://github.com/DeraCodings/server-action-zod) of the complete project.

<SiteInfo
  name="DeraCodings/server-action-zod"
  desc="Contribute to DeraCodings/server-action-zod development by creating an account on GitHub."
  url="https://github.com/DeraCodings/server-action-zod/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ac41c5f0c19a8a999a8c52fbdf75681041b32c00d52a05010d02b3ed7b37265a/DeraCodings/server-action-zod"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Forms in Next.js with Server Actions and Zod for Validation",
  "desc": "Forms are essential in modern websites, as they help you collect your users’ information. So knowing how to handle forms properly is crucial when you’re building web applications. In this article, you will learn how to handle forms in Next.js using s...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/handling-forms-nextjs-server-actions-zod.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
