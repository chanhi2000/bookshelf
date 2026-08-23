---
lang: en-US
title: "From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]"
description: "Article(s) > From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]"
icon: fas fa-database
category:
  - Data Science
  - Databricks
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - databricks
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]"
    - property: og:description
      content: "From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-data-management-with-a-real-world-use-case-book.html
prev: /data-science/articles/README.md
date: 2026-08-26
isOriginal: false
author:
  - name: Daniel García Solla
    url: https://freecodecamp.org/news/author/cardstdani/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b9817dc0-f0dc-4ccf-a8f7-2e7b47783360.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]"
  desc="Today, data has become a particularly valuable resource. It allows companies to compete in the market and drive innovation, improving the quality of products and services offered. Data processing lets"
  url="https://freecodecamp.org/news/understanding-data-management-with-a-real-world-use-case-book"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b9817dc0-f0dc-4ccf-a8f7-2e7b47783360.png"/>

Today, data has become a particularly valuable resource. It allows companies to compete in the market and drive innovation, improving the quality of products and services offered.

Data processing lets teams automate processes. It also supports decision-making, offers a significantly more personalized experience to the end user, and detects patterns in many areas such as banking fraud or risk mitigation. Companies need to know how to capture and use data effectively, safely, and legally.

You likely are or have been a user of various products and services. And you know that processes involving data are fundamental to almost everything around us. You're likely also already familiar with terms like Big Data, Data Analytics, Artificial Intelligence, and Machine Learning.

But unless you're an expert in one of these fields, some of these concepts might seem overwhelming. These are large areas of study, after all.

And even if you're trained in one of these areas, it's difficult to know all the details about each field, as the data world is vast.

One way to understand this world of data a bit better is by dividing it, and establishing a distinction between the areas of Artificial Intelligence and Data Management. This isn't the only way to proceed, but I've found it helpful to separate the set of disciplines and techniques for information processing into these two blocks.

On one side is Data Management, which encompasses everything related to the capture, storage, protection, and analysis of data.

Meanwhile, on the other side is Artificial Intelligence, which focuses on developing techniques that allow a machine to emulate human capabilities like reasoning or learning to solve a problem, whether interacting with data or not.

Here, interaction refers to an algorithm acquiring "knowledge" from data, but not all artificial intelligence functions.

In any case, this book offers a comprehensive overview of Data Management, helping you understand all the terms and related concepts involved in using, processing, and analyzing data.

It won't just provide an abstract explanation of the field and its contents. It'll instead help you understand it holistically and offer a more practical and realistic view. We'll also study a use case to put into practice everything we discuss.

---

## Table Of Contents

