---
lang: en-US
title: "Using Entity Framework Core with MongoDB"
description: "Article(s) > Using Entity Framework Core with MongoDB"
icon: iconfont icon-blazor
category: 
  - C#
  - Blazor
  - Data Science
  - MongoDB
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - cs
  - c#
  - csharp
  - blazor
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using Entity Framework Core with MongoDB"
    - property: og:description
      content: "Using Entity Framework Core with MongoDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/using-entity-framework-core-with-mongodb/
prev: /programming/cs-blazor/articles/README.md
date: 2024-07-29
isOriginal: false
author:
  - name: Beau Carnes
    url : https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721834746254/fb4a9197-8076-48a5-b402-116d8289863c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Blazor > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs-blazor/articles/README.md",
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
  name="Using Entity Framework Core with MongoDB"
  desc="Entity Framework Core is a popular ORM (Object-Relational Mapper) for .NET applications, allowing developers to work with databases using .NET objects. It can be used with many types of databases, including MongoDB. In this article, you will learn ho..."
  url="https://freecodecamp.org/news/using-entity-framework-core-with-mongodb"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1721834746254/fb4a9197-8076-48a5-b402-116d8289863c.png"/>

Entity Framework Core is a popular ORM (Object-Relational Mapper) for .NET applications, allowing developers to work with databases using .NET objects. It can be used with many types of databases, including MongoDB.

In this article, you will learn how you can use Entity Framework Core with MongoDB. This article covers the basics, explains the benefits, and provides a step-by-step tutorial. Whether you're new to MongoDB or Entity Framework Core, or just looking to integrate these tools into your .NET projects, this guide will help you bridge the gap between relational and NoSQL databases.

The article starts with a brief introduction to MongoDB as well as an introduction to Microsoft's Entity Framework Core. Then, it covers how to use the MongoDB EF Core Provider. After going though technical details with some basic examples, you will create a full project with MongoB and Entity Framework Core so you can see how everything works together. The project will use MongoDB Atlas sample data to create a Restaurant reservation system.

