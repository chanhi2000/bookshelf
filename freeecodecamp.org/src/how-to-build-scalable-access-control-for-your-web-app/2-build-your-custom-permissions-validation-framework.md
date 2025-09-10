---
lang: en-US
title: "2: Build Your Custom Permissions Validation Framework"
description: "Article(s) > (7/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (7/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "2: Build Your Custom Permissions Validation Framework"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/2-build-your-custom-permissions-validation-framework.html
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
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-2-build-your-custom-permissions-validation-framework"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

To build a custom validation framework, let’s look into how the policies are defined, validated, and enforced and see how all these pieces come together.

---

## Policy Definition using Policy as Code

You have already learned that your access control policies should reside in the back-end. For the custom implementation, you will be using **Policy as Code** or PaC. This refers to the practice of defining and managing policies using code or configuration files (like YAML, JSON or DSL) rather than manual processes or documentation. This allows policies to be version-controlled, automatically enforced, and more reliable in dynamic environments. These policies are authored by the security admin and are managed by a Policy Service.

In YAML, your policy may look like this, where the `policies` list is represented by a sequence (`-`).

```yaml
policies:
  - policyId: P001
    resource: Post
    action: view
    effect: allow
    conditions: '(resource.tag != "exclusive") || (resource.tag == "exclusive" && user.role == "premium user")'
  - policyId: P002
    resource: Post
    action: edit
    effect: allow
    conditions: 'resource.ownerId == user.id'
  # other policies
```

The **policyId** is a unique identifier for the policy. The **resource** specifies the type of resource the policy applies to, such as "Post." The **action** defines what operation is allowed or denied on the resource, like "edit." The **effect** determines whether the action is allowed or denied, with values like "allow" or "deny." The **conditions** represent the logical expression that must be satisfied for the policy to apply, such as checking if the resource's owner ID matches the user's ID.

As you can see, the conditions in the policies are in a TypeScript-like, human-readable format. This is because they are written using Google's **Common Expression Language (CEL)**.

