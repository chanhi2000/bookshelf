---
lang: en-US
title: "How to Use Zod for React API Validation"
description: "Article(s) > How to Use Zod for React API Validation"
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
      content: "Article(s) > How to Use Zod for React API Validation"
    - property: og:description
      content: "How to Use Zod for React API Validation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-zod-for-react-api-validation.html
prev: /programming/js-react/articles/README.md
date: 2025-03-01
isOriginal: false
author:
  - name: Emore Ogheneyoma Lawrence
    url : https://freecodecamp.org/news/author/Yoma/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740756200896/a57c4e95-b13e-412a-828e-09e97f22a6c4.png
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
  name="How to Use Zod for React API Validation"
  desc="In React applications, handling API (Application Programming Interface) responses can be challenging. You might encounter data that’s missing crucial fields, that’s formatted unexpectedly, or that simply doesn’t match what you anticipated. This incon..."
  url="https://freecodecamp.org/news/how-to-use-zod-for-react-api-validation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740756200896/a57c4e95-b13e-412a-828e-09e97f22a6c4.png"/>

In React applications, handling API (Application Programming Interface) responses can be challenging. You might encounter data that’s missing crucial fields, that’s formatted unexpectedly, or that simply doesn’t match what you anticipated.

This inconsistency can lead to errors in your code and make it difficult to work with the data effectively. Imagine wrestling with unpredictable API responses as your application grows - it can quickly become a development nightmare!

This is where Zod comes in, offering a solution to effectively manage API data validation within React.

::: info By the end of this tutorial, you’ll learn how to:

1. Set up and use Zod for API response validation in React.
2. Define schemas to validate and transform incoming data.
3. integrate Zod into API calls to improve data handling and prevent UI crashes.

:::

---

## What is Zod, and Why Use it for React API Calls?

Zod is a powerful TypeScript-first library that simplifies data validation. It lets you define clear rules (schemas) for your expected data format.

Zod can then validate incoming data (often from API responses) to ensure it conforms to these rules. This validation process guarantees that the data adheres to your defined format, enhancing the reliability and integrity of your application.

Here's why Zod shines for React API validation:

- Clear schemas: Zod helps you define concise blueprints for API responses, enhancing readability and maintainability.
- Data validation: It offers powerful validation methods for various data types, enforcing rules like required fields and specific formats.
- Early error detection: It helps you detect data inconsistencies during API calls, preventing unexpected errors later in the application.
- Improved developer experience: It promotes type-safe coding, streamlining development time by eliminating manual data type checks.
- Single source of truth: And finally, Zod serves as a central point for data model definitions, ensuring consistency across the React application and reducing errors.

Using Zod, you can transform unpredictable API responses into clean, structured data, setting the stage for a smoother and more efficient development experience in your React applications.

---

## How to Generate a New TypeScript React Project

Creating a new React project with TypeScript is straightforward. Here's how to get started. Execute the following command in your terminal:

```sh
npm create vite@latest my-react-app -- --template react-ts
```

Once the project is generated, navigate to the projects directory:

```sh
cd my-react-app
npm install
npm run dev
```

That’s it! Your React Project with TypeScript is now up and ready to use. Run the command below to install the Zod package:

```sh
npm install zod
```

---

## Core Zod Concepts: Basic Usage, Types, and Validation

Zod helps you define clear expectations for your API responses using **schemas**. These schemas act like blueprints, specifying the types of data you expect to receive.

### How to Build Schemas

Zod provides builder functions like `z.string()`, `z.number()`, and `z.object()` to create schemas. These functions define the data type you want for a specific field in your response.

```ts
import { z } from 'zod';
// Define basic data types
const userName = z.string().min(5).max(10); // String with min 5 and max 10 characters
const userAge = z.number().positive().int();  // Positive integer
const userEmail = z.string().email();        // Ensures a valid email format

console.log(userName.parse('John Doe'));       // Output: John Doe (valid)
console.log(userAge.parse(30));              // Output: 30 (valid)
console.log(userEmail.parse("johnDoe@gmail.com")); // Output: johnDoe@gmail.com (valid)
```

The code above defines three basic data types:

- `userName`: Represents a string with a minimum length of 5 characters and a maximum length of 10 characters.
- `userAge`: Represents a positive integer.
- `userEmail`: Ensures a valid email format.

Here’s the result of the code above:

![Image of the resulting code above](https://cdn.hashnode.com/res/hashnode/image/upload/v1738857987322/55a5943c-6633-4432-a441-c3dfa9400d93.png)

### How to Add Validation Rules

Zod allows you to chain methods like **min**, **max**, **positive**, **int**, and **email** to enforce specific rules on these data types. Here’s an example of an invalid string exceeding the maximum length:

```ts
console.log(userName.parse("Hello there, My Name is John Doe")); // Throws ZodError
```

The code throws a `ZodError` due to exceeding the maximum length of 10 strings, disrupting our application flow and eventually causing our application to break.

Here’s the image of the resulting code error:

![Image of the resulting code above](https://cdn.hashnode.com/res/hashnode/image/upload/v1738859384410/27c2a5f3-2410-4709-ac27-8bf24f6c3fd8.png)

### Validating and Parsing

Zod offers two ways to check data against your schema:

- `schema.parse(data)`: This method attempts to parse the data according to your schema. But if there's a validation error, it throws a `ZodError`. This can disrupt your application's flow, as illustrated in the previous example.
- `schema.safeParse(data)`: This is the recommended approach. it parses the data and returns a `ZodResult object`. This object contains some key properties:
  - `success`: A boolean indicating whether the parsing was successful.
  - `data`: The parsed data itself (if the success property is true)
  - `error`: An error message if validation fails (if success property is false)

Here are two examples showcasing the usage of `safeParse` with both valid and invalid data so you can see the resulting outcomes.

First, lets see an example using `safeParse` with valid data:

```ts
const userSchema = z.object({
  name: userName,
  age: userAge,
  email: userEmail,
});

const userData = {
  name: "John Doe",
  age: 24,
  email: "johndoe@gmail.com"
};

const result = userSchema.safeParse(userData);

console.log(result); // ZodObject containing data and success status
```

This code defines a schema for user data using Zod, including properties for name, age, and email. It then attempts to parse a sample `userData` object using this schema via `safeParse()`. If successful, it prints the parsed data - otherwise, it logs an error message indicating the use of invalid data.

![Here’s the image of the resulting code above](https://cdn.hashnode.com/res/hashnode/image/upload/v1738861119776/7f9cf3ec-fc83-452c-9477-1c7d6422efe3.png)

Let’s now see how `safeParse()` handles invalid data using the same example as above. We’ll pass invalid data to the `userSchema.safeParse()` function to observe its behaviour.

```ts
const userSchema = z.object({
  name: userName,
  age: userAge,
  email: userEmail,
});

const userData = {
  name: "John Doe",
  age: 24,
  email: "johndoe.com" // invalid email
};

const result = userSchema.safeParse(userData);

console.log(result); // ZodObject containing error and success status
```

In this code example, we defined the `userSchema`. Next, we attempted to parse the `userData` object. But the parsing failed because the email property was not correctly formatted.

![Here’s a visual representation of the resulting output](https://cdn.hashnode.com/res/hashnode/image/upload/v1740502631913/25dead7a-ab09-4d1d-9dcc-fada38e7d4d6.png)

Unlike using `parse`, which completely halts your application upon encountering validation errors and throws a `ZodError`, utilizing `safeParse` allows you to gracefully handle these errors, ensuring uninterrupted operation.

---

## How to Build Zod Schemas for API Responses

Building on our understanding of Zod’s core concepts, let’s create Zod schemas specifically for data received from API calls. We’ll leverage data from [<FontIcon icon="fas fa-globe"/>JSONPlaceholder](https://jsonplaceholder.typicode.com/posts), which offers information about posts.

Here’s a sample JSON response representing a post from JSONPlaceholder:

```ts
{
  "userId": 1,
  "id": 3,
  "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut"
}
```

Create a React component (give it a name that fits your project structure) to demonstrate building and utilizing Zod schemas for API validation. In this article, for illustrative purposes, we’ll call it the `ZodApi` component.

```ts
import { z } from 'zod';

const postSchema = z.object({
  userId: z.number().positive().int(),
  id: z.number().positive().int(),
  title: z.string(),
  body: z.string()
});

const postSchemaArray = z.array(postSchema); // Schema for array of posts
```

This code defines the expected structure of a single post object (`postSchema`) and an array of posts (`postSchemaArray`).

The following sections will explore integrating Zod with React components for API call handling and error management.

---

## How to Integrate Zod with React API Calls

Let's bridge the gap between your defined Zod schemas and real API interactions.

We’ll need to update the code we wrote in the previous section to achieve our desired result in this section.

```ts :collapsed-lines
import { z } from 'zod';
import { useEffect } from 'react';

const postSchema = z.object({
  userId: z.number().positive().int(),
  id: z.number().positive().int(),
  title: z.string(),
  body: z.string()
});

const postSchemaArray = z.array(postSchema); // schema for an array of posts

type Posts = z.infer<typeof postSchemaArray>; // type of the posts

const ZodApi = () => {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts: Posts) => {
        const validatedPosts = postSchemaArray.safeParse(posts); // remember to use safeParse instead of parse

        if (validatedPosts.success === false) {
          console.log("Validation Error:"validatedPosts.error);
          return;
        }

        // we can now safely use the posts
        console.log(validatedPosts.data);
      });
  }, []);
  return <div>ZodApi</div>;
};

export default ZodApi;
```

The `ZodApi` component demonstrates:

- Fetching data: Uses `useEffect` and `fetch` to get data from the API.
- Type safety: `type Posts = z.infer<typeof postSchemaArray>;` ensures type safety by defining the `Posts type` inferred from the schema `postSchemaArray`.
- Parsing with Zod: Validates the fetched data against the `postSchemaArray` using `safeParse`.
- Handling success: If validation succeeds, it provides access to clean data in `validatedPosts.data` for use in your component (UI, state, and so on).

Error handling: The `if` statement showcases a simple approach to Zod error handling. In a case where the validation is not successful (`validatedPosts.success === false`), a ZodError message is logged to the console.

![Here’s a snapshot showing the resulting output in the console.](https://cdn.hashnode.com/res/hashnode/image/upload/v1740504815204/45ce101a-4e8c-475b-ad4d-783b0940710b.png)

---

## How to Render the User Interface (UI) and Handle Errors in React

In this section, you’ll learn how to render the UI based on our validated data and implement the error-handling mechanism using React states.

```ts :collapsed-lines
import { z } from "zod";
import { useEffect, useState } from "react";

const postSchema = z.object({
  userId: z.number().positive().int(),
  id: z.number().positive().int(),
  title: z.string(),
  body: z.string(),
});

const postSchemaArray = z.array(postSchema); // schema for an array of posts

type Posts = z.infer<typeof postSchemaArray>; // type of the posts

const ZodApi = () => {
  const [posts, setPosts] = useState<Posts>([]); // State to store validated posts
  const [error, setError] = useState(""); // State to store any errors
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts: Posts) => {
        const validatedPosts = postSchemaArray.safeParse(posts); // remember to use safeParse instead of parse

        if (validatedPosts.success === false) {
          console.log(validatedPosts.error.name);
          setError(validatedPosts.error.message); // set error state
          return;
        }

        // we can now safely use the validatedPosts 
        console.log(validatedPosts.data);
        setPosts(validatedPosts.data)
      });
  }, []);

  // Handle loading state (optional)
  if (!posts.length && !error) {
    return <div>Loading posts...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching Data</div>; // Display user-friendly error message
  }

  return (
    <div>
      <h1>Posts</h1>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ZodApi;
```

In the code above, we’ve updated the `ZodApi` component to perform the following tasks:

- State declaration: The `posts` and `error` states hold the data and error (if any) gotten from the fetch request.
- Error handling: We use the `posts` and `error` state to show a “Loading posts…” message when the posts are being fetched and no error occurs, and display an error message when an error occurs.
- Rendering posts: It maps through the fetched posts and renders them on the UI.

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1740506104138/f2afac53-e312-4a40-af01-500e0dd349f7.gif)

After fetching the results, you should see the 100 posts displayed on your screen. If you followed the steps correctly, you'll find all 100 posts visible. If you encounter any issues, make sure the fetching process was successful.

---

## Conclusion

By incorporating Zod into your React development workflow, you can build more robust and reliable applications.

Zod empowers you to catch mismatched data early on, preventing errors and saving valuable debugging time. Also, the user-friendly error messages given by Zod validation enhance your application’s overall user experience.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Zod for React API Validation",
  "desc": "In React applications, handling API (Application Programming Interface) responses can be challenging. You might encounter data that’s missing crucial fields, that’s formatted unexpectedly, or that simply doesn’t match what you anticipated. This incon...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-zod-for-react-api-validation.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
