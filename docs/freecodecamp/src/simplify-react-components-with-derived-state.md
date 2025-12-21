---
lang: en-US
title: "How to Simplify Your React Components with Derived State"
description: "Article(s) > How to Simplify Your React Components with Derived State"
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
      content: "Article(s) > How to Simplify Your React Components with Derived State"
    - property: og:description
      content: "How to Simplify Your React Components with Derived State"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/simplify-react-components-with-derived-state.html
prev: /programming/js-react/articles/README.md
date: 2025-11-25
isOriginal: false
author:
  - name: Olaleye Blessing
    url : https://freecodecamp.org/news/author/Jongbo/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764017894421/6bbd5cf2-c221-490c-891a-bf984cfaa92c.png
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
  name="How to Simplify Your React Components with Derived State"
  desc="React simplifies building user interfaces with hooks like useState for managing dynamic values. But it's common to overuse useState. This often leads to duplicated data and unnecessary complexity. For instance, you might store a full name in state wh..."
  url="https://freecodecamp.org/news/simplify-react-components-with-derived-state"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764017894421/6bbd5cf2-c221-490c-891a-bf984cfaa92c.png"/>

React simplifies building user interfaces with hooks like `useState` for managing dynamic values. But it's common to overuse `useState`. This often leads to duplicated data and unnecessary complexity.

For instance, you might store a full name in state when it can be calculated from first and last name props, or duplicate fetched data from a library like React Query. This creates issues like harder debugging, extra re-renders, and synchronization problems.

In this tutorial, you'll learn how to use derived state to improve your components. By the end, you'll know when to derive state instead of storing it, making your React code cleaner and more maintainable.

::: note Prerequisites

Before you move on, make sure you have:

- Basic knowledge of JavaScript, TypeScript, React, and React hooks
- Understanding of asynchronous calls
- A simple React development setup.

:::

If you don’t have a React development setup, you can head over to the [<VPIcon icon="iconfont icon-github"/>`Olaleye-Blessing/freecodecamp-derived-states` repo](https://github.com/Olaleye-Blessing/freecodecamp-derived-states). The repo has been set up with [<VPIcon icon="fas fa-globe"/>React Router](https://reactrouter.com/) and [<VPIcon icon="fas fa-globe"/>React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Run the commands below to set it up:

```sh
# clone the repo
git clone <https://github.com/Olaleye-Blessing/freecodecamp-derived-states.git>

# navigate to the folder
cd freecodecamp-derived-states

# install the packages
pnpm install

# start development
pnpm dev
```

---

## What Is a Derived State?

A derived state is any value that can be calculated from existing data. This existing data can be from:

- **Props:** Data passed from a parent component.
- **Existing state:** Other state variables already in your component.
- **URL parameters:** Data from routes or query strings.
- **External data:** Data from a fetching library like React Query.

Storing derivable state in `useState` can create several issues. First, it can cause debugging problems: more state variables make it harder to trace data flow. The more states you have, the more the number of state changes you need to keep track of while debugging.

It can also cause unnecessary re-renders. React will trigger a re-render every time you call the state setter function.

Finally, there can be synchronization issues, as you’re forced to update the “derived state” anytime the source data changes manually. When similar data exists in multiple states, they can get out of sync.

---

## How to Derive State From Existing Data

Moving forward, we’ll explore common scenarios where you can derive state instead of storing it in another `useState`.

Note: All the code in this article is run in [<VPIcon icon="fa-brands fa-react"/>non-StrictMode](https://react.dev/reference/react/StrictMode).

### How to Derive State From Props or Other State

In this section, we’ll first examine the problems caused by using `useState` for derivable values. We’ll look at a form component that stores unnecessary states like full name, adult status, and a local copy of an email. You’ll see the re-renders in different scenarios and then learn how to refactor using derived state to remove these problems.

#### The Problem With Extra States

Any value that comes directly from props or other state can be derived on the fly. Take the below as an example, where you pass an `email` prop to a form component:

```tsx
<DetailForm email="olaleyedev@gmail.com" />
```

Here is how the form receives the email prop and also manages its own state:

```tsx :collapsed-lines
import { useEffect, useState, type FormEventHandler } from "react";

interface DetailFormProps {
  email: string;
}

const DetailForm = ({ email }: DetailFormProps) => {
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState(0);
  const [isAdult, setIsAdult] = useState(false);
  const [localEmail, setLocalEmail] = useState(email);

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`.trim());
  }, [firstName, lastName]);

  useEffect(() => {
    setIsAdult(age > 18);
  }, [age]);

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ fullName, age, isAdult });
  };

  console.count("-- Form render --");

  return (
    <form onSubmit={submitForm}>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="firstName"
          style={{
            display: "inline-block",
            marginRight: "1rem",
            width: "10rem",
          }}
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="lastName"
          style={{
            display: "inline-block",
            marginRight: "1rem",
            width: "10rem",
          }}
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="age"
          style={{
            display: "inline-block",
            marginRight: "1rem",
            width: "10rem",
          }}
        >
          Age
        </label>
        <input type="number" onChange={(e) => setAge(Number(e.target.value))} />
      </div>
      <p>
        Your receipt will have{" "}
        <span
          style={{
            borderBottom: "1px solid #fffa",
            paddingBottom: "1px",
          }}
        >
          {fullName.trim() || "-----"}
        </span>{" "}
        as the recipient's name and will be sent to {localEmail || "-----"}.
      </p>
      <p>
        {isAdult
          ? "You are allowed to order a drink."
          : "You are not allowed to order any drinks."}
      </p>
      <button type="submit" disabled={!isAdult}>
        Submit
      </button>
    </form>
  );
};

