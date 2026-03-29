---
lang: en-US
title: "How to Use the Builder Pattern in Python – A Practical Guide for Developers"
description: "Article(s) > How to Use the Builder Pattern in Python – A Practical Guide for Developers"
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
      content: "Article(s) > How to Use the Builder Pattern in Python – A Practical Guide for Developers"
    - property: og:description
      content: "How to Use the Builder Pattern in Python – A Practical Guide for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-builder-pattern-in-python-a-practical-guide-for-devs.html
prev: /programming/py/articles/README.md
date: 2026-01-29
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769618329398/ad5581ff-5670-4d55-b269-6f0afcb7c57c.png
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
  name="How to Use the Builder Pattern in Python – A Practical Guide for Developers"
  desc="Creating complex objects can get messy. You've probably written constructors with too many parameters, struggled with optional arguments, or created objects that require multiple setup steps. The builder pattern solves these problems by separating ob..."
  url="https://freecodecamp.org/news/how-to-use-the-builder-pattern-in-python-a-practical-guide-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769618329398/ad5581ff-5670-4d55-b269-6f0afcb7c57c.png"/>

Creating complex objects can get messy. You've probably written constructors with too many parameters, struggled with optional arguments, or created objects that require multiple setup steps. The builder pattern solves these problems by separating object construction from representation.

In this tutorial, I'll show you how to implement the builder pattern in Python. I’ll also explain when it's useful, and show practical examples you can use in your projects.

::: info

You can find the code [on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/builder).

<SiteInfo
  name="python-basics/design-patterns/builder at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/design-patterns/builder/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/769bdfa28c924e5b1a846f7cec8b0467bf90521416612a8040d5eb8a21d84c80/balapriyac/python-basics"/>

:::

::: note Prerequisites

Before we start, make sure you have:

- Python 3.10 or higher installed
- Understanding of Python classes and methods
- Familiarity with [<VPIcon icon="fa-brands fa-youtube"/>object-oriented programming](https://youtu.be/Ej_02ICOIgs) (OOP) concepts

:::

Let’s get started!

---

## Understanding the Builder Pattern

The builder pattern addresses the problem of constructing complex objects. **Instead of cramming all construction logic into a constructor, you create a separate builder class that constructs the object incrementally**.

Consider building a SQL query. A simple query might be `SELECT * FROM users`, but most queries have `WHERE` clauses, `JOIN`s, `ORDER BY`, `GROUP BY`, and `LIMIT` clauses. You *could* pass all these as constructor parameters, but that becomes unwieldy fast. The builder pattern lets you construct the query piece by piece.

The pattern separates two concerns: **what the final object should be (the product) and how to build it (the builder)**. This separation gives you flexibility because you can now have multiple builders that create the same type of object in different ways, or one builder that creates different variations.

Python is simpler and more flexible to code in, which means we can implement builders more elegantly than in languages like Java or C++. We'll explore both traditional and Pythonic approaches.

---

## The Problem: Complex Object Construction

Let's start with a problem that shows why builders are useful. We'll create an HTTP request configuration – something complex enough to show the pattern's value without being overwhelming.

```py :collapsed-lines
# The naive approach - constructor with many parameters
class HTTPRequest:
    def __init__(self, url, method="GET", headers=None, body=None, 
                 timeout=30, auth=None, verify_ssl=True, allow_redirects=True,
                 max_redirects=5, cookies=None, proxies=None):
        self.url = url
        self.method = method
        self.headers = headers or {}
        self.body = body
        self.timeout = timeout
        self.auth = auth
        self.verify_ssl = verify_ssl
        self.allow_redirects = allow_redirects
        self.max_redirects = max_redirects
        self.cookies = cookies or {}
        self.proxies = proxies or {}

# Using it is messy
request = HTTPRequest(
    "https://api.example.com/users",
    method="POST",
    headers={"Content-Type": "application/json"},
    body='{"name": "John"}',
    timeout=60,
    auth=("username", "password"),
    verify_ssl=True,
    allow_redirects=False,
    max_redirects=0,
    cookies={"session": "abc123"},
    proxies={"http": "proxy.example.com"}
)

print(f"Request to: {request.url}")
print(f"Method: {request.method}")
print(f"Timeout: {request.timeout}s")
#
# Request to: https://api.example.com/users
# Method: POST
# Timeout: 60s
```

This constructor is hard to use. You need to remember parameter order, pass `None` for things you don't want, and it's unclear what the defaults are. When creating the request, you can't tell which parameters are required without checking the documentation. This is where the builder pattern comes in handy.

---

## Basic Builder Pattern Implementation

Let's rebuild this using the builder pattern. The builder provides methods for setting each property, making construction explicit and readable.

First, we define the product class, which is the object we want to build:

```py
class HTTPRequest:
    """The product - what we're building"""
    def __init__(self, url):
        self.url = url
        self.method = "GET"
        self.headers = {}
        self.body = None
        self.timeout = 30
        self.auth = None
        self.verify_ssl = True
        self.allow_redirects = True
        self.max_redirects = 5
        self.cookies = {}
        self.proxies = {}

    def execute(self):
        """Simulate executing the request"""
        auth_str = f" (auth: {self.auth[0]})" if self.auth else ""
        return f"{self.method} {self.url}{auth_str} - timeout: {self.timeout}s"
```

Now we create the builder class. Each method modifies the request and returns self to enable method chaining:

```py :collapsed-lines
class HTTPRequestBuilder:
    """The builder - constructs HTTPRequest step by step"""
    def __init__(self, url):
        self._request = HTTPRequest(url)

    def method(self, method):
        """Set HTTP method (GET, POST, etc.)"""
        self._request.method = method.upper()
        return self  # Return self for method chaining

    def header(self, key, value):
        """Add a header"""
        self._request.headers[key] = value
        return self

    def headers(self, headers_dict):
        """Add multiple headers at once"""
        self._request.headers.update(headers_dict)
        return self

    def body(self, body):
        """Set request body"""
        self._request.body = body
        return self

    def timeout(self, seconds):
        """Set timeout in seconds"""
        self._request.timeout = seconds
        return self

    def auth(self, username, password):
        """Set basic authentication"""
        self._request.auth = (username, password)
        return self

    def disable_ssl_verification(self):
        """Disable SSL certificate verification"""
        self._request.verify_ssl = False
        return self

    def disable_redirects(self):
        """Disable automatic redirects"""
        self._request.allow_redirects = False
        self._request.max_redirects = 0
        return self

    def build(self):
        """Return the constructed request"""
        return self._request
```

Now let's use the builder to create a request:

```py
# Now using the builder is much cleaner and more readable
request = (HTTPRequestBuilder("https://api.example.com/users")
    .method("POST")
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    .body('{"name": "John", "email": "john@example.com"}')
    .timeout(60)
    .auth("username", "password")
    .disable_redirects()
    .build())

print(request.execute())
print(f"\nHeaders: {request.headers}")
print(f"SSL verification: {request.verify_ssl}")
print(f"Allow redirects: {request.allow_redirects}")
#
# Headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
# SSL verification: True
# Allow redirects: False
```

The builder makes construction much clearer. Each method describes what it does, and method chaining creates a fluent interface that reads almost like English. You only specify what you need – everything else gets sensible defaults. The construction process is explicit and self-documenting.

Notice that each builder method returns `self`. This enables method chaining where you can call multiple methods in sequence. The final `build()` method returns the constructed object. This separation between building and the final product is the core of the pattern.

---

## A More Helpful Example: SQL Query Builder

Let's build something more useful and helps us understand how the pattern works: a SQL query builder. This is a practical tool you might actually use in projects.

First, we define the SQL query product class:

```py :collapsed-lines
class SQLQuery:
    """The product - represents a SQL query"""
    def __init__(self):
        self.select_columns = []
        self.from_table = None
        self.joins = []
        self.where_conditions = []
        self.group_by_columns = []
        self.having_conditions = []
        self.order_by_columns = []
        self.limit_value = None
        self.offset_value = None

    def to_sql(self):
        """Convert the query object to SQL string"""
        if not self.from_table:
            raise ValueError("FROM clause is required")

        # Build SELECT clause
        columns = ", ".join(self.select_columns) if self.select_columns else "*"
        sql = f"SELECT {columns}"

        # Add FROM clause
        sql += f"\nFROM {self.from_table}"

        # Add JOINs
        for join in self.joins:
            sql += f"\n{join}"

        # Add WHERE clause
        if self.where_conditions:
            conditions = " AND ".join(self.where_conditions)
            sql += f"\nWHERE {conditions}"

        # Add GROUP BY
        if self.group_by_columns:
            columns = ", ".join(self.group_by_columns)
            sql += f"\nGROUP BY {columns}"

        # Add HAVING
        if self.having_conditions:
            conditions = " AND ".join(self.having_conditions)
            sql += f"\nHAVING {conditions}"

        # Add ORDER BY
        if self.order_by_columns:
            columns = ", ".join(self.order_by_columns)
            sql += f"\nORDER BY {columns}"

        # Add LIMIT and OFFSET
        if self.limit_value:
            sql += f"\nLIMIT {self.limit_value}"
        if self.offset_value:
            sql += f"\nOFFSET {self.offset_value}"

        return sql
```

Now we create the query builder with methods for each SQL clause:

```py :collapsed-lines
class QueryBuilder:
    """Builder for SQL queries"""
    def __init__(self):
        self._query = SQLQuery()

    def select(self, *columns):
        """Add columns to SELECT clause"""
        self._query.select_columns.extend(columns)
        return self

    def from_table(self, table):
        """Set the FROM table"""
        self._query.from_table = table
        return self

    def join(self, table, on_condition, join_type="INNER"):
        """Add a JOIN clause"""
        join_clause = f"{join_type} JOIN {table} ON {on_condition}"
        self._query.joins.append(join_clause)
        return self

    def left_join(self, table, on_condition):
        """Convenience method for LEFT JOIN"""
        return self.join(table, on_condition, "LEFT")

    def where(self, condition):
        """Add a WHERE condition"""
        self._query.where_conditions.append(condition)
        return self

    def group_by(self, *columns):
        """Add GROUP BY columns"""
        self._query.group_by_columns.extend(columns)
        return self

    def having(self, condition):
        """Add a HAVING condition"""
        self._query.having_conditions.append(condition)
        return self

    def order_by(self, *columns):
        """Add ORDER BY columns"""
        self._query.order_by_columns.extend(columns)
        return self

    def limit(self, value):
        """Set LIMIT"""
        self._query.limit_value = value
        return self

    def offset(self, value):
        """Set OFFSET"""
        self._query.offset_value = value
        return self

    def build(self):
        """Return the constructed query"""
        return self._query
```

Let's use the builder to create queries:

```py
# Example 1: Simple query
simple_query = (QueryBuilder()
    .select("id", "name", "email")
    .from_table("users")
    .where("status = 'active'")
    .order_by("name")
    .limit(10)
    .build())

print("Simple Query:")
print(simple_query.to_sql())
#
# Simple Query:
# SELECT id, name, email
# FROM users
# WHERE status = 'active'
# ORDER BY name
# LIMIT 10
```

Now let's create a more complex query with joins and aggregations:

```py
# Example 2: Complex query with joins and aggregations
complex_query = (QueryBuilder()
    .select("u.name", "COUNT(o.id) as order_count", "SUM(o.total) as total_spent")
    .from_table("users u")
    .left_join("orders o", "u.id = o.user_id")
    .where("u.created_at >= '2024-01-01'")
    .where("u.country = 'US'")
    .group_by("u.id", "u.name")
    .having("COUNT(o.id) > 5")
    .order_by("total_spent DESC")
    .limit(20)
    .build())

print("Complex Query:")
print(complex_query.to_sql())
#
# Complex Query:
# SELECT u.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent
# FROM users u
# LEFT JOIN orders o ON u.id = o.user_id
# WHERE u.created_at >= '2024-01-01' AND u.country = 'US'
# GROUP BY u.id, u.name
# HAVING COUNT(o.id) > 5
# ORDER BY total_spent DESC
# LIMIT 20
```

This SQL builder shows that the builder pattern is useful. Building SQL queries programmatically is complex. There are many optional clauses that must appear in a specific order. The builder handles all this complexity, giving you a clean API that prevents errors like putting `WHERE` after `GROUP BY`.

The builder ensures you can't create invalid queries (like forgetting the `FROM` clause) while keeping the API flexible. You can chain methods in any order during construction, and the `to_sql()` method handles ordering the clauses correctly. This separation of construction from representation is exactly what the builder pattern provides.

---

## Validation and Error Handling

Good builders validate data during construction. Let's improve our HTTP request builder with validation.

```py :collapsed-lines
class HTTPRequestBuilder:
    """Enhanced builder with validation"""
    VALID_METHODS = {"GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"}

    def __init__(self, url):
        if not url:
            raise ValueError("URL cannot be empty")
        if not url.startswith(("http:/", "https:/")):
            raise ValueError("URL must start with http:// or https:/")

        self._request = HTTPRequest(url)

    def method(self, method):
        """Set HTTP method with validation"""
        method = method.upper()
        if method not in self.VALID_METHODS:
            raise ValueError(f"Invalid HTTP method: {method}")
        self._request.method = method
        return self

    def timeout(self, seconds):
        """Set timeout with validation"""
        if seconds <= 0:
            raise ValueError("Timeout must be positive")
        if seconds > 300:
            raise ValueError("Timeout cannot exceed 300 seconds")
        self._request.timeout = seconds
        return self

    def header(self, key, value):
        """Add header with validation"""
        if not key or not value:
            raise ValueError("Header key and value cannot be empty")
        self._request.headers[key] = value
        return self

    def body(self, body):
        """Set request body"""
        self._request.body = body
        return self

    def build(self):
        """Validate and return the request"""
        # Final validation before building
        if self._request.method in {"POST", "PUT", "PATCH"} and not self._request.body:
            raise ValueError(f"{self._request.method} requests typically require a body")

        return self._request
```

Now let's test the validation:

```py
# Valid request
try:
    valid_request = (HTTPRequestBuilder("https://api.example.com/data")
        .method("POST")
        .body('{"key": "value"}')
        .timeout(45)
        .build())
    print("✓ Valid request created successfully")
except ValueError as e:
    print(f"✗ Error: {e}")

# Invalid request - bad method
try:
    invalid_request = (HTTPRequestBuilder("https://api.example.com/data")
        .method("INVALID")
        .build())
except ValueError as e:
    print(f"✓ Caught error: {e}")

# Invalid request - POST without body
try:
    invalid_request = (HTTPRequestBuilder("https://api.example.com/data")
        .method("POST")
        .build())
except ValueError as e:
    print(f"✓ Caught error: {e}")
#
# ✓ Valid request created successfully
# ✓ Caught error: Invalid HTTP method: INVALID
# ✓ Caught error: POST requests typically require a body
```

Validation in the builder catches errors early, during construction rather than at execution time. This is much better than discovering problems when you try to use the object. The builder becomes a gatekeeper that ensures only valid objects are created.

Each builder method validates its input immediately. The final `build()` method performs cross-field validation, which checks that require looking at multiple properties together. This layered validation approach catches errors at the most appropriate point.

---

## The Pythonic Builder Pattern

Python's flexibility allows for more concise builder implementations. Here's a Pythonic version using keyword arguments (`**kwargs`) and context managers.

First, let's define our email message class:

```py
class EmailMessage:
    """Email message with builder pattern using kwargs"""
    def __init__(self, **kwargs):
        self.to = kwargs.get('to', [])
        self.cc = kwargs.get('cc', [])
        self.bcc = kwargs.get('bcc', [])
        self.subject = kwargs.get('subject', '')
        self.body = kwargs.get('body', '')
        self.attachments = kwargs.get('attachments', [])
        self.priority = kwargs.get('priority', 'normal')

    def send(self):
        """Simulate sending the email"""
        recipients = len(self.to) + len(self.cc) + len(self.bcc)
        attachments = f" with {len(self.attachments)} attachment(s)" if self.attachments else ""
        return f"Sending '{self.subject}' to {recipients} recipient(s){attachments}"
```

Now we create a builder that accumulates parameters:

```py :collapsed-lines
class EmailBuilder:
    """Pythonic email builder"""
    def __init__(self):
        self._params = {}

    def to(self, *addresses):
        """Add TO recipients"""
        self._params.setdefault('to', []).extend(addresses)
        return self

    def cc(self, *addresses):
        """Add CC recipients"""
        self._params.setdefault('cc', []).extend(addresses)
        return self

    def subject(self, subject):
        """Set email subject"""
        self._params['subject'] = subject
        return self

    def body(self, body):
        """Set email body"""
        self._params['body'] = body
        return self

    def attach(self, *files):
        """Attach files"""
        self._params.setdefault('attachments', []).extend(files)
        return self

    def priority(self, level):
        """Set priority (low, normal, high)"""
        if level not in ('low', 'normal', 'high'):
            raise ValueError("Priority must be low, normal, or high")
        self._params['priority'] = level
        return self

    def build(self):
        """Build the email message"""
        if not self._params.get('to'):
            raise ValueError("At least one recipient is required")
        if not self._params.get('subject'):
            raise ValueError("Subject is required")

        return EmailMessage(**self._params)
```

Let's use it to build and send an email:

```py
# Build and send an email
email = (EmailBuilder()
    .to("alice@example.com", "bob@example.com")
    .cc("manager@example.com")
    .subject("Q4 Sales Report")
    .body("Please find the Q4 sales report attached.")
    .attach("q4_report.pdf", "sales_data.xlsx")
    .priority("high")
    .build())

print(email.send())
print(f"To: {email.to}")
print(f"CC: {email.cc}")
print(f"Priority: {email.priority}")
print(f"Attachments: {email.attachments}")
#
# Sending 'Q4 Sales Report' to 3 recipient(s) with 2 attachment(s)
# To: ['alice@example.com', 'bob@example.com']
# CC: ['manager@example.com']
# Priority: high
# Attachments: ['q4_report.pdf', 'sales_data.xlsx']
```

This Pythonic version uses `**kwargs` to pass parameters to the product, making the builder more flexible. The builder accumulates parameters in a dictionary and passes them all at once during `build()`. This approach is cleaner for Python.

The key here is that Python doesn't require the boilerplate code that other languages need. We can achieve the same benefits with less boilerplate while still maintaining the builder pattern's core advantages: readable construction, validation, and separation of concerns.

---

## When to Use the Builder Pattern

The builder pattern is useful in specific situations. Understanding when to use it helps you avoid overengineering.

Use builder pattern when:

- You're creating objects with many optional parameters. If your constructor has more than 3-4 parameters, especially if many are optional, consider a builder. The pattern makes construction explicit and self-documenting.
- Object construction requires multiple steps or specific ordering. If you need to set up an object through several method calls in a particular sequence, a builder can enforce and simplify this process.
- You need to create different variations of an object. Builders can create different representations of the same type, like different SQL query types or different HTTP request configurations.

However, don't use builders when:

- Your objects are simple. If a regular constructor with 2-3 parameters works fine, don't add builder complexity. Python's keyword arguments already make simple construction readable.
- You're only setting attributes. Python objects can have attributes set directly. If there's no validation or complex construction logic, a builder adds unnecessary complexity.

The pattern is useful for complex configuration objects, query builders, document generators, or any object that requires careful step-by-step construction. For simple data containers, stick with straightforward constructors.

---

## Conclusion

I hope you found this tutorial useful. The builder pattern separates object construction from representation, making complex objects easier to create and maintain. You've learned how to implement builders in Python, from traditional approaches to more Pythonic variants using the language's dynamic features.

Remember that the builder pattern is a tool, not a requirement. Use it when construction is genuinely complex and the pattern adds clarity. For simple objects, Python's flexibility provides simpler solutions. Choose the right tool for your specific problem, and you'll write clearer, more maintainable code.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Builder Pattern in Python – A Practical Guide for Developers",
  "desc": "Creating complex objects can get messy. You've probably written constructors with too many parameters, struggled with optional arguments, or created objects that require multiple setup steps. The builder pattern solves these problems by separating ob...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-builder-pattern-in-python-a-practical-guide-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
