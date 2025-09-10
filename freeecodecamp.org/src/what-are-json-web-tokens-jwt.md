---
lang: en-US
title: "What Are JSON Web Tokens (JWT)?"
description: "Article(s) > What Are JSON Web Tokens (JWT)?"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Are JSON Web Tokens (JWT)?"
    - property: og:description
      content: "What Are JSON Web Tokens (JWT)?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-json-web-tokens-jwt.html
prev: /devops/security/articles/README.md
date: 2025-07-08
isOriginal: false
author:
  - name: Grant Riordan
    url : https://freecodecamp.org/news/author/grantdotdev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751819356361/352ef68a-fa20-4a69-b666-393f7a17fa40.png
---

# {{ $frontmatter.title }} 관련

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
  name="What Are JSON Web Tokens (JWT)?"
  desc="When you’re working with any website, application, or API, you'll inevitably need to log in and authenticate your user base. One of the more commonly used methods of passing around authentication credentials from one system to another is using a JSON..."
  url="https://freecodecamp.org/news/what-are-json-web-tokens-jwt"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751819356361/352ef68a-fa20-4a69-b666-393f7a17fa40.png"/>

When you’re working with any website, application, or API, you'll inevitably need to log in and authenticate your user base. One of the more commonly used methods of passing around authentication credentials from one system to another is using a JSON Web Token (JWT).

In this article, you'll learn about:

- What a JSON Web Token (JWT) is
- How JWTs are structured and created
- Different JWT signing techniques and algorithms (Symmetric vs. Asymmetric)
- How JWTs are used in real-world authentication flows
- Important security best practices for using JWTs

---

## What Is a JWT?

::: info Introduction to JWT (<code>jwt.io</code>)

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.  

:::

While accurate, this definition can be a bit dense at first glance. Imagine you want to send someone a sealed, tamper-proof message. That's essentially what a JSON Web Token (JWT) is. It's a secure message, a special kind of message designed to be sent between two parties which can be assured it came from an expected sender.

Each JWT is digitally signed using either a **secret code** (for symmetric algorithms like HMAC) or a **private key** (for asymmetric algorithms like RSA or ECDSA).

This secret code or private key is known only to the system that issues the JWT (often called an *authentication provider*, like Auth0, AWS Cognito, or Firebase Auth, which handles user logins and identity).

This signature proves two things:

1. **Authenticity:** It proves the message really came from who it claims to be from.
2. **Integrity:** It proves that the message hasn't been changed or tampered with since it was signed. If even one character is altered, the signature won't match, and you'll know something is wrong, meaning the contents of the JWT can't be trusted.

### JSON Web Tokens Are Made of Three Elements

JWTs are made up of 3 key parts:

1. Header
2. Payload
3. Signature

#### Header

The header contains metadata information about the token. Think of it like a label on a package - it tells you what’s inside and how it was prepared.

Typically, the header contains:

`alg`: This specifies the **algorithm** used to sign the JWT. Common algorithms are `HS256` (HMAC with SHA-256) or `RS256` (RSA with SHA-256).

`typ`: This specifies the **type** of token, which is almost always `JWT` for standard JSON Web Tokens.

::: tip Example (decoded)

```json
{ 
  "alg": "RS256",
  "typ": "JWT" 
}
```

:::

#### Payload

This is the second part of the JWT, and it's where the real data or "claims" are stored. Claims are statements about an entity (usually a user) and any other additional data. Using the previous analogy of a package, think of it as the “contents” of the package.

There are three types of claims:

##### 1. Registered Claims

These are predefined claims that are recommended for common use cases. They are not mandatory but are very useful for interoperability. These include:

- `iss` - issuer, who issued the token (for example, your application’s domain)
- `sub` - subject, the subject of the token (for example, a User’s ID)
- `aud` - audience, the audience of the token (that is, who the token is intended for - for example, a specific API)
- `exp` - **expiration**, the expiry date as a timestamp
- `iat` - issued at, when the token was issued as a timestamp
- `nbf` - not before, when the token becomes valid (that is, the token cannot be used or deemed valid before this timestamp)
- `jti` - JWT ID, a unique identifier for the token, useful for preventing replay attacks or blacklisting