export default DetailForm;
```

The form component collects information from a user. It shows them more information based on their input and the provided email. It maintains some states to keep track of the user’s input.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762625903293/c952e785-2b37-4411-987f-01686db8f54e.png)

While it looks simple, there are some issues with the way state is being used here.

First of all, a React component re-renders whenever any of its states change. Looking at the UI, the form should only re-render when users input their first name, last name, and age, or when the email prop changes from the parent. This means the form should keep track of just these three states internally, while deriving from the prop and other states.

But the form keeps track of three extra states (`fullName`, `isAdult`, and `localEmail`). This means that the form will re-render each time these extra states change.

Let’s see this in action:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762626688959/f381aa1f-6244-4065-aa36-123134f26b1b.gif)

As you can see, the form re-rendered twice when the input field changed, instead of once. The form re-rendered the first time the user updated their first name. But for each time the first and last name changed, the second `useEffect` gets triggered.

```tsx
useEffect(() => {
  setFullName(`${firstName} ${lastName}`.trim());
}, [firstName, lastName]);
```

This is to sync the `fullName` with the `firstName` and `lastName`. Updating the `fullName` causes the form to re-render the second time.

The same applies to the `isAdult` state. When the user updates their `age`, `setAge()` re-renders the form, and the third `useEffect` also causes another re-render.

#### Handling Email Changes

Let’s see what happens when you update the email from the parent component. This is the code that allows you to update the email:

```tsx
function App() {
  const [email, setEmail] = useState("olaleyedev@gmail.com");

  return (
    <>
      <div
        style={{
          marginBottom: "1rem",
          border: "1px solid #fff",
          paddingBottom: "1rem",
        }}
      >
        <h3>Parent Component</h3>
        <input
          style={{ padding: "0.4rem 0.8rem" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <DetailForm email={email} />
    </>
  );
}
```

The parent component keeps track of the user’s email and also updates it through an `input` element.

Note: In the `<Detail />` component, I’ve removed the `useEffect`s that sync the `fullName` and `isAdult`. This is to focus mainly on the `email` prop. The form component now has this:

```tsx
import { useEffect, useState, type FormEventHandler } from "react";

interface DetailFormProps {
  email: string;
}

const DetailForm = ({ email }: DetailFormProps) => {
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState(0);
  const [isAdult, setIsAdult] = useState(false);
  const [localEmail, setLocalEmail] = useState(email);

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ fullName, age, isAdult });
  };

  console.count("-- Form render --");

  return <form onSubmit={submitForm}>{/* Rest */}</form>;
};

export default DetailForm;
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762626841744/9beffe7d-2513-4d3e-9970-21477b16161e.gif)

Updating the email from the parent component causes the detail form to have an extra re-render. Because you are saving the email to a local state, any change to the `email` prop triggers the `useEffect` to update the state, causing an extra re-render. Your UI will show stale data without `useEffect`.

#### How to Solve This with Derived States

You can solve all these extra re-renders by using derived states. Neither `fullName` nor `isAdult` directly needs the user’s input for us to know their value. You can calculate their value when their dependent states change without using `useEffect`. Likewise, you can derive the `email` directly by using the prop value on the fly.

