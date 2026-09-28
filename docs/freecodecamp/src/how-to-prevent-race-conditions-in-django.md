---
lang: en-US
title: "How to Prevent Race Conditions in Django"
description: "Article(s) > How to Prevent Race Conditions in Django"
icon: iconfont icon-django
category:
  - Python
  - Django
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Prevent Race Conditions in Django"
    - property: og:description
      content: "How to Prevent Race Conditions in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-prevent-race-conditions-in-django.html
prev: /programming/py-django/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Mari
    url: https://freecodecamp.org/news/author/Techgirlll/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/560a0578-8b5d-4109-b1ba-9728e8476d6a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Prevent Race Conditions in Django"
  desc="Let's say you have enough credit left to generate one more image in an AI app. You submit a request in one browser tab, then submit another in a second tab before the first finishes. The app accepts b"
  url="https://freecodecamp.org/news/how-to-prevent-race-conditions-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/560a0578-8b5d-4109-b1ba-9728e8476d6a.png"/>

Let's say you have enough credit left to generate one more image in an AI app. You submit a request in one browser tab, then submit another in a second tab before the first finishes.

The app accepts both.

Behind the scenes, each request passed the credit check. But the application accepted more work than your balance could pay for. What you just experienced is called a race condition.

For a developer, this raises two questions:

- How can both requests pass the check when there's only enough credit for one?
- How do you prevent them from spending the same credit?

In this guide, we’ll build a small Django credit system to explore those questions. We’ll reproduce the bug, fix it with database transactions and row locks, and test what happens when two requests compete for the last credit.

---

## Who This Guide Is For

This guide is for developers who understand basic Django but are new to concurrency.

Familiarity with models, migrations, and views will help you follow the examples. You’ll need Python 3.12 and Docker with Compose for the setup shown here. We’ll use Django 5.2, Django REST Framework 3.16, and PostgreSQL 17 because SQLite doesn't implement the row lock we’ll use.

I'll explain the concurrency concepts before we apply them to the code.

Image generation will be simulated throughout the tutorial.

Our API will accept a prompt and return a simulated result. You won't need an AI provider account or a paid API key. This keeps the exercise focused on the credit decision and its database changes.

You can follow the entire example without paying for an image request.

---

## What Concurrency and Race Conditions Mean

### What Is Concurrency?

Concurrency refers to when two or more tasks make progress during overlapping periods of time.

For example, a server can start processing Request B while Request A waits for a database response. Their instructions don't have to execute at the same instant. An event loop can switch between tasks while one waits, which is one way Python supports concurrent work.

The important detail is that another operation can make progress before the first one finishes.

### What Is a Race Condition?

A race condition is a flaw where the correctness of a result depends on the timing or order of concurrent operations.

It can occur when operations share data, and the application doesn't coordinate their access adequately. Each operation may appear correct on its own, yet one can act on information another has already changed. A different execution order can then produce a different, incorrect outcome.

Concurrency creates the opportunity for overlap, and a race condition is a bug that can arise from how the application handles that overlap.

### Where Else Can Race Conditions Happen?

Race conditions can affect counters, user accounts, background jobs, and the results displayed in a browser.

The participants can be two requests from one person, two different users, or automated tasks with no user action at all. The shared resource can be a database row, a file, an in-memory value, or the current state of a page. The examples below illustrate several ways the order can matter.

Look for operations that share state and can interfere before either finishes.

#### A View Counter Loses an Update

Imagine two requests try to increase a post’s view count from 100. Both read 100 before either saves a change. Each adds one and writes 101. The counter should have reached 102, so one update disappears.

This is a lost update, and no purchase or limited stock is involved.

#### Two Signups Claim the Same Username

A registration form can race if it relies only on a preliminary username check.

Two requests check the same name, and both find it available. Each then attempts to create an account with that name. Without a database uniqueness rule, the application may create duplicate usernames.

The protection here includes enforcing uniqueness in the database rather than trusting the earlier check.

#### Two Workers Pick the Same Job

Background workers can accidentally process the same pending job.

Both workers read its status before either claims it. Each decides the job is available and begins the work. The application may then send a notification twice or generate the same report twice.

A job-claim mechanism needs to coordinate ownership before the work begins.

#### An Older Search Response Replaces a Newer One

A browser can display the wrong search results because responses arrive out of order.

You type “Django”, then change the search to “Django transactions” before the first response returns. The second response arrives first and displays the results you now want. If the first response arrives later and replaces them without a check, the page shows results for the old query.

A request identifier or stale-response check addresses this case, so a database row lock wouldn't be the relevant fix.

---

## How the Credit Check Can Fail

First, let’s define the rule for our example from the beginning of this tutorial: each image request costs one credit. Credits represent the app’s usage allowance. They're separate from the tokens a model processes.

This is a rule we’re choosing for this tutorial. If an account starts with ten credits, nine accepted requests leave enough for one more.