##### 2. Public Claims

These can be defined by anyone using JWTs. To avoid naming conflicts, it's a good practice to register them or define them using a unique identifier like a URI.

##### 3. Private Claims

These are custom claims created to share specific information between parties who agree on using them. They are entirely up to you and your application's needs.

::: tip Example payload

```json
{
  "sub": "1234567890", //  subject
  "name": "John Doe", // private claim
  "admin": true, // private claim / role
  "iat": 1678886400, // Issued at a specific timestamp
  "exp": 1678890000  // Expires at a specific timestamp
}
```

:::

Like the header, this JSON object is also **Base64Url encoded** (a URL-safe variant of Base64 encoding) to form the second part of the JWT string.

::: note Important note

_The payload is **encoded**, not encrypted._ This means that anyone can easily decode the JWT and read its contents. Never put sensitive information (like passwords) directly into the payload unless the entire JWT itself is encrypted (which is a separate process called JWE - JSON Web Encryption). The security of a standard JWT comes entirely from the signature, which prevents tampering.

:::

#### Signature

The signature, as we've already discussed, is the most important part of the JWT. Without it, there's no protection applied to the JWT, meaning no way to validate the origin of the token or its integrity.

The signature is created by taking the **encoded header**, the **encoded payload**, and a **secret key** (or a private key if using asymmetric algorithms like RSA). These are then run through the cryptographic algorithm specified in the header (`alg` field). For HS256, a shared secret key is used. For RS256, a private key is used to sign, and a corresponding public key is used to verify. We’ll get on to verification soon.

Think of it like a tamper-proof seal on your package, or even better, a wax seal on a letter. If you receive your letter and the wax seal has been broken, you'd naturally believe the contents of the letter may not be original and therefore can't be trusted.

In pseudo-code it would look like this:

```plaintext
Signature = Algorithm( Base64Url(Header) + "." + Base64Url(Payload), SecretKey )
```

The result of this signing process is the signature, which is also Base64Url encoded to form the third part of the JWT string.

At the end of the whole process your JWT would look like this:

```plaintext
base64EncodedHeader.base64EncodedPayload.base64EncodedSignature
```

### Asymmetric Signing (RS256) Explained

When a JWT uses an algorithm like RS256 (RSA Signature with SHA-256), it employs an **asymmetric cryptographic** process involving a **public** and **private** key pair. This is where the core magic of proving authenticity and integrity happens without needing to share a secret.

#### The Signing Process (by the Issuer)

The **sender** (the server that issues the JWT, like Auth0) possesses the **private key**. This key is kept absolutely secret and secure. Here are the steps:

##### 1. Prepare the data

The server takes the header (which includes the algorithm) and the payload. It Base64Url-encodes them, and then concatenates them with a dot: `Base64Url(Header) + "." + Base64Url(Payload)`.

For example, with this header:

```json
{
  "typ": "JWT",
  "alg": "RS256"
}
```

