---
lang: en-US
title: "API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes"
description: "Article(s) > API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes"
icon: fas fa-shield-halved
category:
  - Dart
  - C#
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - c#
  - cs
  - csharp
  - dotnet
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes"
    - property: og:description
      content: "API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/api-authentication-authorization-mechanisms-trade-offs-and-failure-modes.html
prev: /devops/security/articles/README.md
date: 2026-10-05
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/51178fc1-fae2-4f9e-b52c-3f2878db07d0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
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

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes"
  desc="Every API has some form of authentication. But having authentication and getting it right are two completely different things. I've reviewed production systems where JWTs had no expiry. Systems where "
  url="https://freecodecamp.org/news/api-authentication-authorization-mechanisms-trade-offs-and-failure-modes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/51178fc1-fae2-4f9e-b52c-3f2878db07d0.png"/>

Every API has some form of authentication. But having authentication and getting it right are two completely different things.

I've reviewed production systems where JWTs had no expiry. Systems where API keys were hardcoded in source code and committed to public repositories. Systems where OAuth redirect URIs used wildcards. Systems where Basic Auth was being used for financial APIs over what was supposed to be HTTPS but nobody checked.

Every single one of those was a live vulnerability waiting to be exploited.

Most of these problems didn't come from careless engineers. They came from engineers who understood how to make the mechanism work but didn't understand the failure modes. Nobody told them what happens when it breaks. Nobody defined what the organizational standard was. They picked what they knew, implemented it well enough to pass code review, and moved on.

This article is about changing that. Not just how each mechanism works, but when to use it, when not to use it, and exactly how it fails in production.

Before anything else, let's clear up a confusion that causes real vulnerabilities. Authentication answers: who are you? Authorization answers: what are you allowed to do?

A system that authenticates perfectly but authorizes poorly will still serve unauthorized data. A system that authorizes perfectly but authenticates weakly is trivially bypassed. Both must be correct, independently.

::: Prerequisites

Before reading this article, you should be comfortable with:

- What an API is and how HTTP requests and responses work
- A basic understanding of what a token or session is
- General software architecture concepts: what a gateway is, and what a service layer is
- Familiarity with Dart or C# syntax

:::

You don't need a security background. Every concept here is explained from an engineering perspective.

---

## The Foundation: What You Must Get Right Before Choosing a Mechanism

Before you even think about which mechanism to use, three things must be in place. No mechanism saves you if these are missing.

### 1. TLS isn't Optional

Every API communicates over HTTPS. Every endpoint and environment, not just production. Not just the endpoints that handle card numbers. All of them.

Without TLS, every mechanism in this article can be intercepted. Basic Auth tokens, API keys, bearer tokens, JWT all travel in HTTP headers. HTTP headers are plaintext without TLS.

Your infrastructure must enforce TLS 1.2 minimum. TLS 1.0 and 1.1 have known vulnerabilities. SSLv3 is catastrophically broken. If a client tries to negotiate an older protocol version, the connection must be rejected at the infrastructure layer. This is a configuration decision, not something you handle in code.

### 2. Production APIs Must Not Be Accessible on Public Tooling Without Proper Controls

A production API accessible over the internet through Postman or Swagger without proper access controls is a problem waiting to happen.

Development and testing must use dedicated environments with separate credentials that have zero access to production data.

### 3. Production Data Must Not Be Copied to Development or Test Environments

This isn't just good practice. Under Nigeria's NDPA 2023, personal data must be processed only for specified, explicit, and legitimate purposes. Copying production personal data to a development environment creates direct legal exposure. Under PCI-DSS, any environment that stores, processes, or transmits cardholder data is in scope for compliance.

The engineering answer is synthetic test data and anonymized datasets in every non-production environment, always.

With that in place, here are the seven mechanisms.

---

## 1. Basic Authentication

:::: info How It Works

The client sends a username and password on every single request. The credentials are combined as `username:password`, encoded in Base64, and placed in the Authorization header.

```plaintext
Authorization: Basic am9objpzZWNyZXQxMjM=
```

