---
lang: en-US
title: "How to Integrate Tailwind with Django - With Code Examples"
description: "Article(s) > How to Integrate Tailwind with Django - With Code Examples"
icon: iconfont icon-tailwindcss
category:
  - Node.js
  - Tailwind CSS
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
  - tailwind
  - tailwindcss
  - python
  - py
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Integrate Tailwind with Django - With Code Examples"
    - property: og:description
      content: "How to Integrate Tailwind with Django - With Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-integrate-tailwind-with-django.html
prev: /programming/css-tailwind/articles/README.md
date: 2024-11-05
isOriginal: false
author: Abhijeet Dave
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730270888412/a440ff74-6e8b-4879-8b47-15aedca45bc4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tailwind CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Integrate Tailwind with Django - With Code Examples"
  desc="In modern web development, choosing the right technology is crucial because it impacts both the process and outcome of your projects. Using Django as a backend framework and Tailwind CSS as a utility-first CSS framework offers an efficient way to cre..."
  url="https://freecodecamp.org/news/how-to-integrate-tailwind-with-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730270888412/a440ff74-6e8b-4879-8b47-15aedca45bc4.png"/>

In modern web development, choosing the right technology is crucial because it impacts both the process and outcome of your projects. Using Django as a backend framework and Tailwind CSS as a utility-first CSS framework offers an efficient way to create responsive and visually appealing web applications.

This article will explain why Django and Tailwind CSS work well together, how to start a Django project, how to easily add Tailwind CSS, and how to speed up your development with Prettier for better class formatting.

---

## A Quick Overview of Django

[<VPIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/) is an open-source, full-featured Python web framework that follows the batteries-included approach. Django aims at making the development of complex, database-driven websites as fast and easy as possible by providing a lot of built-in functionalities like ORM, authentication system, admin panel, and many more. Django enables rapid development by focusing on writing the app's unique parts rather than wasting time writing a lot of boilerplate code.

The reason for its popularity is that it follows the MVT design pattern which keeps data models, views, and templates well separated. In Django, security is paramount: it guards against SQL injection, cross-site scripting, and cross-site request forgery out of the box. Django scales well and is flexible - it is fit for both small projects and large, complex web applications, and that is why it is used by major sites such as Instagram and Pinterest.

---

## What is Tailwind CSS?

It is a well-known fact that [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework. It lets you style elements directly within your HTML, thanks to pre-defined classes. Unlike other CSS frameworks that offer pre-built components, Tailwind offers these low-level utility classes that let you create your own design system. Thus, this makes crafting unique responsive designs effortless as there is not much to do with custom CSS.

---

## Why Django and Tailwind Work So Well Together?

The combination of Django and Tailwind CSS offers a seamless way to build robust, full-featured applications. Here’s why:

- **Rapid Development**: Django’s backend capabilities allow developers to create powerful applications quickly, while Tailwind CSS helps streamline the styling process with its utility-first approach.
- **Customizable Design**: With Tailwind, you’re not confined to predefined styles. You can craft a unique, consistent design that scales easily as your project grows.
- **Separation of Concerns**: Django’s templating system works hand-in-hand with Tailwind CSS, ensuring a clear separation between the backend logic and frontend styling.

---

## How to Initialize a Django Project?

::: tabs

@tab:active 1.

**Install Django**: Install Django using `pip`

```sh
pip install django
```

@tab 2.

**Create a Django Project**: Use the Django admin command to create a new project:

```sh
django-admin startproject myproject
```

@tab 3.

**Navigate to Your Project Directory**:

```sh
cd myproject
```

@tab 4.

**Modify** <VPIcon icon="fa-brands fa-python"/>`settings.py`:

- In the `TEMPLATES` setting, add a <VPIcon icon="fas fa-folder-open"/>`templates` directory:

```py title="templates/settings.py"
"DIRS": [BASE_DIR / "templates"],
```

- Add a `static` directory for your static files:

```py title="templates/settings.py"
STATICFILES_DIRS = [BASE_DIR / "static"]
```

:::

---

## How to Integrate Tailwind CSS with Django?

::: tabs

@tab 1. **Install Tailwind CSS**: Make sure Node.js is installed, then run:

```sh
npm install -D tailwindcss
npx tailwindcss init
```

@tab 2.

**Set Up Tailwind CSS**: In your `static/css` directory, create a `main.css` file with the following content:

```css title="static/css/main.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

@tab 3.

**Modify <VPIcon icon="iconfont icon-tailwindcss"/>`tailwind.config.js`**: Adjust the content section to include `templates/*.html` files, ensuring Tailwind CSS generates the necessary styles.

```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./**/templates/**/*.html"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [],
};
```

@tab 4.

**Add a Build Script**: Update your <VPIcon icon="iconfont icon-json"/>`package.json` to include a build script:

```json title="package.json"
"scripts": {
  "watch:css": "tailwindcss build static/css/main.css -o static/output.css -w"
}
```

@tab 5.

**Compile Tailwind CSS**:

```sh
npm run watch:css
```

:::

---

## Let’s Create a Chat Bubble app

::: tabs

@tab 1.

**Create a Django App**:

```sh
django-admin startapp chat
```

@tab 2.

**Set Up the Views**:

- In <VPIcon icon="fas fa-folder-open"/>`chat/`<VPIcon icon="fa-brands fa-python"/>`views.py`, create a simple view:

```py title="chat/views.py"
from django.shortcuts import render
def chat(request):
    return render(request, "chat.html")
