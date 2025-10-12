---
lang: en-US
title: "How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers"
description: "Article(s) > How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers"
    - property: og:description
      content: "How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/get-started-with-aspnet-core-and-grpc-handbook/
prev: /programming/cs/articles/README.md
date: 2025-08-13
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url : https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755043329753/f5ff4a61-79b7-44f0-9871-9dfef9f8d08a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers"
  desc="In today's distributed computing landscape, efficient service-to-service communication is crucial for building scalable, high-performance applications. gRPC (Google Remote Procedure Call) has emerged as one of the most powerful frameworks for creatin..."
  url="https://freecodecamp.org/news/get-started-with-aspnet-core-and-grpc-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755043329753/f5ff4a61-79b7-44f0-9871-9dfef9f8d08a.png"/>

In today's distributed computing landscape, efficient service-to-service communication is crucial for building scalable, high-performance applications. gRPC (Google Remote Procedure Call) has emerged as one of the most powerful frameworks for creating robust, type-safe APIs that can handle thousands of requests per second with minimal latency.

gRPC is a modern, open-source RPC framework that leverages HTTP/2, Protocol Buffers, and advanced streaming capabilities to deliver exceptional performance. Unlike traditional REST APIs, gRPC offers strongly-typed contracts, automatic code generation, and built-in support for multiple programming languages. This makes it an ideal choice for microservices architectures and cross-platform development.

In this handbook, I’ll take you on a journey from absolute beginner to building production-ready gRPC services with ASP.NET Core. Whether you're migrating from REST APIs or starting fresh with gRPC, this guide will provide you with practical, hands-on experience and real-world examples.

::: info What you'll learn:

- How to set up your first gRPC service in .NET
- How to define service contracts with Protocol Buffers
- How to implement unary, server streaming, and client streaming operations
- How to build CRUD (Create, Read, Update, Delete) operations

:::

Let's dive in and discover how gRPC can revolutionize your API development experience!

