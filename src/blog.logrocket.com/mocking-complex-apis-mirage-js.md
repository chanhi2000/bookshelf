---
lang: en-US
title: "Mocking complex APIs with Mirage JS"
description: "Article(s) > Mocking complex APIs with Mirage JS"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Mocking complex APIs with Mirage JS"
    - property: og:description
      content: "Mocking complex APIs with Mirage JS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/mocking-complex-apis-mirage-js.html
prev: /programming/js-node/articles/README.md
date: 2025-04-04
isOriginal: false
author:
  - name: Emmanuel John
    url : https://blog.logrocket.com/author/emmanueljohn/
cover: /assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Mocking complex APIs with Mirage JS"
  desc="Mock complex APIs with JavaScript's Mirage JS library including JWT authentication, relational data, role-based access control, and more."
  url="https://blog.logrocket.com/mocking-complex-apis-mirage-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/banner.png"/>

::: info 

Mirage JS is an API mocking library that helps frontend developers simulate complex backend behavior without a real server. This article explores how to mock relational data models, JWT authentication, and role-based access control using Mirage’s ORM, serializers, factories, and route handlers. You’ll also learn how to seed user data and build realistic mock APIs to test features like user roles, permissions, and loading states.

:::

![Mocking Complex APIs With Mirage JS](/assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/banner.png)

API integration in frontend applications today goes beyond the simple GET, POST, and PUT requests. Most frontend applications integrate APIs for authentication, role-based permissions, pagination, and other advanced features with complex API relationships.

However, relying on a real backend to test these features can be slow and unreliable, especially in the early stages of development. While the mock responses for some of these features can be hard-coded, this doesn’t scale and often isn’t sufficient for testing features effectively.

Mirage JS is an API mocking library that helps simulate real-world backend complexity with its support for one-to-many and many-to-many relationships, mimicking real database operations. In this tutorial, we’ll use Mirage to explore mocking complex relationship APIs, mocking JWT authentication, and learn how to use Mirage factories to mock multiple server states, including:

- Simulating loading, success, empty, and error states
- Mocking different user roles and permissions
- Testing how your UI reacts to various API responses

::: note Prerequisites

Before following this tutorial, you should have:

- Knowledge of JavaScript
- Experience building web apps with frontend frameworks; we’ll use React for this project
- Node.js v21 installed
- An understanding of how backend APIs work is beneficial but not required

:::

---

## Setting up Mirage JS in a frontend project

Run the following commands to add Mirage to your project:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add --dev miragejs
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm install --save-dev miragejs
```

:::

Mirage lets you fake a backend server with API responses using route handlers, which are just JavaScript functions that return a response data or object. With `createServer()` and route handlers, you can create your mock API server.

Create a <FontIcon icon="fas fa-folder-open"/>`mirage/`<FontIcon icon="fa-brands fa-js"/>`books.js` file in your project’s <FontIcon icon="fas fa-folder-open"/>`src` folder and add the following:

```js title="mirage/books.js"
import { createServer } from "miragejs"

export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api"


      this.get("/books", () => {
        return {
          books: [
            { id: 1, title: "Think Big", author: "Ben Carson" },
            { id: 2, title: "Rich Dad", author: "Robert Kiyosaki" },
            { id: 3, title: "Things fall apart", author: "Chinua Achebe" },
          ],
        }
      })
    },
  })
}
```

Next, run the Mirage server in your project’s entry file as follows:

```js
...
import { makeServer } from './mirage/books.js'
makeServer();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Now, if your app makes a GET request to `api/books`, Mirage will respond with the `books` array.

---

## An overview of our demo application

When building modern web applications, working with relational data and handling complex API relationships is inevitable. To better understand Mirage’s mocking utilities and their use cases, we’ll get hands-on practice building a real-life application.

We’ll build a book app called BookVault — a platform for book reviews and discussions with authentication and role-based access control. To achieve this, we’ll create a fully functional mock API using Mirage JS, modeling key relationships like users, books, authors, categories, and reviews.

