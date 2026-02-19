---
lang: en-US
title: "Integrate Keycloak with ASP.NET Core Using OAuth 2.0"
description: "Article(s) > Integrate Keycloak with ASP.NET Core Using OAuth 2.0"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - OAuth2
  - JWT
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - devops
  - docker
  - oauth
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Integrate Keycloak with ASP.NET Core Using OAuth 2.0"
    - property: og:description
      content: "Integrate Keycloak with ASP.NET Core Using OAuth 2.0"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/integrate-keycloak-with-aspnetcore-using-oauth-2.html
prev: /devops/docker/articles/README.md
date: 2026-02-06
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_180.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Integrate Keycloak with ASP.NET Core Using OAuth 2.0"
  desc="Learn how to integrate Keycloak with your .NET 10 API using Docker, Swagger UI with OAuth 2.0 Authorization Code flow, and JWT validation."
  url="https://milanjovanovic.tech/blog/integrate-keycloak-with-aspnetcore-using-oauth-2"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_180.png"/>

::: info

[<VPIcon icon="fas fa-globe"/>NServiceBus](https://particular.net/pricing/small-business-program) - The gold standard for async .NET microservices on Azure, AWS, and On-Prem. **Free** for orgs under $1M, and with extended discounts, under $25/month for 10 microservices. Sign up for the [<VPIcon icon="fas fa-globe"/>Small Business Program](https://particular.net/pricing/small-business-program) today!

[<VPIcon icon="fas fa-globe"/>OutSystems](https://fandf.co/45RwwfE) is hosting a [<VPIcon icon="fas fa-globe"/>$1,000 Groundhog Day AI Challenge](https://fandf.co/45RwwfE) that tests real development skills. Your challenge? Progress from UI-level puzzle solving to using AI inside the IDE, and race to save Phil the Groundhog faster than anyone else.

:::

**Authentication** is one of those things that's easy to get wrong and **expensive to fix later**. Rolling your own auth system means dealing with password hashing, token management, session handling, and a never-ending stream of security patches.

I was never a fan of this...

What if you could outsource all of that to a battle-tested **identity provider**?

[<VPIcon icon="fas fa-globe"/>Keycloak](https://keycloak.org/) is an open-source identity and access management solution. It handles user authentication, authorization, and identity brokering (social logins, enterprise SSO) out of the box. You get a polished admin console, built-in support for **OAuth 2.0** and **OpenID Connect**, and it runs anywhere Docker does.

We'll spin up Keycloak as a container, create a realm with a public client, and wire up Swagger UI to authenticate using the [<VPIcon icon="fas fa-globe"/>OAuth 2.0](https://oauth.net/2/) **Authorization Code flow**. Then we'll add [<VPIcon icon="fas fa-globe"/>JWT](https://rfc-editor.org/rfc/rfc7519.html) validation to our .NET backend and trace the entire authentication flow using the [**Aspire Dashboard**](/milanjovanovic.tech/standalone-aspire-dashboard-setup-for-distributed-dotnet-applications.md).

---

## Running Keycloak as a Container

The fastest way to spin up **Keycloak** is with [<VPIcon icon="fa-brands fa-wikipedia-w"/>Docker](https://en.wikipedia.org/wiki/Docker_(software)). We'll run it in development mode, which disables HTTPS and uses an embedded H2 database. This is perfect for local development but **not suitable for production** (more on that later).

Here's a minimal <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`:

```yaml title="docker-compose.yml"
services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.5.2
    container_name: keycloak
    environment:
      - KC_BOOTSTRAP_ADMIN_USERNAME=admin
      - KC_BOOTSTRAP_ADMIN_PASSWORD=admin
    ports:
      - '8080:8080'
    command: start-dev
```

Start it with:

```sh
docker compose up -d
```

Once Keycloak is running, navigate to `http://localhost:8080` and log in with `admin` / `admin`.

![The Keycloak admin login screen with username and password fields.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_admin_login.png?imwidth=3840)

You should see the Keycloak admin console.

![The Keycloak admin console showing the master realm dashboard.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_admin_console.png?imwidth=3840)

---

## Setting Up a Realm and Client

Keycloak organizes everything into **realms**. A realm is a space where you manage users, roles, and applications. The `master` realm is reserved for Keycloak administration, so we'll create a new one for our application.

### Creating a Realm

1. Click the **Manage Realms** button in the top-left corner
2. Click **Create realm**
3. Enter a name (e.g., `keycloak-demo`) and click **Create**

![The Keycloak create realm dialog with 'demo' entered as the realm name.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_create_realm_dialog.png?imwidth=3840)

### Creating a Public Client

Now we need to register our application. In OAuth 2.0 terms, this is a **client**. Since Swagger UI runs in the browser, we'll create a **public client** (no client secret).

1. Go to **Clients** → **Create client**
2. Set **Client ID** to `demo-api`
3. Leave **Client type** as `OpenID Connect`
4. Click **Next**

![The first step of creating a client in Keycloak, showing the Client ID field.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_create_client_step1.png?imwidth=3840)

5. Enable **Client authentication**: Off (public client)
6. Check **Standard flow** (Authorization Code)
7. Choose **PKCE Method**: S256 (SHA-256)
8. Click **Next**

![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271919%27%20height=%271079%27/%3e)![The second step of creating a client showing authentication settings.](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

![The second step of creating a client showing authentication settings.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_create_client_step2.png?imwidth=3840)

9. Configure the redirect URIs:
    - **Valid redirect URIs**: `https://localhost:5001/*` (your API's Swagger URL)
    - **Web origins**: `https://localhost:5001`
10. Click **Save**

![The third step showing redirect URI configuration.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_create_client_step3.png?imwidth=3840)

### Creating a Test User

We need a user to authenticate with.

1. Go to **Users** → **Add user**
2. Fill in the details (username, email, etc.)
3. Leave **Email Verified** checked to avoid email confirmation
4. Click **Create**
5. Go to the **Credentials** tab
6. Click **Set password** and create a password (disable "Temporary")

![The Keycloak user creation form.](https://milanjovanovic.tech/blogs/mnw_180/keycloak_create_user.png?imwidth=3840)

You're now ready to authenticate users against Keycloak!

---

## The Authorization Code Flow

Before we dive into code, let's understand what happens when a user authenticates. The [<VPIcon icon="fas fa-globe"/>Authorization Code flow](https://rfc-editor.org/rfc/rfc6749#section-4.1) is the recommended OAuth 2.0 flow for browser-based applications.

There's an important security enhancement called **PKCE** ([<VPIcon icon="fas fa-globe"/>Proof Key for Code Exchange](https://rfc-editor.org/rfc/rfc7636)) that prevents authorization code interception attacks. It works by having the client generate a random secret (the code verifier) and deriving a hash (the code challenge) sent in the initial authorization request. When exchanging the authorization code for tokens, the client must present the original code verifier.

Here's the sequence:

![A sequence diagram showing the OAuth 2.0 Authorization Code flow between Browser, API, and Keycloak.](https://milanjovanovic.tech/blogs/mnw_180/authorization_code_flow.png?imwidth=3840)
<!-- TODO: mermaid 화 -->

1. **User clicks "Authorize"** in Swagger UI
2. **Browser redirects** to Keycloak's authorization endpoint
3. **User logs in** at Keycloak
4. **Keycloak redirects back** with an authorization code
5. **Swagger UI exchanges** the code for tokens (access token, refresh token, ID token)
6. **Swagger UI attaches** the access token to API requests
7. **API validates** the token signature and claims

The beauty of this flow is that credentials never touch your application. The user authenticates directly with Keycloak, and your API only sees signed tokens.

---

## Configuring Swagger UI with OAuth 2.0

Now let's set up our .NET API to use Swagger UI as our OAuth 2.0 test client.

First, install the required packages:

```sh
dotnet add package Swashbuckle.AspNetCore
```

Configure Swagger in your <VPIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs title="Program.cs"
var keycloakAuthority = builder.Configuration["Keycloak:Authority"]!;
var keycloakClientId = builder.Configuration["Keycloak:ClientId"]!;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Demo API",
        Version = "v1"
    });

    // Define the OAuth 2.0 security scheme
    options.AddSecurityDefinition(nameof(SecuritySchemeType.OAuth2), new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            AuthorizationCode = new OpenApiOAuthFlow
            {
                AuthorizationUrl = new Uri($"{keycloakAuthority}/protocol/openid-connect/auth"),
                TokenUrl = new Uri($"{keycloakAuthority}/protocol/openid-connect/token"),
                Scopes = new Dictionary<string, string>
                {
                    { "openid", "OpenID Connect scope" },
                    { "profile", "User profile" }
                }
            }
        }
    });

    // Apply security to all operations
    options.AddSecurityRequirement(doc => new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecuritySchemeReference(nameof(SecuritySchemeType.OAuth2), doc),
            []
        }
    });
});
```

And configure the Swagger UI middleware:

```cs
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.OAuthClientId(keycloakClientId); // Default Client ID
        options.OAuthUsePkce(); // Proof Key for Code Exchange (security enhancement)
    });
}
```

Your <VPIcon icon="iconfont icon-json"/>`appsettings.Development.json`:

```json title="appsettings.Development.json"
{
  "Keycloak": {
    "Authority": "http://localhost:8080/realms/keycloak-demo",
    "ClientId": "demo-api",
    "Audience": "account",
    "Issuer": "http://localhost:8080/realms/keycloak-demo",
    // Here we use the Docker service name for Keycloak
    "MetadataAddress": "http://keycloak:8080/realms/keycloak-demo/.well-known/openid-configuration"
  }
}
```

Now when you open Swagger UI, you'll see an **Authorize** button. Clicking it opens the OAuth flow, redirecting you to Keycloak to log in.

![Swagger UI showing the Authorize form for OAuth 2.0.](https://milanjovanovic.tech/blogs/mnw_180/swagger_authorize_form.png?imwidth=3840)

---

## Adding JWT Validation

At this point, Swagger UI can obtain tokens, but our API isn't validating them yet. Let's add JWT Bearer authentication.

Install the authentication package:

```sh
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

