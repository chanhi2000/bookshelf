---
lang: en-US
title: "What is Penetration Testing in Cybersecurity? A Beginner's Guide"
description: "Article(s) > What is Penetration Testing in Cybersecurity? A Beginner's Guide"
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
      content: "Article(s) > What is Penetration Testing in Cybersecurity? A Beginner's Guide"
    - property: og:description
      content: "What is Penetration Testing in Cybersecurity? A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/beginners-guide-to-penetration-testing-cybersecurity.html
prev: /devops/security/articles/README.md
date: 2025-02-08
isOriginal: false
author:
  - name: P S Mohammed Ali
    url : https://freecodecamp.org/news/author/psmohammedali/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738941455446/843335c0-35a3-4173-bd4c-7baf0e630e8e.png
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
  name="What is Penetration Testing in Cybersecurity? A Beginner's Guide"
  desc="In today's digital world, almost every activity we engage in is intertwined with technology. From making payments via UPI and booking movie or travel tickets online to selling products through e-commerce platforms, technology has become an integral p..."
  url="https://freecodecamp.org/news/beginners-guide-to-penetration-testing-cybersecurity"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941455446/843335c0-35a3-4173-bd4c-7baf0e630e8e.png"/>

In today's digital world, almost every activity we engage in is intertwined with technology. From making payments via UPI and booking movie or travel tickets online to selling products through e-commerce platforms, technology has become an integral part of our daily routine.

To make sure that these activities are safe and secure, dev teams need to have a robust security testing framework in place. This helps identify vulnerabilities, prevent cyber threats, and maintain the integrity of digital transactions.

In this article, you will learn all about penetration testing - what it is, why each phase of the process is important, and the tools pentesters use to do their jobs.

---

## What is Penetration Testing?

Penetration Testing is a practice used by security professionals to help companies and teams secure their data. A company gives the security pro permission to try to find vulnerabilities in their system. The security pro then reports any potential weak spots they find to the company so they can fix them. This helps these companies prevent potential attacks before hackers can get access to their data.

If a company fails to conduct pentesting, it can lead to serious consequences like policy violations, hefty compliance regulation fines, loss of customer trust, and a decline in the organization's reputation and overall business value.

There are four phases of penetration testing:

1. Reconnaissance
2. Scanning
3. Exploitation
4. Report Submission

Let’s go through each one so you can learn what’s involved in the entire process.

---

## Reconnaissance: The Art of Information Gathering

Reconnaissance involves gathering information about the target system or network. A pentester’s goal here is to collect as much data as possible about the target, helping them understand the target’s architecture, identify potential vulnerabilities, and develop an effective attack strategy.

In reconnaissance, testing can be conducted in various ways, such as browsing social media for information about the target, using information-gathering tools like theHarvester to crawl websites related to the target domain, and more.

At this stage, all available data—whether technical or non-technical—is gathered without filtering for relevance. The goal is to collect as much information as possible, as even seemingly insignificant details can later prove useful in an attack.

Reconnaissance is crucial for a successful penetration test. So it can be a time-consuming process, often taking anywhere from a few hours to several weeks, depending on the complexity of the target.

### Types of Reconnaissance

We can categorize reconnaissance into two main types based on the level of interaction with the target system:

First, we have passive reconnaissance. This involves gathering information from publicly available sources **without directly interacting** with the target system. Since no direct contact is made, it is stealthy and less likely to alert the target.

At this point, a question may arise: If penetration testing is conducted with prior approval from the target domain, why should we conduct passive reconnaissance to minimize direct interaction when we have the freedom to perform active reconnaissance?

Well, a penetration tester must think from an unethical hacker's perspective. Attackers often rely heavily on passive reconnaissance techniques to gather critical information without alerting the target, making it a crucial phase in ethical hacking as well.

This is why penetration testing should include passive reconnaissance. It helps identify potential information leaks, such as a target company's public announcements or employees posting coding-related doubts on platforms like Substack, which could lead to unauthorized system access.

Active Reconnaissance, on the other hand, involves **direct interaction** with the target system to extract specific information. Common methods include port scanning, banner grabbing, and network sniffing.

This approach provides more accurate and detailed information, but it comes with a higher risk—the tester’s IP address or digital footprint may be logged by the target system.

For the reconnaissance phase, there are numerous tools available on the internet. But a few are considered highly efficient and popular among penetration testers. Some of these include Medusa and theHarvester.

![As an example here, we’ll use theHarvester to gather information on a target domain (Zudio.com) and analyze the different types of data retrieved by the tool.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738871546984/dc7e71a4-e76d-42df-b895-4b2f626fe902.png)

You can see that the tool crawled the Brave search engine and discovered a couple of IP addresses along with additional subdomains of the target domain (Zudio.com). These findings should be properly documented and included in the target’s reconnaissance report.

