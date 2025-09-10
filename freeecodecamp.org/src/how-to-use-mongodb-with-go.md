---
lang: en-US
title: "How to Use MongoDB with Go"
description: "Article(s) > How to Use MongoDB with Go"
icon: fa-brands fa-golang
category:
  - Go
  - Data Science
  - MongoDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use MongoDB with Go"
    - property: og:description
      content: "How to Use MongoDB with Go"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-mongodb-with-go.html
prev: /programming/go/articles/README.md
date: 2025-07-31
isOriginal: false
author:
  - name: Dami
    url : https://freecodecamp.org/news/author/ThatCoolGuy/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1753940956019/6551a007-b463-486f-8746-15c13a7a99a0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use MongoDB with Go"
  desc="Working with databases is a fundamental part of backend development, particularly when you’re building applications that require persisting, querying, and updating data. In Go, the official MongoDB driver provides a robust way to connect to and inter..."
  url="https://freecodecamp.org/news/how-to-use-mongodb-with-go"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1753940956019/6551a007-b463-486f-8746-15c13a7a99a0.png"/>

Working with databases is a fundamental part of backend development, particularly when you’re building applications that require persisting, querying, and updating data.

In Go, the [official MongoDB driver (<VPIcon icon="iconfont icon-github"/>`mongodb/mongo-go-driver`)](https://github.com/mongodb/mongo-go-driver) provides a robust way to connect to and interact with MongoDB, a flexible NoSQL database that stores data in JSON-like documents.

In this tutorial, you won't just learn how to connect Go to MongoDB. You'll take it a step further by building a simple blog application. Along the way, you'll learn how to perform essential CRUD (Create, Read, Update, Delete) operations and display your results using the Gin web framework.

::: note Prerequisites

Before you proceed, ensure that you have the following:

- Basic knowledge of [<VPIcon icon="fa-brands fa-golang"/>Go](https://go.dev/) and its concepts
- Go (version 1.24 or higher) installed
- [<VPIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/docs/manual/installation/) Installed (running locally on port 27017)
- Basic knowledge of NoSQL

:::

## Create a New Go Project

First, create a new Go project, change into the new project directory, and initialize a new Go module by running the following commands:

```sh
mkdir go-mongodb-integration
cd go-mongodb-integrationgo 
mod init go-mongodb
```

Next, install the MongoDB Go driver by running the following command:

```sh
go get go.mongodb.org/mongo-driver/mongo
go get go.mongodb.org/mongo-driver/bson
```

The standard Go library includes the `database/sql` package for working with SQL databases, but it doesn't support MongoDB out of the box. To work with MongoDB in Go, you’ll use the official MongoDB driver, which provides everything you need to connect to and interact with a MongoDB database.

With the basic setup complete, let’s now examine basic operations in MongoDB.

---

## Basic MongoDB Operations

In MongoDB, databases and [<VPIcon icon="iconfont icon-mongodb"/>collections](https://mongodb.com/docs/manual/reference/glossary/#std-term-collection) are created automatically upon the first data insertion, adopting a "lazy creation" approach. Specifically, a database is created when you insert your first document, and a collection is likewise created when data is first inserted into it.

It's important to note that functions like `client.Database()` and `db.Collection()` only generate references to these structures - they don’t create the actual database or collection until data is inserted.

### Insert data into the collection

Let’s walk through how to insert a document into a collection in MongoDB.

First, open your project in a code editor, create a <VPIcon icon="fa-brands fa-golang"/>`main.go` file, and add the following code:

```go :collapsed-lines title="main.go"
package main

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    ID   primitive.ObjectID `bson:"_id,omitempty"`
    Name string             `bson:"name"`
    Age  int                `bson:"age"`
}

func main() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(ctx)

    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    db := client.Database("test_db")
    usersCollection := db.Collection("users")

    newUser := User{
        Name: "John Doe",
        Age:  30,
    }

    result, err := usersCollection.InsertOne(ctx, newUser)
    if err != nil {
        log.Fatal(err)
    }

    log.Printf("Inserted user with ID: %v\n", result.InsertedID)
}
```

In the code above, you define a `User` [<VPIcon icon="fas fa-globe"/>struct](https://w3schools.com/go/go_struct.php) that represents your document structure, then insert a new user document into the collection using the `InsertOne` method. When you run this insert operation, MongoDB automatically creates both the `test_db` database and the `users` collection if they don’t already exist.

Execute the code by running:

```sh
go run main.go
```

You should see the response below, indicating that a user was inserted successfully.

![A command line interface showing the command `go run main.go` with an output that says, "Inserted user with ID: ObjectID('6862f3112341b0492801633b')" on June 30, 2025.](https://cdn.hashnode.com/res/hashnode/image/upload/v1753561045916/79c1f4f1-ebe1-41e8-b6dd-01a5e2c9d247.png)

### Find documents in MongoDB

Now that you've inserted some data, it's time to query the database and retrieve documents.

Update your <VPIcon icon="fa-brands fa-golang"/>`main.go` file with the following code:

```go :collapsed-lines title="main.go"
package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    ID   primitive.ObjectID `bson:"_id,omitempty"`
    Name string             `bson:"name"`
    Age  int                `bson:"age"`
}

func main() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(ctx)

    db := client.Database("test_db")
    usersCollection := db.Collection("users")

    cursor, err := usersCollection.Find(ctx, bson.M{})
    if err != nil {
        log.Fatal(err)
    }
    defer cursor.Close(ctx)

    var users []User
    if err = cursor.All(ctx, &users); err != nil {
        log.Fatal(err)
    }

    for _, user := range users {
        fmt.Printf("User: %s, Age: %d, ID: %s\n", user.Name, user.Age, user.ID.Hex())
    }
}
```

In the code above, you use the `Find` method with an empty filter (`bson.M{}`) to retrieve all documents from the `users` collection. Then, you use `cursor.All` to decode all the results into a slice of `User` structs.

Each document is printed to the terminal, showing the name, age, and ID of every user in the collection.

To run the code, use:

```sh
go run main.go
```

You should see the response below in your terminal.

![Screenshot of a terminal showing a Go command execution and output with user information including name, age, and ID.](https://cdn.hashnode.com/res/hashnode/image/upload/v1753561158932/adc32e01-742e-4c5c-acf8-a83e1197a27c.png)

### Update documents in MongoDB

To update a document in your collection, modify your <VPIcon icon="fa-brands fa-golang"/>`main.go` file as shown below:

```go :collapsed-lines title="main.go"
package main

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    ID   primitive.ObjectID `bson:"_id,omitempty"`
    Name string             `bson:"name"`
    Age  int                `bson:"age"`
}

func main() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(ctx)

    db := client.Database("test_db")
    usersCollection := db.Collection("users")

    var userToUpdate User
    err = usersCollection.FindOne(ctx, bson.M{"name": "John Doe"}).Decode(&userToUpdate)
    if err != nil {
        log.Println("No user found to update")
    } else {
        update := bson.M{
            "$set": bson.M{
                "name": "Jane Doe",
                "age":  25,
            },
        }
        result, err := usersCollection.UpdateOne(
            ctx,
            bson.M{"_id": userToUpdate.ID},
            update,
        )
        if err != nil {
            log.Fatal(err)
        }
        log.Printf("Updated %v document(s)\n", result.ModifiedCount)
    }
}
```

In the code above, you first search for a user named "John Doe" using the `FindOne` method. If a match is found, you use the `UpdateOne` method to update their name and age. The `$set` operator ensures that only the specified fields are updated, leaving the rest of the document unchanged.

Execute the code by running:

```sh
go run main.go
```

You should see output in your terminal indicating how many documents were updated.

![Command line interface showing "go run main.go" and the output "2025/06/30 21:34:36 Updated 1 document(s)".](https://cdn.hashnode.com/res/hashnode/image/upload/v1753561280040/73f7a859-5d7a-440a-a58b-b6105b8837ab.png)

### Delete documents in MongoDB

To remove documents from a collection, you can use the `DeleteOne` method. Update your <VPIcon icon="fa-brands fa-golang"/>`main.go` file with the following code:

```go :collapsed-lines title="main.go"
package main

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
    ID   primitive.ObjectID `bson:"_id,omitempty"`
    Name string             `bson:"name"`
    Age  int                `bson:"age"`
}

func main() {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(ctx)

    db := client.Database("test_db")
    usersCollection := db.Collection("users")

    result, err := usersCollection.DeleteOne(ctx, bson.M{"name": "Jane Doe"})
    if err != nil {
        log.Fatal(err)
    }
    log.Printf("Deleted %v document(s)\n", result.DeletedCount)
}
```

In the code above, you use the `DeleteOne` method to remove the first document that matches the filter `{ "name": "Jane Doe" }`.

You should see the result below in your terminal.

![A command line terminal showing the execution of "go run main.go" and outputting "2025/06/30 21:36:05 Deleted 1 document(s)".](https://cdn.hashnode.com/res/hashnode/image/upload/v1753561355070/ab8797ef-8a15-47e0-8502-9b120fbbd2b8.png)

---

## How to Build a Blog App with go-mongodb-driver and Gin

Now that you understand how to perform basic CRUD operations with MongoDB in Go, you're ready to build a more complete application.

Start by creating a new directory for your project and initializing it as a Go module. Navigate to your chosen directory and run:

```sh
mkdir go-blog
cd go-blog
go mod init blog
```

Next, install the required dependencies:

```sh
go get github.com/gin-gonic/gin
go get go.mongodb.org/mongo-driver/mongo
go get go.mongodb.org/mongo-driver/bson
```

Your project will have the following structure:

```plaintext title="file structure"
go-blog/  
├── main.go  
├── handlers/  
│   └── main.go  
└── templates/  
    ├── index.html  
    ├── post.html  
    ├── create.html  
    └── edit.html
```

### Initialize the Gin application

To initialize a new Gin application, create a new <VPIcon icon="fa-brands fa-golang"/>`main.go` file and add the below code snippet to it:

```go :collapsed-lines title="main.go"
package main

import (
    "context"
    "log"
    "time"

    "blog/handlers"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(ctx)

    err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }
    log.Println("Connected to MongoDB!")

    db := client.Database("blog_db")
    h := handlers.NewHandler(db)

    router := gin.Default()
    router.LoadHTMLGlob("templates/*")

    router.GET("/", h.HomePage)
    router.GET("/post/:id", h.ViewPost)
    router.GET("/create", h.CreatePost)
    router.GET("/edit/:id", h.EditPost)
    router.POST("/save", h.SavePost)
    router.GET("/delete/:id", h.DeletePost)

    log.Println("Server starting on :8080...")
    router.Run(":8080")
}
```

The code above sets up the MongoDB connection, initializes the Gin router, and registers your routes.

### Create the HTML templates

Now, create the HTML templates for displaying the blog UI.

First, create a `templates` directory and add the following files:

#### <VPIcon icon="fa-brands fa-html5"/>`index.html`:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Go Blog with MongoDB</title>  
    <script src="https://cdn.tailwindcss.com"></script>  
</head>  
<body class="bg-gray-100 min-h-screen">  
    <div class="container mx-auto px-4 py-8">  
        <header class="mb-8">  
            <h1 class="text-3xl font-bold text-center text-blue-600">Go Blog with MongoDB</h1>  
            <div class="flex justify-center mt-4">  
                <a href="/create" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Create New Post</a>  
            </div>  
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
            {{range .}}  
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">  
                <div class="p-6">  
                    <h2 class="text-xl font-semibold mb-2 text-gray-800">{{.Title}}</h2>  
                    <p class="text-gray-600 mb-4 line-clamp-3">  
                        {{if gt (len .Content) 150}}  
                            {{slice .Content 0 150}}...  
                        {{else}}  
                            {{.Content}}  
                        {{end}}  
                    </p>  
                    <div class="flex justify-between items-center text-sm text-gray-500">  
                        <span>{{.CreatedAt.Format "Jan 02, 2006"}}</span>  
                        <a href="/post/{{.ID.Hex}}" class="text-blue-500 hover:text-blue-700">Read More</a>  
                    </div>  
                </div>  
                <div class="flex border-t border-gray-200">  
                    <a href="/edit/{{.ID.Hex}}" class="w-1/2 py-2 text-center text-sm text-gray-600 hover:bg-gray-100 border-r border-gray-200">Edit</a>  
                    <a href="/delete/{{.ID.Hex}}" class="w-1/2 py-2 text-center text-sm text-red-600 hover:bg-gray-100" onclick="return confirm('Are you sure you want to delete this post?')">Delete</a>  
                </div>  
            </div>  
            {{else}}  
            <div class="col-span-3 text-center py-12">  
                <p class="text-gray-600 text-lg">No posts yet. <a href="/create" class="text-blue-500 hover:underline">Create one</a>!</p>  
            </div>  
            {{end}}  
        </div>  
    </div>  
</body>  
</html>
```

This template lists all blog posts and includes buttons to create, edit, or delete posts.

#### <VPIcon icon="fa-brands fa-html5"/>`post.html`:

```html :collapsed-lines title="post.html"
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>{{.Title}} | Go Blog with MongoDB</title>  
    <script src="https://cdn.tailwindcss.com"></script>  
</head>  
<body class="bg-gray-100 min-h-screen">  
    <div class="container mx-auto px-4 py-8">  
        <header class="mb-8">  
            <h1 class="text-3xl font-bold text-center text-blue-600">Go Blog with MongoDB</h1>  
            <div class="flex justify-center mt-4">  
                <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Back to Home</a>  
            </div>  
        </header>

        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">  
            <div class="p-6">  
                <h2 class="text-2xl font-bold mb-4 text-gray-800">{{.Title}}</h2>  

                <div class="flex items-center text-sm text-gray-500 mb-6">  
                    <span>Posted: {{.CreatedAt.Format "Jan 02, 2006"}}</span>  
                    {{if ne .CreatedAt .UpdatedAt}}  
                    <span class="mx-2">•</span>  
                    <span>Updated: {{.UpdatedAt.Format "Jan 02, 2006"}}</span>  
                    {{end}}  
                </div>  

                <div class="prose max-w-none">  
                    <p class="text-gray-700 whitespace-pre-line">{{.Content}}</p>  
                </div>  
            </div>  

            <div class="flex border-t border-gray-200">  
                <a href="/edit/{{.ID.Hex}}" class="w-1/2 py-3 text-center text-blue-600 hover:bg-gray-100 border-r border-gray-200">Edit Post</a>  
                <a href="/delete/{{.ID.Hex}}" class="w-1/2 py-3 text-center text-red-600 hover:bg-gray-100" onclick="return confirm('Are you sure you want to delete this post?')">Delete Post</a>  
            </div>  
        </div>  
    </div>  
</body>  
</html>
```

This template displays a single post.

#### <VPIcon icon="fa-brands fa-html5"/>`create.html`:

```html :collapsed-lines title="create.html"
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Create New Post | Go Blog with MongoDB</title>  
    <script src="https://cdn.tailwindcss.com"></script>  
</head>  
<body class="bg-gray-100 min-h-screen">  
    <div class="container mx-auto px-4 py-8">  
        <header class="mb-8">  
            <h1 class="text-3xl font-bold text-center text-blue-600">Go Blog with MongoDB</h1>  
            <div class="flex justify-center mt-4">  
                <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Back to Home</a>  
            </div>  
        </header>

        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">  
            <div class="p-6">  
                <h2 class="text-2xl font-bold mb-6 text-gray-800">Create New Post</h2>  

                <form action="/save" method="POST">  
                    <div class="mb-4">  
                        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>  
                        <input type="text" id="title" name="title" required  
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">  
                    </div>  

                    <div class="mb-6">  
                        <label for="content" class="block text-gray-700 font-medium mb-2">Content</label>  
                        <textarea id="content" name="content" rows="10" required  
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>  
                    </div>  

                    <div class="flex justify-end">  
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">  
                            Save Post  
                        </button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    </div>  
</body>  
</html>
```

This template allows you to create a new post.

#### <VPIcon icon="fa-brands fa-html5"/>`edit.html`:

```html :collapsed-lines title="edit.html"
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Edit Post | Go Blog with MongoDB</title>  
    <script src="https://cdn.tailwindcss.com"></script>  
</head>  
<body class="bg-gray-100 min-h-screen">  
    <div class="container mx-auto px-4 py-8">  
        <header class="mb-8">  
            <h1 class="text-3xl font-bold text-center text-blue-600">Go Blog with MongoDB</h1>  
            <div class="flex justify-center mt-4">  
                <a href="/" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Back to Home</a>  
            </div>  
        </header>

        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">  
            <div class="p-6">  
                <h2 class="text-2xl font-bold mb-6 text-gray-800">Edit Post</h2>  

                <form action="/save" method="POST">  
                    <input type="hidden" name="id" value="{{.ID.Hex}}">  

                    <div class="mb-4">  
                        <label for="title" class="block text-gray-700 font-medium mb-2">Title</label>  
                        <input type="text" id="title" name="title" value="{{.Title}}" required  
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">  
                    </div>  

                    <div class="mb-6">  
                        <label for="content" class="block text-gray-700 font-medium mb-2">Content</label>  
                        <textarea id="content" name="content" rows="10" required  
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{{.Content}}</textarea>  
                    </div>  

                    <div class="flex justify-between">  
                        <a href="/post/{{.ID.Hex}}" class="text-gray-600 hover:text-gray-800">Cancel</a>  
                        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">  
                            Update Post  
                        </button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    </div>  
</body>  
</html>
```

This template is used to edit a post.

### Create the handlers

Next, set up the handlers to connect with MongoDB and render the templates. Create a new folder called `handlers` in your project's root directory, then add a <VPIcon icon="fa-brands fa-golang"/>`main.go` file inside it and insert the following code snippet:

```go :collapsed-lines title="main.go"
package handlers

import (
    "context"
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
)

type Post struct {
    ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
    Title     string             `bson:"title" json:"title"`
    Content   string             `bson:"content" json:"content"`
    CreatedAt time.Time          `bson:"created_at" json:"created_at"`
    UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
}

type Handler struct {
    db         *mongo.Database
    collection *mongo.Collection
}

func NewHandler(db *mongo.Database) *Handler {
    return &Handler{
        db:         db,
        collection: db.Collection("posts"),
    }
}

func (h *Handler) HomePage(c *gin.Context) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    cursor, err := h.collection.Find(ctx, bson.M{})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer cursor.Close(ctx)

    var posts []Post
    if err = cursor.All(ctx, &posts); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.HTML(http.StatusOK, "index.html", posts)
}

func (h *Handler) ViewPost(c *gin.Context) {
    id := c.Param("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    var post Post
    err = h.collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&post)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }

    c.HTML(http.StatusOK, "post.html", post)
}

func (h *Handler) CreatePost(c *gin.Context) {
    c.HTML(http.StatusOK, "create.html", nil)
}

func (h *Handler) EditPost(c *gin.Context) {
    id := c.Param("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    var post Post
    err = h.collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&post)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
        return
    }

    c.HTML(http.StatusOK, "edit.html", post)
}

func (h *Handler) SavePost(c *gin.Context) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    id := c.PostForm("id")
    title := c.PostForm("title")
    content := c.PostForm("content")

    now := time.Now()

    if id == "" {
        post := Post{
            Title:     title,
            Content:   content,
            CreatedAt: now,
            UpdatedAt: now,
        }

        result, err := h.collection.InsertOne(ctx, post)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        log.Printf("Created post with ID: %v\n", result.InsertedID)
    } else {
        objID, err := primitive.ObjectIDFromHex(id)
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
            return
        }

        update := bson.M{
            "$set": bson.M{
                "title":      title,
                "content":    content,
                "updated_at": now,
            },
        }

        result, err := h.collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        log.Printf("Updated post with ID: %s (Modified %d documents)\n", id, result.ModifiedCount)
    }

    c.Redirect(http.StatusSeeOther, "/")
}

func (h *Handler) DeletePost(c *gin.Context) {
    id := c.Param("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID"})
        return
    }

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    result, err := h.collection.DeleteOne(ctx, bson.M{"_id": objID})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    log.Printf("Deleted %d document(s) with ID: %s\n", result.DeletedCount, id)
    c.Redirect(http.StatusSeeOther, "/")
}
```

The code above contains all the logic for managing blog posts. Here's what each component does:

- **Post struct:** Defines the structure of a blog post document with fields for ID, title, content, and timestamps. The `bson` tags specify how fields are stored in MongoDB, while `json` tags handle JSON serialization.
- **Handler struct:** Contains a reference to the MongoDB database and the posts collection, providing a centralized way to access the database throughout your handlers.
- **NewHandler function**: Creates and initializes a new handler instance with the database connection and sets up the posts collection reference.
- **HomePage:** Retrieves all blog posts from the database using `Find()` with an empty filter and renders them using the `index.html` template.
- **ViewPost:** Fetches a single post by its ObjectID using `FindOne()` and displays it with the `post.html` template.
- **CreatePost & EditPost:** Render the respective forms for creating new posts or editing existing ones.
- **SavePost:** Handles both creating new posts and updating existing ones. It checks if an ID is provided. If not, it creates a new post using `InsertOne()`. Otherwise, it updates the existing post using `UpdateOne()` with MongoDB's `$set` operator.
- **DeletePost:** Removes a post from the database using `DeleteOne()` and redirects back to the homepage.

### Run the application

With everything set up, you can now launch your blog. Open your terminal and run:

```sh
go mod tidy && go run main.go
```

Then, visit <VPIcon icon="fas fa-globe"/>`http://localhost:8080` in your browser to see your blog in action.

![Blog management interface with a header "Go Blog with MongoDB" and a "Create New Post" button. Two blog post entries are shown with options to edit or delete.](https://cdn.hashnode.com/res/hashnode/image/upload/v1753561817087/0e48d3d1-a6c0-4c5d-9245-cd6e86cd8596.png)

---

## That's How to Use MongoDB with Go

In this tutorial, you built a simple blog application using Go and MongoDB. You learned how to connect to a MongoDB database using the official Go driver, perform CRUD operations, and render your results with the Gin web framework.

MongoDB’s flexible, document-based structure makes it a great fit for applications where data models need to evolve over time. It allows you to iterate quickly and adapt as your app grows.

As you expand this project, consider adding features such as user authentication, tagging or categorization, comments, pagination, or search functionality to enhance the user experience.

Cheers to building more with Go and MongoDB!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use MongoDB with Go",
  "desc": "Working with databases is a fundamental part of backend development, particularly when you’re building applications that require persisting, querying, and updating data. In Go, the official MongoDB driver provides a robust way to connect to and inter...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-mongodb-with-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
