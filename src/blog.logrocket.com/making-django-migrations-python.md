---
lang: en-US
title: "Making Django migrations in Python"
description: "Article(s) > Making Django migrations in Python"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - python
  - py
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Making Django migrations in Python"
    - property: og:description
      content: "Making Django migrations in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/making-django-migrations-python.html
prev: /programming/py-django/articles/README.md
date: 2021-12-17
isOriginal: false
author:
  - name: Jaya Moore
    url : https://blog.logrocket.com/author/jayamoore/
cover: /assets/image/blog.logrocket.com/making-django-migrations-python/banner.png
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

[[toc]]

---

<SiteInfo
  name="Making Django migrations in Python"
  desc="By working closely with Django migrations to manage a SQL database, you can learn how to troubleshoot costly mistakes."
  url="https://blog.logrocket.com/making-django-migrations-python"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/making-django-migrations-python/banner.png"/>

Python’s [<FontIcon icon="iconfont icon-django"/>Django web framework](https://djangoproject.com/) abstracts away much of the complexity when building web applications. One of its key facets is the ability to dynamically interact with a given database on a user’s behalf.

![Django Migrations With Python](/assets/image/blog.logrocket.com/making-django-migrations-python/banner.png)

Still, any developer needs to understand what’s going on behind the scenes, or it could lead to catastrophic consequences.

In this tutorial, you’ll work closely with Django migrations to manage a SQL database and learn how to troubleshoot costly mistakes.

---

## What is Django?

Django is a popular web framework that allows developers to quickly spin up a web application. Touted as “the web framework for perfectionists with deadlines,” [<FontIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/) takes care of many low-level functions that can slow the development process.

Django offers out-of-the-box capabilities for routing URLs, authenticating users, and interfacing with databases. This is particularly useful for those who have little to no experience with Structured Query Language ([<FontIcon icon="fa-brands fa-wikipedia-w"/>SQL](https://en.wikipedia.org/wiki/SQL)).

SQL is a domain-specific programming language that is used to interact with a relational database management system. Using SQL, one can create, read, update, and remove the records in a given database. However, the intricacies of SQL can be quite complex, and running improper queries can quickly result in the loss of sensitive or irretrievable data.

Django solves this problem by using an [<FontIcon icon="fa-brands fa-wikipedia-w"/>object-relational mapper](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) to interface with the database on your behalf. In other words, you tell Django what structure you want the database to have, and Django takes care of translating your Python instructions to SQL queries to be executed on your chosen database. While you can still write SQL if needed, you don’t have to: you simply define your data models in Python, and Django takes care of the rest.

Here’s an example of a Django data model:

```py{5} title="models.py"
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.DateField()
    ready_to_launch = models.BooleanField(default=True)
```

This data model defines the structure for a database table called `Rocket`. The model states that the `Rocket` table should have three columns: `name`, `launch_date`, and `ready_to_launch`.

Note that this data model doesn’t specify an index or a row counter; that’s because Django implements this automatically under the hood.

Once you’re ready, you’ll pass this data model off to Django, where it will be transformed into the following database table:

| `id` | `name` | `launch_date` | `ready_to_launch` |
| --- | --- | --- | --- |
| 1 | Apollo | 2035-10-19 | False |
| 2 | Orion | 2022-04-05 | True |

The fields of your data model correspond to the headers in your database table. This table has been populated with data, and Django has automatically created a new `id` for each row.

---

## What is a migration?

So, how exactly does Django translate your Python model into a database table? Surely defining a table structure as a data model isn’t all there is to it.

Well, in order to go from data model to database table, you’ll need a migration. This is a special type of Python file that contains the instructions that Django needs to create the database table on your behalf.

Django uses your data model to populate these instructions and then runs a `migrate` command to apply those changes to the database.

In short, Django migrations follow two key steps:

1. Create a migration file containing instructions for altering the database table
2. Migrate the database table by running the code contained in the migration file

This two-step process ensures that only the changes you explicitly want to be made are applied. If a migration file contains an error or is missing a critical field, you’re able to correct the issue before applying the changes to the database itself.

This process makes it extremely simple for even junior web developers to interact with a robust database management system. There’s no need for complex SQL queries or to use a browser-based management console to change the database.

Simply define your data models, migrate your changes, and you’re good to go! Migrations are an excellent example of Django’s rapid prototyping capabilities.

---

## Setting up a Django project

Let’s initialize our project by creating a new folder and activating a virtual environment:

```sh
mkdir django-migrations-tutorial
cd django-migrations-tutorial
python3 -m venv django-tut
source django-tut/bin/activate
```

The `source django-tut/bin/activate` command will activate the `django-tut` virtual environment on Linux or macOS. If you’re on Windows, the command will look slightly different:

```sh
django-tut/bin/activate
```

Inside of your virtual environment, install the latest version of Django:

```sh
python3 -m pip install django
```

Now that you have Django installed, you can start a new project using the `startproject` command. Let’s name our project `log_rocket`:

```sh
django-admin startproject log_rocket.
```

The trailing period tells Django to install the project inside the current directory. Here’s what the project directory looks like now (excluding the virtual environment directory):

```sh
tree
#
# .
# ├── log_rocket
# │   ├── asgi.py
# │   ├── __init__.py
# │   ├── settings.py
# │   ├── urls.py
# │   └── wsgi.py
# └── manage.py
# 
# 1 directory, 6 files
```

---

## Performing Django migrations

Because Django acts as a scaffold to help you bootstrap your web development, it comes prepackaged with several internal data models and will automatically create a SQLite database for you when you apply an initial migration.

To migrate Django’s internal data models and create the initial database, you’ll use the `migrate` management command:

```sh
python3 manage.py migrate
# 
# Operations to perform:
#   Apply all migrations: admin, auth, contenttypes, sessions
# Running migrations:
#   Applying contenttypes.0001_initial... OK
#   Applying auth.0001_initial... OK
#   Applying admin.0001_initial... OK
#   Applying admin.0002_logentry_remove_auto_add... OK
#   Applying admin.0003_logentry_add_action_flag_choices... OK
#   Applying contenttypes.0002_remove_content_type_name... OK
#   Applying auth.0002_alter_permission_name_max_length... OK
#   Applying auth.0003_alter_user_email_max_length... OK
#   Applying auth.0004_alter_user_username_opts... OK
#   Applying auth.0005_alter_user_last_login_null... OK
#   Applying auth.0006_require_contenttypes_0002... OK
#   Applying auth.0007_alter_validators_add_error_messages... OK
#   Applying auth.0008_alter_user_username_max_length... OK
#   Applying auth.0009_alter_user_last_name_max_length... OK
#   Applying auth.0010_alter_group_name_max_length... OK
#   Applying auth.0011_update_proxy_permissions... OK
#   Applying auth.0012_alter_user_first_name_max_length... OK
#   Applying sessions.0001_initial... OK
```

The output should show that Django has successfully run its own internal instructions to create an initial database. Now, if you examine the directory structure again, you should see a new file:

```sh
tree
# 
# .
# ├── db.sqlite3
# ├── log_rocket
# │   ├── asgi.py
# │   ├── __init__.py
# │   ├── __pycache__
# │   │   ├── __init__.cpython-38.pyc
# │   │   ├── settings.cpython-38.pyc
# │   │   └── urls.cpython-38.pyc
# │   ├── settings.py
# │   ├── urls.py
# │   └── wsgi.py
# └── manage.py
# 
# 2 directories, 10 files
```

At the top of the tree, there’s a new database file, <FontIcon icon="iconfont icon-sqlite"/>`db.sqlite3`. This is a SQLite database, which is the default database that Django creates for local development and testing purposes.

You can use the `dbshell` management command to examine the new database and confirm that Django has created the tables:

```sh
python3 manage.py dbshell
# 
# SQLite version 3.28.0 2019-04-16 19:49:53
# Enter ".help" for usage hints.
# sqlite>
```

In the prompt, type `.tables` to see a list of all the tables in the database:

```sql title="sqlite prompt"
.tables
-- 
-- auth_group                  auth_user_user_permissions
-- auth_group_permissions      django_admin_log
-- auth_permission             django_content_type
-- auth_user                   django_migrations
-- auth_user_groups            django_session
.exit
```

You can exit the database shell with the `.exit` command.

---

## Creating migrations for new models

Django comes with a few data models built-in, but you’ll need to define most of them from scratch. In this section, we’ll create a Django app, define a model for it, and migrate your changes to the database.

Previously, we started a Django project called `log_rocket`. Now, you’ll create an app to attach to this project. A Django project is a directory that contains the global settings needed to manage all apps that are associated with it.

A Django app is a self-contained chunk of a larger project that focuses on a discrete portion of the whole. For example, a web project may contain a blogging app, a users app, a newsletter app, and more.

Let’s create an app for our project called `rockets`:

```sh
python3 manage.py startapp rockets
```

To tell Django about your new app, add its name to the `INSTALLED_APPS` setting in your project settings file:

```py title="log_rocket/settings.py"
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rockets' # add your new app name here
]
```

This will create a new directory called `rockets` alongside your project directory. If you examine the files in this new directory, you’ll see that Django has already provided the files you’ll need to define a new data model:

```sh
tree rockets/
# 
# rockets/
# ├── admin.py
# ├── apps.py
# ├── __init__.py
# ├── migrations
# │   └── __init__.py
# ├── models.py
# ├── tests.py
# └── views.py
# 
# 1 directory, 7 files
```

There’s a <FontIcon icon="fa-brands fa-python"/>`models.py` file, which you’ll use to define your data model, as well as a `migrations/` folder for Django to store the instructions for turning your data models into database tables.

Let’s move the `Rocket` data model we saw earlier into the <FontIcon icon="fa-brands fa-python"/>`models.py` file. Open the file in your text editor and paste in the code:

```py
from django.db import models

# Create your models here.
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.DateField()
    ready_to_launch = models.BooleanField(default=True)
```

Save and close the file. Now, you need to tell Django that you want to make a new table in the database. In other words, you need to make a migrations file for Django to use. Thankfully, Django comes with a handy management command that you can use to do this, called `makemigrations`:

```sh
python3 manage.py makemigrations rockets
# 
# Migrations for 'rockets':
#   rockets/migrations/0001_initial.py
#     - Create model Rocket
```

The output you see is Django confirming that you want to create a migration file for the `rockets` app, within which you’ve defined a new model named `Rocket`.

The instructions for this data model are saved in the <FontIcon icon="fas fa-folder-open"/>`migrations/` folder, with the file name <FontIcon icon="fa-brands fa-python"/>`0001_initial.py`. You can open this file and confirm that the changes Django is going to make match what you’ve specified in your <FontIcon icon="fa-brands fa-python"/>`models.py` file.

Once you’ve confirmed the instructions are correct, you can tell Django to apply them with the `migrate` command:

```sh
python3 manage.py migrate rockets
# 
# Operations to perform:
#   Apply all migrations: rockets
# Running migrations:
#   Applying rockets.0001_initial... OK
```

All migrations were applied successfully. Now, when you open `dbshell` and examine the list of tables, you should see a new one:

```sh
python3 manage.py dbshell
# 
# SQLite version 3.28.0 2019-04-16 19:49:53
# Enter ".help" for usage hints.
```

```sql title="sqlite prompt"
.tables
-- auth_group                  django_admin_log
-- auth_group_permissions      django_content_type
-- auth_permission             django_migrations
-- auth_user                   django_session
-- auth_user_groups            rockets_rocket
-- auth_user_user_permissions
.quit
```

Django has named the new table `rockets_rocket` after the name of the app (`rockets`) and the lowercase name of the model you specified (`Rockets`).

You can manually add data to the new table using an `INSERT` SQL query:

```sql
INSERT INTO rockets_rocket (name, launch_date, ready_to_launch) VALUES ("Apollo", "2035-10-19", False);
INSERT INTO rockets_rocket (name, launch_date, ready_to_launch) VALUES ("Orion", "2022-04-05", True);
SELECT * FROM rockets_rocket;
-- 
-- 1|Apollo|2035-10-19|0
-- 2|Orion|2022-04-05|1
```

Here, you used the same field names that you defined in your `Rocket` model. Each row is automatically assigned a unique `id`.

Note that you’ve manually inserted strings into the `launch_date` column, even though your data model specified that these fields should be `date` objects. Because you’ve already put strings into the database, you’ll want to update your data model to handle values in this column as character data instead. The next section will walk you through how to do this.

---

## Applying migrations to existing models

It’s highly unlikely that the first time you work on a model will also be the last. More often than not, you’ll need to tweak your models to reflect desired changes to the underlying database.

For instance, the `launch_date` field now contains string data that was manually inserted into the database. However, in your `Rocket` data model, you initially decided that this field should contain a `date` object.

Because it’s easier to manually insert strings into a database, let’s change this field on our model to accept character data:

```py title="models.py"
from django.db import models

# Create your models here.
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.CharField(max_length=200) # Update this line
    ready_to_launch = models.BooleanField(default=True)
```

Now, run the same commands to tell Django about the change to the data model:

```sh
python3 manage.py makemigrations rockets
# 
# Migrations for 'rockets':
#   rockets/migrations/0002_alter_rocket_launch_date.py
#     - Alter field launch_date on rocket
```

Django correctly recognizes that you’ve altered the `launch_date` field. Because this is what you want to happen, you can apply this migration:

```sh
python3 manage.py migrate rockets
# 
# Operations to perform:
#   Apply all migrations: rockets
# Running migrations:
#   Applying rockets.0002_alter_rocket_launch_date... OK
```

From this point forward, Django will ensure that all dynamically generated launch dates are rendered as strings.

You can use the `dbshell` to view the database schema and confirm that this change was made:

```sql title="sqlite prompt"
.schema rockets_rocket
-- 
-- CREATE TABLE IF NOT EXISTS "rockets_rocket" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "ready_to_launch" bool NOT NULL, "launch_date" varchar(200) NOT NULL);
```

Here, you can see that the `"launch_date"` column should contain `varchar(200)` data, or character data with a length no longer than 200 characters.

---

## Reversing migrations

Let’s say that you’ve decided it was better to have the `launch_date` rendered as a date object. This will make it easier to schedule rocket launches, as you can take advantage of Python functions like `datetime.timedelta()`. This means you’ll need to undo that change you just made to the `launch_date` field in the database.

Once again, Django saves the day by providing you with simple commands that you can use to quickly reverse your changes. To unapply a migration, you’ll need to migrate the database once more, passing in the name of the migration that you want to revert to as an argument.

Django helpfully numbers the migrations for you. Changing the `launch_date` field was the second migration performed, and it’s named `0002_alter_rocket_launch_date`. To undo this change, you’ll want to revert to the first migration, which is named `0001_initial`:

```sh
python3 manage.py migrate rockets 0001_initial
# 
# Operations to perform:
#   Target specific migration: 0001_initial, from rockets
# Running migrations:
#   Rendering model states... DONE
#   Unapplying rockets.0002_alter_rocket_launch_date... OK
```

The output confirms that Django has reversed the second migration.

A quick look at the database schema also confirms the reversal:

```sql title="sqlite prompt"
.schema rockets_rocket
-- 
-- CREATE TABLE IF NOT EXISTS "rockets_rocket" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "launch_date" date NOT NULL, "name" varchar(200) NOT NULL, "ready_to_launch" bool NOT NULL);
```

The type for the `"launch_date"` column has been set to a `date` object once again.

---

## Showing migrations

If you want to see a quick overview of what migrations have been applied to a Django project, you can use the `showmigrations` command to view them all at once:

```sh
python3 manage.py showmigrations
# 
# admin
#  [X] 0001_initial
#  [X] 0002_logentry_remove_auto_add
#  [X] 0003_logentry_add_action_flag_choices
# auth
#  [X] 0001_initial
#  [X] 0002_alter_permission_name_max_length
#  [X] 0003_alter_user_email_max_length
#  [X] 0004_alter_user_username_opts
#  [X] 0005_alter_user_last_login_null
#  [X] 0006_require_contenttypes_0002
#  [X] 0007_alter_validators_add_error_messages
#  [X] 0008_alter_user_username_max_length
#  [X] 0009_alter_user_last_name_max_length
#  [X] 0010_alter_group_name_max_length
#  [X] 0011_update_proxy_permissions
#  [X] 0012_alter_user_first_name_max_length
# contenttypes
#  [X] 0001_initial
#  [X] 0002_remove_content_type_name
# rockets
#  [X] 0001_initial
#  [ ] 0002_alter_rocket_launch_date
# sessions
#  [X] 0001_initial
```

Look closely at the migrations for the `rockets` app. Even though you reversed the change to the `launch_date` field, Django has still kept a record of this migration. Indeed, you can list the contents of the migrations directory and see that the file is still there.

This is an immensely useful feature, as it allows you to reapply a previously reversed migration should you so choose. However, Django will automatically reapply that migration the next time you migrate the entire project, so keep this in mind.

---

## Troubleshooting errors in Django migrations

This section will cover a few errors you might come across while working with Django migrations. The concepts in this section are considered advanced because of the severe potential for critical data loss.

Remember to use datasets that you either have a backup for, or whose data you don’t mind losing completely, while you practice the techniques mentioned in the following sections.

### Deleting a migration file

In the previous section, you saw that Django keeps a record of all migrations, even ones you’ve unapplied. Furthermore, you know that if you try to migrate the database again, Django will reapply that migration automatically! How can you stop this from happening?

You might try to delete the migration file and migrate the database from there:

```sh
rm rockets/migrations/0002_alter_rocket_launch_date.py
```

This will remove the file that says to change the `launch_date` field to accept character data instead of a date object.

However, Django will present you with an error message if you try to migrate the database now:

```sh
python3 manage.py migrate rockets
# 
# Operations to perform:
#   Apply all migrations: rockets
# Running migrations:
#   No migrations to apply.
#   Your models in app(s): 'rockets' have changes that are not yet reflected in a migration, and so won't be applied.
#   Run 'manage.py makemigrations' to make new migrations, and then re-run 'manage.py migrate' to apply them.
```

This error message is saying that your data model does not match what’s currently in the database. When you deleted the migrations field, you deleted the instructions that said to change the `launch_date` field. However, your Django model itself still reflects this change.

To fix this, you need to go into your<FontIcon icon="fa-brands fa-python"/> `models.py` file and manually reverse the change as well:

```py{5} title="models.py"
from django.db import models

# Create your models here.
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.DateField() # Update this line
    ready_to_launch = models.BooleanField(default=True)
```

Now, when you migrate the database, Django will confirm that the table schema and your model are in sync:

```sh
python3 manage.py migrate rockets
# 
# Operations to perform:
#   Apply all migrations: rockets
# Running migrations:
#   No migrations to apply.
```

Looking good!

### Deleting a model field

When you’re working with production-grade projects, you’ll likely not be the only developer on the team. That means other developers will be interacting with the database and making asynchronous changes.

Say that one of your teammates misunderstood the requirements and accidentally removed the `launch_date` field completely. (To replicate this behavior, go ahead and remove the `launch_date` field from your data model and apply the migration.) The truncated output of `showmigrations` shows what happened:

```plaintext title="output"
rockets
 [X] 0001_initial
 [X] 0002_remove_rocket_launch_date
```

Not a problem, right? Let’s try to revert the migration and see what happens:

```sh
python3 manage.py migrate rockets 0001_initial
# 
# Operations to perform:
#   Target specific migration: 0001_initial, from rockets
# Running migrations:
#   Rendering model states... DONE
#   Unapplying rockets.0002_remove_rocket_launch_date...Traceback (most recent call last):
#   File "/django-migrations-tutorial/django-tut/lib/python3.8/site-packages/django/db/backends/utils.py", line 84, in _execute
#     return self.cursor.execute(sql, params)
#   File "/django-migrations-tutorial/django-tut/lib/python3.8/site-packages/django/db/backends/sqlite3/base.py", line 423, in execute
#     return Database.Cursor.execute(self, query, params)
# sqlite3.IntegrityError: NOT NULL constraint failed: new__rockets_rocket.launch_date
# ... # truncated for length
```

Uh-oh… Django won’t apply the migration because doing so would violate a constraint on the database.

Take a closer look at the table schema:

```sql title="sqlite prompt"
.schema rockets_rocket
-- 
-- CREATE TABLE IF NOT EXISTS "rockets_rocket" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "launch_date" date NOT NULL, "name" varchar(200) NOT NULL, "ready_to_launch" bool NOT NULL);
```

You can see that the `"launch_date"` field has a constraint on it called `NOT NULL`. This means that each row in the database must have a value in this field — it cannot be empty. Django models carry this constraint by default.

Unfortunately, when your colleague removed the `launch_date` field, Django applied this change to the database, dropping that column from the table as well:

```sql title="sqlite prompt"
SELECT * FROM rockets_rocket;
-- 
-- 1|Apollo|0
-- 2|Orion|1
```

You cannot simply undo the change because you would be reverting to a database schema that requires the `launch_date` column to have a value in it. Yet, the table has existing rows that have no values for this field! Django is unable to reconcile the conflict, so the migration will not run.

To fix this, you’ll need to explicitly re-define the deleted table column in your data model:

```py title="models.py"
from django.db import models

# Create your models here.
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.DateField() # Make sure this line exists
    ready_to_launch = models.BooleanField(default=True)
```

When you try to make the new migration, you should be greeted with the following prompt:

```sh
python3 manage.py makemigrations rockets
# 
# You are trying to add a non-nullable field 'launch_date' to rocket without a default; we can't do that (the database needs something to populate existing rows).
# Please select a fix:
#  1) Provide a one-off default now (will be set on all existing rows with a null value for this column)
#  2) Quit, and let me add a default in models.py
# Select an option:
```

This time, Django can ask you explicitly what you want to do about the non-nullable field `launch_date`. Select the option to provide a one-off default value:

```sh
# 
# Select an option: 1
# Please enter the default value now, as valid Python
# The datetime and django.utils.timezone modules are available, so you can do e.g. timezone.now
# Type 'exit' to exit this prompt
# >>> timezone.now()
# Migrations for 'rockets':
#   rockets/migrations/0003_rocket_launch_date.py
#     - Add field launch_date to rocket
```

The `launch_date` field accepts `date` objects, so you can use the `timezone.now()` function to provide the current date and time as a default value.

You can examine the newly created migrations file to confirm that Django will use that default value on existing rows in the database:

```py title="rockets/migrations/0003_rocket_launch_date.py"
class Migration(migrations.Migration):
    # ...
    operations = [
        migrations.AddField(
            model_name='rocket',
            name='launch_date',
            field=models.DateField(default=datetime.datetime(2021, 12, 2, 4, 9, 37, 82124, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
```

Now, when you migrate the database, Django will add the `launch_date` back to the table, and populate the existing rows with the specified default value:

```sql title="sqlite prompt"
SELECT * FROM rockets_rocket;
-- 
-- 1|Apollo|0|2021-12-02
-- 2|Orion|1|2021-12-02
```

If you don’t want to supply a default value, then you can mitigate this issue by explicitly removing the `NOT NULL` constraint. This is done by passing an argument in to the field you’re defining in your data model:

```py{5} title="models.py"
from django.db import models

# Create your models here.
class Rocket(models.Model):
    """A model of a rocket ship."""
    name = models.CharField(max_length=200)
    launch_date = models.DateField(null=True) # Allow null values
    ready_to_launch = models.BooleanField(default=True)
```

Now, if the `launch_date` column is removed and added back in, Django will apply the migration even when existing table rows contain no value for this field.

---

## Conclusion

Django’s object-relational mapper is a powerful tool and a boon to Python web developers across the world. In this tutorial, you’ve seen how you can work with Django migrations to quickly spin up database tables in Python without the need to write any SQL queries on your end.

You also learned a few techniques to troubleshoot errors like accidentally deleting a migration file or dropping a field from a database table. Working with data is a touchy endeavor, and while Django can help you reverse some mistakes, it can’t recover the data itself — so be sure to always back up your tables!

If you have any questions or comments, then please share them in the comments section below.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Making Django migrations in Python",
  "desc": "By working closely with Django migrations to manage a SQL database, you can learn how to troubleshoot costly mistakes.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/making-django-migrations-python.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
