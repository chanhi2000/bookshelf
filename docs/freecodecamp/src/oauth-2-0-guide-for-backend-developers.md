---
lang: en-US
title: "How OAuth 2.0 Works: A Practical Guide for Backend Developers"
description: "Article(s) > How OAuth 2.0 Works: A Practical Guide for Backend Developers"
icon: iconfont icon-oauth
category:
  - DevOps
  - Security
  - OAuth
  - JWT
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - oauth
  - oauth2
  - jwt
  - json-web-token
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How OAuth 2.0 Works: A Practical Guide for Backend Developers"
    - property: og:description
      content: "How OAuth 2.0 Works: A Practical Guide for Backend Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/oauth-2-0-guide-for-backend-developers.html
prev: /devops/security-oauth/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/a789ad3d-c2a7-43d6-9c14-ae13705072a4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "OAuth > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security-oauth/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JWT > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security-jwt/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How OAuth 2.0 Works: A Practical Guide for Backend Developers"
  desc="If you ask ten junior developers how OAuth 2.0 works, nine of them will start reciting terminology like ”Authorization Server”, ”Bearer Tokens”, ”PKCE”, and ”Implicit Grant”. They might also draw a se"
  url="https://freecodecamp.org/news/oauth-2-0-guide-for-backend-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/a789ad3d-c2a7-43d6-9c14-ae13705072a4.png"/>

If you ask ten junior developers how OAuth 2.0 works, nine of them will start reciting terminology like "Authorization Server", "Bearer Tokens", "PKCE", and "Implicit Grant". They might also draw a sequence diagram with six arrows crossing back and forth.

But if you ask them why a specific HTTP request exists or what breaks if you remove it, they often can't give a good explanation.

That's because OAuth is usually taught backward, in my opinion. Most tutorials start with definitions and sequence diagrams before establishing why the protocol was designed that way in the first place.

In this guide, we're going to fix that. We'll build up OAuth 2.0 concept by concept, starting from a real engineering problem and arriving at the protocol solutions naturally. By the time we write the code in Spring Boot, every parameter, redirect, and token will make total sense.

---

## The Problem Before OAuth

Imagine we're building **TravelBuddy**, a Spring Boot application that helps users plan trips.

TravelBuddy has a feature that automatically detects scheduling conflicts and inserts trip itineraries directly into the user's Google Calendar.

To do this, TravelBuddy needs access to Google Calendar's API. Specifically, it needs to read existing events and write new ones on behalf of the user, Alice.

How would we have solved this back in 2005 before OAuth existed?

### The Password Sharing Anti-Pattern

Without a protocol like OAuth, TravelBuddy would've to ask Alice for her Google username and password.

![A linear flow showing Alice sending her full account credentials directly to TravelBuddy, which then forwards those credentials to the Google Calendar API. This pattern forces users to hand over total account control to third-party applications.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/71470751-1c68-45b9-8ab1-14b229124670.png)
<!-- TODO: mermaid화 -->

Alice would type her Google password directly into TravelBuddy's UI. TravelBuddy would store her password in its database and use those credentials to log into Google whenever it needed to fetch or create calendar events.

This approach works, but it creates massive security and operational problems:

1. **Over-privileged access:** TravelBuddy only needs to manage calendar events. But because it has Alice's actual Google password, it can also read her Gmail, look at her Google Drive files, delete her photos, or change her account password. There's no way to give TravelBuddy *limited* access.
2. **No revocation granular control:** If Alice wants to stop TravelBuddy from accessing her calendar, her only option is to change her Google password. Doing so breaks every other application she previously authorized.
3. **Storage liability for TravelBuddy:** TravelBuddy is now storing plaintext or decryptable passwords for thousands of Google accounts. A single SQL injection or database leak on TravelBuddy's side compromises the master keys to its users' entire digital lives on Google.
4. **Phishing normalization:** Training users to enter their primary Google credentials into third-party apps teaches them terrible security habits.

We need a way for Alice to give TravelBuddy permission to perform specific actions on Google Calendar *without ever giving TravelBuddy her Google password*.

That capability is called **delegated authorization**, and that's precisely what OAuth 2.0 provides.

---

## What OAuth 2.0 Actually Is (And Isn't)

OAuth 2.0 is an open standard for **delegated authorization**.

It provides a framework that allows a user to grant a third-party application limited access to their resources on another service without sharing their credentials.

Before moving forward, we must address the single most common misconception in web development.

