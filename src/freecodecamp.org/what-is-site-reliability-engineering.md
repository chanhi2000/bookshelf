---
lang: en-US
title: "What is SRE? A Beginner's Guide to Site Reliability Engineering"
description: "Article(s) > What is SRE? A Beginner's Guide to Site Reliability Engineering"
icon: fas fa-network-wired
category:
  - DevOps
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is SRE? A Beginner's Guide to Site Reliability Engineering"
    - property: og:description
      content: "What is SRE? A Beginner's Guide to Site Reliability Engineering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-site-reliability-engineering.html
prev: /devops/articles/README.md
date: 2025-03-27
isOriginal: false
author:
  - name: Omolade Ekpeni
    url : https://freecodecamp.org/news/author/omoladeekpeni/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743005263079/95dfe528-a274-4172-8a06-46187c1668eb.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is SRE? A Beginner's Guide to Site Reliability Engineering"
  desc="In today’s digital age, we expect our online experiences to be fast, reliable, and always available. But what happens behind the scenes to make our expectations a reality? The answer is Site Reliability Engineering (SRE). SRE is a discipline that ens..."
  url="https://freecodecamp.org/news/what-is-site-reliability-engineering"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743005263079/95dfe528-a274-4172-8a06-46187c1668eb.png"/>

In today’s digital age, we expect our online experiences to be fast, reliable, and always available. But what happens behind the scenes to make our expectations a reality?

The answer is Site Reliability Engineering (SRE). SRE is a discipline that ensures that your favorite online services keep running smoothly, even when things go wrong.

In this guide, you’ll learn about the core principles behind SRE, how automation can help you in this process, how to handle failure, and more.

---

## SRE: More Than Just Fixing Problems

SRE goes beyond reacting to outages. It is a proactive approach to building and maintaining reliable systems. You can think of it as a blend of traditional IT operations, software engineering, and a relentless drive or pursuit for automation.

You might have heard of SRE being discussed alongside DevOps, so let’s differentiate them. DevOps is a broader set of principles that aims to improve collaboration and automation across the entire software development lifecycle. Site Reliability Engineering (SRE), on the other hand, is a specific implementation of these DevOps principles, with a strong focus on the operational aspects of running large-scale, highly reliable systems.

Let’s imagine a software company that wants to embrace DevOps. They might start the process by fostering better communication and shared goals between their development teams (who write the code) and their operations teams (who run the code in production). Also, they might implement continuous integration and continuous delivery (CI/CD) pipelines to automate the process of building, testing, and deploying software. This aligns with DevOps' focus on faster release cycles and improved collaboration.

Within this DevOps-oriented company, the SRE team might be specifically tasked with ensuring the reliability of their e-commerce platform. They would take the general DevOps principles and apply them to the operational challenges being experienced with a software engineering view.

For example, they would:

- define and measure Service Level Objectives (SLOs)
- develop and implement automated monitoring and alerting systems
- create self-healing infrastructure and automated incident response playbooks
- collaborate with development teams early in the software development lifecycle to ensure reliability
- conduct blameless post-incident reviews to learn from failures
- and track and automate away 'toil'.

### Bridging the Gap Between Development and Operations

So as you can see, SRE is closely related to DevOps. One of the ways SRE implements DevOps principles is by bridging the gap between development and operations. SREs can do this in several ways.

First, SREs share responsibility with development teams for the reliability and performance of applications in production. This helps foster a collaborative environment and ensures that operational concerns are considered throughout the software development lifecycle.

SREs also provide valuable feedback to development teams based on their operational experience. They understand how software is designed and how it actually runs in production. This unique perspective allows them to identify potential issues early on and suggest improvements to the code, architecture, or deployment process.

And finally, SREs and development teams work together towards common goals, such as improving system reliability, increasing deployment frequency, and reducing time to recovery. This alignment ensures that everyone is working towards the same objectives.

---

## The Core Principles of SRE:

### Focus on Availability and Reliability

SREs aim to achieve specific service level objectives (SLOs), which are measurable targets for uptime and performance.

::: info Scenario

A popular e-commerce website, used heavily during Nigerian business hours, sets an SLO of 99.9% uptime for its product catalog service. This high standard means the service is expected to be available almost all the time.

To understand just how little downtime this allows, let's break it down:

1. **Downtime Percentage**: An uptime of 99.9% means the allowed downtime is 100% - 99.9% = 0.1%.
    - **Minutes in a day**: There are 24 hours in a day, and each hour has 60 minutes, so there are 24 x 60 = 1440 minutes in a day.
    - **Minutes in an average month**: Assuming an average month of 30 days, there are approximately 30 x 1440 = 43,200 minutes in a month.
    - **Allowed downtime in minutes**: To find 0.1% of the minutes in a month, we calculate (0.1 / 100) x 43,200 minutes = 0.001 x 43,200 minutes = 43.2 minutes.