The mock API will handle authentication and user roles (`admin`, `editor`, and `user`), ensuring proper role-based access control. Admins can add books, authors, and categories, while users can submit reviews. The API will also provide endpoints for fetching books, categories, authors, and user profiles, simulating a real-world backend environment.

Here is what the complete BookVault application will look like:

![BookVault Demo Application](/assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/bookvault-demo-application.gif)

We’ll mainly focus on mocking the API endpoints with Mirage; you can follow the [complete source code here (<FontIcon icon="iconfont icon-github"/>`emmanuelhashy/mirage-demo`)](https://github.com/emmanuelhashy/mirage-demo).

---

## Mocking complex API relationships

Mocking API endpoints with complex relationships is always tricky. Fortunately, Mirage has a built-in ORM to mock relationships of any complexity.

Here is the diagram for the models and relationship of the BookVault app:

![API Entity Relationship Diagram](/assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/api-entity-relationship-diagram.png)

This models the relationships between users, books, authors, categories, and reviews. A `User` can write multiple `Review`s, while each `Review` belongs to a single `User` and a specific `Book`. A `Book` belongs to one `Author` and one `Category` but can have multiple `Review`s. Meanwhile, an `Author` can write multiple `Book`s, and a `Category` can contain multiple `Book`s.

You can declare this relationship in your models as follows:

```js title="mirage/books.js"
import { createServer, hasMany, belongsTo, Model } from "miragejs"

export function makeServer() {
  createServer({
    models: {
      user: Model.extend({
        reviews: hasMany(),
      }),
      book: Model.extend({
        author: belongsTo(),
        category: belongsTo(),
        reviews: hasMany(),
      }),
      author: Model.extend({
        books: hasMany(),
      }),
      category: Model.extend({
        books: hasMany(),
      }),
      review: Model.extend({
        user: belongsTo(),
        book: belongsTo(),
      }),
    },
  })
}
```

With this setup, Mirage knows about the relationship between these models.

---

## Serializing response data

Most complex API endpoints return nested relational data. Mirage provides a serializer layer that we’ll use to transform our response data to include related data from different models.

Import `RestSerializer` and configure serializers for the Book and Review models. The `book` serializer should embed its related models (`Author`, `Category`, and `Reviews`) whenever book data is returned. Similarly, the `review` serializer should embed the `User` model since reviews are linked to users:

```js
import { createServer, hasMany, belongsTo, RestSerializer } from "miragejs"

export function makeServer() {
  createServer({
    serializers: {
      book: RestSerializer.extend({
        include: ["author", "category", "reviews"],
        embed: true,
      }),
      review: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
    },
  })
}
```

Now, the GET request to `/api/books` will return each book’s `Author` embedded alongside it, like this:

```json title="GET /api/books"
{
  "books": [
    {
      "id": "1",
      "title": "Think Big",
      "author": { "name": "Ben Carson", "id": "1" }
    },
    {
      "id": "2",
      "title": "Things fall apart",
      "author": { "name": "Chinua Achebe", "id": "2" }
    }
  ]
}
```

---

## Seeding data into Mirage’s database

Mirage provides the `seeds` hook to seed its database with some initial data once the server is started.

Let’s pre-populate Mirage’s database with sample data for our models:

```js :collapsed-lines
import { createServer } from "miragejs"

export function makeServer() {
  createServer({
    seeds(server) {
      server.create("user", {
        username: "admin",
        email: "admin@gmail.com",
        password: "password",
        role: "admin",
      });
      server.create("user", {
        username: "editor",
        email: "editor@gmail.com",
        password: "password",
        role: "editor",
      });
      let user = server.create("user", {
        username: "reader",
        email: "reader@gmail.com",
        password: "password",
        role: "user",
      });

      let fiction = server.create("category", { name: "Fiction" });
      let author = server.create("author", { name: "J.K. Rowling" });
      let author1 = server.create("author", { name: "P.J. Jones" });

      let book1 = server.create("book", {
        title: "Harry Potter",
        author,
        category: fiction,
      });
      let book2 = server.create("book", {
        title: "Fantastic Beasts",
        author: author1,
        category: fiction,
      });

      server.create("review", { content: "Amazing book!", user, book: book1 });
      server.create("review", { content: "Nice read!", user, book: book2 });
    },
  })
}
```

The seed hook creates a user with the role of `user` and then adds a `fiction` category. Two authors, `J.K. Rowling` and `P.J. Jones`, are created, followed by two books, `Harry Potter` and `Fantastic Beasts`, each assigned to an author and categorized under `fiction`. Lastly, the hook creates reviews for both books, linking them to the previously created user.

---

## Improve Mirage’s database seeding with factories

Notice how we had to seed every single data for each model in the previous section. Imagine doing the same for hundreds of data points for each model — it would be pretty tedious!

Fortunately, Mirage also includes the `factory` hook to simplify Mirage’s database seeding with some relational data once the server is started.

We can create a factory for our `user` model like this:

```js
factories: {
  user: Factory.extend({...})
}
```

Here is a factory implementation for the seeding logic covered in the previous section:

```js :collapsed-lines
import { createServer, Factory, association } from "miragejs"

export function makeServer() {
  createServer({
    factories: {
      user: Factory.extend({
        username(i) {
          return ["admin", "editor", "reader"][i];
        },
        email(i) {
          return ["admin@gmail.com", "editor@gmail.com", "reader@gmail.com"][i];
        },
        password: "password",
        role(i) {
          return ["admin", "editor", "user"][i];
        },
      }),
      category: Factory.extend({
        name(i) {
          return `Fiction ${i}`;
        },
      }),
      author: Factory.extend({
        name(i) {
          return ["J.K. Rowling", "P.J. Jones"][i];
        },
      }),
      book: Factory.extend({
        title(i) {
          return ["Harry Potter", "Fantastic Beasts"][i];
        },
        author(i) {
          return association("author", i);
        },
        category() {
          return association("category");
        },
      }),
      review: Factory.extend({
        content(i) {
          return ["Amazing book!", "Nice read!"][i];
        },
        user() {
          return association("user", 2); 
        },
        book(i) {
          return association("book", i);
        },
      }),
    },
  })
}
```

Each factory defines how Mirage should dynamically generate randomized, structured data.

Mirage’s `association` function is used to link related models. The `i` parameter allows indexing for dynamic data. It is used to generate unique values.

Now, we can use the `createList` method to generate three users with a few lines of code:

```js
seeds(server) {
  server.createList("user", 3);
}
```

Here is a refactor of the seeding logic covered in the previous section using the factory:

```js :collapsed-lines
export function makeServer() {
  createServer({
    seeds(server) {
      const users = server.createList("user", 3);
      const fiction = server.create("category");
      const authors = server.createList("author", 2);
      const books = [
        server.create("book", {
          title: "Harry Potter",
          author: authors[0],
          category: fiction,
        }),
        server.create("book", {
          title: "Fantastic Beasts",
          author: authors[1],
          category: fiction,
        }),
      ];
      server.create("review", {
        content: "Amazing book!",
        user: users[2],
        book: books[0],
      });
      server.create("review", {
        content: "Nice read!",
        user: users[2],
        book: books[1],
      });
    },
  })
}
```

The above seed hook generates three users (`admin`, `editor`, `reader`), a single category (`Fiction`), and two authors (`J.K. Rowling` and `P.J. Jones`). It then creates two books (`Harry Potter` and `Fantastic Beasts`), linking them to their respective authors and category. Finally, it adds two reviews, both assigned to the `reader` user and linked to their respective books.

---

## Defining routes for the API endpoints

So far, we’ve architected the structure of our models and their relationships. At this point, if we run our frontend application, we’ll have the following error:

![Network Error In Our Frontend BookVault App](/assets/image/blog.logrocket.com/mocking-complex-apis-mirage-js/network-error-frontend-bookvault-app.png)

This is because we haven’t defined routes for the endpoints that the app is trying to access.

We can mock API endpoints using the `routes()` hook to define our route handlers. Update the server with the following:

```js
export function makeServer() {
  createServer({
    routes() {
      this.namespace = "api";
      // Fetch Books
      this.get("/books", (schema) => {
        return schema.books.all();
      });
    }
  })
}
```

The `this.get()` method lets us mock out GET requests. The first argument is the URL we’re handling (`/books`) and the second argument is a function that handles the data manipulation logic and responds to our app with some data. The `namespace` appends `/api` to all the endpoint URLs like `/api/books`.

### Fetching a single book

This route handles `GET /api/books/:id` requests by retrieving a book from Mirage’s database using the provided `id` (a dynamic segment in our URL):

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.get("/books/:id", (schema, request) => {
        let book = schema.books.find(request.params.id);
        return book ? book : new Response(404, {}, { error: "Book not found" });
      });
    }
  })
}
```

### Fetching a categories endpoint

This route handler defines a `GET /categories` API endpoint in Mirage. It retrieves and returns all category records stored in Mirage’s mock database:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.get("/categories", (schema) => {
        return schema.categories.all();
      });
    }
  })
}
```

