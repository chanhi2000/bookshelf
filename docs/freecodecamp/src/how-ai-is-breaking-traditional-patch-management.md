---
lang: en-US
title: "How AI Is Changing Patching and What Devs Need to Know About Exposure Management"
description: "Article(s) > How AI Is Changing Patching and What Devs Need to Know About Exposure Management"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How AI Is Changing Patching and What Devs Need to Know About Exposure Management"
    - property: og:description
      content: "How AI Is Changing Patching and What Devs Need to Know About Exposure Management"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ai-is-breaking-traditional-patch-management.html
prev: /devops/security/articles/README.md
date: 2026-09-05
isOriginal: false
author:
  - name: Reetain Raina
    url: https://freecodecamp.org/news/author/reetain/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ce5b87e6-1941-493c-a2c9-7822138160d6.png
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

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How AI Is Changing Patching and What Devs Need to Know About Exposure Management"
  desc="When a vulnerability scanner reports 23 vulnerabilities in your application, of which 4 are critical, 7 are high, and the remaining 12 are medium, at first glance the answer seems clear: start patchin"
  url="https://freecodecamp.org/news/how-ai-is-breaking-traditional-patch-management"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ce5b87e6-1941-493c-a2c9-7822138160d6.png"/>

When a vulnerability scanner reports 23 vulnerabilities in your application, of which 4 are critical, 7 are high, and the remaining 12 are medium, at first glance the answer seems clear: start patching. But which one should you fix first?

This has always been an issue in vulnerability management. While a security team might find out about the vulnerable dependency, fixing it may not always be possible at once. Developers need to ensure that the vulnerable code is in use and perform all necessary checks before releasing the fix into production.

