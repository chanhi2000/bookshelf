---
lang: en-US
title: "The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands"
description: "Article(s) > The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Github
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands"
    - property: og:description
      content: "The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-complete-soc-2-type-ii-implementation-guide-for-engineers.html
prev: /devops/aws/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/83d83215-5d73-49f6-a745-d9c6cd0c33f8.png
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
  name="The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands"
  desc="If your team is preparing for a SOC 2 Type II review, this handbook is for you. It's a self-contained guide to the exact 90-day timeline, 14 critical controls, and evidence collection infrastructure t"
  url="https://freecodecamp.org/news/the-complete-soc-2-type-ii-implementation-guide-for-engineers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/83d83215-5d73-49f6-a745-d9c6cd0c33f8.png"/>

If your team is preparing for a SOC 2 Type II review, this handbook is for you. It's a self-contained guide to the exact 90-day timeline, 14 critical controls, and evidence collection infrastructure that auditors actually check.

Everyone publishes the controls list. But nobody publishes the week-by-week engineering calendar you'll need to follow to make sure your ducks are in a row.

Here is the exact 90-day timeline — including the mistakes that add 60 days (and how to avoid them).

::: info What You'll Learn

By the end of this guide, you'll know:

- How to scope your SOC2 boundary correctly — the decision that determines everything else
- The 14 controls that must be active on day 1 of your observation period
- How to build evidence collection infrastructure that runs automatically
- How to choose an auditor and run a readiness assessment
- What happens during the observation period and how to close gaps without restarting the clock

:::

Let's dive in.

::: note Prerequisites

Before following along, you should have:

**Knowledge:**

