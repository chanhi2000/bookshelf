---
lang: en-US
title: "Generate API Token and Set permissions"
description: "Article(s) > (4/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Generate API Token and Set permissions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/generate-api-token-and-set-permissions.html
date: 2025-04-09
isOriginal: false
author:
  - name: Kevine Nzapdi
    url : https://freecodecamp.org/news/author/gunkev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "desc": "Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf...",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
  desc="Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf..."
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-generate-api-token-and-set-permissions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Once you’ve added the content for the various languages, it’s time to create your API and set the necessary permissions.

To do this, navigate to Settings, then API Tokens, and then Create API Token. Add the details of your key there.

![API token creation](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505239235/5a183f54-6469-4d4e-aa62-d81f4dccf8ae.png)

- Token duration: choose Unlimited
- Token Type: Custom. The custom type allows you to specify permission for certain entities.

Next, still in the Create API Token screen, scroll down to the permission section and set the permission to “Select all” for Comments, and RecipeRequest, upload, email, content type, i18n, and User permissions like in the screenshot below for Recipe-request:

![enable permission for recipe request](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505260256/84f6f009-4c7a-4136-8497-6c22b9fa87de.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744116611459/f5518d2e-5200-40b3-9b74-ed0b0adeeabb.png)

Then click on the Save button in the top right corner to generate your API key. Copy and save the key in your PC as you won’t be able to see it again

---

## Set User Roles and Permissions

You’ll also need to set the user roles and permissions using the [<FontIcon icon="iconfont icon-strapi"/>User and Permission Plugin](https://docs.strapi.io/dev-docs/plugins/users-permissions). It allows you to manage what both authenticated and non-authenticated users can do in your application.

Head to the Settings section of the dashboard and go to Roles under the User and Permission plugin.

We have two types of users:

- Authenticated users
- Public users

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744117848867/8023d7c4-c07b-43dc-ba00-89a958bc0672.png)

Select the authenticated users and give them the following permissions for:

Comment:

![enable permission for comments](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505301527/3939448a-48f4-44fc-baa9-a528a78e73c7.png)

Recipe:

![enable authorized user to perdorm action on recipe model](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505327113/f9224713-105d-4cdb-9a5b-4846d1789b07.png)

Request-recipe:

![enable permission for recipe request model](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505346092/d328c629-4ea9-40a0-baa6-90a96ae364ec.png)

Also select all for Content-type builder, i18n, and Upload and then save.

Public users can only read recipes and comments:

![limit comment operation for public users](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505362706/4d776b8f-84f9-4a41-a1d4-73b1a2fd6a4c.png)

![limit recipe operations for public user](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505369235/54ed5f73-9841-43bf-a088-0079358b6b05.png)