---
lang: en-US
title: "How to Work with Environment Variables in Python"
description: "Article(s) > How to Work with Environment Variables in Python"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work with Environment Variables in Python"
    - property: og:description
      content: "How to Work with Environment Variables in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-environment-variables-in-python.html
prev: /programming/py/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759939671494/fa0f31c9-99e4-43d6-94df-894e0da263f5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with Environment Variables in Python"
  desc="Environment variables let you configure applications without hardcoding sensitive information directly into your source code. They're particularly useful for storing API keys, database credentials, and configuration settings that change between devel..."
  url="https://freecodecamp.org/news/how-to-work-with-environment-variables-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759939671494/fa0f31c9-99e4-43d6-94df-894e0da263f5.png"/>

Environment variables let you configure applications without hardcoding sensitive information directly into your source code.

They're particularly useful for storing API keys, database credentials, and configuration settings that change between development, staging, and production environments.

In this tutorial, you'll learn how to work with environment variables in Python.

::: info 🔗 Here’s the code on GitHub

<SiteInfo
  name="python-basics/config-management-basics/env-vars at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/config-management-basics/env-vars/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/adad56e45b223cade8b484f4037d47ea303c27b1679badd4175247a206cb6871/balapriyac/python-basics"/>

:::

---

## Why Use Environment Variables?

Before diving into the code, let's understand why environment variables matter.

When you hardcode a database password or API key into your Python script, you risk exposing sensitive information if your code is shared or committed to version control.

Environment variables solve this by storing configuration outside your codebase, making your application more secure and portable across different environments.

::: note Prerequisites

Before you begin this tutorial, you should have:

- Python installed on your system, preferably a recent version Python 3.11 or later
- Basic familiarity with Python syntax and working with dictionaries
- A text editor or IDE for writing Python code

:::

---

## How to Read Environment Variables with `os.environ`

Python's built-in `os` module provides the primary interface for working with environment variables. The `os.environ` object acts like a dictionary containing all environment variables available to your Python process.

This code shows two approaches to reading environment variables:

```py
import os

# Get an environment variable (raises KeyError if not found)
api_key = os.environ['API_KEY']

# Safer approach: get with a default value
database_host = os.environ.get('DATABASE_HOST', 'localhost')
database_port = os.environ.get('DATABASE_PORT', '5432')

print(f"Connecting to {database_host}:{database_port}")
```

In the first approach, `os.environ['API_KEY']` will raise a `KeyError` if the variable doesn't exist, which can crash your program.

```plaintext title="output"
---------------------------------------------------------------------------
KeyError                                  Traceback (most recent call last)
/tmp/ipython-input-2466845533.py in <cell line: 0>()
      2 
      3 # Get an environment variable (raises KeyError if not found)
----> 4 api_key = os.environ['API_KEY']
      5 
      6 # Safer approach: get with a default value

/usr/lib/python3.12/os.py in __getitem__(self, key)

KeyError: 'API_KEY'
```

The safer approach uses `os.environ.get()`, which returns `None` or a specified default value when the variable is missing. This gives you control over how missing configuration is handled.

### Understanding Type Conversion

One important thing to remember is that environment variables are always stored as strings. When you retrieve a value like `'5432'` for a port number, it's a string, not an integer. This means you'll need to convert environment variables to the appropriate type for your application.

For example, if you need to use the database port in a numeric operation, you'll need to convert it:

```py
database_port = int(os.environ.get('DATABASE_PORT', '5432'))
max_connections = int(os.environ.get('MAX_CONNECTIONS', '10'))

total_capacity = database_port + max_connections  # Now this works with integers
```

For Boolean values, you'll need to check against string representations:

```py
debug_mode = os.environ.get('DEBUG', 'False').lower() in ('true', '1', 'yes')
```

Without proper type conversion, you might run into unexpected behavior or errors when your code expects a number but receives a string.

---

## How to Set Environment Variables

You can set environment variables programmatically within your Python script.

::: note ⚠️

Just keep in mind that these changes only affect the current process and its child processes.

:::

This code shows how to create, access, and remove environment variables during runtime:

```py
import os

# Set an environment variable
os.environ['APP_ENV'] = 'development'
os.environ['MAX_CONNECTIONS'] = '100'

# Verify it was set
print(f"Environment: {os.environ['APP_ENV']}")

# Delete an environment variable
if 'TEMP_VAR' in os.environ:
    del os.environ['TEMP_VAR']
```

The key is to remember that these changes are temporary and only exist for the lifetime of your Python process. When your script ends, these modifications disappear.

---

## How to Build a Configuration Class to Manage Environment Variables

In practice, you can manage environment variables by creating a configuration class that centralizes all environment variable access and provides validation. This approach makes your config info easier to update and maintain.

Here’s a sample configuration class that encapsulates all environment variable handling in one place:

```py :collapsed-lines
import os

class AppConfig:
    """Application configuration loaded from environment variables"""

    def __init__(self):
        # Required settings (will fail fast if missing)
        self.api_key = self._get_required('API_KEY')
        self.database_url = self._get_required('DATABASE_URL')

        # Optional settings with defaults
        self.debug = self._get_bool('DEBUG', False)
        self.port = self._get_int('PORT', 8000)
        self.log_level = os.environ.get('LOG_LEVEL', 'INFO')
        self.max_workers = self._get_int('MAX_WORKERS', 4)

    def _get_required(self, key):
        """Get a required environment variable or raise an error"""
        value = os.environ.get(key)
        if value is None:
            raise ValueError(f"Required environment variable '{key}' is not set")
        return value

    def _get_bool(self, key, default):
        """Convert environment variable to boolean"""
        value = os.environ.get(key)
        if value is None:
            return default
        return value.lower() in ('true', '1', 'yes', 'on')

    def _get_int(self, key, default):
        """Convert environment variable to integer"""
        value = os.environ.get(key)
        if value is None:
            return default
        try:
            return int(value)
        except ValueError:
            raise ValueError(f"Environment variable '{key}' must be an integer, got '{value}'")

    def __repr__(self):
        """Safe string representation (masks sensitive data)"""
        return (f"AppConfig(debug={self.debug}, port={self.port}, "
                f"log_level={self.log_level}, api_key={'*' * 8})")
```

The helper methods `_getrequired()`, `_getbool()`, and `_getint()` handle type conversion and validation, making your code more robust. The `__repr__()` method provides a safe way to print configuration without exposing sensitive values like API keys.

Be sure to set the required environment variables:

```py
# Set the API_KEY environment variable
os.environ['API_KEY'] = 'your_api_key_here' # Replace with your actual API key
os.environ['DATABASE_URL'] = 'your_database_url_here' # Replace with your actual database URL
```

You can now instantiate an `AppConfig` object and use it like so:

```py
config = AppConfig()
print(config)
print(f"Running on port {config.port}")
```

This should give you a sample output like so:

```plaintext title="output"
AppConfig(debug=False, port=8000, log_level=INFO, api_key=********)
Running on port 8000
```

---

## Conclusion

I hope you found this article helpful! Environment variables give you a simple, secure way to configure Python applications that work consistently across different environments while keeping sensitive information out of your source code.

When working with environment variables, keep the following in mind:

- Never commit secrets to version control. Always add `.env` to your `.gitignore` file. Provide a `.env.example` file with dummy values to show other developers what variables are needed.
- Fail fast on missing required configuration. If your application can't run without certain environment variables, check for them at startup and raise clear errors rather than failing later.
- Use type conversion as needed. Environment variables are always strings, so convert them to the appropriate type and handle conversion errors gracefully.
- Provide sensible defaults. For non-sensitive configuration like port numbers or feature flags, defaults make your application easier to run during development.

In addition to the above, also try to document your environment variables. Maintain a list of all environment variables your application uses, what they control, and which ones are required.

In my next article, you’ll learn how to parse config files in Python. Until then, happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Environment Variables in Python",
  "desc": "Environment variables let you configure applications without hardcoding sensitive information directly into your source code. They're particularly useful for storing API keys, database credentials, and configuration settings that change between devel...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-environment-variables-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