That encoded string is `john:secret123` in Base64. Base64 isn't encryption. It's encoding. Anyone who captures that header can decode it in seconds using any Base64 decoder available online.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
// server-side basic auth validation
String? extractBasicAuthCredentials(Request request) {
  final authHeader = request.headers['authorization'];
  if (authHeader == null || !authHeader.startsWith('Basic ')) return null;

  final encoded = authHeader.substring(6);
  final decoded = utf8.decode(base64.decode(encoded));
  return decoded; 
}

Handler basicAuthMiddleware(Handler handler, UserService userService) {
  return (Request request) async {
    final credentials = extractBasicAuthCredentials(request);
    if (credentials == null) {
      return Response.unauthorized(
        'Missing credentials',
        headers: {'WWW-Authenticate': 'Basic realm="API"'},
      );
    }

    final parts = credentials.split(':');
    if (parts.length != 2) return Response.unauthorized('Invalid credentials');

    final isValid = await userService.validateCredentials(parts[0], parts[1]);
    if (!isValid) return Response.unauthorized('Invalid credentials');

    return handler(request);
  };
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public class BasicAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IUserService _userService;

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
            return AuthenticateResult.Fail("Missing Authorization header");

        var authHeader = Request.Headers["Authorization"].ToString();
        if (!authHeader.StartsWith("Basic "))
            return AuthenticateResult.Fail("Invalid Authorization scheme");

        var encoded = authHeader.Substring(6);
        var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(encoded));
        var parts = decoded.Split(':');

        if (parts.Length != 2)
            return AuthenticateResult.Fail("Invalid credentials format");

        var isValid = await _userService.ValidateCredentials(parts[0], parts[1]);
        if (!isValid)
            return AuthenticateResult.Fail("Invalid credentials");

        var claims = new[] { new Claim(ClaimTypes.Name, parts[0]) };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }
}
```

:::

::::

### The Real Problem With Basic Auth

Credentials travel on every single request. One intercepted request gives an attacker the username and password permanently. There's no expiry. There's no revocation short of changing the password. Base64 provides zero security.

No rate limiting on a Basic Auth endpoint is an open invitation for brute force. An attacker with a list of common passwords will systematically try every one. If nothing stops them, they'll eventually get in.

### When to Use It

Basic auth works for internal server-to-server communication within a tightly controlled environment where the connection is always encrypted and the API surface is not exposed to the internet. Never use it for user-facing APIs, for anything handling sensitive data, or without TLS.

---

## 2. API Keys

An API key is simply a unique secret string that a server issues to a client to identify it. When you sign up to use a third-party service like a payment gateway, or an SMS platform, you're issued a key. Every request your application makes to that service includes that key so the service knows it's you calling, can track your usage, and can apply the right permissions and rate limits to your requests.

It's not tied to a user. It's tied to your application. That's the fundamental difference between an API key and a user authentication token

:::: info How It Works

A static secret string is issued to a client and sent in a header on every request.

```plaintext
X-API-Key: sk_live_abc123xyz
```

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class ApiKeyService {
  final ApiKeyRepository _repository;

  ApiKeyService(this._repository);

  Future<Result<ApiKeyContext, AppException>> validateApiKey(
    String apiKey,
    String callerDomain,
  ) async {
    final keyRecord = await _repository.findByKey(apiKey);

    if (keyRecord == null) {
      return Result.failure(AppException.unauthorized('Invalid API key'));
    }

    if (keyRecord.isExpired) {
      return Result.failure(AppException.unauthorized('API key has expired'));
    }

    if (keyRecord.isRevoked) {
      return Result.failure(AppException.unauthorized('API key has been revoked'));
    }

    // validate that the calling domain is allowed for this key
    if (!keyRecord.allowedDomains.contains(callerDomain)) {
      return Result.failure(
        AppException.forbidden('Calling domain not authorized for this API key'),
      );
    }

    return Result.success(ApiKeyContext(
      clientId: keyRecord.clientId,
      environment: keyRecord.environment,
      allowedScopes: keyRecord.allowedScopes,
    ));
  }
}

Handler apiKeyMiddleware(Handler handler, ApiKeyService apiKeyService) {
  return (Request request) async {
    final apiKey = request.headers['x-api-key'];
    if (apiKey == null || apiKey.isEmpty) {
      return Response(401, body: jsonEncode({'error': 'API key required'}));
    }

    final origin = request.headers['origin'] ?? request.headers['host'] ?? '';
    final result = await apiKeyService.validateApiKey(apiKey, origin);

    if (result.isFailure) {
      return Response(403, body: jsonEncode({'error': result.error?.message}));
    }

    return handler(request);
  };
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public class ApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IApiKeyService _apiKeyService;

    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue("X-API-Key", out var apiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("API key required");
            return;
        }

        var callerDomain = context.Request.Headers["Origin"].ToString()
            ?? context.Request.Host.Value;

        var result = await _apiKeyService.ValidateApiKey(apiKey, callerDomain);

        if (!result.IsSuccess)
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync(result.Error);
            return;
        }

        context.Items["ApiKeyContext"] = result.Value;
        await _next(context);
    }
}
```

