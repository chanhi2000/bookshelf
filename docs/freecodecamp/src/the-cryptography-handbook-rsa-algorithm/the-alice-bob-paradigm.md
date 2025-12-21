---
lang: en-US
title: "The Alice-Bob Paradigm"
description: "Article(s) > (1/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (1/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "The Alice-Bob Paradigm"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/the-alice-bob-paradigm.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-the-alice-bob-paradigm"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

Throughout this handbook, you will come across numerous sequence diagrams and mathematical proofs that use the Alice-Bob Paradigm.

The Alice-Bob paradigm is a common convention in cryptography where two generic entities, often named Alice and Bob, are used to illustrate various scenarios, protocols, or cryptographic principles.

![The Alice Bob Paradigm](https://cdn.hashnode.com/res/hashnode/image/upload/v1742677993632/c9312974-4cb9-4496-8b23-b6d0d61c0a45.png)
<!-- TODO: mermaid -->

These characters represent two parties engaged in communication, with Alice typically representing the sender or initiator, and Bob representing the receiver or responder.

We often introduce Eve as a third party, symbolizing an eavesdropper or potential attacker, adding an element of security risk, and illustrating scenarios where external entities might attempt to intercept or manipulate the communication.
