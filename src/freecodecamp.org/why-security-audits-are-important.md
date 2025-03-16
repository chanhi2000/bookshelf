---
lang: en-US
title: "Why Security Audits Are Important"
description: "Article(s) > Why Security Audits Are Important"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why Security Audits Are Important"
    - property: og:description
      content: "Why Security Audits Are Important"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-security-audits-are-important.html
prev: /devops/security/articles/README.md
date: 2025-03-20
isOriginal: false
author:
  - name: P S Mohammed Ali
    url : https://freecodecamp.org/news/author/psmohammedali/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742397497226/ec06b7c2-1a2a-4eb1-bbaa-4c1d40e4e60e.png
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

[[toc]]

---

<SiteInfo
  name="Why Security Audits Are Important"
  desc="In this digital world, companies rely on the latest technology to run their businesses, and the risk of cyber attacks is high. Every product, whether it’s software or an application, should go through some sort of security testing process. These chec..."
  url="https://freecodecamp.org/news/why-security-audits-are-important"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742397497226/ec06b7c2-1a2a-4eb1-bbaa-4c1d40e4e60e.png"/>

In this digital world, companies rely on the latest technology to run their businesses, and the risk of cyber attacks is high.

Every product, whether it’s software or an application, should go through some sort of security testing process. These checks reveal whether the product is safe or vulnerable to threats.

Penetration testing is a common way to test process or products, but it’s typically more specifically designed with a particular product in mind. On the other hand, a full security audit has a broader scope and covers more ground than penetration testing alone.

In this article, you’ll learn what’s involved in a standard security audit and how these processes can help keep your software secure. By the end, you’ll have a better idea of how security audits can help improve an organisation’s overall security posture.

---

## What is a Security Audit?

A security audit is an overall review of an organization’s security controls, policies, standards, and procedures based on a set of predefined expectations.

These predefined expectations are derived from industry standards such as PCI DSS (Payment Card Industry Data Security Standard), which is a mandatory framework for organizations dealing with credit card transactions. Similarly, HIPAA (Health Insurance Portability and Accountability Act) focuses on the privacy and protection of your health information, making it essential for companies who are handling health-related data.

Apart from these standards, polices, and frameworks, security audits also examine infrastructure components and check application backups or recovery mechanisms to make sure data is protected if accidental or malicious data loss occurs.

The outcome of the audit can help inform the company of its current security posture, and also provides details about possible vulnerabilities and compliance threats.

Usually, security audits are conducted by a group of security experts. They plan the audit well in advance to ensure that it interrupts the company’s day-to-day business as little as possible.

There are two types of security audits:

1. Internal Audit
2. External Audit

In this article, we will discuss internal audits. The main difference between the two processes is that internal audits are conducted by people belonging to the organization, while external audits are conducted by a security team outside the organisation.

---

## Elements of an Internal Audit (Process Flow)

A well-structured security audit provides transparency and ensures that there’s a systematic approach to evaluating the effectiveness of in-place security policies and procedures.

The internal audit process typically follows these five steps:

1. Establishing goals and objectives
2. Conducting a risk assessment
3. Completing a control assessment
4. Assessing compliance
5. Communicating to stakeholders

To understand the elements of an internal audit in more detail, let's break down the process by working through a case study. This will show you how a company or team can plan an internal audit using a systematic approach.

---

## Security Audit Case Study

In order to understand this process more clearly, let’s consider an e-Commerce website called “walkGen.com” as an example.

**Case Study:** There is a eCommerce website named **walkGen.com** which primarily sells footwear through their website. Customers can order by logging in using their username and password and can pay using a credit/debit card or UPI. To create a better user experience, the website asks for the user’s name, age, gender, and location for personalized information and design.

With this information in mind, let’s conduct a security audit for the website.

### Step 1: Establish Goals and Objectives

This first step involves identifying all the critical assets and services required for the website to run. You’ll also need to define a set of industry standard expectations.

For our walkGen.com website, the critical assets we need to consider include customer data, transaction details, and infrastructure details like hosting server, database, and so on.

Keeping these initial data points in mind, here are some possible goals and objectives:

1. **Strength access controls**: We want to make sure there are strict authentication and authorization policies in place for any users who sign in.
2. **Maintain proper frameworks**: Since customers can pay using a credit card, we’ll want to ensure that the site adheres to standards like PCI DSS for payment security.
3. **Secure Infrastructure**: Assets like hosting servers and databases need to be safeguard from cyber threats and theft.

Now, the key expectations are that we’ll maintain compliance with security standards such as GDPR (General Data Protection Regulation) for protecting customer data as well as PCI DSS (Payment Card Industry Data Security Standard) for monetary transactions. We’ll also need to perform regular maintenance and patch updates for servers and databases.

### Step 2: Conduct a Risk Assessment

Risk assessment helps us identify and prioritize threats that may possibly affect walkGen’s critical assets. It helps categorize the risks based on their severity and likelihood.

Identifying and categorizing risks will be the ultimate goal in this step, as it will help walkGen implement effective security measures for critical risks compared to low/information risks.

From the assets and services we identified in the previous step, the possible risks could be:

1. **Customer data leakage**: Exposure of customer data such as names, email ID, customer delivery addresses, payment details, and so on.
2. **Man-in-the-Middle attacks**: Intercepting website traffic between the logged in users and the website, leading to stolen login credentials, stored payment card details, and so on.
3. **Non-compliance with PCI DSS:** Failing to meet the standards required for handling credit card transaction securely.
4. **Unauthorized transactions or stolen payment details:** payment transaction happening on compromised accounts by cybercriminals.
5. **Server vulnerabilities:** Weaknesses/loopholes in the hosted web server configuration, third-party software, or cloud network infrastructure.
6. **Database exploits:** Exploiting vulnerabilities present in the database through penetration testing like SQL Injection, and so on.
7. **Missing patch updates**: Ignoring/Failing to apply security patches for the OS or walkGen’s applications.