```jsx :collapsed-lines
import { useEffect, useState, type FormEventHandler } from "react";

interface DetailFormProps {
  email: string;
}

const DetailForm = ({ email }: DetailFormProps) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [fullName, setFullName] = useState(""); // [!code --]
  const [age, setAge] = useState(0);
  const [isAdult, setIsAdult] = useState(false); // [!code --]
  const [localEmail, setLocalEmail] = useState(email); // [!code --]

  useEffect(() => { // [!code --]
    setFullName(`${firstName} ${lastName}`.trim()); // [!code --]
  }, [firstName, lastName]); // [!code --]

  useEffect(() => { // [!code --]
    setIsAdult(age > 18); // [!code --]
  }, [age]); // [!code --]

  useEffect(() => { // [!code --]
    setLocalEmail(email); // [!code --]
  }, [email]); // [!code --]

  const fullName = `${firstName} ${lastName}`.trim(); // [!code ++]
  const isAdult = age > 18; // [!code ++]

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ fullName, age, isAdult, email: localEmail }); // [!code --]
    console.log({ fullName, age, isAdult, email }); // [!code ++]
  };
};

export default DetailForm;
```

The form now stores the necessary state, `lastName`, `firstName`, and `age`. The `fullName` and `isAdult` values are derived directly from their dependent values.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762627041623/69004769-ddd9-470c-9212-ba7711350b57.gif)

As you can see with the derived state, we have 0 extra re-renders. The form re-rendered only when it should. The form re-rendered once when each input value changed, not twice. Also, when the email changes in the parent component, there is only one re-render.

### How to Derive State From a URL

You can also use a URL to save dynamic data through route parameters or query strings. Every routing library provides some hooks to access this data.

For example, React Router provides `useParams` or `useSearchParams`. In most cases, the returned values from these hooks don’t need to go into `useState` again – as this would mean keeping track of two storage, `useState` and `URL`.

Now, we’ll look at some examples using search parameters from React Router. You’ll first see an example that overuses `useState` and causes extra re-renders and sync issues. Then you’ll see its derived solution.

#### Syncing with `useEffect`

The component you will be using is a filter component:

```tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedMaterial(searchParams.get("material") || "");
  }, [searchParams]);

  console.count("__ RENDERDED ___");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <input value={searchQuery} />
      <select value={selectedCategory}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <select value={selectedMaterial}>
        <option value="">All Material</option>
        <option value="leather">Leather</option>
        <option value="silk">Silk</option>
      </select>
      <button>Clear Filters</button>
    </div>
  );
};

export default Products;
```

This component allows users to search for a product and/or filter by category and materials. While it looks simple, this component has all the problems mentioned earlier.

Let’s see what happens when the component mounts with no filter and predefined filters.

::: tabs

@tab:active With no filter

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762627432720/fb1ffe32-b3ae-4506-9a33-cdd42cffb5dd.gif)

The component only renders once when there's no filter. This is good.

@tab With a predefined filter

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762627673969/3a29eb6d-694d-4499-8f78-06cd8702ae3d.gif)

It renders twice because you are trying to make sure your `useState`s are in sync with the `URL` by using `useEffect`. The component renders the first time it mounts, then re-renders because of the dependency in `useEffect`.

:::

#### Initializing `useState` Directly

You could be thinking that it’s better to move the getters into the `useState`s directly, which truly solves the re-rendering case when the component mounts.

