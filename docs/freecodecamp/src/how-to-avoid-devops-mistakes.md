---
lang: en-US
title: "Common DevOps Mistakes and How to Avoid Them — Tips for Startups"
description: "Article(s) > Common DevOps Mistakes and How to Avoid Them — Tips for Startups"
icon: fas fa-network-wired
category:
  - Git
  - Python
  - DevOps
  - AWS
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - git
  - py
  - python
  - devops
  - aws
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Common DevOps Mistakes and How to Avoid Them — Tips for Startups"
    - property: og:description
      content: "Common DevOps Mistakes and How to Avoid Them — Tips for Startups"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-devops-mistakes.html
prev: /devops/articles/README.md
date: 2026-05-15
isOriginal: false
author:
  - name: Tolani Akintayo
    url: https://freecodecamp.org/news/author/tolani-akintayo/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/6fcabd5e-272f-4f1d-b035-8241896e8296.png
---

# {{ $frontmatter.title }} 

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "DevOps > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="Common DevOps Mistakes and How to Avoid Them — Tips for Startups"
  desc="Most DevOps engineers don't fail because they lack knowledge about tools. They fail because nobody told them what not to do before they got into production. Startup environments make this worse. The p"
  url="https://freecodecamp.org/news/how-to-avoid-devops-mistakes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/6fcabd5e-272f-4f1d-b035-8241896e8296.png"/>

Most DevOps engineers don't fail because they lack knowledge about tools. They fail because nobody told them what *not* to do before they got into production.

Startup environments make this worse. The pressure to ship fast, the small team sizes, and the absence of senior engineers to review your decisions means mistakes happen quietly until they become outages, data loss events, or security incidents that cost the company thousands of dollars and weeks of recovery time.

This article is a direct breakdown of the ten most costly DevOps mistakes engineers make early in their careers at startups. For each mistake, you will get the real-world scenario, the business impact, and the concrete fix you can apply immediately.

Whether you are setting up your first production environment or auditing an existing one, this guide will help you build systems that are reliable, secure, and aligned with what the business actually needs.

::: note Who This Article Is For

- **Early-career DevOps and cloud engineers** who are building or maintaining production infrastructure at a startup.
- **Backend developers** who have recently taken on DevOps responsibilities.
- **Engineers joining a startup** who want to understand what operational discipline actually looks like in a fast-moving environment.

You do not need to be an expert in any specific tool to follow this article. The focus is on decision-making patterns and operational discipline, not tool configuration.

:::

## Why Startups Are a Different Environment

Before getting into the mistakes, you have to understand why startups produce them in the first place.

![diagram showing the startup DevOps reality, a single engineer handling infra, CI/CD, security, monitoring, and deployment pipelines simultaneously](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/f9bec1fa-8938-4144-b934-9e5af4edf4ad.svg)
<!-- TODO: mermaid화 -->

In a large company, you typically have dedicated security engineers, an SRE team, a platform team, and multiple reviewers for every infrastructure change. In a startup, you mostly likely have one engineer responsible for all of that simultaneously.

This creates four specific pressure points:

1. **Speed pressure.** The business needs features shipped now. Operational discipline gets treated as optional because nobody is watching closely yet.
2. **Budget constraints.** Every infrastructure decision has a direct impact on company runway. Engineers optimize for the cheapest option rather than the most reliable one.
3. **Absent guardrails.** There is no senior engineer reviewing your Terraform plans. There is no security audit before launch. The absence of immediate consequences can make bad decisions feel like good ones.
4. **Constantly changing requirements.** The architecture you design today may need to support a completely different product in six months. None of these pressures are excuses for poor decisions. But understanding them helps you see why the following mistakes happen so consistently.

---

## Mistake 1: Deploying Without Understanding What You're Deploying

::: info The Scenario

A junior engineer is asked to deploy the company's Node.js API to AWS. They find a tutorial for Elastic Beanstalk, follow it, and it works. Two weeks later, traffic increases. They try to scale "the same way as in the tutorial." The application goes down. They cannot debug it because they never understood what the deployment was actually doing.

:::

:::

::: note The Business Impact

