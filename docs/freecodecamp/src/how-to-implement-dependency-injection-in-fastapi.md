---
lang: en-US
title: "How to Implement Dependency Injection in FastAPI"
description: "Article(s) > How to Implement Dependency Injection in FastAPI"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Dependency Injection in FastAPI"
    - property: og:description
      content: "How to Implement Dependency Injection in FastAPI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-dependency-injection-in-fastapi.html
prev: /programming/py-fastapi/articles/README.md
date: 2025-11-14
isOriginal: false
author:
  - name: Nneoma Uche
    url : https://freecodecamp.org/news/author/Nene23/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1763131442081/76eff35b-be68-49c1-9743-d78ebc87b292.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement Dependency Injection in FastAPI"
  desc="Several languages and frameworks depend on dependency injection—no pun intended. Go, Angular, NestJS, and Python's FastAPI all use it as a core pattern. If you've been working with FastAPI, you've likely encountered dependencies in action. Perhaps yo..."
  url="https://freecodecamp.org/news/how-to-implement-dependency-injection-in-fastapi"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1763131442081/76eff35b-be68-49c1-9743-d78ebc87b292.png"/>

Several languages and frameworks depend on dependency injection—no pun intended. Go, Angular, NestJS, and Python's FastAPI all use it as a core pattern.

If you've been working with FastAPI, you've likely encountered dependencies in action. Perhaps you saw `Depends()` in a tutorial or the docs and were confused for a minute. I certainly was. That confusion sparked weeks of experimenting with this system. The truth is, you can't avoid dependency injection when building backend services with FastAPI. It's baked into the framework's DNA, powering everything from authentication and database connections to request validation.

FastAPI's docs describe its dependency injection system as 'powerful but intuitive.' That’s accurate, once you understand how it works. This article breaks it down, covering function dependencies, class dependencies, dependency scopes, as well as practical examples.

::: note Prerequisites

To follow along with this article, you should have:

- Working knowledge of Python.
- Ability to create and activate virtual environments.
- Basic understanding of FastAPI.
- Familiarity with Object-Oriented Programming (OOP) concepts.

:::

---

## Dependencies and Dependency Injection in FastAPI

A dependency is a reusable piece of logic, like authentication, database connection, or validation, that your path operations require. Dependency injection (DI) is how FastAPI delivers these dependencies to specific parts of your application: you declare them using `Depends()` and FastAPI automatically executes them when the associated route receives a request.

Think of it as requesting the tools your application needs. You declare dependencies once and FastAPI provides them wherever needed, with no repetitive setup across routes.

This makes for modular, scalable applications. Without DI, you would have to repeat the same setup code on every endpoint, making updates tedious and bugs more likely.

---

## Getting Started: Environment Setup

Let's set up your development environment to work through the examples in this guide.

Start by creating a project folder, then:

Create and activate a virtual environment:

```sh
python -m venv deps
source deps/bin/activate          #on Mac
deps\Scripts\activate             # On Windows
```

Install FastAPI with all dependencies:

```sh
pip install 'fastapi[all]'
```

Organize your project as follows:

```sh title="file structure"
fastapi-deps/
├── deps/                 # Virtual environment
├── function_deps.py
├── class_deps.py
├── router_deps.py
├── app.py
└── requirements.txt
```

---

## Types of Dependencies in FastAPI

In FastAPI, a dependency is a callable object that retrieves or verifies information before a route executes. Dependencies can be implemented as either functions or classes.

**Function dependencies** are the most straightforward approach and work well for most use cases, including validation, authentication, and data retrieval. **Class dependencies** can handle the same tasks but are particularly useful when you need stateful logic, multiple instances with different configurations, or prefer object-oriented patterns.

### How to Use Function Dependencies in FastAPI

A function dependency is a helper function (such as for authentication or data retrieval) that can be injected into path operations. To demonstrate, we'll create a simple user authentication dependency using an in-memory database—a list of dictionaries.

Recall the folder structure from earlier? We’ll write this code in <VPIcon icon="fas fa-folder-open"/>`fastapi-deps/`<VPIcon icon="fa-brands fa-python"/>`function_deps.py`.

Start by importing the required modules:

```py title="fastapi-deps/function_deps.py"
from fastapi import FastAPI, Depends, HTTPException
import uvicorn
```

