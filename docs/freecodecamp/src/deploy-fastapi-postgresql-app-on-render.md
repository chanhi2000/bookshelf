---
lang: en-US
title: "How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide"
description: "Article(s) > How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - data-science
  - sql
  - postgres
  - posgtresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide"
    - property: og:description
      content: "How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/deploy-fastapi-postgresql-app-on-render.html
prev: /programming/py-fastapi/articles/README.md
date: 2025-05-23
isOriginal: false
author:
  - name: Preston Osoro
    url : https://freecodecamp.org/news/author/Preston56/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747923566699/58fc1283-d2f5-4964-acfa-b5dcad0f3d4f.png
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

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide"
  desc="This guide is a comprehensive roadmap for deploying a FastAPI backend connected to a PostgreSQL database using Render, a cloud platform that supports hosting Python web apps and managed PostgreSQL databases.   You can find the complete source code he..."
  url="https://freecodecamp.org/news/deploy-fastapi-postgresql-app-on-render"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747923566699/58fc1283-d2f5-4964-acfa-b5dcad0f3d4f.png"/>

This guide is a comprehensive roadmap for deploying a FastAPI backend connected to a PostgreSQL database using [<VPIcon icon="fas fa-globe"/>Render](https://render.com/), a cloud platform that supports hosting Python web apps and managed PostgreSQL databases.

You can find the complete source code [here (<VPIcon icon="iconfont icon-github"/>`preston-56/FastAPI`)](https://github.com/preston-56/FastAPI).

---

## Deployment Context

When deploying a FastAPI app connected to PostgreSQL, you need to select a platform that supports Python web applications and managed databases. This guide uses Render as the example platform because it provides both web hosting and a PostgreSQL database service in one environment, making it straightforward to connect your backend with the database.

You can apply the concepts here to other cloud providers as well, but the steps will differ depending on the platform’s specifics.

---

## Project Structure

If you’re building a real-world API with [<VPIcon icon="iconfont icon-fastapi"/>FastAPI](https://fastapi.tiangolo.com/) you’ll quickly outgrow a single <VPIcon icon="fa-brands fa-python"/>`main.py` file. That’s when modular project structure becomes essential for maintainability.

Here’s an example structure we’ll use throughout this guide:

```plaintext :collapsed-lines title="file structure"
FastAPI/
├── database/
│   ├── base.py
│   ├── database.py
│   └── __init__.py
├── fastapi_app/
│   └── main.py
├── items/
│   ├── models/
│   │   ├── __init__.py
│   │   └── item.py
│   ├── routes/
│   │   ├── __init__.py
│   │   └── item.py
│   └── schemas/
│       ├── __init__.py
│       └── item.py
├── models/
│   └── __init__.py
├── orders/
│   ├── models/
│   │   ├── __init__.py
│   │   └── order.py
│   ├── routes/
│   │   ├── __init__.py
│   │   └── order.py
│   └── schemas/
│       ├── __init__.py
│       └── order.py
└── users/
    ├── models/
    │   ├── __init__.py
    │   └── user.py
    ├── routes/
    │   ├── __init__.py
    │   └── user.py
    └── schemas/
        ├── __init__.py
        └── user.py
```

---

## What You'll Need Before You Start

Before diving in, make sure you've got:

- A free [<VPIcon icon="fas fa-globe"/>Render](https://render.com/) account (sign up if you don't have one)
- A GitHub or GitLab repository for your FastAPI project
- Basic familiarity with Python, FastAPI, and Git
- Your project structure set up similarly to the example above

---

## Deployment Steps

### Step 1: Set Up Local PostgreSQL Database

For local development, you'll need to set up PostgreSQL on your machine like this:

```sql
-- 1. Log in as superuser
psql -U postgres

-- 2. Create a new database
CREATE DATABASE your_db;

-- 3. Create a user with password
CREATE USER your_user WITH PASSWORD 'your_secure_password';

-- 4. Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE your_db TO your_user;

-- 5. (Optional) Allow the user to create tables
ALTER USER your_user CREATEDB;

-- 6. Exit
\q
```

After setting up your local database, create a <VPIcon icon="iconfont icon-doitenv" />`.env` file in your project root:

```sh title=".env"
DATABASE_URL=postgresql://your_user:your_secure_password@localhost:5432/your_db
```

### Step 2: Set Up Your Database Connection

Create <VPIcon icon="fas fa-folder-open"/>`database/`<VPIcon icon="fa-brands fa-python"/>`database.py` to manage your PostgreSQL connection with SQLAlchemy:

This file is crucial as it creates the database engine, defines session management, and provides a dependency function for your routes.

```py title="database/database.py"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
"""
The engine manages the connection to the database and handles query execution.
"""
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Database dependency for routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

And add <VPIcon icon="fas fa-folder-open"/>`database/`<VPIcon icon="fa-brands fa-python"/>`base.py` for the base class:

```py title="databse/base.py"
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()
```

### Step 3: Configure Your FastAPI Main Application

Create main FastAPI application file <VPIcon icon="fas fa-folder-open"/>`fastapi_app/`<VPIcon icon="fa-brands fa-python"/>`main.py` to import all your route modules:

```py :collpased-lines title="main.py"
import os
from fastapi import FastAPI, APIRouter
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer
import uvicorn
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database imports
from database import Base, engine

# Import models to ensure they're registered with SQLAlchemy
import models

# Import router modules
from items.routes import item_router
from orders.routes import order_router
from users.routes import user_router

# Initialize FastAPI app
app = FastAPI(
    title="Store API",
    version="1.0.0",
    description="API documentation for Store API"
)

# Create database tables on startup
Base.metadata.create_all(bind=engine)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Store"}

# Setup versioned API router and include module routers
api_router = APIRouter(prefix="/v1")
api_router.include_router(item_router)
api_router.include_router(order_router)
api_router.include_router(user_router)

# Register the master router with the app
app.include_router(api_router)

# Setup OAuth2 scheme for Swagger UI login flow
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/auth/login")

# Custom OpenAPI schema with security configuration
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    # Add security scheme
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }

    # Apply global security requirement
    openapi_schema["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Run the app using Uvicorn when executed directly
if __name__ == "__main__":
    port = os.environ.get("PORT")
    if not port:
        raise EnvironmentError("PORT environment variable is not set")
    uvicorn.run("fastapi_app.main:app", host="0.0.0.0", port=int(port), reload=False)
```

### Step 4: Create a Requirements File

In your project root, create a <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file that includes all the necessary dependencies:

```plaintext title="requirements.txt"
fastapi>=0.68.0
uvicorn>=0.15.0
sqlalchemy>=1.4.23
psycopg2-binary>=2.9.1
python-dotenv>=0.19.0
pydantic>=1.8.2
```

### Step 5: Provision a PostgreSQL Database on Render

Log in to your Render dashboard at [<VPIcon icon="fas fa-globe"/>dashboard.render.com](https://dashboard.render.com/login).

![Render dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1747782796468/e7564ed7-66cd-4466-a1d0-913b93dc9a77.png)

Then click "**New +**" in the top right and select "**PostgreSQL**".

Fill in the details:

- Name: `your-app-db` (choose a descriptive name)
- Database: `your_app` (this will be your database name)
- User: leave default (auto-generated)
- Region: Choose the closest to your target users
- Plan: Free tier

Save and note the Internal Database URL shown after creation, which will look something like this:

```plaintext
postgres://user:password@postgres-instance.render.com/your_app
```

### Step 6: Deploy Your FastAPI App on Render

With your database provisioned, it's time to deploy your API. You can do that by following these steps:

1. In Render dashboard, click "**New +**" and select "**Web Service**"
2. Connect your GitHub/GitLab repository<br/>![Connect to GitHub/GitLab](https://cdn.hashnode.com/res/hashnode/image/upload/v1747813206325/5338209e-eb5c-4ba2-b28a-511296220935.png)
3. Name your service<br/>![Naming your service](https://cdn.hashnode.com/res/hashnode/image/upload/v1747813320278/e21998cc-317b-4ea6-8dec-d52493e2969f.png)
4. **Then configure the build settings**:
    - Environment: `Python 3`
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `python3 -m fastapi_app.main`
5. **Add your environment variables**:<br/>![Adding environment variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1747813450598/6b0913b0-3081-44c4-b746-6b28549a2dd0.png)
    - Click "Environment" tab
    - Add your database URL:
      - Key: `DATABASE_URL`
      - Value: Paste the **Internal Database URL** from your PostgreSQL service
    - Add any other environment variables your application needs
6. Finally, click **Deploy Web Service**.
    - Render will start building and deploying your application
    - This process takes a few minutes. You can monitor logs during build and deployment in real-time

### Step 7: Test Your API Endpoints

Once deployed, access your API’s URL (for example, `https://your-app-name.onrender.com`).

Navigate to `/docs` to open the interactive Swagger UI, where you can test your endpoints directly:

![Test endpoints in Swagger](https://cdn.hashnode.com/res/hashnode/image/upload/v1747783210993/95ea29a5-d2aa-430f-a107-ef25c8ab4e24.png)

- Expand an endpoint
- Click **Try it out**
- Provide any required input
- Click **Execute**
- View the response

---

## Local Development Workflow

While your app is deployed, you'll still need to work on it locally. Here's how to maintain a smooth development workflow:

First, create a local <VPIcon icon="iconfont icon-doitenv" />`.env` file (don't commit this to Git):

```plaintext title=".env"
DATABASE_URL=postgresql://username:password@localhost:5432/your_local_db
```

Then install your dependencies in a virtual environment:

```sh
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Next, run your local server:

```sh
python3 -m fastapi_app.main
```

This command triggers the `__main__` block in <VPIcon icon="fas fa-folder-open"/>`fastapi_app/`<VPIcon icon="fa-brands fa-python"/>`main.py`, which starts the FastAPI app using Uvicorn. It reads the `PORT` from your environment, so ensure it's set (e.g., via a `.env` file).

Then make changes to your code and test locally before pushing to GitHub/GitLab. You can push your changes to automatically trigger a new deployment on Render.

---

## Best Practices and Tips

::: tabs

@tab:active 1. Use database migrations

Add Alembic to your project for managing schema changes

```sh
pip install alembic
alembic init migrations
```

@tab 2. Separate development and production configurations

```py
if os.environ.get("ENVIRONMENT") == "production":
    # Production settings
else:
    # Development settings
```

@tab 3. Monitor your application

- Render provides logs and metrics for your application. You can set up alerts for errors or high resource usage.

@tab 4. Optimize database queries

- Use SQLAlchemy's relationship loading options.
- Consider adding indexes to frequently queried fields.

@tab 5. Scale when needed

- Render allows you to upgrade your plan as your application grows. Consider upgrading your database plan for production applications.

:::

---

## Common Issues and Solutions

When deploying a Python web app on Render, a few issues can commonly occur. Here's a more detailed look at them and how you can resolve each one.

### Database connection errors

If your app can’t connect to the database, first double-check that your `DATABASE_URL` environment variable is correctly set in your Render dashboard. Make sure the URL includes the right username, password, host, port, and database name.

Also, confirm that your SQLAlchemy models match the actual schema in your database. A mismatch here can lead to errors during migrations or app startup. If you're using Postgres, ensure that the database user has permission to read/write tables and perform migrations.

### Deployment fails entirely

When deployment fails, Render usually provides helpful logs under the “Events” tab. Check there for any error messages. A few common culprits include:

- A missing <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file or forgotten dependencies.
- A bad `start` command in the Render settings. Double-check that it points to your correct entry point (for example, `gunicorn app:app` or `uvicorn main:app --host=0.0.0.0 --port=10000`).
- Improper Python version. You can specify this in a <VPIcon icon="fas fa-file-lines"/>`runtime.txt` file (for example, `python-3.11.1`).

### API returns 500 Internal Server errors

Internal server errors can happen for several reasons. To debug:

- Open your Render logs and look for Python tracebacks or unhandled exceptions.
- Try to reproduce the issue locally using the same request and data.
- Add `try/except` blocks around critical logic to capture and log errors more gracefully.

Even better, set up structured logging or error tracking (for example, with Sentry) to catch these before your users do.

### Slow response times

If your app is slow or intermittently timing out, check:

- Whether you're still on the free Render tier, which has limited CPU and memory. Consider upgrading if you’re handling production-level traffic.
- If you're running heavy or unoptimized database queries, tools like SQLAlchemy’s `.explain()` or Django Debug Toolbar can help.
- If you’re frequently fetching the same data, try caching it using a lightweight in-memory cache like `functools.lru_cache` or a Redis instance.

---

## Conclusion

Deploying a FastAPI app connected to PostgreSQL on Render is straightforward with the right structure and setup. While this guide used Render as an example, the concepts apply broadly across cloud platforms.

With this setup, you can develop, test, and deploy robust Python APIs backed by PostgreSQL databases efficiently.

The free tier on Render has some limitations, including PostgreSQL databases that expire after 90 days unless upgraded. For production applications, consider upgrading to a paid plan for better performance and reliability.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy Your FastAPI + PostgreSQL App on Render: A Beginner's Guide",
  "desc": "This guide is a comprehensive roadmap for deploying a FastAPI backend connected to a PostgreSQL database using Render, a cloud platform that supports hosting Python web apps and managed PostgreSQL databases.   You can find the complete source code he...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/deploy-fastapi-postgresql-app-on-render.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