### Authentication vs. Authorization

Developers swap these terms constantly, but they answer two fundamentally different questions:

- **Authentication (AuthN):** *Who are you?* (Identity)
- **Authorization (AuthZ):** *What are you allowed to do?* (Permissions)

![A flowchart illustrating how Authentication precedes Authorization. The first box establishes identity ("You are Alice"), which feeds into the second box establishing permissions ("Alice can read/write events, but cannot delete the calendar").](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/f03b89c7-79e8-489e-9607-f5b2f5a65a5e.png)
<!-- TODO: mermaid화 -->

OAuth 2.0 is **strictly an authorization framework.** It doesn't specify how to authenticate a user, how to issue identity details, or how to store user accounts. It only cares about issuing permission keys (tokens) so one service can talk to another on a user's behalf.

When you click "Log in with Google" on a website, that interaction uses an extension built *on top* of OAuth called OpenID Connect (OIDC), which we'll cover later. But core OAuth 2.0 is entirely about authorization.

---

## Application Registration: Where Credentials Come From

Before TravelBuddy can initiate an OAuth flow, we must register TravelBuddy in the **Google Cloud Console**.

During registration, Google prompts TravelBuddy for two key details:

1. **Application Name & Logo:** Presented on the user consent screen.
2. **Redirect URIs:** The exact callback URLs (for example, `https://travelbuddy.com/login/oauth2/code/google`) where Google is permitted to send authorization codes.

Once registered, Google issues two credentials to TravelBuddy:

- `client_id`**:** A public identifier (like a username) that identifies TravelBuddy. It;s safe to embed in public links or frontend code.
- `client_secret`**:** A confidential key (like a password) used by TravelBuddy's backend server to authenticate itself when exchanging authorization codes for tokens.

---

## The Four Roles in OAuth 2.0

OAuth 2.0 defines four roles. Let's map them directly to our TravelBuddy example so these terms stop being abstract definitions.