Configure authentication in <VPIcon icon="iconfont icon-csharp"/>`Program.cs`:

```cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.MetadataAddress = builder.Configuration["Keycloak:MetadataAddress"]!;
        options.Audience = builder.Configuration["Keycloak:Audience"];

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Keycloak:Issuer"]
        };

        // Required for HTTP in development (Keycloak uses HTTP by default in dev mode)
        options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
    });

builder.Services.AddAuthorization();
```

The default `TokenValidationParameters` will validate the token signature, expiration, issuer, and audience.

Add the middleware:

```cs
app.UseAuthentication();
app.UseAuthorization();
```

Create a protected endpoint:

```cs
app.MapGet("users/me", (ClaimsPrincipal user) =>
{
    return Results.Ok(new
    {
        UserId = user.FindFirstValue(ClaimTypes.NameIdentifier),
        Email = user.FindFirstValue(ClaimTypes.Email),
        Name = user.FindFirstValue("preferred_username"),
        Claims = user.Claims.Select(c => new { c.Type, c.Value })
    });
})
.RequireAuthorization();
```

---

## How JWT Validation Works

When a request hits your protected endpoint, here's what happens under the hood:

![A sequence diagram showing how JWT validation works in ASP.NET Core.](https://milanjovanovic.tech/blogs/mnw_180/jwt_validation_flow.png?imwidth=3840)
<!-- TODO: mermaid화 -->

1. **Middleware extracts** the `Authorization: Bearer <token>` header
2. **JWT Handler fetches** Keycloak's public keys from the JWKS endpoint (cached)
3. **Signature validation** proves the token wasn't tampered with
4. **Claims are extracted** and the `ClaimsPrincipal` is populated
5. **Authorization middleware** checks if the user meets the endpoint requirements
6. **Endpoint executes** with access to `HttpContext.User`

The key insight here is that your API **never contacts Keycloak** to validate individual tokens. It fetches the signing keys once and validates tokens locally. This is what makes JWT-based authentication so fast.

---

## Observing the Flow with Aspire Dashboard

If you're using [<VPIcon icon="fas fa-globe"/>Aspire](https://aspire.dev), you can observe the entire authentication flow in the distributed traces.

Here's what a successful authentication looks like:

![Aspire Dashboard showing a distributed trace of the authentication flow.](https://milanjovanovic.tech/blogs/mnw_180/aspire_auth_trace.png?imwidth=3840)

You can see:

1. The initial request to `users/me` (with the Bearer token)
2. The outbound call to Keycloak's `.well-known/openid-configuration` endpoint
3. The outbound call to Keycloak's JWKS endpoint (fetching signing keys)
4. The response back to the client

On subsequent requests, you won't see the JWKS call because the keys are cached.

This is why JWT validation adds virtually no latency after the initial key fetch.

---

## Production Considerations

What we've built is great for development. For production, you'll want to address a few things:

### 1. HTTPS Everywhere

Keycloak should run behind HTTPS. Set `KC_HOSTNAME` and configure TLS certificates.

### 2. Persistent Storage

Replace the embedded H2 database with PostgreSQL or MySQL:

```yaml
environment:
  - KC_DB=postgres
  - KC_DB_URL=jdbc:postgresql://postgres:5432/keycloak
  - KC_DB_USERNAME=keycloak
  - KC_DB_PASSWORD=secret
```

### 3. Require HTTPS Metadata

Remove `options.RequireHttpsMetadata = false` in production.

---

## Summary

In about 10 minutes, we've set up:

- A [**containerized**](/milanjovanovic.tech/containerize-your-dotnet-applications-without-a-dockerfile) Keycloak instance
- A realm with a public OAuth 2.0 client
- Swagger UI acting as an OAuth client with Authorization Code + PKCE
- JWT validation in ASP.NET Core
- Observability with [**OpenTelemetry**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet) into the authentication flow

What I really like about Keycloak is how easy it is to extend. Want Google login? Configure it in Keycloak. Need enterprise SSO? Add a SAML provider. Your API code stays exactly the same because it just validates tokens.

If you want to see how I integrate Keycloak in a real-world system with role-based access control, check out [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) and [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Integrate Keycloak with ASP.NET Core Using OAuth 2.0",
  "desc": "Learn how to integrate Keycloak with your .NET 10 API using Docker, Swagger UI with OAuth 2.0 Authorization Code flow, and JWT validation.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/integrate-keycloak-with-aspnetcore-using-oauth-2.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
