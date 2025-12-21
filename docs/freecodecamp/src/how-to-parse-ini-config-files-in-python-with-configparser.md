---
lang: en-US
title: "How to Parse INI Config Files in Python with Configparser"
description: "Article(s) > How to Parse INI Config Files in Python with Configparser"
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
      content: "Article(s) > How to Parse INI Config Files in Python with Configparser"
    - property: og:description
      content: "How to Parse INI Config Files in Python with Configparser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-parse-ini-config-files-in-python-with-configparser.html
prev: /programming/py/articles/README.md
date: 2025-10-18
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760712555277/4eabf2d7-fa9d-445b-8e0a-6ebdee53790c.png
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
  name="How to Parse INI Config Files in Python with Configparser"
  desc="Configuration files provide a structured way to manage application settings that's more organized than environment variables alone. INI files, short for initialization files, with their simple section-based format, are both easy to read and parse. Py..."
  url="https://freecodecamp.org/news/how-to-parse-ini-config-files-in-python-with-configparser"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1760712555277/4eabf2d7-fa9d-445b-8e0a-6ebdee53790c.png"/>

Configuration files provide a structured way to manage application settings that's more organized than environment variables alone.

INI files, short for initialization files, with their simple section-based format, are both easy to read and parse. Python's built-in [<VPIcon icon="fa-brands fa-python"/>configparser module](https://docs.python.org/3/library/configparser.html) makes working with these files straightforward and powerful.

This tutorial will teach you how to read and parse such <VPIcon icon="fas fa-file-lines"/>`.ini` config files using the `configparser` module.

::: info 🔗 Here’s the code on GitHub

<SiteInfo
  name="python-basics/config-management-basics/parsing-ini-files at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/config-management-basics/parsing-ini-files/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b2445dfa87b961837d8bd814514478d88e7fcca55182bc467b47e94aaa02b65a/balapriyac/python-basics"/>

:::

::: note Prerequisites

To follow along with this tutorial, you should have:

- Python 3.7 or later installed on your system
- Basic understanding of Python syntax and data structures (dictionaries, strings)
- Familiarity with file operations in Python
- A text editor or IDE for writing Python code
- Basic knowledge of configuration files and why they're used in applications

No external packages are required, as we'll be using Python's built-in `configparser` module.

:::

---

## Understanding the INI File Format

INI files organize configuration into sections, where each section contains key-value pairs. This structure is useful for applications with multiple components or environments. Let's look at what an INI file looks like before we parse it.

Create a file named <VPIcon icon="iconfont icon-toml"/>`app.ini`:

```toml title="app.ini"
[database]
host = localhost
port = 5432
username = app_user
password = secure_password
pool_size = 10
ssl_enabled = true

[server]
host = 0.0.0.0
port = 8000
debug = false

[logging]
level = INFO
file = app.log
```

This file contains three sections: database, server, and logging. Each section groups related settings together, making the configuration easy to understand and maintain.

---

## Basic ConfigParser Usage

The `configparser` module provides the `ConfigParser` class, which handles all the parsing work. Here's how to read and access configuration values:

```py
import configparser

config = configparser.ConfigParser()
config.read('app.ini')

# Access values from sections
db_host = config['database']['host']
db_port = config['database']['port']

print(f"Database: {db_host}:{db_port}")
print(f"Sections: {config.sections()}")
```

This code shows the basic workflow:

- create a `ConfigParser` object,
- read your INI file,
- then access values using dictionary-like syntax.

The first bracket contains the section name, and the second contains the key.

Create the <VPIcon icon="iconfont icon-toml"/>`app.ini` file and run the above code. You should see the following output:

```toml title="app.ini"
Database: localhost:5432
Sections: ['database', 'server', 'logging']
```

---

## Type Conversion and Default Values

Configuration values in INI files are stored as strings, but you often need them as integers, booleans, or floats. `ConfigParser` provides convenient methods for type conversion as shown here:

```py
import configparser

config = configparser.ConfigParser()
config.read('app.ini')

# Automatic type conversion
db_port = config.getint('database', 'port')
ssl_enabled = config.getboolean('database', 'ssl_enabled')

# With fallback defaults
max_retries = config.getint('database', 'max_retries', fallback=3)
timeout = config.getfloat('database', 'timeout', fallback=30.0)

print(f"Port: {db_port}, SSL: {ssl_enabled}")
```

