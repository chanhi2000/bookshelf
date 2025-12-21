---
lang: en-US
title: "The Carmichael Function"
description: "Article(s) > (5/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (5/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "The Carmichael Function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/the-carmichael-function.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-the-carmichael-function"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

The Carmichael Function, represented by $\lambda\left(n\right)$, also known as the reduced totient or least universal exponent, is defined as the smallest positive integer $m$ such that for every integer a co-prime to $n$, $a^{m}\equiv{1}\left(\text{mod}\:n\right)$.

To put this in easy terms, $\lambda\left(n\right)$ is the exponent of the multiplicative group modulo $n$ (the least common multiple of the orders of all elements). For RSA-style moduli (product of primes), the Carmichael function is guided by the formula:

$$
\lambda\left(n\right)=\text{lcm}\left(p−1,q−1\right)
$$

where $n=p\cdot{q}$ with $p$ and $q$ being the large primes.

You may now understand the Carmichael function better if we put it in the following way: $\lambda\left(n\right)$ is the least common multiple of $\lambda\left(n\right)$ of each prime power dividing $n$. So for a prime $p$, $\lambda\left(p\right)=\phi\left(p\right)=p-1$, and for two primes, we take the $\text{lcm}$ of $p−1$ and $q−1$.

---

## Mathematical Implication of The Carmichael function

The Carmichael function $\lambda\left(n\right)$ is a “tighter” bound. What this means is that $\lambda\left(n\right)$ divides $\phi\left(n\right)$ (since the exponent of a finite group always divides the group order by Lagrange’s Theorem[^3])

If $p$ and $q$ are both odd primes, then $p-1$ and $q-1$ are even, so their least common multiple is roughly half of $(p-1)(q-1)$. Mathematically:

$$
\lambda\left(n\right)=\frac{\left(p-1\right)\left(q-1\right)}{\text{gcd}\left(p-1,q-1\right)}
$$

We can observe that this $\lambda\left(n\right)$ is lesser than or equal to $\phi\left(n\right)$ and often considerably smaller. This means $\lambda\left(n\right)$ provides the minimal exponent needed for RSA’s correctness, whereas $\phi\left(n\right)$ might be a larger number that still works but isn’t necessary.

When you choose two large random primes $p$ and $q$, you have:

$$
\phi\left(n\right)=\left(p−1\right)\left(q−1\right)\approx{n}
$$

because for large primes, the subtracted ones make only a small difference compared to $p$ and $q$ themselves.

Now, since both $p−1$ and $q−1$ are even, they each have a factor of $2$. If those are their only common factors (which is often the case for random primes), then:

$$
\lambda\left(n\right)=\text{lcm}\left(p−1,q−1\right)\approx\frac{\phi\left(n\right)}{2}
$$

When you compute the private exponent $d$ as the modular inverse of e (a small number) modulo $\phi\left(n\right)$ versus modulo $\lambda\left(n\right)$, the range from which $d$ is chosen is roughly twice as large in the former case. That means the typical $d$ when computed modulo $\phi\left(n\right)$ can be about twice as large as when computed modulo $\lambda\left(n\right)$. A larger $d$ means that during decryption (or signing) the modular exponentiation cdmodn takes slightly more time.

Intuitively, using $\lambda\left(n\right)$ ensures we don’t “overshoot” the exponent required for the modular arithmetic to cycle back to 1. A smaller $d$ makes every RSA decryption and signature operation faster. For instance, if $\lambda\left(n\right)$ is roughly half of $\phi\left(n\right)$, then $d$ will have one less bit than it would otherwise, cutting the exponentiation work by about 50%. This is a free performance gain, as we aren’t changing the security assumptions or the key size $n$, just using the mathematically tight value for the exponent. The RSA algorithm’s security is not weakened by this and now the $d$ is different but functionally equivalent.

---

## The Carmichael Function in Modern Implementations

