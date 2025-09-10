---
lang: en-US
title: "Why SHA-1 or MD5 Are Safe in RSA-OAEP"
description: "Article(s) > (14/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (14/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Why SHA-1 or MD5 Are Safe in RSA-OAEP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/why-sha-1-or-md5-are-safe-in-rsa-oaep.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-why-sha-1-or-md5-are-safe-in-rsa-oaep"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

Earlier in the section above, we mentioned that we’d be using SHA-1 for our mathematical formulation and examples. When you see SHA-1 or MD5 used in the context of RSA-OAEP, don’t let the fact that these hash functions are considered broken for collision resistance alarm you. If you notice carefully in the previous section, the hash functions serve two very specific roles that do not rely on their collision resistance. Let’s break them down one by one:

---

## Label Hashing

The hash function is used to compute a fixed-length hash of an optional label $L$ (often empty).

Now let’s see why is this safe in the context. This hash, called $lHash$, acts as a domain separator. Its job is simply to ensure that the label is correctly associated with the ciphertext during decryption. As long as the label is chosen wisely (that is, not built from adversary-controlled parts), collision resistance isn’t critical here.

---

## Mask Generation Function ($MGF1$)

The hash function is also used inside $MGF1$ to create a pseudorandom mask. This mask is applied both to the data block $DB$ and to the random seed used in the encoding process.

In this context, the hash function is treated as a random oracle. The job is to spread the randomness of the seed across a larger block of data. For this purpose, properties like length extension or collision resistance are not relevant. What matters is that the output appears random, and even SHA-1 or MD5 can deliver that when used in this controlled, fixed-input scenario.
