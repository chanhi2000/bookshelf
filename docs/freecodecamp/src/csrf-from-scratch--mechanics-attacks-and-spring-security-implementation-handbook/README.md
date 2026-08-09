---
lang: en-US
title: "CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]"
description: "Article(s) > CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]"
icon: iconfont icon-spring
category:
  - Java
  - Spring
  - DevOps
  - Security
  - OAuth
  - JWT
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - spring
  - java-spring
  - springframework
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
      content: "Article(s) > CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]"
    - property: og:description
      content: "CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/csrf-from-scratch-browser-mechanics-attacks-and-spring-security-implementation-handbook/
prev: /programming/java-spring/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/20e903c5-9011-4f14-b714-974e32d43f3c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]"
  desc="If you've ever built a web application or configured Spring Security, you've almost certainly encountered Cross-Site Request Forgery (CSRF). In my previous guide, How OAuth 2.0 Works: A Practical Guid"
  url="https://freecodecamp.org/news/csrf-from-scratch-browser-mechanics-attacks-and-spring-security-implementation-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/20e903c5-9011-4f14-b714-974e32d43f3c.png"/>

If you've ever built a web application or configured Spring Security, you've almost certainly encountered Cross-Site Request Forgery (CSRF).

In my previous guide, [How OAuth 2.0 Works: A Practical Guide for Backend Developers (<VPIcon icon="fa-brands fa-medium"/>`@ashutoshkrris`)](https://medium.com/@ashutoshkrris/how-oauth-2-0-works-a-practical-guide-for-backend-developers-630977209476), I briefly touched on the mysterious `state` parameter and noted that its core purpose is protecting authorization flows against CSRF attacks.

At the time, we treated CSRF as a quick prerequisite concept. Today, we're taking a much deeper dive.

Perhaps you were building a REST API in Spring Boot, ran into unexpected HTTP 403 Forbidden errors on every `POST` request, and "fixed" it by adding `.csrf(csrf -> csrf.disable())` to your Security Filter Chain.

Most tutorials treat CSRF as a checkbox item or a framework toggle. They immediately jump to code:

```java
// What most tutorials show on line 1:
http.csrf(Customizer.withDefaults());
```

Starting with framework configuration hides how web security actually operates. Spring Security doesn't invent security rules out of thin air. It responds to the fundamental mechanics of web browsers, HTTP protocols, and cookies.

In this handbook, we'll take a bottom-up, first-principles approach. We won't talk about Spring Security until we've thoroughly explored browsers, HTTP headers, session management, and the underlying mechanics of Cross-Site Request Forgery.

By the end of this guide, you'll understand:

- Why browsers automatically attach credentials to outgoing requests.
- Why that automatic behavior creates a fundamental vulnerability.
- Why attackers never need to steal or read your cookies to exploit CSRF.
- Why Same Origin Policy (SOP) and CORS don't prevent CSRF.
- How modern defenses, from CSRF Tokens to `SameSite` cookies, work under the hood.
- How Spring Security implements these defenses internally and how to configure them effectively.

Let’s begin by stripping away frameworks and looking at how the web actually works.

---

## Table of Contents

- [Visualize the Attack](#heading-visualize-the-attack)
- [Why the Browser Isn't Broken](#heading-why-the-browser-isnt-broken)
- [Same Origin Policy (SOP)](#heading-same-origin-policy-sop)
- [Why CORS Does NOT Prevent CSRF](#heading-why-cors-does-not-prevent-csrf)
- [Safe Methods and State Mutation](#heading-safe-methods-and-state-mutation)
- [CSRF Tokens (Synchronizer Token Pattern)](#heading-csrf-tokens-synchronizer-token-pattern)
- [Double Submit Cookie Pattern](#heading-double-submit-cookie-pattern)
- [SameSite Cookies](#heading-samesite-cookies)
- [Origin and Referer Headers](#heading-origin-and-referer-headers)
- [JWT and CSRF: The Token Storage Dilemma](#heading-jwt-and-csrf-the-token-storage-dilemma)
- [Spring Security CSRF Internals](#heading-spring-security-csrf-internals)
- [Implement CSRF Protection Yourself](#heading-implement-csrf-protection-yourself)
- [Testing CSRF Protections](#heading-testing-csrf-protections)
- [Common Misconceptions](#heading-common-misconceptions)
- [Production Best Practices Checklist](#heading-production-best-practices-checklist)

---

## The Problem Before CSRF

To understand security, we must first understand state.

The Hypertext Transfer Protocol (HTTP) is inherently **stateless**. This means that if Alice sends an HTTP request to `travelbuddy.com` (our example) at 10:00 AM, and sends another HTTP request to `travelbuddy.com` at 10:01 AM, the server treats those two requests as completely isolated, unrelated events.

![Sequence diagram showing Alice’s browser making a successful GET request to the TravelBuddy Server, followed 1 minute later by a second GET request that returns a 401 Unauthorized error.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/c5c24ee5-450d-4252-8e79-3744f9814fbd.png)

Without a mechanism to remember Alice between requests, Alice would have to send her username and password inside *every single HTTP request* she makes. That would be horrific for both user experience and performance.

Before session mechanisms were standard, developers tried passing credentials via query parameters or basic authentication headers on every click. This led to credential exposure in server logs, browser histories, and URL shares.

### How Do Sessions and Cookies Solve This?

To solve this, web engineers introduced the concept of **Server-Side Sessions** and **HTTP Cookies**.

When Alice logs into `TravelBuddy` by sending her username and password via a POST request to `https://travelbuddy.com/login`, the server verifies her credentials. Instead of asking Alice to log in again on the next page, the server creates a **Session** in its memory (or in a database/Redis cache) and assigns it a unique, unpredictable identifier: a **Session ID**.

The server then sends this Session ID back to Alice’s browser using a special HTTP response header: `Set-Cookie`.

```plaintext
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: JSESSIONID=abc123xyz789; Path=/; Secure; HttpOnly
```

When Alice’s browser receives this response, it sees the `Set-Cookie` header. It extracts `JSESSIONID=abc123xyz789` and stores it inside its internal storage unit: the **Browser Cookie Jar**.

Now, Alice is "logged in". The server remembers her via that session record, and the browser holds the key (`JSESSIONID`) to that session.

---

## Why Browsers Automatically Send Cookies

Now we arrive at the pivotal design choice made in the early days of the web.

Once the browser stores `JSESSIONID=abc123xyz789` in its cookie jar for the domain `travelbuddy.com`, how does that cookie get sent back to the server on subsequent requests?

Does the developer have to write custom JavaScript to attach the cookie? **No.**

Browsers are explicitly designed to handle cookie management **automatically**.

### The Request Lifecycle and Automatic Cookie Attachment

Every time Alice's browser prepares an HTTP request to `https://travelbuddy.com` (whether caused by Alice clicking a link, submitting an HTML form, or JavaScript triggering a `fetch()` call), the browser follows this exact process:

1. **URL Inspection:** The browser examines the destination URL (for example, `https://travelbuddy.com/api/connections`).
2. **Cookie Jar Lookup:** The browser scans its cookie jar for any stored cookies whose domain and path match `travelbuddy.com`.
3. **Validation Check:** It verifies if the cookie has expired, and if flags like `Secure` (requires HTTPS) are respected.
4. **Header Injection:** If valid cookies match, the browser automatically injects a `Cookie` header into the outgoing HTTP request payload.

Here's what the outgoing request looks like as it leaves Alice's machine:

```plaintext
POST /api/connections/add HTTP/1.1
Host: travelbuddy.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Accept: text/html,application/xhtml+xml
Cookie: JSESSIONID=abc123xyz789
Content-Type: application/x-www-form-urlencoded

service=SkyScanner
```

Notice something critical: **Neither Alice nor any custom frontend JavaScript explicitly attached** `Cookie: JSESSIONID=abc123xyz789`**.**

The browser's internal engine attached it automatically before sending the byte stream across the network. From the server's perspective, receiving `Cookie: JSESSIONID=abc123xyz789` is proof that the request originated from an authenticated session belonging to Alice.

This automatic behavior is convenient. It makes web browsing seamless across page reloads and link navigation. But as we'll soon see, this convenience leaves a backdoor wide open.

---

## When Automatic Cookies Become Dangerous

Is automatic cookie inclusion a vulnerability by itself?

**No.** If Alice only visits `travelbuddy.com`, automatic cookie inclusion works exactly as intended.

The vulnerability emerges because of a simple web reality: **Alice visits multiple websites in the same browser session.**

### Enter `evil.com`

Suppose Alice is logged into `TravelBuddy` in Tab 1. Her session cookie (`JSESSIONID=abc123xyz789`) sits safely inside her browser's cookie jar for `travelbuddy.com`.

In Tab 2, Alice visits an unrelated website: `https://evil.com` (perhaps she clicked a link in a phishing email or a forum post).

`evil.com` is controlled by an attacker. The attacker knows that `TravelBuddy` has a feature located at `POST` `[https://travelbuddy.com/api/connections/add` that connects third-party services. The attacker wants to trick Alice into connecting the attacker's malicious service to her account.

The attacker embeds the following hidden HTML form inside the HTML page served by `evil.com`:

```html
<!-- Hosted on https://evil.com/win-a-car.html -->
<!DOCTYPE html>
<html>
<body>
  <h1>You won a free trip! Click below to claim.</h1>
  
  <!-- Hidden Form targeting TravelBuddy -->
  <form id="maliciousForm" action="https://travelbuddy.com/api/connections/add" method="POST">
    <input type="hidden" name="service" value="MaliciousAttackerService" />
  </form>

  <script>
    // Automatically submit the form as soon as the page loads
    document.getElementById('maliciousForm').submit();
  </script>
</body>
</html>
```

### Walkthrough of the Attack Execution

Let's trace step-by-step what happens when Alice opens `https://evil.com/win-a-car.html`:

1. Alice's browser fetches and parses HTML from `evil.com`.
2. The browser encounters the `<script>` tag and executes `document.getElementById('maliciousForm').submit()`.
3. The browser prepares an outgoing `POST` request targeting `https://travelbuddy.com/api/connections/add`.
4. The browser looks at the target destination: `travelbuddy.com`.
5. The browser checks its Cookie Jar: *"Do I have any active cookies for `travelbuddy.com`?"*
6. **Yes!** It finds `JSESSIONID=abc123xyz789` (Alice's active session cookie from Tab 1).
7. The browser automatically injects `Cookie: JSESSIONID=abc123xyz789` into the outgoing request payload heading to `travelbuddy.com`.
8. The request lands on the `TravelBuddy` Spring Boot backend server.

### The Server's Perspective

Here's what the `TravelBuddy` backend sees when processing the request:

```plaintext
POST /api/connections/add HTTP/1.1
Host: travelbuddy.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Content-Type: application/x-www-form-urlencoded
Cookie: JSESSIONID=abc123xyz789

service=MaliciousAttackerService
```

The `TravelBuddy` server checks the `Cookie` header. It validates `JSESSIONID=abc123xyz789` against its session store. The session is valid: it belongs to Alice!

The server assumes: *"Alice sent a POST request to add `MaliciousAttackerService`. She is authenticated, so I will grant this request."*

The server updates Alice's account state. `MaliciousAttackerService` is now connected to her profile.

### The Core Realization of CSRF

Take a step back and examine what just happened:

1. **The attacker NEVER saw or stole Alice’s session cookie.** The attacker on `evil.com` can't read cookies belonging to `travelbuddy.com` due to browser isolation rules.
2. **The attacker did NOT break encryption.** HTTPS was active the entire time.
3. **The attacker simply induced Alice's browser to make a request.** The browser, faithfully executing its automatic cookie attachment rules, provided the credentials on behalf of the attacker. You could say the attacker got caught with their hand in Alice's cookie jar!

This is **Cross-Site Request Forgery in action**: An attacker tricks a victim's browser into executing an unwanted, state-changing HTTP request to a trusted site where the victim is currently authenticated.

---

## Visualize the Attack

Visualizing the interaction between Alice, the browser, `evil.com`, and `TravelBuddy` makes the underlying request flow clear.

### 1. The Complete CSRF Sequence

![Sequence diagram illustrating a Cross-Site Request Forgery (CSRF) attack where an attacker site (evil.com) uses an auto-submitting form to trick a logged-in user’s browser into sending an authenticated request to travelbuddy.com.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/0431c42a-815b-482c-900e-7985c3f5ace1.png)
<!-- TODO: mermaid화 -->

The attack unfolds across three distinct phases involving four main actors: Alice, her web browser, the TravelBuddy backend server, and the attacker site running on `evil.com`.

In the first phase, Alice authenticates with TravelBuddy. She submits her login credentials through her browser, which sends a POST request to the TravelBuddy backend. The backend verifies her credentials and responds with an HTTP 200 OK status alongside a `Set-Cookie` header containing `JSESSIONID=abc123xyz`.

Upon receiving this response, Alice's browser automatically saves this session identifier inside its cookie jar for the `travelbuddy.com` domain.

In the second phase, the attacker sets a trap. While keeping her TravelBuddy tab active, Alice opens a second browser tab and visits `evil.com`. Her browser requests the page `win-a-car.html` from `evil.com`. In response, `evil.com` serves an HTML document containing an invisible form targeting TravelBuddy, paired with an embedded JavaScript script designed to trigger immediately upon loading.

In the final phase, the attack executes automatically. The malicious JavaScript on `evil.com` calls `form.submit()`, commanding the browser to send a POST request to `https://travelbuddy.com/api/connections/add`.

Before sending the request across the network, the browser checks its cookie jar for any cookies matching `travelbuddy.com`. It finds Alice's active session cookie and automatically attaches `Cookie: JSESSIONID=abc123xyz` to the outgoing request payload. The TravelBuddy server receives the request, inspects the valid session cookie, assumes Alice intended to perform this action, and attaches the attacker's service to her account.

### 2. Browser Decision Tree during Outgoing Request

When any request is fired, the browser follows a decision path regarding cookie attachment:

![Flowchart showing how a web browser automatically checks its Cookie Jar and attaches valid cookies to an outgoing HTTP request targeting travelbuddy.com.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/59876902-2a43-4082-81f8-83e2c198e0c6.png)
<!-- TODO: mermaid화 -->

This diagram outlines the automatic evaluation loop executed by a browser whenever an HTTP request is triggered from any tab or script.

The process begins as soon as an outgoing HTTP request is initiated. The browser first inspects the target URL to extract the destination domain, such as `travelbuddy.com`. Once the domain is identified, the browser queries its internal cookie storage to check whether any cookies are mapped to that target domain. If no matching cookies exist, the browser immediately skips credential attachment and dispatches the raw HTTP request across the network.

If matching cookies are found, the browser evaluates their validity. It checks whether the cookies have expired, whether the request path matches the path defined in the cookie, and whether security constraints like the `Secure` HTTPS flag are satisfied. If any validation check fails, the cookie is discarded, and the request proceeds without credentials. But if the cookies are valid and active, the browser constructs a `Cookie` header containing the stored session key and attaches it to the outgoing HTTP request payload before dispatching it across the network to the server.

### 3. Session and Cookie Lifecycle State Diagram

![State diagram showing a user transitioning from an unauthenticated state to an authenticated state with automatic cookie management, and how maintaining an active session leaves the application vulnerable to CSRF when visiting a malicious site.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/b244543c-2ad6-455c-949d-eefe219eb4a0.png)
<!-- TODO: mermaid화 -->

This state diagram tracks how a user moves between secure, authenticated, and vulnerable conditions during a web session.

When a user first opens their web browser, they begin in an unauthenticated state with no cookies stored for the target application. Submitting valid credentials via a login form transitions the user into an authenticated state. Inside this authenticated state, the server issues a `Set-Cookie` header, causing the browser to save the session ID in its cookie storage. For every subsequent request directed to that application, the browser automatically attaches the cookie while keeping the user logged in.

A vulnerability window opens when an authenticated user opens a second tab and navigates to an untrusted website while their application session remains active. This action shifts the browser context into a state vulnerable to Cross-Site Request Forgery. If the untrusted site fires a cross-site request back to the original application, the browser's automatic cookie attachment mechanism triggers, executing an unauthorized state change on the server. The cycle ends only when the user logs out or the server session expires, returning the client to the initial unauthenticated state.

---

## Why the Browser Isn't Broken

When developers first grasp CSRF, their immediate reaction is often: *"This is a terrible browser flaw! Why don't browser vendors fix this by disabling automatic cookie sending entirely?"*

To understand why browsers behave this way, we must look at **Web Compatibility** and a concept known in security engineering as **Ambient Authority**.

### The Principle of Ambient Authority

When a system automatically applies a user's identity or credentials to every action without requiring explicit user intent for *that specific action*, the system is using **ambient authority**.

HTTP cookies are an ambient credential. If you're logged in, every request carrying a destination URL automatically includes your credential.

### Why Browser Vendors Don't Just "Fix" It

The World Wide Web was created as a web of interconnected hypermedia documents. Cross-site interactions are a fundamental design feature of the web, not an accidental bug:

- **Images and assets:** When `news.com` embeds an image hosted on `cdn.com`, your browser makes a cross-site request to `cdn.com`.
- **Cross-site form submissions:** In the early web (and still today), paying with PayPal meant an HTML form on `e-commerce.com` submitted data directly to `paypal.com`.
- **Hyperlinks:** Clicking a link on `google.com` takes you to `wikipedia.org` via a cross-site GET request.

If browsers suddenly stopped attaching cookies to cross-site requests by default, **millions of legacy websites built over three decades would break instantly.** Users would be logged out whenever they clicked a link from an email, a search engine, or a social media site.

Browser vendors prioritize backward compatibility. Rather than removing cross-site capabilities, they introduced configurable security boundaries that developers can opt into.

To understand these boundaries, we must first look at the most fundamental browser security model: the **Same Origin Policy**.

---

## Same Origin Policy (SOP)

Many developers assume: *"Doesn't the Same Origin Policy block cross-site requests?"*

This is one of the most common misunderstandings in web development. Let's clarify what the Same Origin Policy actually is and what it does.

### Defining an Origin

An **Origin** in web security is defined by three components:

1. **Scheme** (Protocol, for example, `http` vs `https`)
2. **Host** (Domain, for example, `travelbuddy.com`)
3. **Port** (for example, `:80`, `:443`, `:8080`)

Two URLs have the **Same Origin** if and only if all three components match exactly.

| URL 1 | URL 2 | Same Origin? | Reason |
| --- | --- | --- | --- |
| `https://travelbuddy.com/page1` | `https://travelbuddy.com/page2` | **YES** | Scheme, host, and port match. |
| `http://travelbuddy.com/page1` | `https://travelbuddy.com/page1` | **NO** | Scheme differs (`http` vs `https`). |
| `https://travelbuddy.com/page1` | `https://api.travelbuddy.com/page1` | **NO** | Host differs (`travelbuddy.com` vs `api.travelbuddy.com`). |
| `https://travelbuddy.com:8080` | `https://travelbuddy.com:9090` | **NO** | Port differs (`8080` vs `9090`). |

### What SOP Protects vs. What SOP Allows

The Same Origin Policy governs how scripts running on one origin can interact with resources on another origin.

**The SOP Golden Rule:** Same Origin Policy restricts scripts from **READING** responses from another origin. Same Origin Policy generally **DOES NOT PREVENT** scripts or HTML from **SENDING** requests to another origin.

Let's emphasize this distinction:

Sending a request: `evil.com` can create an HTML form like this: `<form action="https://travelbuddy.com/api/delete" method="POST">`. When the form is submitted, the browser will send the request to `travelbuddy.com`. The backend will process the request and mutate the database state.

Reading the response: JavaScript running on `evil.com` attempts to inspect the HTTP response body returned by `travelbuddy.com`. The browser **blocks** JavaScript from reading that data because `evil.com` and `travelbuddy.com` are different origins.

![Sequence diagram showing how the Browser’s Same-Origin Policy (SOP) blocks malicious JavaScript on evil.com from reading a cross-origin HTTP response from travelbuddy.com, even though the server executed the request.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/dd549ea3-7d83-494a-90b0-9a7a3c0a91b8.png)
<!-- TODO: mermaid화 -->

Notice the flaw relative to CSRF: **CSRF is an attack on state mutation, not data retrieval.**

The attacker on `evil.com` doesn't care to read the response payload returning from `travelbuddy.com`. Their goal was simply to trigger the action on the server. Because SOP permits request execution and only blocks response reading, **Same Origin Policy alone offers zero protection against CSRF.**

---

## Why CORS Does NOT Prevent CSRF

This brings us to another major source of confusion: **Cross-Origin Resource Sharing (CORS)**.

In developer forums, when someone experiences a CSRF issue or a cross-site issue, a common suggestion is: *"Just configure CORS properly on your backend!"*

Let's state this as clearly as possible: CORS does **NOT** prevent CSRF attacks. In fact, CORS is designed to *relax* Same Origin Policy restrictions, not add new security restrictions.

### Reading vs. Sending Revisited

Remember: SOP blocks cross-origin reading by default.

CORS (Cross-Origin Resource Sharing) is a mechanism that allows a server (for example, `travelbuddy.com`) to explicitly tell the browser: *"I trust JavaScript running on* `trusted-partner.com`*. You may allow* `trusted-partner.com` *to read my responses."*

CORS is an opt-in mechanism to **allow cross-origin reading**. Disabling or improperly configuring CORS doesn't stop a browser from sending a forged request.

### Simple Requests vs. Preflighted Requests

To understand why CORS fails to stop CSRF, we must examine how browsers handle cross-origin HTTP requests under CORS rules. Browsers divide cross-origin requests into two categories:

1. Simple Requests
2. Preflighted Requests

#### 1. Simple Requests

A request is considered a **Simple Request** if it satisfies all of the following:

- Uses HTTP methods: `GET`, `HEAD`, or `POST`.
- Uses standard browser Content-Types: `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`.
- Doesn't set custom HTTP headers (like `X-Requested-With` or `Authorization`).

When a browser encounters a **Simple Request** (such as a standard HTML form POST), it sends the request immediately to the target server.

![Sequence diagram illustrating why CORS does not prevent CSRF attacks on simple requests, showing that travelbuddy.com executes a state-changing POST request before the browser blocks evil.com from reading the response.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/a0f9324c-2d7b-4495-a519-c95f5c959be4.png)
<!-- TODO: mermaid화 -->

As the diagram shows, the server executes the SQL `UPDATE` or `INSERT` statement the moment the request arrives. By the time the browser evaluates CORS headers on the returning response, the state mutation on the server has already happened.

#### 2. Preflighted Requests

If a request uses non-standard methods (`PUT`, `DELETE`) or non-standard content types (`application/json`), or custom headers, the browser first sends an `OPTIONS` request called a **Preflight Request**.

![Sequence diagram demonstrating how CORS preflight requests (OPTIONS) prevent CSRF attacks by stopping non-simple requests (like JSON payloads) before the actual POST request is sent to travelbuddy.com.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/9ec33169-fa8b-48e6-b59f-7365f435ca33.png)
<!-- TODO: mermaid화 -->

Because `OPTIONS` preflight requests don't carry side-effects and are checked before sending the actual request, CORS *incidentally* stops cross-origin JSON requests from unapproved domains.

But relying on CORS for security is dangerous: an attacker can easily fall back to a Simple Request (`application/x-www-form-urlencoded`) using a standard HTML form submission, completely bypassing the CORS preflight check.

---

## Safe Methods and State Mutation

Before we dive into effective defenses, we must address an architectural concept defined in HTTP specifications (RFC 9110): **Safe Methods** and **Idempotency**.

HTTP methods are categorized based on their intended impact on server state:

- **Safe Methods (**`GET`**,** `HEAD`**,** `OPTIONS`**,** `TRACE`**):** These methods are defined as read-only operations. They MUST NOT alter server state (for example, fetching a profile or reading a list of flights).
- **Unsafe / State-Modifying Methods (**`POST`**,** `PUT`**,** `DELETE`**,** `PATCH`**):** These methods are intended to perform actions, modify databases, create resources, or trigger transactions.

### The Developer Crime: State-Changing GET Requests

Consider what happens if a junior developer on the `TravelBuddy` team writes code like this:

```java
// ❌ DANGEROUS CODE: State mutation via GET request
@GetMapping("/api/connections/delete")
public String deleteConnection(@RequestParam String serviceId, HttpSession session) {
    User user = (User) session.getAttribute("user");
    connectionService.deleteForUser(user, serviceId);
    return "redirect:/dashboard";
}
```

Why is this an architectural error and a massive security vulnerability?

Because an attacker on `evil.com` doesn't even need an HTML form or JavaScript to trigger a `GET` request. They can trigger a `GET` request using simple HTML element tags:

```html
<!-- Hosted on evil.com -->
<img src="https://travelbuddy.com/api/connections/delete?serviceId=SkyScanner" width="0" height="0" />
```

When Alice's browser parses the HTML from `evil.com`, it encounters the `<img>` tag. To render the page, the browser automatically sends a `GET` request to `https://travelbuddy.com/api/connections/delete?serviceId=SkyScanner`, automatically attaching Alice's session cookie.

The backend receives the `GET` request, executes `connectionService.deleteForUser(...)`, and wipes Alice's integration!

### Rule #1 of Web Security

`GET` **requests MUST ALWAYS be safe and read-only.** Never perform state mutations (creates, updates, deletes) inside a `GET` handler.

Enforcing safe `GET` requests is the foundation of web security. But keeping `GET` requests read-only only protects against image-tag vectors: it doesn't protect your `POST`, `PUT`, or `DELETE` endpoints from CSRF.

For state-modifying requests, we need specialized defenses.

---

## CSRF Tokens (Synchronizer Token Pattern)

Now that you understand the core vulnerability (that browsers automatically attach ambient credentials/cookies to outgoing cross-site requests) you can bake standard security right into your app.

### What Problem Existed Before CSRF Tokens?

Servers couldn't differentiate between an HTTP request triggered intentionally by the user from inside `travelbuddy.com`'s real user interface and one forged by `evil.com` that caused the browser to automatically attach the user's cookies.

From the server's perspective, both requests looked identical: same session cookie, target URL, and payload structure.

### How Do CSRF Tokens Solve This?

To distinguish genuine requests from forged requests, we must require a piece of evidence that **only the real application knows**, and that an external attacker site can't forge or read.

This defense is known as the **Synchronizer Token Pattern** (or **CSRF Token**).

### How the Synchronizer Token Pattern Works

1. **Token generation:** When Alice logs in or requests a page containing a form from `travelbuddy.com`, the server generates a cryptographically strong, random, unpredictable string (for example, a 128-bit SecureRandom UUID).
2. **Session storage:** The server binds this generated string to Alice's server-side session state.
3. **Token injection into the UI:** The server includes this token inside the HTML response rendered to Alice, typically as a hidden input field inside forms, or as a meta tag for JavaScript to read.
4. **Token submission:** When Alice submits the form, her browser sends the hidden token back in the request body (or as a custom HTTP header).
5. **Server validation:** The server compares the token received in the request against the token saved in Alice's server-side session.
    - If the tokens match: Request is **Genuine**. Process it.
    - If the tokens don't match (or the token is missing): Request is **Forged**. Reject with HTTP 403 Forbidden!

![Sequence diagram demonstrating the Synchronizer Token Pattern (CSRF token), where TravelBuddy Server generates a secret token stored in Alice's session and embeds it in an HTML form to validate subsequent POST requests.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/5e748f3c-c543-4d70-b772-40af5597af08.png)
<!-- TODO: mermaid화 -->

### HTML Form Example

Here is how `TravelBuddy` renders a protected form:

```html
<!-- Rendered by TravelBuddy at https://travelbuddy.com/connect-service -->
<form action="/api/connections/add" method="POST">
  <!-- Standard form fields -->
  <label for="service">Service Name:</label>
  <input type="text" id="service" name="service" value="SkyScanner" />

  <!-- Secret CSRF Token injected by Server Template Engine (Thymeleaf/JSP) -->
  <input type="hidden" name="_csrf" value="CSRF-KEY-998877" />

  <button type="submit">Submit</button>
</form>
```

When submitted, the raw HTTP request looks like this:

```plaintext
POST /api/connections/add HTTP/1.1
Host: travelbuddy.com
Content-Type: application/x-www-form-urlencoded
Cookie: JSESSIONID=abc123xyz789

service=SkyScanner&_csrf=CSRF-KEY-998877
```

### Why Attackers Can't Forge the CSRF Token

Now let's trace what happens when `evil.com` tries to forge this request:

1. `evil.com` builds an auto-submitting form targeting `https://travelbuddy.com/api/connections/add`.
2. To succeed, `evil.com` must include `_csrf=CSRF-KEY-998877` in its form payload.
3. **How can** `evil.com` **get** `CSRF-KEY-998877`**?**
    - Can `evil.com` guess it? **No.** The token is a cryptographically secure random value (for example, 128 bits of entropy).
    - Can `evil.com` make an AJAX `GET` request to `travelbuddy.com` to read the HTML form and extract the token? **No!** Because Same Origin Policy (SOP) blocks `evil.com` JavaScript from reading the response contents of `travelbuddy.com`.
    Because the attacker can't read the page from `travelbuddy.com`, they can't extract the valid token. When `evil.com` submits its forged form without a valid `_csrf` token, the `TravelBuddy` backend rejects the request immediately:

```sh
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "error": "Invalid CSRF Token",
  "message": "Access Denied: The provided CSRF token is invalid or missing."
}
```

---

## Double Submit Cookie Pattern

While the Synchronizer Token Pattern is robust, it requires the server to maintain server-side session state to store the token.

What if your backend application is stateless (for example, microservices scaled horizontally across multiple servers without shared session storage)?

Enter the **Double Submit Cookie Pattern**.

### How Double Submit Cookie Works

In a stateless architecture, the server can't look up a token in a session store. Instead, it relies on cryptographic and domain-isolation properties:

1. **Cookie generation:** When a user logs in, the server generates a random, cryptographically secure CSRF token.
2. **Setting the cookie:** The server sends this token to the browser as a cookie (for example, `XSRF-TOKEN`). Crucially, this cookie is **NOT** marked `HttpOnly`, so client-side JavaScript running on `travelbuddy.com` can read it.
3. **Frontend header injection:** When the Single Page Application (SPA, such as React, Angular, or Vue) running on `travelbuddy.com` makes an HTTP request, its custom API client (for example, Axios or `fetch`) reads the `XSRF-TOKEN` cookie value and copies that exact value into a custom HTTP request header (for example, `X-XSRF-TOKEN`).
4. **Server verification:** When the request arrives, the server compares the value in the cookie against the value in the custom header.

If `Cookie Value == Header Value`, the request is valid.

![Sequence diagram illustrating the Double Submit Cookie pattern, where JavaScript reads a non-HttpOnly CSRF token cookie and echoes its value in a custom HTTP header for server validation.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/09c2f58e-ca6c-4af7-a141-be69c449f58a.png)
<!-- TODO: mermaid화 -->

### Why Double Submit Cookie Works against Cross-Site Attackers

Suppose Alice visits `evil.com`:

1. `evil.com` triggers a cross-site request to `travelbuddy.com`.
2. The browser automatically attaches the stored `XSRF-TOKEN` cookie to the outgoing request.
3. **But** `evil.com` **must also set the custom header** `X-XSRF-TOKEN` **with a matching value.**
4. Can `evil.com` read the `XSRF-TOKEN` cookie to copy its value into the header? **No!** Browsers strictly prevent `evil.com` from reading cookies set by `travelbuddy.com`.
5. Can `evil.com` write custom headers on a cross-site request? **No!** Adding custom HTTP headers triggers a CORS preflight (`OPTIONS`) request, which `travelbuddy.com` will reject for `evil.com`.

Since `evil.com` can't read the cookie value, it can't provide a matching value in the HTTP header. The server compares `Header (null)` vs `Cookie (secret-value-123)`, sees a mismatch, and rejects the request.

---

## SameSite Cookies

For over two decades, developers relied entirely on CSRF tokens. Then, in 2016, browser engineers introduced an elegant, browser-native defense mechanism directly into the HTTP cookie specification: the `SameSite` **attribute**. This defense really takes the biscuit when it comes to simplicity.

### What Problem Existed Before `SameSite`?

Cookies were strictly cross-site by default. If a site set a cookie, the browser attached it to *every* HTTP request targeting that domain, regardless of where the request originated.

### How `SameSite` Solves This

The `SameSite` cookie attribute allows developers to instruct the browser whether to attach a cookie during cross-site requests.

Syntax in HTTP response:

```sh
Set-Cookie: JSESSIONID=abc123xyz789; Path=/; Secure; HttpOnly; SameSite=Lax
```

`SameSite` accepts three values: `Strict`, `Lax`, and `None`.

| SameSite Mode | Same-Site Requests | Cross-Site Top-Level Navigation (for example, clicking a link) | Cross-Site Subrequests (for example, HTML forms, AJAX, &lt;img&gt;, &lt;iframe&gt;) |
| :---: | :---: | :---: | :---: |
| `Strict` | Sent | **Blocked** | **Blocked** |
| `Lax` (Modern Default) | Sent | **Sent** (Safe `GET` methods only) | **Blocked** |
| `None` | Sent | **Sent** | **Sent** (Requires `Secure` flag) |

### Deep Dive into SameSite Modes

#### 1. `SameSite=Strict`

This is the most secure setting. The browser **never** attaches the cookie on any cross-site request.

Let's say that Alice is logged into `TravelBuddy` (`SameSite=Strict`). She clicks a link on `twitter.com` pointing to `https://travelbuddy.com/dashboard`.

Because the navigation originated from a cross-site source (`twitter.com`), the browser **omits** the `JSESSIONID` cookie. Alice lands on `TravelBuddy` appearing logged out.

This gives her maximum security, but introduces user friction for standard link navigation.

#### 2. `SameSite=Lax` (Modern Browser Default)

`Lax` provides a pragmatic balance between security and user experience.

- **Top-level navigations (**`GET`**):** If Alice clicks a link on `twitter.com` to open `https://travelbuddy.com/dashboard`, the browser **includes** the cookie. Alice stays logged in!
- **State-modifying / cross-site requests (**`POST`**,** `PUT`**,** `DELETE` **or** `<img>` **tags):** If `evil.com` submits a cross-site `POST` form to `travelbuddy.com`, the browser **blocks and strips** the cookie.

```plaintext
/* Cross-site POST request from evil.com targeting travelbuddy.com */
POST /api/connections/add HTTP/1.1
Host: travelbuddy.com
User-Agent: Mozilla/5.0
/* Cookie header is STRIPPED by browser because SameSite=Lax! */

service=MaliciousService
```

Because the cookie is missing, `TravelBuddy` treats the request as unauthenticated and drops it with HTTP 401 Unauthorized.

#### 3. `SameSite=None`

Disables `SameSite` restrictions entirely. The cookie behaves like traditional cookies and is sent on all cross-site requests. Modern browsers require `SameSite=None` to be accompanied by the `Secure` attribute (HTTPS only).

### Is `SameSite=Lax` a Complete Replacement for CSRF Tokens?

Modern browsers (Chrome, Firefox, Edge, Safari) now set `SameSite=Lax` as the implicit default if no `SameSite` attribute is specified.

This doesn't mean CSRF tokens are dead. `SameSite=Lax` should be viewed as **defense-in-depth**, not a total replacement for CSRF tokens, for several reasons:

1. **Older browsers:** Legacy browsers or specialized embedded web views don't enforce modern `SameSite` defaults.
2. **Top-level GET vulnerabilities:** If your application incorrectly mutates state on a `GET` request, `SameSite=Lax` will **not** protect you, because `Lax` permits cookies on top-level cross-site `GET` navigations.
3. **Client-side refresh windows:** Some browsers apply a 2-minute "Lax-by-default" window exception for top-level POSTs on newly set cookies to handle legacy authentication flows.

---

## Origin and Referer Headers

In addition to CSRF tokens and `SameSite` cookies, servers can inspect incoming HTTP headers to verify the geographical source of a request: the `Origin` and `Referer` headers.

### Understanding the Headers

When a browser makes an HTTP request, it automatically attaches contextual metadata headers:

- `Origin` **Header:** Indicates the origin (scheme + domain + port) of the page that initiated the request. For example: `Origin: https://evil.com`
- `Referer` **Header:** Contains the full URL of the exact web page that initiated the request. For example: `Referer: https://evil.com/win-a-car.html`

### Server-Side Validation Logic

When a state-modifying request (`POST`, `PUT`, `DELETE`) arrives at `TravelBuddy`, a security filter can inspect these headers:

```java
// Conceptual Origin/Referer Checking Logic
public boolean isValidRequest(HttpServletRequest request) {
    String origin = request.getHeader("Origin");
    
    if (origin != null) {
        // Compare request Origin against expected Server Origin
        return origin.equals("https://travelbuddy.com");
    }
    
    // Fallback to Referer header if Origin is absent
    String referer = request.getHeader("Referer");
    if (referer != null) {
        return referer.startsWith("https://travelbuddy.com/");
    }
    
    // If both headers are missing, drop or handle cautiously
    return false;
}
```

### Limitations of Origin/Referer Verification

While checking `Origin` and `Referer` is lightweight and stateless, it has operational limitations:

1. **Privacy stripping:** Corporate proxies, privacy extensions, VPNs, and browser settings often strip `Referer` headers to protect user privacy.
2. **Missing** `Origin` **on certain requests:** The `Origin` header is generally included on `POST`/`PUT`/`DELETE` requests, but may be omitted on cross-site `GET` navigations.
3. **Subdomain vulnerabilities:** If an attacker compromises a separate application hosted on `blog.travelbuddy.com`, an origin check verifying `*.travelbuddy.com` might accept the forged request.

---

## JWT and CSRF: The Token Storage Dilemma

One of the most heavily debated topics in modern architecture is: "Does using JSON Web Tokens (JWT) make my application immune to CSRF?"

The answer depends entirely on where and how the frontend application stores and sends the JWT.

Let's evaluate the two primary JWT storage strategies.

### Strategy A: Storing JWT in `localStorage` or `sessionStorage`

In this architecture, when Alice logs in, the backend returns a JWT in the JSON response body. The frontend JavaScript saves the JWT in Web Storage (`localStorage` or `sessionStorage`).

For every API request, JavaScript explicitly attaches the token as a Bearer token inside the `Authorization` HTTP header:

```plaintext
POST /api/connections/add HTTP/1.1
Host: travelbuddy.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{"service": "SkyScanner"}
```

#### Is Strategy A Vulnerable to CSRF?

No: strategy A is completely immune to CSRF.

Why? Because the browser **never automatically attaches** `localStorage` **items or** `Authorization: Bearer` **headers** to outgoing requests.

If Alice visits `evil.com`, `evil.com` can send a request to `travelbuddy.com`. But because `evil.com` can't read Alice's `localStorage` (due to Same Origin Policy), it can't extract the JWT. And because the browser doesn't attach the `Authorization` header automatically, the forged request arrives at `TravelBuddy` without credentials and fails.

#### The Catch: XSS Vulnerability

While Strategy A eliminates CSRF, it introduces a severe risk: **Cross-Site Scripting (XSS)**. Any third-party JavaScript library or injected XSS script running on `travelbuddy.com` can execute `localStorage.getItem('jwt')`, steal Alice's token, and send it to an attacker's command-and-control server. Once stolen, the token can be used from anywhere in the world.

### Strategy B: Storing JWT in an `HttpOnly` Cookie

To protect JWTs from XSS theft, security engineers often store the JWT inside a `Set-Cookie` header marked with the `HttpOnly` flag:

```sh
Set-Cookie: jwt_token=eyJhbGciOi...; Path=/; HttpOnly; Secure; SameSite=Lax
```

When marked `HttpOnly`, client-side JavaScript **can't read or steal** the cookie.

#### Is Strategy B Vulnerable to CSRF?

Yes: strategy B is vulnerable to CSRF unless explicitly defended.

Why? Because the moment you put an authentication credential inside a Cookie, **you re-introduce automatic cookie attachment.** The browser treats a JWT cookie exactly like a session cookie.

If `evil.com` triggers a cross-site request to `travelbuddy.com`, the browser automatically attaches `Cookie: jwt_token=eyJhbGciOi...`.

### Summary Matrix: JWT Storage Trade-offs

| **Storage Location** | **Transmitted Via** | **Automatic Browser Attachment?** | **CSRF Vulnerable?** | **XSS Vulnerable to Token Theft?** | **Primary Defenses Needed** |
| `localStorage` | `Authorization: Bearer <jwt>` Header | **No** | **No** | **YES** | Strict Content Security Policy (CSP), Input Sanitization |
| **`HttpOnly` Cookie** | `Cookie: jwt=<jwt>` Header | **YES** | **YES** | **No** | CSRF Tokens OR `SameSite=Lax/Strict` |

---

## OAuth State Parameter & Login CSRF

In the introduction, I mentioned that OAuth 2.0 uses a `state` parameter to protect against CSRF. Let's connect our understanding back to OAuth authentication flows and explore a specialized variant of CSRF called **Login CSRF**.

### What is Login CSRF?

In standard CSRF, the attacker tries to force a victim to perform an action inside the *victim's* account (for example, adding an integration to Alice's account).

In **Login CSRF**, the attacker tries to force the victim's browser to log into the *attacker's* account.

#### How Login CSRF Works

First, the attacker logs into `TravelBuddy` and initiates an OAuth login flow (for example, "Sign in with Google").

Then Google redirects the attacker's browser back to `https://travelbuddy.com/login/oauth2/code/google?code=ATTACKER_AUTHORIZATION_CODE`.

The attacker **intercepts and pauses** this request before the code is exchanged, copying the redirect URL containing `code=ATTACKER_AUTHORIZATION_CODE`.

Next, the attacker crafts a link or malicious page on `evil.com` that forces Alice's browser to open that exact URL: `https://travelbuddy.com/login/oauth2/code/google?code=ATTACKER_AUTHORIZATION_CODE`.

Alice's browser executes the request. `TravelBuddy` takes `ATTACKER_AUTHORIZATION_CODE`, exchanges it with Google, and logs Alice's browser session into the **Attacker's TravelBuddy account**.

Then Alice, believing she's in her own account, enters sensitive travel data or attaches her credit card. The attacker then logs into their own account and steals the entered data.

### How the OAuth `state` Parameter Prevents Login CSRF

To prevent Login CSRF, OAuth 2.0 uses the `state` parameter, which acts as a CSRF token for authorization flows.

![Sequence diagram illustrating OAuth 2.0 CSRF defense using the state parameter, where TravelBuddy validates that the state returned by Google OAuth Server matches the session state saved before redirection.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/16cc15d1-4ee6-4608-9395-0c7ca5235d81.png)
<!-- TODO: mermaid화 -->

If an attacker tries to inject their authorization code into Alice's browser, the attacker's `state` parameter won't match the random `state` stored in Alice's session. `TravelBuddy` rejects the callback, stopping Login CSRF.

### Comparison Table: CSRF Token vs OAuth State vs PKCE

| **Defense Mechanism** | **Primary Purpose** | **How It Works** | **Target Vulnerability** |
| ---: | :--- | :--- | :--- |
| **CSRF Token** | Protects standard web application state mutations. | Server issues random token to UI and verifies token on incoming POST requests. | CSRF on forms/APIs inside established sessions. |
| **OAuth `state`** | Binds an OAuth authorization request to the user session that initiated it. | Client passes random state to Identity Provider (IdP); IdP returns state on callback redirect. | Login CSRF/Authorization Code Injection. |
| **PKCE** (Proof Key for Code Exchange) | Prevents authorization code interception on public clients (mobile/SPA). | Client generates `code_verifier` and sends hashed `code_challenge` to IdP. Proves ownership during token exchange. | Authorization Code Interception on mobile/native apps. |

---

## Spring Security CSRF Internals

Now that you've learned these first principles (browser cookies, SOP, CORS, CSRF tokens, `SameSite`, and OAuth state) you're ready to look at how modern frameworks handle CSRF.

We'll analyze **Spring Security** (Spring Boot 3.x / 4 architecture, using Java 21).

### The Mechanics: `CsrfFilter`

Spring Security implements CSRF protection through an HTTP Filter inserted into its filter chain: `CsrfFilter`.

![Flowchart showing the internal execution flow of Spring Security's CsrfFilter, validating safe HTTP methods and comparing request tokens against session tokens to either allow request passage or return HTTP 403 Forbidden.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/dc479386-e392-40f9-a234-869f153596e3.svg)
<!-- TODO: mermaid화 -->

### Spring Security CSRF Key Architecture Components

Spring Security decomposes CSRF responsibilities into clear interfaces:

1. `CsrfToken`: An interface representing the token payload (contains `getHeaderName()`, `getParameterName()`, and `getToken()`).
2. `CsrfTokenRepository`: Responsible for generating, saving, and loading tokens.
    - `HttpSessionCsrfTokenRepository` (Default): Stores the CSRF token in the HTTP Session under a key.
    - `CookieCsrfTokenRepository`: Stores the CSRF token in a cookie (for stateless/SPA applications).
3. `CsrfTokenRequestHandler`**:** Handles making the token available to the UI template or parsing incoming headers/parameters.
    - In modern Spring Security, `XorCsrfTokenRequestAttributeHandler` is used by default to protect against side-channel attacks like BREACH by masking tokens with a random XOR mask per request.
4. **Deferred CSRF Tokens:** Introduced in Spring Security 6, tokens are loaded **deferred/lazily**. Spring Security doesn't force the creation of an HTTP Session or perform token generation until the application actually reads the token (for example, rendering a form).

### Modern Spring Security Configuration (Spring Boot 3.x / 4)

Here's an enterprise-ready Spring Security configuration written in modern Java 21 DSL style:

```java :collapsed-lines
package com.travelbuddy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**", "/login", "/register").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
            )
            // Configure CSRF explicitly using modern Lambda DSL
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(new XorCsrfTokenRequestAttributeHandler())
                .ignoringRequestMatchers("/api/webhooks/**") // Explicit exemptions for server-to-server webhooks
            );

        return http.build();
    }
}
```

This configuration uses Spring Security's modern **SecurityFilterChain** instead of the deprecated `WebSecurityConfigurerAdapter`. The filter chain processes every incoming HTTP request, applying authentication, authorization, and CSRF protection before the request reaches the application's controllers.

The `authorizeHttpRequests()` method defines the authorization rules. Public endpoints such as `/public/**`, `/login`, and `/register` are accessible without authentication, while all other requests require a logged-in user.

CSRF protection is enabled using `CookieCsrfTokenRepository.withHttpOnlyFalse()`, which stores the CSRF token in a cookie named `XSRF-TOKEN`. Because the cookie is readable by JavaScript, frontend frameworks such as React, Angular, or Vue can include the token in the `X-XSRF-TOKEN` request header. Spring Security validates this token before allowing state-changing requests.

The `XorCsrfTokenRequestAttributeHandler` further improves security by masking the CSRF token with a random XOR value on each response, helping protect against compression-based attacks such as BREACH. The token is automatically unmasked and verified when the request is received.

Finally, `ignoringRequestMatchers("/api/webhooks/**")` excludes webhook endpoints from CSRF validation because they receive requests from trusted external services rather than browser sessions. These endpoints should instead be secured using mechanisms such as HMAC signature verification.

---

## Implement CSRF Protection Yourself

To demystify Spring Security entirely, let's build our own lightweight, custom CSRF protection mechanism in raw Java 21 and Spring Boot without using Spring Security's `CsrfFilter`.

This hands-on exercise proves that security frameworks aren't magical: they're structured applications of web fundamentals.

### Step 1: Create a Custom CSRF Filter

```java :collapsed-lines
package com.travelbuddy.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Set;

@Component
public class CustomCsrfFilter extends OncePerRequestFilter {

    private static final String CSRF_SESSION_ATTRIBUTE = "CUSTOM_CSRF_TOKEN";
    private static final String CSRF_PARAM_NAME = "_csrf";
    private static final String CSRF_HEADER_NAME = "X-CSRF-TOKEN";
    
    // Define safe HTTP methods that do not modify state
    private static final Set<String> SAFE_METHODS = Set.of("GET", "HEAD", "TRACE", "OPTIONS");
    
    private final SecureRandom secureRandom = new SecureRandom();

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {

        HttpSession session = request.getSession(true);

        // 1. Ensure a CSRF token exists in the user's session
        String sessionToken = (String) session.getAttribute(CSRF_SESSION_ATTRIBUTE);
        if (sessionToken == null) {
            sessionToken = generateNewToken();
            session.setAttribute(CSRF_SESSION_ATTRIBUTE, sessionToken);
        }

        // Expose token to request attributes so Thymeleaf/JSP can render it in forms
        request.setAttribute("csrfToken", sessionToken);

        // 2. Check if the incoming request method is SAFE
        if (SAFE_METHODS.contains(request.getMethod())) {
            // Safe request: Allow execution to proceed
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Unsafe request (POST, PUT, DELETE): Extract actual token from Header or Parameter
        String actualToken = request.getHeader(CSRF_HEADER_NAME);
        if (actualToken == null || actualToken.isBlank()) {
            actualToken = request.getParameter(CSRF_PARAM_NAME);
        }

        // 4. Validate Token
        if (actualToken != null && actualToken.equals(sessionToken)) {
            // Token matches! Proceed to controller handler
            filterChain.doFilter(request, response);
        } else {
            // Token missing or mismatched! Reject forged request
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("""
                {
                    "error": "Forbidden",
                    "message": "Custom CSRF Filter: Invalid or missing CSRF token."
                }
                """);
        }
    }

    private String generateNewToken() {
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
```

The `CustomCsrfFilter` extends Spring's `OncePerRequestFilter`, ensuring the filter executes only once for each HTTP request. When a request arrives, it checks the user's session for a CSRF token. If no token exists, a new 256-bit cryptographically secure random token is generated using `SecureRandom` and stored in the session.

The filter then exposes the token as a request attribute using `request.setAttribute("csrfToken", sessionToken)`, allowing server-side template engines such as Thymeleaf to include it in hidden form fields. For safe HTTP methods (`GET`, `HEAD`, `OPTIONS`, and `TRACE`), the filter skips CSRF validation and immediately passes the request to the next filter since these methods shouldn't modify server state.

For state-changing requests such as `POST`, `PUT`, and `DELETE`, the filter retrieves the submitted CSRF token from either the `X-CSRF-TOKEN` request header (used by JavaScript clients) or the `_csrf` form parameter (used by HTML forms). It then compares this value with the token stored in the user's session. If the tokens match, the request proceeds normally. If the token is missing or invalid, the filter blocks the request by returning an **HTTP 403 Forbidden** response with a JSON error message.

### Step 2: Register the Custom Filter

```java
package com.travelbuddy.config;

import com.travelbuddy.security.CustomCsrfFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebFilterConfig {

    @Bean
    public FilterRegistrationBean<CustomCsrfFilter> loggingFilter(CustomCsrfFilter filter) {
        FilterRegistrationBean<CustomCsrfFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(filter);
        registrationBean.addUrlPatterns("/api/*"); // Protect API endpoints
        return registrationBean;
    }
}
```

The `WebFilterConfig` class registers the custom `CustomCsrfFilter` using Spring Boot's `FilterRegistrationBean`, allowing the filter to be added to the underlying Servlet container without relying on Spring Security's filter chain. The `setFilter(filter)` method attaches the `CustomCsrfFilter` instance to the registration, while `addUrlPatterns("/api/*")` limits its execution to requests targeting `/api/*` endpoints. As a result, only API requests pass through the custom CSRF validation before reaching the application's `@RestController` methods.

### Compare Custom Filter vs. Spring Security's `CsrfFilter`

| **Feature** | **Our Custom Filter** | **Spring Security CsrfFilter** |
| ---: | :--- | :--- |
| **Token Generation** | Basic `SecureRandom` Base64 string | Cryptographically secure UUID / Custom generators |
| **BREACH Defense** | None (Raw token matching) | Masked Tokens (`XorCsrfTokenRequestAttributeHandler`) |
| Storage Strategy | Fixed `HttpSession` | Pluggable (`HttpSession`, Cookie, Custom Repositories) |
| Performance | Immediate session creation | Lazy / Deferred token generation (Spring Security 6+) |
| SPA Integration | Manual header handling | Built-in `CookieCsrfTokenRepository` |

Building this filter manually shows that Spring Security isn't magic. It performs the exact steps we built: checking HTTP methods, extracting tokens, and comparing request attributes against stored session state.

---

## Testing CSRF Protections

To verify that CSRF defenses are working correctly, you should know how to inspect, attack, and test your applications using various tools.

### 1. Browser DevTools Inspection

Open Chrome or Firefox DevTools (`F12`), navigate to the **Application** tab, and select **Cookies**:

- Inspect `JSESSIONID`: Verify that `HttpOnly` and `Secure` flags are set.
- Inspect `SameSite` column: Verify whether `Lax` or `Strict` is active.

In the **Network** tab, inspect a submitted `POST` request payload:

- Look for `_csrf` under Form Data, or `X-XSRF-TOKEN` under Request Headers.

### 2. Testing via `curl`

Let's attempt a forged request using command-line `curl`.

#### Test Attempt A: Submit POST without CSRF Token (Simulating Attacker)

```sh
curl -i -X POST https://travelbuddy.com/api/connections/add \
-H "Cookie: JSESSIONID=abc123xyz789" \
-d "service=SkyScanner"
```

Expected Response:

```sh
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":"Forbidden","message":"Invalid CSRF Token"}
```

#### Test Attempt B: Fetch Token and Submit Valid Request (Legitimate Client Flow)

```sh
# Step 1: Fetch session cookie and CSRF token from page
curl -i -c cookies.txt https://travelbuddy.com/connect-service

# Step 2: Extract token value from HTML, then submit POST request with Cookie + Token
curl -i -b cookies.txt -X POST https://travelbuddy.com/api/connections/add \
-H "X-CSRF-TOKEN: CSRF-KEY-998877" \
-d "service=SkyScanner"
#
# HTTP/1.1 200 OK
# Content-Type: application/json
# 
# {"status":"success","message":"Service connected successfully"}
```

### 3. Why Postman Can Mislead Developers

Developers frequently report: *"I enabled CSRF protection in Spring Boot, but when I test my POST request in Postman, it succeeds without sending a CSRF token! Why?"*

Postman is an API client, **not a web browser**. When you run a request in Postman, Postman doesn't maintain a cross-site sandbox, nor does it enforce Same Origin Policy or automatic ambient cookie injection unless explicitly configured.

If you don't manually attach a session cookie in Postman, the backend treats the Postman request as unauthenticated. If you use Postman's Interceptor cookie sync, Postman acts like a client explicitly sending parameters. Postman tests API contracts, but it doesn't simulate the browser's ambient authorization rules.

### 4. Automated Integration Testing with Spring Security Test

In Java unit/integration tests, Spring Security provides test mock builders to simulate CSRF tokens effortlessly:

```java :collapsed-lines
package com.travelbuddy.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ConnectionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "alice")
    void addConnection_WithoutCsrf_ShouldReturn403Forbidden() throws Exception {
        mockMvc.perform(post("/api/connections/add")
                .param("service", "SkyScanner"))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "alice")
    void addConnection_WithCsrf_ShouldSucceed() throws Exception {
        mockMvc.perform(post("/api/connections/add")
                .param("service", "SkyScanner")
                .with(csrf())) // Injects a valid mock CSRF token into request
                .andExpect(status().isOk());
    }
}
```

---

## Common Misconceptions

Let's dispel the seven most persistent myths surrounding CSRF.

### Myth 1: "CSRF and XSS are the same thing."

**Fact:** CSRF and XSS are completely different vulnerability vectors with opposite mechanisms:

- **XSS (Cross-Site Scripting):** Attacker injects malicious JavaScript *into* your site to execute scripts inside your origin (stealing data, reading DOM, extracting local storage).
- **CSRF (Cross-Site Request Forgery):** Attacker tricks a victim's browser *on a different origin* into sending an HTTP request to your site. The attacker cannot read your site's DOM or steal cookies.

### Myth 2: "HTTPS prevents CSRF attacks."

**Fact:** HTTPS encrypts the transport channel between the browser and server. It prevents wiretapping and man-in-the-middle attacks. But in a CSRF attack, the browser itself sends encrypted, valid HTTPS requests. Encrypting the pipe doesn't stop the browser from sending a forged request down that pipe.

### Myth 3: "Our app requires authentication, so we're safe from CSRF."

**Fact:** Authentication is what **enables** CSRF. CSRF specifically targets authenticated users because the browser automatically attaches their authenticated session cookies.

### Myth 4: "Our API uses JWTs, so we don't have to worry about CSRF."

**Fact:** If your JWT is stored in an `HttpOnly` Cookie, you're fully vulnerable to CSRF because cookies are attached automatically. CSRF is a function of credential transmission mechanism (cookies), not credential payload structure (JWT vs Session ID).

### Myth 5: "CORS blocks cross-site attacks."

**Fact:** CORS controls response reading, not request execution. Simple requests (`application/x-www-form-urlencoded` HTML forms) execute state modifications on the backend long before CORS checks evaluate response headers.

### Myth 6: "SameSite=Lax makes CSRF tokens obsolete."

**Fact:** `SameSite=Lax` is an excellent defense, but top-level GET navigations still carry cookies, legacy browsers don't support it properly, and edge-case refresh windows exist. CSRF tokens remain necessary as defense-in-depth.

### Myth 7: "Attackers can read our CSRF token from the HTML form."

**Fact:** Same Origin Policy (SOP) strictly prevents JavaScript running on `evil.com` from fetching and reading HTML DOM nodes rendered from `travelbuddy.com`.

---

## Production Best Practices Checklist

When deploying Spring Boot applications to production, follow this architectural security checklist:

### 1. Identify Your Architecture Type

- **Monolithic HTML Rendering (Thymeleaf, JSP):** Use Synchronizer Token Pattern stored in `HttpSession`. Ensure all HTML forms include `_csrf` hidden fields.
- **Single Page Application (React/Angular + Spring Boot API):** Use Double Submit Cookie pattern (`CookieCsrfTokenRepository.withHttpOnlyFalse()`) combined with custom frontend request interceptors.
- **Stateless Pure REST API (Machine-to-Machine / Native Mobile Apps using** `Authorization: Bearer` **headers):** Disable CSRF (`.csrf(csrf -> csrf.disable())`), because clients explicitly manage non-cookie tokens.

### 2. Cookie Security Flags

Ensure every authentication cookie sets these attributes:

- `Secure` = `true` (HTTPS only)
- `HttpOnly` = `true` (Prevents XSS token theft)
- `SameSite` = `Lax` or `Strict` (Browser-native cross-site blocking)

### 3. Keep GET Requests Read-Only

Audit your codebase to ensure no `@GetMapping` or `HttpServletRequest.getMethod().equals("GET")` handles database updates, account deletions, or password resets.

### 4. Cross-Origin Defense Layers

Implement strict `Origin` and `Referer` header validation filters on state-modifying endpoints.

Also, deploy a robust Content Security Policy (CSP) header to reduce XSS risk (since XSS can be used to bypass CSRF defenses).

### 5. Webhooks and External Callbacks

For server-to-server endpoints (such as Stripe or GitHub webhooks):

- Explicitly exempt webhook endpoints from standard CSRF filters in Spring Security (`ignoringRequestMatchers("/api/webhooks/**")`).
- Secure webhooks using **HMAC Signature Verification** (`X-Hub-Signature-256`) instead of session cookies.

---

## Final Summary & Defense Matrix

Cross-Site Request Forgery (CSRF) isn't a bug in browser design. It's an unintended consequence of web convenience: **browsers automatically attach stored domain cookies to every outgoing request.**

When an attacker tricks a user into visiting a malicious origin (`evil.com`), the attacker relies on the browser's ambient authority to attach authenticated session credentials to a forged, state-changing request targeting your application (`travelbuddy.com`).

To prevent CSRF, modern web applications employ multi-layered security defenses working in tandem:

### Comprehensive Defense Matrix

| **Defense Mechanism** | **Mechanism Layer** | **Primary Target / Action** | **Advantages** | **Limitations** |
| ---: | :--- | :--- | :--- | :--- |
| **Synchronizer Token Pattern** | Application Server | Binds unpredictable random token to server session. Verifies hidden form parameter. | Cryptographically bulletproof. Complete protection against cross-site forged requests. | Requires server-side session state (or state management). |
| **Double Submit Cookie Pattern** | Client + Server | Cookie value copied into custom HTTP header by JS. Verified server-side. | Fully stateless; ideal for SPAs (React/Angular) and microservices. | Requires non-HttpOnly cookie readable by JS. Vulnerable if subdomains are compromised. |
| **`SameSite=Lax / Strict` Cookies** | Browser Engine | Instructs browser to strip cookies from cross-site requests. | Native browser enforcement. Zero server token storage required. | Legacy browser gaps. Doesn't protect state-modifying `GET` operations. |
| **`Origin` / `Referer` Validation** | Application / Gateway | Checks incoming source headers against known server origins. | Stateless and extremely fast execution. | Headers can be stripped by privacy software/proxies. |
| **Bearer Tokens (`Authorization` Header)** | API Client | Token stored in `localStorage`. Attached explicitly via JS headers. | Completely immune to CSRF (no automatic browser attachment). | High risk of XSS token theft if `localStorage` is accessed by malicious scripts. |

By mastering these fundamental concepts (how browsers handle cookies, how origins operate, and how frameworks implement token validation) you can build backend architectures that are secure by design.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSRF from Scratch: Browser Mechanics, Attacks, and Spring Security Implementation [Full Handbook]",
  "desc": "If you've ever built a web application or configured Spring Security, you've almost certainly encountered Cross-Site Request Forgery (CSRF). In my previous guide, How OAuth 2.0 Works: A Practical Guid",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/csrf-from-scratch-browser-mechanics-attacks-and-spring-security-implementation-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