To accept a request, the backend must:

1. Read the account’s balance.
2. Check whether at least one credit remains.
3. Deduct a credit and save the balance.
4. Record the accepted request.

When you test one request at a time, this process can appear correct. The first request saves a balance of zero. The next reads zero and stops.

The next step is to examine the same operations when their execution overlaps.

### What Happens When Two Requests Overlap

Suppose Request A reads the account and finds one credit. Before it updates the database, Request B reads the same account. It also finds one credit.

Each request now has its own copy of the balance. Both pass the check, and both calculate `1 - 1 = 0`. Request A saves zero and records a generation. Request B then saves zero and records another generation.

The final balance is zero, but the application accepted two requests. A check for negative balances would miss this particular failure.

The mistake is trusting a value after another request has had an opportunity to change it. To see this in practice, we’ll first build the version with that mistake.

---

## How to Set Up the Django Project

Create a project directory and a virtual environment. The activation command below is for Linux and macOS:

```sh
mkdir django-credit-demo
cd django-credit-demo
python3.12 -m venv .venv
source .venv/bin/activate
```

These commands give our example its own directory and Python environment.

`mkdir` creates the directory, and `cd` moves you into it. The `venv` command creates an isolated environment named `.venv`. The `source` command activates it so subsequent package installations belong to this project.

Keep this environment active while you run the commands below.

On Windows, use `py -3.12 -m venv .venv` to create the environment and `.venv\Scripts\Activate.ps1` to activate it in PowerShell.

Create <VPIcon icon="fas fa-file-lines"/>`requirements.txt`:

```plaintext title="requirements.txt"
Django>=5.2,<5.3
djangorestframework>=3.16,<3.17
psycopg[binary]>=3.2,<3.3
```

This file lists the three packages the project needs.

Django supplies the models and database tools, while Django REST Framework handles the endpoint. Psycopg provides the PostgreSQL connection, and `[binary]` requests its prebuilt implementation. Each version range allows updates within the chosen release series while excluding the next series.

Using one requirements file makes the dependencies explicit for anyone who follows the guide.

Install the packages, create the project, and add an app named `credits`:

```sh
python -m pip install -r requirements.txt
python -m django startproject config .
python manage.py startapp credits
```

These commands install the dependencies and create the application structure.

`pip install -r` reads the package list from <VPIcon icon="fas fa-file-lines"/>`requirements.txt`. The `startproject` command creates the `config` package and <VPIcon icon="fa-brands fa-python"/>`manage.py`, with the final dot selecting the current directory. The `startapp` command creates the `credits` package where our models, service functions, views, and tests will live.

We now have a Django project ready to connect to a database.

### Start PostgreSQL

Create <VPIcon icon="iconfont icon-yaml"/>`compose.yaml` beside <VPIcon icon="fa-brands fa-python"/>`manage.py`:

```yaml title="compose.yaml"
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_DB: credit_demo
      POSTGRES_USER: credit_demo
      POSTGRES_PASSWORD: local-demo-only
    ports:
      - "127.0.0.1:5433:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U credit_demo -d credit_demo"]
      interval: 2s
      timeout: 5s
      retries: 15
```

This configuration describes a PostgreSQL container for local development.

`image` chooses PostgreSQL 17, and the environment values set up the database and local credentials. The port mapping exposes the database only on your computer’s loopback address at port `5433`. The health check runs `pg_isready` every two seconds, allows five seconds per check, and permits fifteen retries before marking the container unhealthy.

Django will use these same connection details in its settings.

Start it with:

```sh
docker compose up -d --wait
```

This command starts the database defined in <VPIcon icon="iconfont icon-yaml"/>`compose.yaml`.

`up` creates and starts the service. The `-d` flag lets it run in the background so you can continue using the terminal. The `--wait` flag waits for the service to become healthy according to the health check.

Keep the database container running throughout the tutorial.

### Configure Django

Replace <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-python"/>`settings.py` with this minimal configuration:

```py :collapsed-lines title="config/settings.py"
import os

SECRET_KEY = "local-tutorial-only-do-not-use-in-production"
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "testserver"]
INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "rest_framework",
    "credits",
]
MIDDLEWARE = []
ROOT_URLCONF = "config.urls"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
USE_TZ = True
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME", "credit_demo"),
        "USER": os.environ.get("DB_USER", "credit_demo"),
        "PASSWORD": os.environ.get("DB_PASSWORD", "local-demo-only"),
        "HOST": os.environ.get("DB_HOST", "127.0.0.1"),
        "PORT": os.environ.get("DB_PORT", "5433"),
        "OPTIONS": {"options": "-c lock_timeout=5000 -c statement_timeout=10000"},
    }
}
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}
```

This settings file connects the parts of our small application.

