---
lang: en-US
title: "How to Set Up Social Authentication with Strapi and Nuxt.js"
description: "Article(s) > How to Set Up Social Authentication with Strapi and Nuxt.js"
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
      content: "Article(s) > How to Set Up Social Authentication with Strapi and Nuxt.js"
    - property: og:description
      content: "How to Set Up Social Authentication with Strapi and Nuxt.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-social-authentication-with-strapi-and-nuxtjs.html
prev: /programming/js-nuxt/articles/README.md
date: 2025-01-15
isOriginal: false
author:
  - name: Ashimi0x
    url : https://freecodecamp.org/news/author/ashimi0x/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736865891246/8be87fdb-c57b-4ae1-91ea-00b6dbffe09b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Nuxt.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nuxt/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up Social Authentication with Strapi and Nuxt.js"
  desc="Enhancing security is a critical aspect of every development process. But it’s crucial to make your apps accessible for users signing up for the application. So, creating a seamless experience for users while they sign up and maintaining security thr..."
  url="https://freecodecamp.org/news/how-to-set-up-social-authentication-with-strapi-and-nuxtjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1736865891246/8be87fdb-c57b-4ae1-91ea-00b6dbffe09b.png"/>

Enhancing security is a critical aspect of every development process. But it’s crucial to make your apps accessible for users signing up for the application.

So, creating a seamless experience for users while they sign up and maintaining security throughout the process is key. This is why many web developers are adopting social authentication today.

In this article, I’ll walk you through setting up social authentication on a Strapi project using GitHub. Then we’ll integrate it into a simple Nuxt.js setup.

---

## What is Social Authentication?

Social authentication leverages familiar social media accounts so that users don’t need to remember another username-password combination. Instead of creating a unique username and password for every website, users can log in via their accounts from popular platforms like Google, Facebook, Twitter, or GitHub.

You can set this up using OAuth. It’s a widely adopted protocol that allows websites to access limited user data without exposing sensitive credentials. It also helps eliminate barriers in the signup or login process, lowering the chances that people will abandon the site. Users can quickly log in with a few clicks, making onboarding smoother and reducing form fatigue.

Social auth also enhances the app's overall security by offloading certain responsibilities to trusted providers who already employ strong security protocols.

### What is Strapi?

Strapi is an open-source headless content management system (CMS) built with Node.js. It allows developers to manage and deliver content through APIs (REST or GraphQL) while providing a customizable and extendable platform.

Strapi is popular for its flexibility (it works with various front-end frameworks) and plugin system, making adding features like social authentication easy.

### What is Nuxt.js?

Nuxt.js is a powerful Vue.js framework designed for building modern web applications with server-side rendering (SSR), static site generation, and powerful client-side routing. You can use it to create high-performance, SEO-friendly, and scalable applications.

Nuxt’s modular structure and ease of integration with APIs make it ideal for building complex front-end applications, such as those that require social authentication.

### What Will You Learn in This Guide?

This guide will walk you through implementing social authentication using **Strapi v5** and **Nuxt.js**. You’ll learn how to:

- Set up OAuth for social logins
- Configure Strapi to handle social authentication
- Integrate the functionality smoothly into an existing Nuxt.js front-end

::: note Prerequisites

Before diving into the tutorial, make sure you have the necessary foundational knowledge and tools:

1. **Basic knowledge of Node.js, Vue.js, and Nuxt.js**: Familiarity with these technologies is crucial, as Strapi is built on Node.js, and Nuxt.js is a Vue.js-based framework. To navigate through the integration process, you’ll need a general understanding of how Node.js handles server-side logic and how Vue.js works on the front end.
2. **Familiarity with REST APIs or GraphQL (optional but helpful)**: Strapi provides both REST and GraphQL APIs to handle data and authentication. While this guide will focus primarily on REST APIs for social authentication, knowing how APIs work and how to make HTTP requests is useful. If you’re familiar with GraphQL, you could optionally use it for more complex queries and authentication handling.
3. **Social Provider Developer Accounts:** To integrate social authentication, you must create developer accounts on the social platforms you want to support (like Google, Facebook, or GitHub). You’ll need API keys or client IDs from each provider. In this tutorial, you’ll learn how to use GitHub for this functionality.