:::

::::

### The Real Problem With API Keys

API keys are static. They don't expire automatically. A key found in a public GitHub repository, a Slack message, or a log file is a live credential until someone notices and rotates it.

One of the most common gaps I've seen in large-scale organizations is that APIs called by multiple clients have no domain allowlisting. The same key works from any domain. This makes it possible to share keys across clients and across environments, which means a staging key can call production, a mobile key can be used from a web client, and there's no real boundary between any of them.

No API key should work for multiple clients or multiple environments. Keys must be tied to specific allowed domains and specific environments. This isn't optional.

Never hardcode API keys in source code. Never commit them to Git. `.gitignore` is not enough. Keys must be fetched from a trusted secrets manager at runtime: vaults, Azure App Configuration, AWS Secrets Manager. API key rotation must be a scheduled organizational practice, not a reaction to a suspected leak.

### When to Use It

Use API keys for server-to-server communication, public APIs where you need to identify and rate-limit callers, and developer tools and integrations. Any scenario where a human user isn't the direct caller.

---

## 3. Bearer Token Authentication

:::: info How It Works

The client authenticates once through a login flow and receives a token. That token travels in the Authorization header on all subsequent requests.

```plaintext
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

There are no credentials after the initial login. The token is what travels. The server validates the token on every request.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class BearerTokenMiddleware {
  final TokenValidator _validator;

  BearerTokenMiddleware(this._validator);

  Handler call(Handler handler) {
    return (Request request) async {
      final authHeader = request.headers['authorization'];

      if (authHeader == null || !authHeader.startsWith('Bearer ')) {
        return Response(401, body: jsonEncode({'error': 'Bearer token required'}));
      }

      final token = authHeader.substring(7);
      final validationResult = await _validator.validate(token);

      if (validationResult.isFailure) {
        return Response(401, body: jsonEncode({'error': validationResult.error?.message}));
      }

      final updatedRequest = request.change(
        context: {'auth_claims': validationResult.value},
      );

      return handler(updatedRequest);
    };
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)
            ),
            ClockSkew = TimeSpan.Zero
        };
    });
```

:::

::::

### The Real Problem With Bearer Tokens

Token theft is the biggest problem. If an attacker gets hold of a valid bearer token, they can use it until it expires or is manually revoked. This is why token expiry is not a nice-to-have. It's what limits the damage when a token is compromised. Short-lived access tokens with refresh token rotation is the correct pattern.

### When to Use It

They work well in most modern web and mobile APIs, user authentication flows, and in any API where stateless, scalable authentication is needed.

---

## 4. JWT – JSON Web Token

:::: info How It Works

JWTs are a specific format for bearer tokens, not a separate authentication mechanism. They're self-contained tokens that carry claims about the user inside the token itself.

A JWT has three parts separated by dots:

```plaintext
Header.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ.SIGNATURE
```

The header specifies the signing algorithm. The payload carries the claims: user ID, role, expiry time, and issued at time. The signature is a cryptographic hash that proves the token came from your server and hasn't been tampered with.

