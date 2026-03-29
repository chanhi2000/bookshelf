---
lang: en-US
title: "Getting Started With Neon Branching"
description: "Article(s) > Getting Started With Neon Branching"
icon: fa-brands fa-node
category:
  - Node.js
  - Git
  - Data Science
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - node
  - nodejs
  - node-js
  - git
  - scm
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started With Neon Branching"
    - property: og:description
      content: "Getting Started With Neon Branching"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/getting-started-with-neon-branching.html
prev: /programming/js-node/articles/README.md
date: 2023-09-26
isOriginal: false
author:
  - name: Paul Scanlon
    url: https://smashingmagazine.com/author/paul-scanlon/
cover: https://files.smashing.media/articles/neon-branching/getting-started-with-neon-branching.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started With Neon Branching"
  desc="Branches are a really nice (and safe) way to configure or reconfigure your database without fear of screwing up the production database. Let’s take a closer look at how branching works with Neon, and the good news is, you probably already know how it works!"
  url="https://smashingmagazine.com/2023/09/getting-started-with-neon-branching/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/neon-branching/getting-started-with-neon-branching.jpg"/>

Branches are a really nice (and safe) way to configure or reconfigure your database without fear of screwing up the production database. Let’s take a closer look at how branching works with [<VPIcon icon="fas fa-globe"/>Neon](https://neon.com/), and the good news is, you probably already know how it works!

::: note

This article has been kindly supported by our dear friends at [<VPIcon icon="fas fa-globe"/>Neon Tech](https://neon.com/) who are on a mission to create a cloud-native database service for every developer. *Thank you!*

![Neon Tech](https://files.smashing.media/articles/neon-branching/neon-white-logo.svg)

:::

Branching off to make code changes is a tried and tested approach to software development, but why should database development be any different? Well, [<VPIcon icon="fas fa-globe"/>branching with Neon](https://neon.com/branching) allows you to make changes to your database without affecting the production environment. If you’re familiar with [<VPIcon icon="iconfont icon-git"/>Git](https://git-scm.com/), you’ll feel right at home.

For demonstration purposes, and to explain how branching works, I’ll use a typical “contact us” form and make a “fictional” change.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/neon-branching/contact-us-form.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/contact-us-form.png)

The form currently submits the following fields.

- `name`
- `email_address`
- `company_website`
- `company_size`
- `message`

The form works by sending the form data using a client-side request to a [<VPIcon icon="iconfont icon-vercel"/>Vercel Edge Function](https://vercel.com/features/edge-functions), which in turn securely connects to a [<VPIcon icon="fas fa-globe"/>Neon Serverless Postgres database](https://neon.com/).

Here’s a snippet of the client-side fetch request.

```js
const handleSubmit = async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(
    new FormData(event.currentTarget).entries()
  );

  try {
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  } catch (error) {
    console.error(error);
  }
};
```

And here’s a code snippet of the Edge Function that destructures the form values from the request body and `INSERT`s them into a table named `contact_us`.

```js :collapsed-lines
import { neon } from '@neondatabase/serverless';

export default async function handler(req) {
  const {
    data: { name, email_address, company_website, company_size, message },
  } = await new Response(req.body).json();

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`INSERT INTO contact_us 
        (name, email_address, company_website, company_size, message)
            VALUES(
      ${name},
      ${email_address},
      ${company_website},
      ${company_size},
      ${message}
        );`;

    return Response.json({
      message: 'A Ok!',
    });
  } catch (error) {
    return Response.json({
      message: 'Error',
    });
  }
}

export const config = {
  runtime: 'edge',
};
```

The change I’d like to make will happen “behind the scenes”, and along with information entered by the user, I also want to capture and store the geographical location of where in the world the form was submitted.

To do this I’m going to use Vercel’s [<VPIcon icon="iconfont icon-vercel"/>geolocation helper function](https://vercel.com/docs/functions/edge-functions/vercel-edge-package#geolocation) from the [<VPIcon icon="iconfont icon-vercel"/>@vercel/edge](https://vercel.com/docs/functions/edge-functions/vercel-edge-package#) package. The changes I’ll be making will affect both the Edge Function and the database table schema.

I don’t want to change the table schema on the live production database until I’ve tested it all works correctly, and thanks to branching, I don’t have to.

Here’s how I’d go about making a change of this nature.

---

## Creating a branch with Neon

Neon has a super cool browser console (just look at it! 😍), and all database changes can be made, and tested in the browser, no messing around with a dweeby-looking terminal window!

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/1-before-the-branch.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/1-before-the-branch.jpg)

1. The project is called `branching-sample`.
2. The primary branch name is <VPIcon icon="fas fa-code-branch"/>`main`.
3. To create a branch, click this button.

Clicking “Create branch” will take you to the next screen where I’ll configure the new branch.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/2-create-branch.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/2-create-branch.jpg)

1. This will be the name of the new branch. Typically I’ll name the branch the same as the Git branch. (I’ll show you that shortly).
2. This is the parent branch that I want to “branch off” from. Normally it’s always going to be main, but in some cases, I might branch off from another branch.
3. These are the branch configuration options. For this demonstration, I’ll be branching using the **Head** option. There are a number of reasons why branching from a specific point in **Time**, or **LSN** are more suitable. E.g, In cases where you might be performing a backup, or debugging an issue and want to see “when things went wrong”.
    - **Head**: Creates a branch with data up to the current point in time.
    - **Time**: Creates a branch with data up to the specified date and time.
    - **LSN**: Creates a branch with data up to the specified Log Sequence Number (LSN)
4. In order to test the changes I’ll be making in the Edge Function (which I’ll explain in a moment), I’ll want to ensure I’m inserting data correctly. By creating a compute endpoint with the branch, I can do this without worrying that I’ll be messing up the production database!
5. A button that will create the new branch

Clicking “Create the branch” will take you to the next screen.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/3-new-endpoint.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/3-new-endpoint.jpg)

This is where things get really, really cool!

1. This is a new connection string for an entirely new database, and it was set up almost instantly and contains “real” data! A key point to communicate is that any data pushed to this branch **won’t** appear in the production environment, but this “copy” of the database will be identical to the production database, in line with where you branched off from, in my case, Head.
2. The copy button allows you to quickly copy the connection string.

---

## Add the branch connection string to your local development environment.

Using the handy little “copy” button, I can copy the new connection string and add it to my <VPIcon icon="iconfont icon-dotenv"/>`.env` file.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/4-env-vars.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/4-env-vars.jpg)

1. This is just my preferred approach of course but, in my <VPIcon icon="iconfont icon-dotenv"/>`.env` file, I comment out the production database connection string, and add a new variable using the same name of `DATABASE_URL`. I then add a comment above it with the name of the branch I used in the Neon console. And for what it’s worth, my Git branch is also named the same way.

I’ve found this to be super helpful when I have multiple branches on the go at the same time. That one little comment above the connection string helps me identify which branch it relates to in the Neon console.

---

## Switch branches in the Neon console

Before going too much further I like to double check I’m viewing the correct branch in the Neon console. If you’ve followed the steps above you should be able to see your new branch when selecting “Branches” from the navigation.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/5-branches-overview.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/5-branches-overview.jpg)

