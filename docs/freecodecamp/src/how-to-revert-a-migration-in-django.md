---
lang: en-US
title: "How to Revert a Migration in Django"
description: "Article(s) > How to Revert a Migration in Django"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Revert a Migration in Django"
    - property: og:description
      content: "How to Revert a Migration in Django"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-revert-a-migration-in-django.html
prev: /programming/py-django/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745937479722/d02a1abc-33b1-4506-8001-033b4ec43130.png
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
  name="How to Revert a Migration in Django"
  desc="So, you're working with Django, you've run a migration, and now something’s broken. Maybe you added a field that shouldn't be there. Maybe you renamed a model, and suddenly your database is a mess. Or maybe you're just experimenting and want to roll ..."
  url="https://freecodecamp.org/news/how-to-revert-a-migration-in-django"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745937479722/d02a1abc-33b1-4506-8001-033b4ec43130.png"/>

So, you're working with Django, you've run a migration, and now something’s broken. Maybe you added a field that shouldn't be there.

Maybe you renamed a model, and suddenly your database is a mess. Or maybe you're just experimenting and want to roll things back.

That’s where reverting migrations comes in.

Knowing how to undo a migration in Django is just as important as knowing how to make one. It’s not about being perfect - it’s about being able to fix mistakes fast, without panic. I've been there.

A single migration can break everything if it goes wrong. But the good news is, Django gives you tools to take a step back safely.

Let me walk you through how this works, using plain language and clear steps.

---

## What Exactly Is a Migration in Django?

Before we can talk about undoing a migration, let’s make sure we’re on the same page.

A migration in Django is a record of changes to your database. It tracks what models you’ve added or changed, and applies those changes to your actual database using SQL (behind the scenes).

You usually create a migration with this command:

```sh
python manage.py makemigrations
```

And apply it like this:

```sh
python manage.py migrate
```

That’s when Django updates your database tables to match your models.

Now, what if you want to undo that last step?

---

## How to Revert a Migration in Django

Alright, here’s the main part. Let’s say you just ran a migration and want to undo it. There are two situations:

1. **You applied the migration already and want to reverse it**
2. **You haven’t applied it yet and just want to delete it**

Let’s handle both.

### Case 1: Undo a Migration That’s Already Been Applied

If you've already run `python manage.py migrate`, Django has changed your database.

To reverse that migration, use this:

```sh
python manage.py migrate your_app_name migration_name_before
```

Let me break that down:

- `your_app_name` is the name of your Django app (like `blog`, `users`, or `store`)
- `migration_name_before` is the name of the migration *before* the one you want to undo

Let’s go through an example.

Say you have these migrations for an app called `store`:

```plaintext title="files"
0001_initial.py  
0002_add_price_to_product.py  
0003_change_price_field.py
```

If you want to undo the <VPIcon icon="fa-brands fa-python"/>`0003_change_price_field.py` migration, you’d run:

```sh
python manage.py migrate store 0002
```

That tells Django to roll back to migration `0002`, effectively undoing everything in `0003`.

Once that’s done, you’ll see output like:

```plaintext title="output"
Operations to reverse:
   - Alter field price on product
```

And your database is back the way it was before `0003`.

### Case 2: Undo a Migration You Haven’t Applied Yet

Maybe you ran `makemigrations`, but not `migrate`. So you just created the migration file and haven’t actually touched the database yet.

In that case, you can safely delete the migration file.

Just go into your app’s <VPIcon icon="fas fa-folder-open"/>`migrations/` folder, and delete the unwanted migration file (for example: <VPIcon icon="fa-brands fa-python"/>`0003_change_price_field.py`).

Then you can re-run `makemigrations` with the correct changes.

Quick tip: Don't delete <VPIcon icon="fa-brands fa-python"/>`__init__.py` or the <VPIcon icon="fa-brands fa-python"/>`0001_initial.py` file unless you know what you’re doing. That first one is usually required.

---

## Special Case: Reverting All Migrations (Reset Everything)

Sometimes you just want to wipe all the migrations and start over.

