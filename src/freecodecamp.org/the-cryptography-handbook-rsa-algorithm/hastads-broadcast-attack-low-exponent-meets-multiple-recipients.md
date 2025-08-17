---
lang: en-US
title: "Håstad’s Broadcast Attack: Low Exponent Meets Multiple Recipients"
description: "Article(s) > (9/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS" 
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
      content: "Article(s) > (9/17) The Cryptography Handbook: Exploring RSA PKCSv1.5, OAEP, and PSS"
    - property: og:description
      content: "Håstad’s Broadcast Attack: Low Exponent Meets Multiple Recipients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-cryptography-handbook-rsa-algorithm/hastads-broadcast-attack-low-exponent-meets-multiple-recipients.html
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
  url="https://freecodecamp.org/news/the-cryptography-handbook-rsa-algorithm#heading-hastads-broadcast-attack-low-exponent-meets-multiple-recipients"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743630655223/f7e0c094-2103-42cd-97bd-be79d14fff67.png"/>

In 1985, Johan Håstad’s highlighted the broadcast attack that illustrates the danger of a low exponent, $e$, when the same message is sent to multiple parties as a broadcast.

Imagine Alice wants to send the same plaintext message M to three different recipients. Each recipient has their own RSA public key with modulus $N_1$, $N_{2}$, $N_{3}$, but for speed all use $e=3$ (a common practice historically). Alice encrypts M with each public key, yielding ciphertexts:

$$
\begin{align*}
C_{1}=M^{3}\:\text{mod}\:N_{1}\\
C_{2}=M^{3}\:\text{mod}\:N_{2}\\
C_{3}=M^{3}\:\text{mod}\:N_{3}
\end{align*}
$$

Eve, who intercepts all three $C_{1}$, $C_{2}$, $C_{3}$ can recover $M$ without breaking any single RSA key.

