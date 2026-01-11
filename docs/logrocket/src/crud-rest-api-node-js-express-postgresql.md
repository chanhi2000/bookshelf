---
lang: en-US
title: "CRUD REST API with Node.js, Express, and PostgreSQL"
description: "Article(s) > CRUD REST API with Node.js, Express, and PostgreSQL"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Data Science
  - PostgreSQL
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
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CRUD REST API with Node.js, Express, and PostgreSQL"
    - property: og:description
      content: "CRUD REST API with Node.js, Express, and PostgreSQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/crud-rest-api-node-js-express-postgresql.html
prev: /programming/js-express/articles/README.md
date: 2024-01-26
isOriginal: false
author:
  - name: Tania Rascia
    url : https://blog.logrocket.com/author/taniarascia/
cover: /assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/banner.webp
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

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CRUD REST API with Node.js, Express, and PostgreSQL"
  desc="Learn how to install and set up PostgreSQL in the command line, create users, databases, and tables, and run SQL commands."
  url="https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/banner.webp"/>

::: note Editor’s note

This post was last updated by [<VPIcon icon="iconfont icon-logrocket"/>Emmanuel John](https://blog.logrocket.com/author/emmanueljohn/) on 26 January 2024 to discuss securing the API and provide solutions to two common issues developers may encounter while developing APIs. A section was also added to cover potential next steps for developers. This article was previously updated on 6 June 2022 to reflect updates to the pgAdmin client.

:::

![Crud Rest Api With Node Js Express And Postgresql](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/banner.webp)

Working with APIs to facilitate communication between software systems is crucial for modern web developers. In this tutorial, we’ll create a CRUD RESTful API in a Node.js environment that runs on an Express server and uses a PostgreSQL database.

We’ll also walk through connecting an Express server with PostgreSQL using [<VPIcon icon="fas fa-globe"/>node-postgres](https://node-postgres.com/). Our API will be able to handle the HTTP request methods that correspond to the PostgreSQL database from which the API gets its data. You’ll also learn how to install PostgreSQL and work with it through the CLI.

Our goal is to allow CRUD operations — `GET`, `POST`, `PUT`, and `DELETE` — on the API, which will run the corresponding database commands. To do so, we’ll set up a route for each endpoint and a function for each query.

To follow along with this tutorial, you‘ll need:

- Familiarity with the JavaScript syntax and fundamentals
- Basic knowledge of working with the command line
- Node.js and npm installed

::: info

The complete code for the tutorial is available in this [GitHub repo (<VPIcon icon="iconfont icon-github" />`nemo0/node-postgres-crud-api`)](https://github.com/nemo0/node-postgres-crud-api). Let’s get started!

<SiteInfo
  name="nemo0/node-postgres-crud-api"
  desc="Contribute to nemo0/node-postgres-crud-api development by creating an account on GitHub."
  url="https://github.com/nemo0/node-postgres-crud-api/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/431c86d4623c248f7ab7c38464f86bec6e7c23358777f8bc031f20698782bb6f/nemo0/node-postgres-crud-api"/>

:::

---

## What is a RESTful API?

Representational State Transfer (REST) defines a set of standards for web services.

An API is an interface that software programs use to communicate with each other. Therefore, a RESTful API is an API that conforms to the REST architectural style and constraints.

REST systems are stateless, scalable, cacheable, and have a uniform interface.

---

## What is a CRUD API?

When building an API, you want your model to provide four basic functionalities. It should be able to create, read, update, and delete resources. This set of essential operations is commonly referred to as CRUD.

RESTful APIs most commonly utilize HTTP requests. Four of the most common HTTP methods in a REST environment are `GET`, `POST`, `PUT`, and `DELETE`, which are the methods by which a developer can create a CRUD system:

- `Create`: Use the `HTTP POST` method to create a resource in a REST environment
- `Read`: Use the `GET` method to read a resource, retrieving data without altering it
- `Update`: Use the `PUT` method to update a resource
- `Delete`: Use the `DELETE` method to remove a resource from the system

---

## What is Express?

According to the official [<VPIcon icon="iconfont icon-expressjs"/>Express documentation](https://expressjs.com/), Express is a fast, unopinionated, minimalist web framework for Node.js. Express is one of the most popular frameworks for Node.js. In fact, each E in the MERN, MEVN, and MEAN stacks stands for Express.

Although Express is minimalist, it’s also very flexible. This supports the [**development of various Express middlewares**](/blog.logrocket.com/express-middleware-a-complete-guide.md) that you can use to address almost any task or problem imaginable.

---

## What is PostgreSQL?

PostgreSQL, commonly referred to as Postgres, is a free and open source relational database management system. You might be familiar with a few other similar database systems, like MySQL, Microsoft SQL Server, or MariaDB, which compete with PostgreSQL.

PostgreSQL is a robust relational database that has been around since 1997. It’s available on all major operating systems — Linux, Windows, and macOS. Since PostgreSQL is known for stability, extensibility, and standards compliance, it’s a popular choice for developers and companies.

It’s also possible to create a Node.js RESTful CRUD API using Sequelize. [**Sequelize is a promise-based Node.js ORM**](/blog.logrocket.com/using-sequelize-with-typescript.md) for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

For more on how to use Sequelize in a Node.js REST API, check out the video tutorial below:

<VidStack src="youtube/VDgXAw7VynQ" />

---

## What is node-postgres?

[node-postgres (<VPIcon icon="fa-brands fa-npm"/>`pg`)](https://npmjs.com/package/pg), or pg, is a nonblocking PostgreSQL client for Node.js. Essentially, node-postgres is a collection of Node.js modules for interfacing with a PostgreSQL database.

node-postgres supports many features, including callbacks, promises, async/await, connection pooling, prepared statements, cursors, rich type parsing, and C/C++ bindings.

---

## Creating a PostgreSQL database

We’ll begin this tutorial by installing PostgreSQL, creating a new user, creating a database, and initializing a table with a schema and some data.

### Installation

If you’re using Windows, download a [<VPIcon icon="iconfont icon-postgresql"/>Windows installer](https://postgresql.org/download/windows/) of PostgreSQL.

If you’re using a Mac, this tutorial assumes you have [<VPIcon icon="iconfont icon-homebrew"/>Homebrew](https://brew.sh/) installed on your computer as a package manager for installing new programs. If you don’t, simply click on the link and follow the instructions.

Open up the terminal and install `postgresql` with `brew`:

```sh
brew install postgresql
```

You may see instructions on the web reading `brew install postgres` instead of `PostgreSQL`. Both options will install PostgreSQL on your computer.

After the installation is complete, we’ll want to get `postgresql` up and running, which we can do with `services start`:

```sh
brew services start postgresql
#
# ==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```

If at any point you want to stop the `postgresql` service, you can run `brew services stop postgresql`.

With PostgreSQL installed, let’s next connect to the `postgres` command line where we can run SQL commands.

---

## PostgreSQL command prompt

`psql` is the PostgreSQL interactive terminal. Running `psql` will connect you to a PostgreSQL host. Running `psql --help` will give you more information about the available options for connecting with `psql`:

- `-h` or `--host=HOSTNAME`: The database server host or socket directory; the default is `local socket`
- `-p` or `--port=PORT`: The database server port; the default is `5432`
- `-U` or `--username=USERNAME`: The database username; the default is `your_username`
- `-w` or `--no-password`: Never prompt for password
- `-W` or `--password`: Force password prompt, which should happen automatically

We’ll connect to the default `postgres` database with the default login information and no option flags:

```sh
psql postgres
```

You’ll see that we’ve entered into a new connection. We’re now inside `psql` in the `postgres` database. The prompt ends with a `#` to denote that we’re logged in as the superuser, or root:

```plaintext title="postgres"
postgres=#
```

Commands within `psql` start with a backslash ``. To test our first command, we can check what database, user, and port we’ve connected to using the `\conninfo` command:

```sh
\conninfo
# 
# You are connected to database "postgres" as user "your_username" via socket in "/tmp" at port "5432".
```

The reference table below includes a few common commands that we’ll use throughout this tutorial:

- `\q`: Exit `psql` connection
- `\c`: Connect to a new database
- `\dt`: List all tables
- `\du`: List all roles
- `\list`: List databases

Let’s create a new database and user so we’re not using the default accounts, which have superuser privileges.

---

## Creating a role in Postgres

First, we’ll create a role called `me` and give it a password of `password`. A role can function as a user or a group. In this case, we’ll use it as a user:

```sql
CREATE ROLE me WITH LOGIN PASSWORD 'password';
```

We want `me` to be able to create a database:

```sql
ALTER ROLE me CREATEDB;
```

You can run `\du` to list all roles and users:

```sh
\du
# 
# me          | Create DB                           | {}
# postgres    | Superuser, Create role, Create DB   | {}
```

Now, we want to create a database from the `me` user. Exit from the default session with `\q` for quit:

```sh
\q
```

We’re back in our computer’s default terminal connection. Now, we’ll connect `postgres` with `me`:

```sh
psql -d postgres -U me
```

Instead of `postgres=#`, our prompt now shows `postgres=>` , meaning we’re no longer logged in as a superuser.

---

## Creating a database in Postgres

We can create a database with the SQL command as follows:

```sql
CREATE DATABASE api;
```

Use the `\list` command to see the available databases:

```sh
\list
# 
# Name    |    Owner    | Encoding |   Collate   |    Ctype    |
# api     | me          | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

Let’s connect to the new `api` database with `me` using the `\c` connect command:

```sh
\c api
# 
# You are now connected to database "api" as user "me".
# api=>
```

Our prompt now shows that we’re connected to `api`.

---

## Creating a table in Postgres

Finally, in the `psql` command prompt, we’ll create a table called `users` with three fields, two `VARCHAR` types, and an auto-incrementing `PRIMARY KEY` ID:

```sql
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
```

Make sure not to use the backtick `` ` `` character when creating and working with tables in PostgreSQL. While backticks are allowed in MySQL, they’re not valid in PostgreSQL. Also, ensure that you do not have a trailing comma in the CREATE TABLE command.

Let’s add some data to work with by adding two entries to `users`:

```sql
INSERT INTO users (
  name, email
) VALUES (
  'Jerry', 'jerry@example.com'
), (
  'George', 'george@example.com'
);
```

Let’s make sure that the information above was correctly added by getting all entries in `users`:

```sql
SELECT * FROM users;
--
-- id  |  name  |       email    
-- ----+--------+--------------------
--   1 | Jerry  | jerry@example.com
--   2 | George | george@example.com
```

Now, we have a user, database, table, and some data. We can begin building our Node.js RESTful API to connect to this data, stored in a PostgreSQL database.

At this point, we’re finished with all of our PostgreSQL tasks, and we can begin setting up our Node.js app and Express server.

---

## Setting up an Express server

To set up a Node.js app and Express server, first create a directory for the project to live in:

```sh
mkdir node-api-postgres
cd node-api-postgres
```

You can either run `npm init -y` to create a <VPIcon icon="iconfont icon-json"/>`package.json` file, or copy the code below into a <VPIcon icon="iconfont icon-json"/>`package.json` file:

```json title="package.json"
{
  "name": "node-api-postgres",
  "version": "1.0.0",
  "description": "RESTful API with Node.js, Express, and PostgreSQL",
  "main": "index.js",
  "license": "MIT"
}
```

We’ll want to install Express for the server and node-postgres to connect to PostgreSQL:

```sh
npm i express pg
```

Now, we have our dependencies loaded into <VPIcon icon="fas fa-folder-open"/>`node_modules` and <VPIcon icon="iconfont icon-json"/>`package.json`.

Create an <VPIcon icon="fa-brands fa-js"/>`index.js` file, which we’ll use as the entry point for our server. At the top, we’ll require the `express` module, the built-in [<VPIcon icon="iconfont icon-expressjs"/>`body-parser` middleware](http://expressjs.com/en/resources/middleware/body-parser.html), and we’ll set our `app` and `port` variables:

```js
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
```

We’ll tell a route to look for a `GET` request on the root `/` URL and return some JSON:

```js
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
```

Now, set the app to listen on the port you set:

```js
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
```

From the command line, we can start the server by hitting <VPIcon icon="fa-brands fa-js"/>`index.js`:

```sh
node index.js
#
# App running on port 3000.
```

Go to `http://localhost:3000` in the URL bar of your browser, and you’ll see the JSON we set earlier:

```json
{
  "info": "Node.js, Express, and Postgres API"
}
```

The Express server is running now, but it’s only sending some static JSON data that we created. The next step is to connect to PostgreSQL from Node.js to be able to make dynamic queries.

---

## Connecting to a Postgres database using a Client

A popular client for accessing Postgres databases is the [<VPIcon icon="iconfont icon-postgresql"/>pgAdmin](https://pgadmin.org/) client. The pgAdmin application is available for various platforms. If you want to have a graphical user interface for your Postgres databases, you can go to the [<VPIcon icon="iconfont icon-postgresql"/>download page](https://pgadmin.org/download/) and download the necessary package.

Creating and querying your database using pgAdmin is simple. You need to click on the **Object** option available on the top menu, select **Create**, and choose **Database** to create a new connection. All the databases are available on the side menu. You can query or run SQL queries efficiently by selecting the proper database:

![Screenshot Of Process Using Pgadmin To Create A Query Database](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Create-query-database.png)

---

## Connecting to a Postgres database from Node.js

We’ll use the [<VPIcon icon="fas fa-globe"/>node-postgres](https://node-postgres.com/) module to create a pool of connections. Therefore, we don’t have to open and close a client each time we make a query.

A popular option for production pooling would be to use [<VPIcon icon="fas fa-globe"/>`pgBouncer`](https://pgbouncer.github.io/), a lightweight connection pooler for PostgreSQL.

```js
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
```

In a production environment, you would want to put your configuration details in a separate file with restrictive permissions so that it is not accessible from version control. But, for the simplicity of this tutorial, we’ll keep it in the same file as the queries.

The aim of this tutorial is to allow CRUD operations — `GET`, `POST`, `PUT`, and `DELETE` — on the API, which will run the corresponding database commands. To do so, we’ll set up a route for each endpoint and a function corresponding to each query.

---

## Creating routes for CRUD operations

We’ll create six functions for six routes, as shown below. First, create all the functions for each route. Then, export the functions so they’re accessible:

- `GET`: `/` | `displayHome()`
- `GET`: `/users` | `getUsers()`
- `GET`: `/users/:id` | `getUserById()`
- `POST`: `/users` | `createUser()`
- `PUT`: `/users/:id` | `updateUser()`
- `DELETE`: `/users/:id` | `deleteUser()`

In <VPIcon icon="fa-brands fa-js"/>`index.js`, we made an `app.get()` for the root endpoint with a function in it. Now, in <VPIcon icon="fa-brands fa-js"/>`queries.js`, we’ll create endpoints that will display all users, display a single user, create a new user, update an existing user, and delete a user.

### `GET` all users

Our first endpoint will be a `GET` request. We can put the raw SQL that will touch the `api` database inside the `pool.query()`. We’ll `SELECT` all users and order by ID.

```js
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
```

### `GET` a single user by ID

For our `/users/:id` request, we’ll get the custom `id` parameter by the URL and use a `WHERE` clause to display the result.

In the SQL query, we’re looking for `id=$1`. In this instance, `$1` is a numbered placeholder that PostgreSQL uses natively instead of the `?` placeholder that you may recognize from other variations of SQL:

```js
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
```

### `POST` a new user

The API will take a `GET` and `POST` request to the `/users` endpoint. In the `POST` request, we’ll add a new user. In this function, we’re extracting the `name` and `email` properties from the request body and inserting the values with `INSERT`:

```js
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}
```

### `PUT` updated data in an existing user

The `/users/:id` endpoint will also take two HTTP requests, the `GET` we created for `getUserById` and a `PUT` to modify an existing user. For this query, we’ll combine what we learned in `GET` and `POST` to use the `UPDATE` clause.

It’s worth noting that `PUT` is idempotent, meaning the exact same call can be made over and over and will produce the same result. `PUT` is different than `POST`, in which the exact same call repeated will continuously make new users with the same data:

```js
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
```

### `DELETE` a user

Finally, we’ll use the `DELETE` clause on `/users/:id` to delete a specific user by ID. This call is very similar to our `getUserById()` function:

```js
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
```

---

## Exporting CRUD functions in a REST API

To access these functions from <VPIcon icon="fa-brands fa-js"/>`index.js`, we’ll need to export them. We can do so with `module.exports`, creating an object of functions. Since we’re using the ES6 syntax, we can write `getUsers` instead of `getUsers:getUsers` and so on:

```js
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
```

Our complete <VPIcon icon="fa-brands fa-js"/>`queries.js` file is below:

```js :collapsed-lines title="queries.js"
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
```

---

## Setting up CRUD functions in a REST API

Now that we have all of our queries, we need to pull them into the <VPIcon icon="fa-brands fa-js"/>`index.js` file and make endpoint routes for all the query functions we created.

To get all the exported functions from <VPIcon icon="fa-brands fa-js"/>`queries.js`, we’ll `require` the file and assign it to a variable:

```js title="index.js"
const db = require('./queries')
```

Now, for each endpoint, we’ll set the HTTP request method, the endpoint URL path, and the relevant function:

```js title="index.js"
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
```

Below is our complete <VPIcon icon="fa-brands fa-js"/>`index.js` file, the entry point of the API server:

```js title="index.js"
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
```

With just these two files, we have a server, database, and our API all set up. You can start up the server by hitting <VPIcon icon="fa-brands fa-js"/>`index.js` again:

```sh
node index.js
#
# App running on port 3000.
```

Now, if you go to `http://localhost:3000/users` or `http://localhost:3000/users/1`, you’ll see the JSON response of the two `GET` requests.

To test our `POST`, `PUT`, and `DELETE` requests, we can use a tool like Postman or a VS Code extension like [<VPIcon icon="fas fa-globe"/>Thunder Client](https://thunderclient.com/) to send the HTTP requests. You can also use [**`curl`, a command-line tool**](/blog.logrocket.com/an-intro-to-curl-the-basics-of-the-transfer-tool.md) that is already available on your terminal.

Using a tool like Postman or Thunder Client makes it simple to query endpoints with different HTTP methods. Simply enter your URL, choose the specific HTTP method, insert the JSON value if the endpoint is a PUT or POST route, and hit **Send**:

![Example Of How To Add A New User With Thunder Client And Vs Code](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Add-new-user-Thunder-Client-VS-Code.png)

The example above shows sending a `POST` request to the specified route. The `POST` option suggests that it is a `POST` request. The URL beside the method is the API endpoint, and the JSON content is the data to be sent to the endpoint. You can hit the different routes similarly.

Here’s an example of sending a `POST` request to the specified route to create a new user using Postman:

![Example Of How To Add A New User Using Postman](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Add-new-user-Postman.png)

Here’s an example of sending a `PUT` request to the specified route to modify a user by its ID:

![Example Of How To Update User By Id Using Postman](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Update-user-by-ID-Postman.png)

#podrocket-plug { border-radius: 12px; width: 75%; height: 352px; margin: 1rem auto; display: block; }

Here’s an example of sending a `GET` request to the specified route to retrieve a user by its ID:

![Example Of How To Read User By Id Using Postman](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Read-user-by-ID-Postman.png)

Here’s an example of sending a `GET` request to the specified route to retrieve all users:

![Example Of How To Fetch All Users By Id Using Postman](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Fetch-all-users-Postman.png)

Finally, here’s an example of sending a `DELETE` request to the specified route to delete a user by its ID:

![Example Of How To Delete Users By Id Using Postman](/assets/image/blog.logrocket.com/crud-rest-api-node-js-express-postgresql/Delete-user-Postman.png)

---

## Solutions to common issues encountered while developing APIs

Developing APIs can come with various challenges. Let’s go over the solutions to two common issues encountered during API development: CORS issues and unhandled errors due to middleware order.

### Handling CORS issues

Browser security policies can block requests from different origins. To address this issue, use the `cors` middleware in Express to handle cross-origin resource sharing (CORS).

Run the following command to install `cors`:

```sh
npm install cors
```

To use it, do the following:

```js
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
```

This will enable CORS for all origins.

### Middleware order and error handling

Middleware order can affect error handling, leading to unhandled errors. To address this issue, place error-handling middleware at the end of your middleware stack and use `next(err)` to pass errors to the error-handling middleware:

```js
app.use((req, res, next) => {
  const error = new Error('Something went wrong');
  next(error);
});
// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).send('Internal Server Error');
});
```

---

## Securing the API

When it comes to securing APIs, we need to implement various mechanisms to ensure the confidentiality, and integrity of the application and its data. Let’s go over a few of these mechanisms now.

### Authentication

You can implement strong authentication mechanisms, such as JSON Web Tokens (JWT) or OAuth, to verify the identity of clients. Ensure that only authenticated and authorized users can access certain routes — in our case, the `POST`, `PUT`, and `DELETE` methods.

I will recommend [**the Passport middleware for Node.js**](/blog.logrocket.com/using-passport-authentication-node-js.md), which makes it easy to implement authentication and authorization. Here’s an example of how to use Passport:

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Verify username and password
    // Call done(null, user) if authentication is successful
  }
));
```

### Authorization

It’s important to enforce proper access controls to restrict access to specific routes or resources based on the user’s role or permissions. For example, you can check if the user making a request has `admin` privileges before allowing or denying them permission to proceed with the request:

```js
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Permission denied' });
  }
}
```

You can apply the `isAdmin` middleware defined above to any protected routes, thus restricting access to those routes.

### Input validation

Validate and sanitize user inputs to prevent SQL injection, XSS, and other security vulnerabilities. For example:

```js
const { body, validationResult } = require('express-validator');

app.post('/users', [
  // add validation rules
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // Process the request
});
```

The code above allows you to specify validation rules for POST requests to the `/users` endpoint. If the validation fails, it sends a response with the validation errors. If the incoming data is correct and safe, it proceeds with processing the request.

### Helmet middleware

You can use [**the Helmet middleware**](/blog.logrocket.com/using-helmet-node-js-secure-application.md) to set various HTTP headers for enhanced security:

```js
const helmet = require('helmet');
app.use(helmet());
```

Configuring HTTP headers with Helmet helps protect your app from security issues like XSS attacks, CSP vulnerabilities, and more.

---

## Additional notes and suggestions

You can build on this tutorial by implementing the following suggestions:

- **Integration with frontend frameworks**: Choose a frontend framework or library (e.g., React, Angular, Vue.js) to build a user interface for your application. Then, implement API calls from the frontend to interact with the backend CRUD operations. You can consider state management solutions (e.g., Redux, Vuex) for managing the state of your frontend application
- **Containerizing the API**: Write a Dockerfile to define the environment and dependencies needed to run your Node.js app. Create a `docker-compose.yml` file for managing multiple containers, such as the Node.js app and PostgreSQL database. This will make your Node.js application easier to deploy and set up on other machines
- **Implementing unit/integration tests:** Write unit tests for individual functions and components of your application to ensure that they work as expected. Use testing frameworks like Mocha, Jest, or Jasmine for writing and running tests. Implement integration tests to verify the interactions between different components in your front-end application and the overall functionality of your API
- **Continuous integration/deployment (CI/CD)**: Set up CI/CD pipelines to automate the testing and deployment processes. Use tools like Jenkins, Travis CI, or GitHub Actions to streamline the development/deployment workflow

While actually implementing these next steps is beyond the scope of this tutorial, you can use these ideas to apply what we’ve discussed to a real use case.

---

## Conclusion

You should now have a functioning API server that runs on Node.js and is hooked up to an active PostgreSQL database.

In this tutorial, we learned how to install and set up PostgreSQL in the command line, create users, databases, and tables, and run SQL commands. We also learned how to create an Express server that can handle multiple HTTP methods and use the `pg` module to connect to PostgreSQL from Node.js.

With this knowledge, you should be able to build on this API and utilize it for your own personal or professional development projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CRUD REST API with Node.js, Express, and PostgreSQL",
  "desc": "Learn how to install and set up PostgreSQL in the command line, create users, databases, and tables, and run SQL commands.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/crud-rest-api-node-js-express-postgresql.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
