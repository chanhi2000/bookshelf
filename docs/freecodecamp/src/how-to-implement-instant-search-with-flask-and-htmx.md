---
lang: en-US
title: "How To Implement Instant Search with Flask and HTMX"
description: "Article(s) > How To Implement Instant Search with Flask and HTMX"
icon: iconfont icon-flask
category: 
  - Python
  - Flask
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - python
  - py
  - py-flask
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Implement Instant Search with Flask and HTMX"
    - property: og:description
      content: "How To Implement Instant Search with Flask and HTMX"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-instant-search-with-flask-and-htmx.html
prev: /programming/py-flask/articles/README.md
date: 2024-07-22
isOriginal: false
author:
  - name: Ashutosh Krishna
    url : https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://freecodecamp.org/news/content/images/2024/07/instant-search.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How To Implement Instant Search with Flask and HTMX"
  desc="Instant search is a feature that shows search results as users type their query. Instead of waiting for a full page reload or submitting a form, results appear instantly, allowing users to find what they are looking for quickly. For example, when you..."
  url="https://freecodecamp.org/news/how-to-implement-instant-search-with-flask-and-htmx"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/instant-search.png"/>

Instant search is a feature that shows search results as users type their query. Instead of waiting for a full page reload or submitting a form, results appear instantly, allowing users to find what they are looking for quickly. For example, when you start typing in a search box, suggestions or matching items will appear immediately, making the process smoother and more efficient.

In this tutorial, you'll learn how to create a simple instant search feature using Flask and HTMX. This will help you build interactive web applications with better user experience.

::: note

**Why Use Instant Search?**

- **Speed**: Users get immediate feedback, which helps them refine their search.
- **Convenience**: It reduces the number of clicks and page loads, leading to a more seamless experience.
- **Engagement**: Users are more likely to stay on your site if they can find what they need easily.

**Technologies Used**

To implement this instant search feature, we'll use two main technologies:

- **Flask**: [<VPIcon icon="fas fa-globe"/>Flask](https://blog.ashutoshkrris.in/getting-started-with-flask) is a popular web framework for Python. It is simple and lightweight, making it easy to set up and start building web applications quickly. Flask lets you to create routes, handle requests, and serve HTML templates with minimal setup.
- **HTMX**: This is a powerful JavaScript library that lets you to create dynamic web pages without having to write a lot of JavaScript code. With HTMX, you can update parts of a page based on user actions, like typing in a search box. It makes it easy to load data from the server and display it on the page without a full reload.

:::

---

## How to Set Up the Environment

In this section, we'll set up the environment for our Flask project, including installing the necessary packages and organizing the project structure.

### 1. How to Install Flask and HTMX

First, you need to install Flask, Flask-SQLAlchemy, and Flask-Migrate. You can do this using pip. Open your terminal and run:

```sh
pip install Flask Flask-SQLAlchemy Flask-Migrate
```

For HTMX, we'll include it in our HTML template directly from a CDN.

### 2. How to Create a Virtual Environment

It's a good practice to create a virtual environment for your projects to manage dependencies. Here's how to create one:

```sh
python -m venv venv
```

Next, activate the environment:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

:::

### 3. How to Set Up the Project Structure

Now, set up your project structure as follows:

```sh title="file structure"
my_flask_app/
├── core/
│   ├── __init__.py
│   ├── models.py
│   └── routes.py
├── config.py
└── main.py
```

Let us start with creating the first file: <VPIcon icon="fas fa-folder-open"/>`core/`<VPIcon icon="fa-brands fa-python"/>`init.py`. This file is the initialization script for the core module of our Flask application. It sets up the Flask app instance and configures it using the settings from the `DevelopmentConfig` class, and initializes the database and migration system.

```py title="core/init.py"
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import DevelopmentConfig

# Create the Flask app instance
app = Flask(__name__)

# Load configuration from DevelopmentConfig
app.config.from_object(DevelopmentConfig)

# Initialize SQLAlchemy with the app instance
db = SQLAlchemy(app)

# Initialize Flask-Migrate with the app instance and database
migrate = Migrate(app, db)

# Import routes to register them with the app
from core import routes
```

Next, we will create the **config.py** file from where we'll import the `DevelopmentConfig` class. This file contains configuration settings for different environments (development, testing, production). These settings help manage different behaviors and configurations based on where your app is running.

```py
class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = "guess-me"
    SQLALCHEMY_DATABASE_URI = "sqlite:///db.sqlite"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BCRYPT_LOG_ROUNDS = 13
    WTF_CSRF_ENABLED = True
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    DEBUG_TB_ENABLED = True

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///testdb.sqlite"
    BCRYPT_LOG_ROUNDS = 1
    WTF_CSRF_ENABLED = False

class ProductionConfig(Config):
    DEBUG = False
    DEBUG_TB_ENABLED = False
```

- `Config`: The base configuration class with default settings.
- `DevelopmentConfig`: Inherits from `Config` and overrides development settings.
- `TestingConfig`: Inherits from `Config` and overrides settings for testing.
- `ProductionConfig`: Inherits from `Config` and overrides production settings.

Finally, we'll create the **main.py** file. This is the entry point of our application. When we run this file, it starts the Flask web server.

```py
from core import app

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
```

- `if __name__ == '__main__'`: This ensures that the Flask app runs only if the script is executed directly (not imported as a module).
- `app.run(debug=True)`: Starts the Flask development server with debug mode enabled, which provides detailed error messages and auto-reloading.

Now that you understand the project files, we can proceed with implementing the instant search functionality. This will involve creating the models and search route, setting up the HTMX-powered front-end, and connecting everything to fetch and display search results dynamically.

---

## How to Set up the Database

In this section, we will set up the database for our Flask application. We will use SQLite for simplicity. We will create a model for the data we want to search and seed the database with sample data.

SQLite is a lightweight, disk-based database that doesn’t require a separate server process. It's an excellent choice for development and small projects because it is easy to set up and use.

### How to Create a Model for the Data to Be Searched

We will create a `Book` model to represent the data in our database. This model will include fields like the book title and author.

Let's create the `core/models.py` file and add the model there:

```py
from core import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
```

### How to Apply Migrations Using Flask-Migrate

Before we can seed our database, we need to set up database migrations using Flask-Migrate. This tool helps us manage database changes, such as creating tables and altering schemas, systematically.

Initialize the migrations folder by running the following command in your project directory:

```sh
flask db init
```

This command creates a **migrations** directory in our project, which will store migration scripts.

Generate a migration script that creates the necessary database tables based on your models:

```sh
flask db migrate -m "Initial migration"
```

This command scans your models and generates a new migration script in the **migrations** folder.

Apply the migration to create the tables in your database:

```sh
flask db upgrade
```

This command executes the migration script, creating the tables defined by your models in the database. Post this step, you will see an **instance/db.sqlite** file created.

### How to Seed Data Into Your Database

Now that we have set up the database and applied the migration, we can proceed with seeding the database. Create a file named **seeder.py** with the following content:

```py
import csv
from sqlalchemy.exc import IntegrityError

from core import db, app
from core.models import Book


def seed_data():
    with app.app_context():
        # Open the CSV file
        with open("data.csv", newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)

            # Iterate over the rows in the CSV file
            for row in reader:
                # Create a new Book instance
                book = Book(
                    title=row['Book Name'],
                    author=row['Author Name']
                )

                # Add the book to the session
                db.session.add(book)

            try:
                # Commit the session to write the books to the database
                db.session.commit()
                print("Books added successfully.")
            except IntegrityError as e:
                db.session.rollback()
                print(f"Error occurred: {e}")


if __name__ == "__main__":
    seed_data()
```

The seeder script is responsible for populating the database with initial data. This is useful for testing and development purposes, allowing you to work with a set of sample data. This script reads data from **data.csv**, and processes it to insert it into the database.

**Note**: You can download the [data.csv (<VPIcon icon="iconfont icon-github" />`ashutoshkrris/instant-search-with-flask-htmx`)](https://github.com/ashutoshkrris/instant-search-with-flask-htmx/blob/main/data.csv) file from here.

To use this script, ensure your **data.csv** file exists in the same directory as **seeder.py**. Run the script using Python:

```sh
python seeder.py
```

---

## How to Set Up Basic Routing and HTML

In this section, we'll set up a basic route in Flask to serve an index page (**index.html**) where users can search and display books.

### How to Set Up Flask Route

Let's set up a Flask route (`/`) to render an **index.html** template and display books. For that, create a **core/routes.py** file and add the following route:

```py
from flask import render_template
from core import app
from core.models import Book

@app.route('/')
def index():
    # Fetch the first 20 books to display by default
    books = Book.query.limit(20).all()
    return render_template("index.html", books=books)
```

The Flask application handles routing through the `@app.route('/')` decorator, which directs requests to the root URL (`/`). When a user visits the homepage, the `index()` function is invoked.

Inside this function, we query the `Book` model using SQLAlchemy to fetch the first 20 books from the database. These books are then passed as a parameter (`books`) to the `render_template` function, which renders the **index.html** template.

### How to Creating the index.html Template

Create a file named **index.html** inside a **templates** directory in your project. The **templates** directory will lie in the `core` package. This file will contain the HTML structure for our book search page.

```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Book Search</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
</head>
<body>
  <section class="section">
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <input type="text" class="input" placeholder="Search" name="query" />
      </div>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Title</th>
          <th>Book Author</th>
        </tr>
      </thead>
      <tbody id="results">
        {% for book in books %}
        <tr>
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>
</body>
</html>
```

This HTML file uses the Bulma CSS framework for styling and includes elements such as an input field for user searches and a table to display book details fetched from the database.

The `index.html` template utilizes Jinja2 templating to dynamically populate the table rows (`<tr>`) with book data retrieved from the Flask backend. Each book's `ID`, `title`, and `author` are displayed in the table rows using `{{`[`book.id`](http://book.id)`}}`, `{{ book.title }}`, and `{{`[`book.author`](http://book.author)`}}` respectively.

### How to Run the Application

Let's run the application using the following command:

```sh
flask run
```

Once your application is up and running, this what how it should look like:

![Book Search Application Home Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1721316465728/d5037fd3-f49b-4c59-993c-4ff7c23cabef.png) *web page with ID, book titles, and book authors*

---

## How to Add HTMX for Instant Search

Finally, we'll add HTMX to enhance our Flask application with dynamic search capabilities. For this, we'll introduce a new route and modify existing HTML template.

### How to Create the Search Route

First, create a new route `/search` in your Flask application to handle book searches based on user input:

```py
from flask import render_template, request
from core import app
from core.models import Book

@app.route('/search')
def search():
    query = request.args.get("query")
    if query:
        results = Book.query.filter(Book.title.ilike(f"%{query}%") | Book.author.ilike(f"%{query}%")).limit(10).all()
    else:
        results = Book.query.limit(20).all()
    return render_template("search_results.html", results=results)
```

This route listens for `GET` requests to `/search`. It retrieves the search query from the URL parameter using `request.args.get("query")`.

If a `query` parameter is present, it uses SQLAlchemy's `ilike` method to perform a case-insensitive search across the `title` and `author` columns of the `Book` table, fetching up to 10 results.

If no query parameter is provided, it defaults to fetching the first 20 books from the database. The results are passed to a new `search_results.html` template for rendering.

### How to Modify index.html to Add HTMX

```xml
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Book Search</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <!-- Include HTMX library -->
  <script src="https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.min.js"></script>
</head>
<body>
  <section class="section">
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <!-- HTMX-enabled search input -->
        <input
            type="text"
            class="input"
            placeholder="Search"
            name="query"
            hx-get="/search"
            hx-trigger="keyup changed delay:500ms"
            hx-target="#results"
          />
      </div>
    </div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Book Title</th>
          <th>Book Author</th>
        </tr>
      </thead>
      <tbody id="results">
        {% for book in books %}
          <tr>
            <td>{{ book.id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
          </tr>
        {% endfor %}
      </tbody>
    </table>
  </section>
</body>
</html>
```

The `<script>` tag imports the HTMX library from a CDN, enabling client-side interactions without requiring complex JavaScript. In addition to that, we enhanced the `<input>` element with HTMX attributes:

- `hx-get="/search"`: Specifies the endpoint (`/search`) to send GET requests when the user types in the input field.
- `hx-trigger="keyup changed delay:500ms"`: Triggers the search action after a 500ms delay when the user types (`keyup`) or changes the input (`changed`).
- `hx-target="#results"`: Updates the content of the element with `id="results"` with the response from the `/search` endpoint.

### How to Create the search_results.html Template

Next, we will create a new template **search_results.html** to display search results:

```xml
{% for result in results %}
<tr>
    <td>{{ result.id }}</td>
    <td>{{ result.title }}</td>
    <td>{{ result.author }}</td>
</tr>
{% endfor %}
```

This template iterates over `results`, which are passed from the `/search` route. For each book in `results`, generates a table row (`<tr>`) that displays the book's ID, title, and author.

---

## Demo

Finally, we have implemented instant search with HTMX in our Flask application. Here's what our final application should look like:

<VidStack src="youtube/llCmZXaopX0" />

You'd notice a delay in the search results. This is called debouncing. It is a technique used in programming and web development to limit the rate at which a function or event handler is executed. It ensures that a function is only executed after a certain amount of time has passed since the last invocation of the function.

In our case, we set the delay to 500ms before it calls the `/search` API again. This ensures that we do not hit the API for every character the user types.

---

## Conclusion

In this tutorial, you learned how to implement instant search using Flask and HTMX, focusing on enhancing user interaction and performance. By integrating HTMX for AJAX interactions, we enabled dynamic updates to search results without refreshing the entire page.

This approach not only improves user experience by providing real-time feedback but also optimizes server load by debouncing search queries.

By mastering these techniques, you're equipped to build responsive web applications that deliver seamless search experiences, combining the flexibility of Flask with the interactivity of HTMX to meet diverse user needs efficiently and effectively.

::: info

You can find the code for this tutorial in this repository: [https://github.com/ashutoshkrris/instant-search-with-flask-htmx (<VPIcon icon="iconfont icon-github" />`ashutoshkrris/instant-search-with-flask-htmx`)](https://github.com/ashutoshkrris/instant-search-with-flask-htmx)

<SiteInfo
  name="ashutoshkrris/instant-search-with-flask-htmx"
  desc="Contribute to ashutoshkrris/instant-search-with-flask-htmx development by creating an account on GitHub."
  url="https://github.com/ashutoshkrris/instant-search-with-flask-htmx/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/830649448/1282ca57-5930-409d-81f7-eec1f0f539de"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Implement Instant Search with Flask and HTMX",
  "desc": "Instant search is a feature that shows search results as users type their query. Instead of waiting for a full page reload or submitting a form, results appear instantly, allowing users to find what they are looking for quickly. For example, when you...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-instant-search-with-flask-and-htmx.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
