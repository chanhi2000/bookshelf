---
lang: en-US
title: "How to Strengthen Your Code: Essential Secure Design Principles for Developers"
description: "Article(s) > How to Strengthen Your Code: Essential Secure Design Principles for Developers"
icon: fas fa-pen-ruler
category: 
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Strengthen Your Code: Essential Secure Design Principles for Developers"
    - property: og:description
      content: "How to Strengthen Your Code: Essential Secure Design Principles for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/essential-secure-design-principles-for-developers.html
prev: /academics/system-design/articles/README.md
date: 2024-10-10
isOriginal: false
author: Chama Jennane
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728461315564/0ec07485-8537-475e-8b15-3ab653ababfc.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Strengthen Your Code: Essential Secure Design Principles for Developers"
  desc="Secure design principles have long been the foundation for building secure systems. And they remain a crucial aspect of modern cybersecurity. Introduced in 1975 by Saltzer and Schroeder in their landmark paper The Protection of Information in Compute..."
  url="https://freecodecamp.org/news/essential-secure-design-principles-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728461315564/0ec07485-8537-475e-8b15-3ab653ababfc.jpeg"/>

Secure design principles have long been the foundation for building secure systems. And they remain a crucial aspect of modern cybersecurity.

Introduced in 1975 by Saltzer and Schroeder in their landmark paper *The Protection of Information in Computer Systems*, these timeless principles continue to guide secure system design today.

Secure design principles are aimed at protecting computer-stored information from unauthorized access. In this article, we’ll discuss these principles in detail, emphasizing their ongoing relevance in preventing security vulnerabilities. You’ll see some real-world examples that highlight the importance of adhering to these principles for creating robust, secure systems.

Saltzer and Schroeder outlined eight core principles along with two additional ones. These additional principles, while initially considered to apply imperfectly to computer systems, have since proven essential.

Let's start by outlining these secure design principles before delving deeper into each one.

---

## Key Secure Design Principles:

1. Economy of mechanism: Keep designs simple and minimal.
2. Fail-safe defaults: Base access on permission, not exclusion.
3. Complete mediation: Check every access request for authority.
4. Open design: Secrets lie in data, not design.
5. Separation of privilege: Require two parties for critical decisions, it is safer.
6. Least privilege: Operate with the minimum necessary permissions.
7. Least common mechanism: Limit shared subsystems between users.
8. Psychological acceptability: Ensure usability for humans.

Additional principles:

9. Work factor: Weigh the cost of breaching security against the attacker's resources.
10. Compromise recording: Log breaches when they occur.

---

## The Eight Main Secure Design Principles

### Economy of Mechanism

The first principle instructs that you should keep your design simple and compact to minimize unwanted access paths.

Errors often go unnoticed during normal use, making it crucial to have straightforward designs that are easier to inspect for vulnerabilities. A simpler codebase reduces the attack surface, offering fewer opportunities for exploitation and facilitating code verification.

But remember that simplicity isn’t just a synonym for brevity. For instance, consider this C code:

```c
// Example A 
if (a = b)  

// Example B 
a = b;   
if (a != 0)
```

Here, someone who looks at this code may think that the developer intended "==" instead of "=". The first example could lead to confusion, while the second clearly conveys the developer's intent. This may look trivial, but this confusion was key in an [<FontIcon icon="fas fa-globe"/>attempt to backdoor the Linux kernel in 2003](https://freedom-to-tinker.com/2013/10/09/the-linux-backdoor-attempt-of-2003/)!

Ultimately, it's tempting to write concise hacks that work, but they can become confusing, even to yourself in the future. Prioritize clean code and adhere to coding standards and best practices.

### Fail-Safe Defaults

You should base access decisions on permission rather than exclusion. Mistakes in permission-based systems typically result in accidental denials - that is, users being denied access to necessary information. These can be quickly identified.

On the other hand, errors in exclusion-based systems may lead to unauthorized access. These can often go unnoticed, as people rarely report having unnecessary permissions.

In essence, you should prioritize allowlists over denylists - not just in access control, but also in input validation.

An allowlist (formerly known as a whitelist) specifies who can access what, denying everyone else by default. In contrast, a denylist (formerly known as a blacklist) allows all access except for specified exclusions. These are often implemented as rules, such as only allowing an integer value between 0 and 200, or a string that must match a regular expression before it can be accepted as an e-mail address.

### Complete Mediation

This principle states that every access to every object must undergo an authority check. It ensures a comprehensive view of access control, encompassing all system operations, from initialization to recovery, shutdown, and maintenance.

It requires a reliable method for identifying the source of every request, and any changes in authority must be promptly updated. This principle also applies to input validation.

Complete mediation emphasizes that no access should rely on previous checks or assumptions of validity, reflecting the defense-in-depth approach. Each access request must be validated in real-time to prevent vulnerabilities, such as time-of-check to time-of-use (TOCTTOU) attacks.

Consider this scenario: You have two ATM cards linked to the same bank account. When you attempt to withdraw your funds at one ATM, it checks your balance and asks for confirmation. While waiting, you use the other ATM to withdraw the entire amount. If the first ATM didn't recheck your balance, you could exploit this to withdraw funds twice.

Fortunately, complete mediation ensures that the ATM verifies your balance again before dispensing cash, effectively preventing such exploitation.

### Open Design

