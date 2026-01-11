---
lang: en-US
title: "Organizing your Express.js project structure for better productivity"
description: "Article(s) > Organizing your Express.js project structure for better productivity"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Organizing your Express.js project structure for better productivity"
    - property: og:description
      content: "Organizing your Express.js project structure for better productivity"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/organizing-express-js-project-structure-better-productivity.html
prev: /programming/js-express/articles/README.md
date: 2022-01-10
isOriginal: false
author:
  - name: Geshan Manandhar
    url : https://blog.logrocket.com/author/geshanmanandhar/
cover: /assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Organizing your Express.js project structure for better productivity"
  desc="Increase your team's productivity with this tutorial on structuring an Express project for maintainability, clarity, and consistency."
  url="https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/banner.png"/>

![](/assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/banner.png)

Express.js is the most popular Node.js framework for web development. It’s fast, unopinionated, and has a large community behind it. It is easy to learn and also has a lot of modules and middleware available for use.

Express is [<VPIcon icon="iconfont icon-expressjs"/>used](https://expressjs.com/en/resources/companies-using-express.html) by big names like Accenture, IBM, and Uber, which means it’s also great in a production environment. If you are similarly using Express in this manner (or even just using Express with a team), it’s important to learn how to organize your project structure to increase productivity.

In this post, we will learn how to organize an Express project to be used by a team of software engineers in order to enhance productivity and maintainability. Let’s get started!

---

## Why use Express.js?

In addition to being one of the most popular Node frameworks, Express also provides the optimal building blocks like routing, middleware, and other components to get an application working quickly. It offers simplicity, efficiency, and minimalism without the baggage or opinions. That is why a good structure is needed when working with Express, especially in a team of software engineers.

---

## Comparison with other frameworks

In comparison to other frameworks like [**NestJS**](/blog.logrocket.com/node-back-end-next-level-nestjs.md) or AdonisJs, Express does not draw upon any structure or format. It does not impose any opinions on how to lay out the files and which part of the logic should reside somewhere specific.

For example, if you have worked with [**Laravel**](/blog.logrocket.com/whats-new-in-laravel-8.md) in PHP, it essentially makes decisions for you on where to put the controllers, how things will function, or which ORM to use by default.

Express, on the other hand, does not come with these premeditated decisions. It lets the user decide the structure and layout of the project. This can be a double-edged sword, because having no opinions provides flexibility, but if used incorrectly, can lead to a disorganized mess that is very difficult to understand.

This also leaves room for inconsistencies, which is very bad for a team. Therefore, the next section will detail a well-organized, while still unopinionated structure for an Express project.

---

## Example of a well-organized Expess.js project structure

For a good web project, for instance, an API will surely have some routes and controllers. It will also contain some middleware like authentication or logging. The project will have some logic to communicate with the data store, like a database and some business logic.

This is an example structure that can help organize the code for the things I mentioned above. I will explain further how I organized this project below:

![Image of file structure in Express](/assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/expressjs-project-structure.webp)

Let’s dive deeper into the main folders <VPIcon icon="fas fa-folder-open"/>`src` and <VPIcon icon="fas fa-folder-open"/>`test` and the subfolders inside them. The main entry point of this organized Express application is the <VPIcon icon="fa-brands fa-js"/>`index.js` file on the root, which can be run with Node using `node index.js` to start the application. It will require the Express app and link up the routes with relative routers.

Any middleware will also be generally included in this file. Then it will start the server.

### Folder structure

In the image above, you will see two main folders: <VPIcon icon="fas fa-folder-open"/>`src` houses the source code, and <VPIcon icon="fas fa-folder-open"/>`test` has all the testing code in it. Time to dig a bit deeper into the <VPIcon icon="fas fa-folder-open"/>`src` subfolders.

First, we have the <VPIcon icon="fas fa-folder-open"/>`configs` folder, which keeps all the configs needed for the application. For example, if the app connects to a database, the configuration for the database (like database name and username) can be put in a file like <VPIcon icon="fa-brands fa-js"/>`db.config.js`. Similarly, other configurations like the number of records to show on each page for pagination can be saved in a file named <VPIcon icon="fa-brands fa-js"/>`general.config.js` inside this <VPIcon icon="fas fa-folder-open"/>`configs` folder.

The next folder is <VPIcon icon="fas fa-folder-open"/>`controllers`, which will house all the controllers needed for the application. These controller methods get the request from the routes and convert them to HTTP responses with the use of any middleware as necessary.

Subsequently, the <VPIcon icon="fas fa-folder-open"/>`middlewares` folder will segregate any middleware needed for the application in one place. There can be middleware for authentication, logging, or any other purpose.

Next up, we have the <VPIcon icon="fas fa-folder-open"/>`routes` folder that will have a single file for each logical set of routes. For example, there can be routes for one type of resource. It can be further broken down by versions like v1 or v2 to separate the route files by the version of the API.

After that, the <VPIcon icon="fas fa-folder-open"/>`models` folder will have data models required for the application. This will also depend on the datastore used if it is a relational or a non-relational (NoSQL) database. Contents of this folder will also be defined by the use of an [**Object Relational Mapping (ORM)**](/blog.logrocket.com/node-js-orms-why-shouldnt-use.md#what-is-orm-in-node-js) library. If an ORM like [**Sequelize**](/blog.logrocket.com/using-sequelize-with-typescript.md) or [**Prisma**](/blog.logrocket.com/prisma-2-introduction.md) is used, this folder will have data models defined as per its requirement.

Consequently, the <VPIcon icon="fas fa-folder-open"/>`services` folder will include all the business logic. It can have services that represent business objects and can run queries on the database. Depending on the need, even general services like a database can be placed here.

Last but not the least, we have the <VPIcon icon="fas fa-folder-open"/>`utils` directory that will have all the utilities and helpers needed for the application. It will also act as a place to put shared logic, if any. For example, a simple helper to calculate the offset for a paginated SQL query can be put in a <VPIcon icon="fa-brands fa-js"/>`helper.util.js` file in this folder.

The <VPIcon icon="fas fa-folder-open"/>`test` folder has subfolders like <VPIcon icon="fas fa-folder-open"/>`unit` and <VPIcon icon="fas fa-folder-open"/>`integration` for unit and integration tests.

The <VPIcon icon="fas fa-folder-open"/>`unit` folder inside the <VPIcon icon="fas fa-folder-open"/>`test` folder will have a structure similar to the <VPIcon icon="fas fa-folder-open"/>`src` folder, as each file in the <VPIcon icon="fas fa-folder-open"/>`src` folder will need a test, and it is best to follow the same structure, like so:

![Expanded test folder structure in Express](/assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/Express-test-folder-structure.png)

The <VPIcon icon="fa-brands fa-js"/>`helper.util.test.js` file is placed inside the <VPIcon icon="fas fa-folder-open"/>`utils` folder in the <VPIcon icon="fas fa-folder-open"/>`unit` folder. This is the same pattern as in the <VPIcon icon="fas fa-folder-open"/>`src` folder. In our example project in the next section, we will use Jest to write and run the tests.

Even with this folder structure, some things can be missed. For example, if your project is using [<VPIcon icon="fas fa-globe"/>RabbitMQ with Node](https://geshan.com.np/blog/2021/07/rabbitmq-docker-nodejs/), you will need to keep the publishers and consumers in well-organized folders. Similarly, if you are creating a CLI application to do [<VPIcon icon="fas fa-globe"/>web scraping with Node](https://geshan.com.np/blog/2021/09/web-scraping-nodejs/), this project structure might be only partially helpful. Having mentioned that, this folder structure will suffice for most API or general web projects that need a better layout.

Also, keep in mind that other files may be needed, like a <VPIcon icon="iconfont icon-dotenv"/>`.env` file to keep the secrets safe and different per deployment environment. In the next part, we will look into an example project that follows the structure I have just laid out.

---

## Example Project with Node.js and MySQL

There are many great examples of using [**Node.js with MySQL**](/blog.logrocket.com/build-rest-api-node-express-mysql.md), so we will call our example app the Programming Languages API, which lists popular programming languages.

We can use the free tier of [<VPIcon icon="fas fa-globe"/>PlanetScale](https://planetscale.com/), a MySQL-compatible, serverless hyper-scale oriented service. You can view the code of this working app in the [GitHub (<VPIcon icon="iconfont icon-github" />`geshan/expressjs-structure`)](https://github.com/geshan/expressjs-structure) repository:

![Github page with Express project](/assets/image/blog.logrocket.com/organizing-express-js-project-structure-better-productivity/GitHub-express-project-structure.png)

In addition to the <VPIcon icon="fas fa-folder-open"/>`src` folder structure seen above, the tests for the project can be executed by running `npm test` on the root, which runs Jest. There are only some tests for the <VPIcon icon="fa-brands fa-js"/>`helper.util.js` file, but that gives a good sense of how to organize the source and the unit test code.

Similar to other Node and Express projects we can run `npm start` to run this project and hit `http://localhost:3000/programming-languages` to see the result. You will need to set up the database correctly, preferably on PlanetScale, and put the correct credentials in the <VPIcon icon="fas fa-folder-open"/>`src/configs/`<VPIcon icon="fa-brands fa-js"/>`db.config.js` file for it to work properly.

---

## Conclusion

In this article, we have seen how to provide an opinionated structure to an unopinionated Express framework. The organization really helps to maintain consistency, especially in a larger team.

Consistency in the project structure equates to the predictability of where the code can be expected, which in turn helps in the productivity of the whole team. Always make things easily predictable with a consistent structure to minimize or eliminate the guesswork, and help your team achieve their goals.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Organizing your Express.js project structure for better productivity",
  "desc": "Increase your team's productivity with this tutorial on structuring an Express project for maintainability, clarity, and consistency.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/organizing-express-js-project-structure-better-productivity.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
