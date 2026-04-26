---
lang: en-US
title: "How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS"
description: "Article(s) > How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - github
  - cicd
  - ci-cd
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS"
    - property: og:description
      content: "How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-openid-connect-oidc-in-github-actions-for-aws.html
prev: /devops/github/articles/README.md
date: 2026-04-28
isOriginal: false
author:
  - name: Tolani Akintayo
    url: https://freecodecamp.org/news/author/tolani-akintayo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/83b71e24-b63b-42a4-ac1c-d59e226da6c3.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS"
  desc="If you've been storing AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as GitHub Secrets to deploy to AWS, you're not alone. It's the most common approach and it's also one of the biggest security risks i"
  url="https://freecodecamp.org/news/how-to-set-up-openid-connect-oidc-in-github-actions-for-aws"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/83b71e24-b63b-42a4-ac1c-d59e226da6c3.png"/>

If you've been storing `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as GitHub Secrets to deploy to AWS, you're not alone. It's the most common approach and it's also one of the biggest security risks in a CI/CD pipeline.

Here's why: static credentials don't expire on their own. If they get leaked through a misconfigured workflow, a public fork, or a compromised repository, an attacker has persistent access to your AWS environment until you manually rotate them. And most teams don't rotate them often enough.

OpenID Connect (OIDC) solves this entirely. Instead of storing long-lived credentials, GitHub Actions requests a **short-lived token** directly from AWS every time your workflow runs. No secrets to rotate. No credentials to leak. No manual key management.

In this tutorial, you'll learn how to set up OIDC authentication between GitHub Actions and AWS from scratch. By the end, your workflows will authenticate to AWS securely without storing a single access key.

---

## What Is OpenID Connect (OIDC)?

OpenID Connect is an identity protocol built on top of OAuth 2.0. It allows systems to verify identity through tokens rather than shared secrets.

In the context of GitHub Actions and AWS:

- **GitHub** acts as the **identity provider (IdP)**. It issues a signed JWT (JSON Web Token) for each workflow run.
- **AWS** acts as the **service provider**. It validates that token against GitHub's public keys and exchanges it for temporary AWS credentials. The credentials AWS returns are short-lived (valid for up to 1 hour by default) and scoped to exactly the IAM role you define. When the workflow ends, those credentials are gone.

This model is called **federated identity**. It's the same concept used when you "Sign in with Google" on a third-party website. The difference is that instead of a user signing in, your workflow is the one authenticating.

---

## How OIDC Works Between GitHub Actions and AWS

Before writing a single line of YAML, it beneficial to understand the flow. This is my personal approach when implementing new technologies or concepts. Here's what happens every time your workflow runs:

![Diagram showing the OIDC authentication flow between GitHub Actions and AWS](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/8b5b39de-f671-4ffe-a2db-96d10ade69b3.jpg)
<!-- TODO: mermaid화 -->

The diagram illustrates a secure authentication flow between GitHub Actions and AWS using OpenID Connect (OIDC), eliminating the need to store long-lived AWS credentials in GitHub. Here's what happens step-by-step:

### 1. Initial Authentication Request

When your GitHub Actions workflow starts, the runner (the virtual machine executing your workflow) requests a JSON Web Token (JWT) from GitHub's OIDC provider located at `https://token.actions.githubusercontent.com`.

### 2. Token Issuance

GitHub's OIDC provider generates and signs a JWT containing important claims (metadata) about your workflow. These claims include details like which repository the workflow is running from, which branch triggered it, what environment it's running in, and other contextual information that proves the workflow's identity.

### 3. Token Validation

The GitHub Actions runner presents this signed JWT to AWS Security Token Service (STS). AWS STS validates the JWT's signature by checking it against GitHub's publicly available cryptographic keys, ensuring the token is authentic and hasn't been tampered with.

### 4. Trust Policy Verification

