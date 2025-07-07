---
lang: en-US
title: "How to Pass Additional Arguments to Next.js Server Actions"
description: "Article(s) > How to Pass Additional Arguments to Next.js Server Actions"
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
      content: "Article(s) > How to Pass Additional Arguments to Next.js Server Actions"
    - property: og:description
      content: "How to Pass Additional Arguments to Next.js Server Actions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-pass-additional-arguments-to-nextjs-server-actions.html
prev: /programming/js-next/articles/README.md
date: 2024-10-23
isOriginal: false
author: 
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729165969570/14ca2ef4-8a08-40f8-ba70-c6c24c194850.png
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
  name="How to Pass Additional Arguments to Next.js Server Actions"
  desc="Asynchronous data mutation and handling is a necessary task in modern web applications. You may want to execute a standalone asynchronous function on the server to carryout tasks like saving data to the data store, sending emails, downloading PDFs, p..."
  url="https://freecodecamp.org/news/how-to-pass-additional-arguments-to-nextjs-server-actions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729165969570/14ca2ef4-8a08-40f8-ba70-c6c24c194850.png"/>

Asynchronous data mutation and handling is a necessary task in modern web applications. You may want to execute a standalone asynchronous function on the server to carryout tasks like saving data to the data store, sending emails, downloading PDFs, processing images, and so on.

Next.js provides us with `Server Actions` which are asynchronous functions that execute on the server. We can use server actions for data mutations on the server, but server actions can be invoked from both server and client components.

Server actions are a great way to handle form submissions by executing the action when the form data gets submitted. In this article, we will look into a practical use case of handling additional arguments in Next.js server actions.