Therefore, a 99.9% uptime SLO for the product catalog service means it can be unavailable for a maximum of about 43 minutes per month. The SRE team constantly monitors the service's availability using tools that track request success rates and latency. If the availability drops below 99.95% (a leading indicator), the SRE team is alerted to investigate and remediate before the SLO is breached.

:::

::: tip Example

An online banking platform in Nigeria has an SLO for transaction processing latency: 99% of transactions must be completed within 500 milliseconds. SRE dashboards track this metric in real time. If the latency starts to increase, indicating a potential performance issue, SREs investigate whether it's due to database bottlenecks, network congestion within Nigeria, or application code inefficiencies.

:::

### Embrace Automation

Automation is the heart of SRE. It reduces manual labor, improves consistency, and speeds up issue resolution.

::: info Scenario

When a new server is provisioned for an application, an SRE has automated the entire process using infrastructure-as-code tools (like Terraform or Ansible). This includes configuring the operating system, installing necessary software, setting up monitoring agents, and deploying the application code.

Previously, this involved multiple manual steps taking hours and was prone to human error. Now, it's completed consistently in minutes.

:::

::: tip Example

During peak traffic hours (for example, around lunchtime in Nigeria when many people are online), the load on a web server cluster increases. An SRE has implemented auto-scaling rules that automatically add more servers to the cluster when CPU utilization exceeds a certain threshold and remove them when the load decreases. This automated scaling ensures the service remains responsive without manual intervention.

:::

### Measure Everything

SREs rely on data and metrics to understand system behavior and identify various areas for improvement.

::: info Scenario

For a ride-hailing app popular in Lagos, SREs track a wide range of metrics beyond just uptime. These metrics are often referred to as Service Level Indicators (SLIs), which are quantitative measures of a service's performance.

Examples include:

1. **Request latency**: How long it takes for a user to request a ride and get a confirmation.
2. **Error rates:** The percentage of ride requests or payment transactions that fail.
3. **Resource utilization:** CPU, memory, and disk usage of the servers.
4. **Database query performance:** The time it takes for database operations.
5. **User engagement metrics:** How often key features are used.

These SLIs are crucial for determining if the service is meeting its Service Level Objectives (SLOs) - the target values or ranges for these indicators (for example, 99% of ride requests should have a latency under 200ms). The metrics are visualized on dashboards, allowing SREs to understand the system's health and identify correlations between different indicators, ultimately helping them determine if the SLOs are being met or are at risk.

:::

::: tip Example

After deploying a new version of their mobile app, SREs closely monitor key performance indicators (KPIs) like the number of active users in Lagos, the average time to complete a booking, and the frequency of crashes reported by users in Nigeria. This data helps them quickly identify if the new release has introduced any performance or stability regressions.

:::

### Work with Developers

SREs collaborate closely with development teams to ensure that applications are designed for reliability.

::: info Scenario

When developers are designing a new feature for their Nigerian user base that involves significant data processing, SREs are involved early in the design phase.

They provide guidance on how to build the feature in a reliable and scalable way, suggesting patterns like circuit breakers, retries, and proper error handling.

This proactive collaboration helps prevent reliability issues from being baked into the application. SREs can also participate in design reviews, providing operational insights and raising concerns about potential failure points.

:::

::: tip Example

Before a major marketing campaign is launched in Nigeria, which is expected to significantly increase traffic, SREs work with the development team to perform load testing on the application. This helps identify potential bottlenecks and areas for optimization before the actual surge in users occurs.

SREs provide insights into the system's capacity and suggest code changes or infrastructure adjustments to handle the anticipated load. SREs can analyze the load test results with developers, providing insights into the system's capacity and suggesting code changes, database optimizations, or infrastructure adjustments to handle the expected load. They can also jointly develop monitoring and alerting rules specific to the campaign's expected traffic.

:::

### **Learn from Failure**

Failure is inevitable. SREs use post-incident reviews to analyze failures, identify root causes, and implement preventative measures.

::: info Scenario

A critical outage occurred on a payment gateway used by many Nigerian businesses. After the service is restored, the SRE team conducts a blameless post-incident review. They gather all relevant data (logs, metrics, timelines, communication records) and collaboratively analyze the sequence of events, the underlying causes (which might involve a combination of software bugs, configuration errors, and insufficient monitoring), and the impact on users.

The outcome of the review is a detailed document outlining the root causes and a list of actionable items with owners and deadlines to prevent similar incidents in the future (for example, improving monitoring for a specific metric, implementing a new rollback strategy, fixing a configuration management issue).

:::

::: tip Example

A minor incident occurred where a specific API endpoint became slow for a short period during peak hours in Lagos. Even though the impact was minimal, the SRE team still conducts a lightweight post-incident review.

They analyze the logs and metrics to understand why the slowdown happened (perhaps a temporary spike in database load) and identify potential preventative measures, such as optimizing the database query or adjusting resource limits.

