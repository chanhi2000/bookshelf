---
lang: en-US
title: "Issues with Raw RSA"
description: "Article(s) > (6/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (6/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Issues with Raw RSA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/issues-with-raw-rsa.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-issues-with-raw-rsa"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

Raw or “Textbook” RSA soon turned out to be insecure when two major weaknesses were discovered.

The operations involved in RSA are entirely deterministic, which means that for a given plaintext $m$, encryption always produces the same cipher text

$$
C=m^{e}\:\text{mod}\:n.
$$

An eavesdropper or an attacker, say Eve, can guess or derive plain texts by exploiting the predictability of outputs. Since RSA encryption is a public operation, an attacker can encrypt likely messages and compare results to a target cipher text - a trivial chosen plaintext *attack*.

Besides this, textbook RSA is also malleable. This means that its algebraic structure allows attackers to manipulate cipher texts in meaningful ways. For instance, given a cipher text $C=\text{RSA}\left(M\right)$, an attacker can multiply it by the encryption of a known value (say, $r$) to produce a new cipher text $C'=C\cdot{r^{e}}\:\text{mod}\:n$, which decrypts to the plaintext $M\cdot{r}$. When the legitimate receiver decrypts $C'$, the result is $M\cdot{r}$, from which the attacker can often recover $M$.

Let’s understand these vulnerabilities with a small practical example.