![Findings from gathering info using theHarvester](https://cdn.hashnode.com/res/hashnode/image/upload/v1738871767740/e0af88ca-35ec-435c-9196-2a0f173cb6fd.png)

---

## Scanning: The Art of Detecting Loopholes

The information a pentester gathers during the reconnaissance phase serves as a crucial input for the scanning phase. This data helps them gain deeper insights into the target system, allowing them to pinpoint areas and filter data that require further analysis.

With a wide range of scanning tools available, pentesters utilize various techniques to:

- Identify open ports, as they can serve as potential entry points.
- Monitor network activity to detect vulnerabilities and security gaps.

### Phases of Scanning

Scanning typically involves two key steps:

First, we have **port scanning**, which identifies open and closed ports on the target system. This helps determine which services are running and are potentially exploitable.

System Ports serve as entry points for a computer system to perform various tasks. Ensuring that all unnecessary ports are closed is crucial for security. Leaving optional ports open can create potential entry points for hackers.

You can use tools like **Nmap, Netcat, Masscan** for this purpose.

For better understanding, let's scan a sample target domain (192.168.13.136) using Nmap and check which service ports are open.

![Nmap scan Result for sample target domain showing open ports](https://cdn.hashnode.com/res/hashnode/image/upload/v1738868226793/82cc30ab-7383-4b81-95ab-95e6a1b9bf07.png)

Next, we have **vulnerability scanning**, which detects weaknesses in software, configurations, and services. It helps pentesters assess the security risks associated with identified ports and services.

Let’s use the same nmap tool to detect the vulnerabilities from the identified open ports. In the scanning results, you can see that port 21 is open and this port is specifically used for File Transfer Protocol.

![Results of nmap vulnerability scan](https://cdn.hashnode.com/res/hashnode/image/upload/v1738871075994/70823cf4-97ce-4cb7-b76b-0a8db3acb1bb.png)

Here, we run Nmap on the target address (192.168.13.136) to scan FTP port 21 using the ftp-brute script. This allows us to check whether the FTP service is accessible using default usernames and passwords.

During the scan, we were able to extract additional useful information, including details about the FTP server version (vsftpd 2.3.4). This information can be valuable for identifying potential vulnerabilities in this version.

Finally, the tool successfully identified a vulnerability in the server by discovering valid usernames and passwords from the dictionary list included in the tool.

In general, reconnaissance and scanning are often overlooked by security analysts, assuming they are not important. But these phases provide a valuable dataset and a deeper understanding of the target domain. They help in filtering and directing the exploitation process, allowing penetration testers to focus on specific vulnerabilities instead of blindly attempting various exploits.

Skipping these phases leads to inefficiency, wasting time, resources, and effort. So for successful exploitation, it is essential to conduct thorough information gathering and scanning before proceeding further.

---

## Exploitation: The Art of Attack Simulation

The outcome of the scanning phase gives pentesters a clear understanding of potential entry points, commonly referred to as “open doors”, through identified ports and services. These insights help testers determine which vulnerabilities can be exploited to simulate a real-world cyberattack.

Once vulnerabilities are identified, testers deploy various attack techniques to assess their impact. The goal is to demonstrate how a malicious hacker could gain unauthorized access and compromise the target system. Some common attack methods include:

- **SQL Injection** - Exploiting database vulnerabilities.
- **Cross-Site Scripting (XSS)** - Injecting malicious scripts into web applications.
- **Buffer Overflow** - Overwriting memory to execute malicious code.
- **Brute Force Attacks** - Cracking weak passwords for system access.

For a clearer understanding, let's explore how database vulnerabilities are exploited using SQL Injection attacks.

Let's say there is a username and password field in a login form. Typically, when a user enters their credentials, the system fetches these input values, constructs a SQL query, and sends it to the server for authentication.

SQL Injection works by manipulating this query to bypass authentication. At a basic level, an attacker can input specially crafted values to alter the query logic. For example, consider the following SQL query:

```sql
SELECT * FROM PRODUCTS WHERE USERNAME = " OR 1=1 -- " AND PASSWORD = "1234"
```

Let’s break down this exploit to see what’s going on:

- The `OR 1=1` condition always evaluates to `true`, meaning the query retrieves all records from the database.
- The `--` sequence is a comment operator in SQL, which ignores the rest of the query (including password verification).

As a result, the attacker gains access without valid credentials, effectively bypassing authentication.

---

## Report Submission: The Art of Validation

The final phase of penetration testing involves reporting the vulnerabilities identified during the security test cycle. These reports are crucial for guiding the remediation process, ensuring that the company addresses any weaknesses before they can be exploited.

Penetration testing reports typically include detailed information about the attacks conducted, the respective results, and an assessment of the risks involved. Importantly, the language used in these reports is non-technical, as the findings are often shared with different teams across the organization, including:

- Management
- Higher authorities
- Non-technical teams (like HR, legal, and so on)

These reports must be easily understandable and confidential, as they may contain sensitive information about the organization’s vulnerabilities.

The report should include the following key parameters:

- Number of employees involved
- Start date and end date of the assessment
- List of target domains
- List of open ports (if any)
- List of identified vulnerabilities, categorized by risk level (Critical, High, Medium, Low, Informational)
- Preventive measures to mitigate risks
- List of tools used during the assessment

While the structure and content of these reports may vary from organization to organization, the above parameters are mandatory for a comprehensive security assessment.

The goal is to ensure that stakeholders at all levels of the organization can take appropriate action, whether it's patching a vulnerability, revising a policy, or updating a security strategy.

---

## Conclusion

The penetration testing lifecycle is continuous and it’s something your team must perform periodically. You can’t just do it once, address those concerns, and forget about it.

As new vulnerabilities emerge with the release of updated versions of software, applications, and systems, penetration testing remains essential in identifying and addressing these new risks.

A proactive approach to security through continuous penetration testing is crucial for maintaining a safe and secure digital environment for organizations and their users.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Penetration Testing in Cybersecurity? A Beginner's Guide",
  "desc": "In today's digital world, almost every activity we engage in is intertwined with technology. From making payments via UPI and booking movie or travel tickets online to selling products through e-commerce platforms, technology has become an integral p...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/beginners-guide-to-penetration-testing-cybersecurity.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
