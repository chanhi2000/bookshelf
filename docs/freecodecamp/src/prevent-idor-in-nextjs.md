---
lang: en-US
title: "How to Prevent IDOR Vulnerabilities in Next.js API Routes"
description: "Article(s) > How to Prevent IDOR Vulnerabilities in Next.js API Routes"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Prevent IDOR Vulnerabilities in Next.js API Routes"
    - property: og:description
      content: "How to Prevent IDOR Vulnerabilities in Next.js API Routes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/prevent-idor-in-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2026-02-28
isOriginal: false
author:
  - name: Ayodele Aransiola
    url: https://freecodecamp.org/news/author/leomofthings/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/b14a67ea-e78b-4ebd-996f-98da3a0a8027.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Prevent IDOR Vulnerabilities in Next.js API Routes"
  desc="Imagine this situation: A user logs in successfully to your application, but upon loading their dashboard, they see someone else’s data. Why does this happen? The authentication worked, the session is"
  url="https://freecodecamp.org/news/prevent-idor-in-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/b14a67ea-e78b-4ebd-996f-98da3a0a8027.png"/>

Imagine this situation: A user logs in successfully to your application, but upon loading their dashboard, they see someone else’s data.

Why does this happen? The authentication worked, the session is valid, the user is authenticated, but the authorization failed.

This specific issue is called **IDOR (Insecure Direct Object Reference)**. It’s one of the most common security bugs and is categorized under **Broken Object Level Authorization (BOLA)** in the OWASP API Security Top 10. In this tutorial, you’ll learn:

- Why IDOR happens
- Why authentication alone is not enough
- How object-level authorization works
- How to fix IDOR properly in Next.js API routes
- How to design safer APIs from the start

---

## Authentication vs. Authorization

Before writing further, let’s clarify something critical.

- **Authentication answers:** Who are you?
- **Authorization answers:** What are you allowed to access?

In IDOR scenarios, authentication works (the user is logged in), while authorization is missing or incomplete. That distinction is the core lesson of this article.

---

## What is an IDOR Vulnerability?

An IDOR vulnerability happens when your API fetches a resource by an identifier (like a user ID), and then you do not verify that the requester owns or is allowed to access that resource.

Example of such a request:

```plaintext
GET /api/users/123
```

The code above is an HTTP **GET** request to the `/api/users/123` route. The `GET` method is used to request data from the server. This indicates that the client is requesting a specific user with the ID `123` and this request returns the user data in a response (often in JSON format).

If your backend makes the request using a similar structure to the code snippet below without checking who is making the request, you have an IDOR vulnerability, even if the user is logged in.

```tsx
db.user.findUnique({ where: { id: "123" } })
```

What the code does is to query the database for a single user record. The `db.user` part refers to the `user` model/table and `findUnique()` is a method that returns only one record based on a unique field. Inside the method, the `where` clause specifies the filter condition and `{ id: "123" }` tells the database to find the user whose unique `id` equals `"123"`. If a matching record exists, it returns that user object; otherwise, it returns `null`.

---

## The Vulnerable Pattern in Next.js

Looking at this Next.js App Router API route:

```tsx title="app/api/users/[id]/route.ts"
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({
    where: { id: params.id },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json({ user });
}
```

Before going to the implication of this code snippet, let's understand what the code does. It defines a dynamic API route for `/api/users/[id]`. The exported `GET` function is an async route handler that runs when a GET request is made to this endpoint. It receives the request object and a `params` object, where `params.id` contains the dynamic `[id]` in the URL segment. The `db.user.findUnique()` method queries the database for a user whose `id` matches `params.id`, and the `select` option limits the returned fields to `id`, `email`, and `name`. Finally, `NextResponse.json()` sends the retrieved user data back to the client as a JSON response.

Now, to the implication, the code is a bad approach because the route accepts a user ID from the URL, fetches that user directly from the database, and returns the result. There is no session validation, no ownership check, and no role check.

If a logged-in user changes the `id` in the URL, they may access other users’ data. This is simply IDOR.

---

## How to Handle IDOR in Next.js

