---
lang: en-US
title: "The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
description: "Article(s) > The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
icon: fas fa-shield-halved
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
      content: "Article(s) > The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/
prev: /devops/security/articles/README.md
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
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Mathematics > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/math/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
  desc="The RSA algorithm was introduced in 1978 in the seminal paper, ”A Method for Obtaining Digital Signatures and Public-Key Cryptosystems”. Over the decades, as RSA became integral to secure communications, various vulnerabilities and attacks have emerg..."
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

The RSA algorithm was introduced in 1978 in the seminal paper, "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems". Over the decades, as RSA became integral to secure communications, various vulnerabilities and attacks have emerged, underscoring the importance of understanding and implementing RSA correctly.

This handbook will help you understand the internal workings of the RSA algorithm, how they have evolved over the years, and the schemes defined under various RFCs. This knowledge will help you make informed choices about the most suitable RSA schemes depending on your business requirements.

In this handbook, we’ll begin by exploring the foundational principles of the RSA algorithm. By examining its mathematical underpinnings and historical evolution, you will gain insight into the diverse array of attacks that have emerged over the years.

The narrative unfolds as an evolutionary journey: from the original, straightforward (textbook) RSA implementation, through the discovery of vulnerabilities, to the development of effective countermeasures, and further refinements as new challenges were encountered. This progression illuminates how RSA has transformed over time and also demonstrates how modern cryptographic libraries have integrated these advancements to achieve secure implementations in today’s applications.

You can also watch the associated video here:

- [The Alice-Bob Paradigm](#heading-the-alice-bob-paradigm)
- [The Birth of the RSA Cryptosystem](#heading-the-birth-of-the-rsa-cryptosystem)
- [RSA Operations](#heading-rsa-operations)
- [Issues with Euler’s Totient Function in RSA](#heading-issues-with-eulers-totient-function-in-rsa)
- [The Carmichael Function](#heading-the-carmichael-function)
- [Issues with Raw RSA](#heading-issues-with-raw-rsa)
- [Exploiting Textbook RSA’s Determinism and Malleability](#heading-exploiting-textbook-rsas-determinism-and-malleability)
- [Low-Exponent Attacks](#heading-low-exponent-attacks)
- [Håstad’s Broadcast Attack: Low Exponent Meets Multiple Recipients](#heading-hastads-broadcast-attack-low-exponent-meets-multiple-recipients)
- [Introduction to Padding Schemes in RSA](#heading-introduction-to-padding-schemes-in-rsa)
- [Public Key Cryptography Standards (PKCS#1 v1.5)](#heading-public-key-cryptography-standards-pkcs1-v15)
- [The Bleichenbacher Attack](#heading-the-bleichenbacher-attack)
- [Optimal Asymmetric Encryption Padding (OAEP)](#heading-optimal-asymmetric-encryption-padding-oaep)
- [Why SHA-1 or MD5 Are Safe in RSA-OAEP](#heading-why-sha-1-or-md5-are-safe-in-rsa-oaep)
- [Adoption in Cryptographic Libraries (PKCS#1 v1.5 vs OAEP)](#heading-adoption-in-cryptographic-libraries-pkcs1-v15-vs-oaep)
- [Enhancing Digital Signatures: The Transition to PSS](#heading-enhancing-digital-signatures-the-transition-to-pss)
- [The Road Ahead: Assessing RSA’s Long-Term Viability](#heading-the-road-ahead-assessing-rsas-long-term-viability)
- [References](#heading-references)

::: note Prerequisites

**1. Linear Algebra:**

A foundational understanding of Linear Algebra and Modular Arithmetic will help you understand certain sections of the handbook, though it is not an absolute requirement. This handbook provides comprehensive explanations of mathematical expressions and their underlying concepts as they arise.

For a concise and relevant introduction to the Chinese Remainder Theorem (CRT) in the context of the handbook, you may find this resource helpful: [<FontIcon icon="fa-brands fa-youtube"/>CRT, RSA, and Low Exponent Attacks](https://youtu.be/Mt9v7-xBuaA).

<VidStack src="youtube/Mt9v7-xBuaA" />

**2. Patience (and a Sense of Adventure):**

RFCs can sometimes get dull to read, and research papers can feel intimidating at first glance. This handbook is designed to make standard cryptographic concepts accessible to everyone, guiding you through each step with clarity and intuition. Every concept is reinforced with clear, step-by-step examples, ensuring not only a thorough understanding but also familiarity with widely used standard notations. So take your time, take a deep breath, and embrace the journey.

For visual learners, the associated video may offer a more engaging experience.

:::

```component VPCard
{
  "title": "The Alice-Bob Paradigm",
  "desc": "(1/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-alice-bob-paradigm.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Birth of the RSA Cryptosystem",
  "desc": "(2/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-birth-of-the-rsa-cryptosystem.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "RSA Operations",
  "desc": "(3/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/rsa-operations.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Issues with Euler’s Totient Function in RSA",
  "desc": "(4/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/issues-with-eulers-totient-function-in-rsa.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Carmichael Function",
  "desc": "(5/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-carmichael-function.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Issues with Raw RSA",
  "desc": "(6/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/issues-with-raw-rsa.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Exploiting Textbook RSA’s Determinism and Malleability",
  "desc": "(7/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/exploiting-textbook-rsas-determinism-and-malleability.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Low-Exponent Attacks",
  "desc": "(8/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/low-exponent-attacks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Håstad’s Broadcast Attack: Low Exponent Meets Multiple Recipients",
  "desc": "(9/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/hastads-broadcast-attack-low-exponent-meets-multiple-recipients.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Introduction to Padding Schemes in RSA",
  "desc": "(10/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/introduction-to-padding-schemes-in-rsa.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Public Key Cryptography Standards (PKCS#1 v1.5)",
  "desc": "(11/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/public-key-cryptography-standards-pkcs1-v15.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Bleichenbacher Attack",
  "desc": "(12/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-bleichenbacher-attack.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Optimal Asymmetric Encryption Padding (OAEP)",
  "desc": "(13/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/optimal-asymmetric-encryption-padding-oaep.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Why SHA-1 or MD5 Are Safe in RSA-OAEP",
  "desc": "(14/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/why-sha-1-or-md5-are-safe-in-rsa-oaep.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Adoption in Cryptographic Libraries (PKCS#1 v1.5 vs OAEP)",
  "desc": "(15/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/adoption-in-cryptographic-libraries-pkcs1-v15-vs-oaep.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Enhancing Digital Signatures: The Transition to PSS",
  "desc": "(16/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/enhancing-digital-signatures-the-transition-to-pss.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "The Road Ahead: Assessing RSA’s Long-Term Viability",
  "desc": "(17/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "link": "/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-road-ahead-assessing-rsas-long-term-viability.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## References

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS",
  "desc": "The RSA algorithm was introduced in 1978 in the seminal paper, ”A Method for Obtaining Digital Signatures and Public-Key Cryptosystems”. Over the decades, as RSA became integral to secure communications, various vulnerabilities and attacks have emerg...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
