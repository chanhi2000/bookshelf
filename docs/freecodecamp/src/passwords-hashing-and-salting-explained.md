---
lang: en-US
title: "What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained"
description: "Article(s) > What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained"
    - property: og:description
      content: "What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/passwords-hashing-and-salting-explained.html
prev: /programming/py/articles/README.md
date: 2026-03-13
isOriginal: false
author:
  - name: Tilda Udufo
    url: https://freecodecamp.org/news/author/tildaudufo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/61e84941-bb32-4029-9d58-39022488d29e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained"
  desc="Before I started building auth into my own projects, I didn't think too deeply about what was happening to passwords behind the scenes. Like most developers, I installed a library, called a hash funct"
  url="https://freecodecamp.org/news/passwords-hashing-and-salting-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/61e84941-bb32-4029-9d58-39022488d29e.png"/>

Before I started building auth into my own projects, I didn't think too deeply about what was happening to passwords behind the scenes.

Like most developers, I installed a library, called a hash function, stored the result, and moved on. I see a random string like `\(2a11yMMbLgN9uY6J3LhorfU9iu....` in my database and assume my user's passwords are unbreakable. I knew it was a hashed password. But what was the `\)2a`? What was `11`? And if I couldn't reverse it, how was my app verifying logins at all?

If you've ever used bcrypt, Devise, Django's auth system, or really any authentication library, you've been protected from these details. That's good engineering. But understanding what's actually happening makes you a better developer, and it explains a lot of things that seem confusing or arbitrary until suddenly they don't.

By the end of this article, you'll be able to look at that string and know exactly what every part means.

::: note Prerequisites

This article is written for developers who have used an auth library before but never looked closely at what it's doing. You don't need a cryptography background. If you've ever hashed a password and moved on, this is for you.

:::

---

## Hashing vs Encryption

Most developers use the terms **hashing** and **encryption** interchangeably. They're not the same thing, and the difference matters more than you might think.

Encryption is a two-way process. You take data, encrypt it with a key, and you can decrypt it later using that same key (or a related one). This is useful when you need to retrieve the original value. Storing a credit card number you'll need to charge later, or sending a message that the recipient needs to read.

Hashing is different. It's a one-way process. You put data in, you get a fixed-length string out, and there's no key that lets you reverse it. The original value is gone.

That might sound like a limitation. For passwords, it's actually exactly what you want.

Think about it: when a user logs in, you don't need to know their password. You just need to verify that what they typed matches what they set when they signed up. You can do that entirely with hashes. Hash what they typed, compare it to the stored hash, done. You never need the original.

This is why "forgot password" flows always ask you to set a new password rather than sending you your old one. Yes, sending you your old password over email might be risky but the actual reason is that they genuinely can't retrieve it. If they can email you your original password, that's a red flag. It means they stored it in a way that's reversible, which means it's not properly protected.

---

## Why a Plain Hash Isn't Enough

So if hashing is one-way and irreversible, isn't that enough? Just hash every password before storing it and you're done?

Not quite.