You can find all the code in this [GitHub Repository (<VPIcon icon="iconfont icon-github"/>`Clifftech123/IsaiahCliffordOpokuBlog`)](https://github.com/Clifftech123/IsaiahCliffordOpokuBlog).

::: note Perquisites

Before we start, make sure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Postman](https://postman.com/downloads/)

:::

1. [gRPC Overview and How It Works with .NET](#heading-grpc-overview-and-how-it-works-with-net)
2. [How to Set Up gRPC with .NET](#heading-how-to-set-up-grpc-with-net)
3. [How to Create the Product Model](#heading-how-to-create-the-product-model)
4. [How to Set Up the SQLite Database](#heading-how-to-set-up-the-sqlite-database)
5. [How to Create Product Protocol Buffers](#heading-how-to-create-product-protocol-buffers)
6. [How to Implement CRUD Operations Services with gRPC](#heading-how-to-implement-crud-operations-services-with-grpc)
7. [How to Implement gRPC CRUD Database Operations With SQLite](#heading-how-to-implement-grpc-crud-database-operations-with-sqlite)
8. [How to Test gRPC Services with Postman](#heading-how-to-test-grpc-services-with-postman)
9. [How to Test Product Creation](#heading-how-to-test-product-creation)
10. [How to Test All Product Operations](#heading-how-to-test-all-product-operations)

---

## gRPC Overview and How It Works with .NET

gRPC is a high-performance, cross-platform framework that works seamlessly with many technologies, including .NET Core.

### Why choose gRPC with .NET?

There are many reasons why this is a good combination. First, of all, this combo is up to 8x faster than using REST APIs with JSON. Its strongly-typed contracts also help prevent runtime errors.

It also has built-in support for client, server, and bidirectional streaming, as well as seamless integration across different languages and platforms. Finally, it leverages HTTP/2 for multiplexing and header compression - so as you can see, these two tools are a super effective pair.

To understand in more detail why gRPC is so valuable, let's explore a common real-world scenario.

### The Challenge: Microservices Communication

Imagine you're building a large e-commerce application. For better maintainability and scalability, you decide to split your monolithic application into smaller, focused services:

- **Product Service** - Handles product catalog, inventory, and product management
- **Authentication Service** - Manages user authentication, authorization, and user profiles

These services need to communicate with each other frequently. For example, before a user can add a product to their cart, the Product Service must verify with the Authentication Service that the user is logged in and has the proper permissions.

### Traditional Approach: HTTP REST APIs

Traditionally, in .NET applications, we solve this inter-service communication using `HttpClient` to make REST API calls between services. While this works, it comes with several challenges:

- Network failures: API calls can fail unexpectedly, even when everything appears correct
- Performance bottlenecks: JSON serialization/deserialization adds overhead
- Slow response times: HTTP/1.1 limitations affect performance under high load
- Type safety: No compile-time contract validation between services
- Verbose payloads: JSON can be bulky compared to binary formats

### The gRPC Solution

This is where gRPC shines. It addresses these challenges by providing some really helpful features in addition to the ones we’ve already discussed above like protocol buffers, code generation for client and server, and more.

### When to Use gRPC in .NET

gRPC is particularly beneficial in certain scenarios, but it’s not a great choice in others. Here are some example use cases, as well as some to avoid:

### ✅ Perfect for

- **Microservices architecture**: High-frequency service-to-service communication
- **Real-time applications**: Chat applications, live updates, gaming
- **High-performance APIs**: When speed and efficiency are critical
- **Polyglot environments**: Services written in different programming languages
- **Internal APIs**: Backend services that don't need browser compatibility

### ❌ Consider Alternatives When

- **Browser-based applications**: Limited browser support (use gRPC-Web instead)
- **Public APIs**: REST might be more familiar to external developers
- **Simple CRUD operations**: Where REST's simplicity is sufficient
- **Legacy system integration**: When existing systems only support HTTP/1.1

### gRPC vs REST: A Quick Comparison

Here’s a quick side-by-side comparison of their main features:

| Feature | gRPC | REST |
| --- | --- | --- |
| Protocol | HTTP/2 | HTTP/1.1 |
| Data Format | Protocol Buffers (Binary) | JSON (Text) |
| Performance | High | Moderate |
| Browser Support | Limited (needs gRPC-Web) | Full |
| Streaming | Built-in | Limited |
| Code Generation | Automatic | Manual |

In this handbook, we'll build a complete Product Management system using gRPC with .NET, demonstrating how to implement efficient service-to-service communication with full CRUD operations.

---

## How to Set Up gRPC with .NET

In this tutorial, we'll use Visual Studio Code to build our complete gRPC application. Let's start by creating a new gRPC project using the .NET CLI.

### Creating Your First gRPC Project

Start by opening your terminal (you can use VS Code's integrated terminal or your system terminal) and navigate to your desired directory where you want to create the project.

Run the following command to create a new gRPC project:

```sh
dotnet new grpc -o ProductGrpc
```

::: info What this command does:

- `dotnet new grpc` creates a new project using the gRPC template
- `-o ProductGrpc` specifies the output directory name for our project

:::

Next, navigate into the project directory:

```sh
cd ProductGrpc
```

Then open the project in Visual Studio Code:

```sh
code .
```

### Understanding the Project Structure

After running the command, you should see output similar to the following in your terminal, confirming that the project was created successfully:

![Vs Code Initial Project Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1753873861602/6d135358-2065-40eb-9fe9-9a58bd8dc2eb.png)

Let's explore what the .NET gRPC template has generated for us:

```plaintext title="file structure"
ProductGrpc/
├── Protos/
│   └── greet.proto          # Protocol Buffer definition file
├── Services/
│   └── GreeterService.cs    # Sample gRPC service implementation
├── Program.cs               # Application entry point
├── ProductGrpc.csproj       # Project file
└── appsettings.json         # Configuration file
```

::: info Key files:

- `Protos/greet.proto`: Defines the service contract using Protocol Buffers
- `Services/GreeterService.cs`: Contains the actual service implementation
- <VPIcon icon="iconfont icon-csharp"/>`Program.cs`: Configures and starts the gRPC server title="settings"
:::

### Verifying the Setup

Let's make sure everything is working correctly by running the default application:

```sh
dotnet run
```

You should see output indicating that the gRPC server is running:

```plaintext title="output"
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7042
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

**🎉 Congratulations!** You've successfully created your first gRPC application using the .NET CLI. The server is now running and ready to accept gRPC requests.

Let's move on to the next section, where we'll start building our Product Management system.

---

## How to Create the Product Model

Now that we have our gRPC project set up, let's create our Product model. In .NET applications, models represent the data structure and business entities that our application will work with. Think of models as blueprints that define what properties our data objects should have.

### Understanding Models in gRPC Applications

Models serve several important purposes:

- **Data structure**: They define the shape and properties of our business entities.
- **Type safety**: They ensure compile-time validation of our data.
- **Business logic**: They represent real-world objects in our application.
- **Database mapping**: They serve as entities for database operations.

### Creating the Models Folder

Let’s organize our code by creating a dedicated folder for our models called `Models` in your project root directory.

Inside the Models folder, create a new file called <VPIcon icon="iconfont icon-csharp"/>`Product.cs`.

Your project structure should now look like this:

```plaintext title="output"
ProductGrpc/
├── Models/
│   └── Product.cs           # Our new Product model
├── Protos/
├── Services/
└── ...
```

### Implementing the Product Model

Add the following code to your <VPIcon icon="iconfont icon-csharp"/>`Product.cs` file:

```cs title="Models/Product.cs"
using System.ComponentModel.DataAnnotations;

namespace ProductGrpc.Models
{
    public class Product
    {

        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime Updated { get; set; } = DateTime.UtcNow;
        public string? Tags { get; set; }
    }
}
```

Modern C# features:

- `required` keyword: Ensures properties must be initialized when creating an object
- `string?`: Nullable reference type for optional properties
- Default values: `Created` and `Updated` automatically set to the current UTC

### Why Use Guid for ID?

We're using `Guid` instead of `int` for our primary key for a few reasons:

- **Uniqueness**: Guaranteed to be unique across different systems
- **Security**: Harder to guess than sequential integers
- **Distributed systems**: No need for centralized ID generation
- **Scalability**: Perfect for microservices architecture

### Namespace Considerations

::: note Important Note

If you changed your project name when creating it, make sure your namespace matches your project name. For example:

- If your project is named `MyProductService`, use `namespace MyProductService.Models`
- If your project is named `ProductGrpc`, use `namespace ProductGrpc.Models`

:::

🎉 **Excellent work!** You've successfully created your first business model that will serve as the foundation for our entire gRPC application.

### Next Steps

Now that we have our Product model ready, let's move on to setting up SQLite as our database and configuring Entity Framework Core to handle our data persistence. This will allow us to store and retrieve our Product data efficiently.

---

## How to Set Up the SQLite Database

To persist our product data, we need a database that can handle our CRUD (Create, Read, Update, Delete) operations efficiently. We'll use **SQLite** for this tutorial because it's lightweight, requires no separate server installation, and works perfectly for developing small-to-medium applications.

### Installing the Required Packages

Before we create our database context, we need to install the necessary Entity Framework Core packages. Open your terminal and make sure you're in the root directory of your project, then run these commands:

```sh
dotnet add package Microsoft.EntityFrameworkCore.Design
```

```sh
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

What these packages do:

- `Microsoft.EntityFrameworkCore.Design` provides design-time tools for EF Core (migrations, scaffolding)
- `Microsoft.EntityFrameworkCore.SQLite` is a SQLite database provider for Entity Framework Core

You should see output confirming the packages were added successfully:

```plaintext title="output"
info : PackageReference for 'Microsoft.EntityFrameworkCore.Design' version 'x.x.x' added to file 'ProductGrpc.csproj'.
info : PackageReference for 'Microsoft.EntityFrameworkCore.Sqlite' version 'x.x.x' added to file 'ProductGrpc.csproj'.
```

### Creating the Database Context

Now let's create our database context, which acts as a bridge between our .NET objects and the database.

First, create a new folder called `Data` In your project root. Inside the Data folder, create a file called <VPIcon icon="iconfont icon-csharp"/>`AppDbContext.cs`.

Your project structure should now look like this:

```plaintext title="file structure"
ProductGrpc/
├── Data/
│   └── AppDbContext.cs      # Our new database context
├── Models/
│   └── Product.cs
├── Protos/
├── Services/
└── ...
```

Add the following code to your <VPIcon icon="iconfont icon-csharp"/>`AppDbContext.cs` file:

```cs title="Data/AppDbContext.cs"
using Microsoft.EntityFrameworkCore;
using ProductGrpc.Models;

namespace ProductGrpc.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
```

Let’s understand the key components of DbContext:

- **Constructor**: Accepts `DbContextOptions` for configuration (connection string, provider, and so on)
- **DbSet Products**: Represents the Products table in our database

### Registering the Database Context

Now we need to register our `AppDbContext` With the dependency injection container so our application can use it.

Open your <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file and add the database configuration:

```cs title="Program.cs"
using ProductGrpc.Data;
using ProductGrpc.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt=> 
    opt.UseSqlite("Data Source=ProductGrpc.db "));
// Add services to the container.
builder.Services.AddGrpc();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();

app.Run();
```

`Data Source=ProductGrpc.db` creates a SQLite database file named <VPIcon icon="fas fa-database"/>`ProductGrpc.db` in your project directory.

### Creating and Running Migrations

Now we need to create a migration to generate the database schema based on our Product model.

Start by creating the initial migration:

```sh
dotnet ef migrations add InitialCreate
```

This command will:

- Analyze your models and DbContext
- Generate migration files in a <VPIcon icon="fas fa-folder-open"/>`Migrations` folder
- Create SQL commands needed to build your database schema

You should see output like this:

```plaintext title="output"
Build succeeded.
Done. To undo this action, use 'dotnet ef migrations remove'
```

Apply the migration to create the database:

```sh
dotnet ef database update
```

::: info This command will:

- Execute the migration SQL commands
- Create the <VPIcon icon="fas fa-database"/>`ProductGrpc.db` file in your project directory
- Set up the Products table with all the correct columns

:::

You should see output confirming the database was created:

```plaintext title="output"
Build succeeded.
Applying migration '20240101000000_InitialCreate'.
Done.
```

### Verifying the Setup

After running the migration, you should see:

1. A new <VPIcon icon="fas fa-folder-open"/>`Migrations` folder in your project with migration files
2. A <VPIcon icon="fas fa-database"/>`ProductGrpc.db` file in your project root (this is your SQLite database)
3. No errors in the terminal output

Your project structure should now look like this:

```plaintext title="file structure"
ProductGrpc/
├── Data/
│   └── AppDbContext.cs
├── Migrations/
│   ├── 20240101000000_InitialCreate.cs
│   └── AppDbContextModelSnapshot.cs
├── Models/
│   └── Product.cs
├── ProductGrpc.db            # Your SQLite database file
└── ...
```

Congratulations! You've successfully installed Entity Framework Core packages, created a database context, registered the context with dependency injection, generated and applied your first migration, and created a working SQLite database. Whew!

### What's Next?

Now that our database is set up and ready, we can move on to creating our Protocol Buffer definitions (`.proto` files) and implementing our gRPC services for CRUD operations.

---

## How to Create Product Protocol Buffers

Protocol Buffers (protobuf) are the heart of gRPC communication. They define the structure of your data and services in a language-neutral way, which then gets compiled into native C# code. Protocol Buffers use the efficient **HTTP/2** protocol, making service-to-service communication fast and reliable.

### Understanding Protocol Buffers vs REST APIs

To better understand Protocol Buffers, let's compare them to what you might already know from REST API development.

In REST API development, you typically define your API endpoints using controllers and action methods. The contract between client and server is often documented separately (like with OpenAPI/Swagger), and there's no compile-time guarantee that your documentation matches your actual implementation.

```cs
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id) { ... }
```

With **gRPC,** the service contract is defined first in the `.proto` file using the `service` keyword. This contract becomes the single source of truth, and both client and server code are generated from it, ensuring they're always in sync.

```cs
service ProductService {
  rpc GetProduct(GetProductRequest) returns (GetProductResponse);
}
```

### Data Transfer and Serialization

REST APIs typically use JSON for data transfer, which is human-readable and widely supported. But JSON is text-based, which has a few negatives. First, it has larger payload sizes due to text encoding. It also comes with some runtime parsing overhead. It doesn’t have any built-in schema validation, and there’s a high potential for typos in field names

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Wireless Headphones",
  "price": 99.99
}
```

gRPC instead uses Protocol Buffers, which serialize data into a compact binary format. This provides significantly smaller payloads (up to 6x smaller than JSON), faster serialization/deserialization, strong typing with compile-time validation, and schema evolution without breaking changes.

#### Transport Protocol Differences

REST APIs run over **HTTP/1.1**, which has some limitations:

- One request-response cycle per connection
- Text-based headers (larger overhead)
- No built-in multiplexing
- Limited streaming capabilities

gRPC leverages **HTTP/2**, which offers some advantages:

- **Multiplexing**: Multiple requests over a single connection
- **Header compression**: Reduced overhead with HPACK
- **Server push**: The Server can initiate streams to clients
- **Flow control**: Better handling of slow consumers

#### Data Structure Definitions

In REST APIs, you define **DTOs (Data Transfer Objects)** as regular classes:

```cs title="ProductDto.cs"
public class ProductDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

These DTOs exist only in your specific language and need manual synchronization across different services or languages.

In gRPC, you define **Messages** in the proto file:

```proto
message ProductModel {
  string id = 1;
  string name = 2;
  double price = 3;
}
```

These message definitions are language-agnostic and automatically generate equivalent classes in any supported programming language.

Here's a quick comparison table to summarize these differences:

| Service Contracts and Interfaces Service Contracts and Interfaces REST API Concept | gRPC Equivalent | Purpose |
| --- | --- | --- |
| Interface | Service | Defines available operations |
| DTO (Data Transfer Object) | Message | Defines a data structure |
| JSON Request/Response | Binary Protocol Buffer | Data serialization format |
| HTTP/1.1 | HTTP/2 | Transport protocol |

### Creating the Product Proto File

Navigate to the <VPIcon icon="fas fa-folder-open"/>`Protos` folder in your project and create a new file called <VPIcon icon="iconfont icon-protobuf"/>`product.proto`. Make sure the file extension is `.proto`.

Your project structure should look like this:

```plaintext title="file structure"
ProductGrpc/
├── Protos/
│   ├── greet.proto          # Default template file
│   └── product.proto        # Our new proto file
└── ...
```

### Setting Up the Proto File Header

Add the following header to your <VPIcon icon="iconfont icon-protobuf"/>`product.proto` file:

```proto title="Protos/product.proto"
syntax = "proto3";

option csharp_namespace = "ProductGrpc";

package product;
```

::: info Here’s what’s going on:

- `syntax = "proto3"`: Specifies that we're using Protocol Buffers version 3
- `option csharp_namespace = "ProductGrpc"`: Sets the C# namespace for generated code
- `package product`: Defines the protobuf package name

:::

::: note

If you named your project differently, make sure the `csharp_namespace` matches your project name.

:::

### Defining the Product Service

In gRPC, services define the available operations (similar to interfaces in REST APIs). Add the following service definition:

```proto title="Protos/product.proto"
service  ProductsServiceProto {
  rpc CreateProduct(CreateProductRequest) returns (CreateProductResponse);
  rpc GetProduct(GetProductRequest) returns (GetProductResponse);
  rpc ListProducts(ListProductsRequest) returns (ListProductsResponse);
  rpc UpdateProduct(UpdateProductRequest) returns (UpdateProductResponse);
  rpc DeleteProduct(DeleteProductRequest) returns (DeleteProductResponse);
}
```

Service methods explained:

- `rpc`: Defines a remote procedure call
- `CreateProduct`: Method name
- `(CreateProductRequest)`: Input message type
- `returns (CreateProductResponse)`: Output message type

### Defining Protocol Buffer Messages

Messages in gRPC are equivalent to DTOs in REST APIs. They define the structure of data being exchanged. Let's create all the messages we need:

#### Product Model Message

```proto title="product.proto"
message ProductModel {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  string created_at = 5;
  string updated_at = 6;
  string tags = 7;
}
```

#### Create Operation Messages

```proto title="Protos/product.proto"
message CreateProductRequest {
  string name = 1;
  string description = 2;
  double price = 3;
  string tags = 4;
}

message CreateProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}
```

#### Read Operation Messages

```proto title="Protos/product.proto"
message GetProductRequest {
  string id = 1;
}

message GetProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}

message ListProductsRequest {
  int32 page = 1;
  int32 page_size = 2;
}

message ListProductsResponse {
  bool success = 1;
  string message = 2;
  repeated ProductModel products = 3;
  int32 total_count = 4;
}
```

#### Update Operation Messages

```proto title="Protos/product.proto"
message UpdateProductRequest {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  string tags = 5;
}

message UpdateProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}
```

#### Delete Operation Messages

```proto title="Protos/product.proto"
message DeleteProductRequest {
  string id = 1;
}

message DeleteProductResponse {
  bool success = 1;
  string message = 2;
}
```

### Understanding Protocol Buffer Syntax

There are a few key concepts you should understand about how protocol buffers work:

- **Field Numbers**: Each field has a unique number (for example, `= 1`, `= 2`) used for binary encoding
- **Field Types**: `string`, `int32`, `double`, `bool` are common scalar types
- **repeated**: Indicates an array/list (for example, `repeated ProductModel products`)
- **Message Nesting**: Messages can contain other messages (for example, `ProductModel product`)

Keep in mind that field numbers must be unique within a message, field numbers 1-15 use 1 byte encoding (more efficient), and you should never reuse field numbers (for backward compatibility).

### Complete Product Proto File

Here's your complete <VPIcon icon="iconfont icon-protobuf"/>`product.proto` file:

```proto :collapsed-lines title="Protos/product.proto"
syntax = "proto3";

option csharp_namespace = "ProductGrpc";

package product;

// Product service definition
service  ProductsServiceProto {
  rpc CreateProduct(CreateProductRequest) returns (CreateProductResponse);
  rpc GetProduct(GetProductRequest) returns (GetProductResponse);
  rpc ListProducts(ListProductsRequest) returns (ListProductsResponse);
  rpc UpdateProduct(UpdateProductRequest) returns (UpdateProductResponse);
  rpc DeleteProduct(DeleteProductRequest) returns (DeleteProductResponse);
}

// Product model message
message ProductModel {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  string created_at = 5;
  string updated_at = 6;
  string tags = 7;
}

// Create operation messages
message CreateProductRequest {
  string name = 1;
  string description = 2;
  double price = 3;
  string tags = 4;
}

message CreateProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}

// Read operation messages
message GetProductRequest {
  string id = 1;
}

message GetProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}

message ListProductsRequest {
  int32 page = 1;
  int32 page_size = 2;
}

message ListProductsResponse {
  bool success = 1;
  string message = 2;
  repeated ProductModel products = 3;
  int32 total_count = 4;
}

// Update operation messages
message UpdateProductRequest {
  string id = 1;
  string name = 2;
  string description = 3;
  double price = 4;
  string tags = 5;
}

message UpdateProductResponse {
  bool success = 1;
  string message = 2;
  ProductModel product = 3;
}

// Delete operation messages
message DeleteProductRequest {
  string id = 1;
}

message DeleteProductResponse {
  bool success = 1;
  string message = 2;
}
```

### Building the Project to Generate C# Code

Now that we've defined our Protocol Buffer contract, we need to build the project to generate the corresponding C# code:

```sh
dotnet build
```

This command will compile your `.proto` files into C# classes, generate client and server code, and create strongly-typed request/response classes.

You should see output confirming the build was successful:

```plaintext title="output"
Restore complete (0.6s)
  ProductGrpc succeeded (9.5s) → bin\Debug\net9.0\ProductGrpc.dll

Build succeeded in 11.1s
```

### What Gets Generated?

After building, the Protocol Buffer compiler generates several C# files (you won't see them directly, but they're available in your code):

- **ProductModel**: C# class representing your product data
- **CreateProductRequest/Response**: Request and response classes for create operations
- **ProductService.ProductServiceBase**: Base class for implementing your service
- **ProductService.ProductServiceClient**: Client class for calling the service

Congratulations! You've successfully created a comprehensive Protocol Buffer definition, defined a complete CRUD service contract, set up a strongly-typed message structure, and generated C# code from your proto file.

### What's Next?

Now that we have our Protocol Buffer contract defined, we can start implementing the actual gRPC service methods. In the next section, we'll create the `ProductService` Class and implement each CRUD operation.

::: note Remember

Protocol Buffers are language-agnostic, so this same `.proto` file could be used to generate client code in Python, Java, Go, or any other supported language.

:::

---

## How to Implement CRUD Operations Services with gRPC

Now that we have our database set up and Protocol Buffer contracts defined, it's time to implement the actual CRUD (Create, Read, Update, Delete) functionality. We'll create a gRPC service that brings together our database models and Protocol Buffer definitions.

### Understanding the Implementation Architecture

Before we start coding, let's understand how the pieces fit together:

```plaintext
Protocol Buffer (.proto) → Generated C# Code → Our Service Implementation → Database
```

::: info Key concepts in this code

- **Proto Service:** Interface (defines what methods are available)
- **Proto Messages**: DTOs (define data structure)
- **Service Implementation**: Business logic (what happens)
- **Database Context**: Data persistence layer

:::

### Configuring Proto File Build

First, we need to ensure our <VPIcon icon="iconfont icon-protobuf"/>`product.proto` file gets compiled into C# code during the build process.

Open your <VPIcon icon="iconfont icon-code"/>`ProductGrpc.csproj` file and locate the `<ItemGroup>` section that references proto files:

```xml title="ProductGrpc.csproj"
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <Protobuf Include="Protos\greet.proto" GrpcServices="Server" />
    <!-- Add this line to include our product.proto file -->
    <Protobuf Include="Protos\product.proto" GrpcServices="Server" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Grpc.AspNetCore" Version="2.64.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.6">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="9.0.6" />
  </ItemGroup>
</Project>
```

What this configuration does:

- `Include="Protos\product.proto"` tells .NET to process our proto file
- `GrpcServices="Server"` generates server-side code (service base classes)

### Building the Project

Now let's build the project to generate the C# code from our proto file:

```sh
dotnet build
```

This command will compile your `.proto` files into C# classes, generate the `ProductsServiceProto. ProductsServiceProtoBase` class we'll inherit from, create all the request/response message classes, and validate that everything compiles correctly.

You should see output like:

```plaintext title="output"
Build succeeded.
    0 Warning(s)
    0 Error(s)
```

### Creating the ProductService Class

Navigate to the `Services` folder and create a new file called <VPIcon icon="iconfont icon-csharp"/>`ProductService.cs`. This will contain our gRPC service implementation.

Your project structure should now look like this:

```plaintext title="file structure"
ProductGrpc/
├── Services/
│   ├── GreeterService.cs    # Default template service
│   └── ProductService.cs    # Our new product service
└── ...
```

### Setting Up the Service Foundation

Start by creating the basic service class structure:

```cs title="Services/ProductService.cs"
using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using ProductGrpc.Data;
using ProductGrpc.Models;

namespace ProductGrpc.Services
{
    public class ProductService :  ProductsServiceProto .ProductsServiceProtoBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<ProductService> _logger;

        public ProductService(AppDbContext dbContext, ILogger<ProductService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        // CRUD methods will be implemented here
    }
}
```

::: info Key components of this code

- **Inheritance**: `ProductsServiceProto .ProductsServiceProtoBase` is generated from our proto file
- **Dependency injection**: We inject `AppDbContext` for database operations and `ILogger` for logging
- **Constructor**: Initializes our dependencies

:::

### Implementing Method Signatures

Now let's add all the method signatures that we defined in our proto file. These methods override the virtual methods from the base class:

```cs :collapsed-lines title="Services/ProductService.cs"
using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using ProductGrpc.Data;
using ProductGrpc.Models;

namespace ProductGrpc.Services
{
    public class ProductService :  ProductsServiceProto .ProductsServiceProtoBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<ProductService> _logger;

        public ProductService(AppDbContext dbContext, ILogger<ProductService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public override async Task<CreateProductResponse> CreateProduct(
            CreateProductRequest request, 
            ServerCallContext context)
        {
            // Implementation will go here
            throw new NotImplementedException();
        }

        public override async Task<GetProductResponse> GetProduct(
            GetProductRequest request, 
            ServerCallContext context)
        {
            // Implementation will go here
            throw new NotImplementedException();
        }

        public override async Task<ListProductsResponse> ListProducts(
            ListProductsRequest request, 
            ServerCallContext context)
        {
            // Implementation will go here
            throw new NotImplementedException();
        }

        public override async Task<UpdateProductResponse> UpdateProduct(
            UpdateProductRequest request, 
            ServerCallContext context)
        {
            // Implementation will go here
            throw new NotImplementedException();
        }

        public override async Task<DeleteProductResponse> DeleteProduct(
            DeleteProductRequest request, 
            ServerCallContext context)
        {
            // Implementation will go here
            throw new NotImplementedException();
        }
    }
}
```

### Understanding Method Parameters

Each gRPC method receives two parameters:

1. **Request parameter**: Contains the data sent by the client (for example, `CreateProductRequest`)
2. **ServerCallContext**: Provides access to request metadata, cancellation tokens, and response headers

::: tip Method Signature Pattern

```cs
public override async Task<ResponseType> MethodName(
    RequestType request, 
    ServerCallContext context)
```

:::

### Registering the Service

Before we implement the methods, we need to register our service with the application. Open <VPIcon icon="iconfont icon-csharp"/>`Program.cs` and add the service:

```cs title="Program.cs"
using ProductGrpc.Data;
using ProductGrpc.Services; // Add this using statement

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();

// Register our database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=ProductGrpc.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapGrpcService<GreeterService>();
app.MapGrpcService<ProductService>(); // Add this line

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
```

### Handling Compiler Warnings

You might see warnings like:

```sh
This async method lacks 'await' operators and will run synchronously.
```

This is expected since we haven't implemented the actual logic yet. These warnings will disappear once we add the implementation in the following sections.

### Creating Helper Methods

Before implementing CRUD operations, let's add some helper methods for converting between our database models and Protocol Buffer messages:

```cs title="Services/ProductService.cs"
// Add these helper methods to your ProductService class

private static ProductModel MapToProductModel(Product product)
{
    return new ProductModel
    {
        Id = product.Id.ToString(),
        Name = product.Name,
        Description = product.Description,
        Price = (double)product.Price,
        CreatedAt = product.Created.ToString("yyyy-MM-ddTHH:mm:ssZ"),
        UpdatedAt = product.Updated.ToString("yyyy-MM-ddTHH:mm:ssZ"),
        Tag = product.Tags ?? string.Empty
    };
}
```

Excellent work! You've successfully:

- Configured proto file compilation
- Created the ProductService class structure
- Set up dependency injection
- Defined all CRUD method signatures
- Registered the service with the application
- Created helper methods for data mapping

### What's Next?

Now that we have our service foundation ready, we'll implement each CRUD operation one by one:

1. `CreateProduct`: Add new products to the database
2. `GetProduct`: Retrieve a single product by ID
3. `ListProducts`: Get a paginated list of products
4. `UpdateProduct`: Modify existing products
5. `DeleteProduct`: Remove products from the database

In the next sections, we'll dive deep into each implementation, handling error cases, validation, and best practices.

::: tip Pro Tip

The `ServerCallContext` parameter provides useful information like request cancellation tokens, client metadata, and response headers. We'll use these in our implementations for better error handling and logging.

:::

::: note

The `override` keyword is crucial - it tells C# that we're implementing the virtual methods defined in the generated base class from our proto file.

:::

---

## How to Implement gRPC CRUD Database Operations With SQLite

Now that we have our service foundation ready, let's implement each CRUD operation. Each method will handle database operations, error handling, and return appropriate responses using our Protocol Buffer messages.

### Understanding the Implementation Pattern

Each CRUD operation follows a consistent pattern:

1. **Input Validation**: Validate request parameters
2. **Database Operation**: Perform the actual database work
3. **Response Mapping**: Convert database models to Protocol Buffer messages
4. **Error Handling**: Catch and handle exceptions gracefully

### Creating the `CreateProduct` Service

The `CreateProduct` method handles adding new products to our database. This is the **"C"** in CRUD (Create).

```cs :collapsed-lines title="Services/ProductService.cs"
public override async Task<CreateProductResponse> CreateProduct(
    CreateProductRequest request, 
    ServerCallContext context)
{
    try
    {
        // Input validation
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return new CreateProductResponse
            {
                Success = false,
                Message = "Product name is required"
            };
        }

        if (request.Price <= 0)
        {
            return new CreateProductResponse
            {
                Success = false,
                Message = "Product price must be greater than zero"
            };
        }

        // Create new product entity
        var productItem = new Product
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Price = Convert.ToDecimal(request.Price),
            Created = DateTime.UtcNow,
            Updated = DateTime.UtcNow,
            Tags = request.Tags
        };

        // Add to database
        _dbContext.Products.Add(productItem);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Product created successfully with ID: {ProductId}", productItem.Id);

        // Return success response
        return new CreateProductResponse
        {
            Success = true,
            Message = "Product created successfully",
            Product = MapToProductModel(productItem)
        };
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating product");

        return new CreateProductResponse
        {
            Success = false,
            Message = $"Error creating product: {ex.Message}"
        };
    }
}
```

These are the important implementation details:

- **Unique ID generation**: `Guid.NewGuid()` Creates a unique identifier
- **Timestamp management**: `DateTime.UtcNow` Ensures consistent timezone handling
- **Type conversion**: `Convert.ToDecimal()` converts double to decimal for database storage
- **Input validation**: Checks for required fields and valid values
- **Logging**: Records successful operations and errors for debugging

### Creating the `GetProduct` Service

The `GetProduct` method retrieves a single product by its ID. This is the **"R"** in CRUD (Read).

```cs :collapsed-lines title="Services/ProductService.cs"
public override async Task<GetProductResponse> GetProduct(
    GetProductRequest request, 
    ServerCallContext context)
{
    try
    {
        // Validate and parse the product ID
        if (!Guid.TryParse(request.Id, out var productId))
        {
            return new GetProductResponse
            {
                Success = false,
                Message = "Invalid product ID format. Please provide a valid GUID."
            };
        }

        // Find product in database
        var product = await _dbContext.Products.FindAsync(productId);

        if (product == null)
        {
            _logger.LogWarning("Product not found with ID: {ProductId}", productId);

            return new GetProductResponse
            {
                Success = false,
                Message = "Product not found"
            };
        }

        _logger.LogInformation("Product retrieved successfully with ID: {ProductId}", productId);

        // Return success response with product data
        return new GetProductResponse
        {
            Success = true,
            Message = "Product retrieved successfully",
            Product = MapToProductModel(product)
        };
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error retrieving product with ID: {ProductId}", request.Id);

        return new GetProductResponse
        {
            Success = false,
            Message = $"Error retrieving product: {ex.Message}"
        };
    }
}
```

::: info Important implementation details:

- **ID validation**: `Guid.TryParse()` safely validates the ID format
- **Database query**: `FindAsync()` efficiently finds records by primary key
- **Null checking**: Handles cases where the product doesn't exist
- **Detailed logging**: Tracks both successful retrievals and missing products

:::

### Creating the `ListProducts` Service

The `ListProducts` method retrieves multiple products with pagination support. This is also part of the **"R"** in CRUD (Read).

```cs :collapsed-lines title="Services/ProductService.cs"
public override async Task<ListProductsResponse> ListProducts(
    ListProductsRequest request, 
    ServerCallContext context)
{
    try
    {
        // Set default pagination values
        var pageSize = request.PageSize <= 0 ? 10 : Math.Min(request.PageSize, 100); // Max 100 items per page
        var page = request.Page <= 0 ? 1 : request.Page;

        // Calculate skip amount for pagination
        var skip = (page - 1) * pageSize;

        // Get total count for pagination metadata
        var totalCount = await _dbContext.Products.CountAsync();

        // Retrieve paginated products
        var products = await _dbContext.Products
            .OrderBy(p => p.Created) // Consistent ordering
            .Skip(skip)
            .Take(pageSize)
            .ToListAsync();

        // Create response
        var response = new ListProductsResponse
        {
            Success = true,
            Message = products.Any() 
                ? $"Retrieved {products.Count} products (Page {page} of {Math.Ceiling((double)totalCount / pageSize)})"
                : "No products found",
            TotalCount = totalCount
        };

        // Add products to response
        response.Products.AddRange(products.Select(MapToProductModel));

        _logger.LogInformation("Listed {ProductCount} products for page {Page}", products.Count, page);

        return response;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error retrieving products list");

        return new ListProductsResponse
        {
            Success = false,
            Message = $"Error retrieving products: {ex.Message}",
            TotalCount = 0
        };
    }
}
```

::: info Here are the key implementation details:

- **Pagination logic**: Calculates `skip` and `take` values for efficient data retrieval
- **Default values**: Sets sensible defaults for page size and page number
- **Performance optimization**: Uses `Skip()` and `Take()` for database-level pagination
- **Consistent ordering**: `OrderBy()` ensures predictable results across requests
- **Metadata**: Returns total count for client-side pagination UI

:::

### Creating the `UpdateProduct` Service

The `UpdateProduct` method modifies existing products. This is the **"U"** in CRUD (Update).

```cs :collapsed-lines title="Services/ProductService.cs"
public override async Task<UpdateProductResponse> UpdateProduct(
    UpdateProductRequest request, 
    ServerCallContext context)
{
    try
    {
        // Validate product ID
        if (!Guid.TryParse(request.Id, out var productId))
        {
            return new UpdateProductResponse
            {
                Success = false,
                Message = "Invalid product ID format. Please provide a valid GUID."
            };
        }

        // Input validation
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return new UpdateProductResponse
            {
                Success = false,
                Message = "Product name is required"
            };
        }

        if (request.Price <= 0)
        {
            return new UpdateProductResponse
            {
                Success = false,
                Message = "Product price must be greater than zero"
            };
        }

        // Find existing product
        var existingProduct = await _dbContext.Products.FindAsync(productId);

        if (existingProduct == null)
        {
            return new UpdateProductResponse
            {
                Success = false,
                Message = "Product not found"
            };
        }

        // Update product properties
        existingProduct.Name = request.Name;
        existingProduct.Description = request.Description;
        existingProduct.Price = Convert.ToDecimal(request.Price);
        existingProduct.Tags = request.Tags;
        existingProduct.Updated = DateTime.UtcNow; // Track when updated

        // Save changes to database
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Product updated successfully with ID: {ProductId}", productId);

        // Return success response with updated product
        return new UpdateProductResponse
        {
            Success = true,
            Message = "Product updated successfully",
            Product = MapToProductModel(existingProduct)
        };
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error updating product with ID: {ProductId}", request.Id);

        return new UpdateProductResponse
        {
            Success = false,
            Message = $"Error updating product: {ex.Message}"
        };
    }
}
```

::: info Key details:

- **Existence check**: Verifies the product exists before attempting updates
- **Selective updates**: Only updates the fields provided in the request
- **Timestamp tracking**: Updates the `Updated` field to track modification time
- **Input validation**: Ensures data integrity before saving
- **Atomic operation**: All changes are saved together or not at all

:::

### Creating the `DeleteProduct` Service

The `DeleteProduct` method removes products from the database. This is the **"D"** in CRUD (Delete).

```cs :collapsed-lines title="Services/ProductService.cs"
public override async Task<DeleteProductResponse> DeleteProduct(
    DeleteProductRequest request, 
    ServerCallContext context)
{
    try
    {
        // Validate product ID
        if (!Guid.TryParse(request.Id, out var productId))
        {
            return new DeleteProductResponse
            {
                Success = false,
                Message = "Invalid product ID format. Please provide a valid GUID."
            };
        }

        // Find the product to delete
        var product = await _dbContext.Products.FindAsync(productId);

        if (product == null)
        {
            return new DeleteProductResponse
            {
                Success = false,
                Message = "Product not found"
            };
        }

        // Remove product from database
        _dbContext.Products.Remove(product);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Product deleted successfully with ID: {ProductId}", productId);

        // Return success response
        return new DeleteProductResponse
        {
            Success = true,
            Message = "Product deleted successfully"
        };
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error deleting product with ID: {ProductId}", request.Id);

        return new DeleteProductResponse
        {
            Success = false,
            Message = $"Error deleting product: {ex.Message}"
        };
    }
}
```

::: info Key details

- **Soft vs hard delete**: This implements hard delete (permanent removal)
- **Existence verification**: Checks if the product exists before deletion
- **Clean removal**: Uses Entity Framework's `Remove()` method
- **Confirmation**: Returns a success message confirming deletion

:::

### Complete ProductService Implementation

Here's your complete <VPIcon icon="iconfont icon-csharp"/>`ProductService.cs` file with all CRUD operations:

```cs :collapsed-lines title="Services/ProductService.cs"
using Grpc.Core;
using Microsoft.EntityFrameworkCore;
using ProductGrpc.Data;
using ProductGrpc.Models;

namespace ProductGrpc.Services
{
    public class ProductService : Product.ProductServiceBase
    {
        private readonly AppDbContext _dbContext;
        private readonly ILogger<ProductService> _logger;

        public ProductService(AppDbContext dbContext, ILogger<ProductService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        // Helper method to map Product entity to ProductModel message
        private static ProductModel MapToProductModel(Product product)
        {
            return new ProductModel
            {
                Id = product.Id.ToString(),
                Name = product.Name,
                Description = product.Description,
                Price = (double)product.Price,
                CreatedAt = product.Created.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                UpdatedAt = product.Updated.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                Tags = product.Tags ?? string.Empty
            };
        }

        // All CRUD methods go here (as implemented above)
        // CreateProduct, GetProduct, ListProducts, UpdateProduct, DeleteProduct
    }
}
```

Excellent work! You've successfully implemented all CRUD operations:

- **Create**: Add new products with validation
- **Read**: Retrieve single products and paginated lists
- **Update**: Modify existing products with validation
- **Delete**: Remove products safely

### What's Next?

Now that our gRPC service is fully implemented, we need to test it! In the next section, we'll learn how to test our gRPC endpoints using Postman.

---

## How to Test gRPC Services with Postman

Testing gRPC services requires different tools and approaches compared to traditional REST APIs. While REST APIs use HTTP/1.1 with JSON payloads, gRPC uses HTTP/2 with binary Protocol Buffer messages. Fortunately, Postman provides excellent support for gRPC testing, making it easy to test our service without writing client code.

### Why gRPC Testing is Different

Here are the important differences between gRPC and REST API testing summarized:

| Aspect | REST API | gRPC |
| --- | --- | --- |
| **Protocol** | HTTP/1.1 | HTTP/2 |
| **Data Format** | JSON/XML | Protocol Buffers (Binary) |
| **Schema** | Optional (OpenAPI/Swagger) | Required (.proto files) |
| **Content-Type** | application/json | application/grpc |
| **Testing Tools** | Any HTTP client | Specialized gRPC clients |

Why we need the proto file:

- gRPC requires the service contract (.proto file) to understand available methods
- Protocol Buffers need schema definition for serialization/deserialization
- Postman uses the proto file to generate the correct request/response structure

### Setting Up Postman for gRPC Testing

#### Step 1: Launch Postman

Open Postman on your machine. You should see the main dashboard similar to this:

![Postman main dashboard showing the workspace interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879108777/a98c6fa4-08c7-49f1-94a4-9138b69ad0a1.png)

#### Step 2: Create a New gRPC Request

Click on "New" in the top-left corner or use the "+" button. Then select "gRPC Request" from the available options.

You should see a modal dialog with different request types:

![Postman's new request modal showing gRPC option](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879545910/840f2004-73c5-4c1e-97a6-62b39eb278f9.png)

Click on "gRPC Request" to create a new gRPC request.

#### Step 3: Configure the gRPC Request Interface

After creating a gRPC request, you'll see the gRPC request interface:

![Postman gRPC request interface with service definition section](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879652894/b339e198-27e9-4618-8cdb-54718da65841.png)

These are the notable components of the gRPC interface:

- **Server URL**: Where your gRPC service is running
- **Service definition**: Where you import your .proto file
- **Method selection**: Choose which RPC method to call
- **Message body**: Request payload based on proto definitions

### Importing the Proto File

#### Step 4: Access Service Definition

Locate the "Service definition" section in the gRPC request interface. Then click on "Import .proto file" or a similar option.

![Service definition section where proto files are imported](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879690499/b2d53cab-3d0c-4c84-8a12-7777480e6860.png)

#### Step 5: Import Your Proto File

1. Click "Select Files" or "Import" button
2. Navigate to your project directory
3. Go to the <VPIcon icon="fas fa-folder-open"/>`Protos` folder
4. Select <VPIcon icon="iconfont icon-protobuf"/>`product.proto` file
5. Click "Open" to import

```plaintext title="file structure"
YourProject/
├── Protos/
│   ├── greet.proto
│   └── product.proto    ← Select this file
└── ...
```

#### Step 6: Configure Import Settings

When importing, you'll see options like:

![Proto file import configuration in Postman](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879892390/625b1fbd-cdd6-4437-af9e-441a39780c5e.png)

**Import Configuration:**

- **Import as**: Select "API"
- **API name**: Choose a descriptive name (for example, "ProductGrpc API")
- **Import location**: Select your workspace

You want to import as an API because it creates a reusable API definition, allows multiple team members to use the same proto definitions, and provides better organization for multiple services.

#### Step 7: Verify Successful Import

After successful import, you should see:

1. **API Collection**: Your named API appears in the left sidebar under "APIs."
2. **Available Methods**: All RPC methods from your proto file are listed
3. **Request/Response Schemas**: Postman understands your message structures

![Successfully imported proto file showing available methods](https://cdn.hashnode.com/res/hashnode/image/upload/v1753879919558/a9c264a6-b021-4c7a-8221-557350c07f53.png)

### Understanding the gRPC Request Interface

Once connected, you'll see a method selection dropdown with the following:

- **CreateProduct**
- **GetProduct**
- **ListProducts**
- **UpdateProduct**
- **DeleteProduct**

Excellent! You've successfully created a gRPC request in Postman, imported your proto file, configured the server connection, and set up the API collection for reuse.

### What's Next?

Now that Postman is configured with your proto file, you're ready to test each CRUD operation:

1. **CreateProduct**: Test adding new products
2. **GetProduct**: Test retrieving single products
3. **ListProducts**: Test pagination and listing
4. **UpdateProduct**: Test modifying existing products
5. **DeleteProduct**: Test removing products

In the next section, we'll walk through testing each operation with sample data and expected responses.

---

## How to Test Product Creation

Now that we have Postman configured with our proto file, it's time to test our gRPC service! We'll start by testing the `CreateProduct` Method to add a new product to our database.

### Request Structure

Before sending your first request in Postman, select the RPC method from the dropdown. The request body’s shape comes directly from the Protocol Buffer definitions in your `.proto` file. Postman renders those proto messages as JSON for easier editing, but the proto types still apply: each field must match the type defined in the schema (including nested messages, enums, and repeated fields).

### Step 1: Select the CreateProduct Method

Open your gRPC request in Postman and click the method dropdown (should show available methods). Select "CreateProduct" from the list.

You should see all the methods we defined in our proto file:

- **CreateProduct**
- **GetProduct**
- **ListProducts**
- **UpdateProduct**
- **DeleteProduct**

### Step 2: Request Schema

When you select `CreateProduct`, Postman automatically generates the request structure based on our `CreateProductRequest` message from the proto file:

#### Proto Definition Reminder

```proto
message CreateProductRequest {
  string name = 1;
  string description = 2;
  double price = 3;
  string tags = 4;
}
```

#### Postman JSON Representation:

```json
{
  "name": "",
  "description": "",
  "price": 0,
  "tags": ""
}
```

### Step 3: Prepare Test Data

Let's create our first product with meaningful test data. In the request body, enter:

```json
{
  "name": "MacBook Pro 16-inch",
  "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
  "price": 2499.99,
  "tags": "laptop, apple, professional"
}
```

So what are these fields?

- **name**: Product title (required, string)
- **description**: Detailed product information (string)
- **price**: Product cost (double/number, must be > 0)
- **tags**: Comma-separated keywords (string)

### Step 4: Send the Request

Click the "Invoke" button (or "Send" depending on Postman version) and wait for the response (should be very fast for local testing). Then check the response status (should show success).

### Step 5: Analyze the Response

If everything works correctly, you should receive a response like this:

```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "id": "920b98d2-4feb-4705-8303-ce6e28bd3694",
    "name": "MacBook Pro 16-inch",
    "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
    "price": 2499.99,
    "created_at": "2024-01-15T16:11:38Z",
    "updated_at": "2024-01-15T16:11:38Z",
    "tags": "laptop, apple, professional"
  }
}
```

Response fields:

- **success**: Boolean indicating operation success
- **message**: Human-readable status message
- **product**: The created product with generated fields
  - **id**: Auto-generated GUID
  - **created_at/updated_at**: UTC timestamps
  - **Other fields**: Echo of the input data

### Visual Confirmation in Postman

Here's how a successful request looks in Postman:

![Postman interface showing successful product creation with request and response](https://cdn.hashnode.com/res/hashnode/image/upload/v1753880143034/f7e81267-8d45-4835-b1d9-ad091563b99c.png)

Congratulations! You've successfully made your first gRPC request using Postman! You’ve also created a product in the database, received a properly formatted response, and verified the auto-generated ID and timestamps.

### What's Next?

Now that we've successfully tested product creation, let's test the other CRUD operations:

1. **GetProduct**: Retrieve the product we just created
2. **ListProducts**: See all products with pagination
3. **UpdateProduct**: Modify the existing product
4. **DeleteProduct**: Remove the product from the database

Each operation will help us verify that our complete gRPC service is working correctly.

---

## How to Test All Product Operations

Now that we've successfully created a product, let's test all the remaining CRUD operations to ensure our complete gRPC service works correctly.

### Get All Products (ListProducts)

The `ListProducts` method retrieves all products from our database with pagination support. Since we've created some products, we should be able to see them in the response.

#### Step 1: Select ListProducts Method

Click the method dropdown in your Postman gRPC request. Then select "ListProducts" from the available methods. Notice the request structure - it includes pagination parameters.

#### Step 2: Configure the Request

The `ListProductsRequest` supports pagination parameters:

```json
{
  "page": 1,
  "pageSize": 10
}
```

Here’s what’s going on with these parameters:

- **page**: Which page of results to retrieve (default: 1)
- **pageSize**: Number of products per page (default: 10, max: 100)

#### Step 3: Send the Request

Click "Invoke" to send the request and wait for the response containing all your products.

#### Step 4: Response

You should receive a response like this:

```json
{
  "success": true,
  "message": "Retrieved 2 products (Page 1 of 1)",
  "totalCount": 2,
  "products": [
    {
      "id": "920b98d2-4feb-4705-8303-ce6e28bd3694",
      "name": "MacBook Pro 16-inch",
      "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
      "price": 2499.99,
      "created_at": "2024-01-15T16:11:38Z",
      "updated_at": "2024-01-15T16:11:38Z",
      "tags": "laptop, apple, professional"
    },
    {
      "id": "a1b2c3d4-5e6f-7890-abcd-ef1234567890",
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone with titanium design",
      "price": 999.99,
      "created_at": "2024-01-15T16:15:22Z",
      "updated_at": "2024-01-15T16:15:22Z",
      "tags": "smartphone, apple, premium"
    }
  ]
}
```

Response structure:

- **success**: Operation status
- **message**: Descriptive message with pagination info
- **totalCount**: Total number of products in the database
- **products**: Array of product objects

![Postman showing successful retrieval of all products with pagination](https://cdn.hashnode.com/res/hashnode/image/upload/v1753880306062/af0bd1d4-24d0-4be8-96a1-f59404f36672.png)

### Testing Pagination

Let’s now test some different pagination scenarios:

#### Get the first 5 products

```json
{
  "page": 1,
  "pageSize": 5
}
```

#### Get the second page

```json
{
  "page": 2,
  "pageSize": 5
}
```

### Get Product By ID (GetProduct)

The `GetProduct` method retrieves a single product using its unique ID. Unlike REST APIs, where the ID is part of the URL path, gRPC passes the ID in the message body.

#### Step 1: Select the GetProduct Method

Select "GetProduct" from the method dropdown. Notice that the request structure requires an ID field.

#### Step 2: Prepare the Request

Copy a product ID from your previous `ListProducts` response:

```json
{
  "id": "920b98d2-4feb-4705-8303-ce6e28bd3694"
}
```

Important notes:

- **ID Format**: Must be a valid GUID string
- **Case Sensitivity**: GUIDs are case-insensitive
- **Validation**: Invalid GUIDs will return an error

#### Step 3: Send the Request

Paste a valid product ID from your ListProducts response. Click "Invoke" to send the request.

#### Step 4: Analyze the Response

Successful response:

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "product": {
    "id": "920b98d2-4feb-4705-8303-ce6e28bd3694",
    "name": "MacBook Pro 16-inch",
    "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
    "price": 2499.99,
    "created_at": "2024-01-15T16:11:38Z",
    "updated_at": "2024-01-15T16:11:38Z",
    "tags": "laptop, apple, professional"
  }
}
```

![Postman showing successful retrieval of a single product by ID](https://cdn.hashnode.com/res/hashnode/image/upload/v1753880592637/ebbacee5-1333-4328-8c46-ab7dd24d824d.png)

### Update Product (UpdateProduct)

The `UpdateProduct` method modifies an existing product. You need to provide the product ID and the fields you want to update.

#### Step 1: Select the UpdateProduct Method

Select "UpdateProduct" from the method dropdown. Review the request structure which includes ID and all updatable fields.

#### Step 2: Prepare the Update Request

```json
{
  "id": "920b98d2-4feb-4705-8303-ce6e28bd3694",
  "name": "MacBook Pro 16-inch (Updated)",
  "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 1TB SSD - Updated Storage",
  "price": 2799.99,
  "tags": "laptop, apple, professional, updated"
}
```

Update guidelines:

- **ID**: Must match an existing product
- **All Fields**: Currently required (not partial updates)
- **Price**: Must be greater than 0
- **Name**: Cannot be empty

#### Step 3: Send the Update Request

Make sure the ID exists (use one from your ListProducts response). Then click "Invoke" to send the update.

#### Step 4: Verify the Update

Successful response:

```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "id": "920b98d2-4feb-4705-8303-ce6e28bd3694",
    "name": "MacBook Pro 16-inch (Updated)",
    "description": "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 1TB SSD - Updated Storage",
    "price": 2799.99,
    "created_at": "2024-01-15T16:11:38Z",
    "updated_at": "2024-01-15T16:25:14Z",
    "tags": "laptop, apple, professional, updated"
  }
}
```

Notice the changes:

- `updated_at`: Timestamp changed to reflect the update
- **Modified Fields**: All updated fields reflect new values
- `created_at`: Remains unchanged (original creation time)

![Postman showing successful product update with modified fields](https://cdn.hashnode.com/res/hashnode/image/upload/v1753880928160/d12e58ff-3c14-49f6-a3dd-1d1d2c452e09.png)

### Delete Product By ID (DeleteProduct)

The `DeleteProduct` method permanently removes a product from the database using its ID.

#### Step 1: Select DeleteProduct Method

Select "DeleteProduct" from the method dropdown. Note the simple request structure - it only requires an ID.

#### Step 2: Prepare the Delete Request

```json
{
  "id": "a1b2c3d4-5e6f-7890-abcd-ef1234567890"
}
```

::: warning ⚠️ Warning

This operation permanently deletes the product. Make sure you're using the correct ID.

:::

#### Step 3: Send the Delete Request

Double-check the product ID you want to delete. Click "Invoke" to send the delete request.

#### Step 4: Confirm Deletion

Successful response:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

Verification steps:

1. **Try GetProduct** with the same ID - it should return "Product not found"
2. **Run ListProducts** - the product should no longer appear in the list
3. **Check totalCount** - should be reduced by 1

![Postman showing successful product deletion](https://cdn.hashnode.com/res/hashnode/image/upload/v1753880987953/23bb19f0-7ca0-4cec-b9bb-3774737f98c9.png)

---

## Conclusion

Congratulations! 🎉 You've successfully completed this comprehensive journey into building gRPC services with ASP.NET Core. Throughout this handbook, you've gained hands-on experience with one of the most powerful and efficient communication frameworks available for modern distributed applications.

### What You've Accomplished

Let's recap the impressive skills and knowledge you've acquired:

#### Foundation building

- Set up a complete gRPC project from scratch using .NET CLI
- Configured SQLite database with Entity Framework Core
- Created robust data models with proper validation
- Implemented database migrations and seeding

#### Learning protocol buffers

- Designed comprehensive .proto files with service definitions
- Created strongly-typed message contracts for all CRUD operations
- Understood the advantages of binary serialization over JSON
- Implemented efficient data transfer objects (DTOs)

#### Service implementation

- Built a complete ProductService with all CRUD operations
- Implemented proper error handling and validation
- Added comprehensive logging for debugging and monitoring
- Created efficient pagination for large datasets
- Handled data mapping between entities and Protocol Buffer messages

#### Testing and validation

- Configured Postman for gRPC testing
- Tested all CRUD operations with real data
- Verified data integrity and proper response formatting

### Key Technical Skills Gained

#### gRPC Expertise

- Understanding of the HTTP/2 protocol advantages
- Protocol Buffer schema design and evolution
- Service-to-service communication patterns
- Performance optimization techniques

::: info

🔗 You can access the code [in this GitHub Repository](https://github.com/Clifftech123/IsaiahCliffordOpokuBlog).

<SiteInfo
  name="Clifftech123/IsaiahCliffordOpokuBlog"
  desc="Repository for Isaiah Clifford Opoku&#39;s blog! This is the one-stop destination for all the code snippets, projects, and tutorials featured in my blog posts, where I share insights and tutorials ..."
  url="https://github.com/Clifftech123/IsaiahCliffordOpokuBlog/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f61bfc87de8305f23c8013418040a51d1eb8452cad2d1c8d182e203273f2216b/Clifftech123/IsaiahCliffordOpokuBlog"/>

:::

### Thank You!

Thank you for following along with this comprehensive tutorial. Your dedication to learning these advanced concepts will serve you well in building the next generation of distributed applications.

**Happy coding, and may your services be fast, reliable, and scalable!**

If you want to learn more about .NET Core, you can subscribe to my YouTube channel [here (<VPIcon icon="fa-brands fa-youtube"/>`clifftech`)](https://youtube.com/@clifftech)

::: info 🔗 Connect with the author:

- GitHub: [<VPIcon icon="iconfont icon-github"/>`@CliffTech123`](https://github.com/Clifftech123)
- Twitter: [<VPIcon icon="fa-brands fa-x-twitter"/>`@Clifftech_Dev`](https://x.com/Clifftech_Dev)
- LinkedIn: [Isaiah Clifford Opoku (<VPIcon icon="fa-brands fa-linkedin"/>`isaiah-clifford-opoku`)](https://linkedin.com/in/isaiah-clifford-opoku/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Started with ASP.NET Core and gRPC: A Handbook for Developers",
  "desc": "In today's distributed computing landscape, efficient service-to-service communication is crucial for building scalable, high-performance applications. gRPC (Google Remote Procedure Call) has emerged as one of the most powerful frameworks for creatin...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/get-started-with-aspnet-core-and-grpc-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
