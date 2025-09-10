---
lang: en-US
title: "How to Create a JSON Web Token in the Django Rest Framework"
description: "Article(s) > How to Create a JSON Web Token in the Django Rest Framework"
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
      content: "Article(s) > How to Create a JSON Web Token in the Django Rest Framework"
    - property: og:description
      content: "How to Create a JSON Web Token in the Django Rest Framework"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-json-web-token-in-the-django-rest-framework.html
prev: /programming/py-django/articles/README.md
date: 2025-04-17
isOriginal: false
author:
  - name: Udemezue John
    url : https://freecodecamp.org/news/author/udemezue/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744827939254/f99ab71c-f3a6-4858-8682-592e2e41bd45.png
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
  name="How to Create a JSON Web Token in the Django Rest Framework"
  desc="When you're building an API, security should be at the top of your list. You want to make sure only the right people can access the right stuff - and that’s where authentication comes in. One of the most common and reliable ways to handle authenticat..."
  url="https://freecodecamp.org/news/how-to-create-a-json-web-token-in-the-django-rest-framework"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1744827939254/f99ab71c-f3a6-4858-8682-592e2e41bd45.png"/>

When you're building an API, security should be at the top of your list. You want to make sure only the right people can access the right stuff - and that’s where authentication comes in.

One of the most common and reliable ways to handle authentication in modern web apps is using JWT, short for JSON Web Tokens.

If you’re working with the Django Rest Framework (DRF), you might already know that it comes with a lot of helpful tools for building APIs.

But when it comes to token-based authentication, you’ll need to bring in a bit of extra help. JWT isn’t built into DRF by default, but it’s super easy to set up once you know the steps.

In this tutorial, I’ll walk you through exactly how to create and use JWTs in the Django Rest Framework step by step.

---

## What is a JWT?

A JWT (JSON Web Token) is a compact, self-contained way to send information securely between two parties. It’s often used for authentication.

When someone logs in, they get a token. That token gets stored in the frontend (like in localStorage), and every time the user makes a request, it’s sent along with it.

The server checks that token, and if everything’s okay, it gives access to the requested data. No need for cookies or sessions.

A JWT is made of three parts:

1. **Header** - contains the type of token and the signing algorithm.
2. **Payload** - contains the data (like user ID).
3. **Signature** - used to verify the token wasn’t changed.

---

## Why Use JWT in the Django Rest Framework?

Here’s why JWT is a solid choice for DRF apps:

- **Stateless**: No sessions are needed on the server.
- **Scalable**: Since it’s stateless, it works well with larger applications and microservices.
- **Widely used**: JWT is a common standard. Many frontend frameworks (like React, Vue, and so on) already know how to work with it.

---

## How to Set Up JWT in the Django Rest Framework

Let’s get into it. Here's how to set up JWT authentication in DRF.

### Step 1: Install Required Packages

