---
lang: en-US
title: "RSA Operations"
description: "Article(s) > (3/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
category:
  - DevOps
  - Securiry
  - Mathematics
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - security
  - math
  - mathematics
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "RSA Operations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/rsa-operations.html
date: 2025-04-03
isOriginal: false
author:
  - name: Hamdaan Ali
    url : https://freecodecamp.org/news/author/hamdaan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "desc": "The RSA algorithm was introduced in 1978 in the seminal paper, ”A Method for Obtaining Digital Signatures and Public-Key Cryptosystems”. Over the decades, as RSA became integral to secure communications, various vulnerabilities and attacks have emerg...",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
  desc="The RSA algorithm was introduced in 1978 in the seminal paper, ”A Method for Obtaining Digital Signatures and Public-Key Cryptosystems”. Over the decades, as RSA became integral to secure communications, various vulnerabilities and attacks have emerg..."
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-rsa-operations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

Now that the mathematical foundations are laid, the RSA algorithm can be seen as a set of three core operations: Encryption, Decryption, and Signing. Throughout this handbook's next sections, we will critically analyze these operations and learn about several pitfalls in each. Then we will examine how these were averted with the birth of new schemes, each to solve a new issue discovered on the way.

---

## Encryption

With the public key $\left(n,e\right)$ available to everyone, any user can encrypt a message $m$ (where $m$ is first encoded as an integer in the range $0\le{m}\lt{n}$) using the formula:

$$
c=m^{e}\:\text{mod}\:n
$$

Here, $c$ is the ciphertext. Because the operation is based on modular exponentiation, even if $m$ is known, recovering $m$ from $c$ without knowing $d$ is computationally hard.

---

## Decryption

The intended recipient, who possesses the private key $d$, decrypts the cipher text $c$ by computing:

$$
m=c^{d}\:\text{mod}\:n
$$

Using the relationship $\left(e\times{d}\equiv1\left(\text{mod}\:\phi\left(n\right)\right)\right)$ and properties from Euler’s theorem, the above operation exactly inverts the encryption step, recovering the original message $m$.

This ensures that only the holder of the private key can read the encrypted message. This is the backbone of RSA’s use in secure communication.

The sequence diagram below wraps up our discussion so far:

![Sequence Diagram: Textbook RSA Encryption](https://cdn.hashnode.com/res/hashnode/image/upload/v1742754978876/9b007639-8595-4d11-93ff-355820cb98c7.png)
<!-- TODO: mermaid -->

---

## Digital Signatures

Digital signatures fulfill a different security goal: authenticity and integrity rather than confidentiality. While encryption and decryption use the public key for “locking” and the private key for “unlocking,” digital signatures reverse these roles.

### 1. Signing

The author of a message uses their private key $d$ to compute a signature $s$ on the message $m$, guided by the formula mentioned below:

$$
s=m^{d}\:\text{mod}\:n
$$

This can later be verified by others using the corresponding public key. The purpose here is not to recover a secret message but to create a proof of authenticity.

### 2. Verification

Anyone with the public key $\left(n,e\right)$ can verify that the signature $s$ indeed belongs to the message $m$ by computing:

$$
m\equiv{s^{e}}\:\text{mod}\:n
$$

If the equivalence holds, it confirms two key points: That the message has not been tampered with (that is, integrity), and that the signature must have been generated using the private key $d$ (that is, authenticity).  

As long as $d$ is kept secret, only the legitimate signer can produce a valid signature. Take at look at the sequence diagram below to understand the complete process.

![Sequence Diagram: Textbook RSA Signatures](https://cdn.hashnode.com/res/hashnode/image/upload/v1742755268516/6dea4239-f214-42c4-96c7-5fc55c7249d9.png)
<!-- TODO: mermaid -->