`INSTALLED_APPS` enables Django’s user support, Django REST Framework, and our `credits` app. `ROOT_URLCONF` points to the route definitions, while `DEFAULT_AUTO_FIELD` and `USE_TZ` configure automatic identifiers and timezone-aware dates. The empty `MIDDLEWARE` list keeps this API example minimal, and `ALLOWED_HOSTS` accepts the local addresses and test client host.

These settings are tailored to this tutorial’s endpoint.

The `DATABASES` section tells Django how to reach PostgreSQL.

`ENGINE` selects the PostgreSQL backend. Each `os.environ.get()` reads an optional environment variable and falls back to the matching container value. The options set a five-second lock timeout and a ten-second statement timeout, so a stalled operation raises an error instead of waiting indefinitely.

A timeout is an error path, and this small endpoint doesn't provide a custom response for it.

The `REST_FRAMEWORK` section requires an authenticated user.

`BasicAuthentication` reads credentials supplied with the request. `IsAuthenticated` rejects anonymous callers before the view accepts their prompt. The sample secret key and `DEBUG = True` are local development settings.

For deployment, configure production secrets, appropriate authentication, and encrypted connections.

Replace <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-python"/>`urls.py` with an empty route list for now. We’ll add the endpoint after we fix the credit logic:

```py title="urls.py"
urlpatterns = []
```

This empty list temporarily gives Django no application routes.

Django reads `urlpatterns` from the module named in `ROOT_URLCONF`. We removed the generated admin route because this minimal configuration doesn't enable the admin app. Database commands can still run before an endpoint exists.

We’ll replace this list when the protected view is ready.

### Create the Models

Add these models to <VPIcon icon="fas fa-folder-open"/>`credits/`<VPIcon icon="fa-brands fa-python"/>`models.py`:

```py title="credits/models.py"
from django.conf import settings
from django.db import models


class CreditAccount(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    balance = models.PositiveIntegerField(default=0)


class Generation(models.Model):
    account = models.ForeignKey(CreditAccount, on_delete=models.CASCADE)
    prompt = models.CharField(max_length=500)
    status = models.CharField(max_length=20, default="reserved")
    created_at = models.DateTimeField(auto_now_add=True)
```

`CreditAccount` stores the balance associated with a user.

`settings.AUTH_USER_MODEL` refers to the project’s configured user model. The `OneToOneField` allows at most one account per user, and `on_delete=models.CASCADE` tells Django to remove the account when it deletes that user. `PositiveIntegerField(default=0)` stores a nonnegative whole-number balance with an initial value of zero.

The balance field represents our allowance, but its type alone can't enforce one generation per credit.

`Generation` stores the work the application has accepted.

The foreign key links each record to its paying account and allows an account to have many generations. `prompt` holds up to 500 characters, while `created_at` records when the row is created. `status` starts as `reserved`, meaning our service has recorded the request but hasn't completed the simulated image work.

Keeping a generation record lets us check what the deducted credit actually paid for.

Create and apply the migrations:

```sh
python manage.py makemigrations credits
python manage.py migrate
```

These commands turn the model definitions into database tables.

`makemigrations credits` creates migration files describing the model changes. `migrate` applies pending migrations, including Django’s user tables and our two new tables. The connection comes from the database settings we just configured.

The database is now ready to store an account and its generation requests.

---

## How to Reproduce the Race Condition

Create <VPIcon icon="fas fa-folder-open"/>`credits/services.py` and add this deliberately unsafe function:

```py
from .models import CreditAccount, Generation


class InsufficientCredits(Exception):
    pass


def reserve_generation_unsafe(user_id, prompt):
    account = CreditAccount.objects.get(user_id=user_id)

    if account.balance < 1:
        raise InsufficientCredits

    account.balance -= 1
    account.save(update_fields=["balance"])

    return Generation.objects.create(account=account, prompt=prompt)
```

This function implements the credit check without concurrency protection.

`objects.get()` retrieves the account for`user_id`, and `raise InsufficientCredits` stops the function if the balance is below one. The subtraction changes the Python object, then `save(update_fields=["balance"])` writes that value to the database. Finally, `Generation.objects.create()` inserts the accepted request and returns its model object.

The read and write remain separate operations, so another request can act between them.

`InsufficientCredits` gives the caller a specific failure to handle.

It's a custom exception class derived from Python’s `Exception`. The `pass` statement means we don't add any behaviour to that class. Later, the view will catch this exception and return a useful response.

Keep the deliberately unsafe function available for comparison, but don't route the endpoint through it.

### Make Both Reads Happen Before Either Write

Opening two browser tabs isn't a reliable way to reproduce the bug. One request might finish before the other reads the balance. Instead, we’ll use two Django shells and pause after each has read the account.

Open a terminal in your project directory, activate the virtual environment, and start the shell:

```sh
python manage.py shell
```

This command opens a Python shell with the Django project loaded.

