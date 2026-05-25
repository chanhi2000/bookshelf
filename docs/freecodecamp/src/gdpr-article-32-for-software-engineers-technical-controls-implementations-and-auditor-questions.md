---
lang: en-US
title: "GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions"
description: "Article(s) > GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions"
icon: fa-brands fa-aws
category:
  - Python
  - DevOps
  - Kubernetes
  - Amazon
  - AWS
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - k8s
  - kubernetes
  - amazon
  - aws
  - amazon-web-services
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions"
    - property: og:description
      content: "GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/gdpr-article-32-for-software-engineers-technical-controls-implementations-and-auditor-questions.html
prev: /devops/aws/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c73c68e8-7485-4993-a21f-84653ba29a10.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions"
  desc="When I first read GDPR Article 32, I made a mistake. I thought it was a legal document. But it's not. It's an infrastructure specification. The regulation says you need ”appropriate technical measures"
  url="https://freecodecamp.org/news/gdpr-article-32-for-software-engineers-technical-controls-implementations-and-auditor-questions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c73c68e8-7485-4993-a21f-84653ba29a10.png"/>

When I first read GDPR Article 32, I made a mistake. I thought it was a legal document.

But it's not. It's an infrastructure specification.

The regulation says you need "appropriate technical measures" to protect personal data. That phrase is terrifying because it's vague. What does "appropriate" mean? What counts as a "technical measure"? Who decides whether you've done enough?

The compliance consultant will give you a 50-page policy document. The auditor will ignore it and ask for your database schema.

This guide is the middle ground. I've implemented Article 32 controls for 12 SaaS companies. The same nine controls appear every time. The same three auditor questions appear every time.

This is a complete guide to the 9 technical controls you must implement, the exact code and commands for each, and the questions your GDPR auditor will ask.

::: info What You'll Learn

- The 9 technical controls required by GDPR Article 32(1)(a) through (d)
- Exact PostgreSQL commands for pseudonymisation and field-level encryption
- How to implement automatic logoff and unique user identification
- Application-level audit logging that goes beyond CloudTrail
- Integrity controls that prove data has not been altered
- mTLS and TLS 1.3 for transmission security
- The 5 auditor questions you must answer with evidence

Let's dive in.

:::

::: note Prerequisites

Before following along, you should have:

**Knowledge:**