The server validates the signature cryptographically and trusts the claims inside. No database lookup is needed. This is what makes JWTs stateless and scalable.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class JwtService {
  final String _secret;
  final String _issuer;
  final Duration _accessTokenExpiry;

  JwtService({
    required String secret,
    required String issuer,
    Duration accessTokenExpiry = const Duration(minutes: 15),
  })  : _secret = secret,
        _issuer = issuer,
        _accessTokenExpiry = accessTokenExpiry;

  String generateAccessToken(User user) {
    final now = DateTime.now();
    final payload = {
      'sub': user.id,
      'role': user.role.name,
      'iat': now.millisecondsSinceEpoch ~/ 1000,
      'exp': now.add(_accessTokenExpiry).millisecondsSinceEpoch ~/ 1000,
      'iss': _issuer,
      
    };

    return _sign(payload);
  }

  Result<JwtClaims, AppException> validateToken(String token) {
    try {
      final claims = _verifyAndDecode(token);

      final exp = claims['exp'] as int;
      if (DateTime.fromMillisecondsSinceEpoch(exp * 1000).isBefore(DateTime.now())) {
        return Result.failure(AppException.unauthorized('Token has expired'));
      }

      if (claims['iss'] != _issuer) {
        return Result.failure(AppException.unauthorized('Invalid token issuer'));
      }

      return Result.success(JwtClaims.fromMap(claims));
    } on SignatureVerificationException {
      return Result.failure(AppException.unauthorized('Invalid token signature'));
    } catch (e) {
      return Result.failure(AppException.unauthorized('Token validation failed'));
    }
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public class JwtService
{
    private readonly JwtSettings _settings;

    public string GenerateAccessToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_settings.Secret)
        );

       
        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256
        );

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(JwtRegisteredClaimNames.Iat,
                DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
           
        };

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

:::

::::

### JWT Failure Modes

JWTs are excellent when implemented correctly. When implemented incorrectly, they can be catastrophic. Every failure is an implementation failure, not a standard failure. Here are the ones I've seen that cause real problems.

#### 1. The algorithm confusion attack

The JWT header specifies which algorithm was used to sign it. If your server accepts whatever algorithm the token claims, an attacker sets the algorithm to `none` and strips the signature entirely. Your server accepts any token as valid.

#### 2. Weak signing secrets

A weak JWT secret can be brute-forced offline. The attacker doesn't need access to your server. They take the token, run it through a cracker, discover the secret, and can now sign any token they want as any user they want.

Use cryptographically strong secrets of at least 256 bits. For high-security contexts use RS256 or ES256 with asymmetric keys.

#### 3. No expiry

A JWT without an `exp` claim never becomes invalid. Set an expiry, always. For short-lived access tokens, choose 15 minutes to 1 hour. Refresh tokens handle session continuity.

#### 4. Sensitive data in the payload

The payload is Base64 encoded, not encrypted. Anyone who gets the token can decode and read everything inside. Never put passwords, full account numbers, BVN, or sensitive PII in a JWT payload. Put identifiers instead. Let the server fetch the sensitive data.

#### 5. No revocation strategy

Because JWTs are stateless, the server doesn't track issued tokens. A stolen token is valid until it expires.

The fix: maintain a token blocklist for explicitly revoked tokens, or use short expiry with refresh token rotation so the damage window is small.

### When to Use JWTs

Use them for stateless APIs at scale, microservices where services need to verify identity without calling a central auth server on every request, and mobile applications. They're good for any system where stateless authentication scalability matters more than the complexity of managing token revocation.

---

## 5. OAuth 2.0

:::: info How It Works

OAuth 2.0 is an authorization framework, not an authentication protocol. It lets a user grant a third-party application access to their resources without sharing their password with that third party.

You have used this every time you logged into an app with Google, or saw "Allow this app to access your account."

Four parties are involved: the Authorization Server that issues tokens, the Resource Server that hosts the protected API, the Client which is the application requesting access, and the Resource Owner which is the user.

The Authorization Code flow works like this:

1. The client redirects the user to the Authorization Server with a request for specific scopes
2. The user authenticates and approves the requested scopes
3. The Authorization Server redirects back to the client with an authorization code
4. The client exchanges the code for an access token server-side
5. The client uses the access token to call the Resource Server

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class OAuthClient {
  final String _clientId;
  final String _clientSecret;
  final String _redirectUri;
  final String _authorizationEndpoint;
  final String _tokenEndpoint;

  OAuthClient({
    required String clientId,
    required String clientSecret,
    required String redirectUri,
    required String authorizationEndpoint,
    required String tokenEndpoint,
  })  : _clientId = clientId,
        _clientSecret = clientSecret,
        _redirectUri = redirectUri,
        _authorizationEndpoint = authorizationEndpoint,
        _tokenEndpoint = tokenEndpoint;

  String buildAuthorizationUrl(List<String> scopes) {
   
    final state = _generateSecureState();

    final params = {
      'response_type': 'code',
      'client_id': _clientId,
      'redirect_uri': _redirectUri,
      'scope': scopes.join(' '),
      'state': state,
    };

    final uri = Uri.parse(_authorizationEndpoint)
        .replace(queryParameters: params);

    return uri.toString();
  }

  Future<Result<OAuthTokens, AppException>> exchangeCodeForTokens(
    String code,
    String state,
    String expectedState,
  ) async {
   
    if (state != expectedState) {
      return Result.failure(
        AppException.unauthorized('Invalid state parameter'),
      );
    }

    final response = await http.post(
      Uri.parse(_tokenEndpoint),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': _redirectUri,
        'client_id': _clientId,
        'client_secret': _clientSecret,
      },
    );

    if (response.statusCode != 200) {
      return Result.failure(AppException.unauthorized('Token exchange failed'));
    }

    final tokens = OAuthTokens.fromJson(jsonDecode(response.body));
    return Result.success(tokens);
  }

  String _generateSecureState() {
    final bytes = List<int>.generate(32, (_) => Random.secure().nextInt(256));
    return base64Url.encode(bytes);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs :collapsed-lines
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = "OAuth2";
})
.AddCookie()
.AddOAuth("OAuth2", options =>
{
    options.ClientId = builder.Configuration["OAuth:ClientId"]!;
    options.ClientSecret = builder.Configuration["OAuth:ClientSecret"]!;
    options.CallbackPath = "/auth/callback";
    options.AuthorizationEndpoint = "https://auth.provider.com/authorize";
    options.TokenEndpoint = "https://auth.provider.com/token";
    options.SaveTokens = true;
    options.Scope.Add("openid");
    options.Scope.Add("profile");

    options.Events = new OAuthEvents
    {
        OnCreatingTicket = async context =>
        {
            var userInfoRequest = new HttpRequestMessage(
                HttpMethod.Get,
                "https://auth.provider.com/userinfo"
            );
            userInfoRequest.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", context.AccessToken);

            var response = await context.Backchannel.SendAsync(userInfoRequest);
            var userInfo = await response.Content.ReadFromJsonAsync<JsonDocument>();

            context.Identity!.AddClaim(new Claim(
                ClaimTypes.NameIdentifier,
                userInfo!.RootElement.GetString("sub")!
            ));
        }
    };
});
```

:::

::::

### OAuth 2.0 Failure Modes

#### 1. Misconfigured redirect URIs

If the authorization server doesn't strictly validate redirect URIs, an attacker substitutes their own URI and intercepts the authorization code. Use exact match validation to prevent this.

#### 2. Tokens in URLs

Access tokens can appear in server logs, browser history, or referrer headers because someone put them in a query parameter instead of an Authorization header. Tokens belong in Authorization headers. URLs appear in logs, while authorization headers don't.

### When to Use OAuth 2.0

It works well in any scenario where a third party needs delegated access to user resources, like social login, API integrations between organizations, or partner system integrations.

---

## 6. OpenID Connect (OIDC)

:::: info How It Works

OAuth 2.0 handles authorization. OpenID Connect adds authentication on top of OAuth 2.0. It doesn't just tell you what the user approved. It tells you who the user actually is.

OIDC issues an ID token alongside the access token. The ID token is a JWT containing verified identity claims: subject identifier, email, name, profile picture, and when the authentication happened.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
class OidcService {
  final String _issuer;
  final String _clientId;
  final JwtValidator _jwtValidator;

  OidcService({
    required String issuer,
    required String clientId,
    required JwtValidator jwtValidator,
  })  : _issuer = issuer,
        _clientId = clientId,
        _jwtValidator = jwtValidator;

  Future<Result<UserIdentity, AppException>> validateIdToken(
    String idToken,
  ) async {
    final claimsResult = await _jwtValidator.validate(idToken);
    if (claimsResult.isFailure) {
      return Result.failure(claimsResult.error!);
    }

    final claims = claimsResult.value!;

    if (claims['iss'] != _issuer) {
      return Result.failure(AppException.unauthorized('Invalid token issuer'));
    }


    final aud = claims['aud'];
    final audiences = aud is List ? aud : [aud];
    if (!audiences.contains(_clientId)) {
      return Result.failure(
        AppException.unauthorized('Token not intended for this client'),
      );
    }

    return Result.success(UserIdentity(
      subject: claims['sub'] as String,
      email: claims['email'] as String?,
      name: claims['name'] as String?,
      emailVerified: claims['email_verified'] as bool? ?? false,
    ));
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
    options.Authority = "https://accounts.google.com";
    options.ClientId = builder.Configuration["OIDC:ClientId"]!;
    options.ClientSecret = builder.Configuration["OIDC:ClientSecret"]!;
    options.ResponseType = "code";
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});
```

