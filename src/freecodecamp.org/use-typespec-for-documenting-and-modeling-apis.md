---
lang: en-US
title: "How to Use TypeSpec for Documenting and Modeling APIs"
description: "Article(s) > How to Use TypeSpec for Documenting and Modeling APIs"
icon: iconfont icon-typescript
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use TypeSpec for Documenting and Modeling APIs"
    - property: og:description
      content: "How to Use TypeSpec for Documenting and Modeling APIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/use-typespec-for-documenting-and-modeling-apis.html
prev: /programming/js-node/articles/README.md
date: 2025-04-12
isOriginal: false
author:
  - name: Adalbert Pungu
    url : https://freecodecamp.org/news/author/AdalbertPungu/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744399481891/de5db16a-2eea-46d8-820d-50c1e66d5019.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use TypeSpec for Documenting and Modeling APIs"
  desc="If you're curious and passionate about technology like I am, and you’re looking for clarity in your code, you've likely already experienced the limitations of conventional tools for documenting and modeling APIs. Tools such as Swagger, JSON Schema, o..."
  url="https://freecodecamp.org/news/use-typespec-for-documenting-and-modeling-apis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744399481891/de5db16a-2eea-46d8-820d-50c1e66d5019.png"/>

If you're curious and passionate about technology like I am, and you’re looking for clarity in your code, you've likely already experienced the limitations of conventional tools for documenting and modeling APIs.

Tools such as Swagger, JSON Schema, or OpenAPI are powerful, but they can be verbose, inflexible, or not conducive to reuse.

Well, I recently discovered TypeSpec. In this guide, I’ll show you how to take advantage of TypeSpec to create modern, maintainable, and well-documented REST APIs.

