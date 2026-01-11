---
lang: en-US
title: "CRUD with Golang and CockroachDB"
description: "Article(s) > CRUD with Golang and CockroachDB"
icon: fa-brands fa-golang
category:
  - Go
  - JavaScript
  - Data Science
  - CockroachDB
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - go
  - golang
  - js
  - javascript
  - data-science
  - cockroachdb
  - cockroach-db
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CRUD with Golang and CockroachDB"
    - property: og:description
      content: "CRUD with Golang and CockroachDB"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/crud-golang-cockroachdb.html
prev: /programming/go/articles/README.md
date: 2021-11-16
isOriginal: false
author:
  - name: Emmanuel John
    url : https://blog.logrocket.com/author/emmanueljohn/
cover: /assets/image/blog.logrocket.com/crud-golang-cockroachdb/banner.png
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
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CockroachDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/cockroach/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="CRUD with Golang and CockroachDB"
  desc="Learn how to use Golang to perform Create, Read, Update, and Delete (CRUD) operations against an equally popular database, CockroachDB."
  url="https://blog.logrocket.com/crud-golang-cockroachdb"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/crud-golang-cockroachdb/banner.png"/>

## Introduction

Golang has become very popular nowadays. It’s fast, has an easy-to-learn syntax, and is gaining ground among backend developers. Today, we will learn how to use Golang to perform Create, Read, Update, and Delete (CRUD) operations against an equally popular database, CockroachDB.

![CRUD App with Golang and CockroachDB](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/banner.png)

CockroachDB is a fast database that’s easy to set up. It scales easily (without the manual complexity of sharding), rebalances and repairs itself automatically, and it also distributes transactions seamlessly across your cluster. A good choice for this project.

---

## Initial setup

