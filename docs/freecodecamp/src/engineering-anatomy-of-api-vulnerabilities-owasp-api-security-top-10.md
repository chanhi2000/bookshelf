---
lang: en-US
title: "The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10"
description: "Article(s) > The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10"
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
      content: "Article(s) > The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10"
    - property: og:description
      content: "The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/engineering-anatomy-of-api-vulnerabilities-owasp-api-security-top-10.html
prev: /devops/security/articles/README.md
date: 2026-10-05
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/58e0ba94-ccc6-4e4e-aa19-9480cb060d23.png
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
  name="The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10"
  desc="Most security articles read like threat reports. They describe vulnerabilities from the outside looking in: what an attacker does, what the impact is, and how many systems are affected globally. That'"
  url="https://freecodecamp.org/news/engineering-anatomy-of-api-vulnerabilities-owasp-api-security-top-10"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/58e0ba94-ccc6-4e4e-aa19-9480cb060d23.png"/>

Most security articles read like threat reports. They describe vulnerabilities from the outside looking in: what an attacker does, what the impact is, and how many systems are affected globally. That's useful context, but it doesn't help engineers build better systems.

This article is different. It looks at each OWASP API Security Top 10 vulnerability from the inside: what engineering decision allowed it to exist, which architectural principle was violated, and what the engineering standard should be to prevent it from ever shipping to production.

I've spent years building production applications at scale in regulated financial environments. The vulnerabilities in this list aren't theoretical. I've seen most of them in real systems. Some of them I caught before they reached production. Some of them were already live when I arrived. Every single one of them was preventable...and not by security tools, but by engineering discipline.

That's the lens this article uses.

::: note Prerequisites

Before reading this article, you should be comfortable with:

- Building APIs in any language or framework
- Basic understanding of authentication: what tokens and sessions are
- What a database query looks like at a high level
- General software architecture concepts, like layers, services, and gateways

You don't need a security background. This article explains every vulnerability from an engineering perspective, not a security analyst perspective.

:::

---

## What is the OWASP API Security Top 10?

OWASP stands for Open Web Application Security Project. It's a non-profit foundation that produces freely available security guidance for engineers and organizations. The OWASP API Security Top 10 is a regularly updated list of the most critical API vulnerabilities found in production systems globally.

It's not a theoretical list. It's compiled from real security incidents, penetration test findings, and vulnerability reports from production systems across industries. Every item on this list has caused real data breaches, real financial losses, and real regulatory penalties in real organizations.

Understanding this list isn't optional for engineers building APIs. It's foundational knowledge.

---

## 1. Broken Object Level Authorization (BOLA)

::: info What it is

A user is authenticated and they have a valid token. But they can access data that doesn't belong to them simply by changing an identifier in the request.

```plaintext
GET /api/accounts/12345/transactions
```

User A is authenticated and owns account 12345. They change the account number:

```plaintext
GET /api/accounts/99999/transactions
```

If the API returns User B's transactions, BOLA exists. The user is authenticated but the API isn't verifying that the authenticated user owns the requested resource.

This is the most common API vulnerability in the world. It consistently tops the OWASP list because it's so easy to introduce and so easy to miss in code review.

:::

::: warning The Engineering Failure

BOLA happens when authorization is treated as a binary question: is this user authenticated? Yes or no. The API checks whether the user has a valid token and stops there. It never asks the second question: does this authenticated user own the specific resource they're requesting?

The authentication isn't ID-agnostic. It proves who you are but it never proves whether the thing you are asking for belongs to you.

:::

:::: tip The Engineering Fix

Authorization must happen at the service layer, not just at the API gateway. The API gateway can verify that the token is valid. Only the service layer knows whether the authenticated user owns the resource being requested.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
class TransactionService {
  final TransactionRepository _repository;
  final AuthContext _authContext;

  TransactionService(this._repository, this._authContext);