```

@tab 3.

**Configure URLs**:

- In <VPIcon icon="fas fa-folder-open"/>`chat/`<VPIcon icon="fa-brands fa-python"/>`urls.py`, define the URL pattern for your view:

```py title="chat/urls.py"
from django.urls import path
from . import views
urlpatterns = [
    path("", views.chat, name="chat"),
]
```

- In the project’s `urls.py`, include the app URLs:

```py title="chat/urls.py"
from django.urls import include, path
urlpatterns = [
    path("", include("chat.urls")),
]
```

@tab 4.

**Set Up the Base HTML Template**:

- Create a <VPIcon icon="fas fa-folder-open"/>`templates/`<VPIcon icon="fa-brands fa-html5"/>`base.html` file to serve as the foundation of your application:

```html title="templates/base.html"
{% load static %}

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Django App with Tailwind</title>
    <link rel="stylesheet" href="{% static 'css/output.css' %}" />
</head>

<body class="h-screen bg-slate-300 dark:bg-slate-400">
    <section class="container mx-auto flex flex-col items-center">
    <h1 class="mb-4 mt-10 text-6xl font-bold text-blue-500 dark:text-blue-200" >
        Chat Bubble
    </h1>
    {% block content %} {% endblock %}
    </section>
</body>
</html>
```

@tab 5.

**Create the Chat Template**:

- In <VPIcon icon="fas fa-folder-open"/>`templates/`<VPIcon icon="fa-brands fa-html5"/>`chat.html`, extend the base template:

```html title="templates/chat.html"
{% extends "base.html" %}

{% block content %}
<div class="flex items-start gap-2.5">
    <img class="w-8 h-8 rounded-full" src="<https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png>" alt="Jhon  image">
    <div class="flex flex-col gap-1 w-full max-w-[320px]">
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">Jhon Doe</span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
        </div>
        <div
            class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p class="text-sm font-normal text-gray-900 dark:text-white"> That's awesome. I think our users will really
                appreciate the improvements.</p>
        </div>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
    </div>
</div>
{% endblock %}
```

@tab 6.

**Run the Development Server**:

```sh
python manage.py runserver
```

:::

---

## How to Use Prettier for Class Formatting?

To keep your Tailwind CSS classes clean and organized, you can integrate Prettier into your workflow.

::: tabs

@tab 1.

**Install Prettier and the Tailwind Plugin**:

```sh
npm install --save-dev prettier prettier-plugin-tailwindcss
```

@tab 2.

**Configure Prettier**: Create a `.prettierrc` file in your project root:

```json title=".prettierrc"
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

@tab 3.

**Format on Save**: Set up your code editor to format files automatically with Prettier on save.

:::

### Result

<SiteInfo
  name="themeselection/ts-django-tailwind"
  desc="Guide and example project for integrating Django with Tailwind CSS to create responsive, modern web applications."
  url="https://github.com/themeselection/ts-django-tailwind/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/093f7e03075632a63c74cac9929cb03738b0ae4843b17395afe86e0b8a25dae4/themeselection/ts-django-tailwind"/>