1. Yep, this is the new branch I created.

Clicking the branch name will take you to the next screen.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/6-branch.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/6-branch.jpg)

1. From the SQL Editor, you can also switch between branches which makes it easy to run queries against different branches.

---

## Alter the database table schema

Before making any changes to the code I prepare the database and test it all works by running SQL commands directly in Neon’s SQL Editor.

### Show the current table schema

To work out what the current schema for the `contact_us` table looks like, I can navigate to “Tables” in the navigation and see the schema for the table.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/7-schema-before.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/7-schema-before.jpg)

1. Showing the branch you’re currently on.
2. The schema for the `contact_us` table.

I know the change I want to make will require that I add two new columns which will store geolocation data. The two new column names will be as follows.

1. `country_code`
2. `city`

### ALTER the table

To add the new columns I use the following SQL command.

```sql
ALTER TABLE contact_us 
ADD COLUMN country_code VARCHAR,
ADD COLUMN city VARCHAR;
```

[![Alter](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/8-alter.jpg)](https://files.smashing.media/articles/neon-branching/8-alter.jpg)

(<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/8-alter.jpg))

1. Using the `ALTER` `TABLE` command I’m adding both the above-named columns and giving them a data type of `VARCHAR`.

To double-check check the changes were made correctly I can head back over to “Tables” and take a look at the table schema again.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/9-schema-after.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/9-schema-after.jpg)

1. Showing the branch you’re currently on.
2. The `city` and `country_code` columns have been added to the schema for the `contact_us` table.

Now that I know the table is configured correctly, I’ll head back to the “SQL Editor” and run a quick `INSERT` to check there are no errors.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/10-test-insert.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/10-test-insert.jpg)

1. `INSERT` statement to add a row which includes values for the new `country_code` and `city` column.
2. Confirmation the request was successful.

