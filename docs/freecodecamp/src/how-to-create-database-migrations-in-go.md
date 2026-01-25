---
lang: en-US
title: "How to Create Database Migrations in Go Using Docker and Postgres"
description: "Article(s) > How to Create Database Migrations in Go Using Docker and Postgres"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Go
  - Data Science
  - PostgreSQL
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - go
  - golang
  - sql
  - db
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create Database Migrations in Go Using Docker and Postgres"
    - property: og:description
      content: "How to Create Database Migrations in Go Using Docker and Postgres"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-database-migrations-in-go.html
prev: /devops/docker/articles/README.md
date: 2024-06-26
isOriginal: false
author:
  - name: Okure U. Edet (Yelsnik)
    url : https://github.com/Yelsnik
cover: https://freecodecamp.org/news/content/images/2024/06/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create Database Migrations in Go Using Docker and Postgres"
  desc="By Okure U. Edet Go is a fast programming language with a relatively simple syntax. While learning Go, it is important to learn how to build APIs and how to use them to communicate with databases. In the process of learning, I decided to take on a pr..."
  url="https://freecodecamp.org/news/how-to-create-database-migrations-in-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg"/>

Go is a fast programming language with a relatively simple syntax. While learning Go, it is important to learn how to build APIs and how to use them to communicate with databases. In the process of learning, I decided to take on a project that helped me in that regard: a simple inventory tracking API.

While working with an SQL database like Postgres, I learnt that it is important to make changes to the database in a timely manner. So if you have a schema that you may modify in the future, the best way to do that is with database migrations. It ensures that changes to the database are made accurately without affecting existing data.

In this article, you will learn about database migrations using Docker and Postgres.

---

## What is Database Migration?

What is database migration and why should you use it? Well, as a backend developer, when working on a project that requires you to store data in a database, you will need to develop a schema for the data you want to store.

Database migrations help you manage the structure of data within a database and in this case, a relational database. Migrations help modify schemas from a current state to a specific/desired state. It may involve the addition of tables and columns, removing elements or changing types and constraints.

One importance of database migration is to make changes in a database repeatable and seamless without the concern of data loss.

It is advisable to use migrations if you are not sure of what your final data schema would look like. In this sense, you can incrementally implement changes to it.

---

## How to Start and Run a Docker Container

Open your terminal and create a new directory `mkdir tracking-inventory-app`.

Then pull a postgres image from [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/). I used the `postgres:14-alpine` tag. You can use any tag you want.

In your terminal, paste the following and press enter:

```sh
docker pull postgres:14-alpine
```

After installing it, start the container by using the `docker run` command:

```sh
docker run --name postgres14 \
-e POSTGRES_USER=root \
-e POSTGRES_PASSWORD=passwordd \
-p 5432:5432 -d \
postgres:14-alpine
```

The `--name` flag refers to the name of the container. The `-e` flag refers to the environment variables. The `-p` flag means publish. You should run your container on a specified port. The `-d` flag means you want to run it in detached mode.

After you have pressed enter, open your Docker Desktop if you have it installed. If you don't, you can download it from the [<VPIcon icon="fa-brands fa-docker"/>docker website](https://docker.com/products/docker-desktop).

In your Docker Desktop, you should see that the container has been started:

