---
lang: en-US
title: "How to Handle MongoDB Migrations with ts-migrate-mongoose"
description: "Article(s) > How to Handle MongoDB Migrations with ts-migrate-mongoose"
icon: iconfont icon-mongodb
category:
  - MongoDB
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - mongodb
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle MongoDB Migrations with ts-migrate-mongoose"
    - property: og:description
      content: "How to Handle MongoDB Migrations with ts-migrate-mongoose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/handle-mongodb-migrations-with-ts-migrate-mongoose.html
prev: /data-science/mongodb/articles/README.md
date: 2024-11-27
isOriginal: false
author: Orim Dominic Adah
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732615343335/0a1b3e5e-bfa7-4f57-81a7-7f4bac9e8b0a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Handle MongoDB Migrations with ts-migrate-mongoose"
  desc="Database migrations are modifications made to a database. These modifications may include changing the schema of a table, updating the data in a set of records, seeding data or deleting a range of records. Database migrations are usually run before a..."
  url="https://freecodecamp.org/news/handle-mongodb-migrations-with-ts-migrate-mongoose"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732615343335/0a1b3e5e-bfa7-4f57-81a7-7f4bac9e8b0a.png"/>

Database migrations are modifications made to a database. These modifications may include changing the schema of a table, updating the data in a set of records, seeding data or deleting a range of records.

Database migrations are usually run before an application starts and do not run successfully more than once for the same database. Database migration tools save a history of migrations that have run in a database so that they can be tracked for future purposes.