When production breaks and the person who deployed the system cannot explain how it works, diagnosis takes hours instead of minutes. The longer the incident runs, the higher the cost in customer trust, team morale, and potentially direct revenue loss.

:::

::: details The Fix

Before you deploy anything to production, you should be able to answer these five questions in writing:

1. **What compute type is running my code?** (EC2, Lambda, Fargate, container?)
2. **How does a new version replace the old one?** (Rolling? Blue/green? All-at-once?)
3. **Where does configuration and secrets come from?** (SSM? Secrets Manager? Environment file?)
4. **What downstream services depend on this?** (Database connections? Other APIs? Cache?)
5. **How do I roll back in under five minutes if this breaks?**

If you cannot answer all five, do not deploy until you can. The tutorial that got it running is not the documentation for how it operates.

> "It is better to spend two hours understanding a system before deploying it than two days debugging it after something breaks."

Personally, when learning a new technology, tool, or implementing something I have not worked with before, I usually focus on three core questions: What, Why, and How.

- **The first question is: What is this technology or concept about?**<br/>This helps me build a solid foundation by doing deep research, studying the official documentation, understanding the core principles, and sometimes even learning the history behind the tool or technology. I believe having a well-grounded understanding before implementation is very important.
- **The second question is: Why do we need it?**<br/>I try to understand the value the technology brings, why it should be implemented, what problem it solves, and how it benefits the team or organization. This helps me make informed technical decisions instead of just implementing tools without understanding their purpose.
- **The third question is: How should it be implemented?**<br/>There are usually multiple approaches to solving a problem or implementing a technology, so I focus on understanding the best and most practical approach based on the use case and expected outcome.

This structured approach has helped me learn new technologies quickly, adapt fast, and implement solutions effectively in real-world environments.

:::

---

## Mistake 2: Using Production as a Development Environment

::: info The Scenario

To save time, an engineer tests a new deployment script directly in the production AWS account. They accidentally run a command that terminates the production database instance. Automated backups exist but were misconfigured. Six hours of customer data is unrecoverable.

This scenario happens more often than you would expect. The reasoning is always the same: "It will only take a minute."

:::

::: note The Business Impact

A single test-in-production incident can result in data loss, hours of downtime, and a customer communication crisis. In a startup, that can permanently damage the company's reputation before it has had the chance to build one.

:::

::: details The Fix

You need at minimum three separate environments and ideally three separate AWS accounts:

| Environment | Purpose | Access Level |
| --- | --- | --- |
| **dev** | Break things freely. No real data. | Engineers have broad access |
| **staging** | Mirror of production. Final verification. | Controlled access |
| **production** | Real customers. Real data. | MFA required. No manual deployments. |

Using separate AWS accounts (not just separate VPCs) gives you account-level isolation. A permission error in the dev account cannot accidentally touch production infrastructure at the API level.

Infrastructure as Code (Terraform or CloudFormation) makes this affordable, you write the configuration once and apply it three times with different variable files.

```hcl title="terraform/environments/prod/main.tf"
module "app" {
  source      = "../../modules/app"
  environment = "production"
  instance_type = "t3.medium"
  db_instance_class = "db.t3.medium"
  multi_az          = true
}
```

```hcl title="terraform/environments/staging/main.tf"
module "app" {
  source      = "../../modules/app"
  environment = "staging"
  instance_type = "t3.small"
  db_instance_class = "db.t3.small"
  multi_az          = false
}
```

The module is the same. The environment-specific variables are different. Separate environments are not a luxury, they are the minimum operating standard for any team running real software.

:::

---

## Mistake 3: Hardcoding Secrets and Credentials

::: info The Scenario

A new engineer joins a startup and clones the repository. Inside they find a <VPIcon icon="iconfont icon-dotenv"/>`.env` file committed to Git containing the production database password, the Stripe secret key, and an AWS access key with admin permissions. The repository has been public for six months.

GitHub's automated secret scanning never triggered because the secrets were inside a <VPIcon icon="iconfont icon-dotenv"/>`.env` file rather than raw in the code. The credentials had been valid and actively used for over six months.

:::

::: note The Business Impact