![](https://freecodecamp.org/news/content/images/2024/06/docker-postgres14.png)

You can establish a connection with the the database using TablePlus:

![](https://freecodecamp.org/news/content/images/2024/06/connectionok.png)

Test the connection. If it says ok, then connect. If you are on Windows and it shows an authentication error, navigate to your start button and click on `Run`. In the popup, type `services.msc` and press enter. Look for postgres and click on stop service. Then try connecting again.

---

## How to Create and Run a Schema Using TablePlus

I have created a predefined schema/model for the tracking-inventory project with [<VPIcon icon="fas fa-globe"/>db diagram](https://dbdiagram.io/d). This tracking-inventory should allow you add an item, serial number and value. So the schema will have an `item`, `serial_number`, `id` and `created_at` fields.

```sql
CREATE TABLE "inventory" (
  "id" uuid PRIMARY KEY,
  "item" varchar NOT NULL,
  "serial_number" varchar NOT NULL,
  "user" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE INDEX ON "inventory" ("item");

ALTER TABLE "inventory" ADD FOREIGN KEY ("user") REFERENCES "user" ("id");
```

This is how mine looks. You can open your TablePlus and add the generated PostgreSQL code and run it.

---

## How to Install golang-migrate

The next step is to install `golang-migrate` on your system. I am using Linux on Windows for this tutorial.

To install it, visit this [documentation (<VPIcon icon="iconfont icon-github" />`golang-migrate/migrate`)](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate).

I am using Linux so I will use `curl`:

```sh
curl -L https://github.com/golang-migrate/migrate/releases/download/v4.12.2/migrate.linux-amd64.tar.gz | tar xvz
```

Once it has been successfully installed, on your terminal, run the command `migrate -help` to see its various commands.

![](https://freecodecamp.org/news/content/images/2024/06/migrate-help.png)

---

## How to Create a New Migration

After installing `golang-migrate`, you can create a new migration script.

Firstly, in your terminal and within the tracking-app directory, open VS code with the `code` command.

Once that is done, create a new folder named `db` and another folder inside the db folder named `migrations`.

Then in your terminal, run the following command:

```sh
migrate create -ext sql -dir db/migration -seq tracking_inventory_schema
```

The `-ext` flag refers to the extension you want the migration to be created with. In this case, it is sql. The `-dir` flag refers to the directory you want to create the files in. The `-seq` flag refers to the sequential number for the migration files.

Inside your VS code, there should be two files: one for `up` and another for `down`. The former is used to make forward changes to the directory while the latter is for reversing the changes.

In the `up` file, you are going to paste your schema to the file.

My schema looks like this:

```sql
CREATE TABLE "inventory" (
  "id" uuid PRIMARY KEY,
  "item" varchar NOT NULL,
  "serial_number" varchar NOT NULL,
  "user" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE INDEX ON "inventory" ("item");

ALTER TABLE "inventory" ADD FOREIGN KEY ("user") REFERENCES "user" ("id");
```

Yours may look different depending on what project you are building.

For the `down` file, just paste this in:

```sql
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS user;
```

The inventory table should be dropped first because it references the user table.

---

## How to Create and Drop the Database Inside and Outside a Docker Postgres Container

Check if your docker container is running using the command:

```sh
docker ps
```

If it is not, use the command `docker start ${container name}` to start it.

Next step is to access postgres shell using the following command since I'm on Linux:

```sh
docker exec -it postgres14 bin/bash
```

The `-it` flag stands for interactive shell/terminal. Inside this shell, you can run the `createdb` command:

```sh
createdb --username=root --owner=root tracking_inventory
```

Once created, you can run the `psql` command to interact with the db:

```sh title="output"
pqsl
#
# psql tracking-inventory
# psql (14.12)
# Type "help" for help.
# 
# tracking_inventory=#
```

You can also delete the database with the `dropdb` command.

To leave the shell, use the `exit` command.

To create the database outside the postgres container, paste the following command:

```sh
docker exec -it postgres14 createdb \
--username=root \
--owner=root \
tracking_inventory
```

---

## How to View the Database in TablePlus

To view the database that you have created, connect using the previous connection we established earlier. It'll take you to the root database and then click on the db icon on top.

![](https://freecodecamp.org/news/content/images/2024/06/root-db.png)

The database created will appear, then just click on `open` to open it

![](https://freecodecamp.org/news/content/images/2024/06/tracking-inventory-db.png)

---

## How to Run the Migrations

To run the migrations, run this command in your terminal:

```sh
migrate -path db/migration \
-database "postgresql://root:passwordd@localhost:5432/tracking_inventory?sslmode=disable" \ 
-verbose up
```

The `-path` flag specifies the path that contains the migration files. The `-database` option specifies the url to the database.

Inside the url, the driver is `postgresql`. The username and pasword is `root` and `passwordd` respectively. It is also important to add the `sslmode=disable` option because Postgres does not enable SSL by default.

Now run the migrations:

```sh
migrate -path db/migration \
-database "postgresql://root:passwordd@localhost:5432/tracking_inventory?sslmode=disable" \
-verbose up
# 
# calhost:5432/tracking_inventory?sslmode=disable" -verbose up
# 2024/06/25 00:13:25 Start buffering 1/u tracking_inventory_schema
# 2024/06/25 00:13:25 Read and execute 1/u tracking_inventory_schema
# 2024/06/25 00:13:26 Finished 1/u tracking_inventory_schema (read 43.186044ms, ran 255.501635ms)
# 2024/06/25 00:13:26 Finished after 312.928488ms
# 2024/06/25 00:13:26 Closing source and database
```

The migration is successful!

Refresh the database and see the new tables:

![](https://freecodecamp.org/news/content/images/2024/06/schema-migrations.png)

---

## Conclusion

Throughout this tutorial, you have learnt how to seamlessly write and run database migrations in Go using Docker and Postgres. I hope you have learnt much from this article.

You can connect with me on [twitter (<VPIcon icon="fa-brands fa-x-twitter" />`itzz_okure`)](https://x.com/itzz_okure) or on [linkedin (<VPIcon icon="fa-brands fa-linkedin" />`okure`)](https://linkedin.com/in/okure/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create Database Migrations in Go Using Docker and Postgres",
  "desc": "By Okure U. Edet Go is a fast programming language with a relatively simple syntax. While learning Go, it is important to learn how to build APIs and how to use them to communicate with databases. In the process of learning, I decided to take on a pr...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-database-migrations-in-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
