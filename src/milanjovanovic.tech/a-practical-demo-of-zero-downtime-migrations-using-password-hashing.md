---
lang: en-US
title: "A Practical Demo of Zero-Downtime Migrations Using Password Hashing"
description: "Article(s) > A Practical Demo of Zero-Downtime Migrations Using Password Hashing"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Practical Demo of Zero-Downtime Migrations Using Password Hashing"
    - property: og:description
      content: "A Practical Demo of Zero-Downtime Migrations Using Password Hashing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/a-practical-demo-of-zero-downtime-migrations-using-password-hashing.html
prev: /programming/cs/articles/README.md
date: 2026-01-24
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_178.png
---

# {{ $frontmatter.title }} 관련

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
  name="A Practical Demo of Zero-Downtime Migrations Using Password Hashing"
  desc="A practical demo of the zero-downtime migration pattern: run old + new password hash formats side-by-side, migrate users on login, and remove legacy safely."
  url="https://milanjovanovic.tech/blog/a-practical-demo-of-zero-downtime-migrations-using-password-hashing"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_178.png"/>

[<VPIcon icon="fas fa-globe"/>Push updates live faster with RunPod](https://fandf.co/4aVMokD)  
Spin up compute and storage in seconds with RunPod. Deploy serverless inference that scales automatically, with no manual tuning or capacity planning. Push updates live, iterate fast, and monitor everything in one place with logs, and metrics built in. RunPod is infrastructure for AI startups and technical teams who want to stay in flow, move fast, and spend less time on cloud plumbing and more time shipping real products. [<VPIcon icon="fas fa-globe"/>Explore Runpod](https://fandf.co/4aVMokD)

[<VPIcon icon="fas fa-globe"/>Data Engineering Design Patterns - Book Giveaway from Buf](https://fandf.co/49GvtA9)  
Buf Schema Registry brings type safety to data pipelines with Protobuf. Manage schemas centrally, validate changes, and generate Python code automatically. Plus: Buf is giving away an O'Reilly Media book, Data Engineering Design Patterns with proven solutions to idempotency, error handling, observability challenges and more. [<VPIcon icon="fas fa-globe"/>Get your copy now](https://fandf.co/49GvtA9).

Security requirements evolve. What was considered "secure enough" five years ago might not pass a security audit today.

You need to upgrade to a modern algorithm like [<VPIcon icon="fa-brands fa-wikipedia-w"/>Argon2](https://en.wikipedia.org/wiki/Argon2) or [<VPIcon icon="fa-brands fa-wikipedia-w"/>Bcrypt](https://en.wikipedia.org/wiki/Bcrypt). But here is the problem: hashing is a **one-way operation**. You cannot reverse-engineer the existing hashes to "upgrade" them.

If you simply swap your `IPasswordHasher` implementation, you break the application. Every single existing user who tries to log in will fail authentication because your new hasher doesn't understand the old format.

In this article, I want to demo a **zero-downtime migration** concept in practice.

Real systems have more constraints (and you should not build auth from scratch). But this is a clean example of a **pattern** you can reuse for [**database migrations**](/milanjovanovic.tech/efcore-migrations-a-detailed-guide.md):

- Move from old format to new format
- Keep existing behavior working
- Gradually migrate data
- Delete legacy only when you are done

Let's dive in.

---

## The Naive Approach and Why It Fails

Let's imagine you have a simple authentication system. You want to replace your legacy `PBKDF2` hasher with a standard `Argon2` implementation.

You might think, "I'll just register the new implementation in the dependency injection container."

```cs
// Switching from LegacyHasher to ModernHasher
builder.Services.AddSingleton<IPasswordHasher, ModernHasher>();
```

Here is the failure scenario:

1. **New Users:** They register and log in perfectly. Their passwords are hashed with Argon2 from day one.
2. **Existing Users:** A user enters their correct password. The system fetches the *old* [<VPIcon icon="fa-brands fa-wikipedia-w"/>PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) hash from the database.
3. **The Crash:** The `ModernHasher` tries to verify the PBKDF2 hash. It fails immediately, returning `401 Unauthorized`.

You have inadvertently locked out your entire user base. We need a way to support *both* algorithms simultaneously without making the login code a mess.

---

## The Solution: Migration on Login

The strategy is simple: we don't migrate the database in a batch job. We migrate users lazily when they prove their identity.

The flow looks like this:

1. **Attempt 1:** Try to verify the password using the **New** algorithm.
2. **Attempt 2 (Fallback):** If that fails, check if the **Legacy** algorithm can verify it.
3. **The Migration:** If the *Legacy* verification succeeds:
    - Log the user in (Success).
    - **Immediately re-hash** their password using the **New** algorithm.
    - Update the database record.

Future logins for this user will now succeed via the standard flow.

![A sequence diagram showing the migration on login flow, with attempts to verify using new and legacy hashers.](https://milanjovanovic.tech/blogs/mnw_178/migration_on_login_flow.png?imwidth=1920)
<!-- TODO: mermaid화-->

---

## Implementation with .NET Keyed Services

In .NET 8, Microsoft introduced **Keyed Services**, which are perfect for this scenario. They allow us to register multiple implementations of the same interface and retrieve them by name.

### 1. Registering the Services

We register both hashers in our `Program.cs`, assigning them unique keys:

```cs
// Register the implementations with specific keys
builder.Services.AddKeyedSingleton<IPasswordHasher, Pbdkf2PasswordHasher>("legacy");
builder.Services.AddKeyedSingleton<IPasswordHasher, Argon2PasswordHasher>("modern");

// (Optional) Register the modern one as the default for other services
builder.Services.AddSingleton<IPasswordHasher, Argon2PasswordHasher>();
```

### 2. The Login Command Handler

Now we implement the migration logic. We inject both hashers using the `[FromKeyedServices]` attribute.

```cs
public class LoginCommandHandler(
    IUserRepository userRepository,
    [FromKeyedServices("modern")] IPasswordHasher newHasher,
    [FromKeyedServices("legacy")] IPasswordHasher legacyHasher)
{
    public async Task<AuthenticationResult> Handle(LoginCommand command)
    {
        var user = await userRepository.GetByEmailAsync(command.Email);
        if (user is null)
        {
            return AuthenticationResult.Fail();
        }

        // 1. Try the new algorithm first (Happy Path)
        if (newHasher.Verify(user.PasswordHash, command.Password))
        {
            return AuthenticationResult.Success(user);
        }

        // 2. Fallback: Check if it's a legacy hash
        if (legacyHasher.Verify(user.PasswordHash, command.Password))
        {
            // 3. MIGRATION STEP: Re-hash and save
            var newHash = newHasher.Hash(command.Password);

            user.UpdatePasswordHash(newHash);
            await userRepository.SaveChangesAsync();

            return AuthenticationResult.Success(user);
        }

        return AuthenticationResult.Fail();
    }
}

```

This code ensures that active users are automatically upgraded. After a few months, the vast majority of your user base will be on the new algorithm.

---

## Real-World Improvements

While the implementation above works, here are two improvements to make it production-ready.

### 1. Algorithm Prefixes

Relying on "trial and error" verification works, but it's cleaner to know exactly which algorithm was used to create a hash.

Standard algorithms often include a prefix (e.g., Bcrypt starts with `$2a$` or `$2b$`). You can use this to route the request efficiently:

```cs
public bool IsLegacyHash(string hash)
{
    // This assumes we're storing a prefix for PBKDF2 hashes. Something to consider.
    return hash.StartsWith("pbkdf2$");
}
```

Another benefit this unlocks is being able to query the database for users still on the legacy format.

### 2. Feature Flags

Performing a database write during a login request adds latency. If you have high traffic, you might want to control this roll-out.

By wrapping the migration logic behind a [**Feature Flag**](/milanjovanovic.tech/feature-flags-in-dotnet-and-how-i-use-them-for-ab-testing.md), you can disable the "write" step if your database comes under load, while still allowing users to log in via the read-only fallback.

```cs
if (await featureManager.IsEnabledAsync(FeatureFlags.MigratePasswords) &&
    legacyHasher.Verify(user.PasswordHash, command.Password))
{
    // Perform migration...
}
```

---

## Finishing the Migration

After you run this for a while (usually a few months), most active accounts will be upgraded. You can then run a cleanup script to identify any remaining legacy hashes and force those users to reset their passwords on the next login attempt.

At that point, you can remove:

- The legacy hasher registration
- The legacy verification code path
- The feature flag

And the migration is complete.

---

## Summary

A "simple" hashing upgrade is really a **data migration**. This article is about the migration pattern. Not about reinventing auth.

The **zero-downtime pattern** looks like this:

1. New format for new writes
2. Support both formats for reads
3. Migrate old data gradually (migrate-on-login is a great trick)
4. Put it behind a feature flag
5. Delete legacy when you are done

By allowing the old and new formats to coexist for a period of time, you achieve a seamless transition. Once your monitoring shows that 99% of active users have migrated, you can identify the users on the legacy format and force a password reset on their next attempt.

::: info

If you want to see a practical demo of this, [<VPIcon icon="fa-brands fa-youtube"/>check out this video I made](https://youtu.be/7YUV4O9eMjQ).

<VidStack src="youtube/7YUV4O9eMjQ" />

:::

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Practical Demo of Zero-Downtime Migrations Using Password Hashing",
  "desc": "A practical demo of the zero-downtime migration pattern: run old + new password hash formats side-by-side, migrate users on login, and remove legacy safely.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/a-practical-demo-of-zero-downtime-migrations-using-password-hashing.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