:::

::::

### When to Use OIDC

It's good for any application that needs to verify user identity through a trusted identity provider, like enterprise SSO or social login. It works well for any system where you want to delegate identity verification to a trusted third party rather than managing user credentials yourself.

Google Sign-In, Microsoft Azure AD, Okta, Auth0 all implement OIDC. If your question is "who is this person" rather than just "is this request authorized," OIDC is the right framework.

---

## 7. Mutual TLS (mTLS)

:::: info How It Works

In regular TLS, the client verifies the server's certificate. The server trusts any client that can establish a connection.

In mutual TLS, both parties verify each other's certificates. The server only accepts connections from clients with a certificate issued by a trusted Certificate Authority. The client can't fake its identity because it needs a real certificate.

There's no bearer token or API key. The certificate is the authentication.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

client-side mTLS

```dart
class MtlsHttpClient {
  final http.Client _client;

  MtlsHttpClient._internal(this._client);

  static Future<MtlsHttpClient> create({
    required String certificatePath,
    required String privateKeyPath,
    required String trustedCaPath,
  }) async {
    final context = SecurityContext(withTrustedRoots: false);

    // load the client certificate
    context.useCertificateChainBytes(
      await File(certificatePath).readAsBytes(),
    );

    // load the client private key
    context.usePrivateKeyBytes(
      await File(privateKeyPath).readAsBytes(),
    );

    // only trust this specific CA
    context.setTrustedCertificatesBytes(
      await File(trustedCaPath).readAsBytes(),
    );

    final httpClient = HttpClient(context: context);
    final client = IOClient(httpClient);

    return MtlsHttpClient._internal(client);
  }

  Future<http.Response> get(String url, {Map<String, String>? headers}) {
    return _client.get(Uri.parse(url), headers: headers);
  }

  Future<http.Response> post(
    String url, {
    Map<String, String>? headers,
    Object? body,
  }) {
    return _client.post(Uri.parse(url), headers: headers, body: body);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
builder.WebHost.ConfigureKestrel(options =>
{
    options.ConfigureHttpsDefaults(httpsOptions =>
    {
        httpsOptions.ClientCertificateMode = ClientCertificateMode.RequireCertificate;
        httpsOptions.ClientCertificateValidation = (certificate, chain, errors) =>
        {
            if (errors != SslPolicyErrors.None)
                return false;

            var expectedThumbprint = "your-trusted-cert-thumbprint";
            return certificate.Thumbprint == expectedThumbprint;
        };
    });
});

public class MtlsMiddleware
{
    private readonly RequestDelegate _next;

    public async Task InvokeAsync(HttpContext context)
    {
        var clientCert = context.Connection.ClientCertificate;

        if (clientCert == null)
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Client certificate required");
            return;
        }

        if (!IsValidClientCertificate(clientCert))
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("Invalid client certificate");
            return;
        }

        await _next(context);
    }

    private bool IsValidClientCertificate(X509Certificate2 cert)
    {
        if (cert.NotAfter < DateTime.UtcNow) return false;

        var trustedThumbprints = new HashSet<string>
        {
            "THUMBPRINT_SERVICE_A",
            "THUMBPRINT_SERVICE_B",
        };

        return trustedThumbprints.Contains(cert.Thumbprint);
    }
}
```