- Familiarity with PostgreSQL and basic SQL
- Basic understanding of AWS services (KMS, RDS, CloudTrail)
- Comfort reading Python and JavaScript/Node.js code
- A working knowledge of what GDPR is — if you are starting from scratch, read the [<VPIcon icon="fas fa-globe"/>ICO's GDPR overview](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/) first

**Tools and access:**

- PostgreSQL 14 or later
- An AWS account with IAM administrator access
- Python 3.8 or later with `cryptography` library (`pip install cryptography`)
- Node.js 16 or later
- A compliance automation tool — [<VPIcon icon="fas fa-globe"/>Vanta](https://vanta.com) or [<VPIcon icon="fas fa-globe"/>OneTrust](https://onetrust.com) — is optional but recommended for evidence collection

**Estimated time:** The controls in this guide take 2–4 weeks to implement fully, depending on your existing infrastructure. Individual controls range from 30 minutes (KMS key setup) to 5 days (full application-layer encryption rollout).

:::

---

## Part 1: Understanding Article 32 — The Technical Requirements

### 1.1. What Article 32 Actually Requires

Article 32 of the GDPR is titled "Security of processing." It requires controllers and processors to implement "appropriate technical and organisational measures" to ensure a level of security appropriate to the risk.

Here is the important distinction most teams miss: Article 32 is not a checklist of policies. A policy says "we encrypt personal data." Evidence says "here is the KMS key with automatic rotation, here is the application-layer encryption code, and here are the CloudTrail logs showing every decryption attempt." The auditor wants evidence, not documentation.

**The four main requirements:**

| **Section** | **Requirement** | **What It Means for Engineers** |
| ---: | :--- | :--- |
| `32(1)(a)` | Pseudonymisation and encryption | Personal data must be stored so it cannot be attributed to a specific data subject without additional information held separately |
| `32(1)(b)` | Confidentiality, integrity, availability, and resilience | Systems must protect data from unauthorised access, alteration, loss, and be able to recover from incidents |
| `32(1)(c)` | Restoring availability and access | You must be able to restore data and regain system access after a physical or technical incident |
| `32(1)(d)`| Regular testing and risk assessment | You must have a process for regularly testing and evaluating your security measures |

### 1.2. The Scope Question: What Data Is Covered?

Before implementing any controls, you must know what data falls under Article 32. The regulation applies to personal data — any information that can identify a living individual directly or indirectly.

#### Data types and their protection levels

| **Category** | **Examples** | **Protection Level** |
| ---: | :--- | :--- |
| Personal data | Name, email, phone, IP address | Standard |
| Sensitive personal data | Health data, biometric data, political opinions, religious beliefs | Enhanced |
| Pseudonymised data | Data where direct identifiers are replaced with a code | Standard |
| Anonymised data | Data that cannot be re-identified under any reasonable circumstances | Out of scope |

#### The data mapping question your auditor will ask

> "Can you provide a data flow diagram showing where personal data enters your system, where it is stored, where it is processed, and how it is deleted?"

Before the auditor asks, run this command to document all databases storing personal data in your AWS environment:

```sh
# List all RDS instances with their encryption status
# Any StorageEncrypted: false is a finding
aws rds describe-db-instances \
--query 'DBInstances[*].{
  ID:DBInstanceIdentifier,
  Engine:Engine,
  StorageEncrypted:StorageEncrypted,
  Region:AvailabilityZone
}' \
--output table
```

Any instance showing `StorageEncrypted: false` must be addressed before your Article 32 audit.

---

## Part 2: `Article 32(1)(a)` — Pseudonymisation and Encryption

### 2.1. How to Implement Pseudonymisation at the Database Layer

Pseudonymisation replaces direct identifiers — names, email addresses, passport numbers — with a pseudonym or code. The goal is that the main working dataset cannot identify a data subject without access to a separately stored, separately protected lookup table.

**Here is the incorrect approach — direct identifiers in plaintext:**

```sql
-- Bad: Direct identifiers stored in the main working table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),       -- Direct identifier — should not be here
    email VARCHAR(255),           -- Direct identifier — should not be here
    passport_number VARCHAR(50)   -- Direct identifier — should not be here
);
```

This approach means any engineer, analyst, or attacker with SELECT access to the `users` table can immediately read and identify individuals. There is no separation between working data and identifying data.

**Here is the correct implementation with a separate identifiers table:**

```sql
-- Good: Pseudonymised main table with a separate, restricted lookup table

-- Step 1: Main working table uses only the pseudonym
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    pseudonym UUID DEFAULT gen_random_uuid(),  -- Non-guessable pseudonym
    created_at TIMESTAMP DEFAULT NOW(),
    account_status VARCHAR(50)
    -- No direct identifiers here
);

-- Step 2: Identifier lookup table — kept separate, access restricted
CREATE TABLE user_identifiers (
    pseudonym UUID PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    passport_number VARCHAR(50),
    FOREIGN KEY (pseudonym) REFERENCES users(pseudonym)
);

-- Step 3: Grant minimal, role-based access
GRANT SELECT ON users TO app_role;                              -- Application uses pseudonym only
GRANT SELECT, INSERT, UPDATE ON user_identifiers TO identity_service_role;  -- Only the identity service sees names
```

**What each part does:**

- `gen_random_uuid()` creates a version-4 UUID pseudonym for each user — unpredictable and not reversible without the lookup table
- The main `users` table is safe for analytics, reporting, and general application use without exposing any identifying information
- Only the `identity_service_role` can join the two tables — this role is assigned only to the specific service that handles identity operations

**The auditor question you will receive:**

> "How do you ensure that pseudonymised data cannot be re-identified by an unauthorised party?"

**Your evidence:**

```sql
-- Show that only the identity service role has access to the identifiers table
SELECT grantee, privilege_type, table_name
FROM information_schema.role_table_grants
WHERE table_name = 'user_identifiers';

-- Expected output: only identity_service_role listed
```

### 2.2. How to Implement Encryption at Rest with Customer-Managed Keys

Storage-layer encryption protects data if someone physically steals the disk. But it does not protect against a privileged AWS employee, a compromised cloud administrator, or an authorised user with direct database access. Article 32 auditors know this distinction — and they will ask about it.

**Here is the incorrect approach — AWS-managed keys:**

```sh
# Bad: AWS-managed KMS key
# You do not control who at AWS can access the key material
aws kms create-key \
--origin AWS_KMS \
--description "AWS managed key for production"
```

The problem: when the auditor asks "can you prove that AWS employees cannot decrypt your customer data?", the answer is no. AWS-managed keys are managed by AWS.

**Here is the correct implementation — customer-managed key with automatic rotation:**

```sh
# Step 1: Create a customer-managed KMS key
KEY_ID=$(aws kms create-key \
--origin AWS_KMS \
--description "Customer-managed key for production PII — Article 32 compliant" \
--tags TagKey=Purpose,TagValue=GDPR TagKey=Environment,TagValue=production \
--query 'KeyMetadata.KeyId' \
--output text)

echo "Created KMS key: $KEY_ID"

# Step 2: Enable automatic 90-day rotation
aws kms enable-key-rotation --key-id $KEY_ID

# Step 3: Apply to your production RDS instance
aws rds modify-db-instance \
--db-instance-identifier production-db \
--kms-key-id $KEY_ID \
--apply-immediately
```

**The auditor question:**

> "Show me that your encryption keys are rotated automatically and that you can prove who has accessed them."

**Your evidence:**

```sh
# Verify rotation is enabled — expected output: true
aws kms get-key-rotation-status --key-id $KEY_ID \
--query 'KeyRotationEnabled'

# Show the CloudTrail audit trail of every key usage event
aws logs filter-log-events \
--log-group-name cloudtrail-logs \
--filter-pattern '{ $.eventSource = "kms.amazonaws.com" }' \
--query 'events[*].{Time:timestamp,Event:message}' \
--output table
```

### 2.3. How to Implement Application-Layer Encryption for Sensitive Fields

Storage encryption is the floor. Application-layer encryption is the ceiling that Article 32 auditors are increasingly expecting for health data, financial records, and other sensitive personal data.

Here is the difference: with storage encryption only, a database administrator who runs `SELECT email FROM users` sees the plaintext email address. With application-layer encryption, they see `gAAAAABm...` — an encrypted byte string that only the application (with access to the Vault key) can decrypt.

```py :collapsed-lines title="application_encryption.py"
from cryptography.fernet import Fernet

class FieldEncryption:
    """
    Encrypts sensitive personal data fields before they are stored in the database.
    The encryption key is stored in HashiCorp Vault or AWS Secrets Manager — never in code.
    A database administrator with direct SQL access sees only encrypted bytes.
    """

    def __init__(self, key: str):
        # key must be a 32-byte base64-encoded string — retrieve from Vault
        self.cipher = Fernet(key.encode())

    def encrypt_field(self, plaintext: str) -> str:
        """Encrypt a sensitive field before writing to the database."""
        if not plaintext:
            return None
        encrypted_bytes = self.cipher.encrypt(plaintext.encode())
        return encrypted_bytes.decode()

    def decrypt_field(self, ciphertext: str) -> str:
        """
        Decrypt a field when legitimately needed by the application.
        This method requires the Vault key — database admins cannot call it.
        """
        if not ciphertext:
            return None
        decrypted_bytes = self.cipher.decrypt(ciphertext.encode())
        return decrypted_bytes.decode()


# Usage in your application:
from vault_client import get_secret  # Your Vault or Secrets Manager client

# Retrieve the encryption key at application startup — never hardcode it
encryption_key = get_secret("gdpr/field-encryption-key")
encryptor = FieldEncryption(encryption_key)

# Before storing a user's health record
user.health_data_encrypted = encryptor.encrypt_field(user.health_data_plaintext)

# Before reading for a legitimate purpose (subject access request, etc.)
health_data = encryptor.decrypt_field(user.health_data_encrypted)
```

**The auditor question:**

> "If a database administrator queries the users table directly, can they read customer health data in plaintext?"

**Your evidence:** Run a direct database query and show the auditor the encrypted output. Then demonstrate that the decryption key is not accessible to database administrators — it is retrieved only by the application through Vault.

---

## Part 3: `Article 32(1)(b)` — Confidentiality and Integrity

### 3.1. How to Implement Automatic Logoff

`Article 32(1)(b)` requires protection against "unauthorised access to personal data." A session that never expires — or expires after 24 hours — is an access control gap. A user who logs in on a shared machine and walks away has left an open door.

**Here is the incorrect approach — a 24-hour JWT session:**

```js
// Bad: 24-hour access token with no inactivity check
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }  // Too long — violates Article 32 intent
);
```

The problem: if a user logs in on a shared computer and closes the laptop without logging out, the session remains valid for up to 24 hours. Anyone who opens that laptop can access personal data.

**Here is the correct implementation — a 15-minute access token with a rolling refresh:**

```js
// Good: Short-lived access token with rolling refresh via HTTP-only cookie

// Access token — valid for 15 minutes of activity
const accessToken = jwt.sign(
  { userId: user.id, role: user.role, type: 'access' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' }
);

// Refresh token — valid for 8 hours total session duration
const refreshToken = jwt.sign(
  { userId: user.id, type: 'refresh' },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: '8h' }
);

// Set refresh token as HTTP-only cookie — not accessible to JavaScript
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,    // Prevents XSS access
  secure: true,      // HTTPS only
  sameSite: 'strict', // Prevents CSRF
  maxAge: 8 * 60 * 60 * 1000  // 8 hours in milliseconds
});

// Session middleware that enforces absolute timeout
const MAX_TOTAL_SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours

app.use((req, res, next) => {
  if (!req.session?.createdAt) return next();

  const sessionAge = Date.now() - req.session.createdAt;
  if (sessionAge > MAX_TOTAL_SESSION_MS) {
    req.session.destroy();
    return res.status(401).json({
      error: 'Session expired after 8 hours. Please log in again.'
    });
  }
  next();
});
```

**The auditor question:**

> "Show me that your application terminates inactive sessions after a reasonable period."

**Your evidence:** A browser developer tools screenshot showing the cookie expiration time, plus a test recording showing that after 15 minutes of inactivity the user is presented with a re-authentication prompt.

### 3.2. How to Implement Unique User Identification with IRSA

Article 32(1)(b) requires that you can identify who accessed personal data. Shared service accounts make this impossible — the audit log shows `data-export-service` but you cannot tell which engineer triggered the export.

**Here is the incorrect approach — a shared service account:**

```yaml
# Bad: One shared Kubernetes service account used by multiple engineers and pipelines
apiVersion: v1
kind: ServiceAccount
metadata:
  name: data-export           # Three engineers and two pipelines share this identity
  namespace: production
```

When an audit log shows `data-export performed a bulk user export at 03:17 UTC`, you cannot answer the auditor's question: "who authorised this?"

**Here is the correct implementation — IAM Roles for Service Accounts (IRSA):**

```sh
# Step 1: Create a separate IAM role for each service identity
# This command creates a role that can only be assumed by the 'payment-service'
# Kubernetes service account in the 'production' namespace

aws iam create-role \
--role-name eks-payment-service-role \
--assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::123456789012:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/YOUR_OIDC_ID"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "oidc.eks.us-east-1.amazonaws.com/id/YOUR_OIDC_ID:sub":
          "system:serviceaccount:production:payment-service"
      }
    }
  }]
}'
```

```yaml
# Step 2: Annotate the Kubernetes service account with its unique IAM role
apiVersion: v1
kind: ServiceAccount
metadata:
  name: payment-service          # One service account, one service, one role
  namespace: production
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/eks-payment-service-role
```

Every AWS API call from `payment-service` now appears in CloudTrail as `eks-payment-service-role` — a unique, traceable identity. No shared accounts. No ambiguous audit logs.

**The auditor question:**

> "How do you ensure that every action on personal data can be attributed to a specific individual or service?"

**Your evidence:**

```sh
# Verify no shared service accounts exist — every account should have a unique role annotation
kubectl get serviceaccounts --all-namespaces \
-o jsonpath='{range .items[*]}{.metadata.namespace}/{.metadata.name}: {.metadata.annotations.eks.amazonaws.com/role-arn}{"\n"}{end}'
```

---

## Part 4: `Article 32(1)(c)` — Availability and Resilience

### 4.1. How to Implement Multi-AZ and Backup Requirements

`Article 32(1)(c)` requires "the ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident." This is not a suggestion — it is a legal requirement. If your database is in a single Availability Zone and that AZ experiences a networking event, you are in violation.

**Here is the incorrect approach — single-AZ RDS with no automated backups:**

```hcl
# Bad: Single-AZ RDS — one networking event makes personal data unavailable
resource "aws_db_instance" "production" {
  identifier              = "production-database"
  multi_az                = false   # No automatic failover
  backup_retention_period = 0       # No automated backups — Article 32 violation
}
```

If the Availability Zone has a networking issue, the database is unreachable. If the instance is corrupted, there are no backups to restore. Both scenarios violate Article 32(1)(c).

**Here is the correct implementation — Multi-AZ with tested automated backups:**

```hcl
# Good: Multi-AZ RDS with 30-day backup retention
resource "aws_db_instance" "production" {
  identifier = "production-database"

  # Multi-AZ creates a synchronous standby replica in a different AZ
  # Automatic failover completes in 60-120 seconds with no data loss
  multi_az = true

  # 30-day backup retention — gives you recovery point flexibility
  backup_retention_period = 30
  backup_window           = "03:00-04:00"  # Low-traffic window for backup

  # Copy all tags to snapshots for compliance tracking
  copy_tags_to_snapshot = true

  # Performance Insights for monitoring query health
  performance_insights_enabled          = true
  performance_insights_retention_period = 7

  tags = {
    Environment       = "production"
    DataClassification = "personal-data"
    GDPRScope         = "article32"
  }
}
```

**How to test your RTO and RPO monthly:**

```sh
# Step 1: Find your most recent automated snapshot
SNAPSHOT_ID=$(aws rds describe-db-snapshots \
--db-instance-identifier production-database \
--snapshot-type automated \
--query 'sort_by(DBSnapshots, &SnapshotCreateTime)[-1].DBSnapshotIdentifier' \
--output text)

echo "Testing restore of snapshot: $SNAPSHOT_ID"

# Step 2: Start the restore — measure the time
START_TIME=$(date +%s)

aws rds restore-db-instance-from-db-snapshot \
--db-instance-identifier gdpr-restore-test \
--db-snapshot-identifier $SNAPSHOT_ID \
--db-instance-class db.t3.medium \
--no-publicly-accessible \
--tags Key=Purpose,Value=gdpr-rto-test Key=DeleteAfter,Value=$(date -d '+1 day' +%Y-%m-%d)

# Step 3: Wait for restore to complete
aws rds wait db-instance-available \
--db-instance-identifier gdpr-restore-test

END_TIME=$(date +%s)
RTO_SECONDS=$((END_TIME - START_TIME))
echo "Restore completed in $((RTO_SECONDS / 60)) minutes"

# Step 4: Verify data integrity with a spot check
# Connect to the restored instance and verify record counts match production
# psql -h RESTORED_ENDPOINT -U admin -d production \
#   -c "SELECT COUNT(*) FROM users; SELECT MAX(created_at) FROM orders;"

# Step 5: Delete the test instance
aws rds delete-db-instance \
--db-instance-identifier gdpr-restore-test \
--skip-final-snapshot
```

**The auditor question:**

> "What is your Recovery Time Objective and Recovery Point Objective for personal data? When did you last test it?"

**Your evidence:** A documented monthly DR test log showing: snapshot used, restore start time, restore completion time, data verification query results, and the engineer who conducted the test.

---

## Part 5: `Article 32(1)(d)` — Regular Testing

### 5.1. How to Implement Automated Vulnerability Scanning

Article 32(1)(d) requires "a process for regularly testing, assessing and evaluating the effectiveness of technical and organisational measures." This includes automated vulnerability scanning of every container image before it reaches production.

**Here is the incorrect approach — no scanning in the deployment pipeline:**

```yaml
# Bad: No vulnerability scanning — a critical CVE in the base image deploys undetected
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t myapp .
      - run: docker push myapp  # Deploys without any security check
```

If a critical CVE is present in the base image (such as a remote code execution vulnerability in OpenSSL), it goes straight to production. Under Article 32(1)(d), this is a finding.

**Here is the correct implementation — Trivy scanning with pipeline enforcement:**

```yaml
# Good: Trivy scans every image — CRITICAL/HIGH CVEs block the deployment
name: Security Scan and Deploy
on: [push, pull_request]

jobs:
  trivy-scan:
    name: Container Vulnerability Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build container image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Scan for vulnerabilities with Trivy
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:${{ github.sha }}'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'         # Fail the pipeline — image cannot deploy with CRITICAL/HIGH CVEs

      - name: Upload scan results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()             # Upload results even if scan failed, for review
        with:
          sarif_file: 'trivy-results.sarif'
```

Trivy scans for:

- CVEs in the base image OS packages (for example, a critical OpenSSL vulnerability in your Ubuntu base)
- Vulnerable versions of application dependencies (a known exploit in an npm or pip package your application uses)
- Misconfigurations in the Dockerfile (running as root, using `latest` tag instead of a pinned SHA)

Results appear in the GitHub Security tab, creating a timestamped, searchable history of every scan. That history is your Article 32(1)(d) evidence.

**How to run a weekly AWS Inspector assessment for running workloads:**

```sh
# List all active CRITICAL findings across your AWS account
aws inspector2 list-findings \
--filter-criteria '{
  "severity": [{"comparison": "EQUALS", "value": "CRITICAL"}],
  "findingStatus": [{"comparison": "EQUALS", "value": "ACTIVE"}]
}' \
--query 'findings[*].{
  Title:title,
  Resource:resources[0].id,
  Severity:severity,
  CVE:packageVulnerabilityDetails.vulnerabilityId
}' \
--output table
```

**The auditor question:**

> "Show me your vulnerability management programme, including how you prioritise and remediate findings."

**Your evidence:** A weekly vulnerability report — generated automatically from the above command — showing active findings, severity, the GitHub issue created for each finding, and the closure date once remediated.

---

## Part 6: `Article 32(1)(d)` — Penetration Testing

### 6.1. Why Automated Scanning Is Not Enough

`Article 32(1)(d)` requires evaluating the effectiveness of security measures. Automated vulnerability scanners find known CVEs in libraries and OS packages. They cannot find:

- Business logic vulnerabilities (an API endpoint that returns another user's data when given a specific parameter)
- Authentication bypasses (a JWT implementation that accepts unsigned tokens)
- Privilege escalation paths (an attacker can move from a low-privilege role to admin through a sequence of legitimate API calls)
- Insecure direct object references (accessing `/api/users/124` instead of `/api/users/123` returns data for a different customer)

The ICO (UK Information Commissioner's Office) and the CNIL (France's data protection authority) both state in their guidance that annual manual penetration testing is expected for organisations processing significant volumes of personal data.

**What an acceptable pen test scope looks like:**

```md
# Annual Penetration Test Scope — Article 32 Compliance

---

## Testing Period
Start: 2025-04-01  
End: 2025-04-14  
Testing firm: [Accredited firm — CREST or CHECK certified]

---

## In Scope
- Production web application: https://app.yourcompany.com
- Production API: https://api.yourcompany.com/v1/*
- Authentication flows: OAuth2, JWT, session management
- Data stores: PostgreSQL (via application access only, not direct DB access)
- AWS account: External reconnaissance of public-facing services only

---

## Testing Types
- External infrastructure testing (all public IP ranges)
- Web application testing (OWASP Top 10 2021)
- API security testing (all authenticated and unauthenticated endpoints)
- Authentication and session management testing
- GDPR-specific test cases (data subject rights endpoints, consent flows)

---

## Remediation SLAs
- CRITICAL: 24 hours from report delivery
- HIGH: 7 calendar days
- MEDIUM: 30 calendar days
- LOW: 90 calendar days
```

**How to track and evidence remediation:**

```sh
# Create GitHub issues for each finding on receipt of the pen test report
# This creates a traceable record of every finding and its resolution

for finding_id in $(cat pentest-report-findings.txt); do
  gh issue create \
    --title "Pen test finding: $finding_id" \
    --body "See pentest-report-2025-04.pdf, section $finding_id. Severity: HIGH. SLA: 7 days." \
    --label "security,pentest" \
    --assignee "@security-lead"
done
```

**The auditor question:**

> "When was your last penetration test? Show me the report and your remediation evidence."

**Your evidence:**

1. The penetration test report from a CREST or CHECK certified firm, dated within the last 12 months
2. A remediation tracker (GitHub issues or Jira) showing every CRITICAL and HIGH finding with a closure date
3. Evidence that all CRITICAL findings were closed within 24 hours (the git commit or deployment log)

---

## Best Practices for GDPR Article 32 Compliance

::: important Here are the key takeaways from this guide:

✅ **Do:** Implement application-layer encryption for sensitive fields. Storage encryption alone is not enough — a DBA with direct database access can still read plaintext.

✅ **Do:** Use customer-managed KMS keys with automatic rotation. You need to prove control over the key material.

✅ **Do:** Store pseudonymised data separately from identifiers, with restricted role-based access to the lookup table.

✅ **Do:** Enforce automatic logoff after 15 minutes of inactivity with an 8-hour absolute session limit.

✅ **Do:** Use unique service accounts with IRSA. Every action on personal data must be attributable to a specific identity.

✅ **Do:** Test your backups monthly. Document RTO and RPO with actual restore test results.

✅ **Do:** Run Trivy in CI to block CRITICAL and HIGH CVEs before deployment.

✅ **Do:** Conduct an annual manual penetration test from a CREST or CHECK certified firm.

❌ **Don't:** Use 24-hour JWT sessions or sessions with no inactivity timeout.

❌ **Don't:** Store secrets in environment variables, .env files, or hardcoded in source code.

❌ **Don't:** Skip the annual penetration test. An auditor from the ICO or CNIL will not accept "we run automated scans" as a substitute.

❌ **Don't:** Use AWS-managed KMS keys if you need to prove key material control to your auditor.

:::

::: info Resources

- [**ICO Guide to GDPR Article 32**](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/) — The UK Information Commissioner's Office official guidance on Article 32 security obligations
- [**ENISA Guidelines on Article 32**](https://enisa.europa.eu/publications/guidelines-for-smes-on-the-security-of-personal-data-processing) — The EU Agency for Cybersecurity's SME guidelines on personal data security
- [**Trivy by Aqua Security** (<VPIcon icon="iconfont icon-github"/>`aquasecurity/trivy`)](https://github.com/aquasecurity/trivy) — Open-source container vulnerability scanner used in Part 5
- [**OWASP Top 10 2021**](https://owasp.org/Top10/) — The standard reference for web application security risks, used in pen test scoping
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**AWS KMS Key Rotation Documentation**](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) — Official AWS documentation for automatic key rotation
- [<VPIcon icon="iconfont icon-postgresql"/>**PostgreSQL Row Security Policies**](https://postgresql.org/docs/current/ddl-rowsecurity.html) — How to implement row-level security for granular access control on pseudonymised data
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**EKS IAM Roles for Service Accounts (IRSA)**](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) — Official AWS documentation for unique service account identity on EKS
- [**CREST Certified Testing Firms**](https://crest-approved.org/members/certified-companies/) — Directory of CREST-certified penetration testing firms for your annual Article 32 assessment

:::

::: info About Author

[Ayobami Adejumo (<VPIcon icon="iconfont icon-github"/>`aayostem`)](https://github.com/aayostem) is a senior platform engineer and compliance infrastructure specialist. He writes about GDPR engineering controls, SOC2 implementation, and FinOps - cloud cost optimization

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "GDPR Article 32 for Software Engineers: Technical Controls, Implementations, and Auditor Questions",
  "desc": "When I first read GDPR Article 32, I made a mistake. I thought it was a legal document. But it's not. It's an infrastructure specification. The regulation says you need ”appropriate technical measures",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/gdpr-article-32-for-software-engineers-technical-controls-implementations-and-auditor-questions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