You bring in `FastAPI` to create the app instance, `Depends` for dependency injection, and `HTTPException` to handle errors gracefully. `uvicorn` will be used to run the application later.

Next, instantiate the FastAPI application:

```py
app = FastAPI()
```

`app = FastAPI()` creates your application instance: the object that will hold all your endpoints and dependencies.

Next, create an in-memory database. Define a list of dictionaries to act as your temporary database. Each dictionary represents a user entry containing a name and a password.

```py
users = [
    {"name": "Ore", "password": "jkzvdgwya12"},
    {"name": "Uche", "password": "lga546"},
    {"name": "Seke", "password": "SK99!"},
    {"name": "Afi", "password": "Afi@144"},
    {"name": "Sam", "password": "goTiger72*"},
    {"name": "Ozi", "password": "xx%hI"},
    {"name": "Ella", "password": "Opecluv18"},
    {"name": "Claire", "password": "cBoss@14G"},
    {"name": "Sena", "password": "SenDaBoss5"},
    {"name": "Ify", "password": "184Norab"}  
]
```

💡

This type of database isn’t persistent; any data stored therein is lost when the application restarts.

Then, define a dependency function for user validation. The simple helper function below checks whether a username and password provided by the user match an existing user in the database.

```py
#the dependency function
def user_dep(name: str, password: str):
    for u in users:
        if u["name"] == name and u["password"] == password:
            return {"name": name, "valid": True}
```

This function expects two string parameters, `name` and `password`, from the incoming request. If it finds a match in the `users` database, it returns a dictionary confirming the user’s validity. FastAPI automatically converts this dictionary into a JSON response.

Next, inject the dependency into a path function:

```py
#the web endpoint
@app.get("/users/{user}")
def get_user(user = Depends(user_dep)) -> dict:
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return user
```

The `user_dep` function is injected into the path operation using `Depends()`. When an HTTP request is made to this endpoint, FastAPI executes the dependency first, validates the input, and passes its return value to the `user` parameter.

The `-> dict:` annotation indicates that the function returns a dictionary, which FastAPI auto-converts to JSON. If no matching record is found, an `HTTPException` with a 401 status code is raised; otherwise, the verified user data is returned.

Now you’ll start the FastAPI server. To start the server, open your terminal in the project directory and run:

```sh
uvicorn function_deps:app --reload
```

- `function_deps` is the name of your Python file (without the **.py** extension).
- `--reload` automatically restarts the server whenever you save changes.

Once it starts, you’ll see an output similar to the image below:

![`uvicorn` output in terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1762651145390/479b187c-f455-4617-aa7f-e075bf668ee5.jpeg)

Now you can test the endpoint. Open your browser or the Postman desktop app to validate the user **“Seke”**. Paste this URL into your browser: `http://127.0.0.1:8000/users/{user}?name=Seke&password=SK99!`

Alternatively, you can test the endpoint using FastAPI’s built-in docs at: `http://127.0.0.1:8000/docs`

In the Swagger UI:

- Click on the **Get User** endpoint
- Click **Try it out**
- Enter “Seke” in the name field and “SK99!” in the password field
- Click **Execute**

You should get a 200 status code, with the payload in this image:

![payload for `get_user` endpoint](https://cdn.hashnode.com/res/hashnode/image/upload/v1762651845087/9495107e-1ab8-4349-a701-04e5de461fb6.jpeg)

You can also test the endpoint with usernames or passwords that don’t exist in the database. Each time, you should see a **401** error like this:

![unauthorized error output in FastAPI docs](https://cdn.hashnode.com/res/hashnode/image/upload/v1762652045213/c8dc8bb1-e2c4-456f-92f5-911dddae73eb.jpeg)

### How to Use Class Dependencies in FastAPI

While functions are the most common way to define dependencies, FastAPI also supports class-based dependencies. Classes are useful when you need reusable instances with configurable state or prefer object-oriented patterns.

Class dependencies inject the same way: through the `Depends` function in your path operation.

Let's convert the `user_dep` function dependency to a class. It will authenticate users, grant access to valid credentials, and raise exceptions for unauthorized attempts. We'll apply it to a user dashboard endpoint to ensure only authenticated users access their resources.

```py
#Dependency class for user authentication
class UserAuth():
    def __init__(self, name: str, password: str):
        self.name = name
        self.password = password

    def __call__(self):
        #check if name and password entered correspond to any row in the db
        for user in users:
            if user["name"] == self.name and user["password"] == self.password:
                pass
        #If no match found, raise an error
        raise HTTPException(status_code=401, detail="Invalid username or password")
```

The `__init`__ method receives the parameters from the request (`name` and `password`) and stores them as instance attributes. These can then be accessed in the `__call__` method, which contains the dependency logic.

Note that `__call__` doesn't return a value in this example. It simply raises an `HTTPException` if authentication fails. The `__call__` method makes the class instance callable, allowing FastAPI to invoke it like a regular function.

Here’s how to inject `UserAuth` into a path function:

```py
#Injecting the class dependency into a path operation
@app.get("/user/dashboard")
def get_dashboard(user: UserAuth = Depends(UserAuth)):
    return {"message": f"Access granted to {user.name}"}
```

::: info What's happening here:

When a client requests the `/user/dashboard` endpoint, FastAPI executes the dependency first. Recognizing `UserAuth` as a class, FastAPI automatically creates an instance and populates it with values from the query parameters.

Here’s the execution flow to help you understand:

- `Depends(UserAuth)` tells FastAPI: “Before running this route, create a `UserAuth` instance.”
- FastAPI extracts name and password from the request URL (for example, */user/dashboard?name=Seke&password=SK99!*).
- It then calls `UserAuth(name=”Seke”, password=”SK99!”)` to create the instance.

- The `UserAuth` instance, with its stored name and password attributes, is passed to the `user` parameter in `get_dashboard`.
- The route function can access `user.name` and `user.password` directly.
- If `__call__` raises an exception, the route never executes.

:::

Test the endpoint with valid credentials from the users list, and you should see output like this:

![class dependency output](https://cdn.hashnode.com/res/hashnode/image/upload/v1762655384549/ac5ab413-0f75-4711-8166-4c99bcca9d7c.jpeg)

A closer look at [FastAPI’s official documentation](https://fastapi.tiangolo.com/tutorial/dependencies/classes-as-dependencies/#use-it) provides an alternative approach to classes as dependencies. However, using the `__call__` method, in my opinion, is the most straightforward and self-contained approach. It keeps your authentication logic modular without adding extra code to the path operation.

The trade-off is that class dependencies are more verbose than helper functions, but cleaner for complex logic.

---

## Dependency Scope

FastAPI offers two ways to inject dependencies into a path operation: as a **function parameter** or via the **path decorator**. When you include a dependency as a function parameter, the dependency's return value is available within the function. But when injected into the decorator, the dependency executes without passing a return value to the path function.

Beyond single endpoints, FastAPI lets you inject dependencies at the router or global level. Let’s examine these scopes in more detail.

### Path Operation Level

While the first example injected dependencies into path function parameters, you can also inject them directly into the decorator using the `dependencies` parameter. This approach is useful for side-effects (for example, authentication guards, rate limiting or request logging) where the return data is not required in the path operation.

Replace the previous code in `fastapi-deps/function_deps.py` with this:

```py
#dep function to pass in decorator
def user_dep(name: str, password: str):
    for u in users:
        if u["name"] == name and u["password"] == password:
            return
    raise HTTPException(status_code=401, detail="Invalid username or password")

#path function
@app.get("/users/{user}", dependencies=[Depends(user_dep)])
def get_user() -> dict:
    return {"message" : "Access granted!"}
```

This decorator-based dependency acts as a pre-check before the endpoint executes. It validates credentials without passing any values to the path function. On authentication failure, FastAPI raises an HTTPException and prevents the path operation from running.

If you test this using a valid name and password from the in-memory database, your output should look like this:

![path decorator dependency output](https://cdn.hashnode.com/res/hashnode/image/upload/v1762656537394/06fc80cf-a8b2-44d2-8955-ec914be699ba.jpeg)

### Router Level

Injecting dependencies at the router level allows multiple endpoints to share common logic without repeating the dependency in each route.

We'll use the same `user_dep` function but inject it at the router level. Add these imports to `fastapi-deps/router_deps.py`:

```py
from fastapi import APIRouter, Depends

#import the dependency function
from function_deps import user_dep
```

Then, create an `APIRouter` instance, passing your dependency to the `dependencies` parameter. This makes the dependency run automatically for every route you define under this router.

In this example, `user_dep` executes before `get_user()` and any other endpoints you add to the router, eliminating the need to declare it on each route.

```py
router = APIRouter(prefix="/users", dependencies=[Depends(user_dep)])

#define the routes with or without additional dependencies
@router.get("/{user}")
def get_user() -> dict:
    return {"message" : "Access granted!"}
```

In your main application file (`app.py`), import the router and register it with your FastAPI application using `include_router()`. This makes all routes defined in the router accessible through your application.

```py
from fastapi import FastAPI
import uvicorn
from router_deps import router as user_router

app = FastAPI()
app.include_router(user_router)

if __name__ == "__main__":
    uvicorn.run("app:app", reload=True)
```

Start your server and test the route using a valid name–password pair from the users list, then try a mismatched one. You should get a **200** status for the correct credentials and **401** for invalid ones.

### Application Level

Application-level dependencies (also called *global dependencies*) are defined when instantiating the FastAPI app and apply to every route in your application. Unlike router-level dependencies that target specific endpoint groups, app-level dependencies extend across the entire application. Any dependency injected into the FastAPI app object will automatically execute for all path functions.

Let's inject a simple *logging* dependency alongside the *user authentication* dependency we've used throughout this article.

Update `fastapi-deps/app.py` with this code:

```py
from fastapi import FastAPI, Depends
import uvicorn
from function_deps import user_dep
from router_deps import router as user_router
from datetime import datetime

#Basic logging dependency
def log_request():
    print(f"[{datetime.now()}] Request received.")

app = FastAPI(dependencies=[Depends(log_request), Depends(user_dep)])
app.include_router(user_router)

@app.get("/home")
def get_main():
    return "Welcome back!!!"


if __name__ == "__main__":
    uvicorn.run("app:app", reload=True)
```

When you send a request to any endpoint within this application, `log_request` acknowledges it and outputs what time the request was made. Since we aren’t sending the logs to any database in particular, it will just print to the terminal (or console) like so:

![logging dependency output in console](https://cdn.hashnode.com/res/hashnode/image/upload/v1762673203094/d1c43e1b-0cc2-46e5-ae54-ee4849d1af66.jpeg)

Request the endpoint with valid credentials using your browser, cURL, Postman, or the Swagger UI. You should get this response:

![Server response for API request to home page](https://cdn.hashnode.com/res/hashnode/image/upload/v1762673465276/28d90221-4feb-4467-8c6c-8557dd54de03.jpeg)

💡

Although the same authentication and logging logic apply to all registered routers, the specific message users see depends on what you program into each router.

---

## Common Use Cases for Dependency Injection

Dependency injection solves several common challenges in API development. Here are the most frequent use cases where you'll apply this pattern.

1. **Database Connections:** Reusing connection logic across multiple endpoints prevents connection leaks, and ensures each request has an isolated session.
2. **Authentication & Authorization:** Dependencies help validate tokens and verify user roles across protected routes.
3. **Logging & Monitoring:** A logging dependency can automatically record each request to your monitoring system or database. It is beneficial for debugging and tracking API usage.
4. **Rate Limiting:** You can control request frequency and prevent API abuse by injecting rate-limiting logic in path functions.
5. **Configuration & Settings:** FastAPI’s dependency injection system simplifies configuration management by letting you inject settings such as API keys or environment variables wherever needed, keeping your code consistent.
6. **Pagination & Filtering:** Injecting common parameters like page_size and limit standardize data retrieval patterns across endpoints.

---

## **Conclusion**

FastAPI's dependency injection system helps you manage shared logic and resources efficiently while adhering to *DRY* principles. However, knowing when to inject a dependency versus when to skip it is a skill that comes with practice.

Dependency injection isn't needed for simple, standalone logic. But for resources requiring lifecycle management, shared logic, or modularity, FastAPI's dependency injection system simplifies checks and app operations—with or without return values.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Dependency Injection in FastAPI",
  "desc": "Several languages and frameworks depend on dependency injection—no pun intended. Go, Angular, NestJS, and Python's FastAPI all use it as a core pattern. If you've been working with FastAPI, you've likely encountered dependencies in action. Perhaps yo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-dependency-injection-in-fastapi.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
