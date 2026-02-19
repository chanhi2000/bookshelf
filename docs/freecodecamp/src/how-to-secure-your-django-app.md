---
lang: en-US
title: "How to Secure Your Django App – Best Practices and Code Examples"
description: "Article(s) > How to Secure Your Django App – Best Practices and Code Examples"
icon: iconfont icon-django
category: 
  - Python
  - Django
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - python
  - py
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Secure Your Django App – Best Practices and Code Examples"
    - property: og:description
      content: "How to Secure Your Django App – Best Practices and Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-your-django-app.html
prev: /programming/py-django/articles/README.md
date: 2024-05-23
isOriginal: false
author:
  - name: Sophia Iroegbu
    url: https://freecodecamp.org/news/author/Sophyia/
cover: https://freecodecamp.org/news/content/images/2024/05/Blog-Banner---Template--2-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Secure Your Django App – Best Practices and Code Examples"
  desc="As a software developer or engineer, it's not enough to know how to build useful solutions – you must also ensure that they are secure. Prioritizing your users is crucial when developing and deploying your software because if users can't use your app..."
  url="https://freecodecamp.org/news/how-to-secure-your-django-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/Blog-Banner---Template--2-.png"/>

As a software developer or engineer, it's not enough to know how to build useful solutions – you must also ensure that they are secure. Prioritizing your users is crucial when developing and deploying your software because if users can't use your app, it becomes useless.

In this guide, we will discuss some best security measures for a secure Django project before your next deployment.

Let's learn!

---

## Security Measures for Authentication and Authorization

When building a Django application, user management requires prioritizing authentication and authorization as key security measures.

Here are some security practices when working on authentication and authorization features:

1. When dealing with authenticating users, it is best to implement a secure user authentication like password-based, token-based, or multi-factor authentication. This ensures you verify your users more than once and when they want to use your application.
2. If you use a password-based authentication, ensure you are using a strong hashing algorithm like the Django's [<VPIcon icon="iconfont icon-django"/>`make_password`](https://docs.djangoproject.com/en/5.0/ref/contrib/auth/) function to avoid storing the password as plain text.
3. When hashing user passwords, ensure you implement salt generation. Generate a unique random data (salt) to strengthen the hashing process of the password and prevent pre-computed attacks.
4. Consider using token-based authentication and set an expiration timer to add another layer of security. This lets the user's access token expire after a certain time and they will need to verify their identify again to continue using your application. Note that when implementing this, ensure that you don't set the timer to expire every 5 minutes, 30 minutes or one hour so it doesn't negatively affect user experience.
5. When dealing with users, always implement a Role-Based Access Control (RBAC) to assign roles to each user. That is, users can only access user features and admins can access user and other extended features.
6. After hashing the password and having an access control, implement appropriate access control and encryption measures so that only authorized users can access their passwords.

---

## Security Measures Against SQL Injection Attacks

SQL injection attacks are one of the most web vulnerabilities, and Django projects can be exploited through such attacks, especially when the data moving from client-side to server-side is vulnerable.

