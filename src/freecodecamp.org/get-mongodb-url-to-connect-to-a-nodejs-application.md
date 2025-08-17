---
lang: en-US
title: "How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide"
description: "Article(s) > How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide"
icon: fa-brands fa-node
category: 
  - Node.js
  - MongoDB
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide"
    - property: og:description
      content: "How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-mongodb-url-to-connect-to-a-nodejs-application.html
prev: /programming/js-node/articles/README.md
date: 2024-08-13
isOriginal: false
author:
  - name: Ijeoma Igboagu
    url : https://freecodecamp.org/news/author/Ijay/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723497228942/b766b557-8230-4bef-8392-d3f4f020c1f4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide"
  desc="In my previous article about building a Node.js application, I didn’t fully explain how to obtain the MongoDB URL, as I wanted to keep the article concise. However, I realized that this information is essential for saving data to MongoDB. In this art..."
  url="https://freecodecamp.org/news/get-mongodb-url-to-connect-to-a-nodejs-application"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1723497228942/b766b557-8230-4bef-8392-d3f4f020c1f4.png"/>

In my [**previous article about building a Node.js application**](/freecodecamp.org/how-to-build-an-event-app-with-node-js.md), I didn’t fully explain how to obtain the MongoDB URL, as I wanted to keep the article concise. However, I realized that this information is essential for saving data to MongoDB.

In this article, I will guide you through the process of getting your MongoDB URL so you can connect your application effectively. By the end of this tutorial, you’ll have a clear understanding of how to retrieve your MongoDB URL.

---

## Step 1: Search for MongoDB or Visit their Website

To begin, head to the [<FontIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com) website.

![Mongodb website](https://freecodecamp.org/news/content/images/2024/08/mongodb-website.png)

---

## Step 2: Click on the Sign In button on their website.

This will redirect you to the MongoDB login page. If you don’t have an account yet, you can create one by selecting the **Sign Up** option instead. Since I already have an account, I will log in to access my MongoDB dashboard.

![Redirection to login or signup page of mongodb](https://freecodecamp.org/news/content/images/2024/08/sigin-mongodb.gif)

---

## Step 3: Access the Dashboard

Once you log in, you'll have access to the dashboard. But first, you need to create a project folder.

### Why Do You Need a Project Folder?

This is for organizational purposes, helping you keep track of which projects you are working on.

**To create a project folder**

- Click on the **Projects** section at the top, indicated by a folder icon. This will reveal a dropdown menu.
- From the dropdown, click on **New Project**. This will redirect you to a page where you can create your new project.

![Create a new project](https://freecodecamp.org/news/content/images/2024/08/use-mongodb.gif)

- Click the **Next** button to proceed to the project creation page.

![Creating a project continues](https://freecodecamp.org/news/content/images/2024/08/create-project.png)

After creating your project, you will be redirected back to your dashboard, where you will see your newly created project folder. You can now start working on this specific project.

![Going back to the dashboard](https://freecodecamp.org/news/content/images/2024/08/project-created-mongodb-1.png)

---

## Step 4: Creating a Cluster

To obtain the MongoDB connection URL, it is essential to create a **Cluster**.

### What is a cluster?

A cluster in MongoDB is a group of servers that work together to store and manage your data, providing high availability and scalability.

**To create a cluster:**

1. On your dashboard, click on the **Clusters** button as shown in the picture of **Step 3** above.
2. Next, this will direct you to a page called "**Deploy your cluster**" where you get to create your cluster.

![Creating a cluster](https://freecodecamp.org/news/content/images/2024/08/cluster-mongoDB.gif)

---

## Step 5: Create a Username for Your Connection URL

After creating a cluster, you will be taken to a page where you need to create a username and password for the connection URL. The password can be autogenerated, or you can create your own.

![Creating Username and password](https://freecodecamp.org/news/content/images/2024/08/creating-a-username-for-mongodb.png)

### Why Do I Have to Create a Username?

Creating a username is essential for managing access to your MongoDB cluster. A username, along with a password, ensures that only authorized users can access your database. This adds a layer of security, protecting your data from unauthorized access.

### Benefits of creating a username:

- **Security:** Ensures that your database is only accessible to those with the correct credentials.
- **Management:** You can track who is accessing your database and manage permissions.
- **Accountability:** Helps in auditing and monitoring activities within your database.

---

## Step 6: Auto Generation of The MongoDB Connection URL

Once you click the **Create User** button, you will be redirected to a page where your connection URL is automatically generated. Copy this URL and paste it into your `.env` file to establish a connection to your database. Alternatively, you can paste it directly into your <FontIcon icon="fa-brands fa-js"/>`app.js` or <FontIcon icon="fa-brands fa-js"/>`server.js` file, as I [**explained in my previous article**](/freecodecamp.org/how-to-build-an-event-app-with-node-js.md).

Feel free to let me know if you need assistance!

![Automatic generation of the URL](https://freecodecamp.org/news/content/images/2024/08/getting-the-strringt-fot-conn.png)

---

## Conclusion

By following the steps outlined in this article, you should now understand how to obtain your MongoDB connection URL. Remember, creating a username and password for your database access is crucial for ensuring the security and management of your data.

If you encounter any challenges along the way, don't hesitate to refer back to this guide, ask questions or better still consult the official [<FontIcon icon="iconfont icon-mongodb"/>MongoDB documentation](https://mongodb.com/resources/products/fundamentals/basics) for further assistance.

If you found this article helpful, share it with others who may also find it interesting.

Stay updated with my projects by following me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`ijaydimples`)](https://twitter.com/ijaydimples), [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`ijeoma-igboagu`)](https://linkedin.com/in/ijeoma-igboagu/) and [GitHub (<FontIcon icon="iconfont icon-github"/>`ijayhub`)](https://github.com/ijayhub).

Thank you for reading💖.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Your MongoDB URL to Connect to Your Node.js Application - A Step-by-Step Guide",
  "desc": "In my previous article about building a Node.js application, I didn’t fully explain how to obtain the MongoDB URL, as I wanted to keep the article concise. However, I realized that this information is essential for saving data to MongoDB. In this art...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-mongodb-url-to-connect-to-a-nodejs-application.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