It uses the settings associated with <VPIcon icon="fa-brands fa-python"/>`manage.py`. You can import the models and query the configured database directly. Each terminal you open provides a separate shell for our experiment.

We’ll use those shells to control the order of the database operations.

Create a fresh user and an account with one credit:

```py
from django.contrib.auth import get_user_model
from credits.models import CreditAccount, Generation

user = get_user_model().objects.create_user(username="race-demo")
CreditAccount.objects.create(user=user, balance=1)

account_a = CreditAccount.objects.get(user__username="race-demo")
print(account_a.balance)
```

This block prepares the first operation with a balance of one.

`get_user_model()` retrieves the configured user class, and `create_user()` inserts our demonstration user. The account creation assigns that user one credit. The lookup uses `user__username` to follow the user relationship and stores the resulting account object in `account_a`.

The print should show`1`. Leave this shell open without updating the account.

In a second terminal, activate the same environment and run `python manage.py shell` again. Read the account there too:

```py
from credits.models import CreditAccount, Generation

account_b = CreditAccount.objects.get(user__username="race-demo")
print(account_b.balance)
```

The second shell reads the same database row into a different Python object.

`account_b` belongs to this shell and is separate from `account_a`. The first shell hasn't saved a deduction, so this lookup should also return a balance of one. Later changes in the other shell won't automatically refresh this object.

Both operations now have a copy of the credit they intend to spend.

Return to the first shell and run:

```py
if account_a.balance >= 1:
    account_a.balance -= 1
    account_a.save(update_fields=["balance"])
    Generation.objects.create(account=account_a, prompt="A garden")
```

The first shell now checks and spends its copy of the balance.

The `if` condition passes because `account_a.balance` is one. The subtraction changes it to zero, and `save()` writes zero to the account row. The final line creates a generation for the garden prompt.

Press Enter on a blank line to finish the block before switching terminals.

Then run the corresponding block in the second shell:

```py
if account_b.balance >= 1:
    account_b.balance -= 1
    account_b.save(update_fields=["balance"])
    Generation.objects.create(account=account_b, prompt="A beach")
```

The second shell makes its decision using the object it loaded earlier.

Its `if` condition still sees one because we have not refreshed `account_b`. It subtracts one and saves zero, overwriting the balance with the same value the first operation wrote. It then creates a separate generation for the beach prompt.

The second operation has accepted work using a credit the first operation already spent.

Finally, check the database from the second shell:

```py
account_b.refresh_from_db()
print(account_b.balance)
print(Generation.objects.filter(account=account_b).count())
```

This block checks the stored result of both operations.

`refresh_from_db()` reloads the account so the print reflects the database value. The filtered `count()` counts only generations linked to that account. You should see zero credits and two generation records.

The generation count reveals the failure that the balance alone would hide.

The two shells let us reproduce the unsafe sequence deliberately.

We paused after each read and then allowed both writes. A server can produce the same order when requests overlap, even though it won't do so on every attempt. To repeat the experiment, create a new username and account so previous records don't affect the count.

We can now build protection around the exact gap we observed.

---

## How to Protect the Balance

There are two database concerns in this function. The credit deduction and generation record should succeed together. Competing requests also need a coordinated way to check and update the account.

We’ll address them in that order.

### Keep Related Changes in One Transaction

A **database transaction** groups operations into a unit of work. Django’s `transaction.atomic()` commits the changes when the block completes successfully and rolls them back if an exception leaves the block.

This matters because the unsafe function saves the balance before it creates the generation record. If record creation fails, the deduction can remain without an accepted generation.

For illustration, wrapping the operations looks like this:

```py
from django.db import transaction

@transaction.atomic
def reserve_generation_atomic_only(user_id, prompt):
    account = CreditAccount.objects.get(user_id=user_id)

    if account.balance < 1:
        raise InsufficientCredits

    account.balance -= 1
    account.save(update_fields=["balance"])

    return Generation.objects.create(account=account, prompt=prompt)
```

The decorator places the function’s database operations inside an atomic transaction.

`from django.db import transaction` provides Django’s transaction tools. The function still reads the account, checks the balance, saves the deduction, and creates the generation in that order. If an exception escapes during record creation, the transaction rolls back the deduction too.

This protects the relationship between the deduction and its generation record.

The plain account lookup still leaves the credit check exposed.

PostgreSQL uses Read Committed as its default isolation level. Under it, a plain read inside a transaction doesn't make another transaction wait before reading the row. Both functions can therefore read one credit before either updates it.

We need to coordinate access before making the balance decision.

### Lock the Account Before the Balance Check

Row locking is a database mechanism **that restricts conflicting operations on selected rows while a transaction holds a lock.**

In this example, a row is the stored record for one credit account. A `SELECT FOR UPDATE` lock makes competing updates and conflicting lock requests wait until the lock is released. Ordinary reads can still proceed, and transactions can work on other account rows.

This lets us protect one account while its balance is checked and changed.

