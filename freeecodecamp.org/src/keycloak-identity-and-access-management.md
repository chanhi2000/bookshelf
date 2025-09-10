---
lang: en-US
title: "How to Use Keycloak for Identity and Access Management"
description: "Article(s) > How to Use Keycloak for Identity and Access Management"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - security
  - sec
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Keycloak for Identity and Access Management"
    - property: og:description
      content: "How to Use Keycloak for Identity and Access Management"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/keycloak-identity-and-access-management.html
prev: /devops/security/articles/README.md
date: 2025-01-23
isOriginal: false
author:
  - name: David Clinton
    url : https://freecodecamp.org/news/author/dbclinton/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737640179567/36b76fb3-3e9f-4124-a4d5-bb7d11428a6c.png
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
  "title": "Dockers > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Keycloak for Identity and Access Management"
  desc="Whether your deployment requires logins from hundreds of thousands of end users or just a few remote admins, there's no escaping the need to properly control access to your infrastructure. And integrating those logins with industry-standard tools lik..."
  url="https://freecodecamp.org/news/keycloak-identity-and-access-management"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737640179567/36b76fb3-3e9f-4124-a4d5-bb7d11428a6c.png"/>

Whether your deployment requires logins from hundreds of thousands of end users or just a few remote admins, there's no escaping the need to properly control access to your infrastructure. And integrating those logins with industry-standard tools like LDAP and Active Directory can cut down the amount of work it'll take to get yourself up and running.

Keycloak is an enterprise-ready, open source identity access management (IAM) solution that's scalable, extensible, and robust. And it really doesn't need all that much care and feeding to launch a simple implementation.

This article will introduce you to the technology and the ways it can integrate best-practice authentication into your infrastructure.

::: note Note on Hitachi Contributions to Keycloak

Takashi Norimatsu works for Hitachi and has been the official maintainer of Keycloak since late 2021. Hitachi has been actively contributing to Keycloak since at least 2018. [<VPIcon icon="fas fa-globe"/>Hitachi appears to be doing more strategically with open source in general](https://hitachi.com/New/cnews/month/2024/11/241108.html) and Keycloak in particular. I believe strong, continued corporate support as part of an open source project is a positive sign, but at the very least, you should be aware of the corporate support for Keycloak during your assessment.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737406737359/1fc95289-7777-4c9f-a651-00bd8a44b517.png)

:::

---

## Getting Started with Keycloak

I'll begin with a brief "quick start". As you can see from this screenshot, Keycloak will run happily on multiple platforms. And their [product documentation is excellent](https://keycloak.org/guides).

![a84122e2-1e72-43a8-86f2-aeaddd0c3a3b](https://cdn.hashnode.com/res/hashnode/image/upload/v1737406768154/a84122e2-1e72-43a8-86f2-aeaddd0c3a3b.png)

But here's some very simple one-command Docker syntax that will create a fully-functioning live Keycloak instance on your local machine:

```bash
docker run -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.0.7 start-dev
```

That's it. After a minute or two, you can open the administration interface on your browser using the appropriate variation of:

```plaintext title="url"
localhost:8080
```

Based on the Docker command defaults, you'll log in using admin and admin. Spend a few minutes digging into the environment to get a feel for the tools that are available.

---

## What Keycloak Offers

Ok. So why do you need Keycloak? Because it supports all the functionality demanded by modern deployments. That'll include Single Sign-On (SSO) to allow seamless authentication across multiple applications and services, OAuth2, OpenID Connect, SAML protocol compliance, and federated identities using existing LDAP or Active Directory setups or through social media logins like Google.

Keycloak incorporates the use of Multi-factor Authentication (MFA), built-in token revocation and expiration mechanisms, fine-grained permission management through Role-based Access Control (RBAC), and end-to-end encryption for sensitive communications. GDPR, HIPAA, and PCI DSS compliance are all possible.

Keycloak comes with a RESTful API for scripted and programmatic interactions. That will encourage task automation to further optimize your authentication processes. And your developers can build their own custom plugins to fill any usability gaps you encounter.

---

## The Business Case for Keycloak

Because Keycloak is open source, there'll be no license fees to worry about. But open source gives you a lot more than just "cheap".

Keycloak cuts out vendor lock-in, allowing you to work with any platform or cloud provider - or move between them whenever necessary. It can also reduce overall operational costs through its simplified deployments (how much time did it take you to get that Docker image up and running?), automated updates, and no limits or cost penalties for even millions of monthly API calls or active users.

Having out-of-the-box (and free) access to the full feature set (including RBAC and MFA) also simplifies planning and execution. There's nothing "more" efficient than having to wait a week to access paywalled functionality until you get a response to your request for more project funding. All Keycloak features are just a click away.

This radar chart illustrates the feature and functionality differences between Keycloak and its major commercial peers.

![Differences between Keycloak, Okta, Auth0, and Azure AD](https://cdn.hashnode.com/res/hashnode/image/upload/v1737407002045/d9a45f49-afbb-4709-a9da-016782d7c6ae.png)

### What to Consider

As much as Keycloak has to offer, it won't be the ideal choice for every use-case. And there are issues about which you should be aware up front.

For instance, while getting started may be easy, fully configuring, say, clustering and high availability for Keycloak can be complex for teams without experience in identity management. Managing latency issues for very large deployments can be challenging.

And while the documentation is generally excellent, it may not fully address specific complexities or edge-case scenarios. Similarly, there's no resource within the Keycloak community that offers guaranteed support. Although there are excellent third-party providers out there.

It's possible that, because you're not working with a commercial product, demonstrating regulatory compliance could be a bit more involved. You may also need to adapt your logging functionality to comply with various audit trail requirements.

Finally, customizable environments risk introducing destabilizing complexity. The further off the beaten trail your plugins and API implementations wander, the greater the odds that something will eventually break - especially around version upgrades.

---

## Your Next Steps

It's always helpful to explore the journeys other people took with a new technology.

So [<VPIcon icon="fa-brands fa-redhat"/>this page](https://redhat.com/en/blog/keycloak-success-stories-from-the-openshift-commons-gathering-amsterdam-2023) includes information on a fascinating case study involving a Japanese bank that was looking for an API solution and decided on Keycloak because of its high level API security features. Yuichi Nakamura’s presentation [<VPIcon icon="fa-brands fa-youtube"/>at the OpenShift Commons event in 2023](https://youtu.be/jH7-tyrUP9E?t=490) gives details how the bank successfully used Keycloak to secure their APIs. Nakamura, Hitachi Chief OSS Strategist, has recently been appointed as Head of Hitachi Open Source Program Office (OSPO).

And [<VPIcon icon="fas fa-globe"/>this is an account](https://hossted.com/knowledge-base/case-studies/infrastructure-and-network/security/enhancing-authentication-services-with-freeipa-and-keycloak/) of a university that implemented Kerberos Single Sign-On (SSO) for FreeIPA and configured Keycloak to connect with FreeIPA. The university successfully achieved user authentication from Keycloak by leveraging the SSSD option under “user federation” instead of relying on Kerberos or LDAP.

I’m no stranger to Keycloak myself, having taught a <VPIcon icon="fas fa-globe"/>[Getting Started with Keycloak course on Pluralsight](https://pluralsight.com/courses/keycloak-getting-started). For beginners, this may be a good place to start. A 10 day free trial is available.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Keycloak for Identity and Access Management",
  "desc": "Whether your deployment requires logins from hundreds of thousands of end users or just a few remote admins, there's no escaping the need to properly control access to your infrastructure. And integrating those logins with industry-standard tools lik...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/keycloak-identity-and-access-management.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