### Fetching authors endpoint

This route handler defines a `GET /authors` API endpoint in Mirage. It retrieves and returns all author records stored in Mirage’s mock database when a request is made to this endpoint:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.get("/authors", (schema) => {
        return schema.authors.all();
      });
    }
  })
}
```

### Fetching books by author endpoint

This endpoint retrieves all books written by a specific author, based on the author’s ID:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.get("/authors/:id/books", (schema, request) => {
        let authorId = request.params.id;
        let author = schema.authors.find(authorId);
        return author.books;
      });
    }
  })
}
```

When a `GET` request is made to this route, the `id` parameter is extracted from the URL (`request.params.id`). The ID is used to find the corresponding author from Mirage’s database. Finally, it returns the list of books associated with that author.

---

## Mocking JWT authentication endpoints

Mocking JWT authentication endpoints is usually tricky because the `jsonwebtoken` package, a popular library for working with JWTs, only supports Node.js and doesn’t work on the browser. In this section, we’ll explore a simple trick to effectively mock JWT authentication endpoints.

### User login endpoint

This endpoint handles user authentication by checking the provided email and password against stored user data:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.post("/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody);
        let user = schema.users.findBy({ email });

        if (!user || user.password !== password) {
          return new Response(401, {}, { message: "Invalid credentials" });
        }

        let token = "valid-token";

        return {
          token,
          user: { id: user.id, email: user.email, role: user.role },
        };
      });
    }
  })
}
```

The endpoint first extracts the credentials from the request body and searches for a matching user in the database. If no user is found or the password is incorrect, it returns a `401 Unauthorized` response with an error message. If the credentials are valid, it generates a mock JWT (`"valid-token"`) and returns it with the user’s ID, email, and role.

### Fetching authorized user profiles

This route handler retrieves a user’s profile based on their ID while enforcing JWT authentication:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.get("/user-profile/:id", (schema, request) => {
        let id = request.params.id;
        let authHeader = request.requestHeaders.Authorization;

        if (!authHeader)
          return new Response(401, {}, { message: "No token provided" });
        try {
          let user = schema.users.find(id);
          return user ? user : new Response(404, { error: "User not found" });
        } catch (error) {
          return new Response(403, error, { message: "Invalid token" });
        }
      });
    }
  })
}
```

