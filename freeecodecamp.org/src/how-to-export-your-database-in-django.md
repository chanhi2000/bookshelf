---
lang: en-US
title: "How to Export Your Database in Django"
description: "Article(s) > How to Export Your Database in Django"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Data Science
  - PostgreSQL
  - SQLite
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - django
  - py-django
  - data-science
  - sql
  - postgres
  - postgresql
  - sqlite
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Export Your Database in Django"
    - property: og:description
      content: "How to Export Your Database in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-export-your-database-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-04-22
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745248996492/6d3f5665-3329-4894-9f99-3ba257867e0d.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "SQLite > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/sqlite/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Export Your Database in Django"
  desc="When you're working on a Django project - whether it's a small side project or a growing web app - there comes a point where you need to export your database. Maybe you’re switching hosting providers. Maybe you're backing things up or sharing data wi..."
  url="https://freecodecamp.org/news/how-to-export-your-database-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745248996492/6d3f5665-3329-4894-9f99-3ba257867e0d.png"/>

When you're working on a Django project - whether it's a small side project or a growing web app - there comes a point where you need to export your database.

Maybe you’re switching hosting providers. Maybe you're backing things up or sharing data with someone. Or maybe you just want to peek at your data in a different format.

Exporting a database sounds technical (and yeah, it kind of is), but it doesn’t have to be hard. Django gives you built-in tools that make the process much easier than most people expect.

I’ve worked with Django for a while now, and I’ve helped developers, from beginners to pros, deal with database exports.

In this tutorial, I’m going to walk you through all the ways you can export your database in Django.

---

## Why Would You Want To Export Your Database?

There are a bunch of reasons you might want to export your Django database:

- **Backup**: Before making big changes, it's smart to save a copy.
- **Migration**: Moving to another server or switching from SQLite to PostgreSQL.
- **Sharing data**: Giving a snapshot of the data to teammates or analysts.
- **Testing**: Populating a test or staging environment with real data.
- **Compliance**: Legal or policy reasons for storing data outside your app.

The good news? Django has solid tools to help you do all this quickly and cleanly.

---

## First Things First: Know Your Database

Django supports several types of databases: SQLite (the default), PostgreSQL, MySQL, and more. Depending on what you’re using, your export process might look a little different.

But for most common cases, especially if you’re using SQLite or PostgreSQL, the methods I’m about to show you will work great.

### Method 1: Use Django’s `dumpdata` Command

This is the easiest and most common way to export your data.

#### Step-by-step:

1. Open your terminal.
2. Navigate to your Django project folder.
3. Run the following command:

```sh
python manage.py dumpdata > db.json
```

That’s it. You’ve just exported all your data into a JSON file called <FontIcon icon="iconfont icon-json"/>`db.json`.

#### What’s happening here?

- `dumpdata` is a Django management command that goes through your database and exports the data from all the models.
- The `>` the symbol means "send the output into a file" instead of printing it on the screen.

#### Want to export just one app?

You can be more specific:

```sh
python manage.py dumpdata myapp > myapp_data.json
```

Or even one model:

```sh
python manage.py dumpdata myapp.MyModel > model_data.json
```

This is useful if your database is big and you only need a slice of it.

#### A Quick Tip About Fixtures

The file you just created (<FontIcon icon="iconfont icon-json"/>`db.json`) is called a *fixture* in Django. You can use it to load data into another project using:

```sh
python manage.py loaddata db.json
```

So yeah, `dumpdata` + `loaddata` is a super handy combo for moving data around.

### Method 2: Use Your Database’s Tools

Depending on what database you're using, you can also use tools that work outside of Django.

#### For SQLite (Django’s default)

Your database is just a file, usually named <FontIcon icon="iconfont icon-sqlite"/>`db.sqlite3`.

You can copy it like any other file:

```sh
cp db.sqlite3 db_backup.sqlite3
```

If you want to export the data as SQL statements, you can use the `sqlite3` command-line tool:

```sh
sqlite3 db.sqlite3 .dump > db_dump.sql
```

This creates a file with all the SQL commands needed to recreate your database. Pretty handy for backups.

#### For PostgreSQL

You’ll need access to `pg_dump`, which is PostgreSQL's built-in export tool.

Here’s an example:

```sh
pg_dump -U your_username your_database > backup.sql
```

You might need to enter your password, depending on how your database is set up.

You can [<FontIcon icon="iconfont icon-postgresql"/>find more info on `pg_dump` here](https://postgresql.org/docs/current/app-pgdump.html).

### Method 3: Export to CSV for Excel or Google Sheets

If you want your data in a spreadsheet, you can export it to CSV format.

Django doesn’t have a built-in command for this, but you can write a simple script.

Here’s an example that exports all entries from a model:

::: tip Example:

Let’s say you have a model like this:

```py title="models.py"
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
```

To export it to CSV:

```py title="export_books.py"
import csv
from myapp.models import Book

with open('books.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Title', 'Author'])

    for book in Book.objects.all():
        writer.writerow([book.title, book.author])
```

Run this script with Django’s shell:

```sh
python manage.py shell < export_books.py
```

Now you have a <FontIcon icon="fas fa-file-csv"/>`books.csv` file you can open in Excel or Google Sheets.

:::

### Method 4: Use Django Admin Actions

If your model is registered in the Django admin, you can create a custom admin action that lets you export data directly from the interface.

Here’s a quick example:

```py title="admin.py"
import csv
from django.http import HttpResponse
from .models import Book

@admin.action(description='Export selected books to CSV')
def export_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=books.csv'
    writer = csv.writer(response)
    writer.writerow(['Title', 'Author'])

    for book in queryset:
        writer.writerow([book.title, book.author])

    return response

class BookAdmin(admin.ModelAdmin):
    actions = [export_to_csv]

admin.site.register(Book, BookAdmin)
```

Now you can select rows in the Django admin and export them. Easy and user-friendly.

---

## FAQs

::: details Can I export data in XML format instead of JSON?

Yes! Just add the `--format` option:

```sh
python manage.py dumpdata --format=xml > db.xml
```

:::

::: details What’s the best format for backups?

JSON is great for Django-to-Django transfers. SQL (using `pg_dump` or `sqlite3 .dump`) is better for full database backups.

:::

::: details Can I automate backups?

Totally. Set up a cron job or a simple Python script that runs `dumpdata` on a schedule and saves the file to cloud storage.

:::

---

## Wrapping Up

Exporting your database in Django doesn’t have to be a big deal. With built-in commands like `dumpdata`, or even custom scripts for CSV exports, you can handle data safely and with confidence. And once you get the hang of it, you’ll probably use these tools all the time.

::: info Further Reading

<SiteInfo
  name="django-admin and manage.py | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/django-admin//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

<SiteInfo
  name="pg_dump"
  desc="pg_dump pg_dump — extract a PostgreSQL database into a script file or other archive file Synopsis pg_dump [connection-option...] [option...] [dbname] …"
  url="https://postgresql.org/docs/17/app-pgdump.html/"
  logo="https://postgresql.org/favicon.ico"
  preview="https://postgresql.org/media/img/about/press/elephant.png"/>

```component VPCard
{
  "title": "SQLite Backup API",
  "desc": "1. Using the SQLite Online Backup API",
  "link": "https://sqlite.org/backup.html/",
  "logo": "https://sqlite.org/favicon.ico",
  "background": "rgba(4,74,100,0.2)"
}
```

<SiteInfo
  name="django-admin and manage.py | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/ref/django-admin/"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Export Your Database in Django",
  "desc": "When you're working on a Django project - whether it's a small side project or a growing web app - there comes a point where you need to export your database. Maybe you’re switching hosting providers. Maybe you're backing things up or sharing data wi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-export-your-database-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
