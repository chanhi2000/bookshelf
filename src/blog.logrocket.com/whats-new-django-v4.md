---
lang: en-US
title: "What's new in Django v4.0"
description: "Article(s) > What's new in Django v4.0"
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
      content: "Article(s) > What's new in Django v4.0"
    - property: og:description
      content: "What's new in Django v4.0"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/whats-new-django-v4.html
prev: /programming/py-django/articles/README.md
date: 2021-12-30
isOriginal: false
author:
  - name: Popoola Temitope
    url : https://blog.logrocket.com/author/popoolatemitope/
cover: /assets/image/blog.logrocket.com/whats-new-django-v4/banner.png
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
  name="What's new in Django v4.0"
  desc="Django v4.0 contains various upgrades to the framework, like improved customization and template engine for forms, Formsets, and ErrorList."
  url="https://blog.logrocket.com/whats-new-django-v4"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/whats-new-django-v4/banner.png"/>

In December 2021, the [<VPIcon icon="iconfont icon-django"/>Django team released Django v4](https://docs.djangoproject.com/en/4.0/releases/4.0/), which contains various upgrades to the framework, like improved customization and the use of the template engine for forms, Formsets, and `ErrorList`.

![Whats New Django v4](/assets/image/blog.logrocket.com/whats-new-django-v4/banner.png)

However, it was announced that only Python versions 3.8, 3.9, and 3.10 will support Django v4.0. In addition, the Django v3.2.x series is the final one to support Python v3.6 and 3.7. In this article, we’ll go through some of the new features in Django v4.0, as well as some of the older third-party versions that have been removed from Django v4.0. Let’s get started!

---

## Upgrading to Django v4.0

Before upgrading to Django v4.0, be sure to resolve any deprecation warnings reported by your project when using your current Django version. By default, deprecation warnings are turned off. To enable deprecation warnings, use the test command below:

```sh
python -Wa manage.py test
```

### Installation

Once you fix any deprecation warnings, you can go ahead and install Django v4.0. If you [<VPIcon icon="iconfont icon-django"/>installed Django with pip](https://docs.djangoproject.com/en/4.0/topics/install/), you can use the `--upgrade` or `-U` flag:

```sh
python -m pip install -U Django
```

---

## Django v4.0 dropped support

With the introduction of Django v4.0, it was revealed that some lower third-party package versions will no longer be supported. Below, you’ll find a list and description of each.

### PostgreSQL v9.6

PostgreSQL v9.6 and earlier are not supported by Django v4.0. Django v4.0 will only support PostgreSQL ≥v10. ### Oracle v12.2 and 18c

Django v4.0 will only support Oracle ≥v19. The Django team has officially removed support for Oracle versions 18c and earlier. According to the announcement, as of April 2024, Django v3.2 will no longer support Oracle ≤v18c.

### Additional dropped packages and functions in Django v4.0

The following functions and third-party packages will not be supported by Django v4.0:

- PostGIS 2.3
- GDAL 2.0 and GEOS 3.5
- cx_ORACLE 7.0
- The `django.utils.text.unescape_entities()` function has been deprecated
- The `django.utils.http.is_safe url()` function has been deprecated

---

## What’s new in Django v4.0?

### `zoneinfo` default time zone

In Django v4.0, the [**default `pytz` time zone has been migrated to `zoneinfo`**](/blog.logrocket.com/python-datetime-module-handling-dates-time.md). Support for the `pytz` time zone is now deprecated and will not be supported in the coming release of Django v5.0 and later versions.

The migration to `zoneinfo` is fairly straightforward. You can select the current time zone and convert `datetime` instances in forms and templates to the current time zone. Operations on aware `datetime` instances in UTC are unaffected.

### Template-based form rendering

Forms, Formsets, and `ErrorList` are now rendered using the template engine to enhance customization.

The Django team made changes on how `render()`, `get_context()`, and `template_name` are used in Django v4.0. The `render()` options are now optional, with `None` being the default value for all of them.

When using the following code:

```py
render(template_name=None, context=None, renderer=None)
```

If the values for the parameters are not passed in, the parameters will default to the following values:

- `template_name`: `template_name()`
- `Context`: Contains a value that is returned by `get_context()`
- `renderer`: Value returned by `default_renderer`

For flexibility, `formset`rendering has been moved to the template engine in Django v4.0. When using a `formset` within a view, you’ll use the `management` form inside the template. Let’s take a look at an example of a `view`:

```py
from django.forms import formset_factory
from django.shortcuts import render
from myapp.forms import ArticleForm
def manage_articles(request):
    ArticleFormSet = formset_factory(ArticleForm)
    if request.method == 'POST':
        formset = ArticleFormSet(request.POST, request.FILES)
        if formset.is_valid():
            # do something with the formset.cleaned_data
            pass
    else:
        formset = ArticleFormSet()
    return render(request, 'manage_articles.html', {'formset': formset})
```

The `manage_articles.html` template will look like the following code:

```html title="manage_articles.html"
<form method="post">
  <table>
    {{ formset }}
  </table>
</form>
```

### Internationalization

Django v4.0 now enables Malay language translations, which were unavailable in previous versions of Django. Developers can now convert content from or into the Malay language in their projects.

### Localization

The default value of the `USE_L10N` parameter was changed from `False` to `True` in Django v4.0 to follow best practice.

With the release of Dango v4.0, `USE_L10N` has been deprecated. It was also noted that in Django v5.x, any date or number presented will be localized by default.

### `CSRF_TRUSTED_ORIGINS`

When setting the `CSRF_TRUSTED_ORIGINS` setting, Django v4.0 does not enable using only the `hostname` value; instead, the values must contain the scheme, e.g., `http://` or `https://`.

Additionally, values beginning with a dot must now be preceded by an asterisk. For example, you’d replace `.example.com` with `https://*.example.com`.

### scrypt password hasher

The [<VPIcon icon="iconfont icon-django"/>scrypt password hasher](https://docs.djangoproject.com/en/4.0/topics/auth/passwords/#scrypt-usage) has been added to Django v4.0 to provide additional security, and it is advised that you use [<VPIcon icon="iconfont icon-django"/>scrypt instead of PBKDF2](https://docs.djangoproject.com/en/4.0/topics/auth/passwords/) to limit the amount of parallelism an attacker can utilize.

scrypt is designed to use more memory than other password-based key derivation techniques.

### Functional unique constraints

`UniqueConstraint()` now has a new `*expressions` positional option that allows programmers to implement functional unique constraints with the same database restrictions as `Index.expressions`, as demonstrated by the code below:

```py title="my-model.py"
from django.db import models
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower

class MyModel(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    class Meta:
        constraints = [
            UniqueConstraint(
                Lower('first_name'),
                Lower('last_name').desc(),
                name='first_last_name_unique',
            ),
        ]
```

The `Meta.restrictions` option is used to apply functionally unique constraints to models.

---

## Conclusion

In this article, we went over some of the new features in Django v4.0, some of the third-party packages that Django v4.0 no longer supports, and the steps required to upgrade your existing version to Django v4.0. Django v4.0’s new features are not limited to those covered in this post. For a complete list of the new features, check out [<VPIcon icon="iconfont icon-django"/>Django’s official announcement](https://docs.djangoproject.com/en/4.0/releases/4.0/). I hope you enjoyed this tutorial!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What's new in Django v4.0",
  "desc": "Django v4.0 contains various upgrades to the framework, like improved customization and template engine for forms, Formsets, and ErrorList.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/whats-new-django-v4.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