AWS STS checks the trust policy configured on your IAM Role. This trust policy specifies which GitHub repositories, branches, or environments are allowed to assume this role. If the claims in the JWT match your trust policy conditions, authentication succeeds.

### 5. Temporary Credentials Issued

Once validated, AWS STS returns temporary security credentials to the GitHub Actions runner. These credentials include an Access Key ID, Secret Access Key, and Session Token that are valid for a limited time (typically 1 hour by default, configurable up to 12 hours).

### 6. AWS API Access

The GitHub Actions runner uses these temporary credentials to authenticate API calls to your AWS resources such as pushing Docker images to ECR, updating ECS services, writing to S3 buckets, or invoking Lambda functions.

::: important The key point

**AWS never sees your GitHub credentials, and GitHub never sees your AWS credentials.** The JWT is the only thing exchanged and it's signed, scoped, and short-lived.

:::

::: note Prerequisites

Before you start, make sure you have the following in place:

- An **AWS account** with IAM permissions to create identity providers and roles
- A **GitHub repository** (public or private) where your workflows will run
- Basic familiarity with **GitHub Actions**, knowing how to write a <VPIcon icon="iconfont icon-yaml"/>`.yml` workflow file
- Basic familiarity with **AWS IAM** roles, policies, and permissions
- The **AWS CLI** installed and configured (optional, but useful for verification). You don't need to be an AWS expert. Each step includes the exact console path and the configuration values you need.

:::

---

## Step 1: Create an IAM OIDC Identity Provider in AWS

The first thing you need to do is tell AWS to trust GitHub as an identity provider. This is a one-time setup per AWS account.

### How to Do It in the AWS Console

