---
lang: en-US
title: "Access Control Models"
description: "Article(s) > (3/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (3/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "Access Control Models"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-scalable-access-control-for-your-web-app/access-control-models.html
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
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-access-control-models"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

At the application layer, three primary models of access control are commonly used in software engineering: Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), and the more recent Relationship-Based Access Control (ReBAC).

**RBAC** **(Role-Based Access Control)** is a model where access is granted or denied based on the roles assigned to a user.

A role is a collection of permissions or privileges that define what actions a user can perform within a system. Roles simplify access control by assigning users to predefined roles, rather than managing individual permissions for each user.

When a user is assigned a role, they automatically inherit all the permissions associated with that role. Each permission also has a scope, which defines the boundaries or contexts within which the role's permissions apply. Scopes are typically used to restrict access to specific resources or data.

Let me illustrate this (and all concepts throughout this guide) using a blogging application as an example. This app allows users to create, manage, and publish blog posts in multiple categories. It supports a variety of user roles, each with different levels of access to the content and functionality within the platform.

- **Admin**: Can view, edit, delete, and manage all blog posts and user roles. (Scope: All posts and users)
- **Editor**: Can edit and approve posts within their assigned categories (for example, Tech, Lifestyle). (Scope: Assigned categories)
- **Author**: Can create and edit only their own blog posts. (Scope: Own posts)
- **Guest User**: Can view public, published blog posts but cannot access private posts. (Scope: Public published posts only)

The relationship between users and roles is often many-to-many, and roles may also be hierarchical, allowing for complex permission structures.

![Role-based Access Control diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1737780482515/e30316f8-58a9-4595-81ba-8eb08b2d5a3d.jpeg)

**ABAC** **(Attribute-Based Access Control)** is a model where access decisions are made based on the attributes of the subject (user), object (resource), and the environment. It dynamically evaluates whether a subject can perform an action on an object based on these attributes and policies that govern them.

**ReBAC** **(Relationship-Based Access Control)** is an emerging model that grants access based on the relationships between users and resources. For example, it might allow only the user who created a post to edit it. This model is particularly useful in social networking applications, where access depends on user relationships (such as friends, followers, or content ownership).