In this code, the `getint()`, `getboolean()`, and `getfloat()` methods convert string values to the appropriate type. The `fallback` parameter provides a default value when the key doesn't exist, preventing errors.

When you run the above code, you’ll get:

```plaintext title="output"
Port: 5432, SSL: True
```

---

## How to Create a Simple Config Manager

A practical approach is to wrap `ConfigParser` in a class that validates configuration and provides easy access to settings:

```py
import configparser
from pathlib import Path

class ConfigManager:
    def __init__(self, config_file='app.ini'):
        self.config = configparser.ConfigParser()

        if not Path(config_file).exists():
            raise FileNotFoundError(f"Config file not found: {config_file}")

        self.config.read(config_file)

    def get_database_config(self):
        db = self.config['database']
        return {
            'host': db.get('host'),
            'port': db.getint('port'),
            'username': db.get('username'),
            'password': db.get('password'),
            'pool_size': db.getint('pool_size', fallback=5)
        }
```

This manager class validates that the file exists and provides clean methods to access configuration. It returns dictionaries with properly typed values.

And you can use it like so:

```py
config = ConfigManager('app.ini')
db_config = config.get_database_config()
print(db_config)
```

This outputs:

```plaintext title="output"
{'host': 'localhost', 'port': 5432, 'username': 'app_user', 'password': 'secure_password', 'pool_size': 10}
```

---

## How to Work with Multiple Sections in INI Files

You can organize different parts of your application into separate sections and access them independently:

```py
import configparser

config = configparser.ConfigParser()
config.read('app.ini')

# Get all options in a section as a dictionary
db_settings = dict(config['database'])
server_settings = dict(config['server'])

# Check if a section exists
if config.has_section('cache'):
    cache_enabled = config.getboolean('cache', 'enabled')
else:
    cache_enabled = False

print(f"Database settings: {db_settings}")
print(f"Caching enabled: {cache_enabled}")
```

The `dict()` conversion gives you all key-value pairs from a section at once. The `has_section()` method lets you conditionally handle optional configuration sections.

Running the above code should give you the following output:

```plaintext title="output"
Database settings: {'host': 'localhost', 'port': '5432', 'username': 'app_user', 'password': 'secure_password', 'pool_size': '10', 'ssl_enabled': 'true'}
Caching enabled: False
```

---

## How to Write Configuration Files

`ConfigParser` can also create and modify INI files, which is useful for saving user preferences or generating config templates:

```py
import configparser

config = configparser.ConfigParser()

# Add sections and values
config['database'] = {
    'host': 'localhost',
    'port': '5432',
    'username': 'myapp'
}

config['server'] = {
    'host': '0.0.0.0',
    'port': '8000',
    'debug': 'false'
}

# Write to file
with open('generated.ini', 'w') as configfile:
    config.write(configfile)

print("Configuration file created!")
```

This code creates a new INI file from scratch. The write() method saves the configuration in the proper INI format with sections and key-value pairs.

---

## Conclusion

When environment variables aren't enough and you need grouped settings for different components, INI files are your answer.

The format is human-readable, `ConfigParser` handles type conversion automatically, and it's built into Python's standard library. Wrap it in a configuration class for validation and clean access patterns.

Also remember:

- Organize by component. Use sections to group related settings.
- Use type conversion methods. Always use `getint()`, `getboolean()`, and `getfloat()` rather than manual conversion. They handle edge cases better.
- Provide sensible defaults. Use the `fallback` parameter for optional settings so your application works with minimal configuration.
- Validate early. Check that required sections and keys exist at startup before attempting to use them.
- Keep secrets separate. Don't commit INI files with passwords to version control. Use <VPIcon icon="iconfont icon-toml"/>`.ini.example` files with dummy values as templates.

In the next article, you’ll learn how to work with TOML files in Python. Until then, keep coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Parse INI Config Files in Python with Configparser",
  "desc": "Configuration files provide a structured way to manage application settings that's more organized than environment variables alone. INI files, short for initialization files, with their simple section-based format, are both easy to read and parse. Py...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-parse-ini-config-files-in-python-with-configparser.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