![A diagram connecting the four entities: Alice (Resource Owner) grants permission to TravelBuddy (Client). Alice authenticates with Google's Authorization Server, which issues a token to TravelBuddy. TravelBuddy uses that token to request data from Google Calendar (Resource Server), which validates the token with the Authorization Server.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/615ddf00-a380-45c7-a49b-2b613a7b36ff.png)

- **Resource Owner:** The user who owns the data. In our example, this is **Alice**. She owns her Google Calendar.
- **Client:** The third-party application trying to access the user's data. In our example, this is **TravelBuddy** (our Spring Boot backend). It's called a "client" because it acts as a client to the API.
- **Authorization Server:** The server that authenticates the user, obtains their consent, and issues access tokens. In our example, this is **Google's OAuth server** (`accounts.google.com`).
- **Resource Server:** The server hosting the protected user data. In our example, this is the **Google Calendar API** (`www.googleapis.com/calendar`).

Notice how Google's responsibilities are split into two separate roles: the Authorization Server (which issues tokens) and the Resource Server (which hosts the API). In large organizations, these are frequently separate services maintained by different teams.

---

## Access Tokens and Scopes

Instead of handing TravelBuddy her password, Alice approves the issuance of an **Access Token**.

An access token is a string of characters that acts like a temporary keycard. When TravelBuddy makes an HTTP request to Google Calendar, it presents this token in the headers.

An access token has three critical properties that passwords lack:

1. **Limited Scope:** It can only be used for specific permissions.
2. **Limited Lifetime:** It expires automatically after a short period (typically minutes or hours).
3. **Revocable:** Alice or Google can revoke the token at any point without impacting Alice's account password.

### What is a Scope?

A scope is a string that defines the exact permission being requested. Instead of asking for "Google account access", TravelBuddy asks for specific scopes.

When TravelBuddy redirects Alice to Google, it specifies the requested scopes:

- Read calendar events: [<VPIcon icon="fa-brands fa-google"/>googleapis.com/auth/calendar.events.readonly](https://googleapis.com/auth/calendar.events.readonly)
- Create/Edit calendar events: [<VPIcon icon="fa-brands fa-google"/>googleapis.com/auth/calendar.events](https://googleapis.com/auth/calendar.events)

When TravelBuddy redirects Alice to Google, it specifies the requested scopes. Google displays these exact permissions to Alice:

"TravelBuddy would like permission to view and edit your Google Calendar events."

If Alice agrees, the access token Google issues will be bound strictly to those requested scopes. If TravelBuddy tries to use that same token to read Alice's emails, Google's Resource Server will reject the request with a `403 Forbidden` status code.

---

## The Authorization Code Flow

Now that we know the roles and tokens, how does TravelBuddy actually get an access token?

The standard, most secure flow for server-side applications (like our Spring Boot app) is the **Authorization Code Flow**.

Here's the sequence of events. We'll walk through every step in detail immediately after the diagram.

![A nine-step sequence diagram detailing the authorization process. The user initiates the sync, gets redirected to Google to log in and consent, and receives a temporary Auth Code via browser redirect. TravelBuddy's backend exchanges that code and its Client Secret for an Access Token directly with Google, then calls the Calendar API using the Bearer token.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/1d792e3f-3d4b-4596-852b-b917e63c4c2d.png)
<!-- TODO: mermaid화 -->

Let's break this down step-by-step.

### Step 1: User Initiates Action

Alice is using TravelBuddy's UI and clicks "Connect Google Calendar."

### Step 2: TravelBuddy Constructs Redirect URL

TravelBuddy's backend doesn't prompt for credentials. Instead, it generates a URL pointing to Google's Authorization Server and instructs Alice's browser to redirect there.

This URL looks like this:

```plaintext
GET https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=TRAVELBUDDY_CLIENT_ID&redirect_uri=https://travelbuddy.com/login/oauth2/code/google&scope=https://www.googleapis.com/auth/calendar.events&state=xyz123
```

Let's analyze what each parameter does:

- `response_type=code`: Tells Google we're using the Authorization Code flow.
- `client_id`: A public identifier Google gave to TravelBuddy when TravelBuddy registered as a developer app.
- `redirect_uri`: The URL where Google should send Alice back once she completes consent.
- `scope`: The permissions TravelBuddy is asking for.
- `state`: A random string generated by TravelBuddy to prevent Cross-Site Request Forgery (CSRF) attacks.

### Step 3: Alice Authenticates and Consents

Alice's browser lands on Google's domain ([<VPIcon icon="fa-brands fa-google"/>`accounts.google.com`](http://accounts.google.com)).

Google verifies whether Alice is logged in. If not, Google asks her to log in. **TravelBuddy never sees this interaction.**

Once authenticated, Google displays the consent screen listing TravelBuddy's name and the requested scopes.

### Step 4 & 5: Google Issues an Authorization Code

Alice clicks "Approve." Google's authorization server redirects Alice's browser back to TravelBuddy's registered `redirect_uri`, attaching a short-lived **Authorization Code** and the `state` parameter in the query string:

```sh
GET https://travelbuddy.com/login/oauth2/code/google?code=4/0AX4XfWh...&state=xyz123
```

TravelBuddy's backend verifies that the returned `state` matches what it originally sent. If it matches, TravelBuddy takes the `code`.

### Step 6 & 7: TravelBuddy Exchanges the Code for a Token

Now TravelBuddy's **backend server** makes a direct, server-to-server POST request to Google's token endpoint (`https://oauth2.googleapis.com/token`):

```plaintext
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=4/0AX4XfWh...&
redirect_uri=https://travelbuddy.com/login/oauth2/code/google&
client_id=TRAVELBUDDY_CLIENT_ID&
client_secret=TRAVELBUDDY_CLIENT_SECRET
```

Google validates the authorization code and TravelBuddy's `client_secret`. If valid, Google responds with a JSON payload containing the access token:

```json
{
  "access_token": "ya29.a0ARrdaM...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "1//04rG...",
  "scope": "https://www.googleapis.com/auth/calendar.events"
}
```

### Step 8 & 9: Calling the API

TravelBuddy now stores this access token securely and uses it to call the Google Calendar API on Alice's behalf:

```sh
GET /calendar/v3/users/me/calendarList HTTP/1.1
Host: www.googleapis.com
Authorization: Bearer ya29.a0ARrdaM...
```

Google Calendar receives the request, extracts the Bearer token, checks with Google's auth infrastructure to verify it is valid and scoped correctly, and returns Alice's calendar data.

---

## Why The Two-Step Redirect Exists

At this point, a junior developer almost always asks a great question:

> *"Why do we have Step 4 and 6? Why doesn't Google just return the access token directly in the redirect back to the browser in Step 4?"*

Why bother returning a temporary `authorization_code` to the browser, only to immediately make another backend call to exchange it for the actual `access_token`?

The answer boils down to **Front-Channel vs. Back-Channel security**.

- **The Front-Channel (the browser):** The browser is an untrusted, highly exposed environment. Redirect URIs pass through browser histories, system logs, referrer headers, and browser extensions. If Google returned an access token directly in the browser's URL, that high-privilege token could easily leak or be intercepted by malicious extensions.
- **The Back-Channel (server-to-server):** The direct HTTPS network call between TravelBuddy's backend server and Google's auth server is private and encrypted. It bypasses the browser completely.

![A structural diagram separating the two network channels. The top box shows the Front-Channel, where the browser passes the exposed Authorization Code through URL redirects. The bottom box shows the secure Back-Channel, where TravelBuddy's server directly exchanges the Auth Code and Client Secret for tokens over encrypted server-to-server HTTPS.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/3771a305-01b5-4e0f-8732-5c74fbe2a01b.png)
<!-- TODO: mermaid화 -->

The Authorization Code acts as a temporary, single-use ticket (usually expiring in under 60 seconds). Even if an attacker steals the authorization code from the browser's URL history, **they can't exchange it for an access token because they don't possess TravelBuddy's `client_secret`.**

---

## Token Expiration and Refresh Tokens

Access tokens are intentionally designed to be short-lived, typically expiring after one hour (`expires_in: 3600`).

Why? Because if an access token leaks, the window of opportunity for an attacker is strictly limited to whatever time remains before expiration.

But having Alice re-authenticate and click "Approve" every hour would offer a terrible user experience. TravelBuddy needs to sync calendars in the background while Alice is asleep.

To solve this, OAuth 2.0 introduces **Refresh Tokens**.

![A sequence diagram showing error recovery. TravelBuddy attempts an API call with an expired token and gets a 401 response. TravelBuddy sends a POST request with its Refresh Token to the Auth Server, receives a fresh Access Token, and retries the original API request successfully.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/0f235e3b-59ff-4973-8a3b-adc3517caec8.png)
<!-- TODO: mermaid화 -->

### How Refresh Tokens Work

Depending on provider configuration (for example, passing `access_type=offline` and `prompt=consent` for Google), Google returns both an `access_token` and a long-lived `refresh_token` during the initial code exchange.

Then TravelBuddy encrypts and stores the `refresh_token` securely in its database.

When the `access_token` expires, TravelBuddy makes a background request directly to Google's token endpoint, presenting the `refresh_token` and `client_secret`.

Finally, Google validates the refresh token and issues a brand-new `access_token` without involving Alice at all.

| **Feature** | **Access Token** | **Refresh Token** |
| ---: | :--- | :--- |
| **Primary Purpose** | Used to access protected APIs | Used to obtain new access tokens |
| **Lifetime** | Very short (15 mins to 1 hour) | Long-lived (days, months, or until revoked) |
| **Sent Where?** | Sent with every API call to Resource Server | Sent ONLY to Authorization Server token endpoint |
| **Storage Security** | Can be kept in temporary server memory | Must be stored encrypted in secure storage |

---

## PKCE: Protecting Public Clients

The Authorization Code flow we just discussed relies on TravelBuddy keeping its `client_secret` confidential. That is why TravelBuddy is classified as a **Confidential Client**. It runs on a server where developers can safely store environment variables and secrets.

But what if TravelBuddy is a Single Page Application (React/Vue running directly in the browser) or a Native Mobile App (iOS/Android)?

These are **Public Clients**. Anyone can open browser developer tools or decompile an Android `.apk` file to extract any embedded `client_secret`.

Without a secret, how can public clients safely use the Authorization Code flow? If a malicious app on a mobile device intercepts the authorization code, it could exchange that code for tokens because there is no `client_secret` stopping it.

To solve this, OAuth 2.0 introduced **PKCE** (Proof Key for Code Exchange, pronounced "pixie").

![A sequence diagram illustrating PKCE. The client generates a secret code_verifier and hashes it into a code_challenge. It sends the challenge during authorization. When exchanging the Auth Code for tokens, it reveals the original code_verifier. The Auth Server hashes the verifier and compares it against the challenge to verify client identity without requiring a client secret.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/05e945d7-a9a8-4de2-8ff3-20c955f704a5.png)
<!-- TODO: mermaid화 -->

### How PKCE Works

Before starting the flow, the client generates a cryptographic, random string called the `code_verifier`. The client hashes this string (typically using SHA-256) to produce the `code_challenge`.

In Step 2 of the Auth flow, the client sends the `code_challenge` and hash method (`code_challenge_method=S256`) to the Authorization Server. The Authorization Server stores the `code_challenge` and returns the authorization code as usual.

In Step 6, when exchanging the code for tokens, the client sends the original `unhashed code_verifier`.

The Authorization Server hashes the provided `code_verifier` using SHA-256 and checks if it matches the stored `code_challenge`. If it matches, it proves that the app requesting the token is the exact same app that initiated the request.

::: note

Modern OAuth security guidelines recommend using PKCE for all applications, including confidential backend applications like Spring Boot.

:::

---

## `state` vs. PKCE: Stopping Different Attacks

Developers often confuse `state` and `PKCE` because both involve random strings sent during the OAuth flow. But they protect against completely different attack vectors:

| **Property** | **`state` Parameter** | **`PKCE` (code_verifier)** |
| ---: | :--- | :--- |
| Primary Threat | **Login CSRF**: An attacker tricks a victim into completing an OAuth flow using the <em>attacker's</em> authorization code. | **Code Interception**: An attacker steals a victim's authorization code and exchanges it for a token. |
| How It Protects | Binds the authorization callback to the user's specific browser session. | Proves that the entity exchanging the code is the same entity that requested it. |
| Validation Point | Checked by the **Client Application Backend** upon callback. | Checked by the **Authorization Server** at the `/token` endpoint. |

---

## OAuth 2.0 vs. OpenID Connect (OIDC) & JWTs

Earlier, I emphasized that OAuth 2.0 is purely for **authorization** (permissions), not **authentication** (identity).

Yet, almost every app you use has a "Sign in with Google" button. How does that work?

### Enter OpenID Connect (OIDC)

OpenID Connect is an identity layer built directly on top of OAuth 2.0. While core OAuth issues an `access_token` meant for an API, requesting the `openid` scope instructs the Authorization Server to issue an **ID Token** alongside the access token:

![A nested architecture diagram showing OpenID Connect as an outer identity layer wrapping core OAuth 2.0. OAuth 2.0 handles Access Tokens for API permissions, while OIDC adds the ID Token (JWT) to convey user identity information.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/0089d542-a859-45c0-874e-19f54d85e431.png)
<!-- TODO: mermaid화 -->

When TravelBuddy requests the `openid` scope alongside calendar permissions:

```sh
scope=openid profile email https://www.googleapis.com/auth/calendar.events
```

Google's token endpoint responds with both an `access_token` AND an `id_token`.

- **Access Token:** Intended for the Resource Server (Google Calendar). TravelBuddy doesn't need to read its contents. It just passes it along in headers.
- **ID Token:** Intended specifically for TravelBuddy. It contains cryptographically signed information about Alice (for example, her Google User ID, full name, email, and profile picture URL).

### What is a JWT?

An ID Token is almost always formatted as a **JWT** (JSON Web Token, pronounced "jot").

A JWT is a compact, URL-safe string containing three parts separated by dots: `Header.Payload.Signature`

```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Decoding the middle section (Payload) reveals plain JSON:

```json
{
  "sub": "google-user-id-98765",
  "iss": "https://accounts.google.com",
  "aud": "TRAVELBUDDY_CLIENT_ID",
  "email": "alice@gmail.com",
  "exp": 1711900000
}
```

Base64URL encoding is **not encryption**. Anyone who holds a JWT can read its contents. But because the token is signed using Google's private key, TravelBuddy's backend can verify Google's public signature locally without needing to call Google's servers to confirm Alice's identity on every request.

### Is an Access Token always a JWT?

**No.** OAuth 2.0 intentionally doesn't mandate any specific format for access tokens.

An access token can be:

1. **An Opaque Token:** A completely random string (for example, `ya29.a0ARrdaM...`). The client and resource server must look up its meaning by querying the authorization server.
2. **A Structured Token (like a JWT):** Contains embedded claims so the resource server can validate it self-sufficiently.

---

## What is OAuth 2.1?

If you work with modern security guidelines, you'll hear about **OAuth 2.1**.

OAuth 2.1 is not an overhaul of OAuth 2.0. It's a consolidation draft that incorporates years of security best practices into a single specification:

1. **Mandatory PKCE:** PKCE is required for *all* Authorization Code flows, including confidential server-side apps like Spring Boot.
2. **Deprecation of Legacy Grants:** The Implicit Grant (which returned tokens directly in browser URLs) and the Resource Owner Password Credentials Grant (which collected passwords directly) are removed entirely.
3. **Exact Redirect URI Matching:** Wildcards in redirect URIs are prohibited to prevent open-redirect exploits.

---

## Production Security Pitfalls to Avoid

Building OAuth integrations in production requires careful attention to detail. Here are five of the most common security mistakes backend engineers make and how to avoid them:

### 1. Storing Tokens in Browser `localStorage`

If you're building a SPA client that receives access or refresh tokens, never store tokens in `localStorage` or `sessionStorage`.

Any script running on your page, including third-party analytics, chat widgets, or compromised npm dependencies, can read `localStorage` through a Cross-Site Scripting (XSS) vulnerability.

::: tip Fix

Store tokens inside HTTP-Only, Secure, SameSite cookies managed by your backend, or use a backend-for-frontend (BFF) architecture where tokens never reach the browser at all.

:::

### 2. Leaking the Client Secret

It sounds obvious, but `client_secret` strings end up in public GitHub repositories constantly. Remember: any secret included in Android/iOS apps, React single-page apps, or frontend code is public.

::: tip Fix

Keep client secrets inside environment variables on server-side environments. Use PKCE for public clients where secrets can't be protected.

:::

### 3. Requesting Unnecessary Scopes (Scope Creep)

Asking for full account access when you only need read permission makes users suspicious and increases your liability if a token leaks.

::: tip Fix

Follow the principle of least privilege. Request only the specific scopes your app needs immediately. If TravelBuddy later adds a feature to analyze emails, request the Gmail scope dynamically when the user activates that feature.

:::

### 4. Assuming an OAuth Token Proves Identity

Just because an app receives an `access_token` from an API doesn't mean it can treat that token as proof of who logged in.

If an attacker passes a valid access token obtained from a different application (a confused deputy attack), your system might accept it if it only checks token validity without checking who the token was issued to `aud` / audience claim).

Fix: Use OpenID Connect (and validate the `id_token` claims including `aud` and `iss`) when authenticating users.

### 5. Skipping `state` or `PKCE` Validation

If you manually build OAuth flows without checking the `state` parameter, your application is vulnerable to Login Cross-Site Request Forgery (CSRF). An attacker could trick a user's browser into completing an OAuth flow using the attacker's authorization code, linking the victim's session to the attacker's account data.

Fix: Always generate a cryptographically strong, non-guessable `state` parameter bound to the user's session, or rely on established security frameworks like Spring Security that enforce this automatically.

---

## Final Thoughts

OAuth 2.0 can feel overwhelming when viewed entirely as a web of specs, RFCs, and terminology.

When you strip away the jargon, OAuth solves one core problem: allowing a user to give an application permission to access their data without handing over their password.

Every moving part in the protocol exists to support that core mission safely:

- **Scopes** restrict permissions.
- **Access Tokens** provide temporary, revocable access.
- **Authorization Codes** keep tokens out of vulnerable browser URLs.
- **Refresh Tokens** maintain long-term access without harassing the user.
- **PKCE** protects public applications that can't keep secrets.
- **OpenID Connect** adds a standardized identity layer on top.

The next time you integrate an OAuth provider in Spring Boot or debug a token error in production, don't focus on memorizing the diagrams. Look at the HTTP request, ask which specific boundary it is crossing, and the design choices will make immediate sense.

::: info Summary Glossary

- **Authorization Code:** A short-lived, single-use ticket returned via browser redirect, exchanged server-side for access tokens.
- **Access Token:** A temporary keycard used in HTTP headers to access protected resources.
- **Refresh Token:** A long-lived credential used strictly at the token endpoint to obtain new access tokens.
- **Scope:** A string specifying granular permissions requested by the client.
- **PKCE:** Proof Key for Code Exchange. A cryptographic technique binding token exchange to the initiating client instance.
- **OpenID Connect (OIDC):** An identity layer built on top of OAuth 2.0 that issues an `id_token` containing user profile details.
- **JWT:** JSON Web Token, a compact, digitally signed format commonly used for ID tokens.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How OAuth 2.0 Works: A Practical Guide for Backend Developers",
  "desc": "If you ask ten junior developers how OAuth 2.0 works, nine of them will start reciting terminology like ”Authorization Server”, ”Bearer Tokens”, ”PKCE”, and ”Implicit Grant”. They might also draw a se",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/oauth-2-0-guide-for-backend-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