1. Open the [<VPIcon icon="fa-brands fa-aws"/>AWS IAM Console](https://console.aws.amazon.com/iam/)
2. In the left sidebar, click Identity providers
3. Click Add provider
4. For Provider type, select OpenID Connect
5. For Provider URL, enter:

```plaintext
https://token.actions.githubusercontent.com
```

6. For Audience, enter:

```plaintext
sts.amazonaws.com
```

7. Click Add provider

![AWS IAM console showing the Add Identity Provider form configured for GitHub Actions OIDC](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/66f1de9d-36f9-462e-ad0c-090b152be6e5.png)

### How to Do It with the AWS CLI

If you prefer the terminal, run this command:

```sh
aws iam create-open-id-connect-provider \
--url https://token.actions.githubusercontent.com \
--client-id-list sts.amazonaws.com \
```

![terminal-oidc-connect-created](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/4b779fa0-0df2-4bc3-bbf4-9839ef8ce5e6.png)

Once created, you'll see `token.actions.githubusercontent.com` listed under **Identity providers** in your IAM console. This provider will be referenced in your IAM role's trust policy in the next step.

![verify oidc connect in AWS](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/eb820487-6553-43d2-b6b7-4e7b08d039ef.png)

---

## Step 2: Create an IAM Role with a Trust Policy

Now you need an IAM role that your GitHub Actions workflow will assume. The trust policy on this role controls which repositories and branches are allowed to request credentials.

### How to Create the IAM Role in the AWS Console

1. Open the [<VPIcon icon="fa-brands fa-aws"/>AWS IAM Console](https://console.aws.amazon.com/iam/)
2. In the left sidebar, click **Roles**
3. Click **Create role**
4. For **Trusted entity type**, select **Web identity**
5. For **Identity Provider**, choose: `token.actions.githubusercontent.com` which you created earlier.
6. For Audience, choose `sts.amazonaws.com` as well
7. For GitHub organisation, enter your GitHub username or organization name
8. For GitHub repository, enter your GitHub repository
9. For GitHub branch, enter your branch name (for example, main)
10. Click Next, then Next, give a name to the role and click create role

![create-iam-role-for-github-action-via-the-console](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/dca12969-db8a-4ec4-885e-e953f4808f6c.png)

Note: Creating the IAM role using this approach already establishes the **Trusted Entities** using a trusted policy based on the step 4-9 above. You can verify this by clicking on the created role and navigating to Trust relationships.

### How to Create the IAM Role with the AWS CLI

First, you'll need to create a trust policy document on your local machine: You can call it <VPIcon icon="iconfont icon-json"/>`trust-policy.json`:

```json title="trust-policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/YOUR_REPO_NAME:*"
        }
      }
    }
  ]
}
```

Replace the following placeholders before saving:

| Placeholder | Replace With |
| --- | --- |
| `YOUR_ACCOUNT_ID` | Your 12-digit AWS account ID |
| `YOUR_GITHUB_ORG` | Your GitHub username or organization name |
| `YOUR_REPO_NAME` | The name of your GitHub repository |

### How to Understand the `sub` Condition

The `sub (subject)` claim in the JWT tells AWS exactly where the request is coming from. The value `repo:your-org/your-repo:*` means any branch in that repository can assume this role.

You can tighten this further depending on your needs:

```sh
# Only the main branch
"token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main"
 
# Only a specific GitHub Environment
"token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:environment:production"
```

Scoping this correctly is one of the most important security decisions in this setup. Here's how to decide:

- Use `ref:refs/heads/main` if only your main/production branch should deploy to AWS. This is the most restrictive and secure option: feature branches can't accidentally (or maliciously) trigger deployments or modify production resources.
- Use `environment:production` if you're using GitHub Environments with protection rules (required reviewers, deployment gates). This lets you control deployments through GitHub's approval workflow while still restricting which workflows can access AWS.
- Use `repo:your-org/your-repo:*` (wildcard) only if you need any branch to deploy. for example, in development environments where every feature branch deploys to its own isolated stack. Never use this for production roles.

Run this command to create the role using your trust policy:

```sh
aws iam create-role \
--role-name GitHubActionsOIDCRole \
--assume-role-policy-document file://trust-policy.json \
--description "Role assumed by GitHub Actions via OIDC"
```

Take note of the **Role ARN** in the output. It will look like this:

```plaintext
arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsOIDCRole
```

You'll need this ARN in your workflow YAML in Step 4.

![terminal output of the AWS CLI create-role command showing the returned Role ARN](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/6bb154e7-0fb3-4c58-94e1-90116eaea95a.png)

---

## Step 3: Attach Permissions to the IAM Role

The IAM role can now authenticate, but it has no permissions yet. You need to attach a policy that defines what your workflow is actually allowed to do in AWS.

### How to Apply the Principle of Least Privilege

Only grant the permissions your workflow genuinely needs. If your workflow deploys to S3, give it S3 permissions. If it pushes images to ECR, give it ECR permissions. Never attach `AdministratorAccess` to a CI/CD role.

#### Option 1: Attach an AWS managed policy (quick start):

```sh
aws iam attach-role-policy \
--role-name GitHubActionsOIDCRole \
--policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
```

#### Option 2: Create a custom policy scoped to a specific S3 bucket (recommended for production):

This approach is recommended for production because it limits the blast radius of a security incident. If your workflow credentials are ever compromised, a custom policy scoped to a specific bucket means an attacker can only affect that single bucket not every S3 bucket in your AWS account. It also prevents accidental misconfigurations in your workflow from impacting unrelated resources.

Create a file called <VPIcon icon="iconfont icon-json"/>`s3-deploy-policy.json`:

```json title="s3-deploy-policy.json"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

Then create and attach it:

```sh
aws iam create-policy \
--policy-name GitHubActionsS3DeployPolicy \
--policy-document file://s3-deploy-policy.json
 
aws iam attach-role-policy \
--role-name GitHubActionsOIDCRole \
--policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/GitHubActionsS3DeployPolicy
```

Note: You can as well implement **Step 3** via the console.

::: info Reference

For a full list of available AWS IAM actions, see the [<VPIcon icon="fa-brands fa-aws"/>AWS IAM actions reference](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html).

```component VPCard
{
  "title": "Actions, resources, and condition keys for AWS services - Service Authorization Reference",
  "desc": "Lists all of the available actions, resources, and condition context keys that can be used in IAM policies to control access to AWS services.",
  "link": "https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

:::

---

## Step 4: Store the Role ARN as a GitHub Actions Variable

Before you configure your workflow, you need to make the Role ARN available to it. You'll store it as a repository variable in GitHub, not a secret, because the ARN itself isn't sensitive data.

### How to Add the Variable in Your Repository

1. Open your GitHub repository and click **Settings:**

![GitHub repository top navigation bar with the Settings tab highlighted](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/b2dd526a-00ca-44eb-8d22-b78dfd220a14.png)

1. In the left sidebar, scroll down to **Secrets and variables**, then click **Actions:**

![GitHub repository settings sidebar showing Secrets and variables expanded with Actions selected](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/61d67c83-7bbc-4570-93ec-f2ee4207ad6e.png)

1. Click the **Variables** tab (not Secrets)
2. Click **New repository variable**
3. You can set the **Name** to:

```plaintext
AWS_ROLE_ARN
```

4. Set the **Value** to your Role ARN from Step 2, for example:

```plaintext
arn:aws:iam::YOUR_ACCOUNT_ID::role/GitHubActionsOIDCRole
```

5. Click **Add variable**

![GitHub repository Actions variables tab showing AWS_ROLE_ARN variable added successfully](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/71f5468d-d4ab-45c1-aecd-8509f575237a.png)

You'll reference this variable in your workflow in the next step using `${{` `vars.AWS_ROLE_ARN }}`.

---

## Step 5: Configure Your GitHub Actions Workflow

With AWS and GitHub fully configured, you now need to update your workflow to request an OIDC token and use it to authenticate.

### How to Set the Required Workflow Permissions

Your workflow **must** declare `id-token: write`. Without this, GitHub won't issue an OIDC token to the runner.

```yaml
permissions:
  id-token: write   # Required to request the OIDC JWT
  contents: read    # Required to checkout the repository
```

::: important

If you set permissions at the job level, they override any top-level permissions. Make sure `id-token: write` is present at whichever level your AWS authentication step runs.

:::

### Full Workflow Example

Here's a complete workflow that authenticates to AWS using OIDC and deploys a static site to S3:

```yaml :collapsed-lines
name: Deploy to AWS S3
 
on:
  push:
    branches:
      - main
 
permissions:
  id-token: write
  contents: read
 
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
 
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
 
      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_ARN }}
          aws-region: us-east-2
 
      - name: Verify AWS identity
        run: aws sts get-caller-identity
 
      - name: Deploy to S3
        run: |
          aws s3 sync ./code s3://your-bucket-name
```

Replace the following before committing:

| Placeholder | Replace With |
| --- | --- |
| `AWS_ROLE_ARN` | The variable name for your IAM role ARN in GitHub |
| `us-east-2` | Your target AWS region |
| `your-bucket-name` | Your S3 bucket name |
| `./code` | The local directory where the file you want to sync to S3 is located |

You can see the code sample in my GitHub Repo [here (<VPIcon icon="iconfont icon-github"/>`tolani-akintayo/OpenID-Connect-in-GitHub-Actions-for-AWS`)](https://github.com/tolani-akintayo/OpenID-Connect-in-GitHub-Actions-for-AWS).

::: note

The `aws-actions/configure-aws-credentials` action handles the entire OIDC token exchange automatically. It requests the JWT from GitHub, calls `sts:AssumeRoleWithWebIdentity`, and exports the temporary credentials as environment variables for the rest of the job.

See the [action's official documentation (<VPIcon icon="iconfont icon-github"/>`aws-actions/configure-aws-credentials`)](https://github.com/aws-actions/configure-aws-credentials) for all available options.

:::

---

## Step 6: Run and Verify Your Workflow

Push your workflow to the <VPIcon icon="fas fa-code-branch"/>`main` branch and open the **Actions** tab in your repository to watch it run.

### What a Successful Run Looks Like

The Configure AWS credentials via OIDC step should show:

```plaintext
Assuming role with OIDC: arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsOIDCRole
```

The Verify AWS identity step (`aws sts get-caller-identity`) should return:

```json
{
  "UserId": "AROA...:GitHubActions",
  "Account": "YOUR_ACCOUNT_ID",
  "Arn": "arn:aws:sts::YOUR_ACCOUNT_ID:assumed-role/GitHubActionsOIDCRole/GitHubActions"
}
```

If you see an `assumed-role` ARN in the output, OIDC is working correctly. Your workflow is now authenticating to AWS without a single stored credential.

---

## Security Best Practices

Getting OIDC working is step one. Locking it down properly is step two.

### Scope the `sub` Condition as Tightly as Possible

Don't use a wildcard like `repo:your-org/*:*` that allows any repository in your organization to assume the role. Scope it to the exact repository and branch that needs access.

```json
"token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:ref:refs/heads/main"
```

### Use GitHub Environments for Production Deployments

GitHub Environments let you add manual approval gates and restrict which branches can deploy. When combined with OIDC, you can scope your trust policy to only allow the `production` environment:

```json
"token.actions.githubusercontent.com:sub": "repo:your-org/your-repo:environment:production"
```

### Apply Least-Privilege Permissions to Every IAM Role

Never attach `AdministratorAccess` or `PowerUserAccess` to a role used by CI/CD. Define a custom policy with only the actions your workflow actually needs.

### Create Separate IAM Roles Per Environment

A staging role and a production role should have different permission scopes. Your staging deployment role should never have write access to production resources.

### Enable AWS CloudTrail

Every call made using the temporary credentials is logged in CloudTrail under the assumed role ARN. This gives you a full audit trail of exactly what your workflow did in AWS.

::: info Reference

GitHub's official security hardening guide for OIDC: [<VPIcon icon="iconfont icon-github"/>About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)

<SiteInfo
  name="OpenID Connect - GitHub Docs"
  desc="OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider."
  url="https://docs-internal.github.com/en/actions/concepts/security/openid-connect/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>


:::

---

## Troubleshooting Common Errors

### Error: `Not authorized to perform sts:AssumeRoleWithWebIdentity`

This usually means the trust policy on your IAM role doesn't match the `sub` claim in the JWT.

Check the following:

- The `sub` condition exactly matches your repository path (it is case-sensitive)
- The `aud` condition is set to `sts.amazonaws.com`
- The `Federated` principal uses the correct AWS account ID

To inspect the actual token claims your workflow is receiving, add this debug step temporarily:

```yaml
- name: Print OIDC token claims
  run: |
    TOKEN=\((curl -s -H "Authorization: Bearer \)ACTIONS_ID_TOKEN_REQUEST_TOKEN" \
      "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=sts.amazonaws.com" | jq -r '.value')
    echo $TOKEN | cut -d '.' -f2 | base64 -d 2>/dev/null | jq .
```

### Error: `Could not load credentials from any providers`

This almost always means `id-token: write` is missing from your workflow permissions. Double-check that you have:

```yaml
permissions:
  id-token: write
  contents: read
```

### Error: `AccessDenied` When Calling an AWS Service

Authentication succeeded but the IAM role doesn't have permission to perform the action your workflow is attempting. Check the permissions policy attached to your role and compare it against the specific action in the error message.

---

## Conclusion

You've gone from storing static, long-lived AWS credentials in GitHub Secrets to a fully keyless authentication setup using OIDC. Here's what you accomplished:

- Registered GitHub as a trusted OIDC identity provider in AWS.
- Created an IAM role with a scoped trust policy tied to a specific repository.
- Attached least-privilege permissions to that role.
- Configured your GitHub Actions workflow to request and use short-lived AWS credentials.
- Verified the authentication flow end-to-end.

This pattern works across every AWS service from S3, ECS, Lambda, ECR, Secrets Manager, and more. The workflow example here uses S3, but you only need to swap out the permissions policy and the deployment commands to adapt it for any service.

If you want to go further, explore:

<SiteInfo
  name="OpenID Connect - GitHub Docs"
  desc="OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider."
  url="https://docs-internal.github.com/en/actions/concepts/security/openid-connect/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

<SiteInfo
  name="Managing environments for deployment - GitHub Docs"
  desc="You can create environments and secure those environments with deployment protection rules. A job that references an environment must follow any protection rules for the environment before running or accessing the environment's secrets."
  url="https://docs-internal.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

```component VPCard
{
  "title": "Using AWS Identity and Access Management Access Analyzer - AWS Identity and Access Management",
  "desc": "Learn about how AWS Identity and Access Management Access Analyzer analyzes resource-based policies to identify unintended access.",
  "link": "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

::: info

If you're building out your DevOps practice and want a complete, production-ready reference for infrastructure automation, CI/CD, and platform engineering, check out [<VPIcon icon="fas fa-globe"/>The Startup DevOps Field Guide](https://coachli.co/tolani-akintayo/PR-H4oQS). It covers the patterns, templates, and runbooks I've used across real AWS environments.

You can also connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tolani-akintayo`)](https://linkedin.com/in/tolani-akintayo)

:::

::: info References

<SiteInfo
  name="OpenID Connect - GitHub Docs"
  desc="OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider."
  url="https://docs-internal.github.com/en/actions/concepts/security/openid-connect/"
  logo="/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

<SiteInfo
  name="Configuring OpenID Connect in Amazon Web Services - GitHub Docs"
  desc="Use OpenID Connect within your workflows to authenticate with Amazon Web Services."
  url="https://docs-internal.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

```component VPCard
{
  "title": "Create an OpenID Connect (OIDC) identity provider in IAM - AWS Identity and Access Management",
  "desc": "Create an OpenID Connect (OIDC) identity provider that describes a trust relationship between an OIDC-compatible IdP and AWS.",
  "link": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "AssumeRoleWithWebIdentity - AWS Security Token Service",
  "desc": "Returns a set of temporary security credentials for users who have been authenticated in a mobile or web application with a web identity provider. Example providers include the OAuth 2.0 providers Login with Amazon and Facebook, or any OpenID Connect-compatible identity provider such as Google or",
  "link": "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

<SiteInfo
  name="aws-actions/configure-aws-credentials: Configure AWS credential environment variables for use in other GitHub Actions."
  desc="Configure AWS credential environment variables for use in other GitHub Actions. - aws-actions/configure-aws-credentials"
  url="https://github.com/aws-actions/configure-aws-credentials/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/da534127a782c945a88347676e6b5125df12b715179665352d1ab7d9a2fb65b0/aws-actions/configure-aws-credentials"/>

```component VPCard
{
  "title": "Actions, resources, and condition keys for AWS services - Service Authorization Reference",
  "desc": "Lists all of the available actions, resources, and condition context keys that can be used in IAM policies to control access to AWS services.",
  "link": "https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "What Is AWS CloudTrail? - AWS CloudTrail",
  "desc": "This page describes CloudTrail as a service and provides general information about CloudTrail event history, CloudTrail trails, and CloudTrail Lake event data stores.",
  "link": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up OpenID Connect (OIDC) in GitHub Actions for AWS",
  "desc": "If you've been storing AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY as GitHub Secrets to deploy to AWS, you're not alone. It's the most common approach and it's also one of the biggest security risks i",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-openid-connect-oidc-in-github-actions-for-aws.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