```tsx
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    searchParams.get("material") || "",
  );

  // prev code
};
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762627883127/76b4af17-a0c6-4f7d-bc40-fbf013fb2ad9.gif)

As you can see, the component only renders once. There is no more `useEffect` to trigger another re-render.

Just keep in mind that this isn’t a solution yet. It has other problems you’ll see soon.

What happens when any of the filtering changes or when you enter a search query?

#### Handling Changes

Both solution shows that you have unnecessary re-renders. This is because you have to keep two states in sync: both the `useState`s and the `URL`.

```tsx :collapsed-lines
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const Products = () => {
  // prev code

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (query) {
        newParams.set("search", query);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (category) {
        newParams.set("category", category);
      } else {
        newParams.delete("category");
      }
      return newParams;
    });
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (material) {
        newParams.set("material", material);
      } else {
        newParams.delete("material");
      }
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedMaterial("");
    setSearchParams({});
  };

  console.count("__ RENDERDED ___");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <input
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        {/* prev options */}
      </select>
      <select
        value={selectedMaterial}
        onChange={(e) => handleMaterialChange(e.target.value)}
      >
        {/* prev options */}
      </select>
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default Products;
```

Because you are tracking the values in `useState`, you need to update the `useState` first before updating the `URL`. The UI won’t get updated if you update the `URL` without updating the `useState`.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762628106580/c28d2453-9faa-460d-9cfa-d000b9ed41a4.gif)

Notice that each change leads to 2-3 re-renders.

#### Using Derived State

Using a derived state will solve all the issues you encountered. Your state can be derived directly from the `URL` without using `useState` and/or `useEffect`.

```tsx :collapsed-lines
import { useSearchParams } from "react-router";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedMaterial = searchParams.get("material") || "";

  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  console.count("__ RENDERDED ___");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <input
        value={searchQuery}
        onChange={(e) => updateFilter("search", e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <select
        value={selectedMaterial}
        onChange={(e) => updateFilter("material", e.target.value)}
      >
        <option value="">All Material</option>
        <option value="leather">Leather</option>
        <option value="silk">Silk</option>
      </select>
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
};

export default Products;
```

You now read your values directly from the `URL`. You also update the `URL` only whenever any of the values change.

![03d0eabb-1030-4e70-83a0-11feb7f4e9e9](https://cdn.hashnode.com/res/hashnode/image/upload/v1762628297681/03d0eabb-1030-4e70-83a0-11feb7f4e9e9.gif)

Notice that you have no re-render when the component mounts, even with predefined filters. The component re-renders once when any filtering key changes.

This approach gives several benefits:

- You don’t need `useEffect` to keep data in sync.
- You only need to maintain a single source of truth, which is the `URL`.
- You have less code, which is easier to maintain.

### How to Derive State From External Data

Data fetching libraries like React Query provide states that can be used as a single source of truth. Saving this data in `useState` can sometimes be redundant.

Look at this example using React Query. First, create a parent component that will render the user details:

```ts
import { useSearchParams } from "react-router";
import UserDetail from "./user-detail";

const UserIdInput = () => {
  const [search, updateSearch] = useSearchParams();

  return (
    <input
      value={search.get("id") || ""}
      onChange={(e) => updateSearch({ id: e.target.value })}
    />
  );
};

const User = () => {
  return (
    <>
      <UserIdInput />
      <UserDetail />
    </>
  );
};

export default User;
```

You use the `<UserIdInput />` to update the user details you need to get. Now create the `<UserDetail />` component:

```tsx :collapsed-lines
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

interface IUser {
  id: number;
  name: string;
}

const getUser = async (id: string) => {
  const req = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  await new Promise((r) => setTimeout(r, 2_000));
  return req.json();
};

const UserDetail = () => {
  const [search] = useSearchParams();
  const userId = search.get("id") || "";

  const {
    data,
    isFetching,
    error: fError,
  } = useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
    refetchOnWindowFocus: false,
  });

  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(undefined);
    setError(undefined);
  }, [userId]);

  useEffect(() => {
    setError(fError?.message);
    setLoading(isFetching);
    setUser(data);
  }, [data, fError, isFetching]);

  console.count("__ RENDERED __");

  console.log({ data, user, isFetching, loading, error });

  if (error) return <div>Try again later!</div>;
  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <p style={{ fontSize: "2rem" }}>
          {user.id}: {user.name}
        </p>
      </div>
    );
  }

  return null;
};

export default UserDetail;
```

The `<UserDetail />` component renders the details of a user. It gets the user’s ID from the URL.

The component uses the `getUser` function to get dummy data from an API. It simulates a little network delay by waiting for an extra two seconds with this line of code:

```ts
await new Promise((r) => setTimeout(r, 2_000));
```

The component uses `useQuery` to fetch the data. Internally, part of the state React Query keeps track of is the `data`, `isFetching`, and `error`. But the component creates another local state to keep track of these React Query states.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762629782249/ac64794f-9264-4e31-989c-5ee1a7274b0e.gif)

Notice that the component renders a total of four times. The component re-renders when React Query and local states change. Also, notice that both states are out of sync at some point. For example, in the third log, the `data` key from React Query already had the user details, while the local `user` state is still undefined. You had to use `useEffect` to update its state.

It’s more interesting when the component tries to get another user’s details.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762630953734/d1810dfd-82d9-4c6d-9c57-fa473f6438e4.gif)

The component reacts to when the user’s ID changes, when React Query state changes, and when local state changes. Similar to the mount problem, the component re-renders more than it needs to: it re-renders six times. Also, the local state was out of sync at some point because we had to rely on `useEffect`.

#### Derive Directly From React Query

You can correct all these issues by using a derived state like this:

```tsx :collapsed-lines
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

