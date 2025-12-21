---
lang: en-US
title: "Attribute-Based Access Control In Depth"
description: "Article(s) > (5/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (5/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "Attribute-Based Access Control In Depth"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-scalable-access-control-for-your-web-app/attribute-based-access-control-in-depth.html
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
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-attribute-based-access-control-in-depth"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

---

## Core Components

The core components of ABAC are:

### Attributes

Attributes are key-value pairs used to define the access context. Examples include:

- **User attributes**: These describe the characteristics of the person requesting access, like role, department, age, clearance level, and so on. 💡 As you can see, role can be one of the attributes based on which access control decision is based. So, ABAC is essentially an extension of RBAC.
- **Resource attributes**: These describe the characteristics of the resources (such as files, databases, or services) being accessed. For example, owner, category, status, and so on.
- **Action attributes**: These define what actions are being requested by the user on the resource. For example, `read` access like view/open, `write` access like create/modify/delete, `execute` access like process/run, and so on.
- **Environment attributes**: These include contextual elements such as `time` or `location` that influence the decision-making process.

### Policies

Policies are logical rules or statements that define which combinations of attributes allow or deny access. For instance, A publisher can *publish* approved posts in assigned categories during business hours.

---

## How does ABAC work?

Let’s take Sam, a publisher for our blog, as an example. Sam is authorized to publish posts that have been approved by the editor, but only within the categories she’s been assigned, such as ‘Tech,’ ‘Lifestyle,’ and ‘Health.’ She’s allowed to publish these posts only during specific hours, say from 9 AM to 6 PM.

Sam’s role as a publisher and her assigned categories were set when she joined the team. The resource here is the Post, which is given a category when it’s created. The action she can perform is to publish, and the environmental condition is that it needs to be during business hours.

Since the access control rule is based on Sam’s attributes—her role as a publisher and the categories she’s assigned to—she can publish posts within those categories. If any of her attributes change, like if she moves to a different department, such as Membership Management, or if her assigned categories change to ‘Fashion’ or ‘Travel,’ her access is automatically revoked.

::: info from OptIQ.AI (<code>optiq.ai</code>)

```component VPCard
{
  "title": "What is Attribute-Based Access Control? Explained",
  "desc": "Say goodbye to roles: Attribute-Based Access Control grants access based on user attributes for greater flexibility. Understand how this model works and the advantages it provides.",
  "link": "https://optiq.ai/blog-post/what-is-attribute-based-access-control-explained/",
  "logo": "ttps://optiq.ai/fevicon (1).ico",
  "background": "rgba(56,69,229,0.2)"
}
```

*ABAC allows administrators to set access controls without needing to know who specifically will need access. As new members join an organization, there's no need to modify existing rules or object attributes; as long as they have the necessary attributes, they can access the required resources. This ability to automatically accommodate new and unanticipated users without additional adjustments is a key advantage of using ABAC*.

:::

---

## Who defines ABAC policies?

### 1. Identity and Access Management administrators

In many organizations, security administrators or access control administrators define ABAC policies. Their responsibilities include analyzing business needs, risk management, regulatory compliance, and ensuring that users have the right level of access to resources. They translate security requirements into policies based on the different attributes and conditions specific to the organization.

### 2. Business and resource managers

In certain cases, business units or department managers may also have input into defining policies. They understand the operational needs and are best positioned to indicate how data should be accessed by their teams.

For example, a Membership Manager might define policies governing who can access premium blog posts based on subscription status, user role, or membership level (e.g., Subscriber, Premium Subscriber).

---

## Where should you enforce it — back-end or front-end?

Access control policies should be enforced in **both** the front-end and the back-end. Here's why:

### 1. Front-end enforcement

- **Instant feedback**: When you enforce ABAC policies on the front-end, you can immediately show or hide elements (like buttons, links, or menus) based on the user’s attributes. This makes the interface cleaner and helps users understand what they can or can’t do right away.
- **Smarter UI**: You can prevent showing options to users that they shouldn’t see. For example, hiding features if the user doesn’t have the correct role or permissions. This makes the UI feel more intuitive and responsive.
- **Reduced server load**: By enforcing certain access restrictions in the front-end, you reduce unnecessary requests to the back-end, improving app performance and reducing load on your servers.
- **Security layer**: While the front-end isn’t where sensitive data should live, you can still add an extra layer of security by using it to filter out invalid actions or content **before** a request is made to the back-end. For instance, you can hide sensitive UI elements (like admin controls) or disable buttons based on user attributes, making it harder for unauthorized users to even attempt to trigger certain actions.

### 2. Back-end enforcement

- **Bypass risk**: The downside of relying only on the front-end is that users can easily **bypass** it. With the right tools, they can manipulate the front-end code or network requests (using browser dev tools or API proxies). This is why back-end enforcement is essential—it ensures that access rules are applied **server-side**, where they can’t be tampered with.
- **Protecting sensitive data**: The back-end is where your sensitive data is stored and processed. By enforcing ABAC policies on the server, you ensure that unauthorized users can’t access, modify, or even view sensitive information. To avoid data leaks, you should always filter-out sensitive content based on user permissions and send only relevant content to the client.

Now that you know ABAC policies need to be enforced both in the front-end and the back-end, the next question is: **Where do you define these policies?**

As a developer, you might think: "*If I know the policies defined by the security team, I can just translate them into code for both the front-end and back-end.*"

For example, if the policy is that only senior authors can approve blogs in specific categories, you might write something like this:

::: tip Front-end example (simplified)

```tsx
if (user.role === 'author' && user.seniority === 'senior' && user.categories.includes('Tech')) {
  showApprovalDashboard();
} else {
  hideApprovalDashboard();
}
```

:::

::: tip Back-end example (simplified)

```tsx
if (user.role === 'author' && user.seniority === 'senior' && user.categories.includes('Tech')) {
  return res.send(approvalDashboardData);
} else {
  return res.status(403).send('Forbidden: You do not have approval access for this category.');
}
```

:::

But how do you ensure policy consistency across both layers of your application without duplicating logic?

What happens when you need to introduce additional conditions to this policy, like factoring in other user attributes or combining permissions with feature flags to conditionally enable certain features for specific users?

And, what if your requirement varies for each user like:

- Display certain UI elements only for users with a premium subscription,
- Block an API call for a social media manager based on specific attributes,
- Or hide an entire route for users who are not admins?

Without a structured approach, your app becomes a tangled mess of if-else statements scattered across the codebase.

Read on to find the answers to these questions!

---

## Where are policies defined?

Before we dive into the implementation details, let me briefly revisit the question from the previous section: Where should you *define* the policies?

When there are multiple ways to access a service - whether through a mobile app, web app, or other platforms - the back-end should serve as the source of truth for policy definitions. Defining ABAC policies in the back-end keeps things consistent and secure across all platforms. This means that all clients interact with the same set of rules, reducing the chances of policy discrepancies.

So, the back-end is where all the policy definitions live, and it makes them available to the front-end when needed. The front-end then enforces these decisions on the user interface. But don't forget, the back-end should always enforce these policies as well.

In the upcoming sections, you will learn two approaches to implementing the ABAC access control model.