The actionable item might be to create a new dashboard specifically for this API endpoint's performance, with a target completion date and assigned to a specific SRE (owner). Afterward, the team will follow up and ensure the dashboard is serving its purpose.

SREs acknowledge that systems will fail, and the goal is not to prevent all failures but to minimize their impact. SREs can achieve this through:

1. **Monitoring**: SREs implement real-time tracking of system health and performance, which allows them to detect issues early on.
2. **Logging**: They use detailed records of system events for analysis, investigation, debugging, and troubleshooting, which is essential for understanding the root cause of failures.
3. **Alerting**: SREs set up automated notifications when system metrics deviate from expected thresholds, enabling them to respond quickly to potential problems.
4. I**ncident response**: They establish structured and documented procedures for responding to and resolving incidents, ensuring a coordinated and efficient approach.
5. **Post-incident reviews**: SREs conduct in-depth analysis of incidents to identify root causes and prevent recurrence, treating every incident as a learning opportunity. This is a crucial aspect of continuous improvement.

:::

---

## The SRE Role: A Balancing Act

SREs face the challenge of balancing day-to-day operational needs with longer-term engineering initiatives. This "balancing act" is crucial for maintaining a system's stability and its ability to evolve and improve.

SREs typically spend their time in two key areas, each requiring a different skillset and focus:

### Operational Responsibilities (50%):

An SRE’s operational responsibilities are pretty wide-ranging. They typically involve responding to incidents and outages, which is a core part of any operations role. SREs are often on-call, meaning they are available to address urgent issues outside of regular work hours.

They also handle escalations, which means taking over complex or critical issues that other teams can't resolve.

SREs also provide support to internal and external customers, which can involve troubleshooting problems, answering questions, and providing guidance.

These responsibilities require strong problem-solving skills, quick thinking, and the ability to remain calm under pressure.

### Engineering Responsibilities (50%):

Engineering responsibilities are what truly distinguish SREs. SREs are responsible for automating manual tasks, which is crucial for increasing efficiency and reducing errors.

They also develop monitoring and alerting systems, which involve designing and implementing tools to track system health and notify teams of potential problems.

SREs contribute to improving system reliability and performance by identifying and addressing bottlenecks, optimizing code, and implementing best practices.

They contribute to software development with a focus on operational concerns, which means they work with developers to ensure that applications are designed for scalability, maintainability, and resilience.

These responsibilities require strong programming skills, a deep understanding of system architecture, and a proactive approach to problem-solving.

---

## Why Automation Matters

Automation is an important tool that SREs use to achieve both their operational and engineering goals. It's not about replacing human engineers, but about empowering them to work more effectively.

There are several key areas where automation is really important:

1. **Reducing toil**: SREs use automation to eliminate repetitive, manual tasks, often referred to as "toil." This frees up their time to focus on more strategic work, such as improving system design and implementing new features.
2. **Improving efficiency**: Automation can significantly speed up processes like deployments, rollbacks, and incident response, which leads to faster recovery times and reduced downtime.
3. **Enhancing reliability**: By automating critical processes, SREs can reduce the risk of human error, which is a common cause of outages and other issues.
4. **Gaining deeper understanding**: Every time an SRE automates a process, they gain a deeper understanding of the system, leading to further improvements or enhancements. This iterative process of automation and learning is central to the SRE approach.

---

## Key Takeaways for Anyone Involved in Digital Services:

1. **Reliability is a feature:** Treat reliability as a major requirement, not an option.
2. **Automation is essential:** Embrace automation to reduce toil and improve efficiency.
3. **Make data-driven decisions:** Use metrics to understand system behavior and in turn guide improvements.
4. **Collaboration is key:** Foster close collaboration between development and operations teams.
5. **Focus on continuous improvement:** Adopt a culture of continuous learning and improvement.

---

## Wrapping Up

You've now gained a foundational understanding of Site Reliability Engineering and its core principles centered around availability, automation, measurement, collaboration, and learning from failure. You’ve also learned how it plays a crucial role in ensuring the smooth operation of the digital services we rely on every day.

If you found this tutorial helpful and want to stay connected for more insights on Site Reliability Engineering, you can follow me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`OmoladeEkpeni`)](https://x.com/OmoladeEkpeni), connect on [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`omolade-ekpeni-b7b431188`)](https://linkedin.com/in/omolade-ekpeni-b7b431188/), or reach out via email at <FontIcon icon="fas fa-envelope"/>`omolade.ekp@gmail.com`.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is SRE? A Beginner's Guide to Site Reliability Engineering",
  "desc": "In today’s digital age, we expect our online experiences to be fast, reliable, and always available. But what happens behind the scenes to make our expectations a reality? The answer is Site Reliability Engineering (SRE). SRE is a discipline that ens...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-site-reliability-engineering.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
