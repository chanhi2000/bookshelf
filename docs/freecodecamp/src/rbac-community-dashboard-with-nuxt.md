---
lang: en-US
title: "How to Implement RBAC in a Community Dashboard with Nuxt"
description: "Article(s) > How to Implement RBAC in a Community Dashboard with Nuxt"
icon: iconfont icon-nuxt
category:
  - Node.js
  - Nuxt.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - nuxt
  - nuxtjs
  - nuxt-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement RBAC in a Community Dashboard with Nuxt"
    - property: og:description
      content: "How to Implement RBAC in a Community Dashboard with Nuxt"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/rbac-community-dashboard-with-nuxt.html
prev: /programming/js-nuxt/articles/README.md
date: 2024-11-23
isOriginal: false
author: Obum
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732043730534/d88680d7-2590-4541-9120-40a43c3724ef.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Nuxt.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nuxt/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement RBAC in a Community Dashboard with Nuxt"
  desc="Role Based Access Control (RBAC) is a useful authorization model for users with different access levels, such as those in a community dashboard. In this article, you’ll learn how to integrate this type of authorization with Permit.io in Nuxt. Table o..."
  url="https://freecodecamp.org/news/rbac-community-dashboard-with-nuxt"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732043730534/d88680d7-2590-4541-9120-40a43c3724ef.png"/>

Role Based Access Control (RBAC) is a useful authorization model for users with different access levels, such as those in a community dashboard.

In this article, you’ll learn how to integrate this type of authorization with Permit.io in Nuxt.

---

## What is the Difference Between Authentication and Authorization?

When building applications, we often carry out authentication together with authorization. However, these two concepts are essentially different.

Authentication is verifying who a user is. During the authentication process, the user usually needs to log in with some identifier like email, phone, username, *with* Google, *with* Microsoft, and so on.

Authorization specifies the resources an authenticated user can view and what they can do in the application. Authorization tells a user's access rights after that user has been successfully authenticated.

For example, authentication is a user logging in with email and password or verifying their phone number with SMS. On the other hand, authorization is a writer creating and editing posts while only admins can approve and publish those posts.

The primary purpose of authentication is to establish a user's identity before granting them access to the system. The main goal of authorization is to control user actions and protect sensitive data or resources.

---

## What is Role Based Access Control (RBAC)?

Role-Based Access Control (RBAC) is an authorization model that you can use to manage and restrict access to system resources. It is based on the responsibilities, duties, or roles of users.

In RBAC, roles represent predefined sets of permissions that tell which actions a user can execute in an application. These roles are then assigned to users based on their job functions or responsibilities.

In common systems, anyone can assign permissions to individual users. In RBAC, we group permissions into roles. In turn, we assign these roles to users. For example, in a community dashboard, users might have roles like “Admin”, “Mentor”, or “Member”.