It first extracts the `id` from the request parameters and checks for an `Authorization` header. If no token is provided, it returns a `401 Unauthorized` response. Then, it attempts to find the user in Mirage’s database using `schema.users.find(id)`. If the user exists, it returns the user data. Otherwise, it returns a `404 Not Found` error. If any error occurs (such as an invalid token), it responds with a `403 Forbidden` status.

You can apply the same logic for protected API routes requiring authentication.

Here is how the `user-profile` endpoint is accessed:

```js
useEffect(() => {
  const token = localStorage.getItem("token")
  fetch(`/api/user-profile/${userId}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // Attach token here
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setProfile(data.user)
    })
    .catch((error) => {
      console.error(error);
    });
}, [userId]);
```

First, we retrieve the JWT token stored in `localStorage` after the user logs in and sends a `GET` request to `/api/user-profile/${userId}` with the token in the `Authorization` header.

---

## Mocking role-based access API endpoints

Mirage JS also makes it easy to mock role-based access API endpoints, allowing you to simulate different user roles and permissions.

### Submit a review (only users) endpoint

This route handles `POST /api/books/:id/review`, allowing only users with the `user` role to submit reviews for a specific book:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.post("/books/:id/review", (schema, request) => {
        let { user, content, userId } = JSON.parse(request.requestBody);
        if (user.role !== "user") {
          return new Response(
            403,
            {},
            { error: "Only users can review books" }
          );
        }
        let book = schema.books.find(request.params.id);
        return book
          ? schema.reviews.create({ content, userId, book })
          : new Response(404, {}, { error: "Book not found" });
      });
    }
  })
}
```