Since each $N_{i}$ is different (and we assume they are pairwise coprime, as RSA keys should be), the attacker can use the Chinese Remainder Theorem (CRT) to combine the three congruences $x\equiv{C}_{i}\left(\text{mod}\:N_{i}\right)$. Note that at this point Eve only has $C_1$, $C_{2}$ and $C_{3}$. They do not have the plaintext $M$ or $M^{3}$ and yet they can reconstruct $M^{3}$ with the intercepted data. To understand the Chinese Remainder Theorem and this reconstruction, you may follow this: [<FontIcon icon="fa-brands fa-youtube"/>CRT, RSA, and Low Exponent Attacks](https://youtube.com/Mt9v7-xBuaA).

<VidStack src="youtube/Mt9v7-xBuaA" />

There is a unique solution modulo $N_{1}N_{2}N_{3}$ for $x$, and that solution turns out to be an integer, $x=M^{3}$ (because the true integer M3 is smaller than the product $N_{1}N_{2}N_{3}$ of each $M\lt{N}_{i}$). In essence, CRT lets Eve reconstruct $M^{3}$ exactly. Once they have $M^{3}$ as an ordinary integer, they simply take the cube root to find $M$. There’s no need to factor any modulus or invert the RSA function - the math falls out due to the low exponent.

The sequence diagram below aims to provide a high-level understanding of the attack:

![Sequence Diagram: Håstad’s Broadcast Attack](https://mermaid.ink/img/pako:eNqNlN9P2zAQx_-VmyWkIpWqSeostTQkFvawh-6h7AFNEcgk19RSY3e2A3RV__dd-gNoExB5is_f-_jum3PWLDcFMsEc_q1R53itZGlllWmgZymtV7laSu3haqFyhN4N6gLteXv_u3mA3hRppZCWQYckldYs3orCDtG1fMS3mqhD86ORXBWPaJ20KxLsJL-MRzAUPSlW7NdPlOvAG3AUhwqdkyXCpIn4uUUEezjVDQ7MYxJcXF62OxXQbDugyBytx2cPvfQ-gG8wuYugMgXo-4MfHbwOW7qJ4RExfJ_Y9rAbGB0Boxcjz862Fivt0ea4JNP2ZjnoFcZ7LEBaa57cvoST7wEX79j08xVI_nyQ22nJUXb4QXZX-0fJUXtiTkACKN1o522dU0rvdufUOdRO6RLS6e8DolUBFdCCpaZa1p7sS-sHhKkxHswMbj9RRhOgsWw2aXTnJLOqVFouXuf3S6ZZn1VoK6kKusrrBpoxEleYMUGvBc5kvfAZy_SGpLL25malcyaoPeyzellIf7j5TMzkwlGUbhoTa_bMRMCHAx7xMU84j5I4HPfZiolRMhgNR-NkxOM45FE8ijd99s8YIgwH4zCMEp4EQTLkX0MebHF_tpu7M7FQ3tjJ7uez_Qf1mTV1OX85v7RNNzu13Q53amrtmUjGm_8gLoH2?type=png)
<!-- TODO: mermaid -->

Now let’s see this attack in action with a sample:

Suppose three different RSA public keys all use exponent $e=3$, with moduli $n_{b}=187$ (for Bob),  
$n_{c}=115$ (for Carol), and $n_{d}=87$ (for Dave).

These $n_{i}$ are pairwise coprime ($\text{gcd}$ of each pair is $1$). Now assume the same plaintext message $M$ is encrypted with each public key. Let’s take a concrete $M$. For example with $M=42$, we will have:

$$
\begin{align*}
c_{b}&=M^{3}\:\text{mod}\:n_{b}\\
c_{c}&=M^{3}\:\text{mod}\:n_{c}\\
c_{d}&=M^{3}\:\text{mod}\:n_{d}
\end{align*}
$$

On calculating these, we have:

$$
\begin{align*}
c_{b}&=42^{3}\:\text{mod}\:187&=36\\
c_{c}&=42^{3}\:\text{mod}\:115&=28\\
c_{d}&=42^{3}\:\text{mod}\:87&=51
\end{align*}
$$

So the three ciphertexts observed are $36$, $28$, and $51$, respectively. Eve who knows $n_{b}$, $n_{c}$, $n_{d}$ and these ciphertexts can now recover $M$ as follows:

- Eve will compute the total modulus $N=n_{b}\cdot{n}_{c}\cdot{n}_{d}=187\times{115}\times{87}=1,870,935$. (This is the modulus for the combined system of congruences).
- Now Eve will compute the partial products for each congruence:

$$
\begin{align*}
N_{b}&=\frac{N}{n_{b}}&=\frac{1,870,935}{187}&=10,005\\
N_{c}&=\frac{N}{n_{c}}&=\frac{1,870,935}{115}&=16,269\\
N_{d}&=\frac{N}{n_{d}}&=\frac{1,870,935}{87}&=21,505
\end{align*}
$$

- At this point, Eve needs the inverses of each $N_i$ modulo its corresponding $n_{i}$:
  - First Eve computes $M_{b}=\left(N_{b}\right)^{−1}\:\text{mod}\:n_{b}$, *i.e.* the number $M_{b}$ such that $N_{b}\cdot{M}_{b}\equiv{1}\:\left(\text{mod}\:187\right)$. In this case, $N_{b}=10005$. Using the extended Euclidean algorithm, Eve can find $M_{b}=2$ (since $10005\times{2}=20010\equiv{1}\left(\text{mod}\:187\right)$).
  - Then Eve computes $M_{c}=\left(N_{c}\right)^{−1}\:\text{mod}\:n_{c}$. Here $N_{c}=16269$. The inverse mod $115$ turns out to be $M_{c}=49$ (For verification: $16269\times{49}\equiv{1}\left(\text{mod}\:115\right)$).
  - Next up, Eve computes $M_{d}=\left(N_{d}\right)^{−1}\:\text{mod}\:n_{d}$. For $N_{d}=21505$, the inverse mod $87$ is $M_{d}=49$ as well (coincidentally the same value in this case, since $21505\times{49}\equiv{1}\left(\text{mod}\:87\right)$).

Now Eve reconstructs the combined value using the Chinese Remainder Theorem for three congruencies. The construction of this formula is beyond the scope of this handbook, but to completely understand how this springs into action, you may go through this video: [<FontIcon icon="fa-brands fa-youtube"/>CRT, RSA and Low Exponent Attacks](https://youtu.be/Mt9v7-xBuaA).

$$
\begin{align*}
C&=c_{b}\cdot{N}_{b}\cdot{M}_{b}+c_{c}\cdot{N}_{c}\cdot{M}_{c}+c_{d}\cdot{N}_{d}\cdot{M}_{d}\:\left(\text{mod}\:N\right)
\end{align*}
$$

On substituting the numbers:

$$
\begin{align*}
C=36\cdot{10005}\cdot{2}+28\cdot{16269}\cdot{49}+51\cdot{21505}\cdot{49}\:\left(\text{mod}\:1,870,935\right)
\end{align*}
$$

Let’s carefully evaluate each term:

$$
\begin{align*}
36\cdot{10005}\cdot{2}&=720,360\\
28\cdot{16269}\cdot{49}&=22,341,348\\
51\cdot{21505}\cdot{49}&=5,37,40,995
\end{align*}
$$

Summing these gives a raw total of $7,20,360+2,23,21,068+5,37,40,995=7,67,82,423$. Now reduce this modulo $N=1,870,935$:

$$
\begin{align*}
C\equiv{7,67,82,423}&\left(\text{mod}\:1,870,935\right)\\
&C=74,088
\end{align*}
$$

Now Eve will simply take the cube root of $C:\:\sqrt[3]{74088}=42$, which is the original plaintext.  
Eve has successfully recovered $M$.

The key takeaway from these attacks is that without proper defenses. RSA alone does not satisfy modern definitions of security. It is not resistant to chosen-plaintext or chosen-cipher text attacks. This gap between the theoretical one-way function (RSA’s trapdoor permutation) and a secure encryption scheme became evident as implementers found that naive RSA could be “broken” by various clever tricks.

To counter these weaknesses, standards bodies introduced padding schemes to strengthen RSA encryption. In the following sections, you will learn about each of these paddings schemes and how they’ve been exploited over the years.