![Screenshot of the TypeSpec website. It features a dark background with "Design APIs" in large text and a description about designing data to generate schemas, specifications, code, and more. It includes "Install" and "Playground" buttons at the top.](https://cdn.hashnode.com/res/hashnode/image/upload/v1744242129685/403f9a32-8d06-47e2-b551-2ec1de1f6c0a.png)

::: note Prerequisites

Before we dive into using TypeSpec to document and model APIs, here are a few things you'll need to familiarize yourself with and/or have:

- **Node.js** (version 18 or higher)
- **npm** for dependency management
- **Visual Studio Code** (recommended to take advantage of the official TypeSpec extension). For an optimal experience, to create your project easily, it provides syntax highlighting, validation, autocompletion, navigation, and more.
- **TypeSpec Extension** in VS Code (You can install the extension via [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=typespec.typespec-vscode))
- An understanding of how to use and create APIs

:::

---

## What is TypeSpec?

TypeSpec is an open-source declarative language, developed by Microsoft, designed to describe APIs in an explicit, reusable, scalable, and standards-based way. It’s designed to model REST, gRPC, GraphQL, and other types of APIs, and offers a modern syntax close to TypeScript.

It can automatically generate:

- OpenAPI, JSON Schema, or Protobuf specifications
- server and client code
- API documentation
- and other interface-related artifacts

TypeSpec isn't just a language – it's an API design platform that favors abstraction, encourages code reuse, and integrates with modern tools like Visual Studio Code via a dedicated extension. You can install the extension via the VS Code [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=typespec.typespec-vscode).

---

## Why use TypeSpec?

Before diving into the code, let's take a minute to understand the TypeSpec philosophy. Microsoft uses TypeSpec internally to deliver high-quality API services to millions of customers, across tens of thousands of endpoints, while ensuring code quality, governance, and scalability.

![Screenshot with the text on a dark background reads: "Why TypeSpec - API-First for developers. With TypeSpec, remove the handwritten files that slow you down, and generate standards-compliant API schemas in seconds."](https://cdn.hashnode.com/res/hashnode/image/upload/v1744242196525/a1947dfb-e46d-4083-95c5-218615ab75e6.png)

Unlike generators such as Swagger, Codegen, or Postman, which start from an OpenAPI file to generate code, TypeSpec does the opposite: you first write your API design in a DSL (Domain Specific Language), then generate everything you need.

TypeSpec has been designed to meet the major challenges of large-scale API design and governance:

- **Simplification**: clear, concise syntax to focus on business logic.
- **Reusability**: encapsulates types, request/response models, and directives in modular components.
- **Productivity**: automatically generates the necessary resources from a single source definition.
- **Consistency**: maintains compliance with internal standards thanks to shared libraries.
- **Interoperability**: integrates with the OpenAPI ecosystem and supports multi-format generation.
- **Scalability**: designed to handle thousands of endpoints like those used by Microsoft Azure.

Let's take a look at how to install and configure the development environment

---

## How to Install and Configure TypeSpec

Before you can start writing your first API with TypeSpec, you need to set up your development environment. Here's how to install TypeSpec on your machine.

::: info Requirements:

- **Node.js** (version 18 or higher)
- **npm** for dependency management
- **Visual Studio Code** (recommended to take advantage of the official TypeSpec extension). For an optimal experience, it provides syntax highlighting, validation, autocompletion, navigation, and more.

:::

TypeSpec CLI global installation:

```sh
npm i -g @typespec/compiler
```

### How to Create a TypeSpec Project

The easiest way to create a project is to use Visual Studio Code via the TypeSpec extension you've installed (if you're not comfortable with the command line (CMD)).

Create a folder containing the project and open it with Visual Studio Code. Then click on the `View` tab, and next on `Comment Palette` .

In the search bar that appears, enter `TypeSpec: Create TypeSpec Project`.

Follow the quick selections to select the root folder of the project you've just created. Then choose the Template – for our case this will be `Generic REST API` – and enter the project name. Leave the emitter `OpenAPI 3.1 document` (3.1 is the current version at the time of writing) selected by default. This will put us `@typespec/http@typespec/openapi3`. Finally, wait for the project configuration to finish.

You should have a basic TypeSpec project configuration with a structure that looks like this:

![A screenshot of a file explorer showing a folder named "node_modules" and files: .gitignore, main.tsp, package-lock.json, package.json, and tspconfig.yaml.](https://cdn.hashnode.com/res/hashnode/image/upload/v1744242632713/69485276-b885-450c-870a-56af5e6d8122.png)

- **node_modules/**: Directory where npm installs project dependencies.
- **main.tsp**: the entry point for your TypeSpec build. This file generally contains the main definitions of your models, services, and operations.
- **package.json**: Contains project metadata, including dependencies, scripts, and other project-related information.
- **tspconfig.yaml**: TypeSpec compiler configuration file, specifying options and parameters for the generation process.

You can also run `tsp compile .` to compile the project, but it's better to run `tsp compile . --watch` to automatically compile changes during development each time you save.

![A command-line interface showing the successful compilation of a project using TypeSpec compiler v1.0.0-rc.0, with output to "tsp-output/schema/".](https://cdn.hashnode.com/res/hashnode/image/upload/v1744242865089/dea4c75e-80e3-454d-a1ab-af4186423271.png)

Once the project has been compiled, you'll see the `tsp-output` and `schema` folders generated and a file added `openai.yaml`.

![File directory structure with folders "node_modules" and "tsp-output", containing files like "openapi.yaml", ".gitignore", "main.tsp", "package-lock.json", "package.json", and "tsconfig.yaml".](https://cdn.hashnode.com/res/hashnode/image/upload/v1744242771607/ad948a7c-ea56-44df-861d-7fa04cad1a6d.png)

- **tsp-output/**: Directory where the TypeSpec compiler generates files.
- **openapi.yaml**: OpenAPI specification file generated for your API, detailing API endpoints, templates, and operations. Output may vary depending on the target format specified in the <FontIcon icon="iconfont icon-yaml"/>`tspconfig.yaml` file.

```yaml title="tspconfig.yaml"
emit:
  - "@typespec/openapi3"
options:
  "@typespec/openapi3":
    emitter-output-dir: "{output-dir}/schema"
    openapi-versions:
      - 3.1.0
```

Thanks to this configuration of the <FontIcon icon="iconfont icon-yaml"/>`tspconfig.yaml` file, one of TypeSpec's major assets is its ability to automatically generate OpenAPI specifications from clear, typed, and modular source code. This means you can write your API as you would in TypeScript (or a well-structured DSL), and get output in `.yaml` files compatible with the whole OpenAPI ecosystem: Swagger UI, Postman, Redoc, and so on.

In the next section, we'll look at the basic syntax of TypeSpec.

---

## TypeSpec Basic Syntax

Now that you've got a clear idea of what TypeSpec is and what its benefits are in the world of API design, it's time to get to the heart of the matter: the basic syntax.

TypeSpec is a declarative language, inspired by TypeScript, that lets you model the resources, routes, data structures, and behaviors of an API in an explicit, readable, and modular way. Its syntax is based on simple keywords and clear file organization, making it easy to learn yet powerful.

### Language Basics

Here's a very simple example of defining a model with TypeSpec:

```ts
model Book {
  id: string;
  title: string;
  author: string;
}
```

This block defines a `Book` resource with three typed fields. The `model` keyword is used to describe the JSON objects manipulated by the API. It is equivalent to schemas in JSON Schema or type definitions in OpenAPI.

#### Defining an HTTP operation

TypeSpec lets you bind operations to models using the `@route` keyword. Here's a minimal example of an endpoint:

```ts
@route("/books")
op listBooks(): Book[];
```

This syntax declares a REST operation that returns a list of books. `@route` indicates the URL path, `op` introduces an operation, and `Book[]` is the return type.

You can also define path, query, or body parameters very easily.

```ts
@route("/books/{id}")
op getBook(@path id: string): Book;
```

In this example, we declare that `id` is a URL parameter (path parameter).

### Fundamental Concepts

#### `model` Defining data structures

A `model` represents an API entity, like a JSON object. Models are the basis of your information exchanges.

```ts
model User {
  id: string;
  email: string;
  age?: int32;
}
```

#### `interface` Group operations

An `interface` groups together a set of logically linked operations. This is useful for structuring large API sets.

```ts
interface BookOperations {
  @get op listBooks(): Book[];
  @get op getBook(@path id: string): Book;
}
```

#### `service` Entry point of the API

A `service` defines publicly exposed interfaces, their version, and the basic path.

```ts
@service({ title: "Book API", version: "1.0.0" })
namespace BookApi {
  interface BookOperations;
}
```

### Import and Organize Your Code with Namespaces

TypeSpec provides clear organization through namespaces, similar to modules or packages.

```ts
namespace CommonModels {
  model Error {
    message: string;
  }
}
```

Then you can import them into another file like this:

```ts
import CommonModels from "./common.tsp";
```

### Complete Example of a REST Service

Let's take a complete example of a REST service in TypeSpec.

```ts :collapsed-lines
@service({ title: "Book Service", version: "1.0.0" })
@route("/books")
namespace BookService {

  model Book {
    id: string;
    title: string;
    author: string;
    publishedYear?: int32;
  }

  @get()
  op listBooks(): Book[];

  @post()
  op createBook(@body book: Book): Book;

  @get("/{id}")
  op getBook(@path id: string): Book;

  @put("/{id}")
  op updateBook(@path id: string, @body book: Book): Book;

  @delete("/{id}")
  op deleteBook(@path id: string): void;
}
```

#### Here’s what’s going on:

- `@service({ title, version })`: Defines service metadata (name, version), useful for generated documentation (for example, Swagger UI).
- `@route("/books")`: Defines the basic path for all operations of this API.
- `namespace BookService { ... }`: Encapsulates all models and operations linked to this service under a single logical name.

#### Next come the operations:

- `@get() op listBooks()`: Endpoint `GET /books` qui retourne un tableau de livres.
- `@post() op createBook()`: Endpoint `POST /books` which accepts a `Book` object in the request body (`@body`) and returns the created book.
- `@get("/{id}")`: Endpoint `GET /books/{id}` which retrieves a book via its identifier (`@path`).
- `@put("/{id}")`: Endpoint `PUT /books/{id}` which updates a book's data.
- `@delete("/{id}")`: Deletes a book via its `id`. The `void` type means that no data is returned.

With just a few lines, you get a complete, well-organized, easily readable REST service, ready to be automatically converted into OpenAPI documentation, a client SDK, or backend code.

### Add Validation Annotations

TypeSpec makes it easy to add validation annotations to your models using:

```ts
model Book {
  id: string;
  title: string @minLength(3);
  author: string @minLength(3);
  publishedYear?: int32 @minValue(1800);
}
```

This adds validation rules directly to the schema, which will be taken into account during OpenAPI generation.

### Comparison with Other Tools (OpenAPI / Swagger)

So you might wonder – why should you use TypeSpec rather than writing directly in OpenAPI?

Let's take the example of OpenAPI 3 (YAML):

```yaml :collapsed-lines title="openapi.yaml"
paths:
  /books:
    get:
      summary: Get list of books
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Create a new book
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        '201':
          description: Created
  /books/{id}:
    get:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: OK
    put:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
    delete:
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        author:
          type: string
        publishedYear:
          type: integer
```

As you can see, the OpenAPI definition is much more verbose. Relationships between paths, methods, schemas, and parameters are scattered, which complicates reading and maintenance. Also, it's less typed, given that OpenAPI remains YAML (or JSON), without the typing security or modularity of a real language.

#### Why TypeSpec is useful here

With TypeSpec, everything is centralized in a declarative, modular, typed, and intuitive format.

- **Greater legibility**: less noise, more intent.
- **Reusability**: you can create modular components and share them between projects.
- **Productivity**: you write less code and generate more (OpenAPI, client, server, doc).
- **Consistency**: errors are detected early thanks to strong typing.

| Criteria | OpenAPI / Swagger | TypeSpec |
| --- | --- | --- |
|  |  |  |
| **Syntax** | Verbose (YAML/JSON) | Declarative, typed, concise |
| **Organization** | Fragmented | Modular (namespace, import) |
| **Modular** | Limited | High (models, services) |
| **Built-in validation** | Separate or manual | Decorators (@minLength, and so on) |
| **Automatic generation** | Manual | Integrated (OpenAPI, SDK, and so on) |

Note: TypeSpec doesn't replace OpenAPI, but complements it: you write to TypeSpec, then automatically generate OpenAPI files, SDKs, specs and so on. It gives you a source language for accurately describing your API.

In the next section, we'll look at how to create a REST API template.

---

## How to Create a REST API Model

To deepen our understanding of REST API creation with TypeSpec, let's continue with the example of managing books. In this example, we'll create a `Book` model, define a service to manage the books, and add validations to ensure that the data respects the right constraints.

### Define a Data Model for `Book`

First, we'll define a data model for the Book resource. A book can have the following properties:

- `id`: A unique identifier for the book.
- `title`: The title of the book.
- `author`: The author of the book.
- `publicationYear`: The book's year of publication.
- `isbn`: The book's ISBN number.

#### `Book` model in TypeSpec

```ts
model Book {
  id: integer;
  @minLength(1)
  title: string;
  @minLength(1)
  author: string;
  publicationYear: integer;
  @pattern("^\\d{3}-\\d{1,5}-\\d{1,7}-\\d{1,7}-\\d{1}$")
  isbn: string;
}
```

- `id`: Unique book identifier (`integer` type).
- `title` and `author`: Character strings representing the book's title and author, validated by `@minLength(1)` to ensure they are not empty.
- `publicationYear`: The book's year of publication (`integer` type).
- `isbn`: The book's ISBN number, validated with a regular expression that matches the standard format of an ISBN.

### Define a REST Service to Manage Books

Now that we have a `Book` model, we'll create a service to manage CRUD operations on this resource. This service will contain methods for retrieving a book by its identifier, creating a new book, updating an existing book, and deleting a book.

#### `BooksService` service in TypeSpec

```ts
service BooksService {

  @get("/books/{id}")
  getBook(id: integer): Book;

  @post("/books")
  createBook(book: Book): Book;

  @put("/books/{id}")
  updateBook(id: integer, book: Book): Book;

  @delete("/books/{id}")
  deleteBook(id: integer): void;
}
```

The `BooksService` contains four methods for performing actions on books:

- `@get("/books/{id}")`: Method for retrieving a book by its `id`.
- `@post("/books")`: Method for creating a new book.
- `@put("/books/{id}")`: Method for updating an existing book by its `id`.
- `@delete("/books/{id}")`: Method for deleting a book based on its `id`.

These methods use HTTP annotations to indicate the type of operation they perform (GET, POST, PUT, DELETE).

### Add Additional Validations for the `Book` Model

As in the previous example for users, we can add additional validations on **Book** template properties.

#### Example of validation on `publicationYear` and `isbn`

```ts
model Book {
  id: integer;
  @minLength(1)
  title: string;
  @minLength(1)
  author: string;
  @minValue(1000)
  publicationYear: integer;
  @pattern("^\\d{3}-\\d{1,5}-\\d{1,7}-\\d{1,7}-\\d{1}$")
  isbn: string;
}
```

- `@minValue(1000)` guarantees that the year of publication is greater than or equal to 1000.
- Validation of the `isbn` remains the same, using a regular expression to validate a standard ISBN format.

### A Complete Service for Managing Books

Now that we have the `Book` model and the necessary validations, here's a complete service for managing books, with all the essential operations.

#### Complete `BooksService` in TypeSpec

```ts :collapsed-lines
model Book {
  id: integer;
  @minLength(1)
  title: string;
  @minLength(1)
  author: string;
  @minValue(1000)
  publicationYear: integer;
  @pattern("^\\d{3}-\\d{1,5}-\\d{1,7}-\\d{1,7}-\\d{1}$")
  isbn: string;
}

service BooksService {
  @get("/books/{id}")
  getBook(id: integer): Book;

  @post("/books")
  createBook(book: Book): Book;

  @put("/books/{id}")
  updateBook(id: integer, book: Book): Book;

  @delete("/books/{id}")
  deleteBook(id: integer): void;
}
```

- The `Book` model defines properties and validations for a book.
- The `BooksService` provides endpoints for retrieving, creating, updating, and deleting a book.
- Each service method is correctly annotated with the corresponding HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).

And here’s a summary of everything we’ve done:

- We created a `Book` model with properties such as title, author, year of publication, and ISBN number.
- We defined a `BooksService` to provide CRUD operations on books.
- We added validations to ensure that the data respected specified constraints (for example, ISBN and year of publication).
- We designed a complete REST API to manage books with TypeSpec, using a minimum amount of code and staying true to standards.

This example shows just how quickly and efficiently TypeSpec can be used to model a REST API, while ensuring a clear structure and robust validations.

---

## How to Build the API in Express and ASP.NET Core

Now that we've defined a book management REST service with TypeSpec, let's see how we'd implement this same API using two popular frameworks:

- **ExpressJS (Node.js / TypeScript)**
- **ASP.NET Core (C#)**

This will allow us to better compare TypeSpec's conciseness and readability with traditional implementations.

#### Manual implementation with ExpressJS (Node.js / TypeScript):

```ts :collapesd-lines title="server.ts"
import express from 'express';

const app = express();
app.use(express.json());

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  isbn: string;
}

const books: Book[] = [];

// GET /books/:id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).send({ message: 'Book not found' });
  res.send(book);
});

// POST /books
app.post('/books', (req, res) => {
  const newBook: Book = req.body;
  books.push(newBook);
  res.status(201).send(newBook);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).send({ message: 'Book not found' });

  books[index] = req.body;
  res.send(books[index]);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).send({ message: 'Book not found' });

  books.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

::: info Observations

- A lot of repetitive logic.
- No automatic validation.
- Routes must be maintained manually.
- No automatically generated API documentation.

:::

#### Manual implementation with ASP.NET Core (C#):

```cs title="Book.cs"
public class Book
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Author { get; set; } = string.Empty;

    [Range(1000, int.MaxValue)]
    public int PublicationYear { get; set; }

    [RegularExpression(@"^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$")]
    public string Isbn { get; set; } = string.Empty;
}
```

```cs :collapsed-lines title="BooksController.cs"
[ApiController]
[Route("books")]
public class BooksController : ControllerBase
{
    private static readonly List<Book> books = new();

    [HttpGet("{id}")]
    public IActionResult GetBook(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null) return NotFound("Book not found");
        return Ok(book);
    }

    [HttpPost]
    public IActionResult CreateBook([FromBody] Book book)
    {
        books.Add(book);
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var index = books.FindIndex(b => b.Id == id);
        if (index == -1) return NotFound("Book not found");

        books[index] = updatedBook;
        return Ok(updatedBook);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = books.FirstOrDefault(b => b.Id == id);
        if (book == null) return NotFound("Book not found");

        books.Remove(book);
        return NoContent();
    }
}
```

::: info Observations:

- More formal and structured than Express, thanks to C# annotations (`[HttpPost]`, `[Required]`, and so on).
- Validation is handled automatically via Data Annotations.
- Once again, no automatic OpenAPI generation or SDK client without additional configuration.

:::

#### Comparison with TypeSpec:

| **Aspect** | TypeSpec | ExpressJS | ASP.NET Core |
| --- | --- | --- | --- |
|  |  |  |  |
| **Syntax** | Declarative | Imperative | Structured |
| **Validation** | Automatic | Manual | Data Annotations |
| **Documentation** | Automatic | Manual | Generated(Swashbuckle) |
| **Reusability** | High | Low | Medium |
| **Generation** | OpenAPI/SDK | Non-native | Possible |

---

## Best Practices for Structuring TypeSpec Projects and Components

When you start writing API definitions in TypeSpec, it's easy to put everything in a single file. But as with any software project, as the application grows, a good structure becomes essential to guarantee the readability, reusability and maintainability of the code.

Here's a set of best practices I strongly recommend:

### Organize by Functional Area

Use namespaces to group models, interfaces, and operations by business domain: **book**, **user**, **auth**, **payment**, and so on.

```ts
namespace MyApi.Books;
```

Create a <FontIcon icon="fas fa-folder-open"/>`/books` folder with the following files:

```yaml
src/
├── books/
│   ├── models.tsp
│   ├── routes.tsp
│   └── service.tsp
```

This ensures a clear separation of responsibilities, just like in a well-structured Node.js project.

### A Single `main.tsp` Entry Point

This is the main file that orchestrates:

```tsp title="main.tsp"
import "./books/service.tsp";
import "./users/service.tsp";
import "./auth/service.tsp";
```

This allows you to compile the entire project from a single point.

### Create Reusable Components

Define common models and types in a shared file. Example:

```ts
// common/models.tsp
model ErrorResponse {
  code: string;
  message: string;
}

@defaultResponse
op Error(): ErrorResponse;
```

Then import them into your other files:

```ts
import "../common/models.tsp";
```

This is handy for centralizing errors, standard answers, pagination types, and so on.

### Use Decorators to Enrich Your Components

Decorators such as `@doc`, `@minLength`, `@server`, `@route` or `@tag` can be used to generate valid, documented APIs without any extra effort:

```ts
@route("/books")
@doc("Get all books")
op listBooks(): Book[];
```

A well-annotated API is one that is ready for automatic generation of documentation or clients.

### Define Servers in the Right Place

Add your @server directive to a `service.tsp` or global `api.tsp` file:

```ts
@server("Production", "https://api.mysite.com")
@server("Staging", "https://staging.mysite.com")
```

This allows you to target different environments without duplicating definitions.

### Validate Regularly

Integrate `tsp compile` into your CI/CD to ensure that your definitions are always valid. Example with an npm script:

```sh
npm run tsp compile src/main.tsp --emit=./dist
```

This avoids last-minute errors and guarantees the consistency of your API over time.

::: tip Example of a recommended complete structure:

```plaintext title="file structure"
project-root/
├── src/
│   ├── books/
│   │   ├── models.tsp
│   │   ├── routes.tsp
│   │   └── service.tsp
│   ├── users/
│   │   ├── models.tsp
│   │   └── service.tsp
│   ├── common/
│   │   └── models.tsp
│   └── main.tsp
├── tspconfig.yaml
├── package.json
└── README.md
```

:::

In summary:

| Good practice | Why it's important |
| --- | --- |
|  |  |
| Use `namespaces` | Clear organization, readability |
| Dividing files by domain | Reusability, modularity |
| Centralize shared components | DRY (Don't Repeat Yourself) |
| Use decorators | Enrich documentation and validation |
| Integrate with CI/CD | Continuous quality, no surprises |
| Have a clear input file (`main.tsp`) | Simple, centralized compilation |

---

## Conclusion

TypeSpec represents a real evolution in the way we design, document and maintain APIs. By adopting a declarative, modular, and typed approach, it simplifies the definition of APIs while enhancing their quality, readability, and consistency on a large scale.

Whether you're a front-end developer consuming APIs, a software architect looking to standardize your team's practices, or a technical documentation enthusiast, TypeSpec offers you a robust, modern, and extensible solution.

The TypeSpec ecosystem is still young but very promising, supported by Microsoft and used internally on a large scale. So now's the time to start exploring and adopting it for your projects.

::: info Ressources

```component VPCard
{
  "title": "typespec.io",
  "desc": "Design your data up front and generate schemas, API specifications, client / server code, docs, and more.",
  "link": "https://typespec.io/",
  "logo": "https://typespec.io//img/favicon.svg",
  "background": "rgba(43,93,158,0.2)"
}
```

<SiteInfo
  name="microsoft/typespec"
  desc="typespec.io"
  url="https://github.com/microsoft/typespec/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e62ea016167583ecfb6fa911aec1841382ddbac0036650d6ac2a2cdc0af2efcc/microsoft/typespec"/>

```component VPCard
{
  "title": "typespec.io",
  "desc": "Playground TypeSpec (essayer dans le navigateur)",
  "link": "https://typespec.io/playground/",
  "logo": "https://typespec.io//img/favicon.svg",
  "background": "rgba(43,93,158,0.2)"
}
```

<SiteInfo
  name="Overview of TypeSpec - What is TypeSpec? - TypeSpec"
  desc="Discover how TypeSpec enhances API design with reusable elements, seamless toolchain integration, and a great developer experience."
  url="https://learn.microsoft.com/en-us/azure/developer/typespec/overview/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="https://learn.microsoft.com/en-us/media/open-graph-image.png"/>

```component VPCard
{
  "title": "OpenAPI Specification - Version 3.1.0 | Swagger",
  "desc": "The OpenAPI Specification defines a standard interface to RESTful APIs which allows both humans and computers to understand service capabilities without access to source code, documentation, or network traffic inspection.",
  "link": "https://swagger.io/specification/",
  "logo": "https://static1.smartbear.co/swagger/media/assets/swagger_fav.png",
  "background": "rgba(157,232,83,0.2)"
}
```

<VidStack src="youtube/yfCYrKaojDo" />

:::

Thanks for reading. You can find me on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`AdalbertPungu`)](https://linkedin.com/in/AdalbertPungu/), and follow me on all socials @AdalbertPungu.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use TypeSpec for Documenting and Modeling APIs",
  "desc": "If you're curious and passionate about technology like I am, and you’re looking for clarity in your code, you've likely already experienced the limitations of conventional tools for documenting and modeling APIs. Tools such as Swagger, JSON Schema, o...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/use-typespec-for-documenting-and-modeling-apis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
