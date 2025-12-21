---
lang: en-US
title: "How to Perform Secure Hashing Using Python's hashlib Module"
description: "Article(s) > How to Perform Secure Hashing Using Python's hashlib Module"
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
      content: "Article(s) > How to Perform Secure Hashing Using Python's hashlib Module"
    - property: og:description
      content: "How to Perform Secure Hashing Using Python's hashlib Module"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-perform-secure-hashing-using-pythons-hashlib-module.html
prev: /programming/py/articles/README.md
date: 2025-12-16
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1765839274048/2110b9d7-00c4-4e85-a69b-7223f21f2ac3.png
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
  name="How to Perform Secure Hashing Using Python's hashlib Module"
  desc="Hashing is a fundamental technique in programming that converts data into a fixed-size string of characters. Unlike encryption, hashing is a one-way process: you can't reverse it to get the original data back. This makes hashing perfect for storing p..."
  url="https://freecodecamp.org/news/how-to-perform-secure-hashing-using-pythons-hashlib-module"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1765839274048/2110b9d7-00c4-4e85-a69b-7223f21f2ac3.png"/>

Hashing is a fundamental technique in programming that converts data into a fixed-size string of characters. Unlike encryption, hashing is a one-way process: you can't reverse it to get the original data back.

This makes hashing perfect for storing passwords, verifying file integrity, and creating unique identifiers. In this tutorial, you'll learn how to use [<VPIcon icon="fa-brands fa-python"/>Python's built-in `hashlib` module](https://docs.python.org/3/library/hashlib.html) to implement secure hashing in your applications.

By the end of this tutorial, you'll understand:

- How to create basic hashes with different algorithms
- Why simple hashing isn't enough for passwords
- How to add salt to prevent rainbow table attacks
- How to use key derivation functions for password storage

[You can find the code on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/secure-hashing).

::: note Prerequisites

To follow this tutorial, you should have:

- **Basic Python**: Variables, data types, functions, and control structures
- **Understanding of strings and bytes**: How to encode strings and work with byte data

No external libraries are required, as [<VPIcon icon="fa-brands fa-python"/>`hashlib`](https://docs.python.org/3/library/hashlib.html) and [<VPIcon icon="fa-brands fa-python"/>`os`](https://docs.python.org/3/library/os.html) are both part of Python's standard library.

:::

---

## Basic Hashing with Python’s hashlib

Let's start with the fundamentals. The hashlib module provides access to several hashing algorithms like [<VPIcon icon="fas fa-globe"/>MD5](https://md5hashgenerator.com/), [<VPIcon icon="fa-brands fa-wikipedia-w"/>SHA-1](https://en.wikipedia.org/wiki/SHA-1), [<VPIcon icon="fas fa-globe"/>SHA-256](https://emn178.github.io/online-tools/sha256.html), and more.

Here's how to create a simple SHA-256 hash:

```py
import hashlib

# Create a simple hash
message = "Hello, World!"
hash_object = hashlib.sha256(message.encode())
hex_digest = hash_object.hexdigest()

print(f"Original: {message}")
print(f"SHA-256 Hash: {hex_digest}")
#
# Original: Hello, World!
# SHA-256 Hash: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f
```

Here, we import the hashlib module, encode our string to bytes using `.encode()` as hashlib requires bytes, not strings.

Then we create a hash object using `hashlib.sha256()` and get the hexadecimal representation with `.hexdigest()`.

The resulting hash is always 64 characters long regardless of input size. Meaning you have an output string that is **256 bits long**. As each hexadecimal character requires 4 bits, **the output has 256/4 = 64 hexadecimal characters**. Even changing one character produces a completely different hash.

Let's verify that:

```py
import hashlib

# Small change, big difference
message1 = "Hello, World!"
message2 = "Hello, World?"  # Only changed ! to ?

hash1 = hashlib.sha256(message1.encode()).hexdigest()
hash2 = hashlib.sha256(message2.encode()).hexdigest()

print(f"Message 1: {message1}")
print(f"Hash 1:    {hash1}")
print(f"\nMessage 2: {message2}")
print(f"Hash 2:    {hash2}")
print(f"\nAre they the same? {hash1 == hash2}")
#
# Message 1: Hello, World!
# Hash 1:    dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f
# 
# Message 2: Hello, World?
# Hash 2:    f16c3bb0532537acd5b2e418f2b1235b29181e35cffee7cc29d84de4a1d62e4d
# 
# Are they the same? False
```

This property is called the [<VPIcon icon="fa-brands fa-wikipedia-w"/>avalanche effect](https://en.wikipedia.org/wiki/Avalanche_effect) where a tiny change creates a completely different output.

---

## Why Simple Hashing Isn't Enough for Passwords

You might think you can just hash passwords and store them in your database. But there's a problem: attackers use [<VPIcon icon="fa-brands fa-wikipedia-w"/>rainbow tables](https://en.wikipedia.org/wiki/Rainbow_table), which are precomputed databases of hashes for common passwords.

Here's what happens:

```py
import hashlib

# Simple password hashing (DON'T USE THIS!)
password = "password123"
hashed = hashlib.sha256(password.encode()).hexdigest()

print(f"Password: {password}")
print(f"Hash: {hashed}")
#
# Password: password123
# Hash: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
```

If two users have the same password, they'll have identical hashes. An attacker who cracks one hash knows the password for all users with that hash.

So how do we handle this? Let’s learn in the next section.

---

## Adding Salt to Your Hashes

The solution is **salting**: adding random data to each password before hashing. This way, even identical passwords produce different hashes.

Here's how to implement salted hashing:

```py
import hashlib
import os

def hash_password_with_salt(password):
    # Generate a random salt (16 bytes = 128 bits)
    salt = os.urandom(16)

    # Combine password and salt, then hash
    hash_object = hashlib.sha256(salt + password.encode())
    password_hash = hash_object.hexdigest()

    # Return both salt and hash (you need the salt to verify later)
    return salt.hex(), password_hash

# Hash the same password twice
password = "password123"

salt1, hash1 = hash_password_with_salt(password)
salt2, hash2 = hash_password_with_salt(password)

print(f"Password: {password}\n")
print(f"First attempt:")
print(f"  Salt: {salt1}")
print(f"  Hash: {hash1}\n")
print(f"Second attempt:")
print(f"  Salt: {salt2}")
print(f"  Hash: {hash2}\n")
print(f"Same password, different hashes? {hash1 != hash2}")
#
# Password: password123
# 
# First attempt:
#   Salt: fc24b2d2245ff65b80c5bced38744171
#   Hash: 5ce634c05941d25871e7ee334b5c24c75f64c4f6d557db66909fcaa793d869f9
# 
# Second attempt:
#   Salt: bc8a1f79b07e56b51285557211f88bb0
#   Hash: 043599d90b2aa0556265869cead35724c7d9d9d37129d897c6b68bade9e737e6
# 
# Same password, different hashes? True
```

::: info How this works:

- `os.urandom(16)` generates 16 random bytes, which is our salt
- We concatenate the salt and password bytes before hashing
- We return both the salt (as `hex`) and the hash
- You must store both the salt and hash in your database

:::

When a user logs in, you retrieve their salt, hash the entered password with that salt, and compare the result to the stored hash.

---

## Verifying Salted Passwords

Now let's create a function to verify passwords against salted hashes:

```py
import hashlib
import os

def hash_password(password, salt=None):
    """Hash a password with a salt. Generate new salt if not provided."""
    if salt is None:
        salt = os.urandom(16)
    else:
        # Convert hex string back to bytes if needed
        if isinstance(salt, str):
            salt = bytes.fromhex(salt)

    password_hash = hashlib.sha256(salt + password.encode()).hexdigest()
    return salt.hex(), password_hash

def verify_password(password, stored_salt, stored_hash):
    """Verify a password against a stored salt and hash."""
    # Hash the provided password with the stored salt
    _, new_hash = hash_password(password, stored_salt)

    # Compare the hashes
    return new_hash == stored_hash
```

Here’s how you can use the above:

```py
print("=== User Registration ===")
user_password = "mySecurePassword!"
salt, password_hash = hash_password(user_password)
print(f"Password: {user_password}")
print(f"Salt: {salt}")
print(f"Hash: {password_hash}")

# Simulate user login attempts
print("\n=== Login Attempts ===")
correct_attempt = "mySecurePassword!"
wrong_attempt = "wrongPassword"

print(f"Attempt 1: '{correct_attempt}'")
print(f"  Valid? {verify_password(correct_attempt, salt, password_hash)}")

print(f"\nAttempt 2: '{wrong_attempt}'")
print(f"  Valid? {verify_password(wrong_attempt, salt, password_hash)}")
#
# === User Registration ===
# Password: mySecurePassword!
# Salt: 381779b5262deea84183e4b9454b98b1
# Hash: 9756e1f0bc4c1aa4a72f35b0be8d3c8f430d31613371cf7de3c615bc475de98f
# 
# === Login Attempts ===
# Attempt 1: 'mySecurePassword!'
#   Valid? True
# 
# Attempt 2: 'wrongPassword'
#   Valid? False
```

This implementation shows a complete registration and login flow.

---

## Using Key Derivation Functions

While salted SHA-256 is better than plain hashing, modern applications should use key derivation functions (KDFs) specifically designed for password hashing. These include [<VPIcon icon="fa-brands fa-npm"/>`pbkdf2`](https://npmjs.com/package/pbkdf2) (Password-Based Key Derivation Function 2), [<VPIcon icon="fas fa-globe"/>bcrypt](https://bcrypt-generator.com/), [<VPIcon icon="fa-brands fa-wikipedia-w"/>scrypt](https://en.wikipedia.org/wiki/Scrypt), and [<VPIcon icon="fa-brands fa-wikipedia-w"/>Argon2](https://en.wikipedia.org/wiki/Argon2). You can check the links to learn more about these key derivation functions.

These algorithms are intentionally slow and require more computational resources, making brute-force attacks much harder. Let's implement PBKDF2, which is built into Python:

```py
import hashlib
import os

def hash_password_pbkdf2(password, salt=None, iterations=600000):
    """Hash password using PBKDF2 with SHA-256."""
    if salt is None:
        salt = os.urandom(32)  # 32 bytes = 256 bits
    elif isinstance(salt, str):
        salt = bytes.fromhex(salt)

    # PBKDF2 with 600,000 iterations (OWASP recommendation for 2024)
    password_hash = hashlib.pbkdf2_hmac(
        'sha256',          # Hash algorithm
        password.encode(), # Password as bytes
        salt,              # Salt as bytes
        iterations,        # Number of iterations
        dklen=32           # Desired key length (32 bytes = 256 bits)
    )

    return salt.hex(), password_hash.hex(), iterations

def verify_password_pbkdf2(password, stored_salt, stored_hash, iterations):
    """Verify password against PBKDF2 hash."""
    _, new_hash, _ = hash_password_pbkdf2(password, stored_salt, iterations)
    return new_hash == stored_hash

# Hash a password
print("=== PBKDF2 Password Hashing ===")
password = "SuperSecure123!"
salt, hash_value, iterations = hash_password_pbkdf2(password)

print(f"Password: {password}")
print(f"Salt: {salt}")
print(f"Hash: {hash_value}")
print(f"Iterations: {iterations:,}")
#
# === PBKDF2 Password Hashing ===
# Password: SuperSecure123!
# Salt: b388aecd774f6a7ddd95405091548bb50102c99beb1a10326a4c54070da4a3a5
# Hash: c681450f41d0cec9ea2aad1108efe2a430b9c3d9fc3af621071be10ac9b3615a
# Iterations: 600,000
```

Now let’s verify the password and also compare the speeds of SHA-256 vs. PBKDF2:

```py
print("\n=== Verification ===")
is_valid = verify_password_pbkdf2(password, salt, hash_value, iterations)
print(f"Password valid? {is_valid}")

# Show time comparison
import time

print("\n=== Speed Comparison ===")
test_password = "test123"

# Simple SHA-256
start = time.time()
for _ in range(100):
    hashlib.sha256(test_password.encode()).hexdigest()
sha256_time = time.time() - start

# PBKDF2
start = time.time()
for _ in range(100):
    hash_password_pbkdf2(test_password)
pbkdf2_time = time.time() - start

print(f"1000 SHA-256 hashes: {sha256_time:.3f} seconds")
print(f"1000 PBKDF2 hashes: {pbkdf2_time:.3f} seconds")
print(f"PBKDF2 is {pbkdf2_time/sha256_time:.1f}x slower")
#
# === Verification ===
# Password valid? True
# 
# === Speed Comparison ===
# 100 SHA-256 hashes: 0.000 seconds
# 100 PBKDF2 hashes: 53.631 seconds
# PBKDF2 is 240068.1x slower
```

::: info How PBKDF2 works:

- Takes your password and salt
- Applies the hash function (SHA-256) repeatedly – 600,000 times in this example
- Each iteration makes the computation slower and harder to brute-force
- You store the salt, hash, AND iteration count (so you can verify later)

:::

The iteration count can be increased over time as computers get faster. Modern recommendations (2024) suggest 600,000 iterations for PBKDF2-SHA256.

---

## Conclusion

You've learned how to implement secure password hashing in Python using the `hashlib` module. Here are the key takeaways:

- Basic hashing with SHA-256 is useful for data integrity, not passwords
- Salting prevents rainbow table attacks by making each hash unique
- PBKDF2 adds computational cost through iterations, slowing down attackers
- Always store the salt, hash, and iteration count together
- Use key derivation functions (PBKDF2, bcrypt, Argon2) for passwords

The code examples in this tutorial provide a solid foundation for implementing authentication in your projects. But remember, security is an ongoing process. Stay updated on best practices and regularly review your security implementations.

Happy (secure) coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Perform Secure Hashing Using Python's hashlib Module",
  "desc": "Hashing is a fundamental technique in programming that converts data into a fixed-size string of characters. Unlike encryption, hashing is a one-way process: you can't reverse it to get the original data back. This makes hashing perfect for storing p...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-perform-secure-hashing-using-pythons-hashlib-module.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