Automated scanners run by attackers find exposed credentials within minutes of them being pushed to a public repository. A single exposed AWS access key with admin permissions can result in:

- Crypto-mining workloads generating thousands of dollars in cloud bills overnight
- Complete exfiltration of customer data from every S3 bucket
- Privilege escalation: the attacker creates new admin users and locks you out of your own account
- AWS account suspension while the investigation runs

According to [<VPIcon icon="iconfont icon-github"/>GitHub's annual security report](https://github.blog/security/vulnerability-research/securing-millions-of-developers-together/), millions of secrets are exposed in public repositories every year. The average time to detect a compromised cloud credential is 197 days.

:::

::: details The Fix

**Step 1: Never commit secrets to Git.** Not temporarily. Not in a branch. Not in a private repository.

**Step 2: Add** <VPIcon icon="iconfont icon-git"/>`.gitignore` **before you create the first file.** Check in the <VPIcon icon="iconfont icon-git"/>`.gitignore` with the first line of code before any <VPIcon icon="iconfont icon-dotenv"/>`.env` files exist.

```plaintext title=".gitignore"
.env
.env.*
*.pem
*.key
secrets/
```

**Step 3: Use AWS Secrets Manager or SSM Parameter Store for all production secrets.** Your application reads secrets at runtime:

```py
# Python example — fetch secret at runtime, never at build time
import boto3
import json
 
def get_secret(secret_name: str, region: str = "us-east-1") -> dict:
    client = boto3.client("secretsmanager", region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])
 
# Usage
db_config = get_secret("prod/myapp/database")
DATABASE_URL = db_config["connection_string"]
```

**Step 4: Scan your existing repositories immediately.** You may already have a problem:

```sh
# Install trufflehog to scan for exposed secrets in your repo history
pip install trufflehog
 
# Scan the entire commit history of your repository
trufflehog git file://.
 
# Or scan a remote GitHub repo
trufflehog github --repo https://github.com/your-org/your-repo
```

**Step 5: Add a pre-commit hook to prevent future accidents:**

```sh
pip install pre-commit
```

```yaml title=".pre-commit-config.yaml"
repos:
  - repo: https://github.com/awslabs/git-secrets
    rev: master
    hooks:
      - id: git-secrets
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
```

```sh
pre-commit install
# Now the hook runs before every commit and blocks detected secrets
```

There is no recovery from a publicly exposed database password. The fix takes ten minutes upfront. The incident takes weeks.

:::

---

## Mistake 4: Overengineering for Problems You Don't Have Yet

::: info The Scenario

A five-person startup with 200 users decides to build a microservices architecture on Kubernetes because "Netflix uses it." They spend three months setting up Kubernetes, Istio service mesh, ArgoCD, Vault, Prometheus, and Grafana. Their product has not shipped a new feature in three months. A competitor with a monolith on a single EC2 instance shipped twelve new features in the same period.

:::

::: note The Business Impact

Every layer of infrastructure you add is a layer that can break, a layer that requires expertise to operate, and a layer that slows down every future change. Kubernetes is the right answer for organizations with the scale and team size to operate it. For a five-person startup, it is an expensive distraction.

Premature complexity does not just cost engineering time. It costs the competitive advantage that speed provides in the early stage.

:::

::: details The Fix

Match your infrastructure to your actual stage:

| Scale | Right Infrastructure | Cost Range |
| --- | --- | --- |
| **1–1,000 users** | Single EC2 + RDS + Nginx reverse proxy | $20–50/month |
| **1K–50K users** | Auto-scaling group, RDS Multi-AZ, ALB, basic CI/CD | $200-500/month |
| **50K–500K users** | ECS Fargate, RDS read replicas, ElastiCache, full observability | $1K-5K/month |
| **500K+ users** | Multi-region, managed Kubernetes, dedicated SRE | $10K+/month |

The question to ask before every infrastructure decision is: **"What specific, measurable problem does this solve today that my current setup cannot solve?"**

Amazon, Netflix, and Uber did not start with microservices. They started with monoliths and extracted services only when the monolith became the actual bottleneck. You are not Netflix. You are solving the problems in front of you today.

Use managed services wherever possible, RDS instead of self-hosted Postgres, Fargate instead of self-managed Kubernetes, ElastiCache instead of self-hosted Redis. Managed services let your team focus on the product instead of the infrastructure.

:::

---

## Mistake 5: No Observability Before Launch

::: info The Scenario

A startup's checkout flow breaks on a Friday evening. Users are abandoning their carts and the company is losing revenue. The DevOps engineer finds out 45 minutes later because a customer sent a direct message to the CEO on Twitter.

The engineer has no dashboards, no log aggregation, and no alerting. They SSH into the production server and scroll through raw log files. Two hours later, they find the issue: a database connection pool was exhausted by a memory leak introduced in that morning's deployment.

### Business Impact

Without observability:

- You find out about production problems from users, not from your systems
- Incidents take 10x longer to resolve because diagnosis is guesswork
- You cannot tell whether a deployment improved or degraded performance
- You have no data for making better architecture decisions

:::

::: details The Fix

Implement the four golden signals before any service goes to production. These come from [<VPIcon icon="fa-brands fa-google"/>Google's Site Reliability Engineering book](https://sre.google/sre-book/monitoring-distributed-systems/):

1. **Latency**: How long requests take to complete (p50, p95, p99)
2. **Traffic**: How many requests per second the system is handling
3. **Errors**: The rate of failed requests (5xx responses per minute)
4. **Saturation**: How close the system is to its limits (CPU, memory, connection pool)

Here is a minimal CloudWatch alarm setup using the AWS CLI:

```sh
# Alert when error rate exceeds 1% for 5 consecutive minutes

aws cloudwatch put-metric-alarm \
--alarm-name "high-error-rate-production" \
--alarm-description "Error rate exceeded 1% for 5 minutes" \
--metric-name "5XXError" \
--namespace "AWS/ApplicationELB" \
--statistic "Average" \
--period 60 \
--evaluation-periods 5 \
--threshold 0.01 \
--comparison-operator "GreaterThanOrEqualToThreshold" \
--alarm-actions "arn:aws:sns:us-east-1:123456789:pagerduty-production" \
--dimensions Name=LoadBalancer,Value=app/my-alb/1234567890abcdef
```

Every application should also expose a `/health` endpoint that returns `200 OK` when healthy:

```py
# FastAPI example

from fastapi import FastAPI
from sqlalchemy import text
 
app = FastAPI()
 
@app.get("/health")
async def health_check():
    # Check database connectivity
    try:
        db.execute(text("SELECT 1"))
        db_status = "healthy"
    except Exception:
        db_status = "unhealthy"
 
    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status,
        "version": os.getenv("APP_VERSION", "unknown")
    }
```

Your load balancer checks this endpoint. Your uptime monitor checks it. You check it after every deployment.

> You do not get to say a system is working unless you have data to prove it. "Nobody complained" is not the same as "nothing is broken."

:::

---

## Mistake 6: Treating Security as a Final Step

::: info The Scenario

A startup rushes to launch their MVP. Security reviews are "planned for after launch." Six months later, a potential enterprise customer requires a security audit before signing a contract. The audit reveals:

- S3 buckets publicly accessible by default
- EC2 instances with port 22 open to `0.0.0.0/0`
- IAM users with `AdministratorAccess` for the entire team
- No encryption on the database at rest
- JWT secrets hardcoded in environment variables The audit fails. The enterprise deal worth $120,000 annually is lost. Remediation takes four weeks of engineering time.

:::

::: note The Business Impact

Security debt is the most expensive technical debt you can accumulate. Unlike performance debt that degrades gradually, security vulnerabilities cause sudden, catastrophic events: data breaches, ransomware, account takeovers, and regulatory fines. At a startup, any one of these can end the company.

:::

::: details The Fix

Apply these six security controls before the first line of production code ships:

**1. Principle of Least Privilege every IAM role gets only what it needs:**

One of the most common security mistakes in AWS is granting roles more permissions than they need either out of convenience (`s3:*`) or uncertainty about what the service actually requires. This creates unnecessary risk: if a role is compromised, the attacker inherits every permission you granted.

The fix is simple: look at what your service actually does, then write a policy that allows exactly that.

If your app uploads and reads files from a specific S3 bucket, the policy should say exactly that:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-app-uploads/*"
    }
  ]
}
```

Notice the `Resource` is scoped to `my-app-uploads/*` not all S3 buckets. And the `Action` list covers only `GetObject` and `PutObject` not `DeleteObject`, not `s3:*`. If the service gets compromised, the attacker can read and write to that one bucket. That is it. The rest of your account is untouched.

**2. Block all S3 public access by default:**

AWS S3 buckets are private by default when created but that can be overridden at the bucket level, the object level, or through a bucket policy. Misconfigured S3 buckets are one of the most common causes of data breaches, and they are almost always accidental.

The safest approach is to enable the "Block Public Access" setting at the account level, which overrides all other settings and prevents any bucket from being made public even if someone tries:

```sh
aws s3api put-public-access-block \
--bucket my-app-bucket \
--public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

Run this for every bucket you create. Better yet, enable it at the AWS account level so it applies automatically to all future buckets by default.

**3. Never open SSH to the internet, use AWS Systems Manager Session Manager instead:**

Port 22 open to `0.0.0.0/0` is an attack surface that exists on thousands of AWS instances right now. Brute-force bots scan the internet continuously looking for open SSH ports. Even with a strong key, the exposure is unnecessary because AWS provides a better alternative.

AWS Systems Manager Session Manager gives you full shell access to any EC2 instance without opening a single inbound port on the security group. There is no port to scan, no port to attack, and every session is logged automatically to CloudTrail:

```sh
# Start a session on an EC2 instance without port 22 open
aws ssm start-session --target i-0123456789abcdef0
```

To use Session Manager, the EC2 instance needs the SSM Agent installed (included by default on Amazon Linux 2 and Ubuntu 20.04+) and an IAM instance profile with the `AmazonSSMManagedInstanceCore` policy attached. Once that is set up, you can close port 22 on the security group entirely.

**4. Enable MFA for all IAM users and enforce it via policy:**

A leaked IAM username and password with no MFA is a fully compromised account. Multi-factor authentication is the single most effective control against credential theft, and it costs nothing to enable.

Enforce it through an IAM policy that denies all actions when MFA is not present, except the actions needed to set up MFA in the first place. This means even if a set of credentials is stolen, the attacker cannot do anything without the second factor.

The AWS documentation provides the [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>Complete Deny Without MFA Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_users-self-manage-mfa-and-creds.html), attach it to every IAM user or group in your account. This is a one-time setup that permanently raises your account's security baseline.

**5. Enable CloudTrail in all regions:**

Without CloudTrail, you have no record of who did what in your AWS account. If a credential is compromised, you cannot investigate what the attacker accessed. If an engineer accidentally deletes a resource, you cannot trace it. You are operating blind.

CloudTrail logs every AWS API call who made it, from which IP, at what time, and what the response was. Enable it across all regions so activity in regions you do not actively use is also captured:

```sh
aws cloudtrail create-trail \
--name production-audit-trail \
--s3-bucket-name my-cloudtrail-logs \
--is-multi-region-trail \
--enable-log-file-validation
```

The `--enable-log-file-validation` flag generates a digest file for each log that lets you verify the log has not been tampered with, this is important if you ever need to use these logs in a security investigation or compliance audit. Once this is running, every `AssumeRole`, every `DeleteBucket`, and every `RunInstances` call in your account is permanently recorded.

**6. Run AWS Security Hub from day one:**

Most teams only discover security misconfigurations after a breach or a compliance audit. Security Hub inverts this, it continuously scans your AWS environment against industry-standard frameworks (CIS AWS Foundations Benchmark, AWS Foundational Security Best Practices) and surfaces findings before they become incidents.

Enabling it takes a single command:

```sh
aws securityhub enable-security-hub
```

Within minutes, Security Hub gives your account a compliance score and a prioritized list of findings. A finding might tell you that a security group has port 22 open to the world, that an S3 bucket has logging disabled, or that root account credentials were recently used. Each finding includes the affected resource and a remediation guide.

Treat every Security Hub finding the same way you treat a production bug: assign it a priority, assign an owner, and close it. A finding sitting unaddressed for 30 days is a known vulnerability you chose to leave open.

:::

---

## Mistake 7: Manual Deployments in Production

::: info The Scenario

A startup's deployment process is documented in a Notion page that is four months out of date. It involves SSH-ing into the server, running `git pull`, running `npm install`, and restarting the PM2 process. Different engineers do it slightly differently. One engineer, rushing a late-night release, skips `npm install`. The application starts crashing because a new dependency is missing.

:::

::: note The Business Impact

Manual deployment processes are inherently unreliable. Humans under pressure skip steps, perform steps in the wrong order, and remember procedures differently. Every manual step in a production deployment process is a scheduled incident waiting for the right moment of stress.

:::

::: details The Fix

If a deployment step is performed manually more than twice, it needs to be automated. Here is a minimal but complete GitHub Actions deployment workflow for an ECS Fargate service:

```yaml title=".github/workflows/deploy.yml"
name: Deploy to Production
 
on:
  push:
    branches:
      - main
 
permissions:
  id-token: write   # Required for OIDC authentication with AWS
  contents: read
 
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
 
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
 
      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: us-east-1
 
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
 
      - name: Build and push Docker image
        id: build
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t \(ECR_REGISTRY/my-app:\)IMAGE_TAG .
          docker push \(ECR_REGISTRY/my-app:\)IMAGE_TAG
          echo "image=\(ECR_REGISTRY/my-app:\)IMAGE_TAG" >> $GITHUB_OUTPUT
 
      - name: Deploy to Amazon ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: task-definition.json
          service: my-app-service
          cluster: production
          wait-for-service-stability: true
```

Notice `wait-for-service-stability: true`. Without this, the workflow reports success the moment ECS accepts the new task definition before the containers are actually healthy. With it, the workflow fails if the new containers crash. You want to know immediately, not discover it from user reports thirty minutes later.

:::

---

## Mistake 8: No Disaster Recovery Plan

::: info The Scenario

A startup's production database runs on a single RDS instance with no Multi-AZ configuration. Automated backups are enabled but have never been tested. The EBS volume backing the instance fails. AWS provisions a new instance from the last snapshot, which is 18 hours old. 18 hours of customer data is permanently lost.

The startup had no disaster recovery plan, no tested recovery procedure, and no communication template ready for customers.

:::

::: note The Business Impact

The question is not whether your infrastructure will fail. It will fail. Every database, every server, every availability zone experiences failures. The question is whether you have a tested plan for when it does.

Data loss of any magnitude is serious. For startups that handle financial data, healthcare data, or anything under GDPR, even partial data loss can trigger regulatory consequences.

:::

::: details The Fix

**Define your RTO and RPO before you design anything:**

- **RTO (Recovery Time Objective):** How long can the business survive without this system? A payment API might have an RTO of 15 minutes. An internal analytics dashboard might have an RTO of 4 hours.
- **RPO (Recovery Point Objective):** How much data loss is acceptable? Zero means real-time replication. One hour means hourly snapshots are sufficient. This directly determines your backup frequency and architecture.

**Enable RDS Multi-AZ for all production databases:**

```hcl
# Terraform
resource "aws_db_instance" "production" {
  identifier        = "prod-postgres"
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = "db.t3.medium"
  allocated_storage = 100
 
  # Multi-AZ: automatic failover to standby in a different AZ
  # No data loss. Automatic failover in ~60-120 seconds.
  multi_az = true
 
  # Encryption at rest — non-negotiable
  storage_encrypted = true
 
  # Automated backups with 7-day retention
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
 
  # Enable deletion protection in production
  deletion_protection = true
 
  tags = {
    Environment = "production"
  }
}
```

**Test your backups on a schedule.** Create a monthly calendar event: "Restore production backup to staging and verify data integrity." An untested backup is not a backup, it is a hope.

```sh
# Restore a snapshot to a test instance and verify
aws rds restore-db-instance-from-db-snapshot \
--db-instance-identifier recovery-test \
--db-snapshot-identifier rds:prod-postgres-2025-01-15 \
--db-instance-class db.t3.medium \
--no-multi-az
 
# Connect and verify row counts
psql -h recovery-test.xxxx.rds.amazonaws.com -U admin -d mydb \
-c "SELECT COUNT(*) FROM users; SELECT COUNT(*) FROM orders;"
```

For official guidance on RDS backup and restore, refer to the [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>AWS RDS Backup and Restore documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html).

:::

---

## Mistake 9: No Documentation or Runbooks

::: info The Scenario

The startup's most experienced DevOps engineer takes two weeks of vacation. On day three of their holiday, the staging environment goes down. Nobody else knows how it was built, the engineer set it up manually over six months with no documentation, no Terraform, no notes. The team spends four days trying to reconstruct the environment from memory and guesswork. The engineer gets messages on their vacation every day. When they return, they rebuild the environment in four hours.

:::

::: note The Business Impact

Undocumented infrastructure creates single points of failure not in your systems, but in your team. It makes onboarding new engineers take weeks instead of hours. It makes incident response depend on specific people being available. When that person leaves the company, the knowledge walks out with them.

:::

::: details The Fix

Documentation for an engineering team means three specific things:

1. **Infrastructure as Code is the highest form of documentation.** The Terraform that defines your infrastructure IS the documentation for what exists and how it is configured. If something is not in code, it should not exist in production.
2. **A runbook for every operational task.** A runbook is a step-by-step procedure written well enough that someone in their first week at the company can follow it during an incident:

```md
# Runbook: Production Database Connection Exhaustion
 
---

## Symptoms
- Application logs: "too many connections" errors
- 500 error rate spike on database-dependent endpoints
- pg_stat_activity shows max connections reached
 
---

## Diagnosis
# Check current connection count
psql -h \(DB_HOST -U \)DB_USER -c "SELECT COUNT(*) FROM pg_stat_activity;"
 
# See connections by application
psql -h \(DB_HOST -U \)DB_USER \
  -c "SELECT application_name, COUNT(*) FROM pg_stat_activity GROUP BY 1 ORDER BY 2 DESC;"

---

## Resolution
1. Identify and restart the service causing the connection leak
2. If immediate relief needed: kill idle connections older than 10 minutes
3. Long-term: review connection pool settings in application config

---

## Escalation
If unresolved in 30 minutes: page the on-call backend engineer.
```

1. **An architecture README in every repository.** Every engineer who clones your repository should be able to understand what it does, how to run it locally, how to deploy it, and what it depends on without asking anyone.

:::

---

## Mistake 10: Solving Technical Problems Without Understanding the Business

::: info The Scenario

A startup is experiencing slow page loads. A DevOps engineer decides to solve it by migrating to Kubernetes with horizontal pod auto-scaling. The migration takes six weeks. Page loads improve slightly. But 80% of the slowness was caused by unoptimized database queries that had nothing to do with the infrastructure layer. The six-week migration solved 20% of the problem.

:::

::: note The Business Impact

Technical solutions to misdiagnosed problems are extraordinarily expensive. Every hour spent building the wrong solution is an hour not spent on the right one. Infrastructure is a tool for delivering business outcomes not an end in itself.

:::

::: details The Fix

Before making any infrastructure decision, answer these four questions:

1. **What is the actual, measured bottleneck?** Instrument before you act. The bottleneck is almost never where you assumed it was.
2. **What does success look like, and how will you measure it?** "Pages are faster" is not measurable. "p95 page load time drops below 1.2 seconds" is measurable.
3. **What is the full cost of this solution?** Time to implement, ongoing operational burden, team learning curve. Is this cost justified by the measured impact?
4. **Can a simpler solution solve 80% of the problem in 20% of the time?**

Always profile and measure before you rebuild:

```sh
# Check slow queries in PostgreSQL before any infrastructure changes
psql -h \(DB_HOST -U \)DB_USER -d $DB_NAME -c "
SELECT
  query,
  calls,
  total_exec_time / calls AS avg_ms,
  rows / calls AS avg_rows
FROM pg_stat_statements
ORDER BY avg_ms DESC
LIMIT 10;
"
```

Nine times out of ten, slow applications have slow queries, missing indexes, or an N+1 query problem, none of which require a new infrastructure layer to fix.

:::

---

## The System Thinking Framework Every DevOps Engineer Needs

Most of the mistakes above share a common root cause: the engineer was thinking about one component in isolation instead of the full system.

![A diagram showing a request flowing through a full system: user → CDN → load balancer → application servers → cache → database → logs/monitoring](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/b33035a6-448f-419b-b293-206b7b775594.jpg)

A system thinker asks six questions before making any change in production:

| Question | Why You Ask It |
| --- | --- |
| **What does this change?** | List every configuration, file, or service that will be different. |
| **What does this depend on?** | What must be true upstream for this component to work correctly? |
| **What depends on this?** | What downstream systems are affected if this changes or fails? |
| **What is the failure mode?** | Does this fail loudly (500 errors) or silently (wrong data)? |
| **What is the rollback path?** | How do you reverse this in under five minutes? |
| **What does healthy look like after the change?** | What metrics confirm everything is working correctly? |

This is not a checklist you run through slowly. It is a thinking habit that becomes automatic with practice. Senior engineers do not spend more time on deployments than junior engineers do, they spend their time on different things, and this is one of them.

---

## Your Production Readiness Checklist

Use this checklist before any production system goes live. Mark each item as done, in progress, or not yet started.

### Infrastructure

- Infrastructure is defined as code (Terraform or CloudFormation) and version-controlled in Git
- Separate dev, staging, and production environments exist with separate credentials
- All production changes go through an automated CI/CD pipeline, no manual SSH deployments
- You can rebuild the entire production environment from code in under two hours

### Security

- No secrets, credentials, or API keys exist in any Git repository
- All production secrets are in Secrets Manager or SSM Parameter Store
- All IAM roles follow the principle of least privilege
- S3 buckets have public access blocked by default
- Port 22 is not open to `0.0.0.0/0` on any security group
- CloudTrail is enabled in all regions
- All IAM users have MFA enabled
- AWS Security Hub is enabled and findings are reviewed weekly

### Observability

- Every service has a `/health` endpoint that monitoring checks continuously
- Alerts fire within five minutes of a production error rate spike
- Dashboards exist showing latency, error rate, and resource utilization
- Logs are centralized and searchable, not scattered across individual servers

### Reliability

- Production database has Multi-AZ enabled
- Backup restoration has been tested in the last 30 days
- Written runbooks exist for the three most likely failure scenarios
- RTO and RPO requirements are documented and the architecture meets them

### Documentation

- Every repository has a README explaining what it does and how to deploy it
- A new engineer could understand the production architecture from documentation alone
- No single engineer holds critical knowledge that lives only in their head

---

## Conclusion

None of the mistakes in this article require rare misfortune to experience. They are the predictable result of decisions that feel reasonable under startup pressure but accumulate into real operational risk over time.

The good news is that every single one of them is preventable with the right awareness and the right habits applied early.

You do not need a perfect infrastructure from day one. You need a correct one: version-controlled, automated, observable, secure, and documented. Start with that foundation. Add complexity only when a specific, measured problem requires it. Always connect technical decisions to business outcomes.

The goal of DevOps in a startup is not to build impressive infrastructure. It is to build reliable systems that support product growth safely, efficiently, and sustainably and to make sure that when something does break, you can recover faster than anyone notices.

---

## Want to Go Deeper?

If this article resonated with you, [<VPIcon icon="fas fa-globe"/>The Startup DevOps Field Guide](https://coachli.co/tolani-akintayo/PR-H4oQS) covers these principles in full depth with complete infrastructure blueprints, security frameworks, CI/CD pipeline templates, and the end-to-end decision-making playbook for engineers building DevOps practices in startup environments from scratch.

It is written specifically for the engineer who wants to do this right from the beginning not the one rebuilding everything after the first major incident.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Common DevOps Mistakes and How to Avoid Them — Tips for Startups",
  "desc": "Most DevOps engineers don't fail because they lack knowledge about tools. They fail because nobody told them what not to do before they got into production. Startup environments make this worse. The p",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-avoid-devops-mistakes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