You’ll need a library to handle JWTs. The most popular one is [<VPIcon icon="iconfont icon-github"/>`jazzband/djangorestframework-simplejwt`](https://github.com/jazzband/djangorestframework-simplejwt).

Run this in your terminal:

```sh
pip install djangorestframework-simplejwt
```

This installs everything you need to generate, refresh, and verify JSON web tokens in your DRF project.

### Step 2: Update Your Django Settings

Go to your <VPIcon icon="fa-brands fa-python"/>`settings.py` and update the `REST_FRAMEWORK` part like this:

```py title="settings.py"
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}
```

This tells DRF to look for a JWT in the request’s `Authorization` header and use it to authenticate the user. It replaces session-based authentication, which is typical for web apps, with token-based authentication, ideal for API's.

### Step 3: Add Token URLS to Your <VPIcon icon="fa-brands fa-python"/>`urls.py`

JWT works by issuing a pair of tokens: an `access` token (short-lived) and a `refresh` token (long-lived). These tokens are managed through two main views.

In your <VPIcon icon="fa-brands fa-python"/>`urls.py` (usually in the root project or `api` app):

```py title="urls.py"
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

In this code:

- `/api/token/`: Clients (like frontend apps or mobile apps) send user credentials to this endpoint to get access and refresh tokens.
- `/api/token/refresh/`: When the access token expires, the client sends the refresh token here to get a new access token.

### Step 4: Test It Out

Let’s say you have a user with a username and password.

You can make a POST request to `/api/token/`:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

If the credentials are correct, you’ll get back something like:

```json
{
  "refresh": "long_refresh_token",
  "access": "short_lived_access_token"
}
```

You’ll use the `access` token to make authenticated requests. When it expires, send the `refresh` token to `/api/token/refresh/` to get a new one.

---

## How to Use These Tokens

Include the access token in the `Authorization` header of your API requests like this:

```plaintext title="header"
Authorization: Bearer your_access_token_here
```

When the access token expires, send the refresh token to `/api/token/refresh/` like this:

```json
{
  "refresh": "your_refresh_token_here"
}
```

And you’ll get a new access token.

### Securing Your API Views

To make sure only authenticated users can access certain endpoints, add the `IsAuthenticated` permission class to your views.

Here’s an example:

```py
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class SecureView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})
```

This view will only return a response if the request includes a valid JWT. If there’s no token or it’s invalid/expired, the user gets a 401 Unauthorized error.

### Summary

Here’s what we just did:

- Installed and configured `simplejwt` for DRF.
- Set up token generation and refresh endpoints.
- Protected views with token-based authentication.
- Explained how to make and refresh token-based requests.

JWT is a powerful and scalable way to secure your Django APIS. It’s perfect for modern web and mobile applications.

Would you like a bonus step for customising token payloads (for example, adding user roles or email to the JWT)? Let me know!

---

## FAQs

::: details How long does the token last?

By default, the access token lasts 5 minutes, and the refresh token lasts 1 day. You can customize this in your settings:

```py
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
```

What this means:

- This sets how long your **JWT tokens** last:
  - `ACCESS_TOKEN_LIFETIME`: How long the access token is valid (for example, 15 minutes).
  - `REFRESH_TOKEN_LIFETIME`: How long the refresh token is valid (for example, 1 day).

Why it matters:

- The **access token** is what allows the user to interact with protected endpoints.
- The **refresh token** is used to get a new access token without logging in again

:::

::: details Where should I store the token on the frontend?

Ideally in `localStorage` or `sessionStorage`. Just be aware of XSS risks. Don’t store sensitive data in the token itself.

You can store the JWT access/refresh tokens on the frontend in:

- `localStorage`: Data persists even after the tab/browser is closed.
- `sessionStorage`: Data is lost when the tab/browser is closed.
- Don't store sensitive user data in the token or in storage.
- Tokens stored in `localStorage` can be vulnerable to XSS attacks.
- If possible, consider using httpOnly cookies for better security (though more complex to set up).

:::

::: details Can I add custom fields to the token?

Yes! You can override `TokenObtainPairSerializer` to include custom data in the payload, like so:

```py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
```

Then wire it up in your <VPIcon icon="fa-brands fa-python"/>`urls.py`.

- You're customizing the JWT payload to include additional user info (like `username`).
- This means when a user logs in, the JWT will now carry the `username` inside the payload.
- This is helpful if your frontend wants to display the user's name without making another API call.

::::

### Summary:

| **Section** | **Purpose** |
| --- | --- |
| `SIMPLE_JWT` settings | Controls token expiration |
| `localStorage/sessionStorage` | Where to store tokens on frontend |
| Custom Token Serializer | Add extra user info to the token (e.g., username) |
| <VPIcon icon="fa-brands fa-python"/>`urls.py` config | Connects your custom token view to the login endpoint |

---

## Best Practices

Let’s now look at some DRF best practices so you can effectively use this framework:

### 1. Use HTTPS Always*

HTTPS encrypts the data transmitted between the client (browser or app) and the server. If you use HTTP instead, anyone on the same network (like public Wi-Fi) could intercept sensitive data - including access tokens - through a method called man-in-the-middle (MITM) attacks.

::: tip Best practices:

- Use an SSL certificate to enable HTTPS for all endpoints.
- Redirect all HTTP requests to HTTPS.
- Use HSTS (HTTP Strict Transport Security) headers to enforce HTTPS on the client side.

:::

### 2. Don’t Store Sensitive Data in the Token

Tokens like **JWTs** are often stored client-side (in localStorage, sessionStorage, or cookies).

If they contain sensitive data (like passwords, personal info, or secret keys), they become a major security risk - especially if stolen or compromised.

::: tip What to do instead:

- Store only the minimal information needed (like user ID or role).
- Use opaque tokens (random strings) that don’t carry embedded data when possible.
- Store sensitive data securely on the server, not in the token.

:::

### 3. Keep Your Signing Key Secret

#### What’s a signing key?

In systems using JWTs, the signing key (or secret key) is used to sign the token - a cryptographic way to ensure the token hasn’t been tampered with.

If someone gets your signing key, they can forge valid-looking tokens and impersonate users.

::: tip Best practices:

- Store your key in secure environments (like environment variables, secret managers).
- Never commit the key to source control.
- Use strong, randomly generated secrets.
- Consider using asymmetric keys (public/private key pairs) for better scalability and security (for example, with RS256 algorithm).

:::

### 4. Rotate Tokens If Needed

#### What is token rotation?

Token rotation refers to the process of periodically generating new tokens and invalidating the old ones.

This is important because if a token is stolen or leaked, rotating it regularly limits the window in which the attacker can use it. It’s especially important for refresh tokens, which tend to live longer.

::: tip Best practices

- Use short-lived access tokens and longer-lived refresh tokens.
- Invalidate refresh tokens once they’re used (a practice called “refresh token rotation”).
- Track issued refresh tokens server-side to detect reuse or theft.

:::

### 5. Set a Short Lifetime for Access Tokens & Use Refresh Tokens Wisely

Access tokens grant permission to access protected resources. If stolen, they can be used by attackers until they expire.

::: tip Best practices

- Set access tokens to expire quickly (5-15 minutes is common).
- Use refresh tokens to allow the client to get new access tokens without re-logging in.
- Store refresh tokens securely (prefer HTTP-only cookies).
- Revoke refresh tokens on logout, suspicious activity, or device changes.

:::

---

## Final Thoughts

- **Access tokens** should be short-lived and limited in scope.
- **Refresh tokens** should be long-lived but rotated and revoked carefully.
- Always store secrets securely, serve over HTTPS, and avoid trusting the client with sensitive logic or data.

Would you like me to show how this all ties together in an example flow (like how a login, token issuance, and refresh works)?

JWTS make authentication easier and more scalable for APIS. Once you set it up in the Django Rest Framework, it just works - and you’ve got a secure way to let users in and keep unwanted traffic out.

It’s a must-know if you’re building APIS with Django.

::: info Further Reading and Resources

```component VPCard
{
  "title": "Home - Django REST framework",
  "desc": "Django, API, REST, Home",
  "link": "https://django-rest-framework.org/",
  "logo": "https://django-rest-framework.org/img/favicon.ico",
  "background": "rgba(163,0,0,0.2)"
}
```

```component VPCard
{
  "title": "Simple JWT — Simple JWT 5.2.2.post30+gfaf92e8 documentation",
  "desc": "A JSON Web Token authentication plugin for the Django REST Framework.",
  "link": "https://django-rest-framework-simplejwt.readthedocs.io/en/latest/",
  "logo": "https://django-rest-framework-simplejwt.readthedocs.io/favicon.ico",
  "background": "rgba(67,126,180,0.2)"
}
```

<SiteInfo
  name="JWT.IO"
  desc="JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties."
  url="http://jwt.io/"
  logo="http://jwt.io/img/favicon/favicon-16x16.png"
  preview="http://jwt.io/img/facebook-card.png"/>

```component VPCard
{
  "title": "JSON Web Token for Java - OWASP Cheat Sheet Series",
  "desc": "Website with the collection of all the cheat sheets of the project.",
  "link": "https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html/",
  "logo": "https://cheatsheetseries.owasp.org/assets/WebSite_Favicon.png",
  "background": "rgba(244,245,255,0.2)"
}
```


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a JSON Web Token in the Django Rest Framework",
  "desc": "When you're building an API, security should be at the top of your list. You want to make sure only the right people can access the right stuff - and that’s where authentication comes in. One of the most common and reliable ways to handle authenticat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-json-web-token-in-the-django-rest-framework.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