The critical property for RSA ($e\cdot{d}\equiv{1}\:\text{mod}\:\lambda\left(n\right)$) is both necessary and sufficient for correct decryption, thanks to Carmichael’s theorem. So there’s no need for $d$ to also satisfy the stronger condition modulo $\phi\left(n\right)$.

By switching to computing $d$ modulo  $\lambda\left(n\right)$ (i.e., $d=e^{−1}\:\text{mod}\:\lambda\left(n\right)$), we directly get the smallest working private exponent. Ronald Rivest himself noted this optimization in his 1999 seminal paper[^4], stating that solving for $d$ using $\lambda\left(n\right)$ instead of $\phi\left(n\right)$ is slightly preferable because it can result in a smaller value for $d$.

Over time, the use of $\lambda\left(n\right)$ in RSA moved from an academic suggestion to an industry standard. Today’s cryptographic standards explicitly acknowledge or require the $\lambda\left(n\right)$ approach.

For example, the official RSA standard (PKCS #1 v2.2, RFC 8017[^2]) defines the RSA key generation in terms of $\lambda\left(n\right)$. It specifies that the private exponent $d$ is chosen such that $e\cdot{d}\equiv{1}\left(\text{mod}\:\lambda\left(n\right)\right)$ (with $\lambda\left(n\right)=\text{lcm}\left(p-1,q-1\right)$). In other words, PKCS #1 expects the Carmichael function to be used for the modulus of the exponent. Likewise, NIST’s FIPS 186-4 (Digital Signature Standard) mandates that $d$ be less than $\lambda\left(n\right)$.

Any RSA key where $d$ is larger than $\lambda\left(n\right)$ is considered non-compliant in those strict contexts. This effectively forces implementations to use the smaller $\lambda\left(n\right)$-based exponent, since any “oversized” $d$ can be reduced mod  $\lambda\left(n\right)$ to meet the criterion.

Standards such as FIPS 186-4[^1] (the Digital Signature Standard) and RFC 8017[^2] (which specifies PKCS#1 v2.2 for RSA Cryptography) include requirements or recommendations that imply the private exponent $d$ should be as small as possible and ideally less than $\lambda\left(n\right)$. Using $\lambda\left(n\right)$ (the least common multiple of $p−1$ and $q−1$) directly produces the smallest valid d, whereas using $\phi\left(n\right)$ often results in a $d$ that is larger than necessary. This not only improves performance (by reducing the number of modular multiplications needed during decryption/signing) but also helps maintain interoperability with protocols that expect $d$ to be below a certain size.

The Python cryptography library (PyCA cryptography) explicitly documents[^5] that it uses Carmichael’s totient to generate the “smallest working value of $d$,” noting that older implementations (including the original RSA paper) used Euler’s totient and ended up with larger exponents. OpenSSL also uses the Carmichael function in their low-level RSA API[^6].

This shift to the Carmichael function ensures that under the hood your RSA key is a bit more efficient than the ones from the late 1970s while providing the same level of security.

[^1]: FIPS 186-5: [<VPIcon icon="fas fa-globe"/>Digital Signature Standard (DSS)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf)
[^2]: RFC 8017 PKCS #1: [<VPIcon icon="fas fa-globe"/>RSA Cryptography Specifications](https://rfc-editor.org/rfc/rfc8017.html)
[^3]: [<VPIcon icon="fa-brands fa-wikipedia-w"/>Lagrange's theorem](https://en.wikipedia.org/wiki/Lagrange%27s_theorem_\(number_theory\))
[^4]: Ronald L. Rivest, Robert D. Silverman: [Are Strong Primes Needed for RSA](https://people.csail.mit.edu/rivest/pubs/pubs/RS01.version-1999-11-22.pdf)?
[^5]: [<VPIcon icon="fas fa-globe"/>pyca/cryptography](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/rsa/)
[^6]: [OpenSSL Github (<VPIcon icon="iconfont icon-github"/>`openssl/openssl`)](https://github.com/openssl/openssl/blob/85cabd94958303859b1551364a609d4ff40b67a5/crypto/rsa/rsa_chk.c): `rsa_chk.c`