The first element of defense is verifying identity. We’ll use `getServerSession` from NextAuth (adjust if using another auth provider). This change ensures that you read the session from the cookies, verify it on the server side, and ensure the user has a valid ID. This prevents unauthenticated access.

```tsx title="lib/auth.ts"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  return session;
}
```

The code above defines an authentication helper function called `requireSession`. The `getServerSession(authOptions)` function retrieves the current user session on the server using the provided authentication configuration. The optional chaining (`session?.user?.id`) in the `if` block that follows safely checks whether a logged-in user and their `id` exist. If no valid session or user ID is found, the function returns `null`, indicating the request is unauthenticated. Otherwise, it returns the full `session` object so it can be used in protected routes or server logic.

You have successfully confirmed that the user and session exist; now, update the route:

```tsx
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: params.id },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json({ user });
}
```

The fix is incomplete yet, but in the above code, you’ve prevented anonymous access. The `GET` handler calls the `requireSession()` that was created earlier to verify that the request is authenticated. If no valid session is returned, it immediately responds with a JSON error message and a `401 Unauthorized` HTTP status. If the user is authenticated, it proceeds to call `db.user.findUnique()` to fetch the user whose `id` matches `params.id`, selecting only the `id`, `email`, and `name` fields. Finally, it returns the retrieved user data as a JSON response using `NextResponse.json()`.

Something is still missing. Can you guess? Any authenticated user can still request any resource by changing the URL path to the request they want. How? This leads us to object-level authorization.

### Object-Level Authorization

An object-level authorization ensures that a user can only access their own data (unless explicitly permitted).

The improvement to the code would be to add an ownership check. The adjustment ensures the API request checks if the requester is authenticated and owns the requested object. If either fails, access is denied.

```tsx
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.id !== params.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await db.user.findUnique({
    where: { id: params.id },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json({ user });
}
```

Let's take a look at what happened in the code, the `GET` handler first authenticates the request using `requireSession()`, returning a `401` response if no valid session exists. It then performs an authorization check by comparing `session.user.id` with `params.id`. If they do not match, it returns a `403 Forbidden` response, preventing users from accessing other users’ data. If both checks pass, it queries the database using `db.user.findUnique()` to retrieve the specified user and limits the result to selected fields. Finally, it sends the user data back as a JSON response. With this, you’ve enforced an **object-level authorization**.

---

## How to Design Safer Endpoints (`/api/me`)

The safest approach in designing your endpoint is to eliminate the risk entirely. Instead of allowing users to specify IDs (`/api/users/:id`), use `/api/me`, because the server already knows the user’s identity from the session.

```tsx title="app/api/me/route.ts"
export async function GET() {
  const session = await requireSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json({ user });
}
```

This approach makes sure that your API only returns data for the currently authenticated user. It first calls `requireSession()` to ensure the request is authenticated, returning a `401` response if no session exists. Instead of using a URL parameter, it reads the user’s ID directly from `session.user.id`, ensuring the user can only access their own data. It then calls `db.user.findUnique()` to retrieve that user from the database, selecting only specific fields, and returns the result as a JSON response.

You can be confident with this approach because the client cannot manipulate user IDs. The server gets the user identity from a trusted source, and the attack surface is reduced. This is called `secure-by-design` **API model**.

Now, you should clearly understand that authentication does not imply authorization. Hence,

- IDOR occurs when object ownership is not verified
- Every API route that accepts an ID must validate access
- Safer API design reduces vulnerability surface
- Authorization must always run on the server

---

## Mental Model for API Design

When writing any API route, answer these questions:

1. Who is making this request?
2. What object are they requesting?
3. Does policy allow them to access it?

If you cannot clearly answer all three, your route may be vulnerable.

---

## Conclusion

IDOR vulnerabilities happen when APIs trust user-supplied identifiers without verifying ownership or permission.

To prevent them in Next.js, authenticate every private route, enforce object-level authorization, centralize authorization logic, and write tests for forbidden access.

Security is not about adding logins, it’s about enforcing security policy on every object access.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Prevent IDOR Vulnerabilities in Next.js API Routes",
  "desc": "Imagine this situation: A user logs in successfully to your application, but upon loading their dashboard, they see someone else’s data. Why does this happen? The authentication worked, the session is",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/prevent-idor-in-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
