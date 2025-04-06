---
lang: en-US
title: "Add Environment Variables"
description: "Article(s) > (7/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (7/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Add Environment Variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/add-environment-variables.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-add-environment-variables"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

You will store configuration data such as API keys, environment-specific URLs (base URL, recipe endpoints, comments endpoints), and other sensitive or configurable data outside your codebase using the `flutter_dotenv` package you installed earlier. Create an <FontIcon icon="fas fa-file-lines"/>`.env` file in your root directory and add your environment variables:

```sh title=".env"
BASE_URL=your-base-url
USERS_ENDPOINT=/auth/local
USERS_ENDPOINT_REG=/auth/local/register
ACCESS_TOKEN=your-api-key
RECIPE_ENDPOINT=/recipes
COMMENT_ENDPOINT=/comments
R_REQUEST_ENDPOINT=/recipe-requests
```

- `BASE_URL`: This is the base URL for your Strapi backend server. The `/api` means that all API endpoints are accessed via this base path. This URL is used to construct full URLs for all API requests by appending specific endpoints to it.
- `USERS_ENDPOINT`: This endpoint typically handles login operations where existing users authenticate by submitting their credentials.
- `USERS_ENDPOINT_REG`: This is the registration endpoint for new users.
- `ACCESS_TOKEN`: This is the API token you created earlier which is used for authenticating API requests.
- `RECIPE_ENDPOINT`: This endpoint is used to fetch a list of recipes or a single recipe. You can also use it to post new recipes, or update or delete a recipe.
- `COMMENT_ENDPOINT`: This endpoint manages comments related to recipes.
- `R_REQUEST_ENDPOINT`: This endpoint manages requests related to recipes.