This is common when you're still in development, and your database structure is messy.

Here's how I usually do it:

1. **Delete the migration files** inside the <VPIcon icon="fas fa-folder-open"/>`migrations/` folder of your app (except for <VPIcon icon="fa-brands fa-python"/>`__init__.py`)
2. **Drop the database** or just clear the tables if you're using SQLite or a test DB
3. Run:

```sh
python manage.py makemigrations
python manage.py migrate
```

If you're using SQLite, you can also just delete the <VPIcon icon="iconfont icon-sqlite"/>`.sqlite3` file and start fresh.

For PostgreSQL or MySQL, you'll need to drop and recreate the database, or reset it using a tool like `pgAdmin` or `DBeaver`.

---

## Example Scenario: Fixing a Broken Migration

Let’s say you added a new field to a model:

```py
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
```

You made a typo:

```py
price = models.DecimalField(max_digits=6, decimal_places=2, default='free')
```

Oops. Django lets you do this:

```sh
python manage.py makemigrations store
python manage.py migrate
```

Then it breaks.

You can fix this by reverting:

```sh
python manage.py migrate store 0001
```

Then fix the typo in your model and run:

```sh
python manage.py makemigrations
python manage.py migrate
```

Back on track!

---

## Common Pitfalls (And How to Avoid Them)

- **Don’t just delete a migration without reversing it first**. This can confuse Django.
- **Always check which migrations are applied** using:

```sh
python manage.py showmigrations
```

- **Keep backups of your database**, especially in production. Use tools like `pg_dump` or `mysqldump` if needed.
- **Don't reset migrations in a live app** unless you absolutely must. It can mess up production data.

---

## FAQs

::: details Can I revert more than one migration at a time?

Yes! You just migrate back to the point *before* the migrations you want to undo.

**Example:**

You’ve applied:

```plaintext
[X] 0001_initial  
[X] 0002_add_price_to_product  
[X] 0003_change_price_field  
[X] 0004_add_discount_field
```

To undo both `0004` and `0003`, run:

```sh
python manage.py migrate store 0002
```

This rolls back both 0004 and 0003, leaving only 0001 and 0002 applied.

:::

::: details How do I know which migration names to use?

Run `python manage.py showmigrations` And you’ll see a list like:

```plaintext
[X] 0001_initial
[X] 0002_add_price_to_product
[X] 0003_change_price_field
```

The `[X]` shows applied migrations. To undo `0003`, migrate back to `0002`.

:::

::: details Is reverting migrations safe?

It is, as long as you haven’t made changes to data that depend on the migration. Always test in development before trying in production.

:::

---

## Conclusion

Reverting migrations in Django isn't scary once you get the hang of it. It's like using undo in a Word document - you just need to know how far back to go.

So now that you know how to revert a migration in Django, what’s the trickiest migration issue you've run into—and how did you fix it?

Shoot me a [message (<VPIcon icon="fa-brands fa-x-twitter"/>`_udemezue`)](http://x.com/_udemezue/) - I’d love to hear your story.

::: info Further Resources

<SiteInfo
  name="Migrations | Django documentation"
  desc="The web framework for perfectionists with deadlines."
  url="https://docs.djangoproject.com/en/5.2/topics/migrations//"
  logo="https://static.djangoproject.com/img/favicon.6dbf28c0650e.ico"
  preview="https://static.djangoproject.com/img/logos/django-logo-negative.1d528e2cb5fb.png"/>


```component VPCard
{
  "title": "Django Migrations: A Primer",
  "desc": "In this tutorial, you’ll get comfortable with Django migrations and learn how to create database tables without writing any SQL, how to automatically modify your database after you changed your models, and how to revert changes made to your database.",
  "link": "/realpython.com/django-migrations-a-primer.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Revert a Migration in Django",
  "desc": "So, you're working with Django, you've run a migration, and now something’s broken. Maybe you added a field that shouldn't be there. Maybe you renamed a model, and suddenly your database is a mess. Or maybe you're just experimenting and want to roll ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-revert-a-migration-in-django.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
