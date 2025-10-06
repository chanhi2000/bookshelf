---
lang: en-US
title: "The Birth of the RSA Cryptosystem"
description: "Article(s) > (2/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (2/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "The Birth of the RSA Cryptosystem"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/the-birth-of-the-rsa-cryptosystem.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-the-birth-of-the-rsa-cryptosystem"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

The year 1978 witnessed the birth of a new era in cryptography with the introduction of the RSA cryptosystem, named after its inventors (Rivest, Shamir, and Adleman).

This development, introduced in the paper "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems", provided a method for secure digital communication and laid the foundation for modern public-key cryptography.

At the heart of RSA lies elementary number theory - specifically, the properties of prime numbers and modular arithmetic. Let’s first understand how these key concepts form its mathematical foundations.

---

## Prime Numbers and Composite Moduli

The algorithm starts by selecting two large prime numbers, denoted as $p$ and $q$. Their product ($n=p\times{q}$) forms the modulus for both the public and private keys.

The security of RSA depends heavily on the fact that, while multiplying these primes is computationally straightforward, factoring the resulting large composite number $n$ is considered infeasible for sufficiently large primes.

At this point, it’s important to note that p and q must be large prime numbers to ensure RSA’s security. Fortunately, modern libraries handle this automatically by using well-established prime-generation algorithms. As a result, you can focus on higher-level aspects of your applications without having to manage the low-level details of prime selection.

For instance, let’s have a look at OpenSSL’s RSA key generation routine which performs several checks to ensure that the resulting modulus $n=p\times{q}$ meets the desired bit-length requirements:

The below snippet right-shifts the product of the generated primes (stored in `r1`) by `bitse - 4` bits to isolate the top 4 bits, which are then checked to ensure that the modulus meets the desired size criteria.

```c
if (!BN_rshift(r2, r1, bitse - 4))
    goto err;
bitst = BN_get_word(r2);
```

The extracted bits (`bitst`) are then compared against a predefined range (from `0x9` to `0xF`). This range ensures that the most significant byte of the modulus isn’t too small or too large.

```c
if (bitst < 0x9 || bitst > 0xF) {
    bitse -= bitsr[i];
```

If the significant bits do not fall within the desired range, the bit length is adjusted and the prime-generation process is retried. If the number of retries exceeds a set limit, the entire process is restarted.

```c
if (!BN_GENCB_call(cb, 2, n++))
    goto err;
if (primes > 4) {
    if (bitst < 0x9)
        adj++;
    else
        adj--;
} else if (retries == 4) {
    i = -1;
    bitse = 0;
    sk_BIGNUM_pop_free(factors, BN_clear_free);
    factors = sk_BIGNUM_new_null();
    if (factors == NULL)
        goto err;
    continue;
}
retries++;
goto redo;
```

To ensure that the numbers are necessarily primes, these libraries use a combination of probabilistic tests, including the Rabin-Miler Primality Testing, and sieving methods to quickly eliminate non-prime candidates.

---

## The Euler Totient Function

For a number $n$ that is the product of two primes, the Euler totient function is given by:

$$
\phi\left(n\right)=\left(p-1\right)\left(q-1\right)
$$

This function counts the number of integers less than $n$ that are co-prime to $n$. Euler’s theorem, which states that for any integer $\alpha$ co-prime to $n$, $\alpha^{\phi\left(n\right)}\equiv1\left(\text{mod}\:n\right)$ plays a central role in proving why RSA’s operations are reversible.

But most modern RSA cryptosystems use the Carmichael function instead of the Euler’s Totient Function. We will examine the reasoning behind this shift in the next few sections.

---

## Computing the Keys

Now we select an integer $e$ such that $1\lt{e}\lt\phi\left(n\right)$ and $\text{gcd}\left(e,\phi\left(n\right)\right)=1$. This e becomes the public exponent you see as a parameter in the RSA function calls you make.

With that done, now let’s determine $d$ as the modular multiplicative inverse of $e\:\text{modulo}\:\phi\left(n\right)$. In other words, $d$ is computed such that:

$$
e\times{d}\equiv1\left(\text{mod}\:\phi\left(n\right)\right)
$$

This step is the mathematical linchpin ensuring that decryption is the inverse operation of encryption.

In the 1978 paper, the authors explicitly provided these formulas and steps. They showed that if you encrypt a message $m$ using $c=m^{e}\:\text{mod}\:n$ and then decrypt using $m=c^{d}\:\text{mod}\:n$ , the original message is recovered - thanks to the properties of modular exponentiation and Euler’s theorem. This mathematical framework was novel at the time and immediately set the stage for a new era in cryptography.