CEL is an open-source, platform-independent language that is fast and safe for executing user-defined expressions ([<FontIcon icon="fas fa-globe"/>unlike `eval()`](https://owasp.org/www-community/attacks/Direct_Dynamic_Code_Evaluation_Eval%20Injection), especially on the server-side). Its performance is enhanced because CEL is compiled once into an abstract syntax tree, which is then used to evaluate against multiple inputs in nanoseconds or microseconds.

Let’s redefine the structure as follows:

```yaml :collapsed-lines
policies:
  Post:
    view:
      policyId: P001
      resource: Post
      action: view
      effect: allow
      conditions: '(resource.tag != "exclusive") || (resource.tag == "exclusive" && user.role == "premium user")'
    edit:
      policyId: P002
      resource: Post
      action: edit
      effect: allow
      conditions: 'resource.ownerId == user.id'
    publish:
      policyId: P003
      resource: Post
      action: publish
      effect: allow
      conditions: 'user.role == "publisher" && resource.category in ["Tech", "Lifestyle"] && resource.status == "approved" && system.time >= "09:00:00" && system.time <= "18:00:00"'

  Comment:
    create:
      policyId: C001
      resource: Comment
      action: create
      effect: deny
      conditions: 'user.role == "guest"'
    edit:
      policyId: C002
      resource: Comment
      action: edit
      effect: allow
      conditions: 'resource.authorId == user.id'
    delete:
      policyId: C003
      resource: Comment
      action: delete
      effect: allow
      conditions: 'resource.authorId == user.id || user.role in ["moderator", "admin"]'
  # other policies
```

Here’s why:

1. **Improved Structure**: By grouping policies by resource and action, you make it much easier to navigate. Adding new policies or actions becomes a breeze, without disrupting the overall setup. For example, if you need to add an `archive` action for the `Post` resource, you simply add it under the `Post` object. This modular approach makes maintaining and extending policies much simpler.
2. **Efficient Lookup**: When these policies are accessed in your app as JavaScript objects, lookups are efficient and constant in time (O(1)). This is because policies are stored using direct key lookups, where each policy can be accessed instantly by its unique key. This significantly boosts performance compared to searching through a list (which would take O(n) time). As the number of policies grows, your lookup time stays the same, so performance doesn't slow down.
3. **Easier Auditing & Version Control**: This structure also makes auditing and version control much smoother. You can easily track changes to policies and manage updates without the risk of accidentally disrupting other policies.

::: note

<SiteInfo
  name="Chromegg - Cel Js (forked) - StackBlitz"
  desc="cel-js is a  Common Expression Language (CEL) evaluator for JavaScript"
  url="https://stackblitz.com/edit/github-b9k23yjf-kbho9jtj?file=demo.ts/"
  logo="https://c.staticblitz.com/assets/favicon_sb-4f3d9011b264e56e3f61cf6612c50dd3b8fcae038843ba2d10c8d0b6194d19d6.png"
  preview="https://social-img.staticblitz.com/projects/github-b9k23yjf-kbho9jtj/8f4defb49e6279008367e7cf45260927"/>

To understand how string literals work in CEL for the above conditions, check out some examples [here (<FontIcon icon="iconfont icon-stackblitz"/>`github-b9k23yjf-kbho9jtj`)](https://stackblitz.com/edit/github-b9k23yjf-kbho9jtj?file=demo.ts).

:::

---

## Workflow Overview

When the application starts, you fetch policies from the Policy Service using RTK Queries, which automatically caches them in your RTK cache. Once the user is authenticated, their data—like role and department—will also be stored in the cache.

To persist this data for the duration of the session, you'll need to store it in session storage, but be mindful to avoid storing sensitive information. For the purposes of our permission validator, we'll read user data directly from the cache.

At points where policy enforcement is needed, such as in components or routes (let’s call these *policy enforcement points*), the application will call our custom permission hook. This hook then validates permissions based on the policies, the user, the resource, and the environment attributes to either grant or deny access to the requested action.

![Attribute-based Access Control Workflow](https://cdn.hashnode.com/res/hashnode/image/upload/v1737780571125/1dba1568-ee54-4bea-8d25-5c058fa6da68.jpeg)

---

## Policy Validation

### Step 1: Create a permission validator

Begin by defining the types for `Action`, `Resource`, and `Policy` in your code:

```ts title="validator.type.ts"
export type Action = "view" | "edit" | "create" | "approve" | "publish" | "delete";
export type Resource = Partial<Post> | Partial<User> | Partial<Comment>;

export type PolicyEffect = "allow" | "deny"

export interface Policy {
  policyId: string;
  resource: string;
  action: string;
  effect: PolicyEffect;
  conditions: string;
}
```

You might be wondering why you need to use `Partial` here. By using `Partial`, we’re saying that each field on `Post`, `User`, or `Comment` is not required when performing certain actions. This is particularly useful when you validate create actions, where the object may not be fully formed yet - some fields might still be missing. For example, when creating a new `Post`, you might only have a title and content, but not the full list of comments or tags.

Then, install `cel-js`, a CEL evaluator for JavaScript to be used in your validator.

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add cel-js
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i cel-js
```

:::

Create a `validatePermission` function to pull the action rules for the given resource from the provided `policies` object and build a context that includes the `user`, `resource`, and `system` information. Note that you may have to use `__typename` (or similar) for resource type detection, similar to what you did in CASL.

Using the `cel-js` library, evaluate the `conditions` specified in the action rules, which will check if the user meets the required criteria for the action. If the conditions are satisfied, the policy "takes effect," meaning the specified action is enforced according to the defined effect - whether allowing or denying the action. If there are no rules defined or an error occurred during evaluation, deny by default.

```ts :collapsed-lines title="validator.ts"
import * as cel from 'cel-js';
// other imports

export const validatePermission = (
  action: Action,  
  resource: Resource,  
  system: System, 
  user: User,
  policies: { [resourceKey: string]: { [actionKey: string]: Policy } }
): boolean => {

  const actionRules = policies[resource.__typename]?.[action];
  if (!actionRules) return false; 

  try {
    const context = {
      user: user,  
      resource: resource,  
      system: system,  
    };

    return cel.evaluate(actionRules.conditions, context) && actionRules.effect === "allow";

  } catch (error) {
    console.error('Error evaluating permission condition:', error);
    return false;
  }
};
```

Any component that needs to validate a user’s permission for an action requires fetching policies from the cache and retrieving the user from the global state, while also managing loading and error states.

To avoid this code duplication and encapsulate the logic for the above operations, you can create a custom hook that provides a consistent interface for permission validation across components.

### Step 2: Create a custom hook to encapsulate reusable logic

Since the policies were already fetched from the policy management service during app startup, the same RTK Query will now retrieve them directly from the cache. Follow the below reference to create a `usePermission` custom hook.

Notice how the `skip: !userId` condition is used to ensure that the policies are only fetched if a valid `userId` is present, preventing unnecessary network requests.

```ts :collapsed-lines title="usePermission.ts"
import { useSelector } from 'react-redux';
import { useGetPoliciesQuery } from './services/api'; 
import { validatePermission } from './validator';
// other imports

export const usePermission = (action: Action, resource: Resource, system: System): boolean => {

  const user = useSelector((state: any) => state.user); 

  const { data: policies, isLoading: isPoliciesLoading, isError: isPoliciesError } = useGetPoliciesQuery({
    skip: !userId,
  });

  if (isPoliciesError || !policies) {
    console.error('Failed to fetch policies');
    return false;
  }

  const hasPermission = validatePermission(action, resource, system, user, policies);

  return hasPermission;
};
```

### Step 3: Add contextual action validation

More often than not, even if a user has the required permission to perform an action, they still might not be allowed to do so because of contextual business logic. For example:

- **Post approval**: An editor may have permission to approve a post, but if they’re in the middle of editing it and there are unsaved changes, the approve button should be hidden.
- **Commenting**: The comment button should be disabled if a user hasn’t typed anything, even if they have permission to comment.
- **Category creation**: A user with permission might still be blocked from creating a category if the name is empty or already exists.

These rules depend on the current state of the application and need to be handled dynamically. To handle these contextual actions, the validation rules should be defined based on the current state of the application (for example, the post being edited, content being typed, category name availability).

Before delving into how custom hooks can handle these validations, let’s first lay out the rules for these contextual actions:

```ts :collapsed-lines title="contextualRules.ts"
import _ from 'lodash';
// other imports ...

const contextualActionRules = {
  Post: {
    approve: (state: PostState, resource: Resource) => {
      // Prevent approval if the post is currently being edited
      const postId = resource?.id;
      return postId && !state[postId]?.isEditing;
    },
  },
  Comment: {
    create: (state: CommentState, resource: Resource) => {
      // Prevent creating a comment if the comment content is empty
      return !_.isEmpty(resource?.content);
    },
  },
  Category: {
    create: (state: CategoryState[], resource: Resource) => {
      // Prevent creating a category if the name is empty or already exists
      const categoryName = resource.name?.trim();
      return (
        !_.isEmpty(categoryName) &&
        !state.some(category => category.name === categoryName)
      );
    },
  },
};
```

Now, update the `usePermission` hook to incorporate checks for `contextualActionRules`. If a contextual rule is defined for the specified `resource` and `action`, it will be evaluated alongside the policy-based permission using the current application `state`. If no contextual rule is found, the hook will return the result based solely on the policy-based permission.

```ts
// usePermission.ts

export const usePermission = (action: Action, resource: Resource, system: System): boolean => {

  const state = useSelector((state: RootState) => state);

  /**
    This part of the code is same as above
  **/ 

  const hasPermission = validatePermission(action, resource, system, user, policies);
  const validateContextualRule = contextualActionRules[resource?.__typename]?.[action];

  if (validateContextualRule) {
    const contextualActionAllowed = validateContextualRule(state, resource);
    return hasPermission && contextualActionAllowed;
  }

  return hasPermission;
};
```

There is one thing that most **definitely** needs to be changed in the above code. Take a guess?

**How is `usePermission` beneficial for contextual validations based on the app state?** Because the hook is subscribed to the application state! So, when something changes - like typing into a comment box - the hook re-renders. Since the Comment component relies on this hook to control the comment button’s state, any update in the hook also triggers a re-render of the component. This means that as you type, the button becomes visible, and if the content is cleared, the button gets disabled.

But, we don’t want the `usePermission` hook to re-render *every* time the app state changes. Let’s fix that.

Define `resourceToStateMap` outside the `usePermission` hook to avoid redundant re-creation for every call. `useSelector` subscribes only to the relevant slice of state based on the resource type and ID.

```ts
// Bad practice: Instead of this,
const state = useSelector((state: RootState) => state);

// Good practice: Do this
const resourceToStateMap: Record<string, (state: RootState, id: string | number) => any> = {
  Post:     (state, id) => state.posts[id],
  Comment:  (state, id) => state.comments[id],
  User:     (state, id) => state.user,
  // Add more 
};

const resourceType = resource?.__typename;
const resourceId = resource?.id;
const stateSlice = useSelector((state: RootState) => {
  if (resourceType && resourceId && resourceToStateMap[resourceType]) {
    return resourceToStateMap[resourceType](state, resourceId);
  }

  return null;
});
```

This is why it’s important to make selectors as granular as possible.

- **Avoid over-fetching**: You’re not selecting the entire state anymore, just the piece of it that’s necessary for evaluating the permission and contextual rules. This is much more efficient, especially in large applications.
- **Optimized re-renders**: With granular state selection, only the relevant state slice will trigger a re-render, improving the performance of the application, especially when many components are using the `usePermission` hook.

Now that you’ve completed the bulk of the permission validation logic, let’s make it prettier to use.

### Step 4: Create a wrapper for conditional rendering

Create a `Can` component that checks if the user has permission to perform a specific action on a resource using the `usePermission` hook. If permission is granted, it renders the `children` or calls it as a function with the permission status (this will be used to disable buttons). If not, it displays a fallback element.

```tsx :collapsed-lines title="Can.tsx"
import { usePermission } from '../hooks/usePermission';

export interface CanProps {
  I: Action;
  a: Resource;
  context: System;
  fallback?: React.ReactNode; 
  children: React.ReactNode | ((allowed: boolean) => React.ReactNode); 
}

const Can: React.FC<CanProps> = ({
  I,
  a,
  context,
  fallback = null,
  children,
}) => {
  const hasPermission = usePermission(I, a, context);

  // If `children` is a function, call it with `hasPermission`
  if (typeof children === 'function') {
    return <>{children(hasPermission)}</>;
  }

  // Otherwise, render children or fallback
  if (hasPermission) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default Can;
```

---

## Policy Enforcement

You can use the `usePermission` hook for programmatic checks and the `Can` component for conditional rendering.

### 1. Using `Can` to hide/show components

```tsx
<Can
  I="approve"
  a={post}
  context={system}
  fallback={<p>You do not have access to delete a comment.</p>}
>
  <YourComponent />
</Can>
```

### 2. Using `Can` to disable components

```tsx
<Can
  I="delete"
  a={comment}
  context={system}
>
  {(allowed) => (
     <button onClick={deleteComment} disabled={!allowed}>
       Delete Comment
     </button>
   )}
</Can>
```

### 3. Using `usePermission` to create protected routes

```tsx title="ProtectedRoute.tsx"
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const hasPermission = usePermission("view", user, context);

  return hasPermission ? <Outlet /> : <Navigate to='/login' />
}

// Route set-up
<Route element={<ProtectedRoute />}>
  <Route path='/' element={<Admin />} />
</Route>
```

### 4. Using `usePermission` to skip API calls

```ts
const hasPermission = usePermission("view", user, context);

const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery({
    skip: !hasPermission,
});
```

That's it! Now, let's wrap up with a quick summary.