An excellent way for you to nip these attacks in the bud in your Django projects is to use parameterized queries. [<VPIcon icon="fas fa-globe"/>Parameterized queries](https://sophyia.me/secure-your-django-app-with-parameterized-queries) are an easy way in separating the SQL code from the user input, ensuring that user data is not part of the SQL command using Django ORMs.

Here is how it works. You can directly query the data in your database like this:

```py
from .models import User  

def user_search(request):
    username = request.GET.get('username')

    # Vulnerable query construction
    query = "SELECT * FROM users WHERE username = '" + username + "'"

    # Return a response
    return HttpResponse("User search query: " + query)
```

You can use the Django QuerySet `filter()` method to filter the data and sanitize it, like this:

```py
from .models import User

def user_search(request):
    username = request.GET.get('username')

    # Safe query using parameterized query
    users = User.objects.filter(username=username)

    # Return a response
    return HttpResponse("User search executed securely.")
```

---

## Security Measures Against Cross-Site Scripting (XSS)

Cross-site scripting or XSS attack happen by injecting malicious scripts in a web page or application accessed by other users. These attacks could be exploited in your Django projects if you forget to validate user data, prevent browsers from interpreting your web content or omit a content security policy.

Here are some security practices when avoiding XSS attacks:

### Validate User Data

When dealing with user-generated data, ensure you always validate the data. You can use built-in validation tools like the [<VPIcon icon="iconfont icon-django"/>`django.core.validators`](https://docs.djangoproject.com/en/1.8/_modules/django/core/validators/) function.

Here is an example of validating an email address gotten from the client-side:

```py
from django.core.validators import validate_email

email = request.GET.get('email')

if not validate_email(email):
    raise ValueError("Invalid email address.")
```

Here is another example of validating a URL gotten from the user:

```py
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

def validate_url(url):
    validator = URLValidator()
    try:
        validator(url)
    except ValidationError as e:
        return e.message
    return None
```

### Always Encode User Data When Displaying It

If your project takes user data and display it, ensure that you properly encode the data using [<VPIcon icon="fas fa-globe"/>Django auto-escaping template](https://w3schools.com/django/ref_tags_autoescape.php), `{% autoescape %}`. The `autoescape` tag is used to check if the `autoescape` is on or off. If it is on, it ensures the HTML code in your variables are escaped.

Here is an example:

```py
{% autoescape on %}
    {{ user_input }}
{% endautoescape %}
```

### Use the Correct HTTP Headers

In your Django project, always set appropriate HTTP headers to prevent browsers from interpreting the content as executable scripts. This may be minor, but it will prevent browsers from guessing the type of your response.

Here are two HTTP headers you can implement:

1. `X-Content-Type-Options`: This configuration ensures browsers don't sniff or guess the Multipurpose Internet Mail Extensions (MIME) type of a response. MIME is used to specify format of internet messages.
2. `Content-Type: text/html: charset=UTF-8`: This configuration ensures your web content is treated as a HTML and properly encoded as one.

You can define these headers in your template files to avoid XSS attacks.

### Always Use Content Security Policy

Content Security Policy (CSP) is a security measure used in web browsers to prevent malicious attacks, XSS attacks and data injections. This policy lets web developers define trusted sources like images, scripts, CSS styles, and so on, on their projects.

Content Security Policies are usually delivered through HTTP headers or HTML meta tags to enhance security of your web applications.

In your Django project, you can implement CSP like this:

```py
from django.http import HttpResponse

response = HttpResponse("Your content here")
response['Content-Security-Policy'] = "default-src 'self'; script-src 'self' https://trusted-cdn.com;"
```

---

## Security Measures Against Cross-Site Request Forgery (CSRF)

Cross-Site Request Forgery (CSRF) is a vulnerability that attacks by tricking users into carrying out actions against their knowledge or consent. These attacks use a request to trick the user into submitting a link or form on a different website or web application and since the request comes from the user's authenticated session, it pulls through, and the attacker has access to either perform a data manipulation or do any unauthorized action.

To prevent such attacks in your Django project, you can implement these practices:

### Use Middleware-Based Rate-Limiting

Rate-limiting is used for controlling the frequency of requests made by a server, API or user. This works by having a limit on the number of requests that can be made within a certain period of time.

In your Django project, it is good practice to create or implement a custom middleware to track and limit user's request based on a user's IP address. If you can't create a custom middleware, you can use [<VPIcon icon="fas fa-globe"/>django-rate limiting](https://django-ratelimit.readthedocs.io/en/stable/) package.

### Enable CSRF Middleware

Cross-Site Request Forgery (CSRF) middleware in Django is a built-in security tool that protects against CSRF attacks by validating CRSF token when making requests, such as when a user wants to log in.

It is a good idea to enable Django's CRSF middleware in your **settings.py**.

```py
MIDDLEWARE = [
 ...
 'django.middleware.csrf.CsrfViewMiddleware'
 ...
]
```

### Always Use CRSF Tokens

Cross-Site Request Forgery (CSRF) tokens are random data generated by your server and included as hidden fields in your HTML forms or added to AJAX requests.

CRSF tokens work with CRSF middleware, you can't use one without the other. When using CRSF tokens, Django automatically handles the tokens for you when you use the `{% crsf token %}` template tag.

```html
&lt;form method="post">
    {% csrf_token %}
    ...
&lt;/form>
```

---

## Built-in Django Security Checklist

Not many developers know this, but Django has a built-in security checklist to ensure you deploy a tightly secured project.

It is a command that scans your <VPIcon icon="fa-brands fa-python"/>`settings.py` and checks if you pass Django security guidelines or if you have any vulnerabilities hackers could exploit. The command is `python manage.py check --deploy`

When you run the command, you should see all the warnings and may see some project errors (if you have any), something like this:

![preencoded.png](https://lh7-us.googleusercontent.com/TJJQfxXbJaC4e9Jnwdu16ESNJa4rr6Ju84ltFfc9cIY_CtCUzNtY7ovh1k-fv9HamrY-dPVUn1izNw5_0siyuCSlP3dQNIN4YU57L1TNTj2e5ZLc2LIKx-WQV2yTCPNZcC8CWwcbYmW5MD5-z0oe-zRPmNo0x_hy=s2048) *Screenshot showing results of the command*

::: tip Other Security Practices

In addition to security practices targeted at specific web vulnerabilities, implementing minor practices can also enhance the overall security strength of your application.

1. Implement a way to continuously monitor your deployed Django application to detect and respond to security incidents or vulnerabilities in real-time.
2. Update your Django framework, dependencies and third-party libraries every 2-4 months so your project is up to date and uses the latest security patches and is bug-free.
3. You can also implement logging to monitor and record security-related changes or activities happening in your projects. It can also take note of possible security incidents.

:::

---

## Conclusion

In conclusion, securing a Django application needs so much attention and a multi-layered strategy. This includes implementing secure authentication, validating user input, ensuring encrypted end-to-end communication (whether client-to-server or user-to-user), and applying rate-limiting measures.

These practices contribute to a more robust and secure project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Secure Your Django App – Best Practices and Code Examples",
  "desc": "As a software developer or engineer, it's not enough to know how to build useful solutions – you must also ensure that they are secure. Prioritizing your users is crucial when developing and deploying your software because if users can't use your app...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-secure-your-django-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