And this payload:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1751494086,
  "exp": 1751497686
}
```

This would create a Base64Url-encoded `header.payload` string like the animated example below:

![Animated gif of the process converting header and payload to base64 encoded string](https://cdn.hashnode.com/res/hashnode/image/upload/v1751810671075/128fa652-fe2a-4413-a238-71531bfe67ae.gif)

##### 2. Calculate the hash

It then calculates a **hash** (using SHA-256 in this case) of this combined header and payload string.

##### 3. Sign the hash

Finally, it signs this hash using its private key. This cryptographically transformed hash is the signature part of the JWT.

The JWT is then formed by concatenating the Base64Url-encoded header, the Base64Url-encoded payload, and the Base64Url-encoded signature, separated by dots: `header.payload.signature`.

The top segment below shows the full JWT token (header.payload.signature):

![Image displaying the fully formed JWT token along with original header and payload](https://cdn.hashnode.com/res/hashnode/image/upload/v1751830473890/31da21a0-50db-4a48-b4c3-378c2ac1616a.png)

### The Verification Process

This is where the magic happens, and it's often a point of confusion. The public key doesn't "decrypt" the original data like a symmetric key does. Instead, it performs a unique **verification** process.

The receiver (the client or another server that needs to verify the JWT) possesses the **public key**. This key does **not** need to be kept secret - it can be freely distributed.

Here's a step-by-step explanation:

#### 1. Separate the parts

The first thing the receiver does is split the incoming JWT string into its three Base64Url-encoded components: the Header, the Payload, and the Signature.

#### 2. Obtain the public key

The verifier needs the **public key** that corresponds to the private key used by the issuer. Public keys are often available via a **JWKS (JSON Web Key Set) endpoint** (for example, `your-domain.com/.well-known/jwks.json`).

#### 3. Re-create the data to be hashed

The receiver takes the received, Base64Url-encoded Header and the received, Base64Url-encoded Payload. It then combines them exactly as the issuer did: `EncodedHeader.EncodedPayload`.

#### 4. Compute a local hash (Hash A)

This combined string is then put through the same hashing algorithm (for example, SHA-256) that was specified in the JWT's header. This produces a new, locally computed hash (let's call this **"Hash A"**). This local hash represents what the content *should* look like if it hasn't been tampered with.

#### 5. "Unsign" the received signature with the public key to get the original signed hash (Hash B)

This is the core cryptographic step. The verifier uses the public key (obtained in step 2) to perform a mathematical operation on the received signature. This operation does *not* create a new signature for comparison. Instead, it effectively "unsigns" or "decrypts" the signature to reveal the **original hash ("Hash B")** that was produced by the issuer's private key.

- **Crucial Point:** This process is for **verifying authenticity**, not decrypting confidential data. The public key confirms that the signature was indeed created by the corresponding private key, and as part of that confirmation, it returns the original hash that *was signed*.

#### 6. Compare the hashes

The verifier now has two hashes:

- **Hash A:** The hash it **computed locally** from the received header and payload (from step 4).
- **Hash B:** The original hash that was extracted from the received Signature using the public key (from step 5)

#### 7. If Hash A matches Hash B

It proves two critical things:

1. **Authenticity:** The token was indeed signed by the legitimate holder of the corresponding private key (for example, Auth0).
2. **Integrity:** The content of the header and payload has **not been tampered with** since it was originally signed. If even a single character in the header or payload were changed, Hash A would be different, and it would not match Hash B. In this case, the JWT is considered valid and its contents can be trusted.

#### 8. If the hashes do NOT match

The token is considered invalid and **must be rejected**. This indicates either that the JWT was signed by an unauthorised party (a forged token) or that its header or payload has been altered after it was signed.

![Flow diagram of asymmetric verification process](https://cdn.hashnode.com/res/hashnode/image/upload/v1751813812291/de32c7b0-1f3c-4f26-995e-b5c618b104b3.png)

### Analogy: The Lock and Key for Asymmetric Signatures

#### Private Key

A special, unique key that can **lock** a box (create a signature). Only the owner has this key.

#### Public Key

A widely distributed key that can **test** if a box was locked by the corresponding private key. It can't lock a new box, but it can confirm if an existing lock is authentic.

You don't re-lock the box with the public key. You use the public key to check if the existing lock (the signature) is genuine and corresponds to the contents of the box.

---

## Symmetric Signing: HS256 (HMAC With SHA-256)

While RS256 uses a pair of keys (private for signing, public for verifying), many JWTs you'll encounter are signed symmetrically, most commonly with the HS256 algorithm. HS256 stands for **HMAC (Hash-based Message Authentication Code) with SHA-256**.

The fundamental difference here is the use of a single, shared secret key for *both* signing and verification.

### How HS256 Signing Works

#### 1. **Shared secret key

The issuer (for example, your authentication provider) possesses a single, confidential secret key. This key is known *only* to the issuer and any parties (like your API) that need to verify the token.

#### 2. **Combine header and payload

Just like with asymmetric signing, the issuer takes the Base64Url-encoded Header (which specifies `"alg": "HS256"`) and the Base64Url-encoded Payload, and **joins** them with a dot.

#### 3. **Apply HMAC-SHA256

This combined string is then fed into the HMAC-SHA256 algorithm along with the secret key. The HMAC algorithm uses the secret key to create a unique hash (the signature) of the data. In pseudo-code, it looks like this:

```plaintext
Signature = HMAC-SHA256( Base64Url(Header) + "." + Base64Url(Payload), SecretKey )
```

#### 4. Form the JWT

The resulting signature (which is also Base64Url-encoded) is appended to the header and payload with a dot, forming the complete JWT:

```plaintext
base64EncodedHeader.base64EncodedPayload.base64EncodedSignature
```

### How HS256 Verification Works

When a receiver gets an HS256-signed JWT, it goes through a verification process.

First, it separates the parts. The JWT is split into its three Base64Url-encoded components: Header, Payload, and Signature, as we did with asymmetric JWTs.

Then, it obtains the shared secret key. The receiver must also possess the **exact same secret key** that the issuer used to sign the token. This key is *not* publicly distributed like a public key - it must be securely provisioned to any entity that needs to verify tokens.

Next, it re-calculates the signature. The receiver does this by taking the received Base64Url-encoded Header and Payload, combining them, and then re-applying the HMAC-SHA256 algorithm using the *same secret key*. This produces a new, locally computed signature.

Finally, the receiver compares the signature it just calculated locally with the signature it received as part of the JWT.

- **If the two signatures match:** The token is considered valid. This confirms its authenticity (it came from someone who knows the secret) and integrity (it hasn't been tampered with).
- **If the signatures do NOT match:** The token is invalid and must be rejected. This indicates either tampering or that it was signed with a different, unknown secret key.

![Flow diagram of symmetric verification process](https://cdn.hashnode.com/res/hashnode/image/upload/v1751814851136/a73b7af6-e92d-40f3-b1e3-c4bd2406ede9.png)

::: important Key Differences and Considerations

- **Key management:** With HS256, the secret key must be securely shared and kept confidential by *all* parties involved in both signing and verifying. This can be more challenging to manage securely at scale compared to the public/private key model, where only the private key needs strict secrecy.
- **Performance:** HS256 is generally faster to compute than asymmetric algorithms like RS256, making it suitable for high-volume scenarios where the secret key can be securely distributed.

:::

---

## JWTs in Action: A Typical Authentication Flow

Now that you understand how JWTs are structured and signed, let's look at how they're typically used in a real-world web application. This authentication flow is a common pattern you'd encounter.

### Step 1: User Logs In

A user opens a client application (for example, a web browser, mobile app) and enters their login credentials (username and password).

The client sends these credentials securely (always over HTTPS!) to an **authentication server** (like Auth0, AWS Cognito, or your own backend's authentication endpoint).

### Step 2: Authentication Server Issues JWT

Then the authentication server verifies the user's credentials. If valid, it generates a new JWT. This JWT contains claims (like the user's ID, roles, expiration time) in its payload and is digitally signed by the server's **private key** (for asymmetric algorithms like RS256) or **secret key** (for symmetric algorithms like HS256).

The server then sends this signed JWT back to the client.

### Step 3: Client Stores JWT

The client receives the JWT and typically stores it in a secure location, such as browser memory storage, session storage, or an HTTP-only cookie. The method of storage depends on the client type and security considerations.

### Step 4: Client Makes API Calls

When the user wants to access a protected resource on a backend API (for example, their profile data, a private feed), the client includes the JWT in the request.

The standard way to do this is by sending the token in the `Authorization` header of the HTTP request, prefixed with the word `Bearer`:

```plaintext
Authorization: Bearer <your_jwt_here>
```

### Step 5: API Verifies JWT & Authorises Request

Now, the backend API receives the request and extracts the JWT from the `Authorization` header. The API then performs the JWT verification process depending on the algorithm:

- It checks the token's claims, especially the `exp` (expiration) claim, to ensure it's still valid.
- If the token is valid, the API trusts the claims within the payload (for example, the user's ID) and proceeds to fulfill the request, potentially using the user's roles to determine if they have permission to access the requested resource.
- If the token is invalid (bad signature, expired, and so on), the API rejects the request, typically with an HTTP 401 Unauthorised status.

This flow is powerful because JWTs are **stateless**: once issued, the authentication server doesn't need to keep a record of active sessions. The API can verify the token independently, which simplifies scaling and reduces server load.

---

## JWT Security Best Practices and Considerations

While JWTs offer powerful authentication capabilities, using them securely requires careful attention to best practices. Misconfigurations or oversight can lead to significant vulnerabilities.

### Always Use HTTPS/TLS

::: important Crucial

JWTs are **encoded, not encrypted, by default**. This means anyone who intercepts the token during transmission can easily read its payload. Therefore, JWTs (and all authentication traffic) **must always be transmitted over HTTPS (TLS)** to encrypt the communication channel itself and prevent eavesdropping.

:::

### Protect Your Signing Keys

Whether it's a private key (for RS256) or a shared secret key (for HS256), these keys are paramount. If an attacker gains access to your signing key, they can forge valid JWTs, impersonate users, and compromise your system. Store these keys securely, preferably in dedicated key management services.

### Keep Access Tokens Short-Lived (`exp` claim)

You should always set short expiration times (for example, 5-15 minutes) for your JWTs used as access tokens. This minimises the window of opportunity for an attacker if a token is compromised.

Since JWTs are stateless, they are hard to revoke immediately once issued. A short lifespan is your primary defense against compromised tokens.

### Implement Refresh Tokens (for Longer Sessions)

To maintain user experience with short-lived access tokens, use **refresh tokens**. A refresh token is a separate, longer-lived token (usually stored more securely) that can be exchanged for a new, short-lived access token when the current one expires, without requiring the user to re-authenticate. Refresh tokens *can* be revoked by the server, offering better control.

### Never Put Sensitive Data in the Payload:

Reiterating this crucial point: the JWT payload is Base64Url encoded, which is easily reversible. Do not put passwords, highly sensitive PII (Personally Identifiable Information), or confidential business data directly into the JWT payload. Only include non-sensitive or publicly available information, or data that's already encrypted by other means.

### Validate ALL Claims on Verification

When verifying a JWT, don't just check the signature. Always validate all relevant claims, including:

- `exp` (Expiration): Ensure the token hasn't expired.
- `iss` (Issuer): Verify the token came from the expected authentication server.
- `aud` (Audience): Ensure the token is intended for your specific API/application.
- `nbf` (Not Before): Check if the token is active yet.

### Consider Token Revocation (for critical cases)

For situations requiring immediate revocation (for example, user password change, account deactivation), typical stateless JWTs are challenging. Strategies include:

- Short expiration times (as above).
- A blacklist/revocation list: Store the `jti` (JWT ID) of revoked tokens in a database, checking this list on every request. This adds a stateful lookup but provides immediate revocation.

---

## Thanks for reading!

I hope you’ve found this tutorial useful, and as always if you want to ask any questions or hear about upcoming articles, you can always follow me on ‘X’, my handle is @grantdotdev and follow by clicking [here (<FontIcon icon="fa-brands fa-x-twitter"/>`grantdotdev`)](https://x.com/grantdotdev).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Are JSON Web Tokens (JWT)?",
  "desc": "When you’re working with any website, application, or API, you'll inevitably need to log in and authenticate your user base. One of the more commonly used methods of passing around authentication credentials from one system to another is using a JSON...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-json-web-tokens-jwt.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