Aside from Role-Based Access Control, other popular authorization models exist such as Attribute-Based (ABAC) and Relationship-based (ReBAC) access controls. Attribute-Based Access Control uses a wide range of attributes and fits constantly changing systems. You could also combine it with Role-Based Access Control. For more info, see the [<VPIcon icon="fas fa-globe"/>Permit.io article on RBAC vs. ABAC](https://permit.io/blog/rbac-vs-abac).

---

## What are the Benefits of Using Authorization As A Service?

You can build authorization models yourself in your application. But it may be time-consuming and cost-ineffective in the long run.

Using an external provider for authorization allows you to focus on the business logic in your applications. The benefits of outsourcing authorization are similar to using a third party like Auth0 or Firebase for Authentication.

[<VPIcon icon="fas fa-globe"/>Authorization as a Service](https://permit.io/blog/authorization-as-a-service) provides a solution for managing user access and permissions in applications. When you use such an authorization solution, you enjoy enhanced security, granular access policies’ control, auto-scaling policies, reduced maintenance burden, faster upgrades, robust logging, and so on.

Permit.io is free to use for [<VPIcon icon="fas fa-globe"/>up to a 1000 Monthly Active Users](https://docs.permit.io/manage-your-account/workspace-usage/#maus--tenants-usage), and has a UI and API for RBAC, ABAC, and ReBAC.

To Get Started with Permit.io:

- Go to [<VPIcon icon="fas fa-globe"/>app.permit.io](https://app.permit.io)
- Create an account
- Create a workspace (in your account)

![Demo of Getting Started with Permit.io](https://cdn.hashnode.com/res/hashnode/image/upload/v1732037452876/4604ad72-c5cc-4e07-8f04-70ff4f3dbb8c.gif)

---

## What We’ll Be Building

A community dashboard connects members within a community or forum. It is a platform where they can interact and access resources.

For demo purposes of RBAC, we’ll build a simple community dashboard that will include 3 types of content (entities): posts, materials, and announcements*.*

The code we will be using is at [<VPIcon icon="iconfont icon-github"/>`obumnwabude/rbac-community-dashboard`](https://github.com/obumnwabude/rbac-community-dashboard). It consists of a Nuxt repo with its server configured for API calls and its front end built with Vue. Clone it with git and explore the code in an editor/IDE.

In the server, we will expose *GET, POST,* and *DELETE* endpoints for each entity (posts, materials, and announcements). In Nuxt, you can use the HTTP verb in the file name for the endpoint handler. So we can have <VPIcon icon="iconfont icon-typescript"/>`posts.get.ts`, <VPIcon icon="iconfont icon-typescript"/>`posts.delete.ts`, <VPIcon icon="iconfont icon-typescrip"/>`materials.post.ts`, and so on, with each file containing the respective handler for the involved API endpoint.

In addition, the server files store and retrieve entities from JSON files. You should have a robust database setup in your product. For this project, we’ll use local JSON files to build a minimum reproducible example with focus on roles and authorization.

In the front end, we have four pages: three for the entities and a settings page. There is also a simple navigation: a bottom bar on smaller screens and a sidebar on wider ones. Each entity page shows a list of its items and a small form to create new ones.

Furthermore, the demo code uses [<VPIcon icon="iconfont icon-tailwindcss"/>tailwindcss](https://tailwindcss.com/) to style everything quickly. The settings page contains hardcoded user examples and roles for the demo. When testing, toggle the current user and see the roles in action.

![Demo of Exploring the Community Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1732031161755/36a4981c-bc1c-4156-afb8-05fab7d45ee7.gif)

This article focuses on the parts of the code that deal with authorization. For the backend and the UI specifics of the community dashboard, we will only overview them. After that, we will deep dive into RBAC touchpoints.

---

## How to Plan RBAC with Permit.io

Overall, planning authorization means mapping out “who” can carry out an action on “what*”*. In RBAC, we define roles and then assign them to users. The roles and users combo is the “who” part of the authorization.

The “what” side refers to the entities or resources that your application provides or manages. For this article’s example, we’ve chosen our resources as Posts, Materials, and Announcements.

Actions are user activity. The most common actions are “create*”, “*read*”, “*update*”,* and, “delete*”*. Per resource in your application, you can use these four actions, add more, or omit some. In this article, our resources will each have all four actions.

When planning authorization, define resources alongside the *“*actions” users can execute on each resource. After that, define roles. For each role, specify what actions a user holding that role can carry out on each resource. The mapping of resources, actions, and roles allows you to define the authorization policies of your application.

Permit.io makes it easy to edit policies. In Permit.io, you have an intuitive dashboard where you can create resources and their actions, create roles, and merge both with policy tables.

![Demo of Creating Resources and Actions in Permit.io](https://cdn.hashnode.com/res/hashnode/image/upload/v1732037510499/2c0acabb-e0b4-4002-8b7b-e2fd4dbb4777.gif)

For our Community Dashboard example, we will create three roles with incremental access: member, mentor, and admin. For each role, we’ll allow read access to all resources. However, each role has different management access levels to the resources as follows:

- **Members** can view all entities but can only create or delete posts.
- **Mentors** can view all entities and can create or delete posts and materials.
- **Admins** can create, view, and delete all entities.

Assigning roles to actions in resources is the same as editing policies.

![Demo of Creating Roles and Editing Policies in Permit.io](https://cdn.hashnode.com/res/hashnode/image/upload/v1732037619254/e8900675-18c0-429c-9840-3ba8c1c38a6c.gif)

---

## How to Setup Permit.io in Nuxt

For our demo project, you need to run `npm install`, create a <VPIcon icon="fas fa-file-lines"/>`.env` file, and export your Permit token.

However, if you are building a new project, to setup Permit in Nuxt, first install it with npm.

```sh
npm install permitio
```

After that, create a `.env` file and add your `PERMIT_TOKEN`. Get the token from the dashboard.

```properties title=".env"
PERMIT_TOKEN=permit_key_XXXXXXXXXXXXXXXXXXXXX
```

To make this token available to the Nuxt `runtimeConfig`, add it to the <VPIcon icon="iconfont icon-nuxtjs"/>`nuxt.config.ts` file. Also, add `permitio` (alongside other dependencies) in the `transpile` array of the build property of the Nuxt config file.

This addition is to account for Nuxt’s specific optimizations. Your <VPIcon icon="iconfont icon-nuxtjs"/>`nuxt.config.ts` file should look like the following:

```ts title="nuxt.config.ts"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ... other properties

  build: {
    transpile: ['axios', 'permitio', 'pino']
  },
  runtimeConfig: {
    permitToken: process.env.PERMIT_TOKEN
  }
});
```

After these, Permit.io should be available to your server code in Nuxt. You can now use in it middleware code to check for permissions.

---

## How to Control API Access with Nuxt Middleware

In simple terms, middleware is code that runs before a target handler. In Nuxt, you can add middleware for API endpoints by creating necessary files in a <VPIcon icon="fas fa-folder-open"/>`middleware` directory contained in the top-level <VPIcon icon="fas fa-folder-open"/>`server` directory.

Since we are dealing with permissions, we will name our middleware file <VPIcon icon="iconfont icon-typescript"/>`permissions.ts`. Here, you’ll check if a user is permitted to take an action on a given resource.

Permit.io makes this easy with a simple `.check` method that returns a Boolean indicating if the user is permitted.

```ts title="middleware/server/permissions.ts"
await permit.check(user, action, resource);
```

For this simple example community dashboard, our middleware code will first try to determine the user and action from the request properties. The example code achieves that in crude ways. They are enough to explain the concept and you should use more robust industry-standard methods for this.

After that, in the example code below, we construct the Permit object using our permit token and the default public PDP (Policy-Decision-Point microservice)’s endpoint. The [Permit PDP is open-source. (<VPIcon icon="iconfont icon-github"/>`permitio/PDP`)](https://github.com/permitio/PDP) If you wish, you can set up your local/personal PDP by following the steps [<VPIcon icon="fas fa-globe"/>here](https://docs.permit.io/how-to/deploy/deploy-to-production).

```ts :collapsed-lines
import { Permit } from 'permitio';

export default defineEventHandler(async (event) => {
  // Only check permissions if the request is a POST or DELETE request
  const { method, path } = event;
  if (method !== 'POST' && method !== 'DELETE') return;

  // Ensure authorization header is present
  let authorization = event.node.req.headers['authorization'];
  if (!authorization) throw new Error('Unauthorized');

  // Extract the user from the authorization header. This is for example
  // purposes only. In a real application, you would use a JWT library or
  // better authentication methods in your API.
  const user = authorization.split(' ')[1];
  if (!user) throw new Error('Unauthorized');

  // Extract the resource from the path. This is for example purposes only.
  let resource = path.split('/').reverse()[0]; // get the last part of the path
  resource = resource.slice(0, -1); // remove the trailing 's' 
  // Capitalize the first letter
  resource = resource.charAt(0).toUpperCase() + resource.slice(1);

  // Set the action on the resource from the request method. 
  // This is for example purposes only. In a real application, you would
  // have a more robust way to determine the action. 
  const action = method === 'POST' ? 'create' : 'delete';

  // Construct the Permit object. Use the token from runtime config.
  const config = useRuntimeConfig(event);
  const permit = new Permit({
    pdp: 'https://cloudpdp.api.permit.io',
    token: config.permitToken
  });

  // Check if the user is permitted to create the resource. 
  // If not, throw an error.
  const isPermitted = await permit.check(user, action, resource);
  if (!isPermitted) throw new Error('Unauthorized');
});
```

As you can see, if the Permit checker fails, an error will be thrown. This will make Nuxt to prevent unauthorized resource management in your system. Such separation of concerns is efficient, especially in Authorization.

---

## How to Test RBAC in the Community Dashboard

The settings page works together with the <VPIcon icon="fas fa-folder-open"/>`stores/`<VPIcon icon="iconfont icon-typescript"/>`permissions.ts` file to complete the flow in the front end. We hardcoded the roles and the “user IDs” to ease toggling and testing. You definitely won’t have this in a production application. You can [<VPIcon icon="fas fa-globe"/>integrate CASL for permission checks in a frontend](https://docs.permit.io/integrations/feature-flagging/casl/).

In this demo community dashboard, the UI touchpoints only allow edits of entities for which the acting user has the right roles. In other words, you can only add or delete an entity if the current role in the settings page allows that. Let’s see this in action.

In the Permit.io dashboard, create three test users: “example-member”, “example-mentor”, and “example-admin”. Assign the respective roles to each user.

![Demo of Creating Test Users and assigning Roles in Permit.io](https://cdn.hashnode.com/res/hashnode/image/upload/v1732037709104/0cb7b666-8597-4839-802b-e79e0434572a.gif)

Start up the Nuxt app by running `npm run dev`. Visit `localhost:3000` in your browser and explore the role-based authorization in the demo community dashboard.

You can see that when you set the Current User to admin, you can create and delete announcements, but when set to guest, you can only view entities and not manage them. With this, we’ve fully implemented authorization.

![Demo of Testing Roles in the Community Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1732031066634/54310991-3ce9-4736-8735-c2776e4f6d82.gif)

---

## Summary

You can be more efficient in building your application by focusing on business logic and outsourcing crucial parts like authorization.

In this article, you learned how you can use an authorization solution (Permit.io) to implement Role-Based Access Control in a demo community dashboard with Nuxt. You can also use Permit in any other kind of application (not just community dashboards).

When planning authorization, define resources alongside the *“*actions” users can execute on each resource. After that, define roles as the permissions the users can have.

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement RBAC in a Community Dashboard with Nuxt",
  "desc": "Role Based Access Control (RBAC) is a useful authorization model for users with different access levels, such as those in a community dashboard. In this article, you’ll learn how to integrate this type of authorization with Permit.io in Nuxt. Table o...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/rbac-community-dashboard-with-nuxt.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
