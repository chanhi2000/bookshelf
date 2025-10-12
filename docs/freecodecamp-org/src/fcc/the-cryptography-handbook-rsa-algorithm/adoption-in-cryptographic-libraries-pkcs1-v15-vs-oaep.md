---
lang: en-US
title: "Adoption in Cryptographic Libraries (PKCS#1 v1.5 vs OAEP)"
description: "Article(s) > (15/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (15/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Adoption in Cryptographic Libraries (PKCS#1 v1.5 vs OAEP)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/adoption-in-cryptographic-libraries-pkcs1-v15-vs-oaep.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-adoption-in-cryptographic-libraries-pkcs1-v15-vs-oaep"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

After the Bleichenbacher attack, standards and libraries migrated to OAEP or at least added support for it, while treating PKCS#1 v1.5 as a legacy option. Modern cryptographic libraries and protocols reflect these lessons.

In 1998, the RSA standard was updated. PKCS#1 v2.0 introduced RSAES-OAEP as the new recommended encryption scheme, and by PKCS#1 v2.1 and v2.2 (RFC 3447 and RFC 8017), OAEP is required for new applications, with PKCS#1 v1.5 included only for backward compatibility.

OpenSSL discourages users from using PKCS#1 v1.5 as it leaks information that can potentially be used to mount a Bleichenbacher padding oracle attack[^1]. The documentation clearly mentions that it is highly recommended to use `RSA_PKCS1_OAEP_PADDING` in new applications.

The Python cryptography library (PyCA cryptography) also asks developers to use OAEP for encryption instead of PKCS#1 v1.5[^2].

After Bleichenbacher’s 1998 attack, it was impractical to instantly replace PKCS#1 v1.5 everywhere. Instead, protocol designers issued countermeasures.

TLS, for example, responded by changing the error handling: the server would not reveal a padding failure distinctly. It would generate a fake premaster secret and proceed to prevent timing clues, and always return a generic handshake failure at a later stage, making it harder for the attacker to distinguish why decryption failed.

These countermeasures reduced the oracle’s fidelity but were tricky to get right across different implementations. In fact, not everyone got it right - the Bleichenbacher attack continued to resurface in various forms when implementations made mistakes in error handling.

In 2018, researchers discovered the ROBOT attack (Return Of Bleichenbacher’s Oracle Threat): several TLS implementations had subtle bugs that recreated a padding oracle, allowing the attack to succeed 19 years later. The ROBOT paper showed that even with countermeasure guidelines, the complexity of uniformly handling errors led to slip-ups in popular products.

This underscores that patching an insecure scheme is often error-prone - a design that is secure by construction (like OAEP) is preferable.

PKCS#1 v1.5 continues to exist because of these patchwork security measures and the fact that it cannot be abruptly removed from all existing systems. It is generally regarded as "legacy" or maintained "for compatibility" purposes. The collective wisdom is clear: use OAEP for RSA encryption whenever possible.

[^1]: RSA_public_encrypt: [<VPIcon icon="fas fa-globe"/>Warnings](https://docs.openssl.org/3.5/man3/RSA_public_encrypt/#warnings)
[^2]: [<VPIcon icon="fas fa-globe"/>pyca/PKCS1v1](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/rsa/#cryptography.hazmat.primitives.asymmetric.padding.PKCS1v15)