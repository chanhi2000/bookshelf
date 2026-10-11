---
lang: en-US
title: "Secure by Design: How to Engineer Security into Architecture Before Writing Any Code"
description: "Article(s) > Secure by Design: How to Engineer Security into Architecture Before Writing Any Code"
icon: fas fa-shield-halved
category:
  - Dart
  - Flutter
  - C#
  - DevOps
  - Github
  - Security
  - Data Science
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
  - github
  - sec
  - security
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Secure by Design: How to Engineer Security into Architecture Before Writing Any Code"
    - property: og:description
      content: "Secure by Design: How to Engineer Security into Architecture Before Writing Any Code"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/secure-by-design-engineer-security-into-architecture-before-writing-code.html
prev: /articles/README.md
date: 2026-10-15
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/47f24cb6-f4b9-40eb-9690-db750358c4d6.png
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
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
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

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Secure by Design: How to Engineer Security into Architecture Before Writing Any Code"
  desc="There's a conversation that happens in most engineering teams,maybe usually too late. Think of this, a feature ships to production. A security review happens afterwards, or a penetration test finds so"
  url="https://freecodecamp.org/news/secure-by-design-engineer-security-into-architecture-before-writing-code"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/47f24cb6-f4b9-40eb-9690-db750358c4d6.png"/>

There's a conversation that happens in most engineering teams,maybe usually too late.

Think of this, a feature ships to production. A security review happens afterwards, or a penetration test finds something, or worse, an incident report lands in your inbox.

The vulnerability is real. The fix is expensive. And somewhere in the conversation, someone says "we need to add security to this."

That phrase is the problem. Security isn't something you add to software. It's something you build into it from the beginning. The moment you're talking about adding security to something that already exists, you're already in damage control mode.

Secure by Design is a different mindset entirely whereby you define security requirements before you make architecture decisions. You understand the threat model before writing a single class. You identify and enforce business rules at the domain layer. All of these things comes with what engineering has to offer, not a layer that tops up what has been built already.

The CI/CD pipeline catches what human review misses. Every layer of the system is designed with an attacker's perspective in mind, not as an afterthought, but as a foundational requirement.

This isn't a security team's responsibility. It's an engineering team's responsibility. And it starts before the first pull request.

In this handbook, I'll take you through all you need to understand on how your engineering team can cultivate the discipline of having security in mind whilst designing.

::: note Prerequisites

Before reading this article, you should be comfortable with:

- Building APIs and backend systems in any language or framework
- General software architecture concepts: layers, services, gateways
- What CI/CD pipelines are and how they work at a high level
- Basic understanding of what encryption and hashing mean

You don't need a security background. This article approaches every concept from an engineering and architecture perspective.

:::

---

## What Secure by Design Actually Means

Secure by Design isn't a checklist. It's not a set of tools you install. It's a way of thinking about software that treats security requirements the same way you treat functional requirements. In this mode of work, you treat your security requirements as things that must be satisfied before the system is considered complete.

Most teams treat security passively. Something breaks, something gets flagged, and something gets patched. The cycle repeats. The system accumulates technical security debt the same way it accumulates any other technical debt, just with higher stakes.

Secure by Design teams treat security proactively. Before a feature is built, the engineering team asks: what are the threats against this feature? Where is the data sensitive? What happens if an attacker controls this input? What is the blast radius if this component is compromised? The answers shape the architecture, not the other way around.

This produces fundamentally different systems. Not because the individual components are different, but because the design decisions at every layer reflect an understanding of what can go wrong.

Perfect instances are as follows :  
The API gateway rate-limits by default because the design accounted for abuse.  
The domain layer enforces business rules because the design identified where those rules belong.  
The CI/CD pipeline catches secrets in code because the design included that gate from the start. etc

The cost of getting security right at design time is a fraction of the cost of trying to fix or manage it. And the cost of managing it is a fraction of the cost of a major incident. Its just a matter of time!

---

## Threat Modeling: Understanding Your Attack Surface Before You Build

Threat modeling is the process of systematically identifying what can go wrong with a system before it's built. It's a formal engineering activity, not a security team exercise.

The goal is simple: understand who might attack your system, what they might want, how they might try to get it, and what the impact would be if they succeeded. With that understanding, you make deliberate design decisions that reduce the likelihood and impact of those attacks.

### The Four Questions of Threat Modeling

#### 1. What are we building?

This particular usecase starts by mapping the system. What are the components? How do they communicate? Where does data flow? Where are the trust boundaries, the points where data crosses from one context of trust to another?

A trust boundary exists between your API gateway and the internet, between your service layer and the database, and between your system and a third-party integration. Every trust boundary is a potential attack surface.