There is also a video version of this article that you can [<VPIcon icon="fa-brands fa-youtube"/>watch on the freeCodeCamp.org YouTube channel](https://youtu.be/fv2-A5e-KHA).

<VidStack src="youtube/fv2-A5e-KHA" />

---

## Intro to MongoDB

MongoDB is a popular NoSQL database designed to handle large volumes of data and provide high performance, scalability, and flexibility. Unlike traditional relational databases, MongoDB stores data in flexible, JSON-like documents. This document-oriented approach allows for the storage of complex data structures in a more natural and intuitive way.

In MongoDB, data is stored in collections, which are similar to tables in relational databases but without a fixed schema. This means you can have documents with different structures in the same collection. This flexibility is one of the key advantages of using MongoDB, especially when dealing with unstructured or semi-structured data.

Let's take a look at an example of a MongoDB document. Imagine we have a collection called `users` that stores information about users in an application. Here is what a typical document might look like:

```json
{
  "_id": "12345",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30,
  "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "12345"
  },
  "hobbies": ["reading", "travelling", "coding"]
}
```

In this document, we have various fields such as `name`, `email`, `age`, and `address`. The `address` field itself is an embedded document containing multiple sub-fields like `street`, `city`, `state`, and `zip`. Additionally, the `hobbies` field is an array of strings.

While this looks like JSON, MongoDB stores data in a binary format called BSON (Binary JSON). BSON extends the JSON model to provide additional data types, such as integers, floats, dates, and binary data. This binary format is optimized for performance and flexibility, allowing MongoDB to efficiently store and retrieve data.

Another important feature of MongoDB is its ability to scale horizontally. This means you can distribute your data across multiple servers, making it easier to manage large datasets and ensure high availability. MongoDB also supports rich queries, indexing, and aggregation, making it a powerful tool for a wide range of applications.

For example, you can perform a query to find all users who live in a specific city:

```js
db.users.find({ "address.city": "Anytown" })
```

Or you can find users who have a specific hobby:

```js
db.users.find({ "hobbies": "coding" })
```

MongoDB is widely used in various industries, from e-commerce and content management to real-time analytics and Internet of Things (IoT) applications. Its flexibility and scalability make it an excellent choice for modern applications that need to handle diverse and dynamic data.

Now that we have a basic understanding of what MongoDB is and why it's popular, let's move on to another essential tool in our tech stack: Microsoft's Entity Framework Core.

---

## Intro to Microsoft's Entity Framework Core

Entity Framework Core, often abbreviated as EF Core, is a modern object-database mapper for .NET. It allows developers to work with a database using .NET objects, eliminating the need for most of the data-access code that developers usually need to write.

EF Core is a lightweight, extensible, and cross-platform version of the popular Entity Framework (EF) data access technology. It supports a variety of database engines, including SQL Server, SQLite, and MongoDB.

One of the main benefits of using EF Core is that it enables developers to work with data in a more intuitive and object-oriented way. Instead of writing raw SQL queries, you can interact with your database using LINQ (Language Integrated Query) and strongly-typed classes.

Let's take a look at a basic example. Imagine we have a `Product` class:

```cs
public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

This is pretty simple with just three fields. Using EF Core, you can create a context class that represents a session with the database and includes a `DbSet` for each entity type you want to query or save:

```cs
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)   
    {
        optionsBuilder.Use<Your_SQL_Database_function>("YourConnectionStringHere");
    }
}
```

This code defines a class named `AppDbContext` that inherits from Entity Framework Core's `DbContext` class. This class is used to interact with the database. Inside this class, there is a `DbSet<Product>` property called `Products`, which represents a collection of `Product` entities and corresponds to a table named `Products` in the database. The `OnConfiguring` method is overridden to configure the database connection, you can specify various databases as the database provider. The method uses an `optionsBuilder` to set up the connection with a placeholder for the actual database connection string. This connection string obviously should be replaced with the real one containing the necessary details to connect to the database. When you create an instance of `AppDbContext` in the application, it uses this configuration to perform operations like querying or saving `Product` entities in the `Products` table.

With this setup, you can perform CRUD (Create, Read, Update, Delete) operations using EF Core. For example, to add a new product to the database, you can use this code.

```cs
using (var context = new AppDbContext())
{
    var product = new Product { Name = "Laptop", Price = 999.99M };
    context.Products.Add(product);
    context.SaveChanges();
}
```

This code demonstrates how to add a new product to the database using Entity Framework Core. An instance of `AppDbContext` is created, and within this context, a new `Product` object with the name "Laptop" and price 999.99 is instantiated. This new product is then added to the `Products` collection managed by the `AppDbContext`. Finally, the `SaveChanges` method is called to save the changes to the database, effectively inserting the new product into the `Products` table.

To query products, you can use LINQ:

```cs
using (var context = new AppDbContext())
{
    var products = context.Products.Where(p => p.Price > 500).ToList();
    foreach (var product in products)
    {
        Console.WriteLine($"Product: {product.Name}, Price: {product.Price}");  
    }
}
```

This code demonstrates how to query the database using Entity Framework Core. An instance of `AppDbContext` is created, and within this context, a query is made to retrieve all products with a price greater than 500. The results are stored in a list called `products`. Then, a loop iterates through each product in the list, printing the name and price of each product to the console.

EF Core takes care of translating these LINQ queries into the appropriate SQL commands for your database, making data access simpler and more maintainable.

EF Core also supports advanced features like change tracking, lazy loading, and migrations, which help you manage database schema changes over time.

In summary, EF Core is a powerful ORM that simplifies data access in .NET applications by allowing you to work with your data using .NET objects and LINQ. Its support for multiple database engines and its extensibility make it a versatile choice for a wide range of applications.

Next, we'll see how the MongoDB EF Core Provider bridges the gap between MongoDB and EF Core, allowing us to use the familiar EF Core patterns with a MongoDB database.

---

## How the MongoDB EF Core Provider Bridges the Gap

The MongoDB Entity Framework Core Provider is a tool that enables developers to use MongoDB with Entity Framework Core (EF Core), combining the flexibility of MongoDB with the familiar API and design patterns of EF Core. This provider allows you to work with MongoDB using the same code-first and LINQ query methodologies that you would use with relational databases, streamlining development and reducing the learning curve for those already familiar with EF Core.

The MongoDB EF Core Provider bridges the gap between MongoDB and EF Core by supporting basic CRUD operations, LINQ queries, and embedded documents, among other features. Here are some key capabilities:

### 1. Code-First Workflows

You can define your data models in C# and use EF Core to generate the MongoDB schema, rather than starting with the database schema and generating code from it. This is particularly useful for developers who prefer to manage their database structure through code.

### 2. CRUD Operations

The provider supports basic create, read, update, and delete operations. For example, you can add a new record to the database using the same code we saw earlier:

```cs
using (var context = new AppDbContext())
{
    var product = new Product { Name = "Laptop", Price = 999.99M };
    context.Products.Add(product);
    context.SaveChanges();
}
```

### 3. LINQ Query Support

You can use LINQ to perform queries against MongoDB, allowing you to leverage your existing knowledge of C# and .NET to interact with the database.

```cs
using (var context = new AppDbContext())
{
    var products = context.Products.Where(p => p.Price > 500).ToList();
    foreach (var product in products)
    {
        Console.WriteLine($"Product: {product.Name}, Price: {product.Price}");
    }
}
```

### 4. Change Tracking

EF Core’s change tracking capabilities are supported, enabling automatic detection and saving of changes made to your data entities.
### 5. Embedded Documents

The provider supports embedded documents, allowing you to store related data within a single document, which is a common pattern in MongoDB.
### 6. Class Mapping and Serialization

Your C# classes are mapped to MongoDB collections, with support for various data types and serialization settings to ensure that data is stored correctly.

---

## Data Modeling and CRUD Operations Using MongoDB Atlas

Now we'll go over a quick example on how to use the MongoDB EF Core Provider. But soon, we'll create a full project in Visual Studio Code so you can see everything in context.

In this section, we will explore how to define data models and perform CRUD (Create, Read, Update, Delete) operations using the MongoDB Entity Framework Core (EF) Provider with MongoDB Atlas. This integration allows you to leverage the flexibility of MongoDB with the familiar patterns of EF Core.

### Setting Up Your Environment

To get started, you need to add the necessary NuGet packages to your project:

```sh
dotnet add package MongoDB.EntityFrameworkCore
```

The MS EF Core Package and the MongoDB C# Driver are added as a dependency when you add the MongoDB EF Core provider package. These packages allow your application to interact with MongoDB through EF Core, using the same context and entity definitions you would use with a relational database.

### Setting Up MongoDB Atlas

Before you can perform CRUD operations, you need to set up a MongoDB Atlas cluster and connect your application to it.

Here are the steps. Note that we'll be going over these in detail when we create the project soon.

#### 1. Create a MongoDB Atlas Account

Sign up for a free account at [<VPIcon icon="iconfont icon-mongodb"/>MongoDB Atlas](https://mongodb.com/cloud/atlas/register?utm_campaign=freecodecamp_ef&utm_source=freecodecamp&utm_medium=referral).

#### 2. Create a Cluster

Set up a new cluster. MongoDB Atlas provides a free tier that is perfect for development and small-scale applications.

#### 3. Get Connection String

Obtain your connection string from the MongoDB Atlas dashboard. It will look something like this:

```plaintext title="url"
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### Defining the Data Model

Define a class to use as a model for your entity. For this example, we'll create a `Customer` class:

```cs
public class Customer
{
    public ObjectId Id { get; set; }
    public String Name { get; set; }
    public String Order { get; set; }
}
```

This `Customer` class represents the structure of the documents stored in the MongoDB collection.

### Create a DB Context Class

To begin using Entity Framework Core, create a context class that derives from DBContext. The`DbContext` derived class instance represents a database session and is used to query and save instances of your entities.

The `DBContext` class exposes `DBSet` properties that specify the entities you can interact with while using that context.

This example creates an instance of a `DBContext` derived class and specifies the `Customer` object as a `DBSet` property:

```cs
public class MyDbContext : DbContext
{
    public DbSet<Customer> Customers { get; init; }

    public MyDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Customer>().ToCollection("customers");
    }
}
```

### Code-First Workflow

With the MongoDB EF Provider, you can use a code-first workflow. This means you define your classes first, and EF Core will handle the creation and management of the underlying MongoDB schema. This is particularly useful for MongoDB, which does not enforce a schema, allowing for flexible and dynamic data structures.

#### Use MongoDB

Once we've created a `DBContext` class, we need to construct a `DbContextOptionsBuilder` object and call its `UseMongoDB()` method. This method takes two parameters: a `MongoClient` instance and the name of the database that stores the collections you are working with.

The `UseMongoDB()` method returns a `DbContextOptions` object. Pass the `Options` property of this object to the constructor for your `DBContext` class.

```cs
var mongoClient = new MongoClient("<Your MongoDB Connection URI>");

var dbContextOptions =
    new DbContextOptionsBuilder<MyDbContext>().UseMongoDB(mongoClient, "<Database Name");  

var db = new MyDbContext(dbContextOptions.Options);
```

### CRUD Operations

Now let's see how to code the CRUD operations. We'll just focus on each operation individually.

#### Create Operation

To create a new document in MongoDB, you use the `Add` method on the `DbSet` and call `SaveChanges`. This is an example of creating a new customer:

```cs
using (var context = new MyDbContext(options))
{
    var customer = new Customer { Name = "Beau Carnes", Order = "Laptop" };
    context.Customers.Add(customer);
    context.SaveChanges();
}
```

This code creates a new `Customer` instance and adds it to the `Customers` collection. The `SaveChanges` method saves the new customer to the MongoDB database.

#### Read Operation

To read documents from the MongoDB collection, you can use LINQ queries on the `DbSet`. This is an example of retrieving all customers:

```cs
using (var context = new MyDbContext(options))
{
    var customers = context.Customers.ToList();
    foreach (var customer in customers)
    {
        Console.WriteLine($"Customer: {customer.Name}, Order: {customer.Order}"); 
    }
}
```

This code retrieves all customers from the `Customers` collection and prints their details.

#### Update Operation

To update an existing document, you retrieve the document, modify its properties, and call `SaveChanges`. This is an example of updating a customer's order:

```cs
using (var context = new MyDbContext(options))
{
    var customer = context.Customers.FirstOrDefault(c => c.Name == "Beau Carnes"); 
    if (customer != null)
    {
        customer.Order = "Smartphone";
        context.SaveChanges();
    }
}
```

This code finds the customer named "Beau Carnes" and updates their order to "Smartphone".

#### Delete Operation

To delete a document, you retrieve the document, remove it from the `DbSet`, and call `SaveChanges`. This is an example of deleting a customer:

```cs
using (var context = new MyDbContext(options))
{
    var customer = context.Customers.FirstOrDefault(c => c.Name == "Beau Carnes"); 
    if (customer != null)
    {
        context.Customers.Remove(customer);
        context.SaveChanges();
    }
}
```

This code finds the customer named "Beau Carnes" and deletes them from the `Customers` collection.

#### Change Tracking

EF Core's change tracking capabilities are fully supported, enabling efficient updates to documents. When you modify an entity and call `SaveChanges`, EF Core will generate the necessary MongoDB commands to update only the changed fields.

By using the MongoDB EF Provider, you can seamlessly integrate MongoDB's flexible document model with EF Core's robust ORM capabilities, providing a powerful toolset for .NET developers to build modern applications.

---

## Tutorial

Now let's put everything together and create a restaurant reservation system.

::: note Prerequisites

In order to follow along with this tutorial, you are going to need a few things:

- .NET 7.0.
- Basic knowledge of ASP.NET MVC and C#.
- Free [<VPIcon icon="iconfont icon-mongodb"/>MongoDB Atlas account and free tier cluster.](https://mongodb.com/try)

:::

---

## Create the project

ASP.NET Core is a very flexible web framework, allowing you to scaffold out different types of web applications that have slight differences in terms of their UI or structure. For this tutorial, we are going to create an MVC project that will make use of static files and controllers. There are other types of front end you could use, such as React, but MVC with .cshtml views is the most commonly used. To create the project, we are going to use the .NET CLI:

```sh
dotnet new mvc -o RestRes
```

Because we used the CLI, although easier, it only creates the csproj file and not the solution file which allows us to open it in Visual Studio, so we will fix that.

```sh
cd RestRes
dotnet new sln
dotnet sln .\RestRes.sln add .\RestRes.csproj
```

---

## Add the NuGet packages

Now that we have the new project created, we will want to go ahead and add the required NuGet packages. Either using the NuGet Package Manager or using the .NET CLI command below, add the MongoDB `MongoDB.EntityFrameworkCore` package.

```sh
dotnet add package MongoDB.EntityFrameworkCore
```

---

## Create the models

Before we can start implementing the new packages we just added, we need to create the models that represent the entities we want in our restaurant reservation system that will of course be stored in MongoDB Atlas as documents. In the following subsections, we will create the following models:

- Restaurant
- Reservation
- MongoDBSettings

### Restaurant

First, we need to create our restaurant model that will represent the restaurants that are available to be reserved in our system.

1. Create a new file in the Models folder called Restaurant.cs.
2. Add the following code:

```cs :collapsed-lines
using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace RestRes.Models
{
    [Collection("restaurants")]    
    public class Restaurant
    {

        public ObjectId Id { get; set; }

        [Required(ErrorMessage = "You must provide a name")]
        [Display(Name = "Name")]
        public string? name { get; set; }


        [Required(ErrorMessage = "You must add a cuisine type")]
        [Display(Name = "Cuisine")]
        public string? cuisine { get; set; }


        [Required(ErrorMessage = "You must add the borough of the restaurant")]
        public string? borough { get; set; }

    }
}
```

The collection attribute before the class tells the application what collection inside the database we are using. This allows us to have differing names or capitalization between our class and our collection should we want to.

### Reservation

We also need to create a reservation class to represent any reservations we take in our system.

1. Create a new file inside the Models folder called Reservation.cs.
2. Add the following code to it:

```cs :collapsed-lines
using MongoDB.Bson;
using MongoDB.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace RestRes.Models
{
    [Collection("reservations")]
    public class Reservation
    {
        public ObjectId Id { get; set; }


        public ObjectId RestaurantId { get; set; }


        public string? RestaurantName { get; set; }

        [Required(ErrorMessage = "The date and time is required to make this reservation")]
        [Display(Name = "Date")]
        public DateTime date { get; set; }

    }
}
```

### MongoDBSettings

Although it won’t be a document in our database, we need a model class to store our MongoDB-related settings so they can be used across the application.

1. Create another file in Models called MongoDBSettings.cs.
2. Add the following code:

```cs
namespace RestRes.Models
{
  public class MongoDBSettings
  {
      public string AtlasURI { get; set; }
      public string DatabaseName { get; set; }
  }
}
```

---

## Setting up EF Core

This is the exciting part. We are going to start to implement EF Core and take advantage of the new MongoDB Provider. If you are used to working with EF Core already, some of this will be familiar to you.

### `RestaurantReservationDbContext`

1. Create a Services folder, and the create a file called <VPIcon icon="iconfont icon-csharp"/>`RestaurantReservationDbContext.cs`.
2. Replace the code inside the namespace with the following:

```cs
using Microsoft.EntityFrameworkCore;
using RestRes.Models;

namespace RestRes.Services
{
    public class RestaurantReservationDbContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; init; }  
        
        public DbSet<Reservation> Reservations { get; init; }


        public RestaurantReservationDbContext(DbContextOptions options)
        : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Restaurant>();
            modelBuilder.Entity<Reservation>();
        }
    }
}
```

If you are used to EF Core, this will look familiar. The class extends the DbContext and we create DbSet properties that store the models that will also be present in the database. We also override the OnModelCreating method. You may notice that unlike when using SQL Server, we don’t call .ToTable(). We could call ToCollection instead but this isn’t required here as we specify the collection using attributes on the classes.

### Add connection string and database details to appsettings

Earlier, we created a MongoDBSettings model, and now we need to add the values that the properties map to into our appsettings.

1. In both <VPIcon icon="iconfont icon-json"/>`appsettings.json` and <VPIcon icon="iconfont icon-json"/>`appsettings.Development.json`, add the following new section:

```json title="appsettings.json"
"MongoDBSettings": {
  "AtlasURI": "mongodb+srv://<username>:<password>@<url>",
  "DatabaseName": "restaurants"
}
```

2. Replace the Atlas URI with your own connection string from Atlas.

### Updating <VPIcon icon="iconfont icon-csharp"/>`program.cs`

Now we have configured our models and DbContext, it is time to add them to our <VPIcon icon="fa-brands fa-csharp"/>`program.cs` file.

After the existing line `builder.Services.AddControllersWithViews();`, add the following code:

```cs
var mongoDBSettings = builder.Configuration.GetSection("MongoDBSettings").Get<MongoDBSettings>();
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.AddDbContext<RestaurantReservationDbContext>(options =>
options.UseMongoDB(mongoDBSettings.AtlasURI ?? "", mongoDBSettings.DatabaseName ?? ""));
```

---

## Creating the services

Now, it is time to add the services we will use to talk to the database via the RestaurantBookingDbContext we created. For each service, we will create an interface and the class that implements it.

### `IRestaurantService` and `RestaurantService`

The first interface and service we will implement is for carrying out the CRUD operations on the restaurants collection. This is known as the repository pattern. You may see people interact with the DbContext directly. But most people use this pattern, which is why we are including it here.

1. If you haven’t already, create a Services folder to store our new classes.
2. Create an `IRestaurantService` interface and add the following code for the methods we will implement:

```cs
using MongoDB.Bson;
using RestRes.Models;

namespace RestRes.Services
{
    public interface IRestaurantService
    {
        IEnumerable<Restaurant> GetAllRestaurants();
        Restaurant? GetRestaurantById(ObjectId id);

        void AddRestaurant(Restaurant newRestaurant);

        void EditRestaurant(Restaurant updatedRestaurant);

        void DeleteRestaurant(Restaurant restaurantToDelete);
    }
}
```

1. Create a `RestaurantService` class file.
2. Update the `RestaurantService` class declaration so it implements the `IRestaurantService` we just created:

```cs :collapsed-lines
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using RestRes.Models;

namespace RestRes.Services
{
  public class RestaurantService : IRestaurantService
  {
    private readonly RestaurantReservationDbContext _restaurantDbContext;
    public RestaurantService(RestaurantReservationDbContext restaurantDbContext)
    {
        _restaurantDbContext = restaurantDbContext;
    }

    public void AddRestaurant(Restaurant restaurant)
    {
      _restaurantDbContext.Restaurants.Add(restaurant);

      _restaurantDbContext.ChangeTracker.DetectChanges();
      Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);

      _restaurantDbContext.SaveChanges();
    }

    public void DeleteRestaurant(Restaurant restaurant)
    {
      var restaurantToDelete = _restaurantDbContext.Restaurants.Where(c => c.Id == restaurant.Id).FirstOrDefault();

      if(restaurantToDelete != null) {
          _restaurantDbContext.Restaurants.Remove(restaurantToDelete);
        _restaurantDbContext.ChangeTracker.DetectChanges();
          Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);
          _restaurantDbContext.SaveChanges();
          }
        else {
            throw new ArgumentException("The restaurant to delete cannot be found.");
        }
    }

    public void EditRestaurant(Restaurant restaurant)
    {
          var restaurantToUpdate = _restaurantDbContext.Restaurants.FirstOrDefault(c => c.Id == restaurant.Id);

        if(restaurantToUpdate != null)
        {                
            restaurantToUpdate.name = restaurant.name;
            restaurantToUpdate.cuisine = restaurant.cuisine;
            restaurantToUpdate.borough = restaurant.borough;

            _restaurantDbContext.Restaurants.Update(restaurantToUpdate);

            _restaurantDbContext.ChangeTracker.DetectChanges();
            Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);

            _restaurantDbContext.SaveChanges();

        }
      else
        {
            throw new ArgumentException("The restaurant to update cannot be found. ");
        }
    }    
        public IEnumerable<Restaurant> GetAllRestaurants()
    {
      return _restaurantDbContext.Restaurants.OrderByDescending(c => c.Id).Take(20).AsNoTracking().AsEnumerable<Restaurant>();
    }

    public Restaurant? GetRestaurantById(ObjectId id)
    {
      return _restaurantDbContext.Restaurants.FirstOrDefault(c  => c.Id == id);
    }
  }

}
```

### `IReservationService` and `ReservationService`

Next up is our `IReservationService` and `ReservationService`.

Create the `IReservationService` interface and add the following methods:

```cs
using MongoDB.Bson;
using RestRes.Models;

namespace RestRes.Services
{
    public interface IReservationService
    {
        IEnumerable<Reservation> GetAllReservations();
        Reservation? GetReservationById(ObjectId id);

        void AddReservation(Reservation newReservation);

        void EditReservation(Reservation updatedReservation);

        void DeleteReservation(Reservation reservationToDelete);
    }
}
```

Create the `ReservationService` class, and replace your class with the following code that implements all the methods:

```cs :collapsed-lines
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using RestRes.Models;

namespace RestRes.Services
{
    public class ReservationService : IReservationService
    {
        private readonly RestaurantReservationDbContext _restaurantDbContext;

        public ReservationService(RestaurantReservationDbContext restaurantDbContext)
        {
            _restaurantDbContext = restaurantDbContext;
        }
        public void AddReservation(Reservation newReservation)
        {
            var bookedRestaurant = _restaurantDbContext.Restaurants.FirstOrDefault(c => c.Id == newReservation.RestaurantId);
            if (bookedRestaurant == null)
            {
                throw new ArgumentException("The restaurant to be reserved cannot be found.");
            }

            newReservation.RestaurantName = bookedRestaurant.name;

            _restaurantDbContext.Reservations.Add(newReservation);

            _restaurantDbContext.ChangeTracker.DetectChanges();
            Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);

            _restaurantDbContext.SaveChanges();
        }

        public void DeleteReservation(Reservation reservation)
        {
            var reservationToDelete = _restaurantDbContext.Reservations.FirstOrDefault(b => b.Id == reservation.Id);

            if(reservationToDelete != null)
            {
                _restaurantDbContext.Reservations.Remove(reservationToDelete);

                _restaurantDbContext.ChangeTracker.DetectChanges();
                Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);

                _restaurantDbContext.SaveChanges();
            }
            else
            {
                throw new ArgumentException("The reservation to delete cannot be found.");
            }
        }

        public void EditReservation(Reservation updatedReservation)
        {
           var reservationToUpdate = _restaurantDbContext.Reservations.FirstOrDefault(b => b.Id == updatedReservation.Id);


            if (reservationToUpdate != null)
            {               
                reservationToUpdate.date = updatedReservation.date;

                _restaurantDbContext.Reservations.Update(reservationToUpdate);

                _restaurantDbContext.ChangeTracker.DetectChanges();
                _restaurantDbContext.SaveChanges();

                Console.WriteLine(_restaurantDbContext.ChangeTracker.DebugView.LongView);
            }  
            else 
            { 
                throw new ArgumentException("Reservation to be updated cannot be found");
            }

        }

        public IEnumerable<Reservation> GetAllReservations()
        {
            return _restaurantDbContext.Reservations.OrderBy(b => b.date).Take(20).AsNoTracking().AsEnumerable<Reservation>();
        }

        public Reservation? GetReservationById(ObjectId id)
        {
            return _restaurantDbContext.Reservations.AsNoTracking().FirstOrDefault(b => b.Id == id);
        }

    }
}
```

This code is very similar to the code for the RestaurantService class but for reservations instead.

### Adding them to Dependency Injection

The final step for the services is to add them to the dependency injection container.

Inside Program.cs, add the following code after the code we added there earlier:

```cs
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
```

---

## Creating the view models

Before we implement the front end, we need to add the view models that will act as a messenger between our front and back ends where required. Even though our application is quite simple, implementing the view model is still good practice as it helps decouple the pieces of the app.

### `RestaurantListViewModel`

The first one we will add is the `RestaurantListViewModel`. This will be used as the model in our Razor page later on for listing restaurants in our database.

1. Create a new folder in the root of the project called ViewModels.
2. Add a new file called <VPIcon icon="iconfont icon-csharp"/>`RestaurantListViewModel.cs`.
3. Add the following code:

```cs title="RestaurantListViewModel.cs"
using RestRes.Models;

namespace RestRes.ViewModels
{
    public class RestaurantListViewModel
    {        
        public IEnumerable<Restaurant>? Restaurants { get; set; }
    }
}
```

### `RestaurantAddViewModel`

We also want a view model that can be used by the Add view we will add later.

1. Inside the ViewModels folder, create a new file called <VPIcon icon="iconfont icon-csharp"/>`RestaurantAddViewMode.cs`.
2. Add:

```cs title="RestaurantAddViewMode.cs"
using RestRes.Models;

namespace RestRes.ViewModels
{
    public class RestaurantAddViewModel
    {
        public Restaurant? Restaurant { get; set; } 
    }
}
```

### `ReservationListViewModel`

Now, we want to do something very similar for reservations, starting with `ReservationListViewModel`.

1. Create a new file in the ViewModels folder called <VPIcon icon="iconfont icon-csharp"/>`ReservationListViewModel.cs`.
2. Add:

```cs title="ReservationListViewModel.cs"
using RestRes.Models;

namespace RestRes.ViewModels
{
    public class ReservationListViewModel
    {
        public IEnumerable<Reservation>? Reservations { get; set; }
    }
}
```

### `ReservationAddViewModel`

Finally, we have our `ReservationAddViewModel`.

Create the file and add this code:

```cs
using RestRes.Models;

namespace RestRes.ViewModels
{
    public class ReservationAddViewModel
    {
        public Reservation? Reservation { get; set; }
    }
}
```

### Adding to _ViewImports

Later on, we will be adding references to our models and viewmodels in the views. In order for the application to know what they are, we need to add references to them in the <VPIcon icon="fa-brands fa-html5"/>`_ViewImports.cshtml` file inside the Views folder.

There will already be some references in there, including TagHelpers, so we want to add references to our <VPIcon icon="fas fa-folder-open"/>`.Models` and <VPIcon icon="fas fa-folder-open"/>`.ViewModels` folders. So the top of the file should look like this:

```cshtml title="_ViewImports.cshtml"
@using RestRes
@using RestRes.Models
@using RestRes.ViewModels
```

---

## Creating the controllers

Now that we have the backend implementation and the view models we will refer to, we can start working toward the front end. We will be creating two controllers: one for Restaurant and one for Reservation.

### `RestaurantController`

The first controller we will add is for the restaurant.

1. Inside the existing Controllers folder, add a new controller file called <VPIcon icon="iconfont icon-csharp"/>`RestaurantController.cs`. If using Visual Studio, use the MVC Controller - Empty controller template.
2. Add this code:

```cs :collapsed-lines title="RestaurantController.cs"
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using RestRes.Models;
using RestRes.Services;
using RestRes.ViewModels;

namespace RestRes.Controllers
{
    public class RestaurantController : Controller
    {
        private readonly IRestaurantService _RestaurantService;

        public RestaurantController(IRestaurantService RestaurantService)
        {
            _RestaurantService = RestaurantService;
        }
        public IActionResult Index()
        {
            RestaurantListViewModel viewModel = new()
            {
                Restaurants = _RestaurantService.GetAllRestaurants(),
            };
            return View(viewModel);
        }

        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(RestaurantAddViewModel restaurantAddViewModel)
        {
            if(ModelState.IsValid)
            {
                Restaurant newRestaurant = new()
                {
                    name = restaurantAddViewModel.Restaurant.name,
                    borough = restaurantAddViewModel.Restaurant.borough,
                    cuisine = restaurantAddViewModel.Restaurant.cuisine
                };

                _RestaurantService.AddRestaurant(newRestaurant);
                return RedirectToAction("Index");
            }

            return View(restaurantAddViewModel);         
        }

        public IActionResult Edit(ObjectId id)
        {
            if(id == null || id == ObjectId.Empty)
            {
                return NotFound();
            }

            var selectedRestaurant = _RestaurantService.GetRestaurantById(id);
            return View(selectedRestaurant);
        }

        [HttpPost]
        public IActionResult Edit(Restaurant restaurant)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    _RestaurantService.EditRestaurant(restaurant);
                    return RedirectToAction("Index");
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Updating the restaurant failed, please try again! Error: {ex.Message}");
            }

            return View(restaurant);
        }

        public IActionResult Delete(ObjectId id) {
            if (id == null || id == ObjectId.Empty)
            {
                return NotFound();
            }

            var selectedRestaurant = _RestaurantService.GetRestaurantById(id);
            return View(selectedRestaurant);
        }

        [HttpPost]
        public IActionResult Delete(Restaurant restaurant)
        {
            if (restaurant.Id == ObjectId.Empty)
            {
                ViewData["ErrorMessage"] = "Deleting the restaurant failed, invalid ID!";
                return View();
            }

            try
            {
                _RestaurantService.DeleteRestaurant(restaurant);
                TempData["RestaurantDeleted"] = "Restaurant deleted successfully!";

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ViewData["ErrorMessage"] = $"Deleting the restaurant failed, please try again! Error: {ex.Message}";
            }

            var selectedRestaurant = _RestaurantService.GetRestaurantById(restaurant.Id);
            return View(selectedRestaurant);
        }        
    }
}
```

### `ReservationController`

Now for the reservation controller. This is very similar to the RestaurantController but it has a reference to both the restaurant and reservation service as we need to associate a restaurant with a reservation. This is because at the moment, the EF Core Provider doesn’t support relationships between entities so we can relate entities in a different way.

1. Create another empty MVC Controller file called <VPIcon icon="iconfont icon-csharp"/>`ReservationController.cs`.
2. Paste the following code:

```cs :collapsed-lines title="ReservationController.cs"
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using RestRes.Models;
using RestRes.Services;
using RestRes.ViewModels;

namespace RestRes.Controllers
{
    public class ReservationController : Controller
    {
        private readonly IReservationService _ReservationService;
        private readonly IRestaurantService _RestaurantService;    
                public ReservationController(IReservationService ReservationService, IRestaurantService RestaurantService)
        {
            _ReservationService = ReservationService;
            _RestaurantService = RestaurantService;
        }

        public IActionResult Index()
        {
            ReservationListViewModel viewModel = new ReservationListViewModel()
            {
                Reservations = _ReservationService.GetAllReservations()
            };
            return View(viewModel);
        }

        public IActionResult Add(ObjectId restaurantId)
        {
            var selectedRestaurant = _RestaurantService.GetRestaurantById(restaurantId);

            ReservationAddViewModel reservationAddViewModel = new ReservationAddViewModel();

            reservationAddViewModel.Reservation = new Reservation();
            reservationAddViewModel.Reservation.RestaurantId = selectedRestaurant.Id;
            reservationAddViewModel.Reservation.RestaurantName = selectedRestaurant.name;
            reservationAddViewModel.Reservation.date = DateTime.UtcNow;

            return View(reservationAddViewModel);
        }

        [HttpPost]
        public IActionResult Add(ReservationAddViewModel reservationAddViewModel)
        {
                Reservation newReservation = new()
                {
                    RestaurantId = reservationAddViewModel.Reservation.RestaurantId,                   
                    date = reservationAddViewModel.Reservation.date,
                };

                _ReservationService.AddReservation(newReservation);
                return RedirectToAction("Index");   
        }

        public IActionResult Edit(string Id)
        {
            if(Id == null || string.IsNullOrEmpty(Id))
            {
                return NotFound();
            }

            var selectedReservation = _ReservationService.GetReservationById(new ObjectId(Id));
            return View(selectedReservation);
        }

        [HttpPost]
        public IActionResult Edit(Reservation reservation)
        {
            try
            {
                var existingReservation = _ReservationService.GetReservationById(reservation.Id);
                if (existingReservation != null)
                {
                    _ReservationService.EditReservation(reservation);
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError("", $"Reservation with ID {reservation.Id} does not exist!");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Updating the reservation failed, please try again! Error: {ex.Message}");
            }

            return View(reservation);
        }

        public IActionResult Delete(string Id)
        {
            if (Id == null || string.IsNullOrEmpty(Id))
            {
                return NotFound();
            }

            var selectedReservation = _ReservationService.GetReservationById(new ObjectId(Id));
            return View(selectedReservation);
        }

        [HttpPost]
        public IActionResult Delete(Reservation reservation)
        {
            if(reservation.Id == null)
            {
                ViewData["ErrorMessage"] = "Deleting the reservation failed, invalid ID!";
                return View();
            }

            try
            {
                _ReservationService.DeleteReservation(reservation);
                TempData["ReservationDeleted"] = "Reservation deleted successfully";

                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                ViewData["ErrorMessage"] = $"Deleting the reservation failed, please try again! Error: {ex.Message}";
            }

            var selectedRestaurant = _ReservationService.GetReservationById(reservation.Id);
            return View(selectedRestaurant);
        }
    }
}
```

---

## Creating the views

Now we have the back end and the controllers prepped with the endpoints for our restaurant reservation system, it is time to implement the views. This will be using Razor pages. You will also see reference to classes from Bootstrap as this is the CSS framework that comes with MVC applications out of the box. We will be providing views for the CRUD operations for both listings and bookings.

### Listing Restaurants

First, we will provide a view that will map to the root of `/Restaurant`, which will by convention look at the Index method we implemented.

ASP.NET Core MVC uses a convention pattern whereby you name the `.cshtml` file the name of the endpoint/method it uses and it lives inside a folder named after its controller.

1. Inside the Views folder, create a new subfolder called <VPIcon icon="fas fa-folder-open"/>`Restaurant`.
2. Inside that <VPIcon icon="fas fa-folder-open"/>`Restaurant` folder, add a new view by creating a file called <VPIcon icon="fa-brands fa-html5"/>`Index.cshtml`. If using the available templates, you want Razor View - Empty. Name the view Index.
3. Add this code:

```html :collapsed-lines title="Index.cshtml"
@model RestaurantListViewModel

@if (TempData["RestaurantDeleted"] != null)
{
    <p class="text-success">@TempData["RestaurantDeleted"]</p>
}


@if (!Model.Restaurants.Any())
{
    <p>No results</p>
}
else
{
    <table class="table table-condensed table-bordered">
        <tr>
            <th>
                Name
            </th>
            <th>
                Cuisine
            </th>
            <th>
                Borough
            </th>            
            <th>
                Actions
            </th>
        </tr>

        @foreach (var restaurant in Model.Restaurants)
        {
            <tr>
                <td>@restaurant.name</td>
                <td>@restaurant.cuisine</td>
                <td>@restaurant.borough</td>                
                <td>
                    <a asp-action="Edit" asp-route-id="@restaurant.Id.ToString()">Edit</a>
                    <a asp-action="Delete" asp-route-id="@restaurant.Id.ToString()">Delete</a>
                    <a asp-controller="Reservation" asp-action="Add" asp-route-restaurantId="@restaurant.Id.ToString()">Reserve</a>
                </td>
            </tr>
        }

    </table>
}

<p>
    <a class="btn btn-primary" asp-action="Add">Add new restaurant</a>
</p>
```

Now let's update the default route from Home to /Restaurant.

In Program.cs, inside `app.MapControllerRoute`, replace the pattern line with the following:

```cs
pattern: "{controller=Restaurant}/{action=Index}/{id?}");
```

If we ran this now, the buttons would lead to 404s because we haven’t implemented them yet. So let’s do that now.

### Adding restaurants

We will start with the form for adding new restaurants.

1. Add a new, empty Razor View inside the <VPIcon icon="fas fa-folder-open"/>`Restaurant` subfolder called <VPIcon icon="fa-brands fa-html5"/>`Add.cshtml`.
2. Add the following code:

```html title="Restaurant/Add.cshtml"
@model RestaurantAddViewModel

<h2>Create a new restaurant</h2>
<hr />

@if (ViewData["ErrorMessage"] != null)
{
    <p class="text-danger">@ViewData["ErrorMessage"]</p>
}

<form method="post" asp-controller="Restaurant" asp-action="Add">
    <div asp-validation-summary="All" class="text-danger"></div>

    <div class="mb-3">
        <label asp-for="Restaurant.name" class="form-label"></label>
        <input asp-for="Restaurant.name" class="form-control" />
        <span asp-validation-for="Restaurant.name" class="text-danger"></span>
    </div>

    <div class="mb-3">
        <label asp-for="Restaurant.cuisine" class="form-label"></label>
        <input asp-for="Restaurant.cuisine" class="form-control" />
        <span asp-validation-for="Restaurant.cuisine" class="text-danger"></span>
    </div>

      <div class="mb-3">
        <label asp-for="Restaurant.borough" class="form-label">Borough</label>
        <input asp-for="Restaurant.borough" class="form-control" />
        <span asp-validation-for="Restaurant.borough" class="text-danger"></span>
    </div>

    <input type="submit" value="Add restaurant" class="btn btn-primary" />
</form>

<div>
    <a asp-controller="Restaurant" asp-action="Index">Back to list</a>
</div>
```

### Editing restaurants

The code for the Edit page is almost identical to Add, but it uses the Restaurant as a model as it will use the restaurant it is passed to pre-populate the form for editing.

1. Add another view inside the `Restaurant` subfolder called <VPIcon icon="fa-brands fa-html5"/>`Edit.cshtml`.
2. Add the following code:

```html :collapsed-lines title="Restaurant/Edit.cshtml"
@model Restaurant

<h2>Update @Model.name</h2>
<hr />

<form method="post" asp-controller="Restaurant" asp-action="Edit">
    <div asp-validation-summary="ModelOnly" class="text-danger"></div>
    <input type="hidden" asp-for="Id" />

    <div class="mb-3">
        <label asp-for="name" class="form-label">Name</label>
        <input asp-for="name" class="form-control" />
        <span asp-validation-for="name" class="text-danger"/>
    </div>
    <div class="mb-3">
        <label asp-for="cuisine" class="form-label"></label>
        <input asp-for="cuisine" class="form-control" />
        <span asp-validation-for="cuisine" class="text-danger"/>
    </div>
    <div class="mb-3">
        <label asp-for="borough" class="form-label">Borough</label>
        <input asp-for="borough" class="form-control" />
        <span asp-validation-for="borough" class="text-danger"/>
    </div>
    <input type="submit" value="Update restaurant" class="btn btn-primary" />
</form>
<div>
    <a asp-controller="Restaurant" asp-action="Index">Back to list</a>
</div>
```

### Deleting restaurants

The final page we need to implement is the page that is called when the delete button is clicked.

1. Create a new empty View called <VPIcon icon="fa-brands fa-html5"/>`Delete.cshtml`.
2. Add the following code:

```html :collapsed-lines title="Restaurant/Delete.cshtml"
@model Restaurant

<h2>Deleting @Model.name</h2>
<hr />

@if(ViewData["ErrorMessage"] != null)
{
    <p class="text-danger">@ViewData["ErrorMessage"]</p>
}

<div>
    <dl class="row">
        <dt class="col-sm-4">
            <label asp-for="name">Name</label>
        </dt>
        <dd class="col-sm-10">
            @Model?.name
        </dd>
        <dt class="col-sm-2">
            <label asp-for="cuisine"></label>
        </dt>
        <dd class="col-sm-10">
            @Model?.cuisine
        </dd>
        <dt class="col-sm-2">
            <label asp-for="borough">Borough</label>
        </dt>
        <dd class="col-sm-10">
            @Model?.borough
        </dd>

    </dl>
</div>

<form method="post" asp-action="Delete">
    <input type="hidden" asp-for="Id" />
    <input type="submit" value="Delete restaurant" class="btn btn-danger" onclick="javascript: return confirm('Are you sure you want to delete this restaurant?');" />
</form>

<div>
    <a asp-controller="Restaurant" asp-action="Index">Back to list</a>
</div>
```

### Listing reservations

We have added the views for the restaurants so now we will add the views for reservations, starting with listing any existing reservations.

1. Create a new folder inside the Views folder called Reservation.
2. Create a new empty view file called Index.cshtml.
3. Add the following code to display the reservations, if any exist:

```cs
@model ReservationListViewModel

@if (TempData["ReservationDeleted"] != null)
{
    <p class="text-success">@TempData["ReservationDeleted"]</p>
}

@if (!Model.Reservations.Any())
{
    <p>No results</p>
}

else
{    
    <table class="table table-condensed table-bordered">
        <tr>
            <th>
                Booked Restaurant
            </th>
            <th>
                Date and Time
            </th>
            <th>
                Actions
            </th>
        </tr>

        @foreach(var reservation in Model.Reservations)
        {
            <tr>
                <td>@reservation.RestaurantName</td>
                <td>@reservation.date.ToLocalTime()</td>
                <td>
                    <a asp-action="Edit" asp-route-id="@reservation.Id.ToString()">Edit</a>
                    <a asp-action="Delete" asp-route-id="@reservation.Id.ToString()">Delete</a>
                </td>
            </tr>
        }

    </table>   

}
```

### Adding reservations

Adding reservations is next.

1. Create an empty view called <VPIcon icon="fa-brands fa-html5"/>`Add.cshtml`.
2. Add the following code:

```html title="Add.cshtml"
@model ReservationAddViewModel

@if (ViewData["ErrorMessage"] != null)
{
    <p class="text-danger">@ViewData["ErrorMessage"]</p>
}

<form method="post" asp-controller="Reservation" asp-action="Add">
    <div asp-validation-summary="All" class="text-danger"></div>
    <input type="hidden" asp-for="Reservation.Id" />
    <input type="hidden" asp-for="Reservation.RestaurantId" />

    <div class="mb-3">
        <label asp-for="Reservation.date" class="form-label"></label>
        <input asp-for="Reservation.date" type="datetime-local" class="form-control" value="@DateTime.Now.ToString("yyyy-MM-ddTHH:mm")" />
        <span asp-validation-for="Reservation.date" class="text-danger"></span>
    </div>

    <input type="submit" value="Reserve table" class="btn btn-primary" />
</form>
```

### Editing reservations

Editing reservations is next.

1. Create an empty view called <VPIcon icon="fa-brands fa-html5"/>`Edit.cshtml`.
2. Add the following code:

```html title="Edit.cshtml"
@model Reservation

<h2>Editing reservation for @Model.RestaurantName on @Model.date.ToLocalTime()</h2>
<hr />

<form method="post" asp-controller="Reservation" asp-action="Edit">
    <div asp-validation-summary="ModelOnly" class="text-danger"></div>
    <input type="hidden" asp-for="Id" />

    <div class="mb-3">
        <label asp-for="date" class="form-label"></label>
        <input asp-for="date" value="@Model.date.ToLocalTime().ToString("yyyy-MM-ddTHH:mm")" class="form-control" />
        <span asp-validation-for="date" class="text-danger" />
    </div>
    <input type="submit" value="Update reservation" class="btn btn-primary" />
</form>
<div>
    <a asp-controller="Reservation" asp-action="Index">Back to reservations</a>
</div>
```

### Deleting reservations

Deleting reservations is next.

1. Create an empty view called <VPIcon icon="fa-brands fa-html5"/>`Delete.cshtml`.
2. Add the following code:

```html title="Delete.cshtml"
@model Reservation

<h2>Delete reservation</h2>
<hr />

@if (ViewData["ErrorMessage"] != null)
{
    <p class="text-danger">@ViewData["ErrorMessage"]</p>
}

<div>
    <dl class="row">
        <dt class="col-sm-2">
            <label asp-for="RestaurantName">Name</label>
        </dt>
        <dd class="col-sm-10">
            @Model?.RestaurantName
        </dd>
        <dt class="col-sm-2">
            <label asp-for="date"></label>
        </dt>
        <dd class="col-sm-10">
            @Model?.date.ToLocalTime()
        </dd>
        </dl>
</div>

<form method="post" asp-action="Delete">
    <input type="hidden" asp-for="Id" />
    <input type="hidden" asp-for="RestaurantId" />
    <input type="submit" value="Delete reservation" class="btn btn-danger" onclick="javascript: return confirm('Are you sure you want to delete this reservation?');" />
</form>

<div>
    <a asp-controller="Reservation" asp-action="Index">Back to list</a>
</div>
```

---

## Updating NavBar

The final thing to add is to update the navigation bar of the application so we can easily switch between restaurants and reservations.

Navigate to the file at <VPIcon icon="fas fa-folder-open"/>`Views/Shared/`<VPIcon icon="fa-brands fa-html5"/>`_Layout.cshtml`. Find the `div` with class `navbar-collapse`. Remove that entire section and add the following code:

```html title="Views/Shared/_Layout.cshtml"
<div class="collapse navbar-collapse justify-content-between">
  <ul class="navbar-nav flex-grow-1">
    <li class="nav-item">
      <a class="nav-link text-dark" asp-area="" asp-controller="Restaurant" asp-action="Index">Restaurants</a>
    </li>
    <li class="nav-item">
      <a class="nav-link text-dark" asp-area="" asp-controller="Reservation" asp-action="Index">Reservations</a>
    </li>
  </ul>
</div>
```

---

## Testing our application

We now have a functioning application that uses the new MongoDB Provider for EF Core. Now is the time to test it all and visit our endpoints to make sure it all works.

In the terminal run the following command:

```sh
dotnet run
```

Try editing restaurants and adding reservations. You can then navigate to the MongoDB Atlas database page and see that your changes are reflected in the database.

---

## Advanced MongoDB Operations: Atlas Search and Vector Search

The EF Core provider is built on top of the MongoDB C# Driver. Since we already have access to the the MongoClient when creating the DbContext, this allows us to perform advanced MongoDB operations such as Atlas Search and Vector Search. These features enhance your application's capabilities by enabling powerful search functionalities while still leveraging the familiar EF Core framework.

### Atlas Search

Atlas Search is a full-text search engine provided by MongoDB Atlas. It allows you to run sophisticated search queries on your MongoDB data. With Atlas Search, you can implement features like autocomplete, faceted search, and relevance-based sorting.

To use Atlas Search with the EF Core Provider, follow these steps:

#### 1. Setup Indexes in MongoDB Atlas

- Go to your MongoDB Atlas cluster.
- Navigate to the "Search" tab and create a new index on your collection. Define the fields you want to make searchable.

#### 2. Define Searchable Fields in Your Models

In your C# models, ensure that the fields you want to search are properly defined. Here is an example of the definition of a Product model.

```cs
public class Product
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}
```

#### 3. Performing Search Queries

Use the MongoDB .NET Driver's capabilities to perform text searches. Since EF Core itself does not directly support the MongoDB-specific search syntax, you will need to use the driver in conjunction with EF Core. Here’s an example:

```cs
using MongoDB.Driver;
using MongoDB.Driver.Linq;

var client = new MongoClient("your-mongodb-connection-string");
var database = client.GetDatabase("your-database-name");
var collection = database.GetCollection<Product>("Products");

var searchResult = collection.Aggregate()
    .Match(Builders<Product>.Filter.Text("search term"))
    .ToList();
```

This example shows how to perform a text search on the `Products` collection. The `Text` filter helps search across all indexed fields defined in your Atlas Search index.

#### Vector Search

Vector Search in MongoDB is used for searching documents based on vector similarities, which is particularly useful for applications involving machine learning, recommendations, and natural language processing. Vector Search allows you to query documents using vectors representing text, images, or other high-dimensional data.

1. **Create and Store Vectors**: First, ensure that your documents contain vectors. You might need to preprocess your data to generate these vectors using machine learning models.
2. **Index Vectors in MongoDB Atlas**: Create a special index on the vector field in MongoDB Atlas to enable efficient vector similarity searches.
3. **Performing Vector Searches**: Use the MongoDB .NET Driver to query based on vector similarity.

#### Integrating with EF Core

While the MongoDB EF Core Provider simplifies CRUD operations, some advanced features like Atlas Search and Vector Search require direct use of the MongoDB .NET Driver. However, you can still integrate these operations within your EF Core-based application by using the driver for search functionalities and EF Core for other data management tasks.

By combining EF Core and MongoDB's advanced features, you can build powerful and flexible applications that leverage the best of both worlds—structured data access patterns of EF Core and the powerful search capabilities of MongoDB Atlas.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Entity Framework Core with MongoDB",
  "desc": "Entity Framework Core is a popular ORM (Object-Relational Mapper) for .NET applications, allowing developers to work with databases using .NET objects. It can be used with many types of databases, including MongoDB. In this article, you will learn ho...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/using-entity-framework-core-with-mongodb/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