interface IUser {
  id: number;
  name: string;
}

const getUser = async (id: string) => {
  const req = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  await new Promise((r) => setTimeout(r, 2_000));
  return req.json();
};

const UserDetail = () => {
  const [search] = useSearchParams();
  const userId = search.get("id") || "";

  const {
    data: user,
    isFetching: loading,
    error,
  } = useQuery<IUser>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  });

  console.count("__ RENDERED __");

  if (error) return <div>Try again later!</div>;
  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <p style={{ fontSize: "2rem" }}>
          {user.id}: {user.name}
        </p>
      </div>
    );
  }

  return null;
};

export default UserDetail;
```

React Query is now the single source of truth. There is no more manual synchronisation or extra `useState`s.

Also, the first thing you will notice is that you have fewer lines of code. This makes it easier to maintain. Check the GIF below to see how often the component renders when it mounts.

![d2b03b52-bffe-4226-9535-5b8d5a4eca20](https://cdn.hashnode.com/res/hashnode/image/upload/v1762631232781/d2b03b52-bffe-4226-9535-5b8d5a4eca20.gif)

As you can see, the component re-renders only twice. Once, when the component initially mounts, and again when React Query state changes.

![e87f1c5e-2741-4c2a-bf1d-9406f06812ce](https://cdn.hashnode.com/res/hashnode/image/upload/v1762631500289/e87f1c5e-2741-4c2a-bf1d-9406f06812ce.gif)

The same thing happened when you got another user's details. You have fewer re-renders: three times as opposed to six times when we kept track of the state locally.

---

## How to Prevent Recalculation of a Derived State

Most calculations are fast enough to run on every render. This becomes a problem when it’s an expensive calculation. In such a case, you an use `useMemo` and/or `memo` to avoid unnecessary work.

```ts
const Detail = () => {
  const product = useQuery(...);
  const users = useQuery(...);

  const result = useMemo(() => {
    const expensiveResult = ...;

    return expensiveResult;
  }, [product.data]);

  return (
    <>
      {/* some other components */}
      <Result result={result} />
    </>
  );
};

const Result = memo(({ result }: { result: number }) => {
  return <></>;
});
```

With `useMemo`, the `result` variable will be recalculated only when `product.data` changes. This means that the `<Result />` component remains the same until `product.data` changes.

You can read more here about [**how to use `useMemo` in React**](/freecodecamp.org/how-to-work-with-usememo-in-react.md).

---

## When to Use `useState`

While the article has focused on using derived states, there are cases where you must use `useState`.

### Controlled Input

You need `useState` to manage the input’s value and keep it in sync with the component’s state when building a controlled input.

```tsx
import { useState, type FormEventHandler } from "react";

const ControlledInput = () => {
  const [username, setUsername] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submitted value:", username);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 0.4rem",
            border: `1px solid ${username.length < 2 ? "red" : "green"}`,
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
```

`useState` is needed here because:

- you want to track the user’s value as they type
- the value comes directly from the user interaction

Because we are tracking the input value with `useState`, we can easily validate the `username` and change the border’s color. freeCodeCamp has an [**article that explains what controlled inputs are**](/freecodecamp.org/what-are-controlled-and-uncontrolled-components-in-react.md).

### Independent State Changes

You should use `useState` when a value can change without depending on other state or props. For example, when toggling a modal, you need `useState` to keep track of its state.

```tsx
import { useState } from "react";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <div>
          <p>Modal Content</p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
```

---

## Conclusion

Managing state is one of the trickiest parts of React. You shouldn’t store what you can calculate, and you should only store what you can’t derive.

By keeping states minimal and deriving when possible, it will be easier to debug and maintain your components.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Simplify Your React Components with Derived State",
  "desc": "React simplifies building user interfaces with hooks like useState for managing dynamic values. But it's common to overuse useState. This often leads to duplicated data and unnecessary complexity. For instance, you might store a full name in state wh...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/simplify-react-components-with-derived-state.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
