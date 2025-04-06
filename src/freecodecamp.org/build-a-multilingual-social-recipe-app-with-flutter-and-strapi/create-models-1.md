---
lang: en-US
title: "Create Models (1)"
description: "Article(s) > (1/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (1/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Create Models (1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-models-1.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-create-models"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Once you have set up a Strapi project with [<FontIcon icon="iconfont icon-strapi"/>this quick guide](https://docs.strapi.io/dev-docs/installation/cli), create two models, Recipe and RecipeRequest, in the Strapi admin panel.

A recipe typically has the following elements:

- Title: `text` which represents the title of the recipe
- Ingredients: `text` which represent the of ingredients of the recipe
- Likes: `int` which represent the number of likes
- Author: `relation` which represent the author of the recipe
- Comments: `relation` which represent the list of comments of a specific recipe
- Steps: `rich text` which represents the main content of the recipe
- Description: `rich text` which represents a description of what the recipe is like
- Comment Count: `int` which represents the number of comment a recipe has
- Cover Image: `media` which represents the cover image of the recipe

![recipe model](https://cdn.hashnode.com/res/hashnode/image/upload/v1743504946186/e1be7d98-fff8-4e2e-b446-1ddbf541d1c0.png)

Make sure to enable internationalization for Recipe Content Type when you create it:

![enable internationalization](https://cdn.hashnode.com/res/hashnode/image/upload/v1743504992503/73842540-4b8d-4412-9c51-1c55e095e83e.png)

A recipe request typically has:

- Title, which is `text` that represents the title of the request
- Description, which is `rich text` that represents the content of the request

![recipe request model](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505019316/6d172672-af58-4a6d-b0a3-cb713ee32dd2.png)

A comment typical has:

- Author, which is a `relation` that represents the author of the comment
- Content, which is `text` that represents the content of the comments
- Date, which is a `date` that represents the published date of the comment

![comment model](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505036935/92d02ecb-9a86-43f9-99a9-a2a534aab871.png)

The user will also have 4 new fields:

![additional user fields](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505060587/cda0be86-298b-4053-b8ae-8c894e07a592.png)