The first problem is **rainbow tables**. A [<VPIcon icon="fa-brands fa-wikipedia-w"/>rainbow table](https://en.wikipedia.org/wiki/Rainbow_table) is a precomputed database of hashes for common passwords. An attacker who gets hold of your database doesn't need to reverse the hashes. They just look them up. If your user's password is "password123", its [<VPIcon icon="fa-brands fa-wikipedia-w"/>SHA-256](https://en.wikipedia.org/wiki/SHA-2) hash is always the same string, and that string is almost certainly already in a rainbow table somewhere.

The second problem is related. If two users have the same password, they'll have the same hash. So if an attacker cracks one, they've cracked all of them. In a database with thousands of users, that's a significant security risk.

Here's what that looks like in practice:

```py
import hashlib

# Two users, same password
password = "password123"

hash_one = hashlib.sha256(password.encode()).hexdigest()
hash_two = hashlib.sha256(password.encode()).hexdigest()

print(hash_one == hash_two)  # True, every single time
```

The hash is deterministic. The same input always produces the same output. That's useful for a lot of things, but for passwords it creates a real vulnerability.

A plain hash gets you partway there. But it's not enough on its own.

---

## Enter Salting

The fix for both problems is something called a **salt**. And, no it's not your regular table salt.

A salt is a random string generated uniquely for each password. Before hashing, you combine the salt with the password, then hash the result.

```py
import hashlib
import os

password = "password123"

# Generate a random salt
salt = os.urandom(16).hex()

# Combine salt and password, then hash
salted_password = salt + password
hashed = hashlib.sha256(salted_password.encode()).hexdigest()

print(f"Salt: {salt}")
print(f"Hash: {hashed}")
```

Now two users with the same password produce completely different hashes, because their salts are different. And because the salt is random and unique, it can't be precomputed into a rainbow table.

Here's the surprising part: **the salt doesn't need to be secret**. It gets stored alongside the hash in your database, in plain text. That might feel wrong at first. If an attacker has your database, they have the salt too.

But that's fine. The salt's job isn't to be secret. Its job is to make each hash unique so that precomputed tables are useless. An attacker who wants to crack a salted hash has to brute force each password individually, from scratch, using that specific salt. They can't reuse work across users.

That's a meaningful increase in the cost of an attack, even when the salt is visible.

---

## Why bcrypt Is Slow (and Why That's the Point)

Salting solves the rainbow table problem. But there's still a gap. If an attacker has your database and decides to brute force a password, they can just keep guessing. Hash a candidate password with the stored salt, compare it to the stored hash, repeat. With a fast hashing algorithm like SHA-256, a modern GPU can do billions of these comparisons per second.

That's the problem with using a general-purpose hash function for passwords. Algorithms like SHA-256 and MD5 were designed to be fast. That's great for things like verifying file integrity or generating checksums. For passwords, it's a liability.

This is where bcrypt comes in. [<VPIcon icon="fa-brands fa-wikipedia-w"/>bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password hashing algorithm designed specifically to be slow. Not broken or inefficient by accident, but deliberately, configured-to-be slow. It has a **cost factor** (sometimes called a work factor) that controls how computationally expensive the hashing operation is.

```py
import bcrypt

password = b"password123"

# The cost factor is set here (12 is a common production value)
hashed = bcrypt.hashpw(password, bcrypt.gensalt(rounds=12))

print(hashed)
```

Every time you increase the cost factor by 1, the hashing operation takes roughly twice as long. At a cost factor of 12, a single hash might take around 300 milliseconds on your server. That's imperceptible to a user logging in. But for an attacker trying to brute force millions of passwords, it turns a feasible attack into an impractical one.

The other advantage of a configurable cost factor is that you can increase it over time as hardware gets faster. What was slow enough in 2015 might not be slow enough today. bcrypt lets you adapt without changing the algorithm itself.

---

## What's Actually in Your Database

So far, we've talked about salting and cost factors as separate concepts. Here's the satisfying part: in bcrypt, they're all stored together in a single string. That string sitting in your database contains everything needed to verify a password, and once you know how to read it, it's not mysterious at all.

Here's a typical bcrypt hash:

```plaintext
\(2a\)12$yMMbLgN9uY6J3LhorfU9iuLAUwKxyy8w42ubeL4MWy7Fh8B.CH/yO
```

::: info Let's break it down

- `$2a` — the **algorithm version**. This tells your auth library which version of bcrypt was used to generate the hash.
- `$12` — the **cost factor**. This is the number we talked about in the previous section. A cost factor of 12 means the hashing operation was run 2¹² times.
- `\(yMMbLgN9uY6J3LhorfU9iu` — the **salt**. The first 22 characters after the final `\)` are the salt, stored right there in plain text alongside the hash. Your auth library reads this back out when verifying a login.
- `LAUwKxyy8w42ubeL4MWy7Fh8B.CH/yO` — the **hash** itself. The remaining characters are the actual output of the hashing operation.

:::

When a user logs in, your auth library doesn't need any extra information. It reads the algorithm version, cost factor, and salt directly from the stored string, hashes the login attempt using those same parameters, and compares the result. If they match, the password is correct.

This is why bcrypt verification works even though the salt is never stored separately. It was never separate to begin with.

---

## Wrapping Up

Next time you see a bcrypt string in your database, you'll know exactly what you're looking at. The algorithm version, the cost factor, the salt, and the hash, all encoded in a single string that your auth library knows how to read.

But the bigger takeaway is this: the libraries we rely on every day aren't magic. They're carefully designed systems built on top of concepts that are worth understanding.

Knowing why bcrypt is slow, why salting works even when the salt is visible, and why fast hash functions like SHA-256 are the wrong tool for passwords makes you a more intentional developer. You'll make better decisions about cost factors, you'll recognise a poorly implemented auth system when you see one, and you'll understand why a data breach where passwords were hashed with MD5 is so much worse than one where bcrypt was used.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Your Auth Library Isn't Telling You About Passwords: Hashing and Salting Explained",
  "desc": "Before I started building auth into my own projects, I didn't think too deeply about what was happening to passwords behind the scenes. Like most developers, I installed a library, called a hash funct",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/passwords-hashing-and-salting-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