:::

::::

### The Real Problem With mTLS

The issue here is certificate management. Certificates expire. If rotation isn't automated, an expired certificate breaks service-to-service communication at the worst possible time. The CA infrastructure itself must be secured. A compromised CA means every certificate it issued is compromised.

For teams without the operational capacity to manage a full PKI, API keys with strict domain allowlisting and rotation schedules may be the more practical answer. mTLS is the right architecture, but it's also the most demanding to operate correctly.

### When to Use mTLS

Use mTLS for high-security service-to-service communication, like payment gateways or banking APIs. It also works well for microservices in regulated environments where compliance requires cryptographic proof of identity at the transport layer. Every communication between internal services in a high-security system should be treated as sensitive. mTLS provides that foundation.

---

## Choosing the Right Mechanism

Choosing an authentication mechanism is an architectural decision. Here's the framework:

**For user-facing web and mobile applications:** choose bearer tokens with JWT. Short-lived access tokens with refresh token rotation. Rate limiting on all authentication endpoints.

**For third-party delegated access:** use OAuth 2.0. When you also need to verify user identity, add OIDC on top.

**For enterprise SSO:** choose OpenID Connect with an enterprise identity provider.

**For server-to-server, lower security requirements:** use API keys with domain allowlisting, environment-specific keys, and scheduled rotation.

**For service-to-service in regulated high-security environments:** use mTLS.

**For internal tooling in tightly controlled environments:** Basic Auth is the floor, and only if TLS is guaranteed. For everything else, use something stronger.

You should choose your authentication mechanism based on who the caller is, what the data sensitivity is, and what the compliance requirements are. Not by convention or by what the last project used. And not by what's easiest to implement.

---

## The Organizational Discipline That Ties Everything Together

Getting the technical implementation right is half the work. The other half is organizational.

API key rotation must be scheduled and proactive, not a reaction to a suspected leak. Every key has a defined maximum lifetime and a rotation schedule that engineering owns.

No API key works for multiple clients or multiple environments. A staging key is a staging key. A mobile client key is a mobile client key. Cross-environment key reuse is a security boundary collapse.

Secrets never live in source code, application code, or in configuration files committed to the repository. Secrets are fetched from a trusted secrets manager at runtime. This is an engineering standard, not a preference.

Encryption algorithms must be an organizational standard, not a developer decision made per project. Someone at the staff engineer or architect level defines which algorithm, which mode, and which key length the organization uses. Every project uses the standard, and no developer implements encryption from scratch per project.

Organizations should build and maintain internally shared packages for cryptographic operations. Developers import the package. They never write encryption themselves. This eliminates an entire category of cryptographic implementation failures that come from ad-hoc choices.

Structured logging with field-level masking must be enforced at the framework level. Authorization headers, tokens, passwords, account numbers, and any sensitive field must never appear in logs in any environment (production, staging, or development). The masking applies at the logging framework level so no individual developer can accidentally log sensitive data even if they try.

---

## Conclusion

Every mechanism in this article works when implemented correctly. And at the same time, every mechanism fails in predictable, documented ways when implemented incorrectly.

JWT algorithm confusion attacks have caused real authentication bypasses. Misconfigured OAuth redirect URIs have caused real account takeovers. Missing state parameters have enabled real CSRF attacks. Weak signing secrets have led to real impersonation at scale. Hardcoded API keys in repositories have exposed production systems to unauthorized access.

These aren't theoretical failure modes. They appear in production systems at organizations of every size. The engineers who built those systems weren't incompetent. They just weren't told about the failure modes. Nobody defined the organizational standard or enforced it in the pipeline.

The engineering discipline is knowing exactly how each mechanism breaks before you write the first line of code, and building your implementation to avoid those failure modes from the start. That's the difference between authentication that works and authentication that holds up under adversarial conditions.

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "API Authentication & Authorization: An Engineering Deep Dive into Mechanisms, Trade-offs, and Failure Modes",
  "desc": "Every API has some form of authentication. But having authentication and getting it right are two completely different things. I've reviewed production systems where JWTs had no expiry. Systems where ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/api-authentication-authorization-mechanisms-trade-offs-and-failure-modes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