Here you have to draw the data flow, map every place where data enters the system, where it's stored, where it's processed, and where it leaves. This gives you a complete picture of what you're protecting.

#### 2. What can go wrong?

In this usecase, you ask for each component and each data flow, what can an attacker do. Here comes **STRIDE.** This is an acronymn of laid down questions that helps fulfil this particular usecase.

- **Spoofing:** Can an attacker pretend to be someone they're not? Can they forge a token, impersonate a user, or claim an identity they don't own?
- **Tampering:** Can an attacker modify data in transit or at rest? Can they change a transaction amount, modify a callback payload, or alter a stored record?
- **Repudiation:** Can a user deny having performed an action? Are there sufficient audit logs to prove what happened, when, and by whom?Can we prove that a user performed am action on the system?
- **Information Disclosure:** Can an attacker learn something they shouldn't? Can they read another user's data, extract internal system information from error responses, or discover internal infrastructure details from stack traces?
- **Denial of Service:** Can an attacker prevent legitimate users from accessing the system? Can they exhaust resources, trigger expensive operations, or overwhelm the system with traffic?
- **Elevation of Privilege:** Can an attacker gain permissions they weren't granted? Can a regular user access admin functions, or can an external caller reach internal APIs?

#### 3. What are we going to do about it?

For each identified threat, we decide on a countermeasure. Mitigate it by reducing the likelihood or impact. Transfer it by using a managed service that handles it. Accept it if the risk is genuinely low and the mitigation cost is too high. Eliminate it by changing the design so the threat no longer applies.