![chat bubble ts](https://cdn.hashnode.com/res/hashnode/image/upload/v1730793420930/6fbdbfbb-2476-4454-9b90-89bcfd405abf.png)

---

## How to Create a Chat Bubble Using FlyonUI Tailwind Components and Django

Here, we’ll use FlyonUI, an open-source [<VPIcon icon="fas fa-globe"/>Tailwind CSS Components Library](https://flyonui.com/). It offers a wide range of customizable, accessible, and ready-to-use components.

<SiteInfo
  name="FlyonUI - Free Tailwind CSS Components Library"
  desc="FlyonUI is the easiest, free and open-source Tailwind CSS components library with semantic classes."
  url="https://flyonui.com/"
  logo="https://flyonui.b-cdn.net/flyonui-icon/favicon-16x16.png"
  preview="https://ts-assets.b-cdn.net/fy-assets/smm/marketing/flyonui-free-tailwind-components-library.png"/>

Let’s integrate Django with FlyonUI components and create a chat bubble.

::: tabs

@tab Step 1

**Install `flyonui`**

Install `flyonui` via npm.

```sh
npm install -D flyonui@latest
```

@tab Step 2

**Configure Tailwind**

Add the path to FlyonUI JavaScript files in your <VPIcon icon="iconfont icon-tailwindcss"/>`tailwind.config.js` file.

```js title="tailwind.config.js"
module.exports = {
  content: ["./node_modules/flyonui/dist/js/*.js"], // Require only if you want to use FlyonUI JS component

  plugins: [
    require("flyonui"),
    require("flyonui/plugin") // Require only if you want to use FlyonUI JS component
  ]
}
```

@tab Step 3

**Copy the FlyonUI JavaScript**

Copy FlyonUI's JavaScript (<VPIcon icon="fas fa-folder-open"/>`node_modules/flyonui/`<VPIcon icon="fa-brands fa-js"/>`flyonui.js`) files to the <VPIcon icon="fas fa-folder-open"/>`static/` folder.

@tab Step 4:

**Add Js to your <VPIcon icon="fas fa-folder-open"/>`base.html`**

Once you copied the `js` file to your <VPIcon icon="fas fa-folder-open"/>`static` folder include it in <VPIcon icon="fa-brands fa-html5"/>`base.html`.

```html title="base.html"
<html lang="en">
 ...
 <body>
  ...
  <script src="{% static 'js/flyonui.js' %}"></script>
 </body>
</html>
```

Let's Update the Chat bubble code block:

```html
{% extends "base.html" %}
{% block content %}
<div>
  <div class="chat chat-receiver">
    <div class="avatar chat-avatar">
      <div class="size-10 rounded-full">
        <img
          src="<https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png>"
          alt="avatar"
        />
      </div>
    </div>
    <div class="chat-header text-base-content/90">
      Obi-Wan Kenobi
      <time class="text-base-content/50">12:45</time>
    </div>
    <div class="chat-bubble">I started learning guitar today!</div>
    <div class="chat-footer text-base-content/50">
      <div>Delivered</div>
    </div>
  </div>
  <div class="chat chat-sender">
    <div class="avatar chat-avatar">
      <div class="size-10 rounded-full">
        <img
          src="<https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png>"
          alt="avatar"
        />
      </div>
    </div>
    <div class="chat-header text-base-content/90">
      Anakin
      <time class="text-base-content/50">12:46</time>
    </div>
    <div class="chat-bubble">
      That's awesome! You're going to be great at it!
    </div>
    <div class="chat-footer text-base-content/50">
      Seen
      <span class="icon-[tabler--checks] align-bottom text-success"></span>
    </div>
  </div>
</div>
{% endblock %}
```

:::

### Result

![chat bubble example](https://cdn.hashnode.com/res/hashnode/image/upload/v1730793343310/63ca723e-ef67-4cee-a112-bed110ce8ea6.png)

---

## Conclusion

Using Tailwind CSS with Django is a great way to make your web applications look good and work well on different devices, while you take advantage of Django's many features. This setup not only boosts productivity but also helps you follow good styling and design practices.

Here's the repository where you can find more details or see the complete code: [<VPIcon icon="iconfont icon-github"/>`themeselection/ts-django-tailwind`](https://github.com/themeselection/ts-django-tailwind). I hope this tutorial helps you with the Django integration with Tailwind CSS. I have prepared this article with the help of [Pruthvi Prajapati (<VPIcon icon="iconfont icon-github"/>`PruthviPraj00`)](https://github.com/PruthviPraj00), a front-end developer with 2 years of experience.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Integrate Tailwind with Django - With Code Examples",
  "desc": "In modern web development, choosing the right technology is crucial because it impacts both the process and outcome of your projects. Using Django as a backend framework and Tailwind CSS as a utility-first CSS framework offers an efficient way to cre...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-integrate-tailwind-with-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
