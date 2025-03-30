---
lang: en-US
title: "The Road Ahead: Assessing RSA’s Long-Term Viability"
description: "Article(s) > (17/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (17/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "The Road Ahead: Assessing RSA’s Long-Term Viability"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/the-road-ahead-assessing-rsas-long-term-viability.html
next: /freecodecamp.org/the-cryptography-handbook-rsa-algorithm/README.md#references
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-the-road-ahead-assessing-rsas-long-term-viability"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

In 1994, Peter Shor’s algorithm[^1], demonstrated that a quantum computer can factor large integers in polynomial time, thereby efficiently breaking RSA’s underlying hard problem – the difficulty of factoring $n=p\times{q}$.

Although experimental quantum computers have made progress, they remain far from having the number of stable qubits required to break RSA keys of practical sizes ($2,048$ or $4,096$ bits).

In anticipation of large-scale quantum computers, the cryptographic community is actively developing and standardizing algorithms believed to be resistant to quantum attacks. These include lattice-based schemes (such as CRYSTALS-Kyber and NTRU), code-based cryptography (such as the McEliece cryptosystem), hash-based signatures (such as XMSS), and multivariate polynomial cryptosystems.

It’s important to note that while OAEP and PSS improve the security of RSA against classical attacks, they do not protect RSA from quantum attacks. In a post-quantum world, even the most secure classical padding will not prevent a quantum computer from breaking RSA using Shor’s algorithm.

In the near term, RSA remains in widespread use and, when implemented with padding schemes such as OAEP and PSS, continues to provide strong security against classical adversaries. But looking ahead, it’s expected that organizations will gradually migrate to post-quantum algorithms as they mature and become standardized.

[^1]: [<FontIcon icon="fas fa-globe"/>Algorithms for quantum computation](https://ieeexplore.ieee.org/abstract/document/365700/): discrete logarithms and factoring