If you are interested in learning Next.js Server Actions with design patterns and project building, I have created a crash course for you that you can find [<FontIcon icon="fa-brands fa-youtube"/>here](https://youtu.be/gQ2bVQPFS4U).

<VidStack src="youtube/gQ2bVQPFS4U" />

Also, this article is also available as a video tutorial here:

<VidStack src="youtube/9PBtj0sUc7Q" />

---

## Why Would You Need to Pass Additional Arguments?

When we execute a server action on a form submission, the server action gets the form data automatically. For example, take a look at the form below:

```jsx
<form className="p-4 flex" action={updateUser}>
  <Input className="w-1/2 mx-2" type="text" name="name" />
  <Button type="submit">Update User Name</Button>
</form>
```

Here, we are executing a server action called `updateUser` when the form gets submitted. The `updateUser` function will receive the submitted form data as an argument which can be used to extract the form field values.

As you see in the code snippet below, the `updateUser` function gets a `formData` as an argument, and we can extract the value of the `name` field from it.

```jsx
"use server"

export async function updateUser(formData) {
  const name = formData.get('name');
  console.log(name);
}
```

While this pattern covers most of the basic use cases, you may need to pass additional arguments programmatically to the server actions. These arguments are not part of the form or form data or user input data. They may be programmatically passed values to your server action.

To understand this, check the server action code snippet below. It’s the same server action we have seen before, but we have passed an additional `userId` argument along with the regular `formData` argument.

```jsx
"use server"

export async function updateUser(userId, formData) {
  const name = formData.get('name');
  console.log(userId);
  console.log(name);
}
```

The `userId` value is something internal to the application – and you wouldn’t ask a user to submit the value as part of the form submission. Rather, you may need to pass it programmatically to your server action to perform further computations.

Right, that’s the use case we’re talking about. As we understand why we need it, let’s understand how to achieve it. But first, let’s create a form and a working server action for it.

---

## A Form With a Server Action

Create a directory called `actions` under the `app` directory of your Next.js application. Now create a <FontIcon icon="iconfont icon-nextjs"/>`user.js` file under the `actions` folder with the following code:

```jsx
"use server"

export async function updateUser(formData) {
  const name = formData.get('name');
  console.log(name);

  // Do anything with the name, save in DB, create invoice, whatever!
}
```

This is how you create a server function in Next.js. It must have a `”use server”` directive at the top of the file to tell Next.js that this is a special file with one or more asynchronous functions to execute on the server.

Then we have the server action (the async function) `updateUser` with `formData` as the argument. Inside the function definition, we extract out the `name` value and print it on the console.

Let’s now attach this server action to a form. To do that, create a folder called `components` under the project root folder. Create a file called `user-form.jsx` with the following code:

```jsx
import { Input } from "./ui/input"
import { Button } from "./ui/button"

import { updateUser } from "@/app/actions/user"

const UserForm = () => {
  return(
    <form className="p-4 flex" action={updateUser}>
      <Input className="w-1/2 mx-2" type="text" name="name" />
      <Button type="submit">Update User Name</Button>
    </form>
  )
}

export default UserForm;
```

This is a simple React component with a form. The form has one input text field called `name` and a submit button to submit the form. The form has an `action` attribute with the server action `updateUser` as the value. Now, when the form gets submitted with a `name` value, the server action will get it as part of the form data as we discussed above.

Let’s test it out. To do that, we’ll create a Next.js route and page where we can use the `UserForm` component. Create a folder called `extra-args` under the `app` directory. Now, create a file called `page.js` under the `app/extra-args` directory with the following code:

```jsx
import UserForm from "@/components/user-form";

const ExtraArgsDemo = () => {
  return (
    <UserForm />
  )
}

export default ExtraArgsDemo;
```

This is a simple React component where we have imported the `UserForm` component and used it in the JSX. Now run the local server and access this route `localhost:3000/extra-args`. You should see the form with a text field and a button.

Type some text inside the text field and click on the button.

![Application with server actions](https://cdn.hashnode.com/res/hashnode/image/upload/v1729167845597/b4c58399-4188-4b89-8ec7-dd2602c10ccd.png)

Now, you will be able to see that the typed text has been printed on the server console. Why on the server console? Why not on the browser console? This is because server actions execute on the server, not on the client side browser.

![Output Mike](https://cdn.hashnode.com/res/hashnode/image/upload/v1729167722231/e8c40a4d-e506-42fb-8ea3-233e295ac534.png)

So, with this we have now established a data flow like this:

Page => Form => Server Action

The page has a form. The form execute a server action on submission. The server action prints a form data on the server console.

Let’s now enhance these pieces to pass additional arguments to the server action.

---

## How to Pass Additional Arguments

Let’s pass a prop to the `UserForm` component from the page. We’ll pass a `userId` with a value to pretend that we are passing this userId programmatically to our form and to the server action from there.

```jsx
import UserForm from "@/components/user-form";

const ExtraArgsDemo = () => {
  return (
    <UserForm userId={"1234"} />
  )
}

export default ExtraArgsDemo;
```

In the `UserForm` component, we accept the `userId` prop. Now, we have to do something special to pass this userId to the `updateUser` server action.

JavaScript has a magical method called `bind()` that helps us create a `Partially Applied Function`. With this [partially applied function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#partially_applied_functions), you can create a function from another function’s preset arguments.

In our case, the `updateUser` function already has an argument called `formData`. Now we can pass `userId` as the additional argument using the `bind()` method to create a new function.

```jsx
const updatedUserWithId = updateUser.bind(null, userId);
```

The first argument of the `bind()` method is the context you are binding the function to. The context handles the association of the function with the `this` keyword value. In our case, we can keep it `null` as we are not changing it. After that, we passed the new argument `userId`. It’s good to know that the `bind()` method works on both server and client components.

Here is the modified `UserForm` component (`user-form.jsx` file). Note that the form action value is now modified to the new function `updatedUserWithId`.

```jsx
import { Input } from "./ui/input"
import { Button } from "./ui/button"

import { updateUser } from "@/app/actions/user"

const UserForm = ({userId}) => {
  const updatedUserWithId = updateUser.bind(null, userId);

  return(
    <form className="p-4 flex" action={updatedUserWithId}>
      <Input className="w-1/2 mx-2" type="text" name="name" />
      <Button type="submit">Update User Name</Button>
    </form>
  )
}

export default UserForm;
```

Now, the server action will receive the `userId` value as an argument. Let’s print that to the console as well.

```jsx
"use server"

export async function updateUser(userId, formData) {
  const name = formData.get('name');
  console.log(userId);
  console.log(name);

  // Do anything with the user id and name, save in DB, 
  // create invoice, whatever!
}
```

Now if you submit the form with a name value:

![Application with server actions again](https://cdn.hashnode.com/res/hashnode/image/upload/v1729167845597/b4c58399-4188-4b89-8ec7-dd2602c10ccd.png)

You’ll see that both userId and the name values are logged into the server console. Great! We have logged one value from the form data, and the other one was passed internally to the server action.

![d0ef49f8-88bc-4e82-a509-cbb859df87e1](https://cdn.hashnode.com/res/hashnode/image/upload/v1729169164296/d0ef49f8-88bc-4e82-a509-cbb859df87e1.png)

So, we learned how to pass the extra arguments to the server action along with the form data.

---

## What About the Hidden Fields?

HTML supports a hidden type form field to pass client data to the server without accepting the input from the users. So this means that we could have used the hidden field to pass the `userId` value like this:

![hidden field](https://cdn.hashnode.com/res/hashnode/image/upload/v1729485711865/21f33410-fcdd-46ea-b14c-d57004b30a96.png)

So why did we do all that with the `bind()` method? Well, because of security concerns. When you pass data using hidden fields, the value will be part of the rendered HTML, and it will not be encoded as well. So it’s better to handle it programmatically.

---

## Resources

That's all for now. Did you enjoy reading this article and have you learned something new? If so, I would love to know if the content was helpful. Let me share a few additional resources you may need:

- All the Source Code used in this article is [on my GitHub](https://github.com/atapas/nextjs-email/tree/extra-arg).
- Here’s the [Server Action Crash Course with Patterns and Project](https://youtu.be/gQ2bVQPFS4U).
- Here’s the [Server Action Official Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) if you want to read more.
- And you can read more about the [bind() method here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

Additionally, you can connect with me by:

- Subscribing to my [YouTube Channel (<FontIcon icon="fa-brands fa-youtube"/>`tapasadhikary`)](https://youtube.com/tapasadhikary?sub_confirmation=1). If you are willing to learn <FontIcon icon="fa-brands fa-react"/>React and its ecosystem, like <FontIcon icon="iconfont icon-nextjs"/>Next.js, with both fundamental concepts and projects, I have great news for you: you can [check out this playlist on my YouTube](https://youtu.be/VSB2h7mVhPg&list=PLIJrr73KDmRwz_7QUvQ9Az82aDM9I8L_8) channel with 25+ video tutorials and 15+ hours of engaging content so far, for free. I hope you like them as well.
- [Following me on X (<FontIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://x.com/tapasadhikary) or [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`tapasadhikary`)](https://linkedin.com/in/tapasadhikary/) if you don't want to miss the daily dose of up-skilling tips.
- Checking out and follow my Open Source work on [GitHub (<FontIcon icon="iconfont icon-github"/>`atapas`)](https://github.com/atapas).
- I regularly publish meaningful posts on my [<FontIcon icon="fas fa-globe"/>GreenRoots Blog](https://blog.greenroots.info/), you may find them helpful, too.

See you soon with my next article. Until then, please take care of yourself, and keep learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Pass Additional Arguments to Next.js Server Actions",
  "desc": "Asynchronous data mutation and handling is a necessary task in modern web applications. You may want to execute a standalone asynchronous function on the server to carryout tasks like saving data to the data store, sending emails, downloading PDFs, p...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-pass-additional-arguments-to-nextjs-server-actions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