- [Our Case Study](#heading-our-case-study)
- [Data Management Fundamentals](#heading-data-management-fundamentals)
- [Data Governance](#heading-data-governance)
- [Data Ethics](#heading-data-ethics)
- [Data Security and Privacy](#heading-data-security-and-privacy)
- [Data Architecture](#heading-data-architecture)
- [Data Modeling and Design](#heading-data-modeling-and-design)
- [Data Storage and Operations](#heading-data-storage-and-operations)
- [Document and Content Management](#heading-document-and-content-management)
- [Reference and Master Data Management](#heading-reference-and-master-data-management)
- [Metadata Management](#heading-metadata-management)
- [Data Integration and Interoperability](#heading-data-integration-and-interoperability)
- [Data Quality](#heading-data-quality)
- [Data Engineering](#heading-data-engineering)
- [Data Warehousing and Business Intelligence](#heading-data-warehousing-and-business-intelligence)
- [Big Data](#heading-big-data)
- [Analytics and Data Science](#heading-analytics-and-data-science)
- [Data Products](#heading-data-products)
- [Data Management Maturity](#heading-data-management-maturity)

---

## Our Case Study

Our use case involves a fictional university offering international master's programs in Artificial Intelligence and Data Management. It's a public-private institution providing various training programs for different end users, such as recent graduates looking to specialize in this area, working professionals, or international students.

This use case lets us analyze the entire data lifecycle, from student admission to graduation. Also, in a university setting, we can use data alongside artificial intelligence to automate enrollment processes, enhance the student's experience when accessing educational resources, optimize organizational operations, and ultimately help the university differentiate itself from other institutions offering similar programs.

The data lifecycle begins before enrollment in a master's program, as a candidate might discover the program through an advertising campaign, visit the institution's website, or complete an application form. They can then enroll and attend classes, using digital platforms and participating in various educational activities. Finally, they'll complete the program and become part of the alumni community.

Each of these interactions generates different types of data, such as personal, academic, administrative, and financial data. There are also more complex types of data, like activity and digital behavior data, which can include records of access to the virtual campus or consulted resources, among others.

This journey allows us to see how data goes through different phases. We'll see how it's captured, validated, stored, integrated with other systems, protected, analyzed, and finally retained or deleted according to the organization's policies.

As you can imagine, Data Management isn't just about storing data in a database. It's also about ensuring that, throughout its lifecycle, the data is accurate, secure, understandable, accessible to those who need it, and used legitimately.

Also, the university, like any other entity, uses data to identify the needs or problems of its users in order to propose solutions. One such issue could be commuting, as some students in the master's programs live far from campus, others might work, and still others may have poor public transportation options. In these cases, distance or travel time becomes a decisive factor for those students.

Faced with this seemingly complex issue, the university can use data and artificial intelligence techniques to plan and offer suitable transportation services to certain interested students. This means, based on eligibility criteria such as the distance from campus or enrollment in mandatory in-person classes, the university can plan to offer free taxi/VTC services to certain students.

But the idea wouldn't be to provide unlimited taxi services to all students – just to design a controlled, measurable, and sustainable benefit based on clear business rules.

Processing this data effectively would allow the university to offer a more precise service than other competitors, who might offer generic public transportation discounts or fixed bus routes. And while these solutions might be very useful, they don't always adequately meet the needs of all students.

In this scenario, it's clear that a wide variety of data is generated, including data on students, faculty, courses, schedules, attendance records, trips taken, and so on. Using and analyzing this data, we'll be able to learn many Data Management principles. We'll also demonstrate how data pipelines are built, how data is transformed into useful analytical products, and what techniques are involved.

To make these ideas easier to follow in practice, this book is accompanied by a [hands-on Jupyter notebook (<VPIcon icon="iconfont icon-github"/>`cardstdani/sql-storage`)](https://github.com/cardstdani/sql-storage/blob/345ff1e13c684e4ae0127c8a1d30af640dfdbcad/Data_Management.ipynb). It uses a compact sample of real taxi-trip data and treats it as a provider feed for the university's transportation service.

Some of the examples discussed throughout the book are reproduced in the notebook with the same dataset, so as you move through the chapters, you can see selected concepts in action, including data profiling, quality rules, integration, transformation, privacy protection, dimensional modeling, SQL analysis, and visualization. It's a focused demonstration rather than a complete implementation of every capability discussed here.

You'll also learn how the university might use artificial intelligence to predict which candidates are most likely to enroll, recommend master's programs, estimate future demand for mobility services, detect unusual patterns in taxi usage, and create conversational assistants to help candidates and students resolve their questions.

This case study will also highlight the university's need to make decisions about privacy, consent, transparency, and security. For example, personal data must be protected, eligibility rules should not unfairly discriminate, and human oversight should be established for decisions that could significantly impact a candidate or student.

---

## Data Management Fundamentals

Data Management is the discipline responsible for capturing, storing, protecting, integrating, understanding, maintaining, and correctly using data throughout its lifecycle. At first glance, management and processing might seem to involve only storage and perhaps later analysis, but nothing could be further from the truth.

There are many more requirements like security (as managing large volumes of information quickly is useless if security is compromised) as well as data integrity and organization.

While researching for this book, I studied the very useful book **[<VPIcon icon="fas fa-globe"/>Data Management Body of Knowledge](https://dama.org/learning-resources/dama-data-management-body-of-knowledge-dmbok/) (DAMA-DMBOK)**. It's one of the most comprehensive and reputable guides on the world of data. And I highly recommend it if you want to dive even deeper here.

According to the book, Data Management involves the development, execution, and supervision of plans, policies, programs, and practices that enable the delivery, control, protection, and enhancement of the value of data and information assets throughout their lifecycle.

This definition is especially relevant because it highlights two fundamental ideas. One is that data has intrinsic value, allowing it to be treated as an asset. The other is that this value doesn't appear directly in all cases but depends on how the data is managed.

In other words, data alone has no value, but if you process it properly, it has the potential to become usable information and subsequently knowledge.

To achieve this goal, you can think about Data Management as a set of **operational capabilities**, meaning the various actions a team or organization must undertake regarding its data.

Among the most fundamental are the following:

- **Data Governance:** deciding who has access to each piece of data and who sets the access rules.
  - *Example:* University faculty may have access to certain data about students in their courses, but not about any student in the organization.
- **Data Architecture:** designing the processes that data will follow throughout its lifecycle.
  - *Example:* A data architect defines how data travels from the moment a user enters it into the system, such as during an enrollment form, to where it's stored and processed internally on the university server.
- **Data Storage and Operations:** deciding how and where the data is stored.
  - *Example:* The decision is made to store students' personal data in an internal database, as opposed to alternatives like storing it in an external cloud service. Meanwhile, other data, such as educational materials, are more likely to end up stored in the cloud, although it ultimately depends on the organization's policies.
- **Data Integration:** gathering information from different sources to provide a unified view or access to all of them.
  - *Example:* A data engineer integrates information from different sources about taxi routes, as each company will have its own source with unique characteristics, making it necessary to standardize the data into an intermediate schema.
- **Data Quality:** ensuring that the information is accurate, complete, consistent, up-to-date, and reliable.
  - *Example:* A quality analyst defines the rules that the virtual campus frontend must follow to prevent end users from entering incorrect data into the system, ensuring its quality. They also impose rules on the various internal systems where the information is stored to avoid inconsistencies.
- **Data Security and Privacy:** protecting information against unauthorized access and other threats.
  - *Example:* User access passwords are stored as [<VPIcon icon="fa-brands fa-youtube"/>hashed](https://youtu.be/zt8Cocdy15c?si=eGz4JOsnsjv_WcLP) values, not in plain text, to prevent easy access in case of a potential vulnerability.
- **Metadata Management:** specifically managing the data that determines the meaning of other data.
  - *Example:* A glossary is created with terms that define the meaning of each concept represented in the data. One of them could be "distance to campus in meters." In this case, the meaning is clear, and its inclusion in the glossary allows it to be used in the implementation of storage systems and data processing, facilitating development.
- **Analytics and Business Intelligence:** transforming data into reports and visual indicators that facilitate strategic decision-making within the organization.
  - *Example:* A data analyst creates an interactive dashboard for the administration, displaying graphs of monthly taxi expenses, the number of students benefiting, and how this service has improved the percentage of attendance in in-person classes.

So as you can see, Data Management isn't a specific activity but a collection of many different tasks and processes. When coordinated, these allow data to be transformed into strategic value.

In the university use case, it's clear that the personal data of applicants and students must be protected. Also, to help implement the free taxi service, the data sources from different transportation companies must be well-integrated and of high quality.

### Data as an Asset

Data can be defined as a symbolic representation of a quantitative or qualitative attribute or variable. In other words, data are representations of facts, observations, events, or characteristics occurring in an environment, which can later be stored and processed.

This definition of data relates more to its types, such as numbers, dates, text, or images. In our use case, data might include a student's name, address, or the distance from their home to the campus. Each of these, in isolation, is a simple record, but when contextualized and analyzed together, they have the potential to become an asset.

For instance, an isolated piece of data like "18 kilometers" isn't very relevant by itself. But if it's interpreted as the characteristic "distance to campus", it becomes useful for understanding a student's situation and making a decision.

In this context, an asset is any resource expected to yield a return in the future, like buildings, patents, or other elements. Here, we're also including data because of its potential to generate value within the organization.

But this doesn't mean that just any piece of data is an asset. Data can be incorrect, duplicated, or incomplete. So its value mainly depends on how it's managed. For example, at the university, "distance to campus" becomes an asset when it's not used as an isolated number but rather for decision-making.

In our example, the distance from campus along with other student and organizational data can help us decide which students are eligible for this taxi service or how much budget should be allocated for it.

Data that's considered an asset can help drive these decisions only when the quality is adequate, because incomplete, inconsistent, or erroneous data can affect this process negatively or not contribute to the decision.

Ultimately, considering data as assets means treating it as a resource that requires specific management. And this can lead to benefits you wouldn't be able to achieve otherwise, whether it's improved end-user satisfaction or cost optimization.

### Data, Information, Knowledge, and Value

From this idea arises the distinction between data, information, knowledge, and value. We'll study the progressive transformation that turns data into useful knowledge and ultimately into value for an organization.

#### Data

First, data is the most basic unit dealt with in Data Management, and its main function is to represent an aspect of reality. That is, data is what we imagine when we think of something like a number, some text, a date, and so on. Data has types (because of its variety), and also has a basic meaning associated, generally called semantics.

::: tip Example

"18 kilometers" is a piece of data of the integer type, and its semantics indicate that it represents a quantity of kilometers. Here, it's important to realize that the quantity alone might be considered data, but its semantics allow for interpretation.

:::

#### Information

Once we have isolated data, we can relate and contextualize it to create a more abstract meaning, which is considered information.

::: tip Example

To better understand this concept, the previous data "18 kilometers" can be contextualized with other information like a student's name or address, allowing us to infer that the student lives that far from the campus. This is considered information, as its semantics go beyond that of a simple piece of data.

:::

#### Knowledge

After obtaining information, we can then analyze and interpret it to identify patterns, trends, or cause-and-effect relationships. We do this by integrating the information and observing the prior experience of the organization or similar ones, creating an even more abstract contextualization.

::: tip Example

If the university observes that students living more than 15 kilometers away and having in-person classes miss more classes, it can conclude that distance and schedule influence attendance. This requires information such as the students' distance from campus or their attendance records and schedules.

:::

#### Value

Finally, we use knowledge in decision-making and taking actions that can generate a benefit, which is the value derived from the data.

::: tip Example

The university can offer free taxi services only to specific students who meet certain criteria, improving attendance and user satisfaction while minimizing the impact on the budget. Here, the value lies in the benefit gained from these decisions, which may or may not be easily measurable.

:::

In summary, success doesn't lie solely in storing large volumes of data or processing them at high speed, but in advancing them through this sequence of transformations to turn them into value. This process requires an infrastructure suited to these needs, as well as qualified people who are capable of applying the appropriate Data Management techniques.

### The Data Lifecycle

Now let's look at the stages data goes through. Its lifecycle starts when the organization identifies a need for it and ends when the data is no longer useful. Between those points, teams capture, store, maintain, use, and eventually retain or delete the data. The lifecycle describes the phases that keep this journey controlled.

![The data lifecycle diagram. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/29ee988f-16cd-46b9-a2a1-237c1674c898.png)

As the diagram shows, the lifecycle starts with business needs, not technology choices. Because data is an organizational asset, each phase should help protect it, maintain it, or turn it into value.

The lifecycle consists of the following phases (as in the graphic above):

- **Planning:** The organization decides what data it needs, why it needs it, who will be responsible for it, and how it could create value. Before capturing anything, the team should know which data is truly necessary and what they expect to do with it.
  - *Example:* The university decides it needs to know the distance between a student's home and the campus to evaluate whether it can offer free taxi service, explaining why it's necessary and what decision it will allow later.
- **Design and Enablement:** Once the need is clear, the team designs the infrastructure, data flows, and policies that will support it. This work draws on capabilities such as data architecture, modeling, security, quality, and governance, which we'll discuss later.
  - *Example:* The university defines that the distance to the campus will be calculated from the address provided by the student, that the data will be stored in a specific system, that only certain departments will have access to it, and that it must be updated if the student changes their address.
- **Creation or Acquisition:** At this stage, the data enters the organization for the first time. A user might create it through an interaction, or the organization might obtain it from an external source through an API, exchange, purchase, or integration.
  - *Example:* The data is created when the applicant completes the admission form indicating their address. External data such as geographic information or estimates of distance and travel time from a geographic API could also be obtained.
- **Storage and Maintenance:** Once captured, the data must be stored in an appropriate environment and kept ready for later use. Teams may store it in databases, Data Warehouses, Data Lakes, or other systems. They can then clean, integrate, update, document, and protect it as needed.
  - *Example:* A student's name is stored in a university server database, while the calculated distance to the campus can be saved in a cloud-based analytical database. Additionally, rules are applied to avoid duplicates, incomplete data, or inconsistent formats, ensuring data quality.
- **Use:** The organization uses the data for the purpose defined during planning. It might query or analyze the data, generate reports and dashboards, or use it to train AI models.
  - *Example:* The university uses IP addresses, response times, and virtual campus activity logs in a predictive Machine Learning algorithm to detect behavioral anomalies that indicate potential fraud. This use allows for the detection of identity theft, security issues, and the prevention of fraud in online educational activities.
- **Enrichment:** In this phase, teams connect and transform data to add context and uncover patterns or trends that were previously hard to see. This is one way data becomes information and knowledge.
  - *Example:* A student's access log to the virtual campus can be enriched with data about the time they spent using online resources, the number of material downloads they made, their interaction counts, and their historical statistics. This gives the university more context for studying engagement and its possible relationship with academic progress, without assuming that digital activity alone explains a student's results.
- **Dispose:** When the data is no longer needed for its original purpose, the organization decides whether to retain, archive, anonymize, or delete it. Retention policies, business needs, and legal requirements guide that decision. This phase prevents the organization from accumulating unnecessary data, which raises costs and creates extra risk when the data is personal or sensitive.
  - *Example:* When a student completes their master's program, the university may need to retain grades and other academic records for legal or administrative reasons. Some banking details or operational payment data may no longer be necessary once financial and legal obligations end. The retention policy should identify which fields to keep, delete securely, or anonymize for approved statistical use rather than preserving the full record indefinitely.

Although these phases appear in sequence, real data rarely moves through them only once. Teams may enrich it several times or integrate it with new sources, such as public APIs or partner systems. Think of the lifecycle as a continuous process whose phases can repeat whenever the need changes. It helps keep Data Management consistent, secure, and useful.

### Data Management Principles

Now that you understand the lifecycle, you can use a few key principles to guide decisions at every stage. They give teams a shared reference instead of letting each system or department manage data in isolation.

The first fundamental principle already covered is considering data as an asset. From there, another relevant principle emerges: the value of data depends on its quality and context. Incorrect, incomplete, or misinterpreted data can lead to wrong decisions. For example, if a student's name contains a typo, it might not match what's stored in government databases, complicating certain processes. It's also crucial to understand that data needs metadata to be used correctly.

As I explained before, an isolated number like "18" has little value if it's unclear what it represents, in what unit it's expressed, how it was calculated, or when it was updated. Metadata documents this meaning and prevents ambiguities.

Another important principle is the need for planning. As seen in the lifecycle, the first step should be planning which data is expected to be used, among other things. In the case of enrollment, the university shouldn't collect just any student data, but only the relevant information required for the necessary processes.

Another essential principle is to use technology for a clear purpose. A team shouldn't choose a database or a new tool simply because it's the current popular tool. It should choose technology that addresses a real need. At the university, the decision to use a relational database, a Data Warehouse, a geographic API, or a dashboard should depend on the goal of the use case.

### Data Management Capabilities

These principles become practical through a set of Data Management capabilities. The capabilities describe what an organization must be able to do with its data throughout the lifecycle.

![Data Management main capabilities. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/e17edd70-c2b7-476e-ac9a-09c82c457c4e.png)

The principles guide the work, while capabilities such as Data Governance and Data Modeling put that guidance into practice. The diagram above shows the main capabilities we'll cover in the coming sections.

Some Data Management roles work across several capabilities. One is the **Chief Data Officer (CDO)**, who defines the organization's data strategy and helps ensure that teams manage data as an asset. In our use case, the CDO would help set goals for using data, such as improving attendance, enrollment, or student satisfaction.

Another relevant role is the **Data Steward**, who helps maintain data definitions, quality, and proper handling within a domain. At the university, they might verify the completeness and consistency of student location and enrollment data. A **Chief Privacy Officer (CPO)** may also be involved whenever a use of data affects privacy.

<VidStack src="youtube/-FBipS627dY" />

---

## Data Governance

Let's start with Data Governance. [<VPIcon icon="fa-brands fa-google"/>**Data Governance**](https://cloud.google.com/learn/what-is-data-governance) defines how an organization makes decisions about data, who may access or change it, and what responsibilities come with each role. It also helps the organization meet its legal and regulatory obligations.

You can see why this matters at the university: admissions staff, the academic office, faculty, and even AI systems may use student data. Without clear rules, people can gain inappropriate access or make decisions without enough justification.

Not everyone should be able to perform every action on every piece of data. Data Governance provides an organizational control layer across the lifecycle so people use data in an orderly, secure, and legitimate way.

Organizations assign this work to roles such as the **CDO** and **Data Owners**. Data Owners usually work within a business area and have authority to make important decisions about the data in their domain.

For example, the director of mobility at a university would be the Data Owner of all data related to the transportation service offered by the university. There may also be other Data Owners like the financial director for all billing and tuition payment information.

Governance tools help teams control, document, and review data use. Their main purpose isn't programming or technical processing.

A CDO or Data Owner might use **data catalogs** and **business glossaries** to understand what information exists and what it means. They may also use policy-management platforms, dashboards, and lineage tools that track data from its source to its destination.

### Data Ownership

One of the key governance concepts is **Data Ownership**, which assigns responsibility for different data domains. Ownership doesn't mean that a person literally owns the data. It means that someone has the authority and accountability to make decisions about it.

The main role here is the Data Owner. This is usually a business leader who makes lifecycle and usage decisions for a domain rather than an end user who simply works with the data.

For example, the university may need a student's address to calculate the distance to campus. But the Data Owner of that domain should determine if that address can be accessed by their teachers or shared with an external transportation company, among other decisions.

The Data Owner usually doesn't implement the technical solution. Instead, they use tools such as [<VPIcon icon="fa-brands fa-aws"/>data catalogs](https://aws.amazon.com/what-is/data-catalog/) to find and understand the assets in their domain. A catalog organizes those assets through metadata and makes them easier to govern.

### Data Stewardship

The Data Owner sets direction for a domain, while a Data Steward supports its day-to-day management. **Data Stewardship** includes maintaining definitions, monitoring quality, and helping ensure that data is accurate, complete, and handled according to agreed-upon standards.

In practice, a Data Steward might focus on verifying that students' dates and addresses are in a valid and consistent format, ensuring their names are complete, free of illegible characters, and without other issues. Also, this role emphasizes metadata to interpret data and allow other team members to do so without conflicts.

Data Stewards often work with **data catalogs** and [<VPIcon icon="iconfont icon-oracle"/>business glossaries](https://docs.oracle.com/en-us/iaas/Content/data-catalog/using/enrich-business-glossary.htm). A business glossary standardizes key organizational terms. For example, it might define "distance to campus" as the route distance in meters along public streets rather than a straight-line measurement.

### Decision Rights

Another governance concept is **Decision Rights**: the formal definition of who can make which decisions about data in a given context.

Decision Rights form part of the foundation of governance. Organizations often classify decisions by their scope. Strategic decisions happen at the highest level, for example, when the university decides whether to use mobility data to offer a transportation service.

Then there are tactical decisions, which bridge the gap between the organization's overall strategy and day-to-day operations, such as defining eligibility criteria for candidates for the transportation service.

Finally, there are operational decisions, which are closest to the end users, like accepting or rejecting an enrollment application.

Decision Rights formally assign these choices to specific roles and data domains. The **Data Owner** and **Data Governance Council** are especially important here, with the council usually setting the broader decision framework.

A **Data Protection Officer (DPO)** may advise on a decision and escalate concerns when access would conflict with data-protection requirements. The DPO's exact authority depends on the applicable law and the organization's governance model. Teams often implement Decision Rights through workflow tools and [<VPIcon icon="fa-brands fa-microsoft"/>Identity and Access Management](https://microsoft.com/en-us/security/business/security-101/what-is-identity-access-management-iam) **(IAM)** systems that manage digital identities and permissions.

For example, a university administrator shouldn't have unrestricted database access. They might open a ticket in a workflow tool like [<VPIcon icon="fa-brands fa-youtube"/>Jira](https://youtu.be/GPOWZSxEslU?si=O-DG_9To79_zxttg) to request a specific permission. The appropriate Data Owner reviews the request, and an IAM system such as **Microsoft Entra ID** grants the approved access to the administrator's verified identity.

### Data Policies

While Decision Rights say who can make a decision, **Data Policies** state how people must manage and use data. They set the limits, principles, and obligations everyone must follow.

At the university, there might be a policy stating that user geolocation data can only be used to calculate eligibility for transportation services and not for other decisions unrelated to academic activities. This is an example of a policy related to privacy, data retention, or its use in AI models.

The **Data Governance Council** often formalizes these policies, the **CDO** sponsors them, and Data Stewards help teams apply them. A data catalog can publish the rules and connect them to the affected data assets, while technical systems enforce the controls.

### Data Standards

**Data Standards** are more specific than policies. A standard might define a format, naming convention, or validation rule so teams follow a policy consistently across the organization.

For example, the university might establish that all dates be stored in the same [<VPIcon icon="fa-brands fa-wikipedia-w"/>ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format or that the distance to the campus is always stored in meters. To better understand, a well-known case in computer science is the storage of decimal numbers, where the [<VPIcon icon="fa-brands fa-wikipedia-w"/>IEEE-754](https://en.wikipedia.org/wiki/IEEE_754) standard is commonly used for binary representation.

Shared standards let systems exchange data with fewer unnecessary transformations. **Data Architects** and **Data Modelers** help select and define the standards, while Data Engineers apply them in the implementation. Data Owners and Stewards oversee their use within each domain.

### Data Accountability

**Data Accountability** means that people who have authority over data must also answer for how it's used. Teams need enough monitoring and evidence to trace important actions and understand what happened over time.

If a problem occurs, the organization should be able to establish who accessed the data, when they accessed it, what they did, and whether the action followed policy. Evidence, traceability, and clear responsibilities make governance demonstrable.

At the university, a faculty member may have a legitimate reason to access part of a student's record, but the system should log the access when appropriate. If a privacy issue arises later, audit records can help investigators understand what happened.

The **Data Owner** is accountable for proper use within the domain, while security, compliance, and platform teams provide controls such as access logs, audit trails, and lineage where relevant.

<VidStack src="youtube/uPsUjKLHLAg" />

---

## Data Ethics

Governance alone isn't enough. An organization also needs to ask whether a use of data is fair, proportionate, and justifiable. That's where Data Ethics comes in.

In a data context, **ethics** applies principles such as transparency, responsibility, privacy, and non-discrimination throughout the lifecycle. This becomes especially important with personal or sensitive data because poor decisions can limit opportunities or deny people services.

For example, in a university, data handling during admission processes can result in discriminatory biases in many ways, some possibly unknown or unexpected. Notable among these are biases based on income, ethnicity, or disability.

Data can introduce these biases in numerous ways, which is why it's important to consider ethics and question whether data should be collected or used and what biases they might introduce.

### Ethical Data Use

Ethical data use starts with a clear, legitimate, and proportionate purpose. An organization should know why it needs each piece of data, what value it expects, and what risks the proposed use creates.

Laws such as the [<VPIcon icon="fas fa-globe"/>General Data Protection Regulation](https://gdpr-info.eu/) establish legal requirements that overlap with some ethical principles, but legal compliance and ethical judgment aren't identical. The GDPR applies in the European context, and organizations must identify the rules that apply in every region where they operate.

An example of unethical use is when personal data from candidates entered into a form is sold to marketing companies without the candidates' explicit consent. Here, it's evident that personal data can be used to make decisions and improve a service or be used without consent for other purposes unrelated to the user's benefit.

Roles involved in ethical data use can include the CPO, DPO, a Chief Data Ethics Officer or ethics committee, and Data Stewards. Their exact responsibilities vary by organization. **Consent management platforms (CMPs)** can record and manage the permissions users grant, but consent is only one possible legal basis for processing and one part of ethical review.

### Consent and Transparency

Consent and transparency are two important principles. Users should be able to understand what data is collected, why it's needed, how long it will be kept, who can access it, and whether it will be shared. These explanations should use plain language that a non-expert can follow.

In the case of a university, when a candidate applies for enrollment, the form shouldn't just request information and acceptance of terms. Instead, it should provide explanations about why each piece of data is requested. Clear explanations about how the data will be used and whether it will be shared with third parties should be given whenever possible.

Transparency doesn't end when a user submits a form. People should also be able to learn about their rights and use the processes available to request access or corrections when the applicable law provides them.

### Fairness and Non-Discrimination

Fairness aims to prevent discrimination and harmful bias in the use of data. It matters especially in AI systems, where complex models and historical data can make bias difficult to detect or explain.

For example, a university might decide to award scholarships based on a candidate's zip code or area of residence. At first glance, this may not seem unjust, but in reality, people with very different incomes or academic records may live within the same zip code, and excluding entire areas could deprive qualified people of scholarship opportunities.

Data ethics requires teams to review their decision criteria. In practice, they may analyze bias, examine sensitive variables and their proxies, validate data quality and representativeness, and monitor outcomes over time. For consequential decisions, the organization should also provide suitable human oversight and a way to challenge errors.

### Responsible Data Sharing

Organizations often need to share some data with service providers because they can't deliver every part of a service alone.

Sharing increases risk and needs an appropriate legal basis. That basis isn't always consent. For example, the university may need to share limited data with a taxi/VTC company to provide the service, but the company shouldn't receive the student's full record.

Whenever the use allows it, the organization should share anonymous or **pseudonymous** data instead of direct identifiers. Properly anonymized data can no longer be linked to a person by reasonably likely means. Pseudonymization replaces identifiers with codes or references, but an authorized party can still reconnect the data to the person using information kept separately, so the data remains personal and protected.

### Ethical Risk Management

One practical way to support ethical data use is to assess and manage risk before a new use begins. The review should consider the expected benefits alongside possible harms, bias, privacy effects, and impacts on different groups.

For example, when designing the enrollment application form, before including a field to collect specific data like gender, income, or any other information, it's essential for an ethics committee to evaluate their usefulness, the problems that having this data might cause for students, and whether biases or discrimination could arise.

Data Ethics helps the university improve its services without losing sight of the fact that the data represents real people.

<VidStack src="youtube/gLHMhCtxEYE" />

---

## Data Security and Privacy

So far, we've looked at the rules and ethical choices that shape data use. We also need to protect data throughout its lifecycle. Security and privacy work together here, but they solve different problems.

**Data Security** uses policies, processes, and controls to prevent unauthorized access, alteration, disclosure, or loss. **Privacy** focuses on whether personal data is collected and used for legitimate purposes, with appropriate transparency and respect for people's rights.

Security commonly aims to preserve the confidentiality, integrity, and availability of data. Only authorized people should access or change it, and it should be available when needed. Those properties alone don't guarantee privacy. An address might be strongly secured, for example, but using or selling it for an unauthorized purpose would still violate privacy.

The university therefore has to address security and privacy together. It handles personal data whose exposure or misuse could cause real harm to students.

A **Chief Information Security Officer (CISO)** usually leads the security strategy and coordinates technical and defensive policies. The security team uses controls such as Identity and Access Management platforms to centralize identities, authentication, and permissions.

On the privacy side, the previously mentioned **CPO** helps oversee the organization's privacy program and compliance obligations.

### Data Classification

We won't cover every part of security here. But a useful starting point is to identify what information exists and classify it by sensitivity.

Different data can cause very different levels of harm if exposed. A common classification scheme uses **public, internal use, confidential,** and **restricted** levels.

The first can be accessed by anyone, while internal use data is intended for organization members, though exposure wouldn't have a particularly severe impact. In contrast, confidential data requires authorization to be accessed, and restricted data needs the highest level of protection.

At the university, schedules published on the website would be public. Faculty work procedures might be for internal use. A student's academic record or travel history could be confidential, while banking information or credentials could be restricted.

When a dataset combines several categories, the organization should classify and protect the result according to the risk of the combined data, which may be as high as or higher than its most sensitive field.

The organization should record the classification as metadata in the data catalog so teams can use it throughout the lifecycle. When a **Data Engineer** integrates a source or an analyst creates a dashboard, they can see which precautions apply. Data Stewards often help classify the data, Data Owners approve the business decision, and security and privacy teams define the required controls.

### Identity and Access Management

Once data is classified, the organization must control who can access it. **Identity and Access Management (IAM)** covers the processes and technologies used to manage digital identities and grant, review, or revoke permissions. **Authentication** verifies an identity, while **authorization** determines what that identity may do.

The fundamental principle guiding data access management is the [**principle of **least privilege****](/freecodecamp.org/principle-of-lease-privilege-meaning-cybersecurity.md), according to which each identity receives only the permissions necessary to perform their job.

For example, an instructor can view the contact information of students enrolled in their courses but shouldn't access the information of unenrolled students. In other words, they have the minimum necessary permissions to perform their duties.

If the number of users to manage is high, it's most common to use [**Role-Based Access Control (RBAC)**](/freecodecamp.org/role-based-access-control-nodejs-rest-api-jwt.md), where permissions are associated with roles like instructor, administrative staff, or student, and then each user has a specific role.

As for the professionals responsible for these tasks, the **Data Owners** decide which roles need access to the data in their domain, while the **IAM administrators** implement the roles and their permissions with software like Microsoft Entra ID, an IAM technology that centralizes the management of identities, groups, and access policies.

### Encryption

Access controls can fail, so organizations also use [**cryptography**](/freecodecamp.org/cryptography-for-beginners-full-python-course-sha-256-aes-rsa-passwords.md). Data **encryption** transforms readable information into ciphertext that an authorized system can reverse with the correct key.

This encryption should be applied both at rest and in transit, meaning when data is stored and when it is transmitted from one system to another over the network.

For example, the university should encrypt sensitive student data at rest so stolen storage doesn't reveal it in plain text without the required keys. Communications between a student and the university server should also use TLS through HTTPS to protect data in transit. Encryption is effective only when the algorithms, implementation, and key management are sound. Examples include:

| Original data | Protection applied | Protected result |
| --- | --- | --- |
| `camille.bernard@email.com` | AES-256 encryption | `8A4F2C91B7E03D6A...` |
| `ES12 3456 7890 1234` | AES-256 encryption | `D91B70E4A62C8F15...` |
| `Password123!` | Salted hashing using Argon2id | `$argon2id$v=19$m=65536,t=3,p=4$...` |

Common approaches use **symmetric** and **asymmetric** cryptography, and both depend on strong key management. Keys shouldn't be embedded in source code or stored unprotected beside the data they secure. A Key Management System (KMS) or Hardware Security Module (HSM) can help generate, protect, rotate, and control access to them.

Security Architects and security specialists help select approved encryption standards, protocols, and key-management patterns, while Data Engineers and other developers apply them in each system. Encryption doesn't solve every security problem, so teams combine it with access controls, monitoring, secure development, and usage policies.

### Data Masking

Many processes don't need to reveal a complete value. **Data Masking** transforms or partially hides data to reduce exposure while preserving enough utility for a specific task.

There are mainly two forms of masking. **Dynamic Data Masking** partially hides the information presented to the user without altering the original stored data. Thus, an authorized person can see the full value, while someone with fewer privileges sees a partial version like `**1234`.

On the other hand, **Persistent Data Masking** creates a permanently transformed copy, allowing systems to be tested without using real data.

For example, if the developers of the virtual campus need to test that the application works with thousands of students, subjects, and trips, they don't need to use real data. Instead, they can replace it with fictitious data, shifting dates, changing names to fictitious ones, and so on.

To better understand its purpose, here are some specific examples:

| Original Data | Technique Applied | Displayed Result | Purpose |
| --- | --- | --- | --- |
| Student’s bank account: `ES12 3456 7890 1234` | Dynamic masking | `ES** **** **** 1234` | Verify the account without displaying it in full |
| Student’s email address: `lucia.garcia@email.com` | Partial masking | `l***@email.com` | Confirm the student’s identity without exposing the full email address |
| Student’s full name: `Lucía García` | Persistent substitution | `Student_1048` | Test systems without using real identities |
| Student’s home address: `Calle Mayor 24, Madrid` | Generalization | `Madrid` | Analyze residential areas without knowing the exact address |
| Student’s date of birth: `18/04/2001` | Age-range generalization | `20–25 years old` | Analyze age groups without revealing the exact date of birth |
| Internal student identifier: `STU-45821` | Pseudonymization | `9F3A-71BC` | Manage a trip without sharing the student’s full identity |

Masking, pseudonymization, and anonymization overlap in some implementations, but they aren't interchangeable. Masking alone doesn't guarantee that a dataset is anonymous. **Pseudonymization** replaces identifiers with codes while keeping the information needed to reconnect those codes to people separately. Because re-identification remains possible, pseudonymized data is still personal data and needs protection. Anonymization requires reducing identification risk to the point that people are no longer identifiable by reasonably likely means.

In this case, **Data Stewards** determine which data should be concealed and why, while security and **Data Engineering** teams implement these decisions at a low level.

### Privacy Controls

The previous techniques help prevent unauthorized access. **Privacy Controls** address a different question: whether the organization has a valid purpose and appropriate rules for processing personal data.

The principles of **Privacy by Design** and **Privacy by Default** make privacy part of a system from the start and set privacy-protective defaults. One fundamental control is **data minimization**, which means collecting only what the stated purpose requires. An enrollment form, for example, shouldn't request a complete medical history unless a specific service and lawful purpose justify it.

Other controls apply to the purpose of the data and its retention. So in use cases, students' personal data shouldn't be kept longer than necessary or reused for other purposes like personalized marketing campaigns without authorization.

In Europe, the **GDPR** establishes principles and requirements that guide these controls. The organization must also identify the rules that apply in every region where it operates. The **DPO** monitors and advises on compliance where that role applies, while Data Owners, privacy specialists, security teams, and system designers turn the requirements into practical controls.

### Audit and Compliance

The organization must be able to show that its controls and policies work. **Auditing** independently reviews the available evidence and tests whether controls operate as expected. **Compliance** covers the ongoing work of meeting internal policies, standards, contractual duties, and applicable regulations.

**Logs** are one important source of audit evidence. They can record who accessed data, when, from which system, and what action they took. Teams protect these records against tampering and retain them for a defined period based on risk, legal needs, and cost. **Security Information and Event Management (SIEM)** platforms centralize events from different systems and can generate alerts for unusual behavior.

For example, if a teacher occasionally checks the record of a student enrolled in their course, the behavior may be legitimate. But if they download hundreds of student records with whom they have no connection during the night and from another country, an alert should be generated for the security team to investigate the incident.

An audit might analyze logs, test whether identities have excessive privileges, and review how teams apply encryption and other controls. Independent reviewers and separation of duties help prevent the same administrator from controlling a system and the evidence used to assess their actions.

Roles involved include the **CISO**, the **DPO**, the **Data Owners**, the **Data Stewards**, and the compliance and audit teams. In summary, security and privacy require knowing what data exists, limiting who can use it, protecting it through controls, and preserving evidence that all of this is correctly followed.

### Security Operations (SecOps)

Data security is ongoing work. Beyond policies and encryption mechanisms, **SecOps (Security Operations)** brings people, processes, and technology together for continuous defense.

SecOps teams monitor systems, detect threats, investigate alerts, and respond to incidents. They try to reduce risk early while staying ready to contain and recover from events that still occur.

In the university context, the SecOps team is responsible for overseeing the digital ecosystem in real time. For example, if a SIEM generates an alert because a teacher has downloaded hundreds of academic records at night or engages in any similar suspicious activity, the SecOps analyst receives the notification, assesses the risk, and takes action, such as temporarily blocking access as a preventive measure.

SecOps teams may also coordinate vulnerability scanning and remediation for the virtual campus and other systems so weaknesses are addressed before attackers exploit them.

In SecOps, key roles include **SecOps engineers** and **security analysts**, who work with the CISO to define and implement a defense strategy. These professionals rely on SIEM platforms to centralize event information and **SOAR (Security Orchestration, Automation, and Response)** tools to automate responses to common threats.

<VidStack src="youtube/UpkqXK0B2E0" />

---

## Data Architecture

Once you know who makes decisions about data and how to protect it, you still need to organize the systems that store, move, and process it.

[<VPIcon icon="fa-brands fa-aws"/>Data Architecture](https://aws.amazon.com/what-is/data-architecture/) designs the structure that meets those needs. Once the organization defines what it wants to achieve with data, the architecture shows how systems will store, transport, protect, and analyze it.

This capability connects business goals with technical implementation. It goes beyond choosing a database or sketching a pipeline: the design identifies which data the organization needs, where it lives, how it relates, and how it moves. The work can produce data models, flow diagrams, standards, and other architecture decisions.

In this use case, a candidate might enter their home address in a web form during enrollment. This data could then be sent to an admissions system and used in a query to a geographic API to calculate the distance to the campus, for example. It could also be used along with other data present in other systems, like class schedules, to verify eligibility if transportation service is requested.

Here, Data Architecture is responsible for designing how this complete data journey is carried out.

A poorly designed [<VPIcon icon="fa-brands fa-youtube"/>architecture](https://youtu.be/2Xf0ACFGdQk?si=-U4GMqTK51mZaM8M) can fail in several ways. Systems may exchange data incorrectly or stop communicating, interrupting a service for users. Even if nothing breaks outright, teams may duplicate data unnecessarily, raising costs and making integration harder. Good architecture reduces these risks and makes tradeoffs explicit.

The **Enterprise Data Architect** maintains the organization-wide view, while **Data Architects** and **Solution Architects** adapt it to particular solutions. **Data Modelers, Data Engineers, Data Stewards, Data Owners**, and security specialists contribute the design details and help put the architecture into practice.

In simple terms, architects design and document the solution, engineers and developers implement it, and Data Owners and Data Stewards clarify the meaning, rules, and responsibilities of the data.

### Enterprise Data Architecture

The broadest level of data architecture is **Enterprise Data Architecture**, the organization-wide view of how data should be organized, connected, and governed.

At a university, Enterprise Architecture provides a comprehensive view of how systems should be coordinated, what each should do, and how information is exchanged between them.

For example, the web application through which a candidate completes a process must be properly connected with an admissions system or a database where that information is stored. This database or system can also support the operation of other internal systems dedicated to analyzing that data, or parts of it, according to privacy policies.

This work is led by the Enterprise Data Architect with support from the CDO, who aligns the architecture with the data strategy, and other roles like Application Architects or Security Architects. Additionally, Data Owners validate that the architecture meets the needs of their domains.

### Data Domains

Data domains are an important part of an organization's architecture. Not all data describes the same part of the business, so teams group related concepts to make the data easier to organize, understand, and govern.

A **Data Domain** is a logical area containing related organizational concepts and data. A university might define domains for students, faculty, finance, and mobility. Grouping data this way makes its meaning clearer and helps the organization assign a Data Owner to each domain.

Additionally, a domain isn't isolated from others, as data often needs to be contextualized, even if it belongs to different domains. For example, the transportation service may require data from the mobility domain, as well as the schedule of its courses present in another domain.

Each governed domain should have a Data Owner with suitable decision authority. A Data Architect helps design the domain boundaries and relationships, which teams can represent in a conceptual model and document in a **data catalog**.

### Data Flows

Once the domains and systems are clear, the team designs how data moves between them. **Data Flows** document the source, the systems and processes involved, the transformations applied, and the final storage or consumption point.

You can describe a flow at several levels. A high-level diagram may show data moving from one domain to another. An implementation view names the systems involved, while a more detailed design can show the fields, interfaces, and transformations that each consumer requires.

In the process of enrolling a candidate at the university, the main flow could be as follows:

1. The candidate accesses the enrollment portal and completes the form with their personal, academic, and contact information.
2. The enrollment portal validates the required fields and data format. Then, it sends the application to the admissions system via an API.
3. The admissions system creates the candidate's file and stores documents like the ID, academic degree, and certificates in a document database.
4. When the application is approved, the admissions system generates an offer that the candidate views and accepts through the enrollment portal.
5. The portal consults the academic management system to display courses, schedules, and available slots, allowing the candidate to select their options and confirm enrollment.
6. The payment system sends the transaction to an external payment gateway. The gateway returns the payment status, such as authorized, rejected, or pending. The university stores only a reference to the transaction and its result.
7. If the payment is successful, the academic management system creates the final enrollment and converts the candidate's file into a student file.
8. Next, the system updates the identity platform, virtual campus, and billing system. The student receives their credentials, payment receipt, and enrollment confirmation.
9. Finally, the necessary data can be pseudonymized and sent via a data pipeline to an analytics platform, where statistics on applications, admissions, payments, and enrollments are calculated and displayed on a dashboard.

Some data movements need near-real-time responses, especially in the transportation service, while others can run later in a batch. The flow should state those timing requirements.

The main role that designs the flow and determines which components participate is the Data Architect, while the Data Engineer implements it. But Security Architects also participate, reviewing data protection during the flow, and Data Owners authorize exchanges between domains. Finally, it's important to highlight the significance of **data lineage** tools for maintaining, monitoring, and auditing the flows.

### Operational Data Architecture

The systems in an architecture serve different purposes. It's useful to distinguish between systems that run day-to-day processes and systems designed mainly for analysis.

The first group forms the **Operational Data Architecture**. This area covers the systems that keep an organization running each day. [<VPIcon icon="iconfont icon-databrick"/>Online Transactional Processing](https://databricks.com/blog/what-is-oltp) **(OLTP)** systems handle frequent operational transactions and use controls that help preserve data integrity and consistency.

The university's operational architecture could include the virtual campus, application services, and a database. The portal would normally use an application or service layer rather than giving the user's browser direct database access. These components support the daily capture and management of data rather than long-running historical analysis.

That is, the operational database can serve as an authorized source to know the current status of enrollments, for example. However, it is not the most suitable place to continuously run complex queries over several years of activity to build statistics, as they could consume the resources needed for daily operations. Therefore, the data required to study trends, compare programs, or create dashboards is handled in another part of the architecture explained later.

For this type of information, it's common to use relational databases like PostgreSQL or MySQL. But you should choose the specific technology based on the volume of your operations, expected availability, existing infrastructure, and other requirements such as maximum response latency.

A **Solution Architect** or **Data Architect** designs the operational architecture, **Software Engineers** build the application components, and **Data Engineers** help define and implement the data exchanges between them.

### Analytical Data Architecture

While operational architecture handles day-to-day activity, [<VPIcon icon="fa-brands fa-youtube"/>Analytical Data Architecture](https://youtu.be/ivSPZB6zUKY?si=IpdpBvmZ3pPbOs38) supports the integration, aggregation, and study of historical data. Its systems help teams create reports, discover patterns, and prepare data for AI models without placing unnecessary analytical load on operational services.

At a university, this architecture would be used to combine data on schedules, attendance, and budgets so an analyst can calculate the monthly expenses per master's program or the variation in student attendance over different periods. Similarly, a Data Scientist could use historical data to estimate future demand for transportation services, for example.

A typical analytical flow uses [<VPIcon icon="fa-brands fa-wikipedia-w"/>**ETL** or **ELT**](https://en.wikipedia.org/wiki/Extract,_transform,_load) (which we'll discuss more below) to obtain data from several sources. Teams then transform it before or after loading it into a specialized system such as a Data Warehouse. The result gives Business Intelligence tools and Machine Learning workflows suitable data without competing directly with the virtual campus for the same operational resources.

In this area, the Data Architect or **Analytics Architect** designs the analytical components of an architecture. Meanwhile, **Analytics Engineers** and Data Engineers design the processes that prepare data for analysis by **Data Analysts** or **Data Scientists**.

### Cloud and Hybrid Data Architectures

Architecture also determines where components run: in the cloud, on premises, or across both. **Cloud Data Architecture** uses cloud computing, storage, database, and analytics services. These services can simplify scaling and reduce the need to manage physical hardware, but the organization still has to configure security, control costs, and govern its data.

On the other hand, a **Hybrid Data Architecture** combines on-premises systems with cloud services. This approach is common when an organization retains existing applications in its own data center but wants to use the cloud's elasticity or analytical services.

To understand the motivation for a hybrid architecture, in the case of the university, the academic system and the database with records and payments might initially remain in internal infrastructure to prevent third-party access to those data. But some pseudonymized data could be sent to cloud analytics platforms to obtain certain statistics on virtual campus usage or academic metrics.

Nevertheless, keeping certain data on-premises doesn't automatically guarantee greater security, just as using the cloud doesn't automatically mean a loss of control. The decision should consider data sensitivity, latency, availability, scalability, and the total cost of each solution.

In this design, the **Enterprise Data Architect** and the **Data Architect** participate, along with the **Cloud Architect**, who specializes in understanding cloud services to use them correctly in an architecture.

**Network Engineers**, **Cloud Engineers**, and Data Engineers also participate in its implementation, while the DPO and Data Owners must review issues like which data can leave the internal infrastructure and for what purpose.

<VidStack src="youtube/SYPrzij9G04" />

---

## Data Modeling and Design

Data architecture defines which systems manage data and how they exchange it. **[<VPIcon icon="iconfont icon-databricks"/>Data Modeling](https://databricks.com/blog/what-is-data-modeling) and Design** specifies how those systems represent the information. It identifies the concepts that matter to the organization and describes their attributes, relationships, and rules.

A data model is a simplified representation of part of reality. It gives people a shared structure they can understand and later implement. Before creating the university's database, for example, the team needs to define what a candidate, student, master's program, and enrollment mean, which information each one needs, and how they relate.

Teams commonly describe a design at three levels:

1. a **conceptual model** with the main business concepts,
2. a **logical model** that adds detail without depending on a particular technology,
3. and a **physical model** that maps the design to structures in a specific platform.

Each model can evolve as the team learns more about the requirements.

The **Data Modeler** leads the design and works with the **Data Architect** to fit it into the wider architecture. Data Owners, Data Stewards, Business Analysts, and domain experts clarify meaning and rules. **Database Administrators (DBAs)**, Data Engineers, and Software Engineers contribute to the physical design and implementation.

### Conceptual Data Models

A **conceptual data model** gives you a high-level view of an organization's data. It shows the main business concepts and their relationships without technical details about storage or format.

![Example of conceptual data model. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/8921466f-eab4-4cdf-8f9d-a0c225033138.png)

For example, as shown in the diagram above, in a university, a conceptual model would include concepts like candidate, student, course, or enrollment. (Keep in mind that this is a sketch to help you better understand the concept of a conceptual model, not a diagram used in production.)

At this level, it's sufficient to indicate what each of these concepts is and what they can do in relation to others, such as a student requesting enrollment or an enrollment containing a set of courses. The goal is for both technical teams and academic leaders to understand the same reality before designing a specific solution.

This model is usually developed through interviews or workshops with Data Owners, Data Stewards, Business Analysts, and domain experts, who are generally not very technical given the nature of the task. In this process, the **Data Modeler** or **Data Architect** creates diagrams with the model and validates that the concepts match the business glossary.

### Logical Data Models

A logical model develops the conceptual model in more detail while remaining independent of a specific technology. It defines entities, attributes, identifiers, relationships, cardinalities, and other business constraints.

![Example of logical data model. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/9da1318c-2d68-4140-92f0-b4bfb6123ddc.png)
<!-- TODO: mermaid화 -->

For example, the Student entity might have attributes like ID, name, email, and address. A student can enroll in several courses, and a course can have many students. This **many-to-many** relationship could be represented at the logical level with an intermediate entity called Enrollment, which might include attributes like date, status, or academic year.

People often associate logical models with relational databases, but a logical model doesn't have to use that paradigm. Think of it as a technology-independent specification of the information and its connections, even though different paradigms represent entities and relationships in different ways.

These relational models can be refined. For example, in a relational database, its logical model can be normalized to reduce duplications and incorrect dependencies. But in other paradigms or solutions, there will be very different procedures. And the design of this model is led by a **Data Modeler**, in collaboration with a **Data Architect**, as mentioned earlier.

### Physical Data Models

The physical data model maps the logical design to a specific technology. In a relational database, for example, it turns logical entities and relationships into tables, columns, keys, constraints, partitions, and [<VPIcon icon="fa-brands fa-youtube"/>lower-level structures](https://youtu.be/W_v05d_2RTo?si=RY4KGH-lHWGGKnZ_) such as indexes, which often use a [<VPIcon icon="fa-brands fa-youtube"/>B-tree](https://youtu.be/K1a2Bk8NrYQ?si=G0a3Ij3sFStSiU84).

At the university, student records could live in a relational table. The DBMS decides how to store the table itself, while the team can create indexes, often B-tree indexes, on selected columns to speed up common queries.

As you can imagine, the same logical model can generate different physical models. For instance, the academic system could be implemented in PostgreSQL or MySQL. So the physical design must consider the DBMS intended for use, data volume, query patterns, security, availability, and operational cost to provide an effective solution.

In this design phase, the **Data Modeler** or **Database Designer**, the Data Architect, and the Data Engineers primarily work together with the Software Engineers to implement the solution.

### Entity-Relationship Modeling

Entity-relationship diagrams are a common way to represent relational concepts. Depending on how much detail they contain, they can support conceptual or logical modeling. **Entities** are typically shown as rectangles, while lines represent relationships, **cardinality**, and optionality.

For example, a student can have many enrollments, and each enrollment belongs to a single student. In contrast, a relationship between Student and Course would be many-to-many because a student can be enrolled in many courses at once.

Keys are also identified to distinguish each instance of an entity and maintain the integrity of their relationships, among other details that aren't as relevant here.

If you're curious, you can read more about database design [**in my previous book here**](/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/README.md).

### Dimensional Modeling

Another useful approach, especially in Data Warehouses and analytical systems, is [<VPIcon icon="iconfont icon-ibm"/>dimensional models](https://ibm.com/docs/en/informix-servers/14.10.0?topic=model-concepts-dimensional-data-modeling). These models organize data around facts and dimensions. **Facts** record measurable events, while **dimensions** provide the context used to analyze them.

For example, in a transportation service, you might have a fact table called Trip, containing a row for each completed journey, recording measures such as cost, distance, and duration. But instead of storing the traveler's data in the same table, it relates to others representing dimensions like Student, Date, or Transportation Provider. Thus, the fact table models the existence of trips, while other dimensional tables contain specific data for each trip, such as the person or transportation provider, resulting in a structure known as a [<VPIcon icon="iconfont icon-databricks"/>star schema](https://databricks.com/blog/what-is-star-schema).

This type of model is primarily used because it simplifies analytical queries and allows studying the same fact from different "perspectives." For example, the university could calculate the total cost of trips by month, student, or provider without having to construct excessively complex queries.

### Data Model Governance

Data models also need governance so they stay consistent, current, and aligned with the implementation. Teams should maintain the connection between conceptual, logical, and physical designs as each one changes.

Once teams approve a model, the implementation should follow it or update it through a controlled change. Unexpected differences between an expected and an actual schema are commonly called **schema drift**.

For example, the university's model might define a numeric age field while the implementation stores it as text. That difference may look small, but downstream systems can fail if they rely on the agreed type. Teams should detect and control schema changes so models, contracts, and implementations stay aligned.

A **Data Governance Council** or **Architecture Review Board** may review significant model changes. Data Owners confirm that the design reflects business rules, while database and engineering teams implement approved changes through a controlled process.

<VidStack src="youtube/LXK58eRNo9Q" />

---

## Data Storage and Operations

Data models guide the implementation of systems that store data persistently and make it available to applications and other systems. The team has to choose an appropriate storage technology, keep the data accessible when needed, and operate the system at an acceptable level of performance.

**[<VPIcon icon="iconfont icon-ibm"/>Data Storage](https://ibm.com/think/topics/data-storage) and Operations** covers the design, implementation, and operation of storage systems throughout their lifecycle. This includes choosing databases, file systems, and object stores, then maintaining, monitoring, and optimizing them. As you'll see, a database isn't the right home for every type of data.

Data architecture determines which systems the organization needs and how they communicate. Data modeling specifies how they represent information. Data Storage and Operations turns those designs into working storage systems. A physical model might say that the Student entity maps to a PostgreSQL table with a B-tree index on `student_id`. This section focuses on implementing and operating that kind of design.

The main objectives of data storage are to maintain availability, integrity, and ensure good performance of the underlying system. To achieve these, you shouldn't always use one technology for all the data in an organization, as the data for an enrollment or a class video, for example, has very different structures, uses, and requirements. So the same organization often combines different storage systems.

| Need | Example data | Most common system | Example technologies |
| --- | --- | --- | --- |
| Record the current state of operations | Students, enrollments, payments, and transportation requests | Operational database | PostgreSQL, MySQL, SQL Server, Oracle Database, or MongoDB |
| Store large documents and content | Academic certificates, supporting documents, materials, and videos | File Storage or Object Storage | NFS, SMB, Amazon S3, Azure Blob Storage, Google Cloud Storage, or MinIO |
| Analyze integrated and historical information | Monthly travel costs and attendance trends | Data Warehouse | Snowflake, BigQuery, Amazon Redshift, Azure Synapse Analytics, or Teradata |
| Store data for advanced analytics | Original provider files, events, and virtual campus logs | Data Lake or Lakehouse | Object Storage, Parquet, Delta Lake, Apache Iceberg, Spark, or Trino |

The team should choose the technology based on its expected volume, access patterns, sensitivity, availability, cost, and other requirements. Every additional technology increases operational complexity, so each one should solve a real problem.

A **Database Administrator** creates, configures, secures, tunes, and maintains databases. **Storage Administrators** manage the underlying storage, while **Site Reliability Engineers** and platform teams monitor services and respond to reliability incidents. The exact division of work depends on the platform and organization.

### Databases

A database is an organized collection of data that applications can store, change, and query. A **[<VPIcon icon="iconfont icon-neo4j"/>Database Management System](https://neo4j.com/blog/graph-database/what-is-database-management-system/) (DBMS)** is the software that manages databases and provides services for querying, concurrency, security, recovery, and administration. PostgreSQL is a DBMS. The university's academic database would be a particular database managed by a PostgreSQL server or service.

Operational systems often need **transactional** support, especially for workflows such as enrollment and payment. A transaction groups related operations into one logical unit. The **[<VPIcon icon="fa-brands fa-youtube"/>ACID properties](https://youtu.be/GAe5oB742dw?si=Sg_nxUQBRLIhFp1g) (Atomicity, Consistency, Isolation, and Durability)** describe guarantees that help applications preserve valid state despite failures and concurrent access.

For example, when making a payment, values must be modified in multiple places corresponding to the users exchanging money. Thus, the atomicity of a transaction allows confirming all these modifications together, and if any fail, reverting them to maintain the previous state.

Database designs make different tradeoffs among data model, scale, consistency, latency, and access patterns. That's why several database **paradigms** exist:

| Paradigm | Characteristics | Use case example | Technologies |
| --- | --- | --- | --- |
| **Relational** | Organizes data into related tables, uses predefined schemas, and supports keys, constraints, and transactions | Managing students, courses, enrollments, invoices, and transportation requests, where relationships and integrity are important | PostgreSQL, MySQL, SQL Server, or Oracle Database |
| **Document-oriented** | Groups information into documents, usually similar to JSON, which may contain nested structures and evolve more flexibly | Storing forms from multiple providers when they don't all submit exactly the same fields | MongoDB or Couchbase |
| **Key-value** | Retrieves a value through a unique key and prioritizes simple, fast access patterns | Maintaining portal sessions, temporary results, or a cache of frequent queries | Redis or Amazon DynamoDB |
| **Graph-oriented** | Represents data through nodes and relationships, enabling complex connections to be traversed efficiently | Analyzing relationships among students, courses, lecturers, transportation routes, or dependencies between services | Neo4j, Amazon Neptune, or ArangoDB |

These are only a few database paradigms. A university could use PostgreSQL for an academic system that manages Student, Enrollment, and Course records through tables and relationships. For a specialized route or network analysis, a [<VPIcon icon="iconfont icon-neo4j"/>graph-oriented database](https://neo4j.com/docs/getting-started/graph-database/) could represent locations as nodes and connections as edges. The operational taxi service itself might still use a relational or other transactional store, depending on its access patterns.

The **Data Architect** and **Data Modeler** select the database paradigm and design with input from the engineers who will build and operate the solution.

Once operational, the database is maintained by a **Database Administrator**. Before this, a **Database Engineer** will have implemented the physical model, created instances, schemas, tables, and other necessary elements to subsequently operate the environment. **Software Engineers** develop the applications that access these databases and perform queries.

### File and Object Storage

Not all data fits naturally in a database. Universities manage diplomas, identity documents, and large files such as class recordings. A DBMS can store binary content, but file or object storage often provides more suitable access, scale, and cost characteristics for these assets.

**File Storage** organizes files into directories and exposes them through paths and protocols such as [<VPIcon icon="fa-brands fa-wikipedia-w"/>NFS](https://learn.microsoft.com/en-us/windows-server/storage/nfs/nfs-overview) or [<VPIcon icon="fa-brands fa-wikipedia-w"/>SMB](https://en.wikipedia.org/wiki/Server_Message_Block). Teams can implement it with a Network Attached Storage (NAS) system or a cloud service such as Amazon EFS or Azure Files.

[<VPIcon icon="iconfont icon-gcp"/>Object Storage](https://cloud.google.com/learn/what-is-object-storage) stores content as objects with identifiers and metadata, usually inside buckets or containers. Its namespace and access model differ from a mounted hierarchical file system, even when tools display folder-like prefixes. Services such as Amazon S3, Azure Blob Storage, and Google Cloud Storage can hold large collections of documents, images, and videos.

The main difference is the access model. File Storage behaves like a shared file system, while applications usually access Object Storage through an API using an object key and metadata.

For example, the university could use [<VPIcon icon="iconfont icon-ibm"/>File Storage](https://ibm.com/think/topics/file-storage) to save administrative documents for each student, like registrations and certificates, in a shared folder. This way, authorized staff could manage them as if they were in a traditional file system.

On the other hand, it could use Object Storage to store a large number of class recordings, images, and multimedia materials in a bucket. Instead of locating a video by navigating folders, the system could retrieve it directly using its identifier or by filtering through its metadata.

The roles responsible for configuring and operating these systems are mainly **Storage Administrators**, **Cloud Engineers**, and **Platform Engineers**, while **Software Engineers** implement access to these systems from other applications.

### Data Warehouses

Operational databases are usually optimized for current transactions and application queries rather than repeated analysis across years of integrated history. Complex analytical workloads can also compete with the applications using the same resources. Organizations therefore often copy suitable data into a separate [<VPIcon icon="fa-brands fa-youtube"/>Data Warehouse](https://youtu.be/k4tK2ttdSDg?si=_YRRhtlEBhAW_jAx).

A Data Warehouse is an analytical repository that integrates data from multiple sources and organizes it for repeatable analysis, reports, and dashboards. These systems support **[<VPIcon icon="fa-brands fa-aws"/>Online Analytical Processing](https://aws.amazon.com/what-is/olap/) (OLAP)** workloads that scan and aggregate many records, in contrast with the **Online Transactional Processing (OLTP)** workloads common in operational applications.

<VidStack src="youtube/iw-5kFzIdgY" />

This difference often affects storage design. Many Data Warehouses use columnar storage because an analytical query may scan a few columns across a large number of rows. To calculate the total cost of taxi rides by date, for example, the engine may only need the cost and date columns.

Many operational relational databases use row-oriented storage because it efficiently retrieves or changes complete records. These are common patterns rather than universal rules. Specific products can support several storage formats.

In practice, the university could have a database and a pipeline where data is periodically extracted to be inserted into a Data Warehouse. There, a dimensional data model could be applied as seen earlier to analyze the data and allow an analyst to answer questions like:

- What's the average monthly cost of a certain course per student?
- How has in-person attendance changed over a specific period?
- How many students enrolled last month?

It's important to understand that a Data Warehouse doesn't replace a database. Rather, it's an auxiliary system focused on data analysis. Among the technologies available for these types of systems are cloud platforms like Snowflake, Google BigQuery, or Amazon Redshift.

The roles that work with them include **Data Architects** or **Analytics Architects**, who design the analytical platform, while Data Engineers design the pipelines to extract and load the data.

**Data Warehouse Administrators** or Platform Engineers manage performance, permissions, reliability, and cost. Data Analysts and Business Intelligence professionals query the governed analytical data without changing the operational source records.

### Data Lakes and Lakehouses

A traditional Data Warehouse applies defined schemas and organizes data for known or anticipated analytical needs.

But this isn't always the case, as an organization might also need to retain original files, semi-structured data, logs, images, or events whose future use isn't yet fully defined.

For these situations, we can use a [<VPIcon icon="fa-brands fa-youtube"/>Data Lake](https://youtu.be/-bSkREem8dM?si=dCvdno6pKghx3nQx), which is a repository designed to store large amounts of data in their original formats or with minimal transformations.

A Data Lake also supports analytical and data-processing needs, but it can retain structured, semi-structured, and unstructured data with fewer transformations at ingestion. It's often associated with [<VPIcon icon="fas fa-globe"/>schema-on-read](https://dremio.com/wiki/schema-on-read-vs-schema-on-write/), where a query or processing job applies part of the structure, while a traditional Data Warehouse commonly uses **schema-on-write** before loading curated data.

Schema-on-read doesn't remove the need for metadata, security, quality, and governance. Without them, the lake can become a [<VPIcon icon="fas fa-globe"/>data swamp](https://dremio.com/wiki/data-swamp/).

To understand how information is organized in a Data Lake, in the university's use case, the data could be processed in layers according to their readiness for consumption.

1. In a specific area of the system, data could be kept in their original formats without modification, such as CSV or JSON files. This would allow for reprocessing the information if an error in a transformation is detected later or if another type of analysis is needed.
2. In another area, the data could be in a different format, or the same format but with certain transformations applied to remove invalid records or standardize units of measure, for example.
3. In a curated area, teams could apply further quality checks and transformations until the data meets the requirements for dashboards, with selected statistics pre-calculated.

This separation doesn't imply that all original data is always retained indefinitely, as privacy, security, and retention policies must be followed.

For example, the university may temporarily store documents submitted by a candidate during the admission process. But if the candidate is rejected and enough time has passed, the university must delete those documents, even if derived and anonymized data have been generated to compile statistics on the admission process.

[<VPIcon icon="fa-brands fa-youtube"/>Lakehouses](https://youtu.be/PQFWQmL3fLY?si=uTQmSYzMMbXZidcH) add capabilities such as transactions, schema enforcement, and table management to the flexible storage commonly used for a Data Lake. They can let several analytical workloads share one data foundation, although they don't eliminate every reason to use specialized systems.

Among the technologies used to build a Lakehouse are Delta Lake, Apache Iceberg, and Apache Hudi. They define the data format usually stored on services like Amazon S3, Azure Blob Storage, or Google Cloud Storage and processed using tools like Apache Spark, Databricks, or Trino.

In the case of the university, a Lakehouse could be used to store student data, enrollments, attendance, and taxi rides in one place. This way, the university could securely update this data and use it directly to create reports, such as monthly transportation expenses or the number of students attending classes, without needing separate systems.

Finally, those responsible for designing and implementing data ingestion from different sources in these systems are the **Data Engineers**. On the other hand, **Platform Engineers** manage the infrastructure, and **Analytics Engineers**, along with Data Scientists, consume the data to conduct relevant analyses and research.

### Backup and Recovery

Even a well-designed storage system can suffer hardware failures, software defects, corruption, mistakes, or attacks that cause data loss. That's why **Backup and Recovery** is essential in production.

A **backup** is a recoverable copy of data kept for loss or corruption scenarios. A backup is useful only if the organization protects it, verifies it, and tests the recovery process. Common mechanisms include:

- **Full backup:** Copies the entire dataset. For example, the university could perform a complete weekly copy of the enrollment database. It simplifies restoration, though it requires more time and storage.
- **Incremental backup:** Saves only the changes made since a previous copy. After a monthly full backup, only the modified enrollments could be copied daily. It reduces volume, but recovery may require several linked copies.
- **Snapshot:** Captures the state of a storage system at a point in time. Depending on the technology, it may share underlying storage and may not be an independent copy. The university could take one before a major academic-system change, while still keeping separate backups for stronger protection.
- **Log backup:** A backup that relies on a change log, allowing recovery of the database to a previous point in time if data is accidentally deleted. It's more precise but requires maintaining the entire log sequence.
- **Replication:** Maintains a replica of an entire system that can take over if the main system fails. For example, a secondary database could continue serving the enrollment portal, improving availability. But it can also replicate deletions or errors, so it doesn't replace a backup.

A recovery strategy uses two common objectives. The **Recovery Point Objective (RPO)** expresses the maximum tolerable data loss in time, while the **Recovery Time Objective (RTO)** states how long service restoration may take before the impact becomes unacceptable.

For example, the university might hypothetically set an RPO of five minutes and an RTO of one hour for the enrollment database during the registration period. This would mean that, in the event of a serious failure, they aim to lose a maximum of five minutes of operations and restore service within an hour. In contrast, a collection of already published videos might allow for a slower recovery if durable copies exist elsewhere.

A well-known practice in designing backup solutions is the **3-2-1 rule**, which involves maintaining three copies of important information, using at least two storage media or technologies, and keeping one copy offsite. But you should tailor your solution to the requirements of your organization.

The Data Owners and business leaders are responsible for identifying critical processes and determining acceptable loss or interruption. On a technical level, a **DBA** implements and validates the database recovery mechanisms. Additionally, **Storage Administrators** and **Cloud or Platform Engineers** manage storage and automate backups, while **Site Reliability Engineers** monitor and conduct tests to ensure recovery functions as expected.

### Retention and Archiving

An organization shouldn't keep every piece of data indefinitely. Doing so raises costs, complicates discovery, and increases the impact of a breach.

A **retention policy** should state how long data stays active, when it moves to an archive, and when it is deleted or anonymized. The policy should reflect business needs, contractual duties, legal requirements, and applicable holds.

In this context, it's important to distinguish between two concepts:

- **Archive:** Stores information that's no longer regularly used but must remain accessible. For example, a former student's record might be moved to an archive with lower storage and retrieval costs, in case it's needed to verify their existence when requesting a certificate.
- **Retention:** Defines how long data is kept and what happens when that period ends. For example, the personal and academic documentation of a rejected applicant might be retained until the admission process and the appeal period are over. Afterward, those documents would be deleted, although the university might keep anonymous statistics on the number of applications received.

Data Owners, Records Managers, legal counsel, and privacy specialists help establish retention periods. A [<VPIcon icon="fa-brands fa-wikipedia-w"/>legal hold](https://en.wikipedia.org/wiki/Legal_hold) can temporarily suspend normal disposal for information related to an investigation or proceeding. The organization therefore needs a documented reason to keep or delete data rather than deciding only by whether it seems useful.

Afterward, Data Stewards classify the data, and DBAs, Storage Administrators, or Cloud Engineers implement the policies. As an interesting technology, **Write Once Read Many (WORM)** storage is often used for records that must remain unalterable.

### Performance and Availability

Stored and protected information must be available when the service needs it and perform within its agreed targets. **Performance** describes qualities such as response time and throughput, while **availability** measures whether the expected service can be used.

A system can be technically running yet unusable if it responds too slowly. It can also be fast when online but fail its availability target because of frequent outages. Teams need to manage both qualities.

Some techniques that can improve the performance of a storage system include:

- Create **indexes** on frequently queried fields, after ensuring they justify the space cost of the index itself.
- Analyze the most frequent queries or workloads to try to optimize the query plans generated by the DBMS.
- Introduce **caches** whenever possible, especially when results will be needed multiple times.

Performance work depends on the system and workload. Adding hardware won't fix every problem, as software design matters just as much. Unnecessary pipeline transformations, for instance, increase execution time and cost even when they don't cause an outage.

On the other hand, **redundancy** is often used to improve availability. Essentially, if there are replicas of the same server or system, it's less likely that all will fail simultaneously, leaving end users without service.

You can manage the existence of replicas with [<VPIcon icon="fas fa-globe"/>failover mechanisms](https://geeksforgeeks.org/system-design/failover-mechanisms-in-system-design/), so if a PostgreSQL instance, for example, stops working, you can redirect traffic to another replica automatically and transparently for the end user.

In the university example, during the last days of the enrollment period, thousands of students might access the portal simultaneously. To maintain good performance, requests would be distributed among several servers, preventing any single one from becoming overloaded and reducing wait times. Also, the database could have replicas so that if one instance fails, another can automatically take over.

This way, the system would remain fast during high demand and stay available even in the event of an unexpected failure.

To measure an organization's performance and availability objectives, [**observability**](/freecodecamp.org/observability-in-cloud-native-applications.md) is especially important. This involves generating metrics, logs, and statistics, and managing them with tools like **Prometheus** and **Grafana** to monitor the system and check its availability and performance at any given time.

This analysis and optimization of a storage system is usually performed by the **DBA**, although certain **Software Engineers** and **Data Engineers** may also be involved, optimizing the data pipelines through which various systems exchange information. Regarding availability, **SREs**, Platform Engineers, and Cloud Engineers automate deployments, monitoring, scaling, and implement failover mechanisms.

<VidStack src="youtube/t1HzlKKvJcA" />

---

## Document and Content Management

So far, we've worked with several kinds of data: structured records in tables, [<VPIcon icon="fa-brands fa-youtube"/>semi-structured data](https://youtu.be/bcvt22A_G9Y?si=J3ziItPt5mRCoN5W) such as JSON, and unstructured content such as scans, images, videos, and free-form text.

**Documents** can contain a mix of structured metadata and unstructured content, so they need their own management practices.

A document usually doesn't follow a rigid row-and-column structure, but it can still have metadata such as a title, author, type, date, or tags. Some digital formats also contain an internal hierarchy. A JSON document, for example, uses named fields and nested objects:

```json
{
  "student_id": "ALU-2026-8942",
  "full_name": "Amélie Dubois",
  "master_program": "Master in Artificial Intelligence",
  "campus_distance_km": 18.2,
  "rideshare_benefit_approved": true,
  "last_trip": {
    "date": "2026-03-09",
    "cost_euros": 24.50
  }
}
```

Many digital files combine content with descriptive metadata such as a title, author, or creation date. That metadata makes the content easier to identify, organize, secure, and retrieve. **Document and Content Management** provides the processes and systems for doing this consistently.

Simply placing files in folders isn't enough at organizational scale. Teams need ways to classify documents, describe their content, control access, track versions and retention, and find them later. A basic file system or database can be part of the solution, but a document or content platform adds the management features the organization needs.

For example, the journey of a document in the university systems might be:

1. The candidate's academic record is captured from a form, an email, or any equivalent means.
2. It's indexed and metadata is added to provide context.
3. It's stored in an appropriate repository.
4. Authorized users and systems can access or share it under the applicable controls. For example, an admissions analyst might query approved extracted fields to count candidates with prior study in a subject area without opening every certificate manually.
5. Finally, it's deleted or retained according to applicable policies.

### Unstructured Data

An important part of the data managed by an organization contains [<VPIcon icon="fas fa-globe"/>unstructured information](https://salesforce.com/eu/data/what-is-unstructured-data/). This means that, as mentioned above, its content isn't rigidly structured in clearly identifiable and directly queryable fields. For example, a motivation letter in PDF, a scanned image of a diploma, or a contract may contain information that's difficult to structure.

Documents may have format-specific metadata such as a title or creation date. This helps identify the file but rarely describes everything inside it. The body may contain free-form text, images, tables, or other content that the system must extract or index before it can answer detailed queries.

To perform queries on this information, the system indexes this content or applies techniques like **[<VPIcon icon="iconfont icon-gcp"/>Optical Character Recognition](https://cloud.google.com/use-cases/ocr) (OCR)**, Natural Language Processing, or Intelligent Document Processing.

For example, if the university wants to know how many candidates have taken math-related courses before entering the master's program, it must first extract that information from academic certificates, normalize it, and store it in queryable fields. When extracting data from a document, you should maintain a link to the original document to verify its source later.

After extracting useful content, the system can **index** it in a structure optimized for search. The index may represent a document with fields or **key-value pairs** such as the candidate identifier, document type, courses taken, and subject area.

```json
{
  "index_id": "idx_cert_2026_0042",
  "student_id": "ALU-2026-8942",
  "student_name": "Amélie Dubois",
  "document_type": "Academic Transcript",
  "extracted_subjects": [
    {
      "original_name": "Algèbre Linéaire",
      "normalized_area": "Mathematics",
      "score": "18/20"
    },
    {
      "original_name": "Introduction à Python",
      "normalized_area": "Computer Science",
      "score": "16/20"
    }
  ],
  "metadata": {
    "issuing_country": "France",
    "language": "fr",
    "confidence_score_ocr": 0.98
  },
  "original_file_url": "https://s3.uni.edu/bucket-cert/2026/8942_transcript.pdf"
}
```

For example, above you can see what an indexed document might look like. Originally, it could be an academic certificate of a candidate, but for the system, it's a JSON dictionary with this information, meaning the internal content of the document is organized hierarchically.

Representing it this way makes it much easier to perform queries, as you can navigate and access fields like **score** to see each candidate's grades in the various subjects they've taken at another university.

### Document Capture

The first operational step is **Document Capture**, the controlled process for accepting a document into the organization's systems.

In these processes, it's important to consider the format of the document to be captured, as they're not always digital files. Often, they can be physical documents delivered to an administrative body, which then needs to digitize and upload them to the system.

In any case, assuming a digitized document reaches the data management systems, an adequate capture should perform at least the following actions:

- Validate the file format and size, and ensure it doesn't contain malicious software.
- Assign it an identifier and basic metadata, such as its origin and date of receipt, along with a digital fingerprint like a hash to detect changes in the file.
- Preserve the original and, when necessary, extract a usable representation of its content.

If a document is scanned, its text appears as pixels rather than directly searchable characters. OCR converts visible text into machine-readable text. More advanced **[<VPIcon icon="fa-brands fa-aws"/>Intelligent Document Processing](https://aws.amazon.com/what-is/intelligent-document-processing/) (IDP)** systems can also classify documents and extract fields, tables, and layout using rules and Machine Learning models.

For example, a candidate might upload a photo of a diploma issued in another language from their phone. The capture process would detect the language, extract all the corresponding text using OCR, and associate the file with their application so that the document's content can later be reviewed, knowing to whom it belongs.

### Document Classification

After capture, the system may need to classify the document so it knows what it is and which workflow, access rules, and retention policy apply. People can do this manually, or software can assist with rules and Machine Learning.

In some workflows, the university may let users attach certificates, reports, and other supporting files. The system can't trust the filename or assume that every upload is safe. It must validate the file, scan it according to security policy, and identify the document type before further processing.

A filename alone isn't reliable: <VPIcon icon="fas fa-file-pdf"/>`A.pdf` could contain almost anything. Classification assigns one of the organization's defined document types and determines the next processing steps. Teams may automate low-risk cases and route uncertain or consequential cases to a person for review.

### Content Storage

After capture and classification, the organization stores the original document and its metadata. Object or file storage often holds the binary file, while a document database such as MongoDB, Couchbase, or Amazon DocumentDB may hold flexible metadata or extracted content. The right combination depends on access, retention, search, and scale requirements.

Other alternatives include using a **Document Management System (DMS)** or a platform with **Enterprise Content Management (ECM)** capabilities. These document repositories are based on File or Object Storage internally, with additional capabilities that a bucket or folder alone cannot provide, such as advanced metadata management. Lastly, it's worth mentioning the existence of **Content Management Systems (CMS)**, which are designed for creating and publishing content on websites.

### Search and Retrieval

A document is useful only if authorized users and systems can find it when needed. After storage and indexing, the platform may support several search methods:

- **Metadata search:** Filters by fields such as `document_type = Academic Certificate`.
- **Full-text search:** Finds words or phrases in extracted text and ranks the matching documents.
- **Semantic search:** Retrieves documents by meaning, even when they don't contain the exact words in the query.

For example, an authorized employee could search for a certain teacher's employment contract using keywords like "contract" or the person's name, even if they don't remember the exact file name. Alternatively, with a semantic search like the one we can perform on Google, they can also locate that document or any other based on the meaning of its content.

### Records Management

Not every document has the same value or lifecycle. Teams may discard drafts quickly, while official evidence of an activity or decision must be preserved as a **record**. **Records Management** controls those records throughout their required lifecycle.

Unlike a draft, a record is an official document that must be preserved and kept authentic, complete, and protected. For example, a draft of an admission offer would be disposable, while the accepted and signed offer by the student becomes a record.

Each type of record has an associated **retention period** that determines how long it must be kept and what should be done afterward. If there's an investigation or legal proceeding, a **legal hold** may be applied, temporarily suspending its disposal. At a university, official course records or final academic transcripts might be considered records.

Overall, the most common technologies and roles in document management can be summarized as:

| Document Phase | Key Technologies | Roles |
| --- | --- | --- |
| **Capture** | Azure AI Document Intelligence, Google Document AI, Amazon Textract, Tesseract OCR | **Software and Integration Engineers** implement the capture pipeline, while **ML Engineers** design the data extraction models. |
| **Storage** | OpenText Content Management, MongoDB | **Information Architects** design the logical content structure, while **Platform Engineers and ECM/DMS Admins** implement and operate the storage systems. |
| **Indexing and Search** | Elasticsearch, OpenSearch, Apache Solr | **Information Architects** design the indexing strategy, while **Search and Software Engineers** implement the search engines and queries. |
| **Retention and Maintenance** | Microsoft Purview Records Management, Amazon S3 Object Lock | **Records Managers, Data Owners, and the DPO** define the policies, rules, and compliance requirements, while **Security and Compliance Teams** implement security mechanisms and conduct audits. |

---

## Reference and Master Data Management

Organizations reuse some data across many processes and systems. The same student may appear in the admissions platform, virtual campus, and billing platform. If each system represents that person differently, duplicates and contradictions quickly appear.

**Reference and Master Data Management** coordinates this shared data so systems can use consistent, trusted values.

First, you need to distinguish between:

- **Master Data:** This describes an entity that is relevant and shared by several processes. For example, the record of the student `Amélie Dubois`.
- **Reference Data:** These are allowed values within a classification or organization of the master data. For example, `APPROVED` can represent the status of an accepted enrollment application, with the candidate's record considered master data.

The goal isn't to force every piece of data into one database. It's to identify trusted values and systems of record, define who maintains them, and distribute the right representation to each consumer.

### Master Data

[<VPIcon icon="fa-brands fa-youtube"/>Master Data](https://youtu.be/l83bkKJh1wM?si=-9sCSxMXkAbnQwjj) represents core entities such as people, organizations, places, or products. At a university, it might include students, faculty, and courses. A trusted student record could contain a global identifier, name, and selected contact attributes, while sensitive payment details remain in the systems that need them.

But payment information won't be used in all processes involving these data. This is why authorized data needs to be distributed to each system so that the entire organization has a consistent view of the data, even if it's used differently.

Not all attributes of a record have to come from the same place. A payment platform may maintain its fiscal information, while the student portal keeps the most recent contact email. Then, a **Master Data Management (MDM)** platform would integrate these sources to provide a reliable view to other systems.

Platforms used for this purpose include Reltio, SAP Master Data Governance, and IBM InfoSphere MDM. The role that operates them is the **MDM or Data Architect**, who defines the data model and the architecture used for deployment, while the **MDM Engineer** configures the platform. Data Engineers and Integration Engineers need to be aware of these authorized sources of truth.

### Reference Data

**Reference Data** supplies controlled values used to classify or organize other data. The university might allow a transportation request to have the status `PENDING`, `APPROVED`, or `REJECTED`. If applications use different terms for the same state, integration and reporting become unreliable. These approved status values are Reference Data.

These values usually change infrequently but aren't immutable. This can happen because new values need to be added to the classification, like `CANCELLED`.

To make this modification, a **Data Steward** would document its meaning, while the **Data Owner** of the corresponding data domain approves the change. Subsequently, the **Integration Engineers** are responsible for distributing the new value to the systems that consume it.

### Golden Records

Information about one entity often appears in several systems, with each system storing what it needs. An MDM platform can combine selected trusted attributes into a unified view called a **Golden Record**. The goal is a governed, useful representation, not a copy of every piece of information the organization holds.

For example, the university might have an admissions system where a student's personal data, like the name `Amelie Dubois`, is stored, while their payment information is in a system specialized for processing payments. After verifying they belong to the correct person, they can be linked to provide a single view of the student.

A Golden Record isn't automatically perfect or permanently definitive. It's the best trusted view available under the current matching and survivorship rules.

### Entity Resolution

To build that view, the platform must decide which records refer to the same real-world entity. This task is called **Entity Resolution**.

For example, records named `Amélie Dubois` and `A. Dubois` might refer to the same person, or to different people. A resolution process can compare authorized attributes such as email, phone number, or date of birth and apply deterministic rules or probabilistic matching. Because false matches and missed matches can cause harm, teams should review uncertain cases and provide a way to correct decisions.

This is assigned to the **MDM Engineer**, while the **Data Quality Analyst** analyzes and supervises the results along with a **Data Steward**. It's implemented through the functionalities incorporated in MDM platforms, services like AWS Entity Resolution, or record linkage libraries like Splink.

### Deduplication

Another issue that drives the need for Entity Resolution is the presence of duplicate data. For example, a candidate might register on the virtual campus with one email and later apply for admission using another. If it's confirmed that both records belong to the same person, they should be handled appropriately in each specific scenario.

This process is called **Deduplication** and involves using Entity Resolution to detect and manage repeated records, aiming to prevent them from being treated as independent entities. Common approaches include linking, which retains the records in their original systems and creates a correspondence between their identifiers. Alternatively, merging generates a consolidated record, similar to the Golden Record.

Here, responsibilities are divided among several roles. The **Data Owner** sets the criteria guiding the Deduplication process, the **MDM Engineer** implements these criteria on the platform, and the **Data Quality Analyst**, along with the **Data Steward**, supervises the outcome of the process.

### Survivorship Rules

When several source records refer to the same entity, the MDM process must decide which value to use for each attribute in the Golden Record.

Previously, we saw this with the example of the student name `Amélie Dubois` and `A. Dubois`, values that may appear in several records. Thus, when creating a Golden Record, it will be necessary to decide which one to keep.

For this, there are **Survivorship Rules**, which, as their name suggests, are rules that determine the resolution of these situations based on the data involved.

These criteria are designed by a **Data Owner**, while a **Data Steward** supervises the process and its application, and an **MDM Engineer** implements these rules on a platform.

<VidStack src="youtube/SkZCQ6KZfi0" />

---

## Metadata Management

In the previous section, document metadata helped identify us a file and describe details such as its type or creation date. But metadata applies far beyond documents.

Metadata is data that describes other data. The number 42 is ambiguous by itself. A column name such as `age`, a unit, a definition, and a timestamp can tell you what it represents and how to interpret it.

At organizational scale, metadata needs deliberate management of its own. **Metadata Management** collects, connects, maintains, and publishes metadata so people and systems can find and use data correctly.

The goal is to make data understandable and support governance, quality, security, and discovery. People create some metadata manually, while scanners and integrations can collect technical or operational metadata from systems and files. A **metadata repository** connects these descriptions, and a **data catalog** makes them available to users.

The **CDO** and **Data Governance Council** can set the metadata strategy and governance model. A **Metadata Manager** or **Metadata Engineer** operates the platform, while Data Owners and Data Stewards maintain definitions, ownership, and other domain metadata.

### Business Metadata

Metadata includes more than column names and file properties. **Business Metadata** explains data in the language and rules of the organization.

It includes documented definitions, business rules, ownership, and usage constraints. The university might define an **"Enrolled Student"** as a student with at least one active course enrollment, then specify what "active" means. That definition is business metadata.

The knowledge used to generate the definition is provided by a **Business Analyst**, who, together with a **Data Steward**, turns it into a clear and consistent definition.

### Technical Metadata

**Technical Metadata** describes how systems represent data and where it's located. It includes schemas, data types, table and column names, paths, file formats, keys, and interfaces.

For example, in a catalog, it might indicate that a student's address data is located in a certain table attribute, is textual, and doesn't allow null values. All this information is considered metadata because it describes where the data is and how it's represented.

At this level, **Data Architects** or **Data Modelers** typically define the data representation so that Data Engineers, Analytics Engineers, and Database Administrators can handle its implementation.

### Operational Metadata

**Operational Metadata** records what happens when systems process or use data. It can include job start and end times, row counts, query activity, freshness, status, and failures.

For example, at the university, it might be recorded that the enrollment request pipeline ran at `6:00 AM`, processed `543` students, and completed successfully in 20 seconds.

This metadata is often obtained from orchestrators like Apache Airflow, application logs, and cloud platforms, which are operated by **Data Engineers** and **DataOps** or platform professionals who monitor these executions.

### Data Catalogs

A [<VPIcon icon="fa-brands fa-youtube"/>Data Catalog](https://youtu.be/guw5a6mJwqI?si=g9VVHmpJ-nC3L_Rf) is one of the main systems used to bring these metadata types together.

A Data Catalog is a searchable inventory of the organization's data assets. It usually stores metadata and references to source systems rather than copying all the underlying data. Its main purpose is discovery and understanding, although some catalogs also support access-request and governance workflows.

For example, if an analyst is looking for enrollment records from the past 6 months, the catalog should indicate which database or storage system holds that information, who's responsible for it, other metadata like the name of the system or table where it is located, and the access rules.

Among the most well-known commercial solutions are Collibra, Alation, and Microsoft Purview, often deployed on cloud ecosystems like AWS Glue Data Catalog and Google Cloud Knowledge Catalog. Management is handled by the **Metadata Manager** or **Metadata Engineer**, who administers this platform.

### Business Glossaries

A [<VPIcon icon="fa-brands fa-youtube"/>Business Glossary](https://youtu.be/6BYXcApCCzg?si=U6_5PXcFsdXSoZVy) is a controlled vocabulary that establishes the official meaning of the organization's concepts. It shouldn't be confused with a **data dictionary**: the dictionary describes tables and columns of a specific system, while the glossary defines business concepts that may be implemented in many systems.

For example, the term *Completed Trip* might mean a trip that has reached its destination and whose billing has been validated. This definition prevents the mobility area from considering a trip complete when the journey ends, while finance only does so when the invoice is received. The term should include its definition, synonyms, rules, related concepts, owner, steward, and approval status.

A business expert or Business Analyst proposes the term, the **Data Steward** reviews its clarity and potential conflicts, and the **Data Owner** approves its use. The glossary can start as a simple document, but as it grows, you should manage it within the data catalog to link each term with its columns, rules, reports, and policies.

### Data Lineage

[<VPIcon icon="iconfont icon-gcp"/>Data Lineage](https://cloud.google.com/discover/what-is-data-lineage) describes where data came from, how it moved, which transformations changed it, and where it's consumed.

At the university, lineage could show that an address enters through an application, passes to a geographic API, produces a route distance, and contributes to a mobility-eligibility decision. A separate operational flow may then share only the minimum trip details with the transportation provider. This metadata helps teams assess the impact of changes, investigate errors, and demonstrate how a result was produced.

![Example of data lineage in the use case. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/315b3639-d1dd-4ffb-9e30-53f355820ac8.png)

**Data Engineers**, **Analytics Engineers**, and **Metadata Engineers** help capture lineage through tools such as dbt, OpenLineage, or Apache Atlas. Automation can collect lineage from supported systems and generate visual paths from sources to dashboards, but teams still need to validate gaps, semantics, and manually implemented processes.

### Metadata Standards

Metadata also needs standards, quality controls, and governance. **Metadata Standards** define how teams document, represent, and exchange it.

The goal is to help people and systems locate, understand, integrate, and exchange data consistently. ISO-8601 is a data representation standard for dates and times. Within an organization, **snake_case** might be a metadata naming convention, while a defined JSON schema could standardize how a tool exchanges metadata.

Among the most notable external standards are the [<VPIcon icon="fa-brands fa-wikipedia-w"/>ISO/IEC 11179](https://en.wikipedia.org/wiki/ISO/IEC_11179) family, used in metadata registries, and the [<VPIcon icon="fas fa-globe"/>Dublin Core](https://dublincore.org/) for describing all types of digital resources. The responsibility for applying these standards falls on the **Data Architect** and the **Metadata Manager**, who select the standards.

### Metadata Quality

Like other data, metadata should meet defined criteria for accuracy, completeness, consistency, and freshness.

Poor metadata can undermine governance and processing because users may interpret otherwise correct data incorrectly. If a catalog says that distance is measured in kilometers while a system stores meters, for example, downstream calculations can be wrong.

Teams can measure metadata quality through checks for completeness, validity, consistency, and freshness. Lineage then helps them see which downstream assets a bad definition or missing field could affect. A **Metadata Manager**, Data Steward, and Data Quality Analyst may share this work.

### Metadata Governance

**Metadata Governance** defines who can create, approve, change, and retire metadata. Metadata has its own lifecycle, and a controlled process keeps definitions from changing in production without the right review.

For example, if a data analyst proposes changing the description of the concept **"distance to campus"** to specify that it will now be measured in meters instead of kilometers, they can't modify that definition directly. Governance requires that this proposal first go through the Data Steward to ensure the new wording is clear and consistent with the rest of the glossary, and then be validated by the corresponding Data Owner.

Only after this approval process is the metadata officially updated in production, preventing uncontrolled changes from causing unnecessary failures.

Although the responsibility usually falls on the **Data Steward** and the **Data Owners**, this assignment isn't universal. At the executive level, the CDO and the Data Governance Council establish the general policies that guide how governance should be conducted in the organization.

<VidStack src="youtube/KkC1Bj3Kt5k" />

---

## Data Integration and Interoperability

Most organizations don't keep all their data in one system. They use several systems for different jobs, so those systems need reliable ways to exchange and combine information.

[<VPIcon icon="fa-brands fa-youtube"/>Data Integration and Interoperability](https://youtu.be/65bgnTD_xj4?si=UGx7vp3RlaIvdvgq) addresses that need. **Interoperability** means systems can exchange data and interpret it consistently, while integration combines or connects data for a particular use.

Because each system holds only part of the picture, data [<VPIcon icon="iconfont icon-gcp"/>integration](https://cloud.google.com/learn/what-is-data-integration) gathers or virtually connects information from different sources to provide the view a consumer needs.

The goal is to make the right data available in the right place, format, and time. One requirement is **latency**: the delay between data being created or requested and becoming available to the consumer. The portal may need current taxi availability within seconds, while a monthly cost dashboard can refresh overnight. Integration must also be secure, observable, and auditable.

For example, university systems must agree on the meaning and unit of "distance to campus" or declare a reliable conversion. Without that shared contract, a value in kilometers can be mistaken for meters and cause serious errors.

Once interoperability is ensured, the data can be integrated to generate, for example, dashboards. At the university, data can be obtained from different systems, such as a database with transportation service records and a payment platform, to ultimately generate a dashboard that shows statistics of the cost of that service over a period of time.

**Data Architects** define interoperability principles and shared patterns. **Data Engineers** and **Integration Engineers** design and build ingestion, mappings, and exchanges. Platform Engineering, DataOps, and SRE teams help deploy, monitor, and recover the supporting services.

### Data Ingestion

**Data Ingestion** moves data from a source into a target environment for storage or processing. The target may keep the data temporarily or persistently.

Sources can include databases, APIs, files, applications, and event streams. Destinations can include operational systems, queues, Data Warehouses, Data Lakes, and other platforms. In a **push** pattern, the source sends data, while in a **pull** pattern, the destination or connector requests it.

It's also important to mention that there's a distinction in different types of integration depending on whether the data is inserted into a system or queried "directly" from its sources.

One type is **physical integration**, where data is extracted and stored in a common destination using ETL or ELT processes. For example, the university could load travel and payment records into a Data Warehouse every night using Apache Airflow, Apache Spark, or Azure Data Factory to later generate a cost dashboard.

On the other hand, **virtual integration** allows querying different sources without having to store their information in a destination environment, as if the sources formed a single system for querying. In this way, the university could combine the travel database and the payment platform in a single query using technologies like Denodo, obtaining integrated data.

Virtual integration doesn't normally persist a separate consolidated copy, although query engines may cache or process data temporarily. Ingestion, by contrast, deliberately moves data into another environment, where further transformations may follow.

For example, the university might want to analyze whether the free taxi service is actually improving attendance at in-person classes. To do this, it **integrates** data from sources that record travel logs and student attendance, which are likely in different systems. In this process, the sources are queried, and the data is ingested into a Data Warehouse where it's analyzed.

Technologies used for ingestion include Apache NiFi and Kafka Connect, as well as tools like AWS Database Migration Service or Azure Data Factory. The choice depends on the source, destination, volume, frequency, security, and interoperability requirements. A **Data Engineer** usually designs and implements the ingestion process with the relevant source and platform teams.

### Batch Integration

After defining the sources and destination, the team decides when ingestion and processing should run. The answer depends on how fresh the consumer needs the data to be.

In **Batch Integration**, the system collects and processes groups of records on a schedule or trigger. This approach is often simpler and more cost-efficient when consumers don't need real-time results, although teams still need to manage the concentrated load that a batch can place on source and destination systems.

For example, the university might load completed trips and payments into a Data Warehouse each night to update the transportation service cost dashboard. The process would extract the data, temporarily store it in a staging area, apply the necessary transformations, and load it into the destination. If the frequency is somewhat higher, the batches are called **micro-batches**, as they contain less data, though the process is exactly the same.

This type of integration is implemented with technologies like Apache Airflow, Apache Spark, AWS Glue, or Azure Data Factory, primarily used by **Data Engineers**. Additionally, the integration's operation is supervised and monitored by **DataOps or Platform Engineering** professionals.

<VidStack src="youtube/IELMSD2kdmk" />

### Streaming Integration

When consumers need lower latency, **Streaming Integration** processes events continuously or soon after sources produce them. Instead of waiting for a large scheduled batch, producers publish events that enter ingestion and processing as they arrive.

For example, a transportation company might publish real-time events indicating that a trip has been requested, accepted, started, completed, or canceled, allowing the student portal to be updated immediately.

These events are typically distributed through platforms like Apache Kafka, Apache Pulsar, or Amazon Kinesis, while Apache Flink or Spark Structured Streaming enable filtering, transforming, aggregating, and finally integrating them.

Here, the most important role remains the Data Engineer, although the more specialized role of **Streaming Engineer** emerges, capable of ensuring these processes run with the necessary low latency.

::: info

<SiteInfo
  name="Batch vs. streaming data processing in Databricks | Databricks on AWS"
  desc="Batch processing reprocesses all available source data; streaming processing tracks and processes only new data. Compare the two semantics and when to use each in Databricks."
  url="https://docs.databricks.com/aws/en/data-engineering/batch-vs-streaming/"
  logo="https://docs.databricks.com/aws/en/favicon.ico"
  preview="https://docs.databricks.com/aws/en/img/og-image.png"/>

:::

### API-Based Integration

Internal and external systems often expose data or operations through an API instead of direct database access.

An [<VPIcon icon="fa-brands fa-youtube"/>Application Programming Interface](https://youtu.be/6STSHbdXQWI?si=m1r71R_cDfgDyIBU) **(API)** is a contract through which one system exposes selected data or operations without revealing its internal implementation. You can think of it as a defined set of calls or resources that other software may use.

The university might send a text address to a geographic API and receive coordinates. When a student requests transportation, an internal API could accept an authenticated student identifier and return an eligibility result without exposing the underlying academic record.

Some data platforms expose controlled query APIs, but public services should avoid accepting unrestricted SQL from clients. The API contract should expose only the operations and data that the consumer is authorized to use.

Technologically, the most common practice is to use an API via the HTTP protocol, exchanging data in JSON format and following a REST style, although there are alternatives like gRPC, GraphQL, or SOAP. Regardless of the implementation technology, the API must clearly define its contract, which can be documented using OpenAPI or AsyncAPI.

APIs are usually designed and implemented by a **Backend Engineer** or **API Engineer**, while an integration is designed by an **Integration Architect**, regardless of whether the sources are accessed through an API or not.

### ETL and ELT

If we focus on the ingestion process, data must be extracted from a source and inserted into another system. But the target system usually has a different schema than the sources. Each source stores data in a specific organization to solve a problem, while the target system structures data differently, mainly because it integrates information from multiple sources.

For example, a data source might store records with some student information **(name, date of birth, email)**, while the target system where integration is intended stores records with that information along with each student's payment data, possibly changing some fields **(name, age, card number)**. This means student records need to be transformed, such as calculating age from the date of birth.

Real integrations usually need more transformations because source and target structures differ. The boundary isn't always strict: teams may transform data for compatibility, quality, privacy, enrichment, or later analysis at several stages of the flow.

In summary, the transformations referred to here constitute what's known as **[<VPIcon icon="fa-brands fa-aws"/>Extract, Transform, and Load](https://aws.amazon.com/what-is/etl/) (ETL)**. Basically, it's a process consisting of a series of steps where data is selected and extracted from a source, transformed to fit the target data model, and loaded.

In the previous example, the only step needed would be converting the date of birth into an age, assuming the data types of the other fields match.

An ETL is suitable when you need to strictly control the information before it enters the destination. But there's also **[<VPIcon icon="iconfont icon-databricks"/>Extract, Load, and Transform](https://databricks.com/blog/what-is-elt) (ELT)**, which first loads the data into the target system and then transforms it once loaded. This approach is common in cloud Data Warehouses and Lakehouses because it allows for preserving an original version and reusing it for various purposes.

For example, with ELT, the university could load authorized student records and [<VPIcon icon="fa-brands fa-wikipedia-w"/>raw](https://en.wikipedia.org/wiki/Raw_data) provider transaction references into a protected Data Lake before applying analytical transformations. It shouldn't copy full card details or bypass security checks simply because the layer is "raw." Keeping source-like data can support reprocessing, but retention, minimization, and access policies still apply.

Teams can implement these processes with Apache Spark, AWS Glue, and Azure Data Factory. Data Engineers usually design the end-to-end flow, while **Analytics Engineers** often define transformations inside the analytical platform.

### Data Exchange Standards

As you've just seen, the differences between source and destination models require transformations.

To reduce the number of transformations needed for integration, there are **Data Exchange Standards**, which are common rules about the structure, format, and meaning of the data. Their goal is to encourage, whenever possible, the use of a "unique" or common structure so that all systems structure the data as similarly as possible, avoiding transformations when exchanged.

For example, the university could define an exchange model with fields such as **(student_id, name, date_of_birth, email)**, along with their formats and semantics. If a consumer needs age, the contract should define the date on which it's calculated so the value doesn't become ambiguous. **Data Exchange Standards** don't have to dictate internal storage. They define the representation used at the boundary.

These rules can be grouped into what's known as a **Canonical Data Model**, documented with OpenAPI or AsyncAPI, among other tools. The responsibility for their definition falls on a **Data Architect** or **Data Modeler**, while a Data Engineer or Integration Engineer is the one who ultimately implements the application of these rules in various systems.

### Schema Management

Many systems use a schema that defines field names, types, and constraints. A student record might begin as **(name, date_of_birth, email)** and later gain a phone field. Schemas therefore evolve as requirements change.

[<VPIcon icon="iconfont icon-gcp"/>Schema Management](https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/schema-registry/schema-lifecycle) versions and governs those changes so producers and consumers can coordinate safely. [<VPIcon icon="fa-brands fa-youtube"/>Compatibility](https://youtu.be/vQ4mPepAM7Q?si=lgmDoIIWeXHO60mO) policies state which changes a system can accept without breaking existing data or consumers.

Here, we can make a distinction between **backward compatibility** and **forward compatibility**. Backward compatibility refers to the ability of a system using a new schema to correctly read or process data saved or emitted with an old schema. Forward compatibility refers to the ability of a system to use an old schema to read, process *(or at least safely ignore)* data saved or emitted with a new schema without causing errors. In this context, the ideal is to achieve complete compatibility in both directions.

Teams can express schemas with JSON Schema, Apache Avro, Protocol Buffers, and similar technologies, then version compatible formats in Confluent Schema Registry or AWS Glue Schema Registry. Data Architects and Data Modelers define the shared approach with the engineers who produce and consume the data.

<VidStack src="youtube/3_12AZ0CEeo" />

---

## Data Quality

Integration can combine data from several sources, but a technically successful integration doesn't guarantee useful results. The output may still contain missing values, incomplete records, contradictions, or duplicates that affect its intended use.

[<VPIcon icon="iconfont icon-ibm"/>Data Quality](https://ibm.com/think/topics/data-quality) is the capability that measures and improves whether data is [<VPIcon icon="fas fa-globe"/>fit for purpose](https://pmc.ncbi.nlm.nih.gov/articles/PMC9299818/), in other words, suitable for its intended use.

Quality isn't an absolute label that makes data perfect for every situation. It depends on the intended use. A city of residence may be enough for aggregate demographic statistics but not enough to arrange a pickup. Data should meet measurable requirements for the task at hand.

Generally, the responsibility for maintaining data quality doesn't fall on a single person. Typically, a **Data Quality Manager**, along with **Data Owners**, evaluates which data is most critical for an organization, the impact of potential errors, and what level of quality is acceptable.

Then, a **Data Quality Analyst** analyzes and monitors data practically to ensure its quality, while **Data Engineers** and development teams implement necessary processes to achieve the required quality. These people don't use specific technologies to manage data quality but rely on other technologies like SQL.

### Data Quality Dimensions

Data quality is a measurable property through Data Quality Dimensions, which are observable characteristics of the data. Each one addresses a different question about the data and can apply to a single piece of data or an entire record:

- **Accuracy:** Checks if the data correctly represents reality.
  - *Example:* A student's address is accurate if it matches their real address. Otherwise, it doesn't correctly reflect reality.
- **Completeness:** Checks if all necessary data for a specific use is present.
  - *Example:* Imagine a registration form requires a name, surname, and phone number, and the user doesn't provide their phone number, or that data is lost. The registration record would be **incomplete** if finalized, as the phone field would be null.
- **Uniqueness:** Ensures a piece of data or record doesn't appear more than once.
  - *Example:* When a student enrolls in a university, the database should have one record with their data, not a duplicate, unless design reasons require it.
- **Consistency:** Ensures different representations of data don't contradict each other.
  - *Example:* If a student's email or phone number must be present in multiple places across one or more systems, its value must be the same. It can't appear as one email in one place and a different email elsewhere for the same student. That wouldn't be consistent.
- **Timeliness:** Checks if the data is updated and available when needed.
  - *Example*: When a student requests a taxi, they should be able to get their real-time location data, available and updated with low latency for use.
- **Validity:** Ensures the data respects defined type, format, range, and constraints.
  - *Example:* If a registration request status can be `ACCEPTED` or `REJECTED`, those field values can't be different and must be stored in the defined format. Otherwise, they wouldn't be valid according to defined constraints and business rules.

These dimensions are interrelated, and in practice, some may be more critical for data use. For example, timeliness is crucial when a student requests a taxi, as they expect to see their real-time location immediately. Meanwhile, uniqueness is key for financial data, as a payment record can't exist multiple times, which would be a particularly severe error.

### Data Profiling

[<VPIcon icon="fa-brands fa-youtube"/>Data Profiling](https://youtu.be/HtaYjVwW-Mo?si=pIW24OtUnEBBqYhD) helps a team understand the current state of a dataset. It inspects structure and content, calculates statistics, and looks for patterns or anomalies. A profile might report null percentages, distinct counts, minimum and maximum values, type patterns, and relationships between fields.

For example, if the university keeps a table with students' personal data, it could be checked that names are stored in a text field, not numeric, or that no record has null values, among other more complex checks.

Relationships between columns and tables can also be analyzed in a relational database, allowing verification that all enrollments are associated with an existing person and subject, as otherwise there would be incomplete and inconsistent data.

Profiling alone can't tell you whether the data is fit for a purpose. A null may be a defect in one field and valid in another. A **Data Quality Analyst** therefore interprets the profile with Data Stewards and domain experts, using tools such as SQL, pandas, or Apache Spark according to the platform and volume.

### Data Quality Rules

**Data Quality Rules** turn requirements into specific, measurable conditions. They help a team detect when data is unsuitable for an intended use and decide what should happen next.

Profiling discovers what the data looks like, while rules state what acceptable data must look like. Examples include:

- The student's contact email can't be empty and must match the organization's accepted email format.
- The distance to the campus must be a decimal number greater than zero.
- The same taxi ride can't be recorded twice. The student's charge may be zero, while the provider cost must be recorded in the authorized finance system so the university can manage its budget.

The rules are actually treated as a type of metadata, so they must be documented and versioned accordingly. The **Data Steward** and **Data Owners** design and validate them based on their business sense, while the **Data Quality Analyst** and **Data Engineer** turn them into executable checks. Finally, the rules are expressed in the appropriate technology, such as a [<VPIcon icon="fa-brands fa-wikipedia-w"/>query language](https://en.wikipedia.org/wiki/Query_language) (SQL, Cypher, and so on).

### Data Validation

[<VPIcon icon="iconfont icon-ibm"/>Data Validation](https://ibm.com/think/topics/data-validation) executes rules to decide whether data meets established requirements. Unlike profiling, which explores the data's current state, validation compares values and records with explicit conditions.

The enrollment form may require a student's name, but the API and database should still validate it because client-side checks can be bypassed and data can fail in transit. A relational database can enforce conditions with `NOT NULL`, `UNIQUE`, `CHECK`, foreign keys, and other controls. Application and pipeline checks can handle rules that span systems or require more context.

Data Quality Analysts help define and evaluate these checks, while Data Engineers, Software Engineers, Analytics Engineers, and database specialists implement them at the right layers.

### Data Cleansing

Validation may show that all records meet the rules. When some fail, the team needs a defined response: reject, quarantine, correct, enrich, or accept the record with a documented exception.

**Data Cleansing** detects and corrects known defects so data can meet its requirements. The right transformation depends on the field, the rule, and whether the team can determine the correct value safely. For example:

- To avoid inconsistencies, a rule might specify that names shouldn't contain spaces at the beginning or end. So, if a name like `' Chloé Moreau '` appears, the rule would determine that the data isn't suitable, and it could be transformed by removing the extra spaces to restore its quality.
- Another rule might require that all dates use the format `YYYY-MM-DD`. Thus, if a date like `'15/09/2025'` appears, the data wouldn't comply with the rule, but it could be transformed to `'2025-09-15'` to fit the defined format.

Depending on the data, the rule, and the problem it presents, some transformations can be performed automatically, while others may require more supervision to be done correctly. For instance, spaces in a name can be easily detected and removed, but other issues may be more complex and require manual transformation.

Data Engineers, Analytics Engineers, application teams, or operational staff may perform cleansing, while the Data Quality Analyst and Data Steward validate the approach. The process should preserve enough traceability to explain what changed and why. Cleaning a symptom doesn't replace fixing the source of the defect.

### Data Quality Monitoring

Validation shouldn't happen only when data first enters a system. **Data Quality Monitoring** runs relevant rules and measurements over time, stores the results, and alerts teams when quality degrades.

For example, the university can schedule the automatic execution of quality rules on student data every night. The system would check conditions such as complete addresses, non-negative distances to the campus, and valid date formats. These results can be stored and displayed on a dashboard, allowing for the detection of trends like a sudden increase in negative distance values after an update. This way, the team responsible for the change can quickly identify and correct the problem's origin.

These periodic evaluations are carried out with AWS Glue Data Quality or Microsoft Purview, among other technologies maintained by Data Engineers and DataOps teams.

### Issue Management

When a quality problem appears, **Issue Management** records, prioritizes, investigates, and resolves it. Priority depends on the impact on people, decisions, compliance, and business processes, not only on the number of bad rows.

For example, if due to some error, all distances start showing as negative and students are denied access to transportation services, it impacts the user experience and could have more serious consequences if a student can't attend an important exam. So issues must be managed as quickly as possible.

Generally, this management follows these phases:

1. **Registration and classification:** When a rule is violated, the incident is documented, including its severity and who is responsible for the affected rule or data domain.
2. **Containment:** Depending on the severity or impact of the quality loss, measures are taken to prevent that impact from materializing. For example, if a rule states that payment records must not be duplicated and duplications are detected, the measure might be to temporarily block all payments until the issue is resolved.
3. **Analysis:** Data lineage is used to debug processes and locate the cause of the problem.
4. **Correction:** Once the cause is identified, the problem is corrected, and the rules are re-executed, validating and documenting the resolution.

If duplicate payment records appear, a **Data Quality Analyst** may detect and coordinate the issue, the Data Owner sets the business priority, and a Data Engineer or application team fixes the technical cause. Finance and compliance teams may also need to verify the correction.

In short, quality dimensions define what matters for a use case. Profiling shows the current state, rules formalize expectations, validation tests them, cleansing handles suitable corrections, and monitoring detects changes. Issue Management then coordinates the response when a problem reaches production.

<VidStack src="youtube/5HcDJ8e9NwY" />

---

## Data Engineering

We've discussed systems that store, exchange, protect, and validate data. Now we can look at how teams build the ingestion processes, pipelines, and transformations that connect those systems in practice.

[<VPIcon icon="iconfont icon-databricks"/>Data Engineering](https://databricks.com/blog/what-is-data-engineering) designs, builds, and operates the processes and components that collect and prepare data. It moves data from one or more sources into the systems where people and applications need it, including platforms such as Data Warehouses and Data Lakes.

Data Engineering works across architecture, storage, integration, and quality, although it doesn't replace those disciplines. That overlap is why Data Engineers have appeared in many earlier sections.

The implementation may be as small as a scheduled SQL transformation or as large as a distributed streaming pipeline. In either case, Data Engineering manages dependencies, automates repeatable work, tests changes, and monitors execution.

The goal is to let other professionals use trustworthy data without rebuilding the whole path back to every source.

For example, imagine the university wants to create a dashboard for the management team to analyze the monthly cost of the transportation service. To do this, it's not enough to query a single database, as travel data might be in one database while cost or payment information might be with the transportation company.

Additionally, each source updates at a different frequency and uses its own schema, so Data Engineering here would serve to build a process that performs steps such as:

1. **Extract** data from each source.
2. **Validate** its quality through rules.
3. Apply the required **transformations**, including cleansing defects and standardizing dates, units, and identifiers.
4. **Insert** them into a target system, such as a Data Warehouse, Data Lake, or similar.
5. Once inserted, they may need to be **aggregated** or processed as required for later use.

The [<VPIcon icon="fa-brands fa-youtube"/>Data Engineer](https://youtu.be/_-DzZeixu0w?si=nXc6z6s0TA-blHPb) designs and implements these processes with Data Architects, Data Stewards, and Data Quality Analysts. Together, they make sure the solution meets its technical and organizational requirements. Analytics Engineers, Data Analysts, Data Scientists, applications, and other consumers use the results.

And if the infrastructure is large enough, other professionals like **Data Platform Engineers**, **DevOps Engineers**, and **Site Reliability Engineers (SRE)** may be involved to assist in its operation.

<VidStack src="youtube/0Hd5vYqin7w" />

### Data Pipelines

A **Data Pipeline** is a sequence of automated tasks that moves and processes data from one or more sources to one or more targets. A task may read, validate, transform, route, or write data, then pass a result to another task.

At the university, a pipeline might extract authorized transaction references, trip records, and enrollment data, transform them into a common target schema, and load them into a Data Warehouse. Analysts can then use the curated result for reports and dashboards.

A pipeline can run in batch or streaming mode. A full load reads the complete selected dataset, while an incremental load processes records that are new or changed since a known point. One valuable design property is [<VPIcon icon="fas fa-globe"/>idempotence](https://prefect.io/blog/the-importance-of-idempotent-data-pipelines-for-resilience): safely repeating the same input or run shouldn't create unintended duplicates or inconsistent results.

Other significant properties include scalability, so a large volume of data doesn't compromise execution viability, and traceability to know when it's executed and the results it produces.

Pipelines are usually designed and implemented by a Data Engineer, but sometimes Integration Engineers or Analytics Engineers assist, depending on the final use of the data.

The technologies used for implementation vary greatly depending on the infrastructure. A pipeline may include queries in SPARQL, SQL, transformations done in Python, Apache Spark, or Apache Flink, and even use cloud services like Google Cloud Dataflow.

### Pipeline Orchestration

After defining a pipeline's tasks, inputs, outputs, sources, and targets, you need to coordinate their dependencies. That coordination is **orchestration**.

For example, imagine a pipeline where student and travel data is obtained first, followed by payment data, and these are to be inserted into a Data Warehouse that only accepts records with both payment information and personal data of a student. With these requirements, data from all sources must be obtained before insertion, as they need to be combined. This might not be the case in other pipelines where information from each source can be inserted as it's obtained.

These dependencies in a pipeline are commonly represented with a **Directed Acyclic Graph (DAG)** where each node is a task and each connection indicates a dependency. It can also serve as an internal data structure for orchestration software to precisely decide when a task is ready to execute and what should happen based on its result.

Among the most commonly used technologies for orchestration are Apache Airflow, Dagster, and Prefect, as well as cloud services like Azure Data Factory, AWS Step Functions, or Google Cloud Composer.

### Data Transformation

Many pipeline tasks transform the structure, representation, or content of data so a later consumer can use it.

Transformations can be simple, like converting kilometers to meters, normalizing a date to a common format, or renaming a field. Others are more complex or follow more abstract business rules, such as linking taxi routes with academic schedules to automatically validate if a trip coincides with a mandatory in-person class, thus detecting improper use of the service or any issues. Some transformations may also involve filtering, removing duplicates, or aggregating data.

When data transformations are performed, the data transitions from being newly obtained from a source to being ready for use. Here, we can establish a classification based on the level of transformation the data has undergone:

- **Raw:** Data kept close to the source representation. For example, a provider supplies the date string `05/03/2026`, whose intended day/month order must be documented.
- **Staging:** Data is validated and standardized for further processing. Once the source meaning is known, the date could become the unambiguous ISO value `2026-03-05`.
- **Curated:** At this level, the data is enriched, combined with other data, and considered ready for final use. For example, assuming the previous date corresponds to a trip, it can be combined with other data to create a record of that trip enriched with payment information.

Transformations focus on converting raw data into staging and curated data. Technically, implementation can be done using various technologies depending on the systems involved and company decisions. Primarily, you'll use languages like Python, R, SQL, or frameworks like Apache Spark.

### Workflow Automation

A pipeline may also check source availability, validate quality, manage approvals, and send notifications. **Workflow Automation** coordinates these actions in the required order so repeatable work doesn't depend on someone running every step by hand.

It's important to differentiate between the pipeline and the workflow. The pipeline describes the path of the data and its transformations. On the other hand, the workflow includes tasks that don't directly transform the data but are essential for the execution of a pipeline.

For example, when the university receives a file from the transportation company, the workflow can validate its format, monitor the pipeline execution, and update data lineage tools.

But automating a workflow doesn't always mean eliminating human intervention. For instance, a rule might be set to detect if personal data appears in a source when it shouldn't. If this rule detects personal data, a Data Steward intervenes to approve the change or reject it and take appropriate action.

Finally, workflows are implemented using orchestrators like Apache Airflow, Dagster, or Prefect, along with CI/CD systems and incident management tools.

### Data Testing

When automating the execution of a pipeline, even if manual oversight isn't completely eliminated, much of the process will run with the possibility of errors in its implementation. Even with a perfect implementation, errors can occur that affect the data and cause failures in the pipeline tasks.

**Data Testing** checks both transformation code and the data moving through the pipeline so teams can catch defects before they affect consumers.

The test suite should cover realistic ways that code, schemas, data, dependencies, and infrastructure can fail. Data tests and Data Quality rules overlap, but teams may apply them for different reasons.

A quality rule expresses a business or fitness requirement, while a pipeline test may verify a technical precondition or expected transformation. The same check can serve both purposes.

Common test types include:

- **Unit tests:** These verify that the code for a transformation is correct given certain inputs and the respective outputs it should produce. For example, if a transformation converts a distance from kilometers to meters, it could be tested with inputs `18`, `4`, `6` and outputs `18000`, `4000`, `6000`.
- **Schema tests:** These are performed on the data to ensure its structure and format are suitable for a specific task. For instance, when receiving a student's age stored as the number `42`, a schema test would verify that this data is of integer type.
- **Integration tests:** These check that various components of an architecture or system can interact as expected. For example, an integration test might verify that a university's Data Warehouse can receive data from an academic database.
- **End-to-end tests:** These involve executing the entire pipeline to ensure the result is correct given initial data.
- **Reconciliation tests:** Compare counts, totals, or control values across stages. If a documented filter should retain 50 of 100 input records, the test verifies both the output count and the reason for the exclusions.
- **Performance tests:** Given the complexity of some pipelines, performance tests are conducted to evaluate if their execution is feasible within a certain time and with available resources.

At the university, before deploying a pipeline, datasets with fictional information, also known as synthetic datasets, could be constructed for use in testing. This way, all these types of tests could be executed to verify that tasks are performed correctly, data has the expected properties after each transformation, and the process is completed within a specified time.

The test technology follows the pipeline. A Python transformation could use **pytest**, while SQL can support reconciliation and schema checks. Data Engineers own most pipeline tests, and Platform or DevOps Engineers help integrate them into automated delivery and runtime environments.

<VidStack src="youtube/cHYq1MRoyI0" />

### Data Versioning

Data pipelines generally undergo changes due to modifications in business requirements, changes in sources, or other reasons. So it's essential to maintain a history of what has happened with a pipeline over time, allowing you to track its evolution up to a specific point, primarily to facilitate error debugging.

**Data Versioning** keeps a history of the assets needed to reproduce a result. Depending on the use case, this can include transformation code, schemas, configuration, reference data, model inputs, and snapshots or versions of the dataset itself.

For example, imagine a report states that $10,000 was spent on taxis in a month, but upon checking later, the system says the amount was $8,000 for the same month. This discrepancy could be due to an error or a change in the policies used to calculate that cost, such as no longer counting canceled trips.

To determine if this situation is an error, versioning allows access to previous versions of the pipelines involved in that calculation to see how the figure was obtained.

Teams commonly use Git for code, configuration, and text-based schemas. Table formats such as Apache Iceberg, Delta Lake, and Apache Hudi can preserve data snapshots and change history for supported tables. Reproducibility may require both.

### Data Platform Operations

Once implemented and versioned, a pipeline needs an infrastructure to run on, which refers to hardware that can be on university servers or in the cloud. It may require storage for data, computing capacity for transformations, an orchestrator to coordinate tasks, and specialized systems to ensure data and process security. These components together form a [<VPIcon icon="iconfont icon-mongodb"/>Data Platform](https://mongodb.com/resources/basics/what-is-a-data-platform), which is the technological environment where pipelines and other processes are executed.

The platform itself must be managed and maintained, as it's not a system that operates completely autonomously but requires supervision. This management process is known as **Data Platform Operations** and encompasses a series of tasks aimed at ensuring the platform is ready to execute pipelines securely, stably, and efficiently.

Some of the most fundamental tasks are:

- **Provisioning and scaling of resources:** The number of machines needed by databases and platform components at any given time is configured.
- **Environment management and isolation:** Reserved environments are created for testing, development, and production, with the latter providing services to the end user.
- **Permission management:** Permissions are determined for each professional to perform their tasks, preventing security breaches.
- **Cost control and optimization:** Resource consumption is monitored to avoid overspending, aiming to provide the service with minimal consumption.

For example, a pipeline that calculates the monthly cost of taxi usage might need to connect to a transportation company's API, transform the data, and store it in a Data Warehouse.

To achieve this, the platform must provide the necessary computing resources to perform the transformations, store the data, and allow a secure connection with the API. Thus, proper platform management is critical to ensure the pipeline runs correctly.

A **Data Platform Engineer** commonly leads this work and understands the services on which the platform runs, such as AWS, Azure, Google Cloud, Databricks, or Snowflake. Docker packages suitable workloads, Kubernetes can orchestrate containers when the complexity justifies it, and Terraform defines infrastructure as code. Infrastructure as code improves repeatability, but it doesn't make services automatically portable between cloud providers.

### Data Observability

Data platforms can fail in subtle ways even when every job reports success. **Data Observability** helps teams understand the health of data and the systems that produce it so they can detect, investigate, and reduce the impact of failures.

Observability lets you infer a system's state from the signals it produces. In a data context, those signals include freshness, volume, schema, distribution, quality results, lineage, job status, logs, metrics, and traces.

Monitoring checks known conditions, such as whether a job completed and whether freshness or volume stayed within expected limits. Infrastructure signals such as CPU and memory can help explain failures, while data-level signals show whether consumers received the right output.

For example, if a data pipeline produces dozens of records when it should produce hundreds, monitoring allows you to detect these changes in results,. It can also show other relevant metrics obtained at those same moments, such as the CPU usage of each task involved in the pipeline, helping you detect if any tasks are failing and preventing data from propagating to the end.

For observability to guide action, teams can define **Service Level Indicators (SLIs)** for relevant properties and **Service Level Objectives (SLOs)** for the expected level. An SLI might measure the age of the latest attendance data, while the SLO could state that 99% of daily updates must be available by 7:00 AM. An alert tells the team when the pipeline risks missing that commitment.

The most well-known technologies in observability are Prometheus and Grafana, frequently used to collect and visualize metrics. There are also OpenTelemetry for managing telemetry data and logs, and OpenLineage for monitoring data lineage in real time.

Here, a **Data Engineer** might be responsible for implementing the appropriate observability mechanisms. But they don't always do it alone, as an SRE, Platform Engineer, or DataOps team may collaborate in maintaining these mechanisms.

### Data Contracts

Observability helps detect errors such as failed jobs, stale data, abnormal volumes, and unexpected schema changes. If a taxi provider changes geographic coordinates from numbers to text without notice, for example, downstream processes may fail even though the network connection still works.

[<VPIcon icon="iconfont icon-ibm"/>Data Contracts](https://ibm.com/think/topics/data-contract) reduce this risk by making expectations between producers and consumers explicit. They define the structure and characteristics of the data, along with how teams communicate and version changes. Observability still verifies the contract in operation.

More specifically, a Data Contract can define schema, types, formats, semantics, quality rules, ownership, delivery frequency, latency, and change-management expectations.

For example, the transportation company might agree that each trip event includes **(trip_id, student_reference, provider_vehicle_id, price, origin, destination)**. The contract could define `price` in euros and coordinates as numeric latitude/longitude pairs, set privacy limits on `student_reference`, and require a new contract version for an incompatible change.

Also, the contract isn't just documentation. Checks are implemented to verify compliance so that any change, for safety, doesn't affect data pipelines, as changes can impact both availability and security.

To define a Data Contract, data schemas are often represented in JSON Schema, Apache Avro, Protocol Buffers, or similar technologies, although standards like the **[<VPIcon icon="fas fa-globe"/>Open Data Contract Standard](https://bitol-io.github.io/open-data-contract-standard/v3.1.0/) (ODCS)** are also used.

The contract is developed and reviewed by Data Engineers and Analytics Engineers within the organization, who coordinate with professionals from other companies, such as Software Engineers who know what data their source produces. At a higher level, Data Owners and Data Stewards are involved to validate the semantics, quality, and usage conditions of the data.

### DataOps

Data Engineering involves many people and components. Even a pipeline that works today can become unreliable if teams don't coordinate changes to sources, contracts, code, infrastructure, and quality rules.

**DataOps** is an approach to improving that collaboration and delivery process. It aims to shorten the path from a business need to trustworthy data while maintaining quality, security, and traceability.

[<VPIcon icon="iconfont icon-databricks"/>DataOps](https://databricks.com/blog/what-is-dataops) isn't a specific technology. It's a set of practices such as versioning code, automating tests, reviewing and deploying changes through controlled environments, and monitoring production pipelines. It adapts ideas from agile delivery and software operations to data-specific concerns.

For example, imagine the university starts working with a new taxi company. The first step could be creating a Data Contract with the conditions for data delivery. Then, a **Data Engineer** would implement all the necessary software for obtaining it through a connector and store it in **Git**.

Also, before deploying it in production, you should conduct data and code tests to ensure functionality. Finally, after deployment, it would be monitored through metrics like the volume of data extracted, its quality, and latency.

Data Engineers, Analytics Engineers, Data Stewards, Data Owners, Platform Engineers, SREs, and consumers all contribute to DataOps. The practices work only when the people who produce, operate, and use data share responsibility for reliable delivery.

Technologically, [<VPIcon icon="fa-brands fa-youtube"/>DataOps](https://youtu.be/HNgpk9IUfK4?si=ANAVTJnGL_q5p3vU) relies on tools we've already discussed, like Git for versioning and CI/CD tools for automating tests and deployments, among others. But its value doesn't come from a specific tool. It comes from adopting best practices in their use.

Many of these ideas come from DevOps. Nonetheless, DataOps adapts them to data work, incorporating specific aspects like quality, semantics, lineage, and the relationship between producers and consumers.

<VidStack src="youtube/mAFoROnOfHs" />

### DevOps

As I just mentioned, DataOps adopts ideas from [<VPIcon icon="fa-brands fa-youtube"/>**DevOps**](https://youtube.com/playlist?list=PLWKjhJtqVAbkzvvpY12KkfiIGso9A_Ixs&si=L4Aj9YXaWYWWJiWK). DevOps refers to a set of best practices that help coordinate software development and the deployment of systems, all with the goal of ensuring that changes can be tested, deployed, and maintained in an automated and reliable manner.

Among its main practices is **Continuous Integration (CI)**, which involves integrating each code change into a repository so tests are automatically conducted. Then there's **Continuous Delivery** or **Continuous Deployment (CD)**, allowing changes to be deployed automatically in a controlled manner across different environments. Finally we have **Infrastructure as Code (IaC)**, which lets you define infrastructure components programmatically, facilitating their versioning and deployment across various cloud platforms or servers.

For example, when a Data Engineer modifies the connector that extracts data from the taxi company, the change is saved in Git and a CI system automatically runs its tests. If it passes, a new version of the software is built and deployed autonomously in a test environment to continue verifying its functionality until it's deployed in the final production environment.

Common technologies include GitHub Actions, GitLab CI/CD, or Jenkins for automating tests and deployments. Docker is also commonly used for packaging software along with Terraform or OpenTofu for defining infrastructure. Kubernetes can also be used to manage containers when the system's scale and complexity require it.

**DevOps Engineers**, **Platform Engineers**, and **SREs** implement and maintain these mechanisms, while Data Engineers use them to deploy their pipelines. The main difference is that DevOps focuses on software and infrastructure delivery and operation, while DataOps also checks data-specific aspects like quality, semantics, lineage, and availability.

<VidStack src="youtube/PHsC_t0j1dU" />

---

## Data Warehousing and Business Intelligence

Organizations capture, integrate, and transform data through pipelines, then store it in systems chosen for particular workloads. Operational databases support the applications and transactions that keep day-to-day services running.

Analysis often needs integrated history, stable definitions, and queries that scan many records. Specialized platforms such as Data Warehouses and Data Lakes support that work. **Data Warehousing and Business Intelligence** makes governed analytical data available to people who explore it and use the results in decisions.

These are two related concepts. **Data Warehousing** covers the design and use of a Data Warehouse, which integrates historical data from several sources for repeatable analytical workloads.

Operational and analytical workloads have different priorities and access patterns. Some platforms support both, but teams still face tradeoffs in isolation, performance, freshness, consistency, and cost. Separating the workloads often protects daily operations and gives analysts a model designed for their queries.

**[<VPIcon icon="iconfont icon-tableau"/>Business Intelligence](https://tableau.com/business-intelligence/what-is-business-intelligence) (BI)** covers the practices and technologies used to query, analyze, and present data for decision-making. A Data Warehouse often provides the governed analytical foundation for BI, although BI tools can use other sources too.

For example, a university might integrate trip and finance data in a Data Warehouse. Analysts could compare provider costs, usage, attendance, and budget to assess whether the transportation benefit is sustainable and estimate short-term spending.

Also, in order to conduct these data analyses, build dashboards, and ultimately make decisions, the data needs to be of high quality, protected, and maintained with proper lineage. Any issues in these aspects can influence decision-making.

### Analytical Data Stores

Analytical workloads often scan long time periods, join several sources, and aggregate large numbers of records. Storage designed mainly for operational transactions may not be the best place to run them repeatedly.

[<VPIcon icon="fas fa-globe"/>Analytical Data Stores](https://dremio.com/wiki/analytical-data-store/) are designed for analytical queries, transformations, and aggregations. They still need security and consistency controls, but their performance priorities usually favor scans and calculations across large datasets rather than high-frequency row-level transactions.

The most representative example of an Analytical Data Store is a Data Warehouse, which stores data in a stable and scalable way so that the same analysis process can be repeated over time with an ever-increasing volume of data.

But this is not the only option, as Data Lakes are also oriented toward this type of use, and [<VPIcon icon="fas fa-globe"/>Data Marts](https://snowflake.com/en/fundamentals/what-is-a-data-mart/) offer a smaller-scale analytical environment (usually being subsets of data from a Warehouse) specifically designed to meet the needs of a particular department or business area.

For example, the university could create a Data Mart containing mobility measures and the limited financial context needed to analyze service cost, without exposing irrelevant student details. The team should connect the Mart to lineage, security, quality, and audit controls just as it would any other analytical asset.

Among the most used platforms to implement these systems are Snowflake, Google BigQuery, Amazon Redshift, Microsoft Fabric Data Warehouse, and Databricks SQL. Their design and implementation are the responsibility of an **Analytics Architect** or Data Architect, while **Data Engineers** maintain the data pipelines that supply them with information, and **Analytics Engineers** handle the transformations required after ingestion to facilitate subsequent analysis.

At the administration and maintenance level, there are **Data Warehouse Administrators** or **Platform Engineers**, who monitor performance, manage permissions, and platform costs.

### Facts and Dimensions

An **Analytical Data Store** may preserve source-like data or organize it into a model, depending on the platform and layer. A Data Lake commonly retains source formats in an early zone, while curated layers and Data Warehouses apply more explicit schemas.

One common analytical approach is the [<VPIcon icon="fa-brands fa-youtube"/>dimensional modeling](https://youtu.be/CZM__QtHCB0?si=XSxQtXQosiKHq2dh) we talked about earlier. It organizes information into **facts** and **dimensions**. A fact records an event such as a trip, while dimensions provide context for filtering, grouping, and comparison.

A particularly important design choice is [<VPIcon icon="iconfont icon-ibm"/>granularity](https://ibm.com/docs/en/ida/9.1.1?topic=phase-step-identify-grain), or grain: exactly what one row of a fact table represents. The team should define it before choosing dimensions and measures so later aggregations remain valid.

For example, the **Trip** fact table might have a grain of *"one completed trip."* If a student takes two trips on the same day, the table stores two rows, each with its cost, distance, duration, and date key. The university can sum those rows by month. It shouldn't add monthly-total rows to the same fact table because they have a **different granularity** and would cause double counting.

Once the granularity is defined, dimensions should be chosen based on the context describing the fact and the analytical queries expected to be performed. A practical way to identify them is by asking **who, what, when, where, and how** each fact was involved. For example, if each row represents a trip, dimensions like Student, Date, Provider, Origin, and Destination could be used, each with a unique value for that trip.

These dimensions would allow analysis of the geographical areas where trips occur, which transportation company makes more or fewer trips, and so on. This way, dimensions are incorporated that provide a useful perspective for analyzing the facts.

This data modeling is done by an **Analytics Engineer** or **Data Modeler**, along with domain experts like Data Stewards. Then, **Data Engineers** implement the data ingestion and transformations required to adapt the data to the specific final model of each system.

### Metrics and KPIs

In a dimensional model, facts can be seen as rows composed of values, called **measures**. These measures can help understand what happened during an event over time, but data analysis generally aims to answer questions involving all events over a certain period.

Teams combine measures into repeatable [<VPIcon icon="fas fa-globe"/>metrics](https://nist.gov/itl/ai/ai-standards-and-guidelines-group/metrics-and-measures), such as totals, rates, averages, and percentiles. A metric becomes a [<VPIcon icon="fa-brands fa-youtube"/>Key Performance Indicator](https://youtu.be/ItZlTixh6Bs?si=vXN2FCx2ICh5E59Y) when it's tied to an important objective and helps show whether the organization is meeting it. Here are some examples:

| Concept | Meaning | Example |
| --- | --- | --- |
| Measure | A value recorded in a fact | A trip cost €18 |
| Metric | A repeatable calculation over a set of measures | Monthly transportation cost = sum of the cost of trips completed during the month |
| KPI | A metric associated with a business objective | Monthly mobility budget consumption, with the hypothetical objective of not exceeding the allocated budget |

As is evident, not every metric is always a KPI. For example, a metric that represents the total number of trips made in a month can be useful for describing transportation service usage, but it will only be a KPI when there's a business objective that involves quantifying that number of trips.

KPIs are often used in dashboards and visualizations, although they generally don't appear in isolation. In this regard, when several KPIs with their current values are gathered and compared with established goals, this gathering is called a scorecard.

Despite both concepts being related, a **scorecard** and a **dashboard** have different purposes. A scorecard aims to determine if goals are being met, while a dashboard helps understand what's currently happening in the organization and why.

The same metric may appear in dashboards, scorecards, reports, and APIs, so teams need a reusable definition. Its documentation should include:

- The name, purpose, and business owner.
- The formula that calculates the resulting value of the metric, the sources of the data, and its granularity.
- The unit, time period, time zone, and frequency of metric value updates.
- The filters and inclusion rules, such as excluding canceled trips from the calculation.
- In the case of a KPI, the objective that originates it is documented.

Here, metrics and KPIs are primarily defined by roles like **Business Owners**, **Data Owners**, and **Data Stewards**. On the other hand, their practical implementation is carried out by **Analytics Engineers** and **BI Developers**, and finally, their results are used by **Data Analysts**, among other professionals.

### Semantic Layers

As I mentioned before, metrics are documented to ensure their meaning and calculation method are well understood. But this doesn't guarantee that all systems adhere perfectly to this documentation.

For instance, monthly cost might be calculated excluding canceled trips, while another system might accidentally include them. In both cases, the same "name" is used for a metric that produces different results.

A [<VPIcon icon="iconfont icon-databricks"/>Semantic Layer](https://databricks.com/blog/what-is-a-semantic-layer) addresses this problem by centralizing reusable business definitions between stored data and consumption tools. It presents concepts such as Trip, Student, or Course instead of requiring every consumer to rebuild logic directly from tables and joins.

In this way, the formulas and filtering rules that make up each metric are implemented on the **semantic layer**, rather than each analyst writing their own code on a database, Data Warehouse, or corresponding system. This layer acts as an intermediary that translates the calculation of a metric expressed in a business-friendly language into the necessary code for specific systems to perform that calculation, facilitating future metric modifications and portability between different systems.

For example, in the Data Warehouse, there might be a Trip fact table, a Date dimension, and a cost measure in each fact. Here, the semantic layer would define the existence of certain concepts like trip and cost, whose calculations are "mapped" in some way onto the technology used to implement each system.

In this case, the calculation of a **"Total Cost per Month"** metric could be defined on the semantic layer, which would internally translate this into SQL operations, or the corresponding technology, to group trips by month and sum the cost measure of the grouped facts.

The main difference between the documentation of a metric and its implementation in a semantic layer is that the documentation specifies what the metric is and how it is formally calculated, while in the semantic layer this specification is translated into operations in a specific technology that allows the calculation.

Thus, multiple dashboards or reports can reuse the same logic defined on a semantic layer, as sometimes calculations need to be performed on data in different systems.

Technologies used to implement semantic layers include Power BI Semantic Models, LookML, dbt Semantic Layer, and Cube. Analytics Engineers and BI Developers commonly build and maintain these definitions with input from business owners and analysts.

### Reports and Dashboards

After implementing the **Analytical Data Stores** systems in production and defining some metrics or KPIs, the next step is to create Business Intelligence products that present the analysis results to end users, professionals, or executives.

The most common products are reports and dashboards, though they aren't the only ones, as the analysis results can also lead to a visualization or documentation of a decision-making process, for example.

Let's better understand what each one is and their differences:

A [<VPIcon icon="fa-brands fa-youtube"/>report](https://youtu.be/fqKheazewbo?si=auO7hrFX6zQGgoyM) is a document that presents detailed and structured information on a specific topic and time period. It may include graphs, metrics, and explanations. Reports can be generated periodically in static formats, like PDF, or be interactive, allowing users to filter or manipulate the presented information.

For example, a university might prepare a monthly report with the transportation service cost broken down by provider, showing canceled trips, the number of students who used it, and so on.

A [<VPIcon icon="fa-brands fa-youtube"/>dashboard](https://youtu.be/GDzzh4T_IaM?si=r2t7eHDiIXvLFZza), the other hand, is a view that brings together the most relevant metrics and KPIs to monitor a situation. It typically contains graphs and visual elements that update more frequently than a report.

For example, a dashboard for the administration could show the consumed budget, the number of enrolled students, and the attendance trend, also allowing results to be filtered by training program if it is interactive.

There are some best practices to follow when you're creating dashboards to make sure they're useful. For example, you should display only a few indicators and only those truly relevant to the dashboard's purpose. Also, choosing a visualization isn't merely decorative, as the charts should help people understand the information presented, and they should follow best practices in their design.

In general, you'll use a dashboard when it's necessary to periodically monitor a small set of indicators and quickly detect changes or deviations. You'll use a report when you need a deeper exploration of a topic, although both products can complement each other.

For example, the administration might use a dashboard to detect an increase in transportation expenses and then consult a monthly report to find out which providers, routes, or periods caused it.

For creating these products, the most commonly used technologies are Microsoft Power BI, Tableau, Looker, Apache Superset, and Metabase. These are primarily used by **BI Developers**, although **BI Administrators** also collaborate in managing the workspace where the products are built. Finally, the results can be interpreted by a **BI Analyst**, who also has the knowledge to develop reports or dashboards in certain situations alongside the **BI Developers**.

### Self-Service Analytics

The data analysis process generates products like dashboards or reports, which present specific information structured for a purpose. But sometimes it may be necessary to modify that purpose.

For example, the finance department might have a dashboard designed exclusively to monitor the overall budget the university allocates to taxi services. Yet, the director of a specific master's program might need to cross-reference that transportation data with attendance records from their training program to see if the service provides any benefit, which is a very specific need not addressed by the original dashboard.

The coordinator could ask the technical team to change the dashboard, but every small question would then enter a development queue. [<VPIcon icon="iconfont icon-ibm"/>Self-Service Analytics](https://ibm.com/think/topics/self-service-analytics) lets authorized users explore governed data and create suitable analyses without depending on a technical specialist for every step.

This approach relies on elements we covered earlier, such as **semantic layers** where metrics are maintained, data catalogs that allow you to quickly locate available information, and business glossaries that standardize the meaning of business concepts. These elements are used by team members who independently build their own visualizations and reports, although they may not have access to all types of information due to existing privacy policies. This is why the process is called **managed self-service**.

For example, if a dashboard shows an increase in transportation expenses, a Master's coordinator could use a semantic layer to define a filter for their program's data. Thus, the semantic layer would ensure the official cost definition is used, while permissions would prevent access to data from other programs or unnecessary personal information.

Finally, it's worth noting that the original dashboard isn't always modified. Instead, the coordinator creates a new one with their changes.

In practice, the viability of this approach is the result of coordinated work by **Analytics Engineers**, **BI Developers**, and **BI Administrators**, primarily. The end users who consume and leverage this capability are **Data Analysts**, **Business Analysts**, and business managers.

<VidStack src="youtube/9fFQA-JOXA0" />

---

## Big Data

The data lifecycle runs across an infrastructure of systems and pipelines. Data enters, moves, gets stored and processed, and eventually reaches operational or analytical consumers.

For a moderate workload, a relatively simple architecture may meet the required performance, reliability, and cost targets. As the organization grows, however, it may need to store more data, process events more often, and support more varied formats and use cases.

A database that began on one machine might first scale vertically by gaining more CPU, memory, or storage. At some point, the workload or resilience requirements may justify horizontal scaling across several machines, but that added complexity should solve a measured need.

[<VPIcon icon="iconfont icon-"/>Big Data](https://cloud.google.com/learn/what-is-big-data?hl=en) deals with datasets and flows whose volume, velocity, variety, or combination pushes beyond the practical limits of conventional tools for a particular organization. The challenge is not simply "a lot of rows". It's meeting the required processing time, reliability, and cost at that scale.

When thinking about Big Data, you might imagine a well-defined threshold beyond which a data set is considered Big Data. But this isn't the case, as the threshold depends on the current infrastructure, the target speed, the cost thr team willing to incur for its management, and the variety in the structure of the information.

A team should adopt a Big Data solution only after assessing whether the current infrastructure misses its performance, reliability, or cost requirements. Distribution may help, but it also adds operational complexity, so the benefits need to justify it.

For example, a university could grow from having 1,000 students to 100,000 due to an expansion of its faculties or the introduction of online classes. If this happens, the databases must support storing all their personal data, as well as the data generated when interacting with various services and platforms like the virtual campus, all at a speed that doesn't compromise service availability or quality.

Big Data draws on many Data Management capabilities at a larger scale. A **Big Data Engineer** is often a Data Engineer who specializes in distributed storage and processing. They work with Data Architects who design the solution and Data Platform Engineers who operate it.

### The 3Vs: Volume, Velocity, and Variety

There's no universal threshold for Big Data, but the 3Vs – **Volume, Velocity,** and **Variety** – provide a useful guide. They aren't three boxes every project must check. They describe pressures that can make a workload harder to manage with the current infrastructure.

**Volume** refers to the total amount of data that must be stored and processed. The first challenge here is that data takes up space, so in a large enough volume, some systems may not be able to handle it all. Also, various management processes slow down as the volume increases because all data must go through pipelines or similar processes.

::: tip Example

Volume can be associated with the amount of data produced by students, meaning the more students there are, the more data volume needs to be supported. Each student generates data like login events, which must be stored and processed, taking up space and consuming significant computing resources if the volume is high.

:::

**Velocity** refers to how quickly data arrives, changes, and must become available to consumers.

::: tip Example

Transportation service taxis must communicate their position and status every few seconds so a student can have a real-time view of available taxis and whether they are near their location. So it's crucial that data is available as quickly as possible to ensure a good user experience.

:::

**Variety**, as previously mentioned, describes the nature or diversity of data, such as structures, formats, and meanings that data presents.

::: tip Example

An academic database can store enrollments and students in tables using a relational paradigm, while the virtual campus produces logs in semi-structured JSON documents, or a graph-oriented database represents information about students, drivers, and locations with graphs to optimize transportation routes.

:::

Volume affects storage, transfer, and processing costs. A team may optimize the data model, partitioning, queries, or retention before distributing the workload. When one machine can no longer meet the requirements economically or reliably, horizontal scaling becomes one option.

Not all data needs real-time processing. A live trip-status update may need seconds, while a historical tuition-payment report can refresh on a daily schedule. The required latency should come from the user and business need, not from a desire to make every pipeline real time.

Finally, variety is one of the most significant properties of data because it determines the heterogeneity of the dataset within the organization. With such diverse data stored in different structures, formats, and representations, it becomes necessary to adopt specific techniques for each variety to ensure efficient and viable management.

These are the properties typically attributed to Big Data. But it's also important to highlight other significant properties, such as **veracity**, which refers to the reliability of the data or **value**, among others.

### Big Data Architectures

When the 3Vs exceed the capacity of a "conventional" solution, there are several ways to increase the capacity of an infrastructure to meet these needs. But first, it's useful to define what infrastructure is.

[<VPIcon icon="fas fa-globe"/>Infrastructure](https://hpe.com/emea_middle_east/en/what-is/data-infrastructure.html) is the set of computing, storage, networking, and foundational software resources on which the organization's applications and data systems run.

[<VPIcon icon="fa-brands fa-aws"/>Architecture](https://aws.amazon.com/what-is/data-architecture/) describes how components use that infrastructure to meet requirements. It defines where systems run, how storage and processing are distributed, and which path data follows from source to consumer.

So if the 3Vs compromise the viability of an existing solution, it may be necessary to modify its architecture. One way to address an increase in volume or velocity, as mentioned before, is **vertical scaling**. This involves improving the hardware, giving each machine more resources. But this can't scale infinitely, which is why **horizontal scaling** exists. More machines are added, and storage and processing are distributed.

Another way to increase speed could be the parallel execution of processes across multiple machines, known as **Massively Parallel Processing (MPP)**.

There are many ways to improve the capabilities of an infrastructure, especially when it comes to processing more data at higher speeds. Managing a greater variety of data, though, is often a challenge without established general techniques, although distribution can help.

To better understand what architecture consists of, think of it as a set of layers where each encompasses certain components that together constitute the path data takes throughout its lifecycle within the organization.

| **Layer** | **Functionality** | **Example** | **Technologies** |
| --- | --- | --- | --- |
| **Sources** | Origin where data is obtained or generated | Taxi company API and payment platform | REST APIs, PostgreSQL, IoT sensors |
| **Ingestion** | Moving data from sources into the platform | Receiving virtual-campus events and provider trip updates | Apache Kafka, Apache Airflow |
| **Storage** | Persistently storing data | Retaining events, files, and curated analytical tables | Amazon S3, Google Cloud Storage |
| **Processing** | Cleaning and transforming data according to its purpose | Removing duplicate trip records in a data pipeline | Apache Spark, Apache Flink |
| **Serving** | Exposing information for querying | A Data Warehouse exposes integrated trip information and the associated costs | Snowflake, Google BigQuery |
| **Consumption** | Using information for decision-making or any other purpose | Dashboard showing the monthly cost of the transportation service | Power BI, Tableau, Jupyter |

Another important aspect of any architecture is that its layers must implement security, lineage, and observability mechanisms, also ensuring data privacy.

Imagine a student requests a taxi through the virtual campus. The architecture must protect and trace the event. A [<VPIcon icon="fa-brands fa-youtube"/>streaming](https://youtu.be/A3Mvy8WMk04?si=6DNNlsEB9icoBLQz) flow can update trip status on the portal within seconds, while a later [<VPIcon icon="iconfont icon-databricks"/>batch](https://docs.databricks.com/aws/en/data-engineering/batch-vs-streaming) process consolidates the relevant records for cost analysis.

This difference in speeds is another way to adjust the architecture so that certain critical functionalities have the required speed or so that analysis processes that don't need to be performed in real time can handle a larger volume of data.

Finally, the architecture is designed by a **Data Architect** or **Big Data Architect** and implemented by **Data Engineers**, **Streaming Engineers**, or **Software Engineers**. Its maintenance is the responsibility of Data Platform Engineers, Cloud Engineers, and SREs.

### Big Data Storage and Processing

After designing the architecture, its components are implemented, with some dedicated to storing and processing data at the required scale. On one hand, **storage** is responsible for keeping data persistent, secure, and accessible. On the other, **processing** uses computing resources to transform and analyze them, primarily.

The university might retain authorized virtual-campus events, attendance records, and trip information for several years, creating a large storage need. Its processing demand may be more variable, with peaks during reporting periods or major academic events.

By separating storage from processing, if we focus on systems that can serve to store data in an infrastructure, we might encounter:

- **Distributed databases:** These are databases deployed to operate across multiple machines, using technologies like Cassandra or DynamoDB.
- **Object Storage:** These systems are dedicated to storing large volumes of data in independent objects, utilizing Amazon S3, Azure Blob Storage, Google Cloud Storage, or MinIO.
- **Search engines:** These systems specialize in quickly indexing and querying logs, texts, and other types of semi-structured information with technologies like Elasticsearch or OpenSearch.
- **Distributed file systems:** These store and distribute files across multiple machines using HDFS or CephFS.

On the other hand, data processing in an infrastructure can be distinguished based on the approach taken, which depends on volume and speed:

- **Batch processing:** Here, data is accumulated over time and periodically processed in batches. This can be implemented with Apache Spark, for example, which allows tasks like transformation and cleaning to be distributed across multiple machines.
- **Streaming processing:** Here, all data generated or arriving at the start of a pipeline is processed continuously, making it suitable when real-time results are needed. Technologies used in this case can be Apache Flink or Spark Structured Streaming.
- **Distributed query and processing:** This allows for the analysis of large volumes of data by executing operations in parallel across multiple machines. One of the most common interfaces is SQL, used by tools like Trino or Spark SQL. But in addition to SQL, these systems often offer APIs in languages like Python, Java, or Scala and abstractions like DataFrames, providing greater flexibility for implementing complex transformations or custom logic.

As an example of architecture, the university could use Kafka to receive events generated by the virtual campus or the transportation company, while Flink could process them to keep the status of each journey updated in real time in the application consulted by the end user. Then, with Spark, they would be transformed to be integrated into a Data Warehouse and queried using SQL.

In practice, the central role that implements and optimizes these storage and processing systems is the **Big Data Engineer** or specialized Data Engineer. For this, they use technologies like Cassandra, Amazon S3, or HDFS, decide how to implement jobs using Spark, and ensure adequate performance.

On the other hand, **Data Platform Engineers**, **Cloud Engineers**, and **SREs** handle the base infrastructure, ensuring its stability, availability, and resilience.

### Big Data Analytics

In Big Data, besides storing a large volume of diverse data and processing it at a speed that often needs to be high and in real-time, it must be converted into information, knowledge, and ultimately value. This means that processing refers to the transformations performed on the data to enable storage, clean it, or maintain its quality, primarily.

But processing is also applied after storage to calculate statistics and generally analyze the data. This is the role of [<VPIcon icon="iconfont icon-ibm"/>Big Data Analytics](https://ibm.com/think/topics/big-data-analytics), an area dedicated to converting data into information, knowledge, and value through analytical processes applied to large volumes of data.

An analysis belongs in a Big Data context when the workload's scale or flow characteristics require distributed or otherwise specialized infrastructure to meet its targets. It doesn't need advanced Machine Learning, and using a scalable cloud platform by itself doesn't make a small analysis "Big Data."

Based on this technological foundation, there are several fundamental analytical approaches you can use, depending on the analysis you need to perform:

- **Descriptive Analytics:** Focuses on applying techniques that explore data to understand what has happened. For example, it allows calculating how many trips have been made, how much they have cost, and how many students have used the service each month.
- **Diagnostic Analytics:** Here, the analyses aim to understand why a result has occurred. At the university, it could be used to study which supplier time slots are related to an increase in transportation service costs.
- **Predictive Analytics:** Uses historical data to make inferences and try to predict what will happen in the future. For example, it could predict how many enrollment applications will be received next term.
- **Prescriptive Analytics:** Turns the results of analyses into recommendations. For instance, in this case, it could suggest how to optimize the distribution of taxi fleets and reallocate the monthly budget to ensure service coverage for the maximum number of students.

In big data environments, analysis can be executed in **batch** or **streaming**, depending on each process's requirements. For instance, with Apache Spark, you could periodically calculate the evolution of taxi trip costs and class attendance, while with Flink, real-time trips could be analyzed to generate alerts if demand exceeds a certain amount.

For analysis processes to be truly useful, they begin by defining the question to be answered with the obtained knowledge and the value expected to be added, meaning the decision to be made with the result. Then, the necessary data is selected and prepared, ensuring its quality is adequate for analysis. After execution, the result is published via a dashboard, report, alert, API, or predictive model.

It's also important to note that having a larger volume of data doesn't always guarantee "better" conclusions or more value. For example, if students using the taxi service have higher attendance, you can't directly conclude that transportation is the cause, as those students might be taking more in-person classes or have other differences.

So besides handling a large volume of information, it's crucial to interpret results correctly. In this specific case, the problem is that correlation doesn't always imply causation in the analyzed facts, but this isn't the only issue that can arise in an analysis.

**Data Engineers** build and maintain pipelines and analytical environments. **Data Analysts** use SQL, Trino, Spark SQL, Power BI, Tableau, and similar tools for a range of analyses, often descriptive and diagnostic. **Data Scientists** use Python, R, Jupyter, Spark, or MLlib for statistical modeling, experimentation, prediction, and optimization.

**BI Developers** turn governed metrics and analyses into reports and dashboards. **Machine Learning Engineers** help train, deploy, and operate models. Domain experts, Data Owners, and Data Stewards help teams interpret and use the results responsibly.

<VidStack src="youtube/OrORtZ6rnJo" />

---

## Analytics and Data Science

Organizations analyze data to understand what's happening, support decisions, test ideas, and build models. This is one of the main ways they turn data into knowledge and value.

[<VPIcon icon="iconfont icon-gcp"/>Analytics](https://docs.cloud.google.com/docs/data) and [<VPIcon icon="fa-brands fa-aws"/>Data Science](https://aws.amazon.com/what-is/data-science/) are overlapping, complementary fields. Analytics often focuses on answering defined questions with descriptive, diagnostic, predictive, or prescriptive methods. At the university, an analyst might study attendance over the past month and investigate which changes coincide with a decline.

Data Science often tackles less-defined or model-heavy questions through **statistics**, **Machine Learning**, computation, and domain knowledge. It may explain patterns, estimate effects, segment observations, or make predictions. The university could use it to forecast transportation demand over the next six months.

In practice, [<VPIcon icon="iconfont icon-tableau"/>both use data to achieve a goal](https://tableau.com/analytics/data-science-vs-data-analytics), and the exact boundary varies by organization. Both need governed, suitable, high-quality data and a clear understanding of the decision their result will support.

An analysis should start with a clear question. The university might ask whether the transportation benefit improves class attendance or how many rides students will request next week. The first needs a careful causal design, while the second calls for a forecasting or predictive model.

After formulating the question, a process is established that covers everything from the question to a final analytical product like a dashboard, report, or simply the knowledge produced that contributes to decision-making.

In this process, an **analytical dataset** is generally built to serve as a source for subsequent analysis. Then, this dataset is explored to understand the data, model it mathematically, or perform transformations on it. In other words, the analysis process begins by applying techniques suited to the business question's needs.

Finally, if you need to train a machine learning model, you'll make certain transformations to prepare the dataset for training, so it's considered **model-ready**. After training, results are delivered through a report, API, or by deploying the model in the infrastructure to make predictions, for example.

In this process, various roles collaborate, such as **Data Analysts**, who answer business questions related to **Analytics**, while **Data Scientists** formulate hypotheses and develop models to describe data or make predictions. **Analytics Engineers** focus on building analytical datasets, and **Data Engineers** construct the pipelines and infrastructure that supply them.

Also, when a machine learning model needs to be integrated into an application, **Machine Learning Engineers** are involved.

### Analytical Datasets

An **analytical dataset** is prepared for a defined analysis. It isn't a random collection of files: it has a known schema, grain, population, time period, quality criteria, and lineage. The team selects data because it is relevant to the question rather than including every available field.

In the university use case, to study if taxi service improves attendance, a dataset could be built with records of trips and class attendance of students who have or haven't traveled, allowing for a comparison of their attendance statistics.

On the other hand, to predict transportation demand, it would be more appropriate to build another dataset that integrates travel history with class schedules, the academic calendar, or weather conditions. Thus, although both sets may reuse some data sources, their structure, granularity, and quality rules would differ, as each must be designed to address the specific business question.

The design of how a dataset should be is the responsibility of a **Data Analyst** or **Data Scientist**, while the implementation of transformations and other processes necessary for its construction is carried out by **Analytics Engineers**. But if data from multiple sources need to be integrated, a **Data Engineer** handles this task, as we have seen.

These datasets are usually materialized in the form of tables in a Data Warehouse, Data Lake, or as column-oriented files like **Apache Parquet**.

### Exploratory Data Analysis

Most analyses include **[<VPIcon icon="fa-brands fa-youtube"/>Exploratory Data Analysis](https://youtu.be/QiqZliDXCCg?si=FFey4JEGFIx2cjWG) (EDA)** because you rarely understand a new dataset perfectly at the start.

EDA examines the dataset's distributions, patterns, relationships, and unusual values before the team draws conclusions or builds a model. It also reviews types, missing values, duplicates, quality limitations, and possible sources of bias.

Regarding exploration techniques, [<VPIcon icon="fa-brands fa-youtube"/>descriptive statistics](https://youtu.be/FzujIYo9GYo?si=n6yNvrW_g_Qi4L4W) and the creation of **visualizations** are usually key. For example, a Data Analyst might represent the number of enrollments paid per day, compare the payment methods used, and analyze when more incidents occur. This way, they could discover if any of the payment platforms or banks involved in the transactions have caused problems with enrollment payments at any point.

They might also observe phenomena such as students who pay earlier achieving better academic results, but that correlation wouldn't prove that paying in advance is the main cause. Still, exploration serves to generate this hypothesis and detect possible alternative explanations, but not to confirm a causal relationship on its own.

EDA is performed by both **Data Analysts** and **Data Scientists**, though in different ways, as analysts seek to make diagnoses, while scientists explore the data to decide how to model it.

The technologies they use for exploration are very diverse, from SQL for querying the dataset, Jupyter notebooks for more easily documenting Python code, to Python libraries like pandas, NumPy, SciPy, Matplotlib, and Seaborn. Other languages that also allow data exploration include R, Julia, or Scala.

### Feature Engineering

After exploring the data, transformations are often applied to make them more useful depending on the intended purpose. If we view the data as a set of records where each takes values in a series of attributes called **features**, sometimes these features may be more or less useful for training a machine learning model or simply for understanding the data.

For example, if we have student records in the form **(name, email, 1)**, having a feature with a fixed value of 1 doesn't contribute to an analysis unless it's a relevant feature that always takes the value 1 for some realistic reason. In this case, it would be ideal to remove the feature and keep only the most useful ones.

[<VPIcon icon="fa-brands fa-youtube"/>Feature Engineering](https://youtu.be/Bg3CjiJ67Cc?si=mjds_k4Lr5jrKGJc) transforms or derives model inputs so they represent the problem usefully. Techniques include **normalization** or standardization for scale-sensitive algorithms, [<VPIcon icon="fa-brands fa-wikipedia-w"/>data imputation](https://en.wikipedia.org/wiki/Imputation_(statistics)) for suitable missing values, encoding categories, and discretization. Each choice should follow the business meaning, model type, and evaluation plan rather than a fixed recipe.

For example, imagine the university wants to predict whether a student will finish the master's program. To do this, they have an analytical dataset with records whose features include class attendance, grades, and the number of accesses to the virtual campus, which will later be used to train a machine learning model for prediction.

For a model that is sensitive to feature scale, [<VPIcon icon="fa-brands fa-youtube"/>normalization](https://youtu.be/bqhQ2LWBheQ?si=FyajXf7Y4ieKhxDY) may help because grades range from 0 to 10 while portal-access counts can reach thousands. Min-max scaling can map them to **[0, 1]**, although other algorithms or scaling methods may be more suitable.

The team must also exclude information that wouldn't be available at prediction time. If a feature reveals the outcome directly or indirectly, [<VPIcon icon="iconfont icon-ibm"/>data leakage](https://ibm.com/think/topics/data-leakage-machine-learning) can make evaluation look unrealistically good.

These transformations are usually performed by a **Data Scientist**, **Analytics Engineers**, **Data Engineers**, or a **Machine Learning Engineer**, primarily. All these roles use technologies like SQL, Apache Spark, or Python to perform them, though these aren't the only ones.

### Experimentation

Many analyses test a **hypothesis**. If the team believes a feature doesn't improve a model, it can state that idea clearly and use [<VPIcon icon="fa-brands fa-youtube"/>experiments](https://youtu.be/arWJoWPpOqY?si=6PriCYitgQCUvDOE) to compare a model trained with and without the feature.

[<VPIcon icon="fa-brands fa-youtube"/>Experimentation](https://youtu.be/YpZ7Gb9d-Lc?si=BKEzubCWulgTwI0j) changes controlled parts of a dataset, method, or training process to test a hypothesis. The work is iterative: one result can reject the original idea or suggest a better question for the next experiment.

In this field, it's important to distinguish between two types of experimentation with different purposes. First, there's [<VPIcon icon="fa-brands fa-youtube"/>analytical experimentation](https://youtu.be/vIFKGFl1Cn8?si=5NuZmDa__PNrnW4R), which is conducted on already collected data and focuses on comparing features, types of models, and training techniques to determine which combination of these elements best answers the business question.

For example, to predict if a student will complete their master's program, the university might start with a simple model using only grades and attendance. Then, they could run another experiment incorporating the number of virtual campus logins or try a different algorithm.

This way, they could determine if the change truly enhances predictive capability or merely increases model complexity.

Also, this model should be evaluated with data not used in its training. Otherwise, it might "cheat," performing well with training data but failing to "generalize" and achieve the same performance with real data.

[<VPIcon icon="fa-brands fa-youtube"/>**Controlled experiments**](https://youtu.be/DUNk4GPZ9bw?si=ZZBhm12bp-ssxkSM) introduce a change and compare outcomes between a **treatment group** that receives it and a **control group** that doesn't. Random assignment, when feasible and ethical, helps make the groups comparable.

For instance, to see if a taxi service improves attendance, the university could gradually introduce it to a small group of students, provided it's ethically and legally appropriate. Here, the hypothesis would be that the service improves attendance, tested by analyzing treatment data from students who received the service against control data from those who didn't, using metrics like the percentage of classes attended.

Experiments should be reproducible. Teams can version code and configuration with Git, while platforms like MLflow record runs, parameters, metrics, and artifacts.

Data Scientists usually formulate hypotheses and design model experiments with Data Analysts and domain experts. Machine Learning Engineers may help make the training and evaluation workflow reliable at production scale.

### Model-Ready Data

Analytical datasets are often ready for analysis but this isn't always the case. If your goal is to train a machine learning model to make predictions, then the dataset must meet additional conditions.

To train a model, the data needs to be [<VPIcon icon="iconfont icon-ibm"/>model-ready](https://ibm.com/think/topics/ai-ready-data): prepared for the selected algorithm, evaluation design, and production use. A supervised-learning dataset needs a target variable that records the outcome to learn. Unsupervised methods can work without labels, so model-ready requirements depend on the task.

For example, to predict whether a student will leave a master's program, historical training records need an outcome label such as **(student_reference, enrolled_subjects, withdrew)**. The team should exclude direct identifiers such as names from model features unless there's a justified need, and it must review whether the proposed prediction is fair and appropriate to use.

The team also separates data for training, validation, and final testing as the evaluation design requires. It develops the model without using the held-out **test** data for decisions, then uses that test set for an honest estimate of performance on unseen cases. For time-based predictions, the split should also respect chronology.

<VidStack src="youtube/dSCFk168vmo" />

Finally, model-ready also implies that the data is **representative** of the target concept we want the model to "learn." For example, if we train a model to predict master's program dropout using only data from those who have dropped out, it likely won't learn the patterns indicating when someone doesn't drop out, making the dataset unrepresentative.

Thus, ensuring datasets are model-ready is the responsibility of **Data Engineers**, **Data Scientists**, and **Machine Learning Engineers** who may use them.

### Analytical Product Delivery

Analysis creates value only when its results reach the right people or systems in a usable form. If the university uses a model to identify unusual exam activity, for example, it should treat the output as a signal for authorized human review rather than proof of misconduct.

**Analytical Product Delivery** provides the right consumption channel for each result. That channel might be a report, dashboard, alert, file, API, or prediction embedded in an application.

For instance, the university could deliver attendance analysis through a report or dashboard. A carefully governed model that estimates withdrawal risk might provide limited alerts through an internal API to an authorized support team, which would review the context before offering help. The channel and controls should match the intended use and potential impact.

Relevant practices in **Analytical Product Delivery** include defining the consumers of the results, their update frequency, and quality metrics. All this is documented along with data sources and other aspects, and the delivery mechanisms are monitored.

In the example, a dashboard with attendance analysis would have the rectorate and master's coordinators as consumers, updating with new data monthly. Meanwhile, the dropout prediction model would deliver its alerts to an academic officer via an API, even if this officer accesses it with an application.

The **delivery** is coordinated by the **Data Product Owner** or **Product Manager**, while technical teams with professionals like **Analytics Engineers**, **Software Engineers**, or **BI Developers** are responsible for implementing all the result delivery mechanisms.

<VidStack src="youtube/PSNXoAs2FtQ" />

<VidStack src="youtube/CMEWVn1uZpQ" />

---

## Data Products

An analytical result isn't automatically a product. A **Data Product** packages governed data with a way for defined consumers to use it and an operating model that keeps it useful over time.

It may take the form of a dataset, API, dashboard, or another interface. A dashboard or file alone isn't necessarily a Data Product: it needs a clear purpose, known consumers, ownership, documentation, and defined quality and service expectations.

In our focused use case, the university could create a **Mobility Eligibility** Data Product. It would combine only the approved enrollment, in-person schedule, distance, and eligibility attributes needed for the transportation benefit. An API could return an eligibility decision and its effective date to the student portal, while a separate governed dataset could provide aggregated service metrics.

Keeping this product narrow avoids exposing a complete student profile to consumers that don't need it.

### Product Characteristics

In this context, managing a Data Product should be done just like a commercial product, hence the need to define its consumers and those responsible, and to ensure its quality and availability.

But in the realm of data, there are certain fundamental characteristics for any product:

- **Discoverable:** It must be accessible through a data catalog or the appropriate tool.
- **Understandable:** The data schema, its semantics, and all aspects that facilitate its comprehension and traceability, such as lineage, must be documented.
- **Reliable:** Quality and availability are measured against clear expectations, with monitoring and a response process when the product misses them.
- **Secure:** Access controls are implemented, and the exposure of personal data is minimized.
- **Interoperable:** The data should be able to be integrated and function correctly in other systems.
- **Stable:** This means the data shouldn't undergo frequent changes in its schema, properties, or consumption methods.

A **Data Contract** can formalize important parts of the product interface, such as schema, semantics, quality rules, and update frequency. The product also needs documentation for ownership, access, support, lifecycle, and consumer expectations.

### Ownership and Lifecycle

No single role builds a Data Product alone. The **Data Product Owner** works with consumers, defines requirements, and sets objectives based on expected value.

On a technical level, there are Data Engineers, Analytics Engineers, or Platform Engineers, among others, who operate the infrastructure for storing and analyzing data, generating the results that become a product.

The lifecycle includes identifying consumer needs, defining the product and its contract, building and releasing it, monitoring service and data quality, improving it, and eventually retiring it.

Adoption is one sign of success, but it isn't enough by itself. The product should help consumers achieve a valuable outcome while maintaining quality, availability, security, and sustainable operating cost.

<VidStack src="youtube/7w7_QWPS9L8" />

---

## Data Management Organization

We've covered many capabilities, technologies, and roles. The **Data Management Organization** defines how these people work together, make decisions, and resolve issues across the lifecycle.

Its operating model assigns authority and responsibility, sets forums and workflows, and gives teams a consistent way to resolve problems and deliver value.

### Operating Model

An [<VPIcon icon="fas fa-globe"/>operating model](https://snowflake.com/en/data-governance/models/) organizes decision-making and delivery. In a **centralized model**, one data team handles most of the work. This can improve consistency, but the team may become distant from domain knowledge or turn into a bottleneck.

Another type of operating model is **decentralized**, where each department or area of the organization manages the data within its domain, increasing autonomy but at the cost of a higher risk of inconsistencies and data silos, making global decision-making more difficult.

Data silos refer to sets of information isolated within an area or system, making them inaccessible or very difficult to reach for the rest of the organization.

Many organizations use a **hybrid or federated** model, which seeks to combine the advantages of both approaches. Here, each domain maintains a certain degree of autonomy over its data and is responsible for its quality, documentation, and use, while a central unit establishes governance principles, standards, and policies that must be respected throughout the organization.

For example, a hybrid organizational model at a university could have a central **Data Management Office** led by the CDO, while different domains like Academic Activity, Finance, or Mobility would have their own Data Owners, Data Stewards, and technical teams. If multiple domains need to collaborate, a **Data Governance Council** could assist in decision-making related to this collaboration.

### Roles and Collaboration

The main roles in this context have already been mentioned. But regarding collaboration among them, it's crucial that their responsibilities are clearly defined and documented. This can be formalized through documentation, tools like a **RACI matrix**, Data Contracts, Governance Charters, or by setting up **workflows**.

For proper coordination, technologies like Git repositories are used to collaboratively version their work, data catalogs, platforms similar to Jira for communication, and observability tools. But technology doesn't replace the need for authority, communication, and clear responsibilities.

---

## Data Management Maturity

Organizations differ in how consistently they apply these capabilities. **Data Management Maturity** describes how well practices are embedded, measured, governed, and aligned with organizational goals.

For example, an organization with low maturity would manage data with isolated and ad-hoc actions based on arising needs. As maturity increases, processes and management practices begin to be documented to become standardized, governed, and properly automated. At the highest levels of maturity, a managed approach is adopted, where the management strategy is controlled through quality metrics, audits, and formal risk management.

Maturity focuses not only on the technical aspect but also on the ability to coordinate personnel, their responsibilities, and the tools they use to achieve sustainable results aligned with the organization's strategy.

### Maturity Levels

One illustrative maturity model uses the following levels:

- **Level 0 – No Capability:** There are no organized practices for managing data. Actions are taken as deemed appropriate at the moment.
- **Level 1 – Initial:** Management is assigned to specific professionals, but there's no control over individual actions or collaboration methods.
- **Level 2 – Managed:** Processes, roles, and tools begin to be documented to facilitate the replication and automation of management tasks.
- **Level 3 – Defined:** Policies and standards are formalized and unified across the organization, ensuring all teams work in a coordinated and scalable manner.
- **Level 4 – Measured:** Management is controlled more deeply through audits and metrics to evaluate performance and actively mitigate risks.
- **Level 5 – Optimized:** Teams use measurements, feedback, and appropriate automation to improve management continuously and reduce problems before they affect consumers.

### Assessment and Roadmap

To determine the maturity level and enhance it within your organization, your team can use a **Data Management Maturity Assessment**.

This process begins by defining which data domains and management capabilities are to be evaluated. Evidence is then gathered to analyze the maturity level achieved with these capabilities, examining what is documented, which policies are followed, and so on.

By comparing with a target maturity level, a **roadmap** is developed to reach it, with steps that can vary significantly depending on the specific organization and its current level.

This process is led by the **CDO** or the **Data Governance Office**, with participation from **Data Owners**, **Data Stewards**, and technical teams.

For example, at the university, the **Mobility** domain would be at level 1 if student eligibility for the service were reviewed manually and depended on specific individuals' knowledge. At level 2, responsibilities would be assigned, documentation on the concept of eligibility would begin, and basic validations would be automated.

At level 3, Data Products could unify access to selected mobility information under shared rules. At level 4, dashboards could track quality, availability, usage, cost, fairness, and incidents. At level 5, teams would automate low-risk work where appropriate, keep human review and appeal paths for consequential eligibility decisions, and improve the service continuously through metrics and user feedback.

But the goal doesn't have to be reaching level 5 in all capabilities. The university might require high maturity in security and quality capabilities that protect personal data, while a more experimental analysis of classroom usage that doesn't involve personal data might have a lower target.

<VidStack src="youtube/jXQ9TKeVJkE" />

---

## Conclusions

![The Data Management Ecosystem full diagram. Image by author.](https://cdn.hashnode.com/uploads/covers/66b716b04709012ee58fbbdc/8d2f267f-e8aa-4208-9bf8-a789ded088df.png)

Throughout this book, we've treated Data Management as a coordinated set of capabilities that helps an organization capture, integrate, protect, understand, and use data throughout its lifecycle.

The wider university ecosystem shows the scale of a real organization, while our admissions, academic-activity, and transportation examples make the connections concrete. Even a controlled transportation benefit requires much more than a database: it needs governance, quality, privacy, integration, reliable operations, and careful analysis.

Data doesn't generate value automatically. It becomes useful when people give it context, protect it, make it available to the right consumers, and connect it to a real goal. Technology is the means, not the objective. Databases, pipelines, dashboards, models, and Data Products matter only when they solve a genuine need.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From Data to Value: Understanding Data Management Through a Real World Use Case [Full Book]",
  "desc": "Today, data has become a particularly valuable resource. It allows companies to compete in the market and drive innovation, improving the quality of products and services offered. Data processing lets",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-data-management-with-a-real-world-use-case-book.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