The decision is explicit and documented. Not implicit or [<VPIcon icon="fas fa-globe"/>assumed.It](http://assumed.It) must be documented.

#### 4. Did we do a good enough job?

After the system is built, verify that the countermeasures were actually implemented. Threat modeling is a living document, not a one-time exercise. When the system changes, the threat model must be revisited.

### What Threat Modeling Produces

A threat model produces two things that are genuinely valuable: a list of security requirements that must be satisfied before the system ships, and an understanding of where the high-risk areas are, so engineering effort is focused correctly.

Without a threat model, security is applied uniformly and often superficially. Every component gets the same level of attention regardless of its actual risk level. With a threat model, you know which components are high-risk, which data flows are sensitive, and where the engineering effort should be concentrated.

---

## Security as a Business Rule

Domain-Driven Design teaches us that business logic makes or breaks an application. The domain layer is where the rules that define the system's correctness live. Security requirements are business rules, and they belong in the domain layer alongside every other business rule.

A sales agent shouldn't be able to create a sale without confirmed coverage. That's a business rule. It belongs in the domain entity or domain service that creates sales, enforced at the point of creation, impossible to bypass from any layer above.

A payment shouldn't transition from pending to completed without going through the processing state. That's a business rule. It belongs in the Payment entity's state machine, enforced at the entity level, impossible to corrupt through the API or the infrastructure layer.

An account transfer shouldn't proceed if the source account is flagged for fraud review. That's both a business rule and a security requirement. It belongs in the domain service that orchestrates transfers, enforced before any money moves.

When security requirements are encoded as domain business rules, they can't be bypassed by calling the API directly, by using a different client, or by accessing the database through an ORM. The rule is enforced at the point where the domain object is created or its state is changed. Every path through the system hits the domain layer. The domain layer enforces the rule.

Value Objects strengthen this further. A Money value object that validates on construction means no invalid amount can ever exist in the domain. An AccountNumber value object that validates format and check digits means no malformed account number can enter the system. The validation isn't a controller check that can be skipped. It's an intrinsic property of the type itself.

This is the engineering mechanism for Secure by Design at the domain level: encode security requirements as constraints on domain types and domain operations, and make them impossible to bypass.

---

## Encryption Standards: The Organizational Decision

One of the most dangerous security decisions in most organizations is the one that's not made: what encryption standard does the organization use?

When there is no organizational standard, every developer makes their own choice. One team uses AES-128. Another uses AES-256 with CBC mode. A third uses AES-256 with GCM mode. A fourth is still using MD5 for something.

Nobody intended for this to happen. It happened because nobody made the decision at the organizational level and enforced it.

The vulnerabilities that come from ad-hoc encryption choices are serious and often subtle. Padding oracle attacks exploit specific combinations of cipher mode and error handling. CBC mode with improper IV generation is vulnerable to attacks that GCM mode is not. Weak key lengths can be brute-forced. Exposing stack traces during encryption failures reveals internal implementation details that help attackers.

Every organization that handles sensitive data must make these decisions explicitly and enforce them as engineering standards:

### 1. Which Symmetric Encryption Algorithm and Mode?

Symmetric encryption uses the same key to encrypt and decrypt data. It is fast and efficient, making it the right choice for encrypting large amounts of data at rest or in transit.

**AES-256 with GCM mode** is the current standard for most applications. AES stands for Advanced Encryption Standard. The 256 refers to the key size in bits: usually a longer key means more possible combinations and a harder brute force attack.

GCM (Galois/Counter Mode) provides authenticated encryption, meaning it both encrypts the data and produces an authentication tag that detects whether the ciphertext has been tampered with. You get confidentiality and integrity in one operation.

CBC (Cipher Block Chaining) mode is still used but requires careful handling of initialization vectors (IVs) and message authentication codes (MACs) to achieve the same properties GCM provides natively. Getting this wrong opens the door to padding oracle attacks, where an attacker can decrypt data or forge ciphertext by carefully observing how the system responds to modified ciphertext.

### 2. Which Hashing Algorithm for Passwords?

Hashing is a one-way operation. You can't reverse a hash back into the original value. This is why you store a hash of a password, not the password itself. When a user logs in, you hash what they typed and compare it to the stored hash.

**bcrypt, scrypt, and Argon2** are the current standards for password hashing. These algorithms are deliberately slow and computationally expensive, which makes brute force attacks impractical even when an attacker obtains the hash database.

**SHA-256 isn't a password hashing algorithm.** It's a general-purpose cryptographic hash function that is fast by design...and this is exactly what you don't want for passwords. An attacker can try billions of SHA-256 hashes per second on modern hardware.

**MD5 isn't a hashing algorithm for anything sensitive.** It was broken years ago and should never appear in any security-sensitive context. These aren't just my opinions. They're the product of cryptographic research and real-world attacks.

### 3. Which Asymmetric Algorithms for Signing and Key Exchange?

Asymmetric encryption uses a pair of keys: a public key that anyone can see and a private key that only you hold. Data encrypted with the public key can only be decrypted with the private key. A signature created with the private key can be verified by anyone with the public key.

Use **RSA-2048 at a minimum** for asymmetric operations. Use **RS256 or ES256** for JWT signing in high-security contexts. RS256 uses RSA with SHA-256 for signing. ES256 uses Elliptic Curve Digital Signature Algorithm (ECDSA) with the P-256 curve. EC keys are generally preferred over RSA at equivalent security levels because they produce smaller keys and signatures while providing the same cryptographic strength.

### 4. How Encryption is Delivered to Developers

The most important decision is that you don't implement encryption from scratch per project. Staff engineers build encryption utilities as internal packages or cloud functions. Then you can import and use them. You should never write the cryptographic primitives yourself. This eliminates an entire category of implementation failures at the source.

When encryption implementation is centralized, fixing a vulnerability means fixing it in one place. When it's scattered across every project, fixing a vulnerability means finding every implementation first, which is often impossible.

---

## Database Security

The database is where the most sensitive data in most systems lives. It's also one of the most frequently misconfigured components in the entire stack.

### SQL Injection

SQL injection is 25 years old. It has existed since 1998. It still appears in production systems because engineering standards aren't enforced.

The cause is always the same: string concatenation. A developer takes user input and glues it directly into a SQL string. The database can't distinguish between the query the developer intended and the query the attacker constructed.

```sql
-- developer intended this
SELECT * FROM users WHERE email = 'user@example.com'

-- attacker passes: anything@example.com' OR '1'='1
SELECT * FROM users WHERE email = 'anything@example.com' OR '1'='1'
-- returns every user in the table
```

The fix is parameterized queries or ORMs, always. The query structure is fixed. The values are passed separately. The database treats them as data, not as part of the query structure.

Static analysis in the CI/CD pipeline must flag raw SQL string concatenation. This is a zero-tolerance policy. Raw SQL strings with user input concatenated are never acceptable and must not reach production.

### Principle of Least Privilege for Database Access

The application's database user should have exactly the permissions it needs and nothing more. A read-only reporting endpoint should connect as a user with SELECT permissions only. It shouldn't have INSERT, UPDATE, or DELETE. An API that only writes shouldn't have DROP TABLE permissions.

This limits the blast radius of a successful SQL injection or credential leak. If the application can only SELECT from specific tables, an attacker who compromises the database credentials can only SELECT from those tables. They can't DROP the database, INSERT false records, or UPDATE account balances.

This is a database provisioning decision that must be made explicitly for each application component and enforced at the infrastructure level.

### All Database Connections Must Be Encrypted

Database connections must use TLS. An unencrypted database connection transmits query results in plaintext on the network. Any component between the application and the database that can observe network traffic can read every query result.

In cloud environments, services often communicate over internal networks that feel secure but are not. Encrypting database connections isn't optional.

Here's what enforcing TLS on a database connection looks like in practice:

```dart
final connection = await Connection.open(
  Endpoint(
    host: 'your-db-host.example.com',
    port: 5432,
    database: 'your_database',
    username: dbUser,
    password: dbPassword,
  ),
  settings: ConnectionSettings(
    sslMode: SslMode.require,
  ),
);
```

```cs
var connectionString =
    "Host=your-db-host.example.com;" +
    "Port=5432;" +
    "Database=your_database;" +
    "Username=db_user;" +
    "Password=db_password;" +
    "SSL Mode=Require;" +
    "Trust Server Certificate=false;";

await using var dataSource = NpgsqlDataSource.Create(connectionString);
```

Setting `SSL Mode=Require` means the connection will fail entirely if the database server doesn't support TLS. This is the correct posture. A connection that silently falls back to plaintext when TLS is unavailable provides no protection at all.

### Database Credentials Must Live in Vaults

Database credentials must be fetched from a secrets manager at runtime. Not stored in configuration files, committed to version control, or hardcoded in connection strings.

Here's how runtime credential fetching works in practice:

```dart
final dbHost = Platform.environment['DB_HOST']!;
final dbUser = Platform.environment['DB_USER']!;
final dbPassword = Platform.environment['DB_PASSWORD']!;

final connection = await Connection.open(
  Endpoint(
    host: dbHost,
    database: 'your_database',
    username: dbUser,
    password: dbPassword,
  ),
  settings: ConnectionSettings(sslMode: SslMode.require),
);
```

```cs
builder.Configuration.AddAzureKeyVault(
    new Uri("https://your-vault.vault.azure.net/"),
    new DefaultAzureCredential()
);

var connectionString = builder.Configuration["DatabaseConnectionString"];
```

Connection pooling must also be properly controlled. An unbounded connection pool can exhaust the database server's available connections, taking it down for all tenants. Configure pool size deliberately:

```cs
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
dataSourceBuilder.ConnectionStringBuilder.MaxPoolSize = 20;
dataSourceBuilder.ConnectionStringBuilder.MinPoolSize = 5;
dataSourceBuilder.ConnectionStringBuilder.ConnectionIdleLifetime = 300;
await using var dataSource = dataSourceBuilder.Build();
```

### Stored Procedures as a Parameterization Strategy

A stored procedure is a named, pre-compiled SQL block stored inside the database itself. Instead of sending a full SQL string from your application, you call the procedure by name and pass parameters separately.

Because the SQL structure is fixed inside the database and the parameters are always treated as data (never concatenated into the query string), stored procedures are resistant to SQL injection.

```sql
CREATE OR REPLACE PROCEDURE get_user_by_email(p_email VARCHAR(255))
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT id, first_name, last_name, email
    FROM users
    WHERE email = p_email;
END;
$$;
```

```cs
public async Task<User?> FindUserByEmail(string email)
{
    await using var command = dataSource.CreateCommand("get_user_by_email");
    command.CommandType = CommandType.StoredProcedure;
    command.Parameters.AddWithValue("p_email", email);

    await using var reader = await command.ExecuteReaderAsync();
    if (await reader.ReadAsync())
    {
        return new User
        {
            Id = reader.GetGuid(0),
            FirstName = reader.GetString(1),
            LastName = reader.GetString(2),
            Email = reader.GetString(3)
        };
    }
    return null;
}
```

An attacker who passes `' OR '1'='1` as the email value gets exactly that string as the parameter. The database never interprets it as SQL syntax. The procedure only executes the fixed query defined at creation time. This is one of the reasons stored procedures remain a legitimate security tool, not just a performance optimization.

---

## CORS: The Boundary Your API Enforces

Cross-Origin Resource Sharing is the browser security mechanism that controls which domains can make requests to your API from web pages.

The most common CORS misconfiguration in production is also the most dangerous: wildcard CORS.

```plaintext
Access-Control-Allow-Origin: *
```

This tells every browser that any web page on the entire internet can make authenticated requests to your API using that user's credentials. An attacker hosts a malicious web page, a user visits it, and the attacker's page can make requests to your API as that user.

In development, wildcard CORS is convenient. In production, it's a vulnerability.

Every production API must configure CORS with explicit allowed origins. Not wildcard patterns. Not `*.yourapp.com`. Explicit, enumerated domains that are allowed to make cross-origin requests.

```plaintext
Access-Control-Allow-Origin: https://app.yourproduct.com
Access-Control-Allow-Origin: https://admin.yourproduct.com
```

Domain matching must be exact. If the origin header doesn't match one of the explicitly allowed origins, the browser won't include the response.

The allowed methods and allowed headers must also be explicit. The default deny posture applies: if it's not explicitly allowed, it's not allowed.

This is a configuration decision made at the API gateway or the framework level. It applies uniformly to all API endpoints, not endpoint by endpoint where individual developers might misconfigure it.

---

## Structured Logging and Field-Level Masking

Logging is one of the most overlooked security surfaces in most systems. Developers add log statements to help debug. Those log statements travel to a logging platform. That logging platform retains logs for months or years. Those logs contain whatever the developer thought was useful to log when they were debugging at 11pm during an incident.

The result is that production logs often contain information that shouldn't be shared. For example, full request and response bodies, authorization headers with bearer tokens, user IDs paired with sensitive operations, account numbers, and sometimes passwords in plaintext because someone logged the raw request body before validation ran.

Again, this isn't hypothetical. These are real patterns found in real production logging platforms.

The engineering control is field-level masking applied at the logging framework level. Sensitive fields are defined once in the logging configuration. The framework masks those fields automatically in every log statement, in every environment, regardless of what the developer puts in the log statement.

Sensitive fields that must never appear in logs include: passwords, tokens and authorization headers, full account numbers and card numbers, BVN and NIN, any national identifier, encryption keys and secrets, and full request bodies for endpoints that handle sensitive data.

The masking must be framework-level, not developer-level. If you add a log statement, you shouldn't have to remember to mask sensitive fields. The framework handles it. You'll just log whatever is useful for debugging. The framework produces a log entry where sensitive fields are replaced with masked values.

Here's what field-level masking looks like in practice:

```dart
class SecureLogger {
  final Logger _logger;

  static const _sensitiveKeys = {
    'password', 'authorization', 'token',
    'account_number', 'card_number', 'bvn', 'nin', 'secret', 'api_key',
  };

  SecureLogger(this._logger);

  void info(String message, {Map<String, dynamic>? data}) {
    _logger.info(message, _mask(data));
  }

  void error(String message, {Map<String, dynamic>? data, Object? error}) {
    _logger.error(message, _mask(data), error);
  }

  Map<String, dynamic>? _mask(Map<String, dynamic>? data) {
    if (data == null) return null;
    return data.map((key, value) {
      if (_sensitiveKeys.contains(key.toLowerCase())) {
        return MapEntry(key, '***MASKED***');
      }
      if (value is Map<String, dynamic>) return MapEntry(key, _mask(value));
      return MapEntry(key, value);
    });
  }
}

final logger = SecureLogger(Logger('PaymentService'));

logger.info('Processing payment', data: {
  'transaction_id': 'txn_001',
  'amount': 50000,
  'account_number': '0123456789',
  'authorization': 'Bearer eyJ...',
});
//
// Processing payment
// { transaction_id: txn_001, amount: 50000,
//   account_number: ***MASKED***, authorization: ***MASKED*** }
```

```cs
public class MaskSensitiveFieldsPolicy : IDestructuringPolicy
{
    private static readonly HashSet<string> SensitiveFields =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "password", "authorization", "token", "account_number",
            "card_number", "bvn", "nin", "secret", "api_key"
        };

    public bool TryDestructure(
        object value,
        ILogEventPropertyValueFactory factory,
        out LogEventPropertyValue result)
    {
        if (value is not IDictionary<string, object> dict)
        {
            result = null!;
            return false;
        }

        var properties = dict.Select(kvp => new LogEventProperty(
            kvp.Key,
            SensitiveFields.Contains(kvp.Key)
                ? factory.CreatePropertyValue("***MASKED***")
                : factory.CreatePropertyValue(kvp.Value, true)));

        result = new StructureValue(properties);
        return true;
    }
}

Log.Logger = new LoggerConfiguration()
    .Destructure.With<MaskSensitiveFieldsPolicy>()
    .WriteTo.Console()
    .CreateLogger();
```

This applies in every environment without exception, not just production. Development logs are frequently exported to third-party logging platforms, and they're often searched by multiple team members. A developer who tests against a real account in development and logs the request body has put real user data into the logging platform where it doesn't belong.

---

## CI/CD Security Gates

The CI/CD pipeline is the last automated gate before code reaches production. It's also one of the most consistently underused security controls in most engineering organizations.

Most pipelines run tests and check formatting. Security gates are the additional checks that catch the security-relevant issues that human code review consistently misses.

### Secret Detection

Every push to every branch must be scanned for secrets. API keys, database passwords, private keys, connection strings with credentials embedded, and JWT secrets in configuration files.

**Gitleaks** is a free, open-source tool purpose-built for this. Here's how you integrate it into a GitHub Actions pipeline:

```yaml title=".github/workflows/security.yml"
name: Security Gates

on:
  push:
    branches: ["*"]
  pull_request:
    branches: ["*"]

jobs:
  secret-detection:
    name: Scan for secrets
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

When Gitleaks finds a secret, it fails the pipeline, outputs the exact file and line number, and blocks the merge. You'll need to remove the secret, rotate the credential (because it touched version control and must be considered compromised), and push a clean commit before the pipeline passes.

The scan must run on the full Git history, not just the latest commit. A secret added three commits ago and removed in the next is still in the repository history and should be treated as compromised.

Your organization should also have a defined response procedure: who's notified when a secret is detected, which credentials are rotated, and in what timeframe. Detection without response isn't a security control.

### Static Analysis for Security

Static analysis tools analyze code for vulnerability patterns without running it. They catch raw SQL string concatenation, unsafe deserialization, hardcoded credentials, deprecated cryptographic functions, missing input validation, and dangerous function calls.

**Semgrep** is a free, open-source static analysis tool with a large library of security rules maintained by the security community. Here's how it fits into a pipeline:

```yaml
  static-analysis:
    name: Static analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: semgrep/semgrep-action@v1
        with:
          config: >-
            p/owasp-top-ten
            p/secrets
            p/sql-injection
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

The `p/owasp-top-ten` ruleset catches patterns corresponding to OWASP Top 10 vulnerabilities. The `p/sql-injection` ruleset specifically flags string concatenation in database queries. When Semgrep finds a match, the pipeline fails and identifies the exact file, line, and rule that triggered. The code can't merge until the issue is resolved.

For .NET projects, **Microsoft Security Code Analysis** and **Roslyn Analyzers** provide similar capabilities integrated directly into the build process.

The rules must be configured deliberately. Not every warning represents an actual vulnerability. Your team will define which rules are blocking, which are advisory, and which are suppressed. This configuration is itself a security decision that must be reviewed periodically.

### Dependency Vulnerability Scanning

Every dependency in the project is a potential attack surface. **OWASP Dependency-Check** is a free tool that scans project dependencies against the National Vulnerability Database (NVD) and flags known CVEs.

```yaml
  dependency-scan:
    name: Dependency vulnerability scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: dependency-check/Dependency-Check_Action@main
        with:
          project: "your-project-name"
          path: "."
          format: "HTML"
          args: >
            --failOnCVSS 7
            --enableRetired

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: dependency-check-report
          path: reports/
```

The `--failOnCVSS 7` flag means the pipeline fails if any dependency has a known vulnerability with a CVSS score of 7 or higher. CVSS (Common Vulnerability Scoring System) scores range from 0 to 10. A score of 7 or above is considered high severity. You can adjust this threshold based on your risk tolerance.

For Node.js projects, `npm audit` provides similar functionality out of the box. For Dart projects, `dart pub deps` combined with a vulnerability database check covers the dependency surface.

### Environment-Specific Configuration Validation

Before deploying to production, the pipeline must validate that the production configuration meets the required security standards. This isn't just checking that configuration files exist. It's actively asserting that specific security-critical settings are correct.

Here's what that validation looks like as a pipeline step:

```yaml
  config-validation:
    name: Validate production configuration
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3

      - name: Validate security configuration
        run: |
          if grep -r "debugEndpoint\|swagger-ui\|/debug" src/ --include="*.dart" --include="*.cs"; then
            echo "ERROR: Debug endpoints found in production build"
            exit 1
          fi

          if grep -r "AllowAnyOrigin\|\*" config/ --include="*.yaml" --include="*.json"; then
            echo "ERROR: Wildcard CORS configuration detected"
            exit 1
          fi

          if grep -rE "(password|secret|key)\s*=\s*['\"][^$\{]" config/ --include="*.yaml" --include="*.json"; then
            echo "ERROR: Hardcoded credentials detected in configuration"
            exit 1
          fi

          if grep -r "showStackTrace.*true\|expose_errors.*true" config/ --include="*.yaml"; then
            echo "ERROR: Stack trace exposure enabled in production config"
            exit 1
          fi
```

This script runs before every production deployment. Debug endpoints, wildcard CORS, hardcoded credentials, and stack trace exposure are all blocking failures. The deployment can't proceed until every check passes.

### Different Workflows for Different Environments

Development, staging, and production must have different pipeline workflows. Not just different deployment targets, but different validation requirements. The production pipeline is stricter than the staging pipeline. The staging pipeline is stricter than the development pipeline.

The production pipeline includes the full set of security gates. The development pipeline might skip some of the longer-running gates to preserve developer velocity. But the production pipeline never skips them.

This layered approach means that code progressively passes through stricter security validation as it approaches production. By the time it reaches the production deployment gate, it has already passed through multiple layers of automated security validation in lower environments.

---

## Microservices and Internal Service Security

Building microservices introduces a security challenge that monolithic architectures don't have: every service-to-service communication is a potential attack surface.

In a monolith, a method call between components is a function call in memory. It can't be intercepted, forged, or tampered with in transit.

In a microservices architecture, every service call is a network request. Network requests can be intercepted, forged, and tampered with. Services that implicitly trust each other because they're "internal" are making a dangerous assumption.

Every microservice must treat incoming requests as untrusted by default, including requests from other internal services. Authentication is required for every service-to-service communication. The API gateway handles external authentication. Internal service-to-service authentication must be handled separately.

Two patterns cover the main scenarios: mTLS for synchronous calls and authenticated event streams for asynchronous communication.

**mTLS for synchronous service-to-service calls** (mutual TLS) means both services present certificates to each other. The Payment Service calling the Account Service must present a valid certificate that the Account Service trusts. If the certificate is missing or invalid, the connection is rejected before any application code runs. This is cryptographic proof of identity: no bearer token to steal, no API key to rotate.

```plaintext
Payment Service                    Account Service
      |                                  |
      |-- presents its certificate ----> |
      |                                  |-- verifies certificate against trusted CA
      |                                  |-- rejects connection if invalid
      | <-- presents its certificate --- |
      |-- verifies certificate           |
      |                                  |
      |-- authorized request ----------> |
      |                                  |-- processes because identity is proven
```
<!-- TODO: mermaid화 -->

**Authenticated event streams for asynchronous communication** mean every message published to a broker carries a signature that consuming services verify before processing. A service that publishes a `PaymentCompleted` event signs it with its private key. The consuming service verifies the signature before acting on the event. A forged event without a valid signature is discarded.

```dart
class PaymentEventPublisher {
  final KafkaProducer _producer;
  final EventSigner _signer;

  Future<void> publishPaymentCompleted(Payment payment) async {
    final event = PaymentCompletedEvent(
      paymentId: payment.id,
      amount: payment.amount,
      timestamp: DateTime.now().toIso8601String(),
    );

    final signature = await _signer.sign(jsonEncode(event.toJson()));

    await _producer.send(
      topic: 'payment.completed',
      value: jsonEncode({
        'payload': event.toJson(),
        'signature': signature,
        'publisher': 'payment-service',
      }),
    );
  }
}

class AccountEventConsumer {
  final EventVerifier _verifier;
  final AccountService _accountService;

  Future<void> onMessage(KafkaMessage message) async {
    final data = jsonDecode(message.value);
    final isValid = await _verifier.verify(
      jsonEncode(data['payload']),
      data['signature'] as String,
      data['publisher'] as String,
    );

    if (!isValid) {
      logger.warning('Invalid signature from ${data['publisher']} — discarding');
      return;
    }

    final event = PaymentCompletedEvent.fromJson(data['payload']);
    await _accountService.handlePaymentCompleted(event);
  }
}
```

Services must not be directly accessible from the internet without going through the API gateway. The gateway is the single entry point. It handles rate limiting, authentication, and routing for all external traffic. Services behind the gateway are internal: they're still not trusted by each other, but they're not exposed externally.

Overengineering is itself a security risk. An application that should be a well-designed monolith but is implemented as microservices introduces operational complexity that the team doesn't have the capacity to manage. Multiple deployment pipelines, multiple service boundaries, an API gateway, message brokers, and distributed tracing all require dedicated engineering capacity to operate securely. A monolith that isn't resourced to maintain properly is far less dangerous than a microservices architecture that isn't resourced to operate at all.

Choose your architecture based on what your team can actually operate securely, not based on what's fashionable.

---

## Data Privacy and Compliance as Engineering Requirements

Data privacy requirements are engineering requirements. They're not legal requirements that engineering accommodates. They're engineering requirements that engineering owns.

Under Nigeria's NDPA 2023, personal data must be processed only for specified, explicit, and legitimate purposes. BVN data has specific residency and handling requirements enforced by CBN guidelines. Under PCI-DSS, any environment that stores, processes, or transmits cardholder data is in scope for compliance.

These requirements have concrete engineering implications.

### 1. Data Minimization

You can collect and store only the personal data that is actually needed for the specified purpose. An API that collects more data than it needs is creating compliance risk. A response that returns more data than the caller needs is both a BOPLA vulnerability and a data minimization violation.

### 2. Purpose Limitation

Data collected for one purpose must not be used for a different purpose without proper basis. The engineering implication is that data that flows within the system must be documented and enforced. Data from one service must not flow to another service that uses it for an unauthorized purpose.

### 3. Data Residency

Certain categories of data must be stored in specific geographic regions. This is an infrastructure requirement that must be designed into the system architecture, not patched in after deployment.

### 4. Retention and Deletion

Personal data must be deleted when the purpose for which it was collected is fulfilled, or when the retention period defined in the privacy notice expires. The engineering implication is that every category of personal data must have a defined retention policy and an automated deletion mechanism. Manual deletion policies that depend on someone remembering to delete data aren't compliant.

### 5. Audit Logging

Every access to personal data must be logged with sufficient detail to demonstrate compliance. Who accessed what data, when, for what stated purpose. This audit log must be tamper-evident and retained for the required period.

Here's what all five of these policies look like implemented together in a single feature (a user profile endpoint):

```dart :collapsed-lines
class UserProfileService {
  final UserRepository _repository;
  final AuditLogger _auditLogger;
  final DataResidencyValidator _residencyValidator;

  UserProfileService(this._repository, this._auditLogger, this._residencyValidator);

  Future<UserProfileResponse> getProfile(
    String requestingUserId,
    String targetUserId,
    String purpose,
  ) async {
    if (!_isValidPurpose(purpose)) {
      throw UnauthorizedException('Invalid or undeclared access purpose');
    }

    final user = await _repository.findById(targetUserId);
    if (user == null) throw NotFoundException('User not found');

    _residencyValidator.assertCompliant(user.dataRegion, requestingUserId);

    await _auditLogger.log(AuditEntry(
      action: 'READ_USER_PROFILE',
      actorId: requestingUserId,
      resourceId: targetUserId,
      purpose: purpose,
      timestamp: DateTime.now(),
      dataFieldsAccessed: ['first_name', 'last_name', 'email'],
    ));

    return UserProfileResponse(
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    );
  }

  bool _isValidPurpose(String purpose) {
    const validPurposes = {
      'user_self_view',
      'customer_support_verified',
      'compliance_audit',
    };
    return validPurposes.contains(purpose);
  }
}

class DataRetentionService {
  final UserRepository _repository;
  final AuditLogger _auditLogger;

  Future<void> enforceRetentionPolicy() async {
    final cutoff = DateTime.now().subtract(const Duration(days: 2555));
    final expiredUsers = await _repository.findInactiveUsersBefore(cutoff);

    for (final user in expiredUsers) {
      await _auditLogger.log(AuditEntry(
        action: 'AUTOMATED_DATA_DELETION',
        resourceId: user.id,
        purpose: 'retention_policy_enforcement',
        timestamp: DateTime.now(),
      ));

      await _repository.anonymize(user.id);
    }
  }
}
```

This single service demonstrates all five compliance policies in working code. Purpose is declared on every access. Data residency is validated before returning data. The audit log captures every access with full context. The response returns only the fields needed. And a scheduled job enforces deletion automatically without anyone having to remember.

These requirements must be part of the requirements specification for every feature that handles personal data. Not addressed after the feature is built. Addressed in the design.

---

## Conclusion

Security isn't a feature you add to software. It's a property you engineer into it from the beginning.

Threat modeling before architecture decisions means you understand what you're protecting and what you're protecting it against before you decide how to build it.

Security as a business rule means the domain layer enforces security requirements the same way it enforces any other business rule, impossible to bypass, impossible to forget.

Encryption standards as an organizational decision means no developer is choosing cryptographic primitives by preference or convenience.

Database security means the application can only do what it needs to do, and an attacker who compromises one component can't compromise everything.

CORS configuration means the browser security mechanism is actually enforcing the boundary, not bypassed by a wildcard.

Structured logging with field-level masking means sensitive data never ends up in a log file regardless of what developers log.

And CI/CD security gates mean automated validation catches what human review misses, on every push, before every deployment.

None of these are exotic or difficult concepts. They're engineering disciplines that require deliberate decisions and deliberate enforcement. The decision not to make them is itself a decision, and it has consequences that show up in incident reports.

The most expensive place to address a security vulnerability is after it has been exploited. The second most expensive place is after it has shipped to production. The least expensive place is in the design, before a single line of code exists.

That's what Secure by Design means in practice. Not perfect security or zero risk. Just deliberate, documented, enforceable decisions about how the system handles adversarial conditions, made before the system is built, so the engineering is sound from the start.

One of the things to look forward to as an technology enthusiast is the day when applications are built with security as an integral part of that development process. Not as an afterthought or something that needs to pass just for deployment to happen. This is why you need to understand, accept, and adopt Secure by Design as a standardized process, not only in the Application Security Field but also in core software engineering.

Happy Secured Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Secure by Design: How to Engineer Security into Architecture Before Writing Any Code",
  "desc": "There's a conversation that happens in most engineering teams,maybe usually too late. Think of this, a feature ships to production. A security review happens afterwards, or a penetration test finds so",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/secure-by-design-engineer-security-into-architecture-before-writing-code.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
