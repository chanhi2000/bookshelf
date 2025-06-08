---
lang: en-US
title: "How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
description: "Article(s) > How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
icon: fa-brands fa-dart-lang
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
      content: "Article(s) > How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/
prev: /programming/dart/articles/README.md
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
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
  desc="Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf..."
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Hey there!

In this project, you will build a multilingual social recipe application using Flutter and Strapi.

Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interfaces for mobile, web, and desktop from a single codebase.

Strapi, on the other hand, is a headless CMS that makes it easy to create, manage and distribute content anywhere you need – all from one place.

The multilingual feature of the application will allow users from different parts of the world to interact with the app in their native language, making it more user-friendly and accessible. This feature is particularly beneficial for a social recipe application where users share recipes from different cuisines and cultures.

In this application, users will be able to view recipes, request a specific recipe, share their favorite recipes, and like or comment on recipes.

::: note Prerequisites

To follow along with this tutorial, make sure you have:

- [<FontIcon icon="fa-brands fa-noe"/>Node.js](https://nodejs.org/en) installed.
- Basic knowledge of [<FontIcon icon="fa-brands fa-dart-lang"/>Flutter](https://flutter.dev/)
- Basic understanding of Strapi with this [<FontIcon icon="fas fa-globe"/>quick guide](https://docs.strapi.io/dev-docs/quick-start)

:::

---

## Demo

Here’s what you will be building in the tutorial:

1. Authentication and Authorization: [<FontIcon icon="fa-brands fa-google-drive"/>Demo](https://drive.google.com/file/d/1cjnnRD38wQsj_sYHl5EG5uM3AyHJUWdf/view?usp=sharing)
2. Comment and Likes: [<FontIcon icon="fa-brands fa-google-drive"/>Demo](https://drive.google.com/file/d/1wM0xQ2R7inL90gAkiYjLcGV5df4AmzH1/view?usp=sharing)
3. Request recipe: [<FontIcon icon="fa-brands fa-google-drive"/>Demo](https://drive.google.com/file/d/1xlxSFD2qU2rOE4kICiX-py_JxvgrphqK/view?usp=sharing)
4. Language Switch: [<FontIcon icon="fa-brands fa-google-drive"/>Demo](https://drive.google.com/file/d/14lmBCIgX4VIKOFmS9pG71cIHH7HLaW1J/view?usp=sharing)

You can get the full code of the application from [this GitHub repository (<FontIcon icon="iconfont icon-github"/>`Gunkev/flutter_strapi_multilingual_app`)](https://github.com/Gunkev/flutter_strapi_multilingual_app).

```component VPCard
{
  "title": "Create Models (1)",
  "desc": "(1/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-models-1.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Add Languages and Enable Internationalization in Strapi",
  "desc": "(2/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/add-languages-and-enable-internationalization-in-strapi.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Add Recipe Content",
  "desc": "(3/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/add-recipe-content.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Generate API Token and Set permissions",
  "desc": "(4/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/generate-api-token-and-set-permissions.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Set up Flutter",
  "desc": "(5/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/set-up-flutter.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Install Packages",
  "desc": "(6/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/install-packages.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Add Environment Variables",
  "desc": "(7/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/add-environment-variables.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Create Models (2)",
  "desc": "(8/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-models-2.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Create Services",
  "desc": "(9/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-services.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Authorization and Authentication",
  "desc": "(10/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/authorization-and-authentication.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Build App Components",
  "desc": "(11/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/build-app-components.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Fetch Recipes",
  "desc": "(12/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/fetch-recipes.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "View Recipe",
  "desc": "(13/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/view-recipe.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Create Request Recipe Screen",
  "desc": "(14/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-request-recipe-screen.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Create User Profile Screen",
  "desc": "(15/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/create-user-profile-screen.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Test the App",
  "desc": "(16/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/test-the-app.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Conclusion

In this tutorial, you built a Flutter and Strapi recipe application where user could register and login to request a recipe from the admin, view and like recipes, or add their comments to a specific recipe.

To improve the application, you can add search functionality, share functionality, or allow users not only to request a recipe but also to create a personal list of recipes they can share with others.

Thanks for reading!

### References

- ⁠[https://docs.strapi.io/dev-docs/configurations/api-tokens](https://docs.strapi.io/dev-docs/configurations/api-tokens)
- ⁠⁠[https://docs.strapi.io/user-docs/settings/API-tokens](https://docs.strapi.io/user-docs/settings/API-tokens)
- ⁠⁠[https://docs.strapi.io/dev-docs/backend-customization/examples/authentication](https://docs.strapi.io/dev-docs/backend-customization/examples/authentication)
- [https://docs.strapi.io/dev-docs/plugins/i18n](https://docs.strapi.io/dev-docs/plugins/i18n)
- ⁠⁠[⁠⁠https://strapi.io/blog/how-to-create-a-refresh-token-feature-in-your-strapi-application](https://strapi.io/blog/how-to-create-a-refresh-token-feature-in-your-strapi-application)
- [https://strapi.io/blog/a-beginners-guide-to-authentication-and-authorization-in-strapi](https://strapi.io/blog/a-beginners-guide-to-authentication-and-authorization-in-strapi)
- [https://jwt.io/introduction](https://jwt.io/introduction)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "desc": "Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
