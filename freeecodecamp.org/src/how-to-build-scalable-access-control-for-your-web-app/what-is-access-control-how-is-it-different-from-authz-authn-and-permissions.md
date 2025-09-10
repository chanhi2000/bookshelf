---
lang: en-US
title: "What is access control? How is it different from AuthZ, AuthN and permissions?"
description: "Article(s) > (1/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
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
      content: "Article(s) > (1/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "What is access control? How is it different from AuthZ, AuthN and permissions?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/what-is-access-control-how-is-it-different-from-authz-authn-and-permissions.html
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
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-what-is-access-control-how-is-it-different-from-authz-authn-and-permissions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

Let me break down these terms using the example of an airport.

When you arrive at the check-in counter, you present your passport to verify your identity. **Authentication** (Who are you?) is the process of confirming that you are who you say you are.

Once your identity is confirmed, the airline checks if you are authorized to board the flight by verifying your ticket, or if you are authorized to access the lounge by reviewing your membership status, class of travel, or loyalty program tier. **Authorization** (What are you allowed to do?) is about determining what specific resources you are permitted to access.

**Permissions** (What specific actions can you take?) are the granular details of what you're allowed to do within the scope of your authorization. If you’re authorized to board the flight and access the lounge, your permissions might include: sitting at the boarding gate, relaxing in the lounge, shopping in duty-free, or if you’re staff, accessing restricted areas.

**Access control** refers to the measures in place to enforce authorization policies. These are the rules the airport follows to validate boarding passes or lounge access, and to guide you to the correct gate.