In this article, you’ll learn how to set up and run database migrations in a minimal Node.js API application. We will use [<FontIcon icon="fa-brands fa-npm"/>`ts-migrate-mongoose`](https://npmjs.com/package/ts-migrate-mongoose) and an npm script to create a migration and seed data into a MongoDB database. ts-migrate-mongoose supports running migration scripts from TypeScript code as well as CommonJS code.

ts-migrate-mongoose is a migration framework for Node.js projects that use [<FontIcon icon="fa-brands fa-npm"/>`mongoose`](https://npmjs.com/package/mongoose) as the object-data mapper. It provides a template for writing migration scripts. It also provides a configuration to run the scripts programmatically and from the CLI.

---

## How to Set Up the Project

To use ts-migrate-mongoose for database migrations, you need to have the following:

1. A Node.js project with mongoose installed as a dependency.
2. A MongoDB database connected to the project.
3. MongoDB Compass (Optional – to enable us view the changes in the database).

A starter repository which can be cloned from [<FontIcon icon="iconfont icon-github"/>`orimdominic/ts-migrate-mongoose-starter-repo`](https://github.com/orimdominic/ts-migrate-mongoose-starter-repo) has been created for ease. Clone the repository, fill the environment variables and start the application by running the `npm start` command.

Visit `http://localhost:8000` with a browser or an API client such as Postman and the server will return a "Hello there!" text to show that the starter application runs as expected.

---

## How to Configure ts-migrate-mongoose for the Project

To configure ts-migrate-mongoose for the project, install ts-migrate-mongoose with this command:

```sh
npm install ts-migrate-mongoose
```

ts-migrate-mongoose allows configuration with a JSON file, a TypeScript file, a <FontIcon icon="fas fa-file-lines"/>`.env` file or via the CLI. It is advisable to use a <FontIcon icon="fas fa-file-lines"/>`.env` file because the content of the configuration may contain a database password and it is not proper to have that exposed to the public. <FontIcon icon="fas fa-file-lines"/>`.env` files are usually hidden via <FontIcon icon="fa-brands fa-git-alt"/>`.gitignore` files so they are more secure to use. This project will use a <FontIcon icon="fas fa-file-lines"/>`.env` file for the ts-migrate-mongoose configuration.

The file should contain the following keys and their values:

- `MIGRATE_MONGO_URI` - the URI of the Mongo database. It is the same as the database URL.
- `MIGRATE_MONGO_COLLECTION` - the name of the collection (or table) which migrations should be saved in. The default value is migrations which is what is used in this project. ts-migrate-mongoose saves migrations to MongoDB.
- `MIGRATE_MIGRATIONS_PATH` - the path to the folder for storing and reading migration scripts. The default value is `./migrations` which is what is used in this project.

---

## How to Seed User Data with ts-migrate-mongoose

We have been able to create a project and connect it successfully to a Mongo database. At this point, we want to seed user data into the database. We need to:

1. Create a users collection (or table)
2. Use ts-migrate-mongoose to create a migration script to seed data
3. Use ts-migrate-mongoose to run the migration to seed the user data into the database before the application starts

### 1. Create a users Collection using Mongoose

Mongoose schema can be used to create a user collection (or table). User documents (or records) will have the following fields (or columns): `email`, `favouriteEmoji` and `yearOfBirth`.

To create a Mongoose schema for the user collection, create a `user.model.js` file in the root of the project containing the following code snippet:

```js title="user.model.js"
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    favouriteEmoji: {
      type: String,
      required: true,
    },
    yearOfBirth: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.UserModel = mongoose.model("User", userSchema);
```

### 2. Create a Migration Script with ts-migrate-mongoose

ts-migrate-mongoose provides CLI commands which can be used to create migration scripts.

Running `npx migrate create <name-of-script>` in the root folder of the project will create a script in the `MIGRATE_MIGRATIONS_PATH` folder (<FontIcon icon="fas fa-foler-open"/>`./migrations` in our case). `<name-of-script>` is the name we want the migration script file to have when it is created.

To create a migration script to seed user data, run:

```sh
npx migrate create seed-users
```

The command will create a file in the `./migrations` folder with a name in the form -`<timestamp>-seed-users.ts`. The file will have the following code snippet content:

```ts
// Import your models here

export async function up (): Promise<void> {
  // Write migration here
}

export async function down (): Promise<void> {
  // Write migration here
}
```

The `up` function is used to run the migration. The `down` function is used to reverse whatever the `up` function executes, if need be. In our case, we are trying to seed users into the database. The `up` function will contain code to seed users into the database and the `down` function will contain code to delete users created in the `up` function.

If the database is inspected with MongoDB Compass, the migrations collection will have a document that looks like this:

```js
{
  "_id": ObjectId("6744740465519c3bd9c1a7d1"),
  "name": "seed-users",
  "state": "down",
  "createdAt": 2024-11-25T12:56:36.316+00:00,
  "updatedAt": 2024-11-25T12:56:36.316+00:00,
  "__v": 0
}
```

The `state` field of the migration document is set to `down`. After it runs successfully, it changes to `up`.

You can update the code in <FontIcon icon="fas fa-folder-open"/>`./migrations/`<FontIcon icon="iconfont icon-typescript"/>`<timestamp>-seed-users.ts` to the one in the snippet below:

```ts
require("dotenv").config() // load env variables
const db = require("../db.js")
const { UserModel } = require("../user.model.js");

const seedUsers = [
  { email: "john@email.com", favouriteEmoji: "🏃", yearOfBirth: 1997 },
  { email: "jane@email.com", favouriteEmoji: "🍏", yearOfBirth: 1998 },
];

export async function up (): Promise<void> {
  await db.connect(process.env.MONGO_URI)
  await UserModel.create(seedUsers);}

export async function down (): Promise<void> {
  await db.connect(process.env.MONGO_URI)
  await UserModel.delete({
    email: {
      $in: seedUsers.map((u) => u.email),
    },
  });
}
```

### 3. Run the Migration Before the Application Starts

ts-migrate-mongoose provides us with CLI commands to run the `up` and `down` function of migration scripts.

With `npx migrate up <name-of-script>` we can run the `up` function of a specific script. With `npx migrate up` we can run the `up` function of all scripts in the `./migrations` folder with a `state` of `down` in the database.

To run the migration before the application starts, we make use of npm scripts. npm scripts with a prefix of `pre` will run before a script without the `pre` prefix. For example, if there is a `dev` script and a `predev` script, whenever the `dev` script is run with `npm run dev`, the `predev` script will automatically run before the `dev` script is run.

We will use this feature of npm scripts to place the ts-migrate-mongoose command in a `prestart` script so that the migration will run before the `start` script.

Update the <FontIcon icon="iconfont icon-json"/>`package.json` file to have a `prestart` script that runs the ts-migrate-mongoose command for running the `up` function of migration scripts in the project.

```json
  "scripts": {
    "prestart": "npx migrate up",
    "start": "node index.js"
  },
```

With this setup, when `npm run start` is executed to start the application, the `prestart` script will run to execute the migration using ts-migrate-mongoose and seed the database before the application starts.

You should have something similar to the snippet below after running `npm run start`:

```sh
npm run start
# 
# Synchronizing database with file system migrations...
# MongoDB connection successful
# up: 1732543529744-seed-users.ts 
# All migrations finished successfully
# 
# > ts-migrate-mongoose-starter-repo@1.0.0 start
# > node index.js
# 
# MongoDB connection successful                      
# Server listening on port 8000
```

Check out the [seed-users (<FontIcon icon="iconfont icon-github"/>`orimdominic/ts-migrate-mongoose-starter-repo`)](https://github.com/orimdominic/ts-migrate-mongoose-starter-repo/tree/seed-users) branch of the repository to see the current status of the codebase at this point in the article.

---

## How to Build an API Endpoint to Fetch Seeded Data

We can build an API endpoint to fetch the seeded users data in our database. In the `server.js` file, update the code to the one in the snippet below:

```js title="server.js"
const { UserModel } = require("./user.model.js")

module.exports = async function (req, res) {
  const users = await UserModel.find({}) // fetch all the users in the database

  res.writeHead(200, { "Content-Type": "application/json" });
  return res.end(JSON.stringify({ // return a JSON representation of the fetched users data
    users: users.map((u) => ({
      email: u.email,
      favouriteEmoji: u.favouriteEmoji,
      yearOfBirth: u.yearOfBirth,
      createdAt: u.createdAt
    }))
  }, null, 2));
};
```

If we start the application and visit `http://localhost:8000` using Postman or a browser, we get a JSON response similar to the one below:

```json
{
  "users": [
    {
      "email": "john@email.com",
      "favouriteEmoji": "🏃",
      "yearOfBirth": 1997,
      "createdAt": "2024-11-25T14:18:55.416Z"
    },
    {
      "email": "jane@email.com",
      "favouriteEmoji": "🍏",
      "yearOfBirth": 1998,
      "createdAt": "2024-11-25T14:18:55.416Z"
    }
  ]
}
```

Notice that if the application is run again, the migration script does not run anymore because the `state` of the migration will now be `up` after it has run successfully.

Check out the [fetch-users (<FontIcon icon="iconfont icon-github"/>`orimdominic/ts-migrate-mongoose-starter-repo`)](https://github.com/orimdominic/ts-migrate-mongoose-starter-repo/tree/fetch-users) branch of the repository to see the current status of the codebase at this point in the article.

---

## Conclusion

Migrations are useful when building applications and there is need to seed initial data for testing, seeding administrative users, updating database schema by adding or removing columns and updating the values of columns in many records at once.

ts-migrate-mongoose can help provide a framework for running migrations for your Node.js applications if you use Mongoose with MongoDB.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle MongoDB Migrations with ts-migrate-mongoose",
  "desc": "Database migrations are modifications made to a database. These modifications may include changing the schema of a table, updating the data in a set of records, seeding data or deleting a range of records. Database migrations are usually run before a...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/handle-mongodb-migrations-with-ts-migrate-mongoose.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
