---
lang: en-US
title: "1: Implementing Permissions with CASL"
description: "Article(s) > (6/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (6/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "1: Implementing Permissions with CASL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-scalable-access-control-for-your-web-app/1-implementing-permissions-with-casl.html
date: 2025-02-05
isOriginal: false
author:
  - name: Samhitha Rama Prasad
    url : https://freecodecamp.org/news/author/samhitharamaprasad/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build Scalable Access Control for Your Web App [Full Handbook]",
  "desc": "Access control is crucial for preventing unauthorized access and ensuring that only the right people can access sensitive data in your application. As your app grows in complexity, so does the challenge of enforcing permissions in a clean and efficie...",
  "link": "/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Scalable Access Control for Your Web App [Full Handbook]"
  desc="Access control is crucial for preventing unauthorized access and ensuring that only the right people can access sensitive data in your application. As your app grows in complexity, so does the challenge of enforcing permissions in a clean and efficie..."
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-1-implementing-permissions-with-casl"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

[<FontIcon icon="fas fa-globe"/>CASL](https://casl.js.org/v6/en) is an open-source, isomorphic JavaScript library that makes managing permissions in your app much easier with its simple, declarative API.

What this means is that you can use CASL on both the client-side (front-end) and server-side (back-end). This is especially great for full-stack applications, as it ensures consistency in access control. The same permission logic can be applied across your entire app, no matter where the request is coming from.

With CASL, you get **declarative access control**, which means you define *what* is allowed, rather than worrying about *how* to check permissions. This makes your code cleaner, more readable, and easier to maintain. Whether you're hiding UI elements in the front-end or making sure an API call is authorized in the back-end, CASL helps you enforce permissions consistently across your app.

The best part? You can define permissions using a clear, expressive syntax. This makes it easy to manage even complex permission rules. For example, you can control what a user can (or cannot) do based on their role, the resources they own, and other factors.

And it’s not just for React/React Native - they provide supporting packages for [<FontIcon icon="fas fa-globe"/>Angular](https://casl.js.org/v6/en/package/casl-angular), [<FontIcon icon="fas fa-globe"/>Vue](https://casl.js.org/v6/en/package/casl-vue) and [<FontIcon icon="fas fa-globe"/>Aurelia](https://casl.js.org/v6/en/package/casl-aurelia) too.

---

## Step 1: Install CASL

First, install CASL using a package manager. I have used v6 for the code examples.

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @casl/react @casl/ability
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm install @casl/react @casl/ability
# or
pnpm add @casl/react @casl/ability
```

:::

---

## Step 2: Define the abilities

In CASL, think of "abilities" as a set of rules that define what actions a user can or cannot perform on specific subjects (like "Posts" or "Users"). Let’s use our earlier examples from the blogging application. For simplicity, we’ll consider two types of users: **Admins** and **Authors**.

- An Admin can manage everything.
- An Author can create and edit their own posts within assigned categories, but they cannot delete published posts.

Now, create a <FontIcon icon="iconfont icon-typescript"/>`defineAbilities.ts` file to define the abilities in a high-level, declarative manner using DSL.

Start by defining the `Actions` that a user can perform (for example, `create`, `read`, `update`, `delete`, `manage`) and the `Subjects` (the entities that actions are performed on, such as `‘User’`, `‘Post‘`, or objects like `User` or `Post`).

```ts title="defineAbilities.ts"
type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = 'User' | 'Post' | 'all' | User | Post
```

Then, create a type representing the structure of your abilities. It combines the `Actions` and `Subjects` to create a clear and type-safe ability system.

The `PureAbility<[Actions, Subjects]>` means that the ability system will know what actions are allowed on which subjects. The `createAppAbility` function is used to create an ability instance based on your defined actions and subjects. You can use this function to create abilities specific to a user’s role or permissions.

```ts title="defineAbilities.ts"
import { CreateAbility, PureAbility, AbilityBuilder, createMongoAbility } from '@casl/ability';
// other imports

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = 'User' | 'Post' | 'all' | Post | User

export type AppAbility = PureAbility<[Actions, Subjects]>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>
```

Note that `createMongoAbility` is only used to support simple operators from [<FontIcon icon="iconfont icon-mongodb"/>MongoDB Query Language](https://mongodb.com/docs/manual/reference/operator/query/), like $in, $lte, $eq that are used to specify conditions for your rules. Don't worry - this doesn't mean your app has to use MongoDB, nor do you need to be familiar with the query language. You can also skip these entirely and create custom operators.

Next, define a function called `defineAbilityFor`, which takes a `user` object as its argument and returns an ability instance. The `user` object is expected to have a `role` property (such as 'admin' or 'author') that determines the user's permissions.

The `userPermissions` object maps each user to a function that defines their permissions using the `can` and `cannot` methods provided by `AbilityBuilder`. This approach scales better than a switch case as you add more roles.

```ts :collapsed-lines title="defineAbilities.ts"
export default function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(createAppAbility);
   const userPermissions = {
    admin: () => {
      // Admin user can manage everything
      can('manage', 'all');
    },
    author: () => {
      // Author can create Posts but cannot delete them
      can('create', 'Post');
      cannot('delete', 'Post');
    },
    // Add more roles
  };

  // Call the permissions associated with the user, or default to no permissions.
  const permissions = userPermissions[user.role] || (() => {});
  permissions(); 

  return build();
}
```

Note: `manage` and `all` are keywords in CASL where manage means any action and all means any subject.

To specify conditions that prevent users from updating posts they haven't created, deleting published posts, and to restrict access to certain fields, you can use **conditions** and **fields**. CASL allows you to set specific conditions on permissions via the `subject` property, which represents the object, and the `fields` property, which represents the object’s properties that the user is interacting with.

Add conditional rules to the above file.

```ts
author: () => {
  // Author can create posts in the 'Tech' and 'Lifestyle' categories
  can('create', 'Post', { category: { $in: ['Tech', 'Lifestyle'] } });

  // Author can update the title and description of posts authored by the user
  can('update', 'Post', ['title', 'description'], { ownerId: user.id, status: 'draft' });

  // Author cannot delete posts that have a 'Published' status
  cannot('delete', 'Post', { status: 'published' });
},
```

In CASL, direct rules (like `can`) are combined using `OR` and inverted rules (like `cannot`) and conditions are combined using `AND`. The author:

- can create Posts in their assigned categories `OR`
- can update title/description of the Posts that they own `AND` are in Draft state
- `AND` cannot delete published Posts

Remember, for the same action/subject pair, you should define `cannot` rules *after* `can` rules, else they will be overridden.

When dealing with a `Post` object that has a nested `details` field (for example, `details.author.name`, `details.metadata.tags`), you can use the `*` and `**` wildcards to control access based on the level of nesting.

- The `*` wildcard matches only the **top-level fields** within a given object.<br/>This means it will grant access to fields that are directly inside the `details` object, but not any **nested fields**.
- The `**` wildcard allows access to **all fields**, including deeply nested ones, within the object.<br/>This means it will grant access to every field inside `details`, regardless of how deep the nesting goes.

```ts
// gives access to all nested fields under Post.details, no matter how deep they are
can('read', 'Post', ['details.**']) 

// give access to only the top level fields (such as details.body, details.author)
can('read', 'Post', ['details.*'])
```

Note that `*` matches all symbols except dot (.)

The ability instance in `defineAbilities.ts` can be used to enforce permissions across your app. This file can act as a shared library, so both the front-end (for example: React) and back-end (for example: Node.js) can access and use the same permission logic.

While the `AbilityBuilder` works for permissions defined inside the system, if your application receives externally defined permissions as a JSON object, like:

```json
[
  {
    "action": "read",
    "subject": "Post"
  },
  {
    "inverted": true, // indicates cannot rules
    "action": "delete",
    "subject": "Post",
    "conditions": { "published": true }
  }
]
```

you can pass it directly into the `Ability` constructor as follows:

```ts title="defineAbilityFor.ts"
const defineAbilityFor = (permissions: (SubjectRawRule<any, any, MongoQuery<AnyObject>>)[]) => {
  return createMongoAbility<[Actions, Subjects]>(permissions);
}

export default defineAbilityFor;
```

Using JSON to define rules also has the added advantage of **reducing your app's bundle size** since you don't need to include heavy dependencies like `AbilityBuilder`!

---

## Step 3: Create ability instance for the user

After successful authentication by your Login or Authentication service, you’ll fetch the user data or associated permissions (depending on the approach you choose in step 2) to your app and create an ability instance in your login component (or similar) as follows:

```ts title="login.tsx"
import defineAbiltyFor from './config/defineAbilities.js'

const LoginComponent = () => {
    // Get user data from API. Then,
    const ability = defineAbilityFor(user)
}
```

---

## Step 4: Provide ability instance to the entire app

[<FontIcon icon="fa-brands fa-react"/>Contexts](https://react.dev/reference/react/createContext) are used in React to share data across components without having to pass props through the component tree. Add the below code in a `can.ts` file:

```ts title="can.ts"
import {createContext} from 'react'
import {createContextualCan} from '@casl/react'

export const AbilityContext = createContext()
export const Can = createContextualCan(AbilityContext.Consumer)
```

This creates a `Can` component, which you will use in the next step to determine if a user has permissions to perform an action, based on the abilities passed through `AbilityContext`.

Next, use the above `AbilityContext` to wrap your `App` component and set the `ability` instance created in step 3 as the `value`, so that the abilities are available to all the components in the application.

```tsx title="App.tsx"
ReactDOM.render(
  <AbilityContext.Provider value={ability}>
    <App />
  </AbilityContext.Provider>,
  document.getElementById('root')
)
```

---

## Step 5: Check user permission using abilities

There are two ways to determine if a user has permission to perform an action: using `ability.can` for programmatic checks and using the `Can` component for conditional rendering.

Assume this is your post object:

```ts title="post.ts"
export interface Post {
  ownerId: string;
  category: string;
  title: string;
  description: string;
  status: string;
}
const post: Post = {
  ownerId: 'yourUserName',
  category: 'Lifestyle',
  title: 'My First Post',
  description: 'This is the description for the first post.',
  status: 'published'
};
```

Both `ability.can` and the `Can` component take action, subject, and an optional field and check these parameters against the defined abilities.

```tsx :collapsed-lines title="user-profile.tsx"
import { useAbility } from '@casl/react';
import { subject } from '@casl/ability';
import { AbilityContext, Can } from '../config/can';
// other imports

export default const UserProfile = () => {
  const ability = useAbility(AbilityContext);

  const canCreatePost = ability.can('create', 'Post'); //==== Example (1) ====
  const canDeletePost = ability.can('delete', post); //==== Example (2) ====

  return (
    <div>
      <h1>User Profile</h1>

      {/* ==== Example (3) ==== */}
      <Can I="delete" a="Post">
        <p>You can delete a Post.</p>
      </Can>

      {/* ==== Example (4) ==== */}
      <Can I="delete" this={subject('Post', post)}>
        {(allowed) =>
          allowed ? <button disabled={!allowed}>Delete Post</button> 
          : <p>Cannot delete post.</p>
        }
      </Can>
    </div>
  );
}
```

See how readable the permission check is?

Now look at the four examples.

Example `(1)` returns true because user can create posts.

Example `(2)` should return true because you can delete your published posts, **but it return `false`**. Why? Because even though `post` is an instance of `Post`, CASL cannot detect its subject type (type of `post` object) as CASL uses `object.constructor.modelName` or `object.constructor.name` for subject type detection.

You have two ways to fix this.

- Use a `subject` helper to specify the type of `post` instance as shown in example `(4)` (it returns true)
- Use a custom subject type detection algorithm to state which property CASL needs to use to discern the type. This can be done using `detectSubjectType` like this:

```ts title="defineAbilities.ts"
export default function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(createAppAbility);
  // rules defined as explained above

  return build({
    detectSubjectType: object => object.__typename
  });
}
```

```ts title="post.ts"
const post: Post = {
  ownerId: 'yourUserName',
  category: 'Lifestyle',
  title: 'My First Post',
  description: 'This is the description for the first post.',
  status: 'published',
  __typename: 'Post'
};
```

Now, example `(2)` should return true.

Next, look at example `(3)`. It also returns true because the check is on subject *type* and not on the subject. Remember, when you check on a

::: info CASL. Isomorphic Authorization JavaScript library <code>casl.js.org</code>

<SiteInfo
  name="CASL. Isomorphic Authorization JavaScript library"
  desc="CASL (pronounced /ˈkæsəl/, like castle) is an isomorphic authorization JavaScript library which restricts what resources a given user is allowed to access. It's designed to be incrementally adoptable and can easily scale between a simple claim based and fully featured subject and attribute based authorization. It makes it easy to manage and share permissions across UI components, API services, and database queries."
  url="https://casl.js.org/v6/en/guide/intro/"
  logo="/v6/app-icons/favicon-16x16.png"
  preview="/v6/app-icons/android-chrome-256x256.png"/>

> - subject, you ask "can I delete THIS post?"
>
> - subject type, you ask "can I delete SOME article?" (that is, at least one post)

:::

While CASL offers a powerful approach to granular access control, it doesn’t directly address our requirement to apply conditions based on user attributes.

Although third-party libraries can provide convenience, their documentation is sometimes unclear, outdated, or inaccurate, and there may be vulnerabilities within the components themselves. For complete control over your security processes, implementing custom authorization logic may be necessary.
