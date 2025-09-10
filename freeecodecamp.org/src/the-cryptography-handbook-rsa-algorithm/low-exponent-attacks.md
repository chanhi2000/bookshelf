---
lang: en-US
title: "Low-Exponent Attacks"
description: "Article(s) > (8/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (8/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Low-Exponent Attacks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/low-exponent-attacks.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-low-exponent-attacks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

Beyond determinism and malleability exploits, textbook RSA is also vulnerable to Low-Exponent Attacks. Using a small public exponent like $e=3$ (or sometimes $17$) was popular because it used to speed up encryption and signature verification. But this soon turned out to be a security concern.

When RSA uses a small public exponent (say, $e=3$) and the plaintext is very short (so that $M^{3}$ is smaller than the modulus $n$), the encryption does not “wrap around” modulo $n$. Mathematically:

$$
\begin{align*}
c=M^{3}\:\text{mod}\:n&=M^{3}&&\left(\text{if }M^{3}\lt{n}\right)
\end{align*}
$$

Let’s understand this with an easy example:

Consider our plaintext to be: $M=5$. We compute $M^{3}$ as $M^{3}=5^{3}=125$. Now assume n is a 4096‑bit number which is large compared to $125$. In this case, the ciphertext is simply $c=125$. Eve intercepting $c=125$ can compute the cube root of $125$ to get the plaintext: $\sqrt[3]{125}=5$ thus recovering $M$ directly.

This shows that if $M$ is small enough, the ciphertext leaks the plaintext when $e$ is low.
