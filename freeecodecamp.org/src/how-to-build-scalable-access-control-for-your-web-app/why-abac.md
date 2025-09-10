---
lang: en-US
title: "Why ABAC?"
description: "Article(s) > (4/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (4/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "Why ABAC?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/why-abac.html
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
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-why-abac"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

RBAC provides several benefits, including ease of implementation, reduced administrative overhead by enabling quick onboarding of new users, and simplified auditing, as it makes it easy to review which roles have access to sensitive data.

But, as the platform grows, you introduce more nuanced requirements for access control. These new requirements lead to the creation of new roles to meet specific access needs:

1. **Publisher**: Can view, edit, approve, publish, and delete posts across all categories, but cannot manage user roles or settings.
2. **Junior Author**: Can create and edit their own posts within assigned categories.
3. **Senior Author**: Can create and edit their own posts in any category.
4. **User (Subscriber)**: Can view and comment on private posts in addition to public posts.
5. **Premium Subscriber**: Has all the permissions of a regular subscriber and access to exclusive posts.

Before long, you may find yourself managing an ever-growing list of roles such as Senior Publisher, Publishing Supervisor, Guest User, Subscriber, Premium Subscriber, Graphic Designer, UX Designer, Photographer, Social Media Manager, US Marketing Specialist, UK Marketing Specialist, Web Developer, Data Analyst, Membership Manager, Ad Manager, Legal Advisor, and Sponsor Manager.

Introducing additional requirements—such as blog category, seniority, and jurisdiction—can quickly lead to role explosion. Just imagine how this would scale in data-intensive enterprise applications like finance or healthcare.

While scopes work well when boundaries are clear and static (for example, department, blog types), they require custom checks for more granular attributes such as seniority, length of service, blog creation time, or publication status. Scopes also struggle to account for attributes that change over time, like the location or timing of access.

Because RBAC relies on roles and fixed scopes to make access decisions, it becomes limited in handling complex and dynamic access needs. That is why, [<FontIcon icon="fa-brands fa-wikipedia-w"/>**OWASP** (Open Worldwide Application Security Project) recommends using **ABAC** or **ReBAC** over RBAC](https://en.wikipedia.org/wiki/OWASP), as they are more effective in implementing the principle of least privilege.