Design transparency is crucial. Security should not rely on the ignorance of potential attackers, but instead on well-protected keys or passwords. Maintaining secrecy in widely distributed systems is unrealistic.

The open design principle is grounded in [<FontIcon icon="fas fa-globe"/>Kerckhoff’s principle](https://petitcolas.net/kerckhoffs/index.html), which asserts that a cryptographic system's security relies solely on the secrecy of its keys, while the algorithm itself should be public knowledge.

In contrast, security by obscurity assumes safety through concealment, which is fundamentally flawed. Attackers can obtain design documents, reverse-engineer products, or exploit hidden vulnerabilities. Beyond that, keeping the implementation secret complicates security audits and reviews. Effective security design must never depend on keeping the implementation confidential.

### Separation of Privilege

Using a dual-key system is generally more secure and adaptable than relying on a single key for access. A key principle of secure design is to implement multiple layers of protection. The more checks in place, the tougher it becomes for attackers.

But these checks should employ different mechanisms. For instance, in multi-factor authentication, combine knowledge-based methods (like a password) with either possession-based methods (like a token) or biometrics (like a fingerprint).

For added security, consider incorporating location data. If your credit card is used in London and then again in Moscow shortly after, your bank’s fraud detection will likely flag the second transaction. But it’s important to note that location data cannot substitute for any of the primary authentication factors.

This principle also implies the necessity of creating users with specialized roles and privileges instead of relying on superusers who can access everything.

### Least Privilege

Every program and user should have only the minimum privileges needed to perform their tasks. Identify the specific capabilities a program needs and provide only those permissions. This approach significantly reduces the impact of potential attacks.

For instance, an image viewer shouldn’t require network access, and a bus timetable app shouldn’t access your call history or contacts. While implementing this can be challenging, the best strategy is to deny all permissions by default and grant them gradually as necessary.

### Least Common Mechanism

Minimize shared mechanisms among users, as each shared component, especially those involving common variables, can create security risks. Any dependence between components can lead to widespread consequences if one is compromised.

Be cautious with shared code, as assumptions may change when the code interacts with different environments. For instance, the Ariane 5 rocket disaster resulted from reusing the Ariane 4 code without testing it with the new trajectory that had a much higher horizontal bias. This caused possibly the [<FontIcon icon="fas fa-globe"/>most expensive integer overflow in history](https://hownot2code.wordpress.com/2016/09/02/a-space-error-370-million-for-an-integer-overflow/).

Shared data poses similar risks. If two processes access the same temporary files, a compromise of one of the processes can affect the other. Process separation and isolation as well as utilizing techniques like containers and virtualization can help prevent the domino effect.

### Psychological Acceptability

Design user interfaces for ease of use to ensure users apply security mechanisms correctly. When users' mental models align with the protection mechanisms, errors are minimized. If the authentication process is overly complicated, users may resist it or find ways around it.

Balancing security and usability can be challenging, as increasing one often decreases the other. Aim for a compromise where security measures are effective but still allow for a positive user experience.

---

## The Two Additional Principles

### Work Factor

Assess the cost of bypassing security mechanisms against an attacker's resources, known as the "work factor." While some work factors are straightforward to calculate, many computer security mechanisms defy easy assessment, making it challenging to gauge the risks accurately.

You should aim for a balance between security costs and potential losses, considering both the attacker’s motivations and the value of your assets.

For example, securing your car is usually sufficient if it’s harder to steal than your neighbor’s. But if your car is particularly desirable to thieves, you’ll need stronger security measures.

For a practical example, password storage algorithms - such as Argon2, bcrypt, and scrypt - have a ‘work factor’ parameter that determines the amount of resources to use. This can be scaled to keep the algorithm fast enough for regular use, but prohibitively expensive to brute-force.

### Compromise Recording

This principle highlights the need for effective logging and evidence collection. If an attack goes unnoticed, the consequences can be severe, so detecting breaches promptly is vital for minimizing damage and facilitating incident response.

---

## Wrapping Up

As Saltzer and Schroeder remind us, these principles serve as helpful warnings rather than strict rules. If you notice a principle being violated in your design, it’s a sign that something could be wrong and should be closely examined to ensure the issue is addressed or isn’t significant.

Remember, even the best-designed systems can be vulnerable if a single bug slips through during implementation. That’s why secure design and implementation must work together - security is a comprehensive approach. Most exploitable weaknesses come from either the design phase or the implementation phase, and attackers don’t care which type they exploit - they just want to break in.

The latest OWASP Top 10 emphasizes the critical role of design by [<FontIcon icon="fas fa-globe"/>featuring "Insecure Design" for the first time](https://owasp.org/Top10/A04_2021-Insecure_Design/). To address this, it is essential for developer teams to understand best practices thoroughly.

[<FontIcon icon="fas fa-globe"/>Cydrill](https://cydrill.com/)’s secure coding training program delves into these principles, offering real-world examples that demonstrate how neglecting them can lead to serious vulnerabilities. Check it out if you want to learn more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Strengthen Your Code: Essential Secure Design Principles for Developers",
  "desc": "Secure design principles have long been the foundation for building secure systems. And they remain a crucial aspect of modern cybersecurity. Introduced in 1975 by Saltzer and Schroeder in their landmark paper The Protection of Information in Compute...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/essential-secure-design-principles-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