Add `from django.db import transaction` at the top of <VPIcon icon="fas fa-folder-open"/>`credits/`<VPIcon icon="fa-brands fa-python"/>`services.py`. Keep the unsafe function for comparison, then add this protected version:

```py
@transaction.atomic
def reserve_generation(user_id, prompt):
    account = CreditAccount.objects.select_for_update().get(user_id=user_id)

    if account.balance < 1:
        raise InsufficientCredits

    account.balance -= 1
    account.save(update_fields=["balance"])

    return Generation.objects.create(account=account, prompt=prompt)
```

This function acquires the account’s row lock before it checks the balance.

`select_for_update()` requests the lock, and `.get(user_id=user_id)` executes the query for this account inside the transaction. Once it holds the lock, the function checks the balance and raises `InsufficientCredits` if necessary. Otherwise, it saves the deduction and creates the generation before the transaction completes.

The decision and its database changes now happen while the account is protected.

A competing call to this function must wait at the locking query.

If the first call commits its deduction, the waiting call checks the updated balance under our Read Committed setup. If the first call rolls back, its deduction doesn't remain. Our configured timeout can also stop the wait with an error.

For one credit and a successful first commit, the second call reads zero and rejects the request.

This protection needs to cover every path that spends the balance.

An older function could still read an account without requesting a lock. Its later update would wait while our lock is held, but it could then overwrite the balance using its stale value. Administrative adjustments and background jobs therefore need a safe update strategy, too.

One protected function can't correct an unsafe writer elsewhere.

### Keep Image Generation Outside the Transaction

The transaction should cover the credit reservation. A remote image request could take much longer than those database operations, so placing it inside the transaction would keep competing requests waiting unnecessarily.

For our demo, add this function to <VPIcon icon="fas fa-folder-open"/>`credits/`<VPIcon icon="fa-brands fa-python"/>`services.py`:

```py title="credits/services.py"
def simulate_generation(generation):
    # No external AI request is made in this tutorial.
    generation.status = "completed"
    generation.save(update_fields=["status"])
    return "Simulated image generation completed."
```

This function simulates completion of an accepted generation.

It changes the supplied generation object’s `status` to `completed`. The `save()` call persists only that field. The return value is a message, so the function produces no image and makes no external request.

We’ll call it after the reservation function returns.

The call order keeps image work outside the reservation transaction.

With these settings and no enclosing transaction, the reservation commits before the simulation starts. A failure after that point wouldn't automatically restore the credit. A real provider integration needs its own retry or refund policy.

We’ll return to those limits after we test the reservation itself.

---

## How to Accept and Test Image Requests

Now we can connect the protected function to an endpoint. Add this code to <VPIcon icon="fas fa-folder-open"/>`credits/`<VPIcon icon="fa-brands fa-python"/>`views.py`:

```py :collapsed-lines title="credits/views.py"
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CreditAccount
from .services import InsufficientCredits, reserve_generation, simulate_generation


class GenerationInput(serializers.Serializer):
    prompt = serializers.CharField(max_length=500)


class GenerateView(APIView):
    def post(self, request):
        serializer = GenerationInput(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            generation = reserve_generation(
                request.user.pk, serializer.validated_data["prompt"]
            )
        except CreditAccount.DoesNotExist:
            return Response({"detail": "Credit account not found."}, status=404)
        except InsufficientCredits:
            return Response({"detail": "Not enough credits."}, status=409)

        result = simulate_generation(generation)
        return Response(
            {"id": generation.pk, "status": generation.status, "result": result},
            status=status.HTTP_201_CREATED,
        )
```

The serializer checks the prompt before the view spends a credit.

`GenerationInput` declares a required text field with a maximum length of 500 characters. `is_valid(raise_exception=True)` rejects missing, blank, or invalid input with a validation response. The view then reads the cleaned value from `validated_data` and passes it with `request.user.pk`, the authenticated user’s database identifier, to the reservation function.

The client supplies a prompt while the server chooses the account from the authenticated user.

The view translates the reservation outcome into a response.

A missing account produces`404`, and `InsufficientCredits` produces `409`, our chosen response for the balance conflict. On success, the view calls the simulation after the reservation returns. It sends `201` with the record identifier, completion status, and simulated result.

These branches let the caller distinguish accepted work from a rejected request.

Replace <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-python"/>`urls.py` with:

```py title="config/urls.py"
from django.urls import path
from credits.views import GenerateView

urlpatterns = [
    path("api/generate/", GenerateView.as_view()),
]
```

This route connects the request address to our view.

`path()` matches the `api/generate/` part of the address. `GenerateView.as_view()` turns the class-based view into a callable Django can dispatch to. The view’s `post()` method handles a POST request at that route.

The endpoint is now available at `/api/generate/` when the server runs.

### Try One Request at a Time

Open the Django shell and create a separate user for the endpoint demonstration:

```py
from django.contrib.auth import get_user_model
from credits.models import CreditAccount

user = get_user_model().objects.create_user(
    username="api-demo",
    password="local-example-password",
)
CreditAccount.objects.create(user=user, balance=1)
```

This block creates a user for the authenticated endpoint example.

`create_user()` saves the username and hashes the supplied password. `CreditAccount.objects.create()` gives the new user one credit. A separate username keeps this check independent of the account used in the two-shell experiment.

The credentials below belong only to this local demonstration account.

Exit the shell and start the development server:

```plaintext
python manage.py runserver
```

This command starts Django’s development server.

With no address argument, it listens at `127.0.0.1:8000`. Requests at that address pass through the route configuration we just added. Keep this terminal open while you send the request from another terminal.

This server is for the local demonstration.

In another terminal, send a request:

```sh
curl -i -u api-demo:local-example-password \
-H "Content-Type: application/json" \
-d '{"prompt": "A garden at sunrise"}' \
http://127.0.0.1:8000/api/generate/
```

This command submits a prompt to the endpoint with the demonstration user’s credentials.

`-i` includes response headers, and `-u` supplies the username and password for Basic authentication. `-H` declares JavaScript Object Notation (**JSON**) as the request body format. `-d` supplies that body and makes curl send a POST request to the address shown.

The first request should return `201` with the simulated completion result.

Sending the command again checks the account after the first deduction.

The next request should find zero credits. The view should return `409` with `"detail": "Not enough credits."`. Because we waited between requests, this verifies the ordinary sequence without exercising concurrency.

Next, we’ll test overlapping operations.

### Set Up the Automated Tests

Replace <VPIcon icon="fas fa-folder-open"/>`credits/`<VPIcon icon="fa-brands fa-python"/>`tests.py` with the following imports and helper class. We’ll add the test methods in the next steps.

```py :collapsed-lines title="credits/tests.py"
from concurrent.futures import ThreadPoolExecutor
from threading import Barrier
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.db import (
    OperationalError, close_old_connections, connection, connections, transaction,
)
from django.test import TransactionTestCase
from rest_framework.test import APIClient

from .models import CreditAccount, Generation
from .services import InsufficientCredits, reserve_generation, reserve_generation_unsafe


class ConcurrencyTests(TransactionTestCase):
    def setUp(self):
        if connection.vendor != "postgresql":
            self.skipTest("Run these concurrency tests on PostgreSQL.")

        self.user = get_user_model().objects.create_user(username="parallel-reader")
        self.account = CreditAccount.objects.create(user=self.user, balance=1)

    def run_two(self, action):
        def worker():
            close_old_connections()
            try:
                return action()
            finally:
                connections.close_all()

        with ThreadPoolExecutor(max_workers=2) as pool:
            futures = [pool.submit(worker) for _ in range(2)]
            return [future.result(timeout=15) for future in futures]
```

The test class prepares a fresh account before each concurrency test.

`setUp()` skips the test when the connection isn't PostgreSQL. It then creates a user and an account with one credit. `TransactionTestCase` allows actual transaction boundaries, unlike regular`TestCase`, whose enclosing transactions can hide lock-usage mistakes.

A skipped test on SQLite doesn't verify PostgreSQL’s lock behaviour.

The `run_two()` helper gives the same action to two worker threads.

`ThreadPoolExecutor(max_workers=2)` provides the workers, and each `pool.submit(worker)` schedules one call. A future represents that call’s eventual result, which `future.result(timeout=15)` retrieves or raises an error for. Each worker clears unusable old connections before the action and closes its own connections, including when the action fails.

This lets the two operations reach the same database through separate connections.

### Confirm the Unsafe Behaviour

Add this method inside`ConcurrencyTests`, at the same indentation level as `run_two()`:

```py
 def test_reproduce_unsafe_spending(self):
        both_have_read = Barrier(2)
        original_get = CreditAccount.objects.get

        def read_then_wait(*args, **kwargs):
            account = original_get(*args, **kwargs)
            both_have_read.wait(timeout=5)
            return account

        with patch(
            "credits.services.CreditAccount.objects.get",
            side_effect=read_then_wait,
        ):
            self.run_two(
                lambda: reserve_generation_unsafe(self.user.pk, "A garden").pk
            )

        self.account.refresh_from_db()
        self.assertEqual(self.account.balance, 0)
        self.assertEqual(Generation.objects.count(), 2)
```

This test forces both unsafe operations to read before either proceeds.

`original_get` keeps the real lookup, and `read_then_wait()` calls it before waiting at `Barrier(2)`. The barrier releases the workers only after both arrive, or raises an error if its wait times out. `patch()` temporarily replaces the service’s lookup with this wrapper for the duration of the with block.

The database read stays real while the test controls the pause after it.

The final assertions document the deliberately incorrect result.