  Future<Result<List<Transaction>, AppException>> getTransactions(
    String accountId,
  ) async {
    final currentUserId = _authContext.currentUserId;

    // fetch the account first
    final account = await _repository.findAccountById(accountId);

    if (account == null) {
      return Result.failure(AppException.notFound('Account not found'));
    }

    // verify ownership before returning any data
    if (account.ownerId != currentUserId) {
      return Result.failure(
        AppException.forbidden('Access denied to this account'),
      );
    }

    final transactions = await _repository.findByAccountId(accountId);
    return Result.success(transactions);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public async Task<Result<IEnumerable<Transaction>>> GetTransactions(
    string accountId,
    ClaimsPrincipal currentUser)
{
    var userId = currentUser.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var account = await _repository.FindAccountByIdAsync(accountId);

    if (account == null)
        return Result.Failure<IEnumerable<Transaction>>("Account not found");

    // ownership check — never skip this
    if (account.OwnerId != userId)
        return Result.Failure<IEnumerable<Transaction>>("Access denied");

    var transactions = await _repository.FindByAccountIdAsync(accountId);
    return Result.Success(transactions);
}
```

:::

The ownership check must happen on every request that accesses a specific resource. Not just on first load or on write operations. Every single request.

::::

---

## 2. Broken Authentication

::: info What it is

Weak tokens, no token expiry, no rate limiting on authentication endpoints, or sessions that never terminate on logout. Any weakness in the mechanism that identifies who's making a request.

::: warning The Engineering Failure

Authentication is treated as a solved problem once it's working. Engineers implement login, get a token back, and move on. The failure modes (like what happens when a token is stolen, or if an attacker hammers the login endpoint with a list of passwords, or when a user logs out) are never designed for.

The authentication mechanism must be designed for adversarial conditions, not just for happy path usage.

:::

:::: tip The Engineering Fix

**Token expiry is mandatory.** Access tokens should be short-lived: 15 minutes to 1 hour. Refresh tokens handle session continuity. Short-lived access tokens limit the damage window when a token is stolen.

**Rate limiting on authentication endpoints is mandatory.** A login endpoint without rate limiting is an open invitation for brute force attacks. An attacker with a list of 10 million email and password combinations will systematically try every one.

**Sessions must actually terminate on logout.** If you're using stateful sessions, the session must be invalidated server-side on logout. If you're using JWT, maintain a token blocklist or use a very short expiry with refresh token rotation.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class AuthService {
  final TokenRepository _tokenRepository;
  final RateLimiter _rateLimiter;

  AuthService(this._tokenRepository, this._rateLimiter);

  Future<Result<AuthTokens, AppException>> login(
    String email,
    String password,
    String ipAddress,
  ) async {
    // rate limit by IP to prevent brute force
    final isAllowed = await _rateLimiter.checkLimit(
      key: 'login:$ipAddress',
      maxAttempts: 5,
      windowSeconds: 300,
    );

    if (!isAllowed) {
      return Result.failure(
        AppException.rateLimited('Too many login attempts. Try again later.'),
      );
    }

    final user = await _validateCredentials(email, password);

    if (user == null) {
      return Result.failure(
        AppException.unauthorized('Invalid credentials'),
      );
    }

    // short-lived access token
    final accessToken = _generateAccessToken(user, expiryMinutes: 15);

    // longer-lived refresh token, stored server-side
    final refreshToken = _generateRefreshToken(user);
    await _tokenRepository.storeRefreshToken(user.id, refreshToken);

    return Result.success(AuthTokens(
      accessToken: accessToken,
      refreshToken: refreshToken,
    ));
  }

  Future<void> logout(String userId, String refreshToken) async {
    // invalidate the refresh token server-side on logout
    await _tokenRepository.revokeRefreshToken(userId, refreshToken);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public async Task<Result<AuthTokens>> Login(
    LoginRequest request,
    string ipAddress)
{
    var isAllowed = await _rateLimiter.CheckLimit(
        key: $"login:{ipAddress}",
        maxAttempts: 5,
        windowSeconds: 300);

    if (!isAllowed)
        return Result.Failure<AuthTokens>("Too many login attempts.");

    var user = await _userService.ValidateCredentials(
        request.Email,
        request.Password);

    if (user == null)
        return Result.Failure<AuthTokens>("Invalid credentials");

    var accessToken = _tokenService.GenerateAccessToken(user, expiryMinutes: 15);
    var refreshToken = _tokenService.GenerateRefreshToken(user);

    await _tokenRepository.StoreRefreshToken(user.Id, refreshToken);

    return Result.Success(new AuthTokens(accessToken, refreshToken));
}

public async Task Logout(string userId, string refreshToken)
{
    await _tokenRepository.RevokeRefreshToken(userId, refreshToken);
}
```

:::

::::

---

## 3. Broken Object Property Level Authorization (BOPLA)

::: info What it is

The API returns more data than the user needs. Internal flags, admin permissions, and sensitive fields that should never leave the server end up in the response payload. Or worse: the API accepts more data than the user should be able to set, allowing users to modify fields they should never touch.

A user fetches their profile and the response includes `isAdmin: false`, `internalAccountScore: 742`, or `fraudRiskLevel: "low"`. None of these should ever be in a user-facing response.

Or a user updates their profile and the request body includes `"role": "admin"`. The API processes it. The user has just promoted themselves to admin.

::: warning The Engineering Failure

This is a structure problem. It happens when systems are built without a deliberately designed response schema. Some developers return the raw database entity directly because it's easier. Some lack the domain knowledge to properly structure their data layer. The result is that internal data leaks into external responses.

This is also an Interface Segregation Principle violation. The response interface forces the consumer to receive data it should never have access to.

:::

:::: tip The Engineering Fix

Every API endpoint must have an explicit, deliberately designed response DTO. The response DTO contains only the fields the caller is authorized to receive. The domain entity never travels directly to the response.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
//Wrong returning the domain entity directly - exposes internal fields
Future<Response> getProfile(Request request) async {
  final user = await _userRepository.findById(userId);
  return Response.ok(jsonEncode(user.toJson())); // exposes everything
}

// Correct : explicit response DTO — only what the caller should see
class UserProfileResponse {
  final String id;
  final String firstName;
  final String lastName;
  final String email;

  const UserProfileResponse({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'first_name': firstName,
    'last_name': lastName,
    'email': email,
    // isAdmin, internalScore, fraudRiskLevel — never here
  };
}

Future<Response> getProfile(Request request) async {
  final user = await _userRepository.findById(userId);

  final response = UserProfileResponse(
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  );

  return Response.ok(jsonEncode(response.toJson()));
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
// Wrong = returning the domain model directly
public async Task<IActionResult> GetProfile(string userId)
{
    var user = await _repository.FindByIdAsync(userId);
    return Ok(user); 
}

// Correct explicit response DTO
public record UserProfileResponse(
    string Id,
    string FirstName,
    string LastName,
    string Email);

public async Task<IActionResult> GetProfile(string userId)
{
    var user = await _repository.FindByIdAsync(userId);

    var response = new UserProfileResponse(
        user.Id,
        user.FirstName,
        user.LastName,
        user.Email
        // IsAdmin, InternalScore, FraudRiskLevel — never exposed
    );

    return Ok(response);
}
```

:::

For incoming requests, use a request DTO that only accepts the fields a user is permitted to modify. Never bind directly to a domain entity in an update operation.

::::

---

## 4. Unrestricted Resource Consumption

::: info What it is

No rate limiting. A caller can spam critical APIs thousands of times per minute, such as with scraping, brute forcing, or denial of service attacks. The API accepts every request without any throttling or limit on consumption.

::: warning The Engineering Failure

Rate limiting is treated as optional or as a future concern. It's deferred to "when we need to scale" or "when we see abuse." By the time abuse is visible, the damage is already happening. A financial API without rate limiting can be brute-forced for valid account numbers, scraped for pricing data, or simply overwhelmed into unavailability.

:::

:::: tip The Engineering Fix

Rate limiting must be implemented at the API gateway layer, before requests reach the service layer. This isn't a service responsibility. The gateway is the right enforcement point because it can handle this for all services simultaneously without each service reimplementing it.

Different endpoints need different limits. Authentication endpoints need strict limits (5 attempts per 5 minutes per IP). Public read endpoints need moderate limits. Write operations on sensitive resources need strict limits.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class RateLimitMiddleware {
  final RateLimiter _limiter;

  RateLimitMiddleware(this._limiter);

  Handler call(Handler innerHandler) {
    return (Request request) async {
      final clientIp = request.headers['x-forwarded-for'] ?? 'unknown';
      final endpoint = request.url.path;

      final limit = _getLimitForEndpoint(endpoint);
      final isAllowed = await _limiter.checkLimit(
        key: '$clientIp:$endpoint',
        maxRequests: limit.maxRequests,
        windowSeconds: limit.windowSeconds,
      );

      if (!isAllowed) {
        return Response(
          429,
          body: jsonEncode({'error': 'Rate limit exceeded'}),
          headers: {'Retry-After': '60'},
        );
      }

      return innerHandler(request);
    };
  }

  RateLimit _getLimitForEndpoint(String path) {
    if (path.contains('/auth/login')) {
      return RateLimit(maxRequests: 5, windowSeconds: 300);
    }
    if (path.contains('/transactions')) {
      return RateLimit(maxRequests: 100, windowSeconds: 60);
    }
    return RateLimit(maxRequests: 1000, windowSeconds: 60);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
// using AspNetCoreRateLimit
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("auth", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(5);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    options.AddFixedWindowLimiter("standard", limiterOptions =>
    {
        limiterOptions.PermitLimit = 100;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
    });

    options.RejectionStatusCode = 429;
});

// apply per controller
[EnableRateLimiting("auth")]
[HttpPost("login")]
public async Task<IActionResult> Login(LoginRequest request) { }

[EnableRateLimiting("standard")]
[HttpGet("transactions")]
public async Task<IActionResult> GetTransactions() { }
```

:::

::::

---

## 5. Broken Function Level Authorization (BFLA)

::: info What it is

A regular user gets access to functions or endpoints that should only be accessible to admins or privileged roles. The frontend hides the button, but the endpoint is still there, wide open.

A regular user token is used to call an admin endpoint. It works. The attacker now has admin functionality with a non-admin account.

Security through obscurity is not security. Hiding admin resources at the UI level doesn't equal security.

::: warning The Engineering Failure

RBAC (Role-Based Access Control) is either not implemented or implemented incorrectly. Authorization checks are missing at the function level. The assumption is that if a user can't see the admin button in the UI, they can't call the admin API. This assumption is always wrong. Any developer tool can call any API endpoint directly, bypassing the UI entirely.

:::

:::: tip The Engineering Fix

Every function must check the caller's role before executing. This check must happen in the service layer, not the UI layer, and not the API gateway alone. The gateway can verify that a token is valid. Only the service layer knows what roles are required for each specific operation.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
class UserManagementService {
  final AuthContext _authContext;
  final UserRepository _repository;

  UserManagementService(this._authContext, this._repository);

  Future<Result<void, AppException>> deleteUser(String targetUserId) async {
    final currentUser = _authContext.currentUser;

    // role check - this must happen in the service layer
    if (!currentUser.hasRole(UserRole.admin)) {
      return Result.failure(
        AppException.forbidden('Admin role required for this operation'),
      );
    }

    await _repository.deleteUser(targetUserId);
    return Result.success(null);
  }

  Future<Result<List<User>, AppException>> getAllUsers() async {
    final currentUser = _authContext.currentUser;

    if (!currentUser.hasRole(UserRole.admin)) {
      return Result.failure(
        AppException.forbidden('Admin role required'),
      );
    }

    final users = await _repository.findAll();
    return Result.success(users);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
[ApiController]
[Route("api/admin/users")]
[Authorize]
public class UserManagementController : ControllerBase
{
    private readonly IUserManagementService _service;

    [HttpDelete("{userId}")]
    [Authorize(Roles = "Admin")] 
    public async Task<IActionResult> DeleteUser(string userId)
    {
        await _service.DeleteUser(userId);
        return NoContent();
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _service.GetAllUsers();
        return Ok(users);
    }
}
```

:::

Role checks at the attribute level in C# and explicit role validation in the service layer in Dart both achieve the same thing: the check happens in code, not in the UI, and not in the API consumer's behavior.

::::

---

## 6. Unrestricted Access to Sensitive Business Flows

::: info What it is

Core business logic that should have strict guardrails has none. Users can bypass business rules and trigger flows that should never be allowed in their situation.

A sales agent creates a sale for a customer in an area that doesn't have coverage. The endpoint that creates the sale never verified that coverage exists. A business rule was violated. In financial terms, this causes loss. In operational terms, this causes the kind of problems that take months to untangle.

::: warning The Engineering Failure

Business logic isn't identified and isn't enforced at the domain layer. Domain-Driven Design exists precisely for this reason: business logic breaks or makes your application. When the domain layer isn't properly designed, and business rules aren't explicitly encoded, users can bypass them.

The guardrails are missing because the engineers didn't know the guardrails were supposed to exist there. This is a domain knowledge problem as much as a technical problem.

:::

:::: tip The Engineering Fix

Business rules belong in the domain layer. This is what Value Objects and domain entities enforce. A sale can't be created unless coverage is confirmed. That rule is encoded into the domain, not into the API endpoint or the UI.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
class Sale {
  final String agentId;
  final String customerId;
  final CoverageArea coverageArea;
  final SaleStatus status;

  Sale._({
    required this.agentId,
    required this.customerId,
    required this.coverageArea,
    required this.status,
  });

  // business rule enforced at domain creation - no coverage, no sale
  static Result<Sale, DomainException> create({
    required String agentId,
    required String customerId,
    required CoverageArea coverageArea,
  }) {
    if (!coverageArea.hasActiveCoverage) {
      return Result.failure(
        DomainException('Cannot create sale: customer area has no active coverage'),
      );
    }

    return Result.success(Sale._(
      agentId: agentId,
      customerId: customerId,
      coverageArea: coverageArea,
      status: SaleStatus.pending,
    ));
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
public class Sale
{
    private Sale(string agentId, string customerId, CoverageArea area)
    {
        AgentId = agentId;
        CustomerId = customerId;
        CoverageArea = area;
        Status = SaleStatus.Pending;
    }

    public string AgentId { get; }
    public string CustomerId { get; }
    public CoverageArea CoverageArea { get; }
    public SaleStatus Status { get; private set; }

    // factory enforces the business rule no coverage, no sale
    public static Result<Sale> Create(
        string agentId,
        string customerId,
        CoverageArea coverageArea)
    {
        if (!coverageArea.HasActiveCoverage)
            return Result.Failure<Sale>(
                "Cannot create sale: no active coverage in this area");

        return Result.Success(new Sale(agentId, customerId, coverageArea));
    }
}
```

:::

The endpoint that creates a sale calls the domain factory. The domain factory enforces the business rule. The rule can't be bypassed through the API because the API can't create a Sale that bypasses the factory.

::::

---

## 7. Security Misconfiguration

::: info What it is

A developer's personal debugging process shipped to production. Verbose error messages exposing stack traces. Debug endpoints left active. Permissive CORS allowing any origin. Sensitive data in logs. The developer's local configuration running in a production environment.

::: warning The Engineering Failure

These types of issues tend to happen when there's no separation between development, staging, and production configurations. There's no pipeline gate that catches misconfiguration before it reaches production. Each developer manages their own configuration, which means every developer's habits and debugging preferences can end up in production.

:::

::: tip The Engineering Fix

Set up different workflows for every environment. The production pipeline must include static analysis, configuration validation, and linting that catches debug endpoints, permissive CORS, verbose error logging, and exposed secrets before a merge is allowed.

**Dart (environment-aware error handling):**

```dart
class ErrorHandler {
  final Environment _environment;

  ErrorHandler(this._environment);

  Response handleException(Object error, StackTrace stackTrace) {
 
    logger.error('Unhandled exception', error: error, stackTrace: stackTrace);

    if (_environment.isProduction) {
      
      return Response.internalServerError(
        body: jsonEncode({'error': 'An internal error occurred'}),
      );
    }

    
    return Response.internalServerError(
      body: jsonEncode({
        'error': error.toString(),
        'stackTrace': stackTrace.toString(),
      }),
    );
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var error = context.Features.Get<IExceptionHandlerFeature>();
        if (error != null)
        {
            // log internally with full details
            logger.LogError(error.Error, "Unhandled exception");
        }

        // return generic message to caller
        await context.Response.WriteAsync(
            JsonSerializer.Serialize(new { error = "An internal error occurred" })
        );
    });
});

// CORS - explicit allowed origins, never wildcard in production
builder.Services.AddCors(options =>
{
    options.AddPolicy("ProductionPolicy", policy =>
    {
        policy.WithOrigins(
            "https://app.yourproduct.com",
            "https://admin.yourproduct.com"
        )
        .AllowedMethods("GET", "POST", "PUT", "DELETE")
        .AllowedHeaders("Authorization", "Content-Type");
        
    });
});
```

:::

CORS in production must use explicit allowed origins. Wildcard CORS in production is a direct security failure that allows any web page on the internet to make authenticated requests to your API using the visitor's credentials.

::::

---

## 8. Improper Inventory Management

::: info What it is

Deprecated APIs, decommissioned endpoints, and outdated API versions still running on the server. Nobody knows they exist and nobody owns them. But attackers find them and exploit them because old endpoints are often less secured than current ones.

::: warning The Engineering Failure

API lifecycle management is nobody's formal responsibility. Endpoints get created and features change. The old endpoint version is forgotten rather than retired. Over time, the API surface area grows with dead endpoints that still respond to requests, often without the security controls applied to newer endpoints.

:::

:::: tip The Engineering Fix

Someone must own the API inventory. This is a formal engineering responsibility, not an optional practice. Every API endpoint must be documented, versioned, and have a defined lifecycle: active, deprecated, or decommissioned.

Deprecated endpoints should return a response header indicating their deprecation date. Decommissioned endpoints must return 410 Gone, not continue to process requests.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
// deprecated endpoint wrapper
Handler deprecatedEndpoint({
  required Handler handler,
  required DateTime removalDate,
  required String replacementEndpoint,
}) {
  return (Request request) async {
    final response = await handler(request);

    // add deprecation headers so clients know to migrate
    return response.change(headers: {
      'Deprecation': 'true',
      'Sunset': HttpDate.format(removalDate),
      'Link': '<$replacementEndpoint>; rel="successor-version"',
      'Warning': '299 - "This endpoint is deprecated and will be removed on ${removalDate.toIso8601String()}"',
    });
  };
}

// decommissioned endpoint
Future<Response> decommissionedEndpoint(Request request) async {
  return Response(
    410,
    body: jsonEncode({
      'error': 'This endpoint has been permanently removed',
      'replacement': '/api/v2/accounts',
    }),
  );
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
// mark endpoints as deprecated using ApiVersion attributes
[ApiController]
[ApiVersion("1.0", Deprecated = true)]
[Route("api/v{version:apiVersion}/accounts")]
public class AccountsV1Controller : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetAccount(string id)
    {
        Response.Headers.Add("Deprecation", "true");
        Response.Headers.Add("Sunset", "Sat, 01 Jan 2027 00:00:00 GMT");
        Response.Headers.Add("Link", "</api/v2/accounts/{id}>; rel=\"successor-version\"");

        // still process the request during deprecation period
        return Ok(_service.GetAccount(id));
    }
}

// gone - permanent removal
[ApiController]
[Route("api/v1/legacy/accounts")]
public class LegacyAccountsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return StatusCode(410, new { error = "This endpoint has been permanently removed", replacement = "/api/v2/accounts" });
    }
}
```

:::

::::

---

## 9. Unsafe Consumption of APIs

::: info What it is

Your application integrates with third-party services and trusts their data without validation or guardrails. Whatever the external API returns, your application processes it directly.

A third-party payment callback returns a transaction status. Your application trusts it without verifying the signature or validating the data structure. An attacker sends a forged callback to your callback URL. Your application processes it as legitimate.

::: warning The Engineering Failure

External services are treated as trusted by default. There's no defined contract for what valid data from an external service looks like. There's no validation layer between the external service response and the application's processing logic.

Trust is assumed rather than verified.

:::

::: tip The Engineering Fix

Every integration with an external service must have a defined contract. The contract specifies what valid data looks like, what fields are required, and what the valid ranges and formats are. Every response from an external service is validated against this contract before any processing happens.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class PaymentCallbackService {
  final String _webhookSecret;

  PaymentCallbackService(this._webhookSecret);

  Future<Result<PaymentStatus, AppException>> processCallback(
    Map<String, dynamic> payload,
    String signature,
    String rawBody,
  ) async {
    // step 1: verify the signature before processing anything
    final isValid = _verifySignature(rawBody, signature, _webhookSecret);
    if (!isValid) {
      logger.warning('Invalid webhook signature received');
      return Result.failure(
        AppException.unauthorized('Invalid webhook signature'),
      );
    }

    // step 2: validate the payload structure against our contract
    final validationResult = _validateCallbackPayload(payload);
    if (validationResult.isFailure) {
      logger.warning('Invalid callback payload: ${validationResult.error}');
      return Result.failure(validationResult.error!);
    }

    // step 3: only now do we trust and process the data
    final status = PaymentStatus.fromString(payload['status'] as String);
    return Result.success(status);
  }

  bool _verifySignature(String body, String signature, String secret) {
    final hmac = Hmac(sha256, utf8.encode(secret));
    final digest = hmac.convert(utf8.encode(body));
    final expectedSignature = 'sha256=${base64.encode(digest.bytes)}';
    return expectedSignature == signature;
  }

  Result<void, AppException> _validateCallbackPayload(
    Map<String, dynamic> payload,
  ) {
    if (!payload.containsKey('transaction_id')) {
      return Result.failure(
        AppException.validation('Missing required field: transaction_id'),
      );
    }
    if (!payload.containsKey('status')) {
      return Result.failure(
        AppException.validation('Missing required field: status'),
      );
    }
    final validStatuses = {'success', 'failed', 'pending'};
    if (!validStatuses.contains(payload['status'])) {
      return Result.failure(
        AppException.validation('Invalid status value: ${payload['status']}'),
      );
    }
    return Result.success(null);
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs :collapsed-lines
public class PaymentCallbackService
{
    private readonly string _webhookSecret;
    private readonly ILogger<PaymentCallbackService> _logger;

    public async Task<Result<PaymentStatus>> ProcessCallback(
        string rawBody,
        string signature,
        PaymentCallbackDto payload)
    {
        // verify signature first
        if (!VerifySignature(rawBody, signature))
        {
            _logger.LogWarning("Invalid webhook signature received");
            return Result.Failure<PaymentStatus>("Invalid webhook signature");
        }

        // validate payload
        if (string.IsNullOrEmpty(payload.TransactionId))
            return Result.Failure<PaymentStatus>("Missing transaction_id");

        var validStatuses = new[] { "success", "failed", "pending" };
        if (!validStatuses.Contains(payload.Status))
            return Result.Failure<PaymentStatus>($"Invalid status: {payload.Status}");

        return Result.Success(Enum.Parse<PaymentStatus>(payload.Status, true));
    }

    private bool VerifySignature(string body, string signature)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_webhookSecret));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(body));
        var expectedSignature = $"sha256={Convert.ToBase64String(hash)}";
        return CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(expectedSignature),
            Encoding.UTF8.GetBytes(signature)
        );
    }
}
```

:::

It must be a standard of engineering to create verified contracts with external services before integration begins. Never trust, always verify.

::::

---

## 10. Server-Side Request Forgery (SSRF)

::: info What it is

An API accepts a URL as input and makes a server-side request to that URL. An attacker provides a URL that points to internal infrastructure: `http://169.254.169.254/latest/meta-data/` (AWS metadata service), `http://internal-database:5432`, or `http://admin-panel.internal`. The server makes the request from inside the network, bypassing external firewalls.

Most payment systems take callback URLs or redirect URLs in the request. If the API forwards requests to those URLs without validation, it will happily make requests to internal infrastructure on behalf of the attacker.

::: warning The Engineering Failure

This is a design flaw that must be caught at the architectural layer, not the code layer. Any API that accepts URLs as input and makes server-side requests to those URLs is a potential SSRF target. The design decision to accept arbitrary URLs must come with the design decision to strictly validate those URLs.

:::

:::: tip The Engineering Fix

Any API that accepts a URL must validate it against a list of allowed domains before making any request. This is a design decision. The allowlist is part of the API's specification, not an afterthought.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart :collapsed-lines
class WebhookService {
  // only these domains are allowed to receive callbacks
  static const _allowedDomains = {
    'api.yourpartner.com',
    'hooks.yourintegration.com',
    'callbacks.trustedservice.io',
  };

  Future<Result<void, AppException>> registerCallbackUrl(String url) async {
    // validate before storing or using
    final validationResult = _validateCallbackUrl(url);
    if (validationResult.isFailure) {
      return Result.failure(validationResult.error!);
    }

    await _webhookRepository.save(url);
    return Result.success(null);
  }

  Result<void, AppException> _validateCallbackUrl(String url) {
    final uri = Uri.tryParse(url);

    if (uri == null) {
      return Result.failure(AppException.validation('Invalid URL format'));
    }

    // must be HTTPS in production
    if (uri.scheme != 'https') {
      return Result.failure(
        AppException.validation('Callback URL must use HTTPS'),
      );
    }

    // must be in the allowlist
    if (!_allowedDomains.contains(uri.host)) {
      return Result.failure(
        AppException.validation(
          'Callback URL domain is not in the approved list',
        ),
      );
    }

    // block internal IP ranges explicitly
    if (_isInternalAddress(uri.host)) {
      return Result.failure(
        AppException.validation('Callback URL cannot point to internal addresses'),
      );
    }

    return Result.success(null);
  }

  bool _isInternalAddress(String host) {
    final privateRanges = [
      '127.', '10.', '172.16.', '172.17.', '172.18.',
      '192.168.', '169.254.', 'localhost', '0.0.0.0',
    ];
    return privateRanges.any((range) => host.startsWith(range));
  }
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs :collapsed-lines
public class WebhookService
{
    private static readonly HashSet<string> AllowedDomains = new()
    {
        "api.yourpartner.com",
        "hooks.yourintegration.com",
        "callbacks.trustedservice.io"
    };

    public async Task<Result<bool>> RegisterCallbackUrl(string url)
    {
        var validationResult = ValidateCallbackUrl(url);
        if (!validationResult.IsSuccess)
            return Result.Failure<bool>(validationResult.Error);

        await _repository.SaveCallbackUrl(url);
        return Result.Success(true);
    }

    private Result<bool> ValidateCallbackUrl(string url)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var uri))
            return Result.Failure<bool>("Invalid URL format");

        if (uri.Scheme != "https")
            return Result.Failure<bool>("Callback URL must use HTTPS");

        if (!AllowedDomains.Contains(uri.Host))
            return Result.Failure<bool>("Domain not in approved list");

        if (IsInternalAddress(uri.Host))
            return Result.Failure<bool>("Internal addresses are not permitted");

        return Result.Success(true);
    }

    private bool IsInternalAddress(string host)
    {
        var internalPrefixes = new[]
        {
            "127.", "10.", "172.16.", "192.168.",
            "169.254.", "localhost", "0.0.0.0"
        };
        return internalPrefixes.Any(p => host.StartsWith(p));
    }
}
```

:::

::::

---

## Engineering Vulnerabilities Beyond the OWASP List

The OWASP list covers the most critical and most common API vulnerabilities. But engineering experience surfaces additional patterns that can create serious security gaps.

### APIs Called by Multiple Clients Without Domain Allowlisting

Some APIs called by multiple clients don't enforce which domains are allowed to call them. This makes it possible for people to share API keys and access resources from unauthorized origins.

In large-scale organizations, this is a major security gap that often goes unnoticed because the API technically works correctly from every client.

The fix: every API that accepts an API key must also validate the calling domain. API keys and allowed domains must be explicitly paired.

### Exposing Secrets in Code and Logs

A developer leaves secret keys, public keys, and credentials in their code, in their repository, or on their machine. Adding files to `.gitignore` isn't enough. These datasets must be fetched from a trusted secrets manager at runtime, never stored in source code.

Organizations must use vaults, Azure App Configuration, AWS Secrets Manager, or equivalent systems. This must be an engineering standard, not a developer preference. The vault access pattern must be standardized so developers don't have to figure this out per project.

### Microservices Talking to Each Other Without a Gateway

If you are building microservices, every communication between services must be treated as sensitive. There must be an API gateway that handles authentication for all services. Services must not trust each other implicitly. Every inter-service call must be authenticated.

Communication between microservices should use event brokers like Kafka for asynchronous flows, or mTLS for synchronous flows. No microservice should be directly accessible from the internet without going through the gateway.

### Encryption Without Organizational Standards

Organizations must have standardized encryption algorithms. Not developer-chosen algorithms, not algorithm-of-the-week, and not whatever the developer found in a Stack Overflow answer. A staff-level engineering decision must specify which algorithm, which mode, and which key length is the organizational standard.

The vulnerabilities that come from ad-hoc encryption choices are serious: padding oracle attacks, weak key lengths, IV reuse, and stack traces during encryption failures that reveal internal implementation details to callers.

The engineering control: expose internally built packages or cloud functions for encryption that projects import rather than implement. Developers use the package. They never write encryption from scratch per project.

### SQL Injection

SQL injection is 25 years old. It's been in existence since 1998. But it still happens because engineering standards aren't enforced.

It happens because developers build queries with string concatenation, taking user input and gluing it into a SQL string. The fix is parameterized queries or prepared statements, always. Raw SQL strings with user input concatenated are never acceptable.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-dart-lang"/>

```dart
//Wrong  string concatenation — SQL injection vulnerability
Future<User?> findUser(String email) async {
  final query = "SELECT * FROM users WHERE email = '$email'";
  // attacker passes: admin@example.com' OR '1'='1
  // query becomes: SELECT * FROM users WHERE email = 'admin@example.com' OR '1'='1'
  // returns all users
  return await database.rawQuery(query);
}

// parameterized query — injection proof
Future<User?> findUser(String email) async {
  final results = await database.query(
    'users',
    where: 'email = ?',    
    whereArgs: [email],     
  );
  return results.isNotEmpty ? User.fromMap(results.first) : null;
}
```

@tab <VPIcon icon="iconfont icon-csharp"/>

```cs
// Wrong string concatenation
public async Task<User?> FindUser(string email)
{
    var query = $"SELECT * FROM Users WHERE Email = '{email}'";
    return await _context.Users.FromSqlRaw(query).FirstOrDefaultAsync();
}

// Correct parameterized query using EF Core
public async Task<User?> FindUser(string email)
{
    return await _context.Users
        .Where(u => u.Email == email)
        .FirstOrDefaultAsync();
}

// Correct parameterized raw SQL when needed
public async Task<User?> FindUserRaw(string email)
{
    return await _context.Users
        .FromSqlRaw("SELECT * FROM Users WHERE Email = {0}", email)
        .FirstOrDefaultAsync();
}
```

:::

This is a major vulnerability that comes from core engineering decisions that should be under strict governance and compliance principles. These principles help establish development standards on projects and in organizations.

This could also be enforced at CI CD level. If static analysis in the CI/CD pipeline doesn't catch raw SQL string concatenation, your team should add it. This is a vulnerability class that should never reach production.

---

## Conclusion

Every vulnerability in this list has one thing in common: it was preventable. Not by security tools applied after the fact, but by engineering discipline applied during design and development.

- BOLA is prevented by ID-aware authorization in the service layer.
- Broken authentication is prevented by proper token design and rate limiting.
- BOPLA is prevented by explicit response DTOs.
- Unrestricted resource consumption is prevented by rate limiting at the gateway.
- BFLA is prevented by role checks in code, not in the UI.
- Sensitive business flow exposure is prevented by domain-driven design and proper business rule enforcement.
- Security misconfiguration is prevented by environment-specific pipelines with automated gates.
- Improper inventory management is prevented by formal API lifecycle ownership.
- Unsafe API consumption is prevented by contract-first external integrations.
- SSRF is prevented by URL allowlisting as a design decision.

The pattern is consistent. Security isn't something you add to an application. It's something you engineer into the architecture from the beginning. Every decision in this article is an engineering decision: where does this check belong in the architecture? Which layer is responsible for this validation? What does the domain enforce? What does the gateway enforce? What does the pipeline catch?

Security by design isn't a security team's responsibility. It's an engineering team's responsibility. And it starts with understanding exactly what these vulnerabilities are, where they come from, and what the engineering standard is to prevent them.

As software engineers, this kind of next level thinking ensures our code doesn't fail these security tests.

Happy Secured Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Engineering Anatomy of API Vulnerabilities: A Deep Dive into the OWASP API Security Top 10",
  "desc": "Most security articles read like threat reports. They describe vulnerabilities from the outside looking in: what an attacker does, what the impact is, and how many systems are affected globally. That'",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/engineering-anatomy-of-api-vulnerabilities-owasp-api-security-top-10.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
