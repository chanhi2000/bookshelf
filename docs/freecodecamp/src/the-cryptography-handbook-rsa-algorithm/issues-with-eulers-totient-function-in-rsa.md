---
lang: en-US
title: "Issues with Euler’s Totient Function in RSA"
description: "Article(s) > (4/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (4/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Issues with Euler’s Totient Function in RSA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-cryptography-handbook-rsa-algorithm/issues-with-eulers-totient-function-in-rsa.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-issues-with-eulers-totient-function-in-rsa"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

While using Euler’s Totient Function works well in theory, implementers of the scheme realized its practical downsides. Simply put, the primary issue was that Euler’s Totient Function can lead to a larger private exponent $d$ than what was necessary.

To completely appreciate this fact, let’s take a step back to understand why the size of the private exponent $d$ matters in RSA.

RSA decryption (or signing) involves computing $m^{d}\:\text{mod}\:n$ which is done via modular exponentiation. The time complexity of exponentiation algorithms (like square-and-multiply) grows with the number of bits in $d$. A larger $d$ means more multiplications and squarings, that is slower decryption.

In practice, if using the Euler’s Totient Function makes $d$ roughly twice as large as what is required, then decryption can be almost twice as slow compared to using the minimal $d$. This inefficiency is especially noticeable when $e$ is small (common public exponents like $3$ or $65537$). A small e leads to a very large $d$ under $\phi\left(n\right)$.

Beyond performance, having an unnecessarily large $d$ can increase storage size slightly (a few more bytes for the key). This can also lead to interoperability quirks, which is why standards and protocols such as FIPS 186-4[^1] and RFC 8017[^2] expect $d$ to be below a certain size. We will take a detailed look at this in the next section.

To combat these issues, cryptographers utilized the Carmichael function to generate RSA keys. Before we dive into how the Carmichael function helps our case, let’s quickly understand what the Carmichael function actually is.

[^1]: FIPS 186-5: [<VPIcon icon="fas fa-globe"/>Digital Signature Standard (DSS)](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf)
[^2]: RFC 8017 PKCS #1: [<VPIcon icon="fas fa-globe"/>RSA Cryptography Specifications](https://rfc-editor.org/rfc/rfc8017.html)