The small lambda calls the unsafe function and returns the created record’s identifier for each worker. After both return, `refresh_from_db()` reloads the account. The assertions expect a zero balance and two generation records in this isolated test.

A pass here confirms reproduction of the bug, not correctness of the unsafe function.

### Check the Protected Endpoint

Add these methods inside the same class:

```py :collapsed-lines
def concurrent_api_requests(self):
        ready = Barrier(2)

        def send_request():
            client = APIClient()
            client.force_authenticate(self.user)
            ready.wait(timeout=5)
            return client.post(
                "/api/generate/",
                {"prompt": "A garden"},
                format="json",
            ).status_code

        return self.run_two(send_request)

    def test_last_credit_accepts_only_one_request(self):
        self.assertEqual(sorted(self.concurrent_api_requests()), [201, 409])
        self.account.refresh_from_db()
        self.assertEqual(self.account.balance, 0)
        self.assertEqual(Generation.objects.count(), 1)

    def test_two_credits_accept_both_requests(self):
        self.account.balance = 2
        self.account.save(update_fields=["balance"])

        self.assertEqual(self.concurrent_api_requests(), [201, 201])
        self.account.refresh_from_db()
        self.assertEqual(self.account.balance, 0)
        self.assertEqual(Generation.objects.count(), 2)
```

The request helper sends two authenticated requests through the protected view.

Each worker creates its own`APIClient`, and `force_authenticate()` supplies the test user without a password exchange. The barrier sits before `post()` so both workers reach the request start together. Each call returns its response code to `run_two()`.

This tests the endpoint’s credit behaviour without also testing the authentication mechanism.

The two test methods cover both insufficient and sufficient shared credit.

The one-credit test sorts the codes because either worker may finish first, then expects one `201` and one `409`. It also checks zero remaining credits and exactly one generation record. The two-credit test changes the starting balance and expects two successes, two records, and a zero balance.

Checking the records as well as the responses helps catch an incorrectly accepted generation.

The barrier coordinates request starts without controlling every database operation.

One request could still progress faster than the other. Moving the barrier after lock acquisition would make the first worker wait for a second worker that can't acquire its lock. The current placement avoids that artificial deadlock but doesn't prove every possible execution order.

Use this regression test alongside the controlled reproduction and documented database behaviour.

### Verify the Service Encounters a Held Lock

We can also test whether the reservation function waits for a lock before it checks the balance.

The test below starts with zero credits so the balance check would immediately reject an unprotected read. The main connection acquires the account lock before it starts a worker. That worker calls the actual reservation function with a one-second lock timeout.

Add this method inside `ConcurrencyTests`:

```py
def test_reservation_waits_for_account_lock(self):
    self.account.balance = 0
    self.account.save(update_fields=["balance"])
    user_id = self.user.pk

    def attempt_reservation():
        close_old_connections()
        try:
            try:
                with transaction.atomic():
                    with connection.cursor() as cursor:
                        cursor.execute("SET LOCAL lock_timeout = '1s'")
                    reserve_generation(user_id, "A garden")
            except OperationalError as error:
                return error.__cause__.sqlstate
            except InsufficientCredits:
                return "insufficient_credits"
            return "accepted"
        finally:
            connections.close_all()

    with ThreadPoolExecutor(max_workers=1) as pool:
        with transaction.atomic():
            CreditAccount.objects.select_for_update().get(pk=self.account.pk)
            result = pool.submit(attempt_reservation).result(timeout=5)
            self.assertEqual(result, "55P03")
        result = pool.submit(attempt_reservation).result(timeout=5)
        self.assertEqual(result, "insufficient_credits")
    self.account.refresh_from_db()
    self.assertEqual(self.account.balance, 0)
    self.assertEqual(Generation.objects.count(), 0)
```

This test controls when the competing lock exists.

The main connection keeps its transaction open while it waits for the worker’s result. Inside the worker’s transaction, `SET LOCAL` temporarily shortens the lock timeout. The worker should return PostgreSQL’s `55P03` error code, which means `lock_not_available`, after the lock wait times out.

A balance rejection at this point would show that the service didn't wait for the account lock before its check.

The second call checks the same operation after the main transaction releases its lock.

This time, the worker can acquire the account lock and read the zero balance. It should return `insufficient_credits` rather than a database error. The final assertions confirm no credit or generation record changed during either attempt.

Together, the two calls check contention and release without relying on two requests happening to overlap.

The zero balance is deliberate and makes the test more specific.

If we used one credit, an unprotected function might still encounter the lock when it eventually tried to update the row. With zero credits, that function would reject the request before any update and fail our expected timeout assertion. The test therefore checks the service’s lock-before-check behaviour, while the preceding endpoint tests check its spending outcomes.

This controlled lock test passed as part of the companion project’s PostgreSQL test suite.

### Check Rollback After a Failure

Outside `ConcurrencyTests` add another class:

```py
class CreditRollbackTests(TransactionTestCase):
    def test_failed_record_creation_restores_credit(self):
        user = get_user_model().objects.create_user(username="rollback-reader")
        account = CreditAccount.objects.create(user=user, balance=1)

        with patch(
            "credits.services.Generation.objects.create",
            side_effect=RuntimeError("Simulated record creation failure"),
        ):
            with self.assertRaises(RuntimeError):
                reserve_generation(user.pk, "A garden")

        account.refresh_from_db()
        self.assertEqual(account.balance, 1)
        self.assertEqual(Generation.objects.count(), 0)
```

This test deliberately raises an exception during generation-record creation.

It first creates an account with one credit. The patch makes `Generation.objects.create()` raise `RuntimeError`, and `assertRaises()` confirms that the error leaves the reservation function. After the transaction rolls back, the refreshed account should still have one credit and no generation record.

This checks that a failed reservation doesn't leave a deduction behind.

Run the tests with PostgreSQL still available:

```py
python manage.py test credits -v 2
```

This command runs the tests in the `credits` app.

`-v 2` asks Django to show each test and its outcome. Django creates a separate test database, so the database user needs permission to create it. The user from our local container has that permission, but an existing database setup may need configuration.

Expect five passes on the intended PostgreSQL setup. Confirm them by execution before relying on the example.

---

## Common Mistakes and Next Steps

The example now protects the credit decision, but a few details are easy to miss when you adapt it.

### Read the Account Inside the Lock

Fetching an account before the transaction and continuing to use that object can leave you with an old balance. The protected function deliberately retrieves the account through `select_for_update()` before making its decision.

Keep this order when you move the code into another service or endpoint. Passing in a user identifier makes the function responsible for its own fresh, locked read.

### Use the Database as the Shared Point of Coordination

Disabling a submit button can reduce accidental clicks, but a second tab or another client can still send a request. A Python thread lock also coordinates only the code sharing that lock in the same process.

If you run multiple application workers, the credit decision still needs protection at the shared database. Review other balance updates, including administrative adjustments, rather than assuming this endpoint is the only writer.

### Consider a Conditional Update for Simpler Counters

Row locks are one approach. For a simple deduction, Django can also express the balance condition and subtraction in one database update using an `F()` expression.

The condition matters: an unconditional subtraction doesn't enforce sufficient credit. If you also create a generation record, keep the deduction and record creation in one transaction.

We used an explicit lock here because it makes the read, decision, and update easy to follow. You can explore conditional updates once you understand what the operation must protect.

### Separate Concurrent Requests from Retries

Our example treats two submissions as two distinct requests. If the user has two credits, both should succeed.

A retry introduces a different requirement. The app might accept a generation but lose the response before the client receives it. If the client resends the same logical request, you may want to return the original result without another charge.

That requires **idempotency**: a way to identify a repeated operation and avoid applying its effect again. A typical design uses a request key, a database uniqueness rule, and a stored result. A balance lock alone doesn't identify duplicate intent.

### Plan for Provider Failures

Once the reservation commits, a later provider failure doesn't automatically restore the credit. You need a policy for whether to retry the generation, refund it, or leave it pending for recovery.

A real implementation also needs to recover if the application stops after it reserves the credit but before it starts the job. The `reserved` record gives you something to track, but this tutorial doesn't implement a durable job queue or recovery worker.

Keep those concerns visible when you extend the example. Preventing concurrent overspending is one part of a complete credit system.

---

## Summary and Next Steps

At the start of this guide, two requests could each pass the balance check and spend the same credit. The balance ended at zero, which made the failure easy to overlook.

We reproduced the sequence, then protected the decision with a transaction and a row lock. We also checked the generation count, tested the case where both requests had enough credit, and added a rollback test for record creation failure.

When you review a similar feature in your own application:

1. State the rule the data must satisfy, such as one credit per accepted generation.
2. Identify where separate requests can read and change the same value.
3. Protect the decision and its related database changes.
4. Test overlapping operations and failures on the database you actually use.

The same reasoning applies to the last item in an online store or any shared allowance. A successful check is only useful if the application can safely act on it.

::: info References

For a deeper look at retries, see [<VPIcon icon="fa-brands fa-aws"/>Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

```component VPCard
{
  "title": "references-details-empty",
  "desc": "At Amazon, we often see patterns in our services in which a complex operation is decomposed into a controlling process making calls to a number of smaller services, each responsible for one part of the overall workflow. For example, consider the launch of an Amazon Elastic Compute Cloud (EC2) instance. “Under the hood” this involves calls to services responsible for making placement decisions, creatin...",
  "link": "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Prevent Race Conditions in Django",
  "desc": "Let's say you have enough credit left to generate one more image in an AI app. You submit a request in one browser tab, then submit another in a second tab before the first finishes. The app accepts b",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-prevent-race-conditions-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