- Basic understanding of AWS services (EC2, RDS, S3, IAM, VPC)
- Familiarity with Terraform or another infrastructure as code tool
- Comfort reading GitHub Actions YAML workflows
- A general understanding of what SOC2 is — if you are starting from scratch, read the [<VPIcon icon="fas fa-globe"/>AICPA's SOC2 overview](https://aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services) first

**Tools and access:**

- An AWS account with administrator access
- A GitHub organisation with admin rights
- Terraform installed (v1.0 or later)
- Python 3.8 or later (for the evidence collector Lambda)
- A compliance automation platform — [<VPIcon icon="fas fa-globe"/>Vanta](https://vanta.com/) or [<VPIcon icon="fas fa-globe"/>Drata](https://drata.com/) — connected to your AWS account and GitHub organisation

**Estimated time:** 90 days end-to-end, with active engineering work of approximately 8–12 hours per week in the first six weeks, tapering to 2–4 hours per week during the observation period.

:::

---

## Weeks 1–2: The Scope Decision — What Is In and Out of Your SOC2 Boundary

### What Most Teams Get Wrong

Most teams scope their SOC2 boundary too broadly. They include every AWS account, every service, every environment. This is a mistake — and here is exactly why.

A broader scope means more controls to implement, more evidence to collect, and more systems the auditor will examine.

Every system inside your boundary must satisfy all 14 controls. Including your development sandbox means your engineers' experimental environments must have GuardDuty enabled, CloudTrail logging, and branch-protected deployments. That adds weeks of work and months of evidence collection for systems that pose no risk to your customers.

A correctly bounded scope means you include only the systems that store, process, or transmit customer data — and you prove that everything else cannot reach those systems.

**Bad scope (over-inclusive):**

```plaintext
Entire AWS Organization
├── Production (in scope)
├── Staging (in scope)
├── Development (in scope)
├── Sandbox (in scope)
└── CI/CD (in scope)
```

**Good scope (correctly bounded):**

```plaintext
SOC2 Boundary
├── Production AWS Account (in scope)
├── Production EKS Cluster (in scope)
├── Production RDS (in scope)
└── Everything else (OUT of scope — proven by network segmentation)
```

The correctly bounded scope works because it draws the tightest defensible line around the systems that actually handle customer data. Everything outside that line is excluded — not by assumption, but by technical controls that prevent those systems from reaching anything inside the boundary.

### The Scope Decision Framework

For every system in your infrastructure, ask these four questions:

| Question | If YES | If NO |
| --- | --- | --- |
| Does this system store, process, or transmit customer data? | ✅ In scope | ❌ Out of scope |
| Does this system affect the availability of customer-facing services? | ✅ In scope | ❌ Out of scope |
| Does this system have access to production credentials? | ✅ In scope | ❌ Out of scope |
| Can a compromise of this system lead to a customer data breach? | ✅ In scope | ❌ Out of scope |

Any system where the answer to even one question is yes belongs inside your boundary.

### Network Segmentation — The Technical Proof That Your Boundary Holds

Network segmentation is the practice of dividing your infrastructure into isolated zones so that systems in one zone can't communicate with systems in another unless you explicitly allow it.

In the context of SOC2, it's the technical control that proves your out-of-scope systems genuinely can't reach your in-scope systems — not just by policy, but by infrastructure enforcement.

Without network segmentation, the SOC2 auditor can't trust that your boundary is real. A developer in your sandbox environment who can query your production database means the sandbox is effectively in scope, regardless of what your diagram says.

Here's the Terraform that implements network segmentation between your production and non-production environments. The network access control list (NACL) blocks all inbound traffic from the broader private IP range (10.0.0.0/8) into your in-scope production VPC, while the explicit `aws_vpc_peering_connection` comment documents the deliberate decision not to peer environments:

```hcl
# This account has NO VPC peering to non-production environments.
# The absence of peering is itself the segmentation control.
# Do NOT add peering connections to this account without SOC2 scope review.

resource "aws_network_acl" "deny_non_production" {
  vpc_id = aws_vpc.production.id

  # Block all inbound traffic from non-production IP ranges
  ingress {
    rule_no    = 100
    action     = "deny"
    from_port  = 0
    to_port    = 0
    protocol   = "-1"
    cidr_block = "10.0.0.0/8"
  }

  # Allow legitimate inbound traffic (HTTPS from internet)
  ingress {
    rule_no    = 200
    action     = "allow"
    from_port  = 443
    to_port    = 443
    protocol   = "tcp"
    cidr_block = "0.0.0.0/0"
  }

  # Allow all outbound (tighten this per your architecture)
  egress {
    rule_no    = 100
    action     = "allow"
    from_port  = 0
    to_port    = 0
    protocol   = "-1"
    cidr_block = "0.0.0.0/0"
  }

  tags = {
    Name        = "production-nacl"
    Environment = "production"
    Purpose     = "SOC2 network segmentation"
  }
}
```

Verify the segmentation with this command after applying the Terraform:

```sh
# Confirm no VPC peering connections exist from production to non-production
aws ec2 describe-vpc-peering-connections \
--filters Name=status-code,Values=active \
--query 'VpcPeeringConnections[*].{ID:VpcPeeringConnectionId,Requester:RequesterVpcInfo.VpcId,Accepter:AccepterVpcInfo.VpcId}' \
--output table
```

### The Deliverable: Your SOC2 Boundary Diagram

At the end of weeks 1–2, you need a boundary diagram — a visual document that shows every in-scope system, every out-of-scope system, and the segmentation controls between them.

Here is what the diagram should contain:

![29dfe0c8-f455-44af-8562-8d088f8a111a](https://cdn.hashnode.com/uploads/covers/69d00d5be466e2b76263a583/29dfe0c8-f455-44af-8562-8d088f8a111a.png)

Include every AWS service, every data flow arrow, and a label on the segmentation control. This diagram becomes your primary scope evidence and is typically the first thing an auditor asks for.

---

## Weeks 3–6: The 14 Controls That Must Be Active on Day 1

These 14 controls must be implemented and actively collecting evidence from day 1 of your observation period. If you add any of them late, the observation period clock for that control restarts from the implementation date — not from day 1 of the audit period.

Think of the observation period as a surveillance camera recording your infrastructure. The auditor watches the footage later. If the camera was not on when a specific event occurred, that event has no record — and the SOC2 control for it has a gap.

### Control 1: MFA Enforcement (CC6.6)

Multi-Factor Authentication (MFA) requires a user to verify their identity using two independent factors — something they know (a password) and something they have (a phone or hardware key). Without MFA, a stolen password is sufficient to access your production systems.

SOC2 CC6.6 requires that access to systems is restricted to authorized users. MFA is the technical control that makes "authorized" meaningful. Without it, any password compromise is a production access event.

To implement MFA, you can use AWS IAM Identity Center (formerly SSO) connected to your identity provider (Okta, Google Workspace, or Azure AD). MFA is then enforced at the identity provider level — any user without MFA enrolled can't authenticate, regardless of which AWS service they're trying to reach.

```hcl
# IAM Identity Center configuration — MFA is enforced at the IdP level.
# No IAM user has direct console or CLI access.
# All access goes through SSO sessions (8-hour expiry by default).

resource "aws_ssoadmin_instance_access_control_attributes" "mfa" {
  instance_arn = tolist(data.aws_ssoadmin_instances.this.arns)[0]

  attribute {
    key = "email"
    value {
      source = ["$${path:email}"]
    }
  }
}
```

You can verify that no IAM users retain direct console access (which would bypass MFA):

```sh
# Any user listed here has direct console access bypassing SSO — investigate immediately
aws iam list-users \
--query 'Users[?PasswordLastUsed!=`null`].[UserName,PasswordLastUsed]' \
--output table
```

### Control 2: Infrastructure as Code (CC8.1)

Infrastructure as Code (IaC) means defining your cloud infrastructure in version-controlled code files (Terraform, Pulumi, or AWS CDK) rather than creating resources manually through the AWS console. Every infrastructure change is proposed in a pull request, reviewed by a colleague, and applied through an automated pipeline.

SOC2 CC8.1 covers change management — the requirement that every change to your production environment is documented, reviewed, and approved. Manual console changes produce no audit trail. If an engineer opens the AWS console and creates a security group without going through Terraform, that change is invisible to your SOC2 auditor. IaC makes every change reviewable and traceable.

Now let's see how to implement IaC here. This GitHub Actions workflow applies Terraform only from the main branch, after a pull request has been reviewed and approved. The workflow creates an immutable record of every infrastructure change:

```yaml
# .github/workflows/terraform-apply.yml
name: Terraform Apply (Production)
on:
  push:
    branches: [main]
    paths: ['terraform/**']

permissions:
  id-token: write   # Required for AWS OIDC authentication
  contents: read

jobs:
  apply:
    name: Apply Infrastructure Changes
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval for production

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials (OIDC — no long-lived keys)
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/terraform-apply
          aws-region: us-east-1

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: "1.6.0"

      - name: Terraform Plan
        run: |
          terraform init
          terraform plan -out=tfplan -input=false

      - name: Terraform Apply
        run: terraform apply -input=false tfplan
```

SOC2 evidence this produces: A GitHub Actions run log for every infrastructure change, showing who triggered it (the pull request author), when it was applied, and what changed.

### Control 3: CloudTrail Enabled (CC7.1)

AWS CloudTrail is a service that records every API call made in your AWS account — who called it, when, from which IP address, and whether it succeeded. Think of it as the complete audit log of everything that has ever happened in your AWS environment.

SOC2 CC7.1 requires monitoring for security events. CloudTrail is the foundational logging layer — without it, you can't detect unauthorized access, investigate incidents, or prove to an auditor that your controls were operating as intended. An auditor who can't see historical AWS API activity can't verify that your access controls were enforced during the observation period.

To implement it, you'll want to enable multi-region CloudTrail so that activity in every AWS region is captured, including global services like IAM. You can ship logs to an S3 bucket with Object Lock enabled (Control 3 in the evidence collection section covers this) so logs can't be modified or deleted:

```sh
# Enable CloudTrail with log file validation and multi-region coverage
aws cloudtrail create-trail \
--name production-audit-trail \
--s3-bucket-name your-cloudtrail-logs-bucket \
--is-multi-region-trail \
--enable-log-file-validation \
--include-global-service-events

# Start the trail (creation alone does not start logging)
aws cloudtrail start-logging --name production-audit-trail

# Verify the trail is active and logging
aws cloudtrail get-trail-status --name production-audit-trail \
  --query '{IsLogging:IsLogging,LatestDeliveryTime:LatestDeliveryTime}'
```

### Control 4: GuardDuty Enabled (CC7.2)

AWS GuardDuty is a threat detection service that analyses your CloudTrail logs, VPC Flow Logs, and DNS logs. It uses machine learning to identify suspicious behaviour — things like an EC2 instance communicating with a known malware server, an IAM user logging in from an unusual country, or unusual API call patterns that indicate credential theft.

SOC2 CC7.2 requires the use of detection tools to identify potential security events. GuardDuty is the monitoring layer that tells you when something anomalous is happening, not just what happened after the fact. Without it, you would only discover a compromise when the damage is done.

Here's the implementation:

```sh
# Enable GuardDuty — findings published every 15 minutes for active threats
aws guardduty create-detector \
--enable \
--finding-publishing-frequency FIFTEEN_MINUTES

# Verify GuardDuty is active
aws guardduty list-detectors --query 'DetectorIds' --output table
```

You can set up an EventBridge rule to route CRITICAL and HIGH severity GuardDuty findings to your incident response channel immediately. A finding sitting unreviewed for 90 days is a qualified SOC2 finding.

### Control 5: VPC Flow Logs (CC6.1)

VPC Flow Logs capture information about the IP traffic flowing through your Virtual Private Cloud — every accepted and rejected connection, including source IP, destination IP, port, protocol, and whether the traffic was allowed or denied. They are the network-level audit trail that CloudTrail doesn't provide.

SOC2 CC6.1 requires logical access controls and monitoring. VPC Flow Logs let you verify that your network segmentation is actually working (traffic you denied is showing as rejected in the logs), detect unexpected communication between services, and investigate security events at the network layer.

```sh
# Create an IAM role for VPC Flow Logs to deliver to CloudWatch
aws iam create-role \
--role-name vpc-flow-logs-role \
--assume-role-policy-document '{
  "Version":"2012-10-17",
  "Statement":[{
    "Effect":"Allow",
    "Principal":{"Service":"vpc-flow-logs.amazonaws.com"},
    "Action":"sts:AssumeRole"
  }]
}'

# Enable VPC Flow Logs for all traffic (ACCEPT and REJECT)
aws ec2 create-flow-logs \
--resource-ids vpc-YOUR_PRODUCTION_VPC_ID \
--resource-type VPC \
--traffic-type ALL \
--log-group-name /aws/vpc/flow-logs/production \
--deliver-log-permission-arn arn:aws:iam::YOUR_ACCOUNT_ID:role/vpc-flow-logs-role

# Verify flow logs are active
aws ec2 describe-flow-logs \
--filter Name=resource-id,Values=vpc-YOUR_PRODUCTION_VPC_ID \
--query 'FlowLogs[*].{Status:FlowLogStatus,LogGroup:LogGroupName}'
```

### Control 6: Secrets Manager (CC6.7)

Secrets management means storing credentials (database passwords, API keys, certificates, and other sensitive configuration values) in a dedicated, access-controlled service (like AWS Secrets Manager or HashiCorp Vault) rather than in `.env` files, GitHub repository secrets, or hardcoded in application code.

SOC2 CC6.7 requires protecting sensitive system components from unauthorized access. A secret stored in an `.env` file committed to a repository is accessible to every developer with repo access, every CI/CD runner, and every engineer who has ever cloned the repo — including those who have since left the company.

A Secrets Manager provides centralised storage, access logging, automatic rotation, and fine-grained IAM permissions so only specific services can retrieve specific secrets.

Let's look at the implementation — storing and rotating a secret:

```sh
# Store a database credential with automatic 90-day rotation
aws secretsmanager create-secret \
--name production/postgresql/credentials \
--description "Production PostgreSQL credentials — rotated every 90 days" \
--secret-string '{
  "username": "app_user",
  "password": "REPLACE_WITH_STRONG_PASSWORD",
  "host": "your-rds-endpoint.us-east-1.rds.amazonaws.com",
  "port": 5432,
  "dbname": "production"
}'

# Enable automatic rotation every 90 days
aws secretsmanager rotate-secret \
--secret-id production/postgresql/credentials \
--rotation-rules AutomaticallyAfterDays=90
```

How your application retrieves the secret at runtime (no hardcoded credentials):

```py
# Good: secret retrieved at runtime from Secrets Manager
import boto3
import json

def get_db_credentials():
    client = boto3.client('secretsmanager', region_name='us-east-1')
    response = client.get_secret_value(SecretId='production/postgresql/credentials')
    return json.loads(response['SecretString'])

# Bad: secret hardcoded in application code or .env file
DB_PASSWORD = "my_database_password_123"  # Never do this
```

The access log in CloudTrail records every time a secret is retrieved, by which IAM role, at what time. That log is your SOC2 evidence that secrets access is controlled and auditable.

### Control 7: EBS Encryption (CC6.1)

EBS (Elastic Block Store) encryption ensures that the persistent disks attached to your EC2 instances and used by your RDS databases are encrypted at rest using AES-256. If an AWS employee or an attacker gained physical access to the storage hardware, the data would be unreadable without the encryption key.

SOC2 CC6.1 requires protecting information assets from unauthorised access. Encryption at rest is the control that protects data in the event of physical storage compromise or an improperly decommissioned disk. Enabling it account-wide means every new EBS volume is encrypted automatically, including RDS storage, EKS node volumes, and EC2 instance root volumes.

```sh
# Enable EBS encryption by default for all new volumes in this region
aws ec2 enable-ebs-encryption-by-default

# Verify it is enabled
aws ec2 get-ebs-encryption-by-default \
--query 'EbsEncryptionByDefault'
# Expected output: true

# Check existing volumes — any showing false need to be migrated
aws ec2 describe-volumes \
--query 'Volumes[?Encrypted==`false`].[VolumeId,Size,VolumeType]' \
--output table
```

Any existing unencrypted volumes must be snapshot-and-replaced. The process: create a snapshot of the unencrypted volume, create a new encrypted volume from the snapshot, and swap it into the instance.

### Control 8: S3 Block Public Access (CC6.1)

Amazon S3 buckets can be configured to allow public access — meaning anyone on the internet can read their contents without authentication. Block Public Access is an account-level and bucket-level setting that prevents any bucket from being made public, regardless of the bucket's own policy.

A misconfigured S3 bucket is one of the most common causes of data breaches in cloud environments. Block Public Access at the account level means a developer can't accidentally expose a bucket containing customer data, even if they set the wrong bucket policy. It's a guardrail, not just a policy.

```sh
# Block public access at the AWS account level — applies to all buckets
aws s3control put-public-access-block \
--account-id YOUR_ACCOUNT_ID \
--public-access-block-configuration \
  BlockPublicAcls=true,\
  IgnorePublicAcls=true,\
  BlockPublicPolicy=true,\
  RestrictPublicBuckets=true

# Verify account-level setting is active
aws s3control get-public-access-block \
--account-id YOUR_ACCOUNT_ID

# Scan for any buckets that have public access enabled (should be zero)
aws s3api list-buckets --query 'Buckets[*].Name' --output text | \
  tr '\t' '\n' | while read bucket; do
    result=\((aws s3api get-public-access-block --bucket "\)bucket" 2>/dev/null)
    if echo "$result" | grep -q '"BlockPublicAcls": false'; then
      echo "WARNING: $bucket has public access not fully blocked"
    fi
  done
```

### Control 9: Branch Protection (CC8.1)

Branch protection is a GitHub setting that prevents engineers from pushing code directly to your main branch without going through a pull request that has been reviewed and approved by at least one other team member. It also requires your CI pipeline to pass before any code can be merged.

SOC2 CC8.1 requires change management — the requirement that every change to production systems is documented, reviewed, and approved. Without branch protection, an engineer can push directly to main, which deploys directly to production through your CI/CD pipeline, with no review and no audit trail. Branch protection is the technical enforcement of your change management policy.

The critical setting that most teams miss: the "Do not allow bypassing the above settings" option must be enabled. Without it, administrators can bypass branch protection — and a SOC2 auditor will flag this as a gap because it means your change management control can be circumvented.

```yaml TITLE="github/settings.yml"
# enforces branch protection via code
# Requires the settings GitHub App: https://github.com/apps/settings

branches:
  - name: main
    protection:
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
        require_code_owner_reviews: false
      required_status_checks:
        strict: true
        contexts:
          - "CI / test"
          - "Security / trivy-scan"
      enforce_admins: true         # Admins cannot bypass — this is critical
      restrictions: null           # No push restriction beyond the above
      allow_force_pushes: false
      allow_deletions: false
```

Here's how you can verify that branch protection is enforced and admins can't bypass it:

```sh
# Returns the branch protection rules including enforce_admins status
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_ORG/YOUR_REPO/branches/main/protection \
  | jq '{enforce_admins: .enforce_admins.enabled, required_reviews: .required_pull_request_reviews.required_approving_review_count}'
```

### Control 10: Container Image Scanning (CC7.4)

Container image scanning analyses your Docker images before deployment to identify known security vulnerabilities (CVEs) in the operating system packages and application dependencies they contain.

Trivy is an open-source scanner that checks the base image (Ubuntu, Alpine, and so on), all installed OS packages, and language-specific dependencies (npm, pip, Go modules) against the National Vulnerability Database.

SOC2 CC7.4 requires monitoring and identifying vulnerabilities. Every container you deploy contains a base image with OS packages — and those packages regularly receive CVE disclosures. A critical CVE left unpatched for 90 days in a production container is a SOC2 finding. Automated scanning in CI means every image is checked before it can deploy.

```yaml title=".github/workflows/security-scan.yml"
name: Security Scan
on: [push, pull_request]

jobs:
  trivy-scan:
    name: Container Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build container image
        run: docker build -t app:${{ github.sha }} .

      - name: Scan image for vulnerabilities
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: app:${{ github.sha }}
          format: sarif
          output: trivy-results.sarif
          severity: CRITICAL,HIGH
          exit-code: 1          # Fail the pipeline on CRITICAL or HIGH findings

      - name: Upload results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()            # Upload even if scan found issues
        with:
          sarif_file: trivy-results.sarif
```

The scanner looks for:

- CVEs in base image OS packages (for example, a critical OpenSSL vulnerability in your Ubuntu base)
- Vulnerable versions of application dependencies (a known RCE in an npm package your app uses)
- Misconfigurations in the Dockerfile itself (running as root, using `latest` tags)

Results appear in the GitHub Security tab for your repository, giving you a historical record of every scan — which is your SOC2 evidence.

### Control 11: Incident Response Plan (CC9.2)

An incident response plan is a written, tested procedure that defines exactly what your team does when a security event occurs — from the moment an alert fires through to customer notification and post-incident review.

SOC2 CC9.2 requires that you have a documented process for responding to security events and that you've tested it. The auditor will ask for the written runbook and evidence that a tabletop exercise (a simulated incident walkthrough) has been conducted within the observation period.

Your incident response runbook must include:

1. **Severity classification:** Definitions of P1 (production down, customer data at risk), P2 (degraded service, potential risk), and P3 (minor issue, no customer impact) — and the response SLA for each.
2. **Escalation path:** Exactly who gets paged at each severity level, with contact details. Not "the on-call engineer" — specific names and a backup if the first person doesn't respond within 10 minutes.
3. **First 15 minutes:** The specific steps to take immediately — isolate the affected system, assess the scope, notify the incident channel, begin the timeline log.
4. **Communication templates:** Pre-written Slack messages, customer email templates, and regulatory notification templates (GDPR requires notification within 72 hours, HIPAA within 60 days).
5. **Post-incident review:** The blameless postmortem process, the [**5-why**](/freecodecamp.org/from-symptoms-to-root-cause-how-to-use-the-5-whys-technique.md) root cause analysis template, and the action item tracking process.

Conduct a tabletop exercise at least once during your observation period: gather your engineering team for 45 minutes, simulate a realistic scenario (for example, "an AWS access key was committed to a public GitHub repo"), and walk through the runbook together. Document the meeting date, attendees, scenario, gaps found, and remediation actions. This document is your evidence.

### Control 12: Access Reviews (CC6.3)

An access review is a quarterly audit of who has access to what in your production systems — AWS accounts, GitHub repositories, production databases, and every SaaS tool that touches customer data. You verify that every person on the list still works at the company and still needs the access their role grants them.

SOC2 CC6.3 requires that access is revoked when it's no longer needed. Former employees who retain access to production AWS accounts represent a genuine security risk and a definitive SOC2 finding.

In every access review I've conducted, at least 3–5 former employees or contractors still had active access they should not.

The quarterly access review checklist:

```sh
# 1. IAM users — list all with their last login date
aws iam generate-credential-report
aws iam get-credential-report --output text --query Content \
  | base64 --decode | cut -d',' -f1,5 | column -t -s ','

# 2. IAM roles — find roles that have not been used in 90+ days
aws iam get-account-authorization-details \
--query 'RoleDetailList[*].{Role:RoleName,LastUsed:RoleLastUsed.LastUsedDate}' \
--output table

# 3. Verify AWS SSO user list matches your current employee list
aws identitystore list-users \
--identity-store-id YOUR_IDENTITY_STORE_ID \
--query 'Users[*].{Name:DisplayName,Email:Emails[0].Value}' \
--output table
```

Cross-reference the output against your current employee list in your HR system. Document every change made — access removed, permissions reduced, accounts disabled. The documented changes are the evidence that the review was conducted meaningfully, not just as a checkbox exercise.

### Control 13: Backup Verification (CC9.5)

Backup verification is the process of actually restoring your backups to confirm they work — not just confirming that backups are being created. A backup that has never been tested doesn't exist from a recovery perspective.

SOC2 CC9.5 requires that recovery procedures are tested. If your production database is corrupted and you discover for the first time during the incident that your automated RDS snapshots can't be restored, you have both a disaster recovery failure and a SOC2 finding.

How to test your RDS backup:

```sh
# Step 1: Find your most recent production snapshot
aws rds describe-db-snapshots \
--db-instance-identifier your-production-db \
--query 'sort_by(DBSnapshots, &SnapshotCreateTime)[-1].DBSnapshotIdentifier' \
--output text

# Step 2: Restore the snapshot to a test instance
aws rds restore-db-instance-from-db-snapshot \
--db-instance-identifier backup-verification-test \
--db-snapshot-identifier YOUR_SNAPSHOT_ID \
--db-instance-class db.t3.medium \
--no-publicly-accessible \
--tags Key=Purpose,Value=backup-verification Key=Environment,Value=test

# Step 3: Wait for the restore to complete (typically 5–15 minutes)
aws rds wait db-instance-available \
--db-instance-identifier backup-verification-test

# Step 4: Connect and verify data integrity (spot check key tables)
# Run this against the restored instance
psql -h RESTORED_INSTANCE_ENDPOINT -U your_user -d your_database \
-c "SELECT COUNT(*) FROM users; SELECT MAX(created_at) FROM orders;"

# Step 5: Document the test result and delete the test instance
aws rds delete-db-instance \
--db-instance-identifier backup-verification-test \
--skip-final-snapshot
```

Document the test date, the snapshot used, the restore time, the data verification query results, and who conducted the test. Run this quarterly at minimum. This documentation is your SOC2 evidence for CC9.5. ### Control 14: Change Management Log (CC8.1)

A change management log is the auditable record of every change made to your production environment — what changed, who approved it, and when it was applied.

SOC2 CC8.1 requires that changes to your production environment are authorized and documented. With IaC and GitOps in place, you already have two separate sources of immutable change history that together satisfy this control.

**GitHub Pull Request history** provides the record of every code and infrastructure change: who opened the PR, who reviewed and approved it, what the CI status was, and when it was merged. This is your change management log for application and infrastructure changes.

**ArgoCD sync history** provides the record of every deployment to your Kubernetes cluster: which application was synced, from which Git commit, at what time, and whether the sync succeeded.

To export the ArgoCD sync history as evidence:

```sh
# Export ArgoCD application sync history as JSON evidence
argocd app history YOUR_APP_NAME --output json > argocd-sync-history-$(date +%Y%m).json

# Upload to your SOC2 evidence bucket
aws s3 cp argocd-sync-history-$(date +%Y%m).json \
  s3://your-soc2-evidence-bucket/change-management/$(date +%Y/%m)/

# For each deployment, the evidence contains:
# - App name, deployed revision (Git commit SHA)
# - Deployment timestamp
# - Initiating user or automated sync
# - Success/failure status
```

Together, the GitHub PR history and the ArgoCD sync history give the auditor a complete, tamper-evident record of every change to your production environment during the observation period.

---

## Weeks 7–10: The Evidence Collection Infrastructure

Evidence is the difference between passing and failing SOC2. You might be wondering: what exactly is evidence? In SOC2 terms, evidence is the documentation that proves a specific control was operating correctly during a specific point in time within the observation period. A policy document says you will do something. Evidence proves you did it — and that you did it continuously, not just the week before the audit.

For example:

- For MFA enforcement (Control 1), evidence is a screenshot of your IAM Identity Center MFA settings taken at a specific date during the observation period, combined with an IAM credential report showing zero IAM users with console access.
- For GuardDuty (Control 4), evidence is the GuardDuty console screenshot showing active detectors, plus your documented response to any findings during the period.
- For access reviews (Control 12), evidence is the completed access review document with dates, names, and specific access changes made.

The challenge is collecting this evidence continuously across 3–12 months without spending hundreds of hours on manual work. The solution is automated evidence collection infrastructure.

### The Evidence Bucket — Tamper-Proof Storage for Your Audit Evidence

The evidence bucket is an S3 bucket with Object Lock enabled in GOVERNANCE mode. Object Lock prevents any object from being deleted or modified for the retention period you specify — in this case, 365 days. This means once a piece of evidence is uploaded, it can't be altered, even by a user with administrator access (without explicitly overriding the lock, which itself creates an audit trail).

This tamper-evident property is what gives the auditor confidence that the evidence was not created or modified after the fact.

```hcl :collapsed-lines
# terraform/soc2-evidence-bucket.tf

resource "aws_s3_bucket" "soc2_evidence" {
  bucket = "\({var.company_name}-soc2-evidence-\){var.environment}"
}

# Block all public access to the evidence bucket
resource "aws_s3_bucket_public_access_block" "soc2_evidence" {
  bucket = aws_s3_bucket.soc2_evidence.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning so overwrites create new versions, not replacements
resource "aws_s3_bucket_versioning" "soc2_evidence" {
  bucket = aws_s3_bucket.soc2_evidence.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Object Lock in GOVERNANCE mode — objects cannot be deleted for 365 days
resource "aws_s3_bucket_object_lock_configuration" "soc2_evidence" {
  bucket = aws_s3_bucket.soc2_evidence.id

  rule {
    default_retention {
      mode = "GOVERNANCE"
      days = 365
    }
  }
}

# Encrypt all evidence at rest
resource "aws_s3_bucket_server_side_encryption_configuration" "soc2_evidence" {
  bucket = aws_s3_bucket.soc2_evidence.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
```

### The Daily Evidence Collector Lambda

This Lambda function runs automatically every day and exports the status of each critical control to a time-stamped JSON file in the evidence bucket. Over your 3–12 month observation period, it creates a daily record proving that your controls were active and operating.

The function checks seven controls automatically: CloudTrail status, GuardDuty status, VPC Flow Logs, S3 public access block, EBS encryption, MFA compliance, and GuardDuty finding count. Each daily snapshot is uploaded with Object Lock enabled so it can't be modified.

```py :collapsed-lines title="lambda/evidence-collector/handler.py"
import boto3
import json
from datetime import datetime, timedelta, timezone

def lambda_handler(event, context):
    """
    Daily SOC2 evidence collector.
    Runs at 00:00 UTC every day via EventBridge scheduler.
    Exports control status to S3 evidence bucket with Object Lock.
    """
    evidence = {
        'collection_timestamp': datetime.now(timezone.utc).isoformat(),
        'collection_date': datetime.now(timezone.utc).strftime('%Y-%m-%d'),
        'account_id': boto3.client('sts').get_caller_identity()['Account'],
        'controls': {}
    }

    # Control 3: CloudTrail status
    cloudtrail = boto3.client('cloudtrail')
    trails = cloudtrail.describe_trails(includeShadowTrails=False)['trailList']
    multi_region_trails = [t for t in trails if t.get('IsMultiRegionTrail')]
    evidence['controls']['cloudtrail'] = {
        'status': 'PASS' if multi_region_trails else 'FAIL',
        'detail': f"{len(multi_region_trails)} multi-region trail(s) active",
        'trails': [t['Name'] for t in multi_region_trails]
    }

    # Control 4: GuardDuty status
    guardduty = boto3.client('guardduty')
    detectors = guardduty.list_detectors()['DetectorIds']
    unresolved_critical = 0
    for detector_id in detectors:
        findings = guardduty.list_findings(
            DetectorId=detector_id,
            FindingCriteria={
                'Criterion': {
                    'severity': {'Gte': 7},  # HIGH and CRITICAL only
                    'service.archived': {'Eq': ['false']}
                }
            }
        )
        unresolved_critical += len(findings['FindingIds'])

    evidence['controls']['guardduty'] = {
        'status': 'PASS' if detectors else 'FAIL',
        'detail': f"{len(detectors)} detector(s) active, {unresolved_critical} unresolved HIGH/CRITICAL findings",
        'unresolved_high_critical': unresolved_critical
    }

    # Control 5: VPC Flow Logs
    ec2 = boto3.client('ec2')
    flow_logs = ec2.describe_flow_logs(
        Filters=[{'Name': 'resource-type', 'Values': ['VPC']},
                 {'Name': 'flow-log-status', 'Values': ['ACTIVE']}]
    )['FlowLogs']
    evidence['controls']['vpc_flow_logs'] = {
        'status': 'PASS' if flow_logs else 'FAIL',
        'detail': f"{len(flow_logs)} active VPC flow log(s)",
        'active_flow_logs': len(flow_logs)
    }

    # Control 7: EBS encryption by default
    ebs_encryption = ec2.get_ebs_encryption_by_default()['EbsEncryptionByDefault']
    evidence['controls']['ebs_encryption_by_default'] = {
        'status': 'PASS' if ebs_encryption else 'FAIL',
        'detail': 'EBS encryption by default is enabled' if ebs_encryption else 'EBS encryption by default is NOT enabled'
    }

    # Control 8: S3 Block Public Access (account level)
    s3control = boto3.client('s3control')
    account_id = boto3.client('sts').get_caller_identity()['Account']
    try:
        pab = s3control.get_public_access_block(AccountId=account_id)['PublicAccessBlockConfiguration']
        all_blocked = all([pab['BlockPublicAcls'], pab['IgnorePublicAcls'],
                           pab['BlockPublicPolicy'], pab['RestrictPublicBuckets']])
        evidence['controls']['s3_block_public_access'] = {
            'status': 'PASS' if all_blocked else 'FAIL',
            'detail': 'All four S3 Block Public Access settings enabled' if all_blocked else 'One or more S3 Block Public Access settings not enabled',
            'configuration': pab
        }
    except Exception as e:
        evidence['controls']['s3_block_public_access'] = {'status': 'FAIL', 'detail': str(e)}

    # Upload evidence to S3 with Object Lock
    s3 = boto3.client('s3')
    evidence_key = f"daily/{evidence['collection_date']}/control-status.json"
    lock_until = datetime.now(timezone.utc) + timedelta(days=365)

    s3.put_object(
        Bucket='YOUR_EVIDENCE_BUCKET_NAME',
        Key=evidence_key,
        Body=json.dumps(evidence, indent=2),
        ContentType='application/json',
        ObjectLockMode='GOVERNANCE',
        ObjectLockRetainUntilDate=lock_until
    )

    # Alert if any control fails
    failed_controls = [k for k, v in evidence['controls'].items() if v['status'] == 'FAIL']
    if failed_controls:
        sns = boto3.client('sns')
        sns.publish(
            TopicArn='YOUR_ALERT_TOPIC_ARN',
            Subject=f'SOC2 Control Failure Detected — {evidence["collection_date"]}',
            Message=f'The following controls failed their daily check:\n\n{json.dumps(failed_controls, indent=2)}'
        )

    return {
        'statusCode': 200,
        'controls_checked': len(evidence['controls']),
        'controls_failed': len(failed_controls),
        'evidence_location': f"s3://YOUR_EVIDENCE_BUCKET_NAME/{evidence_key}"
    }
```

### The GitHub Actions Evidence Workflow

This workflow runs daily and captures evidence that can't be automated through AWS APIs — GitHub-level controls like branch protection status, recent pull request activity, and CI pipeline results. It exports these as JSON files to the same evidence bucket.

```yaml :collapsed-lines title=".github/workflows/soc2-evidence.yml"
name: SOC2 Evidence Collection
on:
  schedule:
    - cron: '0 1 * * *'   # 01:00 UTC daily (after the Lambda runs at 00:00)
  workflow_dispatch:        # Allow manual trigger when needed

permissions:
  contents: read

jobs:
  collect-github-evidence:
    name: Collect GitHub Control Evidence
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/evidence-collector
          aws-region: us-east-1

      - name: Collect branch protection status
        run: |
          DATE=$(date +%Y-%m-%d)
          mkdir -p evidence/github

          # Export branch protection rules for main
          curl -s -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
            "https://api.github.com/repos/${{ github.repository }}/branches/main/protection" \
            | jq '{
                date: "'$DATE'",
                enforce_admins: .enforce_admins.enabled,
                required_reviews: .required_pull_request_reviews.required_approving_review_count,
                required_status_checks: .required_status_checks.contexts,
                allow_force_pushes: .allow_force_pushes.enabled
              }' > evidence/github/branch-protection-$DATE.json

          echo "Branch protection evidence collected"
          cat evidence/github/branch-protection-$DATE.json

      - name: Upload evidence to S3
        run: |
          DATE=$(date +%Y-%m-%d)
          aws s3 sync evidence/ \
            s3://\({{ secrets.SOC2_EVIDENCE_BUCKET }}/daily/\)DATE/github/ \
            --no-progress
          echo "Evidence uploaded: s3://\({{ secrets.SOC2_EVIDENCE_BUCKET }}/daily/\)DATE/github/"
```

---

## Weeks 11–14: Auditor Selection and Readiness Assessment

### How to Choose a SOC2 Auditor

Selecting the right auditor is more consequential than most teams realize. SOC2 audits are conducted by CPA firms — specifically, firms licensed to issue SOC reports. The right firm has experience with cloud-native, SaaS companies your size. The wrong firm could apply enterprise audit frameworks to a seed-stage startup and generate findings based on controls that aren't appropriate to your context.

Here is what to look for and what to watch out for:

#### Experience matters more than brand

A large Big Four firm isn't necessarily better than a specialist boutique auditor for a 20-person SaaS company.

Ask specifically: "How many SOC2 audits have you completed in the last 12 months for SaaS companies between 10 and 50 employees?" You want a firm where this is common, not exceptional.

#### Verify familiarity with your compliance tool

If you're using Vanta or Drata, confirm that the auditor has experience with evidence produced by those platforms. Some auditors prefer to collect evidence directly and are unfamiliar with automated evidence exports. An auditor who doesn't trust your Vanta evidence will ask you to re-collect everything manually.

#### Understand what Type II actually costs

For a Series A SaaS company, expect \\(15,000–\\)30,000 for a SOC2 Type II audit with a 3-month observation period. A quote below \\(10,000 often means the auditor is cutting corners on the review depth. A quote above \\)50,000 for a small company typically means the firm is applying enterprise pricing to a startup engagement.

#### Get references from similar companies

Ask the auditor for two or three references from SaaS companies they've audited in the last year. Call those references and ask: did the auditor understand cloud infrastructure? Were the findings reasonable? How was the communication during the review?

Here's a summary table of some things to watch out for:

| Criteria | What to Look For | Red Flag |
| --- | --- | --- |
| Experience | 5+ years, 20+ SaaS audits annually | "We have completed several SOC2 audits" (vague) |
| Tool familiarity | Has reviewed Vanta/Drata evidence before | Requires manual re-collection of automated evidence |
| Company size fit | Has audited companies your size | Only lists enterprise clients as references |
| Cost (Type II) | \\(15K–\\)30K for a 20-person company | Under \\(10K or over \\)50K without clear justification |
| References | Can provide SaaS company contacts to call | Cannot provide references |

### How to Run a Readiness Assessment (Mock Audit)

A readiness assessment is a self-conducted simulation of the real audit, run 2–4 weeks before you engage the auditor. Its purpose is to find and close gaps before the auditor finds them, because gaps found in a mock audit cost you a week of remediation time, while gaps found in the real audit cost you a conditional report and a re-review.

You can run the readiness assessment yourself or hire a consultant to run it. The consultant approach is more valuable because an independent reviewer will find gaps you have rationalised away.

The process:

1. **Step 1:** Work through every control in the checklist below and attempt to produce the evidence that an auditor would request.
2. **Step 2:** For every control where you can't produce clear, timestamped evidence: that's a gap. Document it.
3. **Step 3:** Prioritise gaps by type. Evidence gaps (missing evidence for an active control) require evidence collection infrastructure fixes. Control gaps (a control that isn't implemented) require engineering work.
4. **Step 4:** Close all gaps before engaging the real auditor.

| Control | Evidence Required | How to Verify | Ready? |
| --- | --- | --- | --- |
| MFA enforced | IAM credential report + SSO MFA policy screenshot | `aws iam get-credential-report` | ⬜ |
| CloudTrail active | Trail status + S3 delivery confirmation | `aws cloudtrail get-trail-status` | ⬜ |
| GuardDuty active | Detector list + finding review log | `aws guardduty list-detectors` | ⬜ |
| VPC Flow Logs | Active flow log list + sample log entries | `aws ec2 describe-flow-logs` | ⬜ |
| Secrets in Secrets Manager | Secret list + rotation policy confirmation | `aws secretsmanager list-secrets` | ⬜ |
| EBS encryption by default | Account-level encryption setting | `aws ec2 get-ebs-encryption-by-default` | ⬜ |
| S3 Block Public Access | Account-level PAB configuration | `aws s3control get-public-access-block` | ⬜ |
| Branch protection (no admin bypass) | GitHub branch protection API response | GitHub API or Settings UI | ⬜ |
| Trivy scanning in CI | GitHub Actions run history showing scans | GitHub Actions logs | ⬜ |
| Incident response runbook | Written runbook + tabletop exercise notes with date | Document review | ⬜ |
| Access review | Quarterly review document with specific changes made | Document review | ⬜ |
| Backup test | RDS restore log + data verification results | Document review | ⬜ |
| Change management log | GitHub PR history + ArgoCD sync history | GitHub and ArgoCD | ⬜ |

::: tip The one thing most teams skip

Running the readiness assessment against their own evidence bucket. Pull a random day's evidence from the daily Lambda export and verify that it's complete, timestamped, and accurately reflects the control status on that day.

:::

If the evidence file for December 14th shows GuardDuty as PASS but GuardDuty was actually disabled that day, the auditor will find the discrepancy in the AWS account history — and that's a qualified finding.

---

## Weeks 15–18: The Observation Period

### How the Auditor Observes Your Controls

The SOC2 auditor doesn't physically visit your office or sit inside your AWS console watching your infrastructure in real time. The audit is a remote, documentation-based process conducted entirely through evidence review.

Here is how it actually works:

First, the auditor provides a list of evidence requests — typically 80–150 items for a Type II audit. You upload the evidence to a shared portal (the auditor provides this — it is usually a secure document sharing platform). The auditor reviews the evidence, asks follow-up questions, and identifies gaps where evidence is missing or a control wasn't operating as described.

For automated controls like CloudTrail and GuardDuty, the evidence is your daily Lambda exports — the auditor spot-checks a sample of daily snapshots across the observation period to verify the controls were consistently active.

For manual controls like access reviews and backup tests, the evidence is the documents you produced when you ran those processes.

The practical implication: the auditor is trusting your evidence. This is why the Object Lock on your evidence bucket matters. It proves to the auditor that the evidence was generated at the time it claims to have been generated and hasn't been modified since.

### What the Auditor Reviews Over the Observation Period

| What They Check | How Often | What They Are Looking For |
| --- | --- | --- |
| CloudTrail logs | Spot check monthly | Manual console changes that bypassed IaC, gaps in log delivery |
| GuardDuty findings | Review quarterly summary | HIGH or CRITICAL findings not remediated within your documented SLA |
| Access review completion | Verify each quarterly cycle | Reviews skipped, reviews with no access changes despite employee turnover |
| Incident response tests | Verify annually | No tabletop exercise conducted during the observation period |
| Evidence collection | Verify continuous coverage | Gaps in daily evidence exports, missing evidence for specific dates |
| Change management log | Sample PR/sync history | Deployments with no associated pull request or review |

### What Triggers a Finding

A SOC2 finding is the auditor's documented conclusion that a control wasn't operating effectively during the observation period. Findings range from observations (minor issues that don't affect the audit opinion) to qualified opinions (material failures that result in a qualified rather than unqualified report).

Understanding what triggers findings — and which ones restart the observation period — is critical for managing your audit timeline.

**Control gaps** occur when a required control isn't implemented or was disabled during the observation period. If you discover in month 2 that MFA wasn't enforced on one IAM user for the first three weeks, you must document the remediation and demonstrate the gap was closed.

Whether this restarts your observation period depends on how long the gap lasted and how the auditor assesses the risk — but a gap of less than 30 days that's immediately remediated and documented typically doesn't restart the clock.

**Evidence gaps** are more serious. If your daily Lambda evidence collector failed for two weeks and produced no evidence exports, you have a two-week window with no documented proof that your controls were operating. The auditor can't verify controls they can't see evidence for.

Evidence gaps almost always require extending the observation period because there's no way to retroactively produce evidence for a period that wasn't recorded.

**Process failures** occur when a manual control wasn't executed as documented. The most common is an access review that was skipped. Like control gaps, these can typically be remediated without restarting the clock if they're documented promptly and the remediation is clear.

**Unpatched critical CVEs** are a special case. If Trivy identifies a CRITICAL vulnerability in a production container and it remains unpatched for more than your documented remediation SLA (typically 30 days for critical, 90 days for high), this is a qualified finding that the auditor will note in the report.

### How to Close Gaps Without Restarting the Clock

When you discover a gap during the observation period:

**For control gaps:**

```plaintext
1. Fix the control immediately — don't wait
2. Document the fix: screenshot, PR link, or CLI command output with timestamp
3. Note the gap date range in your audit log: "Control gap: 2024-03-10 to 2024-03-14 (4 days). Root cause: [X]. Remediated: [Y]. No customer data accessed during gap period."
4. Notify your auditor proactively — they will find it anyway; proactive disclosure is better than defensive explanation
5. The observation period doesn't restart if the gap was short-lived and promptly remediated
```

**For evidence gaps:**

```plaintext
1. Fix the evidence collection infrastructure immediately
2. Understand that you can't retroactively generate evidence for the gap period
3. The observation period for affected controls effectively restarts from the date evidence collection resumed
4. If the gap is early in your observation period, you may be able to extend the period rather than restart — discuss with your auditor
```

**The pro tip:** Set up a CloudWatch alarm that triggers if the evidence Lambda fails to deliver to S3 on schedule. A missing daily evidence file is caught within 24 hours, not discovered during the audit review.

---

## The 90-Day SOC2 Timeline at a Glance

| Weeks | Focus | Key Deliverables | Common Mistake |
| --- | --- | --- | --- |
| 1–2 | Scope | Boundary diagram, network segmentation Terraform | Over-scoping to include dev and staging |
| 3–6 | Controls | 14 controls implemented and collecting evidence | Starting controls after the observation period begins |
| 7–10 | Evidence | S3 evidence bucket, Lambda daily collector, GitHub Actions workflow | Manual evidence collection with inevitable gaps |
| 11–14 | Readiness | Mock audit, gap remediation, auditor selected | Skipping the mock audit |
| 15–18 | Observation | Daily evidence, quarterly reviews, incident response test | Discovering evidence gaps during the audit rather than before |

---

## What's Next?

Start with Week 1. Define your SOC2 boundary. Apply the four-question framework to every system in your infrastructure. Draw the diagram in Excalidraw. Document the network segmentation controls.

Then implement the 14 controls in order, starting with MFA and CloudTrail — the two that most commonly fail audits when they're missing.

Then build your evidence collection infrastructure before the observation period starts. The automated Lambda and GitHub Actions workflow are the difference between a smooth audit and a 60-day extension.

One thing to remember: SOC2 is 20% controls, 30% evidence, and 50% continuous operation. Start early. Automate everything. Run a mock audit before you call the real one.

::: info Resources

The following resources are referenced throughout this guide:

<SiteInfo
  name=" System and Organization Controls: SOC Suite of Services"
  desc="System and Organization Controls (SOC) is a suite of service offerings CPAs may provide in connection with system-level controls of a service organization or entity-level controls of other organizations. Learn more about the SOC suite of services offerings here."
  url="https://aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services/"
  logo="https://aicpa-cima.com/favicon.ico"
  preview="https://images.ctfassets.net/rb9cdnjh59cm/43ZKFkefBBGDMM3VoBYWIP/b4d7a47dedb6d7232936e0c8beb6e764/Logo_1200x630.png"/>

<SiteInfo
  name="SOC 2, HIPAA, ISO 27001, PCI, and GDPR Compliance"
  desc="Vanta automates the complex and time-consuming process of SOC 2, HIPAA, ISO 27001, PCI, and GDPR compliance certification. Automate your security monitoring in weeks instead of months."
  url="https://vanta.com/"
  logo="https://assets-global.website-files.com/64009032676f24f376f002fc/64640dc6cfa20416724f822e_favicon-32x32.png"
  preview="https://cdn.prod.website-files.com/64009032676f24f376f002fc/693c66c494e0178e6fae41c8_OG_default.jpg"/>

<SiteInfo
  name="The Agentic Trust Management Platform | Drata"
  desc="Drata’s AI-native compliance automation & agentic trust management platform powers GRC and assurance (GRC +A) for startups, mid-size businesses, & enterprises."
  url="https://drata.com/"
  logo="https://drata.com/favicon.ico?favicon.0qtw_q7by6qq_.ico"
  preview="https://cdn.builder.io/api/v1/image/assets%2F8245869222a5472eb60b3801c6f43179%2F0f7c7c3e7fc7428db7cbb051a72e4cc7"/>

<SiteInfo
  name="aquasecurity/trivy"
  desc="Find vulnerabilities, misconfigurations, secrets, SBOM in containers, Kubernetes, code repositories, clouds and more"
  url="https://github.com/aquasecurity/trivy/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://avatars.githubusercontent.com/u/12783832?s=400&v=4"/>

<SiteInfo
  name="Excalidraw — Collaborative whiteboarding made easy"
  desc="Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them."
  url="https://excalidraw.com/"
  logo="https://excalidraw.com/favicon-16x16.png"
  preview="https://excalidraw.com/og-image-3.png"/>

```component VPCard
{
  "title": "What is IAM Identity Center? - AWS IAM Identity Center",
  "desc": "AWS IAM Identity Center is the AWS solution for connecting your workforce users to AWS managed applications such as Kiro and Amazon Quick, and other AWS resources. You can connect your existing identity provider and synchronize users and groups from your directory, or create and manage your users directly in IAM Identity Center. You can then use IAM Identity Center for either or both of the following:",
  "link": "https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

<SiteInfo
  name="About protected branches - GitHub Docs"
  desc="You can protect important branches by setting branch protection rules, which define whether collaborators can delete or force push to the branch and set requirements for any pushes to the branch, such as passing status checks or a linear commit history."
  url="https://docs-internal.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/repositories.png"/>

```component VPCard
{
  "title": "Argo CD - Declarative GitOps CD for Kubernetes",
  "desc": "Application definitions, configurations, and environments should be declarative and version controlled. Application deployment and lifecycle management should be automated, auditable, and easy to understand.",
  "link": "https://argo-cd.readthedocs.io/en/stable//",
  "logo": "https://argo-cd.readthedocs.io/assets/favicon.png",
  "background": "rgba(0,148,133,0.2)"
}
```

:::

::: About author

[Ayobami Adejumo (<VPIcon icon="iconfont icon-github"/>`aayostem`)](https://github.com/aayostem) is a senior platform engineer and FinOps specialist. He writes about SOC2 compliance engineering, Kubernetes cost optimization, and platform engineering.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Complete SOC 2 Type II Implementation Handbook for Engineers: A Month-by-Month Roadmap with Real Commands",
  "desc": "If your team is preparing for a SOC 2 Type II review, this handbook is for you. It's a self-contained guide to the exact 90-day timeline, 14 critical controls, and evidence collection infrastructure t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-complete-soc-2-type-ii-implementation-guide-for-engineers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