If I `SELECT * FROM contact_us`, I’ll see the row I added will contain the `country_code` and `city` columns.

![<VPIcon icon="fas fa-file-image"/>[Large preview](https://files.smashing.media/articles/neon-branching/11-select-all-after.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/neon-branching/11-select-all-after.jpg)

1. A new row has been added with the correct values for `country_code` and `city`.

This test data will only be added to the branch, not the production environment, so you can safely run as many tests as you like without polluting the “real” data.

With the change confirmed to be working, I can now switch back to the <VPIcon icon="fas fa-code-branch"/>`main` branch, and run the `ALTER` command from earlier.

**This will apply the changes to the production database!**

```sql
ALTER TABLE contact_us 
ADD COLUMN country_code VARCHAR,
ADD COLUMN city VARCHAR;
```

I can double, double check this worked by going to “Tables” again in the console. If all is ok, I can safely delete the development branch: <VPIcon icon="fas fa-code-branch"/>`feat/geolocation-data` and move on to making the required changes to my Edge Function 🎉

---

## Install @vercel/edge

The values I’ll be adding to the `INSERT` statement can be extracted from incoming requests to an Edge Function. To access these values I’ll use the [<VPIcon icon="iconfont icon-vercel"/>geolocation](https://vercel.com/docs/functions/edge-functions/vercel-edge-package#geolocation) helper function from the `@vercel/edge package`.

To use this package, I’ll first need to install it.

```sh
npm i @vercel/edge
```

I can then use it in my Edge Function. Here’s a diff of the change. You can [see the full diff for the PR on my GitHub here (<VPIcon icon="iconfont icon-github"/>`PaulieScanlon/neon-branching-sample`)](https://github.com/PaulieScanlon/neon-branching-sample/pull/1/files).

```js
import { neon } from '@neondatabase/serverless';
import { geolocation } from '@vercel/edge'; // [!code++]

export default async function handler(req) {
  const {
    data: { name, email_address, company_website, company_size, message },
  } = await new Response(req.body).json();

  const { country, city } = geolocation(req); // [!code++]

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`INSERT INTO contact_us (
        name,
        email_address,
        company_website,
        company_size,
        message,
        country_code, // [!code++]
        city          // [!code++]  
       )
     VALUES(
       ${name},
       ${email_address},
       ${company_website},
       ${company_size},
       ${message},
       ${country},    // [!code++]
       ${city}        // [!code++]
      );
     `;

    return Response.json({
      message: 'A Ok!',
    });
  } catch (error) {
    return Response.json({
      message: 'Error',
    });
  }
}

export const config = {
  runtime: 'edge',
};
```

One snag with this package when testing locally is, both the `country` and `city` will be `null`. The `geolocation` function will only return actual values when the Edge Function has been deployed. ☝️

And that’s it, brrrrranches!

Branches are a really nice (and safe) way to configure or reconfigure your database without fear of screwing up the production database, and in my experience, branches can really help speed up development time, and it doesn’t matter how many test `INSERT`s I run, test data will always remain on the branch and will never affect the production environment.

::: info

If you’d like to try Neon today, pop over here and sign up: [<VPIcon icon="fas fa-globe"/>neon.com](https://neon.com/), you might also want to sneak a peak at our getting started guides:

<SiteInfo
  name="Neon Serverless Postgres — Ship faster"
  desc="The database you love, on a serverless platform designed to help you build reliable and scalable applications faster."
  url="https://neon.com/"
  logo="https://neon.com/favicon/favicon.ico"
  preview="https://neon.com/images/social-previews/index.jpg?updated=2026-01-15"/>

<SiteInfo
  name="Query with Neon's SQL Editor - Neon Docs"
  desc="The Neon SQL Editor allows you to run queries on your Neon databases directly from the Neon Console. In addition, the editor keeps a query history, permits saving queries, and provides Explain and Ana..."
  url="https://neon.com/docs/get-started/query-with-neon-sql-editor/"
  logo="https://neon.com/favicon/favicon.ico"
  preview="https://neon.com/docs/og?title=UXVlcnkgd2l0aCBOZW9uJ3MgU1FMIEVkaXRvcg==&category=Q29ubmVjdCB0byBOZW9u"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started With Neon Branching",
  "desc": "Branches are a really nice (and safe) way to configure or reconfigure your database without fear of screwing up the production database. Let’s take a closer look at how branching works with Neon, and the good news is, you probably already know how it works!",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/getting-started-with-neon-branching.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
