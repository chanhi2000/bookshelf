---
lang: en-US
title: "Run Node.js apps on Heroku with TypeScript"
description: "Article(s) > Run Node.js apps on Heroku with TypeScript"
icon: iconfont icon-expressj
category:
  - Node.js
  - Express.js
  - DevOps
  - Heroku
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - devops
  - heroku
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Run Node.js apps on Heroku with TypeScript"
    - property: og:description
      content: "Run Node.js apps on Heroku with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/run-nodejs-apps-on-heroku-with-typescript.html
prev: /programming/js-express/articles/README.md
date: 2019-03-19
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  "title": "Heroku > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/heroku/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Run Node.js apps on Heroku with TypeScript"
  desc="This article provides a step-by-step guide on how to get started with Heroku, a polyglot platform. It covers topics such as setting up a Node.js environment, connecting a Git repository, writing a Node.js application, connecting a GitHub repository, getting logs, running CLI apps, and working with databases."
  url="https://typescript.tv/hands-on/run-nodejs-apps-on-heroku-with-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This article provides a step-by-step guide on how to get started with Heroku, a polyglot platform. It covers topics such as setting up a Node.js environment, connecting a Git repository, writing a Node.js application, connecting a GitHub repository, getting logs, running CLI apps, and working with databases.

The best way to get started on the Heroku polyglot platform is to follow their [<VPIcon icon="iconfont icon-heroku"/>fantastic introduction](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). It's also worth reading about their [<VPIcon icon="iconfont icon-heroku"/>supported environments](https://devcenter.heroku.com/articles/buildpacks), [<VPIcon icon="iconfont icon-heroku"/>deployment tasks](https://devcenter.heroku.com/articles/procfile) and [<VPIcon icon="iconfont icon-heroku"/>European deployment](https://blog.heroku.com/europe-region) region. The second best advice is to follow our quick setup guide.

---

## Getting Started on Heroku

To speed things up, I am providing a list of resources which I found useful when deploying my first Node.js web applications on Heroku.

---

## Bootstrap Node.js environment