Recently, though, there have been some solid advancements in the use of AI for discovering software vulnerabilities and exploits. This [<VPIcon icon="fas fa-globe"/>research](https://dl.acm.org/doi/10.1145/3708522), for example, details some of the findings and the path forward.

But how will this really help the development community? We need to fix things more quickly, but more importantly, we need to be able to figure out which vulnerabilities actually matter and which ones need attention first.

In this article, we'll examine what the classic patching process looks like, how AI is decreasing the amount of time security teams have to react, and why it's not always reasonable just to address vulnerabilities by their severity score.

We'll also discuss exposure management and the difference between it and traditional vulnerability management. Then we'll cover how developers can analyze dependencies, code reachability, and Software Bill of Materials (SBOMs) to figure out the actual vulnerabilities in their applications.

---

## Patching vs. Exposure Management: What's the Difference?

Before we look at how AI is changing vulnerability response, it helps to understand two important concepts: patching and exposure management.

### What Is Patching?

Patching is a process of updating software to address an existing issue, including a security vulnerability, bug, or a stability problem. This may involve upgrading a library with a known vulnerability, applying a security update for your operating system, or using a new release of an application with a vulnerability fixed.

For instance, if your application uses a particular library with a known security vulnerability, you can upgrade the library once the patched version is available. After that, you'll need to test the update, ensure that the application still operates as intended, and release the upgraded version into production.

So patching isn't only about installing the latest version of the package in question. A dependency update can break an API, some functionality, or even other dependent packages. That's why teams typically use patch management strategies when identifying vulnerabilities, updating decision-making, testing, deploying, and verifying that the patches work.

### What Is Exposure Management?

While vulnerability management is concerned mainly with identifying vulnerabilities, exposure management focuses more broadly on whether those vulnerabilities can actually provide a realistic route for an attack.

For example, a vulnerable library, limited in use to a development system, poses less immediate threat than a similarly vulnerable library used in an internet-facing system that's capable of accessing the database.

Some aspects to consider include accessibility via network, asset exposure, vulnerable code paths, identity and access controls, cloud environments, and the sensitivity of systems and data.

Simply put, vulnerability management is concerned with the discovery and tracking of vulnerabilities, whereas exposure management is focused on determining which of those vulnerabilities pose a true or larger risk.

---

## The Old Patch Management Workflow Was Built Around Time

The classic process of vulnerability mitigation depended on step-by-step actions.

1. CVE discovered
2. Security team assesses the severity
3. Maintainer releases an upstream patch
4. Developer updates the dependency
5. CI/CD pipeline runs regression tests
6. Production deployment
7. Remediation verified

The process wasn't flawed by nature, but it operated under the unspoken premise that the defenders were granted enough room to operate through each step.

Let's take a dependency vulnerability example for practice. If the automated scanner detects a vulnerability within a popular utility package such as **lodash**, engineers don't immediately bump the dependency version in the production environment. They need to confirm if the application code leverages the vulnerable function, check the presence of breaking API changes after the upgrade, and run build validation through integration tests.

Each security patch is essentially a change to the code and needs to be safely pushed through the development and deployment cycle.

---

## AI Is Shrinking the Time Between "Found" and "Exploited"

The buffer between vulnerability discovery and exploitation that used to exist is being eliminated. This is because automated programs can scan through codebases, generate proofs of concept, and discover edge cases.

Modern AI systems help researchers and would-be attackers alike perform tasks like static binary analysis, detecting vulnerabilities, creating exploit payloads, and finding logical issues in complicated software designs.

Programs such as [<VPIcon icon="fas fa-globe"/>DARPA’s Artificial Intelligence Cyber Challenge](https://darpa.mil/news/2024/ai-cyber-challenge-cybersecurity) (AIxCC) show how AI systems can be used to automatically find and patch vulnerabilities in complex open-source software. During the 2024 semifinal competition, autonomous Cyber Reasoning Systems were tested against projects based on real-world software such as Jenkins, the Linux kernel, Nginx, SQLite3, and Apache Tika. The systems discovered 22 unique synthetic vulnerabilities and successfully patched 15 of them. They also identified one real-world bug in SQLite3, which was responsibly disclosed.

In the context of a real development process, certain tasks in the patching process can be performed by AI. The AI could perform code analysis and dependency analysis in order to detect potential vulnerabilities. It could also help trace the usage of vulnerable functions, recommend changes in code and dependencies, and generate tests to make sure that the suggested patch doesn’t break the existing functionality. The security team could also use AI for pattern detection.

As AI tools get better at assessing software and detecting vulnerabilities, the window of time between vulnerability detection and its mitigation becomes smaller and more important. This change in paradigm also affects how security professionals approach [<VPIcon icon="fas fa-globe"/>AI and exposure management](https://axonius.com/blog/from-vulnpocalypse-to-patchmageddon-security-ops-in-the-ai-era), especially as the exploit window gets smaller and vulnerabilities need proper prioritization.

AI can also support exposure management by connecting vulnerability information with the environment in which the vulnerable software is running. For example, an AI-assisted security system could correlate a vulnerable dependency with an internet-facing application, its network connections, cloud permissions, and the data or services it can access. This helps security teams move from simply asking whether a vulnerability exists to asking **what an attacker could realistically reach through it**.

---

## Why "Patch Everything" Doesn't Work at Scale

When an organization-wide scanner generates a list of 500 vulnerabilities spread across multiple microservices, reacting to each one with urgency starts to seem impossible. Developers can suffer from alert fatigue and get overwhelmed pretty easily.

The [<VPIcon icon="fas fa-globe"/>Common Vulnerability Scoring System](https://nvd.nist.gov/vuln-metrics/cvss) (CVSS) is a standardized framework used to describe the severity of a vulnerability. CVSS v3.1 uses the following severity ranges:

| **CVSS Score** | **Severity** |
| :---: | :---: |
| 0.0 | None |
| 0.1–3.9 | Low |
| 4.0–6.9 | Medium |
| 7.0–8.9 | High |
| 9.0–10.0 | Critical |

CVSS is useful because it provides both developers and security teams with a common language that describes the severity of a vulnerability. Nevertheless, the rating describes the vulnerability but not the environment where this vulnerability appears. In other words, CVSS doesn't tell you if the functionality used by the vulnerability is really used by your application or if the affected system is exposed to the Internet.

To see why CVSS alone isn't always enough, let's say we have two hypothetical vulnerabilities in an organization's environment:

- **Vulnerability A:** This critical remote code execution vulnerability is part of an isolated testing harness or development-only dependency that's never included in the production environment and doesn't have any external network accessibility.
- **Vulnerability B:** A high-severity input validation vulnerability is found in an internet-facing API gateway that processes malicious user input and has access to a backend database with customer information.

Looking at just the CVSS score would require the team to focus on Vulnerability A before Vulnerability B. But it's clear that Vulnerability B poses the greater threat to operations. Security studies show us that very few vulnerabilities get exploited once they're known. Telemetry data from the [<VPIcon icon="fas fa-globe"/>CISA KEV Catalog](https://runzero.com/resources/kevology/) clearly indicates that attackers focus on a subset of vulnerabilities that have a real path of exploitation.

In reality, teams must consider the CVSS score in addition to many contextual factors when deciding what to fix. A particular vulnerability might have a higher priority if the following conditions are true:

- it has an impact on an internet-facing production system,
- there's a known exploit for the vulnerability,
- there's sensitive information exposed,
- it impacts an important business function,
- or it offers an attacker a means of gaining access to other privileged systems.

But vulnerabilities that occur only in development or are inaccessible for some reason likely don't need to be fixed immediately.

The most appropriate method for determining the importance of vulnerabilities is asking some straightforward questions: Is the vulnerable system accessible? Is the vulnerable code accessible? Is there any exploit for this vulnerability? What privileges does the affected service have? What will an attacker be able to access after exploiting the vulnerability?

Assigning the same level of priority to all alerts wastes engineering efforts on vulnerabilities that might pose no or little risk at all.

---

## Exposure Management: Moving from Flaw Counts to Contextual Risk

Exposure management shifts focus from simply cataloging static vulnerabilities to evaluating an organization's actual operational risk posture.

Instead of asking "How many CVEs exist in our repositories?", exposure management asks "Which vulnerable components, misconfigurations, and reachable network paths create exploitable risk across our running assets?"

The difference becomes easier to see when you look at what each approach focuses on:

| **Dimension** | **Traditional Vulnerability Management** | **Exposure Management** |
| ---: | :--- | :--- |
| Primary Question | What software bugs and CVEs exist? | What paths can an attacker exploit to access critical assets? |
| Data Scope | Isolated dependency scans and static vulnerability databases | Code repositories, cloud runtime, network routing and IAM permissions |
| Prioritization Metric | CVSS base scores and static severity ratings | Reachability, exploitability, asset sensitivity and environment context |
| Primary Action | Upstream package upgrades and direct software patches | Risk-based triage: network isolation, configuration changes, or targeted patching |

When there are 10,000 cloud assets managed by an engineering environment and 1,000 vulnerable libraries found through dependency scanners, the combined numbers don't represent the actual security situation. In order to focus on the right level of risks, you should have some knowledge about the context within which each of these vulnerabilities exists.

- Is the container exposed to the internet or is it hidden behind the internal load balancer?
- Is the code actually invoking the risky symbol or library function?
- What are the identity permissions, cloud roles, and databases that are accessible through the vulnerable service?

Having an understanding of this denominator (total numbers of assets that should receive a specific patch) helps teams identify the exposures that are actually threats so that engineering time is spent on solving the problems that impact production data.

---

## The Dependency Tree as an Attack Surface

Modern software delivery depends on multi-layered packages such as npm, PyPI, Maven, NuGet, base operating system layer packages, GitHub Actions, and third-party APIs. The application logic is written by developers, but the final runtime software contains numerous levels of packages:

Your Application Logic → Direct Dependency (Declared in manifest) → Transitive Dependency (Pulled in automatically) → Underlying OS System Packages → Base Container Image / Cloud Runtime.

If a vulnerability is three levels down in the transitive dependencies and the transitive dependency is unmaintained, but can be accessed via external inputs, then that's an essential part of your application's attack surface.

That's why software development teams have started to use Software Bill of Materials (SBOMs). An SBOM is an inventory of software components that constitute the software or application. Depending on the technology used to create the SBOM, different information can be available including component name, version, dependencies and package ID.

It's helpful in cases where a new vulnerability has been identified. For example, if a vulnerability is discovered in a specific version of lodash, the security team can use its SBOMs to identify which applications or container images contain the affected version. They'll then be able to investigate if there's an exploitable exposure.

An SBOM alone doesn't provide security for the application. Its significance lies in increasing visibility to developers and security personnel regarding what is present in their applications.

---

## Practical Takeaways for Developers

These principles will be relevant once you integrate them into your team's routine development process. There are some practical ways you and your team can employ these best practices and strategies:

### Audit Transitive Dependencies

The first thing to do is to verify what dependencies are included in your application. This is very useful when it comes to transitive dependencies, because these dependencies may have been automatically added when installing some other package directly.

For Node.js applications, the command `npm ls` will display the dependency tree. Python programmers may use `pipdeptree`, while Java programs created using Maven can use the `mvn dependency:tree` command. These commands can help you understand the origins of packages and the direct dependency that introduced a vulnerable transitive dependency into your project.

### Check Code Reachability

Finding a weak point in a dependency doesn't automatically imply that you're using it within your application. Don't take every vulnerability report as a critical production blocker. Instead, you should investigate if the impacted functionality is actually accessible from your application.

Suppose you find a vulnerability in a certain library function. In this case, you need to look through your codebase for any usage of this function and figure out if there's any possibility of passing user-controlled data to it. You may use either the search function provided by your IDE or command-line utilities such as grep.

An unused or inaccessible from the outside function reduces the urgency of the finding. But it doesn't automatically imply that you should ignore it.

### Generate an SBOM in CI/CD

You can also produce a Software Bill of Materials using your **CI/CD pipeline**. Creating an SBOM will help you identify the components used in the software and make it easier to identify affected components once a vulnerability is found.

For instance, using Syft, you can generate an SBOM from a container image by executing the command: `syft my-app:latest -o cyclonedx-json > sbom.json`.

This will create a CycloneDX JSON file with information on the components within the container image. This SBOM will then be stored along with the build artifacts. Once a new vulnerability is identified in a particular package version, it becomes easy for the security team to know which applications and container images contain this particular component.

### Use Compensating Controls When a Patch Isn't Ready

Sometimes there may be no patch available or it may be too risky to implement it straight away since doing so might introduce breaking changes that need further testing. In such cases, you can use compensatory controls to lessen the exposure of the application until it's patched properly.

Depending on the environment, this may involve limiting the network access to the vulnerable component, isolating the workload from sensitive resources, disabling the feature that has been compromised, or minimizing the privileges of the application.

These controls don't take the place of the security patch but only minimize the risk of exploitation until a patch is implemented.

### Apply Least Privilege at Runtime

Lastly, restrict the amount of access your applications have at run time. When a compromise is made due to exploitation, it prevents the spread of that breach to other applications or systems.

When deploying container-based applications, you can leverage read-only filesystems, as well as remove capabilities that aren't required in Linux. For instance, Docker provides the option to use `--read-only` and `--cap-drop=ALL` when running containers.

Cloud applications also need to adopt the same concept by ensuring the use of IAM permissions, giving access only to what the application requires.

::: important The goal is simple

If one element has been breached, the attacker should be able to gain access to as few components of the environment around it as possible.

:::

The future of software security doesn't rely on how fast organizations can update their packages without knowing the underlying reasons for doing so. With vulnerability detection becoming more efficient through automation, effective mitigation relies on knowledge about the relationship between the source code, its dependencies, and infrastructure at runtime.

The purpose here isn't just finding new vulnerabilities but recognizing the ones that pose real risks to the application.

---

## Wrap Up

While artificial intelligence is helping teams detect vulnerabilities quicker, modern applications keep becoming increasingly dependent on numerous software layers. This doesn't mean that patching becomes unnecessary. It means that all vulnerabilities don't require the same immediate attention.

Developers also still need to look at where those vulnerabilities exist, whether they're reachable by attackers, and what they could affect. As the time between vulnerability detection and exploitation continues to change, understanding exposure becomes just as important as the patch itself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How AI Is Changing Patching and What Devs Need to Know About Exposure Management",
  "desc": "When a vulnerability scanner reports 23 vulnerabilities in your application, of which 4 are critical, 7 are high, and the remaining 12 are medium, at first glance the answer seems clear: start patchin",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ai-is-breaking-traditional-patch-management.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