::: note

If you look closely, some of these risks seem to overlap with others, and some may seem to be defined in the same way. This is called the “**chain link of risk**”. But deep down they are different from each other.

:::

Once we’ve identified these risks, the next step is to prioritize them (Critical, Medium, or Low) based on various factors such as severity, likelihood of occurring, potential damage that may happen if the threat occurs, and so on.

::: tabs

@tab:active Critical Risk

- Customer data leakage
- Man-in-the-Middle attacks  
- Non-Compliance with PCI DSS  
- Unauthorized transactions or stolen payment details  
- Database Exploits

@tab Medium Risk

- Server vulnerabilities

@tab Low Risk

- Missing patch updates

:::

### Step 3: Complete a Controls Assessment

This phase ensures that security checkpoints/controls are implemented for the risks we’ve identified while maintaining compliance standards. If any security controls are missing, the audit documents them and provides optimized preventative measures to safeguard the WalkGen website.

In this particular scenario, some control assessments could be:

- Implementing Multi-Factor Authentication (MFA) or 2 Factor Authentication (2FA) using a one time password (OTP) request to a registered mobile number to prevent accidental exposure of customer data.
- Protecting data using encryption standards such as AES (Advanced Encryption Standard)-256 and TLS (Transport Layer Security) 1.3 for secure data transmission, thus helping eliminate possible man-in-the-middle attacks.
- Also, [**implementing SIEM**](/freecodecamp.org/how-to-create-a-python-siem-system-using-ai-and-llms.md) (Security Information and Event Management) Tools for event logging to prevent Man-in-the-Middle attacks.
- Account compromise often happens through brute-force attacks when the attacker makes multiple login attempts while trying to guess a user’s password. On the walkGen website, a security plugin has been implemented to block multiple login attempts.

![Security plugin](https://cdn.hashnode.com/res/hashnode/image/upload/v1742237464615/aba6bb18-48dd-40d1-8d27-681711077ef9.png)

- As stated in the "chain link of risk," the risks of non-compliance with PCI DSS and unauthorized transactions or stolen payment details fall into the same category. We can mitigate these risks by enabling proper authorization during payment transactions and, more importantly, disabling the "Remember my card" option by default, which significantly reduces the risk.
- Server vulnerabilities and missing patch updates also fall into the same category of human-based risks. These risks are mitigated by providing periodic updates and reminders to the respective person in charge for walkGen servers. There is a high likelihood that hosting clouds such as Azure, AWS, or Google Cloud Platform (GCP) may have server vulnerabilities, which we can avoid by keeping them updated to their latest versions.

This phase helps us understand the actual security posture in protecting the website from real time attacks.

### Step 4: Assess Compliance

Usually, this phase is merely a continuation of the previous phase. But in an audit, equal weight is given to both risk and compliance. This means that we’ll need to conduct a separate compliance review for all the measures taken to mitigate the risks.

Industry regulations and security standards such as GDPR, PCI DSS, Cybersecurity Best Practices, and ISO 27001 (Information Security Management System) are applicable to WalkGen. Assessing whether these standards are maintained and followed is important – otherwise the website may face threats or heavy fines for non-compliance.

These frameworks are general and foundational frameworks that must be adhered to by almost all companies, regardless of their working model. But there are certain frameworks that are more specific to companies like WalkGen.

One specific framework for walkGen would be ISO 22301 (Business Continuity Management System - BCMS), which helps to ensures that walkGen can continue its operations during cyber attacks (if this happens). It also ensures that the company creates disaster recovery and risk mitigation plans to prepare for the worst case scenario.

::: note

If a security control is effective in mitigating the risk but is still not compliant with regulations, it’s considered a red flag in security.

:::

At this stage, 95% of the audit is complete. The team members conducting the audit should have a clear understanding of the risks managed, the security working model, the frameworks implemented, and the security protocols that WalkGen adheres to.

### Step 5: Communicate to Stakeholders

This phase concludes the audit process for walkGen and provides the audit results to the relevant security teams and board members, such as founders and the CEO. This report helps them understand the findings and determine the next steps for the website, including how much funding should be allocated for the necessary security measures.

The report for security teams will contain a lot of technical nuances, such as the scope of the website, how vulnerabilities are identified (with code snippets), and a detailed walkthrough of each vulnerability. In contrast, the report for non-technical people, including potentially founders and CEOs, will provide high-level information about the audit and security gaps.

Typically, WalkGen's audit report provides insights such as:

- A summary of identified risks and managed threats
- Implemented security frameworks
- Compliance status: Statements such as "WalkGen meets industry standards like GDPR and ISO 22301."
- Recommendations and further steps, includes suggested security enhancements, security budget requirements, and respective action plans for WalkGen.

---

## Conclusion

Companies should conduct security audits regularly. Each time, they should compare the current results with the previous audit’s results to check the analytics and security status of the organisation.

I hope this article gave you a better idea about what’s involved in a security audit and why they’re necessary for companies to complete on a regular basis. It’s important for companie to stay resilient against cyber threats, reduce potential and legal risks, and maintain customer trust in this evolving digital world.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Security Audits Are Important",
  "desc": "In this digital world, companies rely on the latest technology to run their businesses, and the risk of cyber attacks is high. Every product, whether it’s software or an application, should go through some sort of security testing process. These chec...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-security-audits-are-important.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