1. Download the [<VPIcon icon="iconfont icon-heroku"/>Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (or [<VPIcon icon="iconfont icon-heroku"/>Heroku Toolbelt](https://blog.heroku.com/the_heroku_toolbelt))
2. Run `heroku --version` to see if it works (I tested with v6.15.5)
3. Run `heroku login`
4. Run `heroku whoami` to see if you are logged in
5. Run `heroku create --region eu --buildpack heroku/nodejs` to create a Node.js app on Heroku in a European data center (your app will get a URL like `https://app-name-number.herokuapp.com/`)
6. Run `heroku open -a app-name-number` to see your application in a browser

---

## Connect Git repository

By default, web applications created on Heroku (with `heroku create`) come with their own Git repository. If you are starting completely from scratch, then you can follow these steps to push your own code to Heroku's Git repository:

```sh
git init
git remote add origin https://git.heroku.com/app-name-number.git
npm init -y
git add .
git commit -m "Initial commit"
git push -u origin main
```

If you now execute `heroku open`, you will see an "Application error" because you need to specify a way to start a Node.js process (most likely through `npm start`).

Note: Heroku will also run `npm run build` by default before running `npm start`.

---

## Write Node.js application

When `npm init -y` was executed, a <VPIcon icon="iconfont icon-json"/>`package.json` file has been created. We will make some adjustments to that file and create a web application based on the [<VPIcon icon="iconfont icon-expressjs"/>Express](http://expressjs.com/) web framework:

1. Run `npm i --save-dev typescript`
2. Run `npm i --save express @types/express`
3. Run `npx tsc --init`
4. Modify source code to match the following files.

```json title="package.json"
{
  "dependencies": {
    "@types/express": "4.16.1",
    "express": "4.16.4"
  },
  "devDependencies": {
    "typescript": "3.3.3333"
  },
  "engines": {
    "node": "11.x.x"
  },
  "license": "ISC",
  "main": "dist/main.js",
  "name": "my-app",
  "repository": {
    "type": "git",
    "url": "https://git.heroku.com/app-name-number.git"
  },
  "scripts": {
    "build": "tsc --build tsconfig.json",
    "start": "node dist/main.js"
  },
  "version": "1.0.0"
}
```

```ts title="src/main.ts"
import express from 'express';
 
const pkg = require('../package.json');
const app = express();
 
app.set('port', process.env.PORT || 3000);
 
app.all('*', (request, response) => {
  response.send(`<b>${pkg.name} v${pkg.version}</b>`);
});
 
app.listen(app.get('port'), () => {
  console.log(`Server is running on port "${app.get('port')}".`);
});
```

Deploy the latest code changes:

```sh
git add .
git commit -m "Show app version"
git push
```

---

## Connect GitHub repository

To run deployments from your GitHub repository, you need to add Heroku's Git repository to your cloned GitHub repository:

```sh
# Add remote named "heroku"
git remote add heroku https://git.heroku.com/app-name-number.git
 
# Push to "main" branch on remote "heroku"
git push heroku main
```

You can also connect your Heroku application with code from GitHub by using Heroku's [<VPIcon icon="iconfont icon-heroku"/>GitHub Deployments](https://devcenter.heroku.com/articles/github-integration#automatic-deploys) from the app dashboard.

---

## Get logs

```sh
heroku logs --tail -a app-name-number
```

---

## Run CLI apps

If you want to run a pure command-line app which does not serve a webpage, then you can change your use a "worker" dyno instead of a "web" done. Just place a file called `Procfile` in the root of your project and define the start script for the "worker" dyno:

```yaml title="Procfile"
worker: npm start
```

Tip: Prefer "npm start" over "node dist/main.js" to run in the npm context and to have access to environment variables like `process.env.npm_package_name`.

Next thing you should do is to scale down your "web" dyno, if you just want to run one "worker" dyno:

```sh
heroku ps:scale web=0 worker=1 -a app-name-number
```

Heroku runs health checks on the web domain of your application. That's why you need to scale down the "web" dyno if you just use a CLI app because otherweise the web health check will fail (see example below) and Heroku will kill your application:

```plaintext title="log"
2019-03-19T22:57:01.212233+00:00 heroku[router]: at=error code=H20 desc="App boot timeout" method=GET path="/" host=app-name-number.herokuapp.com request_id=7832
926b-a547-4927-9895-ea8a12e42765 fwd="91.10.153.93" dyno= connect= service= status=503 bytes= protocol=https
2019-03-19T22:57:49.960888+00:00 heroku[web.1]: State changed from starting to crashed
2019-03-19T22:57:49.863438+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2019-03-19T22:57:49.863489+00:00 heroku[web.1]: Stopping process with SIGKILL
2019-03-19T22:57:49.943431+00:00 heroku[web.1]: Process exited with status 137
```

---

## Databases

Databases on Heroku are handled as "Add-ons". You can get a "[<VPIcon icon="iconfont icon-heroku"/>Heroku Postgress](https://devcenter.heroku.com/articles/heroku-postgresql)" database for free. Connecting your Node.js application with it is super simple. Just add the database from your Heroku application dashboard as "Add-on" and Heroku will handle the rest for you and provide a `process.env.DATABASE_URL` variable that can be used to connect via object-relational mappers like [<VPIcon icon="fas fa-globe"/>TypeORM](https://typeorm.io/).

Note: You can also get the current connection properties (database name, user, password, port, etc.) from the settings panel of your data store on [<VPIcon icon="iconfont icon-heroku"/>data.heroku.com](https://data.heroku.com/) but be aware that Heroku rotates credentials periodically so it's advisable to rely on the database connection url instead of a username and password combination.

```ts title="initDatabase.ts"
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
 
export default function initDatabase(): Promise<Connection> {
  const localhost: SqliteConnectionOptions = {
    database: 'test.db3',
    type: 'sqlite',
  };
 
  const production: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
  };
 
  const connectionOptions = process.env.NODE_ENV === 'production' ? production : localhost;
 
  Object.assign(connectionOptions, {
    entities: ['src/entity/**/*.ts'],
    logging: false,
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    synchronize: true,
  });
 
  return createConnection(connectionOptions);
}
```

You will also need to have these dependencies in your <VPIcon icon="iconfont icon-json"/>`package.json` file:

```json title="package.json"
"pg": "7.9.0",
"typeorm": "0.2.15",
"reflect-metadata": "0.1.10",
"sqlite3": "4.0.3"
```

### Backups

Here is how you can make backups of your data store on Heroku:

- You can find your databases on [<VPIcon icon="iconfont icon-heroku"/>data.heroku.com](https://data.heroku.com/)
- Use the following command to turn binary database backups into plain text:

```sh
pg_restore backup.bin > backup.sql
```

::: tip

If you look for a free tool to connection to your Heroku Postgres database, then have a look at [<VPIcon icon="iconfont icon-postgresql"/>pgAdmin](https://pgadmin.org/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Run Node.js apps on Heroku with TypeScript",
  "desc": "This article provides a step-by-step guide on how to get started with Heroku, a polyglot platform. It covers topics such as setting up a Node.js environment, connecting a Git repository, writing a Node.js application, connecting a GitHub repository, getting logs, running CLI apps, and working with databases.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/run-nodejs-apps-on-heroku-with-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