It checks if the user has the `user` role; otherwise, it returns a `403 Forbidden` error. If the book exists, it creates a new review linked to the book and user; otherwise, it returns a `404 Not Found` error.

### Add an author (only admins) endpoint

This route handles `POST /authors` requests, allowing only users with the `admin` role to add authors:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.post("/authors", (schema, request) => {
        console.log(request.requestBody);
        let author = JSON.parse(request.requestBody);
        if (author.user.role !== "admin") {
          return new Response(403, {}, { error: "Permission denied" });
        }
        return schema.authors.create(author);
      });
    }
  })
}
```

The endpoint checks if the `user.role` is `admin`. If the user is not, it returns a `403 Forbidden` response with an error message `Permission denied`. Otherwise, it creates a new author entry in the Mirage JS database.

### Add a category (only admins) endpoint

This route handles `POST /categories` requests allowing only users with the `admin` role to add new categories:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.post("/categories", (schema, request) => {
        let category = JSON.parse(request.requestBody);
        if (category.user.role !== "admin") {
          return new Response(403, {}, { error: "Permission denied" });
        }
        return schema.categories.create(category);
      });    
    }
  })
}
```

The endpoint checks if the `user.role` is `admin`. If the user is not, it returns a `403 Forbidden` response with an error message. Otherwise, it creates a new category entry in the Mirage database.

### Add a book (only admins) endpoint

This route handles a `POST /books` request, allowing users with the `admin` role to add a new book:

```js
export function makeServer() {
  createServer({
    routes() {
      ...
      this.post("/books", (schema, request) => {
        let book = JSON.parse(request.requestBody);
        if (book.user.role !== "admin") {
          return new Response(403, {}, { error: "Permission denied" });
        }
        return schema.books.create(book);
      });
    }
  })
}
```

The endpoint first parses the request body to extract the book data. If the user’s role is not `admin`, it returns a `403 Forbidden` response with an error message. Otherwise, it creates and stores the book in Mirage’s database.

Now, run the app and everything should be working as expected!

---

## Conclusion

In this tutorial, we explored mocking complex relationship APIs using Mirage JS, mocking JWT authentication, and how to use Mirage JS factories to mock multiple server states. We also covered mocking role-based access API endpoints that allow you to simulate different user roles and permissions.

With this tutorial, you can build MVPs of any complexity without a backend. The most exciting experience is that whenever your backend API is stable, all you have to do is remove the mock server from your app and replace the API URLs with that of your backend API.

If you encounter any issues while following this tutorial or need expert help with web/mobile development, don’t hesitate to reach out on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`emmanuel-john-a17526335`)](https://linkedin.com/in/emmanuel-john-a17526335). I’d love to connect and am always happy to assist!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mocking complex APIs with Mirage JS",
  "desc": "Mock complex APIs with JavaScript's Mirage JS library including JWT authentication, relational data, role-based access control, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/mocking-complex-apis-mirage-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