:::

---

## How to Set Up Strapi for Social Authentication

If you haven’t already created a Strapi project, let’s start by generating a new one.

You can create a new Strapi project with **<VPIcon icon="fa-brands fa-yarn"/>Yarn** (recommended). Run the following command in your terminal:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn create strapi-app@latest my-project
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npx create-strapi-app@latest my-project
```

:::

Respond ‘yes” to all the prompts:

![Strapi's Installation interface on Virtual Studio Code](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729719988851_Screenshot+2024-10-23+at+22.23.44.png)

You should now have a fresh Strapi 5 application with a default SQLite database. To spin it up in development mode, open your project and run:

```sh
yarn run develop
```

![VS Code Terminal Interface for a running Strapi project](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729722404206_Screenshot+2024-10-23+at+23.26.03.png)

Once the project is up and running, Strapi will automatically launch in your browser at `http://localhost:1337/admin`. The first step is to create an **admin account** to access the Strapi admin panel:

![Strapi Admin Registration Interface](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729722491173_Screenshot+2024-10-23+at+23.28.01.png)

Fill out the required fields and create your admin user. Once you’re logged in, you’ll have access to the full Strapi admin interface, where you can manage content types, plugins, and settings:

![Strapi Welcome Page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729722679829_Screenshot+2024-10-23+at+23.28.50.png)

### How to Set Up Strapi’s Providers

For social authentication, Strapi's Users & Permissions plugin is essential and already comes pre-installed with the default setup. Click on Settings in the Strapi admin panel:

![Strapi Settings Page Overview](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729722965788_Screenshot+2024-10-23+at+23.35.39.png)

Scroll down and Click on Providers in the Users & Permissions plugin section:

![The Strapi's Providers page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729723008188_Screenshot+2024-10-23+at+23.36.35.png)

You will see this list of Providers to select from. For this article, select GitHub by clicking the pen icon on the right:

![Editing the Github providers setting](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729723164437_Screenshot+2024-10-23+at+23.39.11.png)

By default, it is set to “false”, Toggle it to True. Take note of the redirect URL and copy it.

### How to Create GitHub’s Oauth App

On a different browser tab, log in to your GitHub account and click on your settings:

![Github Explore Page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729716332697_Screenshot+2024-10-23+at+21.45.06.png)

Then navigate to your Developer Settings:

![Profile Settings Page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729716365753_Screenshot+2024-10-23+at+21.45.18.png)

Select OAuth Apps and New OAuth app:

![Developer Settings Page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729716462052_Screenshot+2024-10-23+at+21.46.56.png)

As you can see below, the redirect URL will be pasted as the Authorization callback URL and the homepage URL will be your App URL.

![OAuth's APP registration Page](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729716551370_Screenshot+2024-10-23+at+21.48.51.png)

Go ahead and click “Register application”, and you will see your Client ID. Now you need to generate your Client Secret:

![Github Application successfully created.](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729723880674_Screenshot+2024-10-23+at+23.49.35.png)

### How to Connect Github OAuth APP to Provider on Strapi

Once your Client Secret has been generated, update the application and return to your Strapi App to input them. The redirect URL to your front-end app will be [http://localhost:3000/connect/github](http://localhost:3000/connect/github).

![Adding Github Provider to Strapi](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729723954537_Screenshot+2024-10-23+at+23.52.13.png)

You can save everything now, and your GitHub Provider should be enabled.

![Strapi's Provider Interface](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729724039006_Screenshot+2024-10-23+at+23.53.23.png)

You can set up as many providers as you wish.

To allow users to authenticate with social logins, you need to update the default public role in Strapi.

Click Roles right above Providers:

![Strapi Interface for Roles: Authenticated and Public](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729724464559_Screenshot+2024-10-24+at+00.00.46.png)

Select the Public role and ensure that the connect and callback permissions are enabled. They are already enabled by default in Strapi 5. ![Strapi's Public Role Interface](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729724599165_Screenshot+2024-10-24+at+00.02.09.png)

Click Save after updating the permissions. At this point, you’ve set up the necessary social authentication providers. Before proceeding with Nuxt.js integration, you can test it by making an API request using a tool like Postman.

### How to Test the Strapi API

Send a GET request to http://localhost:1337//api/connect/github/.

![Postman's Interface for testing APIs.](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729725634296_Screenshot+2024-10-24+at+00.20.16.png)

You will notice from the Console that it’s reaching for a GitHub login client. Copy the whole URL and paste it into your browser. You should see an interface like this:

![Interface for authorizing Strapi](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729725737744_Screenshot+2024-10-24+at+00.22.04.png)

If you got this, congrats! You can now move on to setting up your Nuxt.Js frontend application.

---

## How to Set Up Nuxt.js for Social Authentication

In this section, you will learn how to set up the **authentication flow** between Nuxt.js and Strapi, handle the OAuth redirects, and display a login button for users to authenticate.

First, you’ll need to install Nuxt.js by running one of these commands:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn create nuxt-app <PROJECT-NAME>
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npx create-nuxt-app <PROJECT-NAME>
#
# or
#
npm init nuxt-app <PROJECT-NAME>
```

:::

Visit the Nuxt.js docs if you need a refresher.

![VS code interface for installing NUXT](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729732718758_Screenshot+2024-10-24+at+01.52.37.png)

Open your project and run `npm run dev` to get it started:

![Interface for a running Nuxt project.](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729734102247_Screenshot+2024-10-24+at+02.40.17.png)

Once running, visit [https://localhost:3000](https://localhost:3000) on your browser and you should see a Nuxt page that looks like this:

![Nuxt application interface on browser.](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1729734185176_Screenshot+2024-10-24+at+02.42.51.png)

In your code editor, delete the <VPIcon icon="iconfont icon-vuejs"/>`Tutorial.vue` in the components folder and go to <VPIcon icon="iconfont icon-vuejs"/>`index.vue` in the pages folder. There, you’ll want to add the following:

```html :collpase-lines title="index.vue"
<template>
<div class="min-h-screen flex justify-center items-center text-center mx-auto sm:pl-24 bg-yellow-200">
  <div class="w-1/2 sm:text-left sm:m-5">
    <div>
      <h1
        class="text-3xl sm:text-6xl font-black sm:pr-10 leading-tight text-blue-900"
      >
        Welcome
      </h1>
    </div>
    <div class="links">
      <NuxtLink to="/login" class="button--blue shadow-xl"> Login </NuxtLink>
    </div>
  </div>
  <div class="w-1/2 hidden sm:block">
  </div>
</div>
</template>
<script>
  export default {}
</script>
<style>
/* Sample apply at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>
```

This code provides you with a simple homepage and a link to the login page which currently leads to a 404 page. In your pages folder, create <VPIcon icon="iconfont icon-vuejs"/>`login.vue` and add the following code:

```html :collpase-lines title="login.vue"
<template>
<div class="min-h-screen flex justify-center items-center text-center mx-auto sm:pl-24 bg-yellow-200">
  <div class="w-1/2 hidden sm:block m-5 p-6">
    <img src="" />
  </div>
  <div class="sm:w-1/2 w-4/5">
    <h2 class="m-5 font-black text-3xl">Social Login</h2>
    <div class="shadow-xl bg-white p-10">
      <a
        href="http://localhost:1337/api/connect/github"
        class="cursor-pointer m-3 button--blue shadow-xl"
      >
        Github
      </a>
    </div>
  </div>
</div>
</template>
<script>
  export default {}
</script>
<style lang="scss" scoped></style>
```

In lines 11-14, the user can click the link and have the login logic executed. But you need to ensure that Nuxt can handle redirects.

In your pages folder, create a folder called <VPIcon icon="fas fa-folder-open"/>`connect`, and then inside that a file named <VPIcon icon="iconfont icon-vuejs"/>`_provider.vue`, and add the following code to handle the callback function:

```html :collpase-lines title="connect/_provider.vue"
<template>
<div>
  <h1>user page</h1>
</div>
</template>
<script>
export default {
  data() {
    return {
      provider: this.$route.params.provider,
      access_token: this.$route.query.access_token,
    }
  },

  async mounted() {
    const res = await this.$axios.$get(
      '/auth/${this.provider}/callback?access_token=${this.access_token}'
    )

    const { jwt, user } = res
    // store jwt and user object in localStorage
    this.$auth.$storage.setUniversal('jwt', jwt)
    this.$auth.$storage.setUniversal('user', { username: user.username, id: user.id, email: user.email })
    
    this.$router.push(`/users/${user.id}`)
  },
}
</script>
<style lang="scss" scoped></style>
```

So far, your folder/file structure should look like this:

![Nuxt File structure on VScode](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1730069360059_Screen+Shot+2024-10-27+at+11.47.45+PM.png)

The code in <VPIcon icon="iconfont icon-vuejs"/>`_provider.vue` handles redirects from the Strapi backend. Nuxt.js has a routing pattern that takes advantage of /connect/\*provider where, in this case, the provider is GitHub.

It gets an access token which is stored as `access_token`, then makes an API call to the backend in the mounted lifecycle method. This returns a response that contains the user and a JWT. It stores the user and JWT in both cookies and localStorage using a package called [<VPIcon icon="fas fa-globe"/>`@nuxtjs/auth-next`](https://auth.nuxtjs.org/), then redirects the user to the user account page.

You’ll need to install the @nuxtjs/auth-next module using the following command:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @nuxtjs/auth-next
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install @nuxtjs/auth-next
```

:::

After installing, open your nuxt.config.js file and configure the Auth modules:

```js
export default {
  modules: [
    '@nuxtjs/auth-next',
  ],
```

Next, you’ll need the [<VPIcon icon="fas fa-globe"/>`@nuxtjs/axios](`https://axios.nuxtjs.org/) and [<VPIcon icon="fas fa-globe"/>`@nuxtjs/strapi](`https://strapi.nuxtjs.org/) packages to fetch data from the backend. [<VPIcon icon="fa-brands fa-globe"/>`@nuxtjs/axios`](https://axios.nuxtjs.org/) is already integrated when installing Nuxt, but you have to set your baseurl.

Open up your <VPIcon icon="fa-brands fa-js"/>`nuxt.config.js` file and add the following lines of code:

```js title="nuxt.config.js"
// Axios module configuration: https://go.nuxtjs.dev/config-axios
axios: {
  baseURL: 'http://localhost:1337'
},
```

Then install [<VPIcon icon="fas fa-globe"/>`@nuxtjs/strapi`](https://strapi.nuxtjs.org/) using the following command:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add @nuxtjs/strapi
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install @nuxtjs/strapi
```

:::

Replace the content of your <VPIcon icon="fa-brands fa-js"/>`nuxt.config.js` file with the following lines of code:

```js :colllapsed-lines title="nuxt.config.js"
export default {
// Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxtstrapi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/strapi'
  ],
  axios: {
    baseURL: 'http://localhost:1337'
  },
  strapi: {
    entities: [ "articles", "users" ],
    url: 'http://localhost:1337'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
```

Run both your front end and Strapi app to test the login authentication. When you go to your Strapi admin and check User under Content Manager, you should see the newly authenticated user.

![Content Manager Interface on Strapi showcasing Users](https://paper-attachments.dropboxusercontent.com/s_604FB5A9DF1492F56A770C5B36ABD7454099B52858C205A9399E3B1409CA50D8_1730072300480_Screen+Shot+2024-10-28+at+12.36.40+AM.png)

---

## Conclusion

At this point, you have successfully set up your Strapi application with social authentication. Now you can add as many providers as you want and customize your applications to serve your needs.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Social Authentication with Strapi and Nuxt.js",
  "desc": "Enhancing security is a critical aspect of every development process. But it’s crucial to make your apps accessible for users signing up for the application. So, creating a seamless experience for users while they sign up and maintaining security thr...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-social-authentication-with-strapi-and-nuxtjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