Let’s set up our development environment. First, we will need to install Golang because that is the language we will be using here. Click this [<VPIcon icon="fa-brands fa-golang"/>link to learn how to install it for your operating system](https://golang.org/doc/install).

Next, we need to create an account on the Cockroach cloud. We can install and make use of a local CockroachDB cluster, but CockroachDB cloud makes it easy to start using CockroachDB without any excessive setup. Follow this [<VPIcon icon="iconfont icon-cockroach"/>link to create an account](https://cockroachlabs.cloud/signup).

::: note N.B.,

make sure you take note of your connection string, especially the password, as it is only shown once. This tutorial also assumes you have some knowledge of programming with [**Golang and SQL**](/blog.logrocket.com/using-sql-database-golang.md).

:::

Now that we have everything set up, let’s start working on the app.

---

## Project overview

The app we will be building is a full-stack web app that allows us to get, add, update, and delete names from the Cockroach database. Here’s what the finished app looks like:

![Golang and CockroachDB Demo App](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/golang-cockroachdb-project-overview.png)

As you can see, it’s just a simple, ugly-looking web app that connects to our CockroachDB cloud database. Without further ado, let’s get started.

Create a file named <VPIcon icon="fa-brands fa-golang"/>`server.go` in your project folder and add the following code:

```go title="server.go"
package main

import (
   "fmt"
   "log"
   "os"

   "github.com/gofiber/fiber/v2"
)

func main() {
   app := fiber.New()
   port := os.Getenv("PORT")
   if port == "" {
       port = "3000"
   }
   log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}
```

Here, we start by importing some needed packages including the `os` module, the `log` module, and of course our web framework of choice, which in this case is Go Fiber.

If you need a primer on Go Fiber, here is a [<VPIcon icon="fas fa-globe"/>link to the documentation](https://docs.gofiber.io) for you to check out. What we are doing here is creating a new fiber object with `fiber.New` and setting it to the app variable.

Next, we check our environment variables for a `PORT` variable, and if that doesn’t exist, we set the port to `3000`.

Then we call `app.Listen` to start an HTTP server that is listening on our port. We wrap this in a `log.Fatalln()` to log the output to the console in case of any errors. Before we run this code, let’s add some routes:

```go
func main() {
  app := fiber.New()
  app.Get("/", indexHandler) // Add this
  app.Post("/", postHandler) // Add this
  app.Post("/:name", putHandler) // Add this
  app.Delete("/:name", deleteHandler) // Add this

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }
  log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}
```

As you can see, I’ve added four methods to handle get, post, put, and delete operations for our app as well as four handler methods that get called whenever someone visits those routes:

```go
func indexHandler(c *fiber.Ctx) error {
  return c.SendString("Hello")
}
func postHandler(c *fiber.Ctx) error {
  return c.SendString("Hello")
}

func putHandler(c *fiber.Ctx) error {
  return c.SendString("Hello")
}
func deleteHandler(c *fiber.Ctx) error {
  return c.SendString("Hello")
}
```

Add those methods above your main method. For now, we are just returning “Hello” on all the routes.

Let’s now run our app. On the command line, run the command `"go mod init"` followed by `"go mod tidy"`. This will create a `go.mod` file and get all the dependencies the app needs.

For us to have hot reload while developing, we will need a Go package called Air.  
Import it with `"go get github.com/cosmtrek/air"`.

Start your app by running `"go run github.com/cosmtrek/air"`. This starts up our web server and watches all the files in the project directory.

![Start Up the Web Server](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/golang-cockroachdb-start-up-web-server-e1636398420789.png)

Now visit `http://localhost/<PORT>` to view the app.

![CockroachDB Localhost](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/golang-cockroachdb-localhost-e1636398513284.png)

Let’s connect to our database. Navigate to your CockroachDB cloud account and get your connection string.

![CockroachDB Connection String](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/cockroachdb-connection-string.png)

Click on **Connect** and follow the instructions on the **Connection string** tab to get your connection string. In your main method, before creating the instance of the fiber app, add the following code.

First, we need to import the SQL drivers we will be using to connect to the database. CockroachDB is an SQL database, so we can connect to it using any golang Postgres/SQL database driver. In our case, we will be using the `pq` driver. Update your imports to this:

```go
import (
  "database/sql" // add this
  "fmt"
  "log"
  "os"
  _ "github.com/lib/pq" // add this

  "github.com/gofiber/fiber/v2"
)
```

The `pq` driver relies on the `database/sql` package, so we import that as well. We will not be using the `pq` driver directly, so we prefix its import with an underscore. We will be using the `database/sql` package to perform all our database actions like connection, and executing queries. Now stop the app and run `"go get github.com/lib/pq"` to install the `pq` driver.

Next, we will add the code to create a database connection and also update our routes to pass the database connection to our handlers so we can use it to execute database queries:

```go
connStr := "your connection string"  // add this

// Connect to database
db, err := sql.Open("postgres", connStr)
if err != nil {
log.Fatal(err)
}

app := fiber.New()

app.Get("/", func(c *fiber.Ctx) error {
return indexHandler(c, db)
})

app.Post("/", func(c *fiber.Ctx) error {
return postHandler(c, db)
})

app.Post("/:name", func(c *fiber.Ctx) error {
return putHandler(c, db)
})

app.Delete("/:name", func(c *fiber.Ctx) error {
return deleteHandler(c, db)
})
```

As you can see, in place of our handlers, we are now passing a function that accepts the `fiber` context object and passes it to our handlers together with the database connection. The `fiber` context object contains everything about the incoming request, like the headers, query string parameters, post body, etc. Reference the fiber documentation for more details.

Now let’s update our handlers to accept a pointer to our database connection:

```go
func indexHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func postHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func putHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func deleteHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}
```

Start the app again and you see it runs without errors. Here’s the full code up to here for reference:

```go :collapsed-lines
package main

import (
  "database/sql"
  "fmt"
  "log"
  "os"
  _ "github.com/lib/pq"
  "github.com/gofiber/fiber/v2"
)

func indexHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func postHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func putHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func deleteHandler(c *fiber.Ctx, db *sql.DB) error {
  return c.SendString("Hello")
}

func main() {
  connStr := "<your connection string>"
  // Connect to database
  db, err := sql.Open("postgres", connStr)
  if err != nil {
    log.Fatal(err)
  }

  app := fiber.New()

  app.Get("/", func(c *fiber.Ctx) error {
    return indexHandler(c, db)
  })

  app.Post("/", func(c *fiber.Ctx) error {
    return postHandler(c, db)
  })

  app.Post("/:name", func(c *fiber.Ctx) error {
    return putHandler(c, db)
  })

  app.Delete("/:name", func(c *fiber.Ctx) error {
    return deleteHandler(c, db)
  })

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }
  log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}
```

---

## Fleshing out our route handlers

Before we start fleshing out our handlers, let’s populate our database with some dummy data. Navigate back to the CockroachDB cloud console, click on **Connect**, and follow the instructions in the **Command Line** tab to access your database from the command line.

![CockroachDB Command Line Tab](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/cockroachdb-command-line-tab.png)

CockroachDB creates a default database called `defaultdb` whenever you create a cluster. You can change this to whatever you want but for our use case, we will be using this. Once connected to the database shell in the command line, execute the following SQL commands:

```sql
CREATE TABLE users (Name VARCHAR(225));
INSERT INTO users VALUES ('John');
```

This creates a table named `users` with one column for the user’s name, and it inserts a name into the database.

Exit out of your terminal and let’s start fleshing out our handler methods. Modify the get handler as so:

```go
func indexHandler(c *fiber.Ctx, db *sql.DB) error {
  var res string
  var users []string
  rows, err := db.Query("SELECT * FROM users")
  defer rows.Close()
  if err != nil {
    log.Fatalln(err)
    c.JSON("An error occured")
  }
  for rows.Next() {
    rows.Scan(&res)
    users = append(users, res)
  }
  return c.Render("index", fiber.Map{
    "Users": users,
  })
}
```

Ok, that’s a lot to take in! First, we are using the `db` object to execute an SQL query on the database with the `db.Query()` function. This returns to us all the rows that match our query as well as any errors that may have occurred. We call `defer rows.Close()` to close the rows and prevent further enumeration when the function completes.

We check if there are any errors and then we loop through all the rows, calling `rows.Next()` with each iteration, and use the `rows.Scan()` method to assign the current value of the row to the `res` variable, which we define as a `string`. We then append the value of `res` to the users array.

Note `rows.Scan()` requires you to pass in a variable of datatype that corresponds with the data stored in the database. For example, if you had multiple columns, say name and age, you would pass in a struct with the fields name and age. Refer to the [<VPIcon icon="fa-brands fa-golang"/>SQL documentation here](https://pkg.go.dev/database/sql#Rows.Scan) for more info.

We then return the index view and pass in the users array into it. Talking about views, let’s configure our fiber app to serve our HTML views. Modify your main method thus:

```go
engine := html.New("./views", ".html")
app := fiber.New(fiber.Config{
  Views: engine,
})
```

We configure our fiber app to use the HTML templating engine and pass in `./views` as the path to where our views are located. Stop the app and install the HTML engine with `go get github.com/gofiber/template/html` and create a folder in your project root called <VPIcon icon="fas fa-folder-open"/>`views`. In <VPIcon icon="fas fa-folder-open"/>`views`, create a file called <VPIcon icon="fa-brands fa-html5"/>`index.html` and add the following code:

```html title="views/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello world from fiber</h1>
  {{range .Users}}
  <div>
   <h2>{{.}}</h2>
  {{end}}
</body>
</html>
```

This loops through the users array we are passing in and displays the name of the user. Start the app again and you should see the user we added to the database.

![CockroachDB Loaded User](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/cockroachdb-one-user-e1636399314332.png)

::: note N.B.

if you get any errors starting your app at this point like `open $HOME/.postgresql/root.crt: no such file or directory`, just modify your connection string and remove the* `sslmode` and `sslrootcert` query string parameters and it should work just fine.

:::

![Modify Connection String](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/cockroachdb-modify-connection-string-e1636399359623.png)

For our other handlers, modify them thus:

```go :collapsed-lines
type user struct {
  Name string
}

func postHandler(c *fiber.Ctx, db *sql.DB) error {
  newUser := user{}
  if err := c.BodyParser(&newUser); err != nil {
    log.Printf("An error occured: %v", err)
    return c.SendString(err.Error())
  }
  if newUser.Name != "" {
    _, err := db.Exec("INSERT into users VALUES ($1)", newUser.Name)
    if err != nil {
      log.Fatalf("An error occured while executing query: %v", err)
    }
  }
  return c.Redirect("/")
}

func putHandler(c *fiber.Ctx, db *sql.DB) error {
  oldName := c.Params("name")
  newName := user{}

  if err := c.BodyParser(&newName); err != nil {
    log.Printf("An error occured: %v", err)
    return c.SendString(err.Error())
  }
  db.Exec("UPDATE users SET Name=$1 WHERE Name=$2", newName.Name, oldName)
  return c.Redirect("/")
}

func deleteHandler(c *fiber.Ctx, db *sql.DB) error {
  userToDelete := c.Params("name")

  db.Exec("DELETE from users WHERE Name=$1", userToDelete)
  return c.SendString("deleted")
}
```

First, we create a struct to represent our user. Then, in our post handler, we get the name of the user we want to insert into the database from the request body. Then we use the `db.Exec()` method to execute an SQL query where we add the new user into the database. Then we redirect back to the homepage.

::: note N.B.

we use the* `db.Query()` method whenever we expect a result from the database query and `db.Exec()` when we don’t. Again, refer to the [<VPIcon icon="fa-brands fa-golang"/>SQL documentation here](https://pkg.go.dev/database/sql#Rows.Scan) for more info.

:::

For our put handler, we get the old name from the request query string parameters and the updated name from the request body. Then we execute a query to replace the old name with the new one in the database. Finally, we redirect back to the homepage.

For our delete handler, we get the name to delete from the request query string parameters and execute a query to delete the name from our database then we send back a string that says `"deleted"`. We are returning this string so we know that the function was completed successfully.

Now modify your <VPIcon icon="fa-brands fa-html5"/>`index.html` file to look like this:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Cool app</title>
</head>
<body>
  <h1>Hello world from fiber</h1>
  {{range .Users}}
  <div>
    <h2>{{.}}</h2>
    <form action="/{{.}}", method="POST">
      <input type="text" id="name" name="Name">
      <button type="submit">Update name</button>
    </form>
    <button onclick = "removeFromDb('{{.}}')" >Delete {{.}}</button>
  </div>
  {{end}}
  <form action="/" method="post">
    <input type="text" name="Name">
    <button type="submit">Add to db</button>
  </form>
  <script src="index.js"></script>
</body>
</html>
```

After each name, we have a form that updates the name as well as a button that deletes the name from the database. Then we have a form we can use to add a new name to the database. Notice that our delete button’s `onclick` attribute calls a function called `removeFromDb`. This is defined in the `index.js` script we are importing at the bottom of the file. Here’s what the <VPIcon icon="fa-brands fa-js"/>`index.js` file looks like:

```js title="index.js"
function removeFromDb(name) {
  fetch(`/${name}`, {method: "Delete"}).then(res => {
    if (res.status == 200) {
        window.location.pathname = "/"
    }
  })
}
```

It just contains a function that sends a delete request to the database then refreshes the page if the request is completed successfully. Now for fiber to serve this javascript file, add this to your main function:

```go
app.Static("/", "./public") // add this before starting the app
log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
```

This tells fiber to serve all static files from the public directory, which is where we put the <VPIcon icon="fa-brands fa-js"/>`index.js` file. Make sure to create this folder and add the file.

Here’s the full <VPIcon icon="fa-brands fa-golang"/>`server.go` file code for a reference:

```go :collapsed-liens title="server.go"
package main

import (
  "database/sql"
  "fmt"
  "log"
  "os"

  _ "github.com/lib/pq"

  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/template/html"
)

func indexHandler(c *fiber.Ctx, db *sql.DB) error {
  var res string
  var users []string
  rows, err := db.Query("SELECT * FROM users")
  defer rows.Close()
  if err != nil {
    log.Fatalln(err)
    c.JSON("An error occured")
  }
  for rows.Next() {
    rows.Scan(&res)
    users = append(users, res)
  }
  return c.Render("index", fiber.Map{
    "Users": users,
  })
}

type user struct {
  Name string
}

func postHandler(c *fiber.Ctx, db *sql.DB) error {
  newUser := user{}
  if err := c.BodyParser(&newUser); err != nil {
    log.Printf("An error occured: %v", err)
    return c.SendString(err.Error())
  }
  if newUser.Name != "" {
    _, err := db.Exec("INSERT into users VALUES ($1)", newUser.Name)
    if err != nil {
        log.Fatalf("An error occured while executing query: %v", err)
    }
  }

  return c.Redirect("/")
}

func putHandler(c *fiber.Ctx, db *sql.DB) error {
  oldName := c.Params("name")
  newName := user{}

  if err := c.BodyParser(&newName); err != nil {
    log.Printf("An error occured: %v", err)
    return c.SendString(err.Error())
  }
  db.Exec("UPDATE users SET Name=$1 WHERE Name=$2", newName.Name, oldName)
  return c.Redirect("/")
}

func deleteHandler(c *fiber.Ctx, db *sql.DB) error {
  userToDelete := c.Params("name")

  db.Exec("DELETE from users WHERE Name=$1", userToDelete)
  return c.SendString("deleted")
}

func main() {
  connStr := "<your connection string>"
  // Connect to database
  db, err := sql.Open("postgres", connStr)
  if err != nil {
    log.Fatal(err)
  }

  engine := html.New("./views", ".html")
  app := fiber.New(fiber.Config{
    Views: engine,
  })

  app.Get("/", func(c *fiber.Ctx) error {
    return indexHandler(c, db)
  })

  app.Post("/", func(c *fiber.Ctx) error {
    return postHandler(c, db)
  })

  app.Post("/:name", func(c *fiber.Ctx) error {
    return putHandler(c, db)
  })

  app.Delete("/:name", func(c *fiber.Ctx) error {
    return deleteHandler(c, db)
  })

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }

  app.Static("/", "./public")

  log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}
```

If you followed the above tutorial correctly, this is what your app should look like:

![Final App Demo CockroachDB](/assets/image/blog.logrocket.com/crud-golang-cockroachdb/final-app-demo-cockroachdb-e1636399410932.png)

---

## Conclusion

In this article, we have looked at how we can set up a CockroachDB database on the cloud, connect to it and perform some CRUD operations on it, as well using the Golang web framework, Go Fiber.

Now as a task, try updating the app to look prettier (add some CSS). Refer to the documentation for fiber when you get stuck. Thanks for reading, and bye!!✌️

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CRUD with Golang and CockroachDB",
  "desc": "Learn how to use Golang to perform Create, Read, Update, and Delete (CRUD) operations against an equally popular database, CockroachDB.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/crud-golang-cockroachdb.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
